
<template>
  <main>
    <div>
      <div class="row mt-2">
        <template v-if="vendors.length">
          <card-vue v-for="vendor of vendors" :key="vendor" :data="vendor" :keys="card.keys" :link="card.link">
          </card-vue>
        </template>
      </div>
    </div>
  </main>
</template>

<script>
import CardVue from '../components/CardVue.vue';

export default {
  props: ["pageIndex"],
  components: {
    CardVue
  },
  data() {
    return {
      announcements: [],
      vendors: [],
      addresses: [],
      address: {},
      card: {
        keys: ['imageUrl', 'name'],
        link: {
          url: "/kategoriler/shopping/%data%",
          key: "id"
        }
      },
      slider: {
        interval: 3000
      },
      modal: null,

    }
  },
  computed: {
    isAddressSet() {
      let address = JSON.parse(localStorage.getItem('address'));
      let user = JSON.parse(localStorage.getItem('user'));
      if (!user) return false;
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
    getAllVendors(district) {
      return new Promise((resolve) => {
        this.fetchFunc("https://tıktık.com:8443/api/public/vendors/active/SEYDİŞEHİR" + "/shopping", "GET", {}).then(res => {
          this.vendors = res;
          resolve(res);
        })
      });
    },
    getUsersAddressByUserId() {
      return new Promise((resolve) => {
        let user = JSON.parse(localStorage.getItem("user"));
        this.fetchFunc("https://tıktık.com:8443/api/addresses/user/isActive/" + user.id, "GET", {}).then(res => {
          this.addresses = res;
          resolve(res);
        })
      });
    },
    getAllAnnouncements() {
      return new Promise((resolve) => {
        this.fetchFunc("https://tıktık.com:8443/api/public/announcements", "GET", {}).then(res => {
          this.announcements = res;
          resolve(res);
        })
      });
    }
  },
  created() {
    this.getAllAnnouncements();
  },
  mounted() {
    this.getAllVendors()
    let user = JSON.parse(localStorage.getItem("user"));


  },
  beforeUnmount() {
    this.emitter.off("addresses_modal");
  }
}
</script>