'use strict';
import React, { Component } from 'react';
import { Form, Select, Input, InputNumber, Switch, Row, Col, Button, Popconfirm, Collapse, Tag } from 'antd';
import PerfectScrollbar from 'perfect-scrollbar';
import Style from '../../style.css';
import { sort } from '@peace/utils';

const FormItem = Form.Item;

const Panel = Collapse.Panel

const productTypes = {
    "DTU": "DTU",
    "gateway": "网关",
    "sensor": "传感器",
    "acqUnit": "采集单元",
    "dau.gateway": '分布式智能云采集网关',
    "dau.node": '分布式智能云采集节点',
    "tcp.dtu": '工作站'
}

class Option extends Component {
    constructor(props) {
        super(props);
        this.saving = false;
        this.formRef = React.createRef();
        let tempShowSenior = false;
        if (props.info && props.devices && props.info.type == "equipment" && props.info.meta &&
            props.info.meta.interfaces && props.info.meta.interfaces.length && props.info.meta.capabilities &&
            props.info.meta.capabilities.length && props.parentNode) {
            let upInterface = this.getUpLinkInterface(props.info.meta, props.parentNode);
            let interfaceMetaId = upInterface ? upInterface.id : null,
                capabilityMetaIds = props.info.meta.capabilities.filter(c => c.interfaces.some(i => i.deviceMetaInterfaceId == interfaceMetaId) && c.capabilityCategoryId == 3),
                capabilityMetaId = capabilityMetaIds.length > 0 ? capabilityMetaIds[0].id : null;
            let targetDimension = interfaceMetaId && capabilityMetaId ? props.info.device.instance.interfaces[interfaceMetaId]?.capabilities[capabilityMetaId]?.dimension : null;
            if (targetDimension && targetDimension.dimensionId) {
                let devicesKeys = Object.keys(props.devices.instances);
                if (devicesKeys.includes(targetDimension.dimensionId) && props.devices.instances[targetDimension.dimensionId].instance && props.devices.instances[targetDimension.dimensionId].instance.mode == "L") {
                    tempShowSenior = false;
                } else {
                    tempShowSenior = true
                }
            } else {
                tempShowSenior = false
            }
        } else {
            tempShowSenior = false
        }
        this.state = {
            showSenior: tempShowSenior,
            selectedFormulaId: null
        }
    }

