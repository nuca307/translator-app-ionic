<template>
    <main-layout pageIndex="2">
        <food-view pageIndex="2" />
    </main-layout>
</template>
  
<script>
import MainLayout from '../layouts/MainLayout.vue';
import FoodView from '../views/FoodView.vue';

export default {
    components: {
        MainLayout,
        FoodView
    },
    data() {
        return {}
    },
};
</script>