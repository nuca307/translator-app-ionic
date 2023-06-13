<template>
    <main-layout pageIndex="3">
        <div class="content" style="height: 100vh;">
            <ion-content class="ion-padding">
                <ion-button @click="startListening">Start Listening</ion-button>
                <ion-button @click="stopListening">Stop Listening</ion-button>

                <ion-card>
                    <ion-card-content>
                        <p>{{ recognizedText }}</p>
                    </ion-card-content>
                </ion-card>
            </ion-content>
        </div>
    </main-layout>
</template>
  
<script>
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import MainLayout from '../layouts/MainLayout.vue';
import CeviriS from '../views/CeviriS.vue';

import { IonContent, IonCard, IonCardContent, IonButton } from "@ionic/vue";

export default {
    components: {
        MainLayout,
        CeviriS,
        IonContent, IonCard, IonCardContent, IonButton
    },
    data() {
        return {
            recognizedText: '',
        };
    },
    methods: {
        async startListening() {
            try {
                const result = await SpeechRecognition.start({
                    language: "en-US",
                    maxResults: 2,
                    prompt: "Say something",
                    partialResults: true,
                    popup: true,
                });
                /*this.recognizedText += JSON.stringify(result);
                this.recognizedText += result.partialResults
                // listen to partial results
                SpeechRecognition.addListener("partialResults", (data) => {
                    this.recognizedText = data.matches;
                });*/
                this.recognizedText = result.matches[0] || 's';
            } catch (error) {
                console.error(error);
            }
        },
        async stopListening() {
            try {
                await SpeechRecognition.stop();
                console.log('Stopped listening');
            } catch (error) {
                console.error(error);
            }
        },
    },
    mounted() {
        SpeechRecognition.requestPermissions();
    }
};
</script>
