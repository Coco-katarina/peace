"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _icons = require("@ant-design/icons");

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("@peace/utils");

var _$utils = require("$utils");

var _localeMessages = require("../i18n/localeMessages");

var _excluded = ["_errorType", "validate", "label", "uploadType", "vertical", "listType", "templateFileUrl", "exampleImageUrl"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
})("404e81838f7a5e636a1706eeba8fe516", ".xform-custom-uploader .uploader-action-wrapper .template-trigger-link{display:inline-block;margin-right:10px}.xform-custom-uploader .uploader-action-wrapper .example-pic-wrapper{margin:10px 0}.xform-custom-uploader .uploader-action-wrapper .example-pic-wrapper .example-pic-trigger-label{display:inline-block;margin-right:10px;line-height:40px;font-weight:500}.xform-custom-uploader .uploader-action-wrapper .example-pic-wrapper .example-pic-trigger{max-width:40px;max-height:40px;display:inline-block;vertical-align:bottom}.xform-custom-uploader.upload-list-inline .ant-upload-list-item{display:inline-block;width:200px;margin-right:8px}.xform-custom-uploader-popover img{max-width:300px;max-height:300px}");

var CustomUploadWidget = /*#__PURE__*/function (_Component) {
  _inherits(CustomUploadWidget, _Component);

  var _super = _createSuper(CustomUploadWidget);

  function CustomUploadWidget(props) {
    var _this;

    _classCallCheck(this, CustomUploadWidget);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function () {
      _this.setState({
        modalVisible: false,
        url: null
      });
    });

    _this.hubUrl = [];
    _this.handleImageView = _this.handleImageView.bind(_assertThisInitialized(_this));
    _this._customRequest = _this._customRequest.bind(_assertThisInitialized(_this));
    _this._getUrlFormHub = _this._getUrlFormHub.bind(_assertThisInitialized(_this));
    _this.state = {
      fileList: [],
      modalVisible: false,
      url: null
    };
    return _this;
  }

  _createClass(CustomUploadWidget, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var value = this._checkDataUniqueId(this.props.value);

      this.setState({
        fileList: value
      }); // 初始更新ossUrlHub

      this.hubUrl = value.map(function (item) {
        return {
          uid: item.uid,
          name: item.name,
          url: item.url
        };
      });
      var logger = this.props.formContext.logger;
      logger.logEvent('widget', 'show', 'upload');
    } // static getDerivedStateFromProps(nextProps, state) {
    //     if (JSON.stringify(nextProps.value) !== JSON.stringify(state.fileList)) {
    //         let result = [];
    //         // 兼容判断，有些场景初始value写的是‘’
    //         if (Array.isArray(nextProps.value)) {
    //             nextProps.value.map((dataItem) => {
    //                 if (typeof dataItem.uid !== 'undefined') {
    //                     result.push(dataItem);
    //                 } else {
    //                     dataItem.uid = 'rc-upload-' + randomString();
    //                     result.push(dataItem);
    //                 }
    //             });
    //         } 
    //         return {
    //             fileList: result
    //         };
    //     }
    //     return null;
    // }
    // componentDidUpdate(prevProps, prevState) {
    //     const value = this._checkDataUniqueId(this.props.value);
    //         // 更新ossUrlHub
    //         this.hubUrl = value.map((item) => {
    //             return {
    //                 uid: item.uid,
    //                 name: item.name,
    //                 url: item.url
    //             };
    //         });
    // }

  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (JSON.stringify(nextProps.value) !== JSON.stringify(this.props.value)) {
        var value = this._checkDataUniqueId(nextProps.value); // this.setState({
        //     fileList: value
        // });
        // 更新ossUrlHub


        this.hubUrl = value.map(function (item) {
          return {
            uid: item.uid,
            name: item.name,
            url: item.url
          };
        });
      }
    } // 示例图片、上传图片预览

  }, {
    key: "handleImageView",
    value: function handleImageView(url) {
      var _this2 = this;

      var formContext = this.props.formContext;
      var onImagePreview = formContext.onImagePreview;

      if (typeof url !== 'string') {
        return;
      }

      var RouteTable = _$utils.WebAPI.RouteTable;

      _utils.RouteRequest.post(RouteTable.fileExist, {
        url: url
      }).then(function (res) {
        if (res && res.isExist) {
          _this2.setState({
            modalVisible: true,
            url: url
          });
        } else {
          _antd.message.error('文件不存在或已被移除！');
        }
      }); //onImagePreview(url);

    } // 检查传入组件的数据中是不是有uid字段，如果没有uid，要默认生成一个uid

  }, {
    key: "_checkDataUniqueId",
    value: function _checkDataUniqueId(data) {
      var result = []; // 兼容判断，有些场景初始value写的是‘’

      if (Array.isArray(data)) {
        data.map(function (dataItem) {
          if (typeof dataItem.uid !== 'undefined') {
            result.push(dataItem);
          } else {
            dataItem.uid = 'rc-upload-' + randomString();
            result.push(dataItem);
          }
        });
        return result;
      } else {
        return result;
      }
    } //删除图片文件

  }, {
    key: "deleteFile",
    value: function deleteFile(file) {
      var _this$props = this.props,
          formContext = _this$props.formContext,
          options = _this$props.options;
      var customUploadRequest = formContext.customUploadRequest;

      if (file.url) {
        customUploadRequest(file, 'delete');
      }

      ;
    } // 自定义图片上传request（定制上传aliyun OSS用）

  }, {
    key: "_customRequest",
    value: function _customRequest(option) {
      var _this3 = this;

      var _this$props2 = this.props,
          formContext = _this$props2.formContext,
          options = _this$props2.options;
      var customUploadRequest = formContext.customUploadRequest;
      var uploadType = options.uploadType; //判断节点禁用属性

      var disnodes = options.disnodes || null;

      if (formContext.currentNode && Array.isArray(disnodes) && disnodes.indexOf(formContext.currentNode) > -1) {
        return;
      } // 是否指定了自定义上传，如果没有则使用内置的OSS上传


      if (typeof customUploadRequest === 'function') {
        customUploadRequest(option.file, 'upload', uploadType, function (url) {
          var onChange = _this3.props.onChange;
          var fileList = _this3.state.fileList;
          var fieldFormData;
          _this3.hubUrl = _this3.hubUrl.filter(function (item) {
            return item.uid !== option.file.uid;
          });

          _this3.hubUrl.push({
            name: option.file.name,
            uid: option.file.uid,
            url: url
          });

          fieldFormData = fileList.map(function (file) {
            var status = _this3._getUrlFormHub(file) ? 'done' : 'error';
            return {
              name: file.name,
              uid: file.uid,
              status: status,
              url: _this3._getUrlFormHub(file)
            };
          });

          _this3.setState({
            fileList: fieldFormData
          }); // 这个会将传入的值放到Upload组件的file.response里面


          option.onSuccess(url);
          onChange(fieldFormData);
        }, function (e) {
          option.onError(e);
        });
      } else {
        console.warn('[xform]: customUploadRequest props need to be configured before using image/file upload. For more detail, please see customUpload props in Upload component in ant design project');
        var logger = this.props.formContext.logger;
        logger.logException('xform.noCustomUploadRequestProps', false);
      }
    }
  }, {
    key: "_getUrlFormHub",
    value: function _getUrlFormHub(file) {
      var result = '';
      var uid = file.uid;
      this.hubUrl.map(function (hubItem) {
        if (hubItem.uid === uid) {
          result = hubItem.url;
        }
      });
      return result;
    }
  }, {
    key: "_getValidateMessage",
    value: function _getValidateMessage(errorType, validate) {
      var errorMessage = '';
      validate.map(function (validateItem) {
        if (validateItem.type === errorType) {
          errorMessage = validateItem.message;
          return false;
        }
      });
      return errorMessage;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$state = this.state,
          fileList = _this$state.fileList,
          modalVisible = _this$state.modalVisible,
          url = _this$state.url;
      var messages = this.props.formContext && this.props.formContext.messages;
      var schema = this.props.schema;
      var options = this.props.options,
          disabled = this.props.disabled,
          onChange = this.props.onChange; //判断节点禁用属性

      var formContext = this.props.formContext;
      var disnodes = options.disnodes || null;

      if (formContext.currentNode && Array.isArray(disnodes)) {
        if (disnodes.indexOf(formContext.currentNode) > -1) {
          disabled = true;
        }
      } // templateFileUrl表示配置的模板地址，如果该字段非空字符串，则在提交按钮右侧展示“模板”；exampleImageUrl表示配置的示例图片，如果该字段非空字符串，则在字段下面展示“示例图片”


      var _errorType = options._errorType,
          validate = options.validate,
          label = options.label,
          uploadType = options.uploadType,
          vertical = options.vertical,
          listType = options.listType,
          templateFileUrl = options.templateFileUrl,
          exampleImageUrl = options.exampleImageUrl,
          otherOptions = _objectWithoutProperties(options, _excluded);

      var maxFileNum = schema.maxFileNum || Infinity;
      var maxFileSize = schema.maxFileSize || Infinity;

      if (uploadType === 'picture') {
        vertical = true;
        listType = 'picture';
      } else if (uploadType === 'picture-inline') {
        vertical = false;
        listType = 'picture';
      } else if (uploadType === 'picture-card') {
        vertical = true;
        listType = 'picture-card';
      } else {
        vertical = false;
        listType = 'text';
      } //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过


      var validateMessage = '';
      _errorType = _errorType || '';

      if (_errorType !== '' && typeof validate !== 'undefined') {
        validateMessage = this._getValidateMessage(_errorType, validate);
      }

      var uploader = /*#__PURE__*/_react["default"].createElement(_antd.Upload, {
        multiple: true,
        disabled: disabled,
        customRequest: this._customRequest,
        withCredentials: true,
        beforeUpload: function beforeUpload(file, fileList) {
          if (disabled) {
            return;
          }

          var filename = file.name;
          var blacklistExts = ['php', 'js', 'html', 'htm', 'shtml', 'shtm'];
          var current = _this4.state.fileList;
          var ext = filename.slice(filename.lastIndexOf('.') + 1).toLowerCase();
          var project = [".txt", ".dwg", ".doc", ".docx", ".xls", ".xlsx", ".pdf", ".png", ".jpg", ".svg"];

          if (project.indexOf('.' + ext) < 0) {
            _antd.message.error("文件格式无效");

            return false;
          } // 文件的扩展名不能在黑名单里


          if (blacklistExts.indexOf(ext) > -1) {
            _antd.message.error(messages[(0, _localeMessages.getMessageId)('xformUploaderFileCheckMessage')]);

            return false;
          } // 文件数量不能超出最大限制


          if (fileList.length + current.length > maxFileNum) {
            _antd.message.error(messages[(0, _localeMessages.getMessageId)('xformMaxFileNumErrorTip')]);

            return false;
          } // 文件大小不能超过配置


          if (file.size > maxFileSize * 1024 * 1024) {
            _antd.message.error(file.name + messages[(0, _localeMessages.getMessageId)('xformMaxFileSizeErrorTip')] + maxFileSize + 'M');

            return false;
          }

          return true;
        },
        onChange: function onChange(info) {
          if (disabled) {
            return;
          }

          var current = _this4.state.fileList;
          var fileList = info.fileList;
          var file = info.file;
          var filename = file.name;
          fileList.map(function (item) {
            if (item.status == 'done' && item.url == '') {
              item.status = 'error';
            }
          });
          var blacklistExts = ['php', 'js', 'html', 'htm', 'shtml', 'shtm'];
          var ext = filename.slice(filename.lastIndexOf('.') + 1).toLowerCase();
          var project = [".txt", ".dwg", ".doc", ".docx", ".xls", ".xlsx", ".pdf", ".png", ".jpg", ".svg"];

          if (info.file.status === 'error' || info.file.response === '' && info.file.status !== 'removed') {
            _antd.message.error(info.file.name + messages[(0, _localeMessages.getMessageId)('xformUploadErrorTip')]);
          } // 文件数量不能超出最大限制
          // 文件大小不能超过配置
          // 文件扩展名不能在黑名单里


          if (fileList.length > maxFileNum || file.size > maxFileSize * 1024 * 1024 || blacklistExts.indexOf(ext) > -1 || project.indexOf('.' + ext) < 0) {
            _this4.setState({
              fileList: current
            });
          } else {
            _this4.setState({
              fileList: fileList
            });
          }
        },
        onRemove: function onRemove(file) {
          // 如果是字段禁用状态，不允许删除
          if (disabled) {
            return false;
          }

          var fileList = _this4.state.fileList;

          _this4.deleteFile(file);

          var filterFileList = fileList.filter(function (fileItem) {
            return file.uid !== fileItem.uid;
          });

          _this4.setState({
            fileList: filterFileList
          }); // const submitFileList = filterFileList.filter((fileItem) => {
          //     return !(fileItem.originFileObj);
          // });


          onChange(filterFileList);
        },
        onPreview: function onPreview(previewFile) {
          var fileList = _this4.state.fileList;
          var url;
          fileList.map(function (file) {
            if (file.uid === previewFile.uid) {
              url = file.url;
            }
          });

          _this4.handleImageView(url);
        },
        fileList: fileList,
        listType: listType
      }, !disabled && /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
        placement: "top",
        title: messages[(0, _localeMessages.getMessageId)('xformBatchUploadToolTip')]
      }, listType != 'picture-card' ? /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        style: {
          padding: '0 15px'
        },
        type: "ghost",
        disabled: disabled
      }, /*#__PURE__*/_react["default"].createElement(_icons.UploadOutlined, null), label || messages[(0, _localeMessages.getMessageId)('xformBatchUploadDefaultLabel')]) : /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_icons.PlusOutlined, {
        style: {
          display: 'block'
        }
      }), label || messages[(0, _localeMessages.getMessageId)('xformBatchUploadDefaultLabel')])));

      var uploaderActionWrapper = '';

      if (typeof templateFileUrl !== 'undefined' && templateFileUrl.length > 0) {
        if (typeof exampleImageUrl !== 'undefined' && exampleImageUrl.length > 0) {
          uploaderActionWrapper = /*#__PURE__*/_react["default"].createElement("div", {
            className: "uploader-action-wrapper"
          }, uploader, /*#__PURE__*/_react["default"].createElement("a", {
            href: templateFileUrl[0].url,
            className: "template-trigger-link",
            download: templateFileUrl[0].name
          }, messages[(0, _localeMessages.getMessageId)('xformFileTemplateLabel')]), /*#__PURE__*/_react["default"].createElement("div", {
            className: "example-pic-wrapper"
          }, /*#__PURE__*/_react["default"].createElement("p", {
            className: "example-pic-trigger-label"
          }, messages[(0, _localeMessages.getMessageId)('xformExampleImageLabel')]), /*#__PURE__*/_react["default"].createElement(_antd.Popover, {
            content: /*#__PURE__*/_react["default"].createElement("img", {
              src: exampleImageUrl[0].url,
              onClick: function onClick() {
                _this4.handleImageView(exampleImageUrl[0].url);
              }
            }),
            overlayClassName: "xform-custom-uploader-popover",
            arrowPointAtCenter: true
          }, /*#__PURE__*/_react["default"].createElement("img", {
            className: "example-pic-trigger",
            src: exampleImageUrl[0].url,
            onClick: function onClick() {
              _this4.handleImageView(exampleImageUrl[0].url);
            }
          }))));
        } else {
          uploaderActionWrapper = /*#__PURE__*/_react["default"].createElement("div", {
            className: "uploader-action-wrapper"
          }, uploader, /*#__PURE__*/_react["default"].createElement("a", {
            href: templateFileUrl[0].url,
            className: "template-trigger-link",
            download: templateFileUrl[0].name
          }, messages[(0, _localeMessages.getMessageId)('xformFileTemplateLabel')]));
        }
      } else {
        if (typeof exampleImageUrl !== 'undefined' && exampleImageUrl.length > 0) {
          uploaderActionWrapper = /*#__PURE__*/_react["default"].createElement("div", {
            className: "uploader-action-wrapper"
          }, uploader, /*#__PURE__*/_react["default"].createElement("div", {
            className: "example-pic-wrapper"
          }, /*#__PURE__*/_react["default"].createElement("p", {
            className: "example-pic-trigger-label"
          }, messages[(0, _localeMessages.getMessageId)('xformExampleImageLabel')]), /*#__PURE__*/_react["default"].createElement(_antd.Popover, {
            content: /*#__PURE__*/_react["default"].createElement("img", {
              src: exampleImageUrl[0].url,
              onClick: function onClick() {
                _this4.handleImageView(exampleImageUrl[0].url);
              }
            }),
            overlayClassName: "xform-custom-uploader-popover",
            arrowPointAtCenter: true
          }, /*#__PURE__*/_react["default"].createElement("img", {
            className: "example-pic-trigger",
            src: exampleImageUrl[0].url,
            onClick: function onClick() {
              _this4.handleImageView(exampleImageUrl[0].url);
            }
          }))));
        } else {
          uploaderActionWrapper = /*#__PURE__*/_react["default"].createElement("div", {
            className: "uploader-action-wrapper"
          }, uploader);
        }
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          'ant-form-item-control': true,
          'xform-custom-widget': true,
          'xform-custom-uploader': true,
          'upload-list-inline': !vertical,
          'has-error': _errorType !== ''
        })
      }, uploaderActionWrapper, /*#__PURE__*/_react["default"].createElement("div", {
        className: "ant-form-explain"
      }, validateMessage), /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
        visible: modalVisible,
        onOk: this.handleOk,
        onCancel: this.handleCancel,
        width: '68%',
        style: {
          top: 0,
          left: 0,
          padding: 0
        },
        bodyStyle: {
          padding: 0,
          margin: 0,
          overflow: 'scroll',
          height: 'calc(100vh - 54px)'
        },
        height: '66%',
        footer: null
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          textAlign: 'center'
        }
      }, /*#__PURE__*/_react["default"].createElement(_antd.Image, {
        src: url,
        preview: false,
        width: '60%',
        height: '60%'
      }))));
    }
  }]);

  return CustomUploadWidget;
}(_react.Component);
/**
 * generate random string with length of len
 * @param len
 */


exports["default"] = CustomUploadWidget;

function randomString(len) {
  len = len || 16;
  var $firstChars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';
  /* first chars */

  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  /* remove confused chars such as oOLl,9gq,Vv,Uu,I1 */

  var maxPos = $chars.length;
  var pwd = '';

  for (var i = 0; i < len; i++) {
    if (i === 0) {
      pwd += $firstChars.charAt(Math.floor(Math.random() * $firstChars.length));
    } else {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
  }

  return pwd;
}