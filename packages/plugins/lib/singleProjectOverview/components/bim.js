/*
 * @description  : 
 * @Date         : 2021-11-05 13:39:36
 * @FilePath     : \web\client\src\sections\singleProjectOverview\components\bim.js
 * @useStrict    : use strict
 */
'use strict'
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Tabs, Select, Row, Col, Button, Input, Badge, Divider, Card } from 'antd';



const Bim = (props) => {
    const { clientWidth, clientHeight, dispatch } = props;

    useEffect(() => {
        // dispatch(getBimPath(this.props.params.id))
        const { dispatch, user } = this.props;
        dispatch();

    }, []);

    const registeBIMJsFunc = () => {
        const _this = this;
        const { dispatch } = this.props;
        window.onselectionchange = function (guids) {
            const { }
        }
    }

    return (
        <div className="content">
            <div id='container' style={{ width: `${clientWidth - 50}px`, height: `${clientHeight - 200}px` }}>
                787464654646456664
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    const { global, auth } = state;
    return {
        user: auth.user,
        actions: global.actions,
        clientWidth: global.clientWidth,
        clientHeight: global.clientHeight,
    };
}

export default connect(mapStateToProps)(Bim);