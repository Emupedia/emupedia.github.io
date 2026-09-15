// region Polyfills

// region Console

// IE 11.592.18362.0
if (typeof console !== 'undefined') {
	if (!console.table) {
		// noinspection DuplicatedCode
		console.table = function(arr) {
			var i, obj, keys, arr_len = arr.length;

			for (i = 0; i < arr_len; i++) {
				obj = arr[i];
				keys = Object.keys(obj);
				console.log(obj[keys[0]] + ': ' + obj[keys[1]]);
			}
		};
	}
} else {
	if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document) {
		// Browser
		// noinspection JSValidateTypes
		console = {
			log: function() {},
			table: function() {}
		};
	} else if (typeof postMessage !== 'undefined') {
		// Worker
		// Safari 5.1.7 (7534.57.2)
		// noinspection JSValidateTypes,DuplicatedCode
		console = {
			log: function (str) {
				//noinspection JSCheckFunctionSignatures
				postMessage(str);
			},
			table: function (arr) {
				var i, obj, keys, arr_len = arr.length;

				for (i = 0; i < arr_len; i++) {
					obj = arr[i];
					keys = Object.keys(obj);
					console.log(obj[keys[0]] + ': ' + obj[keys[1]]);
				}
			}
		};
	}
}

// endregion

// region Misc

if (!('head' in document)) {
	// noinspection JSValidateTypes
	document.head = document.getElementsByTagName('head')[0];
}

// endregion

// region Events

// defaultPrevented is broken in IE.
// https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
var workingDefaultPrevented = (function() {
	var e = document.createEvent('Event');
	e.initEvent('foo', true, true);
	e.preventDefault();
	return e.defaultPrevented;
})();

if (!workingDefaultPrevented) {
	var origPreventDefault = Event.prototype.preventDefault;
	Event.prototype.preventDefault = function() {
		if (!this.cancelable) {
			return;
		}

		origPreventDefault.call(this);

		Object.defineProperty(this, 'defaultPrevented', {
			get: function() {
				return true;
			},
			configurable: true
		});
	};
}

// Event constructor shim
if (!window.Event || window.isIE && (typeof window.Event !== 'function')) {
	var origEvent = window.Event;
	/**
	 * @param {!string} inType
	 * @param {?(EventInit)=} params
	 */
	window.Event = function(inType, params) {
		params = params || {};
		var e = document.createEvent('Event');
		e.initEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable));
		return e;
	};

	if (origEvent) {
		// noinspection JSDuplicatedDeclaration
		for (var i in origEvent) {
			// noinspection JSUnfilteredForInLoop
			window.Event[i] = origEvent[i];
		}

		window.Event.prototype = origEvent.prototype;
	}
}

// CustomEvent constructor shim
if (!window.CustomEvent || window.isIE && (typeof window.CustomEvent !== 'function')) {
	// noinspection JSValidateTypes
	window.CustomEvent = function(inType, params) {
		params = params || {};
		var e = /** @type {!CustomEvent} */ (document.createEvent('CustomEvent'));
		e.initCustomEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
		return e;
	};

	window.CustomEvent.prototype = window.Event.prototype;
}

if (!window.MouseEvent || window.isIE && (typeof window.MouseEvent !== 'function')) {
	var origMouseEvent = window.MouseEvent;

	// noinspection JSValidateTypes
	window.MouseEvent = function(inType, params) {
		params = params || {};
		var e = document.createEvent('MouseEvent');
		e.initMouseEvent(inType,
			Boolean(params.bubbles), Boolean(params.cancelable),
			params.view || window, params.detail,
			params.screenX, params.screenY, params.clientX, params.clientY,
			params.ctrlKey, params.altKey, params.shiftKey, params.metaKey,
			params.button, params.relatedTarget);
		return e;
	};

	if (origMouseEvent) {
		// noinspection JSDuplicatedDeclaration
		for (var i in origMouseEvent) {
			// noinspection JSUnfilteredForInLoop
			window.MouseEvent[i] = origMouseEvent[i];
		}
	}

	window.MouseEvent.prototype = origMouseEvent.prototype;
}

