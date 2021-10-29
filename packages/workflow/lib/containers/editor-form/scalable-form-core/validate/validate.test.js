"use strict";

var _utils = require("./utils");

describe('Validate Test', function () {
  it('isEmpty', function () {
    expect((0, _utils.isEmpty)('', 'string')).toBe(true);
  });
  it('isEmpty', function () {
    expect((0, _utils.isEmpty)([], 'array')).toBe(true);
  });
  it('isEmpty', function () {
    expect((0, _utils.isEmpty)({}, 'object')).toBe(true);
  });
  it('isId', function () {
    expect((0, _utils.isId)('880881198999999999')).toBe(true);
  });
  it('isUrl', function () {
    expect((0, _utils.isUrl)('https://www.taobao.com')).toBe(true);
  });
  it('isEmail', function () {
    expect((0, _utils.isEmail)('abc@taobao.com')).toBe(true);
  });
  it('isMoney', function () {
    expect((0, _utils.isMoney)('123.54')).toBe(true);
  });
});