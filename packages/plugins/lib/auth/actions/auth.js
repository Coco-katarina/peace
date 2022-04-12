'use strict';
import { ApiTable } from '$utils'
import { Request } from '@peace/utils'
import Qs from 'qs';

export const INIT_AUTH = 'INIT_AUTH';
export const REQUEST_INIT_AUTH = 'REQUEST_INIT_AUTH';
export function initAuth() {
    const { token } = Qs.parse(document.location.search.replace(/^\?/, ''));
    if (!token) {
        const user = JSON.parse(sessionStorage.getItem('user'));
        return {
            type: INIT_AUTH,
            payload: {
                user: user
            }
        };
    }

    return dispatch => {
        const url = ApiTable.login;
        dispatch({ type: REQUEST_INIT_AUTH });

        return Request.post(url, {
            token
        }).then(user => {
            sessionStorage.setItem('user', JSON.stringify(user));
            return dispatch({ type: INIT_AUTH, payload: { user: user } });
        }, err => {
            const { body } = err.response;
            let msg = body && body.message || '鉴权失败';
            if (err.status != 400) {
                msg = '糟糕,访问好像出现了问题'
            }
            return dispatch({ type: LOGIN_ERROR, payload: { error: msg }, error: msg })
        });
    }
}

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const BINDING_WX = 'BINDING_WX';
export const BINDING_WX_SUCCESS = 'BINDING_WX_SUCCESS';
export const BINDING_WX_ERROR = "BINDING_WX_ERROR";

export function login(username, password, projectId, wxParams) {
    const wxparams = wxParams || '';
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
            p: projectId
        }).then(user => {
            if (!wxparams) {
                sessionStorage.setItem('user', JSON.stringify(user));
                return dispatch({ type: LOGIN_SUCCESS, payload: { user: user } });
            } else {
                //检查要绑定的帐号之前是否绑定了其他帐号
                const checkIsBingingUrl = ApiTable.isRepeatBinding
                    .replace('{userId}', user.id)
                    .replace('{orgType}', 1002)
                    .replace('{unionId}', wxparams.unionId);
                dispatch({ type: BINDING_WX });
                return Request.get(checkIsBingingUrl)
                    .then(res => {
                        const binidingUrl = ApiTable.bindingWx.replace('{userId}', user.id);
                        dispatch({ type: BINDING_WX });
                        Request.put(binidingUrl, wxparams)
                            .then(res => {
                                sessionStorage.setItem('user', JSON.stringify(user));
                                //sessionStorage.setItem('project', localStorage.getItem('p-project'));
                                if (wxparams.openId) {
                                    return dispatch({ type: LOGIN_SUCCESS, payload: { user: user } });
                                }
                                return dispatch({
                                    type: BINDING_WX_SUCCESS,
                                    done: '微信绑定成功',
                                })
                            }
                                , error => dispatch({
                                    type: BINDING_WX_ERROR,
                                    payload: { error: '微信绑定失败,请重试' },
                                }));
                    }, error => dispatch({
                        type: BINDING_WX_ERROR,
                        payload: { error: '该帐号已绑定其他微信' },
                    }))
            }
        }, err => {
            const { body } = err.response;
            let msg = body && body.message || '登录失败';

            if (err.status != 400) {
                msg = '糟糕,访问好像出现了问题'
            }
            return dispatch({ type: LOGIN_ERROR, payload: { error: msg } })
        });
    }
}

export function enter() {
    return dispatch => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        return dispatch({ type: LOGIN_SUCCESS, payload: { user: user } });
    }
}


export const WX_REQUEST_LOGIN = 'WX_REQUEST_LOGIN';
export const WX_LOGIN_SUCCESS = 'WX_LOGIN_SUCCESS';
export const WX_LOGIN_ERROR = 'WX_LOGIN_ERROR';
export function wxLogin(unionId, pcode) {
    return dispatch => {
        dispatch({ type: WX_REQUEST_LOGIN });

        const url = ApiTable.wxLogin;

        return Request.post(url, {
            unionId: unionId,
            pcode: pcode
        }).then(user => {
            sessionStorage.setItem('user', JSON.stringify(user));
            return dispatch({ type: WX_LOGIN_SUCCESS, payload: { user: user } });
        }, err => {
            const { body } = err.response;
            let msg = body && body.message || '登录失败';
            if (err.status != 400 && err.status != 403) {
                msg = '糟糕,访问好像出现了问题'
            }
            return dispatch({ type: WX_LOGIN_ERROR, payload: { error: msg, errStatus: err.status } })
        });
    }
}

export const LOGOUT = 'LOGOUT';
export function logout(user) {
    const token = user.token;
    const userId = user.id;
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('selectedKeys');
    const url = ApiTable.logout;
    Request.post(url, { token: token, userId });
    return { type: LOGOUT };
}

export default {
    initAuth,
    login,
    logout,
    wxLogin,
    enter
}
