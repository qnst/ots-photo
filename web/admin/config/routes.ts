﻿/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'DashboardOutlined',
    component: './core/Dashboard',
  },
  {
    name: 'Mnt',
    icon: 'DatabaseOutlined',
    path: '/mnt',
    routes: [
      {
        name: 'top-img',
        icon: 'CloudSyncOutlined',
        path: '/mnt/top-img',
        component: './mnt/top-img',
      },
      {
        name: 'category',
        icon: 'CloudSyncOutlined',
        path: '/mnt/category',
        component: './mnt/category',
      },
      // {
      //   name: 'price',
      //   icon: 'CloudSyncOutlined',
      //   path: '/mnt/price',
      //   component: './mnt/price',
      // },
      {
        name: 'booking',
        icon: 'CloudSyncOutlined',
        path: '/mnt/booking',
        component: './mnt/booking',
      },
      {
        name: '',
        path: '/mnt',
        redirect: '/mnt/top-img',
      },
    ],
  }, 
  // {
  //   name: 'Platform',
  //   icon: 'DatabaseOutlined',
  //   path: '/plt',
  //   routes: [
  //     {
  //       name: 'user',
  //       icon: 'CloudSyncOutlined',
  //       path: '/plt/user',
  //       component: './plt/user',
  //     }, 
  //     {
  //       name: '',
  //       path: '/plt',
  //       redirect: '/plt/user',
  //     },
  //   ],
  // }, 
  // {
  //   name: 'Development',
  //   icon: 'DatabaseOutlined',
  //   path: '/dev',
  //   routes: [
  //     {
  //       name: 'dsh',
  //       icon: 'CloudSyncOutlined',
  //       path: '/dev/dsh',
  //       component: './dev/dsh',
  //     }, 
  //     {
  //       name: 'open',
  //       icon: 'AlignLeftOutlined',
  //       path: '/dev/open',
  //       routes: [
  //         {
  //           name: 'dsh',
  //           icon: 'CloudDownloadOutlined',
  //           path: '/dev/open/dsh',
  //           component: './dev/open/dsh', 
  //         } 
  //       ]
  //     }, 
  //     {
  //       name: '',
  //       path: '/dev',
  //       redirect: '/dev/dsh',
  //     },
  //   ],
  // },
  // {
  //   name: 'Entertainment',
  //   icon: 'DatabaseOutlined',
  //   path: '/ent',
  //   routes: [
  //     {
  //       name: 'dsh',
  //       icon: 'CloudSyncOutlined',
  //       path: '/ent/dsh',
  //       component: './ent/dsh',
  //     }, 
  //     {
  //       name: '',
  //       path: '/ent',
  //       redirect: '/ent/dsh',
  //     },
  //   ],
  // },
  // {
  //   name: 'Svtist',
  //   icon: 'DatabaseOutlined',
  //   path: '/svt',
  //   routes: [
  //     {
  //       name: 'dsh',
  //       icon: 'CloudSyncOutlined',
  //       path: '/svt/dsh',
  //       component: './svt/dsh',
  //     }, 
  //     {
  //       name: '',
  //       path: '/svt',
  //       redirect: '/svt/dsh',
  //     },
  //   ],
  // },
  // {
  //   name: 'EDF',
  //   icon: 'DatabaseOutlined',
  //   path: '/edf',
  //   routes: [
  //     {
  //       name: 'app',
  //       icon: 'AppstoreAddOutlined',
  //       path: '/edf/app',
  //       component: './edf/app',
  //     },
  //     {
  //       name: 'sch',
  //       icon: 'OrderedListOutlined',
  //       path: '/edf/sch',
  //       routes: [
  //         {
  //           name: 'job',
  //           icon: 'CloudDownloadOutlined',
  //           path: '/edf/sch/job',
  //           component: './edf/sch/job',
  //           // hideInMenu: true,
  //         },
  //         {
  //           name: 'job-param',
  //           icon: 'CloudDownloadOutlined',
  //           path: '/edf/sch/job-param',
  //           component: './edf/sch/job-param',
  //         },
  //         {
  //           name: 'job-run-history',
  //           icon: 'CloudDownloadOutlined',
  //           path: '/edf/sch/job-run-history',
  //           component: './edf/sch/job-run-history',
  //         },
  //         {
  //           name: 'job-temp',
  //           icon: 'CloudDownloadOutlined',
  //           path: '/edf/sch/job-temp',
  //           component: './edf/sch/job-temp',
  //         },
  //         {
  //           name: 'job-type',
  //           icon: 'CloudDownloadOutlined',
  //           path: '/edf/sch/job-type',
  //           component: './edf/sch/job-type',
  //         },
  //         {
  //           name: '',
  //           path: '/edf/sch',
  //           redirect: '/edf/sch/job',
  //         },
  //       ]
  //     },
  //     // {
  //     //   name: 'sch',
  //     //   icon: 'NodeExpandOutlined',
  //     //   path: '/edf/sch',
  //     //   routes: [
  //     //     {
  //     //       name: 'job',
  //     //       icon: 'CloudDownloadOutlined',
  //     //       path: '/edf/sch/job',
  //     //       component: './edf/sch/job',
  //     //       // hideInMenu: true,
  //     //     },
  //     //     {
  //     //       name: 'job-param',
  //     //       icon: 'CloudDownloadOutlined',
  //     //       path: '/edf/sch/job-param',
  //     //       component: './edf/sch/job-param',
  //     //     },
  //     //     {
  //     //       name: 'job-run-history',
  //     //       icon: 'CloudDownloadOutlined',
  //     //       path: '/edf/sch/job-run-history',
  //     //       component: './edf/sch/job-run-history',
  //     //     },
  //     //     {
  //     //       name: 'job-temp',
  //     //       icon: 'CloudDownloadOutlined',
  //     //       path: '/edf/sch/job-temp',
  //     //       component: './edf/sch/job-temp',
  //     //     },
  //     //     {
  //     //       name: 'job-type',
  //     //       icon: 'CloudDownloadOutlined',
  //     //       path: '/edf/sch/job-type',
  //     //       component: './edf/sch/job-type',
  //     //     },
  //     //     {
  //     //       name: '',
  //     //       path: '/edf/sch',
  //     //       redirect: '/edf/sch/job',
  //     //     },
  //     //   ]
  //     // },
  //     // {
  //     //   name: 'sch',
  //     //   icon: 'NodeExpandOutlined',
  //     //   path: '/edf/sch',
  //     //   routes: [
  //     //     {
  //     //       name: 'job',
  //     //       icon: 'CloudDownloadOutlined',
  //     //       path: '/edf/sch/job',
  //     //       component: './edf/sch/job',
  //     //       // hideInMenu: true,
  //     //     },
  //     //     {
  //     //       name: 'job-param',
  //     //       icon: 'CloudDownloadOutlined',
  //     //       path: '/edf/sch/job-param',
  //     //       component: './edf/sch/job-param',
  //     //     },
  //     //     {
  //     //       name: 'job-run-history',
  //     //       icon: 'CloudDownloadOutlined',
  //     //       path: '/edf/sch/job-run-history',
  //     //       component: './edf/sch/job-run-history',
  //     //     },
  //     //     {
  //     //       name: 'job-temp',
  //     //       icon: 'CloudDownloadOutlined',
  //     //       path: '/edf/sch/job-temp',
  //     //       component: './edf/sch/job-temp',
  //     //     },
  //     //     {
  //     //       name: 'job-type',
  //     //       icon: 'CloudDownloadOutlined',
  //     //       path: '/edf/sch/job-type',
  //     //       component: './edf/sch/job-type',
  //     //     },
  //     //     {
  //     //       name: '',
  //     //       path: '/edf/sch',
  //     //       redirect: '/edf/sch/job',
  //     //     },
  //     //   ]
  //     // },
  //     {
  //       name: '',
  //       path: '/edf',
  //       redirect: '/edf/app',
  //     },
  //   ],
  // },
  {
    path: '/',
    redirect: '/mnt/category',
  },
  {
    path: '*',
    layout: false,
    component: './core/404',
  },
];
