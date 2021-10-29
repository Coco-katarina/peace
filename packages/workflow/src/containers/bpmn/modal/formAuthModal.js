'use strict';
import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Radio, Space,Table, Switch } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
//import { Func } from '$utils';

const FormAuthModal = ({...props}) => {
   

    let { formFileds, saveBpmnJson, bpmnJson, curElementId } = props;
    bpmnJson[curElementId] = bpmnJson[curElementId] || {}
    let { canEditCodes = [], showCodes = [] } = bpmnJson[curElementId];
   //console.log(formFileds)
    const fieldsData = formFileds.map(v=>{
      return {
        code: v.code,
        title: v.jsonSchema && v.jsonSchema.title || '',
        type: v.jsonSchema && v.jsonSchema.type || '',
        isEdit: canEditCodes.includes(v.code) ? true: false
      }
    });
    
    const columns = [
        { key: 'code', title: '字段编码', dataIndex: 'code', ellipsis: true },
        { key: 'title', title: '字段标题', dataIndex: 'title', ellipsis: true, },
        { key: 'type', title: '字段类型', dataIndex: 'type', ellipsis: true, },
        { key: 'isEdit', title: '可编辑', dataIndex: 'isEdit', ellipsis: true, render: (text,record) =>{
            return <Switch checked={text}  onChange={(checked)=>{
                if(checked){
                    !canEditCodes.includes(record.code) && canEditCodes.push(record.code);
                }else{
                    if(canEditCodes.includes(record.code)){
                        canEditCodes = canEditCodes.filter(v=> v != record.code);
                    }  
                }
                bpmnJson[curElementId].canEditCodes = canEditCodes.filter(v=> fieldsData.map(f=>f.code).includes(v));
                saveBpmnJson(bpmnJson)
                
            }} />
        }},
      ];
      const rowSelection = {
        type:'checkbox',
        selectedRowKeys: showCodes,
        onChange: (selectedRowKeys,selectRow) => {
            bpmnJson[curElementId].showCodes = selectedRowKeys;
            saveBpmnJson(bpmnJson)
        },
      };
    return (
      <div>
          <Table
            rowKey="code"
            dataSource={fieldsData || []}
            columns={columns}
            rowSelection={rowSelection}
            size="small"
            title={() => ('勾选可见性')}
          />
      </div>
    );
}



export default FormAuthModal;