<template>
    <main-layout pageIndex="3">
        <profile-view />
    </main-layout>
</template>
  
<script>
import MainLayout from '../layouts/MainLayout.vue';
import ProfileView from '../views/ProfileView.vue';

export default {
    components: {
        MainLayout,
        ProfileView
    },
    data() {
        return {}
    },
};
</script>