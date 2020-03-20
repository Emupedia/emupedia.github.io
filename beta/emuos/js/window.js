;(function($, undefined) {
	/*jshint laxbreak:true,-W030,maxcomplexity:60,smarttabs:true,-W004*/
	// noinspection JSUnusedGlobalSymbols
	$.widget('emuos.window', $.ui.dialog, {
		version: '@emuos-main-version',
		options: {
			/* options */
			appendTo: 'body',
			autoOpen: false,
			buttons: [],
			closable: true,
			closeOnEscape: false,
			closeText: false,
			confirmClose: {
				confirm: false,
				modal: false,
				minimizable: true,
				no: null,
				noLocalized: 'confirmCloseNo',
				text: null,
				textLocalized: 'confirmCloseText',
				title: null,
				titleLocalized: 'confirmCloseTitle',
				yes: null,
				yesLocalized: 'confirmCloseYes'
			},
			containment: 'inherit',
			dialogClass: '',
			draggable: true,
			durations: {
				maximize: 'default',
				minimize: 'default',
				restore: 'default',
				show: 'default'
			},
			embeddedContent: false,
			group: null,
			height: 'auto',
			hide: false,
			icons: {
				help: 'ui-icon-help',
				close: 'ui-icon-closethick',
				confirmClose: 'ui-icon-help',
				main: null,
				maximize: 'ui-icon-arrow-4-diag',
				minimize: 'ui-icon-minusthick',
				restore: 'ui-icon-newwin'
			},
			maxHeight: null,
			maximizable: true,
			maximizedDraggable: true,
			maxWidth: null,
			minHeight: 150,
			minimizable: true,
			minWidth: 150,
			modal: false,
			modalOverlay: 'all',
			position: {
				my: 'center',
				at: 'center',
				of: window,
				collision: 'fit'
			},
			resizable: true,
			taskbar: '.emuos-taskbar:eq(0)',
			title: null,
			realTitle: null,
			titleLocalized: null,
			widgetClass: '',
			width: 300,

			/* events */
			beforeClose: null,
			close: null,

			create: null,

			dragStart: null,
			drag: null,
			dragStop: null,

			focus: null,

			beforeMaximize: null,
			maximize: null,

			beforeMinimize: null,
			minimize: null,

			modalOverlaySetsCreated: null,

			moveToBackground: null,
			moveToTop: null,

			open: null,

			resizeStart: null,
			resize: null,
			resizeStop: null,

			beforeRestore: null,
			restore: null,

			beforeShow: null,
			show: null,

			taskbarNotFound: null
		},

		_cnst: {
			dataPrefix: 'emuos-',
			eventPrefix: 'window',
			lowestPossibleZIndex: -2147483648,
			dimensions: ['width', 'height']
		},

		_titlebarButtons: [
			'help',
			'close',
			'minimize',
			'maximize'
		],

		_unsupportedOptions: [
			'autoOpen',
			'closeText',
			'hide'
		],

		classes: {
			buttonHelp: 'emuos-window-button-help',
			buttonMinimize: 'emuos-window-button-minimize',
			buttonMaximize: 'emuos-window-button-maximize-restore',
			windowMaximized: 'emuos-window-maximized',
			windowMinimized: 'emuos-window-minimized',
			windowMinimizing: 'emuos-window-minimizing',
			windowMaximizing: 'emuos-window-maximizing',
			windowRestoring: 'emuos-window-restoring',
			windowShowing: 'emuos-window-showing',
			taskbarButtonActive: 'emuos-taskbar-button-state-active',
			taskbarWindowCopy: 'emuos-taskbar-window-copy',
			taskbarWindowsContainment: 'emuos-taskbar-windows-containment',
			taskbarWindowButton: 'emuos-taskbar-window-button',
			taskbarHorizontal: 'emuos-taskbar-horizontal',
			window: 'emuos-window',
			unminimizable: 'emuos-window-unminimizable',
			unmaximizable: 'emuos-window-unmaximizable',
			hidden: 'emuos-hidden',
			icon: 'emuos-window-icon',
			taskbar: 'emuos-taskbar',
			coveredByOverlay: 'emuos-covered-by-overlay-',
			notCoveredByOverlay: 'emuos-not-covered-by-overlay-',
			windowContent: 'emuos-window-content',
			windowTop: 'emuos-window-top',
			button: 'emuos-window-button',
			modal: 'emuos-window-modal',
			titlebarIcon: 'emuos-window-titlebar-icon',
			dialogOverlay: 'emuos-window-dialog-overlay',
			windowOverlay: 'emuos-window-overlay',
			contentOverlay: 'emuos-window-content-overlay',
			contentOverlayed: 'emuos-window-content-overlayed',
			titlebarButtonIcon: 'emuos-window-titlebar-button-icon',
			bodyOverlay: 'emuos-window-body-overlay',
			bodyOverlayed: 'emuos-window-body-overlayed',
			help: 'emuos-window-type-help',
			helpText: 'emuos-window-type-help-text',
			confirmClose: 'emuos-window-type-confirm-close',
			confirmCloseText: 'emuos-window-type-confirm-close-text',
			confirmCloseYes: 'emuos-window-type-confirm-close-yes',
			confirmCloseNo: 'emuos-window-type-confirm-close-no',
			confirmCloseButtons: 'emuos-window-type-confirm-close-buttons',

			// jQuery UI classes
			uiStateActive: 'ui-state-active',
			uiStateHover: 'ui-state-hover',
			uiStateDisabled: 'ui-state-disabled',
			uiDialogTitle: 'ui-dialog-title',
			uiDialogContent: 'ui-dialog-content',
			uiDialogResizing: 'ui-dialog-resizing',
			uiResizable: 'ui-resizable',
			uiResizableHandle: 'ui-resizable-handle',
			uiDraggable: 'ui-draggable',
			uiButton: 'ui-button',
			uiMenu: 'ui-menu',
			uiIcon: 'ui-icon',
			uiDialogDragging: 'ui-dialog-dragging',
			uiDialogTitlebar: 'ui-dialog-titlebar',
			uiDialogButtonpane: 'ui-dialog-buttonpane',
			uiDialogButtons: 'ui-dialog-buttons',
			uiWidgetOverlay: 'ui-widget-overlay',
			uiButtonIconPrimary: 'ui-button-icon-primary',
			uiButtonText: 'ui-button-text'
		},

		// size related and resizable related options copied from jQuery UI 1.11,
		// because they are not available in jQuery UI 1.10 for extending widgets
		sizeRelatedOptions: {
			buttons: true,
			height: true,
			maxHeight: true,
			maxWidth: true,
			minHeight: true,
			minWidth: true,
			width: true
		},
		resizableRelatedOptions: {
			maxHeight: true,
			maxWidth: true,
			minHeight: true,
			minWidth: true
		},

		_create: function() {
			// tracks state of various elements of window
			// and holds a bunch of calculated values and options
			this._cache = {
				// cache inline styles so they can be reverted on widget destruction
				inlineCSS: this.element.attr('style') || '',
				title: '',
				realTitle: this.options.title,
				// track state of the window
				maximized: false,
				minimized: false,
				restored: true,
				shown: true,
				maximizing: false,
				restoring: false,
				minimizing: false,
				confirmCloseMinimizing: false,
				showing: false,
				initialized: false,
				modalOverlayZIndex: 0,
				animationProgress: 100,
				// if set to true, handlers won't be triggered
				suppressEvents: false,
				// keeps track of window and containment sizes
				sizes: {},
				closeForced: false,
				closeInevitable: false,
				destroyed: false,
				progress: {
					close: false,
					interaction: false,
					refreshPosition: false,
					restoreMaximizedDraggable: false
				},
				refreshPositionContainment: null,
				timeouts: {
					closeWindowShow: 0
				},
				taskbarsOnClickPrevention: 0,
				resizable: {
					hasScrollX: false,
					hasScrollY: false,
					hasInlineCSS: false,
					hasInlineCSSX: false,
					hasInlineCSSY: false,
					inlineCSS: '',
					inlineCSSX: '',
					inlineCSSY: ''
				},
				draggable: {
					scrollX: 0,
					scrollY: 0
				},
				onInteractionEnd: [],
				internalCallbacks: {},
				// cached ID of new window
				newWindowNumber: false,
				// unique event prefix
				uep: this._cnst.eventPrefix + this.uuid
			};

			this.element.uniqueId();

			this._refreshTaskbar();

			// shortcut
			this.$window = this.element;

			// create empty jQuery object for consistency
			// noinspection JSUnusedGlobalSymbols
			this.$close = $();
			this.$confirmCloseWindow = $();
			this.$maximize = $();
			// noinspection JSUnusedGlobalSymbols
			this.$minimize = $();
			// noinspection JSUnusedGlobalSymbols
			this.$latestResizableHandle = $();

			this._cacheTitle(this.options.title);
			this._createTitleForEmpty();
			this._title();

			this._validateTaskbar({
									  initial: true
								  });

			this._debugUnsupportedOptions();
			this._resetUnsupportedOptions();

			this.options.realTitle = this.$window.attr('title') ? this.$window.attr('title') : (this.$window.data('title') ? this.$window.data('title') : undefined);

			this._super();

			// dialogs sets title to undefined is it's null
			// and title attribute on element is missing
			// - lets revert that
			if (typeof this.options.title === 'undefined') {
				this.options.title = null;
			}

			this.$elem = $(this.bindings[0]);

			// from now on, position other than fixed
			// will only be used during resize
			this.$elem.uniqueId().addClass(this.classes.window).css('position', 'fixed');

			this.$window.addClass(this.classes.windowContent);

			this._debugOptions();

			// this shorcut is required
			// noinspection JSUnusedGlobalSymbols
			this.$close = this.uiDialogTitlebarClose;
			this.$title = this.uiDialogTitlebar.find('.' + this.classes.uiDialogTitle);

			this._bindTaskbar(this.$taskbar);
			// +
			// set title again from cache, after all
			// subordinate elements were create by this._super()
			if (typeof this.options.realTitle !== 'undefined') {
				this._setTitle(this.options.realTitle);
			} else {
				this._setTitle();
			}

			this._checkForInvalidOptions($.emuos.window.prototype.options, this.options, true);

			this._setIcon({
				button: 'close'
			});

			// store instance
			this.$window.data(this._cnst.dataPrefix + 'window', this);
		},

		_init: function() {
			var self = this;

			this.options.hide = false;

			this.open();

			// dialog since jQuery UI 1.11.1 sets overlay z-index
			// to 1 lower than modal z-index
			// github.com/jquery/jquery-ui/commit/acfda4be521e48c6b61cc458a715ef163892ac36
			// window has it's own flow of z-indexes, so we revert z-index
			// value and use native flow manager instead
			if (this.overlay) {
				this.overlay.css('zIndex', '');
				this.moveToTop(null, true);
			}

			this._setWindowIcon();
			this._fixTitlebarTitleWidth();

			// we can't have half pixels
			this._fullPxPosition();

			this._setWidth();
			this._setHeight();

			this._setRestoreSize();
			this.refreshPosition({
									 skipOnFit: true
								 });
			this._setRestoreSize();

			this.$window.css({
								 minWidth: '',
								 minHeight: ''
							 });

			this._setMinimizableMaximizableClasses();

			this._fullPxPosition();

			// fixes a bug where loading page with hash that pointed inside
			// the window,  for example, when having tabs inside a window,
			// would scroll widget a fex pixels;
			// this behaviour was consistent across browsers (Chrome, Firefox, IE)
			this.$elem.on('scroll.' + this._cache.uep, function() {
				self.$elem.scrollTop(0);
			});

			// prevents window losing focus, when element inside it is clicked
			// and detached as a result
			this.$elem.on('mousedown.' + this._cache.uep, function() {
				self._preventGlobalWindowClick();
			});

			// revert global click prevention counter
			this.$elem.on('mouseup.' + this._cache.uep, function() {
				self._delay(function() {
					self._revertGlobalWindowClick();
				});
			});

			this._cache.initialized = true;

			this._triggerInternal('afterTaskbarBind');

			this._preventGlobalWindowClick();

			this._delay(function() {
				self._revertGlobalWindowClick();
			});

			// don't trigger "create" if window was not created
			if (!this._cache.destroyed) {
				this._trigger('create');
			}
		},

		// bind window to a given taskbar
		_rebindTaskbar: function() {
			this._refreshTaskbar();

			// if there's no taskbar, there's nothing to rebind to
			if (this._validateTaskbar({rebind: true}) === false) {
				this._triggerInternal('afterTaskbarBind');
				return;
			}

			this._bindTaskbar(this.$taskbar);

			this._setConnectedButtonTitle();
			this._setConnectedButtonState();
			this._languageChange();
		},

		_bindTaskbar: function() {
			var taskbar = this._getTaskbarInstance();

			if (!taskbar) {
				return;
			}

			taskbar._bind(this.$window);

			this.$elem.add(this.overlay).attr('data-taskbar-uuid', this._getTaskbarInstance().uuid);
		},

		_taskbarUnbind: function() {
			var instance = this._getTaskbarInstance();

			if (instance) {
				instance._unbind(this.$window);
			}

			this.$elem.removeAttr('data-taskbar-uuid');
		},

		// normalize option and bind reference to jQuery object
		_refreshTaskbar: function() {
			this.$taskbar = this.options.taskbar instanceof $ ? this.options.taskbar : $(this.options.taskbar);
			this.$taskbar = this.$taskbar.filter(':eq(0)');
		},

		_getTaskbarInstance: function() {
			this._validateTaskbar();

			return this.$taskbar.data(this._cnst.dataPrefix + 'taskbar');
		},

		_hasTaskbar: function() {
			var validation = this._taskbarStatus();

			return !validation.isEmptyDomObject && validation.isTaskbar;
		},

		_taskbarStatus: function() {
			return {
				isEmptyDomObject: this.$taskbar instanceof $ && !this.$taskbar.length,
				isTaskbar: this.$taskbar.hasClass(this.classes.taskbar),
				isPlugin: !!$.emuos.taskbar
			};
		},

		_validateTaskbar: function(settings) {
			var validation = this._taskbarStatus();

			if (validation.isEmptyDomObject || !validation.isTaskbar || !validation.isPlugin) {
				var errorUi = {
					taskbar: this.options.taskbar,
					$taskbar: this.$taskbar
				};

				var reasons = {
					isEmptyDomObject: 'jQuery object passed in "taskbar" option is empty.',
					isTaskbar: 'jQuery object passed in "taskbar" option is not an instance of taskbar, call $("#selector").taskbar(); first.',
					isPlugin: 'Taskbar plugin is missing.'
				};

				if (settings && (settings.initial || settings.rebind)) {
					for (var reason in validation) {
						// decide reason for failed bind
						// noinspection JSUnfilteredForInLoop
						if (validation[reason] === true && reason === 'isEmptyDomObject' || validation[reason] === false && reason !== 'isEmptyDomObject') {
							// noinspection JSUnfilteredForInLoop
							errorUi.message = 'Window #' + this.element[0].id + ': ' + reasons[reason] + (settings.rebind ? ' Window was not rebinded.' : ' Window was not created.');
							errorUi.initial = !settings.rebind;
							break;
						}
					}

					var result = this._trigger('taskbarNotFound', {}, errorUi);
					var self = this;

					// if no taskbar is present, destroy window after creation
					// this is easier than doing hacks to stop creation half-way
					this._bindInternal('afterTaskbarBind', function() {
						if (settings.initial) {
							self.destroy();
						}

						// generate warning if event wasn't prevented
						if (result !== false) {
							// window not rebinded is less severe,
							// so let's generate warning on initial taskbar
							// missing and warning for rebind
							settings.rebind
							? (
								console && console.warn
								? console.warn(errorUi.message)
								: null
							)
							: (console && console.error
							   ? console.error(errorUi.message)
							   : null
							);
						}
					});
				}

				return false;
			}

			return true;
		},

		_refreshGroup: function() {
			this._taskbarUnbind();
			this._bindTaskbar();
		},

		_debugOptions: function() {
			var taskbar = this._getTaskbarInstance();

			if (!taskbar) {
				return;
			}

			var o = this.options;

			// minWidth should not be higher than maxWidth
			if (o.minWidth > o.maxWidth
				&& o.minWidth !== null && o.maxWidth !== null) {
				this._debugLogAdd('"minWidth" option should not be higher ' +
									  'than "maxWidth" option.', 1, 2);
			}

			// minHeight should not be higher than maxHeight
			if (o.minHeight > o.maxHeight
				&& o.minHeight !== null && o.maxHeight !== null) {
				this._debugLogAdd('"minHeight" option should not be higher ' +
									  'than "maxHeight" option.', 1, 2);
			}

			// in dialog, show was an object describing showing animation,
			// when in window it's handler for when window is being shown
			if (typeof o.show !== 'function' && o.show !== null) {
				this._debugLogAdd('option "show" should either be ' +
									  'a function or null.', 1, 2);
			}
		},

		_debugUnsupportedOptions: function() {
			var taskbar = this._getTaskbarInstance();

			if (!taskbar) {
				return;
			}

			var self = this;

			// generate debug messages for unsupported options
			$.each(this._unsupportedOptions, function(index, elem) {
				if (self.options[elem] !== false) {
					var msg = '"' + elem + '" option is not supported ' +
						'and will be set to false.';
					if (index === 'closeText') {
						// close window text was delegated to i18n
						msg += ' Use built in localization instead.';
					}
					self._debugLogAdd(msg, 1, 2);
				}
			});
		},

		_resetUnsupportedOptions: function() {
			this.options.autoOpen = false;
			this.options.closeText = false;
			this.options.hide = false;
		},

		// triggers internal callback and set's it to null, because,
		// as for now, only callbacks triggered once are needed
		_triggerInternal: function(name) {
			if (typeof this._cache.internalCallbacks[name] === 'function') {
				this._cache.internalCallbacks[name]();
				this._cache.internalCallbacks[name] = null;
			}
		},

		// bind internal event to be triggered later,
		// for example after animation finishes
		_bindInternal: function(name, fn) {
			this._cache.internalCallbacks[name] = fn;
		},

		_createWrapper: function() {
			var self = this;

			this._super();

			this.uiDialog.addClass(this.options.widgetClass);

			// bind ESC blocker for when "closable" option is set to false
			this.uiDialog.on('keydown.' + this._cache.uep, function(event) {
				if (!self.options.closable && self.options.closeOnEscape && event.keyCode === $.ui.keyCode.ESCAPE) {
					event.preventDefault();
				}
			});

			this._off(this.uiDialog, 'mousedown');

			// let's rebind window mousedown, so it would not act
			// when right mouse button is pressed
			this.uiDialog.on('mousedown.' + this._cache.uep, function(event) {
				if (event.which === 1 || event.which === 2) {
					if (self._moveToTop(event)) {
						self._focusTabbable();
					}
				}
			});

			var keydown = $._data(this.uiDialog[0]).events.keydown;
			// because the "closable" blocker is currently binded after
			// the function it suppose to block, we have to swap functions,
			// then blocking function will have the ability to prevent the other one
			$.each(keydown, function(index, event) {
				if (
					typeof index === 'number'
					&& keydown.hasOwnProperty(index)
					&& event.namespace.indexOf(self._cache.uep) !== -1
				) {
					// swap values; one liner taken from
					// https://twitter.com/izs/statuses/17744109574
					keydown[index] =
						[keydown[0], keydown[0] = keydown[index]][0];

					// break here
					return false;
				}
			});
		},

		// this function will detect scrollbars and freeze their state during drag,
		// otherwise changing position from fixed to absolute could trigger
		// scrollbar apperance, when body has overflow: auto, and if ofter do
		_freezeBodyScrollbars: function() {
			var $body = $('body'),
				d = document.documentElement,
				c = this._cache;

			c.resizable.hasScrollX = d.scrollWidth !== d.clientWidth;
			c.resizable.hasScrollY = d.scrollHeight !== d.clientHeight;
			c.resizable.hasInlineCSS = this._hasInlineProperty($body, 'overflow');
			c.resizable.hasInlineCSSX = this._hasInlineProperty($body, 'overflow-y');
			c.resizable.hasInlineCSSY = this._hasInlineProperty($body, 'overflow-x');

			c.inlineCSS = $body.css('overflow');
			c.inlineCSSX = $body.css('overflow-x');
			c.inlineCSSY = $body.css('overflow-y');

			var r = c.resizable;

			$body.css({
				overflow: 'inherit',
				overflowY: r.hasScrollY ? 'scroll' : 'hidden',
				overflowX: r.hasScrollX ? 'scroll' : 'hidden'
			});
		},

		// this function will revert window scrolls to state before drag
		_revertBodyScrollbars: function() {
			var r = this._cache.resizable,
				$body = $('body');

			$body.css({
						  overflow: r.hasInlineCSS ? r.inlineCSS : '',
						  overflowX: r.hasInlineCSSX ? r.inlineCSSX : '',
						  overflowY: r.hasInlineCSSY ? r.inlineCSSY : ''
					  });
		},

		// make resizable window
		_makeResizable: function() {
			// noinspection JSUnusedLocalSymbols
			var self = this,
				$dialog = this.uiDialog,
				options = this.options,
				handles = options.resizable,
				resizeHandles = typeof handles === 'string' ? handles : 'n,e,s,w,se,sw,ne,nw';

			var resizable;

			function filteredUi(ui) {
				return {
					originalPosition: ui.originalPosition,
					originalSize: ui.originalSize,
					position: ui.position,
					size: ui.size
				};
			}

			var originalOffset = {};

			// function to call on resize when containment is set to viewport
			var resizeWithinViewport = function(event, ui) {
				var $this = $(this);

				// can't have floats here, they couse ugly errors
				$.each(['width', 'height'], function(index, dimension) {
					ui.size[dimension] = Math.round(ui.size[dimension]);
					$this.css(dimension, ui.size[dimension]);
				});

				$.each(['top', 'left'], function(index, edge) {
					ui.position[edge] = Math.round(ui.position[edge]);
					$this.css(edge, ui.position[edge]);
				});

				var s = self._getDimensions.call($this, {
						outer: true
					}),
					c = self._cache.sizes.containment,
					cc = self._getDimensions.call(
						$('.' + self.classes.taskbarWindowCopy), {
							outer: true
						}
					),
					margins = self._cache.sizes.margins;

				var taskbar = self._getTaskbarInstance();

				if (taskbar) {
					var wc = self._getDimensions.call(
						taskbar.$windowsContainment, {
							outer: true
						}
					);
				}

				$.each(['top', 'left'], function(index, edge) {
					var scroll = $(window)['scroll' + self._ucFirst(edge)]();

					// noinspection JSUnusedAssignment
					var isTop = edge === 'top',
						val = ui.position[edge] + scroll,
						valPrev = val,
						dimension = isTop ? 'height' : 'width',
						end = isTop ? 'bottom' : 'right',
						overflow = (s[edge] + s[dimension] - scroll) - cc[dimension] + margins[end],
						size = ui.size[dimension],
						valDiff;

					// apply property first
					$this.css(edge, val);

					// recalculate top left overflow
					if (val < c[edge] + scroll) {
						overflow = (c[edge] + scroll) - val;
					}

					// correct top left overflow
					val = Math.round(Math.max(val, scroll + c[edge]));

					valDiff = val - valPrev;

					if (valDiff !== 0) {
						$this.css(edge, val);

						ui.position[edge] = val;
					}

					size = c[dimension]
						- Math.max(val - c[edge], 0)
						- (c[end] - s[end]);

					size += scroll;

					size = Math.round(size - Math.max(overflow, 0)) + valDiff;

					// apply property first, so outerHeight()/outerWidth
					// can by accurate
					$this.css(dimension, size);

					// account for bottom/right overflow
					if (wc) {
						var currSize = $this
							['outer' + self._ucFirst(dimension)]();
						var endDiff = Math.min(0, wc[end] - (currSize + val));
						size += endDiff;
					}

					$this.css(dimension, size);

					ui.size[dimension] = size;
				});
			};

			// function to call on resize when containment is set to visible
			var resizeWithinVisibleArea = function(event, ui) {
				var $this = $(this);

				var diffs = self._bringIntoView({
					diffs: true
				});

				$.each(['top', 'left'], function(index, edge) {
					var scroll = $(window)['scroll' + self._ucFirst(edge)](),
						isTop = edge === 'top',
						val = ui.position[edge] + scroll,
						dimension = isTop ? 'height' : 'width',
						end = isTop ? 'bottom' : 'right',
						direction = ui.position[edge] > ui.originalPosition[edge] ? 'less' : 'more',
						size = ui.size[dimension];

					// apply property first
					$this.css(edge, val);

					var change = false;

					// correct top/left edge overflow
					// noinspection TypeScriptValidateTypes,TypeScriptValidateJSTypes,JSValidateTypes
					if (diffs[edge] + scroll < 0 && direction === 'more') {
						change = true;
						// noinspection TypeScriptValidateTypes,TypeScriptValidateJSTypes,JSValidateTypes
						val -= diffs[edge] + scroll;
						// noinspection TypeScriptValidateTypes,TypeScriptValidateJSTypes,JSValidateTypes
						size += diffs[edge] + scroll;
					}

					// correct bottom/right edge overflow
					// noinspection TypeScriptValidateTypes,TypeScriptValidateJSTypes,JSValidateTypes
					if (diffs[end] < 0 && direction === 'less') {
						change = true;
						// noinspection TypeScriptValidateTypes,TypeScriptValidateJSTypes,JSValidateTypes
						val += diffs[end];
						// noinspection TypeScriptValidateTypes,TypeScriptValidateJSTypes,JSValidateTypes
						size -= diffs[end];
					}

					if (change) {
						val = Math.round(val);
						size = Math.round(size);

						$this.css(edge, val).css(dimension, size);

						ui.position[edge] = val;
						ui.size[dimension] = size;
					}
				});
			};

			var resizableInstance;

			var correct = function(event, ui, resizableInstance) {
				// since jQuery UI 1.11.1 resizable has a bug that does not change
				// width/height by exact drag distance during first drag
				if (self._versionOf('resizable', '>=', '1.11.1')) {
					resizableInstance._mouseDrag(event);
				}

				// call appropriate correction function
				self._getRealContainment() === 'viewport' ? resizeWithinViewport.call(this, event, ui) : resizeWithinVisibleArea.call(this, event, ui);
			};

			this.uiDialog.resizable({
										cancel: '.' + this.classes.uiDialogContent,
										alsoResize: null,
										aspectRatio: false,
										maxWidth: options.maxWidth,
										maxHeight: options.maxHeight,
										minWidth: options.minWidth,
										minHeight: this._minHeight(),
										handles: resizeHandles,
										start: function(event, ui) {
											self._interactionInProgress(true);
											self._hideTaskbarsSubordinates();
											self._freezeBodyScrollbars();

											// _blockFrames/_unblockFrames was introduced
											// in jQuery UI Dialog 1.10.1
											if (self._versionOf('dialog', '>=', '1.10.1')) {
												self._blockFrames();
											}

											originalOffset = self._getDimensions.call(self.$elem, {
												outer: true
											});

											var $this = $(this);

											if (self.options.embeddedContent) {
												self.$window.find('iframe').css('pointer-events', 'none');
											}

											resizableInstance = $this.data(self.classes.uiResizable);

											$this.addClass(self.classes.uiDialogResizing);

											// convert position to absolute
											var scroll = self._getWindowScroll(),
												top = Math.round(
													parseFloat($this.css('top'))
												) + scroll.y,
												left = Math.round(
													parseFloat($this.css('left'))
												) + scroll.x;

											$this.css({
														  top: top,
														  left: left,
														  position: 'absolute'
													  });

											self._trigger('resizeStart', event, filteredUi(ui));
										},
										stop: function(event, ui) {
											var $this = $(this);

											options.height = $this.height();
											options.width = $this.width();

											$this.removeClass(self.classes.uiDialogResizing);

											if (self.options.embeddedContent) {
												self.$window.find('iframe').removeAttr('style');
											}

											// since version 1.11.1 draggable won't respect
											// size set via css() in resize event, so we need to correct
											// the size/dimensions once again
											if (self._versionOf('resizable', '>=', '1.11.1')) {
												correct.call(this, event, ui, resizableInstance);
											}

											// convert position to fixed
											var scroll = self._getWindowScroll(),
												top = Math.round(parseFloat($this.css('top'))) - scroll.y,
												left = Math.round(parseFloat($this.css('left'))) - scroll.x;

											$this.css({
														  top: top,
														  left: left,
														  position: 'fixed'
													  });

											self._interactionInProgress(false);
											self._revertBodyScrollbars();
											// _blockFrames/_unblockFrames was introduced
											// in jQuery UI Dialog 1.10.1
											if (self._versionOf('dialog', '>=', '1.10.1')) {
												self._unblockFrames();
											}
											self._fullPxPosition();
											self._refreshPositionOption();
											self._setRestoreSize();
											self._setContainment();

											self._trigger('resizeStop', event, filteredUi(ui));
										},
										resize: function(event, ui) {
											correct.call(this, event, ui, resizableInstance);

											self._fixTitlebarTitleWidth();
											self._fullPxPosition();
											self._setContentHeight();

											self._trigger('resize', event, filteredUi(ui));
										}
									});

			// by default, resizable will threat pressed shift key the same way
			// as "aspectRatio": true, and there no exposed way of preventing
			// this behaviour, so let's instead rewrite a function
			// that recalculates aspect ratio, so it will do nothing
			resizable = this.uiDialog.data(this.classes.uiResizable);

			resizable._updateRatio = function(data) {
				return data;
			};

			// we need information which handle is currently being dragged,
			// this.$elem will not work if invalid taskbar was given
			// on initialization

			// $(this.bindings[0]).children("." + this.classes.uiResizableHandle).on("mousedown." + this._cache.uep, function() {
			$(this.bindings[0]).siblings('.' + this.classes.uiResizableHandle).on('mousedown.' + this._cache.uep, function() {
				self.$latestResizableHandle = $(this);

				if (self.options.embeddedContent) {
					self.$window.find('iframe').css('pointer-events', 'none');
				}
			}).on('mouseup.' + this._cache.uep, function() {
				if (self.options.embeddedContent) {
					self.$window.find('iframe').removeAttr('style');
				}
			});
		},

		// this function will save scrollX and scrollY before drag
		_freezeBodyScrolls: function() {
			this._cache.draggable.scrollX = $(window).scrollLeft();
			this._cache.draggable.scrollY = $(window).scrollTop();
		},

		// this function will revert scrolls after drag
		_revertBodyScrolls: function() {
			window.scroll(
				this._cache.draggable.scrollX,
				this._cache.draggable.scrollY
			);
		},

		// sets correction position option after resize/drag
		_refreshPositionOption: function() {
			var options = this.options,
				$this = this.$elem;

			// jQuery UI 1.10 and before
			options.position = [
				parseInt($this.css('top'), 10) - $(window).scrollLeft(),
				parseInt($this.css('left'), 10) - $(window).scrollTop()
			];

			// jQuery UI 1.11+
			if (this._versionOf('dialog', '>=', '1.11.0')) {
				var left = options.position[1] - $(window).scrollLeft(),
					top = options.position[0] - $(window).scrollTop();

				options.position = {
					my: 'left top',
					at: 'left' + (left >= 0 ? '+' : '') + left + ' ' +
						'top' + (top >= 0 ? '+' : '') + top,
					of: window
				};
			}
		},

		// make draggable window
		_makeDraggable: function() {
			this._super();

			// noinspection JSUnusedLocalSymbols
			var self = this,
				$elem = this.uiDialog,
				options = this.options,
				originalOffset = {},
				originalPosition = {};

			// this function will allow restore on maximized window,
			// when drag started on it
			function restoreMaximizedDraggable(event, ui) {
				self._cache.progress.restoreMaximizedDraggable = true;

				var draggable = $elem.data(self.classes.uiDraggable);
				var taskbar = self._getTaskbarInstance();

				var $title = self.uiDialogTitlebar.find('.' + self.classes.uiDialogTitle);
				var $lastButton = $title.siblings('.' + self.classes.uiButton + ':visible:eq(0)');

				// noinspection JSUnusedLocalSymbols
				var draggableBefore = $.extend(true, {}, draggable);

				// restore without animation
				self.restore(false);

				// stop draggable, so some calculations and window moves can be done
				draggable._mouseStop(event);

				var td = taskbar._extendedPosition.call($elem, 'offset'),
					tdt = taskbar._extendedPosition.call($title, 'offset'),
					bt = taskbar._extendedPosition.call(
						$lastButton.length ? $lastButton : $title, 'offset'
					);

				var diffs = {};

				var scroll = self._getWindowScroll();

				// calculate top: take it from the current position
				var top = parseFloat($elem.css('top'))
					- (td.top - ui.originalPosition.top) + scroll.y;

				diffs.left = event.pageX - bt.right;
				diffs.right = event.pageX - tdt.left;

				var change = 0;

				// calculate left change to match cursor position
				if (diffs.left < 0) {
					change = diffs.left + tdt.width;
				} else if (diffs.right > 0) {
					change = diffs.right - (tdt.width + (bt.right - tdt.right));
				}

				var left = parseFloat($elem.css('left')) + change;

				// set new dimensions to dialog
				$elem.css({
							  top: top,
							  left: left
						  });

				// restart draggable
				draggable._mouseStart(event);

				// restart again...
				// fixes tests/unit/windowOptions.html:
				// "maximizedDraggable" vs containment:
				// Widget touches right edge of containment.
				draggable._mouseStop(event);
				draggable._mouseStart(event);

				// noinspection JSUnusedLocalSymbols
				var draggableAfter = $.extend(true, {}, draggable);

				// set changed values to ui object, so they can be written
				// to draggable.position by draggable _mouseDrag() function
				ui.position.top = draggable.offset.top - $(window).scrollTop();
				ui.position.left = draggable.offset.left - $(window).scrollLeft();

				self._cache.progress.restoreMaximizedDraggable = false;
			}

			function fixFloatingPosition(event, ui) {
				// noinspection JSCheckFunctionSignatures
				ui.position.top = Math.round(parseFloat(ui.position.top));
				// noinspection JSCheckFunctionSignatures
				ui.position.left = Math.round(parseFloat(ui.position.left));
			}

			function draggableUi(ui) {
				return {
					position: ui.position,
					originalOffset: originalOffset,
					originalPosition: originalPosition,
					offset: ui.offset
				};
			}

			$elem.draggable('option', {
				scroll: false,
				distance: 1, // 0 would collide with "maximizedDraggable": true
				iframeFix: true, //just to be safe
				start: function(event, ui) {
					self.$elem.data(
						self._cnst.dataPrefix + 'window-scrolls', {
							x: $(window).scrollLeft(),
							y: $(window).scrollTop()
						}
					);
					// _blockFrames/_unblockFrames was introduced
					// in jQuery UI Dialog 1.10.1
					if (self._versionOf('dialog', '>=', '1.10.1')) {
						self._blockFrames();
					}
					self._interactionInProgress(true);
					self._interactionsState(true);
					self._hideTaskbarsSubordinates();
					self._freezeBodyScrolls();

					originalOffset = self.$elem.offset();
					originalPosition = self.$elem.position();

					self._trigger('dragStart', event, draggableUi(ui));
				},
				stop: function(event, ui) {
					$(this).removeClass(self.classes.uiDialogDragging);

					self._interactionInProgress(false);
					// _blockFrames/_unblockFrames was introduced
					// in jQuery UI Dialog 1.10.1
					if (self._versionOf('dialog', '>=', '1.10.1')) {
						self._unblockFrames();
					}
					self._fullPxPosition();
					self._refreshPositionOption();
					self._setRestoreSize();
					self._revertBodyScrolls();

					self.$elem.removeData(self._cnst.dataPrefix + 'window-scrolls');

					self._trigger('dragStop', event, draggableUi(ui));
				},
				drag: function(event, ui) {
					if (self.maximized() && self.options.maximizedDraggable) {
						restoreMaximizedDraggable(event, ui);
					}

					fixFloatingPosition(event, ui);

					// correct position by scrolls saved on start,
					// this allow mousewheel event not to be prevented
					if (self._versionOf('dialog', '>=', '1.11.0')) {
						var scrolls = self.$elem.data(
							self._cnst.dataPrefix + 'window-scrolls'
						);

						ui.position.left += scrolls.x - $(window).scrollLeft();
						ui.position.top += scrolls.y - $(window).scrollTop();
					}

					self._trigger('drag', event, draggableUi(ui));
				}
			});

			this._extendDraggableCancel();
			this._setContainment();
		},

		// returns real containment, taking "inherit" into account
		_getRealContainment: function() {
			var taskbar = this._getTaskbarInstance();

			return this.options.containment === 'inherit' && taskbar ? taskbar.options.windowsContainment : this.options.containment;
		},

		_getRealContainmentObject: function() {
			return $('.' + this.classes.taskbarWindowsContainment);
		},

		// calculate and return containment for windows with
		// containment option set to visible
		_getVisibleContainmentArray: function() {
			var taskbar = this._getTaskbarInstance(),
				containment;

			var x1, x2, y1, y2;

			this._refreshTaskbarMargins();

			var margins = this._cache.sizes.margins;

			var $elem;

			if (this.bindings[0].length) {
				$elem = this.bindings[0];
			} else if (this.$elem.length) {
				$elem = this.$elem;
			} else if (this.element.length) {
				$elem = this.element.parent();
			} else {
				return [0, 0, 0, 0];
			}

			var ed = taskbar._extendedPosition.call($elem),
				cd = taskbar._extendedPosition.call(
					this._getRealContainmentObject(),
					'offset'
				),
				tdt = taskbar._extendedPosition.call(
					this.uiDialogTitlebar.find('.' + this.classes.uiDialogTitle),
					'offset'
				),
				r = this._bringIntoViewReserve(),
				scroll = this._getWindowScroll();

			x1 = scroll.x + margins.left;
			y1 = scroll.y + margins.top;
			x2 = x1 + scroll.x + cd.width - ed.width;
			y2 = y1 + cd.height - ed.height - scroll.y;

			x1 -= tdt.width;
			y1 -= tdt.bottom - ed.top - r - scroll.y;
			x2 += tdt.width - (tdt.right - ed.right) - r;
			y2 += 2 * scroll.y + ed.height - (tdt.top - ed.top) - r;

			containment = [x1, y1, x2, y2];

			return containment;
		},

		_getWindowScroll: function() {
			return this._getTaskbarInstance()._getWindowScroll();
		},

		// sets containment for draggable and resizable
		_setContainment: function() {
			var containment = this._getRealContainment();

			if ($.ui.draggable && this.options.draggable && this.uiDialog.hasClass(this.classes.uiDraggable)) {
				var $containment;

				if (containment === 'viewport') {
					$containment = this._getRealContainmentObject();
				} else if (containment === 'visible') {
					$containment = this._getVisibleContainmentArray();
				}

				this.uiDialog.draggable('option', 'containment', $containment);
			}

			if ($.ui.resizable && this.options.resizable && this.uiDialog.hasClass(this.classes.uiResizable)) {
				if (containment === 'viewport') {
					this.uiDialog.resizable('option', 'containment', 'document');
				} else if (containment === 'visible') {
					this.uiDialog.resizable('option', 'containment', false);
				}
			}
		},

		_extendDraggableCancel: function() {
			// cancel draggable on window manipulation buttons
			var cancel = this.uiDialog.draggable('option', 'cancel');

			if (cancel.indexOf(this.classes.button) === -1) {
				cancel += ', .' + this.classes.button + ', .' + this.classes.icon;
				this.uiDialog.draggable('option', 'cancel', cancel);
			}
		},

		// open help window
		_openHelp: function() {
			var self = this, o = this.options;

			if (o.help) {
				if (!this._cache.progress.help) {
					this._placeOverlay({
						window: true
					});

					this.$helpWindow = $('<div></div>');

					this.$helpWindow.addClass(this.classes.help).append($('<p>' + o.help + '</p>').addClass(this.classes.helpText)).window({
						// options that propagate from main window
						taskbar: this.$taskbar,
						minimizable: false,
						modal: true,
						containment: o.containment,
						durations: o.durations,
						icons: {
							main: o.icons.help
						},
						// end of options that propagate from main window
						title: self._i18n('helpTitle', {
							title: o.realTitle
						}),
						closeOnEscape: true,
						maximizable: false,
						resizable: false,
						width: 400,
						height: 'auto',
						minHeight: null,
						// let's have it here so calling close() on this window, don't break anything
						close: function() {
							self._unblock();
						}
					});

					// this._afterConfirmCloseButtonsBuild();

					this._removeTopClasses();
					this.$helpWindow.window('moveToTop');

					// position window on the center of it's parent window
					var $helpWindowParent = this.$helpWindow.parent(),
						taskbar = this._getTaskbarInstance(),
						pd = taskbar._extendedPosition.call($helpWindowParent, 'offset'),
						wd = taskbar._extendedPosition.call(this.$elem, 'offset'),
						css = {},
						scroll = this._getWindowScroll();

					// calculate window center
					css.top = wd.top - scroll.y;
					css.left = wd.left - scroll.x;
					css.top -= (pd.height - wd.height) / 2;
					css.left -= (pd.width - wd.width) / 2;

					$helpWindowParent.css(css).attr('data-help-window-for', self.$elem.attr('id'));

					// refresh position for those rare cases,
					// where positioning on center of parent window
					// would move confirm close window outside the containment
					this.$helpWindow.window('refreshPosition');
					//this._cache.progress.help = true;

					return true;
				}
			}

			return false;
		},

		// open confirm close window
		_openConfirmClose: function() {
			var self = this, o = this.options;

			if (o.confirmClose.confirm) {
				if (!this._cache.progress.close) {
					this._placeOverlay({
						window: true
					});

					this.$confirmCloseWindow = $('<div></div>');

					this.$confirmCloseWindow.addClass(this.classes.confirmClose).append($('<p>' + this._buildConfirmCloseText('text') + '</p>').addClass(this.classes.confirmCloseText)).window({
						// options that propagate from main window
						taskbar: this.$taskbar,
						minimizable: o.confirmClose.minimizable,
						modal: o.confirmClose.modal,
						containment: o.containment,
						durations: o.durations,
						icons: {
							 main: o.icons.confirmClose
						},
						// end of options that propagate from main window
						title: this._buildConfirmCloseText('title'),
						buttons: this._confirmCloseButtonsConfig(),
						closeOnEscape: true,
						maximizable: false,
						resizable: false,
						height: 'auto',
						minHeight: null,
						beforeMinimize: function() {
							self._cache.confirmCloseMinimizing = true;
						},
						minimize: function() {
							self._cache.confirmCloseMinimizing = false;
						},
						// let's have it here so calling close() on this window, don't break anything
						close: function() {
							self._unblock();
						}
					 });

					this._afterConfirmCloseButtonsBuild();

					this._removeTopClasses();
					this.$confirmCloseWindow.window('moveToTop');

					// position window on the center of it's parent window
					var $confirmCloseWindowParent = this.$confirmCloseWindow.parent(),
						taskbar = this._getTaskbarInstance(),
						pd = taskbar._extendedPosition.call($confirmCloseWindowParent, 'offset'),
						wd = taskbar._extendedPosition.call(this.$elem, 'offset'),
						css = {},
						scroll = this._getWindowScroll();

					// calculate window center
					css.top = wd.top - scroll.y;
					css.left = wd.left - scroll.x;
					css.top -= (pd.height - wd.height) / 2;
					css.left -= (pd.width - wd.width) / 2;

					$confirmCloseWindowParent.css(css).attr('data-close-window-for', self.$elem.attr('id'));

					// refresh position for those rare cases,
					// where positioning on center of parent window
					// would move confirm close window outside the containment
					this.$confirmCloseWindow.window('refreshPosition');

					this._cache.progress.close = true;

					return true;
				}
			}

			return false;
		},

		// returns calculated config for confirm close buttons
		_confirmCloseButtonsConfig: function() {
			var self = this;

			return [{
				text: this._buildConfirmCloseText('no'),
				click: function() {
					self.$confirmCloseWindow.window('close');
				}
			} , {
				text: this._buildConfirmCloseText('yes'),
				click: function() {
					// closing the parent window, so we don't need
					// to unblock or move it to the top anymore
					self.close();

					self._closeConfirmCloseWindow();
				}
			}];
		},

		_afterConfirmCloseButtonsBuild: function() {
			var buttonClasses = [
				this.classes.confirmCloseNo,
				this.classes.confirmCloseYes
			];

			// add no/yes classes based on buttons order;
			// no always go first, because it receives default focus
			$('.' + this.classes.uiDialogButtonpane, this.$confirmCloseWindow.parent()).addClass(this.classes.confirmCloseButtons).find('.' + this.classes.uiButton).each(function(index) {
				$(this).addClass(buttonClasses[index]);
			});
		},

		_buildConfirmCloseText: function(key) {
			var o = this.options;

			var keys = {
				title: this.title()
			};

			return o.confirmClose[key] ? this._getTaskbarInstance()._i18n_replace_keys(o.confirmClose[key], keys) : this._i18n(o.confirmClose[key + 'Localized'], keys);
		},

		// confirm close windows are subordinates and receive
		// some of it's options from the parent window,
		// this function keep those options up to date
		_propagateConfirmCloseOptions: function(key, prev) {
			var self = this;

			var options,
				force;

			if (typeof key !== 'object') {
				options = {};

				options[key] = prev;
			} else {
				options = key;
				force = !!prev;
			}

			$.each(options, function(key, prev) {
				if (self.$window.hasClass(self.classes.confirmClose) && key === 'confirmClose') {
					var taskbar = self._getTaskbarInstance();

					if (!taskbar) {
						return;
					}

					// warning about nesting confirm close window,
					// although, it should not be done and probably will never
					// be officially supported
					self._debugLogAdd('Trying to change confirmClose option on a window that is a confirm close window itself. Confirm close windows should not be nested.', 1, 2);
				}

				if (self.$confirmCloseWindow.length) {
					if (key === 'durations') {
						// confirm close should have the same durations as parent window
						self.$confirmCloseWindow.window('option', 'durations', self.options.durations);
					}

					if (key === 'confirmClose') {
						var o = self.options.confirmClose;

						var simpleOptions = ['modal', 'minimizable'],
							textsOptions = ['title'],
							textsBody = ['text'],
							textsButtons = ['yes', 'no'];

						// options that should be passed 1:1
						$.each(simpleOptions, function(index, value) {
							if (prev[value] !== o[value] || force) {
								self.$confirmCloseWindow.window(
									'option', value, o[value]
								);
							}
						});

						// check of text really changed
						var textChanged = function(value) {
							return prev[value] !== o[value]
								|| prev[value + 'Localized'] !== o[value + 'Localized']
								|| force;
						};

						// window title
						$.each(textsOptions, function(index, value) {
							if (textChanged(value)) {
								self.$confirmCloseWindow.window(
									'option',
									value,
									self._buildConfirmCloseText(value)
								);
							}
						});

						// confirm close body
						$.each(textsBody, function(index, value) {
							var upperKey = self._ucFirst(value);

							if (textChanged(value)) {
								self.$confirmCloseWindow.find('.' + self.classes['confirmClose' + upperKey]).text(self._buildConfirmCloseText(value));
							}
						});

						// yes/no buttons
						$.each(textsButtons, function(index, value) {
							if (textChanged(value)) {
								self.$confirmCloseWindow.window(
									'option', 'buttons', self._confirmCloseButtonsConfig()
								);

								self._afterConfirmCloseButtonsBuild();
							}
						});
					}

					if (key === 'icons') {
						self.$confirmCloseWindow.window('option', 'icons.main', self.options.icons.confirmClose);
					}

					if (key === 'title') {
						self.$confirmCloseWindow.window('option', 'title', self._buildConfirmCloseText('title'));
					}

					// rebind confirm close window when window taskbar was changed
					if (key === 'taskbar') {
						self.$confirmCloseWindow.window('option', 'taskbar', self.$taskbar);
					}
				}
			});
		},

		// close confirm close window and reset reference
		_closeConfirmCloseWindow: function() {
			var self = this;

			if (this.$confirmCloseWindow.length) {
				this.$confirmCloseWindow.window('option', {
					beforeClose: $.noop,
					close: function() {
						self._unblock();
					}
				}).window('close');

				this.$confirmCloseWindow = $();
			}
		},

		_unblock: function() {
			this.$confirmCloseWindow = $();

			// destroy window overlay
			this._placeOverlay({
								   destroy: true,
								   window: true
							   });

			this._cache.progress.close = false;
		},

		// proxy to taskbar i18n
		_i18n: function(translation, keys, language) {
			var taskbar = this._getTaskbarInstance();

			if (taskbar) {
				return taskbar._i18n(translation, keys, language);
			}

			return translation;
		},

		// create titlebar and it's buttons
		_createTitlebar: function() {
			this._super();

			if (!this._hasTaskbar()) {
				return;
			}

			var self = this;

			// rebind close click event to account for "closable" option
			this.uiDialogTitlebarClose.off('click').on('click.' + this._cache.uep, function(event) {
				event.preventDefault();

				if (self.options.closable) {
					self.close(event);
				}
			});

			this._setButtonCloseState();
			this.uiDialogTitlebarClose.attr('data-button-name', 'close');

			this.$elem = this.uiDialog.closest('.' + this.classes.uiDialog);

			this._createButton('help');
			this._createButton('maximize');
			this._createButton('minimize');

			// implement double click on titlebar for toggling maximized state
			this.uiDialogTitlebar.on('dblclick.' + this._cache.uep, function(event) {
				// only titlebar and title can trigger the behaviour,
				// no icon or buttons
				if (!$(event.target).hasClass(self.classes.uiDialogTitlebar) && !$(event.target).hasClass(self.classes.uiDialogTitle)) {
					return false;
				}

				if (!self.options.maximizable) {
					return true;
				}

				self._blurActiveElement(true);

				self._toggleMaximized();
			});
		},

		// set label and visibility to close button
		_setButtonCloseState: function() {
			this.uiDialogTitlebarClose.button('option', 'label', this._i18n('close'));

			this._addButtonClasses(this.uiDialogTitlebarClose);

			this.uiDialogTitlebarClose.toggleClass(this.classes.hidden, !this.options.closable);

			this._enumerateTitlebarButtons();
		},

		// create titlebar buttons
		_createButton: function(options) {
			var self = this;

			// normalization
			if (typeof (options) === 'string') {
				options = {
					button: options
				};
			}

			var b = options.button, B = this._ucFirst(b);

			// remove the old one
			this.$elem.find('.' + this.classes['button' + B]).remove();

			// don't create minimize/maximize buttons if window is not minimizable/maximizable
			if (b === 'help' && !this.options.help || b === 'maximize' && !this.options.maximizable || b === 'minimize' && !this.options.minimizable) {
				this._enumerateTitlebarButtons();

				return;
			}

			this['$' + b] = $('<button></button>').button({text: false}).attr('data-button-name', b).addClass(this.classes['button' + B] + ' ' + this.classes.button).on({
				click: function() {
					// trigger action
					if (b === 'help') {
						self._openHelp();
					}

					if (b === 'minimize') {
						self[b]();
					}

					if (b === 'maximize') {
						self._toggleMaximized();
					}

					if (b === 'minimize') {
						this.blur();
					} else {
						self.moveToTop();
					}
				},
				mousedown: function() {
					$(this).siblings('.' + self.classes.uiButton).removeClass(self.classes.uiStateHover);

					if (b === 'maximize') {
						this.focus();
					}
				}
			 });

			this._setIcon({
				button: b
			});

			this._setButtonText({
				button: b
			});

			// insert into right position
			if (b === 'help') {
				this['$' + b].appendTo(this.uiDialogTitlebar);
			} else {
				this['$' + b].insertAfter(this.uiDialogTitlebarClose);
			}

			this._enumerateTitlebarButtons();
		},

		// changes duration of maximire/restore and show/minimize methods,
		// for when one method was called during the second one,
		// so reverting it to a previous state would take about the same
		// time as passed from first animation start
		_speedUpAnimation: function(action, animationProgress) {
			return typeof (this.options.durations[action]) === 'string'
				   ? $.fx[this.options.durations[action]]
				   : this.options.durations[action] * animationProgress;
		},

		// this is main function for manipulation windows order
		_moveToTop: function(settings, silent) {
			var self = this,
				// settings.type indicate that we deal with event
				isEventTriggered = settings && settings.type,
				// normalize settings
				highest = settings && settings.highest === true,
				skipThis = settings && settings.skipThis === true,
				skipMinimizing = settings && settings.skipMinimizing === true,
				blurModals = settings && settings.blurModals === true,
				$skipCloseWindow = $(),
				activeElement = document.activeElement,
				$modal = this._getActiveModal().filter(':visible').not('.' + this.classes.windowMinimizing),
				taskbar = this._getTaskbarInstance(),
				$modals = $();

			if (!taskbar) {
				return;
			}

			// if there is modal present, don't make this window active
			if ($modal.length && !this.options.modal) {
				skipThis = true;
			}

			// minimizing window can't be moved to top,
			// if it come from user interaction
			if (this._cache.minimizing && isEventTriggered) {
				return;
			}

			var wasOnTop = this.$elem.hasClass(this.classes.windowTop);

			if (this._cache.progress.close && !skipThis) {
				highest = true;

				// remove confirm close window from set of windows to blur,
				// it will be later moved to top by handler on bind to overlat
				if (!this._cache.confirmCloseMinimizing && self.$confirmCloseWindow.length) {
					$skipCloseWindow = $skipCloseWindow.add(self.$confirmCloseWindow);
				}
			}

			var initialZIndex = taskbar.options.windowsInitialZIndex,
				// "skipThis" lets blur all windows; combined with "highest",
				// it will put the highest window on top - that's useful
				// for reverting active window after user clicked outside of windows
				$elem = skipThis ? null : this.$elem,
				$otherWindows = $('.' + this.classes.window).not(skipMinimizing ? null : '.' + this.classes.windowMinimizing).not('.' + this.classes.bodyOverlayed).add(skipThis ? this.$elem : null).not($elem).not($skipCloseWindow).not('.' + this.classes.modal).filter(':visible');

			$('.' + this.classes.taskbar).each(function() {
				var $taskbar = $(this);

				var instance = $taskbar.data(self._cnst.dataPrefix + 'taskbar');

				// find modals on top
				$modals = $modals.add(instance.windows().parent().filter('.' + self.classes.modal).filter('.' + self.classes.windowTop).not('.' + self.classes.windowMinimizing).filter(':visible'));
			});

			$modals = $modals.not($elem);

			// sort by z-index, we're later set new z-indexes using this order
			var windows = this._sortByZIndex($otherWindows, 'asc', 'raw');

			// if we minimize / close window, a next highest will become top window;
			// null accounts for no more windows to choose from
			if (highest) {
				$elem = windows.length ? windows.pop()[1] : null;
			}

			// if we're moving current window to top, and current window is modal,
			// minimize and revert other modals
			if ($elem === this.$elem && !skipThis && this.options.modal) {
				this._revertActiveModalZIndexes();
				this._minimizeOtherModals({
					skipZIndexRevert: true
				});
			}

			this._removeTopClasses(
				$otherWindows.add(highest ? this.$elem : null).not($modal)
			);

			// place window overlays;
			// autodetect if they should be created
			$otherWindows.each(function() {
				$(this).children('.' + self.classes.windowContent).data(self._cnst.dataPrefix + 'window')._placeOverlay({
					window: 'auto'
				});
			});

			// set new z-indexes
			$.each(windows, function(index, set) {
				set[1].css('zIndex', initialZIndex);
				initialZIndex++;
			});

			var move;

			if ($elem instanceof $) {
				if (!skipThis) {
					// move element only if it's this instance window,
					if ($elem === this.$elem) {
						// noinspection JSCheckFunctionSignatures
						var thisWasFocused = activeElement === this.$elem[0] || $.contains(this.$elem[0], activeElement),
							thisHadWindowTopClasses = this.$elem.hasClass(this.classes.windowTop);

						// Math.max account for cases when top window is modal;
						// z-index cannot go lower than z-index set by modal logic
						// noinspection JSUnresolvedFunction
						var currentZIndex = parseInt($elem.css('zIndex'), 10);
						// noinspection JSUnresolvedFunction
						$elem.css('zIndex', Math.max(
							initialZIndex, currentZIndex
						));

						// window cannot be moved to top if it has overlay,
						// meaning a confirm close procedure is ongoing
						// noinspection JSUnresolvedFunction
						if (!$elem.hasClass(this.classes.bodyOverlayed)) {
							this._setTopClasses($elem);
						}

						// focus element is this window was not on top,
						// and the move to top didn't come from user action
						if (!thisHadWindowTopClasses && !silent && (isEventTriggered || !thisWasFocused)) {
							this._focusTabbable();
							this._trigger('focus', settings);
						}

						// set z-indexes to elements affected by modal overlay,
						// but only for the current window (other modals
						// were reverted eariler)
						if (this.options.modal) {
							this._modalZIndexes({
								revertActive: false
							});
						}

						// set window button state, also set state for window
						// on top, that could be active modal
						// noinspection JSUnresolvedFunction
						$elem.add($modal).each(function() {
							$(this).children('.' + self.classes.windowContent).data(self._cnst.dataPrefix + 'window')._setConnectedButtonState();
						});
					} else {
						move = true;
					}
				} else {
					// prevents infinite loop with only one window and it's
					// close window present; there's should be a better way
					// to deal with it than a last minute hack
					// noinspection TypeScriptValidateTypes,TypeScriptValidateJSTypes,JSValidateTypes
					if ($elem[0].id !== this.$elem.attr('data-close-window-for')) {
						move = true;
					}
				}

				// use public API to moveToTop if element was not this window wrapper
				if (move) {
					// noinspection JSUnresolvedFunction
					$elem.children('.' + this.classes.windowContent).window('moveToTop');

					return;
				}
			}

			if (blurModals) {
				this._removeTopClasses($modals);
			}

			// destroy overlay if it's not full window overlay,
			// cause if it is, confirm close is in progress
			if (!this.$elem.hasClass(this.classes.bodyOverlay)) {
				this._placeOverlay({
					destroy: true
				});
			}

			if (!blurModals && $elem !== this.$elem) {
				this._setTopModalState($elem);
			}

			if ($elem === this.$elem && !wasOnTop && !this._cache.progress.close) {
				this._trigger('moveToTop', settings);
			}

			// return true if current window was really moved to top,
			// so _focusTabbable will fire
			if ($elem === this.$elem && !skipThis && !highest && !wasOnTop) {
				return true;
			}
		},

		// set classes for window on top
		_setTopClasses: function($elem) {
			var $this = $elem ? $elem : this.$elem;

			$this.addClass(this.classes.windowTop).children('.' + this.classes.uiDialogTitlebar).addClass(this.classes.uiStateActive);

			this._setConnectedButtonsState($this.children('.' + this.classes.windowContent));
		},

		// remove classes for window on top,
		// and trigger "moveToBackground" event
		// on windows that were on top
		_removeTopClasses: function($elem) {
			var $this = $elem ? $elem : this.$elem, self = this;

			$this.each(function() {
				var $this = $(this);

				if ($this.hasClass(self.classes.windowTop)) {
					$this.removeClass(self.classes.windowTop).children('.' + self.classes.uiDialogTitlebar).removeClass(self.classes.uiStateActive);
					$this.children('.' + self.classes.windowContent).data(self._cnst.dataPrefix + 'window')._trigger('moveToBackground', {}, {});
				}
			});

			this._setConnectedButtonsState($this.children('.' + this.classes.windowContent));
		},

		// trigger internal function on passed instances
		_setConnectedButtonsState: function($elems) {
			var self = this;

			$elems.each(function() {
				$(this).data(self._cnst.dataPrefix + 'window')._setConnectedButtonState();
			});
		},

		// this wrapper will either perform jQuery animation
		// or trigger handlers and set CSS prop values immediately
		// of duration is set to false
		_animate: function(css, animation) {
			if (animation.duration === false) {
				this.css(css);

				if (animation.start) {
					animation.start();
				}

				if (animation.complete) {
					animation.complete();
				}

				if (animation.always) {
					animation.always();
				}
			} else {
				this.animate(css, animation);
			}
		},

		// main closing function
		_close: function(event) {
			// interaction is in progress, call this function on interaction end
			if (this._onInteractionEnd('close') === true) {
				return;
			}

			// is closeIneavitable === true, this function was already called
			if (this._cache.closeInevitable) {
				return;
			}

			// trigger events or open confirm cloose window
			// if destroy was not called on window
			if (!this._cache.closeForced) {
				// if confirmClose.confirm is true, but confirm close window
				// was not yet opened, open it now
				if (this._openConfirmClose() === true) {
					return;
				}

				// respect prevention of beforeClose event
				if (this._trigger('beforeClose', event) === false) {
					return;
				}
			}

			// now the close couldn't not be canceled
			this._cache.closeInevitable = true;

			this._clearTimeouts();

			// is confirm close window was already opened,
			// second call of _close() function closes window
			// along with it confirm close window
			this._closeConfirmCloseWindow();

			this._taskbarUnbind();

			this._revertModalZIndexes({force: true});

			// this is for overlay so it will hide instantaneously
			this.options.durations = {minimize: false};

			this._hideOverlay();

			this._isOpen = false;

			this._destroyOverlay();

			this.destroy();

			if (!this.opener.filter(':focusable').focus().length) {
				// Hiding a focused element doesn't trigger blur in WebKit
				// so in case we have nothing to focus on, explicitly blur the
				// active element https://bugs.webkit.org/show_bug.cgi?id=47182
				$(this.document[0].activeElement).blur();
			}

			this._trigger('close', event, {});
		},

		// main function for showing
		// it's complicated tomove it to _show() because of dialog inheritance
		show: function(event) {
			var quick = event === false,
				parsedDuration = this._parseDuration(event);

			// don't show if animations is already in progress,
			// and it's not dblclick/force show
			if (
				this._animationProgress()
				&& (
					!event
					|| !parsedDuration
					|| (event && event.type !== 'dblclick')
				)
				&& !quick
			) {
				return;
			}

			// interaction is in progress, call this function on interaction end
			if (this._onInteractionEnd('minimize', event) === true) {
				return;
			}

			var ui = {};

			// respect prevetion of "beforeShow" event
			if (
				!this._cache.suppressEvents
				&& this._trigger('beforeShow', event, ui) === false
			) {
				return;
			}

			this.$elem.removeClass(this.classes.windowMinimized);

			if (this._cache.minimized) {
				// move to the right position before showing
				this.$elem.css(this._getButtonCoordinates());
			}
			// +
			if (!this._cache.showing) {
				this.$elem.stop(true, quick);
			}

			this._cache.minimized = false;
			this._cache.showing = true;

			// cache current values
			var animationProgress = this._cache.animationProgress,
				minimizing = this._cache.minimizing
							 ? this.options.durations.minimize
							 : undefined,
				speedUpDuration;

			this.moveToTop();

			var self = this,
				props = this._cache.maximized
						? this._cache.sizes.containment
						: this._cache.sizes.self;

			if (minimizing !== undefined) {
				// if there was minimize in progress, the current progress of it
				// is used to shorten show animation, so it is has the same speed
				// as minimize; otherwise reverting minimize in progress would
				// seem slow
				speedUpDuration = this._speedUpAnimation(
					'minimize', animationProgress
				);
			}

			props.opacity = 1;

			this._deleteBottomRight(props);

			this.$elem.show().addClass(this.classes.windowShowing);

			this._interactionsState(false);

			var duration =
				this._cache.shown || event && event.type === 'dblclick' || quick
				? false
				: speedUpDuration || parsedDuration || this.options.durations.show;
			// +
			this._cache.shown = true;

			var animation = {
				duration: duration,
				complete: function() {
					self._fixTitlebarTitleWidth();
					self._setContentHeight();
					self._focusTabbable();
					if (self.$elem.hasClass(self.classes.windowTop)) {
						self._trigger('focus');
					}
				},
				progress: function() {
					self._fixTitlebarTitleWidthDuringAnimation.apply(
						self, arguments
					);
					self._setContentHeight();
				},
				always: function() {
					self.$elem.removeClass(self.classes.windowShowing).removeClass(self.classes.windowMaximizing).removeClass(self.classes.windowRestoring);

					self._cache.showing = false;
					self._interactionsState(true);
					self.refreshPosition();

					// remove opacity, so it won't interfere with
					// minimize all button hover opacity change
					self.$elem.css('opacity', '');

					self._setRestoreSize();

					var ui = {};

					self._triggerInternal('afterWindowAnimationStop');

					if (!self._cache.suppressEvents) {
						self._trigger('show', {}, ui);
					}
				}
			};

			this._animate.call(this.$elem, props, animation);
			this._createOverlay();
			this._showOverlay();
		},

		_minimize: function(event) {
			var quick = event === false,
				parsedDuration = this._parseDuration(event);

			// don't minimize when animation if in progress and minimize
			// isn't forced
			if (this._animationProgress() && !quick && !this._isMinimizeAllInProgress()) {
				return;
			}

			// interaction is in progress, call this function on interaction end
			if (this._onInteractionEnd('minimize', event) === true) {
				return;
			}

			var self = this,
				skipZIndexRevert = event && event.skipZIndexRevert,
				beforeUi = {
					minimizeAllInProgress: this._isMinimizeAllInProgress()
				};

			// respect prevetion of "beforeMinimize" event
			if (!this._cache.suppressEvents && this._trigger('beforeMinimize', {}, beforeUi) === false) {
				return;
			}

			this._clearTimeouts();

			// propagate minimize duration to confirm close window
			if (this._cache.progress.close) {
				var minimizeDuration = self.$confirmCloseWindow.window('option', 'durations.minimize');

				self.$confirmCloseWindow.window('option', 'durations.minimize', quick ? false : self.options.durations.minimize).window('minimize').window('option', 'durations.minimize', minimizeDuration);
			}

			if (!skipZIndexRevert) {
				this._revertModalZIndexes();
			}

			// this class should be added before move moveToTop,
			// so next highest window could become active
			this.$elem.addClass(this.classes.windowMinimizing);
			// +
			if (!this._isMinimizeAllInProgress() && !skipZIndexRevert) {
				this._moveToTop({
									highest: true
								});
			}

			// moveToTop was not called when minimize all was in progress,
			// so classes has to be removed now
			if (this._isMinimizeAllInProgress() || skipZIndexRevert) {
				this.$elem.removeClass(this.classes.windowTop);
			}

			if (skipZIndexRevert) {
				this._revertModalZIndexes({
					$elem: this.$elem
				});
			}

			var props = this._getButtonCoordinates(),
				duration = quick ? false  : parsedDuration || this.options.durations.minimize;

			this.$elem.stop(true, quick);

			this._blurActiveElement(true);
			this._cache.minimizing = true;
			this._interactionsState(false);

			var animation = {
				duration: duration,
				complete: function() {
					self._fixTitlebarTitleWidth();
					self._setContentHeight();
				},
				progress: function() {
					self._fixTitlebarTitleWidthDuringAnimation.apply(
						self, arguments
					);
					self._setContentHeight();
				},
				always: function() {
					self.$elem.hide().addClass(self.classes.windowMinimized).removeClass(self.classes.windowMinimizing);

					self._cache.minimizing = false;
					self._cache.minimized = true;
					self._cache.shown = false;

					self._destroyOverlay({
											 justDestroy: true
										 });

					var ui = {
						minimizeAllInProgress: self._isMinimizeAllInProgress()
					};

					if (!self._cache.suppressEvents) {
						self._trigger('minimize', {}, ui);
					}

					self._triggerInternal('afterWindowAnimationStop');
				}
			};

			this._hideOverlay();

			this._animate.call(this.$elem, props, animation);
		},

		// sets restored/maximized state
		_toggleMaximized: function(maximize, event) {
			// toggle if no particular state was requested
			if (typeof maximize === 'undefined') {
				maximize = !this.maximized();
			}

			var quick = event === false,
				parsedDuration = this._parseDuration(event),
				actionInverted = maximize ? 'maximize' : 'restore',
				action = maximize ? 'restore' : 'maximize',
				state = maximize ? 'maximized' : 'restored',
				stateInverted = maximize ? 'restored' : 'maximized',
				beforeEvent = 'before' + this._ucFirst(actionInverted);

			var ui = {};

			// interaction is in progress, call this function on interaction end,
			// restore() could also be called during drag, in which case pass
			// the execution along
			if (!this._cache.progress.restoreMaximizedDraggable && this._onInteractionEnd(action, event) === true) {
				return;
			}

			var self = this,
				progress = maximize ? 'maximizing' : 'restoring',
				progressInverted = maximize ? 'restoring' : 'maximizing',
				inProgress = action === 'restore' && this._cache.maximizing || action === 'maximize' && this._cache.restoring || this._cache.minimizing || this._cache.showing,
				animationProgress = this._cache.animationProgress;

			if (this._animationProgress() && !this._animationProgress(progressInverted) && !quick) {
				return;
			}

			// respect prevetion of "beforeRestore"/"beforeMaximize" event
			if (!this._cache.suppressEvents && this._trigger(beforeEvent, {}, ui) === false) {
				return;
			}

			// maximize or restore could be programatically called on minimized window
			if (this._cache.minimized && !this._cache.minimizing) {
				this._cache.suppressEvents = true;

				this.$elem.removeClass(this.classes.windowMinimized);

				// cache current durations
				var durations = $.extend(true, {}, this.options.durations);
				// use false to skip animations
				this.options.durations = $.extend(true, {}, this._noAnimationDurations());
				// now we're to use existing API to switch window into right state,
				// so let's show it, maximize or restore it, and minimize it again,
				// this way the last show called after durations has been reverted
				// acts like showing a maximized window
				this.show();

				if (maximize) {
					this.maximize();
				} else {
					this.restore();
				}

				this.minimize();

				this.$elem.addClass(maximize ? this.classes.windowMaximizing : this.classes.windowRestoring);

				this.options.durations = durations;

				this.show(event);

				this._cache[state] = true;
				this._cache[stateInverted] = false;

				this.$elem.removeClass(this.classes.windowShowing);

				this._cache.suppressEvents = false;

				this._trigger(maximize ? 'maximize' : 'restore', {}, {});

				return;
			}

			this._cache.maximized = maximize;
			this._cache.restored = !maximize;

			// this._cache.maximized = false;
			this._cache.minimized = false;

			this.$elem.find('.' + this.classes.uiDialogTitlebar + ' .' + this.classes.uiButton).removeClass(this.classes.uiStateHover);

			if (!maximize) {
				this.$elem.removeClass(this.classes.windowMaximized);
			}

			this.$elem.stop(true, quick).addClass(this.classes.window + '-' + progress);

			this._cache[progress] = true;
			this._cache[progressInverted] = false;

			if (this.$maximize && this.$maximize.length && this.$maximize.closest(this.uiDialogTitlebar).length) {
				this._setButtonText({
					button: 'maximize',
					label: action
				});

				this._setIcon({
					icon: action,
					button: 'maximize'
				});
			}

			this._interactionsState(false);

			var props = maximize ? this._cache.sizes.containment : this._cache.sizes.self;

			this._deleteBottomRight(props);

			// maximize or restore could be started in the middle of show or minimize,
			// so opacity is needed too
			props.opacity = 1;

			var duration = inProgress ? this._speedUpAnimation(actionInverted, animationProgress) : this.options.durations[actionInverted];

			var animation = {
				duration: quick ? false : parsedDuration || duration,
				complete: function() {
					self._fixTitlebarTitleWidth();
					self._setContentHeight();
				},
				progress: function() {
					self._fixTitlebarTitleWidthDuringAnimation.apply(
						self, arguments
					);
					self._setContentHeight();
				},
				start: function() {
					self._cache.shown = true;
				},
				always: function() {
					self._cache[progress] = false;
					self._cache[progressInverted] = false;
					self._cache[state] = true;
					self._cache[stateInverted] = false;

					self.$elem.removeClass(self.classes.window + '-' + progress).toggleClass(self.classes.windowMaximized, maximize)
					// remove opacity, so it won't interfere with
					// minimize all button hover opacity change
						 .css('opacity', '');

					self._interactionsState(!maximize);

					var ui = {};

					self._triggerInternal('afterWindowAnimationStop');

					self._fullPxPosition();

					if (!maximize && !inProgress) {
						self._setRestoreSize();
					}

					if (!self._cache.suppressEvents) {
						self._trigger(actionInverted, {}, ui);
					}
				}
			};

			this._animate.call(this.$elem, props, animation);
			this._showOverlay();
		},

		// check is any animation is in progress,
		// or if specyfic animation is in progress
		// when it's name was passed
		_animationProgress: function(key) {
			if (key) {
				return this._cache[key];
			}

			return this._cache.showing
				|| this._cache.maximizing
				|| this._cache.minimizing
				|| this._cache.restoring;
		},

		// helper for quick changing window state
		_noAnimationDurations: function() {
			return {
				maximize: false,
				minimize: false,
				show: false,
				restore: false
			};
		},

		// titlebar buttons has to be enumerated,
		// because selectors will apply to attributes set here,
		// so they'll be in the right distance from the right widget edge
		_enumerateTitlebarButtons: function() {
			this.uiDialogTitlebar.children('.' + this.classes.uiButton).removeAttr('data-button-order');

			this.uiDialogTitlebar.children('.' + this.classes.uiButton + ':not(.' + this.classes.hidden + ')').each(function(index) {
				$(this).attr('data-button-order', index);
			});
		},

		_setConnectedButtonState: function() {
			// blur all window buttons
			$('.' + this.classes.taskbar + ' .' + this.classes.taskbarWindowButton).removeClass(this.classes.uiStateActive);

			// set active state to window button
			var taskbar = this._getTaskbarInstance();

			if (!taskbar) {
				return;
			}

			var $button = this.$taskbar.taskbar('button', this.$window);

			if ($button.length) {
				taskbar._setConnectedButtonState.call($button[0], taskbar);
			}
		},

		_setWidth: function() {
			this._setDimension('width');
			this._setContentHeight();
		},

		_setHeight: function() {
			this._setDimension('height');
			this._setContentHeight();
		},

		// calculate dimensions, taking min/max/actual values
		// into account
		_setDimension: function(name) {
			var o = this.options,
				dimension = o[name],
				minKey = 'min' + this._ucFirst(name),
				maxKey = 'max' + this._ucFirst(name),
				min = o[minKey],
				current = Math.round(parseFloat(this.$elem.css(name))),
				containment = this._cache.sizes.containment,
				realContainment = this._getRealContainment();

			// auto width get natural content height,
			// measure it, and apply it if max or containment
			// are not lower
			if (dimension === 'auto') {
				this.$elem.css(name, '');
				this.$window.css(maxKey, '');

				current = Math.round(parseFloat(
					window.getComputedStyle(this.$elem[0])[name]
				));
			}

			dimension = this._cache.maximized ? containment[name] : dimension === parseInt(dimension, 10) ? Math.max(min, dimension) : Math.max(min, current);

			if (realContainment === 'viewport' && containment) {
				dimension = Math.round(Math.min(dimension, containment[name]));
			}

			if (this.options.height !== 'auto' && name === 'height') {
				if (this.uiDialogTitlebar) {
					dimension += this.uiDialogTitlebar.outerHeight();
				}
			}

			this.$elem.css(name, dimension);
		},

		// sets icon to button
		_setIcon: function(options) {
			if (typeof options.icon === 'undefined') {
				options.icon = options.button;
			}

			this['$' + options.button].button('option', 'icons.primary', this.options.icons[options.icon]);

			this._addButtonClasses(this['$' + options.button]);
		},

		// helper for refreshing all button icons
		_refreshButtonIcons: function() {
			this._setIcon({
				button: 'help'
			});

			this._setIcon({
				button: 'close'
			});

			this._setIcon({
				button: 'minimize'
			});

			this._setIcon({
				icon: this._cache.maximized ? 'restore' : 'maximize',
				button: 'maximize'
			});
		},

		// sets labels for buttons
		_setButtonsTexts: function() {
			var self = this;

			$.each(this._titlebarButtons, function(index, button) {
				var $button = self['$' + button];

				if ($button && $button.length && $button.hasClass(self.classes.uiButton)) {
					self._setButtonText({
						button: button,
						// maximize/restore has custom label,
						// other buttons use their names as label keys
						label: button === 'maximize' ? self._cache.maximized ? 'maximize' : 'restore' : undefined
					});
				}
			});
		},

		// set text to button, use label or button name as dictionary key
		_setButtonText: function(options) {
			this['$' + options.button].button('option', 'label', this._i18n(options.label || options.button));
			this._addButtonClasses(this['$' + options.button]);
		},

		// this classes is needed on button children, because taskbar inspects
		// window click event to check if it's being triggered on window or window
		// children, but the moment it happens, the original click target, in case
		// it's maximize/restore button, is detached, because of icon change,
		// so there's no way of finding it's parents, and some other way
		// of determining that this is part of window is required;
		// this class is the way do to it
		_addButtonClasses: function($button) {
			$button.find('.' + this.classes.uiButtonIconPrimary + ', .' + this.classes.uiButtonText).addClass(this.classes.titlebarButtonIcon);
		},

		// set state (enabled/disabled) of user interaction
		_interactionsState: function(state) {
			this._draggableState(state);
			this._resizableState(state);
		},

		// set interaction state or act as getter if first parameter isn't passed
		_interactionInProgress: function(inProgress) {
			// getter
			if (typeof inProgress === 'undefined') {
				return this._cache.progress.interaction;
			}

			// setter
			this._cache.progress.interaction = inProgress;

			// if draggable or resizable finished, check if
			// any action were requested during them, and fire them,
			if (inProgress === false) {
				var len = this._cache.onInteractionEnd.length;

				// iterate if there's anything to iterate over
				if (len) {
					for (var i = 0; i < len; i++) {
						var action = this._cache.onInteractionEnd[i];

						if ($.inArray(action.action, ['close', 'destroy']) > -1) {
							this[action.action]();

							// no more actions can be fired after close or destroy
							// has been fired
							break;
						}

						// fire action only if it was called with quick === true param,
						// or fire it if it is last action in queue
						if (action.quick === false || i + 1 === len) {
							this[action.action](action.quick);
						}
					}

					// make this queue empty again
					this._cache.onInteractionEnd = [];
				}
			}
		},

		// add event to trigger after interaction finishes
		_onInteractionEnd: function(action, quick) {
			if (this._interactionInProgress() === true) {
				this._cache.onInteractionEnd.push({
													  action: action,
													  quick: quick
												  });

				return true;
			}
		},

		// set draggable widget state
		_draggableState: function(state) {
			if (this.$elem.hasClass(this.classes.uiDraggable)) {
				// draggable is available anyway on fully maximized window with
				// "maximizedDraggable" option set to true, otherwise take
				// the passed param into account
				var maximizedDraggableAvailable = this.options.maximizedDraggable
					&& this._cache.maximized
					&& !this._animationProgress(),
					draggable = (state || maximizedDraggableAvailable)
						&& this.options.draggable;

				// noinspection JSValidateTypes
				this.$elem.draggable(draggable ? 'enable' : 'disable');
			}

			this._removeClassDisabled();
		},

		_resizableState: function(state) {
			if (this.$elem.hasClass(this.classes.uiResizable)) {
				this.$elem.resizable(
					state && this.options.resizable
					? 'enable'
					: 'disable'
				);
			}

			this._removeClassDisabled();
		},

		_clearTimeouts: function() {
			clearTimeout(this._cache.timeouts.closeWindowShow);
		},

		// on resizable and draggable, we only want the behaviour,
		// not the visual of widget's disabled state
		_removeClassDisabled: function() {
			this.$elem.removeClass(this.classes.uiStateDisabled);
		},

		_setRestoreSize: function() {
			// don't update size if window is maximized, maximizing,
			// minimized, or minimizing
			if (!this.maximized() && !this.minimized()) {
				var $e = this.$elem;

				// write the current window size and position along with
				// container size and position - it's required for calculations
				// later when taskbar position, number of taskbars
				// or window size changes
				this._cache.sizes = {
					self: this._getDimensions.call($e, {
						position: true
					})
				};

				this._cache.sizes.diffs = {
					width: $e.outerWidth() - $e.width(),
					height: $e.outerHeight() - $e.height()
				};

				this._refreshContainmentSize();
			}
		},

		_refreshContainmentSize: function() {
			this._cache.sizes.containment = this._getDimensions.call(
				this._getRealContainmentObject(), {
					position: true
				});

			this._refreshTaskbarMargins();

			// this allow maximize animation to go flawlessly
			this._cache.sizes.containment.width -= this._cache.sizes.diffs.width;
			this._cache.sizes.containment.height -= this._cache.sizes.diffs.height;
		},

		_refreshTaskbarMargins: function() {
			var taskbar = this._getTaskbarInstance();

			if (!taskbar) {
				return;
			}

			this._cache.sizes.margins = taskbar._getMaxTaskbarsMargins();
		},

		// get dimensions of element
		_getDimensions: function(options) {
			var $e = this;
			var position = $.extend({}, options && options.position ? $e.position() : $e.offset(), {
				width: options && options.outer ? $e.outerWidth() : $e.width(),
				height: options && options.outer ? $e.outerHeight() : $e.height()
			});

			position.bottom = position.height + position.top;
			position.right = position.width + position.left;

			return position;
		},

		// get the current offset of button this window if binded to,
		// so minimize/restore could have the right animation effect
		_getButtonCoordinates: function() {
			var $button = this.button(),
				horizontal = this.$taskbar.hasClass(this.classes.taskbarHorizontal),
				dimensions = this._getDimensions.call($button, {
					offset: true
				});

			dimensions.top -= $(window).scrollTop();
			dimensions.left -= $(window).scrollLeft();

			dimensions.opacity = 0;
			dimensions[horizontal ? 'height' : 'width'] = 0;

			var edge = this.$taskbar.data(this._cnst.dataPrefix + 'taskbarEdge');

			// this will minimize windows to the edge of the taskbar
			if (edge === 'top') {
				dimensions.top += this.$taskbar.height();
			}
			// this will minimize windows to the edge of the taskbar
			if (edge === 'left') {
				dimensions.left += this.$taskbar.width();
			}

			this._deleteBottomRight(dimensions);

			return dimensions;
		},

		// main function get refreshing window position
		_refreshPosition: function(options) {
			var self = this;

			options = options || {};

			if (this._cache.minimized && !this._cache.minimizing) {
				return;
			}

			var currentContainment = this._getRealContainment();

			// refreshPosition is a time-consuming operation
			// skipOnFit let's skip the operation if window if withing containment
			// and the "containment" option value didn't change since last refresh,
			// and it's not "viewport", which is more restrict than "visible"
			if (
				options
				&& options.skipOnFit
				&& currentContainment === this._cache.refreshPositionContainment
				&& currentContainment !== 'viewport'
			) {
				var taskbar = this._getTaskbarInstance();

				if (!taskbar) {
					return;
				}

				var containmentPosition = taskbar._extendedPosition.call(
					taskbar.$windowsContainment, 'offset'
				);
				var windowPosition = taskbar._extendedPosition.call(
					this.$elem, 'offset'
				);

				if (
					windowPosition.right <= containmentPosition.right
					&& windowPosition.bottom <= containmentPosition.bottom
					&& windowPosition.top >= containmentPosition.top
					&& windowPosition.left >= containmentPosition.left
				) {
					return;
				}
			}

			// interaction is in progress, call this function on interaction end
			if (this._animationProgress()) {
				this._bindInternal('afterWindowAnimationStop', function() {
					self.refreshPosition();
				});

				return;
			}

			this._cache.progress.refreshPosition = true;

			this.$elem.stop(true, true);

			this._refreshContainmentSize();
			this._setContainment();

			var c = this._cache.sizes.containment,
				e = this._cache.sizes.self;

			// maximized window should stretch to container and that's it
			if (this.maximized()) {
				this.$elem.css(c);
			}

			if (this.$windowOverlay && this.$windowOverlay.length) {
				// refresh existing overlays
				if (this.$windowOverlay.hasClass(this.classes.contentOverlay)) {
					this._placeOverlay({
										   content: true
									   });
				} else {
					this._placeOverlay({
										   window: true
									   });
				}
			}

			// cache containment really used by this function
			this._cache.refreshPositionContainment = currentContainment;

			if (this._cache.refreshPositionContainment === 'visible') {
				this._setWidth();
				this._setHeight();

				this._moveIntoView();

				this._setRestoreSize();

				this._cache.progress.refreshPosition = false;

				this._refreshPositionOption();

				return;
			}

			e.width = Math.min(e.width, c.width);
			e.height = Math.min(e.height, c.height);

			var wasntRestored = false,
				wasMaximized = this.maximized(),
				wasMinimized = this.minimized(),
				durations;

			if (wasMaximized || wasMinimized) {
				wasntRestored = true;

				this._cache.suppressEvents = true;

				durations = $.extend(true, {}, this.options.durations);

				this.options.durations = $.extend(
					true, {}, this._noAnimationDurations()
				);
				this.restore();
			}

			this._setRestoreSize();

			e = this._fixPosition(e);
			e = this._roundObj(e);

			$.extend(this._cache.sizes.self, e);

			this.$elem.css(e);

			this._setWidth();
			this._setHeight();

			this._setRestoreSize();

			if (wasMaximized) {
				this.maximize();
			}

			if (wasMinimized) {
				this.minimize();
			}

			if (wasntRestored) {
				this.options.durations = durations;
				this._cache.suppressEvents = false;
			}

			this._moveIntoView();
			this._fixTitlebarTitleWidth();
			this._setContentHeight();

			this._setRestoreSize();

			this._refreshPositionOption();

			this._cache.progress.refreshPosition = false;

			return this;
		},

		// this function will calculate window position
		// for "containment": "visible", and optionally apply
		// calculated values to widget
		_bringIntoView: function(options) {
			// noinspection JSUnusedLocalSymbols
			var $title = this.$title;
			var taskbar = this._getTaskbarInstance();

			if (!taskbar) {
				return;
			}

			var td = taskbar._extendedPosition.call(this.$title, 'offset');
			var cd = taskbar._extendedPosition.call(this._getRealContainmentObject(), 'offset');
			var ed = taskbar._extendedPosition.call(this.$elem);
			var r = this._bringIntoViewReserve();

			// noinspection JSUnusedLocalSymbols
			var tp = window.getComputedStyle(this.$title[0]);

			var diffs = {},
				realDiffs = {};

			realDiffs.top = (cd.top - (td.bottom - r)) * -1;
			realDiffs.bottom = cd.bottom - (td.top + r);
			realDiffs.left = (cd.left - (td.right - r)) * -1;
			realDiffs.right = cd.right - (td.left + r);

			if (options && options.round) {
				// noinspection JSSuspiciousNameCombination
				realDiffs.top = Math.round(realDiffs.top);
				// noinspection JSSuspiciousNameCombination
				realDiffs.bottom = Math.round(realDiffs.bottom);
				realDiffs.left = Math.round(realDiffs.left);
				realDiffs.right = Math.round(realDiffs.right);
			}

			diffs.top = Math.min(realDiffs.top, 0);
			diffs.bottom = Math.min(realDiffs.bottom, 0);
			diffs.left = Math.min(realDiffs.left, 0);
			diffs.right = Math.min(realDiffs.right, 0);

			if (options && options.diffs) {
				return diffs;
			}

			if (options && options.move) {
				var css = {};
				css.top = ed.top;
				css.left = ed.left;
				css.top -= diffs.top;
				css.top += diffs.bottom;
				css.left -= diffs.left;
				css.left += diffs.right;
				css = this._roundObj(css);
				this.$elem.css(css);
			}
		},

		_fixPosition: function(e) {
			this._refreshContainmentSize();

			var realContainment = this._getRealContainment(),
				c = this._cache.sizes.containment,
				self = this;

			e = e || $.extend({}, this._cache.sizes.self);

			this._deleteBottomRight(e);

			// itterate over pair of top/left and height/width properties
			$.each([{
					edge: 'top',
					dimension: 'height'
				} , {
					edge: 'left',
					dimension: 'width'
				}], function(index, set) {
					if (realContainment === 'viewport') {
						// constraint window to viewport: if it's over top/left edge,
						// correct that, and if it's wider/higher than containment,
						// correct that to match containment dimensions
						if (e[set.edge] !== (e[set.edge] = Math.max(e [set.edge], c[set.edge]))) {
							e[set.dimension] = Math.min(e[set.dimension], c[set.dimension]);
						}

						// constraint window to viewport: if it's over bottom/right edge,
						// calculate diff, then if diff is greater than top/left value,
						// extract it from top/left value, otherwise extract diff from
						// top/left value, then extract edge value from dimensions value
						if (e[set.edge] + e[set.dimension] > c[set.edge] + c[set.dimension]) {
							var diff = (e[set.edge] + e[set.dimension]) - (c[set.edge] + c[set.dimension]);

							if (e[set.edge] >= diff) {
								e[set.edge] -= diff;
							} else {
								e[set.edge] -= diff;
								e[set.dimension] -= Math.abs(e[set.edge]);
								e[set.edge] = 0;
							}
						}
					}

					var min = 'min' + self._ucFirst(set.dimension);
					// noinspection JSUnusedLocalSymbols
					var max = 'max' + self._ucFirst(set.dimension);

					// if current height/width is lower than minHeight/minWidth,
					// set width/height as high as possible
					if (self.options[min] > e[set.dimension]) {
						e[set.dimension] = Math.min(self.options[min], c[set.dimension]);
					}
				}
			);

			return e;
		},

		_deleteBottomRight: function(obj) {
			// delete those two: we like to pass this object to jQuery css function,
			// and having both top/left and bottom/right set explicitly
			// does not work well with box-sizing: content-box, and probably
			// isn't good idea anyway, since we always use top/left/width/height
			// for all calculations anyway
			delete obj.bottom;
			delete obj.right;
		},

		// find by how much should the tolerance by for draggable
		// handle visibility, based on titlebar font-size
		_bringIntoViewReserve: function() {
			return parseInt(
				this.uiDialogTitlebar.find('.' + this.classes.uiDialogTitle).css('fontSize'),
				10
			);
		},

		_moveIntoView: function() {
			this._bringIntoView({move: true});
		},

		// helper for rounding all values in a given object,
		// if they are roundable
		_roundObj: function(obj) {
			if (typeof obj === 'object') {
				$.each(obj, function(index, elem) {
					// noinspection JSCheckFunctionSignatures
					if (!isNaN(parseInt(elem), 10)) {
						obj[index] = Math.round(parseFloat(elem));
					}
				});
			}

			return obj;
		},

		// round css properties responsible for size and position,
		// optionally only those passed as argument,
		// not having full pixels causes hard to mantain behaviours,
		// so widget and window properties should always be rounded,
		// when they are changed
		_fullPxPosition: function(props) {
			var self = this;

			$.each(props || ['top', 'left', 'width', 'height'],
				   function(index, pos) {
					   self.$elem.css(pos, Math.round(
						   parseFloat(self.$elem.css(pos))
					   ));
				   });
		},

		// sets calculated width of titlebar,
		// this function is usually called during resize and animations
		_fixTitlebarTitleWidth: function() {
			var $lastButton = this.$elem.find('.' + this.classes.uiDialogTitlebar + ' .' + this.classes.uiButton + ':last'),
				$lastButtonPrev = $lastButton.prev('.' + this.classes.uiButton);

			if (!$lastButton.length || !$lastButtonPrev.length) {
				return;
			}

			var $title = this.$elem.find('.' + this.classes.uiDialogTitle),
				space = $lastButtonPrev.offset().left - $lastButton.offset().left - $lastButton.outerWidth();

			$title.css('width', $lastButton.offset().left - $title.offset().left - space);
		},

		_fixTitlebarTitleWidthDuringAnimation: function() {
			if (typeof (arguments[1]) === 'number') {
				this._cache.animationProgress = arguments[1];
			}
			this._fixTitlebarTitleWidth();
		},

		_setWindowIcon: function() {
			var $icon = this.$elem.find('.' + this.classes.icon);

			if ($icon.length && this.options.icons.main === null) {
				$icon.remove();
			}

			this.uiDialogTitlebar.removeClass(this.classes.titlebarIcon);

			var taskbar = this._getTaskbarInstance();

			if (!taskbar) {
				return;
			}

			var $button = taskbar.$elem.find('[data-window-id=' + this.$window[0].id + ']');

			taskbar._refreshWindowButtonIcon.call($button, taskbar);

			if (this.options.icons.main === null) {
				return;
			}

			this.uiDialogTitlebar.addClass(this.classes.titlebarIcon);

			if (!$icon.length) {
				$icon = $('<span></span>').prependTo(this.uiDialogTitlebar);
				// $icon = $("<button class=\"ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only\" type=\"button\" role=\"button\" title=\"Menu\"></button>").prependTo(this.uiDialogTitlebar);
			}

			if (this.options.icons.main.indexOf('/') !== -1 || this.options.icons.main.indexOf('.') !== -1) {
				$icon.css({
							  'background-image': 'url(' + this.options.icons.main + ')',
							  'background-repeat': 'no-repeat',
							  'background-position': 'center',
							  'background-size': 'cover'
						  }).addClass(this.classes.uiIcon + ' ' + this.classes.icon);
			} else {
				$icon
				//.removeAttr("class")
				.addClass(this.classes.uiIcon + ' ' + this.classes.icon + ' ' + this.options.icons.main);
			}

			var self = this;

			// implement double click on main icon for closing window
			$icon.on('dblclick.' + this._cache.uep, function(event) {
				if (self.options.closable) {
					self.close(event);
				}
			});
		},

		_setContentHeight: function() {
			var taskbar = this._getTaskbarInstance();

			if (!taskbar) {
				return;
			}

			this.$window.css({
				height: 'auto',
				maxHeight: ''
			});

			var e = taskbar._extendedPosition.call(this.$elem, 'offset');
			var w = taskbar._extendedPosition.call(this.$window, 'offset');

			var maxHeight = Math.round(e.bottom - w.top - parseFloat(this.$window.css('borderBottomWidth')) - parseFloat(this.$window.css('paddingTop')) - parseFloat(this.$window.css('paddingBottom')));

			if (this.uiDialogButtonPane.length && this.uiDialogButtonPane.children().length) {
				maxHeight -= this.uiDialogButtonPane.outerHeight();
			}

			if (this.uiDialogTitlebar) {
				maxHeight -= 4;
			}

			if (this.options.height !== 'auto') {
				this.$window.css('height', maxHeight);
			}

			this.$window.css('maxHeight', maxHeight);
		},

		_createTitleForEmpty: function() {
			if (this._hasTaskbar()) {
				if (this.options.title === null) {
					var $containment = this.$taskbar.data(this._cnst.dataPrefix + 'taskbar').$windowsContainment;

					var newWindowsCount = $containment.data(this._cnst.dataPrefix + 'taskbarNewWindowsCount') || 0;

					var number = typeof this._cache.newWindowNumber === 'number'
								 ? this._cache.newWindowNumber
								 : ++newWindowsCount;

					this._cache.newWindowNumber = number;
					this._setNewWindowTitle(number);

					$containment.data(
						this._cnst.dataPrefix + 'taskbarNewWindowsCount',
						newWindowsCount
					);
				}
			}
		},

		_title: function() {
			if (this.options.titleLocalized) {
				if (this._i18n(this.options.titleLocalized)) {
					this._setTitle(this._i18n(this.options.titleLocalized));
				} else {
					this._setTitle(this._cache.title);

					var taskbar = this._getTaskbarInstance();

					this._debugLogAdd(
						'Missing translation for window title ' +
						'with key "' + this.options.titleLocalized
						+ '" in language "' + taskbar.options.language + '".',
						2, 1
					);
				}
			} else {
				// null === createTitleForEmpty set the title already
				if (this._cache.title !== null) {
					this._setTitle(this._cache.title);
				}
			}
		},

		_setNewWindowTitle: function(number) {
			this._setTitle(number === 1
						   ? this._i18n('newWindow')
						   : this._i18n('newWindowNext', {
					counter: number
				}));
		},

		_setTitle: function(title) {
			if (!arguments.length) {
				title = this._cache.realTitle;
			}

			this._cache.realTitle = title;

			if (this.uiDialogTitlebar) {
				var $title = this.uiDialogTitlebar.find('.' + this.classes.uiDialogTitle);

				if (!this._cache.realTitle) {
					$title.html('&#160;');
				} else {
					$title.html(this._cache.realTitle);
				}
			}

			this._setConnectedButtonTitle();
		},

		_setConnectedButtonTitle: function() {
			var title = this._cache.realTitle,
				taskbar = this._getTaskbarInstance(),
				$button;

			if (!taskbar) {
				return;
			}

			try {
				$button = this.$taskbar.taskbar('button', this.$window);
			} catch (e) {
				// there are no button yet, so it's too soon to set title
				// (it's set upon window button creation)
				return;
			}

			if ($button.attr('data-group-name')) {
				var $menuItem = taskbar.connectedElement($button).filter('.' + this.classes.uiMenu).find('[data-window-id="' + this.$window[0].id + '"]');

				taskbar._refreshWindowButtonIcon.call($menuItem, taskbar);
			} else {
				taskbar._buttonSetTitle.call(
					$button, title, this._getTaskbarInstance()
				);
			}
		},

		_cacheTitle: function(title) {
			this._cache.title = title;
		},

		_focusTabbable: function() {
			$(document.activeElement).blur();
			this._super();
			this._blurActiveElement();
		},

		_sortByZIndex: function($elems, order, dataType) {
			var windows = [];

			// so windows with removed zIndex won't be skipper
			var c = this._cnst.lowestPossibleZIndex;

			$elems.each(function() {
				// we either have numeric zIndex or use faked zIndex
				var zIndex = parseInt($(this).css('zIndex'), 10) || ++c;

				windows.push([zIndex, $(this)]);
			});

			// sort windows by zIndex
			windows.sort(function(a, b) {
				return order === 'asc' ? a[0] - b[0] : b[0] - a[0];
			});

			if (dataType === 'raw') {
				return windows;
			}

			var $set = $();

			$.each(windows, function(index, $elem) {
				$set = $set.add($elem[1]);
			});

			return $set;
		},

		// set  z-indexes to element that should be covered and should not
		// be covered by modal overlay
		_setModalZIndexes: function() {
			this.$elem.removeClass(this.classes.modal);

			if (!this.options.modal) {
				return;
			}

			var self = this;

			this.$elem.addClass(this.classes.modal);

			// noinspection JSUnusedLocalSymbols
			var modalOverlay = this.options.modalOverlay,
				zIndex = this._cnst.lowestPossibleZIndex,
				isNot = false,
				$setCover = $(),
				$setNoCover = $(),
				$taskbars = $('.' + this.classes.taskbar),
				$windows = $('.' + this.classes.window);

			if (modalOverlay === 'all') {
				$setCover = $setCover.add($taskbars).add($windows);

				$setNoCover = $();
			} else if (modalOverlay === 'viewport') {
				$setCover = $setCover.add($windows);

				$setNoCover = $setNoCover.add($taskbars);
			} else if (modalOverlay instanceof $) {
				$setCover = $setCover.add($taskbars).add($windows).not(modalOverlay);

				$setNoCover = modalOverlay;
			} else {
				return;
			}

			$setCover = $setCover.not(this.$elem).not('.' + this.classes.modal + '.' + this.classes.windowTop);

			$setNoCover = $setNoCover.not(this.$elem).not('.' + this.classes.modal + '.' + this.classes.windowTop);

			var ui = {};

			ui.$setCover = $setCover;
			ui.$setNoCover = $setNoCover;

			this._trigger('modalOverlaySetsCreated', {}, ui);

			$setCover = ui.$setCover;
			$setNoCover = ui.$setNoCover;

			var set = function(covered) {
				var $this = $(this),
					selfZIndex = parseInt($this.css('zIndex'), 10);

				zIndex = Math.max(selfZIndex, zIndex);

				var inlineZIndex = self._hasInlineProperty($this, 'z-index');

				var className = covered ? self.classes.coveredByOverlay + self.uuid : self.classes.notCoveredByOverlay + self.uuid;

				if (!$this.hasClass(className)) {
					$this.data(self._cnst.dataPrefix + 'previousZIndex' + self.uuid, selfZIndex).data(self._cnst.dataPrefix + 'inlineZIndex' + self.uuid, inlineZIndex).addClass(className);
				}
			};

			if ($setCover.length) {
				$setCover.each(function() {
					set.call(this, true);
				});

				$setCover = this._sortByZIndex($setCover, 'desc');

				var zIndexDown = zIndex;

				$setCover.each(function() {
					$(this).css('zIndex', --zIndexDown);
				});
			}

			// noinspection JSUnusedGlobalSymbols
			this.$overlaySet = $setCover;

			if (!this.overlay) {
				this._createOverlay();
				this._hideOverlay(false);
			}

			if (zIndex === this._cnst.lowestPossibleZIndex) {
				zIndex = parseInt(this.$elem.css('zIndex'), 10);
			}

			this._cache.modalOverlayZIndex = ++zIndex;

			this.overlay.css('zIndex', this._cache.modalOverlayZIndex);

			if ($setNoCover.length) {
				$setNoCover.each(function() {
					set.call(this, false);
				});

				$setNoCover = this._sortByZIndex($setNoCover, 'asc');

				$setNoCover.each(function() {
					$(this).css('zIndex', ++zIndex);
				});
			}

			this.$elem.css('zIndex', ++zIndex);
		},

		_modalZIndexes: function(options) {
			if (!options || options.revertActive !== false) {
				this._revertActiveModalZIndexes();
			}
			this._revertModalZIndexes();
			this._setModalZIndexes();
		},

		_revertModalZIndexes: function(force) {
			if (!this.options.modal) {
				return;
			}

			var options = {};

			if (typeof force === 'object') {
				options = force;
				force = !!options.force;
			}

			var self = this;

			var revert = function() {
				var $this = $(this);

				if (
					$this.hasClass(self.classes.modal)
					&& $this.hasClass(self.classes.windowTop) && !force
				) {
					return true;
				}

				var zIndex = $this.data(
					self._cnst.dataPrefix + 'previousZIndex' + self.uuid
					),
					inlineZIndex = $this.data(
						self._cnst.dataPrefix + 'inlineZIndex' + self.uuid
					),
					revertZIndex = inlineZIndex ? zIndex : '';

				$this.removeData(self._cnst.dataPrefix + 'previousZIndex' + self.uuid).removeData(self._cnst.dataPrefix + 'inlineZIndex' + self.uuid).removeClass(self.classes.coveredByOverlay + self.uuid).removeClass(self.classes.notCoveredByOverlay + self.uuid).css('zIndex', revertZIndex);
			};

			if (options.$elem) {
				$(options.$elem).each(revert);

				return;
			}

			$('.' + this.classes.coveredByOverlay + this.uuid).each(revert);
			$('.' + this.classes.notCoveredByOverlay + this.uuid).each(revert);
		},

		_revertActiveModalZIndexes: function() {
			var $activeModals = this._getAllModals();

			var self = this;

			if ($activeModals.length) {
				$activeModals.children('.' + this.classes.windowContent).each(function() {
					var $this = $(this);

					var instance = $this.data(self._cnst.dataPrefix + 'window');

					instance._revertModalZIndexes({
													  force: true
												  });
				});
			}
		},

		// if modal was on top, keep it there
		_setTopModalState: function($elem) {
			var $modal = this._getActiveModal();

			if (this.options.modal) {
				$modal = $modal.add(this.$elem);
			}

			$modal = $modal.filter('.' + this.classes.windowTop);

			if (
				$modal.length
				&& (!$elem || $modal.attr('id') !== $elem.attr('id'))
			) {
				$modal.children('.' + this.classes.windowContent).window('moveToTop', null, true);
			}
		},

		_getActiveModal: function() {
			return $('.' + this.classes.modal).not('.' + this.classes.windowMinimizing + ':visible').not(this.$elem);
		},

		_getAllModals: function() {
			return $('.' + this.classes.modal).not(this.$elem);
		},

		_minimizeOtherModals: function(options) {
			if (!this.options.modal) {
				return;
			}

			var self = this;

			// there could be only one modal present
			// - if there is already modal opened and it's not this window,
			// minimize it
			var $modal = this._getActiveModal();

			if ($modal.length) {
				$modal.each(function() {
					var $window = $(this).children('.' + self.classes.windowContent);

					// force minimize window
					// noinspection JSUnresolvedFunction
					var minimize = $window.window('option', 'durations.minimize');

					// noinspection JSUnresolvedFunction
					$window.window('option', 'durations.minimize', false).window('minimize', options).window('option', 'durations.minimize', minimize);
				});
			}
		},

		_isMinimizeAllInProgress: function() {
			return !!this._getTaskbarInstance().$windowsContainment.data(this._cnst.dataPrefix + 'minimizeAllInProgress');
		},

		_hideTaskbarsSubordinates: function() {
			$('.' + this.classes.taskbar).taskbar('hideSubordinates');
		},

		_createOverlay: function() {
			if (this.overlay || !this.options.modal) {
				return;
			}

			this._super();

			var self = this;

			// mimics
			// github.com/jquery/jquery-ui/commit/55360eeb7eae5c560d51b09178e64d83c59223a6
			if (this._versionOf('dialog', '==', '1.10.0')) {
				this.overlay.appendTo(this._appendTo());
			}

			this.overlay.addClass(this.classes.dialogOverlay).css('zIndex', this._cache.modalOverlayZIndex).attr('data-taskbar-uuid', this._getTaskbarInstance().uuid).attr('data-window-uuid', this.uuid).on(
				'click.' + this._cache.uep +
				' dblclick.' + this._cache.uep,
				function(event) {
					if (self.options.minimizable) {
						self.minimize(event.type === 'dblclick' ? false : undefined);
					}
				});
		},

		_destroyOverlay: function(options) {
			var justDestroy = options && options.justDestroy;

			if (!this.overlay) {
				return;
			}

			this.overlay.stop(true, true);

			if (this.options.modal && !justDestroy) {
				this._revertModalZIndexes({force: true});
			}

			this._super();

			// jQuery UI 1.10.0 fix
			if (this.overlay && this.overlay.length) {
				this.overlay = null;
			}
		},

		_showOverlay: function() {
			if (!this.options.modal || !this.overlay) {
				return;
			}

			var opacity = this._getTaskbarInstance()._styleIndicator(this.classes.uiWidgetOverlay, 'opacity').opacity;

			this.overlay.show().stop(false, true);

			var props = {
				opacity: opacity
			};

			var animation = {
				duration: this.options.durations.show
			};

			this._animate.call(this.overlay, props, animation);
		},

		_hideOverlay: function(quick) {
			if (!this.options.modal) {
				return;
			}

			var self = this;

			if (!this.overlay) {
				return;
			}

			this.overlay.stop(true, true);

			var props = {
				opacity: 0
			};

			var animation = {
				duration: typeof quick !== 'undefined' ? quick : this.options.durations.minimize,
				always: function() {
					if (self.overlay) {
						self.overlay.hide();
					}
				}
			};

			this._animate.call(this.overlay, props, animation);
		},

		_placeOverlay: function(options) {
			options = options || {};

			this.$elem.find('.' + this.classes.windowOverlay + ':not(.' + this.classes.bodyOverlay + ')').remove();

			this.$elem.removeClass(this.classes.contentOverlayed);
			this.$windowOverlay = null;

			if (options && options.window === 'auto') {
				options.window = this.$elem.hasClass(this.classes.bodyOverlay);
			}

			var self = this;

			if (options && options.destroy) {
				if (options.window) {
					this.$elem.removeClass(this.classes.bodyOverlayed).find('.' + this.classes.windowOverlay).remove();
				}

				return;
			}

			options.content = (this.options.embeddedContent || options.content) && (!options || !options.window);

			if (this.$elem.hasClass(this.classes.windowTop) && options.content) {
				return;
			}

			// can't have focused elements under the overlay
			this._blurActiveElement();

			if (!options.content && options.destroy) {
				return;
			}

			if (options.content || options.window) {
				// return if window overlay is already present and content overlay is about to be set
				if (this.$elem.find('.' + this.classes.bodyOverlay).length && (!options || !options.window)) {
					return;
				}

				this.$windowOverlay = $('<div></div>').addClass(this.classes.windowOverlay + ' ' + this.classes.uiWidgetOverlay).addClass(options.content ? this.classes.contentOverlay : this.classes.bodyOverlay);

				this.$elem.find('.' + this.classes.windowOverlay).remove();

				this.$elem.prepend(this.$windowOverlay);

				this.$elem.addClass(options.content ? this.classes.contentOverlayed : this.classes.bodyOverlayed);
			}

			if (options.content) {
				this.$windowOverlay.on('mousedown.' + this._cache.uep, function(event) {
					self._clearTrigger(event);
				});
			}

			if (options.window) {
				// show confirm close window when user tries to moveToTop
				// window with confirm close in progress
				this.$windowOverlay.off('mousedown.' + this._cache.uep).on('mousedown.' + this._cache.uep, function() {
					if (self._cache.progress.close && self.$confirmCloseWindow.length) {
						self.$confirmCloseWindow.window('show');
					}
				});
			}
		},

		_preventGlobalWindowClick: function() {
			var taskbar = this._getTaskbarInstance();

			if (!taskbar) {
				return;
			}

			// number of global clicks to block equals number of taskbar instances
			var current = taskbar.$windowsContainment.data(this._cnst.dataPrefix + 'taskbars') || 0;

			var prev = taskbar.$windowsContainment.data(this._cnst.dataPrefix + 'preventClicks') || 0;

			this._cache.taskbarsOnClickPrevention = current;

			taskbar.$windowsContainment.data(this._cnst.dataPrefix + 'preventClicks', current + prev);
		},

		_revertGlobalWindowClick: function() {
			var taskbar = this._getTaskbarInstance();

			if (!taskbar) {
				return;
			}

			var prev = taskbar.$windowsContainment.data(this._cnst.dataPrefix + 'preventClicks');

			var current = this._cache.taskbarsOnClickPrevention;

			var newClicks = Math.max(prev - current, 0);

			taskbar.$windowsContainment.data(this._cnst.dataPrefix + 'preventClicks', newClicks);
		},

		_createButtons: function() {
			this._super();

			var self = this;

			if (this.uiDialog.hasClass(this.classes.uiDialogButtons)) {
				var iteration = 0;

				$.each(this.options.buttons, function(index, button) {
					var textLocalized;

					if (button.textLocalized) {
						textLocalized = self._i18n(button.textLocalized);

						if (textLocalized !== 'undefined') {
							$('.' + self.classes.uiButton + ':eq(' + iteration + ')', self.uiDialogButtonPane).button({label: textLocalized});
						}
					}

					if ((!button.textLocalized || textLocalized === 'undefined') && !button.text && !isNaN(parseInt(index))) {
						self._debugLogAdd('No text or textLocalized providen ' + 'for button "' + index + '".', 2, 1);
					}

					++iteration;
				});
			}
		},

		_setMinimizableMaximizableClasses: function() {
			this.$elem.toggleClass(this.classes.unminimizable, this.options.minimizable === false);
			this.$elem.toggleClass(this.classes.unmaximizable, this.options.maximizable === false);
		},

		_languageChange: function() {
			this._createTitleForEmpty();
			this._title();

			this._propagateConfirmCloseOptions({confirmClose: {}, title: null});

			// refresh titlebar buttons texts
			this._setButtonsTexts();

			// refresh buttonset button's labels
			this._createButtons();
		},

		_size: function() {
			// mimics
			// github.com/jquery/jquery-ui/commit/62cda1f95d0e7040153f0b5fe5745d199a0a094e
			if (this._versionOf('dialog', '==', '1.10.0')) {
				this._isOpen = true;
			}

			this._super();
		},

		_debugLogAdd: function(msg, level, type) {
			var taskbar = this._getTaskbarInstance();

			if (taskbar) {
				taskbar._consolePrefix(this.$window[0].id, 'window');
				taskbar._debugLogAdd(msg, level, type);
				taskbar._consolePrefix(true);
			}
		},

		_hasInlineProperty: function($elem, property) {
			var style = $elem.prop('style');

			for (var prop in style) {
				if (style.hasOwnProperty(prop) && style[prop] === property) {
					return true;
				}
			}

			return false;
		},

		_clearTrigger: function(event) {
			var taskbar = this._getTaskbarInstance();

			if (!taskbar) {
				return;
			}

			$(window).trigger('click.' + taskbar._cache.uep, event);
		},

		_blurActiveElement: function(any) {
			var element = this.document[0].activeElement,
				wrapper = this.bindings[0];

			// if no other focusable element is present inside of the dialog,
			// focus is set to the close button; let's revert this, because windows
			// are intended to be longer-living than dialogs and close should not be
			// the default action; optionally, passing any as true will blur
			// any active element inside this window
			// noinspection JSCheckFunctionSignatures
			if (any && ($.contains(wrapper, element) || element === wrapper) || !any && element === this.uiDialogTitlebarClose[0]) {
				$(element).blur();
			}
		},

		_ucFirst: function(string) {
			return string[0].toUpperCase() + string.slice(1);
		},

		// test if particular widget from jQuery UI is in given version;
		// used in deciding behaviour/hacks/flow
		_versionOf: function(widget, operator, compare) {
			// return $.emuos.taskbar.prototype._versionOf.call(null, widget, operator, compare);

			var version = (widget ? $.ui[widget] : $.ui).version.split('.'),
				compareTo = compare.split('.'),
				results = [];

			$.each(compareTo, function(index, part) {
				var againsts = parseInt(part, 10),
					current = parseInt(version[index], 10);

				if (operator === '>=') {
					results.push(current >= againsts);
				} else if (operator === '==' || operator === '===') {
					results.push(current === againsts);
				} else if (operator === '<=') {
					results.push(current <= againsts);
				} else {
					results.push(false);
				}
			});

			return $.inArray(false, results) === -1;
		},

		_parseDuration: function(speed) {
			// copied from _normalizeArguments function of jQuery UI effects
			return typeof speed === 'number' ? speed : speed in $.fx.speeds ? $.fx.speeds[speed] : undefined;
		},

		_trigger: function(name, event, ui) {
			// don't trigger dialog inherited event "open"
			if (name === 'open') {
				return;
			}

			// trigger create after window was fully created, not mid-way,
			// (default widget factory behaviour)
			if (name === 'create' && !this._cache.initialized) {
				return;
			}

			// extend ui by useful information
			$.extend(ui, {
				instance: this,
				$widget: this.$elem,
				$window: this.$window
			});

			// "taskbarNotFound" carries those properties,
			// also when it's triggered, they cannot be obtained the usual way
			if (name !== 'taskbarNotFound') {
				$.extend(ui, {
					taskbar: this._getTaskbarInstance(),
					$taskbar: this.$taskbar
				});
			}

			return this._super(name, event, ui);
		},

		/* public methods */
		button: function() {
			var taskbar = this._getTaskbarInstance();

			if (taskbar) {
				return taskbar.button(this.$window);
			}

			return $();
		},

		close: function(event) {
			this._close(event);
		},

		confirmCloseWindow: function() {
			return this.$confirmCloseWindow;
		},

		containment: function() {
			return this._getRealContainment();
		},

		maximize: function(event) {
			this._toggleMaximized(true, event);
		},

		maximized: function() {
			return this._cache.maximized && !this._cache.maximizing;
		},

		maximizing: function() {
			return this._cache.maximizing;
		},

		minimize: function(event) {
			this._minimize(event);
		},

		minimized: function() {
			return this._cache.minimized && !this._cache.minimizing;
		},

		minimizing: function() {
			return this._cache.minimizing;
		},

		modalOverlay: function() {
			return this.overlay || $();
		},

		moveToTop: function(settings, silent) {
			this._moveToTop(settings, silent);
		},

		open: function(event) {
			if (this._cache.initialized) {
				this._debugLogAdd('Method "open" is an alias for method "show".' + ' Use method "show" instead.', 2, 2);
				this.show(event);
			} else {
				this._super();
			}
		},

		refreshPosition: function(options) {
			this._refreshPosition(options);
		},

		restore: function(quick) {
			this._toggleMaximized(false, quick);
		},

		restored: function() {
			return this.shown() && !this.maximized();
		},

		restoring: function() {
			return this._cache.restoring;
		},

		shown: function() {
			return this.$elem.is(':visible') && !this._animationProgress();
		},

		showing: function() {
			return this._cache.showing;
		},

		taskbar: function() {
			return this.$taskbar;
		},

		title: function() {
			return this._cache.realTitle;
		},

		_checkForInvalidOptions: function(options, key, initialization) {
			var taskbar = this._getTaskbarInstance();

			if (taskbar) {
				taskbar._consolePrefix(this.$window[0].id, 'window');
				taskbar._checkForInvalidOptions(options, key, initialization);
				taskbar._consolePrefix(true);
			}
		},

		_setOptions: function(options) {
			var self = this,
				resize = false,
				refreshPosition = false,
				resizableOptions = {};

			$.each(options, function(key, value) {
				self._setOption(key, value);

				if (key in self.sizeRelatedOptions) {
					// dont use dialog resize with widht and height
					// - window's setHeight and setWidth will be used
					if ($.inArray(key, self._cnst.dimensions) === -1) {
						resize = true;
					} else {
						self.options[key] = value = Math.max(value, self.options['min' + self._ucFirst(key)]);
					}

					refreshPosition = true;
				}

				if (key in self.resizableRelatedOptions) {
					resizableOptions[key] = value;
				}
			});

			if (resize) {
				this._size();
				this._position();
			}

			if (this.uiDialog.is(':data(ui-resizable)')) {
				this.uiDialog.resizable('option', resizableOptions);
			}

			if (refreshPosition) {
				this._setWidth();
				this._setHeight();
				this.refreshPosition();
			}
		},

		_setOption: function(key, value) {
			var prev = $.extend(true, {}, this.options[key]);

			this._checkForInvalidOptions($.emuos.window.prototype.options, key);

			if (key === 'title') {
				this._cacheTitle(value);
			} else if (key === 'taskbar') {
				this._taskbarUnbind();
			} else if (key === 'modal' || key === 'modalOverlay') {
				this._revertModalZIndexes({
					force: true
				});
				this._destroyOverlay();
			}

			if (key === 'widgetClass') {
				this.uiDialog.removeClass(this.options.widgetClass).addClass(value);
			}

			// set the closeText without executing parent, so the debug can be generated if it's not false, window has own setter for "position"
			if (key !== 'closeText' && key !== 'position') {
				this._superApply(arguments);
			} else {
				this.options[key] = value;
			}

			this._debugOptions();

			if (key === 'minimizable' || key === 'maximizable') {
				this._setMinimizableMaximizableClasses();
			}

			if (key === 'maximizable') {
				this._createButton('maximize');
			} else if (key === 'minimizable') {
				this._createButton('minimize');
			} else if (key === 'icons') {
				this._setWindowIcon();
				this._refreshButtonIcons();
				this._propagateConfirmCloseOptions(key, prev);
			} else if (key === 'titleLocalized' || key === 'title') {
				this._createTitleForEmpty();
				this._title();
				this._propagateConfirmCloseOptions(key, prev);
			} else if (key === 'maximized') {
				this._toggleMaximized(value);
			} else if (key === 'containment') {
				this._setContainment();
				this.refreshPosition();
			} else if (key === 'position') {
				this._position();
				this._setRestoreSize();
				this.refreshPosition();
			} else if (key === 'width' || key === 'maxWidth') {
				this._setWidth();
				this.refreshPosition();
			} else if (key === 'height' || key === 'maxHeight') {
				this._setHeight();
				this.refreshPosition();
			} else if (key === 'modal' || key === 'modalOverlay') {
				this._createOverlay();
				this._modalZIndexes({
					revertActive: false
				});
			} else if (key === 'closable') {
				this._setButtonCloseState();
			} else if (key === 'buttons') {
				this.refreshPosition();
			} else if (key === 'taskbar') {
				this._rebindTaskbar();
				this._propagateConfirmCloseOptions(key, prev);
			} else if (key === 'confirmClose' || key === 'durations') {
				this._propagateConfirmCloseOptions(key, prev);
			} else if (key === 'embeddedContent') {
				this._placeOverlay();
			} else if (key === 'group') {
				this._refreshGroup();
			} else if ($.inArray(key, this._unsupportedOptions) > -1) {
				this._debugUnsupportedOptions();
				this._resetUnsupportedOptions();
			} else if (key === 'appendTo' && this.overlay) {
				// this.uiDialog.appendTo( this._appendTo() )
				// is covered by this._superApply( arguments );
				this.overlay.prependTo(this._appendTo());
			}
		},

		destroy: function() {
			if (this._onInteractionEnd('destroy') === true) {
				return this;
			}

			// destroy was already called
			if (this._cache.destroyed) {
				return;
			}

			// call close with no way of preventing it,
			// close will then call destroy()
			if (!this._cache.closeInevitable && this._cache.initialized) {
				this._cache.closeForced = true;
				this.close();

				return;
			}

			var self = this;

			this._cache.destroyed = true;

			this._clearTimeouts();

			this._preventGlobalWindowClick();

			// we have to remove modal classes before
			// moveToTop(), otherwise highest window would
			// stay blurred, because windows should be blurred
			// when modal is on top
			this.$elem.removeClass(this.classes.modal);
			// +
			this._moveToTop({
								highest: true
							});

			this.$window.removeUniqueId().removeClass(
				this.classes.windowContent
				+ ' ' + this.classes.confirmClose
			).removeData(this._cnst.dataPrefix + 'window');

			this.$elem.stop(true, true).removeClass(this.classes.window);

			this._super();

			this.$window.attr('style', this._cache.inlineCSS);

			// remove empty attributes
			$.each(['class', 'style'], function(index, attr) {
				if (self.$window.attr(attr) === '') {
					self.$window.removeAttr(attr);
				}
			});

			this.$window.remove();
		}
	});

	// allow settings options for all future instances at once,
	// or if "propagateToInstances" is set to true, affect both prototype
	// and the current instances
	$.emuos.windowSetup = function(propagateToInstances, options) {
		options = arguments.length === 1 ? propagateToInstances : options;

		if (propagateToInstances === true && arguments.length > 1) {
			$('.' + $.emuos.window.prototype.classes.windowContent).window('option', options);
		}

		var o = $.emuos.window.prototype.options;

		return options ? $.extend(true, o, options) : o;
	};
})(jQuery);