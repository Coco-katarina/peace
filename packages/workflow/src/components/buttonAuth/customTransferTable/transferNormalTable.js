/**
 * xform基础widget => 普通文本框类型
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal } from 'antd';
import classnames from 'classnames';
import { Transfer, Switch, Table, Tag } from 'antd';
import difference from 'lodash/difference';
export default class TransferNormalTable extends React.Component {
  state = {
    keywords: null
  };

  componentDidMount() {
  }
  handleChange = targetKeys => {
    this.setState({ targetKeys });
  };

  handleSearch = (dir, value) => {
    console.log('search:', dir, value);
  };
  onInputChange = (e) => {
    this.setState({ keywords: e.target.value })
  }

  render() {
    let { disabled, transferData, targetKeys, columns, title, onChange } = this.props;
    const { keywords } = this.state;
    let rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        onChange(selectedRowKeys)
      },
    };
    let dataSource = transferData;
    if (keywords) {
      dataSource = transferData.filter(v => v.name.includes(keywords))
    }
    
    return (
      <div style={{
        border: 'solid 1px #d9d9d9',
        overflow: 'hidden',
        padding: '10px'
      }}>
        <Input placeholder='请输入搜索内容' onChange={this.onInputChange} />
        <Table
          rowSelection={{
            type: 'radio',
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataSource}
        />
      </div>

    );
  }
}