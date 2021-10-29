"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _icons = require("@ant-design/icons");

var _reactRedux = require("react-redux");

var _reactRouterRedux = require("react-router-redux");

var _utils = require("@peace/utils");

var _$utils = require("$utils");

var _$components = require("$components");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

// import * as T from '../../approval/constants';
var TabPane = _antd.Tabs.TabPane; // import ProcessForm from '../../containers/process_form/index'

var schema = {
  "jsonSchema": {
    "title": "",
    "description": "",
    "type": "object",
    "required": [],
    "properties": {
      "xaBJJBmNk7": {
        "type": "string",
        "title": "段落",
        "default": ""
      },
      "W8dc788z5Y": {
        "type": "string",
        "title": "富文本框",
        "default": ""
      },
      "sFXYMzmC6D": {
        "type": "string",
        "title": "单选",
        "default": "",
        "enum": ["mFaYZtXBr", "Tt2r8TGxZ", "jNwB5sK3N"],
        "enumNames": ["选项一", "选项二", "选项三"]
      },
      "aK3FTWsXxC": {
        "type": "object",
        "title": "分组",
        "default": [],
        "properties": {},
        "required": []
      }
    }
  },
  "uiSchema": {
    "xaBJJBmNk7": {
      "ui:widget": "label"
    },
    "W8dc788z5Y": {
      "ui:widget": "richtext",
      "ui:options": {
        "placeholder": "请输入"
      }
    },
    "sFXYMzmC6D": {
      "ui:widget": "radio",
      "ui:options": {
        "vertical": false
      }
    },
    "aK3FTWsXxC": {
      "ui:widget": "group",
      "ui:options": {
        "groupName": "分组标题",
        "showGroupTitle": true
      },
      "nhN8yn52Mk": {
        "ui:widget": "richtext",
        "ui:options": {
          "placeholder": "请输入"
        },
        "ui:placeholder": "",
        "ui:help": ""
      }
    }
  },
  "formData": {
    "xaBJJBmNk7": "<p>普通文本默认值</p>",
    "W8dc788z5Y": "",
    "sFXYMzmC6D": "",
    "aK3FTWsXxC": {}
  },
  "bizData": {
    "xaBJJBmNk7": {
      "type": "label",
      "fieldType": "custom"
    },
    "W8dc788z5Y": {
      "type": "richtext",
      "fieldType": "custom"
    },
    "sFXYMzmC6D": {
      "options": {
        "mFaYZtXBr": {
          "name": "选项一",
          "code": "mFaYZtXBr"
        },
        "Tt2r8TGxZ": {
          "name": "选项二",
          "code": "Tt2r8TGxZ"
        },
        "jNwB5sK3N": {
          "name": "选项三",
          "code": "jNwB5sK3N"
        }
      },
      "type": "radio",
      "fieldType": "custom"
    },
    "aK3FTWsXxC": {
      "type": "group",
      "fieldType": "custom"
    }
  },
  "sequence": ["xaBJJBmNk7", "W8dc788z5Y", "sFXYMzmC6D", "aK3FTWsXxC"]
};

