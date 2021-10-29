/**
 * 自定义字段基础field数据（bizData需要通过getBizData接口获取，formData默认均为空）
 */

import { util } from '../common/util';
import { getMessageId } from '../i18n/localeMessages';
import moment from 'moment';

const addCustomRegisterFields = (fieldSchema, registerWidgets) => {
    registerWidgets.map((widget) => {
        let widgetFieldSchema = {
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

export default {
    getSchema: (messages, registerWidgets, supportList) => {
        const customFieldSchema = {
            label: {
                label: messages[getMessageId('configSchemaLabelLabel')],
                type: 'label',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'string',
                    title: messages[getMessageId('configSchemaLabelLabel')],
                    default: ''
                },
                uiSchema: {
                    'ui:widget': 'label',
        
                },
                formData: messages[getMessageId('configSchemaLabelDefaultValue')]
            },
            Link: {
                label: messages[getMessageId('configSchemaLinkLabel')],
                type: 'Link',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'string',
                    title: messages[getMessageId('configSchemaLinkLabel')],
                    default: ''
                },
                uiSchema: {
                    'ui:widget': 'Link',
                },
                formData: ''
            },
            group: {
                label: messages[getMessageId('configSchemaGroupLabel')],
                type: 'group',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'object',
                    title: messages[getMessageId('configSchemaGroupLabel')],
                    default: []
                },
                uiSchema: {
                    'ui:widget': 'group',
                    'ui:options': {
                        'groupName': messages[getMessageId('configSchemaGroupNameTitle')]
                    }
                },
                formData: []
            },
            input: {
                label: messages[getMessageId('fieldSchemaInputLabel')],
                type: 'input',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'string',
                    title: messages[getMessageId('fieldSchemaInputLabel')],
                    default: '',
                    maxLength: 100000
                },
                uiSchema: {
                    'ui:placeholder': messages[getMessageId('fieldSchemaCommonInputPlaceholder')]
                },
                formData: ''
            },
            textarea: {
                label: messages[getMessageId('fieldSchemaTextareaLabel')],
                type: 'textarea',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'string',
                    title: messages[getMessageId('fieldSchemaTextareaLabel')],
                    default: '',
                    maxLength: 100000
                },
                uiSchema: {
                    'ui:widget': 'textarea',
                    'ui:placeholder': messages[getMessageId('fieldSchemaCommonInputPlaceholder')]
                },
                formData: ''
            },
            richtext: {
                label: messages[getMessageId('fieldSchemaRichtextLabel')],
                type: 'richtext',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'string',
                    title: messages[getMessageId('fieldSchemaRichtextLabel')],
                    default: ''
                },
                uiSchema: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('fieldSchemaCommonInputPlaceholder')]
                    }
                },
                formData: ''
            },
            number: {
                label: messages[getMessageId('fieldSchemaNumberLabel')],
                type: 'number',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'number',
                    title: messages[getMessageId('fieldSchemaNumberLabel')],
                    default: ''
                },
                uiSchema: {
                    'ui:widget': 'updown'
                },
                formData: ''
            },
            slider: {
                label: messages[getMessageId('fieldSchemaSliderLabel')],
                type: 'slider',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'number',
                    title: messages[getMessageId('fieldSchemaSliderLabel')],
                    default: ''
                },
                uiSchema: {
                    'ui:widget': 'slider'
                },
                formData: ''
            },
            sliderRange: {
                label: messages[getMessageId('fieldSchemaSliderRangeLabel')],
                type: 'sliderRange',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'array',
                    title: messages[getMessageId('fieldSchemaSliderRangeLabel')],
                    default: [],
                    items: {
                        type: 'number',
                        default: 0,
                        enum: [],
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
                label: messages[getMessageId('fieldSchemaRadioLabel')],
                type: 'radio',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'string',
                    title: messages[getMessageId('fieldSchemaRadioLabel')],
                    default: '',
                    enum: [util.getRandomString(9), util.getRandomString(9), util.getRandomString(9)],
                    enumNames: [
                        messages[getMessageId('fieldSchemaCommonOption1')],
                        messages[getMessageId('fieldSchemaCommonOption2')],
                        messages[getMessageId('fieldSchemaCommonOption3')]
                    ]
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
                label: messages[getMessageId('fieldSchemaCheckboxLabel')],
                type: 'checkbox',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'array',
                    title: messages[getMessageId('fieldSchemaCheckboxLabel')],
                    default: [],
                    items: {
                        type: 'string',
                        enum: [util.getRandomString(9), util.getRandomString(9), util.getRandomString(9)],
                        enumNames: [
                            messages[getMessageId('fieldSchemaCommonOption1')],
                            messages[getMessageId('fieldSchemaCommonOption2')],
                            messages[getMessageId('fieldSchemaCommonOption3')]
                        ]
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
                label: messages[getMessageId('fieldSchemaBoolCheckboxLabel')],
                type: 'booleanCheckbox',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'boolean',
                    title: messages[getMessageId('fieldSchemaBoolCheckboxLabel')],
                    default: false
                },
                uiSchema: {},
                formData: false
            },
            booleanSwitch: {
                label: messages[getMessageId('fieldSchemaBoolSwitchLabel')],
                type: 'booleanSwitch',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'boolean',
                    title: messages[getMessageId('fieldSchemaBoolSwitchLabel')],
                    default: false
                },
                uiSchema: {
                    'ui:widget': 'switch'
                },
                formData: false
            },
            upload: {
                label: messages[getMessageId('fieldSchemaUploadLabel')],
                type: 'upload',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'array',
                    title: messages[getMessageId('fieldSchemaUploadLabel')],
                    default: [],
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
                        label: messages[getMessageId('fieldSchemaUploadButton')],
                        listType: 'picture',
                        uploadType: 'picture',
                        vertical: true,
                        accept: 'image/*'
                    }
                },
                formData: []
            },
            file: {
                label: messages[getMessageId('configSchemaFileUploadLabel')],
                type: 'file',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'array',
                    title: messages[getMessageId('configSchemaFileUploadLabel')],
                    maxFileSize: 10,
                    maxFileNum: 10,
                    items: {
                        type: 'string',
                        format: 'data-url',
                        default: ''
                    },
                    uniqueItems: true
                },
                uiSchema: {
                    'ui:options': {
                        templateFileUrl: '',
                        label: messages[getMessageId('fieldSchemaFileUploadButton')],
                        accept: '*/*'
                    }
                },
                formData: []
            },
            select: {
                label: messages[getMessageId('fieldSchemaSelectLabel')],
                type: 'select',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'string',
                    title: messages[getMessageId('fieldSchemaSelectLabel')],
                    default: '',
                    enum: [util.getRandomString(9), util.getRandomString(9), util.getRandomString(9)],
                    enumNames: [
                        messages[getMessageId('fieldSchemaCommonOption1')],
                        messages[getMessageId('fieldSchemaCommonOption2')],
                        messages[getMessageId('fieldSchemaCommonOption3')]
                    ]
                },
                uiSchema: {
                    'ui:widget': 'select',
                    'ui:placeholder': messages[getMessageId('fieldSchemaCommonSelectPlaceholder')]
                },
                formData: ''
            },
            multiSelect: {
                label: messages[getMessageId('fieldSchemaMultiSelectLabel')],
                type: 'multiSelect',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'string',
                    title: messages[getMessageId('fieldSchemaMultiSelectLabel')],
                    default: [],
                    enum: [util.getRandomString(9), util.getRandomString(9), util.getRandomString(9)],
                    enumNames: [
                        messages[getMessageId('fieldSchemaCommonOption1')],
                        messages[getMessageId('fieldSchemaCommonOption2')],
                        messages[getMessageId('fieldSchemaCommonOption3')]
                    ]
                },
                uiSchema: {
                    'ui:widget': 'multiSelect',
                    'ui:placeholder': messages[getMessageId('fieldSchemaCommonSelectPlaceholder')]
                },
                formData: []
            },
            cascaderSelect: {
                label: messages[getMessageId('fieldSchemaCascaderSelectLabel')],
                type: 'cascaderSelect',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'string',
                    title: messages[getMessageId('fieldSchemaCascaderSelectLabel')],
                    default: [],
                    enum: [util.getRandomString(9), util.getRandomString(9), util.getRandomString(9)],
                    enumNames: [
                        messages[getMessageId('fieldSchemaCommonOption1')],
                        messages[getMessageId('fieldSchemaCommonOption2')],
                        messages[getMessageId('fieldSchemaCommonOption3')]
                    ]
                },
                uiSchema: {
                    'ui:widget': 'cascader',
                    'ui:placeholder': messages[getMessageId('fieldSchemaCommonSelectPlaceholder')]
                },
                formData: []
            },
            suggestSelect: {
                label: messages[getMessageId('fieldSchemaSuggestSelectLabel')],
                type: 'suggestSelect',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'string',
                    title: messages[getMessageId('fieldSchemaSuggestSelectLabel')],
                    default: '',
                    enum: [util.getRandomString(9), util.getRandomString(9), util.getRandomString(9)],
                    enumNames: [
                        messages[getMessageId('fieldSchemaCommonOption1')],
                        messages[getMessageId('fieldSchemaCommonOption2')],
                        messages[getMessageId('fieldSchemaCommonOption3')]
                    ]
                },
                uiSchema: {
                    'ui:widget': 'suggestSelect',
                    'ui:placeholder': messages[getMessageId('fieldSchemaCommonSelectPlaceholder')]
                },
                formData: ''
            },
            treeSelect: {
                label: messages[getMessageId('fieldSchemaTreeSelectLabel')],
                type: 'treeSelect',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'string',
                    title: messages[getMessageId('fieldSchemaTreeSelectLabel')],
                    default: ''
                },
                uiSchema: {
                    'ui:widget': 'treeSelect',
                    'ui:placeholder': messages[getMessageId('fieldSchemaCommonSelectPlaceholder')]
        
                },
                formData: ''
            },
            multiTreeSelect: {
                label: messages[getMessageId('fieldSchemaMultiTreeSelectLabel')],
                type: 'multiTreeSelect',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'string',
                    title: messages[getMessageId('fieldSchemaMultiTreeSelectLabel')],
                    default: []
                },
                uiSchema: {
                    'ui:widget': 'multiTreeSelect',
                    'ui:placeholder': messages[getMessageId('fieldSchemaCommonSelectPlaceholder')]
        
                },
                formData: []
            },
            date: {
                label: messages[getMessageId('fieldSchemaDateLabel')],
                type: 'date',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'string',
                    title: messages[getMessageId('fieldSchemaDateLabel')],
                    default: '',
                    format: 'date'
                },
                uiSchema: {
                    'ui:widget': 'date',
                    'ui:placeholder': messages[getMessageId('fieldSchemaCommonSelectPlaceholder')],
                    'ui:options': {
                        format: 'YYYY-MM-DD'
                    }
                },
                formData: ''
            },
            dateRange: {
                label: messages[getMessageId('fieldSchemaDateRangeLabel')],
                type: 'dateRange',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'array',
                    title: messages[getMessageId('fieldSchemaDateRangeLabel')],
                    default: [],
                    items: {
                        type: 'string',
                        enum: [],
                        enumNames: []
                    },
                    uniqueItems: true
                },
                uiSchema: {
                    'ui:widget': 'dateRange',
                    'ui:options': {
                        'placeholder': [
                            messages[getMessageId('fieldSchemaDateRangePlaceholder1')],
                            messages[getMessageId('fieldSchemaDateRangePlaceholder2')]
                        ]
                    }
                },
                formData: []
            },
            datetime: {
                label: messages[getMessageId('fieldSchemaDateTimeLabel')],
                type: 'datetime',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'string',
                    title: messages[getMessageId('fieldSchemaDateTimeLabel')],
                    default: '',
                    format: 'date-time'
                },
                uiSchema: {
                    'ui:widget': 'datetime',
                    'ui:placeholder': messages[getMessageId('fieldSchemaCommonSelectPlaceholder')],
                    'ui:options': {
                        format: 'YYYY-MM-DD HH:mm:ss'
                    }
                },
                formData: ''
            },
            rate: {
                label: messages[getMessageId('fieldSchemaRateLabel')],
                type: 'rate',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'string',
                    title: messages[getMessageId('fieldSchemaRateLabel')],
                    default: '',
                    enum: [util.getRandomString(9), util.getRandomString(9), util.getRandomString(9), util.getRandomString(9), util.getRandomString(9)],
                    enumNames: [
                        messages[getMessageId('fieldSchemaCommonRateOption1')],
                        messages[getMessageId('fieldSchemaCommonRateOption2')],
                        messages[getMessageId('fieldSchemaCommonRateOption3')],
                        messages[getMessageId('fieldSchemaCommonRateOption4')],
                        messages[getMessageId('fieldSchemaCommonRateOption5')]
                    ]
                },
                uiSchema: {
                    'ui:widget': 'rate'
                },
                formData: ''
            },
            //高德地图选择控件
            amapInput: {
                label: messages[getMessageId('fieldSchemaAmapLabel')],
                type: 'amapInput',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'string',
                    title: messages[getMessageId('fieldSchemaAmapLabel')],
                    default: '',
                    maxLength: 200
                },
                uiSchema: {
                    'ui:widget': 'amapInput',
                    'ui:placeholder': messages[getMessageId('fieldSchemaCommonInputPlaceholder')]
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
                label: messages[getMessageId('fieldSchemaTransfer')],
                type: 'Transfer',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'string',
                    title: messages[getMessageId('fieldSchemaTransfer')],
                    default: '',
                    // enum: [util.getRandomString(9), util.getRandomString(9)],
                    // enumNames: [
                    //     '表格',
                    //     '普通',
                    // ]
                },
                uiSchema: {
                    'ui:widget': 'Transfer',
                    'ui:leftTitle': '待选人员',
                    'ui:rightTitle': '已选人员',
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
                label: messages[getMessageId('fieldSchemaTableSelectLabel')],
                type: 'TableSelect',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'string',
                    title: messages[getMessageId('fieldSchemaTableSelectLabel')],
                    default: '',
                    maxLength: 200
                },
                uiSchema: {
                    'ui:widget': 'TableSelect',
                    'ui:placeholder': messages[getMessageId('fieldSchemaCommonSelectPlaceholder')]
                },
                formData: ''
            },
            Table: {
                label: messages[getMessageId('fieldSchemaTableLabel')],
                type: 'Table',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'object',
                    title: messages[getMessageId('fieldSchemaTableLabel')],
                    default: []
                },
                uiSchema: {
                    'ui:widget': 'Table',
                    'ui:options': {
                        'groupName': messages[getMessageId('configSchemaTableNameTitle')],
                    }
                },
                formData: ''
            },
            Calculate: {
                label: messages[getMessageId('fieldSchemaCalculateLabel')],
                type: 'Calculate',
                fieldType: 'custom',
                required: false,
                jsonSchema: {
                    type: 'number',
                    title: messages[getMessageId('fieldSchemaCalculateLabel')],
                    default: ''
                },
                uiSchema: {
                    'ui:widget': 'updown',
                    'ui:options': {
                        // 'algorithm': 'sum'
                    }
                },
                formData: ''
            },
        };
        if (supportList && supportList.length > 0) {
            let filterSchema = {};
            supportList.map((support) => {
                filterSchema[support] = customFieldSchema[support];
            });
            return addCustomRegisterFields(filterSchema, registerWidgets);
        } else {
            return addCustomRegisterFields(customFieldSchema, registerWidgets);
        }

    },
    
};