// endregion

// region Base64

if (typeof atob === 'undefined') {
	// noinspection DuplicatedCode
	atob = function(input) {
		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
		// noinspection JSCheckFunctionSignatures
		var str = String(input).replace(/[=]+$/, '');

		if (str.length % 4 === 1) {
			throw "'atob' failed: The string to be decoded is not correctly encoded.";
		}
		// noinspection JSAssignmentUsedAsCondition,CommaExpressionJS,JSUnusedAssignment
		for (var bc = 0, bs, buffer, idx = 0, output = ''; buffer = str.charAt(idx++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
			buffer = chars.indexOf(buffer);
		}

		return output;
	}
}

if (typeof btoa === 'undefined') {
	// noinspection DuplicatedCode
	btoa = function(input) {
		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
		// noinspection JSCheckFunctionSignatures
		var str = String(input);
		// noinspection JSAssignmentUsedAsCondition,CommaExpressionJS
		for (var block, charCode, idx = 0, map = chars, output = ''; str.charAt(idx | 0) || (map = '=', idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
			charCode = str.charCodeAt(idx += 3 / 4);

			if (charCode > 0xFF) {
				throw "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.";
			}

			// noinspection JSUnusedAssignment
			block = block << 8 | charCode;
		}

		return output;
	}
}

// endregion

// region Math

if (typeof Number.EPSILON === 'undefined') {
	Number.EPSILON = 2.7755575615628914e-17;
}

if (typeof Number.MIN_SAFE_INTEGER === 'undefined') {
	Number.MIN_SAFE_INTEGER = -9007199254740991;
}

if (typeof Number.MAX_SAFE_INTEGER === 'undefined') {
	Number.MAX_SAFE_INTEGER = 9007199254740991;
}

if (typeof Number.isNaN === 'undefined') {
	Number.isNaN = function(value) {
		// noinspection EqualityComparisonWithCoercionJS
		return value !== null && (value != value || +value != value);
	};
}

if (typeof Number.isFinite === 'undefined') {
	Number.isFinite = function(value) {
		return typeof value === 'number' && isFinite(value);
	};
}

if (typeof Number.isInteger === 'undefined') {
	Number.isInteger = function(value) {
		return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
	};
}

if (typeof Number.isSafeInteger === 'undefined') {
	Number.isSafeInteger = function (value) {
		return Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
	};
}

if (typeof Math.imul === 'undefined') {
	function ToUint32(argument) {
		var number = Number(argument);

		if (isNaN(number) || 1 / number === Infinity || 1 / number === -Infinity || number === Infinity || number === -Infinity) {
			// noinspection JSConstructorReturnsPrimitive
			return 0;
		}

		var int = ((number < 0) ? -1 : 1) * Math.floor(Math.abs(number));
		// noinspection UnnecessaryLocalVariableJS
		var int32bit = int >>> 0;
		// noinspection JSConstructorReturnsPrimitive
		return int32bit;
	}

	Math.imul = function(x, y) {
		var a = ToUint32(x);
		var b = ToUint32(y);
		var UINT16 = 0xffff;
		var aHigh = a >>> 16 & UINT16;
		var aLow = UINT16 & a;
		var bHigh = b >>> 16 & UINT16;
		var bLow = UINT16 & b;

		return aLow * bLow + (aHigh * bLow + aLow * bHigh << 16 >>> 0) | 0;
	};
}

// endregion

// region String

if (!String.prototype.trim) {
	console.log('String.prototype.trim trim loaded!');
	String.prototype.trim = function() {
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
}

// IE 11.592.18362.0
if (!String.prototype.startsWith) {
	console.log('String.prototype.startsWith polyfill loaded!');
	String.prototype.startsWith = function(search, pos) {
		return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
	};
}

// IE 11.592.18362.0
if (!String.prototype.endsWith) {
	console.log('String.prototype.endsWith polyfill loaded!');
	String.prototype.endsWith = function(search, this_len) {
		if (this_len === undefined || this_len > this.length) {
			this_len = this.length;
		}

		return this.substring(this_len - search.length, this_len) === search;
	};
}

// IE 11.592.18362.0
if (!String.prototype.repeat) {
	console.log('String.prototype.repeat polyfill loaded!');
	String.prototype.repeat = function(count) {
		'use strict';

		if (this === null) {
			throw new TypeError('can\'t convert ' + this + ' to object');
		}

		var str = '' + this;

		count = +count;

		if (count !== count) {
			count = 0;
		}

		if (count < 0) {
			throw new RangeError('repeat count must be non-negative');
		}

		if (count === Infinity) {
			throw new RangeError('repeat count must be less than infinity');
		}

		count = Math.floor(count);

		if (str.length === 0 || count === 0) {
			return '';
		}

		if (str.length * count >= 1 << 28) {
			throw new RangeError('repeat count must not overflow maximum string size');
		}
		var rpt = '';

		for (var i = 0; i < count; i++) {
			rpt += str;
		}

		return rpt;
	}
}

// IE 11.592.18362.0
if (!String.prototype.padStart) {
	console.log('String.prototype.padStart polyfill loaded!');
	String.prototype.padStart = function padStart(targetLength, padString) {
		targetLength = targetLength >> 0;
		padString = String((typeof padString !== 'undefined' ? padString : ' '));

		if (this.length > targetLength) {
			return String(this);
		} else {
			targetLength = targetLength - this.length;

			if (targetLength > padString.length) {
				// noinspection JSValidateTypes
				padString += padString.repeat(targetLength/padString.length);
			}

			return padString.slice(0, targetLength) + String(this);
		}
	};
}

// IE 11.592.18362.0
if (!String.prototype.includes) {
	console.log('String.prototype.includes polyfill loaded!');
	String.prototype.includes = function(search, start) {
		if (search instanceof RegExp) {
			throw TypeError('first argument must not be a RegExp');
		}

		if (start === undefined) {
			start = 0;
		}

		return this.indexOf(search, start) !== -1;
	};
}

// endregion

// region Array

if (typeof Array.isArray === 'undefined') {
	console.log('Array.isArray polyfill loaded!');
	// noinspection JSValidateTypes
	Array.isArray = function(arr) {
		return Object.prototype.toString.call(arr) === '[object Array]';
	}
}

if (!Array.prototype.find) {
	console.log('Array.find polyfill loaded!');
	Array.prototype.find = function (callback) {
		if (this === null) {
			throw new TypeError('Array.prototype.find called on null or undefined');
		} else if (typeof callback !== 'function') {
			throw new TypeError('callback must be a function');
		}

		var list = Object(this);
		// Makes sures is always has an positive integer as length.
		var length = list.length >>> 0;
		var thisArg = arguments[1];

		for (var i = 0; i < length; i++) {
			var element = list[i];

			if (callback.call(thisArg, element, i, list)) {
				return element;
			}
		}
	};
}

// IE 11.592.18362.0
if (!Array.from) {
	console.log('Array.from polyfill loaded!');
	Array.from = (function() {
		var toStr = Object.prototype.toString;
		var isCallable = function (fn) {
			return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
		};
		var toInteger = function (value) {
			var number = Number(value);
			if (isNaN(number)) { return 0; }
			if (number === 0 || !isFinite(number)) { return number; }
			return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
		};
		var maxSafeInteger = Math.pow(2, 53) - 1;
		var toLength = function (value) {
			var len = toInteger(value);
			return Math.min(Math.max(len, 0), maxSafeInteger);
		};

		// The length property of the from method is 1.
		return function from(arrayLike/*, mapFn, thisArg */) {
			// 1. Let C be the this value.
			var C = this;

			// 2. Let items be ToObject(arrayLike).
			var items = Object(arrayLike);

			// 3. ReturnIfAbrupt(items).
			if (arrayLike == null) {
				throw new TypeError('Array.from requires an array-like object - not null or undefined');
			}

			// 4. If mapfn is undefined, then let mapping be false.
			var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
			var T;
			if (typeof mapFn !== 'undefined') {
				// 5. else
				// 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
				if (!isCallable(mapFn)) {
					throw new TypeError('Array.from: when provided, the second argument must be a function');
				}

				// 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
				if (arguments.length > 2) {
					T = arguments[2];
				}
			}

			// 10. Let lenValue be Get(items, "length").
			// 11. Let len be ToLength(lenValue).
			var len = toLength(items.length);

			// 13. If IsConstructor(C) is true, then
			// 13. a. Let A be the result of calling the [[Construct]] internal method
			// of C with an argument list containing the single item len.
			// 14. a. Else, Let A be ArrayCreate(len).
			var A = isCallable(C) ? Object(new C(len)) : new Array(len);

			// 16. Let k be 0.
			var k = 0;
			// 17. Repeat, while k < len… (also steps a - h)
			var kValue;
			while (k < len) {
				kValue = items[k];
				if (mapFn) {
					// noinspection JSValidateTypes
					A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
				} else {
					A[k] = kValue;
				}
				k += 1;
			}
			// 18. Let putStatus be Put(A, "length", len, true).
			A.length = len;
			// 20. Return A.
			return A;
		};
	}());
}

// IE 11.592.18362.0
if (!Array.prototype.fill) {
	console.log('Array.prototype.fill polyfill loaded!');
	Object.defineProperty(Array.prototype, 'fill', {
		value: function(value) {

			// Steps 1-2.
			if (this == null) {
				throw new TypeError('this is null or not defined');
			}

			var O = Object(this);

			// Steps 3-5.
			var len = O.length >>> 0;

			// Steps 6-7.
			var start = arguments[1];
			var relativeStart = start >> 0;

			// Step 8.
			var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);

			// Steps 9-10.
			var end = arguments[2];
			var relativeEnd = end === undefined ? len : end >> 0;

			// Step 11.
			var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);

			// Step 12.
			while (k < final) {
				O[k] = value;
				k++;
			}

			// Step 13.
			return O;
		}
	});
}

// endregion

// region Object

// IE 7/8
if (!Object.keys) {
	console.log('Object.keys polyfill loaded!');
	Object.keys = (function() {
		'use strict';
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
			dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'constructor'
			],
			dontEnumsLength = dontEnums.length;

		return function(obj) {
			if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
				throw new TypeError('Object.keys called on non-object');
			}

			var result = [], prop, i;

			for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}

			if (hasDontEnumBug) {
				for (i = 0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}

			return result;
		};
	}());
}