    componentDidUpdate() {
        this.Ps ? this.Ps.update() : ''
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.info != this.props.info) {
            const { info, devices } = nextProps
            const { current } = this.formRef
            if (current) current.resetFields();
            if (info && devices && info.type == "equipment" && info.meta && info.meta.interfaces.length && info.meta.capabilities.length) {
                let upInterface = info.meta.interfaces.filter(i => i.directType == 1);
               
                let interfaceMetaId = upInterface.length > 0 ? upInterface[0].id : null,
                    capabilityMetaId = info.meta.capabilities[0].id;
                let targetDimension = interfaceMetaId ? info.device.instance.interfaces[interfaceMetaId] ? info.device.instance.interfaces[interfaceMetaId].capabilities[capabilityMetaId].dimension : null : null;
                if (targetDimension && targetDimension.dimensionId) {
                    let devicesKeys = Object.keys(devices.instances);
                    if (devicesKeys.includes(targetDimension.dimensionId) && devices.instances[targetDimension.dimensionId].instance && devices.instances[targetDimension.dimensionId].instance.mode == "L") {
                        this.setState({ "showSenior": false });
                    } else {
                        this.setState({ "showSenior": true });
                    }
                } else {
                    this.setState({ "showSenior": false });
                }
            } else {
                this.setState({ "showSenior": false });
            }
        }
    }

    componentDidMount() {
        this.Ps = new PerfectScrollbar(document.getElementById('optionModal'), { suppressScrollX: true })
    }

    _enableSelectStrategy(device, parentNode) {
        
        if (device.capabilities.length == 0) return false;
        const parentNodeCapabilities = parentNode.meta && parentNode.meta.capabilities.length > 0 ?
            parentNode.meta.capabilities : null;
        if ((device.capabilities.some(c => c.capabilityCategoryId == 3)) && (!parentNodeCapabilities || !parentNodeCapabilities.some(c => c.capabilityCategoryId == 3))) {
            return true;
        }
        return false;
    }



    _renderDimensionType = () => {
        const { dimensions } = this.props;
        return dimensions.dimensions.map(item => {
            return (
                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
            )
        })
    }

    getInterfaceToRenderProp(meta, parentNode) {
        let up = meta.interfaces.filter(i => i.directType == 1);
        if (parentNode.meta) {
            up = up.filter(i => parentNode.meta.interfaces.some(pi => pi.interfaceMetaId == i.interfaceMetaId && pi.directType == 2))
        }
        if (up.length > 0) {
            return up[0];
        }
        return false;
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

   

    getChildNodes = (id) => {
        const { devices } = this.props;
        const existedEquipment = devices.instances
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
        const { devices } = this.props;
        const existedEquipment = devices.instances
        let equipmentKeys = Object.keys(existedEquipment),
            childNodes = {};
        for (let eq = 0; eq < equipmentKeys.length; eq++) {
            if (existedEquipment[equipmentKeys[eq]].type == 's.l' && existedEquipment[equipmentKeys[eq]].instance.from.ownerSvgId == id) {
                childNodes[existedEquipment[equipmentKeys[eq]].instance.to.ownerSvgId] = existedEquipment[existedEquipment[equipmentKeys[eq]].instance.to.ownerSvgId]
            }
        }
        return childNodes;
    }

    getFormItems = (info) => {
        
        const { isEdit } = this.props;
        const { showSenior } = this.state;
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 15 }
        }
        const capabilityMap = {
            "dimensionId": "采集策略",
            "interval": "间隔",
            "repeats": "次数",
            "timeout": "超时"
        }
        const initialCapabilityValue = {
            "dimensionId": null,
            "interval": 1,
            "repeats": 1,
            "timeout": 20
        }
        const DTURules = [{ required: true, message: '请输入接口id' }, { validator: this.checkDTUNum }];
        const SIMRulies = [{ required: true, message: '请输入11位、13位或19位SIM卡号' }, { validator: this.checkSim }]
        const HTTPSERVERIDRules = [{ required: true, message: '请输入' }, { validator: this.checkHttpServerId }]
        let about = [], capabilityBox = {}, capabilityPropsBox = [], s = [], otherParameter = [];
        if (info) {
            if (info.type == "equipment") {
                if (info.device.type != "s.iota") {
                    let device = info.device;
                    let meta = info.meta;
                    let properties = device.instance.properties,
                        interfaces = device.instance.interfaces,
                        name = device.instance.name;

                    about.push({
                        "key": "deviceType",
                        "value": Object.keys(productTypes).includes(
                            meta.filteredResource ?
                                JSON.parse(meta.filteredResource.properties).deviceType
                                : null
                        ) ?
                            productTypes[JSON.parse(meta.filteredResource.properties).deviceType]
                            : JSON.parse(meta.filteredResource.properties).deviceType,
                        "showName": "设备类型",
                        "name": "设备类型",
                        "required": true,
                        "proType": "Constant"
                    })
                    about.push({ "key": "name", "value": name, "showName": "名称", "name": "名称", "proType": "Variable", validator: this.checkExistedName, required: true });
                    about.push({ "key": "company", "value": meta.vendor ? meta.vendor.name : '', "showName": "厂商", "name": "厂商", "proType": "Constant" });
                    about.push({ "key": "productName", "value": meta.name, "showName": "产品", "name": "产品", "proType": "Constant" });
                    about.push({ "key": "model", "value": meta.model, "showName": "型号", "name": "型号", "proType": "Constant" });

                    try {
                        meta.properties = sort(meta.properties, "showName")
                    } catch (error) {

                    }

                    for (let i = 0; i < meta.properties.length; i++) {
                        if (meta.properties[i].name != 'deviceType'
                            && meta.properties[i].name != 'module'
                            && meta.properties[i].name != 'moduleId'
                            && meta.properties[i].name != 'channel'
                            && meta.properties[i].name != 'channelId') {
                            about.push({
                                "key": meta.properties[i].name,
                                "value": properties[meta.properties[i].name],
                                "showName": meta.properties[i].showName,
                                "name": meta.properties[i].showName,
                                "required": meta.properties[i].required,
                                "proType": meta.properties[i].category,
                                enum: meta.properties[i].enum,
                                propertyTypeId: meta.properties[i].propertyTypeId,
                                unit: meta.properties[i].unit,
                                max: meta.properties[i].max,
                                min: meta.properties[i].min,
                                precision: meta.properties[i].precision,
                                isOtherParameter: meta.properties[i].isOtherParameter,
                            })
                        }
                    }

                    let interfaceToRender = this.getInterfaceToRenderProp(meta, this.props.parentNode);
                    if (interfaceToRender) {
                        let deviceInterface = device.instance.interfaces[interfaceToRender.id];
                        const hasChannel = interfaceToRender.interfaceMeta.properties.some(p => p.name == 'channel');
                        const hasId = interfaceToRender.interfaceMeta.properties.some(p => p.name == 'id');
                        const isSoipSensor = (interfaceToRender.interfaceMeta.interfaceTypeId == 4) && (JSON.parse(meta.filteredResource.properties).deviceType == 'sensor');
                        if (hasId && interfaceToRender.interfaceMeta.interfaceTypeId != 11 && meta.filteredResource && (isSoipSensor || ["gateway", 'dau.gateway', 'tcp.dtu'].some(t => t == JSON.parse(meta.filteredResource.properties).deviceType))) {
                            let SoIPInterfaceMeta = meta.interfaces.filter(face => face.directType == 1);
                            if (SoIPInterfaceMeta.length) {
                                let deviceInterface = device.instance.interfaces[SoIPInterfaceMeta[0].id];
                                about.push({ "key": "portID", "value": deviceInterface.properties.id, "showName": "接口ID(DTU ID)", "name": "接口ID(DTU ID)", "required": true, "proType": "Variable" })
                            }
                        }

                        try {
                            interfaceToRender.interfaceMeta.properties = sort(interfaceToRender.interfaceMeta.properties, "showName")
                        } catch (error) {

                        }
                        interfaceToRender.interfaceMeta.properties.forEach(p => {
                            let propType = null, required = null;
                            if ((p.name == 'id' && interfaceToRender.interfaceMeta.interfaceTypeId != 11) || p.name == 'vendor' || p.name == 'model') return;
                            if (interfaceToRender.interfaceMeta.interfaceTypeId == 4) {
                                if (['port', 'escape', 'protocol', 'escapegw'].some(n => p.name == n)) {
                                    propType = 'Constant';
                                    required = false;
                                }
                            }
                            let initialValue = deviceInterface?.properties[p.name] || null;
                            let validator;
                            if (p.name == 'module') {
                                initialValue = initialValue || device.instance.properties['moduleId'];
                                if (!hasChannel) {
                                    validator = this.checkExists;
                                }
                            }
                            if (p.name == 'channel') {
                                initialValue = initialValue || device.instance.properties['channelId'];
                                validator = this.checkExists;
                            }
                            about.push({
                                "key": p.name,
                                "value": initialValue,
                                "showName": p.showName,
                                "name": p.showName,
                                required: required == null ? p.required : required,
                                validator: validator,
                                "proType": propType || p.category,
                                enum: p.enum,
                                propertyTypeId: p.propertyTypeId,
                                max: p.max,
                                min: p.min,
                                unit: p.unit,
                                precision: p.precision,
                                isOtherParameter: p.isOtherParameter
                            });
                        })
                    }

                    let capabilityFormulaProps = {};
                    let upLinkInterface = null;
                    if (meta.capabilities.length && meta.interfaces.length) {
                        upLinkInterface = this.getUpLinkInterface(meta, this.props.parentNode);
                        let interfacesMeta = upLinkInterface ? upLinkInterface.id : null,
                            capabilityIdMetas = meta.capabilities.filter(c => c.interfaces.some(i => i.deviceMetaInterfaceId == interfacesMeta) && c.capabilityCategoryId == 3),
                            capabilityIdMeta = capabilityIdMetas.length > 0 ? capabilityIdMetas[0].id : null;
                        if (interfacesMeta && capabilityIdMeta) {
                            let capabilityDimensions = interfaces[interfacesMeta]?.capabilities[capabilityIdMeta]?.dimension;
                            let capabilityProps = interfaces[interfacesMeta]?.capabilities[capabilityIdMeta]?.properties;
                            const capabilityFormula = interfaces[interfacesMeta]?.capabilities[capabilityIdMeta]?.formula;
                            if (capabilityFormula && capabilityFormula.formulaId) {
                                capabilityFormulaProps = capabilityFormula.properties;
                            }
                            if (capabilityDimensions) {
                                if (Object.keys(capabilityDimensions).length) {
                                    let capabilityDimensionKeys = Object.keys(capabilityDimensions);
                                    capabilityDimensionKeys.forEach(capItem => {
                                        //interval 会重复要特殊处理
                                        if(capItem == 'interval'){
                                            capabilityBox[capItem] = ({ "key": 'dimensionInterval', "value": capabilityDimensions[capItem] ? capabilityDimensions[capItem] : initialCapabilityValue[capItem], "showName": capabilityMap[capItem], "required": true })
                                        }else{
                                            capabilityBox[capItem] = ({ "key": capItem, "value": capabilityDimensions[capItem] ? capabilityDimensions[capItem] : initialCapabilityValue[capItem], "showName": capabilityMap[capItem], "required": true })
                                        }
                                    })
                                } else { // 采集
                                    capabilityBox = {
                                        "dimensionId": { "key": "dimensionId", "value": null, "showName": "采集策略", "name": "采集策略", "required": true },
                                        "interval": { "key": "dimensionInterval", "value": 1, "showName": "间隔", "name": "间隔", "required": true },
                                        "repeats": { "key": "repeats", "value": 1, "showName": "次数", "name": "次数", "required": true },
                                        "timeout": { "key": "timeout", "value": 20, "showName": "超时", "name": "超时", "required": true }
                                    }
                                }
                            }

                            if (capabilityProps) {
                                let capabilityPropsKeys = Object.keys(capabilityProps);
                                capabilityPropsKeys.forEach(propItem => {
                                    let propItemMetas = meta.capabilities.filter(cap => cap.id == capabilityIdMeta);
                                    if (propItemMetas.length) {
                                        let propItemMeta = propItemMetas[0].properties.filter(m => (m.category == "Variable" || m.name == "formula") && m.name == propItem)[0];
                                        if (propItemMeta) {
                                            capabilityPropsBox.push({
                                                "key": propItemMeta.name,
                                                "value": capabilityProps[propItem],
                                                "showName": propItemMeta.showName,
                                                "name": propItemMeta.showName,
                                                "required": true,
                                                isOtherParameter: propItemMeta.isOtherParameter
                                            })
                                        }
                                    }
                                })
                                try {
                                    capabilityPropsBox = sort(capabilityPropsBox);
                                } catch (error) {

                                }
                            }
                        }
                    }
                    about.forEach((item,index) => {
                        let validators = item.required ?
                            [{ required: true, message: `请输入${item.showName}` }] : [];
                        if (item.validator) {
                            validators.push({ validator: item.validator });
                        }
                        const precisionProps = item.precision > 0 ? {
                            precision: item.precision
                        }: {};
                        let parameter = (
                            <FormItem
                                key={`extItem1-${index}`}
                                {...formItemLayout}
                                label={item.showName + (item.unit ? '(' + item.unit + ')' : '')}
                                name={`${item.key}`}
                                initialValue={item.value}
                                valuePropName={item.propertyTypeId == 3 ? 'checked' : 'value'}

                            >
                                {
                                    item.enum ?
                                        <Select disabled={!isEdit || item.proType != "Variable"}>
                                            {
                                                item.enum.split(',').map(o => <Select.Option key={o}>{o}</Select.Option>)
                                            }
                                        </Select>
                                        : (
                                            item.propertyTypeId == 3 ?
                                                <Switch checkedChildren={"是"} unCheckedChildren={"否"} disabled={!isEdit || item.proType != "Variable"} />
                                                : (
                                                    item.propertyTypeId == 1 || (item.propertyTypeId == 2 && item.showName != '模量系数') ?
                                                        <InputNumber max={item.max || Infinity} min={item.min || -Infinity} {...precisionProps} disabled={!isEdit || item.proType != "Variable"} />
                                                        : <Input disabled={!isEdit || item.proType != "Variable"} />
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

                    })

                    if (capabilityPropsBox.length) {
                        let capabilityFormula = capabilityPropsBox.filter(itemName => itemName.key == "formula"),
                            capabilityFormulaProps = capabilityPropsBox.filter(itemName => itemName.key != "formula");
                        capabilityFormula.length ?
                            s.push(
                                <FormItem
                                    key={`extItem2`}
                                    {...formItemLayout}
                                    label={capabilityFormula[0].showName} style={{ marginBottom: 5 }}
                                    name={`${capabilityFormula[0].key}`}
                                    initialValue={capabilityFormula[0].value}
                                >
                                    <Input disabled={true} />
                                </FormItem>
                            ) : null;
                        let titleParameter = (
                            <Row  key={`extItem3`} className={Style.optionNames}>
                                <Col span={8}>参数</Col>
                                <Col span={16}>值</Col>
                            </Row>
                        )
                        s.push(titleParameter)
                        capabilityFormulaProps.forEach((item, index) => {
                            let parameter = (
                                <FormItem
                                    key={`extItem4-${index}`}
                                    labelCol={{ span: 7 }}
                                    wrapperCol={{ span: 15 }}
                                    className={
                                        index == capabilityFormulaProps.length - 1 ?
                                            `${Style.last_moduleOptionItem} ${Style.moduleOptionItem}` : `${Style.moduleOptionItem}`
                                    }
                                    label={item.showName}
                                    name={`${item.key}`}
                                    initialValue={item.value}
                                >
                                    <Input disabled={!isEdit} />
                                </FormItem>
                            )
                            s.push(parameter)
                        })
                    }

                    // 采集仪等父(上级)节点公式参数
                    const formulas = this.props.parentNode.meta ? this.props.parentNode.meta.formulas : [];//.length > 0 ? this.props.parentNode.meta.formulas : meta.formulas;

                    if (formulas.length > 0) {
                        s.push(
                            <FormItem
                                key={`extItem5`}
                                label="公式"
                                {...formItemLayout}
                                style={{ marginTop: 15 }}
                                name={'up_formula'}
                                initialValue={properties['up_formula']}
                            >
                                <Select size="large" disabled={!isEdit} placeholder="请选择公式" >
                                    {formulas.map(f => <Select.Option key={f.id}>{f.name}</Select.Option>)}
                                </Select>
                            </FormItem >
                        );

                        const selectedFormula = formulas.filter(f => f.id == (this.state.selectedFormulaId || properties['up_formula']))[0];
                        s.push(
                            <FormItem
                                key={`extItem6`}
                                label="表达式"
                                {...formItemLayout}
                                hasFeedback
                            >
                                <Input.TextArea disabled value={selectedFormula ? selectedFormula.formula : ''} autosize={{ minRows: 2, maxRows: 6 }} />
                            </FormItem>
                        );
                        const formulaProperties = selectedFormula ? selectedFormula.properties : [];

                        if (formulaProperties.length > 0) {
                            s.push(
                                <Row key={`extItem7`} className={Style.formulaNames}>
                                    <Col span={8}>参数</Col>
                                    <Col span={16}>值</Col>
                                </Row>
                            )

                            formulaProperties.forEach((item,index) => {
                                const precisionProps = item.precision > 0 ? {
                                    precision: item.precision
                                }: {};
                                s.push(
                                    <FormItem
                                        key={`extItem8-${index}`}
                                        label={item.showName ? item.showName : `${item.name}(${item.showName})`}
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 12 }}
                                        className={Style.moduleFormuleItem}
                                        name={`formula-p-${item.name}`}
                                        initialValue={
                                            capabilityFormulaProps[item.name] != null ?
                                                capabilityFormulaProps[item.name] : (
                                                    properties[`formula-p-${item.name}`] != null ?
                                                        properties[`formula-p-${item.name}`] : properties[item.name]
                                                )
                                        }
                                    >
                                        {
                                            item.enum ?
                                                <Select disabled={!isEdit || item.category != "Variable"}>
                                                    {
                                                        item.enum.split(',').map(o => <Select.Option key={o}>{o}</Select.Option>)
                                                    }
                                                </Select>
                                                : (
                                                    item.propertyTypeId == 3 ?
                                                        <Switch checkedChildren={"是"} unCheckedChildren={"否"} disabled={!isEdit || item.category != "Variable"} />
                                                        : (
                                                            item.propertyTypeId == 1 || (item.propertyTypeId == 2 && item.showName != '模量系数') ?
                                                                <InputNumber max={item.max || Infinity} min={item.min || -Infinity} {...precisionProps} disabled={!isEdit || item.category != "Variable"} />
                                                                : <Input disabled={!isEdit || item.category != "Variable"} />
                                                        )
                                                )
                                        }
                                    </FormItem>
                                )
                            })
                        }
                    }
                    if (meta.interfaces.length && this._enableSelectStrategy(meta, this.props.parentNode) && Object.keys(capabilityBox).length) {
                        
                        let dimensionMeta = capabilityBox.dimensionId ?
                            this.props.dimensions.dimensions.filter(dimen => dimen.id == capabilityBox.dimensionId.value) : [];
                           
                          
                        s.push(
                            <div key={`extItem9`}>
                                <FormItem
                                    {...formItemLayout}
                                    label={capabilityBox.dimensionId.showName}
                                    name={`${capabilityBox.dimensionId.key}`}
                                    initialValue={dimensionMeta.length ? capabilityBox.dimensionId.value : null}
                                >
                                    <Select size="large" disabled={!isEdit} placeholder="请选择采集策略">
                                        {this._renderDimensionType()}
                                    </Select>
                                </FormItem>
                                <div style={showSenior ? { display: 'block' } : { display: 'none' }}>
                                    
                                    <FormItem
                                        {...formItemLayout}
                                        label={capabilityBox.repeats.showName}
                                        name={`${capabilityBox.repeats.key}`}
                                        initialValue={capabilityBox.repeats.value}
                                    >
                                        <Input disabled={!isEdit} />
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label={capabilityBox.interval.showName}
                                    >
                                        <FormItem
                                            noStyle
                                            name={`${capabilityBox.interval.key}`}
                                            initialValue={capabilityBox.interval.value}
                                        >
                                            <Input disabled={!isEdit} style={{ width: "75%", marginRight: 0 }} />
                                        </FormItem>
                                        <Select defaultValue="second" disabled={!isEdit} style={{ width: "25%" }}>
                                            <Select.Option value="second">秒</Select.Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label={capabilityBox.timeout.showName}
                                    >
                                        <FormItem
                                            noStyle
                                            name={`${capabilityBox.timeout.key}`}
                                            initialValue={capabilityBox.timeout.value}
                                        >
                                            <Input disabled={!isEdit} style={{ width: "75%", marginRight: 0 }} />
                                        </FormItem>
                                        <Select defaultValue="second" disabled={!isEdit} style={{ width: "25%" }}>
                                            <Select.Option value="second">秒</Select.Option>
                                        </Select>
                                        {
                                            isEdit ?
                                                <Tag color="orange">建议按照采集仪下配置设备数量*10填写</Tag> : null
                                        }
                                    </FormItem>
                                </div>
                            </div>
                        )
                    }
                }

                

                return (
                    <div>
                        <Form
                            ref={this.formRef}
                            name="optionForm"
                            id="optionForm"
                            layout='horizontal'
                            scrollToFirstError
                        >
                            {s}
                            <Collapse accordion
                                style={
                                    otherParameter.length ?
                                        { margin: '15px 7px', background: "transparent" }
                                        : { marginTop: 15, background: "transparent", display: "none" }
                                }
                            >
                                <Panel header={'高级'} key="1">
                                    <div>
                                        {otherParameter}
                                    </div>
                                </Panel>
                            </Collapse>
                        </Form>
                    </div>
                );
            }
        }
    }

    render() {
        const { info, height } = this.props;
        
        return (
            <div className={Style.option_modal} id="optionModal" style={{
                height: height,
                position: 'relative',
            }}>
                {
                    info ? this.getFormItems(info) : null
                }
            </div>
        )
    }
}
export default Option;