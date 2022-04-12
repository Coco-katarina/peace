'use strict'
import React, { Component } from 'react';
import { Form, Select, DatePicker, Input, InputNumber, Row, Col, Button, Popover, Collapse } from 'antd';
import moment from 'moment';

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



    getFormItems = (info) => {
        const { isEdit } = this.props;
        const { dimensionMode } = this.state;
        const formItemDimensionLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 15 }
        }

        if (info) {
            if (info.type == "dimension") {
               
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
                            >
                                <Input disabled={true} />
                            </FormItem>
                            <FormItem {...formItemDimensionLayout} label="监测方式"
                                name={`mode`}
                                initialValue={info.hasOwnProperty('dimension') && info.dimension.scheme ? info.dimension.scheme.mode : "R"}
                            >
                                <Select>
                                    <Option value="R">周期</Option>
                                    <Option value="L">监听</Option>
                                </Select>
                            </FormItem>
                            <FormItem {...formItemDimensionLayout} label="间隔" style={dimensionMode == "R" ? {} : { display: "none" }}
                                name={`interval_1`}
                                initialValue={info.hasOwnProperty('dimension') && info.dimension.scheme ? info.dimension.scheme.interval : 30}
                               
                            >
                                <InputNumber style={{ width: '75%', marginRight: 0 }} disabled={!isEdit} />
                                <Select value={this.state.dimensionUnit} style={{ width: '25%' }} >
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
                    </div>
                );
            }
        }
    }

    componentDidMount() {
    
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