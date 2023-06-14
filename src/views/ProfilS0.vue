<template>
    <div class="container" style="position: relative;height: 100%;">
        <i class="fa-solid fa-arrow-right-from-bracket fa-xl" style="color: #6e4fad; margin-top: 1.5rem; position:absolute;right: 1rem ;" @click="logOut()"></i>
        <h5 class="text-center mb-5" style="font-weight:bold; margin:30px auto">Profil</h5>

        <form class="form-floating">
            <input type="text" class="form-control mb-3" id="floatingInputValue" placeholder="name@example.com"
                :value="isim" style="color: white" disabled>
            <label for="floatingInputValue">İsim</label>
            <i class="fa-solid fa-pen" style="color: #6e4fad; position: absolute; z-index: 1; top: 1.2em; right: 0.8em;"
                @click="yonlendirmeİsim()"></i>
        </form>

        <form class="form-floating">
            <input type="password" class="form-control mb-3" id="floatingInputValue" placeholder="name@example.com"
                :value="sifre" style="color: white" disabled>
            <label for="floatingInputValue">Şifre</label>
            <i class="fa-solid fa-pen" style="color: #6e4fad; position: absolute; z-index: 1; top: 1.2em; right: 0.8em;"
                @click="yonlendirmeSifre()"></i>
        </form>

        <form class="form-floating">
            <input type="email" class="form-control" id="floatingInputValue" placeholder="name@example.com" :value="eposta"
                style="color: white" disabled>
            <label for="floatingInputValue">E-posta</label>
        </form>

        <footer class="footer">
            <div class="home" @click="goHome()">
                <i class="fa-solid fa-house fa-lg"></i>
                <h6>Home</h6>
            </div>

            <div class="profil" @click="goProfil()" style="color: #6e4fad">
                <i class="fa-solid fa-user fa-lg"></i>
                <h6>Profil</h6>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isim: "",
            sifre: "",
            eposta: "",
        }
    },
    mounted() {
        let kullanici = JSON.parse(localStorage.getItem("aktifKullanici"));
        this.isim = kullanici.isim
        this.sifre = kullanici.sifre
        this.eposta = kullanici.eposta
    },
    methods: {
        yonlendirmeİsim() {
            this.$router.push("/profilduzenle2")
        },
        yonlendirmeSifre() {
            this.$router.push("/profilduzenle1")
        },

        goHome() {
            this.$router.push("/diller")
        },

        goProfil() {
            this.$router.push("/profil")
        },
        
        logOut() {
            localStorage.removeItem("aktifKullanici")
            this.$router.push("/")
        }

    }
}
</script>

