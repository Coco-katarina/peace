import React, { Component } from 'react';
import { Row, Col, Select, Button, DatePicker, Radio, message, Divider } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Immutable from 'immutable';
import moment from 'moment';
import { PinyinHelper, Func } from '@peace/utils';


const RangePicker = DatePicker.RangePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const dateFormat = 'YYYY/MM/DD HH:mm:ss';

class QueryFilter extends Component {
    constructor(props) {
        super(props);
        this.index = 2;
        this.dataNums = 2;
        this.dateRangeArray = {};
        this.state = {
            otherRanges: Immutable.OrderedMap(),
            mode: 'single',
            operationDateRange: 0,
            itemsName: '',
            stationsValue: [],
        }
    }

    componentDidMount() {
        this.setDateRangeArray(this.state.mode);
    }
    UNSAFE_componentWillUpdate(nextProps, nextState) {
        if (this.state.mode != nextState.mode && Object.keys(this.dateRangeArray).length == 0 || (this.state.mode == 'single' && Object.keys(this.dateRangeArray).length == 0)) {
            this.setDateRangeArray(nextState.mode);
        }
    }
    setDateRangeArray = (mode) => {
        const dataStringsGroup = [
            [moment().add(-24, 'hour').format(dateFormat), moment().format(dateFormat)],
            [moment().add(-2, 'day').format(dateFormat), moment().add(-1, 'day').format(dateFormat)]
        ]
        //const dataStrings = [moment().add(-24, 'hour').format(dateFormat), moment().format(dateFormat)];
        if (mode == 'single') {
            for (let i = 0; i < this.dataNums; i++) {
                this.dateRangeArray[i] = dataStringsGroup[i] || dataStringsGroup[0];
            }
        } else {
            this.dateRangeArray[0] = dataStringsGroup[0];
        }
        this.props.startAndEndTime(this.dateRangeArray);
    }

    addRange = () => {
        if (this.dataNums >= 5) {
            return message.warning('时间选择数量超过上限');
        }
        const index = this.index++;
        this.setState({
            otherRanges: this.state.otherRanges.set(
                index,
                <Row key={"range-add-" + index} gutter={8} onClick={() => { this.setOperationDateRange(index) }} >
                    <Col span={24}>
                        {/* <TimeRange num={index} onTimeRangeSelect={this.onTimeRangeChange} /> */}

                        <RangePicker
                            style={{ width: "80%" }}
                            allowClear={false}
                            showTime={true}
                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                            format="YYYY/MM/DD HH:mm:ss"
                            onChange={this.onDateRangeChange}
                        />
                        <Button onClick={() => this.removeRange(index)} style={{ marginLeft: 5 }}><MinusOutlined /></Button>
                    </Col>
                    {/* <Col span="4">
                        <Button size="large" onClick={() => this.removeRange(index)} style={{ height: 36, marginTop: 2 }}><Icon type="minus" /></Button>
                    </Col> */}
                </Row>
            )
        });
        this.dataNums++;
    }

    removeRange = index => {
        delete this.dateRangeArray[index];
        this.setState({
            otherRanges: this.state.otherRanges.delete(index)
        });
        this.props.startAndEndTime(this.dateRangeArray);
        this.dataNums--;
    }

    onStructChange = value => {//结构物改变1
        this.setState({
            stationsValue: []
        })
        const { factors } = this.props;
        this.props.onStructChange(value);
        this.props.onFactorItemChange(factors && factors[0] ? factors[0].items[0].id : 0);

        this.props.onStationsChange([]);
    }
    onFactorChange = value => {//检测因素改变2
        const { factorId, factors } = this.props;
        this.setState({
            stationsValue: []
        })
        this.props.onFactorChange(value);
        this.props.onStationsChange([]);
    }
    onFactorItemChange = value => {
        this.props.onFactorItemChange(value.target.value);
    }
    onStationsChange = (value) => {
        if (value.length > 1) {
            if (this.state.mode != 'multiple') {
                this.dateRangeArray = {};
                this.setState({ mode: 'multiple', stationsValue: value });
            }
            this.props.singleTimeArea();
        } else {
            this.dateRangeArray = {};
            this.setState({ mode: 'single', stationsValue: value });
        }
        this.props.onStationsChange(value);
        // this.setState({
        //     stationsValue: value
        // })
    }
    onDateRangeChange = (dates, dateStrings) => {//dates 没有选择的时候是空的 dataString =  ["2018-03-24 15:17:03", "2018-04-17 15:17:03"]
        // let num = this.state.operationDateRange
        this.dateRangeArray[this.state.operationDateRange] = dateStrings;
        this.props.startAndEndTime(this.dateRangeArray);
    }
    onTimeRangeChange = range => {
        this.dateRangeArray[this.state.operationDateRange] = [range.begin.format(dateFormat), range.end.format(dateFormat)];
        this.props.startAndEndTime(this.dateRangeArray);
    }

    setOperationDateRange = (num) => {
        this.setState({
            operationDateRange: num
        })
    }
    doQuery = () => {
        this.props.doQuery();
    }

