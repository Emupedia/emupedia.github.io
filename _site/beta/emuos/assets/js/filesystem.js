// noinspection DuplicatedCode
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'octokat'], factory);
	} else if (typeof module === 'object' && module.exports) {
		module.exports = function(root, jQuery) {
			if (jQuery === undefined) {
				if (typeof window !== 'undefined') {
					// noinspection NpmUsedModulesInstalled
					jQuery = require('jquery');
				} else {
					// noinspection NpmUsedModulesInstalled
					jQuery = require('jquery')(root);
				}
			}
			factory(jQuery);
			return jQuery;
		};
	} else {
		factory(jQuery);
	}
} (function ($, Octokat) {
	// noinspection JSUnusedLocalSymbols
	var root = location.protocol + '//' + location.host + '/';

	var FileSystem = function (options) {
		var self = this;

		self.options = {
			ajax: {
				timeout: 15 * 1000,
				retry_timeout: 1000,
				retry_count: 5
			},
			github: {
				organization: '',
				repo: '',
				branch: '',
				app_id: 0,
				app_install_id: 0,
				private_key: ''
			},
			dropbox: {
				token: ''
			}
		};

		self.options = $.extend(true, self.options, options);

		// noinspection JSUnresolvedVariable
		if (self.options.github.private_key !== '') {
			// noinspection JSUnresolvedVariable
			self.promise = self.relay('https://api.github.com/app/installations/' + self.options.github.app_install_id + '/access_tokens', {}, 'POST', {
				Authorization: 'Bearer ' + self.generateJWT(self.options.github.private_key, self.options.github.app_id),
				Accept: 'application/vnd.github.machine-man-preview+json'
			}).done(function(data) {
				if (typeof data.token !== 'undefined') {
					self.options.github.token = data.token;
				}
			});

			return self;
		}
	};

	FileSystem.prototype.relay = function (url, data, type, headers) {
		var self = this;

		if (typeof type === 'undefined') {
			type = 'POST';
		}

		if (typeof headers === 'undefined') {
			headers = {};
		}

		return $.ajax({
			cache: false,
			type: type,
			url: url,
			headers: headers,
			data: data,
			dataType: 'json',
			timeout: self.options.ajax.timeout
		}).retry({
			times: self.options.ajax.retry_count,
			timeout: self.options.ajax.retry_timeout,
			statusCodes: []
		});
	};

	FileSystem.prototype.generateJWT = function (github_private_key, github_app_id) {
		var iat		= Math.floor(new Date().getTime() / 1000);
		var exp		= iat + (10 * 60); // maximum 10 minutes
		var iss		= github_app_id;
		var header	= {alg: 'RS256'};
		var payload	= {iat: iat, exp: exp, iss: iss};
		// noinspection JSUnusedLocalSymbols
		var jws		= new KJUR.jws.JWS();

		return KJUR.jws.JWS.sign(header.alg, JSON.stringify(header), JSON.stringify(payload), KEYUTIL.getKey(github_private_key));
	};

	FileSystem.prototype.buildTree = function (index, data, parts, treeNode) {
		var self = this;

		if (parts.length === 0) {
			return;
		}

		for (var i = 0 ; i < treeNode.length; i++) {
			if (parts[0] === treeNode[i]['name']) {
				self.buildTree(index, data, parts.splice(1, parts.length), treeNode[i]['type'] === 'tree' ? treeNode[i]['childnodes'] : []);
				return;
			}
		}

		data['name'] = parts[0];

		if (data['type'] === 'tree') {
			data['childnodes'] = [];
		} else {
			data['href'] = 'https://raw.githubusercontent.com/' + self.options.github.organization + '/' + self.options.github.repo + '/' + self.options.github.branch + '/' + data['path'];
			data['target'] = '_blank';
		}

		treeNode.push(data);

		self.buildTree(index, data, parts.splice(1, parts.length), data['type'] === 'tree' ? data['childnodes'] : []);
	};

	// noinspection JSUnusedGlobalSymbols
	FileSystem.prototype.getTree = function(cb) {
		var self = this;

		var tree = [];

		if (typeof self.promise === 'object') {
			// noinspection JSUnresolvedVariable
			self.promise.always(function() {
				// noinspection JSUnresolvedVariable
				if (self.options.github.token !== '') {
					// noinspection JSUnresolvedVariable
					var octo = new Octokat({
						token: self.options.github.token
					});

					// noinspection JSUnresolvedVariable
					octo.repos(self.options.github.organization, self.options.github.repo).git.trees(self.options.github.branch + '?recursive=1').fetch().then(function(data) {
						for (var i = 0 ; i < data.tree.length; i++) {
							self.buildTree(i, data.tree[i], data.tree[i]['path'].split('/'), tree);
						}

						if (typeof cb === 'function') {
							cb(tree);
						}
					});
				}
			});
		} else {
			throw new Error('GitHub token is empty');
		}
	};

	return FileSystem;
}));