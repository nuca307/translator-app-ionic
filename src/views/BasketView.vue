<style scoped>
.loading-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #111111aa;
  color: white;
  font-size: 2rem;
}

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

.list-group-item {
  display: grid;
  grid-template-columns: 1fr 10fr 4fr 4fr;
}

/* Kredi KArtı Tasarımı */
#credit_card_pane .card,
#credit_card_pane iframe {
  width: 100%;
  max-width: 500px;
  margin: auto;
  color: black;
  border-radius: 20 px;
}

#credit_card_pane p {
  margin: 0px;
}

#credit_card_pane .container .h8 {
  font-size: 30px;
  font-weight: 800;
  text-align: center;
}

#credit_card_pane .btn.btn-primary {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background-image: linear-gradient(to right, #79CBCA 0%, #77A1D3 51%, #79CBCA 100%);
  border: none;
  transition: 0.5s;
  background-size: 200% auto;
}

#credit_card_pane .btn.btn.btn-primary:hover {
  background-position: right center;
  color: #fff;
  text-decoration: none;
}

#credit_card_pane .btn.btn-primary:hover .fas.fa-arrow-right {
  transform: translate(15px);
  transition: transform 0.2s ease-in;
}

#credit_card_pane .form-control {
  color: white;
  background-color: #b6dfcc;
  border: 2px solid transparent;
  height: 60px;
  padding-left: 20px;
  vertical-align: middle;
}

#credit_card_pane .form-control:focus {
  color: white;
  background-color: #77A1D3;
  border: 2px solid #42648C;
  box-shadow: none;
}

#credit_card_pane .text {
  font-size: 14px;
  font-weight: 600;
}

#credit_card_pane ::placeholder {
  font-size: 14px;
  font-weight: 600;
}

/* Kredi KArtı Tasarımı Bitişi */
</style>

