'use strict';
import React, { forwardRef } from 'react';
import moment from 'moment';
import { Form } from '@peace/components';

const ReportGenerateEditor = forwardRef((props, ref) => {
    const formItems = [{
        type: 'DatePicker',
        id: 'dateTime',
        label: '生成日期',
        rules: [() => ({
            validator(_, value) {
                if (value > moment().endOf('day')) {
                    return Promise.reject('请选择当前时间之前的日期！');
                } else {
                    return Promise.resolve();
                }
            }
        })],
        containerProps: { initialValue: moment() },
        itemProps: { disabledDate: (current) => current && current > moment().endOf('day'), allowClear: false }
    }];
    return (
        <Form
            ref={ref}
            formItems={formItems}
            popupContainerId='report-generate-form'
            formItemLayout={{ labelCol: { span: 8 }, wrapperCol: { span: 12 } }}
            isEdit={false}
            dataToEdit={[]}
        />
    )
})

export default ReportGenerateEditor;