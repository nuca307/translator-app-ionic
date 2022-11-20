<template>
  <base-layout page-title="All Memories">
    <template v-slot:actions-end>
      <ion-button router-link="/memories/add">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>
    <memories-list :memories="memories"></memories-list>
    {{ kullanicilar }}
    {{error}}
  </base-layout>
</template>

<script>
import { IonButton, IonIcon } from "@ionic/vue";
import { add } from "ionicons/icons";
//import { Http } from '@capacitor-community/http';
import MemoriesList from "../components/memories/MemoriesList.vue";

export default {
  components: {
    MemoriesList,
    IonButton,
    IonIcon
  },
  data() {
    return { 
      add,
      kullanicilar:{} ,
      error:"Loading..."
    };
  },
  computed: {
    memories() {
      return this.$store.getters.memories;
    },
  },
  methods:{
    async getAllKullanicilar(){
      /*fetch("http://192.168.1.100:8080/somWS/kullanicilar")
        .then((response) => response.json())
        .then((data) => this.kullanicilar = data);*
        try {
      const url = 'http://192.168.1.100:8080/somWS/kullanicilar';
      const params = {};
      const headers = {};

      const response = await Http.get(url, params, headers);
      this.kullanicilar = response.data;
      console.log(response.status);
      console.log(JSON.parse(response.data)); // JSON data returned by server
      console.log(response.headers);
    } catch (error) {
      console.error(error.status);
      console.error(error.error); // Error message as string
      console.error(error.headers);
    }*/
    fetch(`http://192.168.1.100:8080/somWS/kullanicilar`)
      .then(async response => {
        if (response.ok) {
          const data = await response.json();
          this.kullanicilar = data;
        }
      }).catch(e=>{
        this.error=e;
      })
    }
  },
  created(){
    this.getAllKullanicilar();
  }
}
</script>