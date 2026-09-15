// noinspection ThisExpressionReferencesGlobalObjectJS,JSAnnotator
(function(global) {
	// Error Handling
	global.onerror = function(message, url, lineNumber) {
		//alert('Error: ' + message + ' in ' + url + ' at line ' + lineNumber);
		console.log('Error: ' + message + ' in ' + url + ' at line ' + lineNumber);
	};

	var $sys = {
		api: {
			noop: function() {}
		},
		platform: {},
		environment: {},
		browser: {},
		feature: {},
		lib: global.$sys ? global.$sys.lib || {} : {},
		info: {}
	};

	// region Platform

	var platform										= typeof global.navigator.platform !== 'undefined' ? global.navigator.platform : '';
	var browser											= typeof global.navigator.userAgent !== 'undefined' ? global.navigator.userAgent : '';
	var version											= typeof global.navigator.appVersion !== 'undefined' ? global.navigator.appVersion : '';
	var vendor											= typeof global.navigator.vendor !== 'undefined' ? global.navigator.vendor : '';
	var oscpu											= typeof global.navigator.oscpu !== 'undefined' ? global.navigator.oscpu : '';

	$sys.platform.is64									= browser.indexOf('WOW64') !== -1 || browser.indexOf('Win64') !== -1 || browser.indexOf('amd64') !== -1 || browser.indexOf('x86_64') !== -1;
	$sys.platform.is32									= !$sys.platform.is64 ? (browser.indexOf('WOW32') !== -1 || browser.indexOf('Win32') !== -1 || browser.indexOf('i386') !== -1 || browser.indexOf('i686') !== -1) : false;
	$sys.platform.isWindows								= version.indexOf('Win') !== -1;
	$sys.platform.isMacOS								= version.indexOf('Mac') !== -1;
	$sys.platform.isUNIX								= version.indexOf('X11') !== -1;
	$sys.platform.isLinux								= version.indexOf('Linux') !== -1;
	$sys.platform.name									= $sys.platform.isWindows ? 'Windows' : ($sys.platform.isLinux ? 'Linux' : ($sys.platform.isUNIX ? 'UNIX' : ($sys.platform.isMacOS ? 'Mac OS' : undefined)));
	// noinspection DuplicatedCode
	$sys.platform.version								= (function() {
		var offset, version = undefined;

		if ((offset = browser.indexOf('Windows NT')) !== -1) {
			// noinspection JSValidateTypes
			version = browser.substring(offset + 11);

			if (version.indexOf('5.0') === 0) {
				// noinspection JSValidateTypes
				version = '2000';
			} else if (version.indexOf('5.1') === 0) {
				// noinspection JSValidateTypes
				version = 'XP';
			} else if (version.indexOf('5.2') === 0) {
				// noinspection JSValidateTypes
				version = 'Server';
			} else if (version.indexOf('6.0') === 0) {
				// noinspection JSValidateTypes
				version = 'Vista';
			} else if (version.indexOf('6.1') === 0) {
				// noinspection JSValidateTypes
				version = '7';
			} else if (version.indexOf('6.2') === 0) {
				// noinspection JSValidateTypes
				version = '8';
			} else if (version.indexOf('6.3') === 0) {
				// noinspection JSValidateTypes
				version = '8.1';
			} else if (version.indexOf('10.0') === 0) {
				// noinspection JSValidateTypes
				version = '10';
			}
		}

		if ((offset = browser.indexOf('Win 9x')) !== -1) {
			// noinspection JSValidateTypes
			version = browser.substring(offset + 7);

			if (version.indexOf('4.90') === 0) {
				// noinspection JSValidateTypes
				version = 'Millennium';
			}
		}

		if (version) {
			if ((offset = version.indexOf(';')) !== -1) {
				version = version.substring(0, offset);
			}

			if ((offset = version.indexOf(' ')) !== -1) {
				version = version.substring(0, offset);
			}

			if ((offset = version.indexOf(')')) !== -1) {
				version = version.substring(0, offset);
			}
		}

		return version;
	})();

	$sys.browser.isIE									= !$sys.browser.isEdge && (browser.indexOf('MSIE') !== -1 || browser.indexOf('Trident') !== -1);
	$sys.browser.isNetscape								= browser.indexOf('Navigator') !== -1;
	$sys.browser.isKMeleon								= browser.indexOf('K-Meleon') !== -1;
	$sys.browser.isPaleMoon								= browser.indexOf('PaleMoon') !== -1;
	$sys.browser.isFirefox								= !$sys.browser.isNetscape && !$sys.browser.isPaleMoon && browser.indexOf('Firefox') !== -1;
	$sys.browser.isChrome								= browser.indexOf('Chrome') !== -1 || vendor === 'Google Inc.' || !!$sys.browser.chrome;
	$sys.browser.isEdgeHTML								= browser.indexOf('Edge') !== -1;
	$sys.browser.isEdgeBlink							= $sys.browser.isChrome && browser.indexOf('Edg/') !== -1;
	$sys.browser.isEdge									= $sys.browser.isEdgeHTML || $sys.browser.isEdgeBlink;
	$sys.browser.isChromium								= $sys.browser.isChrome && !global.chrome;
	$sys.browser.isVivaldi								= $sys.browser.isChrome && browser.indexOf('Vivaldi') !== -1;
	$sys.browser.isElectron								= $sys.browser.isChrome && browser.indexOf('Electron') !== -1;
	$sys.browser.isOperaPresto							= browser.indexOf('Opera') !== -1;
	$sys.browser.isOperaBlink							= $sys.browser.isChrome && browser.indexOf('OPR') !== -1;
	$sys.browser.isOpera								= $sys.browser.isOperaPresto || $sys.browser.isOperaBlink;
	$sys.browser.isSafari								= browser.indexOf('Safari') !== -1 && vendor === 'Apple Computer, Inc.';
	$sys.browser.isOther								= !($sys.browser.isIE || $sys.browser.isEdge || $sys.browser.isFirefox || $sys.browser.isChrome || $sys.browser.isOpera || $sys.browser.isSafari);
	$sys.browser.isMobile								= browser.indexOf('Mobi') !== -1;
	$sys.browser.isDesktop								= !$sys.browser.isMobile;
	$sys.browser.name									= $sys.browser.isEdge ? 'Microsoft Edge' : ($sys.browser.isIE ? 'Microsoft Internet Explorer' : ($sys.browser.isNetscape ? 'Netscape Navigator' : ($sys.browser.isKMeleon ? 'K-Meleon' : ($sys.browser.isPaleMoon ? 'PaleMoon' : ($sys.browser.isFirefox ? 'Mozilla Firefox' : ($sys.browser.isOpera ? 'Opera' : ($sys.browser.isElectron ? 'Electron' : ($sys.browser.isVivaldi ? 'Vivaldi' : ($sys.browser.isChromium ? 'Chromium' : ($sys.browser.isChrome ? 'Google Chrome' : ($sys.browser.isSafari ? 'Apple Safari' : undefined)))))))))));
	// noinspection DuplicatedCode
	$sys.browser.version								= (function() {
		var offset, version = undefined;

		if ((offset = browser.indexOf('Opera')) !== -1) {
			// noinspection JSValidateTypes
			version = browser.substring(offset + 6);

			if ((offset = browser.indexOf('Version')) !== -1) {
				// noinspection JSValidateTypes
				version = browser.substring(offset + 8);
			}
		} else if ((offset = browser.indexOf('OPR')) !== -1) {
			// noinspection JSValidateTypes
			version = browser.substring(offset + 4);
		} else if ((offset = browser.indexOf('Edg/')) !== -1) {
			// noinspection JSValidateTypes
			version = browser.substring(offset + 4);
		} else if ((offset = browser.indexOf('Edge')) !== -1) {
			// noinspection JSValidateTypes
			version = browser.substring(offset + 5);
		} else if ((offset = browser.indexOf('MSIE')) !== -1) {
			// noinspection JSValidateTypes
			version = browser.substring(offset + 5);
		} else if ((offset = browser.indexOf('Trident') !== -1)) {
			// noinspection JSValidateTypes
			version = browser.substring(offset + 5);

			if ((offset = browser.indexOf('rv:')) !== -1) {
				// noinspection JSValidateTypes
				version = browser.substring(offset + 3);
			}
		} else if ((offset = browser.indexOf('Vivaldi')) !== -1) {
			// noinspection JSValidateTypes
			version = browser.substring(offset + 8);
		} else if ((offset = browser.indexOf('Chrome')) !== -1) {
			// noinspection JSValidateTypes
			version = browser.substring(offset + 7);
		} else if ((offset = browser.indexOf('Safari')) !== -1) {
			// noinspection JSValidateTypes
			version = browser.substring(offset + 7);

			if ((offset = browser.indexOf('Version')) !== -1) {
				// noinspection JSValidateTypes
				version = browser.substring(offset + 8);
			}
		} else if ((offset = browser.indexOf('K-Meleon')) !== -1) {
			// noinspection JSValidateTypes
			version = browser.substring(offset + 9);
		} else if ((offset = browser.indexOf('Navigator')) !== -1) {
			// noinspection JSValidateTypes
			version = browser.substring(offset + 10);
		} else if ((offset = browser.indexOf('PaleMoon')) !== -1) {
			// noinspection JSValidateTypes
			version = browser.substring(offset + 9);
		} else if ((offset = browser.indexOf('Firefox')) !== -1) {
			// noinspection JSValidateTypes
			version = browser.substring(offset + 8);
		} else if ((browser.lastIndexOf(' ') + 1) < (offset = browser.lastIndexOf('/'))) {
			// noinspection JSValidateTypes
			version = browser.substring(offset + 1);
		}

		if (version) {
			if ((offset = version.indexOf(';')) !== -1) {
				version = version.substring(0, offset);
			}

			if ((offset = version.indexOf(' ')) !== -1) {
				version = version.substring(0, offset);
			}

			if ((offset = version.indexOf(')')) !== -1) {
				version = version.substring(0, offset);
			}
		}

		return version;
	})();
	$sys.browser.useragent								= browser;
	$sys.browser.vendor									= vendor;
	$sys.browser.platform								= platform;
	oscpu ? $sys.browser.oscpu							= oscpu : '';

	$sys.environment.isBrowser							= !!(typeof global === 'object' && typeof global.navigator === 'object' && global.document);
	$sys.environment.isWorker							= typeof importScripts === 'function' && typeof postMessage === 'function' && !$sys.isBrowser;
	$sys.environment.isNode								= typeof process === 'object' && typeof require === 'function' && !$sys.isBrowser && !$sys.isWorker;
	$sys.environment.isShell							= !($sys.environment.isBrowser || $sys.environment.isWorker || $sys.environment.isNode);
	$sys.environment.name								= $sys.environment.isBrowser ? 'Browser' : ($sys.environment.isWorker ? 'Worker' : ($sys.environment.isNode ? 'Node' : 'Shell'));

	// endregion

	// region Features

	var audio											= global.document.createElement('audio');
	var canvas2D										= global.document.createElement('canvas');
	var context2D										= typeof canvas2D !== 'undefined' ? (typeof canvas2D.getContext === 'function' ? canvas2D.getContext('2d') : false) : false;
	var canvasWEBGL										= null;
	var contextWEBGL									= false;
	var canvasWEBGL2									= null;
	var contextWEBGL2									= false;

	if (context2D) {
		try {
			//TODO: try to cache results to prevent Error: WebGL warning: Exceeded 16 live WebGL contexts for this principal, losing the least recently used one.
			canvasWEBGL = global.document.createElement('canvas');
			contextWEBGL = typeof canvasWEBGL !== 'undefined' ? (typeof canvasWEBGL.getContext === 'function' ? (canvasWEBGL.getContext('webgl') || canvasWEBGL.getContext('experimental-webgl')) : false) : false;

			if (contextWEBGL) {
				canvasWEBGL2 = global.document.createElement('canvas');
				contextWEBGL2 = typeof canvasWEBGL2 !== 'undefined' ? (typeof canvasWEBGL2.getContext === 'function' ? (canvasWEBGL2.getContext('webgl2') || canvasWEBGL2.getContext('experimental-webgl2')) : false) : false;
			}
		} catch (e) {}
	}

	$sys.feature.WORKERS								= !!global.Worker;
	// noinspection JSUnresolvedVariable
	$sys.feature.SHARED_WORKERS							= !!global.SharedWorker;
	$sys.feature.SERVICE_WORKERS						= 'serviceWorker' in global.navigator;
	$sys.feature.URL_PARSER								= (function() {
		try {
			var root = global.location.protocol + '//' + global.location.host + '/';
			var url = new URL(root);

			return url.href === root;
		} catch (e) {
			return false;
		}
	})();
	$sys.feature.URL_BLOB								= $sys.feature.URL_PARSER && 'revokeObjectURL' in URL && 'createObjectURL' in URL;
	// noinspection JSVoidFunctionReturnValueUsed
	$sys.feature.DATA_URL								= (function() {
		function testlimit() {
			// noinspection JSCheckFunctionSignatures
			var datauribig = new Image();

			datauribig.onerror = function() {
				$sys.feature.DATA_URL = false;
			};

			datauribig.onload = function() {
				$sys.feature.DATA_URL = datauribig.width === 1 && datauribig.height === 1;
			};

			var base64str = 'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

			while (base64str.length < 63000) {
				base64str = '\r\n' + base64str;
			}

			datauribig.src = 'data:image/gif;base64,' + base64str;
		}

		// noinspection JSCheckFunctionSignatures
		var dataurl = new Image();

		dataurl.onerror = function() {
			$sys.feature.DATA_URL = false;
		};

		dataurl.onload = function() {
			if (dataurl.width === 1 && dataurl.height === 1) {
				testlimit();
			} else {
				$sys.feature.DATA_URL = false;
			}
		};

		dataurl.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
	})();
	// noinspection DuplicatedCode
	$sys.feature.TYPED_ARRAYS							= typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined' ? typeof Int8Array !== 'undefined' && typeof Uint8Array !== 'undefined' && typeof Uint8ClampedArray !== 'undefined' && typeof Int16Array !== 'undefined' && typeof Uint16Array !== 'undefined' && typeof Int32Array !== 'undefined' && typeof Uint32Array !== 'undefined' && typeof Float32Array !== 'undefined' && typeof Float64Array !== 'undefined': false;
	$sys.feature.BIGINTS								= typeof BigInt !== 'undefined' ? typeof BigInt64Array !== 'undefined' && typeof BigUint64Array !== 'undefined' : false;
	// noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols,DuplicatedCode
	$sys.feature.SIMD									= typeof SIMD !== 'undefined' ? typeof SIMD.Bool16x8 !== 'undefined' && typeof SIMD.Bool32x4 !== 'undefined' && typeof SIMD.Bool8x16 !== 'undefined' && typeof SIMD.Float32x4 !== 'undefined' && typeof SIMD.Int16x8 !== 'undefined' && typeof SIMD.Int32x4 !== 'undefined' && typeof SIMD.Int8x16 !== 'undefined' && typeof SIMD.Uint32x4 !== 'undefined' && typeof SIMD.Uint8x16 !== 'undefined' : false;
	$sys.feature.ASMJS									= (function() {
		try {
			(function MyAsmModule() {
				'use asm';

				function dummy() {}

				return {dummy: dummy};
			})();

			return true;
		} catch(e) {}

		return false;
	})();
	$sys.feature.WEBASSEMBLY							= (function() {
		try {
			// noinspection JSUnresolvedVariable
			if (typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function') {
				// noinspection JSUnresolvedVariable
				var module = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
				// noinspection JSUnresolvedVariable
				if (module instanceof WebAssembly.Module) {
					// noinspection JSUnresolvedVariable,JSUnresolvedFunction
					return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
				}
			}
		} catch (e) {}

		return false;
	})();
	// noinspection JSUnresolvedVariable
	$sys.feature.FULLSCREEN								= !global.document.documentElement.requestFullscreen ? true : !!global.document.documentElement.webkitRequestFullScreen || !!global.document.documentElement.mozRequestFullScreen || !!global.document.documentElement.msRequestFullscreen;
	$sys.feature.POINTER_LOCK							= 'pointerLockElement' in global.document ? true : 'oPointerLockElement' in global.document || 'msPointerLockElement' in global.document || 'mozPointerLockElement' in global.document || 'webkitPointerLockElement' in global.document;
	// noinspection JSUnresolvedVariable
	$sys.feature.ANIMATION_FRAME						= !!global.requestAnimationFrame ? true : !!global.webkitRequestAnimationFrame || !!global.mozRequestAnimationFrame || !!global.msRequestAnimationFrame || !!global.oRequestAnimationFrame;
	// noinspection JSUnresolvedVariable
	$sys.feature.PERFORMANCE							= !!global.performance ? true : !!global.webkitPerformance || !!global.mozPerformance || !!global.msPerformance || !!global.oPerformance;
	$sys.feature.TIMERS									= $sys.feature.ANIMATION_FRAME && $sys.feature.PERFORMANCE;
	$sys.feature.CLIPBOARD								= !!global.navigator.clipboard;
	$sys.feature.CUSTOM_ELEMENTS_V0						= 'registerElement' in global.document;
	$sys.feature.CUSTOM_ELEMENTS_V1						= 'customElements' in global;
	$sys.feature.CUSTOM_ELEMENTS						= $sys.feature.CUSTOM_ELEMENTS_V0 || $sys.feature.CUSTOM_ELEMENTS_V1;
	// noinspection JSUnresolvedVariable
	$sys.feature.SHADOW_DOM_V0							= 'createShadowRoot' in global.document.createElement('div') || 'webkitCreateShadowRoot' in global.document.createElement('div') || 'mozCreateShadowRoot' in global.document.createElement('div');
	$sys.feature.SHADOW_DOM_V1							= 'attachShadow' in global.document.createElement('div');
	$sys.feature.SHADOW_DOM								= $sys.feature.SHADOW_DOM_V0 || $sys.feature.SHADOW_DOM_V1;
	$sys.feature.HTML_IMPORTS							= 'import' in global.document.createElement('link');
	$sys.feature.TEMPLATE								= 'content' in global.document.createElement('template');
	$sys.feature.TEMPLATE_SLOT							= 'name' in global.document.createElement('slot');
	$sys.feature.TEMPLATES								= $sys.feature.TEMPLATE && $sys.feature.TEMPLATE_SLOT;
	$sys.feature.WEBCOMPONENTS_V0						= $sys.feature.CUSTOM_ELEMENTS_V0 && $sys.feature.SHADOW_DOM_V0 && $sys.feature.HTML_IMPORTS;
	$sys.feature.WEBCOMPONENTS_V1						= $sys.feature.CUSTOM_ELEMENTS_V1 && $sys.feature.SHADOW_DOM_V1 && $sys.feature.TEMPLATES;
	$sys.feature.WEBCOMPONENTS							= $sys.feature.WEBCOMPONENTS_V0 || $sys.feature.WEBCOMPONENTS_V1;
	$sys.feature.SVG									= !!(global.document.createElementNS && global.document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);
	$sys.feature.CANVAS									= !!(context2D && context2D instanceof CanvasRenderingContext2D);
	$sys.feature.OFFSCREEN_CANVAS						= !!($sys.feature.CANVAS && 'OffscreenCanvas' in global);
	$sys.feature.WEBGL									= !!(contextWEBGL && contextWEBGL instanceof WebGLRenderingContext);
	// noinspection JSUnresolvedVariable
	$sys.feature.WEBGL2									= !!(contextWEBGL2 && contextWEBGL2 instanceof WebGL2RenderingContext);
	$sys.feature.WEBVR									= 'getVRDisplays' in global.navigator ? true : 'mozGetVRDevices' in global.navigator;
	// noinspection JSUnusedGlobalSymbols
	$sys.feature.HTML5AUDIO								= (function() {
		try {
			// noinspection JSUnresolvedVariable
			return !!(audio.canPlayType && audio.canPlayType('audio/mpeg;').replace(/no/, ''));
		} catch(e) {
			return false;
		}
	})();
	// noinspection JSUnusedGlobalSymbols
	$sys.feature.WEBAUDIO								= 'AudioContext' in global ? true : 'webkitAudioContext' in global || 'mozAudioContext' in global || 'oAudioContext' in global || 'msAudioContext' in global;
	// noinspection JSUnresolvedVariable
	$sys.feature.WEBMIDI								= !!global.navigator.requestMIDIAccess;
	// noinspection JSUnresolvedVariable
	$sys.feature.WEBSPEECH_RECOGNITION					= 'SpeechRecognition' in global ? true : 'webkitSpeechRecognition' in global || 'mozSpeechRecognition' in global || 'oSpeechRecognition' in global || 'msSpeechRecognition' in global;
	// noinspection JSUnresolvedVariable
	$sys.feature.WEBSPEECH_SYNTHESIS					= 'speechSynthesis' in global ? true : 'webkitSpeechSynthesis' in global || 'mozSpeechSynthesis' in global || 'oSpeechSynthesis' in global || 'msSpeechSynthesis' in global;
	$sys.feature.WEBSPEECH								= $sys.feature.WEBSPEECH_RECOGNITION && $sys.feature.WEBSPEECH_SYNTHESIS;
	// noinspection JSUnusedGlobalSymbols
	$sys.feature.KEYBOARD								= true;
	// noinspection JSUnresolvedVariable
	$sys.feature.POINTER_EVENTS							= !!global.PointerEvent ? true : !!global.webkitPointerEvent || !!global.mozPointerEvent || !!global.msPointerEvent || !!global.oPointerEvent;
	// noinspection JSUnresolvedVariable
	$sys.feature.GAMEPADS								= !!global.navigator.getGamepads ? true : !!global.navigator.webkitGetGamepads || !!global.navigator.mozGetGamepads || !!global.navigator.msGetGamepads || !!global.navigator.oGetGamepads;
	// noinspection JSUnresolvedVariable
	$sys.feature.WEBSOCKETS								= (function() {
		var protocol = 'https:' === global.location.protocol ? 'wss' : 'ws';

		if ('WebSocket' in global && WebSocket.CLOSING === 2) {
			if ('binaryType' in WebSocket.prototype) {
				return true;
			} else {
				try {
					return !!(new WebSocket(protocol + '://.').binaryType);
				} catch (e) {
					return false;
				}
			}
		}
	})();
	// noinspection DuplicatedCode
	$sys.feature.SESSION_STORAGE						= (function() {
		var mod = 'test';

		if (typeof sessionStorage !== 'undefined') {
			if (typeof sessionStorage.setItem === 'function' && typeof sessionStorage.removeItem === 'function') {
				try {
					sessionStorage.setItem(mod, mod);
					sessionStorage.removeItem(mod);
					return true;
				} catch (e) {
					return false;
				}
			}
		}

		return false;
	})();
	// noinspection DuplicatedCode
	$sys.feature.LOCAL_STORAGE							= (function() {
		var mod = 'test';

		if (typeof localStorage !== 'undefined') {
			if (typeof localStorage.setItem === 'function' && typeof localStorage.removeItem === 'function') {
				try {
					localStorage.setItem(mod, mod);
					localStorage.removeItem(mod);
					return true;
				} catch (e) {
					return false;
				}
			}
		}

		return false;
	})();
	// noinspection JSUnresolvedVariable
	$sys.feature.INDEXED_DB								= !!global.indexedDB ? true : !!global.webkitIndexedDB || !!global.mozIndexedDB || !!global.moz_indexedDB || !!global.oIndexedDB || !!global.msIndexedDB;
	$sys.feature.WEBSQL									= !!global.openDatabase;
	$sys.feature.CACHE									= 'caches' in global;
	$sys.feature.FETCH									= !!global.fetch;
	$sys.feature.PUSH									= 'PushManager' in global;
	// noinspection DuplicatedCode
	$sys.feature.ORIENTATION							= !!global.DeviceOrientationEvent;
	$sys.feature.GEOLOCATION							= !!global.navigator.geolocation;
	$sys.feature.MOTION									= !!global.DeviceMotionEvent;
	// noinspection JSUnresolvedVariable
	$sys.feature.GYROSCOPE								= !!global.Gyroscope;
	$sys.feature.PROXIMITY								= 'ProximitySensor' in global;
	// noinspection JSUnresolvedVariable
	$sys.feature.AMBIENTLIGHT							= !!global.AmbientLightSensor;
	$sys.feature.VIBRATION								= 'vibrate' in global.navigator;
	// noinspection JSUnresolvedVariable
	$sys.feature.BATTERY								= !!global.navigator.getBattery ? true : !!global.navigator.battery || !!global.navigator.mozBattery;
	// TODO: implement check for Generic Sensor API
	$sys.feature.CSS_VARIABLES							= (function() {
		if (typeof CSS !== 'undefined') {
			if (typeof CSS.supports === 'function') {
				return CSS.supports('color', 'var(--fake-var)');
			}
		}

		return false;
	})();
	$sys.feature.ES3_BASE64								= 'btoa' in global && 'atob' in global;
	$sys.feature.ES3									= $sys.feature.ES3_BASE64;
	$sys.feature.ES5_STRICT_MODE						= (function() {'use strict'; return !this; })();
	$sys.feature.ES5_XHR								= 'XMLHttpRequest' in global && 'prototype' in global.XMLHttpRequest && 'addEventListener' in global.XMLHttpRequest.prototype;
	$sys.feature.ES5_JSON								= 'JSON' in global && 'parse' in JSON && 'stringify' in JSON;
	$sys.feature.ES5_SYNTAX								= (function() {
		var value, obj, stringAccess, getter, setter, reservedWords;//, zeroWidthChars;

		try {
			stringAccess = eval('"foobar"[3] === "b"');
			getter = eval('({ get x(){ return 1 } }).x === 1');
			eval('({ set x(v){ value = v; } }).x = 1');
			// noinspection JSUnusedAssignment
			setter = value === 1;
			eval('obj = ({ if: 1 })');
			// noinspection JSUnusedAssignment
			reservedWords = obj['if'] === 1;
			// zeroWidthChars = eval('_\u200c\u200d = true');

			return stringAccess && getter && setter && reservedWords; //&& zeroWidthChars;
		} catch (e) {
			return false;
		}
	})();
	$sys.feature.ES5_UNDEFINED							= (function() {
		var result, originalUndefined;

		try {
			originalUndefined = undefined;
			// noinspection JSUndeclaredVariable,JSValidateTypes
			undefined = 12345;
			result = typeof undefined === 'undefined';
			// noinspection JSUndeclaredVariable
			undefined = originalUndefined;
		} catch (e) {
			return true;
		}

		return result;
	})();
	$sys.feature.ES5_ARRAY								= !!(Array.prototype && Array.prototype.every && Array.prototype.filter && Array.prototype.forEach && Array.prototype.indexOf && Array.prototype.lastIndexOf && Array.prototype.map && Array.prototype.some && Array.prototype.reduce && Array.prototype.reduceRight && Array.isArray);
	$sys.feature.ES5_DATE								= (function() {
		var isoDate = '2013-04-12T06:06:37.307Z', canParseISODate = false;

		try {
			canParseISODate = !!Date.parse(isoDate);
		} catch (e) {}

		return !!(Date.now && Date.prototype && Date.prototype.toISOString && Date.prototype.toJSON && canParseISODate);
	})();
	$sys.feature.ES5_FUNCTION							= !!(Function.prototype && Function.prototype.bind);
	$sys.feature.ES5_OBJECT								= !!(Object.keys && Object.create && Object.getPrototypeOf && Object.getOwnPropertyNames && Object.isSealed && Object.isFrozen && Object.isExtensible && Object.getOwnPropertyDescriptor && Object.defineProperty && Object.defineProperties && Object.seal && Object.freeze && Object.preventExtensions);
	$sys.feature.ES5_STRING								= !!(String.prototype && String.prototype.trim);
	$sys.feature.ES5_GETSET								= (function() {
		var value, getter, setter;

		try {
			getter = eval('({ get x(){ return 1 } }).x === 1');
			eval('({ set x(v){ value = v; } }).x = 1');
			// noinspection JSUnusedAssignment
			setter = value === 1;

			return getter && setter;
		} catch (e) {
			return false;
		}
	})();
	$sys.feature.ES5									= !!($sys.feature.ES3 && $sys.feature.ES5_STRICT_MODE && $sys.feature.ES5_XHR && $sys.feature.ES5_JSON && $sys.feature.ES5_SYNTAX && $sys.feature.ES5_UNDEFINED && $sys.feature.ES5_ARRAY && $sys.feature.ES5_DATE && $sys.feature.ES5_FUNCTION && $sys.feature.ES5_OBJECT && $sys.feature.ES5_STRING);
	// noinspection JSUnresolvedVariable,DuplicatedCode
	$sys.feature.ES6_NUMBER								= !!(Number.isFinite && Number.isInteger && Number.isSafeInteger && Number.isNaN && Number.parseInt && Number.parseFloat && Number.isInteger(Number.MAX_SAFE_INTEGER) && Number.isInteger(Number.MIN_SAFE_INTEGER) && Number.isFinite(Number.EPSILON));
	// noinspection JSUnresolvedVariable
	$sys.feature.ES6_MATH								= !!(Math && Math.clz32 && Math.cbrt && Math.imul && Math.sign && Math.log10 && Math.log2 && Math.log1p && Math.expm1 && Math.cosh && Math.sinh && Math.tanh && Math.acosh && Math.asinh && Math.atanh && Math.hypot && Math.trunc && Math.fround);
	$sys.feature.ES6_ARRAY								= !!(Array.prototype && Array.prototype.copyWithin && Array.prototype.fill && Array.prototype.find && Array.prototype.findIndex && Array.prototype.keys && Array.prototype.entries && Array.prototype.values && Array.from && Array.of);
	$sys.feature.ES6_FUNCTION							= (function() {
		try {
			eval('() => {}');
		} catch (e) {
			return false;
		}
		return true;
	})();
	// noinspection JSUnresolvedVariable
	$sys.feature.ES6_OBJECT								= !!(Object.assign && Object.is && Object.setPrototypeOf);
	// noinspection JSUnresolvedVariable
	$sys.feature.ES6_CLASS								= (function() {
		try {
			eval('class C{}');
		} catch (e) {
			return false;
		}
		return true;
	})();
	// noinspection JSUnresolvedVariable
	$sys.feature.ES6_STRING								= !!(String.fromCodePoint && String.raw && String.prototype.codePointAt && String.prototype.repeat && String.prototype.startsWith && String.prototype.endsWith && (String.prototype.includes || String.prototype.contains));
	// noinspection JSUnresolvedVariable
	$sys.feature.ES6_COLLECTIONS						= !!(global.Map && global.Set && global.WeakMap && global.WeakSet);
	$sys.feature.ES6_GENERATORS							= (function() {
		try {
			// noinspection JSCheckFunctionSignatures,JSValidateTypes
			new Function('function* test() {}')();
		} catch (e) {
			return false;
		}
		return true;
	})();
	$sys.feature.ES6_PROMISES							= (function() {
		return 'Promise' in global && 'resolve' in global.Promise && 'reject' in global.Promise && 'all' in global.Promise && 'race' in global.Promise && (function() {
			var resolve;
			// noinspection JSIgnoredPromiseFromCall
			new global.Promise(function(r) { resolve = r; });
			return typeof resolve === 'function';
		}());
	})();
	$sys.feature.ES6_STATIC_MODULES						= (function() {
		try {
			// noinspection JSCheckFunctionSignatures,JSValidateTypes
			new Function('import("")');
			return true;
		} catch (err) {
			return false;
		}
	})();
	$sys.feature.ES6_DYNAMIC_MODULES					= 'noModule' in global.document.createElement('script');
	$sys.feature.ES6_MODULES							= $sys.feature.ES6_STATIC_MODULES && $sys.feature.ES6_DYNAMIC_MODULES;
	$sys.feature.ES6									= $sys.feature.ES5 && $sys.feature.ES6_NUMBER && $sys.feature.ES6_MATH && $sys.feature.ES6_ARRAY && $sys.feature.ES6_FUNCTION && $sys.feature.ES6_OBJECT && $sys.feature.ES6_CLASS && $sys.feature.ES6_STRING && $sys.feature.ES6_COLLECTIONS && $sys.feature.ES6_GENERATORS && $sys.feature.ES6_PROMISES && ($sys.feature.ES6_STATIC_MODULES || $sys.feature.ES6_DYNAMIC_MODULES);
	$sys.feature.ES7_ASYNC_AWAIT						= (function() {
		var isAsync = true;

		try {
			eval('async () => {}');
		} catch (e) {
			if (e instanceof SyntaxError) {
				isAsync = false;
			} else {
				throw e;
			}
		}

		return isAsync;
	})();

	// endregion

	// region Info

	$sys.info.OPERATING_SYSTEM							= $sys.info.OS = $sys.platform.name;
	$sys.info.OPERATING_SYSTEM_VERSION					= $sys.info.OS_VERSION = $sys.platform.version;
	$sys.info.ENVIRONMENT								= $sys.environment.name;
	$sys.info.BROWSER									= $sys.browser.name;
	$sys.info.BROWSER_VERSION							= $sys.browser.version;
	$sys.info.CPU_LITTLE_ENDIAN							= ($sys.feature.TYPED_ARRAYS ? (function() {
		var buffer = new ArrayBuffer(2);
		new DataView(buffer).setUint16(0, 256, true);

		return new Uint16Array(buffer)[0] === 256;
	})() : true);
	// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
	$sys.info.CPU_BIG_ENDIAN							= typeof $sys.info.CPU_LITTLE_ENDIAN !== 'undefined' ? !$sys.info.CPU_LITTLE_ENDIAN : false;
	// noinspection JSUnusedGlobalSymbols
	$sys.info.CPU_ENDIANNESS							= typeof $sys.info.CPU_LITTLE_ENDIAN !== 'undefined' ? ($sys.info.CPU_LITTLE_ENDIAN ? 'Little-endian' : 'Big-endian') : 'Little-endian';
	// noinspection JSUnusedGlobalSymbols
	$sys.info.CPU_CORES									= !global.navigator.hardwareConcurrency ? '≥ 1' : global.navigator.hardwareConcurrency;
	// noinspection JSUnusedGlobalSymbols
	$sys.info.CPU_ARCH									= $sys.platform.is64 ? '64-bit' : '32-bit';
	// noinspection JSUnresolvedVariable
	$sys.info.RAM										= !global.navigator.deviceMemory ? '≤ 1GB' : '≥' + global.navigator.deviceMemory + 'GB';
	// noinspection JSUnusedGlobalSymbols
	$sys.info.VIDEO_ACCELERATION						= $sys.feature.WEBGL || $sys.feature.WEBGL2 ? '3D' : ($sys.feature.CANVAS ? '2D' : false);
	// noinspection JSUnusedGlobalSymbols
	$sys.info.GPU										= (function() {
		if (contextWEBGL) {
			if (typeof contextWEBGL.getSupportedExtensions === 'function') {
				if (contextWEBGL.getSupportedExtensions().indexOf('WEBGL_debug_renderer_info') !== -1) {
					var dbgRenderInfo = contextWEBGL.getExtension('WEBGL_debug_renderer_info');

					if (typeof dbgRenderInfo.UNMASKED_RENDERER_WEBGL !== 'undefined') {
						return contextWEBGL.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
					}
				}
			}
		}

		return undefined;
	})();

	// endregion

	// region API

	$sys.api.banner = function() {
		global.console.log('%c                                 \n' +
							'                                 \n' +
							'     ╔═╗╔╦╗╦ ╦╔═╗╔═╗╔╦═╗╦╔═╗     \n' +
							'     ╠═ ║║║║ ║╠═╝╠═  ║ ║║╠═╣     \n' +
							'     ╚═╝╩ ╩╚═╝╩  ╚═╝═╩═╝╩╩ ╩     \n' +
							'                                 \n' +
							'                                 \n', 'background: radial-gradient(circle, #1a2049 0%, #13162f 100%); font-size: 20px; line-height: 1; color: yellow; text-shadow: 1px 1px #5B4FFF;');
		global.console.log('%cHold Up!', 'background: linear-gradient(#D33106, #571402); color: #5865f2; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;');
		global.console.log('%cIf someone told you to enter or copy/paste something here it\'s very likely you\'re being scammed.', 'font-size: 16px;');
		global.console.log('%cPasting anything in here could give attackers access to your data.', 'font-size: 18px; font-weight: bold; color: #D50012;');
		global.console.log('%cUsing this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS.', 'font-size: 18px; font-weight: bold; color: #D50012;');
		global.console.log('%cYou can read more about it here => https://en.wikipedia.org/wiki/Self-XSS', 'font-size: 18px; font-weight: bold; color: #D9A343;');
		global.console.log('%cDo not enter or paste code that you do not understand.', 'font-size: 18px; font-weight: bold; color: #D50012;');
		global.console.log('%cUnless you understand exactly what you are doing, close this window and stay safe.', 'font-size: 16px; color: #00A478;');
		return this;
	};

	// noinspection JSUnusedLocalSymbols,DuplicatedCode
	$sys.api.dumpsystem = function() {
		// noinspection DuplicatedCode
		var dump = [{
			Feature: 'OPERATING_SYSTEM',
			Value: $sys.info.OPERATING_SYSTEM + ' ' + $sys.info.OPERATING_SYSTEM_VERSION
		} , {
			Feature: 'ENVIRONMENT',
			Value: $sys.info.ENVIRONMENT
		} , {
			Feature: 'BROWSER',
			Value: $sys.info.BROWSER + ' ' + $sys.info.BROWSER_VERSION + ' (' + $sys.info.CPU_ARCH + ')'
		} , {
			Feature: 'CPU_ENDIANNESS',
			Value: $sys.info.CPU_ENDIANNESS
		} , {
			Feature: 'CPU_CORES',
			Value: $sys.info.CPU_CORES
		} , {
			Feature: 'CPU_ARCH',
			Value: $sys.info.CPU_ARCH
		} , {
			Feature: 'RAM',
			Value: $sys.info.RAM
		} , {
			Feature: 'GPU',
			Value: $sys.info.GPU
		} , {
			Feature: 'VIDEO_ACCELERATION',
			Value: $sys.info.VIDEO_ACCELERATION
		} , {
			Feature: 'CSS_VARIABLES',
			Value: $sys.feature.CSS_VARIABLES ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES3_BASE64',
			Value: $sys.feature.ES3_BASE64 ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES3',
			Value: $sys.feature.ES3 ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES5_STRICT_MODE',
			Value: $sys.feature.ES5_STRICT_MODE ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES5_XHR',
			Value: $sys.feature.ES5_XHR ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES5_JSON',
			Value: $sys.feature.ES5_JSON ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES5_SYNTAX',
			Value: $sys.feature.ES5_SYNTAX ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES5_UNDEFINED',
			Value: $sys.feature.ES5_UNDEFINED ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES5_ARRAY',
			Value: $sys.feature.ES5_ARRAY ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES5_DATE',
			Value: $sys.feature.ES5_DATE ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES5_FUNCTION',
			Value: $sys.feature.ES5_FUNCTION ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES5_OBJECT',
			Value: $sys.feature.ES5_OBJECT ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES5_STRING',
			Value: $sys.feature.ES5_STRING ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES5_GETSET',
			Value: $sys.feature.ES5_GETSET ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES5',
			Value: $sys.feature.ES5 ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES6_NUMBER',
			Value: $sys.feature.ES6_NUMBER ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES6_MATH',
			Value: $sys.feature.ES6_MATH ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES6_ARRAY',
			Value: $sys.feature.ES6_ARRAY ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES6_FUNCTION',
			Value: $sys.feature.ES6_FUNCTION ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES6_OBJECT',
			Value: $sys.feature.ES6_OBJECT ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES6_STRING',
			Value: $sys.feature.ES6_STRING ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES6_COLLECTIONS',
			Value: $sys.feature.ES6_COLLECTIONS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES6_GENERATORS',
			Value: $sys.feature.ES6_GENERATORS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES6_PROMISES',
			Value: $sys.feature.ES6_PROMISES ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES6_CLASS',
			Value: $sys.feature.ES6_CLASS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES6_STATIC_MODULES',
			Value: $sys.feature.ES6_STATIC_MODULES ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES6_DYNAMIC_MODULES',
			Value: $sys.feature.ES6_DYNAMIC_MODULES ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES6_MODULES',
			Value: $sys.feature.ES6_MODULES ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES6',
			Value: $sys.feature.ES6 ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ES7_ASYNC_AWAIT',
			Value: $sys.feature.ES7_ASYNC_AWAIT ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'WORKERS',
			Value: $sys.feature.WORKERS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SHARED_WORKERS',
			Value: $sys.feature.SHARED_WORKERS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SERVICE_WORKERS',
			Value: $sys.feature.SERVICE_WORKERS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'TYPED_ARRAYS',
			Value: $sys.feature.TYPED_ARRAYS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'URL_PARSER',
			Value: $sys.feature.URL_PARSER ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'URL_BLOB',
			Value: $sys.feature.URL_BLOB ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'DATA_URL',
			Value: $sys.feature.DATA_URL ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'BIGINTS',
			Value: $sys.feature.BIGINTS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SIMD',
			Value: $sys.feature.SIMD ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ASMJS',
			Value: $sys.feature.ASMJS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'WEBASSEMBLY',
			Value: $sys.feature.WEBASSEMBLY ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'FULLSCREEN',
			Value: $sys.feature.FULLSCREEN ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'POINTER_LOCK',
			Value: $sys.feature.POINTER_LOCK ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'TIMERS',
			Value: $sys.feature.TIMERS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'CLIPBOARD',
			Value: $sys.feature.CLIPBOARD ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'WEBCOMPONENTS',
			Value: $sys.feature.WEBCOMPONENTS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'CANVAS',
			Value: $sys.feature.CANVAS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'OFFSCREEN_CANVAS',
			Value: $sys.feature.OFFSCREEN_CANVAS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SVG',
			Value: $sys.feature.SVG ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'WEBGL',
			Value: $sys.feature.WEBGL ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'WEBGL2',
			Value: $sys.feature.WEBGL2 ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'WEBVR',
			Value: $sys.feature.WEBVR ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'HTML5AUDIO',
			Value: $sys.feature.HTML5AUDIO ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'WEBAUDIO',
			Value: $sys.feature.WEBAUDIO ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'WEBMIDI',
			Value: $sys.feature.WEBMIDI ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'KEYBOARD',
			Value: $sys.feature.KEYBOARD ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'POINTER_EVENTS',
			Value: $sys.feature.POINTER_EVENTS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'GAMEPADS',
			Value: $sys.feature.GAMEPADS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'WEBSOCKETS',
			Value: $sys.feature.WEBSOCKETS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SESSION_STORAGE',
			Value: $sys.feature.SESSION_STORAGE ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'LOCAL_STORAGE',
			Value: $sys.feature.LOCAL_STORAGE ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'INDEXED_DB',
			Value: $sys.feature.INDEXED_DB ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'WEBSQL',
			Value: $sys.feature.WEBSQL ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'CACHE',
			Value: $sys.feature.CACHE ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'FETCH',
			Value: $sys.feature.FETCH ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'PUSH',
			Value: $sys.feature.PUSH ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'GEOLOCATION',
			Value: $sys.feature.GEOLOCATION ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'ORIENTATION',
			Value: $sys.feature.ORIENTATION ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'MOTION',
			Value: $sys.feature.MOTION ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'GYROSCOPE',
			Value: $sys.feature.GYROSCOPE ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'PROXIMITY',
			Value: $sys.feature.PROXIMITY ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'AMBIENTLIGHT',
			Value: $sys.feature.AMBIENTLIGHT ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'VIBRATION',
			Value: $sys.feature.VIBRATION ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'BATTERY',
			Value: $sys.feature.BATTERY ? 'TRUE' : 'FALSE'
		}];

		// Microsoft Internet Explorer <= 11.900.18362.0 and Microsoft EdgeHTML <= 18.18363 (64-bit) console table is broken
		// noinspection DuplicatedCode
		if ($sys.browser.isIE || $sys.browser.isEdgeHTML) {
			for (var d in dump) {
				// noinspection JSUnfilteredForInLoop
				console.log(dump[d]);
			}
		} else if (typeof console.table === 'function') {
			console.table(dump);
		}
	};

	/***
		/// No verification
		dom.loadScript.add("../js/jszip/jszip.js");
		/// Strict loading order and verification.
		dom.loadScript.add({
			strictOrder: true,
			urls: [
				{
					url: "../js/jszip/jszip.js",
					verify: "JSZip",
					onsuccess: function() {
						console.log(1)
					}
				},
				{
					url: "../inc/downloadify/js/swfobject.js",
					verify: "swfobject",
					onsuccess: function() {
						console.log(2)
					}
				}
			],
			onsuccess: function() {
				console.log(3)
			}
		});
		/// Just verification.
		dom.loadScript.add({
			url: "../js/jszip/jszip.js",
			verify: "JSZip",
			onsuccess: function() {
				console.log(1)
			}
		});
	 */

	// noinspection DuplicatedCode
	$sys.api.import = function (url, type, cb) {
		cb = typeof type === 'function' ? type : (typeof cb === 'function' ? cb : $sys.noop);

		if (url) {
			var el = null, file_type = url.split('.').pop();

			switch (file_type) {
				case 'css':
					el = global.document.createElement('link');
					el.type =  typeof type === 'string' ? type : 'text/css';
					el.rel = 'stylesheet';
					el.href = url;
					break;
				case 'js':
					el = global.document.createElement('script');
					el.type = typeof type === 'string' ? type : 'text/javascript';
					el.src = url;
					el.async = false;
					break;
				default:
					el = global.document.createElement('script');
					el.type = typeof type === 'string' ? type : 'text/javascript';
					el.src = 'assets/js/' + url + '.js';
					el.async = false;
					break;
			}

			if (el.addEventListener) {
				el.addEventListener('load', cb, false);
			} else if (el.readyState) {
				el.onreadystatechange = function() {
					if (el.readyState === 'loaded') {
						cb();
					}
				};
			}

			switch (file_type) {
				case 'css':
					global.document.head.appendChild(el);
					break;
				default:
					global.document.body.appendChild(el);
					break;
			}
		}
	};

	/***
		$sys.api.ajax({
			url: './dir/something.extension',
			data: 'test!',
			format: 'text', // text | xml | json | binary
			responseType: 'text', // arraybuffer | blob | document | json | text
			headers: {},
			withCredentials: true, // true | false
			///
			onerror: function(evt, percent) {
				console.log(evt);
			},
			onsuccess: function(evt, responseText) {
				console.log(responseText);
			},
			onprogress: function(evt, percent) {
				percent = Math.round(percent * 100);
				loader.create('thread', 'loading... ', percent);
			}
		});
	 */

	// noinspection DuplicatedCode
	$sys.api.fetch = function(opts, onsuccess, onerror, onprogress) {
		opts = typeof opts === 'string' ? { url: opts } : opts;

		// noinspection ES6ConvertVarToLetConst
		var data = opts.data;
		// noinspection ES6ConvertVarToLetConst
		var url = opts.url;
		// noinspection ES6ConvertVarToLetConst
		var method = opts.method || (opts.data ? 'POST' : 'GET');
		// noinspection ES6ConvertVarToLetConst
		var format = opts.format || 'text';
		// noinspection ES6ConvertVarToLetConst
		var headers = opts.headers;
		// noinspection ES6ConvertVarToLetConst
		var responseType = opts.responseType || 'text';
		// noinspection ES6ConvertVarToLetConst
		var withCredentials = opts.withCredentials || false;
		onsuccess = onsuccess || opts.onsuccess;
		onerror = onerror || opts.onerror;
		onprogress = onprogress || opts.onprogress;
		// noinspection ES6ConvertVarToLetConst
		var xhr = new XMLHttpRequest();
		xhr.open(method, url, true);

		if (headers) {
			// noinspection ES6ConvertVarToLetConst
			for (var type in headers) {
				// noinspection JSUnfilteredForInLoop
				xhr.setRequestHeader(type, headers[type]);
			}
		} else if (data) {
			// set the default headers for POST
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		}

		if (format === 'binary') {
			if (xhr.overrideMimeType) {
				//- default to responseType="blob" when supported
				xhr.overrideMimeType('text/plain; charset=x-user-defined');
			}
		}

		if (responseType) {
			xhr.responseType = responseType;
		}

		if (withCredentials) {
			// noinspection JSValidateTypes
			xhr.withCredentials = 'true';
		}

		if (onerror && 'onerror' in xhr) {
			xhr.onerror = onerror;
		}

		if (onprogress && xhr.upload && 'onprogress' in xhr.upload) {
			if (data) {
				xhr.upload.onprogress = function(e) {
					// noinspection JSDeprecatedSymbols
					onprogress.call(xhr, e, event.loaded / event.total);
				};
			} else {
				xhr.addEventListener('progress', function(e) {
					// noinspection ES6ConvertVarToLetConst
					var totalBytes = 0;

					if (e.lengthComputable) {
						totalBytes = e.total;
					} else if (xhr.totalBytes) {
						totalBytes = xhr.totalBytes;
					} else {
						// noinspection ES6ConvertVarToLetConst
						var rawBytes = parseInt(xhr.getResponseHeader('Content-Length-Raw'));

						if (isFinite(rawBytes)) {
							xhr.totalBytes = totalBytes = rawBytes;
						} else {
							return;
						}
					}

					onprogress.call(xhr, e, e.loaded / totalBytes);
				});
			}
		}

		xhr.onreadystatechange = function(e) {
			if (xhr.readyState === 4) { // The request is complete
				// noinspection JSUnresolvedVariable
				if (xhr.status === 200 || // Response OK
					xhr.status === 304 || // Not Modified
					xhr.status === 308 || // Permanent Redirect
					xhr.status === 0 && root.client.cordova // Cordova quirk
				) {
					if (typeof onsuccess === 'function') {
						onsuccess(e);
					}
				} else {
					onerror && onerror(e);
				}
			}
		};

		xhr.send(data);

		return xhr;
	};

	// noinspection DuplicatedCode
	$sys.api.get = function (selector) {
		if (global.document.querySelector) {
			return global.document.querySelector(selector);
		} else {
			if (selector.charAt(0) === '.') {
				if (global.document.getElementsByClassName) {
					return global.document.getElementsByClassName(selector.substr(1))[0];
				}
			}

			if (selector.charAt(0) === '#') {
				if (global.document.getElementById) {
					return global.document.getElementById(selector.substr(1));
				}
			}

			if (selector.charAt(0) !== '.' && selector.charAt(0) !== '#') {
				if (global.document.getElementsByTagName) {
					return global.document.getElementsByTagName(selector)[0];
				}
			}

			return null;
		}
	};

	$sys.api.on = function (el, eventName, eventHandler) {
		if (el) {
			if (el.addEventListener) {
				el.addEventListener(eventName, eventHandler, false);
			} else {
				// noinspection JSUnresolvedVariable
				if (el.attachEvent) {
					el.attachEvent('on' + eventName, eventHandler);
				}
			}
		}
	};

	$sys.api.get_version = function() {
		if (typeof $sys.version !== 'undefined') {
			if ($sys.version !== null && $sys.version !== '' && $sys.version !== '{{ site.github.build_revision }}') {
				return $sys.version.substring(0, 7);
			}
		}

		return 0
	}

	$sys.api.get_date = function() {
		try {
			var obj = JSON.parse($sys.date);

			if (typeof obj !== 'undefined') {
				// noinspection JSUnresolvedVariable
				if (typeof obj.pushed_at !== 'undefined') {
					// noinspection JSUnresolvedVariable
					if (obj.pushed_at !== null && obj.pushed_at !== '') {
						// noinspection JSUnresolvedVariable
						return new Date(obj.pushed_at).toLocaleString();
					}
				}
			}
		} catch (e) {}

		return new Date(0).toLocaleString();
	};

	// endregion

	$sys.api.banner();

	if (global.location.hostname === 'localhost') {
		$sys.api.dumpsystem();
	}

	var sysinit = $sys.api.get('#system');

	if (sysinit) {
		var init = sysinit.getAttribute('data-main');

		if (init) {
			$sys.api.import(init);
		}
	}

	// Export
	global.$sys = $sys;
}(this));