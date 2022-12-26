<template>
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
        <div class="card mt-3" style="overflow: hidden;">
            <RouterLink :to="link.url.replace('%data%', data[link.key])" class="stretched-link"></RouterLink>
            <div class="ratio ratio-16x9">
                <img :src="'http://localhost:8080' + data[keys[0]]" class="card-img-top" alt="...">
            </div>
            <div class="position-absolute p-1"
                style="border-bottom-right-radius:1rem;background-color:#0d6efddd;color: white;min-width: 8rem;">
                <strong class="card-title text-truncate" v-text="data[keys[1]]"></strong>
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