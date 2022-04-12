import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input } from 'antd';

const ReportRename = props => {
    const { visible, editData, onClose, dispatch, actions } = props
    const [form] = Form.useForm();
    const { dataService } = actions

    return (
        <Modal
            visible={visible}
            title={'重命名'}
            onCancel={() => { onClose() }}
            onOk={() => {
                form.validateFields().then(v => {
                    if (v.name == editData.name) {
                        onClose()
                    } else {
                        dispatch(dataService.fileRename({
                            ...v,
                            id: editData.id
                        })).then(res => {
                            if (res.success) {
                                onClose(true)
                            }
                        })
                    }
                })
            }}
        >
            <Form
                form={form}
                name="basic"
                initialValues={{ name: editData.name }}
            >
                <Form.Item
                    label="文件名"
                    name="name"
                    rules={[{ required: true, message: '请输入文件名!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

function mapStateToProps (state) {
    const { auth, global } = state;
    return {
        requesting: false,
        actions: global.actions,
        user: auth.user
    };
}

export default connect(mapStateToProps)(ReportRename);