'use strict';
import { Comparison, Association  } from './containers';

export default [{
    type: 'inner',
    route: {
        path: '/analysis',
        key: 'analysis',
        breadcrumb: '实时监控',
        childRoutes: [{
            path: '/comparison',
            key: 'analysis-comparison',
            component: Comparison,
            breadcrumb: '数据对比'
        },{
            path: '/association',
            key: 'analysis-association',
            component: Association,
            breadcrumb: '数据关联'
        }]
    }
}];