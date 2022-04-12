/**
 * Created by pengpeng
 * on 2017/8/18.
 */
'use strict';

import React, { Component } from 'react'
import { DatePicker } from 'antd';
import createG2 from 'g2-react';
import { Stat } from 'g2'
import G2 from 'g2';

import Style from '../../style.css';

class PieChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.alarmState.length ? props.alarmState : [{"name": "结构物无故障", "total": 1}],
            emptyAlarmsData: props.alarmState.length ? false : true,
            forceFit: true,
            width: '100%',
            height: 240
        }
        this.veryGoodData = [{"name": "结构物无故障", "total": 1}]
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.alarmState.toString() != this.props.alarmState.toString()){
            this.setState({
                data: nextProps.alarmState.length ? nextProps.alarmState : [{"name": "结构物无故障", "total": 1}], 
                emptyAlarmsData: nextProps.alarmState.length ? false : true,
            })
        }
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.alarmState.toString() != this.props.alarmState.toString()){
            return true
        } else {
            return false
        }
    }

    render() {
        const { data, emptyAlarmsData } = this.state;
        const Chart = createG2(chart => {
            var Stat = G2.Stat;
            // 重要：绘制饼图时，必须声明 theta 坐标系
            chart.coord('theta', {
                radius: 0.8 // 设置饼图的大小
            });
            chart.legend(false);
            emptyAlarmsData ? 
                chart.tooltip(false)
                :
                chart.tooltip({
                    title: null,
                    map: {
                        value: 'total'
                    }
                })
                
            chart.intervalStack()
                .position(Stat.summary.percent('total'))
                .color('name')
                .label('name*..percent', function (name, percent) {
                    percent = (percent * 100).toFixed(2) + '%';
                    return emptyAlarmsData ? name : name + ' ' + percent;
                });
            
            chart.render();
            // 设置默认选中
            var geom = chart.getGeoms()[0]; // 获取所有的图形
            var items = geom.getData(); // 获取图形对应的数据
            geom.setSelected(items[1]); // 设置选中      
        });
        return (
            <div>
                <div style={{ marginTop: 20 }}>
                    {data.length ? 
                        <Chart
                            data={this.state.data}
                            width={this.state.width}
                            height={this.state.height}
                            forceFit={this.state.forceFit} />
                        :
                        <Chart
                            data={this.veryGoodData}
                            width={this.state.width}
                            height={this.state.height}
                            forceFit={this.state.forceFit} />
                    }
                </div>
            </div>
        )
    }
}
export default PieChart;