"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import AddForm from "../components/addForm";
import GenerateReportModal from '../components/generateReportModal'
import { getReviewReport } from '../actions/projectInfo'
import PasswordModal from "./modifyUserModal";
import { AuthorizationCode } from '$utils'
import { Func, PinyinHelper } from '@peace/utils'
import { Input, Button, Radio, Badge, Table, Popover, message } from "antd";

const Search = Input.Search;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { AddProject } = AuthorizationCode;

class AppTable extends Component {
    constructor(props) {
        super(props);
        const { tableType } = this.props;
        let baseColumns = [{
            title: "项目名称",
            dataIndex: "name"
        }, {
            title: "关联监测对象",
            dataIndex: "struct",
            width: 280,
            ellipsis: { showTitle: true },
            render: text => {
                let structureStr = text.map(val => val.name).join(" , ");
                return (
                    <span>
                        <Popover placement="topLeft"
                            content={structureStr}
                            title="全部关联监测对象"
                            overlayStyle={{
                                maxWidth: 280,
                                paddingRight: 0
                            }}>
                            {structureStr}
                        </Popover>
                    </span>
                );
            }
        },
        ]

        if (tableType == 'all' || tableType == 'published') {
            baseColumns.push(
                {
                    title: "API秘钥",
                    dataIndex: 'apiSecret',
                    key: 'apiSecret',
                    width: '10%',
                    render: (text) => {
                        if (text && text.appKey && text.appSecret) {
                            return (
                                <Popover
                                    content={
                                        <div>
                                            <p><span style={{ fontWeight: 'bold' }}>AppId：</span><span>{text.appKey}</span></p>
                                            <p><span style={{ fontWeight: 'bold' }}>AppSecret：</span><span>{text.appSecret}</span></p>
                                        </div>
                                    }
                                >查看</Popover>
                            );
                        } else {
                            return ''
                        }
                    }
                },
            )
        }
        baseColumns.push({
            title: "创建时间",
            dataIndex: "time"
        })

        this.state = {
            visible: false,
            showAddModal: false,
            baseColumns: baseColumns,
            generateReportModalVisible: false,
            generateModalId: null,
        };
    }

