import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Spin, Input, Button, Message, Menu, Dropdown, Row, Drawer } from 'antd'
import {
    getDeviceMeta, getDeviceMetaDeployed, getDeviceList, modifyZuwang,
    getDimensionsList, AddDimension, modifyDimension, deleteDimension, invokeCapability,
    CLEAR_ZUWANG_INFO, CLEAR_REQUEST_INVOKE_CAPABILITY, fetchIdauDiagnosis, clearIdauDiagnosisHistory,
    CLEAR_SENSORS_LAST_DATA, getDebugHistory
} from '../../actions/integrationInfo';
import { getStructState } from '../../actions/struct';
import ZuwangMain from '../../components/optionModals/zuwangMain';
import EquipmentOption from '../../components/optionModals/equipmentOption';
import DimensionModal from '../../components/optionModals/dimensionModal';
import EquipmentAddModal from '../../components/optionModals/equipmentAddModal';
import SensorLastDataModal from '../../components/optionModals/sensorLastDataModal';
import BatchRemoveModal from '../../components/optionModals/batchRemoveModal';
import DebugHistoryModal from '../../components/optionModals/debugHistoryModal';
import Immutable from 'immutable';
import { AuthorizationCode } from '$utils';
import { Func } from '@peace/utils';
import { PlusOutlined } from '@ant-design/icons';

const Item = Menu.Item;
const { ModifyEquipmentNetworking } = AuthorizationCode

class Zuwang extends Component {
    constructor(props) {
        super(props);
        this.headerHeight = 65;
        this.footerHeight = 32;

        this.state = {
            isEdit: false,
            devices: null,
            selectedNode: null,
            emitDataChange: false,
            collapseAll: false,
            collapsed: [],
            expandAll: false,
            expanded: [],
            targetNode: '',
            showOptionModal: false,
            showAddDimensionModal: false,
            showAddEquipmentModal: false,
            clientWidth: document.body.clientWidth - 64 - 20 - 16 - 2,
            isClAdd: false,
            clTitle: '',
            dimensions: {},
            sensorsId: [],
            sensorsDataItems: {},
            showSensorDataModal: false,
            foldAllG6ToCenter: false,
            g6TreeDirection: 'TB',
            httpServerInterfaceIds: [],
            showBatchRemove: false,
            showBugHistory: false,
        }
    }

    componentDidMount() {
        const { dispatch, match: { params } } = this.props;
        dispatch(getStructState(parseInt(params.id))).then(res => {
            if (res.success) {
                let { iotaThingId } = res.payload.data
                dispatch(getDeviceMeta());
                // dispatch(getDeviceMetaDeployed(iotaThingId));
                dispatch(getDeviceList(iotaThingId));
                dispatch(getDimensionsList(iotaThingId));
            }
        });
    }

    guid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    saveChanges = () => {
        const { dispatch, struct } = this.props;
        const { devices } = this.state;
        dispatch(modifyZuwang(struct.iotaThingId, devices))
    }

    goBack = () => {
        const { params, dispatch, struct } = this.props;
        const { emitDataChange } = this.state;
        dispatch(getDeviceList(struct.iotaThingId));
        this.setState({ isEdit: false, devices: null });
    }

    editZuwang = () => {
        const { params, dispatch } = this.props;
        this.setState({
            isEdit: true,
        });
    }

    _closeAddEquipmentModal = () => {
        this.setState({ showAddEquipmentModal: false });
    }

    _showDimension = (dimension) => {
        const { dimensions } = this.props;
        const { devices } = this.state;
        let a = Object.keys(devices.instances).includes(dimension.key) ? { "scheme": devices.instances[dimension.key].instance } : dimensions.dimensions.filter(item => item.id == dimension.key)[0];
        this.setState({ showAddDimensionModal: true, showOptionModal: false, isClAdd: false, clTitle: '修改采集策略', selectedNode: { "type": "modifydimension", "dimension": a } })
    }

    closeOptionModal = () => {
        this.setState({ showOptionModal: false, selectedNode: null })
    }
    closeDimensionModal = () => {
        this.setState({ showAddDimensionModal: false, selectedNode: null })
    }
    _handelNodeClick = (node) => {
        const { dispatch, deviceMetasDeployed, deviceMetasWithFollow } = this.props;
        const { devices, isEdit } = this.state;

        if (node) {
            let targetId = node.get('model').id;
            let selectedNode = Object.assign({}, devices.instances[targetId], { id: targetId });
            let deviceMetaId = selectedNode?.instance?.deviceMetaId;
            let selectedDeviceMetaArr = [] //deviceMetasDeployed.devices.filter(s => s.id == deviceMetaId);
            let selectedDeviceMeta;
            if (selectedDeviceMetaArr.length == 0) {
                selectedDeviceMeta = deviceMetasWithFollow && deviceMetasWithFollow.devices ?
                    deviceMetasWithFollow.devices.filter(s => s.id == deviceMetaId)[0]
                    : [];
            } else {
                selectedDeviceMeta = selectedDeviceMetaArr[0]
            }
            if (selectedNode.type && (selectedNode.type != "s.iota" || isEdit)) {
                // parentNode
                const selectedParentNode = Object.keys(devices.instances).reduce((p, k) => {
                    const instance = devices.instances[k];
                    if (instance.type == 's.l' && instance.instance.from.ownerSvgId == targetId) {
                        p = Object.assign({}, devices.instances[instance.instance.to.ownerSvgId], { id: instance.instance.to.ownerSvgId });;
                    }

                    return p;
                }, null);

                const selectedParentNodeMetaId = selectedParentNode ? selectedParentNode.instance.deviceMetaId : null;
                const selectedParentNodeMeta = selectedParentNodeMetaId ? (deviceMetasWithFollow || deviceMetasDeployed).devices.filter(s => s.id == selectedParentNodeMetaId)[0] : null;

                this.setState({
                    showOptionModal: true,
                    selectedNode: { "type": "equipment", "device": selectedNode, "meta": selectedDeviceMeta },
                    selectedParentNode: { "type": "equipment", "device": selectedParentNode, "meta": selectedParentNodeMeta }
                });
                this.cleanRequestInvoke()
            } else {
                this.setState({ showOptionModal: false, selectedNode: null });
            }
        } else {
            this.setState({ showOptionModal: false, selectedNode: null });
        }
    }

    cleanRequestInvoke = () => {
        // this.props.dispatch({ type: CLEAR_REQUEST_INVOKE_CAPABILITY })
    }

