"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = LangConfigPopover;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _classnames = _interopRequireDefault(require("classnames"));

var _he = _interopRequireDefault(require("he"));

var _localeMessages = require("../../i18n/localeMessages");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 编辑器顶部操作栏：语言配置相关浮层
 * @props: visible（popover是否显示） langConfig（当前的多语言配置，值的数据结构为：    {
        "langs": [{
            "name": "English",
            "locale": "en-US",
            "enabled": true
        }, ...],
        "defaultLang": "en-US",
        "currentLang": "en-US"
    }
用来控制当前的多语言配置值） langConfigChangeHandler（多语言配置切换处理回调方法） langConfigVisibleChangeHandler（popover的onVisibleChange处理器）
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
})("4cda05da590e38d67732aabb19abdd63", ".app-xform-builder-lang-config-popover{z-index:1000!important}.app-xform-builder-lang-config-popover .ant-popover-inner-content{padding:0!important}.app-xform-builder-lang-config-popover .lang-config-table{color:rgba(0,0,0,.65);font-size:14px}.app-xform-builder-lang-config-popover .lang-config-table .lang-name-cell .hidden{display:none}.app-xform-builder-lang-config-popover .lang-config-table .lang-name-cell .default{margin-left:5px;font-size:12px;color:#999}.app-xform-builder-lang-config-popover .lang-config-table .lang-name-cell .default i{color:#52c41a;vertical-align:middle;font-size:14px}.app-xform-builder-lang-config-popover .lang-config-table .lang-name-cell .current{margin-left:5px;font-size:12px;color:#f5a623}.app-xform-builder-lang-config-popover .lang-config-table .lang-action-cell a{margin-right:15px}.app-xform-builder-lang-config-popover .lang-config-table .lang-action-cell a.not-allow{cursor:not-allowed;color:#999}");

function LangConfigPopover(props) {
  var visible = props.visible,
      langConfig = props.langConfig,
      messages = props.messages,
      langConfigChangeHandler = props.langConfigChangeHandler,
      langConfigVisibleChangeHandler = props.langConfigVisibleChangeHandler,
      popupContainer = props.popupContainer,
      children = props.children; // 格式化langConfig数据使其适用于渲染Table

  var tableDataSource = langConfig.langs.map(function (lang) {
    if (lang.locale === langConfig.defaultLang) {
      lang["default"] = true;
    } else {
      lang["default"] = false;
    }

    if (lang.locale === langConfig.currentLang) {
      lang.current = true;
    } else {
      lang.current = false;
    }

    return lang;
  });
  var tableColumns = [{
    title: messages[(0, _localeMessages.getMessageId)('xformLangConfigEnableLabel')],
    dataIndex: 'enabled',
    key: 'enabled',
    render: function render(value, record) {
      var changedLocale = record.locale;
      var changedLangConfig = JSON.parse(JSON.stringify(langConfig));
      return /*#__PURE__*/_react["default"].createElement(_antd.Switch, {
        checked: value,
        onChange: function onChange(checked) {
          changedLangConfig.langs = langConfig.langs.map(function (lang) {
            if (lang.locale === changedLocale) {
              lang.enabled = checked;
            }

            return lang;
          });
          langConfigChangeHandler(changedLangConfig);
        }
      });
    }
  }, {
    title: messages[(0, _localeMessages.getMessageId)('xformLangConfigLangNameLabel')],
    dataIndex: 'name',
    key: 'name',
    render: function render(localeName, record) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "lang-name-cell"
      }, /*#__PURE__*/_react["default"].createElement("span", null, _he["default"].decode(localeName)), /*#__PURE__*/_react["default"].createElement("span", {
        className: (0, _classnames["default"])({
          "default": true,
          hidden: !record["default"]
        })
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "xform-iconfont"
      }, "\uE968"), messages[(0, _localeMessages.getMessageId)('xformLangConfigDefaultLangTip')]), /*#__PURE__*/_react["default"].createElement("span", {
        className: (0, _classnames["default"])({
          current: true,
          hidden: !record.current
        })
      }, messages[(0, _localeMessages.getMessageId)('xformLangConfigCurrentLangTip')]));
    }
  }, {
    title: messages[(0, _localeMessages.getMessageId)('xformLangConfigOperationLabel')],
    dataIndex: 'action',
    key: 'action',
    render: function render(value, record) {
      var changedLocale = record.locale;
      var changedLangConfig = JSON.parse(JSON.stringify(langConfig));
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: "lang-action-cell"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        href: "#",
        className: (0, _classnames["default"])({
          'not-allow': record.current
        }),
        onClick: function onClick(event) {
          event.preventDefault();

          if (record.current) {
            return;
          } // 在切换当前语言要让用户二次确认是否这样操作


          _antd.Modal.confirm({
            title: messages[(0, _localeMessages.getMessageId)('xformChangeLangConfirmTitle')],
            content: messages[(0, _localeMessages.getMessageId)('xformChangeLangConfirmContent')],
            getContainer: popupContainer,
            onOk: function onOk() {
              changedLangConfig.currentLang = changedLocale;
              langConfigChangeHandler(changedLangConfig, true);
            }
          });
        }
      }, messages[(0, _localeMessages.getMessageId)('xformLangConfigSwitchLangOperation')]), /*#__PURE__*/_react["default"].createElement("a", {
        href: "#",
        className: (0, _classnames["default"])({
          'not-allow': record["default"] || !record.enabled
        }),
        onClick: function onClick(event) {
          event.preventDefault();

          if (record["default"] || !record.enabled) {
            return;
          }

          changedLangConfig.defaultLang = changedLocale;
          langConfigChangeHandler(changedLangConfig);
        }
      }, messages[(0, _localeMessages.getMessageId)('xformLangConfigSwitchDefaultOperation')]));
    }
  }];
  return /*#__PURE__*/_react["default"].createElement(_antd.Popover, {
    title: "",
    overlayClassName: "app-xform-builder-lang-config-popover",
    overlayStyle: {
      zIndex: 1000
    },
    content: /*#__PURE__*/_react["default"].createElement(_antd.Table, {
      rowKey: "locale",
      className: "lang-config-table",
      columns: tableColumns,
      dataSource: tableDataSource,
      pagination: false
    }),
    visible: visible,
    onVisibleChange: langConfigVisibleChangeHandler,
    trigger: "click",
    placement: "bottomLeft",
    getPopupContainer: popupContainer
  }, children);
}

LangConfigPopover.propTypes = {
  visible: _propTypes["default"].bool.isRequired,
  langConfig: _propTypes["default"].shape({
    langs: _propTypes["default"].array.isRequired,
    defaultLang: _propTypes["default"].string.isRequired,
    currentLang: _propTypes["default"].string.isRequired
  }),
  langConfigChangeHandler: _propTypes["default"].func.isRequired,
  langConfigVisibleChangeHandler: _propTypes["default"].func.isRequired,
  popupContainer: _propTypes["default"].func.isRequired
};