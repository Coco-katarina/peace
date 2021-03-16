/**
 * Created by zmh on 2017/6/19.
 */
'use strict'
import * as types from '../constants/ActionTypes';
import { Request, RouteRequest } from '@peace/utils'
import { ApiTable } from '$utils'

//fileList
function requestFileList(projectId) {
    return {
        type: types.FILE_LIST_REQUEST
    }
}
function receiveFileList(items) {
    items.sort(sortId);
    return {
        type: types.FILE_LIST_SUCCESS,
        payload: { items }
    }
}
function failFileList(error) {
    return {
        type: types.FILE_LIST_FAILURE,
        payload: { error: error },
        error: '获取文件信息失败'
    }
}
function sortId(a, b) {
    return a.fileTypeId - b.fileTypeId
}
export function getFileList(userId) {
    return dispatch => {
        dispatch(requestFileList(userId));
        const url = ApiTable.getFiles.replace('{userId}', userId);
        return Request.get(url)
            .then(res => dispatch(receiveFileList(res))
                , error => dispatch(failFileList(error)));
    }
}

export function uploadFile(userId, fileInfo, type) {
    return dispatch => {
        dispatch({ type: types.UPLOAD_FILE_REQUEST });
        const url = ApiTable.uploadFile.replace('{userId}', userId)
        return Request.post(url, fileInfo)
            .then(_ => dispatch({ type: types.UPLOAD_FILE_SUCCESS, done: type == "schedule" ? "" : '文件入库成功' })
                , error => dispatch({ type: types.UPLOAD_FILE_FAILURE, error: error.response.body.message }))
    }
}

export function removeFile(fileId, fileName) {
    return dispatch => {
        dispatch({ type: types.REMOVE_FILE_REQUEST });
        if (fileId) {
            return RouteRequest.post('/_upload/cleanup', [fileId])
                .then(_ => dispatch({ type: types.REMOVE_FILE_SUCCESS })
                    , error => dispatch({ type: types.REMOVE_FILE_FAILURE }))
        } else {
            return dispatch({ type: types.REMOVE_FILE_SUCCESS })
        }
    }
}


export function deleteFile(fileId, type) {
    return dispatch => {
        dispatch({ type: types.DELETE_FILE_REQUEST });
        const url = ApiTable.deleteFile.replace('{fileId}', fileId);
        return Request.delete(url)
            .then(_ => dispatch({ type: types.DELETE_FILE_SUCCESS, done: type == "schedule" ? "" : '删除文件成功' })
                , error => dispatch({ type: types.DELETE_FILE_FAILURE, error: '删除文件失败' }))
    }
}
export function addFolder(folder) {
    // return dispatch => {
    //     dispatch({ type: types.ADD_FOLDER_REQUEST });
    //     const url = ApiTable.addFolder;
    //     return Request.post(url, folder)
    //         .then(_ => dispatch({ type: types.ADD_FOLDER_SUCCESS, done: '添加文件夹成功' })
    //             , error => dispatch({ type: types.ADD_PROJECT_FAILURE, error: '添加文件夹失败' }))
    // }

    return (dispatch) => {
        return dispatch({ type: types.ADD_FOLDER_SUCCESS, done: '添加文件夹成功' })
    }
}


export function collectedFile(userId, folderIdFileId, flag) {
    let text = "";
    if (flag) {
        text = "收藏"
    } else {
        text = "取消收藏"
    }
    let fileTypeId = folderIdFileId.split('-')[1];
    let targetId = folderIdFileId.split('-')[2];
    return dispatch => {
        dispatch({ type: types.COLLECTED_FILE_REQUEST });
        let url = "";
        if (flag) {
            url = ApiTable.starFileDirectory.replace('{userId}', userId)
                .replace('{fileTypeId}', fileTypeId).replace('{targetId}', targetId);
        }
        else {
            url = ApiTable.unstarFileDirectory.replace('{userId}', userId)
                .replace('{fileTypeId}', fileTypeId).replace('{targetId}', targetId);
        }
        return Request.post(url, {})
            .then(_ => dispatch({ type: types.COLLECTED_FILE_SUCCESS, done: text + '成功' })
                , error => dispatch({ type: types.COLLECTED_FILE_FAILURE, error: text + '失败' }))
    }
}

export default { getFileList, deleteFile, uploadFile, removeFile, addFolder, collectedFile }