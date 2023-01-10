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
            <p>Ünvanı</p>
            <p>Nalinci Gıda Nakliye Otomotiv İnşaat Hayvancılık Sanayi ve Ticaret Limited Şirketi(TıkTık.com)</p>
            <h6>Ticari Sicil Numarası</h6>
            <p></p>
            <h6>Genel Müdürlük</h6>
            <p>Seydişehir/Konya</p>
            <h6>Operasyon Merkezleri</h6>
            <p>Seydişehir/Konya</p>
            <p>Beyşehir/Konya</p>
            <h6>Telefon</h6>
            <p>+90 537 394 07 96</p>
            <h6>Mersis Numarası</h6>
            <p></p>
            <h6>Kayıtlı Elektronik Posta Adresi</h6>
            <p></p>
            <h6>Bağlı Olduğu Odalar</h6>
            <p></p>
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