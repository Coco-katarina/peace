# `@peace/plugins`

> 安心云插件模块库，目前包含 项目总览、单个项目总览、桥梁管理 auth模块、实时监控、数据服务、告警管理、评估分析、项目配置、系统管理

## 使用
在app.js 引入模块 插入到sections 数组中

```
import { 
    Auth, 
    System, 
    ProjectOverview, 
    SingleProjectOverview, 
    ProjectMonitor, 
    BridgeManagement,
    DataMonitor,
    EvaluationAnalysis,
    DataService,
    Alarm,
    Profile
} from '@peace/plugins';

const App = props => {
    const { projectName } = props

    useEffect(() => {
        document.title = projectName;
    }, [])

    return (
        <Layout
            title={projectName}
            sections={[
                Auth, 
                ProjectOverview, 
                SingleProjectOverview, 
                BridgeManagement,
                DataMonitor,
                DataService, 
                Alarm,
                EvaluationAnalysis,
                ProjectMonitor, 
                System,
                Profile
            ]}
        />
    )
}

export default App;

```
# 开发

1、全局安装lerna

```
npm i lerna -g

```
2、进入peace 目录，初始化lerna

```
lerna init

```

3、进入 packages/plugins 目录，通过npm link 把插件加载到全局node_modules
```
npm link 

```

4、进入实际开发项目web下 ,通过下面命令 链接到上一步的目录下
```
npm link @peace/plugins 

```

5、修改插件代码，即可看到最新代码效果。

# 发布

1、 whoami 可查看当前登录公司仓库 账号，第一次发布需要登陆
```
npm whoami

```
2、package.json 版本号增加，要与目前的仓库版本号不一致。

3、 使用npm publish 发布
```
npm publish

```
