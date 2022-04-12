'use strict';
import { profileContainer } from './containers';

export default [
    {
        type: 'inner',
        route: {
            path: '/profile',
            key: 'profile',
            breadcrumb: '个人设置',
            component: profileContainer
        }
    }
];