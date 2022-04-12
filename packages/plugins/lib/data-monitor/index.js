'use strict';

import reducers from './reducers';
import routes from './routes';
import actions from './actions';
import { getNavItem } from './nav-item';

export default {
    key: 'dataMonitor',
    name: '实时监控',
    reducers: reducers,
    routes: routes,
    actions: actions,
    getNavItem: getNavItem
};