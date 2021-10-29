"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildFormSchemaByDataSourceUrl = buildFormSchemaByDataSourceUrl;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//深拷贝
function deepCloneObject(obj) {
  if (_typeof(obj) !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.concat();
  } else {
    return JSON.parse(JSON.stringify(obj));
  }
}

;
/** 
 * 根据jsonSchema中字段的sourceDataUrl属性异步获取数据源数据, 并更新生成更新后的formSchema 
 * @param currentFormSchema 当前sachema
 * @param request 需要使用的请求工具, 默认使用fetch, 不传此参数 则数据源url需要配置完整路径
 * @param params 额外参数 数组 { path, param } 例如： {'user','id=1'}
 * @return Promise
 */

function buildFormSchemaByDataSourceUrl(currentFormSchema, request) {
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return new Promise(function (resolve, reject) {
    var dataUrls = [];
    var formSchema = deepCloneObject(currentFormSchema);
    var formProperties = formSchema.jsonSchema && formSchema.jsonSchema.properties;

    for (var p in formProperties) {
      if (formProperties[p].type == 'object' || formProperties[p].type == 'array') {
        //处理分组
        var groupProperties = formProperties[p].hasOwnProperty('items') ? formProperties[p].items.properties : formProperties[p].properties || {};

        for (var gp in groupProperties) {
          if (groupProperties[gp].dataSourceUrl) {
            (function () {
              var url = groupProperties[gp].dataSourceUrl;
              var connector = url.indexOf('?') === -1 ? '?' : '&';
              var hasParam = params.find(function (v) {
                return v.path === url;
              });
              var newUrl = hasParam ? "".concat(url).concat(connector, "source=EMIS&").concat(hasParam.param) : "".concat(url).concat(connector, "source=EMIS");

              if (type) {
                newUrl = "".concat(newUrl, "&type=").concat(type);
              }

              dataUrls.push({
                name: gp,
                url: newUrl,
                key: newUrl
              });
            })();
          }
        }
      }

      if (formProperties[p].dataSourceUrl) {
        (function () {
          var url = formProperties[p].dataSourceUrl;
          var connector = url.indexOf('?') === -1 ? '?' : '&';
          var hasParam = params.find(function (v) {
            return v.path === url;
          });
          var newUrl = hasParam ? "".concat(url).concat(connector, "source=EMIS&").concat(hasParam.param) : "".concat(url).concat(connector, "source=EMIS");

          if (type) {
            newUrl = "".concat(newUrl, "&type=").concat(type);
          }

          dataUrls.push({
            name: p,
            url: newUrl,
            key: newUrl
          });
        })();
      }
    }

    if (dataUrls.length > 0) {
      var promiseArr = [];
      var uniqueDataUrls = [];
      var repeatDataUrls = [];

      for (var i = 0; i < dataUrls.length; i++) {
        if (!uniqueDataUrls.filter(function (item) {
          return item.key === dataUrls[i].key;
        }).length) {
          uniqueDataUrls.push(dataUrls[i]);
        } else {
          repeatDataUrls.push(dataUrls[i]);
        }
      }

      uniqueDataUrls.forEach(function (val) {
        var connector = val.url.indexOf('?') === -1 ? '?' : '&';
        promiseArr.push(request ? request.get("".concat(val.url).concat(connector, "_ts_=").concat(_moment["default"].now())).then(function (data) {
          return data;
        }) : fetch(val.url).then(function (res) {
          return res.json();
        }));
      });
      Promise.all(promiseArr).then(function (sourceData) {
        var uniqueData = [];
        uniqueDataUrls.forEach(function (val, idx) {
          var formFields = {}; //debugger;

          Object.keys(formProperties).forEach(function (key) {
            var it = formProperties[key];

            if (it.type === 'object' && it.properties) {
              Object.keys(it.properties).forEach(function (k) {
                formFields[k] = it.properties[k];

                if (formSchema.uiSchema[key][k]['ui:widget'] == "Stamp") {
                  formFields[k].key = "stampData";
                } else if (formSchema.uiSchema[key][k]['ui:widget'] == "Transfer") {
                  formFields[k].key = "transferData";
                } else if (formSchema.uiSchema[key][k]['ui:widget'] == "treeSelect") {
                  formFields[k].key = "treeSelectData";
                } else if (formSchema.uiSchema[key][k]['ui:widget'] == "TableSelect") {
                  formFields[k].key = "tableData";
                }
              });
            } else if (it.type === 'array' && it.items && it.items.properties) {
              Object.keys(it.items.properties).forEach(function (k) {
                formFields[k] = it.items.properties[k];

                if (formSchema.uiSchema[key].items[k]['ui:widget'] == "Stamp") {
                  formFields[k].key = "stampData";
                } else if (formSchema.uiSchema[key].items[k]['ui:widget'] == "Transfer") {
                  formFields[k].key = "transferData";
                } else if (formSchema.uiSchema[key].items[k]['ui:widget'] == "treeSelect") {
                  formFields[k].key = "treeSelectData";
                } else if (formSchema.uiSchema[key].items[k]['ui:widget'] == "TableSelect") {
                  formFields[k].key = "tableData";
                }
              });
            } else {
              formFields[key] = it;

              if (formSchema.uiSchema[key]['ui:widget'] == "Stamp") {
                formFields[key].key = "stampData";
              } else if (formSchema.uiSchema[key]['ui:widget'] == "Transfer") {
                formFields[key].key = "transferData";
              } else if (formSchema.uiSchema[key]['ui:widget'] == "treeSelect") {
                formFields[key].key = "treeSelectData";
              } else if (formSchema.uiSchema[key]['ui:widget'] == "TableSelect") {
                formFields[key].key = "tableData";
              }
            }
          });
          var formField = formFields[val.name];
          var items = formField.type === 'string' ? formField : formField.items;
          uniqueData.push({
            key: val.url,
            sourceData: sourceData[idx]
          });

          if (items.key == "stampData") {
            items.stampData = sourceData[idx].data;
          } else if (items.key == "transferData") {
            items.transferData = sourceData[idx];
          } else if (items.key == "treeSelectData") {
            items.treeSelectData = sourceData[idx];
          } else if (items.key == "tableData") {
            items.tableData = sourceData[idx];
          } else {
            items["enum"] = sourceData[idx].map(function (i) {
              return i.value;
            });
            items.enumNames = sourceData[idx].map(function (i) {
              return i.label;
            });
          }
        }); //加上之前被去重的项

        repeatDataUrls.forEach(function (val, idx) {
          var formFields = {};
          Object.keys(formProperties).forEach(function (key) {
            var it = formProperties[key];

            if (it.type === 'object' && it.properties) {
              Object.keys(it.properties).forEach(function (k) {
                formFields[k] = it.properties[k];

                if (formSchema.uiSchema[key][k]['ui:widget'] == "Stamp") {
                  formFields[k].key = "stampData";
                } else if (formSchema.uiSchema[key][k]['ui:widget'] == "Transfer") {
                  formFields[k].key = "transferData";
                } else if (formSchema.uiSchema[key][k]['ui:widget'] == "treeSelect") {
                  formFields[k].key = "treeSelectData";
                } else if (formSchema.uiSchema[key][k]['ui:widget'] == "TableSelect") {
                  formFields[k].key = "tableData";
                }
              });
            } else if (it.type === 'array' && it.items && it.items.properties) {
              Object.keys(it.items.properties).forEach(function (k) {
                formFields[k] = it.items.properties[k];

                if (formSchema.uiSchema[key].items[k]['ui:widget'] == "Stamp") {
                  formFields[k].key = "stampData";
                } else if (formSchema.uiSchema[key].items[k]['ui:widget'] == "Transfer") {
                  formFields[k].key = "transferData";
                } else if (formSchema.uiSchema[key].items[k]['ui:widget'] == "treeSelect") {
                  formFields[k].key = "treeSelectData";
                } else if (formSchema.uiSchema[key].items[k]['ui:widget'] == "TableSelect") {
                  formFields[k].key = "tableData";
                }
              });
            } else {
              formFields[key] = it;

              if (formSchema.uiSchema[key]['ui:widget'] == "Stamp") {
                formFields[key].key = "stampData";
              } else if (formSchema.uiSchema[key]['ui:widget'] == "Transfer") {
                formFields[key].key = "transferData";
              } else if (formSchema.uiSchema[key]['ui:widget'] == "treeSelect") {
                formFields[key].key = "treeSelectData";
              } else if (formSchema.uiSchema[key]['ui:widget'] == "TableSelect") {
                formFields[key].key = "tableData";
              }
            }
          });
          var formField = formFields[val.name];
          var items = formField.type === 'string' ? formField : formField.items;
          var repeatData = uniqueData.filter(function (item) {
            return val.key == item.key;
          })[0].sourceData;

          if (items.key == "stampData") {
            items.stampData = repeatData.data;
          } else if (items.key == "transferData") {
            items.transferData = repeatData;
          } else if (items.key == "treeSelectData") {
            items.treeSelectData = repeatData;
          } else if (items.key == "tableData") {
            items.treeSelectData = repeatData;
          } else {
            items["enum"] = repeatData.map(function (i) {
              return i.value;
            });
            items.enumNames = repeatData.map(function (i) {
              return i.label;
            });
          }
        });
        resolve(deepCloneObject(formSchema), sourceData);
      })["catch"](function (err) {
        console.log(err);
        reject(err);
      });
    } else {
      resolve(deepCloneObject(currentFormSchema));
    }
  });
}