<style scoped>
.carousel-control-prev-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%238bc2a8'%3e%3cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e");
}

.carousel-control-next-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%238bc2a8'%3e%3cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e")
}

img {
    max-width: 100%;
    max-height: 100%;
}
</style>
<template>
    <!-- Carousel -->
    <div :id="unique" class="carousel slide " data-bs-interval="false" v-show="photos.length">
        <div class="carousel-indicators" v-if="photos.length > 1">
            <div v-for="(photo, photoIndex) of photos" class="carousel-item text-center" :key="photo">
                <button type="button" class=" bg-success" :data-bs-target="'#' + unique" :data-bs-slide-to="photoIndex"
                    :class="{ active: selectedIndex == photoIndex }"
                    :aria-current="{ active: selectedIndex == photoIndex }" :aria-label="photo.title"></button>
            </div>
        </div>

        <div class="carousel-inner">
            <div v-for="(photo, photoIndex) of photos" class="carousel-item text-center" :class="{
                active: selectedIndex == photoIndex,
                'carousel-item-left': direction == 'right' && (selectedIndex == photoIndex || selectedIndex + 1 == photoIndex),
                'carousel-item-right': direction == 'left' && (selectedIndex == photoIndex || selectedIndex - 1 == photoIndex),
                'carousel-item-next': direction == 'right' && selectedIndex == photoIndex,
                'carousel-item-prev': direction == 'left' && selectedIndex == photoIndex,
            }" :key="photo">
                <div class="ratio ratio-16x9">
                    <img :src="'https://tıktık.com:8443/api' + photo" alt="photo" class="carousel-img" />
                </div>
            </div>
        </div>

        <slot></slot>
        <a v-if="selectedIndex != 0" class="carousel-control-prev" role="button" @click="carouselLeft()">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Geri</span>
        </a>
        <a v-if="selectedIndex != photos.length - 1" class="carousel-control-next" role="button"
            @click="carouselRight()">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">İleri</span>
        </a>
    </div>
    <!-- Carousel -->
</template>

<script>
import { Carousel } from 'bootstrap';

export default {
    props: ["unique", "photos"],
    data() {
        return {
            selectedIndex: 0,
            direction: 0,
        };
    },
    methods: {
        carouselRight() {
            this.direction = "left";
            setTimeout(() => {
                this.direction = 0;
                this.selectedIndex++;
            }, 600);
        },
        carouselLeft() {
            this.direction = "right";
            setTimeout(() => {
                this.direction = 0;
                this.selectedIndex--;
            }, 600);
        },
    },
    mounted() {
        const carousel = document.querySelector("#" + this.unique)
        new Carousel(carousel, {
            wrap: false,
            interval: false
        });
        carousel.addEventListener('slid.bs.carousel', () => {
            document.querySelectorAll("#" + this.unique + " .carousel-item").forEach((e, i) => {
                if (e.classList.contains('active')) {
                    this.selectedIndex = i;
                }
            })
        })

    }
};
</script>