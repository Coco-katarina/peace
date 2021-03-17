import React, { Component } from 'react';
import createG2 from 'g2-react';
import G2, { Plugin } from 'g2';
import 'g2-plugin-slider';
import './theme';
import moment from 'moment';
import { Button } from 'antd';
import FileSaver from 'file-saver';
/**
 * props:
 * 
 *      data: [{
 *          name: 图例名称,
 *          value: y轴数值,
 *          time: x轴时间值,
 *          windDirection:tooltip风向数据
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
class CustomTooltipTimeValueLineChart extends Component {
    constructor(props) {
        super(props);
        const DIRECTION = {
            "N": [0, 11.25, 348.75, 360],
            "NNE": [11.25, 33.75],
            "NE": [33.75, 56.25],
            "ENE": [56.25, 78.75],
            "E": [78.75, 101.25],
            "ESE": [101.25, 123.75],
            "SE": [123.75, 146.25],
            "SSE": [146.25, 168.75],
            "S": [168.75, 191.25],
            "SSW": [191.25, 213.75],
            "SW": [213.75, 236.25],
            "WSW": [236.25, 258.75],
            "W": [258.75, 281.25],
            "WNW": [281.25, 303.75],
            "NW": [303.75, 326.25],
            "NNW": [326.25, 348.75]
        }
        const LEVEL = {
            "0级": [0, 0.3],
            "1级": [0.3, 1.6],
            "2级": [1.6, 3.4],
            "3级": [3.4, 5.5],
            "4级": [5.5, 8.0],
            "5级": [8.0, 10.8],
            "6级": [10.8, 13.9],
            "7级": [13.9, 17.2],
            "8级": [17.2, 20.8],
            "9级": [20.8, 24.5],
            "10级": [24.5, 28.5],
            "11级": [28.5, 32.6],
            "12级": [32.6, 1000]
        }

        this.sliderId = 'rangeTooltip' + Math.floor(Math.random() * 1000000000);
        const Chart = createG2((chart, configs) => {
            chart.source(props.data, {
                'time': {
                    range: [0, 1],
                    type: 'time',
                    alias: '时间',
                    mask: 'yyyy-mm-dd HH:MM:ss'
                }
            });
            chart.axis('time', {
                title: null,
                mask: 'yyyy-mm-dd HH:MM:ss'
            });
            chart.axis('value', {
                title: null,
            });
            chart.legend({
                title: null,
                position: 'right', // 设置图例的显示位置
            });
            chart.on('tooltipchange', function (ev) {
                let dataWind = props.data;
                for (let i = 0; i < ev.items.length; i++) {
                    let item = ev.items[i];
                    let length = item.name.split('-').length;//累计值不作处理
                    if (length > 1)
                        break;
                    for (let k = 0; k < dataWind.length; k++) {
                        let wind = dataWind[k];
                        if (item.name == wind.name) {
                            if (moment(item.title).isSame(wind.time)) {
                                if (parseFloat(item.value) == wind.value) {
                                    let level = '0级';
                                    let v = parseFloat(item.value);
                                    let direction = 'N';
                                    let directionValue = parseFloat(wind.windDirection);
                                    for (let param in LEVEL) {
                                        if (LEVEL[param][0] < v && v <= LEVEL[param][1]) {
                                            level = param;
                                            break;
                                        }
                                    }
                                    for (let param in DIRECTION) {
                                        if (DIRECTION[param].length > 2) {
                                            if (DIRECTION[param][0] < directionValue && directionValue <= DIRECTION[param][1]) {
                                                direction = param;
                                                break;
                                            }
                                            if (DIRECTION[param][2] < directionValue && directionValue <= DIRECTION[param][3]) {
                                                direction = param;
                                                break;
                                            }
                                        } else {
                                            if (DIRECTION[param][0] < directionValue && directionValue <= DIRECTION[param][1]) {
                                                direction = param;
                                                break;
                                            }
                                        }
                                    }
                                    item.value += '(' + level + ')' + '-' +
                                        '风向' + wind.windDirection + '(' + direction + ')';
                                    break;
                                }
                            }
                        }
                    }
                }
            });

            chart.line().position('time*value').color('name').shape('line').size(2);
            if (!configs || !configs.start) {
                chart.render();
            } else {
                // 创建滑动条
                Plugin.slider.ATTRS.textAttr = { fill: '#fff' };
                var slider = new Plugin.slider({
                    domId: this.sliderId,
                    height: 30,
                    charts: chart,
                    xDim: 'time',
                    yDim: 'value',
                    start: configs.start,
                    end: configs.end
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
        const { data, width, height, configs } = this.props;
        let margin = [20, 160, 30, 60];
        const showSlider = configs && configs.start;
        if (showSlider) {
            margin = [20, 155, 30, 150];
        }
        return (
            <div style={{ position: 'relative', paddingTop: 20, marginBottom: 24 }}>
                <div style={{ position: 'absolute', right: '20px', top: '20px', zIndex: 2000 }} >
                    <Button onClick={this.download} size="default">导出</Button>
                </div>
                <div>
                    <this.Chart data={data} width={width} height={height || 300}
                        plotCfg={{ margin: margin }} forceFit={true} ref="myChart" configs={configs} />
                    {
                        showSlider ? [
                            <div className="chart-inner-divider"></div>,
                            <div className="chart-slider" id={this.sliderId}></div>
                        ] : null
                    }
                </div>
            </div>
        );
    }
}

export default CustomTooltipTimeValueLineChart;