    _addEquipments = (values) => {
        //新增设备
        const { deviceMetasWithFollow } = this.props;
        const { devices, selectedNode } = this.state;
        values.forEach(item => {
            let uuidNode = this.guid();
            let uuidLink = this.guid();

            let deviceName = null;

            if (item.num && item.parameter.itemName) {
                deviceName = `${item.parameter.itemName}${item.num}`
            } else if (item.num && !item.parameter.itemName) {
                deviceName = `${item.num}`
            } else if (!item.num && item.parameter.itemName) {
                deviceName = `${item.parameter.itemName}`
            } else {
                deviceName = `${item.parameter.productType}`
            }
            let interfaces = {};
            const interfaceWithMeta = this.getUpLinkInterface(item.node, selectedNode)
            const deviceType = item.parameter ? item.parameter.deviceType : '';
            if (interfaceWithMeta || deviceType != 'sensor') {
                for (let a of item.node.interfaces) {
                    if (a.id != interfaceWithMeta.id && deviceType.indexOf('sensor') > -1) {
                        continue;
                    }
                    let deviceMeta = deviceMetasWithFollow.devices.filter(s => s.id == item.node.id)[0];
                    let capability = deviceMeta.capabilities.filter(y => {
                        return y.interfaces.filter(b => b.deviceMetaInterfaceId == a.id).length > 0
                    });
                    let deviceCapability = {};
                    for (let ci = 0; ci < capability.length; ci++) {
                        let deviceCapabilityProps = {};

                        if (capability[ci].capabilityCategoryId == 3) {
                            capability[ci].properties.forEach(capProp => {
                                deviceCapabilityProps[capProp.name] = capProp.defaultValue;
                            })
                            deviceCapability[capability[ci].id] = { "properties": deviceCapabilityProps };
                            if (item.parameter.repeats && item.parameter.dimensionInterval && item.parameter.timeout &&
                                item.parameter.dimensionType) {
                                deviceCapability[capability[ci].id]["dimension"] = {
                                    "id": this.guid(),
                                    "dimensionId": item.parameter.dimensionType,
                                    "interval": item.parameter.dimensionInterval,
                                    "repeats": item.parameter.repeats,
                                    "timeout": item.parameter.timeout,
                                    "unit": "second"
                                }
                                deviceCapability[capability[ci].id]["protocolMetaId"] = null;
                            }

                            if (item.parameter['up_formula']) {
                                deviceCapability[capability[ci].id]["formula"] = {
                                    id: this.guid(),
                                    formulaId: item.parameter['up_formula'],
                                    properties: Object.keys(item.parameter).filter(k => k.startsWith('formula-p-'))
                                        .reduce((p, key) => {
                                            p[key.replace('formula-p-', '')] = item.parameter[key];

                                            return p;
                                        }, {})
                                }
                            }
                        } else {
                            capability[ci].properties.forEach(capProp => {
                                deviceCapabilityProps[capProp.name] = capProp.defaultValue;
                            })
                            deviceCapability[capability[ci].id] = { "properties": deviceCapabilityProps, "dimension": {} };
                        }
                    }
                    //添加DTU端口40001 40009，云网关端口40004 40005
                    let interfaceProps = {};
                    if (a.interfaceMeta.interfaceTypeId == 4 && a.interfaceMeta.properties.filter(interfaceProp => interfaceProp.name == "port").length) {
                        if (JSON.parse(deviceMeta.filteredResource.properties).deviceType == 'gateway') {
                            interfaceProps["protocol"] = "Modbus";

                            if (deviceMeta.vendorId == '74c38e2c-4971-46b3-bee6-8a51f116213a'
                                || deviceMeta.vendorId == '28384069-379b-427a-8293-4558a6fdff7c') { // 才茂/四信

                                if (deviceMeta.vendorId == '74c38e2c-4971-46b3-bee6-8a51f116213a') {
                                    interfaceProps["vendor"] = "才茂";
                                } else {
                                    interfaceProps["vendor"] = "四信";
                                }

                                interfaceProps["port"] = 40001;
                                interfaceProps["escape"] = true;
                                interfaceProps["escapegw"] = false;
                            } else if (deviceMeta.vendorId == 'bb73aebb-0d8d-49b2-80d9-b2d909e304a1') { // 宏电
                                interfaceProps["vendor"] = "宏电";
                                interfaceProps["port"] = 40009;
                                interfaceProps["escape"] = false;
                                interfaceProps["escapegw"] = false;
                            } else if (a.interfaceMetaId == 'e8fa0f36-2606-4bc7-b594-ae3c3289ed63') { // 飞尚NB
                                interfaceProps["port"] = 40001;
                                interfaceProps["escape"] = false;
                                interfaceProps["escapegw"] = false;
                            } else { // 微功耗
                                interfaceProps["port"] = 40001;
                                interfaceProps["escape"] = true;
                                interfaceProps["escapegw"] = false;
                            }
                        } else if (JSON.parse(deviceMeta.filteredResource.properties).deviceType == 'dau.gateway') {
                            interfaceProps["port"] = 40004;
                            interfaceProps["protocol"] = "iDAU";
                            if (deviceMeta.id == 'd8de8739-f146-41e0-877e-747f30ac59a7') { // 自研空气节点
                                interfaceProps["escape"] = false;
                                interfaceProps["escapegw"] = false;
                            } else {
                                interfaceProps["escape"] = true;
                                interfaceProps["escapegw"] = true;
                            }
                        } else if (JSON.parse(deviceMeta.filteredResource.properties).deviceType == 'tcp.dtu') {
                            interfaceProps["port"] = 40005;
                            interfaceProps["protocol"] = "iDAU";
                            interfaceProps["escape"] = false;
                            interfaceProps["escapegw"] = false;
                        } else if (JSON.parse(deviceMeta.filteredResource.properties).deviceType == 'sensor') {
                            if (deviceMeta.vendorId == '255aa9dd-04f8-4987-8634-ed802143a025') { // 宁波智哲水质 udp转发模拟dtu
                                interfaceProps["port"] = 40001;
                                interfaceProps["vendor"] = "才茂";
                                interfaceProps["protocol"] = "Modbus";
                                interfaceProps["escape"] = false;
                                interfaceProps["escapegw"] = false;
                            }
                        }

                        interfaceProps["id"] = item.parameter.portID;
                    }

                    a.interfaceMeta.properties.forEach(p => {
                        if (a.interfaceMeta.interfaceTypeId == 4) {
                            if (['id', 'port', 'vendor', 'escape', 'protocol', 'escapegw', 'model'].some(n => p.name == n)) {
                                return;
                            }
                        }
                        if (item.parameter[p.name] != null) {
                            interfaceProps[p.name] = item.parameter[p.name];
                        }

                        if (p.name == 'sensorid' && item.num != null) {
                            interfaceProps[p.name] = item.parameter[p.name] + (parseInt(item.num) - 1);
                        }
                    })


                    interfaces[a.id] = {
                        "capabilities": deviceCapability,
                        "id": `${uuidNode}.${a.id}`,
                        "deviceMetaInterfaceId": a.id,
                        "properties": interfaceProps
                    }
                };
            };
            let linkTo = {}, linkSvgE = {};
            if (selectedNode.device.type == "s.iota") {
                linkTo = {
                    "shapeType": "s.a",
                    "ownerShapeType": "s.iota",
                    "ownerSvgId": `${selectedNode.device.id}`
                }
                linkSvgE = {
                    "x": selectedNode.device.svg.x ? selectedNode.device.svg.x + 79 : 0,
                    "y": selectedNode.device.svg.y ? selectedNode.device.svg.y + 25 : 0
                }
            } else if (selectedNode.device.type == "s.d") {
                linkTo = {
                    "directType": 2,
                    "iType": 1,
                    "ownerShapeType": "s.d",
                    "ownerSvgId": `${selectedNode.device.id}`,
                    "deviceMetaId": `${selectedNode.meta.id}`,
                    "interfaceMetaId": interfaceWithMeta.interfaceMetaId,
                    "deviceMetaInterfaceId": `${selectedNode.meta.interfaces.filter(i => i.interfaceMetaId == interfaceWithMeta.interfaceMetaId && i.directType == 2)[0].id}`,
                    "shapeType": "s.a",
                    "aType": "s.d.i",
                    "svgId": `${selectedNode.device.id}.${selectedNode.meta.interfaces.filter(i => i.interfaceMetaId == interfaceWithMeta.interfaceMetaId && i.directType == 2)[0].id}`
                }
                linkSvgE = {
                    "x": selectedNode.device.svg.x + 75,
                    "y": selectedNode.device.svg.y + 62.5
                }
            }
            devices.instances[uuidNode] = {
                "instance": {
                    "deviceMetaId": item.node.id,
                    "visibility": "public",
                    "name": deviceName,
                    "interfaces": interfaces,
                    "properties": item.parameter,
                },
                "type": "s.d",
                "svg": {
                    "isSelected": false,
                    "compX": 0,
                    "compY": 0,
                    "scaleX": 1,
                    "scaleY": 1,
                    "x": linkSvgE.x - 200 - 75,
                    "y": linkSvgE.y + 200 - 7.5,
                    "rotateAng": 0
                },
                "name": deviceName
            }
            devices.instances[uuidLink] = {
                "type": "s.l",
                "instance": {
                    "curve": {
                        "m": {
                            "x": linkSvgE.x - 200,
                            "y": linkSvgE.y + 200
                        },
                        "e": linkSvgE
                    },
                    "from": {
                        "directType": 1,
                        "iType": 1,
                        "ownerShapeType": "s.d",
                        "ownerSvgId": uuidNode,
                        "deviceMetaId": `${item.node.id}`,
                        "interfaceMetaId": interfaceWithMeta.interfaceMetaId,
                        "deviceMetaInterfaceId": `${item.node.interfaces.filter(s => s.interfaceMetaId == interfaceWithMeta.interfaceMetaId && s.directType == 1)[0].id}`,
                        "shapeType": "s.a",
                        "aType": "s.d.i",
                        "svgId": `${uuidNode}.${item.node.interfaces.filter(s => s.interfaceMetaId == interfaceWithMeta.interfaceMetaId && s.directType == 1)[0].id}`
                    },
                    "to": linkTo
                },
                "elementKey": uuidLink
            }
        })
        this.closeOptionModal();
        this.setState({ emitDataChange: true });
    }

