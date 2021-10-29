/*
 * @Author: renxuan 
 * @Date: 2020-06-11 13:51:40 
 * @Email: cm92ZWxhc3RAZ21haWwuY29t 
 * @Info: There is no BUG here!   
 */
import moment from 'moment';
//深拷贝
function deepCloneObject(obj) {
  if (typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.concat();
  } else {
    return JSON.parse(JSON.stringify(obj));
  }
};


/** 
 * 根据jsonSchema中字段的sourceDataUrl属性异步获取数据源数据, 并更新生成更新后的formSchema 
 * @param currentFormSchema 当前sachema
 * @param request 需要使用的请求工具, 默认使用fetch, 不传此参数 则数据源url需要配置完整路径
 * @param params 额外参数 数组 { path, param } 例如： {'user','id=1'}
 * @return Promise
 */
function buildFormSchemaByDataSourceUrl(currentFormSchema, request, params=[],type = null) {
  return new Promise((resolve, reject) => {
    let dataUrls = []
    let formSchema = deepCloneObject(currentFormSchema);
    let formProperties = formSchema.jsonSchema && formSchema.jsonSchema.properties;
    for (let p in formProperties) {
      if (formProperties[p].type == 'object' || formProperties[p].type == 'array') {
        //处理分组
        let groupProperties = formProperties[p].hasOwnProperty('items') ? formProperties[p].items.properties : formProperties[p].properties || {};
        
        for (let gp in groupProperties) {
          if (groupProperties[gp].dataSourceUrl) {
            let url = groupProperties[gp].dataSourceUrl;
            let connector = url.indexOf('?') === -1 ? '?' : '&';
            let hasParam = params.find(v=> v.path === url);
            let newUrl = hasParam ? `${url}${connector}source=EMIS&${hasParam.param}` : `${url}${connector}source=EMIS`;
            if(type){
              newUrl = `${newUrl}&type=${type}`;
            }
            dataUrls.push({
              name: gp,
              url: newUrl,
              key: newUrl
            })
          }
        }
      }
      if (formProperties[p].dataSourceUrl) {
        let url = formProperties[p].dataSourceUrl;
        let connector = url.indexOf('?') === -1 ? '?' : '&';
        let hasParam = params.find(v=> v.path === url);
        let newUrl = hasParam ? `${url}${connector}source=EMIS&${hasParam.param}` : `${url}${connector}source=EMIS`;
        if(type){
          newUrl = `${newUrl}&type=${type}`;
        }
        dataUrls.push({
          name: p,
          url: newUrl,
          key: newUrl
        })

      }
    }
   
    if (dataUrls.length > 0) {
      let promiseArr = [];
      let uniqueDataUrls = [];
      let repeatDataUrls = [];
      for (var i = 0; i < dataUrls.length; i++) {
        if (!uniqueDataUrls.filter(item => item.key === dataUrls[i].key).length) {
          uniqueDataUrls.push(dataUrls[i])
        } else {
          repeatDataUrls.push(dataUrls[i])
        }
      }
      uniqueDataUrls.forEach(val => {
        let connector = val.url.indexOf('?') === -1 ? '?' : '&';
        promiseArr.push(request ?
          request.get(`${val.url}${connector}_ts_=${moment.now()}`)
            .then(data => {
              return data;
            })
          : fetch(val.url).then(res => res.json()))
      })
      Promise.all(promiseArr).then(sourceData => {
        let uniqueData = [];
        uniqueDataUrls.forEach((val, idx) => {
          let formFields = {}
          //debugger;
          Object.keys(formProperties).forEach(key => {
            let it = formProperties[key];
            if (it.type === 'object' && it.properties) {
             
              Object.keys(it.properties).forEach(k => {
                formFields[k] = it.properties[k]
                if (formSchema.uiSchema[key][k]['ui:widget'] == "Stamp") {
                  formFields[k].key = "stampData";
                } else if (formSchema.uiSchema[key][k]['ui:widget'] == "Transfer") {
                  formFields[k].key = "transferData";
                }else if (formSchema.uiSchema[key][k]['ui:widget'] == "treeSelect") {
                  formFields[k].key = "treeSelectData";
                }else if (formSchema.uiSchema[key][k]['ui:widget'] == "TableSelect") {
                  formFields[k].key = "tableData";
                }
              })
            }else if (it.type === 'array' && it.items && it.items.properties) {
              Object.keys(it.items.properties).forEach(k => {
                formFields[k] = it.items.properties[k]
                if (formSchema.uiSchema[key].items[k]['ui:widget'] == "Stamp") {
                  formFields[k].key = "stampData";
                } else if (formSchema.uiSchema[key].items[k]['ui:widget'] == "Transfer") {
                  formFields[k].key = "transferData";
                }else if (formSchema.uiSchema[key].items[k]['ui:widget'] == "treeSelect") {
                  formFields[k].key = "treeSelectData";
                }else if (formSchema.uiSchema[key].items[k]['ui:widget'] == "TableSelect") {
                  formFields[k].key = "tableData";
                }
              })
            } else {
              formFields[key] = it
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
          })
          let formField = formFields[val.name]
          let items = formField.type === 'string' ? formField : formField.items
          uniqueData.push({ key: val.url, sourceData: sourceData[idx] })
          if (items.key == "stampData") {
            items.stampData = sourceData[idx].data
          } else if (items.key == "transferData") {
            items.transferData = sourceData[idx]
          } else if (items.key == "treeSelectData") {
            items.treeSelectData = sourceData[idx]
          }else if (items.key == "tableData") {
            items.tableData = sourceData[idx]
          }else {
            items.enum = sourceData[idx].map(i => i.value)
            items.enumNames = sourceData[idx].map(i => i.label)
          }
        })
        //加上之前被去重的项
        repeatDataUrls.forEach((val, idx) => {
          let formFields = {}
          Object.keys(formProperties).forEach(key => {
            let it = formProperties[key];
            if (it.type === 'object' && it.properties) {
              Object.keys(it.properties).forEach(k => {
                formFields[k] = it.properties[k]
                if (formSchema.uiSchema[key][k]['ui:widget'] == "Stamp") {
                  formFields[k].key = "stampData";
                } else if (formSchema.uiSchema[key][k]['ui:widget'] == "Transfer") {
                  formFields[k].key = "transferData";
                } else if (formSchema.uiSchema[key][k]['ui:widget'] == "treeSelect") {
                  formFields[k].key = "treeSelectData";
                }else if (formSchema.uiSchema[key][k]['ui:widget'] == "TableSelect") {
                  formFields[k].key = "tableData";
                }
              })
            }else if (it.type === 'array' && it.items && it.items.properties) {
              Object.keys(it.items.properties).forEach(k => {
                formFields[k] = it.items.properties[k]
                if (formSchema.uiSchema[key].items[k]['ui:widget'] == "Stamp") {
                  formFields[k].key = "stampData";
                } else if (formSchema.uiSchema[key].items[k]['ui:widget'] == "Transfer") {
                  formFields[k].key = "transferData";
                }else if (formSchema.uiSchema[key].items[k]['ui:widget'] == "treeSelect") {
                  formFields[k].key = "treeSelectData";
                }else if (formSchema.uiSchema[key].items[k]['ui:widget'] == "TableSelect") {
                  formFields[k].key = "tableData";
                }
              })
            } else {
              formFields[key] = it
              if (formSchema.uiSchema[key]['ui:widget'] == "Stamp") {
                formFields[key].key = "stampData";
              } else if (formSchema.uiSchema[key]['ui:widget'] == "Transfer") {
                formFields[key].key = "transferData";
              }else if (formSchema.uiSchema[key]['ui:widget'] == "treeSelect") {
                formFields[key].key = "treeSelectData";
              }else if (formSchema.uiSchema[key]['ui:widget'] == "TableSelect") {
                formFields[key].key = "tableData";
              }
            }
          })
          let formField = formFields[val.name];
          let items = formField.type === 'string' ? formField : formField.items;
          let repeatData = uniqueData.filter(item => val.key == item.key)[0].sourceData;
          if (items.key == "stampData") {
            items.stampData = repeatData.data
          } else if (items.key == "transferData") {
            items.transferData = repeatData
          } else if (items.key == "treeSelectData") {
            items.treeSelectData = repeatData
          }else if (items.key == "tableData") {
            items.treeSelectData = repeatData
          }else {
            items.enum = repeatData.map(i => i.value)
            items.enumNames = repeatData.map(i => i.label)
          }
        })
        resolve(deepCloneObject(formSchema), sourceData)
        
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    } else {
      resolve(deepCloneObject(currentFormSchema))
    }
  })
}

export { buildFormSchemaByDataSourceUrl }
