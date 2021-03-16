'use strict';
import React from 'react';
import { findDOMNode } from 'react-dom';
import { Button, Input, Form, Row, Col, Alert, Card, Spin } from 'antd';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { login } from '../actions/auth';
import { getDomainInfo, GET_DOMAIN_SUCCESS } from '../actions/domain';

const FormItem = Form.Item;

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            inputChanged: false,
            clientHeight: 0,
            clientWidth: 0
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { user, dispatch } = nextProps;
        if (user && user.authorized) {
            dispatch(push('/'));
            return;
        }
    }

    componentDidMount() {
        this.setState({ clientHeight: document.body.clientHeight, clientWidth: document.body.clientWidth });
        window.onresize = () => {
            this.setState({ clientHeight: document.body.clientHeight, clientWidth: document.body.clientWidth });
        };
    }

    UNSAFE_componentWillMount() {
        const { user, dispatch, org, match: { params } } = this.props;
        if (user && user.authorized) {
            dispatch(push('/'));
            return;
        }

        if (!org) {
            dispatch(getDomainInfo(params.domain)).then(action => {
                if (!action || action.type != GET_DOMAIN_SUCCESS) {
                    // dispatch(push(`/signin`))
                    //安心云手动分配域名，IP映射定制域名，域名无需登录

                    dispatch(push(`/${params.domain}/error`));

                } else {
                    this.handleUserNameFocus();
                }
            });
        }
    }

    loginHandler = _ => {
        const { match: { params } } = this.props;
        this.setState({ inputChanged: false });
        this.props.dispatch(login(this.state.username, this.state.password, params.domain));
    };

    enterHandler = e => {
        if (e.key === 'Enter') {
            const { match: { params } } = this.props;
            this.setState({ inputChanged: false });
            this.props.dispatch(login(this.state.username, this.state.password, params.domain));
        }
    };

    loginFunc = (username, password) => {
        const { match: { params } } = this.props;
        this.props.dispatch(login(username, password, params.domain));
    }

    handleUserNameFocus = () => {
        const node = findDOMNode(this.refs.username);
        if (node) {
            node.focus();
        }
    };

    render() {
        const { isRequesting, logining, user, dispatch, error, match: { params }, org, resourceRoot } = this.props;
        if (user && user.authorized) {
            dispatch(push('/'));
            return <div />
        }

        return (
            <Spin spinning={isRequesting}>
                <div style={{ textAlign: 'center', padding: '100px 0 50px 0' }}>
                    <img src={org && org.logo ? `${resourceRoot}/${org.logo}?width=180px` : '/assets/images/anxinyun.png'} width="180px" />
                </div>
                <Card style={{ width: 500, padding: 50, margin: '0 auto' }}>
                    <h3 style={{ color: '#666', paddingBottom: 5, marginBottom: 30, borderBottom: '1px solid #666' }}>
                        欢迎登录
                            <span style={{ padding: '0 5px', color: '#00A0E8', fontWeight: 'bold' }}>{org ? org.name : ''}</span>
                    </h3>
                    <Form onKeyDown={this.enterHandler}>
                        <FormItem>
                            <Input type="text" value={this.state.username} placeholder="用户名" ref="username"
                                onChange={e => this.setState({ username: e.target.value, inputChanged: true })} />
                        </FormItem>
                        <FormItem>
                            <Input type="password" value={this.state.password} placeholder="密码"
                                onChange={e => this.setState({ password: e.target.value, inputChanged: true })} />
                        </FormItem>
                        <Row style={{
                            marginBottom: 8
                        }}>
                            <Col span="24">
                                {this.state.inputChanged || !error ? '' :
                                    <Alert showIcon type="warning" message={error} />}
                            </Col>
                        </Row>
                        <Row>
                            <Col span="6"><a href={`/${params.domain}/forget`}>忘记密码?</a></Col>
                            <Col span="18">
                                <Button type="primary" size="large" loading={logining} style={{
                                    float: 'right'
                                }}
                                    onClick={this.loginHandler}>登录</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Spin>
        );
    }
}

function mapStateToProps(state) {
    const { auth, domain, global } = state;
    return {
        user: auth.user,
        error: auth.error,
        logining: auth.isRequesting,
        org: domain.domain,
        isRequesting: domain.isRequesting,
        resourceRoot: global.resourceRoot
    }
}

export default connect(mapStateToProps)(LoginContainer);