<style>
.basket-count {
  right: -.7rem;
  top: -.7rem;
  width: 1.4rem;
  height: 1.4rem;
  border: 2px solid var(--bs-primary);
  border-radius: 50%;
  font-size: .8rem;
}
</style>
<template>
  <main>
    <div style="font-size: 12px; overflow: scroll;">
      <ion-toolbar color="secondary" scrollable>
        <ion-segment value="all" scrollable>
          <ion-segment-button value="gida">
            Gıda
          </ion-segment-button>
          <ion-segment-button value="elektronik">
            Elektronik
          </ion-segment-button>
          <ion-segment-button value="hirdavat">
            Hırdavat
          </ion-segment-button>
          <ion-segment-button value="pet">
            Pet Shop
          </ion-segment-button>
          <ion-segment-button value="Giyim">
            Giyim
          </ion-segment-button>
          <ion-segment-button value="kozmetik">
            Kozmetik
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </div>
    <ion-slides pager="true" :options="slideOpts">
      <ion-slide>
        <div class="card-group">
          <ion-grid>
            <ion-row>
              <ion-col v-for="product of products" :key="product.id">
                <ion-card>
                  <img v-for="image of product.images" :src="image" class="card-img-top" alt="..." :key="image">
                  <ion-card-header>
                    <h5 class="card-title" v-text="product.name"></h5>
                    <p class="card-text" v-text="product.detail"></p>
                    <span>
                      <s class="text-muted" v-text="product.price"></s>
                    </span>
                    <span class="text-success" v-text="product.discount + '%'" />
                    <p><strong v-text="product.discountedPrice"></strong></p>
                  </ion-card-header>
                  <ion-card-footer class="card-footer">
                    <ion-row class="row">
                      <div class="col-6">
                        <ion-input type="number" class="form-control" v-model="product.count" />
                      </div>
                      <div class="col-6">
                        <ion-button class="btn btn-primary position-relative w-50" style="z-index: 1;"
                          @click="addItem(product)">+
                        </ion-button>
                        <ion-badge class="basket-count" color="secondary" v-if="product.onBasketCount"
                          v-text="product.onBasketCount">
                        </ion-badge>
                        <ion-button color="danger" class="btn btn-danger w-50" @click="removeItem(product)">-
                        </ion-button>
                      </div>
                    </ion-row>
                  </ion-card-footer>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>
      </ion-slide>
      <ion-slide>
        <div class="card-group">
          <ion-grid>
            <ion-row>
              <ion-col v-for="product of products" :key="product.id">
                <ion-card>
                  <img v-for="image of product.images" :src="image" class="card-img-top" alt="..." :key="image">
                  <ion-card-header>
                    <h5 class="card-title" v-text="product.name"></h5>
                    <p class="card-text" v-text="product.detail"></p>
                    <span>
                      <s class="text-muted" v-text="product.price"></s>
                    </span>
                    <span class="text-success" v-text="product.discount + '%'" />
                    <p><strong v-text="product.discountedPrice"></strong></p>
                  </ion-card-header>
                  <ion-card-footer class="card-footer">
                    <ion-row class="row">
                      <div class="col-6">
                        <ion-input type="number" class="form-control" v-model="product.count" />
                      </div>
                      <div class="col-6">
                        <ion-button class="btn btn-primary position-relative w-50" style="z-index: 1;"
                          @click="addItem(product)">+
                        </ion-button>
                        <ion-badge class="basket-count" color="secondary" v-if="product.onBasketCount"
                          v-text="product.onBasketCount">
                        </ion-badge>
                        <ion-button color="danger" class="btn btn-danger w-50" @click="removeItem(product)">-
                        </ion-button>
                      </div>
                    </ion-row>
                  </ion-card-footer>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>
      </ion-slide>
    </ion-slides>
    <ion-button @click="setUsersBasket">Kaydet</ion-button>
  </main>
</template>

<script>
let GETTING_TIMEOUT = 5000;

function fetchFunc(resource, method, options = {}, body) {
  const { timeout = GETTING_TIMEOUT } = options;
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
}
import {
  IonCard,
  IonButton,
  IonCardHeader,
  IonCardFooter,
  IonInput,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  IonSlides,
  IonSlide,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  toastController
} from '@ionic/vue';

