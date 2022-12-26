<template>
    <main-layout pageIndex="2">
        <basket-view />
    </main-layout>
</template>
  
<script>
import MainLayout from '../layouts/MainLayout.vue';
import BasketView from '../views/BasketView.vue';

export default {
    components: {
        MainLayout,
        BasketView
    },
    data() {
        return {}
    },
};
</script>