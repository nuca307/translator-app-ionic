
<template>
  <main>
    <div>
      <announcement-slider :announcements="announcements" unique="announcementSlider"
        :interval="slider.interval"></announcement-slider>
      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <div class="btn-group mt-2">
            <RouterLink to="/alisveris" class="btn btn-lg" aria-current="page"
              :class="pageIndex == 1 ? 'btn-success' : 'btn-outline-success'">Alışveriş</RouterLink>
            <RouterLink to="/yemek" class="btn btn-lg" aria-current="page"
              :class="pageIndex == 2 ? 'btn-success' : 'btn-outline-success'">Yemek</RouterLink>
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <span><i class="fa-solid fa-location-dot"></i>
          Konum: <span v-text="address.title"></span>
          <button class="btn btn-sm" data-bs-toggle="modal" data-bs-target="#addresses_modal">Değiştir</button>
        </span>
      </div>
      <div class="row mt-2">
        <template v-if="vendors.length">
          <card-vue v-for="vendor of vendors" :key="vendor" :data="vendor" :keys="card.keys" :link="card.link">
          </card-vue>
        </template>
        <div v-else class="alert alert-warning">Henüz Bu Bölgede Hizmet Vermiyoruz. Bölge: {{ address.district }}</div>
      </div>
      <hr>
      <h3 class="mt-4 text-center" style="color:#198754;">Sizler İçin Çalışıyoruz</h3>
      <div class="row mt-2 text-center">
        <div class="col-12 col-md-6 col-lg-5 col-xl-4 offset-lg-1 offset-xl-2 p-2">
          <img src="/assets/tanitim1-ad.png" alt="Her Yerden Kolayca Sipariş Ver. Evinizden, iş yerinizden hatta istediğiniz her yerden kolayca sipariş
                    verebilirsiniz." style="max-width: 100%;">
        </div>
        <div class="col-12 col-md-6 col-lg-5 col-xl-4 p-2">
          <img src="/assets/tanitim2-ad.png" alt="Dakikalar İçinde Ürünü Teslim Al Tedarikçiden teslim aldığımız ürünlerinizi ve yemeklerinizi dakikalar içerisinde
                    güleryüzlü ekibimizden teslim alabilirsiniz. " style="max-width: 100%;">
        </div>
      </div>
    </div>
    <address-modal v-show="!isAddressSet" :addresses="addresses"></address-modal>
  </main>
</template>

<script>
import AnnouncementSlider from '../components/AnnouncementSlider.vue';
import CardVue from "../components/CardVue.vue";
import AddressModal from '../components/AddressModal.vue';
import { Modal } from 'bootstrap';

export default {
  props: ["pageIndex"],
  components: {
    AnnouncementSlider,
    CardVue,
    AddressModal
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
        this.fetchFunc("https://tıktık.com:8443/api/public/vendors/active/" + district + "/shopping", "GET", {}).then(res => {
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
    let modalDOM = document.querySelector("#addresses_modal");
    this.modal = new Modal(modalDOM, { backdrop: "static" });

    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.getUsersAddressByUserId().then((res) => {
        if (!this.isAddressSet) {
          this.modal.show();
        } else {
          let address = JSON.parse(localStorage.getItem("address"));
          if (address) {
            this.address = address;
            this.getAllVendors(address.district);
          } else {
            this.modal.show();
          }
        }
      })
    } else {
      let address = JSON.parse(localStorage.getItem("address"));
      if (address) {
        this.address = address;
        this.getAllVendors(address.district);
      } else {
        this.modal.show();
      }
    }

    this.emitter.on("addresses_modal", (address) => {
      this.address = address;
      this.getAllVendors(address.district);
      this.modal.hide();
    });

  },
  beforeUnmount() {
    this.emitter.off("addresses_modal");
  }
}
</script>