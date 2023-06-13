<template>
    <main-layout pageIndex="3">
        <HesapKurtar />
    </main-layout>
</template>
  
<script>
import MainLayout from '../layouts/MainLayout.vue';
import HesapKurtar from '../views/HesapKurtar.vue';

export default {
    components: {
        MainLayout,
        HesapKurtar
    }
};
</script>
