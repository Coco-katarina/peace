"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 存储流程设计相关参数
 */
var paletteData = /*#__PURE__*/function () {
  function paletteData() {
    _classCallCheck(this, paletteData);

    this.controls = []; // 设计器控件

    this.init();
  }

  _createClass(paletteData, [{
    key: "init",
    value: function init() {
      this.controls = [{
        action: 'create.start-event',
        title: '开始'
      }, // {
      //   action: 'create.intermediate-event',
      //   title: '中间'
      // },
      {
        action: 'create.end-event',
        title: '结束'
      }, {
        action: 'create.exclusive-gateway',
        title: '网关'
      }, {
        action: 'create.task',
        title: '任务'
      }, {
        action: 'create.user-task',
        title: '用户任务'
      }, {
        action: 'create.user-sign-task',
        title: '会签任务'
      } // {
      //   action: 'create.subprocess-expanded',
      //   title: '子流程'
      // },
      // {
      //   action: 'create.data-object',
      //   title: '数据对象'
      // },
      // {
      //   action: 'create.data-store',
      //   title: '数据存储'
      // },
      // {
      //   action: 'create.participant-expanded',
      //   title: '扩展流程'
      // },
      // {
      //   action: 'create.group',
      //   title: '分组'
      // }
      ];
    } //  获取控件配置信息

  }, {
    key: "getControl",
    value: function getControl(action) {
      var result = this.controls.filter(function (item) {
        return item.action === action;
      });
      return result[0] || {};
    }
  }]);

  return paletteData;
}();

exports["default"] = paletteData;