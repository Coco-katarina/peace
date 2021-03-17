'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { Row, Col, Button, Input, Table, Card, Switch, Popconfirm, Tag, message, Form, Select, Divider } from 'antd';
import { deleteAbnParams, getAbnParamList, batchCfgAbnParams } from '../../actions/abnParamCfg';
import TrendModal from '../../components/dataCalc/trend-modal';

var filterSet = { stationName: null, factorName: null }

class Trend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            filterFunc: {},
            modalVisible: false,
            showBatchConfig: false,
            timeRange: '',
            bvBatch: '',
            winSize: '',
            reCoef: '',
            deValue: '',
            graPoint: '',
            graValue: '',
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
        const { abnParamList, factorId } = this.props;
        form.validateFields().then(values => {
            let dataSource = abnParamList.filter(a => a.abnType == 3 && a.factorId == factorId);
            if (this.state.selectedRowKeys.length != 0) {
                let ids = this.state.selectedRowKeys.join(',');
                let data = {
                    paramJson: {
                        "thr_der": this.state.deValue, //导数阈值
                        "win_avg": this.state.reCoef,//滑动均值
                        "win_med": this.state.winSize,//滑动中值
                        "thr_burr": this.state.bvBatch,//毛刺阈值
                        "thr_grad": this.state.graValue,//渐变阈值
                        "win_grad": this.state.graPoint,//渐变点个数
                        "days_Last": this.state.timeRange//分析时长
                    },
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
    iconClick = () => {
        if (!this.state.showBatchConfig) {
            this.setState({ showBatchConfig: true })
        } else {
            this.setState({ showBatchConfig: false })
        }
    }
    rangeChange = (value) => {
        this.setState({ timeRange: value });
    }
    bvValueBatch = (value) => {
        this.setState({ bvBatch: value });
    }
    winSizeBatch = (value) => {
        this.setState({ winSize: value });
    }
    reCoefBatch = (value) => {
        this.setState({ reCoef: value });
    }
    deValueBatch = (value) => {
        this.setState({ deValue: value });
    }
    graPointBatch = (value) => {
        this.setState({ graPoint: value });
    }
    graValueBatch = (value) => {
        this.setState({ graValue: value });
    }
    checkInterger = (rule, value, callback) => {
        if (!value) {
            callback();
        } else {
            const pattern = /^[1-9]*[1-9][0-9]*$/;
            if (pattern.test(value)) {
                callback();
            } else {
                callback(new Error('请输入正整数'));
            }
        }
    };
    checkPoint = (rule, value, callback) => {
        if (!value) {
            callback();
        } else {
            const pattern = /^[1-9]*[1-9][0-9]*$/;
            if (pattern.test(value) && value != 1) {
                callback();
            } else {
                callback(new Error('请输入大于1的正整数'));
            }
        }
    }
    checkNumber = (rule, value, callback) => {
        if (!value) {
            callback();
        } else {
            const pattern = /^-?\d+(\.\d+)?$/;
            if (pattern.test(value)) {
                callback();
            } else {
                callback(new Error('请输入数字'));
            }
        }
    }
    render() {
        const { abnParamList, factorId } = this.props;
        let dataSource = abnParamList.filter(a => a.abnType == 3 && a.factorId == factorId) || [];
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
                width: '9%'
            },
            {
                title: "监测项",
                dataIndex: "factorName",
                key: "factorName",
                width: '10%',
                render: (text, record) => (
                    record.factorName + "/" + record.itemName
                ),
            },
            {
                title: "分析时段",
                dataIndex: "params",
                key: "params1",
                width: '9%',
                render: text => text.days_Last + "个月"
            },
            {
                title: "毛刺阈值",
                dataIndex: "params",
                key: "params2",
                width: '9%',
                render: text => text.thr_burr
            },
            {
                title: "窗口数",
                dataIndex: "params",
                key: "params3",
                width: '9%',
                render: text => text.win_med
            },
            {
                title: "回归系数",
                dataIndex: "params",
                key: "params4",
                width: '9%',
                render: text => text.win_avg
            },
            {
                title: "导数阈值",
                dataIndex: "params",
                key: "params5",
                width: '9%',
                render: text => text.thr_der
            },
            {
                title: "渐变点个数",
                dataIndex: "params",
                key: "params6",
                width: '9%',
                render: text => text.win_grad
            },
            {
                title: "渐变阈值",
                dataIndex: "params",
                key: "params7",
                width: '9%',
                render: text => text.thr_grad
            },
            {
                title: "启用状态",
                dataIndex: "enabled",
                key: "enabled",
                width: '9%',
                render: (text, record) => (
                    record.enabled ? <Tag color="blue">已启用</Tag> : <Tag>已禁用</Tag>
                )
            },
            {
                title: "操作",
                key: "action",
                width: '9%',
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
                    <Input size='default' placeholder="关键词：测点位置、监测因素" onChange={this.handleInputChange} />
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }}>
                    <Switch checkedChildren="批量启用" unCheckedChildren="批量禁用" defaultChecked={'批量启用'} onChange={this.onSwitchChange} />
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }}>
                    <Popconfirm title="确认批量删除选中的参数配置?" onConfirm={this.batchDelete}>
                        <Button style={{ fontSize: 13 }} type="default">批量删除</Button>
                    </Popconfirm>
                </Form.Item>
                <Button icon={<PlusOutlined />} onClick={this.iconClick} />
                {this.state.showBatchConfig ?
                    <Row style={{ marginTop: 10 }}>
                        <Form.Item
                            style={{ marginBottom: 0 }}
                            name={"timeRange"}
                            key={"timeRange"}
                            rules={[{ required: true, message: '请选择分析时长' }]}
                        >
                            <Select style={{ width: 127 }} id="timeRange" onChange={this.rangeChange} placeholder="请选择分析时长">
                                <Select.Option value="1">1个月</Select.Option>
                                <Select.Option value="2">2个月</Select.Option>
                                <Select.Option value="3">3个月</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }}
                            name={"bv"}
                            key={"bv"}
                            rules={[
                                { required: true, message: '请输入毛刺阈值' },
                                { validator: this.checkNumber }
                            ]}
                        >
                            <Input size='default'
                                onChange={e => this.bvValueBatch(e.target.value)} placeholder="毛刺阈值：数字" />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }}
                            name={"ws"}
                            key={"ws"}
                            rules={[
                                { required: true, message: '请输入滑动中值' },
                                { validator: this.checkInterger }
                            ]}
                        >
                            <Input size='default'
                                onChange={e => this.winSizeBatch(e.target.value)} placeholder="滑动中值：正值" />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }}
                            name={"rc"}
                            key={"rc"}
                            rules={[
                                { required: true, message: '请输入滑动均值' },
                                { validator: this.checkInterger }
                            ]}
                        >
                            <Input onChange={e => this.reCoefBatch(e.target.value)} placeholder="滑动均值：正值" />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }}
                            name={"dv"}
                            key={"dv"}
                            rules={[
                                { required: true, message: '请输入导数阈值' },
                                { validator: this.checkNumber }
                            ]}
                        >
                            <Input onChange={e => this.deValueBatch(e.target.value)} placeholder="导数阈值：数字" />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }}
                            name={"pn"}
                            key={"pn"}
                            rules={[
                                { required: true, message: '请输入渐变点个数' },
                                { validator: this.checkPoint }
                            ]}
                        >
                            <Input onChange={e => this.graPointBatch(e.target.value)} placeholder="渐变点个数：正值" />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }}
                            name={"gv"}
                            key={"gv"}
                            rules={[
                                { required: true, message: '请输入渐变阈值' },
                                { validator: this.checkNumber }
                            ]}
                        >
                            <Input onChange={e => this.graValueBatch(e.target.value)} placeholder="渐变阈值：数字" />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button size='default' type="default" onClick={this.batchSave}>批量保存</Button>
                        </Form.Item>
                    </Row> : ''}
            </Form>
            <Table rowSelection={rowSelection} columns={columns} dataSource={tmpds} />
            {
                this.state.modalVisible ? <TrendModal
                    structId={this.props.structId}
                    visible={true}
                    closeModal={this.modalCancel}
                    modalData={this.state.modalData}
                /> : ''
            }
        </Card >
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
export default connect(mapStateToProps)(Trend);

