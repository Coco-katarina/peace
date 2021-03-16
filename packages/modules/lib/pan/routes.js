'use strict';
import { Default } from './containers';

export default [
    {
        type: 'inner',
        route: {
            path: '/cloud/files',
            key: 'pan',
            breadcrumbName: '文档管理',
            component: Default
        }
    }
];
