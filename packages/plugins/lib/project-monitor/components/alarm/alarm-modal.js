'use strict'
import React, { Component } from 'react';
import { Modal, Input } from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';

class AlarmModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmContent: '',
            display: 'none'
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.visible != nextProps.visible) {
            this.setState({ confirmContent: '', display: 'none' })
        }
    }

    handleOk = () => {
        if (this.state.confirmContent) {
            this.props.onOk(this.state.confirmContent);
        }
        else {
            this.setState({ display: 'inline' })
        }
    }

    handleCancel = () => {
        this.props.onCancel();
    }

    handleChange = (e) => {
        this.setState({ confirmContent: e.target.value })
    }

    render() {
        return (
            <Modal
                maskClosable={false}
                title={<span><QuestionCircleFilled style={{ color: '#ffbf00', marginRight: 8 }} />人工恢复告警？</span>}
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}>

                <Input
                    placeholder="请输入确认信息"
                    value={this.state.confirmContent}
                    onChange={e => { this.setState({ confirmContent: e.target.value, display: 'none' }) }}
                />
                <label style={{ display: this.state.display, color: '#f04134' }}>不可为空</label>
            </Modal>
        )
    }
}

export default AlarmModal;