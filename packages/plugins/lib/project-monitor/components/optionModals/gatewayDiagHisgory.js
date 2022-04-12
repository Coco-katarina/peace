import React, { Component } from 'react'
import moment from 'moment';
import Immutable from 'immutable';
import { Modal, Table } from 'antd';
import DiagChart from '../chart/diagChart';

export default class GatewayDiagHistory extends Component {
    constructor(props) {
        super(props);

        const startTime = moment().add(-7, 'days'),
            endTime = moment();

        this.state = {
            startTime: startTime,
            endTime: endTime
        }
    }

    parsediagProps(obj, path, func) {
        try {
            return func(obj.getIn(path.split('.')));
        } catch (e) {
            return null;
        }
    }

    transferData2Table(diag) {
        const diagObj = Immutable.fromJS(diag);
        return diagObj.reduce((p, d) => {
            try {
                const ut = this.parsediagProps(d, 'cc.di.ut', v => moment.duration(Number(v) * 1000));
                const dut = this.parsediagProps(d, 'cc.di.dut', v => moment.duration(Number(v) * 1000));

                p.push({
                    time: d.get('time'),
                    dv: d.getIn('fw.dv'.split('.')),
                    v: d.getIn('fw.v'.split('.')),
                    cr: d.getIn('cc.di.cr'.split('.')) == null ? null : this.parsediagProps(d, 'cc.di.cr', parseFloat),
                    mr: d.getIn('cc.di.mr'.split('.')) == null ? null : this.parsediagProps(d, 'cc.di.mr', parseFloat),
                    flash: !d.getIn('cc.stg.flash'.split('.')) ? null : Number(((1 - this.parsediagProps(d, 'cc.stg.flash.ffs', parseFloat) / this.parsediagProps(d, 'cc.stg.flash.fts', parseFloat)) * 100).toFixed(2)),
                    sd: !d.getIn('cc.stg.sd'.split('.')) ? null : (d.getIn('cc.stg.sd.ins'.split('.')) === 1 ? Number(((1 - this.parsediagProps(d, 'cc.stg.sd.fs', parseFloat) / this.parsediagProps(d, 'cc.stg.sd.ts', parseFloat)) * 100).toFixed(2)) : NaN),
                    ut: !d.getIn('cc.di.ut'.split('.')) ? '' : `${Math.floor(ut.asDays())}天${Math.floor(ut.asHours()) % 24}小时${Math.floor(ut.asMinutes()) % 60}分钟${ut.asSeconds() % 60}秒`,
                    dut: !d.getIn('cc.di.dut'.split('.')) ? '' : `${Math.floor(dut.asDays())}天${Math.floor(dut.asHours()) % 24}小时${Math.floor(dut.asMinutes()) % 60}分钟${dut.asSeconds() % 60}秒`,
                    gp: d.getIn('cc.gpi'.split('.')) ? d.getIn('cc.gpi.gp'.split('.')) : '无',
                    fwz: d.getIn('fw.z'.split('.')),
                    fwcv: d.getIn('fw.cv'.split('.')),
                    fwsn: d.getIn('fw.sn'.split('.')),
                    dt: d.getIn('cc.di.dt'.split('.')),
                    wn: d.getIn('cc.di.wn'.split('.')),
                    rn: d.getIn('cc.di.rn'.split('.')),
                    pw: d.getIn('cc.di.pw'.split('.'))
                });

            } catch (e) {
                console.error(e);
            }

            return p;
        }, []);
    }

    buildColumns() {
        return [
            {
                index: 'time',
                title: '诊断时间',
                dataIndex: 'time',
                render: text => moment(text).format('YYYY-MM-DD HH:mm:ss')
            }, {
                index: 'dv',
                title: 'dau版本',
                dataIndex: 'dv'
            }, {
                index: 'v',
                title: '固件版本',
                dataIndex: 'v'
            }, {
                index: 'cr',
                title: 'CPU',
                dataIndex: 'cr',
                render: (text, rd) => !rd.cr || isNaN(Number(text)) ? text : text + '%'
            }, {
                index: 'mr',
                title: '内存',
                dataIndex: 'mr',
                render: (text, rd) => !rd.mr || isNaN(Number(text)) ? text : text + '%'
            }, {
                index: 'flash',
                title: 'FLASH',
                dataIndex: 'flash',
                render: (text, rd) => !rd.flash || isNaN(Number(text)) ? text : text + '%'
            }, {
                index: 'sd',
                title: 'SD卡',
                dataIndex: 'sd',
                render: (text, rd) => !rd.sd || isNaN(Number(text)) ? text : text + '%'
            }, {
                index: 'ut',
                title: '网关运行',
                dataIndex: 'ut'
            }, {
                index: 'dut',
                title: '服务运行',
                dataIndex: 'dut'
            }, {
                index: 'gp',
                title: '电量',
                dataIndex: 'gp',
                render: (text, rd) => rd.pw != null ? rd.pw : (isNaN(Number(text)) ? text : text + '%')
            }, {
                index: 'fwz',
                title: '存储区域',
                dataIndex: 'fwz'
            }, {
                index: 'fwcv',
                title: '配置版本',
                dataIndex: 'fwcv'
            }, {
                index: 'fwsn',
                title: '传感数量',
                dataIndex: 'fwsn'
            }, {
                index: 'dt',
                title: '采集粒度',
                dataIndex: 'dt'
            }, {
                index: 'wn',
                title: '唤醒次数',
                dataIndex: 'wn'
            }, {
                index: 'rn',
                title: '待上传数据',
                dataIndex: 'rn'
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
        const dataSource = this.transferData2Table(this.props.diag);
        const columns = this.buildColumns();
        const chartData = dataSource.reduce((p, d) => {
            d.cr != null && p.push({ name: 'CPU', time: d.time, value: d.cr });
            d.mr != null && p.push({ name: '内存', time: d.time, value: d.mr });
            d.flash != null && p.push({ name: 'FLASH', time: d.time, value: d.flash });
            d.sd != null && p.push({ name: 'SD卡', time: d.time, value: d.sd });

            return p;
        }, [])

        return (
            <Modal width={920} maskClosable={false} title="网关历史诊断记录" visible={this.props.visible} footer={null} onCancel={this.onClose}>
                <div style={{ textAlign: 'center' }}>记录时间：{this.state.startTime.format('YYYY-MM-DD HH:mm:ss')} - {this.state.endTime.format('YYYY-MM-DD HH:mm:ss')}</div>
                <div style={{ textAlign: 'center' }}>
                    <a onClick={() => this.onDateRangeChange(-1)}>[前一周]</a>
                    <a style={{ padding: '0 8px' }} onClick={() => this.onDateRangeChange(0)}>[本&nbsp;周]</a>
                    <a onClick={() => this.onDateRangeChange(1)}>[后一周]</a>
                </div>
                {chartData.length > 0 ? <DiagChart data={chartData} height={200} width="100%" options={{ showPercent: true }} /> : ''}
                <Table size="small" columns={columns} dataSource={dataSource} />
            </Modal>
        )
    }
}
