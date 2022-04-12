'use strict';
import { DataCheck, DataReport, DataDownload  } from './containers';

export default [{
    type: 'inner',
    route: {
        path: '/dataService',
        key: 'dataService',
        breadcrumb: '实时监控',
        childRoutes: [{
            path: '/check',
            key: 'dataService-check',
            component: DataCheck,
            breadcrumb: '数据查询'
        },{
            path: '/report',
            key: 'dataService-report',
            component: DataReport,
            breadcrumb: '报表'
        },{
            path: '/download',
            key: 'dataService-download',
            component: DataDownload,
            breadcrumb: '数据下载'
        }]
    }
}];