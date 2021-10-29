"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _localeMessages = require("../i18n/localeMessages");

/**
 * 自定义类型表单配置form的schema（对于不同的自定义类型的表单，可能会有不同的自定义字段属性设置）
 */
var getIntlConfigSchema = function getIntlConfigSchema(messages, registerWidgets, supportList) {
  // hasItemSetting标识这种类型的选择器是否有“下拉框选项设置”
  var configSchema = {
    label: {
      icon: '&#xe674;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaLabelLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: false,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          value: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaValueTitle')]
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaLabelHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        value: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaValuePlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          },
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')]
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        }
      },
      formData: {
        name: '',
        code: '',
        value: messages[(0, _localeMessages.getMessageId)('configSchemaLabelDefaultValue')],
        dataSource: '',
        hidden: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100
      }
    },
    Link: {
      icon: '&#xe674;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaLinkLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: false,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['code', 'value'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          value: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaLinkValueTitle')]
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaLinkHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        value: {
          'ui:widget': 'text',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaValuePlaceholder')]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          },
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')]
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        }
      },
      formData: {
        name: '',
        code: '',
        value: '',
        dataSource: '',
        hidden: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100
      }
    },
    group: {
      icon: '&#xe8b6;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaGroupLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: false,
      hasShowConfigButton: false,
      hasDBOperateButton: true,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['code', 'groupName'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 10
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          groupName: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaGroupNameTitle')],
            maxLength: 10
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          cascade: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCascadeTitle')]
          },
          showGroupTitle: {
            type: 'boolean',
            title: '显示分组标题'
          }
        }
      },
      uiSchema: {
        name: {
          'ui:widget': 'hidden',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaLabelHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')]
          }
        },
        code: {
          'ui:disabled': true,
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        groupName: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaGroupNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaGroupNamePlaceholder')]
            }]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        }
      },
      formData: {
        name: '',
        code: '',
        groupName: '',
        cascade: false,
        shownodes: '',
        disnodes: '',
        childrens: [],
        showGroupTitle: false
      }
    },
    input: {
      icon: '&#xe6fe;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaInputLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: false,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          placeholder: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderTitle')]
          },
          value: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaValueTitle')]
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          validate: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaValidateTitle')],
            "enum": ['', 'email', 'url', 'telephone', 'id', 'digit', 'money'],
            enumNames: [messages[(0, _localeMessages.getMessageId)('configSchemaValidateOption1')], messages[(0, _localeMessages.getMessageId)('configSchemaValidateOption2')], messages[(0, _localeMessages.getMessageId)('configSchemaValidateOption3')], messages[(0, _localeMessages.getMessageId)('configSchemaValidateOption4')], messages[(0, _localeMessages.getMessageId)('configSchemaValidateOption5')], messages[(0, _localeMessages.getMessageId)('configSchemaValidateOption6')], messages[(0, _localeMessages.getMessageId)('configSchemaValidateOption7')]]
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          cascade: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCascadeTitle')]
          },
          maxLength: {
            type: 'number',
            minimum: 0,
            multipleOf: 10,
            title: messages[(0, _localeMessages.getMessageId)('configSchemaMaxLengthTitle')]
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        placeholder: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderPlaceholder')]
          }
        },
        value: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaValuePlaceholder')]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        validate: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaValidatePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        },
        maxLength: {
          'ui:widget': 'updown'
        }
      },
      formData: {
        name: '',
        code: '',
        placeholder: messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonInputPlaceholder')],
        value: '',
        description: '',
        dataSource: '',
        validate: '',
        server: '',
        cascade: false,
        maxLength: 0,
        require: false,
        hidden: false,
        disabled: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100
      }
    },
    textarea: {
      icon: '&#xe61e;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaTextareaLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: false,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          placeholder: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderTitle')]
          },
          value: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaValueTitle')]
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          validate: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaValidateTitle')],
            "enum": ['', 'email', 'url', 'telephone', 'id', 'digit', 'money'],
            enumNames: [messages[(0, _localeMessages.getMessageId)('configSchemaValidateOption1')], messages[(0, _localeMessages.getMessageId)('configSchemaValidateOption2')], messages[(0, _localeMessages.getMessageId)('configSchemaValidateOption3')], messages[(0, _localeMessages.getMessageId)('configSchemaValidateOption4')], messages[(0, _localeMessages.getMessageId)('configSchemaValidateOption5')], messages[(0, _localeMessages.getMessageId)('configSchemaValidateOption6')], messages[(0, _localeMessages.getMessageId)('configSchemaValidateOption7')]]
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          cascade: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCascadeTitle')]
          },
          maxLength: {
            type: 'number',
            minimum: 0,
            multipleOf: 10,
            title: messages[(0, _localeMessages.getMessageId)('configSchemaMaxLengthTitle')]
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        placeholder: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderPlaceholder')]
          }
        },
        value: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaValuePlaceholder')]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        validate: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaValidatePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        },
        maxLength: {
          'ui:widget': 'updown'
        }
      },
      formData: {
        name: '',
        code: '',
        placeholder: messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonInputPlaceholder')],
        value: '',
        description: '',
        dataSource: '',
        validate: '',
        server: '',
        cascade: false,
        maxLength: 0,
        require: false,
        hidden: false,
        disabled: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100
      }
    },
    richtext: {
      icon: '&#xe6f9;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaRichtextLabel')],
      platform: ['laptop'],
      hasItemSetting: false,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          placeholder: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderTitle')]
          },
          value: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaValueTitle')]
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        placeholder: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderPlaceholder')]
          }
        },
        value: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaValuePlaceholder')],
            height: 200
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        }
      },
      formData: {
        name: '',
        code: '',
        placeholder: '',
        value: '',
        description: '',
        require: false,
        hidden: false,
        shownodes: '',
        disnodes: ''
      }
    },
    number: {
      icon: '&#xe6f6;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaNumberLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: false,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          value: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaValueTitle')]
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          cascade: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCascadeTitle')]
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          },
          maximum: {
            type: 'number',
            multipleOf: 10,
            title: messages[(0, _localeMessages.getMessageId)('configSchemaMaximumTitle')]
          },
          minimum: {
            type: 'number',
            multipleOf: 10,
            title: messages[(0, _localeMessages.getMessageId)('configSchemaMinimumTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        value: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaValuePlaceholder')]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        },
        maximum: {
          'ui:widget': 'updown'
        },
        minimum: {
          'ui:widget': 'updown'
        }
      },
      formData: {
        name: '',
        code: '',
        value: '',
        maximum: '',
        minimum: '',
        description: '',
        dataSource: '',
        server: '',
        cascade: false,
        require: false,
        hidden: false,
        disabled: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100
      }
    },
    slider: {
      icon: '&#xe794;',
      label: messages[(0, _localeMessages.getMessageId)('fieldSchemaSliderLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: false,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          value: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaValueTitle')]
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        value: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaValuePlaceholder')]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        }
      },
      formData: {
        name: '',
        code: '',
        value: '',
        description: '',
        dataSource: '',
        server: '',
        require: false,
        hidden: false,
        disabled: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100
      }
    },
    sliderRange: {
      icon: '&#xe794;',
      label: messages[(0, _localeMessages.getMessageId)('fieldSchemaSliderRangeLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: false,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          cascade: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCascadeTitle')]
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        }
      },
      formData: {
        name: '',
        code: '',
        description: '',
        dataSource: '',
        server: '',
        cascade: false,
        require: false,
        hidden: false,
        disabled: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100
      }
    },
    radio: {
      icon: '&#xe671;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaRadioLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: true,
      hasShowConfigButton: true,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          value: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaValueTitle')],
            "enum": [],
            enumNames: []
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSourceUrl: {
            type: 'string',
            title: '数据源输入'
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        value: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaSelectValuePlaceholder')]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        dataSourceUrl: {
          'ui:options': {
            placeholder: '请输入数据源URL'
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        }
      },
      formData: {
        name: '',
        code: '',
        value: '',
        description: '',
        dataSourceUrl: '',
        dataSource: '',
        server: '',
        require: false,
        hidden: false,
        disabled: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100
      }
    },
    checkbox: {
      icon: '&#xe6ce;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaCheckboxLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: true,
      hasShowConfigButton: true,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          value: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaValueTitle')],
            "enum": [],
            enumNames: []
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSourceUrl: {
            type: 'string',
            title: '数据源输入'
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        value: {
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaSelectValuePlaceholder')]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        dataSourceUrl: {
          'ui:options': {
            placeholder: '请输入数据源URL'
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        }
      },
      formData: {
        name: '',
        code: '',
        value: [],
        description: '',
        dataSourceUrl: '',
        dataSource: '',
        server: '',
        require: false,
        disabled: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100
      }
    },
    booleanCheckbox: {
      icon: '&#xe6ce;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaBoolCheckboxLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: false,
      hasShowConfigButton: true,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          value: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaBooleanCheckboxValueTitle')]
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        }
      },
      formData: {
        name: '',
        code: '',
        value: false,
        description: '',
        dataSource: '',
        server: '',
        hidden: false,
        disabled: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100
      }
    },
    booleanSwitch: {
      icon: '&#xe685;',
      label: messages[(0, _localeMessages.getMessageId)('fieldSchemaBoolSwitchLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: false,
      hasShowConfigButton: true,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          value: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaBooleanCheckboxValueTitle')]
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        }
      },
      formData: {
        name: '',
        code: '',
        value: false,
        description: '',
        dataSource: '',
        server: '',
        hidden: false,
        disabled: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100
      }
    },
    upload: {
      icon: '&#xe616;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaUploadLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: false,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          uploadType: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaUploadTypeTitle')],
            "enum": ['picture', 'picture-inline', 'picture-card'],
            enumNames: [messages[(0, _localeMessages.getMessageId)('configSchemaUploadTypeOption1')], messages[(0, _localeMessages.getMessageId)('configSchemaUploadTypeOption2')], messages[(0, _localeMessages.getMessageId)('configSchemaUploadTypeOption3')]]
          },
          maxFileSize: {
            type: 'number',
            minimum: 0,
            multipleOf: 5,
            title: messages[(0, _localeMessages.getMessageId)('configSchemaUploadMaxSizeTitle')]
          },
          maxFileNum: {
            type: 'number',
            minimum: 0,
            multipleOf: 1,
            title: messages[(0, _localeMessages.getMessageId)('configSchemaUploadMaxNumTitle')]
          },
          exampleImageUrl: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaUploadExamplePicUrlTitle')],
            maxFileNum: 1,
            items: {
              type: 'string',
              format: 'data-url'
            }
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        },
        uploadType: {
          'ui:widget': 'select'
        },
        maxFileSize: {
          'ui:widget': 'updown'
        },
        maxFileNum: {
          'ui:widget': 'updown'
        },
        exampleImageUrl: {
          'ui:options': {
            label: '上传',
            listType: 'picture',
            vertical: true,
            accept: 'image/*'
          }
        }
      },
      formData: {
        name: '',
        code: '',
        description: '',
        dataSource: '',
        server: '',
        uploadType: 'picture',
        maxFileSize: 10,
        maxFileNum: 10,
        exampleImageUrl: [],
        require: false,
        disabled: false,
        shownodes: '',
        disnodes: ''
      }
    },
    file: {
      icon: '&#xe664;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaFileUploadLabel')],
      platform: ['laptop'],
      hasItemSetting: false,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          maxFileSize: {
            type: 'number',
            minimum: 0,
            multipleOf: 5,
            title: messages[(0, _localeMessages.getMessageId)('configSchemaUploadMaxSizeTitle')]
          },
          maxFileNum: {
            type: 'number',
            minimum: 0,
            multipleOf: 1,
            title: messages[(0, _localeMessages.getMessageId)('configSchemaUploadMaxNumTitle')]
          },
          templateFileUrl: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaUploadTemplateFileUrlTitle')],
            maxFileNum: 1,
            items: {
              type: 'string',
              format: 'data-url'
            }
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        },
        maxFileSize: {
          'ui:widget': 'updown'
        },
        maxFileNum: {
          'ui:widget': 'updown'
        },
        templateFileUrl: {
          'ui:options': {
            label: '上传',
            vertical: true
          }
        }
      },
      formData: {
        name: '',
        code: '',
        description: '',
        dataSource: '',
        server: '',
        maxFileSize: 10,
        maxFileNum: 10,
        require: false,
        templateFileUrl: [],
        disabled: false,
        shownodes: '',
        disnodes: ''
      }
    },
    select: {
      icon: '&#xe6ce;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaSelectLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: true,
      hasShowConfigButton: true,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          placeholder: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderTitle')]
          },
          value: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaValueTitle')],
            "enum": [],
            enumNames: []
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSourceUrl: {
            type: 'string',
            title: '数据源输入'
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')]
          }
        },
        placeholder: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderPlaceholder')]
          }
        },
        value: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaSelectValuePlaceholder')]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        dataSourceUrl: {
          'ui:options': {
            placeholder: '请输入数据源URL'
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        }
      },
      formData: {
        name: '',
        code: '',
        placeholder: messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonSelectPlaceholder')],
        value: '',
        description: '',
        dataSource: '',
        dataSourceUrl: 'http://rest.apizza.net/mock/ed27f575082bc8b08597a0476ea1a8f5/memberList',
        server: '',
        require: false,
        hidden: false,
        disabled: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100
      }
    },
    suggestSelect: {
      icon: '&#xe6fb;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaSuggestSelectLabel')],
      platform: ['laptop'],
      hasItemSetting: true,
      hasShowConfigButton: true,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          placeholder: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderTitle')]
          },
          value: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaValueTitle')],
            "enum": [],
            enumNames: []
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSourceUrl: {
            type: 'string',
            title: '数据源输入'
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')]
          }
        },
        placeholder: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderPlaceholder')]
          }
        },
        value: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaSelectValuePlaceholder')]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        },
        description: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')]
          }
        },
        dataSourceUrl: {
          'ui:options': {
            placeholder: '请输入数据源URL'
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        }
      },
      formData: {
        name: '',
        code: '',
        placeholder: messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonSelectPlaceholder')],
        value: '',
        description: '',
        dataSourceUrl: '',
        dataSource: '',
        server: '',
        require: false,
        hidden: false,
        disabled: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100
      }
    },
    multiSelect: {
      icon: '&#xe6fc;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaMultiSelectLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: true,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          placeholder: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderTitle')]
          },
          value: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaValueTitle')],
            "enum": [],
            enumNames: []
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSourceUrl: {
            type: 'string',
            title: '数据源输入'
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')]
          }
        },
        placeholder: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderPlaceholder')]
          }
        },
        value: {
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaSelectValuePlaceholder')]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        dataSourceUrl: {
          'ui:options': {
            placeholder: '请输入数据源URL'
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        }
      },
      formData: {
        name: '',
        code: '',
        placeholder: messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonSelectPlaceholder')],
        value: [],
        description: '',
        dataSourceUrl: '',
        dataSource: '',
        server: '',
        require: false,
        hidden: false,
        disabled: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100
      }
    },
    cascaderSelect: {
      icon: '&#xe7df;',
      label: messages[(0, _localeMessages.getMessageId)('fieldSchemaCascaderSelectLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: true,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          placeholder: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderTitle')]
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')]
          }
        },
        placeholder: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderPlaceholder')]
          }
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        }
      },
      formData: {
        name: '',
        code: '',
        placeholder: messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonSelectPlaceholder')],
        description: '',
        dataSource: '',
        server: '',
        require: false,
        hidden: false,
        disabled: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100
      }
    },
    treeSelect: {
      icon: '&#xe681;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaTreeSelectLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: false,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          placeholder: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderTitle')]
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          selectLeafOnly: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaSelectLeafOnlyTitle')]
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          },
          dataSourceUrl: {
            type: 'string',
            title: '数据源接口URL'
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')]
          }
        },
        placeholder: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderPlaceholder')]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        },
        dataSourceUrl: {
          'ui:options': {
            placeholder: '请输入数据源URL'
          }
        }
      },
      formData: {
        name: '',
        code: '',
        placeholder: messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonSelectPlaceholder')],
        description: '',
        dataSource: '',
        server: '',
        selectLeafOnly: false,
        require: false,
        hidden: false,
        disabled: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100,
        dataSourceUrl: ''
      }
    },
    multiTreeSelect: {
      icon: '&#xe6f8;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaMultiTreeSelectLabel')],
      platform: ['laptop'],
      hasItemSetting: false,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          placeholder: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderTitle')]
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          selectLeafOnly: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaSelectLeafOnlyTitle')]
          },
          treeCheckStrictly: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaTreeCheckStrictlyTitle')]
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')]
          }
        },
        placeholder: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderPlaceholder')]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        },
        description: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')]
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        }
      },
      formData: {
        name: '',
        code: '',
        placeholder: messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonSelectPlaceholder')],
        description: '',
        dataSource: '',
        server: '',
        selectLeafOnly: false,
        treeCheckStrictly: false,
        require: false,
        hidden: false,
        disabled: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100
      }
    },
    date: {
      icon: '&#xe629;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaDateLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: false,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          placeholder: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderTitle')]
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          cascade: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCascadeTitle')]
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        placeholder: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderPlaceholder')]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        }
      },
      formData: {
        name: '',
        code: '',
        placeholder: messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonSelectPlaceholder')],
        description: '',
        dataSource: '',
        server: '',
        cascade: false,
        require: false,
        hidden: false,
        disabled: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100
      }
    },
    dateRange: {
      icon: '&#xe629;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaDateRangeLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: false,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          initRange: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaInitRangeTitle')],
            "enum": ['beforeweek', 'beforemonth', 'beforeyear', 'afterweek', 'aftermonth', 'afteryear'],
            enumNames: [messages[(0, _localeMessages.getMessageId)('configSchemaInitRangeOption1')], messages[(0, _localeMessages.getMessageId)('configSchemaInitRangeOption2')], messages[(0, _localeMessages.getMessageId)('configSchemaInitRangeOption3')], messages[(0, _localeMessages.getMessageId)('configSchemaInitRangeOption4')], messages[(0, _localeMessages.getMessageId)('configSchemaInitRangeOption5')], messages[(0, _localeMessages.getMessageId)('configSchemaInitRangeOption6')]]
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          cascade: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCascadeTitle')]
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        initRange: {
          'ui:widget': 'select'
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        }
      },
      formData: {
        name: '',
        code: '',
        description: '',
        initRange: undefined,
        dataSource: '',
        server: '',
        cascade: false,
        require: false,
        hidden: false,
        disabled: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100
      }
    },
    datetime: {
      icon: '&#xe62e;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaDateTimeLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: false,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          placeholder: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderTitle')]
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          cascade: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCascadeTitle')]
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        placeholder: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderPlaceholder')]
          }
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        }
      },
      formData: {
        name: '',
        code: '',
        placeholder: messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonSelectPlaceholder')],
        description: '',
        dataSource: '',
        server: '',
        cascade: false,
        require: false,
        hidden: false,
        disabled: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100
      }
    },
    rate: {
      icon: '&#xe648;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaRateLabel')],
      platform: ['laptop'],
      hasItemSetting: true,
      hasShowConfigButton: true,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          value: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaValueTitle')],
            "enum": [],
            enumNames: []
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        value: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaSelectValuePlaceholder')]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        }
      },
      formData: {
        name: '',
        code: '',
        value: '',
        description: '',
        dataSource: '',
        server: '',
        require: false,
        hidden: false,
        disabled: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100
      }
    },
    //高德地图选择控件
    amapInput: {
      icon: '&#xe6fe;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaAmap')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: false,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          placeholder: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderTitle')]
          },
          value: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaValueTitle')]
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          cascade: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCascadeTitle')]
          },
          maxLength: {
            type: 'number',
            minimum: 0,
            multipleOf: 10,
            title: messages[(0, _localeMessages.getMessageId)('configSchemaMaxLengthTitle')]
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        placeholder: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderPlaceholder')]
          }
        },
        value: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaValuePlaceholder')]
          }
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        validate: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaValidatePlaceholder')]
          }
        }
      },
      formData: {
        name: '',
        code: '',
        placeholder: messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonInputPlaceholder')],
        value: '',
        description: '',
        dataSource: '',
        validate: '',
        server: '',
        cascade: false,
        maxLength: 0,
        require: false,
        hidden: false,
        disabled: false,
        shownodes: '',
        disnodes: ''
      }
    },
    // button: {
    //     icon: '&#xe673;',
    //     label: messages[getMessageId('configSchemaButtonLabel')],
    //     platform: ['laptop', 'mobile'],
    //     hasItemSetting: false,
    //     hasShowConfigButton: false,
    //     jsonSchema: {
    //         title: '',
    //         type: 'object',
    //         required: ['name', 'code', 'value', 'behavior'],
    //         properties: {
    //             code: {
    //                 type: 'string',
    //                 title: messages[getMessageId('configSchemaCodeTitle')],
    //             },
    //             value: {
    //                 type: 'string',
    //                 title: messages[getMessageId('configSchemaButtonValueLabel')],
    //                 maxLength: 10,
    //             },
    //             shownodes: {
    //                 type: 'array',
    //                 title: messages[getMessageId('configSchemaProcessNodesTitle')],
    //                 items: {
    //                     type: 'string',
    //                     default: '',
    //                     enum: [],
    //                     enumNames: []
    //                 },
    //                 uniqueItems: true
    //             },
    //             disnodes: {
    //                 type: 'array',
    //                 title: messages[getMessageId('configSchemaProcessDisNodesTitle')],
    //                 items: {
    //                     type: 'string',
    //                     default: '',
    //                     enum: [],
    //                     enumNames: []
    //                 },
    //                 uniqueItems: true
    //             },
    //             itemwidth: {
    //                 type: 'string',
    //                 title: messages[getMessageId('configSchemaItemWidthsTitle')]
    //             },
    //             marginLeft: {
    //                 type: 'number',
    //                 minimum: 0,
    //                 multipleOf: 5,
    //                 title: messages[getMessageId('configSchemaMarginLeftTitle')]
    //             },
    //             behavior: {
    //                 type: 'string',
    //                 title: messages[getMessageId('configSchemaButtonBehaviorLabel')],
    //                 enum: [],
    //                 enumNames: []
    //             },
    //             popCode: {
    //                 type: 'string',
    //                 title: messages[getMessageId('configSchemaPopCodeLabel')],
    //             },
    //             behaviorUrl: {
    //                 type: 'string',
    //                 title: messages[getMessageId('configSchemaBehaviorUrlLabel')],
    //                 enum: ['formSubmit', 'draft', 'aggree', 'reject', 'assignee', 'beforeAssign', 'afterAssign', 'readed'],
    //                 enumNames: ['表单提交', '保存草稿', '审核同意', '审核拒绝', '转办提交', '前加签提交', '后加签提交', '抄送已阅'],
    //             },
    //         },
    //     },
    //     uiSchema: {
    //         code: {
    //             'ui:options': {
    //                 placeholder: messages[getMessageId('configSchemaCodePlaceholder')],
    //                 validate: [{
    //                     type: 'empty',
    //                     message: messages[getMessageId('configSchemaCodeRequire')]
    //                 }]
    //             }
    //         },
    //         value: {
    //             'ui:options': {
    //                 placeholder: messages[getMessageId('configSchemaButtonValueInputLabel')],
    //                 validate: [{
    //                     type: 'empty',
    //                     message: messages[getMessageId('configSchemaButtonValueInputLabel')],
    //                 }]
    //             },
    //         },
    //         shownodes: {
    //             'ui:widget': 'multiSelect',
    //             'ui:help': messages[getMessageId('configSchemaShowNodesHelp')],
    //             'ui:options': {
    //                 placeholder: messages[getMessageId('configSchemashownodesPlaceholder')]
    //             }
    //         },
    //         disnodes: {
    //             'ui:widget': 'multiSelect',
    //             'ui:options': {
    //                 placeholder: messages[getMessageId('configSchemashownodesPlaceholder')]
    //             }
    //         },
    //         itemwidth: {
    //             'ui:widget': 'slider',
    //         },
    //         marginLeft: {
    //             'ui:widget': 'slider',
    //         },
    //         behavior: {
    //             'ui:widget': 'select',
    //             'ui:options': {
    //                 placeholder: messages[getMessageId('configSchemaButtonBehaviorSelectLabel')],
    //                 validate: [{
    //                     type: 'empty',
    //                     message: messages[getMessageId('configSchemaButtonBehaviorSelectLabel')],
    //                 }]
    //             }
    //         },
    //         popCode: {
    //             'ui:disabled': true,
    //             'ui:options': {
    //                 placeholder: messages[getMessageId('configSchemaPopCodeInputLabel')],
    //                 validate: [{
    //                     type: 'empty',
    //                     message: messages[getMessageId('configSchemaPopCodeInputLabel')],
    //                 }]
    //             },
    //         },
    //         behaviorUrl: {
    //             'ui:disabled': true,
    //             'ui:widget': 'select',
    //             'ui:options': {
    //                 placeholder: messages[getMessageId('configSchemaBehaviorUrlLabel')],
    //                 validate: [{
    //                     type: 'empty',
    //                     message: messages[getMessageId('configSchemaBehaviorUrlLabel')],
    //                 }]
    //             },
    //         },
    //     },
    //     formData: {
    //         name: '',
    //         code: '',
    //         value: '',
    //         behavior: '',
    //         marginLeft: '',
    //         popCode: '',
    //         shownodes: '',
    //         disnodes: '',
    //         itemwidth: 100,
    //         behaviorUrl: '',
    //     }
    // },
    Transfer: {
      icon: '&#xe8b6;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaTransfer')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: false,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code', 'leftTitle', 'rightTitle'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          //扩展用
          // transferType: {
          //     type: 'string',
          //     title: messages[getMessageId('configSchemaTransferTypeTitle')],
          //     enum: [],
          //     enumNames: []
          // },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          leftTitle: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaTransferLeftTitle')],
            maxLength: 1000
          },
          rightTitle: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaTransferRightTitle')],
            maxLength: 1000
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          dataSourceUrl: {
            type: 'string',
            title: '数据源接口URL'
          },
          checkType: {
            //是否单选
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCheckType')]
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        // transferType: {
        //     'ui:widget': 'select',
        //     'ui:options': {
        //         placeholder: messages[getMessageId('configSchemaSelectValuePlaceholder')],
        //         validate: [{
        //             type: 'empty',
        //             message: messages[getMessageId('configSchemaValuePlaceholder')]
        //         }]
        //     }
        // },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        // transferData: {
        //     'ui:widget': 'textarea',
        //     'ui:options': {
        //         placeholder: messages[getMessageId('configSchemaTransferDataPlaceholder')],
        //         validate: [{
        //             type: 'empty',
        //             message: messages[getMessageId('configSchemaNameRequire')]
        //         }]
        //     }
        // },
        // transferSelectedData: {
        //     'ui:widget': 'textarea',
        //     'ui:options': {
        //         placeholder: messages[getMessageId('configSchemaTransferSelectedDataPlaceholder')],
        //         validate: [{
        //             type: 'empty',
        //             message: messages[getMessageId('configSchemaNameRequire')]
        //         }]
        //     }
        // },
        // leftColumns: {
        //     'ui:widget': 'textarea',
        //     'ui:options': {
        //         placeholder: messages[getMessageId('configSchemaTransferLeftColumns')],
        //         validate: [{
        //             type: 'empty',
        //             message: messages[getMessageId('configSchemaNameRequire')]
        //         }]
        //     }
        // },
        // rightColumns: {
        //     'ui:widget': 'textarea',
        //     'ui:options': {
        //         placeholder: messages[getMessageId('configSchemaTransferRightColumns')],
        //         validate: [{
        //             type: 'empty',
        //             message: messages[getMessageId('configSchemaNameRequire')]
        //         }]
        //     }
        // },
        leftTitle: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaTransferLeftTitle')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaLeftTitleRequire')]
            }]
          }
        },
        rightTitle: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaTransferRightTitle')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaRightTitleRequire')]
            }]
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        dataSourceUrl: {
          'ui:options': {
            placeholder: '请输入数据源URL'
          }
        }
      },
      formData: {
        name: '',
        code: '',
        transferType: '',
        transferData: '',
        transferSelectedData: '',
        leftColumns: '',
        rightColumns: '',
        leftTitle: '',
        rightTitle: '',
        dataSourceUrl: '',
        shownodes: '',
        disnodes: '',
        require: false,
        hidden: false,
        disabled: false,
        checkType: false
      }
    },
    //印章选择控件
    // Stamp: {
    //     icon: '&#xe6fe;',
    //     label: messages[getMessageId('configSchemaStamp')],
    //     platform: ['laptop', 'mobile'],
    //     hasItemSetting: false,
    //     hasShowConfigButton: false,
    //     jsonSchema: {
    //         title: '',
    //         type: 'object',
    //         required: ['name', 'code'],
    //         properties: {
    //             name: {
    //                 type: 'string',
    //                 title: messages[getMessageId('configSchemaNameTitle')],
    //                 maxLength: 200
    //             },
    //             placeholder: {
    //                 type: 'string',
    //                 title: messages[getMessageId('configSchemaPlaceholderTitle')]
    //             },
    //             shownodes: {
    //                 type: 'array',
    //                 title: messages[getMessageId('configSchemaProcessNodesTitle')],
    //                 items: {
    //                     type: 'string',
    //                     default: '',
    //                     enum: [],
    //                     enumNames: []
    //                 },
    //                 uniqueItems: true
    //             },
    //             disnodes: {
    //                 type: 'array',
    //                 title: messages[getMessageId('configSchemaProcessDisNodesTitle')],
    //                 items: {
    //                     type: 'string',
    //                     default: '',
    //                     enum: [],
    //                     enumNames: []
    //                 },
    //                 uniqueItems: true
    //             },
    //             dataSource: {
    //                 type: 'string',
    //                 title: messages[getMessageId('configSchemaDataSourceTitle')],
    //                 stampData: []
    //             },
    //             description: {
    //                 type: 'string',
    //                 title: messages[getMessageId('configSchemaDescTitle')]
    //             },
    //             dataSourceUrl: {
    //                 type: 'string',
    //                 title: '数据源接口URL',
    //             },
    //             require: {
    //                 type: 'boolean',
    //                 title: messages[getMessageId('configSchemaRequiredTitle')]
    //             },
    //             hidden: {
    //                 type: 'boolean',
    //                 title: messages[getMessageId('configSchemaHiddenTitle')]
    //             },
    //             disabled: {
    //                 type: 'boolean',
    //                 title: messages[getMessageId('configSchemaDisabledTitle')]
    //             }
    //         }
    //     },
    //     uiSchema: {
    //         name: {
    //             'ui:options': {
    //                 placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
    //                 validate: [{
    //                     type: 'empty',
    //                     message: messages[getMessageId('configSchemaNameRequire')]
    //                 }]
    //             }
    //         },
    //         code: {
    //             'ui:options': {
    //                 placeholder: messages[getMessageId('configSchemaCodePlaceholder')],
    //                 validate: [{
    //                     type: 'empty',
    //                     message: messages[getMessageId('configSchemaCodeRequire')]
    //                 }]
    //             }
    //         },
    //         placeholder: {
    //             'ui:options': {
    //                 placeholder: messages[getMessageId('configSchemaPlaceholderPlaceholder')]
    //             }
    //         },
    //         shownodes: {
    //             'ui:widget': 'multiSelect',
    //             'ui:help': messages[getMessageId('configSchemaShowNodesHelp')],
    //             'ui:options': {
    //                 placeholder: messages[getMessageId('configSchemashownodesPlaceholder')]
    //             }
    //         },
    //         disnodes: {
    //             'ui:widget': 'multiSelect',
    //             'ui:options': {
    //                 placeholder: messages[getMessageId('configSchemashownodesPlaceholder')]
    //             }
    //         },
    //         description: {
    //             'ui:widget': 'richtext',
    //             'ui:options': {
    //                 placeholder: messages[getMessageId('configSchemaDescPlaceholder')],
    //                 height: 200,
    //                 toolbars: [
    //                     ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
    //                 ]
    //             }
    //         },
    //         dataSource: {
    //             'ui:widget': 'select',
    //             'ui:options': {
    //                 placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
    //             }
    //         },
    //         dataSourceUrl: {
    //             'ui:options': {
    //                 placeholder: '请输入数据源URL',
    //             }
    //         },
    //     },
    //     formData: {
    //         name: '',
    //         code: '',
    //         placeholder: messages[getMessageId('fieldSchemaCommonSelectPlaceholder')],
    //         value: '',
    //         description: '',
    //         dataSourceUrl: '',
    //         dataSource: '',
    //         validate: '',
    //         server: '',
    //         shownodes: '',
    //         disnodes: '',
    //         require: false,
    //         hidden: false,
    //         disabled: false,
    //     }
    // },
    TableSelect: {
      icon: '&#xe6fe;',
      label: messages[(0, _localeMessages.getMessageId)('fieldSchemaTableSelectLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: false,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          placeholder: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderTitle')]
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            tableData: []
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSourceUrl: {
            type: 'string',
            title: '数据源接口URL'
          },
          require: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
          },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        placeholder: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderPlaceholder')]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        dataSourceUrl: {
          'ui:options': {
            placeholder: '请输入数据源URL'
          }
        }
      },
      formData: {
        name: '',
        code: '',
        placeholder: messages[(0, _localeMessages.getMessageId)('fieldSchemaCommonSelectPlaceholder')],
        value: '',
        description: '',
        dataSourceUrl: '',
        dataSource: '',
        validate: '',
        server: '',
        shownodes: '',
        disnodes: '',
        require: false,
        hidden: false,
        disabled: false
      }
    },
    Table: {
      icon: '&#xe8b6;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaTableLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: false,
      hasShowConfigButton: false,
      hasDBOperateButton: true,
      jsonSchema: {
        title: '',
        type: 'object',
        // type:'array',
        required: ['code', 'groupName'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 10
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          groupName: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaTableNameTitle')],
            maxLength: 10
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          cascade: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCascadeTitle')]
          },
          showGroupTitle: {
            type: 'boolean',
            title: '显示分组标题'
          }
        }
      },
      uiSchema: {
        name: {
          'ui:widget': 'hidden',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaLabelHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')]
          }
        },
        code: {
          'ui:disabled': true,
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        groupName: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaGroupNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaGroupNamePlaceholder')]
            }]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        cascade: {}
      },
      formData: {
        name: '',
        code: '',
        groupName: '',
        cascade: false,
        shownodes: '',
        disnodes: '',
        childrens: [],
        showGroupTitle: false
      }
    },
    Calculate: {
      icon: '&#xe6f6;',
      label: messages[(0, _localeMessages.getMessageId)('configSchemaCalculateLabel')],
      platform: ['laptop', 'mobile'],
      hasItemSetting: false,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          },
          value: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaValueTitle')]
          },
          shownodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          disnodes: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaProcessDisNodesTitle')],
            items: {
              type: 'string',
              "default": '',
              "enum": [],
              enumNames: []
            },
            uniqueItems: true
          },
          itemwidth: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaItemWidthsTitle')]
          },
          description: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
          },
          dataSource: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
            "enum": [],
            enumNames: []
          },
          server: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
            "enum": [],
            enumNames: []
          },
          cascade: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCascadeTitle')]
          },
          // require: {
          //     type: 'boolean',
          //     title: messages[getMessageId('configSchemaRequiredTitle')]
          // },
          hidden: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
          },
          disabled: {
            type: 'boolean',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaDisabledTitle')]
          },
          // maximum: {
          //     type: 'number',
          //     multipleOf: 10,
          //     title: messages[getMessageId('configSchemaMaximumTitle')]
          // },
          // minimum: {
          //     type: 'number',
          //     multipleOf: 10,
          //     title: messages[getMessageId('configSchemaMinimumTitle')]
          // },
          algorithm: {
            type: 'array',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaAlgorithmTitle')],
            items: {
              type: 'string',
              "default": 'sum',
              // enum: [],
              // enumNames: [],
              "enum": ['sum', 'average'],
              enumNames: ['求和', '平均']
            },
            uniqueItems: true
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        },
        value: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaValuePlaceholder')]
          }
        },
        shownodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:help': messages[(0, _localeMessages.getMessageId)('configSchemaShowNodesHelp')],
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        disnodes: {
          'ui:disabled': true,
          'ui:widget': 'multiSelect',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemashownodesPlaceholder')]
          }
        },
        itemwidth: {
          'ui:widget': 'slider'
        },
        description: {
          'ui:widget': 'richtext',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')],
            height: 200,
            toolbars: [['bold', 'italic', 'underline', 'strike', {
              color: []
            }, 'link', 'image', 'clean']]
          }
        },
        dataSource: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
          }
        },
        server: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
          }
        },
        maximum: {
          'ui:widget': 'updown'
        },
        minimum: {
          'ui:widget': 'updown'
        },
        algorithm: {
          'ui:widget': 'select'
        }
      },
      formData: {
        name: '',
        code: '',
        value: '',
        maximum: '',
        minimum: '',
        description: '',
        dataSource: '',
        server: '',
        cascade: false,
        require: false,
        hidden: false,
        disabled: false,
        shownodes: '',
        disnodes: '',
        itemwidth: 100,
        algorithm: 'sum'
      }
    }
  };

  if (supportList && supportList.length > 0) {
    var filterSchema = {};
    supportList.map(function (support) {
      filterSchema[support] = configSchema[support];
    });
    return addCustomRegisterFields(filterSchema, registerWidgets, messages);
  } else {
    return addCustomRegisterFields(configSchema, registerWidgets, messages);
  }
};

