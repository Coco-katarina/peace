'use strict';
import { AggregateContainer, ReportConfig, Contrast, Correlation, AbnPushCfg, DataCalc } from './containers';

export default [
    {
        type: 'inner',
        route: {
            key: 'analysis',
            path: '/analysis',
            component: null,
            breadcrumbName: '数据服务',
            childRoutes: [
                {
                    key: 'aggregate',
                    breadcrumbName: '聚集配置',
                    path: '/aggregate',
                    component: AggregateContainer
                },
                {
                    key: 'reportConfig',
                    breadcrumbName: '报表生成',
                    path: '/reportConfig',
                    component: ReportConfig
                },
                {
                    key: 'contrast',
                    breadcrumbName: '数据对比',
                    path: '/contrast',
                    component: Contrast
                },
                {
                    breadcrumbName: '数据关联',
                    path: '/correlation',
                    component: Correlation
                },
                {
                    breadcrumbName: '异常推送配置',
                    key: 'abnPushCfg',
                    path: '/abnPushCfg',
                    component: AbnPushCfg
                },
                {
                    breadcrumbName: '数据计算',
                    path: '/calc',
                    component: DataCalc//todo
                }
            ]
        }
    }
];