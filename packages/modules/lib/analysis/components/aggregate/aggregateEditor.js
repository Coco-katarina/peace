'use strict';
import React, { forwardRef, useState } from 'react';
import { Form } from '@peace/components';
import *as AggConfig from '../../constants/aggConfig'

const AggregateEditor = forwardRef((props, ref) => {
    const { dataToEdit = {}, isEdit, factors } = props;
    const [dayConfig, setDayConfig] = useState(false);
    const [weekConfig, setWeekConfig] = useState(false);
    const [monthConfig, setMonthConfig] = useState(false);
    const [formChangeValue, setFormChangeValue] = useState({ natural: true, category: dataToEdit && dataToEdit.category });

    let startHourOptionSrc = [];
    let monthOptionSrc = [];
    for (let i = 0; i < 25; i++) {
        startHourOptionSrc.push({ id: Number(i), name: i })
    }
    for (let i = 1; i < 32; i++) {
        /**todo
         * 当月天数
         */
        monthOptionSrc.push({ id: Number(i), name: `第${i}号` })
    }

    const handleCategoryChange = (value) => {//聚集不同展示界面不同
        if (value == AggConfig.CategoryToNum["日聚集"]) {
            setDayConfig(true)
            setWeekConfig(false)
            setMonthConfig(false)
            setFormChangeValue(Object.assign({ ...formChangeValue, natural: true, category: AggConfig.CategoryToNum['日聚集'] }))
        } else if (value == AggConfig.CategoryToNum["周聚集"]) {
            setDayConfig(false)
            setWeekConfig(true)
            setMonthConfig(false)
            setFormChangeValue(Object.assign({ ...formChangeValue, natural: false, category: AggConfig.CategoryToNum['周聚集'] }))
        } else if (value == AggConfig.CategoryToNum["月聚集"]) {
            setDayConfig(false)
            setWeekConfig(false)
            setMonthConfig(true)
            setFormChangeValue(Object.assign({ ...formChangeValue, natural: false, category: AggConfig.CategoryToNum['月聚集'] }))
        } else if (value == AggConfig.CategoryToNum["时聚集"]) {
            setDayConfig(false)
            setWeekConfig(false)
            setMonthConfig(false)
            setFormChangeValue(Object.assign({ ...formChangeValue, natural: false, category: AggConfig.CategoryToNum['时聚集'] }))
        }
    }
    const handleNaturalChange = (value) => {//自然日选中，更新dataToEdit值，用于动态渲染时间范围提示词
        setFormChangeValue(Object.assign({ ...formChangeValue, natural: value }))
    }
    //设初始值
    if (!isEdit) {
        dataToEdit.factorId = factors && factors.length > 0 ? factors[0].id : '';
        dataToEdit.category = AggConfig.CategoryToNum['时聚集'];
        dataToEdit.algorithm = AggConfig.AlgorithmToNum['平均值'];
    }
    const initDataArr = [{ id: "natural", value: true },
    { id: "enable", value: true },
    { id: "startHour", value: 0 },
    { id: "endHour", value: 24 },
    { id: "startDay", value: 1 },
    { id: "endDay", value: 7 },
    { id: "startMonDay", value: 1 },
    { id: "endMonDay", value: 31 }];
    AggConfig.initData(dataToEdit, initDataArr)

    const formItems = [{
        type: 'Select',
        id: 'factorId',
        label: '监测因素',
        optionsSrc: factors || [],
        itemProps: { allowClear: false },
    }, {
        type: 'Select',
        id: 'category',
        label: '类型',
        optionsSrc: Object.keys(AggConfig.Category).map(item => {
            return {
                id: Number(item),
                name: AggConfig.Category[item]
            }
        }),
        itemProps: { allowClear: false, onChange: handleCategoryChange }
    }, {
        type: 'Switch',
        id: 'enable',
        label: '状态',
        containerProps: { valuePropName: "checked" },
        itemProps: { defaultChecked: true, checkedChildren: "启用", unCheckedChildren: "禁用" }
    }, {
        type: 'Select',
        id: 'algorithm',
        label: '聚集方式',
        optionsSrc: Object.keys(AggConfig.AlgorithmToName).map(item => {
            return {
                id: Number(item),
                name: AggConfig.AlgorithmToName[item]
            }
        }),
        itemProps: { allowClear: false }
    }];

    //根据聚集方式渲染
    if (dayConfig || formChangeValue.category == AggConfig.CategoryToNum['日聚集']) {
        formItems.push({
            type: 'Switch',
            id: 'natural',
            label: '自然日',
            containerProps: { valuePropName: "checked" },
            itemProps: { defaultChecked: dataToEdit ? dataToEdit.natural == true ? true : false : true, checkedChildren: "是", unCheckedChildren: "否", onChange: handleNaturalChange }
        });
        formItems.push({
            type: 'Custom',
            id: 'custom',
            label: '每天时间范围',
            itemChildren: [{
                type: 'Select',
                id: 'startHour',
                itemProps: { allowClear: false },
                containerProps: { dependencies: ['endHour'], style: { display: 'inline-block', width: 'calc(30%)' } },
                optionsSrc: startHourOptionSrc,
                rules: [({ getFieldValue }) => ({
                    validator(_, value) {
                        const endTime = getFieldValue('endHour');
                        const natural = getFieldValue('natural');
                        if (natural == false || value < endTime) {
                            return Promise.resolve();
                        } else {
                            return Promise.reject('开始时间需小于结束时间');
                        }
                    },
                }),]
            }, {
                type: 'Span',
                id: 'startHourSpan',
                value: `至${formChangeValue.natural == true ? '' : '次日'}`,
                containerProps: { style: { display: 'inline-block', width: `calc(${formChangeValue.natural == true ? '10%' : '30%'})`, textAlign: 'center' } },
            }, {
                type: 'Select',
                id: 'endHour',
                itemProps: { allowClear: false },
                containerProps: { style: { display: 'inline-block', width: 'calc(30%)' } },
                optionsSrc: startHourOptionSrc
            }, {
                type: 'Span',
                id: 'endHourSpan',
                value: '时',
                containerProps: { style: { display: 'inline-block', width: `calc(10%)`, textAlign: 'center' } },
            }]
        })
    }
    if (weekConfig || formChangeValue.category == AggConfig.CategoryToNum['周聚集']) {
        formItems.push({
            type: 'Custom',
            id: 'weekConfigCustom',
            label: '聚集日期范围',
            itemChildren: [{
                type: 'Select',
                id: 'startDay',
                itemProps: { allowClear: false },
                containerProps: { dependencies: ['endDay'], style: { display: 'inline-block', width: 'calc(40%)' } },
                optionsSrc: Object.keys(AggConfig.AggtimeDayOfWeek).map(item => {
                    return {
                        id: Number(item),
                        name: AggConfig.AggtimeDayOfWeek[item]
                    }
                }),
                rules: [({ getFieldValue }) => ({
                    validator(_, value) {
                        const endDay = getFieldValue('endDay');
                        if (value < endDay) {
                            return Promise.resolve();
                        } else {
                            return Promise.reject('开始时间需小于结束时间');
                        }
                    },
                }),]
            }, {
                type: 'Span',
                id: 'startDaySpan',
                value: `至`,
                containerProps: { style: { display: 'inline-block', width: `calc(10%})`, textAlign: 'center' } },
            }, {
                type: 'Select',
                id: 'endDay',
                itemProps: { allowClear: false },
                containerProps: { style: { display: 'inline-block', width: 'calc(40%)' } },
                optionsSrc: Object.keys(AggConfig.AggtimeDayOfWeek).map(item => {
                    return {
                        id: Number(item),
                        name: AggConfig.AggtimeDayOfWeek[item]
                    }
                })
            }]
        })
    }
    if (monthConfig || formChangeValue.category == AggConfig.CategoryToNum['月聚集']) {
        formItems.push({
            type: 'Custom',
            id: 'monthConfigCustom',
            label: '聚集日期范围',
            itemChildren: [{
                type: 'Select',
                id: 'startMonDay',
                itemProps: { allowClear: false },
                containerProps: { dependencies: ['endMonDay'], style: { display: 'inline-block', width: 'calc(40%)' } },
                optionsSrc: monthOptionSrc,
                rules: [({ getFieldValue }) => ({
                    validator(_, value) {
                        const endMonDay = getFieldValue('endMonDay');
                        if (value < endMonDay) {
                            return Promise.resolve();
                        } else {
                            return Promise.reject('开始时间需小于结束时间');
                        }
                    },
                }),]
            }, {
                type: 'Span',
                id: 'startDaySpan',
                value: `至`,
                containerProps: { style: { display: 'inline-block', width: `calc(10%})`, textAlign: 'center' } },
            }, {
                type: 'Select',
                id: 'endMonDay',
                itemProps: { allowClear: false },
                containerProps: { style: { display: 'inline-block', width: 'calc(40%)' } },
                optionsSrc: monthOptionSrc
            }]
        })
    }

    return (
        <Form
            ref={ref}
            formItems={formItems}
            popupContainerId='aggregate-set-form'
            isEdit={isEdit}
            dataToEdit={dataToEdit}
        />
    )
})

export default AggregateEditor;