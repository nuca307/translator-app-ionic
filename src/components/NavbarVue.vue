<style scoped>
.dropdown-btn {
    padding: 0;
}

.user-photo {
    width: 2.25rem;
    height: 2.25rem;
    font-size: 1rem;
    padding: .5rem;
    border: 1px solid white;
    border-radius: 50%;
    color: #fff;
    background-color: #007ea7;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
</style>
<template>
    <header class="row bg-success">
        <nav class="navbar navbar-expand">
            <div class="container-fluid">
                <RouterLink to="/" class="navbar-brand">
                    <img src="assets/logo_ters.png" alt="TıkTık" width="25">
                </RouterLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div hidden>
                        <form class="d-md-flex d-none" role="search">
                            <input class="form-control me-2" type="search" placeholder="Ara" aria-label="Ara">
                            <button class="btn btn-outline-light" type="submit">ARA</button>
                        </form>
                    </div>
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item mx-1">
                            <div class="btn-group">
                                <RouterLink to="/kampanyalar" class="btn btn-light" aria-current="page">Kampanyalar
                                </RouterLink>
                            </div>
                        </li>
                        <li class="nav-item" v-if="wasLoggedIn">
                            <RouterLink :to="basketLink" class="btn btn-light position-relative" aria-current="page">
                                Sepet
                                <span class="badge bagde-sm rounded-pill text-light bg-success">
                                    <span v-text="basketSize"></span>
                                </span>

                            </RouterLink>
                        </li>
                        <li class="nav-item dropdown ms-1" v-if="wasLoggedIn">
                            <a class="dropdown-btn btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <span v-html="imageFromName" class="user-photo" :style="colorFromName"></span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" style="z-index: 1111;">
                                <li class="nav-item">
                                    <RouterLink to="/siparis" class="dropdown-item" aria-current="page"
                                        :class="pageIndex == 3 ? 'text-white' : ''">Siparişlerim</RouterLink>
                                </li>
                                <li><a class="dropdown-item" href="#">Profil</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li @click.prevent="logout"><a class="dropdown-item">Çıkış</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown ms-1" v-else>
                            <div class="btn-group">
                                <RouterLink to="/giris-yap" class="btn" aria-current="page"
                                    :class="pageIndex == 1 ? 'btn-light' : 'btn-outline-light'">Giriş Yap</RouterLink>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="col-12 bg-success mb-2" hidden>
            <form class="d-md-none d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Ara" aria-label="Ara">
                <button class="btn btn-outline-light" type="submit">ARA</button>
            </form>
        </div>
    </header>
</template>
<script>
import { RouterLink } from 'vue-router';
export default {
    props: ["pageIndex", "username"],
    data() {
        return {
            basketLink: "/sepet"
        }
    },
    components: {
        RouterLink
    },
    inject: {
        basketSummary: 'basketSummary'
    },
    computed: {
        imageFromName() {
            let isim = this.username;
            let isimParcalari = isim.split(" ");
            return isimParcalari[0].charAt(0) + isimParcalari[isimParcalari.length - 1].charAt(0);
        },
        colorFromName() {
            let isim = this.username;
            /** MANTIK :  SYSTEM 78*120*78 = 45789 => EC5670*/
            let kod = (isim.charCodeAt(0) * isim.charCodeAt(1) * isim.charCodeAt(2)).toString(16); // toHexadecimal
            kod = (kod + "000000").substring(0, 6); // kod az haneli ise artırılır, çok haneli ise azaltılır
            return `background-color:#${kod}`;
        },
        wasLoggedIn() {
            let user = localStorage.getItem("user");
            if (user) return true;
            return false;
        },
        basketSize() {
            return Object.values(this.basketSummary).reduce((total, elem) => total += elem, 0);
        }
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push('/giris-yap');
        },
    },
    created() {
        this.basketLink = this.wasLoggedIn ? "/sepet" : "/giris-yap?return=/sepet"
    }
};
</script>