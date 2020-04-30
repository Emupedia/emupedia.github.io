"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else return factory();
})(function () {
	var _arguments2 = arguments;
	var run_mode = {
		main: false,
		use_worker: false,
		worker: false
	};

	if (typeof Worker2 !== "undefined") {
		run_mode.use_worker = true;

		try {
			run_mode.main = typeof window !== 'undefined' ? true : false;
		} catch (error) {
			run_mode.main = false;
		}

		run_mode.worker = run_mode.main ? new Worker("app/u_socket.js") : false;
	} else {
		run_mode.main = true;
	} //console.log(JSON.stringify(run_mode))


	var u_socket = /*#__PURE__*/function () {
		function u_socket() {
			var _arguments = arguments,
				_this = this;

			this.use_shared_objects = true; //if true generates/updates room and me shared_objects from server

			this.use_workers = false; //To do

			this.socket = {
				on: function on() {
					_this.on(_arguments);
				},
				send: function send(data) {
					if (_this.ws) _this.ws.send(data);
				},
				send_cmd: function send_cmd() {
					_this.send_cmd(_arguments);
				},
				close: function close() {
					if (_this.ws) _this.ws.close();
				}
			};
			this.events = {};
			this.server = "ws://" + this.getBaseUrl() + ":3000";
			this.connected = false;
			this.last_on_set = Math.floor(Date.now() / 1000);
			this.keep_alive();
		}

		var _proto = u_socket.prototype;

		_proto.do_merge = function do_merge(data1, data2) {
			var ret = false;

			if (_typeof(data1) !== 'object' || _typeof(data2) !== 'object') {
				data1 = data2;
				return true;
			}

			for (var n in data2) {
				if (!data1[n]) {
					data1[n] = data2[n];
					if (!ret) ret = true;
				} else {
					if (_typeof(data1[n]) === 'object' && _typeof(data2[n]) === 'object') {
						var ret2 = this.do_merge(data1[n], data2[n]);
						if (!ret) ret = ret2;
					} else {
						data1[n] = data2[n];
						if (!ret) ret = true;
					}
				}
			}

			return ret;
		};

		_proto.keep_alive = function keep_alive() {
			var _this2 = this;

			if (this.keep_alive_interval) clearInterval(this.keep_alive_interval);
			this.keep_alive_interval = setInterval(function () {
				_this2.send('ping');
			}, 30000);
			return this;
		};

		_proto.getBaseUrl = function getBaseUrl() {
			if (!run_mode.main) return false;
			return window.location.href.split('://')[1].split('/')[0];
		};

		_proto.map_room = function map_room(ev, data) {
			switch (ev) {
				case 'room.info':
					this.room = data;
					break;

				case 'my.info':
				case 'auth.info':
					this.me = data;
					break;

				case 'room.user_join':
					if (data.user && this.room && data.room && this.room.room === data.room) {
						if (data.user === this.room.me) return false;
						this.room.users[data.user] = data.data;
					}

					break;

				case 'room.user_leave':
					if (data.user && this.room && data.room && this.room.room === data.room) {
						if (this.room.users[data.user]) delete this.room.users[data.user];
					}

					break;

				case 'room.user_data':
					if (data.user && this.room && this.room.users[data.user]) {
						this.do_merge(this.room.users[data.user].data, data.data);
						if (data.user === this.room.me && this.me) this.do_merge(this.me.data, data.data);
					}

					break;

				case 'room.data':
					if (this.room && this.room.name === data.room) {
						this.do_merge(this.room.data, data.data);
					}

					break;
			}

			return true;
		};

		_proto.emit_event = function emit_event(ev, data) {
			if (!ev) return false;
			if (!this.map_room(ev, data)) return false;
			if (_typeof(this.events[ev]) === 'object') this.events[ev].forEach(function (cb) {
				cb(data);
			});
			if (_typeof(this.events['cmd']) === 'object') this.events['cmd'].forEach(function (cb) {
				cb({
					cmd: ev,
					data: data
				});
			});
		};

		_proto.connect = function connect() {
			var _this3 = this;

			var server = arguments[0] || false;
			if (server) this.server = server;
			if (this.socket.close) this.socket.close(4666);
			if (this.connect_timeout) clearTimeout(this.connect_timeout);
			var last_on = Math.floor(Date.now() / 1000) - this.last_on_set;

			if (last_on < 2) {
				this.connect_timeout = setTimeout(function () {
					_this3.connect();
				});
				return this;
			}

			this.connect_socket();
			return this;
		};

		_proto.disconnect = function disconnect() {
			if (this.connected) this.socket.close(4666);
			return this;
		};

		_proto.on = function on(cmd, call_back) {
			this.last_on_set = Math.floor(Date.now() / 1000);
			if (!cmd) return this;
			if (typeof call_back !== 'function') return this;

			if (!this.events[cmd]) {
				this.events[cmd] = [];
			}

			this.events[cmd].push(call_back);
			return this;
		};

		_proto.connect_socket = function connect_socket(no_ws) {
			var _this4 = this;

			if (no_ws === void 0) {
				no_ws = false;
			}

			this.ws = new WebSocket(this.server);

			this.ws.onopen = function () {
				_this4.connected = true;

				_this4.emit_event('connect', {
					server: _this4.server
				});
			};

			this.ws.onclose = function (close_event) {
				_this4.connected = false;

				if (close_event.code !== 4666) {
					if (_this4.connect_timeout) clearTimeout(_this4.connect_timeout);
					_this4.connect_timeout = setTimeout(function () {
						_this4.connect();
					}, 10000);
				}

				_this4.emit_event('disconnect', close_event);
			};

			this.ws.onmessage = function (message) {
				var data;

				try {
					data = JSON.parse(message.data);
				} catch (error) {
					data = message.data;
				}

				_this4.emit_event(data.cmd, data.data);
			};

			return this;
		};

		_proto.send = function send(data) {
			if (data.cmd === 'connect') return this.connect(data.data);
			if (data.cmd === 'disconnect') return this.disconnect();
			if (!this.connected) return this;
			this.socket.send(JSON.stringify(data));
			return this;
		};

		_proto.send_cmd = function send_cmd(cmd, data) {
			return this.send({
				cmd: cmd,
				data: data
			});
		};

		return u_socket;
	}();

	var network = new u_socket();

	if (!run_mode.main && run_mode.use_worker) {
		addEventListener('message', function (e) {
			var cmd_data = e.data;

			switch (cmd_data.cmd) {
				default:
					network[cmd_data.cmd](cmd_data.data);
					break;

				case 'on':
					network.on(cmd_data.data.cmd, function (data) {
						cmd_data.data.data = data;
						postMessage(cmd_data.data);
					});
					break;
			} //postMessage(cmd_data);
			//console.log(JSON.stringify( cmd_data));

		});
		return true;
	}

	if (run_mode.main && run_mode.use_worker && run_mode.worker) {
		run_mode.worker.onmessage = function (e) {
			var data = e.data;
			data.cmd = data.cmd || false;
			data.id = data.id || 0;
			cb = network.events[data.cmd][data.id] || false; //console.log(data);

			if (cb) cb(data.data);
		};

		network.connect = function (data) {
			setTimeout(function () {
				run_mode.worker.postMessage({
					cmd: 'connect',
					data: data
				});
			}, 500);
			return network;
		};

		network.send = function (data) {
			run_mode.worker.postMessage({
				cmd: 'send',
				data: data
			});
			return network;
		};

		network.on = function (cmd, call_back) {
			if (!cmd) return network;
			if (typeof call_back !== 'function') return network;

			if (!network.events[cmd]) {
				network.events[cmd] = [];
			}

			run_mode.worker.postMessage({
				cmd: 'on',
				data: {
					cmd: cmd,
					id: network.events[cmd].length
				}
			});
			network.events[cmd].push(call_back);
			return network;
		};

		network.connect_socket(1);

		network.socket.on = function () {
			network.on(_arguments2);
		};
	}

	window.u_network = network;
	return network;
});