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
      path: "/",
      name: "home",
      component: () => import("../pages/DemandsPage.vue"),
    },
    {
      path: "/giris-yap",
      name: "giris-yap",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/profil",
      name: "profil",
      component: () => import("../pages/ProfilePage.vue"),
    },
  ],
});

function fetchFunc(resource, method, options = {}, body) {
  const { timeout = 20000 } = options;
  const controller = new AbortController();
  const AbortTimer = setTimeout(() => controller.abort(), timeout);
  let headers = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
      ...options.headers
    },
    signal: controller.signal
  };
  if (method == "POST" || method == "PUT") {
    headers.body = JSON.stringify(body);
  }
  const response = new Promise((resolve, reject) => {
    fetch(resource, headers)
      .then(response => response.json())
      .then(data => {
        resolve(data);
      })
      .catch(() => {
        reject();
      })
      .finally(() => {
        clearTimeout(AbortTimer);
      });
  });
  return response;
}
// Auth control
router.beforeEach((to, from, next) => {
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

})
export default router;
