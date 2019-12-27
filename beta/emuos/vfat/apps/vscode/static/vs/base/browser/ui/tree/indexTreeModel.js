/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "vs/base/browser/ui/tree/tree", "vs/base/common/arrays", "vs/base/common/event", "vs/base/common/iterator"], function (require, exports, tree_1, arrays_1, event_1, iterator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isFilterResult(obj) {
        return typeof obj === 'object' && 'visibility' in obj && 'data' in obj;
    }
    exports.isFilterResult = isFilterResult;
    function getVisibleState(visibility) {
        switch (visibility) {
            case true: return 1 /* Visible */;
            case false: return 0 /* Hidden */;
            default: return visibility;
        }
    }
    exports.getVisibleState = getVisibleState;
    function isCollapsibleStateUpdate(update) {
        return typeof update.collapsible === 'boolean';
    }
    class IndexTreeModel {
        constructor(user, list, rootElement, options = {}) {
            this.user = user;
            this.list = list;
            this.rootRef = [];
            this.eventBufferer = new event_1.EventBufferer();
            this._onDidChangeCollapseState = new event_1.Emitter();
            this.onDidChangeCollapseState = this.eventBufferer.wrapEvent(this._onDidChangeCollapseState.event);
            this._onDidChangeRenderNodeCount = new event_1.Emitter();
            this.onDidChangeRenderNodeCount = this.eventBufferer.wrapEvent(this._onDidChangeRenderNodeCount.event);
            this._onDidSplice = new event_1.Emitter();
            this.onDidSplice = this._onDidSplice.event;
            this.collapseByDefault = typeof options.collapseByDefault === 'undefined' ? false : options.collapseByDefault;
            this.filter = options.filter;
            this.autoExpandSingleChildren = typeof options.autoExpandSingleChildren === 'undefined' ? false : options.autoExpandSingleChildren;
            this.root = {
                parent: undefined,
                element: rootElement,
                children: [],
                depth: 0,
                visibleChildrenCount: 0,
                visibleChildIndex: -1,
                collapsible: false,
                collapsed: false,
                renderNodeCount: 0,
                visible: true,
                filterData: undefined
            };
        }
        splice(location, deleteCount, toInsert, onDidCreateNode, onDidDeleteNode) {
            if (location.length === 0) {
                throw new tree_1.TreeError(this.user, 'Invalid tree location');
            }
            const { parentNode, listIndex, revealed, visible } = this.getParentNodeWithListIndex(location);
            const treeListElementsToInsert = [];
            const nodesToInsertIterator = iterator_1.Iterator.map(iterator_1.Iterator.from(toInsert), el => this.createTreeNode(el, parentNode, parentNode.visible ? 1 /* Visible */ : 0 /* Hidden */, revealed, treeListElementsToInsert, onDidCreateNode));
            const lastIndex = location[location.length - 1];
            // figure out what's the visible child start index right before the
            // splice point
            let visibleChildStartIndex = 0;
            for (let i = lastIndex; i >= 0 && i < parentNode.children.length; i--) {
                const child = parentNode.children[i];
                if (child.visible) {
                    visibleChildStartIndex = child.visibleChildIndex;
                    break;
                }
            }
            const nodesToInsert = [];
            let insertedVisibleChildrenCount = 0;
            let renderNodeCount = 0;
            iterator_1.Iterator.forEach(nodesToInsertIterator, child => {
                nodesToInsert.push(child);
                renderNodeCount += child.renderNodeCount;
                if (child.visible) {
                    child.visibleChildIndex = visibleChildStartIndex + insertedVisibleChildrenCount++;
                }
            });
            const deletedNodes = parentNode.children.splice(lastIndex, deleteCount, ...nodesToInsert);
            // figure out what is the count of deleted visible children
            let deletedVisibleChildrenCount = 0;
            for (const child of deletedNodes) {
                if (child.visible) {
                    deletedVisibleChildrenCount++;
                }
            }
            // and adjust for all visible children after the splice point
            if (deletedVisibleChildrenCount !== 0) {
                for (let i = lastIndex + nodesToInsert.length; i < parentNode.children.length; i++) {
                    const child = parentNode.children[i];
                    if (child.visible) {
                        child.visibleChildIndex -= deletedVisibleChildrenCount;
                    }
                }
            }
            // update parent's visible children count
            parentNode.visibleChildrenCount += insertedVisibleChildrenCount - deletedVisibleChildrenCount;
            if (revealed && visible) {
                const visibleDeleteCount = deletedNodes.reduce((r, node) => r + (node.visible ? node.renderNodeCount : 0), 0);
                this._updateAncestorsRenderNodeCount(parentNode, renderNodeCount - visibleDeleteCount);
                this.list.splice(listIndex, visibleDeleteCount, treeListElementsToInsert);
            }
            if (deletedNodes.length > 0 && onDidDeleteNode) {
                const visit = (node) => {
                    onDidDeleteNode(node);
                    node.children.forEach(visit);
                };
                deletedNodes.forEach(visit);
            }
            this._onDidSplice.fire({ insertedNodes: nodesToInsert, deletedNodes });
        }
        rerender(location) {
            if (location.length === 0) {
                throw new tree_1.TreeError(this.user, 'Invalid tree location');
            }
            const { node, listIndex, revealed } = this.getTreeNodeWithListIndex(location);
            if (revealed) {
                this.list.splice(listIndex, 1, [node]);
            }
        }
        getListIndex(location) {
            const { listIndex, visible, revealed } = this.getTreeNodeWithListIndex(location);
            return visible && revealed ? listIndex : -1;
        }
        getListRenderCount(location) {
            return this.getTreeNode(location).renderNodeCount;
        }
        isCollapsible(location) {
            return this.getTreeNode(location).collapsible;
        }
        setCollapsible(location, collapsible) {
            const node = this.getTreeNode(location);
            if (typeof collapsible === 'undefined') {
                collapsible = !node.collapsible;
            }
            const update = { collapsible };
            return this.eventBufferer.bufferEvents(() => this._setCollapseState(location, update));
        }
        isCollapsed(location) {
            return this.getTreeNode(location).collapsed;
        }
        setCollapsed(location, collapsed, recursive) {
            const node = this.getTreeNode(location);
            if (typeof collapsed === 'undefined') {
                collapsed = !node.collapsed;
            }
            const update = { collapsed, recursive: recursive || false };
            return this.eventBufferer.bufferEvents(() => this._setCollapseState(location, update));
        }
        _setCollapseState(location, update) {
            const { node, listIndex, revealed } = this.getTreeNodeWithListIndex(location);
            const result = this._setListNodeCollapseState(node, listIndex, revealed, update);
            if (node !== this.root && this.autoExpandSingleChildren && result && !isCollapsibleStateUpdate(update) && node.collapsible && !node.collapsed && !update.recursive) {
                let onlyVisibleChildIndex = -1;
                for (let i = 0; i < node.children.length; i++) {
                    const child = node.children[i];
                    if (child.visible) {
                        if (onlyVisibleChildIndex > -1) {
                            onlyVisibleChildIndex = -1;
                            break;
                        }
                        else {
                            onlyVisibleChildIndex = i;
                        }
                    }
                }
                if (onlyVisibleChildIndex > -1) {
                    this._setCollapseState([...location, onlyVisibleChildIndex], update);
                }
            }
            return result;
        }
        _setListNodeCollapseState(node, listIndex, revealed, update) {
            const result = this._setNodeCollapseState(node, update, false);
            if (!revealed || !node.visible || !result) {
                return result;
            }
            const previousRenderNodeCount = node.renderNodeCount;
            const toInsert = this.updateNodeAfterCollapseChange(node);
            const deleteCount = previousRenderNodeCount - (listIndex === -1 ? 0 : 1);
            this.list.splice(listIndex + 1, deleteCount, toInsert.slice(1));
            return result;
        }
        _setNodeCollapseState(node, update, deep) {
            let result;
            if (node === this.root) {
                result = false;
            }
            else {
                if (isCollapsibleStateUpdate(update)) {
                    result = node.collapsible !== update.collapsible;
                    node.collapsible = update.collapsible;
                }
                else {
                    result = node.collapsed !== update.collapsed;
                    node.collapsed = update.collapsed;
                }
                if (result) {
                    this._onDidChangeCollapseState.fire({ node, deep });
                }
            }
            if (!isCollapsibleStateUpdate(update) && update.recursive) {
                for (const child of node.children) {
                    result = this._setNodeCollapseState(child, update, true) || result;
                }
            }
            return result;
        }
        expandTo(location) {
            this.eventBufferer.bufferEvents(() => {
                let node = this.getTreeNode(location);
                while (node.parent) {
                    node = node.parent;
                    location = location.slice(0, location.length - 1);
                    if (node.collapsed) {
                        this._setCollapseState(location, { collapsed: false, recursive: false });
                    }
                }
            });
        }
        refilter() {
            const previousRenderNodeCount = this.root.renderNodeCount;
            const toInsert = this.updateNodeAfterFilterChange(this.root);
            this.list.splice(0, previousRenderNodeCount, toInsert);
        }
        createTreeNode(treeElement, parent, parentVisibility, revealed, treeListElements, onDidCreateNode) {
            const node = {
                parent,
                element: treeElement.element,
                children: [],
                depth: parent.depth + 1,
                visibleChildrenCount: 0,
                visibleChildIndex: -1,
                collapsible: typeof treeElement.collapsible === 'boolean' ? treeElement.collapsible : (typeof treeElement.collapsed !== 'undefined'),
                collapsed: typeof treeElement.collapsed === 'undefined' ? this.collapseByDefault : treeElement.collapsed,
                renderNodeCount: 1,
                visible: true,
                filterData: undefined
            };
            const visibility = this._filterNode(node, parentVisibility);
            if (revealed) {
                treeListElements.push(node);
            }
            const childElements = iterator_1.Iterator.from(treeElement.children);
            const childRevealed = revealed && visibility !== 0 /* Hidden */ && !node.collapsed;
            const childNodes = iterator_1.Iterator.map(childElements, el => this.createTreeNode(el, node, visibility, childRevealed, treeListElements, onDidCreateNode));
            let visibleChildrenCount = 0;
            let renderNodeCount = 1;
            iterator_1.Iterator.forEach(childNodes, child => {
                node.children.push(child);
                renderNodeCount += child.renderNodeCount;
                if (child.visible) {
                    child.visibleChildIndex = visibleChildrenCount++;
                }
            });
            node.collapsible = node.collapsible || node.children.length > 0;
            node.visibleChildrenCount = visibleChildrenCount;
            node.visible = visibility === 2 /* Recurse */ ? visibleChildrenCount > 0 : (visibility === 1 /* Visible */);
            if (!node.visible) {
                node.renderNodeCount = 0;
                if (revealed) {
                    treeListElements.pop();
                }
            }
            else if (!node.collapsed) {
                node.renderNodeCount = renderNodeCount;
            }
            if (onDidCreateNode) {
                onDidCreateNode(node);
            }
            return node;
        }
        updateNodeAfterCollapseChange(node) {
            const previousRenderNodeCount = node.renderNodeCount;
            const result = [];
            this._updateNodeAfterCollapseChange(node, result);
            this._updateAncestorsRenderNodeCount(node.parent, result.length - previousRenderNodeCount);
            return result;
        }
        _updateNodeAfterCollapseChange(node, result) {
            if (node.visible === false) {
                return 0;
            }
            result.push(node);
            node.renderNodeCount = 1;
            if (!node.collapsed) {
                for (const child of node.children) {
                    node.renderNodeCount += this._updateNodeAfterCollapseChange(child, result);
                }
            }
            this._onDidChangeRenderNodeCount.fire(node);
            return node.renderNodeCount;
        }
        updateNodeAfterFilterChange(node) {
            const previousRenderNodeCount = node.renderNodeCount;
            const result = [];
            this._updateNodeAfterFilterChange(node, node.visible ? 1 /* Visible */ : 0 /* Hidden */, result);
            this._updateAncestorsRenderNodeCount(node.parent, result.length - previousRenderNodeCount);
            return result;
        }
        _updateNodeAfterFilterChange(node, parentVisibility, result, revealed = true) {
            let visibility;
            if (node !== this.root) {
                visibility = this._filterNode(node, parentVisibility);
                if (visibility === 0 /* Hidden */) {
                    node.visible = false;
                    node.renderNodeCount = 0;
                    return false;
                }
                if (revealed) {
                    result.push(node);
                }
            }
            const resultStartLength = result.length;
            node.renderNodeCount = node === this.root ? 0 : 1;
            let hasVisibleDescendants = false;
            if (!node.collapsed || visibility !== 0 /* Hidden */) {
                let visibleChildIndex = 0;
                for (const child of node.children) {
                    hasVisibleDescendants = this._updateNodeAfterFilterChange(child, visibility, result, revealed && !node.collapsed) || hasVisibleDescendants;
                    if (child.visible) {
                        child.visibleChildIndex = visibleChildIndex++;
                    }
                }
                node.visibleChildrenCount = visibleChildIndex;
            }
            else {
                node.visibleChildrenCount = 0;
            }
            if (node !== this.root) {
                node.visible = visibility === 2 /* Recurse */ ? hasVisibleDescendants : (visibility === 1 /* Visible */);
            }
            if (!node.visible) {
                node.renderNodeCount = 0;
                if (revealed) {
                    result.pop();
                }
            }
            else if (!node.collapsed) {
                node.renderNodeCount += result.length - resultStartLength;
            }
            this._onDidChangeRenderNodeCount.fire(node);
            return node.visible;
        }
        _updateAncestorsRenderNodeCount(node, diff) {
            if (diff === 0) {
                return;
            }
            while (node) {
                node.renderNodeCount += diff;
                this._onDidChangeRenderNodeCount.fire(node);
                node = node.parent;
            }
        }
        _filterNode(node, parentVisibility) {
            const result = this.filter ? this.filter.filter(node.element, parentVisibility) : 1 /* Visible */;
            if (typeof result === 'boolean') {
                node.filterData = undefined;
                return result ? 1 /* Visible */ : 0 /* Hidden */;
            }
            else if (isFilterResult(result)) {
                node.filterData = result.data;
                return getVisibleState(result.visibility);
            }
            else {
                node.filterData = undefined;
                return getVisibleState(result);
            }
        }
        // cheap
        getTreeNode(location, node = this.root) {
            if (!location || location.length === 0) {
                return node;
            }
            const [index, ...rest] = location;
            if (index < 0 || index > node.children.length) {
                throw new tree_1.TreeError(this.user, 'Invalid tree location');
            }
            return this.getTreeNode(rest, node.children[index]);
        }
        // expensive
        getTreeNodeWithListIndex(location) {
            if (location.length === 0) {
                return { node: this.root, listIndex: -1, revealed: true, visible: false };
            }
            const { parentNode, listIndex, revealed, visible } = this.getParentNodeWithListIndex(location);
            const index = location[location.length - 1];
            if (index < 0 || index > parentNode.children.length) {
                throw new tree_1.TreeError(this.user, 'Invalid tree location');
            }
            const node = parentNode.children[index];
            return { node, listIndex, revealed, visible: visible && node.visible };
        }
        getParentNodeWithListIndex(location, node = this.root, listIndex = 0, revealed = true, visible = true) {
            const [index, ...rest] = location;
            if (index < 0 || index > node.children.length) {
                throw new tree_1.TreeError(this.user, 'Invalid tree location');
            }
            // TODO@joao perf!
            for (let i = 0; i < index; i++) {
                listIndex += node.children[i].renderNodeCount;
            }
            revealed = revealed && !node.collapsed;
            visible = visible && node.visible;
            if (rest.length === 0) {
                return { parentNode: node, listIndex, revealed, visible };
            }
            return this.getParentNodeWithListIndex(rest, node.children[index], listIndex + 1, revealed, visible);
        }
        getNode(location = []) {
            return this.getTreeNode(location);
        }
        // TODO@joao perf!
        getNodeLocation(node) {
            const location = [];
            let indexTreeNode = node; // typing woes
            while (indexTreeNode.parent) {
                location.push(indexTreeNode.parent.children.indexOf(indexTreeNode));
                indexTreeNode = indexTreeNode.parent;
            }
            return location.reverse();
        }
        getParentNodeLocation(location) {
            if (location.length === 0) {
                return undefined;
            }
            else if (location.length === 1) {
                return [];
            }
            else {
                return arrays_1.tail2(location)[0];
            }
        }
        getFirstElementChild(location) {
            const node = this.getTreeNode(location);
            if (node.children.length === 0) {
                return undefined;
            }
            return node.children[0].element;
        }
        getLastElementAncestor(location = []) {
            const node = this.getTreeNode(location);
            if (node.children.length === 0) {
                return undefined;
            }
            return this._getLastElementAncestor(node);
        }
        _getLastElementAncestor(node) {
            if (node.children.length === 0) {
                return node.element;
            }
            return this._getLastElementAncestor(node.children[node.children.length - 1]);
        }
    }
    exports.IndexTreeModel = IndexTreeModel;
});
//# sourceMappingURL=indexTreeModel.js.map