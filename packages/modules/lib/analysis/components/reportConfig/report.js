'use strict';
import React, { useState, useRef } from 'react';
import { Radio, Row, Col, Space, Select, Button, Card, Badge, Popconfirm, Divider } from 'antd';
import { FrownOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Func, PinyinHelper } from '@peace/utils';
import { AuthorizationCode } from '$utils'
import { Modal } from '@peace/components';
import ReportGenerateEditor from './reportGenerateEditor';
import ReportEditor from './reportEditor';
import { AggtimeDayOfWeek, Algorithm } from '../../constants/aggConfig';
import { ReportTypeToName, ReportTypeToNum } from '../../constants/report';
import Style from '../style.css'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const ReportConfigCard = (props) => {
    const { reportConfig, factors, reportTemplate, structures, structId, filterType,
        onSave, onDelete, onGenerateOkClick, onStructClick, onTypeFilter } = props;
    const _generationModalRef = useRef(null);
    const _generateEditorRef = useRef(null);
    const _addModalRef = useRef(null);
    const _editModalRef = useRef(null);
    const _repEditorRef = useRef(null);

    const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 6 } },
        wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
    };
    const manCron = (type, cron) => {
        const arr = cron.split(' ');
        const day = arr[3], month = arr[4], dayOfWeek = arr[5];
        let label = '每';
        switch (type) {
            case 0:
                label += '日0时';
                break;
            case 1:
                label += AggtimeDayOfWeek[dayOfWeek] + '0时';
                break;
            case 2:
                label += '月' + (day == 'L' ? '最后一天' : day + '日') + '0时';
                break;
            case 3:
                label += '年' + month + '月' + (day == 'L' ? '最后一天' : day + '日') + '0时';
                break;
        }
        return label;
    }
    const handleGeneration = (item) => {//立即生成
        const opts = {
            form: _generateEditorRef.current,
            isEdit: false,
            onSave: onGenerateOkClick,
            idToEdit: null,
            extraDeal: (values) => {
                values.dateTime = values.dateTime.format('YYYY-MM-DD');
                Object.keys(item).map(i => values[i] = item[i])
                if (values.templates.template) {
                    values.docType = 'word';
                } else {
                    values.docType = 'excel';
                }
            }
        };
        let modalRef = _generationModalRef

        const prom = modalRef.current.funcOk(opts);

        return prom
    }
    const handleOk = (isEdit = false, id) => {
        const opts = {
            form: _repEditorRef.current,
            isEdit: isEdit,
            onSave: onSave,
            idToEdit: id,
            extraDeal: (values) => {
                let templates = {};
                let nextFactors = [];
                let index = 1;
                values.factors.forEach(fid => {
                    let thisFactor = factors.find(f => f.key == fid);
                    let thisItems = thisFactor.items;

                    let nextItems = [];
                    thisItems.forEach(i => {
                        if (values.factorItems.some(vfid => vfid == i.id)) {
                            nextItems.push(i.field_name);
                        }
                    });
                    if (nextItems.length) {
                        let nextFactor = {
                            "agg": Algorithm[values[`algorithm_${fid}`]] || '',
                            "factor": fid,
                            "items": nextItems,
                            "index": index++
                        };
                        if (values.fileType == 'Excel') {
                            nextFactor.template = values[`factor_template_${fid}`];
                            nextFactor.params = {};

                            const tp = reportTemplate.find(t => t.id == nextFactor.template);
                            if (tp && tp.params) {
                                tp.params.forEach(p => {
                                    if (values[`factor_template_generic_params_${p.name}`]) {
                                        nextFactor.params[p.name] = values[`factor_template_generic_params_${p.name}`];
                                    } else if (values[`factor_template_${fid}_params_${p.name}`]) {
                                        nextFactor.params[p.name] = values[`factor_template_${fid}_params_${p.name}`];
                                    }
                                })
                            }
                        }
                        nextFactors.push(nextFactor);
                    }
                });
                if (values.fileType == 'Word') {
                    templates = {
                        "template": values.factor_template_formitem,
                    }
                }
                templates.factors = nextFactors;

                let firstDay = values.firstDay.format();
                values.templates = templates;
                values.firstDay = firstDay;

                //生成日期整合
                let cron = '0 0 0 * * ?';
                switch (values.reportType) {
                    case ReportTypeToNum['周报表']:
                        cron = `0 0 0 ? * ${values.cronDay}`
                        delete values["cronDay"];
                        break;
                    case ReportTypeToNum['月报表']:
                        cron = `0 0 0 ${values.cronMon} * ?`;
                        delete values["cronMon"];
                        break;
                    case ReportTypeToNum['年报表']:
                        cron = `0 0 0 ${values.cronMon} ${values.cronYear} ? *`;
                        delete values["cronMon"];
                        delete values["cronYear"];
                        break;
                }
                values.cron = cron;
                // return values;
            }
        };
        let modalRef = isEdit ? _editModalRef : _addModalRef
        const prom = modalRef.current.funcOk(opts);
        return prom;
    }
    const renderCard = (item) => {
        const { id, name, reportType, cron, enabled } = item;
        return <Card bodyStyle={{ padding: 0 }} >
            <div style={{ padding: 16 }}>
                <h3 style={{ marginBottom: 24, minHeight: 44 }}>{name}</h3>
                <p style={{ marginBottom: 8 }}>{ReportTypeToName[reportType]}</p>
                <p style={{ marginBottom: 8 }}>{manCron(reportType, cron)}</p>
            </div>
            <div style={{ padding: 16, background: '#FBFBFB' }}>
                <div style={{ float: 'left' }} key="card-body-left">
                    {enabled ? <span><Badge status="success" />启用</span> : <span><Badge status="error" />禁用</span>}
                </div>
                <div style={{ float: 'right' }} key="card-body-right">
                    {
                        Func.judgeRights(AuthorizationCode.ModifyReportGeneration) ?
                            [<Modal
                                ref={_editModalRef}
                                title='编辑生成规则'
                                width={800}
                                inlineBlock={true}
                                content={(
                                    <ReportEditor
                                        ref={_repEditorRef}
                                        isEdit={true}
                                        dataToEdit={item}
                                        factors={factors}
                                        reportConfig={reportConfig}
                                        reportTemplate={reportTemplate}
                                        initConfig={reportConfig.filter(c => c.id == item.id)[0]}
                                        formItemLayout={formItemLayout}
                                    />)}
                                button={<a style={{ fontSize: 16 }} key="card-body-edit"><EditOutlined /></a>}
                                ok={() => handleOk(true, item.id)}
                            />
                                ,
                            <Divider key={`divider-edit`} type='vertical' />
                            ] : ''
                    }
                    {
                        Func.judgeRights(AuthorizationCode.DeleteReportGeneration) ?
                            [
                                <Popconfirm title="确认删除该生成配置?"
                                    onConfirm={(e) => onDelete(id)}
                                    key="del-confirm"
                                >
                                    <a style={{ fontSize: 16 }} key="card-body-del"><DeleteOutlined /></a>
                                </Popconfirm>,
                                <Divider key={`divider-del`} type='vertical' />
                            ] : ''
                    }
                    {
                        Func.judgeRights(AuthorizationCode.ReportGeneration) ?
                            <Modal
                                ref={_generationModalRef}
                                title='立即生成'
                                inlineBlock={true}
                                content={(
                                    <ReportGenerateEditor
                                        ref={_generateEditorRef}
                                        isEdit={false}
                                    />)}
                                button={<a key="card-body-gener">立即生成</a>}
                                ok={() => handleGeneration(item)}
                            />
                            : ''
                    }
                </div>
                <div style={{ clear: 'both' }} key="card-body-both"></div>
            </div>
        </Card>
    }

    return (<div>
        <Row style={{ marginBottom: 16 }}>
            <Col>
                <Space>
                    <Select
                        value={structId}
                        onChange={onStructClick}
                        placeholder="请选择结构物"
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) => {
                            let v = input.toLowerCase();
                            let src = option.children.toLowerCase();
                            return src.includes(v) || PinyinHelper.isPinyinMatched(src, v);
                        }}
                        style={{ width: 200 }} >
                        {
                            structures ? structures.map(s => <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>) : []
                        }
                    </Select>
                    <Modal
                        ref={_addModalRef}
                        title='新增生成规则'
                        width={800}
                        inlineBlock={true}
                        content={(
                            <ReportEditor
                                ref={_repEditorRef}
                                isEdit={false}
                                factors={factors}
                                reportConfig={reportConfig}
                                reportTemplate={reportTemplate}
                                formItemLayout={formItemLayout}
                            />)}
                        button={<Button type="primary" >新增生成规则</Button>}
                        ok={() => handleOk(false)}
                    />
                </Space>
            </Col>
            <Col style={{ position: 'absolute', right: 0 }}>
                <RadioGroup value={filterType} size="middle" style={{ float: 'right' }} onChange={onTypeFilter}>
                    <RadioButton value="all">全部</RadioButton>
                    <RadioButton value={0}>日</RadioButton>
                    <RadioButton value={1}>周</RadioButton>
                    <RadioButton value={2}>月</RadioButton>
                    <RadioButton value={3}>年</RadioButton>
                </RadioGroup>
            </Col>
        </Row>
        <div style={{ clear: 'both' }}></div>
        {reportConfig && reportConfig.length ?
            <Row gutter={8} className={"report_row"}>
                {reportConfig.map((item, i) => {
                    return <Col style={i % 4 == 0 ? { marginBottom: 8, clear: 'left' } : { marginBottom: 8 }} key={item.id} md={6} sm={12}>
                        {renderCard(item)}
                    </Col>
                })}
            </Row >
            : <div className={Style["report_nodata"]}>
                <span><FrownOutlined /> 暂无数据</span>
            </div>}
    </div>
    )

}
export default ReportConfigCard