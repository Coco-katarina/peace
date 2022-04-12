import React, { Component } from "react";
import moment from 'moment'
class RealTimeData extends Component {
    // constructor(props) {

    // }
    // shouldComponentUpdate(nextProps, nextState) {
    //     if ((nextProps.data && (JSON.stringify(nextProps.data) != JSON.stringify(this.props.data)))
    //         || JSON.stringify(nextProps.thresholdBatch) != JSON.stringify(this.props.thresholdBatch)
    //         || JSON.stringify(nextProps.factorName) != JSON.stringify(this.props.factorName)
    //         || JSON.stringify(nextProps.location) != JSON.stringify(this.props.location)
    //     ) {
    //         return true;
    //     }
    // }

    renderData = () => {
        let str = '', time = ''
        const { realtimeData, selectSensorId } = this.props

        if (realtimeData && selectSensorId && realtimeData.stations && realtimeData.stations.find(s => s.id == selectSensorId)) {
            let dataSource = realtimeData.stations.find(s => s.id == selectSensorId).data
            if (dataSource.length > 0) {
                Object.keys(realtimeData.items).forEach(key => {
                    str += realtimeData.items[key].name + ':' + dataSource[dataSource.length - 1][key] + realtimeData.items[key].unit + "  "
                })
                time = moment(dataSource[dataSource.length - 1].time).format('YYYY-MM-DD HH:mm:ss')
            } else {
                str = '-'
            }
        } else {
            str = '-'
        }
        return [str, time]
    }

    getThresData = () => {
        let thres = [null, null, null]
        const { thresholdBatch, selectSensorId } = this.props
        if (thresholdBatch && thresholdBatch.length > 0) {
            thresholdBatch.map(s => {
                if (s?.data?.stations.find(x => x.id == selectSensorId)) {
                    let thres1 = '', thres2 = '', thres3 = ''
                    s?.data?.items.map(v => {
                        let arr = v.config[0]?.thresholds
                        arr.map((t, index) => {
                            index == 0 ? thres1 += v.name + ' : ' + t.value + '       '
                                : index == 1 ? thres2 += v.name + ' : ' + t.value + '       '
                                    : index == 2 ? thres3 += v.name + ' : ' + t.value + '       '
                                        : ''
                        })
                        thres1 != '' ? thres[0] = thres1 : '';
                        thres2 != '' ? thres[1] = thres2 : '';
                        thres3 != '' ? thres[2] = thres3 : '';
                    })
                }
            })
        }
        return thres
    }


    render() {
        const { factorName, location, realtimeAlarms, selectSensorId } = this.props
        let alarmText = this.renderData()[0] == '-' ? '-' : '正常', color = this.renderData()[0] == '-' ? 'grey' : '#00ff30'
        if (realtimeAlarms?.alarms && realtimeAlarms.alarms.length > 0) {
            let alarm = realtimeAlarms.alarms[0].alarms.find(s => s.source.id == selectSensorId)
            if (alarm && alarm.level) {
                let level = alarm.level;
                switch (level) {
                    case 1:
                        alarmText = '一级告警'
                        color = '#ff2a00'
                        break;
                    case 2:
                        alarmText = '二级告警'
                        color = '#ff9600'
                        break;
                    case 3:
                        alarmText = '三级告警'
                        color = '#fcff00'
                        break;

                }
                alarmText = level == 1 ? '一级告警' : level == 2 ? '二级告警' : '三级告警'
            }
        }
        return (
            <div className='realtime-data-text' style={{ height: 374, border: '1px solid rgba(47, 83, 234, 0.08)', marginTop: 20 }}>
                <div>监测因素：{factorName} </div>
                <div>测点名称：{location}</div>
                <div>实时数据：<span style={{ background: color }}>{this.renderData()[0]}/{alarmText}</span></div>
                <div>采集时间：{this.renderData()[1]}</div>
                <div>一级阈值：{this.getThresData() && this.getThresData()[0] ? this.getThresData()[0] : '未设置'}</div>
                <div>二级阈值：{this.getThresData() && this.getThresData()[1] ? this.getThresData()[1] : '未设置'}</div>
                <div>三级阈值：{this.getThresData() && this.getThresData()[2] ? this.getThresData()[2] : '未设置'}</div>
            </div >)
    }
}

export default RealTimeData;