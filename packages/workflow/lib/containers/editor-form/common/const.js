"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XFORM_CONFIG_FIELDS = exports.TOPBAR_HEIGHT = exports.LOCALSTORAGE_NAMESPACE = exports.DragDropItemTypes = exports.CONFIGUEABLE_FIELD_CONFIG_CODE = exports.XFORM_OPTION_BIZ_NAME = exports.XFORM_BUILDER_UPDATE_GLOBAL_CONFIG = exports.XFORM_BUILDER_CLEAR_LANGS = exports.XFORM_BUILDER_UPDATE_LANGS = exports.XFORM_BUILDER_UPDATE_EDIT_FIELD = exports.XFORM_BUILDER_CLEAR_OPTION_BIZ = exports.XFORM_BUILDER_UPDATE_OPTION_BIZ = exports.XFORM_BUILDER_CLEAR_BIZ = exports.XFORM_BUILDER_UPDATE_BIZ = exports.XFORM_BUILDER_CLEAR_COMMON_FIELDS = exports.XFORM_BUILDER_UPDATE_COMMON_FIELDS = exports.XFORM_BUILDER_CLEAR_SYSTEM_FIELDS = exports.XFORM_BUILDER_UPDATE_SYSTEM_FIELDS = exports.XFORM_BUILDER_UPDATE_FIELDS_ITEM = exports.XFORM_BUILDER_DELETE_FIELDS = exports.XFORM_BUILDER_ADD_FIELDS_WITH_INDEX = exports.XFORM_BUILDER_ADD_FIELDS = exports.XFORM_BUILDER_GROUP_FIELDS = exports.XFORM_BUILDER_INIT_FIELDS = exports.XFORM_BUILDER_GET_SERVER_CODE = exports.XFORM_BUILDER_GET_FORM_DATASOURCE = exports.XFORM_BUILDER_GET_DATASOURCE = void 0;

/**
 * APP中常量配置，注意都要携带命名空间
 */
// action creator types
var XFORM_BUILDER_GET_DATASOURCE = 'xform-builder-get-datasource-list';
exports.XFORM_BUILDER_GET_DATASOURCE = XFORM_BUILDER_GET_DATASOURCE;
var XFORM_BUILDER_GET_FORM_DATASOURCE = 'xform-builder-get-form-datasource-list';
exports.XFORM_BUILDER_GET_FORM_DATASOURCE = XFORM_BUILDER_GET_FORM_DATASOURCE;
var XFORM_BUILDER_GET_SERVER_CODE = 'xform-builder-get-server-code';
exports.XFORM_BUILDER_GET_SERVER_CODE = XFORM_BUILDER_GET_SERVER_CODE;
var XFORM_BUILDER_INIT_FIELDS = 'xform-builder-init-fields';
exports.XFORM_BUILDER_INIT_FIELDS = XFORM_BUILDER_INIT_FIELDS;
var XFORM_BUILDER_GROUP_FIELDS = 'xform-builder-group-fields'; //更新groupfield

