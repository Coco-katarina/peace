
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import {
    tooltip, toolbox, legend, xAxis, splitLine, axisLine, axisTick, axisLabel, yAxis, DEFAULT_COLOR, windRoseColors, dataZoom
} from './constants';
/**
 * props:
 * 
 *      data: [{
            type: 'bar',
            data:[1,2,3,4,5,6,7,8,9,0,1,1], //0-12级数据
            coordinateSystem: 'polar',
            name: '< 0.3 m/s 0级', //等级
            stack: 'a',
       }
    })],
 *      height: 图表高度
 */

class WindRoseChart extends Component {
    constructor(props) {
        super(props);
        this.series = null;
    }

    getOption = () => {
        const { data } = this.props;
        let option = {
            toolbox: {
                feature: {
                    saveAsImage: {}
                },
                right: 30
            },
            backgroundColor: DEFAULT_COLOR,
            color: windRoseColors,
            angleAxis: {
                type: 'category',
                data: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'],
                z: 0,
                boundaryGap: false,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#ddd',
                        type: 'solid'
                    }
                },
                axisLine: {
                    show: false
                }
            },
            radiusAxis: {
                center: ['50%', '50%'],
            },
            grid: { // 控制图的大小，调整下面这些值就可以，
                x: 40,
                x2: 100,
                y2: 150// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
            },
            polar: {

            },
            tooltip:{},
            series: data,
            legend: {
                show: false,
            }
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

export default WindRoseChart;