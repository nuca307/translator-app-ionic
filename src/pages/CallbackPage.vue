
<template>
    İşlem devam ediyor.
    <button @click="">Tamamla</button>
</template>
  
<script>
import MainLayout from '../layouts/MainLayout.vue';

export default {
    components: {
        MainLayout,
    },
    methods: {

        setPaymentRequest() {
            let basket = {
                price: this.getTotalPrice,
                basketItems: [],
            };
            this.basket.forEach(e => {
                basket.basketItems.push({
                    moduleName: "virtual",
                    productId: 0,
                    name: "Taşıma Bedeli",
                    discount: 0,
                    discountedPrice: 0,
                    price: this.carryingPrice,
                    amount: 1,
                    vendor: { name: "tıktık.com" }
                })
                e.basketItems.forEach(item => {
                    basket.basketItems.push(item);
                })
            })
            let paymentRequest = {
                user: JSON.parse(localStorage.getItem("user")),
                address: this.selectedAddress,
                card: this.card,
                basket: basket,
            }

            fetchFunc("https://tıktık.com:8443/api/iyzico/finish3ds", "POST", {}, paymentRequest
            ).then(res => {
                document.querySelector("#credit_card_pane").innerHTML = res.threedsHtmlContent;
                alert("Siparişiniz Oluşturuldu");
            })
        },
    }
};
</script>