import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '/',
    alias: ['/alisveris'],
    name: 'home',
    component: () => import('../pages/ShoppingPage.vue')
  },
  {
    path: '/yemek',
    name: 'yemek',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../pages/FoodPage.vue')
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
    component: () => import('../pages/BasketPage.vue')
  },
  {
    path: '/siparis',
    name: 'siparis',
    component: () => import('../pages/OrderPage.vue')
  },
  {
    path: '/kategoriler/:module/:vendorId',
    component: () => import('../pages/CategoryPage.vue')
  },
  {
    path: '/shopping/:category/:vendorId',
    component: () => import('../pages/ProductsPage.vue')
  },
  {
    path: '/food/:category/:vendorId',
    component: () => import('../pages/CategoryPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
