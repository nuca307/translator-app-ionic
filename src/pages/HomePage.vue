<template>
    <main-layout pageIndex="1">
        <home-view pageIndex="1" />
    </main-layout>
</template>
  
<script>
import MainLayout from '../layouts/MainLayout.vue';
import HomeView from '../views/HomeView.vue';

export default {
    components: {
        MainLayout,
        HomeView
    },
    data() {
        return {}
    },
};
</script>