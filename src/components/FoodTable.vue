<style scoped>
.loading-container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #111111aa;
    color: white;
    font-size: 2rem;
}

.food-item {
    display: grid;
    color: #0d6efd;
}

.food-item div {
    display: flex;
    align-items: center;
    justify-content: center;
}


.item-count,
.item-count-button {
    border: 1px solid var(--bs-primary);
    color: var(--bs-primary);
    font-weight: 500;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.item-count-button {
    width: 1.5rem;
    height: 1.5rem;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.food-variant-list::-webkit-scrollbar,
.card-footer::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.food-variant-list,
.card-footer {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

/* Variantları yukarı kaydırmak için */
#chk:checked~.signup {
    transform: translateY(-500px);
}

#chk:checked~.signup label {
    transform: scale(1);
}

#chk:checked~.login label {
    transform: scale(.6);
}
</style>
<template>
    <div class="row">
        <div class="loading-container" :hidden="isLoaded">
            <i class="fa-solid fa-spinner fa-spin"></i> Yükleniyor
        </div>
        <div class="d-flex justify-content-between">
            <div class="d-flex justify-content-start align-items-center">
                <label>Limit: </label>
                <select v-model.number="selectedLimit" @change="setSelectedLimit" class="form-select"
                    style="min-width: 5rem;">
                    <option>5</option>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                </select>
            </div>
            <div class="d-flex justify-content-end">
                <input type="text" v-model="filter" @input="modifyData()"
                    class="form-control input-default d-inline-block" style="width:50%;min-width:150px;" />
                <button @click="filterData" class="btn btn-primary ml-2">Ara</button>
            </div>
        </div>
        <div class="mt-2" style="width: 100%;overflow: auto;">
            <ul class="list-group" v-if="isMobile">
                <li class="list-group-item bg-light" style="max-height: 300px; overflow: hidden;"
                    v-for="(food, index) of modifiedData" :key="food">
                    <div class="row food-variant-list" style="overflow-y: auto;">
                        <div class="col-lg-4 card mb-3" style="max-height:150px;justify-content: center;">
                            <div class="row g-0" style="overflow: hidden;">
                                <div class="col-6 col-sm-4 col-lg-12">
                                    <slider-vue class="img-fluid rounded-start" :photos="food.images"
                                        :unique="'slider' + index">
                                    </slider-vue>
                                </div>
                                <div class="col-6 col-sm-8 col-lg-12">
                                    <div class="card-body">
                                        <div><small style="font-weight: bold;" v-text="food.name"></small></div>
                                        <small v-text="food.detail"></small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <div class="align-items-center py-1 food-item" style="border-bottom: 1px solid #198754;"
                                v-for="(variant, index) of food.foodVariants"
                                :style="wasLoggedIn ? 'grid-template-columns: 2fr 1fr 1fr 2fr;' : 'grid-template-columns: 2fr 2fr 1fr;'">
                                <div v-text="variant.name"></div>
                                <div v-text="variant.unit"></div>
                                <template v-if="variant.discount && variant.discountedPrice + ' ₺'">
                                    <div class="d-flex" style="flex-direction: column;">
                                        <s class="text-muted"><small v-text="variant.price + '₺'"></small></s>

                                        <svg xmlns="http://www.w3.org/2000/svg" style="width: 2rem;"
                                            viewBox="0 0 26.458 18.708">
                                            <path d="M0 0h26.458v10.583l-13.132 8.154L0 11.906z" fill="#198754"
                                                paint-order="stroke fill markers" />
                                            <path d="M1.228.87H25.23v9.601l-11.912 7.397-12.089-6.197z" fill="#fff"
                                                paint-order="stroke fill markers" />
                                            <path d="M1.514 1.072h23.43v9.372l-11.629 7.221-11.801-6.05z" fill="#198754"
                                                paint-order="stroke fill markers" /><text xml:space="preserve"
                                                x="12.703" y="10.593" font-size="11.906" font-family="Z003"
                                                text-anchor="middle" fill="#198754">
                                                <tspan x="12.703" y="10.593" fill="#fff" font-weight="bold"
                                                    v-text="variant.discount + '%'"></tspan>
                                            </text>
                                        </svg>
                                        <div v-text="variant.discountedPrice + '₺'"></div>
                                    </div>
                                </template>
                                <span v-else v-text="variant.price + '₺'"></span>

                                <div class="d-flex align-items-center justify-content-end" v-if="wasLoggedIn">
                                    <button class="item-count-button" @click="removeFoodItem(food, variant)">-</button>
                                    <span class="position-relative">
                                        <span type="number" class="item-count"
                                            v-text="basketCount(food, variant)"></span>
                                    </span>
                                    <button class="item-count-button" @click="addFoodItem(food, variant)">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="row" v-else>
                <div class="col-lg-6 col-xl-4 col-xxl-3 d-flex" v-for="(food, index) of modifiedData" :key="food">
                    <div class="card mt-3 w-100" style="overflow: hidden;">
                        <slider-vue :photos="food.images" :unique="'slider' + index">
                        </slider-vue>
                        <div class="card-body">
                            <div style="font-weight: bold;" v-text="food.name">
                            </div>
                            <span v-text="food.detail"></span>
                        </div>
                        <div class="card-footer align-items-center justify-content-between text-center"
                            style="height:2rem; overflow: auto;">
                            <input type="checkbox" :id="'chk' + index" aria-hidden="true" @click="variantControl()"
                                hidden>
                            <label :for="'chk' + index" aria-hidden="true" class="w-100">Fiyatları Göster</label>
                            <div class="row align-items-center mb-2 food-item"
                                v-for="(variant, index) of food.foodVariants"
                                :style="wasLoggedIn ? 'grid-template-columns: 2fr 1fr 1fr 2fr;' : 'grid-template-columns: 2fr 2fr 1fr;'">
                                <span v-text="variant.name"></span>
                                <div v-text="variant.unit"></div>
                                <div class="d-flex" style="flex-direction: column;">
                                    <template v-if="variant.discount && variant.discountedPrice + ' ₺'">
                                        <s class="text-muted"><small v-text="variant.price + ' ₺'"></small></s>
                                        <svg xmlns="http://www.w3.org/2000/svg" style="width: 2rem;"
                                            viewBox="0 0 26.458 18.708">
                                            <path d="M0 0h26.458v10.583l-13.132 8.154L0 11.906z" fill="#198754"
                                                paint-order="stroke fill markers" />
                                            <path d="M1.228.87H25.23v9.601l-11.912 7.397-12.089-6.197z" fill="#fff"
                                                paint-order="stroke fill markers" />
                                            <path d="M1.514 1.072h23.43v9.372l-11.629 7.221-11.801-6.05z" fill="#198754"
                                                paint-order="stroke fill markers" /><text xml:space="preserve"
                                                x="12.703" y="10.593" font-size="11.906" font-family="Z003"
                                                text-anchor="middle" fill="#198754">
                                                <tspan x="12.703" y="10.593" fill="#fff" font-weight="bold"
                                                    v-text="variant.discount + '%'"></tspan>
                                            </text>
                                        </svg>
                                        <div v-text="variant.discountedPrice + '₺'"></div>
                                    </template>
                                    <span v-else v-text="variant.price + '₺'"></span>
                                </div>
                                <div class="d-flex align-items-center" v-if="wasLoggedIn">
                                    <button class="item-count-button" @click="removeFoodItem(food, variant)">-</button>
                                    <span class="position-relative">
                                        <span type="number" class="item-count"
                                            v-text="basketCount(food, variant)"></span>
                                    </span>
                                    <button class="item-count-button" @click="addFoodItem(food, variant)">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-2">
            <button class="btn btn-outline-primary" @click="prevPage()"
                :disabled="pagination.currentPageIndex <= 0">Geri</button>
            <button v-if="pagination.pageCount > 5" class="btn btn-outline-primary" @click="prevPage()"
                :disabled="pagination.currentPageIndex <= 0">...</button>

            <button class="btn" v-for="index in pagination.pageCount" v-text="index" v-show="(pagination.currentPageIndex - 1 < index && index < pagination.currentPageIndex + 5)
            || (pagination.currentPageIndex < 2 && index <= 5)
            || (pagination.currentPageIndex - 4 < index && index < pagination.currentPageIndex)"
                :class="index - 1 == pagination.currentPageIndex ? 'btn-primary' : 'btn-outline-primary'"
                @click="goToPage(index - 1)"></button>

            <button v-if="pagination.pageCount > 5" class="btn btn-outline-primary" @click="nextPage()"
                :disabled="pagination.currentPageIndex >= pagination.pageCount - 1">...</button>
            <button class="btn btn-outline-primary" @click="nextPage()"
                :disabled="pagination.currentPageIndex >= pagination.pageCount - 1">İleri</button>
        </div>
    </div>
