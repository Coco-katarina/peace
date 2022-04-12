'use strict';
import React, { forwardRef, useState } from 'react';
import { Form } from '@peace/components';

const NVREditor = forwardRef((props, ref) => {
    const { dataToEdit = {}, isEdit, nvrs, vendors } = props;

    if (!isEdit) {
        dataToEdit["vendor"] = 1;
        dataToEdit["channelsTotal"] = 16
    }
    const formItems = [{
        type: 'Text',
        id: 'name',
        label: '名称',
        rules: [{
            required: true, message: 'NVR名称不能为空', whitespace: true
        }, {
            validator: async (rule, value) => {
                if (value) {
                    let namesConfiged = nvrs ? Object.keys(nvrs).map(id => nvrs[id].name) : [];
                    let names = namesConfiged;
                    if (isEdit) {
                        names = namesConfiged.filter(name => name != dataToEdit.name);
                    }
                    if (names.includes(value.trim())) {
                        return Promise.reject('抱歉，该名称已被占用');
                        
                    }
                }
                return Promise.resolve();
            }
        }],
        itemProps: { autoSize: true, maxLength: 50, placeholder: 'NVR名称' }
    }, {
        type: 'Select',
        id: 'vendor',
        label: '厂家',
        optionsSrc: vendors ? Object.keys(vendors).map(key => {
            return {
                id: Number(vendors[key].id),
                name: vendors[key].name
            }
        }) : [] || [],
        itemProps: { allowClear: false },
        rules: [{ required: true, message: 'NVR厂家不能为空' }]
    }, {
        type: 'Input',
        id: 'ip',
        label: '地址',
        rules: [{ required: true, message: 'NVR服务地址不能为空' }],
        itemProps: { placeholder: 'NVR服务地址' }
    }, {
        type: 'InputNumber',
        id: 'port',
        label: '端口',
        rules: [{ required: true, type: 'number', message: '0至65535的数字' }],
        itemProps: { min: 0, max: 65535, placeholder: '0至65535' }
    }, {
        type: 'Text',
        id: 'username',
        label: '帐号',
        rules: [{ required: true, message: 'NVR帐号不能为空' }],
        itemProps: { autoSize: true, maxLength: 50, placeholder: 'NVR帐号' }
    }, {
        type: 'Text',
        id: 'password',
        label: '密码',
        rules: [{ required: true, message: 'NVR密码不能为空' }],
        itemProps: { autoSize: true, maxLength: 50, placeholder: 'NVR密码' }
    }, {
        type: 'Select',
        id: 'channelsTotal',
        label: '通道数',
        optionsSrc: [4, 8, 16, 32, 64].map(item => {
            return {
                id: item,
                name: `${item}通道`
            }
        }),
        rules: [{ required: true, message: 'NVR通道号不能为空' }],
        itemProps: { placeholder: "请选择NVR通道数" }
    }];

    return (
        <Form
            ref={ref}
            formItems={formItems}
            popupContainerId='nvr-set-form'
            isEdit={isEdit}
            dataToEdit={dataToEdit}
            formItemLayout={{ labelCol: { span: 7 }, wrapperCol: { span: 12 } }}
        />
    )
})
export default NVREditor