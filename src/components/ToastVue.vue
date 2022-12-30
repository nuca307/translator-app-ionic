<template>
    <div class="toast-container bottom-0 start-50 translate-middle-x" z-index="2000">
        <div class="toast fade hide" :class="toast.class" role="alert" aria-live="assertive" aria-atomic="true"
            id="toast_alert">
            <div class="toast-header">
                <strong class="me-auto" v-text="toast.header"></strong>
                <small v-text="timeElapsed + ' sn'"></small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body" v-text="toast.message">

            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["toast"],
    data() {
        return {
            timeElapsed: 0,
            interval: undefined
        }
    },
    updated() {
        if (this.toast.time) {
            if (this.interval) {
                clearInterval(this.interval);
            }
            this.interval = setInterval(() => { this.timeElapsed = parseInt((new Date().getTime() - this.toast.time.getTime()) / 1000) }, 1000);
        }
    }
}
</script>