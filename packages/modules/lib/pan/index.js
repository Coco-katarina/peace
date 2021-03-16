'use strict';

import routes from './routes';
import reducers from './reducers';
import actions from './actions';

export default {
    key: 'pan',
    name: '文档管理',
    reducers: reducers,
    routes: routes,
    actions: actions,
};