'use strict';
import React, { forwardRef, useState } from 'react';
import { CloseSquareFilled } from '@ant-design/icons';
import { Form, InputNumber, Select, Input, Button, message, Switch } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;

const CollectionEditor = forwardRef((props, ref) => {
    const [form] = Form.useForm();
    const { getFieldsValue, setFieldsValue, setFields, resetFields } = form;

    const { isEdit, dataToEdit,
        dimensions, collectionData, factorItemsData, alliIemsOption, stationsData,
        sectionCompare, onFormItemNum, onFormEnable } = props;
    const [staionItemData, setStaionItemData] = useState({});
    const [itemData, setItemData] = useState({});
    const [enable, setEnable] = useState(isEdit ? dataToEdit.enable : true);
    const [editFormItemNum, setEditFormItemNum] = useState(isEdit ? collectionData && collectionData[0] && collectionData[0].cond.length : 1);

    const formItemLayout = {
        labelCol: { sm: { span: 4 }, },
        wrapperCol: { sm: { span: 19 }, },
    };
    const onEnableChange = (value) => {
        setEnable(value);
        onFormEnable(value);//onSave 用
    }
    const handleEditFormItem = (num) => {
        setEditFormItemNum(num);
        onFormItemNum(num);//onSave 用
    }
    const valueConfirm = (rule, value, callback) => {
        let reg = /^\((-{1}|\+{1}|(-?((0|[1-9]\d*))(\.\d+)?)+),(-{1}|\+{1}|(-?((0|[1-9]\d*))(\.\d+)?)+)\)$/;
        try {
            if (value == "") return callback();

            let conditions = value.split(";")
            for (let i = 0; i < conditions.length; i++) {
                if (conditions[i] != "") {
                    if (!reg.test(conditions[i])) {
                        return callback('格式错误')
                    } else {
                        let value = conditions[i].slice(1, -1).split(",")

                        for (let v of value) {
                            let n = v.split(".");
                            if (n[0] && ((n[0][0] == '-' && n[0].length > 8) || (n[0][0] != '-' && n[0].length > 7))) {
                                return callback(`(${value[0]},${value[1]})整数部分最多7位`)
                            }
                            if (n[1] && n[1].length > 6) {
                                return callback(`(${value[0]},${value[1]})小数部分最多6位`)
                            }
                        }

                        if ((parseFloat(value[0]) >= parseFloat(value[1])) || (value[0] == '-' && value[1] == '-') ||
                            (value[0] == '+' || value[1] == '-') || (value[0] == '-' && value[1] == '+')) {
                            return callback(`(${value[0]},${value[1]})数值区间错误`)
                        }

                        for (let j = 0; j < i; j++) {
                            if (conditions[j] != "") {
                                let value_ = conditions[j].slice(1, -1).split(",");

                                if (sectionCompare(value_, value)) {
                                    return callback(`(${value[0]},${value[1]})与(${value_[0]},${value_[1]})数值区间有交集`)
                                }

                            }
                        }

                    }
                }
            }
            return callback()
        } catch (e) {
            return callback('格式错误')
        }
    }
    const handleItemChange = (i, value) => {
        setItemData({ [`${i}`]: value });//重新渲染页面
    }
    const handleStationChange = (i, value) => {
        setStaionItemData({ [`${i}`]: value });//重新渲染页面
    }
    const renderRules = () => {
        let values = getFieldsValue();
        //筛 已经被选了的
        let selected = [];//[stationId, itmeId]
        for (let i = 1; i <= editFormItemNum; i++) {
            selected.push([values[`station-${i}`], values[`item-${i}`]])
        }
        let s = [];
        //edit
        let editConds = isEdit ? collectionData && collectionData[0] && collectionData[0].cond : null;

        for (let i = 1; i <= editFormItemNum; i++) {
            let stationValue = values[`station-${i}`];
            let itemValue = values[`item-${i}`];

            let itemOptions = stationValue == undefined ?
                alliIemsOption : factorItemsData.filter(s => s.id == stationsData.filter(station => station.stationId == stationValue)[0].factorId)[0].items;

            let stationOptions;
            if (itemValue != undefined && stationValue == undefined) {
                let ItemsData = [];
                for (let factorItems of factorItemsData) {
                    for (let item of factorItems.items) {
                        if (item.id == itemValue) {
                            ItemsData.push(factorItems);
                            break;
                        }
                    }
                }
                stationOptions = stationsData.filter(s => ItemsData.some(item => item.id == s.factorId))
            } else {
                stationOptions = stationsData;
            }

            if (itemOptions.length && itemValue && !itemOptions.some(itemOption => itemOption.id == itemValue)) {
                let s = {}
                s[`item-${i}`] = undefined;
                setFieldsValue(s)
            }

            for (let j = 0; j < selected.length; j++) {
                if (selected[j][0] == stationValue && itemValue == selected[j][1] && j + 1 < i && selected[j][1] != undefined) {
                    selected[j][1] = undefined;
                    resetFields([`item-${i}`])
                    break;
                }
            }

            //edit
            let cond = isEdit && i <= editConds.length ? editConds.filter(c => c.no == i)[0] : null;
            let editItemId = isEdit && cond ? alliIemsOption.filter(i => i.field_name == cond.factor_item)[0].id : undefined;
            let editFire = "";
            let editRecovery = "";

            if (isEdit && cond) {
                if (itemValue == undefined && stationValue == undefined) {
                    itemOptions = factorItemsData.filter(s => s.id == stationsData.filter(station => station.stationId == cond.sensor)[0].factorId)[0].items;
                }

                for (let f of cond.fire) {
                    editFire += `(${f.lower},${f.upper});`
                }
                for (let r of cond.recover) {
                    editRecovery += `(${r.lower},${r.upper});`
                }
            }

            s.push(<div key={i}>
                <div style={{ fontSize: 13, color: "rgb(0,0,0,0.85)" }}>规则
                        <span style={{ fontWeight: 'bold' }}> {i} </span>
                        :
                    {i != 1 && i == editFormItemNum ?
                        <CloseSquareFilled
                            onClick={() => handleEditFormItem(editFormItemNum - 1)}
                            style={{ float: 'right', marginRight: 21, color: '#f46e65', fontSize: 16 }}
                        /> : null}
                </div>
                <FormItem
                    name={`station-${i}`}
                    key={`station-${i}`}
                    label="测点"
                    rules={[{ required: true, message: '测点不能为空' }]}
                    initialValue={isEdit && cond ? cond.sensor : undefined} //默认值
                    {...formItemLayout}>
                    <Select placeholder="请选择测点"
                        onChange={(i, values) => handleStationChange(i, values)}
                    >
                        {stationOptions.map(s => <Option key={s.stationId} value={s.stationId}>{s.stationName}</Option>)}
                    </Select>
                </FormItem>
                <FormItem
                    name={`item-${i}`}
                    key={`item-${i}`}
                    label="监测项"
                    rules={[{ required: true, message: '监测项不能为空' }]}
                    initialValue={isEdit ? editItemId : undefined}
                    {...formItemLayout}
                >
                    <Select placeholder="请选择监测项"
                        onChange={(i, values) => handleItemChange(i, values)}
                    >
                        {itemOptions.map(item => <Option
                            disabled={selected.some((s, index) => {
                                return s[0] == stationValue && item.id == s[1] && index + 1 != i
                            })}
                            value={item.id}
                            key={item.id}
                        >{item.name}</Option>
                        )}
                    </Select>
                </FormItem>
                <FormItem
                    name={`trigger-${i}`}
                    key={`trigger-${i}`}
                    label="触发条件"
                    initialValue={isEdit ? editFire : undefined}
                    rules={[{ required: true, message: '触发条件不能为空' },
                    { validator: valueConfirm }
                    ]}
                    {...formItemLayout} >
                    <Input placeholder="(0,1);" />
                </FormItem>
                <FormItem
                    name={`recovery-${i}`}
                    key={`recovery-${i}`}
                    label="恢复条件"
                    initialValue={isEdit ? editRecovery : undefined}
                    rules={[{ required: true, message: '恢复条件不能为空' },
                    { validator: valueConfirm }
                    ]}
                    {...formItemLayout} >
                    <Input placeholder="(0,1);" />
                </FormItem>
            </div >)
        }
        return s;
    };

    return (<Form
        layout='horizontal'
        scrollToFirstError
        ref={ref}
        form={form}
        id={'collection-form'}
        name={'collection-form'}
    >
        <FormItem
            name={"dimension"}
            key={"dimension"}
            label={"维度"}
            rules={[{ required: true, message: '维度不能为空' }]}
            initialValue={isEdit ? dataToEdit.dimensionId : undefined}

            {...formItemLayout}
        >
            <Select placeholder="请选择维度">
                {dimensions.map(s => <Option
                    key={s.id}
                    value={s.id}
                    disabled={
                        !isEdit ?
                            s.selected :
                            s.id == dataToEdit.dimensionId ?
                                false : s.selected
                    }
                >{s.name}</Option>)}
            </Select></FormItem>
        <FormItem
            name={"granularity"}
            key={"granularity"}
            label={"粒度"}
            rules={[{ required: true, message: '粒度不能为空' }]}
            initialValue={isEdit ? collectionData && collectionData[0] && collectionData[0].glt : 1}
            {...formItemLayout}
        >
            <InputNumber
                style={{ width: 120 }}
                min={1}
                max={99999}
                formatter={value => `${value}分`}
                parser={value => value.replace('分', '')}
            />
        </FormItem>
        {renderRules()}
        <Button onClick={() => handleEditFormItem(editFormItemNum + 1)}>增加规则</Button>
        <Switch
            style={{ float: 'right', marginTop: 4, marginRight: 21 }}
            checked={enable}
            checkedChildren="启用" unCheckedChildren="关闭"
            onChange={(value) => onEnableChange(value)} />
        <div style={{ fontSize: "smaller", color: "#C8C8C8", margin: "10px 30px 0 20px" }}>同一测点的同一监测项只能选择一次</div>
        <div style={{ fontSize: "smaller", color: "#C8C8C8", margin: "0 30px 0 20px" }}>请在英文输入状态下填写触发与恢复条件，如:(0,1)，开区间，多个区间以 “;” 分隔，且区间不能重叠；触发条件与恢复条件不能有交集；其中，正无穷用 “+” 表示，负无穷用 “-” 表示。</div>
    </Form >)
});
export default CollectionEditor