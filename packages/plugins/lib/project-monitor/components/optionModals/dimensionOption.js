'use strict'
import React, { Component } from 'react';
import { Form, Select, DatePicker, Input, InputNumber, Row, Col, Button, Popover, Collapse } from 'antd';
import moment from 'moment';
import PerfectScrollbar from 'perfect-scrollbar';
import Style from '../../style.css';

const FormItem = Form.Item;
const Option = Select.Option;

class DimensionOption extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            dimensionUnit: props.info ?
                props.info.type == "dimension" ?
                    props.info.dimension.scheme ? props.info.dimension.scheme.unit : "minute"
                    : null
                : null,
            dimensionMode: props.info ?
                props.info.type == "dimension" ?
                    props.info.dimension.scheme ? props.info.dimension.scheme.mode : "R"
                    : null
                : null,
            showSenior: false,
        }
    }

    _deleteDimension = () => {
        const { info, deleteDimension } = this.props;
        deleteDimension(info)
    }


    _changeDimensionUnit = (value) => {
        this.setState({ dimensionUnit: value });
    }

    _changeDimensionMode = (value) => {
        this.setState({ dimensionMode: value });
    }

    handleChangeDimension = (e) => {
        const { info, handleSave } = this.props;
        const { dimensionUnit } = this.state;
        this.formRef.current.validateFields().then(values => {
            let value = Object.assign({}, values);
            value.unit = dimensionUnit;
            // values.repeats = null;
            value.id = info.dimension.scheme ?
                info.dimension.scheme.id : info.dimension.id;
            value.dimensionId = info.dimension.scheme ?
                info.dimension.scheme.id : info.dimension.id;
            value.beginTime = values.beginTime ?
                moment(values.beginTime).toISOString() : moment().toISOString();
            value.endTime = values.endTime ?
                moment(values.endTime).toISOString() : null;
            value.interval = values.interval_1;
            handleSave(info, value);
        });
    }

    validateInterval = async (rule, value) => {
        if (this.state.dimensionUnit == 'minute' && value < 5) {
            return Promise.reject('最小间隔支持为5分钟');
        }
        return Promise.resolve();
    }

    getFormItems = (info) => {
        const { isEdit } = this.props;
        const { dimensionMode } = this.state;
        const formItemDimensionLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 15 }
        }

        if (info) {
            if (info.type == "dimension") {
                const deleteContent = (
                    <Row style={{ textAlign: "center", padding: "7px 0" }}>
                        <Col span={12}><Button size="small" onClick={this._closePopover}>取消</Button></Col>
                        <Col span={12}><Button type="primary" size="small" onClick={this._deleteDimension}>确定</Button></Col>
                    </Row>
                )
                return (
                    <div>
                        <Form
                            ref={this.formRef}
                            name="dimensionForm"
                            id="dimensionForm"
                            scrollToFirstError
                        >
                            <FormItem {...formItemDimensionLayout} label="采集策略"
                                name={`dimensionName`}
                                initialValue={info.hasOwnProperty('dimension') && info.dimension.scheme ? info.dimension.scheme.name : info.dimension.name}
                                rules={[{
                                    required: true, message: "请输入采集策略"
                                }]}
                            >
                                <Input disabled={true} />
                            </FormItem>
                            <FormItem {...formItemDimensionLayout} label="监测方式"
                                name={`mode`}
                                initialValue={info.hasOwnProperty('dimension') && info.dimension.scheme ? info.dimension.scheme.mode : "R"}
                                rules={[{
                                    required: true, message: "请选择监测方式"
                                }]}
                            >
                                <Select onChange={this._changeDimensionMode}>
                                    <Option value="R">周期</Option>
                                    <Option value="L">监听</Option>
                                </Select>
                            </FormItem>
                            <FormItem {...formItemDimensionLayout} label="间隔" style={dimensionMode == "R" ? {} : { display: "none" }}
                                name={`interval_1`}
                                initialValue={info.hasOwnProperty('dimension') && info.dimension.scheme ? info.dimension.scheme.interval : 30}
                                rules={[{
                                    required: true, message: `请输入间隔时间`,
                                }, {
                                    validator: this.validateInterval
                                }]}
                            >
                                <InputNumber style={{ width: '75%', marginRight: 0 }} disabled={!isEdit} />
                                <Select value={this.state.dimensionUnit} style={{ width: '25%' }} onChange={this._changeDimensionUnit}>
                                    <Option value="month">月</Option>
                                    <Option value="week">周</Option>
                                    <Option value="day">日</Option>
                                    <Option value="hour">时</Option>
                                    <Option value="minute">分</Option>
                                    {/* <Options value="second">秒</Options> */}
                                </Select>
                            </FormItem>
                            <FormItem {...formItemDimensionLayout} label="开始时间"
                                name={`beginTime`}
                                initialValue={info.hasOwnProperty('dimension') && info.dimension.scheme ? info.dimension.scheme.beginTime ? moment(info.dimension.scheme.beginTime) : moment() : moment()}
                                rules={[{
                                    required: true, message: `请输入开始时间`
                                }]}
                            >
                                <DatePicker
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                    placeholder="选择开始时间"
                                />
                            </FormItem>
                            <FormItem {...formItemDimensionLayout} label="结束时间"
                                name={`endTime`}
                                initialValue={info.hasOwnProperty('dimension') && info.dimension.scheme ? info.dimension.scheme.endTime ? moment(info.dimension.scheme.endTime) : null : null}

                            >
                                <DatePicker
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                    placeholder="结束时间，未设置表示无期限"
                                />
                            </FormItem>
                            <FormItem {...formItemDimensionLayout} label="方案数据通知" style={{ display: "none" }}
                                name={`notifyMode`}
                                initialValue={info.hasOwnProperty('dimension') && info.dimension.scheme ? info.dimension.scheme.notifyMode.toString() : "1"}
                                rules={[{
                                    required: true, message: "请选择方案数据通知"
                                }]}
                            >
                                <Select>
                                    <Option value="1">所有设备</Option>
                                    <Option value="2">单个设备</Option>
                                </Select>
                            </FormItem>
                            <FormItem {...formItemDimensionLayout} label="设备数据通知" style={{ display: "none" }}
                                name={'dimension'}
                                initialValue={info.hasOwnProperty('dimension') && info.dimension.scheme ? info.dimension.scheme.capabilityNotifyMode.toString() : "1"}
                            >
                                <Select>
                                    <Option value="1">组合</Option>
                                    <Option value="2">每次</Option>
                                </Select>
                            </FormItem>
                        </Form>
                        <div>
                            <Button type="primary" style={{ marginRight: 24 }} onClick={this.handleChangeDimension}>保存</Button>
                            <Popconfirm title={`确定删除该数据？`}
                                onConfirm={this._deleteDimension}
                                onCancel={() => { }}
                            >删除</Popconfirm>
                        </div>
                    </div>
                );
            }
        }
    }

    componentDidMount() {
        // if (document.getElementById('OptionModal'))
        //     this.Ps = new PerfectScrollbar('OptionModal', { suppressScrollX: true })
    }

    componentDidUpdate() {
        this.Ps ? this.Ps.update() : ''
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.info != this.props.info) {
            const { info } = nextProps
            const curForm = this.formRef.current
            if (curForm) {
                this.formRef.current.resetFields();
            }
            this.setState({
                dimensionUnit: info ? info.type == "dimension" ? info.hasOwnProperty('dimension') && info.dimension.scheme ? info.dimension.scheme.unit : "minute" : null : null,
                dimensionMode: info ? info.type == "dimension" ? info.hasOwnProperty('dimension') && info.dimension.scheme ? info.dimension.scheme.mode : "R" : null : null
            })
        }
    }

    render() {
        const { isEdit, info, height } = this.props;
        return (
            <div className={Style.option_modal} id="OptionModal" style={{ height: height - 72 }}>
                {
                    info ?
                        <div>
                            {this.getFormItems(info)}
                        </div>
                        : null
                }
            </div>
        )
    }
}

export default DimensionOption;