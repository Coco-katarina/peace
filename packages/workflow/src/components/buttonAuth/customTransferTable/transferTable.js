/**
 * xform基础widget => 普通文本框类型
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal } from 'antd';
import classnames from 'classnames';
import { Transfer, Switch, Table, Tag } from 'antd';
import difference from 'lodash/difference';
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps} showSelectAll={false}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;
      const rowSelection = {
        getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter(item => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? 'none' : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);


export default class TransferTable extends React.Component {

  render() {
    let { transferData, transferSelectedData, leftColumns, rightColumns, leftTitle, rightTitle, onChange, targetKeys, disabled, selectedKeys } = this.props;
    return (
      <div>
        <TableTransfer
          disabled={disabled}
          titles={[leftTitle, rightTitle]}
          dataSource={transferData ? transferData : []}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          showSearch={true}
          onChange={onChange}
          filterOption={(inputValue, item) =>
            item.name.indexOf(inputValue) !== -1 || item.department.indexOf(inputValue) !== -1
          }
          leftColumns={leftColumns}
          rightColumns={rightColumns}
          listStyle={{
            width: 250
          }}
        />
      </div>
    );
  }
}