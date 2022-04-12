'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Row, Col, Input, Select, Button, Modal } from 'antd';
import Style from '../../style.css';

const Option = Select.Option;
const responseErrorCode = {
    "1001": "超时",
    "2001": "任务已过期",
    "2002": "维度未使用能力",
    "2003": "维度任务交叠",
    "2004": "维度在开始前被终止",
    "2005": "维度达到最大调用次数",
    "3001": "协议定义错误",
    "3002": "无法建立连接",
    "3003": "协议初始化异常",
    "3005": "协议数据格式异常",
    "3006": "协议加载异常",
    "3007": "协议脚本中缺少函数%s",
    "3008": "脚本调用异常",
}

class Debug extends Component {
    constructor(props) {
        super(props);
        const capEnbale = this.props.capabilityToInvoke.filter(c => !c.disabled);
        this.state = {
            command: capEnbale.length > 0 ? capEnbale[0].id : null,
            commandName: capEnbale.length > 0 ? capEnbale[0].name : null,
            // isDebugging: true, // capEnbale.length > 0 && capEnbale[0].name == '指令下发' ? true : false,
            params: null,
            modalVisible: false,
        }
    }

    handlePostcommand = () => {
        const { info } = this.props;
        this.props.handlePostcommand(this.state.command, this.state.params, info);
        this.setState({
            modalVisible: true
        })
    }

    _debugHistory = () => {
        const { info } = this.props;
        this.props.debugHistory(info);
    }

    handleOptionChange = (value) => {
        let capEnbale = this.props.capabilityToInvoke.filter(c => !c.disabled)
        let commandName = capEnbale.filter(c => c.id == value)[0].name;

        this.setState({ command: value, commandName: commandName, });
    }

    paramsChange = (event) => {
        this.setState({ params: event.target.value })
    }

    modalOk = () => {
        this.modalCancal()
    }

    modalCancal = () => {
        const { cleanRequestInvoke } = this.props;
        this.setState({
            modalVisible: false,
        })
        cleanRequestInvoke();
    }

    render() {
        let { isInvokeRequesting, responsedInvoke, info, devices, deviceMetas, invokeCapability, debugHistory } = this.props;
        const { command, commandName, isDebugging, modalVisible } = this.state;
        let response = null;
        if (responsedInvoke.data && responsedInvoke.data.result && !responsedInvoke.data.data) {
            response = responseErrorCode[responsedInvoke.data.result.code] || responsedInvoke.data.result.msg;
        } else if (responsedInvoke && responsedInvoke.data && responsedInvoke.data.data) {
            if (Array.isArray(responsedInvoke.data.data)) { //采集仪多个设备返回结果
                response = responsedInvoke.data.data.reduce((r, d) => {
                    if (!devices.instances[d.device]) return r;
                    const metaId = devices.instances[d.device].instance.deviceMetaId;
                    const meta = deviceMetas.devices.filter(m => m.id == metaId);
                    if (meta.length == 0) return r;

                    const caps = meta[0].capabilities//.filter(cap => cap.id == this.state.command);

                    if (caps.length) {
                        r.push(<h4>{devices.instances[d.device].instance.name}</h4>);
                        if (d.result && !d.data) {
                            r.push(<p style={{ paddingLeft: 16 }}>{responseErrorCode[d.result.code] || d.result.msg}</p>)
                        } else {
                            let responseKeys = Object.keys(d.data);
                            responseKeys.forEach(key => {
                                caps.forEach(cap => {
                                    if (cap.name == commandName) {
                                        cap.properties.forEach(p => {
                                            if (p.name == key) {
                                                r.push(<p style={{ paddingLeft: 16 }}><strong>{p.showName}</strong>：{d.data[key]} {p.unit}</p>);
                                            }
                                        })
                                    }
                                })
                            })
                        }
                    }

                    return r;
                }, []);
            } else if (typeof responsedInvoke.data.data == 'object') {
                let capProps = info.meta.capabilities.filter(cap => cap.id == this.state.command);
                if (capProps.length) {
                    let responseKeys = Object.keys(responsedInvoke.data.data);
                    if (capProps[0].properties.length) {
                        response = responseKeys.reduce((result, key) => {
                            capProps[0].properties.forEach(metaProp => {
                                if (metaProp.name == key) {
                                    result.push(<p><strong>{metaProp.showName}</strong>：{responsedInvoke.data.data[key]} {metaProp.unit}</p>)
                                }
                            });
                            return result;
                        }, [])
                    } else {
                        response = []
                        if (responsedInvoke.data.data && responsedInvoke.data.data.ack) {
                            try {
                                const ack = JSON.parse(responsedInvoke.data.data.ack);
                                if (ack.payload) {
                                    const payload = JSON.parse(ack.payload);
                                    if (typeof payload.E == 'string' && payload.E.indexOf('saved') != -1) {
                                        response.push(<h4>配置下发完成</h4>)
                                    }
                                }
                            } catch (e) { }
                        }
                        response.push(
                            <p style={{ wordWrap: 'break-word' }}>
                                {JSON.stringify(responsedInvoke.data.data)}
                            </p>
                        )
                    }
                }
            }
        }
        return (
            <div className={Style.debug_modal}>
                <Row className={Style.item}>
                    <Col span='3'><p className={Style.item_name}>命令：</p></Col>
                    <Col span='14'>
                        <Select defaultValue={command} style={{ width: '100%' }} onChange={this.handleOptionChange}>
                            {
                                this.props.capabilityToInvoke.map(cap => <Option key={cap.id} disabled={cap.disabled}>{cap.name}</Option>)
                            }
                        </Select>
                    </Col>
                    <Col span='2' offset='1'><Button type="primary" disabled={!this.state.command} onClick={this.handlePostcommand}>下发</Button></Col>
                </Row>
                <Row className={Style.item} style={{ /*display: isDebugging ? "block" : 'none'*/ }}>
                    <Col span='14' offset='3'><Input type="textarea" placeholder="请输入自定义命令" onChange={this.paramsChange} /></Col>
                </Row>
                <Row >
                    <Col span='12' offset='4' style={{ marginTop: 16 }}>
                        <Button type="primary" block onClick={this._debugHistory}> 下发历史记录</Button>
                    </Col>
                </Row>
                <Modal
                    title="命令下发结果"
                    visible={modalVisible}
                    onOk={this.modalOk}
                    onCancel={this.modalCancal}
                    okText="确认"
                    cancelText="关闭"
                    maskClosable={false}
                    footer={null}
                >
                    <Spin spinning={isInvokeRequesting} style={{ width: '100%' }}>
                        <div style={{ minHeight: 170 }}>
                            {
                                invokeCapability.error ?
                                    <div className={Style.results}>
                                        <p className={Style.title}>{response}</p>
                                    </div>
                                    : responsedInvoke.data && (responsedInvoke.data.data || responsedInvoke.data.result) ?
                                        <div className={Style.results}>
                                            <p className={Style.title}>返回结果：</p>
                                            <div style={{ overflow: 'auto' }}>{response}</div>
                                        </div>
                                        : null
                            }
                        </div>
                    </Spin>
                </Modal>
            </div>
        )
    }
}
export default Debug;