<template>
    <main-layout pageIndex="1">
        <campaign-foods-view pageIndex="1" />
    </main-layout>
</template>
  
<script>
import MainLayout from '../layouts/MainLayout.vue';
import CampaignFoodsView from '../views/CampaignFoodsView.vue';

export default {
    components: {
        MainLayout,
        CampaignFoodsView
    },
    data() {
        return {}
    },
};
</script>