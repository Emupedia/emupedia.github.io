// noinspection ThisExpressionReferencesGlobalObjectJS,DuplicatedCode

(function(global) {
	if (typeof global['$sys'] === 'undefined') {
		global['$sys'] = {};
	}

	var location = ~window.location.hostname.indexOf('emupedia.net') ? 'emupedia.net' : (~window.location.hostname.indexOf('emupedia.org') ? 'emupedia.org' : (~window.location.hostname.indexOf('emupedia.games') ? 'emupedia.games' : (~window.location.hostname.indexOf('emuos.net') ? 'emuos.net' : (~window.location.hostname.indexOf('emuos.org') ? 'emuos.org' : (~window.location.hostname.indexOf('emuos.games') ? 'emuos.games' : 'emupedia.net')))))

	// region Libraries

	global['$sys']['lib'] = {
	'babel-polyfill': [
		'libraries/babel-polyfill-7.12.1.min',
		'/beta/emuos/assets/js/libraries/babel-polyfill-7.12.1.min',
		'//' + location + '/beta/emuos/assets/js/libraries/babel-polyfill-7.12.1.min'
	],
	'babel-standalone': [
		'libraries/babel-standalone-7.18.13.min',
		'/beta/emuos/assets/js/libraries/babel-standalone-7.18.13.min',
		'//' + location + '/beta/emuos/assets/js/libraries/babel-standalone-7.18.13.min'
	],
	'bson': [
		'libraries/bson-4.7.0',
		'/beta/emuos/assets/js/libraries/bson-4.7.0',
		'//' + location + '/beta/emuos/assets/js/libraries/bson-4.7.0'
	],
	'clippy': [
		'libraries/clippy-0.0.3',
		'/beta/emuos/assets/js/libraries/clippy-0.0.3',
		'//' + location + '/beta/emuos/assets/js/libraries/clippy-0.0.3'
	],
	'custom-elements': [
		'libraries/custom-elements-1.5.0.min',
		'/beta/emuos/assets/js/libraries/custom-elements-1.5.0.min',
		'//' + location + '/beta/emuos/assets/js/libraries/custom-elements-1.5.0.min'
	],
	'emularity': [
		'libraries/emularity',
		'/beta/emuos/assets/js/libraries/emularity',
		'//' + location + '/beta/emuos/assets/js/libraries/emularity'
	],
	'esheep': [
		'libraries/esheep-0.9.2.min',
		'/beta/emuos/assets/js/libraries/esheep-0.9.2.min',
		'//' + location + '/beta/emuos/assets/js/libraries/esheep-0.9.2.min'
	],
	'fetch': [
		'libraries/fetch-3.6.2',
		'/beta/emuos/assets/js/libraries/fetch-3.6.2',
		'//' + location + '/beta/emuos/assets/js/libraries/fetch-3.6.2'
	],
	'fingerprint': [
		'libraries/fingerprint-3.3.5',
		'/beta/emuos/assets/js/libraries/fingerprint-3.3.5',
		'//' + location + '/beta/emuos/assets/js/libraries/fingerprint-3.3.5'
	],
	'html-imports': [
		'libraries/html-imports-1.3.0.min',
		'/beta/emuos/assets/js/libraries/html-imports-1.3.0.min',
		'//' + location + '/beta/emuos/assets/js/libraries/html-imports-1.3.0.min'
	],
	'hybrids': [
		'libraries/hybrids-4.3.4.min',
		'/beta/emuos/assets/js/libraries/hybrids-4.3.4.min',
		'//' + location + '/beta/emuos/assets/js/libraries/hybrids-4.3.4.min'
	],
	'ie11-custom-properties': [
		'libraries/css-vars-4.1.0',
		'/beta/emuos/assets/js/libraries/css-vars-4.1.0',
		'//' + location + '/beta/emuos/assets/js/libraries/css-vars-4.1.0'
	],
	'jquery': [
		'libraries/jquery-3.6.1.min',
		'/beta/emuos/assets/js/libraries/jquery-3.6.1.min',
		'//' + location + '/beta/emuos/assets/js/libraries/jquery-3.6.1.min'
	],
	'jquery-ajax-retry': [
		'libraries/jquery-ajax-retry-0.2.8.min',
		'/beta/emuos/assets/js/libraries/jquery-ajax-retry-0.2.8.min',
		'//' + location + '/beta/emuos/assets/js/libraries/jquery-ajax-retry-0.2.8.min'
	],
	'jquery-custom-scrollbar': [
		'libraries/jquery-customscrollbar-3.1.5.min',
		'/beta/emuos/assets/js/libraries/jquery-customscrollbar-3.1.5.min',
		'//' + location + '/beta/emuos/assets/js/libraries/jquery-customscrollbar-3.1.5.min'
	],
	'jquery-migrate': [
		'libraries/jquery-migrate-3.4.0.min',
		'/beta/emuos/assets/js/libraries/jquery-migrate-3.4.0.min',
		'//' + location + '/beta/emuos/assets/js/libraries/jquery-migrate-3.4.0.min'
	],
	'jquery-mousewheel': [
		'libraries/jquery-mousewheel-3.1.13',
		'/beta/emuos/assets/js/libraries/jquery-mousewheel-3.1.13',
		'//' + location + '/beta/emuos/assets/js/libraries/jquery-mousewheel-3.1.13'
	],
	'jquery-ui': [
		'libraries/jquery-ui-1.13.2.min',
		'/beta/emuos/assets/js/libraries/jquery-ui-1.13.2.min',
		'//' + location + '/beta/emuos/assets/js/libraries/jquery-ui-1.13.2.min'
	],
	'jquery-ui-contextmenu': [
		'libraries/jquery-ui-contextmenu-1.18.1.min',
		'/beta/emuos/assets/js/libraries/jquery-ui-contextmenu-1.18.1.min',
		'//' + location + '/beta/emuos/assets/js/libraries/jquery-ui-contextmenu-1.18.1.min'
	],
	'jsrsasign-all': [
		'libraries/jsrsasign-all-10.5.27.min',
		'/beta/emuos/assets/js/libraries/jsrsasign-all-10.5.27.min',
		'//' + location + '/beta/emuos/assets/js/libraries/jsrsasign-all-10.5.27.min'
	],
	'less': [
		'libraries/less-4.1.3.min',
		'/beta/emuos/assets/js/libraries/less-4.1.3.min',
		'//' + location + '/beta/emuos/assets/js/libraries/less-4.1.3.min'
	],
	'moment': [
		'libraries/moment-2.29.4.min',
		'/beta/emuos/assets/js/libraries/moment-2.29.4.min',
		'//' + location + '/beta/emuos/assets/js/libraries/moment-2.29.4.min'
	],
	'moment-timezone': [
		'libraries/moment-timezone-0.5.37.min',
		'/beta/emuos/assets/js/libraries/moment-timezone-0.5.37.min',
		'//' + location + '/beta/emuos/assets/js/libraries/moment-timezone-0.5.37.min'
	],
	'octokat': [
		'libraries/octokat-0.10.0',
		'/beta/emuos/assets/js/libraries/octokat-0.10.0',
		'//' + location + '/beta/emuos/assets/js/libraries/octokat-0.10.0'
	],
	'promise': [
		'libraries/promise-4.2.8.min',
		'/beta/emuos/assets/js/libraries/promise-4.2.8.min',
		'//' + location + '/beta/emuos/assets/js/libraries/promise-4.2.8.min'
	],
	'promise-auto': [
		'libraries/promise-auto-4.2.8.min',
		'/beta/emuos/assets/js/libraries/promise-auto-4.2.8.min',
		'//' + location + '/beta/emuos/assets/js/libraries/promise-auto-4.2.8.min'
	],
	'requirejs': [
		'libraries/requirejs-2.3.6',
		'/beta/emuos/assets/js/libraries/requirejs-2.3.6',
		'//' + location + '/beta/emuos/assets/js/libraries/requirejs-2.3.6'
	],
	'requirejs-json': [
		'libraries/requirejs-json-1.0.3',
		'/beta/emuos/assets/js/libraries/requirejs-json-1.0.3',
		'//' + location + '/beta/emuos/assets/js/libraries/requirejs-json-1.0.3'
	],
	'requirejs-noext': [
		'libraries/requirejs-noext-1.0.3',
		'/beta/emuos/assets/js/libraries/requirejs-noext-1.0.3',
		'//' + location + '/beta/emuos/assets/js/libraries/requirejs-noext-1.0.3'
	],
	'requirejs-text': [
		'libraries/requirejs-text-2.0.16',
		'/beta/emuos/assets/js/libraries/requirejs-text-2.0.16',
		'//' + location + '/beta/emuos/assets/js/libraries/requirejs-text-2.0.16'
	],
	'simplestorage': [
		'libraries/simplestorage-0.2.1.min',
		'/beta/emuos/assets/js/libraries/simplestorage-0.2.1.min',
		'//' + location + '/beta/emuos/assets/js/libraries/simplestorage-0.2.1.min'
	],
	'tinycon': [
		'libraries/tinycon-0.6.8.min',
		'/beta/emuos/assets/js/libraries/tinycon-0.6.8.min',
		'//' + location + '/beta/emuos/assets/js/libraries/tinycon-0.6.8.min'
	],
	'toastr': [
		'libraries/toastr-2.1.4.min',
		'/beta/emuos/assets/js/libraries/toastr-2.1.4.min',
		'//' + location + '/beta/emuos/assets/js/libraries/toastr-2.1.4.min'
	],
	'twemoji': [
		'libraries/twemoji-14.0.2.min',
		'/beta/emuos/assets/js/libraries/twemoji-14.0.2.min',
		'//' + location + '/beta/emuos/assets/js/libraries/twemoji-14.0.2.min'
	],
	'webcomponents': [
		'libraries/webcomponents-2.6.0.min',
		'/beta/emuos/assets/js/libraries/webcomponents-2.6.0.min',
		'//' + location + '/beta/emuos/assets/js/libraries/webcomponents-2.6.0.min'
	],
	'desktop': [
		'desktop',
		'/beta/emuos/assets/js/desktop',
		'//' + location + '/beta/emuos/assets/js/desktop'
	],
	'emoticons': [
		'emoticons',
		'/beta/emuos/assets/js/emoticons',
		'//' + location + '/beta/emuos/assets/js/emoticons'
	],
	'emuos': [
		'emuos',
		'/beta/emuos/assets/js/emuos',
		'//' + location + '/beta/emuos/assets/js/emuos'
	],
	'router': [
		'router',
		'/beta/emuos/assets/js/router',
		'//' + location + '/beta/emuos/assets/js/router'
	],
	'filesystem': [
		'filesystem',
		'/beta/emuos/assets/js/filesystem',
		'//' + location + '/beta/emuos/assets/js/filesystem'
	],
	'lang-en': [
		'lang-en',
		'/beta/emuos/assets/js/lang-en',
		'//' + location + '/beta/emuos/assets/js/lang-en'
	],
	'taskbar': [
		'taskbar',
		'/beta/emuos/assets/js/taskbar',
		'//' + location + '/beta/emuos/assets/js/taskbar'
	],
	'window': [
		'window',
		'/beta/emuos/assets/js/window',
		'//' + location + '/beta/emuos/assets/js/window'
	],
	'socket': '//ws.' + location + '/server/app/u_socket_es5',
	'network': '//ws.' + location + '/server/app/network_iframe',
	'ga': '//www.google-analytics.com/analytics'
};

	// endregion
}(this));