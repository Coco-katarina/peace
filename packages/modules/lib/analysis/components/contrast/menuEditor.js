import React, { forwardRef, useState } from 'react';
import { DatePicker } from 'antd';
import { Form } from '@peace/components';

const { RangePicker } = DatePicker;

const MenuEditor = forwardRef((props, ref) => {
    const { stations, onStationChange } = props;
    const [stationIds, setStationIds] = useState([])

    const handleChange = (value) => {
        setStationIds(value);
        onStationChange(value);
    }
    /**
  * 1.测点列表支持多选
  * 2.单个测点支持多个时间段
  * 3.多个测点一个时间段
  */
    const formItems = [{
        type: 'Select',
        id: 'stationId',
        placeholder: "请选择测点",
        optionsSrc: stations || [],
        rules: [{ required: true, message: '请选择测点' }],
        itemProps: { allowClear: true, mode: 'multiple', onChange: handleChange },
    }];
    if (stationIds.length > 1) {
        //测点多选时，时间只可一个
        formItems.push({
            type: 'RangePicker',
            id: 'timeDateStrings',
            rules: [{ required: true, message: '请选择时间' }],
            itemProps: { showTime: true }
        })
    } else {
        formItems.push({
            type: 'Dynamic',
            id: 'dynamic',
            rules: [{
                validator: async (_, names) => {
                    let num = 0;
                    if (names && names.length) {
                        names.map(n => { if (Array.isArray(n)) num++ })
                    }
                    if (num < 2) { return Promise.reject('至少选择两个时间'); }
                    else { return Promise.resolve(); }
                },
            }],
            itemChildren: {
                component: <RangePicker showTime format={"YYYY/MM/DD HH:mm:ss"} />,
                maxNum: 4
            }
        })
    }

    return <Form
        ref={ref}
        formItems={formItems}
        formItemLayout={{ labelCol: { span: 0 }, wrapperCol: { span: 24 } }}
        popupContainerId='contrast-menu-set-form'
        isEdit={false}
        dataToEdit={{ dynamic: [{ key: 0 }, { key: 1 }] }}
    />

})
export default MenuEditor