    emitDataChange_ = () => {
        this.setState({ emitDataChange: true });
    }

    _getRightDevices = () => {
        const { deviceMetasWithFollow } = this.props;
        const { selectedNode } = this.state;
        if (selectedNode && selectedNode.type != "dimension" && selectedNode.type != "adddimension") {
            let down = [];
            if (selectedNode.device.type == "s.d") {
                down = selectedNode.meta.interfaces.filter(item => item.directType == 2);
            } else if (selectedNode.device.type == "s.iota") {
                down = [{
                    "interfaceMeta": {
                        "interfaceType": {
                            "desc": "串口 Over IP",
                            "id": 4,
                            "key": "soip",
                            "name": "SoIP"
                        }
                    }
                },
                {
                    "interfaceMeta": {
                        "interfaceType": {
                            "desc": "CLAA MSP Lora接入协议",
                            "id": 3,
                            "key": "claa_msp",
                            "name": "CLAA_MSP"
                        }
                    }
                },
                {
                    "interfaceMeta": {
                        "interfaceType": {
                            "desc": "HTTP",
                            "id": 5,
                            "key": "http",
                            "name": "HTTP"
                        }
                    }
                },
                {
                    "interfaceMeta": {
                        "interfaceType": {
                            "desc": "HTTP_SERVER",
                            "id": 11,
                            "key": "http_server",
                            "name": "HTTP_SERVER"
                        }
                    }
                },
                {
                    "interfaceMeta": {
                        "interfaceType": {
                            "desc": "RAW_TCP_CLIENT",
                            "id": 10,
                            "key": "raw_tcp_client",
                            "name": "RAW_TCP_CLIENT"
                        }
                    }
                },
                {
                    "interfaceMeta": {
                        "interfaceType": {
                            id: 12,
                            name: "IOTA_MQTT",
                            key: "IOTA_MQTT",
                            desc: "平台标准MQTT"
                        }
                    }
                },
                {
                    "interfaceMeta": {
                        "interfaceType": {
                            id: 6,
                            name: "MQTT",
                            key: "MQTT",
                            desc: "MQTT"
                        }
                    }
                },
                ]
            }
            if (down.length) {
                let rightDevices = deviceMetasWithFollow.devices.filter(item => {
                    let interfaces = item.interfaces;
                    let up = interfaces.filter(s => s.directType == 1);
                    if (selectedNode.device.type == "s.iota") {
                        return up.length && down.some(d => up.some(u => d.interfaceMeta.interfaceType.id == u.interfaceMeta.interfaceTypeId));
                    }
                    return up.length && down.some(d => up.some(u => d.interfaceMetaId == u.interfaceMetaId));
                })
                if (rightDevices.length) {
                    return rightDevices
                } else {
                    return;
                }
            } else {
                return;
            }
        }
    }

