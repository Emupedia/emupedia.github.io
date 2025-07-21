// noinspection ThisExpressionReferencesGlobalObjectJS,JSUnusedLocalSymbols,DuplicatedCode

(function(global) {
	/*console.log('╔═╗╔╦╗╦ ╦╔═╗╔═╗\n' +
				  '╠═ ║║║║ ║║ ║╚═╗\n' +
				  '╚═╝╩ ╩╚═╝╚═╝╚═╝');*/

	global.GoogleAnalyticsObject = '__ga__';
	global.__ga__ = function() {
		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];

			// noinspection JSUnresolvedVariable
			if (arg.constructor === Object && arg.hitCallback) {
				arg.hitCallback();
			}
		}
	};
	global.__ga__.q = [['create', 'UA-47896346-6', 'auto']];
	global.__ga__.l = Date.now();

	// noinspection JSUnusedLocalSymbols,DuplicatedCode
	define('optional', [], {
		load: function(name, req, onload, config) {
			var onLoadSuccess = function(moduleInstance) {
				onload(moduleInstance);
			};

			var onLoadFailure = function(err) {
				var failedId = err.requireModules && err.requireModules[0];
				global.console.warn('Could not load optional module: ' + failedId);

				requirejs.undef(failedId);

				// noinspection JSRedundantSwitchStatement
				switch (failedId) {
					default:
						define(failedId, [], function(){return {};});
						break;
				}

				req([failedId], onLoadSuccess);
			};

			req([name], onLoadSuccess, onLoadFailure);
		},
		normalize: function (name, normalize) {
			return normalize(name);
		}
	});

	// noinspection JSFileReferences
	requirejs.config({
		paths: $sys.lib,
		shim: {
			clippy: {
				exports: 'clippy',
				deps: ['jquery']
			},
			desktop: {
				deps: ['window', 'lang', 'jquery-ui-contextmenu']
			},
			chat: {
				deps: ['jquery', 'simplestorage', 'fingerprint', 'network']
			},
			emuos: {
				deps: ['desktop', 'filesystem']
			},
			esheep: {
				exports: 'eSheep'
			},
			filesystem: {
				deps: ['jquery-ajax-retry', 'jsrsasign-all', 'octokat']
			},
			fingerprint: {
				exports: 'FingerprintJS'
			},
			ga: {
				exports: '__ga__'
			},
			'jquery': {
				exports: 'jQuery'
			},
			'jquery-mousewheel': {
				deps: ['jquery']
			},
			'jquery-ui': {
				deps: ['jquery']
			},
			'jquery-ui-contextmenu': {
				deps: ['jquery-ui']
			},
			'jquery-ui-tree': {
				deps: ['jquery-ui']
			},
			'jquery-customscrollbar': {
				deps: ['jquery-mousewheel']
			},
			'jsrsasign-all': {
				exports: 'KJUR'
			},
			'lang-en': {
				deps: ['taskbar']
			},
			network: {
				deps: ['socket']
			},
			'moment-timezone': {
				exports: 'moment',
				deps: ['moment']
			},
			octokat: {
				deps: ['promise-auto', 'fetch']
			},
			socket: {
				deps: ['bson']
			},
			taskbar: {
				deps: ['jquery-ui']
			},
			toastr: {
				deps: ['jquery']
			},
			twemoji: {
				exports: 'twemoji'
			},
			window: {
				deps: ['taskbar']
			}
		},
		map: {
			'*': {
				lang: 'lang-en',
				json: 'requirejs-json',
				text: 'requirejs-text'
			}
		}
	});

	// noinspection JSCheckFunctionSignatures,JSUnusedLocalSymbols
	requirejs([
		'jquery',
		'json!../data/desktop.json',
		'filesystem',
		'network',
		'emuos',
		'optional!ga'
	], function($, desktop, FileSystem, Network, EmuOS, ga) {
		$(function() {
			if (typeof ga === 'function') {
				ga('send', {
					hitType: 'pageview',
					page: global.location.pathname,
					title: global.location.href
				});
			}

			// noinspection JSUnusedLocalSymbols
			new EmuOS({
				filesystem: FileSystem,
				network: Network,
				theme: 'theme-windows-me',
				icons: desktop.icons
			});
		});
	});
}(this));