import React, { Component } from 'react'
import moment from 'moment'
import { Modal, Row, Col, Table } from 'antd';
import DiagChart from '../chart/diagChart'

export default class NodeDiagHistory extends Component {
    constructor(props) {
        super(props);

        const startTime = moment().add(-7, 'days'),
            endTime = moment();

        this.state = {
            startTime: startTime,
            endTime: endTime
        }
    }

    buildColumns() {
        return [
            {
                index: 'time',
                title: '诊断时间',
                dataIndex: 'time',
                render: text => moment(text).format('YYYY-MM-DD HH:mm:ss')
            }, {
                index: 'FWV',
                title: '固件',
                dataIndex: 'FWV'
            }, {
                index: 'WTS',
                title: '已工作',
                dataIndex: 'WTS'
            }, {
                index: 'P',
                title: '电量(%)',
                dataIndex: 'P'
            }, {
                index: 'R',
                title: '未传记录',
                dataIndex: 'R'
            }, {
                index: 'W',
                title: '苏醒',
                dataIndex: 'W'
            }, {
                index: 'TC',
                title: '工作(s)',
                dataIndex: 'TC'
            }, {
                index: 'ER',
                title: '重启',
                dataIndex: 'ER'
            }, {
                index: 'SI',
                title: '信号强度(dBm)',
                dataIndex: 'SI',
                render: text => text || '无'
            }
        ]
    }

    onDateRangeChange = (prevOrNext) => {
        let startTime, endTime;
        const start = moment(this.state.startTime.toISOString()), end = moment(this.state.endTime.toISOString())
        if (prevOrNext == -1) {
            startTime = start.add(-7, 'days');
            endTime = this.state.startTime;
        } else if (prevOrNext == 1) {
            startTime = this.state.endTime;
            endTime = end.add(7, 'days');
        } else {
            startTime = moment().add(-7, 'days');
            endTime = moment();
        }

        this.setState({ startTime, endTime });
        this.props.fetchDiagRecord(startTime.toISOString(), endTime.toISOString());
    }

    onClose = () => {
        const startTime = moment().add(-7, 'days'),
            endTime = moment();

        this.state = {
            startTime: startTime,
            endTime: endTime
        }

        this.props.onClose()
    }

    render() {
        const columns = this.buildColumns();
        const chartData = this.props.diag.reduce((p, d) => {
            p["power"].push({ name: '电量', time: d.time, value: parseFloat(d.P) });
            p["record"].push({ name: '未传记录', time: d.time, value: parseFloat(d.R) });
            p["work"].push({ name: '工作时间', time: d.time, value: parseFloat(d.TC) });

            return p;
        }, { "power": [], "record": [], "work": [] })

        return (
            <Modal title="" maskClosable={false} visible={this.props.visible} width={920} title="节点历史诊断记录" footer={null} onCancel={this.onClose}>
                <div style={{ textAlign: 'center' }}>记录时间：{this.state.startTime.format('YYYY-MM-DD HH:mm:ss')} - {this.state.endTime.format('YYYY-MM-DD HH:mm:ss')}</div>
                <div style={{ textAlign: 'center' }}>
                    <a onClick={() => this.onDateRangeChange(-1)}>[前一周]</a>
                    <a style={{ padding: '0 8px' }} onClick={() => this.onDateRangeChange(0)}>[本&nbsp;周]</a>
                    <a onClick={() => this.onDateRangeChange(1)}>[后一周]</a>
                </div>
                <Row>
                    <Col span={8}>
                        <DiagChart key="power" data={chartData["power"]} height={200} width="100%" options={{ legend: { position: 'right' }, showPercent: true, margin: [20, 80, 120, 60] }} />
                    </Col>
                    <Col span={8}>
                        <DiagChart key="record" data={chartData["record"]} height={200} width="100%" options={{ legend: { position: 'right' }, margin: [20, 80, 120, 60] }} />
                    </Col>
                    <Col span={8}>
                        <DiagChart key="work" data={chartData["work"]} height={200} width="100%" options={{ legend: { position: 'right' }, margin: [20, 80, 120, 60] }} />
                    </Col>
                </Row>
                <Table size="small" columns={columns} dataSource={this.props.diag} />
            </Modal>
        )
    }
}