if (!Object.assign) {
	console.log('Object.assign polyfill loaded!');
	var assign = function (target, source) {
		var n$ = Object.getOwnPropertyNames(source);

		for (var i = 0, p; i < n$.length; i++) {
			p = n$[i];
			target[p] = source[p];
		}
	};

	Object.assign = function (target, sources) {
		var args = [].slice.call(arguments, 1);

		for (var i = 0, s; i < args.length; i++) {
			s = args[i];

			if (s) {
				assign(target, s);
			}
		}

		return target;
	};
}

// IE 11.592.18362.0
if (!Object.values) {
	console.log('Object.values polyfill loaded!');
	Object.values = function values(O) {
		var ownKeys = function(O) {
			// noinspection JSUnresolvedVariable
			if (typeof Reflect === 'object' && typeof Reflect.ownKeys === 'function') {
				// noinspection JSUnresolvedVariable,JSValidateTypes
				return Reflect.ownKeys(O);
			} else if (typeof Object.getOwnPropertySymbols === 'function') {
				// noinspection JSValidateTypes
				return (Object.getOwnPropertyNames(O).concat(Object.getOwnPropertySymbols(O)));
			} else {
				return Object.getOwnPropertyNames(O);
			}
		};
		var reduce = Function.bind.call(Function.call, Array.prototype.reduce);
		var isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
		var concat = Function.bind.call(Function.call, Array.prototype.concat);

		return reduce(ownKeys(O), function(v, k) {
			return concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []);
		}, []);
	}
}

