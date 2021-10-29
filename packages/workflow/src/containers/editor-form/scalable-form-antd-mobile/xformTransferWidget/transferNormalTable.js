/**
 * xform基础widget => 普通文本框类型
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Table } from 'antd';
const Search = Input.Search;
import classnames from 'classnames';
import difference from 'lodash/difference';
import { PinyinHelper } from '$utils';
export default class TransferNormalTable extends React.Component {
  state = {
    searchValue: ''
  };

  componentDidMount() {
  }
  handleChange = targetKeys => {
    this.setState({ targetKeys });
  };

  handleSearch = (value) => {
    this.setState({ searchValue: value ? value.toLowerCase() : '' })
  }

  searchFilter = (sourceData, columns) => {
    let { searchValue } = this.state;
    let tData = [];
    columns.map(col => {
      let filterData = sourceData.filter(item => item[col.dataIndex] && (item[col.dataIndex].includes(searchValue) || PinyinHelper.isPinyinMatched(item[col.dataIndex], searchValue)));
      tData = tData.concat(filterData);
    })
    tData = Array.from(new Set(tData));//去重
    return tData;
  }

  render() {
    let { disabled, transferData, targetKeys, columns, title, onChange, checkType } = this.props;
    let tData = this.searchFilter(transferData, columns);//搜索
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
        padding: '10px 10px 0px 10px'
      }}>
        <Search placeholder="可输入关键词查找" onChange={e => this.handleSearch(e.target.value)} />
        <Table
          rowSelection={{
            type: checkType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={tData}
        />
      </div>

    );
  }
}