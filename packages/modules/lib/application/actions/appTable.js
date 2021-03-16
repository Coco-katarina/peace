"use strict";
import { ApiTable } from '$utils';
import { basicAction } from '@peace/utils';
import moment from "moment";

export function appTableData(id, stateNum) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_APP_TABLE_DATA',
        url: ApiTable.getProjects.replace("{userId}", id) + '?resourceControl=true',
        msg: {},
        reducer: { name: 'appTableData' },
        callback: (res) => {
            let arr = [];
            res.map(val => {
                if (val.status == stateNum || stateNum == 'all') {
                    let prj = val.projects[0];
                    let childArr = [];

                    prj.approveInfo.map(info => {
                        childArr.push({
                            key: info.id,
                            examinedPerson: info.user.name,
                            examinedTime: moment(info.time).format('YYYY-MM-DD HH:mm:ss'),
                            approveInfo: info.info,
                            approveResult: info.state
                        });
                    });

                    arr.push({
                        key: prj.id,
                        name: prj.name,
                        canEdit: stateNum == 'all' ? false : true,
                        website: prj.website,
                        struct: prj.structures,
                        apiSecret: prj.admin,
                        time: moment(prj.createTime).format("YYYY-MM-DD HH:mm:ss"),
                        state: val.status,
                        describe: prj.describe,
                        structureClassify: prj.structureClassify,
                        admin: prj.admin,
                        approveData: childArr,
                        websiteData: {
                            url: prj.website,
                            key: prj.id
                        },
                        extra: prj.extra,
                        eventState: prj.eventState
                    });
                }
            });
            return arr;
        }
    });
}

export function getThingsList(orgId) {
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

export function getConstructionsList(id) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_CONSTRUCTIONS_LIST',
        url: ApiTable.getConstructionsList.replace('{projectId}', ''),
        msg: {
            error: '获取工地列表失败'
        },
        reducer: {
            name: 'constructionsList'
        }
    });
}

export function getStructuregroupList(id) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_STRUCTUREGROUP_LIST',
        url: ApiTable.getStructuregroupList,
        msg: {
            error: '获取结构物群组失败'
        },
        reducer: {
            name: 'structureGroupList',
        }
    });
}


export default { appTableData, getThingsList, getConstructionsList, getStructuregroupList };