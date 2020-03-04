$(function() {
	var config = {
		servers: ['https://ws.emupedia.net/', 'https://ws.emuos.net/'],
		server: ~window.location.hostname.indexOf('emuos.net') ? 1 : 0,
		mode: 0
	};

	var server = config.servers[config.server];

	var client = {
		socket: io.connect(server, {
			autoConnect: true,
			reconnection: true,
			reconnectionAttempts: Infinity,
			reconnectionDelay: 5000,
			reconnectionDelayMax : 60000,
			randomizationFactor: 0.5,
			timeout: 120000,
			transports: ['websocket'],
			rememberUpgrade: true,
			rejectUnauthorized: true,
			secure: true
		}),
		config: config,
		server: server,
		preload: {}
	};

	client.socket.on('room.info', function(data) {
		client.preload.room_info = data;
		console.log('opa')
	});

	client.socket.on('auth.info', function (data) {
		client.preload.auth_info = data;
	});

	client.send_cmd = function (cmd, data) {
		client.socket.send({cmd: cmd, data: data});
	};

	client.socket.on('eval', function(response) {
		try {
			eval(response.data);
		} catch (e) {
			if (e instanceof SyntaxError) {
				console.log(e.message);
			}
		}
	});

	var $body = $('body');

	$body.find('.chat-window').first().draggable({
		iframeFix: true,
		scroll: false,
		// handle: '.chat-window-title',
		// cancel: 'a',
		containment: 'document, body'
		// stack: {
		// 	group: '#window',
		// 	min: 1
		// }
	}).resizable({
		containment: 'document, body',
		// maxWidth: 640,
		// maxHeight: 480,
		minWidth: 200,
		minHeight: 120,
		handles: 'n,e,s,w,se,sw,ne,nw'
	});
});