<style>
.basket-count {
  position: absolute;
  display: block;
  right: -.7rem;
  top: -.7rem;
  width: 1.4rem;
  height: 1.4rem;
  color: var(--bs-primary);
  border: 2px solid var(--bs-primary);
  border-radius: 50%;
  background-color: white;
  font-size: .8rem;
}
</style>
<template>
  <main>
    <h3>Hoşgeldiniz.
      <h6>{{ getUserName }}</h6>
    </h3>
    <div>
      <div class="card-group">
        <div class="card" v-for="product of products">
          <img v-for="image of product.images" :src="image" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title" v-text="product.name"></h5>
            <p class="card-text" v-text="product.detail"></p>
            <span>
              <s class="text-muted" v-text="product.price"></s>
            </span>
            <span class="text-success" v-text="product.discount + '%'" />
            <p><strong v-text="product.discountedPrice"></strong></p>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-6">
                <input type="number" class="form-control" v-model="product.count" />
              </div>
              <div class="col-6">
                <button class="btn btn-primary position-relative w-50" style="z-index: 1;" @click="addItem(product)">+
                  <span class="basket-count" v-if="product.onBasketCount" v-text="product.onBasketCount"></span>
                </button>
                <button class="btn btn-danger w-50" @click="removeItem(product)">-</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button @click="setUsersBasket">Kaydet</button>
    </div>
  </main>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      products: [],
      productsObj: {},
      basket: {},
      basketDraft: {
        id: '',
        userId: '',
        items: [],
        amount: '',
        unit: '',
        price: '',
        discountedPrice: '',
        discount: '',
        isDone: 0,
        creator: '',
        updater: ''
      }
    }
  },
  computed: {
    getUserName() {
      return JSON.parse(localStorage.getItem("user")).name;
    }
  },
  methods: {
    getAllProducts() {
      return new Promise((resolve, reject) => {
        fetchFunc("http://localhost:8080/products", "GET", {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }, {
          "email": this.email,
          "password": this.password,
          "vendorId": this.vendorId
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
    setUsersBasket() {
      let user = JSON.parse(localStorage.getItem("user"));
      let method = this.basket.id ? "PUT" : "POST";
      this.basket.userId = user.id;
      fetchFunc("http://localhost:8080/baskets/", method, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      },
        this.basket
      ).then(res => {
        this.basket = res;
        alert("Ürünler Sepete Eklendi");
        this.$router.push('/sepet');
      })
    },
    addItem(product) {
      let item;
      if (this.basket.items)
        item = this.basket.items.find(e => e.productId == product.id);
      else
        this.basket.items = [];

      if (item) {
        item.count += product.count;
        product.onBasketCount = item.count;
      } else {
        this.basket.items.push({
          count: product.count,
          image: product.images[0],
          name: product.name,
          price: product.price,
          productId: product.id,
          unit: product.unit,
          vendorId: product.vendorId,
        });
        product.onBasketCount = product.count;
      }
    },
    removeItem(product) {
      let itemIndex = this.basket.items.findIndex(e => e.productId == product.id);

      if (itemIndex) {
        let item = this.basket.items[itemIndex];
        item.count -= product.count;
        product.onBasketCount = item.count;

        if (item.count <= 0) {
          this.basket.items.splice(itemIndex, 1);
        }
      }
    }
  },
  mounted() {
    Promise.all([this.getAllProducts(), this.getUsersBasketByUserId()])
      .then((data) => {

        let products = data[0];
        products.forEach(e => {
          let object = { ...e, count: 1, onBasketCount: 0 };
          this.productsObj[e.id] = object;
          this.products.push(object);
        })

        let basket = data[1] ? data[1] : { ...this.basketDraft };
        this.basket = basket;

        console.table(this.products);
        console.log(this.basket);
        if (this.basket.items) {
          this.basket.items.forEach(item => {
            this.productsObj[item.productId].onBasketCount = item.count;
          });
        }
      });
  }
}
</script>