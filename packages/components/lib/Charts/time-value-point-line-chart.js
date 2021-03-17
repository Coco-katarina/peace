import React, { Component } from 'react';
import createG2 from 'g2-react';
import G2, { Plugin } from 'g2';
import 'g2-plugin-slider';
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
 *      }],
 *      height: 图表高度,
 *      configs: {
 *          slider: {
 *              start: 初始开始点,
 *              end: 初始结束点
 *          }
 *      }
 */

let chartDownload = "";
class TimeValuePointLineChart extends Component {
    constructor(props) {
        super(props);

        this.sliderId = 'range' + Math.floor(Math.random() * 1000000000);

        const Chart = createG2((chart, configs) => {
            chart.source(props.data, {
                'time': {
                    range: [0, 1],
                    type: 'time',
                    alias: '时间',
                    nice: false,
                    mask: 'yyyy-mm-dd HH:MM:ss'
                },
                'min': {
                    'min': configs.range.min,
                    'max': configs.range.max,
                    'nice': false,
                    'alias': '最小值'
                },
                'max': {
                    'min': configs.range.min,
                    'max': configs.range.max,
                    'nice': false,
                    'alias': '最大值'
                },
                'soundLevel': {
                    'min': configs.range.min,
                    'max': configs.range.max,
                    'alias': '等效声级',
                    'nice': false
                }
            });
            chart.axis('time', {
                title: null,
                mask: 'yyyy-mm-dd HH:MM:ss'
            });
            chart.axis('min', false);
            chart.axis('max', false);
            chart.axis('soundLevel', {
                titleOffset: 75,
                formatter: function (val) {
                    return val + 'dB';
                },
                tickLine: false,
                line: {
                    lineWidth: 0
                },
                title: null
            })
            chart.legend({ 'marker': 'hyphen' });
            chart.tooltip(true, {
                title: null,
                crosshairs: true
            });
            chart.on('tooltipchange', function (ev) {
                let items = ev.items;
                let min = items[0], max = items[1];
                let LAeqValue = props.data.filter(s => s.time == items[0].title)[0].soundLevel;
                items.splice(0);
                if (LAeqValue) {
                    items.push({
                        name: '最小值',
                        title: min.title,
                        marker: true,
                        value: min.value
                    })
                    items.push({
                        name: '最大值',
                        title: max.title,
                        marker: true,
                        value: max.value
                    })
                    items.push({
                        name: '等效声级',
                        title: 'soundLevel',
                        marker: true,
                        value: LAeqValue
                    })
                    items.push({
                        name: '采集时间',
                        title: 'time',
                        marker: true,
                        value: min.title
                    })
                }
            })

            chart.point().position('time*soundLevel').color('#fcff02');
            chart.line().position('time*min').color('#05f1f1').shape('smooth').size(2);
            chart.line().position('time*max').color('#05f1f1').shape('smooth').size(2);

            // 创建滑动条
            Plugin.slider.ATTRS.textAttr = { fill: '#fff' };
            var slider = new Plugin.slider({
                domId: this.sliderId,
                height: 30,
                charts: chart,
                xDim: 'time',
                yDim: 'value',
                start: configs.slider.start,
                end: configs.slider.end
            });
            slider.render();
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
        const { data, width, height, configs } = this.props;

        return (
            <div style={{ position: 'relative', paddingTop: 20, marginBottom: 24 }}>
                <div style={{ position: 'absolute', right: '20px', top: '20px', zIndex: 2000 }} >
                    <Button onClick={this.download} size="default">导出</Button>
                </div>
                <div>
                    <this.Chart data={data} width={width} height={height || 300} forceFit={true}
                        plotCfg={{ margin: [20, 145, 30, 138] }} ref="myChart" configs={configs} />
                    <div className="chart-inner-divider"></div>
                    <div className="chart-slider" id={this.sliderId}></div>
                </div>
            </div>
        );
    }
}

export default TimeValuePointLineChart;