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