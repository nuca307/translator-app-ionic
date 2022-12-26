<template>
  <main>
    <div>
      <div class="row mt-2">
        <card-vue v-for="category of foods" :key="category" :data="category" :keys="card.keys" :link="card.link">
        </card-vue>
      </div>
    </div>
  </main>
</template>

<script>
import CardVue from "../components/CardVue.vue";

export default {
  props: ["pageIndex"],
  components: {
    CardVue,
  },
  data() {
    return {
      foods: [],
      card: {
        keys: ['imageUrl', 'name'],
        link: {
          url: "/kategoriler/%data%",
          key: "name"
        }
      },
    }
  },
  computed: {
    isAddressSet() {
      let address = JSON.parse(localStorage.getItem('address'));
      this.address = address ? address : {};
      let user = JSON.parse(localStorage.getItem('user'));
      return address != null && address.userId == user.id;
    }
  },
  methods: {
    getAllVendorCategories() {
      return new Promise((resolve) => {
        this.fetchFunc("http://localhost:8080/public/products/vendor/mainCategory/" + this.$route.params.module + "/" + this.$route.params.vendorId, "GET", {}, {}).then(res => {
          this.foods = res;
          resolve(res);
        })
      });
    },
  },
  mounted() {
    this.getAllVendorCategories();
  }
}
</script>