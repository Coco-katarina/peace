"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import AppTable from "../components/table";
import { appTableData } from "../actions/appTable";

const renderState = ['待发审', '未审核', '未通过', '已通过', '已发布']

class AppList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteBtnState: true,
            actionColumns: [
                {
                    title: "状态",
                    dataIndex: "key",
                    render: (text, record) => (
                        <span>
                            {renderState[record.state]}
                        </span>
                    )
                }
            ],
        };
    }

    UNSAFE_componentWillMount() {
        const { dispatch, user } = this.props
        //获取并通过审核状态筛选项目列表
        dispatch(appTableData(user.id, 'all'))
    }

    render() {
        const { appTableData, isRequesting } = this.props;
        const { deleteBtnState, actionColumns, } = this.state;
        return (
            <div>
                <AppTable
                    key={1}
                    tableType='all'
                    loading={isRequesting}
                    tableData={appTableData}
                    toRelease={this.toRelease}
                    deleteBtnState={deleteBtnState}
                    radioGroupChange={this.radioGroupChange}
                    actionColumns={actionColumns}
                />
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
