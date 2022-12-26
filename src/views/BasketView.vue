<style scoped>
.item-image {
  width: 3rem;
  height: 3rem;
}

.item-count,
.item-count-button {
  border: 1px solid var(--bs-secondary);
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-count-button {
  width: 1.5rem;
  height: 1.5rem;
}
</style>

<template>
  <main>
    <div>
      <bread-crump :links="links"></bread-crump>
      <div v-for="basketExtended of basket" :key="basketExtended">
        <span v-text="basketExtended.vendor.name"></span>
        <ol class="list-group list-group-numbered">
          <li class="list-group-item d-flex justify-content-between align-items-center"
            v-for="item of basketExtended.basketItems" :key="item">
            <div class="ms-2 me-auto">
              <img :src="item.image" class="item-image" alt="...">
              <span class="fw-bold ms-2" v-text="item.name"></span>
            </div>
            <div class="d-flex align-items-center me-4">
              <button class="item-count-button" @click="removeItem(item)">-</button>
              <span type="number" class="item-count" v-text="item.amount"></span>
              <button class="item-count-button" @click="addItem(item)">+</button>
            </div>
            <span>
              Tutar:
              <strong class="ml-2" v-text="item.price * item.amount + ' ₺'"></strong>
            </span>
          </li>
        </ol>
      </div>
      <div><strong>TOPLAM TUTAR: {{ getTotalPrice }} ₺</strong></div>
      <div class="card">
        Adres:
        <select name="" id="" v-model="selectedAddress.id" @change="selectAddress">
          <option value=""></option>
          <option v-for="address of addresses" :key="address" :value="address.id" v-text="address.title"></option>
        </select>
        <textarea name="" id="" cols="30" rows="2" v-model="selectedAddress.address"></textarea>
        <input type="text" v-model="selectedAddress.apartment">
        <input type="text" v-model="selectedAddress.floor">
        <input type="text" v-model="selectedAddress.roomNumber">
      </div>
      <button @click="setUsersOrder">Sipariş Oluştur</button>
    </div>
  </main>
</template>
 
<script>
import BreadCrump from "../components/BreadCrump.vue";
export default {
  components: {
    BreadCrump
  },
  data() {
    return {
      addresses: [],
      selectedAddress: {},
      selectedAddressId: null,
      order: {},
      basket: [],
      links: [
        { to: "/", text: "Anasayfa" },
        { to: "", text: "Sepet" }
      ]
    }
  },
  inject: {
    basketInfo: 'basketInfo'
  },
  computed: {
    getTotalPrice() {
      return this.basketInfo.basketItems ? this.basketInfo.basketItems.reduce((total, elem) => total += elem.price * elem.amount, 0) : 0;
    }
  },
  methods: {
    addItem(item) {
      this.emitter.emit("basket_add_to_item", item);
    },
    removeItem(item) {
      this.emitter.emit("basket_remove_from_item", item);
    },
    getUsersAdressByUserId() {
      return new Promise((resolve) => {
        let user = JSON.parse(localStorage.getItem("user"));
        this.fetchFunc("http://localhost:8080/addresses/user/" + user.id, "GET", {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then(res => {
          resolve(res);
        })
      });
    },
    setUsersOrder() {
      let user = JSON.parse(localStorage.getItem("user"));
      let orders = [];
      this.basket.forEach((b) => {
        let order = {
          userId: user.id,
          purchaseOrderItems: [],
          status: 0,
          vendor: b.vendor,
          address: this.selectedAddress
        }

        b.basketItems.forEach(item => {
          const { productId, amount, vendor, price, discountedPrice, image, unit, name } = item;
          order.purchaseOrderItems.push({ productId, amount, vendor, price, discountedPrice, image, unit, name, status: 0 })
        });
        orders.push(order);
      })
      this.fetchFunc("http://localhost:8080/purchaseOrders/batch", "POST", {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      },
        orders
      ).then(res => {
        //this.order = res;
        this.emitter.emit("on_websocket_message",
          {
            message: "Yeni Sipariş",
            order: res
          });
        alert("Siparişiniz Oluşturuldu");
        //this.$router.push('/siparis');
      })
    },
    selectAddress() {
      this.selectedAddress = this.addresses.find(e => e.id == this.selectedAddress.id);
      this.order.address = this.selectedAddress;
    }
  },
  mounted() {
    this.getUsersAdressByUserId().then((res) => {
      this.addresses = res;
      let address = JSON.parse(localStorage.getItem("address"));
      if (address) {
        this.selectedAddress = address;
        this.order.address = address;
      }
    })

    this.basket = [];
    if (this.basketInfo) {
      if (this.basketInfo.basketItems) {
        console.log("GİRDİ");
        this.basketInfo.basketItems.forEach((item) => {
          let foundItemExtended = this.basket.find(e => e.vendor.id == item.vendorId);
          if (foundItemExtended) {
            foundItemExtended.basketItems.push(item);
          } else {
            this.basket.push({
              vendor: item.vendor,
              basketItems: [...item]
            })
          }
        })
      }
    }
  },
  updated() {
    this.basket = [];
    if (this.basketInfo.basketItems) {
      this.basketInfo.basketItems.forEach((item) => {
        let foundItemExtended = this.basket.find(e => e.vendor.id == item.vendor.id);
        if (foundItemExtended) {
          foundItemExtended.basketItems.push(item);
        } else {
          this.basket.push({
            vendor: item.vendor,
            basketItems: [{ ...item }]
          })
        }
      })
    }
  },
}
</script>