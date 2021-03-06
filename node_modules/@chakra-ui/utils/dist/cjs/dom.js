"use strict";

exports.__esModule = true;
exports.getOwnerWindow = getOwnerWindow;
exports.getOwnerDocument = getOwnerDocument;
exports.canUseDOM = canUseDOM;
exports.normalizeEventKey = normalizeEventKey;
exports.getActiveElement = getActiveElement;
exports.contains = contains;
exports.cx = exports.ariaAttr = exports.dataAttr = exports.isBrowser = void 0;

function getOwnerWindow(node) {
  var _getOwnerDocument$def;

  return node instanceof Element ? (_getOwnerDocument$def = getOwnerDocument(node).defaultView) != null ? _getOwnerDocument$def : window : window;
}

function getOwnerDocument(node) {
  var _node$ownerDocument;

  return node instanceof Element ? (_node$ownerDocument = node.ownerDocument) != null ? _node$ownerDocument : document : document;
}

function canUseDOM() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}

var isBrowser = canUseDOM();
/**
 * Get the normalized event key across all browsers
 * @param event keyboard event
 */

exports.isBrowser = isBrowser;

function normalizeEventKey(event) {
  var key = event.key,
      keyCode = event.keyCode;
  var isArrowKey = keyCode >= 37 && keyCode <= 40 && key.indexOf("Arrow") !== 0;
  var eventKey = isArrowKey ? "Arrow" + key : key;
  return eventKey;
}

var dataAttr = function dataAttr(condition) {
  return condition ? "" : undefined;
};

exports.dataAttr = dataAttr;

var ariaAttr = function ariaAttr(condition) {
  return condition ? true : undefined;
};

exports.ariaAttr = ariaAttr;

var cx = function cx() {
  for (var _len = arguments.length, classNames = new Array(_len), _key = 0; _key < _len; _key++) {
    classNames[_key] = arguments[_key];
  }

  return classNames.filter(Boolean).join(" ");
};

exports.cx = cx;

function getActiveElement(node) {
  var doc = getOwnerDocument(node);
  return doc == null ? void 0 : doc.activeElement;
}

function contains(parent, child) {
  return parent === child || parent.contains(child);
}
//# sourceMappingURL=dom.js.map