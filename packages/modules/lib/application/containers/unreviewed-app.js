"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import AppTable from "../components/table";
import { QuestionCircleTwoTone } from '@ant-design/icons';
import { reviewedProject, getReviewReport } from "../actions/projectInfo";
import { appTableData } from "../actions/appTable";
import { Modal, Input, Popconfirm } from "antd";

const { TextArea } = Input;

class AppList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auditId: null,
        };
        this.actionColumns = [
            {
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
        ];
    }

    UNSAFE_componentWillMount() {
        const { dispatch, user } = this.props;
        //获取并通过审核状态筛选项目列表
        dispatch(appTableData(user.id, 1))
        dispatch(getReviewReport());
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
            dispatch(appTableData(user.id, 1));
        });
        this.closeModal();
    }

    closeModal = () => {
        this.setState({
            showReviewedModal: false,
            noReviewedInfo: false
        });
    };

    render() {
        const { dispatch, isRequesting, appTableData, reviewReports } = this.props;
        const { showReviewedModal, noReviewedInfo, auditId, } = this.state;

        return (
            <div>
                <AppTable
                    key={1}
                    tableType='unreviewed'
                    loading={isRequesting}
                    tableData={appTableData}
                    radioGroupChange={this.radioGroupChange}
                    actionColumns={this.actionColumns}
                    reviewReports={reviewReports}
                />
                {
                    showReviewedModal ?
                        <Modal title="审核意见" maskClosable={false} visible={true}
                            bodyStyle={{ padding: 4 }}
                            onCancel={this.closeModal}
                            onOk={e => this.toReviewed({
                                id: auditId, info: this.reviewedInfo, adopt: false
                            })}
                        >
                            {
                                noReviewedInfo ?
                                    <span style={{ color: "red" }}>请输入反馈信息</span> : null
                            }
                            <TextArea placeholder="请输入未通过审核的问题或描述" autosize={{ minRows: 4, maxRows: 6 }}
                                onChange={e => {
                                    this.reviewedInfo = e.target.value;
                                }}
                            />
                        </Modal> : ""
                }
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

export default connect(mapStateToProps)(AppList)
