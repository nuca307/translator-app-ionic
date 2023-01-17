<template>
  <main>
    <div>
      <div class="row mt-2">
        <BreadCrump :links="links"></BreadCrump>
        <template v-if="campaigns.length">
          <campaign-card v-for="campaign of campaigns" :key="campaign" :data="campaign" :keys="card.keys"
            :link="card.link">
          </campaign-card>
        </template>
        <div v-else class="alert alert-warning">Bölgenizde gösterilecek bir kampanya bulunmamaktadır</div>
      </div>
    </div>
  </main>
</template>

<script>
import CampaignCard from "../components/CampaignCard.vue";
import BreadCrump from "../components/BreadCrump.vue";

export default {
  props: ["pageIndex"],
  components: {
    CampaignCard,
    BreadCrump
  },
  data() {
    return {
      campaigns: [],
      card: {
        keys: ['imageUrl', 'name', 'detail'],
        link: {
          url: "/kampanyalar/%data%",
          key1: "moduleName",
          key2: "id"
        }
      },
      links: [
        { to: "/", text: "Anasayfa" },
        { to: "", text: "Kampanyalar" }
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
    getAllCampaigns() {
      return new Promise((resolve) => {
        let address = JSON.parse(localStorage.getItem("address"));
        let url = "https://tıktık.com:8443/api/public/campaigns/active/" + (address ? address.district : '');
        this.fetchFunc(url, "GET", {}, {}).then(res => {
          this.campaigns = res;
          resolve(res);
        })
      });
    },
  },
  mounted() {
    this.getAllCampaigns();
  }
}
</script>