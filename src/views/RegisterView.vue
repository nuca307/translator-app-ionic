<template>
    <ion-page class="container-fluid mt-2 d-flex justify-content-center align-items-center"
        style="width: 100vw;height: 100vh;">
        <form action="">
            <div class="text-center">
                <img src="/logo.png" alt="TıkTık" width="100" />
            </div>

            <input class="form-control" v-model="info.name" type="text" placeholder="İsim" />
            <input class="form-control" v-model="info.email" type="email" placeholder="Email" />
            <input class="form-control" v-model="info.phone" type="text" placeholder="Telefon" />
            <input class="form-control" v-model="info.password" type="password" placeholder="Şifre"
                @change="checkPasswords()" />
            <input class="form-control" v-model="info.passwordConfirmation" type="password" placeholder="Şifre Onayı"
                @change="checkPasswords()" />
            <div class="text-center">
                <button class="btn btn-success" @click.prevent="submitHandle">KAYIT OL</button>
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
                name: "",
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
            if (!this.passwordValidity) return;
            if (!this.info.name) {
                alert("İsim olmadan kayıt yapamazsınız");
                return false;
            }
            if (this.info.name.length < 3) {
                alert("Geçerli bir isim giriniz");
                return false;
            }
            if (!this.info.email) {
                alert("Email olmadan kayıt yapamazsınız");
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
                this.alert = err.message
            })
        }
    }
}
</script>