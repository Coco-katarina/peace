import React, { Component } from 'react';
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
import Slider from '@antv/g2-plugin-slider';
import './theme';
import { Button } from 'antd';
import FileSaver from 'file-saver';

let chartDownload = "";
class TimeValueMultiAxisChart extends Component {


    
    componentDidMount() {
        const { data, height, scaleConfig, axis, configs } = this.props;
        let padding = [50, 220, 10, 130];
        if (configs.isThreeAxisleft)
            padding = [50, 220, 10, 130];
        if (configs.isThreeAxisRight)
            padding = [50, 260, 10, 130];

        const ds = new DataSet({
            state: {
                start: configs.slider.start,
                end: configs.slider.end,
            }
        });
        // !!! 通过 ds 创建 DataView
        const dv = ds.createView();
        dv.source(data)
            .transform({ // !!! 根据状态量设置数据过滤规则，
                type: 'filter',
                callback: obj => {
                    return obj.time <= ds.state.end && obj.time >= ds.state.start;
                }
            });
        const chart = new G2.Chart({
            id: 'c1',
            forceFit: true,
            height: height,
            padding: padding
        });
        // chart.source(data, scaleConfig);
        chart.scale(scaleConfig);

        chart.axis('time', {
            title: null,
            line: {
                //stroke: '#C0C0C0',
            }, label: {
                textStyle: {
                    //fill: '#C0C0C0', // 文本的颜色
                }
            }
        });
        let i = 0;
        axis.map(a => {
            Object.keys(a).forEach(key => {
                let position = 'left';
                let offset = 35;
                let title = {};
                let line = {}
                let label = {
                    textStyle: {
                        //fill: '#C0C0C0', // 文本的颜色
                    }
                }
                if (configs.isThreeAxisleft) {
                    if (i == 0) {
                        label['offset'] = 70;
                        title = {
                            offset: 90
                        }
                    }
                    position = 'left';
                    if ('yAxis2' == key)
                        position = 'right';
                } else if (configs.isThreeAxisRight) {
                    if (i == 1) {
                        label['offset'] = 70;
                        title = {
                            offset: 90
                        }
                    }
                    position = 'right';
                    if ('yAxis1' == key)
                        position = 'left';
                } else {
                    if (i == 1)
                        position = 'right';
                }
                i++;
                chart.axis(key, {
                    position: position,
                    title: title,
                    label: label,
                    grid: {
                        lineStyle: {
                            //stroke: '#C0C0C0',
                            lineWidth: i == 1 ? 1 : 0
                        }
                    }
                });
            })
        })
        let offsetX = 50;
        if (configs.isThreeAxisRight) {
            offsetX = 85;
        }
        chart.legend({
            title: null,
            position: 'right', // 设置图例的显示位置
            // offsetX: offsetX, // 整个图例的水平偏移距离 g2 3.0.6版本中图例偏移距离自适应
            textStyle: {
                //fill: '#C0C0C0', // 文本的颜色
            }

        });
        const view1 = chart.view({
            start: {
                x: 0,
                y: 0
            },
            end: {
                x: 1,
                y: 0.8
            }//View 的绘制起始点是画布左上角，start 和 end 这两个参数只接受 0 至 1 范围的数据。
        });
        view1.source(dv);  // !!! 注意数据源是 ds 创建 DataView 对象
        let chart1 = view1;
        if (configs.isThreeAxisleft) {
            configs.yAxisLeftArr.map(y => {
                chart1.line().position(`time*${y}`).color('name').size(2)
            })
            if (configs && configs.isRainfall)
                chart1.interval().position('time*yAxis2').color('name').size(10);
            else
                chart1.line().position('time*yAxis2').color('name').size(2)
        } else if (configs.isThreeAxisRight) {
            if (configs && configs.isRainfall)
                chart1.interval().position('time*yAxis1').color('name').size(10);
            else
                chart1.line().position('time*yAxis1').color('name').size(2);
            configs.yAxisRightArr.map(y => {
                chart1.line().position(`time*${y}`).color('name').size(2);
            })
        } else {
            if (configs && configs.isRainfall) {
                if (configs.yAxisRightArr.indexOf('rainfall') > -1) {
                    chart1.interval().position('time*yAxis2').color('name').size(10);
                    chart1.line().position('time*yAxis1').color('name').size(2);
                } else {
                    chart1.interval().position('time*yAxis1').color('name').size(10);
                    chart1.line().position('time*yAxis2').color('name').size(2);
                }
            } else {
                chart1.line().position('time*yAxis1').color('name').size(2);
                chart1.line().position('time*yAxis2').color('name').size(2);
            }
        }
        chart.render();
        // 创建滑动条
        let slider = new Slider({
            container: 'multiSlider',
            padding: padding,
            xAxis: 'time',
            yAxis: configs.isThreeAxisleft ? 'yAxis2' : 'yAxis1',
            start: configs.slider.start,
            end: configs.slider.end,
            data: data,
            scales: {
                'time': {
                    type: 'time',
                    mask: "YYYY-MM-DD HH:mm:ss"
                }
            },
            fillerStyle: {
                fill: '#BDCCED',
                fillOpacity: 0.2
            },
            //textStyle: { fill: '#C0C0C0' },
            // backgroundChart: {
            //     type: ['line'], // 图表的类型，可以是字符串也可是是数组
            //     color: '#fff'
            // },
            onChange: ({ startValue, endValue, startText, endText }) => {
                ds.setState('start', startText);
                ds.setState('end', endText);
            } // 更新数据状态量的回调函数
        });
        slider.render();

        this.chartDownload = chart;
    }
    download = () => {
        //两种都可行
        this.chartDownload.downloadImage();
        // const dataurl = this.chartDownload.toDataURL();
        // let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        //     bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        // while (n--) {
        //     u8arr[n] = bstr.charCodeAt(n);
        // }
        // let blob = new Blob([u8arr], { type: mime });

        // FileSaver.saveAs(blob, "chart.png");
    }
    render() {
        return (
            <div style={{ position: 'relative', paddingTop: 20, marginBottom: 24 }}>
                <div style={{ position: 'absolute', right: '20px', top: '20px', zIndex: 90 }} >
                    <Button onClick={this.download} size="default">导出</Button>
                </div>
                <div>
                    <div style={{ width: '100%', height: '300px' }} id="c1"></div>

                    <div className="chart-inner-divider"></div>
                    <div className="chart-slider" id='multiSlider'></div>

                </div>
            </div>
        );
    }
}

export default TimeValueMultiAxisChart;