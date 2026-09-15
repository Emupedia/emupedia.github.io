console.log('');
if (require('./updater.js')) return;

const {app, remote, dialog, BrowserWindow, Tray, Menu, Notification} = require('electron');

const log		= require('electron-log');
const settings	= require('electron-settings');
const packages	= require('../../package.json');

const name		= packages.description;
const version	= packages.version;
const www_dir	= packages.config.www_dir;
const title		= `${name} ${version}`;
const root		= app.getAppPath();
const data		= `${root}\\data`.replace('\\resources\\app.asar', '');
const icon		= `${root}/${www_dir}/favicon.ico`;
const index		= `file://${root}/${www_dir}/index.html`;

let tray = null;

function createTray(win) {
	if (!tray) {
		tray = new Tray(icon);

		tray.on('click',() => {
			win.show();
		});

		let contextMenu = Menu.buildFromTemplate([{
			label: 'Show', click: () => {
				win.show();
			}
		} , {
			label: 'Quit', click: () => {
				app.quitting = true;
				app.quit();
			}
		}]);

		tray.setToolTip(title);
		tray.setContextMenu(contextMenu);

		return tray;
	}

	return null;
}

function createWindow() {
	log.info('app.createWindow()');

	let win = new BrowserWindow({
		title: title,
		icon: icon,
		width: 1280,
		height: 720,
		minWidth: 640,
		minHeight: 480,
		center: true,
		frame: false,
		thickFrame: true,
		transparent: false,
		show: false,
		alwaysOnTop: false,
		autoHideMenuBar: true,
		resizable: true,
		movable: true,
		minimizable: true,
		closable: true,
		backgroundColor: '#ff000000',
		opacity: 1.0,
		webPreferences: {
			preload: `${root}/app/preload.js`,
			defaultEncoding: 'UTF-8',
			autoplayPolicy: 'no-user-gesture-required',
			zoomFactor: 1.0,
			images: true,
			javascript: true,
			webgl: true,
			webaudio: true,
			textAreasAreResizable: true,
			sandbox: false,
			devTools: true,
			plugins: false,
			offscreen: false,
			backgroundThrottling: false,
			navigateOnDragDrop: false,
			nativeWindowOpen: true,
			nodeIntegration: false,
			nodeIntegrationInWorker: false,
			nodeIntegrationInSubFrames: false,
			enableRemoteModule: true,
			webSecurity: true,
			webviewTag: false,
			safeDialogs: true,
			allowRunningInsecureContent: false,
			contextIsolation: false,
			experimentalFeatures: false,
			experimentalCanvasFeatures: false,
			disableHtmlFullscreenWindowResize: false,
			disableBlinkFeatures: 'Auxclick'
		}
	});

	win.on('ready-to-show', () => {
		log.info('Event: ready-to-show');

		if (typeof settings.get('window') !== 'undefined') {
			// noinspection JSCheckFunctionSignatures
			win.setBounds(settings.get('window'));
		}

		if (typeof settings.get('opacity') !== 'undefined') {
			// noinspection JSCheckFunctionSignatures
			win.setOpacity(settings.get('opacity'));
		}

		win.show();
		//win.flashFrame(true);
	});

	win.on('focus', () => {
		log.info('Event: focus');
	});

	win.on('blur', () => {
		log.info('Event: blur');
	});

	win.on('move', () => {
		// log.info('Event: move');
		// noinspection JSCheckFunctionSignatures
		settings.set('window', win.getBounds());
	});

	win.on('resize', () => {
		// log.info('Event: resize');
		// noinspection JSCheckFunctionSignatures
		settings.set('window', win.getBounds());
	});

	win.on('minimize', () => {
		log.info('Event: minimize');
	});

	win.on('maximize', () => {
		log.info('Event: maximize');
	});

	win.on('unmaximize', () => {
		log.info('Event: restore');
	});

	win.on('close', (e) => {
		log.info('Event: close');

		if (app.quitting) {
			win = null;
		} else {
			e.preventDefault();
			win.hide();
		}
	});

	win.on('unresponsive', () => {
		const options = {
			type: 'info',
			title: 'Renderer Process Hanging',
			message: 'This process is hanging.',
			buttons: ['Reload', 'Close']
		};

		// noinspection JSIgnoredPromiseFromCall,JSCheckFunctionSignatures
		dialog.showMessageBox(options, (index) => {
			if (index === 0) {
				win.reload();
			} else {
				win.close();
			}
		})
	});

	win.webContents.on('crashed', () => {
		const options = {
			type: 'info',
			title: 'Renderer Process Crashed',
			message: 'This process has crashed.',
			buttons: ['Reload', 'Close']
		};

		// noinspection JSIgnoredPromiseFromCall,JSCheckFunctionSignatures
		dialog.showMessageBox(options, (index) => {
			if (index === 0) {
				win.reload()
			} else {
				win.close()
			}
		});
	});

	// noinspection JSIgnoredPromiseFromCall
	win.loadURL(index);

	return win;
}

