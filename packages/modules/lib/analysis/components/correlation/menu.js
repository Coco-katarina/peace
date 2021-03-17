import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card, Row, Col, message, Form, Select, Button, DatePicker, Space } from 'antd';
import { PinyinHelper, Func } from '@peace/utils';
import { getStructures, getFactors } from '../../actions/structure';
import { getCedian } from '../../actions/cedian';
import { getCorrelationData } from '../../actions/correlation';
import Style from '../style.css';

const notSupportFactorProtos = ['1024', '2002', '5001', '5002', '5003', '5006'];
const notSupportInterrelatedFactorIds = [1, 2, 12, 29, 54, 80, 118, 119, 149, 160, 207];
const notSupportInterrelatedFactorProtos = ['1001', '1002', '3002'];
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

class Correlation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            structId: null,
            factorId: null,
            correlationFactorId: null,
            factorData: null,
            correlationFactorData: null,
            stationIds: [],
            correlationStationIds: [],
            stationData: null,
            correlationStationData: null,
            currStartTime: moment().add(-1, 'days').format('YYYY-MM-DD HH:mm:ss'),
            currEndTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            flag: false,
            independentVariableStaionId: null,
            dependentVariableStaionId: null,
            factorItems: [],
            correlationFactorItems: [],
            showConfig: false
        };
    }

    formRef = React.createRef();

    componentDidMount() {
        const { dispatch, user } = this.props;
        dispatch(getStructures(user.orgId))
            .then(action => {
                if (action.payload.data && action.payload.data.length > 0) {
                    this.setState({ structId: action.payload.data[0].id });
                    return dispatch(getFactors(action.payload.data[0].id))
                } else {
                    return Promise.resolve();
                }
            })
            .then(action => {
                if (action && action.payload.data.length > 0) {
                    let factorData = action.payload.data.filter(s => s.checked).filter(f => !notSupportFactorProtos.includes(f.proto));
                    if (factorData.length > 0)
                        this.setState({
                            factorId: factorData[0].id,
                            factorItems: factorData[0].items
                        }, () => {
                            this.getContextData();
                        });
                }
            });
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }
    sendParas = () => {
        this.props.test(this.state.factorId, this.state.correlationFactorId, this.state.flag,
            this.state.independentVariableStaionId, this.state.dependentVariableStaionId,
            this.state.stationData, this.state.correlationStationData,
            this.state.factorItems, this.state.correlationFactorItems,
            this.state.stationIds, this.state.correlationStationIds,
            this.state.currStartTime, this.state.currEndTime);
    }
    getContextData = () => {
        const { dispatch, factors } = this.props;
        const { structId, factorId, flag } = this.state;
        this.setFactorData(factors.filter(f => f.checked));//checked
        if (structId) {
            dispatch(getCedian(structId))
                .then(action => {
                    if (action && action.payload.data.length > 0) {
                        let stations = action.payload.data;
                        this.setStationIds(stations);
                    } else
                        return Promise.resolve();
                }).then(_ => {
                    this.sendParas();//todo
                })
        }
    }

    setFactorData = (factors) => {
        if (factors) {
            let factorData = factors.filter(f => !notSupportFactorProtos.includes(f.proto));
            let correlationFactorData = this.getTargetFactorData(factorData, this.state.factorId);
            if (correlationFactorData.length > 0) {
                let correlationFactorId = correlationFactorData[0].id;
                let correlationFactorItems = correlationFactorData[0].items;
                this.setState({ correlationFactorId, correlationFactorItems });
            }
            this.setState({ factorData, correlationFactorData });
        }
    };
    // getFactorData = (factors) => {
    //     let factorData = factors.filter(f => !notSupportFactorProtos.includes(f.proto));
    //     return factorData;
    // };
    getTargetFactorData = (factorData, factorId) => {
        let correlationFactorData = factorData.filter(f => f.id !== factorId);
        if (notSupportInterrelatedFactorIds.includes(factorId)) {
            correlationFactorData = correlationFactorData.filter(f => !notSupportInterrelatedFactorProtos.includes(f.proto));
        }
        return correlationFactorData;
    };
    getFactorProto = (factorId) => {
        let fctorProto = this.props.factors.filter(f => f.id == factorId)[0].proto;
        return fctorProto;
    }
    setStationIds = (stations) => {
        const { factorId, correlationFactorId, currStartTime, currEndTime } = this.state;
        let stationId = this.getStationId(stations);
        let correlationStationId = this.getCorrelationStationId(stations, 'forReturnId');
        if (stationId.length > 0 && correlationStationId.length > 0 && currStartTime && currEndTime) {
            let factorProto = this.getFactorProto(factorId) + "-0";
            this.props.dispatch(getCorrelationData(this.state.currStartTime, this.state.currEndTime,
                stationId.join(','), factorProto));
            let correlationFactorProto = this.getFactorProto(correlationFactorId) + "-1";
            this.props.dispatch(getCorrelationData(this.state.currStartTime, this.state.currEndTime,
                correlationStationId.join(','), correlationFactorProto));
            this.setState({ flag: true })
        }
        else {
            this.setState({
                flag: false
            });
            return Promise.resolve();
        }
    }
    getStationId = (stations) => {
        let stationInfoData = stations.filter(s => s.factorId == this.state.factorId);
        let stationIds = [];
        let stationData = [];
        let independentVariableStaionId = null;
        const { factorItems } = this.state;
        let key = factorItems.length > 0 ? factorItems[0].name : null;
        let field_name = factorItems.length > 0 ? factorItems[0].field_name : null;
        stationInfoData.map(sid => {
            sid.groups.map(g => {
                g.stations.map(s => {
                    if (stationIds.length == 0) {
                        stationIds.push(s.id);
                        independentVariableStaionId = `${s.name}-${key}-${field_name}`;
                    }
                })
                if (g.stations.length > 0)
                    stationData = stationData.concat(g.stations);
            })
        });
        this.setState({ stationIds, stationData, independentVariableStaionId });
        return stationIds;
    }
    getCorrelationStationId = (stations, use) => {
        let correlationStationInfoData = stations.filter(s => s.factorId == this.state.correlationFactorId);
        let correlationStationIds = [];
        let correlationStationData = [];
        let dependentVariableStaionId = null;
        const { correlationFactorItems } = this.state;
        let key = correlationFactorItems.length > 0 ? correlationFactorItems[0].name : null;
        let field_name = correlationFactorItems.length > 0 ? correlationFactorItems[0].field_name : null;
        correlationStationInfoData.map(csid => {
            csid.groups.map(g => {
                g.stations.map(s => {
                    if (correlationStationIds.length == 0) {
                        correlationStationIds.push(s.id);
                        dependentVariableStaionId = `${s.name}-${key}-${field_name}`;
                    }
                })
                if (g.stations.length > 0)
                    correlationStationData = correlationStationData.concat(g.stations);

            })
        });
        if (use == 'forReturnId') {
            this.setState({ correlationStationIds, correlationStationData, dependentVariableStaionId });
        } else {
            this.setState({ correlationStationIds, correlationStationData, dependentVariableStaionId }, () => {
                this.sendParas();
            });
        }
        return correlationStationIds;
    }
    onStructChange = (structId) => {
        const { dispatch } = this.props;
        //this.setState({ structId: structId });
        this.setState({
            structId: structId,
            factorId: null,
            correlationFactorId: null,
            factorData: null,
            correlationFactorData: null,
            stationIds: [],
            correlationStationIds: [],
            stationData: null,
            correlationStationData: null,
            flag: false,
            independentVariableStaionId: null,
            dependentVariableStaionId: null,
            factorItems: [],
            correlationFactorItems: []
        }, () => {
            this.sendParas();//清空
            dispatch(getFactors(structId))
                .then(action => {
                    if (action && action.payload.data.length > 0) {
                        let factorData = action.payload.data.filter(s => s.checked).filter(f => !notSupportFactorProtos.includes(f.proto));
                        if (factorData.length > 0)
                            this.setState({
                                factorId: factorData[0].id,
                                factorItems: factorData[0].items
                            }, () => {
                                this.getContextData();
                            });
                    }
                });
        })
    }
    onFactorChange = (factorId) => {
        let items = this.props.factors.filter(f => f.id == factorId)[0].items;
        this.setState({
            factorId: factorId,
            factorItems: items
        }, function () {
            this.getContextData();//todo
            //this.sendParas();
        });
    }
    onCorrelationFactorChange = (factorId) => {
        let items = this.props.factors.filter(f => f.id == factorId)[0].items;
        this.setState({
            correlationFactorId: factorId,
            correlationFactorItems: items
        }, function () {
            this.setState({
                flag: false
            })
            this.getCorrelationStationId(this.props.stations, 'corFactorChange');
            //this.sendParas();
        });
    }
    onStationChange = (stationIds) => {
        const { factorItems, factorId } = this.state;
        let key = factorItems.length > 0 ? factorItems[0].name : null;
        let field_name = factorItems.length > 0 ? factorItems[0].field_name : null;
        if (stationIds.length == 0) {
            this.setState({
                independentVariableStaionId: null,
                stationIds: stationIds
            }, () => {
                this.sendParas();
            })
        } else {
            let a = this.props.stations;
            a.map(csid => {
                if (csid.factorId == factorId) {
                    csid.groups.map(g => {
                        g.stations.map(s => {
                            if (s.id == stationIds[0]) {
                                let senName = s.name;
                                this.setState({
                                    independentVariableStaionId: `${senName}-${key}-${field_name}`,//////////////
                                    stationIds: stationIds
                                }, () => {
                                    this.sendParas();
                                })
                            }
                        })
                    })
                }
            });
        }
    }
    onCorrelationStationChange = (correlationStationIds) => {
        const { correlationFactorItems, correlationFactorId } = this.state;
        let key = correlationFactorItems.length > 0 ? correlationFactorItems[0].name : null;
        let field_name = correlationFactorItems.length > 0 ? correlationFactorItems[0].field_name : null;
        if (correlationStationIds.length == 0) {
            this.setState({
                dependentVariableStaionId: null,
                correlationStationIds: correlationStationIds
            }, () => {
                this.sendParas();
            })
        } else {
            let a = this.props.stations;
            a.map(csid => {
                if (csid.factorId == correlationFactorId) {
                    csid.groups.map(g => {
                        g.stations.map(s => {
                            if (s.id == correlationStationIds[0]) {
                                let senName = s.name;
                                this.setState({
                                    dependentVariableStaionId: `${senName}-${key}-${field_name}`,
                                    correlationStationIds: correlationStationIds
                                }, () => {
                                    this.sendParas();
                                })
                            }
                        })
                    })
                }
            });
        }
    }
    onDateRangeChange = (dates) => {
        if (dates.length == 0) {
            this.setState({
                currStartTime: null,
                currEndTime: null
            });
            return message.warning('请选择时间');
        }
        this.setState({
            currStartTime: dates[0].format('YYYY-MM-DD HH:mm:ss'),
            currEndTime: dates[1].format('YYYY-MM-DD HH:mm:ss')
        }, () => {
            this.sendParas();
        });
    }
    btnQuery = () => {
        this.queryCorrlationData();
        this.correlationConfigClick();
    }

    queryCorrlationData = () => {
        const { factorId, correlationFactorId, stationIds, correlationStationIds, currStartTime, currEndTime } = this.state;
        if (stationIds.length > 0 && correlationStationIds.length > 0 && currStartTime && currEndTime) {
            this.setState({ flag: true }, () => {
                this.sendParas();
            });
            let factorProto = this.getFactorProto(factorId) + "-0";
            this.props.dispatch(getCorrelationData(currStartTime, currEndTime, stationIds.join(','), factorProto));
            let correlationFactorProto = this.getFactorProto(correlationFactorId) + "-1";
            this.props.dispatch(getCorrelationData(currStartTime, currEndTime, correlationStationIds.join(','),
                correlationFactorProto));
        } else {
            this.setState({ flag: false }, () => {
                this.sendParas();
            })
            return message.warning('请选择关联测点或时间');
        }
        //this.props.queryForCharts(structId, this.state.itemsName, this.state.fieldName);
    }
    correlationConfigClick = () => {
        if (!this.state.showConfig) {
            this.setState({ showConfig: true })
        } else {
            this.setState({ showConfig: false })
        }
    }

    render() {
        const { isRequesting, structures, factors, user, correlationData } = this.props;
        const { structId, factorId, correlationFactorId, factorData, correlationFactorData,
            stationIds, correlationStationIds, stationData, correlationStationData,
            independentVariableStaionId, dependentVariableStaionId, flag,
            factorItems, correlationFactorItems,
            currStartTime, currEndTime,
        } = this.state;
        return (
            <Row justify="end"><Space>
                <Select value={structId}
                    onChange={this.onStructChange}
                    placeholder="请选择结构物"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => Func.selectFilterOption(input, option)}
                    style={{ width: 200 }}
                >
                    {
                        structures ? structures.map(s => <Option key={s.id} value={s.id}>{s.name}</Option>) : []
                    }
                </Select>
                <Button type='primary' onClick={this.correlationConfigClick}>设定关联条件</Button>
            </Space>
                {this.state.showConfig && <Card
                    className={Style.correlation_option}>
                    <Form layout="inline" ref={this.formRef}>
                        <Row gutter={8}>
                            <Col span={12} className="vertical-divider">
                                <Select value={factorId} onChange={this.onFactorChange} placeholder="请选择监测因素" style={{ width: '100%', marginBottom: 18 }} size="large">
                                    {
                                        factorData ?
                                            factorData.map(f => <Option key={f.id} value={f.id}>{f.name}</Option>) : []
                                    }
                                </Select>
                                <Select placeholder="请选择测点" style={{ width: '100%' }} size="large" mode="multiple"
                                    onChange={this.onStationChange} allowClear='true'
                                    value={stationIds}
                                    filterOption={(input, option) => Func.selectFilterOption(input, option)}>
                                    {
                                        stationData ?
                                            stationData.map(s => <Option key={s.id} value={s.id}><p title={s.name}>{s.name}</p></Option>) : []
                                    }
                                </Select>
                            </Col>
                            <Col span={12}>
                                <Select value={correlationFactorId} onChange={this.onCorrelationFactorChange} placeholder="请选择关联监测因素" style={{ width: '100%', marginBottom: 18 }} size="large">
                                    {
                                        correlationFactorData ?
                                            correlationFactorData.map(f => <Option key={f.id} value={f.id}>{f.name}</Option>) : []
                                    }
                                </Select>
                                <Select placeholder="请选择关联测点" style={{ width: '100%' }} size="large" mode="multiple"
                                    onChange={this.onCorrelationStationChange} allowClear='true'
                                    value={correlationStationIds}
                                    filterOption={(input, option) => Func.selectFilterOption(input, option)}>
                                    {
                                        correlationStationData ?
                                            correlationStationData.map(s => <Option key={s.id} value={s.id}><p title={s.name}>{s.name}</p></Option>)
                                            : []
                                    }
                                </Select>
                            </Col>
                        </Row>
                        <div style={{ padding: '18px 0px' }}>
                            <RangePicker size="large" style={{ width: '100%' }}
                                value={[moment(currStartTime), moment(currEndTime)]}
                                // defaultValue={[moment().add(-1, 'days'), moment()]}
                                format="YYYY/MM/DD HH:mm:ss"
                                onChange={this.onDateRangeChange}
                                showTime
                            />
                        </div>
                    </Form>
                    <div style={{ textAlign: 'center' }}>
                        <Row>
                            <Col offset={4} span={8}>
                                <Button onClick={this.correlationConfigClick}>取消</Button>
                            </Col>
                            <Col span={4}>
                                <Button type="primary" onClick={this.btnQuery}>查询</Button>
                            </Col>
                        </Row>
                    </div>
                </Card>
                }
            </Row>
        )
    }
}

function mapStateToProps(state) {
    const { thresholdFactors, thresholdStructures, auth, correlationData, analysisCedian } = state;
    let isRequesting = thresholdStructures.isRequesting || thresholdFactors.isRequesting
        || correlationData.isRequesting;

    return {
        isRequesting: isRequesting,
        factors: thresholdFactors.data,
        structures: thresholdStructures.data,
        user: auth.user,
        stations: analysisCedian.data,
        correlationData: correlationData.data
    }
}

export default connect(mapStateToProps)(Correlation);