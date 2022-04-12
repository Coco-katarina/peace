'use strict';
import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getStructTypes, } from '../../actions/things'
import { Row, Col, Button, Input, Select } from 'antd';
import { AuthorizationCode } from '$utils';
import { Func } from '@peace/utils'
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select
const { Search } = Input
const { AddStructure } = AuthorizationCode

const HeaderDetails = (props) => {
    const { dispatch, user, filtrate, structTypes, defaultFilterType, changeNewlyVisible, defaultSearchVal } = props

    useEffect(() => {
        dispatch(getStructTypes())
    }, [])

    return (
        <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col>
                <Button onClick={() => { changeNewlyVisible(0) }} disabled={!Func.judgeRights(AddStructure)} type="primary" icon={<PlusOutlined />}>新建</Button>
            </Col>
            <Col span={8}>
                <Search
                    placeholder="输入关键字搜索"
                    defaultValue={defaultSearchVal}
                    enterButton
                    onSearch={(v, e) => {
                        if (!v) v = 1
                        filtrate(null, v)
                    }}
                />
            </Col>
            <Col>
                <label style={{ marginRight: 4 }}>过滤:</label>
                <Select
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                    defaultValue={defaultFilterType ? defaultFilterType : -1}
                    placeholder="监测对象类型" onChange={(id) => filtrate(id)} style={{ width: 120 }}>
                    <Option key={0} value={-1}>全部</Option>
                    {
                        structTypes.map(val => {
                            return <Option key={val.id} value={val.id}>
                                {val.name}
                            </Option>;
                        })
                    }
                </Select>
            </Col>
        </Row>
    )
}

function mapStateToProps(state) {
    const { structTypes, auth } = state;
    return {
        user: auth.user,
        isRequesting: structTypes.isRequesting,
        structTypes: structTypes.data || [],
    }
}
export default connect(mapStateToProps)(HeaderDetails);