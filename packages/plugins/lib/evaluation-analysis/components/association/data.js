import React, { Component } from 'react';
import { Empty } from 'antd';
import moment from 'moment';
import { Charts } from '@peace/components';
import { StatisticCard } from '@ant-design/pro-card';

const { TimeValueMultiAxisChart } = Charts;
const windFactorProto = '1001';
const thFactorProto = '1002';
const rainfallFactorProto = '1003';

class Data extends Component {
    
    getFactorProto = (factorId) => {
        let factorProto = this.props.factors.filter(f => f.id == factorId)[0].proto;
        return factorProto;
    }
    getFactorName = (factorId) => {
        let factorName = this.props.factors.filter(f => f.id == factorId)[0].name;
        return factorName;
    }
    getData = (correlationData, factorProto, yAxisArr, items, yAxis, index) => {
        const key = (factorProto + '-' + index).toString();
        let dataSource = correlationData[key].stations.reduce((p, s) => {
            s.data.forEach(d => {
                if (factorProto == windFactorProto || factorProto == thFactorProto) {
                    yAxisArr.forEach(y => {
                        if (d[y] != null) {
                            let dy = {
                                [y]: d[y],
                                time: moment(d.time).format('YYYY-MM-DD HH:mm:ss')
                            }
                            p.push(Object.assign({}, dy, { name: `${s.name}- ${items[y].name} ` }));
                        }
                    })
                } else {
                    yAxisArr.forEach(y => {
                        if (d[y] != null) {
                            let dy = {
                                [yAxis]: d[y],
                                time: moment(d.time).format('YYYY-MM-DD HH:mm:ss')
                            }
                            p.push(Object.assign({}, dy, { name: `${s.name}- ${items[y].name} ` }));
                        }
                    })
                }
            });
            return p
        }, []);
       
        return dataSource;
        
    }
    getSlidetStartEnd = (correlationData, factorProto, start, end, index) => {
        const key = (factorProto + '-' + index).toString();
        let dataSource = correlationData[key].stations.reduce((p, s) => {
            let len = s.data.length;
            if (len > 0) {
                if (start == 0) {
                    start = s.data[0].time;
                    end = s.data[len - 1].time;
                } else {
                    start = moment(s.data[0].time) > moment(start) ? start : s.data[0].time;
                    end = moment(s.data[len - 1].time) > moment(end) ? s.data[len - 1].time : end;
                }
            }
        }, []);
        return { start: start, end: end }
    }
    renderChart = () => {
        const { correlationData, factors, factorId, correlationFactorId, flag } = this.props;
        if (!factorId || !correlationFactorId || !flag) {
            return <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
        let isRainfall = false;
        let isThreeAxisleft = false;
        let isThreeAxisRight = false;
        let factorProto = this.getFactorProto(factorId);
        let correlationFactorProto = this.getFactorProto(correlationFactorId);
        let factorProtos = [factorProto, correlationFactorProto];
        if (factorProtos.indexOf(rainfallFactorProto) > -1) {
            isRainfall = true;
        }
        if (JSON.stringify(correlationData) == "{}") {
            return <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
        let scaleConfig = {
            'time': {
                range: [0, 1],
                type: 'time',
                alias: '时间',
                mask: "YYYY-MM-DD HH:mm:ss"
            }

        };
        let yAxisLeftArr = [];
        let yAxisRightArr = [];
        let data = [];
        let axis = [];
        let slidetStartEnd = { start: 0, end: 0 };
        if (correlationData[factorProto + '-0'] && correlationData[correlationFactorProto + '-1']) {
            let items = correlationData[factorProto + '-0'].items;
            let factorName = this.getFactorName(factorId);

            let correlationItems = correlationData[correlationFactorProto + '-1'].items;
            let correlationFactorName = this.getFactorName(correlationFactorId);

            Object.keys(items).forEach(key => {
                yAxisLeftArr.push(key);
                if (factorProto == windFactorProto || factorProto == thFactorProto) {
                    scaleConfig[key] = { alias: `${items[key].name} (${items[key].unit})` };
                    axis.push({ [key]: items[key].name });
                    isThreeAxisleft = true;
                } else {
                    scaleConfig['yAxis1'] = { alias: `${factorName} (${items[key].unit})` }
                    if (axis.length == 0)
                        axis.push({ 'yAxis1': factorName })
                }
            });
            slidetStartEnd = this.getSlidetStartEnd(correlationData, factorProto, 0, 0, '0');
            data = data.concat(this.getData(correlationData, factorProto, yAxisLeftArr, items, 'yAxis1', '0'))
            let keys = 0;
            Object.keys(correlationItems).forEach(key => {
                yAxisRightArr.push(key);
                if (correlationFactorProto == windFactorProto || correlationFactorProto == thFactorProto) {
                    scaleConfig[key] = { alias: `${correlationItems[key].name} (${correlationItems[key].unit})` };
                    axis.push({ [key]: correlationItems[key].name });
                    isThreeAxisRight = true;
                }
                else {
                    scaleConfig['yAxis2'] = { alias: `${correlationFactorName} (${correlationItems[key].unit})` };
                    if (keys == 0)
                        axis.push({ 'yAxis2': correlationFactorName });
                    keys++;
                }
            });
            slidetStartEnd = this.getSlidetStartEnd(correlationData, correlationFactorProto, slidetStartEnd.start, slidetStartEnd.end, '1');
            data = data.concat(this.getData(correlationData, correlationFactorProto, yAxisRightArr, correlationItems, 'yAxis2', '1'))
            
            
            
        }
       
        if (data.length > 0)
            return <TimeValueMultiAxisChart 
                    data={data} 
                    height={350} 
                    scaleConfig={scaleConfig}
                    axis={axis}
                    configs={
                    {
                        isRainfall: isRainfall,
                        isThreeAxisleft: isThreeAxisleft,
                        isThreeAxisRight: isThreeAxisRight,
                        yAxisLeftArr: yAxisLeftArr,
                        yAxisRightArr: yAxisRightArr,
                        slider: {
                            start: 0,
                            end: 100
                        }
                    }
                }
            />
        else
            return <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }

    render() {

        return (
            <StatisticCard
                title="数据关联对比"
                style={{ marginBottom: 5 }}
                extra={''}
                chart={this.renderChart()}
            />

        )
    }
}

export default Data;