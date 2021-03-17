/**
 * Created by wuqun on 2018/6/20.
 */
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MultiSelect } from '@peace/components';
import { Form, Select, Cascader, Input, Button, Row, Col, message, Alert } from 'antd';
import { addAbnParams, getAbnParamList } from '../../actions/abnParamCfg';

const Option = Select.Option;
const methodType = {
    'interrupt': 1,
    'burr': 2,
    'trend': 3,
}
const methodDes = {
    'interrupt': "中断",
    'burr': "毛刺",
    'trend': "异常趋势",
}
class FactorAndStations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //currentBtn: 'interrupt',
            //selectedPointId: this.props.stationsValue,
            msg: ''
        }
    }
    formRef = React.createRef();
    renderFactorItems = () => {
        const newData = []
        if (this.props.factors) {
            this.props.factors.map(s => {
                if (s.checked) {
                    newData.push({
                        value: s.id, label: s.name,
                        children: s.items.map(k => { return { value: k.id, label: k.name } })
                    })
                }
            });
        }
        return newData;
    }
    onFactorChange = (value) => {
        this.props.factorChange(value);
    }
    onStationsChange = (value) => {
        // this.setState({
        //     selectedPointId: value
        // })
        this.props.stationsChange(value);
    }
    getJson = (values) => {
        let paramJson;
        switch (this.props.methodType) {
            case 'interrupt':
                return paramJson = { "thr_int": Number(values.iv) };
            case 'burr':
                return paramJson = { "thr_burr": Number(values.bv1) }
            case 'trend':
                return paramJson = {
                    "thr_burr": Number(values.bv2),//毛刺阈值
                    "win_med": Number(values.ws),//滑动中值窗口
                    "win_avg": Number(values.rc),//滑动均值窗口
                    "win_grad": Number(values.pn),//渐变点个数
                    "thr_grad": Number(values.gv),//渐变阈值
                    "thr_der": Number(values.dv),//导数阈值
                    "days_Last": Number(values.timeRange),//时间跨度
                }
        }
    }
    getStationstoSave = () => {
        let toSave = [], toSaveName = [], notToSave = [], notToSaveName = [];
        let selectIds = this.props.stationsValue;
        for (let i = 0; i < selectIds.length; i++) {
            let seStaName = this.props.stations.find(a => a.id == selectIds[i]).name;
            let cfg;
            if (this.props.methodType == "interrupt") {
                cfg = this.props.abnParamList.find(a => a.abnType == 1 && a.factorId == this.props.factorId
                    && a.stationId == selectIds[i]);
            } else {
                let type = this.props.methodType == "burr" ? 2 : 3;
                cfg = this.props.abnParamList.find(a => a.abnType == type && a.factorId == this.props.factorId
                    && a.stationId == selectIds[i] && a.itemId == this.props.itemId);
            }
            if (!cfg) {
                toSave.push(selectIds[i]);
                toSaveName.push(seStaName);
            } else {
                notToSave.push(selectIds[i]);
                notToSaveName.push(seStaName);
            }
        }
        return {
            toSave: toSave, toSaveName: toSaveName,
            notToSave: notToSave, notToSaveName: notToSaveName
        };
    }
    handleSave = () => {
        this.setState({ msg: '' });
        const form = this.formRef.current;
        form.validateFields().then(values => {
            if (this.props.stationsValue.length != 0) {
                let ids = this.getStationstoSave();
                if (ids.toSave.length != 0) {
                    let paramJson = this.getJson(values);
                    let data = {
                        station: ids.toSave,//测点
                        factorId: this.props.factorId,
                        itemId: this.props.itemId,
                        abnType: methodType[this.props.methodType],//算法类型
                        enabled: true,
                        params: paramJson
                    };
                    let pushData = data.station.map(d => {
                        return {
                            station: d,//测点
                            factorId: this.props.factorId,
                            itemId: this.props.methodType == 'interrupt' ? null : this.props.itemId,
                            abnType: methodType[this.props.methodType],//算法类型
                            enabled: true,
                            params: paramJson
                        }
                    });
                    this.props.dispatch(addAbnParams(this.props.structId, pushData)).then(_ => {
                        this.props.dispatch(getAbnParamList(this.props.structId));
                    });
                    if (ids.notToSave.length != 0) {
                        let fact = this.props.methodType == 'interrupt' ? "因素" : "子项";
                        this.setState({
                            msg: "已存在传感器：" + ids.notToSaveName.join('，') + "在当前监测" + fact + "下的"
                                + methodDes[this.props.methodType] + "参数配置，本次保存的传感器为：" + ids.toSaveName.join('，')
                        });
                    }
                } else {
                    let sg = this.props.methodType == 'interrupt' ? "因素下的中断"
                        : this.props.methodType == 'burr' ? "子项下的毛刺" : "子项下的异常趋势";
                    this.setState({
                        msg: "已存在选定测点在当前监测" + sg + "参数配置，本次无可保存的参数配置"
                    });
                }
            } else {
                message.error('请选择测点!');
                return false;
            }
        });
    }
    dataCompare = () => {
        this.setState({ msg: '' });
        const form = this.formRef.current;
        form.validateFields().then(values => {
            if (this.props.stationsValue.length != 0) {
                let paramJson = this.getJson(values);
                let data = {
                    station: this.props.stationsValue[0],//第一个测点
                    factorId: this.props.factorId,
                    itemId: this.props.itemId,
                    abnType: this.props.methodType,//算法类型
                    enabled: true,
                    params: paramJson
                };
                this.props.dataCompara(data);
            } else {
                message.error('请选择测点!');
                return false;
            }
        });
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
    changeMethod = (value) => {
        //this.setState({ currentBtn: value });
        this.props.changeMethod(value);
    }
    renderParamsConfig() {
        switch (this.props.methodType) {
            case 'interrupt':
                return (
                    // <Col span={6}>
                    <Form.Item
                        key={"iv"}
                        name={"iv"}
                        rules={[{ required: true, message: '请输入中断阈值' },
                        { validator: this.checkInterger }]}
                    >
                        <Input style={{ width: 274 }} placeholder="中断阈值：正整数" />
                    </Form.Item>
                    // </Col>
                );
            case 'burr':
                return (
                    // <Col span={6}>
                    <Form.Item
                        key={"bv1"}
                        name={"bv1"}
                        rules={[{ required: true, message: '请输入毛刺阈值' },
                        { validator: this.checkNumber }]}
                    >
                        <Input id="bv1" style={{ width: 274 }} placeholder="毛刺阈值：数字" />
                    </Form.Item>
                    // </Col >
                );
            case 'trend':
                return (
                    <Col span={18}>
                        <Row>
                            <Col span={4}>
                                <Form.Item
                                    key={"bv2"}
                                    name={"bv2"}
                                    rules={[{ required: true, message: '请输入毛刺阈值' },
                                    { validator: this.checkNumber }]}>
                                    <Input id="bv2" placeholder="毛刺阈值：数字" />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item
                                    key={"ws"}
                                    name={"ws"}
                                    rules={[{ required: true, message: '请输入滑动中值' },
                                    { validator: this.checkInterger }]}>
                                    <Input id="ws" placeholder="滑动中值：正值" />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item
                                    key={"rc"}
                                    name={"rc"}
                                    rules={[{ required: true, message: '请输入滑动均值' },
                                    { validator: this.checkInterger }]}
                                >
                                    <Input id="rc" placeholder="滑动均值：正值" />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item
                                    key={"dv"}
                                    name={"dv"}
                                    rules={[
                                        { required: true, message: '请输入导数阈值' },
                                        { validator: this.checkNumber }
                                    ]}
                                >
                                    <Input id="dv" placeholder="导数阈值：数字" />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item
                                    key={"pn"}
                                    name={"pn"}
                                    rules={[
                                        { required: true, message: '请输入渐变点个数' },
                                        { validator: this.checkPoint }
                                    ]}
                                >
                                    <Input id="pn" placeholder="渐变点个数：正值" />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item
                                    key={"gv"}
                                    name={"gv"}
                                    rules={[
                                        { required: true, message: '请输入渐变阈值' },
                                        { validator: this.checkNumber }
                                    ]}
                                >
                                    <Input id="gv" placeholder="渐变阈值：数字" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col >);
        }
    }
    render() {
        const { factorId, structures, factors, stations, abnMethods } = this.props;
        let childrenOptions = [];
        if (stations) {
            for (let k = 0; k < stations.length; k++) {
                childrenOptions.push(
                    {
                        key: stations[k].id,
                        id: stations[k].id,
                        name: stations[k].name
                    }
                )
            }
        }
        const arr = [];
        if (this.props.stationsValue.length > 0) {
            this.props.stationsValue.map(s => {
                if (s)
                    arr.push(s.toString());
            })
        }
        return (
            <div style={{ marginTop: 15 }}>
                <hr style={{ borderTopWidth: 0, marginBottom: 18 }} />

                <Form
                    ref={this.formRef}
                    layout="inline"
                    style={{ textAlign: 'left', marginTop: 15 }}>
                    <Form.Item>
                        <Cascader id='factor' value={[this.props.factorId, this.props.itemId]}
                            onChange={this.onFactorChange} style={{ textAlign: 'left', width: 274 }}
                            options={this.renderFactorItems()} placeholder="请选择监测项" />
                    </Form.Item>
                    <Form.Item>
                        <MultiSelect placeholder="请选择" mode="multiple" style={{ height: 32, width: 274 }}
                            options={childrenOptions} value={arr} onChange={this.onStationsChange} />
                    </Form.Item>
                    <Form.Item
                        key="method"
                        name="method"
                        initialValue={this.props.methodType}
                    >
                        <Select
                            id="method"
                            onChange={this.changeMethod}
                            style={{ width: 127 }}
                            placeholder="请选择异常识别算法">
                            {abnMethods ? abnMethods.map(s => <Option key={s.name} value={s.name}>{s.des}</Option>) : []}
                            {/* <Select.Option value="interrupt">中断</Select.Option>
                                        <Select.Option value="burr">毛刺</Select.Option>
                                        <Select.Option value="trend">异常趋势</Select.Option> */}
                        </Select>
                    </Form.Item>
                    {this.props.methodType == 'trend' ?
                        <Form.Item
                            key="timeRange"
                            name="timeRange"
                            rules={[{ required: true, message: '请选择分析时长' }]}
                        >
                            <Select style={{ width: 132 }} id="timeRange" placeholder="请选择分析时长">
                                <Select.Option key="1" value="1">1个月</Select.Option>
                                <Select.Option key="2" value="2">2个月</Select.Option>
                                <Select.Option key="3" value="3">3个月</Select.Option>
                            </Select>
                        </Form.Item>
                        : ''
                    }
                    <Row style={{ textAlign: 'left', marginTop: 15, width: '100%' }}                    >
                        {this.renderParamsConfig()}
                        <Form.Item>
                            <Button size='default' type="default" onClick={this.dataCompare}>数据对比</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button size='default' type="primary" onClick={this.handleSave}>保存配置</Button>
                        </Form.Item>
                    </Row>
                </Form>
                { this.state.msg == '' ? '' : <Alert style={{ marginTop: 15 }} message={this.state.msg} type="warning" />}
            </div >
        );
    }
}

function mapStateToProps(state) {
    const { auth, thresholdStructures, abnMethods, abnParamList, thresholdFactors, thresholdStations } = state;
    let isRequesting = thresholdStructures.isRequesting || thresholdFactors.isRequesting;

    return {
        isRequesting: isRequesting,//请求状态
        abnMethods: abnMethods.data,//
        structures: thresholdStructures.data,//结构物
        abnParamList: abnParamList.data,
        factors: thresholdFactors.data,
        stations: thresholdStations.data,//测点
        user: auth.user//用户信息
    }
}

export default connect(mapStateToProps)(FactorAndStations);
