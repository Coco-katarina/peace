import React, { Component } from "react";
import { connect } from "react-redux";
import { getProjectList, getStrategyStructsList, getReceiverList } from "../../actions/alarm-strategy-modal";
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
    AutoComplete
} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class StrategyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: [],
            receiverList: [],
            isSms: true,
            isEmail: true,
            //isWx: true,
            levelErr: {
                state: "",
                info: ""
            },
            categoriesErr: {
                state: "",
                info: ""
            },
            alarmLevel: [{ key: 1, label: '一级' }, { key: 2, label: '二级' }, { key: 3, label: '三级' }],
            alarmCategories: [
                { label: "数据类告警", value: "2" },
                { label: "设备类告警", value: "1" }
            ],
            structuresDisabled: true,
            smsSelectDisabled: true,
            emailSelectDisabled: true,
            isStrategyEnabled: false,
            confirmDirty: false,
            autoCompleteResult: []
        };
    }
    formRef = React.createRef();
    // static propTypes = {
    //     visible: React.PropTypes.bool.isRequired,
    //     closeModal: React.PropTypes.func.isRequired
    // };
    
    //弹窗类
    showModal = () => {
        this.setState({
            visible: true
        });
    };
    handleCancel = e => {
        this.setState({
            visible: false
        });
    };
    // handleSubmit = e => {
    //     e.preventDefault();

    //     this.props.form.validateFieldsAndScroll((err, values) => {
    //         if (!err) {
    //         }
    //     });
    // };
    // onFinish = (values) => {
    //     console.log('Success:', values);
    // };
    
    // onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };

    //表单类
    btnFormSubmit = () => {
        const form = this.formRef.current;
        if (this.props.isEdit) {
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
                            if (!structuresArr.includes(parseInt(values.structures[i]))) {
                                structuresArr.push(parseInt(values.structures[i]));
                            }
                        } else {
                            structuresArr = this.props.strategyModal.structList.map(
                                k => {
                                    return k.id;
                                }
                            );
                            break;
                        }
                    }
                    let data = {
                        noticedUsers: values.receiver.map(val => {
                            return parseInt(val);
                        }),
                        structures: structuresArr,
                        alarmCategories: categoriesArr,
                        emailNoticed: {
                            enabled: values.isEmail, alarmLevels: values.emailAlarmLevel.map(
                                val => {
                                    return parseInt(val);
                                }
                            )
                        },
                        smsNoticed: {
                            enabled: values.issms, alarmLevels: values.smsAlarmLevel.map(
                                val => {
                                    return parseInt(val);
                                }
                            )
                        },
                        enabled: values.isEnable
                    };

                    if (!data.alarmCategories.length > 0) {
                        this.setState({
                            categoriesErr: {
                                state: "error",
                                info: "请至少选择一种告警类型"
                            }
                        });
                        return;
                    } else {
                        this.setState({
                            categoriesErr: {
                                state: "",
                                info: ""
                            }
                        });
                    }
                    if (!data.smsNoticed.alarmLevels.length > 0 && !data.emailNoticed.alarmLevels.length > 0) {
                        this.setState({
                            levelErr: {
                                state: "error",
                                info: "请至少选择一种接收方式"
                            }
                        });
                        return;
                    } else {
                        this.setState({
                            levelErr: {
                                state: "",
                                info: ""
                            }
                        });
                    }
                    this.props.dispatch(editStrategy(this.props.modalData.id, data)).then(() => {
                        this.props.dispatch(getStrategy(this.props.user.orgId)).then(() => {
                            this.props.closeModal();
                        });
                    });
                
            }).catch(errInfo => {

            });
        } else {
            //新增
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
                            structuresArr = this.props.strategyModal.structList.map(k => {
                                return k.id;
                            });
                            break;
                        }
                    }
                    let isSms = values.smsAlarmLevel.length > 0 ? true : false;
                    let isEmail = values.emailAlarmLevel.length > 0 ? true : false;
                    let data = {
                        noticedUsers: values.receiver.map(val => {
                            return parseInt(val);
                        }),
                        structures: structuresArr,
                        alarmCategories: categoriesArr,
                        emailNoticed: {
                            enabled: isEmail,
                            alarmLevels: values.emailAlarmLevel.map(
                                val => {
                                    return parseInt(val);
                                }
                            )
                        },
                        smsNoticed: {
                            enabled: isSms,
                            alarmLevels: values.smsAlarmLevel.map(
                                val => {
                                    return parseInt(val);
                                }
                            )
                        },
                        enabled: values.isEnable ? values.isEnable : false
                    };
                    if (!data.alarmCategories.length > 0) {
                        this.setState({
                            categoriesErr: {
                                state: "error",
                                info: "请至少选择一种告警类型"
                            }
                        });
                        return;
                    } else {
                        this.setState({
                            categoriesErr: {
                                state: "",
                                info: ""
                            }
                        });
                    }
                    if (!data.smsNoticed.alarmLevels.length > 0 && !data.emailNoticed.alarmLevels.length > 0) {// && !data.wxNoticed.alarmLevels.length > 0
                        this.setState({
                            levelErr: {
                                state: "error",
                                info: "请至少选择一种接收方式"
                            }
                        });
                        return;
                    } else {
                        this.setState({
                            levelErr: {
                                state: "",
                                info: ""
                            }
                        });
                    }
                    this.props.dispatch(addStrategy(this.props.user.orgId, data)).then(() => {
                        this.props.dispatch(getStrategy(this.props.user.orgId)).then(() => {
                            this.props.closeModal();
                        });
                    }); 
            });
        }

    };
    projectChange = val => {
        const form = this.formRef.current;
        let structuresDisabled = true;
        if (val.length > 0) {
            structuresDisabled = false;
        }

        if (val.includes('all')) {
            let data = this.props.strategyModal.projectList;
            val = data.map(k => {
                return k.projects[0].id;
            })
        }
        this.props.dispatch(getStrategyStructsList(this.props.user.orgId, val));
        form.setFieldsValue({ structures: [] });
        this.setState({ structuresDisabled });
    };
    receiverChange = val => {
        const form = this.formRef.current;
        let isSms = true;
        let isEmail = true;
        for (let i in val) {
            for (let j in this.state.receiverList) {
                if (parseInt(val[i]) == this.state.receiverList[j].id) {
                    if (this.state.receiverList[j].phone) {
                        isSms = false;
                    }
                    if (this.state.receiverList[j].email) {
                        isEmail = false;
                    }
                }
            }
        }
        if (isSms) {
            form.setFieldsValue({ smsAlarmLevel: [], issms: false });
        }
        if (isEmail) {
            form.setFieldsValue({ emailAlarmLevel: [], isEmail: false });
        }

        this.setState({
            isSms,
            isEmail,
            smsSelectDisabled: !form.getFieldValue('issms'),
            emailSelectDisabled: !form.getFieldValue('isEmail'),
        });
    };
    smsCheckChange = val => {
        const form = this.formRef.current;
        let smsSelectDisabled = true;
        if (!!val.target.checked) {
            smsSelectDisabled = false;
        } else {
            form.setFieldsValue({ smsAlarmLevel: [] });
        }
        this.setState({ smsSelectDisabled });
    };
    emailCheckChange = val => {
        const form = this.formRef.current;
        let emailSelectDisabled = true;
        if (!!val.target.checked) {
            emailSelectDisabled = false;
        } else {
            form.setFieldsValue({ emailAlarmLevel: [] });
        }
        this.setState({ emailSelectDisabled });
    };

    categoriesChange = checkedList => {
        const form = this.formRef.current;
        form.setFieldsValue({ categories: checkedList });
    };
    setSmsAlarmLevel = value => {
        const form = this.formRef.current;
        form.setFieldsValue({ smsAlarmLevel: value });
    };
    setEmailAlarmLevel = value => {
        const form = this.formRef.current;
        form.setFieldsValue({ emailAlarmLevel: value });
    };

    initForm = () => {
        const alarmCategoriesList = ["数据类告警", "设备类告警"];
        const alarmLevelList = ["一级", "二级", "三级"];
        const form = this.formRef.current;
        if (this.props.isEdit) {
            let data = this.props.modalData;
            let structures = [];
            let hasPush = [];
            for (let j in data.projects) {
                for (let i in data.projects[j].structures) {
                    let temp = data.projects[j].structures[i];
                    if (!hasPush.includes(temp.id)) {
                        hasPush.push(temp.id);
                    }
                }
            }
            let projectsArr = [];
            //初始化短信，邮件禁用状态
            let isSms = true;
            let isEmail = true;
            for (let i in data.noticedUsers) {
                let p = data.noticedUsers[i];
                if (p.phone) {
                    isSms = false;
                }
                if (p.email) {
                    isEmail = false;
                }
            }
            if (data.smsNoticed.enabled || !isSms) {
                this.setState({ isSms: false });
            }
            if (data.emailNoticed.enabled || !isEmail) {
                this.setState({ isEmail: false });
            }
            this.props.dispatch(getStrategyStructsList(this.props.user.orgId, projectsArr));
            form.setFieldsValue({
                project: data.projects.map(val => {
                    return val.id
                }),
                structures: hasPush,
                receiver: data.noticedUsers.map(val => {
                    return val.id;
                }),
                categories: data.alarmCategories.map(val => {
                    return val.toString();
                }),
                issms: data.smsNoticed.enabled,
                smsAlarmLevel: data.smsNoticed.alarmLevels.map(val => {
                    return val;
                }),
                isEmail: data.emailNoticed.enabled,
                emailAlarmLevel: data.emailNoticed.alarmLevels.map(val => {
                    return val;
                }),
                isEnable: data.enabled
            });
            this.setState({
                smsSelectDisabled: !data.smsNoticed.enabled,
                emailSelectDisabled: !data.emailNoticed.enabled,
                structuresDisabled: false,
                isStrategyEnabled: data.enabled
            });
        } else {
            form.setFieldsValue({
                project: [],
                structures: [],
                receiver: [],
                categories: [],
                issms: false,
                smsAlarmLevel: [],
                isEmail: false,
                emailAlarmLevel: [],
            });
        }

    }

    //选择器子选项格式化
    selectProjectList = () => {
        let selectChildProjects = [<Option key="all">全部</Option>];
        if (!this.props.strategyModal.projectList.length > 0) {
            return;
        }
        for (let i in this.props.strategyModal.projectList) {
            selectChildProjects.push(<Option key={this.props.strategyModal.projectList[i].projects[0].id} value={this.props.strategyModal.projectList[i].projects[0].id}>
                {this.props.strategyModal.projectList[i].projects[0].name}
            </Option>);
        }
        return selectChildProjects;
    };

    selectStructList = () => {
        let selectChildStruct = [<Option key="all">全部</Option>];
        if (!this.props.strategyModal.structList.length > 0) {
            return;
        }
        for (let i in this.props.strategyModal.structList) {
            selectChildStruct.push(
                <Option key={this.props.strategyModal.structList[i].id} value={this.props.strategyModal.structList[i].id}>
                    {this.props.strategyModal.structList[i].name}
                </Option>
            );
        }
        return selectChildStruct;
    };

    selectReceiverList = () => {
        let selectChildReceiver = [];
        if (!this.props.strategyModal.receiverList.length > 0) {
            return;
        }

        let receiverList = [];

        for (let i in this.props.strategyModal.receiverList) {
            for (let j in this.props.strategyModal.receiverList[i].posts) {
                for (let k in this.props.strategyModal.receiverList[i].posts[j].members) {
                    let receiver = this.props.strategyModal.receiverList[i].posts[j].members[k];
                    let isDisabled = true;
                    if (!!receiver.phone || !!receiver.email || !!receiver.openId ||
                        (this.props.modalData && this.props.modalData.noticedUsers && this.props.modalData.noticedUsers.filter(m => m.id == receiver.id).length > 0)) {
                        isDisabled = false;
                    }
                    receiver.isDisabled = isDisabled;
                    receiver.departmentName = this.props.strategyModal.receiverList[i].departmentName + '-' + this.props.strategyModal.receiverList[i].posts[j].name;
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

    selectalarmLevelList = () => {
        let tempArr = [];
        for (let i in this.state.alarmLevel) {
            tempArr.push(<Option key={this.state.alarmLevel[i].key} value={this.state.alarmLevel[i].key}>
                {this.state.alarmLevel[i].label}
            </Option>);
        }
        return tempArr;
    }

    componentDidMount() {
        this.props.dispatch(getProjectList(this.props.user.id));
        this.props.dispatch(getReceiverList(this.props.user.orgId));
        this.initForm();
    }

    filterOption = (inputValue, option) => {
        const { children } = option.props;
        return (
            children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0 ||
            PinyinHelper.isPinyinMatched(children, inputValue)
        );
    };

    render() {
        
        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 4 } },
            wrapperCol: { xs: { span: 24 }, sm: { span: 20 } }
        };
        const tailFormItemLayout = {
            wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 24, offset: 0 } }
        };
        const categoriesFormItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
        };
        const LevelFormItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        };
        return <div>
            <Modal title="告警策略" maskClosable={false} visible={this.props.visible} onOk={this.btnFormSubmit} onCancel={this.props.closeModal} width={600} loading={true}>
                <Form ref={this.formRef} >
                    {!this.props.modalData ? <FormItem {...formItemLayout} name='project' rules={[{ required: true, message: "请选择项目" }]} label="项目">
                        <Select mode="multiple" style={{ width: "100%" }} placeholder="请选择项目" filterOption={this.filterOption} onChange={this.projectChange}>
                            {this.selectProjectList()}
                        </Select>
                    </FormItem> : ''}

                    <FormItem {...formItemLayout} name='structures' rules={[{ required: true, message: "请选择结构物" }]} label="结构物">
                      <Select mode="multiple" style={{ width: "100%" }} placeholder="请选择结构物" disabled={this.state.structuresDisabled} filterOption={this.filterOption}>
                            {this.selectStructList()}
                        </Select>
                    </FormItem>
                    <FormItem {...formItemLayout} name='receiver' rules={[{ required: true, message: "请选择接收人" }]} label="告警接收人">
                       <Select mode="multiple" style={{ width: "100%" }} placeholder="请选择接收人" filterOption={(input, option) => {
                            let children = option.props.children.props.children;
                            return (
                                children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                PinyinHelper.isPinyinMatched(children, input)
                            );
                        }} onChange={this.receiverChange}>
                            {this.selectReceiverList()}
                        </Select>
                    </FormItem>

                    <FormItem {...categoriesFormItemLayout} name='categories'  label="接收告警类型：" validateStatus={this.state.categoriesErr.state} help={this.state.categoriesErr.info}>
                        <CheckboxGroup options={this.state.alarmCategories} onChange={this.categoriesChange} />
                    </FormItem>
                    <Row type="flex" justify="start">
                        <Col span={4}>
                            <FormItem {...tailFormItemLayout} name='issms' valuePropName='checked' initialValue={!this.state.smsSelectDisabled}>
                                <Checkbox onChange={this.smsCheckChange} disabled={this.state.isSms}>
                                    短信接收
                                </Checkbox>
                            </FormItem>
                        </Col>
                        <Col span={20}>
                            <FormItem {...LevelFormItemLayout} name='smsAlarmLevel'  validateStatus={this.state.levelErr.state} help={this.state.levelErr.info} label="接收告警等级：">
                               <Select mode="multiple" style={{ width: "100%" }} placeholder="Please select" onChange={this.setSmsAlarmLevel} disabled={this.state.smsSelectDisabled}>
                                    {this.selectalarmLevelList()}
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="start">
                        <Col span={4}>
                            <FormItem {...tailFormItemLayout} name='isEmail' valuePropName='checked' initialValue={!this.state.emailSelectDisabled}>
                                <Checkbox onChange={this.emailCheckChange} disabled={this.state.isEmail}>
                                    邮件接收
                                </Checkbox>
                            </FormItem>
                        </Col>
                        <Col span={20}>
                            <FormItem {...LevelFormItemLayout} name='emailAlarmLevel' validateStatus={this.state.levelErr.state} help={this.state.levelErr.info} label="接收告警等级：">
                                <Select mode="multiple" style={{ width: "100%" }} placeholder="Please select" onChange={this.setEmailAlarmLevel} disabled={this.state.emailSelectDisabled}>
                                    {this.selectalarmLevelList()}
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem {...tailFormItemLayout} name='isEnable' valuePropName='checked'>
                        <Checkbox style={{ float: 'right' }}>启用</Checkbox>
                    </FormItem>
                </Form>
            </Modal>
        </div>;
    }
}

function mapStateToProps(state) {
    const { strategyProjectList, strategyStructsList, strategyReceiverList } = state
    return {
        all: state,
        user: state.auth.user,
        strategyModal: { projectList: strategyProjectList.data || [],  structList: strategyStructsList.data || [], receiverList: strategyReceiverList.data || [] }
    };
}

export default connect(mapStateToProps)(StrategyModal);