    _handleSaveDimension = (values) => {
        const { dispatch, struct } = this.props;
        //this.setState({ showAddDimensionModal: false });
        Message.info('数据已变更，请注意保存本次编辑!');
        dispatch(AddDimension(struct.iotaThingId, values))
            .then(res => {
                this.setState({ showAddDimensionModal: false });
                dispatch(getDimensionsList(struct.iotaThingId)).then(action => {
                    if (!action.payload.dimensions) return;

                    const dimensions = action.payload.dimensions;
                    const devices = this.state.devices;
                    const newDimension = values;
                    let targetDimension = dimensions.dimensions.filter(dimension => dimension.name == newDimension.name.toString());
                    let targetDimensionId = targetDimension[0].scheme ? targetDimension[0].scheme.id : targetDimension[0].id;

                    const newInstances = Object.assign({}, devices.instances, {
                        [targetDimensionId]: {
                            "instance": {
                                "beginTime": values.beginTime,
                                "capabilityNotifyMode": "1",
                                "dimensionId": targetDimensionId,
                                "endTime": values.endTime,
                                "id": targetDimensionId,
                                "interval": values.interval_1,
                                "name": newDimension.name,
                                "mode": values.mode,
                                "notifyMode": values.notifyMode,
                                "unit": values.unit
                            },
                            type: "e.d"
                        }
                    })

                    const newDimensions = Object.assign({}, this.state.dimensions, {
                        [targetDimensionId]: {
                            "instance": {
                                "beginTime": values.beginTime,
                                "capabilityNotifyMode": "1",
                                "dimensionId": targetDimensionId,
                                "endTime": values.endTime,
                                "id": targetDimensionId,
                                "interval": values.interval_1,
                                "name": newDimension.name,
                                "mode": values.mode,
                                "notifyMode": values.notifyMode,
                                "unit": values.unit
                            },
                            type: "e.d"
                        }
                    });

                    this.setState({
                        devices: Object.assign({}, devices, { instances: newInstances }),
                        dimensions: newDimensions
                    });
                })
            })
    }

    _deleteDimension = (info) => {
        const { dispatch, struct } = this.props;
        const { devices } = this.state;
        dispatch(deleteDimension(struct.iotaThingId, info.dimension.scheme ? info.dimension.scheme.id : info.dimension.id)).
            then(_ => { this.closeDimensionModal(); dispatch(getDimensionsList(struct.iotaThingId)) }).
            then(_ => {
                let deviceKeys = Object.keys(devices.instances);
                if (deviceKeys.length) {
                    deviceKeys.forEach(device => {
                        let deviceObject = devices.instances[device];
                        if (deviceObject.type == "s.d" && Object.keys(deviceObject.instance.interfaces).length) {
                            let interfacesKeys = Object.keys(deviceObject.instance.interfaces);
                            interfacesKeys.forEach(b => {
                                let relativeCap = deviceObject.instance.interfaces[b].capabilities,
                                    relativeCapKeys = Object.keys(relativeCap);
                                if (relativeCapKeys.length) {
                                    relativeCapKeys.forEach(s => {
                                        if (Object.keys(relativeCap[s]).length > 0 && Object.keys(relativeCap[s].dimension).length > 0 && relativeCap[s].dimension.dimensionId == (info.dimension.scheme ? info.dimension.scheme.id : info.dimension.id)) {
                                            relativeCap[s].dimension.dimensionId = null;
                                        }
                                    })
                                }
                            })
                        }
                    })
                    let dimensionIdDeploy = info.dimension.scheme ? info.dimension.scheme.id : info.dimension.id;
                    delete devices.instances[dimensionIdDeploy];
                    delete this.state.dimensions[dimensionIdDeploy];
                }
                //this.closeDimensionModal();                
            })
    }

    _handlePostcommand = (command, param) => {
        const { dispatch, struct, user } = this.props;
        const { selectedNode, devices } = this.state;
        let dimensionId = null, dimCapId = null, dtuInfo = null, dtuId = null;
        try {
            let collectionOps = selectedNode.meta.capabilities.filter(cap => cap.id == command);
            let SoIPInterfaceMeta = selectedNode.meta.interfaces.filter(face => face.directType == 1);
            if (SoIPInterfaceMeta.length) {
                dtuInfo = selectedNode.device.instance.interfaces[SoIPInterfaceMeta[0].id];
                if (dtuInfo && dtuInfo.properties && dtuInfo.properties.id != undefined && dtuInfo.properties.id != null) {
                    dtuId = dtuInfo.properties.id;
                } else {
                    dtuId = this._selectParentNodeDtuId(selectedNode, devices)
                }
            }
            const interfaceOps = selectedNode.meta.interfaces.filter(i => i.directType == 1).map(i => i.id);
            if (collectionOps.length) {
                Object.keys(selectedNode.device.instance.interfaces).filter(i => interfaceOps.some(f => f == i)).forEach(interfaceOption => {
                    let capabilityKeys = Object.keys(selectedNode.device.instance.interfaces[interfaceOption].capabilities);
                    if (capabilityKeys.includes(collectionOps[0].id)) {
                        let targetDimension = selectedNode.device.instance.interfaces[interfaceOption].capabilities[collectionOps[0].id].dimension;
                        if (targetDimension) {
                            dimensionId = targetDimension.dimensionId;
                            dimCapId = targetDimension.id;
                        }
                    }
                })
            }
        } catch (error) {
            console.warn(error)
        }
        let values = {
            "thingId": struct.iotaThingId, "deviceId": selectedNode.device.id, "dimensionId": dimensionId,
            "dimCapId": dimCapId, timeout: 60000 * 5, param: param,
            "userId": user.id,
            "dtuId": dtuId,
            "deviceId": selectedNode.device.id
        }
        dispatch(invokeCapability(values))
    }

    _selectParentNodeDtuId = (node, devices) => {
        let deep = 0, dtuId = null;
        let structInfo = Immutable.fromJS(devices).toJS();
        let deviceIds = Object.keys(structInfo.instances);
        for (let i = 0; i < deviceIds.length; i++) {
            if (structInfo.instances[deviceIds[i]].type == "s.l") {
                let temp = structInfo.instances[deviceIds[i]]
                let b = Object.assign({}, { "from": temp.instance.from.ownerSvgId, "to": temp.instance.to.ownerSvgId })
                if (b.from == node.device.id) {
                    let parentNode = Object.assign({}, devices.instances[b.to], { id: b.to });
                    deep++;
                    if (deep > 1) {
                        return dtuId;
                    } else if (parentNode.type == "s.iota") {
                        return dtuId;
                    }
                    if (parentNode.name == "DTU") {
                        dtuId = parentNode && parentNode.instance && parentNode.instance.properties && parentNode.instance.properties.portID ? parentNode.instance.properties.portID : '';
                    }
                }
            }
        }
        return dtuId;
    }

