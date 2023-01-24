<template>
    <main-layout pageIndex="2">
        <demands-view />
    </main-layout>
</template>
  
<script>
import MainLayout from '../layouts/MainLayout.vue';
import DemandsView from '../views/DemandsView.vue';

export default {
    components: {
        MainLayout,
        DemandsView
    }
};
</script>