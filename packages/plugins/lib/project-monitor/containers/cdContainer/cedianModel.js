'use strict'

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Input, Select, InputNumber, message, Tag, Table, Switch } from 'antd';
import { ImageCropper } from '@peace/components';
import {
    savePointInfo, modifyPointInfo, getGroupTypeFactor, getFactorDeviceFormulaList, checkGroupName
} from '../../actions/bushepeizhi';
import { RouteTable } from '$utils';
import { PinyinHelper, RouteRequest, sort } from '@peace/utils';
import { PlusOutlined, EnvironmentOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const Option = Select.Option;

// const propTypes = {
//     visible: PropTypes.bool.isRequired,
//     title: PropTypes.string.isRequired,
//     model: PropTypes.object,
//     form: PropTypes.object,
//     selectedStruct: PropTypes.object,

// };

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 16
    }
};

const depthFactorProto = "4005";//深层水平位移

class CeDianModel extends Component {
    constructor(props) {
        super(props);
        this.FACTOR_PROTO = { ENV_AQI: [], ENV_WARTER: [] };
        this.state = {
            showImgModal: false,
            selectedFactor: '',
            currDeviceSelected: null,
            currDeviceParams: {},
            currCombParams: {},
            currGroupParams: {},
            tempDescImgPath: null,
            fileName: null,
            isSelect: true,
            showBaiduMap: false,
            showAdvancedFlag: false,
            factorProtoId: [],
            DataSourcesChangeSelect: "false",
            batchAddSelect: false
        }
    }
    formRef = React.createRef();

    handleDataSourcesChange = (value) => {
        this.setState({
            DataSourcesChangeSelect: value
        })
    }

    initSelectedFactor = (selectedRow, structFactors) => {
        if (selectedRow) {
            let deviceId = [];
            if (JSON.stringify(selectedRow.iotaDevices) != "{}") {
                let iotaDevices = selectedRow.iotaDevices;
                let dp = {};
                for (let device in iotaDevices) {
                    deviceId[iotaDevices[device].index] = device;
                    if (JSON.stringify(iotaDevices[device].params) != "{}") {
                        let iotaDevicesParams = iotaDevices[device].params;
                        for (let deviceParam in iotaDevicesParams) {
                            let id = device + '-' + deviceParam;
                            dp[id] = iotaDevicesParams[deviceParam];
                        }
                    }
                }
                this.initSet(selectedRow.factorId);
                this.setState({ selectedFactor: selectedRow.factorId, currDeviceSelected: deviceId.length == 0 ? null : deviceId, currDeviceParams: dp, tempDescImgPath: selectedRow.portrait, fileName: selectedRow.portrait });
            }
            else {
                this.initSet(selectedRow.factorId);
                this.setState({ selectedFactor: selectedRow.factorId, currDeviceSelected: null, currDeviceParams: {}, currGroupParams: {}, currCombParams: {}, tempDescImgPath: selectedRow.portrait, fileName: selectedRow.portrait });
            }
            if (JSON.stringify(selectedRow.multiParams) != "{}") {
                let mp = {};
                let multiParams = selectedRow.multiParams;
                for (let mparam in multiParams) {
                    mp[mparam] = multiParams[mparam]
                }
                this.setState({ currCombParams: mp })
            }
            if (JSON.stringify(selectedRow.groupParams) != "{}") {
                let gp = {};
                let groupParams = selectedRow.groupParams;
                for (let gparam in groupParams) {
                    gp[gparam] = groupParams[gparam];

                }
                this.setState({ currGroupParams: gp })
            }
        } else if (structFactors) {
            for (let i = 0; i < structFactors.length; i++) {
                let factor = structFactors[i];
                if (factor.checked) {
                    this.setState({ selectedFactor: factor.id, currDeviceSelected: null, currDeviceParams: {}, currGroupParams: {}, currCombParams: {}, tempDescImgPath: '', fileName: null });
                    this.initSet(factor.id);
                    return;
                }
            }
        }
        this.setState({ isSelect: true });
    }

    componentDidMount() {
        const { selectedRow, structFactors } = this.props;
        const form = this.formRef.current;
        this.initSelectedFactor(selectedRow, structFactors);
        this.isShowAdvanced();

        form.resetFields();
    }

    isShowAdvanced = () => {
        const FACTOR_PROTO = { ENV_AQI: '8001', ENV_WATER: '8002', DUST: '1034' };
        const { stations } = this.props;
        let factorProtoId = [];
        stations ? stations.length > 0 ? stations.map(s => {
            let fid = s.factorId;
            if (s.factorProto == FACTOR_PROTO.ENV_AQI) {
                factorProtoId.push(fid.toString());
                this.FACTOR_PROTO.ENV_AQI.push(fid);
            } else if (s.factorProto == FACTOR_PROTO.ENV_WATER) {
                factorProtoId.push(fid.toString());
                this.FACTOR_PROTO.ENV_WARTER.push(fid);
            } else if (s.factorProto == FACTOR_PROTO.DUST) {
                factorProtoId.push(fid.toString());
                this.FACTOR_PROTO.ENV_AQI.push(fid);
            }
        }) : '' : '';

        if (factorProtoId.length > 0) {
            this.setState({ factorProtoId: factorProtoId, showAdvancedFlag: true })
        }
    }

    initSet = (factorId) => {
        if (!factorId) { return; }
        this.props.dispatch(getGroupTypeFactor(factorId));
        this.props.dispatch(getFactorDeviceFormulaList(this.props.structId, factorId));
    }

    initSetState = () => {
        this.setState({
            showImgModal: false,
            selectedFactor: '',
            currDeviceSelected: null,
            currDeviceParams: {},
            currCombParams: {},
            currGroupParams: {},
            tempDescImgPath: null,
            fileName: null,
            isSelect: true,
            showBaiduMap: false,
            showAdvancedFlag: false,
            factorProtoId: []
        })
    }

