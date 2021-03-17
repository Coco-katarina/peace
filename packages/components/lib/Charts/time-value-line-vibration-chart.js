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
class TimeValueLineVibrationChart extends Component {
    constructor(props) {
        super(props);

        this.sliderId = 'range' + Math.floor(Math.random() * 1000000000);
        let _this = this;
        const Chart = createG2((chart, configs) => {
            chart.source(props.data, {
                'time': {
                    range: [0, 1],
                    type: 'time',
                    alias: '时间',
                    mask: 'yyyy-mm-dd HH:MM:ss'
                },
                'ppv': {
                    // 'min': 0,
                    // 'max': 50,
                    'nice': false,
                    'tickInterval': 5,
                    'alias': '峰峰值',
                },
                'trms': {
                    // 'min': 0,
                    // 'max': 50,
                    'nice': false,
                    'tickInterval': 5,
                    'alias': '有效值',
                },
                'pv': {
                    // 'min': 0,
                    // 'max': 50,
                    'nice': false,
                    'tickInterval': 5,
                    'alias': '极值',
                }
            });
            chart.axis('time', {
                title: null,
                mask: 'yyyy-mm-dd HH:MM:ss'
            });
            chart.axis('ppv', {
                title: null,
            });
            chart.axis('trms', false);
            chart.axis('pv', false);
            chart.legend({
                title: null,
                position: 'right', // 设置图例的显示位置
            });
            chart.line().position('time*ppv').color('#00ff00').shape('line').size(2);
            chart.line().position('time*trms').color('#00fefe').shape('line').size(2);
            chart.line().position('time*pv').color('#fef102').shape('line').size(2);
            chart.on('plotclick', function (ev) {
                let tooltip = chart.getTooltipItems({
                    x: ev.x,
                    y: ev.y
                })
                if (tooltip.length) {
                    _this.props.handlePointSelect(tooltip[0].title);
                }
            })

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

        let margin = [20, 160, 30, 60];
        const showSlider = configs && configs.slider;
        if (showSlider) {
            margin = [20, 145, 30, 138];
        }

        return (
            <div style={{ position: 'relative', paddingTop: 20, marginBottom: 24 }}>
                <div style={{ position: 'absolute', right: '20px', top: '20px', zIndex: 2000 }} >
                    <Button onClick={this.download} size="default">导出</Button>
                </div>
                <div>
                    <this.Chart data={data} width={width} height={height || 300}
                        plotCfg={{ margin: margin }} forceFit={true} ref="myChart" configs={configs} />
                    <div className="chart-inner-divider"></div>
                    <div className="chart-slider" id={this.sliderId}></div>
                </div>
            </div>
        );
    }
}

export default TimeValueLineVibrationChart;