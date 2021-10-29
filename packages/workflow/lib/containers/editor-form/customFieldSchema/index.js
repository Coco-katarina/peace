"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _util = require("../common/util");

var _localeMessages = require("../i18n/localeMessages");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 自定义字段基础field数据（bizData需要通过getBizData接口获取，formData默认均为空）
 */
var addCustomRegisterFields = function addCustomRegisterFields(fieldSchema, registerWidgets) {
  registerWidgets.map(function (widget) {
    var widgetFieldSchema = {
      label: widget.label,
      type: widget.type,
      fieldType: 'custom',
      required: false,
      jsonSchema: widget.schema.jsonSchema,
      uiSchema: widget.schema.uiSchema,
      formData: widget.schema.formData
    };
    fieldSchema[widget.type] = widgetFieldSchema;
  });
  return fieldSchema;
};

var _default = {
  getSchema: function getSchema(messages, registerWidgets, supportList) {
    var customFieldSchema = {
      label: {
        label: messages[(0, _localeMessages.getMessageId)('configSchemaLabelLabel')],
        type: 'label',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'string',
          title: messages[(0, _localeMessages.getMessageId)('configSchemaLabelLabel')],
          "default": ''
        },
        uiSchema: {
          'ui:widget': 'label'
        },
        formData: messages[(0, _localeMessages.getMessageId)('configSchemaLabelDefaultValue')]
      },
      Link: {
        label: messages[(0, _localeMessages.getMessageId)('configSchemaLinkLabel')],
        type: 'Link',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'string',
          title: messages[(0, _localeMessages.getMessageId)('configSchemaLinkLabel')],
          "default": ''
        },
        uiSchema: {
          'ui:widget': 'Link'
        },
        formData: ''
      },
      group: {
        label: messages[(0, _localeMessages.getMessageId)('configSchemaGroupLabel')],
        type: 'group',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'object',
          title: messages[(0, _localeMessages.getMessageId)('configSchemaGroupLabel')],
          "default": []
        },
        uiSchema: {
          'ui:widget': 'group',
          'ui:options': {
            'groupName': messages[(0, _localeMessages.getMessageId)('configSchemaGroupNameTitle')]
          }
        },
        formData: []
      },
      input: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaInputLabel')],
        type: 'input',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'string',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaInputLabel')],
          "default": '',
          maxLength: 100000
        },
        uiSchema: {
          'ui:placeholder': messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonInputPlaceholder')]
        },
        formData: ''
      },
      textarea: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaTextareaLabel')],
        type: 'textarea',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'string',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaTextareaLabel')],
          "default": '',
          maxLength: 100000
        },
        uiSchema: {
          'ui:widget': 'textarea',
          'ui:placeholder': messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonInputPlaceholder')]
        },
        formData: ''
      },
      richtext: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaRichtextLabel')],
        type: 'richtext',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'string',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaRichtextLabel')],
          "default": ''
        },
        uiSchema: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonInputPlaceholder')]
          }
        },
        formData: ''
      },
      number: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaNumberLabel')],
        type: 'number',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'number',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaNumberLabel')],
          "default": ''
        },
        uiSchema: {
          'ui:widget': 'updown'
        },
        formData: ''
      },
      slider: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaSliderLabel')],
        type: 'slider',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'number',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaSliderLabel')],
          "default": ''
        },
        uiSchema: {
          'ui:widget': 'slider'
        },
        formData: ''
      },
      sliderRange: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaSliderRangeLabel')],
        type: 'sliderRange',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'array',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaSliderRangeLabel')],
          "default": [],
          items: {
            type: 'number',
            "default": 0,
            "enum": [],
            enumNames: []
          },
          uniqueItems: true
        },
        uiSchema: {
          'ui:widget': 'sliderRange'
        },
        formData: []
      },
      radio: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaRadioLabel')],
        type: 'radio',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'string',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaRadioLabel')],
          "default": '',
          "enum": [_util.util.getRandomString(9), _util.util.getRandomString(9), _util.util.getRandomString(9)],
          enumNames: [messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonOption1')], messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonOption2')], messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonOption3')]]
        },
        uiSchema: {
          'ui:widget': 'radio',
          'ui:options': {
            vertical: false
          }
        },
        formData: ''
      },
      checkbox: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaCheckboxLabel')],
        type: 'checkbox',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'array',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaCheckboxLabel')],
          "default": [],
          items: {
            type: 'string',
            "enum": [_util.util.getRandomString(9), _util.util.getRandomString(9), _util.util.getRandomString(9)],
            enumNames: [messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonOption1')], messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonOption2')], messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonOption3')]]
          },
          uniqueItems: true
        },
        uiSchema: {
          'ui:widget': 'checkboxes',
          'ui:options': {
            vertical: false
          }
        },
        formData: []
      },
      booleanCheckbox: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaBoolCheckboxLabel')],
        type: 'booleanCheckbox',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'boolean',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaBoolCheckboxLabel')],
          "default": false
        },
        uiSchema: {},
        formData: false
      },
      booleanSwitch: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaBoolSwitchLabel')],
        type: 'booleanSwitch',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'boolean',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaBoolSwitchLabel')],
          "default": false
        },
        uiSchema: {
          'ui:widget': 'switch'
        },
        formData: false
      },
      upload: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaUploadLabel')],
        type: 'upload',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'array',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaUploadLabel')],
          "default": [],
          maxFileSize: 10,
          maxFileNum: 10,
          items: {
            type: 'string',
            format: 'data-url'
          },
          uniqueItems: true
        },
        uiSchema: {
          'ui:options': {
            exampleImageUrl: '',
            label: messages[(0, _localeMessages.getMessageId)('fieldSchemaUploadButton')],
            listType: 'picture',
            uploadType: 'picture',
            vertical: true,
            accept: 'image/*'
          }
        },
        formData: []
      },
      file: {
        label: messages[(0, _localeMessages.getMessageId)('configSchemaFileUploadLabel')],
        type: 'file',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'array',
          title: messages[(0, _localeMessages.getMessageId)('configSchemaFileUploadLabel')],
          maxFileSize: 10,
          maxFileNum: 10,
          items: {
            type: 'string',
            format: 'data-url',
            "default": ''
          },
          uniqueItems: true
        },
        uiSchema: {
          'ui:options': {
            templateFileUrl: '',
            label: messages[(0, _localeMessages.getMessageId)('fieldSchemaFileUploadButton')],
            accept: '*/*'
          }
        },
        formData: []
      },
      select: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaSelectLabel')],
        type: 'select',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'string',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaSelectLabel')],
          "default": '',
          "enum": [_util.util.getRandomString(9), _util.util.getRandomString(9), _util.util.getRandomString(9)],
          enumNames: [messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonOption1')], messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonOption2')], messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonOption3')]]
        },
        uiSchema: {
          'ui:widget': 'select',
          'ui:placeholder': messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonSelectPlaceholder')]
        },
        formData: ''
      },
      multiSelect: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaMultiSelectLabel')],
        type: 'multiSelect',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'string',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaMultiSelectLabel')],
          "default": [],
          "enum": [_util.util.getRandomString(9), _util.util.getRandomString(9), _util.util.getRandomString(9)],
          enumNames: [messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonOption1')], messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonOption2')], messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonOption3')]]
        },
        uiSchema: {
          'ui:widget': 'multiSelect',
          'ui:placeholder': messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonSelectPlaceholder')]
        },
        formData: []
      },
      cascaderSelect: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaCascaderSelectLabel')],
        type: 'cascaderSelect',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'string',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaCascaderSelectLabel')],
          "default": [],
          "enum": [_util.util.getRandomString(9), _util.util.getRandomString(9), _util.util.getRandomString(9)],
          enumNames: [messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonOption1')], messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonOption2')], messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonOption3')]]
        },
        uiSchema: {
          'ui:widget': 'cascader',
          'ui:placeholder': messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonSelectPlaceholder')]
        },
        formData: []
      },
      suggestSelect: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaSuggestSelectLabel')],
        type: 'suggestSelect',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'string',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaSuggestSelectLabel')],
          "default": '',
          "enum": [_util.util.getRandomString(9), _util.util.getRandomString(9), _util.util.getRandomString(9)],
          enumNames: [messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonOption1')], messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonOption2')], messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonOption3')]]
        },
        uiSchema: {
          'ui:widget': 'suggestSelect',
          'ui:placeholder': messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonSelectPlaceholder')]
        },
        formData: ''
      },
      treeSelect: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaTreeSelectLabel')],
        type: 'treeSelect',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'string',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaTreeSelectLabel')],
          "default": ''
        },
        uiSchema: {
          'ui:widget': 'treeSelect',
          'ui:placeholder': messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonSelectPlaceholder')]
        },
        formData: ''
      },
      multiTreeSelect: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaMultiTreeSelectLabel')],
        type: 'multiTreeSelect',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'string',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaMultiTreeSelectLabel')],
          "default": []
        },
        uiSchema: {
          'ui:widget': 'multiTreeSelect',
          'ui:placeholder': messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonSelectPlaceholder')]
        },
        formData: []
      },
      date: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaDateLabel')],
        type: 'date',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'string',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaDateLabel')],
          "default": '',
          format: 'date'
        },
        uiSchema: {
          'ui:widget': 'date',
          'ui:placeholder': messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonSelectPlaceholder')],
          'ui:options': {
            format: 'YYYY-MM-DD'
          }
        },
        formData: ''
      },
      dateRange: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaDateRangeLabel')],
        type: 'dateRange',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'array',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaDateRangeLabel')],
          "default": [],
          items: {
            type: 'string',
            "enum": [],
            enumNames: []
          },
          uniqueItems: true
        },
        uiSchema: {
          'ui:widget': 'dateRange',
          'ui:options': {
            'placeholder': [messages[(0, _localeMessages.getMessageId)('fieldSchemaDateRangePlaceholder1')], messages[(0, _localeMessages.getMessageId)('fieldSchemaDateRangePlaceholder2')]]
          }
        },
        formData: []
      },
      datetime: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaDateTimeLabel')],
        type: 'datetime',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'string',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaDateTimeLabel')],
          "default": '',
          format: 'date-time'
        },
        uiSchema: {
          'ui:widget': 'datetime',
          'ui:placeholder': messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonSelectPlaceholder')],
          'ui:options': {
            format: 'YYYY-MM-DD HH:mm:ss'
          }
        },
        formData: ''
      },
      rate: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaRateLabel')],
        type: 'rate',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'string',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaRateLabel')],
          "default": '',
          "enum": [_util.util.getRandomString(9), _util.util.getRandomString(9), _util.util.getRandomString(9), _util.util.getRandomString(9), _util.util.getRandomString(9)],
          enumNames: [messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonRateOption1')], messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonRateOption2')], messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonRateOption3')], messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonRateOption4')], messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonRateOption5')]]
        },
        uiSchema: {
          'ui:widget': 'rate'
        },
        formData: ''
      },
      //高德地图选择控件
      amapInput: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaAmapLabel')],
        type: 'amapInput',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'string',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaAmapLabel')],
          "default": '',
          maxLength: 200
        },
        uiSchema: {
          'ui:widget': 'amapInput',
          'ui:placeholder': messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonInputPlaceholder')]
        },
        formData: ''
      },
      // button: {
      //     label: messages[getMessageId('fieldSchemaButtonLabel')],
      //     type: 'button',
      //     fieldType: 'custom',
      //     required: false,
      //     jsonSchema: {
      //         type: 'string',
      //         default: '',
      //         enum: ['提交', '取消',/*  '保存草稿', */ '弹出控件组'],
      //         enumNames: [
      //             '提交',
      //             '取消',
      //             // '保存草稿',
      //             '弹出控件组',
      //         ]
      //     },
      //     uiSchema: {
      //         'ui:widget': 'button',
      //     },
      //     formData: ''
      // },
      //穿梭框控件
      Transfer: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaTransfer')],
        type: 'Transfer',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'string',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaTransfer')],
          "default": '' // enum: [util.getRandomString(9), util.getRandomString(9)],
          // enumNames: [
          //     '表格',
          //     '普通',
          // ]

        },
        uiSchema: {
          'ui:widget': 'Transfer',
          'ui:leftTitle': '待选人员',
          'ui:rightTitle': '已选人员'
        },
        formData: []
      },
      //印章选择控件
      // Stamp: {
      //     label: messages[getMessageId('fieldSchemaStampLabel')],
      //     type: 'Stamp',
      //     fieldType: 'custom',
      //     required: false,
      //     jsonSchema: {
      //         type: 'string',
      //         title: messages[getMessageId('fieldSchemaStampLabel')],
      //         default: '',
      //         maxLength: 200
      //     },
      //     uiSchema: {
      //         'ui:widget': 'Stamp',
      //         'ui:placeholder': messages[getMessageId('fieldSchemaCommonSelectPlaceholder')]
      //     },
      //     formData: ''
      // },
      TableSelect: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaTableSelectLabel')],
        type: 'TableSelect',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'string',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaTableSelectLabel')],
          "default": '',
          maxLength: 200
        },
        uiSchema: {
          'ui:widget': 'TableSelect',
          'ui:placeholder': messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonSelectPlaceholder')]
        },
        formData: ''
      },
      Table: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaTableLabel')],
        type: 'Table',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'object',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaTableLabel')],
          "default": []
        },
        uiSchema: {
          'ui:widget': 'Table',
          'ui:options': {
            'groupName': messages[(0, _localeMessages.getMessageId)('configSchemaTableNameTitle')]
          }
        },
        formData: ''
      },
      Calculate: {
        label: messages[(0, _localeMessages.getMessageId)('fieldSchemaCalculateLabel')],
        type: 'Calculate',
        fieldType: 'custom',
        required: false,
        jsonSchema: {
          type: 'number',
          title: messages[(0, _localeMessages.getMessageId)('fieldSchemaCalculateLabel')],
          "default": ''
        },
        uiSchema: {
          'ui:widget': 'updown',
          'ui:options': {// 'algorithm': 'sum'
          }
        },
        formData: ''
      }
    };

    if (supportList && supportList.length > 0) {
      var filterSchema = {};
      supportList.map(function (support) {
        filterSchema[support] = customFieldSchema[support];
      });
      return addCustomRegisterFields(filterSchema, registerWidgets);
    } else {
      return addCustomRegisterFields(customFieldSchema, registerWidgets);
    }
  }
};
exports["default"] = _default;