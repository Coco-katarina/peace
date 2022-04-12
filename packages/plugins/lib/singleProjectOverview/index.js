'use strict';

import reducers from './reducers';
import routes from './routes';
import actions from './actions';
import { getNavItem } from './nav-item';

export default {
    key: 'singleProjectOverview',
    name: '单个项目总览',
    reducers: reducers,
    routes: routes,
    actions: actions,
    getNavItem: getNavItem
};