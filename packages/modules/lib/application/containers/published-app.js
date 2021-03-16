"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import QRCode from 'qrcode.react'
import AppTable from "../components/table";
import AddForm from "../components/addForm";
import { appTableData } from "../actions/appTable";
import { editProject, deleteProject, getReviewReport } from "../actions/projectInfo";
import { Modal, Divider, Popconfirm } from "antd";
import { AuthorizationCode, } from '$utils';
import { Func } from '@peace/utils'
import AddressModal from "../components/addressModal"

class AppList extends Component {
    constructor(props) {
        super(props);
        this.actionColumns = [
            {
                title: "操作",
                dataIndex: "websiteData",
                width: 300,
                render: text => {
                    let prefix = '';
                    let classify = text.structureClassify;
                    let nothing = false;
                    if (classify == 'construction') {
                        prefix = 'https://smartsite.anxinyun.cn/login?p=';
                    } else if (classify == 'bridge') {
                        prefix = 'http://bridge.anxinyun.cn/?p=';
                    } else if (classify == 'struct' || classify == 'smartToilet' || classify == 'smartWorkSafety' || classify == 'smartFireControl') {
                        prefix = 'http://project.anxinyun.cn/?p=';
                    } else if (classify == 'community') {
                        prefix = 'http://community.anxinyun.cn/?p=';
                    } else {
                        prefix = 'http://project.anxinyun.cn/?p=';
                        nothing = true;
                    }
                    let completeUrl = prefix + text.url
                    return (
                        <span>
                            {
                                Func.judgeRights(AuthorizationCode.ModifyProject) ?
                                    <a onClick={() => this.editHandler(text)}>编辑</a>
                                    : <span style={{ color: '#DDDDDD' }}>编辑</span>
                            }
                            <Divider type="vertical" />
                            {
                                Func.judgeRights(AuthorizationCode.DeleteProject) ?
                                    <Popconfirm
                                        title="是否确认删除项目？项目删除后将无法恢复！"
                                        onConfirm={() => this.toDelete(text.key)}
                                    >
                                        <a href="#">删除</a>
                                    </Popconfirm>
                                    : <span style={{ color: '#DDDDDD' }}>删除</span>
                            }
                            <Divider type="vertical" />
                            <span>
                                <a onClick={() => this.setState({
                                    showAddressModal: true, currPrefix: prefix, currProjectUrl: text.url, currProjectId: text.key
                                })}>地址</a>
                                <Divider type="vertical" />
                                {
                                    nothing ?
                                        <label style={{ color: 'gray' }}>跳转</label> :
                                        <a href={completeUrl}>跳转</a>
                                }
                                <Divider type="vertical" />
                                <a onClick={() => this.QRCodeClick(text.url, completeUrl)}>二维码</a>
                            </span>
                        </span>
                    )
                }
            }
        ]
        this.state = {
            showAddressModal: false,
            currPrefix: null,
            currProjectUrl: null,
            currProjectId: null,
            tableData: [],
            showFormModal: false
        };
    }

    QRCodeClick = (website, url) => {
        let { appTableData } = this.props;
        let currProjectNameArr = appTableData.filter(a => a.website == website);
        return Modal.info({
            title: currProjectNameArr.length ? currProjectNameArr[0].name : '',
            content: (
                <div style={{ textAlign: 'center', position: 'relative', right: 21, marginTop: 30 }}>
                    <QRCode size={150} value={url} />
                </div>
            ),
            okText: '关闭',
            onOk() { },
        });
    }

    toDelete = id => {
        const { dispatch } = this.props
        dispatch(deleteProject(id)).then(() => {
            this.reGetTableData()
        });
    };

    editHandler = ({ key, url }) => {
        let tmp = this.props.appTableData.find(val => val.key == key);
        this.setState({
            modalData: tmp,
            showFormModal: true
        });
    };

    UNSAFE_componentWillMount() {
        const { dispatch, user } = this.props
        this.reGetTableData()
        dispatch(getReviewReport());
    }

    editProject = p => {
        const { dispatch, user } = this.props
        dispatch(editProject(p.key, p.data)).then(() => {
            this.reGetTableData()
            this.closeModal();
        });
    }

    closeModal = (refresh) => {
        this.setState({
            showFormModal: false,
            showReviewedModal: false,
            showAddressModal: false,
            currPrefix: null,
            currProjectUrl: null,
            currProjectId: null
        });
        if (refresh) {
            this.reGetTableData()
        }
    };

    reGetTableData = () => {
        this.props.dispatch(appTableData(this.props.user.id, 4));
    }

    render() {
        const { isRequesting, appTableData, reviewReports } = this.props
        const { showAddressModal, modalData, showFormModal } = this.state

        appTableData ?
            appTableData.length > 0 ?
                appTableData.map(d => {
                    d.websiteData.structureClassify = d.structureClassify
                })
                : ''
            : '';

        return (
            <div>
                <AppTable
                    key={4}
                    loading={isRequesting}
                    tableData={appTableData}
                    actionColumns={this.actionColumns}
                    reGetTableData={this.reGetTableData}
                    tableType='published'
                    reviewReports={reviewReports}
                />
                <AddressModal
                    visible={showAddressModal}
                    closeModal={this.closeModal}
                    currPrefix={this.state.currPrefix}
                    currProjectUrl={this.state.currProjectUrl}
                    currProjectId={this.state.currProjectId}
                    reGetTableData={this.reGetTableData}
                />
                <AddForm
                    closeModal={this.closeModal}
                    modalData={modalData}
                    visible={showFormModal}
                    regetStateNum={4}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { auth, appTableData, reviewReports } = state;
    return {
        user: auth.user,
        isRequesting: appTableData.isRequesting,
        appTableData: appTableData.data || [],
        reviewReports: reviewReports.data || [],
    };
}

export default connect(mapStateToProps)(AppList);
