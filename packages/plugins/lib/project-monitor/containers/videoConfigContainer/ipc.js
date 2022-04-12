'use strict';

import React, { Component } from 'react';
import { Spin, message } from 'antd';
import { connect } from 'react-redux';
import { addIPC, modifyIPC, removeIPC } from '../../actions/video/ipc';
import IPCComponent from '../../components/seniorConfig/video/ipc';

const PlatformType = ["yingshi", "Ti"];

class IPC extends Component {
    constructor(props) {
        super(props);

        this.state = { triggerRender: false };
        this.structureId = parseInt(props.location.pathname.match(/\d+/g)[0]);
        this.ActType = { ADD: 'ADD', MODIFY: 'MODIFY', REMOVE: 'REMOVE' };
        this.cache = { nvrVendors: {}, pushServers: {}, nvrs: {}, stations: {} };
    }

    updatePartialPage = (type, ipcId, obj) => {
        switch (type) {
            case this.ActType.ADD:
                this.props.ipcs[ipcId] = obj; // add [ipc] object to [this.props.ipcs] in memory
                break;
            case this.ActType.MODIFY:
                let ipc = this.props.ipcs[ipcId];
                if (ipc) {
                    for (let prop in obj) { // update [ipc] object to [this.props.ipcs] in memory
                        ipc[prop] = obj[prop];
                    }
                }
                break;
            case this.ActType.REMOVE:
                delete this.props.ipcs[ipcId]; // remove [ipc] object from [this.props.ipcs] in memory
                break;
            default:
                break;
        }
        this.setState({ triggerRender: true });
    };

    handleRemove = (ipcId) => {
        const { dispatch } = this.props;
        dispatch(removeIPC(ipcId)).then(action => {
            const { success, error } = action;
            if (success) {
                this.updatePartialPage(this.ActType.REMOVE, ipcId);
            } else {
                message.error(error);
            }
        });
    };

    handleSave = (isEdit, dataToSave, ipcId) => {
        const { dispatch } = this.props;
        const _this = this;
        let ipcItem = null;
        let dataExtra = {
            nvr: this.cache.nvrs[dataToSave.nvr],
            pushServer: this.cache.pushServers[dataToSave.pushServer],
            stations: dataToSave.stations.map(sid => this.cache.stations[sid])
        };
        if (isEdit) { // edit
            return dispatch(modifyIPC(ipcId, dataToSave)).then(action => {
                const { success, error } = action;
                if (success) {
                    if (dataToSave.type == "p2p") {
                        let p2p = {
                            uid: dataToSave.uid,
                            userName: dataToSave.userName,
                            password: dataToSave.password
                        }
                        ipcItem = Object.assign({}, { id: ipcId }, dataToSave, { p2p: p2p }, dataExtra)
                    } else if (PlatformType.includes(dataToSave.type)) {
                        let yingshi = {
                            serialNo: dataToSave.serialNo,
                            rtmpAddress: dataToSave.rtmpAddress,
                            hlsAddress: dataToSave.hlsAddress
                        }
                        ipcItem = Object.assign({}, { id: ipcId }, dataToSave, { channelNo: dataToSave.channelNo }, { [dataToSave.type]: yingshi }, dataExtra);
                    } else {
                        ipcItem = Object.assign({}, { id: ipcId }, dataToSave, dataExtra);
                    }
                    return _this.updatePartialPage(_this.ActType.MODIFY, ipcId, ipcItem);
                } else {
                    message.error(error);
                }
            });
        } else { // add
            return dispatch(addIPC(_this.structureId, dataToSave)).then(action => {
                const { success, error, payload } = action;
                if (success) {
                    let ipcId = payload.data.id;
                    if (dataToSave.type == "p2p") {
                        let p2p = {
                            uid: dataToSave.uid,
                            userName: dataToSave.userName,
                            password: dataToSave.password
                        }
                        ipcItem = Object.assign({}, { id: ipcId }, dataToSave, { p2p: p2p }, dataExtra)
                    } else if (PlatformType.includes(dataToSave.type)) {
                        let yingshi = {
                            serialNo: dataToSave.serialNo,
                            rtmpAddress: dataToSave.rtmpAddress,
                            hlsAddress: dataToSave.hlsAddress
                        }
                        ipcItem = Object.assign({}, { id: ipcId }, dataToSave, { channelNo: dataToSave.channelNo }, { [dataToSave.type]: yingshi }, dataExtra);
                    } else {
                        ipcItem = Object.assign({}, { id: ipcId }, dataToSave, dataExtra);
                    }
                    return _this.updatePartialPage(_this.ActType.ADD, ipcId, ipcItem);
                } else {
                    message.error(error);
                }
            });
        }
    };

    tryInitCache = (structureResources) => {
        if (structureResources) {
            const { nvrVendors, pushServers, nvrs, factorsWithStations } = structureResources;
            this.cache.nvrVendors = nvrVendors;
            this.cache.pushServers = pushServers;
            this.cache.nvrs = nvrs;
            this.cache.stations = Object.keys(factorsWithStations).reduce((p, fid) => {
                factorsWithStations[fid].stations.forEach(s => {
                    p[s.id] = { id: s.id, name: s.name, factorId: parseInt(fid) };
                });
                return p;
            }, {});
        }
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { error, structureResources } = nextProps;
        if (error) {
            message.error(error);
            return;
        }
        if (structureResources && props.structureResources != structureResources)
            this.tryInitCache(structureResources);
    }

    componentDidMount() {
        this.tryInitCache(this.props.structureResources);
    }

    render() {
        const { isRequesting, user, ipcs, structureResources } = this.props;
        const resources = structureResources || {};
        return (
            <Spin spinning={isRequesting}>
                <IPCComponent
                    user={user}
                    ipcs={ipcs}
                    nvrs={resources.nvrs}
                    pushServers={resources.pushServers}
                    factorsWithStations={resources.factorsWithStations}
                    onSave={this.handleSave}
                    onRemove={this.handleRemove}
                />
            </Spin>
        );
    }
}

function mapStateToProps(state) {
    const { ipcs, auth } = state;
    return {
        user: auth.user,
        ipcs: ipcs.data,
        isRequesting: ipcs.isRequesting,
        error: ipcs.error
    }
}

export default connect(mapStateToProps)(IPC);
