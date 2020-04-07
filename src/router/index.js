import Vue from 'vue'
import VueRouter from 'vue-router'
import BlogHome from '@/views/BlogHome'

Vue.use(VueRouter)

const routes = [
  {
    path: '/posts',
    name: 'blog-home',
    component: BlogHome
  },
  {
    path: '/posts/:id',
    name: 'blog-post',
    component: () => import('@/views/BlogPost')
  },
  {
    path: '/',
    redirect: '/posts'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
