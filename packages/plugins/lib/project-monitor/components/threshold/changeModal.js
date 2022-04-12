'use strict';
import React, { forwardRef, useState } from 'react';
import classNames from 'classnames';
import { Modal, Button, Form, Input, Select, Table, Row, Card, Col, Alert, Space } from 'antd';
import { PlusOutlined, MinusOutlined, CloseOutlined } from '@ant-design/icons';
import './threshold.less'

const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

const ChangeModal = (props, ref) => {
    const [form] = Form.useForm();
    const { resetFields, setFieldsValue, getFieldValue, validateFields } = form || {};
    const { modalProps, factor, stations, batchThreshold, alarmLevel, ok, onCancle } = props;
    const { isEdit, modalData } = modalProps;


    const handleOk = () => {
        validateFields().then(values => {
           
        });
    }
    const handleCancel = () => {
        resetFields();
        onCancle();
    }

    return (<Modal
        title={`${isEdit ? '编辑' : '新增'}阈值`}
        visible={true}
        maskClosable={false}
        width={980}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{ maxHeight: window.innerHeight - 300, overflowY: 'auto' }}>
        <div>变化速率</div>
    </Modal>)
}
export default ChangeModal;