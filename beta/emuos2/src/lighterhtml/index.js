import WeakMap from '../weakmap';
import tta from '../template-tag-arguments';
import {Wire, wireType, isArray} from './shared.js';
import Tagger from './tagger.js';

const wm = new WeakMap;

let current = null;

// can be used with any useRef hook
// returns an `html` and `svg` function
export const hook = useRef => ({
	html: createHook(useRef, html),
	svg: createHook(useRef, svg)
});

// generic content render
export function render(node, callback) {
	const content = update.call(this, node, callback);
	if (content !== null)
		appendClean(node, content);
	return node;
}

// keyed render via render(node, () => html`...`)
// non keyed renders in the wild via html`...`
export const html = outer('html');
export const svg = outer('svg');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function appendClean(node, fragment) {
	node.textContent = '';
	node.appendChild(fragment);
}

function asNode(result) {
	return result.nodeType === wireType ? result.valueOf(true) : result;
}

function createHook(useRef, view) {
	return function () {
		const ref = useRef(null);
		if (ref.current === null)
			ref.current = content.bind(ref);
		return ref.current.apply(null, arguments);
	};

	function content() {
		const args = [];
		const {length} = arguments;
		for (let i = 0; i < length; i++)
			args[i] = arguments[i];
		const content = update(this, () => view.apply(null, args));
		if (content)
			this.content = content;
		return this.content;
	}
}

function outer(type) {
	return function () {
		const args = tta.apply(null, arguments);
		return current ?
			new Hole(type, args) :
			new Tagger(type).apply(null, args);
	};
}

function set(node) {
	const info = {
		i: 0, length: 0,
		stack: [],
		update: false
	};
	wm.set(node, info);
	return info;
}

function update(reference, callback) {
	const prev = current;
	current = wm.get(reference) || set(reference);
	current.i = 0;
	const result = callback.call(this);
	let ret = null;
	if (result instanceof Hole) {
		const value = unroll(result);
		const {i, length, stack} = current;
		if (i < length) {
			current.length = i;
			stack.splice(i);
		}
		if (current.update) {
			current.update = false;
			ret = asNode(value);
		}
	} else {
		ret = asNode(result);
	}
	current = prev;
	return ret;
}

function unroll(hole) {
	const {i, length, stack} = current;
	const {type, args} = hole;
	const stacked = i < length;
	current.i++;
	unrollArray(args, 1);
	if (stacked) {
		const {tagger, tpl, kind, wire} = stack[i];
		if (type === kind && tpl === args[0]) {
			tagger.apply(null, args);
			return wire;
		}
	}
	const tagger = new Tagger(type);
	const info = {
		tagger,
		tpl: args[0],
		kind: type,
		wire: wiredContent(tagger.apply(null, args))
	};
	if (stacked)
		stack[i] = info;
	else
		current.length = stack.push(info);
	if (i < 1)
		current.update = true;
	return info.wire;
}

function unrollArray(arr, i) {
	for (const {length} = arr; i < length; i++) {
		const value = arr[i];
		if (value) {
			if (value instanceof Hole) {
				arr[i] = unroll(value);
			} else if (isArray(value)) {
				arr[i] = unrollArray(value, 0);
			}
		}
	}
	return arr;
}

function wiredContent(node) {
	const childNodes = node.childNodes;
	const {length} = childNodes;
	return length === 1 ?
		childNodes[0] :
		(length ? new Wire(childNodes) : node);
}

function Hole(type, args) {
	this.type = type;
	this.args = args;
}