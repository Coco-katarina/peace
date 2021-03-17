'use strict';

import routes from './routes';
import reducers from './reducers';
import actions from './actions';
import { getNavItem } from './containers/nav-item';

export default {
    key: 'analysis',
    name: '数据分析',
    reducers: reducers,
    routes: routes,
    actions: actions,
    getNavItem: getNavItem
};