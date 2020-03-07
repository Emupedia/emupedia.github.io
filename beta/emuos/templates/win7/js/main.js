$(function() {
	var $body = $('body');

	$body.html(
		'<div class="emuos-desktop">DESKTOP</div>' +
			'<div class="emuos-window blur">' +
				'<div class="emuos-window-container"></div>' +
			'</div>' +
			'<div class="emuos-window blur">' +
				'<div class="emuos-window-container"></div>' +
			'</div>' +
			'<div class="emuos-taskbar-bg blur"></div>' +
			'<div class="emuos-taskbar">' +
				'<div class="emuos-taskbar-container">' +
				'<div class="emuos-start"><button class="emuos-start-button"></button></div>' +
				'<div class="emuos-apps">APPS</div>' +
				'<div class="emuos-tray">TRAY</div>' +
			'</div>' +
		'</div>'
	);

	$body.find('.emuos-window').draggable({
		iframeFix: true,
		scroll: false,
		// handle: '.chat-window-title',
		// cancel: 'a',
		// containment: 'document, body'
		stack: '.emuos-window'
	}).resizable({
		// containment: 'document, body',
		// maxWidth: 640,
		// maxHeight: 480,
		minWidth: 200,
		minHeight: 120,
		handles: 'n,e,s,w,se,sw,ne,nw'
	});
});