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
    grid-template-columns: 2fr 2fr 1fr 1fr;
}

.food-item div {
    display: flex;
    align-items: center;
    justify-content: center;
}


.item-count,
.item-count-button {
    border: 1px solid var(--bs-secondary);
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
.food-variant-list::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.food-variant-list {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
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
                    <option>1</option>
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
        <div style="width: 100%;overflow: auto;">
            <ul class="list-group" v-if="isMobile">
                <li class="list-group-item" style="height: 200px; overflow: hidden;"
                    v-for="(food, index) of modifiedData" :key="food">
                    <div class="row h-100 food-variant-list" style="overflow-y: auto;">
                        <div style="font-weight: bold;" v-text="food.name"></div>
                        <slider class="col-3" :photos="food.images" :unique="'slider' + index">
                        </slider>
                        <div class="col-9 ">
                            <div class="row align-items-center py-1" style="border-bottom: 1px solid #198754;"
                                v-for="(variant, index) of food.foodVariants">
                                <div class="col-2" v-text="variant.name"></div>
                                <div class="col-2" v-text="variant.unit"></div>
                                <template v-if="variant.discount && variant.discountedPrice + ' ₺'">
                                    <div class="col-2 d-flex" style="flex-direction: column;">
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
                                <span class="col-2" v-else v-text="variant.price + '₺'"></span>

                                <div class="d-flex align-items-center justify-content-end col-6">
                                    <button class="item-count-button" @click="removeItem(food)">-</button>
                                    <span type="number" class="item-count" v-text="basketCount(food)"></span>
                                    <button class="item-count-button" @click="addItem(food)">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="row" v-else>
                <div class="col-md-6 col-lg-4 col-xl-3 d-flex" v-for="(food, index) of modifiedData" :key="food">
                    <div class="card mt-3 w-100" style="overflow: hidden;">
                        <slider :photos="food.images" :unique="'slider' + index">
                        </slider>
                        <div class="card-body">
                            <div style="font-weight: bold;" v-text="food.name">
                            </div>
                        </div>
                        <div class="card-footer align-items-center justify-content-between">
                            <div class="row align-items-center" v-for="(variant, index) of food.foodVariants">
                                <div class="d-flex align-items-center justify-content-between">
                                    <span v-text="variant.name"></span>
                                    <span class="badge badge-pill bg-danger" v-text="variant.unit"></span>
                                    <div class="d-flex" style="flex-direction: column;">
                                        <template v-if="variant.discount && variant.discountedPrice + ' ₺'">
                                            <s class="text-muted"><small v-text="variant.price + ' ₺'"></small></s>
                                            <svg xmlns="http://www.w3.org/2000/svg" style="width: 2rem;"
                                                viewBox="0 0 26.458 18.708">
                                                <path d="M0 0h26.458v10.583l-13.132 8.154L0 11.906z" fill="#198754"
                                                    paint-order="stroke fill markers" />
                                                <path d="M1.228.87H25.23v9.601l-11.912 7.397-12.089-6.197z" fill="#fff"
                                                    paint-order="stroke fill markers" />
                                                <path d="M1.514 1.072h23.43v9.372l-11.629 7.221-11.801-6.05z"
                                                    fill="#198754" paint-order="stroke fill markers" /><text
                                                    xml:space="preserve" x="12.703" y="10.593" font-size="11.906"
                                                    font-family="Z003" text-anchor="middle" fill="#198754">
                                                    <tspan x="12.703" y="10.593" fill="#fff" font-weight="bold"
                                                        v-text="variant.discount + '%'"></tspan>
                                                </text>
                                            </svg>
                                            <div v-text="variant.discountedPrice"></div>
                                        </template>
                                        <span v-else v-text="variant.price + '₺'"></span>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <button class="item-count-button" @click="removeItem(food)">-</button>
                                        <span class="position-relative">
                                            <span type="number" class="item-count" v-text="basketCount(food)"></span>
                                        </span>
                                        <button class="item-count-button" @click="addItem(food)">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
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
import Slider from "./Slider.vue";
export default {
    props: ["columns", "data", "unique", "hasDetail"],
    components: {
        Slider
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
    methods: {
        basketCount(food) {//watch denenebilir
            if (!this.basketSummary) return 0;
            let foundFood = this.basketSummary[food.id];
            return foundFood ? foundFood : 0;
        },
        addItem(food) {
            this.emitter.emit("basket_add_to_food", food);
        },
        removeItem(food) {
            this.emitter.emit("basket_remove_from_food", food);
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
            let filterTurkish = this.filter.turkishToLower();
            let filterGeneral = this.filter.toLowerCase();
            this.filteredData = [];
            for (let datum of this.data) {
                let result = false;
                for (let column of this.columns) {
                    result = result || this.getDataFromObject(datum, column).toString().toLowerCase().includes(filterGeneral) || this.getDataFromObject(datum, column).toString().turkishToLower().includes(filterTurkish);
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