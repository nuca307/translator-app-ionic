<template>
    <div class="container">
        <div class="ana-baslik-main text-center">
            <h1 class="ana-baslik buyuk" style="display: inline">DİL</h1>
            <h6 class="ana-baslik kucuk" style="display: inline">Öğreniyorum</h6>
        </div>

        <h6 class="text-center" style="font-weight:bold">Kayıt Ol</h6>

        <div>
            <input class="form-control mt-4" type="text" placeholder="İsim" v-model="isim">
            <input id="e_posta" class="form-control mt-3" type="email" placeholder="E-posta" v-model="ePosta"
                @blur="validasyon($event)">
            <input class="form-control mt-3" type="password" placeholder="Şifre" v-model="sifre">
            <input class="form-control mt-3" type="text" placeholder="Şifre kurtarma sorunuzu yazınız"
                v-model="guvenlikSoru">
            <input class="form-control mt-3" type="password" placeholder="Şifre kurtarma sorunuzun cevabını yazınız"
                v-model="guvenlikCevap">
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
            guvenlikSoru: "",
            guvenlikCevap: "",
        }
    },
    methods: {
        validasyon(e) {
            e.target.reportValidity();
        },
        kayitOk() {
            if (this.isim == "" || this.ePosta == "" || this.sifre == "") {
                alert("Tüm bilgileri giriniz!");
            } else if (this.validasyonKontrol()) {
                if (localStorage.getItem("kullanicilar") == null) {
                    let kullanicilar = [{
                        isim: this.isim,
                        eposta: this.ePosta,
                        sifre: this.sifre,
                        guvenlikSoru: this.guvenlikSoru,
                        guvenlikCevap: this.guvenlikCevap
                    }];
                    localStorage.setItem("kullanicilar", JSON.stringify(kullanicilar));
                    this.$router.push("/");
                } else {
                    let newKullanici = {
                        isim: this.isim,
                        eposta: this.ePosta,
                        sifre: this.sifre,
                        guvenlikSoru: this.guvenlikSoru,
                        guvenlikCevap: this.guvenlikCevap
                    };
                    let kullanicilar1 = JSON.parse(localStorage.getItem("kullanicilar"));

                    kullanicilar1.push(newKullanici);
                    localStorage.setItem("kullanicilar", JSON.stringify(kullanicilar1));
                    this.$router.push("/");
                }
            }
        },
        validasyonKontrol() {
            const inpObj = document.getElementById("e_posta");
            if (!inpObj.checkValidity()) {
                alert("Lütfen Geçerli Bir Eposta Adresi Girin");
                return false;
            } else {
                return true;
            }
        }
    }
}
</script>
