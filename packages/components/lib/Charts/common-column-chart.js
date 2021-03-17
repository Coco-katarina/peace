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
 *          `x`: 根据configs.xAxis,
 *          `y`: 根据configs.yAxis
 *      }],// 数组或封装后的frame
 *      height: 图表高度,
 *      configs: {
 *          xAxis: 'x', 横轴键
 *          yAxis: 'y'  纵轴键
 *      }
 */
let chartDownload = "";
class CommonColumnChart extends Component {
    constructor(props) {
        super(props);

        const Chart = createG2((chart, configs) => {
            let config = configs || {};
            let yaxis = config.yAxis || 'y';
            chart.source(props.data, {
                'probability': {
                    formatter: val => {
                        return val + '%';
                    }
                }
            });
            chart.axis(config.xAxis || 'x', {
                title: null,
                line: {
                    //stroke: '#C0C0C0',
                },
                label: {
                    textStyle: {
                        //fill: '#C0C0C0', // 文本的颜色
                    }
                }
            });
            chart.axis(config.yAxis || 'y', {
                title: null,
                line: {
                    //stroke: '#C0C0C0',
                },
                label: {
                    textStyle: {
                        //fill: '#C0C0C0', // 文本的颜色
                    }
                }
            });
            chart.legend(false);
            //chart.interval().position(`${config.xAxis || 'x'}*${config.yAxis || 'y'}`).color('name')

            let geom = chart.interval().position(`${config.xAxis || 'x'}*${config.yAxis || 'y'}`).size(15);

            this.props.colors ? geom.color('name', this.props.colors) : geom.color('name');
            chart.render();
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

        let margin = [20, 50, 80, 50];
        return (
            <div style={{ position: 'relative', paddingTop: 20, marginBottom: 24 }}>
                {/* <div style={{ textAlign:'left', color:'#929EB3' }} >{data[0].name}</div> */}
                <div style={{ textAlign: 'left' }} >{data[0].name}</div>
                <div style={{ position: 'absolute', right: '10px', top: '20px', zIndex: 2 }} >
                    <Button onClick={this.download} size="default">导出</Button>
                </div>
                <div>
                    <this.Chart data={data} width={width} height={height || 450}
                        plotCfg={{ margin: margin }} forceFit={true} ref="myChart" configs={configs} />
                </div>
            </div>
        );
    }
}

export default CommonColumnChart;