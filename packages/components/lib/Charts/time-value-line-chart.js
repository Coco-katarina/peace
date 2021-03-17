import React, { Component } from 'react';
import createG2 from 'g2-react';

import G2, { Plugin } from 'g2';
//import G2 from '@antv/g2'
//import DataSet from '@antv/data-set';

import 'g2-plugin-slider';
//import Slider from '@antv/g2-plugin-slider';

import './theme';
import { Button } from 'antd';
import FileSaver from 'file-saver';
/**
 * props:
 * 
 *      data: [{
 *          name: 图例名称,
 *          value: y轴数值,
 *          time: x轴时间值
 *      }], // 数组或封装后的frame
 *      height: 图表高度,
 *      configs: {
 *          slider: {
 *              start: 初始开始点,
 *              end: 初始结束点
 *          }
 *      },
 *      yAxis: 修改默认y轴值对应的键
 */

let chartDownload = "";
class TimeValueLineChart extends Component {
    constructor(props) {
        super(props);

        this.sliderId = 'range' + Math.floor(Math.random() * 1000000000);
        const Chart = createG2((chart, configs) => {
            chart.source(props.data, {
                'value': {
                    formatter: val => {
                        if (configs.unit) {
                            return val + configs.unit
                        } else {
                            return val
                        }
                    }
                },
                'time': {
                    range: [0, 1],
                    type: 'time',
                    alias: '时间',
                    mask: 'yyyy-mm-dd HH:MM:ss'
                },
                'days': {
                    type: 'linear',
                    alias: '',
                    formatter: val => {
                        return val + '天'
                    }
                }
            });
            chart.axis(props.xAxis || 'time', {
                title: null,
                line: {
                    //stroke: '#C0C0C0',
                }, label: {
                    textStyle: {
                        //fill: '#C0C0C0', // 文本的颜色
                    }
                }
                //mask: 'yyyy-mm-dd HH:MM:ss'
            });
            chart.axis(props.yAxis || 'value', {
                title: null,
            });
            chart.legend({
                title: {},
                position: 'bottom', // 设置图例的显示位置
                itemWrap: true,
                dy: 20,
            });
            chart.tooltip(true, {
                map: {

                }
            })
            chart.on('tooltipchange', function (ev) {
                if (props.xAxis == 'days') {
                    for (let i = 0; i < ev.items.length; i++) {
                        let item = ev.items[i];
                        item.name = item.point._origin.time;
                    }
                }
            });
            chart.line().position(`${props.xAxis || 'time'}*${props.yAxis || 'value'}`).color('name').shape('line').size(2);

            if (!configs || !configs.slider) {
                chart.render();
            } else {
                // 创建滑动条
                //Plugin.slider.ATTRS.textAttr = { fill: '#fff' };
                var slider = new Plugin.slider({
                    domId: this.sliderId,
                    height: 30,
                    charts: chart,
                    xDim: props.xAxis || 'time',
                    yDim: props.yAxis || 'value',
                    start: configs.slider.start, // 滑块开始值，用户未定义则使用默认值
                    end: configs.slider.end // 滑块结束值，用户未定义则使用默认值
                });
                slider.render();
            }
            this.chartDownload = chart;
        });
        this.Chart = Chart;
    }
    download = () => {
        //this.chartDownload.downloadImage();
        const dataurl = this.chartDownload.toImage();
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        let blob = new Blob([u8arr], { type: mime });

        FileSaver.saveAs(blob, "chart.png");
    }

    render() {
        const { unit, data, height, configs, xAxis, index } = this.props;

        let margin = [20, 160, 30, 60];
        const showSlider = configs && configs.slider;
        if (showSlider) {
            //margin = [20, 145, 30, 138];
            margin = [20, 145, 80, 138];
        }
        return (
            <div key={`chart-container-${index}`} style={{ position: 'relative', paddingTop: 20, marginBottom: 24 }}>
                <div key={`chart-header-${index}`} style={{ position: 'absolute', right: '20px', top: '20px', zIndex: 2 }} >
                    <Button key={`chart-button-${index}`} onClick={this.download} size="default">导出</Button>
                </div>
                <div>
                    <this.Chart
                        key={`chart-${index}`}
                        data={data}
                        height={height || 500} xAxis={xAxis}
                        plotCfg={{ margin: margin }} forceFit={true} ref="myChart" configs={configs} />
                    {
                        showSlider ? [
                            <div key={`chart-divider-${index}`} className="chart-inner-divider"></div>,
                            <div key={`chart-slider-${index}`} className="chart-slider" id={this.sliderId}></div>
                        ] : null
                    }
                </div>
            </div>
        );
    }
}

export default TimeValueLineChart;