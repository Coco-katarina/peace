'use strict';
import { ApiTable } from '$utils';
import { Request } from '@peace/utils';

export const REQUEST_PROJECT = 'REQUEST_PROJECT';
export const GET_PROJECT_SUCCESS = 'GET_PROJECT_SUCCESS';
export const GET_PROJECT_ERROR = 'GET_PROJECT_ERROR';
export function getProjectInfo(pcode) {
    return dispatch => {
        dispatch({ type: REQUEST_PROJECT });

        if (pcode.trim() == '') {
            const action = {
                type: GET_PROJECT_ERROR,
                payload: { error: '项目url缺失' }
            };
            dispatch(action);

            return Promise.resolve(action);
        }

        const url = ApiTable.checkProject.replace('{pcode}', pcode);

        return Request.get(url).then(
            res => {
                sessionStorage.setItem('project', JSON.stringify(Object.assign({}, res, { pcode: pcode })));
                return dispatch({
                    type: GET_PROJECT_SUCCESS,
                    payload: { project: res }
                });
            },
            err => {
                let msg = '域名不正确';
                if (err.status != 404) {
                    msg = '糟糕,访问好像出现了问题'
                }
                return dispatch({
                    type: GET_PROJECT_ERROR,
                    payload: { error: msg }
                });
            }
        );
    };
}

export default {
    getProjectInfo
}
