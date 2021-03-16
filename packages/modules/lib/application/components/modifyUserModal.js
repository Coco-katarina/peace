import React, { useRef } from "react";
import { connect } from "react-redux";
import { Modal, } from "antd";
import { editProjectAccount } from "../actions/projectInfo";
import { Form } from '@peace/components'


const PasswordModal = (props) => {
    const { dispatch, userInfo, closeModal } = props;
    const _formRef = useRef(null)

    const submit = () => {
        const { current } = _formRef
        current.validateFields().then(val => {
            dispatch(editProjectAccount(userInfo.key, {
                username: val.username,
                password: val.password
            })).then(res => {
                if (res.success) {
                    closeModal(true)
                }
            })
        })
    };

    const renderForm2Items = () => {
        let items = [{
            type: "Input",
            id: "username",
            label: "用户名",
            rules: [{
                pattern: /^[a-z0-9A-Z_]{5,20}$/,
                message: "账号由5-20位字母、数字或_组成"
            }, {
                required: true, max: 50, message: "请输入管理员用户名"
            }],
            itemProps: {
                placeholder: "请输入新账号",
            },
        }, {
            type: "Input",
            id: "password",
            label: "密码",
            rules: [{
                pattern: /^[a-z0-9A-Z_]{6,20}$/,
                message: "密码由6-20位字母、数字或_组成"
            }, {
                required: true, max: 50, message: "请输入合法的密码"
            }],
            itemProps: {
                placeholder: "请输入密码",
                type: "password"
            },
        }, {
            type: "Input",
            id: "passwordConfirm",
            label: "确认密码",
            rules: [{
                required: true, max: 50, message: "请确认密码"
            }, {
                validator: async (rule, value) => {
                    const { current } = _formRef
                    if (current.getFieldValue('password') != value) {
                        throw new Error('两次输入的密码不一致!');
                    }
                }
            }],
            itemProps: {
                placeholder: "请再次确认密码",
                type: "password"
            },
        }];
        return items
    }

    return (
        <Modal title="重置密码" visible={true} maskClosable={false} onCancel={closeModal} onOk={submit}>
            <Form
                ref={_formRef}
                formItems={renderForm2Items()}
                formItemLayout={{ labelCol: { span: 5 }, wrapperCol: { span: 19 } }}
                popupContainerId="releaseProjectForm2"
                dataToEdit={{
                    username: userInfo.admin.username || undefined
                }}
            />
        </Modal>
    )
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(PasswordModal);
