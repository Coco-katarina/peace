"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Logger = function Logger(logEvent) {
  var _this = this;

  _classCallCheck(this, Logger);

  _defineProperty(this, "logPageView", function () {
    if (_this.logEvent) {
      _this.logEvent('pageview');
    }
  });

  _defineProperty(this, "logException", function (category, isSerious) {
    if (_this.logEvent) {
      _this.logEvent('exception', category, isSerious);
    }
  });

  _defineProperty(this, "logTask", function (category, taskType, taskTakeTime) {
    if (_this.logEvent) {
      _this.logEvent('task', category, taskType, taskTakeTime || undefined);
    }
  });

  _defineProperty(this, "logTime", function (category, timingVariable, label, value) {
    if (_this.logEvent) {
      _this.logEvent('timing', category, timingVariable, label, value);
    }
  });

  _defineProperty(this, "logEvent", function (category, action, label, value) {
    if (_this.logEvent) {
      _this.logEvent('event', category, action, label, value);
    }
  });

  this.logEvent = logEvent;
};

exports["default"] = Logger;