// IE 11.592.18362.0
if (!Object.entries) {
	console.log('Object.entries polyfill loaded!');
	Object.entries = function entries(O) {
		var ownKeys = function(O) {
			// noinspection JSUnresolvedVariable
			if (typeof Reflect === 'object' && typeof Reflect.ownKeys === 'function') {
				// noinspection JSUnresolvedVariable,JSValidateTypes
				return Reflect.ownKeys(O);
			} else if (typeof Object.getOwnPropertySymbols === 'function') {
				// noinspection JSValidateTypes
				return (Object.getOwnPropertyNames(O).concat(Object.getOwnPropertySymbols(O)));
			} else {
				return Object.getOwnPropertyNames(O);
			}
		};
		var reduce = Function.bind.call(Function.call, Array.prototype.reduce);
		var isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
		var concat = Function.bind.call(Function.call, Array.prototype.concat);

		return reduce(ownKeys(O), function (e, k) {
			return concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []);
		}, []);
	}
}

// endregion

// region Typed Array

if (typeof ArrayBuffer !== 'undefined') {
	// noinspection DuplicatedCode
	if (!ArrayBuffer.prototype.slice) {
		ArrayBuffer.prototype.slice = function (from, to) {
			function clamp(val, length) {
				val = (val|0) || 0;

				if (val < 0) {
					return Math.max(val + length, 0);
				}

				return Math.min(val, length);
			}

			var length = this.byteLength;
			var begin = clamp(from, length);
			var end = length;

			if (to !== undefined) {
				end = clamp(to, length);
			}

			if (begin > end) {
				return new ArrayBuffer(0);
			}

			var num = end - begin;
			var target = new ArrayBuffer(num);
			var targetArray = new Uint8Array(target);

			var sourceArray = new Uint8Array(this, begin, num);
			targetArray.set(sourceArray);

			return target;
		};
	}
}

