import React, { Component } from 'react';
import createG2 from 'g2-react';
import G2, { Plugin } from 'g2';
import 'g2-plugin-slider';
import './theme';
import { Button } from 'antd';
import FileSaver from 'file-saver';

class AreaChartWithNegative extends Component {
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
                    range: [0, 1],//输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。  为毛是0-1
                    type: 'time',//类型  连续的时间类型
                    alias: '时间',//当前数据字段的显示别名，一般用于将字段的英文名称转换成中文名。
                    mask: 'yyyy-mm-dd HH:MM:ss', //
                }
            });
            chart.axis('time', {//坐标轴配置，该方法返回 chart 对象。
                title: null,
                //坐标轴标题 null不现实
                mask: 'yyyy-mm-dd HH:MM:ss'
            });
            chart.axis(props.yAxis || 'value', {
                title: null,
            });
            chart.legend(false
                // {//配置图表图例
                //     title: null,//图例标题的显示样式设置，如果值为 null，表示不展示图例标题
                //     position: 'bottom', // 设置图例的显示位置
                // }
            );
            //area()绘制区域图 返回geom对象
            //position('x*y') 数据值映射到图形的位置上的方法 
            //color()将数据值映射到图形的颜色上的方法
            //shape()将数据值映射到图形的形状上的方法
            chart.area().position('time*value').color('name', this.props.colors).shape('area');
            chart.line().position('time*value').color('name', this.props.colors).shape('line').size(1);

            // let geom = chart.interval().position(`${config.xAxis || 'x'}*${config.yAxis || 'y'}`).size(15);

            // this.props.colors ? geom.color('name', this.props.colors) : geom.color('name');

            //chart.area().position('time*value').color('#D5F0FD').shape('smooth');
            //chart.line().position('time*value').shape('smooth').size(2);            

            if (!configs || !configs.slider) {
                chart.render();
            } else {
                // 创建滑动条
                Plugin.slider.ATTRS.textAttr = { fill: '#fff' };
                var slider = new Plugin.slider({
                    domId: this.sliderId,
                    height: 30,
                    charts: chart,
                    xDim: 'time',
                    yDim: props.yAxis || 'value',
                    start: configs.slider.start,
                    end: configs.slider.end,
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
        const { data, width, height, configs, index } = this.props;

        let margin = [20, 160, 30, 60];
        const showSlider = configs && configs.slider;
        if (showSlider) {
            margin = [20, 145, 80, 138];
        }

        return (
            <div key={`area-chart-container-${index}`} style={{ position: 'relative', paddingTop: 20, marginBottom: 24 }}>
                {/* <div style={{ textAlign:'center', color:'#929EB3' }} >{configs.title}</div> */}
                <div key={`area-chart-title-${index}`} style={{ textAlign: 'center' }} >{configs.title}</div>
                <div key={`area-chart-button-${index}`} style={{ position: 'absolute', right: '20px', top: '20px', zIndex: 2000 }} >
                    <Button onClick={this.download} size="default">导出</Button>
                </div>
                <div key={`area-chart-${index}`}>
                    <this.Chart
                        key={`area-chart-${index}`}
                        data={data} width={width} height={height || 300}
                        plotCfg={{ margin: margin }} forceFit={true} ref="myChart" configs={configs} />
                    {
                        showSlider ? [
                            <div key={`area-chart-divider-${index}`} className="chart-inner-divider"></div>,
                            <div key={`area-chart-slider-${index}`} className="chart-slider" id={this.sliderId}></div>
                        ] : null
                    }
                </div>
            </div>
        );
    }
}

export default AreaChartWithNegative;