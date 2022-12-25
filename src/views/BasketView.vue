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
    <h1>Hoşgeldiniz.</h1>
    <div>
      <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-center" v-for="item of basket.items"
          :key="item.id">
          <div class="ms-2 me-auto">
            <img :src="item.image" class="item-image" alt="...">
            <span class="fw-bold ms-2" v-text="item.name"></span>
          </div>
          <div class="d-flex align-items-center me-4">
            <button class="item-count-button" @click="removeItem(item)">-</button>
            <span type="number" class="item-count" v-text="item.count"></span>
            <button class="item-count-button" @click="addItem(item)">+</button>
          </div>
          <span>
            Tutar:
            <strong class="ml-2" v-text="item.price * item.count + ' ₺'"></strong>
          </span>
        </li>
      </ol>
      <div><strong>TOPLAM TUTAR: {{ getTotalPrice }} ₺</strong></div>
      <div class="card">
        Adres:
        <select name="" id="" v-model="selectedAddressId" @change="selectAddress">
          <option value=""></option>
          <option v-for="address of addresses" :value="address.id" v-text="address.title" :key="address.id"></option>
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
let GETTING_TIMEOUT = 5000;

function fetchFunc(resource, method, options = {}, body) {
  const { timeout = GETTING_TIMEOUT } = options;
  const controller = new AbortController();
  const AbortTimer = setTimeout(() => controller.abort(), timeout);
  let headers = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
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
}
export default {
  components: {
  },
  data() {
    return {
      basket: {},
      addresses: [],
      selectedAddress: {},
      selectedAddressId: null,
      order: {}
    }
  },
  computed: {
    getTotalPrice() {
      return this.basket.items ? this.basket.items.reduce((total, elem) => total += elem.price * elem.count, 0) : 0;
    }
  },
  methods: {
    getUsersAdressByUserId() {
      return new Promise((resolve) => {
        let user = JSON.parse(localStorage.getItem("user"));
        fetchFunc("http://localhost:8080/addresses/user/" + user.id, "GET", {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then(res => {
          resolve(res);
        })
      });
    },
    getUsersBasketByUserId() {
      return new Promise((resolve) => {
        let user = JSON.parse(localStorage.getItem("user"));
        fetchFunc("http://localhost:8080/baskets/user/" + user.id, "GET", {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then(res => {
          resolve(res);
        })
      });
    },
    setUsersBasket() {
      //let user = JSON.parse(localStorage.getItem("user"));
      let method = this.basket.id ? "PUT" : "POST";
      fetchFunc("http://localhost:8080/baskets/", method, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      },
        this.basket
      ).then(res => {
        this.basket = res;
      })
    },
    setUsersOrder() {
      let user = JSON.parse(localStorage.getItem("user"));
      let method = this.order.id ? "PUT" : "POST";
      this.order.userId = user.id;
      fetchFunc("http://localhost:8080/purchaseOrders/", method, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      },
        this.order
      ).then(res => {
        this.order = res;
        alert("Siparişiniz Oluşturuldu");
        this.$router.push('/siparis');
      })
    },
    addItem(item) {
      item.count++;
      this.setUsersBasket();
    },
    removeItem(item) {
      item.count--;
      this.setUsersBasket();
    },
    selectAddress() {
      this.selectedAddress = this.addresses.find(e => e.id == this.selectedAddressId);
      this.order.address = this.selectedAddress;
    }
  },
  mounted() {
    Promise.all([this.getUsersBasketByUserId(), this.getUsersAdressByUserId()])
      .then((data) => {

        let basket = data[0];
        basket.userId = JSON.parse(localStorage.getItem("user")).id;
        this.basket = basket;

        this.addresses = data[1];
        console.log(this.addresses);

        this.order = {
          id: "",
          baskets: [this.basket],
          address: {}
        }
      });
  }
}
</script>