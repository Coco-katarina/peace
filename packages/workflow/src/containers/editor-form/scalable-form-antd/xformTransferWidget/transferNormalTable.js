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
  };

  componentDidMount() {
  }
  handleChange = targetKeys => {
    this.setState({ targetKeys });
  };

  handleSearch = (dir, value) => {
    console.log('search:', dir, value);
  };

  render() {
    let { disabled, transferData, targetKeys, columns, title, onChange } = this.props;
    let rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        onChange(selectedRowKeys)
      },
    };
    return (
      <div style={{
        borderRadius: '10px',
        border: 'solid 1px #d9d9d9',
        overflow: 'hidden',
        padding: '0 10px'
      }}>
        <Table
          rowSelection={{
            type: 'radio',
            ...rowSelection,
          }}
          columns={columns}
          dataSource={transferData}
        />
      </div>

    );
  }
}