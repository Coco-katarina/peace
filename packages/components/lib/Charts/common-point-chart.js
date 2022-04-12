
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import {
    tooltip, toolbox, legend, xAxis, splitLine, axisLine, axisTick, axisLabel, yAxis, DEFAULT_COLOR, color, dataZoom
} from './constants';


class CommonPointChart extends Component {
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
        const { scaleConfig, config } = props;
        const yaxis = config?.yAxis || 'y';
       
        let series = [{
            name: scaleConfig[yaxis]?.alias || '',
            data:  props.data.map(v => v[yaxis]),
            type: 'scatter'
        }];
       
        return series;
    }

    UNSAFE_componentWillMount() {
        this.series = this.setData(this.props);
    }
    getOption = () => {
        const { scaleConfig, config, data } = this.props;
        const xaxis = config?.xAxis || 'x';
        const yaxis = config?.yAxis || 'y';
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            toolbox: {
                feature: {
                  saveAsImage: {}
                },
                right: 30
            },
            backgroundColor: DEFAULT_COLOR,
            color: color,
            legend: false,
            xAxis: { 
                ...xAxis.category,
                name: scaleConfig[xaxis]?.alias || '',
               
                data: data.map(v => v[xaxis])
            },
            series: this.series,
            yAxis: [{
                type: 'value',
                name: scaleConfig[yaxis]?.alias || '',
                splitLine: {
                    show: false
                },
                scale: true
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

export default CommonPointChart;