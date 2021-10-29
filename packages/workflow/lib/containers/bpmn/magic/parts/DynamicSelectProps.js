"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _ModelUtil = require("bpmn-js/lib/util/ModelUtil");

var _CmdHelper = _interopRequireDefault(require("@fs-fork/bpmn-js-properties-panel/lib/helper/CmdHelper"));

var _dist = require("min-dom/dist");

var _collection = require("lodash/collection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getData(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms, {
      val: 1
    });
  });
}

function getSelectBox(node) {
  return (0, _dist.query)('select[name=dynamicSelect]', node.parentElement);
}

function getSelect(element) {
  var bo = (0, _ModelUtil.getBusinessObject)(element);
  var selectedOption = bo.get('camunda:dynamicSelect');
  return selectedOption;
}

function setSelect(element, value) {
  var obj = {};
  obj['camunda:dynamicSelect'] = value.dynamicSelect;
  return obj;
}

function _default(group, element) {
  var selectGroup = {
    id: 'dynamicSelect',
    html: '<div class="bpp-row bpp-select">' + '<label for="dynamic-select">动态获取列表</label>' + '<div class="bpp-field-wrapper">' + '<select id="dynamic-select" name="dynamicSelect" data-value>' + '</select>' + '<button class="get-data" id="addElement" data-action="addElement">获取数据</button>' + '</div>' + '</div>',
    get: function get(el) {
      return {
        dynamicSelect: getSelect(el)
      };
    },
    set: function set(el, value) {
      var bo = (0, _ModelUtil.getBusinessObject)(el);
      var props = setSelect(el, value);
      return _CmdHelper["default"].updateBusinessObject(element, bo, props);
    },
    addElement: function addElement(el, inputNode) {
      getData(1000).then(function (value) {
        //console.log('调用成功', value);
        var selectBox = getSelectBox(inputNode);
        (0, _collection.forEach)(selectBox, function () {
          selectBox.removeChild(selectBox.firstChild);
        });

        for (var i = 0; i < 10; i += 1) {
          var optionTemplate = (0, _dist.domify)("<option value=\"".concat(i, "\">").concat(i, "</option>"));
          selectBox.insertBefore(optionTemplate, selectBox.firstChild);
        }

        (0, _collection.forEach)(selectBox, function (option) {
          if (option.value === 0) {
            (0, _dist.attr)(option, 'selected', 'selected');
          } else {
            (0, _dist.attr)(option, 'selected', null);
          }
        });
        return true;
      });
    }
  };
  group.entries.push(selectGroup);
}