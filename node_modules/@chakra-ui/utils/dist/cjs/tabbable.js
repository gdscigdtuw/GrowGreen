"use strict";

exports.__esModule = true;
exports.isDisabled = isDisabled;
exports.hasFocusWithin = hasFocusWithin;
exports.isHTMLElement = isHTMLElement;
exports.isHidden = isHidden;
exports.isContentEditable = isContentEditable;
exports.isFocusable = isFocusable;
exports.isTabbable = isTabbable;
exports.hasNegativeTabIndex = exports.hasTabIndex = exports.hasDisplayNone = void 0;

// Really great work done by Diego Haz on this one
// https://github.com/reakit/reakit/blob/master/packages/reakit-utils/src/tabbable.ts
var hasDisplayNone = function hasDisplayNone(element) {
  return window.getComputedStyle(element).display === "none";
};

exports.hasDisplayNone = hasDisplayNone;

var hasTabIndex = function hasTabIndex(element) {
  return element.hasAttribute("tabindex");
};

exports.hasTabIndex = hasTabIndex;

var hasNegativeTabIndex = function hasNegativeTabIndex(element) {
  return hasTabIndex(element) && element.tabIndex === -1;
};

exports.hasNegativeTabIndex = hasNegativeTabIndex;

function isDisabled(element) {
  return Boolean(element.getAttribute("disabled")) === true || Boolean(element.getAttribute("aria-disabled")) === true;
}

function hasFocusWithin(element) {
  if (!document.activeElement) return false;
  return element.contains(document.activeElement);
}

function isHTMLElement(element) {
  return element instanceof HTMLElement;
}

function isHidden(element) {
  if (element.parentElement && isHidden(element.parentElement)) return true;
  return element.hidden;
}

function isContentEditable(element) {
  var value = element.getAttribute("contenteditable");
  return value !== "false" && value != null;
}

function isFocusable(element) {
  if (!isHTMLElement(element) || isHidden(element) || isDisabled(element)) {
    return false;
  }

  var localName = element.localName;
  var focusableTags = ["input", "select", "textarea", "button"];
  if (focusableTags.indexOf(localName) >= 0) return true;
  var others = {
    a: function a() {
      return element.hasAttribute("href");
    },
    audio: function audio() {
      return element.hasAttribute("controls");
    },
    video: function video() {
      return element.hasAttribute("controls");
    }
  };

  if (localName in others) {
    return others[localName]();
  }

  if (isContentEditable(element)) return true;
  return hasTabIndex(element);
}

function isTabbable(element) {
  if (!element) return false;
  return isHTMLElement(element) && isFocusable(element) && !hasNegativeTabIndex(element);
}
//# sourceMappingURL=tabbable.js.map