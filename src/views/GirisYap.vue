<template>
    <div class="container">
        <div class="ana-baslik-main text-center">
            <h1 class="ana-baslik buyuk" style="display: inline">DİL</h1>
            <h6 class="ana-baslik kucuk" style="display: inline">Öğreniyorum</h6>
        </div>

        <h6 class="text-center" style="font-weight: bold">Giriş Yap</h6>
        <div>
            <input id="e_posta" class="form-control mt-3" type="email" placeholder="E-posta" v-model="ePosta"
                @blur="validasyon($event)">
            <input id="sifre" class="form-control mt-3" type="password" placeholder="Şifre" v-model="sifre">
        </div>
        <div class="d-flex justify-content-end">
            <RouterLink class="text-decoration-none text-light mt-2" style="font-size: .6rem; font-weight: bold"
                to='/hesapkurtar'>Şifreyi
                unuttunuz mu?</RouterLink>
        </div>
        <div class="d-flex justify-content-around mt-5">
            <button type="button" class="btn btn-outline-light" style="width: 7rem;" @click="kayitOl()">Kayıt Ol</button>
            <button type="button" class="btn btn-outline-light" style="width: 7rem;" @click="giris()">Giriş
                Yap</button>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
export default {
    components: {
        RouterLink
    },
    data() {
        return {
            ePosta: "",
            sifre: "",
            durum: false,
        }
    },
    methods: {
        validasyon(e) {
            e.target.reportValidity();
        },
        kayitOl() {
            this.$router.push("/kayitol")
        },
        giris() {
            let kullanicilarList = JSON.parse(localStorage.getItem("kullanicilar"));

            if (!kullanicilarList) {
                alert("Hiç bir kullanıcı bulunamadı");
                return;
            }
            if (!this.validasyonKontrol()) {
                return;
            }
            let listLength = kullanicilarList.length;

            let bulunanKullanici;
            for (let i = 0; i < listLength; i++) {
                if (this.ePosta == "" && this.sifre == "") {
                    alert("Lütfen Bilgilerinizi Giriniz!");
                    return
                } else if (this.ePosta == kullanicilarList[i].eposta && this.sifre == kullanicilarList[i].sifre) {
                    /*let aktifKullanici = [{ eposta: this.ePosta, sifre: this.sifre }]
                    localStorage.setItem("aktifKullanici", JSON.stringify(aktifKullanici))*/
                    this.durum = true;
                    bulunanKullanici = kullanicilarList[i];
                    break
                }
            }

            if (this.durum) {
                this.aktifKullanici(bulunanKullanici);
                this.$router.push("/diller");
            } else {
                alert("Eposta veya şifre hatalı");
            }
        },
        aktifKullanici(bulunanKullanici) {
            localStorage.setItem("aktifKullanici", JSON.stringify(bulunanKullanici))

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
    },
    mounted() {
        if (localStorage.getItem('aktifKullanici')) {
            this.$router.push(localStorage.getItem('sonyer'));
            return
        }
    }
}
</script>


