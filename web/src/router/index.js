import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import Home from '@/views/front'

Vue.use(VueRouter)

// {
//   path: 'xxx', // 根路径
//   name: 'xxx', // name值
//   component: 'xxx', // 根组件
//   meta: {
//     title: 'xxx', // sidebar显示的标题
//     roles: [1, 2, 3, 4] // 权限：类型是数组，表示有哪些权限可以显示该路由
//   },
//   hidden: boolean, // 是否隐藏
//   alwaysShow: boolean, // 是否显示el-submenu，如果为false时，并且只有一个孩子，就只显示该孩子
//   children: [
//     {
//       path: 'xxx',
//       component: xxx,
//       name: 'xxx',
//       meta: {
//         title: xxx,
//         roles: [1, 2, 3, 4],
//         activeMenu: '/Management/data_statistics' // 当hidden为true是才生效：表示进入该路由时侧边栏活跃的哪个
//       },
//       hidden: boolean
//     }
//   ]
// }

export const menuRoutes = [
  {
    path: '/myMessageManage',
    name: 'MyMessageManage',
    component: Layout,
    meta: {title: '我的留言', roles: [1, 2]},
    alwaysShow: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/menu/MyMessages'),
        name: 'MyMessages',
        meta: {title: '我的留言', roles: [1, 2]},
      },
    ],
  },
  {
    path: '/userManage',
    name: 'UserManage',
    component: Layout,
    meta: {title: '用户列表', roles: [1]},
    alwaysShow: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/menu/UserList'),
        name: 'UserList',
        meta: {title: '用户列表', roles: [1]},
      },
    ],
  },
  {
    path: '/permissionManage',
    name: 'PermissionManage',
    component: Layout,
    meta: {title: '权限管理', roles: [1]},
    alwaysShow: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/menu/Permission'),
        name: 'Permission',
        meta: {title: '权限管理', roles: [1]},
      },
    ],
  },
  {
    path: '/contentManage',
    name: 'ConetentManage',
    component: Layout,
    meta: {title: '内容管理', roles: [1]},
    alwaysShow: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/menu/ContentManager/MessageList'),
        name: 'MessageList',
        meta: {title: '留言列表', roles: [1]},
      },
      {
        path: 'CategoryList',
        component: () => import('@/views/menu/ContentManager/CategoryList'),
        name: 'CategoryList',
        meta: {title: '类型列表', roles: [1]},
      },
    ],
  },
  {
    path: '/personalManage',
    name: 'PersonalManage',
    component: Layout,
    meta: {title: '个人中心', roles: [1, 2]},
    alwaysShow: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/menu/PersonalCenter'),
        name: 'PersonalCenter',
        meta: {title: '个人中心', roles: [1, 2]},
      },
    ],
  },

  {
    path: '/testManage',
    name: 'TestManage',
    component: Layout,
    meta: {title: '测试', roles: [1, 2]},
    alwaysShow: false,
    children: [
      {
        path: 'index',
        component: () => import('@/views/menu/Test/index.vue'),
        name: 'index',
        meta: {title: '测试', roles: [1, 2]},
        hidden: true,
      },
    ],
  },
  {
    path: '*',
    component: () => import('@/views/err/404'),
  },
]

export const baseRoutes = [
  {
    path: '/front',
    name: 'front',
    component: Home,
    meta: {title: '前台'},
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/front/home'),
        meta: {title: '首页'},
        alwaysShow: true,
      },
      {
        path: 'message',
        name: 'Message',
        component: () => import('@/views/front/message'),
        meta: {title: '留言板'},
        alwaysShow: true,
      },
      {
        path: 'article',
        name: 'Article',
        component: () => import('@/views/front/article'),
        meta: {title: '文章'},
        alwaysShow: true,
      },
      {
        path: 'activity',
        name: 'Activity',
        component: () => import('@/views/front/activity'),
        meta: {title: '活动'},
        alwaysShow: true,
      },
    ],
    alwaysShow: true,
  },
  ,
  {
    path: '/',
    redirect: '/front/home',
    hidden: true,
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  // {
  //   path: '/404',
  //   component: () => import('@/views/err/404'),
  //   hidden: true
  // },
  {
    path: '/403',
    component: () => import('@/views/err/404'),
    hidden: true,
  },
]

const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({y: 0}),
    routes: baseRoutes,
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
