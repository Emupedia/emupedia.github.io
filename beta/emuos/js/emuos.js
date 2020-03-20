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

		var root = location.hostname === 'localhost' ? 'https://emupedia.net' : '';

		// noinspection JSUnusedGlobalSymbols
		self.$document	= $(document);
		self.$window	= $(window);
		self.$html		= $('html');
		self.$body		= $('body');

		self.disclaimer = '<br /><br />Disclaimer<hr />This software does not represent in anyway the original product, it only represents an attempt to recreate the original look &amp; feel of the product using modern web technologies for educational and digital archiving purposes.<br /><br />The author(s) and/or any of it\'s maintainers are in no way associated with or endorsed by the copyright holders.';
		self.disclaimer_abandoned = '<br /><br />Disclaimer<hr />This software does not represent in anyway the original product, it only represents an attempt to recreate the original look &amp; feel of the product using modern web technologies for educational and digital archiving purposes, because the original product no longer works on modern computer hardware without modifications.<br /><br />The author(s) and/or any of it\'s maintainers are in no way associated with or endorsed by the copyright holders.';

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
				icon: 'images/icons/desktop/emupedia',
				link: 'boot.html',
				width: 824,
				height: 624
			} , {
				name: 'GitHub Project',
				title: 'External Website',
				icon: 'images/icons/desktop/github',
				link: 'https://github.com/Emupedia/emupedia.github.io/',
				target: '_blank',
				shortcut: true
			} , {
				name: 'EmuChat',
				icon: 'images/icons/desktop/emuchat',
				link: root + '/emupedia-app-emuchat/',
				width: 900,
				height: 480,
				singleinstance: true
			} , {
				name: 'Discord',
				title: 'External Website',
				icon: 'images/icons/desktop/discord',
				link: 'https://e.widgetbot.io/channels/510149138491506688/604419869345185884/',
				credits: 'Website: <a href="https://widgetbot.io" target="_blank">widgetbot.io</a>',
				width: 900,
				height: 480,
				shortcut: true,
				singleinstance: true
			} , {
				name: 'Windows 93',
				title: 'External Website',
				icon: 'images/icons/desktop/windows93',
				link: 'https://v1.windows93.net/',
				credits: 'Author(s): <a href="http://jankenpopp.com" target="_blank">Jankenpopp</a> &amp; <a href="http://zombect.ro" target="_blank">Zombectro</a><br />Website: <a href="https://windows93.net" target="_blank">windows93.net</a><br />License: <a href="https://www.windows93.net/#!/c/TOS.html" target="_blank">CC BY-NC 4.0</a>',
				width: 960,
				height: 734,
				shortcut: true
			} , {
				name: '98.js',
				title: 'External Website',
				icon: 'images/icons/desktop/98.js',
				link: 'https://98.js.org/',
				credits: 'Author: <a href="https://github.com/1j01" target="_blank">github.com/1j01</a><br />Website: <a href="https://98.js.org" target="_blank">98.js.org</a><br />Repository: <a href="https://github.com/1j01/98" target="_blank">github.com/1j01/98</a>' + self.disclaimer_abandoned,
				width: 960,
				height: 713,
				shortcut: true
			} , {
				name: 'Visual Studio Code',
				title: 'Under Development',
				icon: 'images/icons/desktop/visual-studio-code',
				link: root + '/emupedia-app-vscode/',
				credits: 'Author: <a href="https://github.com/Microsoft" target="_blank">github.com/Microsoft</a><br />Repository: <a href="https://github.com/Microsoft/vscode" target="_blank">github.com/Microsoft/vscode</a><br />License: <a href="https://github.com/microsoft/vscode/blob/master/LICENSE.txt" target="_blank">MIT</a>',
				width: 900,
				height: 480
			} , {
				name: 'Sandbox',
				title: 'Under Development',
				icon: 'images/icons/desktop/sandbox',
				link: root + '/emupedia-app-sandbox/?repo=Emupedia/emupedia-app-sandbox/contents/examples?ref=master&baseurl=/emupedia-app-romcenter/&capsule=%3Cbody%3E&capsule=%3C/body%3E',
				width: 900,
				height: 480
			} , {
				name: 'Microsoft Solitaire Collection',
				title: 'External Website',
				icon: 'images/icons/desktop/microsoft-solitaire',
				link: 'https://cdn.zone.msn.com/assets/games/microsoftsolitairecollection/2019/20190729T121300_1.5.4.1_release_v0001_9af64392_msn/solitaire/index.html?hostingEnvironment=zone',
				credits: 'Website: <a href="https://zone.msn.com/en/mssolitairecollection/default.htm" target="_blank">zone.msn.com/en/mssolitairecollection</a>',
				width: 960,
				height: 540,
				shortcut: true
			} , {
				name: 'Microsoft Mahjong',
				title: 'External Website',
				icon: 'images/icons/desktop/microsoft-mahjong',
				link: 'https://cdn.zone.msn.com/assets/games/microsoftmahjong/2019/20190805T180800_1.0.2_release_2019_002_e5886ede_msn/game.html?hostingEnvironment=zone',
				credits: 'Website: <a href="https://zone.msn.com/en/msmahjong/default.htm" target="_blank">zone.msn.com/en/msmahjong</a>',
				width: 960,
				height: 540,
				shortcut: true
			} , {
				name: 'Microsoft Ultimate Word Games',
				title: 'External Website',
				icon: 'images/icons/desktop/microsoft-crosswords',
				link: 'https://cdn.zone.msn.com/assets/games/microsoftultimatewordgames/2019/20190821T095404_1.0.5_features_2019_NameChangeToWordTwister_f7862a8_msn/word-games/game.html?game=crossword&hostingEnvironment=zone',
				credits: 'Website: <a href="https://zone.msn.com/en/msultimateword/default.htm" target="_blank">zone.msn.com/en/msultimateword</a>',
				width: 960,
				height: 552,
				shortcut: true
			} , {
				name: 'Cookie Clicker',
				title: 'External Website',
				icon: 'images/icons/desktop/cookie-clicker',
				link: root + '/emupedia-game-cookie-clicker/',
				credits: 'Author(s): <a href="https://orteil.dashnet.org/" target="_blank">Orteil</a> &amp; <a href="https://orteil.dashnet.org/" target="_blank">Opti</a><br />Website: <a href="https://orteil.dashnet.org/cookieclicker/" target="_blank">orteil.dashnet.org/cookieclicker</a>',
				width: 1090,
				height: 600,
				shortcut: true
			} , {
				name: 'Flappy Bird',
				title: 'External Website',
				icon: 'images/icons/desktop/flappy-bird',
				link: root + '/emupedia-game-flappy-bird/',
				credits: 'Website: <a href="https://playcanv.as/p/2OlkUaxF/" target="_blank">playcanvas.com</a><br /><br />Original project<hr />Website: <a href="https://www.dotgears.com/apps/app_flappy.html" target="_blank">dotgears.com</a><br />Copyright: .GEARS' + self.disclaimer,
				width: 432,
				height: 600,
				shortcut: true
			} , {
				name: 'Geometry Dash',
				title: 'External Website',
				icon: 'images/icons/desktop/geometry-dash',
				link: root + '/emupedia-game-geometry-dash/',
				credits: 'Website: <a href="https://scratch.mit.edu/search/projects?q=Geometry+Dash" target="_blank">scratch.mit.edu</a><br /><br />Original project<hr />Website: <a href="http://www.robtopgames.com" target="_blank">robtopgames.com</a><br />Copyright: RobTop Games' + self.disclaimer,
				width: 480,
				height: 392,
				shortcut: true
				// beta: true
			} , {
				name: 'agar.io',
				title: 'External Website',
				icon: 'images/icons/desktop/agar.io',
				link: 'https://agasio.herokuapp.com/',
				credits: 'Website: <a href="https://agasio.herokuapp.com" target="_blank">agasio.herokuapp.com</a><br /><br />Original project<hr />Website: <a href="https://agar.io" target="_blank">agar.io</a><br />Copyright: Miniclip' + self.disclaimer,
				width: 900,
				height: 600,
				shortcut: true
				// beta: true
			} , {
				name: 'Raptor',
				title: 'Under Development',
				icon: 'images/icons/desktop/raptor',
				link: root + '/emupedia-game-raptor/',
				credits: 'Author: <a href="https://github.com/robgietema" target="_blank">github.com/robgietema</a><br />Repository: <a href="https://github.com/robgietema/raptor" target="_blank">github.com/robgietema/raptor</a><br />License: not specified<br /><br />All other assets<hr />Copyright Apogee Software' + self.disclaimer_abandoned,
				width: 640,
				height: 400
				// prototype: true
			} , {
				name: 'Wings 2.0',
				title: 'Under Development',
				icon: 'images/icons/desktop/wings2',
				link: root + '/emupedia-game-wings2/',
				credits: 'Author: <a href="https://github.com/ZaDarkSide" target="_blank">github.com/ZaDarkSide</a><br />License: 😁 Permission granted from the author(s) 👍',
				width: 900,
				height: 480
				// prototype: true
			} , {
				name: 'Worms 2',
				title: 'Under Development',
				icon: 'images/icons/desktop/worms2',
				link: root + '/emupedia-game-worms2/',
				credits: 'Author: <a href="https://github.com/SFera" target="_blank">github.com/SFera</a><br />License: 😁 Permission granted from the author(s) 👍<br /><br />All other assets<hr />Copyright Team17' + self.disclaimer_abandoned,
				width: 900,
				height: 480
				// prototype: true
			} , {
				name: 'Biolab Disaster',
				icon: 'images/icons/desktop/biolab-disaster',
				link: root + '/emupedia-game-biolab-disaster/',
				credits: 'Author: <a href="https://github.com/phoboslab" target="_blank">github.com/phoboslab</a><br />Website: <a href="https://playbiolab.com" target="_blank">playbiolab.com</a><br />License: 😁 Permission granted from the author(s) 👍',
				width: 720,
				height: 480
			} , {
				name: 'Super Blob Blaster',
				icon: 'images/icons/desktop/super-blob-blaster',
				link: root + '/emupedia-game-super-blob-blaster/',
				credits: 'Author: <a href="https://github.com/phoboslab" target="_blank">github.com/phoboslab</a><br />Repository: <a href="https://github.com/phoboslab/twopointfive" target="_blank">github.com/phoboslab/twopointfive</a><br />License: <a href="https://github.com/phoboslab/TwoPointFive/blob/master/LICENSE" target="_blank">MIT</a>',
				width: 720,
				height: 480
			} , {
				name: 'Pac-Man',
				icon: 'images/icons/desktop/pac-man',
				link: root + '/emupedia-game-pac-man/',
				credits: 'Author: <a href="https://github.com/luciopanepinto" target="_blank">github.com/luciopanepinto</a><br />Repository: <a href="https://github.com/luciopanepinto/pacman" target="_blank">github.com/luciopanepinto/pacman</a><br />License: <a href="https://github.com/luciopanepinto/pacman/blob/master/LICENSE" target="_blank">GPLv3</a>',
				width: 1025,
				height: 715
			} , {
				name: 'Clippy',
				icon: 'images/icons/desktop/clippy'
			} , {
				name: 'eSheep',
				icon: 'images/icons/desktop/esheep'
			} , {
				name: 'SkiFree',
				icon: 'images/icons/desktop/skifree',
				link: root + '/emupedia-game-skifree/',
				credits: 'Author: <a href="https://github.com/basicallydan" target="_blank">github.com/basicallydan</a><br />Repository: <a href="https://github.com/basicallydan/skifree.js" target="_blank">github.com/basicallydan/skifree.js</a><br />License: <a href="https://github.com/basicallydan/skifree.js/blob/master/license.md" target="_blank">MIT</a><br /><br />All other assets<hr />Copyright <a href="http://ski.ihoc.net/" target="_blank">Chris Pirih</a>' + self.disclaimer_abandoned,
				width: 640,
				height: 480
			} , {
				name: 'ASCIICKER',
				title: 'Under Development',
				icon: 'images/icons/desktop/asciicker',
				link: root + '/emupedia-demo-asciicker/',
				credits: 'Author: <a href="https://github.com/msokalski" target="_blank">github.com/msokalski</a><br />Website: <a href="http://asciicker.com" target="_blank">asciicker.com</a><br />License: 😁 Permission granted from the author(s) 👍',
				width: 640,
				height: 480
				// demo: true
			} , {
				name: 'ASCII PATROL',
				icon: 'images/icons/desktop/ascii-patrol',
				link: root + '/emupedia-game-ascii-patrol/',
				credits: 'Author: <a href="https://github.com/msokalski" target="_blank">github.com/msokalski</a><br />Repository: <a href="https://github.com/msokalski/ascii-patrol" target="_blank">github.com/msokalski/ascii-patrol</a><br />License: <a href="https://github.com/msokalski/ascii-patrol/blob/master/LICENSE" target="_blank">GPLv3</a><br />Additional license: 😁 Permission granted from the author(s) 👍',
				width: 900,
				height: 480
			} , {
				name: '3D Spatial Audio',
				icon: 'images/icons/desktop/joystick',
				link: root + '/emupedia-demo-3d-spatial-audio/',
				credits: 'Author: <a href="https://github.com/goldfire" target="_blank">github.com/goldfire</a><br />Repository: <a href="https://github.com/goldfire/howler.js/tree/master/examples/3d" target="_blank">github.com/goldfire/howler.js</a><br />License: <a href="https://github.com/goldfire/howler.js/blob/master/LICENSE.md" target="_blank">MIT</a>',
				width: 900,
				height: 480
				// demo: true
			} , {
				name: 'Voxel Space',
				icon: 'images/icons/desktop/joystick',
				link: root + '/emupedia-demo-voxel-space/',
				credits: 'Author: <a href="https://github.com/s-macke" target="_blank">github.com/s-macke</a><br />Repository: <a href="https://github.com/s-macke/VoxelSpace" target="_blank">github.com/s-macke/VoxelSpace</a><br />License: <a href="https://github.com/s-macke/VoxelSpace/blob/master/LICENSE" target="_blank">MIT</a><br /><br />All other assets<hr />Copyright THQ Nordic (formerly NovaLogic)',
				width: 900,
				height: 480
				// demo: true
			} , {
				name: '8-bit Palette Color Cycling',
				icon: 'images/icons/desktop/joystick',
				link: root + '/emupedia-app-8-bit-palette-color-cycling/',
				credits: 'Author: <a href="https://github.com/jhuckaby" target="_blank">github.com/jhuckaby</a><br />Source Code: <a href="http://effectgames.com/effect/article-Old_School_Color_Cycling_with_HTML5.html#_section_1_6" target="_blank">effectgames.com</a><br />License: <a href="http://effectgames.com/effect/article-Old_School_Color_Cycling_with_HTML5.html#_section_1_6" target="_blank">LGPLv3</a><br /><br />All other assets<hr />Copyright <a href="http://www.markferrari.com/" target="_blank">Mark J. Ferrari</a>',
				width: 900,
				height: 550
				// demo: true
			} , {
				name: 'RomCenter',
				title: 'Under Development',
				icon: 'images/icons/desktop/romcenter',
				link: root + '/emupedia-app-romcenter/',
				credits: 'HTML5 Port<hr />Author: Emupedia<br /><br />Original project<hr />Author: Eric Bole-Feysot<br />Website: <a href="https://www.romcenter.com" target="_blank">romcenter.com</a>',
				width: 900,
				height: 480
				// prototype: true
			} , {
				name: 'DOSBox',
				title: 'Under Development',
				icon: 'images/icons/desktop/dosbox',
				link: root + '/emupedia-app-dosbox/',
				credits: 'JS-DOS<hr />Author: <a href="https://github.com/caiiiycuk" target="_blank">github.com/caiiiycuk</a><br />Repository: <a href="https://github.com/caiiiycuk/js-dos" target="_blank">github.com/caiiiycuk/js-dos</a><br />License: <a href="https://github.com/db48x/emularity/blob/master/LICENSE" target="_blank">GPLv3</a><br /><br />Emularity<hr />Author: <a href="https://github.com/db48x" target="_blank">github.com/db48x</a><br />Repository: <a href="https://github.com/db48x/emularity" target="_blank">github.com/db48x/emularity</a><br />License: <a href="https://github.com/db48x/emularity/blob/master/LICENSE" target="_blank">GPLv3</a><br /><br />HTML5 Port<hr />Author: <a href="https://github.com/dreamlayers" target="_blank">github.com/dreamlayers</a><br />Repository: <a href="https://github.com/dreamlayers/em-dosbox" target="_blank">github.com/dreamlayers/em-dosbox</a><br />License: <a href="https://github.com/dreamlayers/em-dosbox/blob/em-dosbox-svn-sdl2/COPYING" target="_blank">GPLv2</a><br /><br />Original Project<hr />Author(s): <a href="https://sourceforge.net/projects/dosbox" target="_blank">sourceforge.net/projects/dosbox</a><br />Repository: <a href="https://sourceforge.net/p/dosbox/code-0/HEAD/tree" target="_blank">sourceforge.net/p/dosbox</a><br />License: <a href="https://sourceforge.net/projects/dosbox" target="_blank">GPLv2</a>',
				width: 640,
				height: 422
			} , {
				name: 'Street Fighter Alpha',
				altname: 'Street Fighter Alpha: Warriors\' Dreams',
				title: 'Under Development',
				icon: 'images/icons/desktop/street-fighter/' + function() {
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
				}(),
				link: root + '/emupedia-game-street-fighter-alpha/',
				credits: 'Author: <a href="https://github.com/gamedev8" target="_blank">github.com/gamedev8</a><br />Repository: <a href="https://github.com/gamedev8/js-sfa" target="_blank">github.com/gamedev8/js-sfa</a><br />License: not specified<br /><br />All other assets<hr />Copyright Capcom' + self.disclaimer_abandoned,
				width: 1068,
				height: 576
				// demo: true
			} , {
				name: 'Wolfenstein 3D',
				icon: 'images/icons/desktop/wolfenstein-3d',
				link: root + ($sys.feature['CANVAS'] ? '/emupedia-game-wolfenstein-3d-canvas' : '/emupedia-game-wolfenstein-3d') + '/',
				credits: 'HTML5 Port<hr />Author: <a href="https://github.com/lazarv" target="_blank">github.com/lazarv</a><br />License: <a href="http://users.atw.hu/wolf3d/COPYING.txt" target="_blank">GPLv2</a><br /><br />HTML Port<hr />Author: <a href="https://github.com/id-Software" target="_blank">github.com/id-Software</a><br />Repository: <a href="https://github.com/id-Software/wolf3d-browser" target="_blank">github.com/id-Software/wolf3d-browser</a><br />License: <a href="https://github.com/id-Software/wolf3d-browser/blob/master/COPYING.txt" target="_blank">GPLv2</a><br /><br />All other assets<hr />Copyright Bethesda Softworks (formerly id Software)' + self.disclaimer_abandoned,
				width: $sys.feature['CANVAS'] ? 960 : 640,
				height: $sys.feature['CANVAS'] ? 600 : 400
			} , {
				name: 'Doom 1',
				icon: 'images/icons/desktop/doom1',
				link: root + '/emupedia-game-doom1/' + ($sys.feature['WEBASSEMBLY'] ? '/' : 'asmjs/'),
				credits: 'Author: <a href="https://github.com/lazarv" target="_blank">github.com/lazarv</a><br />Repository: <a href="https://github.com/lazarv/wasm-doom" target="_blank">github.com/lazarv/wasm-doom</a><br />License: <a href="https://github.com/lazarv/wasm-doom/blob/master/COPYING.md" target="_blank">GPLv2</a><br /><br />All other assets<hr />Copyright Bethesda Softworks (formerly id Software)' + self.disclaimer_abandoned,
				width: 640,
				height: 400
			} , {
				name: 'Doom 2: Hell on Earth',
				icon: 'images/icons/desktop/doom2',
				link: root + '/emupedia-game-doom2/' + ($sys.feature['WEBASSEMBLY'] ? '/' : 'asmjs/'),
				credits: 'Author: <a href="https://github.com/lazarv" target="_blank">github.com/lazarv</a><br />Repository: <a href="https://github.com/lazarv/wasm-doom" target="_blank">github.com/lazarv/wasm-doom</a><br />License: <a href="https://github.com/lazarv/wasm-doom/blob/master/COPYING.md" target="_blank">GPLv2</a><br /><br />All other assets<hr />Copyright Bethesda Softworks (formerly id Software)' + self.disclaimer_abandoned,
				width: 640,
				height: 400
			} , {
				name: 'Doom 3',
				icon: 'images/icons/desktop/doom3',
				link: root + '/emupedia-game-doom3/index.html',
				credits: 'Author: <a href="https://github.com/gabrielcuvillier" target="_blank">github.com/gabrielcuvillier</a><br />Repository: <a href="https://github.com/gabrielcuvillier/d3wasm" target="_blank">github.com/gabrielcuvillier/d3wasm</a><br />License: <a href="https://github.com/gabrielcuvillier/d3wasm/blob/master/COPYING.txt" target="_blank">GPLv3</a><br /><br />All other assets<hr />Copyright Bethesda Softworks (formerly id Software)' + self.disclaimer,
				width: 640,
				height: 480
			} , {
				name: 'Quake 1',
				icon: 'images/icons/desktop/quake1',
				link: root + '/emupedia-game-quake1/' + ($sys.feature['ES6'] && $sys.feature['ES7_ASYNC_AWAIT'] ? 'async.html' : 'index.html'),
				credits: 'Author: <a href="https://github.com/triang3l" target="_blank">github.com/triang3l</a><br />Repository: <a href="https://github.com/triang3l/webquake" target="_blank">github.com/triang3l/webquake</a><br />License: <a href="https://github.com/triang3l/webquake/blob/master/GNU.md" target="_blank">GPLv2</a><br /><br />All other assets<hr />Copyright Bethesda Softworks (formerly id Software)' + self.disclaimer_abandoned,
				width: 640,
				height: 480
			} , {
				name: 'Quake 2',
				icon: 'images/icons/desktop/quake2',
				link: root + '/emupedia-game-quake2/',
				credits: 'HTML5 Port<hr />Author: <a href="https://github.com/stefanhaustein" target="_blank">github.com/stefanhaustein</a><br />Repository: <a href="https://github.com/stefanhaustein/quake2-playn-port" target="_blank">github.com/stefanhaustein/quake2-playn-port</a><br />License: <a href="https://github.com/id-Software/Quake-2/blob/master/gnu.txt" target="_blank">GPLv2</a><br /><br />Game Engine<hr />Author(s): <a href="https://sourceforge.net/projects/jake2" target="_blank">sourceforge.net/projects/jake2</a><br />Repository: <a href="https://sourceforge.net/p/jake2/git/ci/master/tree/" target="_blank">https://sourceforge.net/p/jake2</a><br />License: <a href="https://github.com/id-Software/Quake-2/blob/master/gnu.txt" target="_blank">GPLv2</a><br /><br />All other assets<hr />Copyright Bethesda Softworks (formerly id Software)' + self.disclaimer_abandoned,
				width: 640,
				height: 480
			} , {
				name: 'Half-Life 1',
				title: 'Under Development',
				icon: 'images/icons/desktop/half-life1',
				link: root + '/emupedia-game-half-life1/',
				credits: 'Author(s): <a href="https://github.com/FWGS" target="_blank">github.com/FWGS</a><br />Repository: <a href="https://github.com/FWGS/xash3d" target="_blank">github.com/FWGS/xash3d</a><br />License: <a href="https://github.com/FWGS/xash3d/blob/master/COPYING" target="_blank">GPLv3</a><br /><br />All other assets<hr />Copyright Valve Software (formerly Sierra Studios)' + self.disclaimer_abandoned,
				width: 640,
				height: 480
			} , {
				name: 'Diablo 1',
				title: 'Under Development',
				icon: 'images/icons/desktop/diablo1',
				link: root + '/emupedia-game-diablo1/',
				credits: 'HTML5 Port<hr />Author: <a href="https://github.com/d07RiV" target="_blank">github.com/d07RiV</a><br />Repository: <a href="https://github.com/d07RiV/diabloweb" target="_blank">github.com/d07RiV/diabloweb</a><br />License: not specified<br /><br />Game Engine<hr />Author(s): <a href="https://github.com/diasurgical/devilution#credits" target="_blank">github.com/diasurgical/devilution#credits</a><br />Repository: <a href="https://github.com/diasurgical/devilution" target="_blank">github.com/diasurgical/devilution</a><br />License: <a href="https://github.com/diasurgical/devilution/blob/master/LICENSE" target="_blank">Public domain</a><br /><br />All other assets<hr />Copyright Activision Blizzard (formerly Blizzard Entertainment)' + self.disclaimer_abandoned,
				width: 640,
				height: 480
			} , {
				name: 'Dark Reign: The Future of War',
				title: 'Under Development',
				icon: 'images/icons/desktop/dark-reign',
				link: root + '/emupedia-game-dark-reign/',
				credits: 'Author: <a href="https://github.com/qmegas" target="_blank">github.com/qmegas</a><br />Repository: <a href="https://github.com/qmegas/Dark-Reign---HTML5-Version" target="_blank">github.com/qmegas/Dark-Reign---HTML5-Version</a><br />License: <a href="https://github.com/qmegas/Dark-Reign---HTML5-Version/blob/master/README.md#license" target="_blank">MIT</a><br /><br />All other assets<hr />Copyright Activision Blizzard (formerly Activision) and<br />N3V Games (formerly Auran Development)' + self.disclaimer_abandoned,
				width: 640,
				height: 480
			} , {
				name: 'Command and Conquer 1',
				title: 'Under Development',
				icon: 'images/icons/desktop/command-and-conquer1',
				link: root + '/emupedia-game-command-and-conquer1/',
				credits: 'Author: <a href="https://github.com/adityaravishankar" target="_blank">github.com/adityaravishankar</a><br />Repository: <a href="https://github.com/adityaravishankar/command-and-conquer" target="_blank">github.com/adityaravishankar/command-and-conquer</a><br />License: not specified<br /><br />All other assets<hr />Copyright Electronic Arts (formerly Westwood Studios)' + self.disclaimer_abandoned,
				width: 640,
				height: 535
			} , {
				name: 'Command and Conquer: Red Alert 2',
				title: 'Under Development',
				icon: 'images/icons/desktop/red-alert2',
				link: root + '/emupedia-game-ra2/',
				credits: 'Author: Võ Thành Đạt<br />License: not specified<br /><br />All other assets<hr />Copyright Electronic Arts (formerly Westwood Studios)' + self.disclaimer,
				width: 900,
				height: 550
			} , {
				name: 'Minecraft',
				title: 'Under Development',
				icon: 'images/icons/desktop/minecraft-classic',
				link: root + '/emupedia-game-minecraft-classic/',
				credits: 'Author: <a href="https://github.com/andyhall" target="_blank">github.com/andyhall</a><br />Repository: <a href="https://github.com/andyhall/noa" target="_blank">github.com/andyhall/noa</a><br />License: <a href="https://github.com/andyhall/noa/blob/master/LICENSE.txt" target="_blank">MIT</a><br /><br />All other assets<hr />Copyright Microsoft (formerly Mojang)' + self.disclaimer,
				width: 900,
				height: 480
			} , {
				name: 'Winamp',
				icon: 'images/icons/desktop/winamp-classic',
				link: root + '/emupedia-app-winamp/',
				credits: 'Author: <a href="https://github.com/captbaritone" target="_blank">github.com/captbaritone</a><br />Repository: <a href="https://github.com/captbaritone/webamp" target="_blank">github.com/captbaritone/webamp</a><br />License: <a href="https://github.com/captbaritone/webamp/blob/master/LICENSE.txt" target="_blank">MIT</a><br />Additional license: 😁 Permission granted from the author(s) 👍<br /><br />All other assets<hr />Copyright AudioValley (formerly Nullsoft)' + self.disclaimer,
				width: 275,
				height: 354,
				top: 'calc(50% - 165.5px)',
				left: 'calc(50% - 174px)',
				widget: false
			} , {
				name: 'Notepad',
				icon: 'images/icons/desktop/notepad',
				link: root + '/emupedia-app-notepad/',
				credits: 'Author: <a href="https://github.com/1j01" target="_blank">github.com/1j01</a><br />Repository: <a href="https://github.com/1j01/98/tree/master/programs/notepad" target="_blank">github.com/1j01/98</a><br />License: not specified<br />Additional license: 😁 Permission granted from the author(s) 👍<br /><br />All other assets<hr />Copyright Microsoft' + self.disclaimer,
				width: 900,
				height: 480,
				runonce: true
			} , {
				name: 'Paint',
				icon: 'images/icons/desktop/paint',
				link: root + '/emupedia-app-paint/',
				credits: 'Author: <a href="https://github.com/1j01" target="_blank">github.com/1j01</a><br />Repository: <a href="https://github.com/1j01/jspaint" target="_blank">github.com/1j01/jspaint</a><br />License: not specified<br />Additional license: 😁 Permission granted from the author(s) 👍<br /><br />All other assets<hr />Copyright Microsoft' + self.disclaimer,
				width: 900,
				height: 480
			} , {
				name: 'SVG Editor',
				icon: 'images/icons/desktop/svg-editor',
				link: root + '/emupedia-app-svg-editor/',
				credits: 'Author: <a href="https://github.com/methodofaction" target="_blank">github.com/methodofaction</a><br />Repository: <a href="https://github.com/methodofaction/Method-Draw" target="_blank">github.com/methodofaction/Method-Draw</a><br />License: <a href="https://github.com/methodofaction/Method-Draw/blob/master/LICENSE" target="_blank">MIT</a><br /><br />Original Project<hr />Author: <a href="https://github.com/SVG-Edit" target="_blank">github.com/SVG-Edit</a><br />Repository: <a href="https://github.com/SVG-Edit/svgedit" target="_blank">github.com/SVG-Edit/svgedit</a><br />License: <a href="https://github.com/SVG-Edit/svgedit/blob/master/LICENSE-MIT.txt" target="_blank">MIT</a>',
				width: 900,
				height: 480
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
			var href = typeof icon_options['target'] !== 'undefined' ? ' href="' + icon_options['link'] + '" target="' + icon_options['target'] + '" ' : ' href="javascript:" ';

			// noinspection JSUnfilteredForInLoop
			var $icon = $('<a class="emuos-desktop-icon"'+ href + (icon_options['title'] ? 'data-title="' + icon_options['title'] + '"' : '') + '>' +
							'<i class="icon overlay ribbon' + (icon_options['shortcut'] ? ' shortcut' : '') + (icon_options['prototype'] ? ' prototype' : '') + (icon_options['beta'] ? ' beta' : '') + (icon_options['new'] ? ' new' : '') + '" style="background-image: url(' + icon_options['icon'] + ($sys.browser.isIE ? '.png' : '.ico') + ');"></i>' +
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
			if (typeof icon_options['target'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.data('target', icon_options['target']);
			}

			// noinspection JSUnfilteredForInLoop
			if (typeof icon_options['credits'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.data('credits', icon_options['credits']);
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
			if (typeof icon_options['top'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.data('top', icon_options['top']);
			}

			// noinspection JSUnfilteredForInLoop
			if (typeof icon_options['left'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.data('left', icon_options['left']);
			}

			// noinspection JSUnfilteredForInLoop
			if (typeof icon_options['right'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.data('right', icon_options['right']);
			}

			// noinspection JSUnfilteredForInLoop
			if (typeof icon_options['bottom'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.data('bottom', icon_options['bottom']);
			}

			// noinspection JSUnfilteredForInLoop
			if (typeof icon_options['widget'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.attr('data-widget', icon_options['widget'] ? 'true' : 'false').data('widget', icon_options['widget']);
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
				if (typeof $(this).data('target') === 'undefined') {
					e.preventDefault();
				}
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
								credits: $(this).data('credits'),
								icon: $(this).data('icon'),
								src: $(this).data('link'),
								width: $(this).data('width'),
								height: $(this).data('height')
							});
						}
					} else if ($(this).data('widget')) {
						// noinspection JSUnfilteredForInLoop,JSReferencingMutableVariableFromClosure
						self.widget({
							title: $(this).data('name'),
							icon: $(this).data('icon'),
							content: '<iframe id="' + $(this).data('name') + '" width="100%" height="100%" src="' + $(this).data('link') + '" onload="this.focus();this.contentWindow.focus();" frameborder="0" allowFullscreen="true" allowTransparency="true" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe>',
							width: $(this).data('width'),
							height: $(this).data('height'),
							top: $(this).data('top'),
							left: $(this).data('left'),
							right: $(this).data('right'),
							bottom: $(this).data('bottom')
						});
					} else {
						// noinspection JSUnfilteredForInLoop,JSReferencingMutableVariableFromClosure
						self.iframe({
							title: $(this).data('name'),
							icon: $(this).data('icon'),
							src: $(this).data('link'),
							width: $(this).data('width'),
							height: $(this).data('height'),
							credits: $(this).data('credits')
						});
					}
				} else {
					switch ($(this).data('name')) {
						case 'eSheep':
							if (typeof eSheep !== 'undefined') {
								if (typeof eSheep.prototype.Start === 'function') {
									var pets = ['esheep64', 'green_sheep', 'neko', 'pingus', 'ssj-goku'];
									var pet = pets[~~(Math.random() * pets.length)];
									var path = root + '/emupedia-app-esheep/pets/' + pet + '/animations.xml';

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
									}, undefined, root + '/emupedia-app-clippy/agents/');
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
			right: '0px',
			bottom: '28px',
			content: '<iframe id="Chat" width="100%" height="100%" src="' + root + '/emupedia-app-emuchat/index.html" frameborder="0" allowFullscreen="allowFullscreen" allowTransparency="true" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe>'
		});

		self.$html.contextmenu({
			delegate: '.emuos-desktop, .emuos-taskbar',
			menu: [{
				title: 'Refresh',
				cmd: 'refresh',
				uiIcon: 'ui-icon-refresh'
			} , {
				title: '----'
			} , {
				title: 'Themes',
				children: [{
					title: 'Basic',
					cmd: 'basic'
				} , {
					title: 'Windows 3.1',
					cmd: 'windows-3x'
				} , {
					title: 'Windows 95',
					cmd: 'windows-95'
				} , {
					title: 'Windows ME',
					cmd: 'windows-me'
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
					case 'windows-3x':
						self.$html.removeClass('theme-basic theme-win9x').addClass('theme-win3x');
						self.$body.attr('class', '');
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
					case 'windows-95':
						self.$html.removeClass('theme-basic theme-win3x').addClass('theme-win9x');
						self.$body.attr('class', 'windows-95');
						// noinspection JSJQueryEfficiency
						if (typeof $('.emuos-window .window.emuos-window-content').mCustomScrollbar === 'function') {
							$('.emuos-window .window.emuos-window-content').mCustomScrollbar('destroy');
						}
						self.$taskbar.taskbar('option', 'resizableHandleOffset', 1).taskbar('instance')._refresh();
						break;
					case 'windows-me':
						self.$html.removeClass('theme-basic theme-win3x').addClass('theme-win9x');
						self.$body.attr('class', 'windows-me');
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
		var position	= (top !== null ? 'top: ' + top + '; ' : '') + (left !== null ? 'left: ' + left + '; ' : '') + (right !== null ? 'right: ' + right + '; ' : '') + (bottom !== null ? 'bottom: ' + bottom + '; ' : '');

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
				main: self.$html.hasClass('theme-basic') || self.$html.hasClass('theme-win9x') ? (icon !== '' ? icon + ($sys.browser.isIE ? '.png' : '.ico') : null) : ''
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

		var title		= typeof options.title		!== 'undefined' ? options.title		: '';
		var icon		= typeof options.icon		!== 'undefined' ? options.icon		: '';
		var src			= typeof options.src		!== 'undefined' ? options.src		: '';
		var width		= typeof options.width		!== 'undefined' ? options.width		: 640;
		var height		= typeof options.height		!== 'undefined' ? options.height	: 400;
		var credits		= typeof options.credits	!== 'undefined' ? options.credits	: '';
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
			help: credits,
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
				main: this.$html.hasClass('theme-basic') || this.$html.hasClass('theme-win9x') ? (icon !== '' ? icon + ($sys.browser.isIE ? '.png' : '.ico') : null) : ''
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