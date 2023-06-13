import { createRouter, createWebHistory } from '@ionic/vue-router';

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
      name: "GirisYap",
      path: "/",
      component: () => import("@/pages/GirisYapPage.vue"),
  },
  
  {
      name: "HesapKurtar",
      path: "/hesapkurtar",
      component: () => import("@/pages/HesapKurtarPage.vue"),
  },
  
  {
      name: "AnaSayfa3",
      path: "/kayitol",
      component: () => import("@/pages/KayitOlPage.vue"),
  },
  
  {
      name: "CeviriS",
      path: "/ceviri",
      component: () => import("@/pages/CeviriPage.vue"),
  },
  
  {
      name: "CeviriS2",
      path: "/ceviri2",
      component: () => import("@/pages/CeviriPage2.vue"),
  },
  
  {
      name: "DillerS",
      path: "/diller",
      component: () => import("@/pages/DillerPage.vue"),
  },
  
  {
      name: "Profil0",
      path: "/profil",
      component: () => import("@/pages/ProfilPage.vue"),
  },
  
  {
      name: "ProfilDuzenle1",
      path: "/profilduzenle1",
      component: () => import("@/pages/SifreDuzenlePage.vue"),
  },
  
  {
      name: "ProfilDuzenle2",
      path: "/profilduzenle2",
      component: () => import("@/pages/IsimDuzenlePage.vue"),
  },
  
  ],
});

// Auth control
/*router.beforeEach((to, from, next) => {
  if (to.fullPath == "/giris-yap" || from.fullPath == "/giris-yap" || from.fullPath == "/kayit-ol") {
    next();
    return;
  }

  let user = JSON.parse(localStorage.getItem("user"));
  let refreshToken = localStorage.getItem("refreshToken");
  let refreshTokenExpirationTime = localStorage.getItem("refreshTokenExpirationTime");

  if (localStorage.getItem("token") && localStorage.getItem("user")) { //user logged in before
    // One of token expired
    if (localStorage.getItem("tokenExpirationTime") < new Date().getTime() || refreshTokenExpirationTime < new Date().getTime()) {
      next({ path: '/giris-yap' });
      return;
    }
    // Access Token not expired but close
    else if (localStorage.getItem("tokenExpirationTime") > new Date().getTime() - 24 * 60 * 60 * 1000) {
      fetchFunc("https://tıktık.com:8443/api/auth/refresh/" + user.id, "POST", {}, {
        "token": refreshToken
      }).then(res => {
        if (res.authorized == "false") {
          next({ path: '/giris-yap' });
          return;
        }
        if (res.status == 401) {
          next({ path: '/giris-yap' });
          return;
        }
        if (res.status == 200) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("tokenExpirationTime", res.tokenExpirationTime);
          next();
          return;
        }
      })
    }
    // Each token not expired
    else {
      next();
      return;
    }

  } else { //user without login
    next();
    return;
  }

})*/
export default router;
