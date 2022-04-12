'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Row, Col, Button, Input, Select, Switch, InputNumber, Radio, Collapse, Tooltip, Checkbox, Tag } from 'antd';
import { sort, PinyinHelper } from '@peace/utils';
import Pinyin from '@peace/utils/lib/src/pinyin';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {
    checkRepeatIdHttpServerDevice, CHECK_REPEAT_ID_HTTPSERVER_DEVICE_SUCCESS, CHECK_REPEAT_ID_HTTPSERVER_DEVICE_ERROR,
    CHECK_REPEAT_ID_HTTPSERVER_DEVICE_REPEAT,
} from '../../actions/integrationInfo';
import { ApiTable } from '$utils';
import { Request } from '@peace/utils';
import Style from '../../style.css'

const pinyin = new Pinyin();
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const Panel = Collapse.Panel


const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 12 },
}
const Option = Select.Option;

const formItemOneLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 15 }
};
const formuleItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 }
};
const types = {
    1: {
        "name": "moduleId",
        "showName": "模块号递增"
    },
    2: {
        "name": "channelId",
        "showName": "通道号递增"
    }
}

const productTypes = {
    "DTU": "DTU",
    "gateway": "网关",
    "sensor": "传感器",
    "acqUnit": "采集单元",
    "dau.gateway": "分布式智能云采集网关",
    "dau.node": "分布式智能云采集节点",
    "tcp.dtu": '工作站'
}

