"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.localMessagesArray = exports.getMessageId = void 0;

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var localMessages = {
  //app.js
  xformChangePlatformOptName: {
    id: 'xform-builder.app.xformChangePlatformOptName',
    defaultMessage: '适用端'
  },
  xformChangePlatformPCName: {
    id: 'xform-builder.app.xformChangePlatformPCName',
    defaultMessage: '电脑'
  },
  xformChangePlatformMobileName: {
    id: 'xform-builder.app.xformChangePlatformMobileName',
    defaultMessage: '手机'
  },
  xformChangePlatformBothName: {
    id: 'xform-builder.app.xformChangePlatformBothName',
    defaultMessage: '两者'
  },
  xformChangeLangOptName: {
    id: 'xform-builder.app.xformChangeLangOptName',
    defaultMessage: '语言设置'
  },
  xformSaveFormTitleOptName: {
    id: 'xform-builder.app.xformSaveFormTitleOptName',
    defaultMessage: '标题设置'
  },
  xformMoreOptName: {
    id: 'xform-builder.app.xformMoreOptName',
    defaultMessage: '更多功能'
  },
  xformSaveOptName: {
    id: 'xform-builder.app.xformSaveOptName',
    defaultMessage: '保存表单'
  },
  xformPreviewOptName: {
    id: 'xform-builder.app.xformPreviewOptName',
    defaultMessage: '预览表单'
  },
  xformFullScreenOptName: {
    id: 'xform-builder.app.xformFullScreenOptName',
    defaultMessage: '全屏编辑'
  },
  xformNoFullScreenOptName: {
    id: 'xform-builder.app.xformNoFullScreenOptName',
    defaultMessage: '退出全屏'
  },
  xformBaseConfigPopoverTitle: {
    id: 'xform-builder.app.xformBaseConfigPopoverTitle',
    defaultMessage: '为您的表单添加标题和描述'
  },
  xformBaseConfigFormTitleLabel: {
    id: 'xform-builder.app.xformBaseConfigFormTitleLabel',
    defaultMessage: '标题'
  },
  xformBaseConfigFormTitlePlaceholder: {
    id: 'xform-builder.app.xformBaseConfigFormTitlePlaceholder',
    defaultMessage: '请输入不超过20个字的标题'
  },
  xformBaseConfigFormDescLabel: {
    id: 'xform-builder.app.xformBaseConfigFormDescLabel',
    defaultMessage: '描述'
  },
  xformBaseConfigFormDescPlaceholder: {
    id: 'xform-builder.app.xformBaseConfigFormDescPlaceholder',
    defaultMessage: '请输入'
  },
  xformLangConfigEnableLabel: {
    id: 'xform-builder.app.xformLangConfigEnableLabel',
    defaultMessage: '启用'
  },
  xformLangConfigLangNameLabel: {
    id: 'xform-builder.app.xformLangConfigLangNameLabel',
    defaultMessage: '语言'
  },
  xformLangConfigDefaultLangTip: {
    id: 'xform-builder.app.xformLangConfigDefaultLangTip',
    defaultMessage: '默认语言'
  },
  xformLangConfigCurrentLangTip: {
    id: 'xform-builder.app.xformLangConfigCurrentLangTip',
    defaultMessage: '当前语言'
  },
  xformLangConfigOperationLabel: {
    id: 'xform-builder.app.xformLangConfigOperationLabel',
    defaultMessage: '操作'
  },
  xformLangConfigSwitchLangOperation: {
    id: 'xform-builder.app.xformLangConfigSwitchLangOperation',
    defaultMessage: '切换'
  },
  xformLangConfigSwitchDefaultOperation: {
    id: 'xform-builder.app.xformLangConfigSwitchDefaultOperation',
    defaultMessage: '设为默认'
  },
  xformChangeLangConfirmTitle: {
    id: 'xform-builder.app.xformChangeLangConfirmTitle',
    defaultMessage: '确认切换语言？'
  },
  xformChangeLangConfirmContent: {
    id: 'xform-builder.app.xformChangeLangConfirmContent',
    defaultMessage: '切换语言操作在当前语言下编辑的表单不会被自动保存'
  },
  xformMoreFunctionCodeView: {
    id: 'xform-builder.app.xformMoreFunctionCodeView',
    defaultMessage: 'Code模式'
  },
  xformMoreFunctionFieldPreview: {
    id: 'xform-builder.app.xformMoreFunctionFieldPreview',
    defaultMessage: '控件内容预览'
  },
  xformMoreFunctionFormDataSource: {
    id: 'xform-builder.app.xformMoreFunctionFormDataSource',
    defaultMessage: '数据源'
  },
  xformMoreFunctionFormDataSourceHelp: {
    id: 'xform-builder.app.xformMoreFunctionFormDataSourceHelp',
    defaultMessage: '设置整个表单级别的数据源'
  },
  xformSchemaViewButton: {
    id: 'xform-builder.app.xformSchemaViewButton',
    defaultMessage: '查看Schema'
  },
  xformSchemaModalTitle: {
    id: 'xform-builder.app.xformSchemaModalTitle',
    defaultMessage: '查看表单Schema'
  },
  xformSchemaModalCancel: {
    id: 'xform-builder.app.xformSchemaModalCancel',
    defaultMessage: '关闭'
  },
  xformSchemaModalCopy: {
    id: 'xform-builder.app.xformSchemaModalConfirm',
    defaultMessage: '复制Schema'
  },
  xformSchemaModalCopySuccessTip: {
    id: 'xform-builder.app.xformSchemaModalCopySuccessTip',
    defaultMessage: '复制Schema成功'
  },
  xformHasLaptopNotSupportFieldTip: {
    id: 'xform-builder.app.xformHasLaptopNotSupportFieldTip',
    defaultMessage: '存在PC端不支持的控件'
  },
  xformHasMobileNotSupportFieldTip: {
    id: 'xform-builder.app.xformHasMobileNotSupportFieldTip',
    defaultMessage: '存在移动端不支持的控件'
  },
  xformHasBothNotSupportFieldTip: {
    id: 'xform-builder.app.xformHasBothNotSupportFieldTip',
    defaultMessage: '存在不支持的控件'
  },
  xformPreviewSubmitButton: {
    id: 'xform-builder.app.xformPreviewSubmitButton',
    defaultMessage: '提交'
  },
  xformSaveButton: {
    id: 'xform-builder.app.xformSaveButton',
    defaultMessage: '保存'
  },
  xformSaveSchemaErrorTip: {
    id: 'xform-builder.app.xformSaveSchemaErrorTip',
    defaultMessage: '表单配置数据保存失败：'
  },
  xformUpdateSchemaErrorTip: {
    id: 'xform-builder.app.xformUpdateSchemaErrorTip',
    defaultMessage: '表单配置数据更新失败：'
  },
  xformGetFormDataSourceErrorTip: {
    id: 'xform-builder.app.xformGetFormDataSourceErrorTip',
    defaultMessage: '预览获取表单数据源失败：'
  },
  // actionCreators（这里面的内容国际化必须要依赖将intl作为payload传入的方式来实现）
  actionCreatorsGetInitConfigErrorTip: {
    id: 'xform-builder.actionCreators.actionCreatorsGetInitConfigErrorTip',
    defaultMessage: 'xform builder:获取基础配置接口失败：'
  },
  actionCreatorsGetSelectFieldErrorTip: {
    id: 'xform-builder.actionCreators.actionCreatorsGetSelectFieldErrorTip',
    defaultMessage: 'xform builder:获取初始生效控件配置接口失败：'
  },
  actionCreatorsDefaultDataSource: {
    id: 'xform-builder.actionCreators.actionCreatorsDefaultDataSource',
    defaultMessage: '不使用数据源'
  },
  actionCreatorsGetDataSourceErrorTip: {
    id: 'xform-builder.actionCreators.actionCreatorsGetDataSourceErrorTip',
    defaultMessage: 'xform builder:获取数据源配置接口失败：'
  },
  actionCreatorsGetServerCodeErrorTip: {
    id: 'xform-builder.actionCreators.actionCreatorsGetServerCodeErrorTip',
    defaultMessage: 'xform builder:获取动态校验器列表接口失败：'
  },
  // configSchema.js
  // customFieldSchema.js
  // fieldPicker.js
  fieldPickerKeywordSearchPlaceholder: {
    id: 'xform-builder.fieldPicker.fieldPickerKeywordSearchPlaceholder',
    defaultMessage: '搜索可用控件'
  },
  fieldPickerDeplicateCodeErrorTip: {
    id: 'xform-builder.fieldPicker.fieldPickerDeplicateCodeErrorTip',
    defaultMessage: '生效控件中存在重复编码的控件，重复的编码为'
  },
  fieldPickerSystemTitle: {
    id: 'xform-builder.fieldPicker.fieldPickerSystemTitle',
    defaultMessage: '系统控件'
  },
  fieldPickerCommonTitle: {
    id: 'xform-builder.fieldPicker.fieldPickerCommonTitle',
    defaultMessage: '业务控件组'
  },
  fieldPickerCustomTitle: {
    id: 'xform-builder.fieldPicker.fieldPickerCustomTitle',
    defaultMessage: '自定义控件'
  },
  fieldPickerEmptyTip: {
    id: 'xform-builder.fieldPicker.fieldPickerEmptyTip',
    defaultMessage: '可选的控件为空，请重新输入筛选的关键字'
  },
  // fieldList/option.js
  systemFieldFoldTitle: {
    id: 'xform-builder.fieldList.systemFieldFoldTitle',
    defaultMessage: '已有系统控件'
  },
  fieldNotSupportTip: {
    id: 'xform-builder.fieldList.fieldNotSupportTip',
    defaultMessage: '该控件不支持当前选择的端'
  },
  // fieldConfig/index.js
  fieldConfigBoxBasicTitle: {
    id: 'xform-builder.fieldConfig.fieldConfigBoxBasicTitle',
    defaultMessage: '基础属性'
  },
  fieldConfigBoxOptionTitle: {
    id: 'xform-builder.fieldConfig.fieldConfigBoxOptionTitle',
    defaultMessage: '选项'
  },
  fieldConfigBoxAdvanceTitle: {
    id: 'xform-builder.fieldConfig.fieldConfigBoxAdvanceTitle',
    defaultMessage: '高级属性'
  },
  fieldConfigBoxCascadeTitle: {
    id: 'xform-builder.fieldConfig.fieldConfigBoxCascadeTitle',
    defaultMessage: '级联'
  },
  fieldConfigBoxRelevanceTitle: {
    id: 'xform-builder.fieldConfig.fieldConfigBoxRelevanceTitle',
    defaultMessage: '关联'
  },
  fieldConfigDuplicateCodeErrorTip: {
    id: 'xform-builder.fieldConfig.fieldConfigDuplicateCodeErrorTip',
    defaultMessage: '输入的控件编码重复，请更改您输入的控件编码'
  },
  fieldConfigClearConfigSuccessTip: {
    id: 'xform-builder.fieldConfig.fieldConfigClearConfigSuccessTip',
    defaultMessage: '清除成功'
  },
  fieldConfigShowConfigTitle: {
    id: 'xform-builder.fieldConfig.fieldConfigShowConfigTitle',
    defaultMessage: '控件级联'
  },
  fieldConfigUpdateFieldConfigTitle: {
    id: 'xform-builder.fieldConfig.fieldConfigUpdateFieldConfigTitle',
    defaultMessage: '数据级联'
  },
  fieldConfigControlRelatedTitle: {
    id: 'xform-builder.fieldConfig.fieldConfigControlRelatedTitle',
    defaultMessage: '控件关联'
  },
  fieldConfigClearPopconfirmTitle: {
    id: 'xform-builder.fieldConfig.fieldConfigClearPopconfirmTitle',
    defaultMessage: '该操作将会清除全部的级联配置，请谨慎操作。确定要删除表单的全部级联配置吗？'
  },
  fieldConfigClearRelatedPopconfirmTitle: {
    id: 'xform-builder.fieldConfig.fieldConfigClearRelatedPopconfirmTitle',
    defaultMessage: '该操作将会清除全部的关联联配置，请谨慎操作。确定要删除表单的全部级联配置吗？'
  },
  fieldConfigClearConfigTitle: {
    id: 'xform-builder.fieldConfig.fieldConfigClearConfigTitle',
    defaultMessage: '清除级联'
  },
  fieldConfigClearRelatedConfigTitle: {
    id: 'xform-builder.fieldConfig.fieldConfigClearRelatedConfigTitle',
    defaultMessage: '清除关联'
  },
  fieldConfigListEmptyTip: {
    id: 'xform-builder.fieldConfig.fieldConfigListEmptyTip',
    defaultMessage: '选择左侧的表单控件'
  },
  fieldConfigEmptyTip: {
    id: 'xform-builder.fieldConfig.fieldConfigEmptyTip',
    defaultMessage: '选择待编辑的表单控件'
  },
  fieldConfigEmptyValidateTip: {
    id: 'xform-builder.fieldConfig.fieldConfigEmptyValidateTip',
    defaultMessage: '该字段为必填项'
  },
  fieldConfigEmailValidateTip: {
    id: 'xform-builder.fieldConfig.fieldConfigEmailValidateTip',
    defaultMessage: '必须符合邮箱格式'
  },
  fieldConfigUrlValidateTip: {
    id: 'xform-builder.fieldConfig.fieldConfigUrlValidateTip',
    defaultMessage: '必须符合URL格式'
  },
  fieldConfigTelValidateTip: {
    id: 'xform-builder.fieldConfig.fieldConfigTelValidateTip',
    defaultMessage: '必须符合电话格式'
  },
  fieldConfigIdValidateTip: {
    id: 'xform-builder.fieldConfig.fieldConfigIdValidateTip',
    defaultMessage: '必须符合身份证格式'
  },
  fieldConfigDigitValidateTip: {
    id: 'xform-builder.fieldConfig.fieldConfigDigitValidateTip',
    defaultMessage: '必须符合纯数字格式'
  },
  fieldConfigMoneyValidateTip: {
    id: 'xform-builder.fieldConfig.fieldConfigMoneyValidateTip',
    defaultMessage: '必须符合货币格式'
  },
  fieldConfigServerValidateTip: {
    id: 'xform-builder.fieldConfig.fieldConfigServerValidateTip',
    defaultMessage: '必须符合动态校验器规则'
  },
  showConfigModalTitle: {
    id: 'xform-builder.fieldConfig.showConfigModalTitle',
    defaultMessage: '控件级联配置'
  },
  showConfigModalConfirm: {
    id: 'xform-builder.fieldConfig.showConfigModalConfirm',
    defaultMessage: '确定'
  },
  showConfigModalCancel: {
    id: 'xform-builder.fieldConfig.showConfigModalCancel',
    defaultMessage: '取消'
  },
  showConfigModalClear: {
    id: 'xform-builder.fieldConfig.showConfigModalClear',
    defaultMessage: '清除级联配置'
  },
  showConfigModalClearConfirmTitle: {
    id: 'xform-builder.fieldConfig.showConfigModalClearConfirmTitle',
    defaultMessage: '您确认要清除当前控件的所有控件级联关系吗？'
  },
  showConfigModalClearSuccessTip: {
    id: 'xform-builder.fieldConfig.showConfigModalClearSuccessTip',
    defaultMessage: '清除成功'
  },
  showConfigModalOptionTitle: {
    id: 'xform-builder.fieldConfig.showConfigModalOptionTitle',
    defaultMessage: '选项'
  },
  showConfigModalShowOptionTitle: {
    id: 'xform-builder.fieldConfig.showConfigModalShowOptionTitle',
    defaultMessage: '关联控件'
  },
  showConfigModalEmptyShowOption: {
    id: 'xform-builder.fieldConfig.showConfigModalEmptyShowOption',
    defaultMessage: '没有可选的配置控件'
  },
  updateFieldConfigModalTitle: {
    id: 'xform-builder.fieldConfig.updateFieldConfigModalTitle',
    defaultMessage: '数据源级联配置'
  },
  updateFieldConfigRelevanceModalTitle: {
    id: 'xform-builder.fieldConfig.updateFieldConfigRelevanceModalTitle',
    defaultMessage: '数据计算关联配置'
  },
  updateFieldConfigModalConfirm: {
    id: 'xform-builder.fieldConfig.updateFieldConfigModalConfirm',
    defaultMessage: '确定'
  },
  updateFieldConfigModalCancel: {
    id: 'xform-builder.fieldConfig.updateFieldConfigModalCancel',
    defaultMessage: '取消'
  },
  updateFieldConfigModalClear: {
    id: 'xform-builder.fieldConfig.updateFieldConfigModalClear',
    defaultMessage: '清除级联配置'
  },
  updateFieldConfigRelevanceModalClear: {
    id: 'xform-builder.fieldConfig.updateFieldConfigRelevanceModalClear',
    defaultMessage: '清除关联配置'
  },
  updateFieldConfigModalClearConfirmTitle: {
    id: 'xform-builder.fieldConfig.updateFieldConfigModalClearConfirmTitle',
    defaultMessage: '您确认要清除当前控件的所有数据级联配置吗？'
  },
  updateFieldConfigRelevanceModalClearConfirmTitle: {
    id: 'xform-builder.fieldConfig.updateFieldConfigRelevanceModalClearConfirmTitle',
    defaultMessage: '您确认要清除当前控件的所有数据关联配置吗？'
  },
  updateFieldConfigModalClearSuccessTip: {
    id: 'xform-builder.fieldConfig.updateFieldConfigModalClearSuccessTip',
    defaultMessage: '清除成功'
  },
  updateFieldConfigModalOption: {
    id: 'xform-builder.fieldConfig.updateFieldConfigModalOption',
    defaultMessage: '关联控件'
  },
  booleanCheckboxCheckedStatus: {
    id: 'xform-builder.fieldConfig.booleanCheckboxCheckedStatus',
    defaultMessage: '选中'
  },
  booleanCheckboxUncheckedStatus: {
    id: 'xform-builder.fieldConfig.booleanCheckboxUncheckedStatus',
    defaultMessage: '未选中'
  },
  updateFieldConfigModalEmptyOption: {
    id: 'xform-builder.fieldConfig.updateFieldConfigModalEmptyOption',
    defaultMessage: '没有配置了数据源的控件'
  },
  updateFieldConfigRelevanceModalEmptyOption: {
    id: 'xform-builder.fieldConfig.updateFieldConfigRelevanceModalEmptyOption',
    defaultMessage: '没有数字选择控件'
  },
  // fieldOptionList/index.js
  optionListCommonEnumName: {
    id: 'xform-builder.optionList.optionListCommonEnumName',
    defaultMessage: '新增选项'
  },
  optionListAddButton: {
    id: 'xform-builder.optionList.optionListAddButton',
    defaultMessage: '添加选项'
  },
  optionNameLabel: {
    id: 'xform-builder.optionList.optionNameLabel',
    defaultMessage: '选项'
  },
  optionListNameLabel: {
    id: 'xform-builder.optionList.optionListNameLabel',
    defaultMessage: '名称'
  },
  optionListNamePlaceholder: {
    id: 'xform-builder.optionList.optionListNamePlaceholder',
    defaultMessage: '最多不超过200个字符'
  },
  optionListNameRequire: {
    id: 'xform-builder.optionList.optionListNameRequire',
    defaultMessage: '请输入选项名称'
  },
  optionListCodeLabel: {
    id: 'xform-builder.optionList.optionListCodeLabel',
    defaultMessage: '编码'
  },
  optionListCodePlaceholder: {
    id: 'xform-builder.optionList.optionListCodePlaceholder',
    defaultMessage: '输入控件编码'
  },
  optionListCodeRequire: {
    id: 'xform-builder.optionList.optionListCodeRequire',
    defaultMessage: '请输入选项编码'
  },
  // configSchema.js
  configSchemaLabelLabel: {
    id: 'xform-builder.configSchema.configSchemaLabelLabel',
    defaultMessage: '段落'
  },
  configSchemaLinkLabel: {
    id: 'xform-builder.configSchema.configSchemaLinkLabel',
    defaultMessage: '链接'
  },
  configSchemaLinkValueTitle: {
    id: 'xform-builder.configSchema.configSchemaLinkValueTitle',
    defaultMessage: '链接地址'
  },
  configSchemaLabelDefaultValue: {
    id: 'xform-builder.configSchema.configSchemaLabelDefaultValue',
    defaultMessage: '普通文本默认值'
  },
  configSchemaLabelHelp: {
    id: 'xform-builder.configSchema.configSchemaLabelHelp',
    defaultMessage: '普通文本控件允许设置标题为空，标题为空不展示标题'
  },
  configSchemaLinkHelp: {
    id: 'xform-builder.configSchema.configSchemaLinkHelp',
    defaultMessage: '链接控件允许设置标题为空，标题为空不展示标题'
  },
  configSchemaGroupLabel: {
    id: 'xform-builder.configSchema.configSchemaGroupLabel',
    defaultMessage: '分组'
  },
  configSchemaInputLabel: {
    id: 'xform-builder.configSchema.configSchemaInputLabel',
    defaultMessage: '单行文本框'
  },
  configSchemaTextareaLabel: {
    id: 'xform-builder.configSchema.configSchemaTextareaLabel',
    defaultMessage: '多行文本框'
  },
  configSchemaRichtextLabel: {
    id: 'xform-builder.configSchema.configSchemaRichtextLabel',
    defaultMessage: '富文本框'
  },
  configSchemaNumberLabel: {
    id: 'xform-builder.configSchema.configSchemaNumberLabel',
    defaultMessage: '数字选择器'
  },
  configSchemaRadioLabel: {
    id: 'xform-builder.configSchema.configSchemaRadioLabel',
    defaultMessage: '单选'
  },
  configSchemaCheckboxLabel: {
    id: 'xform-builder.configSchema.configSchemaCheckboxLabel',
    defaultMessage: '复选'
  },
  configSchemaBoolCheckboxLabel: {
    id: 'xform-builder.configSchema.configSchemaBoolCheckboxLabel',
    defaultMessage: '单项复选'
  },
  configSchemaUploadLabel: {
    id: 'xform-builder.configSchema.configSchemaUploadLabel',
    defaultMessage: '图片'
  },
  configSchemaFileUploadLabel: {
    id: 'xform-builder.configSchema.configSchemaFileUploadLabel',
    defaultMessage: '文件'
  },
  configSchemaMultiSelectLabel: {
    id: 'xform-builder.configSchema.configSchemaMultiSelectLabel',
    defaultMessage: '多选下拉框'
  },
  configSchemaSelectLabel: {
    id: 'xform-builder.configSchema.configSchemaSelectLabel',
    defaultMessage: '下拉框'
  },
  configSchemaSuggestSelectLabel: {
    id: 'xform-builder.configSchema.configSchemaSuggestSelectLabel',
    defaultMessage: '自动完成下拉框'
  },
  configSchemaTreeSelectLabel: {
    id: 'xform-builder.configSchema.configSchemaTreeSelectLabel',
    defaultMessage: '树型下拉框'
  },
  configSchemaMultiTreeSelectLabel: {
    id: 'xform-builder.configSchema.configSchemaMultiTreeSelectLabel',
    defaultMessage: '多选树型下拉框'
  },
  configSchemaDateLabel: {
    id: 'xform-builder.configSchema.configSchemaDateLabel',
    defaultMessage: '日期选择器'
  },
  configSchemaDateRangeLabel: {
    id: 'xform-builder.configSchema.configSchemaDateRangeLabel',
    defaultMessage: '日期范围选择器'
  },
  configSchemaDateTimeLabel: {
    id: 'xform-builder.configSchema.configSchemaDateTimeLabel',
    defaultMessage: '时间选择器'
  },
  configSchemaGroupNameTitle: {
    id: 'xform-builder.configSchema.configSchemaGroupNameTitle',
    defaultMessage: '分组标题'
  },
  configSchemaTableNameTitle: {
    id: 'xform-builder.configSchema.configSchemaTableNameTitle',
    defaultMessage: '表格标题'
  },
  configSchemaGroupNamePlaceholder: {
    id: 'xform-builder.configSchema.configSchemaGroupNamePlaceholder',
    defaultMessage: '请输入分组名称'
  },
  configSchemaRateLabel: {
    id: 'xform-builder.configSchema.configSchemaRateLabel',
    defaultMessage: '评分'
  },
  configSchemaButtonLabel: {
    id: 'xform-builder.configSchema.configSchemaButtonLabel',
    defaultMessage: '按钮'
  },
  configSchemaButtonValueLabel: {
    id: 'xform-builder.configSchema.configSchemaButtonValueLabel',
    defaultMessage: '按钮名称'
  },
  configSchemaButtonValueInputLabel: {
    id: 'xform-builder.configSchema.configSchemaButtonValueInputLabel',
    defaultMessage: '请输入按钮名称'
  },
  configSchemaButtonBehaviorLabel: {
    id: 'xform-builder.configSchema.configSchemaButtonBehaviorLabel',
    defaultMessage: '按钮行为'
  },
  configSchemaButtonBehaviorSelectLabel: {
    id: 'xform-builder.configSchema.configSchemaButtonBehaviorSelectLabel',
    defaultMessage: '请选择按钮行为'
  },
  configSchemaPopCodeLabel: {
    id: 'xform-builder.configSchema.configSchemaPopCodeLabel',
    defaultMessage: '弹出控件组的编码'
  },
  configSchemaPopCodeInputLabel: {
    id: 'xform-builder.configSchema.configSchemaPopCodeInputLabel',
    defaultMessage: '请输入弹出控件组的编码'
  },
  configSchemaBehaviorUrlLabel: {
    id: 'xform-builder.configSchema.configSchemaBehaviorUrlLabel',
    defaultMessage: '提交类型'
  },
  configSchemaSysFieldTitle: {
    id: 'xform-builder.configSchema.configSchemaSysFieldTitle',
    defaultMessage: '绑定系统字段'
  },
  configSchemaSysFieldPlaceholder: {
    id: 'xform-builder.configSchema.configSchemaSysFieldPlaceholder',
    defaultMessage: '请选择需要绑定的系统字段，用于业务逻辑处理'
  },
  configSchemaNameTitle: {
    id: 'xform-builder.configSchema.configSchemaNameTitle',
    defaultMessage: '名称'
  },
  configSchemaNamePlaceholder: {
    id: 'xform-builder.configSchema.configSchemaNamePlaceholder',
    defaultMessage: '输入控件名称，不超过200字符'
  },
  configSchemaNameRequire: {
    id: 'xform-builder.configSchema.configSchemaNameRequire',
    defaultMessage: '请输入控件名称'
  },
  configSchemaCodeTitle: {
    id: 'xform-builder.configSchema.configSchemaCodeTitle',
    defaultMessage: '编码'
  },
  configSchemaCodePlaceholder: {
    id: 'xform-builder.configSchema.configSchemaCodePlaceholder',
    defaultMessage: '输入控件编码'
  },
  configSchemaCodeRequire: {
    id: 'xform-builder.configSchema.configSchemaCodeRequire',
    defaultMessage: '请输入控件编码'
  },
  configSchemaPlaceholderTitle: {
    id: 'xform-builder.configSchema.configSchemaPlaceholderTitle',
    defaultMessage: '占位符'
  },
  configSchemaPlaceholderPlaceholder: {
    id: 'xform-builder.configSchema.configSchemaPlaceholderPlaceholder',
    defaultMessage: '请输入控件的placeholder值'
  },
  configSchemaDataSourceTitle: {
    id: 'xform-builder.configSchema.configSchemaDataSourceTitle',
    defaultMessage: '数据源'
  },
  configSchemaDataSourcePlaceholder: {
    id: 'xform-builder.configSchema.configSchemaDataSourcePlaceholder',
    defaultMessage: '请选择数据源'
  },
  configSchemaServerCodeTitle: {
    id: 'xform-builder.configSchema.configSchemaServerCodeTitle',
    defaultMessage: '动态校验器'
  },
  configSchemaServerCodePlaceholder: {
    id: 'xform-builder.configSchema.configSchemaServerCodePlaceholder',
    defaultMessage: '请选择校验器'
  },
  configSchemaValueTitle: {
    id: 'xform-builder.configSchema.configSchemaValueTitle',
    defaultMessage: '默认值'
  },
  configSchemaBehaviorTitle: {
    id: 'xform-builder.configSchema.configSchemaBehaviorTitle',
    defaultMessage: '行为'
  },
  configSchemaBooleanCheckboxValueTitle: {
    id: 'xform-builder.configSchema.configSchemaBooleanCheckboxValueTitle',
    defaultMessage: '默认选中'
  },
  configSchemaValuePlaceholder: {
    id: 'xform-builder.configSchema.configSchemaValuePlaceholder',
    defaultMessage: '请输入控件的默认值'
  },
  configSchemaSelectValuePlaceholder: {
    id: 'xform-builder.configSchema.configSchemaSelectValuePlaceholder',
    defaultMessage: '请输入控件的默认值，必须是对应选项code'
  },
  configSchemashownodesPlaceholder: {
    id: 'xform-builder.configSchema.configSchemashownodesPlaceholder',
    defaultMessage: '可多选节点'
  },
  configSchemaDescTitle: {
    id: 'xform-builder.configSchema.configSchemaDescTitle',
    defaultMessage: '控件说明'
  },
  configSchemaDescPlaceholder: {
    id: 'xform-builder.configSchema.configSchemaDescPlaceholder',
    defaultMessage: '请输入控件说明'
  },
  configSchemaValidateTitle: {
    id: 'xform-builder.configSchema.configSchemaValidateTitle',
    defaultMessage: '校验器'
  },
  configSchemaValidateOption1: {
    id: 'xform-builder.configSchema.configSchemaValidateOption1',
    defaultMessage: '无校验器'
  },
  configSchemaValidateOption2: {
    id: 'xform-builder.configSchema.configSchemaValidateOption2',
    defaultMessage: '邮箱格式校验'
  },
  configSchemaValidateOption3: {
    id: 'xform-builder.configSchema.configSchemaValidateOption3',
    defaultMessage: 'url格式校验'
  },
  configSchemaValidateOption4: {
    id: 'xform-builder.configSchema.configSchemaValidateOption4',
    defaultMessage: '电话格式校验'
  },
  configSchemaValidateOption5: {
    id: 'xform-builder.configSchema.configSchemaValidateOption5',
    defaultMessage: '身份证格式校验'
  },
  configSchemaValidateOption6: {
    id: 'xform-builder.configSchema.configSchemaValidateOption6',
    defaultMessage: '纯数字格式校验'
  },
  configSchemaValidateOption7: {
    id: 'xform-builder.configSchema.configSchemaValidateOption7',
    defaultMessage: '货币格式校验'
  },
  configSchemaValidatePlaceholder: {
    id: 'xform-builder.configSchema.configSchemaValidatePlaceholder',
    defaultMessage: '请选择控件校验器'
  },
  configSchemaCascadeTitle: {
    id: 'xform-builder.configSchema.configSchemaCascadeTitle',
    defaultMessage: '控件层叠'
  },
  configSchemaRequiredTitle: {
    id: 'xform-builder.configSchema.configSchemaRequiredTitle',
    defaultMessage: '必填控件'
  },
  configSchemaMaxLengthTitle: {
    id: 'xform-builder.configSchema.configSchemaMaxLengthTitle',
    defaultMessage: '字数限制'
  },
  configSchemaMaximumTitle: {
    id: 'xform-builder.configSchema.configSchemaMaximumTitle',
    defaultMessage: '最大值'
  },
  configSchemaMinimumTitle: {
    id: 'xform-builder.configSchema.configSchemaMinimumTitle',
    defaultMessage: '最小值'
  },
  configSchemaUploadTypeTitle: {
    id: 'xform-builder.configSchema.configSchemaUploadTypeTitle',
    defaultMessage: '展示类型'
  },
  configSchemaUploadTypeOption1: {
    id: 'xform-builder.configSchema.configSchemaUploadTypeOption1',
    defaultMessage: '垂直排列'
  },
  configSchemaUploadTypeOption2: {
    id: 'xform-builder.configSchema.configSchemaUploadTypeOption2',
    defaultMessage: '水平排列'
  },
  configSchemaUploadTypeOption3: {
    id: 'xform-builder.configSchema.configSchemaUploadTypeOption3',
    defaultMessage: '照片墙方式'
  },
  configSchemaUploadMaxSizeTitle: {
    id: 'xform-builder.configSchema.configSchemaUploadMaxSizeTitle',
    defaultMessage: '文件大小(M)'
  },
  configSchemaUploadMaxNumTitle: {
    id: 'xform-builder.configSchema.configSchemaUploadMaxNumTitle',
    defaultMessage: '文件最多上传'
  },
  configSchemaUploadExamplePicUrlTitle: {
    id: 'xform-builder.configSchema.configSchemaUploadExamplePicUrlTitle',
    defaultMessage: '示例图片'
  },
  configSchemaUploadTemplateFileUrlTitle: {
    id: 'xform-builder.configSchema.configSchemaUploadTemplateFileUrlTitle',
    defaultMessage: '模板文件'
  },
  configSchemaHiddenTitle: {
    id: 'xform-builder.configSchema.configSchemaHiddenTitle',
    defaultMessage: '隐藏该控件'
  },
  configSchemaDisabledTitle: {
    id: 'xform-builder.configSchema.configSchemaDisabledTitle',
    defaultMessage: '只读'
  },
  configSchemaMultipleTitle: {
    id: 'xform-builder.configSchema.configSchemaMultipleTitle',
    defaultMessage: '选择类型'
  },
  configSchemaMultipleOption1: {
    id: 'xform-builder.configSchema.configSchemaMultipleOption1',
    defaultMessage: '单选'
  },
  configSchemaMultipleOption2: {
    id: 'xform-builder.configSchema.configSchemaMultipleOption2',
    defaultMessage: '多选'
  },
  configSchemaShowTypeTitle: {
    id: 'xform-builder.configSchema.configSchemaShowTypeTitle',
    defaultMessage: '展示类型'
  },
  configSchemaShowTypeOption1: {
    id: 'xform-builder.configSchema.configSchemaShowTypeOption1',
    defaultMessage: '多列全部展示'
  },
  configSchemaShowTypeOption2: {
    id: 'xform-builder.configSchema.configSchemaShowTypeOption2',
    defaultMessage: '单列轮播展示'
  },
  configSchemaSelectLeafOnlyTitle: {
    id: 'xform-builder.configSchema.configSchemaSelectLeafOnlyTitle',
    defaultMessage: '仅叶子节点可选'
  },
  configSchemaTreeCheckStrictlyTitle: {
    id: 'xform-builder.configSchema.configSchemaTreeCheckStrictlyTitle',
    defaultMessage: '父子选择不联动'
  },
  configSchemaInitRangeTitle: {
    id: 'xform-builder.configSchema.configSchemaInitRangeTitle',
    defaultMessage: '默认值'
  },
  configSchemaInitRangeOption1: {
    id: 'xform-builder.configSchema.configSchemaInitRangeOption1',
    defaultMessage: '前一周范围'
  },
  configSchemaInitRangeOption2: {
    id: 'xform-builder.configSchema.configSchemaInitRangeOption2',
    defaultMessage: '前一月范围'
  },
  configSchemaInitRangeOption3: {
    id: 'xform-builder.configSchema.configSchemaInitRangeOption3',
    defaultMessage: '前一年范围'
  },
  configSchemaInitRangeOption4: {
    id: 'xform-builder.configSchema.configSchemaInitRangeOption4',
    defaultMessage: '后一周范围'
  },
  configSchemaInitRangeOption5: {
    id: 'xform-builder.configSchema.configSchemaInitRangeOption5',
    defaultMessage: '后一月范围'
  },
  configSchemaInitRangeOption6: {
    id: 'xform-builder.configSchema.configSchemaInitRangeOption6',
    defaultMessage: '后一年范围'
  },
  //add bpmn nodes
  configSchemaProcessNodesTitle: {
    id: 'xform-builder.configSchema.configSchemaProcessNodesTitle',
    defaultMessage: '可见节点'
  },
  configSchemaShowNodesHelp: {
    id: 'xform-builder.configSchema.configSchemaShowNodesHelp',
    defaultMessage: '不填，默认所有节点可见'
  },
  configSchemaProcessDisNodesTitle: {
    id: 'xform-builder.configSchema.configSchemaProcessDisNodesTitle',
    defaultMessage: '禁用节点'
  },
  //add item widths
  configSchemaItemWidthsTitle: {
    id: 'xform-builder.configSchema.configSchemaItemWidthsTitle',
    defaultMessage: '控件宽度'
  },
  configSchemaMarginLeftTitle: {
    id: 'xform-builder.configSchema.configSchemaMarginLeftTitle',
    defaultMessage: '控件左边距'
  },
  // customFieldSchema.js
  fieldSchemaInputLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaInputLabel',
    defaultMessage: '单行文本框'
  },
  fieldSchemaTextareaLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaTextareaLabel',
    defaultMessage: '多行文本框'
  },
  fieldSchemaRichtextLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaRichtextLabel',
    defaultMessage: '富文本框'
  },
  fieldSchemaNumberLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaNumberLabel',
    defaultMessage: '数字选择器'
  },
  fieldSchemaSliderLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaSliderLabel',
    defaultMessage: '滑动输入条'
  },
  fieldSchemaSliderRangeLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaSliderRangeLabel',
    defaultMessage: '滑动区域输入条'
  },
  fieldSchemaRadioLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaRadioLabel',
    defaultMessage: '单选'
  },
  fieldSchemaCheckboxLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaCheckboxLabel',
    defaultMessage: '复选'
  },
  fieldSchemaBoolCheckboxLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaBoolCheckboxLabel',
    defaultMessage: '单项复选'
  },
  fieldSchemaBoolSwitchLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaBoolSwitchLabel',
    defaultMessage: '开关'
  },
  fieldSchemaUploadLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaUploadLabel',
    defaultMessage: '图片'
  },
  fieldSchemaUploadButton: {
    id: 'xform-builder.customFieldSchema.fieldSchemaUploadButton',
    defaultMessage: '图片上传'
  },
  fieldSchemaFileUploadButton: {
    id: 'xform-builder.customFieldSchema.fieldSchemaFileUploadButton',
    defaultMessage: '文件上传'
  },
  fieldSchemaSelectLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaSelectLabel',
    defaultMessage: '下拉框'
  },
  fieldSchemaMultiSelectLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaMultiSelectLabel',
    defaultMessage: '多选下拉框'
  },
  fieldSchemaCascaderSelectLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaCascaderSelectLabel',
    defaultMessage: '级联下拉框'
  },
  fieldSchemaSuggestSelectLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaSuggestSelectLabel',
    defaultMessage: 'suggest下拉框'
  },
  fieldSchemaTreeSelectLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaTreeSelectLabel',
    defaultMessage: '树型下拉框'
  },
  fieldSchemaMultiTreeSelectLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaMultiTreeSelectLabel',
    defaultMessage: '多选树型下拉框'
  },
  fieldSchemaDateLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaDateLabel',
    defaultMessage: '日期选择器'
  },
  fieldSchemaDateRangeLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaDateRangeLabel',
    defaultMessage: '日期范围选择器'
  },
  fieldSchemaDateTimeLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaDateTimeLabel',
    defaultMessage: '时间选择器'
  },
  fieldSchemaRateLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaRateLabel',
    defaultMessage: '评分'
  },
  fieldSchemaButtonLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaButtonLabel',
    defaultMessage: '按钮'
  },
  fieldSchemaDateRangePlaceholder1: {
    id: 'xform-builder.customFieldSchema.fieldSchemaDateRangePlaceholder1',
    defaultMessage: '开始日期'
  },
  fieldSchemaDateRangePlaceholder2: {
    id: 'xform-builder.customFieldSchema.fieldSchemaDateRangePlaceholder2',
    defaultMessage: '结束日期'
  },
  fieldSchemaCommonInputPlaceholder: {
    id: 'xform-builder.customFieldSchema.fieldSchemaCommonInputPlaceholder',
    defaultMessage: '请输入'
  },
  fieldSchemaCommonSelectPlaceholder: {
    id: 'xform-builder.customFieldSchema.fieldSchemaCommonSelectPlaceholder',
    defaultMessage: '请选择'
  },
  fieldSchemaBizSelectorPlaceholder: {
    id: 'xform-builder.customFieldSchema.fieldSchemaBizSelectorPlaceholder',
    defaultMessage: '请选择业务类型'
  },
  fieldSchemaCommonOption1: {
    id: 'xform-builder.customFieldSchema.fieldSchemaCommonOption1',
    defaultMessage: '选项一'
  },
  fieldSchemaCommonOption2: {
    id: 'xform-builder.customFieldSchema.fieldSchemaCommonOption2',
    defaultMessage: '选项二'
  },
  fieldSchemaCommonOption3: {
    id: 'xform-builder.customFieldSchema.fieldSchemaCommonOption3',
    defaultMessage: '选项三'
  },
  fieldSchemaCommonRateOption1: {
    id: 'xform-builder.customFieldSchema.fieldSchemaCommonRateOption1',
    defaultMessage: '等级一'
  },
  fieldSchemaCommonRateOption2: {
    id: 'xform-builder.customFieldSchema.fieldSchemaCommonRateOption2',
    defaultMessage: '等级二'
  },
  fieldSchemaCommonRateOption3: {
    id: 'xform-builder.customFieldSchema.fieldSchemaCommonRateOption3',
    defaultMessage: '等级三'
  },
  fieldSchemaCommonRateOption4: {
    id: 'xform-builder.customFieldSchema.fieldSchemaCommonRateOption4',
    defaultMessage: '等级四'
  },
  fieldSchemaCommonRateOption5: {
    id: 'xform-builder.customFieldSchema.fieldSchemaCommonRateOption5',
    defaultMessage: '等级五'
  },
  //地图
  configSchemaAmap: {
    id: 'xform-builder.configSchema.configSchemaAmap',
    defaultMessage: '地图定位选择器'
  },
  fieldSchemaAmapLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaAmapLabel',
    defaultMessage: '地址框'
  },
  //穿梭框
  configSchemaTransfer: {
    id: 'xform-builder.configSchema.configSchemaTransfer',
    defaultMessage: '穿梭框'
  },
  fieldSchemaTransfer: {
    id: 'xform-builder.customFieldSchema.fieldSchemaTransfer',
    defaultMessage: '地址框'
  },
  configSchemaTransferTypeTitle: {
    id: 'xform-builder.configSchema.configSchemaTransferTypeTitle',
    defaultMessage: '穿梭框类型'
  },
  configSchemaTransferData: {
    id: 'xform-builder.configSchema.configSchemaTransferData',
    defaultMessage: '穿梭框数据'
  },
  configSchemaTransferSelectedData: {
    id: 'xform-builder.configSchema.configSchemaTransferSelectedData',
    defaultMessage: '穿梭框选中默认值'
  },
  configSchemaTransferDataPlaceholder: {
    id: 'xform-builder.configSchema.configSchemaTransferDataPlaceholder',
    defaultMessage: '输入穿梭框数据'
  },
  configSchemaTransferSelectedDataPlaceholder: {
    id: 'xform-builder.configSchema.configSchemaTransferSelectedDataPlaceholder',
    defaultMessage: '输入穿梭框选中默认值'
  },
  configSchemaTransferLeftColumns: {
    id: 'xform-builder.configSchema.configSchemaTransferLeftColumns',
    defaultMessage: '穿梭框待选侧配置属性'
  },
  configSchemaTransferLeftColumnsPlaceholder: {
    id: 'xform-builder.configSchema.configSchemaTransferLeftColumnsPlaceholder',
    defaultMessage: '输入穿梭框待选侧配置属性'
  },
  configSchemaTransferRightColumns: {
    id: 'xform-builder.configSchema.configSchemaTransferRightColumns',
    defaultMessage: '穿梭框选中侧配置属性'
  },
  configSchemaTransferRightColumnsPlaceholder: {
    id: 'xform-builder.configSchema.configSchemaTransferRightColumnsPlaceholder',
    defaultMessage: '输入穿梭框选中侧配置属性'
  },
  configSchemaTransferLeftTitle: {
    id: 'xform-builder.configSchema.configSchemaTransferLeftTitle',
    defaultMessage: '穿梭框待选侧标题'
  },
  configSchemaLeftTitleRequire: {
    id: 'xform-builder.configSchema.configSchemaLeftTitleRequire',
    defaultMessage: '请输入穿梭框待选侧标题'
  },
  configSchemaTransferLeftTitlePlaceholder: {
    id: 'xform-builder.configSchema.configSchemaTransferLeftTitlePlaceholder',
    defaultMessage: '输入穿梭框待选侧标题'
  },
  configSchemaTransferRightTitle: {
    id: 'xform-builder.configSchema.configSchemaTransferRightTitle',
    defaultMessage: '穿梭框选中侧标题'
  },
  configSchemaRightTitleRequire: {
    id: 'xform-builder.configSchema.configSchemaRightTitleRequire',
    defaultMessage: '请输入穿梭框选中侧标题'
  },
  configSchemaTransferRightTitlePlaceholder: {
    id: 'xform-builder.configSchema.configSchemaTransferRightTitlePlaceholder',
    defaultMessage: '输入穿梭框选中侧标题'
  },
  configSchemaCheckType: {
    id: 'xform-builder.configSchema.configSchemaCheckType',
    defaultMessage: '是否单选'
  },
  //印章选择
  configSchemaStamp: {
    id: 'xform-builder.configSchema.configSchemaStamp',
    defaultMessage: '印章选择器'
  },
  fieldSchemaTableSelectLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaTableSelectLabel',
    defaultMessage: '表格数据选择器'
  },
  fieldSchemaStampLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemStampLabel',
    defaultMessage: '印章框'
  },
  configSchemaTableLabel: {
    id: 'xform-builder.configSchema.configSchemaTableLabel',
    defaultMessage: '表格控件'
  },
  fieldSchemaTableLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemaTableLabel',
    defaultMessage: '表格控件'
  },
  configSchemaCalculateLabel: {
    id: 'xform-builder.configSchema.configSchemaCalculateLabel',
    defaultMessage: '数字计算器'
  },
  fieldSchemaCalculateLabel: {
    id: 'xform-builder.customFieldSchema.fieldSchemCalculateLabel',
    defaultMessage: '数字计算'
  },
  configSchemaAlgorithmTitle: {
    id: 'xform-builder.customFieldSchema.configSchemaAlgorithmTitle',
    defaultMessage: '计算方式'
  }
};
var messages;
exports.messages = messages;

if (typeof location !== 'undefined' && location.href.indexOf('xform-mock=true') > -1) {
  var locale = typeof navigator !== 'undefined' && navigator.language.toLocaleLowerCase() || 'en-us';
  exports.messages = messages = _defineProperty({}, locale, {});
  Object.keys(localMessages).map(function (key) {
    messages[locale]['xform.client.' + localMessages[key].id] = localMessages[key].defaultMessage;
  });
} else {
  exports.messages = messages = _index["default"];
}

var getMessageId = function getMessageId(code) {
  return 'xform.client.' + localMessages[code].id;
};

exports.getMessageId = getMessageId;
var localMessagesArray = [];
exports.localMessagesArray = localMessagesArray;
Object.keys(localMessages).map(function (key) {
  localMessagesArray.push({
    id: localMessages[key].id,
    defaultMessage: localMessages[key].defaultMessage
  });
});