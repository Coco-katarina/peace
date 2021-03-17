/**
 * Created by wuqun on 2018/6/19.
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { Chart } from '@peace/components';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Cascader, Select, Modal, Input, Button, Tooltip, DatePicker, Row, Col, Alert, message, Popconfirm } from "antd";
import { createAbnFilterCfg, updateAbnFilterCfg, getAbnFilterCfgs, getAbnFilterTaskResult, updateFilterData } from '../../actions/abnFilterCfg';
import { GetAbnFilterResult } from '../../constants'

const { TimeAbnValueLineChart } = Chart;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

const CalcMedian = 1;//取中值
const LimitAmp = 2;//限幅
const CalcMeanValue = 3;//滑动平均
const CalcStvMean = 4;//方差判断平均
const CalcWindow = 5;//滤波算法
const ExtreAverage = 6;//去极值移动平均
const WeightAverage = 7;//加权滑动平均
const MedianMean = 8;//中值平均
const RangeMean = 9;//限幅平均

class FilterMethodModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            methodType: 'single',
            methodId: null,
            currStartTime: moment().add(-1, 'days').format('YYYY-MM-DD HH:mm:ss'),
            currEndTime: moment().format('YYYY-MM-DD HH:mm:ss'),

            currDataStartTime: null,
            currDataEndTime: null,
            currDataStationId: null,
            currDataInputParams: null,
            currDataMethodId: null,
            currDataData: null
        };
    }
    formRef = React.createRef();
    componentWillUnmount() {
        this.props.dispatch({ type: GetAbnFilterResult.CLEAR });
    }
    componentDidMount() {
        let data = this.props.modalData;
        const form = this.formRef.current;
        if (data) {
            let paramToshow = this.setValueList(data);
            form.setFieldsValue({
                factorStation: data.factorName + "/" + data.itemName + "/" + data.stationName,
                method: [data.methodType, data.methodId],
                params: paramToshow
            });
        }
    }
    setValueList = (data) => {
        var parList = "";
        switch (data.methodId) {
            case MedianMean:
            case WeightAverage:
            case CalcMeanValue:
            case CalcMedian:
                parList = data.windowSize + '';
                break;
            case LimitAmp:
                parList = data.params.Kt + '';
                break;
            case CalcStvMean:
                parList = data.params.Ru + "，" + data.windowSize;
                break;
            case CalcWindow:
                parList = data.params.Dt + "，" + data.params.Kt + "，" + + data.params.Rt + "，" + data.windowSize;
                break;
            case ExtreAverage:
                parList = data.params.Ru + "，" + data.params.Kt + "，" + data.windowSize;
                break;
            case RangeMean:
                parList = data.params.Kt + "，" + data.windowSize;
                break;
            default:
                break;
        }
        return parList;
    }

    //保存配置
    enableAlgorithm = () => {
        let data = this.props.modalData;
        let methods = this.props.methods;
        const form = this.formRef.current;
        form.validateFields().then(values => {
            let stationId = values.station;
            let inputParams = values.params.split('，');//中文
            let pushData = this.stitchParas(data, stationId, this.state.methodId, inputParams);

            if (data) {//编辑保存
                this.props.dispatch(updateAbnFilterCfg(data.id, pushData)).then(_ => {
                    this.props.dispatch(getAbnFilterCfgs(this.props.structId)).then(() => {
                        this.props.closeModal();
                    });
                });
            } else {
                //新增时判断是否已存在该测点在该监测项,该算法下参数配置
                let cfg = this.props.filterCfgs && this.props.filterCfgs.find(a => a.factorId == this.props.factorId && a.itemId == this.props.itemId
                    && a.stationId == stationId && a.methodId == this.state.methodId);
                if (!cfg) {
                    this.props.dispatch(createAbnFilterCfg(pushData)).then(_ => {
                        this.props.dispatch(getAbnFilterCfgs(this.props.structId)).then(() => {
                            this.props.closeModal();
                        });
                    });
                } else {
                    let method = methods[this.state.methodType].filter(m => m.id == this.state.methodId)[0].name;
                    message.warning('已存在该测点在选中监测项下的' + method + '配置！');
                }
            }
        });
    };
    stitchParas = (editData, stationId, methodId, inputParams) => {
        var data = {};
        switch (parseInt(editData ? editData.methodId : methodId)) {
            case MedianMean:
            case WeightAverage:
            case CalcMeanValue:
            case CalcMedian:
                data = {
                    "stationId": editData ? editData.stationId : stationId,
                    "factorId": editData ? editData.factorId : this.props.factorId,
                    "itemId": editData ? editData.itemId : this.props.itemId,
                    "methodId": editData ? editData.methodId : methodId,
                    "windowSize": inputParams[0],
                    "params": null,
                    "enable": true,
                    "updateTime": moment().format('YYYY-MM-DD HH:mm:ss')
                };
                break;
            case LimitAmp:
                data = {
                    "stationId": editData ? editData.stationId : stationId,
                    "factorId": editData ? editData.factorId : this.props.factorId,
                    "itemId": editData ? editData.itemId : this.props.itemId,
                    "methodId": editData ? editData.methodId : methodId,
                    "windowSize": 1,//限幅 窗口规定为1
                    "params": { "Kt": inputParams[0] },
                    "enable": true,
                    "updateTime": moment().format('YYYY-MM-DD HH:mm:ss')
                };
                break;
            case CalcStvMean:
                data = {
                    "stationId": editData ? editData.stationId : stationId,
                    "factorId": editData ? editData.factorId : this.props.factorId,
                    "itemId": editData ? editData.itemId : this.props.itemId,
                    "methodId": editData ? editData.methodId : methodId,
                    "windowSize": inputParams[1],
                    "params": { "Ru": inputParams[0] },
                    "enable": true,
                    "updateTime": moment().format('YYYY-MM-DD HH:mm:ss')
                };
                break;
            case CalcWindow:
                data = {
                    "stationId": editData ? editData.stationId : stationId,
                    "factorId": editData ? editData.factorId : this.props.factorId,
                    "itemId": editData ? editData.itemId : this.props.itemId,
                    "methodId": editData ? editData.methodId : methodId,
                    "windowSize": inputParams[3],
                    "params": { "Kt": inputParams[1], "Dt": inputParams[0], "Rt": inputParams[2] },
                    "enable": true,
                    "updateTime": moment().format('YYYY-MM-DD HH:mm:ss')
                };
                break;
            case ExtreAverage:
                data = {
                    "stationId": editData ? editData.stationId : stationId,
                    "factorId": editData ? editData.factorId : this.props.factorId,
                    "itemId": editData ? editData.itemId : this.props.itemId,
                    "methodId": editData ? editData.methodId : methodId,
                    "windowSize": inputParams[2],
                    "params": { "Ru": inputParams[0], "Kt": inputParams[1] },
                    "enable": true,
                    "updateTime": moment().format('YYYY-MM-DD HH:mm:ss')
                };
                break;
            case RangeMean:
                data = {
                    "stationId": editData ? editData.stationId : stationId,
                    "factorId": editData ? editData.factorId : this.props.factorId,
                    "itemId": editData ? editData.itemId : this.props.itemId,
                    "methodId": editData ? editData.methodId : methodId,
                    "windowSize": inputParams[1],
                    "params": { "Kt": inputParams[0] },
                    "enable": true,
                    "updateTime": moment().format('YYYY-MM-DD HH:mm:ss')
                };
                break;
            default:
                break;
        }
        return data;
    }
    judgeParType = (methodId, parNow2) => {
        var parList = true;
        var par2 = true;
        var par3 = true;
        var par4 = true;
        switch (parseInt(methodId)) {
            case MedianMean:
            case WeightAverage:
            case CalcMeanValue:
            case CalcMedian:
                parList = this.textValidate(parNow2[0], '正整数');
                break;
            case LimitAmp:
                parList = this.textValidate(parNow2[0], '正数');
                break;
            case CalcStvMean:
                parList = this.textValidate(parNow2[0], '正数');
                par2 = this.textValidate(parNow2[1], '正整数');
                break;
            case CalcWindow:
                parList = this.textValidate(parNow2[0], '正整数');
                par2 = this.textValidate(parNow2[1], '正数');
                par3 = this.textValidate(parNow2[2], '正整数');
                par4 = this.textValidate(parNow2[3], '正整数');
                break;
            case ExtreAverage:
                parList = this.textValidate(parNow2[0], '数字');
                par2 = this.textValidate(parNow2[1], '数字');
                par3 = this.textValidate(parNow2[2], '正整数');
                break;
            case RangeMean:
                parList = this.textValidate(parNow2[0], '正数');
                par2 = this.textValidate(parNow2[1], '正整数');
                break;
            default:
                break;
        }
        if (parList && par2 && par3 && par4) {
            return true;
        } else {
            return false;
        }
    }
    textValidate = (value, type) => {
        var reg = '';

        if (type == '数字') {
            reg = /^-?\d+(\.\d+)?$/;
        } else if (type == '正整数') {
            reg = /^[1-9]\d*$/;
        } else if (type == '正数') {
            reg = /^\d+(\.\d+)?$/;
        } else {
            return true;
        }
        return reg.test(value);
    }
    checkParams = async (rule, value) => {
        if (value) {
            let data = this.props.modalData;
            let params;
            let valueResult;
            let inputParam = value.split('，');//中文
            if (data) {//编辑时验证的
                params = this.props.methods[data.methodType].filter(m => m.id == data.methodId) || [];
                valueResult = this.judgeParType(data.methodId, inputParam);
            } else {
                params = this.props.methods[this.state.methodType].filter(m => m.id == this.state.methodId) || [];
                valueResult = this.judgeParType(this.state.methodId, inputParam);
            }
            let paramNumber = JSON.stringify(params.length && params[0].params).split(',').length;
            if (inputParam.length != paramNumber) {
                throw new Error('请录入相同个数的参数值');
            }
            if (!valueResult) {
                throw new Error('请录入对应类型的参数值');
            }
        }
    };
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
    }
    //数据对比
    dataCompare = () => {
        let data = this.props.modalData;
        const form = this.formRef.current;
        form.validateFields().then(values => {
            let stationId = values.station;
            let inputParams = values.params.split('，');//中文
            let pushData = this.stitchParas(data, stationId, this.state.methodId, inputParams);
            let start = this.state.currStartTime;
            let end = this.state.currEndTime;
            this.props.dispatch(getAbnFilterTaskResult(start, end, pushData)).then(res => {
                if (res.type == 'GET_ABN_FILTER_RESULT_SUCCESS') {
                    this.setState({
                        currDataStartTime: start,
                        currDataEndTime: end,
                        currDataStationId: stationId,
                        currDataInputParams: inputParams,
                        currDataMethodId: this.state.methodId,
                        currDataData: data,
                    })
                } else if (res.type === 'GET_ABN_FILTER_RESULT_ERROR') {
                    let error = res.payload.error == 'unstable window' ? '输入参数不能满足计算要求！' : res.payload.error;
                    message.error(error);
                }
            })
        });
    }
    //更新数据
    updateData = () => {
        let editData = this.props.modalData;
        let { currDataStartTime, currDataEndTime, currDataStationId, currDataInputParams, currDataMethodId, currDataData } = this.state;
        const form = this.formRef.current;
        form.validateFields().then(values => {
            let stationId = values.station;
            let data = this.props.abnFilterCompData;
            let uploadData = {
                structId: this.props.structId,
                factorId: this.props.factorId,
                stationId: editData ? editData.stationId : stationId,
                itemKey: data.itemKey,
                //calcFilterData: data.calcData,
                startTime: currDataStartTime,
                endTime: currDataEndTime,
                config: this.stitchParas(currDataData, currDataStationId, currDataMethodId, currDataInputParams)
            };
            this.props.dispatch(updateFilterData(uploadData)).then(res => {
            })
        });
    };

    renderFactorAndItems = () => {
        const newData = []
        if (this.props.factors) {
            this.props.factors.map(s => {
                if (s.checked) {
                    newData.push({
                        value: s.id, label: s.name,
                        children: s.items.map(k => { return { key: k.id, value: k.id, label: k.name } })
                    })
                }
            });
        }
        return newData;
    }
    renderMethods = () => {
        const methodArray = [];
        if (this.props.methods) {
            methodArray.push({
                value: 'single', label: '单一方法',
                children: this.props.methods['single'].map(k => { return { key: k.id, value: k.id, label: k.name } })
            });
            methodArray.push({
                value: 'composite', label: '复合方法',
                children: this.props.methods['composite'].map(k => { return { key: k.id, value: k.id, label: k.name } })
            });
        }
        return methodArray;
    }
    onFilFactorChange = (value) => {
        this.props.filFactorChange(value);
    }

    methodChange = (value) => {
        this.setState({
            methodType: value[0],
            methodId: value[1]
        });
    }
    getPlaceholder = () => {
        let string = '选择算法后输入';
        if (this.state.methodId && this.props.methods[this.state.methodType].filter(m => m.id == this.state.methodId).length > 0) {
            let params = this.props.methods[this.state.methodType].filter(m => m.id == this.state.methodId)[0].params;
            string = JSON.stringify(params);
        }
        let data = this.props.modalData;
        if (data) {
            let paramsEdit = this.props.methods[data.methodType].filter(m => m.id == data.methodId)[0].params;
            string = JSON.stringify(paramsEdit);
        }
        return string;
    }

    render() {
        const { abnFilterCompData } = this.props;
        let dataArray = ['还没查询'], itemName, start, end;
        let stationsData = [];
        if (abnFilterCompData) {
            dataArray = abnFilterCompData.calcData;
            itemName = abnFilterCompData.itemName;
            start = dataArray && dataArray.length > 0 ? dataArray[0].time : '';
            end = dataArray && dataArray.length > 0 ? dataArray[dataArray.length - 1].time : '';

            for (let i = 0; i < dataArray.length; i++) {
                let one = { name: itemName + "（单位：" + abnFilterCompData.unit + "）", value: dataArray[i].keyData, time: dataArray[i].time };
                stationsData.push(one);
            }
            for (let i = 0; i < dataArray.length; i++) {
                let one = { name: "处理后数据", value: dataArray[i].calcData, time: dataArray[i].time };
                stationsData.push(one);
            }
        }
        let toShowChart = dataArray && dataArray[0] != '还没查询' && dataArray.length > 0;
        let title = this.props.modalData ? "编辑过滤算法" : "添加过滤算法";
        return <div>
            <Modal maskClosable={false} title={title} visible={this.props.visible} onCancel={this.props.closeModal} width={'70%'}
                footer={[<div>
                    <Button key="cancel" onClick={this.props.closeModal}>关闭</Button>
                </div>]}>
                <Form ref={this.formRef} layout="inline">
                    <Alert style={{ marginBottom: 25 }}
                        message='参数填写规则：多个参数间用中文输入法下的逗号隔开。如：参数输入框提示{"窗口":"正整数","波幅":"正数"}，则录入正整数，正数'
                        type="warning"
                        showIcon />
                    <Row style={{ marginBottom: 25 }}>
                        {
                            this.props.modalData ?
                                <FormItem
                                    name="factorStation"
                                    key="factorStation"
                                >
                                    <Input style={{ width: 180 }} id="factorStation" disabled={true} />
                                </FormItem>
                                :
                                <FormItem>
                                    <Cascader id='factorAndItem' value={[this.props.factorId, this.props.itemId]}
                                        onChange={this.onFilFactorChange} style={{ textAlign: 'left', width: 180 }}
                                        options={this.renderFactorAndItems()} placeholder="请选择监测项" />
                                </FormItem>
                        }
                        {
                            !this.props.modalData ?
                                <FormItem
                                    name="station"
                                    key="station"
                                    rules={[{ required: true, message: "请选择测点" }]}
                                >
                                    <Select placeholder="请选择" style={{ height: 32, width: 180 }}>
                                        {
                                            this.props.stations ? this.props.stations.map(s => {
                                                return <Option key={s.id} value={s.id}>{s.name}</Option>
                                            }) : []
                                        }
                                    </Select>
                                </FormItem>
                                : ''
                        }
                        <FormItem
                            name="method"
                            key="method"
                            rules={[{ required: true, message: "请选择过滤算法" }]}>
                            <Cascader id='method' disabled={this.props.modalData ? true : false}
                                onChange={this.methodChange} style={{ textAlign: 'left', width: 180 }}
                                options={this.renderMethods()} placeholder="请选择过滤算法" />
                        </FormItem>
                        <Tooltip placement="topLeft" title={this.getPlaceholder()}>
                            <FormItem
                                name="params"
                                key="params"
                                rules={[
                                    { required: true, message: "请输入参数" },
                                    { validator: this.checkParams }
                                ]}
                            >
                                <Input style={{ width: 180 }}
                                    placeholder={this.getPlaceholder()} />

                            </FormItem>
                        </Tooltip>
                    </Row>

                    <Row style={{ marginBottom: 25, width: '100%' }}>
                        <FormItem
                            name="timeSelected"
                            key="timeSelected"
                            initialValue={[moment().add(-1, 'days'), moment()]}
                        >
                            <RangePicker
                                format="YYYY-MM-DD HH:mm:ss"
                                showTime
                                placeholder={['开始时间', '结束时间']}
                                onChange={this.timeOnChange}
                            />
                        </FormItem>
                        <Form.Item>
                            <Button size='default' type="default" onClick={this.dataCompare}>结果预览</Button>
                        </Form.Item>
                        <Form.Item>
                            <Popconfirm title="此功能会替换之前数据，确认继续更新数据?" onConfirm={this.updateData}>
                                <Button size='default' type="default" disabled={!toShowChart}
                                // onClick={this.updateData}
                                >更新数据</Button>
                            </Popconfirm>
                        </Form.Item>
                        <Form.Item>
                            <Button size='default' type="primary" onClick={this.enableAlgorithm}>保存配置</Button>
                        </Form.Item>
                    </Row>

                    <div className="data-chart-container" style={{ width: '100%' }}>
                        {dataArray && dataArray[0] == '还没查询' ?
                            <div style={{ margin: '30px 0' }}><InfoCircleOutlined />输入参数，点击结果预览展示数据对比图</div>
                            :
                            toShowChart ?
                                <TimeAbnValueLineChart
                                    key={"dataCalc"}
                                    contentType={'trend'} data={stationsData} width={300} height={300}
                                    itemName={itemName} configs={{ slider: { start: start, end: end } }} />
                                :
                                <div style={{ margin: '30px 0' }}><InfoCircleOutlined /> 没有查询到任何有效数据！</div>}
                    </div>
                </Form>
            </Modal>
        </div >;
    }
}
function mapStateToProps(state) {
    const { thresholdFactors, thresholdStations, abnFilterCalcState, abnFilterConfig } = state;
    return {
        factors: thresholdFactors.data ? thresholdFactors.data.filter(s => s.proto != 2002 && s.proto != 5001 && s.proto != 5002) : [],
        stations: thresholdStations.data,//测点
        abnFilterCompData: abnFilterCalcState.data,
        filterCfgs: abnFilterConfig.data,
    }
}

export default connect(mapStateToProps)(FilterMethodModal);
