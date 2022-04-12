'use strict';
import { SingleProjectOverview, } from './containers';

export default [{
    type: 'home',
    route: {
        path: '/singleProjectOverview',
        key: 'singleProjectOverview',
        breadcrumb: '单个项目总览',
        component: SingleProjectOverview,
        // 不设置 component 则面包屑禁止跳转
    }
}];