/**
 * Created by wuqun on 2018/6/20.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { findDOMNode } from 'react-dom';
import { Select, Form, Row, Radio, DatePicker, Button, Tooltip } from 'antd';
import { Func } from '@peace/utils';
import { getStructures, getFactors, getStations } from '../../actions/structure';//获取结构物
import { getAbnMethods, getAbnParamList, getAbnTaskResult } from '../../actions/abnParamCfg';
import { getAbnFilterCfgs } from '../../actions/abnFilterCfg';
import FactorAndStations from './factorAndStations';

const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

const apiUrl = {
    getAbnParamList: "struct/{id}/abnormal/params"
};

class StructSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: 'reCalc',
            currStartTime: moment().add(-1, 'days').format('YYYY-MM-DD HH:mm:ss'),
            currEndTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            showParamsCfg: false,
            stationsValue: [],
            mType: 'interrupt',
        }
    }
    formRef = React.createRef();
    componentWillUnmount() {
        this.props.dispatch({ type: 'ABN_DATA_CALC_CLEAR' });
        this.props.dispatch({ type: 'ABN_DATA_INTERRUPT_CALC_CLEAR' });
        this.props.dispatch({ type: 'ABN_DATA_BURR_CALC_CLEAR' });
        this.props.dispatch({ type: 'ABN_DATA_TREND_CALC_CLEAR' });
    }
    UNSAFE_componentWillMount() {
        this.setState({ activeKey: this.props.activeKey });
        const { dispatch, user } = this.props;
        //获取异常过滤识别算法
        dispatch(getAbnMethods());
        dispatch(getStructures(user.orgId))//获取结构物
            .then(action => {
                if (action.payload.data.length > 0) {
                    this.setState({
                        structId: action.payload.data[0].id,
                        structName: action.payload.data[0].name
                    }, () => {
                        dispatch(getFactors(this.state.structId)).then(res => {
                            if (res && res.payload.data.length > 0) {
                                let factors = res.payload.data.filter(f => f.checked);
                                let deItemId = factors.filter(s => s.id == factors[0].id)[0].items[0].id;
                                this.setState({
                                    factorId: factors[0].id,
                                    reCalcFactorId: factors[0].id,
                                    itemId: deItemId,
                                    //defaultRadioValue: factors.filter(s => s.id == factors[0].id)[0].items[0].id,
                                }, () => {
                                    //获取测点
                                    dispatch(getStations(this.state.structId, this.state.factorId)).then(res => {
                                        if (res.success) {
                                            let stationsValue = res.payload.data[0] && res.payload.data[0].id;
                                            this.setState({
                                                stationsValue: [stationsValue]
                                            });
                                        }
                                        this.props.setfactorAndStations(this.state.structId, this.state.factorId, this.state.itemId);
                                        //异常数据识别参数配置列表
                                        dispatch(getAbnParamList(this.state.structId));
                                        //异常过滤配置列表
                                        dispatch(getAbnFilterCfgs(this.state.structId));
                                    });
                                });
                            }
                        });//获取监测因素
                    });
                } else {
                    return Promise.resolve();//     
                }
            });
    }
    onChange = (e) => {
        this.setState({
            activeKey: e.target.value
        });
        this.props.radioChange(e.target.value);
    }

    onStructChange = (structId) => {//结构物改变
        let struct = this.props.structures.find(s => s.id == structId).name;
        this.setState({
            structId: structId,
            structName: struct
        }, () => {
            this.props.dispatch(getFactors(this.state.structId)).then(res => {
                if (res && res.payload.data.length > 0) {
                    let factors = res.payload.data.filter(f => f.checked);
                    let deItemId = factors.filter(s => s.id == factors[0].id)[0].items[0].id;
                    this.setState({
                        factorId: factors[0].id,
                        reCalcFactorId: factors[0].id,
                        itemId: deItemId,
                    }, () => {
                        this.props.dispatch(getStations(this.state.structId, this.state.factorId)).then(res => {
                            if (res.success) {
                                let stationsValue = res.payload.data[0] && res.payload.data[0].id;
                                this.setState({
                                    stationsValue: [stationsValue]
                                });
                            }
                            this.props.setfactorAndStations(this.state.structId, this.state.factorId, this.state.itemId);
                            //获取结构物下异常参数配置列表
                            this.props.dispatch(getAbnParamList(this.state.structId));
                            //异常过滤配置列表
                            this.props.dispatch(getAbnFilterCfgs(this.state.structId));
                        });
                    });
                }
            })
        });
    };
    reCalcFactorChange = (factorId) => {
        this.setState({
            reCalcFactorId: factorId
        });
        this.props.reFaChange(factorId);//重计算和异常过滤筛选用
    }
    timeOnChange = (dates, dateStrings) => {
        if (dates.length == 0) {
            this.setState({
                currStartTime: null,
                currEndTime: null,
            })
            return message.warning('请选择时间');
        }
        this.setState({
            currStartTime: dates[0].format('YYYY-MM-DD HH:mm:ss'),
            currEndTime: dates[1].format('YYYY-MM-DD HH:mm:ss'),
        })
        this.props.setTime(dates[0].format('YYYY-MM-DD HH:mm:ss'), dates[1].format('YYYY-MM-DD HH:mm:ss'));
    }
    showParamsCfg = () => {
        if (!this.state.showParamsCfg) {
            this.setState({ showParamsCfg: true })
        } else {
            this.setState({ showParamsCfg: false })
        }
    }
    renderParamsCfgs() {
        const SubContent = {
            'reCalc': '',
            'abnFilter': <div></div>,
            'abnRecognize':
                <FactorAndStations
                    methodType={this.state.mType}
                    structId={this.state.structId}
                    factorId={this.state.factorId}
                    itemId={this.state.itemId}
                    stationsValue={this.state.stationsValue}
                    factorChange={this.factorChange}
                    stationsChange={this.stationsChange}
                    dataCompara={this.dataCompara}
                    changeMethod={this.changeMethod}
                />,
        };
        return SubContent[this.state.activeKey];
    }
    changeMethod = (value) => {
        this.props.dispatch({ type: 'ABN_DATA_CALC_CLEAR' });
        this.setState({
            mType: value
        });
        this.props.changeMethod(value);
    }
    //数据对比
    dataCompara = (data) => {
        let start = this.state.currStartTime;
        let end = this.state.currEndTime;
        this.props.dispatch(getAbnTaskResult(this.state.structId, start, end, data)).then(res => {
        })
    }
    factorChange = (value) => {
        if (value.length != 0) {
            this.setState({
                factorId: value[0],
                itemId: value[1],
                stationsValue: []
            }, () => {
                //获取测点
                this.props.factorCh(value[0]);
                this.props.dispatch(getStations(this.state.structId, this.state.factorId)).then(res => {
                    if (res.success) {
                        let stationsValue = res.payload.data[0] && res.payload.data[0].id;
                        this.setState({
                            stationsValue: [stationsValue]
                        });
                    }
                });
            })
        } else {//清空
            this.setState({
                factorId: 0,
                itemId: 0,
                stationsValue: []
            })
        }
    }
    stationsChange = (value) => {
        this.setState({
            stationsValue: value
        })
    }
    exporting = () => {
        const { user } = this.props;
        const url = apiUrl.getAbnParamList.replace('{id}', this.state.structId);
        findDOMNode(this.refs.url).value = url + '?token=' + user.token;
        findDOMNode(this.refs.params).value = this.state.structName;
        findDOMNode(this.refs.ifr).contentWindow.name = "ifr";
        findDOMNode(this.refs.form).submit();
    }

    renderFactors = () => {
        const newData = []
        this.props.factors.map(s => {
            if (s.checked) {
                newData.push(<Option key={s.id} value={s.id}>{s.name}</Option>)
            }
        })
        return newData;
    }
    render() {
        const { structures } = this.props;
        return (
            <div style={{ margin: '20px 0 16px 0' }}>
                <Row span="24" >
                    <Form ref={this.formRef} layout="inline" style={{ textAlign: 'left' }}>
                        <Form.Item>
                            <Select value={this.state.structId}
                                onChange={this.onStructChange}
                                placeholder="请选择结构物"
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) => Func.selectFilterOption(input, option)}
                                style={{ width: 274 }}>
                                {
                                    structures ? structures.map(s => <Option key={s.id} value={s.id}>{s.name}</Option>) : []
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item >
                            <RadioGroup onChange={(e) => this.onChange(e)} defaultValue="reCalc">
                                <RadioButton value="reCalc">重计算</RadioButton>
                                <RadioButton value="abnFilter">异常过滤</RadioButton>
                                <RadioButton value="abnRecognize">异常数据识别</RadioButton>
                            </RadioGroup>
                        </Form.Item>
                        {this.state.activeKey != 'abnRecognize' ?
                            <Form.Item>
                                <Select value={this.state.reCalcFactorId} onChange={this.reCalcFactorChange}
                                    placeholder="请选择监测因素" style={{ width: 160 }} >
                                    {this.renderFactors()}
                                </Select>
                            </Form.Item>
                            : ''}

                        {this.state.activeKey != 'abnFilter' ?//异常过滤不需要时间
                            <Form.Item
                                key={"timeSelected"}
                                name={"timeSelected"}
                                initialValue={[moment().add(-1, 'days'), moment()]}
                            >
                                <RangePicker
                                    style={{ paddingLeft: 5 }}
                                    format="YYYY-MM-DD HH:mm:ss"
                                    showTime
                                    placeholder={['开始时间', '结束时间']}
                                    onChange={this.timeOnChange}
                                />
                            </Form.Item>
                            : ''}

                        {this.state.activeKey == 'abnRecognize' ?
                            <Form.Item>
                                <Tooltip placement="topLeft" title={"一键导出当前结构物异常参数配置"}>
                                    <Button type="ghost" onClick={this.exporting}>导出</Button>
                                </Tooltip>
                            </Form.Item> : ''
                        }
                    </Form>
                </Row>
                <iframe ref="ifr" style={{ display: 'none' }}>
                </iframe>
                <form ref="form" action="/exporting/abnCfgs" target="ifr" method="post">
                    <input ref="url" name="url" type="hidden" />
                    <input ref="params" name="params" type="hidden" />
                </form>
                { this.renderParamsCfgs()}
            </div >
        )
    }
}

function mapStateToProps(state) {
    const { auth, thresholdStructures, thresholdFactors, thresholdStations } = state;
    //let isRequesting = thresholdStructures.isRequesting || thresholdFactors.isRequesting;

    return {
        //isRequesting: isRequesting,//请求状态
        structures: thresholdStructures.data,//结构物
        factors: thresholdFactors.data ? thresholdFactors.data.filter(s => s.proto != 2002 && s.proto != 5001 && s.proto != 5002) : [],
        //stations: thresholdStations.data,//测点
        user: auth.user//用户信息
    }
}

export default connect(mapStateToProps)(StructSelect);