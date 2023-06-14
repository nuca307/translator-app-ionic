<template>
    <div class="container">
        <div class="ana-baslik-main text-center">
            <h1 class="ana-baslik buyuk" style="display: inline">DİL</h1>
            <h6 class="ana-baslik kucuk" style="display: inline">Öğreniyorum</h6>
        </div>

        <h6 class="text-center" style="font-weight:bold">Kayıt Ol</h6>

        <div>
            <input class="form-control mt-4" type="text" placeholder="İsim" v-model="isim">
            <input class="form-control mt-3" type="email" placeholder="E-posta" v-model="ePosta">
            <input class="form-control mt-3" type="password" placeholder="Şifre" v-model="sifre">
        </div>

        <div class="d-flex justify-content-around mt-5">
            <button type="button" class="btn btn-outline-light" style="width: 9rem;" @click="kayitOk()">Kayıt Ol</button>
        </div>


    </div>
</template>

<script>
export default {
    data() {
        return {
            isim: "",
            ePosta: "",
            sifre: "",
        }
    },
    methods: {
        kayitOk() {
            if (this.isim == "" || this.ePosta == "" || this.sifre == "") {
                alert("Tüm bilgileri giriniz!");
            } else if (localStorage.getItem("kullanicilar") == null) {
                let kullanicilar = [{
                    isim: this.isim,
                    eposta: this.ePosta,
                    sifre: this.sifre
                }];
                localStorage.setItem("kullanicilar", JSON.stringify(kullanicilar));
                this.$router.push("/");
            } else {
                let newKullanici = {
                    isim: this.isim,
                    eposta: this.ePosta,
                    sifre: this.sifre
                };
                let kullanicilar1 = JSON.parse(localStorage.getItem("kullanicilar"));

                kullanicilar1.push(newKullanici);
                localStorage.setItem("kullanicilar", JSON.stringify(kullanicilar1));
                this.$router.push("/");
            }
        }
    }
}
</script>
