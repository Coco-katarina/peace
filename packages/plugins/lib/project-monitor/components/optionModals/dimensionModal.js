'use strict'
import React, { Component } from 'react';
import { Modal, Popconfirm } from 'antd';
import moment from 'moment';
import PerfectScrollbar from 'perfect-scrollbar';
import Style from '../../style.css';
import { Form } from '@peace/components'

class DimensionModal extends Component {
    constructor(props) {
        super(props);
        this.ps = null;
        this.state = {
            dimensionUnit: props.info ?
                props.info.type && props.info.dimension ?
                    props.info.dimension.scheme ?
                        props.info.dimension.scheme.unit : "minute"
                    : null
                : null,
            dimensionMode: props.info && props.info.dimension ?
                props.info.type ?
                    props.info.dimension.scheme ?
                        props.info.dimension.scheme.mode : "R"
                    : null
                : null,
            showSenior: false,
            now: new Date().getTime(),
            loading: false,
        }
    }

    formRef = React.createRef();


    componentDidMount() {
        this.Ps = new PerfectScrollbar('#OptionModal', { suppressScrollX: true })
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
                dimensionUnit: info ?
                    info.type.includes('dimension') ?
                        info.hasOwnProperty('dimension') && info.dimension.scheme ?
                            info.dimension.scheme.unit
                            : "minute"
                        : null
                    : null,
                dimensionMode: info ?
                    info.type.includes('dimension') ?
                        info.hasOwnProperty('dimension') && info.dimension.scheme ?
                            info.dimension.scheme.mode
                            : "R"
                        : null
                    : null
            })
        }
    }

    _handleSaveDimension = (e) => {
        const { handleOk } = this.props;
        this.state.loading = true;
        const { dimensionUnit } = this.state;
        this.formRef.current.validateFields().then(values => {
            let value = Object.assign({}, { unit: dimensionUnit }, values);
            let isDoubleClick = this._doubleClick();
            if (isDoubleClick == false) {
                handleOk(value);
            }
        })
    }

    _doubleClick = () => {
        let currentTime = new Date().getTime();
        let timeInterval = currentTime - this.state.now;
        if (0 < timeInterval && timeInterval < 1500) {
            return true;
        }
        this.state.now = currentTime;
        return false;
    }

    _deleteDimension = () => {
        const { info, deleteDimension } = this.props;
        deleteDimension(info);
    }

    _changeDimensionUnit = (value) => {
        this.setState({ dimensionUnit: value });
    }

    _changeDimensionMode = (value) => {
        this.setState({ dimensionMode: value });
    }

    handleChangeDimension = () => {
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

    getFormItems = () => {
        const { title, visible, onCancel, info } = this.props;
        const { dimensionMode, dimensionUnit } = this.state;

        const isEdit = info.type == 'modifydimension'
        const scheme = info.dimension && info.dimension.scheme ? info.dimension.scheme : null
        return (
            <Modal
                maskClosable={false}
                title={title}
                okText='保存'
                onOk={isEdit ? this.handleChangeDimension : this._handleSaveDimension}
                visible={visible}
                cancelText={
                    isEdit ?
                        <Popconfirm
                            title={`确定删除该数据？\n ${scheme && scheme.mode == "L" ? "" : "相关信息将同步删除"}`}
                            onConfirm={this._deleteDimension}
                            onCancel={() => { }}
                        >删除</Popconfirm>
                        : '取消'
                }
                cancelButtonProps={{
                    danger: isEdit,
                    onClick: isEdit ? () => { } : onCancel
                }}
                onCancel={onCancel}
                destroyOnClose
            >
                <Form
                    ref={this.formRef}
                    formItems={[{
                        type: "Input",
                        id: "name",
                        label: "名称",
                        rules: [{
                            required: true, max: 20, message: '请输入名称，且最长20个字符',
                        }, {
                            pattern: /^[^\s]+$/, message: '请勿输入空白字符'
                        }, {
                            validator: async (rule, value) => {
                                const { dimensions, info } = this.props;
                                if (info.type != 'modifydimension' && dimensions.dimensions.some(dimension => dimension.name == value)) {
                                    return Promise.reject(`采集策略"${value.toString()}"已被使用`);
                                }
                                return Promise.resolve();
                            },
                        }],
                        itemProps: {
                            maxLength: 20,
                            placeholder: "名称（支持1-20位非空字符）",
                            disabled: isEdit,
                        },
                    }, {
                        type: "Text",
                        id: "desc",
                        label: "描述",
                        containerProps: {
                            style: { display: !isEdit ? 'auto' : 'none' }

                        },
                        rules: [{ max: 140, message: '描述最长为140个字符', }],
                        itemProps: {
                            autosize: { minRows: 3, maxRows: 6 },
                            placeholder: "描述（最长140个字符）",
                        },
                    }, {
                        type: "Select",
                        id: "mode",
                        label: "监测方式",
                        optionsSrc: [
                            { id: 'R', name: '周期' },
                            { id: 'L', name: '监听' },
                        ],
                        rules: [{ required: true, message: "请选择监测方式" }],
                        itemProps: {
                            onChange: this._changeDimensionMode
                        },
                    }, {
                        type: 'Custom',
                        label: "间隔",
                        id:'step',
                        containerProps: {
                            display: dimensionMode == "R" ? 'block' : 'none'
                        },
                        itemChildren: [{
                            type: 'InputNumber',
                            id: 'interval_1',
                            rules: [{
                                required: true, message: "请输入间隔时间"
                            }, {
                                validator: async (rule, value) => {
                                    const { dimensionUnit } = this.state;
                                    if (dimensionUnit == 'minute' && value < 5) {
                                        return Promise.reject('最小间隔支持为5分钟');
                                      
                                    }
                                    return Promise.resolve();
                                },
                            }],
                            containerProps: {
                                style: { width: '70%', display: 'inline-block' },
                            }
                        }, {
                            type: 'Select',
                            id: 'interval_unit',
                            rules: [{
                                required: true, message: "请选择时间单位"
                            }],
                            optionsSrc: [
                                { id: 'month', name: '月' },
                                { id: 'week', name: '周' },
                                { id: 'day', name: '日' },
                                { id: 'hour', name: '时' },
                                { id: 'minute', name: '分' },
                            ],
                            containerProps: {
                                style: { width: '30%', display: 'inline-block' },
                            },
                            itemProps: {
                                allowClear: false,
                                value: dimensionUnit,
                                onChange: this._changeDimensionUnit,
                                placeholder: "请选择时间单位",
                            },
                        }]
                    }, {
                        type: 'DatePicker',
                        id: 'beginTime',
                        label: '开始时间',
                        rules: [{ required: true, message: '请选择开始时间' }],
                        itemProps: {
                            style: { width: '100%' },
                            format: 'YYYY-MM-DD HH:mm:ss',
                            showTime: true,
                        }
                    }, {
                        type: 'DatePicker',
                        id: 'endTime',
                        label: '结束时间',
                        rules: [{ required: false },{
                            validator: async (rule, value) => {
                                const curForm = this.formRef.current;
                                const beginTime = curForm.getFieldValue('beginTime');
                                if( moment(value) <  moment(beginTime)){
                                    return Promise.reject('结束时间不能小于开始时间');
                                }
                                return Promise.resolve();
                            },
                        }],
                        itemProps: {
                            style: { width: '100%' },
                            format: 'YYYY-MM-DD HH:mm:ss',
                            showTime: true,
                            placeholder: '未设置表示无期限'
                        }
                    }, {
                        type: 'Select',
                        id: 'notifyMode',
                        label: '方案数据通知',
                        rules: [{
                            required: true, message: "请选择方案数据通知"
                        }],
                        optionsSrc: [
                            { id: '1', name: '所有设备' },
                            { id: '2', name: '单个设备' },
                        ],
                        containerProps: {
                            style: { display: 'none' }
                        }
                    }, {
                        type: 'Select',
                        id: 'capabilityNotifyMode',
                        label: '设备数据通知',
                        rules: [{
                            required: true, message: "请选择设备数据通知"
                        }],
                        optionsSrc: [
                            { id: '1', name: '组合' },
                            { id: '2', name: '每次' },
                        ],
                        containerProps: {
                            style: { display: 'none' }
                        }
                    }]}
                    formItemLayout={{ labelCol: { span: 5 }, wrapperCol: { span: 19 } }}
                    popupContainerId="addProjectForm"
                    dataToEdit={{
                        name:
                            scheme ?
                                scheme.name : (
                                    info.dimension ?
                                        info.dimension.name : ''
                                ),
                        desc: info.dimension ?
                            info.dimension.desc : undefined,
                        mode: scheme ?
                            scheme.mode : "R",
                        interval_1: scheme ?
                            scheme.interval : 30,
                        interval_unit: dimensionUnit,
                        beginTime: scheme && scheme.beginTime ?
                            moment(scheme.beginTime) : moment(),
                        endTime: scheme && scheme.endTime ?
                            moment(info.dimension.scheme.endTime) : null,
                        notifyMode: scheme ?
                            scheme.notifyMode.toString() : "1",
                        capabilityNotifyMode: scheme ?
                            scheme.capabilityNotifyMode.toString() : "1",
                    }}
                />
            </Modal>
        );
    }

    render() {
        const { info, height } = this.props;
        return (
            <div className={Style.option_modal} id="OptionModal" style={{ height: height - 72 }}>
                {info ?
                    <div>
                        {this.getFormItems(info)}
                    </div>
                    : null
                }
            </div>
        )
    }
}
export default DimensionModal;