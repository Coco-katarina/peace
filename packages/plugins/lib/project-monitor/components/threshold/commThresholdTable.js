import React, { useState, useRef } from 'react';
import { Popover, Select, Spin, Row, Button, Space } from 'antd';
import { Table } from '@peace/components';
import { Func, PinyinHelper } from '@peace/utils';
import { AuthorizationCode } from '$utils';
import ThresholdModal from './thresholdModal';
import './threshold.less';

const commThresholdTable = (props) => {

    const { dataSource, isRequesting, structId, factorId, factors, stations, batchThreshold, onFactorChange, onDelete, onSave } = props;
    const [dataToEdit, setDataToEdit] = useState({
        isEdit: false,
        modalData: {
            batchNo: null,
            dataToEdit: null
        }
    });
    const [visiable, setVisiable] = useState(false);

    const showMoreSensors = (batchSensors) => {
        let sensors = batchSensors.reduce((p, c) => {
            p.push(<p key={c.id}>{c.name}</p>);
            return p;
        }, []);
        let content = <div>{sensors}</div>;
        return (
            <Popover key={Math.random()} content={content} title='测点列表' trigger='click'
                overlayClassName='fs-config-threshold-popover'>
                <a>更多...</a>
            </Popover>
        );
    };
    const handleTableChange = (value) => {
        /**
         * todo
         * 分页查询，待API调整后优化，<Table/>也需调整
         */
        // props.onTableChangeHander(limit, offset, current)
    }
    const handleEdit = (record) => {
        const { batchNo, data } = record;
        setDataToEdit({
            isEdit: true,
            modalData: {
                batchNo: batchNo,
                dataToEdit: data
            }
        });
        setVisiable(true);
    }
    const handleDel = (values) => {
        const { batchNo } = values;
        onDelete(batchNo);
    }
    const handleOk = (isEdit, dataToSave) => {
        onSave(isEdit, dataToSave, isEdit ? dataToEdit.modalData.batchNo : null);
        setVisiable(false)
    }
    const handleCancel = () => {
        setVisiable(false)
        setDataToEdit({
            isEdit: false,
            modalData: {
                batchNo: null,
                dataToEdit: null
            }
        })
    }
    const renderTable = () => {
        const tableColumnAttrs = [
            {
                key: 'cedianName', name: '测点名称',
                render: (text, record) => text != null && text.length > 1 ? (
                    <span>{text[0].name}<br />
                        <span style={{ marginLeft: '22px' }}>
                            {showMoreSensors(text)}
                        </span>
                    </span>
                ) : text != null && text.length == 1 ? (<span>{text[0].name}</span>) : null
            },
            { key: 'itemName', name: '监测项', width: '10%' },
            { key: 'startTime', name: '开始时间' },
            { key: 'endTime', name: '结束时间' },
            { key: 'level1', name: '一级阈值' },
            { key: 'level2', name: '二级阈值' },
            { key: 'level3', name: '三级阈值' }
        ];
        const actions = [];
        //编辑
        if (Func.judgeRights(AuthorizationCode.ModifyThreshold)) {
            actions.push({
                key: 'edit',
                name: '修改',
                hidden: (record) => {
                    if (record.children) {
                        return false
                    } else return true
                },
                handler: handleEdit
            })
        }
        //删除
        if (Func.judgeRights(AuthorizationCode.DeleteThreshold)) {
            actions.push({
                key: 'del',
                name: '删除',
                popconfirm: true,
                hidden: (record) => {
                    if (record.children) {
                        return false
                    } else return true
                },
                handler: handleDel,
            })
        }
        return (
            <Table
                data={dataSource}
                attrs={tableColumnAttrs}
                actions={actions}
                rowKey={"batchNo"}
                isRequesting={isRequesting}
                onTableChange={handleTableChange}
                total={dataSource.length}
                curpage={0}
            />
        );
    }

    return (<div>
        <Row><Space>
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
            {Func.judgeRights(AuthorizationCode.AddThreshold) &&
                <Button
                    type="primary"
                    onClick={() => { setVisiable(true) }} >新增阈值</Button>}
        </Space>
        </Row>
        { visiable && <ThresholdModal
            alarmLevel={3}
            stations={stations}
            batchThreshold={batchThreshold}
            structId={structId}
            factorId={factorId}
            factor={factors && factors.filter(f => f.id == factorId)[0] || null}
            modalProps={dataToEdit}
            ok={handleOk}
            onCancle={handleCancel}
        />}
        { renderTable()}
    </div >)
};
export default commThresholdTable;