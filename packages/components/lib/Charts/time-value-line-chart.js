import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import moment from 'moment';
import {
    tooltip, toolbox, legend, xAxis, splitLine, axisLine, axisTick, axisLabel, yAxis, DEFAULT_COLOR, color, dataZoom
} from './constants';
const TextStyleColor = 'gray';
import { Button, Select } from 'antd';
import PeriodThreshold from './period-threshold';
const Option = Select.Option;
/**
 * props:
 * 
 *      data: [{
 *          name: 图例名称,
 *          value: y轴数值,
 *          time: x轴时间值
 *      }], // 数组或封装后的frame
 *      height: 图表高度,
 *      configs: {
 *          slider: {
 *              start: 初始开始点,
 *              end: 初始结束点
 *          }
 *      },
 *      yAxis: 修改默认y轴值对应的键
 */
class TimeValueLineChart extends Component {
    constructor(props) {
        super(props);
        this.changeUnits = [{ units: ['mm', 'm'], ratio: [1, 1000] }, { units: ['kPa', 'MPa'], ratio: [1, 1000] }];
        this.series = null;
        this.seriesGraph = [];
        this.legendData = [];
        this.echartInstance = null;
        this.isThresholdLoaded = false;
        this.isOriginThresholdLoaded = false;
        this.xAxisStart = null
        this.state = {
            ratio: null,
            option: null,
            changedUnit: null,
            thresholds: null,
            stationName: '',
            thresholdStations: {},
            thresholdDisplay: false
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { data, threshold } = nextProps;
        const { changedUnit, ratio, thresholdDisplay } = this.state;
        if (JSON.stringify(data) != JSON.stringify(this.props.data)) {
            this.series = this.setData(nextProps, changedUnit, ratio);
            this.setState({ option: this.getOption() })
        }
        if (!this.isOriginThresholdLoaded && thresholdDisplay) {
            this.setThresholdData(nextProps);
        }
    }


    setData = (props, changedUnit = null, ratio = null) => {
        let xAxisValue = props.xAxis || 'time';
        let yAxisValue = props.yAxis || 'value';
        let types = {
        };
        let data = JSON.parse(JSON.stringify(props.data));
        data.map(ii => {
            if (!types[ii.name]) {
                types[ii.name] = Object.assign({
                    name: ii.name, data: []
                }, {
                    type: 'line',
                    smooth: false,
                    showSymbol: false,
                });
            }
            if (changedUnit && ratio) {
                let dBitArr = ii[yAxisValue].toString().split(".")
                let bitNums = dBitArr[1] ? dBitArr[1].length : 0;
                ii[yAxisValue] = parseFloat((ii[yAxisValue] * ratio).toFixed(bitNums));
            }
            this.legendData.push(ii.name);
            types[ii.name].data.push({
                name: ii.time,
                value: [ii[xAxisValue], ii[yAxisValue]],
            });

            if (ii.time && !this.xAxisStart) {
                this.xAxisStart = ii.time;
            }
        });
        let series = [];
        for (let t in types) {
            series.push(types[t]);
        }
        return series;
    }

    setThresholdData = (props) => {

        this.isOriginThresholdLoaded = true;
        const { threshold, stations, itemName } = props;
        let data = [], seriesItem = {};
        if (stations) {
            stations.map(sId => {
                const thd = threshold[sId] && threshold[sId][itemName] ? threshold[sId][itemName] : null;
                if (thd && thd.length) {
                    thd.map(ts => {
                        const strThreshold = ts.value, level = ts.level;
                        let thList = strThreshold.split(';');
                        thList.map(th => {
                            let numList = th.split(',');
                            const min = numList[0].replace("(", "");
                            const max = numList[1].replace(")", "");
                            let dataItem = [], yStart = 0, min_ = min, max_ = max;

                            if (max == '+') {
                                max_ = Number(min) + 2
                            } else if (min == '-') {
                                min_ = Number(max) - 2;
                            }
                            yStart = (Number(max_) + Number(min_)) / 2;
                            dataItem = [this.xAxisStart, yStart];
                            data.push(dataItem);
                        })
                    })
                }
            })
            seriesItem = {
                type: 'custom',
                clip: true,
                data: data,
            }
            this.series.push(seriesItem);
        }
    }

    initEchartRef(e) {
        if (!e) return;
        const echartInstance = e.getEchartsInstance();
        if (echartInstance) {
            this.echartInstance = echartInstance;
            this.timer ? clearTimeout(this.timer) : null;
            const isDefault = true;
            this.timer = setTimeout(() => {
                this.refreshThresholdInfo(echartInstance, isDefault);
            }, 1000);
        }
    }

    refreshThresholdInfo = (echartInstance, isDefault, selectedStationId) => {
        if (echartInstance && !this.isThresholdLoaded) {
            const echartInstance = this.echartInstance;
            const xaxis = echartInstance.getModel().getComponent('xAxis').axis;
            const yaxis = echartInstance.getModel().getComponent('yAxis').axis;
            if (xaxis && xaxis.scale._extent) {
                //console.log(yaxis)
                let xAxis = xaxis.scale._extent;
                let yAxis = yaxis.scale._extent;
                const thresholdConfig = this.getThreshold(isDefault, selectedStationId);
                this.isThresholdLoaded = true;
                this.drawThresholdLine(thresholdConfig, xAxis, yAxis);
            }
        }
    }

    getThreshold = (isDefault = true, selectedStationId = null) => {
        let thresholdConfig = null, stationName = null, sensorId = null;
        const { threshold, stations, itemName } = this.props;
        if (threshold && stations) {
            const sortStation = stations.sort((a, b) => a - b);
            if (!isDefault) {
                sensorId = selectedStationId;
            } else {
                sensorId = sortStation[0];
            }
            thresholdConfig = threshold[sensorId] && threshold[sensorId][itemName] ? threshold[sensorId][itemName] : null
            stationName = threshold[sensorId] ? threshold[sensorId].info.name : ''
        }
        this.setState({ thresholds: thresholdConfig ? thresholdConfig : null, stationName })
        return thresholdConfig;
    }

    getThresholdColor = (level) => {
        switch (level) {
            case 1:
                return 'rgb(255,229,230)';
            case 2:
                return 'rgb(255,246,230)';
            case 3:
                return 'rgb(229,230,249)';
        }
    }

    drawThresholdLine = (thresholdConfig, xAxis, yAxis) => {
        let threshold = thresholdConfig && thresholdConfig.length ? thresholdConfig : [],
            option_ = this.state.option, isRecover = false;
        this.seriesGraph = [];
        if (threshold && threshold.length) {
            if(this.state.thresholdDisplay){
                threshold.map(ts => {
                    const strThreshold = ts.value, level = ts.level;
                    let thList = strThreshold.split(';');
                    thList.map(th => {
                        let numList = th.split(',');
                        let min = numList[0].replace("(", "");
                        let max = numList[1].replace(")", "");
                        const props = { xAxis, yAxis, level, min, max };
                        this.drawCustomizeGraph(props);
                    })
                })
            }
        } else {
            isRecover = true;
        }
       
        option_.series = this.series.concat(this.seriesGraph);
        
        
        this.echartInstance.setOption(option_, isRecover);
    }

    drawCustomizeGraph = (props) => {
        const { xAxis, yAxis, level, min, max } = props;
        let data = [], yStart = 0, yHeight = 0, min_ = min, max_ = max, xWidth = xAxis[1] - xAxis[0]; // [yStart, xStart, xEnd, yHeight]
        if (min == '-' || (min.indexOf('-') > -1 && min < yAxis[0])) {
            min_ = yAxis[0];
        }
        if (max == '+' || (max > 0 && max > yAxis[1])) {
            max_ = yAxis[1];
        }
        if ((max <= 0 && max <= yAxis[0]) || (min >= 0 && min >= yAxis[1])) {
            return;
        }
        yStart = (Number(max_) + Number(min_)) / 2;
        yHeight = Number(max_) - Number(min_)
        let dataItem = []
        if (props.xAxis == 'time') {
            dataItem = [moment(xAxis[0]).format('YYYY-MM-DD HH:mm:ss'), yStart];
        } else {
            dataItem = [xAxis[0], yStart];
        }
        data.push(dataItem);

        let thresholdColor = this.getThresholdColor(level);
        const props_ = { thresholdColor, yHeight, xWidth }
        let seriesItem = {
            type: 'custom',
            name: `threshold-${level}`,
            renderItem: (params, api) => this.renderItem(params, api, props_),
            clip: true,
            data: data,
            encode: {
                // 这样这个系列就不会被 x 轴以及 x
                // 轴上的 dataZoom 控制了。
                x: -1,
                y: 1
            }
        }
        

        this.seriesGraph.push(seriesItem);
    }

    renderItem = (params, api, props) => {
        const { thresholdColor, yHeight, xWidth } = props;
        var categoryIndex = api.value(1);
        var start = api.coord([api.value(0), categoryIndex]);
        // var end = api.coord([api.value(2), categoryIndex]);
        var height = api.size([0, yHeight])[1] * 1;

        var rectShape = echarts.graphic.clipRectByRect({
            x: 0,
            y: start[1] - height / 2,
            // y: params.seriesIndex,
            width: xWidth,
            height: height
        }, {
            x: params.coordSys.x,
            y: params.coordSys.y,
            width: params.coordSys.width,
            height: params.coordSys.height
        });

        return {
            type: 'rect',
            shape: rectShape,
            style: api.style({ fill: thresholdColor, stroke: thresholdColor })
        };
    }

    UNSAFE_componentWillMount() {
        this.series = this.setData(this.props);
       
        //this.setThresholdData(this.props);
        this.setState({ option: this.getOption() })
    }
    getOption = (name) => {
        const that = this;
        const { configs } = this.props;
        const { changedUnit } = this.state;
        let option = {
            title: {
                text: name,
                //textStyle: { color: '#929EB3', fontWeight: 'normal', fontSize: 13 },
                top: 10, left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    let result = '';
                    if (that.props.xAxis == 'days') {
                        params.forEach(function (item) {
                            if (!result.length)
                                result += item.seriesName;
                            result += "</br>" + item.marker + item.name + '：' + item.data.value[1] + (changedUnit || configs.unit || '');
                        })
                    } else
                        params.forEach(function (item) {
                            if (!result.length)
                                result += item.name;
                            if (item.data.value && item.data.value.length) {
                                result += "</br>" + item.marker + item.seriesName + '：' + item.data.value[1] + (changedUnit || configs.unit || '');
                            }
                        })
                    return result;
                }
            },
            toolbox: {...toolbox, right: 30},
            backgroundColor: DEFAULT_COLOR,
            color: color,
            legend: { ...legend.right, data: this.legendData },
            yAxis: {
                type: 'value',
                scale: true,
                splitLine: splitLine,
                axisLine: axisLine,
                axisTick: axisTick,
                axisLabel: {
                    formatter: function (value, index) {
                        if (configs && configs.unit) {
                            return value + (changedUnit || configs.unit)
                        } else {
                            return value
                        }
                    }
                }

            },
            series: this.series,
            grid: { left: 80, right: 130 }
        }
        if (this.props.xAxis == 'days') {
            option.xAxis = {
                type: 'value',
                splitLine: {
                    show: false
                },
                axisLine: axisLine,
                axisTick: axisTick,
                axisLabel: {
                    formatter: function (value, index) {
                        return value + '天'
                    }
                }
            };
        } else {
            option.xAxis = xAxis.time;
        }
       
        if (configs && configs.slider) { 
            option["dataZoom"] = [{...dataZoom, ...configs.slider },{ ...configs.slider }];
        }
        this.setState({ option })
        return option;
    }
    unitChange(v, unitsData) {
        const { configs } = this.props;
        const { option } = this.state;
        let vIndex = unitsData.units.findIndex(u => u == v);
        let currUnitIndex = unitsData.units.findIndex(u => u == configs.unit);
        let ratio = unitsData.ratio[currUnitIndex] / unitsData.ratio[vIndex];
        this.series = this.setData(this.props, v, ratio);
        this.setState({ changedUnit: v, ratio: ratio }, () => {
            let option_ = this.getOption();;
            option_.series = this.series.concat(this.seriesGraph);
            this.echartInstance.setOption(option_, true);
        });
    }