    componentWillUnmount() {
        this.setState({
            renderList: []
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (typeof this.state.searchWord == 'string') {
            this.searchApp(this.state.searchWord, nextProps.tableData);
        }
    }

    searchApp = (searchValue, appList) => {
        let tempArr = [];
        let tableData = appList ? appList : this.props.tableData;
        for (let i in tableData) {
            const { name, describe } = tableData[i];
            if (
                name.search(searchValue) >= 0 || PinyinHelper.isPinyinMatched(name, searchValue) ||
                (describe && (describe.search(searchValue) >= 0 || PinyinHelper.isPinyinMatched(describe, searchValue)))
            ) {
                tempArr.push(tableData[i]);
                continue;
            }
            for (let j in tableData[i].struct) {
                let itemName = tableData[i].struct[j].name;
                if (itemName.search(searchValue) >= 0 || PinyinHelper.isPinyinMatched(itemName, searchValue)) {
                    tempArr.push(tableData[i]);
                    break;
                }
            }
        }
        this.setState({
            renderList: tempArr,
            searchWord: searchValue
        });
    };

    modifyPassword = e => {
        this.setState({
            visible: true,
            userInfo: e
        });
    };

    generateReviewReport = sid => {
        const { fetchedReports } = this.props;
        const fetchedReport = fetchedReports[sid];
        if (fetchedReport && moment().diff(fetchedReport, 'minutes', true) < 1) {
            message.warn('请求过于频繁，请在1分钟后再试或尝试刷新表格');
        } else {
            this.setState({
                generateModalId: sid,
                generateReportModalVisible: true,
            });
        }
    }

    showReviewReport = sid => {
        const { reviewReports, resourceRoot } = this.props;
        const file = reviewReports.filter(r => r.structureId == sid);
        if (file.length > 0) {
            window.open(`${resourceRoot}/${file[0].link}`, "_blank");
        }
    }

    expandedRowRender = record => {
        const { dispatch, tableType, reviewReports } = this.props;
        const approveColumns = [{
            title: "时间",
            dataIndex: "examinedTime"
        }, {
            title: "操作人员",
            dataIndex: "examinedPerson"
        }, {
            title: "动作",
            dataIndex: "approveResult",
            render: text => {
                let node = null;
                switch (text) {
                    case 0:
                        node = <span><Badge status="error" />审核未通过</span>;
                        break;
                    case 1:
                        node = <span><Badge status="success" />审核通过</span>;
                        break;
                    case -2:
                        node = <span><Badge status="processing" />新建项目</span>;
                        break;
                    case -3:
                        node = <span><Badge status="warning" />整改回录</span>;
                        break;
                    default:
                        break;
                }
                return node;
            }
        }, {
            title: "备注",
            dataIndex: "approveInfo"
        }];

        let struct = record.struct.reduce((p, n) => {
            if (n.structures == null) {
                p.push(n);
            } else {
                p = p.concat(n.structures);
            }
            return p;
        }, []);

        return (
            <div style={{
                paddingLeft: 60
            }}>
                {
                    record.describe ?
                        <div>
                            <h3 style={{
                                display: "inline-block",
                                padding: "8px",
                                fontSize: 12
                            }} >
                                项目描述：
                        </h3>
                            <span style={{ fontSize: 12 }}>{record.describe}</span>
                        </div> : null
                } {
                    record.admin ?
                        <div>
                            <h3 style={{
                                display: "inline-block",
                                padding: "8px",
                                fontSize: 12
                            }} >
                                项目管理用户名：
                            </h3>
                            <span style={{ fontSize: 12 }}>{record.admin.username}</span>
                            {
                                record.canEdit ?
                                    <a style={{ marginLeft: 15 }} onClick={e => this.modifyPassword(record)}>重置账户/密码</a> : null
                            }
                        </div>
                        : null
                } {
                    ['unreviewed', 'reviewed', 'published'].includes(tableType) && reviewReports.length ?
                        <div>
                            <h3 style={{
                                padding: "8px",
                                borderBottom: "1px solid #eee",
                                fontSize: 12
                            }}>
                                包含结构物: <a onClick={() => {
                                    dispatch(getReviewReport())
                                }}>刷新</a>
                            </h3>
                            <Table
                                size="middle"
                                className="componentsNested"
                                columns={[
                                    { title: '名称', dataIndex: 'name' },
                                    {
                                        title: '上线审核报告', render: (text, record) => {
                                            const reviewReport = reviewReports.find(r => r.structureId == record.id);
                                            if (reviewReport) {
                                                return <a onClick={() => this.showReviewReport(record.id)}>{reviewReport.name}</a>
                                            }
                                            return '(暂未生成)'
                                        }
                                    },
                                ].concat(
                                    tableType == 'unreviewed' || tableType == 'published' ? [
                                        {
                                            title: '操作',
                                            render: (text, record) => <a onClick={() => this.generateReviewReport(record.id)}>点击生成报告</a>
                                        }
                                    ] : []
                                )}
                                dataSource={struct}
                            />
                            <hr />
                        </div> : null
                } {
                    record.approveData.length > 0 ?
                        <div>
                            <h3 style={{
                                padding: "8px",
                                borderBottom: "1px solid #eee",
                                fontSize: 12
                            }}>
                                项目流程信息:
                            </h3>
                            <Table
                                size="middle"
                                className="componentsNested"
                                columns={record.approveData.length > 0 ? approveColumns : []}
                                dataSource={record.approveData}
                                pagination={false}
                            />
                        </div>
                        : record.describe ?
                            null : <div style={{ textAlign: "center" }}>暂无数据</div>
                }
            </div>
        );
    };

    render() {
        const { tableType, reGetTableData, loading, actionColumns, tableData } = this.props;
        const { baseColumns, renderList, visible, userInfo, showAddModal, generateModalId,
            generateReportModalVisible } = this.state;

        return (
            <div>
                <div id="cur-top" style={{ position: "absolute", top: -16 }}></div>
                <a href="#cur-top" id="orientation-a" style={{ position: "absolute" }}></a>
                <div style={{ paddingBottom: 16, overflow: 'auto' }}>
                    {
                        tableType == "all" && Func.judgeRights(AddProject) ?
                            <Button type="primary"
                                onClick={() => {
                                    this.setState({ showAddModal: true })
                                }}
                            >
                                新建项目
                            </Button>
                            : ""
                    }
                    <div style={{ float: "right" }}>
                        <Search
                            style={{ width: 150, marginRight: 15 }}
                            onChange={e => this.searchApp(e.target.value)}
                            placeholder="输入关键字搜索"
                        />
                        {
                            tableType == "reviewed" || tableType == "willReviewed" ?
                                <RadioGroup onChange={this.props.radioGroupChange} defaultValue="1">
                                    <RadioButton value="1">
                                        {tableType == "reviewed" ? "已通过" : "待发审"}
                                    </RadioButton>
                                    <RadioButton value="2">未通过</RadioButton>
                                </RadioGroup>
                                : ""
                        }
                    </div>
                </div>
                <Table
                    sticky
                    loading={loading}
                    expandedRowRender={this.expandedRowRender}
                    columns={baseColumns.concat(actionColumns)}
                    dataSource={renderList ? renderList : tableData}
                    pagination={{
                        onChange: (page, pageSize) => {
                            document.getElementById('orientation-a').click()
                        }
                    }}
                    style={{ width: '99%' }}
                />
                {
                    visible ?
                        <PasswordModal
                            userInfo={userInfo}
                            closeModal={() => {
                                this.setState({ visible: false })
                            }}
                            reGetTableData={reGetTableData}
                        />
                        : null
                }
                <AddForm
                    closeModal={() => {
                        this.setState({ showAddModal: false })
                    }}
                    visible={showAddModal}
                />
                <GenerateReportModal
                    generateModalId={generateModalId}
                    visible={generateReportModalVisible}
                    closeModal={() => {
                        this.setState({
                            generateReportModalVisible: false,
                            generateModalId: null
                        })
                    }}
                />
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { auth, global, fetchedReports } = state;
    return {
        user: auth.user,
        fetchedReports: fetchedReports,
        resourceRoot: global.resourceRoot,
    };
}

export default connect(mapStateToProps)(AppTable)