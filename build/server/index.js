require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/ 	
/******/ 	function hotDisposeChunk(chunkId) { //eslint-disable-line no-unused-vars
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "f0ba943c61655c8f57a3"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest().then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate).then(function(result) {
/******/ 				deferred.resolve(result);
/******/ 			}, function(err) {
/******/ 				deferred.reject(err);
/******/ 			});
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(moduleOutdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "accept-errored",
/******/ 								moduleId: moduleId,
/******/ 								dependencyId: moduleOutdatedDependencies[i],
/******/ 								error: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err;
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return Promise.resolve(outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(51)(__webpack_require__.s = 51);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./knexdata.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "development", function() { return development; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "production", function() { return production; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "test", function() { return test; });
var development = {
  client: 'sqlite3',
  connection: {
    filename: './dev-db.sqlite3'
  },
  seeds: {
    directory: './src/server/database/seeds'
  },
  migrations: {
    directory: './src/server/database/migrations'
  },
  useNullAsDefault: true
};

var production = {
  client: 'sqlite3',
  connection: {
    filename: './prod-db.sqlite3'
  },
  seeds: {
    directory: './src/server/database/seeds'
  },
  migrations: {
    directory: './src/server/database/migrations'
  },
  useNullAsDefault: true
};

var test = {
  client: 'sqlite3',
  connection: {
    filename: ':memory:'
  },
  seeds: {
    directory: './src/server/database/seeds'
  },
  migrations: {
    directory: './src/server/database/migrations'
  },
  useNullAsDefault: true
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?{\"sourceMap\":true}!./node_modules/postcss-loader/lib/index.js?{\"sourceMap\":true}!./node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!./src/client/styles/styles.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700);", ""]);

// module
exports.push([module.i, "/*!\n * Bootstrap v4.0.0-alpha.6 (https://getbootstrap.com)\n * Copyright 2011-2017 The Bootstrap Authors\n * Copyright 2011-2017 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */\n/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  font-family: sans-serif;\n  line-height: 1.15;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nfigcaption,\nfigure,\nmain {\n  display: block; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  box-sizing: content-box;\n  height: 0;\n  overflow: visible; }\n\npre {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\na {\n  background-color: transparent;\n  -webkit-text-decoration-skip: objects; }\n\na:active,\na:hover {\n  outline-width: 0; }\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline;\n  text-decoration: underline dotted; }\n\nb,\nstrong {\n  font-weight: inherit; }\n\nb,\nstrong {\n  font-weight: bolder; }\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\ndfn {\n  font-style: italic; }\n\nmark {\n  background-color: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\naudio,\nvideo {\n  display: inline-block; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\nimg {\n  border-style: none; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  font-size: 100%;\n  line-height: 1.15;\n  margin: 0; }\n\nbutton,\ninput {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; }\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0;\n  white-space: normal; }\n\nprogress {\n  display: inline-block;\n  vertical-align: baseline; }\n\ntextarea {\n  overflow: auto; }\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px; }\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit; }\n\ndetails,\nmenu {\n  display: block; }\n\nsummary {\n  display: list-item; }\n\ncanvas {\n  display: inline-block; }\n\ntemplate {\n  display: none; }\n\n[hidden] {\n  display: none; }\n\n@media print {\n  *,\n  *::before,\n  *::after,\n  p::first-letter,\n  div::first-letter,\n  blockquote::first-letter,\n  li::first-letter,\n  p::first-line,\n  div::first-line,\n  blockquote::first-line,\n  li::first-line {\n    text-shadow: none !important;\n    box-shadow: none !important; }\n  a,\n  a:visited {\n    text-decoration: underline; }\n  abbr[title]::after {\n    content: \" (\" attr(title) \")\"; }\n  pre {\n    white-space: pre-wrap !important; }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid; }\n  thead {\n    display: table-header-group; }\n  tr,\n  img {\n    page-break-inside: avoid; }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3; }\n  h2,\n  h3 {\n    page-break-after: avoid; }\n  .navbar {\n    display: none; }\n  .badge {\n    border: 1px solid #000; }\n  .table {\n    border-collapse: collapse !important; }\n    .table td,\n    .table th {\n      background-color: #fff !important; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #ddd !important; } }\n\nhtml {\n  box-sizing: border-box; }\n\n*,\n*::before,\n*::after {\n  box-sizing: inherit; }\n\n@-ms-viewport {\n  width: device-width; }\n\nhtml {\n  -ms-overflow-style: scrollbar;\n  -webkit-tap-highlight-color: transparent; }\n\nbody {\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1.5;\n  color: #292b2c;\n  background-color: #fff; }\n\n[tabindex=\"-1\"]:focus {\n  outline: none !important; }\n\nh1, h2, h3, h4, h5, h6 {\n  margin-top: 0;\n  margin-bottom: .5rem; }\n\np {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nabbr[title],\nabbr[data-original-title] {\n  cursor: help; }\n\naddress {\n  margin-bottom: 1rem;\n  font-style: normal;\n  line-height: inherit; }\n\nol,\nul,\ndl {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nol ol,\nul ul,\nol ul,\nul ol {\n  margin-bottom: 0; }\n\ndt {\n  font-weight: bold; }\n\ndd {\n  margin-bottom: .5rem;\n  margin-left: 0; }\n\nblockquote {\n  margin: 0 0 1rem; }\n\na {\n  color: #0275d8;\n  text-decoration: none; }\n  a:focus, a:hover {\n    color: #014c8c;\n    text-decoration: underline; }\n\na:not([href]):not([tabindex]) {\n  color: inherit;\n  text-decoration: none; }\n  a:not([href]):not([tabindex]):focus, a:not([href]):not([tabindex]):hover {\n    color: inherit;\n    text-decoration: none; }\n  a:not([href]):not([tabindex]):focus {\n    outline: 0; }\n\npre {\n  margin-top: 0;\n  margin-bottom: 1rem;\n  overflow: auto; }\n\nfigure {\n  margin: 0 0 1rem; }\n\nimg {\n  vertical-align: middle; }\n\n[role=\"button\"] {\n  cursor: pointer; }\n\na,\narea,\nbutton,\n[role=\"button\"],\ninput,\nlabel,\nselect,\nsummary,\ntextarea {\n  -ms-touch-action: manipulation;\n      touch-action: manipulation; }\n\ntable {\n  border-collapse: collapse;\n  background-color: transparent; }\n\ncaption {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  color: #636c72;\n  text-align: left;\n  caption-side: bottom; }\n\nth {\n  text-align: left; }\n\nlabel {\n  display: inline-block;\n  margin-bottom: .5rem; }\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color; }\n\ninput,\nbutton,\nselect,\ntextarea {\n  line-height: inherit; }\n\ninput[type=\"radio\"]:disabled,\ninput[type=\"checkbox\"]:disabled {\n  cursor: not-allowed; }\n\ninput[type=\"date\"],\ninput[type=\"time\"],\ninput[type=\"datetime-local\"],\ninput[type=\"month\"] {\n  -webkit-appearance: listbox; }\n\ntextarea {\n  resize: vertical; }\n\nfieldset {\n  min-width: 0;\n  padding: 0;\n  margin: 0;\n  border: 0; }\n\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: .5rem;\n  font-size: 1.5rem;\n  line-height: inherit; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: none; }\n\noutput {\n  display: inline-block; }\n\n[hidden] {\n  display: none !important; }\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  margin-bottom: 0.5rem;\n  font-family: inherit;\n  font-weight: 500;\n  line-height: 1.1;\n  color: inherit; }\n\nh1, .h1 {\n  font-size: 2.5rem; }\n\nh2, .h2 {\n  font-size: 2rem; }\n\nh3, .h3 {\n  font-size: 1.75rem; }\n\nh4, .h4 {\n  font-size: 1.5rem; }\n\nh5, .h5 {\n  font-size: 1.25rem; }\n\nh6, .h6 {\n  font-size: 1rem; }\n\n.lead {\n  font-size: 1.25rem;\n  font-weight: 300; }\n\n.display-1 {\n  font-size: 6rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\n.display-2 {\n  font-size: 5.5rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\n.display-3 {\n  font-size: 4.5rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\n.display-4 {\n  font-size: 3.5rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\nhr {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border: 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1); }\n\nsmall,\n.small {\n  font-size: 80%;\n  font-weight: normal; }\n\nmark,\n.mark {\n  padding: 0.2em;\n  background-color: #fcf8e3; }\n\n.list-unstyled {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline-item {\n  display: inline-block; }\n  .list-inline-item:not(:last-child) {\n    margin-right: 5px; }\n\n.initialism {\n  font-size: 90%;\n  text-transform: uppercase; }\n\n.blockquote {\n  padding: 0.5rem 1rem;\n  margin-bottom: 1rem;\n  font-size: 1.25rem;\n  border-left: 0.25rem solid #eceeef; }\n\n.blockquote-footer {\n  display: block;\n  font-size: 80%;\n  color: #636c72; }\n  .blockquote-footer::before {\n    content: \"\\2014   \\A0\"; }\n\n.blockquote-reverse {\n  padding-right: 1rem;\n  padding-left: 0;\n  text-align: right;\n  border-right: 0.25rem solid #eceeef;\n  border-left: 0; }\n\n.blockquote-reverse .blockquote-footer::before {\n  content: \"\"; }\n\n.blockquote-reverse .blockquote-footer::after {\n  content: \"\\A0   \\2014\"; }\n\n.img-fluid {\n  max-width: 100%;\n  height: auto; }\n\n.img-thumbnail {\n  padding: 0.25rem;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 0.25rem;\n  transition: all 0.2s ease-in-out;\n  max-width: 100%;\n  height: auto; }\n\n.figure {\n  display: inline-block; }\n\n.figure-img {\n  margin-bottom: 0.5rem;\n  line-height: 1; }\n\n.figure-caption {\n  font-size: 90%;\n  color: #636c72; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; }\n\ncode {\n  padding: 0.2rem 0.4rem;\n  font-size: 90%;\n  color: #bd4147;\n  background-color: #f7f7f9;\n  border-radius: 0.25rem; }\n  a > code {\n    padding: 0;\n    color: inherit;\n    background-color: inherit; }\n\nkbd {\n  padding: 0.2rem 0.4rem;\n  font-size: 90%;\n  color: #fff;\n  background-color: #292b2c;\n  border-radius: 0.2rem; }\n  kbd kbd {\n    padding: 0;\n    font-size: 100%;\n    font-weight: bold; }\n\npre {\n  display: block;\n  margin-top: 0;\n  margin-bottom: 1rem;\n  font-size: 90%;\n  color: #292b2c; }\n  pre code {\n    padding: 0;\n    font-size: inherit;\n    color: inherit;\n    background-color: transparent;\n    border-radius: 0; }\n\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll; }\n\n.container {\n  position: relative;\n  margin-left: auto;\n  margin-right: auto;\n  padding-right: 15px;\n  padding-left: 15px; }\n  @media (min-width: 576px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 768px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 992px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 1200px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 576px) {\n    .container {\n      width: 540px;\n      max-width: 100%; } }\n  @media (min-width: 768px) {\n    .container {\n      width: 720px;\n      max-width: 100%; } }\n  @media (min-width: 992px) {\n    .container {\n      width: 960px;\n      max-width: 100%; } }\n  @media (min-width: 1200px) {\n    .container {\n      width: 1140px;\n      max-width: 100%; } }\n\n.container-fluid {\n  position: relative;\n  margin-left: auto;\n  margin-right: auto;\n  padding-right: 15px;\n  padding-left: 15px; }\n  @media (min-width: 576px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 768px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 992px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 1200px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n\n.row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  margin-right: -15px;\n  margin-left: -15px; }\n  @media (min-width: 576px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 768px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 992px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 1200px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n\n.no-gutters {\n  margin-right: 0;\n  margin-left: 0; }\n  .no-gutters > .col,\n  .no-gutters > [class*=\"col-\"] {\n    padding-right: 0;\n    padding-left: 0; }\n\n.col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n  position: relative;\n  width: 100%;\n  min-height: 1px;\n  padding-right: 15px;\n  padding-left: 15px; }\n  @media (min-width: 576px) {\n    .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 768px) {\n    .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 992px) {\n    .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 1200px) {\n    .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n\n.col {\n  -ms-flex-preferred-size: 0;\n      flex-basis: 0;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  max-width: 100%; }\n\n.col-auto {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n  width: auto; }\n\n.col-1 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 8.33333%;\n          flex: 0 0 8.33333%;\n  max-width: 8.33333%; }\n\n.col-2 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 16.66667%;\n          flex: 0 0 16.66667%;\n  max-width: 16.66667%; }\n\n.col-3 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 25%;\n          flex: 0 0 25%;\n  max-width: 25%; }\n\n.col-4 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 33.33333%;\n          flex: 0 0 33.33333%;\n  max-width: 33.33333%; }\n\n.col-5 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 41.66667%;\n          flex: 0 0 41.66667%;\n  max-width: 41.66667%; }\n\n.col-6 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 50%;\n          flex: 0 0 50%;\n  max-width: 50%; }\n\n.col-7 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 58.33333%;\n          flex: 0 0 58.33333%;\n  max-width: 58.33333%; }\n\n.col-8 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 66.66667%;\n          flex: 0 0 66.66667%;\n  max-width: 66.66667%; }\n\n.col-9 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 75%;\n          flex: 0 0 75%;\n  max-width: 75%; }\n\n.col-10 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 83.33333%;\n          flex: 0 0 83.33333%;\n  max-width: 83.33333%; }\n\n.col-11 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 91.66667%;\n          flex: 0 0 91.66667%;\n  max-width: 91.66667%; }\n\n.col-12 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 100%;\n          flex: 0 0 100%;\n  max-width: 100%; }\n\n.pull-0 {\n  right: auto; }\n\n.pull-1 {\n  right: 8.33333%; }\n\n.pull-2 {\n  right: 16.66667%; }\n\n.pull-3 {\n  right: 25%; }\n\n.pull-4 {\n  right: 33.33333%; }\n\n.pull-5 {\n  right: 41.66667%; }\n\n.pull-6 {\n  right: 50%; }\n\n.pull-7 {\n  right: 58.33333%; }\n\n.pull-8 {\n  right: 66.66667%; }\n\n.pull-9 {\n  right: 75%; }\n\n.pull-10 {\n  right: 83.33333%; }\n\n.pull-11 {\n  right: 91.66667%; }\n\n.pull-12 {\n  right: 100%; }\n\n.push-0 {\n  left: auto; }\n\n.push-1 {\n  left: 8.33333%; }\n\n.push-2 {\n  left: 16.66667%; }\n\n.push-3 {\n  left: 25%; }\n\n.push-4 {\n  left: 33.33333%; }\n\n.push-5 {\n  left: 41.66667%; }\n\n.push-6 {\n  left: 50%; }\n\n.push-7 {\n  left: 58.33333%; }\n\n.push-8 {\n  left: 66.66667%; }\n\n.push-9 {\n  left: 75%; }\n\n.push-10 {\n  left: 83.33333%; }\n\n.push-11 {\n  left: 91.66667%; }\n\n.push-12 {\n  left: 100%; }\n\n.offset-1 {\n  margin-left: 8.33333%; }\n\n.offset-2 {\n  margin-left: 16.66667%; }\n\n.offset-3 {\n  margin-left: 25%; }\n\n.offset-4 {\n  margin-left: 33.33333%; }\n\n.offset-5 {\n  margin-left: 41.66667%; }\n\n.offset-6 {\n  margin-left: 50%; }\n\n.offset-7 {\n  margin-left: 58.33333%; }\n\n.offset-8 {\n  margin-left: 66.66667%; }\n\n.offset-9 {\n  margin-left: 75%; }\n\n.offset-10 {\n  margin-left: 83.33333%; }\n\n.offset-11 {\n  margin-left: 91.66667%; }\n\n@media (min-width: 576px) {\n  .col-sm {\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    max-width: 100%; }\n  .col-sm-auto {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: auto; }\n  .col-sm-1 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 8.33333%;\n            flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-sm-2 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 16.66667%;\n            flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-sm-3 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%;\n    max-width: 25%; }\n  .col-sm-4 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 33.33333%;\n            flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-sm-5 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 41.66667%;\n            flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-sm-6 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n    max-width: 50%; }\n  .col-sm-7 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 58.33333%;\n            flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-sm-8 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 66.66667%;\n            flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-sm-9 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%;\n    max-width: 75%; }\n  .col-sm-10 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 83.33333%;\n            flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-sm-11 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 91.66667%;\n            flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-sm-12 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-sm-0 {\n    right: auto; }\n  .pull-sm-1 {\n    right: 8.33333%; }\n  .pull-sm-2 {\n    right: 16.66667%; }\n  .pull-sm-3 {\n    right: 25%; }\n  .pull-sm-4 {\n    right: 33.33333%; }\n  .pull-sm-5 {\n    right: 41.66667%; }\n  .pull-sm-6 {\n    right: 50%; }\n  .pull-sm-7 {\n    right: 58.33333%; }\n  .pull-sm-8 {\n    right: 66.66667%; }\n  .pull-sm-9 {\n    right: 75%; }\n  .pull-sm-10 {\n    right: 83.33333%; }\n  .pull-sm-11 {\n    right: 91.66667%; }\n  .pull-sm-12 {\n    right: 100%; }\n  .push-sm-0 {\n    left: auto; }\n  .push-sm-1 {\n    left: 8.33333%; }\n  .push-sm-2 {\n    left: 16.66667%; }\n  .push-sm-3 {\n    left: 25%; }\n  .push-sm-4 {\n    left: 33.33333%; }\n  .push-sm-5 {\n    left: 41.66667%; }\n  .push-sm-6 {\n    left: 50%; }\n  .push-sm-7 {\n    left: 58.33333%; }\n  .push-sm-8 {\n    left: 66.66667%; }\n  .push-sm-9 {\n    left: 75%; }\n  .push-sm-10 {\n    left: 83.33333%; }\n  .push-sm-11 {\n    left: 91.66667%; }\n  .push-sm-12 {\n    left: 100%; }\n  .offset-sm-0 {\n    margin-left: 0%; }\n  .offset-sm-1 {\n    margin-left: 8.33333%; }\n  .offset-sm-2 {\n    margin-left: 16.66667%; }\n  .offset-sm-3 {\n    margin-left: 25%; }\n  .offset-sm-4 {\n    margin-left: 33.33333%; }\n  .offset-sm-5 {\n    margin-left: 41.66667%; }\n  .offset-sm-6 {\n    margin-left: 50%; }\n  .offset-sm-7 {\n    margin-left: 58.33333%; }\n  .offset-sm-8 {\n    margin-left: 66.66667%; }\n  .offset-sm-9 {\n    margin-left: 75%; }\n  .offset-sm-10 {\n    margin-left: 83.33333%; }\n  .offset-sm-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 768px) {\n  .col-md {\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    max-width: 100%; }\n  .col-md-auto {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: auto; }\n  .col-md-1 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 8.33333%;\n            flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-md-2 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 16.66667%;\n            flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-md-3 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%;\n    max-width: 25%; }\n  .col-md-4 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 33.33333%;\n            flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-md-5 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 41.66667%;\n            flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-md-6 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n    max-width: 50%; }\n  .col-md-7 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 58.33333%;\n            flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-md-8 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 66.66667%;\n            flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-md-9 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%;\n    max-width: 75%; }\n  .col-md-10 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 83.33333%;\n            flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-md-11 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 91.66667%;\n            flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-md-12 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-md-0 {\n    right: auto; }\n  .pull-md-1 {\n    right: 8.33333%; }\n  .pull-md-2 {\n    right: 16.66667%; }\n  .pull-md-3 {\n    right: 25%; }\n  .pull-md-4 {\n    right: 33.33333%; }\n  .pull-md-5 {\n    right: 41.66667%; }\n  .pull-md-6 {\n    right: 50%; }\n  .pull-md-7 {\n    right: 58.33333%; }\n  .pull-md-8 {\n    right: 66.66667%; }\n  .pull-md-9 {\n    right: 75%; }\n  .pull-md-10 {\n    right: 83.33333%; }\n  .pull-md-11 {\n    right: 91.66667%; }\n  .pull-md-12 {\n    right: 100%; }\n  .push-md-0 {\n    left: auto; }\n  .push-md-1 {\n    left: 8.33333%; }\n  .push-md-2 {\n    left: 16.66667%; }\n  .push-md-3 {\n    left: 25%; }\n  .push-md-4 {\n    left: 33.33333%; }\n  .push-md-5 {\n    left: 41.66667%; }\n  .push-md-6 {\n    left: 50%; }\n  .push-md-7 {\n    left: 58.33333%; }\n  .push-md-8 {\n    left: 66.66667%; }\n  .push-md-9 {\n    left: 75%; }\n  .push-md-10 {\n    left: 83.33333%; }\n  .push-md-11 {\n    left: 91.66667%; }\n  .push-md-12 {\n    left: 100%; }\n  .offset-md-0 {\n    margin-left: 0%; }\n  .offset-md-1 {\n    margin-left: 8.33333%; }\n  .offset-md-2 {\n    margin-left: 16.66667%; }\n  .offset-md-3 {\n    margin-left: 25%; }\n  .offset-md-4 {\n    margin-left: 33.33333%; }\n  .offset-md-5 {\n    margin-left: 41.66667%; }\n  .offset-md-6 {\n    margin-left: 50%; }\n  .offset-md-7 {\n    margin-left: 58.33333%; }\n  .offset-md-8 {\n    margin-left: 66.66667%; }\n  .offset-md-9 {\n    margin-left: 75%; }\n  .offset-md-10 {\n    margin-left: 83.33333%; }\n  .offset-md-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 992px) {\n  .col-lg {\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    max-width: 100%; }\n  .col-lg-auto {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: auto; }\n  .col-lg-1 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 8.33333%;\n            flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-lg-2 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 16.66667%;\n            flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-lg-3 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%;\n    max-width: 25%; }\n  .col-lg-4 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 33.33333%;\n            flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-lg-5 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 41.66667%;\n            flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-lg-6 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n    max-width: 50%; }\n  .col-lg-7 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 58.33333%;\n            flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-lg-8 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 66.66667%;\n            flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-lg-9 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%;\n    max-width: 75%; }\n  .col-lg-10 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 83.33333%;\n            flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-lg-11 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 91.66667%;\n            flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-lg-12 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-lg-0 {\n    right: auto; }\n  .pull-lg-1 {\n    right: 8.33333%; }\n  .pull-lg-2 {\n    right: 16.66667%; }\n  .pull-lg-3 {\n    right: 25%; }\n  .pull-lg-4 {\n    right: 33.33333%; }\n  .pull-lg-5 {\n    right: 41.66667%; }\n  .pull-lg-6 {\n    right: 50%; }\n  .pull-lg-7 {\n    right: 58.33333%; }\n  .pull-lg-8 {\n    right: 66.66667%; }\n  .pull-lg-9 {\n    right: 75%; }\n  .pull-lg-10 {\n    right: 83.33333%; }\n  .pull-lg-11 {\n    right: 91.66667%; }\n  .pull-lg-12 {\n    right: 100%; }\n  .push-lg-0 {\n    left: auto; }\n  .push-lg-1 {\n    left: 8.33333%; }\n  .push-lg-2 {\n    left: 16.66667%; }\n  .push-lg-3 {\n    left: 25%; }\n  .push-lg-4 {\n    left: 33.33333%; }\n  .push-lg-5 {\n    left: 41.66667%; }\n  .push-lg-6 {\n    left: 50%; }\n  .push-lg-7 {\n    left: 58.33333%; }\n  .push-lg-8 {\n    left: 66.66667%; }\n  .push-lg-9 {\n    left: 75%; }\n  .push-lg-10 {\n    left: 83.33333%; }\n  .push-lg-11 {\n    left: 91.66667%; }\n  .push-lg-12 {\n    left: 100%; }\n  .offset-lg-0 {\n    margin-left: 0%; }\n  .offset-lg-1 {\n    margin-left: 8.33333%; }\n  .offset-lg-2 {\n    margin-left: 16.66667%; }\n  .offset-lg-3 {\n    margin-left: 25%; }\n  .offset-lg-4 {\n    margin-left: 33.33333%; }\n  .offset-lg-5 {\n    margin-left: 41.66667%; }\n  .offset-lg-6 {\n    margin-left: 50%; }\n  .offset-lg-7 {\n    margin-left: 58.33333%; }\n  .offset-lg-8 {\n    margin-left: 66.66667%; }\n  .offset-lg-9 {\n    margin-left: 75%; }\n  .offset-lg-10 {\n    margin-left: 83.33333%; }\n  .offset-lg-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 1200px) {\n  .col-xl {\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    max-width: 100%; }\n  .col-xl-auto {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: auto; }\n  .col-xl-1 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 8.33333%;\n            flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-xl-2 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 16.66667%;\n            flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-xl-3 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%;\n    max-width: 25%; }\n  .col-xl-4 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 33.33333%;\n            flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-xl-5 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 41.66667%;\n            flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-xl-6 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n    max-width: 50%; }\n  .col-xl-7 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 58.33333%;\n            flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-xl-8 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 66.66667%;\n            flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-xl-9 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%;\n    max-width: 75%; }\n  .col-xl-10 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 83.33333%;\n            flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-xl-11 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 91.66667%;\n            flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-xl-12 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-xl-0 {\n    right: auto; }\n  .pull-xl-1 {\n    right: 8.33333%; }\n  .pull-xl-2 {\n    right: 16.66667%; }\n  .pull-xl-3 {\n    right: 25%; }\n  .pull-xl-4 {\n    right: 33.33333%; }\n  .pull-xl-5 {\n    right: 41.66667%; }\n  .pull-xl-6 {\n    right: 50%; }\n  .pull-xl-7 {\n    right: 58.33333%; }\n  .pull-xl-8 {\n    right: 66.66667%; }\n  .pull-xl-9 {\n    right: 75%; }\n  .pull-xl-10 {\n    right: 83.33333%; }\n  .pull-xl-11 {\n    right: 91.66667%; }\n  .pull-xl-12 {\n    right: 100%; }\n  .push-xl-0 {\n    left: auto; }\n  .push-xl-1 {\n    left: 8.33333%; }\n  .push-xl-2 {\n    left: 16.66667%; }\n  .push-xl-3 {\n    left: 25%; }\n  .push-xl-4 {\n    left: 33.33333%; }\n  .push-xl-5 {\n    left: 41.66667%; }\n  .push-xl-6 {\n    left: 50%; }\n  .push-xl-7 {\n    left: 58.33333%; }\n  .push-xl-8 {\n    left: 66.66667%; }\n  .push-xl-9 {\n    left: 75%; }\n  .push-xl-10 {\n    left: 83.33333%; }\n  .push-xl-11 {\n    left: 91.66667%; }\n  .push-xl-12 {\n    left: 100%; }\n  .offset-xl-0 {\n    margin-left: 0%; }\n  .offset-xl-1 {\n    margin-left: 8.33333%; }\n  .offset-xl-2 {\n    margin-left: 16.66667%; }\n  .offset-xl-3 {\n    margin-left: 25%; }\n  .offset-xl-4 {\n    margin-left: 33.33333%; }\n  .offset-xl-5 {\n    margin-left: 41.66667%; }\n  .offset-xl-6 {\n    margin-left: 50%; }\n  .offset-xl-7 {\n    margin-left: 58.33333%; }\n  .offset-xl-8 {\n    margin-left: 66.66667%; }\n  .offset-xl-9 {\n    margin-left: 75%; }\n  .offset-xl-10 {\n    margin-left: 83.33333%; }\n  .offset-xl-11 {\n    margin-left: 91.66667%; } }\n\n.table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 1rem; }\n  .table th,\n  .table td {\n    padding: 0.75rem;\n    vertical-align: top;\n    border-top: 1px solid #eceeef; }\n  .table thead th {\n    vertical-align: bottom;\n    border-bottom: 2px solid #eceeef; }\n  .table tbody + tbody {\n    border-top: 2px solid #eceeef; }\n  .table .table {\n    background-color: #fff; }\n\n.table-sm th,\n.table-sm td {\n  padding: 0.3rem; }\n\n.table-bordered {\n  border: 1px solid #eceeef; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #eceeef; }\n  .table-bordered thead th,\n  .table-bordered thead td {\n    border-bottom-width: 2px; }\n\n.table-striped tbody tr:nth-of-type(odd) {\n  background-color: rgba(0, 0, 0, 0.05); }\n\n.table-hover tbody tr:hover {\n  background-color: rgba(0, 0, 0, 0.075); }\n\n.table-active,\n.table-active > th,\n.table-active > td {\n  background-color: rgba(0, 0, 0, 0.075); }\n\n.table-hover .table-active:hover {\n  background-color: rgba(0, 0, 0, 0.075); }\n  .table-hover .table-active:hover > td,\n  .table-hover .table-active:hover > th {\n    background-color: rgba(0, 0, 0, 0.075); }\n\n.table-success,\n.table-success > th,\n.table-success > td {\n  background-color: #dff0d8; }\n\n.table-hover .table-success:hover {\n  background-color: #d0e9c6; }\n  .table-hover .table-success:hover > td,\n  .table-hover .table-success:hover > th {\n    background-color: #d0e9c6; }\n\n.table-info,\n.table-info > th,\n.table-info > td {\n  background-color: #d9edf7; }\n\n.table-hover .table-info:hover {\n  background-color: #c4e3f3; }\n  .table-hover .table-info:hover > td,\n  .table-hover .table-info:hover > th {\n    background-color: #c4e3f3; }\n\n.table-warning,\n.table-warning > th,\n.table-warning > td {\n  background-color: #fcf8e3; }\n\n.table-hover .table-warning:hover {\n  background-color: #faf2cc; }\n  .table-hover .table-warning:hover > td,\n  .table-hover .table-warning:hover > th {\n    background-color: #faf2cc; }\n\n.table-danger,\n.table-danger > th,\n.table-danger > td {\n  background-color: #f2dede; }\n\n.table-hover .table-danger:hover {\n  background-color: #ebcccc; }\n  .table-hover .table-danger:hover > td,\n  .table-hover .table-danger:hover > th {\n    background-color: #ebcccc; }\n\n.thead-inverse th {\n  color: #fff;\n  background-color: #292b2c; }\n\n.thead-default th {\n  color: #464a4c;\n  background-color: #eceeef; }\n\n.table-inverse {\n  color: #fff;\n  background-color: #292b2c; }\n  .table-inverse th,\n  .table-inverse td,\n  .table-inverse thead th {\n    border-color: #fff; }\n  .table-inverse.table-bordered {\n    border: 0; }\n\n.table-responsive {\n  display: block;\n  width: 100%;\n  overflow-x: auto;\n  -ms-overflow-style: -ms-autohiding-scrollbar; }\n  .table-responsive.table-bordered {\n    border: 0; }\n\n.form-control {\n  display: block;\n  width: 100%;\n  padding: 0.5rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.25;\n  color: #464a4c;\n  background-color: #fff;\n  background-image: none;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s; }\n  .form-control::-ms-expand {\n    background-color: transparent;\n    border: 0; }\n  .form-control:focus {\n    color: #464a4c;\n    background-color: #fff;\n    border-color: #5cb3fd;\n    outline: none; }\n  .form-control::-webkit-input-placeholder {\n    color: #636c72;\n    opacity: 1; }\n  .form-control:-ms-input-placeholder {\n    color: #636c72;\n    opacity: 1; }\n  .form-control::placeholder {\n    color: #636c72;\n    opacity: 1; }\n  .form-control:disabled, .form-control[readonly] {\n    background-color: #eceeef;\n    opacity: 1; }\n  .form-control:disabled {\n    cursor: not-allowed; }\n\nselect.form-control:not([size]):not([multiple]) {\n  height: calc(2.25rem + 2px); }\n\nselect.form-control:focus::-ms-value {\n  color: #464a4c;\n  background-color: #fff; }\n\n.form-control-file,\n.form-control-range {\n  display: block; }\n\n.col-form-label {\n  padding-top: calc(0.5rem - 1px * 2);\n  padding-bottom: calc(0.5rem - 1px * 2);\n  margin-bottom: 0; }\n\n.col-form-label-lg {\n  padding-top: calc(0.75rem - 1px * 2);\n  padding-bottom: calc(0.75rem - 1px * 2);\n  font-size: 1.25rem; }\n\n.col-form-label-sm {\n  padding-top: calc(0.25rem - 1px * 2);\n  padding-bottom: calc(0.25rem - 1px * 2);\n  font-size: 0.875rem; }\n\n.col-form-legend {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  margin-bottom: 0;\n  font-size: 1rem; }\n\n.form-control-static {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  margin-bottom: 0;\n  line-height: 1.25;\n  border: solid transparent;\n  border-width: 1px 0; }\n  .form-control-static.form-control-sm, .input-group-sm > .form-control-static.form-control,\n  .input-group-sm > .form-control-static.input-group-addon,\n  .input-group-sm > .input-group-btn > .form-control-static.btn, .form-control-static.form-control-lg, .input-group-lg > .form-control-static.form-control,\n  .input-group-lg > .form-control-static.input-group-addon,\n  .input-group-lg > .input-group-btn > .form-control-static.btn {\n    padding-right: 0;\n    padding-left: 0; }\n\n.form-control-sm, .input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem; }\n\nselect.form-control-sm:not([size]):not([multiple]), .input-group-sm > select.form-control:not([size]):not([multiple]),\n.input-group-sm > select.input-group-addon:not([size]):not([multiple]),\n.input-group-sm > .input-group-btn > select.btn:not([size]):not([multiple]) {\n  height: 1.8125rem; }\n\n.form-control-lg, .input-group-lg > .form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem; }\n\nselect.form-control-lg:not([size]):not([multiple]), .input-group-lg > select.form-control:not([size]):not([multiple]),\n.input-group-lg > select.input-group-addon:not([size]):not([multiple]),\n.input-group-lg > .input-group-btn > select.btn:not([size]):not([multiple]) {\n  height: 3.16667rem; }\n\n.form-group {\n  margin-bottom: 1rem; }\n\n.form-text {\n  display: block;\n  margin-top: 0.25rem; }\n\n.form-check {\n  position: relative;\n  display: block;\n  margin-bottom: 0.5rem; }\n  .form-check.disabled .form-check-label {\n    color: #636c72;\n    cursor: not-allowed; }\n\n.form-check-label {\n  padding-left: 1.25rem;\n  margin-bottom: 0;\n  cursor: pointer; }\n\n.form-check-input {\n  position: absolute;\n  margin-top: 0.25rem;\n  margin-left: -1.25rem; }\n  .form-check-input:only-child {\n    position: static; }\n\n.form-check-inline {\n  display: inline-block; }\n  .form-check-inline .form-check-label {\n    vertical-align: middle; }\n  .form-check-inline + .form-check-inline {\n    margin-left: 0.75rem; }\n\n.form-control-feedback {\n  margin-top: 0.25rem; }\n\n.form-control-success,\n.form-control-warning,\n.form-control-danger {\n  padding-right: 2.25rem;\n  background-repeat: no-repeat;\n  background-position: center right 0.5625rem;\n  background-size: 1.125rem 1.125rem; }\n\n.has-success .form-control-feedback,\n.has-success .form-control-label,\n.has-success .col-form-label,\n.has-success .form-check-label,\n.has-success .custom-control {\n  color: #5cb85c; }\n\n.has-success .form-control {\n  border-color: #5cb85c; }\n\n.has-success .input-group-addon {\n  color: #5cb85c;\n  border-color: #5cb85c;\n  background-color: #eaf6ea; }\n\n.has-success .form-control-success {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%235cb85c' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\"); }\n\n.has-warning .form-control-feedback,\n.has-warning .form-control-label,\n.has-warning .col-form-label,\n.has-warning .form-check-label,\n.has-warning .custom-control {\n  color: #f0ad4e; }\n\n.has-warning .form-control {\n  border-color: #f0ad4e; }\n\n.has-warning .input-group-addon {\n  color: #f0ad4e;\n  border-color: #f0ad4e;\n  background-color: white; }\n\n.has-warning .form-control-warning {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23f0ad4e' d='M4.4 5.324h-.8v-2.46h.8zm0 1.42h-.8V5.89h.8zM3.76.63L.04 7.075c-.115.2.016.425.26.426h7.397c.242 0 .372-.226.258-.426C6.726 4.924 5.47 2.79 4.253.63c-.113-.174-.39-.174-.494 0z'/%3E%3C/svg%3E\"); }\n\n.has-danger .form-control-feedback,\n.has-danger .form-control-label,\n.has-danger .col-form-label,\n.has-danger .form-check-label,\n.has-danger .custom-control {\n  color: #d9534f; }\n\n.has-danger .form-control {\n  border-color: #d9534f; }\n\n.has-danger .input-group-addon {\n  color: #d9534f;\n  border-color: #d9534f;\n  background-color: #fdf7f7; }\n\n.has-danger .form-control-danger {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23d9534f' viewBox='-2 -2 7 7'%3E%3Cpath stroke='%23d9534f' d='M0 0l3 3m0-3L0 3'/%3E%3Ccircle r='.5'/%3E%3Ccircle cx='3' r='.5'/%3E%3Ccircle cy='3' r='.5'/%3E%3Ccircle cx='3' cy='3' r='.5'/%3E%3C/svg%3E\"); }\n\n.form-inline {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row wrap;\n          flex-flow: row wrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  .form-inline .form-check {\n    width: 100%; }\n  @media (min-width: 576px) {\n    .form-inline label {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      margin-bottom: 0; }\n    .form-inline .form-group {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-flex: 0;\n          -ms-flex: 0 0 auto;\n              flex: 0 0 auto;\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-flow: row wrap;\n              flex-flow: row wrap;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      margin-bottom: 0; }\n    .form-inline .form-control {\n      display: inline-block;\n      width: auto;\n      vertical-align: middle; }\n    .form-inline .form-control-static {\n      display: inline-block; }\n    .form-inline .input-group {\n      width: auto; }\n    .form-inline .form-control-label {\n      margin-bottom: 0;\n      vertical-align: middle; }\n    .form-inline .form-check {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      width: auto;\n      margin-top: 0;\n      margin-bottom: 0; }\n    .form-inline .form-check-label {\n      padding-left: 0; }\n    .form-inline .form-check-input {\n      position: relative;\n      margin-top: 0;\n      margin-right: 0.25rem;\n      margin-left: 0; }\n    .form-inline .custom-control {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      padding-left: 0; }\n    .form-inline .custom-control-indicator {\n      position: static;\n      display: inline-block;\n      margin-right: 0.25rem;\n      vertical-align: text-bottom; }\n    .form-inline .has-feedback .form-control-feedback {\n      top: 0; } }\n\n.btn {\n  display: inline-block;\n  font-weight: normal;\n  line-height: 1.25;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  border: 1px solid transparent;\n  padding: 0.5rem 1rem;\n  font-size: 1rem;\n  border-radius: 0.25rem;\n  transition: all 0.2s ease-in-out; }\n  .btn:focus, .btn:hover {\n    text-decoration: none; }\n  .btn:focus, .btn.focus {\n    outline: 0;\n    box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.25); }\n  .btn.disabled, .btn:disabled {\n    cursor: not-allowed;\n    opacity: .65; }\n  .btn:active, .btn.active {\n    background-image: none; }\n\na.btn.disabled,\nfieldset[disabled] a.btn {\n  pointer-events: none; }\n\n.btn-primary {\n  color: #fff;\n  background-color: #0275d8;\n  border-color: #0275d8; }\n  .btn-primary:hover {\n    color: #fff;\n    background-color: #025aa5;\n    border-color: #01549b; }\n  .btn-primary:focus, .btn-primary.focus {\n    box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5); }\n  .btn-primary.disabled, .btn-primary:disabled {\n    background-color: #0275d8;\n    border-color: #0275d8; }\n  .btn-primary:active, .btn-primary.active,\n  .show > .btn-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #025aa5;\n    background-image: none;\n    border-color: #01549b; }\n\n.btn-secondary {\n  color: #292b2c;\n  background-color: #fff;\n  border-color: #ccc; }\n  .btn-secondary:hover {\n    color: #292b2c;\n    background-color: #e6e6e6;\n    border-color: #adadad; }\n  .btn-secondary:focus, .btn-secondary.focus {\n    box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5); }\n  .btn-secondary.disabled, .btn-secondary:disabled {\n    background-color: #fff;\n    border-color: #ccc; }\n  .btn-secondary:active, .btn-secondary.active,\n  .show > .btn-secondary.dropdown-toggle {\n    color: #292b2c;\n    background-color: #e6e6e6;\n    background-image: none;\n    border-color: #adadad; }\n\n.btn-info {\n  color: #fff;\n  background-color: #5bc0de;\n  border-color: #5bc0de; }\n  .btn-info:hover {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #2aabd2; }\n  .btn-info:focus, .btn-info.focus {\n    box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5); }\n  .btn-info.disabled, .btn-info:disabled {\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n  .btn-info:active, .btn-info.active,\n  .show > .btn-info.dropdown-toggle {\n    color: #fff;\n    background-color: #31b0d5;\n    background-image: none;\n    border-color: #2aabd2; }\n\n.btn-success {\n  color: #fff;\n  background-color: #5cb85c;\n  border-color: #5cb85c; }\n  .btn-success:hover {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #419641; }\n  .btn-success:focus, .btn-success.focus {\n    box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5); }\n  .btn-success.disabled, .btn-success:disabled {\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n  .btn-success:active, .btn-success.active,\n  .show > .btn-success.dropdown-toggle {\n    color: #fff;\n    background-color: #449d44;\n    background-image: none;\n    border-color: #419641; }\n\n.btn-warning {\n  color: #fff;\n  background-color: #f0ad4e;\n  border-color: #f0ad4e; }\n  .btn-warning:hover {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #eb9316; }\n  .btn-warning:focus, .btn-warning.focus {\n    box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5); }\n  .btn-warning.disabled, .btn-warning:disabled {\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n  .btn-warning:active, .btn-warning.active,\n  .show > .btn-warning.dropdown-toggle {\n    color: #fff;\n    background-color: #ec971f;\n    background-image: none;\n    border-color: #eb9316; }\n\n.btn-danger {\n  color: #fff;\n  background-color: #d9534f;\n  border-color: #d9534f; }\n  .btn-danger:hover {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #c12e2a; }\n  .btn-danger:focus, .btn-danger.focus {\n    box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5); }\n  .btn-danger.disabled, .btn-danger:disabled {\n    background-color: #d9534f;\n    border-color: #d9534f; }\n  .btn-danger:active, .btn-danger.active,\n  .show > .btn-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #c9302c;\n    background-image: none;\n    border-color: #c12e2a; }\n\n.btn-outline-primary {\n  color: #0275d8;\n  background-image: none;\n  background-color: transparent;\n  border-color: #0275d8; }\n  .btn-outline-primary:hover {\n    color: #fff;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n  .btn-outline-primary:focus, .btn-outline-primary.focus {\n    box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5); }\n  .btn-outline-primary.disabled, .btn-outline-primary:disabled {\n    color: #0275d8;\n    background-color: transparent; }\n  .btn-outline-primary:active, .btn-outline-primary.active,\n  .show > .btn-outline-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n\n.btn-outline-secondary {\n  color: #ccc;\n  background-image: none;\n  background-color: transparent;\n  border-color: #ccc; }\n  .btn-outline-secondary:hover {\n    color: #fff;\n    background-color: #ccc;\n    border-color: #ccc; }\n  .btn-outline-secondary:focus, .btn-outline-secondary.focus {\n    box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5); }\n  .btn-outline-secondary.disabled, .btn-outline-secondary:disabled {\n    color: #ccc;\n    background-color: transparent; }\n  .btn-outline-secondary:active, .btn-outline-secondary.active,\n  .show > .btn-outline-secondary.dropdown-toggle {\n    color: #fff;\n    background-color: #ccc;\n    border-color: #ccc; }\n\n.btn-outline-info {\n  color: #5bc0de;\n  background-image: none;\n  background-color: transparent;\n  border-color: #5bc0de; }\n  .btn-outline-info:hover {\n    color: #fff;\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n  .btn-outline-info:focus, .btn-outline-info.focus {\n    box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5); }\n  .btn-outline-info.disabled, .btn-outline-info:disabled {\n    color: #5bc0de;\n    background-color: transparent; }\n  .btn-outline-info:active, .btn-outline-info.active,\n  .show > .btn-outline-info.dropdown-toggle {\n    color: #fff;\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n\n.btn-outline-success {\n  color: #5cb85c;\n  background-image: none;\n  background-color: transparent;\n  border-color: #5cb85c; }\n  .btn-outline-success:hover {\n    color: #fff;\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n  .btn-outline-success:focus, .btn-outline-success.focus {\n    box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5); }\n  .btn-outline-success.disabled, .btn-outline-success:disabled {\n    color: #5cb85c;\n    background-color: transparent; }\n  .btn-outline-success:active, .btn-outline-success.active,\n  .show > .btn-outline-success.dropdown-toggle {\n    color: #fff;\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n\n.btn-outline-warning {\n  color: #f0ad4e;\n  background-image: none;\n  background-color: transparent;\n  border-color: #f0ad4e; }\n  .btn-outline-warning:hover {\n    color: #fff;\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n  .btn-outline-warning:focus, .btn-outline-warning.focus {\n    box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5); }\n  .btn-outline-warning.disabled, .btn-outline-warning:disabled {\n    color: #f0ad4e;\n    background-color: transparent; }\n  .btn-outline-warning:active, .btn-outline-warning.active,\n  .show > .btn-outline-warning.dropdown-toggle {\n    color: #fff;\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n\n.btn-outline-danger {\n  color: #d9534f;\n  background-image: none;\n  background-color: transparent;\n  border-color: #d9534f; }\n  .btn-outline-danger:hover {\n    color: #fff;\n    background-color: #d9534f;\n    border-color: #d9534f; }\n  .btn-outline-danger:focus, .btn-outline-danger.focus {\n    box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5); }\n  .btn-outline-danger.disabled, .btn-outline-danger:disabled {\n    color: #d9534f;\n    background-color: transparent; }\n  .btn-outline-danger:active, .btn-outline-danger.active,\n  .show > .btn-outline-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #d9534f;\n    border-color: #d9534f; }\n\n.btn-link {\n  font-weight: normal;\n  color: #0275d8;\n  border-radius: 0; }\n  .btn-link, .btn-link:active, .btn-link.active, .btn-link:disabled {\n    background-color: transparent; }\n  .btn-link, .btn-link:focus, .btn-link:active {\n    border-color: transparent; }\n  .btn-link:hover {\n    border-color: transparent; }\n  .btn-link:focus, .btn-link:hover {\n    color: #014c8c;\n    text-decoration: underline;\n    background-color: transparent; }\n  .btn-link:disabled {\n    color: #636c72; }\n    .btn-link:disabled:focus, .btn-link:disabled:hover {\n      text-decoration: none; }\n\n.btn-lg, .btn-group-lg > .btn {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem; }\n\n.btn-sm, .btn-group-sm > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem; }\n\n.btn-block {\n  display: block;\n  width: 100%; }\n\n.btn-block + .btn-block {\n  margin-top: 0.5rem; }\n\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%; }\n\n.fade {\n  opacity: 0;\n  transition: opacity 0.15s linear; }\n  .fade.show {\n    opacity: 1; }\n\n.collapse {\n  display: none; }\n  .collapse.show {\n    display: block; }\n\ntr.collapse.show {\n  display: table-row; }\n\ntbody.collapse.show {\n  display: table-row-group; }\n\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  transition: height 0.35s ease; }\n\n.dropup,\n.dropdown {\n  position: relative; }\n\n.dropdown-toggle::after {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 0.3em;\n  vertical-align: middle;\n  content: \"\";\n  border-top: 0.3em solid;\n  border-right: 0.3em solid transparent;\n  border-left: 0.3em solid transparent; }\n\n.dropdown-toggle:focus {\n  outline: 0; }\n\n.dropup .dropdown-toggle::after {\n  border-top: 0;\n  border-bottom: 0.3em solid; }\n\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 10rem;\n  padding: 0.5rem 0;\n  margin: 0.125rem 0 0;\n  font-size: 1rem;\n  color: #292b2c;\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n\n.dropdown-divider {\n  height: 1px;\n  margin: 0.5rem 0;\n  overflow: hidden;\n  background-color: #eceeef; }\n\n.dropdown-item {\n  display: block;\n  width: 100%;\n  padding: 3px 1.5rem;\n  clear: both;\n  font-weight: normal;\n  color: #292b2c;\n  text-align: inherit;\n  white-space: nowrap;\n  background: none;\n  border: 0; }\n  .dropdown-item:focus, .dropdown-item:hover {\n    color: #1d1e1f;\n    text-decoration: none;\n    background-color: #f7f7f9; }\n  .dropdown-item.active, .dropdown-item:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #0275d8; }\n  .dropdown-item.disabled, .dropdown-item:disabled {\n    color: #636c72;\n    cursor: not-allowed;\n    background-color: transparent; }\n\n.show > .dropdown-menu {\n  display: block; }\n\n.show > a {\n  outline: 0; }\n\n.dropdown-menu-right {\n  right: 0;\n  left: auto; }\n\n.dropdown-menu-left {\n  right: auto;\n  left: 0; }\n\n.dropdown-header {\n  display: block;\n  padding: 0.5rem 1.5rem;\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  color: #636c72;\n  white-space: nowrap; }\n\n.dropdown-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 990; }\n\n.dropup .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 0.125rem; }\n\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  vertical-align: middle; }\n  .btn-group > .btn,\n  .btn-group-vertical > .btn {\n    position: relative;\n    -webkit-box-flex: 0;\n        -ms-flex: 0 1 auto;\n            flex: 0 1 auto; }\n    .btn-group > .btn:hover,\n    .btn-group-vertical > .btn:hover {\n      z-index: 2; }\n    .btn-group > .btn:focus, .btn-group > .btn:active, .btn-group > .btn.active,\n    .btn-group-vertical > .btn:focus,\n    .btn-group-vertical > .btn:active,\n    .btn-group-vertical > .btn.active {\n      z-index: 2; }\n  .btn-group .btn + .btn,\n  .btn-group .btn + .btn-group,\n  .btn-group .btn-group + .btn,\n  .btn-group .btn-group + .btn-group,\n  .btn-group-vertical .btn + .btn,\n  .btn-group-vertical .btn + .btn-group,\n  .btn-group-vertical .btn-group + .btn,\n  .btn-group-vertical .btn-group + .btn-group {\n    margin-left: -1px; }\n\n.btn-toolbar {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start; }\n  .btn-toolbar .input-group {\n    width: auto; }\n\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0; }\n\n.btn-group > .btn:first-child {\n  margin-left: 0; }\n  .btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\n    border-bottom-right-radius: 0;\n    border-top-right-radius: 0; }\n\n.btn-group > .btn:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group > .btn-group {\n  float: left; }\n\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0; }\n\n.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0; }\n\n.btn + .dropdown-toggle-split {\n  padding-right: 0.75rem;\n  padding-left: 0.75rem; }\n  .btn + .dropdown-toggle-split::after {\n    margin-left: 0; }\n\n.btn-sm + .dropdown-toggle-split, .btn-group-sm > .btn + .dropdown-toggle-split {\n  padding-right: 0.375rem;\n  padding-left: 0.375rem; }\n\n.btn-lg + .dropdown-toggle-split, .btn-group-lg > .btn + .dropdown-toggle-split {\n  padding-right: 1.125rem;\n  padding-left: 1.125rem; }\n\n.btn-group-vertical {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  .btn-group-vertical .btn,\n  .btn-group-vertical .btn-group {\n    width: 100%; }\n  .btn-group-vertical > .btn + .btn,\n  .btn-group-vertical > .btn + .btn-group,\n  .btn-group-vertical > .btn-group + .btn,\n  .btn-group-vertical > .btn-group + .btn-group {\n    margin-top: -1px;\n    margin-left: 0; }\n\n.btn-group-vertical > .btn:not(:first-child):not(:last-child) {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn:first-child:not(:last-child) {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn:last-child:not(:first-child) {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n[data-toggle=\"buttons\"] > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"checkbox\"] {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none; }\n\n.input-group {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%; }\n  .input-group .form-control {\n    position: relative;\n    z-index: 2;\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n    width: 1%;\n    margin-bottom: 0; }\n    .input-group .form-control:focus, .input-group .form-control:active, .input-group .form-control:hover {\n      z-index: 3; }\n\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  .input-group-addon:not(:first-child):not(:last-child),\n  .input-group-btn:not(:first-child):not(:last-child),\n  .input-group .form-control:not(:first-child):not(:last-child) {\n    border-radius: 0; }\n\n.input-group-addon,\n.input-group-btn {\n  white-space: nowrap;\n  vertical-align: middle; }\n\n.input-group-addon {\n  padding: 0.5rem 0.75rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1.25;\n  color: #464a4c;\n  text-align: center;\n  background-color: #eceeef;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n  .input-group-addon.form-control-sm,\n  .input-group-sm > .input-group-addon,\n  .input-group-sm > .input-group-btn > .input-group-addon.btn {\n    padding: 0.25rem 0.5rem;\n    font-size: 0.875rem;\n    border-radius: 0.2rem; }\n  .input-group-addon.form-control-lg,\n  .input-group-lg > .input-group-addon,\n  .input-group-lg > .input-group-btn > .input-group-addon.btn {\n    padding: 0.75rem 1.5rem;\n    font-size: 1.25rem;\n    border-radius: 0.3rem; }\n  .input-group-addon input[type=\"radio\"],\n  .input-group-addon input[type=\"checkbox\"] {\n    margin-top: 0; }\n\n.input-group .form-control:not(:last-child),\n.input-group-addon:not(:last-child),\n.input-group-btn:not(:last-child) > .btn,\n.input-group-btn:not(:last-child) > .btn-group > .btn,\n.input-group-btn:not(:last-child) > .dropdown-toggle,\n.input-group-btn:not(:first-child) > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:not(:first-child) > .btn-group:not(:last-child) > .btn {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.input-group-addon:not(:last-child) {\n  border-right: 0; }\n\n.input-group .form-control:not(:first-child),\n.input-group-addon:not(:first-child),\n.input-group-btn:not(:first-child) > .btn,\n.input-group-btn:not(:first-child) > .btn-group > .btn,\n.input-group-btn:not(:first-child) > .dropdown-toggle,\n.input-group-btn:not(:last-child) > .btn:not(:first-child),\n.input-group-btn:not(:last-child) > .btn-group:not(:first-child) > .btn {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.form-control + .input-group-addon:not(:first-child) {\n  border-left: 0; }\n\n.input-group-btn {\n  position: relative;\n  font-size: 0;\n  white-space: nowrap; }\n  .input-group-btn > .btn {\n    position: relative;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1; }\n    .input-group-btn > .btn + .btn {\n      margin-left: -1px; }\n    .input-group-btn > .btn:focus, .input-group-btn > .btn:active, .input-group-btn > .btn:hover {\n      z-index: 3; }\n  .input-group-btn:not(:last-child) > .btn,\n  .input-group-btn:not(:last-child) > .btn-group {\n    margin-right: -1px; }\n  .input-group-btn:not(:first-child) > .btn,\n  .input-group-btn:not(:first-child) > .btn-group {\n    z-index: 2;\n    margin-left: -1px; }\n    .input-group-btn:not(:first-child) > .btn:focus, .input-group-btn:not(:first-child) > .btn:active, .input-group-btn:not(:first-child) > .btn:hover,\n    .input-group-btn:not(:first-child) > .btn-group:focus,\n    .input-group-btn:not(:first-child) > .btn-group:active,\n    .input-group-btn:not(:first-child) > .btn-group:hover {\n      z-index: 3; }\n\n.custom-control {\n  position: relative;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  min-height: 1.5rem;\n  padding-left: 1.5rem;\n  margin-right: 1rem;\n  cursor: pointer; }\n\n.custom-control-input {\n  position: absolute;\n  z-index: -1;\n  opacity: 0; }\n  .custom-control-input:checked ~ .custom-control-indicator {\n    color: #fff;\n    background-color: #0275d8; }\n  .custom-control-input:focus ~ .custom-control-indicator {\n    box-shadow: 0 0 0 1px #fff, 0 0 0 3px #0275d8; }\n  .custom-control-input:active ~ .custom-control-indicator {\n    color: #fff;\n    background-color: #8fcafe; }\n  .custom-control-input:disabled ~ .custom-control-indicator {\n    cursor: not-allowed;\n    background-color: #eceeef; }\n  .custom-control-input:disabled ~ .custom-control-description {\n    color: #636c72;\n    cursor: not-allowed; }\n\n.custom-control-indicator {\n  position: absolute;\n  top: 0.25rem;\n  left: 0;\n  display: block;\n  width: 1rem;\n  height: 1rem;\n  pointer-events: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-color: #ddd;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: 50% 50%; }\n\n.custom-checkbox .custom-control-indicator {\n  border-radius: 0.25rem; }\n\n.custom-checkbox .custom-control-input:checked ~ .custom-control-indicator {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E\"); }\n\n.custom-checkbox .custom-control-input:indeterminate ~ .custom-control-indicator {\n  background-color: #0275d8;\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3E%3Cpath stroke='%23fff' d='M0 2h4'/%3E%3C/svg%3E\"); }\n\n.custom-radio .custom-control-indicator {\n  border-radius: 50%; }\n\n.custom-radio .custom-control-input:checked ~ .custom-control-indicator {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='%23fff'/%3E%3C/svg%3E\"); }\n\n.custom-controls-stacked {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n  .custom-controls-stacked .custom-control {\n    margin-bottom: 0.25rem; }\n    .custom-controls-stacked .custom-control + .custom-control {\n      margin-left: 0; }\n\n.custom-select {\n  display: inline-block;\n  max-width: 100%;\n  height: calc(2.25rem + 2px);\n  padding: 0.375rem 1.75rem 0.375rem 0.75rem;\n  line-height: 1.25;\n  color: #464a4c;\n  vertical-align: middle;\n  background: #fff url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23333' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E\") no-repeat right 0.75rem center;\n  background-size: 8px 10px;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n  -moz-appearance: none;\n  -webkit-appearance: none; }\n  .custom-select:focus {\n    border-color: #5cb3fd;\n    outline: none; }\n    .custom-select:focus::-ms-value {\n      color: #464a4c;\n      background-color: #fff; }\n  .custom-select:disabled {\n    color: #636c72;\n    cursor: not-allowed;\n    background-color: #eceeef; }\n  .custom-select::-ms-expand {\n    opacity: 0; }\n\n.custom-select-sm {\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n  font-size: 75%; }\n\n.custom-file {\n  position: relative;\n  display: inline-block;\n  max-width: 100%;\n  height: 2.5rem;\n  margin-bottom: 0;\n  cursor: pointer; }\n\n.custom-file-input {\n  min-width: 14rem;\n  max-width: 100%;\n  height: 2.5rem;\n  margin: 0;\n  filter: alpha(opacity=0);\n  opacity: 0; }\n\n.custom-file-control {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 5;\n  height: 2.5rem;\n  padding: 0.5rem 1rem;\n  line-height: 1.5;\n  color: #464a4c;\n  pointer-events: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n  .custom-file-control:lang(en)::after {\n    content: \"Choose file...\"; }\n  .custom-file-control::before {\n    position: absolute;\n    top: -1px;\n    right: -1px;\n    bottom: -1px;\n    z-index: 6;\n    display: block;\n    height: 2.5rem;\n    padding: 0.5rem 1rem;\n    line-height: 1.5;\n    color: #464a4c;\n    background-color: #eceeef;\n    border: 1px solid rgba(0, 0, 0, 0.15);\n    border-radius: 0 0.25rem 0.25rem 0; }\n  .custom-file-control:lang(en)::before {\n    content: \"Browse\"; }\n\n.nav {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n\n.nav-link {\n  display: block;\n  padding: 0.5em 1em; }\n  .nav-link:focus, .nav-link:hover {\n    text-decoration: none; }\n  .nav-link.disabled {\n    color: #636c72;\n    cursor: not-allowed; }\n\n.nav-tabs {\n  border-bottom: 1px solid #ddd; }\n  .nav-tabs .nav-item {\n    margin-bottom: -1px; }\n  .nav-tabs .nav-link {\n    border: 1px solid transparent;\n    border-top-right-radius: 0.25rem;\n    border-top-left-radius: 0.25rem; }\n    .nav-tabs .nav-link:focus, .nav-tabs .nav-link:hover {\n      border-color: #eceeef #eceeef #ddd; }\n    .nav-tabs .nav-link.disabled {\n      color: #636c72;\n      background-color: transparent;\n      border-color: transparent; }\n  .nav-tabs .nav-link.active,\n  .nav-tabs .nav-item.show .nav-link {\n    color: #464a4c;\n    background-color: #fff;\n    border-color: #ddd #ddd #fff; }\n  .nav-tabs .dropdown-menu {\n    margin-top: -1px;\n    border-top-right-radius: 0;\n    border-top-left-radius: 0; }\n\n.nav-pills .nav-link {\n  border-radius: 0.25rem; }\n\n.nav-pills .nav-link.active,\n.nav-pills .nav-item.show .nav-link {\n  color: #fff;\n  cursor: default;\n  background-color: #0275d8; }\n\n.nav-fill .nav-item {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  text-align: center; }\n\n.nav-justified .nav-item {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 100%;\n          flex: 1 1 100%;\n  text-align: center; }\n\n.tab-content > .tab-pane {\n  display: none; }\n\n.tab-content > .active {\n  display: block; }\n\n.navbar {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding: 0.5rem 1rem; }\n\n.navbar-brand {\n  display: inline-block;\n  padding-top: .25rem;\n  padding-bottom: .25rem;\n  margin-right: 1rem;\n  font-size: 1.25rem;\n  line-height: inherit;\n  white-space: nowrap; }\n  .navbar-brand:focus, .navbar-brand:hover {\n    text-decoration: none; }\n\n.navbar-nav {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n  .navbar-nav .nav-link {\n    padding-right: 0;\n    padding-left: 0; }\n\n.navbar-text {\n  display: inline-block;\n  padding-top: .425rem;\n  padding-bottom: .425rem; }\n\n.navbar-toggler {\n  -ms-flex-item-align: start;\n      align-self: flex-start;\n  padding: 0.25rem 0.75rem;\n  font-size: 1.25rem;\n  line-height: 1;\n  background: transparent;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n  .navbar-toggler:focus, .navbar-toggler:hover {\n    text-decoration: none; }\n\n.navbar-toggler-icon {\n  display: inline-block;\n  width: 1.5em;\n  height: 1.5em;\n  vertical-align: middle;\n  content: \"\";\n  background: no-repeat center center;\n  background-size: 100% 100%; }\n\n.navbar-toggler-left {\n  position: absolute;\n  left: 1rem; }\n\n.navbar-toggler-right {\n  position: absolute;\n  right: 1rem; }\n\n@media (max-width: 575px) {\n  .navbar-toggleable .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 576px) {\n  .navbar-toggleable {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    .navbar-toggleable .navbar-nav {\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row; }\n      .navbar-toggleable .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable > .container {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    .navbar-toggleable .navbar-collapse {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 767px) {\n  .navbar-toggleable-sm .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-sm > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 768px) {\n  .navbar-toggleable-sm {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    .navbar-toggleable-sm .navbar-nav {\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row; }\n      .navbar-toggleable-sm .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable-sm > .container {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    .navbar-toggleable-sm .navbar-collapse {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable-sm .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 991px) {\n  .navbar-toggleable-md .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-md > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 992px) {\n  .navbar-toggleable-md {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    .navbar-toggleable-md .navbar-nav {\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row; }\n      .navbar-toggleable-md .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable-md > .container {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    .navbar-toggleable-md .navbar-collapse {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable-md .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 1199px) {\n  .navbar-toggleable-lg .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-lg > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 1200px) {\n  .navbar-toggleable-lg {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    .navbar-toggleable-lg .navbar-nav {\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row; }\n      .navbar-toggleable-lg .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable-lg > .container {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    .navbar-toggleable-lg .navbar-collapse {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable-lg .navbar-toggler {\n      display: none; } }\n\n.navbar-toggleable-xl {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: nowrap;\n      flex-wrap: nowrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  .navbar-toggleable-xl .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-xl > .container {\n    padding-right: 0;\n    padding-left: 0; }\n  .navbar-toggleable-xl .navbar-nav {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row; }\n    .navbar-toggleable-xl .navbar-nav .nav-link {\n      padding-right: .5rem;\n      padding-left: .5rem; }\n  .navbar-toggleable-xl > .container {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  .navbar-toggleable-xl .navbar-collapse {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    width: 100%; }\n  .navbar-toggleable-xl .navbar-toggler {\n    display: none; }\n\n.navbar-light .navbar-brand,\n.navbar-light .navbar-toggler {\n  color: rgba(0, 0, 0, 0.9); }\n  .navbar-light .navbar-brand:focus, .navbar-light .navbar-brand:hover,\n  .navbar-light .navbar-toggler:focus,\n  .navbar-light .navbar-toggler:hover {\n    color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-nav .nav-link {\n  color: rgba(0, 0, 0, 0.5); }\n  .navbar-light .navbar-nav .nav-link:focus, .navbar-light .navbar-nav .nav-link:hover {\n    color: rgba(0, 0, 0, 0.7); }\n  .navbar-light .navbar-nav .nav-link.disabled {\n    color: rgba(0, 0, 0, 0.3); }\n\n.navbar-light .navbar-nav .open > .nav-link,\n.navbar-light .navbar-nav .active > .nav-link,\n.navbar-light .navbar-nav .nav-link.open,\n.navbar-light .navbar-nav .nav-link.active {\n  color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-toggler {\n  border-color: rgba(0, 0, 0, 0.1); }\n\n.navbar-light .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\"); }\n\n.navbar-light .navbar-text {\n  color: rgba(0, 0, 0, 0.5); }\n\n.navbar-inverse .navbar-brand,\n.navbar-inverse .navbar-toggler {\n  color: white; }\n  .navbar-inverse .navbar-brand:focus, .navbar-inverse .navbar-brand:hover,\n  .navbar-inverse .navbar-toggler:focus,\n  .navbar-inverse .navbar-toggler:hover {\n    color: white; }\n\n.navbar-inverse .navbar-nav .nav-link {\n  color: rgba(255, 255, 255, 0.5); }\n  .navbar-inverse .navbar-nav .nav-link:focus, .navbar-inverse .navbar-nav .nav-link:hover {\n    color: rgba(255, 255, 255, 0.75); }\n  .navbar-inverse .navbar-nav .nav-link.disabled {\n    color: rgba(255, 255, 255, 0.25); }\n\n.navbar-inverse .navbar-nav .open > .nav-link,\n.navbar-inverse .navbar-nav .active > .nav-link,\n.navbar-inverse .navbar-nav .nav-link.open,\n.navbar-inverse .navbar-nav .nav-link.active {\n  color: white; }\n\n.navbar-inverse .navbar-toggler {\n  border-color: rgba(255, 255, 255, 0.1); }\n\n.navbar-inverse .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\"); }\n\n.navbar-inverse .navbar-text {\n  color: rgba(255, 255, 255, 0.5); }\n\n.card {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.25rem; }\n\n.card-block {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  padding: 1.25rem; }\n\n.card-title {\n  margin-bottom: 0.75rem; }\n\n.card-subtitle {\n  margin-top: -0.375rem;\n  margin-bottom: 0; }\n\n.card-text:last-child {\n  margin-bottom: 0; }\n\n.card-link:hover {\n  text-decoration: none; }\n\n.card-link + .card-link {\n  margin-left: 1.25rem; }\n\n.card > .list-group:first-child .list-group-item:first-child {\n  border-top-right-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.card > .list-group:last-child .list-group-item:last-child {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem; }\n\n.card-header {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: #f7f7f9;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-header:first-child {\n    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0; }\n\n.card-footer {\n  padding: 0.75rem 1.25rem;\n  background-color: #f7f7f9;\n  border-top: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-footer:last-child {\n    border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px); }\n\n.card-header-tabs {\n  margin-right: -0.625rem;\n  margin-bottom: -0.75rem;\n  margin-left: -0.625rem;\n  border-bottom: 0; }\n\n.card-header-pills {\n  margin-right: -0.625rem;\n  margin-left: -0.625rem; }\n\n.card-primary {\n  background-color: #0275d8;\n  border-color: #0275d8; }\n  .card-primary .card-header,\n  .card-primary .card-footer {\n    background-color: transparent; }\n\n.card-success {\n  background-color: #5cb85c;\n  border-color: #5cb85c; }\n  .card-success .card-header,\n  .card-success .card-footer {\n    background-color: transparent; }\n\n.card-info {\n  background-color: #5bc0de;\n  border-color: #5bc0de; }\n  .card-info .card-header,\n  .card-info .card-footer {\n    background-color: transparent; }\n\n.card-warning {\n  background-color: #f0ad4e;\n  border-color: #f0ad4e; }\n  .card-warning .card-header,\n  .card-warning .card-footer {\n    background-color: transparent; }\n\n.card-danger {\n  background-color: #d9534f;\n  border-color: #d9534f; }\n  .card-danger .card-header,\n  .card-danger .card-footer {\n    background-color: transparent; }\n\n.card-outline-primary {\n  background-color: transparent;\n  border-color: #0275d8; }\n\n.card-outline-secondary {\n  background-color: transparent;\n  border-color: #ccc; }\n\n.card-outline-info {\n  background-color: transparent;\n  border-color: #5bc0de; }\n\n.card-outline-success {\n  background-color: transparent;\n  border-color: #5cb85c; }\n\n.card-outline-warning {\n  background-color: transparent;\n  border-color: #f0ad4e; }\n\n.card-outline-danger {\n  background-color: transparent;\n  border-color: #d9534f; }\n\n.card-inverse {\n  color: rgba(255, 255, 255, 0.65); }\n  .card-inverse .card-header,\n  .card-inverse .card-footer {\n    background-color: transparent;\n    border-color: rgba(255, 255, 255, 0.2); }\n  .card-inverse .card-header,\n  .card-inverse .card-footer,\n  .card-inverse .card-title,\n  .card-inverse .card-blockquote {\n    color: #fff; }\n  .card-inverse .card-link,\n  .card-inverse .card-text,\n  .card-inverse .card-subtitle,\n  .card-inverse .card-blockquote .blockquote-footer {\n    color: rgba(255, 255, 255, 0.65); }\n  .card-inverse .card-link:focus, .card-inverse .card-link:hover {\n    color: #fff; }\n\n.card-blockquote {\n  padding: 0;\n  margin-bottom: 0;\n  border-left: 0; }\n\n.card-img {\n  border-radius: calc(0.25rem - 1px); }\n\n.card-img-overlay {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: 1.25rem; }\n\n.card-img-top {\n  border-top-right-radius: calc(0.25rem - 1px);\n  border-top-left-radius: calc(0.25rem - 1px); }\n\n.card-img-bottom {\n  border-bottom-right-radius: calc(0.25rem - 1px);\n  border-bottom-left-radius: calc(0.25rem - 1px); }\n\n@media (min-width: 576px) {\n  .card-deck {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-flow: row wrap;\n            flex-flow: row wrap; }\n    .card-deck .card {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-flex: 1;\n          -ms-flex: 1 0 0px;\n              flex: 1 0 0;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: column;\n              flex-direction: column; }\n      .card-deck .card:not(:first-child) {\n        margin-left: 15px; }\n      .card-deck .card:not(:last-child) {\n        margin-right: 15px; } }\n\n@media (min-width: 576px) {\n  .card-group {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-flow: row wrap;\n            flex-flow: row wrap; }\n    .card-group .card {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 0 0px;\n              flex: 1 0 0; }\n      .card-group .card + .card {\n        margin-left: 0;\n        border-left: 0; }\n      .card-group .card:first-child {\n        border-bottom-right-radius: 0;\n        border-top-right-radius: 0; }\n        .card-group .card:first-child .card-img-top {\n          border-top-right-radius: 0; }\n        .card-group .card:first-child .card-img-bottom {\n          border-bottom-right-radius: 0; }\n      .card-group .card:last-child {\n        border-bottom-left-radius: 0;\n        border-top-left-radius: 0; }\n        .card-group .card:last-child .card-img-top {\n          border-top-left-radius: 0; }\n        .card-group .card:last-child .card-img-bottom {\n          border-bottom-left-radius: 0; }\n      .card-group .card:not(:first-child):not(:last-child) {\n        border-radius: 0; }\n        .card-group .card:not(:first-child):not(:last-child) .card-img-top,\n        .card-group .card:not(:first-child):not(:last-child) .card-img-bottom {\n          border-radius: 0; } }\n\n@media (min-width: 576px) {\n  .card-columns {\n    -webkit-column-count: 3;\n            column-count: 3;\n    -webkit-column-gap: 1.25rem;\n            column-gap: 1.25rem; }\n    .card-columns .card {\n      display: inline-block;\n      width: 100%;\n      margin-bottom: 0.75rem; } }\n\n.breadcrumb {\n  padding: 0.75rem 1rem;\n  margin-bottom: 1rem;\n  list-style: none;\n  background-color: #eceeef;\n  border-radius: 0.25rem; }\n  .breadcrumb::after {\n    display: block;\n    content: \"\";\n    clear: both; }\n\n.breadcrumb-item {\n  float: left; }\n  .breadcrumb-item + .breadcrumb-item::before {\n    display: inline-block;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    color: #636c72;\n    content: \"/\"; }\n  .breadcrumb-item + .breadcrumb-item:hover::before {\n    text-decoration: underline; }\n  .breadcrumb-item + .breadcrumb-item:hover::before {\n    text-decoration: none; }\n  .breadcrumb-item.active {\n    color: #636c72; }\n\n.pagination {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding-left: 0;\n  list-style: none;\n  border-radius: 0.25rem; }\n\n.page-item:first-child .page-link {\n  margin-left: 0;\n  border-bottom-left-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.page-item:last-child .page-link {\n  border-bottom-right-radius: 0.25rem;\n  border-top-right-radius: 0.25rem; }\n\n.page-item.active .page-link {\n  z-index: 2;\n  color: #fff;\n  background-color: #0275d8;\n  border-color: #0275d8; }\n\n.page-item.disabled .page-link {\n  color: #636c72;\n  pointer-events: none;\n  cursor: not-allowed;\n  background-color: #fff;\n  border-color: #ddd; }\n\n.page-link {\n  position: relative;\n  display: block;\n  padding: 0.5rem 0.75rem;\n  margin-left: -1px;\n  line-height: 1.25;\n  color: #0275d8;\n  background-color: #fff;\n  border: 1px solid #ddd; }\n  .page-link:focus, .page-link:hover {\n    color: #014c8c;\n    text-decoration: none;\n    background-color: #eceeef;\n    border-color: #ddd; }\n\n.pagination-lg .page-link {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem; }\n\n.pagination-lg .page-item:first-child .page-link {\n  border-bottom-left-radius: 0.3rem;\n  border-top-left-radius: 0.3rem; }\n\n.pagination-lg .page-item:last-child .page-link {\n  border-bottom-right-radius: 0.3rem;\n  border-top-right-radius: 0.3rem; }\n\n.pagination-sm .page-link {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem; }\n\n.pagination-sm .page-item:first-child .page-link {\n  border-bottom-left-radius: 0.2rem;\n  border-top-left-radius: 0.2rem; }\n\n.pagination-sm .page-item:last-child .page-link {\n  border-bottom-right-radius: 0.2rem;\n  border-top-right-radius: 0.2rem; }\n\n.badge {\n  display: inline-block;\n  padding: 0.25em 0.4em;\n  font-size: 75%;\n  font-weight: bold;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25rem; }\n  .badge:empty {\n    display: none; }\n\n.btn .badge {\n  position: relative;\n  top: -1px; }\n\na.badge:focus, a.badge:hover {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer; }\n\n.badge-pill {\n  padding-right: 0.6em;\n  padding-left: 0.6em;\n  border-radius: 10rem; }\n\n.badge-default {\n  background-color: #636c72; }\n  .badge-default[href]:focus, .badge-default[href]:hover {\n    background-color: #4b5257; }\n\n.badge-primary {\n  background-color: #0275d8; }\n  .badge-primary[href]:focus, .badge-primary[href]:hover {\n    background-color: #025aa5; }\n\n.badge-success {\n  background-color: #5cb85c; }\n  .badge-success[href]:focus, .badge-success[href]:hover {\n    background-color: #449d44; }\n\n.badge-info {\n  background-color: #5bc0de; }\n  .badge-info[href]:focus, .badge-info[href]:hover {\n    background-color: #31b0d5; }\n\n.badge-warning {\n  background-color: #f0ad4e; }\n  .badge-warning[href]:focus, .badge-warning[href]:hover {\n    background-color: #ec971f; }\n\n.badge-danger {\n  background-color: #d9534f; }\n  .badge-danger[href]:focus, .badge-danger[href]:hover {\n    background-color: #c9302c; }\n\n.jumbotron {\n  padding: 2rem 1rem;\n  margin-bottom: 2rem;\n  background-color: #eceeef;\n  border-radius: 0.3rem; }\n  @media (min-width: 576px) {\n    .jumbotron {\n      padding: 4rem 2rem; } }\n\n.jumbotron-hr {\n  border-top-color: #d0d5d8; }\n\n.jumbotron-fluid {\n  padding-right: 0;\n  padding-left: 0;\n  border-radius: 0; }\n\n.alert {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n\n.alert-heading {\n  color: inherit; }\n\n.alert-link {\n  font-weight: bold; }\n\n.alert-dismissible .close {\n  position: relative;\n  top: -0.75rem;\n  right: -1.25rem;\n  padding: 0.75rem 1.25rem;\n  color: inherit; }\n\n.alert-success {\n  background-color: #dff0d8;\n  border-color: #d0e9c6;\n  color: #3c763d; }\n  .alert-success hr {\n    border-top-color: #c1e2b3; }\n  .alert-success .alert-link {\n    color: #2b542c; }\n\n.alert-info {\n  background-color: #d9edf7;\n  border-color: #bcdff1;\n  color: #31708f; }\n  .alert-info hr {\n    border-top-color: #a6d5ec; }\n  .alert-info .alert-link {\n    color: #245269; }\n\n.alert-warning {\n  background-color: #fcf8e3;\n  border-color: #faf2cc;\n  color: #8a6d3b; }\n  .alert-warning hr {\n    border-top-color: #f7ecb5; }\n  .alert-warning .alert-link {\n    color: #66512c; }\n\n.alert-danger {\n  background-color: #f2dede;\n  border-color: #ebcccc;\n  color: #a94442; }\n  .alert-danger hr {\n    border-top-color: #e4b9b9; }\n  .alert-danger .alert-link {\n    color: #843534; }\n\n@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0; }\n  to {\n    background-position: 0 0; } }\n\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0; }\n  to {\n    background-position: 0 0; } }\n\n.progress {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  overflow: hidden;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  text-align: center;\n  background-color: #eceeef;\n  border-radius: 0.25rem; }\n\n.progress-bar {\n  height: 1rem;\n  color: #fff;\n  background-color: #0275d8; }\n\n.progress-bar-striped {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem; }\n\n.progress-bar-animated {\n  -webkit-animation: progress-bar-stripes 1s linear infinite;\n          animation: progress-bar-stripes 1s linear infinite; }\n\n.media {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start; }\n\n.media-body {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1; }\n\n.list-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0; }\n\n.list-group-item-action {\n  width: 100%;\n  color: #464a4c;\n  text-align: inherit; }\n  .list-group-item-action .list-group-item-heading {\n    color: #292b2c; }\n  .list-group-item-action:focus, .list-group-item-action:hover {\n    color: #464a4c;\n    text-decoration: none;\n    background-color: #f7f7f9; }\n  .list-group-item-action:active {\n    color: #292b2c;\n    background-color: #eceeef; }\n\n.list-group-item {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row wrap;\n          flex-flow: row wrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125); }\n  .list-group-item:first-child {\n    border-top-right-radius: 0.25rem;\n    border-top-left-radius: 0.25rem; }\n  .list-group-item:last-child {\n    margin-bottom: 0;\n    border-bottom-right-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem; }\n  .list-group-item:focus, .list-group-item:hover {\n    text-decoration: none; }\n  .list-group-item.disabled, .list-group-item:disabled {\n    color: #636c72;\n    cursor: not-allowed;\n    background-color: #fff; }\n    .list-group-item.disabled .list-group-item-heading, .list-group-item:disabled .list-group-item-heading {\n      color: inherit; }\n    .list-group-item.disabled .list-group-item-text, .list-group-item:disabled .list-group-item-text {\n      color: #636c72; }\n  .list-group-item.active {\n    z-index: 2;\n    color: #fff;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n    .list-group-item.active .list-group-item-heading,\n    .list-group-item.active .list-group-item-heading > small,\n    .list-group-item.active .list-group-item-heading > .small {\n      color: inherit; }\n    .list-group-item.active .list-group-item-text {\n      color: #daeeff; }\n\n.list-group-flush .list-group-item {\n  border-right: 0;\n  border-left: 0;\n  border-radius: 0; }\n\n.list-group-flush:first-child .list-group-item:first-child {\n  border-top: 0; }\n\n.list-group-flush:last-child .list-group-item:last-child {\n  border-bottom: 0; }\n\n.list-group-item-success {\n  color: #3c763d;\n  background-color: #dff0d8; }\n\na.list-group-item-success,\nbutton.list-group-item-success {\n  color: #3c763d; }\n  a.list-group-item-success .list-group-item-heading,\n  button.list-group-item-success .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-success:focus, a.list-group-item-success:hover,\n  button.list-group-item-success:focus,\n  button.list-group-item-success:hover {\n    color: #3c763d;\n    background-color: #d0e9c6; }\n  a.list-group-item-success.active,\n  button.list-group-item-success.active {\n    color: #fff;\n    background-color: #3c763d;\n    border-color: #3c763d; }\n\n.list-group-item-info {\n  color: #31708f;\n  background-color: #d9edf7; }\n\na.list-group-item-info,\nbutton.list-group-item-info {\n  color: #31708f; }\n  a.list-group-item-info .list-group-item-heading,\n  button.list-group-item-info .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-info:focus, a.list-group-item-info:hover,\n  button.list-group-item-info:focus,\n  button.list-group-item-info:hover {\n    color: #31708f;\n    background-color: #c4e3f3; }\n  a.list-group-item-info.active,\n  button.list-group-item-info.active {\n    color: #fff;\n    background-color: #31708f;\n    border-color: #31708f; }\n\n.list-group-item-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3; }\n\na.list-group-item-warning,\nbutton.list-group-item-warning {\n  color: #8a6d3b; }\n  a.list-group-item-warning .list-group-item-heading,\n  button.list-group-item-warning .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-warning:focus, a.list-group-item-warning:hover,\n  button.list-group-item-warning:focus,\n  button.list-group-item-warning:hover {\n    color: #8a6d3b;\n    background-color: #faf2cc; }\n  a.list-group-item-warning.active,\n  button.list-group-item-warning.active {\n    color: #fff;\n    background-color: #8a6d3b;\n    border-color: #8a6d3b; }\n\n.list-group-item-danger {\n  color: #a94442;\n  background-color: #f2dede; }\n\na.list-group-item-danger,\nbutton.list-group-item-danger {\n  color: #a94442; }\n  a.list-group-item-danger .list-group-item-heading,\n  button.list-group-item-danger .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-danger:focus, a.list-group-item-danger:hover,\n  button.list-group-item-danger:focus,\n  button.list-group-item-danger:hover {\n    color: #a94442;\n    background-color: #ebcccc; }\n  a.list-group-item-danger.active,\n  button.list-group-item-danger.active {\n    color: #fff;\n    background-color: #a94442;\n    border-color: #a94442; }\n\n.embed-responsive {\n  position: relative;\n  display: block;\n  width: 100%;\n  padding: 0;\n  overflow: hidden; }\n  .embed-responsive::before {\n    display: block;\n    content: \"\"; }\n  .embed-responsive .embed-responsive-item,\n  .embed-responsive iframe,\n  .embed-responsive embed,\n  .embed-responsive object,\n  .embed-responsive video {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border: 0; }\n\n.embed-responsive-21by9::before {\n  padding-top: 42.85714%; }\n\n.embed-responsive-16by9::before {\n  padding-top: 56.25%; }\n\n.embed-responsive-4by3::before {\n  padding-top: 75%; }\n\n.embed-responsive-1by1::before {\n  padding-top: 100%; }\n\n.close {\n  float: right;\n  font-size: 1.5rem;\n  font-weight: bold;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: .5; }\n  .close:focus, .close:hover {\n    color: #000;\n    text-decoration: none;\n    cursor: pointer;\n    opacity: .75; }\n\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none; }\n\n.modal-open {\n  overflow: hidden; }\n\n.modal {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  display: none;\n  overflow: hidden;\n  outline: 0; }\n  .modal.fade .modal-dialog {\n    transition: -webkit-transform 0.3s ease-out;\n    transition: transform 0.3s ease-out;\n    transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;\n    -webkit-transform: translate(0, -25%);\n            transform: translate(0, -25%); }\n  .modal.show .modal-dialog {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0); }\n\n.modal-open .modal {\n  overflow-x: hidden;\n  overflow-y: auto; }\n\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 10px; }\n\n.modal-content {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n  outline: 0; }\n\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000; }\n  .modal-backdrop.fade {\n    opacity: 0; }\n  .modal-backdrop.show {\n    opacity: 0.5; }\n\n.modal-header {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding: 15px;\n  border-bottom: 1px solid #eceeef; }\n\n.modal-title {\n  margin-bottom: 0;\n  line-height: 1.5; }\n\n.modal-body {\n  position: relative;\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  padding: 15px; }\n\n.modal-footer {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  padding: 15px;\n  border-top: 1px solid #eceeef; }\n  .modal-footer > :not(:first-child) {\n    margin-left: .25rem; }\n  .modal-footer > :not(:last-child) {\n    margin-right: .25rem; }\n\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll; }\n\n@media (min-width: 576px) {\n  .modal-dialog {\n    max-width: 500px;\n    margin: 30px auto; }\n  .modal-sm {\n    max-width: 300px; } }\n\n@media (min-width: 992px) {\n  .modal-lg {\n    max-width: 800px; } }\n\n.tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  opacity: 0; }\n  .tooltip.show {\n    opacity: 0.9; }\n  .tooltip.tooltip-top, .tooltip.bs-tether-element-attached-bottom {\n    padding: 5px 0;\n    margin-top: -3px; }\n    .tooltip.tooltip-top .tooltip-inner::before, .tooltip.bs-tether-element-attached-bottom .tooltip-inner::before {\n      bottom: 0;\n      left: 50%;\n      margin-left: -5px;\n      content: \"\";\n      border-width: 5px 5px 0;\n      border-top-color: #000; }\n  .tooltip.tooltip-right, .tooltip.bs-tether-element-attached-left {\n    padding: 0 5px;\n    margin-left: 3px; }\n    .tooltip.tooltip-right .tooltip-inner::before, .tooltip.bs-tether-element-attached-left .tooltip-inner::before {\n      top: 50%;\n      left: 0;\n      margin-top: -5px;\n      content: \"\";\n      border-width: 5px 5px 5px 0;\n      border-right-color: #000; }\n  .tooltip.tooltip-bottom, .tooltip.bs-tether-element-attached-top {\n    padding: 5px 0;\n    margin-top: 3px; }\n    .tooltip.tooltip-bottom .tooltip-inner::before, .tooltip.bs-tether-element-attached-top .tooltip-inner::before {\n      top: 0;\n      left: 50%;\n      margin-left: -5px;\n      content: \"\";\n      border-width: 0 5px 5px;\n      border-bottom-color: #000; }\n  .tooltip.tooltip-left, .tooltip.bs-tether-element-attached-right {\n    padding: 0 5px;\n    margin-left: -3px; }\n    .tooltip.tooltip-left .tooltip-inner::before, .tooltip.bs-tether-element-attached-right .tooltip-inner::before {\n      top: 50%;\n      right: 0;\n      margin-top: -5px;\n      content: \"\";\n      border-width: 5px 0 5px 5px;\n      border-left-color: #000; }\n\n.tooltip-inner {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 0.25rem; }\n  .tooltip-inner::before {\n    position: absolute;\n    width: 0;\n    height: 0;\n    border-color: transparent;\n    border-style: solid; }\n\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: block;\n  max-width: 276px;\n  padding: 1px;\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem; }\n  .popover.popover-top, .popover.bs-tether-element-attached-bottom {\n    margin-top: -10px; }\n    .popover.popover-top::before, .popover.popover-top::after, .popover.bs-tether-element-attached-bottom::before, .popover.bs-tether-element-attached-bottom::after {\n      left: 50%;\n      border-bottom-width: 0; }\n    .popover.popover-top::before, .popover.bs-tether-element-attached-bottom::before {\n      bottom: -11px;\n      margin-left: -11px;\n      border-top-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-top::after, .popover.bs-tether-element-attached-bottom::after {\n      bottom: -10px;\n      margin-left: -10px;\n      border-top-color: #fff; }\n  .popover.popover-right, .popover.bs-tether-element-attached-left {\n    margin-left: 10px; }\n    .popover.popover-right::before, .popover.popover-right::after, .popover.bs-tether-element-attached-left::before, .popover.bs-tether-element-attached-left::after {\n      top: 50%;\n      border-left-width: 0; }\n    .popover.popover-right::before, .popover.bs-tether-element-attached-left::before {\n      left: -11px;\n      margin-top: -11px;\n      border-right-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-right::after, .popover.bs-tether-element-attached-left::after {\n      left: -10px;\n      margin-top: -10px;\n      border-right-color: #fff; }\n  .popover.popover-bottom, .popover.bs-tether-element-attached-top {\n    margin-top: 10px; }\n    .popover.popover-bottom::before, .popover.popover-bottom::after, .popover.bs-tether-element-attached-top::before, .popover.bs-tether-element-attached-top::after {\n      left: 50%;\n      border-top-width: 0; }\n    .popover.popover-bottom::before, .popover.bs-tether-element-attached-top::before {\n      top: -11px;\n      margin-left: -11px;\n      border-bottom-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-bottom::after, .popover.bs-tether-element-attached-top::after {\n      top: -10px;\n      margin-left: -10px;\n      border-bottom-color: #f7f7f7; }\n    .popover.popover-bottom .popover-title::before, .popover.bs-tether-element-attached-top .popover-title::before {\n      position: absolute;\n      top: 0;\n      left: 50%;\n      display: block;\n      width: 20px;\n      margin-left: -10px;\n      content: \"\";\n      border-bottom: 1px solid #f7f7f7; }\n  .popover.popover-left, .popover.bs-tether-element-attached-right {\n    margin-left: -10px; }\n    .popover.popover-left::before, .popover.popover-left::after, .popover.bs-tether-element-attached-right::before, .popover.bs-tether-element-attached-right::after {\n      top: 50%;\n      border-right-width: 0; }\n    .popover.popover-left::before, .popover.bs-tether-element-attached-right::before {\n      right: -11px;\n      margin-top: -11px;\n      border-left-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-left::after, .popover.bs-tether-element-attached-right::after {\n      right: -10px;\n      margin-top: -10px;\n      border-left-color: #fff; }\n\n.popover-title {\n  padding: 8px 14px;\n  margin-bottom: 0;\n  font-size: 1rem;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-top-right-radius: calc(0.3rem - 1px);\n  border-top-left-radius: calc(0.3rem - 1px); }\n  .popover-title:empty {\n    display: none; }\n\n.popover-content {\n  padding: 9px 14px; }\n\n.popover::before,\n.popover::after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid; }\n\n.popover::before {\n  content: \"\";\n  border-width: 11px; }\n\n.popover::after {\n  content: \"\";\n  border-width: 10px; }\n\n.carousel {\n  position: relative; }\n\n.carousel-inner {\n  position: relative;\n  width: 100%;\n  overflow: hidden; }\n\n.carousel-item {\n  position: relative;\n  display: none;\n  width: 100%; }\n  @media (-webkit-transform-3d) {\n    .carousel-item {\n      transition: -webkit-transform 0.6s ease-in-out;\n      transition: transform 0.6s ease-in-out;\n      transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;\n      -webkit-backface-visibility: hidden;\n              backface-visibility: hidden;\n      -webkit-perspective: 1000px;\n              perspective: 1000px; } }\n  @supports ((-webkit-transform: translate3d(0, 0, 0)) or (transform: translate3d(0, 0, 0))) {\n    .carousel-item {\n      transition: -webkit-transform 0.6s ease-in-out;\n      transition: transform 0.6s ease-in-out;\n      transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;\n      -webkit-backface-visibility: hidden;\n              backface-visibility: hidden;\n      -webkit-perspective: 1000px;\n              perspective: 1000px; } }\n\n.carousel-item.active,\n.carousel-item-next,\n.carousel-item-prev {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n.carousel-item-next,\n.carousel-item-prev {\n  position: absolute;\n  top: 0; }\n\n@media (-webkit-transform-3d) {\n  .carousel-item-next.carousel-item-left,\n  .carousel-item-prev.carousel-item-right {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0); }\n  .carousel-item-next,\n  .active.carousel-item-right {\n    -webkit-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0); }\n  .carousel-item-prev,\n  .active.carousel-item-left {\n    -webkit-transform: translate3d(-100%, 0, 0);\n            transform: translate3d(-100%, 0, 0); } }\n\n@supports ((-webkit-transform: translate3d(0, 0, 0)) or (transform: translate3d(0, 0, 0))) {\n  .carousel-item-next.carousel-item-left,\n  .carousel-item-prev.carousel-item-right {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0); }\n  .carousel-item-next,\n  .active.carousel-item-right {\n    -webkit-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0); }\n  .carousel-item-prev,\n  .active.carousel-item-left {\n    -webkit-transform: translate3d(-100%, 0, 0);\n            transform: translate3d(-100%, 0, 0); } }\n\n.carousel-control-prev,\n.carousel-control-next {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 15%;\n  color: #fff;\n  text-align: center;\n  opacity: 0.5; }\n  .carousel-control-prev:focus, .carousel-control-prev:hover,\n  .carousel-control-next:focus,\n  .carousel-control-next:hover {\n    color: #fff;\n    text-decoration: none;\n    outline: 0;\n    opacity: .9; }\n\n.carousel-control-prev {\n  left: 0; }\n\n.carousel-control-next {\n  right: 0; }\n\n.carousel-control-prev-icon,\n.carousel-control-next-icon {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  background: transparent no-repeat center center;\n  background-size: 100% 100%; }\n\n.carousel-control-prev-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M4 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E\"); }\n\n.carousel-control-next-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M1.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E\"); }\n\n.carousel-indicators {\n  position: absolute;\n  right: 0;\n  bottom: 10px;\n  left: 0;\n  z-index: 15;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding-left: 0;\n  margin-right: 15%;\n  margin-left: 15%;\n  list-style: none; }\n  .carousel-indicators li {\n    position: relative;\n    -webkit-box-flex: 1;\n        -ms-flex: 1 0 auto;\n            flex: 1 0 auto;\n    max-width: 30px;\n    height: 3px;\n    margin-right: 3px;\n    margin-left: 3px;\n    text-indent: -999px;\n    cursor: pointer;\n    background-color: rgba(255, 255, 255, 0.5); }\n    .carousel-indicators li::before {\n      position: absolute;\n      top: -10px;\n      left: 0;\n      display: inline-block;\n      width: 100%;\n      height: 10px;\n      content: \"\"; }\n    .carousel-indicators li::after {\n      position: absolute;\n      bottom: -10px;\n      left: 0;\n      display: inline-block;\n      width: 100%;\n      height: 10px;\n      content: \"\"; }\n  .carousel-indicators .active {\n    background-color: #fff; }\n\n.carousel-caption {\n  position: absolute;\n  right: 15%;\n  bottom: 20px;\n  left: 15%;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center; }\n\n.align-baseline {\n  vertical-align: baseline !important; }\n\n.align-top {\n  vertical-align: top !important; }\n\n.align-middle {\n  vertical-align: middle !important; }\n\n.align-bottom {\n  vertical-align: bottom !important; }\n\n.align-text-bottom {\n  vertical-align: text-bottom !important; }\n\n.align-text-top {\n  vertical-align: text-top !important; }\n\n.bg-faded {\n  background-color: #f7f7f7; }\n\n.bg-primary {\n  background-color: #0275d8 !important; }\n\na.bg-primary:focus, a.bg-primary:hover {\n  background-color: #025aa5 !important; }\n\n.bg-success {\n  background-color: #5cb85c !important; }\n\na.bg-success:focus, a.bg-success:hover {\n  background-color: #449d44 !important; }\n\n.bg-info {\n  background-color: #5bc0de !important; }\n\na.bg-info:focus, a.bg-info:hover {\n  background-color: #31b0d5 !important; }\n\n.bg-warning {\n  background-color: #f0ad4e !important; }\n\na.bg-warning:focus, a.bg-warning:hover {\n  background-color: #ec971f !important; }\n\n.bg-danger {\n  background-color: #d9534f !important; }\n\na.bg-danger:focus, a.bg-danger:hover {\n  background-color: #c9302c !important; }\n\n.bg-inverse {\n  background-color: #292b2c !important; }\n\na.bg-inverse:focus, a.bg-inverse:hover {\n  background-color: #101112 !important; }\n\n.border-0 {\n  border: 0 !important; }\n\n.border-top-0 {\n  border-top: 0 !important; }\n\n.border-right-0 {\n  border-right: 0 !important; }\n\n.border-bottom-0 {\n  border-bottom: 0 !important; }\n\n.border-left-0 {\n  border-left: 0 !important; }\n\n.rounded {\n  border-radius: 0.25rem; }\n\n.rounded-top {\n  border-top-right-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.rounded-right {\n  border-bottom-right-radius: 0.25rem;\n  border-top-right-radius: 0.25rem; }\n\n.rounded-bottom {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem; }\n\n.rounded-left {\n  border-bottom-left-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.rounded-circle {\n  border-radius: 50%; }\n\n.rounded-0 {\n  border-radius: 0; }\n\n.clearfix::after {\n  display: block;\n  content: \"\";\n  clear: both; }\n\n.d-none {\n  display: none !important; }\n\n.d-inline {\n  display: inline !important; }\n\n.d-inline-block {\n  display: inline-block !important; }\n\n.d-block {\n  display: block !important; }\n\n.d-table {\n  display: table !important; }\n\n.d-table-cell {\n  display: table-cell !important; }\n\n.d-flex {\n  display: -webkit-box !important;\n  display: -ms-flexbox !important;\n  display: flex !important; }\n\n.d-inline-flex {\n  display: -webkit-inline-box !important;\n  display: -ms-inline-flexbox !important;\n  display: inline-flex !important; }\n\n@media (min-width: 576px) {\n  .d-sm-none {\n    display: none !important; }\n  .d-sm-inline {\n    display: inline !important; }\n  .d-sm-inline-block {\n    display: inline-block !important; }\n  .d-sm-block {\n    display: block !important; }\n  .d-sm-table {\n    display: table !important; }\n  .d-sm-table-cell {\n    display: table-cell !important; }\n  .d-sm-flex {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important; }\n  .d-sm-inline-flex {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important; } }\n\n@media (min-width: 768px) {\n  .d-md-none {\n    display: none !important; }\n  .d-md-inline {\n    display: inline !important; }\n  .d-md-inline-block {\n    display: inline-block !important; }\n  .d-md-block {\n    display: block !important; }\n  .d-md-table {\n    display: table !important; }\n  .d-md-table-cell {\n    display: table-cell !important; }\n  .d-md-flex {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important; }\n  .d-md-inline-flex {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important; } }\n\n@media (min-width: 992px) {\n  .d-lg-none {\n    display: none !important; }\n  .d-lg-inline {\n    display: inline !important; }\n  .d-lg-inline-block {\n    display: inline-block !important; }\n  .d-lg-block {\n    display: block !important; }\n  .d-lg-table {\n    display: table !important; }\n  .d-lg-table-cell {\n    display: table-cell !important; }\n  .d-lg-flex {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important; }\n  .d-lg-inline-flex {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important; } }\n\n@media (min-width: 1200px) {\n  .d-xl-none {\n    display: none !important; }\n  .d-xl-inline {\n    display: inline !important; }\n  .d-xl-inline-block {\n    display: inline-block !important; }\n  .d-xl-block {\n    display: block !important; }\n  .d-xl-table {\n    display: table !important; }\n  .d-xl-table-cell {\n    display: table-cell !important; }\n  .d-xl-flex {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important; }\n  .d-xl-inline-flex {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important; } }\n\n.flex-first {\n  -webkit-box-ordinal-group: 0;\n      -ms-flex-order: -1;\n          order: -1; }\n\n.flex-last {\n  -webkit-box-ordinal-group: 2;\n      -ms-flex-order: 1;\n          order: 1; }\n\n.flex-unordered {\n  -webkit-box-ordinal-group: 1;\n      -ms-flex-order: 0;\n          order: 0; }\n\n.flex-row {\n  -webkit-box-orient: horizontal !important;\n  -webkit-box-direction: normal !important;\n      -ms-flex-direction: row !important;\n          flex-direction: row !important; }\n\n.flex-column {\n  -webkit-box-orient: vertical !important;\n  -webkit-box-direction: normal !important;\n      -ms-flex-direction: column !important;\n          flex-direction: column !important; }\n\n.flex-row-reverse {\n  -webkit-box-orient: horizontal !important;\n  -webkit-box-direction: reverse !important;\n      -ms-flex-direction: row-reverse !important;\n          flex-direction: row-reverse !important; }\n\n.flex-column-reverse {\n  -webkit-box-orient: vertical !important;\n  -webkit-box-direction: reverse !important;\n      -ms-flex-direction: column-reverse !important;\n          flex-direction: column-reverse !important; }\n\n.flex-wrap {\n  -ms-flex-wrap: wrap !important;\n      flex-wrap: wrap !important; }\n\n.flex-nowrap {\n  -ms-flex-wrap: nowrap !important;\n      flex-wrap: nowrap !important; }\n\n.flex-wrap-reverse {\n  -ms-flex-wrap: wrap-reverse !important;\n      flex-wrap: wrap-reverse !important; }\n\n.justify-content-start {\n  -webkit-box-pack: start !important;\n      -ms-flex-pack: start !important;\n          justify-content: flex-start !important; }\n\n.justify-content-end {\n  -webkit-box-pack: end !important;\n      -ms-flex-pack: end !important;\n          justify-content: flex-end !important; }\n\n.justify-content-center {\n  -webkit-box-pack: center !important;\n      -ms-flex-pack: center !important;\n          justify-content: center !important; }\n\n.justify-content-between {\n  -webkit-box-pack: justify !important;\n      -ms-flex-pack: justify !important;\n          justify-content: space-between !important; }\n\n.justify-content-around {\n  -ms-flex-pack: distribute !important;\n      justify-content: space-around !important; }\n\n.align-items-start {\n  -webkit-box-align: start !important;\n      -ms-flex-align: start !important;\n          align-items: flex-start !important; }\n\n.align-items-end {\n  -webkit-box-align: end !important;\n      -ms-flex-align: end !important;\n          align-items: flex-end !important; }\n\n.align-items-center {\n  -webkit-box-align: center !important;\n      -ms-flex-align: center !important;\n          align-items: center !important; }\n\n.align-items-baseline {\n  -webkit-box-align: baseline !important;\n      -ms-flex-align: baseline !important;\n          align-items: baseline !important; }\n\n.align-items-stretch {\n  -webkit-box-align: stretch !important;\n      -ms-flex-align: stretch !important;\n          align-items: stretch !important; }\n\n.align-content-start {\n  -ms-flex-line-pack: start !important;\n      align-content: flex-start !important; }\n\n.align-content-end {\n  -ms-flex-line-pack: end !important;\n      align-content: flex-end !important; }\n\n.align-content-center {\n  -ms-flex-line-pack: center !important;\n      align-content: center !important; }\n\n.align-content-between {\n  -ms-flex-line-pack: justify !important;\n      align-content: space-between !important; }\n\n.align-content-around {\n  -ms-flex-line-pack: distribute !important;\n      align-content: space-around !important; }\n\n.align-content-stretch {\n  -ms-flex-line-pack: stretch !important;\n      align-content: stretch !important; }\n\n.align-self-auto {\n  -ms-flex-item-align: auto !important;\n      -ms-grid-row-align: auto !important;\n      align-self: auto !important; }\n\n.align-self-start {\n  -ms-flex-item-align: start !important;\n      align-self: flex-start !important; }\n\n.align-self-end {\n  -ms-flex-item-align: end !important;\n      align-self: flex-end !important; }\n\n.align-self-center {\n  -ms-flex-item-align: center !important;\n      -ms-grid-row-align: center !important;\n      align-self: center !important; }\n\n.align-self-baseline {\n  -ms-flex-item-align: baseline !important;\n      align-self: baseline !important; }\n\n.align-self-stretch {\n  -ms-flex-item-align: stretch !important;\n      -ms-grid-row-align: stretch !important;\n      align-self: stretch !important; }\n\n@media (min-width: 576px) {\n  .flex-sm-first {\n    -webkit-box-ordinal-group: 0;\n        -ms-flex-order: -1;\n            order: -1; }\n  .flex-sm-last {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1; }\n  .flex-sm-unordered {\n    -webkit-box-ordinal-group: 1;\n        -ms-flex-order: 0;\n            order: 0; }\n  .flex-sm-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: row !important;\n            flex-direction: row !important; }\n  .flex-sm-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: column !important;\n            flex-direction: column !important; }\n  .flex-sm-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: row-reverse !important;\n            flex-direction: row-reverse !important; }\n  .flex-sm-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: column-reverse !important;\n            flex-direction: column-reverse !important; }\n  .flex-sm-wrap {\n    -ms-flex-wrap: wrap !important;\n        flex-wrap: wrap !important; }\n  .flex-sm-nowrap {\n    -ms-flex-wrap: nowrap !important;\n        flex-wrap: nowrap !important; }\n  .flex-sm-wrap-reverse {\n    -ms-flex-wrap: wrap-reverse !important;\n        flex-wrap: wrap-reverse !important; }\n  .justify-content-sm-start {\n    -webkit-box-pack: start !important;\n        -ms-flex-pack: start !important;\n            justify-content: flex-start !important; }\n  .justify-content-sm-end {\n    -webkit-box-pack: end !important;\n        -ms-flex-pack: end !important;\n            justify-content: flex-end !important; }\n  .justify-content-sm-center {\n    -webkit-box-pack: center !important;\n        -ms-flex-pack: center !important;\n            justify-content: center !important; }\n  .justify-content-sm-between {\n    -webkit-box-pack: justify !important;\n        -ms-flex-pack: justify !important;\n            justify-content: space-between !important; }\n  .justify-content-sm-around {\n    -ms-flex-pack: distribute !important;\n        justify-content: space-around !important; }\n  .align-items-sm-start {\n    -webkit-box-align: start !important;\n        -ms-flex-align: start !important;\n            align-items: flex-start !important; }\n  .align-items-sm-end {\n    -webkit-box-align: end !important;\n        -ms-flex-align: end !important;\n            align-items: flex-end !important; }\n  .align-items-sm-center {\n    -webkit-box-align: center !important;\n        -ms-flex-align: center !important;\n            align-items: center !important; }\n  .align-items-sm-baseline {\n    -webkit-box-align: baseline !important;\n        -ms-flex-align: baseline !important;\n            align-items: baseline !important; }\n  .align-items-sm-stretch {\n    -webkit-box-align: stretch !important;\n        -ms-flex-align: stretch !important;\n            align-items: stretch !important; }\n  .align-content-sm-start {\n    -ms-flex-line-pack: start !important;\n        align-content: flex-start !important; }\n  .align-content-sm-end {\n    -ms-flex-line-pack: end !important;\n        align-content: flex-end !important; }\n  .align-content-sm-center {\n    -ms-flex-line-pack: center !important;\n        align-content: center !important; }\n  .align-content-sm-between {\n    -ms-flex-line-pack: justify !important;\n        align-content: space-between !important; }\n  .align-content-sm-around {\n    -ms-flex-line-pack: distribute !important;\n        align-content: space-around !important; }\n  .align-content-sm-stretch {\n    -ms-flex-line-pack: stretch !important;\n        align-content: stretch !important; }\n  .align-self-sm-auto {\n    -ms-flex-item-align: auto !important;\n        -ms-grid-row-align: auto !important;\n        align-self: auto !important; }\n  .align-self-sm-start {\n    -ms-flex-item-align: start !important;\n        align-self: flex-start !important; }\n  .align-self-sm-end {\n    -ms-flex-item-align: end !important;\n        align-self: flex-end !important; }\n  .align-self-sm-center {\n    -ms-flex-item-align: center !important;\n        -ms-grid-row-align: center !important;\n        align-self: center !important; }\n  .align-self-sm-baseline {\n    -ms-flex-item-align: baseline !important;\n        align-self: baseline !important; }\n  .align-self-sm-stretch {\n    -ms-flex-item-align: stretch !important;\n        -ms-grid-row-align: stretch !important;\n        align-self: stretch !important; } }\n\n@media (min-width: 768px) {\n  .flex-md-first {\n    -webkit-box-ordinal-group: 0;\n        -ms-flex-order: -1;\n            order: -1; }\n  .flex-md-last {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1; }\n  .flex-md-unordered {\n    -webkit-box-ordinal-group: 1;\n        -ms-flex-order: 0;\n            order: 0; }\n  .flex-md-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: row !important;\n            flex-direction: row !important; }\n  .flex-md-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: column !important;\n            flex-direction: column !important; }\n  .flex-md-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: row-reverse !important;\n            flex-direction: row-reverse !important; }\n  .flex-md-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: column-reverse !important;\n            flex-direction: column-reverse !important; }\n  .flex-md-wrap {\n    -ms-flex-wrap: wrap !important;\n        flex-wrap: wrap !important; }\n  .flex-md-nowrap {\n    -ms-flex-wrap: nowrap !important;\n        flex-wrap: nowrap !important; }\n  .flex-md-wrap-reverse {\n    -ms-flex-wrap: wrap-reverse !important;\n        flex-wrap: wrap-reverse !important; }\n  .justify-content-md-start {\n    -webkit-box-pack: start !important;\n        -ms-flex-pack: start !important;\n            justify-content: flex-start !important; }\n  .justify-content-md-end {\n    -webkit-box-pack: end !important;\n        -ms-flex-pack: end !important;\n            justify-content: flex-end !important; }\n  .justify-content-md-center {\n    -webkit-box-pack: center !important;\n        -ms-flex-pack: center !important;\n            justify-content: center !important; }\n  .justify-content-md-between {\n    -webkit-box-pack: justify !important;\n        -ms-flex-pack: justify !important;\n            justify-content: space-between !important; }\n  .justify-content-md-around {\n    -ms-flex-pack: distribute !important;\n        justify-content: space-around !important; }\n  .align-items-md-start {\n    -webkit-box-align: start !important;\n        -ms-flex-align: start !important;\n            align-items: flex-start !important; }\n  .align-items-md-end {\n    -webkit-box-align: end !important;\n        -ms-flex-align: end !important;\n            align-items: flex-end !important; }\n  .align-items-md-center {\n    -webkit-box-align: center !important;\n        -ms-flex-align: center !important;\n            align-items: center !important; }\n  .align-items-md-baseline {\n    -webkit-box-align: baseline !important;\n        -ms-flex-align: baseline !important;\n            align-items: baseline !important; }\n  .align-items-md-stretch {\n    -webkit-box-align: stretch !important;\n        -ms-flex-align: stretch !important;\n            align-items: stretch !important; }\n  .align-content-md-start {\n    -ms-flex-line-pack: start !important;\n        align-content: flex-start !important; }\n  .align-content-md-end {\n    -ms-flex-line-pack: end !important;\n        align-content: flex-end !important; }\n  .align-content-md-center {\n    -ms-flex-line-pack: center !important;\n        align-content: center !important; }\n  .align-content-md-between {\n    -ms-flex-line-pack: justify !important;\n        align-content: space-between !important; }\n  .align-content-md-around {\n    -ms-flex-line-pack: distribute !important;\n        align-content: space-around !important; }\n  .align-content-md-stretch {\n    -ms-flex-line-pack: stretch !important;\n        align-content: stretch !important; }\n  .align-self-md-auto {\n    -ms-flex-item-align: auto !important;\n        -ms-grid-row-align: auto !important;\n        align-self: auto !important; }\n  .align-self-md-start {\n    -ms-flex-item-align: start !important;\n        align-self: flex-start !important; }\n  .align-self-md-end {\n    -ms-flex-item-align: end !important;\n        align-self: flex-end !important; }\n  .align-self-md-center {\n    -ms-flex-item-align: center !important;\n        -ms-grid-row-align: center !important;\n        align-self: center !important; }\n  .align-self-md-baseline {\n    -ms-flex-item-align: baseline !important;\n        align-self: baseline !important; }\n  .align-self-md-stretch {\n    -ms-flex-item-align: stretch !important;\n        -ms-grid-row-align: stretch !important;\n        align-self: stretch !important; } }\n\n@media (min-width: 992px) {\n  .flex-lg-first {\n    -webkit-box-ordinal-group: 0;\n        -ms-flex-order: -1;\n            order: -1; }\n  .flex-lg-last {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1; }\n  .flex-lg-unordered {\n    -webkit-box-ordinal-group: 1;\n        -ms-flex-order: 0;\n            order: 0; }\n  .flex-lg-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: row !important;\n            flex-direction: row !important; }\n  .flex-lg-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: column !important;\n            flex-direction: column !important; }\n  .flex-lg-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: row-reverse !important;\n            flex-direction: row-reverse !important; }\n  .flex-lg-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: column-reverse !important;\n            flex-direction: column-reverse !important; }\n  .flex-lg-wrap {\n    -ms-flex-wrap: wrap !important;\n        flex-wrap: wrap !important; }\n  .flex-lg-nowrap {\n    -ms-flex-wrap: nowrap !important;\n        flex-wrap: nowrap !important; }\n  .flex-lg-wrap-reverse {\n    -ms-flex-wrap: wrap-reverse !important;\n        flex-wrap: wrap-reverse !important; }\n  .justify-content-lg-start {\n    -webkit-box-pack: start !important;\n        -ms-flex-pack: start !important;\n            justify-content: flex-start !important; }\n  .justify-content-lg-end {\n    -webkit-box-pack: end !important;\n        -ms-flex-pack: end !important;\n            justify-content: flex-end !important; }\n  .justify-content-lg-center {\n    -webkit-box-pack: center !important;\n        -ms-flex-pack: center !important;\n            justify-content: center !important; }\n  .justify-content-lg-between {\n    -webkit-box-pack: justify !important;\n        -ms-flex-pack: justify !important;\n            justify-content: space-between !important; }\n  .justify-content-lg-around {\n    -ms-flex-pack: distribute !important;\n        justify-content: space-around !important; }\n  .align-items-lg-start {\n    -webkit-box-align: start !important;\n        -ms-flex-align: start !important;\n            align-items: flex-start !important; }\n  .align-items-lg-end {\n    -webkit-box-align: end !important;\n        -ms-flex-align: end !important;\n            align-items: flex-end !important; }\n  .align-items-lg-center {\n    -webkit-box-align: center !important;\n        -ms-flex-align: center !important;\n            align-items: center !important; }\n  .align-items-lg-baseline {\n    -webkit-box-align: baseline !important;\n        -ms-flex-align: baseline !important;\n            align-items: baseline !important; }\n  .align-items-lg-stretch {\n    -webkit-box-align: stretch !important;\n        -ms-flex-align: stretch !important;\n            align-items: stretch !important; }\n  .align-content-lg-start {\n    -ms-flex-line-pack: start !important;\n        align-content: flex-start !important; }\n  .align-content-lg-end {\n    -ms-flex-line-pack: end !important;\n        align-content: flex-end !important; }\n  .align-content-lg-center {\n    -ms-flex-line-pack: center !important;\n        align-content: center !important; }\n  .align-content-lg-between {\n    -ms-flex-line-pack: justify !important;\n        align-content: space-between !important; }\n  .align-content-lg-around {\n    -ms-flex-line-pack: distribute !important;\n        align-content: space-around !important; }\n  .align-content-lg-stretch {\n    -ms-flex-line-pack: stretch !important;\n        align-content: stretch !important; }\n  .align-self-lg-auto {\n    -ms-flex-item-align: auto !important;\n        -ms-grid-row-align: auto !important;\n        align-self: auto !important; }\n  .align-self-lg-start {\n    -ms-flex-item-align: start !important;\n        align-self: flex-start !important; }\n  .align-self-lg-end {\n    -ms-flex-item-align: end !important;\n        align-self: flex-end !important; }\n  .align-self-lg-center {\n    -ms-flex-item-align: center !important;\n        -ms-grid-row-align: center !important;\n        align-self: center !important; }\n  .align-self-lg-baseline {\n    -ms-flex-item-align: baseline !important;\n        align-self: baseline !important; }\n  .align-self-lg-stretch {\n    -ms-flex-item-align: stretch !important;\n        -ms-grid-row-align: stretch !important;\n        align-self: stretch !important; } }\n\n@media (min-width: 1200px) {\n  .flex-xl-first {\n    -webkit-box-ordinal-group: 0;\n        -ms-flex-order: -1;\n            order: -1; }\n  .flex-xl-last {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1; }\n  .flex-xl-unordered {\n    -webkit-box-ordinal-group: 1;\n        -ms-flex-order: 0;\n            order: 0; }\n  .flex-xl-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: row !important;\n            flex-direction: row !important; }\n  .flex-xl-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: column !important;\n            flex-direction: column !important; }\n  .flex-xl-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: row-reverse !important;\n            flex-direction: row-reverse !important; }\n  .flex-xl-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: column-reverse !important;\n            flex-direction: column-reverse !important; }\n  .flex-xl-wrap {\n    -ms-flex-wrap: wrap !important;\n        flex-wrap: wrap !important; }\n  .flex-xl-nowrap {\n    -ms-flex-wrap: nowrap !important;\n        flex-wrap: nowrap !important; }\n  .flex-xl-wrap-reverse {\n    -ms-flex-wrap: wrap-reverse !important;\n        flex-wrap: wrap-reverse !important; }\n  .justify-content-xl-start {\n    -webkit-box-pack: start !important;\n        -ms-flex-pack: start !important;\n            justify-content: flex-start !important; }\n  .justify-content-xl-end {\n    -webkit-box-pack: end !important;\n        -ms-flex-pack: end !important;\n            justify-content: flex-end !important; }\n  .justify-content-xl-center {\n    -webkit-box-pack: center !important;\n        -ms-flex-pack: center !important;\n            justify-content: center !important; }\n  .justify-content-xl-between {\n    -webkit-box-pack: justify !important;\n        -ms-flex-pack: justify !important;\n            justify-content: space-between !important; }\n  .justify-content-xl-around {\n    -ms-flex-pack: distribute !important;\n        justify-content: space-around !important; }\n  .align-items-xl-start {\n    -webkit-box-align: start !important;\n        -ms-flex-align: start !important;\n            align-items: flex-start !important; }\n  .align-items-xl-end {\n    -webkit-box-align: end !important;\n        -ms-flex-align: end !important;\n            align-items: flex-end !important; }\n  .align-items-xl-center {\n    -webkit-box-align: center !important;\n        -ms-flex-align: center !important;\n            align-items: center !important; }\n  .align-items-xl-baseline {\n    -webkit-box-align: baseline !important;\n        -ms-flex-align: baseline !important;\n            align-items: baseline !important; }\n  .align-items-xl-stretch {\n    -webkit-box-align: stretch !important;\n        -ms-flex-align: stretch !important;\n            align-items: stretch !important; }\n  .align-content-xl-start {\n    -ms-flex-line-pack: start !important;\n        align-content: flex-start !important; }\n  .align-content-xl-end {\n    -ms-flex-line-pack: end !important;\n        align-content: flex-end !important; }\n  .align-content-xl-center {\n    -ms-flex-line-pack: center !important;\n        align-content: center !important; }\n  .align-content-xl-between {\n    -ms-flex-line-pack: justify !important;\n        align-content: space-between !important; }\n  .align-content-xl-around {\n    -ms-flex-line-pack: distribute !important;\n        align-content: space-around !important; }\n  .align-content-xl-stretch {\n    -ms-flex-line-pack: stretch !important;\n        align-content: stretch !important; }\n  .align-self-xl-auto {\n    -ms-flex-item-align: auto !important;\n        -ms-grid-row-align: auto !important;\n        align-self: auto !important; }\n  .align-self-xl-start {\n    -ms-flex-item-align: start !important;\n        align-self: flex-start !important; }\n  .align-self-xl-end {\n    -ms-flex-item-align: end !important;\n        align-self: flex-end !important; }\n  .align-self-xl-center {\n    -ms-flex-item-align: center !important;\n        -ms-grid-row-align: center !important;\n        align-self: center !important; }\n  .align-self-xl-baseline {\n    -ms-flex-item-align: baseline !important;\n        align-self: baseline !important; }\n  .align-self-xl-stretch {\n    -ms-flex-item-align: stretch !important;\n        -ms-grid-row-align: stretch !important;\n        align-self: stretch !important; } }\n\n.float-left {\n  float: left !important; }\n\n.float-right {\n  float: right !important; }\n\n.float-none {\n  float: none !important; }\n\n@media (min-width: 576px) {\n  .float-sm-left {\n    float: left !important; }\n  .float-sm-right {\n    float: right !important; }\n  .float-sm-none {\n    float: none !important; } }\n\n@media (min-width: 768px) {\n  .float-md-left {\n    float: left !important; }\n  .float-md-right {\n    float: right !important; }\n  .float-md-none {\n    float: none !important; } }\n\n@media (min-width: 992px) {\n  .float-lg-left {\n    float: left !important; }\n  .float-lg-right {\n    float: right !important; }\n  .float-lg-none {\n    float: none !important; } }\n\n@media (min-width: 1200px) {\n  .float-xl-left {\n    float: left !important; }\n  .float-xl-right {\n    float: right !important; }\n  .float-xl-none {\n    float: none !important; } }\n\n.fixed-top {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1030; }\n\n.fixed-bottom {\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1030; }\n\n.sticky-top {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  z-index: 1030; }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto; }\n\n.w-25 {\n  width: 25% !important; }\n\n.w-50 {\n  width: 50% !important; }\n\n.w-75 {\n  width: 75% !important; }\n\n.w-100 {\n  width: 100% !important; }\n\n.h-25 {\n  height: 25% !important; }\n\n.h-50 {\n  height: 50% !important; }\n\n.h-75 {\n  height: 75% !important; }\n\n.h-100 {\n  height: 100% !important; }\n\n.mw-100 {\n  max-width: 100% !important; }\n\n.mh-100 {\n  max-height: 100% !important; }\n\n.m-0 {\n  margin: 0 0 !important; }\n\n.mt-0 {\n  margin-top: 0 !important; }\n\n.mr-0 {\n  margin-right: 0 !important; }\n\n.mb-0 {\n  margin-bottom: 0 !important; }\n\n.ml-0 {\n  margin-left: 0 !important; }\n\n.mx-0 {\n  margin-right: 0 !important;\n  margin-left: 0 !important; }\n\n.my-0 {\n  margin-top: 0 !important;\n  margin-bottom: 0 !important; }\n\n.m-1 {\n  margin: 0.25rem 0.25rem !important; }\n\n.mt-1 {\n  margin-top: 0.25rem !important; }\n\n.mr-1 {\n  margin-right: 0.25rem !important; }\n\n.mb-1 {\n  margin-bottom: 0.25rem !important; }\n\n.ml-1 {\n  margin-left: 0.25rem !important; }\n\n.mx-1 {\n  margin-right: 0.25rem !important;\n  margin-left: 0.25rem !important; }\n\n.my-1 {\n  margin-top: 0.25rem !important;\n  margin-bottom: 0.25rem !important; }\n\n.m-2 {\n  margin: 0.5rem 0.5rem !important; }\n\n.mt-2 {\n  margin-top: 0.5rem !important; }\n\n.mr-2 {\n  margin-right: 0.5rem !important; }\n\n.mb-2 {\n  margin-bottom: 0.5rem !important; }\n\n.ml-2 {\n  margin-left: 0.5rem !important; }\n\n.mx-2 {\n  margin-right: 0.5rem !important;\n  margin-left: 0.5rem !important; }\n\n.my-2 {\n  margin-top: 0.5rem !important;\n  margin-bottom: 0.5rem !important; }\n\n.m-3 {\n  margin: 1rem 1rem !important; }\n\n.mt-3 {\n  margin-top: 1rem !important; }\n\n.mr-3 {\n  margin-right: 1rem !important; }\n\n.mb-3 {\n  margin-bottom: 1rem !important; }\n\n.ml-3 {\n  margin-left: 1rem !important; }\n\n.mx-3 {\n  margin-right: 1rem !important;\n  margin-left: 1rem !important; }\n\n.my-3 {\n  margin-top: 1rem !important;\n  margin-bottom: 1rem !important; }\n\n.m-4 {\n  margin: 1.5rem 1.5rem !important; }\n\n.mt-4 {\n  margin-top: 1.5rem !important; }\n\n.mr-4 {\n  margin-right: 1.5rem !important; }\n\n.mb-4 {\n  margin-bottom: 1.5rem !important; }\n\n.ml-4 {\n  margin-left: 1.5rem !important; }\n\n.mx-4 {\n  margin-right: 1.5rem !important;\n  margin-left: 1.5rem !important; }\n\n.my-4 {\n  margin-top: 1.5rem !important;\n  margin-bottom: 1.5rem !important; }\n\n.m-5 {\n  margin: 3rem 3rem !important; }\n\n.mt-5 {\n  margin-top: 3rem !important; }\n\n.mr-5 {\n  margin-right: 3rem !important; }\n\n.mb-5 {\n  margin-bottom: 3rem !important; }\n\n.ml-5 {\n  margin-left: 3rem !important; }\n\n.mx-5 {\n  margin-right: 3rem !important;\n  margin-left: 3rem !important; }\n\n.my-5 {\n  margin-top: 3rem !important;\n  margin-bottom: 3rem !important; }\n\n.p-0 {\n  padding: 0 0 !important; }\n\n.pt-0 {\n  padding-top: 0 !important; }\n\n.pr-0 {\n  padding-right: 0 !important; }\n\n.pb-0 {\n  padding-bottom: 0 !important; }\n\n.pl-0 {\n  padding-left: 0 !important; }\n\n.px-0 {\n  padding-right: 0 !important;\n  padding-left: 0 !important; }\n\n.py-0 {\n  padding-top: 0 !important;\n  padding-bottom: 0 !important; }\n\n.p-1 {\n  padding: 0.25rem 0.25rem !important; }\n\n.pt-1 {\n  padding-top: 0.25rem !important; }\n\n.pr-1 {\n  padding-right: 0.25rem !important; }\n\n.pb-1 {\n  padding-bottom: 0.25rem !important; }\n\n.pl-1 {\n  padding-left: 0.25rem !important; }\n\n.px-1 {\n  padding-right: 0.25rem !important;\n  padding-left: 0.25rem !important; }\n\n.py-1 {\n  padding-top: 0.25rem !important;\n  padding-bottom: 0.25rem !important; }\n\n.p-2 {\n  padding: 0.5rem 0.5rem !important; }\n\n.pt-2 {\n  padding-top: 0.5rem !important; }\n\n.pr-2 {\n  padding-right: 0.5rem !important; }\n\n.pb-2 {\n  padding-bottom: 0.5rem !important; }\n\n.pl-2 {\n  padding-left: 0.5rem !important; }\n\n.px-2 {\n  padding-right: 0.5rem !important;\n  padding-left: 0.5rem !important; }\n\n.py-2 {\n  padding-top: 0.5rem !important;\n  padding-bottom: 0.5rem !important; }\n\n.p-3 {\n  padding: 1rem 1rem !important; }\n\n.pt-3 {\n  padding-top: 1rem !important; }\n\n.pr-3 {\n  padding-right: 1rem !important; }\n\n.pb-3 {\n  padding-bottom: 1rem !important; }\n\n.pl-3 {\n  padding-left: 1rem !important; }\n\n.px-3 {\n  padding-right: 1rem !important;\n  padding-left: 1rem !important; }\n\n.py-3 {\n  padding-top: 1rem !important;\n  padding-bottom: 1rem !important; }\n\n.p-4 {\n  padding: 1.5rem 1.5rem !important; }\n\n.pt-4 {\n  padding-top: 1.5rem !important; }\n\n.pr-4 {\n  padding-right: 1.5rem !important; }\n\n.pb-4 {\n  padding-bottom: 1.5rem !important; }\n\n.pl-4 {\n  padding-left: 1.5rem !important; }\n\n.px-4 {\n  padding-right: 1.5rem !important;\n  padding-left: 1.5rem !important; }\n\n.py-4 {\n  padding-top: 1.5rem !important;\n  padding-bottom: 1.5rem !important; }\n\n.p-5 {\n  padding: 3rem 3rem !important; }\n\n.pt-5 {\n  padding-top: 3rem !important; }\n\n.pr-5 {\n  padding-right: 3rem !important; }\n\n.pb-5 {\n  padding-bottom: 3rem !important; }\n\n.pl-5 {\n  padding-left: 3rem !important; }\n\n.px-5 {\n  padding-right: 3rem !important;\n  padding-left: 3rem !important; }\n\n.py-5 {\n  padding-top: 3rem !important;\n  padding-bottom: 3rem !important; }\n\n.m-auto {\n  margin: auto !important; }\n\n.mt-auto {\n  margin-top: auto !important; }\n\n.mr-auto {\n  margin-right: auto !important; }\n\n.mb-auto {\n  margin-bottom: auto !important; }\n\n.ml-auto {\n  margin-left: auto !important; }\n\n.mx-auto {\n  margin-right: auto !important;\n  margin-left: auto !important; }\n\n.my-auto {\n  margin-top: auto !important;\n  margin-bottom: auto !important; }\n\n@media (min-width: 576px) {\n  .m-sm-0 {\n    margin: 0 0 !important; }\n  .mt-sm-0 {\n    margin-top: 0 !important; }\n  .mr-sm-0 {\n    margin-right: 0 !important; }\n  .mb-sm-0 {\n    margin-bottom: 0 !important; }\n  .ml-sm-0 {\n    margin-left: 0 !important; }\n  .mx-sm-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-sm-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-sm-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-sm-1 {\n    margin-top: 0.25rem !important; }\n  .mr-sm-1 {\n    margin-right: 0.25rem !important; }\n  .mb-sm-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-sm-1 {\n    margin-left: 0.25rem !important; }\n  .mx-sm-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-sm-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-sm-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-sm-2 {\n    margin-top: 0.5rem !important; }\n  .mr-sm-2 {\n    margin-right: 0.5rem !important; }\n  .mb-sm-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-sm-2 {\n    margin-left: 0.5rem !important; }\n  .mx-sm-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-sm-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-sm-3 {\n    margin: 1rem 1rem !important; }\n  .mt-sm-3 {\n    margin-top: 1rem !important; }\n  .mr-sm-3 {\n    margin-right: 1rem !important; }\n  .mb-sm-3 {\n    margin-bottom: 1rem !important; }\n  .ml-sm-3 {\n    margin-left: 1rem !important; }\n  .mx-sm-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-sm-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-sm-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-sm-4 {\n    margin-top: 1.5rem !important; }\n  .mr-sm-4 {\n    margin-right: 1.5rem !important; }\n  .mb-sm-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-sm-4 {\n    margin-left: 1.5rem !important; }\n  .mx-sm-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-sm-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-sm-5 {\n    margin: 3rem 3rem !important; }\n  .mt-sm-5 {\n    margin-top: 3rem !important; }\n  .mr-sm-5 {\n    margin-right: 3rem !important; }\n  .mb-sm-5 {\n    margin-bottom: 3rem !important; }\n  .ml-sm-5 {\n    margin-left: 3rem !important; }\n  .mx-sm-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-sm-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-sm-0 {\n    padding: 0 0 !important; }\n  .pt-sm-0 {\n    padding-top: 0 !important; }\n  .pr-sm-0 {\n    padding-right: 0 !important; }\n  .pb-sm-0 {\n    padding-bottom: 0 !important; }\n  .pl-sm-0 {\n    padding-left: 0 !important; }\n  .px-sm-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-sm-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-sm-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-sm-1 {\n    padding-top: 0.25rem !important; }\n  .pr-sm-1 {\n    padding-right: 0.25rem !important; }\n  .pb-sm-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-sm-1 {\n    padding-left: 0.25rem !important; }\n  .px-sm-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-sm-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-sm-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-sm-2 {\n    padding-top: 0.5rem !important; }\n  .pr-sm-2 {\n    padding-right: 0.5rem !important; }\n  .pb-sm-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-sm-2 {\n    padding-left: 0.5rem !important; }\n  .px-sm-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-sm-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-sm-3 {\n    padding: 1rem 1rem !important; }\n  .pt-sm-3 {\n    padding-top: 1rem !important; }\n  .pr-sm-3 {\n    padding-right: 1rem !important; }\n  .pb-sm-3 {\n    padding-bottom: 1rem !important; }\n  .pl-sm-3 {\n    padding-left: 1rem !important; }\n  .px-sm-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-sm-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-sm-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-sm-4 {\n    padding-top: 1.5rem !important; }\n  .pr-sm-4 {\n    padding-right: 1.5rem !important; }\n  .pb-sm-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-sm-4 {\n    padding-left: 1.5rem !important; }\n  .px-sm-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-sm-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-sm-5 {\n    padding: 3rem 3rem !important; }\n  .pt-sm-5 {\n    padding-top: 3rem !important; }\n  .pr-sm-5 {\n    padding-right: 3rem !important; }\n  .pb-sm-5 {\n    padding-bottom: 3rem !important; }\n  .pl-sm-5 {\n    padding-left: 3rem !important; }\n  .px-sm-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-sm-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-sm-auto {\n    margin: auto !important; }\n  .mt-sm-auto {\n    margin-top: auto !important; }\n  .mr-sm-auto {\n    margin-right: auto !important; }\n  .mb-sm-auto {\n    margin-bottom: auto !important; }\n  .ml-sm-auto {\n    margin-left: auto !important; }\n  .mx-sm-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-sm-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n@media (min-width: 768px) {\n  .m-md-0 {\n    margin: 0 0 !important; }\n  .mt-md-0 {\n    margin-top: 0 !important; }\n  .mr-md-0 {\n    margin-right: 0 !important; }\n  .mb-md-0 {\n    margin-bottom: 0 !important; }\n  .ml-md-0 {\n    margin-left: 0 !important; }\n  .mx-md-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-md-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-md-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-md-1 {\n    margin-top: 0.25rem !important; }\n  .mr-md-1 {\n    margin-right: 0.25rem !important; }\n  .mb-md-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-md-1 {\n    margin-left: 0.25rem !important; }\n  .mx-md-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-md-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-md-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-md-2 {\n    margin-top: 0.5rem !important; }\n  .mr-md-2 {\n    margin-right: 0.5rem !important; }\n  .mb-md-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-md-2 {\n    margin-left: 0.5rem !important; }\n  .mx-md-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-md-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-md-3 {\n    margin: 1rem 1rem !important; }\n  .mt-md-3 {\n    margin-top: 1rem !important; }\n  .mr-md-3 {\n    margin-right: 1rem !important; }\n  .mb-md-3 {\n    margin-bottom: 1rem !important; }\n  .ml-md-3 {\n    margin-left: 1rem !important; }\n  .mx-md-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-md-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-md-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-md-4 {\n    margin-top: 1.5rem !important; }\n  .mr-md-4 {\n    margin-right: 1.5rem !important; }\n  .mb-md-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-md-4 {\n    margin-left: 1.5rem !important; }\n  .mx-md-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-md-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-md-5 {\n    margin: 3rem 3rem !important; }\n  .mt-md-5 {\n    margin-top: 3rem !important; }\n  .mr-md-5 {\n    margin-right: 3rem !important; }\n  .mb-md-5 {\n    margin-bottom: 3rem !important; }\n  .ml-md-5 {\n    margin-left: 3rem !important; }\n  .mx-md-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-md-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-md-0 {\n    padding: 0 0 !important; }\n  .pt-md-0 {\n    padding-top: 0 !important; }\n  .pr-md-0 {\n    padding-right: 0 !important; }\n  .pb-md-0 {\n    padding-bottom: 0 !important; }\n  .pl-md-0 {\n    padding-left: 0 !important; }\n  .px-md-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-md-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-md-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-md-1 {\n    padding-top: 0.25rem !important; }\n  .pr-md-1 {\n    padding-right: 0.25rem !important; }\n  .pb-md-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-md-1 {\n    padding-left: 0.25rem !important; }\n  .px-md-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-md-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-md-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-md-2 {\n    padding-top: 0.5rem !important; }\n  .pr-md-2 {\n    padding-right: 0.5rem !important; }\n  .pb-md-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-md-2 {\n    padding-left: 0.5rem !important; }\n  .px-md-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-md-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-md-3 {\n    padding: 1rem 1rem !important; }\n  .pt-md-3 {\n    padding-top: 1rem !important; }\n  .pr-md-3 {\n    padding-right: 1rem !important; }\n  .pb-md-3 {\n    padding-bottom: 1rem !important; }\n  .pl-md-3 {\n    padding-left: 1rem !important; }\n  .px-md-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-md-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-md-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-md-4 {\n    padding-top: 1.5rem !important; }\n  .pr-md-4 {\n    padding-right: 1.5rem !important; }\n  .pb-md-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-md-4 {\n    padding-left: 1.5rem !important; }\n  .px-md-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-md-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-md-5 {\n    padding: 3rem 3rem !important; }\n  .pt-md-5 {\n    padding-top: 3rem !important; }\n  .pr-md-5 {\n    padding-right: 3rem !important; }\n  .pb-md-5 {\n    padding-bottom: 3rem !important; }\n  .pl-md-5 {\n    padding-left: 3rem !important; }\n  .px-md-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-md-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-md-auto {\n    margin: auto !important; }\n  .mt-md-auto {\n    margin-top: auto !important; }\n  .mr-md-auto {\n    margin-right: auto !important; }\n  .mb-md-auto {\n    margin-bottom: auto !important; }\n  .ml-md-auto {\n    margin-left: auto !important; }\n  .mx-md-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-md-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n@media (min-width: 992px) {\n  .m-lg-0 {\n    margin: 0 0 !important; }\n  .mt-lg-0 {\n    margin-top: 0 !important; }\n  .mr-lg-0 {\n    margin-right: 0 !important; }\n  .mb-lg-0 {\n    margin-bottom: 0 !important; }\n  .ml-lg-0 {\n    margin-left: 0 !important; }\n  .mx-lg-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-lg-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-lg-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-lg-1 {\n    margin-top: 0.25rem !important; }\n  .mr-lg-1 {\n    margin-right: 0.25rem !important; }\n  .mb-lg-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-lg-1 {\n    margin-left: 0.25rem !important; }\n  .mx-lg-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-lg-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-lg-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-lg-2 {\n    margin-top: 0.5rem !important; }\n  .mr-lg-2 {\n    margin-right: 0.5rem !important; }\n  .mb-lg-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-lg-2 {\n    margin-left: 0.5rem !important; }\n  .mx-lg-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-lg-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-lg-3 {\n    margin: 1rem 1rem !important; }\n  .mt-lg-3 {\n    margin-top: 1rem !important; }\n  .mr-lg-3 {\n    margin-right: 1rem !important; }\n  .mb-lg-3 {\n    margin-bottom: 1rem !important; }\n  .ml-lg-3 {\n    margin-left: 1rem !important; }\n  .mx-lg-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-lg-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-lg-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-lg-4 {\n    margin-top: 1.5rem !important; }\n  .mr-lg-4 {\n    margin-right: 1.5rem !important; }\n  .mb-lg-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-lg-4 {\n    margin-left: 1.5rem !important; }\n  .mx-lg-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-lg-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-lg-5 {\n    margin: 3rem 3rem !important; }\n  .mt-lg-5 {\n    margin-top: 3rem !important; }\n  .mr-lg-5 {\n    margin-right: 3rem !important; }\n  .mb-lg-5 {\n    margin-bottom: 3rem !important; }\n  .ml-lg-5 {\n    margin-left: 3rem !important; }\n  .mx-lg-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-lg-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-lg-0 {\n    padding: 0 0 !important; }\n  .pt-lg-0 {\n    padding-top: 0 !important; }\n  .pr-lg-0 {\n    padding-right: 0 !important; }\n  .pb-lg-0 {\n    padding-bottom: 0 !important; }\n  .pl-lg-0 {\n    padding-left: 0 !important; }\n  .px-lg-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-lg-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-lg-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-lg-1 {\n    padding-top: 0.25rem !important; }\n  .pr-lg-1 {\n    padding-right: 0.25rem !important; }\n  .pb-lg-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-lg-1 {\n    padding-left: 0.25rem !important; }\n  .px-lg-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-lg-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-lg-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-lg-2 {\n    padding-top: 0.5rem !important; }\n  .pr-lg-2 {\n    padding-right: 0.5rem !important; }\n  .pb-lg-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-lg-2 {\n    padding-left: 0.5rem !important; }\n  .px-lg-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-lg-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-lg-3 {\n    padding: 1rem 1rem !important; }\n  .pt-lg-3 {\n    padding-top: 1rem !important; }\n  .pr-lg-3 {\n    padding-right: 1rem !important; }\n  .pb-lg-3 {\n    padding-bottom: 1rem !important; }\n  .pl-lg-3 {\n    padding-left: 1rem !important; }\n  .px-lg-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-lg-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-lg-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-lg-4 {\n    padding-top: 1.5rem !important; }\n  .pr-lg-4 {\n    padding-right: 1.5rem !important; }\n  .pb-lg-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-lg-4 {\n    padding-left: 1.5rem !important; }\n  .px-lg-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-lg-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-lg-5 {\n    padding: 3rem 3rem !important; }\n  .pt-lg-5 {\n    padding-top: 3rem !important; }\n  .pr-lg-5 {\n    padding-right: 3rem !important; }\n  .pb-lg-5 {\n    padding-bottom: 3rem !important; }\n  .pl-lg-5 {\n    padding-left: 3rem !important; }\n  .px-lg-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-lg-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-lg-auto {\n    margin: auto !important; }\n  .mt-lg-auto {\n    margin-top: auto !important; }\n  .mr-lg-auto {\n    margin-right: auto !important; }\n  .mb-lg-auto {\n    margin-bottom: auto !important; }\n  .ml-lg-auto {\n    margin-left: auto !important; }\n  .mx-lg-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-lg-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n@media (min-width: 1200px) {\n  .m-xl-0 {\n    margin: 0 0 !important; }\n  .mt-xl-0 {\n    margin-top: 0 !important; }\n  .mr-xl-0 {\n    margin-right: 0 !important; }\n  .mb-xl-0 {\n    margin-bottom: 0 !important; }\n  .ml-xl-0 {\n    margin-left: 0 !important; }\n  .mx-xl-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-xl-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-xl-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-xl-1 {\n    margin-top: 0.25rem !important; }\n  .mr-xl-1 {\n    margin-right: 0.25rem !important; }\n  .mb-xl-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-xl-1 {\n    margin-left: 0.25rem !important; }\n  .mx-xl-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-xl-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-xl-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-xl-2 {\n    margin-top: 0.5rem !important; }\n  .mr-xl-2 {\n    margin-right: 0.5rem !important; }\n  .mb-xl-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-xl-2 {\n    margin-left: 0.5rem !important; }\n  .mx-xl-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-xl-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-xl-3 {\n    margin: 1rem 1rem !important; }\n  .mt-xl-3 {\n    margin-top: 1rem !important; }\n  .mr-xl-3 {\n    margin-right: 1rem !important; }\n  .mb-xl-3 {\n    margin-bottom: 1rem !important; }\n  .ml-xl-3 {\n    margin-left: 1rem !important; }\n  .mx-xl-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-xl-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-xl-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-xl-4 {\n    margin-top: 1.5rem !important; }\n  .mr-xl-4 {\n    margin-right: 1.5rem !important; }\n  .mb-xl-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-xl-4 {\n    margin-left: 1.5rem !important; }\n  .mx-xl-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-xl-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-xl-5 {\n    margin: 3rem 3rem !important; }\n  .mt-xl-5 {\n    margin-top: 3rem !important; }\n  .mr-xl-5 {\n    margin-right: 3rem !important; }\n  .mb-xl-5 {\n    margin-bottom: 3rem !important; }\n  .ml-xl-5 {\n    margin-left: 3rem !important; }\n  .mx-xl-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-xl-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-xl-0 {\n    padding: 0 0 !important; }\n  .pt-xl-0 {\n    padding-top: 0 !important; }\n  .pr-xl-0 {\n    padding-right: 0 !important; }\n  .pb-xl-0 {\n    padding-bottom: 0 !important; }\n  .pl-xl-0 {\n    padding-left: 0 !important; }\n  .px-xl-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-xl-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-xl-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-xl-1 {\n    padding-top: 0.25rem !important; }\n  .pr-xl-1 {\n    padding-right: 0.25rem !important; }\n  .pb-xl-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-xl-1 {\n    padding-left: 0.25rem !important; }\n  .px-xl-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-xl-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-xl-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-xl-2 {\n    padding-top: 0.5rem !important; }\n  .pr-xl-2 {\n    padding-right: 0.5rem !important; }\n  .pb-xl-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-xl-2 {\n    padding-left: 0.5rem !important; }\n  .px-xl-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-xl-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-xl-3 {\n    padding: 1rem 1rem !important; }\n  .pt-xl-3 {\n    padding-top: 1rem !important; }\n  .pr-xl-3 {\n    padding-right: 1rem !important; }\n  .pb-xl-3 {\n    padding-bottom: 1rem !important; }\n  .pl-xl-3 {\n    padding-left: 1rem !important; }\n  .px-xl-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-xl-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-xl-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-xl-4 {\n    padding-top: 1.5rem !important; }\n  .pr-xl-4 {\n    padding-right: 1.5rem !important; }\n  .pb-xl-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-xl-4 {\n    padding-left: 1.5rem !important; }\n  .px-xl-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-xl-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-xl-5 {\n    padding: 3rem 3rem !important; }\n  .pt-xl-5 {\n    padding-top: 3rem !important; }\n  .pr-xl-5 {\n    padding-right: 3rem !important; }\n  .pb-xl-5 {\n    padding-bottom: 3rem !important; }\n  .pl-xl-5 {\n    padding-left: 3rem !important; }\n  .px-xl-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-xl-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-xl-auto {\n    margin: auto !important; }\n  .mt-xl-auto {\n    margin-top: auto !important; }\n  .mr-xl-auto {\n    margin-right: auto !important; }\n  .mb-xl-auto {\n    margin-bottom: auto !important; }\n  .ml-xl-auto {\n    margin-left: auto !important; }\n  .mx-xl-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-xl-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n.text-justify {\n  text-align: justify !important; }\n\n.text-nowrap {\n  white-space: nowrap !important; }\n\n.text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.text-left {\n  text-align: left !important; }\n\n.text-right {\n  text-align: right !important; }\n\n.text-center {\n  text-align: center !important; }\n\n@media (min-width: 576px) {\n  .text-sm-left {\n    text-align: left !important; }\n  .text-sm-right {\n    text-align: right !important; }\n  .text-sm-center {\n    text-align: center !important; } }\n\n@media (min-width: 768px) {\n  .text-md-left {\n    text-align: left !important; }\n  .text-md-right {\n    text-align: right !important; }\n  .text-md-center {\n    text-align: center !important; } }\n\n@media (min-width: 992px) {\n  .text-lg-left {\n    text-align: left !important; }\n  .text-lg-right {\n    text-align: right !important; }\n  .text-lg-center {\n    text-align: center !important; } }\n\n@media (min-width: 1200px) {\n  .text-xl-left {\n    text-align: left !important; }\n  .text-xl-right {\n    text-align: right !important; }\n  .text-xl-center {\n    text-align: center !important; } }\n\n.text-lowercase {\n  text-transform: lowercase !important; }\n\n.text-uppercase {\n  text-transform: uppercase !important; }\n\n.text-capitalize {\n  text-transform: capitalize !important; }\n\n.font-weight-normal {\n  font-weight: normal; }\n\n.font-weight-bold {\n  font-weight: bold; }\n\n.font-italic {\n  font-style: italic; }\n\n.text-white {\n  color: #fff !important; }\n\n.text-muted {\n  color: #636c72 !important; }\n\na.text-muted:focus, a.text-muted:hover {\n  color: #4b5257 !important; }\n\n.text-primary {\n  color: #0275d8 !important; }\n\na.text-primary:focus, a.text-primary:hover {\n  color: #025aa5 !important; }\n\n.text-success {\n  color: #5cb85c !important; }\n\na.text-success:focus, a.text-success:hover {\n  color: #449d44 !important; }\n\n.text-info {\n  color: #5bc0de !important; }\n\na.text-info:focus, a.text-info:hover {\n  color: #31b0d5 !important; }\n\n.text-warning {\n  color: #f0ad4e !important; }\n\na.text-warning:focus, a.text-warning:hover {\n  color: #ec971f !important; }\n\n.text-danger {\n  color: #d9534f !important; }\n\na.text-danger:focus, a.text-danger:hover {\n  color: #c9302c !important; }\n\n.text-gray-dark {\n  color: #292b2c !important; }\n\na.text-gray-dark:focus, a.text-gray-dark:hover {\n  color: #101112 !important; }\n\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0; }\n\n.invisible {\n  visibility: hidden !important; }\n\n.hidden-xs-up {\n  display: none !important; }\n\n@media (max-width: 575px) {\n  .hidden-xs-down {\n    display: none !important; } }\n\n@media (min-width: 576px) {\n  .hidden-sm-up {\n    display: none !important; } }\n\n@media (max-width: 767px) {\n  .hidden-sm-down {\n    display: none !important; } }\n\n@media (min-width: 768px) {\n  .hidden-md-up {\n    display: none !important; } }\n\n@media (max-width: 991px) {\n  .hidden-md-down {\n    display: none !important; } }\n\n@media (min-width: 992px) {\n  .hidden-lg-up {\n    display: none !important; } }\n\n@media (max-width: 1199px) {\n  .hidden-lg-down {\n    display: none !important; } }\n\n@media (min-width: 1200px) {\n  .hidden-xl-up {\n    display: none !important; } }\n\n.hidden-xl-down {\n  display: none !important; }\n\n.visible-print-block {\n  display: none !important; }\n  @media print {\n    .visible-print-block {\n      display: block !important; } }\n\n.visible-print-inline {\n  display: none !important; }\n  @media print {\n    .visible-print-inline {\n      display: inline !important; } }\n\n.visible-print-inline-block {\n  display: none !important; }\n  @media print {\n    .visible-print-inline-block {\n      display: inline-block !important; } }\n\n@media print {\n  .hidden-print {\n    display: none !important; } }\n\n.weather {\n  color: #fff; }\n  .weather > div {\n    padding-bottom: 20px; }\n  .weather h1 {\n    font-weight: 100; }\n  .weather h2 {\n    font-weight: 800;\n    text-transform: uppercase;\n    text-align: left;\n    font-size: 24px; }\n  .weather .toggle li {\n    color: #43cff3;\n    cursor: pointer;\n    float: left;\n    padding-left: 5px; }\n    .weather .toggle li.active {\n      cursor: default;\n      color: #fff; }\n  .weather .header {\n    position: relative; }\n    .weather .header .toggle {\n      position: absolute;\n      right: 0;\n      bottom: 0; }\n  .weather .card {\n    padding: .5%;\n    background: transparent;\n    border: 0 none; }\n    .weather .card .container {\n      padding: 2%;\n      border-radius: 10px;\n      border: 0 none;\n      background: linear-gradient(to bottom, #e57263, #2dcdf8);\n      padding: 2%;\n      color: #fff; }\n      .weather .card .container label {\n        float: left;\n        width: 100%;\n        margin: 0; }\n        .weather .card .container label.title {\n          text-transform: uppercase; }\n        .weather .card .container label.number {\n          font-size: 90px;\n          font-weight: 100;\n          text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.2); }\n  .weather .day .card {\n    float: left; }\n    .weather .day .card .container label.number {\n      font-size: 45px; }\n  .weather input {\n    box-shadow: none;\n    border-radius: 0;\n    background: transparent;\n    border: 0 none;\n    border-bottom: 1px solid #43cff3;\n    color: #fff; }\n    .weather input:focus {\n      border-color: #e56363;\n      outline: 0;\n      box-shadow: none;\n      background: transparent; }\n  @media screen and (max-width: 768px) {\n    .weather h2 {\n      text-align: center; }\n    .weather .card {\n      width: 50% !important; }\n      .weather .card .container {\n        margin: 0 auto;\n        width: 100%; } }\n  @media screen and (max-width: 414px) {\n    .weather .card {\n      width: 100% !important; } }\n\nhtml {\n  min-height: 100%;\n  position: relative;\n  background: linear-gradient(to bottom, #3a404e, #201d28); }\n\nbody {\n  margin-bottom: 0px;\n  font-family: 'Roboto', sans-serif;\n  background: transparent;\n  color: #fff; }\n\n.navbar {\n  background: transparent; }\n  .navbar .navbar-brand {\n    color: #fff; }\n  .navbar a, .navbar .nav-link {\n    color: #fff; }\n\n.btn, .badge-pill {\n  cursor: pointer; }\n", "", {"version":3,"sources":["/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/bootstrap.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_normalize.scss","/Users/yasirhossain/Projects/weather-app/styles.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_print.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_reboot.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_variables.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_hover.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_type.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_lists.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_images.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_image.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_border-radius.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_mixins.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_code.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_grid.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_grid.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_breakpoints.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_grid-framework.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_tables.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_table-row.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_forms.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_forms.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_buttons.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_buttons.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_transitions.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_dropdown.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_nav-divider.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_button-group.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_input-group.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_custom-forms.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_nav.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_navbar.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_card.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_cards.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_breadcrumb.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_clearfix.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_pagination.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_pagination.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_badge.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_badge.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_jumbotron.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_alert.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_alert.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_progress.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_gradients.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_media.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_list-group.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_list-group.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_responsive-embed.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_close.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_modal.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_tooltip.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_reset-text.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_popover.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/_carousel.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_transforms.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/utilities/_align.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/utilities/_background.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_background-variant.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/utilities/_borders.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/utilities/_display.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/utilities/_flex.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/utilities/_float.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_float.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/utilities/_position.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/utilities/_screenreaders.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_screen-reader.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/utilities/_sizing.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/utilities/_spacing.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/utilities/_text.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_text-truncate.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_text-emphasis.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_text-hide.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/utilities/_visibility.scss","/Users/yasirhossain/Projects/weather-app/node_modules/bootstrap/scss/mixins/_visibility.scss","/Users/yasirhossain/Projects/weather-app/src/client/styles/weather.scss","/Users/yasirhossain/Projects/weather-app/src/client/styles/styles.scss"],"names":[],"mappings":"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lBqFW;EkBpFX,0BlB2Fc;EkB1Fd,sBlB0Fc,EiBvCf;EhBpDG;IiBMA,YlB8ES;IkB7ET,0BAX0C;IAY1C,sBAXkC,EjBGb;EiBUvB;IAMI,8ClB2EU,EkBzEb;EAGD;IAEE,0BlBoEY;IkBnEZ,sBlBmEY,EkBlEb;EAED;;IAGE,YlBsDS;IkBrDT,0BAnC0C;IAoC1C,uBAAsB;IACtB,sBApCkC,EAsCnC;;ADkBH;ECtDE,YlBqFW;EkBpFX,0BlByFc;EkBxFd,sBlBwFc,EiBlCf;EhBvDG;IiBMA,YlB8ES;IkB7ET,0BAX0C;IAY1C,sBAXkC,EjBGb;EiBUvB;IAMI,6ClByEU,EkBvEb;EAGD;IAEE,0BlBkEY;IkBjEZ,sBlBiEY,EkBhEb;EAED;;IAGE,YlBsDS;IkBrDT,0BAnC0C;IAoC1C,uBAAsB;IACtB,sBApCkC,EAsCnC;;ADqBH;ECzDE,YlBqFW;EkBpFX,0BlBuFc;EkBtFd,sBlBsFc,EiB7Bf;EhB1DG;IiBMA,YlB8ES;IkB7ET,0BAX0C;IAY1C,sBAXkC,EjBGb;EiBUvB;IAMI,8ClBuEU,EkBrEb;EAGD;IAEE,0BlBgEY;IkB/DZ,sBlB+DY,EkB9Db;EAED;;IAGE,YlBsDS;IkBrDT,0BAnC0C;IAoC1C,uBAAsB;IACtB,sBApCkC,EAsCnC;;ADwBH;EC5DE,YlBqFW;EkBpFX,0BlBsFc;EkBrFd,sBlBqFc,EiBzBf;EhB7DG;IiBMA,YlB8ES;IkB7ET,0BAX0C;IAY1C,sBAXkC,EjBGb;EiBUvB;IAMI,6ClBsEU,EkBpEb;EAGD;IAEE,0BlB+DY;IkB9DZ,sBlB8DY,EkB7Db;EAED;;IAGE,YlBsDS;IkBrDT,0BAnC0C;IAoC1C,uBAAsB;IACtB,sBApCkC,EAsCnC;;AD6BH;ECzBE,elBmDc;EkBlDd,uBAAsB;EACtB,8BAA6B;EAC7B,sBlBgDc,EiBxBf;EhBlEG;IiB6CA,YAPoD;IAQpD,0BlB4CY;IkB3CZ,sBlB2CY,EC1FS;EiBkDvB;IAEE,6ClBsCY,EkBrCb;EAED;IAEE,elBiCY;IkBhCZ,8BAA6B,EAC9B;EAED;;IAGE,YA1BoD;IA2BpD,0BlByBY;IkBxBZ,sBlBwBY,EkBvBb;;ADAH;EC5BE,YlBsUmC;EkBrUnC,uBAAsB;EACtB,8BAA6B;EAC7B,mBlBmUmC,EiBxSpC;EhBrEG;IiB6CA,YAPoD;IAQpD,uBlB+TiC;IkB9TjC,mBlB8TiC,EC7WZ;EiBkDvB;IAEE,+ClByTiC,EkBxTlC;EAED;IAEE,YlBoTiC;IkBnTjC,8BAA6B,EAC9B;EAED;;IAGE,YA1BoD;IA2BpD,uBlB4SiC;IkB3SjC,mBlB2SiC,EkB1SlC;;ADGH;EC/BE,elBoDc;EkBnDd,uBAAsB;EACtB,8BAA6B;EAC7B,sBlBiDc,EiBnBf;EhBxEG;IiB6CA,YAPoD;IAQpD,0BlB6CY;IkB5CZ,sBlB4CY,EC3FS;EiBkDvB;IAEE,8ClBuCY,EkBtCb;EAED;IAEE,elBkCY;IkBjCZ,8BAA6B,EAC9B;EAED;;IAGE,YA1BoD;IA2BpD,0BlB0BY;IkBzBZ,sBlByBY,EkBxBb;;ADMH;EClCE,elBkDc;EkBjDd,uBAAsB;EACtB,8BAA6B;EAC7B,sBlB+Cc,EiBdf;EhB3EG;IiB6CA,YAPoD;IAQpD,0BlB2CY;IkB1CZ,sBlB0CY,ECzFS;EiBkDvB;IAEE,6ClBqCY,EkBpCb;EAED;IAEE,elBgCY;IkB/BZ,8BAA6B,EAC9B;EAED;;IAGE,YA1BoD;IA2BpD,0BlBwBY;IkBvBZ,sBlBuBY,EkBtBb;;ADSH;ECrCE,elBgDc;EkB/Cd,uBAAsB;EACtB,8BAA6B;EAC7B,sBlB6Cc,EiBTf;EhB9EG;IiB6CA,YAPoD;IAQpD,0BlByCY;IkBxCZ,sBlBwCY,ECvFS;EiBkDvB;IAEE,8ClBmCY,EkBlCb;EAED;IAEE,elB8BY;IkB7BZ,8BAA6B,EAC9B;EAED;;IAGE,YA1BoD;IA2BpD,0BlBsBY;IkBrBZ,sBlBqBY,EkBpBb;;ADYH;ECxCE,elB+Cc;EkB9Cd,uBAAsB;EACtB,8BAA6B;EAC7B,sBlB4Cc,EiBLf;EhBjFG;IiB6CA,YAPoD;IAQpD,0BlBwCY;IkBvCZ,sBlBuCY,ECtFS;EiBkDvB;IAEE,6ClBkCY,EkBjCb;EAED;IAEE,elB6BY;IkB5BZ,8BAA6B,EAC9B;EAED;;IAGE,YA1BoD;IA2BpD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mBAAkB;EAClB,qBAAa;EAAb,qBAAa;EAAb,cAAa;EACb,6BAAsB;EAAtB,8BAAsB;MAAtB,2BAAsB;UAAtB,uBAAsB;EACtB,uB3BsFW;E2BrFX,uC3BsFW;EM3FT,uBN4T2B,E2BrT9B;;AAED;EAGE,oBAAc;MAAd,mBAAc;UAAd,eAAc;EACd,iB3BorBgC,E2BnrBjC;;AAED;EACE,uB3BirB+B,E2BhrBhC;;AAED;EACE,sBAAgC;EAChC,iBAAgB,EACjB;;AAED;EACE,iBAAgB,EACjB;;A1BrBG;E0ByBA,sBAAqB,E1BzBA;;A0BuBzB;EAMI,qB3B8pB8B,E2B7pB/B;;AAGH;ErBjCI,iCNsT2B;EMrT3B,gCNqT2B,E2BjR1B;;AAJL;ErBnBI,oCNwS2B;EMvS3B,mCNuS2B,E2B3Q1B;;AASL;EACE,yB3BsoBgC;E2BroBhC,iBAAgB;EAChB,0B3B6CiC;E2B5CjC,8C3B6BW,E2BxBZ;EATD;IrB1DI,2DqBiE8E,EAC/E;;AAGH;EACE,yB3B2nBgC;E2B1nBhC,0B3BmCiC;E2BlCjC,2C3BmBW,E2BdZ;EARD;IrBrEI,2DNssB2E,E2B1nB5E;;AAQH;EACE,wBAAkC;EAClC,wB3B4mB+B;E2B3mB/B,uBAAiC;EACjC,iBAAgB,EACjB;;AAED;EACE,wBAAkC;EAClC,uBAAiC,EAClC;;AAOD;ECtGE,0B5BiGc;E4BhGd,sB5BgGc,E2BOf;ECrGC;;IAEE,8BAA6B,EAC9B;;ADmGH;ECzGE,0B5BgGc;E4B/Fd,sB5B+Fc,E2BWf;ECxGC;;IAEE,8BAA6B,EAC9B;;ADsGH;EC5GE,0B5BkGc;E4BjGd,sB5BiGc,E2BYf;EC3GC;;IAEE,8BAA6B,EAC9B;;ADyGH;EC/GE,0B5B8Fc;E4B7Fd,sB5B6Fc,E2BmBf;EC9GC;;IAEE,8BAA6B,EAC9B;;AD4GH;EClHE,0B5B6Fc;E4B5Fd,sB5B4Fc,E2BuBf;ECjHC;;IAEE,8BAA6B,EAC9B;;ADiHH;EC7GE,8BAA6B;EAC7B,sB5BsFc,E2BwBf;;AACD;EChHE,8BAA6B;EAC7B,mB5ByWmC,E2BxPpC;;AACD;ECnHE,8BAA6B;EAC7B,sB5BuFc,E2B6Bf;;AACD;ECtHE,8BAA6B;EAC7B,sB5BqFc,E2BkCf;;AACD;ECzHE,8BAA6B;EAC7B,sB5BmFc,E2BuCf;;AACD;EC5HE,8BAA6B;EAC7B,sB5BkFc,E2B2Cf;;AAMD;EC3HE,iCAA4B,ED6H7B;EC3HC;;IAEE,8BAA6B;IAC7B,uCAAkC,EACnC;EACD;;;;IAIE,YAAW,EACZ;EACD;;;;IAIE,iCAA4B,EAC7B;EACD;IAEI,Y5BmDO,ECvER;;A0BkIL;EACE,WAAU;EACV,iBAAgB;EAChB,eAAc,EACf;;AAGD;ErB5JI,mCNssB2E,E2BviB9E;;AACD;EACE,mBAAkB;EAClB,OAAM;EACN,SAAQ;EACR,UAAS;EACT,QAAO;EACP,iB3BsiBgC,E2BriBjC;;AAKD;ErBtKI,6CNgsB2E;EM/rB3E,4CN+rB2E,E2BxhB9E;;AACD;ErB3JI,gDNkrB2E;EMjrB3E,+CNirB2E,E2BrhB9E;;AhB7HG;EgBmIF;IACE,qBAAa;IAAb,qBAAa;IAAb,cAAa;IACb,+BAAmB;IAAnB,8BAAmB;QAAnB,wBAAmB;YAAnB,oBAAmB,EAapB;IAfD;MAKI,qBAAa;MAAb,qBAAa;MAAb,cAAa;MACb,oBAAW;UAAX,kBAAW;cAAX,YAAW;MACX,6BAAsB;MAAtB,8BAAsB;UAAtB,2BAAsB;cAAtB,uBAAsB,EAOvB;MAdH;QAY0B,kB3B2gB6B,E2B3gBK;MAZ5D;QAayB,mB3B0gB8B,E2B1gBK,EAAA;;AhBhJ1D;EgB2JF;IACE,qBAAa;IAAb,qBAAa;IAAb,cAAa;IACb,+BAAmB;IAAnB,8BAAmB;QAAnB,wBAAmB;YAAnB,oBAAmB,EA2CpB;IA7CD;MAKI,oBAAW;UAAX,kBAAW;cAAX,YAAW,EAuCZ;MA5CH;QAQM,eAAc;QACd,eAAc,EACf;MAVL;QrBlME,8BqBiNoC;QrBhNpC,2BqBgNoC,EAQ/B;QAvBP;UAkBU,2BAA0B,EAC3B;QAnBT;UAqBU,8BAA6B,EAC9B;MAtBT;QrBpLE,6BqB6MmC;QrB5MnC,0BqB4MmC,EAQ9B;QAjCP;UA4BU,0BAAyB,EAC1B;QA7BT;UA+BU,6BAA4B,EAC7B;MAhCT;QAoCQ,iBAAgB,EAMjB;QA1CP;;UAwCU,iBAAgB,EACjB,EAAA;;AhBpMP;EgBiNF;IACE,wB3B0cyB;Y2B1czB,gB3B0cyB;I2BzczB,4B3B0c+B;Y2B1c/B,oB3B0c+B,E2BnchC;IATD;MAKI,sBAAqB;MACrB,YAAW;MACX,uB3Bsb2B,E2Brb5B,EAAA;;AEjRL;EACE,sB7B04BkC;E6Bz4BlC,oB7B0Ia;E6BzIb,iBAAgB;EAChB,0B7ByGiC;EMzG/B,uBN4T2B,E6BzT9B;ECNC;IACE,eAAc;IACd,YAAW;IACX,YAAW,EACZ;;ADIH;EACE,YAAW,EA2BZ;EA5BD;IAKI,sBAAqB;IACrB,sB7B63BiC;I6B53BjC,qB7B43BiC;I6B33BjC,e7B2F+B;I6B1F/B,aAAiC,EAClC;EAVH;IAmBI,2BAA0B,EAC3B;EApBH;IAsBI,sBAAqB,EACtB;EAvBH;IA0BI,e7ByE+B,E6BxEhC;;AEpCH;EACE,qBAAa;EAAb,qBAAa;EAAb,cAAa;EAEb,gBAAe;EACf,iBAAgB;EzBAd,uBN4T2B,E+B1T9B;;AAED;EAGM,eAAc;EzBoBhB,mCNiS2B;EMhS3B,gCNgS2B,E+BnT1B;;AALL;EzBSI,oCN+S2B;EM9S3B,iCN8S2B,E+B9S1B;;AAVL;EAcI,WAAU;EACV,Y/BuES;E+BtET,0B/B4EY;E+B3EZ,sB/B2EY,E+B1Eb;;AAlBH;EAqBI,e/B+E+B;E+B9E/B,qBAAoB;EACpB,oB/BibwC;E+BhbxC,uB/B8DS;E+B7DT,mB/BmoBuC,E+BloBxC;;AAGH;EACE,mBAAkB;EAClB,eAAc;EACd,wB/BqmB0C;E+BpmB1C,kBAAiB;EACjB,kB/BymBwC;E+BxmBxC,e/ByDc;E+BxDd,uB/BkDW;E+BjDX,uB/B2mByC,E+BnmB1C;E9BjCG;I8B4BA,e/BmJ4C;I+BlJ5C,sBAAqB;IACrB,0B/B2D+B;I+B1D/B,mB/BymBuC,ECroBtC;;A+BpBH;EACE,wBhC6oBwC;EgC5oBxC,mBhCuPoB,EgCtPrB;;AAIG;E1BqBF,kCNkS0B;EMjS1B,+BNiS0B,EgCrTvB;;AAGD;E1BEF,mCNgT0B;EM/S1B,gCN+S0B,EgChTvB;;AAdL;EACE,wBhC2oBuC;EgC1oBvC,oBhCwPoB,EgCvPrB;;AAIG;E1BqBF,kCNmS0B;EMlS1B,+BNkS0B,EgCtTvB;;AAGD;E1BEF,mCNiT0B;EMhT1B,gCNgT0B,EgCjTvB;;ACZP;EACE,sBAAqB;EACrB,sBjCowBgC;EiCnwBhC,ejCiwB+B;EiChwB/B,kBjCwPqB;EiCvPrB,eAAc;EACd,YjCmFW;EiClFX,mBAAkB;EAClB,oBAAmB;EACnB,yBAAwB;E3BVtB,uBN4T2B,EiC3S9B;EAhBD;IAcI,cAAa,EACd;;AAIH;EACE,mBAAkB;EAClB,UAAS,EACV;;AhCPG;EgCaA,YjC6DS;EiC5DT,sBAAqB;EACrB,gBAAe,EhCZd;;AgCqBL;EACE,qBjCiuBgC;EiChuBhC,oBjCguBgC;EM1wB9B,qBN6wB+B,EiCjuBlC;;AAMD;ECnDE,0BlCyGiC,EiCpDlC;EhCpCG;IiCbE,0BAAqC,EjCgBtC;;AgCmCL;ECvDE,0BlCiGc,EiCxCf;EhCxCG;IiCbE,0BAAqC,EjCgBtC;;AgCuCL;EC3DE,0BlCgGc,EiCnCf;EhC5CG;IiCbE,0BAAqC,EjCgBtC;;AgC2CL;EC/DE,0BlCkGc,EiCjCf;EhChDG;IiCbE,0BAAqC,EjCgBtC;;AgC+CL;ECnEE,0BlC8Fc,EiCzBf;EhCpDG;IiCbE,0BAAqC,EjCgBtC;;AgCmDL;ECvEE,0BlC6Fc,EiCpBf;EhCxDG;IiCbE,0BAAqC,EjCgBtC;;AkCvBL;EACE,mBAAoD;EACpD,oBnCuqBmC;EmCtqBnC,0BnC0GiC;EMzG/B,sBN6T0B,EmCxT7B;ExB+CG;IwBxDJ;MAOI,mBnCkqBiC,EmChqBpC,EAAA;;AAED;EACE,0BAA4C,EAC7C;;AAED;EACE,iBAAgB;EAChB,gBAAe;E7Bbb,iB6BcsB,EACzB;;ACfD;EACE,yBpCkzBmC;EoCjzBnC,oBpCsIa;EoCrIb,8BAA6C;E9BH3C,uBN4T2B,EoCvT9B;;AAGD;EAEE,eAAc,EACf;;AAGD;EACE,kBpC8OqB,EoC7OtB;;AAOD;EAGI,mBAAkB;EAClB,cpCyxBgC;EoCxxBhC,gBpCuxBiC;EoCtxBjC,yBpCsxBiC;EoCrxBjC,eAAc,EAC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","file":"styles.scss","sourcesContent":["/*!\n * Bootstrap v4.0.0-alpha.6 (https://getbootstrap.com)\n * Copyright 2011-2017 The Bootstrap Authors\n * Copyright 2011-2017 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */\n\n// Core variables and mixins\n@import \"variables\";\n@import \"mixins\";\n@import \"custom\";\n\n// Reset and dependencies\n@import \"normalize\";\n@import \"print\";\n\n// Core CSS\n@import \"reboot\";\n@import \"type\";\n@import \"images\";\n@import \"code\";\n@import \"grid\";\n@import \"tables\";\n@import \"forms\";\n@import \"buttons\";\n\n// Components\n@import \"transitions\";\n@import \"dropdown\";\n@import \"button-group\";\n@import \"input-group\";\n@import \"custom-forms\";\n@import \"nav\";\n@import \"navbar\";\n@import \"card\";\n@import \"breadcrumb\";\n@import \"pagination\";\n@import \"badge\";\n@import \"jumbotron\";\n@import \"alert\";\n@import \"progress\";\n@import \"media\";\n@import \"list-group\";\n@import \"responsive-embed\";\n@import \"close\";\n\n// Components w/ JavaScript\n@import \"modal\";\n@import \"tooltip\";\n@import \"popover\";\n@import \"carousel\";\n\n// Utility classes\n@import \"utilities\";\n","/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n\n//\n// 1. Change the default font family in all browsers (opinionated).\n// 2. Correct the line height in all browsers.\n// 3. Prevent adjustments of font size after orientation changes in\n//    IE on Windows Phone and in iOS.\n//\n\n// Document\n// ==========================================================================\n\nhtml {\n  font-family: sans-serif; // 1\n  line-height: 1.15; // 2\n  -ms-text-size-adjust: 100%; // 3\n  -webkit-text-size-adjust: 100%; // 3\n}\n\n// Sections\n// ==========================================================================\n\n//\n// Remove the margin in all browsers (opinionated).\n//\n\nbody {\n  margin: 0;\n}\n\n//\n// Add the correct display in IE 9-.\n//\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n//\n// Correct the font size and margin on `h1` elements within `section` and\n// `article` contexts in Chrome, Firefox, and Safari.\n//\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n// Grouping content\n// ==========================================================================\n\n//\n// Add the correct display in IE 9-.\n// 1. Add the correct display in IE.\n//\n\nfigcaption,\nfigure,\nmain { // 1\n  display: block;\n}\n\n//\n// Add the correct margin in IE 8.\n//\n\nfigure {\n  margin: 1em 40px;\n}\n\n//\n// 1. Add the correct box sizing in Firefox.\n// 2. Show the overflow in Edge and IE.\n//\n\nhr {\n  box-sizing: content-box; // 1\n  height: 0; // 1\n  overflow: visible; // 2\n}\n\n//\n// 1. Correct the inheritance and scaling of font size in all browsers.\n// 2. Correct the odd `em` font sizing in all browsers.\n//\n\npre {\n  font-family: monospace, monospace; // 1\n  font-size: 1em; // 2\n}\n\n// Text-level semantics\n// ==========================================================================\n\n//\n// 1. Remove the gray background on active links in IE 10.\n// 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n//\n\na {\n  background-color: transparent; // 1\n  -webkit-text-decoration-skip: objects; // 2\n}\n\n//\n// Remove the outline on focused links when they are also active or hovered\n// in all browsers (opinionated).\n//\n\na:active,\na:hover {\n  outline-width: 0;\n}\n\n//\n// 1. Remove the bottom border in Firefox 39-.\n// 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n//\n\nabbr[title] {\n  border-bottom: none; // 1\n  text-decoration: underline; // 2\n  text-decoration: underline dotted; // 2\n}\n\n//\n// Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n//\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n//\n// Add the correct font weight in Chrome, Edge, and Safari.\n//\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n//\n// 1. Correct the inheritance and scaling of font size in all browsers.\n// 2. Correct the odd `em` font sizing in all browsers.\n//\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; // 1\n  font-size: 1em; // 2\n}\n\n//\n// Add the correct font style in Android 4.3-.\n//\n\ndfn {\n  font-style: italic;\n}\n\n//\n// Add the correct background and color in IE 9-.\n//\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n//\n// Add the correct font size in all browsers.\n//\n\nsmall {\n  font-size: 80%;\n}\n\n//\n// Prevent `sub` and `sup` elements from affecting the line height in\n// all browsers.\n//\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n// Embedded content\n// ==========================================================================\n\n//\n// Add the correct display in IE 9-.\n//\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n//\n// Add the correct display in iOS 4-7.\n//\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n//\n// Remove the border on images inside links in IE 10-.\n//\n\nimg {\n  border-style: none;\n}\n\n//\n// Hide the overflow in IE.\n//\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n// Forms\n// ==========================================================================\n\n//\n// 1. Change the font styles in all browsers (opinionated).\n// 2. Remove the margin in Firefox and Safari.\n//\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif; // 1\n  font-size: 100%; // 1\n  line-height: 1.15; // 1\n  margin: 0; // 2\n}\n\n//\n// Show the overflow in IE.\n// 1. Show the overflow in Edge.\n//\n\nbutton,\ninput { // 1\n  overflow: visible;\n}\n\n//\n// Remove the inheritance of text transform in Edge, Firefox, and IE.\n// 1. Remove the inheritance of text transform in Firefox.\n//\n\nbutton,\nselect { // 1\n  text-transform: none;\n}\n\n//\n// 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n//    controls in Android 4.\n// 2. Correct the inability to style clickable types in iOS and Safari.\n//\n\nbutton,\nhtml [type=\"button\"], // 1\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; // 2\n}\n\n//\n// Remove the inner border and padding in Firefox.\n//\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n//\n// Restore the focus styles unset by the previous rule.\n//\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n//\n// Change the border, margin, and padding in all browsers (opinionated).\n//\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n//\n// 1. Correct the text wrapping in Edge and IE.\n// 2. Correct the color inheritance from `fieldset` elements in IE.\n// 3. Remove the padding so developers are not caught out when they zero out\n//    `fieldset` elements in all browsers.\n//\n\nlegend {\n  box-sizing: border-box; // 1\n  color: inherit; // 2\n  display: table; // 1\n  max-width: 100%; // 1\n  padding: 0; // 3\n  white-space: normal; // 1\n}\n\n//\n// 1. Add the correct display in IE 9-.\n// 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n//\n\nprogress {\n  display: inline-block; // 1\n  vertical-align: baseline; // 2\n}\n\n//\n// Remove the default vertical scrollbar in IE.\n//\n\ntextarea {\n  overflow: auto;\n}\n\n//\n// 1. Add the correct box sizing in IE 10-.\n// 2. Remove the padding in IE 10-.\n//\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; // 1\n  padding: 0; // 2\n}\n\n//\n// Correct the cursor style of increment and decrement buttons in Chrome.\n//\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n//\n// 1. Correct the odd appearance in Chrome and Safari.\n// 2. Correct the outline style in Safari.\n//\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; // 1\n  outline-offset: -2px; // 2\n}\n\n//\n// Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n//\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n//\n// 1. Correct the inability to style clickable types in iOS and Safari.\n// 2. Change font properties to `inherit` in Safari.\n//\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; // 1\n  font: inherit; // 2\n}\n\n// Interactive\n// ==========================================================================\n\n//\n// Add the correct display in IE 9-.\n// 1. Add the correct display in Edge, IE, and Firefox.\n//\n\ndetails, // 1\nmenu {\n  display: block;\n}\n\n//\n// Add the correct display in all browsers.\n//\n\nsummary {\n  display: list-item;\n}\n\n// Scripting\n// ==========================================================================\n\n//\n// Add the correct display in IE 9-.\n//\n\ncanvas {\n  display: inline-block;\n}\n\n//\n// Add the correct display in IE.\n//\n\ntemplate {\n  display: none;\n}\n\n// Hidden\n// ==========================================================================\n\n//\n// Add the correct display in IE 10-.\n//\n\n[hidden] {\n  display: none;\n}\n","@import url(\"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700\");\n/*!\n * Bootstrap v4.0.0-alpha.6 (https://getbootstrap.com)\n * Copyright 2011-2017 The Bootstrap Authors\n * Copyright 2011-2017 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */\n/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  font-family: sans-serif;\n  line-height: 1.15;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nfigcaption,\nfigure,\nmain {\n  display: block; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  box-sizing: content-box;\n  height: 0;\n  overflow: visible; }\n\npre {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\na {\n  background-color: transparent;\n  -webkit-text-decoration-skip: objects; }\n\na:active,\na:hover {\n  outline-width: 0; }\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline;\n  text-decoration: underline dotted; }\n\nb,\nstrong {\n  font-weight: inherit; }\n\nb,\nstrong {\n  font-weight: bolder; }\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\ndfn {\n  font-style: italic; }\n\nmark {\n  background-color: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\naudio,\nvideo {\n  display: inline-block; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\nimg {\n  border-style: none; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  font-size: 100%;\n  line-height: 1.15;\n  margin: 0; }\n\nbutton,\ninput {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; }\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0;\n  white-space: normal; }\n\nprogress {\n  display: inline-block;\n  vertical-align: baseline; }\n\ntextarea {\n  overflow: auto; }\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px; }\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit; }\n\ndetails,\nmenu {\n  display: block; }\n\nsummary {\n  display: list-item; }\n\ncanvas {\n  display: inline-block; }\n\ntemplate {\n  display: none; }\n\n[hidden] {\n  display: none; }\n\n@media print {\n  *,\n  *::before,\n  *::after,\n  p::first-letter,\n  div::first-letter,\n  blockquote::first-letter,\n  li::first-letter,\n  p::first-line,\n  div::first-line,\n  blockquote::first-line,\n  li::first-line {\n    text-shadow: none !important;\n    box-shadow: none !important; }\n  a,\n  a:visited {\n    text-decoration: underline; }\n  abbr[title]::after {\n    content: \" (\" attr(title) \")\"; }\n  pre {\n    white-space: pre-wrap !important; }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid; }\n  thead {\n    display: table-header-group; }\n  tr,\n  img {\n    page-break-inside: avoid; }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3; }\n  h2,\n  h3 {\n    page-break-after: avoid; }\n  .navbar {\n    display: none; }\n  .badge {\n    border: 1px solid #000; }\n  .table {\n    border-collapse: collapse !important; }\n    .table td,\n    .table th {\n      background-color: #fff !important; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #ddd !important; } }\n\nhtml {\n  box-sizing: border-box; }\n\n*,\n*::before,\n*::after {\n  box-sizing: inherit; }\n\n@-ms-viewport {\n  width: device-width; }\n\nhtml {\n  -ms-overflow-style: scrollbar;\n  -webkit-tap-highlight-color: transparent; }\n\nbody {\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1.5;\n  color: #292b2c;\n  background-color: #fff; }\n\n[tabindex=\"-1\"]:focus {\n  outline: none !important; }\n\nh1, h2, h3, h4, h5, h6 {\n  margin-top: 0;\n  margin-bottom: .5rem; }\n\np {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nabbr[title],\nabbr[data-original-title] {\n  cursor: help; }\n\naddress {\n  margin-bottom: 1rem;\n  font-style: normal;\n  line-height: inherit; }\n\nol,\nul,\ndl {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nol ol,\nul ul,\nol ul,\nul ol {\n  margin-bottom: 0; }\n\ndt {\n  font-weight: bold; }\n\ndd {\n  margin-bottom: .5rem;\n  margin-left: 0; }\n\nblockquote {\n  margin: 0 0 1rem; }\n\na {\n  color: #0275d8;\n  text-decoration: none; }\n  a:focus, a:hover {\n    color: #014c8c;\n    text-decoration: underline; }\n\na:not([href]):not([tabindex]) {\n  color: inherit;\n  text-decoration: none; }\n  a:not([href]):not([tabindex]):focus, a:not([href]):not([tabindex]):hover {\n    color: inherit;\n    text-decoration: none; }\n  a:not([href]):not([tabindex]):focus {\n    outline: 0; }\n\npre {\n  margin-top: 0;\n  margin-bottom: 1rem;\n  overflow: auto; }\n\nfigure {\n  margin: 0 0 1rem; }\n\nimg {\n  vertical-align: middle; }\n\n[role=\"button\"] {\n  cursor: pointer; }\n\na,\narea,\nbutton,\n[role=\"button\"],\ninput,\nlabel,\nselect,\nsummary,\ntextarea {\n  touch-action: manipulation; }\n\ntable {\n  border-collapse: collapse;\n  background-color: transparent; }\n\ncaption {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  color: #636c72;\n  text-align: left;\n  caption-side: bottom; }\n\nth {\n  text-align: left; }\n\nlabel {\n  display: inline-block;\n  margin-bottom: .5rem; }\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color; }\n\ninput,\nbutton,\nselect,\ntextarea {\n  line-height: inherit; }\n\ninput[type=\"radio\"]:disabled,\ninput[type=\"checkbox\"]:disabled {\n  cursor: not-allowed; }\n\ninput[type=\"date\"],\ninput[type=\"time\"],\ninput[type=\"datetime-local\"],\ninput[type=\"month\"] {\n  -webkit-appearance: listbox; }\n\ntextarea {\n  resize: vertical; }\n\nfieldset {\n  min-width: 0;\n  padding: 0;\n  margin: 0;\n  border: 0; }\n\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: .5rem;\n  font-size: 1.5rem;\n  line-height: inherit; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: none; }\n\noutput {\n  display: inline-block; }\n\n[hidden] {\n  display: none !important; }\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  margin-bottom: 0.5rem;\n  font-family: inherit;\n  font-weight: 500;\n  line-height: 1.1;\n  color: inherit; }\n\nh1, .h1 {\n  font-size: 2.5rem; }\n\nh2, .h2 {\n  font-size: 2rem; }\n\nh3, .h3 {\n  font-size: 1.75rem; }\n\nh4, .h4 {\n  font-size: 1.5rem; }\n\nh5, .h5 {\n  font-size: 1.25rem; }\n\nh6, .h6 {\n  font-size: 1rem; }\n\n.lead {\n  font-size: 1.25rem;\n  font-weight: 300; }\n\n.display-1 {\n  font-size: 6rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\n.display-2 {\n  font-size: 5.5rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\n.display-3 {\n  font-size: 4.5rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\n.display-4 {\n  font-size: 3.5rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\nhr {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border: 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1); }\n\nsmall,\n.small {\n  font-size: 80%;\n  font-weight: normal; }\n\nmark,\n.mark {\n  padding: 0.2em;\n  background-color: #fcf8e3; }\n\n.list-unstyled {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline-item {\n  display: inline-block; }\n  .list-inline-item:not(:last-child) {\n    margin-right: 5px; }\n\n.initialism {\n  font-size: 90%;\n  text-transform: uppercase; }\n\n.blockquote {\n  padding: 0.5rem 1rem;\n  margin-bottom: 1rem;\n  font-size: 1.25rem;\n  border-left: 0.25rem solid #eceeef; }\n\n.blockquote-footer {\n  display: block;\n  font-size: 80%;\n  color: #636c72; }\n  .blockquote-footer::before {\n    content: \"\\2014 \\00A0\"; }\n\n.blockquote-reverse {\n  padding-right: 1rem;\n  padding-left: 0;\n  text-align: right;\n  border-right: 0.25rem solid #eceeef;\n  border-left: 0; }\n\n.blockquote-reverse .blockquote-footer::before {\n  content: \"\"; }\n\n.blockquote-reverse .blockquote-footer::after {\n  content: \"\\00A0 \\2014\"; }\n\n.img-fluid {\n  max-width: 100%;\n  height: auto; }\n\n.img-thumbnail {\n  padding: 0.25rem;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 0.25rem;\n  transition: all 0.2s ease-in-out;\n  max-width: 100%;\n  height: auto; }\n\n.figure {\n  display: inline-block; }\n\n.figure-img {\n  margin-bottom: 0.5rem;\n  line-height: 1; }\n\n.figure-caption {\n  font-size: 90%;\n  color: #636c72; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; }\n\ncode {\n  padding: 0.2rem 0.4rem;\n  font-size: 90%;\n  color: #bd4147;\n  background-color: #f7f7f9;\n  border-radius: 0.25rem; }\n  a > code {\n    padding: 0;\n    color: inherit;\n    background-color: inherit; }\n\nkbd {\n  padding: 0.2rem 0.4rem;\n  font-size: 90%;\n  color: #fff;\n  background-color: #292b2c;\n  border-radius: 0.2rem; }\n  kbd kbd {\n    padding: 0;\n    font-size: 100%;\n    font-weight: bold; }\n\npre {\n  display: block;\n  margin-top: 0;\n  margin-bottom: 1rem;\n  font-size: 90%;\n  color: #292b2c; }\n  pre code {\n    padding: 0;\n    font-size: inherit;\n    color: inherit;\n    background-color: transparent;\n    border-radius: 0; }\n\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll; }\n\n.container {\n  position: relative;\n  margin-left: auto;\n  margin-right: auto;\n  padding-right: 15px;\n  padding-left: 15px; }\n  @media (min-width: 576px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 768px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 992px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 1200px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 576px) {\n    .container {\n      width: 540px;\n      max-width: 100%; } }\n  @media (min-width: 768px) {\n    .container {\n      width: 720px;\n      max-width: 100%; } }\n  @media (min-width: 992px) {\n    .container {\n      width: 960px;\n      max-width: 100%; } }\n  @media (min-width: 1200px) {\n    .container {\n      width: 1140px;\n      max-width: 100%; } }\n\n.container-fluid {\n  position: relative;\n  margin-left: auto;\n  margin-right: auto;\n  padding-right: 15px;\n  padding-left: 15px; }\n  @media (min-width: 576px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 768px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 992px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 1200px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n\n.row {\n  display: flex;\n  flex-wrap: wrap;\n  margin-right: -15px;\n  margin-left: -15px; }\n  @media (min-width: 576px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 768px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 992px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 1200px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n\n.no-gutters {\n  margin-right: 0;\n  margin-left: 0; }\n  .no-gutters > .col,\n  .no-gutters > [class*=\"col-\"] {\n    padding-right: 0;\n    padding-left: 0; }\n\n.col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n  position: relative;\n  width: 100%;\n  min-height: 1px;\n  padding-right: 15px;\n  padding-left: 15px; }\n  @media (min-width: 576px) {\n    .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 768px) {\n    .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 992px) {\n    .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 1200px) {\n    .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n\n.col {\n  flex-basis: 0;\n  flex-grow: 1;\n  max-width: 100%; }\n\n.col-auto {\n  flex: 0 0 auto;\n  width: auto; }\n\n.col-1 {\n  flex: 0 0 8.33333%;\n  max-width: 8.33333%; }\n\n.col-2 {\n  flex: 0 0 16.66667%;\n  max-width: 16.66667%; }\n\n.col-3 {\n  flex: 0 0 25%;\n  max-width: 25%; }\n\n.col-4 {\n  flex: 0 0 33.33333%;\n  max-width: 33.33333%; }\n\n.col-5 {\n  flex: 0 0 41.66667%;\n  max-width: 41.66667%; }\n\n.col-6 {\n  flex: 0 0 50%;\n  max-width: 50%; }\n\n.col-7 {\n  flex: 0 0 58.33333%;\n  max-width: 58.33333%; }\n\n.col-8 {\n  flex: 0 0 66.66667%;\n  max-width: 66.66667%; }\n\n.col-9 {\n  flex: 0 0 75%;\n  max-width: 75%; }\n\n.col-10 {\n  flex: 0 0 83.33333%;\n  max-width: 83.33333%; }\n\n.col-11 {\n  flex: 0 0 91.66667%;\n  max-width: 91.66667%; }\n\n.col-12 {\n  flex: 0 0 100%;\n  max-width: 100%; }\n\n.pull-0 {\n  right: auto; }\n\n.pull-1 {\n  right: 8.33333%; }\n\n.pull-2 {\n  right: 16.66667%; }\n\n.pull-3 {\n  right: 25%; }\n\n.pull-4 {\n  right: 33.33333%; }\n\n.pull-5 {\n  right: 41.66667%; }\n\n.pull-6 {\n  right: 50%; }\n\n.pull-7 {\n  right: 58.33333%; }\n\n.pull-8 {\n  right: 66.66667%; }\n\n.pull-9 {\n  right: 75%; }\n\n.pull-10 {\n  right: 83.33333%; }\n\n.pull-11 {\n  right: 91.66667%; }\n\n.pull-12 {\n  right: 100%; }\n\n.push-0 {\n  left: auto; }\n\n.push-1 {\n  left: 8.33333%; }\n\n.push-2 {\n  left: 16.66667%; }\n\n.push-3 {\n  left: 25%; }\n\n.push-4 {\n  left: 33.33333%; }\n\n.push-5 {\n  left: 41.66667%; }\n\n.push-6 {\n  left: 50%; }\n\n.push-7 {\n  left: 58.33333%; }\n\n.push-8 {\n  left: 66.66667%; }\n\n.push-9 {\n  left: 75%; }\n\n.push-10 {\n  left: 83.33333%; }\n\n.push-11 {\n  left: 91.66667%; }\n\n.push-12 {\n  left: 100%; }\n\n.offset-1 {\n  margin-left: 8.33333%; }\n\n.offset-2 {\n  margin-left: 16.66667%; }\n\n.offset-3 {\n  margin-left: 25%; }\n\n.offset-4 {\n  margin-left: 33.33333%; }\n\n.offset-5 {\n  margin-left: 41.66667%; }\n\n.offset-6 {\n  margin-left: 50%; }\n\n.offset-7 {\n  margin-left: 58.33333%; }\n\n.offset-8 {\n  margin-left: 66.66667%; }\n\n.offset-9 {\n  margin-left: 75%; }\n\n.offset-10 {\n  margin-left: 83.33333%; }\n\n.offset-11 {\n  margin-left: 91.66667%; }\n\n@media (min-width: 576px) {\n  .col-sm {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .col-sm-auto {\n    flex: 0 0 auto;\n    width: auto; }\n  .col-sm-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-sm-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-sm-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .col-sm-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-sm-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-sm-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .col-sm-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-sm-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-sm-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .col-sm-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-sm-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-sm-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-sm-0 {\n    right: auto; }\n  .pull-sm-1 {\n    right: 8.33333%; }\n  .pull-sm-2 {\n    right: 16.66667%; }\n  .pull-sm-3 {\n    right: 25%; }\n  .pull-sm-4 {\n    right: 33.33333%; }\n  .pull-sm-5 {\n    right: 41.66667%; }\n  .pull-sm-6 {\n    right: 50%; }\n  .pull-sm-7 {\n    right: 58.33333%; }\n  .pull-sm-8 {\n    right: 66.66667%; }\n  .pull-sm-9 {\n    right: 75%; }\n  .pull-sm-10 {\n    right: 83.33333%; }\n  .pull-sm-11 {\n    right: 91.66667%; }\n  .pull-sm-12 {\n    right: 100%; }\n  .push-sm-0 {\n    left: auto; }\n  .push-sm-1 {\n    left: 8.33333%; }\n  .push-sm-2 {\n    left: 16.66667%; }\n  .push-sm-3 {\n    left: 25%; }\n  .push-sm-4 {\n    left: 33.33333%; }\n  .push-sm-5 {\n    left: 41.66667%; }\n  .push-sm-6 {\n    left: 50%; }\n  .push-sm-7 {\n    left: 58.33333%; }\n  .push-sm-8 {\n    left: 66.66667%; }\n  .push-sm-9 {\n    left: 75%; }\n  .push-sm-10 {\n    left: 83.33333%; }\n  .push-sm-11 {\n    left: 91.66667%; }\n  .push-sm-12 {\n    left: 100%; }\n  .offset-sm-0 {\n    margin-left: 0%; }\n  .offset-sm-1 {\n    margin-left: 8.33333%; }\n  .offset-sm-2 {\n    margin-left: 16.66667%; }\n  .offset-sm-3 {\n    margin-left: 25%; }\n  .offset-sm-4 {\n    margin-left: 33.33333%; }\n  .offset-sm-5 {\n    margin-left: 41.66667%; }\n  .offset-sm-6 {\n    margin-left: 50%; }\n  .offset-sm-7 {\n    margin-left: 58.33333%; }\n  .offset-sm-8 {\n    margin-left: 66.66667%; }\n  .offset-sm-9 {\n    margin-left: 75%; }\n  .offset-sm-10 {\n    margin-left: 83.33333%; }\n  .offset-sm-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 768px) {\n  .col-md {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .col-md-auto {\n    flex: 0 0 auto;\n    width: auto; }\n  .col-md-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-md-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-md-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .col-md-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-md-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-md-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .col-md-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-md-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-md-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .col-md-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-md-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-md-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-md-0 {\n    right: auto; }\n  .pull-md-1 {\n    right: 8.33333%; }\n  .pull-md-2 {\n    right: 16.66667%; }\n  .pull-md-3 {\n    right: 25%; }\n  .pull-md-4 {\n    right: 33.33333%; }\n  .pull-md-5 {\n    right: 41.66667%; }\n  .pull-md-6 {\n    right: 50%; }\n  .pull-md-7 {\n    right: 58.33333%; }\n  .pull-md-8 {\n    right: 66.66667%; }\n  .pull-md-9 {\n    right: 75%; }\n  .pull-md-10 {\n    right: 83.33333%; }\n  .pull-md-11 {\n    right: 91.66667%; }\n  .pull-md-12 {\n    right: 100%; }\n  .push-md-0 {\n    left: auto; }\n  .push-md-1 {\n    left: 8.33333%; }\n  .push-md-2 {\n    left: 16.66667%; }\n  .push-md-3 {\n    left: 25%; }\n  .push-md-4 {\n    left: 33.33333%; }\n  .push-md-5 {\n    left: 41.66667%; }\n  .push-md-6 {\n    left: 50%; }\n  .push-md-7 {\n    left: 58.33333%; }\n  .push-md-8 {\n    left: 66.66667%; }\n  .push-md-9 {\n    left: 75%; }\n  .push-md-10 {\n    left: 83.33333%; }\n  .push-md-11 {\n    left: 91.66667%; }\n  .push-md-12 {\n    left: 100%; }\n  .offset-md-0 {\n    margin-left: 0%; }\n  .offset-md-1 {\n    margin-left: 8.33333%; }\n  .offset-md-2 {\n    margin-left: 16.66667%; }\n  .offset-md-3 {\n    margin-left: 25%; }\n  .offset-md-4 {\n    margin-left: 33.33333%; }\n  .offset-md-5 {\n    margin-left: 41.66667%; }\n  .offset-md-6 {\n    margin-left: 50%; }\n  .offset-md-7 {\n    margin-left: 58.33333%; }\n  .offset-md-8 {\n    margin-left: 66.66667%; }\n  .offset-md-9 {\n    margin-left: 75%; }\n  .offset-md-10 {\n    margin-left: 83.33333%; }\n  .offset-md-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 992px) {\n  .col-lg {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .col-lg-auto {\n    flex: 0 0 auto;\n    width: auto; }\n  .col-lg-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-lg-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-lg-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .col-lg-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-lg-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-lg-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .col-lg-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-lg-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-lg-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .col-lg-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-lg-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-lg-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-lg-0 {\n    right: auto; }\n  .pull-lg-1 {\n    right: 8.33333%; }\n  .pull-lg-2 {\n    right: 16.66667%; }\n  .pull-lg-3 {\n    right: 25%; }\n  .pull-lg-4 {\n    right: 33.33333%; }\n  .pull-lg-5 {\n    right: 41.66667%; }\n  .pull-lg-6 {\n    right: 50%; }\n  .pull-lg-7 {\n    right: 58.33333%; }\n  .pull-lg-8 {\n    right: 66.66667%; }\n  .pull-lg-9 {\n    right: 75%; }\n  .pull-lg-10 {\n    right: 83.33333%; }\n  .pull-lg-11 {\n    right: 91.66667%; }\n  .pull-lg-12 {\n    right: 100%; }\n  .push-lg-0 {\n    left: auto; }\n  .push-lg-1 {\n    left: 8.33333%; }\n  .push-lg-2 {\n    left: 16.66667%; }\n  .push-lg-3 {\n    left: 25%; }\n  .push-lg-4 {\n    left: 33.33333%; }\n  .push-lg-5 {\n    left: 41.66667%; }\n  .push-lg-6 {\n    left: 50%; }\n  .push-lg-7 {\n    left: 58.33333%; }\n  .push-lg-8 {\n    left: 66.66667%; }\n  .push-lg-9 {\n    left: 75%; }\n  .push-lg-10 {\n    left: 83.33333%; }\n  .push-lg-11 {\n    left: 91.66667%; }\n  .push-lg-12 {\n    left: 100%; }\n  .offset-lg-0 {\n    margin-left: 0%; }\n  .offset-lg-1 {\n    margin-left: 8.33333%; }\n  .offset-lg-2 {\n    margin-left: 16.66667%; }\n  .offset-lg-3 {\n    margin-left: 25%; }\n  .offset-lg-4 {\n    margin-left: 33.33333%; }\n  .offset-lg-5 {\n    margin-left: 41.66667%; }\n  .offset-lg-6 {\n    margin-left: 50%; }\n  .offset-lg-7 {\n    margin-left: 58.33333%; }\n  .offset-lg-8 {\n    margin-left: 66.66667%; }\n  .offset-lg-9 {\n    margin-left: 75%; }\n  .offset-lg-10 {\n    margin-left: 83.33333%; }\n  .offset-lg-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 1200px) {\n  .col-xl {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .col-xl-auto {\n    flex: 0 0 auto;\n    width: auto; }\n  .col-xl-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-xl-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-xl-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .col-xl-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-xl-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-xl-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .col-xl-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-xl-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-xl-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .col-xl-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-xl-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-xl-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-xl-0 {\n    right: auto; }\n  .pull-xl-1 {\n    right: 8.33333%; }\n  .pull-xl-2 {\n    right: 16.66667%; }\n  .pull-xl-3 {\n    right: 25%; }\n  .pull-xl-4 {\n    right: 33.33333%; }\n  .pull-xl-5 {\n    right: 41.66667%; }\n  .pull-xl-6 {\n    right: 50%; }\n  .pull-xl-7 {\n    right: 58.33333%; }\n  .pull-xl-8 {\n    right: 66.66667%; }\n  .pull-xl-9 {\n    right: 75%; }\n  .pull-xl-10 {\n    right: 83.33333%; }\n  .pull-xl-11 {\n    right: 91.66667%; }\n  .pull-xl-12 {\n    right: 100%; }\n  .push-xl-0 {\n    left: auto; }\n  .push-xl-1 {\n    left: 8.33333%; }\n  .push-xl-2 {\n    left: 16.66667%; }\n  .push-xl-3 {\n    left: 25%; }\n  .push-xl-4 {\n    left: 33.33333%; }\n  .push-xl-5 {\n    left: 41.66667%; }\n  .push-xl-6 {\n    left: 50%; }\n  .push-xl-7 {\n    left: 58.33333%; }\n  .push-xl-8 {\n    left: 66.66667%; }\n  .push-xl-9 {\n    left: 75%; }\n  .push-xl-10 {\n    left: 83.33333%; }\n  .push-xl-11 {\n    left: 91.66667%; }\n  .push-xl-12 {\n    left: 100%; }\n  .offset-xl-0 {\n    margin-left: 0%; }\n  .offset-xl-1 {\n    margin-left: 8.33333%; }\n  .offset-xl-2 {\n    margin-left: 16.66667%; }\n  .offset-xl-3 {\n    margin-left: 25%; }\n  .offset-xl-4 {\n    margin-left: 33.33333%; }\n  .offset-xl-5 {\n    margin-left: 41.66667%; }\n  .offset-xl-6 {\n    margin-left: 50%; }\n  .offset-xl-7 {\n    margin-left: 58.33333%; }\n  .offset-xl-8 {\n    margin-left: 66.66667%; }\n  .offset-xl-9 {\n    margin-left: 75%; }\n  .offset-xl-10 {\n    margin-left: 83.33333%; }\n  .offset-xl-11 {\n    margin-left: 91.66667%; } }\n\n.table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 1rem; }\n  .table th,\n  .table td {\n    padding: 0.75rem;\n    vertical-align: top;\n    border-top: 1px solid #eceeef; }\n  .table thead th {\n    vertical-align: bottom;\n    border-bottom: 2px solid #eceeef; }\n  .table tbody + tbody {\n    border-top: 2px solid #eceeef; }\n  .table .table {\n    background-color: #fff; }\n\n.table-sm th,\n.table-sm td {\n  padding: 0.3rem; }\n\n.table-bordered {\n  border: 1px solid #eceeef; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #eceeef; }\n  .table-bordered thead th,\n  .table-bordered thead td {\n    border-bottom-width: 2px; }\n\n.table-striped tbody tr:nth-of-type(odd) {\n  background-color: rgba(0, 0, 0, 0.05); }\n\n.table-hover tbody tr:hover {\n  background-color: rgba(0, 0, 0, 0.075); }\n\n.table-active,\n.table-active > th,\n.table-active > td {\n  background-color: rgba(0, 0, 0, 0.075); }\n\n.table-hover .table-active:hover {\n  background-color: rgba(0, 0, 0, 0.075); }\n  .table-hover .table-active:hover > td,\n  .table-hover .table-active:hover > th {\n    background-color: rgba(0, 0, 0, 0.075); }\n\n.table-success,\n.table-success > th,\n.table-success > td {\n  background-color: #dff0d8; }\n\n.table-hover .table-success:hover {\n  background-color: #d0e9c6; }\n  .table-hover .table-success:hover > td,\n  .table-hover .table-success:hover > th {\n    background-color: #d0e9c6; }\n\n.table-info,\n.table-info > th,\n.table-info > td {\n  background-color: #d9edf7; }\n\n.table-hover .table-info:hover {\n  background-color: #c4e3f3; }\n  .table-hover .table-info:hover > td,\n  .table-hover .table-info:hover > th {\n    background-color: #c4e3f3; }\n\n.table-warning,\n.table-warning > th,\n.table-warning > td {\n  background-color: #fcf8e3; }\n\n.table-hover .table-warning:hover {\n  background-color: #faf2cc; }\n  .table-hover .table-warning:hover > td,\n  .table-hover .table-warning:hover > th {\n    background-color: #faf2cc; }\n\n.table-danger,\n.table-danger > th,\n.table-danger > td {\n  background-color: #f2dede; }\n\n.table-hover .table-danger:hover {\n  background-color: #ebcccc; }\n  .table-hover .table-danger:hover > td,\n  .table-hover .table-danger:hover > th {\n    background-color: #ebcccc; }\n\n.thead-inverse th {\n  color: #fff;\n  background-color: #292b2c; }\n\n.thead-default th {\n  color: #464a4c;\n  background-color: #eceeef; }\n\n.table-inverse {\n  color: #fff;\n  background-color: #292b2c; }\n  .table-inverse th,\n  .table-inverse td,\n  .table-inverse thead th {\n    border-color: #fff; }\n  .table-inverse.table-bordered {\n    border: 0; }\n\n.table-responsive {\n  display: block;\n  width: 100%;\n  overflow-x: auto;\n  -ms-overflow-style: -ms-autohiding-scrollbar; }\n  .table-responsive.table-bordered {\n    border: 0; }\n\n.form-control {\n  display: block;\n  width: 100%;\n  padding: 0.5rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.25;\n  color: #464a4c;\n  background-color: #fff;\n  background-image: none;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s; }\n  .form-control::-ms-expand {\n    background-color: transparent;\n    border: 0; }\n  .form-control:focus {\n    color: #464a4c;\n    background-color: #fff;\n    border-color: #5cb3fd;\n    outline: none; }\n  .form-control::placeholder {\n    color: #636c72;\n    opacity: 1; }\n  .form-control:disabled, .form-control[readonly] {\n    background-color: #eceeef;\n    opacity: 1; }\n  .form-control:disabled {\n    cursor: not-allowed; }\n\nselect.form-control:not([size]):not([multiple]) {\n  height: calc(2.25rem + 2px); }\n\nselect.form-control:focus::-ms-value {\n  color: #464a4c;\n  background-color: #fff; }\n\n.form-control-file,\n.form-control-range {\n  display: block; }\n\n.col-form-label {\n  padding-top: calc(0.5rem - 1px * 2);\n  padding-bottom: calc(0.5rem - 1px * 2);\n  margin-bottom: 0; }\n\n.col-form-label-lg {\n  padding-top: calc(0.75rem - 1px * 2);\n  padding-bottom: calc(0.75rem - 1px * 2);\n  font-size: 1.25rem; }\n\n.col-form-label-sm {\n  padding-top: calc(0.25rem - 1px * 2);\n  padding-bottom: calc(0.25rem - 1px * 2);\n  font-size: 0.875rem; }\n\n.col-form-legend {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  margin-bottom: 0;\n  font-size: 1rem; }\n\n.form-control-static {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  margin-bottom: 0;\n  line-height: 1.25;\n  border: solid transparent;\n  border-width: 1px 0; }\n  .form-control-static.form-control-sm, .input-group-sm > .form-control-static.form-control,\n  .input-group-sm > .form-control-static.input-group-addon,\n  .input-group-sm > .input-group-btn > .form-control-static.btn, .form-control-static.form-control-lg, .input-group-lg > .form-control-static.form-control,\n  .input-group-lg > .form-control-static.input-group-addon,\n  .input-group-lg > .input-group-btn > .form-control-static.btn {\n    padding-right: 0;\n    padding-left: 0; }\n\n.form-control-sm, .input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem; }\n\nselect.form-control-sm:not([size]):not([multiple]), .input-group-sm > select.form-control:not([size]):not([multiple]),\n.input-group-sm > select.input-group-addon:not([size]):not([multiple]),\n.input-group-sm > .input-group-btn > select.btn:not([size]):not([multiple]) {\n  height: 1.8125rem; }\n\n.form-control-lg, .input-group-lg > .form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem; }\n\nselect.form-control-lg:not([size]):not([multiple]), .input-group-lg > select.form-control:not([size]):not([multiple]),\n.input-group-lg > select.input-group-addon:not([size]):not([multiple]),\n.input-group-lg > .input-group-btn > select.btn:not([size]):not([multiple]) {\n  height: 3.16667rem; }\n\n.form-group {\n  margin-bottom: 1rem; }\n\n.form-text {\n  display: block;\n  margin-top: 0.25rem; }\n\n.form-check {\n  position: relative;\n  display: block;\n  margin-bottom: 0.5rem; }\n  .form-check.disabled .form-check-label {\n    color: #636c72;\n    cursor: not-allowed; }\n\n.form-check-label {\n  padding-left: 1.25rem;\n  margin-bottom: 0;\n  cursor: pointer; }\n\n.form-check-input {\n  position: absolute;\n  margin-top: 0.25rem;\n  margin-left: -1.25rem; }\n  .form-check-input:only-child {\n    position: static; }\n\n.form-check-inline {\n  display: inline-block; }\n  .form-check-inline .form-check-label {\n    vertical-align: middle; }\n  .form-check-inline + .form-check-inline {\n    margin-left: 0.75rem; }\n\n.form-control-feedback {\n  margin-top: 0.25rem; }\n\n.form-control-success,\n.form-control-warning,\n.form-control-danger {\n  padding-right: 2.25rem;\n  background-repeat: no-repeat;\n  background-position: center right 0.5625rem;\n  background-size: 1.125rem 1.125rem; }\n\n.has-success .form-control-feedback,\n.has-success .form-control-label,\n.has-success .col-form-label,\n.has-success .form-check-label,\n.has-success .custom-control {\n  color: #5cb85c; }\n\n.has-success .form-control {\n  border-color: #5cb85c; }\n\n.has-success .input-group-addon {\n  color: #5cb85c;\n  border-color: #5cb85c;\n  background-color: #eaf6ea; }\n\n.has-success .form-control-success {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%235cb85c' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\"); }\n\n.has-warning .form-control-feedback,\n.has-warning .form-control-label,\n.has-warning .col-form-label,\n.has-warning .form-check-label,\n.has-warning .custom-control {\n  color: #f0ad4e; }\n\n.has-warning .form-control {\n  border-color: #f0ad4e; }\n\n.has-warning .input-group-addon {\n  color: #f0ad4e;\n  border-color: #f0ad4e;\n  background-color: white; }\n\n.has-warning .form-control-warning {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23f0ad4e' d='M4.4 5.324h-.8v-2.46h.8zm0 1.42h-.8V5.89h.8zM3.76.63L.04 7.075c-.115.2.016.425.26.426h7.397c.242 0 .372-.226.258-.426C6.726 4.924 5.47 2.79 4.253.63c-.113-.174-.39-.174-.494 0z'/%3E%3C/svg%3E\"); }\n\n.has-danger .form-control-feedback,\n.has-danger .form-control-label,\n.has-danger .col-form-label,\n.has-danger .form-check-label,\n.has-danger .custom-control {\n  color: #d9534f; }\n\n.has-danger .form-control {\n  border-color: #d9534f; }\n\n.has-danger .input-group-addon {\n  color: #d9534f;\n  border-color: #d9534f;\n  background-color: #fdf7f7; }\n\n.has-danger .form-control-danger {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23d9534f' viewBox='-2 -2 7 7'%3E%3Cpath stroke='%23d9534f' d='M0 0l3 3m0-3L0 3'/%3E%3Ccircle r='.5'/%3E%3Ccircle cx='3' r='.5'/%3E%3Ccircle cy='3' r='.5'/%3E%3Ccircle cx='3' cy='3' r='.5'/%3E%3C/svg%3E\"); }\n\n.form-inline {\n  display: flex;\n  flex-flow: row wrap;\n  align-items: center; }\n  .form-inline .form-check {\n    width: 100%; }\n  @media (min-width: 576px) {\n    .form-inline label {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      margin-bottom: 0; }\n    .form-inline .form-group {\n      display: flex;\n      flex: 0 0 auto;\n      flex-flow: row wrap;\n      align-items: center;\n      margin-bottom: 0; }\n    .form-inline .form-control {\n      display: inline-block;\n      width: auto;\n      vertical-align: middle; }\n    .form-inline .form-control-static {\n      display: inline-block; }\n    .form-inline .input-group {\n      width: auto; }\n    .form-inline .form-control-label {\n      margin-bottom: 0;\n      vertical-align: middle; }\n    .form-inline .form-check {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: auto;\n      margin-top: 0;\n      margin-bottom: 0; }\n    .form-inline .form-check-label {\n      padding-left: 0; }\n    .form-inline .form-check-input {\n      position: relative;\n      margin-top: 0;\n      margin-right: 0.25rem;\n      margin-left: 0; }\n    .form-inline .custom-control {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      padding-left: 0; }\n    .form-inline .custom-control-indicator {\n      position: static;\n      display: inline-block;\n      margin-right: 0.25rem;\n      vertical-align: text-bottom; }\n    .form-inline .has-feedback .form-control-feedback {\n      top: 0; } }\n\n.btn {\n  display: inline-block;\n  font-weight: normal;\n  line-height: 1.25;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  user-select: none;\n  border: 1px solid transparent;\n  padding: 0.5rem 1rem;\n  font-size: 1rem;\n  border-radius: 0.25rem;\n  transition: all 0.2s ease-in-out; }\n  .btn:focus, .btn:hover {\n    text-decoration: none; }\n  .btn:focus, .btn.focus {\n    outline: 0;\n    box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.25); }\n  .btn.disabled, .btn:disabled {\n    cursor: not-allowed;\n    opacity: .65; }\n  .btn:active, .btn.active {\n    background-image: none; }\n\na.btn.disabled,\nfieldset[disabled] a.btn {\n  pointer-events: none; }\n\n.btn-primary {\n  color: #fff;\n  background-color: #0275d8;\n  border-color: #0275d8; }\n  .btn-primary:hover {\n    color: #fff;\n    background-color: #025aa5;\n    border-color: #01549b; }\n  .btn-primary:focus, .btn-primary.focus {\n    box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5); }\n  .btn-primary.disabled, .btn-primary:disabled {\n    background-color: #0275d8;\n    border-color: #0275d8; }\n  .btn-primary:active, .btn-primary.active,\n  .show > .btn-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #025aa5;\n    background-image: none;\n    border-color: #01549b; }\n\n.btn-secondary {\n  color: #292b2c;\n  background-color: #fff;\n  border-color: #ccc; }\n  .btn-secondary:hover {\n    color: #292b2c;\n    background-color: #e6e6e6;\n    border-color: #adadad; }\n  .btn-secondary:focus, .btn-secondary.focus {\n    box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5); }\n  .btn-secondary.disabled, .btn-secondary:disabled {\n    background-color: #fff;\n    border-color: #ccc; }\n  .btn-secondary:active, .btn-secondary.active,\n  .show > .btn-secondary.dropdown-toggle {\n    color: #292b2c;\n    background-color: #e6e6e6;\n    background-image: none;\n    border-color: #adadad; }\n\n.btn-info {\n  color: #fff;\n  background-color: #5bc0de;\n  border-color: #5bc0de; }\n  .btn-info:hover {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #2aabd2; }\n  .btn-info:focus, .btn-info.focus {\n    box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5); }\n  .btn-info.disabled, .btn-info:disabled {\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n  .btn-info:active, .btn-info.active,\n  .show > .btn-info.dropdown-toggle {\n    color: #fff;\n    background-color: #31b0d5;\n    background-image: none;\n    border-color: #2aabd2; }\n\n.btn-success {\n  color: #fff;\n  background-color: #5cb85c;\n  border-color: #5cb85c; }\n  .btn-success:hover {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #419641; }\n  .btn-success:focus, .btn-success.focus {\n    box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5); }\n  .btn-success.disabled, .btn-success:disabled {\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n  .btn-success:active, .btn-success.active,\n  .show > .btn-success.dropdown-toggle {\n    color: #fff;\n    background-color: #449d44;\n    background-image: none;\n    border-color: #419641; }\n\n.btn-warning {\n  color: #fff;\n  background-color: #f0ad4e;\n  border-color: #f0ad4e; }\n  .btn-warning:hover {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #eb9316; }\n  .btn-warning:focus, .btn-warning.focus {\n    box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5); }\n  .btn-warning.disabled, .btn-warning:disabled {\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n  .btn-warning:active, .btn-warning.active,\n  .show > .btn-warning.dropdown-toggle {\n    color: #fff;\n    background-color: #ec971f;\n    background-image: none;\n    border-color: #eb9316; }\n\n.btn-danger {\n  color: #fff;\n  background-color: #d9534f;\n  border-color: #d9534f; }\n  .btn-danger:hover {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #c12e2a; }\n  .btn-danger:focus, .btn-danger.focus {\n    box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5); }\n  .btn-danger.disabled, .btn-danger:disabled {\n    background-color: #d9534f;\n    border-color: #d9534f; }\n  .btn-danger:active, .btn-danger.active,\n  .show > .btn-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #c9302c;\n    background-image: none;\n    border-color: #c12e2a; }\n\n.btn-outline-primary {\n  color: #0275d8;\n  background-image: none;\n  background-color: transparent;\n  border-color: #0275d8; }\n  .btn-outline-primary:hover {\n    color: #fff;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n  .btn-outline-primary:focus, .btn-outline-primary.focus {\n    box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5); }\n  .btn-outline-primary.disabled, .btn-outline-primary:disabled {\n    color: #0275d8;\n    background-color: transparent; }\n  .btn-outline-primary:active, .btn-outline-primary.active,\n  .show > .btn-outline-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n\n.btn-outline-secondary {\n  color: #ccc;\n  background-image: none;\n  background-color: transparent;\n  border-color: #ccc; }\n  .btn-outline-secondary:hover {\n    color: #fff;\n    background-color: #ccc;\n    border-color: #ccc; }\n  .btn-outline-secondary:focus, .btn-outline-secondary.focus {\n    box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5); }\n  .btn-outline-secondary.disabled, .btn-outline-secondary:disabled {\n    color: #ccc;\n    background-color: transparent; }\n  .btn-outline-secondary:active, .btn-outline-secondary.active,\n  .show > .btn-outline-secondary.dropdown-toggle {\n    color: #fff;\n    background-color: #ccc;\n    border-color: #ccc; }\n\n.btn-outline-info {\n  color: #5bc0de;\n  background-image: none;\n  background-color: transparent;\n  border-color: #5bc0de; }\n  .btn-outline-info:hover {\n    color: #fff;\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n  .btn-outline-info:focus, .btn-outline-info.focus {\n    box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5); }\n  .btn-outline-info.disabled, .btn-outline-info:disabled {\n    color: #5bc0de;\n    background-color: transparent; }\n  .btn-outline-info:active, .btn-outline-info.active,\n  .show > .btn-outline-info.dropdown-toggle {\n    color: #fff;\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n\n.btn-outline-success {\n  color: #5cb85c;\n  background-image: none;\n  background-color: transparent;\n  border-color: #5cb85c; }\n  .btn-outline-success:hover {\n    color: #fff;\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n  .btn-outline-success:focus, .btn-outline-success.focus {\n    box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5); }\n  .btn-outline-success.disabled, .btn-outline-success:disabled {\n    color: #5cb85c;\n    background-color: transparent; }\n  .btn-outline-success:active, .btn-outline-success.active,\n  .show > .btn-outline-success.dropdown-toggle {\n    color: #fff;\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n\n.btn-outline-warning {\n  color: #f0ad4e;\n  background-image: none;\n  background-color: transparent;\n  border-color: #f0ad4e; }\n  .btn-outline-warning:hover {\n    color: #fff;\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n  .btn-outline-warning:focus, .btn-outline-warning.focus {\n    box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5); }\n  .btn-outline-warning.disabled, .btn-outline-warning:disabled {\n    color: #f0ad4e;\n    background-color: transparent; }\n  .btn-outline-warning:active, .btn-outline-warning.active,\n  .show > .btn-outline-warning.dropdown-toggle {\n    color: #fff;\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n\n.btn-outline-danger {\n  color: #d9534f;\n  background-image: none;\n  background-color: transparent;\n  border-color: #d9534f; }\n  .btn-outline-danger:hover {\n    color: #fff;\n    background-color: #d9534f;\n    border-color: #d9534f; }\n  .btn-outline-danger:focus, .btn-outline-danger.focus {\n    box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5); }\n  .btn-outline-danger.disabled, .btn-outline-danger:disabled {\n    color: #d9534f;\n    background-color: transparent; }\n  .btn-outline-danger:active, .btn-outline-danger.active,\n  .show > .btn-outline-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #d9534f;\n    border-color: #d9534f; }\n\n.btn-link {\n  font-weight: normal;\n  color: #0275d8;\n  border-radius: 0; }\n  .btn-link, .btn-link:active, .btn-link.active, .btn-link:disabled {\n    background-color: transparent; }\n  .btn-link, .btn-link:focus, .btn-link:active {\n    border-color: transparent; }\n  .btn-link:hover {\n    border-color: transparent; }\n  .btn-link:focus, .btn-link:hover {\n    color: #014c8c;\n    text-decoration: underline;\n    background-color: transparent; }\n  .btn-link:disabled {\n    color: #636c72; }\n    .btn-link:disabled:focus, .btn-link:disabled:hover {\n      text-decoration: none; }\n\n.btn-lg, .btn-group-lg > .btn {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem; }\n\n.btn-sm, .btn-group-sm > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem; }\n\n.btn-block {\n  display: block;\n  width: 100%; }\n\n.btn-block + .btn-block {\n  margin-top: 0.5rem; }\n\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%; }\n\n.fade {\n  opacity: 0;\n  transition: opacity 0.15s linear; }\n  .fade.show {\n    opacity: 1; }\n\n.collapse {\n  display: none; }\n  .collapse.show {\n    display: block; }\n\ntr.collapse.show {\n  display: table-row; }\n\ntbody.collapse.show {\n  display: table-row-group; }\n\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  transition: height 0.35s ease; }\n\n.dropup,\n.dropdown {\n  position: relative; }\n\n.dropdown-toggle::after {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 0.3em;\n  vertical-align: middle;\n  content: \"\";\n  border-top: 0.3em solid;\n  border-right: 0.3em solid transparent;\n  border-left: 0.3em solid transparent; }\n\n.dropdown-toggle:focus {\n  outline: 0; }\n\n.dropup .dropdown-toggle::after {\n  border-top: 0;\n  border-bottom: 0.3em solid; }\n\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 10rem;\n  padding: 0.5rem 0;\n  margin: 0.125rem 0 0;\n  font-size: 1rem;\n  color: #292b2c;\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n\n.dropdown-divider {\n  height: 1px;\n  margin: 0.5rem 0;\n  overflow: hidden;\n  background-color: #eceeef; }\n\n.dropdown-item {\n  display: block;\n  width: 100%;\n  padding: 3px 1.5rem;\n  clear: both;\n  font-weight: normal;\n  color: #292b2c;\n  text-align: inherit;\n  white-space: nowrap;\n  background: none;\n  border: 0; }\n  .dropdown-item:focus, .dropdown-item:hover {\n    color: #1d1e1f;\n    text-decoration: none;\n    background-color: #f7f7f9; }\n  .dropdown-item.active, .dropdown-item:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #0275d8; }\n  .dropdown-item.disabled, .dropdown-item:disabled {\n    color: #636c72;\n    cursor: not-allowed;\n    background-color: transparent; }\n\n.show > .dropdown-menu {\n  display: block; }\n\n.show > a {\n  outline: 0; }\n\n.dropdown-menu-right {\n  right: 0;\n  left: auto; }\n\n.dropdown-menu-left {\n  right: auto;\n  left: 0; }\n\n.dropdown-header {\n  display: block;\n  padding: 0.5rem 1.5rem;\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  color: #636c72;\n  white-space: nowrap; }\n\n.dropdown-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 990; }\n\n.dropup .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 0.125rem; }\n\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-flex;\n  vertical-align: middle; }\n  .btn-group > .btn,\n  .btn-group-vertical > .btn {\n    position: relative;\n    flex: 0 1 auto; }\n    .btn-group > .btn:hover,\n    .btn-group-vertical > .btn:hover {\n      z-index: 2; }\n    .btn-group > .btn:focus, .btn-group > .btn:active, .btn-group > .btn.active,\n    .btn-group-vertical > .btn:focus,\n    .btn-group-vertical > .btn:active,\n    .btn-group-vertical > .btn.active {\n      z-index: 2; }\n  .btn-group .btn + .btn,\n  .btn-group .btn + .btn-group,\n  .btn-group .btn-group + .btn,\n  .btn-group .btn-group + .btn-group,\n  .btn-group-vertical .btn + .btn,\n  .btn-group-vertical .btn + .btn-group,\n  .btn-group-vertical .btn-group + .btn,\n  .btn-group-vertical .btn-group + .btn-group {\n    margin-left: -1px; }\n\n.btn-toolbar {\n  display: flex;\n  justify-content: flex-start; }\n  .btn-toolbar .input-group {\n    width: auto; }\n\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0; }\n\n.btn-group > .btn:first-child {\n  margin-left: 0; }\n  .btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\n    border-bottom-right-radius: 0;\n    border-top-right-radius: 0; }\n\n.btn-group > .btn:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group > .btn-group {\n  float: left; }\n\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0; }\n\n.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0; }\n\n.btn + .dropdown-toggle-split {\n  padding-right: 0.75rem;\n  padding-left: 0.75rem; }\n  .btn + .dropdown-toggle-split::after {\n    margin-left: 0; }\n\n.btn-sm + .dropdown-toggle-split, .btn-group-sm > .btn + .dropdown-toggle-split {\n  padding-right: 0.375rem;\n  padding-left: 0.375rem; }\n\n.btn-lg + .dropdown-toggle-split, .btn-group-lg > .btn + .dropdown-toggle-split {\n  padding-right: 1.125rem;\n  padding-left: 1.125rem; }\n\n.btn-group-vertical {\n  display: inline-flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: center; }\n  .btn-group-vertical .btn,\n  .btn-group-vertical .btn-group {\n    width: 100%; }\n  .btn-group-vertical > .btn + .btn,\n  .btn-group-vertical > .btn + .btn-group,\n  .btn-group-vertical > .btn-group + .btn,\n  .btn-group-vertical > .btn-group + .btn-group {\n    margin-top: -1px;\n    margin-left: 0; }\n\n.btn-group-vertical > .btn:not(:first-child):not(:last-child) {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn:first-child:not(:last-child) {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn:last-child:not(:first-child) {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n[data-toggle=\"buttons\"] > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"checkbox\"] {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none; }\n\n.input-group {\n  position: relative;\n  display: flex;\n  width: 100%; }\n  .input-group .form-control {\n    position: relative;\n    z-index: 2;\n    flex: 1 1 auto;\n    width: 1%;\n    margin-bottom: 0; }\n    .input-group .form-control:focus, .input-group .form-control:active, .input-group .form-control:hover {\n      z-index: 3; }\n\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control {\n  display: flex;\n  flex-direction: column;\n  justify-content: center; }\n  .input-group-addon:not(:first-child):not(:last-child),\n  .input-group-btn:not(:first-child):not(:last-child),\n  .input-group .form-control:not(:first-child):not(:last-child) {\n    border-radius: 0; }\n\n.input-group-addon,\n.input-group-btn {\n  white-space: nowrap;\n  vertical-align: middle; }\n\n.input-group-addon {\n  padding: 0.5rem 0.75rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1.25;\n  color: #464a4c;\n  text-align: center;\n  background-color: #eceeef;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n  .input-group-addon.form-control-sm,\n  .input-group-sm > .input-group-addon,\n  .input-group-sm > .input-group-btn > .input-group-addon.btn {\n    padding: 0.25rem 0.5rem;\n    font-size: 0.875rem;\n    border-radius: 0.2rem; }\n  .input-group-addon.form-control-lg,\n  .input-group-lg > .input-group-addon,\n  .input-group-lg > .input-group-btn > .input-group-addon.btn {\n    padding: 0.75rem 1.5rem;\n    font-size: 1.25rem;\n    border-radius: 0.3rem; }\n  .input-group-addon input[type=\"radio\"],\n  .input-group-addon input[type=\"checkbox\"] {\n    margin-top: 0; }\n\n.input-group .form-control:not(:last-child),\n.input-group-addon:not(:last-child),\n.input-group-btn:not(:last-child) > .btn,\n.input-group-btn:not(:last-child) > .btn-group > .btn,\n.input-group-btn:not(:last-child) > .dropdown-toggle,\n.input-group-btn:not(:first-child) > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:not(:first-child) > .btn-group:not(:last-child) > .btn {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.input-group-addon:not(:last-child) {\n  border-right: 0; }\n\n.input-group .form-control:not(:first-child),\n.input-group-addon:not(:first-child),\n.input-group-btn:not(:first-child) > .btn,\n.input-group-btn:not(:first-child) > .btn-group > .btn,\n.input-group-btn:not(:first-child) > .dropdown-toggle,\n.input-group-btn:not(:last-child) > .btn:not(:first-child),\n.input-group-btn:not(:last-child) > .btn-group:not(:first-child) > .btn {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.form-control + .input-group-addon:not(:first-child) {\n  border-left: 0; }\n\n.input-group-btn {\n  position: relative;\n  font-size: 0;\n  white-space: nowrap; }\n  .input-group-btn > .btn {\n    position: relative;\n    flex: 1; }\n    .input-group-btn > .btn + .btn {\n      margin-left: -1px; }\n    .input-group-btn > .btn:focus, .input-group-btn > .btn:active, .input-group-btn > .btn:hover {\n      z-index: 3; }\n  .input-group-btn:not(:last-child) > .btn,\n  .input-group-btn:not(:last-child) > .btn-group {\n    margin-right: -1px; }\n  .input-group-btn:not(:first-child) > .btn,\n  .input-group-btn:not(:first-child) > .btn-group {\n    z-index: 2;\n    margin-left: -1px; }\n    .input-group-btn:not(:first-child) > .btn:focus, .input-group-btn:not(:first-child) > .btn:active, .input-group-btn:not(:first-child) > .btn:hover,\n    .input-group-btn:not(:first-child) > .btn-group:focus,\n    .input-group-btn:not(:first-child) > .btn-group:active,\n    .input-group-btn:not(:first-child) > .btn-group:hover {\n      z-index: 3; }\n\n.custom-control {\n  position: relative;\n  display: inline-flex;\n  min-height: 1.5rem;\n  padding-left: 1.5rem;\n  margin-right: 1rem;\n  cursor: pointer; }\n\n.custom-control-input {\n  position: absolute;\n  z-index: -1;\n  opacity: 0; }\n  .custom-control-input:checked ~ .custom-control-indicator {\n    color: #fff;\n    background-color: #0275d8; }\n  .custom-control-input:focus ~ .custom-control-indicator {\n    box-shadow: 0 0 0 1px #fff, 0 0 0 3px #0275d8; }\n  .custom-control-input:active ~ .custom-control-indicator {\n    color: #fff;\n    background-color: #8fcafe; }\n  .custom-control-input:disabled ~ .custom-control-indicator {\n    cursor: not-allowed;\n    background-color: #eceeef; }\n  .custom-control-input:disabled ~ .custom-control-description {\n    color: #636c72;\n    cursor: not-allowed; }\n\n.custom-control-indicator {\n  position: absolute;\n  top: 0.25rem;\n  left: 0;\n  display: block;\n  width: 1rem;\n  height: 1rem;\n  pointer-events: none;\n  user-select: none;\n  background-color: #ddd;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: 50% 50%; }\n\n.custom-checkbox .custom-control-indicator {\n  border-radius: 0.25rem; }\n\n.custom-checkbox .custom-control-input:checked ~ .custom-control-indicator {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E\"); }\n\n.custom-checkbox .custom-control-input:indeterminate ~ .custom-control-indicator {\n  background-color: #0275d8;\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3E%3Cpath stroke='%23fff' d='M0 2h4'/%3E%3C/svg%3E\"); }\n\n.custom-radio .custom-control-indicator {\n  border-radius: 50%; }\n\n.custom-radio .custom-control-input:checked ~ .custom-control-indicator {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='%23fff'/%3E%3C/svg%3E\"); }\n\n.custom-controls-stacked {\n  display: flex;\n  flex-direction: column; }\n  .custom-controls-stacked .custom-control {\n    margin-bottom: 0.25rem; }\n    .custom-controls-stacked .custom-control + .custom-control {\n      margin-left: 0; }\n\n.custom-select {\n  display: inline-block;\n  max-width: 100%;\n  height: calc(2.25rem + 2px);\n  padding: 0.375rem 1.75rem 0.375rem 0.75rem;\n  line-height: 1.25;\n  color: #464a4c;\n  vertical-align: middle;\n  background: #fff url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23333' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E\") no-repeat right 0.75rem center;\n  background-size: 8px 10px;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n  -moz-appearance: none;\n  -webkit-appearance: none; }\n  .custom-select:focus {\n    border-color: #5cb3fd;\n    outline: none; }\n    .custom-select:focus::-ms-value {\n      color: #464a4c;\n      background-color: #fff; }\n  .custom-select:disabled {\n    color: #636c72;\n    cursor: not-allowed;\n    background-color: #eceeef; }\n  .custom-select::-ms-expand {\n    opacity: 0; }\n\n.custom-select-sm {\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n  font-size: 75%; }\n\n.custom-file {\n  position: relative;\n  display: inline-block;\n  max-width: 100%;\n  height: 2.5rem;\n  margin-bottom: 0;\n  cursor: pointer; }\n\n.custom-file-input {\n  min-width: 14rem;\n  max-width: 100%;\n  height: 2.5rem;\n  margin: 0;\n  filter: alpha(opacity=0);\n  opacity: 0; }\n\n.custom-file-control {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 5;\n  height: 2.5rem;\n  padding: 0.5rem 1rem;\n  line-height: 1.5;\n  color: #464a4c;\n  pointer-events: none;\n  user-select: none;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n  .custom-file-control:lang(en)::after {\n    content: \"Choose file...\"; }\n  .custom-file-control::before {\n    position: absolute;\n    top: -1px;\n    right: -1px;\n    bottom: -1px;\n    z-index: 6;\n    display: block;\n    height: 2.5rem;\n    padding: 0.5rem 1rem;\n    line-height: 1.5;\n    color: #464a4c;\n    background-color: #eceeef;\n    border: 1px solid rgba(0, 0, 0, 0.15);\n    border-radius: 0 0.25rem 0.25rem 0; }\n  .custom-file-control:lang(en)::before {\n    content: \"Browse\"; }\n\n.nav {\n  display: flex;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n\n.nav-link {\n  display: block;\n  padding: 0.5em 1em; }\n  .nav-link:focus, .nav-link:hover {\n    text-decoration: none; }\n  .nav-link.disabled {\n    color: #636c72;\n    cursor: not-allowed; }\n\n.nav-tabs {\n  border-bottom: 1px solid #ddd; }\n  .nav-tabs .nav-item {\n    margin-bottom: -1px; }\n  .nav-tabs .nav-link {\n    border: 1px solid transparent;\n    border-top-right-radius: 0.25rem;\n    border-top-left-radius: 0.25rem; }\n    .nav-tabs .nav-link:focus, .nav-tabs .nav-link:hover {\n      border-color: #eceeef #eceeef #ddd; }\n    .nav-tabs .nav-link.disabled {\n      color: #636c72;\n      background-color: transparent;\n      border-color: transparent; }\n  .nav-tabs .nav-link.active,\n  .nav-tabs .nav-item.show .nav-link {\n    color: #464a4c;\n    background-color: #fff;\n    border-color: #ddd #ddd #fff; }\n  .nav-tabs .dropdown-menu {\n    margin-top: -1px;\n    border-top-right-radius: 0;\n    border-top-left-radius: 0; }\n\n.nav-pills .nav-link {\n  border-radius: 0.25rem; }\n\n.nav-pills .nav-link.active,\n.nav-pills .nav-item.show .nav-link {\n  color: #fff;\n  cursor: default;\n  background-color: #0275d8; }\n\n.nav-fill .nav-item {\n  flex: 1 1 auto;\n  text-align: center; }\n\n.nav-justified .nav-item {\n  flex: 1 1 100%;\n  text-align: center; }\n\n.tab-content > .tab-pane {\n  display: none; }\n\n.tab-content > .active {\n  display: block; }\n\n.navbar {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  padding: 0.5rem 1rem; }\n\n.navbar-brand {\n  display: inline-block;\n  padding-top: .25rem;\n  padding-bottom: .25rem;\n  margin-right: 1rem;\n  font-size: 1.25rem;\n  line-height: inherit;\n  white-space: nowrap; }\n  .navbar-brand:focus, .navbar-brand:hover {\n    text-decoration: none; }\n\n.navbar-nav {\n  display: flex;\n  flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n  .navbar-nav .nav-link {\n    padding-right: 0;\n    padding-left: 0; }\n\n.navbar-text {\n  display: inline-block;\n  padding-top: .425rem;\n  padding-bottom: .425rem; }\n\n.navbar-toggler {\n  align-self: flex-start;\n  padding: 0.25rem 0.75rem;\n  font-size: 1.25rem;\n  line-height: 1;\n  background: transparent;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n  .navbar-toggler:focus, .navbar-toggler:hover {\n    text-decoration: none; }\n\n.navbar-toggler-icon {\n  display: inline-block;\n  width: 1.5em;\n  height: 1.5em;\n  vertical-align: middle;\n  content: \"\";\n  background: no-repeat center center;\n  background-size: 100% 100%; }\n\n.navbar-toggler-left {\n  position: absolute;\n  left: 1rem; }\n\n.navbar-toggler-right {\n  position: absolute;\n  right: 1rem; }\n\n@media (max-width: 575px) {\n  .navbar-toggleable .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 576px) {\n  .navbar-toggleable {\n    flex-direction: row;\n    flex-wrap: nowrap;\n    align-items: center; }\n    .navbar-toggleable .navbar-nav {\n      flex-direction: row; }\n      .navbar-toggleable .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable > .container {\n      display: flex;\n      flex-wrap: nowrap;\n      align-items: center; }\n    .navbar-toggleable .navbar-collapse {\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 767px) {\n  .navbar-toggleable-sm .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-sm > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 768px) {\n  .navbar-toggleable-sm {\n    flex-direction: row;\n    flex-wrap: nowrap;\n    align-items: center; }\n    .navbar-toggleable-sm .navbar-nav {\n      flex-direction: row; }\n      .navbar-toggleable-sm .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable-sm > .container {\n      display: flex;\n      flex-wrap: nowrap;\n      align-items: center; }\n    .navbar-toggleable-sm .navbar-collapse {\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable-sm .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 991px) {\n  .navbar-toggleable-md .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-md > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 992px) {\n  .navbar-toggleable-md {\n    flex-direction: row;\n    flex-wrap: nowrap;\n    align-items: center; }\n    .navbar-toggleable-md .navbar-nav {\n      flex-direction: row; }\n      .navbar-toggleable-md .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable-md > .container {\n      display: flex;\n      flex-wrap: nowrap;\n      align-items: center; }\n    .navbar-toggleable-md .navbar-collapse {\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable-md .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 1199px) {\n  .navbar-toggleable-lg .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-lg > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 1200px) {\n  .navbar-toggleable-lg {\n    flex-direction: row;\n    flex-wrap: nowrap;\n    align-items: center; }\n    .navbar-toggleable-lg .navbar-nav {\n      flex-direction: row; }\n      .navbar-toggleable-lg .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable-lg > .container {\n      display: flex;\n      flex-wrap: nowrap;\n      align-items: center; }\n    .navbar-toggleable-lg .navbar-collapse {\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable-lg .navbar-toggler {\n      display: none; } }\n\n.navbar-toggleable-xl {\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center; }\n  .navbar-toggleable-xl .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-xl > .container {\n    padding-right: 0;\n    padding-left: 0; }\n  .navbar-toggleable-xl .navbar-nav {\n    flex-direction: row; }\n    .navbar-toggleable-xl .navbar-nav .nav-link {\n      padding-right: .5rem;\n      padding-left: .5rem; }\n  .navbar-toggleable-xl > .container {\n    display: flex;\n    flex-wrap: nowrap;\n    align-items: center; }\n  .navbar-toggleable-xl .navbar-collapse {\n    display: flex !important;\n    width: 100%; }\n  .navbar-toggleable-xl .navbar-toggler {\n    display: none; }\n\n.navbar-light .navbar-brand,\n.navbar-light .navbar-toggler {\n  color: rgba(0, 0, 0, 0.9); }\n  .navbar-light .navbar-brand:focus, .navbar-light .navbar-brand:hover,\n  .navbar-light .navbar-toggler:focus,\n  .navbar-light .navbar-toggler:hover {\n    color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-nav .nav-link {\n  color: rgba(0, 0, 0, 0.5); }\n  .navbar-light .navbar-nav .nav-link:focus, .navbar-light .navbar-nav .nav-link:hover {\n    color: rgba(0, 0, 0, 0.7); }\n  .navbar-light .navbar-nav .nav-link.disabled {\n    color: rgba(0, 0, 0, 0.3); }\n\n.navbar-light .navbar-nav .open > .nav-link,\n.navbar-light .navbar-nav .active > .nav-link,\n.navbar-light .navbar-nav .nav-link.open,\n.navbar-light .navbar-nav .nav-link.active {\n  color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-toggler {\n  border-color: rgba(0, 0, 0, 0.1); }\n\n.navbar-light .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\"); }\n\n.navbar-light .navbar-text {\n  color: rgba(0, 0, 0, 0.5); }\n\n.navbar-inverse .navbar-brand,\n.navbar-inverse .navbar-toggler {\n  color: white; }\n  .navbar-inverse .navbar-brand:focus, .navbar-inverse .navbar-brand:hover,\n  .navbar-inverse .navbar-toggler:focus,\n  .navbar-inverse .navbar-toggler:hover {\n    color: white; }\n\n.navbar-inverse .navbar-nav .nav-link {\n  color: rgba(255, 255, 255, 0.5); }\n  .navbar-inverse .navbar-nav .nav-link:focus, .navbar-inverse .navbar-nav .nav-link:hover {\n    color: rgba(255, 255, 255, 0.75); }\n  .navbar-inverse .navbar-nav .nav-link.disabled {\n    color: rgba(255, 255, 255, 0.25); }\n\n.navbar-inverse .navbar-nav .open > .nav-link,\n.navbar-inverse .navbar-nav .active > .nav-link,\n.navbar-inverse .navbar-nav .nav-link.open,\n.navbar-inverse .navbar-nav .nav-link.active {\n  color: white; }\n\n.navbar-inverse .navbar-toggler {\n  border-color: rgba(255, 255, 255, 0.1); }\n\n.navbar-inverse .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\"); }\n\n.navbar-inverse .navbar-text {\n  color: rgba(255, 255, 255, 0.5); }\n\n.card {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.25rem; }\n\n.card-block {\n  flex: 1 1 auto;\n  padding: 1.25rem; }\n\n.card-title {\n  margin-bottom: 0.75rem; }\n\n.card-subtitle {\n  margin-top: -0.375rem;\n  margin-bottom: 0; }\n\n.card-text:last-child {\n  margin-bottom: 0; }\n\n.card-link:hover {\n  text-decoration: none; }\n\n.card-link + .card-link {\n  margin-left: 1.25rem; }\n\n.card > .list-group:first-child .list-group-item:first-child {\n  border-top-right-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.card > .list-group:last-child .list-group-item:last-child {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem; }\n\n.card-header {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: #f7f7f9;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-header:first-child {\n    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0; }\n\n.card-footer {\n  padding: 0.75rem 1.25rem;\n  background-color: #f7f7f9;\n  border-top: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-footer:last-child {\n    border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px); }\n\n.card-header-tabs {\n  margin-right: -0.625rem;\n  margin-bottom: -0.75rem;\n  margin-left: -0.625rem;\n  border-bottom: 0; }\n\n.card-header-pills {\n  margin-right: -0.625rem;\n  margin-left: -0.625rem; }\n\n.card-primary {\n  background-color: #0275d8;\n  border-color: #0275d8; }\n  .card-primary .card-header,\n  .card-primary .card-footer {\n    background-color: transparent; }\n\n.card-success {\n  background-color: #5cb85c;\n  border-color: #5cb85c; }\n  .card-success .card-header,\n  .card-success .card-footer {\n    background-color: transparent; }\n\n.card-info {\n  background-color: #5bc0de;\n  border-color: #5bc0de; }\n  .card-info .card-header,\n  .card-info .card-footer {\n    background-color: transparent; }\n\n.card-warning {\n  background-color: #f0ad4e;\n  border-color: #f0ad4e; }\n  .card-warning .card-header,\n  .card-warning .card-footer {\n    background-color: transparent; }\n\n.card-danger {\n  background-color: #d9534f;\n  border-color: #d9534f; }\n  .card-danger .card-header,\n  .card-danger .card-footer {\n    background-color: transparent; }\n\n.card-outline-primary {\n  background-color: transparent;\n  border-color: #0275d8; }\n\n.card-outline-secondary {\n  background-color: transparent;\n  border-color: #ccc; }\n\n.card-outline-info {\n  background-color: transparent;\n  border-color: #5bc0de; }\n\n.card-outline-success {\n  background-color: transparent;\n  border-color: #5cb85c; }\n\n.card-outline-warning {\n  background-color: transparent;\n  border-color: #f0ad4e; }\n\n.card-outline-danger {\n  background-color: transparent;\n  border-color: #d9534f; }\n\n.card-inverse {\n  color: rgba(255, 255, 255, 0.65); }\n  .card-inverse .card-header,\n  .card-inverse .card-footer {\n    background-color: transparent;\n    border-color: rgba(255, 255, 255, 0.2); }\n  .card-inverse .card-header,\n  .card-inverse .card-footer,\n  .card-inverse .card-title,\n  .card-inverse .card-blockquote {\n    color: #fff; }\n  .card-inverse .card-link,\n  .card-inverse .card-text,\n  .card-inverse .card-subtitle,\n  .card-inverse .card-blockquote .blockquote-footer {\n    color: rgba(255, 255, 255, 0.65); }\n  .card-inverse .card-link:focus, .card-inverse .card-link:hover {\n    color: #fff; }\n\n.card-blockquote {\n  padding: 0;\n  margin-bottom: 0;\n  border-left: 0; }\n\n.card-img {\n  border-radius: calc(0.25rem - 1px); }\n\n.card-img-overlay {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: 1.25rem; }\n\n.card-img-top {\n  border-top-right-radius: calc(0.25rem - 1px);\n  border-top-left-radius: calc(0.25rem - 1px); }\n\n.card-img-bottom {\n  border-bottom-right-radius: calc(0.25rem - 1px);\n  border-bottom-left-radius: calc(0.25rem - 1px); }\n\n@media (min-width: 576px) {\n  .card-deck {\n    display: flex;\n    flex-flow: row wrap; }\n    .card-deck .card {\n      display: flex;\n      flex: 1 0 0;\n      flex-direction: column; }\n      .card-deck .card:not(:first-child) {\n        margin-left: 15px; }\n      .card-deck .card:not(:last-child) {\n        margin-right: 15px; } }\n\n@media (min-width: 576px) {\n  .card-group {\n    display: flex;\n    flex-flow: row wrap; }\n    .card-group .card {\n      flex: 1 0 0; }\n      .card-group .card + .card {\n        margin-left: 0;\n        border-left: 0; }\n      .card-group .card:first-child {\n        border-bottom-right-radius: 0;\n        border-top-right-radius: 0; }\n        .card-group .card:first-child .card-img-top {\n          border-top-right-radius: 0; }\n        .card-group .card:first-child .card-img-bottom {\n          border-bottom-right-radius: 0; }\n      .card-group .card:last-child {\n        border-bottom-left-radius: 0;\n        border-top-left-radius: 0; }\n        .card-group .card:last-child .card-img-top {\n          border-top-left-radius: 0; }\n        .card-group .card:last-child .card-img-bottom {\n          border-bottom-left-radius: 0; }\n      .card-group .card:not(:first-child):not(:last-child) {\n        border-radius: 0; }\n        .card-group .card:not(:first-child):not(:last-child) .card-img-top,\n        .card-group .card:not(:first-child):not(:last-child) .card-img-bottom {\n          border-radius: 0; } }\n\n@media (min-width: 576px) {\n  .card-columns {\n    column-count: 3;\n    column-gap: 1.25rem; }\n    .card-columns .card {\n      display: inline-block;\n      width: 100%;\n      margin-bottom: 0.75rem; } }\n\n.breadcrumb {\n  padding: 0.75rem 1rem;\n  margin-bottom: 1rem;\n  list-style: none;\n  background-color: #eceeef;\n  border-radius: 0.25rem; }\n  .breadcrumb::after {\n    display: block;\n    content: \"\";\n    clear: both; }\n\n.breadcrumb-item {\n  float: left; }\n  .breadcrumb-item + .breadcrumb-item::before {\n    display: inline-block;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    color: #636c72;\n    content: \"/\"; }\n  .breadcrumb-item + .breadcrumb-item:hover::before {\n    text-decoration: underline; }\n  .breadcrumb-item + .breadcrumb-item:hover::before {\n    text-decoration: none; }\n  .breadcrumb-item.active {\n    color: #636c72; }\n\n.pagination {\n  display: flex;\n  padding-left: 0;\n  list-style: none;\n  border-radius: 0.25rem; }\n\n.page-item:first-child .page-link {\n  margin-left: 0;\n  border-bottom-left-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.page-item:last-child .page-link {\n  border-bottom-right-radius: 0.25rem;\n  border-top-right-radius: 0.25rem; }\n\n.page-item.active .page-link {\n  z-index: 2;\n  color: #fff;\n  background-color: #0275d8;\n  border-color: #0275d8; }\n\n.page-item.disabled .page-link {\n  color: #636c72;\n  pointer-events: none;\n  cursor: not-allowed;\n  background-color: #fff;\n  border-color: #ddd; }\n\n.page-link {\n  position: relative;\n  display: block;\n  padding: 0.5rem 0.75rem;\n  margin-left: -1px;\n  line-height: 1.25;\n  color: #0275d8;\n  background-color: #fff;\n  border: 1px solid #ddd; }\n  .page-link:focus, .page-link:hover {\n    color: #014c8c;\n    text-decoration: none;\n    background-color: #eceeef;\n    border-color: #ddd; }\n\n.pagination-lg .page-link {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem; }\n\n.pagination-lg .page-item:first-child .page-link {\n  border-bottom-left-radius: 0.3rem;\n  border-top-left-radius: 0.3rem; }\n\n.pagination-lg .page-item:last-child .page-link {\n  border-bottom-right-radius: 0.3rem;\n  border-top-right-radius: 0.3rem; }\n\n.pagination-sm .page-link {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem; }\n\n.pagination-sm .page-item:first-child .page-link {\n  border-bottom-left-radius: 0.2rem;\n  border-top-left-radius: 0.2rem; }\n\n.pagination-sm .page-item:last-child .page-link {\n  border-bottom-right-radius: 0.2rem;\n  border-top-right-radius: 0.2rem; }\n\n.badge {\n  display: inline-block;\n  padding: 0.25em 0.4em;\n  font-size: 75%;\n  font-weight: bold;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25rem; }\n  .badge:empty {\n    display: none; }\n\n.btn .badge {\n  position: relative;\n  top: -1px; }\n\na.badge:focus, a.badge:hover {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer; }\n\n.badge-pill {\n  padding-right: 0.6em;\n  padding-left: 0.6em;\n  border-radius: 10rem; }\n\n.badge-default {\n  background-color: #636c72; }\n  .badge-default[href]:focus, .badge-default[href]:hover {\n    background-color: #4b5257; }\n\n.badge-primary {\n  background-color: #0275d8; }\n  .badge-primary[href]:focus, .badge-primary[href]:hover {\n    background-color: #025aa5; }\n\n.badge-success {\n  background-color: #5cb85c; }\n  .badge-success[href]:focus, .badge-success[href]:hover {\n    background-color: #449d44; }\n\n.badge-info {\n  background-color: #5bc0de; }\n  .badge-info[href]:focus, .badge-info[href]:hover {\n    background-color: #31b0d5; }\n\n.badge-warning {\n  background-color: #f0ad4e; }\n  .badge-warning[href]:focus, .badge-warning[href]:hover {\n    background-color: #ec971f; }\n\n.badge-danger {\n  background-color: #d9534f; }\n  .badge-danger[href]:focus, .badge-danger[href]:hover {\n    background-color: #c9302c; }\n\n.jumbotron {\n  padding: 2rem 1rem;\n  margin-bottom: 2rem;\n  background-color: #eceeef;\n  border-radius: 0.3rem; }\n  @media (min-width: 576px) {\n    .jumbotron {\n      padding: 4rem 2rem; } }\n\n.jumbotron-hr {\n  border-top-color: #d0d5d8; }\n\n.jumbotron-fluid {\n  padding-right: 0;\n  padding-left: 0;\n  border-radius: 0; }\n\n.alert {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n\n.alert-heading {\n  color: inherit; }\n\n.alert-link {\n  font-weight: bold; }\n\n.alert-dismissible .close {\n  position: relative;\n  top: -0.75rem;\n  right: -1.25rem;\n  padding: 0.75rem 1.25rem;\n  color: inherit; }\n\n.alert-success {\n  background-color: #dff0d8;\n  border-color: #d0e9c6;\n  color: #3c763d; }\n  .alert-success hr {\n    border-top-color: #c1e2b3; }\n  .alert-success .alert-link {\n    color: #2b542c; }\n\n.alert-info {\n  background-color: #d9edf7;\n  border-color: #bcdff1;\n  color: #31708f; }\n  .alert-info hr {\n    border-top-color: #a6d5ec; }\n  .alert-info .alert-link {\n    color: #245269; }\n\n.alert-warning {\n  background-color: #fcf8e3;\n  border-color: #faf2cc;\n  color: #8a6d3b; }\n  .alert-warning hr {\n    border-top-color: #f7ecb5; }\n  .alert-warning .alert-link {\n    color: #66512c; }\n\n.alert-danger {\n  background-color: #f2dede;\n  border-color: #ebcccc;\n  color: #a94442; }\n  .alert-danger hr {\n    border-top-color: #e4b9b9; }\n  .alert-danger .alert-link {\n    color: #843534; }\n\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0; }\n  to {\n    background-position: 0 0; } }\n\n.progress {\n  display: flex;\n  overflow: hidden;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  text-align: center;\n  background-color: #eceeef;\n  border-radius: 0.25rem; }\n\n.progress-bar {\n  height: 1rem;\n  color: #fff;\n  background-color: #0275d8; }\n\n.progress-bar-striped {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem; }\n\n.progress-bar-animated {\n  animation: progress-bar-stripes 1s linear infinite; }\n\n.media {\n  display: flex;\n  align-items: flex-start; }\n\n.media-body {\n  flex: 1; }\n\n.list-group {\n  display: flex;\n  flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0; }\n\n.list-group-item-action {\n  width: 100%;\n  color: #464a4c;\n  text-align: inherit; }\n  .list-group-item-action .list-group-item-heading {\n    color: #292b2c; }\n  .list-group-item-action:focus, .list-group-item-action:hover {\n    color: #464a4c;\n    text-decoration: none;\n    background-color: #f7f7f9; }\n  .list-group-item-action:active {\n    color: #292b2c;\n    background-color: #eceeef; }\n\n.list-group-item {\n  position: relative;\n  display: flex;\n  flex-flow: row wrap;\n  align-items: center;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125); }\n  .list-group-item:first-child {\n    border-top-right-radius: 0.25rem;\n    border-top-left-radius: 0.25rem; }\n  .list-group-item:last-child {\n    margin-bottom: 0;\n    border-bottom-right-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem; }\n  .list-group-item:focus, .list-group-item:hover {\n    text-decoration: none; }\n  .list-group-item.disabled, .list-group-item:disabled {\n    color: #636c72;\n    cursor: not-allowed;\n    background-color: #fff; }\n    .list-group-item.disabled .list-group-item-heading, .list-group-item:disabled .list-group-item-heading {\n      color: inherit; }\n    .list-group-item.disabled .list-group-item-text, .list-group-item:disabled .list-group-item-text {\n      color: #636c72; }\n  .list-group-item.active {\n    z-index: 2;\n    color: #fff;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n    .list-group-item.active .list-group-item-heading,\n    .list-group-item.active .list-group-item-heading > small,\n    .list-group-item.active .list-group-item-heading > .small {\n      color: inherit; }\n    .list-group-item.active .list-group-item-text {\n      color: #daeeff; }\n\n.list-group-flush .list-group-item {\n  border-right: 0;\n  border-left: 0;\n  border-radius: 0; }\n\n.list-group-flush:first-child .list-group-item:first-child {\n  border-top: 0; }\n\n.list-group-flush:last-child .list-group-item:last-child {\n  border-bottom: 0; }\n\n.list-group-item-success {\n  color: #3c763d;\n  background-color: #dff0d8; }\n\na.list-group-item-success,\nbutton.list-group-item-success {\n  color: #3c763d; }\n  a.list-group-item-success .list-group-item-heading,\n  button.list-group-item-success .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-success:focus, a.list-group-item-success:hover,\n  button.list-group-item-success:focus,\n  button.list-group-item-success:hover {\n    color: #3c763d;\n    background-color: #d0e9c6; }\n  a.list-group-item-success.active,\n  button.list-group-item-success.active {\n    color: #fff;\n    background-color: #3c763d;\n    border-color: #3c763d; }\n\n.list-group-item-info {\n  color: #31708f;\n  background-color: #d9edf7; }\n\na.list-group-item-info,\nbutton.list-group-item-info {\n  color: #31708f; }\n  a.list-group-item-info .list-group-item-heading,\n  button.list-group-item-info .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-info:focus, a.list-group-item-info:hover,\n  button.list-group-item-info:focus,\n  button.list-group-item-info:hover {\n    color: #31708f;\n    background-color: #c4e3f3; }\n  a.list-group-item-info.active,\n  button.list-group-item-info.active {\n    color: #fff;\n    background-color: #31708f;\n    border-color: #31708f; }\n\n.list-group-item-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3; }\n\na.list-group-item-warning,\nbutton.list-group-item-warning {\n  color: #8a6d3b; }\n  a.list-group-item-warning .list-group-item-heading,\n  button.list-group-item-warning .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-warning:focus, a.list-group-item-warning:hover,\n  button.list-group-item-warning:focus,\n  button.list-group-item-warning:hover {\n    color: #8a6d3b;\n    background-color: #faf2cc; }\n  a.list-group-item-warning.active,\n  button.list-group-item-warning.active {\n    color: #fff;\n    background-color: #8a6d3b;\n    border-color: #8a6d3b; }\n\n.list-group-item-danger {\n  color: #a94442;\n  background-color: #f2dede; }\n\na.list-group-item-danger,\nbutton.list-group-item-danger {\n  color: #a94442; }\n  a.list-group-item-danger .list-group-item-heading,\n  button.list-group-item-danger .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-danger:focus, a.list-group-item-danger:hover,\n  button.list-group-item-danger:focus,\n  button.list-group-item-danger:hover {\n    color: #a94442;\n    background-color: #ebcccc; }\n  a.list-group-item-danger.active,\n  button.list-group-item-danger.active {\n    color: #fff;\n    background-color: #a94442;\n    border-color: #a94442; }\n\n.embed-responsive {\n  position: relative;\n  display: block;\n  width: 100%;\n  padding: 0;\n  overflow: hidden; }\n  .embed-responsive::before {\n    display: block;\n    content: \"\"; }\n  .embed-responsive .embed-responsive-item,\n  .embed-responsive iframe,\n  .embed-responsive embed,\n  .embed-responsive object,\n  .embed-responsive video {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border: 0; }\n\n.embed-responsive-21by9::before {\n  padding-top: 42.85714%; }\n\n.embed-responsive-16by9::before {\n  padding-top: 56.25%; }\n\n.embed-responsive-4by3::before {\n  padding-top: 75%; }\n\n.embed-responsive-1by1::before {\n  padding-top: 100%; }\n\n.close {\n  float: right;\n  font-size: 1.5rem;\n  font-weight: bold;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: .5; }\n  .close:focus, .close:hover {\n    color: #000;\n    text-decoration: none;\n    cursor: pointer;\n    opacity: .75; }\n\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none; }\n\n.modal-open {\n  overflow: hidden; }\n\n.modal {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  display: none;\n  overflow: hidden;\n  outline: 0; }\n  .modal.fade .modal-dialog {\n    transition: transform 0.3s ease-out;\n    transform: translate(0, -25%); }\n  .modal.show .modal-dialog {\n    transform: translate(0, 0); }\n\n.modal-open .modal {\n  overflow-x: hidden;\n  overflow-y: auto; }\n\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 10px; }\n\n.modal-content {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n  outline: 0; }\n\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000; }\n  .modal-backdrop.fade {\n    opacity: 0; }\n  .modal-backdrop.show {\n    opacity: 0.5; }\n\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 15px;\n  border-bottom: 1px solid #eceeef; }\n\n.modal-title {\n  margin-bottom: 0;\n  line-height: 1.5; }\n\n.modal-body {\n  position: relative;\n  flex: 1 1 auto;\n  padding: 15px; }\n\n.modal-footer {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 15px;\n  border-top: 1px solid #eceeef; }\n  .modal-footer > :not(:first-child) {\n    margin-left: .25rem; }\n  .modal-footer > :not(:last-child) {\n    margin-right: .25rem; }\n\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll; }\n\n@media (min-width: 576px) {\n  .modal-dialog {\n    max-width: 500px;\n    margin: 30px auto; }\n  .modal-sm {\n    max-width: 300px; } }\n\n@media (min-width: 992px) {\n  .modal-lg {\n    max-width: 800px; } }\n\n.tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  opacity: 0; }\n  .tooltip.show {\n    opacity: 0.9; }\n  .tooltip.tooltip-top, .tooltip.bs-tether-element-attached-bottom {\n    padding: 5px 0;\n    margin-top: -3px; }\n    .tooltip.tooltip-top .tooltip-inner::before, .tooltip.bs-tether-element-attached-bottom .tooltip-inner::before {\n      bottom: 0;\n      left: 50%;\n      margin-left: -5px;\n      content: \"\";\n      border-width: 5px 5px 0;\n      border-top-color: #000; }\n  .tooltip.tooltip-right, .tooltip.bs-tether-element-attached-left {\n    padding: 0 5px;\n    margin-left: 3px; }\n    .tooltip.tooltip-right .tooltip-inner::before, .tooltip.bs-tether-element-attached-left .tooltip-inner::before {\n      top: 50%;\n      left: 0;\n      margin-top: -5px;\n      content: \"\";\n      border-width: 5px 5px 5px 0;\n      border-right-color: #000; }\n  .tooltip.tooltip-bottom, .tooltip.bs-tether-element-attached-top {\n    padding: 5px 0;\n    margin-top: 3px; }\n    .tooltip.tooltip-bottom .tooltip-inner::before, .tooltip.bs-tether-element-attached-top .tooltip-inner::before {\n      top: 0;\n      left: 50%;\n      margin-left: -5px;\n      content: \"\";\n      border-width: 0 5px 5px;\n      border-bottom-color: #000; }\n  .tooltip.tooltip-left, .tooltip.bs-tether-element-attached-right {\n    padding: 0 5px;\n    margin-left: -3px; }\n    .tooltip.tooltip-left .tooltip-inner::before, .tooltip.bs-tether-element-attached-right .tooltip-inner::before {\n      top: 50%;\n      right: 0;\n      margin-top: -5px;\n      content: \"\";\n      border-width: 5px 0 5px 5px;\n      border-left-color: #000; }\n\n.tooltip-inner {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 0.25rem; }\n  .tooltip-inner::before {\n    position: absolute;\n    width: 0;\n    height: 0;\n    border-color: transparent;\n    border-style: solid; }\n\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: block;\n  max-width: 276px;\n  padding: 1px;\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem; }\n  .popover.popover-top, .popover.bs-tether-element-attached-bottom {\n    margin-top: -10px; }\n    .popover.popover-top::before, .popover.popover-top::after, .popover.bs-tether-element-attached-bottom::before, .popover.bs-tether-element-attached-bottom::after {\n      left: 50%;\n      border-bottom-width: 0; }\n    .popover.popover-top::before, .popover.bs-tether-element-attached-bottom::before {\n      bottom: -11px;\n      margin-left: -11px;\n      border-top-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-top::after, .popover.bs-tether-element-attached-bottom::after {\n      bottom: -10px;\n      margin-left: -10px;\n      border-top-color: #fff; }\n  .popover.popover-right, .popover.bs-tether-element-attached-left {\n    margin-left: 10px; }\n    .popover.popover-right::before, .popover.popover-right::after, .popover.bs-tether-element-attached-left::before, .popover.bs-tether-element-attached-left::after {\n      top: 50%;\n      border-left-width: 0; }\n    .popover.popover-right::before, .popover.bs-tether-element-attached-left::before {\n      left: -11px;\n      margin-top: -11px;\n      border-right-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-right::after, .popover.bs-tether-element-attached-left::after {\n      left: -10px;\n      margin-top: -10px;\n      border-right-color: #fff; }\n  .popover.popover-bottom, .popover.bs-tether-element-attached-top {\n    margin-top: 10px; }\n    .popover.popover-bottom::before, .popover.popover-bottom::after, .popover.bs-tether-element-attached-top::before, .popover.bs-tether-element-attached-top::after {\n      left: 50%;\n      border-top-width: 0; }\n    .popover.popover-bottom::before, .popover.bs-tether-element-attached-top::before {\n      top: -11px;\n      margin-left: -11px;\n      border-bottom-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-bottom::after, .popover.bs-tether-element-attached-top::after {\n      top: -10px;\n      margin-left: -10px;\n      border-bottom-color: #f7f7f7; }\n    .popover.popover-bottom .popover-title::before, .popover.bs-tether-element-attached-top .popover-title::before {\n      position: absolute;\n      top: 0;\n      left: 50%;\n      display: block;\n      width: 20px;\n      margin-left: -10px;\n      content: \"\";\n      border-bottom: 1px solid #f7f7f7; }\n  .popover.popover-left, .popover.bs-tether-element-attached-right {\n    margin-left: -10px; }\n    .popover.popover-left::before, .popover.popover-left::after, .popover.bs-tether-element-attached-right::before, .popover.bs-tether-element-attached-right::after {\n      top: 50%;\n      border-right-width: 0; }\n    .popover.popover-left::before, .popover.bs-tether-element-attached-right::before {\n      right: -11px;\n      margin-top: -11px;\n      border-left-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-left::after, .popover.bs-tether-element-attached-right::after {\n      right: -10px;\n      margin-top: -10px;\n      border-left-color: #fff; }\n\n.popover-title {\n  padding: 8px 14px;\n  margin-bottom: 0;\n  font-size: 1rem;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-top-right-radius: calc(0.3rem - 1px);\n  border-top-left-radius: calc(0.3rem - 1px); }\n  .popover-title:empty {\n    display: none; }\n\n.popover-content {\n  padding: 9px 14px; }\n\n.popover::before,\n.popover::after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid; }\n\n.popover::before {\n  content: \"\";\n  border-width: 11px; }\n\n.popover::after {\n  content: \"\";\n  border-width: 10px; }\n\n.carousel {\n  position: relative; }\n\n.carousel-inner {\n  position: relative;\n  width: 100%;\n  overflow: hidden; }\n\n.carousel-item {\n  position: relative;\n  display: none;\n  width: 100%; }\n  @media (-webkit-transform-3d) {\n    .carousel-item {\n      transition: transform 0.6s ease-in-out;\n      backface-visibility: hidden;\n      perspective: 1000px; } }\n  @supports (transform: translate3d(0, 0, 0)) {\n    .carousel-item {\n      transition: transform 0.6s ease-in-out;\n      backface-visibility: hidden;\n      perspective: 1000px; } }\n\n.carousel-item.active,\n.carousel-item-next,\n.carousel-item-prev {\n  display: flex; }\n\n.carousel-item-next,\n.carousel-item-prev {\n  position: absolute;\n  top: 0; }\n\n@media (-webkit-transform-3d) {\n  .carousel-item-next.carousel-item-left,\n  .carousel-item-prev.carousel-item-right {\n    transform: translate3d(0, 0, 0); }\n  .carousel-item-next,\n  .active.carousel-item-right {\n    transform: translate3d(100%, 0, 0); }\n  .carousel-item-prev,\n  .active.carousel-item-left {\n    transform: translate3d(-100%, 0, 0); } }\n\n@supports (transform: translate3d(0, 0, 0)) {\n  .carousel-item-next.carousel-item-left,\n  .carousel-item-prev.carousel-item-right {\n    transform: translate3d(0, 0, 0); }\n  .carousel-item-next,\n  .active.carousel-item-right {\n    transform: translate3d(100%, 0, 0); }\n  .carousel-item-prev,\n  .active.carousel-item-left {\n    transform: translate3d(-100%, 0, 0); } }\n\n.carousel-control-prev,\n.carousel-control-next {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 15%;\n  color: #fff;\n  text-align: center;\n  opacity: 0.5; }\n  .carousel-control-prev:focus, .carousel-control-prev:hover,\n  .carousel-control-next:focus,\n  .carousel-control-next:hover {\n    color: #fff;\n    text-decoration: none;\n    outline: 0;\n    opacity: .9; }\n\n.carousel-control-prev {\n  left: 0; }\n\n.carousel-control-next {\n  right: 0; }\n\n.carousel-control-prev-icon,\n.carousel-control-next-icon {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  background: transparent no-repeat center center;\n  background-size: 100% 100%; }\n\n.carousel-control-prev-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M4 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E\"); }\n\n.carousel-control-next-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M1.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E\"); }\n\n.carousel-indicators {\n  position: absolute;\n  right: 0;\n  bottom: 10px;\n  left: 0;\n  z-index: 15;\n  display: flex;\n  justify-content: center;\n  padding-left: 0;\n  margin-right: 15%;\n  margin-left: 15%;\n  list-style: none; }\n  .carousel-indicators li {\n    position: relative;\n    flex: 1 0 auto;\n    max-width: 30px;\n    height: 3px;\n    margin-right: 3px;\n    margin-left: 3px;\n    text-indent: -999px;\n    cursor: pointer;\n    background-color: rgba(255, 255, 255, 0.5); }\n    .carousel-indicators li::before {\n      position: absolute;\n      top: -10px;\n      left: 0;\n      display: inline-block;\n      width: 100%;\n      height: 10px;\n      content: \"\"; }\n    .carousel-indicators li::after {\n      position: absolute;\n      bottom: -10px;\n      left: 0;\n      display: inline-block;\n      width: 100%;\n      height: 10px;\n      content: \"\"; }\n  .carousel-indicators .active {\n    background-color: #fff; }\n\n.carousel-caption {\n  position: absolute;\n  right: 15%;\n  bottom: 20px;\n  left: 15%;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center; }\n\n.align-baseline {\n  vertical-align: baseline !important; }\n\n.align-top {\n  vertical-align: top !important; }\n\n.align-middle {\n  vertical-align: middle !important; }\n\n.align-bottom {\n  vertical-align: bottom !important; }\n\n.align-text-bottom {\n  vertical-align: text-bottom !important; }\n\n.align-text-top {\n  vertical-align: text-top !important; }\n\n.bg-faded {\n  background-color: #f7f7f7; }\n\n.bg-primary {\n  background-color: #0275d8 !important; }\n\na.bg-primary:focus, a.bg-primary:hover {\n  background-color: #025aa5 !important; }\n\n.bg-success {\n  background-color: #5cb85c !important; }\n\na.bg-success:focus, a.bg-success:hover {\n  background-color: #449d44 !important; }\n\n.bg-info {\n  background-color: #5bc0de !important; }\n\na.bg-info:focus, a.bg-info:hover {\n  background-color: #31b0d5 !important; }\n\n.bg-warning {\n  background-color: #f0ad4e !important; }\n\na.bg-warning:focus, a.bg-warning:hover {\n  background-color: #ec971f !important; }\n\n.bg-danger {\n  background-color: #d9534f !important; }\n\na.bg-danger:focus, a.bg-danger:hover {\n  background-color: #c9302c !important; }\n\n.bg-inverse {\n  background-color: #292b2c !important; }\n\na.bg-inverse:focus, a.bg-inverse:hover {\n  background-color: #101112 !important; }\n\n.border-0 {\n  border: 0 !important; }\n\n.border-top-0 {\n  border-top: 0 !important; }\n\n.border-right-0 {\n  border-right: 0 !important; }\n\n.border-bottom-0 {\n  border-bottom: 0 !important; }\n\n.border-left-0 {\n  border-left: 0 !important; }\n\n.rounded {\n  border-radius: 0.25rem; }\n\n.rounded-top {\n  border-top-right-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.rounded-right {\n  border-bottom-right-radius: 0.25rem;\n  border-top-right-radius: 0.25rem; }\n\n.rounded-bottom {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem; }\n\n.rounded-left {\n  border-bottom-left-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.rounded-circle {\n  border-radius: 50%; }\n\n.rounded-0 {\n  border-radius: 0; }\n\n.clearfix::after {\n  display: block;\n  content: \"\";\n  clear: both; }\n\n.d-none {\n  display: none !important; }\n\n.d-inline {\n  display: inline !important; }\n\n.d-inline-block {\n  display: inline-block !important; }\n\n.d-block {\n  display: block !important; }\n\n.d-table {\n  display: table !important; }\n\n.d-table-cell {\n  display: table-cell !important; }\n\n.d-flex {\n  display: flex !important; }\n\n.d-inline-flex {\n  display: inline-flex !important; }\n\n@media (min-width: 576px) {\n  .d-sm-none {\n    display: none !important; }\n  .d-sm-inline {\n    display: inline !important; }\n  .d-sm-inline-block {\n    display: inline-block !important; }\n  .d-sm-block {\n    display: block !important; }\n  .d-sm-table {\n    display: table !important; }\n  .d-sm-table-cell {\n    display: table-cell !important; }\n  .d-sm-flex {\n    display: flex !important; }\n  .d-sm-inline-flex {\n    display: inline-flex !important; } }\n\n@media (min-width: 768px) {\n  .d-md-none {\n    display: none !important; }\n  .d-md-inline {\n    display: inline !important; }\n  .d-md-inline-block {\n    display: inline-block !important; }\n  .d-md-block {\n    display: block !important; }\n  .d-md-table {\n    display: table !important; }\n  .d-md-table-cell {\n    display: table-cell !important; }\n  .d-md-flex {\n    display: flex !important; }\n  .d-md-inline-flex {\n    display: inline-flex !important; } }\n\n@media (min-width: 992px) {\n  .d-lg-none {\n    display: none !important; }\n  .d-lg-inline {\n    display: inline !important; }\n  .d-lg-inline-block {\n    display: inline-block !important; }\n  .d-lg-block {\n    display: block !important; }\n  .d-lg-table {\n    display: table !important; }\n  .d-lg-table-cell {\n    display: table-cell !important; }\n  .d-lg-flex {\n    display: flex !important; }\n  .d-lg-inline-flex {\n    display: inline-flex !important; } }\n\n@media (min-width: 1200px) {\n  .d-xl-none {\n    display: none !important; }\n  .d-xl-inline {\n    display: inline !important; }\n  .d-xl-inline-block {\n    display: inline-block !important; }\n  .d-xl-block {\n    display: block !important; }\n  .d-xl-table {\n    display: table !important; }\n  .d-xl-table-cell {\n    display: table-cell !important; }\n  .d-xl-flex {\n    display: flex !important; }\n  .d-xl-inline-flex {\n    display: inline-flex !important; } }\n\n.flex-first {\n  order: -1; }\n\n.flex-last {\n  order: 1; }\n\n.flex-unordered {\n  order: 0; }\n\n.flex-row {\n  flex-direction: row !important; }\n\n.flex-column {\n  flex-direction: column !important; }\n\n.flex-row-reverse {\n  flex-direction: row-reverse !important; }\n\n.flex-column-reverse {\n  flex-direction: column-reverse !important; }\n\n.flex-wrap {\n  flex-wrap: wrap !important; }\n\n.flex-nowrap {\n  flex-wrap: nowrap !important; }\n\n.flex-wrap-reverse {\n  flex-wrap: wrap-reverse !important; }\n\n.justify-content-start {\n  justify-content: flex-start !important; }\n\n.justify-content-end {\n  justify-content: flex-end !important; }\n\n.justify-content-center {\n  justify-content: center !important; }\n\n.justify-content-between {\n  justify-content: space-between !important; }\n\n.justify-content-around {\n  justify-content: space-around !important; }\n\n.align-items-start {\n  align-items: flex-start !important; }\n\n.align-items-end {\n  align-items: flex-end !important; }\n\n.align-items-center {\n  align-items: center !important; }\n\n.align-items-baseline {\n  align-items: baseline !important; }\n\n.align-items-stretch {\n  align-items: stretch !important; }\n\n.align-content-start {\n  align-content: flex-start !important; }\n\n.align-content-end {\n  align-content: flex-end !important; }\n\n.align-content-center {\n  align-content: center !important; }\n\n.align-content-between {\n  align-content: space-between !important; }\n\n.align-content-around {\n  align-content: space-around !important; }\n\n.align-content-stretch {\n  align-content: stretch !important; }\n\n.align-self-auto {\n  align-self: auto !important; }\n\n.align-self-start {\n  align-self: flex-start !important; }\n\n.align-self-end {\n  align-self: flex-end !important; }\n\n.align-self-center {\n  align-self: center !important; }\n\n.align-self-baseline {\n  align-self: baseline !important; }\n\n.align-self-stretch {\n  align-self: stretch !important; }\n\n@media (min-width: 576px) {\n  .flex-sm-first {\n    order: -1; }\n  .flex-sm-last {\n    order: 1; }\n  .flex-sm-unordered {\n    order: 0; }\n  .flex-sm-row {\n    flex-direction: row !important; }\n  .flex-sm-column {\n    flex-direction: column !important; }\n  .flex-sm-row-reverse {\n    flex-direction: row-reverse !important; }\n  .flex-sm-column-reverse {\n    flex-direction: column-reverse !important; }\n  .flex-sm-wrap {\n    flex-wrap: wrap !important; }\n  .flex-sm-nowrap {\n    flex-wrap: nowrap !important; }\n  .flex-sm-wrap-reverse {\n    flex-wrap: wrap-reverse !important; }\n  .justify-content-sm-start {\n    justify-content: flex-start !important; }\n  .justify-content-sm-end {\n    justify-content: flex-end !important; }\n  .justify-content-sm-center {\n    justify-content: center !important; }\n  .justify-content-sm-between {\n    justify-content: space-between !important; }\n  .justify-content-sm-around {\n    justify-content: space-around !important; }\n  .align-items-sm-start {\n    align-items: flex-start !important; }\n  .align-items-sm-end {\n    align-items: flex-end !important; }\n  .align-items-sm-center {\n    align-items: center !important; }\n  .align-items-sm-baseline {\n    align-items: baseline !important; }\n  .align-items-sm-stretch {\n    align-items: stretch !important; }\n  .align-content-sm-start {\n    align-content: flex-start !important; }\n  .align-content-sm-end {\n    align-content: flex-end !important; }\n  .align-content-sm-center {\n    align-content: center !important; }\n  .align-content-sm-between {\n    align-content: space-between !important; }\n  .align-content-sm-around {\n    align-content: space-around !important; }\n  .align-content-sm-stretch {\n    align-content: stretch !important; }\n  .align-self-sm-auto {\n    align-self: auto !important; }\n  .align-self-sm-start {\n    align-self: flex-start !important; }\n  .align-self-sm-end {\n    align-self: flex-end !important; }\n  .align-self-sm-center {\n    align-self: center !important; }\n  .align-self-sm-baseline {\n    align-self: baseline !important; }\n  .align-self-sm-stretch {\n    align-self: stretch !important; } }\n\n@media (min-width: 768px) {\n  .flex-md-first {\n    order: -1; }\n  .flex-md-last {\n    order: 1; }\n  .flex-md-unordered {\n    order: 0; }\n  .flex-md-row {\n    flex-direction: row !important; }\n  .flex-md-column {\n    flex-direction: column !important; }\n  .flex-md-row-reverse {\n    flex-direction: row-reverse !important; }\n  .flex-md-column-reverse {\n    flex-direction: column-reverse !important; }\n  .flex-md-wrap {\n    flex-wrap: wrap !important; }\n  .flex-md-nowrap {\n    flex-wrap: nowrap !important; }\n  .flex-md-wrap-reverse {\n    flex-wrap: wrap-reverse !important; }\n  .justify-content-md-start {\n    justify-content: flex-start !important; }\n  .justify-content-md-end {\n    justify-content: flex-end !important; }\n  .justify-content-md-center {\n    justify-content: center !important; }\n  .justify-content-md-between {\n    justify-content: space-between !important; }\n  .justify-content-md-around {\n    justify-content: space-around !important; }\n  .align-items-md-start {\n    align-items: flex-start !important; }\n  .align-items-md-end {\n    align-items: flex-end !important; }\n  .align-items-md-center {\n    align-items: center !important; }\n  .align-items-md-baseline {\n    align-items: baseline !important; }\n  .align-items-md-stretch {\n    align-items: stretch !important; }\n  .align-content-md-start {\n    align-content: flex-start !important; }\n  .align-content-md-end {\n    align-content: flex-end !important; }\n  .align-content-md-center {\n    align-content: center !important; }\n  .align-content-md-between {\n    align-content: space-between !important; }\n  .align-content-md-around {\n    align-content: space-around !important; }\n  .align-content-md-stretch {\n    align-content: stretch !important; }\n  .align-self-md-auto {\n    align-self: auto !important; }\n  .align-self-md-start {\n    align-self: flex-start !important; }\n  .align-self-md-end {\n    align-self: flex-end !important; }\n  .align-self-md-center {\n    align-self: center !important; }\n  .align-self-md-baseline {\n    align-self: baseline !important; }\n  .align-self-md-stretch {\n    align-self: stretch !important; } }\n\n@media (min-width: 992px) {\n  .flex-lg-first {\n    order: -1; }\n  .flex-lg-last {\n    order: 1; }\n  .flex-lg-unordered {\n    order: 0; }\n  .flex-lg-row {\n    flex-direction: row !important; }\n  .flex-lg-column {\n    flex-direction: column !important; }\n  .flex-lg-row-reverse {\n    flex-direction: row-reverse !important; }\n  .flex-lg-column-reverse {\n    flex-direction: column-reverse !important; }\n  .flex-lg-wrap {\n    flex-wrap: wrap !important; }\n  .flex-lg-nowrap {\n    flex-wrap: nowrap !important; }\n  .flex-lg-wrap-reverse {\n    flex-wrap: wrap-reverse !important; }\n  .justify-content-lg-start {\n    justify-content: flex-start !important; }\n  .justify-content-lg-end {\n    justify-content: flex-end !important; }\n  .justify-content-lg-center {\n    justify-content: center !important; }\n  .justify-content-lg-between {\n    justify-content: space-between !important; }\n  .justify-content-lg-around {\n    justify-content: space-around !important; }\n  .align-items-lg-start {\n    align-items: flex-start !important; }\n  .align-items-lg-end {\n    align-items: flex-end !important; }\n  .align-items-lg-center {\n    align-items: center !important; }\n  .align-items-lg-baseline {\n    align-items: baseline !important; }\n  .align-items-lg-stretch {\n    align-items: stretch !important; }\n  .align-content-lg-start {\n    align-content: flex-start !important; }\n  .align-content-lg-end {\n    align-content: flex-end !important; }\n  .align-content-lg-center {\n    align-content: center !important; }\n  .align-content-lg-between {\n    align-content: space-between !important; }\n  .align-content-lg-around {\n    align-content: space-around !important; }\n  .align-content-lg-stretch {\n    align-content: stretch !important; }\n  .align-self-lg-auto {\n    align-self: auto !important; }\n  .align-self-lg-start {\n    align-self: flex-start !important; }\n  .align-self-lg-end {\n    align-self: flex-end !important; }\n  .align-self-lg-center {\n    align-self: center !important; }\n  .align-self-lg-baseline {\n    align-self: baseline !important; }\n  .align-self-lg-stretch {\n    align-self: stretch !important; } }\n\n@media (min-width: 1200px) {\n  .flex-xl-first {\n    order: -1; }\n  .flex-xl-last {\n    order: 1; }\n  .flex-xl-unordered {\n    order: 0; }\n  .flex-xl-row {\n    flex-direction: row !important; }\n  .flex-xl-column {\n    flex-direction: column !important; }\n  .flex-xl-row-reverse {\n    flex-direction: row-reverse !important; }\n  .flex-xl-column-reverse {\n    flex-direction: column-reverse !important; }\n  .flex-xl-wrap {\n    flex-wrap: wrap !important; }\n  .flex-xl-nowrap {\n    flex-wrap: nowrap !important; }\n  .flex-xl-wrap-reverse {\n    flex-wrap: wrap-reverse !important; }\n  .justify-content-xl-start {\n    justify-content: flex-start !important; }\n  .justify-content-xl-end {\n    justify-content: flex-end !important; }\n  .justify-content-xl-center {\n    justify-content: center !important; }\n  .justify-content-xl-between {\n    justify-content: space-between !important; }\n  .justify-content-xl-around {\n    justify-content: space-around !important; }\n  .align-items-xl-start {\n    align-items: flex-start !important; }\n  .align-items-xl-end {\n    align-items: flex-end !important; }\n  .align-items-xl-center {\n    align-items: center !important; }\n  .align-items-xl-baseline {\n    align-items: baseline !important; }\n  .align-items-xl-stretch {\n    align-items: stretch !important; }\n  .align-content-xl-start {\n    align-content: flex-start !important; }\n  .align-content-xl-end {\n    align-content: flex-end !important; }\n  .align-content-xl-center {\n    align-content: center !important; }\n  .align-content-xl-between {\n    align-content: space-between !important; }\n  .align-content-xl-around {\n    align-content: space-around !important; }\n  .align-content-xl-stretch {\n    align-content: stretch !important; }\n  .align-self-xl-auto {\n    align-self: auto !important; }\n  .align-self-xl-start {\n    align-self: flex-start !important; }\n  .align-self-xl-end {\n    align-self: flex-end !important; }\n  .align-self-xl-center {\n    align-self: center !important; }\n  .align-self-xl-baseline {\n    align-self: baseline !important; }\n  .align-self-xl-stretch {\n    align-self: stretch !important; } }\n\n.float-left {\n  float: left !important; }\n\n.float-right {\n  float: right !important; }\n\n.float-none {\n  float: none !important; }\n\n@media (min-width: 576px) {\n  .float-sm-left {\n    float: left !important; }\n  .float-sm-right {\n    float: right !important; }\n  .float-sm-none {\n    float: none !important; } }\n\n@media (min-width: 768px) {\n  .float-md-left {\n    float: left !important; }\n  .float-md-right {\n    float: right !important; }\n  .float-md-none {\n    float: none !important; } }\n\n@media (min-width: 992px) {\n  .float-lg-left {\n    float: left !important; }\n  .float-lg-right {\n    float: right !important; }\n  .float-lg-none {\n    float: none !important; } }\n\n@media (min-width: 1200px) {\n  .float-xl-left {\n    float: left !important; }\n  .float-xl-right {\n    float: right !important; }\n  .float-xl-none {\n    float: none !important; } }\n\n.fixed-top {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1030; }\n\n.fixed-bottom {\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1030; }\n\n.sticky-top {\n  position: sticky;\n  top: 0;\n  z-index: 1030; }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto; }\n\n.w-25 {\n  width: 25% !important; }\n\n.w-50 {\n  width: 50% !important; }\n\n.w-75 {\n  width: 75% !important; }\n\n.w-100 {\n  width: 100% !important; }\n\n.h-25 {\n  height: 25% !important; }\n\n.h-50 {\n  height: 50% !important; }\n\n.h-75 {\n  height: 75% !important; }\n\n.h-100 {\n  height: 100% !important; }\n\n.mw-100 {\n  max-width: 100% !important; }\n\n.mh-100 {\n  max-height: 100% !important; }\n\n.m-0 {\n  margin: 0 0 !important; }\n\n.mt-0 {\n  margin-top: 0 !important; }\n\n.mr-0 {\n  margin-right: 0 !important; }\n\n.mb-0 {\n  margin-bottom: 0 !important; }\n\n.ml-0 {\n  margin-left: 0 !important; }\n\n.mx-0 {\n  margin-right: 0 !important;\n  margin-left: 0 !important; }\n\n.my-0 {\n  margin-top: 0 !important;\n  margin-bottom: 0 !important; }\n\n.m-1 {\n  margin: 0.25rem 0.25rem !important; }\n\n.mt-1 {\n  margin-top: 0.25rem !important; }\n\n.mr-1 {\n  margin-right: 0.25rem !important; }\n\n.mb-1 {\n  margin-bottom: 0.25rem !important; }\n\n.ml-1 {\n  margin-left: 0.25rem !important; }\n\n.mx-1 {\n  margin-right: 0.25rem !important;\n  margin-left: 0.25rem !important; }\n\n.my-1 {\n  margin-top: 0.25rem !important;\n  margin-bottom: 0.25rem !important; }\n\n.m-2 {\n  margin: 0.5rem 0.5rem !important; }\n\n.mt-2 {\n  margin-top: 0.5rem !important; }\n\n.mr-2 {\n  margin-right: 0.5rem !important; }\n\n.mb-2 {\n  margin-bottom: 0.5rem !important; }\n\n.ml-2 {\n  margin-left: 0.5rem !important; }\n\n.mx-2 {\n  margin-right: 0.5rem !important;\n  margin-left: 0.5rem !important; }\n\n.my-2 {\n  margin-top: 0.5rem !important;\n  margin-bottom: 0.5rem !important; }\n\n.m-3 {\n  margin: 1rem 1rem !important; }\n\n.mt-3 {\n  margin-top: 1rem !important; }\n\n.mr-3 {\n  margin-right: 1rem !important; }\n\n.mb-3 {\n  margin-bottom: 1rem !important; }\n\n.ml-3 {\n  margin-left: 1rem !important; }\n\n.mx-3 {\n  margin-right: 1rem !important;\n  margin-left: 1rem !important; }\n\n.my-3 {\n  margin-top: 1rem !important;\n  margin-bottom: 1rem !important; }\n\n.m-4 {\n  margin: 1.5rem 1.5rem !important; }\n\n.mt-4 {\n  margin-top: 1.5rem !important; }\n\n.mr-4 {\n  margin-right: 1.5rem !important; }\n\n.mb-4 {\n  margin-bottom: 1.5rem !important; }\n\n.ml-4 {\n  margin-left: 1.5rem !important; }\n\n.mx-4 {\n  margin-right: 1.5rem !important;\n  margin-left: 1.5rem !important; }\n\n.my-4 {\n  margin-top: 1.5rem !important;\n  margin-bottom: 1.5rem !important; }\n\n.m-5 {\n  margin: 3rem 3rem !important; }\n\n.mt-5 {\n  margin-top: 3rem !important; }\n\n.mr-5 {\n  margin-right: 3rem !important; }\n\n.mb-5 {\n  margin-bottom: 3rem !important; }\n\n.ml-5 {\n  margin-left: 3rem !important; }\n\n.mx-5 {\n  margin-right: 3rem !important;\n  margin-left: 3rem !important; }\n\n.my-5 {\n  margin-top: 3rem !important;\n  margin-bottom: 3rem !important; }\n\n.p-0 {\n  padding: 0 0 !important; }\n\n.pt-0 {\n  padding-top: 0 !important; }\n\n.pr-0 {\n  padding-right: 0 !important; }\n\n.pb-0 {\n  padding-bottom: 0 !important; }\n\n.pl-0 {\n  padding-left: 0 !important; }\n\n.px-0 {\n  padding-right: 0 !important;\n  padding-left: 0 !important; }\n\n.py-0 {\n  padding-top: 0 !important;\n  padding-bottom: 0 !important; }\n\n.p-1 {\n  padding: 0.25rem 0.25rem !important; }\n\n.pt-1 {\n  padding-top: 0.25rem !important; }\n\n.pr-1 {\n  padding-right: 0.25rem !important; }\n\n.pb-1 {\n  padding-bottom: 0.25rem !important; }\n\n.pl-1 {\n  padding-left: 0.25rem !important; }\n\n.px-1 {\n  padding-right: 0.25rem !important;\n  padding-left: 0.25rem !important; }\n\n.py-1 {\n  padding-top: 0.25rem !important;\n  padding-bottom: 0.25rem !important; }\n\n.p-2 {\n  padding: 0.5rem 0.5rem !important; }\n\n.pt-2 {\n  padding-top: 0.5rem !important; }\n\n.pr-2 {\n  padding-right: 0.5rem !important; }\n\n.pb-2 {\n  padding-bottom: 0.5rem !important; }\n\n.pl-2 {\n  padding-left: 0.5rem !important; }\n\n.px-2 {\n  padding-right: 0.5rem !important;\n  padding-left: 0.5rem !important; }\n\n.py-2 {\n  padding-top: 0.5rem !important;\n  padding-bottom: 0.5rem !important; }\n\n.p-3 {\n  padding: 1rem 1rem !important; }\n\n.pt-3 {\n  padding-top: 1rem !important; }\n\n.pr-3 {\n  padding-right: 1rem !important; }\n\n.pb-3 {\n  padding-bottom: 1rem !important; }\n\n.pl-3 {\n  padding-left: 1rem !important; }\n\n.px-3 {\n  padding-right: 1rem !important;\n  padding-left: 1rem !important; }\n\n.py-3 {\n  padding-top: 1rem !important;\n  padding-bottom: 1rem !important; }\n\n.p-4 {\n  padding: 1.5rem 1.5rem !important; }\n\n.pt-4 {\n  padding-top: 1.5rem !important; }\n\n.pr-4 {\n  padding-right: 1.5rem !important; }\n\n.pb-4 {\n  padding-bottom: 1.5rem !important; }\n\n.pl-4 {\n  padding-left: 1.5rem !important; }\n\n.px-4 {\n  padding-right: 1.5rem !important;\n  padding-left: 1.5rem !important; }\n\n.py-4 {\n  padding-top: 1.5rem !important;\n  padding-bottom: 1.5rem !important; }\n\n.p-5 {\n  padding: 3rem 3rem !important; }\n\n.pt-5 {\n  padding-top: 3rem !important; }\n\n.pr-5 {\n  padding-right: 3rem !important; }\n\n.pb-5 {\n  padding-bottom: 3rem !important; }\n\n.pl-5 {\n  padding-left: 3rem !important; }\n\n.px-5 {\n  padding-right: 3rem !important;\n  padding-left: 3rem !important; }\n\n.py-5 {\n  padding-top: 3rem !important;\n  padding-bottom: 3rem !important; }\n\n.m-auto {\n  margin: auto !important; }\n\n.mt-auto {\n  margin-top: auto !important; }\n\n.mr-auto {\n  margin-right: auto !important; }\n\n.mb-auto {\n  margin-bottom: auto !important; }\n\n.ml-auto {\n  margin-left: auto !important; }\n\n.mx-auto {\n  margin-right: auto !important;\n  margin-left: auto !important; }\n\n.my-auto {\n  margin-top: auto !important;\n  margin-bottom: auto !important; }\n\n@media (min-width: 576px) {\n  .m-sm-0 {\n    margin: 0 0 !important; }\n  .mt-sm-0 {\n    margin-top: 0 !important; }\n  .mr-sm-0 {\n    margin-right: 0 !important; }\n  .mb-sm-0 {\n    margin-bottom: 0 !important; }\n  .ml-sm-0 {\n    margin-left: 0 !important; }\n  .mx-sm-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-sm-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-sm-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-sm-1 {\n    margin-top: 0.25rem !important; }\n  .mr-sm-1 {\n    margin-right: 0.25rem !important; }\n  .mb-sm-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-sm-1 {\n    margin-left: 0.25rem !important; }\n  .mx-sm-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-sm-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-sm-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-sm-2 {\n    margin-top: 0.5rem !important; }\n  .mr-sm-2 {\n    margin-right: 0.5rem !important; }\n  .mb-sm-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-sm-2 {\n    margin-left: 0.5rem !important; }\n  .mx-sm-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-sm-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-sm-3 {\n    margin: 1rem 1rem !important; }\n  .mt-sm-3 {\n    margin-top: 1rem !important; }\n  .mr-sm-3 {\n    margin-right: 1rem !important; }\n  .mb-sm-3 {\n    margin-bottom: 1rem !important; }\n  .ml-sm-3 {\n    margin-left: 1rem !important; }\n  .mx-sm-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-sm-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-sm-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-sm-4 {\n    margin-top: 1.5rem !important; }\n  .mr-sm-4 {\n    margin-right: 1.5rem !important; }\n  .mb-sm-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-sm-4 {\n    margin-left: 1.5rem !important; }\n  .mx-sm-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-sm-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-sm-5 {\n    margin: 3rem 3rem !important; }\n  .mt-sm-5 {\n    margin-top: 3rem !important; }\n  .mr-sm-5 {\n    margin-right: 3rem !important; }\n  .mb-sm-5 {\n    margin-bottom: 3rem !important; }\n  .ml-sm-5 {\n    margin-left: 3rem !important; }\n  .mx-sm-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-sm-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-sm-0 {\n    padding: 0 0 !important; }\n  .pt-sm-0 {\n    padding-top: 0 !important; }\n  .pr-sm-0 {\n    padding-right: 0 !important; }\n  .pb-sm-0 {\n    padding-bottom: 0 !important; }\n  .pl-sm-0 {\n    padding-left: 0 !important; }\n  .px-sm-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-sm-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-sm-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-sm-1 {\n    padding-top: 0.25rem !important; }\n  .pr-sm-1 {\n    padding-right: 0.25rem !important; }\n  .pb-sm-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-sm-1 {\n    padding-left: 0.25rem !important; }\n  .px-sm-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-sm-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-sm-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-sm-2 {\n    padding-top: 0.5rem !important; }\n  .pr-sm-2 {\n    padding-right: 0.5rem !important; }\n  .pb-sm-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-sm-2 {\n    padding-left: 0.5rem !important; }\n  .px-sm-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-sm-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-sm-3 {\n    padding: 1rem 1rem !important; }\n  .pt-sm-3 {\n    padding-top: 1rem !important; }\n  .pr-sm-3 {\n    padding-right: 1rem !important; }\n  .pb-sm-3 {\n    padding-bottom: 1rem !important; }\n  .pl-sm-3 {\n    padding-left: 1rem !important; }\n  .px-sm-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-sm-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-sm-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-sm-4 {\n    padding-top: 1.5rem !important; }\n  .pr-sm-4 {\n    padding-right: 1.5rem !important; }\n  .pb-sm-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-sm-4 {\n    padding-left: 1.5rem !important; }\n  .px-sm-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-sm-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-sm-5 {\n    padding: 3rem 3rem !important; }\n  .pt-sm-5 {\n    padding-top: 3rem !important; }\n  .pr-sm-5 {\n    padding-right: 3rem !important; }\n  .pb-sm-5 {\n    padding-bottom: 3rem !important; }\n  .pl-sm-5 {\n    padding-left: 3rem !important; }\n  .px-sm-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-sm-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-sm-auto {\n    margin: auto !important; }\n  .mt-sm-auto {\n    margin-top: auto !important; }\n  .mr-sm-auto {\n    margin-right: auto !important; }\n  .mb-sm-auto {\n    margin-bottom: auto !important; }\n  .ml-sm-auto {\n    margin-left: auto !important; }\n  .mx-sm-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-sm-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n@media (min-width: 768px) {\n  .m-md-0 {\n    margin: 0 0 !important; }\n  .mt-md-0 {\n    margin-top: 0 !important; }\n  .mr-md-0 {\n    margin-right: 0 !important; }\n  .mb-md-0 {\n    margin-bottom: 0 !important; }\n  .ml-md-0 {\n    margin-left: 0 !important; }\n  .mx-md-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-md-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-md-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-md-1 {\n    margin-top: 0.25rem !important; }\n  .mr-md-1 {\n    margin-right: 0.25rem !important; }\n  .mb-md-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-md-1 {\n    margin-left: 0.25rem !important; }\n  .mx-md-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-md-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-md-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-md-2 {\n    margin-top: 0.5rem !important; }\n  .mr-md-2 {\n    margin-right: 0.5rem !important; }\n  .mb-md-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-md-2 {\n    margin-left: 0.5rem !important; }\n  .mx-md-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-md-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-md-3 {\n    margin: 1rem 1rem !important; }\n  .mt-md-3 {\n    margin-top: 1rem !important; }\n  .mr-md-3 {\n    margin-right: 1rem !important; }\n  .mb-md-3 {\n    margin-bottom: 1rem !important; }\n  .ml-md-3 {\n    margin-left: 1rem !important; }\n  .mx-md-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-md-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-md-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-md-4 {\n    margin-top: 1.5rem !important; }\n  .mr-md-4 {\n    margin-right: 1.5rem !important; }\n  .mb-md-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-md-4 {\n    margin-left: 1.5rem !important; }\n  .mx-md-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-md-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-md-5 {\n    margin: 3rem 3rem !important; }\n  .mt-md-5 {\n    margin-top: 3rem !important; }\n  .mr-md-5 {\n    margin-right: 3rem !important; }\n  .mb-md-5 {\n    margin-bottom: 3rem !important; }\n  .ml-md-5 {\n    margin-left: 3rem !important; }\n  .mx-md-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-md-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-md-0 {\n    padding: 0 0 !important; }\n  .pt-md-0 {\n    padding-top: 0 !important; }\n  .pr-md-0 {\n    padding-right: 0 !important; }\n  .pb-md-0 {\n    padding-bottom: 0 !important; }\n  .pl-md-0 {\n    padding-left: 0 !important; }\n  .px-md-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-md-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-md-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-md-1 {\n    padding-top: 0.25rem !important; }\n  .pr-md-1 {\n    padding-right: 0.25rem !important; }\n  .pb-md-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-md-1 {\n    padding-left: 0.25rem !important; }\n  .px-md-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-md-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-md-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-md-2 {\n    padding-top: 0.5rem !important; }\n  .pr-md-2 {\n    padding-right: 0.5rem !important; }\n  .pb-md-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-md-2 {\n    padding-left: 0.5rem !important; }\n  .px-md-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-md-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-md-3 {\n    padding: 1rem 1rem !important; }\n  .pt-md-3 {\n    padding-top: 1rem !important; }\n  .pr-md-3 {\n    padding-right: 1rem !important; }\n  .pb-md-3 {\n    padding-bottom: 1rem !important; }\n  .pl-md-3 {\n    padding-left: 1rem !important; }\n  .px-md-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-md-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-md-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-md-4 {\n    padding-top: 1.5rem !important; }\n  .pr-md-4 {\n    padding-right: 1.5rem !important; }\n  .pb-md-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-md-4 {\n    padding-left: 1.5rem !important; }\n  .px-md-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-md-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-md-5 {\n    padding: 3rem 3rem !important; }\n  .pt-md-5 {\n    padding-top: 3rem !important; }\n  .pr-md-5 {\n    padding-right: 3rem !important; }\n  .pb-md-5 {\n    padding-bottom: 3rem !important; }\n  .pl-md-5 {\n    padding-left: 3rem !important; }\n  .px-md-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-md-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-md-auto {\n    margin: auto !important; }\n  .mt-md-auto {\n    margin-top: auto !important; }\n  .mr-md-auto {\n    margin-right: auto !important; }\n  .mb-md-auto {\n    margin-bottom: auto !important; }\n  .ml-md-auto {\n    margin-left: auto !important; }\n  .mx-md-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-md-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n@media (min-width: 992px) {\n  .m-lg-0 {\n    margin: 0 0 !important; }\n  .mt-lg-0 {\n    margin-top: 0 !important; }\n  .mr-lg-0 {\n    margin-right: 0 !important; }\n  .mb-lg-0 {\n    margin-bottom: 0 !important; }\n  .ml-lg-0 {\n    margin-left: 0 !important; }\n  .mx-lg-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-lg-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-lg-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-lg-1 {\n    margin-top: 0.25rem !important; }\n  .mr-lg-1 {\n    margin-right: 0.25rem !important; }\n  .mb-lg-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-lg-1 {\n    margin-left: 0.25rem !important; }\n  .mx-lg-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-lg-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-lg-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-lg-2 {\n    margin-top: 0.5rem !important; }\n  .mr-lg-2 {\n    margin-right: 0.5rem !important; }\n  .mb-lg-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-lg-2 {\n    margin-left: 0.5rem !important; }\n  .mx-lg-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-lg-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-lg-3 {\n    margin: 1rem 1rem !important; }\n  .mt-lg-3 {\n    margin-top: 1rem !important; }\n  .mr-lg-3 {\n    margin-right: 1rem !important; }\n  .mb-lg-3 {\n    margin-bottom: 1rem !important; }\n  .ml-lg-3 {\n    margin-left: 1rem !important; }\n  .mx-lg-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-lg-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-lg-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-lg-4 {\n    margin-top: 1.5rem !important; }\n  .mr-lg-4 {\n    margin-right: 1.5rem !important; }\n  .mb-lg-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-lg-4 {\n    margin-left: 1.5rem !important; }\n  .mx-lg-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-lg-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-lg-5 {\n    margin: 3rem 3rem !important; }\n  .mt-lg-5 {\n    margin-top: 3rem !important; }\n  .mr-lg-5 {\n    margin-right: 3rem !important; }\n  .mb-lg-5 {\n    margin-bottom: 3rem !important; }\n  .ml-lg-5 {\n    margin-left: 3rem !important; }\n  .mx-lg-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-lg-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-lg-0 {\n    padding: 0 0 !important; }\n  .pt-lg-0 {\n    padding-top: 0 !important; }\n  .pr-lg-0 {\n    padding-right: 0 !important; }\n  .pb-lg-0 {\n    padding-bottom: 0 !important; }\n  .pl-lg-0 {\n    padding-left: 0 !important; }\n  .px-lg-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-lg-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-lg-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-lg-1 {\n    padding-top: 0.25rem !important; }\n  .pr-lg-1 {\n    padding-right: 0.25rem !important; }\n  .pb-lg-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-lg-1 {\n    padding-left: 0.25rem !important; }\n  .px-lg-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-lg-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-lg-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-lg-2 {\n    padding-top: 0.5rem !important; }\n  .pr-lg-2 {\n    padding-right: 0.5rem !important; }\n  .pb-lg-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-lg-2 {\n    padding-left: 0.5rem !important; }\n  .px-lg-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-lg-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-lg-3 {\n    padding: 1rem 1rem !important; }\n  .pt-lg-3 {\n    padding-top: 1rem !important; }\n  .pr-lg-3 {\n    padding-right: 1rem !important; }\n  .pb-lg-3 {\n    padding-bottom: 1rem !important; }\n  .pl-lg-3 {\n    padding-left: 1rem !important; }\n  .px-lg-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-lg-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-lg-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-lg-4 {\n    padding-top: 1.5rem !important; }\n  .pr-lg-4 {\n    padding-right: 1.5rem !important; }\n  .pb-lg-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-lg-4 {\n    padding-left: 1.5rem !important; }\n  .px-lg-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-lg-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-lg-5 {\n    padding: 3rem 3rem !important; }\n  .pt-lg-5 {\n    padding-top: 3rem !important; }\n  .pr-lg-5 {\n    padding-right: 3rem !important; }\n  .pb-lg-5 {\n    padding-bottom: 3rem !important; }\n  .pl-lg-5 {\n    padding-left: 3rem !important; }\n  .px-lg-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-lg-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-lg-auto {\n    margin: auto !important; }\n  .mt-lg-auto {\n    margin-top: auto !important; }\n  .mr-lg-auto {\n    margin-right: auto !important; }\n  .mb-lg-auto {\n    margin-bottom: auto !important; }\n  .ml-lg-auto {\n    margin-left: auto !important; }\n  .mx-lg-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-lg-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n@media (min-width: 1200px) {\n  .m-xl-0 {\n    margin: 0 0 !important; }\n  .mt-xl-0 {\n    margin-top: 0 !important; }\n  .mr-xl-0 {\n    margin-right: 0 !important; }\n  .mb-xl-0 {\n    margin-bottom: 0 !important; }\n  .ml-xl-0 {\n    margin-left: 0 !important; }\n  .mx-xl-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-xl-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-xl-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-xl-1 {\n    margin-top: 0.25rem !important; }\n  .mr-xl-1 {\n    margin-right: 0.25rem !important; }\n  .mb-xl-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-xl-1 {\n    margin-left: 0.25rem !important; }\n  .mx-xl-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-xl-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-xl-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-xl-2 {\n    margin-top: 0.5rem !important; }\n  .mr-xl-2 {\n    margin-right: 0.5rem !important; }\n  .mb-xl-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-xl-2 {\n    margin-left: 0.5rem !important; }\n  .mx-xl-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-xl-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-xl-3 {\n    margin: 1rem 1rem !important; }\n  .mt-xl-3 {\n    margin-top: 1rem !important; }\n  .mr-xl-3 {\n    margin-right: 1rem !important; }\n  .mb-xl-3 {\n    margin-bottom: 1rem !important; }\n  .ml-xl-3 {\n    margin-left: 1rem !important; }\n  .mx-xl-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-xl-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-xl-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-xl-4 {\n    margin-top: 1.5rem !important; }\n  .mr-xl-4 {\n    margin-right: 1.5rem !important; }\n  .mb-xl-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-xl-4 {\n    margin-left: 1.5rem !important; }\n  .mx-xl-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-xl-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-xl-5 {\n    margin: 3rem 3rem !important; }\n  .mt-xl-5 {\n    margin-top: 3rem !important; }\n  .mr-xl-5 {\n    margin-right: 3rem !important; }\n  .mb-xl-5 {\n    margin-bottom: 3rem !important; }\n  .ml-xl-5 {\n    margin-left: 3rem !important; }\n  .mx-xl-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-xl-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-xl-0 {\n    padding: 0 0 !important; }\n  .pt-xl-0 {\n    padding-top: 0 !important; }\n  .pr-xl-0 {\n    padding-right: 0 !important; }\n  .pb-xl-0 {\n    padding-bottom: 0 !important; }\n  .pl-xl-0 {\n    padding-left: 0 !important; }\n  .px-xl-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-xl-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-xl-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-xl-1 {\n    padding-top: 0.25rem !important; }\n  .pr-xl-1 {\n    padding-right: 0.25rem !important; }\n  .pb-xl-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-xl-1 {\n    padding-left: 0.25rem !important; }\n  .px-xl-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-xl-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-xl-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-xl-2 {\n    padding-top: 0.5rem !important; }\n  .pr-xl-2 {\n    padding-right: 0.5rem !important; }\n  .pb-xl-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-xl-2 {\n    padding-left: 0.5rem !important; }\n  .px-xl-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-xl-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-xl-3 {\n    padding: 1rem 1rem !important; }\n  .pt-xl-3 {\n    padding-top: 1rem !important; }\n  .pr-xl-3 {\n    padding-right: 1rem !important; }\n  .pb-xl-3 {\n    padding-bottom: 1rem !important; }\n  .pl-xl-3 {\n    padding-left: 1rem !important; }\n  .px-xl-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-xl-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-xl-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-xl-4 {\n    padding-top: 1.5rem !important; }\n  .pr-xl-4 {\n    padding-right: 1.5rem !important; }\n  .pb-xl-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-xl-4 {\n    padding-left: 1.5rem !important; }\n  .px-xl-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-xl-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-xl-5 {\n    padding: 3rem 3rem !important; }\n  .pt-xl-5 {\n    padding-top: 3rem !important; }\n  .pr-xl-5 {\n    padding-right: 3rem !important; }\n  .pb-xl-5 {\n    padding-bottom: 3rem !important; }\n  .pl-xl-5 {\n    padding-left: 3rem !important; }\n  .px-xl-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-xl-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-xl-auto {\n    margin: auto !important; }\n  .mt-xl-auto {\n    margin-top: auto !important; }\n  .mr-xl-auto {\n    margin-right: auto !important; }\n  .mb-xl-auto {\n    margin-bottom: auto !important; }\n  .ml-xl-auto {\n    margin-left: auto !important; }\n  .mx-xl-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-xl-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n.text-justify {\n  text-align: justify !important; }\n\n.text-nowrap {\n  white-space: nowrap !important; }\n\n.text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.text-left {\n  text-align: left !important; }\n\n.text-right {\n  text-align: right !important; }\n\n.text-center {\n  text-align: center !important; }\n\n@media (min-width: 576px) {\n  .text-sm-left {\n    text-align: left !important; }\n  .text-sm-right {\n    text-align: right !important; }\n  .text-sm-center {\n    text-align: center !important; } }\n\n@media (min-width: 768px) {\n  .text-md-left {\n    text-align: left !important; }\n  .text-md-right {\n    text-align: right !important; }\n  .text-md-center {\n    text-align: center !important; } }\n\n@media (min-width: 992px) {\n  .text-lg-left {\n    text-align: left !important; }\n  .text-lg-right {\n    text-align: right !important; }\n  .text-lg-center {\n    text-align: center !important; } }\n\n@media (min-width: 1200px) {\n  .text-xl-left {\n    text-align: left !important; }\n  .text-xl-right {\n    text-align: right !important; }\n  .text-xl-center {\n    text-align: center !important; } }\n\n.text-lowercase {\n  text-transform: lowercase !important; }\n\n.text-uppercase {\n  text-transform: uppercase !important; }\n\n.text-capitalize {\n  text-transform: capitalize !important; }\n\n.font-weight-normal {\n  font-weight: normal; }\n\n.font-weight-bold {\n  font-weight: bold; }\n\n.font-italic {\n  font-style: italic; }\n\n.text-white {\n  color: #fff !important; }\n\n.text-muted {\n  color: #636c72 !important; }\n\na.text-muted:focus, a.text-muted:hover {\n  color: #4b5257 !important; }\n\n.text-primary {\n  color: #0275d8 !important; }\n\na.text-primary:focus, a.text-primary:hover {\n  color: #025aa5 !important; }\n\n.text-success {\n  color: #5cb85c !important; }\n\na.text-success:focus, a.text-success:hover {\n  color: #449d44 !important; }\n\n.text-info {\n  color: #5bc0de !important; }\n\na.text-info:focus, a.text-info:hover {\n  color: #31b0d5 !important; }\n\n.text-warning {\n  color: #f0ad4e !important; }\n\na.text-warning:focus, a.text-warning:hover {\n  color: #ec971f !important; }\n\n.text-danger {\n  color: #d9534f !important; }\n\na.text-danger:focus, a.text-danger:hover {\n  color: #c9302c !important; }\n\n.text-gray-dark {\n  color: #292b2c !important; }\n\na.text-gray-dark:focus, a.text-gray-dark:hover {\n  color: #101112 !important; }\n\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0; }\n\n.invisible {\n  visibility: hidden !important; }\n\n.hidden-xs-up {\n  display: none !important; }\n\n@media (max-width: 575px) {\n  .hidden-xs-down {\n    display: none !important; } }\n\n@media (min-width: 576px) {\n  .hidden-sm-up {\n    display: none !important; } }\n\n@media (max-width: 767px) {\n  .hidden-sm-down {\n    display: none !important; } }\n\n@media (min-width: 768px) {\n  .hidden-md-up {\n    display: none !important; } }\n\n@media (max-width: 991px) {\n  .hidden-md-down {\n    display: none !important; } }\n\n@media (min-width: 992px) {\n  .hidden-lg-up {\n    display: none !important; } }\n\n@media (max-width: 1199px) {\n  .hidden-lg-down {\n    display: none !important; } }\n\n@media (min-width: 1200px) {\n  .hidden-xl-up {\n    display: none !important; } }\n\n.hidden-xl-down {\n  display: none !important; }\n\n.visible-print-block {\n  display: none !important; }\n  @media print {\n    .visible-print-block {\n      display: block !important; } }\n\n.visible-print-inline {\n  display: none !important; }\n  @media print {\n    .visible-print-inline {\n      display: inline !important; } }\n\n.visible-print-inline-block {\n  display: none !important; }\n  @media print {\n    .visible-print-inline-block {\n      display: inline-block !important; } }\n\n@media print {\n  .hidden-print {\n    display: none !important; } }\n\n.weather {\n  color: #fff; }\n  .weather > div {\n    padding-bottom: 20px; }\n  .weather h1 {\n    font-weight: 100; }\n  .weather h2 {\n    font-weight: 800;\n    text-transform: uppercase;\n    text-align: left;\n    font-size: 24px; }\n  .weather .toggle li {\n    color: #43cff3;\n    cursor: pointer;\n    float: left;\n    padding-left: 5px; }\n    .weather .toggle li.active {\n      cursor: default;\n      color: #fff; }\n  .weather .header {\n    position: relative; }\n    .weather .header .toggle {\n      position: absolute;\n      right: 0;\n      bottom: 0; }\n  .weather .card {\n    padding: .5%;\n    background: transparent;\n    border: 0 none; }\n    .weather .card .container {\n      padding: 2%;\n      border-radius: 10px;\n      border: 0 none;\n      background: -webkit-linear-gradient(to bottom, #e57263, #2dcdf8);\n      background: linear-gradient(to bottom, #e57263, #2dcdf8);\n      padding: 2%;\n      color: #fff; }\n      .weather .card .container label {\n        float: left;\n        width: 100%;\n        margin: 0; }\n        .weather .card .container label.title {\n          text-transform: uppercase; }\n        .weather .card .container label.number {\n          font-size: 90px;\n          font-weight: 100;\n          text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.2); }\n  .weather .day .card {\n    float: left; }\n    .weather .day .card .container label.number {\n      font-size: 45px; }\n  .weather input {\n    box-shadow: none;\n    border-radius: 0;\n    background: transparent;\n    border: 0 none;\n    border-bottom: 1px solid #43cff3;\n    color: #fff; }\n    .weather input:focus {\n      border-color: #e56363;\n      outline: 0;\n      -webkit-box-shadow: none;\n      box-shadow: none;\n      background: transparent; }\n  @media screen and (max-width: 768px) {\n    .weather h2 {\n      text-align: center; }\n    .weather .card {\n      width: 50% !important; }\n      .weather .card .container {\n        margin: 0 auto;\n        width: 100%; } }\n  @media screen and (max-width: 414px) {\n    .weather .card {\n      width: 100% !important; } }\n\nhtml {\n  min-height: 100%;\n  position: relative;\n  background: -webkit-linear-gradient(to bottom, #3a404e, #201d28);\n  background: linear-gradient(to bottom, #3a404e, #201d28); }\n\nbody {\n  margin-bottom: 0px;\n  font-family: 'Roboto', sans-serif;\n  background: transparent;\n  color: #fff; }\n\n.navbar {\n  background: transparent; }\n  .navbar .navbar-brand {\n    color: #fff; }\n  .navbar a, .navbar .nav-link {\n    color: #fff; }\n\n.btn, .badge-pill {\n  cursor: pointer; }\n","// scss-lint:disable QualifyingElement\n\n// Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css\n\n// ==========================================================================\n// Print styles.\n// Inlined to avoid the additional HTTP request:\n// http://www.phpied.com/delay-loading-your-print-css/\n// ==========================================================================\n\n@if $enable-print-styles {\n  @media print {\n    *,\n    *::before,\n    *::after,\n    p::first-letter,\n    div::first-letter,\n    blockquote::first-letter,\n    li::first-letter,\n    p::first-line,\n    div::first-line,\n    blockquote::first-line,\n    li::first-line {\n      // Bootstrap specific; comment out `color` and `background`\n      //color: #000 !important; // Black prints faster:\n                                //   http://www.sanbeiji.com/archives/953\n      text-shadow: none !important;\n      //background: transparent !important;\n      box-shadow: none !important;\n    }\n\n    a,\n    a:visited {\n      text-decoration: underline;\n    }\n\n    // Bootstrap specific; comment the following selector out\n    //a[href]::after {\n    //  content: \" (\" attr(href) \")\";\n    //}\n\n    abbr[title]::after {\n      content: \" (\" attr(title) \")\";\n    }\n\n    // Bootstrap specific; comment the following selector out\n    //\n    // Don't show links that are fragment identifiers,\n    // or use the `javascript:` pseudo protocol\n    //\n\n    //a[href^=\"#\"]::after,\n    //a[href^=\"javascript:\"]::after {\n    // content: \"\";\n    //}\n\n    pre {\n      white-space: pre-wrap !important;\n    }\n    pre,\n    blockquote {\n      border: $border-width solid #999;   // Bootstrap custom code; using `$border-width` instead of 1px\n      page-break-inside: avoid;\n    }\n\n    //\n    // Printing Tables:\n    // http://css-discuss.incutio.com/wiki/Printing_Tables\n    //\n\n    thead {\n      display: table-header-group;\n    }\n\n    tr,\n    img {\n      page-break-inside: avoid;\n    }\n\n    p,\n    h2,\n    h3 {\n      orphans: 3;\n      widows: 3;\n    }\n\n    h2,\n    h3 {\n      page-break-after: avoid;\n    }\n\n    // Bootstrap specific changes start\n\n    // Bootstrap components\n    .navbar {\n      display: none;\n    }\n    .badge {\n      border: $border-width solid #000;\n    }\n\n    .table {\n      border-collapse: collapse !important;\n\n      td,\n      th {\n        background-color: #fff !important;\n      }\n    }\n    .table-bordered {\n      th,\n      td {\n        border: 1px solid #ddd !important;\n      }\n    }\n\n    // Bootstrap specific changes end\n  }\n}\n","// scss-lint:disable QualifyingElement, DuplicateProperty\n\n// Reboot\n//\n// Global resets to common HTML elements and more for easier usage by Bootstrap.\n// Adds additional rules on top of Normalize.css, including several overrides.\n\n\n// Reset the box-sizing\n//\n// Change from `box-sizing: content-box` to `border-box` so that when you add\n// `padding` or `border`s to an element, the overall declared `width` does not\n// change. For example, `width: 100px;` will always be `100px` despite the\n// `border: 10px solid red;` and `padding: 20px;`.\n//\n// Heads up! This reset may cause conflicts with some third-party widgets. For\n// recommendations on resolving such conflicts, see\n// https://getbootstrap.com/getting-started/#third-box-sizing.\n//\n// Credit: https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/\n\nhtml {\n  box-sizing: border-box;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: inherit;\n}\n\n\n// Make viewport responsive\n//\n// @viewport is needed because IE 10+ doesn't honor <meta name=\"viewport\"> in\n// some cases. See https://timkadlec.com/2012/10/ie10-snap-mode-and-responsive-design/.\n// Eventually @viewport will replace <meta name=\"viewport\">.\n//\n// However, `device-width` is broken on IE 10 on Windows (Phone) 8,\n// (see https://timkadlec.com/2013/01/windows-phone-8-and-device-width/ and https://github.com/twbs/bootstrap/issues/10497)\n// and the fix for that involves a snippet of JavaScript to sniff the user agent\n// and apply some conditional CSS.\n//\n// See https://getbootstrap.com/getting-started/#support-ie10-width for the relevant hack.\n//\n// Wrap `@viewport` with `@at-root` for when folks do a nested import (e.g.,\n// `.class-name { @import \"bootstrap\"; }`).\n@at-root {\n  @-ms-viewport { width: device-width; }\n}\n\n\n//\n// Reset HTML, body, and more\n//\n\nhtml {\n  // We assume no initial pixel `font-size` for accessibility reasons. This\n  // allows web visitors to customize their browser default font-size, making\n  // your project more inclusive and accessible to everyone.\n\n  // As a side-effect of setting the @viewport above,\n  // IE11 & Edge make the scrollbar overlap the content and automatically hide itself when not in use.\n  // Unfortunately, the auto-showing of the scrollbar is sometimes too sensitive,\n  // thus making it hard to click on stuff near the right edge of the page.\n  // So we add this style to force IE11 & Edge to use a \"normal\", non-overlapping, non-auto-hiding scrollbar.\n  // See https://github.com/twbs/bootstrap/issues/18543\n  // and https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7165383/\n  -ms-overflow-style: scrollbar;\n\n  // Changes the default tap highlight to be completely transparent in iOS.\n  -webkit-tap-highlight-color: rgba(0,0,0,0);\n}\n\nbody {\n  font-family: $font-family-base;\n  font-size: $font-size-base;\n  font-weight: $font-weight-base;\n  line-height: $line-height-base;\n  // Go easy on the eyes and use something other than `#000` for text\n  color: $body-color;\n  // By default, `<body>` has no `background-color` so we set one as a best practice.\n  background-color: $body-bg;\n}\n\n// Suppress the focus outline on elements that cannot be accessed via keyboard.\n// This prevents an unwanted focus outline from appearing around elements that\n// might still respond to pointer events.\n//\n// Credit: https://github.com/suitcss/base\n[tabindex=\"-1\"]:focus {\n  outline: none !important;\n}\n\n\n//\n// Typography\n//\n\n// Remove top margins from headings\n//\n// By default, `<h1>`-`<h6>` all receive top and bottom margins. We nuke the top\n// margin for easier control within type scales as it avoids margin collapsing.\nh1, h2, h3, h4, h5, h6 {\n  margin-top: 0;\n  margin-bottom: .5rem;\n}\n\n// Reset margins on paragraphs\n//\n// Similarly, the top margin on `<p>`s get reset. However, we also reset the\n// bottom margin to use `rem` units instead of `em`.\np {\n  margin-top: 0;\n  margin-bottom: 1rem;\n}\n\n// Abbreviations\nabbr[title],\n// Add data-* attribute to help out our tooltip plugin, per https://github.com/twbs/bootstrap/issues/5257\nabbr[data-original-title] {\n  cursor: help;\n}\n\naddress {\n  margin-bottom: 1rem;\n  font-style: normal;\n  line-height: inherit;\n}\n\nol,\nul,\ndl {\n  margin-top: 0;\n  margin-bottom: 1rem;\n}\n\nol ol,\nul ul,\nol ul,\nul ol {\n  margin-bottom: 0;\n}\n\ndt {\n  font-weight: $dt-font-weight;\n}\n\ndd {\n  margin-bottom: .5rem;\n  margin-left: 0; // Undo browser default\n}\n\nblockquote {\n  margin: 0 0 1rem;\n}\n\n\n//\n// Links\n//\n\na {\n  color: $link-color;\n  text-decoration: $link-decoration;\n\n  @include hover-focus {\n    color: $link-hover-color;\n    text-decoration: $link-hover-decoration;\n  }\n}\n\n// And undo these styles for placeholder links/named anchors (without href)\n// which have not been made explicitly keyboard-focusable (without tabindex).\n// It would be more straightforward to just use a[href] in previous block, but that\n// causes specificity issues in many other styles that are too complex to fix.\n// See https://github.com/twbs/bootstrap/issues/19402\n\na:not([href]):not([tabindex]) {\n  color: inherit;\n  text-decoration: none;\n\n  @include hover-focus {\n    color: inherit;\n    text-decoration: none;\n  }\n\n  &:focus {\n    outline: 0;\n  }\n}\n\n\n//\n// Code\n//\n\npre {\n  // Remove browser default top margin\n  margin-top: 0;\n  // Reset browser default of `1em` to use `rem`s\n  margin-bottom: 1rem;\n  // Normalize v4 removed this property, causing `<pre>` content to break out of wrapping code snippets\n  overflow: auto;\n}\n\n\n//\n// Figures\n//\n\nfigure {\n  // Normalize adds `margin` to `figure`s as browsers apply it inconsistently.\n  // We reset that to create a better flow in-page.\n  margin: 0 0 1rem;\n}\n\n\n//\n// Images\n//\n\nimg {\n  // By default, `<img>`s are `inline-block`. This assumes that, and vertically\n  // centers them. This won't apply should you reset them to `block` level.\n  vertical-align: middle;\n  // Note: `<img>`s are deliberately not made responsive by default.\n  // For the rationale behind this, see the comments on the `.img-fluid` class.\n}\n\n\n// iOS \"clickable elements\" fix for role=\"button\"\n//\n// Fixes \"clickability\" issue (and more generally, the firing of events such as focus as well)\n// for traditionally non-focusable elements with role=\"button\"\n// see https://developer.mozilla.org/en-US/docs/Web/Events/click#Safari_Mobile\n\n[role=\"button\"] {\n  cursor: pointer;\n}\n\n\n// Avoid 300ms click delay on touch devices that support the `touch-action` CSS property.\n//\n// In particular, unlike most other browsers, IE11+Edge on Windows 10 on touch devices and IE Mobile 10-11\n// DON'T remove the click delay when `<meta name=\"viewport\" content=\"width=device-width\">` is present.\n// However, they DO support removing the click delay via `touch-action: manipulation`.\n// See:\n// * https://v4-alpha.getbootstrap.com/content/reboot/#click-delay-optimization-for-touch\n// * http://caniuse.com/#feat=css-touch-action\n// * https://patrickhlauke.github.io/touch/tests/results/#suppressing-300ms-delay\n\na,\narea,\nbutton,\n[role=\"button\"],\ninput,\nlabel,\nselect,\nsummary,\ntextarea {\n  touch-action: manipulation;\n}\n\n\n//\n// Tables\n//\n\ntable {\n  // No longer part of Normalize since v4\n  border-collapse: collapse;\n  // Reset for nesting within parents with `background-color`.\n  background-color: $table-bg;\n}\n\ncaption {\n  padding-top: $table-cell-padding;\n  padding-bottom: $table-cell-padding;\n  color: $text-muted;\n  text-align: left;\n  caption-side: bottom;\n}\n\nth {\n  // Centered by default, but left-align-ed to match the `td`s below.\n  text-align: left;\n}\n\n\n//\n// Forms\n//\n\nlabel {\n  // Allow labels to use `margin` for spacing.\n  display: inline-block;\n  margin-bottom: .5rem;\n}\n\n// Work around a Firefox/IE bug where the transparent `button` background\n// results in a loss of the default `button` focus styles.\n//\n// Credit: https://github.com/suitcss/base/\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n}\n\ninput,\nbutton,\nselect,\ntextarea {\n  // Normalize includes `font: inherit;`, so `font-family`. `font-size`, etc are\n  // properly inherited. However, `line-height` isn't inherited there.\n  line-height: inherit;\n}\n\ninput[type=\"radio\"],\ninput[type=\"checkbox\"] {\n  // Apply a disabled cursor for radios and checkboxes.\n  //\n  // Note: Neither radios nor checkboxes can be readonly.\n  &:disabled {\n    cursor: $cursor-disabled;\n  }\n}\n\n\ninput[type=\"date\"],\ninput[type=\"time\"],\ninput[type=\"datetime-local\"],\ninput[type=\"month\"] {\n  // Remove the default appearance of temporal inputs to avoid a Mobile Safari\n  // bug where setting a custom line-height prevents text from being vertically\n  // centered within the input.\n  // See https://bugs.webkit.org/show_bug.cgi?id=139848\n  // and https://github.com/twbs/bootstrap/issues/11266\n  -webkit-appearance: listbox;\n}\n\ntextarea {\n  // Textareas should really only resize vertically so they don't break their (horizontal) containers.\n  resize: vertical;\n}\n\nfieldset {\n  // Browsers set a default `min-width: min-content;` on fieldsets,\n  // unlike e.g. `<div>`s, which have `min-width: 0;` by default.\n  // So we reset that to ensure fieldsets behave more like a standard block element.\n  // See https://github.com/twbs/bootstrap/issues/12359\n  // and https://html.spec.whatwg.org/multipage/#the-fieldset-and-legend-elements\n  min-width: 0;\n  // Reset the default outline behavior of fieldsets so they don't affect page layout.\n  padding: 0;\n  margin: 0;\n  border: 0;\n}\n\nlegend {\n  // Reset the entire legend element to match the `fieldset`\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: .5rem;\n  font-size: 1.5rem;\n  line-height: inherit;\n}\n\ninput[type=\"search\"] {\n  // This overrides the extra rounded corners on search inputs in iOS so that our\n  // `.form-control` class can properly style them. Note that this cannot simply\n  // be added to `.form-control` as it's not specific enough. For details, see\n  // https://github.com/twbs/bootstrap/issues/11586.\n  -webkit-appearance: none;\n}\n\n// todo: needed?\noutput {\n  display: inline-block;\n//  font-size: $font-size-base;\n//  line-height: $line-height;\n//  color: $input-color;\n}\n\n// Always hide an element with the `hidden` HTML attribute (from PureCSS).\n[hidden] {\n  display: none !important;\n}\n","// Variables\n//\n// Copy settings from this file into the provided `_custom.scss` to override\n// the Bootstrap defaults without modifying key, versioned files.\n\n\n// Table of Contents\n//\n// Colors\n// Options\n// Spacing\n// Body\n// Links\n// Grid breakpoints\n// Grid containers\n// Grid columns\n// Fonts\n// Components\n// Tables\n// Buttons\n// Forms\n// Dropdowns\n// Z-index master list\n// Navbar\n// Navs\n// Pagination\n// Jumbotron\n// Form states and alerts\n// Cards\n// Tooltips\n// Popovers\n// Badges\n// Modals\n// Alerts\n// Progress bars\n// List group\n// Image thumbnails\n// Figures\n// Breadcrumbs\n// Carousel\n// Close\n// Code\n\n@mixin _assert-ascending($map, $map-name) {\n  $prev-key: null;\n  $prev-num: null;\n  @each $key, $num in $map {\n    @if $prev-num == null {\n      // Do nothing\n    } @else if not comparable($prev-num, $num) {\n      @warn \"Potentially invalid value for #{$map-name}: This map must be in ascending order, but key '#{$key}' has value #{$num} whose unit makes it incomparable to #{$prev-num}, the value of the previous key '#{$prev-key}' !\";\n    } @else if $prev-num >= $num {\n      @warn \"Invalid value for #{$map-name}: This map must be in ascending order, but key '#{$key}' has value #{$num} which isn't greater than #{$prev-num}, the value of the previous key '#{$prev-key}' !\";\n    }\n    $prev-key: $key;\n    $prev-num: $num;\n  }\n}\n\n// Replace `$search` with `$replace` in `$string`\n// @author Hugo Giraudel\n// @param {String} $string - Initial string\n// @param {String} $search - Substring to replace\n// @param {String} $replace ('') - New value\n// @return {String} - Updated string\n@function str-replace($string, $search, $replace: \"\") {\n  $index: str-index($string, $search);\n\n  @if $index {\n    @return str-slice($string, 1, $index - 1) + $replace + str-replace(str-slice($string, $index + str-length($search)), $search, $replace);\n  }\n\n  @return $string;\n}\n\n@mixin _assert-starts-at-zero($map) {\n  $values: map-values($map);\n  $first-value: nth($values, 1);\n  @if $first-value != 0 {\n    @warn \"First breakpoint in `$grid-breakpoints` must start at 0, but starts at #{$first-value}.\";\n  }\n}\n\n\n// General variable structure\n//\n// Variable format should follow the `$component-modifier-state-property` order.\n\n\n// Colors\n//\n// Grayscale and brand colors for use across Bootstrap.\n\n// Start with assigning color names to specific hex values.\n$white:  #fff !default;\n$black:  #000 !default;\n$red:    #d9534f !default;\n$orange: #f0ad4e !default;\n$yellow: #ffd500 !default;\n$green:  #5cb85c !default;\n$blue:   #0275d8 !default;\n$teal:   #5bc0de !default;\n$pink:   #ff5b77 !default;\n$purple: #613d7c !default;\n\n// Create grayscale\n$gray-dark:                 #292b2c !default;\n$gray:                      #464a4c !default;\n$gray-light:                #636c72 !default;\n$gray-lighter:              #eceeef !default;\n$gray-lightest:             #f7f7f9 !default;\n\n// Reassign color vars to semantic color scheme\n$brand-primary:             $blue !default;\n$brand-success:             $green !default;\n$brand-info:                $teal !default;\n$brand-warning:             $orange !default;\n$brand-danger:              $red !default;\n$brand-inverse:             $gray-dark !default;\n\n\n// Options\n//\n// Quickly modify global styling by enabling or disabling optional features.\n\n$enable-rounded:            true !default;\n$enable-shadows:            false !default;\n$enable-gradients:          false !default;\n$enable-transitions:        true !default;\n$enable-hover-media-query:  false !default;\n$enable-grid-classes:       true !default;\n$enable-print-styles:       true !default;\n\n\n// Spacing\n//\n// Control the default styling of most Bootstrap elements by modifying these\n// variables. Mostly focused on spacing.\n// You can add more entries to the $spacers map, should you need more variation.\n\n$spacer:   1rem !default;\n$spacer-x: $spacer !default;\n$spacer-y: $spacer !default;\n$spacers: (\n  0: (\n    x: 0,\n    y: 0\n  ),\n  1: (\n    x: ($spacer-x * .25),\n    y: ($spacer-y * .25)\n  ),\n  2: (\n    x: ($spacer-x * .5),\n    y: ($spacer-y * .5)\n  ),\n  3: (\n    x: $spacer-x,\n    y: $spacer-y\n  ),\n  4: (\n    x: ($spacer-x * 1.5),\n    y: ($spacer-y * 1.5)\n  ),\n  5: (\n    x: ($spacer-x * 3),\n    y: ($spacer-y * 3)\n  )\n) !default;\n$border-width: 1px !default;\n\n// This variable affects the `.h-*` and `.w-*` classes.\n$sizes: (\n  25: 25%,\n  50: 50%,\n  75: 75%,\n  100: 100%\n) !default;\n\n// Body\n//\n// Settings for the `<body>` element.\n\n$body-bg:       $white !default;\n$body-color:    $gray-dark !default;\n$inverse-bg:    $gray-dark !default;\n$inverse-color: $gray-lighter !default;\n\n\n// Links\n//\n// Style anchor elements.\n\n$link-color:            $brand-primary !default;\n$link-decoration:       none !default;\n$link-hover-color:      darken($link-color, 15%) !default;\n$link-hover-decoration: underline !default;\n\n\n// Grid breakpoints\n//\n// Define the minimum dimensions at which your layout will change,\n// adapting to different screen sizes, for use in media queries.\n\n$grid-breakpoints: (\n  xs: 0,\n  sm: 576px,\n  md: 768px,\n  lg: 992px,\n  xl: 1200px\n) !default;\n@include _assert-ascending($grid-breakpoints, \"$grid-breakpoints\");\n@include _assert-starts-at-zero($grid-breakpoints);\n\n\n// Grid containers\n//\n// Define the maximum width of `.container` for different screen sizes.\n\n$container-max-widths: (\n  sm: 540px,\n  md: 720px,\n  lg: 960px,\n  xl: 1140px\n) !default;\n@include _assert-ascending($container-max-widths, \"$container-max-widths\");\n\n\n// Grid columns\n//\n// Set the number of columns and specify the width of the gutters.\n\n$grid-columns:               12 !default;\n$grid-gutter-width-base:     30px !default;\n$grid-gutter-widths: (\n  xs: $grid-gutter-width-base,\n  sm: $grid-gutter-width-base,\n  md: $grid-gutter-width-base,\n  lg: $grid-gutter-width-base,\n  xl: $grid-gutter-width-base\n) !default;\n\n// Fonts\n//\n// Font, line-height, and color for body text, headings, and more.\n\n$font-family-sans-serif: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif !default;\n$font-family-serif:      Georgia, \"Times New Roman\", Times, serif !default;\n$font-family-monospace:  Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace !default;\n$font-family-base:       $font-family-sans-serif !default;\n\n$font-size-base: 1rem !default; // Assumes the browser default, typically `16px`\n$font-size-lg:   1.25rem !default;\n$font-size-sm:   .875rem !default;\n$font-size-xs:   .75rem !default;\n\n$font-weight-normal: normal !default;\n$font-weight-bold: bold !default;\n\n$font-weight-base: $font-weight-normal !default;\n$line-height-base: 1.5 !default;\n\n$font-size-h1: 2.5rem !default;\n$font-size-h2: 2rem !default;\n$font-size-h3: 1.75rem !default;\n$font-size-h4: 1.5rem !default;\n$font-size-h5: 1.25rem !default;\n$font-size-h6: 1rem !default;\n\n$headings-margin-bottom: ($spacer / 2) !default;\n$headings-font-family:   inherit !default;\n$headings-font-weight:   500 !default;\n$headings-line-height:   1.1 !default;\n$headings-color:         inherit !default;\n\n$display1-size: 6rem !default;\n$display2-size: 5.5rem !default;\n$display3-size: 4.5rem !default;\n$display4-size: 3.5rem !default;\n\n$display1-weight:     300 !default;\n$display2-weight:     300 !default;\n$display3-weight:     300 !default;\n$display4-weight:     300 !default;\n$display-line-height: $headings-line-height !default;\n\n$lead-font-size:   1.25rem !default;\n$lead-font-weight: 300 !default;\n\n$small-font-size: 80% !default;\n\n$text-muted: $gray-light !default;\n\n$abbr-border-color: $gray-light !default;\n\n$blockquote-small-color:  $gray-light !default;\n$blockquote-font-size:    ($font-size-base * 1.25) !default;\n$blockquote-border-color: $gray-lighter !default;\n$blockquote-border-width: .25rem !default;\n\n$hr-border-color: rgba($black,.1) !default;\n$hr-border-width: $border-width !default;\n\n$mark-padding: .2em !default;\n\n$dt-font-weight: $font-weight-bold !default;\n\n$kbd-box-shadow:         inset 0 -.1rem 0 rgba($black,.25) !default;\n$nested-kbd-font-weight: $font-weight-bold !default;\n\n$list-inline-padding: 5px !default;\n\n\n// Components\n//\n// Define common padding and border radius sizes and more.\n\n$line-height-lg:         (4 / 3) !default;\n$line-height-sm:         1.5 !default;\n\n$border-radius:          .25rem !default;\n$border-radius-lg:       .3rem !default;\n$border-radius-sm:       .2rem !default;\n\n$component-active-color: $white !default;\n$component-active-bg:    $brand-primary !default;\n\n$caret-width:            .3em !default;\n\n$transition-base:        all .2s ease-in-out !default;\n$transition-fade:        opacity .15s linear !default;\n$transition-collapse:    height .35s ease !default;\n\n\n// Tables\n//\n// Customizes the `.table` component with basic values, each used across all table variations.\n\n$table-cell-padding:            .75rem !default;\n$table-sm-cell-padding:         .3rem !default;\n\n$table-bg:                      transparent !default;\n\n$table-inverse-bg:              $gray-dark !default;\n$table-inverse-color:           $body-bg !default;\n\n$table-bg-accent:               rgba($black,.05) !default;\n$table-bg-hover:                rgba($black,.075) !default;\n$table-bg-active:               $table-bg-hover !default;\n\n$table-head-bg:                 $gray-lighter !default;\n$table-head-color:              $gray !default;\n\n$table-border-width:            $border-width !default;\n$table-border-color:            $gray-lighter !default;\n\n\n// Buttons\n//\n// For each of Bootstrap's buttons, define text, background and border color.\n\n$btn-padding-x:                  1rem !default;\n$btn-padding-y:                  .5rem !default;\n$btn-line-height:                1.25 !default;\n$btn-font-weight:                $font-weight-normal !default;\n$btn-box-shadow:                 inset 0 1px 0 rgba($white,.15), 0 1px 1px rgba($black,.075) !default;\n$btn-focus-box-shadow:           0 0 0 2px rgba($brand-primary, .25) !default;\n$btn-active-box-shadow:          inset 0 3px 5px rgba($black,.125) !default;\n\n$btn-primary-color:              $white !default;\n$btn-primary-bg:                 $brand-primary !default;\n$btn-primary-border:             $btn-primary-bg !default;\n\n$btn-secondary-color:            $gray-dark !default;\n$btn-secondary-bg:               $white !default;\n$btn-secondary-border:           #ccc !default;\n\n$btn-info-color:                 $white !default;\n$btn-info-bg:                    $brand-info !default;\n$btn-info-border:                $btn-info-bg !default;\n\n$btn-success-color:              $white !default;\n$btn-success-bg:                 $brand-success !default;\n$btn-success-border:             $btn-success-bg !default;\n\n$btn-warning-color:              $white !default;\n$btn-warning-bg:                 $brand-warning !default;\n$btn-warning-border:             $btn-warning-bg !default;\n\n$btn-danger-color:               $white !default;\n$btn-danger-bg:                  $brand-danger !default;\n$btn-danger-border:              $btn-danger-bg !default;\n\n$btn-link-disabled-color:        $gray-light !default;\n\n$btn-padding-x-sm:               .5rem !default;\n$btn-padding-y-sm:               .25rem !default;\n\n$btn-padding-x-lg:               1.5rem !default;\n$btn-padding-y-lg:               .75rem !default;\n\n$btn-block-spacing-y:            .5rem !default;\n$btn-toolbar-margin:             .5rem !default;\n\n// Allows for customizing button radius independently from global border radius\n$btn-border-radius:              $border-radius !default;\n$btn-border-radius-lg:           $border-radius-lg !default;\n$btn-border-radius-sm:           $border-radius-sm !default;\n\n$btn-transition:                 all .2s ease-in-out !default;\n\n\n// Forms\n\n$input-padding-x:                .75rem !default;\n$input-padding-y:                .5rem !default;\n$input-line-height:              1.25 !default;\n\n$input-bg:                       $white !default;\n$input-bg-disabled:              $gray-lighter !default;\n\n$input-color:                    $gray !default;\n$input-border-color:             rgba($black,.15) !default;\n$input-btn-border-width:         $border-width !default; // For form controls and buttons\n$input-box-shadow:               inset 0 1px 1px rgba($black,.075) !default;\n\n$input-border-radius:            $border-radius !default;\n$input-border-radius-lg:         $border-radius-lg !default;\n$input-border-radius-sm:         $border-radius-sm !default;\n\n$input-bg-focus:                 $input-bg !default;\n$input-border-focus:             lighten($brand-primary, 25%) !default;\n$input-box-shadow-focus:         $input-box-shadow, rgba($input-border-focus, .6) !default;\n$input-color-focus:              $input-color !default;\n\n$input-color-placeholder:        $gray-light !default;\n\n$input-padding-x-sm:             .5rem !default;\n$input-padding-y-sm:             .25rem !default;\n\n$input-padding-x-lg:             1.5rem !default;\n$input-padding-y-lg:             .75rem !default;\n\n$input-height:                   (($font-size-base * $input-line-height) + ($input-padding-y * 2)) !default;\n$input-height-lg:                (($font-size-lg * $line-height-lg) + ($input-padding-y-lg * 2)) !default;\n$input-height-sm:                (($font-size-sm * $line-height-sm) + ($input-padding-y-sm * 2)) !default;\n\n$input-transition:               border-color ease-in-out .15s, box-shadow ease-in-out .15s !default;\n\n$form-text-margin-top:     .25rem !default;\n$form-feedback-margin-top: $form-text-margin-top !default;\n\n$form-check-margin-bottom:  .5rem !default;\n$form-check-input-gutter:   1.25rem !default;\n$form-check-input-margin-y: .25rem !default;\n$form-check-input-margin-x: .25rem !default;\n\n$form-check-inline-margin-x: .75rem !default;\n\n$form-group-margin-bottom:       $spacer-y !default;\n\n$input-group-addon-bg:           $gray-lighter !default;\n$input-group-addon-border-color: $input-border-color !default;\n\n$cursor-disabled:                not-allowed !default;\n\n$custom-control-gutter:   1.5rem !default;\n$custom-control-spacer-x: 1rem !default;\n$custom-control-spacer-y: .25rem !default;\n\n$custom-control-indicator-size:       1rem !default;\n$custom-control-indicator-margin-y:   (($line-height-base * 1rem) - $custom-control-indicator-size) / -2 !default;\n$custom-control-indicator-bg:         #ddd !default;\n$custom-control-indicator-bg-size:    50% 50% !default;\n$custom-control-indicator-box-shadow: inset 0 .25rem .25rem rgba($black,.1) !default;\n\n$custom-control-disabled-cursor:             $cursor-disabled !default;\n$custom-control-disabled-indicator-bg:       $gray-lighter !default;\n$custom-control-disabled-description-color:  $gray-light !default;\n\n$custom-control-checked-indicator-color:      $white !default;\n$custom-control-checked-indicator-bg:         $brand-primary !default;\n$custom-control-checked-indicator-box-shadow: none !default;\n\n$custom-control-focus-indicator-box-shadow: 0 0 0 1px $body-bg, 0 0 0 3px $brand-primary !default;\n\n$custom-control-active-indicator-color:      $white !default;\n$custom-control-active-indicator-bg:         lighten($brand-primary, 35%) !default;\n$custom-control-active-indicator-box-shadow: none !default;\n\n$custom-checkbox-radius: $border-radius !default;\n$custom-checkbox-checked-icon: str-replace(url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='#{$custom-control-checked-indicator-color}' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E\"), \"#\", \"%23\") !default;\n\n$custom-checkbox-indeterminate-bg: $brand-primary !default;\n$custom-checkbox-indeterminate-indicator-color: $custom-control-checked-indicator-color !default;\n$custom-checkbox-indeterminate-icon: str-replace(url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3E%3Cpath stroke='#{$custom-checkbox-indeterminate-indicator-color}' d='M0 2h4'/%3E%3C/svg%3E\"), \"#\", \"%23\") !default;\n$custom-checkbox-indeterminate-box-shadow: none !default;\n\n$custom-radio-radius: 50% !default;\n$custom-radio-checked-icon: str-replace(url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='#{$custom-control-checked-indicator-color}'/%3E%3C/svg%3E\"), \"#\", \"%23\") !default;\n\n$custom-select-padding-x:          .75rem  !default;\n$custom-select-padding-y:          .375rem !default;\n$custom-select-indicator-padding:   1rem !default; // Extra padding to account for the presence of the background-image based indicator\n$custom-select-line-height:         $input-line-height !default;\n$custom-select-color:               $input-color !default;\n$custom-select-disabled-color:      $gray-light !default;\n$custom-select-bg:            $white !default;\n$custom-select-disabled-bg:   $gray-lighter !default;\n$custom-select-bg-size:       8px 10px !default; // In pixels because image dimensions\n$custom-select-indicator-color: #333 !default;\n$custom-select-indicator:     str-replace(url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='#{$custom-select-indicator-color}' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E\"), \"#\", \"%23\") !default;\n$custom-select-border-width:  $input-btn-border-width !default;\n$custom-select-border-color:  $input-border-color !default;\n$custom-select-border-radius: $border-radius !default;\n\n$custom-select-focus-border-color: lighten($brand-primary, 25%) !default;\n$custom-select-focus-box-shadow:   inset 0 1px 2px rgba($black, .075), 0 0 5px rgba($custom-select-focus-border-color, .5) !default;\n\n$custom-select-sm-padding-y:  .2rem !default;\n$custom-select-sm-font-size:  75% !default;\n\n$custom-file-height:           2.5rem !default;\n$custom-file-width:            14rem !default;\n$custom-file-focus-box-shadow: 0 0 0 .075rem $white, 0 0 0 .2rem $brand-primary !default;\n\n$custom-file-padding-x:     .5rem !default;\n$custom-file-padding-y:     1rem !default;\n$custom-file-line-height:   1.5 !default;\n$custom-file-color:         $gray !default;\n$custom-file-bg:            $white !default;\n$custom-file-border-width:  $border-width !default;\n$custom-file-border-color:  $input-border-color !default;\n$custom-file-border-radius: $border-radius !default;\n$custom-file-box-shadow:    inset 0 .2rem .4rem rgba($black,.05) !default;\n$custom-file-button-color:  $custom-file-color !default;\n$custom-file-button-bg:     $gray-lighter !default;\n$custom-file-text: (\n  placeholder: (\n    en: \"Choose file...\"\n  ),\n  button-label: (\n    en: \"Browse\"\n  )\n) !default;\n\n\n// Form validation icons\n$form-icon-success-color: $brand-success !default;\n$form-icon-success: str-replace(url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='#{$form-icon-success-color}' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\"), \"#\", \"%23\") !default;\n\n$form-icon-warning-color: $brand-warning !default;\n$form-icon-warning: str-replace(url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='#{$form-icon-warning-color}' d='M4.4 5.324h-.8v-2.46h.8zm0 1.42h-.8V5.89h.8zM3.76.63L.04 7.075c-.115.2.016.425.26.426h7.397c.242 0 .372-.226.258-.426C6.726 4.924 5.47 2.79 4.253.63c-.113-.174-.39-.174-.494 0z'/%3E%3C/svg%3E\"), \"#\", \"%23\") !default;\n\n$form-icon-danger-color: $brand-danger !default;\n$form-icon-danger: str-replace(url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='#{$form-icon-danger-color}' viewBox='-2 -2 7 7'%3E%3Cpath stroke='%23d9534f' d='M0 0l3 3m0-3L0 3'/%3E%3Ccircle r='.5'/%3E%3Ccircle cx='3' r='.5'/%3E%3Ccircle cy='3' r='.5'/%3E%3Ccircle cx='3' cy='3' r='.5'/%3E%3C/svg%3E\"), \"#\", \"%23\") !default;\n\n\n// Dropdowns\n//\n// Dropdown menu container and contents.\n\n$dropdown-min-width:             10rem !default;\n$dropdown-padding-y:             .5rem !default;\n$dropdown-margin-top:            .125rem !default;\n$dropdown-bg:                    $white !default;\n$dropdown-border-color:          rgba($black,.15) !default;\n$dropdown-border-width:          $border-width !default;\n$dropdown-divider-bg:            $gray-lighter !default;\n$dropdown-box-shadow:            0 .5rem 1rem rgba($black,.175) !default;\n\n$dropdown-link-color:            $gray-dark !default;\n$dropdown-link-hover-color:      darken($gray-dark, 5%) !default;\n$dropdown-link-hover-bg:         $gray-lightest !default;\n\n$dropdown-link-active-color:     $component-active-color !default;\n$dropdown-link-active-bg:        $component-active-bg !default;\n\n$dropdown-link-disabled-color:   $gray-light !default;\n\n$dropdown-item-padding-x:        1.5rem !default;\n\n$dropdown-header-color:          $gray-light !default;\n\n\n// Z-index master list\n//\n// Warning: Avoid customizing these values. They're used for a bird's eye view\n// of components dependent on the z-axis and are designed to all work together.\n\n$zindex-dropdown-backdrop:  990 !default;\n$zindex-navbar:             1000 !default;\n$zindex-dropdown:           1000 !default;\n$zindex-fixed:              1030 !default;\n$zindex-sticky:             1030 !default;\n$zindex-modal-backdrop:     1040 !default;\n$zindex-modal:              1050 !default;\n$zindex-popover:            1060 !default;\n$zindex-tooltip:            1070 !default;\n\n\n// Navbar\n\n$navbar-border-radius:              $border-radius !default;\n$navbar-padding-x:                  $spacer !default;\n$navbar-padding-y:                  ($spacer / 2) !default;\n\n$navbar-brand-padding-y:            .25rem !default;\n\n$navbar-toggler-padding-x:           .75rem !default;\n$navbar-toggler-padding-y:           .25rem !default;\n$navbar-toggler-font-size:           $font-size-lg !default;\n$navbar-toggler-border-radius:       $btn-border-radius !default;\n\n$navbar-inverse-color:                 rgba($white,.5) !default;\n$navbar-inverse-hover-color:           rgba($white,.75) !default;\n$navbar-inverse-active-color:          rgba($white,1) !default;\n$navbar-inverse-disabled-color:        rgba($white,.25) !default;\n$navbar-inverse-toggler-bg: str-replace(url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='#{$navbar-inverse-color}' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\"), \"#\", \"%23\") !default;\n$navbar-inverse-toggler-border:        rgba($white,.1) !default;\n\n$navbar-light-color:                rgba($black,.5) !default;\n$navbar-light-hover-color:          rgba($black,.7) !default;\n$navbar-light-active-color:         rgba($black,.9) !default;\n$navbar-light-disabled-color:       rgba($black,.3) !default;\n$navbar-light-toggler-bg: str-replace(url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='#{$navbar-light-color}' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\"), \"#\", \"%23\") !default;\n$navbar-light-toggler-border:       rgba($black,.1) !default;\n\n// Navs\n\n$nav-item-margin:               .2rem !default;\n$nav-item-inline-spacer:        1rem !default;\n$nav-link-padding:              .5em 1em !default;\n$nav-link-hover-bg:             $gray-lighter !default;\n$nav-disabled-link-color:       $gray-light !default;\n\n$nav-tabs-border-color:                       #ddd !default;\n$nav-tabs-border-width:                       $border-width !default;\n$nav-tabs-border-radius:                      $border-radius !default;\n$nav-tabs-link-hover-border-color:            $gray-lighter !default;\n$nav-tabs-active-link-hover-color:            $gray !default;\n$nav-tabs-active-link-hover-bg:               $body-bg !default;\n$nav-tabs-active-link-hover-border-color:     #ddd !default;\n$nav-tabs-justified-link-border-color:        #ddd !default;\n$nav-tabs-justified-active-link-border-color: $body-bg !default;\n\n$nav-pills-border-radius:     $border-radius !default;\n$nav-pills-active-link-color: $component-active-color !default;\n$nav-pills-active-link-bg:    $component-active-bg !default;\n\n\n// Pagination\n\n$pagination-padding-x:                .75rem !default;\n$pagination-padding-y:                .5rem !default;\n$pagination-padding-x-sm:             .5rem !default;\n$pagination-padding-y-sm:             .25rem !default;\n$pagination-padding-x-lg:             1.5rem !default;\n$pagination-padding-y-lg:             .75rem !default;\n$pagination-line-height:              1.25 !default;\n\n$pagination-color:                     $link-color !default;\n$pagination-bg:                        $white !default;\n$pagination-border-width:              $border-width !default;\n$pagination-border-color:              #ddd !default;\n\n$pagination-hover-color:               $link-hover-color !default;\n$pagination-hover-bg:                  $gray-lighter !default;\n$pagination-hover-border:              #ddd !default;\n\n$pagination-active-color:              $white !default;\n$pagination-active-bg:                 $brand-primary !default;\n$pagination-active-border:             $brand-primary !default;\n\n$pagination-disabled-color:            $gray-light !default;\n$pagination-disabled-bg:               $white !default;\n$pagination-disabled-border:           #ddd !default;\n\n\n// Jumbotron\n\n$jumbotron-padding:              2rem !default;\n$jumbotron-bg:                   $gray-lighter !default;\n\n\n// Form states and alerts\n//\n// Define colors for form feedback states and, by default, alerts.\n\n$state-success-text:             #3c763d !default;\n$state-success-bg:               #dff0d8 !default;\n$state-success-border:           darken($state-success-bg, 5%) !default;\n\n$state-info-text:                #31708f !default;\n$state-info-bg:                  #d9edf7 !default;\n$state-info-border:              darken($state-info-bg, 7%) !default;\n\n$state-warning-text:             #8a6d3b !default;\n$state-warning-bg:               #fcf8e3 !default;\n$mark-bg:                        $state-warning-bg !default;\n$state-warning-border:           darken($state-warning-bg, 5%) !default;\n\n$state-danger-text:              #a94442 !default;\n$state-danger-bg:                #f2dede !default;\n$state-danger-border:            darken($state-danger-bg, 5%) !default;\n\n\n// Cards\n\n$card-spacer-x:            1.25rem !default;\n$card-spacer-y:            .75rem !default;\n$card-border-width:        1px !default;\n$card-border-radius:       $border-radius !default;\n$card-border-color:        rgba($black,.125) !default;\n$card-border-radius-inner: calc(#{$card-border-radius} - #{$card-border-width}) !default;\n$card-cap-bg:              $gray-lightest !default;\n$card-bg:                  $white !default;\n\n$card-link-hover-color:    $white !default;\n\n$card-img-overlay-padding: 1.25rem !default;\n\n$card-deck-margin:          ($grid-gutter-width-base / 2) !default;\n\n$card-columns-count:        3 !default;\n$card-columns-gap:          1.25rem !default;\n$card-columns-margin:       $card-spacer-y !default;\n\n\n// Tooltips\n\n$tooltip-max-width:           200px !default;\n$tooltip-color:               $white !default;\n$tooltip-bg:                  $black !default;\n$tooltip-opacity:             .9 !default;\n$tooltip-padding-y:           3px !default;\n$tooltip-padding-x:           8px !default;\n$tooltip-margin:              3px !default;\n\n$tooltip-arrow-width:         5px !default;\n$tooltip-arrow-color:         $tooltip-bg !default;\n\n\n// Popovers\n\n$popover-inner-padding:               1px !default;\n$popover-bg:                          $white !default;\n$popover-max-width:                   276px !default;\n$popover-border-width:                $border-width !default;\n$popover-border-color:                rgba($black,.2) !default;\n$popover-box-shadow:                  0 5px 10px rgba($black,.2) !default;\n\n$popover-title-bg:                    darken($popover-bg, 3%) !default;\n$popover-title-padding-x:             14px !default;\n$popover-title-padding-y:             8px !default;\n\n$popover-content-padding-x:           14px !default;\n$popover-content-padding-y:           9px !default;\n\n$popover-arrow-width:                 10px !default;\n$popover-arrow-color:                 $popover-bg !default;\n\n$popover-arrow-outer-width:           ($popover-arrow-width + 1px) !default;\n$popover-arrow-outer-color:           fade-in($popover-border-color, .05) !default;\n\n\n// Badges\n\n$badge-default-bg:            $gray-light !default;\n$badge-primary-bg:            $brand-primary !default;\n$badge-success-bg:            $brand-success !default;\n$badge-info-bg:               $brand-info !default;\n$badge-warning-bg:            $brand-warning !default;\n$badge-danger-bg:             $brand-danger !default;\n\n$badge-color:                 $white !default;\n$badge-link-hover-color:      $white !default;\n$badge-font-size:             75% !default;\n$badge-font-weight:           $font-weight-bold !default;\n$badge-padding-x:             .4em !default;\n$badge-padding-y:             .25em !default;\n\n$badge-pill-padding-x:        .6em !default;\n// Use a higher than normal value to ensure completely rounded edges when\n// customizing padding or font-size on labels.\n$badge-pill-border-radius:    10rem !default;\n\n\n// Modals\n\n// Padding applied to the modal body\n$modal-inner-padding:         15px !default;\n\n$modal-dialog-margin:         10px !default;\n$modal-dialog-sm-up-margin-y: 30px !default;\n\n$modal-title-line-height:     $line-height-base !default;\n\n$modal-content-bg:               $white !default;\n$modal-content-border-color:     rgba($black,.2) !default;\n$modal-content-border-width:     $border-width !default;\n$modal-content-xs-box-shadow:    0 3px 9px rgba($black,.5) !default;\n$modal-content-sm-up-box-shadow: 0 5px 15px rgba($black,.5) !default;\n\n$modal-backdrop-bg:           $black !default;\n$modal-backdrop-opacity:      .5 !default;\n$modal-header-border-color:   $gray-lighter !default;\n$modal-footer-border-color:   $modal-header-border-color !default;\n$modal-header-border-width:   $modal-content-border-width !default;\n$modal-footer-border-width:   $modal-header-border-width !default;\n$modal-header-padding:        15px !default;\n\n$modal-lg:                    800px !default;\n$modal-md:                    500px !default;\n$modal-sm:                    300px !default;\n\n$modal-transition:            transform .3s ease-out !default;\n\n\n// Alerts\n//\n// Define alert colors, border radius, and padding.\n\n$alert-padding-x:             1.25rem !default;\n$alert-padding-y:             .75rem !default;\n$alert-margin-bottom:         $spacer-y !default;\n$alert-border-radius:         $border-radius !default;\n$alert-link-font-weight:      $font-weight-bold !default;\n$alert-border-width:          $border-width !default;\n\n$alert-success-bg:            $state-success-bg !default;\n$alert-success-text:          $state-success-text !default;\n$alert-success-border:        $state-success-border !default;\n\n$alert-info-bg:               $state-info-bg !default;\n$alert-info-text:             $state-info-text !default;\n$alert-info-border:           $state-info-border !default;\n\n$alert-warning-bg:            $state-warning-bg !default;\n$alert-warning-text:          $state-warning-text !default;\n$alert-warning-border:        $state-warning-border !default;\n\n$alert-danger-bg:             $state-danger-bg !default;\n$alert-danger-text:           $state-danger-text !default;\n$alert-danger-border:         $state-danger-border !default;\n\n\n// Progress bars\n\n$progress-height:               1rem !default;\n$progress-font-size:            .75rem !default;\n$progress-bg:                   $gray-lighter !default;\n$progress-border-radius:        $border-radius !default;\n$progress-box-shadow:           inset 0 .1rem .1rem rgba($black,.1) !default;\n$progress-bar-color:            $white !default;\n$progress-bar-bg:               $brand-primary !default;\n$progress-bar-animation-timing: 1s linear infinite !default;\n\n// List group\n\n$list-group-color:               $body-color !default;\n$list-group-bg:                  $white !default;\n$list-group-border-color:        rgba($black,.125) !default;\n$list-group-border-width:        $border-width !default;\n$list-group-border-radius:       $border-radius !default;\n\n$list-group-item-padding-x:      1.25rem !default;\n$list-group-item-padding-y:      .75rem !default;\n\n$list-group-hover-bg:            $gray-lightest !default;\n$list-group-active-color:        $component-active-color !default;\n$list-group-active-bg:           $component-active-bg !default;\n$list-group-active-border:       $list-group-active-bg !default;\n$list-group-active-text-color:   lighten($list-group-active-bg, 50%) !default;\n\n$list-group-disabled-color:      $gray-light !default;\n$list-group-disabled-bg:         $list-group-bg !default;\n$list-group-disabled-text-color: $list-group-disabled-color !default;\n\n$list-group-link-color:          $gray !default;\n$list-group-link-heading-color:  $gray-dark !default;\n$list-group-link-hover-color:    $list-group-link-color !default;\n\n$list-group-link-active-color:   $list-group-color !default;\n$list-group-link-active-bg:      $gray-lighter !default;\n\n\n// Image thumbnails\n\n$thumbnail-padding:           .25rem !default;\n$thumbnail-bg:                $body-bg !default;\n$thumbnail-border-width:      $border-width !default;\n$thumbnail-border-color:      #ddd !default;\n$thumbnail-border-radius:     $border-radius !default;\n$thumbnail-box-shadow:        0 1px 2px rgba($black,.075) !default;\n$thumbnail-transition:        all .2s ease-in-out !default;\n\n\n// Figures\n\n$figure-caption-font-size: 90% !default;\n$figure-caption-color:     $gray-light !default;\n\n\n// Breadcrumbs\n\n$breadcrumb-padding-y:          .75rem !default;\n$breadcrumb-padding-x:          1rem !default;\n$breadcrumb-item-padding:       .5rem !default;\n\n$breadcrumb-bg:                 $gray-lighter !default;\n$breadcrumb-divider-color:      $gray-light !default;\n$breadcrumb-active-color:       $gray-light !default;\n$breadcrumb-divider:            \"/\" !default;\n\n\n// Carousel\n\n$carousel-control-color:                      $white !default;\n$carousel-control-width:                      15% !default;\n$carousel-control-opacity:                    .5 !default;\n\n$carousel-indicator-width:                    30px !default;\n$carousel-indicator-height:                   3px !default;\n$carousel-indicator-spacer:                   3px !default;\n$carousel-indicator-active-bg:                $white !default;\n\n$carousel-caption-width:                      70% !default;\n$carousel-caption-color:                      $white !default;\n\n$carousel-control-icon-width:                 20px !default;\n\n$carousel-control-prev-icon-bg: str-replace(url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='#{$carousel-control-color}' viewBox='0 0 8 8'%3E%3Cpath d='M4 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E\"), \"#\", \"%23\") !default;\n$carousel-control-next-icon-bg: str-replace(url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='#{$carousel-control-color}' viewBox='0 0 8 8'%3E%3Cpath d='M1.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E\"), \"#\", \"%23\") !default;\n\n$carousel-transition:           transform .6s ease-in-out !default;\n\n\n// Close\n\n$close-font-size:             $font-size-base * 1.5 !default;\n$close-font-weight:           $font-weight-bold !default;\n$close-color:                 $black !default;\n$close-text-shadow:           0 1px 0 $white !default;\n\n\n// Code\n\n$code-font-size:              90% !default;\n$code-padding-x:              .4rem !default;\n$code-padding-y:              .2rem !default;\n$code-color:                  #bd4147 !default;\n$code-bg:                     $gray-lightest !default;\n\n$kbd-color:                   $white !default;\n$kbd-bg:                      $gray-dark !default;\n\n$pre-bg:                      $gray-lightest !default;\n$pre-color:                   $gray-dark !default;\n$pre-border-color:            #ccc !default;\n$pre-scrollable-max-height:   340px !default;\n","@mixin hover {\n  // TODO: re-enable along with mq4-hover-shim\n//  @if $enable-hover-media-query {\n//    // See Media Queries Level 4: https://drafts.csswg.org/mediaqueries/#hover\n//    // Currently shimmed by https://github.com/twbs/mq4-hover-shim\n//    @media (hover: hover) {\n//      &:hover { @content }\n//    }\n//  }\n//  @else {\n    &:hover { @content }\n//  }\n}\n\n@mixin hover-focus {\n  @if $enable-hover-media-query {\n    &:focus { @content }\n    @include hover { @content }\n  }\n  @else {\n    &:focus,\n    &:hover {\n      @content\n    }\n  }\n}\n\n@mixin plain-hover-focus {\n  @if $enable-hover-media-query {\n    &,\n    &:focus {\n      @content\n    }\n    @include hover { @content }\n  }\n  @else {\n    &,\n    &:focus,\n    &:hover {\n      @content\n    }\n  }\n}\n\n@mixin hover-focus-active {\n  @if $enable-hover-media-query {\n    &:focus,\n    &:active {\n      @content\n    }\n    @include hover { @content }\n  }\n  @else {\n    &:focus,\n    &:active,\n    &:hover {\n      @content\n    }\n  }\n}\n","//\n// Headings\n//\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  margin-bottom: $headings-margin-bottom;\n  font-family: $headings-font-family;\n  font-weight: $headings-font-weight;\n  line-height: $headings-line-height;\n  color: $headings-color;\n}\n\nh1, .h1 { font-size: $font-size-h1; }\nh2, .h2 { font-size: $font-size-h2; }\nh3, .h3 { font-size: $font-size-h3; }\nh4, .h4 { font-size: $font-size-h4; }\nh5, .h5 { font-size: $font-size-h5; }\nh6, .h6 { font-size: $font-size-h6; }\n\n.lead {\n  font-size: $lead-font-size;\n  font-weight: $lead-font-weight;\n}\n\n// Type display classes\n.display-1 {\n  font-size: $display1-size;\n  font-weight: $display1-weight;\n  line-height: $display-line-height;\n}\n.display-2 {\n  font-size: $display2-size;\n  font-weight: $display2-weight;\n  line-height: $display-line-height;\n}\n.display-3 {\n  font-size: $display3-size;\n  font-weight: $display3-weight;\n  line-height: $display-line-height;\n}\n.display-4 {\n  font-size: $display4-size;\n  font-weight: $display4-weight;\n  line-height: $display-line-height;\n}\n\n\n//\n// Horizontal rules\n//\n\nhr {\n  margin-top: $spacer-y;\n  margin-bottom: $spacer-y;\n  border: 0;\n  border-top: $hr-border-width solid $hr-border-color;\n}\n\n\n//\n// Emphasis\n//\n\nsmall,\n.small {\n  font-size: $small-font-size;\n  font-weight: $font-weight-normal;\n}\n\nmark,\n.mark {\n  padding: $mark-padding;\n  background-color: $mark-bg;\n}\n\n\n//\n// Lists\n//\n\n.list-unstyled {\n  @include list-unstyled;\n}\n\n// Inline turns list items into inline-block\n.list-inline {\n  @include list-unstyled;\n}\n.list-inline-item {\n  display: inline-block;\n\n  &:not(:last-child) {\n    margin-right: $list-inline-padding;\n  }\n}\n\n\n//\n// Misc\n//\n\n// Builds on `abbr`\n.initialism {\n  font-size: 90%;\n  text-transform: uppercase;\n}\n\n// Blockquotes\n.blockquote {\n  padding: ($spacer / 2) $spacer;\n  margin-bottom: $spacer;\n  font-size: $blockquote-font-size;\n  border-left: $blockquote-border-width solid $blockquote-border-color;\n}\n\n.blockquote-footer {\n  display: block;\n  font-size: 80%; // back to default font-size\n  color: $blockquote-small-color;\n\n  &::before {\n    content: \"\\2014 \\00A0\"; // em dash, nbsp\n  }\n}\n\n// Opposite alignment of blockquote\n.blockquote-reverse {\n  padding-right: $spacer;\n  padding-left: 0;\n  text-align: right;\n  border-right: $blockquote-border-width solid $blockquote-border-color;\n  border-left: 0;\n}\n\n.blockquote-reverse .blockquote-footer {\n  &::before {\n    content: \"\";\n  }\n  &::after {\n    content: \"\\00A0 \\2014\"; // nbsp, em dash\n  }\n}\n","// Lists\n\n// Unstyled keeps list items block level, just removes default browser padding and list-style\n@mixin list-unstyled {\n  padding-left: 0;\n  list-style: none;\n}\n","// Responsive images (ensure images don't scale beyond their parents)\n//\n// This is purposefully opt-in via an explicit class rather than being the default for all `<img>`s.\n// We previously tried the \"images are responsive by default\" approach in Bootstrap v2,\n// and abandoned it in Bootstrap v3 because it breaks lots of third-party widgets (including Google Maps)\n// which weren't expecting the images within themselves to be involuntarily resized.\n// See also https://github.com/twbs/bootstrap/issues/18178\n.img-fluid {\n  @include img-fluid;\n}\n\n\n// Image thumbnails\n.img-thumbnail {\n  padding: $thumbnail-padding;\n  background-color: $thumbnail-bg;\n  border: $thumbnail-border-width solid $thumbnail-border-color;\n  @include border-radius($thumbnail-border-radius);\n  @include transition($thumbnail-transition);\n  @include box-shadow($thumbnail-box-shadow);\n\n  // Keep them at most 100% wide\n  @include img-fluid;\n}\n\n//\n// Figures\n//\n\n.figure {\n  // Ensures the caption's text aligns with the image.\n  display: inline-block;\n}\n\n.figure-img {\n  margin-bottom: ($spacer-y / 2);\n  line-height: 1;\n}\n\n.figure-caption {\n  font-size: $figure-caption-font-size;\n  color: $figure-caption-color;\n}\n","// Image Mixins\n// - Responsive image\n// - Retina image\n\n\n// Responsive image\n//\n// Keep images from scaling beyond the width of their parents.\n\n@mixin img-fluid {\n  // Part 1: Set a maximum relative to the parent\n  max-width: 100%;\n  // Part 2: Override the height to auto, otherwise images will be stretched\n  // when setting a width and height attribute on the img element.\n  height: auto;\n}\n\n\n// Retina image\n//\n// Short retina mixin for setting background-image and -size.\n\n@mixin img-retina($file-1x, $file-2x, $width-1x, $height-1x) {\n  background-image: url($file-1x);\n\n  // Autoprefixer takes care of adding -webkit-min-device-pixel-ratio and -o-min-device-pixel-ratio,\n  // but doesn't convert dppx=>dpi.\n  // There's no such thing as unprefixed min-device-pixel-ratio since it's nonstandard.\n  // Compatibility info: http://caniuse.com/#feat=css-media-resolution\n  @media\n  only screen and (min-resolution: 192dpi), // IE9-11 don't support dppx\n  only screen and (min-resolution: 2dppx) { // Standardized\n    background-image: url($file-2x);\n    background-size: $width-1x $height-1x;\n  }\n}\n","// Single side border-radius\n\n@mixin border-radius($radius: $border-radius) {\n  @if $enable-rounded {\n    border-radius: $radius;\n  }\n}\n\n@mixin border-top-radius($radius) {\n  @if $enable-rounded {\n    border-top-right-radius: $radius;\n    border-top-left-radius: $radius;\n  }\n}\n\n@mixin border-right-radius($radius) {\n  @if $enable-rounded {\n    border-bottom-right-radius: $radius;\n    border-top-right-radius: $radius;\n  }\n}\n\n@mixin border-bottom-radius($radius) {\n  @if $enable-rounded {\n    border-bottom-right-radius: $radius;\n    border-bottom-left-radius: $radius;\n  }\n}\n\n@mixin border-left-radius($radius) {\n  @if $enable-rounded {\n    border-bottom-left-radius: $radius;\n    border-top-left-radius: $radius;\n  }\n}\n","// Toggles\n//\n// Used in conjunction with global variables to enable certain theme features.\n\n@mixin box-shadow($shadow...) {\n  @if $enable-shadows {\n    box-shadow: $shadow;\n  }\n}\n\n@mixin transition($transition...) {\n  @if $enable-transitions {\n    @if length($transition) == 0 {\n      transition: $transition-base;\n    } @else {\n      transition: $transition;\n    }\n  }\n}\n\n// Utilities\n@import \"mixins/breakpoints\";\n@import \"mixins/hover\";\n@import \"mixins/image\";\n@import \"mixins/badge\";\n@import \"mixins/resize\";\n@import \"mixins/screen-reader\";\n@import \"mixins/size\";\n@import \"mixins/reset-text\";\n@import \"mixins/text-emphasis\";\n@import \"mixins/text-hide\";\n@import \"mixins/text-truncate\";\n@import \"mixins/transforms\";\n@import \"mixins/visibility\";\n\n// // Components\n@import \"mixins/alert\";\n@import \"mixins/buttons\";\n@import \"mixins/cards\";\n@import \"mixins/pagination\";\n@import \"mixins/lists\";\n@import \"mixins/list-group\";\n@import \"mixins/nav-divider\";\n@import \"mixins/forms\";\n@import \"mixins/table-row\";\n\n// // Skins\n@import \"mixins/background-variant\";\n@import \"mixins/border-radius\";\n@import \"mixins/gradients\";\n\n// // Layout\n@import \"mixins/clearfix\";\n// @import \"mixins/navbar-align\";\n@import \"mixins/grid-framework\";\n@import \"mixins/grid\";\n@import \"mixins/float\";\n","// Inline and block code styles\ncode,\nkbd,\npre,\nsamp {\n  font-family: $font-family-monospace;\n}\n\n// Inline code\ncode {\n  padding: $code-padding-y $code-padding-x;\n  font-size: $code-font-size;\n  color: $code-color;\n  background-color: $code-bg;\n  @include border-radius($border-radius);\n\n  // Streamline the style when inside anchors to avoid broken underline and more\n  a > & {\n    padding: 0;\n    color: inherit;\n    background-color: inherit;\n  }\n}\n\n// User input typically entered via keyboard\nkbd {\n  padding: $code-padding-y $code-padding-x;\n  font-size: $code-font-size;\n  color: $kbd-color;\n  background-color: $kbd-bg;\n  @include border-radius($border-radius-sm);\n  @include box-shadow($kbd-box-shadow);\n\n  kbd {\n    padding: 0;\n    font-size: 100%;\n    font-weight: $nested-kbd-font-weight;\n    @include box-shadow(none);\n  }\n}\n\n// Blocks of code\npre {\n  display: block;\n  margin-top: 0;\n  margin-bottom: 1rem;\n  font-size: $code-font-size;\n  color: $pre-color;\n\n  // Account for some code outputs that place code tags in pre tags\n  code {\n    padding: 0;\n    font-size: inherit;\n    color: inherit;\n    background-color: transparent;\n    border-radius: 0;\n  }\n}\n\n// Enable scrollable blocks of code\n.pre-scrollable {\n  max-height: $pre-scrollable-max-height;\n  overflow-y: scroll;\n}\n","// Container widths\n//\n// Set the container width, and override it for fixed navbars in media queries.\n\n@if $enable-grid-classes {\n  .container {\n    @include make-container();\n    @include make-container-max-widths();\n  }\n}\n\n// Fluid container\n//\n// Utilizes the mixin meant for fixed width containers, but without any defined\n// width for fluid, full width layouts.\n\n@if $enable-grid-classes {\n  .container-fluid {\n    @include make-container();\n  }\n}\n\n// Row\n//\n// Rows contain and clear the floats of your columns.\n\n@if $enable-grid-classes {\n  .row {\n    @include make-row();\n  }\n\n  // Remove the negative margin from default .row, then the horizontal padding\n  // from all immediate children columns (to prevent runaway style inheritance).\n  .no-gutters {\n    margin-right: 0;\n    margin-left: 0;\n\n    > .col,\n    > [class*=\"col-\"] {\n      padding-right: 0;\n      padding-left: 0;\n    }\n  }\n}\n\n// Columns\n//\n// Common styles for small and large grid columns\n\n@if $enable-grid-classes {\n  @include make-grid-columns();\n}\n","/// Grid system\n//\n// Generate semantic grid columns with these mixins.\n\n@mixin make-container($gutters: $grid-gutter-widths) {\n  position: relative;\n  margin-left: auto;\n  margin-right: auto;\n\n  @each $breakpoint in map-keys($gutters) {\n    @include media-breakpoint-up($breakpoint) {\n      $gutter: map-get($gutters, $breakpoint);\n      padding-right: ($gutter / 2);\n      padding-left:  ($gutter / 2);\n    }\n  }\n}\n\n\n// For each breakpoint, define the maximum width of the container in a media query\n@mixin make-container-max-widths($max-widths: $container-max-widths, $breakpoints: $grid-breakpoints) {\n  @each $breakpoint, $container-max-width in $max-widths {\n    @include media-breakpoint-up($breakpoint, $breakpoints) {\n      width: $container-max-width;\n      max-width: 100%;\n    }\n  }\n}\n\n@mixin make-gutters($gutters: $grid-gutter-widths) {\n  @each $breakpoint in map-keys($gutters) {\n    @include media-breakpoint-up($breakpoint) {\n      $gutter: map-get($gutters, $breakpoint);\n      padding-right: ($gutter / 2);\n      padding-left:  ($gutter / 2);\n    }\n  }\n}\n\n@mixin make-row($gutters: $grid-gutter-widths) {\n  display: flex;\n  flex-wrap: wrap;\n\n  @each $breakpoint in map-keys($gutters) {\n    @include media-breakpoint-up($breakpoint) {\n      $gutter: map-get($gutters, $breakpoint);\n      margin-right: ($gutter / -2);\n      margin-left:  ($gutter / -2);\n    }\n  }\n}\n\n@mixin make-col-ready($gutters: $grid-gutter-widths) {\n  position: relative;\n  // Prevent columns from becoming too narrow when at smaller grid tiers by\n  // always setting `width: 100%;`. This works because we use `flex` values\n  // later on to override this initial width.\n  width: 100%;\n  min-height: 1px; // Prevent collapsing\n\n  @each $breakpoint in map-keys($gutters) {\n    @include media-breakpoint-up($breakpoint) {\n      $gutter: map-get($gutters, $breakpoint);\n      padding-right: ($gutter / 2);\n      padding-left:  ($gutter / 2);\n    }\n  }\n}\n\n@mixin make-col($size, $columns: $grid-columns) {\n  flex: 0 0 percentage($size / $columns);\n  // width: percentage($size / $columns);\n  // Add a `max-width` to ensure content within each column does not blow out\n  // the width of the column. Applies to IE10+ and Firefox. Chrome and Safari\n  // do not appear to require this.\n  max-width: percentage($size / $columns);\n}\n\n@mixin make-col-offset($size, $columns: $grid-columns) {\n  margin-left: percentage($size / $columns);\n}\n\n@mixin make-col-push($size, $columns: $grid-columns) {\n  left: if($size > 0, percentage($size / $columns), auto);\n}\n\n@mixin make-col-pull($size, $columns: $grid-columns) {\n  right: if($size > 0, percentage($size / $columns), auto);\n}\n\n@mixin make-col-modifier($type, $size, $columns) {\n  // Work around the lack of dynamic mixin @include support (https://github.com/sass/sass/issues/626)\n  @if $type == push {\n    @include make-col-push($size, $columns);\n  } @else if $type == pull {\n    @include make-col-pull($size, $columns);\n  } @else if $type == offset {\n    @include make-col-offset($size, $columns);\n  }\n}\n","// Breakpoint viewport sizes and media queries.\n//\n// Breakpoints are defined as a map of (name: minimum width), order from small to large:\n//\n//    (xs: 0, sm: 576px, md: 768px)\n//\n// The map defined in the `$grid-breakpoints` global variable is used as the `$breakpoints` argument by default.\n\n// Name of the next breakpoint, or null for the last breakpoint.\n//\n//    >> breakpoint-next(sm)\n//    md\n//    >> breakpoint-next(sm, (xs: 0, sm: 576px, md: 768px))\n//    md\n//    >> breakpoint-next(sm, $breakpoint-names: (xs sm md))\n//    md\n@function breakpoint-next($name, $breakpoints: $grid-breakpoints, $breakpoint-names: map-keys($breakpoints)) {\n  $n: index($breakpoint-names, $name);\n  @return if($n < length($breakpoint-names), nth($breakpoint-names, $n + 1), null);\n}\n\n// Minimum breakpoint width. Null for the smallest (first) breakpoint.\n//\n//    >> breakpoint-min(sm, (xs: 0, sm: 576px, md: 768px))\n//    576px\n@function breakpoint-min($name, $breakpoints: $grid-breakpoints) {\n  $min: map-get($breakpoints, $name);\n  @return if($min != 0, $min, null);\n}\n\n// Maximum breakpoint width. Null for the largest (last) breakpoint.\n// The maximum value is calculated as the minimum of the next one less 0.1.\n//\n//    >> breakpoint-max(sm, (xs: 0, sm: 576px, md: 768px))\n//    767px\n@function breakpoint-max($name, $breakpoints: $grid-breakpoints) {\n  $next: breakpoint-next($name, $breakpoints);\n  @return if($next, breakpoint-min($next, $breakpoints) - 1px, null);\n}\n\n// Returns a blank string if smallest breakpoint, otherwise returns the name with a dash infront.\n// Useful for making responsive utilities.\n//\n//    >> breakpoint-infix(xs, (xs: 0, sm: 576px, md: 768px))\n//    \"\"  (Returns a blank string)\n//    >> breakpoint-infix(sm, (xs: 0, sm: 576px, md: 768px))\n//    \"-sm\"\n@function breakpoint-infix($name, $breakpoints: $grid-breakpoints) {\n  @return if(breakpoint-min($name, $breakpoints) == null, \"\", \"-#{$name}\");\n}\n\n// Media of at least the minimum breakpoint width. No query for the smallest breakpoint.\n// Makes the @content apply to the given breakpoint and wider.\n@mixin media-breakpoint-up($name, $breakpoints: $grid-breakpoints) {\n  $min: breakpoint-min($name, $breakpoints);\n  @if $min {\n    @media (min-width: $min) {\n      @content;\n    }\n  } @else {\n    @content;\n  }\n}\n\n// Media of at most the maximum breakpoint width. No query for the largest breakpoint.\n// Makes the @content apply to the given breakpoint and narrower.\n@mixin media-breakpoint-down($name, $breakpoints: $grid-breakpoints) {\n  $max: breakpoint-max($name, $breakpoints);\n  @if $max {\n    @media (max-width: $max) {\n      @content;\n    }\n  } @else {\n    @content;\n  }\n}\n\n// Media that spans multiple breakpoint widths.\n// Makes the @content apply between the min and max breakpoints\n@mixin media-breakpoint-between($lower, $upper, $breakpoints: $grid-breakpoints) {\n  @include media-breakpoint-up($lower, $breakpoints) {\n    @include media-breakpoint-down($upper, $breakpoints) {\n      @content;\n    }\n  }\n}\n\n// Media between the breakpoint's minimum and maximum widths.\n// No minimum for the smallest breakpoint, and no maximum for the largest one.\n// Makes the @content apply only to the given breakpoint, not viewports any wider or narrower.\n@mixin media-breakpoint-only($name, $breakpoints: $grid-breakpoints) {\n  @include media-breakpoint-between($name, $name, $breakpoints) {\n    @content;\n  }\n}\n","// Framework grid generation\n//\n// Used only by Bootstrap to generate the correct number of grid classes given\n// any value of `$grid-columns`.\n\n@mixin make-grid-columns($columns: $grid-columns, $gutters: $grid-gutter-widths, $breakpoints: $grid-breakpoints) {\n  // Common properties for all breakpoints\n  %grid-column {\n    position: relative;\n    width: 100%;\n    min-height: 1px; // Prevent columns from collapsing when empty\n\n    @include make-gutters($gutters);\n  }\n\n  @each $breakpoint in map-keys($breakpoints) {\n    $infix: breakpoint-infix($breakpoint, $breakpoints);\n\n    // Allow columns to stretch full width below their breakpoints\n    @for $i from 1 through $columns {\n      .col#{$infix}-#{$i} {\n        @extend %grid-column;\n      }\n    }\n    .col#{$infix} {\n      @extend %grid-column;\n    }\n\n    @include media-breakpoint-up($breakpoint, $breakpoints) {\n      // Provide basic `.col-{bp}` classes for equal-width flexbox columns\n      .col#{$infix} {\n        flex-basis: 0;\n        flex-grow: 1;\n        max-width: 100%;\n      }\n      .col#{$infix}-auto {\n        flex: 0 0 auto;\n        width: auto;\n      }\n\n      @for $i from 1 through $columns {\n        .col#{$infix}-#{$i} {\n          @include make-col($i, $columns);\n        }\n      }\n\n      @each $modifier in (pull, push) {\n        @for $i from 0 through $columns {\n          .#{$modifier}#{$infix}-#{$i} {\n            @include make-col-modifier($modifier, $i, $columns)\n          }\n        }\n      }\n\n      // `$columns - 1` because offsetting by the width of an entire row isn't possible\n      @for $i from 0 through ($columns - 1) {\n        @if not ($infix == \"\" and $i == 0) { // Avoid emitting useless .offset-xs-0\n          .offset#{$infix}-#{$i} {\n            @include make-col-modifier(offset, $i, $columns)\n          }\n        }\n      }\n    }\n  }\n}\n","//\n// Basic Bootstrap table\n//\n\n.table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: $spacer;\n\n  th,\n  td {\n    padding: $table-cell-padding;\n    vertical-align: top;\n    border-top: $table-border-width solid $table-border-color;\n  }\n\n  thead th {\n    vertical-align: bottom;\n    border-bottom: (2 * $table-border-width) solid $table-border-color;\n  }\n\n  tbody + tbody {\n    border-top: (2 * $table-border-width) solid $table-border-color;\n  }\n\n  .table {\n    background-color: $body-bg;\n  }\n}\n\n\n//\n// Condensed table w/ half padding\n//\n\n.table-sm {\n  th,\n  td {\n    padding: $table-sm-cell-padding;\n  }\n}\n\n\n// Bordered version\n//\n// Add borders all around the table and between all the columns.\n\n.table-bordered {\n  border: $table-border-width solid $table-border-color;\n\n  th,\n  td {\n    border: $table-border-width solid $table-border-color;\n  }\n\n  thead {\n    th,\n    td {\n      border-bottom-width: (2 * $table-border-width);\n    }\n  }\n}\n\n\n// Zebra-striping\n//\n// Default zebra-stripe styles (alternating gray and transparent backgrounds)\n\n.table-striped {\n  tbody tr:nth-of-type(odd) {\n    background-color: $table-bg-accent;\n  }\n}\n\n\n// Hover effect\n//\n// Placed here since it has to come after the potential zebra striping\n\n.table-hover {\n  tbody tr {\n    @include hover {\n      background-color: $table-bg-hover;\n    }\n  }\n}\n\n\n// Table backgrounds\n//\n// Exact selectors below required to override `.table-striped` and prevent\n// inheritance to nested tables.\n\n// Generate the contextual variants\n@include table-row-variant(active, $table-bg-active);\n@include table-row-variant(success, $state-success-bg);\n@include table-row-variant(info, $state-info-bg);\n@include table-row-variant(warning, $state-warning-bg);\n@include table-row-variant(danger, $state-danger-bg);\n\n\n// Inverse styles\n//\n// Same table markup, but inverted color scheme: dark background and light text.\n\n.thead-inverse {\n  th {\n    color: $table-inverse-color;\n    background-color: $table-inverse-bg;\n  }\n}\n\n.thead-default {\n  th {\n    color: $table-head-color;\n    background-color: $table-head-bg;\n  }\n}\n\n.table-inverse {\n  color: $table-inverse-color;\n  background-color: $table-inverse-bg;\n\n  th,\n  td,\n  thead th {\n    border-color: $body-bg;\n  }\n\n  &.table-bordered {\n    border: 0;\n  }\n}\n\n\n\n// Responsive tables\n//\n// Add `.table-responsive` to `.table`s and we'll make them mobile friendly by\n// enabling horizontal scrolling. Only applies <768px. Everything above that\n// will display normally.\n\n.table-responsive {\n  display: block;\n  width: 100%;\n  overflow-x: auto;\n  -ms-overflow-style: -ms-autohiding-scrollbar; // See https://github.com/twbs/bootstrap/pull/10057\n\n  // Prevent double border on horizontal scroll due to use of `display: block;`\n  &.table-bordered {\n    border: 0;\n  }\n}\n","// Tables\n\n@mixin table-row-variant($state, $background) {\n  // Exact selectors below required to override `.table-striped` and prevent\n  // inheritance to nested tables.\n  .table-#{$state} {\n    &,\n    > th,\n    > td {\n      background-color: $background;\n    }\n  }\n\n  // Hover states for `.table-hover`\n  // Note: this is not available for cells or rows within `thead` or `tfoot`.\n  .table-hover {\n    $hover-background: darken($background, 5%);\n\n    .table-#{$state} {\n      @include hover {\n        background-color: $hover-background;\n\n        > td,\n        > th {\n          background-color: $hover-background;\n        }\n      }\n    }\n  }\n}\n","// scss-lint:disable QualifyingElement\n\n//\n// Textual form controls\n//\n\n.form-control {\n  display: block;\n  width: 100%;\n  // // Make inputs at least the height of their button counterpart (base line-height + padding + border)\n  // height: $input-height;\n  padding: $input-padding-y $input-padding-x;\n  font-size: $font-size-base;\n  line-height: $input-line-height;\n  color: $input-color;\n  background-color: $input-bg;\n  // Reset unusual Firefox-on-Android default style; see https://github.com/necolas/normalize.css/issues/214.\n  background-image: none;\n  background-clip: padding-box;\n  border: $input-btn-border-width solid $input-border-color;\n\n  // Note: This has no effect on <select>s in some browsers, due to the limited stylability of `<select>`s in CSS.\n  @if $enable-rounded {\n    // Manually use the if/else instead of the mixin to account for iOS override\n    border-radius: $input-border-radius;\n  } @else {\n    // Otherwise undo the iOS default\n    border-radius: 0;\n  }\n\n  @include box-shadow($input-box-shadow);\n  @include transition($input-transition);\n\n  // Unstyle the caret on `<select>`s in IE10+.\n  &::-ms-expand {\n    background-color: transparent;\n    border: 0;\n  }\n\n  // Customize the `:focus` state to imitate native WebKit styles.\n  @include form-control-focus();\n\n  // Placeholder\n  &::placeholder {\n    color: $input-color-placeholder;\n    // Override Firefox's unusual default opacity; see https://github.com/twbs/bootstrap/pull/11526.\n    opacity: 1;\n  }\n\n  // Disabled and read-only inputs\n  //\n  // HTML5 says that controls under a fieldset > legend:first-child won't be\n  // disabled if the fieldset is disabled. Due to implementation difficulty, we\n  // don't honor that edge case; we style them as disabled anyway.\n  &:disabled,\n  &[readonly] {\n    background-color: $input-bg-disabled;\n    // iOS fix for unreadable disabled content; see https://github.com/twbs/bootstrap/issues/11655.\n    opacity: 1;\n  }\n\n  &:disabled {\n    cursor: $cursor-disabled;\n  }\n}\n\nselect.form-control {\n  &:not([size]):not([multiple]) {\n    $select-border-width: ($border-width * 2);\n    height: calc(#{$input-height} + #{$select-border-width});\n  }\n\n  &:focus::-ms-value {\n    // Suppress the nested default white text on blue background highlight given to\n    // the selected option text when the (still closed) <select> receives focus\n    // in IE and (under certain conditions) Edge, as it looks bad and cannot be made to\n    // match the appearance of the native widget.\n    // See https://github.com/twbs/bootstrap/issues/19398.\n    color: $input-color;\n    background-color: $input-bg;\n  }\n}\n\n// Make file inputs better match text inputs by forcing them to new lines.\n.form-control-file,\n.form-control-range {\n  display: block;\n}\n\n\n//\n// Labels\n//\n\n// For use with horizontal and inline forms, when you need the label text to\n// align with the form controls.\n.col-form-label {\n  padding-top: calc(#{$input-padding-y} - #{$input-btn-border-width} * 2);\n  padding-bottom: calc(#{$input-padding-y} - #{$input-btn-border-width} * 2);\n  margin-bottom: 0; // Override the `<label>` default\n}\n\n.col-form-label-lg {\n  padding-top: calc(#{$input-padding-y-lg} - #{$input-btn-border-width} * 2);\n  padding-bottom: calc(#{$input-padding-y-lg} - #{$input-btn-border-width} * 2);\n  font-size: $font-size-lg;\n}\n\n.col-form-label-sm {\n  padding-top: calc(#{$input-padding-y-sm} - #{$input-btn-border-width} * 2);\n  padding-bottom: calc(#{$input-padding-y-sm} - #{$input-btn-border-width} * 2);\n  font-size: $font-size-sm;\n}\n\n\n//\n// Legends\n//\n\n// For use with horizontal and inline forms, when you need the legend text to\n// be the same size as regular labels, and to align with the form controls.\n.col-form-legend {\n  padding-top: $input-padding-y;\n  padding-bottom: $input-padding-y;\n  margin-bottom: 0;\n  font-size: $font-size-base;\n}\n\n\n// Static form control text\n//\n// Apply class to an element to make any string of text align with labels in a\n// horizontal form layout.\n\n.form-control-static {\n  padding-top: $input-padding-y;\n  padding-bottom: $input-padding-y;\n  margin-bottom: 0; // match inputs if this class comes on inputs with default margins\n  line-height: $input-line-height;\n  border: solid transparent;\n  border-width: $input-btn-border-width 0;\n\n  &.form-control-sm,\n  &.form-control-lg {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n\n\n// Form control sizing\n//\n// Build on `.form-control` with modifier classes to decrease or increase the\n// height and font-size of form controls.\n//\n// The `.form-group-* form-control` variations are sadly duplicated to avoid the\n// issue documented in https://github.com/twbs/bootstrap/issues/15074.\n\n.form-control-sm {\n  padding: $input-padding-y-sm $input-padding-x-sm;\n  font-size: $font-size-sm;\n  @include border-radius($input-border-radius-sm);\n}\n\nselect.form-control-sm {\n  &:not([size]):not([multiple]) {\n    height: $input-height-sm;\n  }\n}\n\n.form-control-lg {\n  padding: $input-padding-y-lg $input-padding-x-lg;\n  font-size: $font-size-lg;\n  @include border-radius($input-border-radius-lg);\n}\n\nselect.form-control-lg {\n  &:not([size]):not([multiple]) {\n    height: $input-height-lg;\n  }\n}\n\n\n// Form groups\n//\n// Designed to help with the organization and spacing of vertical forms. For\n// horizontal forms, use the predefined grid classes.\n\n.form-group {\n  margin-bottom: $form-group-margin-bottom;\n}\n\n.form-text {\n  display: block;\n  margin-top: $form-text-margin-top;\n}\n\n\n// Checkboxes and radios\n//\n// Indent the labels to position radios/checkboxes as hanging controls.\n\n.form-check {\n  position: relative;\n  display: block;\n  margin-bottom: $form-check-margin-bottom;\n\n  &.disabled {\n    .form-check-label {\n      color: $text-muted;\n      cursor: $cursor-disabled;\n    }\n  }\n}\n\n.form-check-label {\n  padding-left: $form-check-input-gutter;\n  margin-bottom: 0; // Override default `<label>` bottom margin\n  cursor: pointer;\n}\n\n.form-check-input {\n  position: absolute;\n  margin-top: $form-check-input-margin-y;\n  margin-left: -$form-check-input-gutter;\n\n  &:only-child {\n    position: static;\n  }\n}\n\n// Radios and checkboxes on same line\n.form-check-inline {\n  display: inline-block;\n\n  .form-check-label {\n    vertical-align: middle;\n  }\n\n  + .form-check-inline {\n    margin-left: $form-check-inline-margin-x;\n  }\n}\n\n\n// Form control feedback states\n//\n// Apply contextual and semantic states to individual form controls.\n\n.form-control-feedback {\n  margin-top: $form-feedback-margin-top;\n}\n\n.form-control-success,\n.form-control-warning,\n.form-control-danger {\n  padding-right: ($input-padding-x * 3);\n  background-repeat: no-repeat;\n  background-position: center right ($input-height / 4);\n  background-size: ($input-height / 2) ($input-height / 2);\n}\n\n// Form validation states\n.has-success {\n  @include form-control-validation($brand-success);\n\n  .form-control-success {\n    background-image: $form-icon-success;\n  }\n}\n\n.has-warning {\n  @include form-control-validation($brand-warning);\n\n  .form-control-warning {\n    background-image: $form-icon-warning;\n  }\n}\n\n.has-danger {\n  @include form-control-validation($brand-danger);\n\n  .form-control-danger {\n    background-image: $form-icon-danger;\n  }\n}\n\n\n// Inline forms\n//\n// Make forms appear inline(-block) by adding the `.form-inline` class. Inline\n// forms begin stacked on extra small (mobile) devices and then go inline when\n// viewports reach <768px.\n//\n// Requires wrapping inputs and labels with `.form-group` for proper display of\n// default HTML form controls and our custom form controls (e.g., input groups).\n\n.form-inline {\n  display: flex;\n  flex-flow: row wrap;\n  align-items: center; // Prevent shorter elements from growing to same height as others (e.g., small buttons growing to normal sized button height)\n\n  // Because we use flex, the initial sizing of checkboxes is collapsed and\n  // doesn't occupy the full-width (which is what we want for xs grid tier),\n  // so we force that here.\n  .form-check {\n    width: 100%;\n  }\n\n  // Kick in the inline\n  @include media-breakpoint-up(sm) {\n    label {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      margin-bottom: 0;\n    }\n\n    // Inline-block all the things for \"inline\"\n    .form-group {\n      display: flex;\n      flex: 0 0 auto;\n      flex-flow: row wrap;\n      align-items: center;\n      margin-bottom: 0;\n    }\n\n    // Allow folks to *not* use `.form-group`\n    .form-control {\n      display: inline-block;\n      width: auto; // Prevent labels from stacking above inputs in `.form-group`\n      vertical-align: middle;\n    }\n\n    // Make static controls behave like regular ones\n    .form-control-static {\n      display: inline-block;\n    }\n\n    .input-group {\n      width: auto;\n    }\n\n    .form-control-label {\n      margin-bottom: 0;\n      vertical-align: middle;\n    }\n\n    // Remove default margin on radios/checkboxes that were used for stacking, and\n    // then undo the floating of radios and checkboxes to match.\n    .form-check {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: auto;\n      margin-top: 0;\n      margin-bottom: 0;\n    }\n    .form-check-label {\n      padding-left: 0;\n    }\n    .form-check-input {\n      position: relative;\n      margin-top: 0;\n      margin-right: $form-check-input-margin-x;\n      margin-left: 0;\n    }\n\n    // Custom form controls\n    .custom-control {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      padding-left: 0;\n    }\n    .custom-control-indicator {\n      position: static;\n      display: inline-block;\n      margin-right: $form-check-input-margin-x; // Flexbox alignment means we lose our HTML space here, so we compensate.\n      vertical-align: text-bottom;\n    }\n\n    // Re-override the feedback icon.\n    .has-feedback .form-control-feedback {\n      top: 0;\n    }\n  }\n}\n","// Form validation states\n//\n// Used in _forms.scss to generate the form validation CSS for warnings, errors,\n// and successes.\n\n@mixin form-control-validation($color) {\n  // Color the label and help text\n  .form-control-feedback,\n  .form-control-label,\n  .col-form-label,\n  .form-check-label,\n  .custom-control {\n    color: $color;\n  }\n\n  // Set the border and box shadow on specific inputs to match\n  .form-control {\n    border-color: $color;\n\n    &:focus {\n      @include box-shadow($input-box-shadow, 0 0 6px lighten($color, 20%));\n    }\n  }\n\n  // Set validation states also for addons\n  .input-group-addon {\n    color: $color;\n    border-color: $color;\n    background-color: lighten($color, 40%);\n  }\n}\n\n// Form control focus state\n//\n// Generate a customized focus state and for any input with the specified color,\n// which defaults to the `@input-border-focus` variable.\n//\n// We highly encourage you to not customize the default value, but instead use\n// this to tweak colors on an as-needed basis. This aesthetic change is based on\n// WebKit's default styles, but applicable to a wider range of browsers. Its\n// usability and accessibility should be taken into account with any change.\n//\n// Example usage: change the default blue border and shadow to white for better\n// contrast against a dark gray background.\n@mixin form-control-focus() {\n  &:focus {\n    color: $input-color-focus;\n    background-color: $input-bg-focus;\n    border-color: $input-border-focus;\n    outline: none;\n    @include box-shadow($input-box-shadow-focus);\n  }\n}\n\n// Form control sizing\n//\n// Relative text size, padding, and border-radii changes for form controls. For\n// horizontal sizing, wrap controls in the predefined grid classes. `<select>`\n// element gets special love because it's special, and that's a fact!\n\n@mixin input-size($parent, $input-height, $padding-y, $padding-x, $font-size, $line-height, $border-radius) {\n  #{$parent} {\n    height: $input-height;\n    padding: $padding-y $padding-x;\n    font-size: $font-size;\n    line-height: $line-height;\n    @include border-radius($border-radius);\n  }\n\n  select#{$parent} {\n    height: $input-height;\n    line-height: $input-height;\n  }\n\n  textarea#{$parent},\n  select[multiple]#{$parent} {\n    height: auto;\n  }\n}\n","// scss-lint:disable QualifyingElement\n\n//\n// Base styles\n//\n\n.btn {\n  display: inline-block;\n  font-weight: $btn-font-weight;\n  line-height: $btn-line-height;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  user-select: none;\n  border: $input-btn-border-width solid transparent;\n  @include button-size($btn-padding-y, $btn-padding-x, $font-size-base, $btn-border-radius);\n  @include transition($btn-transition);\n\n  // Share hover and focus styles\n  @include hover-focus {\n    text-decoration: none;\n  }\n  &:focus,\n  &.focus {\n    outline: 0;\n    box-shadow: $btn-focus-box-shadow;\n  }\n\n  // Disabled comes first so active can properly restyle\n  &.disabled,\n  &:disabled {\n    cursor: $cursor-disabled;\n    opacity: .65;\n    @include box-shadow(none);\n  }\n\n  &:active,\n  &.active {\n    background-image: none;\n    @include box-shadow($btn-focus-box-shadow, $btn-active-box-shadow);\n  }\n}\n\n// Future-proof disabling of clicks on `<a>` elements\na.btn.disabled,\nfieldset[disabled] a.btn {\n  pointer-events: none;\n}\n\n\n//\n// Alternate buttons\n//\n\n.btn-primary {\n  @include button-variant($btn-primary-color, $btn-primary-bg, $btn-primary-border);\n}\n.btn-secondary {\n  @include button-variant($btn-secondary-color, $btn-secondary-bg, $btn-secondary-border);\n}\n.btn-info {\n  @include button-variant($btn-info-color, $btn-info-bg, $btn-info-border);\n}\n.btn-success {\n  @include button-variant($btn-success-color, $btn-success-bg, $btn-success-border);\n}\n.btn-warning {\n  @include button-variant($btn-warning-color, $btn-warning-bg, $btn-warning-border);\n}\n.btn-danger {\n  @include button-variant($btn-danger-color, $btn-danger-bg, $btn-danger-border);\n}\n\n// Remove all backgrounds\n.btn-outline-primary {\n  @include button-outline-variant($btn-primary-bg);\n}\n.btn-outline-secondary {\n  @include button-outline-variant($btn-secondary-border);\n}\n.btn-outline-info {\n  @include button-outline-variant($btn-info-bg);\n}\n.btn-outline-success {\n  @include button-outline-variant($btn-success-bg);\n}\n.btn-outline-warning {\n  @include button-outline-variant($btn-warning-bg);\n}\n.btn-outline-danger {\n  @include button-outline-variant($btn-danger-bg);\n}\n\n\n//\n// Link buttons\n//\n\n// Make a button look and behave like a link\n.btn-link {\n  font-weight: $font-weight-normal;\n  color: $link-color;\n  border-radius: 0;\n\n  &,\n  &:active,\n  &.active,\n  &:disabled {\n    background-color: transparent;\n    @include box-shadow(none);\n  }\n  &,\n  &:focus,\n  &:active {\n    border-color: transparent;\n  }\n  @include hover {\n    border-color: transparent;\n  }\n  @include hover-focus {\n    color: $link-hover-color;\n    text-decoration: $link-hover-decoration;\n    background-color: transparent;\n  }\n  &:disabled {\n    color: $btn-link-disabled-color;\n\n    @include hover-focus {\n      text-decoration: none;\n    }\n  }\n}\n\n\n//\n// Button Sizes\n//\n\n.btn-lg {\n  // line-height: ensure even-numbered height of button next to large input\n  @include button-size($btn-padding-y-lg, $btn-padding-x-lg, $font-size-lg, $btn-border-radius-lg);\n}\n.btn-sm {\n  // line-height: ensure proper height of button next to small input\n  @include button-size($btn-padding-y-sm, $btn-padding-x-sm, $font-size-sm, $btn-border-radius-sm);\n}\n\n\n//\n// Block button\n//\n\n.btn-block {\n  display: block;\n  width: 100%;\n}\n\n// Vertically space out multiple block buttons\n.btn-block + .btn-block {\n  margin-top: $btn-block-spacing-y;\n}\n\n// Specificity overrides\ninput[type=\"submit\"],\ninput[type=\"reset\"],\ninput[type=\"button\"] {\n  &.btn-block {\n    width: 100%;\n  }\n}\n","// Button variants\n//\n// Easily pump out default styles, as well as :hover, :focus, :active,\n// and disabled options for all buttons\n\n@mixin button-variant($color, $background, $border) {\n  $active-background: darken($background, 10%);\n  $active-border: darken($border, 12%);\n\n  color: $color;\n  background-color: $background;\n  border-color: $border;\n  @include box-shadow($btn-box-shadow);\n\n  // Hover and focus styles are shared\n  @include hover {\n    color: $color;\n    background-color: $active-background;\n    border-color: $active-border;\n  }\n  &:focus,\n  &.focus {\n    // Avoid using mixin so we can pass custom focus shadow properly\n    @if $enable-shadows {\n      box-shadow: $btn-box-shadow, 0 0 0 2px rgba($border, .5);\n    } @else {\n      box-shadow: 0 0 0 2px rgba($border, .5);\n    }\n  }\n\n  // Disabled comes first so active can properly restyle\n  &.disabled,\n  &:disabled {\n    background-color: $background;\n    border-color: $border;\n  }\n\n  &:active,\n  &.active,\n  .show > &.dropdown-toggle {\n    color: $color;\n    background-color: $active-background;\n    background-image: none; // Remove the gradient for the pressed/active state\n    border-color: $active-border;\n    @include box-shadow($btn-active-box-shadow);\n  }\n}\n\n@mixin button-outline-variant($color, $color-hover: #fff) {\n  color: $color;\n  background-image: none;\n  background-color: transparent;\n  border-color: $color;\n\n  @include hover {\n    color: $color-hover;\n    background-color: $color;\n    border-color: $color;\n  }\n\n  &:focus,\n  &.focus {\n    box-shadow: 0 0 0 2px rgba($color, .5);\n  }\n\n  &.disabled,\n  &:disabled {\n    color: $color;\n    background-color: transparent;\n  }\n\n  &:active,\n  &.active,\n  .show > &.dropdown-toggle {\n    color: $color-hover;\n    background-color: $color;\n    border-color: $color;\n  }\n}\n\n// Button sizes\n@mixin button-size($padding-y, $padding-x, $font-size, $border-radius) {\n  padding: $padding-y $padding-x;\n  font-size: $font-size;\n  @include border-radius($border-radius);\n}\n",".fade {\n  opacity: 0;\n  @include transition($transition-fade);\n\n  &.show {\n    opacity: 1;\n  }\n}\n\n.collapse {\n  display: none;\n  &.show {\n    display: block;\n  }\n}\n\ntr {\n  &.collapse.show {\n    display: table-row;\n  }\n}\n\ntbody {\n  &.collapse.show {\n    display: table-row-group;\n  }\n}\n\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  @include transition($transition-collapse);\n}\n","// The dropdown wrapper (`<div>`)\n.dropup,\n.dropdown {\n  position: relative;\n}\n\n.dropdown-toggle {\n  // Generate the caret automatically\n  &::after {\n    display: inline-block;\n    width: 0;\n    height: 0;\n    margin-left: $caret-width;\n    vertical-align: middle;\n    content: \"\";\n    border-top: $caret-width solid;\n    border-right: $caret-width solid transparent;\n    border-left: $caret-width solid transparent;\n  }\n\n  // Prevent the focus on the dropdown toggle when closing dropdowns\n  &:focus {\n    outline: 0;\n  }\n}\n\n.dropup {\n  .dropdown-toggle {\n    &::after {\n      border-top: 0;\n      border-bottom: $caret-width solid;\n    }\n  }\n}\n\n// The dropdown menu\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: $zindex-dropdown;\n  display: none; // none by default, but block on \"open\" of the menu\n  float: left;\n  min-width: $dropdown-min-width;\n  padding: $dropdown-padding-y 0;\n  margin: $dropdown-margin-top 0 0; // override default ul\n  font-size: $font-size-base; // Redeclare because nesting can cause inheritance issues\n  color: $body-color;\n  text-align: left; // Ensures proper alignment if parent has it changed (e.g., modal footer)\n  list-style: none;\n  background-color: $dropdown-bg;\n  background-clip: padding-box;\n  border: $dropdown-border-width solid $dropdown-border-color;\n  @include border-radius($border-radius);\n  @include box-shadow($dropdown-box-shadow);\n}\n\n// Dividers (basically an `<hr>`) within the dropdown\n.dropdown-divider {\n  @include nav-divider($dropdown-divider-bg);\n}\n\n// Links, buttons, and more within the dropdown menu\n//\n// `<button>`-specific styles are denoted with `// For <button>s`\n.dropdown-item {\n  display: block;\n  width: 100%; // For `<button>`s\n  padding: 3px $dropdown-item-padding-x;\n  clear: both;\n  font-weight: $font-weight-normal;\n  color: $dropdown-link-color;\n  text-align: inherit; // For `<button>`s\n  white-space: nowrap; // prevent links from randomly breaking onto new lines\n  background: none; // For `<button>`s\n  border: 0; // For `<button>`s\n\n  @include hover-focus {\n    color: $dropdown-link-hover-color;\n    text-decoration: none;\n    background-color: $dropdown-link-hover-bg;\n  }\n\n  &.active,\n  &:active {\n    color: $dropdown-link-active-color;\n    text-decoration: none;\n    background-color: $dropdown-link-active-bg;\n  }\n\n  &.disabled,\n  &:disabled {\n    color: $dropdown-link-disabled-color;\n    cursor: $cursor-disabled;\n    background-color: transparent;\n    // Remove CSS gradients if they're enabled\n    @if $enable-gradients {\n      background-image: none;\n    }\n  }\n}\n\n// Open state for the dropdown\n.show {\n  // Show the menu\n  > .dropdown-menu {\n    display: block;\n  }\n\n  // Remove the outline when :focus is triggered\n  > a {\n    outline: 0;\n  }\n}\n\n// Menu positioning\n//\n// Add extra class to `.dropdown-menu` to flip the alignment of the dropdown\n// menu with the parent.\n.dropdown-menu-right {\n  right: 0;\n  left: auto; // Reset the default from `.dropdown-menu`\n}\n\n.dropdown-menu-left {\n  right: auto;\n  left: 0;\n}\n\n// Dropdown section headers\n.dropdown-header {\n  display: block;\n  padding: $dropdown-padding-y $dropdown-item-padding-x;\n  margin-bottom: 0; // for use with heading elements\n  font-size: $font-size-sm;\n  color: $dropdown-header-color;\n  white-space: nowrap; // as with > li > a\n}\n\n// Backdrop to catch body clicks on mobile, etc.\n.dropdown-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: $zindex-dropdown-backdrop;\n}\n\n// Allow for dropdowns to go bottom up (aka, dropup-menu)\n//\n// Just add .dropup after the standard .dropdown class and you're set.\n\n.dropup {\n  // Different positioning for bottom up menu\n  .dropdown-menu {\n    top: auto;\n    bottom: 100%;\n    margin-bottom: $dropdown-margin-top;\n  }\n}\n","// Horizontal dividers\n//\n// Dividers (basically an hr) within dropdowns and nav lists\n\n@mixin nav-divider($color: #e5e5e5) {\n  height: 1px;\n  margin: ($spacer-y / 2) 0;\n  overflow: hidden;\n  background-color: $color;\n}\n","// scss-lint:disable QualifyingElement\n\n// Make the div behave like a button\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-flex;\n  vertical-align: middle; // match .btn alignment given font-size hack above\n\n  > .btn {\n    position: relative;\n    flex: 0 1 auto;\n\n    // Bring the hover, focused, and \"active\" buttons to the fron to overlay\n    // the borders properly\n    @include hover {\n      z-index: 2;\n    }\n    &:focus,\n    &:active,\n    &.active {\n      z-index: 2;\n    }\n  }\n\n  // Prevent double borders when buttons are next to each other\n  .btn + .btn,\n  .btn + .btn-group,\n  .btn-group + .btn,\n  .btn-group + .btn-group {\n    margin-left: -$input-btn-border-width;\n  }\n}\n\n// Optional: Group multiple button groups together for a toolbar\n.btn-toolbar {\n  display: flex;\n  justify-content: flex-start;\n\n  .input-group {\n    width: auto;\n  }\n}\n\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0;\n}\n\n// Set corners individual because sometimes a single button can be in a .btn-group and we need :first-child and :last-child to both match\n.btn-group > .btn:first-child {\n  margin-left: 0;\n\n  &:not(:last-child):not(.dropdown-toggle) {\n    @include border-right-radius(0);\n  }\n}\n// Need .dropdown-toggle since :last-child doesn't apply given a .dropdown-menu immediately after it\n.btn-group > .btn:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  @include border-left-radius(0);\n}\n\n// Custom edits for including btn-groups within btn-groups (useful for including dropdown buttons within a btn-group)\n.btn-group > .btn-group {\n  float: left;\n}\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0;\n}\n.btn-group > .btn-group:first-child:not(:last-child) {\n  > .btn:last-child,\n  > .dropdown-toggle {\n    @include border-right-radius(0);\n  }\n}\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  @include border-left-radius(0);\n}\n\n// On active and open, don't show outline\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0;\n}\n\n\n// Sizing\n//\n// Remix the default button sizing classes into new ones for easier manipulation.\n\n.btn-group-sm > .btn { @extend .btn-sm; }\n.btn-group-lg > .btn { @extend .btn-lg; }\n\n\n//\n// Split button dropdowns\n//\n\n.btn + .dropdown-toggle-split {\n  padding-right: $btn-padding-x * .75;\n  padding-left: $btn-padding-x * .75;\n\n  &::after {\n    margin-left: 0;\n  }\n}\n\n.btn-sm + .dropdown-toggle-split {\n  padding-right: $btn-padding-x-sm * .75;\n  padding-left: $btn-padding-x-sm * .75;\n}\n\n.btn-lg + .dropdown-toggle-split {\n  padding-right: $btn-padding-x-lg * .75;\n  padding-left: $btn-padding-x-lg * .75;\n}\n\n\n// The clickable button for toggling the menu\n// Remove the gradient and set the same inset shadow as the :active state\n.btn-group.open .dropdown-toggle {\n  @include box-shadow($btn-active-box-shadow);\n\n  // Show no shadow for `.btn-link` since it has no other button styles.\n  &.btn-link {\n    @include box-shadow(none);\n  }\n}\n\n\n//\n// Vertical button groups\n//\n\n.btn-group-vertical {\n  display: inline-flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: center;\n\n  .btn,\n  .btn-group {\n    width: 100%;\n  }\n\n  > .btn + .btn,\n  > .btn + .btn-group,\n  > .btn-group + .btn,\n  > .btn-group + .btn-group {\n    margin-top: -$input-btn-border-width;\n    margin-left: 0;\n  }\n}\n\n.btn-group-vertical > .btn {\n  &:not(:first-child):not(:last-child) {\n    border-radius: 0;\n  }\n  &:first-child:not(:last-child) {\n    @include border-bottom-radius(0);\n  }\n  &:last-child:not(:first-child) {\n    @include border-top-radius(0);\n  }\n}\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0;\n}\n.btn-group-vertical > .btn-group:first-child:not(:last-child) {\n  > .btn:last-child,\n  > .dropdown-toggle {\n    @include border-bottom-radius(0);\n  }\n}\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  @include border-top-radius(0);\n}\n\n\n// Checkbox and radio options\n//\n// In order to support the browser's form validation feedback, powered by the\n// `required` attribute, we have to \"hide\" the inputs via `clip`. We cannot use\n// `display: none;` or `visibility: hidden;` as that also hides the popover.\n// Simply visually hiding the inputs via `opacity` would leave them clickable in\n// certain cases which is prevented by using `clip` and `pointer-events`.\n// This way, we ensure a DOM element is visible to position the popover from.\n//\n// See https://github.com/twbs/bootstrap/pull/12794 and\n// https://github.com/twbs/bootstrap/pull/14559 for more information.\n\n[data-toggle=\"buttons\"] {\n  > .btn,\n  > .btn-group > .btn {\n    input[type=\"radio\"],\n    input[type=\"checkbox\"] {\n      position: absolute;\n      clip: rect(0,0,0,0);\n      pointer-events: none;\n    }\n  }\n}\n","//\n// Base styles\n//\n\n.input-group {\n  position: relative;\n  display: flex;\n  width: 100%;\n\n  .form-control {\n    // Ensure that the input is always above the *appended* addon button for\n    // proper border colors.\n    position: relative;\n    z-index: 2;\n    flex: 1 1 auto;\n    // Add width 1% and flex-basis auto to ensure that button will not wrap out\n    // the column. Applies to IE Edge+ and Firefox. Chrome does not require this.\n    width: 1%;\n    margin-bottom: 0;\n\n    // Bring the \"active\" form control to the front\n    @include hover-focus-active {\n      z-index: 3;\n    }\n  }\n}\n\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control {\n  // Vertically centers the content of the addons within the input group\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n\n  &:not(:first-child):not(:last-child) {\n    @include border-radius(0);\n  }\n}\n\n.input-group-addon,\n.input-group-btn {\n  white-space: nowrap;\n  vertical-align: middle; // Match the inputs\n}\n\n\n// Sizing options\n//\n// Remix the default form control sizing classes into new ones for easier\n// manipulation.\n\n.input-group-lg > .form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn {\n  @extend .form-control-lg;\n}\n.input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn {\n  @extend .form-control-sm;\n}\n\n\n//\n// Text input groups\n//\n\n.input-group-addon {\n  padding: $input-padding-y $input-padding-x;\n  margin-bottom: 0; // Allow use of <label> elements by overriding our default margin-bottom\n  font-size: $font-size-base; // Match inputs\n  font-weight: $font-weight-normal;\n  line-height: $input-line-height;\n  color: $input-color;\n  text-align: center;\n  background-color: $input-group-addon-bg;\n  border: $input-btn-border-width solid $input-group-addon-border-color;\n  @include border-radius($input-border-radius);\n\n  // Sizing\n  &.form-control-sm {\n    padding: $input-padding-y-sm $input-padding-x-sm;\n    font-size: $font-size-sm;\n    @include border-radius($input-border-radius-sm);\n  }\n  &.form-control-lg {\n    padding: $input-padding-y-lg $input-padding-x-lg;\n    font-size: $font-size-lg;\n    @include border-radius($input-border-radius-lg);\n  }\n\n  // scss-lint:disable QualifyingElement\n  // Nuke default margins from checkboxes and radios to vertically center within.\n  input[type=\"radio\"],\n  input[type=\"checkbox\"] {\n    margin-top: 0;\n  }\n  // scss-lint:enable QualifyingElement\n}\n\n\n//\n// Reset rounded corners\n//\n\n.input-group .form-control:not(:last-child),\n.input-group-addon:not(:last-child),\n.input-group-btn:not(:last-child) > .btn,\n.input-group-btn:not(:last-child) > .btn-group > .btn,\n.input-group-btn:not(:last-child) > .dropdown-toggle,\n.input-group-btn:not(:first-child) > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:not(:first-child) > .btn-group:not(:last-child) > .btn {\n  @include border-right-radius(0);\n}\n.input-group-addon:not(:last-child) {\n  border-right: 0;\n}\n.input-group .form-control:not(:first-child),\n.input-group-addon:not(:first-child),\n.input-group-btn:not(:first-child) > .btn,\n.input-group-btn:not(:first-child) > .btn-group > .btn,\n.input-group-btn:not(:first-child) > .dropdown-toggle,\n.input-group-btn:not(:last-child) > .btn:not(:first-child),\n.input-group-btn:not(:last-child) > .btn-group:not(:first-child) > .btn {\n  @include border-left-radius(0);\n}\n.form-control + .input-group-addon:not(:first-child) {\n  border-left: 0;\n}\n\n//\n// Button input groups\n//\n\n.input-group-btn {\n  position: relative;\n  // Jankily prevent input button groups from wrapping with `white-space` and\n  // `font-size` in combination with `inline-block` on buttons.\n  font-size: 0;\n  white-space: nowrap;\n\n  // Negative margin for spacing, position for bringing hovered/focused/actived\n  // element above the siblings.\n  > .btn {\n    position: relative;\n    // Vertically stretch the button and center its content\n    flex: 1;\n\n    + .btn {\n      margin-left: (-$input-btn-border-width);\n    }\n\n    // Bring the \"active\" button to the front\n    @include hover-focus-active {\n      z-index: 3;\n    }\n  }\n\n  // Negative margin to only have a single, shared border between the two\n  &:not(:last-child) {\n    > .btn,\n    > .btn-group {\n      margin-right: (-$input-btn-border-width);\n    }\n  }\n  &:not(:first-child) {\n    > .btn,\n    > .btn-group {\n      z-index: 2;\n      margin-left: (-$input-btn-border-width);\n      // Because specificity\n      @include hover-focus-active {\n        z-index: 3;\n      }\n    }\n  }\n}\n","// scss-lint:disable PropertyCount\n\n// Embedded icons from Open Iconic.\n// Released under MIT and copyright 2014 Waybury.\n// https://useiconic.com/open\n\n\n// Checkboxes and radios\n//\n// Base class takes care of all the key behavioral aspects.\n\n.custom-control {\n  position: relative;\n  display: inline-flex;\n  min-height: (1rem * $line-height-base);\n  padding-left: $custom-control-gutter;\n  margin-right: $custom-control-spacer-x;\n  cursor: pointer;\n}\n\n.custom-control-input {\n  position: absolute;\n  z-index: -1; // Put the input behind the label so it doesn't overlay text\n  opacity: 0;\n\n  &:checked ~ .custom-control-indicator {\n    color: $custom-control-checked-indicator-color;\n    background-color: $custom-control-checked-indicator-bg;\n    @include box-shadow($custom-control-checked-indicator-box-shadow);\n  }\n\n  &:focus ~ .custom-control-indicator {\n    // the mixin is not used here to make sure there is feedback\n    box-shadow: $custom-control-focus-indicator-box-shadow;\n  }\n\n  &:active ~ .custom-control-indicator {\n    color: $custom-control-active-indicator-color;\n    background-color: $custom-control-active-indicator-bg;\n    @include box-shadow($custom-control-active-indicator-box-shadow);\n  }\n\n  &:disabled {\n    ~ .custom-control-indicator {\n      cursor: $custom-control-disabled-cursor;\n      background-color: $custom-control-disabled-indicator-bg;\n    }\n\n    ~ .custom-control-description {\n      color: $custom-control-disabled-description-color;\n      cursor: $custom-control-disabled-cursor;\n    }\n  }\n}\n\n// Custom indicator\n//\n// Generates a shadow element to create our makeshift checkbox/radio background.\n\n.custom-control-indicator {\n  position: absolute;\n  top: (($line-height-base - $custom-control-indicator-size) / 2);\n  left: 0;\n  display: block;\n  width: $custom-control-indicator-size;\n  height: $custom-control-indicator-size;\n  pointer-events: none;\n  user-select: none;\n  background-color: $custom-control-indicator-bg;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: $custom-control-indicator-bg-size;\n  @include box-shadow($custom-control-indicator-box-shadow);\n}\n\n// Checkboxes\n//\n// Tweak just a few things for checkboxes.\n\n.custom-checkbox {\n  .custom-control-indicator {\n    @include border-radius($custom-checkbox-radius);\n  }\n\n  .custom-control-input:checked ~ .custom-control-indicator {\n    background-image: $custom-checkbox-checked-icon;\n  }\n\n  .custom-control-input:indeterminate ~ .custom-control-indicator {\n    background-color: $custom-checkbox-indeterminate-bg;\n    background-image: $custom-checkbox-indeterminate-icon;\n    @include box-shadow($custom-checkbox-indeterminate-box-shadow);\n  }\n}\n\n// Radios\n//\n// Tweak just a few things for radios.\n\n.custom-radio {\n  .custom-control-indicator {\n    border-radius: $custom-radio-radius;\n  }\n\n  .custom-control-input:checked ~ .custom-control-indicator {\n    background-image: $custom-radio-checked-icon;\n  }\n}\n\n\n// Layout options\n//\n// By default radios and checkboxes are `inline-block` with no additional spacing\n// set. Use these optional classes to tweak the layout.\n\n.custom-controls-stacked {\n  display: flex;\n  flex-direction: column;\n\n  .custom-control {\n    margin-bottom: $custom-control-spacer-y;\n\n    + .custom-control {\n      margin-left: 0;\n    }\n  }\n}\n\n\n// Select\n//\n// Replaces the browser default select with a custom one, mostly pulled from\n// http://primercss.io.\n//\n\n.custom-select {\n  display: inline-block;\n  max-width: 100%;\n  $select-border-width: ($border-width * 2);\n  height: calc(#{$input-height} + #{$select-border-width});\n  padding: $custom-select-padding-y ($custom-select-padding-x + $custom-select-indicator-padding) $custom-select-padding-y $custom-select-padding-x;\n  line-height: $custom-select-line-height;\n  color: $custom-select-color;\n  vertical-align: middle;\n  background: $custom-select-bg $custom-select-indicator no-repeat right $custom-select-padding-x center;\n  background-size: $custom-select-bg-size;\n  border: $custom-select-border-width solid $custom-select-border-color;\n  @include border-radius($custom-select-border-radius);\n  // Use vendor prefixes as `appearance` isn't part of the CSS spec.\n  -moz-appearance: none;\n  -webkit-appearance: none;\n\n  &:focus {\n    border-color: $custom-select-focus-border-color;\n    outline: none;\n    @include box-shadow($custom-select-focus-box-shadow);\n\n    &::-ms-value {\n      // For visual consistency with other platforms/browsers,\n      // supress the default white text on blue background highlight given to\n      // the selected option text when the (still closed) <select> receives focus\n      // in IE and (under certain conditions) Edge.\n      // See https://github.com/twbs/bootstrap/issues/19398.\n      color: $input-color;\n      background-color: $input-bg;\n    }\n  }\n\n  &:disabled {\n    color: $custom-select-disabled-color;\n    cursor: $cursor-disabled;\n    background-color: $custom-select-disabled-bg;\n  }\n\n  // Hides the default caret in IE11\n  &::-ms-expand {\n    opacity: 0;\n  }\n}\n\n.custom-select-sm {\n  padding-top: $custom-select-padding-y;\n  padding-bottom: $custom-select-padding-y;\n  font-size: $custom-select-sm-font-size;\n\n  // &:not([multiple]) {\n  //   height: 26px;\n  //   min-height: 26px;\n  // }\n}\n\n\n// File\n//\n// Custom file input.\n\n.custom-file {\n  position: relative;\n  display: inline-block;\n  max-width: 100%;\n  height: $custom-file-height;\n  margin-bottom: 0;\n  cursor: pointer;\n}\n\n.custom-file-input {\n  min-width: $custom-file-width;\n  max-width: 100%;\n  height: $custom-file-height;\n  margin: 0;\n  filter: alpha(opacity = 0);\n  opacity: 0;\n\n  &:focus ~ .custom-file-control {\n    @include box-shadow($custom-file-focus-box-shadow);\n  }\n}\n\n.custom-file-control {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 5;\n  height: $custom-file-height;\n  padding: $custom-file-padding-x $custom-file-padding-y;\n  line-height: $custom-file-line-height;\n  color: $custom-file-color;\n  pointer-events: none;\n  user-select: none;\n  background-color: $custom-file-bg;\n  border: $custom-file-border-width solid $custom-file-border-color;\n  @include border-radius($custom-file-border-radius);\n  @include box-shadow($custom-file-box-shadow);\n\n  @each $lang, $text in map-get($custom-file-text, placeholder) {\n    &:lang(#{$lang})::after {\n      content: $text;\n    }\n  }\n\n  &::before {\n    position: absolute;\n    top: -$custom-file-border-width;\n    right: -$custom-file-border-width;\n    bottom: -$custom-file-border-width;\n    z-index: 6;\n    display: block;\n    height: $custom-file-height;\n    padding: $custom-file-padding-x $custom-file-padding-y;\n    line-height: $custom-file-line-height;\n    color: $custom-file-button-color;\n    background-color: $custom-file-button-bg;\n    border: $custom-file-border-width solid $custom-file-border-color;\n    @include border-radius(0 $custom-file-border-radius $custom-file-border-radius 0);\n  }\n\n  @each $lang, $text in map-get($custom-file-text, button-label) {\n    &:lang(#{$lang})::before {\n      content: $text;\n    }\n  }\n}\n","// Base class\n//\n// Kickstart any navigation component with a set of style resets. Works with\n// `<nav>`s or `<ul>`s.\n\n.nav {\n  display: flex;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none;\n}\n\n.nav-link {\n  display: block;\n  padding: $nav-link-padding;\n\n  @include hover-focus {\n    text-decoration: none;\n  }\n\n  // Disabled state lightens text and removes hover/tab effects\n  &.disabled {\n    color: $nav-disabled-link-color;\n    cursor: $cursor-disabled;\n  }\n}\n\n\n//\n// Tabs\n//\n\n.nav-tabs {\n  border-bottom: $nav-tabs-border-width solid $nav-tabs-border-color;\n\n  .nav-item {\n    margin-bottom: -$nav-tabs-border-width;\n  }\n\n  .nav-link {\n    border: $nav-tabs-border-width solid transparent;\n    @include border-top-radius($nav-tabs-border-radius);\n\n    @include hover-focus {\n      border-color: $nav-tabs-link-hover-border-color $nav-tabs-link-hover-border-color $nav-tabs-border-color;\n    }\n\n    &.disabled {\n      color: $nav-disabled-link-color;\n      background-color: transparent;\n      border-color: transparent;\n    }\n  }\n\n  .nav-link.active,\n  .nav-item.show .nav-link {\n    color: $nav-tabs-active-link-hover-color;\n    background-color: $nav-tabs-active-link-hover-bg;\n    border-color: $nav-tabs-active-link-hover-border-color $nav-tabs-active-link-hover-border-color $nav-tabs-active-link-hover-bg;\n  }\n\n  .dropdown-menu {\n    // Make dropdown border overlap tab border\n    margin-top: -$nav-tabs-border-width;\n    // Remove the top rounded corners here since there is a hard edge above the menu\n    @include border-top-radius(0);\n  }\n}\n\n\n//\n// Pills\n//\n\n.nav-pills {\n  .nav-link {\n    @include border-radius($nav-pills-border-radius);\n  }\n\n  .nav-link.active,\n  .nav-item.show .nav-link {\n    color: $nav-pills-active-link-color;\n    cursor: default;\n    background-color: $nav-pills-active-link-bg;\n  }\n}\n\n\n//\n// Justified variants\n//\n\n.nav-fill {\n  .nav-item {\n    flex: 1 1 auto;\n    text-align: center;\n  }\n}\n\n.nav-justified {\n  .nav-item {\n    flex: 1 1 100%;\n    text-align: center;\n  }\n}\n\n\n// Tabbable tabs\n//\n// Hide tabbable panes to start, show them when `.active`\n\n.tab-content {\n  > .tab-pane {\n    display: none;\n  }\n  > .active {\n    display: block;\n  }\n}\n","// Contents\n//\n// Navbar\n// Navbar brand\n// Navbar nav\n// Navbar text\n// Navbar divider\n// Responsive navbar\n// Navbar position\n// Navbar themes\n\n\n// Navbar\n//\n// Provide a static navbar from which we expand to create full-width, fixed, and\n// other navbar variations.\n\n.navbar {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  padding: $navbar-padding-y $navbar-padding-x;\n}\n\n\n// Navbar brand\n//\n// Used for brand, project, or site names.\n\n.navbar-brand {\n  display: inline-block;\n  padding-top: .25rem;\n  padding-bottom: .25rem;\n  margin-right: $navbar-padding-x;\n  font-size: $font-size-lg;\n  line-height: inherit;\n  white-space: nowrap;\n\n  @include hover-focus {\n    text-decoration: none;\n  }\n}\n\n\n// Navbar nav\n//\n// Custom navbar navigation (doesn't require `.nav`, but does make use of `.nav-link`).\n\n.navbar-nav {\n  display: flex;\n  flex-direction: column; // cannot use `inherit` to get the `.navbar`s value\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none;\n\n  .nav-link {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n\n\n// Navbar text\n//\n//\n\n.navbar-text {\n  display: inline-block;\n  padding-top:    .425rem;\n  padding-bottom: .425rem;\n}\n\n\n// Responsive navbar\n//\n// Custom styles for responsive collapsing and toggling of navbar contents.\n// Powered by the collapse Bootstrap JavaScript plugin.\n\n// Button for toggling the navbar when in its collapsed state\n.navbar-toggler {\n  align-self: flex-start; // Prevent toggler from growing to full width when it's the only visible navbar child\n  padding: $navbar-toggler-padding-y $navbar-toggler-padding-x;\n  font-size: $navbar-toggler-font-size;\n  line-height: 1;\n  background: transparent; // remove default button style\n  border: $border-width solid transparent; // remove default button style\n  @include border-radius($navbar-toggler-border-radius);\n\n  @include hover-focus {\n    text-decoration: none;\n  }\n}\n\n// Keep as a separate element so folks can easily override it with another icon\n// or image file as needed.\n.navbar-toggler-icon {\n  display: inline-block;\n  width: 1.5em;\n  height: 1.5em;\n  vertical-align: middle;\n  content: \"\";\n  background: no-repeat center center;\n  background-size: 100% 100%;\n}\n\n// Use `position` on the toggler to prevent it from being auto placed as a flex\n// item and allow easy placement.\n.navbar-toggler-left {\n  position: absolute;\n  left: $navbar-padding-x;\n}\n.navbar-toggler-right {\n  position: absolute;\n  right: $navbar-padding-x;\n}\n\n// Generate series of `.navbar-toggleable-*` responsive classes for configuring\n// where your navbar collapses.\n.navbar-toggleable {\n  @each $breakpoint in map-keys($grid-breakpoints) {\n    $next: breakpoint-next($breakpoint, $grid-breakpoints);\n    $infix: breakpoint-infix($breakpoint, $grid-breakpoints);\n\n    &#{$infix} {\n      @include media-breakpoint-down($breakpoint) {\n        .navbar-nav {\n          .dropdown-menu {\n            position: static;\n            float: none;\n          }\n        }\n\n        > .container {\n          padding-right: 0;\n          padding-left: 0;\n        }\n      }\n\n      @include media-breakpoint-up($next) {\n        flex-direction: row;\n        flex-wrap: nowrap;\n        align-items: center;\n\n        .navbar-nav {\n          flex-direction: row;\n\n          .nav-link {\n            padding-right: .5rem;\n            padding-left: .5rem;\n          }\n        }\n\n        // For nesting containers, have to redeclare for alignment purposes\n        > .container {\n          display: flex;\n          flex-wrap: nowrap;\n          align-items: center;\n        }\n\n        // scss-lint:disable ImportantRule\n        .navbar-collapse {\n          display: flex !important;\n          width: 100%;\n        }\n        // scss-lint:enable ImportantRule\n\n        .navbar-toggler {\n          display: none;\n        }\n      }\n    }\n  }\n}\n\n\n// Navbar themes\n//\n// Styles for switching between navbars with light or dark background.\n\n// Dark links against a light background\n.navbar-light {\n  .navbar-brand,\n  .navbar-toggler {\n    color: $navbar-light-active-color;\n\n    @include hover-focus {\n      color: $navbar-light-active-color;\n    }\n  }\n\n  .navbar-nav {\n    .nav-link {\n      color: $navbar-light-color;\n\n      @include hover-focus {\n        color: $navbar-light-hover-color;\n      }\n\n      &.disabled {\n        color: $navbar-light-disabled-color;\n      }\n    }\n\n    .open > .nav-link,\n    .active > .nav-link,\n    .nav-link.open,\n    .nav-link.active {\n      color: $navbar-light-active-color;\n    }\n  }\n\n  .navbar-toggler {\n    border-color: $navbar-light-toggler-border;\n  }\n\n  .navbar-toggler-icon {\n    background-image: $navbar-light-toggler-bg;\n  }\n\n  .navbar-text {\n    color: $navbar-light-color;\n  }\n}\n\n// White links against a dark background\n.navbar-inverse {\n  .navbar-brand,\n  .navbar-toggler {\n    color: $navbar-inverse-active-color;\n\n    @include hover-focus {\n      color: $navbar-inverse-active-color;\n    }\n  }\n\n  .navbar-nav {\n    .nav-link {\n      color: $navbar-inverse-color;\n\n      @include hover-focus {\n        color: $navbar-inverse-hover-color;\n      }\n\n      &.disabled {\n        color: $navbar-inverse-disabled-color;\n      }\n    }\n\n    .open > .nav-link,\n    .active > .nav-link,\n    .nav-link.open,\n    .nav-link.active {\n      color: $navbar-inverse-active-color;\n    }\n  }\n\n  .navbar-toggler {\n    border-color: $navbar-inverse-toggler-border;\n  }\n\n  .navbar-toggler-icon {\n    background-image: $navbar-inverse-toggler-bg;\n  }\n\n  .navbar-text {\n    color: $navbar-inverse-color;\n  }\n}\n","//\n// Base styles\n//\n\n.card {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  background-color: $card-bg;\n  border: $card-border-width solid $card-border-color;\n  @include border-radius($card-border-radius);\n}\n\n.card-block {\n  // Enable `flex-grow: 1` for decks and groups so that card blocks take up\n  // as much space as possible, ensuring footers are aligned to the bottom.\n  flex: 1 1 auto;\n  padding: $card-spacer-x;\n}\n\n.card-title {\n  margin-bottom: $card-spacer-y;\n}\n\n.card-subtitle {\n  margin-top: -($card-spacer-y / 2);\n  margin-bottom: 0;\n}\n\n.card-text:last-child {\n  margin-bottom: 0;\n}\n\n.card-link {\n  @include hover {\n    text-decoration: none;\n  }\n\n  + .card-link {\n    margin-left: $card-spacer-x;\n  }\n}\n\n.card {\n  > .list-group:first-child {\n    .list-group-item:first-child {\n      @include border-top-radius($card-border-radius);\n    }\n  }\n\n  > .list-group:last-child {\n    .list-group-item:last-child {\n      @include border-bottom-radius($card-border-radius);\n    }\n  }\n}\n\n\n//\n// Optional textual caps\n//\n\n.card-header {\n  padding: $card-spacer-y $card-spacer-x;\n  margin-bottom: 0; // Removes the default margin-bottom of <hN>\n  background-color: $card-cap-bg;\n  border-bottom: $card-border-width solid $card-border-color;\n\n  &:first-child {\n    @include border-radius($card-border-radius-inner $card-border-radius-inner 0 0);\n  }\n}\n\n.card-footer {\n  padding: $card-spacer-y $card-spacer-x;\n  background-color: $card-cap-bg;\n  border-top: $card-border-width solid $card-border-color;\n\n  &:last-child {\n    @include border-radius(0 0 $card-border-radius-inner $card-border-radius-inner);\n  }\n}\n\n\n//\n// Header navs\n//\n\n.card-header-tabs {\n  margin-right: -($card-spacer-x / 2);\n  margin-bottom: -$card-spacer-y;\n  margin-left: -($card-spacer-x / 2);\n  border-bottom: 0;\n}\n\n.card-header-pills {\n  margin-right: -($card-spacer-x / 2);\n  margin-left: -($card-spacer-x / 2);\n}\n\n\n//\n// Background variations\n//\n\n.card-primary {\n  @include card-variant($brand-primary, $brand-primary);\n}\n.card-success {\n  @include card-variant($brand-success, $brand-success);\n}\n.card-info {\n  @include card-variant($brand-info, $brand-info);\n}\n.card-warning {\n  @include card-variant($brand-warning, $brand-warning);\n}\n.card-danger {\n  @include card-variant($brand-danger, $brand-danger);\n}\n\n// Remove all backgrounds\n.card-outline-primary {\n  @include card-outline-variant($btn-primary-bg);\n}\n.card-outline-secondary {\n  @include card-outline-variant($btn-secondary-border);\n}\n.card-outline-info {\n  @include card-outline-variant($btn-info-bg);\n}\n.card-outline-success {\n  @include card-outline-variant($btn-success-bg);\n}\n.card-outline-warning {\n  @include card-outline-variant($btn-warning-bg);\n}\n.card-outline-danger {\n  @include card-outline-variant($btn-danger-bg);\n}\n\n//\n// Inverse text within a card for use with dark backgrounds\n//\n\n.card-inverse {\n  @include card-inverse;\n}\n\n//\n// Blockquote\n//\n\n.card-blockquote {\n  padding: 0;\n  margin-bottom: 0;\n  border-left: 0;\n}\n\n// Card image\n.card-img {\n  // margin: -1.325rem;\n  @include border-radius($card-border-radius-inner);\n}\n.card-img-overlay {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: $card-img-overlay-padding;\n}\n\n\n\n// Card image caps\n.card-img-top {\n  @include border-top-radius($card-border-radius-inner);\n}\n.card-img-bottom {\n  @include border-bottom-radius($card-border-radius-inner);\n}\n\n\n// Card deck\n\n@include media-breakpoint-up(sm) {\n  .card-deck {\n    display: flex;\n    flex-flow: row wrap;\n\n    .card {\n      display: flex;\n      flex: 1 0 0;\n      flex-direction: column;\n\n      // Selectively apply horizontal margins to cards to avoid doing the\n      // negative margin dance like our grid. This differs from the grid\n      // due to the use of margins as gutters instead of padding.\n      &:not(:first-child) { margin-left: $card-deck-margin; }\n      &:not(:last-child) { margin-right: $card-deck-margin; }\n    }\n  }\n}\n\n\n//\n// Card groups\n//\n\n@include media-breakpoint-up(sm) {\n  .card-group {\n    display: flex;\n    flex-flow: row wrap;\n\n    .card {\n      flex: 1 0 0;\n\n      + .card {\n        margin-left: 0;\n        border-left: 0;\n      }\n\n      // Handle rounded corners\n      @if $enable-rounded {\n        &:first-child {\n          @include border-right-radius(0);\n\n          .card-img-top {\n            border-top-right-radius: 0;\n          }\n          .card-img-bottom {\n            border-bottom-right-radius: 0;\n          }\n        }\n        &:last-child {\n          @include border-left-radius(0);\n\n          .card-img-top {\n            border-top-left-radius: 0;\n          }\n          .card-img-bottom {\n            border-bottom-left-radius: 0;\n          }\n        }\n\n        &:not(:first-child):not(:last-child) {\n          border-radius: 0;\n\n          .card-img-top,\n          .card-img-bottom {\n            border-radius: 0;\n          }\n        }\n      }\n    }\n  }\n}\n\n\n//\n// Columns\n//\n\n@include media-breakpoint-up(sm) {\n  .card-columns {\n    column-count: $card-columns-count;\n    column-gap: $card-columns-gap;\n\n    .card {\n      display: inline-block; // Don't let them vertically span multiple columns\n      width: 100%; // Don't let their width change\n      margin-bottom: $card-columns-margin;\n    }\n  }\n}\n","// Card variants\n\n@mixin card-variant($background, $border) {\n  background-color: $background;\n  border-color: $border;\n\n  .card-header,\n  .card-footer {\n    background-color: transparent;\n  }\n}\n\n@mixin card-outline-variant($color) {\n  background-color: transparent;\n  border-color: $color;\n}\n\n//\n// Inverse text within a card for use with dark backgrounds\n//\n\n@mixin card-inverse {\n  color: rgba(255,255,255,.65);\n\n  .card-header,\n  .card-footer {\n    background-color: transparent;\n    border-color: rgba(255,255,255,.2);\n  }\n  .card-header,\n  .card-footer,\n  .card-title,\n  .card-blockquote {\n    color: #fff;\n  }\n  .card-link,\n  .card-text,\n  .card-subtitle,\n  .card-blockquote .blockquote-footer {\n    color: rgba(255,255,255,.65);\n  }\n  .card-link {\n    @include hover-focus {\n      color: $card-link-hover-color;\n    }\n  }\n}\n",".breadcrumb {\n  padding: $breadcrumb-padding-y $breadcrumb-padding-x;\n  margin-bottom: $spacer-y;\n  list-style: none;\n  background-color: $breadcrumb-bg;\n  @include border-radius($border-radius);\n  @include clearfix;\n}\n\n.breadcrumb-item {\n  float: left;\n\n  // The separator between breadcrumbs (by default, a forward-slash: \"/\")\n  + .breadcrumb-item::before {\n    display: inline-block; // Suppress underlining of the separator in modern browsers\n    padding-right: $breadcrumb-item-padding;\n    padding-left: $breadcrumb-item-padding;\n    color: $breadcrumb-divider-color;\n    content: \"#{$breadcrumb-divider}\";\n  }\n\n  // IE9-11 hack to properly handle hyperlink underlines for breadcrumbs built\n  // without `<ul>`s. The `::before` pseudo-element generates an element\n  // *within* the .breadcrumb-item and thereby inherits the `text-decoration`.\n  //\n  // To trick IE into suppressing the underline, we give the pseudo-element an\n  // underline and then immediately remove it.\n  + .breadcrumb-item:hover::before {\n    text-decoration: underline;\n  }\n  + .breadcrumb-item:hover::before {\n    text-decoration: none;\n  }\n\n  &.active {\n    color: $breadcrumb-active-color;\n  }\n}\n","@mixin clearfix() {\n  &::after {\n    display: block;\n    content: \"\";\n    clear: both;\n  }\n}\n",".pagination {\n  display: flex;\n  // 1-2: Disable browser default list styles\n  padding-left: 0; // 1\n  list-style: none; // 2\n  @include border-radius();\n}\n\n.page-item {\n  &:first-child {\n    .page-link {\n      margin-left: 0;\n      @include border-left-radius($border-radius);\n    }\n  }\n  &:last-child {\n    .page-link {\n      @include border-right-radius($border-radius);\n    }\n  }\n\n  &.active .page-link {\n    z-index: 2;\n    color: $pagination-active-color;\n    background-color: $pagination-active-bg;\n    border-color: $pagination-active-border;\n  }\n\n  &.disabled .page-link {\n    color: $pagination-disabled-color;\n    pointer-events: none;\n    cursor: $cursor-disabled; // While `pointer-events: none` removes the cursor in modern browsers, we provide a disabled cursor as a fallback.\n    background-color: $pagination-disabled-bg;\n    border-color: $pagination-disabled-border;\n  }\n}\n\n.page-link {\n  position: relative;\n  display: block;\n  padding: $pagination-padding-y $pagination-padding-x;\n  margin-left: -1px;\n  line-height: $pagination-line-height;\n  color: $pagination-color;\n  background-color: $pagination-bg;\n  border: $pagination-border-width solid $pagination-border-color;\n\n  @include hover-focus {\n    color: $pagination-hover-color;\n    text-decoration: none;\n    background-color: $pagination-hover-bg;\n    border-color: $pagination-hover-border;\n  }\n}\n\n\n//\n// Sizing\n//\n\n.pagination-lg {\n  @include pagination-size($pagination-padding-y-lg, $pagination-padding-x-lg, $font-size-lg, $line-height-lg, $border-radius-lg);\n}\n\n.pagination-sm {\n  @include pagination-size($pagination-padding-y-sm, $pagination-padding-x-sm, $font-size-sm, $line-height-sm, $border-radius-sm);\n}\n","// Pagination\n\n@mixin pagination-size($padding-y, $padding-x, $font-size, $line-height, $border-radius) {\n  .page-link {\n    padding: $padding-y $padding-x;\n    font-size: $font-size;\n  }\n\n  .page-item {\n    &:first-child {\n      .page-link {\n        @include border-left-radius($border-radius);\n      }\n    }\n    &:last-child {\n      .page-link {\n        @include border-right-radius($border-radius);\n      }\n    }\n  }\n}\n","// Base class\n//\n// Requires one of the contextual, color modifier classes for `color` and\n// `background-color`.\n\n.badge {\n  display: inline-block;\n  padding: $badge-padding-y $badge-padding-x;\n  font-size: $badge-font-size;\n  font-weight: $badge-font-weight;\n  line-height: 1;\n  color: $badge-color;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  @include border-radius();\n\n  // Empty badges collapse automatically\n  &:empty {\n    display: none;\n  }\n}\n\n// Quick fix for badges in buttons\n.btn .badge {\n  position: relative;\n  top: -1px;\n}\n\n// scss-lint:disable QualifyingElement\n// Add hover effects, but only for links\na.badge {\n  @include hover-focus {\n    color: $badge-link-hover-color;\n    text-decoration: none;\n    cursor: pointer;\n  }\n}\n// scss-lint:enable QualifyingElement\n\n// Pill badges\n//\n// Make them extra rounded with a modifier to replace v3's badges.\n\n.badge-pill {\n  padding-right: $badge-pill-padding-x;\n  padding-left: $badge-pill-padding-x;\n  @include border-radius($badge-pill-border-radius);\n}\n\n// Colors\n//\n// Contextual variations (linked badges get darker on :hover).\n\n.badge-default {\n  @include badge-variant($badge-default-bg);\n}\n\n.badge-primary {\n  @include badge-variant($badge-primary-bg);\n}\n\n.badge-success {\n  @include badge-variant($badge-success-bg);\n}\n\n.badge-info {\n  @include badge-variant($badge-info-bg);\n}\n\n.badge-warning {\n  @include badge-variant($badge-warning-bg);\n}\n\n.badge-danger {\n  @include badge-variant($badge-danger-bg);\n}\n","// Badges\n\n@mixin badge-variant($color) {\n  background-color: $color;\n\n  &[href] {\n    @include hover-focus {\n      background-color: darken($color, 10%);\n    }\n  }\n}\n",".jumbotron {\n  padding: $jumbotron-padding ($jumbotron-padding / 2);\n  margin-bottom: $jumbotron-padding;\n  background-color: $jumbotron-bg;\n  @include border-radius($border-radius-lg);\n\n  @include media-breakpoint-up(sm) {\n    padding: ($jumbotron-padding * 2) $jumbotron-padding;\n  }\n}\n\n.jumbotron-hr {\n  border-top-color: darken($jumbotron-bg, 10%);\n}\n\n.jumbotron-fluid {\n  padding-right: 0;\n  padding-left: 0;\n  @include border-radius(0);\n}\n","//\n// Base styles\n//\n\n.alert {\n  padding: $alert-padding-y $alert-padding-x;\n  margin-bottom: $alert-margin-bottom;\n  border: $alert-border-width solid transparent;\n  @include border-radius($alert-border-radius);\n}\n\n// Headings for larger alerts\n.alert-heading {\n  // Specified to prevent conflicts of changing $headings-color\n  color: inherit;\n}\n\n// Provide class for links that match alerts\n.alert-link {\n  font-weight: $alert-link-font-weight;\n}\n\n\n// Dismissible alerts\n//\n// Expand the right padding and account for the close button's positioning.\n\n.alert-dismissible {\n  // Adjust close link position\n  .close {\n    position: relative;\n    top: -$alert-padding-y;\n    right: -$alert-padding-x;\n    padding: $alert-padding-y $alert-padding-x;\n    color: inherit;\n  }\n}\n\n\n// Alternate styles\n//\n// Generate contextual modifier classes for colorizing the alert.\n\n.alert-success {\n  @include alert-variant($alert-success-bg, $alert-success-border, $alert-success-text);\n}\n.alert-info {\n  @include alert-variant($alert-info-bg, $alert-info-border, $alert-info-text);\n}\n.alert-warning {\n  @include alert-variant($alert-warning-bg, $alert-warning-border, $alert-warning-text);\n}\n.alert-danger {\n  @include alert-variant($alert-danger-bg, $alert-danger-border, $alert-danger-text);\n}\n","// Alerts\n\n@mixin alert-variant($background, $border, $body-color) {\n  background-color: $background;\n  border-color: $border;\n  color: $body-color;\n\n  hr {\n    border-top-color: darken($border, 5%);\n  }\n  .alert-link {\n    color: darken($body-color, 10%);\n  }\n}\n","// Progress animations\n@keyframes progress-bar-stripes {\n  from { background-position: $progress-height 0; }\n  to { background-position: 0 0; }\n}\n\n// Basic progress bar\n.progress {\n  display: flex;\n  overflow: hidden; // force rounded corners by cropping it\n  font-size: $progress-font-size;\n  line-height: $progress-height;\n  text-align: center;\n  background-color: $progress-bg;\n  @include border-radius($progress-border-radius);\n}\n.progress-bar {\n  height: $progress-height;\n  color: $progress-bar-color;\n  background-color: $progress-bar-bg;\n}\n\n// Striped\n.progress-bar-striped {\n  @include gradient-striped();\n  background-size: $progress-height $progress-height;\n}\n\n// Animated\n.progress-bar-animated {\n  animation: progress-bar-stripes $progress-bar-animation-timing;\n}\n","// Gradients\n\n// Horizontal gradient, from left to right\n//\n// Creates two color stops, start and end, by specifying a color and position for each color stop.\n@mixin gradient-x($start-color: #555, $end-color: #333, $start-percent: 0%, $end-percent: 100%) {\n  background-image: linear-gradient(to right, $start-color $start-percent, $end-color $end-percent);\n  background-repeat: repeat-x;\n}\n\n// Vertical gradient, from top to bottom\n//\n// Creates two color stops, start and end, by specifying a color and position for each color stop.\n@mixin gradient-y($start-color: #555, $end-color: #333, $start-percent: 0%, $end-percent: 100%) {\n  background-image: linear-gradient(to bottom, $start-color $start-percent, $end-color $end-percent);\n  background-repeat: repeat-x;\n}\n\n@mixin gradient-directional($start-color: #555, $end-color: #333, $deg: 45deg) {\n  background-repeat: repeat-x;\n  background-image: linear-gradient($deg, $start-color, $end-color);\n}\n@mixin gradient-x-three-colors($start-color: #00b3ee, $mid-color: #7a43b6, $color-stop: 50%, $end-color: #c3325f) {\n  background-image: linear-gradient(to right, $start-color, $mid-color $color-stop, $end-color);\n  background-repeat: no-repeat;\n}\n@mixin gradient-y-three-colors($start-color: #00b3ee, $mid-color: #7a43b6, $color-stop: 50%, $end-color: #c3325f) {\n  background-image: linear-gradient($start-color, $mid-color $color-stop, $end-color);\n  background-repeat: no-repeat;\n}\n@mixin gradient-radial($inner-color: #555, $outer-color: #333) {\n  background-image: radial-gradient(circle, $inner-color, $outer-color);\n  background-repeat: no-repeat;\n}\n@mixin gradient-striped($color: rgba(255,255,255,.15), $angle: 45deg) {\n  background-image: linear-gradient($angle, $color 25%, transparent 25%, transparent 50%, $color 50%, $color 75%, transparent 75%, transparent);\n}\n",".media {\n  display: flex;\n  align-items: flex-start;\n}\n\n.media-body {\n  flex: 1;\n}\n","// Base class\n//\n// Easily usable on <ul>, <ol>, or <div>.\n\n.list-group {\n  display: flex;\n  flex-direction: column;\n\n  // No need to set list-style: none; since .list-group-item is block level\n  padding-left: 0; // reset padding because ul and ol\n  margin-bottom: 0;\n}\n\n\n// Interactive list items\n//\n// Use anchor or button elements instead of `li`s or `div`s to create interactive\n// list items. Includes an extra `.active` modifier class for selected items.\n\n.list-group-item-action {\n  width: 100%; // For `<button>`s (anchors become 100% by default though)\n  color: $list-group-link-color;\n  text-align: inherit; // For `<button>`s (anchors inherit)\n\n  .list-group-item-heading {\n    color: $list-group-link-heading-color;\n  }\n\n  // Hover state\n  @include hover-focus {\n    color: $list-group-link-hover-color;\n    text-decoration: none;\n    background-color: $list-group-hover-bg;\n  }\n\n  &:active {\n    color: $list-group-link-active-color;\n    background-color: $list-group-link-active-bg;\n  }\n}\n\n\n// Individual list items\n//\n// Use on `li`s or `div`s within the `.list-group` parent.\n\n.list-group-item {\n  position: relative;\n  display: flex;\n  flex-flow: row wrap;\n  align-items: center;\n  padding: $list-group-item-padding-y $list-group-item-padding-x;\n  // Place the border on the list items and negative margin up for better styling\n  margin-bottom: -$list-group-border-width;\n  background-color: $list-group-bg;\n  border: $list-group-border-width solid $list-group-border-color;\n\n  &:first-child {\n    @include border-top-radius($list-group-border-radius);\n  }\n\n  &:last-child {\n    margin-bottom: 0;\n    @include border-bottom-radius($list-group-border-radius);\n  }\n\n  @include hover-focus {\n    text-decoration: none;\n  }\n\n  &.disabled,\n  &:disabled {\n    color: $list-group-disabled-color;\n    cursor: $cursor-disabled;\n    background-color: $list-group-disabled-bg;\n\n    // Force color to inherit for custom content\n    .list-group-item-heading {\n      color: inherit;\n    }\n    .list-group-item-text {\n      color: $list-group-disabled-text-color;\n    }\n  }\n\n  // Include both here for `<a>`s and `<button>`s\n  &.active {\n    z-index: 2; // Place active items above their siblings for proper border styling\n    color: $list-group-active-color;\n    background-color: $list-group-active-bg;\n    border-color: $list-group-active-border;\n\n    // Force color to inherit for custom content\n    .list-group-item-heading,\n    .list-group-item-heading > small,\n    .list-group-item-heading > .small {\n      color: inherit;\n    }\n\n    .list-group-item-text {\n      color: $list-group-active-text-color;\n    }\n  }\n}\n\n\n// Flush list items\n//\n// Remove borders and border-radius to keep list group items edge-to-edge. Most\n// useful within other components (e.g., cards).\n\n.list-group-flush {\n  .list-group-item {\n    border-right: 0;\n    border-left: 0;\n    border-radius: 0;\n  }\n\n  &:first-child {\n    .list-group-item:first-child {\n      border-top: 0;\n    }\n  }\n\n  &:last-child {\n    .list-group-item:last-child {\n      border-bottom: 0;\n    }\n  }\n}\n\n\n// Contextual variants\n//\n// Add modifier classes to change text and background color on individual items.\n// Organizationally, this must come after the `:hover` states.\n\n@include list-group-item-variant(success, $state-success-bg, $state-success-text);\n@include list-group-item-variant(info, $state-info-bg, $state-info-text);\n@include list-group-item-variant(warning, $state-warning-bg, $state-warning-text);\n@include list-group-item-variant(danger, $state-danger-bg, $state-danger-text);\n","// List Groups\n\n@mixin list-group-item-variant($state, $background, $color) {\n  .list-group-item-#{$state} {\n    color: $color;\n    background-color: $background;\n  }\n\n  a.list-group-item-#{$state},\n  button.list-group-item-#{$state} {\n    color: $color;\n\n    .list-group-item-heading {\n      color: inherit;\n    }\n\n    @include hover-focus {\n      color: $color;\n      background-color: darken($background, 5%);\n    }\n\n    &.active {\n      color: #fff;\n      background-color: $color;\n      border-color: $color;\n    }\n  }\n}\n","// Credit: Nicolas Gallagher and SUIT CSS.\n\n.embed-responsive {\n  position: relative;\n  display: block;\n  width: 100%;\n  padding: 0;\n  overflow: hidden;\n\n  &::before {\n    display: block;\n    content: \"\";\n  }\n\n  .embed-responsive-item,\n  iframe,\n  embed,\n  object,\n  video {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border: 0;\n  }\n}\n\n.embed-responsive-21by9 {\n  &::before {\n    padding-top: percentage(9 / 21);\n  }\n}\n\n.embed-responsive-16by9 {\n  &::before {\n    padding-top: percentage(9 / 16);\n  }\n}\n\n.embed-responsive-4by3 {\n  &::before {\n    padding-top: percentage(3 / 4);\n  }\n}\n\n.embed-responsive-1by1 {\n  &::before {\n    padding-top: percentage(1 / 1);\n  }\n}\n",".close {\n  float: right;\n  font-size: $close-font-size;\n  font-weight: $close-font-weight;\n  line-height: 1;\n  color: $close-color;\n  text-shadow: $close-text-shadow;\n  opacity: .5;\n\n  @include hover-focus {\n    color: $close-color;\n    text-decoration: none;\n    cursor: pointer;\n    opacity: .75;\n  }\n}\n\n// Additional properties for button version\n// iOS requires the button element instead of an anchor tag.\n// If you want the anchor version, it requires `href=\"#\"`.\n// See https://developer.mozilla.org/en-US/docs/Web/Events/click#Safari_Mobile\n\n// scss-lint:disable QualifyingElement\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none;\n}\n// scss-lint:enable QualifyingElement\n","// .modal-open      - body class for killing the scroll\n// .modal           - container to scroll within\n// .modal-dialog    - positioning shell for the actual modal\n// .modal-content   - actual modal w/ bg and corners and stuff\n\n\n// Kill the scroll on the body\n.modal-open {\n  overflow: hidden;\n}\n\n// Container that the modal scrolls within\n.modal {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: $zindex-modal;\n  display: none;\n  overflow: hidden;\n  // Prevent Chrome on Windows from adding a focus outline. For details, see\n  // https://github.com/twbs/bootstrap/pull/10951.\n  outline: 0;\n  // We deliberately don't use `-webkit-overflow-scrolling: touch;` due to a\n  // gnarly iOS Safari bug: https://bugs.webkit.org/show_bug.cgi?id=158342\n  // See also https://github.com/twbs/bootstrap/issues/17695\n\n  // When fading in the modal, animate it to slide down\n  &.fade .modal-dialog {\n    @include transition($modal-transition);\n    transform: translate(0, -25%);\n  }\n  &.show .modal-dialog { transform: translate(0, 0); }\n}\n.modal-open .modal {\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n\n// Shell div to position the modal with bottom padding\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: $modal-dialog-margin;\n}\n\n// Actual modal\n.modal-content {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  background-color: $modal-content-bg;\n  background-clip: padding-box;\n  border: $modal-content-border-width solid $modal-content-border-color;\n  @include border-radius($border-radius-lg);\n  @include box-shadow($modal-content-xs-box-shadow);\n  // Remove focus outline from opened modal\n  outline: 0;\n}\n\n// Modal background\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: $zindex-modal-backdrop;\n  background-color: $modal-backdrop-bg;\n\n  // Fade for backdrop\n  &.fade { opacity: 0; }\n  &.show { opacity: $modal-backdrop-opacity; }\n}\n\n// Modal header\n// Top section of the modal w/ title and dismiss\n.modal-header {\n  display: flex;\n  align-items: center; // vertically center it\n  justify-content: space-between; // Put modal header elements (title and dismiss) on opposite ends\n  padding: $modal-header-padding;\n  border-bottom: $modal-header-border-width solid $modal-header-border-color;\n}\n\n// Title text within header\n.modal-title {\n  margin-bottom: 0;\n  line-height: $modal-title-line-height;\n}\n\n// Modal body\n// Where all modal content resides (sibling of .modal-header and .modal-footer)\n.modal-body {\n  position: relative;\n  // Enable `flex-grow: 1` so that the body take up as much space as possible\n  // when should there be a fixed height on `.modal-dialog`.\n  flex: 1 1 auto;\n  padding: $modal-inner-padding;\n}\n\n// Footer (for actions)\n.modal-footer {\n  display: flex;\n  align-items: center; // vertically center\n  justify-content: flex-end; // Right align buttons with flex property because text-align doesn't work on flex items\n  padding: $modal-inner-padding;\n  border-top: $modal-footer-border-width solid $modal-footer-border-color;\n\n  // Easily place margin between footer elements\n  > :not(:first-child) { margin-left: .25rem; }\n  > :not(:last-child) { margin-right: .25rem; }\n}\n\n// Measure scrollbar width for padding body during modal show/hide\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll;\n}\n\n// Scale up the modal\n@include media-breakpoint-up(sm) {\n  // Automatically set modal's width for larger viewports\n  .modal-dialog {\n    max-width: $modal-md;\n    margin: $modal-dialog-sm-up-margin-y auto;\n  }\n\n  .modal-content {\n    @include box-shadow($modal-content-sm-up-box-shadow);\n  }\n\n  .modal-sm { max-width: $modal-sm; }\n}\n\n@include media-breakpoint-up(lg) {\n  .modal-lg { max-width: $modal-lg; }\n}\n","// Base class\n.tooltip {\n  position: absolute;\n  z-index: $zindex-tooltip;\n  display: block;\n  // Our parent element can be arbitrary since tooltips are by default inserted as a sibling of their target element.\n  // So reset our font and text properties to avoid inheriting weird values.\n  @include reset-text();\n  font-size: $font-size-sm;\n  // Allow breaking very long words so they don't overflow the tooltip's bounds\n  word-wrap: break-word;\n  opacity: 0;\n\n  &.show { opacity: $tooltip-opacity; }\n\n  &.tooltip-top,\n  &.bs-tether-element-attached-bottom {\n    padding: $tooltip-arrow-width 0;\n    margin-top: -$tooltip-margin;\n\n    .tooltip-inner::before {\n      bottom: 0;\n      left: 50%;\n      margin-left: -$tooltip-arrow-width;\n      content: \"\";\n      border-width: $tooltip-arrow-width $tooltip-arrow-width 0;\n      border-top-color: $tooltip-arrow-color;\n    }\n  }\n  &.tooltip-right,\n  &.bs-tether-element-attached-left {\n    padding: 0 $tooltip-arrow-width;\n    margin-left: $tooltip-margin;\n\n    .tooltip-inner::before {\n      top: 50%;\n      left: 0;\n      margin-top: -$tooltip-arrow-width;\n      content: \"\";\n      border-width: $tooltip-arrow-width $tooltip-arrow-width $tooltip-arrow-width 0;\n      border-right-color: $tooltip-arrow-color;\n    }\n  }\n  &.tooltip-bottom,\n  &.bs-tether-element-attached-top {\n    padding: $tooltip-arrow-width 0;\n    margin-top: $tooltip-margin;\n\n    .tooltip-inner::before {\n      top: 0;\n      left: 50%;\n      margin-left: -$tooltip-arrow-width;\n      content: \"\";\n      border-width: 0 $tooltip-arrow-width $tooltip-arrow-width;\n      border-bottom-color: $tooltip-arrow-color;\n    }\n  }\n  &.tooltip-left,\n  &.bs-tether-element-attached-right {\n    padding: 0 $tooltip-arrow-width;\n    margin-left: -$tooltip-margin;\n\n    .tooltip-inner::before {\n      top: 50%;\n      right: 0;\n      margin-top: -$tooltip-arrow-width;\n      content: \"\";\n      border-width: $tooltip-arrow-width 0 $tooltip-arrow-width $tooltip-arrow-width;\n      border-left-color: $tooltip-arrow-color;\n    }\n  }\n}\n\n// Wrapper for the tooltip content\n.tooltip-inner {\n  max-width: $tooltip-max-width;\n  padding: $tooltip-padding-y $tooltip-padding-x;\n  color: $tooltip-color;\n  text-align: center;\n  background-color: $tooltip-bg;\n  @include border-radius($border-radius);\n\n  &::before {\n    position: absolute;\n    width: 0;\n    height: 0;\n    border-color: transparent;\n    border-style: solid;\n  }\n}\n","@mixin reset-text {\n  font-family: $font-family-base;\n  // We deliberately do NOT reset font-size or word-wrap.\n  font-style: normal;\n  font-weight: $font-weight-normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: $line-height-base;\n  text-align: left; // Fallback for where `start` is not supported\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n}\n",".popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: $zindex-popover;\n  display: block;\n  max-width: $popover-max-width;\n  padding: $popover-inner-padding;\n  // Our parent element can be arbitrary since tooltips are by default inserted as a sibling of their target element.\n  // So reset our font and text properties to avoid inheriting weird values.\n  @include reset-text();\n  font-size: $font-size-sm;\n  // Allow breaking very long words so they don't overflow the popover's bounds\n  word-wrap: break-word;\n  background-color: $popover-bg;\n  background-clip: padding-box;\n  border: $popover-border-width solid $popover-border-color;\n  @include border-radius($border-radius-lg);\n  @include box-shadow($popover-box-shadow);\n\n\n  // Popover directions\n\n  &.popover-top,\n  &.bs-tether-element-attached-bottom {\n    margin-top: -$popover-arrow-width;\n\n    &::before,\n    &::after {\n      left: 50%;\n      border-bottom-width: 0;\n    }\n\n    &::before {\n      bottom: -$popover-arrow-outer-width;\n      margin-left: -$popover-arrow-outer-width;\n      border-top-color: $popover-arrow-outer-color;\n    }\n\n    &::after {\n      bottom: -($popover-arrow-outer-width - 1);\n      margin-left: -$popover-arrow-width;\n      border-top-color: $popover-arrow-color;\n    }\n  }\n\n  &.popover-right,\n  &.bs-tether-element-attached-left {\n    margin-left: $popover-arrow-width;\n\n    &::before,\n    &::after {\n      top: 50%;\n      border-left-width: 0;\n    }\n\n    &::before {\n      left: -$popover-arrow-outer-width;\n      margin-top: -$popover-arrow-outer-width;\n      border-right-color: $popover-arrow-outer-color;\n    }\n\n    &::after {\n      left: -($popover-arrow-outer-width - 1);\n      margin-top: -($popover-arrow-outer-width - 1);\n      border-right-color: $popover-arrow-color;\n    }\n  }\n\n  &.popover-bottom,\n  &.bs-tether-element-attached-top {\n    margin-top: $popover-arrow-width;\n\n    &::before,\n    &::after {\n      left: 50%;\n      border-top-width: 0;\n    }\n\n    &::before {\n      top: -$popover-arrow-outer-width;\n      margin-left: -$popover-arrow-outer-width;\n      border-bottom-color: $popover-arrow-outer-color;\n    }\n\n    &::after {\n      top: -($popover-arrow-outer-width - 1);\n      margin-left: -$popover-arrow-width;\n      border-bottom-color: $popover-title-bg;\n    }\n\n    // This will remove the popover-title's border just below the arrow\n    .popover-title::before {\n      position: absolute;\n      top: 0;\n      left: 50%;\n      display: block;\n      width: 20px;\n      margin-left: -10px;\n      content: \"\";\n      border-bottom: 1px solid $popover-title-bg;\n    }\n  }\n\n  &.popover-left,\n  &.bs-tether-element-attached-right {\n    margin-left: -$popover-arrow-width;\n\n    &::before,\n    &::after {\n      top: 50%;\n      border-right-width: 0;\n    }\n\n    &::before {\n      right: -$popover-arrow-outer-width;\n      margin-top: -$popover-arrow-outer-width;\n      border-left-color: $popover-arrow-outer-color;\n    }\n\n    &::after {\n      right: -($popover-arrow-outer-width - 1);\n      margin-top: -($popover-arrow-outer-width - 1);\n      border-left-color: $popover-arrow-color;\n    }\n  }\n}\n\n\n// Offset the popover to account for the popover arrow\n.popover-title {\n  padding: $popover-title-padding-y $popover-title-padding-x;\n  margin-bottom: 0; // Reset the default from Reboot\n  font-size: $font-size-base;\n  background-color: $popover-title-bg;\n  border-bottom: $popover-border-width solid darken($popover-title-bg, 5%);\n  $offset-border-width: calc(#{$border-radius-lg} - #{$popover-border-width});\n  @include border-top-radius($offset-border-width);\n\n  &:empty {\n    display: none;\n  }\n}\n\n.popover-content {\n  padding: $popover-content-padding-y $popover-content-padding-x;\n}\n\n\n// Arrows\n//\n// .popover-arrow is outer, .popover-arrow::after is inner\n\n.popover::before,\n.popover::after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n\n.popover::before {\n  content: \"\";\n  border-width: $popover-arrow-outer-width;\n}\n.popover::after {\n  content: \"\";\n  border-width: $popover-arrow-width;\n}\n","// Wrapper for the slide container and indicators\n.carousel {\n  position: relative;\n}\n\n.carousel-inner {\n  position: relative;\n  width: 100%;\n  overflow: hidden;\n}\n\n.carousel-item {\n  position: relative;\n  display: none;\n  width: 100%;\n\n  @include if-supports-3d-transforms() {\n    @include transition($carousel-transition);\n    backface-visibility: hidden;\n    perspective: 1000px;\n  }\n}\n\n.carousel-item.active,\n.carousel-item-next,\n.carousel-item-prev {\n  display: flex;\n}\n\n.carousel-item-next,\n.carousel-item-prev {\n  position: absolute;\n  top: 0;\n}\n\n// CSS3 transforms when supported by the browser\n@include if-supports-3d-transforms() {\n  .carousel-item-next.carousel-item-left,\n  .carousel-item-prev.carousel-item-right {\n    transform: translate3d(0, 0, 0);\n  }\n\n  .carousel-item-next,\n  .active.carousel-item-right {\n    transform: translate3d(100%, 0, 0);\n  }\n\n  .carousel-item-prev,\n  .active.carousel-item-left {\n    transform: translate3d(-100%, 0, 0);\n  }\n}\n\n\n//\n// Left/right controls for nav\n//\n\n.carousel-control-prev,\n.carousel-control-next {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  // Use flex for alignment (1-3)\n  display: flex; // 1. allow flex styles\n  align-items: center; // 2. vertically center contents\n  justify-content: center; // 3. horizontally center contents\n  width: $carousel-control-width;\n  color: $carousel-control-color;\n  text-align: center;\n  opacity: $carousel-control-opacity;\n  // We can't have a transition here because WebKit cancels the carousel\n  // animation if you trip this while in the middle of another animation.\n\n  // Hover/focus state\n  @include hover-focus {\n    color: $carousel-control-color;\n    text-decoration: none;\n    outline: 0;\n    opacity: .9;\n  }\n}\n.carousel-control-prev {\n  left: 0;\n}\n.carousel-control-next {\n  right: 0;\n}\n\n// Icons for within\n.carousel-control-prev-icon,\n.carousel-control-next-icon {\n  display: inline-block;\n  width: $carousel-control-icon-width;\n  height: $carousel-control-icon-width;\n  background: transparent no-repeat center center;\n  background-size: 100% 100%;\n}\n.carousel-control-prev-icon {\n  background-image: $carousel-control-prev-icon-bg;\n}\n.carousel-control-next-icon {\n  background-image: $carousel-control-next-icon-bg;\n}\n\n\n// Optional indicator pips\n//\n// Add an ordered list with the following class and add a list item for each\n// slide your carousel holds.\n\n.carousel-indicators {\n  position: absolute;\n  right: 0;\n  bottom: 10px;\n  left: 0;\n  z-index: 15;\n  display: flex;\n  justify-content: center;\n  padding-left: 0; // override <ol> default\n  // Use the .carousel-control's width as margin so we don't overlay those\n  margin-right: $carousel-control-width;\n  margin-left: $carousel-control-width;\n  list-style: none;\n\n  li {\n    position: relative;\n    flex: 1 0 auto;\n    max-width: $carousel-indicator-width;\n    height: $carousel-indicator-height;\n    margin-right: $carousel-indicator-spacer;\n    margin-left: $carousel-indicator-spacer;\n    text-indent: -999px;\n    cursor: pointer;\n    background-color: rgba($carousel-indicator-active-bg, .5);\n\n    // Use pseudo classes to increase the hit area by 10px on top and bottom.\n    &::before {\n      position: absolute;\n      top: -10px;\n      left: 0;\n      display: inline-block;\n      width: 100%;\n      height: 10px;\n      content: \"\";\n    }\n    &::after {\n      position: absolute;\n      bottom: -10px;\n      left: 0;\n      display: inline-block;\n      width: 100%;\n      height: 10px;\n      content: \"\";\n    }\n  }\n\n  .active {\n    background-color: $carousel-indicator-active-bg;\n  }\n}\n\n\n// Optional captions\n//\n//\n\n.carousel-caption {\n  position: absolute;\n  right: ((100% - $carousel-caption-width) / 2);\n  bottom: 20px;\n  left: ((100% - $carousel-caption-width) / 2);\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: $carousel-caption-color;\n  text-align: center;\n}\n","// Applies the given styles only when the browser support CSS3 3D transforms.\n@mixin if-supports-3d-transforms() {\n  @media (-webkit-transform-3d) {\n    // Old Safari, Old Android\n    // http://caniuse.com/#feat=css-featurequeries\n    // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/-webkit-transform-3d\n    @content;\n  }\n\n  @supports (transform: translate3d(0,0,0)) {\n    // The Proper Way: Using a CSS feature query\n    @content;\n  }\n}\n",".align-baseline    { vertical-align: baseline !important; } // Browser default\n.align-top         { vertical-align: top !important; }\n.align-middle      { vertical-align: middle !important; }\n.align-bottom      { vertical-align: bottom !important; }\n.align-text-bottom { vertical-align: text-bottom !important; }\n.align-text-top    { vertical-align: text-top !important; }\n","//\n// Contextual backgrounds\n//\n\n.bg-faded {\n  background-color: darken($body-bg, 3%);\n}\n\n@include bg-variant('.bg-primary', $brand-primary);\n\n@include bg-variant('.bg-success', $brand-success);\n\n@include bg-variant('.bg-info', $brand-info);\n\n@include bg-variant('.bg-warning', $brand-warning);\n\n@include bg-variant('.bg-danger', $brand-danger);\n\n@include bg-variant('.bg-inverse', $brand-inverse);\n","// Contextual backgrounds\n\n@mixin bg-variant($parent, $color) {\n  #{$parent} {\n    background-color: $color !important;\n  }\n  a#{$parent} {\n    @include hover-focus {\n      background-color: darken($color, 10%) !important;\n    }\n  }\n}\n","//\n// Border\n//\n\n.border-0        { border: 0 !important; }\n.border-top-0    { border-top: 0 !important; }\n.border-right-0  { border-right: 0 !important; }\n.border-bottom-0 { border-bottom: 0 !important; }\n.border-left-0   { border-left: 0 !important; }\n\n//\n// Border-radius\n//\n\n.rounded {\n  @include border-radius($border-radius);\n}\n.rounded-top {\n  @include border-top-radius($border-radius);\n}\n.rounded-right {\n  @include border-right-radius($border-radius);\n}\n.rounded-bottom {\n  @include border-bottom-radius($border-radius);\n}\n.rounded-left {\n  @include border-left-radius($border-radius);\n}\n\n.rounded-circle {\n  border-radius: 50%;\n}\n\n.rounded-0 {\n  border-radius: 0;\n}\n","//\n// Display utilities\n//\n\n@each $breakpoint in map-keys($grid-breakpoints) {\n  @include media-breakpoint-up($breakpoint) {\n    $infix: breakpoint-infix($breakpoint, $grid-breakpoints);\n\n    .d#{$infix}-none         { display: none !important; }\n    .d#{$infix}-inline       { display: inline !important; }\n    .d#{$infix}-inline-block { display: inline-block !important; }\n    .d#{$infix}-block        { display: block !important; }\n    .d#{$infix}-table        { display: table !important; }\n    .d#{$infix}-table-cell   { display: table-cell !important; }\n    .d#{$infix}-flex         { display: flex !important; }\n    .d#{$infix}-inline-flex  { display: inline-flex !important; }\n  }\n}\n","// Flex variation\n//\n// Custom styles for additional flex alignment options.\n\n@each $breakpoint in map-keys($grid-breakpoints) {\n  @include media-breakpoint-up($breakpoint) {\n    $infix: breakpoint-infix($breakpoint, $grid-breakpoints);\n\n    .flex#{$infix}-first     { order: -1; }\n    .flex#{$infix}-last      { order: 1; }\n    .flex#{$infix}-unordered { order: 0; }\n\n    .flex#{$infix}-row            { flex-direction: row !important; }\n    .flex#{$infix}-column         { flex-direction: column !important; }\n    .flex#{$infix}-row-reverse    { flex-direction: row-reverse !important; }\n    .flex#{$infix}-column-reverse { flex-direction: column-reverse !important; }\n\n    .flex#{$infix}-wrap         { flex-wrap: wrap !important; }\n    .flex#{$infix}-nowrap       { flex-wrap: nowrap !important; }\n    .flex#{$infix}-wrap-reverse { flex-wrap: wrap-reverse !important; }\n\n    .justify-content#{$infix}-start   { justify-content: flex-start !important; }\n    .justify-content#{$infix}-end     { justify-content: flex-end !important; }\n    .justify-content#{$infix}-center  { justify-content: center !important; }\n    .justify-content#{$infix}-between { justify-content: space-between !important; }\n    .justify-content#{$infix}-around  { justify-content: space-around !important; }\n\n    .align-items#{$infix}-start    { align-items: flex-start !important; }\n    .align-items#{$infix}-end      { align-items: flex-end !important; }\n    .align-items#{$infix}-center   { align-items: center !important; }\n    .align-items#{$infix}-baseline { align-items: baseline !important; }\n    .align-items#{$infix}-stretch  { align-items: stretch !important; }\n\n    .align-content#{$infix}-start   { align-content: flex-start !important; }\n    .align-content#{$infix}-end     { align-content: flex-end !important; }\n    .align-content#{$infix}-center  { align-content: center !important; }\n    .align-content#{$infix}-between { align-content: space-between !important; }\n    .align-content#{$infix}-around  { align-content: space-around !important; }\n    .align-content#{$infix}-stretch { align-content: stretch !important; }\n\n    .align-self#{$infix}-auto     { align-self: auto !important; }\n    .align-self#{$infix}-start    { align-self: flex-start !important; }\n    .align-self#{$infix}-end      { align-self: flex-end !important; }\n    .align-self#{$infix}-center   { align-self: center !important; }\n    .align-self#{$infix}-baseline { align-self: baseline !important; }\n    .align-self#{$infix}-stretch  { align-self: stretch !important; }\n  }\n}\n","@each $breakpoint in map-keys($grid-breakpoints) {\n  @include media-breakpoint-up($breakpoint) {\n    $infix: breakpoint-infix($breakpoint, $grid-breakpoints);\n\n    .float#{$infix}-left  { @include float-left; }\n    .float#{$infix}-right { @include float-right; }\n    .float#{$infix}-none  { @include float-none; }\n  }\n}\n","@mixin float-left {\n  float: left !important;\n}\n@mixin float-right {\n  float: right !important;\n}\n@mixin float-none {\n  float: none !important;\n}\n","// Positioning\n\n.fixed-top {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: $zindex-fixed;\n}\n\n.fixed-bottom {\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: $zindex-fixed;\n}\n\n.sticky-top {\n  position: sticky;\n  top: 0;\n  z-index: $zindex-sticky;\n}\n","//\n// Screenreaders\n//\n\n.sr-only {\n  @include sr-only();\n}\n\n.sr-only-focusable {\n  @include sr-only-focusable();\n}\n","// Only display content to screen readers\n//\n// See: http://a11yproject.com/posts/how-to-hide-content\n\n@mixin sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0,0,0,0);\n  border: 0;\n}\n\n// Use in conjunction with .sr-only to only display content when it's focused.\n//\n// Useful for \"Skip to main content\" links; see https://www.w3.org/TR/2013/NOTE-WCAG20-TECHS-20130905/G1\n//\n// Credit: HTML5 Boilerplate\n\n@mixin sr-only-focusable {\n  &:active,\n  &:focus {\n    position: static;\n    width: auto;\n    height: auto;\n    margin: 0;\n    overflow: visible;\n    clip: auto;\n  }\n}\n","// Width and height\n\n@each $prop, $abbrev in (width: w, height: h) {\n  @each $size, $length in $sizes {\n    .#{$abbrev}-#{$size} { #{$prop}: $length !important; }\n  }\n}\n\n.mw-100 { max-width: 100% !important; }\n.mh-100 { max-height: 100% !important; }\n","// Margin and Padding\n\n@each $breakpoint in map-keys($grid-breakpoints) {\n  @include media-breakpoint-up($breakpoint) {\n    $infix: breakpoint-infix($breakpoint, $grid-breakpoints);\n\n    @each $prop, $abbrev in (margin: m, padding: p) {\n      @each $size, $lengths in $spacers {\n        $length-x: map-get($lengths, x);\n        $length-y: map-get($lengths, y);\n\n        .#{$abbrev}#{$infix}-#{$size}  { #{$prop}:        $length-y $length-x !important; }\n        .#{$abbrev}t#{$infix}-#{$size} { #{$prop}-top:    $length-y !important; }\n        .#{$abbrev}r#{$infix}-#{$size} { #{$prop}-right:  $length-x !important; }\n        .#{$abbrev}b#{$infix}-#{$size} { #{$prop}-bottom: $length-y !important; }\n        .#{$abbrev}l#{$infix}-#{$size} { #{$prop}-left:   $length-x !important; }\n        .#{$abbrev}x#{$infix}-#{$size} {\n          #{$prop}-right: $length-x !important;\n          #{$prop}-left:  $length-x !important;\n        }\n        .#{$abbrev}y#{$infix}-#{$size} {\n          #{$prop}-top:    $length-y !important;\n          #{$prop}-bottom: $length-y !important;\n        }\n      }\n    }\n\n    // Some special margin utils\n    .m#{$infix}-auto  { margin:        auto !important; }\n    .mt#{$infix}-auto { margin-top:    auto !important; }\n    .mr#{$infix}-auto { margin-right:  auto !important; }\n    .mb#{$infix}-auto { margin-bottom: auto !important; }\n    .ml#{$infix}-auto { margin-left:   auto !important; }\n    .mx#{$infix}-auto {\n      margin-right: auto !important;\n      margin-left:  auto !important;\n    }\n    .my#{$infix}-auto {\n      margin-top:    auto !important;\n      margin-bottom: auto !important;\n    }\n  }\n}\n","//\n// Text\n//\n\n// Alignment\n\n.text-justify  { text-align: justify !important; }\n.text-nowrap   { white-space: nowrap !important; }\n.text-truncate { @include text-truncate; }\n\n// Responsive alignment\n\n@each $breakpoint in map-keys($grid-breakpoints) {\n  @include media-breakpoint-up($breakpoint) {\n    $infix: breakpoint-infix($breakpoint, $grid-breakpoints);\n\n    .text#{$infix}-left   { text-align: left !important; }\n    .text#{$infix}-right  { text-align: right !important; }\n    .text#{$infix}-center { text-align: center !important; }\n  }\n}\n\n// Transformation\n\n.text-lowercase  { text-transform: lowercase !important; }\n.text-uppercase  { text-transform: uppercase !important; }\n.text-capitalize { text-transform: capitalize !important; }\n\n// Weight and italics\n\n.font-weight-normal { font-weight: $font-weight-normal; }\n.font-weight-bold   { font-weight: $font-weight-bold; }\n.font-italic        { font-style: italic; }\n\n// Contextual colors\n\n.text-white {\n  color: #fff !important;\n}\n\n@include text-emphasis-variant('.text-muted', $text-muted);\n\n@include text-emphasis-variant('.text-primary', $brand-primary);\n\n@include text-emphasis-variant('.text-success', $brand-success);\n\n@include text-emphasis-variant('.text-info', $brand-info);\n\n@include text-emphasis-variant('.text-warning', $brand-warning);\n\n@include text-emphasis-variant('.text-danger', $brand-danger);\n\n// Font color\n\n@include text-emphasis-variant('.text-gray-dark', $gray-dark);\n\n// Misc\n\n.text-hide {\n  @include text-hide();\n}\n","// Text truncate\n// Requires inline-block or block for proper styling\n\n@mixin text-truncate() {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}","// Typography\n\n@mixin text-emphasis-variant($parent, $color) {\n  #{$parent} {\n    color: $color !important;\n  }\n  a#{$parent} {\n    @include hover-focus {\n      color: darken($color, 10%) !important;\n    }\n  }\n}\n","// CSS image replacement\n@mixin text-hide() {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0;\n}\n","//\n// Visibility utilities\n//\n\n.invisible {\n  @include invisible();\n}\n\n// Responsive visibility utilities\n\n@each $bp in map-keys($grid-breakpoints) {\n  .hidden-#{$bp}-up {\n    @include media-breakpoint-up($bp) {\n      display: none !important;\n    }\n  }\n  .hidden-#{$bp}-down {\n    @include media-breakpoint-down($bp) {\n      display: none !important;\n    }\n  }\n}\n\n\n// Print utilities\n//\n// Media queries are placed on the inside to be mixin-friendly.\n\n.visible-print-block {\n  display: none !important;\n\n  @media print {\n    display: block !important;\n  }\n}\n.visible-print-inline {\n  display: none !important;\n\n  @media print {\n    display: inline !important;\n  }\n}\n.visible-print-inline-block {\n  display: none !important;\n\n  @media print {\n    display: inline-block !important;\n  }\n}\n\n.hidden-print {\n  @media print {\n    display: none !important;\n  }\n}\n","// Visibility\n\n@mixin invisible {\n  visibility: hidden !important;\n}\n",".weather {\n  $hot: #e57263;\n  $cold: #2dcdf8;\n  color: #fff;\n\n  > div {\n    padding-bottom: 20px;\n  }\n\n  h1 {\n    font-weight: 100;\n  }\n\n  h2 {\n    font-weight: 800;\n    text-transform: uppercase;\n    text-align: left;\n    font-size: 24px;\n  }\n\n  .toggle {\n    li {\n      color: #43cff3;\n      cursor: pointer;\n      float: left;\n      padding-left: 5px;\n      &.active {\n        cursor: default;\n        color: #fff;\n      }\n    }\n  }\n\n  .header {\n    position: relative;\n    .toggle {\n      position: absolute;\n      right: 0;\n      bottom: 0;\n    }\n  }\n\n  .card {\n    padding: .5%;\n    background: transparent;\n    border: 0 none;\n    .container {\n      padding: 2%;\n      border-radius: 10px;\n      border: 0 none;\n      background: -webkit-linear-gradient(to bottom, $hot, $cold);\n      background: linear-gradient(to bottom, $hot, $cold);\n      padding: 2%;\n      color: #fff;\n      label {\n        float: left;\n        width: 100%;\n        margin: 0;\n        &.title {\n          text-transform: uppercase;\n        }\n        &.number {\n          font-size: 90px;\n          font-weight: 100;\n          text-shadow: 2px 2px 1px rgba(0,0,0,0.2);\n        }\n      }\n    }\n  }\n\n  .day {\n    .card {\n      float: left;\n      .container {\n        label {\n          &.number {\n            font-size: 45px;\n          }\n        }\n      }\n    }\n  }\n\n  input {\n    box-shadow: none;\n    border-radius: 0;\n    background: transparent;\n    border: 0 none;\n    border-bottom: 1px solid #43cff3;\n    color: #fff;\n    &:focus {\n      border-color: #e56363;\n      outline: 0;\n      -webkit-box-shadow: none;\n      box-shadow: none;\n      background: transparent;\n    }\n  }\n\n  @media screen and (max-width: 768px) {\n    h2 {\n      text-align: center;\n    }\n    .card {\n      width: 50% !important;\n      .container {\n        margin: 0 auto;\n        width: 100%;\n      }\n    }\n  }\n\n  @media screen and (max-width: 414px) {\n    .card {\n      width: 100% !important;\n    }\n  }\n}\n","@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700');\n@import 'bootstrap';\n@import 'weather';\n\n$footer-height: 0px;\n\nhtml {\n  min-height: 100%;\n  position: relative;\n  background: -webkit-linear-gradient(to bottom, #3a404e, #201d28);\n  background: linear-gradient(to bottom, #3a404e, #201d28);\n}\n\nbody {\n  margin-bottom: $footer-height;\n  font-family: 'Roboto', sans-serif;\n  background: transparent;\n  color: #fff;\n}\n\n#content {\n\n}\n\n.navbar {\n  background: transparent;\n  .navbar-brand {\n    color: #fff;\n  }\n  a, .nav-link {\n    color: #fff;\n  }\n}\n\n.btn, .badge-pill {\n  cursor: pointer;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/file-loader/index.js?name=[hash].[ext]!./src/client/modules/favicon/assets/android-chrome-192x192.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e839956adee7ef4dd529c13fb2976815.png";

/***/ }),

/***/ "./node_modules/file-loader/index.js?name=[hash].[ext]!./src/client/modules/favicon/assets/android-chrome-256x256.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2cf4795b437543bf4ccac41f66ad9ece.png";

/***/ }),

/***/ "./node_modules/file-loader/index.js?name=[hash].[ext]!./src/client/modules/favicon/assets/apple-touch-icon.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c73151e93faafb3a90992818a0d3e0b3.png";

/***/ }),

/***/ "./node_modules/file-loader/index.js?name=[hash].[ext]!./src/client/modules/favicon/assets/browserconfig.xml":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c19724cfb965a1d50be44057beea825f.xml";

/***/ }),

/***/ "./node_modules/file-loader/index.js?name=[hash].[ext]!./src/client/modules/favicon/assets/favicon-16x16.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c61128926c4740997fb2bb7ef193baac.png";

/***/ }),

/***/ "./node_modules/file-loader/index.js?name=[hash].[ext]!./src/client/modules/favicon/assets/favicon-32x32.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a524cbba85060bc7b90fb3c2f071c856.png";

/***/ }),

/***/ "./node_modules/file-loader/index.js?name=[hash].[ext]!./src/client/modules/favicon/assets/favicon.ico":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ec4b805f1a742bdd9f60157986957679.ico";

/***/ }),

/***/ "./node_modules/file-loader/index.js?name=[hash].[ext]!./src/client/modules/favicon/assets/manifest.json":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a96402b6a4add55f58d514d9aef3a9ad.json";

/***/ }),

/***/ "./node_modules/file-loader/index.js?name=[hash].[ext]!./src/client/modules/favicon/assets/mstile-150x150.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "21d1ca52a9067811425eb616d2fe26c9.png";

/***/ }),

/***/ "./node_modules/file-loader/index.js?name=[hash].[ext]!./src/client/modules/favicon/assets/safari-pinned-tab.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "340d40a83a2cbebf7d0439133f65379c.svg";

/***/ }),

/***/ "./node_modules/file-loader/index.js?name=[name].[ext]!./src/client/modules/favicon/assets/favicon.ico":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "favicon.ico";

/***/ }),

/***/ "./node_modules/isomorphic-style-loader/lib/insertCss.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(27);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(21);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var prefix = 's';
var inserted = {};

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Remove style/link elements for specified node IDs
 * if they are no longer referenced by UI components.
 */
function removeCss(ids) {
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(prefix + id);
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === undefined ? false : _ref$prepend;

  var ids = [];
  for (var i = 0; i < styles.length; i++) {
    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];

    var id = moduleId + '-' + i;

    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;

    var elem = document.getElementById(prefix + id);
    var create = false;

    if (!elem) {
      create = true;

      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = prefix + id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;
    if (sourceMap && typeof btoa === 'function') {
      // skip IE9 and below, see http://caniuse.com/atob-btoa
      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;

/***/ }),

/***/ "./node_modules/persisted_queries.json":
/***/ (function(module, exports) {

module.exports = {
	"mutation addComment($input: AddCommentInput!) {\n  addComment(input: $input) {\n    ...CommentInfo\n    __typename\n  }\n}\n\nfragment CommentInfo on Comment {\n  id\n  content\n  __typename\n}\n": 1,
	"mutation addCount($amount: Int!) {\n  addCount(amount: $amount) {\n    amount\n    __typename\n  }\n}\n": 2,
	"mutation addPost($input: AddPostInput!) {\n  addPost(input: $input) {\n    ...PostInfo\n    __typename\n  }\n}\n\nfragment PostInfo on Post {\n  id\n  title\n  content\n  __typename\n}\n": 3,
	"mutation deleteComment($input: DeleteCommentInput!) {\n  deleteComment(input: $input) {\n    id\n    __typename\n  }\n}\n": 4,
	"mutation deletePost($id: ID!) {\n  deletePost(id: $id) {\n    id\n    __typename\n  }\n}\n": 5,
	"mutation editComment($input: EditCommentInput!) {\n  editComment(input: $input) {\n    ...CommentInfo\n    __typename\n  }\n}\n\nfragment CommentInfo on Comment {\n  id\n  content\n  __typename\n}\n": 6,
	"mutation editPost($input: EditPostInput!) {\n  editPost(input: $input) {\n    ...PostInfo\n    __typename\n  }\n}\n\nfragment PostInfo on Post {\n  id\n  title\n  content\n  __typename\n}\n": 7,
	"query getCount {\n  count {\n    amount\n    __typename\n  }\n}\n": 8,
	"query getPost($id: ID!) {\n  post(id: $id) {\n    ...PostInfo\n    comments {\n      ...CommentInfo\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment PostInfo on Post {\n  id\n  title\n  content\n  __typename\n}\n\nfragment CommentInfo on Comment {\n  id\n  content\n  __typename\n}\n": 9,
	"query getPosts($limit: Int!, $after: ID) {\n  postsQuery(limit: $limit, after: $after) {\n    totalCount\n    edges {\n      cursor\n      node {\n        ...PostInfo\n        __typename\n      }\n      __typename\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment PostInfo on Post {\n  id\n  title\n  content\n  __typename\n}\n": 10,
	"subscription onCommentUpdated($postId: ID!) {\n  commentUpdated(postId: $postId) {\n    mutation\n    id\n    postId\n    node {\n      ...CommentInfo\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment CommentInfo on Comment {\n  id\n  content\n  __typename\n}\n": 11,
	"subscription onCountUpdated {\n  countUpdated {\n    amount\n    __typename\n  }\n}\n": 12,
	"subscription onPostUpdated($endCursor: ID!) {\n  postsUpdated(endCursor: $endCursor) {\n    mutation\n    node {\n      ...PostInfo\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment PostInfo on Post {\n  id\n  title\n  content\n  __typename\n}\n": 13
};

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});

	if(unacceptedModules.length > 0) {
		console.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
		unacceptedModules.forEach(function(moduleId) {
			console.warn("[HMR]  - " + moduleId);
		});
	}

	if(!renewedModules || renewedModules.length === 0) {
		console.log("[HMR] Nothing hot updated.");
	} else {
		console.log("[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			console.log("[HMR]  - " + moduleId);
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if(numberIds)
			console.log("[HMR] Consider using the NamedModulesPlugin for module names.");
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/signal.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if(true) {
	var checkForUpdate = function checkForUpdate(fromUpdate) {
		module.hot.check().then(function(updatedModules) {
			if(!updatedModules) {
				if(fromUpdate)
					console.log("[HMR] Update applied.");
				else
					console.warn("[HMR] Cannot find update.");
				return;
			}

			return module.hot.apply({
				ignoreUnaccepted: true,
				onUnaccepted: function(data) {
					console.warn("Ignored an update to unaccepted module " + data.chain.join(" -> "));
				},
			}).then(function(renewedModules) {
				__webpack_require__("./node_modules/webpack/hot/log-apply-result.js")(updatedModules, renewedModules);

				checkForUpdate(true);
			});
		}).catch(function(err) {
			var status = module.hot.status();
			if(["abort", "fail"].indexOf(status) >= 0) {
				console.warn("[HMR] Cannot apply update.");
				console.warn("[HMR] " + err.stack || err.message);
				console.warn("[HMR] You need to restart the application!");
			} else {
				console.warn("[HMR] Update failed: " + err.stack || err.message);
			}
		});
	};

	process.on(__resourceQuery.substr(1) || "SIGUSR2", function() {
		if(module.hot.status() !== "idle") {
			console.warn("[HMR] Got signal but currently in " + module.hot.status() + " state.");
			console.warn("[HMR] Need to be in idle state to start hot update.");
			return;
		}

		checkForUpdate();
	});
} else {
	throw new Error("[HMR] Hot Module Replacement is disabled.");
}

/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ }),

/***/ "./package.json":
/***/ (function(module, exports) {

module.exports = {
	"name": "apollo-fullstack-starter-kit",
	"private": true,
	"version": "1.0.0",
	"main": "src/server",
	"app": {
		"backendBuildDir": "build/server",
		"frontendBuildDir": "build/client",
		"webpackDevPort": 3000,
		"apiPort": 8080,
		"ssr": true,
		"webpackDll": true,
		"frontendRefreshOnBackendChange": true,
		"reactHotLoader": false,
		"debugSQL": false,
		"persistGraphQL": true,
		"apolloLogging": false
	},
	"engines": {
		"node": "6.6.0",
		"npm": "3.10.3"
	},
	"scripts": {
		"build": "babel-node --presets es2015 tools/webpack.run",
		"start": "node --harmony build/server",
		"tests": "cross-env NODE_ENV=test PORT=7070 mocha-webpack --include babel-polyfill --webpack-config tools/webpack.config.js --full-trace --exit \"src/**/*.spec.js\"",
		"tests:watch": "cross-env NODE_ENV=test PORT=7070 mocha-webpack --include babel-polyfill --webpack-config tools/webpack.config.js --full-trace --watch \"src/**/*.spec.js\"",
		"test": "npm run tests && npm run lint",
		"lint": "eslint --fix --ext js --ext jsx src tests tools",
		"seed": "npm run migrate && knex seed:run",
		"migrate": "knex migrate:latest",
		"rollback": "knex migrate:rollback",
		"watch": "babel-node --presets es2015 tools/webpack.run watch",
		"heroku-postbuild": "rm -rf build && npm run build && npm run seed"
	},
	"repository": {
		"type": "git",
		"url": "git@github.com:sysgears/apollo-fullstack-starter-kit.git"
	},
	"bugs": {
		"url": "https://github.com/sysgears/apollo-fullstack-starter-kit/issues"
	},
	"homepage": "https://github.com/sysgears/apollo-fullstack-starter-kit",
	"keywords": [
		"apollo",
		"fullstack",
		"starter",
		"graphql",
		"react",
		"redux"
	],
	"author": "SysGears INC",
	"license": "MIT",
	"dependencies": {
		"apollo-client": "^1.2.2",
		"apollo-logger": "^0.0.2",
		"axios": "^0.16.1",
		"body-parser": "^1.17.1",
		"bootstrap": "^4.0.0-alpha.6",
		"dataloader": "^1.3.0",
		"express": "^4.15.2",
		"graphql": "^0.9.6",
		"graphql-server-express": "^0.7.2",
		"graphql-subscriptions": "^0.3.1",
		"graphql-tag": "^2.0.0",
		"graphql-tools": "^0.11.0",
		"graphql-typings": "0.0.1-beta-2",
		"history": "^4.6.1",
		"immutability-helper": "^2.2.0",
		"isomorphic-fetch": "^2.2.1",
		"knex": "^0.13.0",
		"lodash": "^4.17.4",
		"minilog": "^3.1.0",
		"moment": "^2.15.1",
		"moment-timezone": "^0.5.11",
		"performance-now": "^2.1.0",
		"persistgraphql": "^0.3.1",
		"prop-types": "^15.5.9",
		"react": "^15.5.4",
		"react-apollo": "^1.2.0",
		"react-dom": "^15.5.4",
		"react-hot-loader": "^3.0.0-beta.6",
		"react-moment": "^0.2.2",
		"react-redux": "^5.0.4",
		"react-router": "^4.1.1",
		"react-router-dom": "^4.1.1",
		"react-router-redux": "^5.0.0-alpha.6",
		"react-transition-group": "^1.1.3",
		"reactstrap": "^4.6.1",
		"redux": "^3.6.0",
		"redux-devtools-extension": "^2.13.2",
		"redux-form": "^6.7.0",
		"serialize-javascript": "^1.3.0",
		"source-map-support": "^0.4.15",
		"sqlite3": "^3.1.8",
		"styled-components": "^2.0.0-15",
		"subscriptions-transport-ws": "^0.6.0"
	},
	"devDependencies": {
		"babel-cli": "^6.24.1",
		"babel-core": "^6.24.1",
		"babel-eslint": "^7.2.3",
		"babel-loader": "^7.0.0",
		"babel-plugin-styled-components": "^1.1.4",
		"babel-plugin-transform-class-properties": "^6.24.1",
		"babel-plugin-transform-decorators-legacy": "^1.3.4",
		"babel-plugin-transform-runtime": "^6.23.0",
		"babel-polyfill": "^6.23.0",
		"babel-preset-es2015": "^6.24.1",
		"babel-preset-react": "^6.24.1",
		"babel-preset-stage-0": "^6.24.1",
		"babel-register": "^6.24.1",
		"chai": "^3.5.0",
		"chai-as-promised": "^6.0.0",
		"chai-http": "^3.0.0",
		"cross-env": "^5.0.0",
		"css-loader": "^0.28.1",
		"enzyme": "^2.8.2",
		"eslint": "^3.19.0",
		"eslint-config-airbnb": "^15.0.0",
		"eslint-import-resolver-webpack": "^0.8.1",
		"eslint-plugin-import": "^2.2.0",
		"eslint-plugin-jsx-a11y": "^5.0.1",
		"eslint-plugin-mocha": "^4.9.0",
		"eslint-plugin-react": "^7.0.1",
		"extract-text-webpack-plugin": "^2.1.0",
		"file-loader": "^0.11.1",
		"fs-extra": "^3.0.1",
		"ignore-loader": "^0.1.2",
		"isomorphic-style-loader": "^2.0.0",
		"jsdom": "^10.1.0",
		"json-loader": "^0.5.4",
		"mkdirp": "^0.5.1",
		"mocha": "^3.3.0",
		"mocha-steps": "^1.0.2",
		"mocha-webpack": "^0.7.0",
		"node-sass": "^4.5.2",
		"persistgraphql-webpack-plugin": "^0.2.3",
		"postcss-loader": "^2.0.5",
		"raw-loader": "^0.5.1",
		"react-test-renderer": "^15.5.4",
		"resolve-url-loader": "^2.0.2",
		"sass-loader": "^6.0.5",
		"style-loader": "^0.17.0",
		"url-loader": "^0.5.8",
		"wait-on": "^2.0.2",
		"webpack": "^2.5.1",
		"webpack-dev-server": "^2.4.5",
		"webpack-manifest-plugin": "^1.1.0",
		"webpack-merge": "^4.1.0",
		"webpack-node-externals": "^1.6.0",
		"webpack-virtual-modules": "^0.1.5",
		"ws": "^3.0.0"
	},
	"eslintConfig": {
		"parser": "babel-eslint",
		"extends": [
			"airbnb/base",
			"plugin:import/errors",
			"eslint:recommended",
			"plugin:react/recommended"
		],
		"rules": {
			"no-use-before-define": 0,
			"arrow-body-style": 0,
			"dot-notation": 0,
			"no-console": 0,
			"semi": 2
		},
		"settings": {
			"import/resolver": {
				"webpack": {
					"config": "./tools/webpack.config.js"
				}
			}
		},
		"env": {
			"mocha": true
		},
		"globals": {
			"window": true,
			"document": true,
			"__DEV__": true,
			"__CLIENT__": true,
			"__SERVER__": true,
			"__SSR__": true
		},
		"plugins": [
			"react"
		]
	}
};

/***/ }),

/***/ "./src/client/app/app.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = App;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_styled_components__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_styled_components___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_styled_components__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nav_bar__ = __webpack_require__("./src/client/app/nav_bar.jsx");







var footerHeight = '40px';

var Footer = __WEBPACK_IMPORTED_MODULE_2_styled_components___default.a.footer.withConfig({
  displayName: 'app__Footer',
  componentId: 'hteuf5-0'
})(['position: \'absolute\',bottom: 0,width: \'100%\',lineHeight: ', ',height: ', ''], footerHeight, footerHeight);

function App(_ref) {
  var children = _ref.children;

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__nav_bar__["a" /* default */], null),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_3_reactstrap__["Container"],
      { id: 'content' },
      children
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      Footer,
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'text-center' })
    )
  );
}

App.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element
};

/***/ }),

/***/ "./src/client/app/nav_bar.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__package_json__ = __webpack_require__("./package.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__package_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules__ = __webpack_require__("./src/client/modules/index.jsx");







var NavBar = function NavBar() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Navbar"],
    { color: 'faded', light: true },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Container"],
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Row"],
        { className: 'align-items-center' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"],
          { to: '/', className: 'navbar-brand' },
          'Weather App'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Nav"],
          null,
          __WEBPACK_IMPORTED_MODULE_4__modules__["a" /* default */].navItems
        ),
        (!__WEBPACK_IMPORTED_MODULE_3__package_json__["app"].persistGraphQL || true) && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Nav"],
          { className: 'ml-auto', navbar: true },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["NavItem"],
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'a',
              { href: '/graphiql' },
              'GraphiQL'
            )
          )
        )
      )
    )
  );
};

/* harmony default export */ __webpack_exports__["a"] = (NavBar);

/***/ }),

/***/ "./src/client/app/routes.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app__ = __webpack_require__("./src/client/app/app.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules__ = __webpack_require__("./src/client/modules/index.jsx");






/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
  __WEBPACK_IMPORTED_MODULE_2__app__["a" /* default */],
  null,
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Switch"],
    null,
    __WEBPACK_IMPORTED_MODULE_3__modules__["a" /* default */].routes
  )
));

/***/ }),

/***/ "./src/client/modules/connector.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash__);







var combine = function combine(features, extractor) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_lodash__["without"])(__WEBPACK_IMPORTED_MODULE_4_lodash__["union"].apply(undefined, __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_lodash__["map"])(features, function (res) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_lodash__["castArray"])(extractor(res));
  }))), undefined);
};

var _default = function () {
  // eslint-disable-next-line no-unused-vars
  function _default(_ref) {
    for (var _len = arguments.length, features = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      features[_key - 1] = arguments[_key];
    }

    var route = _ref.route,
        navItem = _ref.navItem,
        reducer = _ref.reducer;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, _default);

    this.route = combine(arguments, function (arg) {
      return arg.route;
    });
    this.navItem = combine(arguments, function (arg) {
      return arg.navItem;
    });
    this.reducer = combine(arguments, function (arg) {
      return arg.reducer;
    });
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(_default, [{
    key: 'routes',
    get: function get() {
      var _this = this;

      return this.route.map(function (component, idx) {
        return __WEBPACK_IMPORTED_MODULE_3_react___default.a.cloneElement(component, { key: idx + _this.route.length });
      });
    }
  }, {
    key: 'navItems',
    get: function get() {
      var _this2 = this;

      return this.navItem.map(function (component, idx) {
        return __WEBPACK_IMPORTED_MODULE_3_react___default.a.cloneElement(component, { key: idx + _this2.navItem.length });
      });
    }
  }, {
    key: 'reducers',
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_4_lodash__["merge"].apply(undefined, __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(this.reducer));
    }
  }]);

  return _default;
}();



/***/ }),

/***/ "./src/client/modules/counter/containers/counter.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_apollo__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_immutability_helper__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_immutability_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_immutability_helper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__graphql_count_get_graphql__ = __webpack_require__("./src/client/modules/counter/graphql/count_get.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__graphql_count_get_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__graphql_count_get_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__graphql_count_add_mutation_graphql__ = __webpack_require__("./src/client/modules/counter/graphql/count_add_mutation.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__graphql_count_add_mutation_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__graphql_count_add_mutation_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__graphql_count_subscribe_graphql__ = __webpack_require__("./src/client/modules/counter/graphql/count_subscribe.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__graphql_count_subscribe_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__graphql_count_subscribe_graphql__);
















var Counter = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Counter, _React$Component);

  function Counter(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Counter);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Counter.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Counter)).call(this, props));

    _this.subscription = null;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Counter, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.loading) {
        if (this.subscription) {
          this.subscription();
          this.subscription = null;
        }

        // Subscribe or re-subscribe
        if (!this.subscription) {
          this.subscribeToCount();
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.subscription) {
        this.subscription();
      }
    }
  }, {
    key: 'handleReduxIncrement',
    value: function handleReduxIncrement(e) {
      var value = void 0;
      if (e && e.target) {
        value = e.target.value;
      } else {
        value = e;
      }

      this.props.onReduxIncrement(value);
    }
  }, {
    key: 'subscribeToCount',
    value: function subscribeToCount() {
      var subscribeToMore = this.props.subscribeToMore;

      this.subscription = subscribeToMore({
        document: __WEBPACK_IMPORTED_MODULE_13__graphql_count_subscribe_graphql___default.a,
        variables: {},
        updateQuery: function updateQuery(prev, _ref) {
          var amount = _ref.subscriptionData.data.countUpdated.amount;

          return __WEBPACK_IMPORTED_MODULE_9_immutability_helper___default()(prev, {
            count: {
              amount: {
                $set: amount
              }
            }
          });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          loading = _props.loading,
          count = _props.count,
          addCount = _props.addCount,
          reduxCount = _props.reduxCount;

      if (loading) {
        return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          { className: 'text-center' },
          'Loading...'
        );
      } else {
        return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          { className: 'text-center mt-4 mb-4' },
          'Current count, is ',
          count.amount,
          '. This is being stored server-side in the database and using Apollo subscription for real-time updates.',
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_10_reactstrap__["Button"],
            { id: 'graphql-button', color: 'primary', onClick: addCount(1) },
            'Click to increase count'
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
          'Current reduxCount, is ',
          reduxCount,
          '. This is being stored client-side with Redux.',
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_10_reactstrap__["Button"],
            { id: 'redux-button', color: 'primary', value: '1', onClick: this.handleReduxIncrement.bind(this) },
            'Click to increase reduxCount'
          )
        );
      }
    }
  }]);

  return Counter;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

Counter.propTypes = {
  loading: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool.isRequired,
  count: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object,
  updateCountQuery: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  onReduxIncrement: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  addCount: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired,
  subscribeToMore: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired,
  reduxCount: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.number.isRequired
};

var CounterWithApollo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_apollo__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_apollo__["graphql"])(__WEBPACK_IMPORTED_MODULE_11__graphql_count_get_graphql___default.a, {
  props: function props(_ref2) {
    var _ref2$data = _ref2.data,
        loading = _ref2$data.loading,
        count = _ref2$data.count,
        subscribeToMore = _ref2$data.subscribeToMore;

    return { loading: loading, count: count, subscribeToMore: subscribeToMore };
  }
}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_apollo__["graphql"])(__WEBPACK_IMPORTED_MODULE_12__graphql_count_add_mutation_graphql___default.a, {
  props: function props(_ref3) {
    var ownProps = _ref3.ownProps,
        mutate = _ref3.mutate;
    return {
      addCount: function addCount(amount) {
        return function () {
          return mutate({
            variables: { amount: amount },
            updateQueries: {
              getCount: function getCount(prev, _ref4) {
                var mutationResult = _ref4.mutationResult;

                var newAmount = mutationResult.data.addCount.amount;
                return __WEBPACK_IMPORTED_MODULE_9_immutability_helper___default()(prev, {
                  count: {
                    amount: {
                      $set: newAmount
                    }
                  }
                });
              }
            },
            optimisticResponse: {
              __typename: 'Mutation',
              addCount: {
                __typename: 'Count',
                amount: ownProps.count.amount + 1
              }
            }
          });
        };
      }
    };
  }
}))(Counter);

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_react_redux__["connect"])(function (state) {
  return { reduxCount: state.counter.reduxCount };
}, function (dispatch) {
  return {
    onReduxIncrement: function onReduxIncrement(value) {
      dispatch({
        type: 'COUNTER_INCREMENT',
        value: Number(value)
      });
    }
  };
})(CounterWithApollo));

/***/ }),

/***/ "./src/client/modules/counter/graphql/count_add_mutation.graphql":
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"defaultValue":null}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"addCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"amount"},"arguments":[],"directives":[],"selectionSet":null}]}}]}}],"loc":{"start":0,"end":92}};
    doc.loc.source = {"body":"mutation addCount(\n$amount: Int!\n) {\n    addCount(amount: $amount) {\n        amount\n    }\n}\n","name":"GraphQL"};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  
module.exports = doc;

/***/ }),

/***/ "./src/client/modules/counter/graphql/count_get.graphql":
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCount"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"count"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"amount"},"arguments":[],"directives":[],"selectionSet":null}]}}]}}],"loc":{"start":0,"end":52}};
    doc.loc.source = {"body":"query getCount {\n    count {\n        amount\n    }\n}\n","name":"GraphQL"};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  
module.exports = doc;

/***/ }),

/***/ "./src/client/modules/counter/graphql/count_subscribe.graphql":
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"onCountUpdated"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"countUpdated"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"amount"},"arguments":[],"directives":[],"selectionSet":null}]}}]}}],"loc":{"start":0,"end":72}};
    doc.loc.source = {"body":"subscription onCountUpdated {\n    countUpdated {\n        amount\n    }\n}\n","name":"GraphQL"};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  
module.exports = doc;

/***/ }),

/***/ "./src/client/modules/counter/index.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__containers_counter__ = __webpack_require__("./src/client/modules/counter/containers/counter.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reducers__ = __webpack_require__("./src/client/modules/counter/reducers/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__connector__ = __webpack_require__("./src/client/modules/connector.js");








/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_4__connector__["a" /* default */]({
  route: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/', component: __WEBPACK_IMPORTED_MODULE_2__containers_counter__["a" /* default */] }),
  reducer: { counter: __WEBPACK_IMPORTED_MODULE_3__reducers__["a" /* default */] }
}));

/***/ }),

/***/ "./src/client/modules/counter/reducers/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);

var defaultState = {
  reduxCount: 1
};

/* harmony default export */ __webpack_exports__["a"] = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case 'COUNTER_INCREMENT':
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, state, {
        reduxCount: state.reduxCount += action.value
      });

    default:
      return state;
  }
});

/***/ }),

/***/ "./src/client/modules/favicon/assets recursive ./!./node_modules/file-loader/index.js?name=[hash].[ext]!./ .*":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./android-chrome-192x192.png": "./node_modules/file-loader/index.js?name=[hash].[ext]!./src/client/modules/favicon/assets/android-chrome-192x192.png",
	"./android-chrome-256x256.png": "./node_modules/file-loader/index.js?name=[hash].[ext]!./src/client/modules/favicon/assets/android-chrome-256x256.png",
	"./apple-touch-icon.png": "./node_modules/file-loader/index.js?name=[hash].[ext]!./src/client/modules/favicon/assets/apple-touch-icon.png",
	"./browserconfig.xml": "./node_modules/file-loader/index.js?name=[hash].[ext]!./src/client/modules/favicon/assets/browserconfig.xml",
	"./favicon-16x16.png": "./node_modules/file-loader/index.js?name=[hash].[ext]!./src/client/modules/favicon/assets/favicon-16x16.png",
	"./favicon-32x32.png": "./node_modules/file-loader/index.js?name=[hash].[ext]!./src/client/modules/favicon/assets/favicon-32x32.png",
	"./favicon.ico": "./node_modules/file-loader/index.js?name=[hash].[ext]!./src/client/modules/favicon/assets/favicon.ico",
	"./manifest.json": "./node_modules/file-loader/index.js?name=[hash].[ext]!./src/client/modules/favicon/assets/manifest.json",
	"./mstile-150x150.png": "./node_modules/file-loader/index.js?name=[hash].[ext]!./src/client/modules/favicon/assets/mstile-150x150.png",
	"./safari-pinned-tab.svg": "./node_modules/file-loader/index.js?name=[hash].[ext]!./src/client/modules/favicon/assets/safari-pinned-tab.svg"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/client/modules/favicon/assets recursive ./!./node_modules/file-loader/index.js?name=[hash].[ext]!./ .*";

/***/ }),

/***/ "./src/client/modules/favicon/index.js":
/***/ (function(module, exports, __webpack_require__) {

// Favicon.ico should not be hashed, since some browsers expect it to be exactly on /favicon.ico URL
__webpack_require__("./node_modules/file-loader/index.js?name=[name].[ext]!./src/client/modules/favicon/assets/favicon.ico"); // eslint-disable-line import/no-webpack-loader-syntax

// Require all files from assets dir recursively addding them into assets.json
var req = __webpack_require__("./src/client/modules/favicon/assets recursive ./!./node_modules/file-loader/index.js?name=[hash].[ext]!./ .*");
req.keys().map(req);

/***/ }),

/***/ "./src/client/modules/index.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__counter__ = __webpack_require__("./src/client/modules/counter/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__favicon__ = __webpack_require__("./src/client/modules/favicon/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__favicon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__favicon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__post__ = __webpack_require__("./src/client/modules/post/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__weather__ = __webpack_require__("./src/client/modules/weather/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__connector__ = __webpack_require__("./src/client/modules/connector.js");







//export default new Feature(counter, post, weather);
/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_4__connector__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__counter__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__weather__["a" /* default */]));

/***/ }),

/***/ "./src/client/modules/post/components/post_comment_form.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_form__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_form___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_form__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_reactstrap__);






var required = function required(value) {
  return value ? undefined : 'Required';
};

var renderField = function renderField(_ref) {
  var input = _ref.input,
      label = _ref.label,
      type = _ref.type,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error;

  var color = 'normal';
  if (touched && error) {
    color = 'danger';
  }

  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_4_reactstrap__["FormGroup"],
    { color: color },
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_reactstrap__["Input"], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, input, { placeholder: label, type: type })),
    touched && error && __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_4_reactstrap__["FormFeedback"],
      null,
      error
    )
  );
};

renderField.propTypes = {
  input: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object,
  label: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  type: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  meta: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object
};

var CommentForm = function CommentForm(props) {
  var handleSubmit = props.handleSubmit,
      submitting = props.submitting,
      initialValues = props.initialValues,
      onSubmit = props.onSubmit;


  var operation = 'Add';
  if (initialValues.id !== null) {
    operation = 'Edit';
  }

  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Form"],
    { name: 'comment', onSubmit: handleSubmit(onSubmit) },
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_4_reactstrap__["FormGroup"],
      null,
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Row"],
        null,
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Col"],
          { xs: '2' },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Label"],
            null,
            operation,
            ' comment'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Col"],
          { xs: '8' },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_redux_form__["Field"], { name: 'content', component: renderField, type: 'text', label: 'Content', validate: required })
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Col"],
          { xs: '2' },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Button"],
            { color: 'primary', type: 'submit', className: 'float-right', disabled: submitting },
            'Submit'
          )
        )
      )
    )
  );
};

CommentForm.propTypes = {
  handleSubmit: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  initialValues: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object,
  onSubmit: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  submitting: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool
};

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_redux_form__["reduxForm"])({
  form: 'comment',
  enableReinitialize: true
})(CommentForm));

/***/ }),

/***/ "./src/client/modules/post/components/post_form.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_form__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_form___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_form__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_reactstrap__);






var required = function required(value) {
  return value ? undefined : 'Required';
};

var renderField = function renderField(_ref) {
  var input = _ref.input,
      label = _ref.label,
      type = _ref.type,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error;

  var color = 'normal';
  if (touched && error) {
    color = 'danger';
  }

  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_4_reactstrap__["FormGroup"],
    { color: color },
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Label"],
      null,
      label
    ),
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_reactstrap__["Input"], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, input, { placeholder: label, type: type })),
      touched && error && __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4_reactstrap__["FormFeedback"],
        null,
        error
      )
    )
  );
};

renderField.propTypes = {
  input: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object,
  label: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  type: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  meta: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object
};

var PostForm = function PostForm(props) {
  var handleSubmit = props.handleSubmit,
      submitting = props.submitting,
      onSubmit = props.onSubmit;


  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Form"],
    { name: 'post', onSubmit: handleSubmit(onSubmit) },
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_redux_form__["Field"], { name: 'title', component: renderField, type: 'text', label: 'Title', validate: required }),
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_redux_form__["Field"], { name: 'content', component: renderField, type: 'text', label: 'Content', validate: required }),
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Button"],
      { color: 'primary', type: 'submit', disabled: submitting },
      'Submit'
    )
  );
};

PostForm.propTypes = {
  handleSubmit: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  onSubmit: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  submitting: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool
};

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_redux_form__["reduxForm"])({
  form: 'post',
  enableReinitialize: true
})(PostForm));

/***/ }),

/***/ "./src/client/modules/post/containers/post_add.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_apollo__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_router_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_post_form__ = __webpack_require__("./src/client/modules/post/components/post_form.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__graphql_post_add_graphql__ = __webpack_require__("./src/client/modules/post/graphql/post_add.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__graphql_post_add_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__graphql_post_add_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__post_list__ = __webpack_require__("./src/client/modules/post/containers/post_list.jsx");








var _this2 = this;











var PostAdd = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(PostAdd, _React$Component);

  function PostAdd() {
    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, PostAdd);

    return __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (PostAdd.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(PostAdd)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(PostAdd, [{
    key: 'onSubmit',
    value: function onSubmit(values) {
      var addPost = this.props.addPost;


      addPost(values.title, values.content);
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_10_react_router_dom__["Link"],
          { to: '/posts' },
          'Back'
        ),
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'h2',
          null,
          'Create Post'
        ),
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__components_post_form__["a" /* default */], { onSubmit: this.onSubmit.bind(this) })
      );
    }
  }]);

  return PostAdd;
}(__WEBPACK_IMPORTED_MODULE_7_react___default.a.Component);

PostAdd.propTypes = {
  addPost: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9_react_apollo__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9_react_apollo__["graphql"])(__WEBPACK_IMPORTED_MODULE_12__graphql_post_add_graphql___default.a, {
  props: function props(_ref) {
    var history = _ref.ownProps.history,
        mutate = _ref.mutate;
    return {
      addPost: function () {
        var _ref2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(title, content) {
          return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return mutate({
                    variables: { input: { title: title, content: content } },
                    optimisticResponse: {
                      addPost: {
                        id: -1,
                        title: title,
                        content: content,
                        __typename: 'Post'
                      }
                    },
                    updateQueries: {
                      getPosts: function getPosts(prev, _ref3) {
                        var addPost = _ref3.mutationResult.data.addPost;

                        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__post_list__["b" /* AddPost */])(prev, addPost);
                      }
                    }
                  });

                case 2:
                  return _context.abrupt('return', history.push('/posts'));

                case 3:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));

        return function addPost(_x, _x2) {
          return _ref2.apply(this, arguments);
        };
      }()
    };
  }
}))(PostAdd));

/***/ }),

/***/ "./src/client/modules/post/containers/post_comments.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_apollo__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_immutability_helper__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_immutability_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_immutability_helper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_redux_form__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_redux_form___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_redux_form__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_post_comment_form__ = __webpack_require__("./src/client/modules/post/components/post_comment_form.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__graphql_post_comment_add_graphql__ = __webpack_require__("./src/client/modules/post/graphql/post_comment_add.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__graphql_post_comment_add_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__graphql_post_comment_add_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__graphql_post_comment_edit_graphql__ = __webpack_require__("./src/client/modules/post/graphql/post_comment_edit.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__graphql_post_comment_edit_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__graphql_post_comment_edit_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__graphql_post_comment_delete_graphql__ = __webpack_require__("./src/client/modules/post/graphql/post_comment_delete.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__graphql_post_comment_delete_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__graphql_post_comment_delete_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__graphql_post_comment_subscription_graphql__ = __webpack_require__("./src/client/modules/post/graphql/post_comment_subscription.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__graphql_post_comment_subscription_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__graphql_post_comment_subscription_graphql__);




















function AddComment(prev, node) {
  // ignore if duplicate
  if (node.id !== null && prev.post.comments.some(function (comment) {
    return node.id === comment.id;
  })) {
    return prev;
  }

  return __WEBPACK_IMPORTED_MODULE_9_immutability_helper___default()(prev, {
    post: {
      comments: {
        $push: [node]
      }
    }
  });
}

function DeleteComment(prev, id) {
  var index = prev.post.comments.findIndex(function (x) {
    return x.id === id;
  });

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return __WEBPACK_IMPORTED_MODULE_9_immutability_helper___default()(prev, {
    post: {
      comments: {
        $splice: [[index, 1]]
      }
    }
  });
}

var PostComments = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(PostComments, _React$Component);

  function PostComments(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, PostComments);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (PostComments.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(PostComments)).call(this, props));

    _this.subscribeToCommentList = function (postId) {
      var subscribeToMore = _this.props.subscribeToMore;


      _this.subscription = subscribeToMore({
        document: __WEBPACK_IMPORTED_MODULE_16__graphql_post_comment_subscription_graphql___default.a,
        variables: { postId: postId },
        updateQuery: function updateQuery(prev, _ref) {
          var _ref$subscriptionData = _ref.subscriptionData.data.commentUpdated,
              mutation = _ref$subscriptionData.mutation,
              id = _ref$subscriptionData.id,
              node = _ref$subscriptionData.node;


          var newResult = prev;

          if (mutation === 'CREATED') {
            newResult = AddComment(prev, node);
          } else if (mutation === 'DELETED') {
            newResult = DeleteComment(prev, id);
          }

          return newResult;
        }
      });
    };

    props.onCommentSelect({ id: null, content: '' });

    _this.subscription = null;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(PostComments, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Check if props have changed and, if necessary, stop the subscription
      if (this.subscription && this.props.postId !== nextProps.postId) {
        this.subscription = null;
      }

      // Subscribe or re-subscribe
      if (!this.subscription) {
        this.subscribeToCommentList(nextProps.postId);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.subscription) {
        // unsubscribe
        this.subscription();
      }
    }
  }, {
    key: 'renderComments',
    value: function renderComments() {
      var _this2 = this;

      var _props = this.props,
          comments = _props.comments,
          onCommentSelect = _props.onCommentSelect;


      return comments.map(function (_ref2) {
        var id = _ref2.id,
            content = _ref2.content;

        return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_11_reactstrap__["ListGroupItem"],
          { className: 'justify-content-between', key: id },
          content,
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'div',
            null,
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'span',
              { className: 'badge badge-default badge-pill edit-comment',
                onClick: function onClick() {
                  return onCommentSelect({ id: id, content: content });
                } },
              'Edit'
            ),
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'span',
              { className: 'badge badge-default badge-pill delete-comment', onClick: function onClick() {
                  return _this2.onCommentDelete(id);
                } },
              'Delete'
            )
          )
        );
      });
    }
  }, {
    key: 'onCommentDelete',
    value: function onCommentDelete(id) {
      var _props2 = this.props,
          comment = _props2.comment,
          deleteComment = _props2.deleteComment,
          onCommentSelect = _props2.onCommentSelect;


      if (comment.id === id) {
        onCommentSelect({ id: null, content: '' });
      }

      deleteComment(id);
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(values) {
      var _props3 = this.props,
          addComment = _props3.addComment,
          editComment = _props3.editComment,
          postId = _props3.postId,
          comment = _props3.comment,
          onCommentSelect = _props3.onCommentSelect,
          onFormSubmitted = _props3.onFormSubmitted;


      if (comment.id === null) {
        addComment(values.content, postId);
      } else {
        editComment(comment.id, values.content);
      }

      onCommentSelect({ id: null, content: '' });
      onFormSubmitted();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          postId = _props4.postId,
          comment = _props4.comment;


      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'h3',
          null,
          'Comments'
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__components_post_comment_form__["a" /* default */], { postId: postId, onSubmit: this.onSubmit.bind(this), initialValues: comment }),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('h1', null),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_11_reactstrap__["ListGroup"],
          null,
          this.renderComments()
        )
      );
    }
  }]);

  return PostComments;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

PostComments.propTypes = {
  postId: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string.isRequired,
  comments: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.array.isRequired,
  comment: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object.isRequired,
  addComment: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired,
  editComment: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired,
  deleteComment: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired,
  onCommentSelect: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired,
  onFormSubmitted: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired,
  subscribeToMore: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired
};

var PostCommentsWithApollo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_apollo__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_apollo__["graphql"])(__WEBPACK_IMPORTED_MODULE_13__graphql_post_comment_add_graphql___default.a, {
  props: function props(_ref3) {
    var mutate = _ref3.mutate;
    return {
      addComment: function addComment(content, postId) {
        return mutate({
          variables: { input: { content: content, postId: postId } },
          optimisticResponse: {
            addComment: {
              id: -1,
              content: content,
              __typename: 'Comment'
            }
          },
          updateQueries: {
            getPost: function getPost(prev, _ref4) {
              var addComment = _ref4.mutationResult.data.addComment;

              return AddComment(prev, addComment);
            }
          }
        });
      }
    };
  }
}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_apollo__["graphql"])(__WEBPACK_IMPORTED_MODULE_14__graphql_post_comment_edit_graphql___default.a, {
  props: function props(_ref5) {
    var postId = _ref5.ownProps.postId,
        mutate = _ref5.mutate;
    return {
      editComment: function editComment(id, content) {
        return mutate({
          variables: { input: { id: id, postId: postId, content: content } },
          optimisticResponse: {
            __typename: 'Mutation',
            editComment: {
              id: id,
              content: content,
              __typename: 'Comment'
            }
          }
        });
      }
    };
  }
}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_apollo__["graphql"])(__WEBPACK_IMPORTED_MODULE_15__graphql_post_comment_delete_graphql___default.a, {
  props: function props(_ref6) {
    var postId = _ref6.ownProps.postId,
        mutate = _ref6.mutate;
    return {
      deleteComment: function deleteComment(id) {
        return mutate({
          variables: { input: { id: id, postId: postId } },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteComment: {
              id: id,
              __typename: 'Comment'
            }
          },
          updateQueries: {
            getPost: function getPost(prev, _ref7) {
              var deleteComment = _ref7.mutationResult.data.deleteComment;

              return DeleteComment(prev, deleteComment.id);
            }
          }
        });
      }
    };
  }
}))(PostComments);

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_react_redux__["connect"])(function (state) {
  return { comment: state.post.comment };
}, function (dispatch) {
  return {
    onCommentSelect: function onCommentSelect(comment) {
      dispatch({
        type: 'COMMENT_SELECT',
        value: comment
      });
    },
    onFormSubmitted: function onFormSubmitted() {
      dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10_redux_form__["reset"])('comment'));
    }
  };
})(PostCommentsWithApollo));

/***/ }),

/***/ "./src/client/modules/post/containers/post_edit.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_apollo__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_router_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_post_form__ = __webpack_require__("./src/client/modules/post/components/post_form.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__post_comments__ = __webpack_require__("./src/client/modules/post/containers/post_comments.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__graphql_post_get_graphql__ = __webpack_require__("./src/client/modules/post/graphql/post_get.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__graphql_post_get_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__graphql_post_get_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__graphql_post_edit_graphql__ = __webpack_require__("./src/client/modules/post/graphql/post_edit.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__graphql_post_edit_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__graphql_post_edit_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__graphql_post_subscription_graphql__ = __webpack_require__("./src/client/modules/post/graphql/post_subscription.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__graphql_post_subscription_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__graphql_post_subscription_graphql__);








var _this2 = this;












var PostEdit = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(PostEdit, _React$Component);

  function PostEdit(props) {
    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, PostEdit);

    var _this = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (PostEdit.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(PostEdit)).call(this, props));

    _this.subscribeToPostEdit = function (postId) {
      var subscribeToMore = _this.props.subscribeToMore;


      _this.subscription = subscribeToMore({
        document: __WEBPACK_IMPORTED_MODULE_15__graphql_post_subscription_graphql___default.a,
        variables: { id: postId }
      });
    };

    _this.subscription = null;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(PostEdit, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.loading) {
        // Check if props have changed and, if necessary, stop the subscription
        if (this.subscription && this.props.post.id !== nextProps.post.id) {
          this.subscription();
          this.subscription = null;
        }

        // Subscribe or re-subscribe
        if (!this.subscription) {
          this.subscribeToPostEdit(nextProps.post.id);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.subscription) {
        // unsubscribe
        this.subscription();
      }
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(values) {
      var _props = this.props,
          post = _props.post,
          editPost = _props.editPost;


      editPost(post.id, values.title, values.content);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          loading = _props2.loading,
          post = _props2.post,
          match = _props2.match,
          subscribeToMore = _props2.subscribeToMore;


      if (loading) {
        return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('div', null);
      } else {
        return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'div',
          null,
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_10_react_router_dom__["Link"],
            { id: 'back-button', to: '/posts' },
            'Back'
          ),
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
            'h2',
            null,
            'Edit Post'
          ),
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__components_post_form__["a" /* default */], { onSubmit: this.onSubmit.bind(this), initialValues: post }),
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('br', null),
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__post_comments__["a" /* default */], { postId: match.params.id, comments: post.comments, subscribeToMore: subscribeToMore })
        );
      }
    }
  }]);

  return PostEdit;
}(__WEBPACK_IMPORTED_MODULE_7_react___default.a.Component);

PostEdit.propTypes = {
  loading: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool.isRequired,
  post: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.object,
  editPost: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func.isRequired,
  match: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.object.isRequired,
  subscribeToMore: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9_react_apollo__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9_react_apollo__["graphql"])(__WEBPACK_IMPORTED_MODULE_13__graphql_post_get_graphql___default.a, {
  options: function options(props) {
    return {
      variables: { id: props.match.params.id }
    };
  },
  props: function props(_ref) {
    var _ref$data = _ref.data,
        loading = _ref$data.loading,
        post = _ref$data.post,
        subscribeToMore = _ref$data.subscribeToMore;

    return { loading: loading, post: post, subscribeToMore: subscribeToMore };
  }
}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9_react_apollo__["graphql"])(__WEBPACK_IMPORTED_MODULE_14__graphql_post_edit_graphql___default.a, {
  props: function props(_ref2) {
    var history = _ref2.ownProps.history,
        mutate = _ref2.mutate;
    return {
      editPost: function () {
        var _ref3 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(id, title, content) {
          return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return mutate({
                    variables: { input: { id: id, title: title, content: content } }
                  });

                case 2:
                  return _context.abrupt('return', history.push('/posts'));

                case 3:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));

        return function editPost(_x, _x2, _x3) {
          return _ref3.apply(this, arguments);
        };
      }()
    };
  }
}))(PostEdit));

/***/ }),

/***/ "./src/client/modules/post/containers/post_list.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = AddPost;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_apollo__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_immutability_helper__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_immutability_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_immutability_helper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_router_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__graphql_posts_get_graphql__ = __webpack_require__("./src/client/modules/post/graphql/posts_get.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__graphql_posts_get_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__graphql_posts_get_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__graphql_posts_subscription_graphql__ = __webpack_require__("./src/client/modules/post/graphql/posts_subscription.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__graphql_posts_subscription_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__graphql_posts_subscription_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__graphql_post_delete_graphql__ = __webpack_require__("./src/client/modules/post/graphql/post_delete.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__graphql_post_delete_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__graphql_post_delete_graphql__);

















function AddPost(prev, node) {
  // ignore if duplicate
  if (node.id !== null && prev.postsQuery.edges.some(function (post) {
    return node.id === post.cursor;
  })) {
    return prev;
  }

  var edge = {
    cursor: node.id,
    node: node,
    __typename: 'PostEdges'
  };

  return __WEBPACK_IMPORTED_MODULE_9_immutability_helper___default()(prev, {
    postsQuery: {
      totalCount: {
        $set: prev.postsQuery.totalCount + 1
      },
      edges: {
        $unshift: [edge]
      }
    }
  });
}

function DeletePost(prev, id) {
  var index = prev.postsQuery.edges.findIndex(function (x) {
    return x.node.id === id;
  });

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return __WEBPACK_IMPORTED_MODULE_9_immutability_helper___default()(prev, {
    postsQuery: {
      totalCount: {
        $set: prev.postsQuery.totalCount - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
}

var PostList = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(PostList, _React$Component);

  function PostList(props) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, PostList);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (PostList.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(PostList)).call(this, props));

    _this.subscribeToPostList = function (endCursor) {
      var subscribeToMore = _this.props.subscribeToMore;


      _this.subscription = subscribeToMore({
        document: __WEBPACK_IMPORTED_MODULE_13__graphql_posts_subscription_graphql___default.a,
        variables: { endCursor: endCursor },
        updateQuery: function updateQuery(prev, _ref) {
          var _ref$subscriptionData = _ref.subscriptionData.data.postsUpdated,
              mutation = _ref$subscriptionData.mutation,
              node = _ref$subscriptionData.node;

          var newResult = prev;

          if (mutation === 'CREATED') {
            newResult = AddPost(prev, node);
          } else if (mutation === 'DELETED') {
            newResult = DeletePost(prev, node.id);
          }

          return newResult;
        }
      });
    };

    _this.subscription = null;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(PostList, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.loading) {
        var endCursor = this.props.postsQuery ? this.props.postsQuery.pageInfo.endCursor : 0;
        var nextEndCursor = nextProps.postsQuery.pageInfo.endCursor;

        // Check if props have changed and, if necessary, stop the subscription
        if (this.subscription && endCursor !== nextEndCursor) {
          this.subscription();
          this.subscription = null;
        }

        // Subscribe or re-subscribe
        if (!this.subscription) {
          this.subscribeToPostList(nextEndCursor);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.subscription) {
        // unsubscribe
        this.subscription();
      }
    }
  }, {
    key: 'renderPosts',
    value: function renderPosts() {
      var _props = this.props,
          postsQuery = _props.postsQuery,
          deletePost = _props.deletePost;


      return postsQuery.edges.map(function (_ref2) {
        var _ref2$node = _ref2.node,
            id = _ref2$node.id,
            title = _ref2$node.title;

        return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_11_reactstrap__["ListGroupItem"],
          { className: 'justify-content-between', key: id },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'span',
            null,
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_10_react_router_dom__["Link"],
              { className: 'post-link', to: '/post/' + id },
              title
            )
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'span',
            { className: 'badge badge-default badge-pill delete-button', onClick: deletePost(id) },
            'Delete'
          )
        );
      });
    }
  }, {
    key: 'renderLoadMore',
    value: function renderLoadMore() {
      var _props2 = this.props,
          postsQuery = _props2.postsQuery,
          loadMoreRows = _props2.loadMoreRows;


      if (postsQuery.pageInfo.hasNextPage) {
        return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_11_reactstrap__["Button"],
          { id: 'load-more', color: 'primary', onClick: loadMoreRows },
          'Load more ...'
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          loading = _props3.loading,
          postsQuery = _props3.postsQuery;


      if (loading && !postsQuery) {
        return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div', null);
      } else {
        return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'div',
          null,
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'h2',
            null,
            'Posts'
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_10_react_router_dom__["Link"],
            { to: '/post/add' },
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_11_reactstrap__["Button"],
              { color: 'primary' },
              'Add'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('h1', null),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_11_reactstrap__["ListGroup"],
            null,
            this.renderPosts()
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'div',
            null,
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'small',
              null,
              '(',
              postsQuery.edges.length,
              ' / ',
              postsQuery.totalCount,
              ')'
            )
          ),
          this.renderLoadMore()
        );
      }
    }
  }]);

  return PostList;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

PostList.propTypes = {
  loading: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool.isRequired,
  postsQuery: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object,
  deletePost: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func.isRequired,
  loadMoreRows: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func.isRequired,
  subscribeToMore: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_apollo__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_apollo__["graphql"])(__WEBPACK_IMPORTED_MODULE_12__graphql_posts_get_graphql___default.a, {
  options: function options() {
    return {
      variables: { limit: 10, after: 0 }
    };
  },
  props: function props(_ref3) {
    var data = _ref3.data;
    var loading = data.loading,
        postsQuery = data.postsQuery,
        fetchMore = data.fetchMore,
        subscribeToMore = data.subscribeToMore;

    var loadMoreRows = function loadMoreRows() {
      return fetchMore({
        variables: {
          after: postsQuery.pageInfo.endCursor
        },
        updateQuery: function updateQuery(previousResult, _ref4) {
          var fetchMoreResult = _ref4.fetchMoreResult;

          var totalCount = fetchMoreResult.postsQuery.totalCount;
          var newEdges = fetchMoreResult.postsQuery.edges;
          var pageInfo = fetchMoreResult.postsQuery.pageInfo;

          return {
            // By returning `cursor` here, we update the `fetchMore` function
            // to the new cursor.
            postsQuery: {
              totalCount: totalCount,
              edges: [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(previousResult.postsQuery.edges), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(newEdges)),
              pageInfo: pageInfo,
              __typename: "PostsQuery"
            }
          };
        }
      });
    };

    return { loading: loading, postsQuery: postsQuery, subscribeToMore: subscribeToMore, loadMoreRows: loadMoreRows };
  }
}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_apollo__["graphql"])(__WEBPACK_IMPORTED_MODULE_14__graphql_post_delete_graphql___default.a, {
  props: function props(_ref5) {
    var mutate = _ref5.mutate;
    return {
      deletePost: function deletePost(id) {
        return function () {
          return mutate({
            variables: { id: id },
            optimisticResponse: {
              __typename: 'Mutation',
              deletePost: {
                id: id,
                __typename: 'Post'
              }
            },
            updateQueries: {
              getPosts: function getPosts(prev, _ref6) {
                var deletePost = _ref6.mutationResult.data.deletePost;

                return DeletePost(prev, deletePost.id);
              }
            }
          });
        };
      }
    };
  }
}))(PostList));

/***/ }),

/***/ "./src/client/modules/post/graphql/comment.graphql":
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"id"},"arguments":[],"directives":[],"selectionSet":null},{"kind":"Field","alias":null,"name":{"kind":"Name","value":"content"},"arguments":[],"directives":[],"selectionSet":null}]}}],"loc":{"start":0,"end":55}};
    doc.loc.source = {"body":"fragment CommentInfo on Comment {\n    id\n    content\n}\n","name":"GraphQL"};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  
module.exports = doc;

/***/ }),

/***/ "./src/client/modules/post/graphql/post.graphql":
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"id"},"arguments":[],"directives":[],"selectionSet":null},{"kind":"Field","alias":null,"name":{"kind":"Name","value":"title"},"arguments":[],"directives":[],"selectionSet":null},{"kind":"Field","alias":null,"name":{"kind":"Name","value":"content"},"arguments":[],"directives":[],"selectionSet":null}]}}],"loc":{"start":0,"end":59}};
    doc.loc.source = {"body":"fragment PostInfo on Post {\n    id\n    title\n    content\n}\n","name":"GraphQL"};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  
module.exports = doc;

/***/ }),

/***/ "./src/client/modules/post/graphql/post_add.graphql":
/***/ (function(module, exports, __webpack_require__) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddPostInput"}}},"defaultValue":null}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"addPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostInfo"},"directives":[]}]}}]}}],"loc":{"start":0,"end":126}};
    doc.loc.source = {"body":"#import \"./post.graphql\"\n\nmutation addPost($input: AddPostInput!) {\n    addPost(input: $input) {\n        ... PostInfo\n    }\n}\n","name":"GraphQL"};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  doc.definitions = doc.definitions.concat(unique(__webpack_require__("./src/client/modules/post/graphql/post.graphql").definitions));

module.exports = doc;

/***/ }),

/***/ "./src/client/modules/post/graphql/post_comment_add.graphql":
/***/ (function(module, exports, __webpack_require__) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddCommentInput"}}},"defaultValue":null}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"addComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentInfo"},"directives":[]}]}}]}}],"loc":{"start":0,"end":141}};
    doc.loc.source = {"body":"#import \"./comment.graphql\"\n\nmutation addComment($input: AddCommentInput!) {\n    addComment(input: $input) {\n        ... CommentInfo\n    }\n}\n","name":"GraphQL"};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  doc.definitions = doc.definitions.concat(unique(__webpack_require__("./src/client/modules/post/graphql/comment.graphql").definitions));

module.exports = doc;

/***/ }),

/***/ "./src/client/modules/post/graphql/post_comment_delete.graphql":
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteCommentInput"}}},"defaultValue":null}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"id"},"arguments":[],"directives":[],"selectionSet":null}]}}]}}],"loc":{"start":0,"end":108}};
    doc.loc.source = {"body":"mutation deleteComment($input: DeleteCommentInput!) {\n    deleteComment(input: $input) {\n        id\n    }\n}\n","name":"GraphQL"};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  
module.exports = doc;

/***/ }),

/***/ "./src/client/modules/post/graphql/post_comment_edit.graphql":
/***/ (function(module, exports, __webpack_require__) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditCommentInput"}}},"defaultValue":null}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"editComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentInfo"},"directives":[]}]}}]}}],"loc":{"start":0,"end":144}};
    doc.loc.source = {"body":"#import \"./comment.graphql\"\n\nmutation editComment($input: EditCommentInput!) {\n    editComment(input: $input) {\n        ... CommentInfo\n    }\n}\n","name":"GraphQL"};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  doc.definitions = doc.definitions.concat(unique(__webpack_require__("./src/client/modules/post/graphql/comment.graphql").definitions));

module.exports = doc;

/***/ }),

/***/ "./src/client/modules/post/graphql/post_comment_subscription.graphql":
/***/ (function(module, exports, __webpack_require__) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"onCommentUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"defaultValue":null}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"commentUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"mutation"},"arguments":[],"directives":[],"selectionSet":null},{"kind":"Field","alias":null,"name":{"kind":"Name","value":"id"},"arguments":[],"directives":[],"selectionSet":null},{"kind":"Field","alias":null,"name":{"kind":"Name","value":"postId"},"arguments":[],"directives":[],"selectionSet":null},{"kind":"Field","alias":null,"name":{"kind":"Name","value":"node"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentInfo"},"directives":[]}]}}]}}]}}],"loc":{"start":0,"end":217}};
    doc.loc.source = {"body":"#import \"./comment.graphql\"\n\nsubscription onCommentUpdated($postId: ID!) {\n    commentUpdated(postId: $postId) {\n        mutation\n        id\n        postId\n        node {\n            ... CommentInfo\n        }\n    }\n}\n","name":"GraphQL"};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  doc.definitions = doc.definitions.concat(unique(__webpack_require__("./src/client/modules/post/graphql/comment.graphql").definitions));

module.exports = doc;

/***/ }),

/***/ "./src/client/modules/post/graphql/post_delete.graphql":
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deletePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"defaultValue":null}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"deletePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"id"},"arguments":[],"directives":[],"selectionSet":null}]}}]}}],"loc":{"start":0,"end":76}};
    doc.loc.source = {"body":"mutation deletePost($id: ID!) {\n    deletePost(id: $id) {\n        id\n    }\n}","name":"GraphQL"};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  
module.exports = doc;

/***/ }),

/***/ "./src/client/modules/post/graphql/post_edit.graphql":
/***/ (function(module, exports, __webpack_require__) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditPostInput"}}},"defaultValue":null}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"editPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostInfo"},"directives":[]}]}}]}}],"loc":{"start":0,"end":129}};
    doc.loc.source = {"body":"#import \"./post.graphql\"\n\nmutation editPost($input: EditPostInput!) {\n    editPost(input: $input) {\n        ... PostInfo\n    }\n}\n","name":"GraphQL"};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  doc.definitions = doc.definitions.concat(unique(__webpack_require__("./src/client/modules/post/graphql/post.graphql").definitions));

module.exports = doc;

/***/ }),

/***/ "./src/client/modules/post/graphql/post_get.graphql":
/***/ (function(module, exports, __webpack_require__) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"defaultValue":null}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostInfo"},"directives":[]},{"kind":"Field","alias":null,"name":{"kind":"Name","value":"comments"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentInfo"},"directives":[]}]}}]}}]}}],"loc":{"start":0,"end":186}};
    doc.loc.source = {"body":"#import \"./post.graphql\"\n#import \"./comment.graphql\"\n\nquery getPost($id: ID!) {\n    post(id: $id) {\n        ... PostInfo\n        comments {\n            ... CommentInfo\n        }\n    }\n}\n","name":"GraphQL"};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  doc.definitions = doc.definitions.concat(unique(__webpack_require__("./src/client/modules/post/graphql/post.graphql").definitions));
doc.definitions = doc.definitions.concat(unique(__webpack_require__("./src/client/modules/post/graphql/comment.graphql").definitions));

module.exports = doc;

/***/ }),

/***/ "./src/client/modules/post/graphql/post_subscription.graphql":
/***/ (function(module, exports, __webpack_require__) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"onPostUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"defaultValue":null}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"postUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostInfo"},"directives":[]}]}}]}}],"loc":{"start":0,"end":121}};
    doc.loc.source = {"body":"#import \"./post.graphql\"\n\nsubscription onPostUpdated($id: ID!) {\n    postUpdated(id: $id) {\n        ... PostInfo\n    }\n}\n","name":"GraphQL"};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  doc.definitions = doc.definitions.concat(unique(__webpack_require__("./src/client/modules/post/graphql/post.graphql").definitions));

module.exports = doc;

/***/ }),

/***/ "./src/client/modules/post/graphql/posts_get.graphql":
/***/ (function(module, exports, __webpack_require__) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"defaultValue":null},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"defaultValue":null}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"postsQuery"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"totalCount"},"arguments":[],"directives":[],"selectionSet":null},{"kind":"Field","alias":null,"name":{"kind":"Name","value":"edges"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"cursor"},"arguments":[],"directives":[],"selectionSet":null},{"kind":"Field","alias":null,"name":{"kind":"Name","value":"node"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostInfo"},"directives":[]}]}}]}},{"kind":"Field","alias":null,"name":{"kind":"Name","value":"pageInfo"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"endCursor"},"arguments":[],"directives":[],"selectionSet":null},{"kind":"Field","alias":null,"name":{"kind":"Name","value":"hasNextPage"},"arguments":[],"directives":[],"selectionSet":null}]}}]}}]}}],"loc":{"start":0,"end":325}};
    doc.loc.source = {"body":"#import \"./post.graphql\"\n\nquery getPosts($limit: Int!, $after: ID) {\n    postsQuery(limit: $limit, after: $after) {\n        totalCount\n        edges {\n            cursor\n            node {\n                ... PostInfo\n            }\n        }\n        pageInfo {\n            endCursor\n            hasNextPage\n        }\n    }\n}\n","name":"GraphQL"};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  doc.definitions = doc.definitions.concat(unique(__webpack_require__("./src/client/modules/post/graphql/post.graphql").definitions));

module.exports = doc;

/***/ }),

/***/ "./src/client/modules/post/graphql/posts_subscription.graphql":
/***/ (function(module, exports, __webpack_require__) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"onPostUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endCursor"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"defaultValue":null}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"postsUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"endCursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endCursor"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":null,"name":{"kind":"Name","value":"mutation"},"arguments":[],"directives":[],"selectionSet":null},{"kind":"Field","alias":null,"name":{"kind":"Name","value":"node"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostInfo"},"directives":[]}]}}]}}]}}],"loc":{"start":0,"end":189}};
    doc.loc.source = {"body":"#import \"./post.graphql\"\n\nsubscription onPostUpdated($endCursor: ID!) {\n    postsUpdated(endCursor: $endCursor) {\n        mutation\n        node {\n            ... PostInfo\n        }\n    }\n}\n","name":"GraphQL"};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  doc.definitions = doc.definitions.concat(unique(__webpack_require__("./src/client/modules/post/graphql/post.graphql").definitions));

module.exports = doc;

/***/ }),

/***/ "./src/client/modules/post/index.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__containers_post_list__ = __webpack_require__("./src/client/modules/post/containers/post_list.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__containers_post_add__ = __webpack_require__("./src/client/modules/post/containers/post_add.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__containers_post_edit__ = __webpack_require__("./src/client/modules/post/containers/post_edit.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__reducers__ = __webpack_require__("./src/client/modules/post/reducers/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__connector__ = __webpack_require__("./src/client/modules/connector.js");












/* unused harmony default export */ var _unused_webpack_default_export = (new __WEBPACK_IMPORTED_MODULE_7__connector__["a" /* default */]({
  route: [__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/posts', component: __WEBPACK_IMPORTED_MODULE_3__containers_post_list__["a" /* default */] }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/post/add', component: __WEBPACK_IMPORTED_MODULE_4__containers_post_add__["a" /* default */] }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/post/:id', component: __WEBPACK_IMPORTED_MODULE_5__containers_post_edit__["a" /* default */] })],
  navItem: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_2_reactstrap__["NavItem"],
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"],
      { to: '/posts', className: 'nav-link' },
      'Posts'
    )
  ),
  reducer: { post: __WEBPACK_IMPORTED_MODULE_6__reducers__["a" /* default */] }
}));

/***/ }),

/***/ "./src/client/modules/post/reducers/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);

var defaultState = {
  comment: { id: null, content: '' }
};

/* harmony default export */ __webpack_exports__["a"] = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case 'COMMENT_SELECT':
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, state, {
        comment: action.value
      });

    default:
      return state;
  }
});

/***/ }),

/***/ "./src/client/modules/weather/containers/weather.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Weather; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_redux__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_moment__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_axios__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_axios__);
















var Weather = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(Weather, _React$Component);

  function Weather(props) {
    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, Weather);

    var _this = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Weather.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(Weather)).call(this, props));

    _this.API_KEY = '46ddd9c3c6a545d0d62e60754768e38d';
    _this.onCityEnter = _this.onCityEnter.bind(_this);
    _this.state = {
      metric: 'imperial',
      lat: 0,
      lon: 0,
      currentData: {
        city: {
          name: '',
          country: ''
        },
        main: {
          temp: '',
          temp_max: '',
          temp_min: ''
        },
        weather: [{
          description: '',
          main: ''
        }]
      },
      weatherData: {
        city: {
          name: '',
          country: ''
        },
        list: []
      },
      forecastData: []
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(Weather, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getLocation();
    }
  }, {
    key: 'getLocation',
    value: function getLocation() {
      var _this2 = this;

      if (navigator) {
        var geolocation = navigator.geolocation;

        new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
          geolocation.getCurrentPosition(function (position) {
            _this2.setState({
              lat: position.coords.latitude,
              lon: position.coords.longitude
            });
            _this2.getWeatherForecast(_this2.state.lat, _this2.state.lon, _this2.state.metric);
          }, function () {
            reject(new Error('Permission denied'));
          });
        });
      } else {
        console.log('sorry but this didnt work');
      }
    }
  }, {
    key: 'getCityData',
    value: function getCityData(city) {
      var _this3 = this;

      var WEATHER_CITY_URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + this.API_KEY + '&units=' + this.state.metric;
      __WEBPACK_IMPORTED_MODULE_12_axios___default.a.get(WEATHER_CITY_URL).then(function (res) {
        if (res.data.cod !== '200' && res.data.message) {
          throw new Error(res.data.message);
        } else {
          _this3.setState({
            lat: res.data.coord.lat,
            lon: res.data.coord.lon
          });
          _this3.getWeatherForecast(res.data.coord.lat, res.data.coord.lon, _this3.state.metric);
          return res.data;
        }
      }, function (res) {
        throw new Error(res.data.message);
      });
    }
  }, {
    key: 'getCurrentWeather',
    value: function getCurrentWeather(lat, long) {
      var _this4 = this;

      var WEATHER_CURRENT_URL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + this.API_KEY + '&units=' + this.state.metric;
      __WEBPACK_IMPORTED_MODULE_12_axios___default.a.get(WEATHER_CURRENT_URL).then(function (res) {
        if (res.data.cod !== '200' && res.data.message) {
          throw new Error(res.data.message);
        } else {
          _this4.setState({
            currentData: res.data
          });
          return res.data;
        }
      }, function (res) {
        throw new Error(res.data.message);
      });
    }
  }, {
    key: 'renderCurrentWeather',
    value: function renderCurrentWeather() {
      return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'h2',
          null,
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('i', { className: 'fa fa-cloud' }),
          ' Today\'s Forecast'
        ),
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'ul',
          { className: 'current-day list-unstyled' },
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
            'li',
            { className: 'card' },
            __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
              'div',
              { className: 'container', style: mainCardStyle },
              __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                'label',
                { className: 'title' },
                __WEBPACK_IMPORTED_MODULE_11_moment___default.a.unix(this.state.currentData.dt).format('ddd')
              ),
              __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                'label',
                { className: 'number' },
                Math.round(this.state.currentData.main.temp)
              ),
              __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                'label',
                null,
                this.state.currentData.weather[0].main
              ),
              __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                'label',
                null,
                __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('i', { className: 'fa fa-chevron-up' }),
                ' ',
                Math.round(this.state.currentData.main.temp_max)
              ),
              __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                'label',
                null,
                __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('i', { className: 'fa fa-chevron-down' }),
                ' ',
                Math.round(this.state.currentData.main.temp_min)
              )
            )
          )
        )
      );
    }
  }, {
    key: 'getWeatherForecast',
    value: function getWeatherForecast(lat, long, metric) {
      var _this5 = this;

      var WEATHER_FORECAST_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + long + '&appid=' + this.API_KEY + '&units=' + metric + '&cnt=5';

      __WEBPACK_IMPORTED_MODULE_12_axios___default.a.get(WEATHER_FORECAST_URL).then(function (res) {
        if (res.data.cod !== '200' && res.data.message) {
          throw new Error(res.data.message);
        } else {
          var forecastData = [];
          res.data.list.map(function (timeData, index) {
            forecastData.push(timeData);
          });
          _this5.setState({
            weatherData: res.data,
            forecastData: forecastData
          });
          return res.data;
        }
      }, function (res) {
        throw new Error(res.data.message);
      });
    }
  }, {
    key: 'onCityEnter',
    value: function onCityEnter(event) {
      event.preventDefault();
      var city = this.refs.city.value;

      this.getCityData(city);

      this.refs.city.value = '';
    }
  }, {
    key: 'renderCityForm',
    value: function renderCityForm() {
      return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
        'div',
        { className: 'city' },
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'h2',
          null,
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('i', { className: 'fa fa-globe' }),
          ' Enter a City'
        ),
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'form',
          { id: 'frmChat', role: 'form', onSubmit: this.onCityEnter },
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('input', { type: 'city', className: 'form-control', id: 'txtCity', ref: 'city', placeholder: 'Enter a city...', name: 'city' })
        )
      );
    }
  }, {
    key: 'toggleIsActive',
    value: function toggleIsActive(value) {
      return value === this.state.metric ? 'active' : '';
    }
  }, {
    key: 'toggleMetric',
    value: function toggleMetric(metric) {
      this.setState({
        metric: metric
      });
      this.getWeatherForecast(this.state.lat, this.state.lon, metric);
    }
  }, {
    key: 'renderMetricToggle',
    value: function renderMetricToggle() {
      var _this6 = this;

      var activeStyle = {
        width: 100 / this.state.forecastData.length + '%'
      };

      return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
        'ul',
        { className: 'toggle list-unstyled' },
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'li',
          { className: this.toggleIsActive('imperial'), onClick: function onClick() {
              return _this6.toggleMetric('imperial');
            } },
          'F'
        ),
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'li',
          { className: this.toggleIsActive('metric'), onClick: function onClick() {
              return _this6.toggleMetric('metric');
            } },
          'C'
        )
      );
    }
  }, {
    key: 'renderWeatherForecast',
    value: function renderWeatherForecast() {
      var widthStyle = {
        width: 100 / this.state.forecastData.length + '%'
      };

      if (this.state.forecastData.length > 0) {
        return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'div',
          { className: 'forecast clearfix' },
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
            'div',
            { className: 'header' },
            __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
              'h1',
              null,
              __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('i', { className: 'fa fa-map-marker' }),
              ' ',
              this.state.weatherData.city.name
            ),
            this.renderMetricToggle()
          ),
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
            'h2',
            null,
            __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('i', { className: 'fa fa-cloud' }),
            ' 5 Day Forecast'
          ),
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
            'ul',
            { className: 'day list-unstyled' },
            this.state.forecastData.map(function (day) {
              var dayString = __WEBPACK_IMPORTED_MODULE_11_moment___default.a.unix(day.dt).format('ddd');
              var dayCardStyle = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({
                background: '-webkit-linear-gradient(#43cff3, #e56363 ' + (100 - day.temp.day) + '%)'
              }, 'background', 'linear-gradient(#43cff3, #e56363 ' + (100 - day.temp.day) + '%)');
              return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                'li',
                { key: day.dt, className: 'card', style: widthStyle },
                __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                  'div',
                  { className: 'container', style: dayCardStyle },
                  __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                    'label',
                    { className: 'title' },
                    dayString
                  ),
                  __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                    'label',
                    { className: 'number' },
                    Math.round(day.temp.day)
                  ),
                  __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                    'label',
                    null,
                    day.weather[0].main
                  ),
                  __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                    'label',
                    null,
                    __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('i', { className: 'fa fa-chevron-up' }),
                    ' ',
                    Math.round(day.temp.max)
                  ),
                  __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                    'label',
                    null,
                    __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('i', { className: 'fa fa-chevron-down' }),
                    ' ',
                    Math.round(day.temp.min)
                  )
                )
              );
            })
          )
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
        'div',
        { className: 'weather text-center mt-4 mb-4 container' },
        this.renderCityForm(),
        this.renderWeatherForecast()
      );
    }
  }]);

  return Weather;
}(__WEBPACK_IMPORTED_MODULE_7_react___default.a.Component);



/***/ }),

/***/ "./src/client/modules/weather/index.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__containers_weather__ = __webpack_require__("./src/client/modules/weather/containers/weather.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reducers__ = __webpack_require__("./src/client/modules/weather/reducers/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__connector__ = __webpack_require__("./src/client/modules/connector.js");









/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_5__connector__["a" /* default */]({
  route: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/weather', component: __WEBPACK_IMPORTED_MODULE_3__containers_weather__["a" /* default */] }),
  navItem: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_2_reactstrap__["NavItem"],
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"],
      { to: '/weather', className: 'nav-link' },
      'Weather'
    )
  ),
  reducer: { weather: __WEBPACK_IMPORTED_MODULE_4__reducers__["a" /* default */] }
}));

/***/ }),

/***/ "./src/client/modules/weather/reducers/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);

var defaultState = {
  reduxCount: 1
};

/* harmony default export */ __webpack_exports__["a"] = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case 'COUNTER_INCREMENT':
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, state, {
        reduxCount: state.reduxCount += action.value
      });

    default:
      return state;
  }
});

/***/ }),

/***/ "./src/client/styles/styles.scss":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js?{\"sourceMap\":true}!./node_modules/postcss-loader/lib/index.js?{\"sourceMap\":true}!./node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!./src/client/styles/styles.scss");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js?{\"sourceMap\":true}!./node_modules/postcss-loader/lib/index.js?{\"sourceMap\":true}!./node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!./src/client/styles/styles.scss", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js?{\"sourceMap\":true}!./node_modules/postcss-loader/lib/index.js?{\"sourceMap\":true}!./node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!./src/client/styles/styles.scss");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/common/apollo_client.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_apollo_client__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_apollo_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_apollo_client__);


var createApolloClient = function createApolloClient(networkInterface) {
  var params = {
    dataIdFromObject: function dataIdFromObject(result) {
      if (result.id && result.__typename) {
        // eslint-disable-line no-underscore-dangle
        return result.__typename + result.id; // eslint-disable-line no-underscore-dangle
      }
      return null;
    },
    networkInterface: networkInterface
  };
  if (true) {
    if (false) {
      if (window.__APOLLO_STATE__) {
        params.initialState = window.__APOLLO_STATE__;
      }
      params.ssrForceFetchDelay = 100;
    } else {
      params.ssrMode = true;
    }
  }
  return new __WEBPACK_IMPORTED_MODULE_0_apollo_client___default.a(params);
};

/* harmony default export */ __webpack_exports__["a"] = (createApolloClient);

/***/ }),

/***/ "./src/common/log.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_minilog__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_minilog___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_minilog__);


__WEBPACK_IMPORTED_MODULE_0_minilog___default.a.enable();

var log = typeof window !== 'undefined' ? __WEBPACK_IMPORTED_MODULE_0_minilog___default()('frontend') : __WEBPACK_IMPORTED_MODULE_0_minilog___default()('backend');

if (true) {
  var console_log = global.console.log;
  global.console.log = function () {
    if (arguments.length == 1 && typeof arguments[0] === 'string' && arguments[0].match(/^\[(HMR|WDS)\]/)) {
      console_log('backend ' + arguments[0]);
    } else {
      console_log.apply(console_log, arguments);
    }
  };
}

/* harmony default export */ __webpack_exports__["a"] = (log);

/***/ }),

/***/ "./src/common/redux_store.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_form__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_form___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_form__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_redux_devtools_extension__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_redux_devtools_extension___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_redux_devtools_extension__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__client_modules__ = __webpack_require__("./src/client/modules/index.jsx");








var createReduxStore = function createReduxStore(initialState, client, routerMiddleware) {
  var store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_redux__["createStore"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_redux__["combineReducers"])(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
    apollo: client.reducer(),
    router: __WEBPACK_IMPORTED_MODULE_2_react_router_redux__["routerReducer"],
    form: __WEBPACK_IMPORTED_MODULE_3_redux_form__["reducer"]

  }, __WEBPACK_IMPORTED_MODULE_5__client_modules__["a" /* default */].reducers)), initialState, // initial state
  routerMiddleware ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_redux_devtools_extension__["composeWithDevTools"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_redux__["applyMiddleware"])(client.middleware(), routerMiddleware)) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_redux__["applyMiddleware"])(client.middleware()));

  return store;
};

/* harmony default export */ __webpack_exports__["a"] = (createReduxStore);

/***/ }),

/***/ "./src/server/api/root_schema.graphqls":
/***/ (function(module, exports) {

module.exports = "type Query {\n  dummy: Int\n}\n\ntype Mutation {\n  dummy: Int\n}\n\ntype Subscription {\n  dummy: Int\n}\n\nschema {\n  query: Query\n  mutation: Mutation\n  subscription: Subscription\n}\n"

/***/ }),

/***/ "./src/server/api/schema.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return pubsub; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_tools__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_tools___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql_tools__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_apollo_logger__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_apollo_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_apollo_logger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_graphql_subscriptions__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_graphql_subscriptions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_graphql_subscriptions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__root_schema_graphqls__ = __webpack_require__("./src/server/api/root_schema.graphqls");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__root_schema_graphqls___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__root_schema_graphqls__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules__ = __webpack_require__("./src/server/modules/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_log__ = __webpack_require__("./src/common/log.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__package_json__ = __webpack_require__("./package.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__package_json__);









var pubsub = __WEBPACK_IMPORTED_MODULE_6__package_json__["app"].apolloLogging ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_apollo_logger__["addApolloLogging"])(new __WEBPACK_IMPORTED_MODULE_2_graphql_subscriptions__["PubSub"]()) : new __WEBPACK_IMPORTED_MODULE_2_graphql_subscriptions__["PubSub"]();

var executableSchema = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_graphql_tools__["makeExecutableSchema"])({
  typeDefs: [__WEBPACK_IMPORTED_MODULE_3__root_schema_graphqls___default.a].concat(__WEBPACK_IMPORTED_MODULE_4__modules__["a" /* default */].schemas),
  resolvers: __WEBPACK_IMPORTED_MODULE_4__modules__["a" /* default */].createResolvers(pubsub)
});

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_graphql_tools__["addErrorLoggingToSchema"])(executableSchema, { log: function log(e) {
    return __WEBPACK_IMPORTED_MODULE_5__common_log__["a" /* default */].error(e);
  } });

/* harmony default export */ __webpack_exports__["a"] = (executableSchema);

/***/ }),

/***/ "./src/server/api/subscriptions.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addGraphQLSubscriptions", function() { return addGraphQLSubscriptions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_subscriptions_transport_ws__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_subscriptions_transport_ws___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_subscriptions_transport_ws__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_graphql_subscriptions__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_graphql_subscriptions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_graphql_subscriptions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_apollo_logger__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_apollo_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_apollo_logger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__schema__ = __webpack_require__("./src/server/api/schema.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules__ = __webpack_require__("./src/server/modules/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_log__ = __webpack_require__("./src/common/log.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__package_json__ = __webpack_require__("./package.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__package_json__);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pubsub", function() { return __WEBPACK_IMPORTED_MODULE_3__schema__["b"]; });









var manager = new __WEBPACK_IMPORTED_MODULE_1_graphql_subscriptions__["SubscriptionManager"]({
  schema: __WEBPACK_IMPORTED_MODULE_3__schema__["a" /* default */],
  pubsub: __WEBPACK_IMPORTED_MODULE_3__schema__["b" /* pubsub */],
  setupFunctions: __WEBPACK_IMPORTED_MODULE_4__modules__["a" /* default */].subscriptionsSetups
});
var subscriptionManager = __WEBPACK_IMPORTED_MODULE_6__package_json__["app"].apolloLogging ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_apollo_logger__["addApolloLogging"])(manager) : manager;

var subscriptionServer;

var addSubscriptions = function addSubscriptions(httpServer) {
  var subscriptionServerConfig = {
    server: httpServer,
    path: '/'
  };

  subscriptionServer = new __WEBPACK_IMPORTED_MODULE_0_subscriptions_transport_ws__["SubscriptionServer"]({
    subscriptionManager: subscriptionManager
  }, subscriptionServerConfig);
};

var addGraphQLSubscriptions = function addGraphQLSubscriptions(httpServer) {
  if (module.hot && module.hot.data) {
    var prevServer = module.hot.data.subscriptionServer;
    if (prevServer && prevServer.wsServer) {
      __WEBPACK_IMPORTED_MODULE_5__common_log__["a" /* default */].debug('Reloading the subscription server.');
      prevServer.wsServer.close(function () {
        addSubscriptions(httpServer);
      });
    }
  } else {
    addSubscriptions(httpServer);
  }
};

if (true) {
  module.hot.dispose(function (data) {
    try {
      data.subscriptionServer = subscriptionServer;
    } catch (error) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__common_log__["a" /* default */])(error.stack);
    }
  });
}



/***/ }),

/***/ "./src/server/api_server.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_http__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_persisted_queries_json__ = __webpack_require__("./node_modules/persisted_queries.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_persisted_queries_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_persisted_queries_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__middleware_website__ = __webpack_require__("./src/server/middleware/website.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__middleware_graphiql__ = __webpack_require__("./src/server/middleware/graphiql.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__middleware_graphql__ = __webpack_require__("./src/server/middleware/graphql.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__api_subscriptions__ = __webpack_require__("./src/server/api/subscriptions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__package_json__ = __webpack_require__("./package.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__package_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__common_log__ = __webpack_require__("./src/common/log.js");





// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies, import/extensions









// eslint-disable-next-line import/no-mutable-exports
var server = void 0;

var app = __WEBPACK_IMPORTED_MODULE_1_express___default()();

var port = process.env.PORT || __WEBPACK_IMPORTED_MODULE_10__package_json__["app"].apiPort;

// Don't rate limit heroku
app.enable('trust proxy');

app.use(__WEBPACK_IMPORTED_MODULE_2_body_parser___default.a.urlencoded({ extended: true }));
app.use(__WEBPACK_IMPORTED_MODULE_2_body_parser___default.a.json());

app.use('/', __WEBPACK_IMPORTED_MODULE_1_express___default.a.static(__WEBPACK_IMPORTED_MODULE_10__package_json__["app"].frontendBuildDir, { maxAge: '180 days' }));

if (__WEBPACK_IMPORTED_MODULE_10__package_json__["app"].persistGraphQL && "development" !== 'test') {
  var invertedMap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_lodash__["invert"])(__WEBPACK_IMPORTED_MODULE_5_persisted_queries_json___default.a);

  app.use('/graphql', function (req, resp, next) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_lodash__["isArray"])(req.body)) {
      req.body = req.body.map(function (body) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
          query: invertedMap[body.id]
        }, body);
      });
      next();
    } else {
      if (!true || (req.get('Referer') || '').indexOf('/graphiql') < 0) {
        resp.status(500).send("Unknown GraphQL query has been received, rejecting...");
      } else {
        next();
      }
    }
  });
}

app.use('/graphql', function () {
  return __WEBPACK_IMPORTED_MODULE_8__middleware_graphql__["a" /* default */].apply(undefined, arguments);
});
app.use('/graphiql', function () {
  return __WEBPACK_IMPORTED_MODULE_7__middleware_graphiql__["a" /* default */].apply(undefined, arguments);
});
app.use(function () {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__middleware_website__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_5_persisted_queries_json___default.a).apply(undefined, arguments);
});

server = __WEBPACK_IMPORTED_MODULE_3_http___default.a.createServer(app);

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__api_subscriptions__["addGraphQLSubscriptions"])(server);

server.listen(port, function () {
  __WEBPACK_IMPORTED_MODULE_11__common_log__["a" /* default */].info('API is now running on port ' + port);
});

server.on('close', function () {
  server = undefined;
});

if (true) {
  module.hot.dispose(function () {
    try {
      if (server) {
        server.close();
      }
    } catch (error) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__common_log__["a" /* default */])(error.stack);
    }
  });

  module.hot.accept(["./src/server/api/subscriptions.js"], function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ __WEBPACK_IMPORTED_MODULE_9__api_subscriptions__ = __webpack_require__("./src/server/api/subscriptions.js"); (function () {
    try {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__api_subscriptions__["addGraphQLSubscriptions"])(server);
    } catch (error) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__common_log__["a" /* default */])(error.stack);
    }
  })(__WEBPACK_OUTDATED_DEPENDENCIES__); });

  module.hot.accept();
}

/* unused harmony default export */ var _unused_webpack_default_export = (server);

/***/ }),

/***/ "./src/server/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_log__ = __webpack_require__("./src/common/log.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_server__ = __webpack_require__("./src/server/api_server.js");



process.on('uncaughtException', function (ex) {
  __WEBPACK_IMPORTED_MODULE_0__common_log__["a" /* default */].error(ex);
  process.exit(1);
});

if (true) {
  module.hot.status(function (event) {
    if (event === 'abort' || event === 'fail') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_log__["a" /* default */])('HMR error status: ' + event);
      // Signal webpack.run.js to do full-reload of the back-end
      process.exit(250);
    }
  });

  module.hot.accept();
}

/***/ }),

/***/ "./src/server/middleware/graphiql.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_server_express__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_server_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql_server_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__package_json__ = __webpack_require__("./package.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__package_json__);



var port = process.env.PORT || __WEBPACK_IMPORTED_MODULE_1__package_json__["app"].apiPort;
var subscriptionsUrl = 'ws://localhost:' + port;

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_graphql_server_express__["graphiqlExpress"])({
  endpointURL: '/graphql',
  subscriptionsEndpoint: subscriptionsUrl,
  query: '{\n' + '  count {\n' + '    amount\n' + '  }\n' + '}'
}));

/***/ }),

/***/ "./src/server/middleware/graphql.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_server_express__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_server_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql_server_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_log__ = __webpack_require__("./src/common/log.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_schema__ = __webpack_require__("./src/server/api/schema.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules__ = __webpack_require__("./src/server/modules/index.js");







/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_graphql_server_express__["graphqlExpress"])(function () {
  try {
    return {
      schema: __WEBPACK_IMPORTED_MODULE_3__api_schema__["a" /* default */],
      context: __WEBPACK_IMPORTED_MODULE_4__modules__["a" /* default */].createContext()
    };
  } catch (e) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_common_log__["a" /* default */])(e.stack);
  }
}));

/***/ }),

/***/ "./src/server/middleware/html.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_serialize_javascript__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_serialize_javascript___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_serialize_javascript__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_client_styles_styles_scss__ = __webpack_require__("./src/client/styles/styles.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_client_styles_styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_client_styles_styles_scss__);





var Html = function Html(_ref) {
  var content = _ref.content,
      state = _ref.state,
      assetMap = _ref.assetMap,
      css = _ref.css;

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'html',
    { lang: 'en' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'head',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('meta', { charSet: 'utf-8' }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'title',
        null,
        'Apollo Fullstack Starter Kit'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/' + assetMap["apple-touch-icon.png"] }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('link', { rel: 'icon', type: 'image/png', href: '/' + assetMap["favicon-32x32.png"], sizes: '32x32' }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('link', { rel: 'icon', type: 'image/png', href: '/' + assetMap["favicon-16x16.png"], sizes: '16x16' }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('link', { rel: 'manifest', href: '/' + assetMap["manifest.json"] }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('link', { rel: 'mask-icon', href: '/' + assetMap["safari-pinned-tab.svg"], color: '#5bbad5' }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('link', { rel: 'shortcut icon', href: '/' + assetMap["favicon.ico"] }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('meta', { name: 'msapplication-config', content: '/' + assetMap["browserconfig.xml"] }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('meta', { name: 'theme-color', content: '#ffffff' }),
      !true && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('link', { rel: 'stylesheet', type: 'text/css', href: '/' + assetMap['bundle.css'] }),
      !!true && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('style', { dangerouslySetInnerHTML: {
          __html: __WEBPACK_IMPORTED_MODULE_3_client_styles_styles_scss___default.a._getCss()
        } }),
      !!css && css
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'body',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { id: 'content', dangerouslySetInnerHTML: { __html: content || "" } }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('script', {
        dangerouslySetInnerHTML: { __html: 'window.__APOLLO_STATE__=' + __WEBPACK_IMPORTED_MODULE_2_serialize_javascript___default()(state, { isJSON: true }) + ';' },
        charSet: 'UTF-8'
      }),
      assetMap["vendor.js"] && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('script', { src: '/' + assetMap["vendor.js"], charSet: 'utf-8' }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('script', { src: '/' + assetMap['bundle.js'], charSet: 'utf-8' })
    )
  );
};

Html.propTypes = {
  content: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  state: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  assetMap: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  css: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array
};

/* harmony default export */ __webpack_exports__["a"] = (Html);

/***/ }),

/***/ "./src/server/middleware/website.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom_server__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_apollo_client__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_apollo_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_apollo_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_apollo__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_router__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_styled_components__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_styled_components___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_styled_components__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_apollo_logger__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_apollo_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_apollo_logger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_persistgraphql__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_persistgraphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_persistgraphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_fs__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_path__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__common_apollo_client__ = __webpack_require__("./src/common/apollo_client.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__common_redux_store__ = __webpack_require__("./src/common/redux_store.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__html__ = __webpack_require__("./src/server/middleware/html.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__client_app_routes__ = __webpack_require__("./src/client/app/routes.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__common_log__ = __webpack_require__("./src/common/log.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__package_json__ = __webpack_require__("./package.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__package_json__);




var _this = this;

var renderServerSide = function () {
  var _ref = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(req, res, queryMap) {
    var networkInterface, client, initialState, store, context, component, sheet, html, css, apolloState, page;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            networkInterface = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_apollo_client__["createBatchingNetworkInterface"])({
              uri: apiUrl,
              opts: {
                credentials: "same-origin",
                headers: req.headers
              },
              batchInterval: 20
            });


            if (__WEBPACK_IMPORTED_MODULE_18__package_json__["app"].persistGraphQL) {
              networkInterface = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10_persistgraphql__["addPersistedQueries"])(networkInterface, queryMap);
            }

            if (__WEBPACK_IMPORTED_MODULE_18__package_json__["app"].apolloLogging) {
              networkInterface = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9_apollo_logger__["addApolloLogging"])(networkInterface);
            }

            client = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__common_apollo_client__["a" /* default */])(networkInterface);
            initialState = {};
            store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__common_redux_store__["a" /* default */])(initialState, client);
            context = {};
            component = __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_6_react_apollo__["ApolloProvider"],
              { store: store, client: client },
              __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_7_react_router__["StaticRouter"],
                {
                  location: req.url,
                  context: context
                },
                __WEBPACK_IMPORTED_MODULE_16__client_app_routes__["a" /* default */]
              )
            );
            _context.next = 10;
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_react_apollo__["getDataFromTree"])(component);

          case 10:

            res.status(200);

            sheet = new __WEBPACK_IMPORTED_MODULE_8_styled_components__["ServerStyleSheet"]();
            html = __WEBPACK_IMPORTED_MODULE_4_react_dom_server___default.a.renderToString(sheet.collectStyles(component));
            css = sheet.getStyleElement();


            if (context.url) {
              res.writeHead(301, { Location: context.url });
              res.end();
            } else {
              if (true) {
                assetMap = JSON.parse(__WEBPACK_IMPORTED_MODULE_11_fs___default.a.readFileSync(__WEBPACK_IMPORTED_MODULE_12_path___default.a.join(__WEBPACK_IMPORTED_MODULE_18__package_json__["app"].frontendBuildDir, 'assets.json')));
              }

              apolloState = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()({}, client.store.getState());

              // Temporary workaround for bug in AC@0.5.0: https://github.com/apollostack/apollo-client/issues/845

              delete apolloState.apollo.queries;
              delete apolloState.apollo.mutations;

              page = __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15__html__["a" /* default */], { content: html, state: apolloState, assetMap: assetMap, css: css });

              res.send('<!doctype html>\n' + __WEBPACK_IMPORTED_MODULE_4_react_dom_server___default.a.renderToStaticMarkup(page));
              res.end();
            }

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function renderServerSide(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var renderClientSide = function () {
  var _ref2 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2(req, res) {
    var page;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (true) {
              assetMap = JSON.parse(__WEBPACK_IMPORTED_MODULE_11_fs___default.a.readFileSync(__WEBPACK_IMPORTED_MODULE_12_path___default.a.join(__WEBPACK_IMPORTED_MODULE_18__package_json__["app"].frontendBuildDir, 'assets.json')));
            }
            page = __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15__html__["a" /* default */], { state: {}, assetMap: assetMap });

            res.send('<!doctype html>\n' + __WEBPACK_IMPORTED_MODULE_4_react_dom_server___default.a.renderToStaticMarkup(page));
            res.end();

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function renderClientSide(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();



















var port = process.env.PORT || __WEBPACK_IMPORTED_MODULE_18__package_json__["app"].apiPort;

var apiUrl = 'http://localhost:' + port + '/graphql';

var assetMap = void 0;

/* harmony default export */ __webpack_exports__["a"] = (function (queryMap) {
  return function () {
    var _ref3 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee3(req, res, next) {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              if (!(req.url.indexOf('.') < 0)) {
                _context3.next = 9;
                break;
              }

              if (false) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt('return', renderServerSide(req, res, queryMap));

            case 6:
              return _context3.abrupt('return', renderClientSide(req, res));

            case 7:
              _context3.next = 10;
              break;

            case 9:
              return _context3.abrupt('return', next());

            case 10:
              _context3.next = 15;
              break;

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3['catch'](0);
              __WEBPACK_IMPORTED_MODULE_17__common_log__["a" /* default */].error('RENDERING ERROR:', _context3.t0);
            case 15:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this, [[0, 12]]);
    }));

    return function (_x6, _x7, _x8) {
      return _ref3.apply(this, arguments);
    };
  }();
});

/***/ }),

/***/ "./src/server/modules/connector.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);





var combine = function combine(features, extractor) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_lodash__["without"])(__WEBPACK_IMPORTED_MODULE_3_lodash__["union"].apply(undefined, __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_lodash__["map"])(features, function (res) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_lodash__["castArray"])(extractor(res));
  }))), undefined);
};

var _default = function () {
  // eslint-disable-next-line no-unused-vars
  function _default(_ref) {
    for (var _len = arguments.length, features = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      features[_key - 1] = arguments[_key];
    }

    var schema = _ref.schema,
        createResolversFunc = _ref.createResolversFunc,
        subscriptionsSetup = _ref.subscriptionsSetup,
        createContextFunc = _ref.createContextFunc;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, _default);

    this.schema = combine(arguments, function (arg) {
      return arg.schema;
    });
    this.createResolversFunc = combine(arguments, function (arg) {
      return arg.createResolversFunc;
    });
    this.subscriptionsSetup = combine(arguments, function (arg) {
      return arg.subscriptionsSetup;
    });
    this.createContextFunc = combine(arguments, function (arg) {
      return arg.createContextFunc;
    });
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(_default, [{
    key: 'createContext',
    value: function createContext() {
      return __WEBPACK_IMPORTED_MODULE_3_lodash__["merge"].apply(undefined, [{}].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(this.createContextFunc.map(function (createContext) {
        return createContext();
      }))));
    }
  }, {
    key: 'createResolvers',
    value: function createResolvers(pubsub) {
      return __WEBPACK_IMPORTED_MODULE_3_lodash__["merge"].apply(undefined, [{}].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(this.createResolversFunc.map(function (createResolvers) {
        return createResolvers(pubsub);
      }))));
    }
  }, {
    key: 'schemas',
    get: function get() {
      return this.schema;
    }
  }, {
    key: 'subscriptionsSetups',
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_3_lodash__["merge"].apply(undefined, __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(this.subscriptionsSetup));
    }
  }]);

  return _default;
}();



/***/ }),

/***/ "./src/server/modules/counter/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sql__ = __webpack_require__("./src/server/modules/counter/sql.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__schema_graphqls__ = __webpack_require__("./src/server/modules/counter/schema.graphqls");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__schema_graphqls___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__schema_graphqls__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resolvers__ = __webpack_require__("./src/server/modules/counter/resolvers.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__subscriptions_setup__ = __webpack_require__("./src/server/modules/counter/subscriptions_setup.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__connector__ = __webpack_require__("./src/server/modules/connector.js");







/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_4__connector__["a" /* default */]({ schema: __WEBPACK_IMPORTED_MODULE_1__schema_graphqls___default.a, createResolversFunc: __WEBPACK_IMPORTED_MODULE_2__resolvers__["a" /* default */], subscriptionsSetup: __WEBPACK_IMPORTED_MODULE_3__subscriptions_setup__["a" /* default */],
  createContextFunc: function createContextFunc() {
    return { Count: new __WEBPACK_IMPORTED_MODULE_0__sql__["a" /* default */]() };
  } }));

/***/ }),

/***/ "./src/server/modules/counter/resolvers.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);


/* harmony default export */ __webpack_exports__["a"] = (function (pubsub) {
  return {
    Query: {
      count: function count(obj, args, context) {
        return context.Count.getCount();
      }
    },
    Mutation: {
      addCount: function addCount(obj, _ref, context) {
        var _this = this;

        var amount = _ref.amount;
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
          var count;
          return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return context.Count.addCount(amount);

                case 2:
                  _context.next = 4;
                  return context.Count.getCount();

                case 4:
                  count = _context.sent;


                  pubsub.publish('countUpdated', count);

                  return _context.abrupt('return', count);

                case 7:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }))();
      }
    },
    Subscription: {
      countUpdated: function countUpdated(amount) {
        return amount;
      }
    }
  };
});

/***/ }),

/***/ "./src/server/modules/counter/schema.graphqls":
/***/ (function(module, exports) {

module.exports = "# Database counter\ntype Count {\n  # Current amount\n  amount: Int!\n}\n\nextend type Query {\n  # Counter\n  count: Count\n}\n\nextend type Mutation {\n  # Increase counter value, returns current counter amount\n  addCount(\n    # Amount to add to counter\n    amount: Int!\n  ): Count\n}\n\nextend type Subscription {\n  # Subscription fired when anyone increases counter\n  countUpdated(ids: String): Count\n}\n"

/***/ }),

/***/ "./src/server/modules/counter/sql.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Count; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_server_sql_connector__ = __webpack_require__("./src/server/sql/connector.js");




var Count = function () {
  function Count() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Count);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Count, [{
    key: 'getCount',
    value: function getCount() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_server_sql_connector__["a" /* default */])('count').first();
    }
  }, {
    key: 'addCount',
    value: function addCount(amount) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_server_sql_connector__["a" /* default */])('count').increment('amount', amount);
    }
  }]);

  return Count;
}();



/***/ }),

/***/ "./src/server/modules/counter/subscriptions_setup.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  countUpdated: function countUpdated() {
    return {
      // Run the query each time count updated
      countUpdated: {
        filter: function filter() {
          return true;
        }
      }
    };
  }
});

/***/ }),

/***/ "./src/server/modules/debug/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_performance_now__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_performance_now___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_performance_now__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__package_json__ = __webpack_require__("./package.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__package_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sql_connector__ = __webpack_require__("./src/server/sql/connector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_log__ = __webpack_require__("./src/common/log.js");







// The map used to store the query times, where the query unique
// identifier is the key.
var times = {};
// Used for keeping track of the order queries are executed.
var count = 0;

var printQueryWithTime = function printQueryWithTime(uid) {
  var _times$uid = times[uid],
      startTime = _times$uid.startTime,
      endTime = _times$uid.endTime,
      query = _times$uid.query;

  var elapsedTime = endTime - startTime;

  // I print the sql generated for a given query, as well as
  // the bindings for the queries.
  __WEBPACK_IMPORTED_MODULE_4__common_log__["a" /* default */].info(query.sql, ',', '[' + (query.bindings ? query.bindings.join(',') : '') + ']');
  __WEBPACK_IMPORTED_MODULE_4__common_log__["a" /* default */].info('Time: ' + elapsedTime.toFixed(3) + ' ms\n');

  // After I print out the query, I have no more use to it,
  // so I delete it from my map so it doesn't grow out of control.
  delete times[uid];
};

var printIfPossible = function printIfPossible(uid) {
  var position = times[uid].position;

  // Look of a query with a position one less than the current query

  var previousTimeUid = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(times).find(function (key) {
    return times[key].position === position - 1;
  });

  // If we didn't find it, it must have been printed already and we can safely print ourselves.
  if (!previousTimeUid) {
    printQueryWithTime(uid);
  }
};

var printQueriesAfterGivenPosition = function printQueriesAfterGivenPosition(position) {
  // Look for the next query in the queue
  var nextTimeUid = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(times).find(function (key) {
    return times[key].position === position + 1;
  });

  // If we find one and it is marked as finished, we can go ahead and print it
  if (nextTimeUid && times[nextTimeUid].finished) {
    var nextPosition = times[nextTimeUid].position;
    printQueryWithTime(nextTimeUid);

    // There might be more queries that need to printed, so we should keep looking...
    printQueriesAfterGivenPosition(nextPosition);
  }
};

if (true && __WEBPACK_IMPORTED_MODULE_2__package_json__["app"].debugSQL) {
  __WEBPACK_IMPORTED_MODULE_3__sql_connector__["a" /* default */].on('query', function (query) {
    var uid = query.__knexQueryUid;
    times[uid] = {
      position: count,
      query: query,
      startTime: __WEBPACK_IMPORTED_MODULE_1_performance_now___default()(),
      // I keep track of when a query is finished with a boolean instead of
      // presence of an end time. It makes the logic easier to read.
      finished: false
    };
    count = count + 1;
  }).on('query-response', function (response, query) {
    var uid = query.__knexQueryUid;
    times[uid].endTime = __WEBPACK_IMPORTED_MODULE_1_performance_now___default()();
    times[uid].finished = true;
    var position = times[uid].position;

    // Print the current query, if I'm able
    printIfPossible(uid);

    // Check to see if queries further down the queue can be executed,
    //in case they weren't able to be printed when they first responded.
    printQueriesAfterGivenPosition(position);
  });
}

/***/ }),

/***/ "./src/server/modules/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__counter__ = __webpack_require__("./src/server/modules/counter/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__debug__ = __webpack_require__("./src/server/modules/debug/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__post__ = __webpack_require__("./src/server/modules/post/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__connector__ = __webpack_require__("./src/server/modules/connector.js");






/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_3__connector__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__counter__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__post__["a" /* default */]));

/***/ }),

/***/ "./src/server/modules/post/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dataloader__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dataloader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_dataloader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql__ = __webpack_require__("./src/server/modules/post/sql.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__schema_graphqls__ = __webpack_require__("./src/server/modules/post/schema.graphqls");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__schema_graphqls___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__schema_graphqls__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__resolvers__ = __webpack_require__("./src/server/modules/post/resolvers.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__subscriptions_setup__ = __webpack_require__("./src/server/modules/post/subscriptions_setup.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__connector__ = __webpack_require__("./src/server/modules/connector.js");









/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_5__connector__["a" /* default */]({ schema: __WEBPACK_IMPORTED_MODULE_2__schema_graphqls___default.a, createResolversFunc: __WEBPACK_IMPORTED_MODULE_3__resolvers__["a" /* default */], subscriptionsSetup: __WEBPACK_IMPORTED_MODULE_4__subscriptions_setup__["a" /* default */],
  createContextFunc: function createContextFunc() {
    var post = new __WEBPACK_IMPORTED_MODULE_1__sql__["a" /* default */]();

    return {
      Post: post,
      loaders: {
        getCommentsForPostIds: new __WEBPACK_IMPORTED_MODULE_0_dataloader___default.a(post.getCommentsForPostIds)
      }
    };
  }
}));

/***/ }),

/***/ "./src/server/modules/post/resolvers.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__);




/* harmony default export */ __webpack_exports__["a"] = (function (pubsub) {
  return {
    Query: {
      postsQuery: function postsQuery(obj, _ref, context) {
        var _this = this;

        var limit = _ref.limit,
            after = _ref.after;
        return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee() {
          var edgesArray, posts, endCursor, values;
          return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  edgesArray = [];
                  _context.next = 3;
                  return context.Post.getPostsPagination(limit, after);

                case 3:
                  posts = _context.sent;


                  posts.map(function (post) {
                    edgesArray.push({
                      cursor: post.id,
                      node: {
                        id: post.id,
                        title: post.title,
                        content: post.content
                      }
                    });
                  });

                  endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;
                  _context.next = 8;
                  return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default.a.all([context.Post.getTotal(), context.Post.getNextPageFlag(endCursor)]);

                case 8:
                  values = _context.sent;
                  return _context.abrupt('return', {
                    totalCount: values[0].count,
                    edges: edgesArray,
                    pageInfo: {
                      endCursor: endCursor,
                      hasNextPage: values[1].count > 0
                    }
                  });

                case 10:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }))();
      },
      post: function post(obj, _ref2, context) {
        var id = _ref2.id;

        return context.Post.getPost(id);
      }
    },
    Post: {
      comments: function comments(_ref3, args, context) {
        var id = _ref3.id;

        return context.loaders.getCommentsForPostIds.load(id);
      }
    },
    Mutation: {
      addPost: function addPost(obj, _ref4, context) {
        var _this2 = this;

        var input = _ref4.input;
        return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee2() {
          var _ref5, _ref6, id, post;

          return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return context.Post.addPost(input);

                case 2:
                  _ref5 = _context2.sent;
                  _ref6 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_ref5, 1);
                  id = _ref6[0];
                  _context2.next = 7;
                  return context.Post.getPost(id);

                case 7:
                  post = _context2.sent;

                  // publish for post list
                  pubsub.publish('postsUpdated', { mutation: 'CREATED', id: id, node: post });
                  return _context2.abrupt('return', post);

                case 10:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }))();
      },
      deletePost: function deletePost(obj, _ref7, context) {
        var _this3 = this;

        var id = _ref7.id;
        return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee3() {
          var post, isDeleted;
          return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return context.Post.getPost(id);

                case 2:
                  post = _context3.sent;
                  _context3.next = 5;
                  return context.Post.deletePost(id);

                case 5:
                  isDeleted = _context3.sent;

                  if (!isDeleted) {
                    _context3.next = 11;
                    break;
                  }

                  // publish for post list
                  pubsub.publish('postsUpdated', { mutation: 'DELETED', id: id, node: post });
                  return _context3.abrupt('return', { id: post.id });

                case 11:
                  return _context3.abrupt('return', { id: null });

                case 12:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this3);
        }))();
      },
      editPost: function editPost(obj, _ref8, context) {
        var _this4 = this;

        var input = _ref8.input;
        return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee4() {
          var post;
          return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return context.Post.editPost(input);

                case 2:
                  _context4.next = 4;
                  return context.Post.getPost(input.id);

                case 4:
                  post = _context4.sent;

                  // publish for post list
                  pubsub.publish('postsUpdated', { mutation: 'UPDATED', id: post.id, node: post });
                  // publish for edit post page
                  pubsub.publish('postUpdated', post);
                  return _context4.abrupt('return', post);

                case 8:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this4);
        }))();
      },
      addComment: function addComment(obj, _ref9, context) {
        var _this5 = this;

        var input = _ref9.input;
        return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee5() {
          var _ref10, _ref11, id, comment;

          return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return context.Post.addComment(input);

                case 2:
                  _ref10 = _context5.sent;
                  _ref11 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_ref10, 1);
                  id = _ref11[0];
                  _context5.next = 7;
                  return context.Post.getComment(id);

                case 7:
                  comment = _context5.sent;

                  // publish for edit post page
                  pubsub.publish('commentUpdated', {
                    mutation: 'CREATED',
                    id: comment.id,
                    postId: input.postId,
                    node: comment
                  });
                  return _context5.abrupt('return', comment);

                case 10:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, _this5);
        }))();
      },
      deleteComment: function deleteComment(obj, _ref12, context) {
        var _this6 = this;

        var _ref12$input = _ref12.input,
            id = _ref12$input.id,
            postId = _ref12$input.postId;
        return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee6() {
          return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return context.Post.deleteComment(id);

                case 2:
                  // publish for edit post page
                  pubsub.publish('commentUpdated', { mutation: 'DELETED', id: id, postId: postId, node: null });
                  return _context6.abrupt('return', { id: id });

                case 4:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, _this6);
        }))();
      },
      editComment: function editComment(obj, _ref13, context) {
        var _this7 = this;

        var input = _ref13.input;
        return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee7() {
          var comment;
          return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return context.Post.editComment(input);

                case 2:
                  _context7.next = 4;
                  return context.Post.getComment(input.id);

                case 4:
                  comment = _context7.sent;

                  // publish for edit post page
                  pubsub.publish('commentUpdated', { mutation: 'UPDATED', id: input.id, postId: input.postId, node: comment });
                  return _context7.abrupt('return', comment);

                case 7:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, _this7);
        }))();
      }
    },
    Subscription: {
      postUpdated: function postUpdated(value) {
        return value;
      },
      postsUpdated: function postsUpdated(value) {
        return value;
      },
      commentUpdated: function commentUpdated(value) {
        return value;
      }
    }
  };
});

/***/ }),

/***/ "./src/server/modules/post/schema.graphqls":
/***/ (function(module, exports) {

module.exports = "# Post\ntype Post {\n  id: ID!\n  title: String!\n  content: String!\n  comments: [Comment]\n}\n\n# Comment\ntype Comment {\n  id: ID!\n  content: String!\n}\n\n# Edges for PostsQuery\ntype PostEdges {\n  node: Post\n  cursor: ID\n}\n\n# PageInfo for PostsQuery\ntype PostPageInfo {\n  endCursor: ID\n  hasNextPage: Boolean\n}\n\n# Posts relay-style pagination query\ntype PostsQuery {\n  totalCount: Int\n  edges: [PostEdges]\n  pageInfo: PostPageInfo\n}\n\nextend type Query {\n  # Posts pagination query\n  postsQuery(limit: Int, after: ID): PostsQuery\n  # Post\n  post(id: ID!): Post\n}\n\nextend type Mutation {\n  # Create new post\n  addPost(input: AddPostInput!): Post\n  # Delete a post\n  deletePost(id: ID!): Post\n  # Edit a post\n  editPost(input: EditPostInput!): Post\n  # Add comment to post\n  addComment(input: AddCommentInput!): Comment\n  # Delete a comment\n  deleteComment(input: DeleteCommentInput!): Comment\n  # Edit a comment\n  editComment(input: EditCommentInput!): Comment\n}\n\n# Input for addPost Mutation\ninput AddPostInput {\n  title: String!\n  content: String!\n}\n\n# Input for editPost Mutation\ninput EditPostInput {\n  id: ID!\n  title: String!\n  content: String!\n}\n\n# Input for addComment Mutation\ninput AddCommentInput {\n  content: String!\n  # Needed for commentUpdated Subscription filter\n  postId: ID!\n}\n\n# Input for editComment Mutation\ninput DeleteCommentInput {\n  id: ID!\n  # Needed for commentUpdated Subscription filter\n  postId: ID!\n}\n\n# Input for deleteComment Mutation\ninput EditCommentInput {\n  id: ID!\n  content: String!\n  # Needed for commentUpdated Subscription filter\n  postId: ID!\n}\n\nextend type Subscription {\n  # Subscription for when editing a post\n  postUpdated(id: ID!): Post\n  # Subscription for post list\n  postsUpdated(endCursor: ID!): UpdatePostPayload\n  # Subscription for comments\n  commentUpdated(postId: ID!): UpdateCommentPayload\n}\n\n# Payload for postsUpdated Subscription\ntype UpdatePostPayload {\n  mutation: String!\n  id: ID!\n  node: Post\n}\n\n# Payload for commentUpdated Subscription\ntype UpdateCommentPayload {\n  mutation: String!\n  id: ID\n  postId: ID!\n  node: Comment\n}\n"

/***/ }),

/***/ "./src/server/modules/post/sql.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Post; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sql_connector__ = __webpack_require__("./src/server/sql/connector.js");







var orderedFor = function orderedFor(rows, collection, field, singleObject) {
  // return the rows ordered for the collection
  var inGroupsOfField = __WEBPACK_IMPORTED_MODULE_4_lodash___default.a.groupBy(rows, field);
  return collection.map(function (element) {
    var elementArray = inGroupsOfField[element];
    if (elementArray) {
      return singleObject ? elementArray[0] : elementArray;
    }
    return singleObject ? {} : [];
  });
};

var Post = function () {
  function Post() {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Post);
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Post, [{
    key: 'getPostsPagination',
    value: function getPostsPagination(limit, after) {

      var where = '';
      if (after > 0) {
        where = 'id < ' + after;
      }

      return __WEBPACK_IMPORTED_MODULE_5__sql_connector__["a" /* default */].select('id', 'title', 'content').from('post').whereRaw(where).orderBy('id', 'desc').limit(limit);
    }
  }, {
    key: 'getCommentsForPostIds',
    value: function () {
      var _ref = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(postIds) {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return __WEBPACK_IMPORTED_MODULE_5__sql_connector__["a" /* default */].select('id', 'content', 'post_id AS postId').from('comment').whereIn('post_id', postIds);

              case 2:
                res = _context.sent;
                return _context.abrupt('return', orderedFor(res, postIds, 'postId', false));

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getCommentsForPostIds(_x) {
        return _ref.apply(this, arguments);
      }

      return getCommentsForPostIds;
    }()
  }, {
    key: 'getTotal',
    value: function getTotal() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__sql_connector__["a" /* default */])('post').count('id as count').first();
    }
  }, {
    key: 'getNextPageFlag',
    value: function getNextPageFlag(id) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__sql_connector__["a" /* default */])('post').count('id as count').where('id', '<', id).first();
    }
  }, {
    key: 'getPost',
    value: function getPost(id) {
      return __WEBPACK_IMPORTED_MODULE_5__sql_connector__["a" /* default */].select('id', 'title', 'content').from('post').where('id', '=', id).first();
    }
  }, {
    key: 'addPost',
    value: function addPost(_ref2) {
      var title = _ref2.title,
          content = _ref2.content;

      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__sql_connector__["a" /* default */])('post').insert({ title: title, content: content }).returning('id');
    }
  }, {
    key: 'deletePost',
    value: function deletePost(id) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__sql_connector__["a" /* default */])('post').where('id', '=', id).del();
    }
  }, {
    key: 'editPost',
    value: function editPost(_ref3) {
      var id = _ref3.id,
          title = _ref3.title,
          content = _ref3.content;

      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__sql_connector__["a" /* default */])('post').where('id', '=', id).update({
        title: title,
        content: content
      });
    }
  }, {
    key: 'addComment',
    value: function addComment(_ref4) {
      var content = _ref4.content,
          postId = _ref4.postId;

      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__sql_connector__["a" /* default */])('comment').insert({ content: content, post_id: postId }).returning('id');
    }
  }, {
    key: 'getComment',
    value: function getComment(id) {
      return __WEBPACK_IMPORTED_MODULE_5__sql_connector__["a" /* default */].select('id', 'content').from('comment').where('id', '=', id).first();
    }
  }, {
    key: 'deleteComment',
    value: function deleteComment(id) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__sql_connector__["a" /* default */])('comment').where('id', '=', id).del();
    }
  }, {
    key: 'editComment',
    value: function editComment(_ref5) {
      var id = _ref5.id,
          content = _ref5.content;

      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__sql_connector__["a" /* default */])('comment').where('id', '=', id).update({
        content: content
      });
    }
  }]);

  return Post;
}();



/***/ }),

/***/ "./src/server/modules/post/subscriptions_setup.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  postUpdated: function postUpdated(options, args) {
    return {
      postUpdated: {
        filter: function filter(post) {
          return args.id == post.id;
        }
      }
    };
  },
  postsUpdated: function postsUpdated(options, args) {
    return {
      postsUpdated: {
        filter: function filter(post) {
          return args.endCursor <= post.id;
        }
      }
    };
  },
  commentUpdated: function commentUpdated(options, args) {
    return {
      commentUpdated: {
        filter: function filter(comment) {
          return args.postId === comment.postId;
        }
      }
    };
  }
});

/***/ }),

/***/ "./src/server/sql/connector.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_knex__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_knex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_knex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__knexdata__ = __webpack_require__("./knexdata.js");



// eslint-disable-next-line import/namespace
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_knex___default()(__WEBPACK_IMPORTED_MODULE_1__knexdata__["development"]));

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),

/***/ 10:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ }),

/***/ 11:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

module.exports = require("react-apollo");

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = require("redux-form");

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

module.exports = require("apollo-logger");

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

module.exports = require("immutability-helper");

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ 19:
/***/ (function(module, exports) {

module.exports = require("apollo-client");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),

/***/ 20:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),

/***/ 21:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

module.exports = require("graphql-server-express");

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

module.exports = require("graphql-subscriptions");

/***/ }),

/***/ 24:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),

/***/ 28:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/keys");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ 30:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/defineProperty");

/***/ }),

/***/ 31:
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ 32:
/***/ (function(module, exports) {

module.exports = require("dataloader");

/***/ }),

/***/ 33:
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ 34:
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ 35:
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),

/***/ 36:
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ 37:
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),

/***/ 38:
/***/ (function(module, exports) {

module.exports = require("knex");

/***/ }),

/***/ 39:
/***/ (function(module, exports) {

module.exports = require("minilog");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("reactstrap");

/***/ }),

/***/ 40:
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ 41:
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ 42:
/***/ (function(module, exports) {

module.exports = require("performance-now");

/***/ }),

/***/ 43:
/***/ (function(module, exports) {

module.exports = require("persistgraphql");

/***/ }),

/***/ 44:
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ 45:
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),

/***/ 46:
/***/ (function(module, exports) {

module.exports = require("react-router-redux");

/***/ }),

/***/ 47:
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ 48:
/***/ (function(module, exports) {

module.exports = require("redux-devtools-extension");

/***/ }),

/***/ 49:
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ 50:
/***/ (function(module, exports) {

module.exports = require("subscriptions-transport-ws");

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(25);
__webpack_require__("./src/server/index.js");
module.exports = __webpack_require__("./node_modules/webpack/hot/signal.js");


/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/extends");

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/inherits");

/***/ })

/******/ });
//# sourceMappingURL=index.49d1a53a4cec7952c731.js.map