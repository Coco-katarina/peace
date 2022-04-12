'use strict';
import { Organization, Members, Roles, Log } from './containers';

export default [{
    type: 'inner',
    route: {
        path: '/system',
        key: 'system',
        breadcrumb: '系统管理',
        childRoutes: [{
            path: '/organization',
            key: 'system-organization',
            component: Organization,
            breadcrumb: '组织管理'
        }, {
            path: '/members',
            key: 'system-members',
            component: Members,
            breadcrumb: '用户管理'
        }, {
            path: '/roles',
            key: 'system-roles',
            component: Roles,
            breadcrumb: '角色管理'
        }, {
            path: '/log',
            key: 'system-log',
            component: Log,
            breadcrumb: '系统日志'
        }]
    }
}];