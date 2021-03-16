'use strict';

import React, { Component } from 'react';
import { Table, Modal, Divider } from 'antd';
import moment from 'moment';

import { PinyinHelper } from '@peace/utils';

const confirm = Modal.confirm;

class SiteViewTable extends Component {
    constructor(props) {
        super(props);
        this.token = JSON.parse(sessionStorage.getItem('user')).token;
    }

    handleEdit = (record) => {
        const { Id, siteName, siteAddress, Portrait, description, longitude, latitude, area,
            height, builtBureau, supervision, construct, owner, designCompany, beginTime, endTime, builtBureauId, supervisionId, constructId, ownerId, projectType } = record;
        let dataToEdit = {
            Id, siteName, siteAddress, Portrait, description, longitude, latitude, area,
            height, builtBureau, supervision, construct, owner, designCompany, beginTime, endTime, builtBureauId, supervisionId, constructId, ownerId, projectType
        };
        this.props.onEdit(Id, dataToEdit);
    };

    renderConfirm = (record) => {
        const { Id, siteName } = record;
        let _this = this;
        confirm({
            title: '确定删除？删除同时也将删除该工地与项目、结构物的关联关系！',
            content: siteName,
            width: '500px',
            okText: '是',
            cancelText: '否',
            onOk() {
                _this.props.onDelete(Id);
            },
            onCancel() { }
        });
    };
    relateStructs = (record) => {
        this.props.relateStructs(record);
    }
    showImage = (record) => {
        Modal.info({
            title: '工地图片',
            okText: '确定',
            content: (
                <div>
                    <img src={encodeURI(`/_file-server/${record.Portrait}?token=${this.token}`)} width='100%' />
                </div>
            ),
            onOk() { },
        });
    }
    getColumns = () => {
        const { modifyVisible, deleteVisible } = this.props;
        let editStyle = { display: modifyVisible ? 'inline' : 'none' };
        let delStyle = { display: deleteVisible ? 'inline' : 'none' };

        const columns = [
            {
                title: '工地名称',
                width: '7%',
                dataIndex: 'siteName',
                key: 'siteName'
            },
             {
                title: '地址',
                width: '7%',
                dataIndex: 'siteAddress',
                key: 'siteAddress'
            }, {
                title: '住建单位',
                width: '7%',
                dataIndex: 'builtBureau',
                key: 'builtBureau'
            }, {
                title: '施工单位',
                width: '8%',
                dataIndex: 'construct',
                key: 'construct'
            }, {
                title: '监理单位',
                width: '8%',
                dataIndex: 'supervision',
                key: 'supervision'
            }, {
                title: '建设单位',
                width: '8%',
                dataIndex: 'owner',
                key: 'owner'
            },
            {
                title: '项目类型',
                width: '7%',
                dataIndex: 'projectType',
                key: 'projectType',
                render: (text) => text == 1 ? '房建项目' : '市政项目'
            },
            {
                title: '开始时间',
                dataIndex: 'beginTime',
                width: '8%',
                key: 'beginTime'
            }, {
                title: '结束时间',
                dataIndex: 'endTime',
                width: '8%',
                key: 'endTime'
            },
            // {
            //     title: '描述',
            //     width: '8%',
            //     dataIndex: 'description',
            //     key: 'description'
            // },
            {
                title: '面积',
                dataIndex: 'area',
                width: '5%',
                key: 'area'
            }, {
                title: '高度',
                dataIndex: 'height',
                width: '4%',
                key: 'height'
            }, {
                title: '设计单位',
                width: '7%',
                dataIndex: 'designCompany',
                key: 'designCompany'
            }, {
                title: '图片',
                width: '4%',
                dataIndex: 'Portrait',
                key: 'Portrait',
                render: (text, record) => (
                    <span>
                        <a onClick={e => this.showImage(record)}>查看</a>
                    </span>
                ),
            }, {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                width: '11%',
                render: (text, record) => (
                    <span>
                        <a onClick={e => this.handleEdit(record)} style={editStyle}>编辑</a>
                        {modifyVisible ? <Divider type="vertical" /> : null}
                        <a onClick={e => this.renderConfirm(record)} style={delStyle}>删除</a>
                        {deleteVisible && modifyVisible ? <Divider type="vertical" /> : null}
                        <a onClick={e => this.relateStructs(record)} style={editStyle}>关联</a>
                    </span>
                ),
            }
        ];
        return columns;
    };

    filter = (record) => {
        let v = this.props.searchValue;
        if (v != '') {
            const { siteName, siteAddress, builtBureau, supervision } = record;
            if (siteName.includes(v) || PinyinHelper.isPinyinMatched(siteName, v) ||
                siteAddress.includes(v) || PinyinHelper.isPinyinMatched(siteAddress, v) ||
                builtBureau.includes(v) || PinyinHelper.isPinyinMatched(builtBureau, v) ||
                supervision.includes(v) || PinyinHelper.isPinyinMatched(supervision, v)) {
                return true;
            }
            return false;
        } else {
            return true;
        }
    };

    getDataSource = (filter) => {
        const { siteList, thingsList, user, addVisible, modifyVisible } = this.props;
        let dataSource = [];
        if (thingsList.length) {
            siteList ? siteList.length > 0 ? siteList.filter(filter).map(s => {
                const {
                    Id, siteName, siteAddress, Portrait, description, longitude, latitude, area,
                    height, builtBureau, supervision, construct, owner, designCompany, beginTime,
                    endTime, builtBureauId, supervisionId, constructId, ownerId, projectType, structures
                } = s;
                let doPush = false;
                if (user.portal != 'A') {
                    if (structures.length) {
                        doPush = true;
                        for (let ss of structures) {
                            if (!thingsList.some(t => t.id == ss.id)) {
                                doPush = false;
                                break;
                            }
                        }
                    } else if (addVisible || modifyVisible) {
                        doPush = true;
                    }
                } else {
                    doPush = true;
                }
                if (doPush) {
                    dataSource.push({
                        Id:Id, key: Id, siteName: siteName, siteAddress: siteAddress, Portrait: Portrait, description: description, longitude: longitude, latitude: latitude, area: area,
                        height: height, builtBureau: builtBureau, supervision: supervision, construct: construct, owner: owner, designCompany: designCompany, builtBureauId: builtBureauId,
                        supervisionId: supervisionId, constructId: constructId, ownerId: ownerId,
                        beginTime: beginTime ? moment(beginTime).format('YYYY-MM-DD HH:mm:ss') : '', endTime: endTime ? moment(endTime).format('YYYY-MM-DD HH:mm:ss') : '',
                        projectType: projectType
                    })
                }

            }) : '' : ''
        }
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
        const dataSource = this.getDataSource(this.filter);
        const { isRequesting } = this.props;
        return (
            <Table dataSource={dataSource} loading={isRequesting} columns={columns} />
        );
    }
}

export default SiteViewTable;
