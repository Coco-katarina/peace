
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import {
    tooltip, toolbox, legend, xAxis, splitLine, axisLine, axisTick, axisLabel, yAxis, DEFAULT_COLOR, color, dataZoom
} from './constants';
/**
 * props:
 * 
 *      data: [ { name: "湿度", value: -10, time: "2018-03-13 10:31:59" }],
 *      height: 图表高度
 *      config: { yAxis: 修改默认y轴值对应的键, xAxis: 修改默认x轴值对应的键,}
 */

class AreaChartWithNegative extends Component {
    constructor(props) {
        super(props);
        this.series = null;
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { data } = nextProps;
        if (JSON.stringify(data) != JSON.stringify(this.props.data)) {
            this.series = this.setData(nextProps);
        }
    }
    setData = (props) => {
        const yaxis = props.configs?.yAxis || 'value';
        
        let series = [{
            name: props.data[0]?.name,
            data:  props.data.map(v => v[yaxis]),
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
                color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                  }
                ])
            },
        }];
       
        return series;
    }

    UNSAFE_componentWillMount() {
        this.series = this.setData(this.props);
    }
    getOption = () => {
        const { configs, data } = this.props;
        const xaxis = configs?.xAxis || 'time';
        
        let option = {
            title: {
                left: 'center',
                text: configs?.title || ''
            },
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                  return [pt[0], '10%'];
                },
                axisPointer: {
                    type: 'shadow'
                }
            },
            toolbox: {
                feature: {
                  restore: {},
                  saveAsImage: {}
                },
                right: 30
            },
            backgroundColor: DEFAULT_COLOR,
            color: color,
            xAxis: { 
                ...xAxis.category,
                boundaryGap: false,
                data: data.map(v => v[xaxis])
            },
            series: this.series,
            //color: ['#4BD9AD'],
            yAxis: [{
                type: 'value',
                boundaryGap: [0, '100%']
            }]
        }
       
        if (configs && configs.slider) { 
            option.dataZoom = [{...dataZoom, ...configs.slider },{ ...configs.slider }];
        }
        return option;
    }
    render() {
        const { height, width } = this.props;
        const options = this.getOption();
       
        return (
            <ReactEcharts
                option={options}
                notMerge={true}
                lazyUpdate={true}
                style={{ height: height || '300px', margin: '0', width: width || 'auto' }} />
        )
    }
}

export default AreaChartWithNegative;