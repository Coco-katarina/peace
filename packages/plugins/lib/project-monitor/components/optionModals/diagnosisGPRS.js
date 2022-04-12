import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Immutable from 'immutable';
import moment from 'moment';
import { Row, Col, Alert, Badge } from 'antd';
import { Colors } from '@peace/utils'
import PerfectScrollbar from 'perfect-scrollbar';
import NodeDiagHistoryGPRS from './nodeDiagHistoryGPRS';

const { Red, Green, Orange } = Colors

export default class DiagnosisGPRS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: null,
            nid: null
        }
    }

    componentDidMount() {
        this.Ps = new PerfectScrollbar(findDOMNode(this.refs.content), { suppressScrollX: true })
    }

    componentDidUpdate() {
        this.Ps ? this.Ps.update() : ''
    }

    closeModal = () => {
        this.setState({ modal: null });
        this.props.clearDiagHistory();
    }

    onNodeHistoryClick = (nid) => {
        this.props.fetchDiagRecord('now').then(() => this.setState({ modal: 'node', nid }))
    }

    parsediagProps(obj, path, func) {
        try {
            return func(obj.getIn(path.split('.')));
        } catch (e) {
            return null;
        }
    }
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
        const diag = this.props.diag.length ? this.props.diag[0] : null;
        if (!diag) {
            return <Alert type="warning" message="暂无设备诊断记录" />
        }
        const diagObj = Immutable.fromJS(diag);
        let power = '无', supply, fwv = '', powerValue = 0;
        try {
            // 网关电量
            if (diagObj.getIn('data.base.cc.gpi'.split('.'))) {
                powerValue = this.parsediagProps(diagObj, 'data.base.cc.gpi.gp', parseFloat);
                power = powerValue + '%';
                supply = diag.data.base.cc.gpi.gpm;
            }

            // 网关固件
            if (diagObj.getIn('data.base.fw.v'.split('.'))) {
                fwv = diagObj.getIn('data.base.fw.v'.split('.'));
            }

        } catch (e) {
            console.error("诊断信息解析失败", e);
            return <Alert type="warning" message="诊断信息解析失败" />
        }

        // 节点
        const nodes = diag.data.node || [];

        const nodeHistoryDiag = (this.props.diagHistory || []).reduce((p, d) => {
            if (!d.data.node) {
                return p;
            }
            const node = d.data.node.filter(n => n['NID'] == this.state.nid);

            if (node.length == 0) return p;

            const gateway = Immutable.fromJS(d);
            if (gateway.getIn('data.base.cc.gpi'.split('.'))) {
                node[0]['gp'] = this.parsediagProps(gateway, 'data.base.cc.gpi.gp', parseFloat);
            } else {
                node[0]['gp'] = '无';
            }

            if (gateway.getIn('data.base.fw.v'.split('.'))) {
                node[0]['fwv'] = gateway.getIn('data.base.fw.v'.split('.'));
            } else {
                node[0]['fwv'] = '';
            }

            p.push(node[0]);
            p[p.length - 1].time = d.time;

            return p;
        }, []);

        const titleStyle = { fontWeight: 'bold' };
        return (
            <div ref="content" style={{
                padding: '8px 24px', position: 'relative',
                height: this.props.height - 72
            }}>
                <Row style={{ marginBottom: 8 }}>
                    <Col span={16}><h3>最新诊断({moment(diag.time).format('YYYY-MM-DD HH:mm:ss')})</h3></Col>
                    <Col span={8} style={{ textAlign: 'right' }}>
                        <a onClick={() => this.props.fetchDiagRecord('latest')}>刷新</a>
                        <span style={{ paddingLeft: 8 }}></span>
                        <a onClick={() => this.onNodeHistoryClick(nodes.length == 0 ? null : nodes[0]['NID'])} >历史</a>
                    </Col>
                </Row>

                {
                    power == '无' || !diagObj.getIn('data.base.cc.gpi'.split('.')) ? '' :
                        nodes.length == 0 ? '' :
                            nodes.map((node, i) => (
                                <div style={{ marginBottom: 16, borderBottom: i != nodes.length - 1 ? '1px solid #ccc' : 'none' }}>
                                    <div>
                                        <Row style={{ marginBottom: 8 }}>
                                            <Col style={titleStyle} span={5}>固件：</Col><Col span={7}>{fwv}</Col>
                                            <Col style={titleStyle} span={5}>已工作：</Col><Col span={7}>{node["WTS"]}</Col>
                                        </Row>
                                        <Row style={{ marginBottom: 8 }}>
                                            <Col style={titleStyle} span={5}>电量：</Col>
                                            <Col span={7}><span style={{ paddingRight: 16 }}>{power}&nbsp;{supply ? `(${supply})` : ''}</span>{this.getNodeState('power', powerValue)}</Col>
                                            <Col style={titleStyle} span={5}>未传：</Col>
                                            <Col span={7}><span style={{ paddingRight: 16 }}>{node["R"]}</span>{this.getNodeState('record', node["R"])}</Col>
                                        </Row>
                                    </div>
                                </div>))
                }
                <NodeDiagHistoryGPRS visible={this.state.modal == 'node'} fetchDiagRecord={this.props.fetchDiagRecord} diag={nodeHistoryDiag} onClose={this.closeModal} />
            </div>
        )
    }
}