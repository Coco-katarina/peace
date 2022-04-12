/**
 * Created by ZhouXin on 2018/9/19.
 */
'use strict';
import React, { Component } from 'react';
import { Table, Modal, Divider } from 'antd';
import { AuthorizationCode } from '$utils';

const confirm = Modal.confirm;

class StructuregroupTable extends Component {
    constructor(props) {
        super(props);
    }

    getPagination = () => {
        const pagination = {
            showTotal: total => `共${total}条`,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ['10', '25', '50', '100'],
            defaultPageSize: 10
        };
        return pagination;
    }

    getColumns = () => {
        const { user } = this.props;
        const columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '经度',
            dataIndex: 'longitude',
            key: 'longitude'
        }, {
            title: '纬度',
            dataIndex: 'latitude',
            key: 'latitude'
        }, {
            title: '行政区域码-省',
            dataIndex: 'provinceCode',
            key: 'provinceCode'
        }, {
            title: '行政区域码-市',
            dataIndex: 'cityCode',
            key: 'cityCode'
        }, {
            title: '行政区域码-县',
            dataIndex: 'countryCode',
            key: 'countryCode'
        }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <span>
                    {user.resources.some(r => r == AuthorizationCode.EditStructsGroup) ?
                        <a onClick={e => this.handleEdit(record)}>编辑</a> : <span>编辑</span>
                    }
                    <Divider type="vertical" />
                    {user.resources.some(r => r == AuthorizationCode.DeleteStructsGroup) ?
                        <a onClick={e => this.renderConfirm(record)} >删除</a> : <span>删除</span>
                    }
                    <Divider type="vertical" />
                    {user.resources.some(r => r == AuthorizationCode.RelevanceStructsGroup) ?
                        <a onClick={e => this.relateStructs(record)} >关联</a> : <span>关联</span>
                    }
                </span>)
        }];
        return columns;
    }

    handleEdit = (record) => {
        const { key } = record;
        this.props.onEdit(key, record);
    }

    renderConfirm = (record) => {
        const { key, name } = record;
        let _this = this;
        confirm({
            title: '要删除？',
            content: name,
            width: '500px',
            okText: '是',
            cancelText: '否',
            onOk() {
                _this.props.onDelete(key);
            },
            onCancel() { }
        });
    }

    relateStructs = (record) => {
        this.props.relateStructs(record);
    }

    getDataSource = () => {
        const { structuregroupList } = this.props;
        const dataSource = structuregroupList.length > 0 ? structuregroupList.map(s => {
            const { id, name, extras } = s.structureGroups;
            if (extras) {
                const { longitude, latitude, divisionCode } = extras;
                let record = {
                    key: id,
                    name: name,
                    longitude, latitude,
                    provinceCode: divisionCode.slice(0, 2),
                    cityCode: divisionCode.slice(2, 4),
                    countryCode: divisionCode.slice(4, 6),
                    structs: s.structures
                };
                return record
            }

        }) : '';

        return dataSource;
    }

    render() {
        const columns = this.getColumns();
        const dataSource = this.getDataSource(this.filter);

        return (
            <div>
                <Table dataSource={dataSource} columns={columns} pagination={this.getPagination()} />
            </div>
        );
    }
}

export default StructuregroupTable;
