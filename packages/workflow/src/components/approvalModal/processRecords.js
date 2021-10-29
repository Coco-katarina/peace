'use strict';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Modal, Row, Col, Form, Input, Radio, message, Select, Tabs, Button, Timeline } from 'antd';
const { Option } = Select;
const { TabPane } = Tabs;
import moment from 'moment';



const ProcessRecords = props => {
    const { visible, recordData } = props
    // console.log(recordData);

    const onClose = () => {
        const { onCancel } = props
        onCancel()
    }

    const timeLine = (data) => {
        return <Timeline>
            <Timeline.Item>
                提交申请：{data.application}
                <span style={{ display: 'inline-block', marginLeft: 30 }}><ClockCircleOutlined />{moment(data.submissionTime).format('YYYY-MM-DD-HH:mm:ss')} </span>
            </Timeline.Item>
            <Timeline.Item>
                方案部审核：
            </Timeline.Item>
            <Timeline.Item>

            </Timeline.Item>

        </Timeline>

    }
    return <Modal
        visible={visible}
        onCancel={onClose}
        title='流程记录'
        destroyOnClose
        footer={null}
    >
        <div>
            <Row gutter={16}>
                <Col span={12}>审核编号：{recordData.id}</Col>
                <Col span={12}>申请事项：{recordData.name}</Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>审核人：{recordData.application}</Col>
                <Col span={12}>申请部门：{recordData.department}</Col>
            </Row>
        </div >
        <div style={{ marginTop: 5 }}>
            <span style={{ display: 'inline-block', marginBottom: 5 }}>审核流程：</span>
            {timeLine(recordData)}
        </div>

    </Modal >

}
function mapStateToProps(state) {
    const { } = state
    return {

    }
}
export default connect(mapStateToProps)(ProcessRecords)