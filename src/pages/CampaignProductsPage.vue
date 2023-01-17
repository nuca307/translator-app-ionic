<template>
    <main-layout pageIndex="1">
        <campaign-products-view pageIndex="1" />
    </main-layout>
</template>
  
<script>
import MainLayout from '../layouts/MainLayout.vue';
import CampaignProductsView from '../views/CampaignProductsView.vue';

export default {
    components: {
        MainLayout,
        CampaignProductsView
    },
    data() {
        return {}
    },
};
</script>