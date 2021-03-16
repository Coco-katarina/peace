"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import AppTable from "../components/table";
import AddForm from "../components/addForm";
import { deleteProject, reviewedProject, editProject, applyProject } from "../actions/projectInfo";
import { appTableData } from "../actions/appTable";
import { AuthorizationCode } from '$utils';
import { Func } from '@peace/utils'
import { Modal, Input, Divider, Popconfirm } from "antd";

const { TextArea } = Input;

class AppList extends Component {
    constructor(props) {
        super(props);
        this.reviewedInfo = '';
        this.state = {
            showFormModal: false,
            rowIdWillDelete: null,
            actionColumns: this.getActionColumn('willReviewAction'),
            regetStateNum: 0,
        };
    }

    getActionColumn = (type) => {
        return {
            title: "操作",
            dataIndex: "key",
            render: text => (
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
                                onConfirm={() => this.onDelete(text)}
                            >
                                <a href="#">删除</a>
                            </Popconfirm>
                            : <span style={{ color: '#DDDDDD' }}>删除</span>
                    }
                    <Divider type="vertical" />
                    {
                        type == 'willReviewAction' ?
                            <a onClick={() => this.applyHandler(text)}>发起审核</a>
                            : <a onClick={() => this.rectificationHandler(text)}>整改回录</a>
                    }
                </span>
            )
        }
    }

    UNSAFE_componentWillMount() {
        //获取并通过审核状态筛选项目列表
        this.props.dispatch(appTableData(this.props.user.id, 0));
    }

    rectificationHandler = (id) => {
        this.setState({
            showReviewedModal: true,
            rowIdWillDelete: id,
        });
    };

    applyHandler = id => {
        const { dispatch, user } = this.props;
        dispatch(applyProject(id)).then(() => {
            dispatch(appTableData(user.id, 0));
        });
    };

    onDelete = id => {
        const { dispatch, user } = this.props;
        dispatch(deleteProject(id)).then(() => {
            dispatch(appTableData(user.id, 2));
        });
    };

    editHandler = key => {
        const { appTableData } = this.props;
        let tmp = appTableData.find(val => val.key == key);
        this.setState({
            modalData: tmp,
            showFormModal: true
        });
    };

    editProject = p => {
        const { dispatch, user } = this.props;
        dispatch(editProject(p.key, p.data)).then(() => {
            this.closeModal();
            dispatch(appTableData(user.id, 0));
        });
    }

    closeModal = () => {
        this.setState({
            showFormModal: false,
            showReleaseModal: false,
            showReviewedModal: false
        });
    };

    toReviewedFail = (id, info) => {
        const { dispatch, user } = this.props;
        if (!info) {
            this.setState({ noReviewedInfo: true });
            return;
        }
        let data = {
            userId: this.props.user.id,
            info: info,
            state: -3  //整改回录
        }
        dispatch(reviewedProject(id, data)).then((res) => {
            if (res.success) {
                dispatch(appTableData(user.id, 2));
            }
        });
        this.closeModal();
    };

    radioGroupChange = e => {
        const { dispatch, user } = this.props;
        let actionColumn = null;
        let regetStateNum = 0;
        switch (e.target.value) {
            case "1":
                actionColumn = this.getActionColumn('willReviewAction');
                dispatch(appTableData(user.id, 0));
                break;
            case "2":
                actionColumn = this.getActionColumn('notPassAction');
                dispatch(appTableData(user.id, 2));
                regetStateNum = 2;
                break;
            default:
                break;
        }
        this.setState({
            regetStateNum: regetStateNum,
            actionColumns: actionColumn,
        });
    };

    render() {
        const { appTableData, isRequesting, } = this.props;
        const { showReviewedModal, rowIdWillDelete, actionColumns, showFormModal, modalData, noReviewedInfo, regetStateNum } = this.state;

        return (
            <div>
                <AppTable
                    key={0}
                    tableType="willReviewed"
                    loading={isRequesting}
                    tableData={appTableData}
                    radioGroupChange={this.radioGroupChange}
                    actionColumns={actionColumns}
                />
                <AddForm
                    closeModal={this.closeModal}
                    modalData={modalData}
                    visible={showFormModal}
                    regetStateNum={regetStateNum}
                />
                <Modal title="整改回录"
                    maskClosable={false}
                    visible={showReviewedModal}
                    onCancel={this.closeModal}
                    onOk={e => this.toReviewedFail(rowIdWillDelete, this.reviewedInfo)}
                    bodyStyle={{ padding: 4 }}
                >
                    {
                        noReviewedInfo ?
                            <span style={{ color: "red" }}>请输入整改信息</span> : null
                    }
                    <TextArea placeholder="请输入整改信息"
                        autosize={{ minRows: 4, maxRows: 6 }}
                        onChange={e => { this.reviewedInfo = e.target.value; }}
                    />
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { auth, appTableData } = state;
    return {
        isRequesting: appTableData.isRequesting,
        appTableData: appTableData.data || [],
        user: auth.user,
    };
}

export default connect(mapStateToProps)(AppList)