var ProcinstInfo = /*#__PURE__*/function (_Component) {
  _inherits(ProcinstInfo, _Component);

  var _super = _createSuper(ProcinstInfo);

  function ProcinstInfo(props) {
    var _this2$state;

    var _this2;

    _classCallCheck(this, ProcinstInfo);

    _this2 = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this2), "getFlowRecord", function (id) {
      var getFlowRecordData = _this2.approvalActions.getFlowRecordData;
      var dispatch = _this2.props.dispatch;
      dispatch(getFlowRecordData(id));
    });

    _defineProperty(_assertThisInitialized(_this2), "onPageChange", function (e) {
      _this2.setState({
        actiPage: e
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "handFormSubmit", function (url, formValues, listShowItems) {
      _antd.message.error('查看详情无法执行提交操作!');
    });

    _defineProperty(_assertThisInitialized(_this2), "handFormCancel", function () {
      _this2.handerback();
    });

    _defineProperty(_assertThisInitialized(_this2), "handerback", function () {
      var backedTapKey = _this2.state.backedTapKey;
      var state = {
        backedTapKey: backedTapKey
      };

      _this2.props.dispatch((0, _reactRouterRedux.push)({
        pathname: "/processCheck",
        state: state
      }));
    });

    _defineProperty(_assertThisInitialized(_this2), "handPopView", function (options) {});

    _this2.state = (_this2$state = {
      actiPage: 1,
      isRequesting: true,
      formSchema: null
    }, _defineProperty(_this2$state, "formSchema", {
      "jsonSchema": {
        "title": "",
        "description": "",
        "type": "object",
        "required": [],
        "properties": {
          "xaBJJBmNk7": {
            "type": "string",
            "title": "段落",
            "default": ""
          },
          "W8dc788z5Y": {
            "type": "string",
            "title": "富文本框",
            "default": ""
          },
          "sFXYMzmC6D": {
            "type": "string",
            "title": "单选",
            "default": "",
            "enum": ["mFaYZtXBr", "Tt2r8TGxZ", "jNwB5sK3N"],
            "enumNames": ["选项一", "选项二", "选项三"]
          },
          "aK3FTWsXxC": {
            "type": "object",
            "title": "分组",
            "default": [],
            "properties": {},
            "required": []
          }
        }
      },
      "uiSchema": {
        "xaBJJBmNk7": {
          "ui:widget": "label"
        },
        "W8dc788z5Y": {
          "ui:widget": "richtext",
          "ui:options": {
            "placeholder": "请输入"
          }
        },
        "sFXYMzmC6D": {
          "ui:widget": "radio",
          "ui:options": {
            "vertical": false
          }
        },
        "aK3FTWsXxC": {
          "ui:widget": "group",
          "ui:options": {
            "groupName": "分组标题",
            "showGroupTitle": true
          },
          "nhN8yn52Mk": {
            "ui:widget": "richtext",
            "ui:options": {
              "placeholder": "请输入"
            },
            "ui:placeholder": "",
            "ui:help": ""
          }
        }
      },
      "formData": {
        "xaBJJBmNk7": "<p>普通文本默认值</p>",
        "W8dc788z5Y": "",
        "sFXYMzmC6D": "",
        "aK3FTWsXxC": {}
      },
      "bizData": {
        "xaBJJBmNk7": {
          "type": "label",
          "fieldType": "custom"
        },
        "W8dc788z5Y": {
          "type": "richtext",
          "fieldType": "custom"
        },
        "sFXYMzmC6D": {
          "options": {
            "mFaYZtXBr": {
              "name": "选项一",
              "code": "mFaYZtXBr"
            },
            "Tt2r8TGxZ": {
              "name": "选项二",
              "code": "Tt2r8TGxZ"
            },
            "jNwB5sK3N": {
              "name": "选项三",
              "code": "jNwB5sK3N"
            }
          },
          "type": "radio",
          "fieldType": "custom"
        },
        "aK3FTWsXxC": {
          "type": "group",
          "fieldType": "custom"
        }
      },
      "sequence": ["xaBJJBmNk7", "W8dc788z5Y", "sFXYMzmC6D", "aK3FTWsXxC"]
    }), _defineProperty(_this2$state, "currentNode", null), _defineProperty(_this2$state, "popCode", null), _defineProperty(_this2$state, "expressionVar", ''), _defineProperty(_this2$state, "titleName", null), _defineProperty(_this2$state, "backedTapKey", null), _defineProperty(_this2$state, "tabName", ''), _this2$state);
    _this2.approvalActions = {}; // props.actions.approval.approval;

    return _this2;
  }

  _createClass(ProcinstInfo, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var info = this.props.location.state || {};
      var dispatch = this.props.dispatch;

      var _this = this;

      var getProcVersionForm = this.approvalActions.getProcVersionForm;

      if (1 || info && info.processInstanceId && info.versionId) {
        // this.getFlowRecord(info.processInstanceId);
        // dispatch(getProcVersionForm(info.versionId)).then(action => {
        //     const { type, payload } = action;
        //     if (type === T.GetVersionForm.REQUEST_ERROR) {
        //         message.error(payload.error);
        //     } else if (type === T.GetVersionForm.REQUEST_SUCCESS) {
        //         let formSchema = Object.assign({}, payload.data.formSchema);
        //         if (formSchema.formData && info.formData) {
        //             formSchema.formData = Object.assign({}, info.formData);
        //         }
        //         let params = [
        //             {
        //                 path: 'seal/list?mine=true',
        //                 param: `history=true`
        //             }, {
        //                 path: 'seal/list',
        //                 param: `history=true`
        //             }
        //         ];
        // buildFormSchemaByDataSourceUrl(formSchema, Request, params).then(formSchema => {
        //     _this.setState({
        //         titleName: info.titleName || null,
        //         backedTapKey: info.backedTapKey || null,
        //         formSchema,
        //         isRequesting: false,
        //     })
        //         }).catch(err => {
        //             message.error('获取表单数据源失败，请重试!');
        //         })
        //     }
        // });
        (0, _$utils.buildFormSchemaByDataSourceUrl)(schema, _utils.Request, [], 'all').then(function (formSchema) {
          console.log(formSchema);

          _this.setState({
            // formSchema,
            isRequesting: false
          });
        })["catch"](function (err) {
          console.log(err);

          _antd.message.error('获取表单数据源失败，请重试!');
        });
      } else {
        _this.setState({
          isRequesting: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var flowRecord = this.props.flowRecord;
      var _this$state = this.state,
          formSchema = _this$state.formSchema,
          actiPage = _this$state.actiPage,
          titleName = _this$state.titleName,
          tabName = _this$state.tabName;
      var flowRecordProps = {
        flowRecord: flowRecord && flowRecord.data && flowRecord.data.length > 0 ? flowRecord.data : [],
        actiPage: actiPage,
        onPageChange: this.onPageChange
      }; // console.log(flowRecordProps)

      var extFormSchema = Object.assign({}, _$utils.Constans.sealUseExtFormSchema);
      console.log(formSchema);
      return /*#__PURE__*/_react["default"].createElement(_antd.Spin, {
        spinning: this.state.isRequesting
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        type: "primary",
        icon: /*#__PURE__*/_react["default"].createElement(_icons.LeftOutlined, null),
        onClick: this.handerback
      }, "\u8FD4\u56DE".concat(titleName || '')), /*#__PURE__*/_react["default"].createElement(_antd.Tabs, {
        defaultActiveKey: "audit",
        size: "large"
      }, /*#__PURE__*/_react["default"].createElement(TabPane, {
        tab: tabName + '信息',
        key: "audit"
      }, formSchema ? /*#__PURE__*/_react["default"].createElement(_$components.ProcessForm, {
        formSchema: formSchema,
        extFormSchema: extFormSchema,
        extType: "frist",
        currentNode: _$utils.Constans.addNodesId.history,
        onFormSubmit: this.handFormSubmit,
        onCancel: this.handFormCancel,
        onPopView: this.handPopView
      }) : !this.state.isRequesting && /*#__PURE__*/_react["default"].createElement(_$components.NoResource, {
        title: "\u672A\u67E5\u8BE2\u5230\u8BE5\u6D41\u7A0B\u7684\u8868\u5355"
      })), /*#__PURE__*/_react["default"].createElement(TabPane, {
        tab: "\u6D41\u7A0B\u8BB0\u5F55",
        key: "record"
      }, /*#__PURE__*/_react["default"].createElement(_$components.FlowRecordTable, flowRecordProps))));
    }
  }]);

  return ProcinstInfo;
}(_react.Component);

function mapStateToProps(state) {
  var auth = state.auth,
      global = state.global,
      flowRecord = state.flowRecord;
  return {
    theme: global.theme,
    actions: global.actions,
    flowRecord: [],
    // flowRecord.data,
    clientHeight: global.clientHeight,
    clientWidth: global.clientWidth,
    user: auth.user
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps)(ProcinstInfo);

exports["default"] = _default;