import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, message, Form, Input, Button } from 'antd';
import { sendPhoneCode, checkPhoneCode } from '../actions/validate-phone'

const UserFieldModal = props => {
    const { visible, onClose, editData, dispatch, actions, user, kind, } = props
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [sleepCount, setSleepCount] = useState(0)
    const { profile } = actions

    const requestDone = (res, refresh) => {
        if (res.success) {
            onClose(refresh)
        }
        setLoading(false)
    }

    return (
        <Modal
            visible={true}
            title={'请输入'}
            onCancel={() => { onClose() }}
            onOk={() => {
                form.validateFields().then(v => {
                    setLoading(true)
                    if (kind == 'pswd') {
                        dispatch(profile.editpassword(user.id, v))
                            .then(res => {
                                requestDone(res)
                            })
                    } else if (kind == 'name') {
                        dispatch(profile.editName(user.id, v))
                            .then(res => {
                                requestDone(res, true)
                            })
                    } else if (kind == 'email') {
                        dispatch(profile.editProfile(user.id, v, 'email')).then(res => {
                            requestDone(res, true)
                        })
                    } else if (kind == 'phone') {
                        checkPhoneCode(v.phone, v.code).then(
                            () => {
                                dispatch(profile.editProfile(user.id, { phone: v.phone }, 'phone')).then(res => {
                                    requestDone(res, true)
                                })
                            }, err => {
                                message.error(err.response.body.message);
                            }
                        )
                    }
                })
            }}
            loading={loading}
        >
            <Form
                form={form}
                name="basic"
                initialValues={{

                }}
            >
                {
                    (() => {
                        switch (kind) {
                            case 'pswd':
                                return (
                                    <span>
                                        <Form.Item
                                            label="旧密码"
                                            name="oldpassword"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入旧密码',
                                                },
                                            ]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                        <Form.Item
                                            label="新密码"
                                            name="newpassword"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入新密码',
                                                }, {
                                                    pattern: /^[a-z0-9A-Z_]{6,20}$/, message: '密码由6-20位字母、数字或_组成'
                                                },
                                            ]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                    </span>
                                )
                            case 'name':
                                return (
                                    <span>
                                        <Form.Item
                                            label="姓名"
                                            name="name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入姓名',
                                                },
                                                {
                                                    whitespace: true,
                                                    message: '请勿输入空格',
                                                }
                                            ]}
                                        >
                                            <Input maxLength={49} />
                                        </Form.Item>
                                    </span>
                                )
                            case 'email':
                                return (
                                    <span>
                                        <Form.Item
                                            label="邮箱账号"
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入邮箱',
                                                },
                                                {
                                                    type: 'email',
                                                    message: '邮箱格式错误!',
                                                }
                                            ]}
                                        >
                                            <Input maxLength={49} />
                                        </Form.Item>
                                    </span>
                                )
                            case 'phone':
                                return (
                                    <span>
                                        <Form.Item
                                            label="电话"
                                            name="phone"
                                            rules={[
                                                {
                                                    pattern: /^1[3|4|5|7|8|9]\d{9}$/, message: '手机号码无效'
                                                }, {
                                                    required: true, message: '手机号码不能为空',
                                                }
                                            ]}
                                        >
                                            <Input maxLength={11} placeholder="请输入要绑定的手机号" />
                                        </Form.Item>
                                        <Form.Item label="验证码">
                                            <div style={{ width: '71%', display: 'inline-block' }}>
                                                <Form.Item
                                                    name="code"
                                                    rules={[{
                                                        required: true, message: '验证码不能为空',
                                                    }
                                                    ]}
                                                >
                                                    <Input placeholder="请输入验证码" />
                                                </Form.Item>
                                            </div>
                                            <Button
                                                loading={sleepCount > 0}
                                                onClick={async () => {
                                                    let v = await form.validateFields(['phone'])
                                                    // send message
                                                    sendPhoneCode(v.phone).then(res => {
                                                        setSleepCount(59)
                                                        let t = 59
                                                        setTimeout(() => {
                                                            let timer = setInterval(() => {
                                                                if (t == 0) {
                                                                    clearInterval(timer);
                                                                    setSleepCount(t)
                                                                } else {
                                                                    setSleepCount(t--)
                                                                }
                                                            }, 1000)
                                                        }, 0)
                                                    });
                                                }}>
                                                {sleepCount > 0 ? sleepCount + 's 后重试' : '获取验证码'}
                                            </Button>
                                        </Form.Item>
                                    </span>
                                )
                        }
                    })()
                }
            </Form>
        </Modal>
    )
}

function mapStateToProps(state) {
    const { auth, global } = state;
    return {
        requesting: false,
        actions: global.actions,
        user: auth.user
    };
}

export default connect(mapStateToProps)(UserFieldModal);