<template>
    <main-layout pageIndex="1">
        <category-view pageIndex="1" />
    </main-layout>
</template>
  
<script>
import MainLayout from '../layouts/MainLayout.vue';
import CategoryView from '../views/CategoryView.vue';

export default {
    components: {
        MainLayout,
        CategoryView
    },
    data() {
        return {}
    },
};
</script>