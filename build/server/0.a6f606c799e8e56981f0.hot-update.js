require("source-map-support").install();
exports.id = 0;
exports.modules = {

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

/***/ })

};
//# sourceMappingURL=index.3e6361e6604dfab96c3f.js.map