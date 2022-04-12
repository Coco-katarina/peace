/**Created by ZhouXin on 2018/10/9. */
'use strict';
import React, { Component } from 'react';
import { Modal, Form, Select, TimePicker, Radio, Switch } from 'antd';
import { AGGTIMEDAYOFWEEK, AGGWEEKINDEX } from '../../constants/AggConfig';
import moment from 'moment';


const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.error;

const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 12 },
}
const format = 'HH';

class AggregateModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dayConfig: false,
            weekConfig: false,
            monthConfig: false,
        }
        this.formRef = React.createRef();

    }


    componentDidMount() {
        this.initModalContext();
    }

    initModalContext = () => {
        let { modalProps } = this.props;
        let { isEdit } = modalProps;
        if (isEdit) {
            this.initModalEditContext(modalProps.modalData.dataToEdit);
        } else {
            this.initModalAddContext();
        }
    }

    initModalAddContext = () => {
        this.setState({ dayConfig: false, weekConfig: false, monthConfig: false })
        this.formRef.current.resetFields();
    }

    initModalEditContext = (modalData) => {
        let { category } = modalData;
        this.initModalAddContext();
        if (category) {
            if (category == 2001) { //日聚集
                this.setState({ dayConfig: true, weekConfig: false, monthConfig: false })
            } else if (category == 2002) {//周聚集
                this.setState({ dayConfig: false, weekConfig: true, monthConfig: false });
            } else if (category == 2003) {//月聚集
                this.setState({ dayConfig: false, weekConfig: false, monthConfig: true })
            } else if (category == 2005) {//时聚集
                this.setState({ dayConfig: false, weekConfig: false, monthConfig: false })
            }
        }
    }

    selectDateList = () => {
        let tempArr = [];
        for (let i in AGGTIMEDAYOFWEEK) {
            tempArr.push(<Option key={i} value={parseInt(i)}>
                {AGGTIMEDAYOFWEEK[i]}
            </Option>);
        }
        return tempArr;
    }

    selectMonthList = () => {
        let tempArr = [];
        for (let i = 1; i < 32; i++) {
            tempArr.push(<Option key={i} value={i}>
                第{i}号
            </Option>);
        }
        return tempArr;
    }

    selectWeekList = () => {
        let tempArr = [];
        for (let i in AGGWEEKINDEX) {
            tempArr.push(<Option key={i} value={i}>
                {AGGWEEKINDEX[i]}
            </Option>);
        }
        return tempArr;
    }

    weekFormItem = (modalProps) => {
        let formItems = [];
        let { getFieldDecorator } = this.formRef.current;
        let { isEdit } = modalProps;

        formItems.push(<FormItem
            {...formItemLayout}
            label='聚集日期范围'
        >
            <FormItem
                name='startDay' noStyle
                // rules={[{ validator: this.dayExists }]}
                initialValue={isEdit ? modalProps.modalData.dataToEdit.startDay ? modalProps.modalData.dataToEdit.startDay : 1 : 1}
            >
                <Select style={{ width: '40%' }} >
                    {this.selectDateList()}
                </Select>
            </FormItem>
            <span style={{ display: 'inline-block', width: '10%', textAlign: 'center' }}>至</span>
            <FormItem
                name='endDay' noStyle
                // rules={[{ validator: this.validateToDayExists }]}
                initialValue={isEdit ? modalProps.modalData.dataToEdit.endDay ? modalProps.modalData.dataToEdit.endDay : 7 : 7}
            >
                <Select style={{ width: '40%' }}>
                    {this.selectDateList()}
                </Select>
            </FormItem>

        </FormItem>);

        return formItems;
    }

    monthFormItem = (modalProps) => {
        let formItems = [];
        let { getFieldDecorator } = this.formRef.current;
        let { isEdit } = modalProps;

        formItems.push(<FormItem
            {...formItemLayout}
            label='聚集日期范围'
        >
            <FormItem
                name='startMonDay' noStyle
                // rules={[{ validator: this.monExists }]}
                initialValue={isEdit ? modalProps.modalData.dataToEdit.startDay ? modalProps.modalData.dataToEdit.startDay : 1 : 1}
            >
                <Select style={{ width: '40%' }} >
                    {this.selectMonthList()}
                </Select>
            </FormItem>

            <span style={{ display: 'inline-block', width: '10%', textAlign: 'center' }}>至</span>
            <FormItem
                name='endMonDay' noStyle
                // rules={[{ validator: this.validateToMonExists }]}
                initialValue={isEdit ? modalProps.modalData.dataToEdit.endDay ? modalProps.modalData.dataToEdit.endDay : 31 : 31}
            >
                <Select style={{ width: '40%' }}>
                    {this.selectMonthList()}
                </Select>
            </FormItem>

        </FormItem >);
        return formItems;
    }

    handleCategoryChange = (value) => {
        if (value == 2001) { //日聚集
            this.setState({ dayConfig: true, weekConfig: false, monthConfig: false })
        } else if (value == 2002) {//周聚集
            this.setState({ dayConfig: false, weekConfig: true, monthConfig: false });
        } else if (value == 2003) {//月聚集
            this.setState({ dayConfig: false, weekConfig: false, monthConfig: true });
        } else if (value == 2005) {//时聚集
            this.setState({ dayConfig: false, weekConfig: false, monthConfig: false })
        }
    }

    handleCancel = () => {
        this.initModalAddContext();
        this.props.onCancel();
    }

    handleOk = () => {
        const { aggConfigList, modalProps } = this.props;
        const { isEdit, modalData } = modalProps;
        this.formRef.current.validateFields().then(values => {
            const aggList = aggConfigList.map(f => { return f.factorId + ',' + f.category });
            let newAggList = aggList;
            if (isEdit) {
                newAggList = aggList.filter(f => { return f != (modalData.dataToEdit.factorId + ',' + modalData.dataToEdit.category) });
            }
            if (newAggList.includes(values.factor + ',' + values.category)) {
                this.renderConfirm(isEdit);
                return;
            }
            this.bubbleOkClickEvent(values, isEdit);
        })
            .catch(errors => {
                if (!!errors) {
                    return;
                }
            })
            ;
    }
    renderConfirm = (isEdit) => {
        confirm({
            title: `该监测因素已存在相同聚集周期配置，无法保存当前操作`,
            okText: '确定'
        });
    }

    bubbleOkClickEvent = (values, isEdit) => {
        const { structId } = this.props;

        let dataToSave = {
            "structId": parseInt(structId),
            "factorId": values.factor,
            "enable": values.enable,
            "category": values.category,
            "algorithm": values.algorithm,
            "startTime": (values.natural != true && values.endHour && values.endHour > 3) ? values.endHour : 3,
            "startHour": values.startHour,//每天时间范围设置开始时间小于结束时间，后期删除
            "endHour": values.endHour,//每天时间范围设置开始时间小于结束时间，后期删除
            "natural": values.natural,
            "startDay": values.startDay ? values.startDay : values.startMonDay ? values.startMonDay : null,
            "endDay": values.endDay ? values.endDay : values.endMonDay ? values.endMonDay : null,
            "delete": false
        };
        this.props.onSave(isEdit, dataToSave);
        this.initModalAddContext();
    }
    //****每天时间范围、聚集日期范围设置开始时间小于结束时间，后期删除 start****
    getItemOptions = () => {
        let tempArr = [];
        for (let i = 0; i < 25; i++) {
            tempArr.push(<Option key={i} value={i}>
                {i}
            </Option>);
        }
        return tempArr;
    }
    timeExists = (rule, value, callback) => {
        let endTime = this.formRef.current.getFieldValue('endHour');
        const natural = this.formRef.current.getFieldValue('natural');
        if (natural == false || value < endTime) {
            callback()
        } else {
            callback([new Error('开始时间需小于结束时间')]);
        }
    }
    validateToTimeExists = (rule, value, callback) => {
        const form = this.formRef.current;
        if (value) {
            form.validateFields(['startHour'], { force: true });
        }
        callback();
    }
    dayExists = (rule, value, callback) => {
        let endDay = this.formRef.current.getFieldValue('endDay');
        if (value < endDay) {
            callback()
        } else {
            callback([new Error('开始时间需小于结束时间')]);
        }
    }
    validateToDayExists = (rule, value, callback) => {
        const form = this.formRef.current;
        if (value) {
            form.validateFields(['startDay'], { force: true });
        }
        callback();
    }
    monExists = (rule, value, callback) => {
        let endDay = this.formRef.current.getFieldValue('endMonDay');
        if (value < endDay) {
            callback()
        } else {
            callback([new Error('开始时间需小于结束时间')]);
        }
    }
    validateToMonExists = (rule, value, callback) => {
        const form = this.formRef.current;
        if (value) {
            form.validateFields(['startMonDay'], { force: true });
        }
        callback();
    }
    //****每天时间范围设置开始时间小于结束时间，后期删除 end****
    render() {
        const { factors, modalProps } = this.props;
        const { dayConfig, weekConfig, monthConfig } = this.state;
        const { isEdit } = modalProps;
        const form = this.formRef.current;
        const selectedNatural = form ? form.getFieldValue('natural') == null ? true : form.getFieldValue('natural') : true;
        let factorFilter = factors ? factors.filter(x => x.checked) : null
        return (
            <Modal
                maskClosable={false}
                visible={true}
                title={isEdit ? '编辑' : '新增'}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
            >
                <Form ref={this.formRef} >
                    <FormItem
                        {...formItemLayout}
                        label="监测因素"
                        name='factor'
                        initialValue={isEdit ? modalProps.modalData.dataToEdit.factorId : factorFilter && factorFilter.length > 0 ? factorFilter[0].id : null}
                    >
                        <Select onChange={this.onFactorChange} placeholder="请选择监测因素"                                >
                            {
                                factorFilter ? factorFilter.map(f => <Option key={f.id} value={f.id}>{f.name}</Option>) : []
                            }
                        </Select>
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="类型"
                        name='category'
                        initialValue={2005}
                    >
                        <Select style={{ width: '100%' }} onChange={this.handleCategoryChange}>
                            <Option value={2005}>时聚集</Option>
                            <Option value={2001}>日聚集</Option>
                            <Option value={2002}>周聚集</Option>
                            <Option value={2003}>月聚集</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="状态"
                        name="enable"
                        valuePropName='checked'
                        initialValue={isEdit ? modalProps.modalData.dataToEdit.enable : true}
                    >
                        <Switch checkedChildren="启用" unCheckedChildren="禁用" />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="聚集方式"
                        name="algorithm"
                        initialValue={3001}
                    >
                        <Select style={{ width: '100%' }} >
                            <Option value={3002}>最大值</Option>
                            <Option value={3001}>平均值</Option>
                            <Option value={3003}>最小值</Option>
                            <Option value={3004}>中值</Option>
                            <Option value={3005}>求和</Option>
                        </Select>

                    </FormItem>
                    {
                        dayConfig ?
                            [<FormItem {...formItemLayout} label='自然日' name='natural'>
                                <Switch checkedChildren="是" unCheckedChildren="否" />
                            </FormItem>
                                ,
                            <FormItem
                                {...formItemLayout}
                                label='每天时间范围'
                            >
                                <FormItem
                                    name='startHour' noStyle
                                    // rules={[{ validator: this.timeExists }]}
                                    initialValue={isEdit ? modalProps.modalData.dataToEdit.startHour : 0}
                                >
                                    <Select style={{ width: '30%' }}>
                                        {this.getItemOptions()}
                                    </Select>
                                </FormItem>
                                <span style={{ display: 'inline-block', width: selectedNatural ? '10%' : '30%', textAlign: 'center' }}>至{selectedNatural == true ? '' : '次日'}</span>
                                <FormItem
                                    name='endHour' noStyle
                                    // rules={[{ validator: this.validateToTimeExists }]}
                                    initialValue={isEdit ? modalProps.modalData.dataToEdit.endHour : 24}
                                >
                                    <Select style={{ width: '30%' }}>
                                        {this.getItemOptions()}
                                    </Select>
                                </FormItem>

                                <span style={{ display: 'inline-block', width: '10%', textAlign: 'center' }}>时</span>
                            </FormItem>] : []
                    }

                    {weekConfig ? this.weekFormItem(modalProps) : ''}
                    {monthConfig ? this.monthFormItem(modalProps) : ''}
                </Form>
            </Modal>
        );
    }
}

export default AggregateModal;