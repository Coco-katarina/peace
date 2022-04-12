import React from 'react'
import { Row, Col, Empty } from 'antd';
import { Charts } from '@peace/components';
import { StatisticCard } from '@ant-design/pro-card';
const { TimeValueBarChart } = Charts;

const Distribution = ({...props}) => {
    const { stationsData, itemsName, structId } = props;
    
    const data = stationsData?.stationsData || [];
    let codeItemsName = '';
    let chartData = [];
    
    if (structId == stationsData.structId && data.length >= 1) {
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
                    if(minData !== undefined){
                        for (let k = 0; k < stationsZero[j].data.length; k++) {
                            if (minData > stationsZero[j].data[k][codeItemsName]) { //查找最大值
                                minData = stationsZero[j].data[k][codeItemsName];
                            } else if (maxData < stationsZero[j].data[k][codeItemsName]) {//查找最小值
                                maxData = stationsZero[j].data[k][codeItemsName];
                            }
                        }
                        if(minData == maxData){//最大最小相等的特殊情况
                            if (data.length == 1) {//单时间段写测点~
                                chartDataZero.push({ name: stationsZero[j].name, probability: 100, range: `${minData.toFixed(2)}~${maxData.toFixed(2)}` });
                            } else {
                                chartDataZero.push({ name: `${data[i].timeArea[0]} 至 ${data[i].timeArea[1]}`, probability: 100, range: `${minData.toFixed(2)}~${maxData.toFixed(2)}` });
                            }
                            
                        } else{
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
                    }
                    
                    chartData.push({ data: chartDataZero, timeArea: data[i].timeArea });
                }
            }
        }
    }
    return (
        <StatisticCard
            title="数据分布"
            style={{ marginBottom: 5 }}
            extra={''}
            chart={
                <Row>
                    {
                        chartData.length > 0 
                        
                        ? chartData.map((s,index) => 
                            <Col span={12} key={`timeValueBarChart-${index}`}>
                                <TimeValueBarChart data={s.data} height={400} config={{ xAxis: 'range', yAxis: 'probability' }} />
                            </Col>
                        )
                        : <Col span={24}>
                            <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </Col>
                    }
                </Row>
                
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
export default React.memo(Distribution,compareProps)
