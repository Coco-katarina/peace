'use strict';

import React, { Component } from 'react';
import { Spin, message } from 'antd';
import { connect } from 'react-redux';
import { addNVR, modifyNVR, removeNVR } from '../../actions/video/nvr';
import NVRComponent from '../../components/seniorConfig/video/nvr';

class NVR extends Component {
    constructor(props) {
        super(props);

        this.state = { triggerRender: false };
        this.structureId = parseInt(props.location.pathname.match(/\d+/g)[0]);
        this.ActType = { ADD: 'ADD', MODIFY: 'MODIFY', REMOVE: 'REMOVE' };
    }

    updatePartialPage = (type, nvrId, obj) => {
        const { nvrs, structureResources, ipcs } = this.props;
        switch (type) {
            case this.ActType.ADD:
                nvrs[nvrId] = obj; // add [nvr] object to [this.props.(nvrs, structureResources.nvrs)] in memory
                structureResources.nvrs[nvrId] = obj;
                break;
            case this.ActType.MODIFY:
                let nvr = nvrs[nvrId];
                let nvr_other = structureResources.nvrs[nvrId];
                if (nvr) {
                    for (let prop in obj) { // update [nvr] object to [this.props.(nvrs, structureResources.nvrs, ipcs.nvr)] in memory
                        nvr[prop] = obj[prop];
                        nvr_other[prop] = obj[prop];
                        Object.keys(ipcs).forEach(key => {
                            let ipc = ipcs[key];
                            if (ipc.nvr.id == nvrId && ipc.nvr[prop]) ipc.nvr[prop] = obj[prop];
                        });
                    }
                }
                break;
            case this.ActType.REMOVE:
                delete nvrs[nvrId]; // remove [nvr] object from [this.props.(nvrs, structureResources.nvrs, ipcs.nvr)] in memory
                delete structureResources.nvrs[nvrId];
                Object.keys(ipcs).forEach(key => {
                    let ipc = ipcs[key];
                    if (ipc.nvr.id == nvrId) delete ipcs[key];
                });
                break;
            default:
                break;
        }
        this.setState({ triggerRender: true });
    };

    handleRemove = (nvrId) => {
        const { dispatch, refreshIPCs } = this.props;
        dispatch(removeNVR(nvrId)).then(action => {
            const { success, error } = action;
            if (success) {
                this.updatePartialPage(this.ActType.REMOVE, nvrId);
                refreshIPCs();
            } else {
                message.error(error);
            }
        });
    };

    handleSave = (isEdit, dataToSave, nvrId) => {
        const { dispatch, structureResources } = this.props;
        let nvrItem = null;
        const vendors = (structureResources || {}).nvrVendors;
        if (isEdit) { // edit
            return dispatch(modifyNVR(nvrId, dataToSave)).then(action => {
                const { success, error } = action;
                if (success) {
                    // UEO: enhance rendering effect without page refresh
                    nvrItem = Object.assign({}, { id: nvrId }, dataToSave, { vendor: vendors[dataToSave.vendor] });
                    this.updatePartialPage(this.ActType.MODIFY, nvrId, nvrItem);
                } else {
                    message.error(error);
                }
            });
        } else { // add
            return dispatch(addNVR(this.structureId, dataToSave)).then(action => {
                const { success, error, payload } = action;
                if (success) {
                    let nvrId = payload.data.id;
                    nvrItem = Object.assign({}, { id: nvrId }, dataToSave, { vendor: vendors[dataToSave.vendor] });
                    this.updatePartialPage(this.ActType.ADD, nvrId, nvrItem);
                } else {
                    message.error(error);
                }
            });
        }
    };

    render() {
        const { isRequesting, user, nvrs, structureResources } = this.props;
        return (
            // <Spin spinning={isRequesting}>
            <NVRComponent
                user={user}
                nvrs={nvrs || []}
                isRequesting={isRequesting}
                vendors={(structureResources || {}).nvrVendors}
                onSave={this.handleSave}
                onRemove={this.handleRemove}
            />
            // </Spin>
        );
    }
}

function mapStateToProps(state) {
    const { nvrs, auth } = state;

    return {
        user: auth.user,
        nvrs: nvrs.data,
        isRequesting: nvrs.isRequesting
    }
}

export default connect(mapStateToProps)(NVR);
