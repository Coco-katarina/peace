/**
 * Created by wuqun on 2018/6/20.
 */
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Input, Table, Card, Switch, Popconfirm, Tag, message, Form, Divider } from 'antd';
import { deleteAbnParams, getAbnParamList, batchCfgAbnParams } from '../../actions/abnParamCfg';
import InterruptModal from '../../components/dataCalc/interrupt-modal';

var filterSet = { stationName: null, factorName: null }
class Interrupt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            filterFunc: {},
            modalVisible: false,
            ivBatch: '',
        }
    }
    formRef = React.createRef();
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }
    compareAndEdit = (e, record) => {
        this.setState({
            modalVisible: true,
            modalData: record,
        });
    }
    modalCancel = e => {
        this.setState({ modalVisible: false });
    };
    removeItem = e => {
        this.props.dispatch(deleteAbnParams(e)).then(() => {
            this.props.dispatch(getAbnParamList(this.props.structId));
        });
    };
    handleInputChange = e => {
        if (e.target.value != null) {
            const value = e.target.value;
            let func = (ep => (s => (s.stationName).search(ep) > -1))(value);
            filterSet.stationName = func;
            func = (ep => (s => (s.factorName).search(ep) > -1))(value);
            filterSet.factorName = func;
        } else {
            filterSet.stationName = null;
            filterSet.factorName = null;
        }
        this.setState({ filterFunc: filterSet })
    }
    //批量启用or禁用
    onSwitchChange = (e) => {
        if (this.state.selectedRowKeys.length != 0) {
            let ids = this.state.selectedRowKeys.join(',');
            let data = {
                enabled: e,
                use: 'switch'
            };
            this.props.dispatch(batchCfgAbnParams(ids, data)).then(_ => {
                this.props.dispatch(getAbnParamList(this.props.structId));
            });
        }
    }
    //批量删除
    batchDelete = () => {
        if (this.state.selectedRowKeys.length != 0) {
            let ids = this.state.selectedRowKeys.join(',');
            this.props.dispatch(deleteAbnParams(ids)).then(_ => {
                this.props.dispatch(getAbnParamList(this.props.structId));
            });
        } else {
            message.warning('您尚未勾选任何参数配置！');
        }
    }
    //批量保存
    batchSave = () => {
        const form = this.formRef.current;
        form.validateFields().then(values => {
            let dataSource = this.props.abnParamList.filter(a => a.abnType == 1 && a.factorId == this.props.factorId);
            if (this.state.selectedRowKeys.length != 0) {
                let ids = this.state.selectedRowKeys.join(',');
                let data = {
                    paramJson: { "thr_int": this.state.ivBatch },
                    use: 'notSwitch',
                };
                this.props.dispatch(batchCfgAbnParams(ids, data)).then(_ => {
                    this.props.dispatch(getAbnParamList(this.props.structId));
                });
            } else if (dataSource.length != 0) {
                message.warning('您尚未勾选任何参数配置！');
            }
        })
    }
    batchInterrupt = (value) => {
        this.setState({
            ivBatch: value
        });
    }
    checkInterger = (rule, value, callback) => {
        if (!value) {
            return Promise.resolve()
        } else {
            const pattern = /^[1-9]*[1-9][0-9]*$/;
            if (pattern.test(value)) {
                return Promise.resolve()
            } else {
                return Promise.reject('请输入正整数');
            }
        }
    };
    render() {
        let dataSource = this.props.abnParamList.filter(a => a.abnType == 1 && a.factorId == this.props.factorId);
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let filterData = dataSource;
        let flag = false;
        let keyArr = [];
        let tmpds = [];
        let dataPush = [];
        Object.keys(this.state.filterFunc).forEach(key => {
            const filter = this.state.filterFunc[key];
            filterData = dataSource;
            if (filter != null) {
                flag = true;
                filterData = filterData.filter(filter)
                if (filterData.length > 0) {
                    filterData.map(s => {
                        if (keyArr.indexOf(s.id) == -1) {
                            keyArr.push(s.id);
                            dataPush.push(s);
                        }
                    })
                }
            }
        })
        tmpds = flag ? dataPush.sort((a, b) => a.id - b.id) : dataSource.sort((a, b) => a.id - b.id);
        let columns = [
            {
                title: "测点位置",
                dataIndex: "stationName",
                key: "stationName",
                width: '20%',
            },
            {
                title: "监测因素",
                dataIndex: "factorName",
                key: "factorName",
                width: '20%',
            },
            {
                title: "中断阈值",
                dataIndex: "params",
                key: "params",
                width: '20%',
                render: text => text.thr_int
                // render: text => {
                //     return (<Input style={{ width: 121 }} defaultValue={text.thr_int} placeholder="正整数" />)
                // }
            },
            {
                title: "启用状态",
                dataIndex: "enabled",
                key: "enabled",
                width: '20%',
                render: (text, record) => (
                    record.enabled ? <Tag color="blue">已启用</Tag> : <Tag>已禁用</Tag>
                )
            },
            {
                title: "操作",
                key: "action",
                width: '20%',
                render: (text, record) => (
                    <span>
                        <a onClick={(e) => this.compareAndEdit(e, record)}>编辑</a>
                        <Divider type="vertical" />
                        <Popconfirm title="确认删除该参数配置?" id={record.id} onConfirm={() => { this.removeItem(record.id) }}>
                            <a>删除</a>
                        </Popconfirm>
                    </span>
                ),
            }
        ]
        return (<Card style={{ marginTop: 15 }}>
            <Form ref={this.formRef} style={{ marginBottom: 15 }} layout="inline">
                <Form.Item style={{ marginBottom: 0 }}>
                    <Input placeholder="关键词：测点位置、监测因素" onChange={this.handleInputChange} />
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }}>
                    <Switch checkedChildren="批量启用" unCheckedChildren="批量禁用" defaultChecked={'批量启用'} onChange={this.onSwitchChange} />
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }}
                    name="inter-iv"
                    key="inter-iv"
                    rules={[
                        { required: true, message: '请输入中断阈值' },
                        { validator: this.checkInterger }
                    ]}
                >
                    <Input onChange={e => this.batchInterrupt(e.target.value)} placeholder="中断阈值：正整数" />
                </Form.Item>
                <Form.Item >
                    <Button type="default" onClick={this.batchSave}>批量保存</Button>
                </Form.Item>
                <Form.Item >
                    <Popconfirm title="确认批量删除选中的参数配置?" onConfirm={this.batchDelete}>
                        <Button style={{ fontSize: 13 }} type="default">批量删除</Button>
                    </Popconfirm>
                </Form.Item>
            </Form>
            <Table rowSelection={rowSelection} columns={columns} dataSource={tmpds} />
            {this.state.modalVisible ? <InterruptModal
                structId={this.props.structId}
                visible={true}
                closeModal={this.modalCancel}
                modalData={this.state.modalData}
            /> : ''}
        </Card>
        );
    }
}
function mapStateToProps(state) {
    const { abnParamList } = state;
    let isRequesting = abnParamList.isRequesting;

    return {
        isRequesting: isRequesting,//请求状态
        abnParamList: abnParamList.data || []
    }
}
export default connect(mapStateToProps)(Interrupt);
