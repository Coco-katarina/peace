import React, { Component } from "react";
import { connect } from "react-redux";
import { getProjectList, getStrategyStructsList } from "../../actions/alarm-strategy-modal";
import { editStrategy, addStrategy, getStrategy } from "../../actions/alarm-strategy-table";
import { PinyinHelper } from '@peace/utils'
import {
    Card,
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    Modal,
    AutoComplete,
    Spin
} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class BroadcastStrategyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alarmLevel: [{ key: 1, label: '一级' }, { key: 2, label: '二级' }, { key: 3, label: '三级' }],
            alarmCategories: [
                { label: "数据类告警", value: "2" },
                { label: "设备类告警", value: "1" }
            ],
            structuresDisabled: true,
        };
    }
    formRef = React.createRef();

    UNSAFE_componentWillMount() {
        this.props.dispatch(getProjectList(this.props.user.id));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const form = this.formRef.current;
        if (this.props.visible != nextProps.visible && nextProps.visible == true && nextProps.isEdit) {
            let modalData = nextProps.modalData;
            this.props.dispatch(getStrategyStructsList(this.props.user.orgId, []));
            if(form){
                form.setFieldsValue({
                    structures: modalData.siteStructs,
                    deviceId: modalData.broadcastDeviceId,
                    categories: modalData.alarmCategories.map(c => String(c)),
                    alarmLevel: modalData.broadcastAlarmLevels,
                    isEnable: modalData.enabled,
                })
            }
            this.setState({
                structuresDisabled: false
            })
        }
    }

    selectProjectList = () => {
        const { strategyModal } = this.props;
        let selectChildProjects = [<Option key="all">全部</Option>];
        if (!strategyModal.projectList.length) {
            return;
        }
        for (let i in strategyModal.projectList) {
            let currProject = strategyModal.projectList[i].projects[0];
            selectChildProjects.push(
                <Option key={currProject.id} value={currProject.id}>
                    {currProject.name}
                </Option>
            );
        }
        return selectChildProjects;
    };

    projectChange = val => {
        const form = this.formRef.current;
        const { dispatch, strategyModal, user } = this.props;
        let structuresDisabled = true;
        if (val.length) {
            structuresDisabled = false;
        }
        if (val.includes('all')) {
            let data = strategyModal.projectList;
            val = data.map(k => {
                return k.projects[0].id;
            })
        }
        dispatch(getStrategyStructsList(user.orgId, val));
        form.setFieldsValue({ structures: [] });
        this.setState({
            structuresDisabled
        });
    };

    selectStructList = () => {
        const { strategyModal } = this.props;
        let selectChildStruct = [<Option key="all">全部</Option>];
        if (!strategyModal.structList.length) {
            return;
        }
        for (let i in strategyModal.structList) {
            let currStruc = strategyModal.structList[i];
            selectChildStruct.push(
                <Option key={currStruc.id} value={currStruc.id}>
                    {currStruc.name}
                </Option>
            );
        }
        return selectChildStruct;
    };

    submit = () => {
        const form = this.formRef.current;
        const { dispatch, strategyModal, user, isEdit, modalData } = this.props;
        form.validateFields().then(values => {
                let categoriesArr = [];
                let structuresArr = [];
                for (let i in values.categories) {
                    if (values.categories[i] != "all") {
                        categoriesArr.push(parseInt(values.categories[i]));
                    } else {
                        categoriesArr = [1, 2];
                        break;
                    }
                }
                for (let i in values.structures) {
                    if (values.structures[i] != "all") {
                        structuresArr.push(parseInt(values.structures[i]));
                    } else {
                        structuresArr = strategyModal.structList.map(k => {
                            return k.id;
                        });
                        break;
                    }
                }
                let data = {
                    structures: structuresArr,
                    alarmCategories: categoriesArr,
                    broadcastNoticed: true,
                    broadcastAlarmLevels: values.alarmLevel.map(
                        val => {
                            return parseInt(val);
                        }
                    ),
                    broadcastDeviceId: values.deviceId,
                    enabled: values.isEnable ? values.isEnable : false
                };
                if (isEdit) {
                    dispatch(editStrategy(modalData.id, data)).then(() => {
                        this.changeSuccess()
                    });
                } else {
                    dispatch(addStrategy(user.orgId, data)).then(() => {
                        this.changeSuccess()
                    });
                } 
        })
    }

    changeSuccess = () => {
        const { dispatch, user } = this.props;
        dispatch(getStrategy(user.orgId));
        this.beforeClose();
    }

    beforeClose = () => {
        const form = this.formRef.current;
        console.log(form);
        const { closeModal } = this.props;
        form.resetFields();
        closeModal();
    }

    filterOption = (inputValue, option) => {
        const { children } = option.props;
        return (
            children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0 ||
            PinyinHelper.isPinyinMatched(children, inputValue)
        );
    };

    render() {
        const {  visible, isRequesting, isEdit, modalData } = this.props;
        
        const { alarmCategories, structuresDisabled, alarmLevel } = this.state;
        const formItemLayout = {
            labelCol: { sm: { span: 5 } },
            wrapperCol: { sm: { span: 19 } }
        };
        return (
            <div>
                <Modal title="广播策略" maskClosable={false} visible={visible} onOk={this.submit} onCancel={this.beforeClose} width={600} loading={true}>
                    <Spin spinning={isRequesting}>
                        <Form ref={this.formRef}>
                                <FormItem {...formItemLayout} name='project' rules={[{ required: isEdit ? false : true, message: "请选择项目" }]} label="项目" >
                                    <Select
                                        mode="multiple"
                                        style={{ width: "100%" }}
                                        disabled={isEdit}
                                        placeholder="请选择项目"
                                        filterOption={this.filterOption}
                                        onChange={this.projectChange}
                                    >
                                    {this.selectProjectList()}
                                    </Select>
                                </FormItem>
                            
                            <FormItem {...formItemLayout} name='structures' rules={[{ required: true, message: "请选择结构物" }]} label="结构物">
                                <Select
                                    mode="multiple"
                                    style={{ width: "100%" }}
                                    placeholder="请选择结构物"
                                    disabled={structuresDisabled}
                                    filterOption={this.filterOption}
                                >
                                {this.selectStructList()}
                                </Select>  
                            </FormItem>
                            <FormItem {...formItemLayout} name='deviceId' rules={[{ required: true, message: "请填写广播设备ID" }]} label="广播设备ID">
                                <Input maxLength={50} placeholder="请填写广播设备ID"/>
                            </FormItem>
                            <FormItem {...formItemLayout} name='categories' rules={[{ required: true, message: "请选择至少一项接收告警类型：" }]} label="接收告警类型：">
                                <CheckboxGroup options={alarmCategories} onChange={this.categoriesChange} />
                            </FormItem>
                            <FormItem {...formItemLayout} name='alarmLevel' rules={[{ required: true, message: "请选择至少一种告警等级：" }]} label="接收告警等级：">
                              
                                <Select
                                    mode="multiple"
                                    style={{ width: "100%" }}
                                    placeholder="请选择告警等级"
                                    onChange={this.setSmsAlarmLevel}
                                    disabled={this.state.smsSelectDisabled}
                                >
                                {
                                    alarmLevel.map(a => {
                                        return (
                                            <Option key={a.key} value={a.key}>
                                                {a.label}
                                            </Option>
                                        )
                                    })
                                }
                                </Select>
                                
                            </FormItem>
                            <FormItem name='isEnable' valuePropName='checked'>
                               <Checkbox style={{ float: 'right' }}>启用</Checkbox>
                            </FormItem>
                        </Form>
                    </Spin>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { auth, strategyProjectList, strategyStructsList, strategyReceiverList } = state
    return {
        isRequesting: strategyProjectList.isRequesting || strategyProjectList.isRequesting || strategyReceiverList.isRequesting,
        user: auth.user,
        strategyModal: { projectList: strategyProjectList.data || [],  structList: strategyStructsList.data || [], receiverList: strategyReceiverList.data || [] }
    };
}

export default connect(mapStateToProps)(BroadcastStrategyModal);