    handleOk = (e) => {
        const { groupTypeFactorList, stations, factorDeviceFormulaList, modalType, selectedRow, singleStructState } = this.props;
        const form = this.formRef.current;
        form.validateFields().then(values => {

            let pointInfo = {};
            let fid = parseInt(values.factorSelected);
            pointInfo.name = values.pointNameInput;
            pointInfo.portrait = this.state.fileName;
            pointInfo.factorId = fid;
            pointInfo.labels = values.tagSelected;
            pointInfo.group = {};
            pointInfo.advancedFlag = this.state.showAdvancedFlag;
            let extraInfo = {};
            if (pointInfo.advancedFlag) {
                extraInfo = {
                    longitude: values.longitude,
                    latitude: values.latitude,
                    divisionTypeId: values.divisionTypeId
                };
                let isStation = this.FACTOR_PROTO.ENV_AQI.includes(fid);
                if (isStation) { // station
                    extraInfo.stationTypeId = values.stationTypeId;
                } else { // fracture
                    extraInfo.fractureTypeId = values.stationTypeId;
                }
            }
            if (singleStructState && singleStructState.typeName == '小区') {
                let communityExtra = {
                    buildingNo: values.buildingNo,
                    cellNo: values.cellNo,
                    roomNo: values.roomNo,
                }
                extraInfo = Object.assign({}, extraInfo, communityExtra);
            } else if (singleStructState && (singleStructState.typeName == '消火栓' || singleStructState.typeName == '河流')) {
                let fireControlEx = {
                    longitude: values.longitude,
                    latitude: values.latitude,
                }
                extraInfo = Object.assign({}, extraInfo, fireControlEx);
            }
            if (singleStructState && (singleStructState.typeName == '消防' || singleStructState.typeName == '消火栓')) {
                let fireControlEx = {
                    stationAddress: values.stationAddress,
                    installationSite: values.installationSite,
                }
                extraInfo = Object.assign({}, extraInfo, fireControlEx);
            }
            if (Object.keys(extraInfo).length) {
                pointInfo.extras = extraInfo;
            }
            if (this.state.isSelect) {
                stations.forEach(item => {
                    if (item.groups.length) {
                        item.groups.forEach(t => {
                            if (t.id.toString() == values.groupSelect) {
                                pointInfo.group.id = t.id;
                                pointInfo.group.name = t.name;
                            }
                        })
                    }
                })
            } else {
                pointInfo.group.name = values.groupInput
            }
            pointInfo.groupParams = {};
            for (let i = 0; i < groupTypeFactorList.length; i++) {
                let params = groupTypeFactorList[i].params;
                for (let param in params) {
                    pointInfo.groupParams[param] = values[param];
                }
            }
            pointInfo.manualData = true;
            pointInfo.iotaDevices = {};
            if (values.dataSources == 'false') {
                pointInfo.manualData = false;
                let deviceLen = values.deviceSelected.length;
                for (let k = 0; k < values.deviceSelected.length; k++) {
                    let device = values.deviceSelected[k];
                    for (let j = 0; j < factorDeviceFormulaList.length; j++) {
                        let fdf = factorDeviceFormulaList[j];
                        if (device == fdf.id) {
                            pointInfo.iotaDevices[fdf.id] = { params: {} };
                            for (let param in fdf.params) {
                                pointInfo.iotaDevices[fdf.id].params[param] = values[fdf.id + '-' + param];
                            }
                            pointInfo.iotaDevices[fdf.id].index = k;
                        }
                    }
                }
                for (let j = 0; j < factorDeviceFormulaList.length; j++) {
                    let fdf = factorDeviceFormulaList[j];
                    if (values.deviceSelected.indexOf(fdf.id) > -1) {
                        if (deviceLen > 1 && fdf.multi != null) {
                            pointInfo.multiParams = {};
                            pointInfo.multiFormulaId = fdf.multi.formulaId;
                            for (let multiParam in fdf.multi.params) {
                                pointInfo.multiParams[multiParam] = values[multiParam];
                            }
                        }
                    }
                }
            } else {
                if (values.batchAdd) {
                    pointInfo.batchAdd = values.batchAdd;
                    pointInfo.spaceMark = values.spaceMark;
                    pointInfo.startNum = Number(values.startNum);
                    pointInfo.endNum = Number(values.endNum);
                    pointInfo.maxDepth = Number(values.maxDepth);
                }
            }
            if (modalType == 'add') {
                this.props.dispatch(savePointInfo(this.props.structId, pointInfo)).then(_ => {
                    //this.initSetState();
                    this.handleCancel(false);
                    form.resetFields(['startNum', 'endNum', 'maxDepth']);
                    this.props.init();
                });
            } else {
                this.props.dispatch(modifyPointInfo(selectedRow.sensorId, pointInfo)).then(_ => {
                    this.initSetState();
                    this.handleCancel();
                    this.props.init();
                });
            }

        }).catch(errInfo => {
            if (errInfo && !(errInfo.dataSources == 'true' && Object.keys(errInfo).length == 1 && errInfo.hasOwnProperty("deviceSelected"))) {
                if (errInfo.endNum && !errInfo.startNum) {
                    form.setFields({
                        startNum: {
                            errors: [new Error(errInfo.endNum.errors[0].message)],
                            value: errInfo.startNum
                        }
                    })
                }
            }
        });
    }

    handleCancel = (close) => {
        const { selectedRow, structFactors } = this.props;
        this.initSelectedFactor(selectedRow, structFactors);
        
        this.setState({ isSelect: true, showBaiduMap: false, });
        close !== false && this.props.onCancle();
    };

    isDetails = (modelType) => {
        return (modelType == 'add' || modelType == 'modify') ? false : true;
    }

    showModal = () => {
        this.setState({ showImgModal: true })
    }

    handleModalOk = (fd) => {
        const form = this.formRef.current;
        RouteRequest.post(RouteTable.resourceUpload, fd).then(res => {
            form.setFieldsValue({ img: res.filename });
            this.setState({
                tempDescImgPath: res.filename,
                fileName: res.filename
            });
        })
        this.setState({ showImgModal: false })
    }

    handleModalCancel = () => {
        this.setState({ showImgModal: false })
    }

    checkPointName = (value, getFieldValue) => {
        const { modalType, stationLocation, selectedRow } = this.props;

        if (modalType == 'add' || (modalType != 'add' && (selectedRow && selectedRow.location) != value)) {
            if (getFieldValue('dataSources')) {
                if (getFieldValue('batchAdd')) {
                    const onefactor = this.props.structFactors.find(sf => sf.id == this.state.selectedFactor);
                    let factorProto = null;
                    if (onefactor && onefactor.proto) {
                        factorProto = onefactor.proto
                    }
                    if (factorProto != depthFactorProto) {
                        for (let i = Number(getFieldValue('startNum')); i <= Number(getFieldValue('endNum')); i++) {
                            let name = getFieldValue('spaceMark') ? (value + '-' + i) : (value + i)
                            if (stationLocation.includes(name)) {
                                return Promise.reject(new Error('该编号范围中 ' + name + ' 的测点名称已存在'));

                            }
                        }
                        return Promise.resolve();
                    } else {
                        for (let i = 0.5; i <= Number(getFieldValue('maxDepth')); i += 0.5) {
                            let name = getFieldValue('spaceMark') ? (value + '-' + i) : (value + i)
                            if (stationLocation.includes(name)) {
                                return Promise.reject(new Error('该编号 ' + name + ' 的测点名称已存在'));

                            }
                        }
                        return Promise.resolve();
                    }
                }
            }
            if (stationLocation.includes(value)) {
                return Promise.reject(new Error('该测点名称已存在'));
            }
        }
        return Promise.resolve();
    }

    handleFactorChange = (value) => {
        const form = this.formRef.current;
        form.setFieldsValue({
            factorSelected: value
        });
        this.props.dispatch(getGroupTypeFactor(value));
        this.props.dispatch(getFactorDeviceFormulaList(this.props.structId, value)).then(_ => {
            this.setState({ selectedFactor: value }, () => {
                if (form.getFieldValue('pointNameInput') != "")
                    form.validateFields(['pointNameInput'], { force: true });
                if (!this.state.isSelect && form.getFieldValue('groupInput') != "")
                    form.validateFields(['groupInput'], { force: true });
            });
            let factorDeviceFormulaList = this.props.factorDeviceFormulaList;
            factorDeviceFormulaList = sort(factorDeviceFormulaList);
            let initialDeviceValue = null;
            for (let i = 0; i < factorDeviceFormulaList.length; i++) {
                let df = factorDeviceFormulaList[i];
                if (i == 0) {
                    initialDeviceValue = [df.id.toString()];
                }
            }
            form.setFieldsValue({
                deviceSelected: initialDeviceValue
            })
            if (this.state.factorProtoId.includes(value)) {
                this.setState({
                    currDeviceSelected: initialDeviceValue,
                    currCombParams: {}, currDeviceParams: {}, currGroupParams: {},
                    showAdvancedFlag: true
                });
            }
            else {
                this.setState({
                    currDeviceSelected: initialDeviceValue,
                    currCombParams: {}, currDeviceParams: {}, currGroupParams: {},
                    showAdvancedFlag: false
                });
            }

            let initialValueGroupSelect = null;
            this.props.stations.forEach(item => {
                if (item.groups.length > 0 && item.factorId.toString() == value) {
                    item.groups.forEach(t => {
                        if (initialValueGroupSelect == null)
                            initialValueGroupSelect = t.id.toString();
                    })
                }
            })
            form.setFieldsValue({
                groupSelect: initialValueGroupSelect
            })
        });
    }

