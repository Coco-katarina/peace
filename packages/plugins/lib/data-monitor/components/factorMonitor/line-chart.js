import React, { Component } from 'react';
import * as echarts from 'echarts';

class MultiaxialLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartHeight: null,
            chartWidth: null,
        };
    }
    componentDidMount() {
        const { height, xAxisData, seriesData, DOMID, unit } = this.props;
        this.setState({ chartHeight: height }, () => {
            this.createCharts(xAxisData, seriesData, DOMID, unit);
        })
    }

    componentWillReceiveProps(nextProps) {
        let { height, xAxisData, seriesData, DOMID, unit, width } = nextProps;
        if (JSON.stringify(xAxisData) != JSON.stringify(this.props.xAxisData) || JSON.stringify(seriesData) != JSON.stringify(this.props.seriesData) || DOMID != this.props.DOMID || unit != this.props.unit || height != this.props.height || width != this.props.width) {
            this.setState({ chartHeight: height, chartWidth: width }, () => {
                this.createCharts(xAxisData, seriesData, DOMID, unit);
            })
        }
    }


    // shouldComponentUpdate(nextProps, nextState) {
    //     if (JSON.stringify(nextProps.seriesData) != JSON.stringify(this.props.seriesData)) {
    //         return true;
    //     }
    //     return false;
    // }
    createCharts = (xAxisData, seriesData, DOMID, unit) => {
        this.clearEchart();
        let chartDom = document.getElementById(DOMID);
        this.chart = echarts.init(chartDom);

        let option = this.getOption(xAxisData, seriesData, DOMID, unit);
        this.chart.setOption(option);
    };

    clearEchart = () => {
        if (this.chart) {
            this.chart.dispose();
        }
    };

    getOption = (xAxisData, seriesData, DOMID, unit) => {
        let series = [];
        let legendData = [];
        seriesData.map(s => {
            legendData.push(s.name)
            series.push({
                name: s.name,
                type: 'line',
                // lineStyle: {
                //     color: s.color || null
                // },
                smooth: this.props.smooth,
                stack: s.name,
                symbol: 'none',
                // areaStyle: {
                //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //         offset: 0,
                //         color: s.color || 'rgba(106, 219, 221, 0.99)'
                //     }, {
                //         offset: 1,
                //         color: s.color0 || 'rgba(106, 219, 221, 0)'
                //     }])
                // },
                data: s.data
            })
        })
        const grids = this.props.grids || ['3%', '3%', '3%', '3%']
        let option = {
            title: {
                left: 'left',
                text: this.props.title || '',
                padding: [5, 0, 0, 55],
                textStyle: {
                    color: 'rgba(0, 0, 0, 0.45)',
                    fontSize: 16,
                    fontWeight: 400
                }
            },

            color: this.props.colors || ['#2F53EA', 'rgba(0,221,150)', 'rgba(44,228,255)'],//蓝 绿 青
            tooltip: unit ? {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (params) {
                    let result = '';
                    params.forEach(function (item) {
                        if (!result.length)
                            result += `<span>${item.axisValue}</span>`;
                        if (item.marker && item.seriesName && series)
                            result += `</br> <span>${item.seriesName}: ${item.data} ${unit ? unit : ''}</span>`;
                    })
                    return result;
                }
            } :
                {
                    trigger: 'axis'
                },
            toolbox: {
                feature: {
                    saveAsImage: { title: '下载' }
                },
                right: '0%',
                top: -10
            },
            legend: {
                x: 'right',
                y: 'top',
                show: true,
                padding: [2, 40, 0, 0],
                textStyle: {
                    color: 'rgba(0, 0, 0, 0.45)',
                    // fontFamily: 'liquidCrystal'
                }
            },
            grid: {
                top: grids[0],
                right: grids[1],
                bottom: grids[2],
                left: grids[3],
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxisData,
                axisLabel: {
                    color: 'rgba(0, 0, 0, 0.45)',
                    // fontFamily: 'liquidCrystal' 
                },//x轴文字颜色
            },
            yAxis: {
                type: this.props.type || 'value',
                data: this.props.type == 'category' ? ['I', 'II', 'III', 'IV', 'V', '劣V'] : [],
                max: this.props.max || null,
                splitLine: {
                    show: true//关闭y轴内部数值分割线
                },
                axisLabel: {
                    formatter: function (v) {
                        return unit ? (v + unit) : v;
                    },
                    color: 'rgba(0, 0, 0, 0.45)',//y轴文字颜色
                    // fontFamily: 'liquidCrystal'
                },
            },
            series: series
        };
        return option;
    };

    render() {
        const { chartHeight, chartWidth } = this.state;
        return <div id={this.props.DOMID} style={{ height: chartHeight, width: chartWidth ? chartWidth : this.props.width }} />;
    }
}

export default MultiaxialLine;