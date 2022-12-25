<template>
  <base-layout page-title="SendeJet">
    <template v-slot:actions-end>
      <ion-button router-link="/giris-yap">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>
    <home-view />
  </base-layout>
</template>

<script>
import HomeView from '../views/HomeView.vue';
import { IonButton, IonIcon } from '@ionic/vue';
import { add } from 'ionicons/icons';
export default {
  components: {
    HomeView,
    IonButton,
    IonIcon,
  },
  data() {
    return {
      add,
    };
  },
};
</script>