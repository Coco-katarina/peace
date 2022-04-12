import React, { Component } from 'react';
import Immutable from 'immutable';
import moment from 'moment';
import { Row, Col, Badge, Alert } from 'antd';
import { Colors } from '@peace/utils'
import PerfectScrollbar from 'perfect-scrollbar';
import NodeDiag from './nodeDiagnosis';
import GatewayDiagHistory from './gatewayDiagHisgory';
import NodeDiagHistory from './nodeDiagHistory';

const { Red, Green, Orange } = Colors;

export default class Diagnosis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: null,
            nid: null
        }
    }

    componentDidMount() {
        let content = document.getElementById('diagContent')
        if (content)
            this.Ps = new PerfectScrollbar(content, { suppressScrollX: true })
    }

    componentDidUpdate() {
        this.Ps ? this.Ps.update() : ''
    }

    /**
     * 网关"CPU/RAM/FLASH/SD"状态: [90%,100%]:红; [80%,90%):黄; [0,80%):正常
     * @param {} sModule 
     * @param {} ratioInDecimal 
     * @returns {} 
     */
    getAgtState(sModule, ratioInDecimal, dtime) {
        const gdot = <Badge dot style={{ background: Green }} />
        const rdot = <Badge dot style={{ background: Red }} />
        const odot = <Badge dot style={{ background: Orange }} />

        if (dtime == null) {
            return <div style={{ color: Green }}>{gdot}正常</div>;
        }
        if (ratioInDecimal == null) {
            return <div style={{ color: Red }}>{rdot}异常</div>;
        }
        if (typeof (ratioInDecimal) == "string") {
            ratioInDecimal = parseFloat(ratioInDecimal);
        }
        var text = '正常';
        var dot = gdot;
        let color = Green;
        switch (sModule) {
            case "cpu":
                if (ratioInDecimal >= 0.8 && ratioInDecimal < 0.9) { // 黄
                    text = '偏高';
                    dot = odot;
                    color = Orange;
                } else if (ratioInDecimal >= 0.9) { // 红
                    text = '异常';
                    dot = rdot;
                    color = Red;
                }
                break;
            case "ram":
                if (ratioInDecimal >= 0.8 && ratioInDecimal < 0.9) { // 黄
                    text = '偏高';
                    dot = odot;
                    color = Orange;
                } else if (ratioInDecimal >= 0.9) { // 红
                    text = '危险';
                    dot = rdot;
                    color = Red
                }
                break;
            default: // "flash", "sd"
                if (ratioInDecimal >= 0.8 && ratioInDecimal < 0.9) { // 黄
                    text = '存储告急';
                    dot = odot;
                    color = Orange;
                } else if (ratioInDecimal >= 0.9) { // 红
                    text = '存储将满';
                    dot = rdot;
                    color = Red;
                }
                break;
        }
        return <span>{dot}<span style={{ paddingLeft: 16, color: color }}>{text}</span></span>;
    }

    closeModal = () => {
        this.setState({ modal: null });
        this.props.clearDiagHistory();
    }

    onGatewayHistoryClick = () => {
        this.props.fetchDiagRecord('now').then(() => this.setState({ modal: 'gw' }))
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

    render() {
        const diag = this.props.diag.length ? this.props.diag[0] : null;
        if (!diag) {
            return <Alert type="warning" message="暂无设备诊断记录" />
        }

        const diagObj = Immutable.fromJS(diag);

        let ut, dut, cpuNow, memNow, memTotal, memUnit, flashLeftNow, flashTotal, flashUnit, sdUsedOri, sdTotalOri, fwv, fwdv, fwz,
            sdUsed, sdTotal, sdIns, sdTotalUnit = 'M', sdUsedUnit = 'M', power = '无', supply, pw, dt, wn, rn, fwcv, fwsn;
        try {
            // 网关运行时长
            ut = this.parsediagProps(diagObj, 'data.base.cc.di.ut', v => moment.duration(Number(v) * 1000));
            dut = this.parsediagProps(diagObj, 'data.base.cc.di.dut', v => moment.duration(Number(v) * 1000));

            // 网关指标
            cpuNow = this.parsediagProps(diagObj, 'data.base.cc.di.cr', parseFloat);
            memNow = this.parsediagProps(diagObj, 'data.base.cc.di.mr', parseFloat);
            memTotal = this.parsediagProps(diagObj, 'data.base.cc.di.tm', parseFloat);
            memUnit = diagObj.getIn('data.base.cc.di.ui'.split('.'));
            if (memUnit != null) {
                if (memUnit === 0) {
                    memUnit = 'B';
                } else if (memUnit === 1) {
                    memUnit = 'K';
                } else if (memUnit === 2) {
                    memUnit = 'M'
                } else {
                    memUnit = ''
                }
            } else {
                memUnit = 'M'
            }

            flashLeftNow = this.parsediagProps(diagObj, 'data.base.cc.stg.flash.ffs', parseFloat);
            flashTotal = this.parsediagProps(diagObj, 'data.base.cc.stg.flash.fts', parseFloat);
            flashUnit = diagObj.getIn('data.base.cc.stg.flash.ut'.split('.'));
            if (flashUnit != null) {
                if (flashUnit === 0) {
                    flashUnit = 'B';
                } else if (flashUnit === 1) {
                    flashUnit = 'K';
                } else if (flashUnit === 2) {
                    flashUnit = 'M'
                } else {
                    flashUnit = ''
                }
            } else {
                flashUnit = 'M'
            }

            sdUsedOri = this.parsediagProps(diagObj, 'data.base.cc.stg.sd.ts', parseFloat) - this.parsediagProps(diagObj, 'data.base.cc.stg.sd.fs', parseFloat);
            sdTotalOri = this.parsediagProps(diagObj, 'data.base.cc.stg.sd.ts', parseFloat)
            sdUsed = sdUsedOri;
            sdTotal = sdTotalOri;
            sdIns = this.parsediagProps(diagObj, 'data.base.cc.stg.sd.ins', parseInt);
            if (sdTotal / 1024 > 1) {
                sdTotalUnit = 'G';
                sdTotal = (sdTotal / 1024);
            }
            sdTotal = sdTotal.toFixed(2);
            if (sdUsed / 1024 > 1) {
                sdUsedUnit = 'G';
                sdUsed = (sdUsed / 1024);
            }
            sdUsed = sdUsed.toFixed(2);

            fwv = diagObj.getIn('data.base.fw.v'.split('.'));
            fwdv = diagObj.getIn('data.base.fw.dv'.split('.'));
            fwz = diagObj.getIn('data.base.fw.z'.split('.'));
            fwcv = diagObj.getIn('data.base.fw.cv'.split('.'));
            fwsn = diagObj.getIn('data.base.fw.sn'.split('.'));

            // 网关电量
            if (diagObj.getIn('data.base.cc.gpi'.split('.'))) {
                power = this.parsediagProps(diagObj, 'data.base.cc.gpi.gp', parseFloat) + '%';
                supply = diag.data.base.cc.gpi.gpm;
            }

            pw = diagObj.getIn('data.base.cc.di.pw'.split('.'))
            if (pw) {
                power = parseFloat(pw) + '%';
            }

            dt = diagObj.getIn('data.base.cc.di.dt'.split('.'));
            wn = diagObj.getIn('data.base.cc.di.wn'.split('.'));
            rn = diagObj.getIn('data.base.cc.di.rn'.split('.'));

        } catch (e) {
            console.error("诊断信息解析失败", e);
            return <Alert type="warning" message="诊断信息解析失败" />
        }

        // 节点
        const nodes = diag.data.node || [];

        const titleStyle = { fontWeight: 'bold' };

        // history
        const gwHistoryDiag = (this.props.diagHistory || []).reduce((p, d) => {
            if (!d.data.base) {
                return p;
            }

            p.push(d.data.base);
            p[p.length - 1].time = d.time;

            return p;
        }, []);

        const nodeHistoryDiag = (this.props.diagHistory || []).reduce((p, d) => {
            if (!d.data.node) {
                return p;
            }
            const node = d.data.node.filter(n => n['NID'] == this.state.nid);

            if (node.length == 0) return p;

            p.push(node[0]);
            p[p.length - 1].time = d.time;

            return p;
        }, []);

        return (
            <div id="diagContent" style={{ padding: '8px 24px', position: 'relative', height: this.props.height - 72 }}>
                <Row style={{ marginBottom: 8 }}>
                    <Col span={16}><h3>最新诊断({moment(diag.time).format('YYYY-MM-DD HH:mm:ss')})</h3></Col>
                    <Col span={8} style={{ textAlign: 'right' }}>
                        <a onClick={() => this.props.fetchDiagRecord('latest')}>刷新</a>
                        <span style={{ paddingLeft: 8 }}></span>
                        <a onClick={this.onGatewayHistoryClick}>历史</a>
                    </Col>
                </Row>
                {
                    isNaN(cpuNow) ? '' :
                        <Row style={{ marginBottom: 8 }}>
                            <Col style={titleStyle} span={5}>CPU：</Col>
                            <Col span={14}>{cpuNow}%</Col>
                            <Col span={5}>{this.getAgtState('cpu', cpuNow / 100.0, diag.time)}</Col>
                        </Row>
                }
                {
                    isNaN(memNow) ? '' :
                        <Row style={{ marginBottom: 8 }}>
                            <Col style={titleStyle} span={5}>内存：</Col>
                            <Col span={14}>{(memNow * memTotal / 100).toFixed(2)}{memUnit}&nbsp;/&nbsp;{memTotal}{memUnit}&nbsp;({memNow}%)</Col>
                            <Col span={5}>{this.getAgtState('cpu', memNow / 100.0, diag.time)}</Col>
                        </Row>
                }
                {
                    isNaN(flashTotal) ? "" :
                        <Row style={{ marginBottom: 8 }}>
                            <Col style={titleStyle} span={5}>FLASH：</Col>
                            <Col span={14}>{(flashTotal - flashLeftNow).toFixed(2)}{flashUnit}&nbsp;/&nbsp;{flashTotal}{flashUnit}&nbsp;({((flashTotal * 100 - flashLeftNow * 100) / flashTotal).toFixed(2)}%)</Col>
                            <Col span={5}>{this.getAgtState('flash', (flashTotal - flashLeftNow) / flashTotal, diag.time)}</Col>
                        </Row>
                }
                {
                    isNaN(sdIns) ? "" :

                        <Row style={{ marginBottom: 8 }}>
                            <Col style={titleStyle} span={5}>SD卡：</Col>
                            {
                                sdIns === 0 ? '未插入' :
                                    <Col span={14}>{sdUsed}{sdUsedUnit}&nbsp;/&nbsp;{sdTotal}{sdTotalUnit}&nbsp;({(sdUsedOri * 100 / sdTotalOri).toFixed(2)}%)</Col>
                            }
                            {
                                sdIns === 0 ? '' :
                                    <Col span={5}>{this.getAgtState('sd', sdUsedOri / sdTotalOri, diag.time)}</Col>
                            }
                        </Row>
                }
                {
                    !diagObj.getIn('data.base.cc.di.ut'.split('.')) ? '' :
                        <Row style={{ marginBottom: 8 }}>
                            <Col style={titleStyle} span={5}>网关运行：</Col>
                            <Col span={14}>{`${Math.floor(ut.asDays())}天${Math.floor(ut.asHours()) % 24}小时${Math.floor(ut.asMinutes()) % 60}分钟${ut.asSeconds() % 60}秒`}</Col>
                        </Row>
                }
                {
                    !diagObj.getIn('data.base.cc.di.dut'.split('.')) ? '' :
                        <Row style={{ marginBottom: 8 }}>
                            <Col style={titleStyle} span={5}>服务运行：</Col>
                            <Col span={14}>{`${Math.floor(dut.asDays())}天${Math.floor(dut.asHours()) % 24}小时${Math.floor(dut.asMinutes()) % 60}分钟${dut.asSeconds() % 60}秒`}</Col>
                        </Row>
                }
                {
                    !fwdv ? '' :
                        <Row style={{ marginBottom: 8 }}>
                            <Col style={titleStyle} span={5}>dau版本：</Col>
                            <Col span={14}>{fwdv}</Col>
                        </Row>
                }
                {
                    !fwz ? '' :
                        <Row style={{ marginBottom: 8 }}>
                            <Col style={titleStyle} span={5}>存储区域：</Col>
                            <Col span={14}>{fwz}</Col>
                        </Row>
                }
                {
                    !fwcv ? '' :
                        <Row style={{ marginBottom: 8 }}>
                            <Col style={titleStyle} span={5}>配置版本：</Col>
                            <Col span={14}>{fwcv}</Col>
                        </Row>
                }
                {
                    !fwsn ? '' :
                        <Row style={{ marginBottom: 8 }}>
                            <Col style={titleStyle} span={5}>传感数量：</Col>
                            <Col span={14}>{fwsn}</Col>
                        </Row>
                }
                {
                    power == '无' || !diagObj.getIn('data.base.cc.gpi'.split('.')) ? '' :
                        <Row style={{ marginBottom: 8 }}>
                            <Col style={titleStyle} span={5}>电量：</Col>
                            <Col span={14}>{power}&nbsp;{supply ? `(${supply})` : ''}</Col>
                        </Row>
                }
                {
                    !dt ? '' :
                        <Row style={{ marginBottom: 8 }}>
                            <Col style={titleStyle} span={5}>采集粒度：</Col>
                            <Col span={14}>{dt}</Col>
                        </Row>
                }
                {
                    !wn ? '' :
                        <Row style={{ marginBottom: 8 }}>
                            <Col style={titleStyle} span={5}>唤醒次数：</Col>
                            <Col span={14}>{wn}</Col>
                        </Row>
                }
                {
                    !rn ? '' :
                        <Row style={{ marginBottom: 8 }}>
                            <Col style={titleStyle} span={5}>待上传：</Col>
                            <Col span={14}>{rn}</Col>
                        </Row>
                }
                {nodes.length == 0 ? '' :
                    <Row style={{ marginTop: 16, marginBottom: 8 }}>
                        <Col span={12}><h3>节点({nodes.length}个)</h3></Col>
                    </Row>
                }
                {nodes.length == 0 ? '' :
                    nodes.map((n, i) => (
                        <div style={{ marginBottom: 16, borderBottom: i != nodes.length - 1 ? '1px solid #ccc' : 'none' }}>
                            <NodeDiag key={'node' + i} node={n} onNodeHistoryClick={this.onNodeHistoryClick} />
                        </div>))}
                <GatewayDiagHistory visible={this.state.modal == 'gw'} fetchDiagRecord={this.props.fetchDiagRecord} diag={gwHistoryDiag} onClose={this.closeModal} />
                <NodeDiagHistory visible={this.state.modal == 'node'} fetchDiagRecord={this.props.fetchDiagRecord} diag={nodeHistoryDiag} onClose={this.closeModal} />
            </div>
        )
    }
}