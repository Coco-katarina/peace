'use strict';
import React, { forwardRef, useState } from 'react';
import classNames from 'classnames';
import { Modal, Button, Form, Input, Select, Table, Row, Card, Col, Alert, Space } from 'antd';
import { PlusOutlined, MinusOutlined, CloseOutlined } from '@ant-design/icons';
import { CategoryToThreshold } from '../../constants/threshold'
import './threshold.less'

const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

const ThresholdModal = (props, ref) => {
    const [form] = Form.useForm();
    const { resetFields, setFieldsValue, getFieldValue, validateFields } = form || {};
    const { modalProps, factor, factorId, structId, alarmLevel, modalType = 'comm', ok, onCancle } = props;
    const { isEdit, modalData } = modalProps;
    const [tiptitle, setTiptitle] = useState('查看-阈值格式')
    const [showThresholdFormatTip, setShowThresholdFormatTip] = useState(false);
    const [showDivisionHourTip, setShowDivisionHourTip] = useState({ value: false, msg: null });
    //测项选择
    const [modalVisibleItems, setModalVisibleItems] = useState(
        isEdit ?
            modalType == "change" ? modalData.dataToEdit.itemId.toString() : modalData.dataToEdit.items.map(m => m.id.toString())
            : factor ? [factor.items[0].id.toString()] : [])
    const [thresholdItemNum, setThresholdItemNum] = useState({});

    const doms = {
        threshold_input: { id_mid: '_threshold_input_' },
        threshold_key: { id_suffix: '_threshold' },
        time_division_key: { id_suffix: '_time_division' },
        time_division_select: { id_mid: '_time_division_select_' }
    };
    const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
    const threshFormItemLayout = { labelCol: { span: 10 }, wrapperCol: { span: 14 } };

    const getItemOptions = () => {
        if (!factor) {
            return null;
        }
        let options = factor.items.reduce((p, c) => {
            let option = {
                name: c.name,
                id: c.id
            };
            p.push(< Option value={option.id.toString()} key={option.id.toString()} > {option.name} </Option>);
            return p;
        }, []);
        return options;
    }
    const getItemsToEdit = (modalData, factorItems) => {
        if (modalData.items) {
            let oldItems = modalData.items;
            let oldItemIds = oldItems.map(m => m.id);
            let items = factorItems.map(item => {
                let { id } = item;
                if (oldItemIds.includes(id)) {
                    return oldItems.find(oldItem => oldItem.id == id);
                } else {
                    return item;
                }
            });
            return items;
        } else {
            let config = [{ thresholds: modalData.threshold }];
            let item = factorItems.filter(item => item.id === modalData.itemId).map(t => { return { ...t, config } });
            return item;
        }
    };
    const getFieldDecoratorItems = (id, options) => {
        const { threshold_input, time_division_select } = doms;
        let rules = [];
        if (id.includes(threshold_input.id_mid)) {
            rules = [
                { required: true, message: '请填写阈值', whitespace: true },
                { validator: (rule, value, callback) => checkThreshold(rule, value, callback, id) }];
        } else if (id.includes(time_division_select.id_mid)) {
            rules = [ // "type" property is set for the type of Option.value
                { required: true, message: '' }
            ];
        } else {
            switch (id) {
                case 'agg_category':
                case 'batch_sensors':
                    rules = [{ required: true, message: '请选择测点' }];
                    break;
                case 'items_checkbox_group':
                    rules = [{ required: true, message: '至少选择一个监测项' }];
                    break;
                default:
                    break;
            }
        }
        let fieldProps = Object.assign({}, { rules: rules, name: id, key: id }, options);
        return fieldProps;
    };
    const getDivisionHourProps = (itemId, oldItemData, rowKey, keys) => { // oldItemData = [{startTime, endTime, thresholds}]
        let couple = `item_${itemId}_row_${rowKey}${doms.time_division_select.id_mid}`;
        let extra = { itemId: itemId, keys: keys, currentKey: rowKey };
        let start = 0,
            end = 24;
        if (isEdit && oldItemData) {
            let oldData = oldItemData[rowKey]; // [rowKey] is the index of [oldItemData]
            if (oldData) {
                let { startTime, endTime } = oldData;
                start = startTime;
                end = endTime;
            }
        }
        let hourStartProps = {
            fieldProps: getFieldDecoratorItems(`${couple}start`, { initialValue: start }),
            itemProps: { onChange: value => handleDivisionHour(value, 'start', extra) }
        }
        let hourEndProps = {
            fieldProps: getFieldDecoratorItems(`${couple}end`, { initialValue: end }),
            itemProps: { onChange: value => handleDivisionHour(value, 'end', extra) }
        }
        return { hourStartProps, hourEndProps };
    };
    const getStartAndEndValue = (key, itemId, value, type, currentKey) => {
        let couple = `item_${itemId}_row_${key}${doms.time_division_select.id_mid}`;
        let start = null,
            end = null;
        if (key === currentKey) { // render after change action
            start = type === 'start' ? value : getFieldValue(`${couple}start`);
            end = type === 'end' ? value : getFieldValue(`${couple}end`);
        } else {
            start = getFieldValue(`${couple}start`);
            end = getFieldValue(`${couple}end`);
        }
        return { start, end };
    };
    const getStartNoLessThanEndKeys = (keys, itemId, value, type, currentKey) => {
        let invalidKeys = keys.filter(key => {
            let { start, end } = getStartAndEndValue(key, itemId, value, type, currentKey);
            let hasError = start >= end;
            return hasError;
        });
        return invalidKeys;
    };
    const addTimeDivision = (id) => {
        let keys = getFieldValue(id);
        let len = keys.length;
        let index = len === 0 ? 0 : keys[len - 1] + 1;
        keys = keys.concat(index);
        // important! notify form to detect changes
        setFieldsValue({ [id]: keys });
        setShowDivisionHourTip({ value: false, msg: null });
    };
    const removeTimeDivision = (k, id) => {
        // can use data-binding to get
        let keys = getFieldValue(id);
        if (keys.length > 1) { // remain at least one time-division config item
            keys = keys.filter((key) => key !== k);
            // can use data-binding to set
            setFieldsValue({ [id]: keys });
        }
        setShowDivisionHourTip({ value: false, msg: null });
    };
    const getThresholdToEdit = (oldItemData, rowKey, level) => { // oldItemData = [{startTime, endTime, thresholds: [{level, value}] }]
        if (oldItemData) {
            let oldData = oldItemData[rowKey]; // [rowKey] is the index of [oldItemData]
            if (oldData) {
                let { thresholds } = oldData;
                if (modalType == "change") {
                    let value = '';
                    for (let i = 0; i < thresholds.length; i++) {
                        if (thresholds[i].level == level) {
                            value += thresholds[i].value + ';';
                        }
                    }
                    value = value.slice(0, -1)
                    if (value) {
                        return value;
                    }
                } else {
                    let threshold = thresholds.find(t => t.level === level);
                    if (threshold) {
                        return threshold.value;
                    }
                }
            }
        }
        return null;
    };
    const thresholdValidReg = (value, checkEffectiveDigits = false) => { //阈值格式验证
        let num = checkEffectiveDigits ? '\\-?\\d{1,7}(\\.\\d{1,6})?' : '\\-?\\d+(\\.\\d+)?';
        let range = '\\((\\-|' + num + '),' + '(' + num + '|\\+)\\)';
        let reg = new RegExp('^' + range + '(;' + range + ')*$');
        let isValid = reg.test(value);
        return isValid;
    };
    const thresholdDownNoLessThanUpValidReg = (value) => { //左值小于右值验证
        let intervals = value.split(';');
        for (let i = 0; i < intervals.length; i++) {
            let interval = intervals[i].split(',')
            if (interval.length > 1) {
                let sDown = interval[0].split('(')[1],
                    sUp = interval[1].split(')')[0];
                if (sDown === '-' && sUp === '+') {
                    return null;
                } else if (sDown === '-' && sUp === '+') {
                    continue;
                }
                let down = parseFloat(sDown),
                    up = parseFloat(sUp);
                if (down >= up) {
                    return true;
                }
            }
        }
        return false;
    };
    const intervalsReg = (value) => { //间隔校验
        let num = '\\-?\\d+(\\.\\d+)?';
        let range = '\\((\\-|' + num + '),' + '(' + num + '|\\+)\\)';
        let matches = value.match(new RegExp(range, 'g'));
        let intervals = matches == null ? [] : matches;
        return intervals;
    };
    const checkNegativeInfinity = (up1, sDown2, sUp2) => { // valid interval are: {(-, sUp2);(sDown2,+);(sDown2,sUp2)}
        if (sDown2 === '-') {
            return true;
        } else if (sUp2 === '+') {
            if (up1 >= parseFloat(sDown2)) return true;
        } else {
            if (up1 > parseFloat(sDown2)) return true;
        }
    };
    const checkPositiveInfinity = (down1, sDown2, sUp2) => { // valid interval are: {(sDown2, +);(-,sUp2);(sDown2,sUp2)}
        if (sUp2 === '+') {
            return true;
        } else if (sDown2 === '-') {
            if (down1 <= parseFloat(sUp2)) return true;
        } else {
            if (down1 < parseFloat(sUp2)) return true;
        }
    };
    const checkValues = (down1, up1, sDown2, sUp2) => { // valid interval are: {(-, sUp2);(sDown2,+);(sDown2,sUp2)}
        if (sDown2 === '-') {
            if (parseFloat(sUp2) > down1) return true;
        } else if (sUp2 === '+') {
            if (parseFloat(sDown2) < up1) return true;
        } else {
            if (!(parseFloat(sUp2) <= down1 || parseFloat(sDown2) >= up1)) return true;
        }
    };
    const checkHoursIncomplete = (keys, itemId, value, type, currentKey) => {
        let sum = keys.reduce((p, key) => {
            let { start, end } = getStartAndEndValue(key, itemId, value, type, currentKey);
            let diff = end - start;
            p += diff;
            return p;
        }, 0);
        return !isNaN(sum) && sum !== 24;
    };
    const checkDivisionHours = (value, type, extra) => {
        const { itemId, keys, currentKey } = extra;
        let isIncomplete = null, aKeys = null;
        let invalidKeys = getStartNoLessThanEndKeys(keys, itemId, value, type, currentKey);
        let invalidKeysLen = invalidKeys.length;
        renderDivisionHourErrorTip(keys, false); // clear up errors tip
        if (invalidKeysLen > 0) {
            aKeys = invalidKeys;
        } else {
            aKeys = keys;
            isIncomplete = checkHoursIncomplete(keys, itemId, value, type, currentKey);
        }
        let hasError = invalidKeysLen || isIncomplete;
        let errorMessage = invalidKeysLen ? '起始时间必须小于截止时间' : (isIncomplete ? '各时段相加必须等于24小时' : null);
        setTimeout(() => renderDivisionHourErrorTip(aKeys, hasError), 300); // render will defer
        return {
            hasError,
            errorMessage
        };
    };
    const intervalOverlapCheck = (interval, otherLevelValue) => {
        let otherLevelIntervals = intervalsReg(otherLevelValue);
        let sDown1 = interval[0].split('(')[1],
            sUp1 = interval[1].split(')')[0];
        for (let i = 0; i < otherLevelIntervals.length; i++) {
            let couple = otherLevelIntervals[i].split(',');
            let sDown2 = couple[0].split('(')[1],
                sUp2 = couple[1].split(')')[0];
            let hasOverlap = false;
            if (sDown1 === '-') {
                hasOverlap = checkNegativeInfinity(parseFloat(sUp1), sDown2, sUp2);
            } else if (sUp1 === '+') {
                hasOverlap = checkPositiveInfinity(parseFloat(sDown1), sDown2, sUp2);
            } else {
                hasOverlap = checkValues(parseFloat(sDown1), parseFloat(sUp1), sDown2, sUp2);
            }
            if (hasOverlap) return true;
        }
        return false;
    };
    const thresholdsIntervalOverlapReg = (value, currentId) => { //区间不能重叠验证
        const matches = currentId.match(/\d+/g);
        if (matches.length > 2) {
            const currentItemId = matches[0],
                currentKey = matches[1],
                currentLevel = matches[2];
            const prefix = `item_${currentItemId}_row_${currentKey}${doms.threshold_input.id_mid}`;
            let otherLevels = [1, 2, 3, 4].filter(f => f !== parseInt(currentLevel));
            let intervals = intervalsReg(value);
            for (let i = 0; i < otherLevels.length; i++) {
                let level = otherLevels[i];
                let otherLevelValue = getFieldValue(`${prefix}${level}`);
                if (otherLevelValue) {
                    for (let index = 0; index < intervals.length; index++) {
                        let interval = intervals[index].split(',');
                        let intervalOverlap = intervalOverlapCheck(interval, otherLevelValue);
                        if (intervalOverlap) return true;
                    }
                }
            }
        }
        return false;
    };
    const checkThreshold = (rule, value, callback, currentId) => {
        if (value) {
            let isValidChar = thresholdValidReg(value);
            if (!isValidChar) {
                callback('阈值格式错误');
            } else if (!thresholdValidReg(value, true)) {
                callback('整数最多7位, 小数最多6位');
            } else {
                let isDownNoLessThanUp = thresholdDownNoLessThanUpValidReg(value);
                if (isDownNoLessThanUp) {
                    callback('开区间左值必须小于右值');
                } else if (isDownNoLessThanUp === null) {
                    callback('不能配置(-,+)');
                } else {
                    let isOverlap = thresholdsIntervalOverlapReg(value, currentId);
                    if (isOverlap) {
                        callback('区间不能重叠');
                    }
                }
            }
        }
        callback(); // [callback()] is required
    };
    const renderBatchSensors = () => {
        const { batchThreshold, stations } = props;
        if (!stations) {
            return null;
        }

        let configuredSensors = [];
        if (batchThreshold) {
            configuredSensors = Object.keys(batchThreshold).reduce((p, key) => {
                let { data } = batchThreshold[key];
                let sensorIds = data.stations.map(m => m.id);
                p = p.concat(sensorIds);
                return p;
            }, []);
        }
        let unconfiguredSensors = stations.filter(f => !configuredSensors.includes(f.id));
        let sensorsToConfig = [];
        if (isEdit) {
            let oldSensors = modalData.dataToEdit.stations;
            sensorsToConfig = oldSensors.concat(unconfiguredSensors);
        } else {
            sensorsToConfig = unconfiguredSensors;
        }
        let options = sensorsToConfig.reduce((p, c) => {
            p.push(<Option value={c.id.toString()} > {c.name} </Option>);
            return p;
        }, []);
        return options;
    }
    const renderBatchCategory = () => {
        const { aggConfigList, aggToConfig } = props;
        if (!aggConfigList) {
            return null;
        }
        if (isEdit) {
            let { aggCategory } = modalData.dataToEdit;
            return (<Select.Option value={aggCategory}>{CategoryToThreshold[aggCategory]}</Select.Option>)
        } else {
            let categoryAll = '';
            let aggConfigFilter = []
            if (modalVisibleItems.length) {
                aggToConfig.map(a => {
                    if (modalVisibleItems.includes(a.itemId.toString())) {
                        categoryAll = categoryAll.concat(a.aggCategory);
                    }
                })
            };
            if (categoryAll.length) {
                aggConfigFilter = aggConfigList.filter(f => !categoryAll.includes(f.category.toString()))
            }
            let options = aggConfigFilter.reduce((p, c) => {
                p.push(<Select.Option value={c.category}>{CategoryToThreshold[c.category]}</Select.Option>);
                return p;
            }, []);
            return options;
        }
    }
    const renderThresholdFormatTip = () => {
        const columns = [{
            title: '阈值等级',
            key: 'level',
            dataIndex: 'level'
        }, {
            title: '测量值(v)',
            key: 'data',
            dataIndex: 'data'
        }, {
            title: '阈值配置',
            key: 'config',
            dataIndex: 'config'
        }];
        const datad = [{
            key: '1',
            level: '一级阈值',
            data: 'v <= -100 或 v > 100',
            config: '(-,-100);(100,+)'
        }, {
            key: '2',
            level: '二级阈值',
            data: '-100 < v <= -55.5',
            config: '(-100,-55.5)'
        }, {
            key: '3',
            level: '三级阈值',
            data: '-55.5 < v <= -20',
            config: '(-55.5,-20)'
        }, {
            key: '4',
            level: '四级阈值',
            data: '50 < v <= 100',
            config: '(50,100)'
        }].filter(d => d.key <= alarmLevel);

        return (<div className='fs-config-threshold-alert'>
            <Table
                columns={columns}
                dataSource={datad}
                pagination={false}
                size='small'
                bordered />
        </div>
        );
    }
    const renderDivisionHours = () => {
        let options = [];
        for (let i = 0; i < 25; i++) {
            options.push(<Option key={i} value={i} style={{ padding: 4 }} > {`${i}时`} </Option>);
        }
        return options;
    };
    const renderThresholds = (itemId, oldItemData, colSpan, rowKey = 0) => {
        const LevelHanzi = { 1: '一', 2: '二', 3: '三', 4: '四' };
        let idPrefix = `item_${itemId}_row_${rowKey}`;
        let thresholdKey = `${idPrefix}${doms.threshold_key.id_suffix}`;

        // 渲染阈值配置
        let thresholdItem = getFieldValue(thresholdKey);
        if (!thresholdItem) {
            if (isEdit && oldItemData) {
                let oldData = oldItemData[rowKey]; // [rowKey] is the index of [oldItemData]
                if (oldData) {
                    let { thresholds } = oldData;
                    thresholdItem = [...new Set(thresholds.map(m => m.level))]
                   
                } else {
                    thresholdItem = [1];
                }
            } else {
                thresholdItem = [1];
            }
        }
        setFieldsValue({ [thresholdKey]: thresholdItem });//设置监测项对应的阈值等级个数

        // render thresholds by keys
        let cols = thresholdItem && thresholdItem.reduce((p, k) => {
            let id = `${idPrefix}${doms.threshold_input.id_mid}${k}`;
            let itemThresholdProps = {};
            if (isEdit) {
                const threshold = getThresholdToEdit(oldItemData, rowKey, k);
                if (threshold) {
                    itemThresholdProps = getFieldDecoratorItems(id, { initialValue: threshold });
                } else {
                    itemThresholdProps = getFieldDecoratorItems(id, { initialValue: "" });
                }
            } else {
                itemThresholdProps = getFieldDecoratorItems(id, { initialValue: "" });
            }
            if (k <= alarmLevel) {
                p.push(<Col key={k} span={colSpan} >
                    <FormItem
                        {...threshFormItemLayout}
                        label={`${LevelHanzi[k]}级阈值`}
                        {...itemThresholdProps}
                    >< Input placeholder='有效的阈值格式' />
                    </FormItem>
                </Col >
                );
            }
            return p;
        }, []);

        cols.push(<Col key={thresholdKey} span={5} >
            <ButtonGroup >
                <Button type='primary'
                    icon={< PlusOutlined />}
                    style={{ display: thresholdItem.length === alarmLevel ? "none" : "inline-block" }}
                    onClick={() => handleThresholdAdd(thresholdKey)} >
                    阈值等级 </Button>
                <Button type='primary'
                    icon={< MinusOutlined />}
                    style={{ display: thresholdItem.length === 1 ? "none" : "inline-block" }}
                    onClick={() => handleThresholdRemove(thresholdKey)} >
                    阈值等级 </Button>
            </ButtonGroup>
        </Col>);

        return cols;
    };
    const renderTimeDivisionRecord = (itemId, oldItemData) => {
        const id = `item_${itemId}${doms.time_division_key.id_suffix}`;
        let thresholdItem = getFieldValue(id);
        if (!thresholdItem) {
            if (isEdit && oldItemData) {
                thresholdItem = oldItemData.map((d, index) => index)
            } else {
                thresholdItem = [0];
            }
        }
        setFieldsValue({ [id]: thresholdItem });//设置监测项对应的阈值等级个数

        // render rows by keys
        const rows = thresholdItem.map((k) => {
            let { hourStartProps, hourEndProps } = getDivisionHourProps(itemId, oldItemData, k, thresholdItem);
            return (<Row key={k} id={`time-division-row-${k}`} >
                <Col span={4} >
                    <FormItem
                        style={{ display: 'inline-block' }}
                        className='time-division-hour'
                        {...hourStartProps.fieldProps}
                    >
                        <Select
                            optionFilterProp='children'
                            style={{ width: 65 }}
                            {...hourStartProps.itemProps}
                        >
                            {renderDivisionHours()}
                        </Select>
                    </FormItem>
                    <span style={{ display: 'inline-block', padding: '6px 2px 0px 2px' }} > 至 </span>
                    <FormItem
                        style={{ display: 'inline-block' }}
                        className='time-division-hour'
                        {...hourEndProps.fieldProps}
                    >
                        <Select
                            optionFilterProp='children'
                            style={{ width: 65 }}
                            {...hourEndProps.itemProps}
                        >
                            {renderDivisionHours()}
                        </Select>
                    </FormItem>
                </Col>
                {renderThresholds(itemId, oldItemData, 5, k)}
                <Col className={'fs-col-pos-mid-right'}
                    style={{ position: 'absolute', right: '0px' }} >
                    <Button
                        type='primary'
                        icon={<CloseOutlined />}
                        style={{ marginLeft: '16px' }}
                        disabled={thresholdItem.length === 1}
                        onClick={() => removeTimeDivision(k, id)}>
                        阈值时段
                    </Button>
                </Col>
            </Row >);
        });
        return { rows, keys: thresholdItem };
    };
    const tryRenderTimeDivisionTip = (rows, keys, itemId) => {
        let showTip = showDivisionHourTip.value;
        let type = null,
            msg = null;
        if (showTip) { // response as soon as division-hour input changed
            type = 'error';
            msg = showDivisionHourTip.msg;
        } else {
            let extra = {
                itemId: itemId,
                keys: keys,
                currentKey: null
            };
            const { hasError, errorMessage } = checkDivisionHours(null, null, extra);
            if (hasError) {
                type = 'error';
                msg = errorMessage;
            }
        }
        if (type === 'error') {
            return (<Col className='fs-config-threshold-alert' >
                <Alert type={type} showIcon message={msg} /> </Col>
            );
        }
    };
    const renderTimeDivisionThresholds = (itemId, oldItemData) => { // oldItemData = [{startTime, endTime, thresholds}]
        let id = `item_${itemId}${doms.time_division_key.id_suffix}`;
        let { rows, keys } = renderTimeDivisionRecord(itemId, oldItemData);
        let eles = [rows, <Row key='btnAddTimeDivision' >
            <Col style={{ float: 'left', marginTop: 3 }} >
                <Button type='primary'
                    icon={<PlusOutlined />}
                    onClick={() => addTimeDivision(id)} >
                    阈值时段
                    </Button>
            </Col>
            {tryRenderTimeDivisionTip(rows, keys, itemId)}
        </Row>
        ];
        return eles;
    };
    const renderItemThresholds = (item) => {
        //渲染监测项的名称+单位
        let thresholdEles = null;
        const { id, name, unit, timeDivision, config } = item;
        if (timeDivision) {
            //时间段阈值
            thresholdEles = renderTimeDivisionThresholds(id, config);
        }
        else {
            thresholdEles = (<Row key={`${id}-render`}> {renderThresholds(id, config, 6)} </Row>);
        }
        return (<div key={`${id}-border`} className={'threshold_row_render'}>
            <Row key={`${id}-name`} >监测项: {`${name} (${unit})`}</Row>
            {thresholdEles}
        </div>);
    };
    const renderFactorItemsThreshold = () => {
        //渲染测项对应的阈值配置
        if (!factor) { return []; }
        let factorItems = factor.items.map(it => Object.assign({}, it, { timeDivision: factor.timeDivision }));
        let items = [];
        if (isEdit) {
            if (modalType == "change") {
                let newModalData = modalData.dataToEdit;
                let config = [];
                if (modalData.dataToEdit.children) {
                    for (let c of modalData.dataToEdit.children) {
                        let configitem = {};
                        configitem.startTime = parseInt(c.startTime);
                        configitem.endTime = parseInt(c.endTime);
                        let thresholds = [];
                        if (c.level1) {
                            thresholds.push({ level: 1, value: c.level1.slice(0, -1) })
                        }
                        if (c.level2) {
                            thresholds.push({ level: 2, value: c.level2.slice(0, -1) })
                        }
                        if (c.level3) {
                            thresholds.push({ level: 3, value: c.level3.slice(0, -1) })
                        }
                        configitem.thresholds = thresholds;
                        config.push(configitem)
                    }
                    let itemMsg = factor.items.find(f => f.id == modalData.dataToEdit.itemId);
                    if (!itemMsg) { return [] }
                    items = [{
                        config,
                        timeDivision: modalData.dataToEdit.children ? true : false,
                        id: itemMsg.id,
                        name: itemMsg.name,
                        unit: itemMsg.unit
                    }];
                    newModalData = { items: items };
                }
                items = getItemsToEdit(newModalData, factorItems);
            } else {
                items = getItemsToEdit(modalData.dataToEdit, factorItems);
            }
        } else {
            items = factorItems;
        }
        let visibleItems = items.filter(f => modalVisibleItems.includes(f.id.toString()));
        let itemEles = visibleItems.reduce((p, item) => {
            p.push(renderItemThresholds(item));
            return p;
        }, []);
        return itemEles;
    }
    const renderDivisionHourErrorTip = (keys, isError) => {
        keys.forEach(key => {
            let ele = document.getElementById(`time-division-row-${key}`);
            if (ele) {
                let eles = ele.getElementsByClassName('time-division-hour');
                if (eles.length > 0) {
                    Object.keys(eles).forEach(key => {
                        let element = eles[key];
                        let classnames = element.className.replace('has-error', '').replace('has-success', '');
                        if (isError) {
                            classnames = classNames(classnames, { 'has-error': true, 'has-success': false });
                        } else {
                            classnames = classNames(classnames, { 'has-error': false, 'has-success': true });
                        }
                        element.className = classnames;
                    });
                }
            }
        });
    };
    const formatTimeDivisionData = (formData, rowKeys, itemId) => {
        let itemData = rowKeys.map(key => {
            let couple = `item_${itemId}_row_${key}_time_division_select_`;
            let thresholdKey = `item_${itemId}_row_${key}_threshold`;
            let thresholdKeyLevel = getFieldValue(thresholdKey);
            let thresholds = thresholdKeyLevel.map(level => {
                let id = `${thresholdKey}_input_${level}`;
                return {
                    'level': level,
                    'value': formData[id]
                };
            })
            let data = {
                'startTime': formData[`${couple}start`],
                'endTime': formData[`${couple}end`],
                'thresholds': thresholds
            };
            return data;

        })
        return itemData;
    };
    const formatMonitorData = (formData, size, itemId) => {
        let thresholdKey = `item_${itemId}_row_0_threshold`;
        let thresholds = [];
        for (let i = 1; i <= size; i++) {
            let id = `${thresholdKey}_input_${i}`;
            thresholds.push({
                'level': i,
                'value': formData[id]
            });
        }
        let itemData = {
            'startTime': null,
            'endTime': null,
            'thresholds': thresholds
        };
        return [itemData];
    };
    const formatItemData = (values, item) => {
        const { id, timeDivision } = item;
        let formDataLen = 0;
        let formData = Object.keys(values).reduce((p1, i) => {
            if (i.includes(`item_${id}`)) {
                p1[i] = values[i];
                formDataLen++
            }
            return p1;
        }, {});
        let itemData = [];
        if (timeDivision) {
            const itemRowKeys = getFieldValue([`item_${id}${doms.time_division_key.id_suffix}`]);

            itemData = formatTimeDivisionData(formData, itemRowKeys, id);
        } else {
            itemData = formatMonitorData(formData, formDataLen, id);
        }
        return itemData;
    }
    const getBatchSensorsThresholdToSave = (values, items) => {
        let factorItems = items.map(item => {
            let data = formatItemData(values, item);
            return { 'id': item.id, 'config': data, 'factorId': factorId, 'structId': structId };
        });
        let obj = { 'items': factorItems };
        if (modalType == "change") {
            //变化速率
            let category = values['agg_category'].map(sid => { return { 'id': sid }; });
            obj["category"] = category
        } else {
            //变量值
            let sensors = values['batch_sensors'].map(sid => { return { 'id': sid }; });
            obj["stations"] = sensors
        }
        return obj;
    };
    const handleThresholdAdd = (itemId) => {
        //增加阈值等级按钮触发事件
        let keys = getFieldValue(itemId);
        let len = keys.length;
        let level = len === 0 ? 1 : keys[len - 1] + 1; // level begin with "1"
        if (level <= alarmLevel) {
            keys = keys.concat(level);
            setFieldsValue({ [itemId]: keys })
            setThresholdItemNum(Object.assign({ ...thresholdItemNum, [itemId]: keys }));
        }
    };
    const handleThresholdRemove = (itemId) => {
        //移除阈值等级按钮触发事件
        let keys = getFieldValue(itemId);
        if (keys.length > 1) { // remain at least threshold-one config item
            keys.pop(); // keys item begin with "1"
            // can use data-binding to set
            setFieldsValue({ [itemId]: keys });
            setThresholdItemNum(Object.assign({ ...thresholdItemNum, [itemId]: keys }));
        }
    };
    const bubbleOkClickEvent = (values, items) => {
        let dataToSave = getBatchSensorsThresholdToSave(values, items);
        resetFields();
        ok(isEdit, dataToSave);
    };
    //to do again
    const handleDivisionHour = (value, type, extra) => {
        const { hasError, errorMessage } = checkDivisionHours(value, type, extra);
        setShowDivisionHourTip({ value: hasError, msg: errorMessage })
    };
    const handleCancel = () => {
        resetFields();
        onCancle();
    }
    const handleOk = () => {
        validateFields().then(values => {
            const items = factor ? factor.items.filter(f => modalVisibleItems.includes(f.id.toString()))
                .map(it => Object.assign({}, it, {
                    timeDivision: factor.timeDivision
                })) : null
            bubbleOkClickEvent(values, items);
        });
    }

    return (
        <Modal
            title={`${isEdit ? '编辑' : '新增'}阈值`}
            visible={true}
            maskClosable={false}
            width={980}
            onOk={handleOk}
            onCancel={handleCancel}
            bodyStyle={{ maxHeight: window.innerHeight - 300, overflowY: 'auto' }}
        >
            <Form
                // ref={ref}
                form={form}
                layout='horizontal'
                style={{ position: 'relative' }}
                id={'comm-threshold-form'}
                name={'comm-threshold-form'} >
                <FormItem
                    name={"items_sensor"}
                    key={"items_sensor"}
                    label="测项"
                    rules={[{ required: true, message: '请选择测项' }]}
                    initialValue={modalVisibleItems} {
                    ...formItemLayout} >
                    <Select placeholder="请选择"
                        mode="multiple"
                        onChange={(checkedValues) => setModalVisibleItems(checkedValues)} >
                        {getItemOptions()}
                    </Select>
                </FormItem>
                {modalType == "change" ?
                    <FormItem
                        key={"agg_category"}
                        name={"agg_category"}
                        label="类型"
                        rules={[{ required: true, message: '请选择测项' }]}
                        initialValue={isEdit ? modalData ? modalData.dataToEdit ? [modalData.dataToEdit.aggCategory] : [] : [] : []}
                        {...formItemLayout} >
                        <Select
                            placeholder="请选择"
                            mode="multiple" >
                            {renderBatchCategory()}
                        </Select>
                    </FormItem>
                    :
                    <FormItem
                        name={"batch_sensors"}
                        key={"batch_sensors"}
                        rules={[{ required: true, message: '请选择测项' }]}
                        initialValue={isEdit && modalData.dataToEdit.stations.map(s => s.id.toString()) || []}
                        label="测点"
                        {...formItemLayout} >
                        <Select
                            placeholder="请选择"
                            mode="multiple" >
                            {renderBatchSensors()}
                        </Select>
                    </FormItem>
                }
                <hr />
                <span className={"tip_span"}>
                    <a onClick={() => {
                        setShowThresholdFormatTip(!showThresholdFormatTip);
                        setTiptitle(showThresholdFormatTip ? '查看-阈值格式' : '收起-阈值格式');
                    }}>
                        {tiptitle}
                    </a>
                </span >
                {showThresholdFormatTip &&
                    <Card>
                        <div>请在英文输入状态下填写阈值， 阈值填写格式： 开区间， 多个区间以“;”分隔， 且区间不能重叠。其中， 正无穷用“ + ”表示， 负无穷用“ - ”表示。 例如：</div>
                        <div>{renderThresholdFormatTip()}</div>
                    </Card>}
                {renderFactorItemsThreshold()}
            </Form>
        </Modal >)
}
export default ThresholdModal;