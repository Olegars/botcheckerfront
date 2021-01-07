import { createRouter, createWebHistory } from 'vue-router'
import frontPage from '../views/frontPage.vue'
import publicPart from '../views/publicPart'

const routes = [
  {
    path: '/',
    name: 'publicPart',
    component: publicPart,
    children: [
      {
        path: 'home',
        component: frontPage,
        name: 'home',
        meta: { title: 'Главная', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
