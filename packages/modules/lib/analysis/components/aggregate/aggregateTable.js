'use strict';
import React, { useState, useRef } from 'react';
import moment from 'moment';
import { Spin, Row, Col, Space, Select, Button } from 'antd';
import { Func, PinyinHelper } from '@peace/utils';
import { AuthorizationCode } from '$utils';
import { Table, Modal, Search } from '@peace/components';
import AggregateEditor from './aggregateEditor';
import { Category, AlgorithmToName, AggtimeDayOfWeek } from '../../constants/aggConfig';
import Style from '../style.css'

const AggregateTable = (props) => {
    const { aggConfigList, factors, isRequesting, structId, structures, onDelete, onExecAgg, onStructChange } = props;
    const [dataToEdit, setDataToEdit] = useState({});//编辑弹框带数据
    /**立即执行弹框 */
    const [execAggId, setExecAggId] = useState(false);
    const [generateEnd, setGenerateEnd] = useState(moment());
    const [generateBegin, setGenerateBegin] = useState(moment().add(-1, 'month'));
    const [searchValue, setSearchValue] = useState('');

    const _addModalRef = useRef(null);
    const _editModalRef = useRef(null);
    const _aggEditorRef = useRef(null);

    const onTableChange = (value) => {
        /**
         * todo
         * 分页查询，待API调整后优化，<Table/>也需调整
         */
        // props.onTableChangeHander(limit, offset, current)
    }
    const onEditClick = (record) => {
        setDataToEdit(record)
    }
    const onDelClick = (values) => {
        const { id } = values;
        onDelete(id);
    }
    const onExec = (record) => {
        handleExec(record.id)
    }
    const handleOk = (isEdit = false) => {
        const opts = {
            form: _aggEditorRef.current,
            isEdit: isEdit,
            idToEdit: dataToEdit.id,
            onSave: props.onSave,
            extraDeal: (values) => {
                const aggList = aggConfigList.map(f => { return f.factorId + ',' + f.category });
                let newAggList = aggList;
                if (isEdit) {
                    newAggList = aggList.filter(f => { return f != (values.factorId + ',' + values.category) });
                }
                if (newAggList.includes(values.factorId + ',' + values.category)) {
                    throw `该监测因素已存在相同聚集周期配置，无法保存当前操作`
                } else {
                    values["structId"] = structId;
                    values["enable"] = values.enable == true ? true : false;
                    values["delete"] = false;
                    values["startTime"] = (values.natural != true && values.endHour && values.endHour > 3) ? values.endHour : 3;
                    values["startHour"] = values.startHour;
                    values["endHour"] = values.endHour;
                    values["natural"] = values.natural;
                    values["startDay"] = values.startDay ? values.startDay : values.startMonDay ? values.startMonDay : null;
                    values["endDay"] = values.endDay ? values.endDay : values.endMonDay ? values.endMonDay : null;
                    values["natural"] = values.natural == true ? true : false
                }
            }
        };
        let modalRef = isEdit ? _editModalRef : _addModalRef

        const prom = modalRef.current.funcOk(opts);

        return prom
    }

    //控制立即执行弹框
    const handleExec = (aggId) => { setExecAggId(aggId || 'all') }
    const hanldeExecAggOk = (e) => {//立即执行执行确定
        let params = {
            begin: generateBegin.format('YYYY-MM-DD'),
            end: generateEnd.format('YYYY-MM-DD')
        };
        if (execAggId == 'all') {
            params.struct = structId;
        } else {
            params.aggId = execAggId;
        }
        onExecAgg(params);
        setExecAggId(false);
    }
    const handleStructChange = (value) => {
        onStructChange(value)
    }
    const handleSearch = (values) => {
        setSearchValue(values && values.keywords);
        // props.onSearchHander(values)
    }
    const filter = (item) => {
        let v = searchValue && searchValue.toLowerCase();
        if (v != '') {
            const { factorId, category, enable, algorithm, startTime, startHour, endHour, startDay, endDay } = item;
            let factorName = factors ? factors.filter(f => f.id == factorId).map(f => f.name).reduce((p, c) => { p = p.concat(c); return p }) : '';
            let detailString = category == 2001 ? `每天${startTime}时，计算${startHour}-${endHour}时的数据${AlgorithmToName[algorithm]}` :
                category == 2002 ? `每周周日${startTime}时，计算${AggtimeDayOfWeek[startDay]}至${AggtimeDayOfWeek[endDay]}${startHour}-${endHour}时的数据${AlgorithmToName[algorithm]}`
                    : category == 2003 ? `每月1号${startTime}时，计算${startDay}号至${endDay}号${startHour}-${endHour}时的数据${AlgorithmToName[algorithm]}`
                        : '';
            let c = Category[category];
            let ed = enable ? '启用' : '禁用';
            if (factorName.includes(v) || PinyinHelper.isPinyinMatched(factorName, v) ||
                c.includes(v) || PinyinHelper.isPinyinMatched(c, v) ||
                ed.includes(v) || PinyinHelper.isPinyinMatched(ed, v) ||
                detailString.includes(v) || PinyinHelper.isPinyinMatched(detailString, v)) {
                return true;
            }
            return false;
        } else {
            return true;
        }
    };
    const getDataSource = () => {
        let dataSource = aggConfigList ? aggConfigList.length ? aggConfigList.filter(filter).map(item => item) : [] : [];
        return dataSource;
    }
    const renderTable = () => {
        const tableColumnAttrs = [
            { key: 'factorId', name: '监测因素', render: (text) => (factors ? factors.length > 0 ? factors.filter(s => s.id == text).map(s => s.name) : '' : '') },
            { key: 'category', name: '类型', width: '15%', render: (text) => { return Category[text] } },
            { key: 'enable', name: '状态', render: (text) => (text ? '启用' : '禁用') },
            {
                key: 'detail', name: '详细信息', render: (text, record) => (
                    record.category == 2001 ? `每天${record.startTime}时，计算${record.startHour}-${(record.natural == null || record.natural == true) ? '' : '次日'}${record.endHour}时的数据${AlgorithmToName[record.algorithm]}`
                        : record.category == 2002 ? `每周周日${record.startTime}时，计算${AggtimeDayOfWeek[record.startDay]}至${AggtimeDayOfWeek[record.endDay]}的数据${AlgorithmToName[record.algorithm]}`
                            : record.category == 2003 ? `每月1号${record.startTime}时，计算${record.startDay}号至${record.endDay}号的数据${AlgorithmToName[record.algorithm]}`
                                : record.category == 2005 ? `每小时15分，计算前60分钟的数据${AlgorithmToName[record.algorithm]}`
                                    : ''
                )
            }
        ];
        const actions = [];
        //编辑按钮
        if (Func.judgeRights(AuthorizationCode.ModifyAggregate)) {
            actions.push({
                key: 'edit',
                dom: <Modal
                    ref={_editModalRef}
                    isEdit
                    title='编辑'
                    content={(
                        <AggregateEditor
                            ref={_aggEditorRef}
                            factors={factors}
                            dataToEdit={dataToEdit}
                            isEdit={true}
                        />
                    )}
                    button={<a style={{ color: 'rgba(66,122,242,1)' }}>修改</a>}
                    ok={() => handleOk(true)}
                />,
                handler: onEditClick
            })
        }//删除
        if (Func.judgeRights(AuthorizationCode.DeleteAggregate)) {
            actions.push({
                key: 'del',
                name: '删除',
                popconfirm: true,
                handler: onDelClick,
            })
        }
        //立即执行
        if (Func.judgeRights(AuthorizationCode.AddAggregate) || Func.judgeRights(AuthorizationCode.ModifyAggregate)) {
            {
                actions.push({
                    key: 'exec',
                    name: '立即执行',
                    handler: onExec,
                })
            }

        }
        const dataSource = getDataSource();
        return (
            <Table
                data={dataSource}
                attrs={tableColumnAttrs}
                actions={actions}
                isRequesting={isRequesting}
                onTableChange={onTableChange}
                total={aggConfigList.length}
                curpage={0}
            />
        );
    }
    const renderExec = () => {
        return execAggId ? <Modal
            title="聚集计算立即执行"
            maskClosable={false}
            visible={true}
            button={false}
            content={<Select
                className={Style["aggreaget-modal-select"]}
                defaultValue={1}
                onChange={(value) => {
                    setGenerateEnd(moment());
                    if (value == 1) {
                        setGenerateBegin(moment().add(-1, 'month'));
                    } else if (value == 2) {
                        setGenerateBegin(moment().add(-6, 'month'));
                    } else if (value == 3) {
                        setGenerateBegin(moment().add(-12, 'month'));
                    } else {
                        setGenerateBegin(moment().add(-5, 'year'));
                    }
                }}>
                <Select.Option value={1}>最近一个月</Select.Option>
                <Select.Option value={2}>最近半年</Select.Option>
                <Select.Option value={3}>最近一年</Select.Option>
                <Select.Option value={4}>全部</Select.Option>
            </Select>}
            ok={hanldeExecAggOk}
            cancel={() => setExecAggId(false)}
        >
        </Modal> : ''
    }
    const searchFormLists = [
        {
            field: 'keywords',
            type: 'INPUT',
            rules: [{ whitespace: true }],
            itemProps: { maxLength: 255 },
            noLabel: true,
            placeholder: '请输入关键词'
        },
    ]
    return (
        <div className={Style["aggreaget"]}>
            <Spin spinning={isRequesting}>
                <Row className={Style["aggreaget-row"]}>
                    <Col>
                        <Space>
                            <Select
                                showSearch
                                placeholder="请选择结构物"
                                optionFilterProp="children"
                                className={Style["aggreaget-select"]}
                                value={structId}
                                onChange={handleStructChange}
                                filterOption={(input, option) => {
                                    let v = input.toLowerCase();
                                    let src = option.children.toLowerCase();
                                    return src.includes(v) || PinyinHelper.isPinyinMatched(src, v);
                                }}>
                                {
                                    structures ? structures.map(s => <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>) : []
                                }
                            </Select>
                            {
                                Func.judgeRights(AuthorizationCode.AddAggregate) ?
                                    <Modal
                                        ref={_addModalRef}
                                        title='新增'
                                        content={(
                                            <AggregateEditor
                                                ref={_aggEditorRef}
                                                factors={factors}
                                                isEdit={false}
                                            />)}
                                        button={<Button type="primary" >新建</Button>}
                                        ok={() => { handleOk(false) }}
                                    />
                                    :
                                    <Button type="primary" disabled>新建</Button>
                            }
                            {
                                Func.judgeRights(AuthorizationCode.AddAggregate) || Func.judgeRights(AuthorizationCode.ModifyAggregate) ?
                                    <Button onClick={() => handleExec()}>立即执行</Button> :
                                    <Button disabled>立即执行</Button>
                            }
                        </Space>
                    </Col>
                    <Col style={{ position: 'absolute', right: 0 }}>
                        <Search
                            key="aggregate"
                            showNumber={1}
                            formList={searchFormLists}
                            onSearch={handleSearch}
                        />
                    </Col>
                </Row>
                {renderExec()}
                {renderTable()}
            </Spin>
        </div>
    )
}

export default AggregateTable;