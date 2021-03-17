
'use strict';
import React, { Component } from 'react';
import createG2 from 'g2-react';
import { Button } from 'antd';
import FileSaver from 'file-saver';
let chartDownload = "";
class WindRoseChart extends Component {
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
        const WindRose = createG2(chart => {
            chart.source(data);
            chart.coord('polar');
            chart.axis('value', {
                grid: {
                    line: {
                        lineDash: [0, 0]
                    }
                }// 设置坐标系栅格样式
            });
            // chart.legend({
            //     title: null,
            //     position: 'right', // 设置图例的显示位置
            //     itemWrap: false,
            //     // dx: -55,// 整个图例的水平偏移距离
            // });
            chart.legend(false);
            const colors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354'];
            chart.intervalStack().position('direction*value').color('level', colors).size(35);
            chart.render();
            this.chartDownload = chart;
        })

        return (
            <div style={{ position: 'relative', paddingTop: 20, marginBottom: 24 }}>
                <div style={{ position: 'absolute', right: '20px', top: '20px', zIndex: 2000 }} >
                    <Button onClick={this.download} size="default">导出</Button>
                </div>
                <div>
                    <WindRose
                        plotCfg={{ margin: [30, 160, 30, 0] }}
                        width={width}
                        height={height}
                        forceFit={forceFit} />
                </div>
            </div>
        );
    }
}
export default WindRoseChart;