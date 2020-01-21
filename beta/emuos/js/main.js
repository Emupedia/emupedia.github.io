// noinspection ThisExpressionReferencesGlobalObjectJS,JSUnusedLocalSymbols,DuplicatedCode
(function(global) {
	console.log('╔═╗╔╦╗╦ ╦╔═╗╔═╗╔╦═╗╦╔═╗\n' +
				'╠═ ║║║║ ║╠═╝╠═  ║ ║║╠═╣\n' +
				'╚═╝╩ ╩╚═╝╩  ╚═╝═╩═╝╩╩ ╩');

	window.GoogleAnalyticsObject = '__ga__';
	window.__ga__ = function() {
		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];

			if (arg.constructor === Object && arg.hitCallback) {
				arg.hitCallback();
			}
		}
	};
	window.__ga__.q = [['create', 'UA-47896346-6', 'auto']];
	window.__ga__.l = Date.now();

	// noinspection JSUnusedLocalSymbols,DuplicatedCode
	define('optional', [], {
		load: function(name, req, onload, config) {
			var onLoadSuccess = function(moduleInstance) {
				onload(moduleInstance);
			};

			var onLoadFailure = function(err) {
				var failedId = err.requireModules && err.requireModules[0];
				console.warn('Could not load optional module: ' + failedId);

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
		urlArgs: 'rand=' + (new Date()).getTime(),
		waitSeconds: 300,
		paths: {
			browserfs: 'libraries/browserfs-1.4.3.min',
			clippy: 'libraries/clippy-0.0.3',
			desktop: 'desktop',
			dropbox: 'libraries/dropbox-4.0.30.min',
			emoticons: 'emoticons',
			emuos: 'emuos',
			es3base64: 'polyfills/es3-base64-1.0.1.min',
			es6promise: 'polyfills/es6-promise-auto-4.2.8.min',
			es6fetch: 'polyfills/es6-fetch-3.0.0',
			esheep: 'libraries/esheep-0.7.2.min',
			filesystem: 'filesystem',
			fingerprint: 'libraries/fingerprint-0.5.3',
			ga: ['//www.google-analytics.com/analytics', 'data:application/javascript,'],
			jquery: 'libraries/jquery-2.2.4.min',
			jquerymousewheel: 'libraries/jquery-mousewheel-3.1.13',
			jqueryui: 'libraries/jquery-ui-1.11.4.min',
			jqueryuicontextmenu: 'libraries/jquery-ui-contextmenu-1.18.1.min',
			jqueryuitree: 'libraries/jquery-ui-tree-3.0.0.min',
			jquerycustomscrollbar: 'libraries/jquery-customscrollbar-3.1.5.min',
			jqyeryajaxretry: 'libraries/jquery-ajax-retry-0.2.8.min',
			json: 'libraries/requirejs-json-1.0.3',
			jsrsasign: 'libraries/jsrsasign-all-8.0.12.min',
			lang: 'lang-en',
			moment: 'libraries/moment-2.24.0.min',
			'moment-timezone': 'libraries/moment-timezone-0.5.27.min',
			network: 'network',
			chat: 'chat',
			noext: 'libraries/requirejs-noext-1.0.3',
			octokat: 'libraries/octokat-0.10.0',
			simplestorage: 'libraries/simplestorage-0.2.1.min',
			socketio: 'libraries/socket.io-2.3.0.min',
			taskbar: 'taskbar',
			text: 'libraries/requirejs-text-2.0.15',
			twemoji: 'libraries/twemoji-12.1.4.min',
			window: 'window'
		},
		shim: {
			clippy: {
				exports: 'clippy',
				deps: ['jquery']
			},
			desktop: {
				deps: ['window', 'lang', 'jqueryuicontextmenu']
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
				deps: ['jqyeryajaxretry', 'jsrsasign', 'octokat']
			},
			fingerprint: {
				exports: 'Fingerprint'
			},
			ga: {
				exports: '__ga__'
			},
			jquerymousewheel: {
				deps: ['jquery']
			},
			jqueryui: {
				deps: ['jquery']
			},
			jqueryuicontextmenu: {
				deps: ['jqueryui']
			},
			jqueryuitree: {
				deps: ['jqueryui']
			},
			jquerycustomscrollbar: {
				deps: ['jquerymousewheel']
			},
			jsrsasign: {
				exports: 'KJUR'
			},
			lang: {
				deps: ['taskbar']
			},
			network: {
				deps: ['socketio']
			},
			'moment-timezone': {
				exports: 'moment',
				deps: ['moment']
			},
			octokat: {
				deps: ['es6promise', 'es6fetch', 'es3base64']
			},
			taskbar: {
				deps: ['jqueryui']
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
				io: 'socketio',
				'socket.io': 'socketio'
			}
		}
	});

	// noinspection JSCheckFunctionSignatures,JSUnusedLocalSymbols
	requirejs([
		'jquery',
		'json!config/desktop.json',
		'chat',
		'filesystem',
		'emuos',
		'optional!ga'
	], function($, desktop, Chat, FileSystem, EmuOS, ga) {
		$(function() {
			if (typeof ga === 'function') {
				ga('send', 'pageview');
			}

			/*var filesystem = new FileSystem({
				github: {
					organization: 'Emupedia',
					repo: 'emupedia.github.io',
					branch: 'master',
					app_id: 18939,
					app_install_id: 1580976,
					private_key: window['GITHUB_PRIVATE_KEY']
				},
				dropbox: {
					token: window['DROPBOX_TOKEN']
				}
			});*/

			// var webamp = new Webamp({template: webamp_template});

			// noinspection JSUnusedLocalSymbols
			new EmuOS({
				filesystem: null,
				themes: {
					basic: 'theme-basic',
					win3x: 'theme-win3x',
					win9x: 'theme-win9x'
				},
				theme: 'theme-win9x',
				icons: [] //desktop.icons
			});

			// noinspection JSUnresolvedFunction
			/*desktop.window({
				title: 'Tree Component',
				icon: 'apps/wing/favicon.ico',
				content: tree_template
			});

			// noinspection JSUnresolvedFunction
			filesystem.getTree(function (tree) {
				console.log(tree);

				// noinspection AmdModulesDependencies
				$('#treeview').btechcotree({
					containerid: 'treeview',
					dataset: {root: tree},
					datatype: $treedatatype.Json,
					dataformat: $treedataformat.Hierarchy,
					class_node_collapse: 'ui-icon-circle-minus',
					class_node_expand: 'ui-icon-circle-plus',
					class_node_item: 'ui-icon-clipboard',
					class_node_highlight: 'ui-state-highlight',
					class_node_add: 'ui-icon-plusthick',
					class_node_remove: 'ui-icon-minusthick',
					collapse_tree: true,
					show_button_check: false,
					show_button_add: false,
					show_button_remove: false,
					node_remove_message: 'Are you sure?'
				});
			});*/
		});
	});
} (this));