<template>
  <main>
    <div>
      <bread-crump :links="links"></bread-crump>
      <h6>Sepet Bilgileri</h6>
      <hr>
      <div v-if="getTotalPrice < minAmount" class="alert alert-danger">Sipariş işlemini tamamlamanız için sepet
        tutarınız <strong>en az {{ minAmount }} ₺</strong> olmalıdır. </div>
      <div class="alert alert-warning" v-if="basket.length > 1">
        <strong><span v-text="basket.length"></span> tedarikçiden</strong> sipariş veriyorsunuz.
        Siparişlerinizi daha sağlıklı takip edebilmek için
        <strong><span v-text="basket.length"></span> ayrı sipariş</strong> oluşturulacaktır.
      </div>
      <div class="mt-2" v-for="basketExtended of basket">
        <span class="rounded-top bg-success text-light fw-bold p-2" v-text="basketExtended.vendor.name"></span>
        <ol class="list-group list-group-numbered">
          <li class="list-group-item border-success" v-for="item of basketExtended.basketItems" :key="item">
            <div class="ms-2 me-auto">
              <img :src="'https://tıktık.com:8443/api' + item.image" class="item-image" alt="...">
              <span class="ms-2" v-text="item.name"></span>
              <textarea v-show="item.moduleName == 'food'" type="text" class="form-control" v-model="item.customerNote"
                placeholder="Notunuz Ör: 1'i soğansız"></textarea>
            </div>
            <div class="d-flex align-items-center me-4">
              <button class="item-count-button" @click="removeItem(item)">-</button>
              <span type="number" class="item-count" v-text="item.amount"></span>
              <button class="item-count-button" @click="addItem(item)">+</button>
            </div>
            <span>
              Tutar:
              <!--<strong class="ml-2"
                v-text="(item.discount ? item.discountedPrice : item.price) * item.amount + ' ₺'"></strong-->
              <div class="d-flex" style="flex-direction: column;">
                <span v-if="(item.discount == null || item.discount == 0)"
                  v-text="(item.price * item.amount).toFixed(2) + '₺'"></span>
                <template v-else>
                  <s class="text-muted"><small v-text="(item.price * item.amount).toFixed(2) + '₺'"></small></s>
                  <svg xmlns="http://www.w3.org/2000/svg" style="width: 2rem;" viewBox="0 0 26.458 18.708">
                    <path d="M0 0h26.458v10.583l-13.132 8.154L0 11.906z" fill="#198754"
                      paint-order="stroke fill markers" />
                    <path d="M1.228.87H25.23v9.601l-11.912 7.397-12.089-6.197z" fill="#fff"
                      paint-order="stroke fill markers" />
                    <path d="M1.514 1.072h23.43v9.372l-11.629 7.221-11.801-6.05z" fill="#198754"
                      paint-order="stroke fill markers" /><text xml:space="preserve" x="12.703" y="10.593"
                      font-size="11.906" font-family="Z003" text-anchor="middle" fill="#198754">
                      <tspan x="12.703" y="10.593" fill="#fff" font-weight="bold" v-text="item.discount + '%'">
                      </tspan>
                    </text>
                  </svg>
                  <div v-text="(item.discountedPrice * item.amount).toFixed(2) + '₺'"></div>
                </template>
              </div>
            </span>
          </li>
        </ol>
        <div class="d-flex justify-content-end">
          <span class="rounded-bottom border border-1 border-success p-1" style="margin-top: -.25rem;">
            Taşıma Bedeli:
            <span v-text="carryingPrice"></span>
          </span>
        </div>
      </div>
      <div class="bg-success text-light text-end p-2 rounded mt-2">
        <div>Alışveriş Tutarı: {{ getTotalItemPrice }} ₺</div>
        <div>Taşıma Bedeli: {{ getTotalCarryingPrice }} ₺</div>
        <hr>
        <div><strong>TOPLAM TUTAR: {{ getTotalPrice }} ₺</strong></div>
      </div>

      <div class="card border-success p-2 mt-4">
        <h6>Müşteri Bilgileri</h6>
        <hr>
        <div><strong> Ad-Soyad: </strong>
          <span v-text="userName"></span>
        </div>
        <div><strong> Telefon: </strong>
          <span v-text="userPhone"></span>
        </div>
        <strong class="mt-2">Adres:</strong>
        <span><i class="fa-solid fa-location-dot"></i>
          Konum: <span v-text="selectedAddress.title"></span>
          <button class="btn btn-sm btn-outline-dark" data-bs-toggle="modal"
            data-bs-target="#addresses_modal">Değiştir</button>
        </span>
        <table>
          <tr>
            <td v-text="'Açık Adres: '"></td>
            <td v-text="selectedAddress.address"></td>
          </tr>
          <tr>
            <td v-text="'Apartman: '"></td>
            <td v-text="selectedAddress.apartment"></td>
          </tr>
          <tr>
            <td v-text="'Kat No: '"></td>
            <td v-text="selectedAddress.floor"></td>
          </tr>
          <tr>
            <td v-text="'Daire No: '"></td>
            <td v-text="selectedAddress.roomNumber"></td>
          </tr>
        </table>
      </div>
      <div class="card border-success p-2 mt-4" v-if="getTotalPrice > minAmount">
        <h6>Ödeme İşlemleri</h6>
        <hr>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="at_the_door" data-bs-toggle="tab" data-bs-target="#at_the_door_pane"
              type="button" role="tab" aria-controls="at_the_door_pane" aria-selected="true"
              @click="paymentMethod = 'Kapıda Ödeme'">Kapıda Ödeme</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="credit_card" data-bs-toggle="tab" data-bs-target="#credit_card_pane"
              type="button" role="tab" aria-controls="credit_card_pane" aria-selected="false"
              @click="paymentMethod = 'Kredi Kartı'">
              <i class="fa-solid fa-credit-card"></i>
              Kredi Kartı</button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active p-2" id="at_the_door_pane" role="tabpanel" aria-labelledby="at_the_door"
            tabindex="0">
            <div class="alert alert-secondary">Ödeme İşlemleriniz Kuryemiz Aracılığıyla Gerçekleştirilecektir.</div>
          </div>
          <div class="tab-pane fade" id="credit_card_pane" role="tabpanel" aria-labelledby="credit_card" tabindex="0">
            <div class="card px-4">
              <div class="loading-container" :hidden="!isLoading">
                <i class="fa-solid fa-spinner fa-spin"></i> Yükleniyor
              </div>
              <p class="h8 py-3">Ödeme Detayları</p>
              <div class="row gx-3">
                <div class="col-12">
                  <div class="d-flex flex-column">
                    <p class="text mb-1">Kartın Üzerindeki İsim</p>
                    <input class="form-control mb-3" type="text" placeholder="İsim Soyisim"
                      v-model="card.cardHolderName">
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-flex flex-column">
                    <p class="text mb-1">Kart Numarası</p>
                    <input class="form-control mb-3" type="number" placeholder="1234 5678 4356 7890"
                      v-model="card.cardNumber">
                  </div>
                </div>
                <div class="col-4">
                  <div class="d-flex flex-column">
                    <p class="text mb-1">Ay</p>
                    <input class="form-control mb-3" type="number" placeholder="MM" v-model="card.expireMonth">
                  </div>
                </div>
                <div class="col-4">
                  <div class="d-flex flex-column">
                    <p class="text mb-1">Yıl</p>
                    <input class="form-control mb-3" type="number" placeholder="YYYY" v-model="card.expireYear">
                  </div>
                </div>
                <div class="col-4">
                  <div class="d-flex flex-column">
                    <p class="text mb-1">CVV/CVC</p>
                    <input class="form-control mb-3 pt-2 " type="password" placeholder="***" v-model="card.cvc">
                  </div>
                </div>
                <div class="col-12">
                  <button class="btn btn-primary mb-3" @click="setPaymentRequest()">
                    <span class="ps-3" v-text="'Ödenecek Tutar: ' + getTotalPrice + ' ₺'"></span>
                    <span class="fas fa-arrow-right"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <button v-if="getTotalPrice > minAmount"
        v-show="paymentMethod == 'Kapıda Ödeme' || (paymentMethod == 'Kredi Kartı' && paymentId)"
        class="btn btn-success mt-2" @click="setUsersOrder">Sipariş
        Oluştur</button>
    </div>
    <address-modal :addresses="addresses"></address-modal>
  </main>
  <toast-vue :toast="toast" unique="basketToast"></toast-vue>
