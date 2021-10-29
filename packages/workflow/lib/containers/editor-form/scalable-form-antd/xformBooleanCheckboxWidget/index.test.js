"use strict";

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../index"));

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * xform BooleanCheckboxes widget（boolean类型的Checkbox组件） 测试用例
 */
describe('xform BooleanCheckbox widget test', function () {
  var xform;
  var INIT_FORM_DATA = {
    isFavouriteCity: false
  };
  var BIZ_DATA = {
    isFavouriteCity: {
      fieldType: 'system',
      canSearch: false
    }
  };
  var formSchema = {
    jsonSchema: {
      description: 'widget测试',
      type: 'object',
      required: ['note'],
      properties: {
        isFavouriteCity: {
          type: 'boolean',
          title: '请问这是你喜欢的城市吗？'
        }
      }
    },
    uiSchema: {},
    formData: INIT_FORM_DATA,
    bizData: BIZ_DATA
  };
  beforeEach(function () {
    xform = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_index["default"], {
      jsonSchema: formSchema.jsonSchema,
      uiSchema: formSchema.uiSchema,
      formData: formSchema.formData,
      bizData: formSchema.bizData
    }));
  });
  it('xform renders form label', function () {
    var form = xform.find('form').first();
    expect(form).toBeDefined();
  });
  it('xform renders item length to be 1', function () {
    expect(xform.find('.xform-item').length).toBe(1);
  });
  it('xform renders label', function () {
    var label = xform.find('label');
    expect(label).toBeDefined();
  });
  it('xform Checkboxed onchange', function () {
    var item = xform.find('.xform-item').at(0);
    var input = item.find('input[type="checkbox"]').at(0);
    input.simulate('change', {
      target: {
        checked: true
      }
    });
    expect(input.node.checked).toBe(true);
  });
});