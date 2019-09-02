// noinspection DuplicatedCode,JSUnusedLocalSymbols
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
	var EmuOS = function (options) {
		var self = this;

		// noinspection JSUnusedGlobalSymbols
		self.$document	= $(document);
		self.$window	= $(window);
		self.$html		= $('html');
		self.$body		= $('body');

		self.options = {
			theme: 'theme-win3x',
			themes: {
				basic: 'theme-basic',
				win3x: 'theme-win3x',
				win9x: 'theme-win9x'
			},
			icons: [{
				name: 'Discord',
				icon: 'vfat/apps/discord/favicon.png',
				link: 'https://disweb.deploys.io/channels/510149138491506688/604419869345185884/',
				width: 800,
				height: 600
			} , {
				name: 'Windows 93',
				icon: 'vfat/apps/windows93/favicon.ico',
				link: 'https://v1.windows93.net/',
				width: 960,
				height: 713
			} , {
				name: 'Visual Studio Code',
				icon: 'vfat/apps/monaco-editor/favicon.ico',
				link: 'vfat/apps/monaco-editor/index.html',
				width: 800,
				height: 600
			} , {
				name: 'Wing 2.0',
				icon: 'vfat/games/wing2/favicon.ico',
				link: 'vfat/games/wing2/index.html',
				width: 800,
				height: 600
			} , {
				name: 'Worms 2',
				icon: 'vfat/games/worms2/favicon.ico',
				link: 'vfat/games/worms2/index.html',
				width: 800,
				height: 600
			} , {
				name: 'Biolab Disaster',
				icon: 'vfat/games/biolab-disaster/favicon.png',
				link: 'vfat/games/biolab-disaster/index.html',
				width: 720,
				height: 480
			} , {
				name: 'Super Blob Blaster',
				icon: 'vfat/games/super-blob-blaster/favicon.png',
				link: 'vfat/games/super-blob-blaster/index.html',
				width: 720,
				height: 480
			} , {
				name: 'Spatial Audio (Demo)',
				icon: 'vfat/games/spatial-audio/favicon.ico',
				link: 'vfat/games/spatial-audio/index.html',
				width: 800,
				height: 600
			} , {
				name: 'Voxel Space (Demo)',
				icon: 'vfat/games/voxel-space/favicon.ico',
				link: 'vfat/games/voxel-space/index.html',
				width: 800,
				height: 600
			} , {
				name: 'RomCenter 3.71',
				icon: 'vfat/apps/romcenter/favicon.ico',
				link: 'vfat/apps/romcenter/index.html',
				width: 800,
				height: 600
			} , {
				name: 'DOSBox 0.74',
				icon: 'vfat/apps/dosbox/favicon.ico',
				link: 'vfat/apps/dosbox/index.html',
				width: 640,
				height: 422
			} , {
				name: 'Wolfenstein 3D',
				icon: 'vfat/games/wolf3d-' + (SYSTEM_FEATURE_CANVAS ? 'canvas' : '') + '/favicon.gif',
				link: 'vfat/games/wolf3d-' + (SYSTEM_FEATURE_CANVAS ? 'canvas' : '') + '/index.html',
				width: SYSTEM_FEATURE_CANVAS ? 960 : 640,
				height: SYSTEM_FEATURE_CANVAS ? 600 : 400
			} , {
				name: 'Doom 1',
				icon: 'vfat/games/doom1/favicon.gif',
				link: 'vfat/games/doom1/' + (SYSTEM_FEATURE_WEBASSEMBLY ? '/' : 'asmjs/') + 'index.html',
				width: 800,
				height: 500
			} , {
				name: 'Doom 2: Hell on Earth',
				icon: 'vfat/games/doom2/favicon.gif',
				link: 'vfat/games/doom2/' + (SYSTEM_FEATURE_WEBASSEMBLY ? '/' : 'asmjs/') + 'index.html',
				width: 800,
				height: 500
			} , {
				name: 'Doom 3',
				icon: 'vfat/games/doom3/favicon.ico',
				link: 'vfat/games/doom3/index.html',
				width: 800,
				height: 600
			} , {
				name: 'Quake 1',
				icon: 'vfat/games/quake1/favicon.ico',
				link: 'vfat/games/quake1/' + (SYSTEM_FEATURE_ES6 && SYSTEM_FEATURE_ES7_ASYNC_AWAIT ? 'async.html' : 'index.html'),
				width: 800,
				height: 600
			} , {
				name: 'Diablo 1',
				icon: 'vfat/games/diablo1/favicon.ico',
				link: 'vfat/games/diablo1/index.html'
			} , {
				name: 'Dark Reign: The Future of War',
				icon: 'vfat/games/darkreign/favicon.ico',
				link: 'vfat/games/darkreign/index.html',
				width: 640,
				height: 480
			} , {
				name: 'Command and Conquer',
				icon: 'vfat/games/command-and-conquer/favicon.ico',
				link: 'vfat/games/command-and-conquer/index.html',
				width: 640,
				height: 535
			} , {
				name: 'Minecraft',
				icon: 'vfat/games/minecraft/favicon.ico',
				link: 'https://classic.minecraft.net',
				width: 800,
				height: 600
			} , {
				name: 'Webamp Classic',
				icon: 'vfat/apps/webamp-classic/favicon.ico'
			} , {
				name: 'Notepad',
				icon: 'vfat/apps/notepad/favicon.ico',
				link: 'vfat/apps/notepad/index.html',
				width: 800,
				height: 600,
				autostart: true
			} , {
				name: 'Paint',
				icon: 'vfat/apps/paint/favicon.ico',
				link: 'vfat/apps/paint/index.html',
				width: 800,
				height: 600
			} , {
				name: 'SVG Editor',
				icon: 'vfat/apps/svg-editor/favicon.ico',
				link: 'vfat/apps/svg-editor/index.html',
				width: 800,
				height: 600
			}]
		};

		self.options = $.extend(true, self.options, options);

		// noinspection FallThroughInSwitchStatementJS
		switch (self.options.theme) {
			case 'theme-basic':
				break;
			case 'theme-win3x':
				$('.emuos-window .window.emuos-window-content').mCustomScrollbar({
					axis: 'y',
					scrollbarPosition: 'inside',
					scrollInertia: 0,
					alwaysShowScrollbar: 0,
					keyboard: {
						enable: true
					},
					scrollButtons: {
						enable: true
					},
					mouseWheel: {
						enable: true
					},
					advanced: {
						updateOnContentResize: true,
						updateOnImageLoad: true,
						updateOnSelectorChange: true
					},
					live: true
				});
			case 'theme-win9x':
				self.options.start = [{
					name: 'Windows Update'
				} , {
					name: 'Programs'
				} , {
					name: 'Documents'
				} , {
					name: 'Settings'
				} , {
					name: 'Search'
				} , {
					name: 'Help'
				} , {
					name: 'Run...'
				} , {
					name: 'Log Off...'
				} , {
					name: 'Shut Down...'
				}];
				break;
		}

		self.$html.addClass('emuos').addClass(self.options.theme);

		if (isIE) {
			self.$html.addClass('browser-ie');
		} else if (isEdge) {
			self.$html.addClass('browser-edge');
		} else if (isChrome || isOperaBlink) {
			self.$html.addClass('browser-chrome');
		} else if (isSafari || isOperaPresto) {
			self.$html.addClass('browser-webkit');
		} else if (isFirefox || isPaleMoon || isKMeleon || isNetscape) {
			self.$html.addClass('browser-firefox');
		} else {
			self.$html.addClass('browser-other');
		}

		var start = '';

		if (typeof self.options.start !== 'undefined') {
			start = '<ul data-menu-lang="*" data-menu-type="start">';

			for (var i in self.options.start) {
				// noinspection JSUnfilteredForInLoop
				start += '<li>' + self.options.start[i]['name'] + '</li>';
			}

			start += '</ul>';
		}

		self.$body.append('<div class="desktop"></div><div class="taskbar">' + start + '</div>');

		self.$desktop = $('.desktop').first();
		self.$taskbar = $('.taskbar').first();

		for (var j in self.options.icons) {
			// noinspection JSUnfilteredForInLoop
			var $icon = $('<a class="icon" href="javascript:">' +
							'<img src="' + self.options.icons[j]['icon'] + '" alt="' + self.options.icons[j]['name'] + '" />' +
							'<span>' + self.options.icons[j]['name'] + '</span>' +
						'</a>');

			// noinspection JSUnfilteredForInLoop
			$icon.data('name', self.options.icons[j]['name']);
			// noinspection JSUnfilteredForInLoop
			$icon.data('icon', self.options.icons[j]['icon']);

			// noinspection JSUnfilteredForInLoop
			if (typeof self.options.icons[j]['link'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.data('link', self.options.icons[j]['link']);
			}

			// noinspection JSUnfilteredForInLoop
			if (typeof self.options.icons[j]['width'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.data('width', self.options.icons[j]['width']);
			}

			// noinspection JSUnfilteredForInLoop
			if (typeof self.options.icons[j]['height'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.data('height', self.options.icons[j]['height']);
			}

			// noinspection JSUnfilteredForInLoop
			if (typeof self.options.icons[j]['autostart'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.attr('data-autostart', self.options.icons[j]['autostart'] ? 'true' : 'false').data('autostart', self.options.icons[j]['autostart']);
			}

			// noinspection JSUnfilteredForInLoop
			self.$desktop.append($icon);

			$icon.off('click').on('click', function(e) {
				e.preventDefault();
			}).off('dblclick').on('dblclick', function() {
				// noinspection JSUnfilteredForInLoop,JSReferencingMutableVariableFromClosure
				if (typeof $(this).data('link') !== 'undefined') {
					// noinspection JSUnfilteredForInLoop,JSReferencingMutableVariableFromClosure
					self.iframe({
						title: $(this).data('name'),
						icon :$(this).data('icon'),
						src: $(this).data('link'),
						width: $(this).data('width'),
						height: $(this).data('height')
					});
				} else {
					// noinspection JSRedundantSwitchStatement
					switch ($(this).data('name')) {
						case 'Webamp Classic':
							// noinspection JSUnresolvedFunction
							var webamp_content = self.options.apps.webamp.render();

							// noinspection JSUnfilteredForInLoop,JSReferencingMutableVariableFromClosure
							self.widget({
								title: $(this).data('name'),
								icon :$(this).data('icon'),
								content: webamp_content
							});

							// noinspection JSUnresolvedFunction
							self.options.apps.webamp.events('.emuos-taskbar-windows-containment');
							break;
						default:
					}
				}
			});
		}

		// noinspection JSUnresolvedFunction
		self.$taskbar.taskbar({
			//windowsContainment: 'viewport',
			windowsContainment: 'visible',
			horizontalStick: 'bottom left',
			horizontalWidth: '100%',
			draggable: true,
			resizable: true,
			resizableHandleOffset: 1,
			minimizeAll: true,
			languageSelect: false,
			toggleFullscreen: true,
			clock: true
		});

		// noinspection JSUnresolvedFunction
		self.$desktop.desktop({
			iconClass: '.icon',
			parent: '.emuos-taskbar-windows-containment'
		});

		self.$desktop.find('[data-autostart="true"]').first().trigger('dblclick');

		self.$html.contextmenu({
			delegate: 'body, .emuos-taskbar',
			menu: [{
				title: 'Refresh',
				cmd: 'refresh',
				uiIcon: 'ui-icon-copy'
			} , {
				title: '----'
			} , {
				title: 'Themes',
				children: [{
					title: 'Basic',
					cmd: 'basic',
					uiIcon: 'ui-icon-clipboard'
				} , {
					title: 'Windows 3.x',
					cmd: 'win3x',
					uiIcon: 'ui-icon-scissors'
				} , {
					title: 'Windows 9x',
					cmd: 'win9x',
					uiIcon: 'ui-icon-clipboard'
				}]
			}],
			select: function(e, ui) {
				switch (ui.cmd) {
					case 'refresh':
						window.location = window.location;
						break;
					case 'basic':
						self.$html.removeClass('theme-win3x theme-win9x').addClass('theme-basic');
						// noinspection JSJQueryEfficiency
						$('.emuos-window .window.emuos-window-content').mCustomScrollbar('destroy');
						self.$taskbar.taskbar('option', 'resizableHandleOffset', 0).taskbar('instance')._refresh();
						break;
					case 'win3x':
						self.$html.removeClass('theme-basic theme-win9x').addClass('theme-win3x');
						// noinspection JSJQueryEfficiency
						$('.emuos-window .window.emuos-window-content').mCustomScrollbar('destroy');
						// noinspection JSJQueryEfficiency
						$('.emuos-window .window.emuos-window-content').mCustomScrollbar({
							axis: 'y',
							scrollbarPosition: 'inside',
							scrollInertia: 0,
							alwaysShowScrollbar: 0,
							keyboard: {
								enable: true
							},
							scrollButtons: {
								enable: true
							},
							mouseWheel: {
								enable: true
							},
							advanced: {
								updateOnContentResize: true,
								updateOnImageLoad: true,
								updateOnSelectorChange: true
							},
							live: true
						});
						self.$taskbar.taskbar('option', 'resizableHandleOffset', 0).taskbar('instance')._refresh();
						break;
					case 'win9x':
						self.$html.removeClass('theme-basic theme-win3x').addClass('theme-win9x');
						// noinspection JSJQueryEfficiency
						$('.emuos-window .window.emuos-window-content').mCustomScrollbar('destroy');
						self.$taskbar.taskbar('option', 'resizableHandleOffset', 1).taskbar('instance')._refresh();
						break;
				}

				return true;
			}
		});
	};

	EmuOS.prototype.widget = function (options) {
		var self = this;

		var title	= typeof options.title		!== 'undefined'	? options.title		: '';
		// var icon	= typeof options.icon		!== 'undefined'	? options.icon		: '';
		var content	= typeof options.content	!== 'undefined'	? options.content	: '';

		var widget	= $('<div class="widget" data-title="'+ title +'">' + content + '</div>');

		self.$body.append(widget);

		return widget;
	};

	// noinspection DuplicatedCode
	EmuOS.prototype.window = function (options) {
		var self = this;

		var title	= typeof options.title		!== 'undefined'	? options.title		: '';
		var icon	= typeof options.icon		!== 'undefined'	? options.icon		: '';
		var content	= typeof options.content	!== 'undefined'	? options.content	: '';

		var window	= $('<div class="window" data-title="'+ title +'">' + content + '</div>');

		self.$body.append(window);

		// noinspection JSValidateTypes
		window.window({
			icons: {
				main: self.$html.hasClass('theme-basic') || self.$html.hasClass('theme-win9x') ? (icon !== '' ? icon : null) : ''
			}
		});

		$('.emuos-window').contextmenu({
			autoTrigger: false,
			delegate: '.emuos-window-icon',
			menu: [{
				title: 'Restore',
				cmd: 'restore',
				disabled: true
			} , {
				title: 'Move',
				cmd: 'move'
			} , {
				title: 'Size',
				cmd: 'size'
			} , {
				title: 'Minimize',
				cmd: 'minimize'
			} , {
				title: 'Maximize',
				cmd: 'maximize'
			} , {
				title: '----'
			} , {
				title: 'Close',
				cmd: 'close'
			} , {
				title: '----'
			} , {
				title: 'Next',
				cmd: 'next'
			}],
			select: function(e, ui) {
				// noinspection JSRedundantSwitchStatement
				switch (ui.cmd) {
					case 'close':
						// noinspection JSValidateTypes
						$(e.target).children('.window, .iframe').first().window('close');
						break;
				}

				return true;
			},
			close: function (e) {
				console.log(e);
			}
		});

		$('.emuos-window-icon').on('click', function(e) {
			$(this).parents('.emuos-window').first().contextmenu('open', $(this));
			e.preventDefault();
		});

		// noinspection JSValidateTypes
		return window.window('instance');
	};

	// noinspection DuplicatedCode
	EmuOS.prototype.iframe = function (options) {
		var self = this;

		var title		= typeof options.title		!== 'undefined' ? options.title		: '';
		var icon		= typeof options.icon		!== 'undefined' ? options.icon		: '';
		var src			= typeof options.src		!== 'undefined' ? options.src		: '';
		var width		= typeof options.width		!== 'undefined' ? options.width		: 0;
		var height		= typeof options.height		!== 'undefined' ? options.height	: 0;

		// noinspection HtmlDeprecatedAttribute
		var window	= $('<div class="iframe" data-title="'+ title +'"><iframe src="' + src + '" frameborder="0" allowFullscreen="true" allowTransparency="true" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe></div>');

		self.$body.append(window);
		self.$body.find('iframe').first().focus();

		// noinspection JSValidateTypes
		window.window({
			embeddedContent: true,
			width: width !== 0 ? width : 640,
			height: height !== 0 ? height : 400,
			position: {
				my: 'center',
				at: 'center center-' + (height/2 - 60),
				of: this.$window.get(0),
				collision: 'fit'
			},
			icons: {
				main: this.$html.hasClass('theme-basic') || this.$html.hasClass('theme-win9x') ? (icon !== '' ? icon : null) : ''
			}
		});

		$('.emuos-window').contextmenu({
			autoTrigger: false,
			delegate: '.emuos-window-icon',
			menu: [{
				title: 'Restore',
				cmd: 'restore',
				disabled: true
			} , {
				title: 'Move',
				cmd: 'move'
			} , {
				title: 'Size',
				cmd: 'size'
			} , {
				title: 'Minimize',
				cmd: 'minimize'
			} , {
				title: 'Maximize',
				cmd: 'maximize'
			} , {
				title: '----'
			} , {
				title: 'Close',
				cmd: 'close'
			} , {
				title: '----'
			} , {
				title: 'Next',
				cmd: 'next'
			}],
			select: function(e, ui) {
				// noinspection JSRedundantSwitchStatement
				switch (ui.cmd) {
					case 'close':
						$(e.target).children('.window, .iframe').first().window('close');
						break;
				}

				return true;
			},
			close: function (e) {
				console.log(e);
			}
		});

		$('.emuos-window-icon').on('click', function(e) {
			$(this).parents('.emuos-window').first().contextmenu('open', $(this));
			e.preventDefault();
		});

		// noinspection JSValidateTypes
		return window.window('instance');
	};

	return EmuOS;
}));