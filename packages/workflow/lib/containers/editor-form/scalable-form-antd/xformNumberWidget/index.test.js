"use strict";

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../index"));

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * xform NumberInput widget（数字输入框） 测试用例
 */
describe('xform numberInput widget test', function () {
  var xform, form;
  var INIT_FORM_DATA = {
    num: '',
    number: 10
  };
  var BIZ_DATA = {
    num: {
      fieldType: 'universal',
      canSearch: true
    },
    number: {
      fieldType: 'universal',
      canSearch: true
    }
  };
  var formSchema = {
    jsonSchema: {
      description: 'widget测试',
      type: 'object',
      required: ["number"],
      properties: {
        num: {
          type: 'number',
          title: '数目'
        },
        number: {
          type: 'number',
          title: '个数'
        }
      }
    },
    uiSchema: {
      num: {
        'ui:widget': 'updown',
        'ui:options': {
          placeholder: '请输入',
          validate: [{
            type: 'empty',
            message: '该字段不能为空'
          }]
        }
      },
      number: {
        'ui:widget': 'updown',
        'ui:options': {
          placeholder: '请输入',
          validate: [{
            type: 'empty',
            message: '该字段不能为空'
          }]
        }
      }
    },
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
    form = xform.find('form').first();
    form.simulate('submit');
  });
  it('xform renders form label', function () {
    var form = xform.find('form').first();
    expect(form).toBeDefined();
  });
  it('xform renders item length to 2', function () {
    expect(xform.find('.xform-item').length).toBe(2);
  });
  it('xform numberInput validate', function () {
    expect(xform.find('.ant-form-explain').first().text()).toBe('该字段不能为空');
  });
  it('xform renders numberInput with initvalue', function () {
    var input = xform.find('input').at(1);
    expect(input.node.value).toBe('10');
  });
  it('xform number hasValue onChange', function () {
    var item = xform.find('.xform-item').at(0);
    var InputNumber = item.find('InputNumber').first();
    var change = InputNumber.props().onChange();
    expect(InputNumber).toBeDefined();
  });
});