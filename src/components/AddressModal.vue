<style>
.modal-backdrop {
    /* bug fix - no overlay */
    display: none;
}
</style>
<template>
    <div class="modal fade" tabindex="-1" id="addresses_modal" ref="addressesModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Adres Seçimi</h5>
                </div>
                <div class="modal-body">
                    <div class="accordion" id="addressAccordion">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button collapsed bg-success" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false"
                                    aria-controls="collapseOne">
                                    <i class="fa-solid fa-map-location-dot"></i>
                                    <span class="mx-2">Konum Seç-Ekle</span>
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                                data-bs-parent="#addressAccordion">
                                <div class="accordion-body">
                                    <google-maps></google-maps>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item" v-for="(address, addressIndex) of addresses" :key="address">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    :data-bs-target="'#address' + addressIndex" aria-expanded="false"
                                    :aria-controls="'address' + addressIndex">
                                    <div class="d-flex justify-content-between align-items-center w-100">
                                        <span v-text="address.title"></span>
                                        <div class="btn btn-outline-primary" @click.stop="selectAddress(address)">Seç
                                        </div>
                                    </div>
                                </button>
                            </h2>
                            <div :id="'address' + addressIndex" class="accordion-collapse collapse"
                                aria-labelledby="'address'+addressIndex" data-bs-parent="#addressAccordion">
                                <div class="accordion-body">
                                    <small>
                                        <div v-text="'Açık Adres: ' + address.address"></div>
                                        <div v-text="'Apartman: ' + address.apartment"></div>
                                        <div v-text="'Kat No: ' + address.floor"></div>
                                        <div v-text="'Daire No: ' + address.roomNumber"></div>
                                        <div v-text="'Tarif: ' + address.directions"></div>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <toast-vue :toast="toast"></toast-vue>
    </div>
</template>
<script>
import { Toast } from 'bootstrap';
import ToastVue from './ToastVue.vue';
import GoogleMaps from './GoogleMaps.vue';

export default {
    props: ["addresses"],
    components: {
        ToastVue,
        GoogleMaps
    },
    data() {
        return {
            toast: {},
            toastVue: undefined,
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
                    'Authorization': localStorage.getItem('token'),
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
        selectAddress(address) {
            this.emitter.emit("addresses_modal", JSON.parse(JSON.stringify(address)));
            localStorage.setItem("address", JSON.stringify(address));
        },
        selectAddressFromCurrentLocation() {
            this.emitter.emit("addresses_modal", JSON.parse(JSON.stringify({})));
        },
        setAddress(address) {
            if (!this.validateAddress(address)) return;
            let method = (address.id) ? "PUT" : "POST";
            this.fetchFunc("https://tıktık.com:8443/api/addresses", method, {}, address).then(() => {
                this.showToast();
                this.emitter.emit("addresses_modal", JSON.parse(JSON.stringify(address)));
                localStorage.setItem("address", JSON.stringify(address));

            }).catch((err) => {
                this.showToast({}, err);
            })
        },
        validateAddress(address, willSave = true) {
            if (!address.address && willSave) {
                alert("Adres olmadan kayıt yapamazsınız");
                return false;
            }
            if (!address.title && willSave) {
                alert("Adres Başlığı olmadan kayıt yapamazsınız");
                return false;
            }
            if (!address.province && willSave) {
                alert("İl olmadan kayıt yapamazsınız");
                return false;
            }
            if (!address.district) {
                alert("İlçe olmadan kayıt yapamazsınız");
                return false;
            }
            if (!address.floor && willSave) {
                alert("Kat No olmadan kayıt yapamazsınız");
                return false;
            }
            if (!address.roomNumber && willSave) {
                alert("Daire No olmadan kayıt yapamazsınız");
                return false;
            }
            return true;
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
                    message: "Tedarikçi Kaydedildi",
                    class: "text-bg-success fade show",
                    ...options
                }
            }

            if (!this.toastVue) {
                this.toastVue = new Toast(document.querySelector("#toast_alert"));
                this.toastVue.show();
            } else {
                Toast.getInstance(document.querySelector("#toast_alert")).show();
            }
        },
    },
    mounted() {
        this.emitter.on("mapbox_select", (address) => {

            if (!this.validateAddress(address, false)) return;
            this.emitter.emit("addresses_modal", JSON.parse(JSON.stringify(address)));

            localStorage.setItem("address", JSON.stringify(address));
            this.emitter.emit("addresses_modal", JSON.parse(JSON.stringify(address)));
        });

        this.emitter.on("mapbox_save", (address) => {
            this.setAddress(address);
        });
    },
    beforeUnmount() {
        this.emitter.off("mapbox_select");
        this.emitter.off("mapbox_save");
    }
};
</script>