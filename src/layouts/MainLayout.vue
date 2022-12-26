<template>
    <div class="container-fluid">
        <div class="row flex-nowrap">
            <main class="col py-3" style="overflow:scroll;max-height: 100vh;">
                <navbar :pageIndex="pageIndex" :basket="basket" :username="getUserName"></navbar>
                <slot :basket="basket" />
            </main>
        </div>
        <toast-vue :toast="toast"></toast-vue>
    </div>
</template>
  
<script>
import { Toast } from "bootstrap";
import Navbar from "../components/NavbarVue.vue";
import ToastVue from '../components/ToastVue.vue';



export default {
    props: ["pageIndex"],
    components: {
        Navbar,
        ToastVue
    },
    provide: function () {
        return {
            basketSummary: this.basketSummary,
            basketInfo: this.basketInfo,
            websocket: this.websocket
        }
    },
    data() {
        return {
            toast: {},
            toastVue: undefined,
            basket: {},
            basketDraft: {
                "id": "",
                "userId": "",
                "basketItems": [],
                "amount": "",
                "unit": "",
                "price": "",
                "discountedPrice": "",
                "discount": "",
                "isDone": "",
                "createdAt": "",
                "creator": "",
                "updatedAt": "",
                "updater": ""
            },
            basketSummary: {},
            basketInfo: {},
            onBasketCount: 0,
            websocket: undefined
        }
    },
    computed: {
        getUserName() {
            let user = localStorage.getItem("user");
            let username = user ? JSON.parse(user).name : "";
            return username;
        }
    },
    methods: {

        fetchFunc(resource, method, options = {}, body) {
            const { timeout = 20000 } = options;
            const controller = new AbortController();
            const AbortTimer = setTimeout(() => controller.abort(), timeout);
            let headers = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                signal: controller.signal
            };
            if (method == "POST" || method == "PUT") {
                headers.body = JSON.stringify(body);
            }
            const response = new Promise((resolve, reject) => {
                fetch(resource, headers)
                    .then(response => response.json())
                    .then(data => {
                        resolve(data);
                    })
                    .catch(() => {
                        reject();
                    })
                    .finally(() => {
                        clearTimeout(AbortTimer);
                    });
            });
            return response;
        },
        connectToWebSocket() {
            let user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                let wsURI = "ws://tıktık.com:8080/api/socket/purchaseOrder/9?auth=" + localStorage.getItem("token");

                if (this.websocket != undefined && this.websocket.readyState === WebSocket.OPEN) {
                    this.websocket.close();
                }
                this.websocket = new WebSocket(wsURI);
                this.websocket.onmessage = function processMessage(message) {
                    console.log(message);
                }
            }
        },
        setUsersBasket() {
            let user = JSON.parse(localStorage.getItem("user"));
            if (!user) {
                this.setLocalBasket();
                return;
            }
            let method = this.basket.id ? "PUT" : "POST";
            this.basket.userId = user.id;
            this.fetchFunc("http://localhost:8080/baskets/", method, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            },
                this.basket
            ).then(res => {
                this.basket = res;
                this.showToast();

            }).catch((err) => {
                this.showToast({}, err);
            })
        },
        setLocalBasket() {
            localStorage.setItem("basket", JSON.stringify(this.basket));
        },
        getUsersBasketByUserId() {
            let user = JSON.parse(localStorage.getItem("user"));
            return new Promise((resolve) => {
                this.fetchFunc("http://localhost:8080/baskets/user/" + user.id, "GET", {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }).then(res => {
                    resolve(res);
                })
            });
        },
        addProduct(product) {
            let item;
            if (this.basket.basketItems)
                item = this.basket.basketItems.find(e => e.productId == product.id);
            else
                this.basket.basketItems = [];

            if (item) {
                item.amount = item.amount ? item.amount + 1 : 1;
                this.onBasketCount += item.amount;
            } else {
                this.basket.basketItems.push({
                    amount: 1,
                    image: product.images[0],
                    name: product.name,
                    price: product.price,
                    productId: product.id,
                    unit: product.unit,
                    vendor: { id: product.vendor.id },
                });
            }

            this.setBasketSummary();
            this.setUsersBasket();
        },
        removeProduct(product) {
            let itemIndex = this.basket.basketItems.findIndex(e => e.productId == product.id);
            if (itemIndex > -1) {
                let item = this.basket.basketItems[itemIndex];
                if (item.amount > 0) {
                    item.amount--;
                } else {
                    this.basket.basketItems.splice(itemIndex, 1);
                    delete this.basketSummary[item.productId];
                }

                if (item.amount == 0) {
                    this.basket.basketItems.splice(itemIndex, 1);
                    delete this.basketSummary[item.productId];
                } else {
                    this.setBasketSummary();
                }
            }
            this.setUsersBasket();
        },
        addItem(item) {
            let foundItem = this.basket.basketItems.find(e => e.productId == item.productId);

            foundItem.amount++;

            this.setBasketSummary();
            this.setUsersBasket();
            this.setBasketInfo();
        },
        removeItem(item) {
            let itemIndex = this.basket.basketItems.findIndex(e => e.productId == item.productId);
            let foundItem = this.basket.basketItems[itemIndex];

            foundItem.amount--;

            if (foundItem.amount <= 0) {
                this.basket.basketItems.splice(itemIndex, 1);
                delete this.basketSummary[item.productId];
            }
            this.setBasketSummary();
            this.setUsersBasket();
            this.setBasketInfo();

        },
        setBasketSummary() {
            this.basket.basketItems.forEach(item => {
                this.basketSummary[item.productId] = item.amount;
            });
        },
        setBasketInfo() {
            let res = this.basket;
            if (res) {
                for (const r in res) {
                    if (r == "basketItems") {
                        this.basketInfo.basketItems = [];
                        res[r].forEach((item, index) => {
                            this.basketInfo.basketItems[index] = {};
                            for (const i in item) {
                                this.basketInfo.basketItems[index][i] = item[i];
                            }
                        });
                    } else {
                        this.basketInfo[r] = res[r];
                    }
                }
            }
            else {
                this.basketInfo = { ...this.basketDraft };
            }
        },
        showToast(options, error) {
            if (error) {
                this.toast = {
                    header: "Hata Meydana Geldi",
                    time: new Date(),
                    message: error.message,
                    class: "text-bg-danger fade show",
                    ...options
                }
            } else {
                this.toast = {
                    header: "İşlem Başarılı",
                    time: new Date(),
                    message: "Sepet Güncellendi",
                    class: "text-bg-success fade show",
                    ...options
                }
            }

            if (!this.toastVue) {
                this.toastVue = new Toast(document.querySelector("#toast_alert"));
                this.toastVue.show();
            } else {
                Toast.getOrCreateInstance(document.querySelector("#toast_alert")).show();
            }
        }
    },
    mounted() {
        this.connectToWebSocket();
        this.emitter.on("basket_add_to_product", (product) => {
            this.addProduct(product);
        })
        this.emitter.on("basket_remove_from_product", (product) => {
            this.removeProduct(product);
        })
        this.emitter.on("basket_add_to_item", (item) => {
            this.addItem(item);
        })
        this.emitter.on("basket_remove_from_item", (item) => {
            this.removeItem(item);
        })
        this.emitter.on("on_websocket_message", (message) => {
            this.websocket.send(JSON.stringify(message));
        })
    },
    created() {

        let user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            this.getUsersBasketByUserId().then((res) => {
                this.basket = res ? res : { ...this.basketDraft };
                this.setBasketInfo();
                this.setBasketSummary();
            });
        } else {
            let localBasket = JSON.parse(localStorage.getItem("basket"));
            if (localBasket)
                this.basket = localBasket;
            else
                this.basket = { ...this.basketDraft };
            this.setBasketInfo();
            this.setBasketSummary();
        }
    },
    beforeUnmount() {
        this.emitter.off("basket_add_to_product");
        this.emitter.off("basket_remove_from_product");
        this.emitter.off("basket_add_to_item");
        this.emitter.off("basket_remove_from_item");
        this.emitter.off("on_websocket_message");
    }
};

</script>