app.quitting = true;

app.setPath('userData', data);

if (app.requestSingleInstanceLock()) {
	app.once('ready', () => {
		log.info('Event: ready');

		process.env.NODE_ENV = typeof process.env.NODE_ENV !== 'undefined' ? process.env.NODE_ENV : (app.isPackaged ? 'production' : 'development');

		log.info(`OS: ${process.platform} ${process.getSystemVersion()}`);
		log.info(`Root path: ${root}`);
		log.info(`Data path: ${data}`);
		log.info(`Environment: ${process.env.NODE_ENV}`);
		log.info(`Electron: ${process.versions.electron}`);
		log.info(`Chrome: ${process.versions.chrome}`);
		log.info(`Node: ${process.versions.node}`);

		new Notification({
			title: title,
			body: 'Ready for action!',
			icon: icon,
			silent: true
		}).show();

		let win = createWindow();
		tray = createTray(win);
	});

	app.on('activate', () => {
		log.info('Event: activate');

		let win = remote.getCurrentWindow();

		if (win) {
			win.show();
		} else {
			createWindow();
		}
	});

	app.on('web-contents-created', (e, contents) => {
		contents.on('new-window', async (e, navigationUrl) => {
			const parsedUrl = new URL(navigationUrl);

			if (parsedUrl.hostname !== 'devtools') {
				e.preventDefault();
			}
		});

		contents.on('will-attach-webview', (e, webPreferences, params) => {
			const parsedUrl = new URL(params.src);

			delete webPreferences.preload;
			// noinspection JSUnresolvedVariable
			delete webPreferences.preloadURL;

			webPreferences.nodeIntegration = false;

			if (parsedUrl.origin !== root) {
				e.preventDefault();
			}
		});

		contents.on('will-navigate', (e, navigationUrl) => {
			const parsedUrl = new URL(navigationUrl);

			if (parsedUrl.origin !== root) {
				e.preventDefault();
			}
		});
	});

	// noinspection JSUnresolvedFunction,JSCheckFunctionSignatures
	app.on('activate-with-no-open-windows', () => {
		log.info('Event: activate-with-no-open-windows');

		let win = remote.getCurrentWindow();

		if (win) {
			win.show();
		} else {
			createWindow();
		}
	});

	app.on('renderer-process-crashed', () => {
		log.info('Event: renderer-process-crashed');

		const options = {
			type: 'info',
			title: 'Renderer Process Crashed',
			message: 'This process has crashed.',
			buttons: ['Reload', 'Close']
		};

		let win = remote.getCurrentWindow();

		// noinspection JSIgnoredPromiseFromCall,JSCheckFunctionSignatures
		dialog.showMessageBox(options, (index) => {
			if (index === 0) {
				win.reload()
			} else {
				win.close()
			}
		});
	});

	app.on('second-instance', () => {
		log.info('Event: second-instance');

		let win = remote.getCurrentWindow();

		if (win) {
			win.show();
		} else {
			createWindow();
		}
	});

	app.on('before-quit', () => {
		log.info('Event: before-quit');

		app.quitting = true;
	});

	app.on('window-all-closed', () => {
		log.info('Event: window-all-closed');

		if (process.platform !== 'darwin') {
			app.quit();
		}
	});
} else {
	app.quit();
}