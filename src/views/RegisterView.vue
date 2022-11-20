<template>
    <div class="container-fluid mt-2 w-50">
        <form action="">
            <input class="form-control" v-model="name" type="text" placeholder="İsim" />
            <input class="form-control" v-model="email" type="email" placeholder="Email" />
            <input class="form-control" v-model="password" type="password" placeholder="Şifre" />
            <button class="btn btn-success" @click.prevent="submitHandle">KAYIT OL</button>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: "",
            email: "",
            password: ""
        }
    },
    methods: {
        submitHandle() {
            fetchFunc("http://localhost:8080/auth/register", "POST", {}, {
                "name": this.name,
                "email": this.email,
                "password": this.password,
                "vendorId": this.vendorId
            })
        }
    }
}
</script>