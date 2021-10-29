"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antdMobile = require("antd-mobile");

var _antd = require("antd");

var _icons = require("@ant-design/icons");

var _classnames = _interopRequireDefault(require("classnames"));

var _util = _interopRequireDefault(require("../util"));

var _localeMessages = require("../i18n/localeMessages");

var _$utils = require("$utils");

var _utils = require("@peace/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
})("85c80be9afe26077d9abdce10aef5ec9", ".xform-custom-upload .example-link{color:#1890ff}.xform-custom-upload .am-list-line .am-list-content{width:100px;max-width:100px;margin-right:10px}.xform-custom-upload .am-list-line .am-list-extra{flex:1;-webkit-flex:1}.xform-custom-upload .am-flexbox{overflow:visible;flex-wrap:wrap}.xform-custom-upload.disabled .am-list-content,.xform-custom-upload.disabled .am-list-extra{color:#bbb}.xform-image-preview-modal{width:100%!important}.xform-image-preview-modal .xform-image-preview-wrapper img{max-width:100%;max-height:100%}.upload{position:relative;display:flex;padding:12.5px 0 12.5px 20px;min-height:44px;background-color:#fff;vertical-align:middle;overflow:hidden;transition:background-color .2s}.upload .upload-label{color:#000;font-size:14px;margin-left:0;margin-right:5px;text-align:left;white-space:nowrap;overflow:hidden;padding:2px 0;width:30%}.upload .upload-content{width:160px;padding:5px 0}");

var ListItem = _antdMobile.List.Item;

