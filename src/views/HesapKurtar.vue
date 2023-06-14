<template>
    <div class="container">
        <div class="ana-baslik-main text-center">
            <h1 class="ana-baslik buyuk" style="display: inline">DİL</h1>
            <h6 class="ana-baslik kucuk" style="display: inline">Öğreniyorum</h6>
        </div>
        
        <h6 class="text-center" style="font-weight: bold">Hesap Kurtar</h6>
        
        <input class="form-control mt-4" type="email" placeholder="E-posta" @blur="soruGelsin()" v-model="eposta">
        <input class="form-control mt-4" type="email" :placeholder="soru" :value="soru" disabled>
        <input class="form-control mt-4" type="email" placeholder="Şifre kurtarma sorunuzun cevabını giriniz" v-model="cevap">
        
        <div class="d-flex justify-content-around mt-5">
            <button type="button" class="btn btn-outline-light" style="width: 7rem;"  @click="kontrol()">Gönder</button>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            eposta: "",
            cevap: "",
            soru: "Şifre kurtarma sorusu",
            
        }
    },
    methods: {
        soruGelsin() {
            this.soru = ""
            let kullanicilar = JSON.parse(localStorage.getItem("kullanicilar"));
            let durum = false
            for(let i = 0; i < kullanicilar.length; i++) {
                if(this.eposta == kullanicilar[i].eposta) {
                    this.soru = kullanicilar[i].guvenlikSoru
                    durum = true
                    break
                }
            }
            if(durum == false) {
                alert("E-posta kayıtlı değildir!")
                
            }
        },
        kontrol(){
            let durum = false
            if(this.eposta == "") {
                alert("Lütfen e-postanızı giriniz")
            }else if(this.cevap == "") {
                alert("Lütfen cevabınızı giriniz")
            }else{
                let kullanicilar = JSON.parse(localStorage.getItem("kullanicilar"));
                for(let i = 0; i<kullanicilar.length; i++) {
                    if(this.eposta == kullanicilar[i].eposta && this.cevap == kullanicilar[i].guvenlikCevap) {
                        durum = true
                        break
                    }
                }
                if(durum == false) {
                    alert("Girilen cevap yanlış!Tekrar giriniz.")
                    this.cevap = ""
                    // this.$router.go("/hesapkurtar");
                }else if(durum == true) {
                    let epostas = this.eposta
                    localStorage.setItem("aktifEposta",epostas)
                    this.$router.push("/sifrekurtar")
                }
            }
        }
    }
}
</script>