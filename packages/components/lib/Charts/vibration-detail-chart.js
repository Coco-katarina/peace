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
class VibrationDetailChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reverting: false
        }
        let frame = new G2.Frame(props.data);
        const Chart = createG2((chart, configs) => {
            chart.source(frame, {
                'time': {
                    'alias': configs.xName
                },
                'value': {
                    'alias': '幅值',
                },
            });
            chart.axis('time', {
                title: null,
            });
            chart.axis('value', {
                title: null,
            });
            chart.tooltip({ title: false });

            chart.legend({
                position: 'bottom',
                title: null,
                itemWrap: true,
            });
            chart.line().position('time*value').color('name').shape('line').size(2);
            chart.setMode('select');
            chart.select('rangeXY');

            chart.render();

            chart.on('tooltipchange', ev => {
                let items = ev.items;
                const itemsLength = items.length;
                for (let i = 0; i < itemsLength; i++) {
                    items.push({
                        name: '测点',
                        title: 'stationName',
                        marker: true,
                        color: items[i].color,
                        value: items[i].name,
                    });
                    items.push({
                        name: configs.xName,
                        title: 'time',
                        marker: true,
                        color: items[i].color,
                        value: `${items[i].title} ${configs.xName == '时间' ? 's' : 'Hz'}`
                    });
                    items.push({
                        name: '幅值',
                        title: '幅值',
                        marker: true,
                        color: items[i].color,
                        value: `${items[i].value} ${configs.unit}`
                    });
                    // items.push({
                    //     name: '触发时段',
                    //     title: '触发时段',
                    //     marker: true,
                    //     color: items[i].color,
                    //     value: `${items[i].point._origin.collectTime}`
                    // });
                }
                items.splice(0, itemsLength);
            })

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

    revert = () => {
        this.setState({ reverting: true }, function () {
            this.setState({ reverting: false });
        })
    }

    render() {
        const { data, height, configs } = this.props;
        let margin = [8, 16, 80, 32];
        let otherprops = {};
        if(this.props.width){
            otherprops.width = width;
        }
        return (
            <div style={{ position: 'relative', paddingTop: 20, marginBottom: 24 }}>
                <div style={{ position: 'absolute', right: '5px', top: '20px', zIndex: 2000 }} >
                    <Button onClick={this.revert}>重置</Button>
                    <Button onClick={this.download} size="default">导出</Button>
                </div>
                <div>
                    {
                        !this.state.reverting ?
                            <this.Chart data={data} {...otherprops} height={height || 300} plotCfg={{ margin: margin }} forceFit={true} ref="myChart_" configs={configs} /> : ''
                    }
                </div>
            </div>
        );
    }
}

export default VibrationDetailChart;