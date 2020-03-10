// noinspection DuplicatedCode,JSUnusedLocalSymbols
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'optional!simplestorage', 'optional!moment-timezone', 'optional!ga', 'optional!octokat', 'optional!esheep', 'optional!clippy'], factory);
	} else { // noinspection DuplicatedCode
		if (typeof module === 'object' && module.exports) {
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
	}
} (function ($, simplestorage, moment, ga, Octokat, eSheep, clippy) {
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
				name: 'EmuOS v2.0',
				title: 'Under Development',
				icon: 'favicon.ico',
				link: 'boot.html',
				width: 824,
				height: 624
			} , {
				name: 'EmuChat',
				icon: '/emupedia-app-emuchat/favicon.ico',
				link: '/emupedia-app-emuchat/index.html',
				width: 900,
				height: 480,
				singleinstance: true
			} , {
				name: 'Discord',
				icon: 'images/icons/discord.ico',
				link: 'https://e.widgetbot.io/channels/510149138491506688/604419869345185884/',
				width: 900,
				height: 480,
				singleinstance: true
			/*} , {
				name: 'ÐeKaÐeNcE',
				title: 'Under Development',
				icon: 'images/icons/dekadence.ico',
				link: 'https://launcher.dekadence.ro',
				width: 900,
				height: 480*/
			} , {
				name: 'Windows 93',
				icon: 'images/icons/windows93.ico',
				link: 'https://v1.windows93.net',
				width: 960,
				height: 734
			} , {
				name: '98.js',
				icon: 'images/icons/98.js.ico',
				link: 'https://98.js.org/',
				width: 960,
				height: 713
			} , {
				name: 'No Clip',
				title: 'Under Development',
				icon: 'https://noclip.website/logo-40496a2270a69fdcb86b.png',
				link: 'https://noclip.website/',
				width: 900,
				height: 552
			} , {
				name: 'Visual Studio Code',
				title: 'Under Development',
				icon: '/emupedia-app-vscode/favicon.ico',
				link: '/emupedia-app-vscode/index.html',
				width: 900,
				height: 480
			} , {
				name: 'Sandbox',
				title: 'Under Development',
				icon: '/emupedia-app-sandbox/favicon.ico',
				link: '/emupedia-app-sandbox/index.html?repo=Emupedia/emupedia-app-sandbox/contents/examples?ref=master&baseurl=/emupedia-app-romcenter/&capsule=%3Cbody%3E&capsule=%3C/body%3E',
				width: 900,
				height: 480
			} , {
				name: 'Microsoft Solitaire Collection',
				icon: 'https://zone.msn.com/images/v9/en-us/game/msso/Solitaire_GameLogo_350x210_v1.png',
				link: 'https://cdn.zone.msn.com/assets/games/microsoftsolitairecollection/2019/20190729T121300_1.5.4.1_release_v0001_9af64392_msn/solitaire/index.html?hostingEnvironment=zone',
				width: 960,
				height: 540
			} , {
				name: 'Microsoft Mahjong',
				icon: 'https://zone.msn.com/images/v9/en-us/game/msmj/Mahjong_GameLogo_250_150.png',
				link: 'https://cdn.zone.msn.com/assets/games/microsoftmahjong/2019/20190805T180800_1.0.2_release_2019_002_e5886ede_msn/game.html?hostingEnvironment=zone',
				width: 960,
				height: 540
			} , {
				name: 'Microsoft Ultimate Word Games',
				icon: 'https://zone.msn.com/images/v9/en-us/game/mscw/350x210_mscw.png',
				link: 'https://cdn.zone.msn.com/assets/games/microsoftultimatewordgames/2019/20190821T095404_1.0.5_features_2019_NameChangeToWordTwister_f7862a8_msn/word-games/game.html?game=crossword&hostingEnvironment=zone',
				width: 960,
				height: 552
			} , {
				name: 'Cookie Clicker',
				icon: '/emupedia-game-cookie-clicker/favicon.png',
				link: '/emupedia-game-cookie-clicker/index.html',
				width: 1090,
				height: 600
			} , {
				name: 'Flappy Bird',
				icon: '/emupedia-game-flappy-bird/favicon.png',
				link: '/emupedia-game-flappy-bird/index.html',
				width: 432,
				height: 600
			} , {
				name: 'Geometry Dash',
				icon: '/emupedia-game-geometry-dash/favicon.png',
				link: '/emupedia-game-geometry-dash/index.html',
				width: 480,
				height: 392
			} , {
				name: 'agar.io<br/>BETA',
				title: 'Under Development',
				icon: 'images/icons/agar.io.png',
				link: 'https://agasio.herokuapp.com/',
				width: 900,
				height: 600
			} , {
				name: 'Raptor<br />(Prototype)',
				title: 'Under Development',
				icon: '/emupedia-game-raptor/favicon.ico',
				link: '/emupedia-game-raptor/index.html',
				width: 640,
				height: 400
			} , {
				name: 'Wings 2.0<br />(Prototype)',
				title: 'Under Development',
				icon: '/emupedia-game-wings2/favicon.ico',
				link: '/emupedia-game-wings2/index.html',
				width: 900,
				height: 480
			} , {
				name: 'Worms 2<br />(Prototype)',
				title: 'Under Development',
				icon: '/emupedia-game-worms2/favicon.ico',
				link: '/emupedia-game-worms2/index.html',
				width: 900,
				height: 480
			} , {
				name: 'Biolab Disaster',
				icon: '/emupedia-game-biolab-disaster/favicon.png',
				link: '/emupedia-game-biolab-disaster/index.html',
				width: 720,
				height: 480
			} , {
				name: 'Super Blob Blaster',
				icon: '/emupedia-game-super-blob-blaster/favicon.png',
				link: '/emupedia-game-super-blob-blaster/index.html',
				width: 720,
				height: 480
			} , {
				name: 'Pac-Man',
				icon: '/emupedia-game-pac-man/favicon.ico',
				link: '/emupedia-game-pac-man/index.html',
				width: 1025,
				height: 715
			} , {
				name: 'Clippy',
				icon: 'images/icons/clippy.png'
			} , {
				name: 'eSheep',
				icon: 'images/icons/esheep.png'
			} , {
				name: 'SkiFree',
				icon: '/emupedia-game-skifree/favicon.ico',
				link: '/emupedia-game-skifree/index.html',
				width: 640,
				height: 480
			} , {
				name: 'ASCIICKER<br />(Demo)',
				title: 'Under Development',
				icon: '/emupedia-demo-asciicker/favicon.ico',
				link: '/emupedia-demo-asciicker/index.html',
				width: 640,
				height: 480
			} , {
				name: 'ASCII PATROL',
				icon: '/emupedia-game-ascii-patrol/favicon.ico',
				link: '/emupedia-game-ascii-patrol/index.html',
				width: 900,
				height: 480
			} , {
				name: '3D Spatial Audio<br />(Demo)',
				icon: '/emupedia-demo-3d-spatial-audio/favicon.ico',
				link: '/emupedia-demo-3d-spatial-audio/index.html',
				width: 900,
				height: 480
			} , {
				name: 'Voxel Space<br />(Demo)',
				icon: '/emupedia-demo-voxel-space/favicon.ico',
				link: '/emupedia-demo-voxel-space/index.html',
				width: 900,
				height: 480
			} , {
				name: '8-bit Palette Color Cycling<br />(Demo)',
				icon: '/emupedia-app-8-bit-palette-color-cycling/favicon.ico',
				link: '/emupedia-app-8-bit-palette-color-cycling/index.html',
				width: 900,
				height: 550
			} , {
				name: 'RomCenter',
				title: 'Under Development',
				icon: '/emupedia-app-romcenter/favicon.ico',
				link: '/emupedia-app-romcenter/index.html',
				width: 900,
				height: 480
			} , {
				name: 'DOSBox',
				title: 'Under Development',
				icon: '/emupedia-app-dosbox/favicon.ico',
				link: '/emupedia-app-dosbox/index.html',
				width: 640,
				height: 422
			} , {
				// name: 'Street Fighter Alpha: Warriors\' Dreams',
				name: 'Street Fighter Alpha<br />(Demo)',
				title: 'Under Development',
				icon: '/emupedia-game-street-fighter-alpha/images/icons/' + function() {
					var icons = [
						'akuma',
						'balrog',
						'blanka',
						'chunli',
						'dhalsim',
						'evilryu',
						'ken',
						'makoto',
						'ryu',
						'sagat',
						'sakura',
						'zangief'
					];

					return icons[Math.floor(Math.random() * icons.length)];
				}() + '.ico',
				link: '/emupedia-game-street-fighter-alpha/index.html',
				width: 1068,
				height: 576
			} , {
				name: 'Wolfenstein 3D',
				icon: ($sys.feature['CANVAS'] ? '/emupedia-game-wolfenstein-3d-canvas' : '/emupedia-game-wolfenstein-3d') + '/favicon.gif',
				link: ($sys.feature['CANVAS'] ? '/emupedia-game-wolfenstein-3d-canvas' : '/emupedia-game-wolfenstein-3d') + '/index.html',
				width: $sys.feature['CANVAS'] ? 960 : 640,
				height: $sys.feature['CANVAS'] ? 600 : 400
			} , {
				name: 'Doom 1',
				icon: '/emupedia-game-doom1/favicon.gif',
				link: '/emupedia-game-doom1/' + ($sys.feature['WEBASSEMBLY'] ? '/' : 'asmjs/') + 'index.html',
				width: 640,
				height: 400
			} , {
				name: 'Doom 2: Hell on Earth',
				icon: '/emupedia-game-doom2/favicon.gif',
				link: '/emupedia-game-doom2/' + ($sys.feature['WEBASSEMBLY'] ? '/' : 'asmjs/') + 'index.html',
				width: 640,
				height: 400
			} , {
				name: 'Doom 3',
				icon: '/emupedia-game-doom3/favicon.ico',
				link: '/emupedia-game-doom3/index.html',
				width: 640,
				height: 480
			} , {
				name: 'Quake 1',
				icon: '/emupedia-game-quake1/favicon.ico',
				link: '/emupedia-game-quake1/' + ($sys.feature['ES6'] && $sys.feature['ES7_ASYNC_AWAIT'] ? 'async.html' : 'index.html'),
				width: 640,
				height: 480
			} , {
				name: 'Quake 2',
				icon: '/emupedia-game-quake2/favicon.ico',
				link: '/emupedia-game-quake2/index.html',
				width: 640,
				height: 480
			} , {
				name: 'Half-Life 1',
				title: 'Under Development',
				icon: '/emupedia-game-half-life1/favicon.ico',
				link: '/emupedia-game-half-life1/index.html',
				width: 640,
				height: 480
			} , {
				name: 'Diablo 1',
				title: 'Under Development',
				icon: '/emupedia-game-diablo1/favicon.ico',
				link: '/emupedia-game-diablo1/index.html',
				width: 640,
				height: 480
			} , {
				name: 'Dark Reign: The Future of War',
				title: 'Under Development',
				icon: '/emupedia-game-dark-reign/favicon.ico',
				link: '/emupedia-game-dark-reign/index.html',
				width: 640,
				height: 480
			} , {
				name: 'Command and Conquer',
				title: 'Under Development',
				icon: '/emupedia-game-command-and-conquer1/favicon.ico',
				link: '/emupedia-game-command-and-conquer1/index.html',
				width: 640,
				height: 535
			} , {
				name: 'Minecraft',
				title: 'Under Development',
				icon: '/emupedia-game-minecraft-classic/favicon.ico',
				link: '/emupedia-game-minecraft-classic/index.html',
				width: 900,
				height: 480
			} , {
				name: 'Winamp',
				icon: '/emupedia-app-winamp/favicon.ico',
				link: '/emupedia-app-winamp/index.html',
				width: 900,
				height: 480
			} , {
				name: 'Notepad',
				icon: '/emupedia-app-notepad/favicon.ico',
				link: '/emupedia-app-notepad/index.html',
				width: 900,
				height: 480,
				runonce: true
			} , {
				name: 'Paint',
				icon: '/emupedia-app-paint/favicon.ico',
				link: '/emupedia-app-paint/index.html',
				width: 900,
				height: 480
			} , {
				name: 'SVG Editor',
				icon: '/emupedia-app-svg-editor/favicon.ico',
				link: '/emupedia-app-svg-editor/index.html',
				width: 900,
				height: 480
			/*} , {
				name: 'YouTube<br/>BETA',
				title: 'Under Development',
				icon: 'images/icons/youtube.ico',
				link: 'https://explorer.emupedia.net/aHR0cHMlM0ElMkYlMkZ5b3V0dWJlLmNvbSUyRg==',
				width: 1020,
				height: 630*/
			}]
		};

		self.options = $.extend(true, self.options, options);

		// noinspection FallThroughInSwitchStatementJS
		switch (self.options.theme) {
			case 'theme-basic':
				break;
			case 'theme-win3x':
				// noinspection JSJQueryEfficiency
				if (typeof $('.emuos-window .window.emuos-window-content').mCustomScrollbar === 'function') {
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
				}
				break;
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

		if ($sys.browser.isIE) {
			self.$html.addClass('browser-ie');
		} else if ($sys.browser.isEdge) {
			self.$html.addClass('browser-edge');
		} else if ($sys.browser.isChrome || $sys.browser.isOperaBlink) {
			self.$html.addClass('browser-chrome');
		} else if ($sys.browser.isSafari || $sys.browser.isOperaPresto) {
			self.$html.addClass('browser-webkit');
		} else if ($sys.browser.isFirefox || $sys.browser.isPaleMoon || $sys.browser.isKMeleon || $sys.browser.isNetscape) {
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

		self.$body.append('<div class="desktop" tabindex="0"></div><div class="taskbar">' + start + '</div>');

		self.$desktop = $('.desktop').first();
		self.$taskbar = $('.taskbar').first();

		for (var j in self.options.icons) {
			// noinspection JSUnfilteredForInLoop,JSDuplicatedDeclaration
			var icon_options = self.options.icons[j];

			// noinspection JSUnfilteredForInLoop
			var $icon = 	$('<a class="emuos-desktop-icon" href="javascript:"' + (icon_options['title'] ? 'data-title="' + icon_options['title'] + '"' : '') + '>' +
								'<i class="icon badge" style="background-image: url(' + icon_options['icon'] + ');"></i>' +
								'<span>' + icon_options['name'] + '</span>' +
							'</a>');

			// noinspection JSUnfilteredForInLoop
			$icon.data('name', icon_options['name']);

			// noinspection JSUnfilteredForInLoop
			$icon.data('icon', icon_options['icon']);

			// noinspection JSUnfilteredForInLoop
			if (typeof icon_options['link'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.data('link', icon_options['link']);
			}

			// noinspection JSUnfilteredForInLoop
			if (typeof icon_options['width'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.data('width', icon_options['width']);
			}

			// noinspection JSUnfilteredForInLoop
			if (typeof icon_options['height'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.data('height', icon_options['height']);
			}

			// noinspection JSUnfilteredForInLoop
			if (typeof icon_options['autostart'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.attr('data-autostart', icon_options['autostart'] ? 'true' : 'false').data('autostart', icon_options['autostart']);
			}

			// noinspection JSUnfilteredForInLoop
			if (typeof icon_options['runonce'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.attr('data-runonce', icon_options['runonce'] ? 'true' : 'false').data('runonce', icon_options['runonce']);
			}

			// noinspection JSUnfilteredForInLoop
			if (typeof icon_options['singleinstance'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.attr('data-singleinstance', icon_options['singleinstance'] ? 'true' : 'false').data('singleinstance', icon_options['singleinstance']);
			}

			// noinspection JSUnfilteredForInLoop
			self.$desktop.append($icon);

			$icon.off('click').on('click', function(e) {
				e.preventDefault();
			}).off('dblclick').on('dblclick', function() {
				// noinspection JSUnfilteredForInLoop,JSReferencingMutableVariableFromClosure
				if (typeof $(this).data('link') !== 'undefined') {
					if (typeof ga === 'function') {
						ga('send', {
							hitType: 'pageview',
							page: $(this).data('link'),
							title: window.location.href
						});
					}

					if (typeof $(this).data('singleinstance') !== 'undefined') {
						if ($(this).data('singleinstance') && self.$body.find('[id^=' + $(this).data('name') + ']').length === 0) {
							// noinspection JSUnfilteredForInLoop,JSReferencingMutableVariableFromClosure
							self.iframe({
								title: $(this).data('name'),
								icon :$(this).data('icon'),
								src: $(this).data('link'),
								width: $(this).data('width'),
								height: $(this).data('height')
							});
						}
					} else {
						// noinspection JSUnfilteredForInLoop,JSReferencingMutableVariableFromClosure
						self.iframe({
							title: $(this).data('name'),
							icon :$(this).data('icon'),
							src: $(this).data('link'),
							width: $(this).data('width'),
							height: $(this).data('height')
						});
					}
				} else {
					switch ($(this).data('name')) {
						case 'eSheep':
							if (typeof eSheep !== 'undefined') {
								if (typeof eSheep.prototype.Start === 'function') {
									var pets = ['esheep64', 'green_sheep', 'neko', 'pingus', 'ssj-goku'];
									var pet = pets[~~(Math.random() * pets.length)];
									var path = '/emupedia-app-esheep/pets/' + pet + '/animations.xml';

									if (path) {
										new eSheep({
											allowPets: 'all',
											allowPopup: 'no'
										}).Start(path);
									}
								}
							}
							break;
						case 'Clippy':
							//Peedy is bugged
							var agents = ['Bonzi', 'Clippy', 'F1', 'Genie', 'Genius', 'Links', 'Merlin', 'Rocky', 'Rover'];

							var phrases = [
								'How can i help you?',
								'Nice day!',
								'Glad to meet you.',
								'At your service',
								'Hello'
							];

							var agentName = agents[~~(Math.random() * agents.length)];

							if (!agentName) break;

							if (typeof clippy !== 'undefined') {
								if (typeof  clippy.load === 'function') {
									clippy.load(agentName, function(agent) {
										window[agentName] = agent;

										var randPos = function () {
											return .2 + Math.random() * .6;
										};

										var move = function() {
											agent.moveTo($(document).width() * randPos(), $(document).height() * randPos());
										};

										move();

										agent.show();

										// Speak on click and start
										var speak = function() {
											agent.speak('I am ' + agentName + ', ' + phrases[~~(Math.random() * phrases.length)]);
											agent.animate();
										};

										$(agent._el).click(function() {
											speak();
										});

										speak();

										// Animate randomly
										setInterval(function() {
											agent.animate();
										}, 3000 + (Math.random() * 4000));

										// Move randomly
										/*setInterval(function() {
											move();
										}, 3000 + (Math.random() * 4000));*/
									}, undefined, '/emupedia-app-clippy/agents/');
								}
							}
							break;
						case 'Webamp Classic':
							// noinspection JSUnresolvedFunction,JSUnresolvedVariable
							var webamp_content = self.options.apps.webamp.render();

							// noinspection JSUnfilteredForInLoop,JSReferencingMutableVariableFromClosure
							self.widget({
								title: $(this).data('name'),
								icon :$(this).data('icon'),
								content: webamp_content
							});

							// noinspection JSUnresolvedFunction,JSUnresolvedVariable
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
			// draggableBetweenEdges: true,
			// buttonsTooltips: true,
			// propagateWindowBlur: true,
			// startButtons: true,
			minimizeAll: true,
			languageSelect: false,
			toggleFullscreen: true,
			networkMonitor: true,
			clock: true
		});

		// noinspection JSUnresolvedFunction
		self.$desktop.desktop({
			iconClass: '.icon',
			parent: '.emuos-taskbar-windows-containment'
		});

		if (typeof moment === 'function') {
			if (moment().month() === 1 && moment().date() === 14) {
				self.$html.addClass('emuos-valentines');
			}

			if (moment().month() === 11) {
				var xmas = '';
				var newyear = '';

				if (moment().date() >= 23 && moment().date() <= 25) {
					xmas 	=	'<div class="xmas-countdown">' +
									'<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" width="130px" height="130px">' +
										'<path class="bow-shadow" d="M58.8,26.6c0,0.6,0,1.3-0.2,1.9c-0.2,0.5,0,0.6,0.4,0.6c3.5-0.5,7,0.1,10.5-0.4\n' +
										'c0.3,0,0.6,0,0.9,0c2.7-0.1,5.5,0,8.2-0.2c3.8-0.3,7.7-0.5,11.4-1.4c1.2-0.3,2.2-1,3.2-1.6c0,0.3,0,0.6,0,0.9c0,2.6-0.4,3.3-2.9,3.9\n' +
										'c-3,0.8-6,1-9,1.2c-5.5,0.3-11,0.6-16.5,0.6c-0.2,0-0.3,0-0.4,0.2c-0.3-0.1-0.6-0.2-0.9-0.2c-1.2,0.4-2.5,0.1-3.7,0.1\n' +
										'c-0.6-0.2-1.2-0.2-1.8,0c-0.7,0-1.4,0-2.1,0c-4.2,0-8.4,0-12.6,0c-0.7,0-1.4,0-2.1,0c-0.6-0.2-1.2-0.2-1.8,0c-1.6,0-3.2,0-4.9,0\n' +
										'c-0.1-0.3-0.4-0.2-0.6-0.2c-5.6,0-11.1-0.3-16.6-0.6c-2.8-0.2-5.7-0.5-8.5-1.2c-0.4-0.1-0.9-0.3-1.3-0.4c-1.3-0.6-1.7-1.2-1.7-2.7\n' +
										'c0-0.6,0-1.1,0-1.7c2.4,2.1,5.4,2.1,8.3,2.4c3.2,0.4,6.4,0.5,9.6,0.7c4.5,0.2,9,0.4,13.5,0.4c0.9,0,1.7,0,2.6,0.2\n' +
										'c0.5,0.1,0.8-0.1,0.5-0.7c-0.3-0.6-0.2-1.2-0.2-1.8c0.2-1-0.2-1.4-1.1-1.7c-2.2-0.6-4.2-1.7-6.1-3c-3.1-2.2-5.7-4.9-8.4-7.5\n' +
										'c-1.4-1.4-2.5-1.2-3.6,0.5c-0.8,1.3-1.1,2.8-1.5,4.3c-0.3-1.1-0.2-2.3,0-3.4c0.4-1.7,0.8-3.5,2-4.9c0.9-1.1,1.8-1.1,2.7-0.1\n' +
										'c1.5,1.6,3.1,3.2,4.5,4.9c2.8,3.4,6.2,6,10.2,7.7c0.8,0.3,1.3,0.6,1.4,1.6c0.5,2.5,2.7,4.3,5.2,4.1c2.6-0.2,5.2-0.1,7.8,0\n' +
										'c2.8,0.2,4.9-1.7,5.4-4.4c0.1-0.6,0.4-0.9,0.9-1.1c3.9-1.6,7.3-4,10.2-7.2c1.6-1.8,3.1-3.7,4.8-5.4c1.1-1.1,2.1-1.2,2.9,0.1\n' +
										'c1.7,2.4,2.4,5.1,2,8.1c-0.4-1.5-0.7-3-1.5-4.3c-1-1.7-2.2-1.8-3.6-0.5c-1.3,1.3-2.7,2.7-4,4C67.4,21.2,64,23.8,60,25\n' +
										'C59,25.2,58.6,25.6,58.8,26.6z M41.1,32.3c-0.6-0.2-1.2-0.2-1.8,0c0.1,0,0.1,0,0.2,0.1C40,32.3,40.5,32.3,41.1,32.3z M57.8,32.3\n' +
										'c0.5,0,1,0,1.6,0.1c0.1,0,0.1,0,0.2-0.1C59,32,58.4,32,57.8,32.3z" />' +
										'<path class="bow" d="M5.7,26.5c0.2-3.9,0.8-7.8,2.3-11.4c2.9-6.9,7.7-11.6,14.7-13.7c0.9-0.3,1.8-0.4,2.8-0.3\n' +
										'c1.9,0.2,3.2,1.4,4,3.1c1.2,2.5,1.9,5.3,3.1,7.8c1.7,3.7,4.2,6.8,7.5,9.2c0.3-0.7,0.5-1.3,0.8-1.9c1-1.4,2.3-2.2,4-2.2\n' +
										'c2.9,0,5.9,0,8.8,0c2.3,0,3.9,1.2,4.7,3.4c0.1,0.2,0.2,0.4,0.3,0.7c3.3-2.4,5.8-5.5,7.5-9.2c0.9-2,1.6-4.1,2.4-6.2\n' +
										'c0.1-0.4,0.3-0.8,0.4-1.1c1.5-3.4,3.6-4.4,7.1-3.4c5.9,1.7,10.3,5.5,13.3,10.9c2.2,4,3.3,8.4,3.5,13c0,0.4,0.1,0.8,0.1,1.2\n' +
										'c-1,0.7-1.9,1.4-3.2,1.6c-3.8,0.9-7.6,1-11.4,1.4c-2.7,0.2-5.4,0.2-8.2,0.2c-0.3,0-0.6,0-0.9,0c-3.5,0.5-7-0.1-10.5,0.4\n' +
										'c-0.4,0.1-0.7-0.3-0.5-0.8c0.3-0.6,0.3-1,0.4-1.6c4.6-0.6,9.2-0.9,13.8-1.6c2-0.3,3.9-0.6,5.7-1.5c0.9-0.4,1.5-1.1,1.3-2.2\n' +
										'c-0.1-0.7-0.1-1.5-0.2-2.2c0.5-3-0.3-5.7-2-8.1c-0.9-1.3-1.8-1.2-2.9-0.1c-1.7,1.7-3.2,3.6-4.8,5.4c-2.8,3.2-6.2,5.7-10.2,7.2\n' +
										'c-0.5,0.2-0.8,0.5-0.9,1.1c-0.6,2.7-2.6,4.6-5.4,4.4c-2.6-0.1-5.2-0.1-7.8,0c-2.6,0.2-4.8-1.7-5.2-4.1c-0.2-0.9-0.7-1.3-1.4-1.6\n' +
										'c-4-1.7-7.4-4.2-10.2-7.7c-1.4-1.7-3-3.3-4.5-4.9c-1-1-1.8-0.9-2.7,0.1c-1.2,1.4-1.6,3.1-2,4.9c-0.2,1.1-0.4,2.2,0,3.4\n' +
										'c0,0.3-0.1,0.7-0.1,1c-0.3,2.5,0.1,3.1,2.4,3.8c1.1,0.4,2.3,0.6,3.5,0.8c5,0.9,10,1.1,15,1.8c0,0.6,0.2,1.2,0.4,1.7\n' +
										'c0.3,0.6-0.2,0.8-0.7,0.7c-0.9-0.1-1.7-0.2-2.6-0.2c-4.5,0-9-0.2-13.5-0.4c-3.2-0.1-6.4-0.3-9.6-0.7C11.2,28.5,8.2,28.5,5.7,26.5z" />' +
									'</svg>' +
									'<div class="message"></div>' +
									'<div class="countdown"></div>' +
								'</div>';
				}

				xmas +=		'<div class="xmas-snow" aria-hidden="true">' +
								'<div class="snowflakes"><div class="snowflake">❅</div></div>' +
								'<div class="snowflakes"><div class="snowflake">❆</div></div>' +
								'<div class="snowflakes"><div class="snowflake">❅</div></div>' +
								'<div class="snowflakes"><div class="snowflake">❆</div></div>' +
								'<div class="snowflakes"><div class="snowflake">❅</div></div>' +
								'<div class="snowflakes"><div class="snowflake">❆</div></div>' +
								'<div class="snowflakes"><div class="snowflake">❅</div></div>' +
								'<div class="snowflakes"><div class="snowflake">❆</div></div>' +
								'<div class="snowflakes"><div class="snowflake">❅</div></div>' +
								'<div class="snowflakes"><div class="snowflake">❆</div></div>';
				if (moment().date() >= 23 && moment().date() <= 25) {
					xmas +=		'<div class="snowflakes"><div class="snowflake">🎄</div></div>' +
								'<div class="snowflakes"><div class="snowflake">🎅</div></div>' +
								'<div class="snowflakes"><div class="snowflake">🎄</div></div>' +
								'<div class="snowflakes"><div class="snowflake">🎁</div></div>' +
								'<div class="snowflakes"><div class="snowflake">⛄</div></div>' +
								'<div class="snowflakes"><div class="snowflake">🎁</div></div>' +
								'<div class="snowflakes"><div class="snowflake">🎅</div></div>' +
								'<div class="snowflakes"><div class="snowflake">🎁</div></div>' +
								'<div class="snowflakes"><div class="snowflake">⛄</div></div>';
				}
				xmas +=		'</div>';

				self.$desktop.prepend(xmas);

				if (moment().date() >= 23 && moment().date() <= 25) {
					var currentYear = new Date().getFullYear();

					var getRemaining = function(dt, id, timer) {
						var end = new Date(dt);
						var now = new Date();

						var distance = end - now;
						var daysTil = Math.ceil(distance / timer().day);
						var message = $('.xmas-countdown .message').get(0);

						$('.xmas-countdown .' + id).get(0).innerHTML = daysTil + '';

						distance !== 0 ? message.innerHTML = 'Days \'til Xmas' : message.innerHTML = 'Merry Xmas!';
					};

					var timer = function() {
						return {
							second: 1000,
							get minute() { return this.second * 60 },
							get hour() { return this.minute * 60 },
							get day() { return this.hour * 24}
						}
					};

					getRemaining('12/25/' + currentYear, 'countdown', timer);
				}

				if (moment().date() >= 26) {
					newyear += '<div class="newyear-countdown">' +
									'<div class="newyear-box">' +
										'<div id="days" class="num">00</div>' +
										'<div id="days-text" class="text">Days</div>' +
									'</div>' +
									'<div class="newyear-box">' +
										'<div id="hours" class="num">00</div>' +
										'<div id="hours-text" class="text">Hours</div>' +
									'</div>' +
									'<div class="newyear-box">' +
										'<div id="mins" class="num">00</div>' +
										'<div id="mins-text" class="text">Minutes</div>' +
									'</div>' +
									'<div class="newyear-box">' +
										'<div id="secs" class="num">00</div>' +
										'<div id="secs-text" class="text">Seconds</div>' +
									'</div>' +
								'</div>';
				}

				if (moment().date() === 31) {
					newyear +=	'<div class="fireworks">' +
									'<div class="fireworks-before"></div>' +
									'<div class="fireworks-after"></div>' +
								'</div>';
				}

				self.$desktop.prepend(newyear);

				if (moment().date() >= 26) {
					function timeLeft(endtime) {
						// noinspection JSCheckFunctionSignatures
						var t = Date.parse(endtime) - Date.parse(new Date());
						var seconds = Math.floor( (t / 1000) % 60 );
						var minutes = Math.floor( (t / 1000 / 60) % 60 );
						var hours = Math.floor( (t / (1000 * 60 * 60)) % 24 );
						var days = Math.floor( t / (1000 *60 * 60* 24) );

						return {
							total: t,
							days: days,
							hours: hours,
							minutes: minutes,
							seconds: seconds
						};
					}

					function setClock(newyear) {
						var timeinterval = setInterval(function() {
							var t = timeLeft(newyear);

							// noinspection JSJQueryEfficiency
							$('#days').text(t.days);
							// noinspection JSJQueryEfficiency
							$('#hours').text(t.hours);
							// noinspection JSJQueryEfficiency
							$('#mins').text(('0' + t.minutes).slice(-2));
							// noinspection JSJQueryEfficiency
							$('#secs').text(('0' + t.seconds).slice(-2));

							if (t.total <= 0) {
								clearInterval(timeinterval);

								var now = new Date();
								var yearStr = now.getFullYear().toString();

								$('#days').text(yearStr[0]);
								$('#days-text').text('Happy');
								$('#hours').text(yearStr[1]);
								$('#hours-text').text('New');
								$('#mins').text(yearStr[2]);
								$('#mins-text').text('Year');
								$('#secs').text(yearStr[3]);
								$('#secs-text').text('!!!');
							}
						},1000);
					}

					var today = new Date();
					var deadline = 'January 1 ' + (today.getFullYear() + 1) + ' 00:00:00';

					if (today.getMonth() === 0 && today.getDate() === 1) {
						deadline = 'January 1 ' + (today.getFullYear()) + ' 00:00:00';
					}

					setClock(deadline);
				}
			}
		}

		self.$desktop.find('[data-autostart="true"]').trigger('dblclick');

		self.$desktop.find('[data-runonce="true"]').each(function() {
			if (typeof simplestorage !== 'undefined') {
				if (typeof simplestorage.get === 'function') {
					if (typeof simplestorage.get($(this).data('name')) === 'undefined') {
						if (typeof simplestorage.set === 'function') {
							simplestorage.set($(this).data('name'), true);
							$(this).trigger('dblclick');
						}
					}
				}
			}
		});

		if (typeof self.options.network.start === 'function') {
			window['NETWORK_CONNECTION'] = self.options.network.start({
				servers: ['wss://ws.emupedia.net', 'wss://ws.emuos.net', 'wss://ws.emuos.org'],
				server: ~window.location.hostname.indexOf('emuos.org') ? 2 : (~window.location.hostname.indexOf('emuos.net') ? 1 : 0),
				mode: 0
			});
		}

		// noinspection HtmlDeprecatedAttribute,HtmlUnknownTarget
		self.widget({
			title: 'Chat',
			hidden: true,
			width: 640,
			height: 350,
			right: 0,
			bottom: 28,
			content: '<iframe id="Chat" width="100%" height="100%" src="/emupedia-app-emuchat/index.html" frameborder="0" allowFullscreen="true" allowTransparency="true" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe>'
		});

		self.$html.contextmenu({
			delegate: '.emuos-desktop, .emuos-taskbar',
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
						if (typeof $('.emuos-window .window.emuos-window-content').mCustomScrollbar === 'function') {
							// noinspection JSJQueryEfficiency
							$('.emuos-window .window.emuos-window-content').mCustomScrollbar('destroy');
						}
						self.$taskbar.taskbar('option', 'resizableHandleOffset', 0).taskbar('instance')._refresh();
						break;
					case 'win3x':
						self.$html.removeClass('theme-basic theme-win9x').addClass('theme-win3x');
						// noinspection JSJQueryEfficiency
						if (typeof $('.emuos-window .window.emuos-window-content').mCustomScrollbar === 'function') {
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
						}
						self.$taskbar.taskbar('option', 'resizableHandleOffset', 0).taskbar('instance')._refresh();
						break;
					case 'win9x':
						self.$html.removeClass('theme-basic theme-win3x').addClass('theme-win9x');
						// noinspection JSJQueryEfficiency
						if (typeof $('.emuos-window .window.emuos-window-content').mCustomScrollbar === 'function') {
							$('.emuos-window .window.emuos-window-content').mCustomScrollbar('destroy');
						}
						self.$taskbar.taskbar('option', 'resizableHandleOffset', 1).taskbar('instance')._refresh();
						break;
				}

				return true;
			}
		});

		self.$html.on('mousemove', function (e) {
			var parentOffset = $(e.target).offset();
			var relX = e.pageX - parentOffset.left;
			var relY = e.pageY - parentOffset.top;
			self.$html.get(0).style.setProperty('--mouse-x', relX + 'px');
			self.$html.get(0).style.setProperty('--mouse-y', relY + 'px');
		});
	};

	// noinspection DuplicatedCode
	EmuOS.prototype.widget = function (options) {
		var self = this;

		var title		= typeof options.title		!== 'undefined'	? options.title		: '';
		var content		= typeof options.content	!== 'undefined'	? options.content	: '';
		var hidden		= typeof options.hidden		!== 'undefined' ? options.hidden	: false;
		var width		= typeof options.width		!== 'undefined' ? options.width		: 640;
		var height		= typeof options.height		!== 'undefined' ? options.height	: 400;
		var top			= typeof options.top		!== 'undefined' ? options.top		: null;
		var left		= typeof options.left		!== 'undefined' ? options.left		: null;
		var right		= typeof options.right		!== 'undefined' ? options.right		: null;
		var bottom		= typeof options.bottom		!== 'undefined' ? options.bottom	: null;
		var position	= (top !== null ? 'top: ' + top + 'px; ' : '') + (left !== null ? 'left: ' + left + 'px; ' : '') + (right !== null ? 'right: ' + right + 'px; ' : '') + (bottom !== null ? 'bottom: ' + bottom + 'px; ' : '');

		var widget = $('<div class="widget" style="display: ' + (hidden ? 'none' : 'block') +  '; position: absolute; ' + position + ' width: ' + width + 'px; height: ' + height + 'px;">' + content + '</div>');

		self.$body.append(widget);

		widget.find('iframe').off('load').on('load', function() {
			if (title === 'Chat') {
				var net = window['NETWORK_CONNECTION'];

				if (typeof net !== 'undefined') {
					if (typeof net.register_iframe === 'function') {
						net.register_iframe(title);
						net.badge = 0;

						net.show = function() {
							widget.slideDown(300);
							net.badge = 0;
							var $icon = self.$body.find('.emuos-desktop-icon span:contains("EmuChat")').siblings('i.icon').first();
							$icon.attr('class', 'icon badge');
						};

						net.hide = function() {
							widget.slideUp(300);
						};

						net.toggle = function() {
							if (widget.is(':hidden')) {
								net.badge = 0;
								var $icon = self.$body.find('.emuos-desktop-icon span:contains("EmuChat")').siblings('i.icon').first();
								$icon.attr('class', 'icon badge');
							}

							widget.slideToggle(300);
						};

						self.$body.on('keydown', function (e) {
							// noinspection JSRedundantSwitchStatement
							switch (e.keyCode) {
								case 192:
									net.toggle();
									return false;
							}
						});

						var $icon = self.$body.find('.emuos-desktop-icon span:contains("EmuChat")').siblings('i.icon').first();
						$icon.attr('class', 'icon badge');
					}
				}
			}
		});

		return widget;
	};

	// noinspection DuplicatedCode
	EmuOS.prototype.window = function (options) {
		var self = this;

		var title	= typeof options.title		!== 'undefined'	? options.title		: '';
		var icon	= typeof options.icon		!== 'undefined'	? options.icon		: '';
		var content	= typeof options.content	!== 'undefined'	? options.content	: '';

		var win	= $('<div class="window" data-title="'+ title +'">' + content + '</div>');

		self.$body.append(win);

		// noinspection JSValidateTypes
		win.window({
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
						// noinspection JSValidateTypes,JSUnresolvedFunction
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
			// noinspection JSUnresolvedFunction
			$(this).parents('.emuos-window').first().contextmenu('open', $(this));
			e.preventDefault();
		});

		// noinspection JSValidateTypes
		return win.window('instance');
	};

	// noinspection DuplicatedCode
	EmuOS.prototype.iframe = function (options) {
		var self = this;

		var title		= typeof options.title	!== 'undefined' ? options.title		: '';
		var icon		= typeof options.icon	!== 'undefined' ? options.icon		: '';
		var src			= typeof options.src	!== 'undefined' ? options.src		: '';
		var width		= typeof options.width	!== 'undefined' ? options.width		: 640;
		var height		= typeof options.height	!== 'undefined' ? options.height	: 400;
		var timestamp	= Math.floor(Date.now() / 1000);

		// noinspection HtmlDeprecatedAttribute
		var win = $('<div class="iframe" data-title="'+ title +'"><iframe id="' + title + '-' + timestamp + '" src="' + src + '" onload="this.focus();this.contentWindow.focus();" frameborder="0" allowFullscreen="true" allowTransparency="true" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe></div>');

		self.$body.append(win);

		win.find('iframe').off('load').on('load', function() {
			var $el = $(this);

			if (title === 'EmuChat') {
				var net = window['NETWORK_CONNECTION'];

				if (typeof net !== 'undefined') {
					if (typeof net.register_iframe === 'function') {
						net.register_iframe(title + '-' + timestamp);
						net.badge = 0;
						var $icon = self.$body.find('.emuos-desktop-icon span:contains("EmuChat")').siblings('i.icon').first();
						$icon.attr('class', 'icon badge');
					}
				}
			}

			$el.focus();
			$el.get(0).focus();
			$el.get(0).contentWindow.focus();
		});

		// noinspection JSValidateTypes
		win.window({
			embeddedContent: true,
			// group: title,
			width: width,
			height: height,
			position: {
				my: 'center',
				at: 'center center-' + (height/2 + 14),
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
						// noinspection JSUnresolvedFunction
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
			// noinspection JSUnresolvedFunction
			$(this).parents('.emuos-window').first().contextmenu('open', $(this));
			e.preventDefault();
		});

		// noinspection JSValidateTypes
		return win.window('instance');
	};

	return EmuOS;
}));