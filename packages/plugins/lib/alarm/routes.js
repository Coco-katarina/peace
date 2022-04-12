'use strict';
import { AlarmList, AlarmStrategy  } from './containers';

export default [{
    type: 'inner',
    route: {
        path: '/alarm',
        key: 'alarm',
        breadcrumb: '告警管理',
        childRoutes: [{
            path: '/list',
            key: 'alarm-list',
            component: AlarmList,
            breadcrumb: '告警信息',
            
        },{
            path: '/strategy',
            key: 'alarm-strategy',
            component: AlarmStrategy,
            breadcrumb: '告警策略配置',
            
        }]
    }
}];