    _handleGetDebugHistory = (startTime, endTime) => {
        const { dispatch } = this.props;
        const { selectedNode } = this.state;
        let deviceId = selectedNode.device.id;
        let values = {
            "startTime": moment(startTime).format(),
            "endTime": moment(endTime).format()
        }
        dispatch(getDebugHistory(deviceId, values))
    }

    _deleteEquipment = (info) => {
        const { devices } = this.state;
        let nodes = [], links = [], targets = [];
        let device = devices.instances;
        let ids = Object.keys(device);
        for (let i = 0; i < ids.length; i++) {
            if (device[ids[i]].type == "s.l") {
                links.push(device[ids[i]]);
            } else if (device[ids[i]].type == "s.d" || device[ids[i]].type == "s.iota") {
                nodes.push(Object.assign({}, device[ids[i]], { "elementKey": ids[i] }));
            }
        }

        function deleteNodes(toTarget) {
            if (links.some(item => {
                return item.instance.to.ownerSvgId == toTarget
            })) {
                links.forEach((item, index) => {
                    if (item.instance.to.ownerSvgId == toTarget) {
                        let from = item.instance.from.ownerSvgId;
                        deleteNodes(from)
                    }
                })
            } else {
                links.forEach((item, index) => {
                    if (item.instance.from.ownerSvgId == toTarget && toTarget != info.device.id) {
                        let to = item.instance.to.ownerSvgId;
                        let a = Object.assign({}, item);
                        targets.push(a);
                        links.splice(index, 1);
                        nodes.forEach((item, index) => {
                            if (item.elementKey == toTarget) {
                                let b = Object.assign({}, item);
                                targets.push(b);
                                nodes.splice(index, 1);
                            }
                        })

                        deleteNodes(to)
                    } else if (item.instance.from.ownerSvgId == toTarget && toTarget == info.device.id) {
                        let a = Object.assign({}, item);
                        targets.push(a);
                        links.splice(index, 1);
                        nodes.forEach((item, index) => {
                            if (item.elementKey == toTarget) {
                                let b = Object.assign({}, item);
                                targets.push(b);
                                nodes.splice(index, 1);
                            }
                        })
                    }
                })
            }
        }
        deleteNodes(info.device.id);

        for (let j = 0; j < targets.length; j++) {
            let targetElement = targets[j].elementKey;
            delete devices.instances[targetElement];
        }

        this.setState({ emitDataChange: true });
        this.closeOptionModal()
    }

    _deleteEquipments = (EquipmentsKeys) => {
        for (let i = 0; i < EquipmentsKeys.length; i++) {
            this._deleteEquipmentsSetNode(EquipmentsKeys[i]);
        }
    }

    _deleteEquipmentsSetNode = (targetId) => {
        const { dispatch, deviceMetasDeployed, deviceMetasWithFollow } = this.props;
        const { devices, isEdit } = this.state;
        if (targetId) {
            let selectNode = Object.assign({}, devices.instances[targetId], { id: targetId });
            let deviceMetaId = selectNode.instance.deviceMetaId;
            let selectedDeviceMetaArr = [] //deviceMetasDeployed.devices.filter(s => s.id == deviceMetaId);
            let selectedDeviceMeta;
            if (selectedDeviceMetaArr.length == 0) {
                selectedDeviceMeta = deviceMetasWithFollow && deviceMetasWithFollow.devices ?
                    deviceMetasWithFollow.devices.filter(s => s.id == deviceMetaId)[0]
                    : [];
            } else {
                selectedDeviceMeta = selectedDeviceMetaArr[0]
            }
            if (selectNode.type != "s.iota" || isEdit) {
                // parentNode
                const selectedParentNode = Object.keys(devices.instances).reduce((p, k) => {
                    const instance = devices.instances[k];
                    if (instance.type == 's.l' && instance.instance.from.ownerSvgId == targetId) {
                        p = Object.assign({}, devices.instances[instance.instance.to.ownerSvgId], { id: instance.instance.to.ownerSvgId });;
                    }

                    return p;
                }, null);

                const selectedParentNodeMetaId = selectedParentNode ? selectedParentNode.instance.deviceMetaId : null;
                const selectedParentNodeMeta = selectedParentNodeMetaId ? (deviceMetasWithFollow || deviceMetasDeployed).devices.filter(s => s.id == selectedParentNodeMetaId)[0] : null;
                let NodeInfo = { "type": "equipment", "device": selectNode, "meta": selectedDeviceMeta };
                this._deleteEquipment(NodeInfo);
            } else {
                this.setState({ showBatchRemove: false, selectedNode: null });
            }
        }
        this.setState({ showBatchRemove: false });
    }

    _finishDataChange = () => {
        this.setState({ emitDataChange: false })
    }

    _showAddEquipmentModal = () => {
        const { dispatch, deviceMetasWithFollow } = this.props;
        if (!deviceMetasWithFollow) {
            dispatch(getDeviceMeta()).then(_ => {
                this.setState({ showAddEquipmentModal: true });
            });
        } else {
            this.setState({ showAddEquipmentModal: true });
        }
    }

    getUpLinkInterface(meta, parentNode) {
        let up = meta.interfaces.filter(i => i.directType == 1);
        if (parentNode.meta && parentNode.meta.interfaces) {
            up = up.filter(i => parentNode.meta.interfaces.some(pi => pi.interfaceMetaId == i.interfaceMetaId && pi.directType == 2))
        }

        if (up.length > 0) {
            return up[0];
        }

        return false;
    }

