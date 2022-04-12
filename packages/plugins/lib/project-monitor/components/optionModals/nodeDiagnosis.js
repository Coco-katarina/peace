import React, { Component } from 'react'
import { Row, Col, Badge } from 'antd';
import { Colors } from '@peace/utils'

const { Red, Green, Orange } = Colors;

export default class NodeDiag extends Component {
    /**
     * 节点"电量/未传记录"状态: 
     *      电量: [0,10%):红; [10%,30%):黄; [30%,100%]:正常
     *      未传记录: (48,+∞):红; (0,48]:黄; =0:正常 
     * @param {} sModule 
     * @param {} value 
     * @returns {} 
     */
    getNodeState(sModule, value) {
        const gdot = <Badge dot style={{ background: Green }} />
        const rdot = <Badge dot style={{ background: Red }} />
        const odot = <Badge dot style={{ background: Orange }} />

        if (value == null) {
            return rdot;
        }
        if (typeof (value) == "string") {
            value = parseFloat(value);
        }
        var iClass = gdot;
        if (sModule === "power") {
            if (value < 10) {
                iClass = rdot;
            } else if (value >= 10 && value < 30) {
                iClass = odot;
            }
        } else if (sModule === "record") {
            if (value > 48) {
                iClass = rdot;
            } else if (value > 0 && value <= 48) {
                iClass = odot;
            }
        }
        return iClass;
    }

    render() {
        const { node } = this.props
        const titleStyle = { fontWeight: 'bold' };

        return (
            <div>
                <Row style={{ marginBottom: 8 }}>
                    <Col style={titleStyle} span={5}>节点：</Col>
                    <Col span={17}>{node["NID"]}</Col>
                    <Col span={2}><a onClick={() => this.props.onNodeHistoryClick(node['NID'])}>历史</a></Col>
                </Row>
                <Row style={{ marginBottom: 8 }}>
                    <Col style={titleStyle} span={5}>固件：</Col><Col span={7}>{node["FWV"]}</Col>
                    <Col style={titleStyle} span={5}>已工作：</Col><Col span={7}>{node["WTS"]}</Col>
                </Row>
                <Row style={{ marginBottom: 8 }}>
                    <Col style={titleStyle} span={5}>电量：</Col>
                    <Col span={7}><span style={{ paddingRight: 16 }}>{node["P"]}%</span>{this.getNodeState('power', node["P"])}</Col>
                    <Col style={titleStyle} span={5}>未传：</Col>
                    <Col span={7}><span style={{ paddingRight: 16 }}>{node["R"]}</span>{this.getNodeState('record', node["R"])}</Col>
                </Row>
                <Row style={{ marginBottom: 8 }}>
                    <Col style={titleStyle} span={5}>工作(s)：</Col><Col span={7}>{node["TC"]}</Col>
                    <Col style={titleStyle} span={5}>重启：</Col><Col span={7}>{node["ER"]}</Col>
                </Row>
                <Row style={{ marginBottom: 8 }}>
                    <Col style={titleStyle} span={5}>信号强度：</Col><Col span={7}>{node["SI"] || '无'}</Col>
                </Row>
                <Row style={{ marginBottom: 8 }}>
                    <Col style={titleStyle} span={5}>上次苏醒：</Col><Col span={19}>{node["W"]}</Col>
                </Row>
            </div>
        )
    }
}
