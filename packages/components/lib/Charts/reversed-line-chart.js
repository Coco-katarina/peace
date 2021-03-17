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
 *          time: 图例名称,
 *          yAxis: y轴深度值,
 *          xAxis: x轴位移值
 *      }]
 */

let chartDownload = "";
class ReversedLineChart extends Component {
    constructor(props) {
        super(props);
        const Chart = createG2((chart) => {
            chart.source(props.data, {
                'xAxis': {
                    alias: "位移(mm)"
                },
                'yAxis': {
                    alias: "深度(m)"
                }
            });
            chart.axis('yAxis', {
                grid: {//网格线
                    line: {
                        stroke: '#d9d9d9',
                        lineWidth: 1,
                        lineDash: [4, 4]
                    }
                }
            });
            chart.legend({
                title: null,
                position: 'left', // 设置图例的显示位置
                // dx: -110, // 整个图例的水平偏移距离
                dy: -10, // 整个图例的垂直偏移距离
            });
            chart.coord().transpose();//反转
            chart.line().position('yAxis*xAxis').color('date').shape('smooth').size(2);
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
        const { data, width, height, forceFit } = this.props;
        return (
            <div style={{ position: 'relative', paddingTop: 20, marginBottom: 24 }}>
                <div style={{ position: 'absolute', right: '20px', top: '20px', zIndex: 2000 }} >
                    <Button onClick={this.download} size="default">导出</Button>
                </div>
                <div>
                    <this.Chart data={data} width={width} height={height || 600}
                        plotCfg={{ margin: [35, 30, 68, 52] }} forceFit={forceFit} ref="myChart" />
                </div>
            </div>
        );
    }
}
export default ReversedLineChart;