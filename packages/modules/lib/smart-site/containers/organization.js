'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrganizationContainer from '../components/organization';
import {
    getInstitutions,
    getInstitutionsRoles, addInstitution,
    modifyInstitution, deleteInstitution,
} from '../actions/organization';

class Organization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: null,
        };
    }

    handleSave = (isEdit, dataToSave, id) => {
        const { dispatch, user } = this.props;
        if (isEdit) { // edit
            dispatch(modifyInstitution(id, dataToSave)).then(action => {
                dispatch(getInstitutions(user.id)); 
            });
        } else { // add
            dispatch(addInstitution(user.id,dataToSave)).then(action => {
                dispatch(getInstitutions(user.id));
            });
        }
    };

    handleDelete = (id) => {
        const { dispatch, user } = this.props;
        dispatch(deleteInstitution(id)).then(action => {
            dispatch(getInstitutions(user.id));
        });
    };

    componentDidMount() {
        const { dispatch, user } = this.props;
        dispatch(getInstitutions(user.id)).then(action=>{
            dispatch(getInstitutionsRoles());
        });
    }

    render() {
        const { isRequesting, organizations,roles,user } = this.props;
        return (
             <OrganizationContainer
                isRequesting={isRequesting}
                organizations={organizations || []}
                onSave={this.handleSave}
                onDelete={this.handleDelete}
                roles={roles}
                user={user}
            /> 
            
        )
    }
}

function mapStateToProps(state) {
    const { global, auth, institutions, institutionRoles } = state;
    const isRequesting = institutions.isRequesting && institutionRoles.isRequesting;
    return {
        clientHeight: global.clientHeight,
        user: auth.user,
        organizations: institutions.data,
        isRequesting: isRequesting ,
        roles:institutionRoles.data
    };
}

export default connect(mapStateToProps)(Organization)