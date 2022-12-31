<template>
    <div class="main">
        <div class="flex">
            <!-- Map Display here -->
            <div class="map-holder">
                <div id="map"></div>
            </div>
            <!-- Coordinates Display here -->
            <div class="dislpay-arena">
                <div class="d-flex justify-content-between">
                    <span>Enlem: {{ center[0].toFixed(4) }}</span>
                    <span>Boylam: {{ center[1].toFixed(4) }}</span>
                </div>

                <div class="coordinates-header">
                    <div class="d-flex justify-content-between">
                        <button type="button" class="btn btn-outline-success" @click="currentLocation"
                            :disabled="locationLoading">Mevcut Konumu
                            Paylaş <i class="fa-solid fa-spinner fa-spin" v-if="locationLoading"></i></button>
                        <button type="button" class="btn btn-success" :disabled="loading" :class="{ disabled: loading }"
                            @click="getLocation">
                            Konumu Seç
                        </button>
                    </div>
                    <div class="mt-2">
                        <input class="form-control form-control-sm" type="text" placeholder="Adres Başlığı-Ör:Ev"
                            v-model="address.title" />

                        <select class="form-select form-select-sm" v-model="address.province" @change="changeDistricts">
                            <option value="" disabled selected>İl Seç</option>
                            <option v-for="province of provinces" :key="province" v-text="province.name"
                                :value="province.name.turkishToEnglishLower()"></option>
                        </select>

                        <select class="form-select form-select-sm" v-model="address.district">
                            <option value="" disabled selected>İlçe Seç</option>
                            <option v-for="district of districts" :key="district" v-text="district.name"
                                :value="district.name.turkishToEnglishLower()"></option>
                        </select>
                        <textarea class="form-control form-control-sm" placeholder="Açık Adres"
                            v-model="address.address"></textarea>
                        <input class="form-control form-control-sm" type="text" placeholder="Apartman"
                            v-model="address.apartment" />
                        <input class="form-control form-control-sm" type="text" placeholder="Kat No"
                            v-model="address.floor" />
                        <input class="form-control form-control-sm" type="text" placeholder="Daire No"
                            v-model="address.roomNumber" />
                        <textarea class="form-control form-control-sm" type="text"
                            placeholder="Tarif-Ör: Belediyenin 100mt. İlerisi" v-model="address.directions"></textarea>
                    </div>
                    <div class="d-flex justify-content-between mt-2">
                        <button class="btn btn-outline-primary" @click="selectAddress()" hidden>Sadece Seç</button>
                        <button class="btn btn-primary" @click="selectAddress(true)">Seç ve Kaydet</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import axios from "axios";
export default {
    data() {
        return {
            loading: false,
            location: "",
            locationLoading: false,
            access_token: "pk.eyJ1IjoiYWxpbmFsaW5jaSIsImEiOiJjbGMwcmpucXMyNDNkM29ueXZkc2xjangyIn0.C0G9Nw8XidSQg_qbUzSlkw",
            center: [31.85, 37.42],
            map: {},
            all: "",
            geocoder: null,
            marker: null,
            provinces: [],
            districts: [],
            address: {
                address: "",
                apartment: "",
                directions: "",
                floor: "",
                latitude: "",
                longitude: "",
                roomNumber: "",
                title: "",
                district: "",
                province: "",
                userId: "",
            }
        };
    }, mounted() {
        this.address.userId = JSON.parse(localStorage.getItem("user")).id;
        this.getAllProvinces();
        this.createMap()
    },

    methods: {
        async createMap() {
            try {
                mapboxgl.accessToken = this.access_token;

                this.map = new mapboxgl.Map({
                    container: "map",
                    style: "mapbox://styles/mapbox/streets-v12",
                    center: this.center,
                    zoom: 13,
                });
                this.geocoder = new MapboxGeocoder({
                    accessToken: this.access_token,
                    mapboxgl: mapboxgl,
                    marker: false
                });

                this.map.addControl(this.geocoder);

                this.marker = new mapboxgl.Marker({
                    draggable: true,
                    color: "#D80739",
                }).setLngLat(this.center).addTo(this.map);

                this.marker.on("dragend", (e) => {
                    this.center = Object.values(e.target.getLngLat());
                });
                this.geocoder.on("result", (e) => {
                    this.marker.setLngLat(e.result.center).addTo(this.map);
                    this.center = e.result.center;
                });
            } catch (err) {
                console.log("map error", err);
            }
        },
        async getLocation() {
            try {
                this.loading = true;
                const response = await axios.get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.center[0]},${this.center[1]}.json?access_token=${this.access_token}`
                );
                this.loading = false;
                let province;
                let district;
                response.data.features[0].context.some((i) => {
                    if (i.id.split('.').shift() === 'place') {
                        district = i.text.turkishToEnglishLower();
                        province = i.text.turkishToEnglishLower();
                    }
                    if (i.id.split('.').shift() === 'region') {
                        province = i.text.turkishToEnglishLower();
                    }
                });
                this.address.province = province;
                this.changeDistricts();
                this.address = {
                    ...this.address,
                    district,
                    address: response.data.features[0].place_name,
                    longitude: this.center[0],
                    latitude: this.center[1],
                }

            } catch (err) {
                this.loading = false;
                console.log(err);
            }
        },
        currentLocation() {
            this.locationLoading = true;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((result) => {
                    this.locationLoading = false;
                    this.center = [result.coords.longitude, result.coords.latitude];
                    this.marker.setLngLat(this.center).addTo(this.map);
                    this.map.flyTo({ center: this.center, zoom: 15 });
                    this.getLocation();
                });
            } else {
                alert("Tarayıcınız Geolocation API desteklemiyor.");
            }
        },
        selectAddress(willSave = false) {
            if (willSave)
                this.emitter.emit("mapbox_save", JSON.parse(JSON.stringify(this.address)));
            else
                this.emitter.emit("mapbox_select", JSON.parse(JSON.stringify(this.address)));
        },
        getAllProvinces() {
            return new Promise((resolve) => {
                this.fetchFunc("https://tıktık.com:8443/api/public/provinces", "GET", {}).then(res => {
                    this.provinces = res;
                    resolve(res);
                })
            });
        },
        changeDistricts() {
            let province = this.provinces.find(e => e.name.turkishToEnglishLower() == this.address.province.turkishToEnglishLower());
            if (!province) {
                alert("Öncelikle İl Seçmelisiniz");
                return;
            }
            this.getAllDistrictsByProvinceId(province)
        },
        getAllDistrictsByProvinceId(province) {
            return new Promise((resolve) => {
                this.fetchFunc("https://tıktık.com:8443/api/public/districts/" + province.id, "GET", {}).then(res => {
                    this.districts = res;
                    resolve(res);
                })
            });
        },

    },
}

</script>
