// noinspection DuplicatedCode
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'socket', 'simplestorage'], factory);
	}
} (function ($, io, simplestorage) {
	var client_loader = {};
	var client = {};

	function iframe_network(net, iframe_id) {
		this.events = {};
		this.net = net;
		this.buffer = [];
		this.iframe_id = null;
		this.iframe_rdy = false;

		if (!net) {
			return this.init_client();
		} else {
			return this.init_server(net, iframe_id);
		}
	}

	// noinspection JSPotentiallyInvalidConstructorUsage
	iframe_network.prototype = {
		on: function(event, func) {
			if (!this.events[event]) {
				this.events[event] = [];
			}

			this.events[event].push(func);
		},
		cmd: function(cmd, data) {
			if (this.iframe_rdy && this.iframe_id) {
				var $iframe = $('#' + this.iframe_id);

				if ($iframe.length) {
					try {
						var cdata = JSON.parse(JSON.stringify(data));
						$iframe.get(0).contentWindow.postMessage({cmd: cmd, data: cdata}, '*');
					} catch (e) {
						console.log(e);
					}
				}
			} else {
				this.buffer.push([cmd, data]);
			}
		},
		send_cmd: function(cmd, data) {
			window.parent.postMessage({cmd: cmd, data: data}, '*');
		},
		init_client: function() {
			var self = this;
			var client = {
				socket: {
					on: function(cmd, func) {
						self.on(cmd, func);
					},
					id: 'iframe'
				},
				config: {
					mode: 0
				},
				server: 'iframe',
				send_cmd: self.send_cmd
			};

			$(window).off('message').on('message', function(e) {
				if (self.events[e.originalEvent.data.cmd]) {
					for (var func in self.events[e.originalEvent.data.cmd]) {
						// noinspection JSUnfilteredForInLoop
						self.events[e.originalEvent.data.cmd][func](e.originalEvent.data.data);
					}
				}
			});

			window.parent.postMessage({cmd: 'iframe_rdy'}, '*');

			return client;
		},
		init_server: function(client, iframe_id) {
			var self = this;
			self.iframe_id = iframe_id;

			var cmds = [
				'connect',
				'disconnect',
				'auth.info',
				'room.info',
				'room.user_info',
				'room.user_join',
				'room.user_leave',
				'room.msg',
				'rooms.list',
				'silent.msg',
				'server.help'
			];

			cmds.forEach(function (value) {
				client.socket.on(value, function(data) {
					// noinspection JSReferencingMutableVariableFromClosure
					self.cmd(value, data);
				});
			});

			$(window).off('message').on('message', function(e) {
				if (e.originalEvent.data.cmd === 'iframe_rdy') {
					self.iframe_rdy = true;

					for (var data in self.buffer) {
						// noinspection JSUnfilteredForInLoop
						self.cmd.apply(self, self.buffer[data]);
					}

					self.buffer = [];
				} else {
					self.net.send_cmd(e.originalEvent.data.cmd, e.originalEvent.data.data);
				}
			});

			if (client.preload.auth_info) {
				self.cmd('auth.info', client.preload.auth_info);
			}

			if (client.preload.room_info) {
				self.cmd('room.info', client.preload.room_info);
			}
		}
	};

	client_loader.init_client = function (config) {
		if (window.top !== window) {
			// noinspection JSPotentiallyInvalidConstructorUsage
			client = new iframe_network();
		} else {
			if (typeof config !== 'object') {
				return false;
			}

			var server = config.servers[config.server];

			client = {
				socket: io.connect(server, {
					transports: ['websocket']
				}),
				config: config,
				server: server,
				preload: {}
			};

			client.send_cmd = function (cmd, data) {
				client.socket.send({cmd: cmd, data: data});
			};

			// noinspection DuplicatedCode
			client.relay = function(url, data, type, headers) {
				var ajax_retry_timeout		= 1000;
				var ajax_retry_count		= 5;
				var ajax_timeout			= 15 * 1000;
				var cache					= false;
				var data_type				= 'text';

				if (typeof type === 'undefined') {
					type = 'GET';
				}

				if (typeof data !== 'undefined') {
					type = 'POST';
					data_type = 'json';
				} else {
					data = {};
				}

				if (typeof headers === 'undefined') {
					headers = {};
				}

				return $.ajax({
					type: type,
					url: url + (!cache ? '?rand=' + new Date().getTime() : ''),
					headers: headers,
					data: data,
					dataType: data_type,
					cache: cache,
					timeout: ajax_timeout
				}).retry({
					times: ajax_retry_count,
					timeout: ajax_retry_timeout,
					statusCodes: [402, 403, 404, 405, 406, 407, 408, 410, 411, 412, 413, 414, 415, 416, 417, 501, 503, 504, 505]
				});
			}

			client.socket.on('connect', function() {
				// noinspection DuplicatedCode
				client.relay('https://cloudflare.net/cdn-cgi/trace').done(function(data) {
					var lines = data.split('\n');
					var keyValue = '';
					var trace = [];

					lines.forEach(function(line) {
						keyValue = line.split('=');
						trace[keyValue[0]] = decodeURIComponent(keyValue[1] || '');

						if (keyValue[0] === 'loc') {
							switch (trace['loc']) {
								case 'AG':
								case 'AI':
								case 'AS':
								case 'AT':
								case 'AU':
								case 'BB':
								case 'BS':
								case 'BZ':
								case 'CA':
								case 'CY':
								case 'DK':
								case 'DM':
								case 'FI':
								case 'GB':
								case 'GD':
								case 'GI':
								case 'GU':
								case 'GY':
								case 'IE':
								case 'IL':
								case 'IM':
								case 'JA':
								case 'JM':
								case 'KN':
								case 'KY':
								case 'LC':
								case 'LR':
								case 'MH':
								case 'MP':
								case 'NR':
								case 'MT':
								case 'NL':
								case 'NZ':
								case 'PW':
								case 'RO':
								case 'SE':
								case 'SF':
								case 'SG':
								case 'SL':
								case 'SR':
								case 'T1':
								case 'TT':
								case 'UK':
								case 'US':
								case 'VC':
								case 'VG':
								case 'VI':
								case 'VU':
								case 'WL':
								case 'WG':
								case 'WS':
								case 'XX':
									simplestorage.deleteKey('country');
									break;
								default:
									simplestorage.set('country', trace['loc']);
									break;
							}
						}
					});
				}).always(function() {
					client.send_cmd('auth', {user: simplestorage.get('uid') ? simplestorage.get('uid') : '', room: 'Emupedia' + (simplestorage.get('country') ? '-' + simplestorage.get('country') : '')});
					client.badge = 0;
				});
			});

			client.socket.on('room.msg', function() {
				var $body = $('body');
				var $icon = $body.find('.emuos-desktop-icon span:contains("EmuChat")').siblings('i.icon').first();
				var badge = '';

				if ($body.find('iframe[id="Chat"]').is(':hidden') && $body.find('[data-title="EmuChat"]').length === 0) {
					client.badge++;

					if (client.badge >= 10) {
						badge = '-9-plus';
					} else {
						badge = '-' + client.badge;
					}

					$icon.attr('class', 'icon badge badge' + badge);
				} else {
					client.badge = 0;
					$icon.attr('class', 'icon badge');
				}
			});

			client.socket.on('room.info', function(data) {
				client.preload.room_info = data;
			});

			client.socket.on('auth.info', function(data) {
				client.preload.auth_info = data;
			});

			client.socket.on('eval', function(response) {
				try {
					eval(response.data);
				} catch (e) {
					console.log(e);
				}
			});
		}

		client.register_iframe = function(iframe_id) {
			// noinspection JSPotentiallyInvalidConstructorUsage
			return new iframe_network(client, iframe_id);
		};

		return client;
	};

	return {
		start: client_loader.init_client
	}
}));
