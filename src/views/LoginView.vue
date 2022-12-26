<template>
    <div class="container-fluid mt-2 d-flex justify-content-center align-items-center"
        style="width: 100vw;height: 100vh;">
        <form action="">
            <div class="text-center">
                <img src="/logo.png" alt="TıkTık" width="100" />
            </div>
            <input class="form-control" v-model="email" type="email" placeholder="Email" />
            <input class="form-control" v-model="password" type="password" placeholder="Şifre" />
            <div class="text-center">
                <button class="btn btn-success" @click.prevent="submitHandle">GİRİŞ YAP</button>
            </div>
            <div class="d-flex justify-content-between">
                <RouterLink to="/kayit-ol">Kayıt Ol</RouterLink>
                <RouterLink to="/">Kaydolmadan Devam Et</RouterLink>
            </div>
            <div class="text-center">
                <span class="text-danger" v-text="alert"></span>
            </div>
        </form>
    </div>
</template>
<script>
import { RouterLink } from 'vue-router';

export default {
    components: [
        RouterLink
    ],
    data() {
        return {
            email: "",
            password: "",
            alert: ""
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
        submitHandle() {
            this.fetchFunc("http://localhost:8080/auth/login", "POST", {}, {
                "email": this.email,
                "password": this.password
            }).then(res => {
                if (res.status == 200) {
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("user", JSON.stringify(res.user));
                    const params = new Proxy(new URLSearchParams(window.location.search), {
                        get: (searchParams, prop) => searchParams.get(prop),
                    });
                    let url = params.return ? params.return : "/";
                    this.$router.push(url);
                }
                if (res.status == 401) {
                    this.alert = "Vermiş olduğunuz bilgiler birbiriyle uyuşmamaktadır."
                }
            })
        }
    }
}
</script>
