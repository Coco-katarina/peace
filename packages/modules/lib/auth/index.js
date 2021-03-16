/**
 * User: liuxinyi/liu.xinyi@free-sun.com.cn
 * Date: 2015/12/29
 * Time: 16:14
 *
 */
'use strict';

import routes from './routes';
import reducers from './reducers';
import actions from './actions';

export default {
    key: 'auth',
    name: '权限管理',
    reducers: reducers,
    routes: routes,
    actions: actions
};