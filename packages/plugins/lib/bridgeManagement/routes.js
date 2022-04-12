'use strict';
import { BridgeInfo, PartConfig  } from './containers';

export default [{
    type: 'inner',
    route: {
        path: '/bridge',
        key: 'bridge',
        breadcrumb: '桥梁管理',
        childRoutes: [{
            path: '/info',
            key: 'bridge-info',
            component: BridgeInfo,
            breadcrumb: '桥梁信息管理',
            childRoutes: [{
                path: '/:id',
                key: 'bridge-info-config',
                component: PartConfig,
                breadcrumb: '构建配置'
            }]
        }]
    }
}];