export default {
  components: {
    IonCard,
    IonButton,
    IonCardHeader,
    IonCardFooter,
    IonInput,
    IonBadge,
    IonGrid,
    IonRow,
    IonCol,
    IonSlides,
    IonSlide,
    IonToolbar,
    IonSegment,
    IonSegmentButton
  },
  data() {
    return {
      products: [],
      productsObj: {},
      basket: {},
      basketDraft: {
        id: '',
        userId: '',
        items: [],
        amount: '',
        unit: '',
        price: '',
        discountedPrice: '',
        discount: '',
        isDone: 0,
        creator: '',
        updater: ''
      },
      slideOpts: slideOpts,
      toastController
    }
  },
  computed: {
    getUserName() {
      return JSON.parse(localStorage.getItem("user")).name;
    }
  },
  methods: {
    getAllProducts() {
      return new Promise((resolve) => {
        fetchFunc("http://localhost:8080/products", "GET", {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }, {
          "email": this.email,
          "password": this.password,
          "vendorId": this.vendorId
        }).then(res => {
          resolve(res);
        })
      });

    },
    getUsersBasketByUserId() {
      return new Promise((resolve) => {
        let user = JSON.parse(localStorage.getItem("user"));
        fetchFunc("http://localhost:8080/baskets/user/" + user.id, "GET", {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then(res => {
          resolve(res);
        })
      });
    },
    setUsersBasket() {
      let user = JSON.parse(localStorage.getItem("user"));
      let method = this.basket.id ? "PUT" : "POST";
      this.basket.userId = user.id;
      fetchFunc("http://localhost:8080/baskets/", method, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      },
        this.basket
      ).then(async res => {
        this.basket = res;
        const toast = await this.toastController.create({
          message: 'Ürünler Sepete Eklendi!',
          duration: 1500,
          position: "bottom"
        });

        await toast.present();
        this.$router.push('/sepet');
      })
    },
    addItem(product) {
      let item;
      if (this.basket.items)
        item = this.basket.items.find(e => e.productId == product.id);
      else
        this.basket.items = [];

      if (item) {
        item.count += product.count;
        product.onBasketCount = item.count;
      } else {
        this.basket.items.push({
          count: product.count,
          image: product.images[0],
          name: product.name,
          price: product.price,
          productId: product.id,
          unit: product.unit,
          vendorId: product.vendorId,
        });
        product.onBasketCount = product.count;
      }
    },
    removeItem(product) {
      let itemIndex = this.basket.items.findIndex(e => e.productId == product.id);

      if (itemIndex) {
        let item = this.basket.items[itemIndex];
        item.count -= product.count;
        product.onBasketCount = item.count;

        if (item.count <= 0) {
          this.basket.items.splice(itemIndex, 1);
        }
      }
    }
  },
  mounted() {
    Promise.all([this.getAllProducts(), this.getUsersBasketByUserId()])
      .then((data) => {

        let products = data[0];
        products.forEach(e => {
          let object = { ...e, count: 1, onBasketCount: 0 };
          this.productsObj[e.id] = object;
          this.products.push(object);
        })

        let basket = data[1] ? data[1] : { ...this.basketDraft };
        this.basket = basket;

        console.table(this.products);
        console.log(this.basket);
        if (this.basket.items) {
          this.basket.items.forEach(item => {
            this.productsObj[item.productId].onBasketCount = item.count;
          });
        }
      });
  }
}
const slideOpts = {
  on: {
    beforeInit() {
      const swiper = this;
      swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
      const overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: true,
      };
      swiper.params = Object.assign(swiper.params, overwriteParams);
      swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
    },
    setTranslate() {
      const swiper = this;
      const { slides, rtlTranslate: rtl } = swiper;
      for (let i = 0; i < slides.length; i += 1) {
        const $slideEl = slides.eq(i);
        let progress = $slideEl[0].progress;
        if (swiper.params.flipEffect.limitRotation) {
          progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        }
        const offset$$1 = $slideEl[0].swiperSlideOffset;
        const rotate = -180 * progress;
        let rotateY = rotate;
        let rotateX = 0;
        let tx = -offset$$1;
        let ty = 0;
        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
          rotateX = -rotateY;
          rotateY = 0;
        } else if (rtl) {
          rotateY = -rotateY;
        }

        $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

        if (swiper.params.flipEffect.slideShadows) {
          // Set shadows
          let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if (shadowBefore.length === 0) {
            shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`);
            $slideEl.append(shadowBefore);
          }
          if (shadowAfter.length === 0) {
            shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`);
            $slideEl.append(shadowAfter);
          }
          if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
          if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
        }
        $slideEl
          .transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
      }
    },
    setTransition(duration) {
      const swiper = this;
      const { slides, activeIndex, $wrapperEl } = swiper;
      slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
      if (swiper.params.virtualTranslate && duration !== 0) {
        let eventTriggered = false;
        // eslint-disable-next-line
        slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
          if (eventTriggered) return;
          if (!swiper || swiper.destroyed) return;

          eventTriggered = true;
          swiper.animating = false;
          const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
          for (let i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    }
  }
};
</script>