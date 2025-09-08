// noinspection ThisExpressionReferencesGlobalObjectJS,JSUnusedLocalSymbols,DuplicatedCode
(function(global) {
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
			'jquery-ui': {
				deps: ['jquery']
			}
		},
		map: {
			'*': {
				'lang': 'lang-en',
				'json': 'requirejs-json',
				'text': 'requirejs-text'
			}
		}
	});

	// noinspection JSCheckFunctionSignatures,JSUnusedLocalSymbols
	requirejs([
		'jquery',
		'jquery-ui'
	], function($, ui, ga) {
		$(function() {
			var $html = $('html');
			var $body = $('body');

			$html.removeClass('boot');

			$body.html(
				'<div class="emuos-desktop">DESKTOP</div>' +
				'<div class="emuos-window blur">' +
					'<div class="emuos-window-container"></div>' +
				'</div>' +
				'<div class="emuos-window blur">' +
					'<div class="emuos-window-container"></div>' +
				'</div>' +
				'<div class="emuos-taskbar-bg"></div>' +
				'<div class="emuos-taskbar">' +
					'<div class="emuos-taskbar-container">' +
						'<div class="emuos-start"><button class="emuos-start-button"></button></div>' +
						'<div class="emuos-apps">APPS</div>' +
						'<div class="emuos-tray">TRAY</div>' +
					'</div>' +
				'</div>'
			);

			// noinspection JSValidateTypes
			$body.find('.emuos-window').draggable({
				iframeFix: true,
				scroll: false,
				// handle: '.chat-window-title',
				// cancel: 'a',
				// containment: 'document, body'
				stack: '.emuos-window'
			}).resizable({
				// containment: 'document, body',
				// maxWidth: 640,
				// maxHeight: 480,
				minWidth: 200,
				minHeight: 120,
				handles: 'n,e,s,w,se,sw,ne,nw'
			});
		});
	});
}(this));