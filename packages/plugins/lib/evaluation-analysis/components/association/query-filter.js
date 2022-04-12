import React, { Component } from 'react';
import { Row, Col, Select, Button, DatePicker, Radio, message, Divider } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Immutable from 'immutable';
import moment from 'moment';
import { PinyinHelper, Func } from '@peace/utils';

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;


class QueryFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        }
    }

    onStructChange = value => {
        this.props.onStructChange(value);
    }

    onFactorChange = value => {
        this.props.onFactorChange(value);
    }

    onCorrelationFactorChange = value => {
        this.props.onCorrelationFactorChange(value);
    }

    onStationChange = value => {
        this.props.onStationChange(value);
    }

    onCorrelationStationChange = value => {
        this.props.onCorrelationStationChange(value);
    }
    onDateRangeChange = (dates, dateStrings) => {
        this.props.onDateRangeChange(dates);
    }
    btnQuery = () => {
        this.props.btnQuery();
    }

    render() {
        const { structures, structId, factorId, correlationFactorId, factorData, correlationFactorData,
            stationIds, correlationStationIds, stationData, correlationStationData,loading } = this.props;

        return (
            <div style={{ padding: 10, marginBottom:5 }} className='wrapper-background'>
                    <Select 
                        value={structId} 
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
                                        value={factorId} 
                                        onChange={this.onFactorChange} 
                                        placeholder="请选择监测因素" 
                                        style={{ width: '80%' }}
                                        showSearch
                                        filterOption={Func.selectFilterOption}
                                        getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                    >
                                        {
                                            factorData && factorData.length > 0 ? factorData.map(f => <Select.Option key={f.id} value={f.id}>{f.name}</Select.Option>) : []
                                        }
                                    </Select>
                                </Col>
                            </Row>   
                        </Col>
                        <Col span={12}>
                            <Row gutter={8}>
                                <Col span={4} offset={1}>测点 : </Col>
                                <Col span={16}>
                                    <Select 
                                        value={stationIds} 
                                        placeholder="请选择测点" 
                                        style={{ width: '80%' }}  
                                        mode="multiple" 
                                        allowClear='true' 
                                        onChange={this.onStationChange}
                                        filterOption={Func.selectFilterOption}
                                        getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                    >
                                        {
                                            stationData ? stationData.map(s => <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>) : []
                                        }
                                    </Select>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row gutter={8}>
                                <Col span={4} offset={1}>关联监测因素 : </Col>
                                <Col span={16}>
                                    <Select 
                                        value={correlationFactorId} 
                                        placeholder="请选择关联监测因素" 
                                        style={{ width: '80%' }}  
                                        onChange={this.onCorrelationFactorChange}
                                        filterOption={Func.selectFilterOption}
                                        showSearch
                                        getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                    >
                                        {
                                            correlationFactorData ? correlationFactorData.map(s => <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>) : []
                                        }
                                    </Select>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row gutter={8}>
                                <Col span={4} offset={1}>关联测点 : </Col>
                                <Col span={16}>
                                    <Select 
                                        value={correlationStationIds} 
                                        placeholder="请选择关联测点" 
                                        style={{ width: '80%' }} 
                                        mode="multiple"
                                        allowClear='true' 
                                        onChange={this.onCorrelationStationChange}
                                        filterOption={Func.selectFilterOption}
                                        getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                    >
                                        {
                                            correlationStationData ? correlationStationData.map(s => <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>) : []
                                        }
                                    </Select>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row gutter={8}>
                                <Col span={4} offset={1}>对比时段 : </Col>
                                <Col span={16}>
                                    <RangePicker
                                        style={{ width: "80%" }}
                                        allowClear={false}
                                        defaultValue={[moment().add(-1,'days'), moment()]}
                                        getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                        showTime={true}
                                        format="YYYY/MM/DD HH:mm:ss"
                                        onChange={this.onDateRangeChange}
                                    />                                          
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                <Divider />
                <div style={{ textAlign: 'right' }}>
                    <Button  type="primary" onClick={this.btnQuery} loading={loading} >查询</Button>
                </div>
            </div>
        )
    }
}

export default QueryFilter;


