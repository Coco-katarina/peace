import React, { Component } from 'react'
import { Card, Select, Row, Col, Slider, Empty } from 'antd';
import moment from 'moment';
import { Charts } from '@peace/components';
import { StatisticCard } from '@ant-design/pro-card';

const { CommonPointChart, ColumnChart } = Charts;
const Option = Select.Option;
class Coefficient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSliderValue: null
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { correlationData } = nextProps;
        if (correlationData != this.props.correlationData)
            this.setState({ currentSliderValue: null });
    }
    componentDidMount() {
        this.setState({ currentSliderValue: null });
    }
    onIndependentVariableStaionChange = value => {
        this.props.onIndependentVariableStaionChange(value);
        this.setState({ currentSliderValue: null });
    }
    onDependentVariableStaionChange = value => {
        this.props.onDependentVariableStaionChange(value);
        this.setState({ currentSliderValue: null });
    }
    //均值、标准差
    getMeanStandardDeviation = (dataSource) => {
        const { currentSliderValue } = this.state;
        let maxSelect = currentSliderValue ? currentSliderValue[1] : dataSource.independentValuesMax;
        let minSelect = currentSliderValue ? currentSliderValue[0] : dataSource.independentValuesMin;

        let dependentValuesMax = dataSource.dependentValuesMax;
        let dependentValuesMin = dataSource.dependentValuesMin;
        let de = (dependentValuesMax - dependentValuesMin) / 10;

        let conditionData = [];
        for (let k = 0; k < 10; k++) {
            let conditionObject = {};
            conditionObject.low = dependentValuesMin + k * de;
            if (k == 9)
                conditionObject.up = dependentValuesMax;
            else
                conditionObject.up = dependentValuesMin + (k + 1) * de;
            conditionObject.category = dependentValuesMin + (k + 0.5) * de;
            conditionData.push(conditionObject);
        }
        let freq = [];
        let conditionDenp = [];
        let independentValues = dataSource.independentValues;
        let dependentValues = dataSource.dependentValues;
        for (let m = 0; m < 10; m++) {
            let count = 0;
            for (let n = 0; n < dataSource.dependentValues.length; n++) {
                if (independentValues[n] >= minSelect && independentValues[n] <= maxSelect) {
                    conditionDenp.push(dependentValues[n]);
                    if (m == 9) {
                        if (dependentValues[n] >= conditionData[m].low && dependentValues[n] <= conditionData[m].up) {
                            count++;
                        }
                    } else {
                        if (dependentValues[n] >= conditionData[m].low && dependentValues[n] < conditionData[m].up) {
                            count++;
                        }
                    }
                }
            }
            freq.push(count / independentValues.length);
        }
        let mean = 0;
        let sum = 0;
        let std = 0;
        let avgSum = 0;
        for (let a = 0; a < conditionDenp.length; a++) {
            sum += parseFloat(conditionDenp[a]);
        }
        if (conditionDenp.length != 0) {
            mean = sum / conditionDenp.length;
            for (let a = 0; a < conditionDenp.length; a++) {
                avgSum += Math.pow(conditionDenp[a] - mean, 2);
            }
            std = Math.sqrt(avgSum / conditionDenp.length);
        }
        let obj = {
            mean: mean,
            standardDeviation: std,
            freq: freq,
            conditionData: conditionData
        }
        return obj;
    }
    //相关系数
    getCorrelationCoefficient = (independentValues, dependentValues) => {
        let average1 = 0;
        let average2 = 0;
        let sum1 = 0;
        let sum2 = 0;
        let d1 = 0;
        let d2 = 0;
        let sumCov = 0;
        let count = 0;
        let data = [];
        for (let i = 0; i < independentValues.length; i++) {
            if (independentValues[i] != null && dependentValues[i] != null) {
                sum1 += independentValues[i];
                sum2 += dependentValues[i];
                count++;
                data.push({
                    xAxis: independentValues[i] ? Number(independentValues[i].toFixed(2)) : null,
                    yAxis: dependentValues[i] ? Number(dependentValues[i].toFixed(2)) : null
                })
            }
            average1 = sum1 / count;
            average2 = sum2 / count;
        }
        for (let i = 0; i < independentValues.length; i++) {
            if (independentValues[i] != null && dependentValues[i] != null) {
                d1 += Math.pow(independentValues[i] - average1, 2);
                d2 += Math.pow(dependentValues[i] - average2, 2);
                sumCov += (independentValues[i] - average1) * (dependentValues[i] - average2);
            }
        }
        let obj = {
            coefficient: sumCov / Math.sqrt(d1 * d2),
            data: data.sort((a,b) => a.xAxis - b.xAxis)
        }
        return obj;
    }
    //差值
    getCorrelationInterpolation = (values, selfIntervals, intervals) => {
        let length = intervals.length;
        let valuesOut = [];
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < values.length - 1; j++) {
                if (intervals[i] >= selfIntervals[j] && intervals[i] <= selfIntervals[j + 1]) {
                    if (selfIntervals[j] != selfIntervals[j + 1]) {
                        valuesOut[i] = values[j] * (intervals[i] - selfIntervals[j + 1]) /
                            (selfIntervals[j] - selfIntervals[j + 1]) +
                            values[j + 1] * (intervals[i] - selfIntervals[j]) /
                            (selfIntervals[j + 1] - selfIntervals[j]);
                        break;
                    }
                } else {
                    // valuesOut[i] = null;
                    // break;
                }
            }
        }
        return valuesOut;
    }
    getIntervals = (time) => {
        const { currStartTime } = this.props;
        let a = moment(time);
        let b = moment(currStartTime);
        let interval = a.diff(b, 'millisecond');
        return interval;
    }

    getValuesIntervals = (keyId) => {
        const { correlationData } = this.props;
        let id = "";
        for (let i = 0; i < keyId.length - 2; i++) {
            let a = i == 0 ? keyId[i] : '-' + keyId[i];
            id += a;
        }
        //let id = keyId.length == 3 ? keyId[0] : keyId[0] + '-' + keyId[1];//防止测点名称有'-'的情形
        let key = keyId[keyId.length - 1];
        let values = [];
        let intervals = [];
        let item = {};
        Object.keys(correlationData).forEach(proto => {
            let items = correlationData[proto].items;
            let stations = correlationData[proto].stations;
            let data = stations.filter(s => s.name == id);
            if (data.length > 0) {
                data[0].data.map(d => {
                    if (d[key] != null) {
                        let value = d[key];
                        let interval = this.getIntervals(d.time);
                        values.push(d[key]);
                        intervals.push(interval);
                    }
                });
                item = items[key];
            }
        })

        let obj = {
            values: values,
            intervals: intervals,
            item: item
        };
        return obj;
    }
    getValues = (independentValues, dependentValues) => {
        let len = independentValues.length;
        let obj = {
            indepValues: [],
            depValues: []
        }
        for (let i = 0; i < len; i++) {
            if (independentValues[i] != null && dependentValues[i] != null) {
                obj.indepValues.push(independentValues[i]);
                obj.depValues.push(dependentValues[i]);
            }
        }
        return obj;
    }

    getDataSource = (independentVariableStaionId, dependentVariableStaionId) => {
        let dataSource = {};
        if (independentVariableStaionId && dependentVariableStaionId) {
            let independentKeyId = independentVariableStaionId.split('-');
            let dependentKeyId = dependentVariableStaionId.split('-');
            let independentValuesIntervals = this.getValuesIntervals(independentKeyId);
            let dependentValuesIntervals = this.getValuesIntervals(dependentKeyId);

            if (independentValuesIntervals.intervals.length == 0) {
                return dataSource;
            }

            if (independentValuesIntervals.intervals.length < dependentValuesIntervals.intervals.length) {
                dependentValuesIntervals.values = this.getCorrelationInterpolation(dependentValuesIntervals.values,
                    dependentValuesIntervals.intervals, independentValuesIntervals.intervals);
            } else {
                independentValuesIntervals.values = this.getCorrelationInterpolation(independentValuesIntervals.values,
                    independentValuesIntervals.intervals, dependentValuesIntervals.intervals);
            }
            //过滤null值
            let values = this.getValues(independentValuesIntervals.values, dependentValuesIntervals.values);
            independentValuesIntervals.values = values.indepValues;
            dependentValuesIntervals.values = values.depValues;
            let independentValuesMax = Math.max.apply(null, independentValuesIntervals.values);
            let independentValuesMin = Math.min.apply(null, independentValuesIntervals.values);
            let dependentValuesMax = Math.max.apply(null, dependentValuesIntervals.values);
            let dependentValuesMin = Math.min.apply(null, dependentValuesIntervals.values);
            dataSource['independentValuesMax'] = independentValuesMax;
            dataSource['independentValuesMin'] = independentValuesMin;
            dataSource['dependentValuesMax'] = dependentValuesMax;
            dataSource['dependentValuesMin'] = dependentValuesMin;
            dataSource['independentValues'] = independentValuesIntervals.values;
            dataSource['dependentValues'] = dependentValuesIntervals.values;
            dataSource['independentItem'] = independentValuesIntervals.item;
            dataSource['dependentItem'] = dependentValuesIntervals.item;
        }
        return dataSource;
    }

    renderPointChart = (dataSource) => {
        if (JSON.stringify(dataSource) == "{}") {
            return <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
        if (dataSource.dependentValuesMax == dataSource.dependentValuesMin ||
            dataSource.independentValuesMax == dataSource.independentValuesMin) {
            return <Empty description="相关联数据，不满足相关系数计算公式，分母不能为0。" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
        let coefficientData = this.getCorrelationCoefficient(dataSource.independentValues, dataSource.dependentValues);
        let coefficient = coefficientData.coefficient;
        let data = coefficientData.data;
        let scaleConfig = {};
        if (JSON.stringify(dataSource) != "{}") {
            scaleConfig = {
                xAxis: {
                    alias: `${dataSource.independentItem.name}(${dataSource.independentItem.unit})`,
                    tickCount: 10
                },
                yAxis: {
                    alias: `${dataSource.dependentItem.name}(${dataSource.dependentItem.unit})`,
                    tickCount: 10
                },
            }
        }
        return data.length > 0 ? <div>
            <Row gutter={2} style={{ marginTop: 35 }}>
                <Col md={24} sm={24}>
                    <CommonPointChart data={data} height={300} scaleConfig={scaleConfig} config={{xAxis: 'xAxis',yAxis: 'yAxis'}} />
                </Col>
            </Row>
            <Row gutter={2} style={{ marginBottom: 10 }}>
                <Col md={24} sm={24}>
                    <span style={{ marginLeft: 10 }}>相关系数：{coefficient.toFixed(3)}</span>
                </Col>
            </Row>
        </div>
            : <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }
    //取slider范围
    getValuesDigit = (v, isMin) => {
        let loc = v.toString().indexOf(".") + 1;
        if (loc == 0)
            return v;
        var count = v.toString().length - loc;
        if (count == 3) {
            return v;
        } else {
            let d = Number(v.toString().substring(0, loc + 3));
            if (isMin == 'min') {
                if (d < 0)
                    d = d - 0.001;
            } else {
                d = d + 0.001;
            }
            return Number(d.toString().substring(0, loc + 3));
        }
    }
    renderIntervalChart = (dataSource) => {
        if (JSON.stringify(dataSource) == "{}")
            return <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />;
        if (dataSource.dependentValuesMax == dataSource.dependentValuesMin ||
            dataSource.independentValuesMax == dataSource.independentValuesMin) {
            return <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />;
        }
        if (dataSource.independentValues.length == 0 || dataSource.dependentValues.length == 0)
            return <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />;
        let min = this.getValuesDigit(dataSource.independentValuesMin, 'min');
        let max = this.getValuesDigit(dataSource.independentValuesMax, 'max');

        let independentItemUnit = dataSource.independentItem.unit;
        let source = this.getMeanStandardDeviation(dataSource);
        let meanValue = source.mean;
        let standardDeviation = source.standardDeviation;
        let conditionData = source.conditionData;
        let freq = source.freq;
        let data = source.data;
        if (conditionData.length > 0) {
            let categories = [];
            let data = [];
            for (var j = 0; j < 10; j++) {
                categories.push(conditionData[j].category);
                let c = parseFloat(conditionData[j].category).toFixed(2);
                let f = freq[j] * 100;
                data.push({ value: c, freq: f });
            }
            let scaleConfig = {
                value: { alias: `${dataSource.dependentItem.name}(${dataSource.dependentItem.unit})` },
                freq: { alias: '频率' },
            }
            return <div>
                <Row gutter={2} style={{ marginTop: 2 }}>
                    <Col md={24} sm={24}>
                        <div style={{ height: 32, lineHeight: '32px', fontSize: 12 }}>
                            <div style={{ float: 'left', marginRight: 5 }}>选择自变量范围：</div>
                            <div style={{ float: 'left', marginRight: 5, width: 150 }}>
                                <Slider
                                    range={true}
                                    value={this.state.currentSliderValue || [min, max]}
                                    step={0.001}
                                    min={min}
                                    max={max}
                                    onChange={value => { this.setState({ currentSliderValue: value }) }} />
                            </div>
                            <div style={{ float: 'left' }}>
                                {this.state.currentSliderValue ?
                                    `${this.state.currentSliderValue[0]} ${independentItemUnit} 至 
                                    ${this.state.currentSliderValue[1]}${independentItemUnit}` :
                                    `${min}${independentItemUnit} 至 ${max}${independentItemUnit}`}

                            </div>
                        </div>
                    </Col>
                </Row>
                <Row gutter={2} style={{ marginTop: 2 }}>
                    <Col md={24} sm={24}>
                        <ColumnChart 
                            data={data} 
                            height={300}
                            scaleConfig={scaleConfig} 
                            config={{
                                xAxis: 'value',
                                yAxis: 'freq',
                                name: `${dataSource.dependentItem.name}`,
                                unit: `${dataSource.dependentItem.unit}`
                            }} 
                            conditionData={conditionData} 
                        />
                    </Col>
                </Row>
                <Row gutter={2} style={{ marginBottom: 10 }}>
                    <Col md={24} sm={24}>
                        <span style={{ marginLeft: 10 }}>均值{meanValue.toFixed(3)}</span>
                        <span style={{ marginLeft: 20 }}>标准差{standardDeviation.toFixed(3)}</span>
                    </Col>
                </Row>
            </div >
        } else {
            return null;
        }
    }
    renderOptions = (staionData, factorItems, staionIds) => {
        let options = [];
        staionData ?
            staionData.map(s => {
                if (staionIds.indexOf(s.id) > -1)
                    factorItems.map(item => {
                        options.push(<Option key={`${s.id}-${item.name}`} value={`${s.name}-${item.name}-${item.field_name}`}>
                            {`${s.name}-${item.name}`}</Option>)
                    })
            }) : [];
        return options;
    }

    render() {
        const { independentVariableStaionId, dependentVariableStaionId,
            independentVariableStaionData, dependentVariableStaionData,
            independentVariableFactorItems, dependentVariableFactorItems,
            independentVariableStationIds, dependentVariableStationIds,
            correlationData } = this.props;

        let dataSource = this.getDataSource(independentVariableStaionId, dependentVariableStaionId);

        return (
            <StatisticCard
                title={<div>
                    <div style={{ display: 'inline-block', marginRight: 40 }}>
                        <label style={{ marginRight: 10 }}>关联自变量</label>
                        <Select placeholder="请选择自变量测点" style={{ width: 150 }} getPopupContainer={(triggerNode) => triggerNode.parentNode}
                            value={independentVariableStaionId} onChange={this.onIndependentVariableStaionChange} >
                            {
                                this.renderOptions(independentVariableStaionData,
                                    independentVariableFactorItems, independentVariableStationIds)
                            }
                        </Select>
                    </div>
                    <div style={{ display: 'inline-block' }}>
                        <label style={{ marginRight: 10 }}>关联因变量</label>
                        <Select placeholder="请选择因变量测点" style={{ width: 150 }} getPopupContainer={(triggerNode) => triggerNode.parentNode}
                            value={dependentVariableStaionId} onChange={this.onDependentVariableStaionChange} >
                            {
                                this.renderOptions(dependentVariableStaionData,
                                    dependentVariableFactorItems, dependentVariableStationIds)
                            }
                        </Select>
                    </div>
                </div>}
                style={{ marginBottom: 5 }}
                extra={''}
                chart={<Row gutter={8}>
                <Col md={12} sm={24}>
                    <Row gutter={2} style={{ marginTop: 2 }}>
                        <Col md={24} sm={24}> </Col>
                    </Row>
                    {this.renderPointChart(dataSource)}
                </Col>
                <Col md={12} sm={24}>
                    {this.renderIntervalChart(dataSource)}
                </Col>
            </Row>}
            />
           
        )
    }
}

export default Coefficient;