    onChartClick = (params) => {
        
        const { threshold } = this.props;
        const { thresholdStations, stationName } = this.state;
        const selectStation = params.seriesName;
        if (stationName != selectStation && threshold && Object.keys(threshold).length) {
            const selectStataionId = threshold[selectStation] ? threshold[selectStation].info.id : null;
            this.isThresholdLoaded = false;
            const isDefault = false;
            this.refreshThresholdInfo(this.echartInstance, isDefault, selectStataionId);
        }
    }

    onMouseOver = (params) => {
        if (params.seriesName && params.seriesName.indexOf('threshold') > -1) {
            this.echartInstance.dispatchAction({
                type: 'downplay',
                seriesName: params.seriesName
            })
        }
    }

    handleThresholdDisplayChange = (checked) => {
       
        const { changedUnit, ratio } = this.state;
      
        this.series = this.setData(this.props, changedUnit, ratio);
        
        this.setState({ thresholdDisplay: checked }, () => {
            let option_ = this.getOption();
            if(checked){
                this.setThresholdData(this.props);
                
            }
            this.isThresholdLoaded = false;
            this.timer ? clearTimeout(this.timer) : null;
            const isDefault = true;
            this.timer = setTimeout(() => {
                this.refreshThresholdInfo(echartInstance, isDefault);
            }, 1000);
            
           // this.refreshThresholdInfo(this.echartInstance, true)
            // console.log('%c [ option_ ]', 'font-size:13px; background:pink; color:#bf2c9f;', option_)
            // this.echartInstance.setOption(option_, true);
        });
        
    }

