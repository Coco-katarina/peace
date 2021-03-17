import React, { Component } from 'react';
import createG2 from 'g2-react';
import G2, { Plugin } from 'g2';
import './theme';
import { Button } from 'antd';
import FileSaver from 'file-saver';
/**
 * props:
 * 
 *      data: [{
 *          count: 超载数量column,
 *          percent: y2轴超载百分比line,
 *          time: x轴时间值
 *      }],
 *      height: 图表高度
 */

let chartDownload = "";
class DoubleAxisLineColumnChart extends Component {
    constructor(props) {
        super(props);
        const Chart = createG2((chart) => {
            chart.source(props.data, {
                'time': {
                    type: 'cat',
                    alias: '时间'
                },
                'percent': {
                    alias: '超载百分比'
                },
                'count': {
                    alias: '超载数量'
                }
            });

            chart.axis('percent', {
                position: 'right'
            });
            chart.legend({
                title: null,
                position: 'right', // 设置图例的显示位置
                dx: 30, // 整个图例的水平偏移距离
            });
            chart.interval().position('time*count').color('#ff7f0e').size(10); // 绘制层叠柱状图
            chart.line().position('time*percent').color('#1f77b4').shape('line').size(2);
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
        const { data, width, height } = this.props;
        return (
            <div style={{ position: 'relative', paddingTop: 20, marginBottom: 24 }}>
                <div style={{ position: 'absolute', right: '20px', top: '20px', zIndex: 2000 }} >
                    <Button onClick={this.download} size="default">导出</Button>
                </div>
                <div>
                    <this.Chart data={data} width={width} height={height || 300}
                        plotCfg={{ margin: [30, 150, 30, 65] }} forceFit={true} ref="myChart" />
                </div >
            </div >
        )
    }
}

export default DoubleAxisLineColumnChart;