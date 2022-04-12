'use strict'
import React, { Component } from 'react';
import { Row, Col, Timeline } from 'antd';

class State extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alarmMsgRowStyle: {
                marginTop: 7,
            },
            alarmMsgColStyle: {
                paddingTop: 3,
                color: '#909090',
                fontSize: 10
            },
        }
    }

    render() {
        const { linkState, alarmMsg } = this.props
        const { alarmMsgColStyle } = this.state

        return (
            <div style={{
                // height:,
                // overflow: 'auto'
            }}>
                <Row >
                    <Col span={1}></Col>
                    <Col span={22}>
                        <span>在线状态： </span>
                        {linkState == 1 ? <span style={{ color: 'green' }}>在线</span>
                            :
                            linkState == 0 ? <span style={{ color: 'red' }}>离线</span>
                                : <span style={{ color: '#787878' }}>未知</span>
                        }
                        <p style={{ marginTop: 10 }}>实时告警：{alarmMsg.new.length > 0 ? '' : "无"} </p>
                        {
                            alarmMsg.new.length > 0 ? alarmMsg.new.map(s => <Row style={{ marginTop: 7 }}>
                                <Col span="1"></Col>
                                <Col span="23" style={{}}>{s.alarmContent}</Col>
                                <Col span="1"></Col>
                                <Col span="23" style={alarmMsgColStyle}>产生次数：{s.alarmCount}次</Col>
                                <Col span="1"></Col>
                                <Col span="23" style={alarmMsgColStyle}>产生时间：{s.startTime}</Col>
                                <Col span="1"></Col>
                                <Col span="23" style={alarmMsgColStyle}>更新时间：{s.endTime}</Col>
                            </Row>) : null
                        }


                        <p style={{ marginTop: 21 }}>历史告警：{alarmMsg.history.length > 0 ? '' : "无"} </p>
                        <Timeline style={{ marginTop: 7, marginLeft: 13 }}>
                            {
                                alarmMsg.history.length > 0 ? alarmMsg.history.map(s =>

                                    <Timeline.Item>
                                        <p> {s.alarmContent} / <span style={alarmMsgColStyle}> {s.startTime}</span></p>
                                        <p style={alarmMsgColStyle}>产生次数：{s.alarmCount}次</p>
                                        <p style={alarmMsgColStyle}>更新时间：{s.endTime}</p>
                                    </Timeline.Item>

                                ) : null
                            }
                        </Timeline>

                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}
export default State;