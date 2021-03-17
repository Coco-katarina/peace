/**
 * update by zhouxin on 2018/8/20.
 */
import React, { Component } from 'react';
import { Button, Table, Popconfirm } from 'antd';
import AbnPushCfgModal from './abnPushCfgModal'
import { connect } from 'react-redux';
import { getPushList, deletePushCfg } from "../../actions/abnPushCfg";
import { getStructures } from "../../actions/structure";

class AbnPushCfgTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            modalData: {},
            modalEdit: false
        };
    }

    // componentDidMount() {
    //     const { dispatch, user } = this.props;
    //     dispatch(getStructures(user.orgId));
    // }

    componentDidMount() {
        const { dispatch, user } = this.props;
        dispatch(getStructures(user.orgId));
        dispatch(getPushList(user.orgId));
    }

    delAbnCfg = e => {
        let id = this.props.abnCfgs[e].id;
        this.props.dispatch(deletePushCfg(id)).then(() => {
            this.props.dispatch(getPushList(this.props.user.orgId));
        });
    };

    editAbnCfg = e => {
        this.setState({
            modalVisible: true,
            modalData: this.props.abnCfgs[e.target.id],
            modalEdit: true
        });
    };

    addModal = () => {
        this.setState({ modalVisible: true, modalEdit: false, modalData: null });
    };

    modalCancel = e => {
        this.setState({ modalVisible: false });
    };

    formatTable = () => {
        const { allStructs, abnCfgs } = this.props;
        let tableData = [];
        if (allStructs && allStructs.length) {
            for (let idx = 0; idx < abnCfgs.length; idx++) {
                let temp = abnCfgs[idx];
                let structures = [];
                let struIdArr = [];
                for (let i in temp.projects) {
                    for (let j in temp.projects[i].structures) {
                        let currStrucId = temp.projects[i].structures[j].id;
                        if (!struIdArr.includes(currStrucId) && allStructs.some(as => as.id == currStrucId)) {
                            structures.push(temp.projects[i].structures[j].name);
                        }
                        struIdArr.push(currStrucId);
                    }
                }
                if (structures.length) {
                    tableData.push(
                        {
                            key: idx,
                            name: temp.noticedUser.map(user => {
                                return user.name;
                            }),
                            structures: structures,
                            state: temp.enabled ? "已启用" : "已禁用",
                            action: idx
                        }
                    )
                }
            }
        }
        return tableData;
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
        let tableColumns = [
            {
                title: "接收人",
                dataIndex: "name",
                key: "name",
                width: '15%'
            },
            {
                title: "关注结构物",
                dataIndex: "structures",
                key: "structures",
                render: text => text.join("/"),
                width: '60%'
            },
            {
                title: "启用状态",
                dataIndex: "state",
                key: "state",
                width: '10%'
            },
            {
                title: "操作",
                key: "action",
                render: text => {
                    return <span>
                        <a onClick={this.editAbnCfg} id={text.key} style={{ marginRight: 5 }}>修改</a>
                        <span className="ant-divider" />
                        <Popconfirm title="确认删除该接收人?" id={text.key} onConfirm={() => { this.delAbnCfg(text.key) }}>
                            <a style={{ marginLeft: 5 }}>删除</a>
                        </Popconfirm>
                    </span>;
                },
                width: '15%'
            }
        ];
        return (
            <div>
                <Button type="primary" onClick={this.addModal}>添加</Button>
                <div style={{ marginTop: "20px" }}>
                    <Table
                        columns={tableColumns}
                        dataSource={this.formatTable()}
                        pagination={this.getPagination()}
                        loading={this.props.isRequestingAbn}
                        locale={{ emptyText: '暂无异常数据报告推送配置' }}
                    />

                    {this.state.modalVisible ? <AbnPushCfgModal
                        visible={true}
                        closeModal={this.modalCancel}
                        modalData={this.state.modalData}
                        isEdit={this.state.modalEdit}
                    /> : ''}

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { pushCfgList, auth, thresholdStructures } = state;
    return {
        abnCfgs: pushCfgList.data || [],
        user: auth.user,
        isRequestingAbn: pushCfgList.isRequesting || thresholdStructures.isRequesting,
        allStructs: thresholdStructures.data || [],
    };
}

export default connect(mapStateToProps)(AbnPushCfgTable);