<template>
    <div class="container-fluid mt-2 w-50">
        <form action="">
            <input class="form-control" v-model="email" type="email" placeholder="Email" />
            <input class="form-control" v-model="password" type="password" placeholder="Şifre" />
            <button class="btn btn-success" @click.prevent="submitHandle">GİRİŞ YAP</button>
        </form>
    </div>
</template>
<script>
let GETTING_TIMEOUT = 5000;

function fetchFunc(resource, method, options = {}, body) {
    const { timeout = GETTING_TIMEOUT } = options;
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
}
export default {
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        submitHandle() {
            fetchFunc("http://localhost:8080/auth/login", "POST", {}, {
                "email": this.email,
                "password": this.password,
                "vendorId": this.vendorId
            }).then(res => {
                console.log(res.token);
                localStorage.setItem("token", res.token);
                localStorage.setItem("user", JSON.stringify(res.user));
                this.$router.push('/')
            })
        }
    }
}
</script>