<template>
    <div class="container" style="position: relative;height: 100%;">
        <i class="fa-solid fa-arrow-right-from-bracket fa-xl" style="color: #6e4fad; margin-top: 1.5rem; position:absolute;right: 1rem ;" @click="logOut()"></i>
        <h5 class="text-center mt-4 mb-5" style="font-weight:bold">Diller</h5>
        <hr>
        <p style="margin:5px;position: relative;" @click="openTrans()">
            <img src="@/assets/americanflag.jpg" width="50" alt="usaflag">
            <RouterLink class="text-decoration-none text-light" to="/ceviri"> İngilizce</RouterLink>
            <i class="fa-sharp fa-solid fa-check fa-xl" style="color: white; position: absolute; top:50% ;right: 1rem"></i>
        </p>
        <hr>
        <footer class="footer">
            <div class="home" @click="goHome()" style="color: #6e4fad">
                <i class="fa-solid fa-house fa-lg"></i>
                <h6>Home</h6>
            </div>

            <div class="profil" @click="goProfil()">
                <i class="fa-solid fa-user fa-lg" style=""></i>
                <h6 style="">Profil</h6>
            </div>
        </footer>

    </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    components: { RouterLink },
    methods: {
        openTrans() {
            this.$router.push("/ceviri")
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
    },
}
</script>
