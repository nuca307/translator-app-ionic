<template>
  <base-layout page-title="Sepet" page-default-back-link="/home">
    <basket-view />
  </base-layout>
</template>

<script>
import BasketView from '../views/BasketView.vue';

export default {
  components: {
    BasketView
  },
};
</script>