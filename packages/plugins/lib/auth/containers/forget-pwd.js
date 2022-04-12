import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Input, Button, Row, Col, Alert, message } from 'antd';
import { resetPwd, RESET_PASSWORD_SUCCESS } from '../actions/reset-pwd';
import { sendPhoneCode, checkPhoneCode, checkPhone } from '../actions/validate-phone';
import Qs from 'qs';
const FormItem = Form.Item;


const ForgetPwdContainer = props => {

    const { params, isRequesting, location } = props;

    const [sleeping, setSleeping] = useState(false);
    const [sleepCount, setSleepCount] = useState(0);
    const [done, setDone] = useState(false);
    const [form] = Form.useForm();
    const { search } = location;
    const { p: pcode } = Qs.parse(search, { ignoreQueryPrefix: true });

    const fetchVCode = () => {
        
        form.validateFields(['phone']).then(values => {
            sendPhoneCode(values.phone).then(_ => {
                setSleeping(true);
                setSleepCount(60);
                const timer = setInterval(_ => {
                    if (sleepCount == 0) {
                        setSleeping(false);
                        clearInterval(timer);
                        return;
                    }
                    setSleepCount(sleepCount - 1);
                }, 1000);
            });
        })
    }
    const checkRpt = async (rule, value) => {
        const password = form.getFieldValue('password');
        if(value && password !== value){
            throw new Error('两次输入的密码不一致');
        } 
    }  

    const validatePhone = async (rule, value) => {
        if(value){
            checkPhone(value, pcode).then(_ => {
            }, err => {
                throw new Error('未发现绑定该手机的账号');
               
            })
        } 
    } 

    const submit = () => {
       form.validateFields().then(values=> {
        checkPhoneCode(values.phone, values.code).then(_ => {
            dispatch(resetPwd(pcode, values.phone, values.code, values.password))
                .then(action => {
                    if (action.type == RESET_PASSWORD_SUCCESS) {
                        setDone(true)
                    }else {
                        message.error(action.payload.error);
                    }
                })
        }, err => {
            message.error(err.response.body.message);
        })
       }).catch(err => {
        message.error(err);
       })
    }

    return   (<div>
                <div style={{ textAlign: 'center', padding: '100px 0 50px 0' }}>
                    <img src="/assets/images/anxinyun.png" width="180px" />
                </div>
                <Card className="login" style={{ width: 500, padding: 50, margin: '0 auto' }}>
                    <h3 style={{ paddingBottom: 5, marginBottom: 30 }}>找回密码</h3>
                    {
                        done ?
                            <Alert
                                message="完成"
                                description={
                                    <div>
                                        <p>已成功验证您的手机号：{form.getFieldValue('phone')}, 并重置密码</p>
                                        <div style={{ padding: '30px 0', fontWeight: 'bold' }}>
                                            <a href={`/signin?p=${pcode}`}>返回登录</a>
                                        </div>
                                    </div>
                                }
                                type="success"
                                showIcon />
                            :
                            <div>
                                <Form>
                                    <FormItem 
                                        name="phone"
                                        rules={[{
                                            pattern: /^1[3|4|5|7|8|9]\d{9}$/, message: '手机号码无效'
                                        }, {
                                            required: true, message: '手机号码不能为空',
                                        }, {
                                            validator: validatePhone
                                        }]}
                                        hasFeedback
                                        validateTrigger='onBlur'
                                    >
                                        
                                        <Input maxLength="11" placeholder="请输入注册时填写的手机号" />
                                    </FormItem>
                                    <FormItem >
                                        <Row>
                                            <Col span={16}>
                                            <FormItem
                                                noStyle
                                                name="code"
                                                rules={[{
                                                    required: true, message: '验证码不能为空',
                                                }]}
                                            >
                                                <Input type="text" maxLength="8" placeholder="请输入验证码" />
                                            </FormItem>
                                            </Col>
                                            <Col span={8}>
                                                <Button type="primary" onClick={fetchVCode} loading={sleeping}>
                                                    {sleeping ? `${sleepCount}s后重试` : '获取验证码'}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </FormItem>
                                    <FormItem 
                                        name="password"
                                        rules={[{
                                            pattern: /^[a-z0-9A-Z_]{6,20}$/, message: '密码由6-20位字母、数字或_组成'
                                        }, {
                                            required: true, message: '密码不能为空',
                                        }]}
                                        hasFeedback
                                    >
                                        
                                        <Input type="password" placeholder="请输入新密码" />
                                    </FormItem>
                                    <FormItem 
                                        name="rptpwd"
                                        rules={[{
                                            validator: checkRpt
                                        }, {
                                            required: true, message: '密码不能为空',
                                        }]}
                                        hasFeedback

                                    >
                                       
                                        <Input type="password" placeholder="请再次输入新密码" />
                                    </FormItem>                                    
                                    <FormItem>
                                        <Button type="primary" style={{ width: '100%' }} loading={isRequesting} onClick={submit}>重设密码</Button>
                                    </FormItem>
                                </Form>
                                <div style={{ padding: '30px 0 0 0' }}>
                                    <a href={`/signin?p=${pcode}`}>返回登录</a>
                                </div>
                            </div>
                    }
                </Card>
            </div>)

}

function mapStateToProps(state) {
    const { resetPwd } = state;
    return {
        isRequesting: resetPwd.isRequesting        
    }
}

export default connect(mapStateToProps)(ForgetPwdContainer);