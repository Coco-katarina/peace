# @peace/workflow 工作流部分组件 

## 一、Synopsis 
提供工作流表单组件、action、reducer、utils


## 二、Installation 

### Node.js
@peace/workflow is available on npm. To install it, type:

`npm install @peace/workflow`


## 三、Usage 

### Native API 服务 

```jsx
'use strict';
import { ApiTable, RouteTable } from './webapi'
import { utils } from '@peace/workflow';
import { buildFormSchemaByDataSourceUrl } from '@peace/workflow/lib/utils/buildFormSchemaByDataSourceUrl'

const { Func } = utils;
export {
    Func,
    ApiTable, RouteTable,
    buildFormSchemaByDataSourceUrl
}
```
