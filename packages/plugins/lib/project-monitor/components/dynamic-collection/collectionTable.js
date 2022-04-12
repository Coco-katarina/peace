'use strict';
import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Row, Button } from 'antd';
import { Func, PinyinHelper } from '@peace/utils';
import { AuthorizationCode } from '$utils';
import { Table, Modal, Search } from '@peace/components';
import CollectionEditor from './collectionEditor';

const CollectionTable = (props) => {
    const { isRequesting, tableData,
        dimensions, collectionData, factorItemsData, alliIemsOption, stationsData,
        onDelete, onSave } = props;
    const [dataToEdit, setDataToEdit] = useState({});
    const [formItemNum, setFormItemNum] = useState(null);
    const [enable, setFormEnable] = useState(null);

    const _addModalRef = useRef(null);
    const _editModalRef = useRef(null);
    const _collectionEditorRef = useRef(null);

    const onDelClick = (record) => {
        onDelete(record.dimensionId)
    }
    const onEditClick = (record) => {
        setDataToEdit(Object.assign({ ...record }, { enable: record.enable == "启用" ? true : false }));
    }
    const onEnableClick = (value) => {
        setFormEnable(value);
    }
    const onFormItemNum = (value) => {
        setFormItemNum(value);
    }
    //表单校验
    const sectionCompare = (value_, value) => {
        if (value[0] != '-') {
            value[0] = parseFloat(value[0])
        }
        if (value[1] != '+') {
            value[1] = parseFloat(value[1])
        }
        if (value_[0] != '-') {
            value_[0] = parseFloat(value_[0])
        }
        if (value_[1] != '+') {
            value_[1] = parseFloat(value_[1])
        }
        if ((value[0] > value_[0] && value[0] < value_[1]) || (value[1] > value_[0] && value[1] < value_[1]) ||
            (value[0] <= value_[0] && value[1] >= value_[1]) || (value[0] < value_[1] && value[1] == "+") ||
            (value_[0] < value[1] && value_[1] == "+") || (value[0] == '-' && value_[0] == '-') ||
            (value[1] == '+' && value_[1] == '+') || (value_[0] == '-' && value[0] < value_[1]) ||
            (value[0] == '-' && value_[0] < value[1])) {
            //return callback(`(${value[0]},${value[1]})与(${value_[0]},${value_[1]})数值区间有交集`)
            return true;
        } else {
            return false;
        }
    }
    const valueSort = (a, b) => {
        if (a.lower == '-') {
            return -1;
        } else if (b.lower == '-') {
            return 1
        } else {
            return parseFloat(a.lower) - parseFloat(b.lower)
        }
    }
    const handleOk = (isEdit) => {
        const opts = {
            form: _collectionEditorRef.current,
            isEdit: isEdit,
            idToEdit: dataToEdit.dimensionId,
            onSave: onSave,
            extraDeal: (values) => {
                function parseNegativeZero(value) {
                    for (let i = 0; i < value.length; i++) {
                        if (value[i] == '-0') {
                            value[i] = '0'
                        }
                    }
                    return value;
                }

                let conditions = [];
                const editFormItemNum = formItemNum ? formItemNum : isEdit ? (collectionData && collectionData.filter(c => c.schemeId == dataToEdit.dimensionId)[0].cond.length) : 1
                for (let i = 1; i <= editFormItemNum; i++) {
                    let recoveryConditions = [];
                    let triggerConditions = [];
                    let recoverys = values[`recovery-${i}`].split(";");
                    let triggers = values[`trigger-${i}`].split(";");
                    let stationId = values[`station-${i}`]
                    let item = alliIemsOption.filter(item => item.id == values[`item-${i}`])[0];
                    let recoveryCompare = [];
                    let triggerCompare = [];
                    for (let r of recoverys) {
                        if (r != "") {
                            let recovery = parseNegativeZero(r.slice(1, -1).split(","));
                            recoveryConditions.push({ "lower": recovery[0], "upper": recovery[1] })
                            recoveryCompare.push([recovery[0], recovery[1]])
                        }
                    }
                    for (let t of triggers) {
                        if (t != "") {
                            let trigger = parseNegativeZero(t.slice(1, -1).split(","));
                            triggerConditions.push({ "lower": trigger[0], "upper": trigger[1] })
                            triggerCompare.push([trigger[0], trigger[1]])
                        }
                    }
                    for (let recoveryValue of recoveryCompare) {
                        for (let triggerValue of triggerCompare) {
                            if (sectionCompare(recoveryValue, triggerValue)) {
                                throw `规则${i}中触发条件(${triggerValue[0]},${triggerValue[1]})与恢复条件(${recoveryValue[0]},${recoveryValue[1]})有交集`
                                // return message.warning(`规则${i}中触发条件(${triggerValue[0]},${triggerValue[1]})与恢复条件(${recoveryValue[0]},${recoveryValue[1]})有交集`)
                            }
                        }
                    }
                    triggerConditions.sort(valueSort)
                    recoveryConditions.sort(valueSort)
                    conditions.push({
                        no: i,
                        sensor: stationId,
                        factor_item: item.field_name,
                        fire: triggerConditions,
                        recover: recoveryConditions
                    })
                }
                const dimension = values.dimension;
                const granularity = values.granularity;
                Object.keys(values).map(item => delete values[item])
                values["schemeId"] = dimension;
                values["glt"] = granularity;
                values["cond"] = conditions;
                values["enable"] = enable != null ? enable : isEdit ? (dataToEdit.enable) : true
            }
        };
        let modalRef = isEdit ? _editModalRef : _addModalRef

        const prom = modalRef.current.funcOk(opts);

        return prom
    };

    const renderTable = () => {
        const tableColumnAttrs = [{ key: 'dimension', name: '维度' },
        { key: 'granularity', name: '粒度(min)' },
        { key: 'stations', name: '测点' },
        { key: 'enable', name: '启用/禁用' }];
        const actions = [];
        if (Func.judgeRights(AuthorizationCode.ModifyDynamicAcquisition)) {
            actions.push({
                key: 'edit',
                dom: <Modal
                    ref={_editModalRef}
                    isEdit
                    title='编辑'
                    content={(
                        <CollectionEditor
                            ref={_collectionEditorRef}
                            dimensions={dimensions}
                            collectionData={collectionData && collectionData.filter(c => c.schemeId == dataToEdit.dimensionId)}
                            factorItemsData={factorItemsData}
                            alliIemsOption={alliIemsOption}
                            stationsData={stationsData}
                            dataToEdit={dataToEdit}
                            isEdit={true}
                            onFormEnable={onEnableClick}
                            onFormItemNum={onFormItemNum}
                            sectionCompare={sectionCompare}
                        />
                    )}
                    button={<a style={{ color: 'rgba(66,122,242,1)' }}>修改</a>}
                    ok={() => handleOk(true)}
                />,
                handler: onEditClick
            })
        }
        if (Func.judgeRights(AuthorizationCode.DeleteDynamicAcquisition)) {
            actions.push({
                key: 'del',
                name: '删除',
                popconfirm: true,
                handler: onDelClick,
            })
        }

        return <Table
            data={tableData}
            attrs={tableColumnAttrs}
            actions={actions}
            isRequesting={isRequesting}
            total={tableData.length}
            curpage={0}
            rowKey={"key"}
        />
    }

    return (<div>
        <Row>
            <Modal
                ref={_addModalRef}
                title='新增动态采集配置'
                content={(
                    <CollectionEditor
                        isEdit={false}
                        ref={_collectionEditorRef}
                        dimensions={dimensions}
                        collectionData={collectionData}
                        factorItemsData={factorItemsData}
                        alliIemsOption={alliIemsOption}
                        stationsData={stationsData}
                        onFormEnable={onEnableClick}
                        onFormItemNum={onFormItemNum}
                        sectionCompare={sectionCompare}
                    />)}
                button={<Button type="primary" justify="end" icon={<PlusOutlined />}
                    disabled={!Func.judgeRights(AuthorizationCode.AddDynamicAcquisition)}
                > 新增动态采集配置</Button>}
                ok={() => { handleOk(false) }}
            />
        </Row>
        { renderTable()}
    </div >)
}
export default CollectionTable;