<template>
    <nav class="sticky-top bg-white"
        style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);"
        aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item" v-for="(link, linkIndex) of links" :key="link"
                :class="{ active: linkIndex == links.length - 1 }"
                :aria-current="{ page: linkIndex == links.length - 1 }">
                <RouterLink v-if="linkIndex != links.length - 1" :to="link.to" v-text="link.text"></RouterLink>
                <span v-else v-text="link.text"></span>
            </li>
        </ol>
    </nav>
</template>
<script>
import { RouterLink } from 'vue-router';

export default {
    props: ["links"],
    components: {
        RouterLink,
    },
    methods: {
    }
};
</script>