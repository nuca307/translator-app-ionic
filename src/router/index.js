import { createRouter, createWebHistory } from '@ionic/vue-router'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
  },
  routes: [
    {
      name: 'GirisYap',
      path: '/',
      component: () => import('@/pages/GirisYapPage.vue'),
    },

    {
      name: 'HesapKurtar',
      path: '/hesapkurtar',
      component: () => import('@/pages/HesapKurtarPage.vue'),
    },

    {
      name: 'AnaSayfa3',
      path: '/kayitol',
      component: () => import('@/pages/KayitOlPage.vue'),
    },

    {
      name: 'CeviriS',
      path: '/ceviri',
      component: () => import('@/pages/CeviriPage.vue'),
    },

    {
      name: 'CeviriS2',
      path: '/ceviri2',
      component: () => import('@/pages/CeviriPage2.vue'),
    },

    {
      name: 'DillerS',
      path: '/diller',
      component: () => import('@/pages/DillerPage.vue'),
    },

    {
      name: 'Profil0',
      path: '/profil',
      component: () => import('@/pages/ProfilPage.vue'),
    },

    {
      name: 'ProfilDuzenle1',
      path: '/profilduzenle1',
      component: () => import('@/pages/SifreDuzenlePage.vue'),
    },

    {
      name: 'ProfilDuzenle2',
      path: '/profilduzenle2',
      component: () => import('@/pages/IsimDuzenlePage.vue'),
    },

    {
      name: 'sifreKurtar',
      path: '/sifrekurtar',
      component: () => import('@/pages/SifreKurtarPage.vue'),
    },
  ],
})
router.beforeEach((to, from, next) => {
  if (
    to.fullPath == '/' ||
    to.fullPath == '/hesapkurtar' ||
    to.fullPath == '/sifrekurtar' ||
    to.fullPath == '/kayitol'
  ) {
    localStorage.setItem('sonyer', to.fullPath)
    next()
    return
  }

  if (localStorage.getItem('aktifKullanici')) {
    localStorage.setItem('sonyer', to.fullPath)
    next()
    return
  } else {
    localStorage.setItem('sonyer', '/')
    next({ path: '/' })
    return
  }
})
export default router
