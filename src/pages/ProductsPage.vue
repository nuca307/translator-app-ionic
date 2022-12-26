<template>
    <main-layout pageIndex="1">
        <products-view pageIndex="1" />
    </main-layout>
</template>
  
<script>
import MainLayout from '../layouts/MainLayout.vue';
import ProductsView from '../views/ProductsView.vue';

export default {
    components: {
        MainLayout,
        ProductsView
    },
    data() {
        return {}
    },
};
</script>