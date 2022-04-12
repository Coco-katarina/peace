
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import {
    tooltip, toolbox, legend, xAxis, splitLine, axisLine, axisTick, axisLabel, yAxis, DEFAULT_COLOR, color, dataZoom
} from './constants';
/**
 * props:
 * 
 *      data: [ { name: 's', range: '-12~-11.5', probability: 3 }],
 *      height: 图表高度
 *      config: { yAxis: 修改默认y轴值对应的键, xAxis: 修改默认x轴值对应的键,}
 */

class TimeValueBarChart extends Component {
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
        const yaxis = props.config?.yAxis || 'y';
       
        let series = [{
            name: props.data[0]?.name,
            data:  props.data.map(v => v[yaxis]),
            type: 'bar',
            stack: 'total',
            barMaxWidth: 20,
            // label: {
            //     show: true
            // },
            emphasis: {
                focus: 'series'
            }
        }];
       
        return series;
    }

    UNSAFE_componentWillMount() {
        this.series = this.setData(this.props);
    }
    getOption = () => {
        const xaxis = this.props.config?.xAxis || 'x';
        const yaxis = this.props.config?.yAxis || 'y';
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                },
                formatter: function (params) {
                    
                    let result = '';
                   
                    if (yaxis == 'probability') {
                        params.forEach(function (item) {
                            if (!result.length)
                                result += item.name;
                            result += "</br>" + item.marker + item.seriesName + '：' + item.data +  '%';
                        })
                    } else
                        params.forEach(function (item) {
                            if (!result.length)
                                result += item.name;
                                result += "</br>" + item.marker + item.seriesName + '：' + item.data;
                            
                        })
                    return result;
                }
                
            },
            backgroundColor: DEFAULT_COLOR,
            color: color,
            legend: false,
            xAxis: { 
                ...xAxis.category,
                data: this.props.data.map(v => v[xaxis])
            },
            series: this.series,
            yAxis: [{
                type: 'value',
                axisLabel: {
                    formatter: function (value, index) {
                        if (yaxis === 'probability') {
                            return value + '%'
                        } else {
                            return value
                        }
                    }
                }
            }]
        }
       

        return option;
    }
    render() {
        const { height, width } = this.props;
        const options = this.getOption();
       
        return (
            // <div style={{ position: 'relative', paddingTop: 20, marginBottom: 24, backgroundColor: DEFAULT_COLOR }}>
            <ReactEcharts
                option={options}
                notMerge={true}
                lazyUpdate={true}
                style={{ height: height || '300px', margin: '0', width: width || 'auto' }} />
            // </div>
        )
    }
}

export default TimeValueBarChart;