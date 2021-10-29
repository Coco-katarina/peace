"use strict";

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../index"));

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * xform DateRangePicker widget（日期范围选择器） 测试用例
 */
describe('xform DateRangePicker widget test', function () {
  var xform, form;
  var INIT_FORM_DATA = {
    beginDateRange: '',
    endDateRange: '',
    arriveDateRange: ['2017-08-09', '2017-09-13']
  };
  var BIZ_DATA = {
    beginDateRange: {
      fieldType: 'system',
      canSearch: true
    },
    endDateRange: {
      fieldType: 'system',
      canSearch: true
    },
    arriveDateRange: {
      fieldType: 'system',
      canSearch: true
    }
  };
  var formSchema = {
    jsonSchema: {
      description: 'widget测试',
      type: 'object',
      required: ['beginDateRange', 'endDateRange', 'arriveDateRange'],
      properties: {
        beginDateRange: {
          type: 'array',
          title: '开始的日期区间',
          items: {
            type: 'string',
            "enum": [],
            enumNames: []
          },
          uniqueItems: true
        },
        endDateRange: {
          type: 'array',
          title: '结束的日期区间',
          items: {
            type: 'string',
            "enum": [],
            enumNames: []
          },
          uniqueItems: true
        },
        arriveDateRange: {
          type: 'array',
          title: '到达的日期区间',
          items: {
            type: 'string',
            "enum": [],
            enumNames: []
          },
          uniqueItems: true
        }
      }
    },
    uiSchema: {
      beginDateRange: {
        'ui:widget': 'dateRange',
        'ui:options': {
          placeholder: ['起始日期', '结束日期'],
          validate: [{
            type: 'empty',
            message: '该项为必填项'
          }]
        }
      },
      endDateRange: {
        'ui:widget': 'dateRange',
        'ui:options': {
          placeholder: ['起始日期', '结束日期'],
          validate: [{
            type: 'empty',
            message: '该项为必填项'
          }]
        }
      },
      arriveDateRange: {
        'ui:widget': 'dateRange',
        'ui:options': {
          placeholder: ['起始日期', '结束日期'],
          validate: [{
            type: 'empty',
            message: '该项为必填项'
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
  it('xform renders item length to be 3', function () {
    expect(xform.find('.xform-item').length).toBe(3);
  });
  it('xform dateRangePicker validate', function () {
    expect(xform.find('.ant-form-explain').first().text()).toBe('该项为必填项');
  });
  it('xform RangePicker noValue onChange', function () {
    var item = xform.find('.xform-item').at(0);
    var RangePicker = item.find('RangePicker').first();
    var change = RangePicker.props().onChange();
    expect(RangePicker).toBeDefined();
  });
  it('xform RangePicker hasValue onChange', function () {
    var item = xform.find('.xform-item').at(2);
    var RangePicker = item.find('RangePicker').first();
    var change = RangePicker.props().onChange();
    expect(RangePicker).toBeDefined();
  });
});