// noinspection DuplicatedCode
(function() {
	// Error Handling
	window.onerror = function(message, url, lineNumber) {
		//alert('Error: ' + message + ' in ' + url + ' at line ' + lineNumber);
		console.log('Error: ' + message + ' in ' + url + ' at line ' + lineNumber);
	};

	// noinspection ES6ConvertVarToLetConst
	var $sys = {
		api: {
			noop: function() {}
		},
		platform: {},
		environment: {},
		browser: {},
		feature: {},
		info: {}
	};

	// region Polyfills

	if (!('head' in document)) {
		// noinspection JSValidateTypes
		document.head = document.getElementsByTagName('head')[0];
	}

	if (typeof console === 'undefined') {
		// noinspection JSValidateTypes
		console = {
			log: $sys.api.noop,
			table: $sys.api.noop
		}
	} else if (typeof console.log !== 'function') {
		console.log = $sys.api.noop;
	} else if (typeof console.table !== 'function') {
		console.table = $sys.api.noop;
	}

	// endregion

	// region Platform

	// noinspection ES6ConvertVarToLetConst
	var platform										= typeof navigator.platform !== 'undefined' ? navigator.platform : '';
	// noinspection ES6ConvertVarToLetConst
	var browser											= typeof navigator.userAgent !== 'undefined' ? navigator.userAgent : '';
	// noinspection ES6ConvertVarToLetConst
	var version											= typeof navigator.appVersion !== 'undefined' ? navigator.appVersion : '';
	// noinspection ES6ConvertVarToLetConst
	var vendor											= typeof navigator.vendor !== 'undefined' ? navigator.vendor : '';
	// noinspection ES6ConvertVarToLetConst
	var oscpu											= typeof navigator.oscpu !== 'undefined' ? navigator.oscpu : '';

	$sys.platform.is64									= browser.indexOf('WOW64') !== -1 || browser.indexOf('Win64') !== -1 || browser.indexOf('amd64') !== -1 || browser.indexOf('x86_64') !== -1;
	$sys.platform.is32									= !$sys.platform.is64 ? (browser.indexOf('WOW32') !== -1 || browser.indexOf('Win32') !== -1 || browser.indexOf('i386') !== -1 || browser.indexOf('i686') !== -1) : false;
	$sys.platform.isWindows								= version.indexOf('Win') !== -1;
	$sys.platform.isMacOS								= version.indexOf('Mac') !== -1;
	$sys.platform.isUNIX								= version.indexOf('X11') !== -1;
	$sys.platform.isLinux								= version.indexOf('Linux') !== -1;
	$sys.platform.name									= $sys.platform.isWindows ? 'Windows' : ($sys.platform.isLinux ? 'Linux' : ($sys.platform.isUNIX ? 'UNIX' : ($sys.platform.isMacOS ? 'Mac OS' : undefined)));
	$sys.platform.version								= (function() {
		// noinspection ES6ConvertVarToLetConst
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
	$sys.browser.isChromium								= $sys.browser.isChrome && !window.chrome;
	$sys.browser.isVivaldi								= $sys.browser.isChrome && browser.indexOf('Vivaldi') !== -1;
	$sys.browser.isElectron								= $sys.browser.isChrome && browser.indexOf('Electron') !== -1;
	$sys.browser.isOperaPresto							= browser.indexOf('Opera') !== -1;
	$sys.browser.isOperaBlink							= $sys.browser.isChrome && browser.indexOf('OPR') !== -1;
	$sys.browser.isOpera								= $sys.browser.isOperaPresto || $sys.browser.isOperaBlink;
	$sys.browser.isSafari								= browser.indexOf('Safari') !== -1 && vendor === 'Apple Computer, Inc.';
	$sys.browser.isOther								= !($sys.browser.isIE || $sys.browser.isEdge || $sys.browser.isFirefox || $sys.browser.isChrome || $sys.browser.isOpera || $sys.browser.isSafari);
	$sys.browser.isMobile								= browser.indexOf('Mobi') !== -1;
	$sys.browser.isDesktop								= !$sys.browser.isMobile;
	// noinspection DuplicatedCode
	$sys.browser.name									= $sys.browser.isEdge ? 'Microsoft Edge' : ($sys.browser.isIE ? 'Microsoft Internet Explorer' : ($sys.browser.isNetscape ? 'Netscape Navigator' : ($sys.browser.isKMeleon ? 'K-Meleon' : ($sys.browser.isPaleMoon ? 'PaleMoon' : ($sys.browser.isFirefox ? 'Mozilla Firefox' : ($sys.browser.isOpera ? 'Opera' : ($sys.browser.isElectron ? 'Electron' : ($sys.browser.isVivaldi ? 'Vivaldi' : ($sys.browser.isChromium ? 'Chromium' : ($sys.browser.isChrome ? 'Google Chrome' : ($sys.browser.isSafari ? 'Apple Safari' : undefined)))))))))));
	// noinspection DuplicatedCode
	$sys.browser.version								= (function() {
		// noinspection ES6ConvertVarToLetConst
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

	$sys.environment.isBrowser							= !!(typeof window === 'object' && typeof navigator === 'object' && document);
	$sys.environment.isWorker							= typeof importScripts === 'function' && typeof postMessage === 'function' && !$sys.isBrowser;
	$sys.environment.isNode								= typeof process === 'object' && typeof require === 'function' && !$sys.isBrowser && !$sys.isWorker;
	$sys.environment.isShell							= !($sys.environment.isBrowser || $sys.environment.isWorker || $sys.environment.isNode);
	$sys.environment.name								= $sys.environment.isBrowser ? 'Browser' : ($sys.environment.isWorker ? 'Worker' : ($sys.environment.isNode ? 'Node' : 'Shell'));

	// endregion

	// region Features

	// noinspection ES6ConvertVarToLetConst
	var audio											= document.createElement('audio');
	// noinspection ES6ConvertVarToLetConst
	var canvas2D										= document.createElement('canvas');
	// noinspection ES6ConvertVarToLetConst
	var context2D										= typeof canvas2D !== 'undefined' ? (typeof canvas2D.getContext === 'function' ? canvas2D.getContext('2d') : false) : false;
	// noinspection ES6ConvertVarToLetConst
	var canvasWEBGL										= null;
	// noinspection ES6ConvertVarToLetConst
	var contextWEBGL									= false;
	// noinspection ES6ConvertVarToLetConst
	var canvasWEBGL2									= null;
	// noinspection ES6ConvertVarToLetConst
	var contextWEBGL2									= false;

	if (context2D) {
		try {
			//TODO: try to cache results to prevent Error: WebGL warning: Exceeded 16 live WebGL contexts for this principal, losing the least recently used one.
			canvasWEBGL = document.createElement('canvas');
			contextWEBGL = typeof canvasWEBGL !== 'undefined' ? (typeof canvasWEBGL.getContext === 'function' ? (canvasWEBGL.getContext('webgl') || canvasWEBGL.getContext('experimental-webgl')) : false) : false;

			if (contextWEBGL) {
				canvasWEBGL2 = document.createElement('canvas');
				contextWEBGL2 = typeof canvasWEBGL2 !== 'undefined' ? (typeof canvasWEBGL2.getContext === 'function' ? (canvasWEBGL2.getContext('webgl2') || canvasWEBGL2.getContext('experimental-webgl2')) : false) : false;
			}
		} catch (e) {}
	}

	$sys.feature.SYSTEM_FEATURE_WORKERS					= !!window.Worker;
	// noinspection JSUnresolvedVariable
	$sys.feature.SYSTEM_FEATURE_SHARED_WORKERS			= !!window.SharedWorker;
	$sys.feature.SYSTEM_FEATURE_SERVICE_WORKERS			= 'serviceWorker' in navigator;
	$sys.feature.SYSTEM_FEATURE_URL_PARSER				= (function() {
		try {
			// noinspection ES6ConvertVarToLetConst
			var root = location.protocol + '//' + location.host + '/';
			// noinspection ES6ConvertVarToLetConst
			var url = new URL(root);

			return url.href === root;
		} catch (e) {
			return false;
		}
	})();
	$sys.feature.SYSTEM_FEATURE_URL_BLOB				= $sys.feature.SYSTEM_FEATURE_URL_PARSER && 'revokeObjectURL' in URL && 'createObjectURL' in URL;
	$sys.feature.SYSTEM_FEATURE_DATA_URL				= (function() {
		function testlimit() {
			// noinspection ES6ConvertVarToLetConst
			var datauribig = new Image();

			datauribig.onerror = function() {
				$sys.feature.SYSTEM_FEATURE_DATA_URL = false;
			};

			datauribig.onload = function() {
				$sys.feature.SYSTEM_FEATURE_DATA_URL = datauribig.width === 1 && datauribig.height === 1;
			};

			// noinspection ES6ConvertVarToLetConst
			var base64str = 'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

			while (base64str.length < 63000) {
				base64str = '\r\n' + base64str;
			}

			datauribig.src = 'data:image/gif;base64,' + base64str;
		}

		// noinspection ES6ConvertVarToLetConst
		var dataurl = new Image();

		dataurl.onerror = function() {
			$sys.feature.SYSTEM_FEATURE_DATA_URL = false;
		};

		dataurl.onload = function() {
			if (dataurl.width === 1 && dataurl.height === 1) {
				testlimit();
			} else {
				$sys.feature.SYSTEM_FEATURE_DATA_URL = false;
			}
		};

		dataurl.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
	})();
	// noinspection DuplicatedCode
	$sys.feature.SYSTEM_FEATURE_TYPED_ARRAYS			= typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined' ? typeof Int8Array !== 'undefined' && typeof Uint8Array !== 'undefined' && typeof Uint8ClampedArray !== 'undefined' && typeof Int16Array !== 'undefined' && typeof Uint16Array !== 'undefined' && typeof Int32Array !== 'undefined' && typeof Uint32Array !== 'undefined' && typeof Float32Array !== 'undefined' && typeof Float64Array !== 'undefined': false;
	$sys.feature.SYSTEM_FEATURE_BIGINTS					= typeof BigInt !== 'undefined' ? typeof BigInt64Array !== 'undefined' && typeof BigUint64Array !== 'undefined' : false;
	// noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols,DuplicatedCode
	$sys.feature.SYSTEM_FEATURE_SIMD					= typeof SIMD !== 'undefined' ? typeof SIMD.Bool16x8 !== 'undefined' && typeof SIMD.Bool32x4 !== 'undefined' && typeof SIMD.Bool8x16 !== 'undefined' && typeof SIMD.Float32x4 !== 'undefined' && typeof SIMD.Int16x8 !== 'undefined' && typeof SIMD.Int32x4 !== 'undefined' && typeof SIMD.Int8x16 !== 'undefined' && typeof SIMD.Uint32x4 !== 'undefined' && typeof SIMD.Uint8x16 !== 'undefined' : false;
	$sys.feature.SYSTEM_FEATURE_ASMJS					= (function() {
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
	$sys.feature.SYSTEM_FEATURE_WEBASSEMBLY				= (function() {
		try {
			// noinspection JSUnresolvedVariable
			if (typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function') {
				// noinspection JSUnresolvedVariable,ES6ConvertVarToLetConst
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
	$sys.feature.SYSTEM_FEATURE_FULLSCREEN				= !document.documentElement.requestFullscreen ? true : !!document.documentElement.webkitRequestFullScreen || !!document.documentElement.mozRequestFullScreen || !!document.documentElement.msRequestFullscreen;
	$sys.feature.SYSTEM_FEATURE_POINTER_LOCK			= 'pointerLockElement' in document ? true : 'oPointerLockElement' in document || 'msPointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
	// noinspection JSUnresolvedVariable
	$sys.feature.SYSTEM_FEATURE_ANIMATION_FRAME			= !!window.requestAnimationFrame ? true : !!window.webkitRequestAnimationFrame || !!window.mozRequestAnimationFrame || !!window.msRequestAnimationFrame || !!window.oRequestAnimationFrame;
	// noinspection JSUnresolvedVariable
	$sys.feature.SYSTEM_FEATURE_PERFORMANCE				= !!window.performance ? true : !!window.webkitPerformance || !!window.mozPerformance || !!window.msPerformance || !!window.oPerformance;
	$sys.feature.SYSTEM_FEATURE_TIMERS					= $sys.feature.SYSTEM_FEATURE_ANIMATION_FRAME && $sys.feature.SYSTEM_FEATURE_PERFORMANCE;

	$sys.feature.SYSTEM_FEATURE_CUSTOM_ELEMENTS_V0		= 'registerElement' in document;
	$sys.feature.SYSTEM_FEATURE_CUSTOM_ELEMENTS_V1		= 'customElements' in window;
	$sys.feature.SYSTEM_FEATURE_CUSTOM_ELEMENTS			= $sys.feature.SYSTEM_FEATURE_CUSTOM_ELEMENTS_V0 || $sys.feature.SYSTEM_FEATURE_CUSTOM_ELEMENTS_V1;
	// noinspection JSUnresolvedVariable
	$sys.feature.SYSTEM_FEATURE_SHADOW_DOM_V0			= 'createShadowRoot' in document.createElement('div') || 'webkitCreateShadowRoot' in document.createElement('div') || 'mozCreateShadowRoot' in document.createElement('div');
	$sys.feature.SYSTEM_FEATURE_SHADOW_DOM_V1			= 'attachShadow' in document.createElement('div');
	$sys.feature.SYSTEM_FEATURE_SHADOW_DOM				= $sys.feature.SYSTEM_FEATURE_SHADOW_DOM_V0 || $sys.feature.SYSTEM_FEATURE_SHADOW_DOM_V1;
	$sys.feature.SYSTEM_FEATURE_HTML_IMPORTS			= 'import' in document.createElement('link');
	$sys.feature.SYSTEM_FEATURE_TEMPLATE				= 'content' in document.createElement('template');
	$sys.feature.SYSTEM_FEATURE_TEMPLATE_SLOT			= 'name' in document.createElement('slot');
	$sys.feature.SYSTEM_FEATURE_TEMPLATES				= $sys.feature.SYSTEM_FEATURE_TEMPLATE && $sys.feature.SYSTEM_FEATURE_TEMPLATE_SLOT;
	$sys.feature.SYSTEM_FEATURE_WEBCOMPONENTS_V0		= $sys.feature.SYSTEM_FEATURE_CUSTOM_ELEMENTS_V0 && $sys.feature.SYSTEM_FEATURE_SHADOW_DOM_V0 && $sys.feature.SYSTEM_FEATURE_HTML_IMPORTS;
	$sys.feature.SYSTEM_FEATURE_WEBCOMPONENTS_V1		= $sys.feature.SYSTEM_FEATURE_CUSTOM_ELEMENTS_V1 && $sys.feature.SYSTEM_FEATURE_SHADOW_DOM_V1 && $sys.feature.SYSTEM_FEATURE_TEMPLATES;
	$sys.feature.SYSTEM_FEATURE_WEBCOMPONENTS			= $sys.feature.SYSTEM_FEATURE_WEBCOMPONENTS_V0 || $sys.feature.SYSTEM_FEATURE_WEBCOMPONENTS_V1;

	$sys.feature.SYSTEM_FEATURE_SVG						= !!(document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);
	$sys.feature.SYSTEM_FEATURE_CANVAS					= !!(context2D && context2D instanceof CanvasRenderingContext2D);
	$sys.feature.SYSTEM_FEATURE_OFFSCREEN_CANVAS		= !!($sys.feature.SYSTEM_FEATURE_CANVAS && 'OffscreenCanvas' in window);
	$sys.feature.SYSTEM_FEATURE_WEBGL					= !!(contextWEBGL && contextWEBGL instanceof WebGLRenderingContext);
	// noinspection JSUnresolvedVariable
	$sys.feature.SYSTEM_FEATURE_WEBGL2					= !!(contextWEBGL2 && contextWEBGL2 instanceof WebGL2RenderingContext);
	$sys.feature.SYSTEM_FEATURE_WEBVR					= 'getVRDisplays' in navigator ? true : 'mozGetVRDevices' in navigator;
	// noinspection JSUnusedGlobalSymbols
	$sys.feature.SYSTEM_FEATURE_HTML5AUDIO				= (function() {
		try {
			// noinspection JSUnresolvedVariable
			return !!(audio.canPlayType && audio.canPlayType('audio/mpeg;').replace(/no/, ''));
		} catch(e) {
			return false;
		}
	})();
	// noinspection JSUnusedGlobalSymbols
	$sys.feature.SYSTEM_FEATURE_WEBAUDIO				= 'AudioContext' in window ? true : 'webkitAudioContext' in window || 'mozAudioContext' in window || 'oAudioContext' in window || 'msAudioContext' in window;
	// noinspection JSUnresolvedVariable
	$sys.feature.SYSTEM_FEATURE_WEBMIDI					= !!navigator.requestMIDIAccess;
	// noinspection JSUnresolvedVariable
	$sys.feature.SYSTEM_FEATURE_WEBSPEECH_RECOGNITION	= 'SpeechRecognition' in window ? true : 'webkitSpeechRecognition' in window || 'mozSpeechRecognition' in window || 'oSpeechRecognition' in window || 'msSpeechRecognition' in window;
	// noinspection JSUnresolvedVariable
	$sys.feature.SYSTEM_FEATURE_WEBSPEECH_SYNTHESIS		= 'speechSynthesis' in window ? true : 'webkitSpeechSynthesis' in window || 'mozSpeechSynthesis' in window || 'oSpeechSynthesis' in window || 'msSpeechSynthesis' in window;
	$sys.feature.SYSTEM_FEATURE_WEBSPEECH				= $sys.feature.SYSTEM_FEATURE_WEBSPEECH_RECOGNITION && $sys.feature.SYSTEM_FEATURE_WEBSPEECH_SYNTHESIS;
	// noinspection JSUnusedGlobalSymbols
	// TODO: implement check for keyboard events support assume it's there already for now
	$sys.feature.SYSTEM_FEATURE_KEYBOARD				= true;
	// noinspection JSUnresolvedVariable
	$sys.feature.SYSTEM_FEATURE_POINTER_EVENTS			= !!window.PointerEvent ? true : !!window.webkitPointerEvent || !!window.mozPointerEvent || !!window.msPointerEvent || !!window.oPointerEvent;
	// noinspection JSUnresolvedVariable
	$sys.feature.SYSTEM_FEATURE_GAMEPADS				= !!navigator.getGamepads ? true : !!navigator.webkitGetGamepads || !!navigator.mozGetGamepads || !!navigator.msGetGamepads || !!navigator.oGetGamepads;
	// noinspection JSUnresolvedVariable
	$sys.feature.SYSTEM_FEATURE_WEBSOCKETS				= (function() {
		// noinspection ES6ConvertVarToLetConst
		var protocol = 'https:' === location.protocol ? 'wss' : 'ws';

		if ('WebSocket' in window && window.WebSocket.CLOSING === 2) {
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
	$sys.feature.SYSTEM_FEATURE_SESSION_STORAGE			= (function() {
		// noinspection ES6ConvertVarToLetConst
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
	$sys.feature.SYSTEM_FEATURE_LOCAL_STORAGE			= (function() {
		// noinspection ES6ConvertVarToLetConst
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
	$sys.feature.SYSTEM_FEATURE_INDEXED_DB				= !!window.indexedDB ? true : !!window.webkitIndexedDB || !!window.mozIndexedDB || !!window.moz_indexedDB || !!window.oIndexedDB || !!window.msIndexedDB;
	$sys.feature.SYSTEM_FEATURE_WEBSQL					= !!window.openDatabase;
	$sys.feature.SYSTEM_FEATURE_CACHE					= 'caches' in window;
	$sys.feature.SYSTEM_FEATURE_FETCH					= !!window.fetch;
	$sys.feature.SYSTEM_FEATURE_PUSH					= 'PushManager' in window;
	// noinspection DuplicatedCode
	$sys.feature.SYSTEM_FEATURE_ORIENTATION				= !!window.DeviceOrientationEvent;
	$sys.feature.SYSTEM_FEATURE_GEOLOCATION				= !!navigator.geolocation;
	$sys.feature.SYSTEM_FEATURE_MOTION					= !!window.DeviceMotionEvent;
	// noinspection JSUnresolvedVariable
	$sys.feature.SYSTEM_FEATURE_GYROSCOPE				= !!window.Gyroscope;
	$sys.feature.SYSTEM_FEATURE_PROXIMITY				= 'ProximitySensor' in window;
	// noinspection JSUnresolvedVariable
	$sys.feature.SYSTEM_FEATURE_AMBIENTLIGHT			= !!window.AmbientLightSensor;
	$sys.feature.SYSTEM_FEATURE_VIBRATION				= 'vibrate' in navigator;
	// noinspection JSUnresolvedVariable
	$sys.feature.SYSTEM_FEATURE_BATTERY					= !!navigator.getBattery ? true : !!navigator.battery || !!navigator.mozBattery;
	// TODO: implement check for Generic Sensor API

	$sys.feature.SYSTEM_FEATURE_CSS_VARIABLES			= window.CSS && CSS.supports('color', 'var(--fake-var)');

	$sys.feature.SYSTEM_FEATURE_ES3_BASE64				= 'btoa' in window && 'atob' in window;
	$sys.feature.SYSTEM_FEATURE_ES3						= $sys.feature.SYSTEM_FEATURE_ES3_BASE64;

	$sys.feature.SYSTEM_FEATURE_ES5_STRICT_MODE			= (function() {'use strict'; return !this; })();
	$sys.feature.SYSTEM_FEATURE_ES5_XHR					= 'XMLHttpRequest' in window && 'prototype' in window.XMLHttpRequest && 'addEventListener' in window.XMLHttpRequest.prototype;
	$sys.feature.SYSTEM_FEATURE_ES5_JSON				= 'JSON' in window && 'parse' in JSON && 'stringify' in JSON;
	$sys.feature.SYSTEM_FEATURE_ES5_SYNTAX				= (function() {
		// noinspection ES6ConvertVarToLetConst
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
	$sys.feature.SYSTEM_FEATURE_ES5_UNDEFINED			= (function() {
		// noinspection ES6ConvertVarToLetConst
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
	$sys.feature.SYSTEM_FEATURE_ES5_ARRAY				= !!(Array.prototype && Array.prototype.every && Array.prototype.filter && Array.prototype.forEach && Array.prototype.indexOf && Array.prototype.lastIndexOf && Array.prototype.map && Array.prototype.some && Array.prototype.reduce && Array.prototype.reduceRight && Array.isArray);
	$sys.feature.SYSTEM_FEATURE_ES5_DATE				= (function() {
		// noinspection ES6ConvertVarToLetConst
		var isoDate = '2013-04-12T06:06:37.307Z', canParseISODate = false;

		try {
			canParseISODate = !!Date.parse(isoDate);
		} catch (e) {}

		return !!(Date.now && Date.prototype && Date.prototype.toISOString && Date.prototype.toJSON && canParseISODate);
	})();
	$sys.feature.SYSTEM_FEATURE_ES5_FUNCTION			= !!(Function.prototype && Function.prototype.bind);
	$sys.feature.SYSTEM_FEATURE_ES5_OBJECT				= !!(Object.keys && Object.create && Object.getPrototypeOf && Object.getOwnPropertyNames && Object.isSealed && Object.isFrozen && Object.isExtensible && Object.getOwnPropertyDescriptor && Object.defineProperty && Object.defineProperties && Object.seal && Object.freeze && Object.preventExtensions);
	$sys.feature.SYSTEM_FEATURE_ES5_STRING				= !!(String.prototype && String.prototype.trim);
	$sys.feature.SYSTEM_FEATURE_ES5_GETSET				= (function() {
		// noinspection ES6ConvertVarToLetConst
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
	$sys.feature.SYSTEM_FEATURE_ES5						= !!($sys.feature.SYSTEM_FEATURE_ES3 && $sys.feature.SYSTEM_FEATURE_ES5_STRICT_MODE && $sys.feature.SYSTEM_FEATURE_ES5_XHR && $sys.feature.SYSTEM_FEATURE_ES5_JSON && $sys.feature.SYSTEM_FEATURE_ES5_SYNTAX && $sys.feature.SYSTEM_FEATURE_ES5_UNDEFINED && $sys.feature.SYSTEM_FEATURE_ES5_ARRAY && $sys.feature.SYSTEM_FEATURE_ES5_DATE && $sys.feature.SYSTEM_FEATURE_ES5_FUNCTION && $sys.feature.SYSTEM_FEATURE_ES5_OBJECT && $sys.feature.SYSTEM_FEATURE_ES5_STRING);

	// noinspection JSUnresolvedVariable,DuplicatedCode
	$sys.feature.SYSTEM_FEATURE_ES6_NUMBER				= !!(Number.isFinite && Number.isInteger && Number.isSafeInteger && Number.isNaN && Number.parseInt && Number.parseFloat && Number.isInteger(Number.MAX_SAFE_INTEGER) && Number.isInteger(Number.MIN_SAFE_INTEGER) && Number.isFinite(Number.EPSILON));
	// noinspection JSUnresolvedVariable
	$sys.feature.SYSTEM_FEATURE_ES6_MATH				= !!(Math && Math.clz32 && Math.cbrt && Math.imul && Math.sign && Math.log10 && Math.log2 && Math.log1p && Math.expm1 && Math.cosh && Math.sinh && Math.tanh && Math.acosh && Math.asinh && Math.atanh && Math.hypot && Math.trunc && Math.fround);
	$sys.feature.SYSTEM_FEATURE_ES6_ARRAY				= !!(Array.prototype && Array.prototype.copyWithin && Array.prototype.fill && Array.prototype.find && Array.prototype.findIndex && Array.prototype.keys && Array.prototype.entries && Array.prototype.values && Array.from && Array.of);
	$sys.feature.SYSTEM_FEATURE_ES6_FUNCTION			= (function() {
		try {
			eval('()=>{}');
		} catch (e) {
			return false;
		}
		return true;
	})();
	// noinspection JSUnresolvedVariable
	$sys.feature.SYSTEM_FEATURE_ES6_OBJECT				= !!(Object.assign && Object.is && Object.setPrototypeOf);
	// noinspection JSUnresolvedVariable
	$sys.feature.SYSTEM_FEATURE_ES6_CLASS				= (function() {
		try {
			eval('class C{}');
		} catch (e) {
			return false;
		}
		return true;
	})();
	// noinspection JSUnresolvedVariable
	$sys.feature.SYSTEM_FEATURE_ES6_STRING				= !!(String.fromCodePoint && String.raw && String.prototype.codePointAt && String.prototype.repeat && String.prototype.startsWith && String.prototype.endsWith && (String.prototype.includes || String.prototype.contains));
	// noinspection JSUnresolvedVariable
	$sys.feature.SYSTEM_FEATURE_ES6_COLLECTIONS			= !!(window.Map && window.Set && window.WeakMap && window.WeakSet);
	$sys.feature.SYSTEM_FEATURE_ES6_GENERATORS			= (function() {
		try {
			new Function('function* test() {}')();
		} catch (e) {
			return false;
		}
		return true;
	})();
	$sys.feature.SYSTEM_FEATURE_ES6_PROMISES			= (function() {
		return 'Promise' in window && 'resolve' in window.Promise && 'reject' in window.Promise && 'all' in window.Promise && 'race' in window.Promise && (function() {
			// noinspection ES6ConvertVarToLetConst
			var resolve;
			// noinspection JSIgnoredPromiseFromCall
			new window.Promise(function(r) { resolve = r; });
			return typeof resolve === 'function';
		}());
	})();
	$sys.feature.SYSTEM_FEATURE_ES6_STATIC_MODULES		= (function() {
		try {
			new Function('import("")');
			return true;
		} catch (err) {
			return false;
		}
	})();
	$sys.feature.SYSTEM_FEATURE_ES6_DYNAMIC_MODULES		= 'noModule' in document.createElement('script');
	$sys.feature.SYSTEM_FEATURE_ES6_MODULES				= $sys.feature.SYSTEM_FEATURE_ES6_STATIC_MODULES && $sys.feature.SYSTEM_FEATURE_ES6_DYNAMIC_MODULES;
	$sys.feature.SYSTEM_FEATURE_ES6						= $sys.feature.SYSTEM_FEATURE_ES5 && $sys.feature.SYSTEM_FEATURE_ES6_NUMBER && $sys.feature.SYSTEM_FEATURE_ES6_MATH && $sys.feature.SYSTEM_FEATURE_ES6_ARRAY && $sys.feature.SYSTEM_FEATURE_ES6_FUNCTION && $sys.feature.SYSTEM_FEATURE_ES6_OBJECT && $sys.feature.SYSTEM_FEATURE_ES6_CLASS && $sys.feature.SYSTEM_FEATURE_ES6_STRING && $sys.feature.SYSTEM_FEATURE_ES6_COLLECTIONS && $sys.feature.SYSTEM_FEATURE_ES6_GENERATORS && $sys.feature.SYSTEM_FEATURE_ES6_PROMISES && ($sys.feature.SYSTEM_FEATURE_ES6_STATIC_MODULES || $sys.feature.SYSTEM_FEATURE_ES6_DYNAMIC_MODULES);

	$sys.feature.SYSTEM_FEATURE_ES7_ASYNC_AWAIT			= (function() {
		// noinspection ES6ConvertVarToLetConst
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

	$sys.info.SYSTEM_INFO_OS							= $sys.platform.name;
	$sys.info.SYSTEM_INFO_OS_VERSION					= $sys.platform.version;
	$sys.info.SYSTEM_INFO_ENVIRONMENT					= $sys.environment.name;
	$sys.info.SYSTEM_INFO_BROWSER						= $sys.browser.name;
	$sys.info.SYSTEM_INFO_BROWSER_VERSION				= $sys.browser.version;

	$sys.info.SYSTEM_INFO_CPU_LITTLE_ENDIAN				= ($sys.feature.SYSTEM_FEATURE_TYPED_ARRAYS ? (function() {
		// noinspection ES6ConvertVarToLetConst
		var buffer = new ArrayBuffer(2);
		new DataView(buffer).setUint16(0, 256, true);

		return new Uint16Array(buffer)[0] === 256;
	})() : true);
	// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
	$sys.info.SYSTEM_INFO_CPU_BIG_ENDIAN				= typeof $sys.info.SYSTEM_INFO_CPU_LITTLE_ENDIAN !== 'undefined' ? !$sys.info.SYSTEM_INFO_CPU_LITTLE_ENDIAN : false;
	// noinspection JSUnusedGlobalSymbols
	$sys.info.SYSTEM_INFO_CPU_ENDIANNESS				= typeof $sys.info.SYSTEM_INFO_CPU_LITTLE_ENDIAN !== 'undefined' ? ($sys.info.SYSTEM_INFO_CPU_LITTLE_ENDIAN ? 'Little-endian' : 'Big-endian') : 'Little-endian';
	// noinspection JSUnusedGlobalSymbols
	$sys.info.SYSTEM_INFO_CPU_CORES						= !navigator.hardwareConcurrency ? '≥ 1' : navigator.hardwareConcurrency;
	// noinspection JSUnusedGlobalSymbols
	$sys.info.SYSTEM_INFO_CPU_ARCH						= $sys.platform.is64 ? '64-bit' : '32-bit';
	// noinspection JSUnresolvedVariable
	$sys.info.SYSTEM_INFO_RAM							= !navigator.deviceMemory ? '≤ 1GB' : '≥' + navigator.deviceMemory + 'GB';
	// noinspection JSUnusedGlobalSymbols
	$sys.info.SYSTEM_INFO_VIDEO_ACCELERATION			= $sys.feature.SYSTEM_FEATURE_WEBGL || $sys.feature.SYSTEM_FEATURE_WEBGL2 ? '3D' : ($sys.feature.SYSTEM_FEATURE_CANVAS ? '2D' : false);
	// noinspection JSUnusedGlobalSymbols
	$sys.info.SYSTEM_INFO_GPU							= (function() {
		if (contextWEBGL) {
			if (typeof contextWEBGL.getSupportedExtensions === 'function') {
				if (contextWEBGL.getSupportedExtensions().indexOf('WEBGL_debug_renderer_info') !== -1) {
					// noinspection ES6ConvertVarToLetConst
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
		console.log('╔═╗╔╦╗╦ ╦╔═╗╔═╗╔╦═╗╦╔═╗\n' +
					'╠═ ║║║║ ║╠═╝╠═  ║ ║║╠═╣\n' +
					'╚═╝╩ ╩╚═╝╩  ╚═╝═╩═╝╩╩ ╩');
	}();

	// noinspection JSUnusedLocalSymbols,DuplicatedCode
	$sys.api.dumpsystem = function() {
		// noinspection DuplicatedCode,ES6ConvertVarToLetConst
		var dump = [{
			Feature: 'SYSTEM_INFO_OS',
			Value: $sys.info.SYSTEM_INFO_OS + ' ' + $sys.info.SYSTEM_INFO_OS_VERSION
		} , {
			Feature: 'SYSTEM_INFO_ENVIRONMENT',
			Value: $sys.info.SYSTEM_INFO_ENVIRONMENT
		} , {
			Feature: 'SYSTEM_INFO_BROWSER',
			Value: $sys.info.SYSTEM_INFO_BROWSER + ' ' + $sys.info.SYSTEM_INFO_BROWSER_VERSION + ' (' + $sys.info.SYSTEM_INFO_CPU_ARCH + ')'
		} , {
			Feature: 'SYSTEM_INFO_CPU_ENDIANNESS',
			Value: $sys.info.SYSTEM_INFO_CPU_ENDIANNESS
		} , {
			Feature: 'SYSTEM_INFO_CPU_CORES',
			Value: $sys.info.SYSTEM_INFO_CPU_CORES
		} , {
			Feature: 'SYSTEM_INFO_CPU_ARCH',
			Value: $sys.info.SYSTEM_INFO_CPU_ARCH
		} , {
			Feature: 'SYSTEM_INFO_RAM',
			Value: $sys.info.SYSTEM_INFO_RAM
		} , {
			Feature: 'SYSTEM_INFO_GPU',
			Value: $sys.info.SYSTEM_INFO_GPU
		} , {
			Feature: 'SYSTEM_INFO_VIDEO_ACCELERATION',
			Value: $sys.info.SYSTEM_INFO_VIDEO_ACCELERATION
		} , {
			Feature: 'SYSTEM_FEATURE_CSS_VARIABLES',
			Value: $sys.feature.SYSTEM_FEATURE_CSS_VARIABLES ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES3_BASE64',
			Value: $sys.feature.SYSTEM_FEATURE_ES3_BASE64 ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES3',
			Value: $sys.feature.SYSTEM_FEATURE_ES3 ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES5_STRICT_MODE',
			Value: $sys.feature.SYSTEM_FEATURE_ES5_STRICT_MODE ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES5_XHR',
			Value: $sys.feature.SYSTEM_FEATURE_ES5_XHR ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES5_JSON',
			Value: $sys.feature.SYSTEM_FEATURE_ES5_JSON ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES5_SYNTAX',
			Value: $sys.feature.SYSTEM_FEATURE_ES5_SYNTAX ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES5_UNDEFINED',
			Value: $sys.feature.SYSTEM_FEATURE_ES5_UNDEFINED ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES5_ARRAY',
			Value: $sys.feature.SYSTEM_FEATURE_ES5_ARRAY ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES5_DATE',
			Value: $sys.feature.SYSTEM_FEATURE_ES5_DATE ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES5_FUNCTION',
			Value: $sys.feature.SYSTEM_FEATURE_ES5_FUNCTION ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES5_OBJECT',
			Value: $sys.feature.SYSTEM_FEATURE_ES5_OBJECT ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES5_STRING',
			Value: $sys.feature.SYSTEM_FEATURE_ES5_STRING ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES5_GETSET',
			Value: $sys.feature.SYSTEM_FEATURE_ES5_GETSET ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES5',
			Value: $sys.feature.SYSTEM_FEATURE_ES5 ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES6_NUMBER',
			Value: $sys.feature.SYSTEM_FEATURE_ES6_NUMBER ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES6_MATH',
			Value: $sys.feature.SYSTEM_FEATURE_ES6_MATH ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES6_ARRAY',
			Value: $sys.feature.SYSTEM_FEATURE_ES6_ARRAY ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES6_FUNCTION',
			Value: $sys.feature.SYSTEM_FEATURE_ES6_FUNCTION ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES6_OBJECT',
			Value: $sys.feature.SYSTEM_FEATURE_ES6_OBJECT ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES6_STRING',
			Value: $sys.feature.SYSTEM_FEATURE_ES6_STRING ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES6_COLLECTIONS',
			Value: $sys.feature.SYSTEM_FEATURE_ES6_COLLECTIONS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES6_GENERATORS',
			Value: $sys.feature.SYSTEM_FEATURE_ES6_GENERATORS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES6_PROMISES',
			Value: $sys.feature.SYSTEM_FEATURE_ES6_PROMISES ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES6_CLASS',
			Value: $sys.feature.SYSTEM_FEATURE_ES6_CLASS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES6_STATIC_MODULES',
			Value: $sys.feature.SYSTEM_FEATURE_ES6_STATIC_MODULES ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES6_DYNAMIC_MODULES',
			Value: $sys.feature.SYSTEM_FEATURE_ES6_DYNAMIC_MODULES ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES6_MODULES',
			Value: $sys.feature.SYSTEM_FEATURE_ES6_MODULES ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES6',
			Value: $sys.feature.SYSTEM_FEATURE_ES6 ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES7_ASYNC_AWAIT',
			Value: $sys.feature.SYSTEM_FEATURE_ES7_ASYNC_AWAIT ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_WORKERS',
			Value: $sys.feature.SYSTEM_FEATURE_WORKERS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_SHARED_WORKERS',
			Value: $sys.feature.SYSTEM_FEATURE_SHARED_WORKERS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_SERVICE_WORKERS',
			Value: $sys.feature.SYSTEM_FEATURE_SERVICE_WORKERS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_TYPED_ARRAYS',
			Value: $sys.feature.SYSTEM_FEATURE_TYPED_ARRAYS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_URL_PARSER',
			Value: $sys.feature.SYSTEM_FEATURE_URL_PARSER ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_URL_BLOB',
			Value: $sys.feature.SYSTEM_FEATURE_URL_BLOB ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_DATA_URL',
			Value: $sys.feature.SYSTEM_FEATURE_DATA_URL ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_BIGINTS',
			Value: $sys.feature.SYSTEM_FEATURE_BIGINTS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_SIMD',
			Value: $sys.feature.SYSTEM_FEATURE_SIMD ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ASMJS',
			Value: $sys.feature.SYSTEM_FEATURE_ASMJS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_WEBASSEMBLY',
			Value: $sys.feature.SYSTEM_FEATURE_WEBASSEMBLY ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_FULLSCREEN',
			Value: $sys.feature.SYSTEM_FEATURE_FULLSCREEN ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_POINTER_LOCK',
			Value: $sys.feature.SYSTEM_FEATURE_POINTER_LOCK ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_TIMERS',
			Value: $sys.feature.SYSTEM_FEATURE_TIMERS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_WEBCOMPONENTS',
			Value: $sys.feature.SYSTEM_FEATURE_WEBCOMPONENTS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_CANVAS',
			Value: $sys.feature.SYSTEM_FEATURE_CANVAS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_OFFSCREEN_CANVAS',
			Value: $sys.feature.SYSTEM_FEATURE_OFFSCREEN_CANVAS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_SVG',
			Value: $sys.feature.SYSTEM_FEATURE_SVG ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_WEBGL',
			Value: $sys.feature.SYSTEM_FEATURE_WEBGL ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_WEBGL2',
			Value: $sys.feature.SYSTEM_FEATURE_WEBGL2 ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_WEBVR',
			Value: $sys.feature.SYSTEM_FEATURE_WEBVR ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_HTML5AUDIO',
			Value: $sys.feature.SYSTEM_FEATURE_HTML5AUDIO ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_WEBAUDIO',
			Value: $sys.feature.SYSTEM_FEATURE_WEBAUDIO ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_WEBMIDI',
			Value: $sys.feature.SYSTEM_FEATURE_WEBMIDI ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_KEYBOARD',
			Value: $sys.feature.SYSTEM_FEATURE_KEYBOARD ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_POINTER_EVENTS',
			Value: $sys.feature.SYSTEM_FEATURE_POINTER_EVENTS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_GAMEPADS',
			Value: $sys.feature.SYSTEM_FEATURE_GAMEPADS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_WEBSOCKETS',
			Value: $sys.feature.SYSTEM_FEATURE_WEBSOCKETS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_SESSION_STORAGE',
			Value: $sys.feature.SYSTEM_FEATURE_SESSION_STORAGE ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_LOCAL_STORAGE',
			Value: $sys.feature.SYSTEM_FEATURE_LOCAL_STORAGE ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_INDEXED_DB',
			Value: $sys.feature.SYSTEM_FEATURE_INDEXED_DB ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_WEBSQL',
			Value: $sys.feature.SYSTEM_FEATURE_WEBSQL ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_CACHE',
			Value: $sys.feature.SYSTEM_FEATURE_CACHE ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_FETCH',
			Value: $sys.feature.SYSTEM_FEATURE_FETCH ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_PUSH',
			Value: $sys.feature.SYSTEM_FEATURE_PUSH ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_GEOLOCATION',
			Value: $sys.feature.SYSTEM_FEATURE_GEOLOCATION ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ORIENTATION',
			Value: $sys.feature.SYSTEM_FEATURE_ORIENTATION ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_MOTION',
			Value: $sys.feature.SYSTEM_FEATURE_MOTION ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_GYROSCOPE',
			Value: $sys.feature.SYSTEM_FEATURE_GYROSCOPE ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_PROXIMITY',
			Value: $sys.feature.SYSTEM_FEATURE_PROXIMITY ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_AMBIENTLIGHT',
			Value: $sys.feature.SYSTEM_FEATURE_AMBIENTLIGHT ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_VIBRATION',
			Value: $sys.feature.SYSTEM_FEATURE_VIBRATION ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_BATTERY',
			Value: $sys.feature.SYSTEM_FEATURE_BATTERY ? 'TRUE' : 'FALSE'
		}];

		// Microsoft EdgeHTML <= 18.18362 (64-bit) cannot list more than 50 items in a table
		// noinspection DuplicatedCode
		if ($sys.browser.isEdgeHTML) {
			// noinspection ES6ConvertVarToLetConst
			var chunks = function(array, size) {
				// noinspection ES6ConvertVarToLetConst
				var results = [];

				while (array.length) {
					results.push(array.splice(0, size));
				}

				return results;
			};
			dump = chunks(dump, 50);

			// noinspection ES6ConvertVarToLetConst
			for (var d in dump) {
				// noinspection JSUnfilteredForInLoop
				console.table(dump[d]);
			}
		} else {
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

		// noinspection DuplicatedCode
		if (url) {
			// noinspection ES6ConvertVarToLetConst
			var el = null, file_type = url.split('.').pop();

			switch (file_type) {
				case 'js':
					el = document.createElement('script');
					el.type = typeof type === 'string' ? type : 'text/javascript';
					el.src = url;
					el.async = false;
					break;
				case 'css':
					el = document.createElement('link');
					el.type =  typeof type === 'string' ? type : 'text/css';
					el.rel = 'stylesheet';
					el.href = url;
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
				case 'js':
					document.body.appendChild(el);
					break;
				case 'css':
					document.head.appendChild(el);
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
		opts = typeof opts === 'string' ? {url: opts} : opts;

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
				if (xhr.status === 200 || // Response OK
					xhr.status === 304 || // Not Modified
					xhr.status === 308 || // Permanent Redirect
					xhr.status === 0 && root.client.cordova // Cordova quirk
				) {
					if (onsuccess) {
						// noinspection ES6ConvertVarToLetConst
						var res;

						if (format === 'xml') {
							// noinspection JSUnresolvedVariable
							res = e.target.responseXML;
						} else if (format === 'text') {
							// noinspection JSUnresolvedVariable
							res = e.target.responseText;
						} else if (format === 'json') {
							try {
								// noinspection JSUnresolvedVariable
								res = JSON.parse(e.target.response);
							} catch(err) {
								onerror && onerror.call(xhr, e);
							}
						}
						onsuccess.call(xhr, e, res);
					}
				} else {
					onerror && onerror.call(xhr, e);
				}
			}
		};

		xhr.send(data);

		return xhr;
	};

	// noinspection DuplicatedCode
	$sys.api.get = function (selector) {
		if (document.querySelector) {
			// noinspection JSUnusedGlobalSymbols
			return document.querySelector(selector);
		} else {
			if (selector.charAt(0) === '.') {
				if (document.getElementsByClassName) {
					return document.getElementsByClassName(selector.substr(1))[0];
				}
			}

			if (selector.charAt(0) === '#') {
				if (document.getElementById) {
					return document.getElementById(selector.substr(1));
				}
			}

			if (selector.charAt(0) !== '.' && selector.charAt(0) !== '#') {
				if (document.getElementsByTagName) {
					return document.getElementsByTagName(selector)[0];
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

	// endregion

	// region Init

	if (!$sys.feature.SYSTEM_FEATURE_ES6 && !$sys.feature.SYSTEM_FEATURE_WEBCOMPONENTS_V1) {
		$sys.api.import('js/polyfills/es7-babel-polyfill-7.8.0.min.js', function() {
			$sys.api.import('js/libraries/babel-standalone-7.8.2.min.js', function() {
				$sys.api.import('js/polyfills/es6-web-components-2.4.1.min.js', function() {
					$sys.api.import('js/libraries/hybrids-4.0.4.min.js', function() {
						$sys.api.hybrids = hybrids;
						$sys.api.import('js/components/main.js');
					});
				});
			});
		});
	} else if (!$sys.feature.SYSTEM_FEATURE_WEBCOMPONENTS_V1) {
		$sys.api.import('js/polyfills/es6-web-components-2.4.1.min.js', function() {
			$sys.api.import('js/libraries/hybrids-4.0.4.min.js', function() {
				$sys.api.hybrids = hybrids;
				$sys.api.import('js/components/main.js');
			});
		});
	} else {
		$sys.api.import('js/libraries/hybrids-4.0.4.min.js', function() {
			$sys.api.hybrids = hybrids;
			$sys.api.import('js/components/main.js');
		});
	}

	// endregion

	// Export
	window.$sys = $sys;
})();