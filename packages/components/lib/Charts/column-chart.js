
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

class ColumnChart extends Component {
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
            name: props.scaleConfig[yaxis]?.alias || '',
            data:  props.data.map(v => v[yaxis]),
            type: 'bar',

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
        const { scaleConfig, config, conditionData } = this.props;
        const xaxis = config?.xAxis || 'x';
        const yaxis = config?.yAxis || 'y';
        let option = {
            toolbox: {
                feature: {
                  saveAsImage: {}
                },
                right: 30
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    let result = '';
                    params.forEach(item => {
                        let lowUp = conditionData.filter(c => parseFloat(c.category).toFixed(2).toString() == item.name);
                       
                        if (lowUp.length > 0) {
                            if (!result.length){
                                result += `${config.name}：${lowUp[0].low.toFixed(2)}${config.unit}-${lowUp[0].up.toFixed(2)}${config.unit}`;
                            }
                            result += "</br>" + `${item.marker} 占比:  ${parseFloat(item.value).toFixed(2)}%`;
                            
        
                        } else {
                            if (!result.length){
                                result += item.seriesName;
                            } 
                            result += "</br>" + `${item.marker} 占比:  ${parseFloat(item.value).toFixed(2)}%`;
                        }
                        
                    })
                    return result;
                }
            },
            backgroundColor: DEFAULT_COLOR,
            color: color,
            legend: false,
            xAxis: { 
                ...xAxis.category,
                name: scaleConfig[xaxis]?.alias || '',
                data: this.props.data.map(v => v[xaxis])
            },
            series: this.series,
            yAxis: [{
                type: 'value',
                name: scaleConfig[yaxis]?.alias || ''
            }]
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

export default ColumnChart;