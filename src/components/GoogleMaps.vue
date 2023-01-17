<style>
#map,
.map-holder {
    min-height: 300px;
}
</style>
<template>
    <div class="main">
        <div class="flex">
            <!-- Map Display here -->
            <div class="map-holder">
                <input id="search" type="text" placeholder="Arama Ör: 1510 Sk"
                    style="font-size: 1rem; top:1rem;width:10rem;border:2px solid chocolate; background-color: aquamarine;">

                <div id="map"></div>
            </div>
            <!-- Coordinates Display here -->
            <div class="dislpay-arena">
                <div class="d-flex justify-content-between">
                    <span>Enlem: {{ address.longitude.toFixed(4) }}</span>
                    <span>Boylam: {{ address.latitude.toFixed(4) }}</span>
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
                            <option v-for="province of provinces" :key="province" v-text="province.name"></option>
                        </select>

                        <select class="form-select form-select-sm" v-model="address.district">
                            <option value="" disabled selected>İlçe Seç</option>
                            <option v-for="district of districts" :key="district" v-text="district.name"
                                :value="district.name"></option>
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
                        <button class="btn btn-outline-primary" @click="selectAddress()" v-if="!wasLoggedIn">Sadece
                            Seç</button>
                        <button class="btn btn-primary" @click="selectAddress(true)" v-else>Seç ve
                            Kaydet</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Geolocation } from '@capacitor/geolocation';

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
                latitude: 37.42,
                longitude: 31.85,
                roomNumber: "",
                title: "",
                district: "",
                province: "",
                userId: "",
            }
        };
    },
    computed: {
        wasLoggedIn() {
            let user = localStorage.getItem("user");
            if (user) return true;
            return false;
        },
    },
    mounted() {

        /****** İmleç Pozisyonunu Ayarlama-Biter ******/
        String.prototype.turkishToLower = function () {
            var string = this;
            var letters = {
                "İ": "i",
                "I": "ı",
                "Ş": "ş",
                "Ğ": "ğ",
                "Ü": "ü",
                "Ö": "ö",
                "Ç": "ç"
            };
            string = string.replace(/(([İIŞĞÜÇÖ]))/g, function (letter) {
                return letters[letter];
            })
            return string.toLowerCase();
        }

        String.prototype.turkishToUpper = function () {
            var string = this;
            var letters = {
                "i": "İ",
                "ş": "Ş",
                "ğ": "Ğ",
                "ü": "Ü",
                "ö": "Ö",
                "ç": "Ç",
                "ı": "I"
            };
            string = string.replace(/(([iışğüçö]))/g, function (letter) {
                return letters[letter];
            })
            return string.toUpperCase();
        }
        let user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            this.address.userId = JSON.parse(localStorage.getItem("user")).id;
        }
        this.getAllProvinces();
        //this.createMap()
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: { lat: 37.42, lng: 31.85 }
        });
        this.marker = new google.maps.Marker({
            position: { lat: 37.42, lng: 31.85 },
            map: this.map
        });
        this.geocoder = new google.maps.Geocoder();
        google.maps.event.addListener(this.map, 'click', (event) => {

            this.getLocation(event);
        });

        // Create the search box and link it to the UI element.
        const input = document.getElementById("search");
        const searchBox = new google.maps.places.SearchBox(input);

        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // Bias the SearchBox results towards current map's viewport.
        this.map.addListener("bounds_changed", () => {
            searchBox.setBounds(this.map.getBounds());
        });

        let markers = [];

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach((marker) => {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            const bounds = new google.maps.LatLngBounds();

            places.forEach((place) => {
                if (!place.geometry || !place.geometry.location) {
                    console.log("Returned place contains no geometry");
                    return;
                }

                const icon = {
                    url: place.icon,
                    size: new google.maps.Size(25, 25),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25),
                };

                // Create a marker for each place.
                markers.push(
                    new google.maps.Marker({
                        map: this.map,
                        icon,
                        title: place.name,
                        position: place.geometry.location,
                    })
                );
                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            this.map.fitBounds(bounds);
        });

        /*var autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('search'), {
            types: ['geocode']
        });
        autocomplete.bindTo('bounds', map);*/
        /*autocomplete.addListener('place_changed', function () {
            var place = autocomplete.getPlace();
            debugger
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }
        });*/

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
        getLocation(event) {
            this.geocoder.geocode({ 'location': event.latLng }, (results, status) => {
                var pos = {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                };
                this.marker.setPosition(pos);
                this.map.setCenter(pos);

                if (status === 'OK') {
                    if (results[0]) {
                        const addressComponents = results[0].address_components;

                        // Find the district component
                        const district = addressComponents.find(component => component.types.includes('administrative_area_level_2')).long_name.turkishToUpper();

                        // Find the province component
                        this.address.province = addressComponents.find(component => component.types.includes('administrative_area_level_1')).long_name.turkishToUpper();
                        this.changeDistricts();
                        this.address = {
                            ...this.address,
                            district,
                            address: results[0].formatted_address,
                            longitude: parseFloat(pos.lng),
                            latitude: parseFloat(pos.lat),
                            isActive: true
                        }
                    } else {
                        console.log('No results found');
                    }
                } else {
                    console.log('Geocoder failed due to: ' + status);
                }
            });
        },
        currentLocation() {
            this.locationLoading = true;
            Geolocation.getCurrentPosition().then((result) => {

                this.locationLoading = false;
                var pos = {
                    lat: result.coords.latitude,
                    lng: result.coords.longitude
                };
                this.marker.setPosition(pos);
                this.map.setCenter(pos);
                this.geocoder.geocode({ 'location': pos }, (results, status) => {

                    this.marker.setPosition(pos);
                    this.map.setCenter(pos);

                    if (status === 'OK') {
                        if (results[0]) {
                            const addressComponents = results[0].address_components;

                            // Find the district component
                            const district = addressComponents.find(component => component.types.includes('administrative_area_level_2')).long_name.turkishToUpper();

                            // Find the province component
                            this.address.province = addressComponents.find(component => component.types.includes('administrative_area_level_1')).long_name.turkishToUpper();
                            this.changeDistricts();
                            this.address = {
                                ...this.address,
                                district,
                                address: results[0].formatted_address,
                                longitude: parseFloat(pos.lng),
                                latitude: parseFloat(pos.lat),
                            }
                        } else {
                            console.log('No results found');
                        }
                    } else {
                        console.log('Geocoder failed due to: ' + status);
                    }
                });
            })
            /*if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((result) => {
                    this.locationLoading = false;
                    var pos = {
                        lat: result.coords.latitude,
                        lng: result.coords.longitude
                    };
                    this.marker.setPosition(pos);
                    this.map.setCenter(pos);
                    /*this.marker.setLngLat(this.center).addTo(this.map);
                    this.map.flyTo({ center: this.center, zoom: 15 });
                    this.getLocation();*
                });
            } else {
                alert("Tarayıcınız Geolocation API desteklemiyor.");
            }*/
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
            let province = this.provinces.find(e => e.name.turkishToLower() == this.address.province.turkishToLower());
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
        }

    },
}

</script>
