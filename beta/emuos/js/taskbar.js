;(function($, undefined) {
	/*jshint laxbreak:true,-W030,maxcomplexity:60,smarttabs:true,-W004,-W044*/
	// noinspection JSUnusedLocalSymbols
	$.widget('emuos.taskbar', {
		version: '@emuos-main-version',
		options: {
			/* options */
			autoHide: false,
			buttons: null,
			buttonsOrder: [],
			buttonsTooltips: false,
			clock: false,
			clockShowDatepicker: true,
			debug: {
				environment: true,
				options: true,
				localization: true
			},
			draggable: false,
			draggableBetweenEdges: true,
			dropOnExisting: false,
			durations: {
				buttonsTooltipsHide: true,
				buttonsTooltipsShow: true,
				autoHideDelay: 1200,
				autoHideHide: 'slow',
				autoHideShow: 'fast'
			},
			fallbackLanguage: 'en',
			icons: {
				clock: null,
				languageSelect: null,
				menuWindowClose: 'ui-icon-closethick',
				minimizeAll: 'ui-icon-minusthick',
				networkMonitorOffline: 'ui-icon-alert',
				networkMonitorOnline: 'ui-icon-signal',
				startButton: null,
				startButtonSet: 'ui-icon-circle-triangle',
				toggleFullscreenOff: 'ui-icon-arrow-4-diag',
				toggleFullscreenOn: 'ui-icon-arrow-4-diag'
			},
			horizontalRowHeight: 'auto',
			horizontalRows: 1,
			horizontalRowsMin: 1,
			horizontalRowsMax: 2,
			horizontalStick: 'bottom left',
			horizontalWidth: '100%',
			language: 'en',
			languages: ['en'],
			languageSelect: false,
			localization: {},
			menuAutoOpenOnBrowse: true,
			minimizeAll: true,
			minimizeAllHoverOpaqueWindows: true,
			networkMonitor: false,
			orientation: 'horizontal',
			propagateWindowBlur: false,
			resizable: false,
			resizableHandleOffset: 0,
			resizableHandleOverflow: 2,
			resolveCollisions: true,
			startButtons: true,
			systemButtonsOrder: ['languageSelect', 'networkMonitor', 'toggleFullscreen', 'clock', 'minimizeAll'],
			toggleFullscreen: false,
			verticalColumns: 1,
			verticalColumnsMax: 2,
			verticalColumnsMin: 1,
			verticalColumnWidth: 100,
			verticalHeight: '100%',
			verticalStick: 'top right',
			viewportMargins: {
				top: [0, 'correct'],
				right: [0, 'correct'],
				bottom: [0, 'correct'],
				left: [0, 'correct']
			},
			windowButtonsIconsOnly: false,
			windowButtonsSortable: true,
			windowsContainment: 'viewport',
			windowsInitialZIndex: 100,

			/* events */
			autoHideStart: null,
			autoHideProgress: null,
			autoHideStop: null,

			create: null,

			debugLogAdd: null,

			bind: null,
			unbind: null,

			beforeDestroy: null,

			dragStart: null,
			drag: null,
			dragStop: null,

			beforeDrop: null,
			drop: null,

			beforeDroppableOver: null,
			droppableOver: null,

			beforeDroppableOut: null,
			droppableOut: null,

			elementClose: null,
			elementOpen: null,

			languageChange: null,

			menuItemBlur: null,
			menuItemFocus: null,

			beforeRefresh: null,
			refresh: null,

			beforeRequestFullscreen: null,
			requestFullscreen: null,

			resizeStart: null,
			resize: null,
			resizeStop: null,

			sortableStart: null,
			sortableSort: null,
			sortableChange: null,
			sortableStop: null
		},

		_cnst: {
			dataPrefix: 'emuos-',
			eventPrefix: 'taskbar',
			naturalName: 'EmuOS',
			consolePrefix: 'EmuOS message',
			missingTranslation: 'undefined',
			resizeDelay: 100,
			autoHideRestartDelay: 100,
			resizableHandleOverflowMax: 3
		},

		_systemButtons: [
			'languageSelect',
			'minimizeAll',
			'toggleFullscreen',
			'networkMonitor',
			'clock'
		],

		_systemButtonsWithSingleIcons: [
			'languageSelect',
			'minimizeAll',
			'clock'
		],

		_optionsPositiveIntegers: [
			'horizontalWidth',
			'resizableHandleOverflow',
			'horizontalRows',
			'horizontalRowsMin',
			'verticalHeight',
			'verticalColumns',
			'verticalColumnsMin',
			'verticalColumns',
			'verticalColumnWidth'
		],

		_optionsPossiblePercentages: [
			'horizontalWidth',
			'verticalHeight',
			'verticalColumnWidth'
		],

		classes: {
			taskbar: 'emuos-taskbar',
			taskbarPrefix: 'emuos-taskbar-',
			taskbarHorizontal: 'emuos-taskbar-horizontal',
			taskbarVertical: 'emuos-taskbar-vertical',
			taskbarStickTop: 'emuos-taskbar-stick-top',
			taskbarStickBottom: 'emuos-taskbar-stick-bottom',
			taskbarStickRight: 'emuos-taskbar-stick-right',
			taskbarStickLeft: 'emuos-taskbar-stick-left',
			taskbarStickPrefix: 'emuos-taskbar-stick-',
			taskbarWithOpenElements: 'emuos-taskbar-with-opened-elements',
			container: 'emuos-taskbar-container',
			startButton: 'emuos-taskbar-start-button',
			windowButton: 'emuos-taskbar-window-button',
			separator: 'emuos-taskbar-separator',
			startButtonsContainer: 'emuos-taskbar-start-container',
			buttonsContainer: 'emuos-taskbar-buttons-container',
			systemButtonsContainer: 'emuos-taskbar-system-buttons-container',
			systemButtonsSeparator: 'emuos-taskbar-system-buttons-separator',
			windowButtonsContainer: 'emuos-taskbar-window-buttons-container',
			windowButtonsContainerFirstChild: 'emuos-taskbar-window-buttons-container-first-child',
			windowButtonsContainerOnlyChild: 'emuos-taskbar-window-buttons-container-only-child',
			droppableContainer: 'emuos-taskbar-droppable-container',
			droppable: 'emuos-taskbar-droppable',
			languageSelect: 'emuos-taskbar-language-select',
			minimizeAll: 'emuos-taskbar-minimize-all',
			toggleFullscreen: 'emuos-taskbar-toggle-fullscreen',
			networkMonitor: 'emuos-taskbar-network-monitor',
			clock: 'emuos-taskbar-clock',
			datepicker: 'emuos-taskbar-datepicker',
			draggableHelper: 'emuos-taskbar-helper',
			buttonDisabled: 'emuos-taskbar-button-disabled',
			draggableDragging: 'emuos-taskbar-dragging',
			resizable: 'emuos-taskbar-resizable',
			resizableMouseover: 'emuos-taskbar-resizable-mouseover',
			resizableResizing: 'emuos-taskbar-resizing',
			resizableDisabled: 'emuos-taskbar-resizable-disabled',
			empty: 'emuos-taskbar-empty',
			autoHide: 'emuos-taskbar-autohide',
			autoHideMouseOver: 'emuos-taskbar-autohide-mouseover',
			autoHideHidden: 'emuos-taskbar-autohide-hidden',
			autoHideHidding: 'emuos-taskbar-autohide-hidding',
			autoHidePending: 'emuos-taskbar-autohide-pending',
			autoHideShowing: 'emuos-taskbar-autohide-showing',
			window: 'emuos-window',
			windowContent: 'emuos-window-content',
			windowTitlebarButtonIcon: 'emuos-window-titlebar-button-icon',
			windowManipulationButton: 'emuos-window-button',
			windowsContainment: 'emuos-taskbar-windows-containment',
			windowCopy: 'emuos-taskbar-window-copy',
			windowGroupMenu: 'emuos-taskbar-window-group-menu',
			windowGroupMenuScroll: 'emuos-taskbar-window-group-menu-scroll',
			windowGroupElement: 'emuos-taskbar-window-group-element',
			windowGroupElementActive: 'emuos-taskbar-window-group-element-active',
			windowMinimizeAllHover: 'emuos-taskbar-window-minimize-all-hover',
			windowMinimizeAllUnhover: 'emuos-taskbar-window-minimize-all-unhover',
			windowTop: 'emuos-window-top',
			windowUnminimizable: 'emuos-window-unminimizable',
			resizeIframe: 'emuos-taskbar-iframe',
			resizeIframeHorizontal: 'emuos-taskbar-iframe-horizontal',
			resizeIframeVertical: 'emuos-taskbar-iframe-vertical',
			menuWindowClose: 'emuos-taskbar-window-close',
			windowButtonsIconsOnly: 'emuos-taskbar-window-buttons-icons-only',
			buttonTooltip: 'emuos-taskbar-button-tooltip',
			hidden: 'emuos-hidden',
			droppableOver: 'emuos-taskbar-droppable-over',
			droppablePending: 'emuos-taskbar-droppable-pending',
			taskbarIcon: 'emuos-taskbar-icon',
			taskbarContainter: 'emuos-taskbar-container',
			refreshPositionOnce: 'emuos-taskbar-refresh-position-once',
			buttonUserDefined: 'emuos-taskbar-button-user-defined',
			menuHidden: 'emuos-menu-hidden',

			// jQuery UI classes
			uiMenu: 'ui-menu',
			uiWidgetContent: 'ui-widget-content',
			uiCornerPrefix: 'ui-corner-',
			uiCornerTl: 'ui-corner-tl',
			uiCornerTr: 'ui-corner-tr',
			uiCornerBl: 'ui-corner-bl',
			uiCornerBr: 'ui-corner-br',
			uiDatepickerHeader: 'ui-datepicker-header',
			uiDraggable: 'ui-draggable',
			uiDroppable: 'ui-droppable',
			uiDraggableDragging: 'ui-draggable-dragging',
			uiResizable: 'ui-resizable',
			uiResizableResizing: 'ui-resizable-resizing',
			uiResizableHandle: 'ui-resizable-handle',
			uiButton: 'ui-button',
			uiButtonText: 'ui-button-text',
			uiButtonIconPrimary: 'ui-button-icon-primary',
			uiMenuItem: 'ui-menu-item',
			uiDatepicker: 'ui-datepicker',
			uiDatepickerDaysCellOver: 'ui-datepicker-days-cell-over',
			uiStateActive: 'ui-state-active',
			uiStateFocus: 'ui-state-focus',
			uiStateHover: 'ui-state-hover',
			uiStateDisabled: 'ui-state-disabled',
			uiStateDefault: 'ui-state-default',
			uiSortable: 'ui-sortable',
			uiTooltip: 'ui-tooltip',
			uiDialogContent: 'ui-dialog-content',
			uiDialogTitlebar: 'ui-dialog-titlebar',
			uiHasDatepicker: 'hasDatepicker',
			uiIcon: 'ui-icon',
			uiIconBlank: 'ui-icon-blank'
		},

		_create: function() {
			// shortcut
			this.$elem = this.element;

			if (!this.$elem.parents().length) {
				this.$elem.appendTo('body');
			}

			// tracks state of various elements of taskbar and holds
			// a bunch of calculated values and options
			this._cache = {
				// cache inline styles so they can be reverted on widget destruction
				inlineCSS: this.$elem.attr('style') || '',
				// mutationObserers are instances of MutationObserver class
				// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver;
				// they are stored so they could be later disconnected from DOM
				mutationObservers: {
					submenus: []
				},
				// intervals stores ID returned by setInterval function,
				// so they could be cleared when needed
				intervals: {
					clock: null
				},
				// timeouts stores ID returned by setTimeout function,
				// so they could be cleared when needed
				timeouts: {
					autoHide: null,
					windowResize: null,
					// used by windows binded to taskbar
					moveToTopForced: [],
					minimizeAllHoverOpaqueWindowsRevert: null
				},
				// connectedElements are pair of datapicker/submenus/window lists
				// and buttons they are opened with
				connectedElements: {},
				// whether there are any opened datapicker/submenus/window lists left
				openedElements: false,
				progress: {
					// whether window buttons are being sorted
					windowButtonsSortable: false,
					taskbarDraggable: false,
					taskbarResizable: false,
					windowResizable: false,
					menuAutoOpenOnBrowse: false
				},
				horizontalAutoHeight: false,
				windows: {},
				groups: {},
				windowButtons: [],
				internalCallbacks: {
					afterResolveCollisions: null,
					afterRefresh: null
				},
				optionSetter: {
					previousValue: null
				},
				mousedownTarget: $(),
				// if set to true, handlers won't be triggered
				suppressEvents: false,
				resizeCausesRefresh: false,
				keepCollidedPosition: false,
				collisions: this._zeroDirections(),
				suppressSingleGroupClick: false,
				// unique event prefix
				uep: this._cnst.eventPrefix + this.uuid
			};

			// create empty jQuery object for consistency
			this.$windowButtonsContainer = $();
			this.$systemButtonsContainer = $();
			this.$startButtonsContainer = $();
			this.$buttonsContainer = $();
			this.$containers = $();

			this.$minimizeAll = $();
			this.$toggleFullscreen = $();
			this.$networkMonitor = $();
			this.$clock = $();
			this.$datepicker = $();
			this.$languageSelect = $();
			this.$languageSelectMenu = $();

			this.$windowsContainment = $();
			this.$windowCopy = $();

			// noinspection JSUnusedGlobalSymbols
			this.$droppableTop = $();
			this.$droppableRight = $();
			this.$droppableBottom = $();
			// noinspection JSUnusedGlobalSymbols
			this.$droppableLeft = $();

			// the basic classes, widget ID, and a unique id instante storage
			this.$elem.addClass(this.classes.taskbar + ' ' + this.classes.uiWidgetContent).attr('data-taskbar-uuid', this.uuid).uniqueId().data(this._cnst.dataPrefix + 'taskbar', this);

			// add taskbar ID to custom debug messages
			this._consolePrefix(true);

			this._checkForInvalidOptions(undefined, this.options, true);

			// creates containment in which windows will be allowed to resize,
			// maximized and be dragged
			this._createWindowsContainment();

			// a little hack so we also catch resize when scrollbar appears
			this._resizeIframeListener();

			// has to be binded once and before any other clicks
			this._bindGlobalEvents();

			// initialization
			this._initialize();
			this._setwindowButtonsIconsOnlyClass();

			// refresh position of windows binded to taskbars that are already present
			this._refreshWindowsPosition();

			this._trigger('create');
		},

		// private function that suppresses events, used internally to refresh
		_refresh: function() {
			this._cache.suppressEvents = true;
			this.refresh();
			this._cache.suppressEvents = false;
		},

		_initialize: function() {
			var refreshPositionOnce = this.$elem.hasClass(this.classes.refreshPositionOnce);

			this._debug();
			this._createStyles();
			this._setDimensions();
			this._setTaskbarPositionDimensions();
			this._tryAfterResolveCollisions();
			this._setDraggable();
			this._setDroppable();
			this._buildTaskbarContent();
			this._setResizable();
			this._setTaskbarRoundedCorners();
			this._initAutoHide();

			// not to touch windows when another taskbar's refresh is in progress
			// - the last taskbar should run those function; it might have been
			// in process of changing it state to reflect option being set
			if (!refreshPositionOnce) {
				this._resizeWindowsContainment();
				this._refreshWindowsPosition();
			}

			this._setWindowButtonsSizes();
			this._setButtonsTooltips();
			this._setDraggableContainment();
			this._refreshWindowsTaskbarId();
			this._debugCheckOrphans();
			this._refreshSeparators();
		},

		_debug: function() {
			this._debugEnvironment(); // 0
			this._debugLocalization(); // 1
			this._debugOptions(); // 2
		},

		_debugLogAdd: function(msg, level, type) {
			var ui = {
				message: msg,
				level: level,
				levelName: {
					0: 'error',
					1: 'warning',
					2: 'notice'
				}[level],
				type: type,
				typeName: {
					0: 'environment',
					1: 'localization',
					2: 'options'
				}[type]
			};

			var p = this._consolePrefix();

			ui.$target = $('#' + this._cnst.consolePrefixIdReal);

			// if debugLogAdd is prevented or window console is not available
			// (changing order of trigger( "debugLogAdd" ) and window.console
			// will fail tests on IE9 due to the fact that window.console is not
			// available when dev tools are closed)
			// or debug for this type of messages is turned off

			if (this._trigger('debugLogAdd', {}, ui) === false || !window.console || !this.options.debug[ui.typeName]) {
				// return false and don't show anything in console
				return false;
			}

			if (ui.level === 0 && console.error) {
				console.error(p + ui.message);
			} else if (ui.level === 1 && console.warn) {
				console.warn(p + ui.message);
			} else if (ui.level === 2 && console.log) {
				console.log(p + ui.message);
			}
		},

		_consolePrefix: function(set, widgetType) {
			// true reverts console prefix to contain taskbar name
			if (set === true) {
				this._cnst.consolePrefixId = ' for taskbar #' + this.$elem[0].id;
				this._cnst.consolePrefixIdReal = this.$elem[0].id;
				// passing string will change prefix to other widget (window, for now)
			} else if (typeof set === 'string' && set.length) {
				this._cnst.consolePrefixId = ' for ' + widgetType + ' #' + set;
				this._cnst.consolePrefixIdReal = set;
				// act as getter
			} else {
				return this._cnst.consolePrefix + this._cnst.consolePrefixId + ': ';
			}
		},

		_debugEnvironment: function() {
			// noinspection JSUnusedLocalSymbols
			var o = this.options;

			// position, dialog, button, and window are mandatory
			if (!$.ui.position) {
				this._debugLogAdd('jQuery UI Position is required for this plugin to work.', 0, 0);
			}

			if (!$.ui.dialog) {
				this._debugLogAdd('jQuery UI Dialog is required for taskbar windows to work.', 0, 0);
			}

			if (!$.emuos.window) {
				this._debugLogAdd(this._cnst.naturalName + ' Window is required for taskbar windows to work.', 0, 0);
			}

			if (!$.ui.button) {
				this._debugLogAdd('jQuery UI Button is required for taskbar buttons to work.', 0, 0);
			}

			// ui-icon is meant to have background image - if it doesn't,
			// jQuery UI Theme is likely not to be loaded
			if (this._styleIndicator(this.classes.uiIcon, 'backgroundImage').backgroundImage === 'none') {
				this._debugLogAdd('jQuery UI Theme is probably missing.', 1, 0);
			}

			// taskbar and window default position is "fixed",
			// and if it isn't, some or all of plugin's styleshet's are missing
			if (this._styleIndicator(this.classes.taskbar, 'position').position !== 'fixed' || this._styleIndicator(this.classes.window, 'position').position !== 'fixed') {
				this._debugLogAdd('Stylesheet for ' + this._cnst.naturalName + ' is probably missing.', 1, 0);
			}

			// position: relative, set for example by Foundation framework,
			// will not work with jQuery UI Draggable, see:
			// http://bugs.jquery.com/ticket/4202
			// http://foundation.zurb.com/forum/posts/17493-body-position-relative
			if ($('body').css('position') === 'relative') {
				this._debugLogAdd('Body with position:relative will not work with jQuery UI Draggable or jQuery UI Resizable.', 0, 0);
			}
		},

		// taskbar should not contain elements that are menus and it's
		// subordinates, and if it does, a debug message will be generated
		_debugCheckOrphans: function() {
			var $orphans = this.$elem.children().not('.' + this.classes.uiMenu).not('.' + this.classes.container).not('.' + this.classes.separator).not('.' + this.classes.resizable).not('.' + this.classes.menuHidden).filter(':visible');

			if ($orphans.length) {
				var result = this._debugLogAdd('There are elements presents in the taskbar that are neither hidden or part of the taskbar. Maybe you forgot to ' + (this.options.startButtons ? 'set "startButtons" option to true or ' : '') + 'add ".' + this.classes.menuHidden + '" class to some menus.', 1, 0);
				// if event was not prevented, log a list of orphaned
				// element to the console
				if (result !== false && this.options.debug.environment) {
					if (window.console) {
						console.log($orphans);
					}
				}
			}
		},

		// called when menu is about to be created;
		// debug is generated when jQuery UI Menu is missing
		_debugMenu: function() {
			if (!$.ui.menu) {
				this._debugLogAdd('jQuery UI Menu is required for taskbar menus to work.', 1, 0);
			}

			return !!$.ui.menu;
		},

		_debugLocalization: function() {
			var o = this.options, lang;

			// check is any localization files were loaded at all
			if (this._isRealEmptyObject($.emuos.taskbar.prototype.options.localization)) {
				this._debugLogAdd('Localization file is probably missing.', 1, 1);
			} else if (!$.emuos.taskbar.prototype.options.localization) {
				this._debugLogAdd('Localization file is missing.', 0, 1);
			}

			// check is localization option is non-empty and is an object
			if (this._isRealEmptyObject(o.localization)) {
				this._debugLogAdd('Localization object is empty.', 1, 1);
			} else if (!o.localization) {
				this._debugLogAdd('Localization option is not an object.', 0, 1);
			}

			// check if all plugin localizations are loaded for languages that were
			// passed in "language" option, and do the same for datepicker
			// localizations, if both "clock" and "clockShowDatepicker"
			// are set to true
			for (var i in o.languages) {
				if (o.languages.hasOwnProperty(i)) {
					lang = o.languages[i];

					if ($.emuos.taskbar.prototype.options.localization && !$.emuos.taskbar.prototype.options.localization[lang]) {
						this._debugLogAdd('Missing taskbar translations for language "' + lang + '".', 1, 1);
					}

					if (o.clock && o.clockShowDatepicker && $.ui.datepicker && (!$.datepicker || !$.datepicker.regional || !$.datepicker.regional[lang === 'en' ? '' : lang])) {
						this._debugLogAdd('Missing jQuery UI Datepicker translations for language "' + lang + '".', 1, 1);
					}
				}
			}
		},

		_debugOptions: function() {
			// noinspection JSUnusedLocalSymbols
			var o = this.options, i;

			// check and correct those taskbar options that should be positive integers
			for (i in this._optionsPositiveIntegers) {
				if (this._optionsPositiveIntegers.hasOwnProperty(i)) {
					var key = this._optionsPositiveIntegers[i];
					var val = parseInt(this.options[key], 10);

					if ((1 > val || isNaN(val)) && (!this._isPercent(val) && $.inArray(val, this._optionsPossiblePercentages))) {
						this._debugLogAdd(key + ' should not be lower than 1, setting to 1.', 1, 2);
						this.options[key] = Math.max(this.options[key], 1);
					}
				}
			}

			// check if resizableHandleOverflow isn't to high, and correct
			// it if needed, because otherwise it would cover resizable handle
			// of window touching it
			if (this.options.resizableHandleOverflow === parseInt(this.options.resizableHandleOverflow, 10)) {
				if (this.options.resizableHandleOverflow > this._cnst.resizableHandleOverflowMax) {
					this._debugLogAdd('resizableHandleOverflow should not be higher than ' + this._cnst.resizableHandleOverflowMax + ', as it would damage resizable experience on windows touching taskbar.', 1, 2);
				}
			}

			// check if custom buttons does not share names with native buttons
			for (i in this.options.buttons) {
				// noinspection JSUnfilteredForInLoop
				if ($.inArray(i, this._systemButtons) > -1) {
					this._debugLogAdd('Custom button "' + i + '" detected. Custom button should not share names with native buttons.', 1, 2);
				}
			}
		},

		_setDimensions: function(options) {
			// this function is also used by droppables, so we need to know
			// what kind of element we dealing with; taskbar uses native options,
			// droppables simulates them
			var isTaskbar = !options;
			options = options || this.options;
			var horizontal = options.orientation === 'horizontal';

			// set height to auto so it could be calculated again
			if (isTaskbar && horizontal && this.$elem && this.$elem.length) {
				this.$elem.css('height', 'auto');
			}

			// either a height of horizontal taskbar or width of vertival taskbar
			// taskbar will later translated "auto" height to px,
			// but when we dealing with droppable, that's already calculated
			// and stored, so use this instead
			// determines whether an auto height should be applied
			// to horizontal taskbar; note: auto width of vertical taskbar
			// is not supported; this is a planned feature

			var secondaryDimension = horizontal ? isTaskbar ? options.horizontalRowHeight : this._cache.horizontalRowHeight : isTaskbar ? options.verticalColumnWidth : this._cache.verticalColumnWidth, auto = secondaryDimension === 'auto', actualSize;

			var _cache = {};

			// to which edge of the window, right or left, should the taskbar stick, regardless of orientation
			_cache.stickHorizontal = horizontal ? options.horizontalStick.indexOf('right') !== -1 ? 'right' : 'left' : options.verticalStick.indexOf('right') !== -1 ? 'right' : 'left';

			// to which edge of the window, top or bottom, should the taskbar stick regardless of orientation
			_cache.stickVertical = !horizontal ? options.verticalStick.indexOf('top') !== -1 ? 'top' : 'bottom' : options.horizontalStick.indexOf('top') !== -1 ? 'top' : 'bottom';

			// copy setting (used by droppables)
			_cache.horizontal = horizontal;

			if (isTaskbar) {
				// reset styles left by autoHide and others; those were harmless
				// for the previous taskbar position, but will mess up when taskbar
				// is dragged to another edge; this is a refresh, so we don't know
				// previous settings of options.autoHide, therefore this has to
				// be done every time
				this._copyStyles({
					to: this.$elem,
					properties: ['top', 'bottom', 'left', 'right', 'width', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight']
				});

				// hides user-defined menus, later those that are needed
				// for current language setting and are not defined by user
				// as disabled will be shown
				this._hideInternals();
			}

			// classes that will position taskbar accordingly to options
			this._setTaskbarPositionClasses(_cache, options);

			actualSize = this._translateSize(options);

			if (isTaskbar) {
				// stores the window edge to which taskbar sticks
				_cache.edge = horizontal ? this.options.horizontalStick.match(/bottom/) ? 'bottom' : 'top' : this.options.verticalStick.match(/left/) ? 'left' : 'right';
				// +
				// to keep the original setting for getters,
				// calculated height of horizontal taskbar
				// will be kept internally
				this._cache.horizontalRowHeight = !horizontal || auto ? this._computeAutoHeight({edge: _cache.edge}) : secondaryDimension;

				// to keep the original settings for getters,
				// caluclated width of horizontal taskbar will be kept internally
				this._cache.verticalColumnWidth = this._translateSize($.extend({}, options, {orientation: 'horizontal', horizontalWidth: options.verticalColumnWidth}));

				// data about the edge will be used later for decining whether
				// draggable taskbar can be dropped on given droppable edge
				this.$elem.data(this._cnst.dataPrefix + 'taskbarEdge', _cache.edge);
			}

			// either a number of rows for horizontal taskbar or number of columns
			// for vertical taskbar
			_cache.secondarySize = !horizontal ? (isTaskbar ? this._getRealRowCol('vertical') : options.verticalColumns) * this._cache.verticalColumnWidth : (isTaskbar ? this._getRealRowCol('horizontal') : options.horizontalRows) * this._cache.horizontalRowHeight;

			_cache.actualSize = actualSize;

			// resolving colliding taskbar conflicts
			if (isTaskbar && this.options.resolveCollisions === true) {
				// before resolving collisions, actual taskbar needs to be
				// present in the DOM, so it has to act like there was no collision,
				// then we'll calculate if there were any
				_cache = this._setWidthAndHeight(_cache);
				_cache.colissionCss = this._zeroDirections();
				$.extend(this._cache, _cache);
				this._setTaskbarPositionDimensions();
				_cache = this._resolveCollisions(_cache);
			}

			// setts the width and height, as the value
			// of _cache.actualSize could change
			_cache = this._setWidthAndHeight(_cache);

			if (isTaskbar) {
				// extends internal config
				$.extend(this._cache, _cache);
			}

			// if it's droppable that called this function,
			// it will require this config to position itself
			return _cache;
		},

		_setWidthAndHeight: function(_cache) {
			// width and height differs now from what was initially set by user
			_cache.width = _cache.horizontal ? _cache.actualSize : _cache.secondarySize;
			_cache.height = !_cache.horizontal ? _cache.actualSize : _cache.secondarySize;

			return _cache;
		},

		_translateSize: function(options) {
			var containment = this._getContainmentInner(),
				horizontal = options.orientation === 'horizontal',
				// eihter width of horizontal taskbar or height of vertical taskbar
				mainDimension = horizontal ? options.horizontalWidth : options.verticalHeight,
				// percentSize will be later translated to px
				percentSize = this._isPercent(mainDimension), actualSize;

			if (percentSize) {
				// translates % to px
				actualSize = parseFloat(mainDimension) / 100 * (horizontal ? containment.width : containment.height);
			} else if (mainDimension === 'auto' && horizontal) {
				// use actualSize
			} else {
				// assume it's a valid setting
				actualSize = mainDimension;
			}

			// we can't have float at this point
			return parseInt(actualSize, 10);
		},

		_isPercent: function(val) {
			return typeof val === 'string' && val.substr(-1) === '%';
		},

		// return the real row/column value, with "max" nad "min" values
		// taken into account, and optionally generated a debug message
		// if "max" value is lower than "min" value
		_getRealRowCol: function(orientation) {
			var o = this.options;

			if (orientation === 'horizontal') {
				if (o.horizontalRowsMax < o.horizontalRowsMin) {
					this._debugLogAdd('"horizontalRowsMax" should not be lower than "horizontalRowsMin".', 1, 2);
				}

				return Math.max(Math.min(o.horizontalRows, o.horizontalRowsMax), o.horizontalRowsMin);
			}

			if (orientation === 'vertical') {
				if (o.verticalColumnsMax < o.verticalColumnsMin) {
					this._debugLogAdd('"verticalColumnsMax" should not be lower than "verticalColumnsMin".', 1, 2);
				}

				return Math.max(Math.min(o.verticalColumns, o.verticalColumnsMax), o.verticalColumnsMin);
			}
		},

		_removeTaskbarPositionClasses: function(options) {
			// either remove classes from droppable or from taskbar
			var $elem = options && options.elem ? options.elem : this.$elem;

			// those are all the classes that tells us about taskbar position
			$elem.removeClass(this.classes.taskbarHorizontal + ' ' + this.classes.taskbarVertical + ' ' + this.classes.taskbarStickTop + ' ' + this.classes.taskbarStickBottom + ' ' + this.classes.taskbarStickRight + ' ' + this.classes.taskbarStickLeft);
		},

		_setTaskbarPositionClasses: function(_cache, options) {
			// either set classes to droppable or to taskbar
			var $elem = options && options.elem ? options.elem : this.$elem;

			// clean start with position
			this._removeTaskbarPositionClasses(options);

			// add classes telling whether it's a horizontal or vertical
			// taskbar or droppable
			$elem.addClass(' ' + (_cache.horizontal ? this.classes.taskbarHorizontal : this.classes.taskbarVertical) + ' ' + this.classes.taskbarStickPrefix + _cache.stickVertical + ' ' + this.classes.taskbarStickPrefix + _cache.stickHorizontal);
		},

		// clears and the setts rounded corners if they should apply
		_setTaskbarRoundedCorners: function(options) {
			this._removeTaskbarRoundedCorners(options);
			this._addTaskbarRoundedCorners(options);
		},

		// removes rounded corners from taskbar and it's resizable
		_removeTaskbarRoundedCorners: function(options) {
			var $elem = options && options.elem ? options.elem : this.$elem;

			$elem.find('.' + this.classes.resizable).addBack().removeClass(this.classes.uiCornerTl + ' ' + this.classes.uiCornerTr + ' ' + this.classes.uiCornerBl + ' ' + this.classes.uiCornerBr);
		},

		_addTaskbarRoundedCorners: function(settings) {
			// noinspection JSUnusedLocalSymbols
			var self = this,
				_cache = this._cache,
				options = this.options,
				horizontal = options.orientation === 'horizontal',
				containment = this._getContainment(),
				$elem = settings && settings.elem ? settings.elem : this.$elem;

			// no rounded corners if a taskbar stretches through entire window
			if (horizontal && (options.horizontalWidth === '100%' || this._cache.horizontalRowHeight >= containment.width) || !horizontal && (options.verticalHeight === '100%' || this._cache.height >= containment.height)) {
				return false;
			}

			// shortcuts for switch
			var top = _cache.stickVertical === 'top', bottom = _cache.stickVertical === 'bottom', left = _cache.stickHorizontal === 'left', right = _cache.stickHorizontal === 'right', corner;

			// those are suffixes for native jQuery Ui's classes used for
			// rounded corners; we use opossite corners of the current
			// taskbar stick, so for the top left stick - the bottom right corner
			// is rounded, etc.
			switch (true) {
				case (top && left):
					corner = 'br';
					break;
				case (top && right):
					corner = 'bl';
					break;
				case (bottom && left):
					corner = 'tr';
					break;
				case (bottom && right):
					corner = 'tl';
					break;
			}

			// the skipResizable settings tells us whether the resizable
			// is at the initial position; if it's not, it should not receive
			// rounded borders
			var $target = settings && settings.skipResizable ? $elem : $elem.find('.' + this.classes.resizable).addBack();

			// adds proper class
			$target.addClass(this.classes.uiCornerPrefix + corner);
		},

		_resolveCollisions: function(_cache) {
			// noinspection JSUnusedLocalSymbols
			var self = this,
				horizontal = this.options.orientation === 'horizontal',
				actualSize = _cache.actualSize,
				secondarySize = _cache.secondarySize,
				margins = this.$windowsContainment.data(this._cnst.dataPrefix + 'taskbar-margins'),
				edge = _cache.edge,
				$taskbars = this._getTaskbarList(),
				// a list of window edges and their neighbouring edges
				neighbouringEdges = this._neighbouringEdges(),
				// current containment - window
				c = this._getContainment(),
				s = this._extendedPosition.call(this.$elem),
				// an empty set of CSS properties (top, bottom, left, right)
				css = this._zeroDirections(),
				$refreshNeighbours = $(),
				keep = this._cache.keepCollidedPosition;

			// when we in process of resizing that should not change taskbar
			// position relative to other taskbars, we use cached position
			// instead of recalculation
			var collisions = keep ? this._cache.collisions : this._zeroDirections();

			// margins variable could be undefined, which indicates it is initial run of first taskbar in this window,
			// in which case there are no conflicts to resolve and initial css variable is enough
			if (typeof margins === 'object' && !keep) {
				// iterate over neighbouring edges
				$.each(neighbouringEdges[edge], function(index, neighbouringEdge) {
					// noinspection JSPotentiallyInvalidUsageOfThis
					var $collidingTaskbars = $taskbars[neighbouringEdge].not(this.$elem);

					// margins needs to be > 0 and there has to be some taskbars;
					// it could happen that there are only autohide taskbars
					// and those are not considered space-takers
					if (margins [neighbouringEdge] !== 0 && $collidingTaskbars.length > 0) {
						$collidingTaskbars.each(function() {
							var $this = $(this), p = self._extendedPosition.call($this);

							// collision detection will change top/bottom/left/right
							// CSS value; detected collusions will be reflected
							// by changing _cache.actualSize;
							// example logic: if current taskbar edge is top,
							// check if it's bottom edge collides with other
							// taskbars top edge; if so, check for opposing edges,
							// for example: left for right, etc. if right edge
							// of left positioned possibly colliding taksbar
							// is over left edge of taskbar we trying to position,
							// that's a collision and CSS left of taskbar we want
							// to move will likely be updated
							if ((edge === 'left' && p.left < s.right) || (edge === 'right' && p.right > s.left)) {
								if (neighbouringEdge === 'top' && p.bottom > s.top) {
									// we use Math.max because value larger than
									// that coming from current taskbar
									// could be set by some previous taskbar
									css.top = Math.max(css.top, p.bottom);
								}

								if (neighbouringEdge === 'bottom' && p.top < s.bottom) {
									css.bottom = Math.max(css.bottom, p.height);
								}
							}

							// that's just the code from above,
							// except left = top, right = bottom, height = width
							if ((edge === 'top' && p.top < s.bottom) || (edge === 'bottom' && p.bottom > s.top)) {
								if (neighbouringEdge === 'left' && p.right > s.left) {
									css.left = Math.max(css.left, p.right);
								}

								if (neighbouringEdge === 'right' && p.left < s.right) {
									css.right = Math.max(css.right, p.width);
								}
							}
						});
					}
				});
			}

			if (keep) {
				css = collisions;
			}

			this._cache.collisions = css;

			$.each($taskbars, function(index, $taskbars) {
				$taskbars.each(function() {
					// update neighbours that needs refreshing
					$refreshNeighbours = $refreshNeighbours.add($(this));
				});
			});

			$refreshNeighbours = $refreshNeighbours.not(this.$elem);

			// change value of actual size by extracting margins
			_cache.actualSize -= horizontal ? css.right + css.left : css.top + css.bottom;

			// this will be used to position taskbar
			_cache.colissionCss = css;

			// refresh neighbouring taskbar only if current taskbar is not
			// a taskbar that's refresh was called by another taskbar,
			// otherwise we skip and taskbar collision resolve
			// themselves as taskbars collide
			if (!this.$elem.hasClass(this.classes.refreshPositionOnce) && $refreshNeighbours.length) {
				// refresh neighbours after refresh because current taskbar position
				// is not changed at the moment
				this._bindInternal('afterResolveCollisions', function() {
					$refreshNeighbours.each(function() {
						var $this = $(this);

						if ($this.hasClass(self.classes.taskbar) && !$this.hasClass(self.classes.refreshPositionOnce)) {
							$this.addClass(self.classes.refreshPositionOnce).data(self._cnst.dataPrefix + 'taskbar')._refresh();
						}
					});
				});
			}

			return _cache;
		},

		_tryAfterResolveCollisions: function() {
			this._triggerInternal('afterResolveCollisions');

			// remove class after internal callback - prevents intinite loop
			this.$elem.removeClass(this.classes.refreshPositionOnce);
		},

		// used upon destruction
		_refreshNeighbours: function() {
			// a list of window edges and their neighbouring edges
			var self = this, $taskbars = this._getTaskbarList(), neighbouringEdges = this._neighbouringEdges();

			$.each(neighbouringEdges[this._cache.edge], function(index, edge) {
				$taskbars[edge].each(function() {
					$(this).data(self._cnst.dataPrefix + 'taskbar')._refresh();
				});
			});
		},

		// set position and dimensions for taskbar or droppable
		_setTaskbarPositionDimensions: function(options) {
			// noinspection JSUnusedLocalSymbols
			var self = this,
				_cache = options && options._cache ? options._cache : this._cache,
				isTaskbar = !options,
				$elem = options && options.elem ? options.elem : this.$elem,
				class_ = options && options.addClass ? options.addClass : '';

			$elem.addClass(class_).css({
				width: _cache.width,
				height: _cache.height
			});

			// part of resolving collisions: set values higher than 0,
			// from cache created last time collisions were resolved,
			// on this taskbar
			if (isTaskbar && this.options.resolveCollisions === true) {
				for (var i in _cache.colissionCss) {
					// noinspection JSUnfilteredForInLoop
					if (_cache.colissionCss [i] > 0) {
						// noinspection JSUnfilteredForInLoop
						$elem.css(i, _cache.colissionCss[i]);
					}
				}
			}
		},

		// compute row height for "orientation": "horizontal"
		_computeAutoHeight: function(options) {
			// noinspection JSUnusedLocalSymbols
			var self = this,
				// create fake taskbar and prepend it
				$elem = $('<div></div>').addClass(this.classes.taskbar + ' ' + this.classes.taskbarHorizontal + ' ' + this.classes.taskbarStickPrefix + options.edge).prependTo($('body'));

			this._setTaskbarRoundedCorners({
				skipResizable: true,
				elem: $elem
			});

			// create fake container
			var $dummy = this._factory('startButtonsContainer');

			// copy a bunch of properties regarding height,
			// so $().tasbkar( "refresh" ) could be more accurate
			if (this.$elem && this.$elem.length) {
				this._copyStyles({
					from: this.$elem,
					to: $dummy,
					properties: ['fontSize', 'lineHeight']
				});
			}

			// create fake start button
			// noinspection JSUnusedLocalSymbols
			var $start = this._factory('startButton', {
				text: 'Placeholder',
				name: 'start'
			}).prependTo($dummy);

			// prepend container to taskbar
			$dummy.prependTo($elem);

			// get the height
			var height = $elem.outerHeight();

			// cleanup
			$dummy.remove();
			$elem.remove();

			return height;
		},

		_bindGlobalEvents: function() {
			var self = this;

			// bindings taskbar refresh to the browser window resize
			// allow it to get the right dimensions
			$(window).on('resize.' + this._cache.uep, function(event, params) {
				// prevents bubbling of other resize events
				if (event.target !== window) {
					return true;
				}
				// +
				if (!params || params.caller !== 'taskbar-iframe') {
					// call handler from within itself with a delay,
					// for those cases where iframe fix is useless
					// - for example, when the body has fixed width
					if (event.delegateTarget === window) {
						self._resizeEvent(true);
					}

					return true;
				}

				// clear interval - no more tries if we're about to refresh
				clearInterval(self._cache.timeouts.windowResize);

				self._cache.keepCollidedPosition = true;
				self._refresh();
				self._cache.keepCollidedPosition = false;

				// refresh windows position
				self._refreshWindowsPosition({
					skipFitting: true
				});
			});

			$(window).on('mousedown.' + this._cache.uep, function(event) {
				// cache the last mousedown target for use in "click" handler
				self._cache.mousedownTarget = $(event.target);
			});

			//
			// noinspection JSUnusedLocalSymbols
			$(window).on('blur.' + this._cache.uep, function(event) {
				if (self.options.propagateWindowBlur) {
					self._blurWindows();
					self.hideSubordinates();
				}
			});

			$(document).on('click.' + this._cache.uep, function(event) {
				var prevents = self.$windowsContainment.data(
					self._cnst.dataPrefix + 'preventClicks'
				);

				var preventGlobalWindowClick = false;

				// allow one-time prevention of this handler
				// in regard to bluring windows and window buttons
				if (!isNaN(parseInt(prevents, 10)) && prevents > 0) {
					self.$windowsContainment.data(
						self._cnst.dataPrefix + 'preventClicks', --prevents
					);

					preventGlobalWindowClick = true;
				}

					// when target is body, click started on diffrent element
					// that is finished, in which case we could have more luck
					// with mousedown target
				var $target = $(event.target).is('body') ? self._cache.mousedownTarget : $(event.target),
					$datepickerHeader = $target.closest('.' + self.classes.uiDatepickerHeader),
					s = self.$elem[0].nodeName.toLowerCase() + '#' + self.$elem[0].id + ' ',
					i = '[data-taskbar-uuid=' + self.uuid + ']',

					// is the target current taskbar's subordinate menu
					isMenu = ($target.is('[data-menu-type], [data-menu-type] *, [data-menu-button], [data-menu-button] *, [data-group-name], [data-group-name] *, .' + self.classes.windowGroupMenu + ', '+ '.' + self.classes.windowGroupMenu + ' *, '+ '.' + self.classes.windowButton + ', '+ ' .' + self.classes.windowButton + ' *') || $target.parent().is('[data-group-name]')),

					// is the target curent taskbar's datepicker
					isDatepicker = $target.is(s + '.' + self.classes.datepicker + ', ' + s + '.' + self.classes.datepicker + ' *, ' + s + '.' + self.classes.clock + ', ' + s + '.' + self.classes.clock + ' *'),

					// is this a datepicker header of current taskbar datepicker
					isDatepickerHeader = $datepickerHeader.attr('data-taskbar-uuid') === self.uuid,

					// is this a window or window button
					// target could be detached by now,
					// so let's check it's class name set by window widget
					isWindow = $target.is('.' + self.classes.window + ', ' + '.' + self.classes.window + ' *, ' + '.' + self.classes.windowManipulationButton + ', ' + '.' + self.classes.windowManipulationButton + ' span, ' + '.' + self.classes.windowTitlebarButtonIcon),

					// is this a window button or window group menu item
					isWindowTrigger = $target.is('.' + self.classes.windowButton + ', ' + '.' + self.classes.windowButton + ' *, ' + '.' + self.classes.windowGroupMenu + ', ' + '.' + self.classes.windowGroupMenu + ' *'),

					// is this a dialog overlay of window from current taskbar
					isOverlay = $target.is('.' + $.emuos.window.prototype.classes.dialogOverlay + i);

				isDatepicker = isDatepicker || isDatepickerHeader;

				// if that's not a menu, hide menus
				if (!isMenu) {
					self._hideMenus({
						own: true
					});
				}

				// if that's not a datepicker, hide other datepicker
				if (!isDatepicker) {
					self._hideDatepickers({
						own: true,
						blur: !isMenu
					});
				}

				// it that's not a subordinate, set openedElements state to false
				if (!isMenu && !isDatepicker) {
					self._openedElements(false);
				}

				// blur active window if no window or window trigger is clicked
				if (!isWindow && !isWindowTrigger && !isOverlay && !preventGlobalWindowClick) {
					self._blurWindows();
					self.blurConnectedButtons();
				}

				// click olways hides tooltips
				self._hideTooltips();

				if (self._openedElements()) {
					self._setConnectedButtonsStates();
				}
			});

			// return a jQuery object with draggable or resizable in progress,
			// or empty jQuery object otherwise
			function getWindowWithInteraction() {
				// noinspection JSUnusedLocalSymbols
				var $windowDragging = $('.' + self.classes.window + '.' + self.classes.uiDraggableDragging),
					$windowResizing = $('.' + self.classes.window + '.' + self.classes.uiResizableResizing),
					windowInstance;

				if ($windowDragging.length || $windowResizing.length) {
					var $elem = ($windowDragging.length ? $windowDragging : $windowResizing).children('.' + self.classes.windowContent);

					if ($elem.is(self.windows())) {
						return $elem;
					}
				}

				return $();
			}

			// noinspection JSUnusedLocalSymbols
			$(window).on('scroll.' + this._cache.uep, function(event) {
				self._setDraggableContainment();

				// don't refresh window's position:
				// it's too heavy to do on every scroll
				self._refreshWindowsContainment({
					refreshPosition: false
				});

				if (self.$elem.hasClass(self.classes.draggableDragging)) {
					// after scroll is done via mousewheel or any other means,
					// draggable containment has to be refreshed,
					// along with droppable offset, which is cached
					// in droppable instance
					var draggable = self.$elem.data(self.classes.uiDraggable);
					draggable._setContainment();

					$('.' + self.classes.droppable).each(function() {
						var $this = $(this), droppable = $this.data(self.classes.uiDroppable);
						droppable.offset = $this.offset();
					});
				}

				var $window = getWindowWithInteraction();

				if ($window.length) {
					var dragging = $window.parent().hasClass(self.classes.uiDraggableDragging), windowInstance = $window.data(self._cnst.dataPrefix + 'window');

					// refresh draggable containment
					if (dragging) {
						var containment = windowInstance._getRealContainment();
						if (containment === 'visible') {
							windowInstance._setContainment();
							var draggableInstance = $window.parent().data(self.classes.uiDraggable);

							draggableInstance._setContainment();
						}
					} else {
						windowInstance._refreshContainmentSize();
					}
				}
			});

			// prevent mousewheel on certain interactions (resizable, sortable),
			// where it make no sense to scroll, and a lot of additional code
			// woulde be required to deal with problems emerging from changing
			// elements position relative to the window
			$(document).on('mousewheel.' + this._cache.uep, function(event) {
				if (self._cache.progress.windowButtonsSortable || self._cache.progress.taskbarResizable || getWindowWithInteraction().parent().hasClass(self.classes.uiResizableResizing)) {
					event.preventDefault();
				}
			});

			// noinspection JSUnusedLocalSymbols
			var checkConnectivity = function(e) {
				self._setNetworkMonitorStatus();
			};

			// refresh network monitor status on online/offline events
			$(window).on('online.' + this._cache.uep, checkConnectivity);
			$(window).on('offline.' + this._cache.uep, checkConnectivity);
		},

		_setDraggable: function() {
			options = this.options;

			var self = this,
				_cache = this._cache,
				draggable = options.draggable,
				$elem = self.$elem,
				isDraggable = $elem.hasClass(this.classes.uiDraggable);

			if (!draggable && isDraggable) {
				$elem.draggable('destroy');
			}

			if (draggable && (!$.ui.draggable || !$.ui.droppable)) {
				this._debugLogAdd('jQuery UI Draggable and Droppable are required for draggable taskbar to work.', 1, 0);
			}

			if (!draggable || !$.ui.draggable || !$.ui.droppable) {
				return;
			}

			var helperCreator = function() {
				// build helper with a initial width of one-column vertical taskbar
				// and a initial height of one-row horizontal taskbar
				var $helper = self._factory('draggableHelper').css({
					width: _cache.verticalColumnWidth,
					height: _cache.horizontalRowHeight,
					position: 'fixed'
				});

				var thickestBorderWidth = 0, thickestBorder;

				// get the thickest border; helper border color will be taken
				// from this one, as it is most notable to user
				$.each(['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'], function(index, value) {
					var currentBorderWidth = parseInt($elem.css(value), 10);

					// if border in the current itteration is thicker than what we
					// had to this point, select it so it could later be used
					if (currentBorderWidth > thickestBorderWidth) {
						thickestBorderWidth = currentBorderWidth;
						thickestBorder = value.slice(0, -5);
					}
				});

				// color of the thickest border
				// noinspection JSUnusedAssignment
				var color = $elem.css(thickestBorder + 'Color');

				// set color of the thickest border and 1px width
				// for every border of the helper
				$.each(['borderTop', 'borderRight', 'borderBottom', 'borderLeft'], function(index, value) {
					$helper.css(value + 'Width', '1px').css(value + 'Color', color);
				});

				// copy a bunch of properties from taskbar
				self._copyStyles({
					from: $elem,
					to: $helper,
					properties: ['boxSizing', 'backgroundColor', 'borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle']
				});

				return $helper;
			};

			var originalOffset = {};

			function draggableUi(ui) {
				ui.originalOffset = originalOffset;

				return ui;
			}

			// noinspection JSCheckFunctionSignatures
			var options = {
				scroll: false,
				// prevents scrolling
				containment: 'window',
				cursor: 'move',
				distance: 1,
				revert: 'invalid',
				iframeFix: true,
				revertDuration: false,
				cancel: '.' + this.classes.uiButton + ', .' + this.classes.uiMenu + ', .' + this.classes.uiDatepicker
					// Trident triggers mousedown event when scroll
					// is being dragged, so draggable can't start
					// on elements that potentially can have scroll
					+ (window.navigator.userAgent.match(/Trident/) && !this._cache.horizontal ? ', .' + self.classes.windowButtonsContainer : ''),
				// cursor will be at the center of helper
				cursorAt: {
					left: parseInt(_cache.verticalColumnWidth / 2, 10),
					top: parseInt(_cache.horizontalRowHeight / 2, 10)
				},
				helper: helperCreator,
				start: function(event, ui) {
					self._cache.progress.taskbarDraggable = true;

					// show taskbar immediately
					self._startShowing({
						quick: true
					});

					self.$elem.data(self._cnst.dataPrefix + 'window-scrolls', {
						x: $(window).scrollLeft(),
						y: $(window).scrollTop()
					});

					originalOffset = self.$elem.offset();

					self.$elem.addClass(self.classes.draggableDragging);
					self._hideAll();
					self._showDroppable();

					self._trigger('dragStart', event, draggableUi(ui));
				},
				stop: function(event, ui) {
					self._hideDroppable();
					self.$elem.removeClass(self.classes.draggableDragging);

					$('.' + self.classes.droppablePending).removeClass(self.classes.droppablePending);

					self._cache.progress.taskbarDraggable = false;

					self.$elem.removeData(self._cnst.dataPrefix + 'window-scrolls');

					self.windows().window('refreshPosition', {
						skipOnFit: true
					});

					self._trigger('dragStop', event, draggableUi(ui));
				},
				drag: function(event, ui) {
					if (parseFloat($.ui.dialog.prototype.version) >= 1.11) {
						var scrolls = self.$elem.data(self._cnst.dataPrefix + 'window-scrolls');

						ui.position.left += scrolls.x - $(window).scrollLeft();
						ui.position.top += scrolls.y - $(window).scrollTop();
					}

					self._trigger('drag', event, draggableUi(ui));
				},
				disabled: !draggable
			};

			if (isDraggable) {
				$elem.draggable('option', options);
			} else {
				$elem.draggable(options);
			}

			this._setDraggableContainment();
		},

		// set's containment for draggable
		_setDraggableContainment: function() {
			if (!this.options.draggable || !$.ui.draggable || !$.ui.droppable || !this.$elem.hasClass(this.classes.uiDraggable)) {
				return;
			}

			if (!this.$windowCopy.length || !this.$droppableRight.length) {
				return;
			}

			// extracting bottom and right droppables from containment width/height
			// fixes a bug where draggable helper would be dragged
			// outside of containment by that exact amount of px
			var wc = this._extendedPosition.call(this.$windowCopy),
				dr = this._extendedPosition.call(this.$droppableRight),
				db = this._extendedPosition.call(this.$droppableBottom),
				scroll = this._getWindowScroll(),
				containment = [scroll.x, scroll.y, scroll.x + wc.width - dr.width, scroll.y + wc.height - db.height];

			this.$elem.draggable('option', 'containment', containment);
		},

		_setResizable: function(options) {
			var self = this,
				_cache = self._cache,
				resizable = self.options.resizable,
				horizontal = self.options.orientation === 'horizontal',
				stick = !horizontal ? _cache.stickHorizontal : _cache.stickVertical,
				orientation = self.options.orientation,
				$elem = self.$elem,
				$resizable = $elem.find('.' + self.classes.resizable);

			if (resizable && !$.ui.resizable) {
				this._debugLogAdd('jQuery UI Resizable is required for resizable taskbar to work.', 1, 0);
			}

			if (!(!options || !options.destroy) && $resizable.hasClass(this.classes.uiResizableResizing)) {
				return true;
			}

			// a known bug don't allow settings handles after init,
			// so resizable has to be rebuilt every time
			// http://bugs.jqueryui.com/ticket/3423
			if ($resizable.hasClass(this.classes.uiResizable)) {
				$resizable.resizable('destroy');
			}

			$resizable.remove();

			if (!$.ui.resizable || (options && options.destroy)) {
				return;
			}

			$resizable = self._factory('resizable').prependTo($elem);

			if (this.options.horizontalWidth === 'auto' && horizontal) {
				var resizableCalculatedWidth = this.$elem.outerWidth();
				$resizable.css('width', resizableCalculatedWidth);
			}

			var handles = {
				horizontal: {
					bottom: 'n',
					top: 's'
				},
				vertical: {
					left: 'e',
					right: 'w'
				}
			};

			var grid = {
				horizontal: {
					bottom: [0, _cache.horizontalRowHeight],
					top: [0, _cache.horizontalRowHeight]
				},
				vertical: {
					left: [_cache.verticalColumnWidth, 0],
					right: [_cache.verticalColumnWidth, 0]
				}
			};

			var min = {
				horizontal: {
					width: 0,
					height: _cache.horizontalRowHeight * this.options.horizontalRowsMin
				},
				vertical: {
					width: _cache.verticalColumnWidth * this.options.verticalColumnsMin,
					height: 0
				}
			};

			var max = {
				horizontal: {
					width: 0,
					height: _cache.horizontalRowHeight * this.options.horizontalRowsMax
				},
				vertical: {
					width: _cache.verticalColumnWidth * this.options.verticalColumnsMax,
					height: 0
				}
			};

			// noinspection JSUnusedLocalSymbols
			var resizableUi = function(originalUi, eventType) {
				var o = self.options,
					sizeAxis,
					gridPosition,
					ui = {};

				ui.helper = originalUi.helper;
				ui.gridPosition = originalUi.gridPosition;
				ui.originalGridPosition = originalUi.originalGridPosition;

				ui.originalSizeAxis = o.orientation === 'horizontal' ? _cache.horizontalRowHeight : _cache.verticalColumnWidth;

				ui.originalGridPosition = o.orientation === 'horizontal' ? o.horizontalRows : o.verticalColumns;

				if (o.orientation === 'horizontal') {
					sizeAxis = originalUi.size.height;
					gridPosition = sizeAxis / _cache.horizontalRowHeight;
				}

				if (o.orientation === 'vertical') {
					sizeAxis = originalUi.size.width;
					gridPosition = sizeAxis / _cache.verticalColumnWidth;
				}

				ui.sizeAxis = sizeAxis;
				ui.gridPosition = Math.round(gridPosition);

				ui.orientation = o.orientation;

				return ui;
			};

			var atStart = {
				axis: 0,
				gridPosition: 0,
				first: false
			};

			var fixResizableMaskPosition = function(event, ui, eventType) {
				var dimensionName = self._cache.horizontal ? 'bottom' : 'right';

				var invertedDimension = self._cache.horizontal ? 'top' : 'left';

				var size = self._cache.horizontal ? 'height' : 'width';

				if (self._cache.edge !== dimensionName) {
					return;
				}

				var uiGridPositionWasZero = false;

				if (eventType === 'resize' || eventType === 'stop') {
					// right edge fix
					if (!ui.gridPosition) {
						uiGridPositionWasZero = true;

						ui.gridPosition = 1;
					}

					var rightDimension = atStart.axis / atStart.gridPosition, currentDimension = ui.sizeAxis / ui.gridPosition;

					if (currentDimension !== rightDimension) {
						var diff = currentDimension - rightDimension;

						var cssDimension = Math.round(parseFloat(ui.helper.css(invertedDimension)));

						var cssSize = Math.round(parseFloat(ui.helper.css(size)));

						// right edge fix
						if (uiGridPositionWasZero) {
							cssSize = rightDimension + diff;
						}

						ui.helper.css(invertedDimension, cssDimension + diff).css(size, cssSize - diff);

						return true;
					}
				}
			};

			$resizable.resizable({
				grid: grid[orientation][stick],
				handles: handles[orientation][stick],
				minWidth: min[orientation].width,
				minHeight: min[orientation].height,
				maxWidth: max[orientation].width,
				maxHeight: max[orientation].height,
				// when distance or delay are anything but 0, resizable mask change
				// it's dimension before resize start; we don't want that because
				// it's not the original element that get resized,
				// but a palceholder sitting on top of taskbar, expanding
				// to the size of taskbar when mouse is over resizable handle
				distance: 0,
				delay: 0,
				start: function(event, ui) {
					self._cache.progress.taskbarResizable = true;

					ui = resizableUi(ui);

					atStart.axis = ui.sizeAxis;
					atStart.first = true;
					atStart.gridPosition = ui.originalGridPosition;

					self._startShowing({
						quick: true
					});

					self.$elem.addClass(self.classes.resizableResizing);

					$(event.target).css(self._styleIndicator(self.classes.uiWidgetContent+ ' ' + self.classes.uiStateActive, 'borderColor'));

					self._trigger('resizeStart', event, ui);
				},
				resize: function(event, ui) {
					ui = resizableUi(ui);

					var fixed;

					if (self._versionOf('resizable', '>=', '1.11.1')) {
						fixed = fixResizableMaskPosition(event, ui, 'resize');
					}

					self._setTaskbarRoundedCorners({
						skipResizable: ui.gridPosition !== ui.originalGridPosition
					});

					// dont trigger event if size was corrected by
					// fixResizableMaskPosition()
					if (!atStart.first || !fixed) {
						self._trigger('resize', event, ui);
					}

					atStart.first = false;
				 },
				stop: function(event, ui) {
					 var o = self.options;

					 ui = resizableUi(ui);

					 if (self._versionOf('resizable', '>=', '1.11.1')) {
						 fixResizableMaskPosition(event, ui, 'stop');
					 }

					 if (o.orientation === 'horizontal') {
						 o.horizontalRows = Math.round(ui.gridPosition);
					 }

					 if (o.orientation === 'vertical') {
						 o.verticalColumns = Math.round(ui.gridPosition);
					 }

					 self.$elem.removeClass(self.classes.resizableResizing);

					 self._cache.keepCollidedPosition = true;
					 self._refresh();
					 self._cache.keepCollidedPosition = false;

					 self._cache.progress.taskbarResizable = false;

					 self._trigger('resizeStop', event, ui);
				 },
				disabled: !resizable
			 });

			var resizableMouseEnterLeave = function(event) {
				var $self = $(this),
					$elem = $self.closest('.' + self.classes.resizable),
					horizontal = self.options.orientation === 'horizontal',
					vertical = !horizontal,
					stick = horizontal ? self._cache.stickVertical : self._cache.stickHorizontal;

				if (event.originalEvent === undefined) {
					// if event is trigger programatically and resizable
					// is disabled, this class prevents cursor from changing
					// to n-resize, s-resize, e-resize or w-resize
					if (!self.options.resizable) {
						$elem.addClass(self.classes.resizableDisabled);
					}
				}

				if ($elem.hasClass(self.classes.uiResizableResizing)) {
					return true;
				}

				var $taskbar = $elem.closest('.' + self.classes.taskbar),
					$handle = $elem.find('.' + self.classes.uiResizableHandle),

					t = {
						b: parseInt($taskbar.css('borderBottomWidth'), 10),
						t: parseInt($taskbar.css('borderTopWidth'), 10),
						r: parseInt($taskbar.css('borderRightWidth'), 10),
						l: parseInt($taskbar.css('borderLeftWidth'), 10)
					},

					ho = self.options.resizableHandleOverflow,

					elemCss = {
						top: 'auto',
						bottom: 'auto',
						left: 'auto',
						right: 'auto',
						borderTopWidth: 0,
						borderRightWidth: 0,
						borderBottomWidth: 0,
						borderLeftWidth: 0,
						borderStyle: $taskbar.css('borderStyle')
					},

					handleCss = {
						top: 'auto',
						bottom: 'auto',
						left: 'auto',
						right: 'auto'
					};

				/*if (resizable) {
				 // copy border color of default state
				 if (event.type === "mouseleave") {
				 $.extend(elemCss, self._styleIndicator(self.classes.uiWidgetContent, "borderColor"));
				 }

				 // copy border color of focus state
				 if (event.type === "mouseenter") {
				 $.extend(elemCss, self._styleIndicator(self.classes.uiWidgetContent + " " + self.classes.uiStateFocus, "borderColor"));
				 }
				 }*/

				// minSize was initially set to 0 (technically, this variable
				// was not present since it would do nothing), but Chrome failed to
				// trigger mouseenter on element that's parent had height/width
				// set to 0, when runned in iframe, causing
				// tests/unit/taskbarAutoHide.html to fail
				// in tests/unit/all.html
				// this wasn't a case in Firefox
				var minSize = 1;

				// handle horizontal top
				if (horizontal && stick === 'top') {
					handleCss.height = ho * 2 + t.b;

					if (event.type === 'mouseenter') {
						handleCss.bottom = handleCss.height * -1 + ho;
					}

					if (event.type === 'mouseleave') {
						handleCss.bottom = -ho + minSize;
					}
				}

				// handle horizontal bottom
				if (horizontal && stick === 'bottom') {
					handleCss.height = ho * 2 + t.t;

					if (event.type === 'mouseenter') {
						handleCss.top = handleCss.height * -1 + ho + minSize;
					}

					if (event.type === 'mouseleave') {
						handleCss.top = -ho;
					}
				}

				// handle vertical left
				if (vertical && stick === 'left') {
					handleCss.width = ho * 2 + t.r;

					if (event.type === 'mouseenter') {
						handleCss.right = handleCss.width * -1 + ho;
					}

					if (event.type === 'mouseleave') {
						handleCss.right = -ho + minSize;
					}
				}

				// handle vertical right
				if (vertical && stick === 'right') {
					handleCss.width = ho * 2 + t.l;

					if (event.type === 'mouseenter') {
						handleCss.left = handleCss.width * -1 + ho + minSize;
					}

					if (event.type === 'mouseleave') {
						handleCss.left = -ho;
					}
				}

				// element mouseenter
				if (event.type === 'mouseenter') {
					elemCss.top = 0 - t.t;
					elemCss.left = 0 - t.l;

					// horizontal top
					if (horizontal && stick === 'top') {
						elemCss.borderBottomWidth = resizable ? t.b : 0;
						elemCss.top = 0 - t.t - t.b - self.options.resizableHandleOffset;
					}

					// horizontal bottom
					if (horizontal && stick === 'bottom') {
						elemCss.borderTopWidth = resizable ? t.t : 0;
						elemCss.top = 0 - t.t + self.options.resizableHandleOffset;
					}

					// vertical left
					if (vertical && stick === 'left') {
						elemCss.borderRightWidth = resizable ? t.r : 0;
						elemCss.left = 0 - t.l - t.r - self.options.resizableHandleOffset;
					}

					// vertical right
					if (vertical && stick === 'right') {
						elemCss.borderLeftWidth = resizable ? t.l : 0;
						elemCss.left = 0 - t.l + self.options.resizableHandleOffset;
					}

					elemCss.width = resizableCalculatedWidth || self._cache.width;
					elemCss.height = self._cache.height;
				}

				// element mouseleave
				if (event.type === 'mouseleave') {
					// horizontal
					if (horizontal) {
						elemCss.left = 0 - t.l;
					}

					// vertical
					if (vertical) {
						elemCss.top = 0 - t.t;
					}

					// horizontal top
					if (horizontal && stick === 'top') {
						elemCss.borderBottomWidth = resizable ? t.b : 0;
						elemCss.top = self._cache.height - t.t - (self.options.resizableHandleOffset !== 0 ? self.options.resizableHandleOffset + 2 : self.options.resizableHandleOffset);
					}

					// horizontal bottom
					if (horizontal && stick === 'bottom') {
						elemCss.borderTopWidth = resizable ? t.t : 0;
						elemCss.top = 0 - t.t + self.options.resizableHandleOffset;
					}

					// vertical left
					if (vertical && stick === 'left') {
						elemCss.borderRightWidth = resizable ? t.r : 0;
						elemCss.left = self._cache.width - t.l - (self.options.resizableHandleOffset !== 0 ? self.options.resizableHandleOffset + 2 : self.options.resizableHandleOffset);
					}

					// vertical right
					if (vertical && stick === 'right') {
						elemCss.borderLeftWidth = resizable ? t.l : 0;
						elemCss.left = 0 - t.l + self.options.resizableHandleOffset;
					}

					elemCss.width = horizontal ? resizableCalculatedWidth || self._cache.width : minSize;
					elemCss.height = vertical ? self._cache.height : minSize;
				}

				$handle.css(handleCss);
				$elem.css(elemCss).toggleClass(self.classes.resizableMouseover, event.type === 'mouseenter');
			};

			$resizable.find('.' + this.classes.uiResizableHandle).on('mouseenter.' + this._cnst.eventPrefix + 'resizablehandle' + ' mouseleave.' + this._cnst.eventPrefix + 'resizablehandle', resizableMouseEnterLeave).on('mousedown.' + this._cache.uep, function() {
				if (!self.options.resizable) {
					return true;
				}

				self._hideAll();
			}).trigger('mouseleave.' + this._cnst.eventPrefix + 'resizablehandle');
		},

		_getContainment: function() {
			return {
				width: $(window).width(),
				height: $(window).height()
			};
		},

		_getContainmentInner: function() {
			return {
				width: $(window).innerWidth(),
				height: $(window).innerHeight()
			};
		},

		// show droppable zones
		_showDroppable: function() {
			// noinspection JSUnusedLocalSymbols
			var $elem = this.$elem;

			$('.' + this.classes.droppable + '[data-taskbar-uuid= ' + this.uuid + ']').removeClass(this.classes.hidden);
		},

		// hide droppable zones
		_hideDroppable: function() {
			$('.' + this.classes.droppable + '[data-taskbar-uuid= ' + this.uuid + ']').addClass(this.classes.hidden);
		},

		_setDroppable: function() {
			$('.' + this.classes.droppableContainer + '[data-taskbar-uuid= ' + this.uuid + ']').remove();

			if (!this.options.draggable) {
				return;
			}

			// noinspection JSUnusedLocalSymbols
			var self = this,
				options = this.options,
				$container = self._factory('droppableContainer').insertAfter(self.$elem),
				containment = this._getContainment(),
				// default sticks for droppable edges
				sticks = {
					'top': 'top left',
					'right': 'right top',
					'bottom': 'bottom left',
					'left': 'left top'
				},
				_cache = this._cache,
				horizontal,
				$elem;

			$.each(['top', 'right', 'bottom', 'left'], function(index, position) {
				horizontal = $.inArray(position, ['top', 'bottom']) > -1;

				var upperKey = position.charAt(0).toUpperCase() + position.slice(1);

				// create droppables and keep their jQuery objects
				self['$droppable' + upperKey] = $elem = self._factory('droppable').data(self._cnst.dataPrefix + 'droppable-edge', position).uniqueId().appendTo($container);

				// use the same function that is used for
				// calculating taskbar dimensions
				_cache = self._setDimensions({
					elem: $elem,
					orientation: horizontal ? 'horizontal' : 'vertical',
					horizontalWidth: '100%',
					horizontalStick: sticks[position],
					horizontalRows: 1,
					horizontalRowHeight: _cache.horizontalRowHeight,
					verticalHeight: '100%',
					verticalStick: sticks[position],
					verticalColumns: 1,
					verticalColumnWidth: _cache.verticalColumnWidth
				});

				// set CSS to droppable
				self._setTaskbarPositionDimensions({
					elem: $elem,
					_cache: _cache,
					addClass: self.classes.hidden
				});

				// noinspection JSUnusedLocalSymbols
				var droppableAccept = function($draggable, $droppable, ee) {
					var droppableEdge = $droppable.data(self._cnst.dataPrefix + 'droppable-edge'),
						taskbarEdge = $draggable.data(self._cnst.dataPrefix + 'taskbarEdge'),
						margins = self.$windowsContainment.data(self._cnst.dataPrefix + 'taskbar-margins');

					return self.uuid === $draggable.data(self._cnst.dataPrefix + 'taskbar').uuid && (self.options.dropOnExisting || margins[droppableEdge] === 0 || taskbarEdge === droppableEdge);
				};

				var draggableDrop = function(event, ui) {
					var $target = $(event.target), o = self.options, requestedStick;

					// taskbar helper could be positioned over two droppables
					// at the same time and two drop events will occur, but only
					// the last droppable entered will have this class
					if (!$target.hasClass(self.classes.droppableOver) && event.type !== 'dropover') {
						return false;
					}

					// noinspection JSUnusedAssignment
					var orientation, containment = self._getContainment(), prefix = self.classes.taskbarPrefix, stickPrefix = prefix + 'stick-', stick = [];

					var classes = $target.attr('class').split(' ').map(function(className) {
						// get droppable orientation
						if ($.inArray(className, [prefix + 'horizontal', prefix + 'vertical']) > -1) {
							return orientation = className.replace(self.classes.taskbarPrefix, '');
						}

						// get droppable stick
						if (className.indexOf(stickPrefix) !== -1) {
							return className.replace(stickPrefix, '');
						}
					});

					// in those cases taskbar cannot be dropped on current droppable
					// noinspection JSUnusedAssignment
					if (o.draggable === 'orientation' && orientation !== o.orientation || o.draggable === 'vertical' && orientation === 'horizontal' || o.draggable === 'horizontal' && orientation === 'vertical') {
						return false;
					}

					// if it not false at this point, it's true for dropover:
					// droppable can be highlighted
					if (event.type === 'dropover') {
						return true;
					}

					for (var i in classes) {
						// noinspection JSUnusedAssignment
						if ($.inArray(classes[i], ['right', 'left']) > -1 && orientation === 'horizontal') {
							requestedStick = event.clientX > containment.width / 2 ? 'right' : 'left';

							if (!options.draggableBetweenEdges) {
								// if edge doesn't match, do nothing
								if (o.horizontalStick.indexOf(requestedStick) === -1) {
									return false;
								}

								// if taskbar is not draggable between edges,
								// take the original stick
								classes[i] = options.horizontalStick.replace(/(bottom|top)/, '');
							} else {
								// if taskbar is draggable between edges,
								// rely on mouse position
								classes[i] = requestedStick;
							}
						}

						// noinspection JSUnusedAssignment
						if ($.inArray(classes[i], ['top', 'bottom']) > -1 && orientation === 'vertical') {
							requestedStick = event.clientY > containment.height / 2 ? 'bottom' : 'top';

							if (!options.draggableBetweenEdges) {
								// if edge doesn't match, do nothing
								if (o.verticalStick.indexOf(requestedStick) === -1) {
									return false;
								}

								// if taskbar is not draggable between edges,
								// take the original stick
								classes[i] = options.verticalStick.replace(/(left|right)/, '');
							} else {
								// if taskbar is draggable between edges,
								// rely on mouse position
								classes[i] = requestedStick;
							}
						}
					}

					// trim what's left
					$.each(classes, function(index) {
						classes[index] = $.trim(classes[index]);
					});

					// filter out anything that isn't stick
					stick = $.grep(classes, function(cl) {
						return $.inArray(cl, ['right', 'left', 'bottom', 'top']) > -1;
					});

					// make the collection unique
					stick = $.unique(stick);

					var edge;

					// noinspection JSUnusedAssignment
					if (orientation === 'horizontal') {
						edge = $.inArray('top', stick) > -1 ? 'top' : 'bottom';
					}

					// noinspection JSUnusedAssignment
					if (orientation === 'vertical') {
						edge = $.inArray('left', stick) > -1 ? 'left' : 'right';
					}

					// noinspection JSUnusedAssignment
					var key = orientation + 'Stick', optionStick = stick.join(' ');

					// jQuery 1.10.2 (and earlier probably) will shuffle
					// elements in $.unique function differently
					// than the later versions,
					// so let's normalize this function result
					optionStick = {
						'left bottom': 'bottom left',
						'right bottom': 'bottom right',
						'left top': 'top left',
						'right top': 'top right'
					}[optionStick] || optionStick;

					// noinspection JSUnusedAssignment
					var noChange = o[key] === optionStick && o.orientation === orientation;

					ui.originalEdge = self._cache.edge;
					ui.edge = edge;

					ui.originalStick = o[key];
					ui.stick = optionStick;

					ui.originalOrientation = o.orientation;
					// noinspection JSUnusedAssignment
					ui.orientation = orientation;

					delete ui.draggable;

					if (self._trigger('beforeDrop', event, $.extend({}, ui)) === false) {
						return false;
					}

					// don't refresh taskbar if stick and orientation
					// stayed the same
					if (!noChange) {
						// for performance reasons, set one option internally,
						// then set the seconde one via the pubic API,
						// this will refresh taskbar position for both options
						o[key] = optionStick;
						// noinspection JSUnusedAssignment
						self.$elem.taskbar('option', 'orientation', orientation);
					}

					self._trigger('drop', event, $.extend({}, ui));
				};

				function extendDroppableUi(event, ui) {
					var $this = $(this);

					ui.originalEdge = self._cache.edge;
					ui.edge = $this.data(self._cnst.dataPrefix + 'droppable-edge');

					var horizontal = ui.edge.match(/top|bottom/), o = self.options;

					ui.originalOrientation = o.orientation;
					ui.orientation = horizontal ? 'horizontal' : 'vertical';

					delete ui.draggable;

					return ui;
				}

				var droppableConfig = {
					accept: function($elem) {
						// we only accept taskbar for which droppables were created
						if ($elem.hasClass(self.classes.taskbar)) {
							return droppableAccept($elem, $(this));
						}

						return false;
					},
					drop: draggableDrop,
					out: function(event, ui) {
						var $this = $(this);

						ui.highlighted = $this.hasClass(self.classes.droppableOver);

						ui = extendDroppableUi.call(this, event, ui);

						self._trigger('beforeDroppableOut', event, $.extend({}, ui));

						$this.css('backgroundColor', '').removeClass(self.classes.droppableOver + ' ' + self.classes.droppablePending);

						$('.' + self.classes.droppablePending).css('backgroundColor', self.$elem.css('backgroundColor')).removeClass(self.classes.droppablePending).addClass(self.classes.droppableOver);

						self._trigger('droppableOut', event, $.extend({}, ui));
					},
					over: function(event, ui) {
						$('.' + self.classes.droppableOver).css('backgroundColor', '').removeClass(self.classes.droppableOver).addClass(self.classes.droppablePending);

						ui = extendDroppableUi.call(this, event, ui);

						if (draggableDrop(event, $.extend({}, ui)) === false) {
							return;
						}

						if (self._trigger('beforeDroppableOver', event, $.extend(true, {}, ui)) === false) {
							return;
						}

						$(this).addClass(self.classes.droppableOver).css('backgroundColor', self.$elem.css('backgroundColor'));

						self._trigger('droppableOver', event, $.extend({}, ui));
					},
					tolerance: 'touch'
				};

				if (!$elem.hasClass(self.classes.uiDroppable)) {
					$elem.droppable(droppableConfig);
				} else {
					$elem.droppable('option', droppableConfig);
				}
			});
		},

		// get translations for current language, or for language
		// passed as parameter, or empty object when no translations exist
		_getDictionary: function(name) {
			var l = this.options.localization;

			return typeof l === 'object' && l !== null ? l [name || this.options.language] || {} : {};
		},

		// main internationalization function;
		// it takes dictionary key as first parameter,
		// and optionally keys-value pair to be inserted into translation
		// as a second parameter,
		// and optionally language to be used instead of current language,
		// as a third parameter
		_i18n: function(translation, keys, language) {
			var primaryLanguage = language === undefined ? this.options.language : language, i18n = this._getDictionary(primaryLanguage);

			if (!i18n[translation]) {
				i18n = this._getDictionary(this.options.fallbackLanguage);

				// generated debug if key was not found,
				// that usually due to missing translations for custom
				// window groups or buttons
				if (!i18n [translation]) {
					this._debugLogAdd('Missing translation key "' + translation + '" in both language "' + primaryLanguage + '" and fallback language "'+ this.options.fallbackLanguage + '".', 1, 1);

					// we can't return undefined here because widget factory
					// will threat this function as setter and return
					// the entire instance taskbar where there's string expected,
					// so let's return string "undefined" instead
					return this._cnst.missingTranslation;
				}
			}

			var translated = i18n [translation];

			translated = this._i18n_replace_keys(translated, keys);

			return translated;
		},

		// main function for replacing key-value pair in a given string
		_i18n_replace_keys: function(translated, keys) {
			if (keys && typeof (keys) === 'object') {
				for (var i in keys) {
					// both ":key" and "key" are a valid keys
					// for string like "Hello :key." to became "Hello world."
					// noinspection JSUnfilteredForInLoop
					translated = translated.replace(i.charAt(0) === ':' ? i : ':' + i, keys[i]);
				}
			}

			return translated;
		},

		// hides custom menus
		_hideInternals: function() {
			this.$elem.find('[data-menu-type=start]').hide();
		},

		// function for hiding some or all datepickers
		_hideDatepickers: function(options) {
			var self = this,
				// hide all datepickers or only the one from the current taskbar
				$elem = options && options.own ? this.$elem : $('.' + this.classes.taskbar),
				$datepickers = $elem.find('.' + this.classes.datepicker);

			// optionally don't hide some datepicker
			if (options && options.not) {
				self._openedElements(true);
				$datepickers = $datepickers.not(options.not);
			}

			$datepickers.each(function() {
				var $datepicker = $(this);

				// retrieve instance of that datepicker
				var taskbarInstance = self._taskbarInstance($datepicker);

				// trigger close event on that datepicker and respect prevention
				if ($datepicker.is(':visible')) {
					if (taskbarInstance._triggerBindedElementEvent({type: 'elementClose', menu: $datepicker, closeByOpen: true, button: taskbarInstance.connectedElement($datepicker)}) === false) {
						return true;
					}
				}

				$datepicker.hide();
			});

			if (!(options && !options.blur)) {
				this._blurAllConnectedButtons();
			}

			this._closeOtherTaskbarsOpenedElements(options);
		},

		// hides all menus, that includes start menus, language select,
		// window groups and custom menus; a menu not to be hidden
		// could be specified in form of jQuery object
		_hideMenus: function(options) {
			var self = this,
				// hide all menus or only the one from the current taskbar
				$elem = options && options.own ? this.$elem : $('.' + this.classes.taskbar),
				$menus = $elem.find('[data-menu-type], .' + this.classes.windowGroupMenu),
				$startButtons = $elem.find('.' + this.classes.startButton);

			if (options && options.not) {
				self._openedElements(true);
				$menus = $menus.not(options.not);
			}

			$menus.each(function() {
				var $menu = $(this);

				// collapse all menus so we won't have situation
				// where opening a menu again will open it with opened submenus
				var $collapse = $menu.add($menu.find(self.classes.uiMenu)).filter('.' + self.classes.uiMenu);

				$collapse.menu('collapseAll').menu('blur');

				// retrieve instance of that menu
				var taskbarInstance = self._taskbarInstance($menu);

				// trigger close event on that menu and respect prevention
				if ($menu.is(':visible')) {
					if (taskbarInstance._triggerBindedElementEvent({type: 'elementClose', menu: $menu, closeByOpen: true, button: taskbarInstance.connectedElement($menu)}) === false) {
						return true;
					}

					$menu.find('ul:visible').addBack().hide();
				}
			});

			$startButtons.removeClass(this.classes.uiStateActive);

			this._blurAllConnectedButtons();

			this._closeOtherTaskbarsOpenedElements(options);
		},

		_hideAll: function(options) {
			this._hideDatepickers();
			this._hideMenus();
			this._hideTooltips();

			if (!options || options.blurWindows !== false) {
				this._blurWindows();
			}

			this._openedElements(false);
			this._closeOtherTaskbarsOpenedElements(options);
		},

		_closeOtherTaskbarsOpenedElements: function(options) {
			var self = this;

			if (!options || !options.own) {
				$('.' + this.classes.taskbar).not(this.$elem).each(function() {
					var $taskbar = $(this);
					var instance = $taskbar.data(self._cnst.dataPrefix + 'taskbar');

					instance._openedElements(false);
				});
			}
		},

		// this function will blur those button that should not be active
		blurConnectedButtons: function() {
			// noinspection JSUnusedLocalSymbols
			var self = this, $elem = $(this);

			var filter = '[data-menu-type], ' + '.' + this.classes.datepicker;

			// go over all menus (and datepicker) connected to taskbar,
			// blur those buttons for which menus (or datepicker) are not visible
			$(filter, this.$elem).each(function() {
				var $this = $(this),
					$button = self.connectedElement($this);

				if ($button.length && !$this.is(':visible')) {
					$button.removeClass(self.classes.uiStateActive);
				}
			});

			// some windows are in windows group,
			// one active window is enough to make the button group active
			var $windows = this.windows();

			var groups = {}, reduced = {}, $reduced = $();

			// shortcut function, return group name or null
			// if window is not in group
			var getGroup = function($elem) {
				return $elem.window('option', 'group');
			};

			// push windows that are in
			// one will keep count on windows in this itteration,
			// the other one in the next one;
			$windows.each(function() {
				var $window = $(this), group = getGroup($window);

				if (group) {
					if (!groups[group]) {
						groups [group] = 0;
						reduced[group] = 0;
					}

					++groups[group];
				} else {
					// other windows remain unaffected
					$reduced = $reduced.add($window);
				}
			});

			$windows.each(function() {
				var $window = $(this), group = getGroup($window);

				// if is it null, this group is resolved
				if (parseInt(reduced [group]) !== reduced[group]) {
					return true;
				}

				// the itteration for this group will continue
				++reduced[group];

				// now we either push a first window that is on top,
				// or last window in set - this will represent the entire group,
				// as we later check if window has self.classes.windowTop
				if ($window.parent().hasClass(self.classes.windowTop) || (groups[group] === reduced[group])) {
					$reduced = $reduced.add($window);
					reduced[group] = null;
				}
			});

			$reduced.each(function() {
				// we only need buttons
				var $window = $(this), $button = self.connectedElement($window).filter('.' + self.classes.uiButton);

				// remove active class on buttons that has
				// no connected window on top
				if ($button.length && !$window.parent().hasClass(self.classes.windowTop)) {
					$button.removeClass(self.classes.uiStateActive);
				}
			});
		},

		// blur buttons on all taskbars
		_blurAllConnectedButtons: function() {
			$('.' + this.classes.taskbar).taskbar('blurConnectedButtons');
		},

		// main function that build taskbar subordinates
		_buildTaskbarContent: function(settings) {
			// noinspection JSUnusedLocalSymbols
			var self = this, o = this.options, c = this.classes, $elem = this.$elem, horizontal = o.orientation === 'horizontal';

			this.$startButtonsContainer = $elem.find('.' + c.startButtonsContainer);
			this.$buttonsContainer = $elem.find('.' + c.buttonsContainer);
			this.$windowButtonsContainer = $elem.find('.' + c.windowButtonsContainer);

			this.$elem.children('[data-separator-for]').not('[data-separator-for=systemButtonsContainer]').remove();

			this.$startButtonsContainer.remove();
			this.$buttonsContainer.children(':not(.' + c.buttonUserDefined + ')').remove();

			// act as a part of "destroy" method - destroy containers
			// and don't create anything
			if (settings && settings.destroy) {
				this.$buttonsContainer.remove();
				this.$windowButtonsContainer.remove();
				this._buildSystemButtons(settings);
				this._buildTaskbarStartButtons(settings);

				return true;
			}

			this._buildSystemButtons($.extend(true, {}, settings, {
				rebuildAll: true
			}));

			this._buildTaskbarStartButtons();

			this.$buttonsContainer = this.$buttonsContainer.length ? this.$buttonsContainer : this._factory('buttonsContainer').appendTo($elem);

			this._rebuildTaskbarButtons({
				skipWindowButtonsContainerResize: true
			});

			if (!this.$windowButtonsContainer.length) {
				this.$windowButtonsContainer = this._factory('windowButtonsContainer').insertAfter(this.$buttonsContainer);
			}

			this._initSortableWindowButtons();

			// find all containers
			this.$containers = this.$elem.find('.' + c.container);

			// empty taskbar will have no padding, and combined with
			// "horizontalWidth": "auto" and no icons, will became visible
			// only when windows are present; note: horizontalWidth: "auto"
			// is not yet implemented and is intended for future versions
			$elem.toggleClass(c.empty, !this.$containers.children().length);

			this._refreshWindowButtonsContainer();
		},

		_setSortableWindowButtons: function() {
			this.options.windowButtonsSortable ? this._initSortableWindowButtons() : this._destroySortableWindowButtons();
		},

		_initSortableWindowButtons: function() {
			var self = this, o = this.options, c = this.classes, horizontal = o.orientation === 'horizontal';

			if (o.windowButtonsSortable) {
				if ($.ui.sortable) {
					var fixSortableContainment = function(event, ui) {
						if (horizontal) {
							return;
						}

						var sortableInstance = self.$windowButtonsContainer.data(c.uiSortable), helperDimensions = self._extendedPosition.call($(ui.helper), 'offset'), containerDimensions = self._extendedPosition.call(self.$windowButtonsContainer, 'offset');

						// interfering on so deep level with widget we don't own
						// will blow up in our face one day, but's it's not
						// that day; fixes a bug where sortable item would go
						// too low on scrollable container with vertical taskbar
						// (overflow:hidden was not an option,
						// because scrollbar had to be visible all the time)
						sortableInstance.containment[3] = containerDimensions.bottom - helperDimensions.height - parseFloat($(ui.item).css('marginBottom'));
					};

					var atStart = {
						offset: {},
						position: {}
					};

					var sortableUi = function(originalUi) {
						var ui = {};

						// elements
						ui.item = originalUi.item;
						ui.helper = originalUi.helper;
						ui.placeholder = originalUi.placeholder;
						ui.sender = null;

						// offset
						ui.offset = $.extend({}, originalUi.offset || $(originalUi.placeholder).offset());
						ui.originalOffset = $.extend({}, atStart.offset);

						// position
						ui.position = $.extend({}, originalUi.position || $(originalUi.placeholder).position());
						ui.originalPosition = $.extend({}, atStart.position);

						return ui;
					};

					// initialize sortable once, that's a heavy plugin
					if (!this.$windowButtonsContainer.hasClass(c.uiSortable)) {
						this.$windowButtonsContainer.sortable({
							disabled: !o.windowButtonsSortable,
							containment: 'parent',
							forcePlaceholderSize: true,
							cursor: 'move',
							tolerance: 'pointer',
							cancel: '.' + c.uiMenu,
							helper: 'clone',
							start: function(event, ui) {
								self._cache.progress.windowButtonsSortable = true;

								$(ui.placeholder).removeClass(c.uiStateActive + ' ' + c.uiStateFocus).addClass(c.uiStateHover);

								self._hideAll();
								self._blurAllConnectedButtons();

								atStart.offset = $(ui.placeholder).offset();
								atStart.position = $(ui.placeholder).position();

								fixSortableContainment(event, ui);

								// fixes tests/functional/taskbarInteractions.html
								// "Window buttons stay in place during sortable"
								if (self._cache.horizontal) {
									var computedWidth = $(ui.item).data(self._cnst.dataPrefix + 'taskbarButtonFloatWidth');

									$(ui.placeholder).css('width', computedWidth);
								}

								self._startShowing({
									duration: false
								});

								self._trigger('sortableStart', event, sortableUi(ui));
							},
							change: function(event, ui) {
								self._trigger('sortableChange', event, sortableUi(ui));
							},
							sort: function(event, ui) {
								self._trigger('sortableSort', event, sortableUi(ui));
							},
							stop: function(event, ui) {
								self._openedElements(false);
								self._cache.progress.windowButtonsSortable = false;

								$(ui.placeholder).removeClass(c.uiStateHover);
								self._trigger('sortableStop', event, sortableUi(ui));
							}
						});
					}

					this.$windowButtonsContainer.sortable('option', {
						scroll: !horizontal,
						axis: horizontal ? o.horizontalRows === 1 ? 'x' : false : 'y'
					});
				} else {
					this._debugLogAdd('jQuery UI Sortable is required for sortable window buttons to work.', 1, 0);
				}
			}
		},

		_destroySortableWindowButtons: function() {
			if (!this.options.windowButtonsSortable && this.$windowButtonsContainer.hasClass(this.classes.uiSortable)) {
				this.$windowButtonsContainer.sortable('destroy');
			}
		},

		// check if the containers are empty
		_filterNonEmptyContainers: function(self, checkPositionAbsolute) {
			var $this = $(this);

			// skip absolute and fixed positioned siblings
			// if checkPositionAbsolute === false
			if (checkPositionAbsolute && $this.css('position').match(/absolute|fixed/)) {
				return false;
			}

			var $children = $this.children(':visible');

			// skip empty containers
			if (!$children.length) {
				return false;
			}

			var nonEmpty = false;

			// noinspection JSUnresolvedFunction
			$children.each(function() {
				var $this = $(this);

				if ($this.hasClass(self.classes.uiButton) || $this.attr('data-menu-type')) {
					nonEmpty = true;

					return false;
				}
			});

			return nonEmpty;
		},

		_buildSystemButtons: function(settings) {
			var self = this, o = this.options;

			this.$systemButtonsContainer = this.$elem.find('.' + this.classes.systemButtonsContainer);

			// remove all buttons except custom buttons
			// - those could have event binded to them and we don't want them gone
			this.$systemButtonsContainer.children(':not(.' + this.classes.buttonUserDefined + ')').remove();

			// stop clock for now
			if (this._cache.intervals.clock > 0) {
				clearInterval(this._cache.intervals.clock);
				this._cache.intervals.clock = 0;
			}

			// remove separator - we could deal with empty container
			this.$systemButtonsContainer.siblings('[data-separator-for=systemButtonsContainer]').remove();

			// act as a part of "destroy" method - destroy container,
			// with user defined buttons this time, and don't create anything
			if (settings && settings.destroy) {
				this.$systemButtonsContainer.remove();

				return true;
			}

			this.$systemButtonsContainer = this.$systemButtonsContainer.length ? this.$systemButtonsContainer : this._factory('systemButtonsContainer').appendTo(this.$elem);

			// go over the list of system buttons and insert those
			// that should be inserted
			$.each(o.systemButtonsOrder, function(index, value) {
				switch (value) {
					case 'languageSelect':
						if (o.languageSelect && $.inArray('languageSelect', o.systemButtonsOrder) > -1) {
							if (o.languages.length) {
								self._buildTaskbarLanguageSelect();
							} else {
								// generate debug is menu would be empty
								self._debugLogAdd('Language select menu wasn\'t build because the "languages" option is empty.', 1, 1);
							}
						}
						break;
					case 'minimizeAll':
						if (o.minimizeAll && $.inArray('minimizeAll', o.systemButtonsOrder) > -1) {
							self._buildTaskbarMinimizeAll();
						}
						break;
					case 'toggleFullscreen':
						// this button will not be present if fullscreen API
						// is not available in user's browser
						if (o.toggleFullscreen && $.inArray('toggleFullscreen', o.systemButtonsOrder) > -1 && self._fullscreenAvailable()) {
							self._buildTaskbarToggleFullscreen();
						}
						break;
					case 'networkMonitor':
						// this button will not be present if online/offline API
						// is not available in user's browser
						if (o.networkMonitor && $.inArray('networkMonitor', o.systemButtonsOrder) > -1 && typeof window.navigator.onLine !== 'undefined') {
							self._buildTaskbarNetworkMonitor();
						}
						break;
					case 'clock':
						if (o.clock && $.inArray('clock', o.systemButtonsOrder) > -1) {
							self._buildTaskbarClock();
						}
						break;
					default:
						// prepend user defined buttons
						if (o.buttons && value in o.buttons) {
							var singleButton = {};
							singleButton[value] = o.buttons [value];

							self._buildTaskbarButtons({
								buttons: singleButton,
								container: self.$systemButtonsContainer
							});
						}
						break;
				}
			});

			// detach user defined buttons present in DOM,
			// but not present in systemButtonsOrder and buttonsOrder
			this._detachUserDefinedButtons.call(this.$systemButtonsContainer, this);

			if (this.$systemButtonsContainer.children().length) {
				var $systemButtonsSeparator = this._setSeparators(this.$systemButtonsContainer);

				$systemButtonsSeparator.addClass(this.classes.systemButtonsSeparator);

				this._fixSystemButtonsSeparator();
			}

			this._setSystemButtonsOrder();
			this._positionSystemButtonConnectedElements();

			if (!settings || !settings.rebuildAll) {
				this._setwindowButtonsContainerSize();
			}
		},

		_setSystemButtonsOrder: function() {
			var self = this;

			// set elements in the right order after refresh
			$.each(this.options.systemButtonsOrder, function(index, value) {
				self.$systemButtonsContainer.find('[data-button-name=' + value + ']').appendTo(self.$systemButtonsContainer);
			});
		},

		_fixSystemButtonsSeparator: function() {
			if (!this._cache.horizontal) {
				this.$elem.find('[data-separator-for=systemButtonsContainer]').css({
					position: 'absolute',
					bottom: this.$systemButtonsContainer.outerHeight()
				});
			}
		},

		_positionSystemButtonConnectedElements: function() {
			// last minute positioning of language select menu
			if (this.options.languageSelect && this.options.languages.length) {
				this._positionTaskbarLanguageSelect();

				if (this.$languageSelectMenu.length) {
					this.$languageSelectMenu.hide();
				}
			}

			// last minute positioning of datepicker
			if (this.options.clock && this.options.clockShowDatepicker && $.ui.datepicker) {
				this._positionTaskbarDatepicker();

				if (this.$datepicker) {
					this.$datepicker.hide();
				}
			}
		},

		_rebuildTaskbarButtons: function(options) {
			var buttons = this.options.buttons;

			this.$elem.find('[data-separator-for=buttonsContainer]').remove();

			if (buttons) {
				this._buildTaskbarButtons({
					buttons: this._extractObjectsByKey(buttons, this.options.buttonsOrder),
					container: this.$buttonsContainer
				});

				// position container after first element has been inserted
				this._positionTopContainersContent.call(this.$buttonsContainer, this);
			}

			// detach user defined buttons present in DOM,
			// but not present in systemButtonsOrder and buttonsOrder
			this._detachUserDefinedButtons.call(this.$buttonsContainer, this);

			if (!options || !options.skipWindowButtonsContainerResize) {
				this._refreshWindowButtonsContainer();
			}

			if (buttons) {
				this._setSeparators(this.$buttonsContainer);
			}
		},

		// users can create buttons, but not put them in buttonsOrder
		// or systeButtonsOrder, so we only detach them to keep events
		_detachUserDefinedButtons: function(self) {
			this.find('.' + self.classes.buttonUserDefined).each(function() {
				var $this = $(this), button = $this.data('button-name');

				if ($.inArray(button, self.options.systemButtonsOrder) === -1 && $.inArray(button, self.options.buttonsOrder) === -1) {
					$this.detach();
				}
			});
		},

		// create separators for containers
		_setSeparators: function($elem) {
			var containerName = $elem.attr('data-container-name'), $separator = this._factory('separator').attr('data-separator-for', containerName);

			$elem.each(function() {
				var $this = $(this);

				$this.siblings('[data-separator-for=' + containerName + ']').remove();

				// set matching float
				$separator.insertAfter($this).css('float', $this.css('float'));

				// no children === no visible separator,
				// as there is no content to separate
				if ($this.children().length === 0) {
					$separator.hide();
				}
			});

			return $separator;
		},

		_refreshSeparators: function() {
			this._setSeparators(this.$buttonsContainer);
			this._setSeparators(this.$systemButtonsContainer);
			this._setSeparators(this.$startButtonsContainer);
			this._fixSystemButtonsSeparator();
		},

		// position menu or datepicker against taskbar or button,
		// the subordinate is connected to
		_menuPosition: function(settings) {
			var self = this;

			settings = settings instanceof $ ? {of: settings} : settings;

			var $taskbar = this.$elem;

			var $of = settings.of;

			if (!settings || !settings.of || !settings.of.length) {
				return;
			}

			var $elem = settings.elem || null,
				horizontal = this.options.orientation === 'horizontal',
				top = this._cache.edge === 'top',
				left = this._cache.edge === 'left',
				$container = $of.closest('.' + this.classes.container),
				// container float when in horizontal mode
				floatValCSS = $container.css('float'),
				floatVal = floatValCSS === 'none' ? 'center' : floatValCSS,
				// container stick when in vertical mode
				posCSS = $container.css('position'),
				edge = posCSS === 'absolute' ? 'bottom' : 'top',
				pos = posCSS === 'absolute' ? 'bottom' : 'center',
				cd = this._extendedPosition.call($container, 'offset'),
				od = this._extendedPosition.call($of, 'offset'),
				td = this._extendedPosition.call($taskbar, 'offset'),
				wc = this._extendedPosition.call(this.$windowsContainment),
				floatMove = '',
				position;

			// nullify a bunch of properteis
			this._copyStyles({
				to: $elem,
				properties: ['maxHeight', 'bottom', 'top', 'left', 'right']
			});

			if ($elem && $elem.hasClass(this.classes.windowGroupMenu)) {
				$elem.removeClass(this.classes.windowGroupMenuScroll).css('maxHeight', '');

				var ed = this._extendedPosition.call($elem, 'offset');

				var diff = (parseFloat($elem.css('paddingTop')) + parseFloat($elem.css('paddingBottom')) + parseFloat($elem.css('borderTopWidth')) + parseFloat($elem.css('borderBottomWidth')));

				var actualHeight = ed.height - diff;
				var maxHeight = wc.height - diff;

				if (actualHeight > maxHeight) {
					$elem.addClass(this.classes.windowGroupMenuScroll);
				}

				$elem.css('maxHeight', maxHeight);
			}

			if (horizontal) {
				// noinspection JSUnusedLocalSymbols
				position = {
					of: $of,
					my: floatVal + floatMove + ' ' + (top ? 'top' : 'bottom'),
					at: floatVal + ' ' + (top ? 'bottom' : 'top'),
					collision: 'flip',
					using: function(position, elems) {
						$(this).css(position);

						var ep = self._extendedPosition.call($(this), 'offset'), t = parseFloat($(this).css('top'));

						$(this).css('top', top ? t + (td.bottom - ep.top) : t - (ep.bottom - td.top));
					}
				};
			} else {
				position = {
					of: $taskbar,
					my: (left ? 'left' : 'right') + floatMove + ' ' + pos + (edge === 'top' ? '+' : '-') + Math.round(Math.abs(cd[edge] - od[edge])),
					at: (left ? 'right' : 'left') + ' ' + pos,
					collision: 'flipfit',
					using: function(position) {
						var $this = $(this);
						$this.css(position);

						if (!$elem) {
							return;
						}

						var ep = self._extendedPosition.call($this, 'offset'), ed = self._extendedPosition.call(self.connectedElement(this).filter('.' + self.classes.uiButton), 'offset');

						var floatTop = parseFloat($this.css('top'));

						if (ed.top < ep.top) {
							$this.css('top', floatTop + (ed.top - ep.top));
						}

						if (ed.bottom > ep.bottom) {
							$this.css('top', floatTop + (ed.bottom - ep.bottom));
						}

						// fixes a bug where on vertical taskbar on right edge
						// menu would have a 1px space between it and tkasbar
						if (!self._cache.horizontal && self._cache.edge === 'right' && $this.is(':visible')) {
							$this.css('left', Math.round(parseFloat($this.css('left')) + td.left - self._extendedPosition.call($this, 'offset').right));
						}
					}
				};
			}

			return position;
		},

		_buildTaskbarStartButtons: function(settings) {
			var self = this,
				$elem = this.$elem,
				// find menus that should be treated as start menus
				$menus = $elem.find('[data-menu-type=start][data-menu-lang=' + this.options.language + ']:not(.' + this.classes.menuHidden + '), [data-menu-type=start][data-menu-lang="\*"]:not(.' + this.classes.menuHidden + ')');

			// destroy menus and return is there should be no menus or destoy
			// is in progress
			if (!this.options.startButtons || (settings && settings.destroy)) {
				this._destroyMenus('[data-menu-type=start]');
				return;
			}

			// destroy menus that should be hidden,
			// they are hidden by CSS, by we also need this
			// because of using jQuery UI menu classes as indicators
			// in other part of the code
			this._destroyMenus('.' + this.classes.menuHidden);

			this.$startButtonsContainer = this._factory('startButtonsContainer');

			this.$buttonsContainer.length ? this.$startButtonsContainer.insertBefore(this.$buttonsContainer) : this.$startButtonsContainer.appendTo($elem);

			var positioned = false;

			// use the natural order of elements to decide order of buttons
			$menus.each(function() {
				var $menu = $(this), name = $menu.attr('data-menu-name') || 'start';

				if (!self._debugMenu()) {
					return true;
				}

				var title = self._i18n('startButton:title');

				// create button
				var $start = self._factory('startButton', {
					name: name
				}).attr('data-title', typeof title !== 'undefined' ? title : name).appendTo(self.$startButtonsContainer);

				// debug for missing translations
				if (title === 'undefined') {
					self._debugLogAdd('Missing translation for start button named "' + name + '" in language "' + self.options.language + '".', 1, 1);
				}

				self._connectElements($start, $menu);

				// position container after first element has been inserted
				if (!positioned) {
					self._positionTopContainersContent.call(self.$startButtonsContainer, self);
					positioned = true;
				}

				var startPosition = self._menuPosition({
					of: $start,
					elem: $menu
				});

				var startFocusSelect = function(event, ui) {
					// noinspection JSCheckFunctionSignatures,JSUnusedLocalSymbols
					var $item = $(ui.item),
						$supmenu = $item.closest('.' + self.classes.uiMenu),
						$submenu = $item.children('.' + self.classes.uiMenu + ':eq(0)'),
						$root = $submenu.parents('.' + self.classes.uiMenu).filter(':last'),
						expand = !self._cache.horizontal && self._cache.stickHorizontal === 'right' ? 'left' : 'right',
						stick = self._cache.horizontal && self._cache.stickVertical === 'bottom' ? 'bottom' : 'top',
						floatMove = 0;

					if (event.type === 'menufocus') {
						self._triggerBindedElementEvent({
							type: 'menuItemFocus',
							item: $item,
							menu: $menu,
							button: $start,
							event: event
						});
					}

					if (event.type === 'menuselect' && !$submenu.length) {
						self._hideMenus();
						self._hideTooltips();
						self._openedElements(false);

						return;
					}

					if ($submenu.length) {
						// this function will take appering submenu and position it
						// accordingly, either as high or as low as it could go
						// without breaking usability
						var fixSubmenuPosition = function() {
							// shortcut function
							var end = function($elem) {
									return $elem.offset().top + $elem.outerHeight();
								},

								// shortcut function
								start = function($elem) {
									return $elem.offset().top;
								},

								// those elements will matter when it comes to positioning
								$subLast = $submenu.children('.' + self.classes.uiMenuItem + ':last'),
								$subFirst = $submenu.children('.' + self.classes.uiMenuItem + ':eq(0)'),

								supd = self._extendedPosition.call($supmenu, 'offset'),
								subd = self._extendedPosition.call($submenu, 'offset'),

								pullHorizontal = (subd.left - supd.right) * -1,

								// that's likely to be 1 in most of the themes
								correction = parseFloat(self._styleIndicator('.' + self.classes.uiMenu + ' > .' + self.classes.uiMenuItem + ' > a.' + self.classes.uiStateActive, 'marginTop').marginTop) * -1,

								submenuPosition = {
									of: $supmenu,
									at: 'right bottom'
								},

								pullVertical,
								overflow;

							$submenu.removeAttr('data-fix-menu-position');

							if (stick === 'bottom') {
								// the diffrence between root element
								// and the supmenu, so the element being positioned
								// can go all the way down
								pullVertical = end($root) - end($supmenu);

								submenuPosition.my = 'left-' + Math.round(pullHorizontal) + ' bottom+' + Math.round(pullVertical);
							}

							// we don't want double borders on menus next
							// to each other, so take one of the border
							// into account; it's also useful sor last minute
							// correction on horizontal taskbar; edge case:
							// supmenu and submenu could have different border
							// widths - which one should be taken into account then?
							var pullLeftBorder = parseFloat(
								window.getComputedStyle($supmenu[0]).borderRightWidth
							);

							if (stick === 'top') {
								// when expanding to the left, submenu
								// has to be moved left by the width of supmenu
								if (expand === 'left') {
									pullHorizontal = $supmenu.outerWidth() - parseFloat($supmenu.css('paddingRight')) - pullLeftBorder;
								}

								// the diffrence between root element
								// and the supmenu, so the element being positioned
								// can go all the way up
								pullVertical = start($root) - start($supmenu);

								submenuPosition.at = 'right top';
								submenuPosition.my = (expand === 'left' ? 'right' : 'left') + '-' + Math.round(pullHorizontal) + ' top+' + pullVertical;
							}

							// set the initial position, either top or bottom
							// of the root menu element
							$submenu.position(submenuPosition);

							if (stick === 'bottom') {
								overflow = start($item) - start($subFirst);

								// if positioning submenu at the bottom of root menu
								// element was too low, lift it up, so the first
								// element of submenu if at the same offset as
								// the element submenu is containted in
								if (overflow < 0) {
									submenuPosition.my = 'left-' + Math.round(pullHorizontal) + ' bottom+' + Math.round(pullVertical + correction + overflow);
								}
							}

							if (stick === 'top') {
								overflow = start($item) - start($subLast);

								// if positioning submenu at the top of root menu
								// element was to high, move it down, so the last
								// element of submenu if at the same offset as
								// the element submenu is containted in
								if (overflow > 0) {
									submenuPosition.my = (expand === 'left' ? 'right' : 'left') + '-' + Math.round(pullHorizontal) + ' top+' + Math.round(pullVertical + correction + overflow);
								}
							}

							// set the fixed position, or make no changes
							// when there were no need for fix
							$submenu.position(submenuPosition);

							// do some last minute correction on horizontal taskbars
							if (self.options.orientation === 'horizontal') {
								var supdAfter = self._extendedPosition.call($supmenu, 'offset'),
									subdAfter = self._extendedPosition.call($submenu, 'offset'),
									lastMinuteCorrection = Math.round(supdAfter.right - subdAfter.left - pullLeftBorder),
									lastMinuteCorrectionSupmenu = parseFloat($supmenu.attr('data-fix-menu-position')),
									// either take parent's correction
									// or use what's calculated
									realCorrection = lastMinuteCorrectionSupmenu || lastMinuteCorrection;

								if (realCorrection > 0) {
									var lastMinutLeft = parseFloat($submenu.css('left'));

									$submenu.css('left', Math.round(lastMinutLeft + realCorrection)).attr('data-fix-menu-position', lastMinuteCorrectionSupmenu || lastMinuteCorrection);
								}
							}

							// disconnect now, positioning is done and as as long
							// as menu is not hidden again no additional fixes
							// are needed; this also disconnects any observers
							// created for submenus that has never been shown
							self._disconnectObservers('submenus');
						};

						var MutationObserver = self._MutationObserver();

						// if MutationObserver is present, we'll use it to make
						// the positioning smooth and inconspicuous for the user
						if (MutationObserver) {
							// noinspection JSUnresolvedFunction
							$submenu.each(function() {
								// disconnects observers from previous menus
								self._disconnectObservers('submenus');

								var $this = $(this);

								// noinspection JSValidateTypes
								var observer = new MutationObserver(function() {
									// checks if css top and left has been set already
									var ready = $this.css('display') === 'block' && $this[0].style.cssText.match(/^(?=.*\btop\b)(?=.*\bleft).*$/);

									if (ready) {
										fixSubmenuPosition();
									}

									if ($supmenu.css('display') === 'none' || $root.css('display') === 'none') {
										self._disconnectObservers('submenus');
									}
								});

								observer.observe(this, {
									// for performance reasons, we observe
									// only the style attribute
									attributes: true,
									attributeFilter: ['style']
								});

								self._cache.mutationObservers.submenus.push(observer);
							});
						} else {
							// a nonideal fallback used when MutationObserver
							// is not available (IE9/IE10)
							setTimeout(fixSubmenuPosition, $.ui.menu.prototype.delay);
						}
					}
				};

				$menu.show().menu({
					focus: startFocusSelect,
					select: startFocusSelect,
					blur: function(event, ui) {
						self._triggerBindedElementEvent({
							type: 'menuItemBlur',
							item: $(ui.item),
							menu: $menu,
							button: $start,
							event: event
						});
					}
				}).position(startPosition).hide();

				// noinspection JSUnusedLocalSymbols
				$start.on('click.' + self._cache.uep, function(event) {
					self._hideMenus({
						not: $menu
					});

					self._hideTooltips();

					self._stopOtherTaskbarsAutoOpenOnBrowse();

					var visible = $menu.is(':visible');

					// trigger event and respect prevention
					if (self._triggerBindedElementEvent({type: visible ? 'elementClose' : 'elementOpen', menu: $menu, button: $start}) === false) {
						return;
					}

					$(this).addClass(self.classes.uiStateActive);

					$menu.toggle();

					if (!visible) {
						self._openedElements(true);
						// last minute cleanup after previous time
						// when menu was shown
						$menu.find('.' + self.classes.uiStateActive).removeClass(self.classes.uiStateActive);
					} else {
						self._openedElements(false);
					}
				});

				self._bindMenuAutoOpen($start, $menu);

				$start.on('mouseup.' + self._cache.uep + ' mouseleave.' + self._cache.uep, function() {
					self._setConnectedButtonState.apply(this, [self]);
				});
			});

			if ($menus.length) {
				this._setSeparators(this.$startButtonsContainer);
			}
		},

		_rebuildTaskbarStartButtons: function() {
			this.$startButtonsContainer.remove();
			this._buildTaskbarStartButtons();
			this._refreshWindowButtonsContainer();
		},

		_buildTaskbarButtons: function(options) {
			var self = this;

			$.each(options.buttons, function(index, value) {
				// if value.labelLocalized is specified and the translation
				// is present, it will be set to value.label and original label
				// will no longer be accessible
				// noinspection JSUnresolvedVariable
				if (typeof (value.labelLocalized) === 'string') {
					// noinspection JSUnresolvedVariable
					value.label = self._i18n(value.labelLocalized) || value.label;
				}

				// on case no localizedLabel and no label are specified,
				// use the internal index as label
				if (!value.label) {
					// throw a warning, this should not be happening
					self._debugLogAdd('No label or labelLocalized providen for button "' + index + '".', 2, 1);
					value.label = index;
				}

				// if button is not created yet, create it now
				if (!options.buttons[index].$element || !options.buttons[index].$element.length) {
					options.buttons[index].$element = $('<div></div>').appendTo(options.container);
					// button could be already created, but has been moved outside
					// of visible containers due to buttonsOrder or systemButtonsOrder
					// options - if that's the case, move it back from detach
				} else if (options.buttons[index].$element && options.buttons[index].$element.length) {
					options.buttons[index].$element.appendTo(options.container);

					return true;
				}

				options.buttons[index].$element.button(value).attr('data-button-name', index).attr('title', value.label).addClass(self.classes.buttonUserDefined);
			});
		},

		// creates language select and language select menu
		_buildTaskbarLanguageSelect: function() {
			var self = this;

			if (!this._debugMenu()) {
				return;
			}

			this.$languageSelect = this._factory('languageSelect').appendTo(this.$systemButtonsContainer).text(this._i18n('slug')).attr('title', this._i18n('languageSelect')).attr('data-button-name', 'languageSelect').button();

			this._refreshButtonIcon.call(this.$languageSelect, this);

			this._afterSystemButtonCreate();

			this.$languageSelectMenu = this._factory('languageSelectMenu');

			$.each(this.options.languages, function(index, value) {
				// don't insert languages that aren't supported
				if (!self._translationsExists(value)) {
					return true;
				}

				self.$languageSelectMenu.append($('<li></li>').attr('data-language-code', value).append($('<a></a>').attr('href', '#').text(self._i18n('name', null, value))).on('click.' + self._cache.uep, function(event) {
						event.preventDefault();

						// change language via public API
						self.$elem.taskbar('option', 'language', $(this).attr('data-language-code'));
						self._openedElements(false);
					})
				);
			});

			this.$languageSelectMenu.appendTo(this.$systemButtonsContainer).show().menu({
				focus: function(event, ui) {
					self._triggerBindedElementEvent({
						type: 'menuItemFocus',
						item: $(ui.item),
						menu: self.$languageSelectMenu,
						button: self.$languageSelect,
						event: event
					});
				},
				blur: function(event, ui) {
					self._triggerBindedElementEvent({
						type: 'menuItemBlur',
						item: $(ui.item),
						menu: self.$languageSelectMenu,
						button: self.$languageSelect,
						event: event
					});
				}
			});

			this.$languageSelect.on('click.' + this._cache.uep, function() {
				self._hideMenus({
					not: self.$languageSelectMenu
				});
				self._hideDatepickers();

				self._hideTooltips();

				var visible = self.$languageSelectMenu.is(':visible');

				// trigger event and respect prevention
				if (self._triggerBindedElementEvent({type: visible ? 'elementClose' : 'elementOpen', menu: self.$languageSelectMenu, button: self.$languageSelect}) === false) {
					return;
				}

				self.$languageSelectMenu.toggle();

				if (!visible) {
					self._positionTaskbarLanguageSelect();
					self._openedElements(true);
				} else {
					self._openedElements(false);
				}
			});

			this._bindMenuAutoOpen(this.$languageSelect, this.$languageSelectMenu);

			this._connectElements(this.$languageSelect, this.$languageSelectMenu);

			this.$languageSelect.on('mouseup.' + this._cache.uep + ' mouseleave.' + this._cache.uep, function() {
				self._setConnectedButtonState.apply(this, [self]);
			});
		},

		// shortcut for settings position the the language select menu
		_positionTaskbarLanguageSelect: function() {
			if (!this.$languageSelect.length || !this.$languageSelectMenu.length) {
				return;
			}

			this.$languageSelectMenu.position(this._menuPosition({
				of: this.$languageSelect,
				elem: this.$languageSelectMenu
			}));
		},

		// check if dictionary for given language exists,
		// then generate debug message if it doesn't
		_translationsExists: function(langCode) {
			if (!(langCode in this.options.localization)) {
				this._debugLogAdd('Value "' + langCode + '" present in \languages\ option, but not present in "localization".', 1, 1);

				return false;
			}

			return true;
		},

		// propagate language change to subordinates and windows
		_languageChange: function() {
			var self = this;

			$.each(this._cache.windowButtons, function(index, elem) {
				if (elem === undefined) {
					return true;
				}

				if (elem.substr(0, 6) === 'group:') {
					var $group = self.$elem.find('.' + self.classes.windowButton + '[data-group-name=' + elem.substr(6) + ']');
					self._groupSetTranslatedTitle.call($group, self);
				}
			});

			// refresh windows translations
			// noinspection JSUnusedLocalSymbols
			$.each(this._cache.windows, function(index, $elem) {
				var instance = $(this).data(self._cnst.dataPrefix + 'window');

				instance._languageChange();
			});
		},

		// function that performs minimize all action
		_minimizeAll: function() {
			// noinspection JSUnusedLocalSymbols
			var self = this, $windows = $('.' + this.classes.windowContent), windowsLength = $windows.length;

			// windows will act somewhat different when minimize all is in progress
			this.$windowsContainment.data(this._cnst.dataPrefix + 'minimizeAllInProgress', true);

			// minimize all windows, not just those of current taskbar
			// noinspection JSUnusedLocalSymbols
			$windows.each(function(index) {
				var $window = $(this);

				// only minimize non-minimized and minimizable windows
				if (!$window.window('minimized') && $window.window('option', 'minimizable')) {
					var minimize = $window.window('option', 'durations.minimize');

					$window.window('option', 'durations.minimize', false).window('minimize').window('option', 'durations.minimize', minimize);
				}

				var instance = $window.data(self._cnst.dataPrefix + 'window');
				instance._setConnectedButtonState();
			});

			self.$windowsContainment.data(self._cnst.dataPrefix + 'minimizeAllInProgress', false);
		},

		// build button for minimize all
		_buildTaskbarMinimizeAll: function() {
			var self = this;

			this.$minimizeAll = this._factory('minimizeAll').appendTo(this.$systemButtonsContainer).text(this._i18n('minimizeAll')).attr('data-button-name', 'minimizeAll').button({
				text: false
			}).on('click.' + this._cache.uep, function() {
				self._minimizeAll();
			});

			this._setMinimizeAllHoverOpaqueWindows();

			this._refreshButtonIcon.call(this.$minimizeAll, this);

			this._afterSystemButtonCreate();
		},

		// sets opacity to windows where user hovers over minimize all button,
		// opacity is animated via CSS transitions, the animation
		// would be pretty bad if it would be done via JS on like 30 windows
		_setMinimizeAllHoverOpaqueWindows: function() {
			var self = this;
			// just to be safe, remove classes that could be left last time
			$('.' + this.classes.window).removeClass(this.classes.windowMinimizeAllHover + ' ' + this.classes.windowMinimizeAllUnhover);

			// clear events bound last time
			this.$minimizeAll.off('mouseenter.' + this._cache.uep + ' mouseleave.' + this._cache.uep);

			if (this.options.minimizeAllHoverOpaqueWindows) {
				this.$minimizeAll.on('mouseenter.' + this._cache.uep + ' mouseleave.' + this._cache.uep, function(e) {
					// noinspection JSJQueryEfficiency
					$('.' + self.classes.window).removeClass(self.classes.windowMinimizeAllHover + ' ' + self.classes.windowMinimizeAllUnhover);

					// add class to all windows
					if (e.type === 'mouseenter') {
						$('.' + self.classes.window).not('.' + self.classes.windowUnminimizable).addClass(self.classes.windowMinimizeAllHover).removeClass(self.classes.windowMinimizeAllUnhover);

						// clear revert, we don't want classes disappearing
						clearTimeout(self._cache.timeouts.minimizeAllHoverOpaqueWindowsRevert);
					} else {
						$('.' + self.classes.window).addClass(self.classes.windowMinimizeAllUnhover).removeClass(self.classes.windowMinimizeAllHover);

						// try to find transition duration of unhover class
						var styles = self._styleIndicator(self.classes.windowMinimizeAllUnhover, ['transitionDuration', 'mozTransitionDuration', 'webkitTransitionDuration', 'oTransitionDuration']);

						// let's make this assumption if nothing better comes up
						var delay = 1;

						$.each(styles, function(index, value) {
							if (value) {
								// multiply by 2; this class doesn't need
								// to be removed immediately, and this way we're
								// sure the CSS animation will end smoothly
								delay = parseFloat(value) * 2;
								return false;
							}
						});

						// turn CSS seconds into JS milliseconds
						delay *= 1000;

						// set timeouted revert
						self._cache.timeouts.minimizeAllHoverOpaqueWindowsRevert = setTimeout(function() {
							$('.' + self.classes.window).removeClass(self.classes.windowMinimizeAllUnhover);
						}, delay);
					}
				});
			} else {
				clearTimeout(self._cache.timeouts.minimizeAllHoverOpaqueWindowsRevert);
			}
		},

		// build toggle fullscreen button
		_buildTaskbarToggleFullscreen: function() {
			var self = this;

			this.$toggleFullscreen = this._factory('toggleFullscreen').appendTo(this.$systemButtonsContainer).attr('data-button-name', 'toggleFullscreen').button({text: false}).on('click.' + this._cache.uep, function(e) {
				var ui = {};

				var enabled = self._fullscreenEnabled();

				// save previous state
				ui.fullscreenEnabled = enabled;

				if (self._trigger('beforeRequestFullscreen', e, ui) === false) {
					return;
				}

				ui = {};

				// leave fullscreen when in fullscreen,
				// enter fullscreen when not in fullscreen
				enabled ? self._fullscreenLeave() : self._fullscreenEnter();
				self._setFullscreenToggleState();

				// add current state
				ui.fullscreenEnabledBefore = enabled;
				ui.fullscreenEnabled = self._fullscreenEnabled();

				self._trigger('requestFullscreen', e, ui);
			});

			this._setFullscreenToggleState();
			this._afterSystemButtonCreate();
		},

		// sets label for toggle fullscreen, based on whether
		// browser is in fullscreen mode or not
		_setFullscreenToggleState: function() {
			this.$toggleFullscreen.button('option', 'label', this._i18n(this._fullscreenEnabled() ? 'toggleFullscreenLeave' : 'toggleFullscreenEnter'));
			this._refreshButtonIcon.call(this.$toggleFullscreen, this);
		},

		// build network monitor button
		_buildTaskbarNetworkMonitor: function() {
			this.$networkMonitor = this._factory('networkMonitor').appendTo(this.$systemButtonsContainer);

			this.$networkMonitor.attr('data-button-name', 'networkMonitor').button({
				text: false
			});

			this._disableButton.call(this.$networkMonitor, this);

			this._setNetworkMonitorStatus();

			this._afterSystemButtonCreate();
		},

		// get dictionary key, based on network status
		_getNetworkMonitorKey: function() {
			var online = !!window.navigator.onLine;

			return 'networkMonitor' + (online ? 'Online' : 'Offline');
		},

		_setNetworkMonitorStatus: function() {
			if (!this.$networkMonitor.length) {
				return;
			}

			this.$networkMonitor.button('option', 'label', this._i18n(this._getNetworkMonitorKey()));

			this._refreshButtonIcon.call(this.$networkMonitor, this);
		},

		// build clock
		_buildTaskbarClock: function() {
			var self = this;

			this.$clock = this._factory('clock').appendTo(this.$systemButtonsContainer).attr('data-button-name', 'clock').button();

			this._refreshButtonIcon.call(this.$clock, this);

			this._afterSystemButtonCreate();

			this._setClockWidth();

			// update clock every 1s - initial update if made
			// by _setClockWidth()
			this._cache.intervals.clock = setInterval(function() {
				self._clockUpdate();
			}, 1000);

			this._buildTaskbarClockDatepicker();
		},

		// build clock datepicker
		_buildTaskbarClockDatepicker: function() {
			var self = this;

			var setHeaderTaskbarUuid = function() {
				self.$datepicker.find('.' + self.classes.uiDatepickerHeader).attr('data-taskbar-uuid', self.uuid);
			};

			// debug for when there's missing jQuery components:
			// datepicker or it's translations
			if (this.options.clock && this.options.clockShowDatepicker && (!$.ui.datepicker || !$.datepicker)) {
				this._debugLogAdd('jQuery UI Datepicker is required for clock datepicker to work.', 1, 0);
			}

			if (this.options.clock && this.options.clockShowDatepicker && $.ui.datepicker && $.datepicker) {
				var datepickerLang = this._i18n('code');

				// remove previous datepicker
				if (this.$datepicker && this.$datepicker.length) {
					this.$datepicker.remove();
				}

				// pickup translations
				var datepickerTranslations = $.datepicker && this._isRealObject($.datepicker.regional) ? $.datepicker.regional[datepickerLang === 'en' ? '' : datepickerLang] || {} : {};

				this.$datepicker = this._factory('datepicker').prependTo(this.$systemButtonsContainer).uniqueId().datepicker(datepickerTranslations).hide();

				// refresh taskbar uuid - we'll need that in window click handler,
				// when datepicker header is already detached by the time
				// it's fired, so some other means of determining that clicked
				// datapicker was of current taskbar is required
				this.$datepicker.datepicker('option', 'onChangeMonthYear', setHeaderTaskbarUuid);

				this.$clock.off('click.' + this._cache.uep).on('click.' + this._cache.uep, function() {
					self._hideMenus();
					self._hideTooltips();
					self._hideDatepickers({
						not: self.$datepicker
					});
					self._stopOtherTaskbarsAutoOpenOnBrowse();

					var visible = self.$datepicker.is(':visible');

					// trigger event end respect prevention
					if (self._triggerBindedElementEvent({type: visible ? 'elementClose' : 'elementOpen', menu: self.$datepicker, button: self.$clock}) === false) {
						return;
					}

					self.$datepicker.toggle();

					if (!visible) {
						setHeaderTaskbarUuid();
						self._positionTaskbarDatepicker();
						self._openedElements(true);
					} else {
						self._openedElements(false);
					}
				});

				this._bindMenuAutoOpen(this.$clock, this.$datepicker);
				this._connectElements(this.$clock, this.$datepicker);

				this.$clock.off('mouseup.' + this._cache.uep + ' mouseleave.' + this._cache.uep).on('mouseup.' + this._cache.uep + ' mouseleave.' + this._cache.uep, function() {
					self._setConnectedButtonState.apply(this, [self]);
				});
			} else if (this.$clock && this.$clock.length) {
				this._disableButton.call(this.$clock, this);
			}
		},

		_setClockWidth: function() {
			if (!this.$clock.length) {
				return;
			}

			var fakeTime = this._getFormattedTime({
				hour: 11,
				minute: 11,
				second: 11,
				millisec: 111,
				timezone: 0
			});

			var prevWidth = this.$clock.outerWidth();

			this.$clock.css('width', 'auto');

			this.$clock.button('option', 'label', fakeTime);

			// set clock width explicitly to the highest width possible,
			// for the current time format, because clock
			// shouldn't change it's container size when time passes;
			// that would be a big problem for when people use
			// time formats without leading zeros, like H:m:s
			this.$clock.css('width', this.$clock.css('width'));

			// if the container is not present, it's content will be refreshed after creation, so don't bother
			if (prevWidth !== this.$clock.outerWidth() && this.$windowButtonsContainer.length) {
				this._refreshWindowButtonsContainer();
			}

			this._clockUpdate();
		},

		_disableButton: function(self) {
			// don't want the visuals, just the behaviour
			// sets default cursor instead of text
			this.button('option', 'disabled', true).removeClass(self.classes.uiStateDisabled).addClass(self.classes.buttonDisabled).on('click.' + self._cache.uep, function() {
				self._hideAll();
			});
		},

		// shortcut for positioning datepicker
		_positionTaskbarDatepicker: function() {
			var self = this;

			this._datepickerSetPosition();

			this.$datepicker.off('click.' + this._cache.uep).on('click.' + this._cache.uep, function() {
				self._datepickerSetPosition();
			});
		},

		// when taskbar is horizontal and sticks to top edge,
		// $buttonsContainer, $systemButtonsContainer and $startButtonsContainer
		// buttons has to go to the bottom edge of the taskbar
		_positionTopContainersContent: function(self) {
			var $this = $(this);
			$this.css('marginTop', '');

			if (self._cache.horizontal && self._cache.edge === 'top' && self.options.horizontalRows > 1) {
				$this.each(function() {
					// noinspection JSUnusedLocalSymbols
					var $this = $(this),
						taskbarHeight = self.$elem.outerHeight(),
						height = $this.outerHeight(),
						paddings = parseFloat($this.css('paddingTop')) + parseFloat($this.css('paddingBottom')),
						borders = parseFloat(self.$elem.css('borderTopWidth')) + parseFloat(self.$elem.css('borderBottomWidth')),
						// taskbar height minus taskbar borders and elem padding
						// it's what we need
						val = taskbarHeight - height - borders;

					$this.css('marginTop', val);
				});
			}
		},

		// apply jQuery UI Tooltip if "buttonTooltips" is set to true
		_setButtonsTooltips: function() {
			if (this.options.buttonsTooltips && !$.ui.tooltip) {
				this._debugLogAdd('jQuery UI Tooltip is required for buttons tooltips to work.', 1, 0);
			}

			if (!$.ui.tooltip) {
				return;
			}

			var self = this,
				positions = {
					top: {
						my: 'right top+2',
						at: 'right bottom',
						collision: 'flipfip'
					},
					bottom: {
						my: 'right bottom-2',
						at: 'right top',
						collision: 'flipfip'
					},
					left: {
						my: 'left bottom-2',
						at: 'left top',
						collision: 'flipfip'
					},
					right: {
						my: 'right bottom-2',
						at: 'right top',
						collision: 'flipfip'
					}
				};

			var $elems = this.$elem.find('.' + this.classes.systemButtonsContainer + ' > .' + this.classes.uiButton).add(this.$elem.find('.' + this.classes.windowButtonsContainer + ' > .' + this.classes.uiButton)).add(this.$elem.find('.' + this.classes.buttonsContainer +' > .' + this.classes.uiButton)).add(this.$elem.find('.' + this.classes.startButtonsContainer +' > .' + this.classes.uiButton));

			if (!this.options.buttonsTooltips) {
				$elems.each(function() {
					var $this = $(this);

					var widget = self._getTooltipInstance.call($this);

					if (widget) {
						try {
							$this.tooltip('destroy');
						} catch (e) {}
					}
				});

				return;
			}

			var horizontal = this.options.orientation === 'horizontal';

			$elems.each(function() {
				var $this = $(this);

				var widget = self._getTooltipInstance.call($this);

				// no tooltip on an element
				if (widget) {
					return true;
				}

				var position = $.extend({}, positions[self._cache.edge]);

				var $parents = $this.parents();

				var parentIsInitialContainer = $parents.is(self.$startButtonsContainer) || $parents.is(self.$buttonsContainer);

				// move tooltips to the center or left for containers
				// that are on the center or left
				if (self._cache.edge.match(/top|bottom/)) {
					var horizontalLeftToRight = horizontal && parentIsInitialContainer;

					if (horizontalLeftToRight) {
						position.my = position.my.replace('right', 'left');
						position.at = position.at.replace('right', 'left');
					}

					if (horizontal && $parents.is(self.$windowButtonsContainer)) {
						position.my = position.my.replace('right', 'center');
						position.at = position.at.replace('right', 'center');
					}
				}

				if (self._cache.edge.match(/left|right/)) {
					var verticalTopToBottom = !horizontal && parentIsInitialContainer;

					if (verticalTopToBottom) {
						position.my = position.my.replace('bottom', 'top');
						position.at = position.at.replace('top', 'bottom');
					}
				}

				$this.tooltip({
					position: position,
					tooltipClass: self.classes.buttonTooltip,
					show: self.options.durations.buttonsTooltipsShow,
					hide: self.options.durations.buttonsTooltipsHide,
					open: function(event, ui) {
						var $tooltip = $(ui.tooltip);
						var $target = $(event.target);
						// noinspection JSUnusedLocalSymbols
						var tooltipId = $tooltip[0].id;
						// noinspection JSUnusedLocalSymbols
						var targetId = $target[0].id;

						// hide other tooltips
						self._hideTooltips({
							not: $target
						});

						$tooltip.on('mouseenter.' + self._cache.uep, function() {
							self._hideTooltips();
							self._hideToolTipNoAnimation.call($target, self, $tooltip);
						});

						var $connected = self.connectedElement($this).filter('.' + self.classes.uiHasDatepicker).add(
							self.connectedElement($this).filter('.' + self.classes.uiMenu)
						);

						// some buttons with tooltips don't have connected elements
						if ($connected.length && $connected.is(':visible')) {
							self._hideTooltips();
						}
					}
				});
			});
		},

		_hideTooltips: function(options) {
			if (!$.ui.tooltip) {
				return;
			}

			var self = this;

			// hide all tooltips of elements of current taskbar
			// that have tooltips opened
			var $tooltipsHaving = $('.' + this.classes.taskbar).find('[aria-describedby^="' + this.classes.uiTooltip + '"]').not(options && options.not ? options.not : null);

			$tooltipsHaving.each(function() {
				var $this = $(this);

				var widget = self._getTooltipInstance.call($this);

				if (widget) {
					self._hideToolTipNoAnimation.call($this, self);
				}
			});
		},

		// hide tooltips immediately, for example in cases
		// where cursor if over tooltip and tooltip is blocking
		// window menu group
		_hideToolTipNoAnimation: function(self, $tooltip) {
			if (!$tooltip) {
				var describedBy = this.attr('aria-describedby');
				// noinspection JSUnusedAssignment
				$tooltip = $('#' + describedBy);
			}

			var cachedHide = this.tooltip('option', 'hide');
			this.tooltip('option', 'hide', false);
			this.tooltip('close');
			$('div.' + self.classes.uiTooltip).stop(true, true).hide();
			this.tooltip('option', 'hide', cachedHide);
		},

		_getTooltipInstance: function() {
			var widget = null;

			try {
				widget = this.tooltip('widget');
			} catch (e) {}

			return widget;
		},

		_afterSystemButtonCreate: function() {
			// position container
			this._positionTopContainersContent.call(this.$systemButtonsContainer, this);
		},

		// helper to determine if element inside of taskbar is native subordinate
		_isNativeElement: function($elem) {
			return $elem.hasClass(this.classes.separator) || $elem.hasClass(this.classes.container);
		},

		_refreshWindowButtonsContainer: function() {
			this._setwindowButtonsContainerSize();
			this._setWindowButtonsSizes();
		},

		_setwindowButtonsContainerSize: function() {
			// reset width and height first,
			// so they have no impact on neighbouring elements
			this.$windowButtonsContainer.css({
				width: 0,
				height: 0
			});

			if (this._cache.horizontal) {
				this.$windowButtonsContainer.scrollTop(0);
			}

			var self = this,
				horizontal = this.options.orientation === 'horizontal',
				$wins = this.$windowButtonsContainer,
				computed = window.getComputedStyle($wins[0]),
				// find prev element, visually, co don't count in non-natives,
				// empty containers, unvisible elements (e.g. separators
				// for empty containers), floats: right, and positions: absolute
				$prev = this.$windowButtonsContainer.prevAll(':not(:empty):visible:eq(0)').filter(function() {
					var $this = $(this);

					if (!self._isNativeElement($this)) {
						return false;
					}

					if ($this.css('float') === 'right' && self._cache.horizontal) {
						return false;
					}

					// noinspection RedundantIfStatementJS
					if ($this.css('position') === 'absolute' && !self._cache.horizontal) {
						return false;
					}

					return true;
				}),
				$next,
				farRight,
				farLeft,
				paddingsHorizontal,
				farBottom,
				farTop,
				paddingsVertical;

			if (horizontal) {
				// remove classes used only for vertical taskbar
				$wins.removeClass(this.classes.windowButtonsContainerFirstChild + ' ' + this.classes.windowButtonsContainerOnlyChild);

				// find next element - it has to have float: right
				$next = $wins.siblings().filter(function() {
					var $this = $(this);

					if (!self._isNativeElement($this)) {
						return false;
					}

					if ($this.css('float') === 'right') {
						return true;
					}
				});

				// noinspection JSCheckFunctionSignatures
				$next = $next.filter(':not(:empty):eq(0)');

				// calculate far right position, far left position,
				// and horizontal padding
				farRight = $next.length ? $next.position().left : this.$elem.outerWidth() - $wins.position().left;
				farLeft = $prev.length ? $prev.position().left + $prev.outerWidth() : parseInt(this.$elem.css('left'), 10) || 0;
				paddingsHorizontal = parseFloat(this._styleIndicator('$.' + this.classes.windowButtonsContainer + ' > div.' + this.classes.windowButton, 'paddingLeft').paddingLeft);
			} else {
				// find all previous containers that aren't empty
				var $winsPrevAll = $wins.siblings().filter(function() {
					return self._filterNonEmptyContainers.call($(this), self, true);
				});
				// find all next containers that aren't empty
				var $winsNextAll = $wins.siblings().filter(function() {
					return self._filterNonEmptyContainers.call($(this), self);
				});

				// is this is first child looking from the top
				this.$windowButtonsContainer.toggleClass(this.classes.windowButtonsContainerFirstChild, !$winsPrevAll.length);

				// is this the only nonempty container
				this.$windowButtonsContainer.toggleClass(this.classes.windowButtonsContainerOnlyChild, !$winsNextAll.length && !$winsPrevAll.length);

				// get separator height, usually 1px
				// noinspection JSCheckFunctionSignatures
				var separatorFixHeight = this.$systemButtonsContainer.children('.' + this.classes.uiButton).filter(':visible').length ? parseInt($('[data-separator-for=systemButtonsContainer]').css('borderTopWidth'), 10) || 0 : 0;

				// find next element looking from the top
				$next = this.$elem.find('.' + this.classes.systemButtonsSeparator).filter(':visible');

				// calculate far bottom position, far top position,
				// and vertical padding
				farBottom = $next.length ? this._extendedPosition.call($next, 'offset').top : this.$elem.outerHeight() - $wins.position().top;
				farTop = $prev.length ? this._extendedPosition.call($prev, 'offset').bottom : this._extendedPosition.call(this.$elem, 'offset').top;
				paddingsVertical = $wins.hasClass(this.classes.windowButtonsContainerOnlyChild) ? 0 : parseFloat(this._styleIndicator('$.' + this.classes.windowButtonsContainer + ' > div.' + this.classes.windowButton, 'paddingTop').paddingTop) * 2 - separatorFixHeight;
			}

			// calculate height and width
			var windowButtonsWidth = !this._cache.horizontal ? '' : farRight - farLeft - paddingsHorizontal * 2;
			// noinspection JSUnusedLocalSymbols
			var verticalHeight = ($next && $next.length ? $next.position().top + $next.outerHeight() : this.$elem.innerWidth()) - ($prev.length ? ($prev.position().top + $prev.outerHeight()) : (this.$elem.outerHeight() + this.$elem.position().top)) - parseFloat(computed.paddingTop) * 2;
			var windowButtonsHeight = this._cache.horizontal ? this.$elem.innerHeight() : farBottom - farTop - paddingsVertical;

			// if horizontal taskbar has only one row, set axis on sortable,
			// so buttons won't bounce of the edges of container
			var singleHorizontalRow = this._cache.horizontal && this.options.horizontalRows === 1;

			if (this.options.windowButtonsSortable && $.ui.sortable) {
				this.$windowButtonsContainer.sortable('option', 'axis', singleHorizontalRow ? 'x' : false);
			}

			// just to be sure
			if (horizontal) {
				--windowButtonsWidth;
			}

			this.$windowButtonsContainer.css({
				width: windowButtonsWidth,
				height: windowButtonsHeight
			});
		},

		// set equal sizes to window buttons, in case when buttons with their
		// natural sizes would overflow container
		_setWindowButtonsSizes: function() {
			// noinspection JSUnusedLocalSymbols
			var self = this, widths = {}, heights = {}, $buttons = this.$elem.find('.' + this.classes.windowButton);

			if (!$buttons.length) {
				return;
			}

			// noinspection JSUnusedLocalSymbols
			var $buttonFirst = $buttons.filter(':eq(0)'),
				$buttonLast = $buttons.filter(':last'),
				marginRight = parseFloat(window.getComputedStyle($buttonFirst[0]).marginRight),
				marginBottom = parseFloat(window.getComputedStyle($buttonFirst[0]).marginBottom),
				diff = $buttonFirst.outerWidth() - $buttonFirst.innerWidth();

			// reset styles
			$buttons.each(function() {
				var $this = $(this);

				// clear button dimensions
				self._copyStyles({
					to: $this,
					properties: ['maxWidth', 'maxHeight', 'display']
				});

				// gather buttons widts
				widths [this.id] = $this.outerWidth() + marginRight;
			});

			if (this._cache.horizontal) {
				var width = 0;

				if ($buttonLast.offset().top >= this.$windowButtonsContainer.offset().top + this.$windowButtonsContainer.innerHeight()) {
					// buttons don't overflow container, nothing to do here
					$.each(widths, function(index, value) {
						width += value;
					});

					// number of buttons expected to be container in each row
					var inRow = Math.ceil($buttons.length / this._getRealRowCol('horizontal')),
						// button max width to be applied
						maxWidth = Math.floor(this.$windowButtonsContainer.innerWidth() / inRow - marginRight - diff);

					$buttons.css('maxWidth', maxWidth);

					// calculate smaller width for window buttons
					$buttons = this.$windowButtonsContainer.children('.' + this.classes.uiButton);
					var $lastButton = $buttons.filter(':last');

					// there are no buttons, nothing to do here
					if ($lastButton.length) {
						var rows = {};

						// set empty jQuery object for every row we have
						for (var i = 1; i <= this.options.horizontalRows; i++) {
							rows[i] = $();
						}

						var rowStart = this._extendedPosition.call($buttons.filter(':eq(0)'), 'offset').top, currentRow = 1;

						// sort buttons to their rows
						$buttons.each(function() {
							var $this = $(this);

							var top = self._extendedPosition.call(
								$this, 'offset'
							).top;

							if (
								top - 2 > rowStart
								&& currentRow < self.options.horizontalRows
							) {
								// we'll in next row now
								rowStart = top;
								++currentRow;
							}

							rows[currentRow] = rows[currentRow].add($this);
						});

						var lastButtonOffset = this._extendedPosition.call($lastButton, 'offset'),
							containerOffset = this._extendedPosition.call(this.$windowButtonsContainer, 'offset');

						// if last button is over the bottom edge of container
						if (lastButtonOffset.bottom > containerOffset.bottom + lastButtonOffset.height / 2) {
							var $allExceptLast = rows[this._getRealRowCol('horizontal')].filter(':not(:last)'), iteration = 0;

							while (lastButtonOffset.bottom > containerOffset.bottom + lastButtonOffset.height / 2) {
								// decrease max width by 1px
								$allExceptLast.each(function() {
									this.style.maxWidth = '' + (parseInt(this.style.maxWidth, 10) - 1) + 'px';
								});

								iteration++;

								if (iteration === 50) {
									// something's not right, break here to avoid
									// infinite loop; it could be a simple as page
									// not being visible during calculations
									break;
								}

								// after max width change, refresh
								// $lastButton offset for the while condition
								lastButtonOffset = this._extendedPosition.call($lastButton, 'offset');
							}
						}
					}
				}

				// cache calculated button's widths
				// - when sortable starts, it'll be too late to get to them
				$buttons.each(function() {
					$(this).data(self._cnst.dataPrefix + 'taskbarButtonFloatWidth', window.getComputedStyle(this).width);
				});
			}

			if (this.options.windowButtonsSortable && $.ui.sortable) {
				this.$windowButtonsContainer.sortable('refreshPositions');
			}
		},

		_connectElements: function($elem1, $elem2) {
			// force elements to have ID
			// (ID won't be set if element already has ID)
			var elem1 = $elem1.uniqueId().attr('id');
			var elem2 = $elem2.uniqueId().attr('id');

			// single element can have multiple connnected elements
			this._cache.connectedElements[elem1] = this._cache.connectedElements[elem1] || [];
			this._cache.connectedElements[elem1].push(elem2);

			this._cache.connectedElements[elem2] = this._cache.connectedElements[elem2] || [];
			this._cache.connectedElements[elem2].push(elem1);
		},

		// return connected element or empty jQuery object if no connected
		// element can be found
		connectedElement: function(item) {
			var $empty = $(), itemId;

			// either jQuery object, DOM object,
			// or item id could be passed as parameter
			if (item instanceof $ && item.length && item[0].id) {
				itemId = item[0].id;
			} else if (item.nodeName) {
				itemId = item.id;
			} else if (typeof item === 'string') {
				itemId = item;
			}

			if (!itemId) {
				return $empty;
			}

			var elems = this._cache.connectedElements[itemId];

			// return empty jQuery object if no connected element was found
			if (!elems || !elems.length) {
				return $empty;
			}

			var $elems = $();

			// build a set of connected elements
			$.each(elems, function(index, id) {
				$elems = $elems.add($('#' + id));
			});

			return $elems.length ? $elems : $empty;
		},

		// find all elements that should participate
		// that should autoOpen on hover when a taskbar
		// subordinate is currently open, and bind appropiate handlers
		_bindMenusAutoOpen: function() {
			var self = this, $buttons = this.$elem.find('.' + this.classes.uiButton);

			var $elems = $().add($buttons.filter('[data-menu-button]')).add($buttons.filter('[data-group-name]')).add(this.$languageSelect).add(this.$clock);

			$elems.each(function() {
				var $connected = self.connectedElement(this);

				if (!$connected.length) {
					return;
				}

				self._bindMenuAutoOpen($(this), $connected);
			});
		},

		// bind auto open login to buttons
		_bindMenuAutoOpen: function($button, $elem) {
			var self = this;

			var eventName = 'mouseenter.' + this._cache.uep + 'menuautoopen';

			// unbind handler - act as destroyer
			$button.off(eventName);

			if (!this.options.menuAutoOpenOnBrowse || !$button.length || !$elem.length) {
				return;
			}

			$button.on(eventName, function() {
				if (self._cache.progress.windowButtonsSortable || self._cache.progress.taskbarDraggable) {
					return true;
				}

				if (self._openedElements() && !$elem.is(':visible')) {
					self._cache.progress.menuAutoOpenOnBrowse = true;
					// suppressSingleGroupClick will prevent window showing
					// on group buttons that have only one window currently binded
					self._cache.suppressSingleGroupClick = true;
					$(this).trigger('click.' + self._cache.uep);
					self._cache.suppressSingleGroupClick = false;
				}
			});
		},

		_stopOtherTaskbarsAutoOpenOnBrowse: function() {
			var self = this;

			$('.' + this.classes.taskbar).not(this.$elem).each(function() {
				var $this = $(this), instance = $this.data(self._cnst.dataPrefix + 'taskbar');

				instance.hideSubordinates();
				instance._openedElements(false);
				instance._cache.progress.menuAutoOpenOnBrowse = false;
			});
		},

		// setts state for a button
		_setConnectedButtonState: function(self) {
			// connected element
			var $connectedElems = self.connectedElement(this);

			if (!$connectedElems.length) {
				return;
			}

			// noinspection JSUnusedLocalSymbols
			var $elems = self.connectedElement(this), active = false, activeClass = self.classes.uiStateActive;

			$.each($elems, function() {
				var $elem = $(this);

				// when connected element is window
				if ($elem.hasClass(self.classes.windowContent)) {
					// check if active class is present
					active = $elem.window('widget').hasClass(
						self.classes.windowTop
					);

					// when connected element is window menu group
				} else if ($elem.hasClass(self.classes.windowGroupMenu)) {

					// itterate through elems connected to button
					// - in window groups there's more than one
					$connectedElems.each(function() {
						var $connected = $(this);

						// we deal with window menu group
						if (!$connected.hasClass(self.classes.uiDialogContent)) {
							if ($connected.is(':visible')) {
								// found opened window group, break here,
								// active = true will be set after that loop
								return false;
							}

							// window group menu could be hidden,
							// but windows are visible, so continue
							return true;
						}

						// check if active class is present
						if ($connected.window('widget').hasClass(self.classes.windowTop)) {
							// found active window, break here
							active = true;
							return false;
						}
					});

					// on no window is active, the menu itself could be visible
					if (!active) {
						active = $elem.is(':visible');
					}
				} else {
					// datepicker, language menu, start menu, etc.
					active = $elem.is(':visible');
				}

				// break if found
				if (active) {
					return false;
				}
			});

			// set class
			$(this).toggleClass(self.classes.uiStateActive, active);
		},

		// set connected button state on all buttons
		_setConnectedButtonsStates: function() {
			var self = this;

			// noinspection JSUnresolvedFunction
			this.$systemButtonsContainer.add(this.$windowButtonsContainer).add(this.$buttonsContainer).children('.' + this.classes.uiButton).each(function() {
				self._setConnectedButtonState.call(this, self);
			});
		},

		// updates time button label and inserts current time
		_clockUpdate: function() {
			var $clock = this.$elem.find('.' + this.classes.clock);

			$clock.button('option', 'label', this._getFormattedTime()).attr('title', this._getFormattedDate());
		},

		// use datepicker formatDate function to format date for clock tooltip
		_getFormattedDate: function() {
			var lang = this.options.language !== 'en' ? this.options.language : '';

			// if datepicker is not present, use empty string,
			// meaning tooltip will not show
			if (!$.datepicker) {
				return '';
			}

			// generate debug for missing translations
			if (!$.datepicker.regional[lang]) {
				this._debugLogAdd('Language "' + lang + '" required for formatting date for clock tooltip, but datepicker translations were not found.', 1, 1);

				return '';
			}

			return $.datepicker.formatDate(this._i18n('clockDateFormat'), new Date(), {
				dayNamesShort: $.datepicker.regional[lang].dayNamesShort,
				dayNames: $.datepicker.regional[lang].dayNames,
				monthNamesShort: $.datepicker.regional[lang].monthNamesShort,
				monthNames: $.datepicker.regional[lang].monthNames
			});
		},

		// functions taken from jQuery Timepicker Addon and slightly changed
		// for this plugin
		// Copyright (c) 2014 Trent Richardson; Licensed MIT
		// usage: http://trentrichardson.com/examples/timepicker/#tp-formatting
		_getFormattedTime: function(time) {
			var date = new Date(), format = this._i18n('clockTimeFormat');

			time = time || {
				hour: date.getHours(),
				minute: date.getMinutes(),
				second: date.getSeconds(),
				millisec: date.getMilliseconds(),
				timezone: date.getTimezoneOffset()
			};

			var convert24to12 = function(hour) {
				hour %= 12;

				if (hour === 0) {
					hour = 12;
				}

				return String(hour);
			};

			// noinspection JSCheckFunctionSignatures
			var tmptime = format, ampmName = this._i18n('clockAmSymbol'), hour = parseInt(time.hour, 10);

			if (hour > 11) {
				ampmName = this._i18n('clockPmSymbol');
			}

			tmptime = tmptime.replace(/(?:HH?|hh?|mm?|ss?|[tT]{1,2}|[zZ]|[lc]|'.*?')/g, function(match) {
				switch (match) {
					case 'HH':
						return ('0' + hour).slice(-2);
					case 'H':
						return hour;
					case 'hh':
						return ('0' + convert24to12(hour)).slice(-2);
					case 'h':
						return convert24to12(hour);
					case 'mm':
						return ('0' + time.minute).slice(-2);
					case 'm':
						return time.minute;
					case 'ss':
						return ('0' + time.second).slice(-2);
					case 's':
						return time.second;
					case 'l':
						return ('00' + time.millisec).slice(-3);
					case 'c':
						// noinspection JSUnresolvedVariable
						return ('00' + time.microsec).slice(-3);
					case 'z':
						// noinspection JSUnresolvedVariable,JSUnresolvedFunction
						return $.timepicker.timezoneOffsetString(time.timezone === null ? options.timezone : time.timezone, false);
					case 'Z':
						// noinspection JSUnresolvedVariable,JSUnresolvedFunction
						return $.timepicker.timezoneOffsetString(time.timezone === null ? options.timezone : time.timezone, true);
					case 'T':
						return ampmName.charAt(0).toUpperCase();
					case 'TT':
						return ampmName.toUpperCase();
					case 't':
						return ampmName.charAt(0).toLowerCase();
					case 'tt':
						return ampmName.toLowerCase();
					default:
						return match.replace(/'/g, '');
				}
			});

			return tmptime;
		},

		// blur all windows using window "moveToTop" method with additional params
		_blurWindows: function() {
			$('.' + this.classes.window + ':eq(0) .' + this.classes.windowContent + ':eq(0)').window('moveToTop', {
				skipThis: true,
				skipMinimizing: true,
				blurModals: true
			});
		},

		// returns all windows binded to this taskbar
		_windows: function() {
			var $collection = $();

			// noinspection JSUnusedLocalSymbols
			$.each(this._cache.windows, function(index, elem) {
				var $window = $('#' + index);

				if ($window.length) {
					$collection = $collection.add($window);
				}
			});

			return $collection;
		},

		// sets position of datepicker
		_datepickerSetPosition: function() {
			var $clock = this.$elem.find('.' + this.classes.clock), $datepicker = this.$elem.find('.' + this.classes.datepicker);

			if (!$clock.length || !$datepicker.length) {
				return;
			}

			var datepickerMenuPosition = this._menuPosition({
				of: $clock,
				elem: $datepicker
			});

			$datepicker.position(datepickerMenuPosition);
		},

		_parseDuration: function(speed) {
			// copied from _normalizeArguments function of jQuery UI effects
			return typeof speed === 'number' ? speed : speed in $.fx.speeds ? $.fx.speeds[speed] : undefined;
		},

		// initialize all autoHide functionality events
		_initAutoHide: function(settings) {
			// noinspection JSUnusedLocalSymbols
			var $elem = this.$elem, self = this, _cache = this._cache, elemWasHidden = $elem.hasClass(self.classes.autoHideHidden);

			// destroy previous bindings
			$elem.off('mouseenter.' + this._cache.uep + 'autohide mouseleave.' + this._cache.uep + 'autohide autohide.' + this._cache.uep + 'start autohide.' + this._cache.uep + 'restart').removeClass(this.classes.autoHide + ' ' + this.classes.autoHideHidden + ' ' + this.classes.autoHideHidding + ' ' + this.classes.autoHidePending + ' ' + this.classes.autoHideShowing);

			clearTimeout(self._cache.timeouts.autoHide);

			if (!this.options.autoHide) {
				this.$elem.css(this._autoHideStopAndReturnDestination());
				return;
			}

			$elem.addClass(this.classes.autoHide);

			$elem.on('autohide.' + this._cache.uep + 'restart', function() {
				var speed = self.options.durations.autoHideDelay;

				// if invalid value was passed, use the default
				var timeout = self._parseDuration(speed);

				if (typeof timeout === 'undefined') {
					timeout = $.fx.speeds._default;
				}

				clearTimeout(self._cache.timeouts.autoHide);

				var restartAutoHide = function() {
					$elem.trigger('autohide.' + self._cache.uep + 'restart');
				};

				var autoHideExecute = function() {
					if (!self._openedElements() && !$elem.hasClass(self.classes.autoHideHidden) && !$elem.hasClass(self.classes.autoHideHidding) && !$elem.hasClass(self.classes.autoHideShowing) && !$elem.hasClass(self.classes.autoHideMouseOver) && !self._cache.progress.windowButtonsSortable && !self._cache.progress.taskbarDraggable && !self._cache.progress.taskbarResizable) {
						// if all requirements are met, let's start hiding
						$elem.trigger('autohide.' + self._cache.uep + 'start');
					} else {
						if (speed === false) {
							// restart with timeout if it was trigger immediately
							setTimeout(function() {
								restartAutoHide();
							}, self._cnst.autoHideRestartDelay);
						} else {
							// restart immediately if it was trigger
							// in timeouted function
							restartAutoHide();
						}
					}
				};

				if (speed === false) {
					autoHideExecute();
				} else {
					// trigger restart handler not earlier than
					// self._cnst.autoHideRestartDelay - otherwise
					// it would be too heavy without real benefit to the user
					self._cache.timeouts.autoHide = setTimeout(function() {
						autoHideExecute();
					}, Math.max(self._cnst.autoHideRestartDelay, timeout));
				}

			});

			$elem.on('autohide.' + this._cache.uep + 'start', function() {
				self._startHidding();
			});

			var $handle = $elem.find('.' + this.classes.uiResizableHandle);

			$elem.on('mouseenter.' + this._cache.uep + 'autohide', function(event) {
				// jQuery UI Datepicker is triggering mouseover event on one of
				// it's subordinate elements - it bubbled here and caused false
				// positive mouseenter on taskbar; we don't want that
				if (event.isTrigger && $(event.target).is('.' + self.classes.uiDatepickerDaysCellOver + ' a')) {
					return;
				}

				$elem.addClass(self.classes.autoHideMouseOver);

				// if taskbar show didn't started already, start it now
				if ($elem.hasClass(self.classes.autoHidePending) || $elem.hasClass(self.classes.autoHideHidding)) {
					self._startShowing();
				}
			});

			$elem.on('mouseleave.' + this._cache.uep + 'autohide', function() {
				$elem.removeClass(self.classes.autoHideMouseOver);

				if (!$elem.hasClass(self.classes.autoHideHidden)) {
					$elem.addClass(self.classes.autoHidePending);
				}

				$elem.trigger('autohide.' + self._cache.uep + 'restart');
			});

			$handle.on('mouseenter.' + this._cache.uep + 'autohide', function() {
				if (!$elem.hasClass(self.classes.autoHideHidden)) {
					return true;
				}

				var $windowDragging = $('.' + self.classes.window + '.' + self.classes.uiDraggableDragging);
				var $windowResizing = $('.' + self.classes.window + '.' + self.classes.uiResizableResizing);

				// no showing if interaction is in progress
				if ($windowDragging.length || $windowResizing.length) {
					return true;
				}

				self._startShowing();
			});

			if (elemWasHidden) {
				this._startHidding({
					duration: false
				});
			} else {
				$elem.trigger('autohide.' + this._cache.uep + 'restart');
			}
		},

		_startShowing: function(options) {
			if (!this.$elem.hasClass(this.classes.autoHideHidden) && !this.$elem.hasClass(this.classes.autoHideHidding) && !this._openedElements()) {
				return;
			}

			if (this.$elem.hasClass(this.classes.draggableDragging) || this.$elem.hasClass(this.classes.resizableResizing)) {
				return;
			}

			if (this.$elem.hasClass(this.classes.autoHideShowing)) {
				return;
			}

			if (!this.options.autoHide) {
				return;
			}

			var self = this;

			var ui = this._autoHideUi(false, options);

			if (this._trigger('autoHideStart', {}, ui) === false) {
				// respect prevention on autoHideStart
				return false;
			}

			this.$elem.removeClass(this.classes.autoHideHidden + ' ' + this.classes.autoHideHidding + ' ' + this.classes.autoHidePending);

			this.$elem.addClass(this.classes.autoHideShowing);

			// noinspection JSUnusedLocalSymbols
			var _cache = this._cache, props = this._autoHideStopAndReturnDestination();

			// second object for autoHideStop
			var uiStop = this._autoHideUi(false, options);

			var uiProgress = this._autoHideUi(false, {
				quick: options && options.duration === false,
				trigger: options && options.trigger === 'api' ? 'api' : 'user'
			});

			if ((!options || options.duration !== false) && this.options.durations.autoHideShow !== false) {
				this.$elem.animate(props, {
					duration: options ? this._parseDuration(options.duration) || this.options.durations.autoHideShow : this.options.durations.autoHideShow,
					progress: function() {
						self._trigger('autoHideProgress', {}, $.extend(true, {}, uiProgress));
					},
					complete: function() {
						self.$elem.removeClass(self.classes.autoHideShowing);
						self._trigger('autoHideStop', {}, uiStop);
						self.$elem.trigger('autohide.' + self._cache.uep + 'restart');
					}
				});
			} else {
				// quick show
				this.$elem.css(props).removeClass(this.classes.autoHideShowing);
				this._trigger('autoHideStop', {}, uiStop);
				this.$elem.trigger('autohide.' + this._cache.uep + 'restart');
			}
		},

		_startHidding: function(options) {
			if (this.$elem.hasClass(this.classes.draggableDragging) || this.$elem.hasClass(this.classes.resizableResizing)) {
				return;
			}

			var ui = this._autoHideUi(true, options);

			if (this._trigger('autoHideStart', {}, ui) === false) {
				return false;
			}

			// second object for autoHideStop
			var uiStop = this._autoHideUi(true, options);

			// noinspection JSUnusedLocalSymbols
			var uiProgress = this._autoHideUi(true, {
				quick: null,
				trigger: options && options.trigger === 'api' ? 'api' : 'user'
			});

			var self = this, _cache = self._cache, $elem = self.$elem;

			if ($elem.hasClass(this.classes.autoHideHidding) || $elem.hasClass(this.classes.draggableDragging)) {
				return false;
			}

			var props = {};

			$elem.addClass(this.classes.autoHideHidding);
			$elem.removeClass(this.classes.autoHidePending);

			props[_cache.horizontal ? _cache.stickVertical : _cache.stickHorizontal] = _cache.horizontal ? $elem.outerHeight() * -1 : $elem.outerWidth() * -1;

			// quick hide should not use stop()
			if (options && options.duration === false || this.options.durations.autoHideHide === false) {
				$elem.css(props).removeClass(this.classes.autoHideHidding).addClass(this.classes.autoHideHidden);

				this._trigger('autoHideStop', {}, uiStop);
			} else {
				$elem.stop(true, false).animate(props, {
					duration: options ? this._parseDuration(options.duration) || this.options.durations.autoHideHide : this.options.durations.autoHideHide,
					progress: function() {
						self._trigger('autoHideProgress', {}, $.extend(true, {}, uiStop));
					},
					complete: function() {
						$elem.removeClass(self.classes.autoHideHidding).addClass(self.classes.autoHideHidden);
						self._trigger('autoHideStop', {}, uiStop);
					}
				});
			}
		},

		// construct ui object for autoHide events
		_autoHideUi: function(hide, options) {
			var ui = {};

			if (hide) {
				ui.hide = true;
				ui.show = false;
			} else {
				ui.hide = false;
				ui.show = true;
			}

			ui.$handle = this.$elem.find('.' + this.classes.resizable).find('.' + this.classes.uiResizableHandle);

			if (options && options.quick !== null) {
				ui.quick = options && options.duration === false;
			}

			ui.triggerApi = !!(options && options.trigger && options.trigger === 'api');

			return ui;
		},

		// helper for autoHide
		_autoHideStopAndReturnDestination: function() {
			var css = {};

			css[this._cache.horizontal ? this._cache.stickVertical : this._cache.stickHorizontal] = 0;
			this.$elem.stop(true, false);

			return css;
		},

		_show: function(duration) {
			this._startShowing({
				duration: duration,
				trigger: 'api'
			});

			return this;
		},

		_hide: function(durations) {
			this._startHidding({
				duration: durations,
				trigger: 'api'
			});

			return this;
		},

		// this function will save the state of taskbar subordinates
		// being open
		_openedElements: function(opened) {
			// act as getter
			if (typeof opened === 'undefined') {
				return this._cache.openedElements;
			}

			this._cache.openedElements = opened;

			if (opened === false) {
				this._cache.progress.menuAutoOpenOnBrowse = false;
				this.$elem.trigger('autohide.' + this._cache.uep + 'restart');
			} else {
				this._startShowing({
					duration: false
				});
			}

			this.$elem.toggleClass(this.classes.taskbarWithOpenElements, opened);
		},

		// this function will produce DOM elements wrapped in jQuery objects
		_factory: function(elem, params) {
			var self = this,
				// returns empty DIV
				div = function() {
					return $('<div></div>');
				};

			// noinspection JSUnusedGlobalSymbols
			var elems = {
				startButton: function() {
					// noinspection JSUnusedLocalSymbols
					var startSettings = {icons: {}};
					var title = self._i18n('startButton:' + params.name);
					var $startButton = div().addClass(self.classes.startButton).text(title !== 'undefined' ? title : params.name || params.text).attr('data-menu-button-for', params.name).attr('data-menu-button', 'true').button();
					self._refreshButtonIcon.call($startButton, self);

					return $startButton;
				},

				separator: function() {
					return div().addClass(self.classes.separator + ' ' + self.classes.uiWidgetContent);
				},

				widgetContent: function() {
					return div().addClass(self.classes.uiWidgetContent);
				},

				droppableContainer: function() {
					return div().addClass(self.classes.droppableContainer).attr('data-taskbar-uuid', self.uuid);
				},

				languageSelect: function() {
					return div().addClass(self.classes.languageSelect + ' ' + self.classes.taskbarIcon).attr('data-menu-button', 'true');
				},

				languageSelectMenu: function() {
					return $('<ul></div>').attr('data-menu-type', 'languageSelect');
				},

				windowGroupMenu: function() {
					return $('<ul></ul>').addClass(self.classes.windowGroupMenu);
				},

				windowGroupElement: function() {
					// placeholder will be replaced with group name
					return $('<li></li>').addClass(self.classes.windowGroupElement).prepend($('<a></a>').attr('href', '#').append('taskbarPlaceholder'));
				},

				droppable: function() {
					return div().addClass(self.classes.droppable).attr('data-taskbar-uuid', self.uuid);
				}
			};

			// simple elements
			if ($.inArray(elem, ['container', 'datepicker', 'draggableHelper', 'resizable', 'windowButton', 'windowCopy', 'windowsContainment']) > -1) {
				return div().addClass(self.classes [elem]);
			}

			// buttons with icons
			if ($.inArray(elem, ['clock', 'minimizeAll', 'networkMonitor', 'toggleFullscreen']) > -1) {
				return div().addClass(self.classes [elem] + ' ' + self.classes.taskbarIcon);
			}

			// containers
			if ($.inArray(elem, ['buttonsContainer', 'startButtonsContainer', 'systemButtonsContainer', 'windowButtonsContainer']) > -1) {
				return div().addClass(self.classes [elem] + ' ' + self.classes.taskbarContainter).attr('data-container-name', elem);
			}

			return elems [elem]();
		},

		// binds window to the taskbar
		_bind: function($elem) {
			var $taskbar;

			try {
				$taskbar = $elem.window('taskbar');
			} catch (e) {
				return false;
			}
			if ($taskbar[0] !== this.$elem[0]) {
				return false;
			}
			// now we know that window is binded to some taskbar and it's this one,
			// so continue

			var id = $elem[0].id;

			this._cache.windows[id] = $elem;

			var group = $elem.window('option', 'group');

			var config = {
				$elem: $elem,
				window: id
			};

			if (group) {
				if (!this._cache.groups[group]) {
					this._cache.groups[group] = [];
					this._cache.windowButtons.push('group:' + group);
				}
				this._cache.groups[group].push(id);
				config.group = group;
			} else {
				this._cache.windowButtons.push('window:' + id);
			}

			this._appendWindowButton(config);

			if (this._cache.horizontal) {
				this._refreshWindowButtonsContainer();
			}

			this._setButtonsTooltips();
			this._refreshSeparators();

			var ui = {
				$window: $elem
			};

			this._trigger('bind', {}, ui);
		},

		// unbinds window from the taskbar
		_unbind: function($elem) {
			this._windowButtonAction({
				$elem: $elem,
				action: 'unbind'
			});

			var ui = {
				$window: $elem
			};

			this._trigger('unbind', {}, ui);
		},

		// returns button for a window
		_button: function($elem) {
			return this._windowButtonAction({
				$elem: $elem,
				action: 'get'
			});
		},

		_windowButtonAction: function(options) {
			var $elem = options.$elem, buttonUnbindHappened = false;

			if (options.action === 'get' && !($elem instanceof $)) {
				return $();
			}

			var id = ($elem.hasClass(this.classes.window) ? $elem.find('.' + this.classes.uiDialogContent) : $elem)[0].id, b = this._cache.windowButtons, g = this._cache.groups, self = this, i;

			// if window is not in group
			for (i in b) {
				if (b.hasOwnProperty(i) && b[i] === 'window:' + id) {
					var $button = this.$elem.find('.' + this.classes.windowButton + '[data-window-id=' + id + ']');

					if (options.action === 'get') {
						// getter
						return $button;
					} else if (options.action === 'unbind') {
						// unbind
						self._removeWindowFromCache(id);
						$button.remove();
						b.splice(i, 1);
						buttonUnbindHappened = true;
						break;
					}
				}
			}

			// if window is in group
			for (i in g) {
				if (g.hasOwnProperty(i)) {
					// iterate over windows in group
					for (var j in g[i]) {
						if (g[i].hasOwnProperty(j) && g[i][j] === id) {
							var $group = this.$elem.find('.' + this.classes.windowButton + '[data-group-name=' + i + ']'),
								$menu = this.$elem.find('.' + this.classes.uiMenu + '[data-group-name=' + i + ']'),
								$item = $menu.find('[data-window-id=' + id + ']');

							if (options.action === 'get') {
								// getter
								return $group;
							} else if (options.action === 'unbind') {
								// unbind
								$item.remove();

								// delete from group
								delete g[i][j];

								// delete from cache
								self._removeWindowFromCache(id);

								var emptyGroup = true;

								$.each(g[i], function(id, elem) {
									if (typeof (elem) === 'string') {
										emptyGroup = false;
									}
								});

								if (emptyGroup) {
									// remove group cause it's now empty
									var needle = 'group:' + i;

									for (var k = 0; k < b.length; k++) {
										if (b[k] === needle) {
											b.splice(k, 1);
											break;
										}
									}

									buttonUnbindHappened = true;

									$menu.menu('destroy').remove();
									$group.remove();
									break;
								} else {
									// refresh menu after $item was removed
									$menu.menu('refresh');
									this._groupSetTranslatedTitle.call($group, self);
								}

								self._positionTaskbarWindowGroup({
									$group: $group,
									$menu: $menu
								});

								break;
							}
						}
					}
				}
			}

			// button was not found, return empty jQuery object for consistency
			if (options.action === 'get') {
				return $();
			}

			// refresh sizes and separators only if real unbind happened,
			// meaning that button disappeared
			if (buttonUnbindHappened) {
				this._setWindowButtonsSizes();
				this._refreshSeparators();
			}
		},

		_removeWindowFromCache: function(id) {
			delete this._cache.windows[id];
		},

		// inserts window button to the container
		_appendWindowButton: function(config) {
			var self = this, title, $button, $group;

			// handler for showing window
			var showWindow = function(event) {
				event.preventDefault();

				var windowId = $(this).attr('data-window-id'), $window = $('#' + windowId);

				self._hideMenus();
				self._hideTooltips();

				$window.window('show', event);

				self._openedElements(false);
			};

			if (config.group) {
				$group = this.$windowButtonsContainer.find('.' + this.classes.uiButton + '[data-group-name=' + config.group + ']');

				var $menu;

				if (!$group.length) {
					$group = this._factory('windowButton').uniqueId().appendTo(this.$windowButtonsContainer).attr('data-group-name', config.group).button();

					this._refreshGroupIcon.call($group, this);

					if (!this._debugMenu()) {
						return;
					}

					$menu = this._factory('windowGroupMenu').attr('data-group-name', config.group).insertAfter($group).menu({
						focus: function(event, ui) {
							$(ui.item).addClass(self.classes.windowGroupElementActive);

							self._triggerBindedElementEvent({
								type: 'menuItemFocus',
								item: $(ui.item),
								menu: $menu,
								button: $group,
								event: event
							});
						},
						blur: function(event, ui) {
							$(this).children('.' + self.classes.uiMenuItem).removeClass(self.classes.windowGroupElementActive);

							self._triggerBindedElementEvent({
								type: 'menuItemBlur',
								item: $(ui.item),
								menu: $menu,
								button: $group,
								event: event
							});
						}
					}).hide();

					this._connectElements($group, $menu);

					$group.on('click.' + this._cache.uep + ' dblclick.' + this._cache.uep, function(event) {
							var $onlyItem = $menu.find('.' + self.classes.uiMenuItem);

							// if one window is in group, show it instantly, withour showing menu first
							if ($onlyItem.length === 1 && !self._cache.suppressSingleGroupClick) {
								self._hideMenus();
								self._hideTooltips();
								$onlyItem.trigger(event.type, event);
								return true;
							}

							if ($onlyItem.length === 1 && self._cache.suppressSingleGroupClick) {
								return true;
							}

							self._stopOtherTaskbarsAutoOpenOnBrowse();

							if (event.type === 'dblclick') {
								return true;
							}

							self._blurWindows();

							self._hideMenus({
								not: $menu
							});
							self._hideTooltips();

							var visible = $menu.is(':visible');

							// trigger event and respect prevention
							if (self._triggerBindedElementEvent({type: visible ? 'elementClose' : 'elementOpen', menu: $menu, button: $group}) === false) {
								return;
							}

							$(this).addClass(self.classes.uiStateActive);

							$menu.toggle();

							if (!visible) {
								self._positionTaskbarWindowGroup({
									$group: $group,
									$menu: $menu
								});
							} else {
								self._openedElements(false);
							}

							self._setConnectedButtonState.call(this, self);
						});

					this._bindMenuAutoOpen($group, $menu);

					$group.on('mouseup.' + this._cache.uep + ' mouseenter.' + this._cache.uep + ' mouseleave.' + this._cache.uep, function() {
						self._setConnectedButtonState.call(this, self);
					});
				} else {
					// select menu if the group was already created
					$menu = this.$windowButtonsContainer.find('.' + this.classes.uiMenu + '[data-group-name=' + config.group + ']');
				}

				$button = $group;

				// bind events ti menu item
				var $elem = this._factory('windowGroupElement').attr('data-window-id', config.window).on('dblclick.' + this._cache.uep + ' click.' + this._cache.uep, showWindow);

				$elem.append(
					$('<div></div>').addClass(this.classes.menuWindowClose).text(this._i18n('close')).button({
						text: false,
						icons: {
							 primary: this.options.icons.menuWindowClose
						}
					}).on('click.' + this._cache.uep, function(event) {
						event.preventDefault();

						var windowId = $(this).closest('[data-window-id]').attr('data-window-id');

						$('#' + windowId).window('close');

						self._openedElements(false);
					})
				);

				$elem.appendTo($menu);
				this._connectElements(config.$elem, $button);
				$menu.menu('refresh');
				this._refreshWindowButtonIcon.call($elem, this);
				this._groupSetTranslatedTitle.call($group, self);
			} else {
				$button = this._factory('windowButton').appendTo(this.$windowButtonsContainer);
				title = config.$elem.window('option', 'title');
				$button.uniqueId().attr('data-window-id', config.window).on('click.' + this._cache.uep + ' dblclick.' + this._cache.uep, showWindow).button();
				this._buttonSetTitle.call($button, title, this);
				this._connectElements(config.$elem, $button);
				this._refreshwindowButtonsIcons();
			}

			if ($button !== $group) {
				$button.on('mouseup.' + this._cache.uep + ' mouseleave.' + this._cache.uep, function() {
					self._setConnectedButtonState.call(this, self);
				});
			}
		},

		_groupSetTranslatedTitle: function(self) {
			var group = $(this).attr('data-group-name'),
				menuItemsLength = self.connectedElement(this).filter('.' + self.classes.uiMenu).children().length,
				groupTranslatedTitle = self._i18n('group:' + group),
				groupTranslatedTitleSet = groupTranslatedTitle !== self._cnst.missingTranslation,
				titleBody = groupTranslatedTitleSet ? groupTranslatedTitle : group,
				title = menuItemsLength > 1 ? self._i18n('multipleWindowButton', {
					counter: menuItemsLength,
					title: titleBody
				}) : titleBody;

			if (!groupTranslatedTitleSet) {
				self._debugLogAdd('Missing translation for windows group named "' + group + '" in language "' + self.options.language + '".', 1, 1);
			}

			$(this).attr('title', title).button('option', 'label', title);
		},

		_buttonSetTitle: function(title, self) {
			var $this = $(this);

			$this.attr('title', title);

			if ($this.hasClass(self.classes.uiButton)) {
				$this.button('option', 'label', title);
			}
		},

		// refresh icons of all window groups
		_refreshGroupIcons: function() {
			var self = this;

			this.$elem.find('[data-group-name].' + this.classes.uiButton).each(function() {
				self._refreshGroupIcon.call($(this), self);
			});
		},

		_refreshGroupIcon: function(self) {
			var $this = $(this), group = $this.attr('data-group-name');

			// because of "icons.primary", single setter cannot be used
			$this.button('option', 'icons.primary', self.options.icons['group:' + group] || null);
			$this.button('option', 'text', !self.options.windowButtonsIconsOnly);
		},

		_refreshButtonIcons: function() {
			var self = this;

			this.$elem.find('[data-button-name].' + this.classes.uiButton + ',[data-menu-button].' + this.classes.uiButton).each(function() {
				self._refreshButtonIcon.call($(this), self);
			});
		},

		_refreshButtonIcon: function(self) {
			var $this = $(this),
				button = $this.attr('data-button-name'),
				icon = null;

			// buttons with single icon only
			if ($.inArray(button, self._systemButtonsWithSingleIcons) > -1) {
				icon = self.options.icons[button];

				// toggleFullscreen: it's icon depends on fullscreen status
			} else if (button === 'toggleFullscreen') {
				icon = self.options.icons['toggleFullscreen' + (self._fullscreenEnabled() ? 'On' : 'Off')];

				// networkMonitor: it's icon depends on network connection status
			} else if (button === 'networkMonitor') {
				icon = self.options.icons[self._getNetworkMonitorKey()];

				// start buttons
			} else if ($this.hasClass(self.classes.startButton) && $this.hasClass(self.classes.uiButton)) {
				// icons.startButton has higher priority than icons.startButtonSet
				icon = self.options.icons.startButton ? self.options.icons.startButton : self.options.icons.startButtonSet ? self.options.icons.startButtonSet + '-' + self._translatePosition() : null;
			} else {
				// try to get icon from button object passed in "buttons" option, fail silently
				try {
					icon = self.options.buttons[button].icons.primary;
				} catch (e) {}
			}

			$this.button('option', 'icons.primary', icon || null);
		},

		_refreshwindowButtonsIcons: function() {
			var self = this;

			this.$elem.find('[data-window-id].' + this.classes.uiButton).each(function() {
				self._refreshWindowButtonIcon.call($(this), self);
			});
		},

		_refreshWindowButtonIcon: function(self) {
			// noinspection JSUnusedLocalSymbols
			var $this = $(this), button = $this.attr('data-window-id'), group = $this.attr('data-group-name'), icon, title;

			if ($this.is('.' + self.classes.uiButton)) {
				// get icon and title from window
				// noinspection JSJQueryEfficiency
				icon = $('#' + button).window('option', 'icons.main');
				// noinspection JSJQueryEfficiency,JSUnusedAssignment
				title = $('#' + button).window('option', 'title');

				if (!$this.hasClass(self.classes.uiButton)) {
					return;
				}

				$this.button('option', 'text', !self.options.windowButtonsIconsOnly);

				// because of "icons.primary", single setter cannot be used
				if (icon.indexOf('/') !== -1 || icon.indexOf('.') !== -1) {
					$this.button('option', 'icons.primary', self.classes.uiIconBlank);
					// noinspection JSUnresolvedFunction
					$this.children('.' + self.classes.uiButtonIconPrimary).first().css({
						'background-image': 'url(' + icon + ')',
						'background-repeat': 'no-repeat',
						'background-position': 'center',
						'background-size': 'cover'
					});
				} else {
					$this.button('option', 'icons.primary', self.options.windowButtonsIconsOnly ? icon || self.classes.uiIconBlank : icon);
				}
			} else if ($this.is('.' + self.classes.uiMenuItem)) {
				var $window = $('#' + $this.attr('data-window-id'));
				icon = $window.window('option', 'icons.main');

				// replace text node with window title
				$this.find('a').contents().filter(function() {
					return this.nodeType === 3;
				}).first()[0].nodeValue = $window.window('title');

				$this.children('span.' + self.classes.uiIcon).remove();

				if (icon.indexOf('/') !== -1 || icon.indexOf('.') !== -1) {
					$this.prepend($('<span></span>').css({
						'background-image': 'url(' + icon + ')',
						'background-repeat': 'no-repeat',
						'background-position': 'center',
						'background-size': 'cover'
					}).addClass(this.classes.uiIcon));
				} else {
					$this.prepend($('<span></span>').addClass(self.classes.uiIcon + ' ' + (icon ? icon : self.classes.uiIconBlank)));
				}
			}
		},

		_setwindowButtonsIconsOnlyClass: function() {
			this.$elem.toggleClass(this.classes.windowButtonsIconsOnly, this.options.windowButtonsIconsOnly);
		},

		// create custom styles for various subordinates
		_createStyles: function(settings) {
			var destroy = settings && settings.destroy;

			// select the old styles
			var $oldStyles = $('style[type="text\/css"]' + '[data-taskbar-uuid="' + this.uuid + '"]');

			if (!destroy) {
				// create new element
				var $styles = $('<style></style>').attr('type', 'text/css').attr('data-taskbar-uuid', this.uuid).appendTo('body');

				// get background-image for icons in default state
				var bgUrl = this._styleIndicator('.' + this.classes.uiStateDefault + ' > .' + this.classes.uiIcon, 'backgroundImage').backgroundImage,
					bg = '{background-image:' + bgUrl + ';}',
					// because of html structure not anticipated by jQuery UI,
					// we have to force some buttons to have default classes,
					// because ther were inheriting active class from window on top
					windowButtons = '.' + this.classes.window + '[data-taskbar-uuid="' + this.uuid + '"]' + ' .' + this.classes.uiDialogTitlebar + '.' + this.classes.uiStateActive + ':not(.' + this.classes.uiStateDefault + ')' + ' .' + this.classes.uiButton + ' .' + this.classes.uiButtonIconPrimary + bg,
					menuWindowClose = '';

				// jQuery UI since version 1.11 would also need
				// default styles for button in menus
				if ($.ui.menu && parseFloat($.ui.menu.prototype.version) >= 1.11) {
					menuWindowClose = '.' + this.classes.taskbar + '[data-taskbar-uuid="' + this.uuid + '"]' + ' .' + this.classes.windowGroupElement + ' .' + this.classes.uiButtonIconPrimary + ':not(:hover)' + bg;
				}

				var iframes = '';

				var self = this;

				var computed = window.getComputedStyle($('body')[0]);

				var pf = parseFloat;

				var bodyMargins = {
					horizontal: Math.floor(pf(computed.marginLeft) + pf(computed.marginRight)),
					vertical: Math.floor(pf(computed.marginTop) + pf(computed.marginBottom))
				};

				// create styles for iframes, and account for body margins
				$.each([true, false], function(index, horizontal) {
					iframes += '.' + self.classes['resizeIframe' + (horizontal ? 'Horizontal' : 'Vertical')] + '{';

					$.each(['-webkit-', '-moz-', ''], function(index2, prefix) {
						iframes += (horizontal ? 'width:' : 'height:') + prefix + 'calc(100% - ' + (horizontal ? bodyMargins.horizontal : bodyMargins.vertical) + 'px);';
					});

					iframes += '}';
				});

				// apply new styles
				$styles.text(windowButtons + menuWindowClose + iframes);
			}

			// only now we can destroy old styles after new styles
			// are present in the DOM, otherwise some ugly blinks can occur
			$oldStyles.remove();
		},

		// shortcut for positioning window groups
		_positionTaskbarWindowGroup: function(options) {
			var position = this._menuPosition({
				of: options.$group,
				elem: options.$menu
			});

			options.$menu.position(position);
		},

		// create window containment and window copy - those are single dom objects,
		// shared by all taskbars - they're created by the first taskbar widget
		// initialized, and removed by the last taskbar widget destroyed
		_createWindowsContainment: function() {
			this.$windowsContainment = $('div.' + this.classes.windowsContainment);
			this.$windowCopy = $('div.' + this.classes.windowCopy);

			// create window containment if it wasn't found
			if (!this.$windowsContainment.length) {
				this.$windowsContainment = this._factory('windowsContainment').appendTo('body');
			}

			// create window copy if it wasn't found
			if (!this.$windowCopy.length) {
				this.$windowCopy = this._factory('windowCopy').appendTo('body');
			}

			// keep count of taskbar instances
			var count = this.$windowsContainment.data(this._cnst.dataPrefix + 'taskbars') || 0;

			this.$windowsContainment.data(this._cnst.dataPrefix + 'taskbars', ++count);
		},

		_destroyWindowsContainment: function() {
			var count = this.$windowsContainment.data(this._cnst.dataPrefix + 'taskbars');

			// decrease number if taskbar instances by 1
			this.$windowsContainment.data(this._cnst.dataPrefix + 'taskbars', --count);

			// destroy containment and window copy if there's no taskbar left
			if (count === 0) {
				this.$windowsContainment.remove();
				this.$windowCopy.remove();
			}
		},

		// return list of taskbars on each edge
		_getTaskbarList: function() {
			return {
				top: $('.' + this.classes.taskbarHorizontal + '.' + this.classes.taskbarStickTop + ':not(.' + this.classes.droppable + ')'),
				left: $('.' + this.classes.taskbarVertical + '.' + this.classes.taskbarStickLeft + ':not(.' + this.classes.droppable + ')'),
				right: $('.' + this.classes.taskbarVertical + '.' + this.classes.taskbarStickRight + ':not(.' + this.classes.droppable + ')'),
				bottom: $('.' + this.classes.taskbarHorizontal + '.' + this.classes.taskbarStickBottom + ':not(.' + this.classes.droppable + ')')
			};
		},

		// calculates containment applied later to all windows;
		// containment is shared along all taskbar instances
		// because windows shouldn't overlay any taskbar that is visible to user
		_resizeWindowsContainment: function() {
			// inner window dimensions
			var windowsContainment = this._getContainmentInner();

			var margins = this._getMaxTaskbarsMargins();

			windowsContainment.top = margins.top;
			windowsContainment.left = margins.left;

			// height and width has to be lowered by the sum of margins
			// from particular axis
			windowsContainment.width -= margins.x;
			windowsContainment.height -= margins.y;

			// cache the margins, they'll be used by other functions
			this.$windowsContainment.css(windowsContainment).data(this._cnst.dataPrefix + 'taskbar-margins', margins);

			this.$windowCopy.css(this._getContainmentInner());
		},

		_getMaxTaskbarsMargins: function() {
			// noinspection JSUnusedAssignment
			var self = this,
				// list of all taskbar
				$taskbarList = this._getTaskbarList(),
				// object of empty zero's for every edge
				taskbarsMargins = this._zeroDirections(),
				viewportMargins = $.extend(true, {}, this.options.viewportMargins),
				margins = {};

			// itterate over taskbars sticking to every edge of window
			$.each($taskbarList, function(edge, $taskbars) {
				var dimensions = [];

				// ignore autohiding taskbars
				//- they overlay windows when they are visible
				$taskbars = $taskbars.not('.' + self.classes.autoHide);

				$taskbars.each(function() {
					var horizontal = $.inArray(edge, ['top', 'bottom']) > -1, $this = $(this);

					// push dimensions to array, either height of horizontal
					// taskbars or width of vertical taskbars
					dimensions.push(horizontal ? $this.outerHeight() : $this.outerWidth());
				});

				// if there's anything, exchange previous zero value of current edge
				// for the highest value of all taskbars
				if (dimensions.length) {
					taskbarsMargins[edge] = Math.max.apply(null, dimensions);
				}
			});

			margins = this._viewportMarginsRecalculate(viewportMargins, taskbarsMargins);

			return margins;
		},

		_viewportMarginsRecalculate: function(viewportMargins, taskbarsMargins) {
			var margins = {}, useTaskbarsViewportMargins;

			$.each(viewportMargins, function(edge, config) {
				// decide weather we should use options or rely on calculations
				useTaskbarsViewportMargins = config[1] === 'correct' && taskbarsMargins[edge] !== 0 || taskbarsMargins[edge] < config[0] && taskbarsMargins[edge] !== 0 && config[1] === 'correctDown' || taskbarsMargins[edge] > config[0] && config[1] === 'correctUp';

				useTaskbarsViewportMargins = useTaskbarsViewportMargins && config[1] !== 'correctNone';

				// apply margins
				margins[edge] = useTaskbarsViewportMargins ? taskbarsMargins[edge] : config[0];
			});

			margins.y = margins.top + margins.bottom;
			margins.x = margins.left + margins.right;

			return margins;
		},

		_trigger: function(name, event, ui) {
			// extend ui by useful information
			$.extend(ui, {
				instance: this,
				$taskbar: this.$elem
			});

			return this._super(name, event, ui);
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
		// for example during refresh
		_bindInternal: function(name, fn) {
			this._cache.internalCallbacks[name] = fn;
		},

		// trigger events for subordinates
		_triggerBindedElementEvent: function(options) {
			var ui = {};

			ui.autoOpen = this._cache.progress.menuAutoOpenOnBrowse;

			if (options.type === 'elementOpen' || options.type === 'elementClose') {
				ui.$element = options.menu;
				ui.$button = options.button;

				if (options.type === 'elementClose') {
					ui.closeByOpen = !!options.closeByOpen;
				}
			}

			if (options.type === 'menuItemFocus' || options.type === 'menuItemBlur') {
				// ui.$item is an empty jQuery object
				// if options.type === "menuItemBlur"
				ui.$item = options.item;
				ui.$button = options.button;
				ui.$menu = options.menu;
			}

			// this little trick allow us to have blured menu item in ui object,
			// the item that jQuery UI Menu does not provide for some reason
			if (options.type === 'menuItemFocus') {
				this._cache.lastMenuItemFocus = ui.$item;
			}

			if (options.type === 'menuItemBlur') {
				ui.$item = this._cache.lastMenuItemFocus;
			}

			return this._trigger(options.type, options.event, ui);
		},

		_refreshWindowsPosition: function(options) {
			// refresh position of windows binded only to current taskbar
			// refresh position of all windows binded to all taskbars present
			var $windows = options && options.own ? this.windows() : $('.' + this.classes.window + ' .' + this.classes.windowContent);

			// that's not really a likely case that $.emuos.window don't exists
			// at this point, but some tests would fail without this fix
			// - the one that set $.emuos.window to null for a short period of time
			// to test debug messages
			if (!$.emuos.window) {
				return;
			}

			var prototype = $.emuos.window.prototype;

			// use window prototype to sort by z-index
			$windows = prototype._sortByZIndex.call({
				_cnst: {
					lowestPossibleZIndex: prototype._cnst.lowestPossibleZIndex
				}
			}, $windows.parent(), 'asc').children('.' + this.classes.windowContent);

			var windowOptions = {};

			// some optimization to not to trigger refreshPosition
			// when it's not really needed - that's just a suggestion
			// that will be decided by each window instance separatelly
			if (options && options.skipFitting) {
				windowOptions.skipOnFit = true;
			}

			$windows.each(function() {
				$(this).window('refreshPosition', windowOptions);
			});
		},

		// refresh data-taskbar-uuid when uuid changed
		_refreshWindowsTaskbarId: function() {
			var self = this;

			this.windows().each(function() {
				var $this = $(this);
				var instance = $this.data(self._cnst.dataPrefix + 'window');
				// overlay could be null, but it doesn't hurt
				$this.add(instance.overlay).attr('data-taskbar-uuid', this.uuid);
			});
		},

		// refresh position of window binded to current taskbar
		_refreshOwnWindowsPosition: function(options) {
			if (!options) {
				options = {};
			}

			this._refreshWindowsPosition($.extend({
				own: true
			}, options));
		},

		// refresh containment of windows binded to current taskbar
		_refreshWindowsContainment: function(options) {
			var self = this;
			$.each(this._cache.windows, function(index, $elem) {
				var instance = $elem.data(self._cnst.dataPrefix + 'window');

				if (instance) {
					instance._setContainment();

					if (!options || options.refreshPosition !== false) {
						instance.refreshPosition();
					}
				}
			});
		},

		// translates current taskbar position to the direction in which start menu
		// arrow should point, that is, to the center of the screen
		_translatePosition: function(options) {
			return this._cache.horizontal ? this._cache.stickVertical === 'top' ? 's' : 'n' : this._cache.stickHorizontal === 'left' ? 'e' : 'w';
		},

		// helper function
		_zeroDirections: function() {
			return {
				top: 0,
				left: 0,
				right: 0,
				bottom: 0
			};
		},

		// array of edges and their neighbours
		_neighbouringEdges: function() {
			return {
				top: ['left', 'right'],
				right: ['top', 'bottom'],
				bottom: ['right', 'left'],
				left: ['bottom', 'top']
			};
		},

		// function for calculating Levenshtein distance, used for
		// suggesting correct option and event and unknown options and events
		// are passed, with some code removed, and also reformatted
		// source: http://phpjs.org/functions/levenshtein/
		// license: https://github.com/kvz/phpjs/blob/master/LICENSE.txt
		_levenshtein: function(s1, s2) {
			if (s1 === s2) {
				return 0;
			}

			var l1 = s1.length;
			var l2 = s2.length;

			if (l1 === 0) {
				return l2 * 1;
			}

			if (l2 === 0) {
				return l1 * 1;
			}

			s1 = s1.split('');
			s2 = s2.split('');

			var p1 = new Array(l2 + 1);
			var p2 = new Array(l2 + 1);

			var i1, i2, c0, c1, c2, tmp;

			for (i2 = 0; i2 <= l2; i2++) {
				p1[i2] = i2;
			}

			for (i1 = 0; i1 < l1; i1++) {
				p2[0] = p1[0] + 1;

				for (i2 = 0; i2 < l2; i2++) {
					c0 = p1[i2] + ((s1[i1] === s2[i2]) ? 0 : 1);
					c1 = p1[i2 + 1] + 1;

					if (c1 < c0) {
						c0 = c1;
					}

					c2 = p2[i2] + 1;

					if (c2 < c0) {
						c0 = c2;
					}

					p2[i2 + 1] = c0;
				}

				tmp = p1;
				p1 = p2;
				p2 = tmp;
			}

			c0 = p1[l2];

			return c0;
		},

		// test if particular widget from jQuery UI is in given version;
		// used in deciding behaviour/hacks/flow
		_versionOf: function(widget, operator, compare) {
			var version = (widget ? $.ui[widget] : $.ui).version.split('.'), compareTo = compare.split('.'), results = [];

			$.each(compareTo, function(index, part) {
				var againsts = parseInt(part, 10), current = parseInt(version[index], 10);

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

		// return staskbar instance for a given item
		_taskbarInstance: function($item) {
			var $taskbar = $item.closest('.' + this.classes.taskbar);
			return $taskbar.data(this._cnst.dataPrefix + 'taskbar');
		},

		// extends native jQuery position/offset object
		// by width, height, right and bottom
		_extendedPosition: function(options) {
			if (!this) {
				return {};
			}

			var $this = $(this);

			if (!$this.length) {
				return {};
			}

			// use offset or position, depending on setting
			var position = options && (options.offset || options === 'offset') ? $this.offset() : $this.position();

			position.height = $this.outerHeight();
			position.width = $this.outerWidth();

			// bottom and right are simply the other edges of element
			position.bottom = position.height + position.top;
			position.right = position.width + position.left;

			return position;
		},

		// http://www.2ality.com/2013/10/typeof-null.html
		_isRealObject: function(obj) {
			return typeof obj === 'object' && obj !== null;
		},

		_isRealEmptyObject: function(obj) {
			return ($.isEmptyObject(obj) || (obj.length === 1 && obj.__proto__)) && this._isRealObject(obj);
		},

		// an idea borrowed from
		// http://davidwalsh.name/device-state-detection-css-media-queries-javascript
		// this function will take selector (not every possible one,
		// just simple elem.parent-class > elem2.child-class etc.) and create
		// element that will match that selector, after which a computed style
		// of that element can be accessed; this is useful for getting colors
		// and other properties from elements that are part of jQuery UI themes,
		// but are not present in the DOM
		_styleIndicator: function(className, keys) {
			className = className.split(' > ');

			var elems = [], requestedStyles = {}, subject, parent, thisIsSubject, subjectSet;

			$.each(className, function(index, value) {
				// the default tag is div, but it can later be changed
				var tagName = 'div';

				var dollarAt = value.indexOf('$');

				// is element start with a dollar, that's the element
				// we want to process, threat this as selector subject similiar
				// to what's proposed in CSS4 specification
				// at http://www.w3.org/TR/2011/WD-selectors4-20110929/#subject
				if (dollarAt === 0) {
					thisIsSubject = true;
					value = value.substr(1);
				}

				// a classname without preceding dot is also acceptable,
				// when no tag name is required
				var dotAt = value.indexOf('.');

				if (dotAt !== -1) {
					// if tag was present before the dot, set it,
					// otherwise stick to the default "div" tag
					tagName = value.substr(0, dotAt) || tagName;
					value = value.substr(dotAt + 1);
				}

				// create element with the class name and tag name
				var elem = document.createElement(tagName);
				elem.className = value;
				elems[index] = elem;

				// first element is inserted into body
				if (index === 0) {
					// parent is the element that later will be removed from DOM
					parent = elem;
					document.body.appendChild(elem);
					// any element after the first one is inserted into it's parent,
					// created in the previous loop
				} else {
					elems [index - 1].appendChild(elem);
				}

				// if that's the end of the loop, the current element
				// is the one we'll look into; alternativealy,
				// if currently parsed selector part contained a dollar sign,
				// current itteration contains selector subject
				if (!subjectSet && (thisIsSubject || index === className.length - 1)) {
					subject = elem;
					subjectSet = true;
				}
			});

			// get computed styles
			// noinspection JSUnusedAssignment
			var computedStyles = window.getComputedStyle(subject);

			// shortcut
			if (keys === 'borderColor') {
				keys = ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'];
			}

			// make sure it's an array
			if (typeof (keys) === 'string') {
				keys = [keys];
			}

			// return only particular properties
			for (var i in keys) {
				requestedStyles [keys [i]] = computedStyles [keys [i]];
			}

			if (typeof (keys) === 'undefined') {
				requestedStyles = computedStyles;
			}

			// cleanup
			// noinspection JSUnusedAssignment
			document.body.removeChild(parent);

			return requestedStyles;
		},

		_extractObjectsByKey: function(object, keys) {
			var newObject = {};

			$.each(keys, function(index, value) {
				if (object[value]) {
					newObject[value] = object[value];
				}
			});

			return newObject;
		},

		// functions for fullscreen API,
		// taken almost witouth changes from http://davidwalsh.name/fullscreen
		// detect if the fullscreen is available in user browser
		_fullscreenAvailable: function() {
			var element = document.documentElement;
			// noinspection JSUnresolvedVariable
			var request = document.fullscreenEnabled || document.FullScreenEnabled || document.FullscreenEnabled || element.requestFullscreen || element.requestFullScreen || element.webkitRequestFullscreen || element.webkitRequestFullScreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.msRequestFullscreen || element.msRequestFullScreen;

			return !!request;
		},

		// detect if the browser is in fullscreen mode now;
		// this function will never fire if fullscreen is not available
		_fullscreenEnabled: function() {
			// noinspection JSUnresolvedVariable
			var fullscreenElement = document.fullscreenElement || document.FullScreenElement || document.FullscreenElement || document.mozFullScreenElement || document.mozFullscreenElement || document.webkitFullScreenElement || document.webkitFullscreenElement || document.msFullScreenElement || document.msFullscreenElement;

			return !!fullscreenElement;
		},

		// request fullscreen
		_fullscreenEnter: function() {
			var element = document.documentElement;

			// noinspection JSUnresolvedVariable
			var request = element.requestFullscreen || element.requestFullScreen || element.webkitRequestFullscreen || element.webkitRequestFullScreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.msRequestFullscreen || element.msRequestFullScreen;

			if (request) {
				request.call(element);
			} else if (typeof window.ActiveXObject !== 'undefined') {
				//for Internet Explorer
				var wscript = new ActiveXObject('WScript.Shell');

				if (wscript !== null) {
					// noinspection JSUnresolvedFunction
					wscript.SendKeys('{F11}');
				}
			}
		},

		// exits fullscreen
		_fullscreenLeave: function() {
			// noinspection JSUnresolvedVariable
			var exit = document.exitFullscreen || document.exitFullScreen || document.webkitExitFullscreen || document.webkitExitFullScreen || document.webkitCancelFullscreen || document.webkitCancelFullScreen || document.mozCancelFullscreen || document.mozCancelFullScreen || document.mozExitFullscreen || document.mozExitFullScreen || document.msExitFullscreen || document.msExitFullScreen;

			if (exit) {
				exit.call(document);
			} else if (typeof window.ActiveXObject !== 'undefined') {
				//for Internet Explorer
				var wscript = new ActiveXObject('WScript.Shell');

				if (wscript !== null) {
					// noinspection JSUnresolvedFunction
					wscript.SendKeys('{F11}');
				}
			}
		},

		_resizeEvent: function(force) {
			var self = this;

			// clearing timeout prevents multiple events resizes called
			// - we need only one
			clearTimeout(this._cache.timeouts.windowResize);
			// settings timeout prevents double resizes and boosts performance
			this._cache.timeouts.windowResize = setTimeout(function() {
				self._resizeEventDelayed(force);
			}, this._cnst.resizeDelay);
		},

		_resizeEventDelayed: function(force) {
			var self = this;
			var c = this._cache.resizeContainment;
			var cc = this._getContainment();
			// fire resizeEvent if the window dimensions changed after last time
			if ((c && (c.width !== cc.width || c.height !== cc.height)) || force === true) {
				self._cache.resizeContainment = cc;
				self._cache.resizeCausesRefresh = true;
				$(window).trigger('resize', {
					// pass and argument so only window resize events triggered here
					// are passed to namespaced window resize event
					// for current taskbar (see: _bindWindowsEvents)
					caller: 'taskbar-iframe'
				});
				self._cache.resizeCausesRefresh = false;
			}
		},

		// an idea borrowed from https://gist.github.com/OrganicPanda/8222636
		// and rewritten for jQuery
		_resizeIframeListener: function() {
			if ($('.' + this.classes.resizeIframeHorizontal).length) {
				return;
			}

			var self = this;

			self._cache.resizeContainment = self._getContainment();

			$.each([true, false], function(index, horizontal) {
				// Create an invisible iframes
				var $iframe = $('<iframe></iframe>').prependTo('body').addClass(self.classes.resizeIframe + ' ' + self.classes['resizeIframe' + (horizontal ? 'Horizontal' : 'Vertical')]);

				// original comment from
				// https://gist.github.com/OrganicPanda/8222636
				// "The trick here is that because this iframe has 100% width
				// it should fire a window resize event when anything causes it
				// to resize (even scrollbars on the outer document)"
				$iframe[0].contentWindow.addEventListener('resize', function() {
					self._resizeEvent();
				});

				// Trident won't fire iframe resize event first time,
				// so it has to be fired manually
				if (window.navigator.userAgent.match(/Trident/)) {
					self._bindInternal('afterRefresh', function() {
						// with true parameter the event is forced to fire,
						// otherwise it would fire only
						// if inner window size really changed
						self._resizeEvent(true);
					});
				}
			});
		},

		// https://gist.github.com/stucox/5231211
		// returns MutationObserver or false if not MutationObserver
		// is available in the browser
		_MutationObserver: function() {
			var prefixes = ['', 'WebKit', 'Moz', 'O', 'Ms'];

			for (var i = 0; i < prefixes.length; i++) {
				if (prefixes[i] + 'MutationObserver' in window) {
					return window[prefixes[i] + 'MutationObserver'];
				}
			}

			return false;
		},

		// MutationObserver is potentially a performance issue,
		// so it's better to disconnect them once they job is done
		_disconnectObservers: function(keyy) {
			for (var i in this._cache.mutationObservers [keyy]) {
				// noinspection JSUnfilteredForInLoop
				this._cache.mutationObservers [keyy][i].disconnect();
			}

			this._cache.mutationObservers [keyy] = [];
		},

		_getWindowScroll: function() {
			return {
				x: $(window).scrollLeft(),
				y: $(window).scrollTop()
			};
		},

		// copies css from one element into another;
		// if no source element is present, properties are nullified
		_copyStyles: function(options) {
			var string = typeof options.from === 'string';

			// make single property into an array
			if (typeof options.properties === 'string') {
				options.properties = [options.properties];
			}

			// if it's selector, create elements that matches it,
			// then retrieve properties we're interested in
			if (string) {
				var props = this._styleIndicator(
					options.from, options.properties
				);
			}

			$.each(options.properties, function(index, value) {
				// copy from created element
				if (string) {
					options.to.css(value, props [value]);
					// or copy from passed element
				} else if (options.from) {
					options.to.css(value, options.from.css(value));
					// or nullify if no element was passed as source
				} else {
					options.to.css(value, '');
				}
			});
		},

		// destroy menus matching the selector
		_destroyMenus: function(selector) {
			var self = this;

			this.$elem.find(selector).each(function() {
				var $this = $(this);

				if ($this.hasClass(self.classes.uiMenu)) {
					$this.menu('destroy');
				}

				// nulify styles set previously
				self._copyStyles({
					to: $this,
					properties: ['display', 'top', 'left']
				});
			});
		},

		/* public methods */
		// blurs windows binded to this taskbar
		blurWindows: function() {
			this._blurWindows();
		},

		// return button for a passed element
		button: function($elem) {
			return this._button($elem);
		},

		// hide taskbar with "autoHide": true,
		// with optional duration
		hide: function(duration) {
			this._hide(duration);
		},

		hideSubordinates: function() {
			this._hideAll({
				blurWindows: false
			});
		},

		i18n: function(translation, keys, language) {
			return this._i18n(translation, keys, language);
		},

		minimizeAll: function() {
			this._minimizeAll();
		},

		// public method that refreshes taskbar
		refresh: function() {
			if (this._cache.suppressEvents === false) {
				if (this._trigger('beforeRefresh') === false) {
					return;
				}
			}

			this.hideSubordinates();
			this._initialize();

			// this event is called once on creation, only on IE,
			// and only when window internal size changes
			this._triggerInternal('afterRefresh');

			if (this._cache.suppressEvents === false) {
				this._trigger('refresh');
			}
		},

		// show taskbar with "autoHide": true,
		// with optional duration
		show: function(duration) {
			this._show(duration);
		},

		// public method returning windows as jQuery collection
		windows: function() {
			return this._windows();
		},

		// return elem taskbar was build upon
		widget: function() {
			return this.$elem;
		},

		// generate debug: there's no enable/disable methods for now,
		// and there might never be, as it would probably make no sense;
		// this method is implemented for compability with jQuery UI widgets API
		enable: function() {
			this._debugLogAdd('Method "enable" is not implemented.', 1, 2);
		},

		// generate debug: there's no enable/disable methods for now,
		// and there might never be, as it would probably make no sense;
		// this method is implemented for compability with jQuery UI widgets API
		disable: function() {
			this._debugLogAdd('Method "disabled" is not implemented.', 1, 2);
		},

		// checks for invalid options and events
		_checkForInvalidOptions: function(options, key, initialization) {
			// use options prototype if set; undefined -use taskbar prototype
			var proto = typeof options === 'object' ? options : $.emuos.taskbar.prototype.options;

			var protoKeys = Object.keys(proto);

			if (typeof key === 'string' && $.inArray(protoKeys, key) > -1) {
				return;
			}

			var keyKeys;

			// either validate single option name or object of options
			if (typeof key === 'object') {
				keyKeys = Object.keys(key);
			} else {
				keyKeys = [key];
			}

			var protoKeysCompare = [];

			// compare lower-cased strings,
			// so things like debuglogadd instead of debugLogAdd,
			// don't generate errors
			$.each(protoKeys, function(index, protoKey) {
				protoKeysCompare[index] = protoKey.toLowerCase();
			});

			// check for invalid options
			var diff = keyKeys.filter(function(i) {
				return protoKeysCompare.indexOf(i.toLowerCase()) === -1;
			});

			// empty diff means there are not invalid options
			if (!diff.length) {
				return;
			}

			var levenshteins = [];
			var invalidNames = [];
			var self = this;

			// for every option/event name that wasn't recognized,
			// calculate Levenshtein distance and prepend it to the list
			$.each(diff, function(index, elem) {
				levenshteins[index] = {};

				$.each(protoKeys, function(index2, elem2) {
					levenshteins[index][elem2] = self._levenshtein(elem2, elem);
					invalidNames[index] = elem;
				});
			});

			var min = 100;

			// itterate over calculated distances to find best matches
			$.each(levenshteins, function(index, set) {
				var matches = [], bestMatches;

				$.each(set, function(index2, elem2) {
					var withPadding = '"' + index2 + '"';

					// if previous matches were not as good as current,
					// delete them and start fresh with current match
					if (elem2 < min) {
						min = elem2;
						matches = [withPadding];
					}

					// if current match is as good as matches we already have,
					// prepend it to the list of best matches
					if (elem2 === min && $.inArray(withPadding, matches) === -1) {
						matches.push(withPadding);
					}
				});

				if (matches.length) {
					// build list of matches
					if (matches.length > 1) {
						var last = matches.pop();
						bestMatches = matches.join(', ');
						bestMatches += ', or ' + last;
					} else {
						// take single best match
						bestMatches = matches[0];
					}
				}

				// generate debug with info if it was set on widget initialization
				// or later, and optionally, with findings of Levenshtein distance
				// calculation
				self._debugLogAdd('Unkown option or event "' + invalidNames[index] + '"' + (initialization ? ' set on initialization.' : '.') + (matches.length ? ' Did you mean ' + bestMatches + '?' : ''), 1, 2);
			});
		},

		// cache previous option value
		_beforeSetOption: function(key) {
			this._cache.optionSetter.previousValue = this.options [key];
		},

		_afterSetOption: function(key, value) {
			var previousValue = this._cache.optionSetter.previousValue, ui = {};

			// trigger language change if language really changed
			if (key === 'language' && value !== previousValue) {
				ui.originalLanguage = previousValue;
				ui.language = value;

				this._trigger('languageChange', {}, ui);
			}
		},

		_setOption: function(key, value) {
			// noinspection JSUnusedLocalSymbols
			var self = this;

			this._checkForInvalidOptions(undefined, key);
			this._beforeSetOption(key);

			this._superApply(arguments);

			// debug options and try to fix some of them before applying
			this._debugOptions();

			if (key === 'draggable' || key === 'draggableBetweenEdges' || key === 'dropOnExisting') {
				this._setDraggable();
				this._setDroppable();
			} else if (key === 'windowButtonsSortable') {
				this._setSortableWindowButtons();
			} else if (key === 'language' || key === 'fallbackLanguage' || key === 'languages' || key === 'localization') {
				// refresh everything: there's no easy way to determine what
				// has been affected by new localization, language,
				// fallback language or by changing available languages list
				this._debugLocalization();
				this._languageChange();
				this._refresh();
			} else if (key === 'icons') {
				// there's no easy way to determine which icons has changed,
				// so the need to refresh everything
				this._refreshGroupIcons();
				this._refreshButtonIcons();
				this._setClockWidth();
			} else if (key === 'windowButtonsIconsOnly') {
				this._setwindowButtonsIconsOnlyClass();
				this._refreshGroupIcons();
				this._refreshwindowButtonsIcons();
			} else if (key === 'buttonsTooltips') {
				this._setButtonsTooltips();
			} else if (key === 'windowsContainment') {
				this._refreshWindowsContainment();
				this._refreshOwnWindowsPosition();
			} else if (key === 'orientation' || key === 'horizontalWidth' || key === 'horizontalStick' || key === 'horizontalRows'|| key === 'horizontalRowHeight' || key === 'horizontalRowsMin' || key === 'horizontalRowsMax' || key === 'verticalHeight' || key === 'verticalStick' || key === 'verticalColumns' || key === 'verticalColumnWidth' || key === 'verticalColumnsMin' || key === 'verticalColumnsMax' || key === 'viewportMargins') {
				// those options potentially change everything on the page,
				// so full refresh is probably required;
				// although there sure is a potential for optimization
				this._refresh();
			} else if (key === 'windowsInitialZIndex') {
				this._refreshWindowsPosition();
			} else if (key === 'languageSelect' || key === 'minimizeAll' || key === 'toggleFullscreen' || key === 'clock' || key === 'networkMonitor' || key === 'clockShowDatepicker' || key === 'systemButtonsOrder') {
				this._buildSystemButtons();
			} else if (key === 'menuAutoOpenOnBrowse') {
				this._bindMenusAutoOpen();
			} else if (key === 'minimizeAllHoverOpaqueWindows') {
				this._setMinimizeAllHoverOpaqueWindows();
			} else if (key === 'buttons') {
				this._refresh();
				this._refreshButtonIcons();
				this._refreshWindowButtonsContainer();
			} else if (key === 'buttonsOrder') {
				this._rebuildTaskbarButtons();
				this._refreshWindowButtonsContainer();
			} else if (key === 'startButtons') {
				this._rebuildTaskbarStartButtons();
				this._refreshWindowButtonsContainer();
			} else if (key === 'resizable' || key === 'resizableHandleOverflow') {
				this._setResizable();
			} else if (key === 'resolveCollisions') {
				this._refresh();
			} else if (key === 'autoHide') {
				this._refresh();
			} else if (key === 'durations') {
				// changing durations during animations is just not worth
				// the trouble, so let's do nothing and apply new duration
				// to animations that will start from now
				this._setButtonsTooltips();
			} else if (key === 'debug') {
				// debug will affect future actions, but there's nothing to replay
				// at the moment of settings this option
			}

			this._afterSetOption(key, value);
		},

		_destroy: function() {
			var destroy = {
				destroy: true
			},
			self = this;

			var ui = {
				$windows: this.windows()
			};

			this._trigger('beforeDestroy', {}, ui);

			var $windows = this.windows();

			// refresh windows and generate debug warning if any windows are left
			if ($windows.length) {
				if (this._debugLogAdd('Windows were binbed upon calling "destroy".', 1, 0) !== false && this.options.debug.environment) {
					if (window.console) {
						console.log($windows);
					}
				}
			}

			this._buildTaskbarContent(destroy);

			// destroy draggable, if any
			this.options.draggable = false;
			this._setDraggable();
			this._setDroppable();

			// destroy resizable, if any
			this.options.resizable = false;
			this._setResizable(destroy);

			// destroy autohide
			this.options.autoHide = false;
			this._initAutoHide();

			// destroy custom styles
			this._createStyles(destroy);

			// general cleanup of classes, data, and attributes
			// revert previous inline CSS
			this.$elem.removeUniqueId().removeClass(this.classes.taskbar + ' ' + this.classes.empty + ' ' + this.classes.uiWidgetContent).removeAttr('data-taskbar-uuid').removeData(this._cnst.dataPrefix + 'taskbarNewWindowsCount').removeData(this._cnst.dataPrefix + 'taskbar').removeData(this._cnst.dataPrefix + 'taskbarEdge').attr('style', this._cache.inlineCSS);

			// remove helper iframes if no taskbars are left
			// noinspection JSJQueryEfficiency
			if ($('.' + this.classes.taskbar).length === 0) {
				$('.' + this.classes.resizeIframe).remove();
			}

			// we don't need those anymore
			clearInterval(this._cache.timeouts.autoHide);
			clearInterval(this._cache.timeouts.windowResize);

			this._destroyMenus('[data-menu-type=start]');

			this._removeTaskbarPositionClasses();
			// +
			this._refreshNeighbours();

			// noinspection JSJQueryEfficiency
			$('.' + this.classes.taskbar).each(function() {
				var instance = $(this).data(self._cnst.dataPrefix + 'taskbar');
				instance._refreshWindowsContainment();
			});

			this._destroyWindowsContainment();

			$(window).add($(document)).off('.' + this._cache.uep);

			// remove empty attributes
			$.each(['class', 'style'], function(index, attr) {
				if (self.$elem.attr(attr) === '') {
					self.$elem.removeAttr(attr);
				}
			});
		}
	});

	// allow extending prototype for all future instances at once,
	// or if "propagateToInstances" is set to true, affect both prototype
	// and the current instances
	$.emuos.taskbarSetup = function(propagateToInstances, options) {
		options = arguments.length === 1 ? propagateToInstances : options;

		if (propagateToInstances === true && arguments.length > 1) {
			$('.' + $.emuos.taskbar.prototype.classes.taskbar).taskbar('option', options);
		}

		var o = $.emuos.taskbar.prototype.options;

		return options ? $.extend(true, o, options) : o;
	};
})(jQuery);