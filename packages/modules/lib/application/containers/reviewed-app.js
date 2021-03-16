"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import AppTable from "../components/table";
import ReleaseModal from "../components/releaseModal";
import { appTableData } from "../actions/appTable";
import { changeProjectEventState } from "../actions/projectInfo";
import { publishProject, reviewedProject, getReviewReport } from "../actions/projectInfo";
import { Modal, Input, Button, Popconfirm, } from "antd";
import { QuestionCircleTwoTone } from '@ant-design/icons';

class AppList extends Component {
    constructor(props) {
        super(props);
        this.passAction = [{
            title: "事件响应服务",
            dataIndex: "eventState",
            width: "10%",
            render: (text, record) => (
                <Popconfirm title={`确认${text ? "禁用" : "启用"}该项目的事件响应服务?`} id={text}
                    onConfirm={() => { this.eventStateChange(record) }}>
                    <Button>
                        <span style={{ color: text ? "green" : "red" }}>{text ? "已启用" : "已禁用"}</span>
                    </Button>
                </Popconfirm >
            )
        }, {
            title: "操作",
            dataIndex: "key",
            render: text => (
                <a onClick={() => this.toShowRelease(text)}>发布</a>
            )
        }]
        this.notPassAction = {
            title: "操作",
            dataIndex: "key",
            render: text => (
                <Popconfirm
                    title="对该项目的审核结果是？"
                    icon={<QuestionCircleTwoTone />}
                    okText="通过"
                    cancelText="不通过"
                    onConfirm={() => this.toReviewed({ id: text, adopt: true })}
                    onCancel={() => {
                        this.setState({
                            showReviewedModal: true,
                            auditId: text
                        })
                    }}
                >
                    <a href="#">审核</a>
                </Popconfirm>
            )
        }
        this.state = {
            showReleaseModal: false,
            auditId: null,
            regetStateNum: 3
        };
    }

    UNSAFE_componentWillMount() {
        const { dispatch, user } = this.props;
        dispatch(appTableData(user.id, 3));
        dispatch(getReviewReport());
        this.setState({ actionColumns: this.passAction });
    }

    toReviewed = ({ id, info, adopt }) => {
        const { dispatch, user } = this.props;
        if (!adopt && !info) {
            this.setState({
                noReviewedInfo: true
            })
            return;
        }
        dispatch(reviewedProject(id, {
            userId: user.id,
            info: adopt ? '审核通过' : info,
            state: adopt ? 1 : 0  //0不通过，1通过
        })).then(() => {
            dispatch(appTableData(user.id, 2));
        });
        this.closeModal();
    }

    toShowRelease = (key) => {
        let tmp = this.props.appTableData.find(val => val.key == key);
        this.setState({ modalData: tmp, showReleaseModal: true });
    };

    toPublish = (id, data) => {
        const { dispatch, user } = this.props
        dispatch(publishProject(id, data)).then(() => {
            dispatch(appTableData(user.id, 3));
            this.closeModal();
        })
    }

    radioGroupChange = e => {
        const { dispatch, user } = this.props;
        let column = [];
        let regetStateNum = 3
        switch (e.target.value) {
            case "1":
                column = this.passAction;
                dispatch(appTableData(user.id, 3));
                break;
            case "2":
                column = this.notPassAction;
                dispatch(appTableData(user.id, 2));
                regetStateNum = 2;
                break;
            default:
                break;
        }
        this.setState({
            actionColumns: column,
            regetStateNum
        });
    };

    closeModal = (refresh) => {
        const { dispatch, user } = this.props
        const { regetStateNum } = this.state;
        this.setState({
            showReleaseModal: false,
            showReviewedModal: false,
            noReviewedInfo: false
        });
        if (refresh) {
            dispatch(appTableData(user.id, regetStateNum));
        }
    };

    eventStateChange = (record) => {
        const { dispatch, user } = this.props
        dispatch(changeProjectEventState(record.key)).then(() => {
            dispatch(appTableData(user.id, 3));
        })
    }

    render() {
        const { isRequesting, appTableData, reviewReports } = this.props;
        const { showReviewedModal, showReleaseModal, auditId, modalData, actionColumns } = this.state;

        return (
            <div>
                <AppTable
                    key={3}
                    loading={isRequesting}
                    tableData={appTableData}
                    tableType="reviewed"
                    radioGroupChange={this.radioGroupChange}
                    actionColumns={actionColumns}
                    reviewReports={reviewReports}
                />
                {
                    showReleaseModal ?
                        <ReleaseModal
                            closeModal={this.closeModal}
                            modalData={modalData}
                        /> : ""
                }
                <Modal title="审核意见"
                    maskClosable={false}
                    bodyStyle={{ padding: 4 }}
                    visible={showReviewedModal}
                    onCancel={this.closeModal}
                    onOk={e => this.toReviewed({
                        id: auditId, info: this.reviewedInfo, adopt: false
                    })}
                >
                    {
                        this.state.noReviewedInfo ?
                            <span style={{ color: "red" }}>请输入反馈信息</span> : null
                    }
                    <Input.TextArea placeholder="请输入未通过审核的问题或描述" autosize={{ minRows: 4, maxRows: 6 }} onChange={e => {
                        this.reviewedInfo = e.target.value;
                    }} />
                </Modal>
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
