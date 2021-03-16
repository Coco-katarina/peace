'use strict';

import React, { Component } from 'react';
import Site from '../components/site';
import { connect } from 'react-redux';
import { getThingsList, getSiteDepartment, addSite, modifySite, deleteSite, getConstructionsList, getSiteRelateStructs, saveRelateStructs } from '../actions/construction';

class Construction extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { orgId } = this.props.user;
        this.props.dispatch(getConstructionsList());
        this.props.dispatch(getSiteDepartment());
        this.props.dispatch(getThingsList(orgId));
    }
    handleSave = (isEdit, dataToSave, siteId) => {
        const { dispatch } = this.props;
        if (isEdit) { // edit
            dispatch(modifySite(siteId, dataToSave)).then(action => {
                this.props.dispatch(getConstructionsList());
            });
        } else { // add
            dispatch(addSite(dataToSave)).then(action => {
                this.props.dispatch(getConstructionsList());
            });
        }
    };

    onDelete = (id) => {
        this.props.dispatch(deleteSite(id)).then(action => {
            this.props.dispatch(getConstructionsList());
        });
    }
    getRelateStructs = (id) => {
        this.props.dispatch(getSiteRelateStructs(id));
    }
    onSaveRelate = (siteId, dataToSave) => {
        this.props.dispatch(saveRelateStructs(siteId, dataToSave));
    }
    render() {
        const { siteList, siteDepartments, reStructs, thingsList, user, isRequesting } = this.props;
        return (
            <Site
                siteList={siteList}
                siteDepartments={siteDepartments}
                onSave={this.handleSave}
                onDelete={this.onDelete}
                getRelateStructs={this.getRelateStructs}
                reStructs={reStructs}
                thingsList={thingsList}
                onSaveRelate={this.onSaveRelate}
                isRequesting={isRequesting}
                user={user}
            />
        )
    }
}

function mapStateToProps(state) {
    const { auth, siteList, global, siteDepartments, relateStruct, thingsList } = state;
    const isRequesting = siteList.isRequesting || thingsList.isRequesting;
    return {
        clientHeight: global.clientHeight,
        user: auth.user,
        siteList: siteList.data,
        siteDepartments: siteDepartments.data,
        reStructs: relateStruct.data,
        isRequesting: isRequesting,
        thingsList: thingsList.data || [],
    };
}

export default connect(mapStateToProps)(Construction);
