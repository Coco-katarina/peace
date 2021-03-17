import React, { Component } from 'react';
import G2 from '@antv/g2';
import './theme';
import { Button } from 'antd';
import FileSaver from 'file-saver';

let chartDownload = "";
let chart;
class ColumnChart extends Component {
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { data, height, scaleConfig, configs, conditionData } = nextProps;

        chart.destroy()
        this.renderChart(data, height, scaleConfig, configs, conditionData);
    }
    componentDidMount() {
        const { data, height, scaleConfig, configs, conditionData } = this.props;
        this.renderChart(data, height, scaleConfig, configs, conditionData);
    }
    renderChart = (data, height, scaleConfig, configs, conditionData) => {
        chart = new G2.Chart({
            id: 'column',
            forceFit: true,
            height: height,
            padding: [50, 60, 70, 60]
        });
        chart.source(data, scaleConfig);
        chart.axis(configs.xAxis, {
            title: {},
            label: {
                textStyle: {
                    //fill: '#C0C0C0', // 文本的颜色
                }
            }
        });
        chart.axis(configs.yAxis, {
            title: {},
            label: {
                textStyle: {
                    //fill: '#C0C0C0', // 文本的颜色
                },
                formatter(text, item, index) {
                    return `${text}%`;
                }
            }
        });

        chart.legend(false);
        chart.interval().position(`${configs.xAxis}*${configs.yAxis}`);
        chart.render();
        chart.on('tooltip:change', function (ev) {
            const items = ev.items;
            for (let i = 0; i < items.length; i++) {
                let item = ev.items[i];
                let lowUp = conditionData.filter(c => parseFloat(c.category).toFixed(2).toString() == item.title);
                if (lowUp.length > 0) {
                    let title = `${configs.name}：${lowUp[0].low.toFixed(2)}${configs.unit}-${lowUp[0].up.toFixed(2)}${configs.unit}`
                    item.name = '占比';
                    item.title = title;
                    item.value = `${parseFloat(item.value).toFixed(2)}%`;

                } else {
                    item.name = '占比';
                    item.value = `${parseFloat(item.value).toFixed(2)}%`;
                }
            }

        });
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
                    <div style={{ width: '100%', height: '300px' }} id="column"></div>
                </div>
            </div>
        );
    }
}

export default ColumnChart;