/** 
 * Created by Xumeng 2020/04/22.
 */
 'use strict';
 import React, { useState, useEffect } from 'react';
 import PropTypes from 'prop-types';
 import { Button, message } from "antd";
 import moment from 'moment';
 import XLSX from 'xlsx';
 import { fromJS } from 'immutable';
 import { Request } from '@peace/utils';
 import FileSaver from 'file-saver';
import { DownOutlined } from '@ant-design/icons';
 
 //通用前端导出组件  使用方法查看底部propTypes
 const ExportData = ({...props}) => {
     //const [form] = Form.useForm();
     const [exportLoading, setExportLoading] = useState(false);
     const { customRender, title, exportType, style, showIcon } = props;
    
 
     const loop = (data, keypath, values) => { // deal with array
         let dkey = keypath.slice(0, 1)[0];
         if (dkey) {
             let dvalue = data[dkey];
             let otherKeypath = keypath.slice(1);
             if (Array.isArray(dvalue)) {
                 if (otherKeypath.length) {
                     let immutableData = fromJS(data);
                     for (let index = 0; index < dvalue.length; index++) {
                         let tmp = immutableData.getIn([dkey, index]).toJS();
                         loop(tmp, otherKeypath, values);
                     }
                 }
             } else {
                 values.push(dvalue);
             }
         }
         return values;
     };
     const getColumnData = (opts) => {
         const { data, keypath, render, spliter, rawdata, valueEnum } = opts;
         let v = null;
         let outer = data[keypath[0]];
 
         if (Array.isArray(outer)) {
             let values = loop(data, keypath, []);
             v = rawdata ? values : values.join(spliter || '，');
         } else {
             v = fromJS(data).getIn(keypath);
         }
         //处理proTable 枚举
         if(valueEnum && valueEnum[v]?.text){
            v =  valueEnum[v]?.text;
         }
         //处理render
         if (render && typeof render === 'function') {
             v = render(outer, data);
         }
         
         return v;
     };
     const getDataSource = (attrs, filterData) => {
      
         let dataSource = filterData.map(item => {
             let record = {};
             attrs.forEach(attr => {
                 const { key, dataIndex, render, child, valueEnum } = attr;
                 
                 if (child) {
                  
                     record[key] = getDataSource(child, item[key] || []);
                 } else {
                   
                     let v = getColumnData({
                         data: item,
                         keypath: Array.isArray(dataIndex) ? dataIndex : [dataIndex],
                         render: render || null,
                         valueEnum: valueEnum
                     });
                     record[key] = v;
                 }
 
 
             });
 
             return record;
         });
        
         return dataSource;
         
         
     };

     const getNewColumns = (attrs) => {
         return attrs.filter(f=> f.dataIndex).map(v=>{
            const { dataIndex } = v;
            return {
                ...v,
                key: Array.isArray(dataIndex) ? dataIndex.reduce((p,c)=>{
                     p = `${p}${c.trim().replace(c[0], c[0].toUpperCase())}`;
                     return p
                },'') : dataIndex
            }
         })
     }
     //暂时只处理两层 
     const getFlatData = (attrs, filterData, dataToAoa, deep = 0) => {
 
         filterData.map(item => {
             let cur = dataToAoa[deep]
             if (!cur) {
                 cur = dataToAoa[deep] = []
             }
             attrs.map((attr, index) => {
                 const { key, child } = attr;
                 if (child) {
                     if (Array.isArray(item[key])) {
                         //getFlatData(child,item[key],dataToAoa,deep)
 
                         item[key].map((s, i) => {
                             if (i == 0) {
                                 child.map(c => {
                                     cur.push(s[c.key]);
                                 })
                             } else {
                                 deep++
                                 let childCur = dataToAoa[deep] = []
                                 pushNull(childCur, index);
                                 child.map(c => {
                                     childCur.push(s[c.key]);
                                 });
                             }
 
                         })
 
                     }
                 } else {
                     cur.push(item[key]);
                 }
 
             });
             deep++
         });
 
 
     };
 
     const getHeader = (headers, excelHeader, deep, perOffset) => {
         let offset = 0
         let cur = excelHeader[deep]
         if (!cur) {
             cur = excelHeader[deep] = []
         }
         pushNull(cur, perOffset - cur.length)
         for (let i = 0; i < headers.length; i++) {
             let head = headers[i]
             cur.push(head.name)
             if (head.hasOwnProperty('child') && Array.isArray(head.child) && head.child.length > 0) {
                 let childOffset = getHeader(head.child, excelHeader, deep + 1, cur.length - 1)
                 pushNull(cur, childOffset - 1)
                 offset += childOffset
             } else {
                 offset++
             }
         }
         return offset;
     }
 
     const pushNull = (arr, count) => {
         for (let i = 0; i < count; i++) {
             arr.push(null)
         }
     }
     const fillNull = (arr) => {
         let max = Math.max(...(arr.map(a => a.length)))
         arr.filter(e => e.length < max).forEach(e => pushNull(e, max - e.length))
     }
     const doMerges = (arr) => {
         // 要么横向合并 要么纵向合并
         let deep = arr.length;
         let merges = [];
         for (let y = 0; y < deep; y++) {
             // 先处理横向合并
             let row = arr[y];
             let colSpan = 0
             for (let x = 0; x < row.length; x++) {
                 if (row[x] === null) {
                     colSpan++
                     if (((x + 1) === row.length) && (colSpan > 0 && x > colSpan)) {
                         merges.push({ s: { r: y, c: x - colSpan }, e: { r: y, c: x } })
                     }
                 } else if (colSpan > 0 && x > colSpan) {
                     merges.push({ s: { r: y, c: x - colSpan - 1 }, e: { r: y, c: x - 1 } })
                     colSpan = 0
                 } else {
                     colSpan = 0
                 }
             }
         }
         // 再处理纵向合并
         let colLength = arr[0].length
         for (let x = 0; x < colLength; x++) {
             let rowSpan = 0
             for (let y = 0; y < deep; y++) {
                 if (arr[y][x] != null) {
                     rowSpan = 0
                 } else {
                     rowSpan++;
                 }
             }
             if (rowSpan > 0) {
                 merges.push({ s: { r: deep - rowSpan - 1, c: x }, e: { r: deep - 1, c: x } })
             }
         }
         return merges;
     }
     
     //内容暂只出了纵向合并
     const doContetMerges = (arr, headerLength) => {
         let deep = arr.length;
         let merges = [];
         //处理纵向合并
         let colLength = arr[0].length
         for (let x = 0; x < colLength; x++) {
             let rowSpan = 0;
             let mergY = 0;
             for (let y = 0; y < deep; y++) {
                 if (rowSpan > 0) {
                     //如果还有null 继续加
                     if (arr[y][x] === null) {
                         rowSpan = rowSpan + 1
                     } else {
                         //不为null 增加merge
                         merges.push({ s: { r: headerLength + (y - rowSpan - 1), c: x }, e: { r: headerLength + y - 1, c: x } });
                         rowSpan = 0;
                     }
                 } else {
                     if (arr[y][x] === null) {
                         rowSpan = rowSpan + 1
                     }
                 }
 
             }
             if (rowSpan > 0) {
                 merges.push({ s: { r: headerLength + (deep - rowSpan - 1), c: x }, e: { r: headerLength + deep - 1, c: x } })
                 rowSpan = 0;
             }
         }
         return merges;
     }

     //导出可以纵向合并单元格的数据 不建议使用
     const exportMergeExcel = async () => {
         setExportLoading(true)
         const { columns, data, fileName, exportUrl, exportQuery, exportBody, requestType, header, showYearMouth } = props || {};
 
         let resultData = [];
         if (exportUrl) {
 
             resultData = requestType == 'post' ? await Request.post(exportUrl, exportBody || {}, exportQuery || {}).then(data => {
                 //数据接口返回的结果 如果是对象 必须把返回数组放入rows
                 if (typeof data === 'object' && data.rows) {
 
                     return data.rows
 
                 } else {
                     return data;
                 }
             }, err => {
                 message.error('获取数据失败，导出失败！');
             }) : await Request.get(exportUrl, exportQuery || {}).then(data => {
                 if (typeof data === 'object' && data.rows) {
 
                     return data.rows
 
                 } else {
                     return data;
                 }
             }, err => {
                 message.error('获取数据失败，导出失败！');
             });
             if (!resultData) {
                 return;
             }
 
         } else {
             resultData = data
         }
         let excelHeader = [];
         const newColumns = getNewColumns(columns);
         getHeader(newColumns, excelHeader, 0, 0);
         fillNull(excelHeader);
 
         //console.log(excelHeader);
 
         let loopData = getDataSource(newColumns, resultData);
         //console.log(loopData)
 
         let dataToAoa = [];
         getFlatData(newColumns, loopData, dataToAoa, 0);
         fillNull(dataToAoa);
         //console.log(dataToAoa);
 
         let aoa = [].concat(excelHeader, dataToAoa);
         //console.log(aoa)
 
         let headerMerges = doMerges(excelHeader);
         let contentMerages = doContetMerges(dataToAoa, excelHeader.length);
         let merges = [].concat(headerMerges, contentMerages);
         // console.log(contentMerages)
 
         // let opts = {
         //     defaultCellStyle: {
         //         font: { name: "宋体", sz: 11, color: { auto: 1 } },
         //         border: {
         //             color: { auto: 1 }
         //         },
         //         alignment: {
         //             /// 自动换行
         //             wrapText: 1,
         //             // 居中
         //             horizontal: "center",
         //             vertical: "center",
         //             indent: 0
         //         }
         //    }
         // }
         let sheet = XLSX.utils.aoa_to_sheet(aoa);
         // let newSheet = {}; 
         // for (let [key, value] of Object.entries(sheet)) {
         //     if(key == '!ref'){
         //         newSheet[key] = value
         //     }else if(typeof value === 'object'){
         //         newSheet[key] = {
         //             ...value,
         //             s: opts.defaultCellStyle
         //         }
         //     }
         // }
         const wpx = columns.map(c => {
             return {
                 wpx: Number.parseInt(c.wpx) ? Number.parseInt(c.wpx) : 100
             }
         })
         sheet['!cols'] = wpx;
         sheet['!merges'] = merges;
 
         // 构建 workbook 对象
         const workbook = XLSX.utils.book_new();
 
         const time = moment().format('YYYY-MM-DD');
 
 
         XLSX.utils.book_append_sheet(workbook, sheet, 'mySheet');
         // 导出 Excel
         XLSX.writeFile(workbook, fileName ? `${fileName}-${time}.xlsx` : `导出数据-${time}.xlsx`);
         setExportLoading(false);
         message.success(`成功导出了 ${loopData.length || 0} 条数据`);
     }
     //FileSaver 方式导出可以自定义样式 columns可定义 headStyle, rowStyle
     const exportFileSaver = async () => {
         setExportLoading(true)
         const { columns, data, fileName, exportUrl, exportQuery, exportBody, requestType } = props || {};
         let resultData = [];
         if (exportUrl) {
             resultData = requestType == 'post' ? await Request.post(exportUrl, exportBody || {}, exportQuery || {}).then(data => {
                 //数据接口返回的结果 如果是对象 必须把返回数组放入rows
                 if (typeof data === 'object') {
                     return data.data ? data.data : data.rows
                 } else {
                     return data;
                 }
             }, err => {
                 message.error('获取数据失败，导出失败！');
             }) : await Request.get(exportUrl, exportQuery || {}).then(data => {
              
                 if (typeof data === 'object' && data.rows) {
                     return data.rows
                 } else {
                     return data;
                 }
             }, err => {
                 message.error('获取数据失败，导出失败！');
             });
             if (!resultData) {
                 return;
             }
 
         } else {
             resultData = data
         }
         const newColumns = getNewColumns(columns);
 
         const loopData = getDataSource(newColumns, resultData);
 
         let content = '';
         let header = '<tr>';
         //header += `<th><div>序号</div></th>`;
         newColumns.map(colum => {
             header += `<th style="${colum.headStyle || ''}"><div>${colum.title}</div></th>`
         });
         header += '</tr>';
         loopData.map(data => {
                 content += `<tr>`;
                 newColumns.map(c => {
                     if (c.style) {
                         content += `<th style="${c.rowStyle || ''}"><div>${data[c.key] || ''}</div></th>`
                     } else {
                         content += `<th><div>${data[c.key] || ''}</div></th>`
                     }
                 });
                 content += `</tr>`;
             })
 
         let exportTable = `\uFEFF
                 <table style='text-alagin:center' border="1">
                     ${header}
                     ${content}
                 </table>
             `;
         const time = moment().format('YYYY-MM-DD');
         let tempStrs = new Blob([exportTable], { type: 'text/xls' })
         FileSaver.saveAs(tempStrs, fileName ? `${fileName}-${time}.xls` : `导出数据-${time}.xlsx`);
         setExportLoading(false);
         message.success(`成功导出了 ${loopData.length || 0} 条数据`);
     }
 
     //普通XLSX导出
     const exportExcel = async () => {
         setExportLoading(true)
         const { columns, data, fileName, exportUrl, exportQuery, exportBody, requestType } = props || {};

         const newColumns = getNewColumns(columns);
        
         const _headers = newColumns
             .map((item, i) => Object.assign({}, { key: item.key, title: item.title, position: String.fromCharCode(65 + i) + 1 }))
             .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { key: next.key, v: next.title } }), {});
         let resultData = [];
         if (exportUrl) {
             resultData = requestType == 'post' ? await Request.post(exportUrl, exportBody || {}, exportQuery || {}).then(data => {
                 //数据接口返回的结果 如果是对象 必须把返回数组放入rows
                 
                 if (typeof data === 'object' && (data.rows || data.data)) { 
                     return data.data ? data.data : data.rows
                 } else {
                     return data;
                 }
             }, err => {
                 message.error('获取数据失败，导出失败！');
             }) : await Request.get(exportUrl, exportQuery || {}).then(data => {
                 if (typeof data === 'object' && data.rows) {
                     return data.rows
 
                 } else {
                     return data;
                 }
             }, err => {
                 message.error('获取数据失败，导出失败！');
             });
             if (!resultData) {
                 return;
             }
 
         } else {
             resultData = data
         }
       
         const loopData = getDataSource(newColumns, resultData);
      
 
         const wpx = newColumns.map(c => {
             return {
                 wpx: Number.parseInt(c.wpx) ? Number.parseInt(c.wpx) : 100
             }
         })
         if (!(loopData.length > 0)) {
             setExportLoading(false);
             return;
         }
         const _data = loopData
             .map((item, i) => newColumns.map((key, j) => Object.assign({}, { content: item[key.key], position: String.fromCharCode(65 + j) + (i + 2) })))
             // 对刚才的结果进行降维处理（二维数组变成一维数组）
             .reduce((prev, next) => prev.concat(next))
             // 转换成 worksheet 需要的结构
             .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.content } }), {});
 
         // 合并 columns 和 data
         const output = Object.assign({}, _headers, _data);
         // 获取所有单元格的位置
         const outputPos = Object.keys(output);
         // 计算出范围 ,["A1",..., "H2"]
         const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;
 
         // 构建 workbook 对象
         const workbook = {
             SheetNames: ['mySheet'],
             Sheets: {
                 mySheet: Object.assign(
                     {},
                     output,
                     {
                         '!ref': ref,
                         '!cols': wpx,
                     },
                 ),
             },
         };
         const time = moment().format('YYYY-MM-DD');
         // 导出 Excel
         XLSX.writeFile(workbook, fileName ? `${fileName}-${time}.xlsx` : `导出数据-${time}.xlsx`);
         setExportLoading(false);
         message.success(`成功导出了 ${loopData.length || 0} 条数据`);
     }
 
   
     const handleExport = async () => {
        switch (exportType) {
            case 'fileSaver':
                await exportFileSaver();
            break;
            case 'xlsx':
                await exportExcel();
            break;
            case 'merge':
                await exportMergeExcel();
            break;
            default:
                await exportExcel();
            break;
        }
     }
    
     return (
            customRender ? 
            <span style={style} loading={exportLoading} onClick={handleExport}>
                {customRender}
            </span> :

            <Button style={style}  loading={exportLoading} onClick={handleExport}>
                {title || '导出'}
                {showIcon && <DownOutlined />}
            </Button>     
     )
 }
 
 ExportData.propTypes = {
     fileName: PropTypes.string, //导出文件名称前缀
     showIcon: PropTypes.bool, //导出按钮是否显示icon，默认不显示
     customRender: PropTypes.element, //自定义导出组件渲染 不传默认按钮样式
     style: PropTypes.object,//透传style
     title: PropTypes.string, //导出按钮文字
     columns: PropTypes.array.isRequired, //导出显示的header数组 兼容antd columns 可直接拿table或者protable的columns使用  注：columns每列的属性wpx设置导出的execl每列的宽度值 默认 100
     data: PropTypes.array.isRequired,   //导出的数据 兼容antd table 数组嵌套处理，如果传入exportUrl 则从接口获取数据导出，此参数无效
     exportUrl: PropTypes.string,  //导出数据从接口获取的url地址   返回的数据1、数组必须支持columns的设置 ，2、如果是对象，数组需放在rows属性上
     exportBody: PropTypes.object, //导出数据接口body参数
     exportQuery: PropTypes.object,  //导出数据从接口获取的url地址上的参数
     requestType: PropTypes.string, //请求类型 get，post，默认get
     exportType: PropTypes.string, //导出执行类型函数 'fileSaver','xlsx','merge'纵向单元格合并
 };
 
 export default ExportData;
 