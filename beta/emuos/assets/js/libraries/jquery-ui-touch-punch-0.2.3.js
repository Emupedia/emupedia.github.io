/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
(function ($) {

	var nav = window.navigator || {};
	var hasTouch = ('ontouchstart' in window) || (typeof nav.maxTouchPoints === 'number' && nav.maxTouchPoints > 0) || (typeof nav.msMaxTouchPoints === 'number' && nav.msMaxTouchPoints > 0);
	var hasPointer = typeof window.PointerEvent !== 'undefined';

	// Ignore browsers without touch/pointer support
	if (!hasTouch && !hasPointer) {
		return;
	}

	$.support.touch = hasTouch;

	var mouseProto = $.ui.mouse.prototype,
		_mouseInit = mouseProto._mouseInit,
		_mouseDestroy = mouseProto._mouseDestroy,
		touchHandled;

	/**
	 * Simulate a mouse event based on a corresponding touch event
	 * @param {Object} event A touch event
	 * @param {String} simulatedType The corresponding mouse event
	 */
	function simulateMouseEvent (event, simulatedType) {

		// Ignore multi-touch events
		if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
			return;
		}

		event.preventDefault();

		var touch = event.originalEvent.changedTouches[0],
			simulatedEvent = document.createEvent('MouseEvents');

		// Initialize the simulated mouse event using the touch event's coordinates
		simulatedEvent.initMouseEvent(
			simulatedType,    // type
			true,             // bubbles
			true,             // cancelable
			window,           // view
			1,                // detail
			touch.screenX,    // screenX
			touch.screenY,    // screenY
			touch.clientX,    // clientX
			touch.clientY,    // clientY
			false,            // ctrlKey
			false,            // altKey
			false,            // shiftKey
			false,            // metaKey
			0,                // button
			null              // relatedTarget
		);

		// Dispatch the simulated event to the target element
		event.target.dispatchEvent(simulatedEvent);
	}

	function simulatePointerMouseEvent(event, simulatedType) {
		var originalEvent = event.originalEvent || event;

		if (!originalEvent) {
			return;
		}

		var pointerType = originalEvent.pointerType;

		if (pointerType === 'mouse' || pointerType === 4) {
			return;
		}

		var simulatedEvent = document.createEvent('MouseEvents');

		simulatedEvent.initMouseEvent(
			simulatedType,
			true,
			true,
			window,
			1,
			originalEvent.screenX,
			originalEvent.screenY,
			originalEvent.clientX,
			originalEvent.clientY,
			false,
			false,
			false,
			false,
			0,
			null
		);

		event.target.dispatchEvent(simulatedEvent);
	}

	/**
	 * Handle the jQuery UI widget's touchstart events
	 * @param {Object} event The widget element's touchstart event
	 */
	mouseProto._touchStart = function (event) {

		var self = this;

		// Ignore the event if another widget is already being handled
		if (touchHandled || !self._mouseCapture(event.originalEvent.changedTouches[0])) {
			return;
		}

		// Set the flag to prevent other widgets from inheriting the touch event
		touchHandled = true;

		// Track movement to determine if interaction was a click
		self._touchMoved = false;

		// Simulate the mouseover event
		simulateMouseEvent(event, 'mouseover');

		// Simulate the mousemove event
		simulateMouseEvent(event, 'mousemove');

		// Simulate the mousedown event
		simulateMouseEvent(event, 'mousedown');
	};

	mouseProto._pointerStart = function(event) {
		var self = this;
		var originalEvent = event.originalEvent || event;

		if (!originalEvent || (originalEvent.pointerType === 'mouse' || originalEvent.pointerType === 4)) {
			return;
		}

		if (touchHandled || !self._mouseCapture(originalEvent)) {
			return;
		}

		touchHandled = true;
		self._touchMoved = false;
		simulatePointerMouseEvent(event, 'mouseover');
		simulatePointerMouseEvent(event, 'mousemove');
		simulatePointerMouseEvent(event, 'mousedown');
		event.preventDefault();
	};

	/**
	 * Handle the jQuery UI widget's touchmove events
	 * @param {Object} event The document's touchmove event
	 */
	mouseProto._touchMove = function (event) {

		// Ignore event if not handled
		if (!touchHandled) {
			return;
		}

		// Interaction was not a click
		this._touchMoved = true;

		// Simulate the mousemove event
		simulateMouseEvent(event, 'mousemove');
	};

	mouseProto._pointerMove = function(event) {
		var originalEvent = event.originalEvent || event;

		if (!originalEvent || (originalEvent.pointerType === 'mouse' || originalEvent.pointerType === 4)) {
			return;
		}

		if (!touchHandled) {
			return;
		}

		this._touchMoved = true;
		simulatePointerMouseEvent(event, 'mousemove');
		event.preventDefault();
	};

	/**
	 * Handle the jQuery UI widget's touchend events
	 * @param {Object} event The document's touchend event
	 */
	mouseProto._touchEnd = function (event) {

		// Ignore event if not handled
		if (!touchHandled) {
			return;
		}

		// Simulate the mouseup event
		simulateMouseEvent(event, 'mouseup');

		// Simulate the mouseout event
		simulateMouseEvent(event, 'mouseout');

		// If the touch interaction did not move, it should trigger a click
		if (!this._touchMoved) {

			// Simulate the click event
			simulateMouseEvent(event, 'click');
		}

		// Unset the flag to allow other widgets to inherit the touch event
		touchHandled = false;
	};

	mouseProto._pointerEnd = function(event) {
		var originalEvent = event.originalEvent || event;

		if (!originalEvent || (originalEvent.pointerType === 'mouse' || originalEvent.pointerType === 4)) {
			return;
		}

		if (!touchHandled) {
			return;
		}

		simulatePointerMouseEvent(event, 'mouseup');
		simulatePointerMouseEvent(event, 'mouseout');

		if (!this._touchMoved) {
			simulatePointerMouseEvent(event, 'click');
		}

		touchHandled = false;
		event.preventDefault();
	};

	/**
	 * A duck punch of the $.ui.mouse _mouseInit method to support touch events.
	 * This method extends the widget with bound touch event handlers that
	 * translate touch events to mouse events and pass them to the widget's
	 * original mouse event handling methods.
	 */
	mouseProto._mouseInit = function () {

		var self = this;

		self.element.on('touchstart.' + self.widgetName, $.proxy(self, '_touchStart'));
		self.element.on('touchmove.' + self.widgetName, $.proxy(self, '_touchMove'));
		self.element.on('touchend.' + self.widgetName + ' touchcancel.' + self.widgetName, $.proxy(self, '_touchEnd'));

		if (hasPointer) {
			self.element.on('pointerdown.' + self.widgetName, $.proxy(self, '_pointerStart'));
			self.element.on('pointermove.' + self.widgetName, $.proxy(self, '_pointerMove'));
			self.element.on('pointerup.' + self.widgetName + ' pointercancel.' + self.widgetName, $.proxy(self, '_pointerEnd'));
		}

		// Call the original $.ui.mouse init method
		_mouseInit.call(self);
	};

	/**
	 * Remove the touch event handlers
	 */
	mouseProto._mouseDestroy = function () {

		var self = this;

		self.element.off('touchstart.' + self.widgetName);
		self.element.off('touchmove.' + self.widgetName);
		self.element.off('touchend.' + self.widgetName + ' touchcancel.' + self.widgetName);

		if (hasPointer) {
			self.element.off('pointerdown.' + self.widgetName);
			self.element.off('pointermove.' + self.widgetName);
			self.element.off('pointerup.' + self.widgetName + ' pointercancel.' + self.widgetName);
		}

		// Call the original $.ui.mouse destroy method
		_mouseDestroy.call(self);
	};
})(jQuery);