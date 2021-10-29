"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _classnames = _interopRequireDefault(require("classnames"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AmpModal = /*#__PURE__*/function (_Component) {
  _inherits(AmpModal, _Component);

  var _super = _createSuper(AmpModal);

  function AmpModal(props) {
    var _this;

    _classCallCheck(this, AmpModal);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "loadMap", function () {
      var that = _assertThisInitialized(_this);

      var center = [114.331281, 27.725734];

      if (_this.state.value) {
        center = [_this.state.value[0] + _this.state.value[1]];
      }

      var map = new AMap.Map('map', {
        zoom: 10,
        center: center
      });
      that.map = map;
      var autoOptions = {
        input: "tipinput"
      };
      var auto = new AMap.Autocomplete(autoOptions);
      _this.placeSearch = new AMap.PlaceSearch({
        map: map
      }); //构造地点查询类

      AMap.event.addListener(auto, "select", _this.select); //注册监听，当选中某条记录时会触发

      map.on('complete', function () {
        // 地图图块加载完成后触发
        that.mapRender = true;
      });
      map.on('click', function (e) {
        that.props.getCoordinate(e.lnglat.getLng() + ',' + e.lnglat.getLat());

        if (that.marker) {
          that.marker.setMap(null);
        }

        that.marker = new AMap.Marker({
          icon: new AMap.Icon({
            size: new AMap.Size(26, 40),
            //图标大小  
            image: "../../../../../../../assets/images/poi-marker-default.png",
            imageSize: new AMap.Size(26, 40) //图片大小

          }),
          position: [e.lnglat.getLng(), e.lnglat.getLat()],
          offset: new AMap.Pixel(-13, -40)
        });
        that.marker.setMap(map);
        that.placeSearch.render ? that.placeSearch.render.markerList.clear() : "";
      });
    });

    _defineProperty(_assertThisInitialized(_this), "select", function (e) {
      var that = _assertThisInitialized(_this);

      _this.placeSearch.setCity(e.poi.adcode);

      _this.placeSearch.search(e.poi.name); //关键字查询查询


      _this.placeSearch.on('markerClick', function (e) {
        if (that.marker) {
          that.marker.setMap(null);
        }

        that.props.getCoordinate(e.marker.getPosition().lng + ',' + e.marker.getPosition().lat);
      });
    });

    _this.map = null;
    _this.marker = null;
    _this.placeSearch = null;
    _this.state = {
      coordinate: null
    };
    return _this;
  }

  _createClass(AmpModal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadMap();
    }
  }, {
    key: "render",
    value: function render() {
      var searchStyle = {
        position: 'absolute',
        zIndex: '10',
        backgroundColor: '#ffffff',
        border: '1px solid #76767640',
        padding: '10px',
        boxShadow: ' 0 2px 6px 0 rgba(114, 124, 245, .5)',
        margin: '5px'
      };
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        id: "myPageTop",
        style: searchStyle
      }, /*#__PURE__*/_react["default"].createElement("label", null, "\u8BF7\u8F93\u5165\u5173\u952E\u5B57\uFF1A"), /*#__PURE__*/_react["default"].createElement("input", {
        id: "tipinput"
      })), /*#__PURE__*/_react["default"].createElement("div", {
        id: "map",
        style: {
          height: 600,
          width: 770
        }
      }));
    }
  }]);

  return AmpModal;
}(_react.Component);

exports["default"] = AmpModal;