if (typeof Int8Array !== 'undefined') {
	// IE 11.295.18362.0
	if (!Int8Array.prototype.from) {
		Object.defineProperty(Int8Array.prototype, 'from', {
			value: function (obj, func, thisObj) {
				// noinspection JSUnresolvedVariable
				var typedArrayClass = Int8Array.__proto__;

				if (typeof this !== 'function') {
					//throw new TypeError('# is not a constructor');
				}
				// noinspection JSUnresolvedVariable
				if (this.__proto__ !== typedArrayClass) {
					throw new TypeError('this is not a typed array.');
				}

				func = func || function (elem) {
					return elem;
				};

				if (typeof func !== 'function') {
					throw new TypeError('specified argument is not a function');
				}

				obj = Object(obj);

				if (!obj['length']) {
					return new this(0);
				}

				var copy_data = [];

				for (var i = 0; i < obj.length; i++) {
					copy_data.push(obj[i]);
				}

				copy_data = copy_data.map(func, thisObj);

				var typed_array = new this(copy_data.length);

				for (var j = 0; j < typed_array.length; j++) {
					typed_array[j] = copy_data[j];
				}

				return typed_array;
			}
		});
	}

	// Safari 5.1.7 (7534.57.2)
	if (!Int8Array.prototype.fill) {
		Object.defineProperty(Int8Array.prototype, 'fill', {
			value: Array.prototype.fill
		});
	}

	// Safari 5.1.7 (7534.57.2)
	if (!Int8Array.prototype.slice) {
		Object.defineProperty(Int8Array.prototype, 'slice', {
			value: Array.prototype.slice
		});
	}
}

