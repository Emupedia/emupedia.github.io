/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "vs/base/browser/browser", "vs/base/browser/dom", "vs/base/common/async", "vs/base/common/event", "vs/base/common/lifecycle", "vs/base/common/platform", "vs/base/common/strings", "vs/editor/browser/controller/textAreaState", "vs/editor/common/core/selection", "vs/base/browser/canIUse"], function (require, exports, browser, dom, async_1, event_1, lifecycle_1, platform, strings, textAreaState_1, selection_1, canIUse_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CopyOptions = {
        forceCopyWithSyntaxHighlighting: false
    };
    var ReadFromTextArea;
    (function (ReadFromTextArea) {
        ReadFromTextArea[ReadFromTextArea["Type"] = 0] = "Type";
        ReadFromTextArea[ReadFromTextArea["Paste"] = 1] = "Paste";
    })(ReadFromTextArea || (ReadFromTextArea = {}));
    var TextAreaInputEventType;
    (function (TextAreaInputEventType) {
        TextAreaInputEventType[TextAreaInputEventType["none"] = 0] = "none";
        TextAreaInputEventType[TextAreaInputEventType["compositionstart"] = 1] = "compositionstart";
        TextAreaInputEventType[TextAreaInputEventType["compositionupdate"] = 2] = "compositionupdate";
        TextAreaInputEventType[TextAreaInputEventType["compositionend"] = 3] = "compositionend";
        TextAreaInputEventType[TextAreaInputEventType["input"] = 4] = "input";
        TextAreaInputEventType[TextAreaInputEventType["cut"] = 5] = "cut";
        TextAreaInputEventType[TextAreaInputEventType["copy"] = 6] = "copy";
        TextAreaInputEventType[TextAreaInputEventType["paste"] = 7] = "paste";
        TextAreaInputEventType[TextAreaInputEventType["focus"] = 8] = "focus";
        TextAreaInputEventType[TextAreaInputEventType["blur"] = 9] = "blur";
    })(TextAreaInputEventType || (TextAreaInputEventType = {}));
    /**
     * Every time we write to the clipboard, we record a bit of extra metadata here.
     * Every time we read from the cipboard, if the text matches our last written text,
     * we can fetch the previous metadata.
     */
    class InMemoryClipboardMetadataManager {
        constructor() {
            this._lastState = null;
        }
        set(lastCopiedValue, data) {
            this._lastState = { lastCopiedValue, data };
        }
        get(pastedText) {
            if (this._lastState && this._lastState.lastCopiedValue === pastedText) {
                // match!
                return this._lastState.data;
            }
            this._lastState = null;
            return null;
        }
    }
    InMemoryClipboardMetadataManager.INSTANCE = new InMemoryClipboardMetadataManager();
    /**
     * Writes screen reader content to the textarea and is able to analyze its input events to generate:
     *  - onCut
     *  - onPaste
     *  - onType
     *
     * Composition events are generated for presentation purposes (composition input is reflected in onType).
     */
    class TextAreaInput extends lifecycle_1.Disposable {
        constructor(host, textArea) {
            super();
            this._onFocus = this._register(new event_1.Emitter());
            this.onFocus = this._onFocus.event;
            this._onBlur = this._register(new event_1.Emitter());
            this.onBlur = this._onBlur.event;
            this._onKeyDown = this._register(new event_1.Emitter());
            this.onKeyDown = this._onKeyDown.event;
            this._onKeyUp = this._register(new event_1.Emitter());
            this.onKeyUp = this._onKeyUp.event;
            this._onCut = this._register(new event_1.Emitter());
            this.onCut = this._onCut.event;
            this._onPaste = this._register(new event_1.Emitter());
            this.onPaste = this._onPaste.event;
            this._onType = this._register(new event_1.Emitter());
            this.onType = this._onType.event;
            this._onCompositionStart = this._register(new event_1.Emitter());
            this.onCompositionStart = this._onCompositionStart.event;
            this._onCompositionUpdate = this._register(new event_1.Emitter());
            this.onCompositionUpdate = this._onCompositionUpdate.event;
            this._onCompositionEnd = this._register(new event_1.Emitter());
            this.onCompositionEnd = this._onCompositionEnd.event;
            this._onSelectionChangeRequest = this._register(new event_1.Emitter());
            this.onSelectionChangeRequest = this._onSelectionChangeRequest.event;
            this._host = host;
            this._textArea = this._register(new TextAreaWrapper(textArea));
            this._lastTextAreaEvent = 0 /* none */;
            this._asyncTriggerCut = this._register(new async_1.RunOnceScheduler(() => this._onCut.fire(), 0));
            this._textAreaState = textAreaState_1.TextAreaState.EMPTY;
            this._selectionChangeListener = null;
            this.writeScreenReaderContent('ctor');
            this._hasFocus = false;
            this._isDoingComposition = false;
            this._nextCommand = 0 /* Type */;
            this._register(dom.addStandardDisposableListener(textArea.domNode, 'keydown', (e) => {
                if (this._isDoingComposition &&
                    (e.keyCode === 109 /* KEY_IN_COMPOSITION */ || e.keyCode === 1 /* Backspace */)) {
                    // Stop propagation for keyDown events if the IME is processing key input
                    e.stopPropagation();
                }
                if (e.equals(9 /* Escape */)) {
                    // Prevent default always for `Esc`, otherwise it will generate a keypress
                    // See https://msdn.microsoft.com/en-us/library/ie/ms536939(v=vs.85).aspx
                    e.preventDefault();
                }
                this._onKeyDown.fire(e);
            }));
            this._register(dom.addStandardDisposableListener(textArea.domNode, 'keyup', (e) => {
                this._onKeyUp.fire(e);
            }));
            this._register(dom.addDisposableListener(textArea.domNode, 'compositionstart', (e) => {
                this._lastTextAreaEvent = 1 /* compositionstart */;
                if (this._isDoingComposition) {
                    return;
                }
                this._isDoingComposition = true;
                // In IE we cannot set .value when handling 'compositionstart' because the entire composition will get canceled.
                if (!browser.isEdgeOrIE) {
                    this._setAndWriteTextAreaState('compositionstart', textAreaState_1.TextAreaState.EMPTY);
                }
                this._onCompositionStart.fire();
            }));
            /**
             * Deduce the typed input from a text area's value and the last observed state.
             */
            const deduceInputFromTextAreaValue = (couldBeEmojiInput, couldBeTypingAtOffset0) => {
                const oldState = this._textAreaState;
                const newState = textAreaState_1.TextAreaState.readFromTextArea(this._textArea);
                return [newState, textAreaState_1.TextAreaState.deduceInput(oldState, newState, couldBeEmojiInput, couldBeTypingAtOffset0)];
            };
            /**
             * Deduce the composition input from a string.
             */
            const deduceComposition = (text) => {
                const oldState = this._textAreaState;
                const newState = textAreaState_1.TextAreaState.selectedText(text);
                const typeInput = {
                    text: newState.value,
                    replaceCharCnt: oldState.selectionEnd - oldState.selectionStart
                };
                return [newState, typeInput];
            };
            const compositionDataInValid = (locale) => {
                // https://github.com/Microsoft/monaco-editor/issues/339
                // Multi-part Japanese compositions reset cursor in Edge/IE, Chinese and Korean IME don't have this issue.
                // The reason that we can't use this path for all CJK IME is IE and Edge behave differently when handling Korean IME,
                // which breaks this path of code.
                if (browser.isEdgeOrIE && locale === 'ja') {
                    return true;
                }
                // https://github.com/Microsoft/monaco-editor/issues/545
                // On IE11, we can't trust composition data when typing Chinese as IE11 doesn't emit correct
                // events when users type numbers in IME.
                // Chinese: zh-Hans-CN, zh-Hans-SG, zh-Hant-TW, zh-Hant-HK
                if (browser.isIE && locale.indexOf('zh-Han') === 0) {
                    return true;
                }
                return false;
            };
            this._register(dom.addDisposableListener(textArea.domNode, 'compositionupdate', (e) => {
                this._lastTextAreaEvent = 2 /* compositionupdate */;
                if (compositionDataInValid(e.locale)) {
                    const [newState, typeInput] = deduceInputFromTextAreaValue(/*couldBeEmojiInput*/ false, /*couldBeTypingAtOffset0*/ false);
                    this._textAreaState = newState;
                    this._onType.fire(typeInput);
                    this._onCompositionUpdate.fire(e);
                    return;
                }
                const [newState, typeInput] = deduceComposition(e.data);
                this._textAreaState = newState;
                this._onType.fire(typeInput);
                this._onCompositionUpdate.fire(e);
            }));
            this._register(dom.addDisposableListener(textArea.domNode, 'compositionend', (e) => {
                this._lastTextAreaEvent = 3 /* compositionend */;
                if (compositionDataInValid(e.locale)) {
                    // https://github.com/Microsoft/monaco-editor/issues/339
                    const [newState, typeInput] = deduceInputFromTextAreaValue(/*couldBeEmojiInput*/ false, /*couldBeTypingAtOffset0*/ false);
                    this._textAreaState = newState;
                    this._onType.fire(typeInput);
                }
                else {
                    const [newState, typeInput] = deduceComposition(e.data);
                    this._textAreaState = newState;
                    this._onType.fire(typeInput);
                }
                // Due to isEdgeOrIE (where the textarea was not cleared initially) and isChrome (the textarea is not updated correctly when composition ends)
                // we cannot assume the text at the end consists only of the composited text
                if (browser.isEdgeOrIE || browser.isChrome) {
                    this._textAreaState = textAreaState_1.TextAreaState.readFromTextArea(this._textArea);
                }
                if (!this._isDoingComposition) {
                    return;
                }
                this._isDoingComposition = false;
                this._onCompositionEnd.fire();
            }));
            this._register(dom.addDisposableListener(textArea.domNode, 'input', () => {
                // We want to find out if this is the first `input` after a `focus`.
                const previousEventWasFocus = (this._lastTextAreaEvent === 8 /* focus */);
                this._lastTextAreaEvent = 4 /* input */;
                // Pretend here we touched the text area, as the `input` event will most likely
                // result in a `selectionchange` event which we want to ignore
                this._textArea.setIgnoreSelectionChangeTime('received input event');
                if (this._isDoingComposition) {
                    return;
                }
                const [newState, typeInput] = deduceInputFromTextAreaValue(/*couldBeEmojiInput*/ platform.isMacintosh, /*couldBeTypingAtOffset0*/ previousEventWasFocus && platform.isMacintosh);
                if (typeInput.replaceCharCnt === 0 && typeInput.text.length === 1 && strings.isHighSurrogate(typeInput.text.charCodeAt(0))) {
                    // Ignore invalid input but keep it around for next time
                    return;
                }
                this._textAreaState = newState;
                if (this._nextCommand === 0 /* Type */) {
                    if (typeInput.text !== '') {
                        this._onType.fire(typeInput);
                    }
                }
                else {
                    if (typeInput.text !== '') {
                        this._firePaste(typeInput.text, null);
                    }
                    this._nextCommand = 0 /* Type */;
                }
            }));
            // --- Clipboard operations
            this._register(dom.addDisposableListener(textArea.domNode, 'cut', (e) => {
                this._lastTextAreaEvent = 5 /* cut */;
                // Pretend here we touched the text area, as the `cut` event will most likely
                // result in a `selectionchange` event which we want to ignore
                this._textArea.setIgnoreSelectionChangeTime('received cut event');
                this._ensureClipboardGetsEditorSelection(e);
                this._asyncTriggerCut.schedule();
            }));
            this._register(dom.addDisposableListener(textArea.domNode, 'copy', (e) => {
                this._lastTextAreaEvent = 6 /* copy */;
                this._ensureClipboardGetsEditorSelection(e);
            }));
            this._register(dom.addDisposableListener(textArea.domNode, 'paste', (e) => {
                this._lastTextAreaEvent = 7 /* paste */;
                // Pretend here we touched the text area, as the `paste` event will most likely
                // result in a `selectionchange` event which we want to ignore
                this._textArea.setIgnoreSelectionChangeTime('received paste event');
                if (ClipboardEventUtils.canUseTextData(e)) {
                    const [pastePlainText, metadata] = ClipboardEventUtils.getTextData(e);
                    if (pastePlainText !== '') {
                        this._firePaste(pastePlainText, metadata);
                    }
                }
                else {
                    if (this._textArea.getSelectionStart() !== this._textArea.getSelectionEnd()) {
                        // Clean up the textarea, to get a clean paste
                        this._setAndWriteTextAreaState('paste', textAreaState_1.TextAreaState.EMPTY);
                    }
                    this._nextCommand = 1 /* Paste */;
                }
            }));
            this._register(dom.addDisposableListener(textArea.domNode, 'focus', () => {
                this._lastTextAreaEvent = 8 /* focus */;
                this._setHasFocus(true);
            }));
            this._register(dom.addDisposableListener(textArea.domNode, 'blur', () => {
                this._lastTextAreaEvent = 9 /* blur */;
                this._setHasFocus(false);
            }));
        }
        _installSelectionChangeListener() {
            // See https://github.com/Microsoft/vscode/issues/27216
            // When using a Braille display, it is possible for users to reposition the
            // system caret. This is reflected in Chrome as a `selectionchange` event.
            //
            // The `selectionchange` event appears to be emitted under numerous other circumstances,
            // so it is quite a challenge to distinguish a `selectionchange` coming in from a user
            // using a Braille display from all the other cases.
            //
            // The problems with the `selectionchange` event are:
            //  * the event is emitted when the textarea is focused programmatically -- textarea.focus()
            //  * the event is emitted when the selection is changed in the textarea programmatically -- textarea.setSelectionRange(...)
            //  * the event is emitted when the value of the textarea is changed programmatically -- textarea.value = '...'
            //  * the event is emitted when tabbing into the textarea
            //  * the event is emitted asynchronously (sometimes with a delay as high as a few tens of ms)
            //  * the event sometimes comes in bursts for a single logical textarea operation
            // `selectionchange` events often come multiple times for a single logical change
            // so throttle multiple `selectionchange` events that burst in a short period of time.
            let previousSelectionChangeEventTime = 0;
            return dom.addDisposableListener(document, 'selectionchange', (e) => {
                if (!this._hasFocus) {
                    return;
                }
                if (this._isDoingComposition) {
                    return;
                }
                if (!browser.isChrome || !platform.isWindows) {
                    // Support only for Chrome on Windows until testing happens on other browsers + OS configurations
                    return;
                }
                const now = Date.now();
                const delta1 = now - previousSelectionChangeEventTime;
                previousSelectionChangeEventTime = now;
                if (delta1 < 5) {
                    // received another `selectionchange` event within 5ms of the previous `selectionchange` event
                    // => ignore it
                    return;
                }
                const delta2 = now - this._textArea.getIgnoreSelectionChangeTime();
                this._textArea.resetSelectionChangeTime();
                if (delta2 < 100) {
                    // received a `selectionchange` event within 100ms since we touched the textarea
                    // => ignore it, since we caused it
                    return;
                }
                if (!this._textAreaState.selectionStartPosition || !this._textAreaState.selectionEndPosition) {
                    // Cannot correlate a position in the textarea with a position in the editor...
                    return;
                }
                const newValue = this._textArea.getValue();
                if (this._textAreaState.value !== newValue) {
                    // Cannot correlate a position in the textarea with a position in the editor...
                    return;
                }
                const newSelectionStart = this._textArea.getSelectionStart();
                const newSelectionEnd = this._textArea.getSelectionEnd();
                if (this._textAreaState.selectionStart === newSelectionStart && this._textAreaState.selectionEnd === newSelectionEnd) {
                    // Nothing to do...
                    return;
                }
                const _newSelectionStartPosition = this._textAreaState.deduceEditorPosition(newSelectionStart);
                const newSelectionStartPosition = this._host.deduceModelPosition(_newSelectionStartPosition[0], _newSelectionStartPosition[1], _newSelectionStartPosition[2]);
                const _newSelectionEndPosition = this._textAreaState.deduceEditorPosition(newSelectionEnd);
                const newSelectionEndPosition = this._host.deduceModelPosition(_newSelectionEndPosition[0], _newSelectionEndPosition[1], _newSelectionEndPosition[2]);
                const newSelection = new selection_1.Selection(newSelectionStartPosition.lineNumber, newSelectionStartPosition.column, newSelectionEndPosition.lineNumber, newSelectionEndPosition.column);
                this._onSelectionChangeRequest.fire(newSelection);
            });
        }
        dispose() {
            super.dispose();
            if (this._selectionChangeListener) {
                this._selectionChangeListener.dispose();
                this._selectionChangeListener = null;
            }
        }
        focusTextArea() {
            // Setting this._hasFocus and writing the screen reader content
            // will result in a focus() and setSelectionRange() in the textarea
            this._setHasFocus(true);
        }
        isFocused() {
            return this._hasFocus;
        }
        _setHasFocus(newHasFocus) {
            if (this._hasFocus === newHasFocus) {
                // no change
                return;
            }
            this._hasFocus = newHasFocus;
            if (this._selectionChangeListener) {
                this._selectionChangeListener.dispose();
                this._selectionChangeListener = null;
            }
            if (this._hasFocus) {
                this._selectionChangeListener = this._installSelectionChangeListener();
            }
            if (this._hasFocus) {
                if (browser.isEdge) {
                    // Edge has a bug where setting the selection range while the focus event
                    // is dispatching doesn't work. To reproduce, "tab into" the editor.
                    this._setAndWriteTextAreaState('focusgain', textAreaState_1.TextAreaState.EMPTY);
                }
                else {
                    this.writeScreenReaderContent('focusgain');
                }
            }
            if (this._hasFocus) {
                this._onFocus.fire();
            }
            else {
                this._onBlur.fire();
            }
        }
        _setAndWriteTextAreaState(reason, textAreaState) {
            if (!this._hasFocus) {
                textAreaState = textAreaState.collapseSelection();
            }
            textAreaState.writeToTextArea(reason, this._textArea, this._hasFocus);
            this._textAreaState = textAreaState;
        }
        writeScreenReaderContent(reason) {
            if (this._isDoingComposition) {
                // Do not write to the text area when doing composition
                return;
            }
            this._setAndWriteTextAreaState(reason, this._host.getScreenReaderContent(this._textAreaState));
        }
        _ensureClipboardGetsEditorSelection(e) {
            const dataToCopy = this._host.getDataToCopy(ClipboardEventUtils.canUseTextData(e) && canIUse_1.BrowserFeatures.clipboard.richText);
            const storedMetadata = {
                version: 1,
                isFromEmptySelection: dataToCopy.isFromEmptySelection,
                multicursorText: dataToCopy.multicursorText
            };
            InMemoryClipboardMetadataManager.INSTANCE.set(
            // When writing "LINE\r\n" to the clipboard and then pasting,
            // Firefox pastes "LINE\n", so let's work around this quirk
            (browser.isFirefox ? dataToCopy.text.replace(/\r\n/g, '\n') : dataToCopy.text), storedMetadata);
            if (!ClipboardEventUtils.canUseTextData(e)) {
                // Looks like an old browser. The strategy is to place the text
                // we'd like to be copied to the clipboard in the textarea and select it.
                this._setAndWriteTextAreaState('copy or cut', textAreaState_1.TextAreaState.selectedText(dataToCopy.text));
                return;
            }
            ClipboardEventUtils.setTextData(e, dataToCopy.text, dataToCopy.html, storedMetadata);
        }
        _firePaste(text, metadata) {
            if (!metadata) {
                // try the in-memory store
                metadata = InMemoryClipboardMetadataManager.INSTANCE.get(text);
            }
            this._onPaste.fire({
                text: text,
                metadata: metadata
            });
        }
    }
    exports.TextAreaInput = TextAreaInput;
    class ClipboardEventUtils {
        static canUseTextData(e) {
            if (e.clipboardData) {
                return true;
            }
            if (window.clipboardData) {
                return true;
            }
            return false;
        }
        static getTextData(e) {
            if (e.clipboardData) {
                e.preventDefault();
                const text = e.clipboardData.getData('text/plain');
                let metadata = null;
                const rawmetadata = e.clipboardData.getData('vscode-editor-data');
                if (typeof rawmetadata === 'string') {
                    try {
                        metadata = JSON.parse(rawmetadata);
                        if (metadata.version !== 1) {
                            metadata = null;
                        }
                    }
                    catch (err) {
                        // no problem!
                    }
                }
                return [text, metadata];
            }
            if (window.clipboardData) {
                e.preventDefault();
                return window.clipboardData.getData('Text');
            }
            throw new Error('ClipboardEventUtils.getTextData: Cannot use text data!');
        }
        static setTextData(e, text, html, metadata) {
            if (e.clipboardData) {
                e.clipboardData.setData('text/plain', text);
                if (typeof html === 'string') {
                    e.clipboardData.setData('text/html', html);
                }
                e.clipboardData.setData('vscode-editor-data', JSON.stringify(metadata));
                e.preventDefault();
                return;
            }
            if (window.clipboardData) {
                window.clipboardData.setData('Text', text);
                e.preventDefault();
                return;
            }
            throw new Error('ClipboardEventUtils.setTextData: Cannot use text data!');
        }
    }
    class TextAreaWrapper extends lifecycle_1.Disposable {
        constructor(_textArea) {
            super();
            this._actual = _textArea;
            this._ignoreSelectionChangeTime = 0;
        }
        setIgnoreSelectionChangeTime(reason) {
            this._ignoreSelectionChangeTime = Date.now();
        }
        getIgnoreSelectionChangeTime() {
            return this._ignoreSelectionChangeTime;
        }
        resetSelectionChangeTime() {
            this._ignoreSelectionChangeTime = 0;
        }
        getValue() {
            // console.log('current value: ' + this._textArea.value);
            return this._actual.domNode.value;
        }
        setValue(reason, value) {
            const textArea = this._actual.domNode;
            if (textArea.value === value) {
                // No change
                return;
            }
            // console.log('reason: ' + reason + ', current value: ' + textArea.value + ' => new value: ' + value);
            this.setIgnoreSelectionChangeTime('setValue');
            textArea.value = value;
        }
        getSelectionStart() {
            return this._actual.domNode.selectionStart;
        }
        getSelectionEnd() {
            return this._actual.domNode.selectionEnd;
        }
        setSelectionRange(reason, selectionStart, selectionEnd) {
            const textArea = this._actual.domNode;
            const currentIsFocused = (document.activeElement === textArea);
            const currentSelectionStart = textArea.selectionStart;
            const currentSelectionEnd = textArea.selectionEnd;
            if (currentIsFocused && currentSelectionStart === selectionStart && currentSelectionEnd === selectionEnd) {
                // No change
                // Firefox iframe bug https://github.com/Microsoft/monaco-editor/issues/643#issuecomment-367871377
                if (browser.isFirefox && window.parent !== window) {
                    textArea.focus();
                }
                return;
            }
            // console.log('reason: ' + reason + ', setSelectionRange: ' + selectionStart + ' -> ' + selectionEnd);
            if (currentIsFocused) {
                // No need to focus, only need to change the selection range
                this.setIgnoreSelectionChangeTime('setSelectionRange');
                textArea.setSelectionRange(selectionStart, selectionEnd);
                if (browser.isFirefox && window.parent !== window) {
                    textArea.focus();
                }
                return;
            }
            // If the focus is outside the textarea, browsers will try really hard to reveal the textarea.
            // Here, we try to undo the browser's desperate reveal.
            try {
                const scrollState = dom.saveParentsScrollTop(textArea);
                this.setIgnoreSelectionChangeTime('setSelectionRange');
                textArea.focus();
                textArea.setSelectionRange(selectionStart, selectionEnd);
                dom.restoreParentsScrollTop(textArea, scrollState);
            }
            catch (e) {
                // Sometimes IE throws when setting selection (e.g. textarea is off-DOM)
            }
        }
    }
});
//# sourceMappingURL=textAreaInput.js.map