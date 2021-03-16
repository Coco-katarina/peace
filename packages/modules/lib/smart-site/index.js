/**
 * Created by wuqun on 2018/7/16.
 */
'use strict'

import routes from './routes';
import reducers from './reducers';
import actions from './actions';
import { getNavItem } from './containers/nav-item';

export default {
    key: 'smartSite',
    name: '智慧工地',
    reducers: reducers,
    routes: routes,
    actions: actions,
    getNavItem: getNavItem
};