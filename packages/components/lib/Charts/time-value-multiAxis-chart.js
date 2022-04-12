
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

class TimeValueMultiAxisChart extends Component {
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
        const { data, height, scaleConfig, axis, configs } = this.props;
    
        
        let series = [];
        const keys = axis.map(a => {
            return Object.keys(a)[0];
        })
       
        data.map(v=>{
                keys.forEach((key,index) => {
                    if(v[key] !== undefined){
                        const i = series.findIndex(f=> f.name == v.name);
                        if(i !== -1){
                            series[i].data.push(v[key]);
                        }else{
                            series.push({
                                name: v.name,
                                type: configs && configs.isRainfall ? 'bar': 'line',
                                yAxisIndex: index,
                                data: [v[key]],
                                showSymbol: false,
                                emphasis: {
                                    focus: 'series'
                                }
                            });
                        }   
                    }  
            })
            
        })
        return series;
        
    }

    UNSAFE_componentWillMount() {
        this.series = this.setData(this.props);
    }
    getOption = () => {
  
        const { data, height, scaleConfig, axis, configs } = this.props;
        
        
         
        const xaxis = configs?.xAxis || 'time';
        
        let option = {
           
            toolbox: {
                feature: {
                  restore: {},
                  saveAsImage: {}
                },
                right: 30
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross',
                  animation: false,
                }
            },

            backgroundColor: DEFAULT_COLOR,
            color: color,
            legend: {
                right: 100,
                type: 'scroll'
                // data: [""]
            },
            xAxis: { 
                ...xAxis.category,
                data: [...new Set(data.map(v => v[xaxis]))]
            },
            series: this.series,
           
            
        }
        let i = 0;
        let yAxis = [];
        axis.map(a => {
            Object.keys(a).forEach(key => {
                let position = 'left';
                let offset = {};
                let num = 0;
                if (configs.isThreeAxisleft) {
                    position = 'left';
                    
                    if ('yAxis2' == key){
                        position = 'right';
                    }else{
                        num = yAxis.filter(f=> f.position == 'left').length;
                        if(num > 0 ){
                            offset = { offset: num * 60 }
                        }
                    }
                } else if (configs.isThreeAxisRight) {
                    
                    position = 'right';
                    if ('yAxis1' == key){
                        position = 'left';
                    }else{
                        num = yAxis.filter(f=> f.position == 'right').length;
                        if(num > 0 ){
                            offset = { offset: num * 60 }
                        }
                    }  
                } else {
                    if (i == 1)
                        position = 'right';
                }
                i++;
                
                yAxis.push({
                    position: position,
                    name: scaleConfig[key]?.alias || '',
                    type: 'value',
                    ...offset
                });
                
            })
            
        })

        option.yAxis = yAxis;
        if (configs && configs.slider) { 
            option.dataZoom = [{...dataZoom, ...configs.slider },{ ...configs.slider }];
        }
        let grid = { };
        if (configs.isThreeAxisleft){
            grid.left = 150
        }
           
        if (configs.isThreeAxisRight){
            grid.right = 150
        }
        option.grid= grid;
        
        
        
        return option;
        
    }
    render() {
        const { height, width } = this.props;
        const options = this.getOption();
        console.log('%c [ options ]', 'font-size:13px; background:pink; color:#bf2c9f;', options)
        return (
            <ReactEcharts
                option={options}
                notMerge={true}
                lazyUpdate={true}
                style={{ height: height || '500px', margin: '0', width: width || 'auto' }} />
        )
    }
}

export default TimeValueMultiAxisChart;