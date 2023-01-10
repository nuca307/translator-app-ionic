<style scoped>
ol {
    counter-reset: item
}

ol li {
    display: block
}

ol li:before {
    content: "";
    counter-increment: item
}
</style>
<template>
    <main-layout pageIndex="2" style="text-align: justify;">
        <div class="p-4">
            <h1>Hakkımızda</h1>
            <p>TıkTık.com, Konya Seydişehir ve Beyşehir ilçelerinde faaliyet gösteren bir hızlı teslimat sistemidir.
                2023 yılında kurulduğundan, hizmetlerine henüz yeni başlamış olmalarına rağmen, kullanıcılar tarafından
                oldukça
                beğenilen bir hizmet sunmaktadır. TıkTık.com, Google Play ve App Store üzerinden indirilebilen
                uygulamaları
                ile
                de kullanıcılara hizmet vermektedir. Bu sayede kullanıcılar, cep telefonlarından ve tabletlerinden de
                hizmetlerinden yararlanabilmektedir.
            </p>
            <p>TıkTık.com, tedarikçilerinden aldığı ürünleri hızlı bir şekilde teslimat yaparak müşterilerine konforlu
                bir
                alışveriş deneyimi
                sunmaktadır. Özellikle yoğun iş temposu olan ve zamanı kısıtlı olan kullanıcılar için TıkTık.com, çok
                değerli
                bir hizmet sunmaktadır. Ayrıca TıkTık.com, müşteri memnuniyetini ön planda tutarak, teslimat sırasında
                herhangi
                bir problem yaşanması durumunda da müşteri hizmetleri ekibi tarafından destek verilmektedir.
            </p>
            <p>TıkTık.com'un logo renkleri ise yeşil ve beyazdır. Bu renkler, sıradışı olmayı ve yenilikçi bir yaklaşım
                sergilemeyi simgelemektedir. Ayrıca yeşil, doğayı ve yeşilin temiz ve ferah bir havayı simgelediği için,
                TıkTık.com'un müşterilerine temiz ve konforlu bir alışveriş deneyimi sunmayı amaçladığını gösterir.
                Beyaz
                ise,
                adaleti ve dürüstlüğü simgelemektedir. Bu da TıkTık.com'un müşterilerine dürüst ve adil bir şekilde
                hizmet
                vermeyi hedeflediğini gösterir.
            </p>
            <p>TıkTık.com, yerel üreticilerle işbirliği içerisinde yerel ürünleri satışa sunmaktadır. Bu sayede hem
                yerel
                üreticilere destek olunurken, aynı zamanda müşteriler de yerel ürünleri satın alarak, yerel ekonomiye de
                katkıda
                bulunmuş olmaktadır. Ayrıca TıkTık.com, müşterilerine özel indirimler ve kampanyalar da düzenlemektedir.
                Bu
                sayede müşteriler, daha uygun fiyatlarla alışveriş yapabilmekte ve TıkTık.com'un sunduğu avantajlardan
                daha
                fazla yararlanabilmektedir.
            </p>
            <p>TıkTık.com, Konya Seydişehir ve Beyşehir ilçelerinde faaliyet göstermesine rağmen, gelecekte daha fazla
                ilçe
                ve
                şehre hizmet vermeyi hedeflemektedir. Bu sayede TıkTık.com, hizmetlerini daha fazla müşteriye
                ulaştırmayı ve
                onların alışveriş deneyimlerini iyileştirmeyi hedeflemektedir.
            </p>
            <p>Sonuç olarak, TıkTık.com Konya Seydişehir ve Beyşehir ilçelerinde hızlı teslimat hizmetleri sunan,
                yenilikçi
                ve
                müşteri memnuniyetini ön planda tutan bir hizmet sunmaktadır. Gelecekte daha fazla ilçe ve şehre hizmet
                vermeyi
                hedefleyen TıkTık.com, müşterilerine temiz, ferah ve konforlu bir alışveriş deneyimi sunmayı
                amaçlamaktadır.
            </p>

            <h4>Vizyon</h4>
            TıkTık.com, Türkiye'nin her ilçesine ve şehrine hızlı teslimat hizmeti sunmayı hedeflemektedir. Müşteri
            memnuniyetini ön planda tutarak, en kaliteli hizmeti sunmayı amaçlamaktadır.

            <h4>Misyon</h4>
            TıkTık.com, Konya Seydişehir ve Beyşehir ilçelerinde faaliyet göstermektedir. Ancak gelecekte daha fazla
            ilçe ve şehre hizmet vermeyi hedeflemektedir. Bu sayede TıkTık.com, hizmetlerini daha fazla müşteriye
            ulaştırmayı ve onların alışveriş deneyimlerini iyileştirmeyi hedeflemektedir. Ayrıca TıkTık.com, müşteri
            memnuniyetini ön planda tutarak, en kaliteli hizmeti sunmayı amaçlamaktadır.
        </div>
    </main-layout>
</template>
  
<script>
import MainLayout from '../layouts/MainLayout.vue';

export default {
    components: {
        MainLayout,
    },
};
</script>