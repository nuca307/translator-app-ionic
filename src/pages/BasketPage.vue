<template>
    <main-layout pageIndex="3">
        <basket-view />
    </main-layout>
</template>
  
<script>
import MainLayout from '../layouts/MainLayout.vue';
import BasketView from '../views/BasketView.vue';

export default {
    components: {
        MainLayout,
        BasketView
    },
    data() {
        return {
            paymentLock: false
        }
    },
    mounted() {
        this.emitter.on("paymentLock", (paymentLock) => {
            this.paymentLock = paymentLock;
        });
    },
    beforeUnmount() {
        this.emitter.off("paymentLock");
    },
    beforeRouteLeave(to, from) {
        if (this.paymentLock) {
            const answer = window.confirm('Ödeme Yaptınız Ancak Henüz Sipariş Oluşturmadınız!\nDevam Etmek İstiyor Musunuz?');
            if (!answer) return false
        }
    }
};
</script>
