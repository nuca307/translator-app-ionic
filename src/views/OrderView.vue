<style>
.order-item-header {
  display: flex;
  justify-content: space-between;
  max-width: 500px;
}
</style>
<template>
  <div class="container-fluid mt-2">
    <div class="row" v-if="orders.length">
      <div class="accordion" id="accordionFlushExample">
        <div class="accordion-item" v-for="order of orders">
          <h2 class="accordion-header position-relative accordion-button collapsed" id="headingOne"
            data-bs-toggle="collapse" :data-bs-target="'#order' + order.id" aria-expanded="false"
            :aria-controls="'order' + order.id">
            <div class="d-flex justify-content-between w-100">
              <div v-text="'Sipariş No: ' + order.id"> </div>
              <div v-text="'Sipariş Tutarı: 0₺ '"> </div>
              <div>
                <span class="badge bg-danger" v-if="order.status == '-3'"><i class="fa-solid fa-xmark"></i> İade
                  Et</span>
                <span class="badge bg-danger" v-if="order.status == '-2'"><i class="fa-solid fa-xmark"></i> İptal
                  Et</span>
                <span class="badge bg-danger" v-if="order.status == '-1'"><i class="fa-solid fa-xmark"></i> Satıcı İptal
                  Etti</span>
                <span class="badge bg-warning" v-else-if="order.status == '0'">Bekleniyor</span>
                <span class="badge bg-success" v-else-if="order.status == '1'"><i class="fa-solid fa-check"></i>
                  Onaylandı</span>
                <span class="badge bg-warning" v-else-if="order.status == '2'">İnceleniyor</span>
                <span class="badge bg-primary" v-else-if="order.status == '3'"><i
                    class="fa-solid fa-spinner fa-spin"></i> Hazırlanıyor</span>
                <span class="badge bg-primary" v-else-if="order.status == '4'"><i class="fa-solid fa-circle-notch"></i>
                  Hazırlandı</span>
                <span class="badge bg-primary" v-else-if="order.status == '5'"><i class="fa-solid fa-person-biking"></i>
                  Yolda</span>
                <span class="badge bg-primary" v-else-if="order.status == '6'"><i class="fa-solid fa-handshake"></i>
                  Teslim Edildi</span>
                <span class="badge bg-primary" v-else-if="order.status == '7'"><i class="fa-solid fa-handshake"></i>
                  İade Kabul Edildi</span>
                <span class="badge bg-primary" v-else-if="order.status == '8'"><i class="fa-solid fa-handshake"></i>
                  İade Red Edildi</span>
              </div>
            </div>



          </h2>
          <div :id="'order' + order.id" class="accordion-collapse collapse" aria-labelledby="headingOne"
            data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">

              <div v-show="order.vendorNote != null">
                <small><b>Tedarikçi Notu: </b></small>
                <input type="text" class="form-control" v-model="order.vendorNote">
              </div>
              <hr v-show="order.vendorNote != null">
              <div class="p-2">
                <small>
                  <div><b>Tel: </b></div>
                  tel yazılacak
                  <!--div v-text="order.address.address"></div>
                  <div v-text="order.address.district + '/' + order.address.province"></div-->
                </small>
                <small>
                  <div><b>Adres: </b></div>
                  <div v-text="order.address.address"></div>
                  <div v-text="order.address.district + '/' + order.address.province"></div>
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
                        <span class="badge bg-danger" v-if="orderItem.status == '-3'"><i class="fa-solid fa-xmark"></i>
                          İade
                          Et</span>
                        <span class="badge bg-danger" v-if="orderItem.status == '-2'"><i class="fa-solid fa-xmark"></i>
                          İptal
                          Et</span>
                        <span class="badge bg-danger" v-if="orderItem.status == '-1'"><i class="fa-solid fa-xmark"></i>
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
                          İade Kabul Edildi</span>
                        <span class="badge bg-primary" v-else-if="orderItem.status == '8'"><i
                            class="fa-solid fa-handshake"></i>
                          İade Red Edildi</span>
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
                        <span v-text="orderItem.amount * orderItem.price + '₺'"></span>
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
      websocket: undefined
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
        console.log(message);
        message = JSON.parse(message.data);
        this.orders.push(message.order);
        alert("Yeni Sipariş")
      }
    }
  },
  mounted() {
    this.vendorId = localStorage.getItem("vendor");
    this.token = localStorage.getItem("token");
    this.connectToWebSocket();
    this.toastVue = new Toast(document.querySelector("#toast_alert"));
    //inti toast
    Array.from(document.querySelectorAll('.toast'))
      .forEach(toastNode => new Toast(toastNode))
    Promise.all([this.getUsersOrdersByUserId()])
      .then((data) => {
        this.orders = data[0];
      });
  }
};
</script>
