/**
 * Created by yuanfenghua on 2018/4/28.
 */
'use strict'

import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { connect } from 'react-redux';

class DomainError extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { match: { params } } = this.props;

        return (
            <Row type="flex" justify="center">
                <Col span="24">
                    <h1>[{`${params.domain}`}]域名错误，请联系管理员</h1>
                </Col>
            </Row>
        );
    }

}

export default connect()(DomainError);