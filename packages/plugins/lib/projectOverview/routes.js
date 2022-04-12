'use strict';
import { ProjectOverview, } from './containers';

export default [{
    type: 'home',
    route: {
        path: '/projectOverview',
        key: 'projectOverview',
        breadcrumb: '项目总览',
        component: ProjectOverview,
        // 不设置 component 则面包屑禁止跳转
    }
}];