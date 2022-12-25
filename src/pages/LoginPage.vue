<template>
  <base-layout page-title="Giriş Yap" page-default-back-link="/home">
    <login-view />
  </base-layout>
</template>

<script>
import LoginView from '../views/LoginView.vue';

export default {
  components: {
    LoginView
  },
};
</script>