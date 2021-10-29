'use strict';

import { ApiTable } from '$utils'
import { Request } from '@peace/utils'

export const REQUEST_DOMAIN = 'REQUEST_DOMAIN';
export const GET_DOMAIN_SUCCESS = 'GET_DOMAIN_SUCCESS';
export const GET_DOMAIN_ERROR = 'GET_DOMAIN_ERROR';
export function getDomainInfo(domain) {
    return dispatch => {
        dispatch({ type: REQUEST_DOMAIN });

        if (domain.trim() == '' || !/^[a-z][a-z0-9]{0,19}$/.test(domain)) {
            dispatch({
                type: GET_DOMAIN_ERROR,
                payload: { error: '输入有效的企业域名' }
            });
            return Promise.resolve();
        }

        const url = ApiTable.checkDomain.replace('{domain}', domain);

        return Request.get(url).then(
            res => {
                return dispatch({
                    type: GET_DOMAIN_SUCCESS,
                    payload: { domain: res }
                });
            },
            err => {
                let msg = '域名不正确';
                if (err.status != 404) {
                    msg = '糟糕,访问好像出现了问题'
                }
                return dispatch({
                    type: GET_DOMAIN_ERROR,
                    payload: { error: msg }
                });
            }
        );
    };
}

export default {
    getDomainInfo
}