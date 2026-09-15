;(function ($) {
	var langCode = 'en';

	if (typeof $.emuos.taskbar !== 'undefined') {
		$.emuos.taskbar.prototype.options.localization[langCode] = $.emuos.taskbar.prototype.options.localization[langCode] || {};

		$.extend(true, $.emuos.taskbar.prototype.options.localization[langCode], {
			alwaysOnTop: 'Always on top',
			code: langCode,
			clockDateFormat: 'DD, d MM, yy',
			clockTimeFormat: 'HH:mm',
			clockAmSymbol: 'AM',
			clockPmSymbol: 'PM',
			fullscreen: 'Fullscreen',
			help: 'About',
			helpTitle: 'About :title',
			newtab: 'Open in New Tab',
			close: 'Close',
			confirmCloseTitle: 'Confirm closing of “:title”',
			confirmCloseNo: 'No',
			confirmCloseText: 'Are you sure you want to close this window?',
			confirmCloseYes: 'Yes',
			languageSelect: 'Current language is English. Click to change',
			maximize: 'Maximize',
			minimize: 'Minimize',
			minimizeAll: 'Minimize all windows',
			multipleWindowButton: '(:counter) :title',
			name: 'English',
			networkMonitorOffline: 'This device seems to be disconnected from the web',
			networkMonitorOnline: 'This device seems to be connected to the web',
			newWindow: 'New window',
			newWindowNext: 'New window (:counter)',
			restore: 'Restore',
			slug: 'EN',
			'startButton:start': 'Start',
			'startButton:title': 'Click here to begin',
			toggleFullscreenEnter: 'Enter fullscreen mode',
			toggleFullscreenLeave: 'Leave fullscreen mode'
		});
	}
})(jQuery);