/**
 * Created by zmh on 2017/6/20.
 */
'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Input, Form, Button } from 'antd';
import { addFolder } from '../actions/fileInfo';

const FormItem = Form.Item;
const createForm = Form.create;
const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 12 },
}

class NewFolderModal extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
    }

    handleOk = () => {
        const form = this.formRef.current;
        form.validateFields().then((values) => {
            this.props.dispatch(addFolder(this.props.form.getFieldsValue()));
            const { closeFolderModal } = this.props;
            closeFolderModal();
        })
    }
    handleCancel = () => {
        const { closeFolderModal } = this.props;
        closeFolderModal();
    }

    render() {
        return (
            <Modal title="新建文件夹" visible={true} onOk={this.handleOk} onCancel={this.handleCancel} maskClosable={false}
                footer={[<Button key="cancel" onClick={this.handleCancel}>取消</Button>,
                <Button key="submit" type="primary" onClick={this.handleOk}>保存</Button>]} width={500}>
                <Form layout="horizontal" ref={this.formRef}>
                    <FormItem id="folderName-input" label={"文件名"} {...formItemLayout} hasFeedback name='folderName'
                        rules={[
                            { required: true, message: '不能为空' }
                        ]}>
                        <Input placeholder="请输入" id="folderName" style={{ float: 'left' }} />
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default connect()(NewFolderModal)