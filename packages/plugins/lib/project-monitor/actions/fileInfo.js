/**
 * Created by zmh on 2017/6/19.
 */
'use strict'
import * as types from '../constants/fileInfo';
import { Request, RouteRequest } from '@peace/utils'

import { ApiTable } from '$utils'

export function uploadFile(userId, fileInfo, type) {
    return dispatch => {
        dispatch({ type: UPLOAD_FILE_REQUEST });
        const url = ApiTable.uploadFile.replace('{userId}', userId)
        return Request.post(url, fileInfo)
            .then(_ => dispatch({ type: UPLOAD_FILE_SUCCESS, done: type == "schedule" ? "" : '文件入库成功' })
                , error => dispatch({ type: UPLOAD_FILE_FAILURE, error: error.response.body.message }))
    }
}

export function removeFile(fileId, fileName) {
    return dispatch => {
        dispatch({ type: REMOVE_FILE_REQUEST });
        if (fileId) {
            return RouteRequest.post('/_upload/cleanup', [fileId])
                .then(_ => dispatch({ type: REMOVE_FILE_SUCCESS })
                    , error => dispatch({ type: REMOVE_FILE_FAILURE }))
        } else {
            return dispatch({ type: REMOVE_FILE_SUCCESS })
        }
    }
}


export function deleteFile(fileId, type) {
    return dispatch => {
        dispatch({ type: DELETE_FILE_REQUEST });
        const url = ApiTable.deleteFile.replace('{fileId}', fileId);
        return Request.delete(url)
            .then(_ => dispatch({ type: DELETE_FILE_SUCCESS, done: type == "schedule" ? "" : '删除文件成功' })
                , error => dispatch({ type: DELETE_FILE_FAILURE, error: '删除文件失败' }))
    }
}

export default {
    deleteFile, uploadFile, removeFile,
}