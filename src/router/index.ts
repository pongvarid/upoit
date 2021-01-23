import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import { userRouter } from './user'
import { adminRouter } from './admin'
import {rootRouter}  from './root'
Vue.use(VueRouter)

 
const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: () => import('@/views/root/Base.vue'),
    children: rootRouter
  },
  {
    path: "/user/",
    component: () => import('@/views/user/Base.vue'),
    children: userRouter
  },
  {
    path: "/admin/",
    component: () => import('@/views/admin/Base.vue'),
    children: adminRouter
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
