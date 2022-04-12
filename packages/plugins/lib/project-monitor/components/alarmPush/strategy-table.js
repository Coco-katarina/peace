import React, { Component } from 'react';
import { Row, Col, Button, Spin, Table, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { getStrategy, addStrategy, deleteStrategy } from '../../actions/alarm-strategy-table';
import StrategyModal from './strategy-modal';
import BroadcastStrategyModal from './broadcast-strategy-modal';
import { AuthorizationCode } from "$utils";


const addAuthCode = AuthorizationCode.AddAlarmPushStrategy;
const editAuthCode = AuthorizationCode.ModifyAlarmPushStrategy;
const delAuthCode = AuthorizationCode.DeleteAlarmPushStrategy;

class StrategyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            broadcastModalVisible: false,
            modalData: {},
            modalEdit: false,
            tableColumns: [
                {
                    title: "关注结构物",
                    dataIndex: "structure",
                    key: "structure",
                    width: '50%',
                    render: text => text.join("/")
                },
                {
                    title: "接收人",
                    dataIndex: "name",
                    key: "name",
                    width: '20%',
                    render: text => text.join("/")
                },
                {
                    title: "接收方式",
                    dataIndex: "way",
                    key: "way",
                    width: '10%',
                    render: text => text.join("/")
                },
                {
                    title: "启用状态",
                    dataIndex: "state",
                    key: "state",
                    width: '8%',
                },
                {
                    title: "操作",
                    key: "action",
                    width: '12%',
                    render: text => {
                        return <span>
                            {
                                this.props.user.resources.includes(editAuthCode) ?
                                    <a onClick={this.editStrategy} id={text.key} style={{ marginRight: 5 }}>
                                        修改
                                    </a> : ""
                            }
                            {this.props.user.resources.includes(editAuthCode) && this.props.user.resources.includes(delAuthCode) ? "|" : ""}
                            {this.props.user.resources.includes(delAuthCode) ?
                                <Popconfirm title="确认删除该告警策略?" id={text.key} onConfirm={() => { this.delStrategy(text.key) }}>
                                    <a style={{ marginLeft: 5 }}>删除</a>
                                </Popconfirm>
                                : ""}
                        </span>;
                    }
                }
            ]
        };
    }

    componentDidMount() {
        this.props.dispatch(getStrategy(this.props.user.orgId));
    }
    delStrategy = e => {
        let id = this.props.strategy[e].id;
        this.props.dispatch(deleteStrategy(id)).then(() => {
            this.props.dispatch(getStrategy(this.props.user.orgId));
        });
    };
    editStrategy = e => {
        const { strategy } = this.props;
        let modalData = strategy[e.target.id];
        this.setState({
            modalData: this.props.strategy[e.target.id],
            modalEdit: true
        });
        if (modalData.broadcastNoticed) {
            this.setState({
                broadcastModalVisible: true,
            })
        } else {
            this.setState({
                modalVisible: true,
            })
        }
    };
    addModal = () => {
        this.setState({ modalVisible: true, modalEdit: false, modalData: null });
    };
    addBroadcastModal = () => {
        this.setState({ broadcastModalVisible: true, modalEdit: false, modalData: null });
    };
    modalCancel = e => {
        this.setState({ modalVisible: false });
    };
    broadcastModalCancel = e => {
        this.setState({ broadcastModalVisible: false });
    };
    formatTableData = () => {
        const alarmCategories = ["设备类告警", "数据类告警"];
        const alarmLevel = ["一级", "二级", "三级"];
        let tableData = [];
        
        this.props.strategy.map((temp, idx) => {
            let struNameArr = [];
            let struIdArr = [];
            let way = [];

            for (let i in temp.projects) {
                for (let j in temp.projects[i].structures) {
                    if (!struIdArr.includes(temp.projects[i].structures[j].id)) {
                        struNameArr.push(temp.projects[i].structures[j].name);
                    }
                    if (!struIdArr.includes(temp.projects[i].structures[j].id))
                        struIdArr.push(temp.projects[i].structures[j].id);
                }
            }

            if (temp.emailNoticed.enabled) {
                way.push("邮件");
            }
            if (temp.smsNoticed.enabled) {
                way.push("短信");
            }
            if (temp.broadcastNoticed) {
                way.push("广播");
            }
            let flag = false;
            let ids = [];
            this.props.strategyProjectList.map(p => {
                p.projects[0].structures.map(s => ids.push(s.id));
            })
            struIdArr.map(id => {//需告警策略下所有结构物都包括
                flag = true;
                const structure = ids.find(s => s == id);
                if (!structure)
                    flag = false;
            })
            if (flag)
                tableData.push({
                    key: idx,
                    name: temp.noticedUsers.map(user => {
                        return user.name;
                    }),
                    structure: struNameArr,
                    alarmType: temp.alarmCategories.map((type, idx) => {
                        return alarmCategories[type - 1];
                    }),
                    way: way,
                    smsLevel: temp.smsNoticed.alarmLevels.map(l => {
                        return alarmLevel[l - 1];
                    }),
                    emailLevel: temp.emailNoticed.alarmLevels.map(l => {
                        return alarmLevel[l - 1];
                    }),
                    state: temp.enabled ? "已启用" : "已禁用",
                    broadcastNoticed: temp.broadcastNoticed,
                    broadcastAlarmLevels: temp.broadcastAlarmLevels ? temp.broadcastAlarmLevels.map(l => {
                        return alarmLevel[l - 1];
                    }) : [],
                    broadcastDeviceId: temp.broadcastDeviceId,
                    action: idx
                });
        });
       
        return tableData;
    }
    expandedTableRowData = (record) => {
        let columns = [
            {
                title: "接收告警类型",
                dataIndex: "alarmType",
                key: "alarmType",
                render: text => text.join("/")
            },

        ];
        if (record.broadcastNoticed) {
            columns = columns.concat(
                [{
                    title: "广播告警级别",
                    dataIndex: "broadcastAlarmLevels",
                    key: "broadcastAlarmLevels",
                    render: text => text.join("/")
                }, {
                    title: "广播设备ID",
                    dataIndex: "broadcastDeviceId",
                    key: "broadcastDeviceId",
                }]
            )
        } else {
            columns = columns.concat(
                [{
                    title: "短信接收告警级别",
                    dataIndex: "smsLevel",
                    key: "smsLevel",
                    render: text => text.join("/")
                },
                {
                    title: "邮件接收告警级别",
                    dataIndex: "emailLevel",
                    key: "emailLevel",
                    render: text => text.join("/")
                },]
            )
        }
        return (
            <Table
                columns={columns}
                dataSource={[record]}
                pagination={false}
            />
        );
    }

    render() {
        const { user, isRequestingStrategy } = this.props;
        const { modalVisible, broadcastModalVisible, tableColumns, modalEdit, modalData } = this.state;
        return (
            <div>
                {
                    this.props.user.resources.includes(addAuthCode) ?
                        <span>
                            <Button
                                type="primary"
                                onClick={this.addModal}
                                style={{ marginRight: 16 }}
                            >添加告警策略</Button>
                            <Button
                                type="primary"
                                onClick={this.addBroadcastModal}
                            >添加广播策略</Button>
                        </span>
                        : ''
                }
                <div style={{ marginTop: "20px" }}>

                    <Table
                        columns={tableColumns}
                        dataSource={this.formatTableData()}
                        //pagination={false}
                        expandedRowRender={this.expandedTableRowData}
                        loading={isRequestingStrategy}
                        locale={{ emptyText: '暂未配置告警策略' }}
                    />

                    {modalVisible ? <StrategyModal
                        visible={true}
                        closeModal={this.modalCancel}
                        modalData={modalData}
                        isEdit={modalEdit}
                        disabled={!user.resources.includes(addAuthCode)}
                    /> : ''}

                    <BroadcastStrategyModal
                        visible={broadcastModalVisible}
                        closeModal={this.broadcastModalCancel}
                        modalData={modalData}
                        isEdit={modalEdit}
                        disabled={!user.resources.includes(addAuthCode)}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { strategy, auth, strategyProjectList } = state;

    return {
        strategy: strategy.data || [],
        user: auth.user,
        isRequestingStrategy: strategy.isRequesting,
        strategyProjectList: strategyProjectList.data || []
    };
}

export default connect(mapStateToProps)(StrategyTable)