class EquipmentAddModal extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.saving = false;
        this.state = {
            productNum: null,
            batchSelection: false,

            tmp1: null,
            tmp2: null,
            tmp3: null,
            tmp4: null,

            deviceType: null,
            factoryName: null,
            productName: null,
            selectedProduct: null,
            autoType: 1,
            autoTypes: [],
            validateStatus: "",
            help: "",
            validateStatusForChannel: "",
            helpForChannel: "",
            largeNumber: null,
            smallNumber: null,
            selectedFormulaId: null,

            panelState: false,
            showSenior: true,
            isPad: false
        }
    }

    _enableSelectStrategy(device, parentNode) {
        if (device.capabilities.length == 0) return false;
        const parentNodeCapabilities = parentNode.meta && parentNode.meta.capabilities && parentNode.meta.capabilities.length > 0 ? parentNode.meta.capabilities : null;
        if ((device.capabilities.some(c => c.capabilityCategoryId == 3)) && (!parentNodeCapabilities || !parentNodeCapabilities.some(c => c.capabilityCategoryId == 3))) {
            return true;
        }
        return false;
    }

    _renderDimensionType = () => {
        const { dimensions } = this.props;
        return dimensions.dimensions.map(item => {
            return (
                <Option key={item.id} value={item.id}>{item.name}</Option>
            )
        })
    }

    _handleChangeDimensionType = (value) => {
        const { dimensions } = this.props;
        let selectedDimension = dimensions.dimensions.filter(dimension => dimension.id == value)[0];
        if (selectedDimension && selectedDimension.scheme && selectedDimension.scheme.mode == "L") {
            this.setState({ "showSenior": false });
        } else {
            this.setState({ "showSenior": true });
        }
    }

    _handleChangeUpFormula = (value) => {
        this.setState({ selectedFormulaId: value });
    }

    _handleChangeProductType = (value) => {
        const { deviceMetas } = this.props;
        this.setState({ selectedProduct: value });
        let autoType = [];
        let device = deviceMetas.filter(s => s.model == value)[0];
        let a = device.filteredResource ? JSON.parse(device.filteredResource.properties).deviceType : null;
        this.setState({ deviceType: a, tmp4: [device.id] });
        this.formRef.current.setFieldsValue({
            deviceType: a,
            factoryName: device.vendorId,
            productName: device.name
        })

        const interfaceToRender = this.getInterfaceToRenderProp(device, this.props.parentNode);
        if (interfaceToRender) {
            interfaceToRender.interfaceMeta.properties.forEach(item => {
                if (item.name == "module") {
                    autoType.push(1)
                } else if (item.name == "channel") {
                    autoType.push(2)
                }
                let b = Object.assign([], autoType);
            })

            this.setState({ autoTypes: autoType });
            if (autoType.length == 2) {
                this.setState({ autoType: [1] });
            } else if (autoType.length == 1) {
                this.setState({ autoType: autoType })
            } else {
                this.setState({ autoType: [] })
            }
        }

        this.setState({ selectedFormulaId: null })
    }

    _renderProductType = () => {
        const { deviceMetas } = this.props;
        const { tmp1, tmp2, tmp3 } = this.state;
        if (deviceMetas) {
            
            let a = tmp1 ? new Set(tmp1) : new Set(deviceMetas.map(meta => { return meta.id }));
            let b = tmp2 ? new Set(tmp2) : new Set(deviceMetas.map(meta => { return meta.id }));
            let c = tmp3 ? new Set(tmp3) : new Set(deviceMetas.map(meta => { return meta.id }));
            let d = new Set([...a].filter(x => b.has(x)));

            let e = Array.from(new Set([...d].filter(x => c.has(x))))

            let s = [];
            const uniqueProducts = new Map();
            deviceMetas.forEach(item => {
                let productModel = item.model, productName = item.name, productKey = item.id;
                if (productModel && e.includes(item.id)) {
                    if(!uniqueProducts.has(productModel)){
                        uniqueProducts.set(productModel,1);
                        s.push(<Option key={productKey} value={productModel}>{productModel}</Option>);
                    }
                    
                }
            });
            return s
        } else {
            return;
        }
    }

    _handleChangeProductName = (value) => {
        const { deviceMetas } = this.props;
        this.setState({
            productName: value,
            batchSelection: false,
            selectedProduct: null,
            smallNumber: null,
            largeNumber: null,
            validateStatus: "",
            help: "",
            validateStatusForChannel: "",
            helpForChannel: "",
        });
        if (deviceMetas) {
            let deviceMeta = Object.assign([], deviceMetas);
            let s = [];
            deviceMeta.forEach(item => {
                let productName = item.name;
                if (productName == value) {
                    s.push(item);
                }
            });
            this.formRef.current.resetFields(["productType"]);
            this.setState({ tmp3: s.map(s => { return s.id }), tmp4: null });
        }
    }

    _renderProductName = () => {
        const { deviceMetas } = this.props;
        const { tmp1, tmp2, tmp3 } = this.state;
        if (deviceMetas) {
            let a = tmp1 ? new Set(tmp1) : new Set(deviceMetas.map(meta => { return meta.id }));
            let b = tmp2 ? new Set(tmp2) : new Set(deviceMetas.map(meta => { return meta.id }));
            let d = Array.from(new Set([...a].filter(x => b.has(x))));

            let s = [];
            const uniqueProducts = new Map();
            deviceMetas.forEach(item => {
                
                let productName = item.name;
                if (productName && d.includes(item.id)) {
                    if(!uniqueProducts.has(productName)){
                        uniqueProducts.set(productName,1);
                        s.push(<Option key={item.id} value={productName}>{productName}</Option>);
                    }
                    
                }
            });
            return s
        } else {
            return;
        }
    }

    _handleChangeFactory = (value) => {
        const { deviceMetas } = this.props;
        if (deviceMetas) {
            let deviceMeta = Object.assign([], deviceMetas);
            let s = [];
            deviceMeta.forEach(item => {
                let factory = item.vendor, factoryId = item.vendorId;
                if (factoryId == value) {
                    s.push(item);
                }
            });
            this.formRef.current.resetFields(["productName", "productType"]);
            this.setState({ tmp2: s.map(s => { return s.id }), tmp3: null, tmp4: null });
        }
    }

    _renderFactory = () => {
        const { deviceMetas } = this.props;
        const { tmp1 } = this.state;
        if (deviceMetas) {
            let a = tmp1 ? new Set(tmp1) : new Set(deviceMetas.map(meta => { return meta.id }));
            let b = Array.from(a);
            let s = [];
            let tempFactory = Object.assign([], deviceMetas).filter(factory => factory.vendor);
            let tempFactory2 = tempFactory.sort((a, b) => {
                let p = pinyin.getCamelChars(a.vendor.name).toLowerCase().substr(0, 1),
                    n = pinyin.getCamelChars(b.vendor.name).toLowerCase().substr(0, 1);
                if (p < n) {
                    return -1;
                } else if (p > n) {
                    return 1;
                }
                return 0;
            })
            const uniqueFactory = new Map();
            tempFactory2.forEach(item => {
                let factory = item.vendor, factoryId = item.vendorId;
                if (factory && factoryId && b.includes(item.id)) {
                     //需要去重
                     if(!uniqueFactory.has(factoryId)){
                        uniqueFactory.set(factoryId,1);
                        s.push(<Option key={factoryId} value={factoryId}>{factory.name}</Option>);
                     }
                    
                }
            });
            return s
        } else {
            return;
        }
    }

    _handleChangeDeviceType = (value) => {
        this.setState({ deviceType: value });
        const { deviceMetas } = this.props;
        if (deviceMetas) {
            let deviceMeta = Object.assign([], deviceMetas);
            let s = [];
            deviceMeta.forEach(item => {
                if (item.filteredResource) {
                    let deviceType = JSON.parse(item.filteredResource.properties);
                    if (deviceType.deviceType == value) {
                        s.push(item);
                    }
                }

            })
            this.formRef.current.resetFields(["factoryName", "productName", "productType"]);
            this.setState({ tmp1: s.map(s => { return s.id }), tmp2: null, tmp3: null, tmp4: null });
        }
    }

    _renderDeviceType = () => {
        const { deviceMetas } = this.props;
        if (deviceMetas) {
            let s = [];
            const uniqueTypes = new Map();
            deviceMetas.forEach(item => {
                if (item.filteredResource) {
                    let deviceType = JSON.parse(item.filteredResource.properties);

                    if (deviceType && Object.keys(deviceType).includes("deviceType")) {
                        //需要去重
                        if(!uniqueTypes.has(deviceType.deviceType)){
                            uniqueTypes.set(deviceType.deviceType,1);
                            s.push(
                                <Option key={`devicetype-${deviceType.deviceType}`} value={deviceType.deviceType}>
                                    {
                                        Object.keys(productTypes).includes(deviceType.deviceType) ?
                                            productTypes[deviceType.deviceType] : deviceType.deviceType
                                    }
                                </Option>
                            );
                        }
                        
                    }
                }
            });
            return s
        } else {
            return;
        }
    }

    handleOk = () => {
        const { addEquipments, closeModal, existedEquipment, deviceMetas, parentNode } = this.props;
        const { setFields, getFieldValue, validateFields } = this.formRef.current;
        const { batchSelection, autoType, smallNumber, largeNumber, selectedProduct, isPad } = this.state;
      
        this.saving = true;
        validateFields().then(values => {
            
            if (batchSelection && !smallNumber || batchSelection && !largeNumber) {
                this.setState({ validateStatus: "error", help: "编码范围必须输入完整", validateStatusForChannel: "error", helpForChannel: "编码范围必须输入完整" });
                return;
            }
            let s = []

            let equipmentKeys = Object.keys(existedEquipment),
                brotherNodes = {};
            for (let eq = 0; eq < equipmentKeys.length; eq++) {
                if (existedEquipment[equipmentKeys[eq]].type == 's.l' && existedEquipment[equipmentKeys[eq]].instance.to.ownerSvgId == parentNode.device.id) {
                    brotherNodes[equipmentKeys[eq]] = existedEquipment[existedEquipment[equipmentKeys[eq]].instance.from.ownerSvgId]
                }
            }

            if (batchSelection) {
                let moduleId = values.module;
                let channelId = values.channel;
                let keys = Object.keys(brotherNodes);
                let exists = [], exists2 = [], errorType = null;
                if (autoType == 2) {
                    for (let j = 0; j < keys.length; j++) {
                        const brotherMeta = deviceMetas.filter(m => m.id == brotherNodes[keys[j]].instance.deviceMetaId)[0];
                        if (brotherNodes[keys[j]].type != 's.d' || brotherMeta.model != this.state.selectedProduct) {
                            continue;
                        }

                        const interfaceToRender = this.getInterfaceToRenderProp(brotherMeta, this.props.parentNode);
                        const brotherInterface = brotherNodes[keys[j]].instance.interfaces[interfaceToRender.id];
                        const brotherModule = brotherInterface.properties.module || brotherNodes[keys[j]].instance.properties.module;
                        const brotherChannel = brotherInterface.properties.channel || brotherNodes[keys[j]].instance.properties.channel;

                        if (brotherModule == moduleId) {
                            if (brotherChannel) {
                                exists.push(brotherChannel);
                                errorType = "channel";
                            } else {
                                exists.push(moduleId);
                                errorType = "module";
                            }
                        }
                    }
                } else if (autoType == 1) {
                    for (let i = 0; i < keys.length; i++) {
                        const brotherMeta = deviceMetas.filter(m => m.id == brotherNodes[keys[i]].instance.deviceMetaId)[0];
                        if (brotherNodes[keys[i]].type != 's.d' || brotherMeta.model != this.state.selectedProduct) {
                            continue;
                        }

                        const interfaceToRender = this.getInterfaceToRenderProp(brotherMeta, this.props.parentNode);
                        const brotherInterface = brotherNodes[keys[i]].instance.interfaces[interfaceToRender.id];

                        const brotherModule = brotherInterface.properties.module || brotherNodes[keys[i]].instance.properties.module;
                        const brotherChannel = brotherInterface.properties.channel || brotherNodes[keys[i]].instance.properties.channel;

                        if (brotherChannel == channelId) {
                            if (brotherModule) {
                                exists.push(brotherModule);
                                errorType = "module";
                            } else {
                                exists.push(brotherChannel);
                                errorType = "channel";
                            }
                        }
                    }
                }

                let newData = [];
                if (smallNumber && largeNumber) {
                    let i = smallNumber;
                    while (i <= largeNumber) {
                        newData.push(i.toString());
                        i++;
                    }
                }
                if (autoType == 2 && errorType == "module") {
                    newData = [];
                    newData = exists.map(ex => `${ex}`);
                }
                let a = new Set(exists2);
                let b = new Set(newData);
                let c = new Set(exists);
                let intersectionSet = [];
                if (exists2.length) {
                    let intersectionSet1 = Array.from(new Set([...a].filter(x => b.has(x))));
                    let intersectionSet2 = Array.from(new Set([...c].filter(x => b.has(x))));
                    if (intersectionSet1.length) {
                        intersectionSet = Object.assign([], intersectionSet1);
                        errorType = "module";
                    } else {
                        intersectionSet = Object.assign([], intersectionSet2);
                        errorType = "channel";
                    }
                } else {
                    intersectionSet = Array.from(new Set([...c].filter(x => b.has(x))));
                }

                if (intersectionSet.length) {
                    if (autoType == 2) {
                        if (errorType == "module") {
                            this.setState({
                                validateStatus: "error",
                                help: `模块号${intersectionSet}已被使用`
                            })
                        } else if (errorType == "channel") {
                            this.setState({
                                validateStatusForChannel: "error",
                                helpForChannel: `通道号${intersectionSet}已被使用`
                            })
                        }

                        return;
                    } else if (autoType == 1) {
                        exists2.length ? errorType == "module" : errorType;
                        if (errorType == "module") {
                            this.setState({
                                validateStatus: "error",
                                help: `模块号${intersectionSet}已被使用`
                            })
                        } else if (errorType == "channel") {
                            this.setState({
                                validateStatusForChannel: "error",
                                helpForChannel: `模块号${intersectionSet}下通道号${channelId}已被使用`
                            })
                        }

                        return;
                    }
                }
            }
            if (!batchSelection) {
                let node = deviceMetas.filter(s => s.model == selectedProduct)[0];
                let parameter = values;
                s.push({ "num": null, "node": node, "parameter": parameter, "autoType": autoType });
            } else if (batchSelection) {
                let m = smallNumber;
                while (m <= largeNumber) {
                    let node = deviceMetas.filter(s => s.model == selectedProduct)[0];
                    let valueTmp = Object.assign({}, values);
                    if (autoType == 1) {
                        valueTmp.module = m.toString();
                    } else if (autoType == 2) {
                        valueTmp.channel = m.toString();
                    }
                    let parameter = valueTmp;
                    s.push({ "num": this.state.isPad ? this.pad(m, largeNumber.toString().length) : m, "node": node, "parameter": parameter, "autoType": autoType });
                    m++;
                }
            }
            
            addEquipments(s);
            
            closeModal();
        }).catch(errors => {
            if (Object.keys(errors.values).some(e => e != 'module' && e != 'channel')) {
                return;
            }

            if (!batchSelection && (errors.module || errors.channel)) {
                return;
            }
        })
    }

    handleCancel = () => {
        const { closeModal } = this.props;
        closeModal()
    }

    _largeNumChange = (value) => {
        const { getFieldValue, setFieldsValue } = this.formRef.current;
        this.setState({ largeNumber: value });
        if (this.state.smallNumber == null) {
            this.setState({
                validateStatus: "error",
                help: "编码范围必须输入完整"
            })
        } else {
            if (value <= this.state.smallNumber) {
                this.setState({
                    validateStatus: "error",
                    help: "编码范围顺序应该是从小到大"
                })
            } else {
                let itemName = getFieldValue('itemName');
                setFieldsValue({
                    itemName: itemName
                })
                this.setState({
                    validateStatus: "",
                    help: ""
                })
            }
        }
    }

    _smallNumChange = (value) => {
        const { getFieldValue, setFieldsValue } = this.formRef.current;
        this.setState({ smallNumber: value });
        if (this.state.largeNumber == null) {
            this.setState({
                validateStatus: "error",
                help: "编码范围必须输入完整"
            })
            return false;
        } else {
            if (this.state.largeNumber <= value) {
                this.setState({
                    validateStatus: "error",
                    help: "编码范围顺序应该是从小到大"
                })
                return false;
            } else {
                let itemName = getFieldValue('itemName');
                setFieldsValue({
                    itemName: itemName
                })
                this.setState({
                    validateStatus: "",
                    help: ""
                });
                return true;
            }
        }
    }

    _largeNumChangeForChannel = (value) => {
        const { getFieldValue, setFieldsValue } = this.formRef.current;
        this.setState({ largeNumber: value });
        if (this.state.smallNumber == null) {
            this.setState({
                validateStatusForChannel: "error",
                helpForChannel: `编码范围必须输入完整`
            })
        } else {
            if (value <= this.state.smallNumber) {
                this.setState({
                    validateStatusForChannel: "error",
                    helpForChannel: `编码范围顺序应该是从小到大`
                })
            } else {
                let itemName = getFieldValue('itemName');
                setFieldsValue({
                    itemName: itemName
                })
                this.setState({
                    validateStatusForChannel: "",
                    helpForChannel: ""
                })
            }
        }
    }

    _smallNumChangeForChannel = (value) => {
        const { getFieldValue, setFieldsValue } = this.formRef.current;
        this.setState({ smallNumber: value });
        if (this.state.largeNumber == null) {
            this.setState({
                validateStatusForChannel: "error",
                helpForChannel: `编码范围必须输入完整`
            })
            return false;
        } else {
            if (this.state.largeNumber <= value) {
                this.setState({
                    validateStatusForChannel: "error",
                    helpForChannel: `编码范围顺序应该是从小到大`
                })
                return false;
            } else {
                let itemName = getFieldValue('itemName');
                setFieldsValue({
                    itemName: itemName
                })
                this.setState({
                    validateStatusForChannel: "",
                    helpForChannel: ""
                });
                return true;
            }
        }
    }

    handleFactorChange = (value) => {
    }

    _onChangeProductNum = (e) => {
        this.setState({ productNum: e.target.value });
    }

    _onChangeAutoType = (e) => {
        
        this.setState({
            autoType: [e.target.value],
            smallNumber: null,
            largeNumber: null,
            validateStatus: "",
            help: "",
            validateStatusForChannel: "",
            helpForChannel: ""
        });
    }

    _renderAutoTypes = () => {
        const { autoTypes } = this.state;

        let m = [];
        for (let i = 1; i < 3; i++) {
            if (autoTypes.includes(i)) {
                m.push(<Radio key={i} value={i}>{types[i].showName}</Radio>)
            } else {
                m.push(<Radio key={i} disabled={true} value={i}>{types[i].showName}</Radio>)
            }
        }

        return m;
    }

    _selectBatch = (checked) => {
        this.setState({ batchSelection: checked });
        if (checked == false) {
            this.setState({ batchSelection: false, smallNumber: null, largeNumber: null, validateStatus: "", help: "", validateStatusForChannel: "", helpForChannel: "" })
        } else {
            this.formRef.current.setFieldsValue({ channel: '', module: '' });
        }
    }

    checkExistedName = async (rule, value) => {
        const { existedEquipment } = this.props;
        const { smallNumber, largeNumber } = this.state;

        if (value) {
            let keys = Object.keys(existedEquipment);
            let exists = [];
            for (let j = 0; j < keys.length; j++) {
                if (existedEquipment[keys[j]].type == 's.d') {
                    exists.push(existedEquipment[keys[j]].name)
                }
            }
            let newData = [];
            if (smallNumber && largeNumber) {
                let i = smallNumber;
                while (i <= largeNumber) {
                    newData.push(`${value}${i}`);
                    i++;
                }
            } else if (!smallNumber && !largeNumber) {
                newData.push(value);
            }

            let a = new Set(exists);
            let b = new Set(newData);
            let intersectionSet = Array.from(new Set([...a].filter(x => b.has(x))));
            if (intersectionSet.length) {
                return Promise.reject(`${intersectionSet}设备编码已被使用`);
            }
        }
        return Promise.resolve();

    }

    checkExists = async (rule, value) => {
        const { getFieldValue } = this.formRef.current;
        const { existedEquipment, parentNode, deviceMetas } = this.props;
        const { batchSelection } = this.state;
        if (!value || batchSelection) {

        } else {
            let moduleId = getFieldValue('module');
            let channelId = getFieldValue('channel');

            let equipmentKeys = Object.keys(existedEquipment),
                brotherNodes = {};
            for (let eq = 0; eq < equipmentKeys.length; eq++) {
                if (existedEquipment[equipmentKeys[eq]].type == 's.l' && existedEquipment[equipmentKeys[eq]].instance.to.ownerSvgId == parentNode.device.id) {
                    brotherNodes[equipmentKeys[eq]] = existedEquipment[existedEquipment[equipmentKeys[eq]].instance.from.ownerSvgId]
                }
            }

            let keys = Object.keys(brotherNodes);

            for (let equipmentKey = 0; equipmentKey < keys.length; equipmentKey++) {
                const brotherMeta = deviceMetas.filter(m => m.id == brotherNodes[keys[equipmentKey]].instance.deviceMetaId)[0];
                if (brotherNodes[keys[equipmentKey]].type != 's.d' || brotherMeta.model != this.state.selectedProduct) {
                    continue;
                }

                const interfaceToRender = this.getInterfaceToRenderProp(brotherMeta, this.props.parentNode);
                const brotherInterface = brotherNodes[keys[equipmentKey]].instance.interfaces[interfaceToRender.id];

                const brotherModule = brotherInterface.properties.module || brotherNodes[keys[equipmentKey]].instance.properties.module;
                const brotherChannel = brotherInterface.properties.channel || brotherNodes[keys[equipmentKey]].instance.properties.channel;

                if (moduleId && channelId) {
                    if (brotherChannel == channelId && brotherModule == moduleId) {
                        return Promise.reject(`模块号${moduleId}下通道号${channelId}已被使用`);
                    } else if (!brotherChannel && brotherModule == moduleId) {
                        return Promise.reject(`模块号${moduleId}已被使用`);
                    }
                } else if (moduleId && channelId == null) {
                    if (brotherModule == moduleId) {
                        return Promise.reject(`模块号${moduleId}已被使用`);
                    }
                } else if (moduleId == null && channelId) {
                    if (brotherChannel == channelId) {
                        return Promise.reject(`通道号${channelId}已被使用`);
                    }
                }
            }
        }

        return Promise.resolve();
    }

    checkDTUNum = async (rule, value) => {
        if (value) {
            const pattern = /^.{0,20}$/;
            if (!pattern.test(value)) {
                return Promise.reject('DTU编号不可超过20位');
            }
        }
        return Promise.resolve();
    };

    checkNumber = async (rule, value) => {
        if (value) {
            const pattern = /^[1-9]*[1-9][0-9]*$/;
            if (!pattern.test(value)) {
                return Promise.reject('请输入正整数');
            }
        }
        return Promise.resolve();
    };

    checkSim = async (rule, value) => {
        if (value) {
            const pattern = /^(\d{11}|\d{13}|\d{19})$/;
            if (!pattern.test(value)) {
                return Promise.reject('非法SIM卡号');
            }
        }
        return Promise.resolve();
    };

    checkHttpServerId = async (rule, value) => {
        const { dispatch, existedEquipment, httpServerInterfaceIds } = this.props;
        const { getFieldValue, setFields } = this.formRef.current;
        let id = null, port = null;
        if (rule.field == 'id') {
            id = value;
            port = getFieldValue('port');
            if (!this.saving) {
                setFields([{
                    'port': {
                        value: port,
                        errors: ''
                    }
                }])
            }
        } else {
            port = value;
            id = getFieldValue('id');
            if (!this.saving) {
                setFields([{
                    'id': {
                        value: id,
                        errors: ''
                    }
                }])
            }
        }
        this.saving = false;
      
        if (port && id) {
            let findRepeated = false;
            if (httpServerInterfaceIds.length) {
                for (let equId in existedEquipment) {
                    let equ = existedEquipment[equId];
                    let interface_ = equ.instance.interfaces
                    if (interface_) {
                        for (let iid in interface_) {
                            if (httpServerInterfaceIds.some(sid => sid == iid)) {
                                let properties = interface_[iid].properties;
                                if (properties && properties.id && properties.port &&
                                    properties.id == id && properties.port == port) {
                                        return Promise.reject('已添加id为' + id + '，port为' + port + '的设备');
                                }
                            }
                        }
                    }
                }
            }
          
            if (!findRepeated) {
                const url = ApiTable.checkRepeatIdHttpServerDevice.replace('{deviceHttpId}', id).replace('{port}', port);
                Request.get(url)
                    .then(res => {
                        return Promise.resolve();  
                    }
                    , error => {
                        if (error.status == 409) {
                            return Promise.reject('已有id为' + id + '，port为' + port + '的设备');
                        } else {
                            return Promise.reject('id查重失败，请重新填写或保存以查重');
                        }
                });
            }else{
                return Promise.resolve();
            }
        }else{
            return Promise.resolve();
        }   
        
        
    }

    checkDauNodeSensorId = async (rule, value) => {
        const { parentNode } = this.props;
        const { smallNumber, largeNumber } = this.state;

        const pfrp = parentNode.meta.filteredResource.properties;

        if (pfrp == null || JSON.parse(pfrp).deviceType != 'dau.node') {
            return;
        }

        let existsSensorId = [];

        const gradeParent = this.getParentNodes(parentNode.device.id);
        const parentNodes = this.getChildNodes(Object.keys(gradeParent)[0]);
        

        Object.keys(parentNodes).forEach(k => {
            const brotherNodes = this.getChildNodes(k);

            existsSensorId = existsSensorId.concat(Object.keys(brotherNodes).reduce((p, n) => {
                const bn = brotherNodes[n];
                Object.keys(bn.instance.interfaces).forEach(k => {
                    const sid = bn.instance.interfaces[k].properties.sensorid;
                    if (sid != null) {
                        p.push(sid);
                    }
                })

                return p;
            }, []));
        })

        if (smallNumber != null && largeNumber != null) {
            let usedNumber = [];

            for (let i = 0; i <= largeNumber - smallNumber; i++) {
                if (existsSensorId.filter(s => s == value + i).length > 0) {
                    usedNumber.push(value + i);
                }
            }

            if (usedNumber.length > 0) {
                return Promise.reject(usedNumber.join(',') + '已被使用, 建议检查配置后再重新批量添加');
                
            }
        }

        if (existsSensorId.filter(s => s == value).length > 0) {
            return Promise.reject(value + '已被使用, 建议使用:' + (Math.max.apply(Math, existsSensorId) + 1));
        }
        return Promise.resolve();
    }

    getChildNodes = (id) => {
        const { existedEquipment } = this.props;

        let equipmentKeys = Object.keys(existedEquipment),
            childNodes = {};
        for (let eq = 0; eq < equipmentKeys.length; eq++) {
            if (existedEquipment[equipmentKeys[eq]].type == 's.l' && existedEquipment[equipmentKeys[eq]].instance.to.ownerSvgId == id) {
                childNodes[existedEquipment[equipmentKeys[eq]].instance.from.ownerSvgId] = existedEquipment[existedEquipment[equipmentKeys[eq]].instance.from.ownerSvgId]
            }
        }

        return childNodes;
    }

    getParentNodes = (id) => {
        const { existedEquipment } = this.props;

        let equipmentKeys = Object.keys(existedEquipment),
            childNodes = {};
        for (let eq = 0; eq < equipmentKeys.length; eq++) {
            if (existedEquipment[equipmentKeys[eq]].type == 's.l' && existedEquipment[equipmentKeys[eq]].instance.from.ownerSvgId == id) {
                childNodes[existedEquipment[equipmentKeys[eq]].instance.to.ownerSvgId] = existedEquipment[existedEquipment[equipmentKeys[eq]].instance.to.ownerSvgId]
            }
        }

        return childNodes;
    }

    getInterfaceToRenderProp(device, parentNode) {
        let up = device.interfaces.filter(i => i.directType == 1);
        if (parentNode.meta && parentNode.meta.interfaces) {
            up = up.filter(i => parentNode.meta.interfaces.some(pi => pi.interfaceMetaId == i.interfaceMetaId && pi.directType == 2));
        }
        if (up.length > 0) {
            return up[0];
        }

        return false;
    }

    _checkPanel = (key) => {
        this.setState({ panelState: key ? true : false })
    }

    pad(num, n) {
        var len = num.toString().length;
        while (len < n) {
            num = "0" + num;
            len++;
        }
        return num;
    }

    padNumber = (smallNumber, largeNumber) => {
        if (!largeNumber || !this.state.isPad) return smallNumber

        return this.pad(smallNumber, largeNumber.toString().length);
    }

    _renderFormItems = () => {
        const { deviceMetas } = this.props;
        const { tmp4, deviceType, autoType, selectedProduct, batchSelection, smallNumber, largeNumber } = this.state;

        const DTURules = [{ required: true, message: '请输入DTU编号' }, { validator: this.checkDTUNum }];
        const SIMRulies = [{ required: true, message: '请输入11位、13位或19位SIM卡号' }, { validator: this.checkSim }]
        const HTTPSERVERIDRules = [{ required: true, message: '请输入' }, { validator: this.checkHttpServerId }]
        const DauNodeSensorIdRules = [{ required: true, message: '请输入' }, { validator: this.checkDauNodeSensorId }]

        if (tmp4 && tmp4.length && selectedProduct && deviceMetas) {
            let s = [], m = [], mAndc = [], capabilities = [], otherParameter = [];
            let device = deviceMetas.filter(s => s.model == selectedProduct);
            if (device.length) {
                let interfaceToRender = this.getInterfaceToRenderProp(device[0], this.props.parentNode);
                try {
                    device[0].properties = sort(device[0].properties, "showName");
                } catch (error) {

                }

                device[0].properties.forEach((item,index) => {
                    if (item.name != "deviceType" && item.name != "moduleId" && item.name != "channelId") {
                        const precisionProps = item.precision > 0 ? {
                            precision: item.precision
                        }: {};
                        let parameter = (
                            <FormItem
                                key={`extItem1-${index}`}
                                label={item.showName}
                                {...formItemOneLayout}
                                hasFeedback
                                name={`${item.name}`}
                                initialValue={`${item.defaultValue}`}
                                rules={
                                    item.name == "DTUID" ?
                                        DTURules : item.name == "SIMNum" ?
                                            SIMRulies : [
                                                { required: true, message: `请输入${item.showName}` }
                                            ]
                                }
                                valuePropName={item.propertyTypeId == 3 ? 'checked' : 'value'}
                            >
                                {
                                    item.enum ?
                                        <Select disabled={item.category != 'Variable'}>
                                            {item.enum.split(',').map(o => <Option key={o}>{o}</Option>)}
                                        </Select>
                                        : (
                                            item.propertyTypeId == 3 ?
                                                <Switch checkedChildren="是" unCheckedChildren="否" disabled={item.category != 'Variable'} />
                                                : (
                                                    item.propertyTypeId == 1 || (item.propertyTypeId == 2 && item.showName != '模量系数') ?
                                                        <InputNumber max={item.max || Infinity} min={item.min || -Infinity} {...precisionProps} disabled={item.category != 'Variable'} />
                                                        : <Input placeholder={item.showName} disabled={item.category != 'Variable'} />
                                                )
                                        )
                                }
                            </FormItem>
                        );
                        if (item.isOtherParameter) {
                            otherParameter.push(parameter)
                        } else {
                            s.push(parameter)
                        }
                    }
                })
                if (interfaceToRender) {
                    const hasModule = interfaceToRender.interfaceMeta.properties.some(p => p.name == 'module');
                    const hasChannel = interfaceToRender.interfaceMeta.properties.some(p => p.name == 'channel');
                    const hasId = interfaceToRender.interfaceMeta.properties.some(p => p.name == 'id');
                    const isSoipSensor = (interfaceToRender.interfaceMeta.interfaceTypeId == 4) && (JSON.parse(device[0].filteredResource.properties).deviceType == 'sensor');
                    if (hasId && interfaceToRender.interfaceMeta.interfaceTypeId != 11 && (isSoipSensor || ['gateway', 'dau.gateway', 'tcp.dtu'].some(t => t == JSON.parse(device[0].filteredResource.properties).deviceType))) {
                        s.push(
                            <FormItem
                                key={`extItem2`}
                                label="接口ID(DTU ID)"
                                {...formItemOneLayout}
                                hasFeedback
                                name={'portID'}
                                rules={[
                                    { required: true, message: '请输入接口ID(DTU ID)' },
                                    { pattern: /^[A-Za-z0-9]+$/, message: '只能输入字母数字' }
                                ]}
                            >
                                <Input placeholder="接口ID(DTU ID)" />
                               
                            </FormItem>
                        )
                    }

                    try {
                        interfaceToRender.interfaceMeta.properties = sort(interfaceToRender.interfaceMeta.properties, "showName")
                    } catch (error) {

                    }
                    
                    interfaceToRender.interfaceMeta.properties.forEach((item,index) => {
                        
                        if (interfaceToRender.interfaceMeta.interfaceTypeId == 4) {
                            if (['id', 'port', 'vendor', 'escape', 'protocol', 'escapegw', 'model'].some(n => item.name == n)) {
                                return;
                            }
                        }
                        if (item.category == 'Constant') {
                            let parameter = (
                                <FormItem
                                    key={`extItem3-${index}`}
                                    label={item.showName}
                                    {...formItemOneLayout}
                                    hasFeedback
                                    name={`${item.name}`}
                                    initialValue={`${item.defaultValue}`}
                                >
                                    <Input placeholder={item.showName} disabled={true} />
                                   
                                </FormItem>
                            );
                            if (item.isOtherParameter) {
                                otherParameter.push(parameter)
                            } else {
                                s.push(parameter)
                            }
                        }
                        if (item.category == 'Variable' && item.name != "module" && item.name != "channel") {
                            const precisionProps = item.precision > 0 ? {
                                precision: item.precision
                            }: {};
                            let parameter = (
                                <FormItem
                                    key={`extItem4-${index}`}
                                    label={item.showName + (item.unit ? '(' + item.unit + ')' : '')}
                                    {...formItemOneLayout}
                                    hasFeedback
                                    name={item.name}
                                    rules={(item.name == "id" || item.name == "port") && interfaceToRender && interfaceToRender.interfaceMeta && interfaceToRender.interfaceMeta.name == "HTTP_SERVER" ?
                                        HTTPSERVERIDRules : ((item.name == 'sensorid') ?
                                            DauNodeSensorIdRules : [
                                                { required: item.required, message: '请输入' + item.showName },
                                            ])
                                    }
                                    initialValue={item.defaultValue || ''}
                                    valuePropName={item.propertyTypeId == 3 ? 'checked' : 'value'}
                                >
                                    {
                                        item.enum ?
                                            <Select>
                                                {item.enum.split(',').map(o => <Option key={o}>{o}</Option>)}
                                            </Select>
                                            : (
                                                item.propertyTypeId == 3 ?
                                                    <Switch checkedChildren="是" unCheckedChildren="否" />
                                                    : (
                                                        item.propertyTypeId == 1 || (item.propertyTypeId == 2 && item.showName != '模量系数') ?
                                                            <InputNumber max={item.max || Infinity} min={item.min || -Infinity} {...precisionProps} />
                                                            : <Input placeholder={item.showName} />
                                                    )
                                            )
                                    }
                                  
                                </FormItem>
                            )
                            if (item.isOtherParameter) {
                                otherParameter.push(parameter)
                            } else {
                                s.push(parameter)
                            }
                        } else if (item.name == "module" || item.name == "channel") {
                            let parameters = [];
                            parameters.push(
                                <FormItem
                                    key={`extItem5-${index}`}
                                    label="模块号"
                                    {...formItemOneLayout}
                                    style={batchSelection && autoType[0] == 1 && item.name == "module" ? {} : { display: "none" }}
                                    validateStatus={this.state.validateStatus}
                                    help={this.state.help}
                                    hasFeedback
                                    name={'moduleNum'}
                                >
                                    <div>
                                        <InputNumber onChange={this._smallNumChange} style={{ width: 100 }} /> -<InputNumber onChange={this._largeNumChange} style={{ width: 100, marginLeft: 10 }} />
                                    </div>
                                   
                                </FormItem>
                            )
                            parameters.push(
                                <FormItem
                                    key={`extItem6-${index}`}
                                    label="通道号"
                                    {...formItemOneLayout}
                                    style={batchSelection && autoType[0] == 2 && item.name == "channel" ? {} : { display: "none" }}
                                    validateStatus={this.state.validateStatusForChannel}
                                    help={this.state.helpForChannel}
                                    hasFeedback
                                    name={'channelNum'}
                                >
                                    <div>
                                        <InputNumber placeholder={`1至${item.enum ? Math.max.apply(Math, item.enum.split(',').map(o => Number(o))) : 32}的数字`} onChange={this._smallNumChangeForChannel}
                                            min={1} max={item.enum ? Math.max.apply(Math, item.enum.split(',').map(o => Number(o))) : 32} style={{ width: 100 }} />
                                            -<InputNumber placeholder={`1至${item.enum ? Math.max.apply(Math, item.enum.split(',').map(o => Number(o))) : 32}的数字`} onChange={this._largeNumChangeForChannel}
                                            min={1} max={item.enum ? Math.max.apply(Math, item.enum.split(',').map(o => Number(o))) : 32} style={{ width: 100, marginLeft: 10 }} />
                                    </div>
                                   
                                </FormItem>
                            )
                            {
                                item.name == "module" ?
                                    parameters.push(
                                        <FormItem
                                            key={`extItem7-${index}`}
                                            label="模块号"
                                            {...formItemOneLayout}
                                            style={
                                                (batchSelection && autoType[0] == 2 || !batchSelection) && item.name == "module" ?
                                                    { } : { display: "none" }
                                            }
                                            hasFeedback
                                            name={'module'}
                                            initialValue={`${item.defaultValue}`}
                                            rules={(batchSelection && autoType[0] == 2 || !batchSelection) && item.name == "module" ? [
                                                { required: true, message: "请输入模块号" },
                                                { validator: !hasChannel ? this.checkExists : async () => { } }
                                            ]: []}
                                        >
                                            <Input placeholder="请输入模块号" />
                                            
                                        </FormItem>
                                    )
                                    : null
                            }
                            {
                                item.name == "channel" ?
                                    parameters.push(
                                        <FormItem
                                            key={`extItem8-${index}`}
                                            label="通道号"
                                            {...formItemOneLayout}
                                            style={(batchSelection && autoType[0] == 1 || !batchSelection) && item.name == "channel" ? {  } : { display: "none" }}
                                            hasFeedback
                                            name={'channel'}
                                            initialValue={`${item.defaultValue}`}
                                            rules={(batchSelection && autoType[0] == 1 || !batchSelection) && item.name == "channel" ? [
                                                { required: true, message: "请输入通道号" },
                                                { validator: this.checkExists }
                                            ]: []}
                                        >
                                            {
                                                item.enum ?
                                                    <Select>
                                                        {item.enum.split(',').map(o => <Option key={o}>{o}</Option>)}
                                                    </Select>
                                                    : <Input placeholder="请输入通道号" />
                                            }
                                           
                                        </FormItem>
                                    )
                                    : null
                            }
                            if (item.isOtherParameter) {
                                otherParameter = otherParameter.concat(parameters)
                            } else {
                                mAndc = mAndc.concat(parameters)
                            }
                        }
                    })
                }

                if (device[0].capabilities.length) {
                    device[0].capabilities[0].properties.forEach((item,index) => {
                        if (item.name == "formula") {
                            let parameter = (
                                <FormItem
                                    key={`extItem9-${index}`}
                                    label={item.showName}
                                    {...formItemOneLayout}
                                    hasFeedback
                                    name={`${item.name}`}
                                    initialValue={`${item.defaultValue}`}
                                    rules={[
                                        { required: true, message: `请选择${item.showName}` }
                                    ]}
                                >
                                    <Input disabled={true} />
                                   
                                </FormItem>
                            );
                            s.push(parameter)
                        }
                    })
                    let varProperties = device[0].capabilities[0].properties.filter(item => item.defaultValue != null && item.name != "formula" && item.category == "Variable");

                    if (varProperties.length) {
                        let titleParameter = <Row key={`extItem10`} className={Style.formulaNames}>
                            <Col span={8}>参数</Col>
                            <Col span={16}>值</Col>
                        </Row>;
                        if (varProperties.filter(v => v.isOtherParameter == true).length) {
                            otherParameter.push(titleParameter)
                        }
                        if (varProperties.filter(v => v.isOtherParameter == false).length) {
                            s.push(titleParameter)
                        }

                        try {
                            varProperties = sort(varProperties);
                        } catch (error) {

                        }

                        varProperties.forEach((item,index) => {
                            let parameter = (
                                <FormItem
                                    key={`extItem11-${index}`}
                                    label={item.showName ? item.showName : `${item.name}(${item.showName})`}
                                    {...formuleItemLayout}
                                    className={Style.moduleFormuleItem}
                                    hasFeedback
                                    name={`${item.name}`}
                                    initialValue={`${item.defaultValue}`}
                                    rules={[
                                        { required: true, message: `请输入${item.showName}` }
                                    ]}
                                >
                                    <Input placeholder={item.showName} />
                                   
                                </FormItem>
                            )
                            s.push(parameter)
                        })
                    }

                    // 采集仪等父(上级)节点公式参数
                    const formulas = this.props.parentNode.meta ? this.props.parentNode.meta.formulas : [];//.length > 0 ? this.props.parentNode.meta.formulas : device[0].formulas;

                    if (formulas && formulas.length > 0) {
                        const DefaultFormulaId = device[0].properties.find(d => d.name == 'DefaultFormulaId');

                        const selectedFormula = this.state.selectedFormulaId ? formulas.filter(f => f.id == this.state.selectedFormulaId)[0] :
                            (DefaultFormulaId ? formulas.filter(f => f.id == DefaultFormulaId.defaultValue)[0] : formulas[0]);

                        s.push(
                            <FormItem
                                key={`extItem12`}
                                label="公式"
                                {...formItemOneLayout}
                                hasFeedback
                                style={{ marginTop: 15 }}
                                name={'up_formula'}
                                initialValue={selectedFormula.id}
                                rules={[
                                    { required: true, message: '请选择公式' }
                                ]}
                            >
                                <Select size="large" placeholder="请选择公式" onChange={this._handleChangeUpFormula}>
                                    {formulas.map(f => <Option key={f.id}>{f.name}</Option>)}
                                </Select>
                               
                            </FormItem>
                        );

                        s.push(
                            <FormItem
                                key={`extItem13`}
                                label="表达式"
                                {...formItemOneLayout}
                                hasFeedback
                            >
                                <Input.TextArea disabled value={selectedFormula.formula} autosize={{ minRows: 2, maxRows: 6 }} />
                            </FormItem>
                        );
                        let formulaProperties = selectedFormula.properties;

                        if (formulaProperties.length > 0) {
                            let titleParameter = (
                                <Row key={`extItem14`} className={Style.formulaNames}>
                                    <Col span={8}>参数</Col>
                                    <Col span={16}>值</Col>
                                </Row>
                            )
                            s.push(titleParameter)

                            try {
                                formulaProperties = sort(formulaProperties);
                            } catch (error) {

                            }

                            formulaProperties.forEach((item,index) => {
                                const precisionProps = item.precision > 0 ? {
                                    precision: item.precision
                                }: {};
                                let parameter = (
                                    <FormItem
                                        key={`extItem15-${index}`}
                                        label={item.showName ? item.showName : `${item.name}(${item.showName})`}
                                        {...formuleItemLayout}
                                        className={Style.moduleFormuleItem}
                                        hasFeedback
                                        name={`formula-p-${item.name}`}
                                        initialValue={`${item.defaultValue}`}
                                        rules={[
                                            { required: true, message: `请输入${item.showName}` }
                                        ]}
                                    >
                                        {
                                            item.enum ?
                                                <Select disabled={item.category != 'Variable'}>
                                                    {item.enum.split(',').map(o => <Option key={o}>{o}</Option>)}
                                                </Select>
                                                : (
                                                    item.propertyTypeId == 3 ?
                                                        <Switch checkedChildren="是" unCheckedChildren="否" disabled={item.category != 'Variable'} />
                                                        : (
                                                            item.propertyTypeId == 1 || (item.propertyTypeId == 2 && item.showName != '模量系数') ?
                                                                <InputNumber max={item.max || Infinity} min={item.min || -Infinity} {...precisionProps} disabled={item.category != 'Variable'} />
                                                                : <Input placeholder={item.showName} disabled={item.category != 'Variable'} />
                                                        )
                                                )
                                        }
                                       
                                    </FormItem>
                                )
                                s.push(parameter)
                            })
                        }
                    }

                    if (this._enableSelectStrategy(device[0], this.props.parentNode)) {
                        s.push(
                            <FormItem
                                key={`extItem16`}
                                label="采集策略"
                                {...formItemOneLayout}
                                hasFeedback
                                style={{ marginTop: 15 }}
                                name={'dimensionType'}
                                rules={[
                                    { required: true, message: '请选择采集策略' }
                                ]}
                            >
                                <Select size="large" placeholder="请选择采集策略" onChange={this._handleChangeDimensionType}>
                                    {this._renderDimensionType()}
                                </Select>
                                
                            </FormItem>
                        )
                    }
                }
            }

            if (deviceType == "sensor" || deviceType == "acqUnit" || deviceType == 'dau.node') {
                m.push(
                    <div key={`extItem17`}>
                        <FormItem
                            {...formItemOneLayout}
                            label="批量添加"
                        >
                            <FormItem
                                {...formItemOneLayout}
                                label=""
                                name={'switch'}
                                valuePropName={'checked'}
                                initialValue={false}
                                noStyle
                            >
                                <Switch onChange={this._selectBatch} />
                            </FormItem>
                            <FormItem
                                {...formItemOneLayout}
                                label=""
                                name={'autoType'}
                                visible={batchSelection}
                                initialValue={this.state.autoType[0]}
                                noStyle
                            >
                                <RadioGroup onChange={this._onChangeAutoType} style={batchSelection && mAndc.length ? { display: 'inline-block', marginLeft: 30 } : { display: 'none' }}>
                                    {this._renderAutoTypes()}
                                </RadioGroup>
                            </FormItem>
                          
                        </FormItem>
                        {mAndc}
                        {
                            mAndc.length ?
                                <FormItem
                                    label={<span className="form-require">编号：</span>}
                                    {...formItemOneLayout}
                                >
                                    <FormItem
                                        name={"itemName"}
                                        initialValue={device[0].name}
                                        rules={[
                                            { required: true, message: "请输入编号" },
                                            { validator: this.checkExistedName }
                                        ]}
                                        noStyle
                                    >
                                        <Input style={{ width: '50%', marginRight: 13 }} />
                                    </FormItem>
                                   
                                    <Tooltip title='如单个添加，设备名称为"编号"内容，如批量添加，设备名称为"编号"内容+"通道号"或"模块号"内容'>
                                        <QuestionCircleOutlined style={{ marginRight: 13 }} />
                                    </Tooltip>
                                    <span style={batchSelection ? { display: 'inline-block' } : { display: 'none' }}>范围：{smallNumber}-{largeNumber}</span>
                                </FormItem>
                                :
                                [
                                    <FormItem
                                        key={`extItem18`}
                                        label={<span className="form-require">名称：</span>}
                                        {...formItemOneLayout}
                                    >
                                        <FormItem
                                            name={"itemName"}
                                            initialValue={device[0].name}
                                            rules={[
                                                { required: true, message: "请输入名称" },
                                                { validator: this.checkExistedName }
                                            ]}
                                            noStyle
                                        >
                                            <Input style={{ width: '50%', marginRight: 13 }} />
                                        </FormItem>
                                        
                                        
                                        <span style={batchSelection ? { display: 'inline-block' } : { display: 'none' }}>范围：{this.padNumber(smallNumber, largeNumber)}-{largeNumber}</span>
                                        <span><Checkbox checked={this.state.isPad} onChange={v => this.setState({ isPad: v.target.checked })}>自动补零</Checkbox></span>
                                    </FormItem>,
                                    <FormItem
                                        key={`extItem19`}
                                        label="编号："
                                        {...formItemOneLayout}
                                        validateStatus={this.state.validateStatus}
                                        help={this.state.help}
                                    >
                                        <InputNumber placeholder="1至9999的数字" onChange={this._smallNumChange} disabled={!this.state.batchSelection}
                                            min={1} max={9999} style={{ width: 100 }} />
                                        -
                                        <InputNumber placeholder="1至9999的数字" onChange={this._largeNumChange} disabled={!this.state.batchSelection}
                                            min={1} max={9999} style={{ width: 100, marginLeft: 10 }} />
                                    </FormItem>
                                ]
                        }
                        {s}
                    </div>
                )
            } else {
                m.push(
                    <div key={`extItem20`}>
                        <FormItem
                            label="名称："
                            {...formItemOneLayout}
                            name={"itemName"}
                            initialValue={device[0].name}
                            rules={[
                                { required: true, message: "请输入名称" },
                                { validator: this.checkExistedName }
                            ]}
                        >
                            <Input style={{ width: '50%', marginRight: 13 }} />
                           
                        </FormItem>
                        {s}
                    </div>);
            }
            return { notOtherParameter: m, isOtherParameter: otherParameter };
        }

    }

    componentDidUpdate(prevProps, prevState) {
        const { smallNumber, largeNumber } = this.state;
        if (smallNumber != prevState.smallNumber || largeNumber != prevState.largeNumber) {
            if (smallNumber && largeNumber && smallNumber < largeNumber) {
                this.formRef.current.validateFields(['moduleId'], { force: true });
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.visible == false) {
            const { current } = this.formRef
            if (current)
                current.resetFields();
            this.setState({ batchSelection: false, smallNumber: null, largeNumber: null, validateStatus: "", help: "" })
        }
        if (nextProps.deviceMetas != this.props.deviceMetas && nextProps.deviceMetas) {
            this.setState({
                tmp1: nextProps.deviceMetas.map(s => { return s.id }),
                tmp2: nextProps.deviceMetas.map(s => { return s.id }),
                tmp3: nextProps.deviceMetas.map(s => { return s.id }),
                tmp4: nextProps.deviceMetas.map(s => { return s.id }),
                productNum: null, batchSelection: false,
                deviceType: null, factoryName: null, productName: null,
                selectedProduct: null, autoType: 1, autoTypes: [], validateStatus: "",
                help: "", largeNumber: null, smallNumber: null, panelState: false, selectedFormulaId: null
            })
        }
    }

    render() {
        const { deviceMetas, visible } = this.props;
        const { validateStatus, help, deviceType, panelState, showSenior, selectedProduct, tmp4 } = this.state;
      
        let type = [], device = [];

        if (deviceMetas && selectedProduct) {
            device = deviceMetas.filter(s => s.model == selectedProduct);
            type = device[0].filteredResource ? JSON.parse(device[0].filteredResource.properties).deviceType : null;
        }

        return (
            <div>
                <Modal
                    title='设备选型'
                    maskClosable={false}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={666}
                >
                    <Form
                        ref={this.formRef}
                        name="equAddForm"
                        scrollToFirstError
                    >
                        <FormItem
                            label="设备类型"
                            {...formItemOneLayout}
                            hasFeedback
                            name={'deviceType'}
                            rules={[
                                { required: true, message: '请选择设备类型' }
                            ]}
                        >
                            <Select
                                size="large"
                                placeholder="请选择设备类型"
                                onChange={this._handleChangeDeviceType}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) => {
                                    const { children } = option.props;
                                    return (
                                        children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                        PinyinHelper.isPinyinMatched(children, input)
                                    );
                                }}
                            >
                                {this._renderDeviceType()}
                            </Select>
                            
                        </FormItem>
                        <FormItem
                            label="厂商"
                            {...formItemOneLayout}
                            hasFeedback
                            name={'factoryName'}
                            rules={[
                                { required: false, message: '请选择厂商' }
                            ]}
                        >
                            <Select
                                showSearch
                                size="large"
                                placeholder="请选择厂商"
                                onChange={this._handleChangeFactory}
                                filterOption={(input, option) => {
                                    const { children } = option.props;
                                    return (
                                        children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                        PinyinHelper.isPinyinMatched(children, input)
                                    );
                                }}
                            >
                                {this._renderFactory()}
                            </Select>
                           
                        </FormItem>
                        <FormItem
                            label="产品"
                            {...formItemOneLayout}
                            hasFeedback
                            name={'productName'}
                            rules={[
                                { required: true, message: '请选择产品名称' }
                            ]}
                        >
                            <Select
                                showSearch
                                size="large"
                                placeholder="请选择产品名称"
                                onChange={this._handleChangeProductName}
                                filterOption={(input, option) => {
                                    const { children } = option.props;
                                    return (
                                        children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                        PinyinHelper.isPinyinMatched(children, input)
                                    );
                                }}
                            >
                                {this._renderProductName()}
                            </Select>
                           
                        </FormItem>
                        <FormItem
                            label="型号"
                            {...formItemOneLayout}
                            hasFeedback
                            name={'productType'}
                            rules={[
                                { required: true, message: '请选择产品型号' }
                            ]}
                        >
                            <Select
                                showSearch
                                size="large"
                                placeholder="请选择产品型号"
                                onChange={this._handleChangeProductType}
                                filterOption={(input, option) => {
                                    const { children } = option.props;
                                    return (
                                        children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                        PinyinHelper.isPinyinMatched(children, input)
                                    );
                                }}
                            >
                                {this._renderProductType()}
                            </Select>
                           
                        </FormItem>
                        {this._renderFormItems() == undefined ? '' : this._renderFormItems().notOtherParameter}
                        {(this._renderFormItems() != undefined && this._renderFormItems().isOtherParameter.length) || (tmp4 && tmp4.length && device.length && this._enableSelectStrategy(device[0], this.props.parentNode)) ?
                            <Collapse accordion onChange={this._checkPanel} style={
                                showSenior || (this._renderFormItems() != undefined && this._renderFormItems().isOtherParameter.length) ?
                                    { marginTop: 15, background: "transparent" } : { marginTop: 15, background: "transparent", display: "none" }
                            }>
                                <Panel header={'高级'} key="1" forceRender={true}>
                                    <div style={this._renderFormItems().isOtherParameter ? { display: 'block' } : { display: 'none' }}>
                                        {this._renderFormItems().isOtherParameter}
                                    </div>
                                    <div style={panelState && tmp4 && tmp4.length && device.length && this._enableSelectStrategy(device[0], this.props.parentNode) ? { display: 'block' } : { display: 'none' }}>
                                        <FormItem
                                            label="采集次数"
                                            {...formItemOneLayout}
                                            hasFeedback
                                            name={'repeats'}
                                            initialValue={1}
                                            rules={[
                                                { required: true, message: '请选择采集次数' },
                                                { validator: this.checkNumber }
                                            ]}
                                        >
                                            <InputNumber  placeholder="1-255的正整数" min={1} max={255} />
                                            
                                        </FormItem>
                                        <FormItem
                                            label="采集间隔"
                                            label={<span className="form-require">采集间隔</span>}
                                            {...formItemOneLayout}
                                        >
                                            <FormItem
                                                hasFeedback
                                                name={'dimensionInterval'}
                                                initialValue={1}
                                                rules={[
                                                    { required: true, message: '请选择采集间隔' },
                                                    { validator: this.checkNumber }
                                                ]}
                                                noStyle
                                            >
                                            <Input style={{ width: "75%", marginRight: 0 }}  />
                                            </FormItem>
                                           
                                            <Select defaultValue="second" style={{ width: "25%" }}>
                                                <Option key="second" value="second">秒</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem
                                            label="采集延时"
                                            label={<span className="form-require">采集延时</span>}
                                            {...formItemOneLayout}
                                        >
                                            <FormItem
                                                hasFeedback
                                                name={'timeout'}
                                                initialValue={20}
                                                rules={[
                                                    { required: true, message: '请选择采集延时' },
                                                    { validator: this.checkNumber }
                                                ]}
                                                noStyle
                                            >
                                            <InputNumber style={{ width: "75%", marginRight: 0 }}  min={1} />
                                            </FormItem>
                                            
                                            <Select defaultValue="second" style={{ width: "25%" }}>
                                                <Option key="second" value="second">秒</Option>
                                            </Select>
                                            <Tag color="orange">建议按照采集仪下配置设备数量*10填写</Tag>
                                        </FormItem>
                                    </div>
                                </Panel>
                            </Collapse>
                            :
                            null
                        }
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default connect()(EquipmentAddModal);