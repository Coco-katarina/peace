import React, { Component } from 'react';
import { Empty } from 'antd';
import { Charts } from '@peace/components';
import { StatisticCard } from '@ant-design/pro-card';

const { TimeValueLineChart } = Charts;
const Data = ({...props}) => {
    const { stationsData, structId, itemsName } = props;
 
    const data = stationsData?.stationsData  || [];
    let codeItemsName = '';
    let chartData = [];
    let unit = '';
    if (structId == stationsData.structId && data.length >= 1 && itemsName) {
        let chartDataZero = []
        let timeArea = [];
        let timeArea1 = null;
        let timeArea2 = null;
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
                    if (timeArea1) {
                        break;
                    }
                }
                if (timeArea1) {
                    break;
                }
            }
        } else {
            xAxis = 'days';
            for (let d of data) {
                if (d.stations.length) {
                    for (let s of d.stations) {
                        if (s.data.length) {
                            timeArea1 = timeArea2 = s.data[0].time;
                            break;
                        }
                    }
                    if (timeArea1) {
                        break;
                    }
                }
            }
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
                        timeArea1 = timeArea2 = 0
                    }
                    for (let k = 0; k < stationsZero[j].data.length; k++) {
                        if (timeArea1 > stationsZero[j].data[k].time) {
                            timeArea1 = stationsZero[j].data[k].time;
                        } else if (timeArea2 < stationsZero[j].data[k].time) {
                            timeArea2 = stationsZero[j].data[k].time;
                        }
                        
                        if (data.length == 1) {
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
                //chartData.push({ data: chartDataZero, timeArea: data[i].timeArea });
            }
        }
        timeArea.push(timeArea1);
        timeArea.push(timeArea2);
        chartData.push({ data: chartDataZero, timeArea: timeArea, xAxis: xAxis });
    }
    let chartData_ = chartData.filter(s => s.data.length > 0);
   
    return (
        <StatisticCard
            title="数据对比"
            style={{ marginBottom: 5 }}
            extra={''}
            chart={
                chartData[0] ?
                (chartData_.length > 0 ? chartData_.map((s,index) => 
                <TimeValueLineChart 
                    key={`timeValueLineChart-${index}`}
                    data={s.data} 
                    height={300} 
                    xAxis={s.xAxis} 
                    configs={{ slider: { start: 0, end: 100 }, unit: unit }} 
                />): <Empty description="没有查询到数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />)
                : <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        />
       
    )
}


function compareProps(prevProps, nextProps) {
    
    if(JSON.stringify(prevProps.stationsData) === JSON.stringify(nextProps.stationsData)){
        return true
    }else {
        return false
    }

}
export default React.memo(Data,compareProps)
