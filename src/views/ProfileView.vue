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
    <div class="row">
      <label class="col-12 col-md-6 col-xl-4 mt-2">
        <span>Ad</span>
        <div class="input-group">
          <input class="form-control" v-model="selectedUser.firstName" type="text" placeholder="Ad" />
        </div>
      </label>
      <label class="col-12 col-md-6 col-xl-4 mt-2">
        <span>Soyad</span>
        <div class="input-group">
          <input class="form-control" v-model="selectedUser.lastName" type="text" placeholder="Soyad" />
        </div>
      </label>
      <label class="col-12 col-md-6 col-xl-4 mt-2">
        <span>E Posta</span>
        <div class="input-group">
          <input class="form-control" v-model="selectedUser.email" type="mail" placeholder="mail@gmail.com" />
        </div>
      </label>
      <label class="col-12 col-md-6 col-xl-4 mt-2">
        <span>Telefon No</span>
        <div class="input-group">
          <input class="form-control" v-model="selectedUser.phone" type="tel" placeholder="Telefon No" />
        </div>
      </label>
      <label class="col-12 col-md-6 col-xl-4 mt-2">
        <span>Yeni Şifrenizi Giriniz</span>
        <div class="input-group">
          <input class="form-control" :type="this.pwdOpen ? 'text' : 'password'" placeholder="**********"
            autocomplete="off" v-model="pwd" @change="checkPasswords()" />
          <span class="input-group-text" @click="this.pwdOpen = !this.pwdOpen"><i class="fa-solid"
              :class="this.pwdOpen ? 'fa-eye' : 'fa-eye-slash'"></i></span>
        </div>
      </label>
      <label class="col-12 col-md-6 col-xl-4 mt-2">
        <span>Yeni Şifrenizi Tekrar Giriniz</span>
        <div class="input-group">
          <input class="form-control" :type="this.pwdConfirmationOpen ? 'text' : 'password'" placeholder="**********"
            autocomplete="off" v-model="pwdConfirmation" @change="checkPasswords()" />
          <span class="input-group-text" @click="this.pwdConfirmationOpen = !this.pwdConfirmationOpen"><i
              class="fa-solid" :class="this.pwdConfirmationOpen ? 'fa-eye' : 'fa-eye-slash'"></i></span>
        </div>
      </label>
      <div class="text-center">
        <span class="text-danger" v-text="alert"></span>
      </div>
      <div class="input-group justify-content-center">
        <div class="mt-2 col-4 ">
          <button class="btn btn-secondary form-control" @click="userUpdate">Güncelle</button>
        </div>
      </div>
    </div>

    <hr class="mt-2">
    <div class="col-12 justify-content-center d-grid">
      <span class="text-center h3">Adres Listesi</span>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Adres Başlığı</th>
            <th>Adres</th>
            <th>Bölge</th>
            <th>Şehir</th>
            <th>Apartman Adı</th>
            <th>Kat</th>
            <th>Daire No</th>
            <th>Tarif</th>
            <th><i>f<sub>x</sub></i></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="address of userAddresses">
            <td><input type="text" class="form-control form-control-sm" v-model="address.title"></td>
            <td><textarea type="text" class="form-control form-control-sm" v-model="address.address"></textarea></td>
            <td><input type="text" class="form-control form-control-sm" v-model="address.district"></td>
            <td><input type="text" class="form-control form-control-sm" v-model="address.province"></td>
            <td><input type="text" class="form-control form-control-sm" v-model="address.apartment"></td>
            <td><input type="text" class="form-control form-control-sm" v-model="address.floor"></td>
            <td><input type="text" class="form-control form-control-sm" v-model="address.roomNumber"></td>
            <td><textarea type="text" class="form-control form-control-sm" v-model="address.directions"></textarea></td>

            <td><button class="btn btn-sm btn-primary" @click="setAddress(address)"><i
                  class="fa-solid fa-check"></i></button></td>
            <td><button class="btn btn-sm btn-danger" @click="removeAddress(address)"><i
                  class="fa-solid fa-trash"></i></button></td>
          </tr>
        </tbody>
      </table>
    </div>

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
      selectedUser: {},
      pwd: "",
      pwdConfirmation: "",
      userAddresses: [],
      orderItems: [],
      toast: {},
      toastVue: undefined,
      websocket: undefined,
      userName: null,
      userPhone: null,
      userId: null,
      passwordValidity: false,
      pwdOpen: false,
      pwdConfirmationOpen: false,
      alert: "",

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
    setAddress(address) {
      if (!this.validateAddress(address)) return;
      this.fetchFunc("https://tıktık.com:8443/api/addresses", 'PUT', {}, address).then((res) => {
        this.showToast();
        this.emitter.emit("addresses_modal", JSON.parse(JSON.stringify(res)));
        localStorage.setItem("address", JSON.stringify(res));

      }).catch((err) => {
        this.showToast({}, err);
      })
    },
    validateAddress(address) {
      if (!address.address) {
        alert("Adres olmadan kayıt yapamazsınız");
        return false;
      }
      if (!address.title) {
        alert("Adres Başlığı olmadan kayıt yapamazsınız");
        return false;
      }
      if (!address.province) {
        alert("İl olmadan kayıt yapamazsınız");
        return false;
      }
      if (!address.district) {
        alert("İlçe olmadan kayıt yapamazsınız");
        return false;
      }
      if (!address.floor) {
        alert("Kat No olmadan kayıt yapamazsınız");
        return false;
      }
      if (!address.roomNumber) {
        alert("Daire No olmadan kayıt yapamazsınız");
        return false;
      }
      return true;
    },
    getUsersByUserId() {
      return new Promise((resolve, reject) => {
        let user = JSON.parse(localStorage.getItem("user"));
        this.fetchFunc("https://tıktık.com:8443/api/" + user.id, "GET", {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then(res => {
          let tk = this.parseJwt(localStorage.getItem("token"));
          if (res.id == tk.sub) {
            resolve(res);
          }
          else {
            alert("Yetkisiz İşlem Yaptınız");
            return;
          }
        })
      });
    },
    getUserData() {
      return new Promise((resolve, reject) => {
        let user = JSON.parse(localStorage.getItem("user"));
        this.fetchFunc("https://tıktık.com:8443/api/addresses/user/isActive/" + user.id, "GET", {}).then(res => {
          this.userAddresses = res;
        })
      });
    },
    parseJwt(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    },
    userUpdate() {
      this.selectedUser.password = this.pwd;
      if (!this.validateUser()) return;
      this.fetchFunc("https://tıktık.com:8443/api/auth/register/update", "PUT", {}, this.selectedUser).then((res) => {
        if (res.status == "201" || res.status == "204") {
          this.alert = res.message;
          this.$router.push("/giris-yap");
        }
        else {
          this.alert = res.message
        }
      }).catch((err) => {
        this.showToast({}, err);
      })
    },
    checkPasswords() {
      if (this.pwd != this.pwdConfirmation) {
        this.alert = "Şifreler Eşleşmiyor!";
        this.passwordValidity = false;
      } else {
        this.alert = "";
        this.passwordValidity = true;
      }
    },
    validateUser() {
      if (!this.passwordValidity) return;
      if (!this.selectedUser.firstName) {
        alert("İsim olmadan kayıt yapamazsınız");
        return false;
      }
      if (this.selectedUser.firstName.length < 3) {
        alert("Geçerli bir isim giriniz");
        return false;
      }
      if (!this.selectedUser.lastName) {
        alert("İsim olmadan kayıt yapamazsınız");
        return false;
      }
      if (this.selectedUser.lastName.length < 2) {
        alert("Geçerli bir isim giriniz");
        return false;
      }
      if (!this.selectedUser.email) {
        alert("Email olmadan kayıt yapamazsınız");
        return false;
      }
      if (!this.selectedUser.password) {
        alert("Şifre olmadan kayıt yapamazsınız");
        return false;
      }
      if (!this.selectedUser.phone) {
        alert("Telefon olmadan kayıt yapamazsınız");
        return false;
      }
      return true;
    },
    removeAddress(adres) {
      this.fetchFunc("https://tıktık.com:8443/api/addresses/" + adres.id, "DELETE", {}).then(res => {
        this.getUserData();
      }).catch((err) => {
        alert("Hata Meydana Geldi")
      })
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
          message: "İşlem Başarılı",
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
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log("Profile:", user);
    this.userName = user.firstName + " " + user.lastName;
    this.userPhone = user.phone;
    this.userId = user.id;
    this.token = localStorage.getItem("token");
    this.toastVue = new Toast(document.querySelector("#toast_alert"));
    //inti toast
    Array.from(document.querySelectorAll('.toast'))
      .forEach(toastNode => new Toast(toastNode))
    Promise.all([this.getUsersByUserId()])
      .then((data) => {

        this.selectedUser = data[0];
        this.getUserData();
      });
  }
};
</script>
