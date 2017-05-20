var apolloLogging = true;

export const enableApolloLogging = () => apolloLogging = true;
export const disableApolloLogging = () => apolloLogging = false;

const formatRequest = req =>
  !req.variables ? req.operationName : `${req.operationName}(${JSON.stringify(req.variables)})`;

const addNetworkInterfaceLogger = netIfc => {
  return {
    async query(request) {
      let result;
      try {
        result = await netIfc.query(request);
      } finally {
        if (apolloLogging) { console.log(formatRequest(request), "=>", JSON.stringify(result)); }
      }
      return result;
    },
    subscribe(request, handler) {
      let result;
      try {
        const logHandler = (error, result) => {
          if (apolloLogging) {
            console.log(JSON.stringify(error ? error : result));
          }
          return handler(error, result);
        };
        result = netIfc.subscribe(request, logHandler);
      } finally {
        if (apolloLogging) { console.log(formatRequest(request), "=> subscription:", result); }
      }
      return result;
    },
    unsubscribe(subId) {
      try {
        netIfc.unsubscribe(subId);
      } finally {
        if (apolloLogging) { console.log("unsubscribe from subscription:", subId); }
      }
    }
  };
};

const addPubSubLogging = pubsub => ({
  publish(...args) {
    console.log('pubsub publish', args);
    return pubsub.publish(...args);
  },
  async subscribe(opName, handler) {
    let result;
    try {
      const logHandler = !apolloLogging ? handler : (msg) => {
        console.log("pubsub msg", `${opName}(${JSON.stringify(msg)})`);
        return handler(msg);
      };
      result = await pubsub.subscribe(opName, logHandler);
    } finally {
      if (apolloLogging) { console.log('pubsub subscribe', opName, "=>", result); }
    }
    return result;
  },
  unsubscribe(...args) {
    console.log('pubsub unsubscribe', args);
    return pubsub.unsubscribe(...args);
  }
});

const addSubscriptionManagerLogger = manager => {
  const setupFunctions = manager.setupFunctions;
  manager.setupFunctions = {};
  for (let key of Object.keys(setupFunctions)) {
    manager.setupFunctions[key] = (opts, args, name) => {
      let triggerMap = setupFunctions[key](opts, args, name);
      const loggedMap = {};
      for (let key of Object.keys(triggerMap)) {
        loggedMap[key] = Object.assign({}, triggerMap[key]);
        const originalFilter = triggerMap[key].filter;
        if (originalFilter) {
          loggedMap[key].filter = (val, ctx) => {
            let result;
            try {
              result = originalFilter(val, ctx);
            } finally {
              if (apolloLogging) {
                console.log(`pubsub filter ${key}(opts = ${JSON.stringify(opts)}, args = ${JSON.stringify(args)}, name = ${name})`);
                console.log(`.${key}(val = ${JSON.stringify(val)}, ctx = ${JSON.stringify(ctx)}) =>`, result);
              }
            }
            return result;
          };
        }
      }
      return loggedMap;
    };
  }
  return manager;
};

export const addApolloLogging = obj => obj.query ?
  addNetworkInterfaceLogger(obj) : (
    obj.setupFunctions ?
      addSubscriptionManagerLogger(obj) :
      addPubSubLogging(obj)
  );
