import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Input, Form } from 'antd';
import { editProjectUrl } from "../actions/projectInfo";
import { SettingOutlined } from '@ant-design/icons';

const FormItem = Form.Item;

const AddressModal = (props) => {
    const { currProjectUrl, currProjectId, dispatch, closeModal, visible, currPrefix } = props;
    const [inputDisable, setInputDisable] = useState(true)
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields().then(values => {
            if (values.newId == currProjectUrl) {
                return closeModal()
            }
            dispatch(editProjectUrl(currProjectId, values.newId)).then(res => {
                if (res.success) {
                    closeModal(true);
                }
            })
        })
    }

    return (
        <Modal
            title={'项目地址'}
            visible={visible}
            onOk={handleOk}
            onCancel={closeModal}
            maskClosable={false}
            width={670}
        >
            <Form form={form} initialValues={{
                newId: currProjectUrl
            }}>
                <FormItem name='newId' label="项目名称" validateFirst rules={[{
                    required: true, message: '项目ID不能为空',
                }, {
                    whitespace: true, message: '不能输入空格做为ID',
                }, {
                    pattern: /^[a-z0-9][a-z0-9-]{0,39}$/, message: '项目ID由长度40以内小写字母、数字、- 组成，且不要以 - 开头'
                }]}>
                    <Input
                        addonBefore={currPrefix}
                        addonAfter={<span onClick={() => setInputDisable(!inputDisable)} style={{ cursor: 'pointer' }}><SettingOutlined /> 修改</span>}
                        disabled={inputDisable}
                    />
                </FormItem>
            </Form>
        </Modal>
    )
}

function mapStateToProps(state) {
    const { auth } = state;
    return {

    };
}

export default connect(mapStateToProps)(AddressModal);