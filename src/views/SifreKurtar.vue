<template>
    <div class="container">
        <h5 class="text-center mt-4 mb-5" style="font-weight:bold; margin:50px auto">Şifre Yenile</h5>
        <input class="form-control mt-3" type="password" placeholder="Yeni Şifre" v-model="yeniSifre">
        <input class="form-control mt-3" type="password" placeholder="Tekrar Yeni Şifre" v-model="yeniSifreTekrar">
        <div class="d-flex justify-content-around mt-5">
            <button type="button" class="btn btn-outline-light" style="width: 9rem;" @click="yeniSifres()">Şifreni
                Değiştir</button>
        </div>
    </div>
</template>
<script>
export default{
    data() {
        return {
            eposta: localStorage.getItem("aktifEposta"),
            yeniSifre: "",
            yeniSifreTekrar: "",
            durum: false,
        }
    },
    methods: {
        yeniSifres() {
            let kullanicilar = JSON.parse(localStorage.getItem("kullanicilar"));
            let i = 0;
            if (this.yeniSifre == "" || this.yeniSifre == "") {
                alert("Bilgilerin hepsini doldurunuz!")
            } else if (this.yeniSifre !== this.yeniSifreTekrar) {
                alert("Sifreler uyumsuz!")
            } else {
                for (i = 0; i < kullanicilar.length; i++) {
                    if (this.eposta == kullanicilar[i].eposta) {
                        kullanicilar[i].sifre = this.yeniSifreTekrar;
                        localStorage.setItem("kullanicilar", JSON.stringify(kullanicilar));
                        this.durum = true
                        break
                    }
                }
                if (this.durum == true) {
                    alert("Şifre Güncellendi!")
                    localStorage.removeItem("aktifEposta")
                    this.$router.push("/")
                } else {
                    alert("E-posta hatalı")
                }
            }
        }
    }
}
</script>