if (typeof Uint8Array !== 'undefined') {
	// Safari 5.1.7 (7534.57.2)
	if (!Uint8Array.prototype.fill) {
		Object.defineProperty(Uint8Array.prototype, 'fill', {
			value: Array.prototype.fill
		});
	}

	// Safari 5.1.7 (7534.57.2)
	if (!Uint8Array.prototype.slice) {
		Object.defineProperty(Uint8Array.prototype, 'slice', {
			value: Array.prototype.slice
		});
	}

	// IE 11.0.9600.16663 | Safari 5.1.7 (7534.57.2)
	if (typeof Uint8ClampedArray === 'undefined') {
		// noinspection JSUnresolvedVariable,JSValidateTypes
		Uint8ClampedArray = Uint8Array;
	}
}

if (typeof Uint8ClampedArray !== 'undefined') {
	// Safari 5.1.7 (7534.57.2)
	if (!Uint8ClampedArray.prototype.fill) {
		Object.defineProperty(Uint8ClampedArray.prototype, 'fill', {
			value: Array.prototype.fill
		});
	}

	// Safari 5.1.7 (7534.57.2)
	if (!Uint8ClampedArray.prototype.slice) {
		Object.defineProperty(Uint8ClampedArray.prototype, 'slice', {
			value: Array.prototype.slice
		});
	}
}

if (typeof Int16Array !== 'undefined') {
	// Safari 5.1.7 (7534.57.2)
	if (!Int16Array.prototype.fill) {
		Object.defineProperty(Int16Array.prototype, 'fill', {
			value: Array.prototype.fill
		});
	}

	// Safari 5.1.7 (7534.57.2)
	if (!Int16Array.prototype.slice) {
		Object.defineProperty(Int16Array.prototype, 'slice', {
			value: Array.prototype.slice
		});
	}
}

if (typeof Uint16Array !== 'undefined') {
	// Safari 5.1.7 (7534.57.2)
	if (!Uint16Array.prototype.fill) {
		Object.defineProperty(Uint16Array.prototype, 'fill', {
			value: Array.prototype.fill
		});
	}

	// Safari 5.1.7 (7534.57.2)
	if (!Uint16Array.prototype.slice) {
		Object.defineProperty(Uint16Array.prototype, 'slice', {
			value: Array.prototype.slice
		});
	}
}

if (typeof Int32Array !== 'undefined') {
	// Safari 5.1.7 (7534.57.2)
	if (!Int32Array.prototype.fill) {
		Object.defineProperty(Int32Array.prototype, 'fill', {
			value: Array.prototype.fill
		});
	}

	// Safari 5.1.7 (7534.57.2)
	if (!Int32Array.prototype.slice) {
		Object.defineProperty(Int32Array.prototype, 'slice', {
			value: Array.prototype.slice
		});
	}
}

if (typeof Uint32Array !== 'undefined') {
	// Safari 5.1.7 (7534.57.2)
	if (!Uint32Array.prototype.fill) {
		Object.defineProperty(Uint32Array.prototype, 'fill', {
			value: Array.prototype.fill
		});
	}

	// Safari 5.1.7 (7534.57.2)
	if (!Uint32Array.prototype.slice) {
		Object.defineProperty(Uint32Array.prototype, 'slice', {
			value: Array.prototype.slice
		});
	}
}

if (typeof Float32Array !== 'undefined') {
	// Safari 5.1.7 (7534.57.2)
	if (!Float32Array.prototype.fill) {
		Object.defineProperty(Float32Array.prototype, 'fill', {
			value: Array.prototype.fill
		});
	}

	// Safari 5.1.7 (7534.57.2)
	if (!Float32Array.prototype.slice) {
		Object.defineProperty(Float32Array.prototype, 'slice', {
			value: Array.prototype.slice
		});
	}
}

if (typeof Float64Array !== 'undefined') {
	// Safari 5.1.7 (7534.57.2)
	if (!Float64Array.prototype.fill) {
		Object.defineProperty(Float64Array.prototype, 'fill', {
			value: Array.prototype.fill
		});
	}

	// Safari 5.1.7 (7534.57.2)
	if (!Float64Array.prototype.slice) {
		Object.defineProperty(Float64Array.prototype, 'slice', {
			value: Array.prototype.slice
		});
	}
}

// endregion

// endregion