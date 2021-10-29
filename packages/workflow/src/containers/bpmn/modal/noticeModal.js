'use strict';
import React, { useState, useEffect } from 'react';
import { Button, Input, Row, Col, Radio, Space,Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const NoticeModal = ({...props}) => {
   
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    let searchInputRef = null;
    let { companyUsers, saveBpmnJson, bpmnJson, curElementId } = props;
    //let { currentSelect, bpmnJson, curElementId } = this.state;
    bpmnJson[curElementId] = bpmnJson[curElementId] || {}
    const {  noticeUsers = [] } = bpmnJson[curElementId];
    
    const userData = companyUsers.map(v=>{
      return {
        id: v.id,
        name: v.name,
        account: v.account,
        department: v.departments.map(d=> d.name).toString()
      }
    });
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex)
    };
    
    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {searchInputRef = node}}
              placeholder={`搜索 ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                搜索
              </Button>
              <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                重置
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => searchInputRef.select(), 100);
          }
        },
        render: text =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
    });
    const columns = [
        { key: 'id', title: 'ID', dataIndex: 'id', ellipsis: true },
        { key: 'name', title: '姓名', dataIndex: 'name', ellipsis: true, ...getColumnSearchProps('name','姓名')},
        { key: 'account', title: '账号', dataIndex: 'account', ellipsis: true },
        { key: 'department', title: '所属部门', dataIndex: 'department', ellipsis: true, ...getColumnSearchProps('department','部门') }
      ];
      const rowSelection = {
        type: 'checkbox',
        selectedRowKeys: noticeUsers.map(f=>f.id),
        onChange: (selectedRowKeys,selectRow) => {
            bpmnJson[curElementId].noticeUsers = selectRow.map(v=> {
                return {
                    id:v.id,
                    name: v.name
                }
            });
            saveBpmnJson(bpmnJson)
        },
      };
    return (
      <div>
        {
          <Table
            rowKey="id"
            dataSource={userData || []}
            columns={columns}
            rowSelection={rowSelection}
            size="small"
            title={() => ('抄送人员选择')}
          />
        }
      </div>
    );
}



export default NoticeModal;