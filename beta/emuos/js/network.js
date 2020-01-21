// noinspection DuplicatedCode
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'socketio'], factory);
	}
} (function ($, io) {
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
					$iframe.get(0).contentWindow.postMessage({cmd: cmd, data: data}, '*');
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

			/*if (client.server && client.socket.id) {
				self.cmd('connect', {server: client.server, socket_id: client.socket.id});
			}*/

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
				socket: io(server),
				config: config,
				server: server,
				preload: {}
			};

			client.socket.on('room.info', function(data) {
				client.preload.room_info = data;
			});

			client.socket.on('auth.info', function (data) {
				client.preload.auth_info = data;
			});

			client.send_cmd = function (cmd, data) {
				client.socket.send({cmd: cmd, data: data});
			};
		}

		client.register_iframe = function (iframe_id) {
			// noinspection JSPotentiallyInvalidConstructorUsage
			return new iframe_network(client, iframe_id);
		};

		return client;
	};

	return {
		start: client_loader.init_client
	}
}));