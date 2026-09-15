// noinspection ThisExpressionReferencesGlobalObjectJS,JSUnusedLocalSymbols,DuplicatedCode
(function(global) {
	var location = ~window.location.hostname.indexOf('emupedia.net') ? 'emupedia.net' : (~window.location.hostname.indexOf('emupedia.org') ? 'emupedia.org' : (~window.location.hostname.indexOf('emupedia.games') ? 'emupedia.games' : (~window.location.hostname.indexOf('emuos.net') ? 'emuos.net' : (~window.location.hostname.indexOf('emuos.org') ? 'emuos.org' : (~window.location.hostname.indexOf('emuos.games') ? 'emuos.games' : 'emupedia.net')))))

	// noinspection JSFileReferences
	requirejs.config({
		paths: {
			bson: '../../beta/emuos/assets/js/libraries/bson-4.7.0',
			fingerprint: '../../beta/emuos/assets/js/libraries/fingerprint-3.3.5.min',
			jquery: '../../beta/emuos/assets/js/libraries/jquery-3.6.1.min',
			'jquery-ajax-retry': '../../beta/emuos/assets/js/libraries/jquery-ajax-retry-0.2.8.min',
			network: '//ws.' + location + '/server/app/network_iframe',
			socket: '//ws.' + location + '/server/app/u_socket_es5',
			simplestorage: '../../beta/emuos/assets/js/libraries/simplestorage-0.2.1.min'
		},
		shim: {
			jquery: {
				exports: 'jQuery'
			},
			network: {
				deps: ['socket', 'jquery-ajax-retry']
			},
			socket: {
				deps: ['bson']
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
		'network'
	], function($, network) {
		$(function() {
			var servers = ['wss://ws.emupedia.net/ws/', 'wss://ws.emupedia.org/ws/', 'wss://ws.emupedia.games/ws/', 'wss://ws.emuos.net/ws/', 'wss://ws.emuos.org/ws/', 'wss://ws.emuos.games/ws/'];

			// noinspection DuplicatedCode
			window['NETWORK_CONNECTION'] = network.start({
				servers: servers,
				server: ~window.location.hostname.indexOf('emupedia.net') ? 0 : (~window.location.hostname.indexOf('emupedia.org') ? 1 : (~window.location.hostname.indexOf('emupedia.games') ? 2 : (~window.location.hostname.indexOf('emuos.net') ? 3 : (~window.location.hostname.indexOf('emuos.org') ? 4 : (~window.location.hostname.indexOf('emuos.games') ? 5 : 0))))),
				mode: 0
			});

			setTimeout(function() {
				// noinspection HtmlDeprecatedAttribute
				$('body').append('<iframe id="emuchat" width="100%" height="100%" src="https://cojmar.github.io/n_chat/" frameborder="0" allowFullscreen="allowFullscreen" allowTransparency="true" allow="autoplay; fullscreen; accelerometer; gyroscope; geolocation; microphone; camera; midi; encrypted-media; clipboard-read; clipboard-write" sandbox="allow-forms allow-downloads allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe>');

				// noinspection DuplicatedCode
				$(document).find('iframe').first().off('load').on('load', function() {
					var net = window['NETWORK_CONNECTION'];

					if (typeof net !== 'undefined') {
						// noinspection JSUnresolvedVariable
						if (typeof net.register_iframe === 'function') {
							// noinspection JSUnresolvedVariable,JSUnresolvedFunction
							net.register_iframe('emuchat');
						}
					}
				});
			}, 1000);
		});
	});
}(this));