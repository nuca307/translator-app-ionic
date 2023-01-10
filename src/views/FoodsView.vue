<template>
  <main>
    <div>
      <div class="row mt-2">
        <bread-crump class="d-none d-md-block" :links="links"></bread-crump>
        <div class="d-none d-md-block col-md-3 col-xl-2">

          <div class="list-group sticky-top" style="top:3rem;">
            <button type="button" class="list-group-item list-group-item-action"
              :class="{ active: categoryFilter == 0 }" :aria-current="categoryFilter == 0" @click="setFilter(0)">
              TÜMÜ
            </button>
            <button type="button" class="list-group-item list-group-item-action" v-for="category of categories"
              :key="category" v-text="category.name" :class="{ active: categoryFilter == category.id }"
              :aria-current="categoryFilter == category.id" @click="setFilter(category.id)"></button>
          </div>
        </div>
        <div class="col-12 d-md-none sticky-top" style="overflow-x: auto ;">
          <bread-crump :links="links"></bread-crump>
          <div class="list-group list-group-horizontal my-2">
            <button type="button" class="list-group-item small list-group-item-action"
              :class="{ active: categoryFilter == 0 }" :aria-current="categoryFilter == 0" @click="setFilter(0)">
              TÜMÜ
            </button>
            <button type="button" class="list-group-item small list-group-item-action" v-for="category of categories"
              :key="category" v-text="category.name" :class="{ active: categoryFilter == category.id }"
              :aria-current="categoryFilter == category.id" @click="setFilter(category.id)"></button>
          </div>
        </div>
        <div class="col-12 col-md-9 col-xl-10">
          <food-table class="display" :data="filteredFoods" :columns="columns" unique="foods_table" v-slot="slotData">
          </food-table>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import FoodTable from '../components/FoodTable.vue';
import BreadCrump from "../components/BreadCrump.vue";

export default {
  props: ["pageIndex"],
  components: {
    FoodTable,
    BreadCrump
  },
  data() {
    return {
      foods: [],
      filteredFoods: [],
      categories: [],
      categoryFilter: 0,
      card: {
        keys: ['imageUrl', 'name'],
        link: {
          url: "/kategoriler/%data%",
          key: "name"
        }
      },
      columns: [
        {
          data: 'images', title: "Adı", index: 0,
          morph: ["", `<div class='ratio ratio-16x9' style="width:5rem;">
                        <img src='https://tıktık.com:8443/api%data%'/>
                      </div>`]
        }, //TODO
        { data: 'name', title: "Adı" },
        { data: 'price', title: "Fiyat", type: "number" },
        { data: 'discountedPrice', title: "İndirimli Fiyat", type: "number" },
        { data: 'discount', title: "İndirim Oranı", type: "number" },
        { data: 'unit', title: "Birim" },
      ],
      links: [
        { to: "/", text: "Anasayfa" },
        { to: "/kategoriler/food/" + this.$route.params.vendorId, text: "Kategoriler" },
        { to: "", text: "Ürünler" }
      ]
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
    /*getAllVendorCategories() {
      return new Promise((resolve) => {
        fetchFunc("https://tıktık.com:8443/api/public/foods/vendor/mainCategory/" + this.$route.params.module + "/" + this.$route.params.vendorId, "GET", {}, {}).then(res => {
          this.foods = res;
          resolve(res);
        })
      });
    },*/
    setFilter(filter) {
      this.categoryFilter = filter;
      this.filterFoods();
    },
    filterFoods() {
      if (this.categoryFilter) {
        this.filteredFoods = this.foods.filter(food => food.mainCategory.id == this.categoryFilter || food.subCategory.id == this.categoryFilter)
      }
      else {
        this.filteredFoods = JSON.parse(JSON.stringify(this.foods));
      }
    },
    getAllVendorFoodsByCategory() {
      return new Promise((resolve) => {
        this.fetchFunc("https://tıktık.com:8443/api/public/foods/vendor/mainCategoryId/" + this.$route.params.category + "/" + this.$route.params.vendorId, "GET", {}, {}).then(res => {
          this.foods = res;
          let categories = [];
          this.foods.forEach(food => {
            if (food.subCategory) {
              if (!categories.find(e => e.id == food.subCategory.id)) {
                categories.push(food.subCategory)
              }
            } else {
              if (!categories.find(e => e.id == food.mainCategory.id)) {
                categories.unshift(food.mainCategory)
              }
            };
          });
          this.categories = categories;
          this.filterFoods();
          resolve(res);
        })
      });
    },
  },
  mounted() {
    this.getAllVendorFoodsByCategory();
  }
}
</script>