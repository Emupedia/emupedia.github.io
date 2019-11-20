/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "vs/base/common/strings", "vs/editor/common/model/pieceTreeTextBuffer/pieceTreeBase", "vs/editor/common/model/pieceTreeTextBuffer/pieceTreeTextBuffer"], function (require, exports, strings, pieceTreeBase_1, pieceTreeTextBuffer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PieceTreeTextBufferFactory {
        constructor(_chunks, _bom, _cr, _lf, _crlf, _containsRTL, _isBasicASCII, _normalizeEOL) {
            this._chunks = _chunks;
            this._bom = _bom;
            this._cr = _cr;
            this._lf = _lf;
            this._crlf = _crlf;
            this._containsRTL = _containsRTL;
            this._isBasicASCII = _isBasicASCII;
            this._normalizeEOL = _normalizeEOL;
        }
        _getEOL(defaultEOL) {
            const totalEOLCount = this._cr + this._lf + this._crlf;
            const totalCRCount = this._cr + this._crlf;
            if (totalEOLCount === 0) {
                // This is an empty file or a file with precisely one line
                return (defaultEOL === 1 /* LF */ ? '\n' : '\r\n');
            }
            if (totalCRCount > totalEOLCount / 2) {
                // More than half of the file contains \r\n ending lines
                return '\r\n';
            }
            // At least one line more ends in \n
            return '\n';
        }
        create(defaultEOL) {
            const eol = this._getEOL(defaultEOL);
            let chunks = this._chunks;
            if (this._normalizeEOL &&
                ((eol === '\r\n' && (this._cr > 0 || this._lf > 0))
                    || (eol === '\n' && (this._cr > 0 || this._crlf > 0)))) {
                // Normalize pieces
                for (let i = 0, len = chunks.length; i < len; i++) {
                    let str = chunks[i].buffer.replace(/\r\n|\r|\n/g, eol);
                    let newLineStart = pieceTreeBase_1.createLineStartsFast(str);
                    chunks[i] = new pieceTreeBase_1.StringBuffer(str, newLineStart);
                }
            }
            return new pieceTreeTextBuffer_1.PieceTreeTextBuffer(chunks, this._bom, eol, this._containsRTL, this._isBasicASCII, this._normalizeEOL);
        }
        getFirstLineText(lengthLimit) {
            return this._chunks[0].buffer.substr(0, lengthLimit).split(/\r\n|\r|\n/)[0];
        }
    }
    exports.PieceTreeTextBufferFactory = PieceTreeTextBufferFactory;
    class PieceTreeTextBufferBuilder {
        constructor() {
            this.chunks = [];
            this.BOM = '';
            this._hasPreviousChar = false;
            this._previousChar = 0;
            this._tmpLineStarts = [];
            this.cr = 0;
            this.lf = 0;
            this.crlf = 0;
            this.containsRTL = false;
            this.isBasicASCII = true;
        }
        acceptChunk(chunk) {
            if (chunk.length === 0) {
                return;
            }
            if (this.chunks.length === 0) {
                if (strings.startsWithUTF8BOM(chunk)) {
                    this.BOM = strings.UTF8_BOM_CHARACTER;
                    chunk = chunk.substr(1);
                }
            }
            const lastChar = chunk.charCodeAt(chunk.length - 1);
            if (lastChar === 13 /* CarriageReturn */ || (lastChar >= 0xD800 && lastChar <= 0xDBFF)) {
                // last character is \r or a high surrogate => keep it back
                this._acceptChunk1(chunk.substr(0, chunk.length - 1), false);
                this._hasPreviousChar = true;
                this._previousChar = lastChar;
            }
            else {
                this._acceptChunk1(chunk, false);
                this._hasPreviousChar = false;
                this._previousChar = lastChar;
            }
        }
        _acceptChunk1(chunk, allowEmptyStrings) {
            if (!allowEmptyStrings && chunk.length === 0) {
                // Nothing to do
                return;
            }
            if (this._hasPreviousChar) {
                this._acceptChunk2(String.fromCharCode(this._previousChar) + chunk);
            }
            else {
                this._acceptChunk2(chunk);
            }
        }
        _acceptChunk2(chunk) {
            const lineStarts = pieceTreeBase_1.createLineStarts(this._tmpLineStarts, chunk);
            this.chunks.push(new pieceTreeBase_1.StringBuffer(chunk, lineStarts.lineStarts));
            this.cr += lineStarts.cr;
            this.lf += lineStarts.lf;
            this.crlf += lineStarts.crlf;
            if (this.isBasicASCII) {
                this.isBasicASCII = lineStarts.isBasicASCII;
            }
            if (!this.isBasicASCII && !this.containsRTL) {
                // No need to check if is basic ASCII
                this.containsRTL = strings.containsRTL(chunk);
            }
        }
        finish(normalizeEOL = true) {
            this._finish();
            return new PieceTreeTextBufferFactory(this.chunks, this.BOM, this.cr, this.lf, this.crlf, this.containsRTL, this.isBasicASCII, normalizeEOL);
        }
        _finish() {
            if (this.chunks.length === 0) {
                this._acceptChunk1('', true);
            }
            if (this._hasPreviousChar) {
                this._hasPreviousChar = false;
                // recreate last chunk
                let lastChunk = this.chunks[this.chunks.length - 1];
                lastChunk.buffer += String.fromCharCode(this._previousChar);
                let newLineStarts = pieceTreeBase_1.createLineStartsFast(lastChunk.buffer);
                lastChunk.lineStarts = newLineStarts;
                if (this._previousChar === 13 /* CarriageReturn */) {
                    this.cr++;
                }
            }
        }
    }
    exports.PieceTreeTextBufferBuilder = PieceTreeTextBufferBuilder;
});
//# sourceMappingURL=pieceTreeTextBufferBuilder.js.map