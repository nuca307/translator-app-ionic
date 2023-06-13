<template>
    <main-layout pageIndex="3">
        <KayitOl />
    </main-layout>
</template>
  
<script>
import MainLayout from '../layouts/MainLayout.vue';
import KayitOl from '../views/KayitOl.vue';

export default {
    components: {
        MainLayout,
        KayitOl
    }
};
</script>
