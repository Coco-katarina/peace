'use strict';

import React, { Component } from 'react';
import { Modal, Form, Select, Input, Icon, Switch } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class OrganizationSetModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            currRoleId: null
        };
    }
    formRef = React.createRef();
    initModalAddContext = () => {
        const form = this.formRef.current;
        form.resetFields();
    };

    bubbleOkClickEvent = (values) => {
        const { isEdit, modalData } = this.props.modalProps;
        const { orgName, orgRole, username, password, orgCorporation, orgCorporationContact } = values;
        let orgRole_ = parseInt(orgRole);
        let dataToSave = {
            "name": orgName,
            "role": orgRole_,
            "corporation": orgRole_ == 1 ? '' : orgCorporation,
            "corporationContact": orgRole_ == 1 ? '' : orgCorporationContact
        };
        
        if (!isEdit) this.initModalAddContext();
        this.props.onSave(isEdit, dataToSave);

        
    };

    checkErrors = (errors) => {
        if (errors) {
            let keys = Object.keys(errors);
            if (keys.length > 0) {
                let msg = keys.reduce((prev, field) => {
                    let error = errors[field].errors[0].message;
                    prev = prev.concat(error, '; ');
                    return prev;
                }, '');
                return true;
            }
        }
        return false;
    };

    handleOk = () => {
        const form = this.formRef.current;
        form.validateFields().then(val => {
            this.bubbleOkClickEvent(val);
        }).catch(err=>{
            console.log(err);
        });
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    nameExists = (field, value, getFieldValue) => {
        
        if (value) {
            const { organizations, modalProps } = this.props;
            const { isEdit, modalData } = modalProps;
            let namesConfiged = [];
            if (field == 'username') {
                namesConfiged = organizations.filter(item => item.role == getFieldValue('orgRole')).map(item => item.admin.username);
            } else { // 'orgName'
                namesConfiged = organizations.filter(item => item.role == getFieldValue('orgRole')).map(item => item.name);
            }
            let names = namesConfiged;
            if (isEdit) {
                names = namesConfiged.filter(name => name != modalData.dataToEdit[field]);
            }
            if (names.includes(value.trim())) {
               return Promise.reject(new Error('该名称已被占用'))
            }
        }
         
         return Promise.resolve();
    };

    validateToNameExists = (value) => {
        const form = this.formRef.current;
        if (value && this.state.confirmDirty) {
            form.validateFields(['orgName'], { force: true });
        }

    }

    getFieldProps = (isEdit, dataToEdit) => {
        const { currRoleId, confirmDirty } = this.state;
        const _this = this;
        let getFieldDecorator = (id, options={}) => {
            let rules = [];
            switch (id) {
                case 'orgName':
                    rules = [
                        { required: true, message: `请填写组织名称` },
                       
                        ({ getFieldValue }) => ({
                            validator(_, value) { return _this.nameExists(id, value, getFieldValue) }
                        })
                         // { validator: async (rule, value) => this.nameExists(id, value) }
                    ];
                    break;
                case 'orgRole':
                    rules = [
                        { required: true, message: `请选择组织角色` },
                        //{ validator: this.validateToNameExists }
                    ];
                    break;
                case 'orgCorporation':
                    rules = [
                        { required: true, message: `请填写法人姓名` },
                    ];
                    break;
                case 'orgCorporationContact':
                    rules = [
                        {
                            pattern: /^1[3|4|5|7|8|9]\d{9}$/, message: '请填写正确的联系电话'
                        },
                        { required: true, message: `请填写法人联系电话` },
                    ];
                    break;
                default:
                    break;
            }
            let fieldProps = Object.assign({}, { rules, name:id }, options);
            //let fieldProps = this.props.form.getFieldDecorator(id, opts);
            return fieldProps;
        };
        let items = (currRoleId && currRoleId != 1) || (isEdit && dataToEdit && dataToEdit.orgRole != 1) ?
            ['orgName', 'orgRole', 'orgCorporation', 'orgCorporationContact'] : ['orgName', 'orgRole'];
        let fieldProps = items.reduce((p, field) => {
            if (isEdit) {
                p[`${field}Props`] = getFieldDecorator(field, { initialValue: `${dataToEdit[field]}` });
            } else {
                p[`${field}Props`] = getFieldDecorator(field);
            }
            return p;
        }, {});

        return fieldProps;
    };

    renderForm = () => {
        const { currRoleId } = this.state;
        const form = this.formRef.current;
        //const { setFieldsValue } = form;
        const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
        const { isEdit, modalData } = this.props.modalProps;
        const fieldProps = this.getFieldProps(isEdit, modalData.dataToEdit);
        //console.log(fieldProps);
        const corporationDom = (currRoleId && currRoleId != 1) || (isEdit && modalData.dataToEdit && modalData.dataToEdit.orgRole != 1) ?
            <span>
                <FormItem {...formItemLayout} label='法人姓名' {...fieldProps.orgCorporationProps}>
                    <Input placeholder="请输入机构法人姓名" maxLength={30} />
                </FormItem>
                <FormItem {...formItemLayout} label='法人联系电话' {...fieldProps.orgCorporationContactProps}>
                    <Input placeholder="请输入机构法人联系电话" maxLength={30} />
                </FormItem>
            </span> : '';
        return (
            <Form ref={this.formRef}>
                <FormItem {...formItemLayout} label='机构名称' {...fieldProps.orgNameProps}>
                    
                    <Input placeholder="请输入机构名称" maxLength={30} onBlur={this.handleConfirmBlur} />
                    
                </FormItem>
                <FormItem {...formItemLayout} label='机构角色' {...fieldProps.orgRoleProps}>
                    
                        <Select placeholder="请选择机构角色" onChange={(v) => {
                            this.setState({
                                currRoleId: v
                            });
                            this.validateToNameExists(v);
                            if (v == 1) {
                                form && form.setFieldsValue({
                                    orgCorporation: ' ',
                                    orgCorporationContact: ' ',
                                })
                            }
                        }}>
                            {
                                this.props.roles ? this.props.roles.map(s => <Option key={s.id.toString()} value={s.id.toString()}>{s.rolename}</Option>) : []
                            }
                        </Select>
                    
                </FormItem>
                {
                    currRoleId ?
                        currRoleId != 1 ?
                            corporationDom : '' :
                        isEdit && modalData.dataToEdit && modalData.dataToEdit.orgRole != 1 ?
                            corporationDom :
                            ''
                }
            </Form>
        );
    };

    render() {
        const { isEdit } = this.props.modalProps;
        return (
            <Modal
                bodyStyle={{ maxHeight: this.props.modalContentMaxHeight, overflowY: 'auto' }}
                visible={true} maskClosable={false}
                title={isEdit ? '编辑' : '新增'}
                okText='保存'
                onOk={this.handleOk}
                onCancel={this.props.onCancel}
            >
                {this.renderForm()}
            </Modal>
        )
    }
}

export default OrganizationSetModal;
