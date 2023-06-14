<template>
    <main-layout pageIndex="3">
        <SifreKurtar />
    </main-layout>
</template>
  
<script>
import MainLayout from '../layouts/MainLayout.vue';
import SifreKurtar from '../views/SifreKurtar.vue';

export default {
    components: {
        MainLayout,
        SifreKurtar
    }
};
</script>
