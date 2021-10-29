'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _icons = require("@ant-design/icons");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Option = _antd.Select.Option;

var ConditionExpressionModal = function ConditionExpressionModal(_ref) {
  var props = _extends({}, _ref);

  var saveBpmnJson = props.saveBpmnJson,
      bpmnJson = props.bpmnJson,
      curElementId = props.curElementId,
      procinstVars = props.procinstVars;
  bpmnJson[curElementId] = bpmnJson[curElementId] || {};
  var _bpmnJson$curElementI = bpmnJson[curElementId],
      _bpmnJson$curElementI2 = _bpmnJson$curElementI.expressType,
      expressType = _bpmnJson$curElementI2 === void 0 ? 'pass' : _bpmnJson$curElementI2,
      _bpmnJson$curElementI3 = _bpmnJson$curElementI.expressCondition,
      expressCondition = _bpmnJson$curElementI3 === void 0 ? [] : _bpmnJson$curElementI3,
      _bpmnJson$curElementI4 = _bpmnJson$curElementI.expressName,
      expressName = _bpmnJson$curElementI4 === void 0 ? '' : _bpmnJson$curElementI4; //console.log(bpmnJson,curElementId)

  if (expressCondition.length == 0) {
    expressCondition = [];
    expressCondition.push({
      logical: undefined,
      procinstVar: undefined,
      operator: undefined,
      conditionValue: ''
    });
    bpmnJson[curElementId].expressCondition = expressCondition;
  }

  var handleAddExpress = function handleAddExpress() {
    if (expressCondition.length > 5) {
      _antd.message.info('最多支持6个条件');

      return;
    }

    expressCondition.push({
      logical: undefined,
      procinstVar: undefined,
      operator: undefined,
      conditionValue: ''
    });
    bpmnJson[curElementId].expressCondition = expressCondition;
    saveBpmnJson(bpmnJson);
  };

  var handleDeleteExpress = function handleDeleteExpress(index) {
    var newExpressCondition = expressCondition.filter(function (v, i) {
      return i !== index;
    });
    bpmnJson[curElementId].expressCondition = newExpressCondition;
    saveBpmnJson(bpmnJson);
  };

  var handleProcinstVarChange = function handleProcinstVarChange(value, index) {
    bpmnJson[curElementId].expressCondition[index].procinstVar = value;
    saveBpmnJson(bpmnJson);
  };

  var handleOperatorChange = function handleOperatorChange(value, index) {
    bpmnJson[curElementId].expressCondition[index].operator = value;
    saveBpmnJson(bpmnJson);
  };

  var handleConditionValueChange = function handleConditionValueChange(value, index) {
    bpmnJson[curElementId].expressCondition[index].conditionValue = value;
    saveBpmnJson(bpmnJson);
  };

  var handleLogicalChange = function handleLogicalChange(value, index) {
    bpmnJson[curElementId].expressCondition[index].logical = value;
    saveBpmnJson(bpmnJson);
  };

  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_antd.Row, {
    gutter: 16,
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Col, {
    span: 24
  }, /*#__PURE__*/_react["default"].createElement(_antd.Space, null, "\u6761\u4EF6\u540D\u79F0:", /*#__PURE__*/_react["default"].createElement(_antd.Input, {
    allowClear: true,
    value: expressName,
    onChange: function onChange(_ref2) {
      var value = _ref2.target.value;
      bpmnJson[curElementId].expressName = value;
      saveBpmnJson(bpmnJson);
    }
  })))), /*#__PURE__*/_react["default"].createElement(_antd.Row, {
    gutter: 16,
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Col, {
    span: 24
  }, "\u6761\u4EF6\u9009\u62E9: ", /*#__PURE__*/_react["default"].createElement(_antd.Radio.Group, {
    onChange: function onChange(_ref3) {
      var value = _ref3.target.value;
      bpmnJson[curElementId].expressType = value;
      saveBpmnJson(bpmnJson);
    },
    value: expressType
  }, /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
    value: "pass"
  }, "\u662F"), /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
    value: "reject"
  }, "\u5426"), /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
    value: "custom"
  }, "\u81EA\u5B9A\u4E49\u6761\u4EF6")))), expressType === 'custom' && /*#__PURE__*/_react["default"].createElement(_antd.Row, {
    gutter: 16,
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Col, {
    span: 16
  }, expressCondition.map(function (v, index) {
    return /*#__PURE__*/_react["default"].createElement(_antd.Row, {
      key: index,
      gutter: 16,
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/_react["default"].createElement(_antd.Col, {
      span: 24
    }, /*#__PURE__*/_react["default"].createElement(_antd.Space, null, index > 0 && /*#__PURE__*/_react["default"].createElement(_antd.Select, {
      value: v.logical,
      placeholder: "\u9009\u62E9\u6761\u4EF6\u903B\u8F91",
      style: {
        width: 150
      },
      onChange: function onChange(value) {
        handleLogicalChange(value, index);
      }
    }, /*#__PURE__*/_react["default"].createElement(Option, {
      value: "and"
    }, "\u5E76\u4E14"), /*#__PURE__*/_react["default"].createElement(Option, {
      value: "or"
    }, "\u6216\u8005")), procinstVars.length > 0 && /*#__PURE__*/_react["default"].createElement(_antd.Select, {
      value: v.procinstVar,
      placeholder: "\u9009\u62E9\u6D41\u7A0B\u53D8\u91CF",
      style: {
        width: 150
      },
      onChange: function onChange(value) {
        handleProcinstVarChange(value, index);
      }
    }, procinstVars.map(function (p) {
      return /*#__PURE__*/_react["default"].createElement(Option, {
        key: p.code,
        value: p.code
      }, p.name);
    })), procinstVars.length > 0 && /*#__PURE__*/_react["default"].createElement(_antd.Select, {
      placeholder: "\u9009\u62E9\u8FD0\u7B97\u7B26",
      value: v.operator,
      style: {
        width: 150
      },
      onChange: function onChange(value) {
        handleOperatorChange(value, index);
      }
    }, /*#__PURE__*/_react["default"].createElement(Option, {
      value: "=="
    }, "\u7B49\u4E8E"), /*#__PURE__*/_react["default"].createElement(Option, {
      value: "!="
    }, "\u4E0D\u7B49\u4E8E"), /*#__PURE__*/_react["default"].createElement(Option, {
      value: ">"
    }, "\u5927\u4E8E"), /*#__PURE__*/_react["default"].createElement(Option, {
      value: ">="
    }, "\u5927\u4E8E\u7B49\u4E8E"), /*#__PURE__*/_react["default"].createElement(Option, {
      value: "<"
    }, "\u5C0F\u4E8E"), /*#__PURE__*/_react["default"].createElement(Option, {
      value: "<="
    }, "\u5C0F\u4E8E\u7B49\u4E8E")), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
      allowClear: true,
      value: v.conditionValue,
      onChange: function onChange(_ref4) {
        var value = _ref4.target.value;
        handleConditionValueChange(value, index);
      }
    }), index > 0 && /*#__PURE__*/_react["default"].createElement(_antd.Button, {
      style: {
        marginLeft: 10
      },
      shape: "circle",
      onClick: function onClick() {
        handleDeleteExpress(index);
      },
      icon: /*#__PURE__*/_react["default"].createElement(_icons.CloseOutlined, null)
    }))));
  })), /*#__PURE__*/_react["default"].createElement(_antd.Col, {
    span: 2
  }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
    style: {
      marginLeft: 10
    },
    shape: "circle",
    onClick: handleAddExpress,
    icon: /*#__PURE__*/_react["default"].createElement(_icons.PlusOutlined, null)
  }))));
};

var _default = ConditionExpressionModal;
exports["default"] = _default;