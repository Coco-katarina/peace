'use strict';
import React, { forwardRef, useState, useEffect } from 'react';
import moment from 'moment';
import { Form } from '@peace/components';
import * as AggConfig from '../../constants/aggConfig';
import * as Constans from '../../constants/report';

const ReportEditor = forwardRef((props, ref) => {
    const { setFieldsValue, getFieldValue } = ref && ref.current || {};
    const { isEdit, reportConfig, initConfig, factors, reportTemplate, dataToEdit = {}, formItemLayout } = props;
    const [aggShow, setAggShow] = useState(initConfig ? initConfig.manual : false);
    const [reportType, setReportType] = useState(initConfig ? initConfig.reportType : 0);
    const [cron, setCron] = useState(initConfig ? initConfig.cron : '0 0 0 * * ?');
    const [currFileType, setCurrFileType] = useState(initConfig ? initConfig.templates.template ? 'Word' : 'Excel' : 'Word');
    const [factorIds, setFactorId] = useState(initConfig ? initConfig.factors.map(f => Number(f)) : []);
    const [crossDay, setCrossDay] = useState(initConfig ? (initConfig.manual ? false : initConfig.aggCfg.rule.time_range.cross_days) : false);

    useEffect(() => {
        //报表类型切换清空模板选项
        if (setFieldsValue && reportType) {
            for (let i of factorIds) {
                if (getFieldValue(`factor_template_${i}`))
                    setFieldsValue({ [`factor_template_${i}`]: undefined });
                if (getFieldValue(`factor_template_formitem_${i}`))
                    setFieldsValue({ [`factor_template_formitem_${i}`]: undefined });
            }
            if (getFieldValue('factor_template_formitem'))
                setFieldsValue({ ['factor_template_formitem']: undefined });
        }
    }, [reportType])

    let factorsFilter = factors.reduce((p, c) => { p = p.concat(c.key); return p }, []);
    let changeType = initConfig ? initConfig.reportType === reportType : false;

    let MonthOptionSrc = [];
    let HourOptionSrc = [];
    let YearOptionSrc = [];

    let label = '每';
    switch (reportType) {
        case 0:
            label += '日';
            break;
        case 1:
            label += '周';
            break;
        case 2:
        case 3:
            label += '月';
            break;
    }

    //设初值
    const cronData = cron.split(" ");
    const initDataArr = [{ id: "natural", value: true },
    { id: "name", value: initConfig ? initConfig.name : '' },
    { id: "reportType", value: initConfig ? initConfig.reportType : 0 },
    { id: "fileType", value: currFileType },
    { id: "manual", value: initConfig ? initConfig.manual : false },
    { id: "lastCollection", value: initConfig ? initConfig.aggCfg ? initConfig.aggCfg.lastCollection ? initConfig.aggCfg.lastCollection : false : false : false },
    { id: "factors", value: initConfig ? initConfig.factors.filter(f => factorsFilter.includes(Number(f))).map(f => Number(f)) : [] },
    { id: "firstDay", value: initConfig ? initConfig.aggCfg ? moment(initConfig.aggCfg.first_day, 'YYYY-MM-DD') : undefined : undefined },
    { id: "enabled", value: initConfig ? initConfig.enabled : false },
    { id: "acrossDay", value: initConfig ? crossDay : false },
    { id: "startMonth", value: initConfig ? changeType ? !initConfig.manual ? initConfig.aggCfg ? initConfig.aggCfg.rule ? initConfig.aggCfg.rule.day_range ? initConfig.aggCfg.rule.day_range.from : 1 : 1 : 1 : 1 : 1 : 1 },
    { id: "endMonth", value: initConfig ? changeType ? !initConfig.manual ? initConfig.aggCfg ? initConfig.aggCfg.rule ? initConfig.aggCfg.rule.day_range ? initConfig.aggCfg.rule.day_range.to : 2 : 2 : 2 : 2 : 2 : 2 },
    { id: "startDay", value: initConfig ? changeType ? !initConfig.manual ? initConfig.aggCfg ? initConfig.aggCfg.rule ? initConfig.aggCfg.rule.day_range ? initConfig.aggCfg.rule.day_range.from : 1 : 1 : 1 : 1 : 1 : 1 },
    { id: "endDay", value: initConfig ? changeType ? !initConfig.manual ? initConfig.aggCfg ? initConfig.aggCfg.rule ? initConfig.aggCfg.rule.day_range ? initConfig.aggCfg.rule.day_range.to : 2 : 2 : 2 : 2 : 2 : 2 },
    { id: "startHour", value: initConfig ? changeType ? initConfig.aggCfg ? initConfig.aggCfg.rule ? initConfig.aggCfg.rule.time_range ? initConfig.aggCfg.rule.time_range.from : 0 : 0 : 0 : 0 : 0 },
    { id: "endHour", value: initConfig ? changeType ? initConfig.aggCfg ? initConfig.aggCfg.rule ? initConfig.aggCfg.rule.time_range ? initConfig.aggCfg.rule.time_range.to : 24 : 24 : 24 : 24 : 24 },
    { id: "cronYear", value: Number.isNaN(Number(cronData[4])) ? 1 : Number(cronData[4]) },
    { id: "cronMon", value: Number.isNaN(Number(cronData[3])) ? 1 : Number(cronData[3]) },
    { id: "cronDay", value: Number.isNaN(Number(cronData[5])) ? 1 : Number(cronData[5]) }];
    AggConfig.initData(dataToEdit, initDataArr, ["cronYear", "cronMon", "cronDay"]);
    if (isEdit && initConfig) {//监测因素类赋值
        const { templates } = initConfig;
        //监测项赋值
        if (templates.factors) {
            let factorItems = [];
            let factorItemsInitialValue = [];
            factors.forEach(f => {
                f.items.forEach(fi => {
                    if (!factorItems.some(fis => fis.id == fi.id)) {
                        factorItems.push(fi)
                    }
                })
            })
            let initTemplatesFactors = initConfig.templates.factors;
            if (initTemplatesFactors) {
                initTemplatesFactors.forEach(itf => {
                    itf.items.forEach(itfiName => {
                        let itemId = factorItems.find(fi => fi.field_name == itfiName).id;
                        if (!factorItemsInitialValue.some(fiivId => fiivId == itemId)) {
                            factorItemsInitialValue.push(itemId);
                        }
                    })
                })
                dataToEdit["factorItems"] = factorItemsInitialValue
            }
        }
        for (let i of factorIds) {
            //模板赋值
            if (templates.template) {//word
                dataToEdit["factor_template_formitem"] = templates.template;
            } else {//excel
                let initialValue = null;
                let algorithmInitialValue = null;
                let initialParams = {};
                for (let chosen of initConfig.templates.factors) {
                    if (chosen.factor == i) {
                        initialValue = chosen.template;
                        algorithmInitialValue = chosen.agg;
                        initialParams = chosen.params || {};
                        break;
                    }
                }
                dataToEdit[`factor_template_${i}`] = initialValue

                const template = factorTemplate && factorTemplate.find(t => t.id == initialValue);
                let templateParams = [];
                if (template) {
                    templateParams = template.params;
                }
                templateParams && templateParams.forEach(tp => {
                    if (tp.type && tp.type == 'factor') {
                        dataToEdit[`factor_template_${i}_params_${tp.name}`] = initialParams[tp.name]
                    } else if (!templateGenericParamKeys.has(tp.name)) {
                        dataToEdit[`factor_template_generic_params_${tp.name}`] = initialParams[tp.name]
                    }
                })
            }

            //监测因素聚集方式赋值
            let aggFactor = initConfig.templates.factors.find(s => s.factor == parseInt(i));
            if (aggFactor)
                dataToEdit[`algorithm_${i}`] = AggConfig.AlgorithmToMath[aggFactor.agg]
        }
    }

    for (let i = 1; i <= 28; i++) {
        MonthOptionSrc.push({ id: Number(i), name: `${i}号` })
    }
    for (let i = 0; i < 25; i++) {
        HourOptionSrc.push({ id: Number(i), name: `${i}时` })
    }
    for (let i = 1; i < 13; i++) {
        YearOptionSrc.push({ id: Number(i), name: `${i}月` })
    }

    const handleReportTypeChange = (value) => {
        let cronValue = '0 0 0 * * ?';
        switch (value) {
            case Constans.ReportTypeToNum['日报表']:
                cronValue = '0 0 0 * * ?';
                break;
            case Constans.ReportTypeToNum['周报表']:
                cronValue = '0 0 0 ? * 1';
                break;
            case Constans.ReportTypeToNum['月报表']:
                cronValue = '0 0 0 1 * ?';
                break;
            case Constans.ReportTypeToNum['年报表']:
                cronValue = '0 0 0 1 1 ? *';
                break;
            default: break;
        }
        setReportType(value);
        setCron(cronValue);
    };
    const handleFactorsChange = (targetKeys, direction, moveKeys) => {
        let newFactorIds = [];
        if (direction == 'right') {
            newFactorIds = factorIds.concat(moveKeys);
        } else if (direction == 'left') {
            newFactorIds = factorIds.filter(key => !moveKeys.includes(key));
        }
        setFactorId(newFactorIds)
    }
    const handleCrossDayChange = (checked) => setCrossDay(checked);
    const timeExists = (value, type, getFieldValue) => {
        let endDay = getFieldValue(`end${type}`);
        let acrossDay = getFieldValue(`acrossDay`);
        if (acrossDay && type == 'Hour') {
            if (value >= endDay) {
                return Promise.resolve();
            } else {
                return Promise.reject('时间范围需小于24小时');
            }
        } else {
            if (value < endDay) {
                return Promise.resolve();
            } else {
                return Promise.reject('开始时间需小于结束时间');
            }
        }
    }
    const renderAggItemChild = () => {
        let aggConfigItemChildren = [{
            type: 'Span',
            id: 'aggConfigLable',
            value: label,
            containerProps: { style: { display: 'inline-block', width: `calc(8%)`, textAlign: 'center' } },
        }];

        if (reportType == Constans.ReportTypeToNum['月报表'] || reportType == Constans.ReportTypeToNum['年报表']) {
            aggConfigItemChildren = aggConfigItemChildren.concat([{
                type: 'Select',
                id: 'startMonth',
                rules: [({ getFieldValue }) => ({
                    validator(_, value) { return timeExists(value, 'Month', getFieldValue) }
                })],
                containerProps: { dependencies: ['endMonth'], style: { display: 'inline-block', width: 'calc(18%)' } },
                optionsSrc: MonthOptionSrc,
                itemProps: { allowClear: false }
            }, {
                type: 'Span',
                id: 'aggMonLabel',
                value: '至',
                containerProps: { style: { display: 'inline-block', width: `calc(5%)`, textAlign: 'center' } },
            }, {
                type: 'Select',
                id: 'endMonth',
                optionsSrc: MonthOptionSrc,
                containerProps: { style: { display: 'inline-block', width: `calc(18%)`, marginRight: 10 } },
                itemProps: { allowClear: false }
            }]);
        }
        if (reportType == Constans.ReportTypeToNum['周报表']) {
            aggConfigItemChildren = aggConfigItemChildren.concat([{
                type: 'Select',
                id: 'startDay',
                rules: [({ getFieldValue }) => ({
                    validator(_, value) { return timeExists(value, 'Day', getFieldValue) }
                })],
                containerProps: { dependencies: ['endDay'], style: { display: 'inline-block', width: 'calc(16%)' } },
                optionsSrc: Object.keys(AggConfig.AggtimeDayOfWeek).map(i => { return { id: Number(i), name: AggConfig.AggtimeDayOfWeek[i] } }),
                itemProps: { allowClear: false }
            }, {
                type: 'Span',
                id: 'aggDayLable',
                value: '至',
                containerProps: { style: { display: 'inline-block', width: `calc(5%)`, textAlign: 'center' } },
            }, {
                type: 'Select',
                id: 'endDay',
                optionsSrc: Object.keys(AggConfig.AggtimeDayOfWeek).map(i => { return { id: Number(i), name: AggConfig.AggtimeDayOfWeek[i] } }),
                containerProps: { style: { display: 'inline-block', width: `calc(16%)`, marginRight: 10 } },
                itemProps: { allowClear: false }
            }]);
        }
        //聚集小时范围
        aggConfigItemChildren = aggConfigItemChildren.concat([{
            type: 'Select',
            id: 'startHour',
            rules: [({ getFieldValue }) => ({
                validator(_, value) { return timeExists(value, 'Hour', getFieldValue) }
            })],
            containerProps: { dependencies: ['endHour'], style: { display: 'inline-block', width: 'calc(16%)' } },
            optionsSrc: HourOptionSrc,
            itemProps: { allowClear: false }
        }, {
            type: 'Span',
            id: 'aggConLableH',
            value: `至${crossDay ? '第二天' : ''}`,
            containerProps: { style: { display: 'inline-block', width: `calc(${crossDay ? 14 : 6}%)`, textAlign: 'center' } },
        }, {
            type: 'Select',
            id: 'endHour',
            optionsSrc: HourOptionSrc,
            containerProps: { style: { display: 'inline-block', width: `calc(16%)` } },
            itemProps: { allowClear: false }
        }]);
        return aggConfigItemChildren;
    }
    const renderCronItemChild = () => {
        //生成时间配置
        const cronItemChildren = [{
            type: 'Span',
            id: 'cronLable',
            value: label,
            containerProps: { style: { display: 'inline-block', width: `calc(8%)`, textAlign: 'center' } },
        }];
        switch (reportType) {
            case Constans.ReportTypeToNum['年报表']:
                cronItemChildren.push({
                    type: 'Select',
                    id: 'cronYear',
                    containerProps: { style: { display: 'inline-block', width: `calc(18%)`, marginRight: 10 } },
                    optionsSrc: YearOptionSrc
                });
            case Constans.ReportTypeToNum['月报表']:
                cronItemChildren.push({
                    type: 'Select',
                    id: 'cronMon',
                    containerProps: { style: { display: 'inline-block', width: `calc(18%)`, marginRight: 10 } },
                    optionsSrc: MonthOptionSrc
                }); break;
            case Constans.ReportTypeToNum['周报表']:
                cronItemChildren.push({
                    type: 'Select',
                    id: 'cronDay',
                    containerProps: { style: { display: 'inline-block', width: `calc(18%)`, marginRight: 10 } },
                    optionsSrc: Object.keys(AggConfig.AggtimeDayOfWeek).map(i => { return { id: Number(i), name: AggConfig.AggtimeDayOfWeek[i] } }),
                }); break;
            default: break;
        }
        cronItemChildren.push({
            type: 'Span',
            id: 'cronHour',
            value: '0时',
            containerProps: { style: { display: 'inline-block', width: `calc(6%)`, textAlign: 'center' } }
        });
        return cronItemChildren;
    }
    const renderFactorItems = (formItems) => {
        let factorItemsSource = [];
        if (factorIds.length) {
            factorIds.forEach(fid => {
                let items = factors.find(f => f.key == fid).items;
                if (items.length) {
                    factorItemsSource = factorItemsSource.concat(items.map(i => {
                        return {
                            key: i.id,
                            title: i.name + ' ' + i.unit
                        }
                    }))
                }
            })
        }

        formItems.push({
            type: 'Transfer',
            id: 'factorItems',
            label: '需要的监测项',
            rules: [{ required: true, message: '请选择需要的监测项' }],
            containerProps: { valuePropName: 'targetKeys' },
            itemProps: { dataSource: factorItemsSource, titles: ['可选', '已选'], render: item => item.title }
        })
    }
    const renderFactorTemolate = (formItems) => {
        let templateFilterReportType = reportTemplate.filter(f => f.reportType === reportType);//监测因素模板根据类型筛选
        for (let i of factorIds) {
            let factorChosen = factors.filter(f => f.key === parseInt(i))[0];
            if (factorChosen) {
                if (currFileType == 'Word') {
                    formItems.push({
                        type: 'Select',
                        id: `factor_template_formitem`,
                        label: '监测因素模板',
                        rules: [{ required: true, message: '请选择监测因素模板！' }],
                        optionsSrc: templateFilterReportType.map(f => { return { id: Number(f.id), name: f.name } })
                    })
                } else if (currFileType == 'Excel') {
                    let factorTemplate = templateFilterReportType.length > 0 ? templateFilterReportType.filter(f => f.factorProto === (factorChosen ? factorChosen.proto : null) || !f.factorProto) : [];//监测因素模板根据proto值筛选
                    let fieldId = `factor_template_formitem_${i}`
                    formItems.push({
                        type: 'Select',
                        id: fieldId,
                        label: factorChosen.name + "监测因素模板",
                        rules: [{ required: true, message: `请选择${factorChosen.name}监测因素模板！` }],
                        optionsSrc: factorTemplate.map(f => { return { id: Number(f.id), name: f.name } })
                    })
                    //监测因素模板参数
                    // current selected template id
                    const templateId = getFieldValue(fieldId);
                    // template params
                    const template = factorTemplate.find(t => t.id == templateId);
                    let templateParams = [];
                    if (template) {
                        templateParams = template.params;
                    }
                    templateParams && templateParams.forEach(tp => {
                        if (tp.type && tp.type == 'factor') {
                            formItems.push({
                                type: 'Input',
                                id: `factor_template_${i}_params_${tp.name}`,
                                label: `${tp.alias}(${factorChosen.name})`,
                            })
                        } else if (!templateGenericParamKeys.has(tp.name)) {
                            templateGenericParamKeys.add(tp.name);
                            formItems.push({
                                type: 'Input',
                                id: `factor_template_formitem_generic_params_${tp.name}`,
                                label: `${tp.alias}`,
                            })
                        }
                    })
                }
            }
            //人工监测未选中，聚集方式
            if (!aggShow) {
                formItems.push({
                    type: 'Select',
                    id: `algorithm_${i}`,
                    label: `${factorChosen.name}聚集方式`,
                    rules: [{ required: true, message: `${factorChosen.name}请选择聚集方式` }],
                    optionsSrc: Object.keys(AggConfig.AlgorithmToName).map(f => { return { id: Number(f), name: AggConfig.AlgorithmToName[f] } })
                })
            }
        }
    }
    const formItems = [{
        type: 'Input',
        id: 'name',
        label: '名称',
        rules: [{ max: 30, message: '长度不得超过30!', },
        { required: true, whitespace: true, message: '请输入报表名称' },
        () => ({
            validator(_, value) {
                if (reportConfig.filter(f => f.name == value).length) {
                    if (!initConfig || (initConfig && reportConfig.filter(f => f.name == value)[0].id != initConfig.id)) {
                        return Promise.reject('名称重复');
                    } else {
                        return Promise.resolve();
                    }
                }
                return Promise.resolve();
            }
        })],
        itemProps: { placeholder: "建议格式：结构物名+说明+报表类型，如：xx大桥日报表" }
    }, {
        type: 'Select',
        id: 'reportType',
        label: '报表类型',
        rules: [{ required: true, message: '请选择报表类型' }],
        optionsSrc: Object.keys(Constans.ReportTypeToName).map(item => {
            return {
                id: Number(item),
                name: Constans.ReportTypeToName[item]
            }
        }),
        itemProps: { onChange: handleReportTypeChange }
    }, {
        type: 'Select',
        id: 'fileType',
        label: '文件类型',
        rules: [{ required: true, message: '请选择文件类型' }],
        itemProps: { onChange: (value) => setCurrFileType(value) },
        optionsSrc: [{ id: "Word", name: "Word" }, { id: "Excel", name: "Excel" }]
    }, {
        type: 'Switch',
        id: 'manual',
        label: '人工监测',
        containerProps: { valuePropName: 'checked' },
        itemProps: { checkedChildren: '是', unCheckedChildren: '否', onChange: (checked) => setAggShow(checked) }
    }];
    //聚集时间范围配置
    if (aggShow) {
        formItems.push({
            type: 'Switch',
            id: 'lastCollection',
            label: '使用上次采集数据',
            containerProps: { valuePropName: 'checked' },
            itemProps: { checkedChildren: '是', unCheckedChildren: '否' }
        })
    } else {
        formItems.push({
            type: 'Switch',
            id: 'acrossDay',
            label: '聚集时间范围跨天',
            containerProps: { valuePropName: 'checked' },
            itemProps: { checkedChildren: '是', unCheckedChildren: '否', onChange: handleCrossDayChange }
        })
        const aggConfigItemChildren = renderAggItemChild()
        formItems.push({
            type: 'Custom',
            id: 'aggConfig',
            label: '聚集时间范围配置',
            // containerProps: { style: { height: 32 } },
            itemChildren: aggConfigItemChildren
        });
    }
    const cronItemChildren = renderCronItemChild();//生成时间
    formItems.push({
        type: 'Custom',
        id: 'cron',
        label: '生成时间',
        // containerProps: { style: { height: 32 } },
        itemChildren: cronItemChildren
    })
    formItems.push({
        type: 'Transfer',
        id: 'factors',
        label: '包含的监测因素',
        rules: [{ required: true, message: '请选择包含的监测因素' }],
        containerProps: { valuePropName: 'targetKeys' },
        itemProps: { dataSource: factors, titles: ['可选', '已选'], render: item => item.name, onChange: handleFactorsChange }
    })
    renderFactorItems(formItems);
    renderFactorTemolate(formItems);//监测因素模板
    formItems.push({
        type: 'DatePicker',
        id: 'firstDay',
        label: '报表初始时间',
        rules: [{ required: true, message: '请选择报表初始时间' }],
    });
    formItems.push({
        type: 'Switch',
        id: 'enabled',
        label: '状态',
        rules: [{ required: true, message: '请选择报表初始时间' }],
        containerProps: { valuePropName: 'checked' },
        itemProps: { checkedChildren: '启用', unCheckedChildren: '禁用' }
    });

    return (
        <Form
            ref={ref}
            formItems={formItems}
            popupContainerId='report-set-form'
            isEdit={isEdit}
            dataToEdit={dataToEdit}
            formItemLayout={formItemLayout}
        />
    )
})

export default ReportEditor;