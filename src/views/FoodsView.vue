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
        this.fetchFunc("http://192.168.1.100:8080/public/products/vendor/mainCategory/" + this.$route.params.module + "/" + this.$route.params.vendorId, "GET", {}, {}).then(res => {
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