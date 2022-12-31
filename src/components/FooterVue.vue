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
        <h6 class="text-success mt-4">Her Zaman Her Platformda Sizinleyiz</h6>
        <div class="row mt-2">
            <a href="" target="_blank" class="application-btn col-3 btn btn-outline-light">
                <img src="/assets/google-play.png" alt="Google Play">
            </a>
            <a href="" target="_blank" class="application-btn col-3 btn btn-outline-light">
                <img src="/assets/app-store.png" alt="AppStore">
            </a>
        </div>
        <h6 class="text-success mt-4">Bize Ulaşın</h6>
        <small>
            <div><span>Tel: </span><span>+90 123 456 78 90</span></div>
            <div><span>Email: </span><span>admin@tıktık.com</span></div>
        </small>
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