var CustomUploadWidget = /*#__PURE__*/function (_Component) {
  _inherits(CustomUploadWidget, _Component);

  var _super = _createSuper(CustomUploadWidget);

  function CustomUploadWidget(props) {
    var _this;

    _classCallCheck(this, CustomUploadWidget);

    _this = _super.call(this, props);
    _this.hubUrl = [];
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.customUpload = _this.customUpload.bind(_assertThisInitialized(_this));
    _this.handleImagePreview = _this.handleImagePreview.bind(_assertThisInitialized(_this));
    _this.onModalClose = _this.onModalClose.bind(_assertThisInitialized(_this));
    _this._getUrlFormHub = _this._getUrlFormHub.bind(_assertThisInitialized(_this));
    _this._customRequest = _this._customRequest.bind(_assertThisInitialized(_this));
    _this.state = {
      modalVisible: false,
      previewImageUrl: '',
      previewTxtUrl: '',
      isImage: true,
      fileList: []
    };
    return _this;
  }

  _createClass(CustomUploadWidget, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var value = this._checkDataUniqueId(this.props.value);

      this.setState({
        fileList: value
      });
      this.hubUrl = value.map(function (item) {
        return {
          uid: item.uid,
          name: item.name,
          url: item.url
        };
      });
      var logger = this.props.formContext.logger;
      logger.logEvent('widget', 'show', 'upload');
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (JSON.stringify(nextProps.value) !== JSON.stringify(this.props.value)) {
        var value = this._checkDataUniqueId(nextProps.value);

        this.setState({
          fileList: value
        });
        this.hubUrl = value.map(function (item) {
          return {
            uid: item.uid,
            name: item.name,
            url: item.url
          };
        });
      }
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
            dataItem.uid = 'rc-upload-' + _util["default"].randomString();
            result.push(dataItem);
          }
        });
        return result;
      } else {
        return result;
      }
    } // 自定义图片上传request（移动端因为涉及到容器的不同，导致不方便集中统一处理上传，故移动端场景必须指定customUploadRequest属性）

  }, {
    key: "onChange",
    value: function onChange(files) {
      var _this2 = this;

      var _this$props = this.props,
          onChange = _this$props.onChange,
          formContext = _this$props.formContext;
      var customUploadRequest = formContext.customUploadRequest;
      var fileList = this.state.fileList;
      var uploadFiles = [];
      var _this$props$options = this.props.options,
          maxFileNum = _this$props$options.maxFileNum,
          maxFileSize = _this$props$options.maxFileSize;
      uploadFiles = files.filter(function (file) {
        return _typeof(file.file) === 'object';
      });

      if (uploadFiles && uploadFiles.length > 0) {
        // 添加上传
        customUploadRequest(uploadFiles, {
          maxFileNum: maxFileNum,
          maxFileSize: maxFileSize,
          currentFileNum: fileList.length
        }, function (urls) {
          urls.map(function (url) {
            fileList.push(_this2.fileListConvertor({
              id: 'rc-upload-' + _util["default"].randomString(),
              url: url
            }));

            _this2.setState({
              fileList: fileList
            }); // 这里react-jsonschema-form的onChange没有对formData进行deepClone会导致组件刷新失败，这里必须要自己进行deepClone。参见https://github.com/mozilla-services/react-jsonschema-form/blob/master/src/components/Form.js#L101


            onChange(fileList.map(function (item) {
              return _this2.fileListConvertor(item);
            }));
          });
        });
      } else {
        // 删除上传后的图片
        this.setState({
          fileList: files
        });
        onChange(files.map(function (item) {
          return _this2.fileListConvertor(item);
        }));
      }
    }
  }, {
    key: "_customRequest",
    value: function _customRequest(option) {
      var _this3 = this;

      var _this$props2 = this.props,
          formContext = _this$props2.formContext,
          options = _this$props2.options;
      var customUploadRequest = formContext.customUploadRequest;
      var uploadType = options.uploadType;
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
          var status = _this3._getUrlFormHub(file) ? file.status : 'error';
          return {
            name: file.name,
            uid: file.uid,
            status: status,
            url: _this3._getUrlFormHub(file)
          };
        });

        _this3.setState({
          fileList: fieldFormData
        });

        option.onSuccess(url);
        onChange(fieldFormData);
      }, function (e) {
        option.onError(e);
      });
    } //删除图片文件

  }, {
    key: "deleteFile",
    value: function deleteFile(file) {
      var _this$props3 = this.props,
          formContext = _this$props3.formContext,
          options = _this$props3.options;
      var customUploadRequest = formContext.customUploadRequest;

      if (file.url) {
        customUploadRequest(file, 'delete');
      }

      ;
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
    } // 自定义图片上传（这里只暴露一个点击上传的trigger，图片选择、图片上传都交由业务自定义，主要用于钉钉这样的将图片选择和图片上传都进行了封装的Bridge的场景）

  }, {
    key: "customUpload",
    value: function customUpload(event) {
      var _this4 = this;

      // 阻止input[type=file]的原生选择图片操作
      event.preventDefault();
      var formContext = this.props.formContext;
      var customUpload = formContext.customUpload;
      var onChange = this.props.onChange;
      var _this$props$options2 = this.props.options,
          maxFileNum = _this$props$options2.maxFileNum,
          maxFileSize = _this$props$options2.maxFileSize;
      var fileList = this.state.fileList;
      customUpload({
        maxFileNum: maxFileNum,
        maxFileSize: maxFileSize,
        currentFileNum: fileList.length
      }, function (urls) {
        urls.map(function (url) {
          fileList.push(_this4.fileListConvertor({
            id: 'rc-upload-' + _util["default"].randomString(),
            url: url
          }));
        });
        onChange(fileList);
        return false;
      });
    } // 兼容PC antd fileList数据格式，将该数据格式转换成imagePicker组件支持的格式

  }, {
    key: "getImagePickerFileList",
    value: function getImagePickerFileList(fileList) {
      return fileList.map(function (item) {
        return {
          id: item.uid,
          url: item.url
        };
      });
    } // ant mobile组件数据格式转回antd 的fileList数据格式

  }, {
    key: "fileListConvertor",
    value: function fileListConvertor(file) {
      return {
        uid: file.id,
        status: 'done',
        name: file.name || '来自移动端的图片',
        url: file.url
      };
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
    } // 根据options中的validate字段判断是否必填

  }, {
    key: "_isFieldRequired",
    value: function _isFieldRequired(validate) {
      var isFieldRequired = false;
      validate.map(function (validateItem) {
        if (validateItem.type === 'empty') {
          isFieldRequired = true;
        }
      });
      return isFieldRequired;
    }
  }, {
    key: "handleImagePreview",
    value: function handleImagePreview(url) {
      var _this5 = this;

      var RouteTable = _$utils.WebAPI.RouteTable;

      _utils.RouteRequest.post(RouteTable.fileExist, {
        url: url
      }).then(function (res) {
        if (res && res.isExist) {
          var index = url.lastIndexOf('.');
          var type = url.substring(index, url.length);

          if ([".png", ".jpg", ".svg"].find(function (v) {
            return v === type;
          })) {
            _this5.setState({
              modalVisible: true,
              previewImageUrl: url,
              isImage: true
            });
          } else if (type === '.txt') {
            _this5.setState({
              modalVisible: true,
              previewTxtUrl: url,
              isImage: false
            });
          } else {
            window.open(url);
          }
        } else {
          _antd.message.error('文件不存在或已被移除！');
        }
      });
    }
  }, {
    key: "onWrapTouchStart",
    value: function onWrapTouchStart(e) {
      // fix touch to scroll background page on iOS
      if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
        return;
      }

      var pNode = closest(e.target, '.am-modal-content');

      if (!pNode) {
        e.preventDefault();
      }
    }
  }, {
    key: "onModalClose",
    value: function onModalClose() {
      this.setState({
        modalVisible: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$state = this.state,
          modalVisible = _this$state.modalVisible,
          previewImageUrl = _this$state.previewImageUrl,
          previewTxtUrl = _this$state.previewTxtUrl,
          isImage = _this$state.isImage;
      var messages = this.props.formContext && this.props.formContext.messages;

      var options = _extends({}, this.props.options); // exampleImageUrl表示示例图片，为方便扩展，定义为数组，目前仅支持一张示例图片
      //const exampleImages = options.exampleImageUrl;
      //const hasExampleImage = exampleImages && exampleImages.length > 0;
      //const exampleImageUrl = hasExampleImage ? exampleImages[0].url : '';


      var schema = this.props.schema; // react-jsonschema-form组件对于array类型的字段会丢失掉required这个props，只能通过自己的逻辑判断来补齐这个逻辑

      var required = false;

      if (typeof options.validate !== 'undefined') {
        required = this._isFieldRequired(options.validate);
      }

      var value = this.props.value,
          disabled = this.props.disabled,
          readonly = this.props.readonly,
          onChange = this.props.onChange; // //判断节点禁用属性

      var formContext = this.props.formContext;
      var disnodes = options.disnodes || null;

      if (formContext.currentNode && Array.isArray(disnodes)) {
        if (disnodes.indexOf(formContext.currentNode) > -1) {
          disabled = true;
        }
      }

      var customUploadRequest = formContext.customUploadRequest,
          customUpload = formContext.customUpload;
      var maxFileNum = schema.maxFileNum || 9999;
      var maxFileSize = schema.maxFileSize || 9999;
      var files = this.getImagePickerFileList(value); //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过

      var validateMessage = '';

      var _errorType = options._errorType || '';

      if (_errorType !== '' && typeof options.validate !== 'undefined') {
        validateMessage = this._getValidateMessage(_errorType, options.validate);
      }

      if (typeof customUploadRequest === 'function') {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: (0, _classnames["default"])({
            'xform-custom-widget': true,
            'xform-custom-upload': true,
            'xform-item-has-error': _errorType !== '',
            disabled: disabled
          })
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "upload"
        }, /*#__PURE__*/_react["default"].createElement("label", {
          className: (0, _classnames["default"])({
            required: required
          }) + ' upload-label'
        }, schema.title), /*#__PURE__*/_react["default"].createElement(_antd.Upload //listType="picture"
        , {
          className: "upload-content",
          disabled: disabled || readonly,
          beforeUpload: function beforeUpload(file, fileList) {
            if (disabled || readonly) {
              return;
            }

            var filename = file.name;
            var blacklistExts = ['php', 'js', 'html', 'htm', 'shtml', 'shtm'];
            var current = _this6.state.fileList;
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
            if (disabled || readonly) {
              return;
            }

            var current = _this6.state.fileList;
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
              _this6.setState({
                fileList: current
              });
            } else {
              _this6.setState({
                fileList: fileList
              });
            }
          },
          onRemove: function onRemove(file) {
            // 如果是字段禁用状态，不允许删除
            if (disabled || readonly) {
              return false;
            }

            var fileList = _this6.state.fileList;

            _this6.deleteFile(file);

            var filterFileList = fileList.filter(function (fileItem) {
              return file.uid !== fileItem.uid;
            });

            _this6.setState({
              fileList: filterFileList
            }); // const submitFileList = filterFileList.filter((fileItem) => {
            //     return !(fileItem.originFileObj);
            // });


            onChange(filterFileList);
          },
          onPreview: function onPreview(previewFile) {
            var fileList = _this6.state.fileList;
            var url;
            fileList.map(function (file) {
              if (file.uid === previewFile.uid) {
                url = file.url;
              }
            });

            _this6.handleImagePreview(url);
          },
          customRequest: this._customRequest,
          fileList: this.state.fileList
        }, disabled || readonly ? null : /*#__PURE__*/_react["default"].createElement(_antd.Button, {
          style: {
            padding: '2px 5px'
          }
        }, /*#__PURE__*/_react["default"].createElement(_icons.UploadOutlined, null), options.label || messages[(0, _localeMessages.getMessageId)('xformBatchUploadDefaultLabel')]))), /*#__PURE__*/_react["default"].createElement(_antdMobile.Modal, {
          visible: modalVisible,
          title: "",
          transparent: true,
          animationType: "fade",
          maskClosable: true,
          onClose: this.onModalClose,
          footer: [],
          className: "xform-image-preview-modal",
          wrapProps: {
            onTouchStart: this.onWrapTouchStart
          }
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "xform-image-preview-wrapper"
        }, isImage ? /*#__PURE__*/_react["default"].createElement("img", {
          src: previewImageUrl,
          onTouchStart: this.onModalClose
        }) : /*#__PURE__*/_react["default"].createElement("iframe", {
          src: previewTxtUrl,
          width: "100%",
          height: "300",
          frameborder: "0"
        }))), /*#__PURE__*/_react["default"].createElement("div", {
          className: "xform-item-error-explain"
        }, validateMessage));
      } // } else if (typeof customUpload === 'function') {
      //     return (
      //         <div className={classnames({
      //             'xform-custom-widget': true,
      //             'xform-custom-upload': true,
      //             'xform-item-has-error': _errorType !== '',
      //             disabled
      //         })}>
      //             <ListItem
      //                 wrap
      //                 multipleLine
      //                 error={_errorType !== ''}
      //                 extra={hasExampleImage ? <a href="javascript:;" className="example-link" onClick={() => {
      //                     this.handleImagePreview(exampleImageUrl);
      //                 }}>{messages[getMessageId('xformUploaderExampleLink')]}</a> : null}
      //             ><label className={classnames({
      //                 required: required
      //             })}>{schema.title}</label></ListItem>
      //             <ListItem
      //                 extra={(
      //                     <ImagePicker
      //                         files={files}
      //                         selectable={files.length < maxFileNum && !disabled && !readonly}
      //                         multiple
      //                         onAddImageClick={this.customUpload}
      //                         onChange={(files) => {
      //                             onChange(files.map((item) => {
      //                                 return this.fileListConvertor(item);
      //                             }));
      //                         }}
      //                         onImageClick={(index, files) => {
      //                             const url = files[index].url;
      //                             this.handleImagePreview(url);
      //                         }}
      //                     />
      //                 )}
      //             />
      //             <Modal
      //                 visible={modalVisible}
      //                 title=""
      //                 transparent
      //                 animationType="fade"
      //                 maskClosable
      //                 onClose={this.onModalClose}
      //                 footer={[]}
      //                 className="xform-image-preview-modal"
      //                 wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      //             >
      //                 <div className="xform-image-preview-wrapper">
      //                     <img src={previewImageUrl} onTouchStart={this.onModalClose} />
      //                 </div>
      //             </Modal>
      //             <div className="xform-item-error-explain">{validateMessage}</div>
      //         </div>
      //     );
      // } 
      else {
        //console.warn('xform: 移动端必须自己实现图片上传属性customUploadRequest或customUpload！');
        console.warn('xform: 移动端必须自己实现图片上传属性customUploadRequest！');
        return null;
      }
    }
  }]);

  return CustomUploadWidget;
}(_react.Component);

exports["default"] = CustomUploadWidget;

function closest(el, selector) {
  var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }

    el = el.parentElement;
  }

  return null;
}