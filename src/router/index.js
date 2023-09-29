import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/search', component: () => import('@/views/search') },
    { path: '/searchlist', component: () => import('@/views/search/list') },
    { path: '/prodetail/:id', component: () => import('@/views/prodetail') },
    { path: '/pay', component: () => import('@/views/pay') },
    { path: '/myorder', component: () => import('@/views/myorder') },
    { path: '/address', component: () => import('@/views/address') },
    { path: '/addaddress', component: () => import('@/views/address/addAddress') },
    { path: '/editaddress', component: () => import('@/views/address/editAddress') }
  ]
})

// 全局守卫
// to: 到哪去
// from: 去哪里
// next: 是否放行
//    next()直接放行     next(路径)  进行拦截，拦截到 (跳转) 路径

const authUrls = ['/pay', '/myorder', '/address'] // 定义数组，存放需要权限的页面

router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    next()
    return
  }

  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