exports.XFORM_BUILDER_GROUP_FIELDS = XFORM_BUILDER_GROUP_FIELDS;
var XFORM_BUILDER_ADD_FIELDS = 'xform-builder-add-fields';
exports.XFORM_BUILDER_ADD_FIELDS = XFORM_BUILDER_ADD_FIELDS;
var XFORM_BUILDER_ADD_FIELDS_WITH_INDEX = 'xform-builder-add-fields-with-index';
exports.XFORM_BUILDER_ADD_FIELDS_WITH_INDEX = XFORM_BUILDER_ADD_FIELDS_WITH_INDEX;
var XFORM_BUILDER_DELETE_FIELDS = 'xform-builder-delete-fields';
exports.XFORM_BUILDER_DELETE_FIELDS = XFORM_BUILDER_DELETE_FIELDS;
var XFORM_BUILDER_UPDATE_FIELDS_ITEM = 'xform-builder-update-fields-item';
exports.XFORM_BUILDER_UPDATE_FIELDS_ITEM = XFORM_BUILDER_UPDATE_FIELDS_ITEM;
var XFORM_BUILDER_UPDATE_SYSTEM_FIELDS = 'xform-builder-update-system-fields';
exports.XFORM_BUILDER_UPDATE_SYSTEM_FIELDS = XFORM_BUILDER_UPDATE_SYSTEM_FIELDS;
var XFORM_BUILDER_CLEAR_SYSTEM_FIELDS = 'xform-builder-clear-system-fields';
exports.XFORM_BUILDER_CLEAR_SYSTEM_FIELDS = XFORM_BUILDER_CLEAR_SYSTEM_FIELDS;
var XFORM_BUILDER_UPDATE_COMMON_FIELDS = 'xform-builder-update-common-fields';
exports.XFORM_BUILDER_UPDATE_COMMON_FIELDS = XFORM_BUILDER_UPDATE_COMMON_FIELDS;
var XFORM_BUILDER_CLEAR_COMMON_FIELDS = 'xform-builder-clear-common-fields';
exports.XFORM_BUILDER_CLEAR_COMMON_FIELDS = XFORM_BUILDER_CLEAR_COMMON_FIELDS;
var XFORM_BUILDER_UPDATE_BIZ = 'xform-builder-update-biz-data';
exports.XFORM_BUILDER_UPDATE_BIZ = XFORM_BUILDER_UPDATE_BIZ;
var XFORM_BUILDER_CLEAR_BIZ = 'xform-builder-clear-biz-data';
exports.XFORM_BUILDER_CLEAR_BIZ = XFORM_BUILDER_CLEAR_BIZ;
var XFORM_BUILDER_UPDATE_OPTION_BIZ = 'xform-builder-update-option-biz-data';
exports.XFORM_BUILDER_UPDATE_OPTION_BIZ = XFORM_BUILDER_UPDATE_OPTION_BIZ;
var XFORM_BUILDER_CLEAR_OPTION_BIZ = 'xform-builder-clear-option-biz-data';
exports.XFORM_BUILDER_CLEAR_OPTION_BIZ = XFORM_BUILDER_CLEAR_OPTION_BIZ;
var XFORM_BUILDER_UPDATE_EDIT_FIELD = 'xform-builder-update-edit-field-data';
exports.XFORM_BUILDER_UPDATE_EDIT_FIELD = XFORM_BUILDER_UPDATE_EDIT_FIELD;
var XFORM_BUILDER_UPDATE_LANGS = 'xform-builder-update-langs';
exports.XFORM_BUILDER_UPDATE_LANGS = XFORM_BUILDER_UPDATE_LANGS;
var XFORM_BUILDER_CLEAR_LANGS = 'xform-builder-clear-langs';
exports.XFORM_BUILDER_CLEAR_LANGS = XFORM_BUILDER_CLEAR_LANGS;
var XFORM_BUILDER_UPDATE_GLOBAL_CONFIG = 'xform-builder-update-global-config';
exports.XFORM_BUILDER_UPDATE_GLOBAL_CONFIG = XFORM_BUILDER_UPDATE_GLOBAL_CONFIG;
var XFORM_OPTION_BIZ_NAME = 'options';
exports.XFORM_OPTION_BIZ_NAME = XFORM_OPTION_BIZ_NAME;
var CONFIGUEABLE_FIELD_CONFIG_CODE = ['code', 'placeholder', 'description', 'value', 'dataSource', 'validate', 'server', 'require', 'hidden'];
exports.CONFIGUEABLE_FIELD_CONFIG_CODE = CONFIGUEABLE_FIELD_CONFIG_CODE;
var DragDropItemTypes = {
  field: 'field',
  // 字段拖拽排序
  option: 'option',
  // 选项拖拽排序
  picker: 'picker' // 从左侧拖拽增加一个字段

}; // localStorage命名空间

exports.DragDropItemTypes = DragDropItemTypes;
var LOCALSTORAGE_NAMESPACE = 'xform'; // topbar的高度数值

exports.LOCALSTORAGE_NAMESPACE = LOCALSTORAGE_NAMESPACE;
var TOPBAR_HEIGHT = 48; // 放置在【基础属性】配置区域的配置项和放置在【高级属性】配置区域的配置项

exports.TOPBAR_HEIGHT = TOPBAR_HEIGHT;
var XFORM_CONFIG_FIELDS = {
  basic: ['sysField', 'name', 'code', 'placeholder', 'value', 'description', 'maxLength', 'maximum', 'minimum', 'require', 'hidden', 'disabled', 'groupName', 'uploadType', 'initRange', 'maxFileSize', 'maxFileNum', 'templateFileUrl', 'exampleImageUrl', 'selectLeafOnly', 'treeCheckStrictly', 'shownodes', 'disnodes', 'itemwidth', 'behavior', 'popCode', 'transferType', 'transferData', 'transferSelectedData', 'leftColumns', 'rightColumns', 'leftTitle', 'checkType', 'rightTitle', 'behaviorUrl', 'showGroupTitle', 'marginLeft', 'algorithm'],
  advance: ['dataSourceUrl', 'dataSource', 'validate', 'server', 'cascade']
};
exports.XFORM_CONFIG_FIELDS = XFORM_CONFIG_FIELDS;