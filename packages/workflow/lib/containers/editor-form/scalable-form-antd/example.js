"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var Example = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Example, _React$PureComponent);

  var _super = _createSuper(Example);

  function Example(props) {
    var _this;

    _classCallCheck(this, Example);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleXformChange", function (formData, bizData) {
      console.log('Xform Changed!', formData);
      console.log('Xform Changed!', bizData); // 更新对象数据类型的state必须要使用对象的引用

      _this.setState({
        formData: _objectSpread({}, formData)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleXformSubmit", function (formData, bizData) {
      console.log('Xform Submitted!', formData);
      console.log('Xform Submitted!', bizData);
    });

    _defineProperty(_assertThisInitialized(_this), "handleBtnClick", function (type) {});

    _this.state = {
      formData: {
        "tasks": [{
          "done": false
        }],
        name: '这里有个初始值',
        bizName: '初始值',
        inputWithDataSource: '',
        dataSourceList: '',
        arriveDate: '',
        note: '真好啊',
        number: 10,
        isFavouriteCity: true,
        city: 'hangzhou',
        district: [],
        road: '',
        author: 'mohen'
      }
    };
    return _this;
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      var jsonSchema = {
        title: '这是一个labelType为inline类型的表单',
        description: '比较常用',
        originalButton: true,
        type: 'object',
        required: ['bizName', 'note', 'number', 'city', 'district', 'road'],
        properties: {
          "tasks": {
            "type": "array",
            "title": "Tasks",
            "items": {
              "type": "object",
              "required": ["title"],
              "properties": {
                "title": {
                  "type": "string",
                  "title": "Title",
                  "description": "A sample title"
                },
                "details": {
                  "type": "string",
                  "title": "Task details",
                  "description": "Enter the task details"
                },
                "done": {
                  "type": "boolean",
                  "title": "Done?",
                  "default": false
                }
              }
            }
          },
          object_1: {
            title: "对象",
            type: "object",
            properties: {
              firstName: {
                title: "姓",
                type: "string"
              },
              lastName: {
                "type": "string",
                "title": "单选",
                "default": "",
                "enum": ["Amx2yBFF6", "mpf2rNWAe", "kBS6AZrNe"],
                "enumNames": ["选项一", "选项二", "选项三"]
              }
            }
          },
          name: {
            type: 'string',
            title: '名称',
            "default": ''
          },
          // name: {
          //     type: 'array',
          //     title: '',
          //     items: {
          //         type: "object",
          //         title: "对象",
          //         properties: {
          //             firstName: {
          //               title: "姓",
          //               type: "string"
          //             },
          //             lastName: {
          //               title: "名",
          //               type: "string"
          //             },
          //           }
          //     }
          // },
          bizName: {
            type: 'string',
            title: '业务视图名称',
            "default": ''
          },
          inputWithDataSource: {
            type: 'string',
            title: '多行文本框',
            "default": ''
          },
          dataSourceList: {
            type: 'string',
            title: '数据源下拉框',
            dataSource: 'dataSourceList',
            "enum": [],
            enumNames: []
          },
          arriveDate: {
            type: 'string',
            title: '到达时间',
            "default": '',
            format: 'date-time'
          },
          note: {
            type: 'string',
            title: '备注（只读）',
            "default": '',
            maxLength: 150
          },
          number: {
            type: 'number',
            title: '个数（禁用）',
            "default": ''
          },
          isFavouriteCity: {
            type: 'boolean',
            title: '请问这是你喜欢的城市吗？',
            "default": false
          },
          city: {
            type: 'string',
            title: '请选择城市',
            "default": '',
            "enum": ['beijing', 'shanghai', 'hangzhou'],
            enumNames: ['北京', '上海', '杭州']
          },
          district: {
            type: 'array',
            title: '请选择城市的地区',
            items: {
              type: 'string',
              "default": '',
              "enum": ['haidian', 'chaoyang', 'chongwen'],
              enumNames: ['海淀', '朝阳', '崇文']
            },
            uniqueItems: true
          },
          road: {
            type: 'string',
            title: '请选择城市的街道',
            "default": '',
            "enum": ['wenyixiroad', 'jingchangroad'],
            enumNames: ['文一西路', '荆长路']
          },
          author: {
            type: 'string',
            title: '作者',
            "default": ''
          }
        } // additionalProperties: {
        //     type: "number",
        //     enum: [1, 2, 3]
        // }

      };
      var uiSchema = {
        "tasks": {
          "items": {
            "details": {
              "ui:widget": "textarea"
            }
          }
        },
        object_1: {
          "ui:options": {
            groupName: '我是分组'
          },
          "ui:widget": "group",
          firstName: {
            "ui:widget": "textarea"
          },
          lastName: {
            "ui:widget": "radio",
            "ui:options": {
              "vertical": false
            }
          }
        },
        name: {
          'ui:help': '啦啦啦',
          'ui:options': {
            placeholder: '请输入'
          }
        },
        bizName: {
          'ui:options': {
            placeholder: '请输入',
            validate: [{
              type: 'empty',
              message: '该字段不能为空'
            }, {
              type: 'server',
              checkUrl: '',
              message: "您输入的名称存在重复，请重新输入"
            }]
          }
        },
        inputWithDataSource: {
          'ui:widget': 'textarea',
          'ui:options': {
            placeholder: '请选择'
          }
        },
        dataSourceList: {
          'ui:widget': 'select',
          'ui:options': {
            placeholder: '请选择'
          }
        },
        arriveDate: {
          'ui:widget': 'datetime',
          'ui:options': {
            placeholder: '请选择到达时间',
            format: 'YYYY-MM-DD HH:mm:ss'
          }
        },
        note: {
          'ui:widget': 'textarea',
          'ui:readonly': true,
          'ui:options': {
            validate: [{
              type: 'empty',
              message: '备注不能为空'
            }]
          }
        },
        number: {
          'ui:widget': 'updown',
          'ui:disabled': true,
          'ui:options': {
            validate: [{
              type: 'empty',
              message: '该字段不能为空'
            }]
          }
        },
        city: {
          'ui:widget': 'radio',
          'ui:options': {
            vertical: false,
            validate: [{
              type: 'empty',
              message: '请选择'
            }]
          }
        },
        district: {
          'ui:widget': 'multiSelect',
          'ui:options': {
            vertical: false,
            validate: [{
              type: 'empty',
              message: '请至少选择一项'
            }],
            show: [{
              field: 'city',
              values: ['beijing', 'shanghai']
            }]
          }
        },
        road: {
          'ui:widget': 'select',
          'ui:placeholder': '请选择道路',
          'ui:options': {
            validate: [{
              type: 'empty',
              message: '请选择'
            }],
            show: [{
              field: 'city',
              values: ['hangzhou']
            }]
          }
        },
        author: {
          'ui:widget': 'hidden'
        }
      };
      var formData = this.state.formData;
      var bizData = {
        name: {
          fieldType: 'universal',
          canSearch: true
        },
        bizName: {
          fieldType: 'universal',
          canSearch: true
        },
        inputWithDataSource: {
          fieldType: 'universal',
          canSearch: false
        },
        dataSourceList: {
          fieldType: 'universal',
          canSearch: false
        },
        arriveDate: {
          fieldType: 'system',
          canSearch: true
        },
        note: {
          fieldType: 'system',
          canSearch: false
        },
        number: {
          fieldType: 'universal',
          canSearch: false
        },
        isFavouriteCity: {
          fieldType: 'system',
          canSearch: false
        },
        city: {
          fieldType: 'system',
          canSearch: false
        },
        district: {
          fieldType: 'universal',
          canSearch: true
        },
        road: {
          fieldType: 'custom',
          canSearch: false
        },
        author: {
          fieldType: 'system',
          canSearch: false
        }
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        id: "xform-root-element"
      }, /*#__PURE__*/_react["default"].createElement(_index["default"], {
        defaultSubmitButton: true,
        locale: "zh-cn",
        xtrackerCode: "xform-core-demo",
        popupContainer: function popupContainer() {
          return document.getElementById('xform-root-element');
        },
        alignType: "inline",
        labelAlign: "right",
        itemNumberInRow: 3,
        jsonSchema: jsonSchema,
        uiSchema: uiSchema,
        formData: formData,
        bizData: bizData,
        onChange: this.handleXformChange,
        onSubmit: this.handleXformSubmit,
        onBtnClick: this.handleBtnClick
      }));
    }
  }]);

  return Example;
}(_react["default"].PureComponent);

var _default = Example;
exports["default"] = _default;