    _handleOptionsSave = (info, values) => {
        
        //配置策略信息调整/设备信息调整
        const { devices } = this.state;
        const { dimensions } = this.props;
        if (info.type != "equipment") {
            let keys = Object.keys(devices.instances);
            let targetDimensionId = info.dimension.scheme ? info.dimension.scheme.id : info.dimension.id;

            if (keys.includes(targetDimensionId)) {
                values.name = values.name;
                devices.instances[targetDimensionId].instance = values;
            } else {
                devices.instances[targetDimensionId] = {
                    "instance": {},
                    type: "e.d"
                };
                values.name = values.name;
                devices.instances[targetDimensionId].instance = values;
            }
            Message.info('数据已变更，请注意保存本次编辑!');
            this.closeDimensionModal();
        } else if (info.type == "equipment") {
            let keys = Object.keys(devices.instances);
            let interfaceWithMeta = this.getUpLinkInterface(info.meta, this.state.selectedParentNode),
                capabilityWithMeta = info.meta.capabilities.filter(c => c.interfaces.some(i => i.deviceMetaInterfaceId == interfaceWithMeta.id) && c.capabilityCategoryId == 3),
                uuid = this.guid();
            if (keys.includes(info.device.id)) {
                let devicePoint = devices.instances[info.device.id],
                    deviceInstance = devicePoint.instance,
                    deviceProps = deviceInstance.properties;

                if (values) {
                    let valueKeys = Object.keys(values);
                    deviceInstance.name = values.name;
                    valueKeys.forEach(prop => {
                        deviceProps[prop] = values[prop];
                    })
                    if (interfaceWithMeta && capabilityWithMeta.length) {
                        let interfaceIdWithMeta = interfaceWithMeta.id,
                            capabilityIdWithMeta = capabilityWithMeta[0].id;
                        let capabilityDimension = deviceInstance.interfaces[interfaceIdWithMeta].capabilities[capabilityIdWithMeta].dimension;
                        let capabilityProps = deviceInstance.interfaces[interfaceIdWithMeta].capabilities[capabilityIdWithMeta].properties;
                       
                        if (capabilityDimension && Object.keys(capabilityDimension).length) {
                            let dimensionKeys = Object.keys(capabilityDimension);
                            dimensionKeys.forEach(dimensionProp => {
                                //interval 会重复要特殊处理
                                if(dimensionProp == 'interval'){
                                    capabilityDimension[dimensionProp] = values.dimensionInterval
                                }else{
                                    dimensionProp != "id" ? capabilityDimension[dimensionProp] = values[dimensionProp] ? values[dimensionProp] : null : capabilityDimension["id"] = capabilityDimension.id;      
                                } 
                            })
                            capabilityDimension["unit"] = "second";
                        } else if (values.repeats && values.dimensionInterval && values.timeout && values.dimensionId) {
                           
                            deviceInstance.interfaces[interfaceIdWithMeta].capabilities[capabilityIdWithMeta]["dimension"] = {
                                "id": uuid,
                                "dimensionId": values.dimensionId,
                                "interval": values.dimensionInterval,
                                "repeats": values.repeats,
                                "timeout": values.timeout,
                                "unit": "second"
                            }
                        }

                        if (capabilityProps) {
                            let propsKeys = Object.keys(capabilityProps);
                            propsKeys.forEach(capabilityProp => {
                                capabilityProps[capabilityProp] = values[capabilityProp];
                            })
                        }

                        if (values['up_formula']) {
                            deviceInstance.interfaces[interfaceIdWithMeta].capabilities[capabilityIdWithMeta]["formula"] = {
                                id: this.guid(),
                                formulaId: values['up_formula'],
                                properties: Object.keys(values).filter(k => k.startsWith('formula-p-'))
                                    .reduce((p, key) => {
                                        p[key.replace('formula-p-', '')] = values[key];

                                        return p;
                                    }, {})
                            }
                        }
                    }
                    if (info.meta.filteredResource && ["gateway", 'dau.gateway', 'tcp.dtu', 'sensor'].some(t => t == JSON.parse(info.meta.filteredResource.properties).deviceType) && Object.keys(values).includes('portID')) {
                        let SoIPInterfaceMeta = info.meta.interfaces.filter(face => face.directType == 1);
                        if (SoIPInterfaceMeta.length) {
                            let deviceInterface = deviceInstance.interfaces[SoIPInterfaceMeta[0].id];
                            deviceInterface.properties.id = values.portID;
                        }
                    }


                    let deviceInterface = deviceInstance.interfaces[interfaceWithMeta.id];
                    interfaceWithMeta.interfaceMeta.properties.forEach(p => {
                        if (interfaceWithMeta.interfaceMeta.interfaceTypeId == 4) {
                            if (['id', 'port', 'vendor', 'escape', 'protocol', 'escapegw', 'model'].some(n => p.name == n)) {
                                return;
                            }
                        }
                        deviceInterface.properties[p.name] = values[p.name];
                    });


                    Message.info('数据已变更，请注意保存本次编辑!');
                    this.setState({ emitDataChange: true });
                    this.closeOptionModal();
                }
            }
        }
    }

    _handleCancelAddDimension = () => {
        this.setState({ showAddDimensionModal: false })
    }

    _showAddDimensionModal = () => {
        this.setState({ showAddDimensionModal: true, showOptionModal: false, isClAdd: true, clTitle: '添加采集策略', selectedNode: { "type": "adddimension", "name": '', "dimension": { sheme: null } } })
    }

    _renderDimensions = () => {
        const { dimensions } = this.props;
        return dimensions.dimensions.map(item => {
            return (
                <Item key={item.id}>
                    <a rel="noopener noreferrer">{item.name}</a>
                </Item>
            )
        });
    }

    _batchRemove = () => {
        this.setState({ showBatchRemove: true, clTitle: '批量删除' })
    }

    _handleCancelBatchRemove = () => {
        this.setState({ showBatchRemove: false });
    }

    _handleOkBatchRemove = (checkeds) => {
        this._handleCancelBatchRemove();
    }

    _debugHistory = () => {
        this._handleGetDebugHistory(moment().startOf('day'), moment().endOf('day'));
        this.setState({ showBugHistory: true, clTitle: '下发历史记录' });
    }

    _handleCancelBugHistory = () => {
        this.setState({ showBugHistory: false });
    }

