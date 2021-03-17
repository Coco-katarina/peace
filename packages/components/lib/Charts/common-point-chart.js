import React, { Component } from 'react';
import G2 from '@antv/g2';
import './theme';
import { Button } from 'antd';
import FileSaver from 'file-saver';

let chartDownload = "";
let chart;
class CommonPointChart extends Component {
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { data, height, scaleConfig } = nextProps;

        chart.destroy()
        this.renderChart(data, height, scaleConfig);
    }
    componentDidMount() {
        const { data, height, scaleConfig } = this.props;
        this.renderChart(data, height, scaleConfig);
    }
    renderChart = (data, height, scaleConfig) => {
        chart = new G2.Chart({
            id: 'point',
            forceFit: true,
            height: height,
            padding: [50, 60, 70, 60]
        });
        chart.source(data, scaleConfig);
        chart.axis('xAxis', {
            title: {},
            label: {
                textStyle: {
                    //fill: '#C0C0C0', // 文本的颜色
                }
            }
        });
        chart.axis('yAxis', {
            title: {},
            label: {
                textStyle: {
                    //fill: '#C0C0C0', // 文本的颜色
                }
            }
        });
        chart.legend(false);
        chart.point().position('xAxis*yAxis').size(4).shape('circle').opacity(0.65);
        chart.render();
        chart.changeData(data);
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
                    <div style={{ width: '100%', height: '300px' }} id="point"></div>
                </div>
            </div>
        );
    }
}

export default CommonPointChart;