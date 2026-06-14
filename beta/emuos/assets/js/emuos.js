// noinspection DuplicatedCode,JSDeprecatedSymbols

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'router', 'toastr', 'optional!simplestorage', 'optional!moment-timezone', 'optional!octokat', 'optional!esheep', 'optional!clippy', 'optional!fireworks'], factory);
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
} (function ($, Router, toastr, simplestorage, moment, Octokat, eSheep, clippy, Fireworks) {
	var root = location.hostname === 'localhost' ? 'https://emupedia.net' : '';
	var hash = location.hash.toString();
	var resizeTimeout = null;
	var versionCheckInterval = null;
	var messageBoxChordAudio = null;
	var $window = $(window);

	if (typeof $.fn.hasScrollBar === 'undefined') {
		$.fn.hasScrollBar = function() {
			var el = this.get(0);

			if (el) {
				return el.scrollHeight > this.height();
			}

			return false;
		}
	}

	$window.off('resize').on('resize', function() {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function() {
			if ($('.desktop.emuos-desktop ').first().hasScrollBar()) {
				$('html').addClass('has-scrollbar');
			} else {
				$('html').removeClass('has-scrollbar');
			}
		}, 100);
	})

	$window.trigger('resize');

	toastr.target = '.emuos-taskbar-windows-containment';
	toastr.options.escapeHtml = true;
	toastr.options.closeButton = true;
	toastr.options.preventDuplicates = true;
	toastr.options.newestOnTop = true;
	toastr.options.timeOut = 0;
	toastr.options.extendedTimeOut = 0;
	toastr.options.showMethod = 'slideDown';

	// noinspection JSUnusedAssignment
	clearInterval(versionCheckInterval);
	// noinspection JSUnusedAssignment
	versionCheckInterval = setInterval(function() {
		$sys.api.fetch('https://api.github.com/repos/Emupedia/emupedia.github.io/commits/master', function(data) {
			try {
				// noinspection JSUnresolvedVariable
				data = JSON.parse(data.target.response);
			} catch(error) {
				console.log(error)
			}

			// noinspection JSUnresolvedVariable
			if (typeof data.sha !== 'undefined' && typeof $sys.version !== 'undefined') {
				// noinspection JSUnresolvedVariable
				if (data.sha !== null && $sys.version !== null) {
					// noinspection JSUnresolvedVariable
					if (data.sha !== '' && $sys.version !== '' && $sys.version !== '{{ site.github.build_revision }}') {
						// noinspection JSUnresolvedVariable
						if (data.sha !== $sys.version) {
							toastr.options.onclick = function() {
								location.reload();
							};
							toastr.info('New update available, click here to reload');
							toastr.options.onclick = function() {};
						}
					}
				}
			}
		});
	}, 5 * 60 * 1000);

	function copyToClipboard(text, el) {
		if ('clipboard' in navigator) {
			// noinspection JSIgnoredPromiseFromCall
			navigator.clipboard.writeText(text);
		} else {
			var element = document.createElement('input');

			element.type = 'text';
			element.disabled = true;

			element.style.setProperty('position', 'fixed');
			element.style.setProperty('z-index', '-100');
			element.style.setProperty('pointer-events', 'none');
			element.style.setProperty('opacity', '0');

			element.value = text;

			document.body.appendChild(element);

			element.click();
			element.select();
			document.execCommand('copy');

			document.body.removeChild(element);
		}

		if (el) {
			var message = $('<span>Copied to Clipboard!</span>')

			$(el).after(message)

			message.fadeOut(1000, function() {
				$(this).remove();
			});
		}
	}

	window.copyToClipboard = copyToClipboard;

	function youtubeEmbedUrl(src) {
		if (typeof src !== 'string') {
			return src;
		}

		var match = src.match(/(?:youtube\.com\/embed\/|youtube-nocookie\.com\/embed\/)([A-Za-z0-9_-]+)/);

		if (!match) {
			return src;
		}

		return 'https://www.youtube-nocookie.com/embed/' + match[1] + '?autoplay=1&rel=0&modestbranding=1';
	}

	function isYoutubeEmbed(src) {
		return typeof src === 'string' && /youtube(-nocookie)?\.com\/embed\//.test(src);
	}

	function getEaster(year) {

		year = parseInt(year);

		var f = Math.floor;
		var jDay = 0;
		var jMonth = 0;
		var oDay = 0;
		var oMonth = 0;
		var wDay = 0;
		var wMonth = 0;

		function EasterJulian() {
			// noinspection JSUnusedAssignment
			var g = 0;
			// noinspection JSUnusedAssignment
			var i = 0;
			// noinspection JSUnusedAssignment
			var j = 0;
			// noinspection JSUnusedAssignment
			var p = 0;

			g = year % 19;
			i = (19 * g + 15) % 30;
			j = (year + f(year / 4) + i) % 7;
			p = i - j;

			jMonth = 3 + f((p + 40) / 44);
			jDay = p + 28 - 31 * f(jMonth / 4);
		}

		function EasterGregorian() {
			// noinspection JSUnusedAssignment
			var g = 0;
			// noinspection JSUnusedAssignment
			var c = 0;
			// noinspection JSUnusedAssignment
			var h = 0;
			// noinspection JSUnusedAssignment
			var i = 0;
			// noinspection JSUnusedAssignment
			var j = 0;
			// noinspection JSUnusedAssignment
			var p = 0;

			g = year % 19;
			c = f(year / 100);
			h = (c - f(c / 4) - f(8 * c + 13 / 25) + 19 * g + 15) % 30;
			i = h - f(h / 28) * (1 - f(h / 28) * f(29 / h + 1) * f(21 - g / 11));
			j = (year + f(year / 4) + i + 2 - c + f(c / 4)) % 7;
			p = i - j;

			wMonth = 3 + f((p + 40) / 44);
			wDay = p + 28 - 31 * f(wMonth / 4);
		}

		function EasterOrthodox () {
			var extra = 0;
			var tmp = 0;

			oDay = 0;
			oMonth = 0;

			if ((year > 1582) && (year <= 4099)) {
				extra = 10;

				if (year > 1600) {
					tmp = f(year / 100) - 16;
					extra = extra + tmp - f(tmp / 4);
				}

				oDay = jDay + extra;
				oMonth = jMonth;

				if ((oMonth === 3) && (oDay > 31)) {
					oMonth = 4;
					oDay = oDay - 31;
				}

				if ((oMonth === 4) && (oDay > 30)) {
					oMonth = 5;
					oDay = oDay - 30;
				}
			}
		}

		EasterJulian()
		EasterGregorian()
		EasterOrthodox()

		return {
			julian: {
				month: jMonth || -1,
				day: jDay || -1
			},
			gregorian: {
				month: wMonth || -1,
				day: wDay || -1
			},
			orthodox: {
				month: oMonth || -1,
				day: oDay || -1
			}
		}
	}

	var EmuOS = function (options) {
		var self = this;

		// noinspection JSUnusedGlobalSymbols
		self.$document	= $(document);
		self.$window	= $(window);
		self.$html		= $('html');
		self.$body		= $('body');

		self.disclaimer = '<br /><br />Disclaimer<hr />This software does not represent in anyway the original product, it only represents an attempt to recreate the original look &amp; feel of the product using modern web technologies for educational and digital archiving purposes.<br /><br />If you own the copyrights to a title and would like to request removal please note that we process all correct and complete removal requests within 5 working days. You may send an email to dmca [at] emupedia.net for all DMCA Takedown notices / Removal Requests.<br /><br />The author(s) and/or any of it\'s maintainers are in no way associated with or endorsed by the copyright holders.';
		self.disclaimer_abandoned = '<br /><br />Disclaimer<hr />This software does not represent in anyway the original product, it only represents an attempt to recreate the original look &amp; feel of the product using modern web technologies for educational and digital archiving purposes, because the original product no longer works on modern computer hardware without modifications.<br /><br />Through the Library of Congress, some key <a target="_blank" href="https://www.copyright.gov/1201/docs/librarian_statement_01.html">exemptions</a> to the DMCA have been granted to allow for video game preservation.<br /><br />If you own the copyrights to a title and would like to request removal please note that we process all correct and complete removal requests within 5 working days. You may send an email to dmca [at] emupedia.net for all DMCA Takedown notices / Removal Requests.<br /><br />The author(s) and/or any of it\'s maintainers are in no way associated with or endorsed by the copyright holders.';

		self.options = $.extend(true, {}, options);
		self._foldersByPath = {};
		self.useFolders = self._getUseFoldersSetting();
		self.desktopIconSize = self._getDesktopIconSizeSetting();
		self.desktopAutoArrange = self._getDesktopAutoArrangeSetting();
		self.desktopAlignGrid = self._getDesktopAlignGridSetting();
		self.desktopShowIcons = self._getDesktopShowIconsSetting();

		// noinspection FallThroughInSwitchStatementJS
		switch (self.options.theme) {
			case 'theme-basic':
				break;
			case 'theme-windows-3':
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
			case 'theme-windows-95':
			case 'theme-windows-98':
			case 'theme-windows-me':
				self.options.start = self._getWin9xStartMenuItems();
				break;
		}

		self.$html.removeClass('post boot');
		self.$body.find('.emuos-startup').first().remove();
		self.$body.find('.emuos-boot').first().remove();

		if ($sys.browser.isIE) {
			self.$html.addClass('browser-trident');
		} else if ($sys.browser.isEdgeHTML) {
			self.$html.addClass('browser-edgehtml');
		} else if ($sys.browser.isChrome || $sys.browser.isOperaBlink || $sys.browser.isEdgeBlink || $sys.browser.isChromium) {
			self.$html.addClass('browser-blink');
		} else if ($sys.browser.isSafari || $sys.browser.isOperaPresto) {
			self.$html.addClass('browser-webkit');
		} else if ($sys.browser.isFirefox || $sys.browser.isPaleMoon || $sys.browser.isKMeleon || $sys.browser.isNetscape) {
			self.$html.addClass('browser-gecko');
		} else {
			self.$html.addClass('browser-other');
		}

		var start = '';
		var domains = ['emupedia.net', 'emupedia.org', 'emupedia.games', 'emuos.net', 'emuos.org', 'emuos.games'];
		var frontend = ~domains.indexOf(window.location.hostname) ? 'https://emuchat.' + domains[domains.indexOf(window.location.hostname)] + '/' : 'https://emuchat.emupedia.net/';
		var chat = null;

		if (typeof self.options.start !== 'undefined') {
			start = self._buildStartMenuHtml();
		}

		self.$body.append('<div class="desktop" tabindex="0"></div><div class="taskbar">' + start + '</div>');

		self.$desktop = $('.desktop').first();
		self.$taskbar = $('.taskbar').first();
		self._applyStoredCustomWallpaper();
		self.frontend = frontend;
		self._enableTouchSingleTapOpen();

		var desktopIcons = self._getDesktopIcons(self.options.icons, self.useFolders);
		var renderDesktopIcons = function(iconList) {
			self.$desktop.find('a.emuos-desktop-icon').remove();
			self._foldersByPath = {};

			for (var j in iconList) {
			// noinspection JSUnfilteredForInLoop,JSDuplicatedDeclaration
			var icon_options = iconList[j];

			if (typeof icon_options['requires'] === 'object') {
				var reqs = Object.keys(icon_options['requires']);

				for (var req in reqs) {
					// noinspection JSUnfilteredForInLoop
					var required = reqs[req].toUpperCase();

					if (typeof $sys.feature[required] !== 'undefined') {
						if ($sys.feature[required] === true) {
							// noinspection JSUnfilteredForInLoop
							$.extend(true, icon_options, icon_options['requires'][reqs[req]]);
						}
					}
				}
			}

			if (typeof icon_options['credits'] !== 'undefined') {
				if (typeof icon_options['link'] !== 'undefined') {
					var share_link = '';
					var copy_link = '';

					if (icon_options['share'] === true) {
						if (~icon_options['link'].indexOf('http')) {
							share_link = location.origin.toString() + location.pathname.toString() + '#/' + icon_options['link'];
							copy_link = '<button type="button" onclick="copyToClipboard(\'' + share_link + '\', this)" class="ui-button ui-button-icon-only ui-widget ui-corner-all" title="Copy to Clipboard"><span class="ui-button-icon ui-icon ui-icon-copy"></span></button>';
							icon_options['credits'] = 'Share Link: <a href="' + share_link + '" target="_blank">' + icon_options['link'] + '</a> ' + copy_link +  '<br /><br />' + icon_options['credits'];
						} else {
							share_link = location.origin.toString() + location.pathname.toString() + '#/' + icon_options['link'].slice(1, -1);
							copy_link = '<button type="button" onclick="copyToClipboard(\'' + share_link + '\', this)" class="ui-button ui-button-icon-only ui-widget ui-corner-all" title="Copy to Clipboard"><span class="ui-button-icon ui-icon ui-icon-copy"></span></button>';
							icon_options['credits'] = 'Share Link: <a href="' + share_link + '" target="_blank">' + icon_options['link'].slice(1, -1) + '</a> ' + copy_link +  '<br /><br />' + icon_options['credits'];
						}
					}
				}

				if (typeof icon_options['disclaimer_abandoned'] !== 'undefined') {
					if (icon_options['disclaimer_abandoned'] === true) {
						icon_options['credits'] += self.disclaimer_abandoned;
					}
				}

				if (typeof icon_options['disclaimer'] !== 'undefined') {
					if (icon_options['disclaimer'] === true) {
						icon_options['credits'] += self.disclaimer;
					}
				}
			}

			self._registerFolderDefinition(icon_options, icon_options['name']);

			var href = typeof icon_options['target'] !== 'undefined' ? ' href="' + (icon_options['link'].indexOf('http') === 0 ? icon_options['link'] : root + icon_options['link']) + '" target="' + icon_options['target'] + '" ' : ' href="javascript:" ';
			var icon = typeof icon_options['icon'] !== 'undefined' ? (Array.isArray(icon_options['icon']) ? icon_options['icon'][Math.floor(Math.random() * icon_options['icon'].length)] : icon_options['icon']) : 'images/icons/desktop/joystick';

			// noinspection JSUnfilteredForInLoop
			var $icon = $('<a class="emuos-desktop-icon"'+ href + (icon_options['title'] ? 'data-title="' + icon_options['title'] + '"' : '') + '>' +
							'<i class="icon overlay ribbon' + (icon_options['shortcut'] ? ' shortcut' : '') + (icon_options['prototype'] ? ' prototype' : '') + (icon_options['beta'] ? ' beta' : '') + (icon_options['new'] ? ' new' : '') + '" style="background-image: url(' + icon  + ($sys.browser.isIE ? '.png' : '.ico') + ');"></i>' +
							'<span>' + icon_options['name'] + '</span>' +
						'</a>');

			// noinspection JSUnfilteredForInLoop
			$icon.data('name', icon_options['name']);

			// noinspection JSUnfilteredForInLoop
			$icon.data('icon', icon_options['icon']);

			// noinspection JSUnfilteredForInLoop
			if (typeof icon_options['link'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.data('link', icon_options['link'].indexOf('http') === 0 ? icon_options['link'] : root + icon_options['link']);
			}

			// noinspection JSUnfilteredForInLoop
			if (typeof icon_options['target'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.data('target', icon_options['target']);
			}

			// noinspection JSUnfilteredForInLoop
			if (typeof icon_options['newtab'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.data('newtab', icon_options['newtab']);
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
			if (typeof icon_options['folder'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.attr('data-folder', icon_options['folder'] ? 'true' : 'false').data('folder', icon_options['folder']);
			}

			// noinspection JSUnfilteredForInLoop
			if (typeof icon_options['items'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.data('items', icon_options['items']);
			}

			// noinspection JSUnfilteredForInLoop
			if (typeof icon_options['description'] === 'string' && icon_options['description'] !== '') {
				// noinspection JSUnfilteredForInLoop
				$icon.data('description', icon_options['description']);
			}

			// noinspection JSUnfilteredForInLoop
			if (typeof icon_options['xmas'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.attr('data-xmas', icon_options['xmas'] ? 'true' : 'false').data('xmas', icon_options['xmas']);
			}

			if (typeof icon_options['xmas'] === 'undefined') {
				// noinspection JSUnfilteredForInLoop
				self.$desktop.append($icon);
			} else if (moment().month() + 1 === 12 && moment().date() >= 23 && moment().date() <= 25 && $icon.attr('data-xmas') === 'true') {
				self.$desktop.append($icon);
			}

			$icon.off('click').on('click', function(e) {
				if (typeof $(this).data('target') === 'undefined') {
					e.preventDefault();
				}
			}).off('dblclick').on('dblclick', function() {
				if ($(this).data('folder') || typeof $(this).data('items') !== 'undefined') {
					self.folder({
						title: $(this).data('name'),
						icon: $(this).data('icon') || 'assets/images/icons/desktop/folder',
						items: $(this).data('items') || [],
						path: $(this).data('name'),
						width: $(this).data('width'),
						height: $(this).data('height'),
						singleinstance: $(this).data('singleinstance'),
						description: $(this).data('description') || ''
					});

					return;
				}

				// noinspection JSUnfilteredForInLoop,JSReferencingMutableVariableFromClosure
				if (typeof $(this).data('link') !== 'undefined') {
					if ($(this).data('name') === 'EmuChat') {
						if (typeof $(this).data('singleinstance') !== 'undefined') {
							// noinspection DuplicatedCode
							if ($(this).data('singleinstance') && self.$body.find('[id="' + $(this).data('name') + '"]').length === 0) {
								// noinspection JSUnfilteredForInLoop,JSReferencingMutableVariableFromClosure
								self.iframe({
									title: $(this).data('name'),
									credits: $(this).data('credits'),
									icon: $(this).data('icon'),
									src: self.frontend,
									newtab: $(this).data('newtab'),
									width: $(this).data('width'),
									height: $(this).data('height')
								});
							}
						} else {
							// noinspection JSUnfilteredForInLoop,JSReferencingMutableVariableFromClosure
							self.iframe({
								title: $(this).data('name'),
								icon: $(this).data('icon'),
								src: self.frontend,
								newtab: $(this).data('newtab'),
								width: $(this).data('width'),
								height: $(this).data('height'),
								credits: $(this).data('credits')
							});
						}
					}

					if (typeof $(this).data('singleinstance') !== 'undefined') {
						// noinspection DuplicatedCode
						if ($(this).data('singleinstance') && self.$body.find('[id^="' + $(this).data('name') + '"]').length === 0) {
							// noinspection JSUnfilteredForInLoop,JSReferencingMutableVariableFromClosure
							self.iframe({
								title: $(this).data('name'),
								credits: $(this).data('credits'),
								icon: $(this).data('icon'),
								src: $(this).data('link'),
								newtab: $(this).data('newtab'),
								width: $(this).data('width'),
								height: $(this).data('height')
							});
						}
					} else if ($(this).data('widget')) {
						// noinspection JSUnfilteredForInLoop,JSReferencingMutableVariableFromClosure,HtmlDeprecatedAttribute
						self.widget({
							title: $(this).data('name'),
							icon: $(this).data('icon'),
							content: '<iframe id="' + $(this).data('name') + '" width="100%" height="100%" src="' + $(this).data('link') + '" onload="this.focus();this.contentWindow.focus();" frameborder="0" referrerpolicy="same-origin" allowTransparency="true" allow="autoplay; fullscreen; accelerometer; gyroscope; geolocation; microphone; camera; midi; encrypted-media; clipboard-read; clipboard-write" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe>',
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
							newtab: $(this).data('newtab'),
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

			self._applyDesktopIconOrder();
			self._applyDesktopIconSize(self.desktopIconSize);
			self._applyDesktopIconVisibility();
		};

		self.desktopIcons = desktopIcons;
		self._applyDesktopIconSize(self.desktopIconSize);
		renderDesktopIcons(self.desktopIcons);

		if (self.desktopAutoArrange) {
			self._autoArrangeDesktopIcons();
		}

		self._applyDesktopAlignGrid();

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
			menuAutoOpenOnBrowse: false,
			minimizeAll: true,
			languageSelect: false,
			toggleFullscreen: true,
			networkMonitor: true,
			clock: true,
			buttons: {
				chat: {
					label: 'Chat',
					text: false,
					icons: {
						primary: 'ui-icon-comment'
					}
				}
			},
			systemButtonsOrder: [
				'chat',
				'languageSelect',
				'networkMonitor',
				'toggleFullscreen',
				'clock',
				'minimizeAll'
			]
		});

		// noinspection JSUnresolvedFunction
		self.$desktop.desktop({
			iconClass: '.icon',
			parent: '.emuos-taskbar-windows-containment'
		});

		self.$desktop.off('sortupdate.emuosIconOrder sortstop.emuosIconOrder').on('sortupdate.emuosIconOrder sortstop.emuosIconOrder', function() {
			if (self.desktopAutoArrange) {
				self._autoArrangeDesktopIcons();
			} else {
				self._saveDesktopIconOrder();
			}
		});

		if (typeof moment === 'function') {
			if (moment().month() + 1 === 2 && moment().date() === 14) {
				self.$html.addClass('emuos-valentines');
			}

			if (moment().month() + 1 === 4 && moment().date() === 1) {
				self.$html.addClass('emuos-april1st');

				self.iframe({
					title: 'FBI FBI FBI THIS WEBSITE HAS BEEN SIZED FBI FBI FBI',
					icon: 'test',
					src: 'april1st.html',
					width: 1000,
					height: 700
				});
			}

			if ((moment().month() + 1 === getEaster(moment().year()).gregorian.month && moment().date() === getEaster(moment().year()).gregorian.day) || (moment().month() + 1 === getEaster(moment().year()).orthodox.month && moment().date() === getEaster(moment().year()).orthodox.day)) {
				self.$html.addClass('emuos-easter');
			}

			if (moment().month() + 1 === 10 && moment().date() >= 29) {
				self.$html.addClass('emuos-halloween');
			}

			if (moment().month() + 1 === 12) {
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
					newyear += '<div class="fireworks-container" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;"></div>';
				}

				self.$desktop.prepend(newyear);

				if (moment().date() === 31) {
					var fireworks = new Fireworks.default($('.fireworks-container').get(0), {
						opacity: 0.3,
						acceleration: 1.02,
						friction: 0.98,
						particles: 80,
						intensity: 20,
						hue: {
							min: 0,
							max: 360
						},
						delay: {
							min: 40,
							max: 60
						},
						rocketsPoint: {
							min: 40,
							max: 60
						},
						brightness: {
							min: 40,
							max: 80
						},
						decay: {
							min: 0.01,
							max: 0.02
						}
					});

					fireworks.start();
				}

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

		self._restoreFolderWindows();

		if (typeof self.options.network !== 'undefined') {
			if (typeof self.options.network.start === 'function') {
				setTimeout(function() {
					window['NETWORK_CONNECTION'] = self.options.network.start({
						servers: ['wss://ws.emupedia.net/ws/', 'wss://ws.emupedia.org/ws/', 'wss://ws.emupedia.games/ws/', 'wss://ws.emuos.net/ws/', 'wss://ws.emuos.org/ws/', 'wss://ws.emuos.games/ws/'],
						server: ~window.location.hostname.indexOf('emupedia.net') ? 0 : (~window.location.hostname.indexOf('emupedia.org') ? 1 : (~window.location.hostname.indexOf('emupedia.games') ? 2 : (~window.location.hostname.indexOf('emuos.net') ? 3 : (~window.location.hostname.indexOf('emuos.org') ? 4 : (~window.location.hostname.indexOf('emuos.games') ? 5 : 0))))),
						mode: 0
					});
				});
			}
		}

		self.$window.one('keydown', function (e) {
			// noinspection JSRedundantSwitchStatement
			switch (e.keyCode) {
				case 192:
					if (!chat) {
						// noinspection HtmlDeprecatedAttribute,HtmlUnknownTarget
						chat = self.widget({
							title: 'Chat',
							hidden: true,
							width: 640,
							height: 350,
							right: '0px',
							bottom: '28px',
							content: '<iframe id="Chat" width="100%" height="100%" src="' + frontend + '" frameborder="0" allowTransparency="true" allow="autoplay; fullscreen; accelerometer; gyroscope; geolocation; microphone; camera; midi; encrypted-media; clipboard-read; clipboard-write" sandbox="allow-forms allow-downloads allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe>'
						});

						chat.find('iframe').one('load', function() {
							chat.slideDown(300);
						});

						e.preventDefault();
						return false;
					}
			}
		});

		self.$taskbar.taskbar('option', 'buttons.chat').$element.one('click', function() {
			if (!chat) {
				// noinspection HtmlDeprecatedAttribute,HtmlUnknownTarget
				chat = self.widget({
					title: 'Chat',
					hidden: true,
					width: 640,
					height: 350,
					right: '0px',
					bottom: '28px',
					content: '<iframe id="Chat" width="100%" height="100%" src="' + frontend + '" frameborder="0" allowTransparency="true" allow="autoplay; fullscreen; accelerometer; gyroscope; geolocation; microphone; camera; midi; encrypted-media; clipboard-read; clipboard-write" sandbox="allow-forms allow-downloads allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe>'
				});

				chat.find('iframe').one('load', function() {
					chat.slideDown(300);
				});
			}
		});

		var getDesktopMenu = function() {
			var hasCustomWallpaper = !!self._getCustomWallpaper();
			var desktopMenu = [{
				title: 'View',
				children: [{
					title: 'Huge icons',
					cmd: 'view-huge-icons'
				} , {
					title: 'Extra Large icons',
					cmd: 'view-extra-large-icons'
				} , {
					title: 'Large icons',
					cmd: 'view-large-icons'
				} , {
					title: 'Medium icons',
					cmd: 'view-medium-icons'
				} , {
					title: 'Small icons',
					cmd: 'view-small-icons'
				} , {
					title: '----'
				} , {
					title: 'Auto arrange icons',
					cmd: 'view-auto-arrange'
				} , {
					title: 'Align icons to grid',
					cmd: 'view-align-grid'
				} , {
					title: 'Reset icon positions',
					cmd: 'view-reset-icon-positions'
				} , {
					title: '----'
				} , {
					title: 'Show desktop icons',
					cmd: 'view-show-icons'
				}]
			} , {
				title: '----'
			} , {
				title: 'Refresh',
				cmd: 'refresh',
				uiIcon: 'ui-icon-refresh'
			} , {
				title: '----'
			} , {
				title: 'Set Custom Wallpaper',
				cmd: 'custom-wallpaper',
				uiIcon: 'ui-icon-image'
			}];

			if (hasCustomWallpaper) {
				desktopMenu.push({
					title: 'Remove Custom Wallpaper',
					cmd: 'remove-custom-wallpaper',
					uiIcon: 'ui-icon-trash'
				});
			}

			desktopMenu = desktopMenu.concat([{
				title: '----'
			} , {
				title: 'Themes',
				children: [{
					title: 'Basic',
					cmd: 'basic'
				} , {
					title: 'Windows 3.1',
					cmd: 'windows-3'
				} , {
					title: 'Windows 95',
					cmd: 'windows-95'
				} , {
					title: 'Windows 98',
					cmd: 'windows-98'
				} , {
					title: 'Windows ME',
					cmd: 'windows-me'
				}]
			} , {
				title: '----'
			} , {
				title: 'Use Folders',
				cmd: 'toggle-folders',
				uiIcon: self.useFolders ? 'ui-icon-check' : ''
			}]);

			return desktopMenu;
		};

		self.$html.contextmenu({
			delegate: '.emuos-desktop, .emuos-taskbar',
			addClass: 'ui-contextmenu emuos-folder-menu emuos-desktop-context-menu',
			show: { effect: 'show', duration: 0 },
			hide: { effect: 'hide', duration: 0 },
			menu: getDesktopMenu(),
			open: function(event, ui) {
				self._decorateDesktopContextMenu(ui.menu);
				ui.menu.width(ui.menu.outerWidth());
			},
			select: function(e, ui) {
				switch (ui.cmd) {
					case 'view-huge-icons':
					case 'view-extra-large-icons':
					case 'view-large-icons':
					case 'view-medium-icons':
					case 'view-small-icons':
						self._setDesktopIconSizeFromCommand(ui.cmd);
						break;
					case 'view-auto-arrange':
						self.desktopAutoArrange = !self.desktopAutoArrange;
						self._saveDesktopViewSettings();

						if (self.desktopAutoArrange) {
							self._autoArrangeDesktopIcons();
						}

						break;
					case 'view-align-grid':
						self.desktopAlignGrid = !self.desktopAlignGrid;
						self._saveDesktopViewSettings();
						self._applyDesktopAlignGrid();
						break;
					case 'view-reset-icon-positions':
						self._resetDesktopIconPositions();
						break;
					case 'view-show-icons':
						self.desktopShowIcons = !self.desktopShowIcons;
						self._saveDesktopViewSettings();
						self._applyDesktopIconVisibility();
						break;
					case 'refresh':
						// noinspection JSUnresolvedFunction
						window.location.reload();
						break;
					case 'custom-wallpaper':
						self._promptCustomWallpaper();
						break;
					case 'remove-custom-wallpaper':
						self._clearCustomWallpaper();
						break;
					case 'toggle-folders':
						self.useFolders = !self.useFolders;

						if (typeof simplestorage !== 'undefined' && typeof simplestorage.set === 'function') {
							simplestorage.set('useFolders', self.useFolders);
						}

						self.desktopIcons = self._getDesktopIcons(self.options.icons, self.useFolders);
						renderDesktopIcons(self.desktopIcons);
						break;
					case 'basic':
						self.$html.removeClass('theme-windows-3 theme-windows-95 theme-windows-98 theme-windows-me').addClass('theme-basic');

						// noinspection JSJQueryEfficiency
						if (typeof $('.emuos-window .window.emuos-window-content').mCustomScrollbar === 'function') {
							// noinspection JSJQueryEfficiency
							$('.emuos-window .window.emuos-window-content').mCustomScrollbar('destroy');
						}
						self.$taskbar.taskbar('option', 'resizableHandleOffset', 0).taskbar('instance')._refresh();
						break;
					case 'windows-3':
						self.$html.removeClass('theme-basic theme-windows-95 theme-windows-98 theme-windows-me').addClass('theme-windows-3');
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
						self.$html.removeClass('theme-basic theme-windows-3 theme-windows-98 theme-windows-me').addClass('theme-windows-95');
						// noinspection JSJQueryEfficiency
						if (typeof $('.emuos-window .window.emuos-window-content').mCustomScrollbar === 'function') {
							$('.emuos-window .window.emuos-window-content').mCustomScrollbar('destroy');
						}
						self.$taskbar.taskbar('option', 'resizableHandleOffset', 1).taskbar('instance')._refresh();
						break;
					case 'windows-98':
						self.$html.removeClass('theme-basic theme-windows-3 theme-windows-95 theme-windows-me').addClass('theme-windows-98');
						// noinspection JSJQueryEfficiency
						if (typeof $('.emuos-window .window.emuos-window-content').mCustomScrollbar === 'function') {
							$('.emuos-window .window.emuos-window-content').mCustomScrollbar('destroy');
						}
						self.$taskbar.taskbar('option', 'resizableHandleOffset', 1).taskbar('instance')._refresh();
						break;
					case 'windows-me':
						self.$html.removeClass('theme-basic theme-windows-3 theme-windows-95 theme-windows-98').addClass('theme-windows-me');
						// noinspection JSJQueryEfficiency
						if (typeof $('.emuos-window .window.emuos-window-content').mCustomScrollbar === 'function') {
							$('.emuos-window .window.emuos-window-content').mCustomScrollbar('destroy');
						}
						self.$taskbar.taskbar('option', 'resizableHandleOffset', 1).taskbar('instance')._refresh();
						break;
				}

				if (typeof simplestorage !== 'undefined') {
					if (typeof simplestorage.set === 'function') {
						if (ui.cmd === 'basic' || ui.cmd === 'windows-3' || ui.cmd === 'windows-95' || ui.cmd === 'windows-98' || ui.cmd === 'windows-me') {
							simplestorage.set('theme', ui.cmd);
						}
					}
				}

				return true;
			}
		});

		self.$html.off('mousedown.emuosDesktopMenu').on('mousedown.emuosDesktopMenu', '.emuos-desktop, .emuos-taskbar', function(e) {
			if (e.which === 3) {
				self.$html.contextmenu('option', 'menu', getDesktopMenu());
			}
		});

		self.$html.on('mousemove', function (e) {
			var parentOffset = $(e.target).offset();
			var relX = e.pageX - parentOffset.left;
			var relY = e.pageY - parentOffset.top;
			self.$html.get(0).style.setProperty('--mouse-x', relX + 'px');
			self.$html.get(0).style.setProperty('--mouse-y', relY + 'px');
		});

		Router.config({mode: 'hash', root: root});
		// noinspection JSIgnoredPromiseFromCall
		Router.navigate('/');

		Router.add(/(.*)/, function(route) {
			var params = '';
			var routeIcons = self._flattenDesktopIcons(self.options.icons, { expandNoFlatten: true });

			if (~route.indexOf('?')) {
				params = route.slice(route.lastIndexOf('?') + 1);
				route = route.slice(0, route.lastIndexOf('?'));
			}

			for (var j in routeIcons) {
				// noinspection JSUnfilteredForInLoop,JSDuplicatedDeclaration
				var icon_options = routeIcons[j];

				if (typeof icon_options['link'] !== 'undefined') {
					var icon_link = '';
					var $icon = self.$desktop.find('a.emuos-desktop-icon span:contains("' + icon_options['name'] + '")').first().parent();
					var launchItem = $.extend(true, {}, icon_options);

					if (!~icon_options['link'].indexOf('http')) {
						icon_link = ~icon_options['link'].indexOf('?') ? icon_options['link'].slice(0, icon_options['link'].indexOf('?')) : icon_options['link'];
						icon_link = icon_link.substr(0, 1) === '/' ? icon_link.slice(1) : icon_link;
						icon_link = ~icon_link.lastIndexOf('/') ? icon_link.slice(0, icon_link.lastIndexOf('/')) : icon_link;

						if (route === icon_link) {
							if (params !== '') {
								launchItem.link = icon_options['link'].indexOf('?') ? icon_options['link'].slice(0, icon_options['link'].indexOf('?')) + '?' + params : icon_options['link'] + '?' + params;
							}

							if ($icon.length) {
								if (params !== '') {
									$icon.data('link', $icon.data('link').indexOf('?') ? $icon.data('link').slice(0, $icon.data('link').indexOf('?')) + '?' + params : $icon.data('link') + '?' + params);
								}
								$icon.trigger('dblclick');
							} else {
								self._launchFolderItem(launchItem, '');
							}

							break;
						}
					} else {
						icon_link = icon_options['link'].substr(-1) === '/' ? icon_options['link'].slice(0, -1) : icon_options['link'];

						if (route === icon_link) {
							if (params !== '') {
								launchItem.link = icon_options['link'].indexOf('?') ? icon_options['link'].slice(0, icon_options['link'].indexOf('?')) + '?' + params : icon_options['link'] + '?' + params;
							}

							if ($icon.length) {
								$icon.trigger('dblclick');
							} else {
								self._launchFolderItem(launchItem, '');
							}

							break;
						}
					}
				}
			}
		}).listen();

		if (hash.indexOf('#') === 0) {
			hash = hash.slice(1);

			if (hash !== '') {
				// noinspection JSIgnoredPromiseFromCall
				Router.navigate(hash);
			}
		}
	};

	EmuOS.prototype._hasTouchInput = function() {
		var nav = window.navigator || {};

		return ('ontouchstart' in window) || (typeof nav.maxTouchPoints === 'number' && nav.maxTouchPoints > 0) || (typeof nav.msMaxTouchPoints === 'number' && nav.msMaxTouchPoints > 0);
	};

	EmuOS.prototype._shouldOpenMaximized = function(width, height) {
		var viewportWidth = this.$window && this.$window.length ? this.$window.width() : window.innerWidth;
		var viewportHeight = this.$window && this.$window.length ? this.$window.height() : window.innerHeight;
		var taskbarHeight = this.$taskbar && this.$taskbar.length ? (this.$taskbar.outerHeight() || 0) : 0;
		var availableHeight = Math.max(0, viewportHeight - taskbarHeight);
		var numericWidth = typeof width === 'number' ? width : parseInt(width, 10);
		var numericHeight = typeof height === 'number' ? height : parseInt(height, 10);

		if (isNaN(numericWidth) || isNaN(numericHeight)) {
			return false;
		}

		return numericWidth > viewportWidth || numericHeight > availableHeight;
	};

	EmuOS.prototype._enableTouchSingleTapOpen = function() {
		var self = this;
		var selector = '.emuos-desktop-icon, .emuos-folder-item';
		var dataKey = 'emuos-touch-start';
		var maxDistance = 12;

		if (!self._hasTouchInput()) {
			return;
		}

		self.$body
			.off('touchstart.emuosSingleTapOpen', selector)
			.off('touchend.emuosSingleTapOpen', selector)
			.off('touchcancel.emuosSingleTapOpen', selector)
			.on('touchstart.emuosSingleTapOpen', selector, function(e) {
				var originalEvent = e.originalEvent || e;
				var touch = originalEvent && originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : null;

				if (!touch) {
					return;
				}

				$(this).data(dataKey, {
					x: touch.clientX,
					y: touch.clientY
				});
			})
			.on('touchcancel.emuosSingleTapOpen', selector, function() {
				$(this).removeData(dataKey);
			})
			.on('touchend.emuosSingleTapOpen', selector, function(e) {
			var originalEvent = e.originalEvent || e;
			var touch = originalEvent && originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : null;
			var $target = $(this);
			var start = $target.data(dataKey);
			var dx = 0;
			var dy = 0;

			if (!touch) {
				return;
			}

			if (!start) {
				return;
			}

			dx = Math.abs(touch.clientX - start.x);
			dy = Math.abs(touch.clientY - start.y);
			$target.removeData(dataKey);

			if (dx > maxDistance || dy > maxDistance) {
				return;
			}

			if ($target.hasClass('ui-sortable-helper') || $target.hasClass('ui-draggable-dragging')) {
				return;
			}

			e.preventDefault();
			e.stopPropagation();
			$target.trigger('dblclick');
		});
	};

	EmuOS.prototype._getDesktopIconOrderKey = function() {
		return 'desktopIconOrder:' + (this.useFolders ? 'folders' : 'flat');
	};

	EmuOS.prototype._getStoredDesktopIconOrder = function() {
		if (typeof simplestorage === 'undefined' || typeof simplestorage.get !== 'function') {
			return [];
		}

		var order = simplestorage.get(this._getDesktopIconOrderKey());

		return Array.isArray(order) ? order : [];
	};

	EmuOS.prototype._saveDesktopIconOrder = function() {
		if (typeof simplestorage === 'undefined' || typeof simplestorage.set !== 'function') {
			return;
		}

		var order = [];

		this.$desktop.children('a.emuos-desktop-icon').each(function() {
			var name = $(this).data('name');

			if (typeof name === 'string' && name !== '') {
				order.push(name);
			}
		});

		simplestorage.set(this._getDesktopIconOrderKey(), order);
	};

	EmuOS.prototype._applyDesktopIconOrder = function() {
		var order = this._getStoredDesktopIconOrder();
		var self = this;

		if (!order.length) {
			return;
		}

		for (var i = 0; i < order.length; i++) {
			var name = order[i];
			var $icon = self.$desktop.children('a.emuos-desktop-icon').filter(function() {
				return $(this).data('name') === name;
			}).first();

			if ($icon.length) {
				self.$desktop.append($icon);
			}
		}
	};

	EmuOS.prototype._clearStoredDesktopIconOrder = function() {
		if (typeof simplestorage === 'undefined') {
			return;
		}

		if (typeof simplestorage.deleteKey === 'function') {
			simplestorage.deleteKey('desktopIconOrder:folders');
			simplestorage.deleteKey('desktopIconOrder:flat');
		} else if (typeof simplestorage.set === 'function') {
			simplestorage.set('desktopIconOrder:folders', []);
			simplestorage.set('desktopIconOrder:flat', []);
		}
	};

	EmuOS.prototype._resetDesktopIconPositions = function() {
		var iconList = this._getDesktopIcons(this.options.icons, this.useFolders);
		var self = this;

		this._clearStoredDesktopIconOrder();

		for (var i = 0; i < iconList.length; i++) {
			var icon = iconList[i] || {};
			var name = icon.name;

			if (typeof name !== 'string' || name === '') {
				continue;
			}

			var $icon = self.$desktop.children('a.emuos-desktop-icon').filter(function() {
				return $(this).data('name') === name;
			}).first();

			if ($icon.length) {
				self.$desktop.append($icon);
			}
		}
	};

	EmuOS.prototype._getCustomWallpaper = function() {
		if (typeof simplestorage === 'undefined' || typeof simplestorage.get !== 'function') {
			return '';
		}

		var value = simplestorage.get('customWallpaper');

		return typeof value === 'string' ? value : '';
	};

	EmuOS.prototype._setCustomWallpaper = function(dataUrl) {
		if (typeof simplestorage === 'undefined' || typeof simplestorage.set !== 'function') {
			return;
		}

		simplestorage.set('customWallpaper', dataUrl);
	};

	EmuOS.prototype._clearCustomWallpaper = function() {
		if (typeof simplestorage !== 'undefined' && typeof simplestorage.deleteKey === 'function') {
			simplestorage.deleteKey('customWallpaper');
		} else if (typeof simplestorage !== 'undefined' && typeof simplestorage.set === 'function') {
			simplestorage.set('customWallpaper', '');
		}

		this.$desktop.css({
			'background-image': '',
			'background-size': '',
			'background-position': '',
			'background-repeat': ''
		});
	};

	EmuOS.prototype._applyCustomWallpaper = function(dataUrl) {
		if (!dataUrl || typeof dataUrl !== 'string') {
			return;
		}

		this.$desktop.css({
			'background-image': 'url(' + dataUrl + ')',
			'background-size': 'cover',
			'background-position': 'center center',
			'background-repeat': 'no-repeat'
		});
	};

	EmuOS.prototype._applyStoredCustomWallpaper = function() {
		var wallpaper = this._getCustomWallpaper();

		if (wallpaper) {
			this._applyCustomWallpaper(wallpaper);
		}
	};

	EmuOS.prototype._promptCustomWallpaper = function() {
		var self = this;
		var $picker = $('<input type="file" accept="image/*" style="display:none;" />');

		self.$body.append($picker);

		$picker.off('change').on('change', function() {
			var file = this.files && this.files[0] ? this.files[0] : null;

			if (!file) {
				$picker.remove();
				return;
			}

			if (typeof FileReader === 'undefined') {
				toastr.error('This browser does not support custom wallpaper upload.');
				$picker.remove();
				return;
			}

			var reader = new FileReader();

			reader.onload = function(evt) {
				var result = evt && evt.target ? evt.target.result : '';

				if (typeof result === 'string' && result.indexOf('data:image') === 0) {
					self._setCustomWallpaper(result);
					self._applyCustomWallpaper(result);
				} else {
					toastr.error('Invalid image file.');
				}

				$picker.remove();
			};

			reader.onerror = function() {
				toastr.error('Could not read image file.');
				$picker.remove();
			};

			reader.readAsDataURL(file);
		});

		$picker.trigger('click');
	};

	EmuOS.prototype._getUseFoldersSetting = function() {
		if (typeof simplestorage === 'undefined' || typeof simplestorage.get !== 'function') {
			return true;
		}

		var value = simplestorage.get('useFolders');

		return typeof value === 'boolean' ? value : true;
	};

	EmuOS.prototype._getDesktopIconSizePresets = function() {
		return {
			'view-huge-icons': { size: 128, width: 154, height: 172 },
			'view-extra-large-icons': { size: 64, width: 90, height: 108 },
			'view-large-icons': { size: 48, width: 74, height: 92 },
			'view-medium-icons': { size: 32, width: 58, height: 76 },
			'view-small-icons': { size: 24, width: 50, height: 68 }
		};
	};

	EmuOS.prototype._getDefaultDesktopIconSizeCommand = function() {
		return 'view-large-icons';
	};

	EmuOS.prototype._getDefaultDesktopIconSize = function() {
		var presets = this._getDesktopIconSizePresets();
		var preset = presets[this._getDefaultDesktopIconSizeCommand()];

		return preset ? preset.size : 48;
	};

	EmuOS.prototype._getDesktopIconSizeSetting = function() {
		var defaultSize = this._getDefaultDesktopIconSize();

		if (typeof simplestorage === 'undefined' || typeof simplestorage.get !== 'function') {
			return defaultSize;
		}

		var value = simplestorage.get('desktopIconSize');

		if (value === undefined || value === null || value === '') {
			return defaultSize;
		}

		value = parseInt(value, 10);
		var validSizes = [128, 64, 48, 32, 24];

		return validSizes.indexOf(value) !== -1 ? value : defaultSize;
	};

	EmuOS.prototype._getDesktopAutoArrangeSetting = function() {
		if (typeof simplestorage === 'undefined' || typeof simplestorage.get !== 'function') {
			return false;
		}

		var value = simplestorage.get('desktopAutoArrange');

		return typeof value === 'boolean' ? value : false;
	};

	EmuOS.prototype._getDesktopAlignGridSetting = function() {
		if (typeof simplestorage === 'undefined' || typeof simplestorage.get !== 'function') {
			return false;
		}

		var value = simplestorage.get('desktopAlignGrid');

		return typeof value === 'boolean' ? value : false;
	};

	EmuOS.prototype._getDesktopShowIconsSetting = function() {
		if (typeof simplestorage === 'undefined' || typeof simplestorage.get !== 'function') {
			return true;
		}

		var value = simplestorage.get('desktopShowIcons');

		return typeof value === 'boolean' ? value : true;
	};

	EmuOS.prototype._getDesktopIconSizeCommand = function() {
		var presets = this._getDesktopIconSizePresets();
		var size = this.desktopIconSize;

		for (var cmd in presets) {
			if (presets[cmd].size === size) {
				return cmd;
			}
		}

		return this._getDefaultDesktopIconSizeCommand();
	};

	EmuOS.prototype._saveDesktopViewSettings = function() {
		if (typeof simplestorage === 'undefined' || typeof simplestorage.set !== 'function') {
			return;
		}

		simplestorage.set('desktopIconSize', this.desktopIconSize);
		simplestorage.set('desktopAutoArrange', this.desktopAutoArrange);
		simplestorage.set('desktopAlignGrid', this.desktopAlignGrid);
		simplestorage.set('desktopShowIcons', this.desktopShowIcons);
	};

	EmuOS.prototype._applyDesktopIconSize = function(size) {
		var presets = this._getDesktopIconSizePresets();
		var preset = null;

		for (var cmd in presets) {
			if (presets[cmd].size === size) {
				preset = presets[cmd];
				break;
			}
		}

		if (!preset) {
			preset = presets[this._getDefaultDesktopIconSizeCommand()];
			size = preset.size;
		}

		this.desktopIconSize = size;

		if (this.$desktop && this.$desktop.length) {
			this.$desktop.css({
				'--desktop-icon-size': preset.size + 'px',
				'--desktop-icon-cell-width': preset.width + 'px',
				'--desktop-icon-cell-height': preset.height + 'px'
			});
		}
	};

	EmuOS.prototype._setDesktopIconSizeFromCommand = function(cmd) {
		var presets = this._getDesktopIconSizePresets();
		var preset = presets[cmd];

		if (!preset) {
			return;
		}

		this.desktopIconSize = preset.size;
		this._saveDesktopViewSettings();
		this._applyDesktopIconSize(this.desktopIconSize);
	};

	EmuOS.prototype._applyDesktopIconVisibility = function() {
		if (!this.$desktop || !this.$desktop.length) {
			return;
		}

		this.$desktop.children('a.emuos-desktop-icon').toggle(this.desktopShowIcons !== false);
	};

	EmuOS.prototype._applyDesktopAlignGrid = function() {
		if (!this.$desktop || !this.$desktop.length) {
			return;
		}

		this.$desktop.toggleClass('emuos-desktop-align-grid', !!this.desktopAlignGrid);
	};

	EmuOS.prototype._autoArrangeDesktopIcons = function() {
		if (!this.$desktop || !this.$desktop.length) {
			return;
		}

		var $icons = this.$desktop.children('a.emuos-desktop-icon');
		var sorted = $icons.get().sort(function(a, b) {
			var nameA = ($(a).data('name') || $(a).find('span').text() || '').toString().toLowerCase();
			var nameB = ($(b).data('name') || $(b).find('span').text() || '').toString().toLowerCase();

			return nameA.localeCompare(nameB);
		});

		for (var i = 0; i < sorted.length; i++) {
			this.$desktop.append(sorted[i]);
		}

		this._saveDesktopIconOrder();
	};

	EmuOS.prototype._flattenDesktopIcons = function(icons, options) {
		var flattened = [];
		var expandNoFlatten = options && options.expandNoFlatten === true;

		if (!Array.isArray(icons)) {
			return flattened;
		}

		for (var i = 0; i < icons.length; i++) {
			var icon = icons[i] || {};
			var isFolder = icon.folder === true || Array.isArray(icon.items);

			if (isFolder) {
				if (icon.no_flatten === true && !expandNoFlatten) {
					flattened.push(icon);
					continue;
				}

				var childItems = Array.isArray(icon.items) ? icon.items : [];
				var children = this._flattenDesktopIcons(childItems, options);

				for (var j = 0; j < children.length; j++) {
					flattened.push(children[j]);
				}

				continue;
			}

			flattened.push(icon);
		}

		return flattened;
	};

	EmuOS.prototype._getDesktopIcons = function(icons, useFolders) {
		return useFolders ? icons : this._flattenDesktopIcons(icons);
	};

	EmuOS.prototype._registerFolderDefinition = function(folder, path) {
		if (!folder) {
			return;
		}

		var hasItems = Array.isArray(folder.items);
		var isFolder = folder.folder === true || hasItems;
		var folderName = typeof folder.name !== 'undefined' ? folder.name : 'Folder';
		var folderPath = path || folderName;

		if (!isFolder) {
			return;
		}

		this._foldersByPath[folderPath] = {
			path: folderPath,
			title: folderName,
			icon: this._resolveIcon(folder.icon, 'assets/images/icons/desktop/folder'),
			items: hasItems ? folder.items : [],
			width: folder.width,
			height: folder.height,
			singleinstance: folder.singleinstance,
			description: typeof folder.description === 'string' ? folder.description : ''
		};

		if (!hasItems) {
			return;
		}

		for (var i = 0; i < folder.items.length; i++) {
			var item = folder.items[i] || {};
			var itemName = typeof item.name !== 'undefined' ? item.name : 'Folder';
			var itemIsFolder = item.folder === true || Array.isArray(item.items);

			if (itemIsFolder) {
				this._registerFolderDefinition(item, folderPath + '\\' + itemName);
			}
		}
	};

	EmuOS.prototype._getStoredFolderWindows = function() {
		if (typeof simplestorage === 'undefined' || typeof simplestorage.get !== 'function') {
			return [];
		}

		var states = simplestorage.get('emuos.folders.opened');

		return Array.isArray(states) ? states : [];
	};

	EmuOS.prototype._setStoredFolderWindows = function(states) {
		if (typeof simplestorage === 'undefined' || typeof simplestorage.set !== 'function') {
			return;
		}

		simplestorage.set('emuos.folders.opened', states);
	};

	EmuOS.prototype._saveFolderWindowState = function(state) {
		if (!state || !state.path) {
			return;
		}

		var states = this._getStoredFolderWindows();
		var index = -1;

		for (var i = 0; i < states.length; i++) {
			if (states[i] && states[i].path === state.path) {
				index = i;
				break;
			}
		}

		if (index > -1) {
			states[index] = $.extend(true, {}, states[index], state);
		} else {
			states.push(state);
		}

		this._setStoredFolderWindows(states);
	};

	EmuOS.prototype._removeFolderWindowState = function(path) {
		if (!path) {
			return;
		}

		var states = this._getStoredFolderWindows().filter(function(state) {
			return state && state.path !== path;
		});

		this._setStoredFolderWindows(states);
	};

	EmuOS.prototype._restoreFolderWindows = function() {
		if (!this.useFolders) {
			return;
		}

		var states = this._getStoredFolderWindows();

		for (var i = 0; i < states.length; i++) {
			var state = states[i] || {};
			var definition = this._foldersByPath[state.path];
			var fallbackItems = Array.isArray(state.items) ? state.items : [];

			if (!definition && fallbackItems.length === 0) {
				continue;
			}

			this.folder({
				title: state.title || (definition ? definition.title : 'Folder'),
				icon: state.icon || (definition ? definition.icon : 'assets/images/icons/desktop/folder'),
				items: fallbackItems.length > 0 ? fallbackItems : definition.items,
				path: state.path || (definition ? definition.path : (state.title || 'Folder')),
				width: typeof state.width !== 'undefined' ? state.width : (definition ? definition.width : undefined),
				height: typeof state.height !== 'undefined' ? state.height : (definition ? definition.height : undefined),
				description: definition && typeof definition.description === 'string' ? definition.description : '',
				iconSize: state.iconSize,
				restoreState: state,
				singleinstance: false
			});
		}
	};

	EmuOS.prototype._resolveIcon = function(icon, fallback) {
		if (typeof icon === 'undefined' || icon === null || icon === '') {
			return fallback;
		}

		if (Array.isArray(icon)) {
			return icon[Math.floor(Math.random() * icon.length)];
		}

		return icon;
	};

	EmuOS.prototype._resolveLink = function(link) {
		if (typeof link === 'undefined' || link === null || link === '') {
			return '';
		}

		return link.indexOf('http') === 0 ? link : root + link;
	};

	EmuOS.prototype._launchFolderItem = function(item, folderPath) {
		var self = this;
		var name = typeof item.name !== 'undefined' ? item.name : 'Untitled';
		var hasItems = Array.isArray(item.items);
		var isFolder = item.folder === true || hasItems;
		var normalizedPath = folderPath ? folderPath + '\\' + name : name;
		var icon = self._resolveIcon(item.icon, isFolder ? 'assets/images/icons/desktop/folder' : 'assets/images/icons/desktop/joystick');
		var link = self._resolveLink(item.link);

		if (isFolder) {
			self.folder({
				title: name,
				icon: icon,
				items: hasItems ? item.items : [],
				path: normalizedPath,
				width: item.width,
				height: item.height,
				singleinstance: item.singleinstance,
				description: typeof item.description === 'string' ? item.description : ''
			});

			return;
		}

		if (!link) {
			return;
		}

		if (typeof item.target !== 'undefined') {
			window.open(link, item.target);
			return;
		}

		if (item.singleinstance && self.$body.find('[id^="' + name + '"]').length > 0) {
			return;
		}

		if (item.widget) {
			// noinspection HtmlDeprecatedAttribute
			self.widget({
				title: name,
				icon: icon,
				content: '<iframe id="' + name + '" width="100%" height="100%" src="' + link + '" onload="this.focus();this.contentWindow.focus();" frameborder="0" referrerpolicy="same-origin" allowTransparency="true" allow="autoplay; fullscreen; accelerometer; gyroscope; geolocation; microphone; camera; midi; encrypted-media; clipboard-read; clipboard-write" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe>',
				width: item.width,
				height: item.height,
				top: item.top,
				left: item.left,
				right: item.right,
				bottom: item.bottom
			});

			return;
		}

		self.iframe({
			title: name,
			icon: icon,
			src: link,
			newtab: item.newtab,
			width: item.width,
			height: item.height,
			credits: item.credits
		});
	};

	EmuOS.prototype._ensureDisabledInsetFilter = function() {
		if (document.getElementById('disabled-inset-filter')) {
			return;
		}

		var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

		svg.setAttribute('aria-hidden', 'true');
		svg.setAttribute('style', 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none');

		svg.innerHTML = '<defs>' +
			'<filter id="disabled-inset-filter" x="0" y="0" width="1" height="1">' +
				'<feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -2 -2 -2 4 0" result="dark-parts-isolated"></feColorMatrix>' +
				'<feFlood result="shadow-color" flood-color="#808080"></feFlood>' +
				'<feFlood result="hilight-color" flood-color="#ffffff"></feFlood>' +
				'<feOffset in="dark-parts-isolated" dx="1" dy="1" result="offset"></feOffset>' +
				'<feComposite in="hilight-color" in2="offset" operator="in" result="hilight-colored-offset"></feComposite>' +
				'<feComposite in="shadow-color" in2="dark-parts-isolated" operator="in" result="shadow-colored"></feComposite>' +
				'<feMerge>' +
					'<feMergeNode in="hilight-colored-offset"></feMergeNode>' +
					'<feMergeNode in="shadow-colored"></feMergeNode>' +
				'</feMerge>' +
			'</filter>' +
		'</defs>';

		document.body.appendChild(svg);

		$window.off('resize.emuosDisabledInsetFilter').on('resize.emuosDisabledInsetFilter', function() {
			var filter = document.getElementById('disabled-inset-filter');

			if (filter) {
				filter.setAttribute('x', '0');
			}
		});
	};

	EmuOS.prototype._formatFolderAddress = function(path) {
		if (typeof path !== 'string' || path === '') {
			return 'C:\\Desktop\\';
		}

		return 'C:\\Desktop\\' + path.replace(/\//g, '\\') + '\\';
	};

	EmuOS.prototype._getFolderLocation = function($folder) {
		var location = $folder.data('folderLocation');

		if (!location) {
			return {
				path: $folder.data('folderPath') || '',
				title: $folder.find('.emuos-folder-sidebar-title').first().text() || '',
				icon: 'assets/images/icons/desktop/folder-open',
				items: $folder.data('folderItems') || [],
				description: ''
			};
		}

		return location;
	};

	EmuOS.prototype._findFolderLocationInTree = function(items, targetPath, basePath) {
		var self = this;

		if (!Array.isArray(items)) {
			return null;
		}

		for (var i = 0; i < items.length; i++) {
			var item = items[i] || {};
			var name = typeof item.name !== 'undefined' ? item.name : '';
			var itemPath = basePath ? basePath + '\\' + name : name;
			var isFolder = item.folder === true || Array.isArray(item.items);

			if (itemPath === targetPath && isFolder) {
				return {
					path: itemPath,
					title: name,
					icon: self._resolveIcon(item.icon, 'assets/images/icons/desktop/folder'),
					items: Array.isArray(item.items) ? item.items : [],
					description: typeof item.description === 'string' ? item.description : ''
				};
			}

			if (Array.isArray(item.items)) {
				var found = self._findFolderLocationInTree(item.items, targetPath, itemPath);

				if (found) {
					return found;
				}
			}
		}

		return null;
	};

	EmuOS.prototype._resolveParentFolderLocation = function($folder) {
		var self = this;
		var current = self._getFolderLocation($folder);
		var home = $folder.data('folderHome') || current;
		var currentPath = current.path || '';

		if (!currentPath || currentPath === home.path) {
			return null;
		}

		var parts = currentPath.split('\\');

		parts.pop();

		var parentPath = parts.join('\\');

		if (parentPath === home.path || parentPath === '') {
			return {
				path: home.path,
				title: home.title,
				icon: home.icon,
				items: home.items,
				description: typeof home.description === 'string' ? home.description : ''
			};
		}

		return self._findFolderLocationInTree(home.items, parentPath, home.path);
	};

	EmuOS.prototype._getFolderWindowWidget = function($folder) {
		return $folder.closest('.emuos-window-content').first();
	};

	EmuOS.prototype._positionFolderDropdownMenu = function($folder, $anchor, $menu) {
		var folderOffset = $folder.offset();
		var anchorOffset = $anchor.offset();

		if (!folderOffset || !anchorOffset) {
			return;
		}

		$menu.css({
			top: (anchorOffset.top - folderOffset.top + $anchor.outerHeight()) + 'px',
			left: (anchorOffset.left - folderOffset.left) + 'px'
		});
	};

	EmuOS.prototype._applyFolderLocation = function($folder, location) {
		var self = this;
		var icon = self._resolveIcon(location.icon, 'assets/images/icons/desktop/folder');

		if (icon === 'assets/images/icons/desktop/folder') {
			icon = 'assets/images/icons/desktop/folder-open';
		}

		var iconUrl = icon + ($sys.browser.isIE ? '.png' : '.ico');
		var address = self._formatFolderAddress(location.path);

		location = {
			path: location.path || '',
			title: location.title || 'Folder',
			icon: icon,
			items: Array.isArray(location.items) ? location.items : [],
			description: typeof location.description === 'string' ? location.description : ''
		};

		$folder.data('folderLocation', location);
		$folder.data('folderPath', location.path);
		$folder.data('folderItems', location.items);

		$folder.find('.emuos-folder-address-input').first().val(address);
		$folder.find('.emuos-folder-address-icon').css('background-image', 'url(' + iconUrl + ')');
		$folder.find('.emuos-folder-sidebar-title').first().text(location.title);
		$folder.find('.emuos-folder-sidebar-head .icon').css('background-image', 'url(' + iconUrl + ')');
		$folder.find('.emuos-folder-sidebar-info').empty();
		$folder.find('.emuos-folder-sidebar-prompt').show().text('Select an item to view its description.');
		self._setFolderSidebarDescription($folder, location.description);
		$folder.find('.emuos-folder-status-middle').first().text('');

		var $windowWidget = self._getFolderWindowWidget($folder);

		if ($windowWidget.length) {
			$windowWidget.window('option', 'title', location.title);
		}

		self._renderFolderItems($folder);
		self._updateFolderNavButtons($folder);
	};

	EmuOS.prototype._updateFolderNavButtons = function($folder) {
		var history = $folder.data('folderHistory') || { back: [], forward: [] };
		var canBack = history.back.length > 0;
		var canForward = history.forward.length > 0;
		var canUp = this._resolveParentFolderLocation($folder) !== null;

		$folder.find('.emuos-folder-btn-back, .emuos-folder-btn-back-dropdown').toggleClass('is-disabled', !canBack).attr('aria-disabled', canBack ? 'false' : 'true');
		$folder.find('.emuos-folder-btn-forward, .emuos-folder-btn-forward-dropdown').toggleClass('is-disabled', !canForward).attr('aria-disabled', canForward ? 'false' : 'true');
		$folder.find('.emuos-folder-btn-up').toggleClass('is-disabled', !canUp).attr('aria-disabled', canUp ? 'false' : 'true');
	};

	EmuOS.prototype._updateFolderSelectionButtons = function($folder) {
		var hasSelection = $folder.find('.emuos-folder-item.ui-selected').length > 0;

		$folder.find('.emuos-folder-btn-cut, .emuos-folder-btn-copy, .emuos-folder-btn-paste, .emuos-folder-btn-undo, .emuos-folder-btn-delete')
			.toggleClass('is-disabled', !hasSelection)
			.attr('aria-disabled', hasSelection ? 'false' : 'true');
	};

	EmuOS.prototype._navigateFolder = function($folder, location, action) {
		var history = $folder.data('folderHistory');

		if (!history) {
			history = { back: [], forward: [] };
			$folder.data('folderHistory', history);
		}

		var current = this._getFolderLocation($folder);

		if (action === 'go') {
			history.back.push(current);
			history.forward.length = 0;
		} else if (action === 'back') {
			if (!history.back.length) {
				return;
			}

			history.forward.unshift(current);
			location = history.back.pop();
		} else if (action === 'forward') {
			if (!history.forward.length) {
				return;
			}

			history.back.push(current);
			location = history.forward.shift();
		}

		this._applyFolderLocation($folder, location);
	};

	EmuOS.prototype._jumpFolderHistory = function($folder, direction, index) {
		var history = $folder.data('folderHistory') || { back: [], forward: [] };
		var current = this._getFolderLocation($folder);
		var stack = direction === 'back' ? history.back : history.forward;
		var target = stack[index];

		if (!target) {
			return;
		}

		if (direction === 'back') {
			history.forward = history.back.slice(index + 1).concat([current]).concat(history.forward);
			history.back = history.back.slice(0, index);
		} else {
			history.back = history.back.concat([current]).concat(history.forward.slice(0, index));
			history.forward = history.forward.slice(index + 1);
		}

		this._applyFolderLocation($folder, target);
	};

	EmuOS.prototype._initFolderNavigation = function($folder, location) {
		$folder.data('folderHistory', { back: [], forward: [] });
		$folder.data('folderHome', location);
		$folder.data('folderLocation', location);
		this._applyFolderLocation($folder, location);
	};

	EmuOS.prototype._bindFolderNavigation = function($folder, folderId, windowIcon) {
		var self = this;
		var namespace = '.emuosFolderNav' + folderId;
		var $historyMenu = null;

		var closeHistoryMenu = function() {
			if ($historyMenu) {
				$historyMenu.remove();
				$historyMenu = null;
			}
		};

		var openHistoryMenu = function($anchor, direction) {
			var history = $folder.data('folderHistory') || { back: [], forward: [] };
			var stack = direction === 'back' ? history.back.slice() : history.forward.slice();

			closeHistoryMenu();

			if (!stack.length) {
				return;
			}

			stack.reverse();

			$historyMenu = $('<div class="emuos-folder-views-menu emuos-folder-history-menu"></div>');

			for (var i = 0; i < stack.length; i++) {
				var entry = stack[i];
				var label = self._formatFolderAddress(entry.path);
				var stackIndex = stack.length - 1 - i;

				$historyMenu.append(
					'<button type="button" class="emuos-folder-history-item" data-direction="' + direction + '" data-index="' + stackIndex + '">' +
						$('<div/>').text(label).html() +
					'</button>'
				);
			}

			$folder.append($historyMenu);
			self._positionFolderDropdownMenu($folder, $anchor, $historyMenu);

			$historyMenu.on('click', '.emuos-folder-history-item', function() {
				self._jumpFolderHistory($folder, $(this).data('direction'), parseInt($(this).data('index'), 10));
				closeHistoryMenu();
				$folder.trigger('emuosFolderLocationChange');
			});
		};

		$folder.off('click' + namespace, '.emuos-folder-btn-back:not(.is-disabled)');
		$folder.on('click' + namespace, '.emuos-folder-btn-back:not(.is-disabled)', function(e) {
			e.preventDefault();
			e.stopPropagation();
			closeHistoryMenu();
			self._navigateFolder($folder, null, 'back');
			$folder.trigger('emuosFolderLocationChange');
		});

		$folder.off('click' + namespace, '.emuos-folder-btn-forward:not(.is-disabled)');
		$folder.on('click' + namespace, '.emuos-folder-btn-forward:not(.is-disabled)', function(e) {
			e.preventDefault();
			e.stopPropagation();
			closeHistoryMenu();
			self._navigateFolder($folder, null, 'forward');
			$folder.trigger('emuosFolderLocationChange');
		});

		$folder.off('click' + namespace, '.emuos-folder-btn-back-dropdown:not(.is-disabled)');
		$folder.on('click' + namespace, '.emuos-folder-btn-back-dropdown:not(.is-disabled)', function(e) {
			e.preventDefault();
			e.stopPropagation();
			closeHistoryMenu();
			openHistoryMenu($(this).closest('.emuos-folder-toolbar-compound'), 'back');
		});

		$folder.off('click' + namespace, '.emuos-folder-btn-forward-dropdown:not(.is-disabled)');
		$folder.on('click' + namespace, '.emuos-folder-btn-forward-dropdown:not(.is-disabled)', function(e) {
			e.preventDefault();
			e.stopPropagation();
			closeHistoryMenu();
			openHistoryMenu($(this).closest('.emuos-folder-toolbar-compound'), 'forward');
		});

		$folder.off('click' + namespace, '.emuos-folder-btn-up:not(.is-disabled)');
		$folder.on('click' + namespace, '.emuos-folder-btn-up:not(.is-disabled)', function(e) {
			var parent = self._resolveParentFolderLocation($folder);

			e.preventDefault();
			e.stopPropagation();
			closeHistoryMenu();

			if (parent) {
				self._navigateFolder($folder, parent, 'go');
				$folder.trigger('emuosFolderLocationChange');
			}
		});

		$(document).off('click.emuosFolderHistory' + folderId).on('click.emuosFolderHistory' + folderId, function(e) {
			if ($historyMenu && !$(e.target).closest('.emuos-folder-history-menu, .emuos-folder-toolbar-compound').length) {
				closeHistoryMenu();
			}
		});

		$folder.off('remove' + namespace).on('remove' + namespace, function() {
			closeHistoryMenu();
			$(document).off('click.emuosFolderHistory' + folderId);
			$folder.off(namespace);
		});
	};

	EmuOS.prototype._stripHtml = function(html) {
		if (typeof html !== 'string') {
			return '';
		}

		return html.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').replace(/\s+\n/g, '\n').trim();
	};

	EmuOS.prototype._formatSidebarCredits = function(credits) {
		if (typeof credits !== 'string' || credits === '') {
			return '';
		}

		credits = credits.replace(/^Collection:\s*(?:<a\b[^>]*>[\s\S]*?<\/a>|[^<]*)(?:\s*<br\s*\/?>\s*)+/i, '');

		var $wrap = $('<div/>').html(credits);

		$wrap.find('a[href]').each(function() {
			var href = this.getAttribute('href');

			if (href) {
				$(this).text(href);
			}
		});

		return $wrap.html();
	};

	EmuOS.prototype._setFolderSidebarDescription = function($folder, description) {
		var $description = $folder.find('.emuos-folder-sidebar-description').first();

		if (typeof description !== 'string' || description === '') {
			$description.hide().empty();
			return;
		}

		$description.html(description).show();
	};

	EmuOS.prototype._folderToolbarSpritePositions = [0, 1, 44, 21, 22, 23, 24, 26, 31, 38];

	EmuOS.prototype._folderToolbarSpriteStyle = function(spriteIndex) {
		return ' style="background-position:' + (-spriteIndex * 20) + 'px 0"';
	};

	EmuOS.prototype._setFolderToolbarIcons = function($folder) {
		var sprites = this._folderToolbarSpritePositions;

		$folder.find('.emuos-folder-toolbar-buttons .emuos-folder-toolbar-button').each(function(i) {
			if (typeof sprites[i] === 'undefined') {
				return;
			}

			$(this).find('> .emuos-folder-toolbar-icon').first().css('background-position', (-sprites[i] * 20) + 'px 0');
		});
	};

	EmuOS.prototype._formatFolderItemSize = function(item) {
		if (typeof item.sizeText === 'string') {
			return item.sizeText;
		}

		if (typeof item.size === 'number') {
			if (item.size >= 1048576) {
				return (item.size / 1048576).toFixed(2) + ' MB';
			}

			if (item.size >= 1024) {
				return Math.round(item.size / 1024) + ' KB';
			}

			return item.size + ' bytes';
		}

		return '';
	};

	EmuOS.prototype._getFolderItemType = function(item) {
		if (item.folder === true || Array.isArray(item.items)) {
			return 'File Folder';
		}

		if (typeof item.title === 'string' && item.title !== '') {
			return item.title;
		}

		if (typeof item.link === 'string') {
			if (~item.link.indexOf('youtube-nocookie.com') || ~item.link.indexOf('youtube.com')) {
				return 'YouTube Video';
			}

			if (item.link.indexOf('http') === 0) {
				return 'Internet Shortcut';
			}
		}

		return 'Application';
	};

	EmuOS.prototype._getFolderItemModified = function(item) {
		if (typeof item.modified === 'string' && item.modified !== '') {
			return item.modified;
		}

		if (typeof item.credits === 'string') {
			var match = item.credits.match(/Released:\s*([^<]+)/i);

			if (match) {
				return match[1].trim();
			}
		}

		return '';
	};

	EmuOS.prototype._getFolderIconViewMetrics = function(viewMode) {
		var metrics = {
			small: { size: 16, cell: 150, row: 17 },
			list: { size: 16, cell: 150, row: 17 },
			medium: { size: 32, cell: 72, row: 80 },
			large: { size: 64, cell: 96, row: 122 },
			extralarge: { size: 96, cell: 112, row: 140 },
			huge: { size: 128, cell: 148, row: 158 }
		};

		return metrics[viewMode] || metrics.large;
	};

	EmuOS.prototype._resolveFolderViewModeFromIconSize = function(iconSize) {
		var size = parseInt(iconSize, 10);

		if (isNaN(size) || size <= 16) {
			return 'small';
		}

		if (size <= 32) {
			return 'medium';
		}

		if (size <= 64) {
			return 'large';
		}

		if (size <= 96) {
			return 'extralarge';
		}

		return 'huge';
	};

	EmuOS.prototype._renderFolderItems = function($folder) {
		var self = this;
		var items = $folder.data('folderItems') || [];
		var viewMode = $folder.attr('data-view-mode') || 'large';
		var $items = $folder.find('.emuos-folder-items').first();
		var itemCount = 0;
		var iconMetrics = self._getFolderIconViewMetrics(viewMode);
		var size = iconMetrics.size;
		var cell = iconMetrics.cell;
		var row = iconMetrics.row;

		$items.empty().attr('data-view-mode', viewMode);

		if (viewMode === 'details') {
			var $details = $('<div class="emuos-folder-details"></div>');
			var $header = $('<div class="emuos-folder-details-header">' +
				'<span class="col-name">Name</span>' +
				'<span class="col-size">Size</span>' +
				'<span class="col-type">Type</span>' +
				'<span class="col-modified">Modified</span>' +
			'</div>');
			var $body = $('<div class="emuos-folder-details-body"></div>');

			$details.append($header).append($body);
			$items.append($details);

			for (var d = 0; d < items.length; d++) {
				var detailItem = items[d] || {};
				var detailIsFolder = detailItem.folder === true || Array.isArray(detailItem.items);
				var detailIcon = self._resolveIcon(detailItem.icon, detailIsFolder ? 'assets/images/icons/desktop/folder' : 'assets/images/icons/desktop/joystick');
				var detailName = typeof detailItem.name !== 'undefined' ? detailItem.name : 'Untitled';
				var detailIconClasses = 'icon overlay ribbon' + (detailItem.shortcut ? ' shortcut' : '') + (detailItem.prototype ? ' prototype' : '') + (detailItem.beta ? ' beta' : '') + (detailItem.new ? ' new' : '');
				var detailTitleAttr = detailItem.title ? ' data-title="' + detailItem.title + '"' : '';
				var detailSize = self._formatFolderItemSize(detailItem);
				var detailType = self._getFolderItemType(detailItem);
				var detailModified = self._getFolderItemModified(detailItem);
				var $row = $('<a class="emuos-folder-item emuos-folder-details-row" href="javascript:"' + detailTitleAttr + '>' +
					'<span class="col-name"><i class="' + detailIconClasses + '"></i><span class="label"></span></span>' +
					'<span class="col-size"></span>' +
					'<span class="col-type"></span>' +
					'<span class="col-modified"></span>' +
				'</a>');

				$row.find('i.icon').css('background-image', 'url(' + detailIcon + ($sys.browser.isIE ? '.png' : '.ico') + ')');
				$row.find('.label').text(detailName);
				$row.find('.col-size').text(detailSize !== '' ? detailSize : detailIsFolder ? '' : '—');
				$row.find('.col-type').text(detailType);
				$row.find('.col-modified').text(detailModified !== '' ? detailModified : '—');
				$row.data('item', detailItem);
				$body.append($row);
				itemCount++;
			}
		} else {
			$folder.get(0).style.setProperty('--folder-icon-size', size + 'px');
			$folder.get(0).style.setProperty('--folder-cell-width', cell + 'px');
			$folder.get(0).style.setProperty('--folder-row-height', row + 'px');

			for (var i = 0; i < items.length; i++) {
				var item = items[i] || {};
				var isFolder = item.folder === true || Array.isArray(item.items);
				var itemIcon = self._resolveIcon(item.icon, isFolder ? 'assets/images/icons/desktop/folder' : 'assets/images/icons/desktop/joystick');
				var itemName = typeof item.name !== 'undefined' ? item.name : 'Untitled';
				var iconClasses = 'icon overlay ribbon' + (item.shortcut ? ' shortcut' : '') + (item.prototype ? ' prototype' : '') + (item.beta ? ' beta' : '') + (item.new ? ' new' : '');
				var titleAttr = item.title ? ' data-title="' + item.title + '"' : '';
				var $item = $('<a class="emuos-folder-item" href="javascript:"' + titleAttr + '><i class="' + iconClasses + '"></i><span></span></a>');

				$item.find('i.icon').css('background-image', 'url(' + itemIcon + ($sys.browser.isIE ? '.png' : '.ico') + ')');
				$item.find('span').text(itemName);
				$item.data('item', item);
				$items.append($item);
				itemCount++;
			}
		}

		$folder.find('.emuos-folder-status-left').first().text(itemCount + ' object(s)');
		this._updateFolderSelectionButtons($folder);
	};

	EmuOS.prototype._setFolderViewMode = function($folder, mode) {
		$folder.attr('data-view-mode', mode);
		this._renderFolderItems($folder);
	};

	EmuOS.prototype._buildFolderToolbarButton = function(className, label, spriteIndex) {
		return '<button type="button" class="emuos-folder-toolbar-button lightweight ' + className + '" title="' + label + '">' +
			'<span class="emuos-folder-toolbar-icon"' + this._folderToolbarSpriteStyle(spriteIndex) + '></span>' +
			'<span class="emuos-folder-toolbar-label">' + label + '</span>' +
		'</button>';
	};

	EmuOS.prototype._buildFolderToolbarSplitButton = function(mainClassName, label, dropdownClassName, spriteIndex) {
		return '<div class="emuos-folder-toolbar-compound">' +
			'<button type="button" class="emuos-folder-toolbar-button lightweight ' + mainClassName + '" title="' + label + '">' +
				'<span class="emuos-folder-toolbar-icon"' + this._folderToolbarSpriteStyle(spriteIndex) + '></span>' +
				'<span class="emuos-folder-toolbar-label">' + label + '</span>' +
			'</button>' +
			'<button type="button" class="emuos-folder-toolbar-dropdown lightweight ' + dropdownClassName + '" title="' + label + '" aria-haspopup="true">' +
				'<svg class="emuos-folder-toolbar-dropdown-icon" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
					'<path transform="rotate(90 8 8)" d="m6 4 4 4-4 4z"></path>' +
				'</svg>' +
			'</button>' +
		'</div>';
	};

	EmuOS.prototype._cycleFolderViewMode = function($folder) {
		var modes = ['huge', 'extralarge', 'large', 'medium', 'small', 'list', 'details'];
		var current = $folder.attr('data-view-mode') || 'large';
		var index = modes.indexOf(current);
		var nextIndex = index === -1 ? 0 : (index + 1) % modes.length;

		this._setFolderViewMode($folder, modes[nextIndex]);
	};

	EmuOS.prototype._fitMessageBoxWindow = function($win) {
		var $box = $win.find('.emuos-message-box').first();
		var $titlebar = $win.find('.ui-dialog-titlebar').first();

		if (!$box.length) {
			return;
		}

		$win.css('width', 'auto');
		$box.css('width', 'max-content');
		var contentWidth = Math.ceil($box.outerWidth(true));
		var contentHeight = Math.ceil($box.outerHeight(true));
		var titlebarHeight = $titlebar.length ? $titlebar.outerHeight() : 0;
		var chromeWidth = Math.max(0, $win.outerWidth() - $win.width());
		var chromeHeight = Math.max(0, $win.outerHeight() - $win.height());
		var width = Math.min(400, contentWidth + chromeWidth);
		var height = titlebarHeight + contentHeight + chromeHeight;

		$win.window('option', {
			width: width,
			height: height
		});
		$box.css('width', '100%');
	};

	EmuOS.prototype._playMessageBoxSound = function() {
		if (!messageBoxChordAudio) {
			messageBoxChordAudio = new Audio('assets/sounds/CHORD.WAV');
		}

		try {
			messageBoxChordAudio.currentTime = 0;
			var playPromise = messageBoxChordAudio.play();

			if (playPromise && typeof playPromise.catch === 'function') {
				playPromise.catch(function(error) {
					console.log('Failed to play ' + messageBoxChordAudio.src + ': ', error);
				});
			}
		} catch (error) {
			console.log('Failed to play ' + messageBoxChordAudio.src + ': ', error);
		}
	};

	EmuOS.prototype.messageBox = function(options) {
		var self = this;
		var title = typeof options.title !== 'undefined' ? options.title : 'EmuOS';
		var message = typeof options.message !== 'undefined' ? options.message : '';
		var icon = typeof options.icon !== 'undefined' ? options.icon : 'error';
		var iconUrl = 'assets/images/icons/' + icon + '-32x32.svg';
		var escapedMessage = $('<div/>').text(message).html();
		var content = '' +
			'<div class="emuos-message-box">' +
				'<div class="emuos-message-box-body">' +
					'<img class="emuos-message-box-icon" width="32" height="32" src="' + iconUrl + '" alt="">' +
					'<p class="emuos-message-box-text">' + escapedMessage + '</p>' +
				'</div>' +
				'<div class="emuos-message-box-buttons">' +
					'<button type="button" class="emuos-message-box-ok">OK</button>' +
				'</div>' +
			'</div>';
		var windowIcon = typeof options.windowIcon !== 'undefined' ? options.windowIcon : 'assets/images/icons/desktop/folder-open';

		self._playMessageBoxSound();

		var instance = self.window({
			title: title,
			icon: windowIcon,
			content: content,
			width: 'auto',
			height: 'auto',
			widgetClass: 'emuos-message-box-window-preparing',
			position: {
				my: 'center',
				at: 'center',
				of: self.$window.get(0),
				collision: 'fit'
			}
		});
		var $win = instance.element;

		$win.window('option', {
			maximizable: false,
			minimizable: false,
			resizable: false,
			minHeight: null,
			minWidth: null,
			height: 'auto'
		});
		$win.find('.emuos-window-content').first().addClass('emuos-message-box-window');

		var $ok = $win.find('.emuos-message-box-ok').first();

		$ok.on('click', function() {
			$win.window('close');
		});

		self._fitMessageBoxWindow($win);
		$win.window('refreshPosition');
		$win.window('option', 'widgetClass', '');
		$ok.trigger('focus');

		return instance;
	};

	EmuOS.prototype._folderMenuNotSupported = function(title, windowIcon) {
		this.messageBox({
			title: title,
			message: 'Not supported.',
			icon: 'error',
			windowIcon: windowIcon
		});
	};

	EmuOS.prototype._getFolderItemContextMenu = function(item) {
		var self = this;
		var isFolder = item && (item.folder === true || Array.isArray(item.items));

		return [
			{
				title: self._formatFolderMenuLabel('E&xplore'),
				cmd: 'explore',
				addClass: isFolder ? 'emuos-folder-context-menu-default' : ''
			},
			{
				title: self._formatFolderMenuLabel('&Open'),
				cmd: 'open',
				addClass: !isFolder ? 'emuos-folder-context-menu-default' : ''
			},
			{ title: '----' },
			{ title: self._formatFolderMenuLabel('&Find...'), cmd: 'find' },
			{ title: self._formatFolderMenuLabel('Scan for &Viruses'), cmd: 'scan-viruses' },
			{ title: self._formatFolderMenuLabel('Add to &Zip'), cmd: 'add-to-zip' },
			{ title: '----' },
			{ title: self._formatFolderMenuLabel('S&haring...'), cmd: 'sharing' },
			{ title: '----' },
			{
				title: self._formatFolderMenuLabel('Send &To'),
				cmd: 'send-to',
				children: [
					{ title: self._formatFolderMenuLabel('&Desktop'), cmd: 'send-to-desktop' },
					{ title: self._formatFolderMenuLabel('3½ Floppy (A:)'), cmd: 'send-to-floppy' },
					{ title: self._formatFolderMenuLabel('&Mail Recipient'), cmd: 'send-to-mail' }
				]
			},
			{ title: '----' },
			{ title: self._formatFolderMenuLabel('Cu&t'), cmd: 'cut' },
			{ title: self._formatFolderMenuLabel('&Copy'), cmd: 'copy' },
			{ title: '----' },
			{ title: self._formatFolderMenuLabel('Create &Shortcut'), cmd: 'create-shortcut' },
			{ title: self._formatFolderMenuLabel('&Delete'), cmd: 'delete' },
			{ title: self._formatFolderMenuLabel('Rena&me'), cmd: 'rename' },
			{ title: '----' },
			{ title: self._formatFolderMenuLabel('P&roperties'), cmd: 'properties' }
		];
	};

	EmuOS.prototype._activateFolderItem = function($folder, item, action) {
		var self = this;
		var name = typeof item.name !== 'undefined' ? item.name : 'Untitled';
		var hasItems = Array.isArray(item.items);
		var isFolder = item.folder === true || hasItems;
		var currentPath = self._getFolderLocation($folder).path || '';
		var normalizedPath = currentPath ? currentPath + '\\' + name : name;
		var itemIcon = self._resolveIcon(item.icon, isFolder ? 'assets/images/icons/desktop/folder' : 'assets/images/icons/desktop/joystick');

		if (action === 'explore') {
			if (isFolder) {
				self._launchFolderItem(item, currentPath);
			}

			return;
		}

		if (isFolder) {
			self._navigateFolder($folder, {
				path: normalizedPath,
				title: name,
				icon: itemIcon,
				items: hasItems ? item.items : [],
				description: typeof item.description === 'string' ? item.description : ''
			}, 'go');
			$folder.trigger('emuosFolderLocationChange');
			return;
		}

		self._launchFolderItem(item, currentPath);
	};

	EmuOS.prototype._getWin9xStartMenuItems = function() {
		return [{
			name: 'Windows Update',
			icon: 'update',
			mnemonic: 'U'
		}, {
			separator: true
		}, {
			name: 'Programs',
			icon: 'programs',
			mnemonic: 'P',
			hasSubmenu: true,
			submenu: [{
				name: 'StartUp',
				icon: 'programs-small',
				mnemonic: 'S'
			}]
		}, {
			name: 'Favorites',
			icon: 'favorites',
			mnemonic: 'F',
			hasSubmenu: true,
			submenu: []
		}, {
			name: 'Documents',
			icon: 'documents',
			mnemonic: 'D',
			hasSubmenu: true,
			submenu: [{
				name: 'My Documents',
				icon: 'folder',
				mnemonic: 'M'
			}]
		}, {
			name: 'Settings',
			icon: 'settings',
			mnemonic: 'S',
			hasSubmenu: true,
			submenu: [{
				name: 'Control Panel',
				icon: 'controlpanel',
				mnemonic: 'C'
			}]
		}, {
			name: 'Find',
			icon: 'find',
			mnemonic: 'F',
			hasSubmenu: true,
			submenu: []
		}, {
			name: 'Help',
			icon: 'help',
			mnemonic: 'H'
		}, {
			name: 'Run',
			icon: 'run',
			mnemonic: 'R'
		}, {
			separator: true
		}, {
			name: 'Log Off Guest...',
			icon: 'logoff',
			mnemonic: 'L'
		}, {
			name: 'Shut Down...',
			icon: 'shutdown',
			mnemonic: 'u'
		}];
	};

	EmuOS.prototype._formatStartMenuLabel = function(name, mnemonic) {
		if (!mnemonic || !name) {
			return name || '';
		}

		var index = -1;
		var nameLower = name.toLowerCase();
		var mnemonicLower = mnemonic.toLowerCase();
		var startAt = 0;

		while (startAt < name.length) {
			index = nameLower.indexOf(mnemonicLower, startAt);

			if (index === -1) {
				break;
			}

			if (name[index] === '&') {
				startAt = index + 1;
				continue;
			}

			return name.slice(0, index) +
				'<span class="emuos-start-menu-mnemonic">' + name.charAt(index) + '</span>' +
				name.slice(index + 1);
		}

		return name;
	};

	EmuOS.prototype._appendStartMenuItemHtml = function(items) {
		var html = '';
		var self = this;

		for (var i = 0; i < items.length; i++) {
			var item = items[i];

			if (item.separator) {
				html += '<li class="ui-menu-divider"></li>';
				continue;
			}

			html += '<li';

			if (item.icon) {
				html += ' data-start-icon="' + item.icon + '"';
			}

			if (item.disabled) {
				html += ' class="ui-state-disabled" aria-disabled="true"';
			}

			html += '><span class="emuos-start-menu-item-text">' + self._formatStartMenuLabel(item.name, item.mnemonic) + '</span>';

			if ((item.submenu && item.submenu.length) || item.hasSubmenu) {
				html += '<ul>';

				if (item.submenu && item.submenu.length) {
					html += self._appendStartMenuItemHtml(item.submenu);
				} else {
					html += '<li class="ui-state-disabled emuos-start-menu-empty-item" aria-disabled="true">' +
						'<span class="emuos-start-menu-item-text">(Empty)</span></li>';
				}

				html += '</ul>';
			}

			html += '</li>';
		}

		return html;
	};

	EmuOS.prototype._buildStartMenuHtml = function() {
		var items = this.options.start;

		if (!items || !items.length) {
			return '';
		}

		return '<ul data-menu-lang="*" data-menu-type="start" class="emuos-start-menu">' +
			this._appendStartMenuItemHtml(items) +
			'</ul>';
	};

	EmuOS.prototype._decorateFolderContextMenu = function($menu) {
		$menu.addClass('emuos-folder-menu emuos-folder-context-menu');
		$menu.find('ul.ui-menu').addClass('emuos-folder-menu');

		$menu.find('.ui-menu-item').each(function() {
			var $li = $(this);
			var $wrapper;

			if ($li.hasClass('ui-menu-divider')) {
				return;
			}

			$wrapper = $li.children('.ui-menu-item-wrapper').first();

			if (!$wrapper.length) {
				$wrapper = $li.children('div, a').first();
			}

			if (!$wrapper.length || $wrapper.find('.emuos-folder-menu-label').length) {
				return;
			}

			var labelHtml = $wrapper.html();

			$wrapper.children('.ui-icon').remove();
			$wrapper.empty().append(
				'<span class="emuos-folder-menu-checkbox-area" aria-hidden="true"></span>',
				$('<span class="emuos-folder-menu-label"></span>').html(labelHtml)
			);

			if ($li.children('ul').length) {
				$li.addClass('emuos-folder-menu-has-submenu');
			}
		});

		this._syncFolderMenuSubmenuArrows($menu);
	};

	EmuOS.prototype._decorateDesktopContextMenu = function($menu) {
		this._decorateFolderContextMenu($menu);
		$menu.addClass('emuos-desktop-context-menu');
		this._syncDesktopContextMenuStates($menu);
	};

	EmuOS.prototype._syncDesktopContextMenuStates = function($menu) {
		var self = this;
		var themeCommands = {
			basic: 'theme-basic',
			'windows-3': 'theme-windows-3',
			'windows-95': 'theme-windows-95',
			'windows-98': 'theme-windows-98',
			'windows-me': 'theme-windows-me'
		};
		var iconSizeCommands = [
			'view-huge-icons',
			'view-extra-large-icons',
			'view-large-icons',
			'view-medium-icons',
			'view-small-icons'
		];
		var currentIconSizeCmd = self._getDesktopIconSizeCommand();

		$menu.find('li[data-command]').each(function() {
			var $item = $(this);
			var cmd = $item.attr('data-command');
			var $checkbox = $item.find('.emuos-folder-menu-checkbox-area').first();

			if (iconSizeCommands.indexOf(cmd) !== -1) {
				$item
					.addClass('emuos-folder-menu-radio')
					.removeClass('emuos-folder-menu-checkable')
					.attr('aria-checked', cmd === currentIconSizeCmd ? 'true' : 'false');
				$checkbox.addClass('radio');
				return;
			}

			if (cmd === 'view-auto-arrange' || cmd === 'view-align-grid' || cmd === 'view-show-icons') {
				var checked = false;

				if (cmd === 'view-auto-arrange') {
					checked = self.desktopAutoArrange;
				} else if (cmd === 'view-align-grid') {
					checked = self.desktopAlignGrid;
				} else if (cmd === 'view-show-icons') {
					checked = self.desktopShowIcons !== false;
				}

				$item
					.addClass('emuos-folder-menu-checkable')
					.removeClass('emuos-folder-menu-radio')
					.attr('aria-checked', checked ? 'true' : 'false');
				$checkbox.removeClass('radio');
				return;
			}

			if (cmd === 'toggle-folders') {
				$item
					.addClass('emuos-folder-menu-checkable')
					.removeClass('emuos-folder-menu-radio')
					.attr('aria-checked', self.useFolders ? 'true' : 'false');
				$checkbox.removeClass('radio');
				return;
			}

			if (themeCommands[cmd]) {
				$item
					.addClass('emuos-folder-menu-radio')
					.removeClass('emuos-folder-menu-checkable')
					.attr('aria-checked', self.$html.hasClass(themeCommands[cmd]) ? 'true' : 'false');
				$checkbox.addClass('radio');
			}
		});
	};

	EmuOS.prototype._bindFolderItemContextMenu = function($folder, options) {
		var self = this;
		var folderId = options.folderId;
		var windowTitle = options.title;
		var windowIcon = options.icon;
		var onSelectItem = options.onSelectItem;

		if ($folder.data('folderItemContextMenuBound')) {
			return;
		}

		$folder.contextmenu({
			delegate: '.emuos-folder-item',
			addClass: 'ui-contextmenu emuos-folder-menu emuos-folder-context-menu',
			show: { effect: 'show', duration: 0 },
			hide: { effect: 'hide', duration: 0 },
			menu: [],
			beforeOpen: function(event, ui) {
				var $target = $(ui.target).closest('.emuos-folder-item');

				if (!$target.length) {
					return false;
				}

				if (typeof onSelectItem === 'function') {
					onSelectItem($target);
				}

				$(this).contextmenu('replaceMenu', self._getFolderItemContextMenu($target.data('item') || {}));
			},
			open: function(event, ui) {
				var $menu = ui.menu;

				self._decorateFolderContextMenu($menu);
				$menu.width($menu.outerWidth());
			},
			select: function(e, ui) {
				var item = ui.target.data('item') || {};

				switch (ui.cmd) {
					case 'explore':
						if (item.folder === true || Array.isArray(item.items)) {
							self._activateFolderItem($folder, item, 'explore');
						} else {
							self._folderMenuNotSupported(windowTitle, windowIcon);
						}
						break;
					case 'open':
						self._activateFolderItem($folder, item, 'open');
						break;
					default:
						self._folderMenuNotSupported(windowTitle, windowIcon);
						break;
				}

				return true;
			}
		});

		$folder.data('folderItemContextMenuBound', true);
	};

	EmuOS.prototype._formatFolderMenuLabel = function(label) {
		if (!label) {
			return '';
		}

		return String(label)
			.replace(/&([^&\s])/g, '<span class="emuos-folder-menu-mnemonic">$1</span>')
			.replace(/&&/g, '&');
	};

	EmuOS.prototype._formatFolderMenuButtonLabel = function(label) {
		if (!label) {
			return '';
		}

		return String(label).replace(/&([^&\s])/g, '$1').replace(/&&/g, '&');
	};

	EmuOS.prototype._isFolderMenuItemEnabled = function(item) {
		if (!item || item.divider) {
			return true;
		}

		if (typeof item.enabled === 'function') {
			return item.enabled();
		}

		if (typeof item.enabled === 'boolean') {
			return item.enabled;
		}

		return true;
	};

	EmuOS.prototype._appendFolderMenuItem = function($ul, item) {
		var self = this;
		var $li;
		var $div;

		if (!item) {
			return;
		}

		if (item.divider) {
			$ul.append('<li class="ui-menu-divider"></li>');
			return;
		}

		if (item.radioItems) {
			$.each(item.radioItems, function(_, radioItem) {
				self._appendFolderMenuItem($ul, $.extend({}, radioItem, {
					radioGroup: item
				}));
			});
			return;
		}

		$li = $('<li></li>');
		$div = $('<div></div>');
		$div.append(
			'<span class="emuos-folder-menu-checkbox-area' + (item.radioGroup ? ' radio' : '') + '" aria-hidden="true"></span>'
		);
		$div.append(
			$('<span class="emuos-folder-menu-label"></span>').html(self._formatFolderMenuLabel(item.label || ''))
		);

		if (item.description) {
			$li.attr('data-description', item.description);
		}

		if (item.shortcutLabel) {
			$div.append($('<span class="emuos-folder-menu-shortcut"></span>').text(item.shortcutLabel));
		}

		if (item.checkbox) {
			$li.addClass('emuos-folder-menu-checkable');
		} else if (item.radioGroup) {
			$li.addClass('emuos-folder-menu-radio');
		}

		if (!self._isFolderMenuItemEnabled(item)) {
			$li.addClass('ui-state-disabled');
		}

		$li.data('folderMenuItem', item);
		$li.append($div);

		if (item.submenu && item.submenu.length) {
			$li.addClass('emuos-folder-menu-has-submenu');
			$li.append(self._buildFolderMenuList(item.submenu));
		}

		$ul.append($li);
	};

	EmuOS.prototype._buildFolderMenuList = function(items) {
		var self = this;
		var $ul = $('<ul></ul>');

		$.each(items, function(_, item) {
			self._appendFolderMenuItem($ul, item);
		});

		return $ul;
	};

	EmuOS.prototype._syncFolderMenuSubmenuArrows = function($menu) {
		$menu.find('li').each(function() {
			var $item = $(this);

			if ($item.hasClass('ui-menu-divider')) {
				return;
			}

			$item.toggleClass('emuos-folder-menu-has-submenu', $item.children('ul').length > 0);
			$item.children('.ui-menu-icon').remove();
			$item.children('.ui-menu-item-wrapper, div, a').first().find('.ui-menu-icon').remove();
		});
	};

	EmuOS.prototype._refreshFolderMenuStates = function($menu) {
		var self = this;

		$menu.find('.ui-menu-item').each(function() {
			var $item = $(this);
			var item = $item.data('folderMenuItem');
			var checked;

			if (!item) {
				return;
			}

			$item.toggleClass('ui-state-disabled', !self._isFolderMenuItemEnabled(item));

			if (item.checkbox || item.radioGroup) {
				checked = item.checkbox ? !!item.checkbox.check() : item.radioGroup.getValue() === item.value;
				$item.attr('aria-checked', checked ? 'true' : 'false');
			} else {
				$item.removeAttr('aria-checked');
			}
		});

		self._syncFolderMenuSubmenuArrows($menu);
	};

	EmuOS.prototype._getFolderViewsMenuItems = function($folder) {
		var self = this;

		return [
			{
				label: 'as &Web Page',
				checkbox: {
					check: function() {
						return $folder.attr('data-web-view') === 'true';
					},
					toggle: function() {
						var enabled = $folder.attr('data-web-view') !== 'true';

						$folder.attr('data-web-view', enabled ? 'true' : 'false');
					}
				},
				description: 'Displays items in Web View.'
			},
			{ divider: true },
			{
				radioItems: [
					{
						label: 'Hu&ge Icons',
						value: 'huge',
						description: 'Displays items using huge icons (128 x 128).'
					},
					{
						label: 'E&xtra Large Icons',
						value: 'extralarge',
						description: 'Displays items using extra large icons (96 x 96).'
					},
					{
						label: 'Lar&ge Icons',
						value: 'large',
						description: 'Displays items by using large icons (64 x 64).'
					},
					{
						label: '&Medium Icons',
						value: 'medium',
						description: 'Displays items by using medium icons (32 x 32).'
					},
					{
						label: 'S&mall Icons',
						value: 'small',
						description: 'Displays items by using small icons (16 x 16).'
					},
					{
						label: '&List',
						value: 'list',
						description: 'Displays items in a list.'
					},
					{
						label: '&Details',
						value: 'details',
						description: 'Displays information about each item in the window.'
					}
				],
				getValue: function() {
					return $folder.attr('data-view-mode') || 'large';
				},
				setValue: function(viewMode) {
					self._setFolderViewMode($folder, viewMode);
				}
			}
		];
	};

	EmuOS.prototype._buildFolderMenuDefinitions = function($folder, title, windowIcon) {
		var self = this;
		var viewsMenuItems = self._getFolderViewsMenuItems($folder);

		return {
			'&File': [
				{
					label: '&New',
					submenu: [
						{ label: '&Folder', enabled: false },
						{ label: '&Shortcut', enabled: false },
						{ divider: true },
						{ label: 'Text Document', enabled: false },
						{ label: 'WordPad Document', enabled: false },
						{ label: 'Bitmap Image', enabled: false },
						{ label: 'Wave Sound', enabled: false },
						{ label: 'Microsoft Data Link', enabled: false }
					]
				},
				{ divider: true },
				{
					label: 'Create &Shortcut',
					enabled: false,
					description: 'Creates shortcuts to the selected items.'
				},
				{
					label: '&Delete',
					enabled: false,
					description: 'Deletes the selected items.'
				},
				{
					label: 'Rena&me',
					enabled: false,
					description: 'Renames the selected item.'
				},
				{
					label: 'P&roperties',
					action: function() {
						self._folderMenuNotSupported(title, windowIcon);
					},
					description: 'Displays the properties of the selected items.'
				},
				{ divider: true },
				{
					label: '&Work Offline',
					checkbox: {
						check: function() {
							return $folder.attr('data-work-offline') === 'true';
						},
						toggle: function() {
							var enabled = $folder.attr('data-work-offline') !== 'true';
							$folder.attr('data-work-offline', enabled ? 'true' : 'false');
						}
					},
					description: 'Shows Web pages without downloading them.'
				},
				{
					label: '&Close',
					action: function() {
						self._getFolderWindowWidget($folder).window('close');
					},
					description: 'Closes the window.'
				}
			],
			'&Edit': [
				{
					label: '&Undo',
					enabled: false
				},
				{ divider: true },
				{
					label: 'Cu&t',
					shortcutLabel: 'Ctrl+X',
					enabled: false,
					description: 'Removes the selected items and copies them onto the Clipboard.'
				},
				{
					label: '&Copy',
					shortcutLabel: 'Ctrl+C',
					enabled: false,
					description: 'Copies the selected items to the Clipboard. To put them in the new location, use the Paste command.'
				},
				{
					label: '&Paste',
					shortcutLabel: 'Ctrl+V',
					enabled: false,
					description: 'Inserts the items you have copied or cut into the selected location.'
				},
				{
					label: 'Paste &Shortcut',
					enabled: false,
					description: 'Creates shortcuts to the items you have copied or cut into the selected location.'
				},
				{ divider: true },
				{
					label: 'Select &All',
					shortcutLabel: 'Ctrl+A',
					action: function() {
						$folder.find('.emuos-folder-item').addClass('ui-selected');
						$folder.find('.emuos-folder-items').first().trigger('focus');
						self._updateFolderSelectionButtons($folder);
					},
					description: 'Selects all items in window.'
				},
				{
					label: '&Invert Selection',
					action: function() {
						$folder.find('.emuos-folder-item').toggleClass('ui-selected');
						$folder.find('.emuos-folder-items').first().trigger('focus');
						self._updateFolderSelectionButtons($folder);
					},
					description: 'Reverses which items are selected and which are not.'
				}
			],
			'&View': [
				{
					label: '&Toolbars',
					submenu: [
						{
							label: '&Standard Buttons',
							checkbox: {
								check: function() {
									return $folder.find('.emuos-folder-toolbar-row.emuos-folder-toolbar').is(':visible');
								},
								toggle: function() {
									$folder.find('.emuos-folder-toolbar-row.emuos-folder-toolbar').toggle();
								}
							},
							description: 'Displays the Standard Buttons toolbar.'
						},
						{
							label: '&Address Bar',
							checkbox: {
								check: function() {
									return $folder.find('.emuos-folder-toolbar-row.emuos-folder-addressbar').is(':visible');
								},
								toggle: function() {
									$folder.find('.emuos-folder-toolbar-row.emuos-folder-addressbar').toggle();
								}
							},
							description: 'Displays the Address bar.'
						},
						{
							label: '&Links',
							enabled: false,
							description: 'Displays the Quick Links bar.'
						},
						{
							label: '&Radio',
							enabled: false
						},
						{ divider: true },
						{
							label: '&Text Labels',
							checkbox: {
								check: function() {
									return !$folder.hasClass('emuos-folder-hide-toolbar-labels');
								},
								toggle: function() {
									$folder.toggleClass('emuos-folder-hide-toolbar-labels');
								}
							},
							description: 'Adds a text label under each toolbar button.'
						}
					],
					description: 'Shows or hides toolbars.'
				},
				{
					label: 'Status &Bar',
					checkbox: {
						check: function() {
							return $folder.find('.emuos-folder-status').is(':visible');
						},
						toggle: function() {
							$folder.find('.emuos-folder-status').toggle();
						}
					},
					description: 'Shows or hides the status bar.'
				},
				{ divider: true },
				viewsMenuItems[0],
				viewsMenuItems[1],
				viewsMenuItems[2],
				{ divider: true },
				{
					label: '&Refresh',
					shortcutLabel: 'F5',
					action: function() {
						self._renderFolderItems($folder);
					},
					description: 'Refreshes the contents of the current pane.'
				},
				{
					label: 'Folder &Options...',
					enabled: false,
					description: 'Enables you to change settings.'
				}
			],
			'&Go': [
				{
					label: '&Back',
					shortcutLabel: 'Alt+Left Arrow',
					action: function() {
						self._navigateFolder($folder, null, 'back');
						$folder.trigger('emuosFolderLocationChange');
					},
					enabled: function() {
						var history = $folder.data('folderHistory') || { back: [] };
						return history.back.length > 0;
					},
					description: 'Goes to the previous page.'
				},
				{
					label: '&Forward',
					shortcutLabel: 'Alt+Right Arrow',
					action: function() {
						self._navigateFolder($folder, null, 'forward');
						$folder.trigger('emuosFolderLocationChange');
					},
					enabled: function() {
						var history = $folder.data('folderHistory') || { forward: [] };
						return history.forward.length > 0;
					},
					description: 'Goes to the next page.'
				},
				{
					label: '&Up One Level',
					action: function() {
						var parentLocation = self._resolveParentFolderLocation($folder);

						if (parentLocation) {
							self._navigateFolder($folder, parentLocation, 'go');
							$folder.trigger('emuosFolderLocationChange');
						}
					},
					enabled: function() {
						return self._resolveParentFolderLocation($folder) !== null;
					},
					description: 'Goes up one level.'
				}
			],
			'F&avorites': [
				{
					label: '&Add to Favorites...',
					enabled: false,
					description: 'Adds the current page to your Favorites list.'
				},
				{
					label: '&Organize Favorites...',
					enabled: false,
					description: 'Opens the Favorites folder.'
				},
				{ divider: true },
				{
					label: '(Empty)',
					enabled: false
				}
			],
			'&Tools': [
				{
					label: '&Find',
					submenu: [
						{ label: '&Files or Folders...', enabled: false },
						{ label: '&Computer...', enabled: false },
						{ label: 'On the &Internet...', enabled: false }
					]
				},
				{ divider: true },
				{
					label: 'Map &Network Drive...',
					enabled: false,
					description: 'Connects to a network drive.'
				},
				{
					label: '&Disconnect Network Drive...',
					enabled: false,
					description: 'Disconnects from a network drive.'
				},
				{
					label: '&Synchronize...',
					enabled: false,
					description: 'Updates all offline content.'
				}
			],
			'&Help': [
				{
					label: '&Help Topics',
					enabled: false,
					description: 'Opens Help.'
				},
				{ divider: true },
				{
					label: '&About EmuOS',
					action: function() {
						self._folderMenuNotSupported(title, windowIcon);
					},
					description: 'Displays program information, version number, and copyright.'
				}
			]
		};
	};

	EmuOS.prototype._initFolderMenuBar = function($folder, folderId, title, windowIcon, $statusMiddle) {
		if (!$.fn.menu) {
			return;
		}

		var self = this;
		var namespace = '.emuosFolderMenu' + folderId;
		var menuDefinitions = self._buildFolderMenuDefinitions($folder, title, windowIcon);
		var $menubar = $folder.find('.emuos-folder-menubar-items').first();
		var $windowFrame = $folder.closest('.emuos-window').first();
		var $menus = $();
		var $activeButton = $();
		var $activeMenu = $();

		var decorateFolderMenuTree = function($menu) {
			$menu.addClass('emuos-folder-menu');
			$menu.find('ul.ui-menu').addClass('emuos-folder-menu');
		};

		var closeMenus = function() {
			$menus.filter(':visible').each(function() {
				var $menu = $(this);

				try {
					$menu.menu('collapseAll', true);
				} catch (e) {}

				$menu.hide();
			});

			$menubar.find('.emuos-folder-menubar-item').removeClass('ui-state-active');
			$activeButton = $();
			$activeMenu = $();
			$statusMiddle.text('');
		};

		var openMenu = function($button, $menu) {
			var wasVisible = $menu.is(':visible') && $activeMenu[0] === $menu[0];

			closeMenus();

			if (wasVisible) {
				return;
			}

			self._refreshFolderMenuStates($menu);
			$menu.menu('refresh');
			decorateFolderMenuTree($menu);
			self._syncFolderMenuSubmenuArrows($menu);

			$button.addClass('ui-state-active');
			$activeButton = $button;
			$activeMenu = $menu;

			$menu.show().css('zIndex', (parseInt($windowFrame.css('zIndex'), 10) || 100) + 20);

			$menu.width($menu.outerWidth());

			$menu.position({
				my: 'left top',
				at: 'left bottom',
				of: $button,
				collision: 'fit flip'
			});
		};

		$menubar.empty();

		$.each(menuDefinitions, function(menuKey, items) {
			var menuId = folderId + '-menu-' + menuKey.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
			var $button = $('<button type="button" class="emuos-folder-menubar-item lightweight"></button>')
				.text(self._formatFolderMenuButtonLabel(menuKey))
				.attr('data-folder-menu-id', menuId)
				.appendTo($menubar);
			var $menu = self._buildFolderMenuList(items)
				.addClass('emuos-folder-menu')
				.attr('id', menuId)
				.hide()
				.appendTo($folder);

			$menus = $menus.add($menu);

			$menu.menu({
				role: 'menu',
				focus: function(event, ui) {
					var description = ui.item.attr('data-description') || '';

					$statusMiddle.text(description);
				},
				blur: function() {
					if (!$menus.filter(':visible').length) {
						$statusMiddle.text('');
					}
				},
				select: function(event, ui) {
					var $item = ui.item;
					var item = $item.data('folderMenuItem');

					if (!item || $item.hasClass('ui-state-disabled')) {
						event.preventDefault();
						return false;
					}

					if (item.submenu && item.submenu.length) {
						return;
					}

					if (item.checkbox) {
						item.checkbox.toggle();
						self._refreshFolderMenuStates($menu);
						$menu.menu('refresh');
						event.preventDefault();
						return false;
					}

					if (item.radioGroup) {
						item.radioGroup.setValue(item.value);
						self._refreshFolderMenuStates($menu);
						$menu.menu('refresh');
						event.preventDefault();
						return false;
					}

					if (typeof item.action === 'function') {
						item.action();
					}

					closeMenus();
				}
			});

			decorateFolderMenuTree($menu);

			$button.on('mousedown' + namespace, function(e) {
				if (e.button !== 0) {
					return;
				}

				e.preventDefault();
				openMenu($button, $menu);
			});

			$button.on('mouseenter' + namespace, function() {
				if ($menus.filter(':visible').length) {
					openMenu($button, $menu);
				}
			});
		});

		$(document).on('mousedown' + namespace, function(e) {
			if ($(e.target).closest($folder.find('.emuos-folder-menubar-items, .emuos-folder-menu')).length) {
				return;
			}

			closeMenus();
		});

		if ($windowFrame.length) {
			$windowFrame.on('mousedown' + namespace, function(e) {
				if (!$(e.target).closest('.emuos-folder-menubar-item, .emuos-folder-menu').length) {
					closeMenus();
				}
			});
		}

		$folder.data('folderMenuApi', {
			close: closeMenus,
			destroy: function() {
				closeMenus();
				$(document).off(namespace);
				if ($windowFrame.length) {
					$windowFrame.off(namespace);
				}
				$menus.each(function() {
					var $menu = $(this);

					if ($menu.data('ui-menu')) {
						$menu.menu('destroy');
					}

					$menu.remove();
				});
				$menubar.find('.emuos-folder-menubar-item').off(namespace);
			}
		});
	};

	EmuOS.prototype._bindFolderToolbarButtons = function($folder, folderId, title, windowIcon) {
		var self = this;
		var namespace = '.emuosFolderToolbar' + folderId;

		$folder.off('click' + namespace, '.emuos-folder-toolbar-button:not(.emuos-folder-btn-views):not(.emuos-folder-btn-back):not(.emuos-folder-btn-forward):not(.is-disabled)');
		$folder.on('click' + namespace, '.emuos-folder-toolbar-button:not(.emuos-folder-btn-views):not(.emuos-folder-btn-back):not(.emuos-folder-btn-forward):not(.is-disabled)', function(e) {
			e.preventDefault();

			self.messageBox({
				title: title,
				message: 'Not supported.',
				icon: 'error',
				windowIcon: windowIcon
			});
		});
	};

	EmuOS.prototype._bindFolderToolbarDrag = function($folder, folderId) {
		var namespace = '.emuosFolderToolbarDrag' + folderId;
		var $win = $(window);

		$folder.off('pointerdown' + namespace, '.emuos-folder-drag-handle');
		$folder.on('pointerdown' + namespace, '.emuos-folder-drag-handle', function(event) {
			var originalEvent = event.originalEvent || event;
			var pointerId = typeof event.pointerId !== 'undefined' ? event.pointerId : originalEvent.pointerId;
			var toolbarEl = event.currentTarget.closest('.emuos-folder-toolbar-row');

			if (!toolbarEl || typeof pointerId === 'undefined') {
				return;
			}

			function releaseDrag(e) {
				var releaseEvent = e.originalEvent || e;
				var releasePointerId = typeof e.pointerId !== 'undefined' ? e.pointerId : releaseEvent.pointerId;

				if (releasePointerId === pointerId) {
					$win.off('pointerup' + namespace, releaseDrag);
					$win.off('pointercancel' + namespace, releaseDrag);
					$win.off('pointermove' + namespace, drag);
					toolbarEl.style.cursor = '';
				}
			}

			function drag(e) {
				var elUnderPointer = document.elementFromPoint(e.clientX, e.clientY);

				if (!elUnderPointer) {
					return;
				}

				var toolbarElUnderPointer = elUnderPointer.closest('.emuos-folder-toolbar-row');

				if (!toolbarElUnderPointer || toolbarElUnderPointer === toolbarEl || toolbarElUnderPointer.parentNode !== toolbarEl.parentNode) {
					return;
				}

				var toolbars = toolbarEl.parentNode;
				var toolbarElNextSibling = toolbarEl.nextElementSibling;
				var toolbarElUnderPointerNextSibling = toolbarElUnderPointer.nextElementSibling;

				toolbars.insertBefore(toolbarElUnderPointer, toolbarElNextSibling);
				toolbars.insertBefore(toolbarEl, toolbarElUnderPointerNextSibling);
			}

			$win.on('pointerup' + namespace, releaseDrag);
			$win.on('pointercancel' + namespace, releaseDrag);
			$win.on('pointermove' + namespace, drag);
			toolbarEl.style.cursor = 'move';

			if (event.currentTarget.setPointerCapture) {
				event.currentTarget.setPointerCapture(pointerId);
			}

			event.preventDefault();
		});

		$folder.off('selectstart' + namespace, '.emuos-folder-toolbar-row');
		$folder.on('selectstart' + namespace, '.emuos-folder-toolbar-row', function(e) {
			e.preventDefault();
		});
	};

	EmuOS.prototype._setFolderIconSize = function($folder, size) {
		var normalized = parseInt(size, 10);

		if (isNaN(normalized)) {
			normalized = 96;
		}

		normalized = Math.max(16, Math.min(128, normalized));

		var cell = Math.max(72, normalized + 30);
		var row = normalized + 58;

		$folder.get(0).style.setProperty('--folder-icon-size', normalized + 'px');
		$folder.get(0).style.setProperty('--folder-cell-width', cell + 'px');
		$folder.get(0).style.setProperty('--folder-row-height', row + 'px');
		$folder.attr('data-icon-size', normalized);
		$folder.find('.emuos-folder-icon-size-value').text(normalized + 'x' + normalized);
	};

	EmuOS.prototype.folder = function(options) {
		var self = this;

		self._ensureDisabledInsetFilter();

		var title = typeof options.title !== 'undefined' ? options.title : 'Folder';
		var icon = self._resolveIcon(options.icon, 'assets/images/icons/desktop/folder');

		if (icon === 'assets/images/icons/desktop/folder') {
			icon = 'assets/images/icons/desktop/folder-open';
		}

		var width = typeof options.width !== 'undefined' ? options.width : 780;
		var height = typeof options.height !== 'undefined' ? options.height : 560;
		var path = typeof options.path !== 'undefined' ? options.path : title;
		var items = Array.isArray(options.items) ? options.items : [];
		var description = typeof options.description === 'string' ? options.description : '';
		var singleinstance = typeof options.singleinstance !== 'undefined' ? options.singleinstance : false;
		var restoreState = typeof options.restoreState !== 'undefined' ? options.restoreState : null;
		var folderId = 'folder-' + Date.now() + '-' + Math.floor(Math.random() * 100000);
		var iconUrl = icon + ($sys.browser.isIE ? '.png' : '.ico');
		var myComputerIconUrl = 'assets/images/themes/icons/windows-9x/my-computer.ico';
		var address = self._formatFolderAddress(path);
		var content = '' +
			'<div class="emuos-folder-window" data-folder-id="' + folderId + '" data-web-view="true" data-view-mode="large" tabindex="0">' +
				'<div class="emuos-folder-toolbars">' +
					'<div class="emuos-folder-toolbar-row emuos-folder-menubar">' +
						'<div class="emuos-folder-drag-handle" aria-hidden="true"></div>' +
						'<div class="emuos-folder-menubar-items"></div>' +
					'</div>' +
					'<div class="emuos-folder-toolbar-row emuos-folder-toolbar">' +
						'<div class="emuos-folder-drag-handle" aria-hidden="true"></div>' +
						'<div class="emuos-folder-toolbar-buttons">' +
							self._buildFolderToolbarSplitButton('emuos-folder-btn-back', 'Back', 'emuos-folder-btn-back-dropdown', 0) +
							self._buildFolderToolbarSplitButton('emuos-folder-btn-forward', 'Forward', 'emuos-folder-btn-forward-dropdown', 1) +
							self._buildFolderToolbarButton('emuos-folder-btn-up', 'Up', 44) +
							'<hr class="emuos-folder-toolbar-sep" aria-orientation="vertical">' +
							self._buildFolderToolbarButton('emuos-folder-btn-cut', 'Cut', 21) +
							self._buildFolderToolbarButton('emuos-folder-btn-copy', 'Copy', 22) +
							self._buildFolderToolbarButton('emuos-folder-btn-paste', 'Paste', 23) +
							'<hr class="emuos-folder-toolbar-sep" aria-orientation="vertical">' +
							self._buildFolderToolbarButton('emuos-folder-btn-undo', 'Undo', 24) +
							'<hr class="emuos-folder-toolbar-sep" aria-orientation="vertical">' +
							self._buildFolderToolbarButton('emuos-folder-btn-delete', 'Delete', 26) +
							self._buildFolderToolbarButton('emuos-folder-btn-properties', 'Properties', 31) +
							'<hr class="emuos-folder-toolbar-sep" aria-orientation="vertical">' +
							self._buildFolderToolbarSplitButton('emuos-folder-btn-views', 'Views', 'emuos-folder-btn-views-dropdown', 38) +
						'</div>' +
					'</div>' +
					'<div class="emuos-folder-toolbar-row emuos-folder-addressbar">' +
						'<div class="emuos-folder-drag-handle" aria-hidden="true"></div>' +
						'<div class="emuos-folder-address-wrap">' +
							'<label for="' + folderId + '-address">Address</label>' +
							'<div class="emuos-folder-address-compound">' +
								'<i class="emuos-folder-address-icon" style="background-image: url(' + iconUrl + ');"></i>' +
								'<input type="text" class="emuos-folder-address-input" id="' + folderId + '-address" value="' + address + '" readonly autocomplete="off">' +
								'<button type="button" class="emuos-folder-address-dropdown" disabled aria-label="Address history">' +
									'<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="fill:currentColor;display:inline-block;vertical-align:middle" aria-hidden="true"><path style="transform:rotate(90deg);transform-origin:center" d="m5 6 4 4-4 4z"></path></svg>' +
								'</button>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="emuos-folder-main emuos-inset-deep">' +
					'<div class="emuos-folder-sidebar">' +
						'<div class="emuos-folder-sidebar-inner">' +
							'<div class="emuos-folder-sidebar-head">' +
								'<i class="icon" style="background-image: url(' + iconUrl + ');"></i>' +
								'<p class="emuos-folder-sidebar-title">' + title + '</p>' +
							'</div>' +
							'<div class="emuos-folder-sidebar-divider"></div>' +
							'<p class="emuos-folder-sidebar-prompt">Select an item to view its description.</p>' +
							'<div class="emuos-folder-sidebar-description"></div>' +
							'<div class="emuos-folder-sidebar-info"></div>' +
						'</div>' +
					'</div>' +
					'<div class="emuos-folder-splitter"></div>' +
					'<div class="emuos-folder-items" data-view-mode="large" tabindex="0"></div>' +
				'</div>' +
				'<div class="emuos-folder-status">' +
					'<div class="emuos-folder-status-left"></div>' +
					'<div class="emuos-folder-status-middle"></div>' +
					'<div class="emuos-folder-status-right">' +
						'<img class="emuos-folder-status-right-icon" src="' + myComputerIconUrl + '" width="16" height="16" alt="">' +
						'<span class="emuos-folder-status-right-text">My Computer</span>' +
					'</div>' +
				'</div>' +
			'</div>';
		var $viewsMenu = null;
		var initialLocation = {
			path: path,
			title: title,
			icon: icon,
			items: items,
			description: description
		};
		var updateSidebarSelection = function(item) {
			var $info = $folder.find('.emuos-folder-sidebar-info').first();
			var $prompt = $folder.find('.emuos-folder-sidebar-prompt').first();
			var sizeText = self._formatFolderItemSize(item);

			if (!item || typeof item.name === 'undefined') {
				$prompt.show().text('Select an item to view its description.');
				$info.empty();
				self._setFolderSidebarDescription($folder, self._getFolderLocation($folder).description);
				return;
			}

			$prompt.hide();
			self._setFolderSidebarDescription($folder, '');

			var escapedName = $('<div/>').text(item.name).html();
			var creditsHtml = '';

			if (typeof item.credits === 'string' && item.credits !== '') {
				creditsHtml = self._formatSidebarCredits(item.credits);
			} else if (item.title) {
				creditsHtml = $('<div/>').text(item.title).html();
			}

			$info.html(
				'<strong>' + escapedName + '</strong>' +
				(sizeText !== '' ? '<br />Size: ' + $('<div/>').text(sizeText).html() : '') +
				(creditsHtml !== '' ? '<br /><br />' + creditsHtml : '')
			);
		};
		var selectFolderItem = function($itemEl) {
			var item = $itemEl.data('item') || {};
			var sizeText = self._formatFolderItemSize(item);

			$folder.find('.emuos-folder-item').removeClass('ui-selected');
			$itemEl.addClass('ui-selected');
			updateSidebarSelection(item);
			self._updateFolderSelectionButtons($folder);

			if (sizeText !== '') {
				$statusMiddle.text(sizeText);
			} else if (item.folder === true || Array.isArray(item.items)) {
				$statusMiddle.text('File Folder');
			} else {
				$statusMiddle.text(self._getFolderItemType(item));
			}
		};
		var closeViewsMenu = function() {
			if ($viewsMenu) {
				$viewsMenu.remove();
				$viewsMenu = null;
			}
		};
		var openViewsMenu = function($anchor) {
			var viewMode = $folder.attr('data-view-mode') || 'large';
			var webView = $folder.attr('data-web-view') === 'true';

			closeViewsMenu();

			$viewsMenu = $('<div class="emuos-folder-views-menu"></div>');
			$viewsMenu.append('<button type="button" class="emuos-folder-view-web' + (webView ? ' is-checked' : '') + '" data-action="web-view">as Web Page</button>');
			$viewsMenu.append('<hr>');
			$viewsMenu.append('<button type="button" class="emuos-folder-view-huge' + (viewMode === 'huge' ? ' is-active' : '') + '" data-action="huge" title="128 x 128">Huge Icons</button>');
			$viewsMenu.append('<button type="button" class="emuos-folder-view-extralarge' + (viewMode === 'extralarge' ? ' is-active' : '') + '" data-action="extralarge" title="96 x 96">Extra Large Icons</button>');
			$viewsMenu.append('<button type="button" class="emuos-folder-view-large' + (viewMode === 'large' ? ' is-active' : '') + '" data-action="large" title="64 x 64">Large Icons</button>');
			$viewsMenu.append('<button type="button" class="emuos-folder-view-medium' + (viewMode === 'medium' ? ' is-active' : '') + '" data-action="medium" title="32 x 32">Medium Icons</button>');
			$viewsMenu.append('<button type="button" class="emuos-folder-view-small' + (viewMode === 'small' ? ' is-active' : '') + '" data-action="small" title="16 x 16">Small Icons</button>');
			$viewsMenu.append('<button type="button" class="emuos-folder-view-list' + (viewMode === 'list' ? ' is-active' : '') + '" data-action="list">List</button>');
			$viewsMenu.append('<button type="button" class="emuos-folder-view-details' + (viewMode === 'details' ? ' is-active' : '') + '" data-action="details">Details</button>');

			$folder.append($viewsMenu);
			self._positionFolderDropdownMenu($folder, $anchor, $viewsMenu);

			$viewsMenu.on('click', 'button[data-action]', function() {
				var action = $(this).data('action');

				if (action === 'web-view') {
					var enabled = $folder.attr('data-web-view') !== 'true';
					$folder.attr('data-web-view', enabled ? 'true' : 'false');
				} else {
					self._setFolderViewMode($folder, action);
				}

				closeViewsMenu();
				syncState();
			});
		};
		var syncState = function() {};

		if (singleinstance && self.$body.find('.emuos-folder-address-input').filter(function() {
			return $(this).val() === address;
		}).length > 0) {
			return;
		}

		self.window({
			title: title,
			icon: icon,
			content: content,
			width: width,
			height: height,
			dragStop: function() {
				syncState();
			},
			resizeStop: function() {
				syncState();
			},
			close: function() {
				closeViewsMenu();
				var menuApi = $folder.data('folderMenuApi');

				if (menuApi) {
					if (typeof menuApi.destroy === 'function') {
						menuApi.destroy();
					} else if (typeof menuApi.close === 'function') {
						menuApi.close();
					}
				}

				var currentLocation = $folder.data('folderLocation');

				self._removeFolderWindowState(currentLocation ? currentLocation.path : path);
			}
		});

		var $folder = self.$body.find('.emuos-folder-window[data-folder-id="' + folderId + '"]').first();
		var $windowFrame = $folder.closest('.emuos-window').first();
		var $statusMiddle = $folder.find('.emuos-folder-status-middle').first();

		syncState = function() {
			var currentLocation = self._getFolderLocation($folder);

			self._saveFolderWindowState({
				path: currentLocation.path,
				title: currentLocation.title,
				icon: currentLocation.icon,
				items: currentLocation.items,
				left: parseInt($windowFrame.css('left'), 10) || 0,
				top: parseInt($windowFrame.css('top'), 10) || 0,
				width: Math.round($windowFrame.outerWidth()),
				height: Math.round($windowFrame.outerHeight()),
				viewMode: $folder.attr('data-view-mode') || 'large',
				webView: $folder.attr('data-web-view') === 'true'
			});
		};

		self._initFolderNavigation($folder, initialLocation);
		self._setFolderToolbarIcons($folder);
		self._updateFolderSelectionButtons($folder);
		setTimeout(function() {
			self._setFolderToolbarIcons($folder);
		}, 0);
		self._bindFolderToolbarDrag($folder, folderId);
		self._bindFolderToolbarButtons($folder, folderId, title, icon);
		self._bindFolderNavigation($folder, folderId, icon);
		self._initFolderMenuBar($folder, folderId, title, icon, $statusMiddle);

		$folder.off('emuosFolderLocationChange').on('emuosFolderLocationChange', syncState);

		if (restoreState) {
			if (typeof restoreState.left === 'number' && typeof restoreState.top === 'number') {
				$windowFrame.css({
					left: restoreState.left + 'px',
					top: restoreState.top + 'px'
				});
			}

			if (typeof restoreState.webView === 'boolean') {
				$folder.attr('data-web-view', restoreState.webView ? 'true' : 'false');
			}

			if (typeof restoreState.viewMode === 'string') {
				self._setFolderViewMode($folder, restoreState.viewMode);
			} else if (typeof restoreState.iconSize === 'number') {
				self._setFolderViewMode($folder, self._resolveFolderViewModeFromIconSize(restoreState.iconSize));
			} else {
				self._setFolderViewMode($folder, 'large');
			}
		} else {
			self._setFolderViewMode($folder, 'large');
		}

		$folder.off('dblclick', '.emuos-folder-item').on('dblclick', '.emuos-folder-item', function(e) {
			var item = $(this).data('item') || {};
			var name = typeof item.name !== 'undefined' ? item.name : 'Untitled';
			var hasItems = Array.isArray(item.items);
			var isFolder = item.folder === true || hasItems;
			var currentPath = self._getFolderLocation($folder).path || '';
			var normalizedPath = currentPath ? currentPath + '\\' + name : name;
			var itemIcon = self._resolveIcon(item.icon, isFolder ? 'assets/images/icons/desktop/folder' : 'assets/images/icons/desktop/joystick');

			e.preventDefault();

			if (isFolder) {
				self._navigateFolder($folder, {
					path: normalizedPath,
					title: name,
					icon: itemIcon,
					items: hasItems ? item.items : [],
					description: typeof item.description === 'string' ? item.description : ''
				}, 'go');
				$folder.trigger('emuosFolderLocationChange');
				return;
			}

			self._launchFolderItem(item, currentPath);
		});

		$folder.off('click', '.emuos-folder-item').on('click', '.emuos-folder-item', function(e) {
			e.preventDefault();
			selectFolderItem($(this));
		});

		self._bindFolderItemContextMenu($folder, {
			folderId: folderId,
			title: title,
			icon: icon,
			onSelectItem: selectFolderItem
		});

		$folder.off('click', '.emuos-folder-btn-views').on('click', '.emuos-folder-btn-views', function(e) {
			e.preventDefault();
			e.stopPropagation();
			self._cycleFolderViewMode($folder);
			syncState();
		});

		$folder.off('click', '.emuos-folder-btn-views-dropdown').on('click', '.emuos-folder-btn-views-dropdown', function(e) {
			e.preventDefault();
			e.stopPropagation();
			openViewsMenu($(this).closest('.emuos-folder-toolbar-compound'));
		});

		$(document).off('click.emuosFolderViews' + folderId).on('click.emuosFolderViews' + folderId, function(e) {
			if ($viewsMenu && !$(e.target).closest('.emuos-folder-views-menu, .emuos-folder-toolbar-compound').length) {
				closeViewsMenu();
			}
		});

		$folder.off('remove').on('remove', function() {
			closeViewsMenu();
			$(document).off('click.emuosFolderViews' + folderId);
			$(window).off('.emuosFolderToolbarDrag' + folderId);
			$folder.off('.emuosFolderToolbarDrag' + folderId);
			$folder.off('.emuosFolderToolbar' + folderId);

			if ($folder.data('folderItemContextMenuBound')) {
				try {
					$folder.contextmenu('destroy');
				} catch (error) {}

				$folder.removeData('folderItemContextMenuBound');
			}
		});

		syncState();
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

		var widget = $('<div class="emuos-widget" style="display: ' + (hidden ? 'none' : 'block') +  '; position: absolute; ' + position + ' width: ' + width + 'px; height: ' + height + 'px; z-index: 9999;">' + content + '</div>');

		self.$body.append(widget);
		self.$taskbar = $('.taskbar').first();

		widget.find('iframe').off('load').on('load', function() {
			if (title === 'Chat') {
				var net = {};

				net.badge = 0;

				net.show = function() {
					if (typeof window['NETWORK_CONNECTION'] !== 'undefined') {
						if (typeof window['NETWORK_CONNECTION']['socket'] !== 'undefined') {
							// noinspection JSUnresolvedVariable
							if (typeof window['NETWORK_CONNECTION']['socket']['emit_event'] === 'function') {
								// noinspection JSUnresolvedFunction
								window['NETWORK_CONNECTION']['socket']['emit_event']('chat.show', {});
							}
						}
					}

					widget.slideDown(300);
					net.badge = 0;
					var $icon = self.$body.find('.emuos-desktop-icon span:contains("EmuChat")').siblings('i.icon').first();
					$icon.attr('class', 'icon badge');
				};

				net.hide = function() {
					if (typeof window['NETWORK_CONNECTION'] !== 'undefined') {
						if (typeof window['NETWORK_CONNECTION']['socket'] !== 'undefined') {
							// noinspection JSUnresolvedVariable
							if (typeof window['NETWORK_CONNECTION']['socket']['emit_event'] === 'function') {
								// noinspection JSUnresolvedFunction
								window['NETWORK_CONNECTION']['socket']['emit_event']('chat.hide', {});
							}
						}
					}

					widget.slideUp(300);
				};

				net.toggle = function() {
					if (widget.is(':hidden')) {
						net.badge = 0;
						var $icon = self.$body.find('.emuos-desktop-icon span:contains("EmuChat")').siblings('i.icon').first();
						$icon.attr('class', 'icon badge');

						if (typeof window['NETWORK_CONNECTION'] !== 'undefined') {
							if (typeof window['NETWORK_CONNECTION']['socket'] !== 'undefined') {
								// noinspection JSUnresolvedVariable
								if (typeof window['NETWORK_CONNECTION']['socket']['emit_event'] === 'function') {
									// noinspection JSUnresolvedFunction
									window['NETWORK_CONNECTION']['socket']['emit_event']('chat.show', {});
								}
							}
						}
					} else {
						if (typeof window['NETWORK_CONNECTION'] !== 'undefined') {
							if (typeof window['NETWORK_CONNECTION']['socket'] !== 'undefined') {
								// noinspection JSUnresolvedVariable
								if (typeof window['NETWORK_CONNECTION']['socket']['emit_event'] === 'function') {
									// noinspection JSUnresolvedFunction
									window['NETWORK_CONNECTION']['socket']['emit_event']('chat.hide', {});
								}
							}
						}
					}

					widget.slideToggle(300);
				};

				self.$taskbar.taskbar('option', 'buttons.chat').$element.off('click').on('click', function() {
					net.toggle();
				});

				self.$window.off('keydown').on('keydown', function (e) {
					// noinspection JSRedundantSwitchStatement
					switch (e.keyCode) {
						case 192:
							net.toggle();
							e.preventDefault();
							return false;
					}
				});

				var $icon = self.$body.find('.emuos-desktop-icon span:contains("EmuChat")').siblings('i.icon').first();
				$icon.attr('class', 'icon badge');

				if (typeof window['NETWORK_CONNECTION'] !== 'undefined') {
					// noinspection JSUnresolvedVariable
					if (typeof window['NETWORK_CONNECTION'].register_iframe === 'function') {
						// noinspection JSUnresolvedVariable,JSUnresolvedFunction
						window['NETWORK_CONNECTION'].register_iframe(title);
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
		var width	= typeof options.width		!== 'undefined' ? options.width	: 640;
		var height	= typeof options.height		!== 'undefined' ? options.height	: 400;
		var position = typeof options.position !== 'undefined' ? options.position : {
			my: 'center',
			at: 'center center-' + (height / 2 + 14),
			of: this.$window.get(0),
			collision: 'fit'
		};
		var beforeClose = typeof options.beforeClose === 'function' ? options.beforeClose : null;
		var close = typeof options.close === 'function' ? options.close : null;
		var dragStop = typeof options.dragStop === 'function' ? options.dragStop : null;
		var resizeStop = typeof options.resizeStop === 'function' ? options.resizeStop : null;
		var widgetClass = typeof options.widgetClass !== 'undefined' ? options.widgetClass : '';
		var startMaximized = self._shouldOpenMaximized(width, height);

		var win	= $('<div class="window" data-title="'+ title +'">' + content + '</div>');

		self.$body.append(win);

		// noinspection JSValidateTypes
		win.window({
			width: width,
			height: height,
			maximized: startMaximized,
			position: position,
			widgetClass: widgetClass,
			beforeClose: beforeClose,
			close: close,
			dragStop: dragStop,
			resizeStop: resizeStop,
			icons: {
				main: this.$html.hasClass('theme-basic') || this.$html.hasClass('theme-windows-95') || this.$html.hasClass('theme-windows-98') || this.$html.hasClass('theme-windows-me') ? (icon !== '' ? icon + ($sys.browser.isIE ? '.png' : '.ico') : null) : ''
			}
		});

		if (startMaximized) {
			setTimeout(function() {
				if (win && win.length) {
					// noinspection JSUnresolvedFunction
					if (!win.window('maximized')) {
						// noinspection JSUnresolvedFunction
						win.window('maximize');
					}
				}
			}, 0);
		}

		// noinspection DuplicatedCode
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
		var newtab		= typeof options.newtab		!== 'undefined';
		var startMaximized = self._shouldOpenMaximized(width, height);
		var referrerPolicy = 'same-origin';
		var allowAttr = 'autoplay; fullscreen; accelerometer; gyroscope; geolocation; microphone; camera; midi; encrypted-media; clipboard-read; clipboard-write';
		var allowFullscreen = '';

		src = youtubeEmbedUrl(src);

		if (isYoutubeEmbed(src)) {
			referrerPolicy = 'strict-origin-when-cross-origin';
			allowAttr = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
			allowFullscreen = ' allowfullscreen';
		}

		// noinspection HtmlDeprecatedAttribute,JSUnresolvedVariable,JSUnresolvedFunction
		var win = $('<div class="iframe" data-title="'+ title +'"><iframe id="' + title + '" src="' + src + '" onload="this.focus();this.contentWindow.focus();" frameborder="0" referrerpolicy="' + referrerPolicy + '" allowTransparency="true" allow="' + allowAttr + '"' + allowFullscreen + ' sandbox="allow-forms allow-downloads allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe></div>');

		self.$body.append(win);

		win.find('iframe').off('load').on('load', function() {
			var $el = $(this);

			if (title === 'EmuChat') {
				var net = window['NETWORK_CONNECTION'];

				if (typeof net !== 'undefined') {
					// noinspection JSUnresolvedVariable
					if (typeof net.register_iframe === 'function') {
						// noinspection JSUnresolvedFunction
						net.register_iframe(title);
						net.badge = 0;
						var $icon = self.$body.find('.emuos-desktop-icon span:contains("EmuChat")').siblings('i.icon').first();
						$icon.attr('class', 'icon badge');
					}
				}
			}

			$el.focus();
			$el.get(0).focus();
			$el.get(0).contentWindow.focus();

			if (typeof window['NETWORK_CONNECTION'] !== 'undefined') {
				if (typeof window['NETWORK_CONNECTION']['socket'] !== 'undefined') {
					// noinspection JSUnresolvedVariable
					if (typeof window['NETWORK_CONNECTION']['socket']['emit_event'] === 'function') {
						// noinspection JSUnresolvedFunction
						window['NETWORK_CONNECTION']['socket']['emit_event']('chat.show', {});
					}
				}
			}
		});

		// noinspection JSValidateTypes
		win.window({
			help: credits ? self._formatSidebarCredits(credits) : credits,
			newtab: newtab,
			newtabUrl: src,
			fullscreen: true,
			embeddedContent: true,
			// group: title,
			width: width,
			height: height,
			maximized: startMaximized,
			position: {
				my: 'center',
				at: 'center center-' + (height/2 + 14),
				of: this.$window.get(0),
				collision: 'fit'
			},
			icons: {
				main: this.$html.hasClass('theme-basic') || this.$html.hasClass('theme-windows-95') || this.$html.hasClass('theme-windows-98') || this.$html.hasClass('theme-windows-me') ? (icon !== '' ? icon + ($sys.browser.isIE ? '.png' : '.ico') : null) : ''
			}
		});

		if (startMaximized) {
			setTimeout(function() {
				if (win && win.length) {
					// noinspection JSUnresolvedFunction
					if (!win.window('maximized')) {
						// noinspection JSUnresolvedFunction
						win.window('maximize');
					}
				}
			}, 0);
		}

		// noinspection DuplicatedCode
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
