<style>
.order-item-header {
  display: flex;
  justify-content: space-between;
  max-width: 500px;
}
</style>
<template>
  <div class="container-fluid mt-2">
    <div>Sayın <b>{{ userName }}</b> Hoşgeldiniz!</div>
    <div class="row" v-if="orders.length">
      <div class="accordion" id="accordionFlushExample">
        <div class="accordion-item" v-for="order of orders">
          <h2 class="accordion-header position-relative accordion-button collapsed" id="headingOne"
            data-bs-toggle="collapse" :data-bs-target="'#order' + order.id" aria-expanded="false"
            :aria-controls="'order' + order.id">
            <div class="d-flex justify-content-between w-100">
              <div v-text="'Sipariş No: ' + order.id"> </div>
              <div v-text="'Toplam Tutarı: ' + (order.totalItemPrice + order.carryingPrice) + '₺'">
              </div>
              <div>
                <div>
                  <span class="badge bg-danger" style="min-width: 110px;" v-if="order.status == '-5'"><i
                      class="fa-solid fa-handshake"></i>
                    İade Red Edildi</span>
                  <span class="badge bg-danger" style="min-width: 110px;" v-else-if="order.status == '-4'"><i
                      class="fa-solid fa-handshake"></i>
                    İptal Red Edildi</span>
                  <span class="badge bg-danger" style="min-width: 110px;" v-else-if="order.status == '-3'"><i
                      class="fa-solid fa-pause"></i> İade İnceleniyor</span>
                  <span class="badge bg-danger" style="min-width: 110px;" v-else-if="order.status == '-2'"><i
                      class="fa-solid fa-pause"></i> İptal
                    İnceleniyor</span>
                  <span class="badge bg-danger" style="min-width: 110px;" v-else-if="order.status == '-1'"><i
                      class="fa-solid fa-xmark"></i> Satıcı İptal
                    Etti</span>
                  <span class="badge bg-warning" style="min-width: 110px;"
                    v-else-if="order.status == '0'">Bekleniyor</span>
                  <span class="badge bg-success" style="min-width: 110px;" v-else-if="order.status == '1'"><i
                      class="fa-solid fa-check"></i>
                    Onaylandı</span>
                  <span class="badge bg-warning" style="min-width: 110px;"
                    v-else-if="order.status == '2'">İnceleniyor</span>
                  <span class="badge bg-primary" style="min-width: 110px;" v-else-if="order.status == '3'"><i
                      class="fa-solid fa-spinner fa-spin"></i> Hazırlanıyor</span>
                  <span class="badge bg-primary" style="min-width: 110px;" v-else-if="order.status == '4'"><i
                      class="fa-solid fa-circle-notch"></i>
                    Hazırlandı</span>
                  <span class="badge bg-primary" style="min-width: 110px;" v-else-if="order.status == '5'"><i
                      class="fa-solid fa-person-biking"></i>
                    Yolda</span>
                  <span class="badge bg-primary" style="min-width: 110px;" v-else-if="order.status == '6'"><i
                      class="fa-solid fa-handshake"></i>
                    Teslim Edildi</span>
                  <span class="badge bg-primary" style="min-width: 110px;" v-else-if="order.status == '7'"><i
                      class="fa-solid fa-handshake"></i>
                    İptal Kabul Edildi</span>
                  <span class="badge bg-primary" style="min-width: 110px;" v-else-if="order.status == '8'"><i
                      class="fa-solid fa-handshake"></i>
                    İade Kabul Edildi</span>
                </div>
              </div>
            </div>
          </h2>
          <div :id="'order' + order.id" class="accordion-collapse collapse" aria-labelledby="headingOne"
            data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
              <div v-show="order.status == 0 || order.status == 6">
                <div class="input-group mb-3">
                  <input type="text" class="form-control form-control-sm" v-model="order.customerRejectCancelNote"
                    :placeholder="order.status == 0 ? 'İptal Notu' : 'İade Notu'">
                  <button v-if="order.status == 0" class="btn btn-sm btn-outline-danger"
                    @click.stop="setOrderStatus(order, -2)">Siparişi İptal Et</button>
                  <button v-if="order.status == 6" class="btn btn-sm btn-outline-danger"
                    @click.stop="setOrderStatus(order, -3)">Siparişi İade Et</button>
                </div>
              </div>
              <div
                v-show="order.adminNote != null && (order.status == 7 || order.status == 8 || order.status == -4 || order.status == -5)">
                <small><b>Yönetici Notu: </b></small>
                <span v-text="order.adminNote"></span>
              </div>

              <div v-show="order.vendorNote != null">
                <small><b>Tedarikçi Notu: </b></small>
                <input type="text" class="form-control" v-model="order.vendorNote">
              </div>
              <hr v-show="order.vendorNote != null">
              <div class="p-2">
                <small>
                  <h6>Tedarikçi Bilgileri</h6>
                  <hr>
                  <b>Telefon: </b>
                  <span v-text="order.vendor.phone"></span>
                </small>
                <small>
                  <div><b>Adres: </b></div>
                  <div v-text="order.vendor.address"></div>
                  <div v-text="order.vendor.district + '/' + order.vendor.province"></div>
                  <div>
                    <span v-text="'Apartman: ' + order.address.apartment"></span>
                    <span v-text="' Kat: ' + order.address.floor"></span>
                    <span v-text="' Daire: ' + order.address.roomNumber"></span>
                  </div>
                </small>
              </div>
              <div class="row">
                <div class="col-12 col-xl-6" v-for="orderItem of order.purchaseOrderItems">
                  <div class="card text-bg-light m-1 p-2">
                    <div>
                      <div>
                        <span class="badge bg-danger" v-if="orderItem.status == '-5'"><i
                            class="fa-solid fa-handshake"></i> İade Red Edildi</span>
                        <span class="badge bg-danger" v-if="orderItem.status == '-4'"><i
                            class="fa-solid fa-handshake"></i> İptal Red Edildi</span>
                        <span class="badge bg-danger" v-else-if="orderItem.status == '-3'"><i
                            class="fa-solid  fa-pause"></i>
                          İade İnceleniyor</span>
                        <span class="badge bg-danger" v-else-if="orderItem.status == '-2'"><i
                            class="fa-solid  fa-pause"></i>
                          İptal İnceleniyor</span>
                        <span class="badge bg-danger" v-else-if="orderItem.status == '-1'"><i
                            class="fa-solid fa-xmark"></i>
                          Satıcı İptal
                          Etti</span>
                        <span class="badge bg-warning" v-else-if="orderItem.status == '0'">Bekleniyor</span>
                        <span class="badge bg-success" v-else-if="orderItem.status == '1'"><i
                            class="fa-solid fa-check"></i>
                          Onaylandı</span>
                        <span class="badge bg-warning" v-else-if="orderItem.status == '2'">İnceleniyor</span>
                        <span class="badge bg-primary" v-else-if="orderItem.status == '3'"><i
                            class="fa-solid fa-spinner fa-spin"></i> Hazırlanıyor</span>
                        <span class="badge bg-primary" v-else-if="orderItem.status == '4'"><i
                            class="fa-solid fa-circle-notch"></i>
                          Hazırlandı</span>
                        <span class="badge bg-primary" v-else-if="orderItem.status == '5'"><i
                            class="fa-solid fa-person-biking"></i>
                          Yolda</span>
                        <span class="badge bg-primary" v-else-if="orderItem.status == '6'"><i
                            class="fa-solid fa-handshake"></i>
                          Teslim Edildi</span>
                        <span class="badge bg-primary" v-else-if="orderItem.status == '7'"><i
                            class="fa-solid fa-handshake"></i>
                          İptal Kabul Edildi</span>
                        <span class="badge bg-primary" v-else-if="orderItem.status == '8'"><i
                            class="fa-solid fa-handshake"></i>
                          İade Kabul Edildi</span>

                      </div>

                      <div v-show="orderItem.status == 0 || orderItem.status == 6">
                        <div class="input-group mb-3">
                          <input type="text" class="form-control form-control-sm"
                            v-model="orderItem.customerRejectCancelNote"
                            :placeholder="order.status == 0 ? 'İptal Notu' : 'İade Notu'">
                          <button v-if="orderItem.status == 0" class="btn btn-sm btn-outline-danger"
                            @click="setOrderItemStatus(order, orderItem, -2)">Ürünü İptal Et</button>
                          <button v-if="orderItem.status == 6" class="btn btn-sm btn-outline-danger"
                            @click="setOrderItemStatus(order, orderItem, -3)">Ürünü İade Et</button>
                        </div>
                      </div>
                      <div
                        v-show="orderItem.adminNote != null && (orderItem.status == 7 || orderItem.status == 8 || orderItem.status == -4 || orderItem.status == -5)">
                        <small><b>Yönetici Notu: </b></small>
                        <span v-text="orderItem.adminNote"></span>
                      </div>

                      <div v-show="orderItem.vendorNote != null">
                        <small><b>Tedarikçi Notu: </b></small>
                        <input type="text" class="form-control" v-model="orderItem.vendorNote">
                      </div>
                    </div>
                    <div class="order-item-header">
                      <div>
                        <small><b>Ürün: </b></small>
                        <span v-text="orderItem.name"></span>
                      </div>
                      <div>
                        <small><b>Miktar: </b></small>
                        <span v-text="orderItem.amount + ' ' + orderItem.unit"></span>
                      </div>
                      <div>
                        <small><b>Fiyat: </b></small>
                        <span v-text="orderItem.totalSellingPrice + '₺'"></span>
                      </div>
                    </div>
                    <div>
                      <img :src="'https://tıktık.com:8443/api' + orderItem.image" :alt="orderItem.name + ' img'"
                        width="100" height="100">
                    </div>
                    <div v-show="orderItem.customerNote != null">
                      <small>
                        <div><b>Müşteri Notu: </b><span v-text="orderItem.customerNote"></span></div>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <toast-vue :toast="toast"></toast-vue>
    </div>
    <div v-else class="alert alert-warning">Gösterilecek Sipariş Yok</div>
  </div>