</template>
 
<script>
import BreadCrump from "../components/BreadCrump.vue";
import { Modal, Toast, Tab } from "bootstrap";
import ToastVue from '../components/ToastVue.vue';
import AddressModal from "../components/AddressModal.vue";

export default {
  components: {
    BreadCrump,
    ToastVue,
    AddressModal
  },
  data() {
    return {
      toast: {},
      toastVue: undefined,
      addresses: [],
      selectedAddress: {},
      selectedAddressId: null,
      order: {},
      payment: {},
      paymentMethod: "Kapıda Ödeme",
      basket: [],
      links: [
        { to: "/", text: "Anasayfa" },
        { to: "", text: "Sepet" }
      ],
      temp: {},
      userName: null,
      userPhone: null,
      userId: null,
      modal: null,
      minAmount: 0,
      carryingPrice: 0,
      card: {
        cardHolderName: "",
        cardNumber: "",
        expireMonth: "",
        expireYear: "",
        cvc: ""
      },
      isLoading: false,
      paymentId: "",
      paymentStatus: ""
    }
  },
  inject: {
    basketInfo: 'basketInfo'
  },
  computed: {
    getTotalPrice() {
      let totalPrice = 0;
      this.basket.forEach(e => {
        totalPrice += this.carryingPrice;
        totalPrice += e.basketItems.reduce((total, elem) => total += (elem.discount ? elem.discountedPrice : elem.price) * elem.amount, 0);
      });
      return totalPrice.toFixed(2);
    },
    getTotalCarryingPrice() {
      let totalPrice = 0;
      this.basket.forEach(e => {
        totalPrice += this.carryingPrice;
      });
      return totalPrice.toFixed(2);
    },
    getTotalItemPrice() {
      let totalPrice = 0;
      this.basket.forEach(e => {
        totalPrice += e.basketItems.reduce((total, elem) => total += (elem.discount ? elem.discountedPrice : elem.price) * elem.amount, 0);
      });
      return totalPrice.toFixed(2);
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
    addItem(item) {
      let foundItem;
      for (let i = 0; i < this.basket.length; i++) {
        foundItem = this.basket[i].basketItems.find(e => e.productId == item.productId && e.moduleName == item.moduleName);
        if (foundItem) break;
      }

      foundItem.amount++;

      this.setUsersBasketItem(foundItem);
    },
    removeItem(item) {
      let itemIndex;
      let foundItem;
      let basketIndex;

      for (let i = 0; i < this.basket.length; i++) {
        itemIndex = this.basket[i].basketItems.findIndex(e => e.productId == item.productId && e.moduleName == item.moduleName);
        foundItem = this.basket[i].basketItems[itemIndex];
        basketIndex = i;
        if (foundItem) break;
      }

      foundItem.amount--;

      if (foundItem.amount <= 0) {
        this.basket[basketIndex].basketItems.splice(itemIndex, 1);
        if (this.basket[basketIndex].basketItems.length == 0) {
          this.deleteUsersBasketItem(foundItem);
          this.basket.splice(basketIndex, 1);
          console.log("Basket Silindi");
        } else {
          this.deleteUsersBasketItem(foundItem);
          console.log("İtem Silindi");
        }
      } else {
        this.setUsersBasketItem(foundItem);
      }
    },
    setUsersBasket() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        this.setLocalBasket();
        return;
      }
      let method = this.basket.id ? "PUT" : "POST";
      this.basket.userId = user.id;
      this.fetchFunc("https://tıktık.com:8443/api/baskets/", method, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      },
        this.basket
      ).then(res => {
        this.basket = res;
        this.showToast();

      }).catch((err) => {
        this.showToast({}, err);
      })
    },
    setUsersBasketItem(item) {
      this.temp = item
      this.fetchFunc("https://tıktık.com:8443/api/basketItems/", "PUT", {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      },
        item
      ).then(res => {
        item = res;
        this.showToast();

      }).catch((err) => {
        item = this.temp;
        this.showToast({}, err);
      })
    },
    deleteUsersBasketItem(item) {
      this.fetchFunc("https://tıktık.com:8443/api/basketItems/" + item.id, "DELETE", {}).then(res => {
        item = res;
        this.showToast();

      }).catch((err) => {
        this.showToast({}, err);
      })
    },
    getUsersBasketByUserId() {
      let user = JSON.parse(localStorage.getItem("user"));
      return new Promise((resolve) => {
        this.fetchFunc("https://tıktık.com:8443/api/baskets/user/" + user.id, "GET", {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then(res => {
          resolve(res);
        })
      });
    },
    getUsersAdressByUserId() {
      return new Promise((resolve, reject) => {
        let user = JSON.parse(localStorage.getItem("user"));
        this.fetchFunc("https://tıktık.com:8443/api/addresses/user/isActive/" + user.id, "GET", {}).then(res => {
          resolve(res);
        })
      });
    },
    getGeneralDefinitions() {
      return new Promise((resolve, reject) => {
        let user = JSON.parse(localStorage.getItem("user"));
        this.fetchFunc("https://tıktık.com:8443/api/public/generalDefinitions", "GET", {}).then(res => {
          res.forEach(datum => {
            if (datum.defKey == "carryingPrice") this.carryingPrice = parseFloat(datum.defValue);
            if (datum.defKey == "minAmount") this.minAmount = parseFloat(datum.defValue);
          })
        })
      });
    },
    setUsersOrder() {
      if (this.paymentMethod == "Kredi Kartı") {
        if (this.paymentStatus != "success") {
          alert("Ödemeniz Tamamlanmamış Görünüyor.\nBir Problem Olduğunu Düşünüyorsanız TıkTık ile İletişime Geçebilirsiniz.");
          return;
        }
      }
      let user = JSON.parse(localStorage.getItem("user"));
      let orders = [];
      this.basket.forEach((b) => {
        let order = {
          user: { id: user.id },
          purchaseOrderItems: [],
          status: 0,
          vendor: b.vendor,
          address: this.selectedAddress,
          carryingPrice: this.carryingPrice,
          payment: {
            integratorId: this.paymentId,
            method: this.paymentMethod
          }
        }

        b.basketItems.forEach(item => {
          const { productId, amount, vendor, price, discountedPrice, discount, image, unit, name, moduleName, customerNote } = item;
          order.purchaseOrderItems.push({ productId, amount, vendor, price, discount, discountedPrice, image, unit, name, moduleName, customerNote, status: 0 })
        });
        orders.push(order);
      })
      this.fetchFunc("https://tıktık.com:8443/api/purchaseOrders/batch/" + user.id, "POST", {},
        orders
      ).then(res => {
        //this.order = res;
        orders.forEach(order => {
          this.emitter.emit("send_websocket_message",
            `orderId=${order.id}&status=${order.status}&process=create&message=Yeni Sipariş`);
        })

        this.emitter.emit("paymentLock", false);
        alert("Siparişiniz Oluşturuldu");
        this.$router.push('/siparis');
      })
    },
    setPaymentRequest() {
      this.isLoading = true;
      let basket = {
        price: this.getTotalPrice,
        basketItems: [],
      };
      this.basket.forEach(e => {
        basket.basketItems.push({
          moduleName: "virtual",
          productId: 0,
          name: "Taşıma Bedeli",
          discount: 0,
          discountedPrice: 0,
          price: this.carryingPrice,
          amount: 1,
          vendor: { id: "7b189816-4f3c-457f-b08d-1006b1818e11" }
        })
        e.basketItems.forEach(item => {
          basket.basketItems.push(item);
        })
      })
      let paymentRequest = {
        user: JSON.parse(localStorage.getItem("user")),
        address: this.selectedAddress,
        card: this.card,
        basket: basket,
      }

      this.fetchFunc("https://tıktık.com:8443/api/iyzico/pay", "POST", {}, paymentRequest
      ).then(res => {
        this.isLoading = true;
        document.querySelector("#credit_card_pane").querySelector(".card").innerHTML = "";
        let iframe = document.createElement("iframe");
        iframe.setAttribute("id", "iyzico_iframe");
        iframe.style.width = "100%";
        iframe.style.maxWidth = "500px";
        iframe.style.minHeight = "447px"
        document.querySelector("#credit_card_pane").querySelector(".card").append(iframe);
        iframe.contentDocument.write(res.htmlContent);
      })
    },
    selectAddress() {
      this.selectedAddress = this.addresses.find(e => e.id == this.selectedAddress.id);
      this.order.address = this.selectedAddress;
    },
    showToast(options, error) {
      if (error) {
        this.toast = {
          header: "Hata Meydana Geldi",
          time: new Date(),
          message: error.message,
          class: "text-bg-danger fade show",
          ...options
        }
      } else {
        this.toast = {
          header: "İşlem Başarılı",
          time: new Date(),
          message: "Sepet Güncellendi",
          class: "text-bg-success fade show",
          ...options
        }
      }

      if (!this.toastVue) {
        this.toastVue = new Toast(document.querySelector("#basketToast"));
        this.toastVue.show();
      } else {
        Toast.getOrCreateInstance(document.querySelector("#basketToast")).show();
      }
    },
    messageHandler(event) {
      //console.log("Message received from the child: " + JSON.stringify(event.data)); // Message received from child
      if (typeof event.data == "string") {
        let message = {};
        event.data.split("&").forEach(part => {
          message[part.split("=")[0]] = part.split("=")[1];
        })
        this.paymentId = message.paymentId;
        this.paymentStatus = message.status;
        this.emitter.emit("paymentLock", true);
      }
    }
  },
  mounted() {
    window.addEventListener('message', this.messageHandler);
    let modalDOM = document.querySelector("#addresses_modal");
    this.modal = new Modal(modalDOM, { backdrop: "static" });
    /*const tabs = document.querySelectorAll('button[data-bs-toggle="tab"]')
    tabs.forEach(e => {
      e.addEventListener('shown.bs.tab', event => {
        if (event.target.id == "credit_card") {
          this.paymentMethod = "Kredi Kartı";
        }
        if (event.target.id == "at_the_door") {
          this.paymentMethod = "Kapıda Ödeme";
        }
      })
    })
*/
    this.emitter.on("addresses_modal", (address) => {
      this.selectedAddress = address;
      this.modal.hide();
    });

    this.getGeneralDefinitions();

    this.getUsersAdressByUserId().then((res) => {
      this.addresses = res;
      let address = JSON.parse(localStorage.getItem("address"));
      if (address) {
        this.selectedAddress = address;
        this.order.address = address;
      }
    })

    this.getUsersBasketByUserId().then((res) => {
      this.basket = [];
      if (res) {
        if (res.basketItems) {
          res.basketItems.forEach((item) => {
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
      }
    });

    let user = JSON.parse(localStorage.getItem("user"));
    this.userName = user.firstName + " " + user.lastName;
    this.userPhone = user.phone;

  },
  beforeUnmount() {
    window.removeEventListener('message', this.messageHandler);
  }
  /*
  beforeUpdate() {
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
  },*/
}
</script>
