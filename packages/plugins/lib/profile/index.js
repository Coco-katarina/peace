'use strict';

import routes from './routes';
import reducers from './reducers';
import actions from './actions';

export default {
    key: 'profile',
    name: '个人设置',
    reducers: reducers,
    routes: routes,
    actions: actions    
};