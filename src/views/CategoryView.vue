<template>
  <main>
    <div>
      <div class="row mt-2">
        <bread-crump :links="links"></bread-crump>
        <card-vue v-for="category of categories" :key="category" :data="category" :keys="card.keys" :link="card.link">
        </card-vue>
      </div>
    </div>
  </main>
</template>

<script>
import CardVue from "../components/CardVue.vue";
import BreadCrump from "../components/BreadCrump.vue";

export default {
  props: ["pageIndex"],
  components: {
    CardVue,
    BreadCrump
  },
  data() {
    return {
      categories: [],
      card: {
        keys: ['imageUrl', 'name'],
        link: {
          url: "",
          key: "id"
        }
      },
      links: [
        { to: "/", text: "Anasayfa" },
        { to: "", text: "Kategoriler" }
      ]
    }
  },
  methods: {
    fetchFunc(resource, method, options = {}, body) {
      const { timeout = 20000 } = options;
      const controller = new AbortController();
      const AbortTimer = setTimeout(() => controller.abort(), timeout);
      let headers = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token'),
          ...options.headers
        },
        signal: controller.signal
      };
      if (method == "POST" || method == "PUT") {
        headers.body = JSON.stringify(body);
      }
      const response = new Promise((resolve, reject) => {
        fetch(resource, headers)
          .then(response => response.json())
          .then(data => {
            resolve(data);
          })
          .catch(() => {
            reject();
          })
          .finally(() => {
            clearTimeout(AbortTimer);
          });
      });
      return response;
    },
    getAllVendorCategories() {
      return new Promise((resolve) => {
        this.fetchFunc("https://tıktık.com:8443/api/public/products/vendor/mainCategory/" + this.$route.params.module + "/" + this.$route.params.vendorId, "GET", {}, {}).then(res => {
          this.categories = res;
          resolve(res);
        })
      });
    },
  },
  mounted() {
    this.card.link.url = "/" + this.$route.params.module + "/%data%/" + this.$route.params.vendorId + "/"
    this.getAllVendorCategories();
  }
}
</script>