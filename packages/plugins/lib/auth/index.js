'use strict';

import routes from './routes';
import reducers from './reducers';
import actions from './actions';

export default {
    key: 'auth',
    reducers: reducers,
    routes: routes,
    actions: actions
};