    renderFactorList = (selectedRow, structFactors) => {
        const { modalType } = this.props;
        //const { getFieldDecorator } = this.props.form;
        let factorList = this.props.structFactors;
        let initialValue = null;
        let selectOptions = [];
        for (let i = 0; i < factorList.length; i++) {
            let factor = factorList[i];
            if (factor.checked) {
                if (initialValue == null) {
                    initialValue = selectedRow ? selectedRow.factorId.toString() : factor.id.toString();
                }
                selectOptions.push(<Option value={factor.id.toString()} key={factor.id.toString()}>{factor.name}</Option>);
            }
        }

        return (
            <FormItem label="监测因素" name='factorSelected' initialValue={initialValue == null ? null : initialValue.toString()} rules={[{ required: true, message: '请选择监测因素' }]} {...formItemLayout} hasFeedback>
                <Select placeholder="请选择"
                    id="factorSelected"
                    onChange={this.handleFactorChange}
                    disabled={modalType == 'add' ? false : true}>
                    {selectOptions}
                </Select>
            </FormItem>)
    }

    handleDeviceChange = (value) => {
        let factorDeviceFormulaList = this.props.factorDeviceFormulaList;
        let str = "";
        for (let i = 0; i < factorDeviceFormulaList.length; i++) {
            let df = factorDeviceFormulaList[i];
            let index = value.indexOf(df.id.toString());
            if (df.multi == null && index > -1 && value.length > 1) {
                value.splice(value.length - 1, 1);
                str += df.name + "、"
            }
        }
        if (str != "") {
            let strLen = str.length;
            message.warning(str.substring(0, strLen - 1) + '设备不能组合配置');
        }
        this.setState({
            currDeviceSelected: value,
            currCombParams: {}, currDeviceParams: {}, currGroupParams: {}
        });
    }

