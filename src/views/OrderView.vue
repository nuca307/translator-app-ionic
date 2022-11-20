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
    <div v-for="order of orders">
      <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-center"
          v-for="item of order.baskets[0].items">
          <div class="ms-2 me-auto">
            <img :src="item.image" class="item-image" alt="...">
            <span class="fw-bold ms-2" v-text="item.name"></span>
          </div>
          <div class="d-flex align-items-center me-4">
            <span type="number" class="item-count" v-text="item.count"></span>
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
        <div v-text="order.address.address"></div>
        <div v-text="order.address.apartment"></div>
        <div v-text="order.address.floor"></div>
        <div v-text="order.address.roomNumber"></div>
      </div>
      <button @click="finalizeOrder">Sipariş Onayla</button>
    </div>
  </main>
</template>
 
<script>
export default {
  components: {
  },
  data() {
    return {
      orders: []
    }
  },
  computed: {
    getTotalPrice() {
      if (this.orders)
        return this.orders.reduce((grandTotal, order) => {
          return grandTotal += order.baskets.reduce((basketTotal, basket) => {
            return basketTotal += basket.items ? basket.items.reduce((itemTotal, item) => itemTotal += item.price * item.count, 0) : 0;
          }, 0);
        }, 0);
      else
        return 0;
    }
  },
  methods: {
    getUsersOrdersByUserId() {
      return new Promise((resolve, reject) => {
        let user = JSON.parse(localStorage.getItem("user"));
        fetchFunc("http://localhost:8080/purchaseOrders/user/" + user.id, "GET", {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then(res => {
          resolve(res);
        })
      });
    },
    getUsersBasketByUserId() {
      return new Promise((resolve, reject) => {
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
    finalizeOrder() {
      alert("Siparişiniz Onaylandı. Ödeme Sayfasına Yönlendiriliyorsunuz...");
    }
  },
  mounted() {
    Promise.all([this.getUsersOrdersByUserId()])
      .then((data) => {

        this.orders = data[0];
      });
  }
}
</script>