    _clNullMessage = () => {
        const { dimensions } = this.props;
        if (dimensions && dimensions.dimensions.length <= 0) {
            Message.info('采集策略为空，请在右上角【+ 采集策略】添加至少一种采集策略，再进行相关设备的添加配置!');
        }
    }
    handleNodeEnter = (node) => {
        const { dimensions } = this.props;
        const { isEdit } = this.state;
        var result = (dimensions.dimensions.length <= 0 ? true : false) && isEdit;
        return result;
    }
    onCollapse = (model, collapse) => {
        if (collapse) {
            this.setState({
                collapsed: this.state.collapsed.concat([model.id]),
                expanded: this.state.expanded.filter(c => c != model.id)
            });
        } else {
            this.setState({
                collapsed: this.state.collapsed.filter(c => c != model.id),
                expanded: this.state.expanded.concat([model.id])
            });
        }
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        // dispatch({ type: CLEAR_ZUWANG_INFO });
        // dispatch({ type: CLEAR_SENSORS_LAST_DATA })
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        const { devices, deviceMetasDeployed, deviceMetasWithFollow } = nextProps;
        if ((deviceMetasWithFollow && deviceMetasWithFollow.devices && deviceMetasWithFollow != this.props.deviceMetasWithFollow) ||
            (deviceMetasDeployed && deviceMetasDeployed.devices && deviceMetasDeployed != this.props.deviceMetasDeployed)) {
            const deviceMetas = deviceMetasWithFollow && deviceMetasWithFollow.devices ? deviceMetasWithFollow.devices : deviceMetasDeployed.devices;
            let httpServerInterfaceIds = [];
            for (let d of deviceMetas) {
                if (d.interfaces && d.interfaces.length) {
                    for (let f of d.interfaces) {
                        if (f.directType == 1 && f.interfaceMeta && f.interfaceMeta.name == "HTTP_SERVER") {
                            httpServerInterfaceIds.push(f.id)
                        }
                    }
                }
            }
            this.setState({
                httpServerInterfaceIds: httpServerInterfaceIds
            })
        }
        if (devices && deviceMetasWithFollow && deviceMetasWithFollow.devices &&
            (devices != this.props.devices || deviceMetasWithFollow != this.props.deviceMetasWithFollow)) {
            let sensorsId = [];
            let sensorsDataItems = {};
            for (let id in devices.instances) {
                let instances = devices.instances[id];
                if (instances.type == 's.d' && instances.instance.properties.deviceType == 'sensor') {
                    let meta = deviceMetasWithFollow.devices.find(m => m.id == instances.instance.deviceMetaId);
                    sensorsDataItems[id] = {
                        items: {},
                        deviceName: instances.name,
                    }
                    if (meta) {
                        sensorsDataItems[id].items = meta.capabilities[0].properties.reduce((p, n) => {
                            if (n.category == 'Output') {
                                p[n.name] = { name: n.showName, unit: n.unit }
                            }
                            return p;
                        }, {});
                    }
                    sensorsId.push(id);
                }
            }
            this.setState({
                sensorsId: sensorsId,
                sensorsDataItems: sensorsDataItems,
            });
        }
        if (devices != this.props.devices) {
            if (devices && devices.instances) {
                const newInstances = Object.assign({}, nextProps.devices.instances, this.state.dimensions);
                this.setState({ devices: Object.assign({}, nextProps.devices, { "instances": newInstances }) });
            } else {
                if (!this.state.devices) {
                    let data = { "instances": {} };
                    let uuidNode = this.guid();
                    data.instances[uuidNode] = {
                        "instance": {},
                        "svg": {
                            "compX": 0,
                            "compY": 0,
                            "isSelected": false,
                            "rotateAng": 0,
                            "scaleX": 1,
                            "scaleY": 1,
                            "x": 2498,
                            "y": 1083
                        },
                        "type": "s.iota",
                    };
                    data.settings = {
                        "grid": {
                            "step": 20
                        },
                        "height": 3072,
                        "padding": 40,
                        "scale": 10,
                        "scrollLeft": 2047,
                        "scrollTop": 1082,
                        "width": 5120
                    }
                    this.setState({ devices: data });
                }
            }
        }
    }

    _relaySave = (calcResult) => {
        Object.keys(this.state.devices.instances)
            .forEach(deviceId => {
                if (calcResult[deviceId]) {
                    this.state.devices.instances[deviceId].instance.properties.wakeupdelay = calcResult[deviceId];
                }
            });
        this.setState({ emitChange: true });
        Message.info('自动计算延迟已成功设置，请注意保存本次编辑。');
    }

    showSensorDataModal = () => {
        this.setState({
            showSensorDataModal: true
        })
    }

    hideSensorDataModal = () => {
        this.setState({
            showSensorDataModal: false
        })
    }

    resetFoldAllG6ToCenter = () => {
        this.setState({
            foldAllG6ToCenter: false
        })
    }

    changeG6TreeDirection = () => {
        const { g6TreeDirection } = this.state;
        this.setState({
            g6TreeDirection: g6TreeDirection == 'TB' ? 'LR' : 'TB',
            showOptionModal: false
        })
    }

