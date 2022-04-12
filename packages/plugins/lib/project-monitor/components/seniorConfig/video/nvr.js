'use strict';

import React, { useState, useRef } from 'react';
import { Button, Row } from 'antd';
import { Func } from '@peace/utils';
import { Table, Modal } from '@peace/components';
import { AuthorizationCode } from '$utils';
import NVREditor from './nvrEditor';

const NVR = (props) => {
    const { nvrs, vendors, isRequesting, onSave, onRemove } = props;
    const [dataToEdit, setDataToEdit] = useState({});//编辑弹框带数据
    const [visible, setVisible] = useState(false);

    const _addModalRef = useRef(null);
    const _editModalRef = useRef(null);
    const _nvrEditorRef = useRef(null);

    const handleDel = (values) => {
        onRemove(values.key);
    };
    const handleOk = (isEdit = false) => {
        const opts = {
            form: _nvrEditorRef.current,
            isEdit: isEdit,
            idToEdit: dataToEdit.id,
            onSave: onSave,
            extraDeal: (values) => {
                const { vendor, ip, port, username, password, channelsTotal } = values;
                delete values["ip"]
                delete values["port"]
                delete values["username"]
                delete values["password"]
                values["vendor"] = parseInt(vendor);
                values["address"] = {
                    "ip": ip,
                    "port": parseInt(port)
                }
                values["account"] = {
                    "username": username,
                    "password": password
                }
                values["channelsTotal"] = parseInt(channelsTotal)
            }
        };
        let modalRef = isEdit ? _editModalRef : _addModalRef
        const prom = modalRef.current.funcOk(opts);

        return prom
    }
    const onEditClick = (record) => {
        const { key, name, channelsTotal, extra } = record;
        const { vendor, address, account } = extra;
        const data = {
            id: key,
            name,
            vendor: vendor.id,
            ip: address.ip,
            port: address.port,
            username: account.username,
            password: account.password,
            channelsTotal
        };
        setDataToEdit(data);
        setVisible(true);
    }
    const onTableChange = (value) => {
        /**
         * todo
         * 分页查询，待API调整后优化，<Table/>也需调整
         */
        // props.onTableChangeHander(limit, offset, current)
    }
    const getDataSource = () => {
        let data = [];
        if (nvrs && Object.keys(nvrs).length) {
            data = Object.keys(nvrs).map(key => {
                let item = nvrs[key];
                const { id, name, vendor, address, account, channelsTotal } = item;
                let record = {
                    key: id,
                    name: name.trim(),
                    vendor: vendor.name,
                    address: `${address.ip}:${address.port}`,
                    channelsTotal,
                    extra: { vendor, address, account }
                };
                return record;
            });
        }
        return data;
    };
    const renderTable = () => {
        const tableColumnAttrs = [
            { key: 'name', name: '名称' },
            { key: 'vendor', name: '厂家' },
            { key: 'address', name: '地址' },
            { key: 'channelsTotal', name: '通道数' }
        ];
        const actions = [];
        //编辑按钮
        if (Func.judgeRights(AuthorizationCode.ModifyVideoNVR)) {
            actions.push({
                key: 'edit',
                dom: <a style={{ color: 'rgba(66,122,242,1)' }}>修改</a>,
                // <Modal
                //     ref={_editModalRef}
                //     isEdit
                //     title='编辑'
                //     content={(
                //         <NVREditor
                //             ref={_nvrEditorRef}
                //             nvrs={nvrs}
                //             vendors={vendors}
                //             dataToEdit={dataToEdit}
                //             isEdit={true}
                //         />
                //     )}
                //     button={<a style={{ color: 'rgba(66,122,242,1)' }}>修改</a>}
                //     ok={() => handleOk(true)}
                // />,
                handler: onEditClick
            })
        }//删除
        if (Func.judgeRights(AuthorizationCode.DeleteVideoNVR)) {
            actions.push({
                key: 'del',
                name: '删除',
                popconfirm: true,
                handler: handleDel,
            })
        }
        return (
            <Table
                data={getDataSource()}
                attrs={tableColumnAttrs}
                actions={actions}
                isRequesting={isRequesting}
                onTableChange={onTableChange}
                rowKey={'key'}
                total={nvrs.length}
                curpage={0}
            />
        );
    };
    const renderModal = () => {
        //解决table除最后一行编辑弹框外其它保存不关闭问题
        if (visible) {
            return <Modal
                visible={visible}
                ref={_editModalRef}
                isEdit
                title='编辑'
                content={(
                    <NVREditor
                        ref={_nvrEditorRef}
                        nvrs={nvrs}
                        vendors={vendors}
                        dataToEdit={dataToEdit}
                        isEdit={true}
                    />
                )}
                button={null}
                ok={() => handleOk(true)}
                cancel={() => { setVisible(false) }}
            />
        } else {
            return null
        }
    }

    return (
        <div>
            <Row>
                {Func.judgeRights(AuthorizationCode.AddVideoNVR) ?
                    <Modal
                        ref={_addModalRef}
                        title='新增'
                        content={(
                            <NVREditor
                                ref={_nvrEditorRef}
                                nvrs={nvrs}
                                vendors={vendors}
                                isEdit={false}
                            />)}
                        button={<Button type="primary" >新增NVR</Button>}
                        ok={() => { handleOk(false) }}
                    />
                    : <Button type="primary" disabled>新增NVR</Button>
                }
            </Row>
            {renderTable()}
            {renderModal()}
        </div>
    );
}
export default NVR;
