"use strict";

exports.__esModule = true;
exports.mapResponsive = mapResponsive;
exports.objectToArrayNotation = objectToArrayNotation;
exports.arrayToObjectNotation = arrayToObjectNotation;
exports.isResponsiveObjectLike = isResponsiveObjectLike;
exports.analyzeBreakpoints = analyzeBreakpoints;
exports.isCustomBreakpoint = exports.px = exports.breakpoints = void 0;

var _array = require("./array");

var _assertion = require("./assertion");

var _object = require("./object");

var breakpoints = Object.freeze(["base", "sm", "md", "lg", "xl", "2xl"]);
exports.breakpoints = breakpoints;

function mapResponsive(prop, mapper) {
  if ((0, _assertion.isArray)(prop)) {
    return prop.map(function (item) {
      if (item === null) {
        return null;
      }

      return mapper(item);
    });
  }

  if ((0, _assertion.isObject)(prop)) {
    return (0, _object.objectKeys)(prop).reduce(function (result, key) {
      result[key] = mapper(prop[key]);
      return result;
    }, {});
  }

  if (prop != null) {
    return mapper(prop);
  }

  return null;
}

function objectToArrayNotation(obj, bps) {
  if (bps === void 0) {
    bps = breakpoints;
  }

  var result = bps.map(function (br) {
    var _obj$br;

    return (_obj$br = obj[br]) != null ? _obj$br : null;
  });

  while ((0, _array.getLastItem)(result) === null) {
    result.pop();
  }

  return result;
}

function arrayToObjectNotation(values, bps) {
  if (bps === void 0) {
    bps = breakpoints;
  }

  var result = {};
  values.forEach(function (value, index) {
    var key = bps[index];
    if (value == null) return;
    result[key] = value;
  });
  return result;
}

function isResponsiveObjectLike(obj, bps) {
  if (bps === void 0) {
    bps = breakpoints;
  }

  var keys = Object.keys(obj);
  return keys.length > 0 && keys.every(function (key) {
    return bps.includes(key);
  });
}
/**
 * @note
 * The code below is the recommended way to analyze breakpoints
 * related stuff. Avoid using functions above, it'll be removed in the
 * next major
 */


var analyzeCSSValue = function analyzeCSSValue(value) {
  var num = parseFloat(value.toString());
  var unit = value.toString().replace(String(num), "");
  return {
    unitless: !unit,
    value: num,
    unit: unit
  };
};

var px = function px(value) {
  if (value == null) return value;

  var _analyzeCSSValue = analyzeCSSValue(value),
      unitless = _analyzeCSSValue.unitless;

  return unitless || (0, _assertion.isNumber)(value) ? value + "px" : value;
};

exports.px = px;

var sortByBreakpointValue = function sortByBreakpointValue(a, b) {
  return parseInt(a[1], 10) > parseInt(b[1], 10) ? 1 : -1;
};

var sortBps = function sortBps(breakpoints) {
  return (0, _object.fromEntries)(Object.entries(breakpoints).sort(sortByBreakpointValue));
};

function normalize(breakpoints) {
  var sorted = sortBps(breakpoints);
  return Object.assign(Object.values(sorted), sorted);
}

function keys(breakpoints) {
  var value = Object.keys(sortBps(breakpoints));
  return new Set(value);
}

function subtract(value) {
  if (!value) return value;
  value = px(value);
  var factor = value.endsWith("px") ? -1 : // the equivalent of 1px in em using a 16px base
  -0.0635;
  return (0, _assertion.isNumber)(value) ? "" + (value + factor) : value.replace(/([0-9]+\.?[0-9]*)/, function (m) {
    return "" + (parseFloat(m) + factor);
  });
}

function queryString(min, max) {
  var query = [];
  if (min) query.push("@media screen and (min-width: " + px(min) + ")");
  if (query.length > 0 && max) query.push("and");
  if (max) query.push("@media screen and (max-width: " + px(max) + ")");
  return query.join(" ");
}

function analyzeBreakpoints(breakpoints) {
  var _breakpoints$base;

  if (!breakpoints) return null;
  breakpoints.base = (_breakpoints$base = breakpoints.base) != null ? _breakpoints$base : "0px";
  var normalized = normalize(breakpoints);
  var queries = Object.entries(breakpoints).sort(sortByBreakpointValue).map(function (_ref, index, entry) {
    var _entry;

    var breakpoint = _ref[0],
        minW = _ref[1];

    var _ref2 = (_entry = entry[index + 1]) != null ? _entry : [],
        maxW = _ref2[1];

    maxW = parseFloat(maxW) > 0 ? subtract(maxW) : undefined;
    return {
      breakpoint: breakpoint,
      minW: minW,
      maxW: maxW,
      maxWQuery: queryString(null, maxW),
      minWQuery: queryString(minW),
      minMaxQuery: queryString(minW, maxW)
    };
  });

  var _keys = keys(breakpoints);

  var _keysArr = Array.from(_keys.values());

  return {
    keys: _keys,
    normalized: normalized,
    isResponsive: function isResponsive(test) {
      var keys = Object.keys(test);
      return keys.length > 0 && keys.every(function (key) {
        return _keys.has(key);
      });
    },
    asObject: sortBps(breakpoints),
    asArray: normalize(breakpoints),
    details: queries,
    media: [null].concat(normalized.map(function (minW) {
      return queryString(minW);
    }).slice(1)),
    toArrayValue: function toArrayValue(test) {
      if (!(0, _assertion.isObject)(test)) {
        throw new Error("toArrayValue: value must be an object");
      }

      var result = _keysArr.map(function (bp) {
        var _test$bp;

        return (_test$bp = test[bp]) != null ? _test$bp : null;
      });

      while ((0, _array.getLastItem)(result) === null) {
        result.pop();
      }

      return result;
    },
    toObjectValue: function toObjectValue(test) {
      if (!Array.isArray(test)) {
        throw new Error("toObjectValue: value must be an array");
      }

      return test.reduce(function (acc, value, index) {
        var key = _keysArr[index];
        if (key != null && value != null) acc[key] = value;
        return acc;
      }, {});
    }
  };
}

/**
 * since breakpoints are defined as custom properties on an array, you may
 * `Object.keys(theme.breakpoints)` to retrieve both regular numeric indices
 * and custom breakpoints as string.
 *
 * This function returns true given a custom array property.
 */
var isCustomBreakpoint = function isCustomBreakpoint(maybeBreakpoint) {
  return Number.isNaN(Number(maybeBreakpoint));
};

exports.isCustomBreakpoint = isCustomBreakpoint;
//# sourceMappingURL=responsive.js.map