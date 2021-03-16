/**
 * Created by yuanfenghua on 2018/7/13.
 */
'use strict'

import { CustomFactor,FactorTemplate,StructType } from './containers';
export default [
    {
        type: 'inner',
        route: {
            path: '/monitorModel',
            exact: true,
            component: null,
            key: 'monitor-model',
            breadcrumbName:'监测模型',
            childRoutes: [
                {
                    breadcrumbName: '监测因素',
                    path: '/factor',
                    key: 'monitor-model/factor',
                    component: CustomFactor
                },
                {
                    breadcrumbName: '监测模板',
                    path: '/template',
                    key: 'monitor-model/template',
                    component: FactorTemplate
                },
                {
                    breadcrumbName: '结构物类型',
                    path: '/type',
                    key: 'monitor-model/type',
                    component: StructType
                }
            ]
        }
    }
];