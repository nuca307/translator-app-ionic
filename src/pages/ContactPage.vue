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
            <h1>İletişim</h1>
            <h5>Şirket Bilgileri</h5>
            <h6>Ünvanı</h6>
            <p>NALİNCİ GIDA NAKLİYE OTOMOTİV İNŞAAT HAYVANCILIK SANAYİ VE TİCARET LİMİTED ŞİRKETİ(TıkTık.com)</p>
            <h6>Ticari Sicil Numarası</h6>
            <p>3485</p>
            <h6>Genel Müdürlük</h6>
            <p>YENİCAMİ MAH. ORDİNARYÜS PROFESÖR SADİ IRMAK CAD. NO: 57D SEYDİŞEHİR/KONYA</p>
            <h6>Operasyon Merkezleri</h6>
            <p>YENİCAMİ MAH. ORDİNARYÜS PROFESÖR SADİ IRMAK CAD. NO: 57D SEYDİŞEHİR/KONYA</p>
            <p>EVSAT MAH. 40616 SK. OFİS NO:2 BEYŞEHİR/KONYA</p>
            <h6>Telefon</h6>
            <p>+90 537 394 07 96</p>
            <h6>Eposta</h6>
            <p>tiktiklakapinda@outlook.com</p>
            <h6>Mersis Numarası</h6>
            <p>0628052886000001</p>
            <h6>Kayıtlı Elektronik Posta Adresi</h6>
            <p>nalincigidanakliyat@hs01.kep.tr</p>
            <h6>Bağlı Olduğu Odalar</h6>
            <p>Seydişehir Ticaret Odası: <a href="http://www.seydisehirtso.org.tr">Resmi Site</a></p>
            <h6>Meslek Etiği Kurallarımız</h6>
            <ul>
                <li>Amaç ve misyona uygun haraket etmek</li>
                <li>Saygı ve güven çerçevesinde hizmet sunmak</li>
                <li>Müşteri ilişkilerinde saygı ve nezaket kurallarına bağlı kalmak</li>
            </ul>
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
