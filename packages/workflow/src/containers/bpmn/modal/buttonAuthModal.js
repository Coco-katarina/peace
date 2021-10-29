'use strict';
import React, { useState, useEffect } from 'react';
import { Button, Row, Col,Table, Switch } from 'antd';

const ButtonAuthModal = ({...props}) => {
   
    let { buttonAuth, saveBpmnJson, bpmnJson, curElementId } = props;
    bpmnJson[curElementId] = bpmnJson[curElementId] || {}
   
    const { buttonList = [] } = bpmnJson[curElementId];
    const columns = [
      { key: 'id', title: 'ID', dataIndex: 'id', ellipsis: true },
      { key: 'name', title: '按钮名称', dataIndex: 'name', ellipsis: true },
      { key: 'functionName', title: '执行函数', dataIndex: 'functionName', ellipsis: true },
    ];
    const rowSelection = {
      type: 'checkbox',
      selectedRowKeys: buttonList,
      onChange: (selectedRowKeys,selectRow) => {
         bpmnJson[curElementId].buttonList = selectedRowKeys;
         saveBpmnJson(bpmnJson)
      },
    };
    
    return (
      <div>
          <Table
            rowKey="id"
            dataSource={buttonAuth}
            columns={columns}
            rowSelection={rowSelection}
            size="small"
            title={() => ('按钮权限选择')}
          />
      </div>
    );
}



export default ButtonAuthModal;