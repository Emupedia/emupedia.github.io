(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Octokat"] = factory();
	else
		root["Octokat"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Both of these internal methods are really small/simple and we are only
// working with arrays anyway
var filter = __webpack_require__(12);
var forEach = __webpack_require__(13);
var map = __webpack_require__(14);

// require('underscore-plus')
var plus = {
  camelize: function camelize(string) {
    if (string) {
      return string.replace(/[_-]+(\w)/g, function (m) {
        return m[1].toUpperCase();
      });
    } else {
      return '';
    }
  },
  uncamelize: function uncamelize(string) {
    if (!string) {
      return '';
    }
    return string.replace(/([A-Z])+/g, function (match) {
      var letter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      return '_' + letter.toLowerCase();
    });
  },
  dasherize: function dasherize(string) {
    if (!string) {
      return '';
    }

    string = string[0].toLowerCase() + string.slice(1);
    return string.replace(/([A-Z])|(_)/g, function (m, letter) {
      if (letter) {
        return '-' + letter.toLowerCase();
      } else {
        return '-';
      }
    });
  },


  // Just _.extend(target, source)
  extend: function extend(target, source) {
    if (source) {
      return Object.keys(source).map(function (key) {
        target[key] = source[key];
      });
    }
  },


  // Just _.forOwn(obj, iterator)
  forOwn: function forOwn(obj, iterator) {
    return Object.keys(obj).map(function (key) {
      return iterator(obj[key], key);
    });
  },


  filter: filter,
  forEach: forEach,
  map: map
};

module.exports = plus;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (message) {
  if (console && console.warn) {
    console.warn("Octokat Deprecation: " + message);
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Converts a dictionary to a query string.
// Internal helper method
var toQueryString = function toQueryString(options, omitQuestionMark) {
  // Returns '' if `options` is empty so this string can always be appended to a URL
  if (!options || options === {}) {
    return '';
  }

  var params = [];
  var object = options || {};
  for (var key in object) {
    var value = object[key];
    if (value) {
      params.push(key + '=' + encodeURIComponent(value));
    }
  }
  if (params.length) {
    if (omitQuestionMark) {
      return '&' + params.join('&');
    } else {
      return '?' + params.join('&');
    }
  } else {
    return '';
  }
};

module.exports = toQueryString;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _module$exports;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Reuse these fields because there are 2 URL structures for accessing repositores:
// - `/repos/philschatz/octokat.js/...`
// - `/repositories/20044005/...`
var REPO_FIELDS = {
  'readme': false,
  'tarball': false,
  'zipball': false,
  'compare': false,
  'deployments': {
    'statuses': false
  },
  'hooks': {
    'tests': false
  },
  'assignees': false,
  'languages': false,
  'teams': false,
  'tags': false,
  'branches': false,
  'contributors': false,
  'subscribers': false,
  'subscription': false,
  'stargazers': false,
  'comments': false,
  'downloads': false,
  'forks': false,
  'milestones': {
    'labels': false
  },
  'labels': false,
  'releases': {
    'assets': false,
    'latest': false,
    'tags': false
  },
  'events': false,
  'notifications': false,
  'merges': false,
  'statuses': false,
  'pulls': {
    'merge': false,
    'comments': false,
    'commits': false,
    'files': false,
    'events': false,
    'labels': false,
    'requested_reviewers': false,
    'reviews': {
      'comments': false,
      'events': false,
      'dismissals': false
    }
  },
  'pages': {
    'builds': {
      'latest': false
    }
  },
  'commits': {
    'comments': false,
    'status': false,
    'statuses': false
  },
  'contents': false,
  'collaborators': {
    'permission': false
  },
  'projects': false,
  'issues': {
    'events': false,
    'comments': false,
    'labels': false
  },
  'git': {
    'refs': {
      'heads': false,
      'tags': false
    },
    'trees': false,
    'blobs': false,
    'commits': false
  },
  'stats': {
    'contributors': false,
    'commit_activity': false,
    'code_frequency': false,
    'participation': false,
    'punch_card': false
  },
  'traffic': {
    'popular': {
      'referrers': false,
      'paths': false
    },
    'views': false,
    'clones': false
  }
};

module.exports = (_module$exports = {
  'zen': false,
  'octocat': false,
  'organizations': false,
  'issues': false,
  'emojis': false,
  'markdown': false,
  'meta': false,
  'rate_limit': false,
  'feeds': false,
  'events': false,
  'repositories': false,
  'notifications': {
    'threads': {
      'subscription': false
    }
  },
  'gitignore': {
    'templates': false
  },
  'user': {
    'repos': false,
    'orgs': false,
    'followers': false,
    'following': false,
    'emails': false,
    'issues': false,
    'public_emails': false,
    'starred': false,
    'teams': false
  },
  'orgs': {
    'repos': false,
    'issues': false,
    'members': false,
    'events': false,
    'projects': false,
    'teams': false
  },
  'projects': {
    'columns': {
      'moves': false,
      'cards': {
        'moves': false
      }
    }
  },
  'teams': {
    'members': false,
    'memberships': false,
    'repos': false
  },
  'users': {
    'repos': false,
    'orgs': false,
    'gists': false,
    'followers': false,
    'following': false,
    'keys': false,
    'starred': false,
    'received_events': {
      'public': false
    },
    'events': {
      'public': false,
      'orgs': false
    },
    // Enterprise-only:
    'site_admin': false,
    'suspended': false
  },

  'search': {
    'repositories': false,
    'commits': false,
    'issues': false,
    'users': false,
    'code': false
  },
  'gists': {
    'public': false,
    'starred': false,
    'star': false,
    'comments': false,
    'forks': false
  },
  'repos': REPO_FIELDS
}, _defineProperty(_module$exports, 'repositories', REPO_FIELDS), _defineProperty(_module$exports, 'licenses', false), _defineProperty(_module$exports, 'authorizations', {
  'clients': false
}), _defineProperty(_module$exports, 'applications', {
  'tokens': false
}), _defineProperty(_module$exports, 'enterprise', {
  'settings': {
    'license': false
  },
  'stats': {
    'issues': false,
    'hooks': false,
    'milestones': false,
    'orgs': false,
    'comments': false,
    'pages': false,
    'users': false,
    'gists': false,
    'pulls': false,
    'repos': false,
    'all': false
  }
}), _defineProperty(_module$exports, 'staff', {
  'indexing_jobs': false
}), _defineProperty(_module$exports, 'setup', {
  'api': {
    'start': false, // POST
    'upgrade': false, // POST
    'configcheck': false, // GET
    'configure': false, // POST
    'settings': { // GET/PUT
      'authorized-keys': false // GET/POST/DELETE
    },
    'maintenance': false // GET/POST
  }
}), _module$exports);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var plus = __webpack_require__(0);

// Daisy-Chainer
// ===============================
//
// Generates the functions so `octo.repos(...).issues.comments.fetch()` works.
// Constructs a URL for the verb methods (like `.fetch` and `.create`).

module.exports = function () {
  function Chainer(_verbMethods) {
    _classCallCheck(this, Chainer);

    this._verbMethods = _verbMethods;
  }

  _createClass(Chainer, [{
    key: 'chain',
    value: function chain(path, name, contextTree, fn) {
      var _this = this;

      if (typeof fn === 'undefined' || fn === null) {
        fn = function fn() {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          if (!args.length) {
            throw new Error('BUG! must be called with at least one argument');
          }
          var separator = '/';
          // Special-case compare because its args turn into '...' instead of the usual '/'
          if (name === 'compare') {
            separator = '...';
          }
          return _this.chain(path + '/' + args.join(separator), name, contextTree);
        };
      }

      this._verbMethods.injectVerbMethods(path, fn);

      if (typeof fn === 'function' || (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) === 'object') {
        for (name in contextTree || {}) {
          (function (name) {
            // Delete the key if it already exists
            delete fn[plus.camelize(name)];

            return Object.defineProperty(fn, plus.camelize(name), {
              configurable: true,
              enumerable: true,
              get: function get() {
                return _this.chain(path + '/' + name, name, contextTree[name]);
              }
            });
          })(name);
        }
      }

      return fn;
    }
  }]);

  return Chainer;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(0),
    filter = _require.filter,
    forOwn = _require.forOwn,
    extend = _require.extend;

// When `origFn` is not passed a callback as the last argument then return a
// Promise, or error if no Promise can be found (see `plugins/promise/*` for
// some strategies for loading a Promise implementation)


var toPromise = function toPromise(orig) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var last = args[args.length - 1];
    if (typeof last === 'function') {
      // The last arg is a callback function
      args.pop();
      return orig.apply(undefined, args).then(function (v) {
        last(null, v);
      }).catch(function (err) {
        last(err);
      });
    } else if (typeof Promise !== 'undefined') {
      return orig.apply(undefined, args);
    } else {
      throw new Error('You must specify a callback or have a promise library loaded');
    }
  };
};

var VerbMethods = function () {
  function VerbMethods(plugins, _requester) {
    _classCallCheck(this, VerbMethods);

    this._requester = _requester;
    if (!this._requester) {
      throw new Error('Octokat BUG: request is required');
    }

    var promisePlugins = filter(plugins, function (_ref) {
      var promiseCreator = _ref.promiseCreator;
      return promiseCreator;
    });
    if (promisePlugins) {
      this._promisePlugin = promisePlugins[0];
    }

    this._syncVerbs = {};
    var iterable = filter(plugins, function (_ref2) {
      var verbs = _ref2.verbs;
      return verbs;
    });
    for (var i = 0; i < iterable.length; i++) {
      var plugin = iterable[i];
      extend(this._syncVerbs, plugin.verbs);
    }
    this._asyncVerbs = {};
    var iterable1 = filter(plugins, function (_ref3) {
      var asyncVerbs = _ref3.asyncVerbs;
      return asyncVerbs;
    });
    for (var j = 0; j < iterable1.length; j++) {
      var _plugin = iterable1[j];
      extend(this._asyncVerbs, _plugin.asyncVerbs);
    }
  }

  // Injects verb methods onto `obj`


  _createClass(VerbMethods, [{
    key: 'injectVerbMethods',
    value: function injectVerbMethods(path, obj) {
      var _this = this;

      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function') {
        obj.url = path; // Mostly for testing
        forOwn(this._syncVerbs, function (verbFunc, verbName) {
          obj[verbName] = function () {
            var makeRequest = function makeRequest() {
              for (var _len2 = arguments.length, originalArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                originalArgs[_key2] = arguments[_key2];
              }

              var data = void 0,
                  method = void 0,
                  options = void 0;

              var _verbFunc = verbFunc.apply(undefined, [path].concat(originalArgs));

              method = _verbFunc.method;
              path = _verbFunc.path;
              data = _verbFunc.data;
              options = _verbFunc.options;

              return _this._requester.request(method, path, data, options);
            };
            return toPromise(makeRequest).apply(undefined, arguments);
          };
        });

        forOwn(this._asyncVerbs, function (verbFunc, verbName) {
          obj[verbName] = function () {
            var makeRequest = verbFunc(_this._requester, path); // Curried function
            return toPromise(makeRequest).apply(undefined, arguments);
          };
        });
      } else {
        // console.warn('BUG: Attempted to injectVerbMethods on a ' + (typeof obj));
      }

      return obj;
    }
  }]);

  return VerbMethods;
}();

exports.VerbMethods = VerbMethods;
exports.toPromise = toPromise;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toQueryString = __webpack_require__(2);

// new class SimpleVerbs
module.exports = {
  verbs: {
    fetch: function fetch(path, query) {
      return { method: 'GET', path: '' + path + toQueryString(query) };
    },
    read: function read(path, query) {
      return { method: 'GET', path: '' + path + toQueryString(query), options: { isRaw: true } };
    },
    remove: function remove(path, data) {
      return { method: 'DELETE', path: path, data: data, options: { isBoolean: true } };
    },
    create: function create(path, data, contentType) {
      if (contentType) {
        return { method: 'POST', path: path, data: data, options: { isRaw: true, contentType: contentType } };
      } else {
        return { method: 'POST', path: path, data: data };
      }
    },
    update: function update(path, data) {
      return { method: 'PATCH', path: path, data: data };
    },
    add: function add(path, data) {
      return { method: 'PUT', path: path, data: data, options: { isBoolean: true } };
    },
    contains: function contains(path) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return { method: 'GET', path: path + '/' + args.join('/'), options: { isBoolean: true } };
    }
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var deprecate = __webpack_require__(1);
var OctokatBase = __webpack_require__(9);

var HypermediaPlugin = __webpack_require__(17);

var ALL_PLUGINS = [__webpack_require__(18), // re-chain methods when we detect an object (issue, comment, user, etc)
__webpack_require__(20), __webpack_require__(22), __webpack_require__(24), __webpack_require__(26), __webpack_require__(6), __webpack_require__(27), __webpack_require__(28),
// Run cacheHandler after PagedResults so the link headers are remembered
// but before hypermedia so the object is still serializable
__webpack_require__(29), __webpack_require__(30), HypermediaPlugin, __webpack_require__(31)];

var Octokat = function Octokat() {
  var clientOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (clientOptions.plugins == null) {
    clientOptions.plugins = ALL_PLUGINS;
  }

  if (clientOptions.disableHypermedia) {
    deprecate('Please use the clientOptions.plugins array and just do not include the hypermedia plugin');
    clientOptions.plugins = clientOptions.plugins.filter(function (plugin) {
      return plugin !== HypermediaPlugin;
    });
  }

  // HACK to propagate the Fetch implementation
  if (Octokat.Fetch) {
    OctokatBase.Fetch = Octokat.Fetch;
  }
  // the octokat instance
  var instance = new OctokatBase(clientOptions);
  return instance;
};

// module.exports = Octokat;
module.exports = Octokat;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var fetch = __webpack_require__(11);
var plus = __webpack_require__(0);
var deprecate = __webpack_require__(1);
var TREE_OPTIONS = __webpack_require__(3);
var Chainer = __webpack_require__(4);

var _require = __webpack_require__(5),
    VerbMethods = _require.VerbMethods,
    toPromise = _require.toPromise;

// Use the following plugins by default (they should be neglegible additional code)


var SimpleVerbsPlugin = __webpack_require__(6);

var Requester = __webpack_require__(15);
var applyHypermedia = __webpack_require__(16);

// Checks if a response is a Buffer or not
var isBuffer = function isBuffer(data) {
  if (typeof global['Buffer'] !== 'undefined') {
    return global['Buffer'].isBuffer(data);
  } else {
    // If `global` is not defined then we are not running inside Node so
    // the object could never be a Buffer.
    return false;
  }
};

var uncamelizeObj = function uncamelizeObj(obj) {
  if (Array.isArray(obj)) {
    return obj.map(function (i) {
      return uncamelizeObj(i);
    });
  } else if (obj === Object(obj)) {
    var o = {};
    var iterable = Object.keys(obj);
    for (var j = 0; j < iterable.length; j++) {
      var key = iterable[j];
      var value = obj[key];
      o[plus.uncamelize(key)] = uncamelizeObj(value);
    }
    return o;
  } else {
    return obj;
  }
};

var OctokatBase = function OctokatBase() {
  var clientOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var plugins = clientOptions.plugins || [SimpleVerbsPlugin];

  // TODO remove disableHypermedia
  var disableHypermedia = clientOptions.disableHypermedia;
  // set defaults

  if (typeof disableHypermedia === 'undefined' || disableHypermedia === null) {
    disableHypermedia = false;
  }

  // the octokat instance
  var instance = {};

  var fetchImpl = OctokatBase.Fetch || fetch;

  var request = function request(method, path, data) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { raw: false, isBase64: false, isBoolean: false };
    var cb = arguments[4];

    // replacer = new Replacer(request)

    // Use a slightly convoluted syntax so browserify does not include the
    // NodeJS Buffer in the browser version.
    // data is a Buffer when uploading a release asset file
    if (data && !isBuffer(data)) {
      data = uncamelizeObj(data);
    }

    // For each request, convert the JSON into Objects
    var requester = new Requester(instance, clientOptions, plugins, fetchImpl);

    return requester.request(method, path, data, options).then(function (val) {
      if ((options || {}).raw) {
        return val;
      }

      if (!disableHypermedia) {
        var context = {
          data: val,
          plugins: plugins,
          requester: requester,
          instance: instance,
          clientOptions: clientOptions
        };
        return instance._parseWithContextPromise(path, context);
      } else {
        return val;
      }
    });
  };

  var verbMethods = new VerbMethods(plugins, { request: request });
  new Chainer(verbMethods).chain('', null, TREE_OPTIONS, instance);

  // Special case for `me`
  instance.me = instance.user;

  instance.parse = function (data) {
    // The signature of toPromise has cb as the 1st arg
    var context = {
      requester: { request: request },
      plugins: plugins,
      data: data,
      instance: instance,
      clientOptions: clientOptions
    };
    return instance._parseWithContextPromise('', context);
  };

  // If not callback is provided then return a promise
  instance.parse = toPromise(instance.parse);

  instance._parseWithContextPromise = function (path, context) {
    var data = context.data;

    if (data) {
      context.url = data.url || path;
    }

    var responseMiddlewareAsyncs = plus.map(plus.filter(plugins, function (_ref) {
      var responseMiddlewareAsync = _ref.responseMiddlewareAsync;
      return responseMiddlewareAsync;
    }), function (plugin) {
      return plugin.responseMiddlewareAsync.bind(plugin);
    });

    var prev = Promise.resolve(context);
    responseMiddlewareAsyncs.forEach(function (p) {
      prev = prev.then(p);
    });
    return prev.then(function (val) {
      return val.data;
    });
  };

  // TODO remove this deprectaion too
  instance._fromUrlWithDefault = function (path, defaultFn) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    path = applyHypermedia.apply(undefined, [path].concat(args));
    verbMethods.injectVerbMethods(path, defaultFn);
    return defaultFn;
  };

  instance.fromUrl = function (path) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var defaultFn = function defaultFn() {
      deprecate('call ....fetch() explicitly instead of ...()');
      return defaultFn.fetch.apply(defaultFn, arguments);
    };

    return instance._fromUrlWithDefault.apply(instance, [path, defaultFn].concat(args));
  };

  instance._fromUrlCurried = function (path, defaultFn) {
    var fn = function fn() {
      for (var _len3 = arguments.length, templateArgs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        templateArgs[_key3] = arguments[_key3];
      }

      // This conditional logic is for the deprecated .nextPage() call
      if (defaultFn && templateArgs.length === 0) {
        return defaultFn.apply(fn);
      } else {
        return instance.fromUrl.apply(instance, [path].concat(templateArgs));
      }
    };

    if (!/\{/.test(path)) {
      verbMethods.injectVerbMethods(path, fn);
    }
    return fn;
  };

  // Add the GitHub Status API https://status.github.com/api
  instance.status = instance.fromUrl('https://status.github.com/api/status.json');
  instance.status.api = instance.fromUrl('https://status.github.com/api.json');
  instance.status.lastMessage = instance.fromUrl('https://status.github.com/api/last-message.json');
  instance.status.messages = instance.fromUrl('https://status.github.com/api/messages.json');

  return instance;
};

module.exports = OctokatBase;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (typeof window.fetch === 'function') {
  module.exports = window.fetch.bind(window);
} else {
  module.exports = function () {
    throw new Error('Octokat Error: window.fetch function not found. Either use the https://npmjs.com/package/whatwg-fetch polyfill or set Octokat.Fetch variable to be the fetch function');
  };
}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(0),
    filter = _require.filter,
    map = _require.map;

// Request Function
// ===============================
//
// Generates the actual HTTP requests to GitHub.
// Handles ETag caching, authentication headers, boolean requests, and paged results

// # Construct the request function.
// It contains all the auth credentials passed in to the client constructor

var EVENT_ID = 0; // counter for the emitter so it is easier to match up requests

module.exports = function () {
  function Requester(_instance) {
    var _clientOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var plugins = arguments[2];
    var fetchImpl = arguments[3];

    _classCallCheck(this, Requester);

    // Provide an option to override the default URL
    this._instance = _instance;
    this._clientOptions = _clientOptions;
    if (this._clientOptions.rootURL == null) {
      this._clientOptions.rootURL = 'https://api.github.com';
    }
    if (this._clientOptions.useETags == null) {
      this._clientOptions.useETags = true;
    }
    if (this._clientOptions.usePostInsteadOfPatch == null) {
      this._clientOptions.usePostInsteadOfPatch = false;
    }
    if (this._clientOptions.userAgent == null) {
      if (typeof window === 'undefined' || window === null) {
        // Set the `User-Agent` because it is required and NodeJS
        // does not send one by default.
        // See http://developer.github.com/v3/#user-agent-required
        this._clientOptions.userAgent = 'octokat.js';
      }
    }

    // These are updated whenever a request is made (optional)
    if (typeof this._clientOptions.emitter === 'function') {
      this._emit = this._clientOptions.emitter;
    }

    this._pluginMiddlewareAsync = map(filter(plugins, function (_ref) {
      var requestMiddlewareAsync = _ref.requestMiddlewareAsync;
      return requestMiddlewareAsync;
    }), function (plugin) {
      return plugin.requestMiddlewareAsync.bind(plugin);
    });
    this._plugins = plugins;
    this._fetchImpl = fetchImpl;
  }

  // HTTP Request Abstraction
  // =======
  //


  _createClass(Requester, [{
    key: 'request',
    value: function request(method, path, data) {
      var _this = this;

      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { isRaw: false, isBase64: false, isBoolean: false, contentType: 'application/json' };
      var cb = arguments[4];

      if (typeof options === 'undefined' || options === null) {
        options = {};
      }
      if (options.isRaw == null) {
        options.isRaw = false;
      }
      if (options.isBase64 == null) {
        options.isBase64 = false;
      }
      if (options.isBoolean == null) {
        options.isBoolean = false;
      }
      if (options.contentType == null) {
        options.contentType = 'application/json';
      }

      // console.log method, path, data, options, typeof cb

      // Only prefix the path when it does not begin with http.
      // This is so pagination works (which provides absolute URLs).
      if (!/^http/.test(path)) {
        path = '' + this._clientOptions.rootURL + path;
      }

      var headers = {
        'Accept': this._clientOptions.acceptHeader || 'application/json'

        // Safari/Firefox do not like setting the user-agent header
      };if (this._clientOptions.userAgent) {
        headers['User-Agent'] = this._clientOptions.userAgent;
      }

      var acc = { method: method, path: path, headers: headers, options: options, clientOptions: this._clientOptions

        // To use async.waterfall we need to pass in the initial data (`acc`)
        // so we create an initial function that just takes a callback
      };var initial = Promise.resolve(acc);

      var prev = initial;
      this._pluginMiddlewareAsync.forEach(function (p) {
        prev = prev.then(p);
      });
      return prev.then(function (acc) {
        var _acc = acc;
        method = _acc.method;
        headers = _acc.headers;


        if (options.isRaw) {
          headers['Accept'] = 'application/vnd.github.raw';
        }

        var fetchArgs = {
          // Be sure to **not** blow the cache with a random number
          // (GitHub will respond with 5xx or CORS errors)
          method: method,
          headers: headers,
          body: !options.isRaw && data && JSON.stringify(data) || data
        };

        var eventId = ++EVENT_ID;
        __guardFunc__(_this._emit, function (f) {
          return f('start', eventId, { method: method, path: path, data: data, options: options });
        });

        return _this._fetchImpl(path, fetchArgs).then(function (response) {
          var jqXHR = response;

          // Fire listeners when the request completes or fails
          if (_this._emit) {
            if (response.headers.get('X-RateLimit-Limit')) {
              var rateLimit = parseFloat(response.headers.get('X-RateLimit-Limit'));
              var rateLimitRemaining = parseFloat(response.headers.get('X-RateLimit-Remaining'));
              var rateLimitReset = parseFloat(response.headers.get('X-RateLimit-Reset'));
              // Reset time is in seconds, not milliseconds
              // if rateLimitReset
              //   rateLimitReset = new Date(rateLimitReset * 1000)

              var emitterRate = {
                remaining: rateLimitRemaining,
                limit: rateLimit,
                reset: rateLimitReset
              };

              if (response.headers.get('X-OAuth-Scopes')) {
                emitterRate.scopes = response.headers.get('X-OAuth-Scopes').split(', ');
              }
            }
            _this._emit('end', eventId, { method: method, path: path, data: data, options: options }, response.status, emitterRate);
          }

          // Return the result and Base64 encode it if `options.isBase64` flag is set.

          // Respond with the redirect URL (for archive links)
          // TODO: implement a `followRedirects` plugin
          if (response.status === 302) {
            return response.headers.get('Location');
          } else if (options.isBoolean && response.status === 204) {
            // If the request is a boolean yes/no question GitHub will indicate
            // via the HTTP Status of 204 (No Content) or 404 instead of a 200.
            return true;
          } else if (options.isBoolean && response.status === 404) {
            return false;
            // } else if (options.isBoolean) {
            //   throw new Error(`Octokat Bug? got a response to a boolean question that was not 204 or 404.  ${fetchArgs.method} ${path} Status: ${response.status}`)
          } else if (response.status >= 200 && response.status < 300 || response.status === 304 || response.status === 302 || response.status === 0) {
            // If it was a boolean question and the server responded with 204 ignore.
            var dataPromise = void 0;

            // If the status was 304 then let the cache handler pick it up. leave data blank
            if (response.status === 304) {
              dataPromise = Promise.resolve(null);
            } else {
              // TODO: use a blob if we are expecting a binary

              var contentType = response.headers.get('content-type') || '';

              // Use .indexOf instead of .startsWith because PhantomJS does not support .startsWith
              if (contentType.indexOf('application/json') === 0) {
                dataPromise = response.json();
              } else {
                // Other contentTypes:
                // - 'text/plain'
                // - 'application/octocat-stream'
                // - 'application/vnd.github.raw'
                dataPromise = response.text();
              }
            }

            return dataPromise.then(function (data) {
              acc = {
                clientOptions: _this._clientOptions,
                plugins: _this._plugins,
                data: data,
                options: options,
                jqXHR: jqXHR, // for cacheHandler
                status: response.status, // cacheHandler changes this
                request: acc, // Include the request data for plugins like cacheHandler
                requester: _this, // for Hypermedia to generate verb methods
                instance: _this._instance // for Hypermedia to be able to call `.fromUrl`
              };
              return _this._instance._parseWithContextPromise('', acc);
            });
          } else {
            return response.text().then(function (text) {
              return Promise.reject(new Error(text + ' ' + fetchArgs.method + ' ' + path + ' Status: ' + response.status));
            });
          }
        });
      });
    }
  }]);

  return Requester;
}();

function __guardFunc__(func, transform) {
  return typeof func === 'function' ? transform(func) : undefined;
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toQueryString = __webpack_require__(2);
var deprecate = __webpack_require__(1);

module.exports = function (url) {
  // Deprecated interface. Use an Object to specify the args in the template.
  // the order of fields in the template should not matter.
  var m = void 0;
  if ((arguments.length <= 1 ? 0 : arguments.length - 1) === 0) {
    var templateParams = {};
  } else {
    if ((arguments.length <= 1 ? 0 : arguments.length - 1) > 1) {
      deprecate('When filling in a template URL pass all the field to fill in 1 object instead of comma-separated args');
    }

    var templateParams = arguments.length <= 1 ? undefined : arguments[1];
  }

  // url can contain {name} or {/name} in the URL.
  // for every arg passed in, replace {...} with that arg
  // and remove the rest (they may or may not be optional)
  var i = 0;
  while (m = /(\{[^\}]+\})/.exec(url)) {
    // `match` is something like `{/foo}` or `{?foo,bar}` or `{foo}` (last one means it is required)
    var match = m[1];
    var param = '';
    // replace it
    switch (match[1]) {
      case '/':
        var fieldName = match.slice(2, match.length - 1); // omit the braces and the slash
        var fieldValue = templateParams[fieldName];
        if (fieldValue) {
          if (/\//.test(fieldValue)) {
            throw new Error('Octokat Error: this field must not contain slashes: ' + fieldName);
          }
          param = '/' + fieldValue;
        }
        break;
      case '+':
        fieldName = match.slice(2, match.length - 1); // omit the braces and the `+`
        fieldValue = templateParams[fieldName];
        if (fieldValue) {
          param = fieldValue;
        }
        break;
      case '?':
        // Strip off the "{?" and the trailing "}"
        // For example, the URL is `/assets{?name,label}`
        //   which turns into `/assets?name=foo.zip`
        // Used to upload releases via the repo releases API.
        //
        // When match contains `,` or
        // `args.length is 1` and args[0] is object match the args to those in the template
        var optionalNames = match.slice(2, -2 + 1).split(','); // omit the braces and the `?` before splitting
        var optionalParams = {};
        for (var j = 0; j < optionalNames.length; j++) {
          fieldName = optionalNames[j];
          optionalParams[fieldName] = templateParams[fieldName];
        }
        param = toQueryString(optionalParams);
        break;
      case '&':
        optionalNames = match.slice(2, -2 + 1).split(','); // omit the braces and the `?` before splitting
        optionalParams = {};
        for (var k = 0; k < optionalNames.length; k++) {
          fieldName = optionalNames[k];
          optionalParams[fieldName] = templateParams[fieldName];
        }
        param = toQueryString(optionalParams, true); // true means omitQuestionMark
        break;

      default:
        // This is a required field. ie `{repoName}`
        fieldName = match.slice(1, match.length - 1); // omit the braces
        if (templateParams[fieldName]) {
          param = templateParams[fieldName];
        } else {
          throw new Error('Octokat Error: Required parameter is missing: ' + fieldName);
        }
    }

    url = url.replace(match, param);
    i++;
  }

  return url;
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var deprecate = __webpack_require__(1);

module.exports = new (function () {
  function HyperMedia() {
    _classCallCheck(this, HyperMedia);
  }

  _createClass(HyperMedia, [{
    key: 'replace',
    value: function replace(instance, data) {
      if (Array.isArray(data)) {
        return this._replaceArray(instance, data);
      } else if (typeof data === 'function') {
        return data;
      } else if (data instanceof Date) {
        return data;
      } else if (data === Object(data)) {
        return this._replaceObject(instance, data);
      } else {
        return data;
      }
    }
  }, {
    key: '_replaceObject',
    value: function _replaceObject(instance, orig) {
      var acc = {};
      var iterable = Object.keys(orig);
      for (var i = 0; i < iterable.length; i++) {
        var key = iterable[i];
        var value = orig[key];
        this._replaceKeyValue(instance, acc, key, value);
      }

      return acc;
    }
  }, {
    key: '_replaceArray',
    value: function _replaceArray(instance, orig) {
      var _this = this;

      var arr = orig.map(function (item) {
        return _this.replace(instance, item);
      });
      // Convert the nextPage methods for paged results
      var iterable = Object.keys(orig);
      for (var i = 0; i < iterable.length; i++) {
        var key = iterable[i];
        var value = orig[key];
        this._replaceKeyValue(instance, arr, key, value);
      }
      return arr;
    }

    // Convert things that end in `_url` to methods which return a Promise

  }, {
    key: '_replaceKeyValue',
    value: function _replaceKeyValue(instance, acc, key, value) {
      if (/_url$/.test(key)) {
        if (/^upload_url$/.test(key)) {
          // POST https://<upload_url>/repos/:owner/:repo/releases/:id/assets?name=foo.zip
          var defaultFn = function defaultFn() {
            // TODO: Maybe always set isRaw=true when contentType is provided
            deprecate('call .upload({name, label}).create(data, contentType)' + ' instead of .upload(name, data, contentType)');
            return defaultFn.create.apply(defaultFn, arguments);
          };

          var fn = function fn() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return instance._fromUrlWithDefault.apply(instance, [value, defaultFn].concat(args))();
          };
        } else {
          var defaultFn = function defaultFn() {
            deprecate('instead of directly calling methods like .nextPage(), use .nextPage.fetch()');
            return this.fetch();
          };
          var fn = instance._fromUrlCurried(value, defaultFn);
        }

        var newKey = key.substring(0, key.length - '_url'.length);
        acc[newKey] = fn;
        // add a camelCase URL field for retrieving non-templated URLs
        // like `avatarUrl` and `htmlUrl`
        if (!/\{/.test(value)) {
          return acc[key] = value;
        }
      } else if (/_at$/.test(key)) {
        // Ignore null dates so we do not get `Wed Dec 31 1969`
        return acc[key] = value ? new Date(value) : null;
      } else {
        return acc[key] = this.replace(instance, value);
      }
    }
  }, {
    key: 'responseMiddlewareAsync',
    value: function responseMiddlewareAsync(input) {
      var instance = input.instance,
          data = input.data;

      data = this.replace(instance, data);
      input.data = data; // or throw new Error('BUG! Expected JSON data to exist')
      return Promise.resolve(input);
    }
  }]);

  return HyperMedia;
}())();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OBJECT_MATCHER = __webpack_require__(19);
var TREE_OPTIONS = __webpack_require__(3);

var _require = __webpack_require__(5),
    VerbMethods = _require.VerbMethods;

var Chainer = __webpack_require__(4);

module.exports = new (function () {
  function ObjectChainer() {
    _classCallCheck(this, ObjectChainer);
  }

  _createClass(ObjectChainer, [{
    key: 'chainChildren',
    value: function chainChildren(chainer, url, obj) {
      return function () {
        var result = [];
        for (var key in OBJECT_MATCHER) {
          var re = OBJECT_MATCHER[key];
          var item = void 0;
          if (re.test(obj.url)) {
            var context = TREE_OPTIONS;
            var iterable = key.split('.');
            for (var i = 0; i < iterable.length; i++) {
              var k = iterable[i];
              context = context[k];
            }
            item = chainer.chain(url, k, context, obj);
          }
          result.push(item);
        }
        return result;
      }();
    }
  }, {
    key: 'responseMiddlewareAsync',
    value: function responseMiddlewareAsync(input) {
      var plugins = input.plugins,
          requester = input.requester,
          data = input.data,
          url = input.url;
      // unless data
      //    throw new Error('BUG! Expected JSON data to exist')

      var verbMethods = new VerbMethods(plugins, requester);
      var chainer = new Chainer(verbMethods);
      if (url) {
        chainer.chain(url, true, {}, data);
        this.chainChildren(chainer, url, data);
      } else {
        chainer.chain('', null, {}, data);
        // For the paged results, rechain all children in the array
        if (Array.isArray(data)) {
          for (var i = 0; i < data.length; i++) {
            var datum = data[i];
            this.chainChildren(chainer, datum.url, datum);
          }
        }
      }

      return Promise.resolve(input);
    }
  }]);

  return ObjectChainer;
}())();

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Generated by CoffeeScript 1.12.7
(function () {
  module.exports = {
    'repos': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/(repos(\/[^\/]+){2}|repositories\/([0-9]+))$/,
    'gists': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/gists\/[^\/]+$/,
    'issues': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/(repos(\/[^\/]+){2}|repositories\/([0-9]+))\/(issues|pulls)\/[^\/]+$/,
    'users': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/users\/[^\/]+$/,
    'orgs': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/orgs\/[^\/]+$/,
    'teams': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/teams\/[^\/]+$/,
    'repos.comments': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/repos\/[^\/]+\/[^\/]+\/comments\/[^\/]+$/
  };
}).call(undefined);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL_VALIDATOR = __webpack_require__(21);

module.exports = new (function () {
  function PathValidator() {
    _classCallCheck(this, PathValidator);
  }

  _createClass(PathValidator, [{
    key: 'requestMiddlewareAsync',
    value: function requestMiddlewareAsync(input) {
      var path = input.path;

      if (!URL_VALIDATOR.test(path)) {
        var err = 'Octokat BUG: Invalid Path. If this is actually a valid path then please update the URL_VALIDATOR. path=' + path;
        console.warn(err);
      }
      return Promise.resolve(input);
    }
  }]);

  return PathValidator;
}())();

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Generated by CoffeeScript 1.12.7
(function () {
  module.exports = /^(https:\/\/status.github.com\/api\/(status.json|last-message.json|messages.json)$)|(https?:\/\/[^\/]+)?(\/api\/v3)?\/(zen|octocat|users|issues|gists|emojis|markdown|meta|rate_limit|feeds|events|repositories(\/\d+)?|notifications|notifications\/threads(\/[^\/]+)|notifications\/threads(\/[^\/]+)\/subscription|gitignore\/templates(\/[^\/]+)?|user(\/\d+)?|user(\/\d+)?\/(|repos|orgs|followers|following(\/[^\/]+)?|emails(\/[^\/]+)?|issues|public_emails|starred|starred(\/[^\/]+){2}|teams)|(orgs\/[^\/]+)|((organizations)(\/\d+)?)|(orgs\/[^\/]+)|(organizations\/\d+)\/(repos|issues|members|events|teams|projects)|projects\/[0-9]+|projects\/[0-9]+\/columns|projects\/columns\/[0-9]+|projects\/columns\/[0-9]+\/moves|projects\/columns\/[0-9]+\/cards|projects\/columns\/cards\/[0-9]+|projects\/columns\/cards\/[0-9]+\/moves|teams\/[^\/]+|teams\/[^\/]+\/(members(\/[^\/]+)?|memberships\/[^\/]+|repos|repos(\/[^\/]+){2})|users\/[^\/]+|users\/[^\/]+\/(repos|orgs|gists|followers|following(\/[^\/]+){0,2}|keys|starred|received_events(\/public)?|events(\/public)?|events\/orgs\/[^\/]+)|search\/(repositories|commits|issues|users|code)|gists\/(public|starred|([a-f0-9]{20,32}|[0-9]+)|([a-f0-9]{20,32}|[0-9]+)\/forks|([a-f0-9]{20,32}|[0-9]+)\/comments(\/[0-9]+)?|([a-f0-9]{20,32}|[0-9]+)\/star)|repos(\/[^\/]+){2}|(repos(\/[^\/]+){2}|repositories\/([0-9]+))\/(readme|tarball(\/[^\/]+)?|zipball(\/[^\/]+)?|compare\/([^\.{3}]+)\.{3}([^\.{3}]+)|deployments(\/[0-9]+)?|deployments\/[0-9]+\/statuses(\/[0-9]+)?|hooks|hooks\/[^\/]+|hooks\/[^\/]+\/tests|assignees|languages|teams|tags|branches(\/[^\/]+){0,2}|contributors|subscribers|subscription|stargazers|comments(\/[0-9]+)?|downloads(\/[0-9]+)?|forks|milestones|milestones\/[0-9]+|milestones\/[0-9]+\/labels|labels(\/[^\/]+)?|releases|releases\/([0-9]+)|releases\/([0-9]+)\/assets|releases\/latest|releases\/tags\/([^\/]+)|releases\/assets\/([0-9]+)|events|notifications|merges|statuses\/[a-f0-9]{40}|pages|pages\/builds|pages\/builds\/latest|commits|commits\/[a-f0-9]{40}|commits\/[a-f0-9]{40}\/(comments|status|statuses)?|contents\/|contents(\/[^\/]+)*|collaborators(\/[^\/]+)?|collaborators\/([^\/]+)\/permission|projects|(issues|pulls)|(issues|pulls)\/(events|events\/[0-9]+|comments(\/[0-9]+)?|[0-9]+|[0-9]+\/events|[0-9]+\/comments|[0-9]+\/labels(\/[^\/]+)?)|pulls\/[0-9]+\/(files|commits|merge|requested_reviewers|reviews(\/[0-9]+)?|reviews(\/[0-9]+)\/(comments|events|dismissals))|git\/(refs|refs\/(.+|heads(\/[^\/]+)?|tags(\/[^\/]+)?)|trees(\/[^\/]+)?|blobs(\/[a-f0-9]{40}$)?|commits(\/[a-f0-9]{40}$)?)|stats\/(contributors|commit_activity|code_frequency|participation|punch_card)|traffic\/(popular\/(referrers|paths)|views|clones))|licenses|licenses\/([^\/]+)|authorizations|authorizations\/((\d+)|clients\/([^\/]{20})|clients\/([^\/]{20})\/([^\/]+))|applications\/([^\/]{20})\/tokens|applications\/([^\/]{20})\/tokens\/([^\/]+)|enterprise\/(settings\/license|stats\/(issues|hooks|milestones|orgs|comments|pages|users|gists|pulls|repos|all))|staff\/indexing_jobs|users\/[^\/]+\/(site_admin|suspended)|setup\/api\/(start|upgrade|configcheck|configure|settings(authorized-keys)?|maintenance))(\?.*)?$/;
}).call(undefined);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var base64encode = __webpack_require__(23);

module.exports = new (function () {
  function Authorization() {
    _classCallCheck(this, Authorization);
  }

  _createClass(Authorization, [{
    key: 'requestMiddlewareAsync',
    value: function requestMiddlewareAsync(input) {
      if (input.headers == null) {
        input.headers = {};
      }
      var headers = input.headers,
          _input$clientOptions = input.clientOptions,
          token = _input$clientOptions.token,
          username = _input$clientOptions.username,
          password = _input$clientOptions.password;

      if (token || username && password) {
        if (token) {
          var auth = 'token ' + token;
        } else {
          var auth = 'Basic ' + base64encode(username + ':' + password);
        }
        input.headers['Authorization'] = auth;
      }
      return Promise.resolve(input);
    }
  }]);

  return Authorization;
}())();

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = btoa;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PREVIEW_HEADERS = __webpack_require__(25);

var DEFAULT_HEADER = function DEFAULT_HEADER(url) {
  for (var key in PREVIEW_HEADERS) {
    var val = PREVIEW_HEADERS[key];
    if (val.test(url)) {
      return key;
    }
  }
};

// Use the preview API header if one of the routes match the preview APIs
module.exports = new (function () {
  function PreviewApis() {
    _classCallCheck(this, PreviewApis);
  }

  _createClass(PreviewApis, [{
    key: 'requestMiddlewareAsync',
    value: function requestMiddlewareAsync(input) {
      var path = input.path;

      var acceptHeader = DEFAULT_HEADER(path);
      if (acceptHeader) {
        input.headers['Accept'] = acceptHeader;
      }

      return Promise.resolve(input);
    }
  }]);

  return PreviewApis;
}())();

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Generated by CoffeeScript 1.12.7
(function () {
  module.exports = {
    'application/vnd.github.drax-preview+json': /^(https?:\/\/[^\/]+)?(\/api\/v3)?(\/licenses|\/licenses\/([^\/]+)|\/repos\/([^\/]+)\/([^\/]+))$/,
    'application/vnd.github.v3.star+json': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/users\/([^\/]+)\/starred$/,
    'application/vnd.github.cloak-preview+json': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/search\/commits$/,
    'application/vnd.github.black-cat-preview+json': /^(https?:\/\/[^\/]+)?(\/api\/v3)?\/repos(\/[^\/]+){2}\/pulls\/[0-9]+\/(|requested_reviewers|reviews(\/[0-9]+)?|reviews(\/[0-9]+)\/(comments|events|dismissals))$/,
    'application/vnd.github.inertia-preview+json': /^(https?:\/\/[^\/]+)?(\/api\/v3)?(\/repos(\/[^\/]+){2}\/projects|\/orgs\/([^\/]+)\/projects|\/projects\/([0-9]+|[0-9]+\/columns|columns|columns\/[0-9]+|columns\/[0-9]+\/moves|columns\/[0-9]+\/cards|columns\/cards\/[0-9]+|columns\/cards\/[0-9]+\/moves))$/
  };
}).call(undefined);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = new (function () {
  function UsePostInsteadOfPatch() {
    _classCallCheck(this, UsePostInsteadOfPatch);
  }

  _createClass(UsePostInsteadOfPatch, [{
    key: 'requestMiddlewareAsync',
    value: function requestMiddlewareAsync(input, cb) {
      var usePostInsteadOfPatch = input.clientOptions.usePostInsteadOfPatch,
          method = input.method;

      if (usePostInsteadOfPatch && method === 'PATCH') {
        input.method = 'POST';
      }
      return Promise.resolve(input);
    }
  }]);

  return UsePostInsteadOfPatch;
}())();

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toQueryString = __webpack_require__(2);

var pushAll = function pushAll(target, source) {
  if (!Array.isArray(source)) {
    throw new Error('Octokat Error: Calling fetchAll on a request that does not yield an array');
  }
  return target.push.apply(target, source);
};

var getMore = function getMore(fetchable, requester, acc) {
  var nextPagePromise = fetchNextPage(fetchable, requester);
  if (nextPagePromise) {
    return nextPagePromise.then(function (results) {
      pushAll(acc, results.items);
      // TODO: handle `items.next_page = string/function`, `items.nextPage = string/function`
      return getMore(results, requester, acc);
    });
  } else {
    return acc;
  }
};

// TODO: HACK to handle camelCase and hypermedia plugins
var fetchNextPage = function fetchNextPage(obj, requester) {
  if (typeof obj.next_page_url === 'string') {
    return requester.request('GET', obj.next_page_url, null, null);
  } else if (obj.next_page) {
    return obj.next_page.fetch();
  } else if (typeof obj.nextPageUrl === 'string') {
    return requester.request('GET', obj.nextPageUrl, null, null);
  } else if (obj.nextPage) {
    return obj.nextPage.fetch();
  } else {
    return false;
  }
};

// new class FetchAll
module.exports = {
  asyncVerbs: {
    fetchAll: function fetchAll(requester, path) {
      return function (query) {
        // TODO: Pass in the instance so we can just call fromUrl maybe? and we don't rely on hypermedia to create nextPage
        return requester.request('GET', '' + path + toQueryString(query), null, null).then(function (results) {
          var acc = [];
          pushAll(acc, results.items);
          // TODO: handle `items.next_page = string/function`, `items.nextPage = string/function`
          return getMore(results, requester, acc);
        });
      };
    }
  }
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = new (function () {
  function Pagination() {
    _classCallCheck(this, Pagination);
  }

  _createClass(Pagination, [{
    key: 'responseMiddlewareAsync',
    value: function responseMiddlewareAsync(input) {
      var jqXHR = input.jqXHR,
          data = input.data;

      if (!jqXHR) {
        return Promise.resolve(input);
      } // The plugins are all used in `octo.parse()` which does not have a jqXHR

      // Only JSON responses have next/prev/first/last link headers
      // Add them to data so the resolved value is iterable

      if (Array.isArray(data)) {
        data = { items: data.slice() // Convert to object so we can add the next/prev/first/last link headers

          // Parse the Link headers
          // of the form `<http://a.com>; rel="next", <https://b.com?a=b&c=d>; rel="previous"`
        };var linksHeader = jqXHR.headers.get('Link');
        if (linksHeader) {
          linksHeader.split(',').forEach(function (part) {
            var _part$match = part.match(/<([^>]+)>; rel="([^"]+)"/),
                _part$match2 = _slicedToArray(_part$match, 3),
                unusedField = _part$match2[0],
                href = _part$match2[1],
                rel = _part$match2[2];
            // Add the pagination functions on the JSON since Promises resolve one value
            // Name the functions `nextPage`, `previousPage`, `firstPage`, `lastPage`


            data[rel + '_page_url'] = href;
          });
        }
        input.data = data; // or throw new Error('BUG! Expected JSON data to exist')
      }
      return Promise.resolve(input);
    }
  }]);

  return Pagination;
}())();

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = new (function () {
  function CacheHandler() {
    _classCallCheck(this, CacheHandler);

    this._cachedETags = {};
  }

  // Default cacheHandler methods


  _createClass(CacheHandler, [{
    key: 'get',
    value: function get(method, path) {
      return this._cachedETags[method + ' ' + path];
    }
  }, {
    key: 'add',
    value: function add(method, path, eTag, data, status) {
      return this._cachedETags[method + ' ' + path] = { eTag: eTag, data: data, status: status };
    }
  }, {
    key: 'requestMiddlewareAsync',
    value: function requestMiddlewareAsync(input) {
      var clientOptions = input.clientOptions,
          method = input.method,
          path = input.path;

      if (input.headers == null) {
        input.headers = {};
      }
      var cacheHandler = clientOptions.cacheHandler || this;
      // Send the ETag if re-requesting a URL
      if (cacheHandler.get(method, path)) {
        input.headers['If-None-Match'] = cacheHandler.get(method, path).eTag;
      } else {
        // The browser will sneak in a 'If-Modified-Since' header if the GET has been requested before
        // but for some reason the cached response does not seem to be available
        // in the jqXHR object.
        // So, the first time a URL is requested set this date to 0 so we always get a response the 1st time
        // a URL is requested.
        input.headers['If-Modified-Since'] = 'Thu, 01 Jan 1970 00:00:00 GMT';
      }

      return Promise.resolve(input);
    }
  }, {
    key: 'responseMiddlewareAsync',
    value: function responseMiddlewareAsync(input, cb) {
      var clientOptions = input.clientOptions,
          request = input.request,
          status = input.status,
          jqXHR = input.jqXHR,
          data = input.data;

      if (!jqXHR) {
        return Promise.resolve(input);
      } // The plugins are all used in `octo.parse()` which does not have a jqXHR

      // Since this can be called via `octo.parse`, skip caching when there is no jqXHR
      if (jqXHR) {
        var method = request.method,
            path = request.path; // This is also not defined when octo.parse is called

        var cacheHandler = clientOptions.cacheHandler || this;
        if (status === 304 || status === 0) {
          var ref = cacheHandler.get(method, path);
          if (ref) {
            var eTag;

            // Set a flag on the object so users know this is a cached response
            // if (typeof data !== 'string') {
            //   data.__IS_CACHED = eTag || true
            // }
            data = ref.data;
            status = ref.status;
            eTag = ref.eTag;
          } else {
            throw new Error('ERROR: Bug in Octokat cacheHandler for path \'' + method + ' ' + path + '\'. It had an eTag but not the cached response.');
          }
        } else {
          // Cache the response to reuse later
          if (method === 'GET' && jqXHR.headers.get('ETag')) {
            var eTag = jqXHR.headers.get('ETag');
            cacheHandler.add(method, path, eTag, data, jqXHR.status);
          }
        }

        input.data = data;
        input.status = status;
        return Promise.resolve(input);
      }
    }
  }]);

  return CacheHandler;
}())();

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var toQueryString = __webpack_require__(2);

module.exports = new (function () {
  function ReadBinary() {
    _classCallCheck(this, ReadBinary);

    this.verbs = {
      readBinary: function readBinary(path, query) {
        return { method: 'GET', path: '' + path + toQueryString(query), options: { isRaw: true, isBase64: true } };
      }
    };
  }

  _createClass(ReadBinary, [{
    key: 'requestMiddlewareAsync',
    value: function requestMiddlewareAsync(input) {
      var options = input.options;

      if (options) {
        var isBase64 = options.isBase64;

        if (isBase64) {
          input.headers['Accept'] = 'application/vnd.github.raw';
          input.mimeType = 'text/plain; charset=x-user-defined';
        }
      }
      return Promise.resolve(input);
    }
  }, {
    key: 'responseMiddlewareAsync',
    value: function responseMiddlewareAsync(input) {
      var options = input.options,
          data = input.data;

      if (options) {
        var isBase64 = options.isBase64;
        // Convert the response to a Base64 encoded string

        if (isBase64) {
          // Convert raw data to binary chopping off the higher-order bytes in each char.
          // Useful for Base64 encoding.
          var converted = '';
          var iterable = __range__(0, data.length, false);
          for (var j = 0; j < iterable.length; j++) {
            var i = iterable[j];
            converted += String.fromCharCode(data.charCodeAt(i) & 0xff);
          }

          input.data = converted; // or throw new Error('BUG! Expected JSON data to exist')
        }
      }
      return Promise.resolve(input);
    }
  }]);

  return ReadBinary;
}())();

function __range__(left, right, inclusive) {
  var range = [];
  var ascending = left < right;
  var end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (var i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }
  return range;
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var plus = __webpack_require__(0);

module.exports = new (function () {
  function CamelCase() {
    _classCallCheck(this, CamelCase);
  }

  _createClass(CamelCase, [{
    key: 'responseMiddlewareAsync',
    value: function responseMiddlewareAsync(input) {
      var data = input.data;

      data = this.replace(data);
      input.data = data; // or throw new Error('BUG! Expected JSON data to exist')
      return Promise.resolve(input);
    }
  }, {
    key: 'replace',
    value: function replace(data) {
      if (Array.isArray(data)) {
        return this._replaceArray(data);
      } else if (typeof data === 'function') {
        return data;
      } else if (data instanceof Date) {
        return data;
      } else if (data === Object(data)) {
        return this._replaceObject(data);
      } else {
        return data;
      }
    }
  }, {
    key: '_replaceObject',
    value: function _replaceObject(orig) {
      var acc = {};
      var iterable = Object.keys(orig);
      for (var i = 0; i < iterable.length; i++) {
        var key = iterable[i];
        var value = orig[key];
        this._replaceKeyValue(acc, key, value);
      }

      return acc;
    }
  }, {
    key: '_replaceArray',
    value: function _replaceArray(orig) {
      var _this = this;

      var arr = orig.map(function (item) {
        return _this.replace(item);
      });
      // Convert the nextPage methods for paged results
      var iterable = Object.keys(orig);
      for (var i = 0; i < iterable.length; i++) {
        var key = iterable[i];
        var value = orig[key];
        this._replaceKeyValue(arr, key, value);
      }
      return arr;
    }

    // Convert things that end in `_url` to methods which return a Promise

  }, {
    key: '_replaceKeyValue',
    value: function _replaceKeyValue(acc, key, value) {
      return acc[plus.camelize(key)] = this.replace(value);
    }
  }]);

  return CamelCase;
}())();

/***/ })
/******/ ]);
});