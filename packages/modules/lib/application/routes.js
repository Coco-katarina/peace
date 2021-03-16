'use strict';
import { PublishedApp, ReviewedApp, UnreviewedApp, WillreviewedApp, WholeApp } from './containers';

export default [{
    type: 'inner',
    route: {
        path: '/project',
        key: 'project',
        component: null,
        breadcrumbName: '项目管理',
        childRoutes: [{
            path: '/all',
            key: 'all',
            component: WholeApp,
            breadcrumbName: '全部项目',
        }, {
            breadcrumbName: '待发审',
            path: '/willreviewed',
            component: WillreviewedApp
        }, {
            breadcrumbName: '待审核',
            path: '/unreviewed',
            component: UnreviewedApp
        }, {
            breadcrumbName: '已审核',
            path: '/reviewed',
            component: ReviewedApp
        }, {
            breadcrumbName: '已发布',
            path: '/published',
            component: PublishedApp
        }]
    }
}];