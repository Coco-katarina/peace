'use strict'

import {  Organization, Construction } from './containers';
export default [
    {
        type: 'inner',
        route: {
            path: '/smartSite',
            exact: true,
            component: null,
            breadcrumbName: '智慧工地',
            childRoutes: [
                {
                    breadcrumbName: '机构管理',
                    key:'smartSite/organization',
                    path: '/organization',
                    component: Organization
                },
                {
                    breadcrumbName: '工地管理',
                    path: '/construction',
                    key: 'smartSite/construction',
                    component: Construction
                }
            ]
        }
    }
];