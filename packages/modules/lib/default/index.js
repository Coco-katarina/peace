'use strict';

import routes from './routes';
import reducers from './reducers';
import actions from './actions';
import {getNavItem} from './containers/nav-item';

export default {
    key: 'default',
    name: '总览',
    reducers: reducers,
    routes: routes,
    actions: actions,
    getNavItem: getNavItem
};