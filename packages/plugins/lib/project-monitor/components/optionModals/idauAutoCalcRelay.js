import React, { Component } from 'react'
import { Button, Row, Col, InputNumber } from 'antd';

export default class componentName extends Component {
    constructor(props) {
        super(props);

        this.state = {
            calcResult: {},
            calced: false,
            nodes: []
        }
    }

    componentDidMount() {
        this.setState({
            nodes: this.getChildNodes(this.props.info.device.id).filter(n => n.properties.worktype == 'terminal')
        });
    }

    onCalcResultTyped = (k, v) => {
        this.setState({ calcResult: Object.assign({}, this.state.calcResult, { [k]: v }) });
    }

    onCalcSubmit = () => {
        // calc
        this.setState({ calcResult: this.calcAutoRelay(this.state.nodes), calced: true });
    }

    onCalcClear = () => {
        this.setState({ calcResult: {}, calced: false });
    }

    onCalcSave = () => {
        this.props.handleSave(this.state.calcResult);

        this.setState({ calcResult: {}, calced: false });
    }

    calcAutoRelay(nodes) {
        let listNodes = {};
        let nodeWakeDelay = 1; // 第一个节点自动唤醒延迟为1s.
        for (let index = 0; index < nodes.length; index++) {
            const curNode = nodes[index];
            if (index > 0) // 非第一个节点
            {
                var preNode = nodes[index - 1];
                const childDevices = this.getChildNodes(preNode.id);
                nodeWakeDelay += this.autoCalcNodeWakeDelay(childDevices);
            }
            listNodes[curNode.id] = nodeWakeDelay;
        }

        return listNodes;
    }

    autoCalcNodeWakeDelay(sensors) {
        let requestTime = 1 + 1 * Math.ceil((sensors.length / 3));

        let sensorsAcqTime = 0;

        sensors.forEach(sensor => {
            switch (sensor.properties.sensortype) {
                case 'zx':
                    sensorsAcqTime += 3.5;
                    break;
                case 'cx':
                    sensorsAcqTime += 1 + 0.1 * (parseInt(sensor.properties.predelay) + parseInt(sensor.properties.postdelay)); // 前后延时单位:百毫秒
                    break;
                case 'yc':
                    sensorsAcqTime += 2 * (1 + 0.1 * (parseInt(sensor.properties.prodelay) + parseInt(sensor.properties.postdelay))); // 前后延时单位:百毫秒
                    break;
                default: // 声级计
                    sensorsAcqTime += 1;
                    break;
            }
        })

        let nodeWakeDelay = 1.5 + requestTime + sensorsAcqTime + 12;

        return Math.ceil(nodeWakeDelay);
    }

    getChildNodes(deviceId) {
        const { devices } = this.props;

        let childNodes = [];
        const deviceKeys = Object.keys(devices.instances);
        for (let eq = 0; eq < deviceKeys.length; eq++) {
            if (devices.instances[deviceKeys[eq]].type == 's.l' && devices.instances[deviceKeys[eq]].instance.to.ownerSvgId == deviceId) {
                childNodes.push(Object.assign({}, { id: devices.instances[deviceKeys[eq]].instance.from.ownerSvgId }, devices.instances[devices.instances[deviceKeys[eq]].instance.from.ownerSvgId].instance));
            }
        }

        childNodes.sort((a, b) => a.properties.netid - b.properties.netid);

        return childNodes;
    }

    getChildDeviceStat(deviceId) {
        const childDevices = this.getChildNodes(deviceId);

        const stat = childDevices.reduce((p, n) => {
            const type = n.properties.sensortype;

            if (!type) return p;

            if (p[type]) {
                p[type]++;
            } else {
                p[type] = 1;
            }

            return p;
        }, {})

        return stat;
    }

    renderChildDeviceStat(deviceId) {
        const stat = this.getChildDeviceStat(deviceId);

        return <div>{Object.keys(stat).map(t => <div>{t}&nbsp;&nbsp;{stat[t]}个</div>)}</div>

    }

    render() {
        const { calcResult, nodes } = this.state;

        return (
            <div style={{ padding: 20 }}>
                {
                    this.state.calced ?
                        <div style={{ float: 'right' }}>
                            <Button type="primary" onClick={this.onCalcSave}>保存</Button>
                            <span style={{ paddingLeft: 20 }}></span>
                            <Button onClick={this.onCalcClear}>清空结果</Button>
                        </div>
                        :
                        <Button type="primary" onClick={this.onCalcSubmit}>自动计算延迟</Button>
                }
                <div style={{ clear: 'both' }}></div>
                <div style={{ height: this.props.height - 170, overflow: 'auto' }}>
                    <div style={{ padding: 10 }}>
                        {
                            nodes.map(n => <Row style={{ marginBottom: 16 }}>
                                <Col span="12">
                                    <h4>{n.name}</h4>
                                    <div>唤醒延迟：<span style={{ color: 'blue' }}>{n.properties.wakeupdelay}</span></div>
                                    <div style={{ color: '#999' }}>工作模式：{n.properties.worktype}</div>
                                    <div style={{ color: '#999' }}>子网：{n.properties.subnet}</div>
                                    <div style={{ color: '#999' }}>本机地址：{n.properties.netid}</div>
                                    <div style={{ color: '#999', paddingLeft: 10 }}>
                                        {this.renderChildDeviceStat(n.id)}
                                    </div>
                                </Col>
                                <Col span="12">
                                    <InputNumber
                                        style={{ width: 100 }}
                                        onChange={v => this.onCalcResultTyped(n.id, v)}
                                        disabled={!this.state.calced}
                                        value={calcResult[n.id]} />
                                </Col>
                            </Row>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}