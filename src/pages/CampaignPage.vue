<template>
    <main-layout pageIndex="1">
        <campaign-view pageIndex="1" />
    </main-layout>
</template>
  
<script>
import MainLayout from '../layouts/MainLayout.vue';
import CampaignView from '../views/CampaignView.vue';

export default {
    components: {
        MainLayout,
        CampaignView
    },
    data() {
        return {}
    },
};
</script>