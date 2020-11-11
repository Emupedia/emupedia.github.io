// noinspection ThisExpressionReferencesGlobalObjectJS
(function(global) {
	if (typeof global['$sys'] === 'undefined') {
		global['$sys'] = {};
	}

	// region Libraries

	global['$sys']['lib'] = {
		'babel-polyfill': [
				'libraries/babel-polyfill-7.11.5.min',
				'/beta/emuos/assets/js/libraries/babel-polyfill-7.11.5.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/babel-polyfill-7.11.5.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/babel-polyfill-7.11.5.min',
				'//emuos.net/beta/emuos/assets/js/libraries/babel-polyfill-7.11.5.min',
				'//emuos.org/beta/emuos/assets/js/libraries/babel-polyfill-7.11.5.min'
		],
		'babel-standalone': [
				'libraries/babel-standalone-7.11.6.min',
				'/beta/emuos/assets/js/libraries/babel-standalone-7.11.6.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/babel-standalone-7.11.6.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/babel-standalone-7.11.6.min',
				'//emuos.net/beta/emuos/assets/js/libraries/babel-standalone-7.11.6.min',
				'//emuos.org/beta/emuos/assets/js/libraries/babel-standalone-7.11.6.min'
		],
		'bootstrap': [
				'libraries/bootstrap-4.5.2.min',
				'/beta/emuos/assets/js/libraries/bootstrap-4.5.2.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/bootstrap-4.5.2.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/bootstrap-4.5.2.min',
				'//emuos.net/beta/emuos/assets/js/libraries/bootstrap-4.5.2.min',
				'//emuos.org/beta/emuos/assets/js/libraries/bootstrap-4.5.2.min'
		],
		'browserfs': [
				'libraries/browserfs-1.4.3.min',
				'/beta/emuos/assets/js/libraries/browserfs-1.4.3.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/browserfs-1.4.3.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/browserfs-1.4.3.min',
				'//emuos.net/beta/emuos/assets/js/libraries/browserfs-1.4.3.min',
				'//emuos.org/beta/emuos/assets/js/libraries/browserfs-1.4.3.min'
		],
		'buzz': [
				'libraries/buzz-1.2.1.min',
				'/beta/emuos/assets/js/libraries/buzz-1.2.1.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/buzz-1.2.1.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/buzz-1.2.1.min',
				'//emuos.net/beta/emuos/assets/js/libraries/buzz-1.2.1.min',
				'//emuos.org/beta/emuos/assets/js/libraries/buzz-1.2.1.min'
		],
		'clippy': [
				'libraries/clippy-0.0.3',
				'/beta/emuos/assets/js/libraries/clippy-0.0.3',
				'//emupedia.net/beta/emuos/assets/js/libraries/clippy-0.0.3',
				'//emupedia.org/beta/emuos/assets/js/libraries/clippy-0.0.3',
				'//emuos.net/beta/emuos/assets/js/libraries/clippy-0.0.3',
				'//emuos.org/beta/emuos/assets/js/libraries/clippy-0.0.3'
		],
		'custom-elements': [
				'libraries/custom-elements-1.4.2.min',
				'/beta/emuos/assets/js/libraries/custom-elements-1.4.2.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/custom-elements-1.4.2.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/custom-elements-1.4.2.min',
				'//emuos.net/beta/emuos/assets/js/libraries/custom-elements-1.4.2.min',
				'//emuos.org/beta/emuos/assets/js/libraries/custom-elements-1.4.2.min'
		],
		'custom-event': [
				'libraries/custom-event-1.0.7',
				'/beta/emuos/assets/js/libraries/custom-event-1.0.7',
				'//emupedia.net/beta/emuos/assets/js/libraries/custom-event-1.0.7',
				'//emupedia.org/beta/emuos/assets/js/libraries/custom-event-1.0.7',
				'//emuos.net/beta/emuos/assets/js/libraries/custom-event-1.0.7',
				'//emuos.org/beta/emuos/assets/js/libraries/custom-event-1.0.7'
		],
		'datatables': [
				'libraries/datatables-1.10.22.min',
				'/beta/emuos/assets/js/libraries/datatables-1.10.22.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/datatables-1.10.22.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/datatables-1.10.22.min',
				'//emuos.net/beta/emuos/assets/js/libraries/datatables-1.10.22.min',
				'//emuos.org/beta/emuos/assets/js/libraries/datatables-1.10.22.min'
		],
		'datatables-bootstrap4': [
				'libraries/datatables-bootstrap4-1.10.22.min',
				'/beta/emuos/assets/js/libraries/datatables-bootstrap4-1.10.22.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/datatables-bootstrap4-1.10.22.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/datatables-bootstrap4-1.10.22.min',
				'//emuos.net/beta/emuos/assets/js/libraries/datatables-bootstrap4-1.10.22.min',
				'//emuos.org/beta/emuos/assets/js/libraries/datatables-bootstrap4-1.10.22.min'
		],
		'datatables-buttons': [
				'libraries/datatables-buttons-1.6.4.min',
				'/beta/emuos/assets/js/libraries/datatables-buttons-1.6.4.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/datatables-buttons-1.6.4.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/datatables-buttons-1.6.4.min',
				'//emuos.net/beta/emuos/assets/js/libraries/datatables-buttons-1.6.4.min',
				'//emuos.org/beta/emuos/assets/js/libraries/datatables-buttons-1.6.4.min'
		],
		'datatables-buttons-bootstrap4': [
				'libraries/datatables-buttons-bootstrap4-1.6.4.min',
				'/beta/emuos/assets/js/libraries/datatables-buttons-bootstrap4-1.6.4.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/datatables-buttons-bootstrap4-1.6.4.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/datatables-buttons-bootstrap4-1.6.4.min',
				'//emuos.net/beta/emuos/assets/js/libraries/datatables-buttons-bootstrap4-1.6.4.min',
				'//emuos.org/beta/emuos/assets/js/libraries/datatables-buttons-bootstrap4-1.6.4.min'
		],
		'datatables-buttons-colvis': [
				'libraries/datatables-buttons-colvis-1.6.4.min',
				'/beta/emuos/assets/js/libraries/datatables-buttons-colvis-1.6.4.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/datatables-buttons-colvis-1.6.4.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/datatables-buttons-colvis-1.6.4.min',
				'//emuos.net/beta/emuos/assets/js/libraries/datatables-buttons-colvis-1.6.4.min',
				'//emuos.org/beta/emuos/assets/js/libraries/datatables-buttons-colvis-1.6.4.min'
		],
		'datatables-buttons-flash': [
				'libraries/datatables-buttons-flash-1.6.4.min',
				'/beta/emuos/assets/js/libraries/datatables-buttons-flash-1.6.4.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/datatables-buttons-flash-1.6.4.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/datatables-buttons-flash-1.6.4.min',
				'//emuos.net/beta/emuos/assets/js/libraries/datatables-buttons-flash-1.6.4.min',
				'//emuos.org/beta/emuos/assets/js/libraries/datatables-buttons-flash-1.6.4.min'
		],
		'datatables-buttons-html5': [
				'libraries/datatables-buttons-html5-1.6.4.min',
				'/beta/emuos/assets/js/libraries/datatables-buttons-html5-1.6.4.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/datatables-buttons-html5-1.6.4.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/datatables-buttons-html5-1.6.4.min',
				'//emuos.net/beta/emuos/assets/js/libraries/datatables-buttons-html5-1.6.4.min',
				'//emuos.org/beta/emuos/assets/js/libraries/datatables-buttons-html5-1.6.4.min'
		],
		'datatables-buttons-print': [
				'libraries/datatables-buttons-print-1.6.4.min',
				'/beta/emuos/assets/js/libraries/datatables-buttons-print-1.6.4.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/datatables-buttons-print-1.6.4.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/datatables-buttons-print-1.6.4.min',
				'//emuos.net/beta/emuos/assets/js/libraries/datatables-buttons-print-1.6.4.min',
				'//emuos.org/beta/emuos/assets/js/libraries/datatables-buttons-print-1.6.4.min'
		],
		'datatables-colreorder': [
				'libraries/datatables-colreorder-1.5.2.min',
				'/beta/emuos/assets/js/libraries/datatables-colreorder-1.5.2.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/datatables-colreorder-1.5.2.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/datatables-colreorder-1.5.2.min',
				'//emuos.net/beta/emuos/assets/js/libraries/datatables-colreorder-1.5.2.min',
				'//emuos.org/beta/emuos/assets/js/libraries/datatables-colreorder-1.5.2.min'
		],
		'datatables-colreorder-bootstrap4': [
				'libraries/datatables-colreorder-bootstrap4-1.5.2.min',
				'/beta/emuos/assets/js/libraries/datatables-colreorder-bootstrap4-1.5.2.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/datatables-colreorder-bootstrap4-1.5.2.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/datatables-colreorder-bootstrap4-1.5.2.min',
				'//emuos.net/beta/emuos/assets/js/libraries/datatables-colreorder-bootstrap4-1.5.2.min',
				'//emuos.org/beta/emuos/assets/js/libraries/datatables-colreorder-bootstrap4-1.5.2.min'
		],
		'datatables-editor': [
				'libraries/datatables-editor-1.6.7.min',
				'/beta/emuos/assets/js/libraries/datatables-editor-1.6.7.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/datatables-editor-1.6.7.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/datatables-editor-1.6.7.min',
				'//emuos.net/beta/emuos/assets/js/libraries/datatables-editor-1.6.7.min',
				'//emuos.org/beta/emuos/assets/js/libraries/datatables-editor-1.6.7.min'
		],
		'datatables-ellipsis': [
				'libraries/datatables-ellipsis-1.10.20',
				'/beta/emuos/assets/js/libraries/datatables-ellipsis-1.10.20',
				'//emupedia.net/beta/emuos/assets/js/libraries/datatables-ellipsis-1.10.20',
				'//emupedia.org/beta/emuos/assets/js/libraries/datatables-ellipsis-1.10.20',
				'//emuos.net/beta/emuos/assets/js/libraries/datatables-ellipsis-1.10.20',
				'//emuos.org/beta/emuos/assets/js/libraries/datatables-ellipsis-1.10.20'
		],
		'datatables-fixedcolumns': [
				'libraries/datatables-fixedcolumns-3.3.2.min',
				'/beta/emuos/assets/js/libraries/datatables-fixedcolumns-3.3.2.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/datatables-fixedcolumns-3.3.2.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/datatables-fixedcolumns-3.3.2.min',
				'//emuos.net/beta/emuos/assets/js/libraries/datatables-fixedcolumns-3.3.2.min',
				'//emuos.org/beta/emuos/assets/js/libraries/datatables-fixedcolumns-3.3.2.min'
		],
		'datatables-fixedcolumns-bootstrap4': [
				'libraries/datatables-fixedcolumns-bootstrap4-3.3.2.min',
				'/beta/emuos/assets/js/libraries/datatables-fixedcolumns-bootstrap4-3.3.2.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/datatables-fixedcolumns-bootstrap4-3.3.2.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/datatables-fixedcolumns-bootstrap4-3.3.2.min',
				'//emuos.net/beta/emuos/assets/js/libraries/datatables-fixedcolumns-bootstrap4-3.3.2.min',
				'//emuos.org/beta/emuos/assets/js/libraries/datatables-fixedcolumns-bootstrap4-3.3.2.min'
		],
		'datatables-fixedheader': [
				'libraries/datatables-fixedheader-3.1.7.min',
				'/beta/emuos/assets/js/libraries/datatables-fixedheader-3.1.7.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/datatables-fixedheader-3.1.7.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/datatables-fixedheader-3.1.7.min',
				'//emuos.net/beta/emuos/assets/js/libraries/datatables-fixedheader-3.1.7.min',
				'//emuos.org/beta/emuos/assets/js/libraries/datatables-fixedheader-3.1.7.min'
		],
		'datatables-fixedheader-bootstrap4': [
				'libraries/datatables-fixedheader-bootstrap4-3.1.7.min',
				'/beta/emuos/assets/js/libraries/datatables-fixedheader-bootstrap4-3.1.7.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/datatables-fixedheader-bootstrap4-3.1.7.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/datatables-fixedheader-bootstrap4-3.1.7.min',
				'//emuos.net/beta/emuos/assets/js/libraries/datatables-fixedheader-bootstrap4-3.1.7.min',
				'//emuos.org/beta/emuos/assets/js/libraries/datatables-fixedheader-bootstrap4-3.1.7.min'
		],
		'datatables-responsive': [
				'libraries/datatables-responsive-2.2.6.min',
				'/beta/emuos/assets/js/libraries/datatables-responsive-2.2.6.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/datatables-responsive-2.2.6.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/datatables-responsive-2.2.6.min',
				'//emuos.net/beta/emuos/assets/js/libraries/datatables-responsive-2.2.6.min',
				'//emuos.org/beta/emuos/assets/js/libraries/datatables-responsive-2.2.6.min'
		],
		'datatables-responsive-bootstrap4': [
				'libraries/datatables-responsive-bootstrap4-2.2.6.min',
				'/beta/emuos/assets/js/libraries/datatables-responsive-bootstrap4-2.2.6.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/datatables-responsive-bootstrap4-2.2.6.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/datatables-responsive-bootstrap4-2.2.6.min',
				'//emuos.net/beta/emuos/assets/js/libraries/datatables-responsive-bootstrap4-2.2.6.min',
				'//emuos.org/beta/emuos/assets/js/libraries/datatables-responsive-bootstrap4-2.2.6.min'
		],
		'datatables-select': [
				'libraries/datatables-select-1.3.1.min',
				'/beta/emuos/assets/js/libraries/datatables-select-1.3.1.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/datatables-select-1.3.1.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/datatables-select-1.3.1.min',
				'//emuos.net/beta/emuos/assets/js/libraries/datatables-select-1.3.1.min',
				'//emuos.org/beta/emuos/assets/js/libraries/datatables-select-1.3.1.min'
		],
		'datatables-select-bootstrap4': [
				'libraries/datatables-select-bootstrap4-1.3.1.min',
				'/beta/emuos/assets/js/libraries/datatables-select-bootstrap4-1.3.1.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/datatables-select-bootstrap4-1.3.1.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/datatables-select-bootstrap4-1.3.1.min',
				'//emuos.net/beta/emuos/assets/js/libraries/datatables-select-bootstrap4-1.3.1.min',
				'//emuos.org/beta/emuos/assets/js/libraries/datatables-select-bootstrap4-1.3.1.min'
		],
		'dropbox': [
				'libraries/dropbox-5.2.1.min',
				'/beta/emuos/assets/js/libraries/dropbox-5.2.1.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/dropbox-5.2.1.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/dropbox-5.2.1.min',
				'//emuos.net/beta/emuos/assets/js/libraries/dropbox-5.2.1.min',
				'//emuos.org/beta/emuos/assets/js/libraries/dropbox-5.2.1.min'
		],
		'dropbox-team': [
				'libraries/dropbox-team-5.2.1.min',
				'/beta/emuos/assets/js/libraries/dropbox-team-5.2.1.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/dropbox-team-5.2.1.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/dropbox-team-5.2.1.min',
				'//emuos.net/beta/emuos/assets/js/libraries/dropbox-team-5.2.1.min',
				'//emuos.org/beta/emuos/assets/js/libraries/dropbox-team-5.2.1.min'
		],
		'emularity': [
				'libraries/emularity',
				'/beta/emuos/assets/js/libraries/emularity',
				'//emupedia.net/beta/emuos/assets/js/libraries/emularity',
				'//emupedia.org/beta/emuos/assets/js/libraries/emularity',
				'//emuos.net/beta/emuos/assets/js/libraries/emularity',
				'//emuos.org/beta/emuos/assets/js/libraries/emularity'
		],
		'esheep': [
				'libraries/esheep-0.7.2.min',
				'/beta/emuos/assets/js/libraries/esheep-0.7.2.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/esheep-0.7.2.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/esheep-0.7.2.min',
				'//emuos.net/beta/emuos/assets/js/libraries/esheep-0.7.2.min',
				'//emuos.org/beta/emuos/assets/js/libraries/esheep-0.7.2.min'
		],
		'fetch': [
				'libraries/fetch-3.4.1',
				'/beta/emuos/assets/js/libraries/fetch-3.4.1',
				'//emupedia.net/beta/emuos/assets/js/libraries/fetch-3.4.1',
				'//emupedia.org/beta/emuos/assets/js/libraries/fetch-3.4.1',
				'//emuos.net/beta/emuos/assets/js/libraries/fetch-3.4.1',
				'//emuos.org/beta/emuos/assets/js/libraries/fetch-3.4.1'
		],
		'fingerprint': [
				'libraries/fingerprint-0.5.3',
				'/beta/emuos/assets/js/libraries/fingerprint-0.5.3',
				'//emupedia.net/beta/emuos/assets/js/libraries/fingerprint-0.5.3',
				'//emupedia.org/beta/emuos/assets/js/libraries/fingerprint-0.5.3',
				'//emuos.net/beta/emuos/assets/js/libraries/fingerprint-0.5.3',
				'//emuos.org/beta/emuos/assets/js/libraries/fingerprint-0.5.3'
		],
		'firebug-lite': [
				'libraries/firebug-lite-1.5.3',
				'/beta/emuos/assets/js/libraries/firebug-lite-1.5.3',
				'//emupedia.net/beta/emuos/assets/js/libraries/firebug-lite-1.5.3',
				'//emupedia.org/beta/emuos/assets/js/libraries/firebug-lite-1.5.3',
				'//emuos.net/beta/emuos/assets/js/libraries/firebug-lite-1.5.3',
				'//emuos.org/beta/emuos/assets/js/libraries/firebug-lite-1.5.3'
		],
		'hjson': [
				'libraries/hjson-3.2.1.min',
				'/beta/emuos/assets/js/libraries/hjson-3.2.1.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/hjson-3.2.1.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/hjson-3.2.1.min',
				'//emuos.net/beta/emuos/assets/js/libraries/hjson-3.2.1.min',
				'//emuos.org/beta/emuos/assets/js/libraries/hjson-3.2.1.min'
		],
		'howler': [
				'libraries/howler-2.2.0.min',
				'/beta/emuos/assets/js/libraries/howler-2.2.0.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/howler-2.2.0.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/howler-2.2.0.min',
				'//emuos.net/beta/emuos/assets/js/libraries/howler-2.2.0.min',
				'//emuos.org/beta/emuos/assets/js/libraries/howler-2.2.0.min'
		],
		'howler-core': [
				'libraries/howler-core-2.2.0.min',
				'/beta/emuos/assets/js/libraries/howler-core-2.2.0.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/howler-core-2.2.0.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/howler-core-2.2.0.min',
				'//emuos.net/beta/emuos/assets/js/libraries/howler-core-2.2.0.min',
				'//emuos.org/beta/emuos/assets/js/libraries/howler-core-2.2.0.min'
		],
		'howler-spatial': [
				'libraries/howler-spatial-2.2.0.min',
				'/beta/emuos/assets/js/libraries/howler-spatial-2.2.0.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/howler-spatial-2.2.0.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/howler-spatial-2.2.0.min',
				'//emuos.net/beta/emuos/assets/js/libraries/howler-spatial-2.2.0.min',
				'//emuos.org/beta/emuos/assets/js/libraries/howler-spatial-2.2.0.min'
		],
		'html-imports': [
				'libraries/html-imports-1.2.5.min',
				'/beta/emuos/assets/js/libraries/html-imports-1.2.5.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/html-imports-1.2.5.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/html-imports-1.2.5.min',
				'//emuos.net/beta/emuos/assets/js/libraries/html-imports-1.2.5.min',
				'//emuos.org/beta/emuos/assets/js/libraries/html-imports-1.2.5.min'
		],
		'hybrids': [
				'libraries/hybrids-4.3.1.min',
				'/beta/emuos/assets/js/libraries/hybrids-4.3.1.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/hybrids-4.3.1.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/hybrids-4.3.1.min',
				'//emuos.net/beta/emuos/assets/js/libraries/hybrids-4.3.1.min',
				'//emuos.org/beta/emuos/assets/js/libraries/hybrids-4.3.1.min'
		],
		'i18next': [
				'libraries/i18next-19.7.0.min',
				'/beta/emuos/assets/js/libraries/i18next-19.7.0.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/i18next-19.7.0.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/i18next-19.7.0.min',
				'//emuos.net/beta/emuos/assets/js/libraries/i18next-19.7.0.min',
				'//emuos.org/beta/emuos/assets/js/libraries/i18next-19.7.0.min'
		],
		'ie11-custom-properties': [
				'libraries/css-vars-4.1.0',
				'/beta/emuos/assets/js/libraries/css-vars-4.1.0',
				'//emupedia.net/beta/emuos/assets/js/libraries/css-vars-4.1.0',
				'//emupedia.org/beta/emuos/assets/js/libraries/css-vars-4.1.0',
				'//emuos.net/beta/emuos/assets/js/libraries/css-vars-4.1.0',
				'//emuos.org/beta/emuos/assets/js/libraries/css-vars-4.1.0'
		],
		'jquery': [
				'libraries/jquery-3.5.1.min',
				'/beta/emuos/assets/js/libraries/jquery-3.5.1.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/jquery-3.5.1.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/jquery-3.5.1.min',
				'//emuos.net/beta/emuos/assets/js/libraries/jquery-3.5.1.min',
				'//emuos.org/beta/emuos/assets/js/libraries/jquery-3.5.1.min'
		],
		'jquery-ajax-retry': [
				'libraries/jquery-ajax-retry-0.2.8.min',
				'/beta/emuos/assets/js/libraries/jquery-ajax-retry-0.2.8.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/jquery-ajax-retry-0.2.8.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/jquery-ajax-retry-0.2.8.min',
				'//emuos.net/beta/emuos/assets/js/libraries/jquery-ajax-retry-0.2.8.min',
				'//emuos.org/beta/emuos/assets/js/libraries/jquery-ajax-retry-0.2.8.min'
		],
		'jquery-custom-scrollbar': [
				'libraries/jquery-customscrollbar-3.1.5.min',
				'/beta/emuos/assets/js/libraries/jquery-customscrollbar-3.1.5.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/jquery-customscrollbar-3.1.5.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/jquery-customscrollbar-3.1.5.min',
				'//emuos.net/beta/emuos/assets/js/libraries/jquery-customscrollbar-3.1.5.min',
				'//emuos.org/beta/emuos/assets/js/libraries/jquery-customscrollbar-3.1.5.min'
		],
		'jquery-i18next': [
				'libraries/jquery-i18next-1.2.1.min',
				'/beta/emuos/assets/js/libraries/jquery-i18next-1.2.1.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/jquery-i18next-1.2.1.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/jquery-i18next-1.2.1.min',
				'//emuos.net/beta/emuos/assets/js/libraries/jquery-i18next-1.2.1.min',
				'//emuos.org/beta/emuos/assets/js/libraries/jquery-i18next-1.2.1.min'
		],
		'jquery-migrate': [
				'libraries/jquery-migrate-3.3.1.min',
				'/beta/emuos/assets/js/libraries/jquery-migrate-3.3.1.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/jquery-migrate-3.3.1.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/jquery-migrate-3.3.1.min',
				'//emuos.net/beta/emuos/assets/js/libraries/jquery-migrate-3.3.1.min',
				'//emuos.org/beta/emuos/assets/js/libraries/jquery-migrate-3.3.1.min'
		],
		'jquery-mousewheel': [
				'libraries/jquery-mousewheel-3.1.13',
				'/beta/emuos/assets/js/libraries/jquery-mousewheel-3.1.13',
				'//emupedia.net/beta/emuos/assets/js/libraries/jquery-mousewheel-3.1.13',
				'//emupedia.org/beta/emuos/assets/js/libraries/jquery-mousewheel-3.1.13',
				'//emuos.net/beta/emuos/assets/js/libraries/jquery-mousewheel-3.1.13',
				'//emuos.org/beta/emuos/assets/js/libraries/jquery-mousewheel-3.1.13'
		],
		'jquery-resizable': [
				'libraries/jquery-resizable-0.35.0.min',
				'/beta/emuos/assets/js/libraries/jquery-resizable-0.35.0.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/jquery-resizable-0.35.0.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/jquery-resizable-0.35.0.min',
				'//emuos.net/beta/emuos/assets/js/libraries/jquery-resizable-0.35.0.min',
				'//emuos.org/beta/emuos/assets/js/libraries/jquery-resizable-0.35.0.min'
		],
		'jquery-ui': [
				'libraries/jquery-ui-1.12.1.min',
				'/beta/emuos/assets/js/libraries/jquery-ui-1.12.1.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/jquery-ui-1.12.1.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/jquery-ui-1.12.1.min',
				'//emuos.net/beta/emuos/assets/js/libraries/jquery-ui-1.12.1.min',
				'//emuos.org/beta/emuos/assets/js/libraries/jquery-ui-1.12.1.min'
		],
		'jquery-ui-contextmenu': [
				'libraries/jquery-ui-contextmenu-1.18.1.min',
				'/beta/emuos/assets/js/libraries/jquery-ui-contextmenu-1.18.1.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/jquery-ui-contextmenu-1.18.1.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/jquery-ui-contextmenu-1.18.1.min',
				'//emuos.net/beta/emuos/assets/js/libraries/jquery-ui-contextmenu-1.18.1.min',
				'//emuos.org/beta/emuos/assets/js/libraries/jquery-ui-contextmenu-1.18.1.min'
		],
		'js-dos': [
				'libraries/js-dos-6.22.59.min',
				'/beta/emuos/assets/js/libraries/js-dos-6.22.59.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/js-dos-6.22.59.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/js-dos-6.22.59.min',
				'//emuos.net/beta/emuos/assets/js/libraries/js-dos-6.22.59.min',
				'//emuos.org/beta/emuos/assets/js/libraries/js-dos-6.22.59.min'
		],
		'jsonpath': [
				'libraries/jsonpath-1.0.2.min',
				'/beta/emuos/assets/js/libraries/jsonpath-1.0.2.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/jsonpath-1.0.2.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/jsonpath-1.0.2.min',
				'//emuos.net/beta/emuos/assets/js/libraries/jsonpath-1.0.2.min',
				'//emuos.org/beta/emuos/assets/js/libraries/jsonpath-1.0.2.min'
		],
		'jsrsasign-all': [
				'libraries/jsrsasign-all-9.1.9.min',
				'/beta/emuos/assets/js/libraries/jsrsasign-all-9.1.9.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/jsrsasign-all-9.1.9.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/jsrsasign-all-9.1.9.min',
				'//emuos.net/beta/emuos/assets/js/libraries/jsrsasign-all-9.1.9.min',
				'//emuos.org/beta/emuos/assets/js/libraries/jsrsasign-all-9.1.9.min'
		],
		'jszip': [
				'libraries/jszip-3.5.0.min',
				'/beta/emuos/assets/js/libraries/jszip-3.5.0.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/jszip-3.5.0.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/jszip-3.5.0.min',
				'//emuos.net/beta/emuos/assets/js/libraries/jszip-3.5.0.min',
				'//emuos.org/beta/emuos/assets/js/libraries/jszip-3.5.0.min'
		],
		'less': [
				'libraries/less-3.12.2.min',
				'/beta/emuos/assets/js/libraries/less-3.12.2.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/less-3.12.2.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/less-3.12.2.min',
				'//emuos.net/beta/emuos/assets/js/libraries/less-3.12.2.min',
				'//emuos.org/beta/emuos/assets/js/libraries/less-3.12.2.min'
		],
		'lightslider': [
				'libraries/lightslider-1.1.6.min',
				'/beta/emuos/assets/js/libraries/lightslider-1.1.6.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/lightslider-1.1.6.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/lightslider-1.1.6.min',
				'//emuos.net/beta/emuos/assets/js/libraries/lightslider-1.1.6.min',
				'//emuos.org/beta/emuos/assets/js/libraries/lightslider-1.1.6.min'
		],
		'localforage': [
				'libraries/localforage-1.9.0.min',
				'/beta/emuos/assets/js/libraries/localforage-1.9.0.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/localforage-1.9.0.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/localforage-1.9.0.min',
				'//emuos.net/beta/emuos/assets/js/libraries/localforage-1.9.0.min',
				'//emuos.org/beta/emuos/assets/js/libraries/localforage-1.9.0.min'
		],
		'localforage-nopromise': [
				'libraries/localforage-nopromise-1.9.0.min',
				'/beta/emuos/assets/js/libraries/localforage-nopromise-1.9.0.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/localforage-nopromise-1.9.0.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/localforage-nopromise-1.9.0.min',
				'//emuos.net/beta/emuos/assets/js/libraries/localforage-nopromise-1.9.0.min',
				'//emuos.org/beta/emuos/assets/js/libraries/localforage-nopromise-1.9.0.min'
		],
		'moment': [
				'libraries/moment-2.28.0.min',
				'/beta/emuos/assets/js/libraries/moment-2.28.0.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/moment-2.28.0.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/moment-2.28.0.min',
				'//emuos.net/beta/emuos/assets/js/libraries/moment-2.28.0.min',
				'//emuos.org/beta/emuos/assets/js/libraries/moment-2.28.0.min'
		],
		'moment-holiday': [
				'libraries/moment-holiday-1.5.1.min',
				'/beta/emuos/assets/js/libraries/moment-holiday-1.5.1.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/moment-holiday-1.5.1.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/moment-holiday-1.5.1.min',
				'//emuos.net/beta/emuos/assets/js/libraries/moment-holiday-1.5.1.min',
				'//emuos.org/beta/emuos/assets/js/libraries/moment-holiday-1.5.1.min'
		],
		'moment-timezone': [
				'libraries/moment-timezone-0.5.31.min',
				'/beta/emuos/assets/js/libraries/moment-timezone-0.5.31.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/moment-timezone-0.5.31.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/moment-timezone-0.5.31.min',
				'//emuos.net/beta/emuos/assets/js/libraries/moment-timezone-0.5.31.min',
				'//emuos.org/beta/emuos/assets/js/libraries/moment-timezone-0.5.31.min'
		],
		'octokat': [
				'libraries/octokat-0.10.0',
				'/beta/emuos/assets/js/libraries/octokat-0.10.0',
				'//emupedia.net/beta/emuos/assets/js/libraries/octokat-0.10.0',
				'//emupedia.org/beta/emuos/assets/js/libraries/octokat-0.10.0',
				'//emuos.net/beta/emuos/assets/js/libraries/octokat-0.10.0',
				'//emuos.org/beta/emuos/assets/js/libraries/octokat-0.10.0'
		],
		'pdfmake': [
				'libraries/pdfmake-0.1.68.min',
				'/beta/emuos/assets/js/libraries/pdfmake-0.1.68.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/pdfmake-0.1.68.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/pdfmake-0.1.68.min',
				'//emuos.net/beta/emuos/assets/js/libraries/pdfmake-0.1.68.min',
				'//emuos.org/beta/emuos/assets/js/libraries/pdfmake-0.1.68.min'
		],
		'pdfmake-fonts': [
				'libraries/pdfmake-fonts-0.1.68',
				'/beta/emuos/assets/js/libraries/pdfmake-fonts-0.1.68',
				'//emupedia.net/beta/emuos/assets/js/libraries/pdfmake-fonts-0.1.68',
				'//emupedia.org/beta/emuos/assets/js/libraries/pdfmake-fonts-0.1.68',
				'//emuos.net/beta/emuos/assets/js/libraries/pdfmake-fonts-0.1.68',
				'//emuos.org/beta/emuos/assets/js/libraries/pdfmake-fonts-0.1.68'
		],
		'perfect-scrollbar': [
				'libraries/perfect-scrollbar-1.5.0.min',
				'/beta/emuos/assets/js/libraries/perfect-scrollbar-1.5.0.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/perfect-scrollbar-1.5.0.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/perfect-scrollbar-1.5.0.min',
				'//emuos.net/beta/emuos/assets/js/libraries/perfect-scrollbar-1.5.0.min',
				'//emuos.org/beta/emuos/assets/js/libraries/perfect-scrollbar-1.5.0.min'
		],
		'phaser': [
				'libraries/phaser-3.24.1.min',
				'/beta/emuos/assets/js/libraries/phaser-3.24.1.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/phaser-3.24.1.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/phaser-3.24.1.min',
				'//emuos.net/beta/emuos/assets/js/libraries/phaser-3.24.1.min',
				'//emuos.org/beta/emuos/assets/js/libraries/phaser-3.24.1.min'
		],
		'phaser-arcade-physics': [
				'libraries/phaser-arcade-physics-3.24.1.min',
				'/beta/emuos/assets/js/libraries/phaser-arcade-physics-3.24.1.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/phaser-arcade-physics-3.24.1.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/phaser-arcade-physics-3.24.1.min',
				'//emuos.net/beta/emuos/assets/js/libraries/phaser-arcade-physics-3.24.1.min',
				'//emuos.org/beta/emuos/assets/js/libraries/phaser-arcade-physics-3.24.1.min'
		],
		'popper': [
				'libraries/popper-1.16.1.min',
				'/beta/emuos/assets/js/libraries/popper-1.16.1.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/popper-1.16.1.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/popper-1.16.1.min',
				'//emuos.net/beta/emuos/assets/js/libraries/popper-1.16.1.min',
				'//emuos.org/beta/emuos/assets/js/libraries/popper-1.16.1.min'
		],
		'promise': [
				'libraries/promise-4.2.8.min',
				'/beta/emuos/assets/js/libraries/promise-4.2.8.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/promise-4.2.8.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/promise-4.2.8.min',
				'//emuos.net/beta/emuos/assets/js/libraries/promise-4.2.8.min',
				'//emuos.org/beta/emuos/assets/js/libraries/promise-4.2.8.min'
		],
		'promise-auto': [
				'libraries/promise-auto-4.2.8.min',
				'/beta/emuos/assets/js/libraries/promise-auto-4.2.8.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/promise-auto-4.2.8.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/promise-auto-4.2.8.min',
				'//emuos.net/beta/emuos/assets/js/libraries/promise-auto-4.2.8.min',
				'//emuos.org/beta/emuos/assets/js/libraries/promise-auto-4.2.8.min'
		],
		'purl': [
				'libraries/purl-2.3.1',
				'/beta/emuos/assets/js/libraries/purl-2.3.1',
				'//emupedia.net/beta/emuos/assets/js/libraries/purl-2.3.1',
				'//emupedia.org/beta/emuos/assets/js/libraries/purl-2.3.1',
				'//emuos.net/beta/emuos/assets/js/libraries/purl-2.3.1',
				'//emuos.org/beta/emuos/assets/js/libraries/purl-2.3.1'
		],
		'requirejs': [
				'libraries/requirejs-2.3.6',
				'/beta/emuos/assets/js/libraries/requirejs-2.3.6',
				'//emupedia.net/beta/emuos/assets/js/libraries/requirejs-2.3.6',
				'//emupedia.org/beta/emuos/assets/js/libraries/requirejs-2.3.6',
				'//emuos.net/beta/emuos/assets/js/libraries/requirejs-2.3.6',
				'//emuos.org/beta/emuos/assets/js/libraries/requirejs-2.3.6'
		],
		'requirejs-json': [
				'libraries/requirejs-json-1.0.3',
				'/beta/emuos/assets/js/libraries/requirejs-json-1.0.3',
				'//emupedia.net/beta/emuos/assets/js/libraries/requirejs-json-1.0.3',
				'//emupedia.org/beta/emuos/assets/js/libraries/requirejs-json-1.0.3',
				'//emuos.net/beta/emuos/assets/js/libraries/requirejs-json-1.0.3',
				'//emuos.org/beta/emuos/assets/js/libraries/requirejs-json-1.0.3'
		],
		'requirejs-noext': [
				'libraries/requirejs-noext-1.0.3',
				'/beta/emuos/assets/js/libraries/requirejs-noext-1.0.3',
				'//emupedia.net/beta/emuos/assets/js/libraries/requirejs-noext-1.0.3',
				'//emupedia.org/beta/emuos/assets/js/libraries/requirejs-noext-1.0.3',
				'//emuos.net/beta/emuos/assets/js/libraries/requirejs-noext-1.0.3',
				'//emuos.org/beta/emuos/assets/js/libraries/requirejs-noext-1.0.3'
		],
		'requirejs-text': [
				'libraries/requirejs-text-2.0.15',
				'/beta/emuos/assets/js/libraries/requirejs-text-2.0.15',
				'//emupedia.net/beta/emuos/assets/js/libraries/requirejs-text-2.0.15',
				'//emupedia.org/beta/emuos/assets/js/libraries/requirejs-text-2.0.15',
				'//emuos.net/beta/emuos/assets/js/libraries/requirejs-text-2.0.15',
				'//emuos.org/beta/emuos/assets/js/libraries/requirejs-text-2.0.15'
		],
		'select2': [
				'libraries/select2-4.0.13.min',
				'/beta/emuos/assets/js/libraries/select2-4.0.13.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/select2-4.0.13.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/select2-4.0.13.min',
				'//emuos.net/beta/emuos/assets/js/libraries/select2-4.0.13.min',
				'//emuos.org/beta/emuos/assets/js/libraries/select2-4.0.13.min'
		],
		'simplestorage': [
				'libraries/simplestorage-0.2.1.min',
				'/beta/emuos/assets/js/libraries/simplestorage-0.2.1.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/simplestorage-0.2.1.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/simplestorage-0.2.1.min',
				'//emuos.net/beta/emuos/assets/js/libraries/simplestorage-0.2.1.min',
				'//emuos.org/beta/emuos/assets/js/libraries/simplestorage-0.2.1.min'
		],
		'twemoji': [
				'libraries/twemoji-13.0.1.min',
				'/beta/emuos/assets/js/libraries/twemoji-13.0.1.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/twemoji-13.0.1.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/twemoji-13.0.1.min',
				'//emuos.net/beta/emuos/assets/js/libraries/twemoji-13.0.1.min',
				'//emuos.org/beta/emuos/assets/js/libraries/twemoji-13.0.1.min'
		],
		'webcomponents': [
				'libraries/webcomponents-2.4.4.min',
				'/beta/emuos/assets/js/libraries/webcomponents-2.4.4.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/webcomponents-2.4.4.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/webcomponents-2.4.4.min',
				'//emuos.net/beta/emuos/assets/js/libraries/webcomponents-2.4.4.min',
				'//emuos.org/beta/emuos/assets/js/libraries/webcomponents-2.4.4.min'
		],
		'xterm': [
				'libraries/xterm-4.9.0.min',
				'/beta/emuos/assets/js/libraries/xterm-4.9.0.min',
				'//emupedia.net/beta/emuos/assets/js/libraries/xterm-4.9.0.min',
				'//emupedia.org/beta/emuos/assets/js/libraries/xterm-4.9.0.min',
				'//emuos.net/beta/emuos/assets/js/libraries/xterm-4.9.0.min',
				'//emuos.org/beta/emuos/assets/js/libraries/xterm-4.9.0.min'
		],
		'desktop': [
				'desktop',
				'/beta/emuos/assets/js/desktop',
				'//emupedia.net/beta/emuos/assets/js/desktop',
				'//emupedia.org/beta/emuos/assets/js/desktop',
				'//emuos.net/beta/emuos/assets/js/desktop',
				'//emuos.org/beta/emuos/assets/js/desktop'
		],
		'emoticons': [
				'emoticons',
				'/beta/emuos/assets/js/emoticons',
				'//emupedia.net/beta/emuos/assets/js/emoticons',
				'//emupedia.org/beta/emuos/assets/js/emoticons',
				'//emuos.net/beta/emuos/assets/js/emoticons',
				'//emuos.org/beta/emuos/assets/js/emoticons'
		],
		'emuos': [
				'emuos',
				'/beta/emuos/assets/js/emuos',
				'//emupedia.net/beta/emuos/assets/js/emuos',
				'//emupedia.org/beta/emuos/assets/js/emuos',
				'//emuos.net/beta/emuos/assets/js/emuos',
				'//emuos.org/beta/emuos/assets/js/emuos'
		],
		'router': [
				'router',
				'/beta/emuos/assets/js/router',
				'//emupedia.net/beta/emuos/assets/js/router',
				'//emupedia.org/beta/emuos/assets/js/router',
				'//emuos.net/beta/emuos/assets/js/router',
				'//emuos.org/beta/emuos/assets/js/router'
		],
		'filesystem': [
				'filesystem',
				'/beta/emuos/assets/js/filesystem',
				'//emupedia.net/beta/emuos/assets/js/filesystem',
				'//emupedia.org/beta/emuos/assets/js/filesystem',
				'//emuos.net/beta/emuos/assets/js/filesystem',
				'//emuos.org/beta/emuos/assets/js/filesystem'
		],
		'lang-en': [
				'lang-en',
				'/beta/emuos/assets/js/lang-en',
				'//emupedia.net/beta/emuos/assets/js/lang-en',
				'//emupedia.org/beta/emuos/assets/js/lang-en',
				'//emuos.net/beta/emuos/assets/js/lang-en',
				'//emuos.org/beta/emuos/assets/js/lang-en'
		],
		'network': [
				'network',
				'/beta/emuos/assets/js/network',
				'//emupedia.net/beta/emuos/assets/js/network',
				'//emupedia.org/beta/emuos/assets/js/network',
				'//emuos.net/beta/emuos/assets/js/network',
				'//emuos.org/beta/emuos/assets/js/network'
		],
		'taskbar': [
				'taskbar',
				'/beta/emuos/assets/js/taskbar',
				'//emupedia.net/beta/emuos/assets/js/taskbar',
				'//emupedia.org/beta/emuos/assets/js/taskbar',
				'//emuos.net/beta/emuos/assets/js/taskbar',
				'//emuos.org/beta/emuos/assets/js/taskbar'
		],
		'window': [
				'window',
				'/beta/emuos/assets/js/window',
				'//emupedia.net/beta/emuos/assets/js/window',
				'//emupedia.org/beta/emuos/assets/js/window',
				'//emuos.net/beta/emuos/assets/js/window',
				'//emuos.org/beta/emuos/assets/js/window'
		],
		'socket': [
				'socket',
				'/beta/emuos/assets/js/socket',
				'//emupedia.net/beta/emuos/assets/js/socket',
				'//emupedia.org/beta/emuos/assets/js/socket',
				'//emuos.net/beta/emuos/assets/js/socket',
				'//emuos.org/beta/emuos/assets/js/socket'
		],
		'ga': '//www.google-analytics.com/analytics'
};

	// endregion
}(this));