    render() {
        const { data, width, height, configs } = this.props;

        const unit = configs && configs.unit ? configs.unit : null;
        const unitsData = unit ? this.changeUnits.find(cu => cu.units.some(cus => cus == unit)) : null;
        return (
            <div style={{ position: 'relative', paddingTop: 20, marginBottom: 24, backgroundColor: DEFAULT_COLOR }}>
                <div style={{ position: 'absolute', right: '20px', top: '10px', zIndex: 2000 }} >
                    {
                        unitsData ?
                            <span>
                                <span>单位：</span>
                                <Select style={{ width: 70, marginRight: 10 }} defaultValue={unit} onChange={(v) => this.unitChange(v, unitsData)}>
                                    {
                                        unitsData.units.map(us => <Option value={us}>{us}</Option>)
                                    }
                                </Select>
                            </span> : ''
                    }
                </div>
                <PeriodThreshold 
                    direction={'horizontal'} 
                    thresholds={this.state.thresholds} 
                    stationName={this.state.stationName} 
                    onThresholdDisplayChange={this.handleThresholdDisplayChange}
                    thresholdDisplay={this.state.thresholdDisplay}
                />
                <ReactEcharts
                    ref={(e) => this.initEchartRef(e)}
                    onChartReady={this.onChartReady}
                    option={this.state.option}
                    notMerge={true}
                    lazyUpdate={true}
                    onEvents={{ 'click': this.onChartClick, 'mouseover': this.onMouseOver }}
                    style={{ height: height || '500px', margin: '0 auto' }} />

            </div>
        );
    }
}

export default TimeValueLineChart;