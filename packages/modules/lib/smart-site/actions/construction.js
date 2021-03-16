'use strict';
import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

function getThingsList(orgId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_APP_THINGS_LIST',
        url: ApiTable.getStructsList.replace("{organizationId}", orgId),
        msg: {
            error: '获取监测对象失败'
        },
        reducer: {
            name: 'thingsList'
        }
    });
}

function getSiteDepartment() {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_SITEDEPARTMENT',
        url: ApiTable.getSiteDepartment,
        msg: {
            error: '获取部门列表失败'
        },
        reducer: {
            name: 'siteDepartments'
        }
    }); 
}

function addSite(dataToSave) {
    return dispatch => basicAction({
        type: 'post',
        data: dataToSave,
        dispatch: dispatch,
        actionType: 'ADD_SITE',
        url: ApiTable.addSite,
        msg: {
            option: '新增工地'
        },
    });
}


function modifySite(id, data) {
    return dispatch => basicAction({
        type: 'put',
        data: data,
        dispatch: dispatch,
        actionType: 'MODIFY_SITE',
        url: ApiTable.modifySite.replace('{id}', id),
        msg: {
            option: '修改工地'
        },
    });
}

function deleteSite(id) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'DELETE_SITE',
        url: ApiTable.deleteSite.replace('{id}', id),
        msg: {
            option: '删除工地'
        },
    });
}

function getConstructionsList() {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_ORGSITES',
        url: ApiTable.getConstructionsList.replace('{projectId}', ''),
        msg: {
            error: '获取工地列表失败'
        },
        reducer: {
            name: 'siteList'
        }
    }); 
}


function getSiteRelateStructs(id) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'SITE_RELATE_STRUCTS',
        url: ApiTable.getSiteRelateStructs.replace('{id}', id).replace('{type}', ''),
        msg: {
            error: '获取工地关联的结构物列表失败'
        },
        reducer: {
            name: 'relateStruct'
        }
    }); 
}

function saveRelateStructs(id, data) {
    return dispatch => basicAction({
        type: 'post',
        data: data,
        dispatch: dispatch,
        actionType: 'SAVE_RELATE_STRUCTS',
        url: ApiTable.saveRelateStructs.replace('{id}', id),
        msg: {
            option: '修改工地关联的结构物'
        },
    });
}

export {
    getThingsList,
    getSiteDepartment,
    addSite,
    modifySite,
    deleteSite,
    getConstructionsList,
    getSiteRelateStructs,
    saveRelateStructs
}