    render() {
        const { struct, deviceMetasWithFollow, deviceMetasDeployed, dimensions, clientHeight,
            responsedInvoke, isRequesting, isInvokeRequesting, dispatch, invokeCapability, responseDebugHistory } = this.props;
        const { devices, showOptionModal, selectedNode, selectedParentNode, isEdit, emitDataChange, showAddDimensionModal, showAddEquipmentModal,
            clientWidth, clTitle, showSensorDataModal, sensorsId, sensorsDataItems, foldAllG6ToCenter, targetNode, g6TreeDirection,
            httpServerInterfaceIds, showBatchRemove, showBugHistory } = this.state;
        const containerHeight = clientHeight - 12 * 2 - 156;
        if (this.props.children) {
            return this.props.children
        }
        return (
            <Spin spinning={isRequesting}>
                {
                    struct && devices && dimensions ?
                    
                        <div id="flag">
                            {
                                !isEdit ?
                                    <Button type='primary' disabled={!Func.judgeRights(ModifyEquipmentNetworking)} onClick={this.editZuwang} style={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>编辑</Button>
                                    :
                                    <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
                                        <Button type='primary' style={{ marginRight: 12, marginBottom: 12 }} onClick={this.goBack} >返回</Button>
                                        <Button style={{ marginRight: 12, marginBottom: 12 }} onClick={this.goBack} >放弃本次编辑</Button>
                                        <Button style={{ marginBottom: 12 }} type="primary" onClick={this.saveChanges} >保存本次编辑</Button><br />
                                        <Dropdown overlay={(
                                            <Menu onClick={this._showDimension}>{this._renderDimensions()}</Menu>
                                        )}>
                                            <Button style={{ marginRight: 12 }} className="ant-dropdown-link" onClick={this._showAddDimensionModal}>
                                                {dimensions.dimensions.length > 0 ? null : <PlusOutlined />} 采集策略
                                            </Button>
                                        </Dropdown>
                                        <Button style={{ marginRight: 12 }} className="bacth-remove-link" onClick={this._batchRemove}> 批量删除 </Button>
                                    </div>
                            }
                            <div style={{ position: 'absolute', top: 10, left: isEdit ? 340 : 90, zIndex: 2 }}>
                                <Button style={{ marginRight: 12, marginBottom: 12, float: 'left' }} onClick={() => {
                                    this.setState({
                                        collapseAll: true, expandAll: false, collapsed: [], expanded: [],
                                        emitDataChange: true, foldAllG6ToCenter: true, targetNode: '',
                                    })
                                    document.getElementById('searchInput').value = ''
                                }} >折叠全部</Button>
                                <Button style={{ marginRight: 12, marginBottom: 12, float: 'left' }} onClick={() => {
                                    this.setState({
                                        expandAll: true, collapseAll: false, collapsed: [], expanded: [],
                                        emitDataChange: true, targetNode: '',
                                    })
                                    document.getElementById('searchInput').value = ''
                                }} >展开全部</Button>
                                {
                                    !isEdit ?
                                        <Button style={{ marginLeft: 12, marginBottom: 12, }} disabled={!sensorsId.length} onClick={this.showSensorDataModal}>传感器数据</Button> : ''
                                }
                                <Button style={{ marginLeft: 12, marginBottom: 12, }} onClick={this.changeG6TreeDirection}>组图方向</Button>
                                <span style={{ float: 'left' }}>
                                    <Input.Search style={{ width: 200 }}
                                        id="searchInput"
                                        onSearch={(v) => {
                                            this.setState({ targetNode: v });
                                            localStorage.setItem('inputSearching', true)
                                        }}
                                    />
                                </span>
                            </div>
                            <ZuwangMain
                                data={devices.instances}
                                collapseAll={this.state.collapseAll}
                                expandAll={this.state.expandAll}
                                collapsed={this.state.collapsed}
                                expanded={this.state.expanded}
                                onCollapse={this.onCollapse}
                                width={clientWidth}
                                height={containerHeight}
                                emitChange={emitDataChange}
                                emitDataChange_={this.emitDataChange_}
                                changeFinish={this._finishDataChange}
                                handelNodeClick={this._handelNodeClick}
                                targetNode={this.state.targetNode}
                                struct={this.props.struct}
                                isEdit={isEdit}
                                handleNodeEnter={this.handleNodeEnter}
                                foldAllG6ToCenter={foldAllG6ToCenter}
                                resetFoldAllG6ToCenter={this.resetFoldAllG6ToCenter}
                                g6TreeDirection={g6TreeDirection}
                            />
                            <Drawer
                                destroyOnClose
                                getContainer={document.getElementById('flag')}
                                style={{ position: 'absolute' }}
                                mask={false}
                                maskClosable={false}
                                visible={showOptionModal}
                                width={480}
                                onClose={this.closeOptionModal}
                                bodyStyle={{ padding: 8 }}
                            >
                                <EquipmentOption
                                    isEdit={isEdit}
                                    struct={struct}
                                    devices={devices}
                                    deviceMetas={deviceMetasWithFollow || deviceMetasDeployed}
                                    info={selectedNode}
                                    parentNode={selectedParentNode}
                                    dimensions={dimensions}
                                    handleSave={this._handleOptionsSave}
                                    showAddEquipmentModal={this._showAddEquipmentModal}
                                    deleteDimension={this._deleteDimension}
                                    deleteEquipment={this._deleteEquipment}
                                    handlePostcommand={this._handlePostcommand}
                                    responsedInvoke={responsedInvoke}
                                    isInvokeRequesting={isInvokeRequesting}
                                    height={containerHeight}
                                    diagResp={this.props.diagResp}
                                    diagHistoryResp={this.props.diagHistoryResp}
                                    isDiaging={this.props.isDiaging}
                                    clearDiagHistory={() => this.props.dispatch(clearIdauDiagnosisHistory())}
                                    fetchDiagRecord={(deviceId, start, end, isNow = true, limit) => this.props.dispatch(fetchIdauDiagnosis(deviceId, start, end, isNow, limit))}
                                    dispatch={dispatch}
                                    httpServerInterfaceIds={httpServerInterfaceIds}
                                    handleRelaySave={this._relaySave}
                                    cleanRequestInvoke={this.cleanRequestInvoke}
                                    invokeCapability={invokeCapability}
                                    debugHistory={this._debugHistory}
                                />
                            </Drawer>
                            <DimensionModal
                                visible={showAddDimensionModal}
                                title={clTitle}
                                dimensions={dimensions}
                                onCancel={this._handleCancelAddDimension}
                                handleOk={this._handleSaveDimension}
                                info={selectedNode}
                                handleSave={this._handleOptionsSave}
                                deleteDimension={this._deleteDimension}
                                height={80}
                            />
                            {
                                showAddEquipmentModal ?
                                    <EquipmentAddModal
                                        visible={showAddEquipmentModal}
                                        dimensions={dimensions}
                                        deviceMetas={this._getRightDevices()}
                                        existedEquipment={devices.instances}
                                        addEquipments={this._addEquipments}
                                        closeModal={this._closeAddEquipmentModal}
                                        parentNode={selectedNode}
                                        httpServerInterfaceIds={httpServerInterfaceIds}
                                    /> : ''
                            }

                            <SensorLastDataModal dispatch={dispatch} visible={showSensorDataModal} hideModal={this.hideSensorDataModal}
                                sensorsId={sensorsId} sensorsDataItems={sensorsDataItems} clientHeight={containerHeight}
                            />
                            <DebugHistoryModal visible={showBugHistory} info={selectedNode} title={clTitle} onCancel={this._handleCancelBugHistory}
                                handleGetDebugHistory={this._handleGetDebugHistory} responseDebugHistory={responseDebugHistory}
                            />
                            <BatchRemoveModal
                                data={devices.instances}
                                visible={showBatchRemove}
                                info={selectedNode}
                                title={clTitle}
                                onCancel={this._handleCancelBatchRemove}
                                handleRemove={this._handleOkBatchRemove}
                                deleteEquipments={this._deleteEquipments}
                            />
                        </div> :
                        <div>
                            <Button type='primary' onClick={this.editZuwang} style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, display: 'none' }}>编辑</Button>
                        </div>
                }
            </Spin>
        )
    }
}

function mapStateToProps(state) {
    const { global, singleStructState, deviceMeta, deviceMetaDeployed, deviceList, dimensionsList, invokeCapability, idauDiagnosis, auth, debugHistory } = state;

    return {
        user: auth.user,
        clientHeight: global.clientHeight,
        isRequesting: singleStructState.isRequesting || deviceMeta.isRequesting || deviceMetaDeployed.isRequesting || deviceList.isRequesting || dimensionsList.isRequesting,
        struct: singleStructState.data || {},
        devices: deviceList.data || [],
        deviceMetasWithFollow: deviceMeta.data || [],
        deviceMetasDeployed: deviceMetaDeployed.data || [],
        dimensions: dimensionsList.data || { dimensions: [], total: 0 },
        invokeCapability: invokeCapability,
        responsedInvoke: invokeCapability.data || {},
        isInvokeRequesting: invokeCapability.isRequesting,
        diagResp: idauDiagnosis.data || [],
        isDiaging: idauDiagnosis.isRequesting,
        // diagHistoryResp: idauDiagnosis.diagHistory,
        responseDebugHistory: debugHistory.data || [],
    }
}

export default connect(mapStateToProps)(Zuwang);