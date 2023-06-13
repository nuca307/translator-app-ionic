<template>
    <div class="container">
        <div class="d-flex justify-content-center aling-items-center">
            <button class="geri-btn" type="button" @click="goBack()">&#8592;</button>
            <h6 class="flex-grow-1" style="font-weight:bold; margin-top: 50px">Profili Düzenle</h6>
        </div>

        <div>
            <input class="form-control mt-1" type="text" placeholder="Yeni İsim" v-model="newName">
        </div>
        <div class="d-flex justify-content-around mt-5">
            <button type="button" class="btn btn-outline-light" style="width: 9rem;" @click="yeniIsim()">İsmi
                Değiştir</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newName: "",
        }
    },
    methods: {
        goBack() {
            this.$router.push("/profil");
        },

        yeniIsim() {
            let kullanici = JSON.parse(localStorage.getItem("aktifKullanici"));
            let kullanicilar = JSON.parse(localStorage.getItem("kullanicilar"));
            kullanici.isim = this.newName;
            let i = 0;
            for (i = 0; i < kullanicilar.length; i++)
                if (kullanici.eposta == kullanicilar[i].eposta) {
                    kullanicilar[i].isim = this.newName
                    localStorage.setItem("kullanicilar", JSON.stringify(kullanicilar))
                }
            localStorage.setItem("aktifKullanici", JSON.stringify(kullanici));
            this.$router.push("/profil")

        }


    }
}
</script>