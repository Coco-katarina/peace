'use strict';
import { ApiTable } from '$utils';
import { Request } from '@peace/utils';

export const REQUEST_RESET_PASSWORD = 'REQUEST_RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';
export function resetPwd(pcode, phone, code, password) {
    return dispatch => {
        dispatch({ type: REQUEST_RESET_PASSWORD });

        const url = ApiTable.resetPwd;

        return Request.post(url, {
            p: pcode,
            phone: phone,
            code: code,
            password: password
        }).then(res => {            
            return dispatch({
                type: RESET_PASSWORD_SUCCESS,
                payload: { res: res }
            });
        }, err => {
            let msg = '密码重置失败';
            if (err.status != 400) {
                msg = '糟糕,访问好像出现了问题'
            }
            return dispatch({
                type: RESET_PASSWORD_ERROR,
                payload: { error: msg }                
            });
        });
    };
}
export default {
    resetPwd
}