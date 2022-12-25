<template>
  <base-layout page-title="Siparişler" page-default-back-link="/home">
    <order-view />
  </base-layout>
</template>

<script>
import OrderView from '../views/OrderView.vue';

export default {
  components: {
    OrderView
  },
};
</script>