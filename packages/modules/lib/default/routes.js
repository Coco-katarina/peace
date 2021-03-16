'use strict';
import { Default } from './containers';

export default [{
    type: 'home',
    route: {
        path: '/',
        key: 'home',
        exact: true,
        component: Default,
        breadcrumbName: '总览',
    }
}];