'use strict';
import React, { useState, useRef } from 'react';
import { Button, Row, Menu, Dropdown } from 'antd';
import { Func } from '@peace/utils';
import { Table, Modal } from '@peace/components';
import { AuthorizationCode } from '$utils';
import IPCEditor from './ipcEditor';
import { VideoType, VideoTypeToName } from '../../../constants/video';

const IPCTable = (props) => {
    const { nvrs, ipcs, pushServers, factorsWithStations, onRemove, onSave } = props;
    const [dataToEdit, setDataToEdit] = useState({});
    const [visible, setVisible] = useState(false);

    const _addModalRef = useRef(null);
    const _editModalRef = useRef(null);
    const _ipcEditorRef = useRef(null);

    const PlatformType = [VideoType.ys, VideoType.re];//萤石云、热成像
    //table数据源分组
    let nvrIpcs = [];
    let p2pIpcs = [];
    let ysIpcs = [];
    let tiIpcs = [];
    let ipcNames = [];
    for (let i in ipcs) {
        ipcNames.push(ipcs[i].name);
        if (ipcs[i].type == "p2p") {
            p2pIpcs.push(ipcs[i]);
        } else if (ipcs[i].type == "yingshi") {
            ysIpcs.push(ipcs[i]);
        } else if (ipcs[i].type == "Ti") {
            tiIpcs.push(ipcs[i]);
        } else {
            nvrIpcs.push(ipcs[i]);
        }
    }

    const getStations = (stations) => {
        let allStationsName = stations.map(station => station.name);
        let stationsToShow;
        if (stations.length > 5) {
            stationsToShow = allStationsName.slice(0, 5).join('，');
            const menu = (
                <Menu style={{ maxHeight: '330px', overflowY: 'auto' }}>
                    {
                        allStationsName.map((name, index) => <Menu.Item key={index}>{name}</Menu.Item>)
                    }
                </Menu>
            );
            return (
                <span>
                    <span>{stationsToShow}</span>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a>，更多...</a>
                    </Dropdown>
                </span>
            );
        }
        stationsToShow = stations.length ? allStationsName.join('，') : '无';
        return (
            <span>
                <span>{stationsToShow}</span>
            </span>
        );
    };
    const handleDel = (record) => {
        onRemove(record.key);
    }
    const handleEdit = (record, type) => {
        let dataToEdit = {};
        const { key, name, extra, longitude, latitude } = record;
        const { stations, hasPTZ } = extra;
        dataToEdit = {
            key,
            name,
            hasPTZ,
            longitude: longitude,
            latitude: latitude,
            factors: stations.reduce((p, c) => {
                if (!p.includes(c.factorId)) p.push(c.factorId);
                return p;
            }, []).sort((a, b) => a - b),
            stations: stations.map(station => station.id),
            type: type
        };
        if (type == VideoType.nvr) {
            const { channelNo } = record;
            const { nvr, pushServer } = extra;
            dataToEdit = Object.assign({}, dataToEdit, { nvr: nvr.id, channelNo, pushServer: pushServer.id, pushServerName: pushServer.name })
        } else if (type == VideoType.p2p) {
            const { uid, userName, password } = record;
            const { pushServer } = extra;
            dataToEdit = Object.assign({}, dataToEdit, { uid, userName, password, pushServer: pushServer.id, pushServerName: pushServer.name });
        } else if (PlatformType.includes(type)) {
            const { channelNo, serialNo, rtmpAddress, hlsAddress } = record;
            dataToEdit = Object.assign({}, dataToEdit, { channelNo, serialNo, rtmpAddress, hlsAddress });
        }
        setDataToEdit(dataToEdit);
        setVisible(true);
    }
    const handleOk = (isEdit, type) => {
        const opts = {
            form: _ipcEditorRef.current,
            isEdit: isEdit,
            idToEdit: dataToEdit.key,
            onSave: onSave,
            extraDeal: (values) => {
                const { pushServer, stations, hasPTZ, longitude, latitude } = values;
                values["pushServer"] = parseInt(pushServer);
                values["stations"] = stations && stations.length ? stations.map(sid => parseInt(sid)) : [];
                values["longitude"] = parseFloat(longitude);
                values["latitude"] = parseFloat(latitude);
                values["hasPTZ"] = hasPTZ || false;
                if (type == VideoType.nvr) {
                    const { nvr, channelNo } = values;
                    values["nvr"] = parseInt(nvr);
                    values["channelNo"] = parseInt(channelNo);
                } else if (type == VideoType.p2p) {
                    const { name, uid, userName, password } = values;
                    values["name"] = name;
                    values["uid"] = uid;
                    values["userName"] = userName;
                    values["password"] = password;
                } else if (PlatformType.includes(type)) {
                    const { name, rtmpAddress, hlsAddress, serialNo, channelNo } = values;
                    values["name"] = name;
                    values["channelNo"] = channelNo != undefined ? channelNo : null;
                    values["serialNo"] = serialNo != "" ? serialNo : null;
                    values["rtmpAddress"] = rtmpAddress;
                    values["hlsAddress"] = hlsAddress;

                }
                values["type"] = type;
            }
        }
        let modalRef = isEdit ? _editModalRef : _addModalRef
        const prom = modalRef.current.funcOk(opts);

        return prom
    }
    const getDataSource = (ipcs, type) => {
        let data = [];
        if (ipcs && ipcs.length) {
            if (type == VideoType.nvr) {
                data = ipcs.filter(key => key.type == VideoType.nvr).map(key => {
                    const { id, name, nvr, channelNo, stations, pushServer, hasPTZ, longitude, latitude, type } = key;
                    let record = {
                        key: id,
                        name,
                        nvr: <span>{nvr.name}<br />{`(${nvr.address.ip}:${nvr.address.port})`}</span>,
                        channelNo,
                        stations: getStations(stations),
                        pushServer: `${pushServer.address.ip}:${pushServer.address.port}`,
                        hasPTZ: hasPTZ ? '是' : '否',
                        longitude: longitude,
                        latitude: latitude,
                        extra: { nvr, pushServer, stations, hasPTZ }
                    };
                    return record;
                });
            } else if (type == VideoType.p2p) {
                data = ipcs.filter(key => key.type == VideoType.p2p).map(key => {
                    const { id, name, p2p, stations, pushServer, hasPTZ, longitude, latitude } = key;
                    let record = {
                        key: id,
                        name,
                        uid: p2p.uid,
                        userName: p2p.userName,
                        password: p2p.password,
                        stations: getStations(stations),
                        pushServer: `${pushServer.address.ip}:${pushServer.address.port}`,
                        hasPTZ: hasPTZ ? '是' : '否',
                        longitude: longitude,
                        latitude: latitude,
                        extra: { pushServer, stations, hasPTZ }
                    };
                    return record;
                })
            } else if (PlatformType.includes(type)) {
                data = ipcs.filter(key => PlatformType.includes(key.type)).map(key => {
                    const { id, name, channelNo, stations, hasPTZ, longitude, latitude } = key;
                    let record = {
                        key: id,
                        name,
                        stations: getStations(stations),
                        hasPTZ: hasPTZ ? '是' : '否',
                        rtmpAddress: key[type].rtmpAddress,
                        hlsAddress: key[type].hlsAddress,
                        serialNo: key[type].serialNo,
                        channelNo: channelNo,
                        longitude: longitude,
                        latitude: latitude,
                        extra: { stations, hasPTZ }
                    };
                    return record;
                })
            }
        }
        return data;
    }
    const getColumns = (type) => {
        const columns = [{ key: 'name', name: '监控位置' }];
        if (type == VideoType.nvr) {
            columns.push({ key: 'nvr', name: 'NVR' },
                { key: 'channelNo', name: '通道号' },
                { key: 'stations', name: '测点', ellipsis: false },
                { key: 'pushServer', name: '推流服务器' });
        } else if (type == VideoType.p2p) {
            columns.push({ key: 'uid', name: 'UID' },
                { key: 'userName', name: '用户名' },
                { key: 'password', name: '密码' },
                { key: 'stations', name: '测点', ellipsis: false },
                { key: 'pushServer', name: '推流服务器' });
        } else if (PlatformType.includes(type)) {
            columns.push({ key: 'rtmpAddress', name: 'rtmp地址' },
                { key: 'hlsAddress', name: 'hls地址' },
                { key: 'serialNo', name: '设备序列号' },
                { key: 'channelNo', name: '通道号' },
                { key: 'stations', name: '测点', ellipsis: false });
        } else {

        }
        columns.push({ key: 'hasPTZ', name: '是否支持云台' });
        return columns;
    }
    const renderContent = (isEdit, type, ipcs) => {
        if (isEdit) {
            return < a style={{ color: 'rgba(66,122,242,1)' }}> 修改</a >
        } else {
            return Func.judgeRights(AuthorizationCode.AddVideoNVR) ?
                <Modal
                    ref={_addModalRef}
                    title={`新增${VideoTypeToName[type]}摄像头`}
                    content={(<IPCEditor
                        ref={_ipcEditorRef}
                        ipcType={type}
                        nvrs={nvrs}
                        ipcs={ipcs}
                        ipcNames={ipcNames}
                        pushServers={pushServers}
                        factorsWithStations={factorsWithStations}
                        isEdit={false}
                    />)}
                    button={<Button type="primary" >{`新增${VideoTypeToName[type]}摄像头`}</Button>}
                    ok={() => { handleOk(false, type) }}
                />
                : <Button type="primary" disabled>{`新增${VideoTypeToName[type]}摄像头`}</Button>
        }
    }
    const renderNVRTable = (ipcs, type) => {
        const tableColumnAttrs = getColumns(type);
        const actions = [];
        //编辑按钮
        if (Func.judgeRights(AuthorizationCode.ModifyVideoIPC)) {
            actions.push({
                key: 'edit',
                dom: renderContent(true, type, ipcs),
                handler: (record) => handleEdit(record, type)
            })
        }//删除
        if (Func.judgeRights(AuthorizationCode.DeleteVideoIPC)) {
            actions.push({
                key: 'del',
                name: '删除',
                popconfirm: true,
                handler: handleDel,
            })
        }
        const data = getDataSource(ipcs, type);

        return (<Table
            data={data}
            attrs={tableColumnAttrs}
            rowKey={"key"}
            actions={actions}
            total={data.length}
            curpage={0}
        />);
    };
    const renderModal = () => {
        //解决table除最后一行编辑弹框外其它保存不关闭问题
        if (visible) {
            const { type } = dataToEdit;
            let ipcs = [];
            switch (type) {
                case VideoType.nvr: ipcs = nvrIpcs; break;
                case VideoType.p2p: ipcs = p2pIpcs; break;
                case VideoType.ys: ipcs = ysIpcs; break;
                case VideoType.re: ipcs = tiIpcs; break;
                default: break;
            }
            return <Modal
                visible={visible}
                ref={_editModalRef}
                isEdit
                title={`编辑${VideoTypeToName[type]}摄像头`}
                content={(<IPCEditor
                    ref={_ipcEditorRef}
                    ipcType={type}
                    nvrs={nvrs}
                    ipcs={ipcs}
                    ipcNames={ipcNames}
                    pushServers={pushServers}
                    factorsWithStations={factorsWithStations}
                    isEdit={true}
                    dataToEdit={dataToEdit}
                />)}
                button={null}
                ok={() => handleOk(true, type)}
                cancel={() => { setVisible(false) }}
            />
        } else {
            return null
        }
    }

    return (<div>
        <div >
            <Row>{renderContent(false, VideoType.nvr, nvrIpcs)}</Row>
            {renderNVRTable(nvrIpcs, VideoType.nvr)}
        </div>
        <div >
            <Row>{renderContent(false, VideoType.p2p, p2pIpcs)}</Row>
            {renderNVRTable(p2pIpcs, VideoType.p2p)}
        </div>
        <div >
            <Row>{renderContent(false, VideoType.ys, ysIpcs)}</Row>
            {renderNVRTable(ysIpcs, VideoType.ys)}
        </div>
        <div >
            <Row>{renderContent(false, VideoType.re, tiIpcs)}</Row>
            {renderNVRTable(tiIpcs, VideoType.re)}
        </div>
        {renderModal()}
    </div>)
}
export default IPCTable;