    renderDeviceFormulaList = (equipment) => {
        //const { getFieldDecorator } = this.props.form;

        let factorDeviceFormulaList = this.props.factorDeviceFormulaList;
        factorDeviceFormulaList = sort(factorDeviceFormulaList);
        let initialDeviceValue = null;
        let deviceSelectOptions = [];
        let dataSource = [], formulaDataSource = [];
        let dfData = {};
        for (let i = 0; i < factorDeviceFormulaList.length; i++) {

            let df = factorDeviceFormulaList[i];
            if (i == 0) {
                let initValue = [];
                if (equipment && JSON.stringify(equipment.iotaDevices) != "{}") {
                    for (let iotaDevicesParam in equipment.iotaDevices) {
                        initValue.push(iotaDevicesParam)
                    }
                }
                initialDeviceValue = this.state.currDeviceSelected == null ? [df.id.toString()] : this.state.currDeviceSelected;
                dfData = df;
            }
            let properties = JSON.parse(df.properties);
            let dfType = '';
            if (properties.productType) {
                dfType = `(${properties.productType})`
            }
            deviceSelectOptions.push(<Option value={df.id.toString()} key={df.id.toString()}>{df.name}{dfType}</Option>);
        }
        if (this.state.currDeviceSelected == null) {
            //never
            if (equipment) {
                for (let j = 0; j < factorDeviceFormulaList.length; j++) {
                    let df = factorDeviceFormulaList[j];
                    if (df.formula) {
                        formulaDataSource.push({
                            key: `formal-${df.id}`,
                            name: df.name,
                            value: df.formula,
                        })
                    }
                    if (equipment.iotaDevices[df.id]) {
                        if (JSON.stringify(df.params) != "{}") {
                            let initialValue = null;
                            let selectOptions = [];
                            for (let param in df.params) {
                                let init = this.state.currDeviceParams[df.id + '-' + param];//todo init currDeviceParams
                                //let init=equipment.iotaDevices[df.id].params[param];
                                if (df.params[param].type == 'enum') {
                                    for (let i = 0; i < df.params[param].range.length; i++) {
                                        let range = df.params[param].range;
                                        initialValue = range[0].toString();
                                        selectOptions.push(<Option value={range[i].toString()} key={range[i].toString()}>{range[i]}</Option>);
                                    }
                                }
                                let item = df.params[param].type == 'enum' ?
                                    {
                                        key: df.formulaId + '-' + param,
                                        name: df.params[param].name,
                                        value:
                                            <FormItem style={{ marginTop: -16 }} name={df.id + '-' + param} initialValue={init == null ? initialValue : init} rules={[{ required: true, message: '请选择' }]}>
                                                <Select placeholder="请选择"
                                                    id={df.id + '-' + param}>
                                                    {selectOptions}
                                                </Select>
                                            </FormItem>
                                    } : {
                                        key: df.id + '-' + param,
                                        name: df.name + ' - ' + df.params[param].name,
                                        value:
                                            <FormItem
                                                style={{ marginTop: -16 }}
                                                name={df.id + '-' + param}
                                                rules={[
                                                    {
                                                        required: true, message: '不能为空'
                                                    },
                                                    {
                                                        type: 'number', message: '请输入数字'
                                                    }
                                                ]}
                                                initialValue={init}
                                            >
                                                <InputNumber style={{ width: '100%' }} id={df.id + '-' + param} placeholder="请输入" />
                                            </FormItem>
                                    }
                                dataSource.push(item);
                            }
                        }
                    }
                }
            } else {
                //xin zeng
                formulaDataSource.push({
                    key: `formal-${dfData.id}`,
                    name: dfData.name,
                    value: dfData.formula,
                })
                if (JSON.stringify(dfData.params) != "{}") {
                    let initialValue = null;
                    let selectOptions = [];
                    for (let param in dfData.params) {
                        let init = this.state.currDeviceParams[dfData.id + '-' + param];//todo init currDeviceParams
                        //let init=null;
                        if (dfData.params[param].type == 'enum') {
                            for (let i = 0; i < dfData.params[param].range.length; i++) {
                                let range = dfData.params[param].range;
                                initialValue = range[0].toString()
                                selectOptions.push(<Option value={range[i].toString()} key={range[i].toString()}>{range[i]}</Option>);
                            }
                        }
                        let item = dfData.params[param].type == 'enum' ?
                            {
                                key: dfData.id + '-' + param,
                                name: dfData.name + ' - ' + dfData.params[param].name,
                                value:
                                    <FormItem style={{ marginTop: -16 }} name={dfData.id + '-' + param} initialValue={init == null ? initialValue : init} rules={[{ required: true, message: '请选择' }]}>
                                        <Select placeholder="请选择"
                                            id={dfData.id + '-' + param}>
                                            {selectOptions}
                                        </Select>
                                    </FormItem>
                            } : {
                                key: dfData.id + '-' + param,
                                name: dfData.name + ' - ' + dfData.params[param].name,
                                value:
                                    <FormItem
                                        style={{ marginTop: -16 }}
                                        name={dfData.id + '-' + param}
                                        rules={[
                                            {
                                                required: true, message: '不能为空'
                                            },
                                            {
                                                type: 'number', message: '请输入数字'
                                            }
                                        ]}
                                        initialValue={null || dfData.params[param].default}
                                    >

                                        <InputNumber style={{ width: '100%' }} id={dfData.id + '-' + param} placeholder="请输入" />

                                    </FormItem>
                            }
                        dataSource.push(item);
                    }
                }
            }
        } else {
            //采集 modify,look
            for (let k = 0; k < factorDeviceFormulaList.length; k++) {
                let df = factorDeviceFormulaList[k];
                if (this.state.currDeviceSelected.indexOf(df.id.toString()) > -1) {
                    if (df.formula) {
                        formulaDataSource.push({
                            key: `formal-${df.id}`,
                            name: df.name,
                            value: df.formula,
                        })
                    }
                    if (JSON.stringify(df.params) != "{}") {
                        let initialValue = null;
                        let selectOptions = [];
                        for (let param in df.params) {
                            let init = this.state.currDeviceParams[df.id + '-' + param];
                            //let init=equipment?null:equipment.iotaDevices[df.id].params[param];                            
                            if (df.params[param].type == 'enum') {
                                for (let i = 0; i < df.params[param].range.length; i++) {
                                    let range = df.params[param].range;
                                    initialValue = range[0].toString();
                                    selectOptions.push(<Option value={range[i].toString()} key={range[i].toString()}>{range[i]}</Option>);
                                }
                            }
                            let item = df.params[param].type == 'enum' ?
                                {
                                    key: df.formulaId + '-' + param,
                                    name: df.params[param].name,
                                    value:
                                        <FormItem style={{ marginTop: -16 }} name={df.id + '-' + param} initialValue={init == null ? initialValue : init} rules={[{ required: true, message: '请选择' }]}>
                                            <Select placeholder="请选择"
                                                id={df.id + '-' + param}>
                                                {selectOptions}
                                            </Select>
                                        </FormItem>
                                } : {
                                    key: df.id + '-' + param,
                                    name: df.name + ' - ' + df.params[param].name,
                                    value:
                                        <FormItem
                                            style={{ marginTop: -16 }}
                                            name={df.id + '-' + param}
                                            rules={[
                                                {
                                                    required: true, message: '不能为空'
                                                },
                                                {
                                                    type: 'number', message: '请输入数字'
                                                }
                                            ]}
                                            initialValue={(init != null && init != undefined) ? init : null || df.params[param].default}
                                        >

                                            <InputNumber style={{ width: '100%' }} id={df.id + '-' + param} placeholder="请输入" />

                                        </FormItem>
                                }
                            dataSource.push(item);
                        }
                    }
                }
            }
        }
        const columns = [{
            title: '设备-参数',
            dataIndex: 'name',
            key: 'deviceName',
            width: '40%',
        }, {
            title: '值',
            dataIndex: 'value',
            key: 'deviceValue',
            width: '60%',
        }];

        const columnsFormula = [{
            title: '设备',
            dataIndex: 'name',
            key: 'deviceName',
            width: '40%',
        }, {
            title: '计算公式',
            dataIndex: 'value',
            key: 'formula',
            width: '60%',
        }];


        return (<div>
            <FormItem label="设备" {...formItemLayout} name='deviceSelected' initialValue={initialDeviceValue || []} rules={[{ required: true, message: '请选择设备' }]} hasFeedback>

                <Select placeholder="请选择"
                    mode="multiple"
                    id="deviceSelected"
                    onChange={this.handleDeviceChange}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => {
                        const { children } = option.props;
                        let value = '';
                        for (let v of children) {
                            value += v
                        }
                        return (
                            value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                            PinyinHelper.isPinyinMatched(value, input)
                        );
                    }}
                >
                    {deviceSelectOptions}
                </Select>
            </FormItem>
            <FormItem wrapperCol={{ offset: 5 }}>
                {formulaDataSource.length == 0 ? null :
                    <Table style={{ width: '85%' }} columns={columnsFormula}
                        dataSource={formulaDataSource} pagination={false} size='middle' />}
                {dataSource.length == 0 ? null :
                    <Table style={{ width: '85%' }} columns={columns}
                        dataSource={dataSource} pagination={false} size='middle' />}
            </FormItem>
        </div >
        )
    }
    renderMultiDeviceList = (equipment) => {
        //const { getFieldDecorator } = this.props.form;
        let factorDeviceFormulaList = this.props.factorDeviceFormulaList;
        let dataSource = [], formulaDataSource = [];
        let comLabelName = "";
        let tag = "";
        if (this.state.currDeviceSelected == null || this.state.currDeviceSelected.length < 2)
            return null;
        for (let i = 0; i < factorDeviceFormulaList.length; i++) {
            let df = factorDeviceFormulaList[i];
            if (this.state.currDeviceSelected.indexOf(df.id.toString()) > -1 && df.multi != null) {
                if (df.multi) {
                    formulaDataSource.push({
                        key: `formal-${df.multi.formulaId}`,
                        name: df.multi.formulaName,
                        value: df.multi.formula,
                    })
                }
                comLabelName = df.multi.formulaName;
                tag = df.multi.description;
                if (JSON.stringify(df.multi.params) != "{}") {
                    let initialValue = null;
                    let selectOptions = [];
                    let init = null;
                    for (let param in df.multi.params) {
                        init = this.state.currCombParams[param];
                        if (df.multi.params[param].type == 'enum') {
                            init = this.state.currCombParams[param];
                            for (let i = 0; i < df.multi.params[param].range.length; i++) {
                                let range = df.multi.params[param].range;
                                initialValue = range[0].toString()
                                selectOptions.push(<Option value={range[i].toString()} key={range[i].toString()}>{range[i]}</Option>);
                            }
                        }
                        let item = df.multi.params[param].type == 'enum' ?
                            {
                                key: df.multi.formulaId + '-' + param,
                                name: df.multi.params[param].name,
                                value:
                                    <FormItem style={{ marginTop: -16 }} name={param} initialValue={init == null ? initialValue : init} rules={[{ required: true, message: '请选择' }]}>
                                        <Select placeholder="请选择"
                                            id={param}>
                                            {selectOptions}
                                        </Select>
                                    </FormItem>
                            } : {
                                key: df.multi.formulaId + '-' + param,
                                name: df.multi.params[param].name,
                                value:
                                    <FormItem
                                        style={{ marginTop: -16 }}
                                        name={param}
                                        rules={[
                                            {
                                                required: true, message: '不能为空'
                                            },
                                            {
                                                type: 'number', message: '请输入数字'
                                            }
                                        ]}
                                        initialValue={init}
                                    >
                                        <InputNumber style={{ width: '100%' }} id={param} placeholder="请输入" />
                                    </FormItem>
                            }
                        dataSource.push(item);
                    }
                }
            }
            //break;
        }
        const columns = [{
            title: '参数',
            dataIndex: 'name',
            key: 'name',
            width: '40%',

        }, {
            title: '值',
            dataIndex: 'value',
            key: 'value',
            width: '60%',
        }];

        const columnsFormula = [{
            title: '公式名称',
            dataIndex: 'name',
            key: 'deviceName',
            width: '40%',
        }, {
            title: '计算公式',
            dataIndex: 'value',
            key: 'formula',
            width: '60%',
        }];
        return <div>
            <FormItem label={comLabelName} {...formItemLayout} hasFeedback>
                {tag == null ? null : tag == "" ? null :
                    <Tag color="orange">{tag}</Tag>}
            </FormItem>
            <FormItem wrapperCol={{ offset: 5 }}>
                {formulaDataSource.length == 0 ? null :
                    <Table style={{ width: '85%' }} columns={columnsFormula}
                        dataSource={formulaDataSource} pagination={false} size='middle' />}
                {dataSource.length == 0 ? null :
                    <Table style={{ width: '85%' }} columns={columns}
                        dataSource={dataSource} pagination={false} size='middle' />}

            </FormItem>
        </div >
    }
    handleForcePointNameInput = value => {
        const form = this.formRef.current;
        this.setState({ batchAddSelect: value })
        // form.setFieldsValue({
        //     batchAdd: value
        // });
        form.validateFields(['pointNameInput'], { force: true });
    }
    handleSpaceMarkOnChange = value => {
        const form = this.formRef.current;
        // form.setFieldsValue({
        //     spaceMark: value
        // });
        form.validateFields(['pointNameInput'], { force: true });
    }
    renderBatchAddList = () => {
        const form = this.formRef.current;
        const _this = this;
        //const { getFieldDecorator, getFieldValue } = this.props.form;
        const { batchAddSelect } = this.state;
        const onefactor = this.props.structFactors.find(sf => sf.id == this.state.selectedFactor);
        let factorProto = null;
        if (onefactor && onefactor.proto) {
            factorProto = onefactor.proto
        }
        return (
            <div>
                <FormItem
                    {...formItemLayout}
                    label="批量添加"
                    name='batchAdd'
                    valuePropName='checked'
                //initialValue={false}
                >
                    <Switch onChange={this.handleForcePointNameInput} />
                </FormItem>
                {batchAddSelect ?
                    <FormItem
                        {...formItemLayout}
                        label="间隔符号"
                        name='spaceMark'
                        valuePropName='checked'
                    //initialValue={false}
                    >

                        <Switch onChange={this.handleSpaceMarkOnChange} />

                    </FormItem> : null}
                {batchAddSelect ?
                    factorProto == depthFactorProto ?
                        <FormItem
                            label="最大深度"
                            {...formItemLayout}
                        >
                            <FormItem
                                noStyle
                                name='maxDepth'
                                validateTrigger='onBlur'
                                rules={[
                                    { required: true, message: "请输入最大深度" },
                                    ({ getFieldValue, validateFields }) => ({
                                        validator(_, value) { return _this.validatorNum(_, value, getFieldValue, validateFields) }
                                    })
                                    // { validator: this.validatorNum }
                                ]}
                            >

                                <InputNumber style={{ width: 100 }} min={0.5} />
                            </FormItem>
                            <Tag color="orange">间隔为0.5米</Tag>
                        </FormItem>
                        :
                        <FormItem label="编号范围" {...formItemLayout}>
                            <FormItem
                                name='startNum'
                                validateTrigger='onBlur'
                                noStyle
                                rules={[
                                    { required: true, message: "请输入完整编号范围" },
                                    ({ getFieldValue, validateFields }) => ({
                                        validator(_, value) { return _this.validatorNum(_, value, getFieldValue, validateFields) }
                                    })
                                    // { validator: this.validatorNum }
                                ]}
                            >
                                <InputNumber min={1} style={{ width: 100 }} />
                            </FormItem>
                            -
                            <FormItem
                                name='endNum'
                                noStyle
                                rules={[
                                    { required: true, message: "请输入完整编号范围" },
                                    ({ getFieldValue, validateFields }) => ({
                                        validator(_, value) { return _this.validatorNum(_, value, getFieldValue, validateFields) }
                                    })
                                    // { validator: this.validatorNum }
                                ]}
                            >
                                <InputNumber min={1} style={{ width: 100, marginLeft: 10 }} />
                            </FormItem>
                        </FormItem>

                    : null}

            </div>);
    }
    validatorNum = (rule, value, getFieldValue, validateFields) => {
        let flag = false;
        if (getFieldValue('startNum') && getFieldValue('endNum') && !(getFieldValue('startNum') < getFieldValue('endNum'))) {
            flag = true;
            return Promise.reject(new Error('请输入从小到大顺序的编号范围'));
        }
        // if (getFieldValue('startNum') && getFieldValue('endNum')) {
        //     validateFields(['pointNameInput'], { force: true }).then(_=> Promise.resolve()).catch(err=> Promise.reject());
        // }
        // if (rule.field == "endNum" && !flag) {
        //     validateFields(['startNum'], { force: true }).then(_=> Promise.resolve()).catch(err=> Promise.reject());
        // }
        // if (getFieldValue('maxDepth')) {
        //     validateFields(['pointNameInput'], { force: true }).then(_=> Promise.resolve()).catch(err=> Promise.reject());
        // }
        return Promise.resolve();
    }
    handleInputAdd = () => {
        this.setState({ isSelect: false });
    }
    handleInputClose = () => {
        this.setState({ isSelect: true });
    }
    checkGroupName = (rule, value) => {
        if (!this.state.isSelect) {
            if (!/^[\-\w\u4e00-\u9fa5]+$/gi.test(value)) {
                return Promise.reject(new Error('不能包含特殊字符'));

            } else {
                checkGroupName(this.props.structId, this.state.selectedFactor, value).then(_ => {
                    return Promise.reject(new Error('该分组名称已存在'));
                }, err => {
                    return Promise.resolve();
                })
            }
        }
        return Promise.resolve();
    }
    renderGroupList = () => {
        const { getFieldValue } = this.formRef.current;
        const { groupTypeFactorList, stations, selectedRow } = this.props;
        const _this = this;
        const onefactor = this.props.structFactors.find(sf => sf.id == this.state.selectedFactor);
        let factorProto = null;
        if (onefactor && onefactor.proto) {
            factorProto = onefactor.proto
        }

        let groupSelectList = [];

        let initialValueGroupSelect = null;
        let len = groupTypeFactorList.length;
        let paramsFormItem = [];
        stations.forEach(item => {
            if (item.groups.length > 0 && item.factorId == this.state.selectedFactor) {
                item.groups.forEach((t, index) => {
                    if (index == 0) initialValueGroupSelect = selectedRow ? `${selectedRow.groupId}` : t.id.toString();
                    groupSelectList.push(<Option value={t.id.toString()}
                        key={t.name}>{t.name}</Option>)
                })
            }
        })
        if (len > 0) {
            for (let i = 0; i < groupTypeFactorList.length; i++) {
                let params = groupTypeFactorList[i].params;
                for (let param in params) {
                    let init = JSON.stringify(this.state.currGroupParams) != '{}' ? this.state.currGroupParams[param] : null;
                    if (params[param].type == 'boolean') {
                        let selectOptions = [];
                        selectOptions.push(<Option value={'true'} key={'true'}>是</Option>);
                        selectOptions.push(<Option value={'false'} key={'false'}>否</Option>);
                        paramsFormItem.push(
                            {
                                key: groupTypeFactorList[i].code + '-' + param,
                                name: params[param].name,
                                value:
                                    <FormItem style={{ marginTop: -16 }} name={param} initialValue={init == null ? 'true' : init} rules={[{ required: true, message: '请选择' }]}>
                                        <Select placeholder="请选择"
                                            id={param}>
                                            {selectOptions}
                                        </Select>
                                    </FormItem>
                            }

                        )
                    } else {
                        if (!(getFieldValue('batchAdd') && factorProto == depthFactorProto))
                            paramsFormItem.push(
                                {
                                    key: groupTypeFactorList[i].code + '-' + param,
                                    name: params[param].name + '(' + params[param].unit + ')',
                                    value:
                                        <FormItem
                                            style={{ marginTop: -16 }}
                                            name={param}
                                            rules={[{ required: true, message: '不能为空' }, {
                                                type: 'number', message: '请输入数字'
                                            }]}
                                            initialValue={init}
                                        >
                                            <InputNumber style={{ width: '100%' }} id={param} placeholder="请输入" />
                                        </FormItem>
                                }
                            )
                    }
                }
            }
        }
        const columns = [{
            title: '分组参数',
            dataIndex: 'name',
            key: 'name',
            width: '40%',

        }, {
            title: '值',
            dataIndex: 'value',
            key: 'value',
            width: '60%',
        }];
        return <div>
            {this.state.isSelect ? <FormItem label="分组名称："  {...formItemLayout}>
                <FormItem
                    hasFeedback
                    noStyle
                    style={{ display: this.state.isSelect ? "block" : "none" }}
                    name='groupSelect'
                    rules={[{ required: true, message: "请选择" }]}
                    initialValue={groupSelectList.length > 0 ? initialValueGroupSelect : null}
                >
                    <Select id="groupSelect">
                        {groupSelectList}
                    </Select>
                </FormItem>
                <a onClick={this.handleInputAdd}>创建新组</a>
            </FormItem> : <FormItem label="分组名称：" {...formItemLayout}>
                <FormItem
                    hasFeedback
                    noStyle
                    style={{ display: this.state.isSelect ? "none" : "block" }}
                    name='groupInput'
                    validateTrigger='onBlur'
                    rules={[{ required: true, max: 50, message: "请填写" },
                    { validator: this.checkGroupName }
                    ]}
                    initialValue={''}
                >
                    <Input id="groupInput" placeholder="请输入" />
                </FormItem>
                <a onClick={this.handleInputClose}>选择已有</a>
            </FormItem>

            }
            <FormItem wrapperCol={{ offset: 5 }} >
                {
                    paramsFormItem.length == 0 ? null :
                        //人工上传批量添加时，深层水平位移填写最大深度，批量添加
                        getFieldValue('batchAdd') &&
                            factorProto == depthFactorProto ? null :
                            <Table style={{ width: '85%' }} columns={columns}
                                dataSource={paramsFormItem} pagination={false} size='middle' />
                }
            </FormItem>
        </div>
    }
    handleTagsChange = (value) => {
        let len = value.length;
        if (len > 5) {
            value.pop();
            len = len - 1;
            message.warning('最多5个标签！');
        } else {
            if (len > 0) {
                let lastValueLen = value[len - 1].length;
                if (lastValueLen > 50) {
                    value.pop();
                    message.warning('标签最多50个字符！');
                }

            }
        }
    }

    // 编写自定义函数,创建标注
    addMarker = (point) => {
        const { map } = this.state;
        map.clearOverlays();
        let marker = new BMap.Marker(point);
        map.addOverlay(marker);
    }

    showAddressInfo = (e) => {
        this.addMarker(new BMap.Point(e.point.lng, e.point.lat));
        this.setState({ searchResultPannelHtml: null });
        const form = this.formRef.current;
        form.setFieldsValue({ longitude: e.point.lng, latitude: e.point.lat });
    }

    loadScript = () => {
        var script = document.createElement("script");
        script.src = "https://api.map.baidu.com/api?v=2.0&ak=wEiighBCdHAkOrXRHDsqlgW5&callback=_initializeGis";
        script.onerror = () => { this.setState({ noMap: true }); }
        document.body.appendChild(script);
    }

    initialize = () => {
        var map;
        map = new BMap.Map("cedianrmaps", { minZoom: 5, maxZoom: 15 });
        map.setMapType(BMAP_NORMAL_MAP);
        map.addEventListener('click', this.showAddressInfo)
        map.centerAndZoom(new BMap.Point(115.404, 39.915), 11);
        map.enableScrollWheelZoom();
        map.addControl(new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, offset: new BMap.Size(5, 5) }));
        map.addControl(new BMap.NavigationControl({ type: BMAP_NAVIGATION_CONTROL_LARGE }));
        this.setState({ map: map });

        const _this = this;
        var ac;
        if (this.props.currentState == 0) {
            ac = new BMap.Autocomplete({ "input": suggestId, "location": map });

        } else {
            ac = new BMap.Autocomplete({ "input": suggestsId, "location": map });
        }
        ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
            var str = "";
            var _value = e.fromitem.value;
            var value = "";
            if (e.fromitem.index > -1) {
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            _this.setState({ searchResultPannelHtml: str })
        });

        ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
            var _value = e.item.value;
            this.myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
            var str = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + this.myValue;
            _this.setState({ searchResultPannelHtml: str })

            _this.setPlace(this.myValue);
        });
    };

    setPlace = (value) => {
        const { map } = this.state;
        const _this = this;
        const form = this.formRef.current;
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun() {
            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果

            _this.setState({ addressInfo: { 'lng': pp.lng, 'lat': pp.lat } });
            form.setFieldsValue({ longitude: pp.lng, latitude: pp.lat });

            map.centerAndZoom(pp, 18);
            map.addOverlay(new BMap.Marker(pp));    //添加标注
        }
        var local = new BMap.LocalSearch(map, {	//智能搜索
            onSearchComplete: myFun
        });
        local.search(value);
    }

    showBaiduMap = () => {
        this.setState({ showBaiduMap: !this.state.showBaiduMap })
        window._initializeGis = this.initialize;
        if (window.BMap) {
            this.initialize();
        } else {
            this.loadScript();
        }
    }

    renderAdvancedSection = (selectedRow) => {
        const form = this.formRef.current;
        let fid = parseInt(form.getFieldValue('factorSelected'));
        let isStation = this.FACTOR_PROTO.ENV_AQI.includes(fid);
        let initialValue = selectedRow && selectedRow.extras && (
            isStation && selectedRow.extras.stationTypeId || selectedRow.extras.fractureTypeId
        ) || '';
        return (
            <FormItem
                {...formItemLayout}
                label={isStation ? '站点类型' : '断面类型'}
                name='stationTypeId'
                rules={[
                    { required: true, message: `请选择${isStation ? '站点类型' : '断面类型'}` }
                ]}
                initialValue={initialValue}
                hasFeedback
            > {

                    isStation
                        ?
                        <Select placeholder="请选择" id="stationTypeId">
                            <Option value='1' key='城市点'>城市点</Option>
                            <Option value='2' key='区域点'>区域点</Option>
                            <Option value='3' key='背景点'>背景点</Option>
                            {/* <Option value='4' key='污染监控点'>污染监控点</Option> */}
                            <Option value='41' key='工地污染源监控点'>工地污染源监控点</Option>
                            <Option value='42' key='搅拌站污染源监控点'>搅拌站污染源监控点</Option>
                            <Option value='5' key='路边交通点'>路边交通点</Option>
                            <Option value='254' key='移动监测点'>移动监测点</Option>
                        </Select>
                        :
                        <Select placeholder="请选择" id="stationTypeId">
                            <Option value='1' key='国控对照断面'>国控对照断面</Option>
                            <Option value='2' key='省控监测断面'>省控监测断面</Option>
                            <Option value='3' key='闸上'>闸上</Option>
                            <Option value='4' key='国控省界断面'>国控省界断面</Option>
                            <Option value='5' key='省界断面'>省界断面</Option>
                            <Option value='6' key='市控断面'>市控断面</Option>
                            <Option value='7' key='入海口'>入海口</Option>
                            <Option value='8' key='国界断面'>国界断面</Option>
                            <Option value='9' key='湖库点位'>湖库点位</Option>
                        </Select>

                }
            </FormItem>
        );
    };

    getCoordinateFormArr() {
        const { showBaiduMap } = this.state;
        const { selectedRow } = this.props;
        //const { getFieldDecorator } = this.props.form;
        const formItems = [];
        formItems.push(<FormItem
            {...formItemLayout}
            label="位置">
            <FormItem
                noStyle
                hasFeedback
                name='longitude'
                initialValue={selectedRow ? selectedRow.extras ? selectedRow.extras.longitude : '' : ''}
                rules={[
                    {
                        required: true, message: '请输入经度'
                    },
                    {
                        type: 'number', message: '请输入16位以内的数字'
                    }]}

            >

                <InputNumber style={{ width: '45%', marginRight: 0 }} min={-180} max={180} initialValue={0} placeholder="经度支持数字" />

            </FormItem>
            <span style={{ display: 'inline-block', width: '10%', textAlign: 'center' }}>-</span>
            <FormItem
                noStyle
                hasFeedback
                name='latitude'
                initialValue={selectedRow ? selectedRow.extras ? selectedRow.extras.latitude : '' : ''}
                rules={[
                    {
                        required: true, type: 'number', message: '请输入纬度',
                    }, {
                        type: 'number', message: '请输入16位以内的数字'
                    }
                ]}

            >
                <InputNumber style={{ width: '45%', marginRight: 0 }} min={-90} max={90} initialValue={0} placeholder="纬度支持数字" />
            </FormItem>
            <EnvironmentOutlined style={{
                fontSize: 20, cursor: 'pointer', position: 'absolute',
                top: '7px'
            }} onClick={this.showBaiduMap} />
        </FormItem>);

        formItems.push(
            <FormItem
                {...formItemLayout}
                label="地址"
                hasFeedback
                style={showBaiduMap ? { display: 'block' } : { display: 'none' }}
            >
                <Input id="suggestsId" style={{ width: '100%', marginRight: 0 }} placeholder="输入地址，定位结构物位置" />
                <div id="searchResultsPanel" style={{ border: '1px solid #d9d9d9', borderRadius: '4px', width: '150px', height: 'auto', display: 'none' }}>{this.state.searchResultPannelHtml}</div>
            </FormItem>);

        formItems.push(
            <FormItem
                {...formItemLayout}
                label="地图"
                hasFeedback
                style={showBaiduMap ? { display: 'block' } : { display: 'none' }}
            >
                <div id="cedianrmaps" style={{ width: '100%', height: '425px', marginBottom: '15px' }}></div>
            </FormItem>
        );
        return formItems;
    }

    showAdvanced = (selectedRow) => {
        const form = this.formRef.current;
        if (this.state.factorProtoId.includes(form.getFieldValue('factorSelected'))) {
            let formItems = [];
            //const { getFieldDecorator } = this.props.form;
            formItems = this.getCoordinateFormArr();
            formItems.push(
                <FormItem
                    {...formItemLayout}
                    label="区域类型"
                    hasFeedback
                    name='divisionTypeId'
                    rules={[
                        { required: true, message: '请选择区域类型' }
                    ]}
                    initialValue={selectedRow ? selectedRow.extras ? selectedRow.extras.divisionTypeId : '' : ''}
                >

                    <Select placeholder="请选择" id="divisionTypeId">
                        <Option value='1' key='国控点'>国控点</Option>
                        <Option value='2' key='省控点'>省控点</Option>
                        <Option value='3' key='市控点'>市控点</Option>
                        <Option value='4' key='自建点'>自建点</Option>
                    </Select>
                </FormItem>
            );
            formItems.push(this.renderAdvancedSection(selectedRow));
            return formItems;
        } else {
            if (this.state.showBaiduMap) this.setState({ showBaiduMap: false });
        }
    }

    renderCommunityExtra() { // 小区
        const { singleStructState, selectedRow } = this.props;
        //const { getFieldDecorator } = form;
        const initExtra = selectedRow && selectedRow.extras ? selectedRow.extras : null;
        if (singleStructState && singleStructState.typeName == '小区') {
            return (
                [<FormItem
                    id="buildingNo"
                    label="楼栋编号"
                    {...formItemLayout}
                    hasFeedback
                    name='buildingNo'
                    rules={[
                        { max: 50, message: '最多为50个字符' },
                    ]}
                    initialValue={initExtra && initExtra.buildingNo ? initExtra.buildingNo : ''}
                >
                    <Input id="pointNameInput" placeholder="请输入" />
                </FormItem>,
                <FormItem
                    id="cellNo"
                    label="单元编号"
                    {...formItemLayout}
                    hasFeedback
                    name='cellNo'
                    rules={[
                        { max: 50, message: '最多为50个字符' },
                    ]}
                    initialValue={initExtra && initExtra.cellNo ? initExtra.cellNo : ''}
                >
                    <Input id="pointNameInput" placeholder="请输入" />

                </FormItem>,
                <FormItem
                    id="roomNo"
                    label="房间编号"
                    {...formItemLayout}
                    hasFeedback
                    name='roomNo'
                    rules={[
                        { max: 50, message: '最多为50个字符' },
                    ]}
                    initialValue={initExtra && initExtra.roomNo ? initExtra.roomNo : ''}
                >
                    <Input id="pointNameInput" placeholder="请输入" />
                </FormItem>]
            )
        } else {
            return ''
        }
    }

    renderFireControlExtra() { // 消防
        const { singleStructState, selectedRow, structFactors } = this.props;
        const { getFieldValue } = this.formRef.current;
        const initExtra = selectedRow && selectedRow.extras ? selectedRow.extras : null;
        let formArr = [];

        let selectedFactorId = getFieldValue('factorSelected');
        let selectedFactor = structFactors.find(sf => sf.id == selectedFactorId);
        let selectedFactorName = selectedFactor ? selectedFactor.name : '';
        if (
            selectedFactorName && singleStructState &&
            ['消火栓', '消防水池', '电气火灾', '烟感', '可燃气体'].some(f => f == selectedFactorName)
        ) {
            if (singleStructState && singleStructState.typeName == '消火栓') {
                formArr = this.getCoordinateFormArr();
            }
            if (singleStructState.typeName == '消防' || singleStructState.typeName == '消火栓') {
                formArr.push(
                    <FormItem
                        id="stationAddress"
                        label="测点地址"
                        {...formItemLayout}
                        name='stationAddress'
                        rules={[
                            { max: 50, message: '最多为50个字符' },
                        ]}
                        initialValue={initExtra && initExtra.stationAddress ? initExtra.stationAddress : ''}
                    >
                        <Input placeholder="请输入测点地址" />
                    </FormItem>
                )
                formArr.push(
                    <FormItem
                        id="installationSite"
                        label="安装位置"
                        {...formItemLayout}
                        name='installationSite'
                        rules={[
                            { max: 50, message: '最多为50个字符' },
                        ]}
                        initialValue={initExtra && initExtra.installationSite ? initExtra.installationSite : ''}
                    >
                        <Input placeholder="请输入安装位置" />
                    </FormItem>
                )
            }
        }
        return formArr;
    }

    renderRiverExtra() {
        const { singleStructState, selectedRow, structFactors } = this.props;
        const { getFieldValue } = this.formRef.current;
        const initExtra = selectedRow && selectedRow.extras ? selectedRow.extras : null;
        let formArr = [];

        let selectedFactorId = getFieldValue('factorSelected');
        let selectedFactor = structFactors.find(sf => sf.id == selectedFactorId);
        let selectedFactorName = selectedFactor ? selectedFactor.name : '';
        if (
            selectedFactorName && singleStructState &&
            ['河流监测'].some(f => f == selectedFactorName)
        ) {
            if (singleStructState && singleStructState.typeName == '河流') {
                formArr = this.getCoordinateFormArr();
            }
        }
        return formArr;
    }

    render() {
        const form = this.formRef ? this.formRef.current : null;
        const { isRequesting, visible, title, modalType, selectedRow, structFactors, modalContentMaxHeight } = this.props;
        const { tempDescImgPath, DataSourcesChangeSelect } = this.state;
        const _this = this;
        const footer = this.isDetails(modalType) ?
            [
                <Button key="cancel" onClick={this.handleCancel}>取消</Button>
            ]
            :
            [<Button key="submit" onClick={this.handleOk}>保存</Button>,
            <Button key="cancel" onClick={this.handleCancel}>取消</Button>];

        const indexContent = (
            <Modal
                maskClosable={false}
                bodyStyle={{ maxHeight: modalContentMaxHeight, overflowY: 'auto' }}
                visible={visible} title={title} onOk={this.handleOk} onCancel={this.handleCancel}
                footer={footer} width={600}>
                <Form ref={this.formRef} layout='horizontal' style={{ position: 'relative' }} id="area-networkNode">
                    <FormItem
                        id="pointName-input"
                        label="测点名称"
                        {...formItemLayout}
                        hasFeedback
                        name='pointNameInput'
                        validateTrigger='onBlur'
                        rules={[
                            { required: true, max: 50, message: '不能为空，最多为50个字符' },
                            ({ getFieldValue }) => ({
                                validator(_, value) { return _this.checkPointName(value, getFieldValue) }
                            })
                            // { validator: this.checkPointName }
                        ]}
                        initialValue={selectedRow != null ? selectedRow.location : ""}
                    >

                        <Input id="pointNameInput" placeholder="请输入" />

                    </FormItem>
                    {structFactors && this.renderFactorList(selectedRow, structFactors)}
                    {
                        this.state.showAdvancedFlag ?
                            < div style={{ marginTop: '20px' }}>{this.showAdvanced(selectedRow)}</div> : ''
                    }
                    {form && this.renderFireControlExtra()}
                    {form && this.renderRiverExtra()}
                    <FormItem
                        id="dataSources-select"
                        label="数据来源方式："
                        {...formItemLayout}
                        hasFeedback
                        name='dataSources'
                        rules={[
                            { required: true, message: '请选择数据来源方式' }
                        ]}

                        initialValue={selectedRow != null ? selectedRow.manualData.toString() : 'false'}
                    >

                        <Select placeholder="请选择" id="dataSources"
                            onChange={this.handleDataSourcesChange}  //todo 
                            disabled={modalType != 'add' ? true : false}>
                            <Option value='false' key='设备采集'>设备采集</Option>
                            <Option value='true' key='人工上传'>人工上传</Option>
                        </Select>


                    </FormItem>
                    {
                        this.props.isRequesting ?
                            null : DataSourcesChangeSelect == 'false' ?
                                <div>
                                    {this.renderDeviceFormulaList(selectedRow)}
                                    {this.renderMultiDeviceList(selectedRow)}
                                </div>
                                :
                                (form && modalType == 'add') ?
                                    <div>
                                        {this.renderBatchAddList()}
                                    </div>
                                    : null
                    }
                    {form && this.renderGroupList(selectedRow)}
                    {form && this.renderCommunityExtra()}
                    <FormItem
                        id='tagSelected-select'
                        label="特征标签："
                        {...formItemLayout}
                        hasFeedback
                        name='tagSelected'
                        initialValue={selectedRow != null ? selectedRow.labels : []}
                    >
                        <Select placeholder="请选择" id="tagSelected"
                            mode="tags"
                            maxTagCount={5}
                            onChange={this.handleTagsChange}
                        >
                        </Select>
                    </FormItem>
                    <FormItem
                        label="现场测点图片："
                        {...formItemLayout}
                        hasFeedback
                        name='img'
                    >
                        <div >
                            <div className="image-upload">
                                {/* <Modal
                                        maskClosable={false}
                                        title="请选择图片"
                                        visible={this.state.showImgModal}
                                        width='50%'
                                        footer={null}
                                        closable={false}
                                    > */}
                                <ImageCropper
                                    visible={this.state.showImgModal}
                                    handleCropperOk={this.handleModalOk}
                                    handleCancel={this.handleModalCancel}
                                    originalImage={tempDescImgPath ? tempDescImgPath : modalType == 'add' ? null : selectedRow && selectedRow.portrait != null ? selectedRow.portrait : ''}
                                    noCompress={true}
                                />
                                {/* </Modal> */}
                                {
                                    tempDescImgPath ?
                                        <img id="img" src={tempDescImgPath} width='90%' style={{ display: 'block' }}
                                            alt='' /> :
                                        modalType == 'add' ? null :
                                            selectedRow && selectedRow.portrait != null ?
                                                <img id="img" src={selectedRow.portrait} width='90%' style={{ display: 'block' }}
                                                    alt='' /> : null}
                                <div onClick={this.showModal} style={{ margin: '0 auto', position: 'absolute', right: 0, top: '50%', marginTop: '-30px', textAlign: 'center', width: '100%', height: '100%' }}>
                                    <PlusOutlined style={{ fontSize: '60px' }} />
                                </div >
                            </div>
                            <Tag color="orange">图片格式需是：png | jpg | svg</Tag>
                        </div>
                    </FormItem>
                </Form>
            </Modal >
        );

        return (
            indexContent
        );
    }

}

// CeDianModel.propTypes = propTypes;

function mapStateToProps(state) {
    const { cedian, getGroupTypeFactor, structFactorList, factorDeviceFormulaList, auth, global } = state;
    return {
        isRequesting: cedian.isRequesting || structFactorList.isRequesting || factorDeviceFormulaList.isRequesting || getGroupTypeFactor.isRequesting,
        stations: cedian.data || [],
        groupTypeFactorList: getGroupTypeFactor.data || [],
        structFactors: structFactorList.data || [],
        factorDeviceFormulaList: factorDeviceFormulaList.data || [],
        user: auth.user,
        apiRoot: global.apiRoot
    }
}

export default connect(mapStateToProps)(CeDianModel);
