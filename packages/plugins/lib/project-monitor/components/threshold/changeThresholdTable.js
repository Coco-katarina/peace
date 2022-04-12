import React, { useState, useRef } from 'react';
import { Table } from '@peace/components';
import { Func, PinyinHelper } from '@peace/utils';
import { AuthorizationCode } from '$utils';
import { Spin, Select, Space, Button, Row } from 'antd';
import { CategoryToThreshold } from '../../constants/threshold'
import ThresholdModal from './thresholdModal';

const ChangeThresholdTable = (props) => {
    const { dataSource, structId, factorId, factors, aggConfigList, aggThresholdList, isRequesting, onDelete, onSave, onFactorChange } = props;
    const [visiable, setVisiable] = useState(false);
    const [dataToEdit, setDataToEdit] = useState({
        isEdit: false,
        modalData: { dataToEdit: null }
    });

    let itemIds = [];
    let aggToConfig = [];
    //按itemId提取对应的类型值
    if (aggThresholdList && aggThresholdList.length) {
        aggThresholdList.map(a => {
            if (itemIds.includes(a.itemId)) {
                aggToConfig = aggToConfig.map((item) => {
                    if (item.itemId == a.itemId) {
                        return Object.assign(...item, { itemId: a.itemId, aggCategory: item.aggCategory + ',' + a.aggCategory });
                    } else return item;
                })
            } else {
                itemIds = itemIds.concat(a.itemId);
                aggToConfig.push({ itemId: a.itemId, aggCategory: a.aggCategory });
            }
        })
    };
    const onTableChange = (value) => {
        /**
         * todo
         * 分页查询，待API调整后优化，<Table/>也需调整
         */
        // props.onTableChangeHander(limit, offset, current)
    }
    const handleEdit = (record) => {
        setDataToEdit({
            isEdit: true,
            modalData: { dataToEdit: record }
        });
        setVisiable(true);
    }
    const onDelClick = (values) => {
        const { id } = values;
        onDelete(id);
    }
    const handleOk = (isEdit, dataToSave) => {
        onSave(isEdit, dataToSave, isEdit ? dataToEdit.modalData.projectId : null);
        setVisiable(false)
    }
    const handleCancel = () => {
        setVisiable(false)
        setDataToEdit({
            isEdit: false,
            modalData: {
                dataToEdit: null
            }
        })
    }
    const renderTable = () => {
        const tableColumnAttrs = [
            { key: 'aggCategory', name: '类型', render: (text) => CategoryToThreshold[text] },
            { key: 'itemName', name: '监测项', width: '10%' },
            { key: 'startTime', name: '开始时间' },
            { key: 'endTime', name: '结束时间' },
            { key: 'level1', name: '一级阈值' },
            { key: 'level2', name: '二级阈值' },
            { key: 'level3', name: '三级阈值' }
        ];
        const actions = [];
        //编辑
        if (Func.judgeRights(AuthorizationCode.ModifyThresholdChangeRate)) {
            actions.push({
                key: 'edit',
                name: '修改',
                hidden: (text, record) => { if (!text.action) return true },
                handler: handleEdit
            })
        }
        //删除
        if (Func.judgeRights(AuthorizationCode.DeleteThresholdChangeRate)) {
            actions.push({
                key: 'del',
                name: '删除',
                hidden: (text, record) => { if (!text.action) return true },
                handler: onDelClick,
            })
        }
        return (
            <Table
                data={dataSource}
                attrs={tableColumnAttrs}
                actions={actions}
                isRequesting={isRequesting}
                onTableChange={onTableChange}
                total={dataSource.length}
                rowKey={"key"}
                curpage={0}
            />
        );
    }

    return (<Spin spinning={isRequesting}>
        <Row>
            <Space>
                <Select
                    value={factorId}
                    onChange={(value) => onFactorChange(value)}
                    placeholder="请选择监测因素"
                    className="factor_select"
                    size="large">
                    {
                        factors ? factors.map(f => <Select.Option key={f.id} value={f.id}>{f.name}</Select.Option>) : []
                    }
                </Select>
                {Func.judgeRights(AuthorizationCode.AddThresholdChangeRate) &&
                    <Button
                        type="primary"
                        onClick={() => { setVisiable(true) }} >新增阈值</Button>}
            </Space>
        </Row>
        {renderTable()}
        { visiable && <ThresholdModal
            alarmLevel={3}
            modalType={"change"}
            structId={structId}
            factorId={factorId}
            factor={factors && factors.filter(f => f.id == factorId)[0] || null}
            aggConfigList={aggConfigList && factorId ? aggConfigList.filter(f => f.factorId == factorId) : null}
            aggToConfig={aggToConfig}
            modalProps={dataToEdit}
            ok={handleOk}
            onCancle={handleCancel}
        />}
    </Spin>)
};
export default ChangeThresholdTable;