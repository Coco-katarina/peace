"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icons = require("@ant-design/icons");

var _index = _interopRequireDefault(require("../../configSchema/index"));

var _option = _interopRequireDefault(require("./option"));

var _localeMessages = require("../../i18n/localeMessages");

var _util = require("../../common/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * xform-builder中间“生效字段”
 * @props: platform（选中的平台，laptop表示PC端、mobile表示移动端） editFieldData（当前正在编辑的字段data） fields（生效字段field数据） changeEditFieldHandler（field列表点击事件处理器） deleteEditFieldHandler（删除生效字段处理器） systemFieldEditable（系统字段是否可编辑删除，默认不能删除） addFieldsHandler（添加fields数据处理器） updateFieldsHandler（更新fields列表处理器）
 */
(function (elementID, css) {
  if (typeof window == 'undefined') return;
  if (typeof document == 'undefined') return;
  if (typeof document.head == 'undefined') return;
  if (window.document.getElementById(elementID)) return;
  var style = document.createElement('style');
  style.type = "text/css";
  style.id = elementID;
  style.innerHTML = css;
  document.head.appendChild(style);
})("11c36f0ce79096ce8777c7bea209313f", ".app-xform-builder-field-list-wrapper{padding:18px 7px}.app-xform-builder-field-list-wrapper .inner-wrapper{min-width:240px;margin:0 auto}.app-xform-builder-field-list-wrapper .inner-wrapper .system-preview-wrapper{border-bottom:1px dashed #a6b8c7;margin-bottom:8px}.app-xform-builder-field-list-wrapper .inner-wrapper .system-preview-wrapper .template-title{line-height:20px;color:rgba(0,0,0,.45);font-size:12px;position:relative;cursor:pointer;max-width:180px;min-width:100px;height:20px;text-align:center;margin:10px auto;border-radius:4px;background:rgba(205,208,210,.31)}.app-xform-builder-field-list-wrapper .inner-wrapper .system-preview-wrapper .template-title .expand-icon{display:inline-block;position:absolute;right:5px;top:0;font-size:12px}.app-xform-builder-field-list-wrapper .inner-wrapper .system-preview-wrapper.fold .expand-icon{transform:rotate(180deg)}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list{display:flex;flex-wrap:wrap}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list.hidden{display:none}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list .preview-group-list{width:100%;margin-bottom:8px;border:1px dashed #bbb;background-color:#fafafa;padding:8px;min-height:100px}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list .preview-group-list .group-list-item{display:flex;flex-wrap:wrap}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list li.preview-list-item{list-style:none;background:#fff;border:1px solid #a6b8c7;padding:10px 24px;border-radius:4px;cursor:move;margin-bottom:8px;position:relative}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list li.preview-list-item .list-item-wrapper{width:100%;overflow:hidden}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list li.preview-list-item .list-item-wrapper .field-index-number{position:absolute;top:0;left:0;width:20px;height:16px;line-height:16px;text-align:center;background:#a6b8c7;color:#fff}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list li.preview-list-item .list-item-wrapper .list-item-header{text-align:left}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list li.preview-list-item .list-item-wrapper .list-item-header .field-type-label{color:rgba(0,0,0,.45);font-size:14px;font-weight:500}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list li.preview-list-item .list-item-wrapper .list-item-header .field-type-label:after{content:\":\";position:relative;top:-.5px;margin:0 8px 0 2px}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list li.preview-list-item .list-item-wrapper .list-item-header .field-label{font-size:14px;color:rgba(0,0,0,.85)}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list li.preview-list-item .list-item-wrapper .field-preview{width:100%;margin-top:5px}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list li.preview-list-item .list-item-wrapper .field-preview .xform-item,.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list li.preview-list-item .list-item-wrapper .field-preview .xform-root{margin-bottom:0!important}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list li.preview-list-item .list-item-wrapper .not-support-tip{margin-top:5px}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list li.preview-list-item .list-item-wrapper .delete-icon{cursor:pointer;position:absolute;color:rgba(0,0,0,.45);display:none;right:5px;font-size:12px;top:5px}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list li.preview-list-item.current{border:1px solid #2190ef}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list li.preview-list-item.current .field-index-number{background:#2190ef}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list li.preview-list-item.current .field-type-label.system{border-left:6px solid #2190ef}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list li.preview-list-item:hover{border:1px solid #2190ef}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list li.preview-list-item:hover .field-index-number{background:#2190ef}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list li.preview-list-item:hover .field-type-label.system{border-left:6px solid #2190ef}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list li.preview-list-item:hover .delete-icon{display:block}.app-xform-builder-field-list-wrapper .inner-wrapper .preview-list li.preview-list-item.system{cursor:pointer;border-left:6px solid #a6b8c7}.app-xform-builder-field-list-wrapper .inner-wrapper .empty-box{text-align:center;margin-top:30%;color:rgba(0,0,0,.45);padding:10px 0}.app-xform-builder-field-list-wrapper .inner-wrapper .empty-box .empty-icon{font-size:20px;margin-right:10px;vertical-align:middle}.app-xform-builder-field-list-wrapper .inner-wrapper .empty-box .empty-tip{font-size:12px}");

var FieldList = /*#__PURE__*/function (_PureComponent) {
  _inherits(FieldList, _PureComponent);

  var _super = _createSuper(FieldList);

  function FieldList() {
    var _this;

    _classCallCheck(this, FieldList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    var systemFieldEditable = _this.props.systemFieldEditable;
    _this.handleFoldChange = _this.handleFoldChange.bind(_assertThisInitialized(_this));
    _this.handleFieldListClick = _this.handleFieldListClick.bind(_assertThisInitialized(_this));
    _this.handleAddField = _this.handleAddField.bind(_assertThisInitialized(_this));
    _this.handleDeleteField = _this.handleDeleteField.bind(_assertThisInitialized(_this));
    _this._clearFieldShow = _this._clearFieldShow.bind(_assertThisInitialized(_this));
    _this._clearFieldUpdate = _this._clearFieldUpdate.bind(_assertThisInitialized(_this));
    _this.handleFieldMove = _this.handleFieldMove.bind(_assertThisInitialized(_this));
    _this.state = {
      fold: !systemFieldEditable // 系统字段部分是否展开，默认折叠收起（如果系统字段可以编辑，则默认展开）

    };
    return _this;
  }

  _createClass(FieldList, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.deleteFieldCode != this.props.deleteFieldCode) {
        this._deleteFieldCode(nextProps.deleteFieldCode);
      }
    }
  }, {
    key: "_deleteFieldCode",
    value: function _deleteFieldCode(code) {
      var _this2 = this;

      var fields = this.props.fields;
      fields.map(function (field) {
        if (field.code === code) {
          _this2._clearFieldShow(field);

          _this2._clearFieldUpdate(field);

          _this2.props.deleteEditFieldHandler(code);
        }
      });
    }
  }, {
    key: "handleFoldChange",
    value: function handleFoldChange() {
      var fold = this.state.fold;
      this.setState({
        fold: !fold
      });
    } // 点击生效字段

  }, {
    key: "handleFieldListClick",
    value: function handleFieldListClick(event) {
      var target = event.currentTarget;
      var code = target.getAttribute('data-code');
      var _this$props = this.props,
          editFieldData = _this$props.editFieldData,
          changeEditFieldHandler = _this$props.changeEditFieldHandler;
      var editFieldCode = '';

      if (editFieldData !== null) {
        editFieldCode = editFieldData.code;
      } // 如果点击的是当前展示的字段，则不用刷新当前组件。如果刷新字段，会导致字段的即时预览效果中点击相关的操作失效（字段层叠）


      if (editFieldCode === code) {
        return;
      }

      this.props.fields.map(function (field) {
        if (field.code === code) {
          changeEditFieldHandler(field);
        }
      });
    } // 添加生效字段，添加字段这里需要调整index的值到systemFields.length + index

  }, {
    key: "handleAddField",
    value: function handleAddField(field, index) {
      var fields = this.props.fields;
      var systemFields = fields.filter(function (fieldData) {
        return fieldData.fieldType === 'system';
      });
      this.props.addFieldsHandler(field, index + systemFields.length);
    } // 删除生效字段，同时要删除与该字段相关的全部联动关系

  }, {
    key: "handleDeleteField",
    value: function handleDeleteField(event) {
      var _this3 = this;

      event.stopPropagation();
      var fields = this.props.fields;
      var code = event.currentTarget.getAttribute('data-code');
      fields.map(function (field) {
        if (field.code === code) {
          _this3._clearFieldShow(field);

          _this3._clearFieldUpdate(field);

          _this3.props.deleteEditFieldHandler(code);
        }
      });
    } // 清除某个字段的级联配置

  }, {
    key: "_clearFieldShow",
    value: function _clearFieldShow(field) {
      var _this4 = this;

      var fields = this.props.fields;
      var code = field.code;
      fields.map(function (field, index) {
        var uiSchemaContent = field.uiSchema[field.code];

        if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
          if (typeof uiSchemaContent['ui:options'].show !== 'undefined') {
            var checkEditCodeIndex = _this4._hasEditFieldCode(uiSchemaContent['ui:options'].show, code);

            if (checkEditCodeIndex.result) {
              uiSchemaContent['ui:options'].show.splice(checkEditCodeIndex.index, 1);

              if (uiSchemaContent['ui:options'].show.length <= 0) {
                delete uiSchemaContent['ui:options'].show;
              }
            }
          }
        }

        field.uiSchema[field.code] = uiSchemaContent;

        _this4.props.updateFieldItemHandler(field.code, field);
      });
    } // 清除某个字段的数据级联

  }, {
    key: "_clearFieldUpdate",
    value: function _clearFieldUpdate(field) {
      var code = field.code;
      var fieldData = Object.assign({}, field);
      var uiSchemaContent = fieldData.uiSchema[fieldData.code];

      if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
        if (typeof uiSchemaContent['ui:options'].updateFields !== 'undefined') {
          delete uiSchemaContent['ui:options'].updateFields;
        }
      }

      fieldData.uiSchema[fieldData.code] = uiSchemaContent;
      this.props.updateFieldItemHandler(code, fieldData);
    }
  }, {
    key: "_hasEditFieldCode",
    value: function _hasEditFieldCode(fieldShowOptions, editFieldCode) {
      var result = {
        result: false,
        index: 0
      };
      fieldShowOptions.map(function (option, index) {
        if (option.field === editFieldCode) {
          result = {
            result: true,
            index: index
          };
        }
      });
      return result;
    } // 生效字段拖拽排序（注意现在拖拽排序的index不计入系统字段类型了，故fields要排除掉系统字段的数据）

  }, {
    key: "handleFieldMove",
    value: function handleFieldMove(dragIndex, hoverIndex) {
      var _this5 = this;

      var fields = this.props.fields;
      var systemFields = [],
          otherFields = [];
      var sortedFields = []; // 从fields中过滤出来系统字段部分（系统字段不能进行排序）

      systemFields = fields.filter(function (fieldData) {
        return fieldData.fieldType === 'system';
      });
      otherFields = fields.filter(function (fieldData) {
        return fieldData.fieldType !== 'system';
      });
      var dragFields = otherFields[dragIndex];
      var dragFieldcode = dragFields.code;
      var hoverField = otherFields[hoverIndex];
      var afterDragFields = otherFields.slice();
      var indexInFields; //add 2020-06-05 如果拖拽 到目标是group 则加入 group ,并且排序到group后面

      if ((hoverField.type === 'group' || hoverField.type === 'Table') && dragFields.hasgroup !== hoverField.code || hoverField.hasgroup) {
        //如果拖拽本身 是group 不处理
        if (dragFields.type !== 'group' && dragFields.type !== 'Table') {
          dragFields.hasgroup = hoverField.type === 'group' || hoverField.type === 'Table' ? hoverField.code : hoverField.hasgroup; // 为 dragFields 被拖动的控件添加标记

          dragFields.jsonSchema[dragFields.code]['groupMsg'] = {
            type: hoverField.type
          };
          afterDragFields.splice(dragIndex, 1);

          if (dragIndex > hoverIndex) {
            afterDragFields.splice(hoverIndex + 1, 0, dragFields);
          } else {
            afterDragFields.splice(hoverIndex, 0, dragFields);
          }
        }
      } else {
        afterDragFields.splice(dragIndex, 1);
        afterDragFields.splice(hoverIndex, 0, dragFields);
      } //afterDragFields.splice(hoverIndex, 0, dragFields);
      //add 2020-06-08 如果 拖拽本身是group 需要把子field 排序到 group后面


      var newAfterDragFields = afterDragFields.slice();

      if (dragFields.type === 'group' || dragFields.type === 'Table') {
        //let groupIndex = hoverIndex    
        newAfterDragFields.map(function (item, index) {
          if (item.hasgroup === dragFieldcode) {
            var newIndex = afterDragFields.findIndex(function (v) {
              return v.code == item.code;
            });

            if (newIndex > -1) {
              afterDragFields.splice(newIndex, 1);

              if (newIndex > hoverIndex) {
                afterDragFields.splice(hoverIndex + 1, 0, item);
              } else {
                afterDragFields.splice(hoverIndex, 0, item);
              }
            }
          }
        });
      } // 这里还需要处理排序造成的联动逻辑变更，要清除被拖拽字段的相应的联动关系配置


      afterDragFields.map(function (field, index) {
        var uiSchemaContent = field.uiSchema[field.code];

        if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
          if (field.code === dragFieldcode) {
            // 对于拖动的字段本身，要清除掉其show配置中的拖动后位置在其下面的字段
            if (typeof uiSchemaContent['ui:options'].show !== 'undefined') {
              uiSchemaContent['ui:options'].show = uiSchemaContent['ui:options'].show.filter(function (showOption, showIndex) {
                indexInFields = _this5._getFieldIndex(afterDragFields, showOption.field);
                return indexInFields <= hoverIndex;
              });

              if (uiSchemaContent['ui:options'].show.length <= 0) {
                delete uiSchemaContent['ui:options'].show;
              }
            } // 对于拖动的字段本身，要清除掉其updateFields配置中的拖动后位置在其上面的字段


            if (typeof uiSchemaContent['ui:options'].updateFields !== 'undefined') {
              uiSchemaContent['ui:options'].updateFields = uiSchemaContent['ui:options'].updateFields.filter(function (updateCode, updateIndex) {
                indexInFields = _this5._getFieldIndex(afterDragFields, updateCode);
                return indexInFields >= hoverIndex;
              });

              if (uiSchemaContent['ui:options'].updateFields.length <= 0) {
                delete uiSchemaContent['ui:options'].updateFields;
              }
            }
          } else {
            // 对于其他字段，如果拖动后字段位于上面，则要清除掉这些字段与拖动字段的show关联
            if (typeof uiSchemaContent['ui:options'].show !== 'undefined') {
              indexInFields = _this5._getFieldIndex(afterDragFields, field.code);

              if (indexInFields < hoverIndex) {
                uiSchemaContent['ui:options'].show.map(function (showOption, showIndex) {
                  if (showOption.field === dragFieldcode) {
                    uiSchemaContent['ui:options'].show.splice(showIndex, 1);

                    if (uiSchemaContent['ui:options'].show.length <= 0) {
                      delete uiSchemaContent['ui:options'].show;
                    }
                  }
                });
              }
            } // 对于其他字段，如果拖动后字段位于下面，则要清除掉这些字段与拖动字段的updateFields关联


            if (typeof uiSchemaContent['ui:options'].updateFields !== 'undefined') {
              indexInFields = _this5._getFieldIndex(afterDragFields, field.code);

              if (indexInFields > hoverIndex) {
                uiSchemaContent['ui:options'].updateFields.map(function (updateCode, updateIndex) {
                  if (updateCode === dragFieldcode) {
                    uiSchemaContent['ui:options'].updateFields.splice(updateIndex, 1);

                    if (uiSchemaContent['ui:options'].updateFields.length <= 0) {
                      delete uiSchemaContent['ui:options'].updateFields;
                    }
                  }
                });
              }
            }
          }
        }

        afterDragFields[index].uiSchema[field.code] = uiSchemaContent;
      });
      sortedFields = systemFields.concat(afterDragFields);
      this.props.updateFieldsHandler(sortedFields);
    } // 从fields列表中找出某code值的字段的序列

  }, {
    key: "_getFieldIndex",
    value: function _getFieldIndex(fields, code) {
      var resultIndex = 0;
      fields.map(function (field, index) {
        if (field.code === code) {
          resultIndex = index;
        }
      });
      return resultIndex;
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$props2 = this.props,
          globalConfig = _this$props2.globalConfig,
          platform = _this$props2.platform,
          fields = _this$props2.fields,
          messages = _this$props2.messages,
          locale = _this$props2.locale,
          supportFieldList = _this$props2.supportFieldList,
          registerWidgets = _this$props2.registerWidgets,
          customInterfaces = _this$props2.customInterfaces,
          customGateway = _this$props2.customGateway,
          customUploadRequest = _this$props2.customUploadRequest,
          onImagePreview = _this$props2.onImagePreview,
          editFieldData = _this$props2.editFieldData,
          systemFieldEditable = _this$props2.systemFieldEditable,
          emptyPlaceholder = _this$props2.emptyPlaceholder;
      var fold = this.state.fold;
      var editFieldCode = '';

      if (editFieldData !== null) {
        editFieldCode = editFieldData.code;
      }

      var configSchema = _index["default"].getDefaultConfig(messages, registerWidgets, supportFieldList);

      var configPlatform,
          fieldTypeLabel = '';
      var systemFields = [],
          otherFields = []; // 从fields中过滤出来系统字段部分（系统字段不能进行排序）

      systemFields = fields.filter(function (fieldData) {
        return fieldData.fieldType === 'system';
      });
      otherFields = fields.filter(function (fieldData) {
        return fieldData.fieldType !== 'system';
      });
      var newOtherFields = [];
      var hasGroupFields = otherFields.filter(function (item) {
        return item.type !== 'group' && item.type !== 'Table' && item.hasgroup;
      });
      otherFields.forEach(function (item) {
        if (item.type === 'group' || item.type === 'Table') {
          var groupFields = hasGroupFields.filter(function (v) {
            return v.hasgroup === item.code;
          });

          var field = _objectSpread(_objectSpread({}, item), {}, {
            children: groupFields
          });

          newOtherFields.push(field);
        } else {
          if (!item.hasgroup) {
            newOtherFields.push(item);
          }
        }
      });
      var sortId = -1;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "app-xform-builder-field-list-wrapper"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "inner-wrapper"
      }, systemFields.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          'system-preview-wrapper': true,
          fold: fold
        })
      }, /*#__PURE__*/_react["default"].createElement("p", {
        className: "template-title",
        onClick: this.handleFoldChange
      }, /*#__PURE__*/_react["default"].createElement("span", null, messages[(0, _localeMessages.getMessageId)('systemFieldFoldTitle')]), /*#__PURE__*/_react["default"].createElement("i", {
        className: "xform-iconfont expand-icon"
      }, "\uE610")), /*#__PURE__*/_react["default"].createElement("ul", {
        className: (0, _classnames["default"])({
          'preview-list': true,
          hidden: fold
        })
      }, systemFields.map(function (fieldData, index) {
        configPlatform = configSchema[fieldData.type] && configSchema[fieldData.type].platform || [];
        fieldTypeLabel = configSchema[fieldData.type] && configSchema[fieldData.type].label;
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: fieldData.code
        }, /*#__PURE__*/_react["default"].createElement(_option["default"], {
          globalConfig: globalConfig,
          draggable: false,
          index: index,
          platformSupport: fieldData.fieldType === 'system' || _util.util._isInConfigPlatform(configPlatform, platform),
          fieldTypeLabel: fieldTypeLabel,
          registerWidgets: registerWidgets,
          systemFieldEditable: systemFieldEditable,
          customInterfaces: customInterfaces,
          customGateway: customGateway,
          customUploadRequest: customUploadRequest,
          onImagePreview: onImagePreview,
          locale: locale,
          messages: messages,
          editFieldCode: editFieldCode,
          fieldData: fieldData,
          fieldListClickHandler: _this6.handleFieldListClick,
          deleteFieldHandler: _this6.handleDeleteField,
          fieldMoveHandler: _this6.handleFieldMove,
          addFieldHandler: _this6.handleAddField
        }));
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-body-preview-wrapper"
      }, function () {
        if (newOtherFields.length > 0) {
          return /*#__PURE__*/_react["default"].createElement("ul", {
            className: (0, _classnames["default"])({
              'preview-list': true
            })
          }, newOtherFields.map(function (fieldData, index) {
            configPlatform = configSchema[fieldData.type] && configSchema[fieldData.type].platform || [];
            fieldTypeLabel = configSchema[fieldData.type] && configSchema[fieldData.type].label;
            var itemWidth = fieldData.uiSchema[fieldData.code] && fieldData.uiSchema[fieldData.code]['ui:options'] && fieldData.uiSchema[fieldData.code]['ui:options'].itemwidth >= 0 ? fieldData.uiSchema[fieldData.code]['ui:options'].itemwidth : 100;
            sortId++;
            itemWidth = Number(itemWidth) > 0 ? itemWidth : 1;
            return /*#__PURE__*/_react["default"].createElement("div", {
              key: fieldData.code,
              style: {
                width: itemWidth + '%'
              },
              className: (0, _classnames["default"])({
                'preview-group-list': fieldData.type === 'group' || fieldData.type === 'Table'
              })
            }, (fieldData.type === 'group' || fieldData.type === 'Table') && Array.isArray(fieldData.children) ? /*#__PURE__*/_react["default"].createElement("div", {
              className: "group-list-item"
            }, /*#__PURE__*/_react["default"].createElement("div", {
              style: {
                width: itemWidth + '%'
              }
            }, /*#__PURE__*/_react["default"].createElement(_option["default"], {
              globalConfig: globalConfig,
              draggable: true,
              index: sortId,
              platformSupport: fieldData.fieldType === 'system' || _util.util._isInConfigPlatform(configPlatform, platform),
              fieldTypeLabel: fieldTypeLabel,
              registerWidgets: registerWidgets,
              systemFieldEditable: systemFieldEditable,
              customInterfaces: customInterfaces,
              customGateway: customGateway,
              customUploadRequest: customUploadRequest,
              onImagePreview: onImagePreview,
              locale: locale,
              messages: messages,
              editFieldCode: editFieldCode,
              fieldData: fieldData,
              fieldListClickHandler: _this6.handleFieldListClick,
              deleteFieldHandler: _this6.handleDeleteField,
              fieldMoveHandler: _this6.handleFieldMove,
              addFieldHandler: _this6.handleAddField
            })), fieldData.children.map(function (child, i) {
              configPlatform = configSchema[child.type] && configSchema[child.type].platform || [];
              fieldTypeLabel = configSchema[child.type] && configSchema[child.type].label;
              var childrenItemWidth = child.uiSchema[child.code] && child.uiSchema[child.code]['ui:options'] && child.uiSchema[child.code]['ui:options'].itemwidth >= 0 ? child.uiSchema[child.code]['ui:options'].itemwidth : 100;
              sortId++;
              var childrenStyle = Number(childrenItemWidth) > 0 ? childrenItemWidth : 1;
              return /*#__PURE__*/_react["default"].createElement("div", {
                key: child.code,
                style: {
                  width: childrenItemWidth + '%'
                }
              }, /*#__PURE__*/_react["default"].createElement(_option["default"], {
                globalConfig: globalConfig,
                draggable: true,
                index: sortId,
                platformSupport: child.fieldType === 'system' || _util.util._isInConfigPlatform(configPlatform, platform),
                fieldTypeLabel: fieldTypeLabel,
                registerWidgets: registerWidgets,
                systemFieldEditable: systemFieldEditable,
                customInterfaces: customInterfaces,
                customGateway: customGateway,
                customUploadRequest: customUploadRequest,
                onImagePreview: onImagePreview,
                locale: locale,
                messages: messages,
                editFieldCode: editFieldCode,
                fieldData: child,
                fieldListClickHandler: _this6.handleFieldListClick,
                deleteFieldHandler: _this6.handleDeleteField,
                fieldMoveHandler: _this6.handleFieldMove,
                addFieldHandler: _this6.handleAddField
              }));
            })) : /*#__PURE__*/_react["default"].createElement(_option["default"], {
              globalConfig: globalConfig,
              draggable: true,
              index: sortId,
              platformSupport: fieldData.fieldType === 'system' || _util.util._isInConfigPlatform(configPlatform, platform),
              fieldTypeLabel: fieldTypeLabel,
              registerWidgets: registerWidgets,
              systemFieldEditable: systemFieldEditable,
              customInterfaces: customInterfaces,
              customGateway: customGateway,
              customUploadRequest: customUploadRequest,
              onImagePreview: onImagePreview,
              locale: locale,
              messages: messages,
              editFieldCode: editFieldCode,
              fieldData: fieldData,
              fieldListClickHandler: _this6.handleFieldListClick,
              deleteFieldHandler: _this6.handleDeleteField,
              fieldMoveHandler: _this6.handleFieldMove,
              addFieldHandler: _this6.handleAddField
            }));
          }));
        } else {
          return emptyPlaceholder || /*#__PURE__*/_react["default"].createElement("div", {
            className: "empty-box"
          }, /*#__PURE__*/_react["default"].createElement(_icons.InboxOutlined, {
            className: "empty-icon"
          }), /*#__PURE__*/_react["default"].createElement("span", {
            className: "empty-tip"
          }, messages[(0, _localeMessages.getMessageId)('fieldConfigListEmptyTip')]));
        }
      }())));
    }
  }]);

  return FieldList;
}(_react.PureComponent);

exports["default"] = FieldList;

_defineProperty(FieldList, "propTypes", {
  globalConfig: _propTypes["default"].shape({
    codeEditable: _propTypes["default"].bool.isRequired,
    fieldPreviewable: _propTypes["default"].bool.isRequired
  }).isRequired,
  platform: _propTypes["default"].oneOf(['laptop', 'mobile', 'both']).isRequired,
  messages: _propTypes["default"].object.isRequired,
  emptyPlaceholder: _propTypes["default"].element,
  fields: _propTypes["default"].array.isRequired,
  changeEditFieldHandler: _propTypes["default"].func.isRequired,
  deleteEditFieldHandler: _propTypes["default"].func.isRequired,
  addFieldsHandler: _propTypes["default"].func.isRequired,
  updateFieldsHandler: _propTypes["default"].func.isRequired,
  updateFieldItemHandler: _propTypes["default"].func.isRequired,
  systemFieldEditable: _propTypes["default"].bool
});

_defineProperty(FieldList, "defaultProps", {
  systemFieldEditable: false
});