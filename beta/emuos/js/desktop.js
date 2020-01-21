;(function ($, undefined) {
	'use strict';

	$.widget('emuos.desktop', {
		version: '@emuos-main-version',
		options: {
			/* options */
			iconClass: '',
			parent: ''
		},
		_cnst: {
			dataPrefix: 'emuos-',
			eventPrefix: 'desktop',
			naturalName: 'EmuOS',
			consolePrefix: 'EmuOS message',
			missingTranslation: 'undefined'
		},
		classes: {
			desktop: 'emuos-desktop',
			desktopPrefix: 'emuos-desktop-',
			desktopContainter: 'emuos-desktop-container',
			droppableContainer: 'emuos-desktop-droppable-container',
			droppable: 'emuos-desktop-droppable',
			draggableHelper: 'emuos-desktop-helper',
			draggableDragging: 'emuos-desktop-dragging',
			droppableOver: 'emuos-desktop-droppable-over',
			droppablePending: 'emuos-desktop-droppable-pending',
			desktopIcon: 'emuos-desktop-icon',
			desktopIconContent: 'emuos-icon-content',

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
			uiSortableHandle: 'ui-sortable-handle',
			uiTooltip: 'ui-tooltip',
			uiDialogContent: 'ui-dialog-content',
			uiDialogTitlebar: 'ui-dialog-titlebar',
			uiHasDatepicker: 'hasDatepicker',
			uiIcon: 'ui-icon',
			uiIconBlank: 'ui-icon-blank',
			uiSelected: 'ui-selected',
			uiSelectee: 'ui-selectee'
		},
		_create: function() {
			this.$elem = this.element;
			var self = this;

			if (!this.$elem.parents().length) {
				this.$elem.prependTo('body');
			}

			if (this.options.parent !== '' && $(this.options.parent).size()) {
				this.$elem.prependTo($(this.options.parent));
			}

			// tracks state of various elements of taskbar and holds
			// a bunch of calculated values and options
			this._cache = {
				inlineCSS: this.$elem.attr('style') || '',
				icons: {},
				uep: this._cnst.eventPrefix + this.uuid
			};

			// the basic classes, widget ID, and a unique id instante storage
			this.$elem.addClass(this.classes.desktop).attr('data-desktop-uuid', this.uuid).uniqueId().data(this._cnst.dataPrefix + 'desktop', this);

			this._cache.icons = this.$elem.children(this.options.iconClass);
			this._cache.icons.addClass(this.classes.desktopIcon);

			self.$elem.sortable({
				containment: 'parent',
				items: '> .' + self.classes.desktopIcon,
				opacity: 0.8,
				scroll: false,
				revert: true,
				helper: 'clone'
			}).selectable({
				filter: '> .' + self.classes.desktopIcon,
				tolerance: 'touch'
			});
		},
		// returns all icons
		_icons: function() {
			var $collection = $();

			// noinspection JSUnusedLocalSymbols
			$.each(this._cache.icons, function (index, elem) {
				var $icon = $('#' + index);

				if ($icon.length) {
					$collection = $collection.add($icon);
				}
			});

			return $collection;
		},
		// public method returning windows as jQuery collection
		icons: function() {
			return this._icons();
		},
		_destroy: function() {
			this.$elem.selectable('destroy');
		}
	});
})(jQuery);