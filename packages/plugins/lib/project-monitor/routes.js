'use strict'

import {
    DefaultStructure,
    sturctureSet,
    GlBimSetup,
    StationDeploy2D,
    ThreeDeploy,
} from './containers';

export default [{
    type: 'inner',
    route: {
        breadcrumb: '项目监控',
        path: '/project-monitor',
        component: null,
        key: 'project-monitor',
        childRoutes: [{
            breadcrumb: '结构物配置',
            path: '/structure',
            component: sturctureSet,
            key: 'project-monitor-structure',
            childRoutes: [{
                breadcrumb: '监测对象',
                path: '/things/:id',
                key: 'project-monitor-things',
                exact: false,
                component: DefaultStructure,
            }]
        }]
    }
}, {
    type: 'inner',
    route: {
        breadcrumb: '结构物配置',
        path: '/project-monitor/things/struct/:id/configuration',
        key: 'project-monitor-things-configuration',
        exact: false,
        component: DefaultStructure,
    }
}, {
    type: 'outer',
    route: {
        path: "/project-monitor/things/struct/:id/configuration/2d/deploy/:heatmapId",
        key: 'heatmap-2d',
        component: StationDeploy2D.Deploy
    }
}, {
    type: 'outer',
    route: { 
        path: "/project-monitor/things/struct/:id/configuration/3d/deploy",
        key:'heatmap-3d',
        component: ThreeDeploy 
    }
},{
    type: 'outer',
    route: {
        path: "/project-monitor/things/struct/:id/configuration/bim/glbimedit",
        key: 'glbimedit',
        component: GlBimSetup
    }
},];

