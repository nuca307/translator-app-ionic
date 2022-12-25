<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :default-href="pageDefaultBackLink"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ pageTitle }}</ion-title>
        <ion-buttons slot="end">
          <ion-menu-button auto-hide="false"></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button router-link="/">Anasayfa</ion-button>
          <ion-button router-link="/sepet">Sepet</ion-button>
          <ion-button router-link="/siparis">Sipariş</ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button router-link="/giris-yap">Giriş Yap</ion-button>
          <ion-button router-link="/kayit-ol">Kayıt Ol</ion-button>
        </ion-buttons>
      </ion-toolbar>

    </ion-header>
    <ion-content>
      <slot />
    </ion-content>
  </ion-page>
  <ion-menu>

  </ion-menu>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonMenu
} from "@ionic/vue";

export default {
  props: ["pageTitle", "pageDefaultBackLink"],
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonButton,
    IonMenuButton,
    IonMenu
  },
};
</script>