var addCustomRegisterFields = function addCustomRegisterFields(configSchema, registerWidgets, messages) {
  var configFieldsDetail = {
    placeholder: {
      jsonSchema: {
        type: 'string',
        title: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderTitle')]
      },
      uiSchema: {
        'ui:options': {
          placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaPlaceholderPlaceholder')]
        }
      },
      formData: ''
    },
    value: {
      jsonSchema: {
        type: 'string',
        title: messages[(0, _localeMessages.getMessageId)('configSchemaValueTitle')]
      },
      uiSchema: {
        'ui:options': {
          placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaValuePlaceholder')]
        }
      },
      formData: ''
    },
    description: {
      jsonSchema: {
        type: 'string',
        title: messages[(0, _localeMessages.getMessageId)('configSchemaDescTitle')]
      },
      uiSchema: {
        'ui:options': {
          placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDescPlaceholder')]
        }
      },
      formData: ''
    },
    validate: {
      jsonSchema: {
        type: 'string',
        title: messages[(0, _localeMessages.getMessageId)('configSchemaValidateTitle')],
        "enum": ['', 'email', 'url', 'telephone', 'id', 'digit', 'money'],
        enumNames: [messages[(0, _localeMessages.getMessageId)('configSchemaValidateOption1')], messages[(0, _localeMessages.getMessageId)('configSchemaValidateOption2')], messages[(0, _localeMessages.getMessageId)('configSchemaValidateOption3')], messages[(0, _localeMessages.getMessageId)('configSchemaValidateOption4')], messages[(0, _localeMessages.getMessageId)('configSchemaValidateOption5')], messages[(0, _localeMessages.getMessageId)('configSchemaValidateOption6')], messages[(0, _localeMessages.getMessageId)('configSchemaValidateOption7')]]
      },
      uiSchema: {
        'ui:widget': 'select',
        'ui:options': {
          placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaValidatePlaceholder')]
        }
      },
      formData: ''
    },
    server: {
      jsonSchema: {
        type: 'string',
        title: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodeTitle')],
        "enum": [],
        enumNames: []
      },
      uiSchema: {
        'ui:widget': 'select',
        'ui:options': {
          placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaServerCodePlaceholder')]
        }
      },
      formData: ''
    },
    require: {
      jsonSchema: {
        type: 'boolean',
        title: messages[(0, _localeMessages.getMessageId)('configSchemaRequiredTitle')]
      },
      formData: false
    },
    hidden: {
      jsonSchema: {
        type: 'boolean',
        title: messages[(0, _localeMessages.getMessageId)('configSchemaHiddenTitle')]
      },
      formData: false
    },
    cascade: {
      jsonSchema: {
        type: 'boolean',
        title: messages[(0, _localeMessages.getMessageId)('configSchemaCascadeTitle')]
      },
      formData: false
    },
    dataSource: {
      jsonSchema: {
        type: 'string',
        title: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourceTitle')],
        "enum": [],
        enumNames: []
      },
      uiSchema: {
        'ui:widget': 'select',
        'ui:options': {
          placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
        }
      },
      formData: ''
    },
    dataSourceUrl: {
      jsonSchema: {
        type: 'string',
        title: '数据源地址'
      },
      uiSchema: {
        'ui:options': {
          placeholder: '请填写数据源url地址'
        }
      },
      formData: 'http://rest.apizza.net/mock/ed27f575082bc8b08597a0476ea1a8f5/memberList'
    },
    algorithm: {
      jsonSchema: {
        type: 'string',
        title: messages[(0, _localeMessages.getMessageId)('configSchemaAlgorithmTitle')],
        "enum": ['sum', 'average'],
        enumNames: ['求和', '平均']
      },
      uiSchema: {
        'ui:widget': 'select',
        'ui:options': {
          placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaAlgorithmTitle')]
        }
      },
      formData: 'sum'
    }
  };
  registerWidgets.map(function (widget) {
    var widgetConfigSchema = {
      icon: widget.icon,
      label: widget.label,
      platform: widget.platform || ['laptop'],
      // 自定义字段默认只支持PC，可以在registerWidget里面指定
      hasItemSetting: false,
      hasShowConfigButton: false,
      jsonSchema: {
        title: '',
        type: 'object',
        required: ['name', 'code'],
        properties: {
          name: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaNameTitle')],
            maxLength: 200
          },
          code: {
            type: 'string',
            title: messages[(0, _localeMessages.getMessageId)('configSchemaCodeTitle')]
          }
        }
      },
      uiSchema: {
        name: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaNamePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaNameRequire')]
            }]
          }
        },
        code: {
          'ui:options': {
            placeholder: messages[(0, _localeMessages.getMessageId)('configSchemaCodePlaceholder')],
            validate: [{
              type: 'empty',
              message: messages[(0, _localeMessages.getMessageId)('configSchemaCodeRequire')]
            }]
          }
        }
      },
      formData: {
        name: '',
        code: ''
      }
    };
    var configFields = widget.configFields || [];
    var customConfigFields = widget.customConfigFields || [];
    configFields.map(function (field) {
      widgetConfigSchema.jsonSchema.properties[field] = configFieldsDetail[field].jsonSchema;

      if (typeof configFieldsDetail[field].uiSchema !== 'undefined') {
        widgetConfigSchema.uiSchema[field] = configFieldsDetail[field].uiSchema;
      }

      widgetConfigSchema.formData[field] = configFieldsDetail[field].formData;
    });
    customConfigFields.map(function (fieldObject) {
      widgetConfigSchema.jsonSchema.properties[fieldObject.code] = fieldObject.schema.jsonSchema;

      if (typeof fieldObject.schema.uiSchema !== 'undefined') {
        widgetConfigSchema.uiSchema[fieldObject.code] = fieldObject.schema.uiSchema;
      }

      widgetConfigSchema.formData[fieldObject.code] = fieldObject.schema.formData;
    });
    configSchema[widget.type] = widgetConfigSchema;
  });
  return configSchema;
};

var _default = {
  getDefaultConfig: function getDefaultConfig(messages, registerWidgets, supportList) {
    return getIntlConfigSchema(messages, registerWidgets, supportList);
  },
  getConfig: function getConfig(dataSourceList, serverCodeList, messages, registerWidgets, supportList) {
    var configSchema = getIntlConfigSchema(messages, registerWidgets, supportList);
    Object.keys(configSchema).map(function (type) {
      if (typeof configSchema[type].jsonSchema.properties.dataSource !== 'undefined') {
        configSchema[type].jsonSchema.properties.dataSource.data = dataSourceList;
      }

      if (typeof configSchema[type].jsonSchema.properties.server !== 'undefined') {
        configSchema[type].jsonSchema.properties.server.data = serverCodeList;
      }
    });
    return configSchema;
  }
};
exports["default"] = _default;