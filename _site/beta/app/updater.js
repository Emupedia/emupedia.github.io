const {app}			= require('electron');
const log			= require('electron-log');
const spawn			= require('child_process').spawn;
const path			= require('path');
const packages		= require('../../package.json');

log.info('Updater Setup');

function run(args, done) {
	log.info('Updater.run()');

	let updater = path.resolve(path.dirname(process.execPath), '..', 'Update.exe');

	log.info('Updater: Spawning `%s` with args `%s`', updater, args);

	spawn(updater, args, {
		detached: true
	}).on('close', done);
}

function check() {
	log.info('Updater.check()');

	if (process.platform === 'win32') {
		let cmd = process.argv[1];
		log.info('Updater: processing command `%s`', cmd);
		let target = path.basename(process.execPath);

		switch (cmd) {
			case '--squirrel-firstrun':
				return false;
			case '--squirrel-install':
			case '--squirrel-updated':
				run(['--createShortcut=' + target + ''], app.quit);
				return true;
			case '--squirrel-uninstall':
				run(['--removeShortcut=' + target + ''], app.quit);
				return true;
			case '--squirrel-obsolete':
				app.quit();
				return true;
		}
	}

	log.info('Updater: no updates');
	return false;
}

module.exports = check();