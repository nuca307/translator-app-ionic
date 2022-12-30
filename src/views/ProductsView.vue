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
        <div class="col-12 d-md-none sticky-top" style="overflow-x: scroll ;">
          <bread-crump :links="links"></bread-crump>
          <div class="list-group list-group-horizontal my-2">
            <button type="button" class="list-group-item small list-group-item-action"
              :class="{ active: categoryFilter == 0 }" :aria-current="categoryFilter == 0" @click="setFilter(0)">
              TÜMÜ
            </button>
            <button type="button" class="list-group-item list-group-item-action" v-for="category of categories"
              :key="category" v-text="category.name" :class="{ active: categoryFilter == category.id }"
              :aria-current="categoryFilter == category.id" @click="setFilter(category.id)"></button>
          </div>
        </div>
        <div class="col-12 col-md-9 col-xl-10">
          <product-table class="display" :data="filteredProducts" :columns="columns" unique="products_table">
          </product-table>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ProductTable from '../components/ProductTable.vue';
import BreadCrump from "../components/BreadCrump.vue";

export default {
  props: ["pageIndex"],
  components: {
    ProductTable,
    BreadCrump
  },
  data() {
    return {
      products: [],
      filteredProducts: [],
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
                        <img src='http://192.168.1.100:8080%data%'/>
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
        { to: "/kategoriler/shopping/" + this.$route.params.vendorId, text: "Kategoriler" },
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
    setFilter(filter) {
      this.categoryFilter = filter;
      this.filterProducts();
    },
    filterProducts() {
      if (this.categoryFilter) {
        this.filteredProducts = this.products.filter(product => product.mainCategory.id == this.categoryFilter || product.subCategory.id == this.categoryFilter)
      }
      else {
        this.filteredProducts = JSON.parse(JSON.stringify(this.products));
      }
    },
    getAllVendorProductsByCategory() {
      return new Promise((resolve) => {
        this.fetchFunc("http://192.168.1.100:8080/public/products/vendor/mainCategoryId/" + this.$route.params.category + "/" + this.$route.params.vendorId, "GET", {}, {}).then(res => {
          this.products = res;
          let categories = [];
          this.products.forEach(product => {
            if (product.subCategory) {
              if (!categories.find(e => e.id == product.subCategory.id)) {
                categories.push(product.subCategory)
              }
            } else {
              if (!categories.find(e => e.id == product.mainCategory.id)) {
                categories.unshift(product.mainCategory)
              }
            }
          });
          this.categories = categories;
          this.filterProducts();
          resolve(res);
        })
      });
    },
  },
  mounted() {
    this.getAllVendorProductsByCategory();
  }
}
</script>