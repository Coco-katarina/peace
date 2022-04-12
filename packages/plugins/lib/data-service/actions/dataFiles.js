import { basicAction, RouteRequest, buildRoute, buildUrl } from '@peace/utils';
import { DataServiceApiTable } from '../constant';
import { ApiTable, RouteTable } from '$utils'

export function getNetdiskFiles (userId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_NETDISK_FILES',
        url: DataServiceApiTable.netdiskFiles.replace('{userId}', userId),
        msg: {
            error: '获取网盘数据失败'
        },
        reducer: {
            name: 'netdiskFiles'
        },
        callback: res => {
            return res.sort((a,b)=> a.fileTypeId - b.fileTypeId)
        }
    });
}

export function getProjectList(userId, resourceControl) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_PROJECT_LIST',
        url: DataServiceApiTable.getProjects.replace('{userId}', userId) + (resourceControl ? '?resourceControl=true' : ''),
        msg: {
            error: '获取项目信息失败'
        },
        reducer: {
            name: 'projectList'
        }
    });
}

export function getStrucList (orgId, structures) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'PROJECT_LIST_REQUEST',
        url: ApiTable.getStructsList.replace('{organizationId}', orgId),
        msg: {
            error: '获取结构物信息失败'
        },
        reducer: {
            name: 'strucList'
        }
    });
}

export function uploadFile (userId, fileInfo) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: 'UPLOAD_FILE_REQUEST',
        data: fileInfo,
        url: DataServiceApiTable.uploadFile.replace('{userId}', userId),
        msg: {
            option: '保存文件信息'
        },
    })
}

export function deleteFile (fileId) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'DELETE_FILE_REQUEST',
        url: DataServiceApiTable.deleteFile.replace('{fileId}', fileId),
        msg: {
            option: '删除文件'
        },
    })
}

export function fileRename (data) {
    return dispatch => basicAction({
        type: 'put',
        data,
        dispatch: dispatch,
        actionType: 'FILE_RENAME_REQUEST',
        url: DataServiceApiTable.fileRename,
        msg: {
            option: '文件重命名'
        },
    })
}


export function removeFile (src) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'REMOVE_FILE_REQUEST',
        url: `${DataServiceApiTable.attachments}?src=${src}`,
        msg: {
            option: '删除文件'
        },
    })
}


export function getDataFileDir(structureId, dataType, path, search) {
    let url = DataServiceApiTable.getHdfsDir.replace('{structureId}', structureId).
            replace('{dataType}', dataType).replace('{path}', path || '');
        if (search) {
            url += '&s=' + search
        }
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'REQUEST_DATA_FILE_DIR',
        url: url,
        msg: {
            error: '获取数据文档目录失败'
        },
        reducer: {
            name: 'dataFile'
        }
    });
}


export function getHdfsDirStats(organizationId) {
    
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'REQUEST_DATA_FILE_STATS',
        url: DataServiceApiTable.getHdfsDirStats.replace('{organizationId}', organizationId).replace('{dataType}', 'all'),
        msg: {
            error: '查询数据文件统计失败'
        },
        reducer: {
            name: 'dataFileStats'
        }
    });
}

export function downloadDataFile(structureId, dataType, path, disName) {
    const url = DataServiceApiTable.downloadHdfsFile.replace('{structureId}', structureId).
        replace('{dataType}', dataType).replace('{path}', path || '');
    return buildUrl(url + '&dis=' + disName);
}


export function downloadFile(src, fileName) {
    const url = `${DataServiceApiTable.attachments}?src=${src}&filename=${fileName}`;
    return buildUrl(url);
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




export function collectedFile(userId, folderIdFileId, flag) {
    let text = "";
    let url = "";
    let fileTypeId = folderIdFileId.split('-')[1];
    let targetId = folderIdFileId.split('-')[2];
    if (flag) {
        text = "收藏";
        url = DataServiceApiTable.starFileDirectory.replace('{userId}', userId)
                .replace('{fileTypeId}', fileTypeId).replace('{targetId}', targetId);
    } else {
        text = "取消收藏";
        url = DataServiceApiTable.unstarFileDirectory.replace('{userId}', userId)
                .replace('{fileTypeId}', fileTypeId).replace('{targetId}', targetId);
    }
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: 'REQUEST_COLLECTED_FILE',
        data: {},
        url: url,
        msg: {
            option: text
        },
    })
}



export default {
    getNetdiskFiles,
    getProjectList,
    getStrucList,
    uploadFile,
    deleteFile,
    removeFile,
    fileRename,
    getDataFileDir,
    getHdfsDirStats
}