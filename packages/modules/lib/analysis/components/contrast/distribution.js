import React, { } from 'react'
import { Card, Row, Col } from 'antd';
import { BarChartOutlined, FrownOutlined } from '@ant-design/icons';
import { Chart } from '@peace/components';

const { CommonColumnChart } = Chart;

const Distribution = (props) => {
    const { stationsData, itemsName, structId } = props;

    const data = stationsData.items.stationsData ? stationsData.items.stationsData : [];
    const items = stationsData.items ? stationsData.items : -1;
    let codeItemsName = '';
    let chartData = [];
    if (structId == items.structId && data.length >= 1) {
        for (let i = 0; i < data.length; i++) {//若data.length == 1 则为单时间段  分布图标题标注测点名称  反之标时间~
            let item = data[i].items;
            let stationsZero = data[i].stations;

            for (let key in item) {
                if (item[key].name == itemsName) {
                    codeItemsName = key;
                    break;
                }
            }
            if (codeItemsName == '') {
            } else {
                for (let j = 0; j < stationsZero.length; j++) {
                    if (stationsZero[j].data.length == 0) {
                        continue;
                    }
                    let chartDataZero = [];
                    let minData = stationsZero[j].data[0][codeItemsName];
                    let maxData = stationsZero[j].data[0][codeItemsName];
                    for (let k = 0; k < stationsZero[j].data.length; k++) {
                        if (minData > stationsZero[j].data[k][codeItemsName]) { //查找最大值
                            minData = stationsZero[j].data[k][codeItemsName];
                        } else if (maxData < stationsZero[j].data[k][codeItemsName]) {//查找最小值
                            maxData = stationsZero[j].data[k][codeItemsName];
                        }
                    }
                    if (minData == maxData) {//最大最小相等的特殊情况
                        if (data.length == 1) {//单时间段写测点~
                            chartDataZero.push({ name: stationsZero[j].name, probability: 100, range: `${minData.toFixed(2)}~${maxData.toFixed(2)}` });
                        } else {
                            chartDataZero.push({ name: `${data[i].timeArea[0]} 至 ${data[i].timeArea[1]}`, probability: 100, range: `${minData.toFixed(2)}~${maxData.toFixed(2)}` });
                        }
                    } else {
                        let df = (maxData - minData) / 10;
                        let midMinData = minData;
                        let midMaxData = minData;
                        for (let k = 0; k < 10; k++) {
                            midMaxData = midMinData + df;//当前循环区间上限
                            let frequency = 0;//频率
                            if (k != 9) {
                                frequency = ((stationsZero[j].data.filter(s => s[codeItemsName] >= midMinData && s[codeItemsName] < midMaxData).length / stationsZero[j].data.length) * 100).toFixed(3);
                            } else {
                                frequency = ((stationsZero[j].data.filter(s => s[codeItemsName] >= midMinData && s[codeItemsName] < midMaxData + .01).length / stationsZero[j].data.length) * 100).toFixed(3);
                            }

                            if (data.length == 1) {//单时间段写测点~
                                chartDataZero.push({ name: stationsZero[j].name, probability: parseFloat(frequency), range: `${midMinData.toFixed(2)}~${midMaxData.toFixed(2)}` });
                            } else {
                                chartDataZero.push({ name: `${data[i].timeArea[0]} 至 ${data[i].timeArea[1]}`, probability: parseFloat(frequency), range: `${midMinData.toFixed(2)}~${midMaxData.toFixed(2)}` });
                            }
                            midMinData = midMaxData;//下次循环区间下限
                        }
                    }
                    chartData.push({ data: chartDataZero, timeArea: data[i].timeArea });
                }
            }
        }
    }

    return (
        <Card title={<div><BarChartOutlined /><span style={{ marginLeft: 6 }}>数据分布</span></div>}>
            <div style={{ marginBottom: 15 }}>
                <Row>
                    {
                        chartData.length > 0 ?
                            chartData.map((s, index) => <Col key={`col-${index}`} span={24}>
                                <CommonColumnChart
                                    data={s.data}
                                    height={200}
                                    colors={['#49A9EE']}
                                    configs={{ xAxis: 'range', yAxis: 'probability' }} />
                            </Col>)
                            : <span><FrownOutlined /> 暂无数据</span>
                    }
                </Row>
            </div>
        </Card>
    )
}

export default Distribution;