"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antdMobile = require("antd-mobile");

var _utils = require("@peace/utils");

var _$utils = require("$utils");

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

// import XFormMobile from '../scalable-form-antd/index';
var INIT_FORMDATA = {
  arriveDate: '',
  arriveDateTime: '',
  arriveDateRange: ['2019-11-01', '2019-11-15'],
  arrivedCities: ['hangzhou', 'beijing'],
  bizName: '初始值',
  note: '真好啊',
  number: 6,
  disabledNumber: 6,
  label: '这里是分割线(标题可以为空)',
  bizType: '',
  isFavouriteCity: true,
  city: 'hangzhou',
  district: [],
  road: '',
  blame: 'y',
  travel: '',
  group: '',
  author: 'mohen',
  uploader: [{
    uid: -1,
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  }, {
    uid: -2,
    name: 'yyy.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  }],
  open: true,
  slderNumber: 6,
  sliderNumberRange: [],
  cascader: []
};

var Example = /*#__PURE__*/function (_PureComponent) {
  _inherits(Example, _PureComponent);

  var _super = _createSuper(Example);

  function Example(args) {
    var _this;

    _classCallCheck(this, Example);

    _this = _super.call(this, args);
    _this.handleXformChange = _this.handleXformChange.bind(_assertThisInitialized(_this));
    _this.handleXformSubmit = _this.handleXformSubmit.bind(_assertThisInitialized(_this));
    _this.handleSetFormDisabled = _this.handleSetFormDisabled.bind(_assertThisInitialized(_this));
    _this.handleSetFormReadonly = _this.handleSetFormReadonly.bind(_assertThisInitialized(_this));
    _this.handleResetTrigger = _this.handleResetTrigger.bind(_assertThisInitialized(_this));
    _this.simpleForm = null;
    _this.form = null;
    _this.state = {
      isAllFieldsDisabled: false,
      isAllFieldsReadonly: false,
      formData: INIT_FORMDATA
    };
    return _this;
  }

  _createClass(Example, [{
    key: "handleXformChange",
    value: function handleXformChange(formData, bizData) {
      console.log('XForm Changed!', formData);
      console.log('XForm Changed!', bizData);
    }
  }, {
    key: "handleXformSubmit",
    value: function handleXformSubmit(formData, bizData) {
      console.log('XForm Submitted!', formData);
      console.log('XForm Submitted!', bizData);
    } //toggle设置表单的全部项目为禁用

  }, {
    key: "handleSetFormDisabled",
    value: function handleSetFormDisabled() {
      var isDisabled = this.state.isAllFieldsDisabled;
      this.setState({
        isAllFieldsDisabled: !isDisabled
      });
    } //toggle设置表单全部项目为只读

  }, {
    key: "handleSetFormReadonly",
    value: function handleSetFormReadonly() {
      var isReadonly = this.state.isAllFieldsReadonly;
      this.setState({
        isAllFieldsReadonly: !isReadonly
      });
    } //重置

  }, {
    key: "handleResetTrigger",
    value: function handleResetTrigger() {
      this.form.XFormReset();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // let formSchema = {
      //     jsonSchema: {
      //         title: '这是表单的标题',
      //         description: '这是表单的描述，无线端放在footer的位置',
      //         type: 'object',
      //         required: ['bizName', 'number', 'city', 'district', 'road', 'uploader'],
      //         properties: {
      //             arriveDate: {
      //                 type: 'string',
      //                 title: '到达日期',
      //                 format: 'date',
      //                 default: ''
      //             },
      //             arriveDateTime: {
      //                 type: 'string',
      //                 title: '到达时间',
      //                 format: 'date-time',
      //                 default: ''
      //             },
      //             arriveDateRange: {
      //                 type: 'array',
      //                 title: '到达的日期区间',
      //                 items: {
      //                     type: 'string',
      //                     default: '',
      //                     enum: [],
      //                     enumNames: []
      //                 },
      //                 uniqueItems: true
      //             },
      //             arrivedCities: {
      //                 type: 'array',
      //                 title: '去过的城市',
      //                 items: {
      //                     type: 'string',
      //                     default: '',
      //                     enum: ['beijing', 'changchun', 'hangzhou', 'langfang'],
      //                     enumNames: ['北京', '长春', '杭州', '廊坊']
      //                 },
      //                 uniqueItems: true
      //             },
      //             bizName: {
      //                 type: 'string',
      //                 title: '业务视图名称再长点',
      //                 maxLength: 15,
      //                 default: ''
      //             },
      //             note: {
      //                 type: 'string',
      //                 title: '备注',
      //                 maxLength: 150,
      //                 default: ''
      //             },
      //             number: {
      //                 type: 'number',
      //                 title: '个数',
      //                 default: ''
      //             },
      //             disabledNumber: {
      //                 type: 'number',
      //                 title: '禁用的数字输入',
      //                 default: ''
      //             },
      //             label: {
      //                 type: 'string',
      //                 title: '文本标签',
      //                 default: ''
      //             },
      //             bizType: {
      //                 type: 'string',
      //                 title: '业务类型',
      //                 default: '',
      //                 data: [{
      //                     "value": "22392",
      //                     "label": "五道口RF枪",
      //                     "children": []
      //                 },
      //                     {
      //                         "value": "12403",
      //                         "label": "评价外呼",
      //                         "children": []
      //                     },
      //                     {
      //                         "value": "9318",
      //                         "label": "线下拉铃类目",
      //                         "children": [{
      //                             "parent": "9318",
      //                             "value": "17411",
      //                             "label": "我要吐槽",
      //                             "children": [{
      //                                 "parent": "17411",
      //                                 "value": "17412",
      //                                 "label": "其他",
      //                                 "children": []
      //                             }]
      //                         },
      //                             {
      //                                 "parent": "9318",
      //                                 "value": "9319",
      //                                 "label": "系统问题咨询",
      //                                 "children": [{
      //                                     "parent": "9319",
      //                                     "value": "9325",
      //                                     "label": "设备问题",
      //                                     "children": []
      //                                 }]
      //                             }]
      //                     },
      //                     {
      //                         "value": "5892",
      //                         "label": "盒马业务",
      //                         "children": [{
      //                             "parent": "5892",
      //                             "value": "9676",
      //                             "label": "盒马逆向交易",
      //                             "children": []
      //                         },
      //                             {
      //                                 "parent": "5892",
      //                                 "value": "23624",
      //                                 "label": "315媒体来电",
      //                                 "children": []
      //                             },
      //                             {
      //                                 "parent": "5892",
      //                                 "value": "11535",
      //                                 "label": "盒马缺货出发放优惠券",
      //                                 "children": []
      //                             },
      //                             {
      //                                 "parent": "5892",
      //                                 "value": "18265",
      //                                 "label": "门店投诉",
      //                                 "children": [{
      //                                     "parent": "18265",
      //                                     "value": "18273",
      //                                     "label": "优惠券补偿未到账",
      //                                     "children": []
      //                                 }]
      //                             },
      //                             {
      //                                 "parent": "5892",
      //                                 "value": "6975",
      //                                 "label": "盒马外呼调研专用",
      //                                 "children": []
      //                             },
      //                             {
      //                                 "parent": "5892",
      //                                 "value": "18288",
      //                                 "label": "投诉表扬建议",
      //                                 "children": [{
      //                                     "parent": "18288",
      //                                     "value": "18294",
      //                                     "label": "投诉表扬",
      //                                     "children": [{
      //                                         "parent": "18294",
      //                                         "value": "18303",
      //                                         "label": "表扬",
      //                                         "children": []
      //                                     },
      //                                         {
      //                                             "parent": "18294",
      //                                             "value": "18302",
      //                                             "label": "人员投诉",
      //                                             "children": []
      //                                         }
      //                                     ]
      //                                 }]
      //                             },
      //                             {
      //                                 "parent": "5892",
      //                                 "value": "18268",
      //                                 "label": "账户/bug类问题",
      //                                 "children": []
      //                             },
      //                             {
      //                                 "parent": "5892",
      //                                 "value": "5893",
      //                                 "label": "生鲜",
      //                                 "children": [{
      //                                     "parent": "5893",
      //                                     "value": "6237",
      //                                     "label": "售中咨询",
      //                                     "children": []
      //                                 },
      //                                     {
      //                                         "parent": "5893",
      //                                         "value": "6239",
      //                                         "label": "售后咨询",
      //                                         "children": [{
      //                                             "parent": "6239",
      //                                             "value": "18230",
      //                                             "label": "发票问题",
      //                                             "children": []
      //                                         }]
      //                                     },
      //                                     {
      //                                         "parent": "5893",
      //                                         "value": "6238",
      //                                         "label": "商品投诉",
      //                                         "children": [{
      //                                             "parent": "6238",
      //                                             "value": "6266",
      //                                             "label": "临近保质期",
      //                                             "children": []
      //                                         },
      //                                             {
      //                                                 "parent": "6238",
      //                                                 "value": "6247",
      //                                                 "label": "食品安全",
      //                                                 "children": []
      //                                             }
      //                                         ]
      //                                     },
      //                                     {
      //                                         "parent": "5893",
      //                                         "value": "5894",
      //                                         "label": "物流投诉",
      //                                         "children": []
      //                                     }]
      //                             },
      //                             {
      //                                 "parent": "5892",
      //                                 "value": "12873",
      //                                 "label": "评价外呼专用",
      //                                 "children": []
      //                             },
      //                             {
      //                                 "parent": "5892",
      //                                 "value": "16847",
      //                                 "label": "业务投诉升级工单",
      //                                 "children": []
      //                             },
      //                             {
      //                                 "parent": "5892",
      //                                 "value": "7155",
      //                                 "label": "B2C业务",
      //                                 "children": [{
      //                                     "parent": "7155",
      //                                     "value": "7157",
      //                                     "label": "商品投诉",
      //                                     "children": [{
      //                                         "parent": "7157",
      //                                         "value": "7161",
      //                                         "label": "临近保质期",
      //                                         "children": []
      //                                     }]
      //                                 },
      //                                     {
      //                                         "parent": "7155",
      //                                         "value": "7164",
      //                                         "label": "物流投诉",
      //                                         "children": [{
      //                                             "parent": "7164",
      //                                             "value": "7171",
      //                                             "label": "物流损",
      //                                             "children": []
      //                                         },
      //                                             {
      //                                                 "parent": "7164",
      //                                                 "value": "7165",
      //                                                 "label": "虚假签收",
      //                                                 "children": []
      //                                             },
      //                                             {
      //                                                 "parent": "7164",
      //                                                 "value": "18264",
      //                                                 "label": "超出配送范围",
      //                                                 "children": []
      //                                             }
      //                                         ]
      //                                     }]
      //                             },
      //                             {
      //                                 "parent": "5892",
      //                                 "value": "22074",
      //                                 "label": "盒马评价运营",
      //                                 "children": []
      //                             }
      //                         ]},
      //                     {
      //                         "value": "23607",
      //                         "label": "古河edge测试类目，别用",
      //                         "children": []
      //                     },
      //                     {
      //                         "value": "9067",
      //                         "label": "门店客服技能组使用",
      //                         "children": [{
      //                             "parent": "9067",
      //                             "value": "9106",
      //                             "label": "舆情",
      //                             "children": [{
      //                                 "parent": "9106",
      //                                 "value": "9107",
      //                                 "label": "上海金桥店",
      //                                 "children": []
      //                             }]
      //                         }]
      //                     }
      //                 ]},
      //             isFavouriteCity: {
      //                 type: 'boolean',
      //                 title: '这是你喜欢的城市吗？',
      //                 default: false
      //             },
      //             city: {
      //                 type: 'string',
      //                 title: '请选择城市',
      //                 enum: ['beijing', 'shanghai', 'hangzhou'],
      //                 enumNames: ['北京', '上海', '杭州'],
      //                 default: ''
      //             },
      //             district: {
      //                 type: 'array',
      //                 title: '请选择城市的地区',
      //                 items: {
      //                     type: 'string',
      //                     enum: ['haidian', 'chaoyang', 'chongwen'],
      //                     enumNames: ['海淀', '朝阳', '崇文'],
      //                     default: ''
      //                 },
      //                 uniqueItems: true
      //             },
      //             road: {
      //                 type: 'string',
      //                 title: '请选择城市的街道',
      //                 default: '',
      //                 enum: ['wenyixiroad', 'jingchangroad'],
      //                 enumNames: ['文一西路', '荆长路']
      //             },
      //             blame: {
      //                 type: 'string',
      //                 title: '是否该受到谴责',
      //                 default: '',
      //                 enum: ['y', 'n'],
      //                 enumNames: ['是', '否']
      //             },
      //             travel: {
      //                 type: 'string',
      //                 title: '遇到的旅行中的问题',
      //                 default: '',
      //                 data: [{
      //                     "label": "商旅订单问题",
      //                     "value": "travel",
      //                     "children": [{
      //                         "label": "机票订单",
      //                         "value": "travel-plane",
      //                         "parent": "travel"
      //                     }, {
      //                         "label": "火车票订单",
      //                         "value": "travel-train",
      //                         "parent": "travel"
      //                     }]
      //                 }, {
      //                     "label": "主动护航",
      //                     "value": "safe",
      //                     "children": [{
      //                         "label": "飞机护航",
      //                         "value": "safe-plane",
      //                         "parent": "safe"
      //                     }, {
      //                         "label": "火车护航",
      //                         "value": "safe-train",
      //                         "parent": "safe"
      //                     }]
      //                 }]
      //             },
      //             group: {
      //                 type: 'string',
      //                 title: '',
      //                 default: ''
      //             },
      //             author: {
      //                 type: 'string',
      //                 title: '作者',
      //                 default: ''
      //             },
      //             uploader: {
      //                 type: 'array',
      //                 title: '图片上传',
      //                 maxFileNum: 10,
      //                 items: {
      //                     type: 'string',
      //                     format: 'data-url',
      //                     default: ''
      //                 }
      //             },
      //             open: {
      //                 type: 'boolean',
      //                 title: '是否开启'
      //             },
      //             slderNumber: {
      //                 type: 'number',
      //                 title: '亮度值'
      //             },
      //             sliderNumberRange: {
      //                 type: 'array',
      //                 title: '选择亮度值范围',
      //                 items: {
      //                     type: 'number',
      //                     default: 0,
      //                     enum: [],
      //                     enumNames: []
      //                 },
      //                 uniqueItems: true
      //             },
      //             cascader: {
      //                 type: 'array',
      //                 title: '级联选择框',
      //                 items: {
      //                     type: 'string',
      //                     default: '',
      //                     enum: [],
      //                     enumNames: []
      //                 },
      //                 uniqueItems: true,
      //                 data: [{
      //                     "children": [{
      //                         "children": [],
      //                         "label": "第1级第0个",
      //                         "value": "100",
      //                         "extAttributes": {}
      //                     },
      //                         {
      //                             "children": [{
      //                                 "children": [],
      //                                 "label": "第二级第0个",
      //                                 "value": "200",
      //                                 "extAttributes": {}
      //                             },
      //                                 {
      //                                     "children": [],
      //                                     "label": "第二级第1个",
      //                                     "value": "201",
      //                                     "extAttributes": {}
      //                                 }],
      //                             "label": "第一级第1个",
      //                             "value": "101",
      //                             "extAttributes": {}
      //                         }],
      //                     "label": "第0级第0个",
      //                     "value": "10",
      //                     "extAttributes": {}
      //                 }]
      //             }
      //         }
      //     },
      //     uiSchema: {
      //         arriveDate: {
      //             'ui:widget': 'date',
      //             'ui:options': {
      //                 placeholder: '请选择到达日期'
      //             }
      //         },
      //         arriveDateTime: {
      //             'ui:widget': 'datetime',
      //             'ui:options': {
      //                 placeholder: '请选择到达时间'
      //             }
      //         },
      //         arriveDateRange: {
      //             'ui:widget': 'dateRange',
      //             'ui:options': {
      //                 initRange: 'beforeweek',
      //                 validate: [{
      //                     type: 'empty',
      //                     message: '该项为必填项'
      //                 }]
      //             }
      //         },
      //         arrivedCities: {
      //             'ui:widget': 'multiSelect',
      //             'ui:options': {
      //                 showSearch: true,
      //                 placeholder: "请选择你去过的城市",
      //                 validate: [{
      //                     type: 'empty',
      //                     message: '该项为必选项'
      //                 }]
      //             }
      //         },
      //         bizName: {
      //             'ui:help': '注释注释',
      //             'ui:options': {
      //                 placeholder: '请输入',
      //                 validate: [{
      //                     type: 'empty',
      //                     message: '该字段不能为空'
      //                 }, {
      //                     type: 'server',
      //                     checkUrl: '',
      //                     message: "您输入的名称存在重复，请重新输入"
      //                 }]
      //             }
      //         },
      //         note: {
      //             'ui:widget': 'textarea',
      //             'ui:options': {
      //                 validate: [{
      //                     type: 'empty',
      //                     message: '备注不能为空'
      //                 }]
      //             }
      //         },
      //         number: {
      //             'ui:widget': 'updown',
      //             'ui:options': {
      //                 validate: [{
      //                     type: 'empty',
      //                     message: '该字段不能为空'
      //                 }]
      //             }
      //         },
      //         disabledNumber: {
      //             'ui:widget': 'updown',
      //             'ui:disabled': true
      //         },
      //         label: {
      //             'ui:widget': 'label'
      //         },
      //         bizType: {
      //             'ui:widget': 'treeSelect',
      //             'ui:options': {
      //                 placeholder: '请选择'
      //             }
      //         },
      //         city: {
      //             'ui:widget': 'radio',
      //             'ui:options': {
      //                 validate: [{
      //                     type: 'empty',
      //                     message: '请选择'
      //                 }]
      //             }
      //         },
      //         district: {
      //             'ui:widget': 'checkboxes',
      //             'ui:options': {
      //                 validate: [{
      //                     type: 'empty',
      //                     message: '请至少选择一项'
      //                 }],
      //                 show: [{
      //                     field: 'city',
      //                     values: ['beijing', 'shanghai']
      //                 }]
      //             }
      //         },
      //         road: {
      //             'ui:widget': 'select',
      //             'ui:options': {
      //                 placeholder: '请选择',
      //                 validate: [{
      //                     type: 'empty',
      //                     message: '请选择'
      //                 }],
      //                 show: [{
      //                     field: 'city',
      //                     values: ['hangzhou']
      //                 }]
      //             }
      //         },
      //         blame: {
      //             'ui:widget': 'radio'
      //         },
      //         travel: {
      //             'ui:widget': 'treeSelect',
      //             'ui:options': {
      //                 validate: [{
      //                     type: 'empty',
      //                     message: '该项为必选项'
      //                 }]
      //             }
      //         },
      //         group: {
      //             'ui:widget': 'group',
      //             'ui:options': {
      //                 'groupName': '分组标题'
      //             }
      //         },
      //         author: {
      //             'ui:widget': 'hidden'
      //         },
      //         uploader: {
      //             'ui:options': {
      //                 maxFileNum: 10,
      //                 maxFileSize: 10,
      //                 exampleImageUrl: [{
      //                     url: '//img.alicdn.com/bao/uploaded/TB1kyjtPVXXXXXRaXXXSutbFXXX.jpg_360x360xzq90.jpg_.webp'
      //                 }],
      //                 validate: [{
      //                     type: 'empty',
      //                     message: '请至少上传一张图片'
      //                 }]
      //             }
      //         },
      //         open: {
      //             'ui:widget': 'switch'
      //         },
      //         slderNumber: {
      //             'ui:widget': 'slider'
      //         },
      //         sliderNumberRange: {
      //             'ui:widget': 'sliderRange'
      //         },
      //         cascader: {
      //             'ui:widget': 'cascader'
      //         }
      //     },
      //     formData: this.state.formData,
      //     bizData: {
      //         arriveDate: {
      //             fieldType: 'system',
      //             canSearch: true,
      //             type: 'date'
      //         },
      //         arriveDateTime: {
      //             fieldType: 'system',
      //             canSearch: false,
      //             type: 'datetime'
      //         },
      //         arriveDateRange: {
      //             fieldType: 'system',
      //             canSearch: true,
      //             type: 'dateRange'
      //         },
      //         arrivedCities: {
      //             fieldType: 'system',
      //             canSearch: true,
      //             type: 'multiSelect'
      //         },
      //         bizName: {
      //             fieldType: 'universal',
      //             canSearch: true,
      //             type: 'input'
      //         },
      //         note: {
      //             fieldType: 'system',
      //             canSearch: false,
      //             type: 'textarea'
      //         },
      //         number: {
      //             fieldType: 'universal',
      //             canSearch: false,
      //             type: 'number'
      //         },
      //         disabledNumber: {
      //             fieldType: 'universal',
      //             canSearch: false,
      //             type: 'number'
      //         },
      //         label: {
      //             fieldType: 'universal',
      //             canSearch: false,
      //             type: 'label'
      //         },
      //         bizType: {
      //             fieldType: 'universal',
      //             canSearch: true,
      //             type: 'treeSelect'
      //         },
      //         isFavouriteCity: {
      //             fieldType: 'system',
      //             canSearch: false,
      //             type: 'booleanCheckbox'
      //         },
      //         city: {
      //             fieldType: 'system',
      //             canSearch: false,
      //             type: 'radio'
      //         },
      //         district: {
      //             fieldType: 'universal',
      //             canSearch: true,
      //             type: 'checkbox'
      //         },
      //         road: {
      //             fieldType: 'custom',
      //             canSearch: false,
      //             type: 'select'
      //         },
      //         blame: {
      //             fieldType: 'custom',
      //             canSearch: false,
      //             type: 'radio'
      //         },
      //         travel: {
      //             fieldType: 'custom',
      //             canSearch: false,
      //             type: 'treeSelect'
      //         },
      //         group: {
      //             fieldType: 'custom',
      //             canSearch: false,
      //             type: 'group'
      //         },
      //         author: {
      //             fieldType: 'system',
      //             canSearch: false,
      //             type: 'input'
      //         },
      //         uploader: {
      //             fieldType: 'custom',
      //             canSearch: true,
      //             type: 'upload'
      //         },
      //         open: {
      //             fieldType: 'custom',
      //             canSearch: false,
      //             type: 'switch'
      //         },
      //         slderNumber: {
      //             fieldType: 'custom',
      //             canSearch: false,
      //             type: 'slider'
      //         },
      //         sliderNumberRange: {
      //             fieldType: 'custom',
      //             canSearch: false,
      //             type: 'sliderRange'
      //         },
      //         cascader: {
      //             fieldType: 'custom',
      //             canSearch: false,
      //             type: 'cascader'
      //         }
      //     }
      // };
      var formSchema = {
        "jsonSchema": {
          "title": "",
          "description": "",
          "type": "object",
          "required": [],
          "properties": {
            "njAHDN4JGj": {
              "type": "object",
              "title": "分组",
              "default": [],
              "properties": {
                "sealTitle": {
                  "type": "string",
                  "title": "标题",
                  "default": "",
                  "maxLength": 100
                },
                "anYpRpdWaK": {
                  "type": "string",
                  "title": "用印事由",
                  "default": "",
                  "maxLength": 300
                },
                "xPrEp7zk2M": {
                  "type": "string",
                  "title": "文件类型",
                  "default": "",
                  "enum": ["xC56dAbXR", "Qz8GQC7cG", "QskBykhia"],
                  "enumNames": ["行政类", "业务类", "其他"]
                },
                "Y8tyiYDDjR": {
                  "type": "array",
                  "title": "上传文件",
                  "maxFileSize": 10,
                  "maxFileNum": 2,
                  "items": {
                    "type": "string",
                    "format": "data-url",
                    "default": ""
                  },
                  "uniqueItems": true
                }
              },
              "required": ["sealTitle", "anYpRpdWaK", "xPrEp7zk2M", "Y8tyiYDDjR"]
            },
            "xcBeJksSaw": {
              "type": "array",
              "title": "分组",
              "items": {
                "type": "object",
                "default": [],
                "properties": {
                  "sealName": {
                    "type": "string",
                    "title": "印章名称",
                    "default": "",
                    "dataSourceUrl": "seal/list"
                  },
                  "sealUseNum": {
                    "type": "number",
                    "title": "用印次数",
                    "default": "",
                    "maximum": 200,
                    "minimum": 1
                  }
                },
                "required": ["sealName", "sealUseNum"]
              }
            },
            "JS2rRdfEMB": {
              "type": "object",
              "title": "分组",
              "default": [],
              "properties": {
                "RksMw5XZsh": {
                  "type": "boolean",
                  "title": "是否外带",
                  "default": false
                },
                "sealTakeDate": {
                  "type": "array",
                  "title": "外带日期",
                  "default": [],
                  "items": {
                    "type": "string",
                    "enum": [],
                    "enumNames": []
                  },
                  "uniqueItems": true
                },
                "sealTakeLocation": {
                  "type": "array",
                  "title": "外带地点",
                  "items": {
                    "type": "string",
                    "default": "",
                    "maxLength": 200
                  }
                }
              },
              "required": []
            },
            "auditModal": {
              "type": "object",
              "title": "审核弹框",
              "default": [],
              "properties": {
                "noticeUser": {
                  "type": "string",
                  "title": "选择抄送人员",
                  "default": "",
                  "dataSourceUrl": "members/transfer"
                },
                "auditComment": {
                  "type": "string",
                  "title": "审批意见",
                  "default": "",
                  "maxLength": 200
                },
                "auditAggree": {
                  "type": "string",
                  "default": "",
                  "enum": ["提交", "取消", "弹出控件组"],
                  "enumNames": ["提交", "取消", "弹出控件组"]
                },
                "auditReject": {
                  "type": "string",
                  "default": "",
                  "enum": ["提交", "取消", "弹出控件组"],
                  "enumNames": ["提交", "取消", "弹出控件组"]
                }
              },
              "required": []
            },
            "assigneeModal": {
              "type": "object",
              "title": "分组",
              "default": [],
              "properties": {
                "assigneeUser": {
                  "type": "string",
                  "title": "选择转办人员",
                  "default": "",
                  "dataSourceUrl": "members/transfer"
                },
                "assigneeSubmit": {
                  "type": "string",
                  "default": "",
                  "enum": ["提交", "取消", "弹出控件组"],
                  "enumNames": ["提交", "取消", "弹出控件组"]
                }
              },
              "required": []
            },
            "beforeAssignModal": {
              "type": "object",
              "title": "分组",
              "default": [],
              "properties": {
                "beforeAssignUser": {
                  "type": "string",
                  "title": "选择前加签人员",
                  "default": "",
                  "dataSourceUrl": "members/transfer"
                },
                "beforeAssignSubmit": {
                  "type": "string",
                  "default": "",
                  "enum": ["提交", "取消", "弹出控件组"],
                  "enumNames": ["提交", "取消", "弹出控件组"]
                }
              },
              "required": []
            },
            "afterAssignModal": {
              "type": "object",
              "title": "分组",
              "default": [],
              "properties": {
                "afterAssignUser": {
                  "type": "string",
                  "title": "选择后加签人员",
                  "default": "",
                  "dataSourceUrl": "members/transfer"
                },
                "afterAssignComment": {
                  "type": "string",
                  "title": "审批意见",
                  "default": "",
                  "maxLength": 200
                },
                "afterAssignSubmit": {
                  "type": "string",
                  "default": "",
                  "enum": ["提交", "取消", "弹出控件组"],
                  "enumNames": ["提交", "取消", "弹出控件组"]
                }
              },
              "required": []
            },
            "affterAuditModal": {
              "type": "object",
              "title": "分组",
              "default": [],
              "properties": {
                "affterAuditComment": {
                  "type": "string",
                  "title": "审批意见",
                  "default": "",
                  "maxLength": 200
                },
                "affterAuditAggree": {
                  "type": "string",
                  "default": "",
                  "enum": ["提交", "取消", "弹出控件组"],
                  "enumNames": ["提交", "取消", "弹出控件组"]
                },
                "affterAuditReject": {
                  "type": "string",
                  "default": "",
                  "enum": ["提交", "取消", "弹出控件组"],
                  "enumNames": ["提交", "取消", "弹出控件组"]
                }
              },
              "required": []
            },
            "HrZ5yF7pCC": {
              "type": "string",
              "default": "",
              "enum": ["提交", "取消", "弹出控件组"],
              "enumNames": ["提交", "取消", "弹出控件组"]
            },
            "b5nKwyRPNA": {
              "type": "string",
              "default": "",
              "enum": ["提交", "取消", "弹出控件组"],
              "enumNames": ["提交", "取消", "弹出控件组"]
            },
            "Zf4JraAZwN": {
              "type": "string",
              "default": "",
              "enum": ["提交", "取消", "弹出控件组"],
              "enumNames": ["提交", "取消", "弹出控件组"]
            },
            "Dd4QkQsMA3": {
              "type": "string",
              "default": "",
              "enum": ["提交", "取消", "弹出控件组"],
              "enumNames": ["提交", "取消", "弹出控件组"]
            },
            "sYs5tjsAZ4": {
              "type": "string",
              "default": "",
              "enum": ["提交", "取消", "弹出控件组"],
              "enumNames": ["提交", "取消", "弹出控件组"]
            },
            "WHNy2c7Jry": {
              "type": "string",
              "default": "",
              "enum": ["提交", "取消", "弹出控件组"],
              "enumNames": ["提交", "取消", "弹出控件组"]
            },
            "Mx6hTSEkMX": {
              "type": "string",
              "default": "",
              "enum": ["提交", "取消", "弹出控件组"],
              "enumNames": ["提交", "取消", "弹出控件组"]
            },
            "amxwnchHzY": {
              "type": "string",
              "default": "",
              "enum": ["提交", "取消", "弹出控件组"],
              "enumNames": ["提交", "取消", "弹出控件组"]
            },
            "YkYEQ6PbRA": {
              "type": "string",
              "default": "",
              "enum": ["提交", "取消", "弹出控件组"],
              "enumNames": ["提交", "取消", "弹出控件组"]
            }
          }
        },
        "uiSchema": {
          "njAHDN4JGj": {
            "ui:widget": "group",
            "ui:options": {
              "groupName": "分组标题"
            },
            "sealTitle": {
              "ui:placeholder": "请输入标题",
              "ui:disabled": false,
              "ui:options": {
                "validate": [{
                  "type": "empty",
                  "message": "该字段为必填项"
                }],
                "shownodes": ["startevent", "deptLeaderAudit", "modifyApply", "fsSealDeclareNotice", "fsSealDeclareAssign", "fsSealDeclareHistory"],
                "disnodes": ["deptLeaderAudit", "fsSealDeclareNotice", "fsSealDeclareAssign", "fsSealDeclareHistory"]
              },
              "ui:help": ""
            },
            "anYpRpdWaK": {
              "ui:widget": "textarea",
              "ui:placeholder": "请输入用印事由",
              "ui:help": "",
              "ui:disabled": false,
              "ui:options": {
                "shownodes": ["startevent", "deptLeaderAudit", "modifyApply", "fsSealDeclareNotice", "fsSealDeclareAssign", "fsSealDeclareHistory"],
                "disnodes": ["deptLeaderAudit", "fsSealDeclareNotice", "fsSealDeclareAssign", "fsSealDeclareHistory"],
                "validate": [{
                  "type": "empty",
                  "message": "该项目为必填项"
                }]
              }
            },
            "xPrEp7zk2M": {
              "ui:widget": "select",
              "ui:placeholder": "请选择文件类型",
              "ui:help": "",
              "ui:disabled": false,
              "ui:options": {
                "validate": [{
                  "type": "empty",
                  "message": "该项目为必填项"
                }],
                "shownodes": ["startevent", "deptLeaderAudit", "modifyApply", "fsSealDeclareNotice", "fsSealDeclareAssign", "fsSealDeclareHistory"],
                "disnodes": ["deptLeaderAudit", "fsSealDeclareNotice", "fsSealDeclareAssign", "fsSealDeclareHistory"]
              }
            },
            "Y8tyiYDDjR": {
              "ui:options": {
                "templateFileUrl": "",
                "label": "文件上传",
                "accept": "*/*",
                "shownodes": ["startevent", "deptLeaderAudit", "modifyApply", "fsSealDeclareNotice", "fsSealDeclareAssign", "fsSealDeclareHistory"],
                "disnodes": ["deptLeaderAudit", "fsSealDeclareNotice", "fsSealDeclareAssign", "fsSealDeclareHistory"],
                "validate": [{
                  "type": "empty",
                  "message": "该项目为必填项"
                }]
              },
              "ui:help": "",
              "ui:disabled": false
            }
          },
          "xcBeJksSaw": {
            "items": {
              "ui:widget": "group",
              "ui:options": {
                "groupName": "分组标题"
              },
              "sealName": {
                "ui:widget": "Stamp",
                "ui:placeholder": "请选择印章",
                "ui:options": {
                  "validate": [{
                    "type": "empty",
                    "message": "请选择印章"
                  }],
                  "shownodes": ["startevent", "deptLeaderAudit", "modifyApply", "fsSealDeclareNotice", "fsSealDeclareAssign", "fsSealDeclareHistory"],
                  "disnodes": ["deptLeaderAudit", "fsSealDeclareNotice", "fsSealDeclareAssign", "fsSealDeclareHistory"]
                },
                "ui:help": "",
                "ui:disabled": false
              },
              "sealUseNum": {
                "ui:widget": "updown",
                "ui:placeholder": "请输入用印次数",
                "ui:options": {
                  "shownodes": ["startevent", "deptLeaderAudit", "modifyApply", "fsSealDeclareNotice", "fsSealDeclareAssign", "fsSealDeclareHistory"],
                  "disnodes": ["deptLeaderAudit", "fsSealDeclareNotice", "fsSealDeclareAssign", "fsSealDeclareHistory"],
                  "validate": [{
                    "type": "empty",
                    "message": "该项目为必填项"
                  }]
                },
                "ui:help": "",
                "ui:disabled": false
              }
            }
          },
          "JS2rRdfEMB": {
            "ui:widget": "group",
            "ui:options": {
              "groupName": "分组标题"
            },
            "RksMw5XZsh": {
              "ui:widget": "switch",
              "ui:help": "",
              "ui:disabled": false,
              "ui:options": {
                "shownodes": ["startevent", "deptLeaderAudit", "modifyApply", "fsSealDeclareNotice", "fsSealDeclareAssign", "fsSealDeclareHistory"],
                "disnodes": ["deptLeaderAudit", "fsSealDeclareNotice", "fsSealDeclareAssign", "fsSealDeclareHistory"]
              }
            },
            "sealTakeDate": {
              "ui:widget": "dateRange",
              "ui:options": {
                "placeholder": ["开始日期", "结束日期"],
                "shownodes": ["startevent", "deptLeaderAudit", "modifyApply", "fsSealDeclareNotice", "fsSealDeclareAssign", "fsSealDeclareHistory"],
                "disnodes": ["deptLeaderAudit", "fsSealDeclareNotice", "fsSealDeclareAssign", "fsSealDeclareHistory"],
                "show": [{
                  "field": "RksMw5XZsh",
                  "values": [true]
                }]
              },
              "ui:help": "",
              "ui:disabled": false
            },
            "sealTakeLocation": {
              "items": {
                "ui:widget": "amapInput",
                "ui:placeholder": "请选择外带地点",
                "ui:help": "",
                "ui:disabled": false,
                "ui:options": {
                  "shownodes": ["startevent", "deptLeaderAudit", "modifyApply", "fsSealDeclareNotice", "fsSealDeclareAssign", "fsSealDeclareHistory"],
                  "disnodes": ["deptLeaderAudit", "fsSealDeclareNotice", "fsSealDeclareAssign", "fsSealDeclareHistory"]
                }
              },
              "ui:options": {
                "show": [{
                  "field": "RksMw5XZsh",
                  "values": [true]
                }]
              }
            }
          },
          "auditModal": {
            "ui:widget": "group",
            "ui:options": {
              "groupName": "审核弹框",
              "showGroupTitle": false
            },
            "noticeUser": {
              "ui:widget": "Transfer",
              "ui:leftTitle": "待选人员",
              "ui:rightTitle": "已选人员",
              "ui:disabled": false
            },
            "auditComment": {
              "ui:widget": "textarea",
              "ui:placeholder": "请输入审批意见",
              "ui:help": "",
              "ui:disabled": false
            },
            "auditAggree": {
              "ui:widget": "button",
              "ui:options": {
                "behavior": "提交",
                "marginLeft": "",
                "popCode": "",
                "itemwidth": 15,
                "behaviorUrl": "aggree"
              }
            },
            "auditReject": {
              "ui:widget": "button",
              "ui:options": {
                "behavior": "提交",
                "marginLeft": "",
                "popCode": "",
                "itemwidth": 15,
                "behaviorUrl": "reject"
              }
            }
          },
          "assigneeModal": {
            "ui:widget": "group",
            "ui:options": {
              "groupName": "转办弹框",
              "showGroupTitle": false
            },
            "assigneeUser": {
              "ui:widget": "Transfer",
              "ui:leftTitle": "待选人员",
              "ui:rightTitle": "已选人员",
              "ui:disabled": false,
              "ui:checkType": true
            },
            "assigneeSubmit": {
              "ui:widget": "button",
              "ui:options": {
                "behavior": "提交",
                "marginLeft": "",
                "popCode": "",
                "itemwidth": 20,
                "behaviorUrl": "assignee"
              }
            }
          },
          "beforeAssignModal": {
            "ui:widget": "group",
            "ui:options": {
              "groupName": "前加签弹框",
              "showGroupTitle": false
            },
            "beforeAssignUser": {
              "ui:widget": "Transfer",
              "ui:leftTitle": "待选人员",
              "ui:rightTitle": "已选人员",
              "ui:disabled": false
            },
            "beforeAssignSubmit": {
              "ui:widget": "button",
              "ui:options": {
                "behavior": "提交",
                "marginLeft": "",
                "popCode": "",
                "itemwidth": 20,
                "behaviorUrl": "beforeAssign"
              }
            }
          },
          "afterAssignModal": {
            "ui:widget": "group",
            "ui:options": {
              "groupName": "后加签弹框",
              "showGroupTitle": false
            },
            "afterAssignUser": {
              "ui:widget": "Transfer",
              "ui:leftTitle": "待选人员",
              "ui:rightTitle": "已选人员",
              "ui:disabled": false
            },
            "afterAssignComment": {
              "ui:widget": "textarea",
              "ui:placeholder": "请输入审批意见",
              "ui:help": "",
              "ui:disabled": false
            },
            "afterAssignSubmit": {
              "ui:widget": "button",
              "ui:options": {
                "behavior": "提交",
                "marginLeft": "",
                "popCode": "",
                "itemwidth": 15,
                "behaviorUrl": "afterAssign"
              }
            }
          },
          "affterAuditModal": {
            "ui:widget": "group",
            "ui:options": {
              "groupName": "转办加签审核弹框",
              "showGroupTitle": false
            },
            "affterAuditComment": {
              "ui:widget": "textarea",
              "ui:placeholder": "请输入审批意见",
              "ui:help": "",
              "ui:disabled": false
            },
            "affterAuditAggree": {
              "ui:widget": "button",
              "ui:options": {
                "behavior": "提交",
                "marginLeft": "",
                "popCode": "",
                "itemwidth": 15,
                "behaviorUrl": "aggree"
              }
            },
            "affterAuditReject": {
              "ui:widget": "button",
              "ui:options": {
                "behavior": "提交",
                "marginLeft": "",
                "popCode": "",
                "itemwidth": 15,
                "behaviorUrl": "reject"
              }
            }
          },
          "HrZ5yF7pCC": {
            "ui:widget": "button",
            "ui:options": {
              "behavior": "提交",
              "marginLeft": "",
              "popCode": "",
              "shownodes": ["startevent", "modifyApply"],
              "itemwidth": 20,
              "behaviorUrl": "draft"
            }
          },
          "b5nKwyRPNA": {
            "ui:widget": "button",
            "ui:options": {
              "behavior": "提交",
              "marginLeft": "",
              "popCode": "",
              "shownodes": ["startevent", "modifyApply"],
              "itemwidth": 20,
              "behaviorUrl": "formSubmit"
            }
          },
          "Zf4JraAZwN": {
            "ui:widget": "button",
            "ui:options": {
              "behavior": "取消",
              "marginLeft": "",
              "popCode": "",
              "shownodes": ["startevent", "modifyApply", "deptLeaderAudit", "fsSealDeclareNotice", "fsSealDeclareAssign"],
              "itemwidth": 20,
              "behaviorUrl": ""
            }
          },
          "Dd4QkQsMA3": {
            "ui:widget": "button",
            "ui:options": {
              "behavior": "弹出控件组",
              "marginLeft": "",
              "popCode": "auditModal",
              "shownodes": ["deptLeaderAudit"],
              "itemwidth": 20,
              "behaviorUrl": ""
            }
          },
          "sYs5tjsAZ4": {
            "ui:widget": "button",
            "ui:options": {
              "behavior": "弹出控件组",
              "marginLeft": "",
              "popCode": "assigneeModal",
              "shownodes": ["deptLeaderAudit"],
              "itemwidth": 20,
              "behaviorUrl": ""
            }
          },
          "WHNy2c7Jry": {
            "ui:widget": "button",
            "ui:options": {
              "behavior": "弹出控件组",
              "marginLeft": "",
              "popCode": "beforeAssignModal",
              "shownodes": ["deptLeaderAudit"],
              "itemwidth": 20,
              "behaviorUrl": ""
            }
          },
          "Mx6hTSEkMX": {
            "ui:widget": "button",
            "ui:options": {
              "behavior": "弹出控件组",
              "marginLeft": "",
              "popCode": "afterAssignModal",
              "shownodes": ["deptLeaderAudit"],
              "itemwidth": 20,
              "behaviorUrl": ""
            }
          },
          "amxwnchHzY": {
            "ui:widget": "button",
            "ui:options": {
              "behavior": "弹出控件组",
              "marginLeft": "",
              "popCode": "affterAuditModal",
              "shownodes": ["fsSealDeclareAssign"],
              "itemwidth": 20,
              "behaviorUrl": ""
            }
          },
          "YkYEQ6PbRA": {
            "ui:widget": "button",
            "ui:options": {
              "behavior": "提交",
              "marginLeft": "",
              "popCode": "",
              "shownodes": ["fsSealDeclareNotice"],
              "itemwidth": 20,
              "behaviorUrl": "readed"
            }
          }
        },
        "formData": {
          "njAHDN4JGj": {
            "sealTitle": "",
            "anYpRpdWaK": "",
            "xPrEp7zk2M": "xC56dAbXR",
            "Y8tyiYDDjR": []
          },
          "xcBeJksSaw": [{
            "sealName": "",
            "sealUseNum": ""
          }],
          "JS2rRdfEMB": {
            "RksMw5XZsh": "",
            "sealTakeDate": "",
            "sealTakeLocation": [[""]]
          },
          "auditModal": {
            "noticeUser": [],
            "auditComment": "",
            "auditAggree": "同意",
            "auditReject": "拒绝"
          },
          "assigneeModal": {
            "assigneeUser": [],
            "assigneeSubmit": "确定转办"
          },
          "beforeAssignModal": {
            "beforeAssignUser": [],
            "beforeAssignSubmit": "确认加签"
          },
          "afterAssignModal": {
            "afterAssignUser": [],
            "afterAssignComment": "",
            "afterAssignSubmit": "同意"
          },
          "affterAuditModal": {
            "affterAuditComment": "",
            "affterAuditAggree": "同意",
            "affterAuditReject": "拒绝"
          },
          "HrZ5yF7pCC": "保存草稿",
          "b5nKwyRPNA": "提交申请",
          "Zf4JraAZwN": "取消",
          "Dd4QkQsMA3": "审核",
          "sYs5tjsAZ4": "转办",
          "WHNy2c7Jry": "前加签",
          "Mx6hTSEkMX": "后加签",
          "amxwnchHzY": "审核",
          "YkYEQ6PbRA": "已阅"
        },
        "bizData": {
          "njAHDN4JGj": {
            "type": "group",
            "fieldType": "custom"
          },
          "sealTitle": {
            "type": "input",
            "fieldType": "common",
            "disabled": false,
            "readonly": false
          },
          "anYpRpdWaK": {
            "disabled": false,
            "readonly": false,
            "type": "textarea",
            "fieldType": "custom"
          },
          "xPrEp7zk2M": {
            "options": {
              "xC56dAbXR": {
                "uiSchema": {
                  "name": {
                    "ui:options": {
                      "placeholder": "最多不超过200个字符",
                      "validate": [{
                        "type": "empty",
                        "message": "请输入选项名称"
                      }],
                      "_errorType": ""
                    },
                    "ui:disabled": false,
                    "ui:readonly": false,
                    "classNames": ""
                  },
                  "code": {
                    "ui:options": {
                      "placeholder": "输入控件编码",
                      "validate": [{
                        "type": "empty",
                        "message": "请输入选项编码"
                      }]
                    },
                    "ui:disabled": false,
                    "ui:readonly": false,
                    "classNames": ""
                  }
                },
                "name": "行政类",
                "code": "xC56dAbXR"
              },
              "Qz8GQC7cG": {
                "uiSchema": {
                  "name": {
                    "ui:options": {
                      "placeholder": "最多不超过200个字符",
                      "validate": [{
                        "type": "empty",
                        "message": "请输入选项名称"
                      }],
                      "_errorType": ""
                    },
                    "ui:disabled": false,
                    "ui:readonly": false,
                    "classNames": ""
                  },
                  "code": {
                    "ui:options": {
                      "placeholder": "输入控件编码",
                      "validate": [{
                        "type": "empty",
                        "message": "请输入选项编码"
                      }]
                    },
                    "ui:disabled": false,
                    "ui:readonly": false,
                    "classNames": ""
                  }
                },
                "name": "业务类",
                "code": "Qz8GQC7cG"
              },
              "QskBykhia": {
                "uiSchema": {
                  "name": {
                    "ui:options": {
                      "placeholder": "最多不超过200个字符",
                      "validate": [{
                        "type": "empty",
                        "message": "请输入选项名称"
                      }],
                      "_errorType": ""
                    },
                    "ui:disabled": false,
                    "ui:readonly": false,
                    "classNames": ""
                  },
                  "code": {
                    "ui:options": {
                      "placeholder": "输入控件编码",
                      "validate": [{
                        "type": "empty",
                        "message": "请输入选项编码"
                      }]
                    },
                    "ui:disabled": false,
                    "ui:readonly": false,
                    "classNames": ""
                  }
                },
                "name": "其他",
                "code": "QskBykhia"
              }
            },
            "type": "select",
            "fieldType": "custom",
            "disabled": false,
            "readonly": false
          },
          "Y8tyiYDDjR": {
            "disabled": false,
            "readonly": false,
            "type": "file",
            "fieldType": "custom"
          },
          "xcBeJksSaw": {
            "type": "group",
            "fieldType": "custom"
          },
          "sealName": {
            "type": "Stamp",
            "fieldType": "common",
            "disabled": false,
            "readonly": false
          },
          "sealUseNum": {
            "type": "number",
            "fieldType": "common"
          },
          "JS2rRdfEMB": {
            "type": "group",
            "fieldType": "custom"
          },
          "RksMw5XZsh": {
            "disabled": false,
            "readonly": false,
            "type": "booleanSwitch",
            "fieldType": "custom"
          },
          "sealTakeDate": {
            "type": "dateRange",
            "fieldType": "common",
            "disabled": false,
            "readonly": false
          },
          "sealTakeLocation": {
            "type": "amapInput",
            "fieldType": "common",
            "disabled": false,
            "readonly": false
          },
          "auditModal": {
            "type": "group",
            "fieldType": "common"
          },
          "noticeUser": {
            "type": "Transfer",
            "fieldType": "common"
          },
          "auditComment": {
            "type": "textarea",
            "fieldType": "common"
          },
          "auditAggree": {
            "options": {
              "提交": {
                "name": "提交",
                "code": "提交"
              },
              "取消": {
                "name": "取消",
                "code": "取消"
              },
              "弹出控件组": {
                "name": "弹出控件组",
                "code": "弹出控件组"
              }
            },
            "disabled": false,
            "readonly": false,
            "type": "button",
            "fieldType": "common"
          },
          "auditReject": {
            "options": {
              "提交": {
                "name": "提交",
                "code": "提交"
              },
              "取消": {
                "name": "取消",
                "code": "取消"
              },
              "弹出控件组": {
                "name": "弹出控件组",
                "code": "弹出控件组"
              }
            },
            "type": "button",
            "fieldType": "common"
          },
          "assigneeModal": {
            "type": "group",
            "fieldType": "common"
          },
          "assigneeUser": {
            "disabled": false,
            "readonly": false,
            "type": "Transfer",
            "fieldType": "common"
          },
          "assigneeSubmit": {
            "options": {
              "提交": {
                "name": "提交",
                "code": "提交"
              },
              "取消": {
                "name": "取消",
                "code": "取消"
              },
              "弹出控件组": {
                "name": "弹出控件组",
                "code": "弹出控件组"
              }
            },
            "type": "button",
            "fieldType": "common"
          },
          "beforeAssignModal": {
            "type": "group",
            "fieldType": "common"
          },
          "beforeAssignUser": {
            "disabled": false,
            "readonly": false,
            "type": "Transfer",
            "fieldType": "common"
          },
          "beforeAssignSubmit": {
            "options": {
              "提交": {
                "name": "提交",
                "code": "提交"
              },
              "取消": {
                "name": "取消",
                "code": "取消"
              },
              "弹出控件组": {
                "name": "弹出控件组",
                "code": "弹出控件组"
              }
            },
            "type": "button",
            "fieldType": "common"
          },
          "afterAssignModal": {
            "type": "group",
            "fieldType": "common"
          },
          "afterAssignUser": {
            "type": "Transfer",
            "fieldType": "common"
          },
          "afterAssignComment": {
            "type": "textarea",
            "fieldType": "common"
          },
          "afterAssignSubmit": {
            "options": {
              "提交": {
                "name": "提交",
                "code": "提交"
              },
              "取消": {
                "name": "取消",
                "code": "取消"
              },
              "弹出控件组": {
                "name": "弹出控件组",
                "code": "弹出控件组"
              }
            },
            "type": "button",
            "fieldType": "common"
          },
          "affterAuditModal": {
            "type": "group",
            "fieldType": "common"
          },
          "affterAuditComment": {
            "type": "textarea",
            "fieldType": "common"
          },
          "affterAuditAggree": {
            "options": {
              "提交": {
                "name": "提交",
                "code": "提交"
              },
              "取消": {
                "name": "取消",
                "code": "取消"
              },
              "弹出控件组": {
                "name": "弹出控件组",
                "code": "弹出控件组"
              }
            },
            "type": "button",
            "fieldType": "common"
          },
          "affterAuditReject": {
            "options": {
              "提交": {
                "name": "提交",
                "code": "提交"
              },
              "取消": {
                "name": "取消",
                "code": "取消"
              },
              "弹出控件组": {
                "name": "弹出控件组",
                "code": "弹出控件组"
              }
            },
            "type": "button",
            "fieldType": "common"
          },
          "HrZ5yF7pCC": {
            "options": {
              "提交": {
                "name": "提交",
                "code": "提交"
              },
              "取消": {
                "name": "取消",
                "code": "取消"
              },
              "弹出控件组": {
                "name": "弹出控件组",
                "code": "弹出控件组"
              }
            },
            "type": "button",
            "fieldType": "custom"
          },
          "b5nKwyRPNA": {
            "options": {
              "提交": {
                "name": "提交",
                "code": "提交"
              },
              "取消": {
                "name": "取消",
                "code": "取消"
              },
              "弹出控件组": {
                "name": "弹出控件组",
                "code": "弹出控件组"
              }
            },
            "type": "button",
            "fieldType": "custom"
          },
          "Zf4JraAZwN": {
            "options": {
              "提交": {
                "name": "提交",
                "code": "提交"
              },
              "取消": {
                "name": "取消",
                "code": "取消"
              },
              "弹出控件组": {
                "name": "弹出控件组",
                "code": "弹出控件组"
              }
            },
            "type": "button",
            "fieldType": "custom"
          },
          "Dd4QkQsMA3": {
            "options": {
              "提交": {
                "name": "提交",
                "code": "提交"
              },
              "取消": {
                "name": "取消",
                "code": "取消"
              },
              "弹出控件组": {
                "name": "弹出控件组",
                "code": "弹出控件组"
              }
            },
            "type": "button",
            "fieldType": "custom"
          },
          "sYs5tjsAZ4": {
            "options": {
              "提交": {
                "name": "提交",
                "code": "提交"
              },
              "取消": {
                "name": "取消",
                "code": "取消"
              },
              "弹出控件组": {
                "name": "弹出控件组",
                "code": "弹出控件组"
              }
            },
            "type": "button",
            "fieldType": "custom"
          },
          "WHNy2c7Jry": {
            "options": {
              "提交": {
                "name": "提交",
                "code": "提交"
              },
              "取消": {
                "name": "取消",
                "code": "取消"
              },
              "弹出控件组": {
                "name": "弹出控件组",
                "code": "弹出控件组"
              }
            },
            "type": "button",
            "fieldType": "custom"
          },
          "Mx6hTSEkMX": {
            "options": {
              "提交": {
                "name": "提交",
                "code": "提交"
              },
              "取消": {
                "name": "取消",
                "code": "取消"
              },
              "弹出控件组": {
                "name": "弹出控件组",
                "code": "弹出控件组"
              }
            },
            "type": "button",
            "fieldType": "custom"
          },
          "amxwnchHzY": {
            "options": {
              "提交": {
                "name": "提交",
                "code": "提交"
              },
              "取消": {
                "name": "取消",
                "code": "取消"
              },
              "弹出控件组": {
                "name": "弹出控件组",
                "code": "弹出控件组"
              }
            },
            "type": "button",
            "fieldType": "custom"
          },
          "YkYEQ6PbRA": {
            "options": {
              "提交": {
                "name": "提交",
                "code": "提交"
              },
              "取消": {
                "name": "取消",
                "code": "取消"
              },
              "弹出控件组": {
                "name": "弹出控件组",
                "code": "弹出控件组"
              }
            },
            "type": "button",
            "fieldType": "custom"
          }
        },
        "sequence": ["njAHDN4JGj", {
          "code": "sealTitle",
          "group": "njAHDN4JGj"
        }, {
          "code": "anYpRpdWaK",
          "group": "njAHDN4JGj"
        }, {
          "code": "xPrEp7zk2M",
          "group": "njAHDN4JGj"
        }, {
          "code": "Y8tyiYDDjR",
          "group": "njAHDN4JGj"
        }, "xcBeJksSaw", {
          "code": "sealName",
          "group": "xcBeJksSaw"
        }, {
          "code": "sealUseNum",
          "group": "xcBeJksSaw"
        }, "JS2rRdfEMB", {
          "code": "RksMw5XZsh",
          "group": "JS2rRdfEMB"
        }, {
          "code": "sealTakeDate",
          "group": "JS2rRdfEMB"
        }, {
          "code": "sealTakeLocation",
          "group": "JS2rRdfEMB"
        }, "auditModal", {
          "code": "noticeUser",
          "group": "auditModal"
        }, {
          "code": "auditComment",
          "group": "auditModal"
        }, {
          "code": "auditAggree",
          "group": "auditModal"
        }, {
          "code": "auditReject",
          "group": "auditModal"
        }, "assigneeModal", {
          "code": "assigneeUser",
          "group": "assigneeModal"
        }, {
          "code": "assigneeSubmit",
          "group": "assigneeModal"
        }, "beforeAssignModal", {
          "code": "beforeAssignUser",
          "group": "beforeAssignModal"
        }, {
          "code": "beforeAssignSubmit",
          "group": "beforeAssignModal"
        }, "afterAssignModal", {
          "code": "afterAssignUser",
          "group": "afterAssignModal"
        }, {
          "code": "afterAssignComment",
          "group": "afterAssignModal"
        }, {
          "code": "afterAssignSubmit",
          "group": "afterAssignModal"
        }, "affterAuditModal", {
          "code": "affterAuditComment",
          "group": "affterAuditModal"
        }, {
          "code": "affterAuditAggree",
          "group": "affterAuditModal"
        }, {
          "code": "affterAuditReject",
          "group": "affterAuditModal"
        }, "HrZ5yF7pCC", "b5nKwyRPNA", "Zf4JraAZwN", "Dd4QkQsMA3", "sYs5tjsAZ4", "WHNy2c7Jry", "Mx6hTSEkMX", "amxwnchHzY", "YkYEQ6PbRA"]
      };
      var disableBtnLabel = this.state.isAllFieldsDisabled ? '取消表单禁用' : '设置表单为禁用';
      var readonlyBtnLabel = this.state.isAllFieldsReadonly ? '取消表单只读' : '设置表单为只读';
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h2", {
        className: "block-title"
      }, "\u4F7F\u7528\u81EA\u5B9A\u4E49\u6309\u94AE\u7684\u65B9\u5F0F\u63D0\u4EA4xform\u8868\u5355"), /*#__PURE__*/_react["default"].createElement(_index["default"], {
        ref: function ref(form) {
          _this2.simpleForm = form;
        } // customUploadRequest={(files, options, successCallback) => {
        //     // 这里处理图片上传
        //     console.log('uploaded files:', files);
        //     console.log('uploader field options:', options);
        //     successCallback([files[0].url]);
        // }}
        ,
        customUploadRequest: function customUploadRequest(file, action, uploadType, getUrl, onErr) {
          ///附件上传
          var RouteTable = _$utils.WebAPI.RouteTable;

          if (action == 'upload') {
            var formData = new FormData();
            formData.append('file', file);
            var type = uploadType == 'picture' || uploadType == 'picture-inline' || uploadType == 'picture-card' ? 'image' : 'project';

            _utils.RouteRequest.post(RouteTable.fileUpload, formData, {
              type: type
            }).then(function (res) {
              if (res && res.filename) {
                getUrl(res.filename.replace(/\\/g, '/'));
              }
            }, function (err) {
              getUrl(''); // onErr('err');
            });
          } else {
            //删除附件
            _utils.RouteRequest["delete"](RouteTable.cleanUpUploadTrash, {
              url: file.response
            });
          }
        },
        disabled: this.state.isAllFieldsDisabled,
        readonly: this.state.isAllFieldsReadonly,
        jsonSchema: formSchema.jsonSchema,
        uiSchema: formSchema.uiSchema,
        formData: formSchema.formData,
        bizData: formSchema.bizData,
        onChange: this.handleXformChange,
        onSubmit: this.handleXformSubmit
      }, /*#__PURE__*/_react["default"].createElement(_antdMobile.WingBlank, null, /*#__PURE__*/_react["default"].createElement(_antdMobile.WhiteSpace, null), /*#__PURE__*/_react["default"].createElement(_antdMobile.Button, {
        type: "primary",
        onClick: function onClick() {
          _this2.simpleForm.XFormSubmit();
        }
      }, "\u63D0\u4EA4"), /*#__PURE__*/_react["default"].createElement(_antdMobile.WhiteSpace, null), /*#__PURE__*/_react["default"].createElement(_antdMobile.Button, {
        type: "default",
        onClick: this.handleSetFormDisabled
      }, disableBtnLabel), /*#__PURE__*/_react["default"].createElement(_antdMobile.WhiteSpace, null), /*#__PURE__*/_react["default"].createElement(_antdMobile.Button, {
        type: "default",
        onClick: this.handleSetFormReadonly
      }, readonlyBtnLabel), /*#__PURE__*/_react["default"].createElement(_antdMobile.WhiteSpace, null))));
    }
  }]);

  return Example;
}(_react.PureComponent);

exports["default"] = Example;