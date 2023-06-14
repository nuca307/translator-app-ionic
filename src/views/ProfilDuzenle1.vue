<template>
    <div class="container">
        <div class="d-flex justify-content-center aling-items-center">
            <button class="geri-btn" type="button" @click="goBack()">&#8592;</button>
            <h6 class="flex-grow-1" style="font-weight:bold; margin-top: 50px">Profili Düzenle</h6>
        </div>

        <div>
            <input class="form-control mt-1" type="password" placeholder="Mevcut Şifre" v-model="mevcutSifre">
            <input class="form-control mt-3" type="password" placeholder="Yeni Şifre" v-model="yeniSifre">
            <input class="form-control mt-3" type="password" placeholder="Tekrar Yeni Şifre" v-model="yeniSifreTekrar">
        </div>
        <div class="d-flex justify-content-around mt-5">
            <button type="button" class="btn btn-outline-light" style="width: 9rem;" @click="yeniSifres()">Şifreni
                Değiştir</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mevcutSifre: "",
            yeniSifre: "",
            yeniSifreTekrar: "",
            durum: false,
        }
    },
    methods: {
        goBack() {
            this.$router.push("/profil");
        },

        yeniSifres() {
            let kullanici = JSON.parse(localStorage.getItem("aktifKullanici"));
            let kullanicilar = JSON.parse(localStorage.getItem("kullanicilar"));
            let i = 0;

            if (this.mevcutSifre == "" || this.yeniSifre == "" || this.yeniSifre == "") {
                alert("Bilgilerin hepsini doldurunuz!")
            } else if (this.yeniSifre !== this.yeniSifreTekrar) {
                alert("Sifreler uyumsuz!")
            } else {
                for (i = 0; i < kullanicilar.length; i++) {
                    if (this.mevcutSifre == kullanici.sifre && kullanici.eposta == kullanicilar[i].eposta) {
                        kullanici.sifre = this.yeniSifreTekrar;
                        kullanicilar[i].sifre = this.yeniSifreTekrar;
                        localStorage.setItem("aktifKullanici", JSON.stringify(kullanici));
                        localStorage.setItem("kullanicilar", JSON.stringify(kullanicilar));
                        this.durum = true
                        break
                    }
                }
                if (this.durum == true) {
                    localStorage.removeItem("aktifKullanici");
                    alert("Şifre Güncellendi!")
                    this.$router.push("/")
                } else {
                    alert("Mevcut şifre hatalı!")
                }
            }
        }
    }
}
</script>        