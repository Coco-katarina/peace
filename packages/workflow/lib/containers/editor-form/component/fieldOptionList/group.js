"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

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

var GroupOperateDB = /*#__PURE__*/function (_PureComponent) {
  _inherits(GroupOperateDB, _PureComponent);

  var _super = _createSuper(GroupOperateDB);

  function GroupOperateDB() {
    var _this;

    _classCallCheck(this, GroupOperateDB);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "query", function (code) {
      _this.props.updateFields(code);
    });

    _defineProperty(_assertThisInitialized(_this), "delete", function (field, dispatch, del) {
      dispatch(del(field.code)).then(function (_) {
        if (_.type == 'GET_GROUPBOXS_SUCCESS') {
          _this.query(field.code);

          _antd.message.success('成功删除业务控件');
        } else {
          _antd.message.error('删除业务控件失败');
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "insertOrUpdate", function (field, dispatch, insertOrUpdate, user, commonFields) {
      var currentGroupName = field.uiSchema[field.code]['items'] ? field.uiSchema[field.code]['items']['ui:options'].groupName : field.uiSchema[field.code]['ui:options'].groupName;
      var repatGroupName = false;
      commonFields.forEach(function (x) {
        if (x.code != field.code) {
          var parent = x.uiSchema[x.code]['ui:options'] ? x.uiSchema[x.code]['ui:options'] : x.uiSchema[x.code]['items']['ui:options'];
          repatGroupName = parent.groupName == currentGroupName ? true : false;
        }
      });

      if (currentGroupName == '') {
        _antd.message.error('请输入分组标题');
      } else if (repatGroupName) {
        _antd.message.error('分组标题重复');
      } else {
        dispatch(insertOrUpdate(user.orgOwner, user.id, field)).then(function (_) {
          if (_.type == 'GET_GROUPBOXS_SUCCESS') {
            _this.query();

            _antd.message.success('成功保存业务控件');
          } else {
            _antd.message.error('保存业务控件失败');
          }
        });
      }
    });

    return _this;
  }

  _createClass(GroupOperateDB, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          fields = _this$props.fields,
          editFieldData = _this$props.editFieldData,
          dispatch = _this$props.dispatch,
          operateDBGroup = _this$props.operateDBGroup,
          user = _this$props.user,
          commonFields = _this$props.commonFields;
      var filter = fields.filter(function (x) {
        return x.code == editFieldData.code;
      });
      var currentGroup = {};

      if (filter.length > 0) {
        currentGroup = filter[0];
        currentGroup.children = [];
        var currentGroupChildren = [];
        fields.forEach(function (field) {
          if (field.hasgroup && field.hasgroup == currentGroup.code) {
            currentGroupChildren.push(field);
          }
        });
        currentGroup.children = currentGroupChildren;
      }

      return /*#__PURE__*/_react["default"].createElement(_antd.Row, {
        type: "flex",
        justify: "space-around"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        type: "primary",
        onClick: function onClick() {
          return _this2.insertOrUpdate(currentGroup, dispatch, operateDBGroup.insertOrUpdate, user, commonFields);
        }
      }, "\u4FDD\u5B58"), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        type: "primary",
        danger: true,
        onClick: function onClick() {
          return _this2["delete"](currentGroup, dispatch, operateDBGroup.del);
        }
      }, "\u5220\u9664"));
    }
  }]);

  return GroupOperateDB;
}(_react.PureComponent);

var _default = GroupOperateDB;
exports["default"] = _default;