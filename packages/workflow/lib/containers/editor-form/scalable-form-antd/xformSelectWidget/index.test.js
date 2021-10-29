"use strict";

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../index"));

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('xform Select widget test', function () {
  var _uiSchema;

  var xform, form;
  var INIT_FORM_DATA = {
    company: '',
    district: 'chaoyang',
    city: 'hangzhou'
  };
  var BIZ_DATA = {
    company: {
      fieldType: 'system',
      canSearch: true
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
      required: ['company'],
      properties: {
        company: {
          type: "string",
          title: "请选择公司",
          data: [{
            "label": "阿里",
            "value": "alibaba"
          }, {
            "label": "腾讯",
            "value": "tencent"
          }],
          "enum": ['alibaba', 'tencent'],
          enumNames: ["阿里", "腾讯"]
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
          enumNames: ['北京', '上海', '杭州']
        }
      }
    },
    uiSchema: (_uiSchema = {
      company: {
        "ui:widget": "select",
        "ui:options": {
          validate: [{
            type: 'empty',
            message: '请至少选择一项'
          }]
        }
      }
    }, _defineProperty(_uiSchema, "company", {
      "ui:widget": "select",
      "ui:options": {
        validate: [{
          type: 'empty',
          message: '请至少选择一项'
        }]
      }
    }), _defineProperty(_uiSchema, "company", {
      "ui:widget": "select",
      "ui:options": {
        validate: [{
          type: 'empty',
          message: '请至少选择一项'
        }]
      }
    }), _uiSchema),
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
  it('xform select validate', function () {
    expect(xform.find('.ant-form-explain').first().text()).toBe('请至少选择一项');
  });
  it('xform select noValue onChange', function () {
    var item = xform.find('.xform-item').at(0);
    var Select = item.find('Select').first();
    var change = Select.props().onChange();
    expect(Select).toBeDefined();
  });
  it('xform select hasValue onChange', function () {
    var item = xform.find('.xform-item').at(1);
    var Select = item.find('Select').first();
    var change = Select.props().onChange();
    expect(Select).toBeDefined();
  });
});