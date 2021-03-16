import { Request, buildRoute, basicAction } from '@peace/utils'
import { ApiTable, RouteTable } from '$utils'

export const REQUEST_DATA_FILE_DIR = 'REQUEST_DATA_FILE_DIR';
export const REQUEST_DATA_FILE_DIR_SUCCESS = 'REQUEST_DATA_FILE_DIR_SUCCESS';
export const REQUEST_DATA_FILE_DIR_ERROR = 'REQUEST_DATA_FILE_DIR_ERROR';

export function getDataFileDir(structureId, dataType, path, search) {
    return dispatch => {
        dispatch({ type: REQUEST_DATA_FILE_DIR });

        let url = ApiTable.getHdfsDir.replace('{structureId}', structureId).
            replace('{dataType}', dataType).replace('{path}', path || '');
        if (search) {
            url += '&s=' + search
        }
        Request.get(url)
            .then(
                res => dispatch({ type: REQUEST_DATA_FILE_DIR_SUCCESS, payload: { res } }),
                err => dispatch({ type: REQUEST_DATA_FILE_DIR_ERROR, error: err.response.body.message }));
    }
}

export const REQUEST_DATA_FILE_STATS = 'REQUEST_DATA_FILE_STATS';
export const REQUEST_DATA_FILE_STATS_SUCCESS = 'REQUEST_DATA_FILE_STATS_SUCCESS';
export const REQUEST_DATA_FILE_STATS_ERROR = 'REQUEST_DATA_FILE_STATS_ERROR';

export function getHdfsDirStats(organizationId) {
    return dispatch => {
        dispatch({ type: REQUEST_DATA_FILE_STATS });

        let url = ApiTable.getHdfsDirStats.replace('{organizationId}', organizationId).replace('{dataType}', 'all');
        Request.get(url)
            .then(
                res => {
                    dispatch({ type: REQUEST_DATA_FILE_STATS_SUCCESS, payload: { res } })
                },
                err => {
                    dispatch({ type: REQUEST_DATA_FILE_STATS_ERROR, error: err.body ? err.body.message || '查询数据文件统计失败' : '查询数据文件统计失败' })
                }
            );
    }
}

export function downloadDataFile(structureId, dataType, path, disName) {
    const url = RouteTable.downloadHdfsFile.replace('{structureId}', structureId).
        replace('{dataType}', dataType).replace('{path}', path || '');
    return buildRoute(url + '&dis=' + disName);
}

export function getProjectList(userId, resourceControl) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_PROJECT_LIST',
        url: ApiTable.getProjects.replace('{userId}', userId) + (resourceControl ? '?resourceControl=true' : ''),
        msg: {
            error: '获取项目信息失败'
        },
        reducer: {
            name: 'projectList'
        }
    });
}

export function getStructs(organizationId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_STRUCTS_INFO',
        url: ApiTable.getStructsList.replace('{organizationId}', organizationId),
        msg: {
            error: '获取结构物列表失败'
        },
        reducer: {
            name: 'structList'
        }
    });
}

export function getCedian(structureId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_CEDIAN',
        url: ApiTable.getCedian.replace('{structureId}', structureId),
        msg: {
            option: '查询测点信息'
        },
        reducer: {
            name: 'cedian'
        }
    });
}