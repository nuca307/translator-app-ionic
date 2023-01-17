<template>
    <div class="col-12 col-sm-6 col-lg-4 col-xxl-3">
        <div class="card mt-3" style="overflow: hidden;">
            <RouterLink :to="link.url.replace('%data%', data[link.key1] + '/' + data[link.key2])" class="stretched-link">
            </RouterLink>
            <div class="ratio ratio-16x9">
                <img :src="'https://tıktık.com:8443/api' + data[keys[0]]" class="card-img-top" alt="...">
            </div>
            <div class="position-absolute p-1"
                style="border-bottom-right-radius:1rem;background-color:#0d6efddd;color: white;min-width: 8rem;">
                <small class="card-title text-truncate" v-text="data[keys[1]]"></small>
            </div>
            <div class="card-footer position-absolute bottom-0 w-100 p-1"
                style="background: rgba(13, 110, 253, .5);color:white;max-height: 50%;overflow: hidden;">
                <small v-text="data[keys[2]]"></small>
            </div>
        </div>
    </div>
</template>
<script>
import { RouterLink } from 'vue-router';
export default {
    props: ["data", "keys", "link"],
    components: {
        RouterLink
    },
    methods: {
    }
};
</script>