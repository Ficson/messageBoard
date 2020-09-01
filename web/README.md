# admin-test

## 项目安装依赖包
```
npm install
```

### 启动项目
```
npm run serve
```

### 项目打包

测试环境打包：

```
npm run build:sit
```

生产环境打包：

```
npm run build:prod
```

### 路由基本格式

```
{
  path: 'xxx', // 根路径
  name: 'xxx', // name值
  component: 'xxx', // 根组件
  meta: {
    title: 'xxx', // sidebar显示的标题
    roles: [1, 2, 3, 4] // 权限：类型是数组，表示有哪些权限可以显示该路由
  },
  hidden: boolean, // 是否隐藏
  alwaysShow: boolean, // 是否显示el-submenu，如果为false时，并且只有一个孩子，就只显示该孩子
  children: [
    {
      path: 'xxx',
      component: xxx,
      name: 'xxx',
      meta: {
        title: xxx,
        roles: [1, 2, 3, 4],
        activeMenu: '/management_platform/data_statistics' // 当hidden为true是才生效：表示进入该路由时侧边栏活跃的哪个
      },
      hidden: boolean
    }
  ]
}
```

- 不设置roles时，表示该路由没有权限，任何人都可看

### Axios:

- 代码内未登录的状态码是20003，可根据后端修改
- 当是post请求时，isqs可设置为true，此时传参的类型是formData

### IconFont:

1. 可直接从iconfont上下载svg图片
2. 调用SvgIcon组件，icon-class为svg的名称，可自定义class，改变其大小

实例：

```
<svg-icon icon-class="404" class="icon404"/>
```