const {remote}	= require('electron');
const log		= require('electron-log');
const settings	= require('electron-settings');

log.info(`OS: ${process.platform} ${process.getSystemVersion()}`);
log.info(`Environment: ${process.env.NODE_ENV}`);
log.info(`Chrome: ${process.versions.chrome}`);
log.info(`Electron: ${process.versions.electron}`);
log.info(`Node: ${process.versions.node}`);

log.info('UI Setup');

let win			= remote.getCurrentWindow();

let $window		= null;
let $document	= null;
let $html		= null;
let $body		= null;

let $minimize	= null;
let $maximize	= null;
let $restore	= null;
let $close		= null;

function toggleMaxRestoreButtons() {
	log.info('UI.toggleMaxRestoreButtons()');

	$minimize	= $('.button.minimize');
	$maximize	= $('.button.maximize');
	$restore	= $('.button.restore');
	$close		= $('.button.close');

	if (win.isMaximized()) {
		$maximize.hide();
		$restore.css('display', 'flex');
	} else {
		$restore.hide();
		$maximize.css('display', 'flex');
	}
}

function init() {
	log.info('UI.init()');

	if (process.env.NODE_ENV === 'development') {
		// noinspection JSUnresolvedFunction
		win.webContents.openDevTools({mode: 'detach'});
	}

	toggleMaxRestoreButtons();

	$html.removeClass('browser').addClass('electron');

	// TODO: not working
	$document.on('slide', '.slider.window-opacity', (e, ui) => {
		win.setOpacity(ui.value);
	});

	$document.on('click', '.button.minimize', () => {
		win.minimize();
	});

	$document.on('click', '.button.maximize', () => {
		win.maximize();
	});

	$document.on('click', '.button.restore', () => {
		win.unmaximize();
	});

	$document.on('click', '.button.exit', () => {
		win.close();
	});

	win.on('minimize', () => {
		toggleMaxRestoreButtons();
	});

	win.on('maximize', () => {
		toggleMaxRestoreButtons();
	});

	win.on('unmaximize', () => {
		toggleMaxRestoreButtons();
	});

	window.setOpacity = function (opacity) {
		win.setOpacity(opacity);
		settings.set('opacity', opacity);
	};

	window.getOpacity = function() {
		if (typeof settings.get('opacity') !== 'undefined') {
			return settings.get('opacity');
		}

		return 1;
	}
}

win.webContents.once('dom-ready', () => {
	log.info('Event: dom-ready');

	window.$ = window.jQuery = require('jquery');
	//require('jquery-ui-dist/jquery-ui');

	$window		= $(window);
	$document	= $(document);
	$html		= $('html');
	$body		= $('body');

	init();
});