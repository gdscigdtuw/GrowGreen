"use strict";

exports.__esModule = true;
exports.focus = focus;

var _dom = require("./dom");

var _tabbable = require("./tabbable");

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function isInputElement(element) {
  return (0, _tabbable.isHTMLElement)(element) && element.tagName.toLowerCase() === "input" && "select" in element;
}

function getActiveElement(element) {
  var doc = element instanceof HTMLElement ? (0, _dom.getOwnerDocument)(element) : document;
  return doc.activeElement === element;
}

function focus(element, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$isActive = _options.isActive,
      isActive = _options$isActive === void 0 ? getActiveElement : _options$isActive,
      _options$nextTick = _options.nextTick,
      nextTick = _options$nextTick === void 0 ? true : _options$nextTick,
      preventScroll = _options.preventScroll;
  if (isActive(element)) return -1;

  function triggerFocus() {
    if (supportsPreventScroll()) {
      element.focus({
        preventScroll: preventScroll
      });
    } else {
      element.focus();

      if (preventScroll) {
        var scrollableElements = getScrollableElements(element);
        restoreScrollPosition(scrollableElements);
      }
    }

    if (isInputElement(element)) {
      element.select();
    }
  }

  if (nextTick) {
    return requestAnimationFrame(triggerFocus);
  }

  triggerFocus();
  return -1;
}

var supportsPreventScrollCached = null;

function supportsPreventScroll() {
  if (supportsPreventScrollCached == null) {
    supportsPreventScrollCached = false;

    try {
      var div = document.createElement("div");
      div.focus({
        get preventScroll() {
          supportsPreventScrollCached = true;
          return true;
        }

      });
    } catch (e) {// Ignore
    }
  }

  return supportsPreventScrollCached;
}

function getScrollableElements(element) {
  var doc = (0, _dom.getOwnerDocument)(element);
  var parent = element.parentNode;
  var scrollableElements = [];
  var rootScrollingElement = doc.scrollingElement || doc.documentElement;

  while (parent instanceof HTMLElement && parent !== rootScrollingElement) {
    if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth) {
      scrollableElements.push({
        element: parent,
        scrollTop: parent.scrollTop,
        scrollLeft: parent.scrollLeft
      });
    }

    parent = parent.parentNode;
  }

  if (rootScrollingElement instanceof HTMLElement) {
    scrollableElements.push({
      element: rootScrollingElement,
      scrollTop: rootScrollingElement.scrollTop,
      scrollLeft: rootScrollingElement.scrollLeft
    });
  }

  return scrollableElements;
}

function restoreScrollPosition(scrollableElements) {
  for (var _iterator = _createForOfIteratorHelperLoose(scrollableElements), _step; !(_step = _iterator()).done;) {
    var _step$value = _step.value,
        element = _step$value.element,
        scrollTop = _step$value.scrollTop,
        scrollLeft = _step$value.scrollLeft;
    element.scrollTop = scrollTop;
    element.scrollLeft = scrollLeft;
  }
}
//# sourceMappingURL=focus.js.map