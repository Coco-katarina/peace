"use strict";

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../index"));

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * xform Radio widget（单选器） 测试用例
 */
describe('xform radio widget test', function () {
  var xform, form;
  var INIT_FORM_DATA = {
    company: '',
    district: 'chaoyang',
    city: 'hangzhou'
  };
  var BIZ_DATA = {
    company: {
      fieldType: 'system',
      canSearch: false
    },
    district: {
      fieldType: 'system',
      canSearch: false
    },
    city: {
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
        company: {
          type: 'string',
          title: '请选择公司',
          "enum": ['alibaba', 'tencent'],
          enumNames: ['阿里', '腾讯']
        },
        district: {
          type: 'string',
          title: '请选择城市的地区',
          "enum": ['haidian', 'chaoyang', 'chongwen'],
          enumNames: ['海淀', '朝阳', '崇文']
        },
        city: {
          type: 'string',
          title: '请选择城市',
          "enum": ['beijing', 'shanghai', 'hangzhou'],
          enumNames: ['北京', '上海', '杭州'],
          data: [{
            label: '北京',
            value: 'beijing'
          }]
        }
      }
    },
    uiSchema: {
      company: {
        'ui:widget': 'radio',
        'ui:options': {
          vertical: false,
          validate: [{
            type: 'empty',
            message: '请选择'
          }]
        }
      },
      district: {
        'ui:widget': 'radio',
        'ui:options': {
          vertical: false,
          validate: [{
            type: 'empty',
            message: '请选择'
          }],
          style: "test"
        }
      },
      city: {
        'ui:widget': 'radio',
        'ui:options': {
          vertical: false,
          validate: [{
            type: 'empty',
            message: '请选择'
          }],
          style: "button"
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
  it('xform renders item length to be 3', function () {
    expect(xform.find('.xform-item').length).toBe(3);
  });
  it('xform radio validate', function () {
    expect(xform.find('.ant-form-explain').first().text()).toBe('请选择');
  });
  it('xform radio style onchange', function () {
    var item = xform.find('.xform-item').at(0);
    var input = item.find('input[type="radio"]').at(0);
    input.simulate('change', {
      target: {
        checked: true
      }
    });
    expect(input.node.checked).toBe(true);
  });
  it('xform radio button onchange', function () {
    var item = xform.find('.xform-item').at(2);
    var input = item.find('input[type="radio"]').at(0);
    input.simulate('change', {
      target: {
        checked: true
      }
    });
    expect(input.node.checked).toBe(true);
  });
});