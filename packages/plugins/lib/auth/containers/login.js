'use strict';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Input, Form, Row, Col, message, Modal, Spin, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, } from '@ant-design/icons';
import { login } from '../actions/auth';
import { getProjectInfo, GET_PROJECT_SUCCESS } from '../actions/project';
import './style.less'
const QRCode = require('qrcode.react');
import Qs from 'qs';
const FormItem = Form.Item;

const Login = props => {
    const { dispatch, user, error, logining, project, projectError, isRequesting, location } = props;

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [inputChanged, setInputChanged] = useState(false);
    const [clientWidth, setClientWidth] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);
    const [rememberAccount, setRememberAccount] = useState(false);

    const { search } = location;
    const { p = 'default', n, w } = Qs.parse(search, { ignoreQueryPrefix: true });
    const currHref = document.location.href;

    useEffect(() => {
        setClientWidth(document.body.clientWidth);
        setClientHeight(document.body.clientHeight);
        if (!project) {
            dispatch(getProjectInfo(p)).then(action => {
                if (action.type != GET_PROJECT_SUCCESS) {
                    //dispatch(push(`/404`))
                } else {
                    if (p && n && w) {
                        dispatch(login(n, w, p));
                        return;
                    }
                }
            });
        }
        window.onresize = () => {
            setClientWidth(document.body.clientWidth);
            setClientHeight(document.body.clientHeight);
        }
        let anxinjoyProjectAccount = JSON.parse(localStorage.getItem("anxinjoyProjectAccountP"));
        if (anxinjoyProjectAccount) {
            setUserName(anxinjoyProjectAccount.userName);
            setPassword(anxinjoyProjectAccount.password);
            setRememberAccount(true)
        }
    }, []);


    useEffect(() => {
        if (error) {
            message.error(error);
            setPassword('')
        }
    }, [error])

    useEffect(() => {
        if (user && user.authorized) {
            dispatch(push('/projectOverview'));
        }
    }, [user])

    const enterHandler = e => {
        if (e.key === 'Enter') {
            setInputChanged(false)
            dispatch(login(username, password, p));
        }
    };

    const handleLogin = () => {
        const storageKey = "anxinjoyProjectAccountP";
        if (rememberAccount) {
            localStorage.setItem(storageKey, JSON.stringify({
                userName: username,
                password: password,
            }));
        } else {
            localStorage.removeItem(storageKey);
        }
        setInputChanged(false)
        dispatch(login(username, password, p));
    }

    const QRCodeClick = (name, website) => {
        Modal.info({
            title: name,
            content: (
                <div style={{ textAlign: 'center', position: 'relative', right: 21, marginTop: 30 }}>
                    <QRCode size={150} value={website} />
                </div>
            ),
            okText: '关闭',
            onOk() {
            },
        });
    }

    if (p && n && w) {
        return <div />
    }
    
    return (
        <Spin spinning={isRequesting}>
            <div style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url(${'../../../../assets/images/bg.png'})`,
            }}>
                <div style={{
                    width: 400,
                    height: 300,
                    padding: 30,
                    backgroundColor: '#ffffff',
                    borderRadius: 10,
                }}>
                    <p style={{ fontSize: 21, fontWeight: 'bold', textAlign: 'center', color: '#187FBE', fontWeight: 600 }}>{'吉林省桥梁健康监测与综合管理平台'}</p>
                    <Form onKeyDown={enterHandler} style={{ marginTop: 20 }}>
                        {/* <div style={{ fontSize: 10, fontWeight: 'bold' }}>用户名</div> */}
                        <FormItem>
                            <Input
                                style={{ border: '2px solid #9BB6E4', borderRadius: 5 }}
                                type="text"
                                value={username}
                                placeholder="用户名"
                                prefix={<UserOutlined />}
                                onChange={e => {
                                    setUserName(e.target.value)
                                    setInputChanged(true)
                                }}
                            />
                        </FormItem>
                        {/* <div style={{ fontSize: 10, fontWeight: 'bold' }}>密码</div> */}
                        <FormItem>
                            <Input
                                style={{ border: '2px solid #9BB6E4', borderRadius: 5 }}
                                type="password"
                                value={password}
                                placeholder="密码"
                                prefix={<LockOutlined />}
                                onChange={e => {
                                    setPassword(e.target.value)
                                    setInputChanged(true)
                                }}
                            />
                        </FormItem>
                    </Form>
                    <Row style={{ color: '#A8A8A8' }}>
                        <Col span={12}>
                            <Checkbox
                                checked={rememberAccount}
                                onChange={(e) => {
                                    setRememberAccount(e.target.checked)
                                }}
                                style={{ color: '#A8A8A8', marginBottom: 8 }}
                            ><span style={{ color: '#A8A8A8' }}>{"记住密码"}</span></Checkbox>
                        </Col>
                        {/* <Col span={5} offset={7}><a href={`/forget?p=${p}`} style={{ color: '#A8A8A8' }}>忘记密码?</a></Col> */}
                    </Row>
                    <Row style={{ textAlign: 'center' }}>
                        <Col span={24}>
                            <Button type="primary" size="large" loading={logining} block
                                className='loginBotton'
                                onClick={handleLogin}>登录</Button>
                            {/* <div className='loginBotton'>
                                登录
                            </div> */}
                        </Col>
                    </Row>
                    {/* #00BBFA- #0054E8*/}
                    {/* <Button type="primary" style={{ width: '100%' }} loading={isRequesting} onClick={handleLogin}>登录</Button> */}
                </div>
            </div>
        </Spin>

    );
}

function mapStateToProps(state) {
    const { auth, project } = state;
    return {
        user: auth.user,
        error: auth.error,
        logining: auth.isRequesting,
        project: project.info,
        isRequesting: project.isRequesting,
        projectError: project.error,
    }
}

export default connect(mapStateToProps)(Login);