import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout';

const login = _import('login/login');

Vue.use(Router)

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录'
    },
    hidden: true,
    component: resolve => {
      require(['../views/login/login.vue'], resolve);
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{path: 'dashboard', title: 'home', name: 'home_index', component: _import('dashboard/index')}]
  }
];


export const otherRouterMap = [
  {
    path: '/test',
    icon: 'social-codepen-outline',
    name: 'test',
    title: '交易明细',
    component: Layout,
    redirect: '/test/index',
    children: [{
      path: 'index',
      icon: 'social-codepen-outline',
      title: '测试管理',
      name: 'test',
      component: () => import('@/views/sys/test/index')
    }]
  },
  // {
  //   path: '/bug',
  //   icon: 'ios-keypad',
  //   name: 'bug',
  //   title: '缺陷管理',
  //   component: Layout,
  //   redirect: '/bug/index',
  //   children: [{path: 'index',  icon: 'compose',title: '缺陷管理', name: 'bug', component: () => import('@/views/sys/bug/index')}]
  // },
  {
    path: '/menus',
    icon: 'social-codepen',
    name: 'menus',
    title: '模拟接口',
    component: Layout,
    redirect: '/menus/index',
    children: [{
      path: 'index',
      icon: 'social-codepen',
      title: '模拟接口',
      name: 'menus',
      component: () => import('@/views/sys/menus/index')
    }]
  },
  {
    path: '/document',
    icon: 'navicon',
    name: 'document',
    title: '文档管理',
    component: Layout,
    redirect: '/document/web',
    children: [{
      path: 'web',
      icon: 'compose',
      title: '网站管理',
      name: 'web',
      component: () => import('@/views/sys/document/web')
    },
      {
        path: 'code',
        icon: 'compose',
        title: '代码管理',
        name: 'code',
        component: () => import('@/views/sys/document/code')
      },
      {
        path: 'autocomplete',
        icon: 'compose',
        title: '自动完成',
        name: 'autocomplete',
        component: () => import('@/views/sys/document/autocomplete')
      }]
  },
];

export default new Router({
  // mode: 'history', //后端支持可开
  mode: 'hash', //打包后执行的
  scrollBehavior: () => ({y: 0}),
  routes: [
    ...constantRouterMap,
    ...otherRouterMap]
})

