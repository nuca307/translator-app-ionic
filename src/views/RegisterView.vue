<template>
    <ion-page class="container-fluid mt-2 d-flex justify-content-center align-items-center"
        style="width: 100vw;height: 100vh;">
        <form action="">
            <div class="text-center">
                <img src="/assets/logo.png" alt="TıkTık" width="100" />
            </div>

            <input class="form-control" v-model="info.firstName" type="text" placeholder="Ad" />
            <input class="form-control" v-model="info.lastName" type="text" placeholder="Soyad" />
            <input class="form-control" v-model="info.email" type="email" placeholder="Email" id="email" />
            <input class="form-control" v-model="info.phone" type="text" placeholder="Telefon" />
            <input class="form-control" v-model="info.password" type="password" placeholder="Şifre"
                @change="checkPasswords()" />
            <input class="form-control" v-model="info.passwordConfirmation" type="password" placeholder="Şifre Onayı"
                @change="checkPasswords()" />
            <div class="text-center">
                <button class="btn btn-success" @click.prevent="submitHandle">KAYIT OL</button>
            </div>
            <div class="d-flex justify-content-between">
                <RouterLink to="/giris-yap">Giriş Yap</RouterLink>
                <RouterLink to="/" onclick="localStorage.clear()">Kaydolmadan Devam Et</RouterLink>
            </div>
            <div class="text-center">
                <span class="text-danger" v-text="alert"></span>
            </div>
        </form>
    </ion-page>
</template>
<script>
import { IonPage } from '@ionic/vue';

export default {
    components: {
        IonPage
    },
    data() {
        return {
            info: {
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                password: "",
                passwordConfirmation: "",
                jurisdiction: [],
                isActive: true,
                role: { id: 4 }
            },
            alert: "",
            passwordValidity: false
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
        checkPasswords() {
            if (this.info.password != this.info.passwordConfirmation) {
                this.alert = "Şifreler Eşleşmiyor!";
                this.passwordValidity = false;
            } else {
                this.alert = "";
                this.passwordValidity = true;
            }
        },
        validateUser() {
            if (!this.info.firstName) {
                alert("Ad olmadan kayıt yapamazsınız");
                return false;
            }
            if (!this.info.lastName) {
                alert("Soyad olmadan kayıt yapamazsınız");
                return false;
            }
            if (this.info.firstName.length < 3) {
                alert("Geçerli bir ad giriniz");
                return false;
            }
            if (this.info.lastName.length < 2) {
                alert("Geçerli bir soyad giriniz");
                return false;
            }
            if (!this.info.email) {
                alert("Email olmadan kayıt yapamazsınız");
                return false;
            }
            if (!this.validateEmail(this.info.email)) {
                alert("Geçerli bir email olmadan kayıt yapamazsınız");
                return false;
            }
            if (!this.info.password) {
                alert("Şifre olmadan kayıt yapamazsınız");
                return false;
            }
            if (!this.info.phone) {
                alert("Telefon olmadan kayıt yapamazsınız");
                return false;
            }
            if (!this.passwordValidity) return;
            return true;
        },
        submitHandle() {
            if (!this.validateUser()) return;
            this.fetchFunc("https://tıktık.com:8443/api/auth/register", "POST", {}, this.info).then((res) => {
                if (res.status == "201" || res.status == "204") {
                    this.alert = res.message
                    this.$router.push("/giris-yap")
                }
                else {
                    this.alert = res.message
                }
            }).catch((err) => {
                this.showToast({}, err);
            })
        },
        validateEmail(email) {
            return email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        }
    }
}
</script>