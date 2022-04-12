/**
 * Created by ZhouXin on 2018/9/19.
 */
'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import Structuregroup from '../../components/structuregroup/structuregroup';
import {
    addStructuregroup, STRUCTUREGROUP_ADD_SUCCESS,
    getStructuregroupList, modifyStructuregroup,
    STRUCTUREGROUP_MODIFY_SUCCESS, delStructuregroup,
    STRUCTUREGROUP_DEL_SUCCESS,
    saveRelateStructs, STRUCTUREGROUP_RELATE_SUCCESS,
    delRelateStructs, STRUCTUREGROUP_RELATE_DEL_SUCCESS
} from '../../actions/structuregroup';
import { getThingsList } from '../../actions/things'

class StructuregroupContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getStructuregroups();
        this.props.dispatch(getThingsList(this.props.user.orgId))
    }

    getStructuregroups = () => {
        const { dispatch } = this.props;
        dispatch(getStructuregroupList());
    }

    handleDelete = (id) => {
        const { dispatch } = this.props;
        dispatch(delStructuregroup(id)).then(action => {
            const { type, payload } = action;
            if (type === STRUCTUREGROUP_DEL_SUCCESS) {
                message.success('结构物群组删除成功');
                this.getStructuregroups();
            } else {
                message.error(payload.error);
            }
        });
    }

    handleSave = (isEdit, dataToSave, id) => {
        const { dispatch } = this.props;
        if (isEdit) {
            dispatch(modifyStructuregroup(id, dataToSave)).then(action => {
                const { type, payload } = action;
                if (type === STRUCTUREGROUP_MODIFY_SUCCESS) {
                    message.success('修改结构物群组成功');
                    this.getStructuregroups();
                } else {
                    message.error(payload.error);
                }
            })
        } else {
            dispatch(addStructuregroup(dataToSave)).then(action => {
                const { type, payload } = action;
                if (type === STRUCTUREGROUP_ADD_SUCCESS) {
                    message.success('新增结构物群组成功');
                    this.getStructuregroups();
                } else {
                    message.error(payload.error);
                }
            })
        }
    }

    onSaveRelate = (id, dataToSave) => {
        this.props.dispatch(saveRelateStructs(id, dataToSave)).then(action => {
            const { type, payload } = action;
            if (type === STRUCTUREGROUP_RELATE_SUCCESS) {
                message.success('结构物群组关联结构物成功');
                this.getStructuregroups();
            } else {
                message.error(payload.error);
            }
        });
    }

    handleDelRelateStructs = (id) => {
        this.props.dispatch(delRelateStructs(id, 'structures')).then(action => {
            const { type, payload } = action;
            if (type === STRUCTUREGROUP_RELATE_DEL_SUCCESS) {
                message.success('删除关联成功');
            } else {
                message.error(payload.error);
            }
        })
    }

    render() {
        const { structuregroupList, isRequesting, thingsData, user } = this.props;
        return (
            <div>
                <Structuregroup
                    user={user}
                    onDelete={this.handleDelete}
                    onSave={this.handleSave}
                    structuregroupList={structuregroupList}
                    isRequesting={isRequesting}
                    structureList={thingsData}
                    onSaveRelate={this.onSaveRelate}
                    delRelateStructs={this.handleDelRelateStructs}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { structuregroupList, thingsData, auth } = state;
    return {
        user: auth.user,
        isRequesting: structuregroupList.isRequesting,
        structuregroupList: structuregroupList.items,
        thingsData: thingsData.thingsList.list,
    }
}

export default connect(mapStateToProps)(StructuregroupContainer);
