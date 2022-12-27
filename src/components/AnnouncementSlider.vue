<template>
    <div class="row vh-25">
        <!-- Carousel -->
        <div :id="unique" class="carousel slide position-relative" style="background-color: #b6dfcc;"
            data-bs-ride="carousel" data-bs-touch="true" data-bs-pause="hover">
            <div class="carousel-indicators">
                <button type="button" v-for="(announcement, announcementIndex) of announcements" :key="announcement"
                    :data-bs-target="'#' + unique" :data-bs-slide-to="announcementIndex"
                    :class="{ active: selectedIndex == announcementIndex }"
                    :aria-current="selectedIndex == announcementIndex ? 'active' : ''"
                    :aria-label="announcement.title"></button>
            </div>

            <div :id="unique + 'thumbnails_carousel_inner'" class="carousel-inner text-center"
                v-if="announcements.length">
                <div v-for="(announcement, announcementIndex) of announcements" class="carousel-item text-center"
                    :class="{
    active: selectedIndex == announcementIndex,
    'carousel-item-left': direction == 'right' && (selectedIndex == announcementIndex || selectedIndex + 1 == announcementIndex),
    'carousel-item-right': direction == 'left' && (selectedIndex == announcementIndex || selectedIndex - 1 == announcementIndex),
    'carousel-item-next': direction == 'right' && selectedIndex == announcementIndex,
    'carousel-item-prev': direction == 'left' && selectedIndex == announcementIndex,
}" :key="announcement">
                    <div class="d-flex justify-content-center">
                        <div class="ratio ratio-16x9" style="max-width: 1000px;">
                            <img :src="announcement.imageUrl" alt="announcement" class="carousel-img" />
                        </div>
                        <div v-if="announcement.targetUrl" class="carousel-caption">
                            <a :href="announcement.targetUrl" class="btn btn-primary"
                                v-text="announcement.buttonTitle"></a>
                        </div>
                    </div>
                </div>
            </div>
            <a v-if="selectedIndex != 0" class="carousel-control-prev" href="#carouselExampleControls" role="button"
                @click="carouselLeft()">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Geri</span>
            </a>
            <a v-if="selectedIndex != announcements.length - 1" class="carousel-control-next"
                href="#carouselExampleControls" role="button" @click="carouselRight()">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">İleri</span>
            </a>
        </div>
        <!-- Carousel -->
    </div>
</template>

<script>
import { Carousel } from 'bootstrap';

export default {
    props: ["unique", "announcements", "interval"],
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
        let c = Carousel.getOrCreateInstance(carousel, {
            interval: this.interval,
            wrap: false
        });
        carousel.addEventListener('slid.bs.carousel', () => {
            document.querySelectorAll(".carousel-item").forEach((e, i) => {
                if (e.classList.contains('active')) {
                    this.selectedIndex = i;
                    if (this.selectedIndex == this.announcements.length - 1) {
                        setTimeout(() => { c.to(0) }, this.interval); // Pause should be applied here, too with mouseenter/leave actions
                    }
                }
            })
        })

    }
};
</script>