<template>
    <ion-page class="container-fluid"
        style="overflow:auto;max-height: 100vh;min-height: 100vh;margin-top: constant(safe-area-inset-top) !important;margin-top: env(safe-area-inset-top) !important;">
        <slot />
    </ion-page>
</template>
  
<script>
import { IonPage } from "@ionic/vue";

export default {
    props: ["pageIndex"],
    components: {
        IonPage,
    },

};

</script>


<style>
@font-face {
    font-family: 'Ata Rounded 65';
    src: url('../fonts/subset-Ata-Rounded-65-Medium.woff2') format('woff2'),
        url('../fonts/subset-Ata-Rounded-65-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

body {
    background: rgb(11, 15, 27);
    background: -moz-linear-gradient(0deg, rgba(11, 15, 27, 1) 0%, rgba(19, 24, 43, 1) 57%, rgba(36, 44, 77, 1) 100%);
    background: -webkit-linear-gradient(0deg, rgba(11, 15, 27, 1) 0%, rgba(19, 24, 43, 1) 57%, rgba(36, 44, 77, 1) 100%);
    background: linear-gradient(0deg, rgba(11, 15, 27, 1) 0%, rgba(19, 24, 43, 1) 57%, rgba(36, 44, 77, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0b0f1b", endColorstr="#242c4d", GradientType=1);
    height: 100vh;
    color: white;
}


.container {}

.form-control::placeholder {
    color: white;
    opacity: 1;
}

.form-control {
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 2.5;
    color: var(--bs-body-color);
    background-color: #14192d;
    background-clip: padding-box;
    border: var(--bs-border-width) solid #6e4fad;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 15px;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    color: white;
}

.btn-outline-light {
    --bs-btn-color: #adb0b3;
    --bs-btn-border-color: #6e4fad;
    --bs-btn-hover-color: #000;
    --bs-btn-hover-bg: #6e4fad;
    --bs-btn-hover-border-color: #6e4fad;
    --bs-btn-focus-shadow-rgb: 248, 249, 250;
    --bs-btn-active-color: #000;
    --bs-btn-active-bg: #6e4fad;
    --bs-btn-active-border-color: #6e4fad;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #6e4fad;
    --bs-btn-disabled-bg: transparent;
    --bs-btn-disabled-border-color: #6e4fad;
    --bs-gradient: none;
    border-radius: 15px;
}

.ana-baslik-main {
    margin-top: 80px;
    margin-bottom: 80px;
}

.ana-baslik {
    font-family: 'Ata Rounded 65';
}

.buyuk {
    font-size: calc(3.5rem);
}

.kucuk {
    font-size: calc(1.5rem);
}

.textarea1 {
    border-radius: 10px 10px 0px 0px;
    background: #0c0f1e;
    border: hidden;
    color: white;
}

.textarea2 {
    border-radius: 0px 0px 10px 10px;
    background: #0c0f1e;
    border: hidden;
    color: white;
}

hr {
    margin: 0;
    opacity: 1;
    color: #6e4fad;
}

footer {
    background: #000;
    height: 5rem;
    position: absolute;
    bottom: 0rem;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    left: 0;
}

.home,
.profil {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;
}

.home i,
.profil i {
    height: 1rem;
}

.form-floating>.form-control-plaintext~label::after,
.form-floating>.form-control:focus~label::after,
.form-floating>.form-control:not(:placeholder-shown)~label::after,
.form-floating>.form-select~label::after {
    position: absolute;
    inset: 1rem 0.375rem;
    z-index: -1;
    height: 1.5em;
    content: "";
    background-color: #14192d;
    border-radius: var(--bs-border-radius);
}

.form-floating>.form-control-plaintext~label,
.form-floating>.form-control:focus~label,
.form-floating>.form-control:not(:placeholder-shown)~label,
.form-floating>.form-select~label {
    color: white;
}

.geri-btn {
    background-color: transparent;
    color: white;
    border: none;
    font-size: 30px;
    margin-right: 70px;
    height: 115px;
}

.form-control:focus {
    color: white;
    background-color: #14192d;
}

.form-control:disabled {
    background-color: #14192d;
}

textarea {
    padding: 1rem;
    padding-top: 3rem;
    width: 100%;
}
</style>