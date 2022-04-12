/**Created by ZhouXin on 2018/10/9. */
'use strict';

import React, { Component } from 'react';
import { Table, Modal, Divider } from 'antd';
import { CATEGORY, ALGORITHM, AGGTIMEDAYOFWEEK } from '../../constants/AggConfig';

import { PinyinHelper } from '@peace/utils';
import { AuthorizationCode } from '$utils';

const confirm = Modal.confirm;

class AggregateTable extends Component {
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

    renderConfirm = (record) => {
        const { id } = record;
        let _this = this;
        confirm({
            title: '确定要删除？',
            width: '500px',
            okText: '是',
            cancelText: '否',
            onOk() {
                _this.props.onDelete(id);
            },
            onCancel() { }
        });
    }

    handleEdit = (record) => {
        const { id } = record;
        this.props.onEdit(id, record);
    }

    getColumns = () => {
        const { factors, user } = this.props;
        const columns = [
            {
                title: '监测因素',
                dataIndex: 'factorId',
                key: 'factorId',
                render: (text) => (
                    factors ? factors.length > 0 ? factors.filter(s => s.id == text).map(s => s.name) : '' : ''
                )
            },
            {
                title: '类型',
                dataIndex: 'category',
                key: 'category',
                render: (text) => {
                    return CATEGORY[text]
                }
            }, {
                title: '状态',
                dataIndex: 'enable',
                key: 'enable',
                render: (text) => (
                    text ? '启用' : '禁用'
                )
            }, {
                title: '详细信息',
                dataIndex: 'detail',
                key: 'detail',
                render: (text, record) => (
                    record.category == 2001 ? `每天${record.startTime}时，计算${record.startHour}-${(record.natural == null || record.natural == true) ? '' : '次日'}${record.endHour}时的数据${ALGORITHM[record.algorithm]}`
                        : record.category == 2002 ? `每周周日${record.startTime}时，计算${AGGTIMEDAYOFWEEK[record.startDay]}至${AGGTIMEDAYOFWEEK[record.endDay]}的数据${ALGORITHM[record.algorithm]}`
                            : record.category == 2003 ? `每月1号${record.startTime}时，计算${record.startDay}号至${record.endDay}号的数据${ALGORITHM[record.algorithm]}`
                                : record.category == 2005 ? `每小时15分，计算前60分钟的数据${ALGORITHM[record.algorithm]}`
                                    : ''
                )
            }, {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        {
                            user.resources.some(r => r == AuthorizationCode.ModifyAggregate) ?
                                <a onClick={(e) => { this.handleEdit(record) }}>编辑</a>
                                : <span>编辑</span>
                        }
                        <Divider type="vertical" />
                        {
                            user.resources.some(r => r == AuthorizationCode.DeleteAggregate) ?
                                <a onClick={e => this.renderConfirm(record)} >删除</a>
                                : <span>删除</span>
                        }
                        <Divider type="vertical" />
                        {
                            user.resources.some(r => r == AuthorizationCode.AddAggregate || r == AuthorizationCode.ModifyAggregate) ?
                                <a onClick={e => { this.props.onExec(record.id) }} >立即执行</a>
                                : <span>删除</span>
                        }
                    </span>
                )
            }
        ];
        return columns;
    }


    getDataSource = () => {
        const { aggConfigList } = this.props;
        let dataSource = aggConfigList ? aggConfigList.length > 0 ? aggConfigList.filter(this.filter).map(item => item) : [] : [];
        return dataSource;
    };

    filter = (item) => {
        let v = this.props.searchValue.toLowerCase();
        const { factors } = this.props;
        if (v != '') {
            const { factorId, category, enable, algorithm, startTime, startHour, endHour, startDay, endDay } = item;
            let factorName = factors ? factors.filter(f => f.id == factorId).map(f => f.name).reduce((p, c) => { p = p.concat(c); return p }) : '';
            let detailString = category == 2001 ? `每天${startTime}时，计算${startHour}-${endHour}时的数据${ALGORITHM[algorithm]}` :
                category == 2002 ? `每周周日${startTime}时，计算${AGGTIMEDAYOFWEEK[startDay]}至${AGGTIMEDAYOFWEEK[endDay]}${startHour}-${endHour}时的数据${ALGORITHM[algorithm]}`
                    : category == 2003 ? `每月1号${startTime}时，计算${startDay}号至${endDay}号${startHour}-${endHour}时的数据${ALGORITHM[algorithm]}`
                        : '';
            let c = CATEGORY[category];
            let ed = enable ? '启用' : '禁用';
            if (factorName.includes(v) || PinyinHelper.isPinyinMatched(factorName, v) ||
                c.includes(v) || PinyinHelper.isPinyinMatched(c, v) ||
                ed.includes(v) || PinyinHelper.isPinyinMatched(ed, v) ||
                detailString.includes(v) || PinyinHelper.isPinyinMatched(detailString, v)) {
                return true;
            }
            return false;
        } else {
            return true;
        }
    };

    render() {
        const columns = this.getColumns();
        const dataSource = this.getDataSource();

        return (
            <div>
                <Table dataSource={dataSource} columns={columns} pagination={this.getPagination()} />
            </div>
        );
    }
}

export default AggregateTable;