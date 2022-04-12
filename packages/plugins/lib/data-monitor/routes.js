'use strict';
import { DeviceMonitor, FactorMonitor  } from './containers';

export default [{
    type: 'inner',
    route: {
        path: '/dataMonitor',
        key: 'dataMonitor',
        breadcrumb: '实时监控',
        childRoutes: [{
            path: '/factor',
            key: 'dataMonitor-factor',
            component: FactorMonitor,
            breadcrumb: '数据监控'
        },{
            path: '/device',
            key: 'dataMonitor-device',
            component: DeviceMonitor,
            breadcrumb: '设备监控'
        }]
    }
}];