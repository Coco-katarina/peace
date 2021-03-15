'use strict';

import routes from './routes';
import reducers from './reducers';
import actions from './actions';
import { getNavItem } from './containers/nav-item';

export default {
    key: 'notification',
    name: '消息',
    reducers: reducers,
    routes: routes,
    actions: actions,
    getNavItem: getNavItem
};