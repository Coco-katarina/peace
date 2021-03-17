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
class TimeValueColumnLineChart extends Component {
    constructor(props) {
        super(props);
        this.renderChart(props.data);
    }
    UNSAFE_componentWillMount(nextProps) {
        const { data, configs } = nextProps;
        // if (data != this.props.data)
        //     this.renderChart(data);
        if (configs.showCumulativeValue != this.props.configs.showCumulativeValue)
            this.renderChart(data);
    }
    renderChart = (data) => {
        const Chart = createG2((chart, configs) => {
            chart.source(data, {
                'time': {
                    range: [0, 1],
                    type: 'time',
                    alias: '时间',
                    nice: false,
                    mask: 'yyyy-mm-dd HH:MM:ss'
                },
                'rainfall': {
                    alias: '降雨量',
                    nice: false
                },
                'rainfallCumulative': {
                    alias: '累计降雨量',
                    nice: false
                }
            });
            chart.axis('time', {
                title: null,
                mask: 'yyyy-mm-dd HH:MM:ss'
            });
            chart.axis('rainfallCumulative', {
                // title: null,
                titleOffset: 75,
                formatter: function (val) {
                    return val + 'mm';
                }
            });
            chart.axis('rainfall', {
                // title: null,
                titleOffset: 75,
                formatter: function (val) {
                    return val + 'mm';
                }
            });
            chart.legend(false);
            // chart.interval().position('time*rainfall').color('rainfall', '#00fefe-#1482d1').size(10);

            chart.interval().position('time*rainfall').color('#1f77b4').size(10);
            if (configs.showCumulativeValue)
                chart.line().position('time*rainfallCumulative').color('#ff7f0e').shape('smooth').size(2);
            // 创建滑动条
            let elem = document.getElementById("rainfallSlider");//获取父节点
            elem.innerHTML = "";
            Plugin.slider.ATTRS.textAttr = { fill: '#fff' };
            var slider = new Plugin.slider({
                domId: 'rainfallSlider',
                height: 30,
                charts: chart,
                xDim: 'time',
                yDim: 'rainfall',
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
            margin = [20, 160, 80, 138];
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
                    <div className="chart-slider" id='rainfallSlider'></div>
                </div>
            </div>
        );
    }
}

export default TimeValueColumnLineChart;