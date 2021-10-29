'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xformBuilderData = xformBuilderData;

var CONST = _interopRequireWildcard(require("../containers/editor-form/common/const"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  dataSource: [{
    label: '',
    value: ''
  }],
  formDataSource: [{
    label: '',
    value: ''
  }],
  serverCode: [{
    label: '',
    value: ''
  }],
  fields: [],
  systemFields: [],
  commonFields: [],
  xformBizData: [],
  xformOptionBizData: [],
  editFieldData: null,
  langs: {
    langs: [],
    defaultLang: '',
    currentLang: ''
  },
  globalConfig: {
    codeEditable: true,
    fieldPreviewable: false
  }
};

function xformBuilderData(state, action) {
  var code, index, fieldData;
  var namespace = action.namespace;

  if (typeof state === 'undefined') {
    state = _objectSpread({}, initialState); // 这里为了初始化冗余了一些数据，实际需要获取的数据都在对应的namespace中
  }

  if (typeof namespace !== 'undefined' && typeof state[namespace] === 'undefined') {
    state[namespace] = _objectSpread({}, initialState);
  }

  switch (action.type) {
    // 更新字段数据源
    case CONST.XFORM_BUILDER_GET_DATASOURCE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
        dataSource: action.data
      })));
    // 更新表单字段数据源

    case CONST.XFORM_BUILDER_GET_FORM_DATASOURCE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
        formDataSource: action.data
      })));
    // 更新动态校验器列表

    case CONST.XFORM_BUILDER_GET_SERVER_CODE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
        serverCode: action.data
      })));
    // 对xform field配置的处理
    // 初始化

    case CONST.XFORM_BUILDER_INIT_FIELDS:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
        fields: action.data
      })));
    // 添加

    case CONST.XFORM_BUILDER_ADD_FIELDS:
      var newData = Array.isArray(action.data) ? action.data : [action.data];
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
        fields: state[namespace].fields.concat(newData)
      })));
    // 在某个索引处添加

    case CONST.XFORM_BUILDER_ADD_FIELDS_WITH_INDEX:
      fieldData = action.data.fieldData;
      index = action.data.index;
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
        fields: state[namespace].fields.slice(0, index).concat(fieldData).concat(state[namespace].fields.slice(index, state[namespace].fields.length))
      })));
    // 删除

    case CONST.XFORM_BUILDER_DELETE_FIELDS:
      code = action.data;
      index = -1;
      var newFields = [];
      state[namespace].fields.map(function (field, i) {
        if (field.code === code || field.hasgroup === code) {
          index = i;
        } else {
          newFields.push(field);
        }
      });

      if (index <= -1) {
        return state;
      } else {
        return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
          fields: newFields //fields: state[namespace].fields.slice(0, index).concat(state[namespace].fields.slice(index + 1, state[namespace].fields.length))

        })));
      }

    // 更新

    case CONST.XFORM_BUILDER_UPDATE_FIELDS_ITEM:
      code = action.data.code;
      index = -1;
      fieldData = action.data.fieldData;
      var hasItem = false;
      state[namespace].fields.map(function (field, fieldIndex) {
        if (field.code === code) {
          hasItem = true;
          index = fieldIndex;
        }
      });

      if (hasItem) {
        return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
          fields: state[namespace].fields.slice(0, index).concat(fieldData).concat(state[namespace].fields.slice(index + 1, state[namespace].fields.length))
        })));
      } else {
        return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
          fields: state[namespace].fields.concat(fieldData)
        })));
      }

    // 系统字段数据

    case CONST.XFORM_BUILDER_UPDATE_SYSTEM_FIELDS:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
        systemFields: action.data
      })));

    case CONST.XFORM_BUILDER_CLEAR_SYSTEM_FIELDS:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
        systemFields: []
      })));
    // 通用字段配置数据

    case CONST.XFORM_BUILDER_UPDATE_COMMON_FIELDS:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
        commonFields: action.data
      })));

    case CONST.XFORM_BUILDER_CLEAR_COMMON_FIELDS:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
        commonFields: []
      })));
    // xform业务属性配置数据

    case CONST.XFORM_BUILDER_UPDATE_BIZ:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
        xformBizData: action.data
      })));

    case CONST.XFORM_BUILDER_CLEAR_BIZ:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
        xformBizData: []
      })));
    // xform选项通用业务属性配置数据

    case CONST.XFORM_BUILDER_UPDATE_OPTION_BIZ:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
        xformOptionBizData: action.data
      })));

    case CONST.XFORM_BUILDER_CLEAR_OPTION_BIZ:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
        xformOptionBizData: []
      })));
    // 编辑中的fieldData数据  如果编辑的是group 需要处理子控件

    case CONST.XFORM_BUILDER_UPDATE_EDIT_FIELD:
      if (_typeof(action.data) === 'object' && action.data !== null) {
        code = action.data.code || '';
        fieldData = action.data;

        if ((fieldData.type === 'group' || fieldData.type === 'Table') && state[namespace].editFieldData !== null) {
          var oldCode = state[namespace].editFieldData.code || '';
          var _newFields = [];
          state[namespace].fields.map(function (field, i) {
            var newField = _extends({}, field); // /* 为了解决修改分组控件的编码 */
            // if (field.hasOwnProperty('hasgroup') &&  field.hasgroup == oldCode) {
            //     newField.hasgroup = code
            // }


            _newFields.push(newField);
          });
          return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
            editFieldData: action.data,
            fields: _newFields
          })));
        } else {
          return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
            editFieldData: action.data
          })));
        }
      } else {
        return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
          editFieldData: action.data
        })));
      }

    // 更新多语言配置

    case CONST.XFORM_BUILDER_UPDATE_LANGS:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
        langs: action.data
      })));
    // 清空多语言配置

    case CONST.XFORM_BUILDER_CLEAR_LANGS:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
        langs: {
          langs: [],
          defaultLang: '',
          currentLang: ''
        }
      })));
    // 更新全局统一配置（目前主要是查看Code和字段内容预览）

    case CONST.XFORM_BUILDER_UPDATE_GLOBAL_CONFIG:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, state[namespace]), {}, {
        globalConfig: action.data
      })));

    default:
      return state;
  }
}

;