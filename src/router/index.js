import { createRouter, createWebHistory } from '@ionic/vue-router';

//import MemoriesPage from '../pages/MemoriesPage.vue';
import HomePage from '../pages/HomePage.vue'
const routes = [
  /*{
    path: '/',
    redirect: '/memories'
  },
  {
    path: '/memories',
    component: MemoriesPage
  },
  {
    path: '/memories/:id',
    component: () => import('../pages/MemoryDetailsPage.vue')
  },
  {
    path: '/memories/add',
    component: () => import('../pages/AddMemoryPage.vue')
  }*/
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/giris-yap',
    name: 'giris-yap',
    component: () => import('../pages/LoginPage.vue')
  },
  {
    path: '/kayit-ol',
    name: 'kayit-ol',
    component: () => import('../pages/RegisterPage.vue')
  },
  {
    path: '/sepet',
    name: 'sepet',
    component: () => import('../pages/BasketPage.vue')
  },
  {
    path: '/siparis',
    name: 'siparis',
    component: () => import('../pages/OrderPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
