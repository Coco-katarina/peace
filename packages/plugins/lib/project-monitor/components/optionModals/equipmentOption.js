'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, message, Spin } from 'antd';
import moment from 'moment';
import Option from './option';
import DimensionOption from './dimensionOption';
import Diagnosis from './diagnosis';
import DiagnosisGPRS from './diagnosisGPRS';
import IdauAutoCalcRelay from './idauAutoCalcRelay';
import Debug from './debug';
import State from './state';
import { ApiTable } from '$utils';
import { Request } from '@peace/utils'

const TabPane = Tabs.TabPane;

const deviceMetaIdGPRS = ["bfe0979a-c0e4-4430-89d3-5fbe86568640", "98e6aaea-a6e2-449e-8b46-47fa016b1b96S"];//GPRS设备类型

class EquipmentOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkState: null,
            alarmMsg: {
                new: [],
                history: []
            },
            currentDeviceId: null,
            activeKey: "1",
        }
    }

    _showAddEquipmentModal = (info) => {
        this.props.showAddEquipmentModal(info)
    }

    _handleOptionsSave = (info, values) => {
        const { handleSave } = this.props;
        handleSave(info, values);
    }

    _deleteDimension = (info) => {
        this.props.deleteDimension(info);
    }

    _deleteEquipment = (info) => {
        this.props.deleteEquipment(info)
    }

    _handlePostcommand = (command, params, info) => {
        this.props.handlePostcommand(command, params, info);
    }

    _debugHistory = (info) => {
        this.props.debugHistory(info);
    }

    callback = (key) => {
        this.setState({
            activeKey: key
        })
    }

    getInterfaceUpLink(device, parentNode) {
        let up = device.interfaces.filter(i => i.directType == 1);
        if (parentNode.meta) {
            up = up.filter(i => parentNode.meta.interfaces.some(pi => pi.interfaceMetaId == i.interfaceMetaId && pi.directType == 2));
        }
        if (up.length > 0) {
            return up[0];
        }

        return false;
    }

    getCapabilitiesToInvoke() {
        const { struct, devices, info, parentNode, dimensions } = this.props;

        let capToInvoke = [];
        if (info && info.meta && info.device) {
            let collectionOps = info.meta.capabilities;
            if (collectionOps && collectionOps.length && struct.enable) {
                const upInterfaceMeta = this.getInterfaceUpLink(info.meta, this.props.parentNode);
                if (upInterfaceMeta) {
                    const capabilities = info.device.instance.interfaces[upInterfaceMeta.id].capabilities;
                    collectionOps.forEach(c => {
                        const capability = capabilities[c.id]; //capabilities[key];
                        const capabilityMeta = c; //collectionOps.filter(c => c.id == key);
                        if (capabilityMeta) {
                            if (capabilityMeta.capabilityCategoryId == 3 && capability) {
                                let targetDimension = capability.dimension;
                                if (targetDimension && targetDimension.dimensionId && targetDimension.id) {
                                    if (Object.keys(devices.instances).includes(targetDimension.dimensionId) && devices.instances[targetDimension.dimensionId].instance.mode == "R") {
                                        capToInvoke.push(capabilityMeta);
                                    } else {
                                        capToInvoke.push(Object.assign({}, capabilityMeta, { disabled: true }));
                                    }
                                } else {
                                    capToInvoke.push(Object.assign({}, capabilityMeta, { disabled: true }));
                                }
                            } else if (capabilityMeta.capabilityCategoryId == 2) {
                                capToInvoke.push(capabilityMeta);
                            }
                        }
                    })
                }
            }
        }

        return capToInvoke;
    }
    fetchDiagRecordWrap = (start, end) => {
        const { info } = this.props;
        if (start === "latest") {
            return this.props.fetchDiagRecord(info.device.id, null, null, true, 1);
        } else if (start === 'now') {
            const startTime = moment().add(-7, 'days').toISOString(),
                endTime = moment().toISOString();
            return this.props.fetchDiagRecord(info.device.id, startTime, endTime, false);
        } else {
            return this.props.fetchDiagRecord(info.device.id, start, end, false);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { info, isEdit } = nextProps;
        if (info != null && info.device && info.device.id != this.state.currentDeviceId) {
            this.setState({
                currentDeviceId: info.device.id,
                activeKey: "1"
            })
        }

        if (!isEdit) {
            if (info && (!this.props.info || info.device.id != this.props.info.device.id)) {
                this.props.fetchDiagRecord(info.device.id, null, null, true, 1);
            }

            if (info != null && info.linkState) {
                this.setState({
                    linkState: info.linkState,
                })
            }
            if (info != null && info.device && info.device.id != this.state.currentDeviceId) {
                let url = ApiTable.getDevicesLlinkStatus.replace('{deviceId}', info.device.id);

                Request.get(url)
                    .then(res => {
                        this.setState({
                            linkState: res.status,
                        })
                    }
                        , error => {
                            message.warning('设备在线状态获取失败');
                        });

                url = ApiTable.getDeviceAlarms.replace('{deviceId}', info.device.id);
                Request.get(url, { limit: 5 })
                    .then(res => {
                        this.setState({
                            alarmMsg: res,
                        })
                    }
                        , error => {
                            message.warning('设备告警信息获取失败');
                        });
            }
        }
    }

    saveAutoRelayCalc = (calcResult) => {
        this.props.handleRelaySave(calcResult);
    }

    render() {
        const { isEdit, struct, devices, info, parentNode, dimensions, height, responsedInvoke, isInvokeRequesting,
            diagResp, isDiaging, diagHistoryResp, clearDiagHistory, dispatch, httpServerInterfaceIds, invokeCapability, bugHistory, cleanRequestInvoke } = this.props;
        let tab = "属性";
        if (info && info.type == "equipment") {
            tab = "属性"
        } else if (info && info.type == "dimension") {
            tab = "采集策略"
        }
        const capToInvoke = this.getCapabilitiesToInvoke();
        const hasCapibility = capToInvoke.some(c => !c.disabled);

        return (
            <Tabs defaultActiveKey="1" activeKey={this.state.activeKey} onChange={this.callback} style={{ paddingRight: 16 }}>
                <TabPane tab={tab} key="1">
                    {info ?
                        info.type == "equipment" ?
                            <Option
                                isEdit={isEdit}
                                devices={devices}
                                info={info}
                                parentNode={parentNode}
                                deviceMetas={this.props.deviceMetas}
                                dimensions={dimensions}
                                showAddEquipmentModal={this._showAddEquipmentModal}
                                handleSave={this._handleOptionsSave}
                                deleteEquipment={this._deleteEquipment}
                                height={height}
                                dispatch={dispatch}
                                httpServerInterfaceIds={httpServerInterfaceIds}
                            />
                            : < DimensionOption
                                isEdit={isEdit}
                                info={info}
                                handleSave={this._handleOptionsSave}
                                deleteDimension={this._deleteDimension}
                                height={height}
                            />
                        : null
                    }
                </TabPane>
                {
                    isEdit && info && info.meta && info.meta.id == '71735c3a-2e25-40c1-81ad-df10d8792ac2' ?
                        <TabPane tab="唤醒延迟" key="5">
                            <IdauAutoCalcRelay info={info} devices={devices} deviceMetas={this.props.deviceMetas}
                                handleSave={this.saveAutoRelayCalc} height={height} />
                        </TabPane> : null
                } {
                    !isEdit && info && info.meta && info.meta.filteredResource && (JSON.parse(info.meta.filteredResource.properties).deviceType != 'dau.node') ?
                        <TabPane tab="状态" key="3">
                            <State
                                linkState={this.state.linkState}
                                alarmMsg={this.state.alarmMsg}
                            />
                        </TabPane> : null
                } {
                    !isEdit && hasCapibility ?
                        <TabPane tab="调试" key="2">
                            <Debug
                                isInvokeRequesting={isInvokeRequesting}
                                info={info}
                                devices={devices}
                                capabilityToInvoke={capToInvoke}
                                deviceMetas={this.props.deviceMetas}
                                responsedInvoke={responsedInvoke}
                                handlePostcommand={this._handlePostcommand}
                                height={height}
                                debugHistory={this._debugHistory}
                                invokeCapability={invokeCapability}
                                cleanRequestInvoke={cleanRequestInvoke}
                            />
                        </TabPane> : null
                } {
                    !isEdit && info && info.meta && info.meta.filteredResource && (JSON.parse(info.meta.filteredResource.properties).deviceType == 'dau.gateway' || JSON.parse(info.meta.filteredResource.properties).diag == true) ?
                        <TabPane tab="诊断" key="4">
                            <Spin spinning={isDiaging}>
                                {
                                    !diagResp ? '' :
                                        deviceMetaIdGPRS.find(d => d == info.meta.id) ?
                                            <DiagnosisGPRS deviceId={info.device.id} diag={diagResp} diagHistory={diagHistoryResp}
                                                height={height} fetchDiagRecord={this.fetchDiagRecordWrap} clearDiagHistory={clearDiagHistory} />
                                            : <Diagnosis deviceId={info.device.id} diag={diagResp} diagHistory={diagHistoryResp} height={height} fetchDiagRecord={this.fetchDiagRecordWrap} clearDiagHistory={clearDiagHistory} />
                                }
                            </Spin>
                        </TabPane> : null
                }
            </Tabs>
        )
    }
}
export default EquipmentOption;