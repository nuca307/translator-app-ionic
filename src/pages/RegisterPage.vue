<template>
  <base-layout page-title="Kayıt Ol" page-default-back-link="/home">
    <register-view />
  </base-layout>
</template>

<script>
import RegisterView from '../views/RegisterView.vue';

export default {
  components: {
    RegisterView
  },
};
</script>