<template>
    <main-layout pageIndex="1">
        <foods-view pageIndex="1" />
    </main-layout>
</template>
  
<script>
import MainLayout from '../layouts/MainLayout.vue';
import FoodsView from '../views/FoodsView.vue';

export default {
    components: {
        MainLayout,
        FoodsView
    },
    data() {
        return {}
    },
};
</script>