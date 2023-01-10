<style scoped>
.application-btn {
    max-width: 150px;
    height: 100%;
    padding: 0;
}

.application-btn img {
    display: inline-block;
    width: 100%;
    max-height: 100%;
}

.tiktik-logo {
    width: 100px;
}

.tiktik-explaination {
    overflow: hidden;
    max-height: 3.5rem;
    display: block;

    text-overflow: ellipsis ellipsis;
}
</style>
<template>
    <footer class="mt-4 p-2" style="bottom: 0;">
        <hr>
        <div class="row">
            <div class="col-12">
                <img class="tiktik-logo" src="/assets/logo.png" alt="" />
            </div>
            <div class="col-12">
                <div class="position-relative">
                    <small id="tiktik_explaination" class="tiktik-explaination"><strong
                            class="text-success">TıkTık.com</strong> hızlı teslimat alanında
                        hizmet veren bir teknoloji
                        şirketidir. İhtiyaçlarınızı anında
                        karşılamak için çalışıyoruz. Günün
                        her saati açık olan web sitemiz ve mobil uygulamamız ile istediğiniz ürünleri kolayca sipariş
                        edebilir, sadece birkaç dakika içinde evinizden teslim alabilirsiniz.

                        Market ürünlerinden, çiçeğe, manavdan, bebek malzemelerine kadar bir çok ürünü sizlere
                        sunduğumuz
                        gibi,
                        ızgaradan, etliekmeğe, tatlıdan, çorbaya kadar bir çok yemeği de sizlere sunuyoruz.
                        Ayrıca, yerel mağazalardan ve üreticilerden doğrudan ürünü kapınıza kadar getirerek, en uygun
                        fiyatları size sunmayı amaçlıyoruz.

                        Güvenliğiniz bizim için önemlidir. Ödemelerinizi güvenli bir şekilde yapabilir, siparişlerinizi
                        teslim alırken koronavirüs salgını nedeniyle maske ve dezenfektan kullanımı gibi önlemlerimizi
                        uygulayarak, sağlığınızı koruyabilirsiniz.

                        <strong>Şimdilik</strong> sadece <strong>Seydişehir</strong> ve
                        <strong>Beyşehir</strong>'deyiz.

                        <strong class="text-success">TıkTık.com</strong> ile hızlı ve güvenli bir alışveriş deneyimi
                        yaşamaya hazır mısınız? Hemen üye olun ve
                        sipariş verin.

                        <strong class="text-success">TıkTık.com</strong> ekibinin size en iyi hizmeti sunmak için
                        sabırsızlanıyoruz!
                    </small>
                    <button class="position-absolute btn-light bottom-0 end-0 bg-light border border-dark rounded-top"
                        @click="widenExplaination"><small>Devamını
                            Gör</small></button>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-12 col-md-6 col-lg-4">
                <h6 class="text-success">Kurumsal</h6>
                <ul style="list-style: none;">
                    <li>
                        <RouterLink to="/iletisim" class="text-success">İletişim</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/hakkimizda" class="text-success">Hakkımızda</RouterLink>
                    </li>
                </ul>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <h6 class="text-success">Politikalar</h6>
                <ul style="list-style: none;">
                    <li>
                        <RouterLink to="/kullanim-kosullari" class="text-success">Kullanım Koşulları</RouterLink>
                    </li>

                    <li>
                        <RouterLink to="/mesafeli-satis-sozlesmesi" class="text-success">Mesafeli Satış Sözleşmesi
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/gizlilik-sozlesmesi" class="text-success">Gizlilik Sözleşmesi</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/kullanim-kosullari#teslimat_ve_iade" class="text-success">
                            Teslimat ve İade Şartları</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/kullanim-kosullari#kvkk" class="text-success">
                            KVKK</RouterLink>
                    </li>
                </ul>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <h6 class="text-success">Her Zaman Her Platformda Sizinleyiz</h6>
                <div class="row mt-2">
                    <a href="" target="_blank" class="application-btn col-6 btn btn-outline-light">
                        <img src="/assets/google-play.png" alt="Google Play">
                    </a>
                    <a href="" target="_blank" class="application-btn col-6 btn btn-outline-light">
                        <img src="/assets/app-store.png" alt="AppStore">
                    </a>
                </div>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-md mb-2">
                <img src="/assets/logo_band_colored.png" alt="ödeme_iyzico" />
            </div>
            <div class="col-md mb-2">
                <small>Bu yazılım <a target="_blank" href="https://algoritimbilisim.com"
                        style="color: #0c8383;">Algoritim
                        Bilişim</a> tarafından geliştirilmiştir. 2023&copy;Tüm Hakları <a href="/"
                        class="text-success">TıkTık.com</a> adına saklıdır.</small>
            </div>
        </div>
    </footer>
</template>
<script>
import { RouterLink } from 'vue-router';

export default {
    components: {
        RouterLink
    },
    methods: {
        widenExplaination() {
            document.querySelector("#tiktik_explaination").style.maxHeight = "100%";
            event.currentTarget.style.display = "none";
        }
    }
};
</script>