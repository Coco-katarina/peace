/**
 * update by zhouxin on 2018/8/20.
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { getProjectList, getStructsList, getReceiverList } from "../../actions/alarm-strategy-modal";
import { getPushList, editPushCfg, addPushCfg } from "../../actions/abnPushCfg";
import { Form, Tooltip, Select, Checkbox, Modal, Alert } from "antd";
import { PinyinHelper } from '@peace/utils';

const FormItem = Form.Item;
const Option = Select.Option;

class AbnPushCfgModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receiverList: [],
            structuresDisabled: true,
        };
    }
    formRef = React.createRef();
    componentDidMount() {
        this.props.dispatch(getProjectList(this.props.user.id));
        this.props.dispatch(getReceiverList(this.props.user.orgId));
        this.initForm();
    }
    //表单类
    btnFormSubmit = () => {
        const form = this.formRef.current;
        
        if (this.props.isEdit) {
            
            form.validateFields().then( values => {
              
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
                            if (!structuresArr.includes(parseInt(values.structures[i]))) {
                                structuresArr.push(parseInt(values.structures[i]));
                            }
                        } else {
                            structuresArr = [];
                            for (let s of this.props.abnPushModal.structList) {
                                if (s.hasAbnReportParams) {
                                    structuresArr.push(s.id)
                                }
                            }
                            // structuresArr = this.props.abnPushModal.structList.map(
                            //     k => {
                            //         return k.id;
                            //     }
                            // );
                            break;
                        }
                    }

                    let data = {
                        noticedUser: parseInt(values.receiver),
                        structures: structuresArr,
                        enabled: values.isEnable
                    };

                    this.props.dispatch(editPushCfg(this.props.modalData.id, data)).then(() => {
                        this.props.dispatch(getPushList(this.props.user.orgId)).then(() => {
                            this.props.closeModal();
                        });
                    });
                
            });
        } else {
            //新增
            form.validateFields().then( values => {
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
                            structuresArr = [];
                            for (let s of this.props.abnPushModal.structList) {
                                if (s.hasAbnReportParams) {
                                    structuresArr.push(s.id)
                                }
                            }
                            break;
                        }
                    }

                    let data = {
                        noticedUser: parseInt(values.receiver),
                        structures: structuresArr,
                        enabled: values.isEnable ? values.isEnable : false
                    };
                    this.props.dispatch(addPushCfg(this.props.user.orgId, data)).then(() => {
                        this.props.dispatch(getPushList(this.props.user.orgId)).then(() => {
                            this.props.closeModal();
                        });
                    });
                
            });
        }

    };
    projectChange = val => {
        
        const { getFieldValue, setFieldsValue } = this.formRef.current;
        const { dispatch, abnPushModal, user } = this.props;
        let structuresDisabled = true;
        if (val.length > 0) {
            structuresDisabled = false;
        }

        if (val.includes('all')) {
            let data = abnPushModal.projectList;
            val = data.map(k => {
                return k.projects[0].id;
            })
        }
        dispatch(getStructsList(user.orgId, val));
        // setFieldsValue({ structures: [] });
        let nextStructuresValue = [];
        let currSelectedStructures = getFieldValue('structures');
        for (let sid of currSelectedStructures) {
            if (abnPushModal.structList.find(s => s.id == sid).projects.some(p => val.some(vpid => vpid == p.id))) {
                nextStructuresValue.push(sid)
            }
        }
        setFieldsValue({ structures: nextStructuresValue });
        this.setState({ structuresDisabled });
    };

    initForm = () => {
        const form = this.formRef.current;
        if (this.props.isEdit) {
            let data = this.props.modalData;
            let hasPush = [];
            for (let j in data.projects) {
                for (let i in data.projects[j].structures) {
                    let temp = data.projects[j].structures[i];
                    if (!hasPush.includes(temp.id)) {
                        // structures.push({ label: temp.name, key: temp.id });
                        hasPush.push(temp.id);
                    }
                }
            }
            let projectsArr = data.projects.map(val => {
                return val.id
            });
            this.props.dispatch(getStructsList(this.props.user.orgId, projectsArr));
            form.setFieldsValue({
                project: data.projects.map(val => {
                    return val.id
                }),
                structures: hasPush,
                receiver: data.noticedUser.map(val => {
                    // return {
                    //   key: val.id,
                    //   label: val.name
                    // };
                    return val.id;
                }),
                isEnable: data.enabled
            });
            this.setState({
                structuresDisabled: false,
            });
        } else {
            form.setFieldsValue({
                project: [],
                structures: [],
                receiver: [],
            });
        }
    }
    //选择器子选项格式化
    selectProjectList = () => {
        let selectChildProjects = [<Option key="all">全部</Option>];
        if (!this.props.abnPushModal.projectList.length > 0) {
            return;
        }
        for (let i in this.props.abnPushModal.projectList) {
            selectChildProjects.push(<Option key={this.props.abnPushModal.projectList[i].projects[0].id} value={this.props.abnPushModal.projectList[i].projects[0].id}>
                {this.props.abnPushModal.projectList[i].projects[0].name}
            </Option>);
        }
        return selectChildProjects;
    };

    selectStructList = () => {
        if (!this.props.abnPushModal.structList.length > 0) {
            return;
        }
        let selectChildStruct = [<Option key="all" disabled={!this.props.abnPushModal.structList.some(s => s.hasAbnReportParams)}>全部</Option>];
        for (let i in this.props.abnPushModal.structList) {
            selectChildStruct.push(
                <Option key={this.props.abnPushModal.structList[i].id}
                    value={this.props.abnPushModal.structList[i].id}
                    disabled={!this.props.abnPushModal.structList[i].hasAbnReportParams}>
                    {this.props.abnPushModal.structList[i].name}
                </Option>
            );
        }
        return selectChildStruct;
    };
    selectReceiverList = () => {
        let selectChildReceiver = [];
        if (!this.props.abnPushModal.receiverList.length > 0) {
            return;
        }

        let receiverList = [];

        for (let i in this.props.abnPushModal.receiverList) {
            for (let j in this.props.abnPushModal.receiverList[i].posts) {
                for (let k in this.props.abnPushModal.receiverList[i].posts[j].members) {
                    let receiver = this.props.abnPushModal.receiverList[i].posts[j].members[k];
                    let isDisabled = true;
                    if (!!receiver.phone || !!receiver.email || !!receiver.openId ||
                        (this.props.modalData && this.props.modalData.noticedUser && this.props.modalData.noticedUser == receiver.id)) {
                        isDisabled = false;
                    }
                    receiver.isDisabled = isDisabled;
                    receiver.departmentName = this.props.abnPushModal.receiverList[i].departmentName + '-' + this.props.abnPushModal.receiverList[i].posts[j].name;
                    receiverList.push(receiver);
                }
            }
        }

        for (let i = 0; i < receiverList.length; i++) {
            for (let j = i + 1; j < receiverList.length; j++) {
                if (receiverList[i].name === receiverList[j].name) {
                    receiverList[i].hasSameName = true;
                    receiverList[j].hasSameName = true;
                    continue;
                }
            }
        }

        this.state.receiverList = receiverList;
        selectChildReceiver = receiverList.map(receiver => {
            return <Option key={receiver.id} disabled={receiver.isDisabled} title={receiver.name} value={receiver.id}>
                <Tooltip title={<div>
                    <div>手机号：{receiver.phone}</div>
                    <div>邮箱：{receiver.email}</div>
                    <div>职位：{receiver.departmentName}</div>
                </div>} placement="right">
                    {receiver.name}
                </Tooltip>
            </Option>;
        });
        return selectChildReceiver;
    };

    filterOption = (inputValue, option) => {
        const { children } = option.props;
        return (
            children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0 ||
            PinyinHelper.isPinyinMatched(children, inputValue)
        );
    };

    render() {
        const { abnPushModal } = this.props;
        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 4 } },
            wrapperCol: { xs: { span: 24 }, sm: { span: 20 } }
        };
        const tailFormItemLayout = {
            wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 24, offset: 0 } }
        };


        return <div>
            <Modal
                maskClosable={false}
                title={this.props.isEdit ? "修改异常推送策略" : "添加异常推送策略"}
                visible={this.props.visible}
                onOk={this.btnFormSubmit}
                onCancel={this.props.closeModal}
                width={600}
                loading={true}>
                <Form ref={this.formRef}>
                    <FormItem 
                        {...formItemLayout} 
                        label="接收人"
                        name='receiver'
                        rules={[{ required: true, message: "请选择接收人" }]}
                    >
                        
                        <Select style={{ width: "100%" }} placeholder="请选择接收人"
                            filterOption={(input, option) => {
                                return option.props.children.props.children
                                    .toLowerCase().indexOf(input.toLowerCase()) >= 0;
                            }}>
                            {this.selectReceiverList()}
                        </Select>
                    </FormItem>
                    <FormItem 
                        {...formItemLayout} 
                        label="项目"
                        name='project'
                        rules={[{ required: true, message: "请选择项目" }]}
                    >
                        
                        <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="请选择项目"
                            filterOption={this.filterOption}
                            onChange={this.projectChange}
                        >
                            {this.selectProjectList()}
                        </Select>
                    </FormItem>

                    <FormItem 
                        {...formItemLayout} 
                        label="结构物" 
                        extra="请选择已经在数据计算的异常数据识别功能中配置了参数的结构物" 
                        name='structures'
                        rules={[{ required: true, message: "请选择结构物" }]}
                    >
                        <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="请选择结构物"
                            disabled={this.state.structuresDisabled}
                            filterOption={this.filterOption}>
                            {this.selectStructList()}
                        </Select>
                    </FormItem>
                    <FormItem {...tailFormItemLayout} name='isEnable'valuePropName='checked' >
                        <Checkbox>启用</Checkbox>
                    </FormItem>
                </Form>
            </Modal>
        </div>;
    }
}

function mapStateToProps(state) {
    const {auth, analysisStrategyProjectList, analysisStructsList, analysisStrategyReceiverList, pushCfgList } = state;
    return {
        //all: state,
        user: auth.user,
        abnPushModal: { 
            projectList: analysisStrategyProjectList.data || [], 
            structList: analysisStructsList.data || [], 
            receiverList: analysisStrategyReceiverList.data || [],
            pushCfgList: pushCfgList.data || []
        }
    };
}
export default connect(mapStateToProps)(AbnPushCfgModal);
