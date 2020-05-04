// noinspection ThisExpressionReferencesGlobalObjectJS
(function(global) {
	if (typeof global['$sys'] === 'undefined') {
		global['$sys'] = {};
	}

	// region Libraries

	global['$sys']['lib'] = {
		'babel-standalone': [
				'libraries/babel-standalone-7.9.6.min',
				'/beta/emuos/js/libraries/babel-standalone-7.9.6.min',
				'//emupedia.net/beta/emuos/js/libraries/babel-standalone-7.9.6.min',
				'//emuos.net/beta/emuos/js/libraries/babel-standalone-7.9.6.min',
				'//emuos.org/beta/emuos/js/libraries/babel-standalone-7.9.6.min'
		],
		'bootstrap': [
				'libraries/bootstrap-4.4.1.min',
				'/beta/emuos/js/libraries/bootstrap-4.4.1.min',
				'//emupedia.net/beta/emuos/js/libraries/bootstrap-4.4.1.min',
				'//emuos.net/beta/emuos/js/libraries/bootstrap-4.4.1.min',
				'//emuos.org/beta/emuos/js/libraries/bootstrap-4.4.1.min'
		],
		'browserfs': [
				'libraries/browserfs-1.4.3.min',
				'/beta/emuos/js/libraries/browserfs-1.4.3.min',
				'//emupedia.net/beta/emuos/js/libraries/browserfs-1.4.3.min',
				'//emuos.net/beta/emuos/js/libraries/browserfs-1.4.3.min',
				'//emuos.org/beta/emuos/js/libraries/browserfs-1.4.3.min'
		],
		'buzz': [
				'libraries/buzz-1.2.1.min',
				'/beta/emuos/js/libraries/buzz-1.2.1.min',
				'//emupedia.net/beta/emuos/js/libraries/buzz-1.2.1.min',
				'//emuos.net/beta/emuos/js/libraries/buzz-1.2.1.min',
				'//emuos.org/beta/emuos/js/libraries/buzz-1.2.1.min'
		],
		'clippy': [
				'libraries/clippy-0.0.3',
				'/beta/emuos/js/libraries/clippy-0.0.3',
				'//emupedia.net/beta/emuos/js/libraries/clippy-0.0.3',
				'//emuos.net/beta/emuos/js/libraries/clippy-0.0.3',
				'//emuos.org/beta/emuos/js/libraries/clippy-0.0.3'
		],
		'datatables': [
				'libraries/datatables-1.10.20.min',
				'/beta/emuos/js/libraries/datatables-1.10.20.min',
				'//emupedia.net/beta/emuos/js/libraries/datatables-1.10.20.min',
				'//emuos.net/beta/emuos/js/libraries/datatables-1.10.20.min',
				'//emuos.org/beta/emuos/js/libraries/datatables-1.10.20.min'
		],
		'datatables-bootstrap4': [
				'libraries/datatables-bootstrap4-1.10.20.min',
				'/beta/emuos/js/libraries/datatables-bootstrap4-1.10.20.min',
				'//emupedia.net/beta/emuos/js/libraries/datatables-bootstrap4-1.10.20.min',
				'//emuos.net/beta/emuos/js/libraries/datatables-bootstrap4-1.10.20.min',
				'//emuos.org/beta/emuos/js/libraries/datatables-bootstrap4-1.10.20.min'
		],
		'datatables-buttons': [
				'libraries/datatables-buttons-1.6.1.min',
				'/beta/emuos/js/libraries/datatables-buttons-1.6.1.min',
				'//emupedia.net/beta/emuos/js/libraries/datatables-buttons-1.6.1.min',
				'//emuos.net/beta/emuos/js/libraries/datatables-buttons-1.6.1.min',
				'//emuos.org/beta/emuos/js/libraries/datatables-buttons-1.6.1.min'
		],
		'datatables-buttons-bootstrap4': [
				'libraries/datatables-buttons-bootstrap4-1.6.1.min',
				'/beta/emuos/js/libraries/datatables-buttons-bootstrap4-1.6.1.min',
				'//emupedia.net/beta/emuos/js/libraries/datatables-buttons-bootstrap4-1.6.1.min',
				'//emuos.net/beta/emuos/js/libraries/datatables-buttons-bootstrap4-1.6.1.min',
				'//emuos.org/beta/emuos/js/libraries/datatables-buttons-bootstrap4-1.6.1.min'
		],
		'datatables-colreorder': [
				'libraries/datatables-colreorder-1.5.2.min',
				'/beta/emuos/js/libraries/datatables-colreorder-1.5.2.min',
				'//emupedia.net/beta/emuos/js/libraries/datatables-colreorder-1.5.2.min',
				'//emuos.net/beta/emuos/js/libraries/datatables-colreorder-1.5.2.min',
				'//emuos.org/beta/emuos/js/libraries/datatables-colreorder-1.5.2.min'
		],
		'datatables-colreorder-bootstrap4': [
				'libraries/datatables-colreorder-bootstrap4-1.5.2.min',
				'/beta/emuos/js/libraries/datatables-colreorder-bootstrap4-1.5.2.min',
				'//emupedia.net/beta/emuos/js/libraries/datatables-colreorder-bootstrap4-1.5.2.min',
				'//emuos.net/beta/emuos/js/libraries/datatables-colreorder-bootstrap4-1.5.2.min',
				'//emuos.org/beta/emuos/js/libraries/datatables-colreorder-bootstrap4-1.5.2.min'
		],
		'datatables-editor': [
				'libraries/datatables-editor-1.6.7.min',
				'/beta/emuos/js/libraries/datatables-editor-1.6.7.min',
				'//emupedia.net/beta/emuos/js/libraries/datatables-editor-1.6.7.min',
				'//emuos.net/beta/emuos/js/libraries/datatables-editor-1.6.7.min',
				'//emuos.org/beta/emuos/js/libraries/datatables-editor-1.6.7.min'
		],
		'datatables-ellipsis': [
				'libraries/datatables-ellipsis-1.10.20',
				'/beta/emuos/js/libraries/datatables-ellipsis-1.10.20',
				'//emupedia.net/beta/emuos/js/libraries/datatables-ellipsis-1.10.20',
				'//emuos.net/beta/emuos/js/libraries/datatables-ellipsis-1.10.20',
				'//emuos.org/beta/emuos/js/libraries/datatables-ellipsis-1.10.20'
		],
		'datatables-fixedcolumns': [
				'libraries/datatables-fixedcolumns-3.3.0.min',
				'/beta/emuos/js/libraries/datatables-fixedcolumns-3.3.0.min',
				'//emupedia.net/beta/emuos/js/libraries/datatables-fixedcolumns-3.3.0.min',
				'//emuos.net/beta/emuos/js/libraries/datatables-fixedcolumns-3.3.0.min',
				'//emuos.org/beta/emuos/js/libraries/datatables-fixedcolumns-3.3.0.min'
		],
		'datatables-fixedcolumns-bootstrap4': [
				'libraries/datatables-fixedcolumns-bootstrap4-3.3.0.min',
				'/beta/emuos/js/libraries/datatables-fixedcolumns-bootstrap4-3.3.0.min',
				'//emupedia.net/beta/emuos/js/libraries/datatables-fixedcolumns-bootstrap4-3.3.0.min',
				'//emuos.net/beta/emuos/js/libraries/datatables-fixedcolumns-bootstrap4-3.3.0.min',
				'//emuos.org/beta/emuos/js/libraries/datatables-fixedcolumns-bootstrap4-3.3.0.min'
		],
		'datatables-fixedheader': [
				'libraries/datatables-fixedheader-3.1.6.min',
				'/beta/emuos/js/libraries/datatables-fixedheader-3.1.6.min',
				'//emupedia.net/beta/emuos/js/libraries/datatables-fixedheader-3.1.6.min',
				'//emuos.net/beta/emuos/js/libraries/datatables-fixedheader-3.1.6.min',
				'//emuos.org/beta/emuos/js/libraries/datatables-fixedheader-3.1.6.min'
		],
		'datatables-fixedheader-bootstrap4': [
				'libraries/datatables-fixedheader-bootstrap4-3.1.6.min',
				'/beta/emuos/js/libraries/datatables-fixedheader-bootstrap4-3.1.6.min',
				'//emupedia.net/beta/emuos/js/libraries/datatables-fixedheader-bootstrap4-3.1.6.min',
				'//emuos.net/beta/emuos/js/libraries/datatables-fixedheader-bootstrap4-3.1.6.min',
				'//emuos.org/beta/emuos/js/libraries/datatables-fixedheader-bootstrap4-3.1.6.min'
		],
		'datatables-responsive': [
				'libraries/datatables-responsive-2.2.3.min',
				'/beta/emuos/js/libraries/datatables-responsive-2.2.3.min',
				'//emupedia.net/beta/emuos/js/libraries/datatables-responsive-2.2.3.min',
				'//emuos.net/beta/emuos/js/libraries/datatables-responsive-2.2.3.min',
				'//emuos.org/beta/emuos/js/libraries/datatables-responsive-2.2.3.min'
		],
		'datatables-responsive-bootstrap4': [
				'libraries/datatables-responsive-bootstrap4-2.2.3.min',
				'/beta/emuos/js/libraries/datatables-responsive-bootstrap4-2.2.3.min',
				'//emupedia.net/beta/emuos/js/libraries/datatables-responsive-bootstrap4-2.2.3.min',
				'//emuos.net/beta/emuos/js/libraries/datatables-responsive-bootstrap4-2.2.3.min',
				'//emuos.org/beta/emuos/js/libraries/datatables-responsive-bootstrap4-2.2.3.min'
		],
		'datatables-select': [
				'libraries/datatables-select-1.3.1.min',
				'/beta/emuos/js/libraries/datatables-select-1.3.1.min',
				'//emupedia.net/beta/emuos/js/libraries/datatables-select-1.3.1.min',
				'//emuos.net/beta/emuos/js/libraries/datatables-select-1.3.1.min',
				'//emuos.org/beta/emuos/js/libraries/datatables-select-1.3.1.min'
		],
		'datatables-select-bootstrap4': [
				'libraries/datatables-select-bootstrap4-1.3.1.min',
				'/beta/emuos/js/libraries/datatables-select-bootstrap4-1.3.1.min',
				'//emupedia.net/beta/emuos/js/libraries/datatables-select-bootstrap4-1.3.1.min',
				'//emuos.net/beta/emuos/js/libraries/datatables-select-bootstrap4-1.3.1.min',
				'//emuos.org/beta/emuos/js/libraries/datatables-select-bootstrap4-1.3.1.min'
		],
		'dropbox': [
				'libraries/dropbox-4.0.30.min',
				'/beta/emuos/js/libraries/dropbox-4.0.30.min',
				'//emupedia.net/beta/emuos/js/libraries/dropbox-4.0.30.min',
				'//emuos.net/beta/emuos/js/libraries/dropbox-4.0.30.min',
				'//emuos.org/beta/emuos/js/libraries/dropbox-4.0.30.min'
		],
		'dropbox-team': [
				'libraries/dropbox-team-4.0.30.min',
				'/beta/emuos/js/libraries/dropbox-team-4.0.30.min',
				'//emupedia.net/beta/emuos/js/libraries/dropbox-team-4.0.30.min',
				'//emuos.net/beta/emuos/js/libraries/dropbox-team-4.0.30.min',
				'//emuos.org/beta/emuos/js/libraries/dropbox-team-4.0.30.min'
		],
		'emularity': [
				'libraries/emularity',
				'/beta/emuos/js/libraries/emularity',
				'//emupedia.net/beta/emuos/js/libraries/emularity',
				'//emuos.net/beta/emuos/js/libraries/emularity',
				'//emuos.org/beta/emuos/js/libraries/emularity'
		],
		'esheep': [
				'libraries/esheep-0.7.2.min',
				'/beta/emuos/js/libraries/esheep-0.7.2.min',
				'//emupedia.net/beta/emuos/js/libraries/esheep-0.7.2.min',
				'//emuos.net/beta/emuos/js/libraries/esheep-0.7.2.min',
				'//emuos.org/beta/emuos/js/libraries/esheep-0.7.2.min'
		],
		'fingerprint': [
				'libraries/fingerprint-0.5.3',
				'/beta/emuos/js/libraries/fingerprint-0.5.3',
				'//emupedia.net/beta/emuos/js/libraries/fingerprint-0.5.3',
				'//emuos.net/beta/emuos/js/libraries/fingerprint-0.5.3',
				'//emuos.org/beta/emuos/js/libraries/fingerprint-0.5.3'
		],
		'firebug-lite': [
				'libraries/firebug-lite-1.5.3',
				'/beta/emuos/js/libraries/firebug-lite-1.5.3',
				'//emupedia.net/beta/emuos/js/libraries/firebug-lite-1.5.3',
				'//emuos.net/beta/emuos/js/libraries/firebug-lite-1.5.3',
				'//emuos.org/beta/emuos/js/libraries/firebug-lite-1.5.3'
		],
		'hjson': [
				'libraries/hjson-3.2.1.min',
				'/beta/emuos/js/libraries/hjson-3.2.1.min',
				'//emupedia.net/beta/emuos/js/libraries/hjson-3.2.1.min',
				'//emuos.net/beta/emuos/js/libraries/hjson-3.2.1.min',
				'//emuos.org/beta/emuos/js/libraries/hjson-3.2.1.min'
		],
		'howler': [
				'libraries/howler-2.1.3.min',
				'/beta/emuos/js/libraries/howler-2.1.3.min',
				'//emupedia.net/beta/emuos/js/libraries/howler-2.1.3.min',
				'//emuos.net/beta/emuos/js/libraries/howler-2.1.3.min',
				'//emuos.org/beta/emuos/js/libraries/howler-2.1.3.min'
		],
		'howler-core': [
				'libraries/howler-core-2.1.3.min',
				'/beta/emuos/js/libraries/howler-core-2.1.3.min',
				'//emupedia.net/beta/emuos/js/libraries/howler-core-2.1.3.min',
				'//emuos.net/beta/emuos/js/libraries/howler-core-2.1.3.min',
				'//emuos.org/beta/emuos/js/libraries/howler-core-2.1.3.min'
		],
		'howler-spatial': [
				'libraries/howler-spatial-2.1.3.min',
				'/beta/emuos/js/libraries/howler-spatial-2.1.3.min',
				'//emupedia.net/beta/emuos/js/libraries/howler-spatial-2.1.3.min',
				'//emuos.net/beta/emuos/js/libraries/howler-spatial-2.1.3.min',
				'//emuos.org/beta/emuos/js/libraries/howler-spatial-2.1.3.min'
		],
		'hybrids': [
				'libraries/hybrids-4.1.8.min',
				'/beta/emuos/js/libraries/hybrids-4.1.8.min',
				'//emupedia.net/beta/emuos/js/libraries/hybrids-4.1.8.min',
				'//emuos.net/beta/emuos/js/libraries/hybrids-4.1.8.min',
				'//emuos.org/beta/emuos/js/libraries/hybrids-4.1.8.min'
		],
		'i18next': [
				'libraries/i18next-19.4.4.min',
				'/beta/emuos/js/libraries/i18next-19.4.4.min',
				'//emupedia.net/beta/emuos/js/libraries/i18next-19.4.4.min',
				'//emuos.net/beta/emuos/js/libraries/i18next-19.4.4.min',
				'//emuos.org/beta/emuos/js/libraries/i18next-19.4.4.min'
		],
		'jquery-1.x': [
				'libraries/jquery-1.12.4.min',
				'/beta/emuos/js/libraries/jquery-1.12.4.min',
				'//emupedia.net/beta/emuos/js/libraries/jquery-1.12.4.min',
				'//emuos.net/beta/emuos/js/libraries/jquery-1.12.4.min',
				'//emuos.org/beta/emuos/js/libraries/jquery-1.12.4.min'
		],
		'jquery-2.x': [
				'libraries/jquery-2.2.4.min',
				'/beta/emuos/js/libraries/jquery-2.2.4.min',
				'//emupedia.net/beta/emuos/js/libraries/jquery-2.2.4.min',
				'//emuos.net/beta/emuos/js/libraries/jquery-2.2.4.min',
				'//emuos.org/beta/emuos/js/libraries/jquery-2.2.4.min'
		],
		'jquery-3.x': [
				'libraries/jquery-3.5.0.min',
				'/beta/emuos/js/libraries/jquery-3.5.0.min',
				'//emupedia.net/beta/emuos/js/libraries/jquery-3.5.0.min',
				'//emuos.net/beta/emuos/js/libraries/jquery-3.5.0.min',
				'//emuos.org/beta/emuos/js/libraries/jquery-3.5.0.min'
		],
		'jquery-ajax-retry': [
				'libraries/jquery-ajax-retry-0.2.8.min',
				'/beta/emuos/js/libraries/jquery-ajax-retry-0.2.8.min',
				'//emupedia.net/beta/emuos/js/libraries/jquery-ajax-retry-0.2.8.min',
				'//emuos.net/beta/emuos/js/libraries/jquery-ajax-retry-0.2.8.min',
				'//emuos.org/beta/emuos/js/libraries/jquery-ajax-retry-0.2.8.min'
		],
		'jquery-i18next': [
				'libraries/jquery-i18next-1.2.1.min',
				'/beta/emuos/js/libraries/jquery-i18next-1.2.1.min',
				'//emupedia.net/beta/emuos/js/libraries/jquery-i18next-1.2.1.min',
				'//emuos.net/beta/emuos/js/libraries/jquery-i18next-1.2.1.min',
				'//emuos.org/beta/emuos/js/libraries/jquery-i18next-1.2.1.min'
		],
		'jquery-migrate': [
				'libraries/jquery-migrate-3.2.0.min',
				'/beta/emuos/js/libraries/jquery-migrate-3.2.0.min',
				'//emupedia.net/beta/emuos/js/libraries/jquery-migrate-3.2.0.min',
				'//emuos.net/beta/emuos/js/libraries/jquery-migrate-3.2.0.min',
				'//emuos.org/beta/emuos/js/libraries/jquery-migrate-3.2.0.min'
		],
		'jquery-mousewheel': [
				'libraries/jquery-mousewheel-3.1.13',
				'/beta/emuos/js/libraries/jquery-mousewheel-3.1.13',
				'//emupedia.net/beta/emuos/js/libraries/jquery-mousewheel-3.1.13',
				'//emuos.net/beta/emuos/js/libraries/jquery-mousewheel-3.1.13',
				'//emuos.org/beta/emuos/js/libraries/jquery-mousewheel-3.1.13'
		],
		'jquery-resizable': [
				'libraries/jquery-resizable-0.35.0.min',
				'/beta/emuos/js/libraries/jquery-resizable-0.35.0.min',
				'//emupedia.net/beta/emuos/js/libraries/jquery-resizable-0.35.0.min',
				'//emuos.net/beta/emuos/js/libraries/jquery-resizable-0.35.0.min',
				'//emuos.org/beta/emuos/js/libraries/jquery-resizable-0.35.0.min'
		],
		'jquery-ui-1.11.x': [
				'libraries/jquery-ui-1.11.4.min',
				'/beta/emuos/js/libraries/jquery-ui-1.11.4.min',
				'//emupedia.net/beta/emuos/js/libraries/jquery-ui-1.11.4.min',
				'//emuos.net/beta/emuos/js/libraries/jquery-ui-1.11.4.min',
				'//emuos.org/beta/emuos/js/libraries/jquery-ui-1.11.4.min'
		],
		'jquery-ui-1.12.x': [
				'libraries/jquery-ui-1.12.1.min',
				'/beta/emuos/js/libraries/jquery-ui-1.12.1.min',
				'//emupedia.net/beta/emuos/js/libraries/jquery-ui-1.12.1.min',
				'//emuos.net/beta/emuos/js/libraries/jquery-ui-1.12.1.min',
				'//emuos.org/beta/emuos/js/libraries/jquery-ui-1.12.1.min'
		],
		'jquery-ui-contextmenu': [
				'libraries/jquery-ui-contextmenu-1.18.1.min',
				'/beta/emuos/js/libraries/jquery-ui-contextmenu-1.18.1.min',
				'//emupedia.net/beta/emuos/js/libraries/jquery-ui-contextmenu-1.18.1.min',
				'//emuos.net/beta/emuos/js/libraries/jquery-ui-contextmenu-1.18.1.min',
				'//emuos.org/beta/emuos/js/libraries/jquery-ui-contextmenu-1.18.1.min'
		],
		'js-dos': [
				'libraries/js-dos-6.22.59.min',
				'/beta/emuos/js/libraries/js-dos-6.22.59.min',
				'//emupedia.net/beta/emuos/js/libraries/js-dos-6.22.59.min',
				'//emuos.net/beta/emuos/js/libraries/js-dos-6.22.59.min',
				'//emuos.org/beta/emuos/js/libraries/js-dos-6.22.59.min'
		],
		'jsonpath': [
				'libraries/jsonpath-1.0.2.min',
				'/beta/emuos/js/libraries/jsonpath-1.0.2.min',
				'//emupedia.net/beta/emuos/js/libraries/jsonpath-1.0.2.min',
				'//emuos.net/beta/emuos/js/libraries/jsonpath-1.0.2.min',
				'//emuos.org/beta/emuos/js/libraries/jsonpath-1.0.2.min'
		],
		'jsrsasign-all': [
				'libraries/jsrsasign-all-8.0.15.min',
				'/beta/emuos/js/libraries/jsrsasign-all-8.0.15.min',
				'//emupedia.net/beta/emuos/js/libraries/jsrsasign-all-8.0.15.min',
				'//emuos.net/beta/emuos/js/libraries/jsrsasign-all-8.0.15.min',
				'//emuos.org/beta/emuos/js/libraries/jsrsasign-all-8.0.15.min'
		],
		'jszip': [
				'libraries/jszip-3.4.0.min',
				'/beta/emuos/js/libraries/jszip-3.4.0.min',
				'//emupedia.net/beta/emuos/js/libraries/jszip-3.4.0.min',
				'//emuos.net/beta/emuos/js/libraries/jszip-3.4.0.min',
				'//emuos.org/beta/emuos/js/libraries/jszip-3.4.0.min'
		],
		'lightslider': [
				'libraries/lightslider-1.1.6.min',
				'/beta/emuos/js/libraries/lightslider-1.1.6.min',
				'//emupedia.net/beta/emuos/js/libraries/lightslider-1.1.6.min',
				'//emuos.net/beta/emuos/js/libraries/lightslider-1.1.6.min',
				'//emuos.org/beta/emuos/js/libraries/lightslider-1.1.6.min'
		],
		'localforage': [
				'libraries/localforage-1.7.3.min',
				'/beta/emuos/js/libraries/localforage-1.7.3.min',
				'//emupedia.net/beta/emuos/js/libraries/localforage-1.7.3.min',
				'//emuos.net/beta/emuos/js/libraries/localforage-1.7.3.min',
				'//emuos.org/beta/emuos/js/libraries/localforage-1.7.3.min'
		],
		'localforage-nopromise': [
				'libraries/localforage-nopromise-1.7.3.min',
				'/beta/emuos/js/libraries/localforage-nopromise-1.7.3.min',
				'//emupedia.net/beta/emuos/js/libraries/localforage-nopromise-1.7.3.min',
				'//emuos.net/beta/emuos/js/libraries/localforage-nopromise-1.7.3.min',
				'//emuos.org/beta/emuos/js/libraries/localforage-nopromise-1.7.3.min'
		],
		'moment': [
				'libraries/moment-2.25.1.min',
				'/beta/emuos/js/libraries/moment-2.25.1.min',
				'//emupedia.net/beta/emuos/js/libraries/moment-2.25.1.min',
				'//emuos.net/beta/emuos/js/libraries/moment-2.25.1.min',
				'//emuos.org/beta/emuos/js/libraries/moment-2.25.1.min'
		],
		'moment-holiday': [
				'libraries/moment-holiday-1.5.1.min',
				'/beta/emuos/js/libraries/moment-holiday-1.5.1.min',
				'//emupedia.net/beta/emuos/js/libraries/moment-holiday-1.5.1.min',
				'//emuos.net/beta/emuos/js/libraries/moment-holiday-1.5.1.min',
				'//emuos.org/beta/emuos/js/libraries/moment-holiday-1.5.1.min'
		],
		'moment-timezone': [
				'libraries/moment-timezone-0.5.28.min',
				'/beta/emuos/js/libraries/moment-timezone-0.5.28.min',
				'//emupedia.net/beta/emuos/js/libraries/moment-timezone-0.5.28.min',
				'//emuos.net/beta/emuos/js/libraries/moment-timezone-0.5.28.min',
				'//emuos.org/beta/emuos/js/libraries/moment-timezone-0.5.28.min'
		],
		'octokat': [
				'libraries/octokat-0.10.0',
				'/beta/emuos/js/libraries/octokat-0.10.0',
				'//emupedia.net/beta/emuos/js/libraries/octokat-0.10.0',
				'//emuos.net/beta/emuos/js/libraries/octokat-0.10.0',
				'//emuos.org/beta/emuos/js/libraries/octokat-0.10.0'
		],
		'pdfmake': [
				'libraries/pdfmake-0.1.65.min',
				'/beta/emuos/js/libraries/pdfmake-0.1.65.min',
				'//emupedia.net/beta/emuos/js/libraries/pdfmake-0.1.65.min',
				'//emuos.net/beta/emuos/js/libraries/pdfmake-0.1.65.min',
				'//emuos.org/beta/emuos/js/libraries/pdfmake-0.1.65.min'
		],
		'pdfmake-fonts': [
				'libraries/pdfmake-fonts-0.1.65.min',
				'/beta/emuos/js/libraries/pdfmake-fonts-0.1.65.min',
				'//emupedia.net/beta/emuos/js/libraries/pdfmake-fonts-0.1.65.min',
				'//emuos.net/beta/emuos/js/libraries/pdfmake-fonts-0.1.65.min',
				'//emuos.org/beta/emuos/js/libraries/pdfmake-fonts-0.1.65.min'
		],
		'perfect-scrollbar': [
				'libraries/perfect-scrollbar-1.5.0.min',
				'/beta/emuos/js/libraries/perfect-scrollbar-1.5.0.min',
				'//emupedia.net/beta/emuos/js/libraries/perfect-scrollbar-1.5.0.min',
				'//emuos.net/beta/emuos/js/libraries/perfect-scrollbar-1.5.0.min',
				'//emuos.org/beta/emuos/js/libraries/perfect-scrollbar-1.5.0.min'
		],
		'phaser': [
				'libraries/phaser-3.23.0.min',
				'/beta/emuos/js/libraries/phaser-3.23.0.min',
				'//emupedia.net/beta/emuos/js/libraries/phaser-3.23.0.min',
				'//emuos.net/beta/emuos/js/libraries/phaser-3.23.0.min',
				'//emuos.org/beta/emuos/js/libraries/phaser-3.23.0.min'
		],
		'phaser-arcade-physics': [
				'libraries/phaser-arcade-physics-3.23.0.min',
				'/beta/emuos/js/libraries/phaser-arcade-physics-3.23.0.min',
				'//emupedia.net/beta/emuos/js/libraries/phaser-arcade-physics-3.23.0.min',
				'//emuos.net/beta/emuos/js/libraries/phaser-arcade-physics-3.23.0.min',
				'//emuos.org/beta/emuos/js/libraries/phaser-arcade-physics-3.23.0.min'
		],
		'polyfill-es6-custom-elements': [
				'libraries/polyfill-es6-custom-elements-1.4.1.min',
				'/beta/emuos/js/libraries/polyfill-es6-custom-elements-1.4.1.min',
				'//emupedia.net/beta/emuos/js/libraries/polyfill-es6-custom-elements-1.4.1.min',
				'//emuos.net/beta/emuos/js/libraries/polyfill-es6-custom-elements-1.4.1.min',
				'//emuos.org/beta/emuos/js/libraries/polyfill-es6-custom-elements-1.4.1.min'
		],
		'polyfill-es6-custom-event': [
				'libraries/polyfill-es6-custom-event-1.0.7',
				'/beta/emuos/js/libraries/polyfill-es6-custom-event-1.0.7',
				'//emupedia.net/beta/emuos/js/libraries/polyfill-es6-custom-event-1.0.7',
				'//emuos.net/beta/emuos/js/libraries/polyfill-es6-custom-event-1.0.7',
				'//emuos.org/beta/emuos/js/libraries/polyfill-es6-custom-event-1.0.7'
		],
		'polyfill-es6-fetch': [
				'libraries/polyfill-es6-fetch-3.0.0',
				'/beta/emuos/js/libraries/polyfill-es6-fetch-3.0.0',
				'//emupedia.net/beta/emuos/js/libraries/polyfill-es6-fetch-3.0.0',
				'//emuos.net/beta/emuos/js/libraries/polyfill-es6-fetch-3.0.0',
				'//emuos.org/beta/emuos/js/libraries/polyfill-es6-fetch-3.0.0'
		],
		'polyfill-es6-html-imports': [
				'libraries/polyfill-es6-html-imports-1.2.4.min',
				'/beta/emuos/js/libraries/polyfill-es6-html-imports-1.2.4.min',
				'//emupedia.net/beta/emuos/js/libraries/polyfill-es6-html-imports-1.2.4.min',
				'//emuos.net/beta/emuos/js/libraries/polyfill-es6-html-imports-1.2.4.min',
				'//emuos.org/beta/emuos/js/libraries/polyfill-es6-html-imports-1.2.4.min'
		],
		'polyfill-es6-promise': [
				'libraries/polyfill-es6-promise-4.2.8.min',
				'/beta/emuos/js/libraries/polyfill-es6-promise-4.2.8.min',
				'//emupedia.net/beta/emuos/js/libraries/polyfill-es6-promise-4.2.8.min',
				'//emuos.net/beta/emuos/js/libraries/polyfill-es6-promise-4.2.8.min',
				'//emuos.org/beta/emuos/js/libraries/polyfill-es6-promise-4.2.8.min'
		],
		'polyfill-es6-web-components': [
				'libraries/polyfill-es6-web-components-2.4.3.min',
				'/beta/emuos/js/libraries/polyfill-es6-web-components-2.4.3.min',
				'//emupedia.net/beta/emuos/js/libraries/polyfill-es6-web-components-2.4.3.min',
				'//emuos.net/beta/emuos/js/libraries/polyfill-es6-web-components-2.4.3.min',
				'//emuos.org/beta/emuos/js/libraries/polyfill-es6-web-components-2.4.3.min'
		],
		'polyfill-es7-babel-polyfill': [
				'libraries/polyfill-es7-babel-polyfill-7.8.7.min',
				'/beta/emuos/js/libraries/polyfill-es7-babel-polyfill-7.8.7.min',
				'//emupedia.net/beta/emuos/js/libraries/polyfill-es7-babel-polyfill-7.8.7.min',
				'//emuos.net/beta/emuos/js/libraries/polyfill-es7-babel-polyfill-7.8.7.min',
				'//emuos.org/beta/emuos/js/libraries/polyfill-es7-babel-polyfill-7.8.7.min'
		],
		'popper': [
				'libraries/popper-1.16.1.min',
				'/beta/emuos/js/libraries/popper-1.16.1.min',
				'//emupedia.net/beta/emuos/js/libraries/popper-1.16.1.min',
				'//emuos.net/beta/emuos/js/libraries/popper-1.16.1.min',
				'//emuos.org/beta/emuos/js/libraries/popper-1.16.1.min'
		],
		'purl': [
				'libraries/purl-2.3.1',
				'/beta/emuos/js/libraries/purl-2.3.1',
				'//emupedia.net/beta/emuos/js/libraries/purl-2.3.1',
				'//emuos.net/beta/emuos/js/libraries/purl-2.3.1',
				'//emuos.org/beta/emuos/js/libraries/purl-2.3.1'
		],
		'requirejs': [
				'libraries/requirejs-2.3.6',
				'/beta/emuos/js/libraries/requirejs-2.3.6',
				'//emupedia.net/beta/emuos/js/libraries/requirejs-2.3.6',
				'//emuos.net/beta/emuos/js/libraries/requirejs-2.3.6',
				'//emuos.org/beta/emuos/js/libraries/requirejs-2.3.6'
		],
		'requirejs-json': [
				'libraries/requirejs-json-1.0.3',
				'/beta/emuos/js/libraries/requirejs-json-1.0.3',
				'//emupedia.net/beta/emuos/js/libraries/requirejs-json-1.0.3',
				'//emuos.net/beta/emuos/js/libraries/requirejs-json-1.0.3',
				'//emuos.org/beta/emuos/js/libraries/requirejs-json-1.0.3'
		],
		'requirejs-noext': [
				'libraries/requirejs-noext-1.0.3',
				'/beta/emuos/js/libraries/requirejs-noext-1.0.3',
				'//emupedia.net/beta/emuos/js/libraries/requirejs-noext-1.0.3',
				'//emuos.net/beta/emuos/js/libraries/requirejs-noext-1.0.3',
				'//emuos.org/beta/emuos/js/libraries/requirejs-noext-1.0.3'
		],
		'requirejs-text': [
				'libraries/requirejs-text-2.0.15',
				'/beta/emuos/js/libraries/requirejs-text-2.0.15',
				'//emupedia.net/beta/emuos/js/libraries/requirejs-text-2.0.15',
				'//emuos.net/beta/emuos/js/libraries/requirejs-text-2.0.15',
				'//emuos.org/beta/emuos/js/libraries/requirejs-text-2.0.15'
		],
		'select2': [
				'libraries/select2-4.0.13.min',
				'/beta/emuos/js/libraries/select2-4.0.13.min',
				'//emupedia.net/beta/emuos/js/libraries/select2-4.0.13.min',
				'//emuos.net/beta/emuos/js/libraries/select2-4.0.13.min',
				'//emuos.org/beta/emuos/js/libraries/select2-4.0.13.min'
		],
		'simplestorage': [
				'libraries/simplestorage-0.2.1.min',
				'/beta/emuos/js/libraries/simplestorage-0.2.1.min',
				'//emupedia.net/beta/emuos/js/libraries/simplestorage-0.2.1.min',
				'//emuos.net/beta/emuos/js/libraries/simplestorage-0.2.1.min',
				'//emuos.org/beta/emuos/js/libraries/simplestorage-0.2.1.min'
		],
		'twemoji': [
				'libraries/twemoji-12.1.6.min',
				'/beta/emuos/js/libraries/twemoji-12.1.6.min',
				'//emupedia.net/beta/emuos/js/libraries/twemoji-12.1.6.min',
				'//emuos.net/beta/emuos/js/libraries/twemoji-12.1.6.min',
				'//emuos.org/beta/emuos/js/libraries/twemoji-12.1.6.min'
		],
		'xterm': [
				'libraries/xterm-4.5.0.min',
				'/beta/emuos/js/libraries/xterm-4.5.0.min',
				'//emupedia.net/beta/emuos/js/libraries/xterm-4.5.0.min',
				'//emuos.net/beta/emuos/js/libraries/xterm-4.5.0.min',
				'//emuos.org/beta/emuos/js/libraries/xterm-4.5.0.min'
		],
		'desktop': [
				'desktop',
				'/beta/emuos/js/desktop',
				'//emupedia.net/beta/emuos/js/desktop',
				'//emuos.net/beta/emuos/js/desktop',
				'//emuos.org/beta/emuos/js/desktop'
		],
		'emoticons': [
				'emoticons',
				'/beta/emuos/js/emoticons',
				'//emupedia.net/beta/emuos/js/emoticons',
				'//emuos.net/beta/emuos/js/emoticons',
				'//emuos.org/beta/emuos/js/emoticons'
		],
		'emuos': [
				'emuos',
				'/beta/emuos/js/emuos',
				'//emupedia.net/beta/emuos/js/emuos',
				'//emuos.net/beta/emuos/js/emuos',
				'//emuos.org/beta/emuos/js/emuos'
		],
		'router': [
				'router',
				'/beta/emuos/js/router',
				'//emupedia.net/beta/emuos/js/router',
				'//emuos.net/beta/emuos/js/router',
				'//emuos.org/beta/emuos/js/router'
		],
		'filesystem': [
				'filesystem',
				'/beta/emuos/js/filesystem',
				'//emupedia.net/beta/emuos/js/filesystem',
				'//emuos.net/beta/emuos/js/filesystem',
				'//emuos.org/beta/emuos/js/filesystem'
		],
		'lang-en': [
				'lang-en',
				'/beta/emuos/js/lang-en',
				'//emupedia.net/beta/emuos/js/lang-en',
				'//emuos.net/beta/emuos/js/lang-en',
				'//emuos.org/beta/emuos/js/lang-en'
		],
		'network': [
				'network',
				'/beta/emuos/js/network',
				'//emupedia.net/beta/emuos/js/network',
				'//emuos.net/beta/emuos/js/network',
				'//emuos.org/beta/emuos/js/network'
		],
		'taskbar': [
				'taskbar',
				'/beta/emuos/js/taskbar',
				'//emupedia.net/beta/emuos/js/taskbar',
				'//emuos.net/beta/emuos/js/taskbar',
				'//emuos.org/beta/emuos/js/taskbar'
		],
		'window': [
				'window',
				'/beta/emuos/js/window',
				'//emupedia.net/beta/emuos/js/window',
				'//emuos.net/beta/emuos/js/window',
				'//emuos.org/beta/emuos/js/window'
		],
		'socket': [
				'socket',
				'/beta/emuos/js/socket',
				'//emupedia.net/beta/emuos/js/socket',
				'//emuos.net/beta/emuos/js/socket',
				'//emuos.org/beta/emuos/js/socket'
		],
		'ga': '//www.google-analytics.com/analytics'
};

	// endregion
}(this));