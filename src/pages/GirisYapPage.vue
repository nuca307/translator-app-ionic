<template>
    <main-layout pageIndex="3">
        <GirisYap />
    </main-layout>
</template>
  
<script>
import MainLayout from '../layouts/MainLayout.vue';
import GirisYap from '../views/GirisYap.vue';

export default {
    components: {
        MainLayout,
        GirisYap
    }
};
</script>
