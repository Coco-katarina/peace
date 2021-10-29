"use strict";

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../index"));

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * xform textarea widget（多行文本输入框） 测试用例
 */
describe('xform textarea widget test', function () {
  var xform, form;
  var INIT_FORM_DATA = {
    text: '',
    note: '人生如此美妙！'
  };
  var BIZ_DATA = {
    note: {
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
        text: {
          type: 'string',
          title: '备注',
          maxLength: 150
        },
        note: {
          type: 'string',
          title: '备注',
          maxLength: 150
        }
      }
    },
    uiSchema: {
      text: {
        'ui:widget': 'textarea',
        'ui:disabled': false,
        'ui:options': {
          validate: [{
            type: 'empty',
            message: '备注不能为空'
          }]
        }
      },
      note: {
        'ui:widget': 'textarea',
        'ui:disabled': false,
        'ui:options': {
          validate: [{
            type: 'empty',
            message: '备注不能为空'
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
  it('xform renders item length to be 2', function () {
    expect(xform.find('.xform-item').length).toBe(2);
  });
  it('xform renders textarea[type=textarea]', function () {
    var textarea = xform.find('textarea[type="textarea"]');
    expect(textarea).toBeDefined();
  });
  it('xform textarea validate', function () {
    expect(xform.find('.ant-form-explain').first().text()).toBe('备注不能为空');
  });
  it('xform textarea onChange', function () {
    var item = xform.find('.xform-item').at(0);
    var textarea = item.find('TextArea').first();
    var event = {
      currentTarget: {
        value: ''
      }
    };
    var change = textarea.props().onChange(event);
    expect(textarea).toBeDefined();
  });
});