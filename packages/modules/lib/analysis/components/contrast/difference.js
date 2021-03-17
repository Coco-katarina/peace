import React, { useState } from 'react';
import { Card, Menu, Dropdown, Button, Select, Spin } from 'antd';
import { FrownOutlined, AreaChartOutlined } from '@ant-design/icons';
import { Chart } from '@peace/components';

const { AreaChartWithNegative } = Chart;

const Difference = (props) => {
    const { stationsData, itemsName, structId, diffOptionId, diffOptionIdChange } = props;
    let options = [];
    let optionCurrent = '';
    let optionFirstId = 0;

    const chartData = [];

    const dealMsg = (data) => {
        let station = [];
        if (data.length == 1) {//多个传感器同个监测时段
            station = data[0].stations;
            optionFirstId = station[0].id;
            station.forEach(s => {
                options.push({ optionName: s.name, id: s.id });
            })
        } else {
            for (let i = 0; i < data.length; i++) {
                station.push(data[i].stations[0]);
                options.push({ optionName: data[i].timeArea[0] + ' ~ ' + data[i].timeArea[1], id: i });
            }
        }
        let currendId = diffOptionId || optionFirstId

        for (let i = 0; i < options.length; i++) {
            if (options[i].id == currendId) {
                optionCurrent = options[i].optionName;//获取当前对比基准的名字
                break;
            }
        }

        for (let i = 0; i < station.length; i++) {
            for (let j = 0; j < station.length; j++) {
                if (i == j) {
                    continue;
                } else {//以mark补comp
                    let dataMark = station[i].data;
                    let dataComp = station[j].data; //如果comp里没有mark 则把mark插入comp
                    let dataCompOther = [];
                    for (let k = 0; k < dataMark.length; k++) {//循环标记data数组
                        let timeMark = new Date(dataMark[k].time.replace(new RegExp("-", "gm"), "/")).getTime();
                        dataMark[k].times = timeMark;//times 属性记录时间转化后的毫秒数
                        //let keys = Object.keys(dataMark[k]);//获取属性值
                        let keys = [];
                        for (let key in dataMark[k]) {
                            if (dataMark[k].hasOwnProperty(key) && key != 'time' && key != 'times') {
                                keys.push(key);
                            }
                        }
                        for (let m = 0; m < dataComp.length; m++) {//循环比对data数组

                            let timeComp = new Date(dataComp[m].time.replace(new RegExp("-", "gm"), "/")).getTime();
                            dataComp[m].times = timeComp;
                            if (timeMark == timeComp) {//比比对的相等  说明都有这个时间节点 
                                dataCompOther.push(dataComp[m]);
                                break;
                            }
                            if (timeMark < timeComp) {//比比对的小 
                                if (m == 0) {//

                                } else {
                                    let dataCompM = JSON.parse(JSON.stringify(dataMark[k]));
                                    for (let n = 0; n < keys.length; n++) {

                                        // (xKey - (m-1)key) / (mKey - (m-1)key) = (xT - (m-1)T) / (mT - (m -1)T)
                                        let m_1Key = dataComp[m - 1][keys[n]];
                                        let mKey = dataComp[m][keys[n]];
                                        let xT = timeMark;
                                        let m_1T = dataComp[m - 1].times;
                                        let mT = timeComp;
                                        // xKey = ( (xT - (m-1)T) / (mT - (m -1)T) ) * (mKey - (m-1)key) + (m-1)key

                                        dataCompM[keys[n]] = ((xT - m_1T) / (mT - m_1T)) * (mKey - m_1Key) + m_1Key;
                                    }
                                    dataComp.splice(m, 0, dataCompM);
                                }
                                break;
                            }
                            if (timeMark > timeComp && m == (dataComp.length - 1)) {//比比对的最后一个最大的都大
                                if (dataComp[m]) {
                                    break;
                                } else {
                                    for (let n = 0; n < keys.length; n++) {
                                        dataComp[m][keys[n]] = null;
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        fillMsg(optionFirstId, data)
    }
    const fillMsg = (optionCurrentId, data) => {
        optionCurrentId = diffOptionId || optionFirstId
        let item = data[0].items;
        let codeItemsName = '';
        let unit = '';
        for (let key in item) {
            if (item[key].name == itemsName) {
                codeItemsName = key;
                unit = item[key].unit;
                break;
            }
        }
        if (codeItemsName == '') {
        } else {
            //找当前对比基准的id位置
            let positionData = 0;
            let positionStations = 0;
            if (data.length == 1) {
                for (let j = 0; j < data.length; j++) {
                    for (let k = 0; k < data[j].stations.length; k++) {
                        if (data[j].stations[k].id == optionCurrentId) {
                            positionData = j;
                            positionStations = k;
                            break;
                        }
                    }
                }
            } else {
                positionData = optionCurrentId;
            }
            let markStation = data[positionData].stations[positionStations];
            let markTitle = '';
            if (data.length == 1) {
                markTitle = markStation.name;
            } else {
                markTitle = data[positionData].timeArea[0] + '~' + data[positionData].timeArea[1];
            }
            let markData = data[positionData].stations[positionStations].data;
            for (let j = 0; j < data.length; j++) {//对比
                for (let k = 0; k < data[j].stations.length; k++) {
                    if (j != positionData || k != positionStations) {

                        let comData = data[j].stations[k].data;
                        let comStation = data[j].stations[k];
                        let comTitle = '';
                        if (data.length == 1) {
                            comTitle = comStation.name;
                        } else {
                            comTitle = data[j].timeArea[0] + ' ~ ' + data[j].timeArea[1];
                        }

                        //获取时间区域初始值
                        let timeArea = [];
                        let timeArea1, timeArea2;
                        for (let i = 0; i < markData.length; i++) {
                            if (markData[i].time) {
                                timeArea1 = timeArea2 = markData[i].time;
                                break;
                            }
                        }
                        let chartDataZero = [];
                        if (data.length == 1) {
                            for (let nm = 0; nm < markData.length; nm++) {
                                for (let m = 0; m < comData.length; m++) {
                                    if (!markData[m] || markData[m][codeItemsName] == null || markData[m][codeItemsName] == 'NaN' ||
                                        !comData[m] || comData[m][codeItemsName] == null || comData[m][codeItemsName] == 'NaN') {
                                        break;
                                    } else {
                                        if (comData[m].times == markData[m].times) {
                                            if (timeArea1 > markData[m].time) {
                                                timeArea1 = markData[m].time;
                                            } else if (timeArea2 < markData[m].time) {
                                                timeArea2 = markData[m].time;
                                            }
                                            chartDataZero.push({ name: itemsName, value: parseFloat((markData[m][codeItemsName] - comData[m][codeItemsName]).toFixed(3)), time: markData[m].time })
                                        }
                                    }
                                }
                            }
                        } else {
                            for (let m = 0; m < comData.length; m++) {
                                if (!markData[m] || markData[m][codeItemsName] == null || markData[m][codeItemsName] == 'NaN' ||
                                    !comData[m] || comData[m][codeItemsName] == null || comData[m][codeItemsName] == 'NaN') {
                                    break;
                                } else {
                                    if (timeArea1 > markData[m].time) {
                                        timeArea1 = markData[m].time;
                                    } else if (timeArea2 < markData[m].time) {
                                        timeArea2 = markData[m].time;
                                    }
                                    chartDataZero.push({ name: itemsName, value: parseFloat((markData[m][codeItemsName] - comData[m][codeItemsName]).toFixed(3)), time: markData[m].time })

                                }
                            }
                        }
                        timeArea.push(timeArea1);
                        timeArea.push(timeArea2);
                        if (chartDataZero.length > 0) {
                            chartData.push({ data: chartDataZero, timeArea: timeArea, title: `${markTitle} 对比 ${comTitle}`, unit: unit });
                        }
                    }
                }
            }
        }
    }

    let stationsData_ = JSON.parse(JSON.stringify(stationsData));
    const data = stationsData_.items ? stationsData_.items.stationsData : [];
    const items = stationsData_.items ? stationsData_.items : -1;
    let dealing = false;
    if (structId == items.structId && structId != null && data.filter(s => s.stations.filter(f => f.data.length > 0).length > 0).length > 0) {
        dealing = true;
        dealMsg(data);
    }

    return (
        <Card
            key={'diff-card'}
            title={<div><AreaChartOutlined /><span style={{ marginLeft: 6 }}>差值序列</span></div>}
            style={{ marginTop: 15 }}
            extra={<div className="A14">
                <div style={{ float: 'right' }}>
                    选择对比基准
                   <Dropdown
                        style={{ float: 'right', marginRight: 10 }}
                        overlay={options.length > 0 ?
                            <Menu onClick={(value) => diffOptionIdChange(value.key)}>
                                {options.map(s => <Menu.Item key={s.id} value={s.id} >{s.optionName}</Menu.Item>)}
                            </Menu>
                            : <Menu />}
                        placement="topRight">
                        <Button>{optionCurrent || '---'}</Button>
                    </Dropdown>
                </div>
            </div>}>
            <div style={{ marginBottom: 15 }}>
                <div className="data-chart-container">
                    {chartData.length ?
                        chartData.map((s, index) => <AreaChartWithNegative
                            key={index}
                            height={250}
                            colors={['#49A9EE']}
                            data={s.data}
                            configs={{
                                slider: { start: s.timeArea[0], end: s.timeArea[1] },
                                title: s.title, unit: s.unit
                            }} />)
                        : dealing ? <span><Spin /></span> : <span><FrownOutlined /> 暂无数据</span>}
                </div>
            </div>
        </Card>
    )
}
export default Difference;