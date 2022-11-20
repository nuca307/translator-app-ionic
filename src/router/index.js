import { createRouter, createWebHistory } from '@ionic/vue-router';

//import MemoriesPage from '../pages/MemoriesPage.vue';
import HomeView from '../views/HomeView.vue'
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
    name: 'home',
    component: HomeView
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
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/kayit-ol',
    name: 'kayit-ol',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/sepet',
    name: 'sepet',
    component: () => import('../views/BasketView.vue')
  },
  {
    path: '/siparis',
    name: 'siparis',
    component: () => import('../views/OrderView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
