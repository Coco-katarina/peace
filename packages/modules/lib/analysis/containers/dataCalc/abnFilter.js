/**
 * Created by wuqun on 2018/6/20.
 */
'use strict';

import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Button, Card, Table, Tag, Popconfirm, Switch, Row, Col, message, Input, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { PinyinHelper } from '@peace/utils';
import { getAbnFilterMethods, getAbnFilterCfgs, changeCfgStatus, deleteAbnFilterCfg, batchAbnFilterCfgs } from '../../actions/abnFilterCfg';
import FilterMethodModal from '../../components/dataCalc/filter-method-modal';

class AbnFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            selectedRowKeys: [],
            modalData: null,
            searchValue: null,
        }
    }
    componentDidMount() {
        const { dispatch, user } = this.props;
        dispatch(getAbnFilterMethods());
    }
    onClickAdd = () => {
        this.setState({ modalVisible: true });
    }
    modalCancel = e => {
        this.setState({ modalVisible: false, modalData: null });
    };
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }
    //禁用or启用
    enableCfg = (e, record) => {
        let pushState = {
            state: !record.enable,
            updateTime: moment().format('YYYY-MM-DD HH:mm:ss')
        };
        this.props.dispatch(changeCfgStatus(record.id, pushState)).then(_ => {
            this.props.dispatch(getAbnFilterCfgs(this.props.structId));
        });
    };
    //编辑
    compareAndEdit = (e, record) => {
        this.setState({
            modalVisible: true,
            modalData: record,
        });
    }
    //删除
    removeItem = (id) => {
        this.props.dispatch(deleteAbnFilterCfg(id)).then(() => {
            this.props.dispatch(getAbnFilterCfgs(this.props.structId));
        });
    };
    //批量启用or禁用
    onSwitchChange = (e) => {
        if (this.state.selectedRowKeys.length != 0) {
            let ids = this.state.selectedRowKeys.join(',');
            let data = {
                enable: e,
                updateTime: moment().format('YYYY-MM-DD HH:mm:ss')
            };
            this.props.dispatch(batchAbnFilterCfgs(ids, data)).then(_ => {
                this.props.dispatch(getAbnFilterCfgs(this.props.structId));
            });
        }
    }
    //批量删除
    batchDelete = () => {
        if (this.state.selectedRowKeys.length != 0) {
            let ids = this.state.selectedRowKeys.join(',');
            this.props.dispatch(deleteAbnFilterCfg(ids)).then(_ => {
                this.props.dispatch(getAbnFilterCfgs(this.props.structId));
            });
        } else {
            message.warning('您尚未勾选任何参数配置！');
        }
    }

    handleInputChange = (e) => {
        this.setState({ searchValue: e.target.value })
    }

    render() {
        const { abnFilterMethods, filterCfgs } = this.props;
        const { searchValue } = this.state;
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
        };
        //按监测因素
        let cfgs = filterCfgs && filterCfgs.filter(c => {
            return c.factorId == this.props.cfgFilterFactorId &&
                (searchValue ?
                    PinyinHelper.isPinyinMatched(c.stationName, searchValue)
                    : true)
        });
        let batchDisplay = { display: cfgs && cfgs.length > 0 ? 'inline-block' : 'none', float: 'right' };
        let columns = [
            {
                title: "测点",
                dataIndex: "stationName",
                key: "stationName",
                width: '15%',
            },
            {
                title: "监测项",
                dataIndex: "factorName",
                key: "factorName",
                width: '15%',
                render: (text, record) => (
                    record.factorName + "/" + record.itemName
                ),
            },
            {
                title: "算法",
                dataIndex: "methodName",
                key: "methodName",
                width: '15%',
            },
            {
                title: "状态",
                dataIndex: "enable",
                key: "enable",
                width: '15%',
                render: (text, record) => (
                    record.enable ? <Tag color="blue">运行中</Tag> : <Tag>关闭</Tag>
                )
            },
            {
                title: "更新时间",
                dataIndex: "updateTime",
                key: "updateTime",
                width: '15%',
                // render: (text, record) => {
                //     moment(record.updateTime).format('YYYY-MM-DD HH:mm:ss')
                // }
            },
            {
                title: "操作",
                key: "action",
                width: '15%',
                render: (text, record) => (
                    <span>
                        <a onClick={(e) => this.enableCfg(e, record)}>{record.enable ? '禁用' : '启用'}</a>
                        <Divider type="vertical" />
                        <a onClick={(e) => this.compareAndEdit(e, record)}>编辑</a>
                        <Divider type="vertical" />
                        <Popconfirm title="确认删除该参数配置?" id={record.id} onConfirm={() => { this.removeItem(record.id) }}>
                            <a>删除</a>
                        </Popconfirm>
                    </span>
                ),
            }
        ];
        return (<Card>
            <Row style={{ marginBottom: 16 }}>
                <Col span={20}>
                    <Input id="searchInput"
                        style={{
                            zIndex: 1,
                            float: 'left',
                            width: '25%',
                            marginRight: 8
                        }}
                        placeholder="测点名称" onChange={this.handleInputChange}
                        suffix={<SearchOutlined />}
                    />
                    <Button type="primary" onClick={this.onClickAdd} style={{ height: 32 }}>添加过滤算法</Button>
                </Col>
                <Col offset={0} style={batchDisplay}>
                    <Switch checkedChildren="批量启用" unCheckedChildren="批量禁用" defaultChecked={'批量启用'} onChange={this.onSwitchChange} />
                    <Popconfirm title="确认批量删除?" onConfirm={this.batchDelete}>
                        <Button style={{ marginLeft: 5 }} type="default">批量删除</Button>
                    </Popconfirm>
                </Col>
            </Row>
            <Table rowSelection={rowSelection} columns={columns} dataSource={cfgs} />
            {this.state.modalVisible ?
                <FilterMethodModal
                    structId={this.props.structId}
                    methods={abnFilterMethods}
                    visible={true}
                    closeModal={this.modalCancel}
                    filFactorChange={this.props.filFactorChange}
                    factorId={this.props.factorId}
                    itemId={this.props.itemId}
                    modalData={this.state.modalData}
                /> : ''}
        </Card>
        );
    }
}

function mapStateToProps(state) {
    const { auth, abnFilterMethods, abnFilterConfig } = state;
    return {
        abnFilterMethods: abnFilterMethods.data,
        filterCfgs: abnFilterConfig.data,
        user: auth.user//用户信息
    }
}

export default connect(mapStateToProps)(AbnFilter);
