'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Select, DatePicker, Checkbox, message } from 'antd';
import { buildUrl } from '@peace/utils'
import { DataServiceApiTable } from '../constant';
const Option = Select.Option;
const FormItem = Form.Item;
const createForm = Form.create;
const { RangePicker, MonthPicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;

class BatchDownloadFilesModal extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            startValue: null,
            endValue: null,
            endOpen: false,
        }
    }

    handleOk = () => {
        let { startValue, endValue } = this.state;
        let { dispatch, strucList, batchDownload } = this.props;
        if (!startValue || !endValue) {
            return message.error("请选择时间范围")
        }
        const form = this.formRef.current;
        form.validateFields().then(values => {
            let startObject = startValue.toObject();
            startObject.months += 1;
            let endObject = endValue.toObject();
            endObject.months += 1;
            let structs = [];
            for (let struc of values.structs) {
                structs.push({
                    id: strucList.filter(s => s.name == struc)[0].id,
                    name: struc,
                })
            }
            let data = {
                
                startValue: startObject,
                endValue: endObject,
                structs: structs,
                dataType: values.dataType
            };
            let iframeSrc = buildUrl(`${DataServiceApiTable.batchDownload}?value=${JSON.stringify(data)}&random=${Math.random()}`)
            batchDownload(encodeURI(iframeSrc))
            this.handleCancel();
        })
    }

    handleCancel = () => {
        const form = this.formRef.current;
        this.props.closeModal();
        this.setState({ startValue: null, endValue: null })
        form.resetFields()
    }

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    onStartChange = (value, string) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    render() {
        const { visible, strucList } = this.props;
        const { startValue, endValue, endOpen } = this.state;
        return (
            <Modal
                maskClosable={false}
                title="数据盘文件批量下载"
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                cancelText="取消"
                okText="下载"
                width={800}
            >
                <Form layout="horizontal" ref={this.formRef}>
                    <FormItem id="structs" label={"结构物"} name='structs'
                        rules={[
                            { required: true, message: '不能为空' }
                        ]}
                    >
                        <Select
                            mode="multiple"
                            // style={{ width: '100%' }}
                            placeholder="请选择结构物"
                            showSearch="true"
                        >
                            {
                                strucList ? strucList.map(s => <Option value={s.name} key={s.name}>{s.name}</Option>) : null
                            }
                        </Select>
                    </FormItem>
                    <FormItem id="dateRange" label={<span><span style={{ color: 'red' }}>*</span> 时间范围</span>} >
                        {/* {getFieldDecorator('dateRange', {
                            rules: [
                                { message: '不能为空' }
                            ],
                        })( */}
                        <div>
                            <MonthPicker
                                disabledDate={this.disabledStartDate}
                                format="YYYY-MM"
                                value={startValue}
                                placeholder="开始时间"
                                onChange={this.onStartChange}
                                onOpenChange={this.handleStartOpenChange}
                                style={{ width: '48%' }}
                                className="startMonthPicker"
                            />
                            &nbsp;~&nbsp;
                            <MonthPicker
                                disabledDate={this.disabledEndDate}
                                format="YYYY-MM"
                                value={endValue}
                                placeholder="结束时间"
                                onChange={this.onEndChange}
                                open={endOpen}
                                onOpenChange={this.handleEndOpenChange}
                                style={{ width: '48%' }}
                            />
                        </div>
                        {/* )} */}
                    </FormItem>
                    <FormItem id="dataType" label={"数据范围"} name='dataType'
                        rules={[
                            { required: true, message: '不能为空' }
                        ]}
                    >
                        <CheckboxGroup options={[
                            { label: '测点数据', value: 'theme' },
                            { label: '设备数据', value: 'raw' },
                        ]} />
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default connect()(BatchDownloadFilesModal)