</template>
 
<script>
import ToastVue from '../components/ToastVue.vue';
import { Toast } from "bootstrap"

export default {
  props: [],
  components: {
    ToastVue
  },
  data() {
    return {
      token: "",
      vendorId: "",
      orders: [],
      orderItems: [],
      toast: {},
      toastVue: undefined,
      websocket: undefined,
      userName: null,
      userPhone: null,
      userId: null
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
    getUsersOrdersByUserId() {
      return new Promise((resolve, reject) => {
        let user = JSON.parse(localStorage.getItem("user"));
        this.fetchFunc("https://tıktık.com:8443/api/purchaseOrders/user/" + user.id, "GET", {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then(res => {
          resolve(res);
        })
      });
    },
    getUserPhone() {
      return new Promise((resolve, reject) => {
        let user = JSON.parse(localStorage.getItem("user"));
        this.fetchFunc("https://tıktık.com:8443/api/users/" + user.id, "GET", {}).then(res => {
          resolve(res);
        })
      });
    },

    setOrderStatus(order, status, shouldCascade = true) { // TODO: Log eklenmeli
      event.stopImmediatePropagation();
      if (status == -2 && !order.customerRejectCancelNote) {
        alert("İptal işlemi için not giriniz");
        return;
      }
      if (status == -3 && !order.customerRejectCancelNote) {
        alert("İade işlemi için not giriniz");
        return;
      }
      if (status == -2) {
        if (!confirm("Siparişi İptal Etmek İstediğinizden Emin Misiniz?")) return;
      }
      if (status == -3) {
        if (!confirm("Siparişi İade Etmek İstediğinizden Emin Misiniz?")) return;
      }

      order.status = status;
      if (shouldCascade) {
        order.purchaseOrderItems.forEach((item) => {
          item.status = status
        })
      }

      return new Promise((resolve) => {
        this.fetchFunc("https://tıktık.com:8443/api/purchaseOrders/status/" + order.id + "/" + this.userId, "PUT", {}, order).then(res => {
          order = res;
          this.websocket.send("Bu iş tamam")
          this.showToast();
        }).catch((err) => {
          this.showToast({}, err);
        })
      });
    },

    setOrderItemStatus(order, orderItem, status) {
      if (status == -2 && !orderItem.customerRejectCancelNote) {
        event.preventDefault();
        alert("İptal işlemi için not giriniz");
        return;
      }
      if (status == -3 && !orderItem.customerRejectCancelNote) {
        event.preventDefault();
        alert("İade işlemi için not giriniz");
        return;
      }
      if (status == -2) {
        if (!confirm("Ürünü İptal Etmek İstediğinizden Emin Misiniz?")) return;
      }
      if (status == -3) {
        if (!confirm("Ürünü İade Etmek İstediğinizden Emin Misiniz?")) return;
      }
      orderItem.status = status;
      /*if (order.status < orderItem.status) {
        this.setOrderStatus(order, status, false);
      }*/
      return new Promise((resolve) => {// TODO: Log eklenmeli
        this.fetchFunc("https://tıktık.com:8443/api/purchaseOrderItems/status/" + orderItem.id + "/" + this.userId, "PUT", {}, orderItem).then(res => {
          orderItem = res;
          this.showToast();
        }).catch((err) => {
          this.showToast({}, err);

        })
      });
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
          message: "Sipariş Kaydedildi",
          class: "text-bg-success fade show",
          ...options
        }
      }

      if (!this.toastVue) {
        this.toastVue = new Toast(document.querySelector("#toast_alert"));
        this.toastVue.show();
      } else {
        Toast.getOrCreateInstance(document.querySelector("#toast_alert")).show();
      }
    },
    connectToWebSocket() { // TODO: in final product, will be revised
      let wsURI = "wss://tıktık.com:8443/api/socket/purchaseOrder/" + this.vendorId + "?auth=" + this.token;

      if (this.websocket != undefined && this.websocket.readyState === WebSocket.OPEN) {
        this.websocket.close();
      }
      this.websocket = new WebSocket(wsURI);
      this.websocket.onmessage = (message) => {

        //Sound notification
        var audio = new Audio("/sound/bildirim.mp3");
        audio.play();
        (message.data);
        this.orders.push(message.order);
        alert("Yeni Sipariş")
      }
    }
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    this.userName = user.firstName + " " + user.lastName;
    this.userPhone = user.phone;
    this.userId = user.id;
    this.token = localStorage.getItem("token");
    this.connectToWebSocket();
    this.toastVue = new Toast(document.querySelector("#toast_alert"));
    //inti toast
    Array.from(document.querySelectorAll('.toast'))
      .forEach(toastNode => new Toast(toastNode))
    Promise.all([this.getUsersOrdersByUserId()])
      .then((data) => {

        this.orders = data[0];
        this.orders.forEach((e) => {
          e.totalPrice = 0;
        });
      });
    /* Promise.all([this.getUserPhone()]).then((data) => {
       this.userName = data[0].name;
       this.userPhone = data[0].phone;
     });*/

  }
};
</script>