</template>
<script>
import SliderVue from "./SliderVue.vue";
export default {
    props: ["columns", "data", "unique", "hasDetail"],
    components: {
        SliderVue
    },
    inject: {
        basketSummary: 'basketSummary'
    },
    data() {
        return {
            isLoaded: false,
            filteredData: [],
            modifiedData: [],
            filter: "",
            pagination: {
                limit: 10,
                dataLength: 0,
                pageCount: 0,
                startIndex: 0,
                endIndex: 0,
                currentPageIndex: 0
            },
            selectedLimit: 10,
            sortingColumn: undefined,
            isReveseSort: false,
            isMobile: ""
        }
    },
    computed: {
        wasLoggedIn() {
            let user = localStorage.getItem("user");
            if (user) return true;
            return false;
        },
    },
    methods: {
        variantControl() {
            let elm = event.target;
            if (elm.checked == true) {
                elm.parentNode.style = "margin-top:-100px;background-color: #b6dfcc;transition: .8s ease-in-out;z-index: 99;";
                event.explicitOriginalTarget.innerText = "Fiyatları Gizle";
                setTimeout(() => {
                    elm.parentNode.style = "height:auto;margin-top:-100px;background-color: #b6dfcc;transition: .8s ease-in-out;z-index: 99";
                }, 800);
            } else {
                elm.parentNode.style = "margin-top:0px; background-color: rgba(0, 0, 0, 0.03);height:2rem;overflow: auto;transition: .8s ease-in-out;z-index: 99;";
                event.explicitOriginalTarget.innerText = "Fiyatları Göster";
            }
        },
        basketCount(food, variant) {//watch denenebilir
            if (!this.basketSummary) return 0;
            let foundFood = this.basketSummary['food' + variant.id];
            return foundFood ? foundFood : 0;
        },
        addFoodItem(food, variant) {
            food.variant = JSON.parse(JSON.stringify(variant));
            console.log("266-FoodTable: ", food);
            this.emitter.emit("basket_add_to_food_variant", food);
        },
        removeFoodItem(food, variant) {
            food.variant = JSON.parse(JSON.stringify(variant));
            this.emitter.emit("basket_remove_from_food_variant", food);
        },
        checkIsMobile() {
            this.isMobile = window.innerWidth < 992;
        },
        getHtmlFromData(datum, column) {
            let rawData = this.getDataFromObject(datum, column);
            let htmlData = rawData;
            if (column.modifier) {
                htmlData = column.modifier[rawData];
            } else if (column.morph) {
                htmlData = (rawData == 0 || rawData == "-") ? column.morph[0] : column.morph[1].replace("%data%", rawData);
            }
            return htmlData;
        },
        getDataFromObject(datum, column) {
            let result = datum;
            column.data.split(".").forEach(t => {
                if (result[t]) {
                    result = result[t];
                } else {
                    result = column.type == "number" ? 0 : "-";
                }
            });

            if (column.index || column.index === 0) {
                result = result[column.index] ? result[column.index] : "";
            }
            return result;
        },
        modifyData(currentPageIndex = 0) {
            this.filterData(currentPageIndex);
            this.sliceData();
            this.isLoaded = true;
        },
        sliceData() {
            this.modifiedData = this.filteredData.slice(this.pagination.startIndex, this.pagination.endIndex);
        },
        sortColumn(column) {
            if (this.sortingColumn == column.data) {
                this.isReveseSort = !this.isReveseSort;
            } else {
                this.sortingColumn = column.data;
                this.isReveseSort = false;
            }
            if (column.type == "number") {
                if (this.isReveseSort) {
                    this.filteredData = this.filteredData.sort((a, b) => (parseFloat(this.getDataFromObject(a, column)) > parseFloat(this.getDataFromObject(b, column))) ? -1 : (parseFloat(this.getDataFromObject(b, column)) > parseFloat(this.getDataFromObject(a, column))) ? 1 : 0);
                } else {
                    this.filteredData = this.filteredData.sort((a, b) => (parseFloat(this.getDataFromObject(a, column)) > parseFloat(this.getDataFromObject(b, column))) ? 1 : (parseFloat(this.getDataFromObject(b, column)) > parseFloat(this.getDataFromObject(a, column))) ? -1 : 0);
                }
            } else {
                if (this.isReveseSort) {
                    this.filteredData = this.filteredData.sort((a, b) => (this.getDataFromObject(a, column) > this.getDataFromObject(b, column)) ? -1 : ((this.getDataFromObject(b, column) > this.getDataFromObject(a, column)) ? 1 : 0));
                } else {
                    this.filteredData = this.filteredData.sort((a, b) => (this.getDataFromObject(a, column) > this.getDataFromObject(b, column)) ? 1 : ((this.getDataFromObject(b, column) > this.getDataFromObject(a, column)) ? -1 : 0));
                }
            }
            this.sliceData();
        },
        filterData(currentPageIndex = 0) {
            let filterTurkish = this.turkishToLower(this.filter);
            let filterGeneral = this.filter.toLowerCase();
            this.filteredData = [];
            for (let datum of this.data) {
                let result = false;
                for (let column of this.columns) {
                    result = result || this.getDataFromObject(datum, column).toString().toLowerCase().includes(filterGeneral) || this.turkishToLower(this.getDataFromObject(datum, column).toString()).includes(filterTurkish);
                    if (result) break;
                }
                if (result) {
                    this.filteredData.push(datum);
                }
            }
            this.pagination = {
                ...this.pagination,
                dataLength: this.filteredData.length,
                pageCount: Math.ceil(this.filteredData.length / this.pagination.limit),
                startIndex: 0,
                endIndex: this.pagination.limit,
                currentPageIndex
            }
            this.modifiedData = JSON.parse(JSON.stringify(this.filteredData));
        },
        prevPage() {
            --this.pagination.currentPageIndex;
            this.goToPage(this.pagination.currentPageIndex);
            this.sliceData();
        },
        nextPage() {
            ++this.pagination.currentPageIndex;
            this.goToPage(this.pagination.currentPageIndex);
            this.sliceData();
        },
        goToPage(startIndex) {
            this.pagination.startIndex = startIndex * this.pagination.limit < 0 ? 0 : startIndex * this.pagination.limit;
            this.pagination.endIndex = this.pagination.startIndex + this.pagination.limit > this.pagination.dataLength ? this.pagination.dataLength : this.pagination.startIndex + this.pagination.limit;
            this.pagination.currentPageIndex = startIndex;
            this.sliceData();
        },
        setSelectedLimit() {
            this.pagination.limit = this.selectedLimit;
            this.modifyData();
            if (this.unique)
                localStorage.setItem("table_limit_of_" + this.unique, this.selectedLimit);
        },
        showDetail(index) {
            let elem = this.$refs['table_detail' + index][0];
            let tableOpen = this.$refs['table_detail_open' + index][0];
            let tableClose = this.$refs['table_detail_close' + index][0];
            if (elem.getAttribute("show") === "true") {
                tableOpen.style.display = "inline";
                tableClose.style.display = "none";
                elem.style.display = "none";
                elem.setAttribute("show", "false");
            } else {
                tableOpen.style.display = "none";
                tableClose.style.display = "inline";
                elem.style.display = "table-cell";
                elem.setAttribute("show", "true");
            }
        },
        emitRowData(datum) {
            this.emitter.emit(this.unique, JSON.parse(JSON.stringify(datum)));
        },
        turkishToLower(string) {
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
        },
        turkishToUpper(string) {
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
    },
    mounted() {
        this.isMobile = window.innerWidth < 992;
        window.addEventListener("resize", this.checkIsMobile);
        this.isLoaded = false;
        this.selectedLimit = parseInt(localStorage.getItem("table_limit_of_" + this.unique) || 10);
        this.pagination.limit = this.selectedLimit;

    },
    unmounted() {
        window.removeEventListener("resize", this.checkIsMobile);
    },
    watch: {
        $props: {
            handler() {
                this.modifyData();
            },
            deep: true,
            immediate: true,
        },
    }
};
</script>