import { ApiTable } from '$utils';
import { basicAction, Request } from '@peace/utils';

export function getWholeview(id) {
    return dispatch => basicAction({
        type: 'get',
        initReducer: true,
        dispatch: dispatch,
        actionType: 'GET_WHOLEVIEW',
        url: ApiTable.getStructoverviews.replace('{organizationId}', id),
        msg: {
            error: '获取总览信息失败'
        },
        reducer: {
            name: 'wholeviewData',
            params: {

            }
        }
    });
}

export function getStructList(id) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_STRUCLIST',
        url: ApiTable.getStructsList.replace('{organizationId}', id),
        msg: {
            error: '获取结构物列表信息失败'
        },
    });
}

export function getDevices(id) {
    return dispatch => basicAction({
        type: 'get',
        initReducer: true,
        dispatch: dispatch,
        actionType: 'GET_DEVICES',
        url: ApiTable.getDevices.replace('{organizationId}', id),
        msg: {
            error: '获取设备信息失败'
        },
        reducer: {
            name: 'deviceData',
        }
    });
}

export function getDataflow(id, period) {
    return dispatch => basicAction({
        type: 'get',
        initReducer: true,
        dispatch: dispatch,
        actionType: 'GET_DATAFLOW',
        url: ApiTable.getDataFlow.replace('{organizationId}', id).replace('{period}', period),
        msg: {
            error: '获取数据流量信息失败'
        },
    });
}

export function getProjects(id) {
    return dispatch => basicAction({
        type: 'get',
        initReducer: true,
        dispatch: dispatch,
        actionType: 'GET_PROJECTS',
        url: ApiTable.getProjectsStats.replace('{organizationId}', id),
        msg: {
            error: '获取项目统计信息失败'
        },
    });
}

export const GET_MAPDATA = 'GET_MAPDATA';
export const GET_MAPDATA_SUCCESS = 'GET_MAPDATA_SUCCESS';
export const GET_MAPDATA_ERROR = "GET_MAPDATA_ERROR";
export function getMapData() {
    return dispatch => {
        return Request.get('../assets/data/data.json')
            .then(res => dispatch({
                type: GET_MAPDATA_SUCCESS,
                payload: {
                    mapData: res
                }
            }));
    }
}

export default { getWholeview, getDevices, getDataflow, getProjects }