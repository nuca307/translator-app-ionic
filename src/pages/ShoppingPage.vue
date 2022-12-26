<template>
    <main-layout pageIndex="1">
        <shopping-view pageIndex="1" />
    </main-layout>
</template>
  
<script>
import MainLayout from '../layouts/MainLayout.vue';
import ShoppingView from '../views/ShoppingView.vue';

export default {
    components: {
        MainLayout,
        ShoppingView
    },
    data() {
        return {}
    },
};
</script>