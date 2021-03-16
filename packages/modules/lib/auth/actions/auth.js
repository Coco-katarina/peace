/**
 * Created by liu.xinyi
 * on 2016/3/31.
 */
'use strict';
import { Request } from '@peace/utils';
import { ApiTable } from '$utils'

export const INIT_AUTH = 'INIT_AUTH';
export function initAuth() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return {
        type: INIT_AUTH,
        payload: {
            user: user
        }
    };
}

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export function login(username, password, domain) {
    return dispatch => {
        dispatch({ type: REQUEST_LOGIN });

        if (!username || !password) {
            dispatch({
                type: LOGIN_ERROR,
                payload: { error: '输入信息不完整' }
            });
            return Promise.resolve();
        }

        const url = ApiTable.login;

        return Request.post(url, {
            username: username,
            password: password,
            domain: domain
        }).then(user => {
            sessionStorage.setItem('user', JSON.stringify(user));
            return dispatch({ type: LOGIN_SUCCESS, payload: { user: user } });
        }, err => {
            let msg = '糟糕,访问好像出现了问题';
            if (err.status == 400 && err.response.body && err.response.body.message) {
                msg = err.response.body.message
            }
            return dispatch({ type: LOGIN_ERROR, payload: { error: msg } })
        });
    }
}

export const LOGOUT = 'LOGOUT';
export function logout(user) {
    const token = user.token;
    sessionStorage.removeItem('user');
    const url = ApiTable.logout;
    Request.post(url, { token: token });
    return { type: LOGOUT };
}

export default {
    initAuth,
    login,
    logout
}