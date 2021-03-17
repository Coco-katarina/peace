import React from 'react';
import { Card } from 'antd';
import { LineChartOutlined, FrownOutlined } from '@ant-design/icons';
import { Chart } from '@peace/components';

const { TimeValueLineChart } = Chart;

const Data = (props) => {
    const { stationsData, structId, itemsName } = props;

    const data = stationsData && stationsData.items && stationsData.items.stationsData ? stationsData.items.stationsData : [];
    const items = stationsData && stationsData.items ? stationsData.items : -1;
    let codeItemsName = '';
    let chartData = [];
    let unit = '';

    if (structId == items.structId && data.length >= 1 && itemsName) {
        let chartDataZero = []
        let timeArea = [];
        let timeArea1, timeArea2;
        let xAxis;
        if (data.length == 1) {
            xAxis = 'time';
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].stations.length; j++) {
                    for (let k = 0; k < data[i].stations[j].data.length; k++) {
                        if (data[i].stations[j].data[k].time) {
                            timeArea1 = timeArea2 = data[i].stations[j].data[k].time;
                            break;
                        }
                    }
                    if (timeArea1) { break; }
                }
                if (timeArea1) { break; }
            }
        } else {
            xAxis = 'days';
            timeArea1 = timeArea2 = '0';
        }
        for (let i = 0; i < data.length; i++) {
            let item = data[i].items;
            let stationsZero = data[i].stations;
            for (let key in item) {
                if (item[key].name == itemsName) {
                    codeItemsName = key;
                    unit = item[key].unit;
                    break;
                }
            }
            if (codeItemsName == '') {
            } else {
                for (let j = 0; j < stationsZero.length; j++) {
                    let timeZero;
                    if (data.length > 1 && stationsZero[j].data.length > 0) {
                        timeZero = new Date(stationsZero[j].data[0].time.replace(new RegExp("-", "gm"), "/")).getTime() / (1000 * 60 * 60 * 24);
                    }
                    for (let k = 0; k < stationsZero[j].data.length; k++) {
                        if (data.length == 1) {
                            if (timeArea1 > stationsZero[j].data[k].time) {
                                timeArea1 = stationsZero[j].data[k].time;
                            } else if (timeArea2 < stationsZero[j].data[k].time) {
                                timeArea2 = stationsZero[j].data[k].time;
                            }
                            chartDataZero.push({ value: stationsZero[j].data[k][codeItemsName], name: stationsZero[j].name, time: stationsZero[j].data[k].time });
                        } else {
                            let timeCurrent = new Date(stationsZero[j].data[k].time.replace(new RegExp("-", "gm"), "/")).getTime() / (1000 * 60 * 60 * 24);
                            let days = timeCurrent - timeZero;
                            if (days > timeArea2) {
                                timeArea2 = days;
                            }
                            chartDataZero.push({ value: stationsZero[j].data[k][codeItemsName], name: data[i].timeArea[0] + '至' + data[i].timeArea[1], days: days, time: stationsZero[j].data[k].time });
                        }
                    }
                }
            }
        }
        timeArea.push(timeArea1);
        timeArea.push(timeArea2);
        chartData.push({ data: chartDataZero, timeArea: timeArea, xAxis: xAxis });
    }
    let chartData_ = chartData.filter(s => s.data.length > 0);

    return (
        <Card
            key={"data-card"}
            title={<div><LineChartOutlined /><span style={{ marginLeft: 6 }}>数据对比</span></div>}>
            <div style={{ marginBottom: 15 }}>
                <div className="data-chart-container">
                    {
                        chartData[0] ?
                            (chartData_.length > 0 ?
                                chartData_.map((s, index) => <TimeValueLineChart
                                    key={index}
                                    data={s.data}
                                    height={300}
                                    xAxis={s.xAxis}
                                    configs={{
                                        slider: { start: s.timeArea[0], end: s.timeArea[1] },
                                        unit: unit
                                    }} />)
                                : <span><FrownOutlined /> 没有查询到数据</span>)
                            : <span><FrownOutlined /> 暂无数据</span>
                    }
                </div>
            </div>
        </Card>
    )
}

export default Data;