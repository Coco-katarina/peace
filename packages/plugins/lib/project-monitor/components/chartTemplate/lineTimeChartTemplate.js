
'use strict';
import React, { Component } from 'react';
import { Button } from 'antd';
// 引入 echarts 主模块。
import * as echarts from 'echarts/lib/echarts';
// 引入折线图
import 'echarts/lib/chart/line';
//引入标签组件
import ReactEcharts from 'echarts-for-react';

let chartDownload = "";
class LineTimeChart extends Component {
    constructor(props) {
        super(props);
        this.sliderId = 'sliderId' + Math.floor(Math.random() * 1000000000);
        this.chartId = 'chartId' + Math.floor(Math.random() * 1000000000);
        this.legendId = 'legendId' + Math.floor(Math.random() * 1000000000);
        this.legendListId = 'legendListId' + Math.floor(Math.random() * 1000000000);
        this.tooltipId = 'tooltipId' + Math.floor(Math.random() * 1000000000);
        this.state = {
            option: {},
        }
    }

    componentDidMount() {
        let that = this;
        this.renderChart();
        this.reSetLegendStyle(that)
        window.addEventListener('resize', function () {
            let a = setInterval(function () { that.reSetLegendStyle(that) }, 100);
            setTimeout(function () { clearInterval(a) }, 3500)
        });
    }

    reSetLegendStyle = (that) => {
        // Ps.initialize(document.getElementById(that.legendId));
        // Ps.initialize(document.getElementById(that.tooltipId));
        // let legendListDom = document.getElementById(that.legendListId)
        // legendListDom.style.textAlign = 'left';
        // legendListDom.style.maxWidth = '115px'
        // document.getElementById(that.legendId).style.left = '10px'
    }

    download = () => {
        this.chartDownload.downloadImage();
    }

    renderChart = () => {
        const { options } = this.props;
        const props = this.props;

        
        //组织后端数据组织data
        let data = this.props.data;
        let dataArray = [], types = {};
        let xAxisValue = props.xAxis || 'time';
        let yAxisValue = props.yAxis || 'value';
        data.map(dd => {
            if (!types[dd.name]) {
                types[dd.name] = Object.assign({
                    name: dd.name, data: []
                }, {
                    type: 'line',
                    //smooth: true
                });
            }
            types[dd.name].data.push({
                name: dd.time,
                value: [dd[xAxisValue], dd[yAxisValue]]
            })

        });
        for (let t in types) {
            dataArray.push(types[t]);
        }
       

        let eOption = {}
        //鼠标移入提示
        eOption.tooltip = {
            // axisPointer:{
            //     axis:{}
            // }
            trigger: 'axis',
            //格式化 tooltip
            formatter: function (params, ticket, callback) {
                let htmlStr = "";
                for (let i = 0; i < params.length; i++) {
                    let param = params[i];
                    let xName = param.name;//x轴的名称
                    let seriesName = param.seriesName.split("series");//图例名称
                    let value = param.value;//y轴值
                    let color = param.color;//图例颜色
                    let data = param.value[1] ? param.value[1] : '无数据';
                    if (value[1] && seriesName.length == 1) {
                        htmlStr += '<div><span>' + xName + '</span>    ' + seriesName[0] + ' <span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;'
                            + 'background-color:' + color + ';"></span>' + data + '</div>';
                    }
                }
                return htmlStr;
            }
        }
        //X轴
        eOption.xAxis = {
            //type: 'category',
            type: 'time',
        }
        //Y轴
        eOption.yAxis = {
            type: 'value',
            min: 'dataMin',
            max: 'dataMax',
            name: options.yAlias,
            axisLabel: {
                formatter: function (value, index) {
                    return value.toFixed(2);
                }
            }

        }
        //toolbox 设置导出图片
        eOption.toolbox = {
            feature: {
                saveAsImage: {}
            }
        }
        //缩放
        eOption.dataZoom = [
            {
                show: true,
                realtime: true,
                start: 0,
                end: 100
            },
            {
                type: 'inside',
                realtime: true,
                start: 0,
                end: 100
            }
        ]
        //颜色标识
        eOption.legend = {
            left: '0',
            orient: 'vertical',
            type: 'scroll',
            icon: 'circle',
            //文字过长可以使用下面方法截取字符串
            formatter: function (name) {
                if (!name) return '';
                if (name.length > 8) {
                    if (name.length > 16) {
                        name = name.slice(0, 8) + `\n` + name.slice(0, 7) + "...";
                    } else {
                        name = name.slice(0, 8) + `\n` + name.slice(8);
                    }
                    return name;
                } else {
                    return name
                }
            },
            tooltip: {
                show: true
            }
        }
        // //数据源
        // eOption.dataset = {
        //     source: dataset
        // }
        //props.data;
        eOption.series = dataArray

        this.setState({ option: eOption });

        //this.chartDownload = chart;
    }

    render() {
        const { data, width, height, options, slider } = this.props;
        const showSlider = options && options.sliderStart;
        return (
            <div style={{ position: 'relative', paddingTop: 20, marginBottom: 24 }}>
                {/* <div style={{ position: 'absolute', right: '20px', top: '20px', zIndex: 2000 }} >
                    <Button onClick={this.download} size="default">导出</Button>
                </div> */}
                <div>
                    {/* <div id={this.chartId} style={{ textAlign: 'left' }}></div> */}
                    <ReactEcharts
                        option={this.state.option}
                    />
                    {/* <div id="echarts" style={{ textAlign: 'left' }}></div> */}
                    {
                        showSlider ? [
                            <div style={{ width: '100%' }} id={this.sliderId}></div>
                        ] : null
                    }
                </div>
            </div>
        );
    }
}
export default LineTimeChart;