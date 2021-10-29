"use strict";

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../index"));

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * xform input widget（普通文本输入框） 测试用例
 */
describe('xform input widget test', function () {
  var xform, form;

  var noop = function noop() {};

  var INIT_FORM_DATA = {
    name: '',
    bizName: '初始值'
  };
  var BIZ_DATA = {
    name: {
      fieldType: 'universal',
      canSearch: true
    },
    bizName: {
      fieldType: 'universal',
      canSearch: true
    }
  };
  var formSchema = {
    jsonSchema: {
      description: 'widget测试',
      type: 'object',
      required: ['name', 'bizName'],
      properties: {
        name: {
          type: 'string',
          title: '名称',
          maxLength: 15
        },
        bizName: {
          type: 'string',
          title: '业务视图名称',
          maxLength: 15
        }
      }
    },
    uiSchema: {
      name: {
        'ui:options': {
          placeholder: '请输入',
          validate: [{
            type: 'empty',
            message: '该字段不能为空'
          }]
        }
      },
      bizName: {
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
    expect(form).toBeDefined();
  });
  it('xform renders item length to be 2', function () {
    expect(xform.find('.xform-item').length).toBe(2);
  });
  it('xform renders input[type=text]', function () {
    var input = xform.find('input[type="text"]');
    expect(input).toBeDefined();
  });
  it('xform input validate', function () {
    expect(xform.find('.ant-form-explain').first().text()).toBe('该字段不能为空');
  });
  it('xform input onChange call', function () {
    var input = xform.find('input[type="text"]').at(1);
    input.node.value = 'Change value';
    input.simulate('change', input);
    expect(input.node.value).toBe('Change value');
  });
});