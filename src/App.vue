<template>
  <ion-app>
    <router-view></router-view>
  </ion-app>
</template>

<script>

import { IonApp } from '@ionic/vue';
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    RouterView
  },
});
</script>