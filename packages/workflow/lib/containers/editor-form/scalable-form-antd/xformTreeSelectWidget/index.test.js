"use strict";

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../index"));

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * xform treeSelect widget（树形结构选择器） 测试用例
 */
describe('xform treeSelect widget test', function () {
  var xform, form;
  var INIT_FORM_DATA = {
    travel: '',
    subTravel: 'travel-train'
  };
  var BIZ_DATA = {
    travel: {
      fieldType: 'system',
      canSearch: true
    }
  };
  var formSchema = {
    jsonSchema: {
      title: '树形选择器测试',
      description: 'widget测试',
      type: 'object',
      properties: {
        travel: {
          type: "string",
          title: '航程',
          data: [{
            "label": "商旅订单问题",
            "value": "travel",
            "children": [{
              "label": "机票",
              "value": "travel-plane"
            }, {
              "label": "火车票",
              "value": "travel-train"
            }]
          }, {
            "label": "主动护航",
            "value": "safe",
            "children": [{
              "label": "机票",
              "value": "safe-plane"
            }, {
              "label": "火车票",
              "value": "safe-train"
            }]
          }]
        },
        subTravel: {
          type: "string",
          title: '航程',
          data: [{
            "label": "商旅订单问题",
            "value": "travel",
            "children": [{
              "label": "机票",
              "value": "travel-plane"
            }, {
              "label": "火车票",
              "value": "travel-train"
            }]
          }, {
            "label": "主动护航",
            "value": "safe",
            "children": [{
              "label": "机票",
              "value": "safe-plane"
            }, {
              "label": "火车票",
              "value": "safe-train"
            }]
          }]
        }
      }
    },
    uiSchema: {
      travel: {
        "ui:widget": "treeSelect",
        "ui:options": {
          validate: [{
            type: 'empty',
            message: '请至少选择一项'
          }]
        }
      },
      subTravel: {
        "ui:widget": "treeSelect",
        "ui:options": {
          validate: [{
            type: 'empty',
            message: '请至少选择一项'
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
  it('xform select validate', function () {
    expect(xform.find('.ant-form-explain').first().text()).toBe('请至少选择一项');
  });
  it('xform treeSelect noValue onChange', function () {
    var item = xform.find('.xform-item').at(0);
    var Select = item.find('CustomTreeSelect').first();
    var change = Select.props().onChange();
    expect(Select).toBeDefined();
  });
  it('xform treeSelect hasValue onChange', function () {
    var item = xform.find('.xform-item').at(1);
    var Select = item.find('CustomTreeSelect').first();
    var change = Select.props().onChange();
    expect(Select).toBeDefined();
  });
});