import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/productos:Department',
    name: 'productos',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Productos.vue')
  },
  {
    path: '/viewpro/:ID',
    name: 'viewpro',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Viewpro.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