    render() {
        const { factorId, structures, factors, stations, clientWidth } = this.props;


        return (
            <div style={{ padding: 10, marginBottom: 5 }} className='wrapper-background'>
                <Select
                    value={this.props.structId}
                    onChange={this.onStructChange}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                    placeholder="请选择结构物"
                    style={{ minWidth: 300, marginBottom: 20 }}
                    optionFilterProp="children"
                    showSearch
                    filterOption={Func.selectFilterOption}

                >
                    {
                        structures ? structures.length > 0 ? structures.map(s => <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>) : [] : []
                    }
                </Select>
                <Row gutter={16}>
                    <Col span={12}>
                        <Row gutter={8}>
                            <Col span={4} offset={1}>监测因素 : </Col>
                            <Col span={16}>
                                <Select
                                    value={this.props.factorId}
                                    onChange={this.onFactorChange}
                                    placeholder="请选择监测因素"
                                    style={{ width: '80%' }}
                                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                    showSearch
                                    filterOption={Func.selectFilterOption}
                                >
                                    {
                                        factors && factors.length > 0 ? factors.map(f => <Select.Option key={f.id} value={f.id}>{f.name}</Select.Option>) : []
                                    }
                                </Select>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={4} offset={1}>监测项 : </Col>
                            <Col span={16}>
                                <RadioGroup value={this.props.defaultRadioValue} onChange={this.onFactorItemChange}>
                                    {
                                        factors && factors.filter(s => s.id == factorId)[0] ? factors.filter(s => s.id == factorId)[0].items.map(d => <RadioButton key={d.id} value={d.id}>{d.name}</RadioButton>) : []
                                    }
                                </RadioGroup>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={4} offset={1}>测点 : </Col>
                            <Col span={16}>
                                <Select
                                    value={this.state.stationsValue}
                                    placeholder="请选择测点"
                                    style={{ width: '80%' }}
                                    mode="multiple"
                                    allowClear='true'
                                    onChange={this.onStationsChange}
                                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                    filterOption={Func.selectFilterOption}
                                >
                                    {
                                        stations ? stations.map(s => <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>) : []
                                    }
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row gutter={8}>
                            <Col span={4} offset={1}>对比时段 : </Col>
                            <Col span={16}>
                                {
                                    this.state.mode == 'single' ?
                                        <div key={this.state.mode}>
                                            <Row gutter={8} onClick={() => { this.setOperationDateRange(0) }} >
                                                <Col span={24}>
                                                    {/* <TimeRange num={0} onTimeRangeSelect={this.onTimeRangeChange} /> */}
                                                    <RangePicker
                                                        style={{ width: "80%" }}
                                                        getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                                        allowClear={false}
                                                        showTime={true}
                                                        value={Array.isArray(this.dateRangeArray[0]) && this.dateRangeArray[0].length == 2 ? [moment(this.dateRangeArray[0][0], dateFormat), moment(this.dateRangeArray[0][1], dateFormat)] : null}
                                                        format="YYYY/MM/DD HH:mm:ss"
                                                        onChange={this.onDateRangeChange}
                                                    />

                                                </Col>

                                            </Row>
                                            <Row gutter={8} onClick={() => { this.setOperationDateRange(1) }} >
                                                <Col span={24}>
                                                    {/* <TimeRange num={1} onTimeRangeSelect={this.onTimeRangeChange} /> */}
                                                    <RangePicker
                                                        style={{ width: "80%" }}
                                                        getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                                        allowClear={false}
                                                        showTime={true}
                                                        value={Array.isArray(this.dateRangeArray[1]) && this.dateRangeArray[1].length == 2 ? [moment(this.dateRangeArray[1][0], dateFormat), moment(this.dateRangeArray[1][1], dateFormat)] : null}
                                                        format="YYYY/MM/DD HH:mm:ss"
                                                        onChange={this.onDateRangeChange}
                                                    />
                                                    <Button type="primary" ghost onClick={this.addRange} style={{ marginLeft: 5 }}><PlusOutlined /></Button>
                                                </Col>
                                            </Row>
                                            {this.state.otherRanges.valueSeq()}
                                        </div>
                                        :
                                        <Row onClick={() => { this.setOperationDateRange(0) }}>
                                            <Col span={24}>
                                                <RangePicker
                                                    style={{ width: "80%" }}
                                                    allowClear={false}
                                                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                                    showTime={true}
                                                    format="YYYY/MM/DD HH:mm:ss"
                                                    value={Array.isArray(this.dateRangeArray[0]) && this.dateRangeArray[0].length == 2 ? [moment(this.dateRangeArray[0][0], dateFormat), moment(this.dateRangeArray[0][1], dateFormat)] : null}
                                                    onChange={this.onDateRangeChange}
                                                />
                                            </Col>
                                        </Row>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Divider />
                <div style={{ textAlign: 'right' }}>
                    <Button type="primary" onClick={this.doQuery} >查询</Button>
                </div>
            </div>
        )
    }
}

export default QueryFilter;