// noinspection ThisExpressionReferencesGlobalObjectJS
(function(global) {
	if (typeof global['$sys'] === 'undefined') {
		global['$sys'] = {};
	}

	// region Libraries

	global['$sys']['lib'] = {
		'babel-standalone': [
				'libraries/babel-standalone-7.8.7.min',
				'/beta/emuos/js/libraries/babel-standalone-7.8.7.min',
				'//emupedia.net/beta/emuos/js/libraries/babel-standalone-7.8.7.min',
				'//emuos.net/beta/emuos/js/libraries/babel-standalone-7.8.7.min',
				'//emuos.org/beta/emuos/js/libraries/babel-standalone-7.8.7.min'
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
				'libraries/hybrids-4.1.6.min',
				'/beta/emuos/js/libraries/hybrids-4.1.6.min',
				'//emupedia.net/beta/emuos/js/libraries/hybrids-4.1.6.min',
				'//emuos.net/beta/emuos/js/libraries/hybrids-4.1.6.min',
				'//emuos.org/beta/emuos/js/libraries/hybrids-4.1.6.min'
		],
		'i18next': [
				'libraries/i18next-19.3.2.min',
				'/beta/emuos/js/libraries/i18next-19.3.2.min',
				'//emupedia.net/beta/emuos/js/libraries/i18next-19.3.2.min',
				'//emuos.net/beta/emuos/js/libraries/i18next-19.3.2.min',
				'//emuos.org/beta/emuos/js/libraries/i18next-19.3.2.min'
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
				'libraries/jquery-3.4.1.min',
				'/beta/emuos/js/libraries/jquery-3.4.1.min',
				'//emupedia.net/beta/emuos/js/libraries/jquery-3.4.1.min',
				'//emuos.net/beta/emuos/js/libraries/jquery-3.4.1.min',
				'//emuos.org/beta/emuos/js/libraries/jquery-3.4.1.min'
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
				'libraries/jquery-migrate-3.1.0.min',
				'/beta/emuos/js/libraries/jquery-migrate-3.1.0.min',
				'//emupedia.net/beta/emuos/js/libraries/jquery-migrate-3.1.0.min',
				'//emuos.net/beta/emuos/js/libraries/jquery-migrate-3.1.0.min',
				'//emuos.org/beta/emuos/js/libraries/jquery-migrate-3.1.0.min'
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
				'libraries/jsrsasign-all-8.0.12.min',
				'/beta/emuos/js/libraries/jsrsasign-all-8.0.12.min',
				'//emupedia.net/beta/emuos/js/libraries/jsrsasign-all-8.0.12.min',
				'//emuos.net/beta/emuos/js/libraries/jsrsasign-all-8.0.12.min',
				'//emuos.org/beta/emuos/js/libraries/jsrsasign-all-8.0.12.min'
		],
		'jszip': [
				'libraries/jszip-3.2.2.min',
				'/beta/emuos/js/libraries/jszip-3.2.2.min',
				'//emupedia.net/beta/emuos/js/libraries/jszip-3.2.2.min',
				'//emuos.net/beta/emuos/js/libraries/jszip-3.2.2.min',
				'//emuos.org/beta/emuos/js/libraries/jszip-3.2.2.min'
		],
		'lightgallery': [
				'libraries/lightgallery-1.6.12.min',
				'/beta/emuos/js/libraries/lightgallery-1.6.12.min',
				'//emupedia.net/beta/emuos/js/libraries/lightgallery-1.6.12.min',
				'//emuos.net/beta/emuos/js/libraries/lightgallery-1.6.12.min',
				'//emuos.org/beta/emuos/js/libraries/lightgallery-1.6.12.min'
		],
		'lightgallery-autoplay': [
				'libraries/lightgallery-autoplay-1.6.12.min',
				'/beta/emuos/js/libraries/lightgallery-autoplay-1.6.12.min',
				'//emupedia.net/beta/emuos/js/libraries/lightgallery-autoplay-1.6.12.min',
				'//emuos.net/beta/emuos/js/libraries/lightgallery-autoplay-1.6.12.min',
				'//emuos.org/beta/emuos/js/libraries/lightgallery-autoplay-1.6.12.min'
		],
		'lightgallery-fullscreen': [
				'libraries/lightgallery-fullscreen-1.6.12.min',
				'/beta/emuos/js/libraries/lightgallery-fullscreen-1.6.12.min',
				'//emupedia.net/beta/emuos/js/libraries/lightgallery-fullscreen-1.6.12.min',
				'//emuos.net/beta/emuos/js/libraries/lightgallery-fullscreen-1.6.12.min',
				'//emuos.org/beta/emuos/js/libraries/lightgallery-fullscreen-1.6.12.min'
		],
		'lightgallery-hash': [
				'libraries/lightgallery-hash-1.6.12.min',
				'/beta/emuos/js/libraries/lightgallery-hash-1.6.12.min',
				'//emupedia.net/beta/emuos/js/libraries/lightgallery-hash-1.6.12.min',
				'//emuos.net/beta/emuos/js/libraries/lightgallery-hash-1.6.12.min',
				'//emuos.org/beta/emuos/js/libraries/lightgallery-hash-1.6.12.min'
		],
		'lightgallery-pager': [
				'libraries/lightgallery-pager-1.6.12.min',
				'/beta/emuos/js/libraries/lightgallery-pager-1.6.12.min',
				'//emupedia.net/beta/emuos/js/libraries/lightgallery-pager-1.6.12.min',
				'//emuos.net/beta/emuos/js/libraries/lightgallery-pager-1.6.12.min',
				'//emuos.org/beta/emuos/js/libraries/lightgallery-pager-1.6.12.min'
		],
		'lightgallery-share': [
				'libraries/lightgallery-share-1.6.12.min',
				'/beta/emuos/js/libraries/lightgallery-share-1.6.12.min',
				'//emupedia.net/beta/emuos/js/libraries/lightgallery-share-1.6.12.min',
				'//emuos.net/beta/emuos/js/libraries/lightgallery-share-1.6.12.min',
				'//emuos.org/beta/emuos/js/libraries/lightgallery-share-1.6.12.min'
		],
		'lightgallery-thumbnail': [
				'libraries/lightgallery-thumbnail-1.6.12.min',
				'/beta/emuos/js/libraries/lightgallery-thumbnail-1.6.12.min',
				'//emupedia.net/beta/emuos/js/libraries/lightgallery-thumbnail-1.6.12.min',
				'//emuos.net/beta/emuos/js/libraries/lightgallery-thumbnail-1.6.12.min',
				'//emuos.org/beta/emuos/js/libraries/lightgallery-thumbnail-1.6.12.min'
		],
		'lightgallery-video': [
				'libraries/lightgallery-video-1.6.12.min',
				'/beta/emuos/js/libraries/lightgallery-video-1.6.12.min',
				'//emupedia.net/beta/emuos/js/libraries/lightgallery-video-1.6.12.min',
				'//emuos.net/beta/emuos/js/libraries/lightgallery-video-1.6.12.min',
				'//emuos.org/beta/emuos/js/libraries/lightgallery-video-1.6.12.min'
		],
		'lightgallery-zoom': [
				'libraries/lightgallery-zoom-1.6.12.min',
				'/beta/emuos/js/libraries/lightgallery-zoom-1.6.12.min',
				'//emupedia.net/beta/emuos/js/libraries/lightgallery-zoom-1.6.12.min',
				'//emuos.net/beta/emuos/js/libraries/lightgallery-zoom-1.6.12.min',
				'//emuos.org/beta/emuos/js/libraries/lightgallery-zoom-1.6.12.min'
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
				'libraries/moment-2.24.0.min',
				'/beta/emuos/js/libraries/moment-2.24.0.min',
				'//emupedia.net/beta/emuos/js/libraries/moment-2.24.0.min',
				'//emuos.net/beta/emuos/js/libraries/moment-2.24.0.min',
				'//emuos.org/beta/emuos/js/libraries/moment-2.24.0.min'
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
				'libraries/phaser-3.22.0.min',
				'/beta/emuos/js/libraries/phaser-3.22.0.min',
				'//emupedia.net/beta/emuos/js/libraries/phaser-3.22.0.min',
				'//emuos.net/beta/emuos/js/libraries/phaser-3.22.0.min',
				'//emuos.org/beta/emuos/js/libraries/phaser-3.22.0.min'
		],
		'phaser-arcade-physics': [
				'libraries/phaser-arcade-physics-3.22.0.min',
				'/beta/emuos/js/libraries/phaser-arcade-physics-3.22.0.min',
				'//emupedia.net/beta/emuos/js/libraries/phaser-arcade-physics-3.22.0.min',
				'//emuos.net/beta/emuos/js/libraries/phaser-arcade-physics-3.22.0.min',
				'//emuos.org/beta/emuos/js/libraries/phaser-arcade-physics-3.22.0.min'
		],
		'polyfill-es6-custom-elements': [
				'libraries/polyfill-es6-custom-elements-1.4.0.min',
				'/beta/emuos/js/libraries/polyfill-es6-custom-elements-1.4.0.min',
				'//emupedia.net/beta/emuos/js/libraries/polyfill-es6-custom-elements-1.4.0.min',
				'//emuos.net/beta/emuos/js/libraries/polyfill-es6-custom-elements-1.4.0.min',
				'//emuos.org/beta/emuos/js/libraries/polyfill-es6-custom-elements-1.4.0.min'
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
				'libraries/polyfill-es6-html-imports-1.2.3.min',
				'/beta/emuos/js/libraries/polyfill-es6-html-imports-1.2.3.min',
				'//emupedia.net/beta/emuos/js/libraries/polyfill-es6-html-imports-1.2.3.min',
				'//emuos.net/beta/emuos/js/libraries/polyfill-es6-html-imports-1.2.3.min',
				'//emuos.org/beta/emuos/js/libraries/polyfill-es6-html-imports-1.2.3.min'
		],
		'polyfill-es6-promise': [
				'libraries/polyfill-es6-promise-4.2.8.min',
				'/beta/emuos/js/libraries/polyfill-es6-promise-4.2.8.min',
				'//emupedia.net/beta/emuos/js/libraries/polyfill-es6-promise-4.2.8.min',
				'//emuos.net/beta/emuos/js/libraries/polyfill-es6-promise-4.2.8.min',
				'//emuos.org/beta/emuos/js/libraries/polyfill-es6-promise-4.2.8.min'
		],
		'polyfill-es6-web-components': [
				'libraries/polyfill-es6-web-components-2.4.2.min',
				'/beta/emuos/js/libraries/polyfill-es6-web-components-2.4.2.min',
				'//emupedia.net/beta/emuos/js/libraries/polyfill-es6-web-components-2.4.2.min',
				'//emuos.net/beta/emuos/js/libraries/polyfill-es6-web-components-2.4.2.min',
				'//emuos.org/beta/emuos/js/libraries/polyfill-es6-web-components-2.4.2.min'
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
		'socket.io': [
				'libraries/socket.io-2.3.0.min',
				'/beta/emuos/js/libraries/socket.io-2.3.0.min',
				'//emupedia.net/beta/emuos/js/libraries/socket.io-2.3.0.min',
				'//emuos.net/beta/emuos/js/libraries/socket.io-2.3.0.min',
				'//emuos.org/beta/emuos/js/libraries/socket.io-2.3.0.min'
		],
		'twemoji': [
				'libraries/twemoji-12.1.5.min',
				'/beta/emuos/js/libraries/twemoji-12.1.5.min',
				'//emupedia.net/beta/emuos/js/libraries/twemoji-12.1.5.min',
				'//emuos.net/beta/emuos/js/libraries/twemoji-12.1.5.min',
				'//emuos.org/beta/emuos/js/libraries/twemoji-12.1.5.min'
		],
		'xterm': [
				'libraries/xterm-4.4.0.min',
				'/beta/emuos/js/libraries/xterm-4.4.0.min',
				'//emupedia.net/beta/emuos/js/libraries/xterm-4.4.0.min',
				'//emuos.net/beta/emuos/js/libraries/xterm-4.4.0.min',
				'//emuos.org/beta/emuos/js/libraries/xterm-4.4.0.min'
		],
		'desktop': [
				'desktop',
				'/beta/emuos/desktop',
				'//emupedia.net/beta/emuos/desktop',
				'//emuos.net/beta/emuos/desktop',
				'//emuos.org/beta/emuos/desktop'
		],
		'emoticons': [
				'emoticons',
				'/beta/emuos/emoticons',
				'//emupedia.net/beta/emuos/emoticons',
				'//emuos.net/beta/emuos/emoticons',
				'//emuos.org/beta/emuos/emoticons'
		],
		'emuos': [
				'emuos',
				'/beta/emuos/emuos',
				'//emupedia.net/beta/emuos/emuos',
				'//emuos.net/beta/emuos/emuos',
				'//emuos.org/beta/emuos/emuos'
		],
		'filesystem': [
				'filesystem',
				'/beta/emuos/filesystem',
				'//emupedia.net/beta/emuos/filesystem',
				'//emuos.net/beta/emuos/filesystem',
				'//emuos.org/beta/emuos/filesystem'
		],
		'lang-en': [
				'lang-en',
				'/beta/emuos/lang-en',
				'//emupedia.net/beta/emuos/lang-en',
				'//emuos.net/beta/emuos/lang-en',
				'//emuos.org/beta/emuos/lang-en'
		],
		'network': [
				'network',
				'/beta/emuos/network',
				'//emupedia.net/beta/emuos/network',
				'//emuos.net/beta/emuos/network',
				'//emuos.org/beta/emuos/network'
		],
		'socket': [
				'//ws.emupedia.net/app/u_socket_es5',
				'//ws.emuos.net/app/u_socket_es5',
				'//ws.emuos.org/app/u_socket_es5',
				'socket',
				'/beta/emuos/socket',
				'//emupedia.net/beta/emuos/socket',
				'//emuos.net/beta/emuos/socket',
				'//emuos.org/beta/emuos/socket'
		],
		'taskbar': [
				'taskbar',
				'/beta/emuos/taskbar',
				'//emupedia.net/beta/emuos/taskbar',
				'//emuos.net/beta/emuos/taskbar',
				'//emuos.org/beta/emuos/taskbar'
		],
		'window': [
				'window',
				'/beta/emuos/window',
				'//emupedia.net/beta/emuos/window',
				'//emuos.net/beta/emuos/window',
				'//emuos.org/beta/emuos/window'
		],
		'ga': '//www.google-analytics.com/analytics'
};

	// endregion
}(this));