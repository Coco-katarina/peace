/**
 * Created by yuanfenghua on 2018/7/13.
 */
'use strict'

import routes from './routes';
import reducers from './reducers';
import actions from './actions';
import {getNavItem} from './containers/nav-item';

export default {
    key: 'monitorModel',
    name: '监测模型',
    reducers: reducers,
    routes: routes,
    actions: actions,
    getNavItem: getNavItem
};