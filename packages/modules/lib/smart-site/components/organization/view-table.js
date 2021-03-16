/**
 * Created by cherry on 2018/7/16.
 */
'use strict';

import React, { Component } from 'react';
import { Table, Divider, Modal } from 'antd';

import { PinyinHelper } from '@peace/utils';

const confirm = Modal.confirm;

class OrganizationViewTable extends Component {
    constructor(props) {
        super(props);
    }

    handleEdit = (record) => {
        const { key, orgName, extra, orgCorporation, orgCorporationContact } = record;
        let dataToEdit = {
            orgName,
            orgRole: extra.roleId,
            orgCorporation,
            orgCorporationContact,
        };
        this.props.onEdit(key, dataToEdit);
    };

    renderConfirm = (record) => {
        const { key, orgName } = record;
        let _this = this;
        confirm({
            title: '要删除？',
            content: orgName,
            width: '500px',
            okText: '是',
            cancelText: '否',
            onOk() {
                _this.props.onDelete(key);
            },
            onCancel() { }
        });
    };

    getColumns = () => {
        const { modifyVisible, deleteVisible } = this.props;
        let editStyle = { display: modifyVisible ? 'inline' : 'none' };
        let delStyle = { display: deleteVisible ? 'inline' : 'none' };

        const columns = [{
            title: '机构名称',
            dataIndex: 'orgName',
            key: 'orgName'
        }, {
            title: '机构角色',
            dataIndex: 'orgRole',
            key: 'orgRole'
        }, {
            title: '法人',
            dataIndex: 'orgCorporation',
            key: 'orgCorporation'
        }, {
            title: '法人联系电话',
            dataIndex: 'orgCorporationContact',
            key: 'orgCorporationContact'
        }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={e => this.handleEdit(record)} style={editStyle}>编辑</a>
                    {modifyVisible ? <Divider type="vertical" /> : null}
                    <a onClick={e => this.renderConfirm(record)} style={delStyle}>删除</a>
                </span>
            ),
        }];
        return columns;
    };

    filter = (item) => {
        let v = this.props.searchValue.toLowerCase();
        if (v != '') {
            const { name, roleName } = item;
            if (name.includes(v) || PinyinHelper.isPinyinMatched(name, v) ||
                roleName.includes(v) || PinyinHelper.isPinyinMatched(roleName, v)) {
                return true;
            }
            return false;
        } else {
            return true;
        }
    };

    getDataSource = () => {
        let dataSource = this.props.organizations.filter(this.filter).map(item => {
            const { id, name, role, roleName, corporation, corporationContact } = item;
            let record = {
                key: id,
                orgName: name,
                orgRole: roleName,
                orgCorporation: corporation ? corporation : '',
                orgCorporationContact: corporationContact ? corporationContact : '',
                extra: {
                    roleId: role,
                }
            };
            return record;
        });
        return dataSource;
    };

    getPagination = () => {
        const pagination = {
            showTotal: total => `共${total}条`,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ['10', '25', '50', '100'],
            defaultPageSize: 50
        };
        return pagination;
    };

    render() {
        const columns = this.getColumns();
        const dataSource = this.getDataSource();
        return (
            <Table dataSource={dataSource} columns={columns} pagination={this.getPagination()} />
        );
    }
}

export default OrganizationViewTable;
