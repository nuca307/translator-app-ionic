<style>
.order-item-header {
  display: flex;
  justify-content: space-between;
  max-width: 500px;
}

.order-item-header * {
  margin: 0 2px;
}

.order-message {
  color: #6d57db;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
<template>
  <div class="container-fluid mt-2">
    <button class="btn btn-secondary" @click="this.$router.go()">Yenile</button>
    <h4>Görevler</h4>
    <div class="accordion" id="activeTasks" v-if="carrierOrders.length">
      <div class="accordion-item" v-for="order of carrierOrders">
        <h2 class="accordion-header position-relative accordion-button collapsed" id="headingOne"
          data-bs-toggle="collapse" :data-bs-target="'#activeOrder' + order.id" aria-expanded="false"
          :aria-controls="'activeOrder' + order.id" @click="hideOrderMessage($event)">
          <span :id="'dutyOrderMessage' + order.id" class="order-message" style="display:none;">
            <i class="fa-solid fa-3x fa-triangle-exclamation"></i></span>
          <div class="d-flex justify-content-between w-100">
            <div v-text="'Sipariş No: ' + order.id"> </div>
            <div v-text="order.vendor.name"> </div>
            <div>
              <span class="badge bg-danger" style="min-width: 110px;" v-if="order.status == '-5'"><i
                  class="fa-solid fa-thumbs-down"></i>
                İade Red Edildi</span>
              <span class="badge bg-danger" style="min-width: 110px;" v-else-if="order.status == '-4'"><i
                  class="fa-solid fa-handshake-slash"></i>
                İptal Red Edildi</span>
              <span class="badge bg-danger" style="min-width: 110px;" v-else-if="order.status == '-3'"><i
                  class="fa-solid fa-rotate-left"></i> İade İnceleniyor</span>
              <span class="badge bg-danger" style="min-width: 110px;" v-else-if="order.status == '-2'"><i
                  class="fa-solid fa-strikethrough"></i> İptal
                İnceleniyor</span>
              <span class="badge bg-danger" style="min-width: 110px;" v-else-if="order.status == '-1'"><i
                  class="fa-solid fa-xmark"></i> Satıcı İptal
                Etti</span>
              <span class="badge bg-warning" style="min-width: 110px;" v-else-if="order.status == '0'">Bekleniyor</span>
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
                  class="fa-solid fa-truck-fast"></i>
                Yolda</span>
              <span class="badge bg-primary" style="min-width: 110px;" v-else-if="order.status == '6'"><i
                  class="fa-solid fa-check-double"></i>
                Teslim Edildi</span>
              <span class="badge bg-primary" style="min-width: 110px;" v-else-if="order.status == '7'"><i
                  class="fa-solid fa-handshake"></i>
                İptal Kabul Edildi</span>
              <span class="badge bg-primary" style="min-width: 110px;" v-else-if="order.status == '8'"><i
                  class="fa-solid fa-handshake-angle"></i>
                İade Kabul Edildi</span>
            </div>
          </div>
        </h2>
        <div :id="'activeOrder' + order.id" class="accordion-collapse collapse" aria-labelledby="headingOne"
          data-bs-parent="#activeTasks">
          <div class="accordion-body">
            <div class="d-flex justify-content-between">
              <small v-text="'Ürün Tutarı: ' + order.totalItemPrice.toFixed(2) + '₺'"></small>
              <small class="mx-2" v-text="'Hizmet Tutarı: ' + order.carryingPrice.toFixed(2) + '₺'"></small>
              <strong
                v-text="'Toplam Tutar: ' + (order.totalItemPrice + order.carryingPrice).toFixed(2) + '₺'"></strong>
            </div>
            <div v-if="order.payment.method == 'Kredi Kartı'">
              <div class="alert alert-success">Kredi Kartı İle Ödemesi Alınmıştır</div>
              <div v-if="order.status == '6'" class="alert alert-success">Sipariş Teslim Edildi</div>
              <button v-else class="btn btn-success" @click="setOrderStatus(order, 6)">Siparişi Teslim Et</button>
            </div>
            <div v-else-if="order.payment.method == 'Kapıda Ödeme' && order.payment.status == 'Ödendi'">
              <div class="alert alert-success">Kapıda Ödeme İle Ödemesi Alınmıştır</div>
              <div v-if="order.status == '6'" class="alert alert-success">Sipariş Teslim Edildi</div>
              <button v-else class="btn btn-success" @click="setOrderStatus(order, 6)">Siparişi Teslim Et</button>
            </div>
            <div v-if="order.payment.status == 'Ödenmedi'">
              <button class="btn btn-sm btn-primary" @click="collectPayment(order)">Ödeme Al</button>
            </div>
            <div v-if="order.vendorNote">
              <small><b>Tedarikçi Notu: </b></small>
              <span v-text="order.vendorNote"></span>
            </div>
            <hr>
            <div class="row p-2">
              <div class="col-md-6">

                <small>
                  <h6>Teslimat Bilgileri</h6>
                  <hr>
                  <div><b>Müşteri Ad-Soyad: </b></div>
                  <div v-text="order.user.firstName + ' ' + order.user.lastName"></div>
                  <b>Telefon: </b>
                  <span v-text="order.user.phone"></span>
                </small>
                <small>
                  <div><b>Adres: </b> <button style="background: #4027bb;color:white" class="btn btn-sm"
                      @click="openMaps(order.address, order.vendor)">GİT</button></div>
                  <div v-text="order.address.address"></div>
                  <div v-text="order.address.district + '/' + order.address.province"></div>
                  <div>
                    <span v-text="'Apartman: ' + order.address.apartment"></span>
                    <span v-text="' Kat: ' + order.address.floor"></span>
                    <span v-text="' Daire: ' + order.address.roomNumber"></span>
                  </div>
                  <div><b>Tarif: </b></div>
                  <div v-text="order.address.directions"></div>
                </small>
              </div>
              <div class="col-md-6">
                <small>
                  <h6>Tedarikçi Bilgileri</h6>
                  <hr>
                  <div><b>Tedarikçi: </b></div>
                  <div v-text="order.vendor.name"></div>
                  <b>Telefon: </b>
                  <span v-text="order.vendor.phone"></span>
                </small>
                <small>
                  <div><b>Adres: </b></div>
                  <div v-text="order.vendor.address"></div>
                  <div v-text="order.vendor.district + '/' + order.vendor.province"></div>
                </small>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-xl-6" v-for="orderItem of order.purchaseOrderItems">
                <div class="card text-bg-light m-1 p-2">
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
                      <div v-text="orderItem.totalSellingPrice.toFixed(2) + '₺'"></div>
                    </div>
                  </div>
                  <div v-if="orderItem.customerNote">
                    <small>
                      <div><b>Müşteri Notu: </b><span v-text="orderItem.customerNote"></span></div>
                    </small>
                  </div>
                  <div>
                    <div>
                      <span class="badge bg-danger" v-if="orderItem.status == '-5'"><i
                          class="fa-solid fa-thumbs-down"></i> İade Reddedildi</span>
                      <span class="badge bg-danger" v-if="orderItem.status == '-4'"><i
                          class="fa-solid fa-handshake-slash"></i> İptal Reddedildi</span>
                      <span class="badge bg-warning" v-else-if="orderItem.status == '-3'"><i
                          class="fa-solid fa-rotate-left"></i>
                        İade İnceleniyor</span>
                      <span class="badge bg-warning" v-else-if="orderItem.status == '-2'"><i
                          class="fa-solid fa-strikethrough"></i>
                        İptal İnceleniyor</span>
                      <span class="badge bg-danger" v-else-if="orderItem.status == '-1'"><i
                          class="fa-solid fa-xmark"></i> Satıcı İptal Etti</span>
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
                          class="fa-solid fa-check-double"></i>
                        Teslim Edildi</span>
                      <span class="badge bg-primary" v-else-if="orderItem.status == '7'"><i
                          class="fa-solid fa-handshake"></i>
                        İptal Kabul Edildi</span>
                      <span class="badge bg-primary" v-else-if="orderItem.status == '8'"><i
                          class="fa-solid fa-handshake-angle"></i>
                        İade Kabul Edildi</span>

                    </div>
                    <div v-if="orderItem.vendorNote">
                      <small><b>Tedarikçi Notu: </b></small>
                      <span v-text="orderItem.vendorNote"></span>
                    </div>
                  </div>
                  <hr>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <h4>Siparişler</h4>
    <div class="row" v-if="orders.length">
      <div class="accordion" id="accordionFlushExample">
        <div class="accordion-item" v-for="order of orders">
          <h2 class="accordion-header position-relative accordion-button collapsed" id="headingOne"
            data-bs-toggle="collapse" :data-bs-target="'#order' + order.id" aria-expanded="false"
            :aria-controls="'order' + order.id" @click="hideOrderMessage($event)">
            <span :id="'orderMessage' + order.id" class="order-message" style="display:none;">
              <i class="fa-solid fa-3x fa-triangle-exclamation"></i></span>
            <div class="d-flex justify-content-between w-100">
              <div v-text="'Sipariş No: ' + order.id"> </div>
              <div v-text="order.vendor.name"> </div>
              <div>
                <span class="badge bg-danger" style="min-width: 110px;" v-if="order.status == '-5'"><i
                    class="fa-solid fa-thumbs-down"></i>
                  İade Red Edildi</span>
                <span class="badge bg-danger" style="min-width: 110px;" v-else-if="order.status == '-4'"><i
                    class="fa-solid fa-handshake-slash"></i>
                  İptal Red Edildi</span>
                <span class="badge bg-warning" style="min-width: 110px;" v-else-if="order.status == '-3'"><i
                    class="fa-solid fa-rotate-left"></i> İade İnceleniyor</span>
                <span class="badge bg-warning" style="min-width: 110px;" v-else-if="order.status == '-2'"><i
                    class="fa-solid fa-strikethrough"></i> İptal İnceleniyor</span>
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
                    class="fa-solid fa-truck-fast"></i>
                  Yolda</span>
                <span class="badge bg-primary" style="min-width: 110px;" v-else-if="order.status == '6'"><i
                    class="fa-solid fa-check-double"></i>
                  Teslim Edildi</span>
                <span class="badge bg-primary" style="min-width: 110px;" v-else-if="order.status == '7'"><i
                    class="fa-solid fa-handshake"></i>
                  İptal Kabul Edildi</span>
                <span class="badge bg-primary" style="min-width: 110px;" v-else-if="order.status == '8'"><i
                    class="fa-solid fa-handshake-angle"></i>
                  İade Kabul Edildi</span>
              </div>
            </div>
          </h2>
          <div :id="'order' + order.id" class="accordion-collapse collapse" aria-labelledby="headingOne"
            data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
              <div class="d-flex justify-content-between">
                <small v-text="'Ürün Tutarı: ' + order.totalItemPrice.toFixed(2) + '₺'"></small>
                <small class="mx-2" v-text="'Hizmet Tutarı: ' + order.carryingPrice.toFixed(2) + '₺'"></small>
                <strong
                  v-text="'Toplam Tutar: ' + (order.totalItemPrice + order.carryingPrice).toFixed(2) + '₺'"></strong>
              </div>
              <span v-if="order.carrier"><i class="fa-solid fa-circle-user"></i> Kurye: <strong
                  v-text="order.carrier.firstName + ' ' + order.carrier.lastName"></strong></span>
              <button class="btn btn-sm btn-primary" @click="setOrderCarrier(order)">SEÇ</button>

              <div v-if="order.vendorNote">
                <small><b>Tedarikçi Notu: </b></small>
                <span v-text="order.vendorNote"></span>
              </div>
              <hr>
              <div class="row p-2">
                <div class="col-md-6">

                  <small>
                    <h6>Teslimat Bilgileri</h6>
                    <hr>
                    <div><b>Müşteri Ad-Soyad: </b></div>
                    <div v-text="order.user.firstName + ' ' + order.user.lastName"></div>
                    <b>Telefon: </b>
                    <span v-text="order.user.phone"></span>
                  </small>
                  <small>
                    <div><b>Adres: </b> <button style="background: #4027bb;color:white" class="btn btn-sm"
                        @click="openMaps(order.address, order.vendor)">GİT</button></div>
                    <div v-text="order.address.address"></div>
                    <div v-text="order.address.district + '/' + order.address.province"></div>
                    <div>
                      <span v-text="'Apartman: ' + order.address.apartment"></span>
                      <span v-text="' Kat: ' + order.address.floor"></span>
                      <span v-text="' Daire: ' + order.address.roomNumber"></span>
                    </div>
                    <div><b>Tarif: </b></div>
                    <div v-text="order.address.directions"></div>
                  </small>
                </div>
                <div class="col-md-6">
                  <small>
                    <h6>Tedarikçi Bilgileri</h6>
                    <hr>
                    <div><b>Tedarikçi: </b></div>
                    <div v-text="order.vendor.name"></div>
                    <b>Telefon: </b>
                    <span v-text="order.vendor.phone"></span>
                  </small>
                  <small>
                    <div><b>Adres: </b></div>
                    <div v-text="order.vendor.address"></div>
                    <div v-text="order.vendor.district + '/' + order.vendor.province"></div>
                  </small>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-xl-6" v-for="orderItem of order.purchaseOrderItems">
                  <div class="card text-bg-light m-1 p-2">
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
                        <div v-text="orderItem.totalSellingPrice.toFixed(2) + '₺'"></div>
                      </div>
                    </div>
                    <div v-if="orderItem.customerNote">
                      <small>
                        <div><b>Müşteri Notu: </b><span v-text="orderItem.customerNote"></span></div>
                      </small>
                    </div>
                    <div>
                      <div>
                        <span class="badge bg-danger" v-if="orderItem.status == '-5'"><i
                            class="fa-solid fa-thumbs-down"></i> İade Reddedildi</span>
                        <span class="badge bg-danger" v-if="orderItem.status == '-4'"><i
                            class="fa-solid fa-handshake-slash"></i> İptal Reddedildi</span>
                        <span class="badge bg-warning" v-else-if="orderItem.status == '-3'"><i
                            class="fa-solid fa-rotate-left"></i>
                          İade İnceleniyor</span>
                        <span class="badge bg-warning" v-else-if="orderItem.status == '-2'"><i
                            class="fa-solid fa-strikethrough"></i>
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
                            class="fa-solid fa-check-double"></i>
                          Teslim Edildi</span>
                        <span class="badge bg-primary" v-else-if="orderItem.status == '7'"><i
                            class="fa-solid fa-handshake"></i>
                          İptal Kabul Edildi</span>
                        <span class="badge bg-primary" v-else-if="orderItem.status == '8'"><i
                            class="fa-solid fa-handshake-angle"></i>
                          İade Kabul Edildi</span>

                      </div>
                      <div v-if="orderItem.vendorNote">
                        <small><b>Tedarikçi Notu: </b></small>
                        <span v-text="orderItem.vendorNote"></span>
                      </div>
                    </div>
                    <hr>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-warning">Gösterilecek Talep Yok</div>
    <toast-vue :toast="toast"></toast-vue>
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
      carrierOrders: [],
      orderItems: [],
      toast: {},
      toastVue: undefined,
      changeableStatuses: [0, 1, 2, 3, 4, 5],
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
        fetch("https://tıktık.com:8443/api/" + resource, headers)
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
    openMaps(address, vendor) {
      var link = document.createElement("a");
      link.id = 'someLink'; //give it an ID!
      link.target = '_blank';
      let waypoints = encodeURI(vendor.address + " " + vendor.province + " " + vendor.district);
      if (address.latitude && address.longitude && address.latitude != 37.42 && address.longitude != 31.85) {
        link.href = `https://www.google.com/maps/dir/?api=1&destination=${address.latitude}%2C${address.longitude}`;// &waypoints=${waypoints}
      } else {
        let destination = encodeURI(address.address + " " + address.province + " " + address.district);
        link.href = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;// &waypoints=${waypoints}
      }
      document.body.append(link);

      //Add the link somewhere, an appendChild statement will do.
      //Then run this
      document.getElementById('someLink').click();
      document.getElementById('someLink').remove();

    },
    setOrderStatus(order, status, shouldCascade = true) { // TODO: Log eklenmeli
      if (status == -1 && !order.vendorNote) {
        event.preventDefault();
        alert("Geri çevirme işlemi için not giriniz");
        return;
      }
      order.status = status;
      if (shouldCascade) {
        order.purchaseOrderItems.forEach((item) => {
          if (this.changeableStatuses.includes(parseInt(item.status))) {
            item.status = status
          }
        })
      }
      return new Promise((resolve) => {
        this.fetchFunc("carrier/purchaseOrders/status/" + order.id + "/" + JSON.parse(localStorage.getItem("user")).id, "PUT", {}, order).then(res => {
          order = res;
          this.emitter.emit("send_websocket_message",
            `orderId=${order.id}&status=${order.status}&process=update&message=Sipariş Güncellemesi`);

          this.showToast();
        }).catch((err) => {
          this.showToast({}, err);
        })
      });
    },
    setOrderItemStatus(order, orderItem, status) {
      if (status == -1 && !orderItem.vendorNote) {
        event.preventDefault();
        alert("Geri çevirme işlemi için not giriniz");
        return;
      }
      orderItem.status = status;
      if (order.status < orderItem.status) {
        this.setOrderStatus(order, status, false);
      }
      return new Promise((resolve) => {// TODO: Log eklenmeli
        this.fetchFunc("vendor/purchaseOrderItems/status/" + orderItem.id, "PUT", {}, orderItem).then(res => {
          orderItem = res;
          this.showToast();
        }).catch((err) => {
          this.showToast({}, err);

        })
      });
    },
    setOrderCarrier(order) { // TODO: Log eklenmeli
      return new Promise((resolve) => {
        this.fetchFunc("purchaseOrders/carrier/" + order.id + "/" + JSON.parse(localStorage.getItem("user")).id, "PUT", {}, order).then(res => {
          order = res;
          this.emitter.emit("send_websocket_message",
            `orderId=${order.id}&status=${order.status}&process=update&message=Sipariş Güncellemesi`);
          this.carrierOrders.push(order);
          let index = this.orders.findIndex(e => e.id == order.id);
          this.orders.splice(index, 1);
          this.showToast();
        }).catch((err) => {
          this.showToast({}, err);
        })
      });
    },
    collectPayment(order) {
      return new Promise((resolve) => {
        this.fetchFunc("carrier/payments/collect", "PUT", {}, order).then(res => {
          order.payment = { ...res };
          this.emitter.emit("send_websocket_message",
            `orderId=${order.id}&status=${order.status}&process=update&message=Sipariş Güncellemesi`);
          let index = this.carrierOrders.findIndex(e => e.id == order.id);
          this.carrierOrders.splice(index, 1, order);
          this.showToast();
        }).catch((err) => {
          this.showToast({}, err);
        })
      });
    },
    getAllOrders() {
      return new Promise((resolve) => {
        this.fetchFunc("purchaseOrders/alive/" + JSON.parse(localStorage.getItem("user")).id, "GET", {}).then(res => {
          /*this.orders = res;
          this.carrierOrders = res.filter(e => {
            return e.carrier && e.carrier.id == JSON.parse(localStorage.getItem("user")).id
          });*/
          this.orders = [];
          this.carrierOrders = [];
          let userId = JSON.parse(localStorage.getItem("user")).id;
          for (let order of res) {
            if (order.carrier && order.carrier.id == userId) {
              this.carrierOrders.push(order);
            } else {
              this.orders.push(order);
            }
          }
          resolve(res);
        })
      });

    },
    getOneOrder(orderId) {
      return new Promise((resolve) => {
        this.fetchFunc("purchaseOrders/" + orderId, "GET", {}).then(res => {
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
        Toast.getInstance(document.querySelector("#toast_alert")).show();
      }
    },
    hideOrderMessage(event) {
      event.currentTarget.querySelector('.order-message').style.display = 'none'
    }
  },
  mounted() {

    this.vendorId = localStorage.getItem("vendor");
    this.token = localStorage.getItem("token");

    this.toastVue = new Toast(document.querySelector("#toast_alert"));
    //inti toast
    Array.from(document.querySelectorAll('.toast'))
      .forEach(toastNode => new Toast(toastNode))
    this.getAllOrders()
      .then((res) => {

      });
    this.emitter.on("on_websocket_message", (message) => {
      let params = {};
      let parts = message.data.split("&");
      parts.forEach(part => {
        let entries = part.split("=");
        params[entries[0]] = entries[1];
      });

      if (!params.level) return;
      if (!params.orderId) return;
      //if (params.level == "item" && !params.itemId) return;

      if (params.process == "create") {
        this.getOneOrder(params.orderId).then((res) => {
          this.orders.unshift(res);
          this.$nextTick(() => {
            document.querySelector("#orderMessage" + params.orderId).style.display = "inline-block";
          })
        })
      } else {
        let orderIndex = this.orders.findIndex(e => e.id == params.orderId);
        let type = "orders";
        if (orderIndex < 0) {
          type = "carrierOrders";
          orderIndex = this.carrierOrders.findIndex(e => e.id == params.orderId);
        }
        this.getOneOrder(params.orderId).then((res) => {
          if (type == "orders") {
            this.orders.splice(orderIndex, 1, res);
            this.$nextTick(() => {
              document.querySelector("#orderMessage" + params.orderId).style.display = "inline-block";
            })
          } else {
            this.carrierOrders.splice(orderIndex, 1, res);
            this.$nextTick(() => {
              document.querySelector("#dutyOrderMessage" + params.orderId).style.display = "inline-block";
            })
          }
        })
      }
    })
  },
  beforeUnmount() {
    this.emitter.off("on_websocket_message");
  }
};
</script>