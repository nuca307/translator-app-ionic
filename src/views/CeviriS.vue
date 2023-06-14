<template>
    <div class="container" style="position: relative;height: 100%;">
        <h5 class="text-center mt-4 mb-5" style="font-weight:bold; margin:50px auto">Çeviri</h5>
        <div class="d-flex justify-content-center" style="flex-direction: column; margin:10px">
            <div style="position: relative;">
                <div style="position: absolute; top:1rem; left: 1rem;">
                    <i class="fa-solid fa-volume-high"></i> İngilizce
                </div>
                <textarea class="textarea1" cols="35" rows="5" placeholder="Metni Girin" v-model="searchText"
                    @change="translateText()"></textarea>
                <div style="position: absolute; bottom:1rem; right: 1rem;" @click="startListening()">
                    <i class="fa-solid fa-microphone  p-3"></i>
                </div>
            </div>
            <hr>
            <div style="position: relative;">
                <div style="position: absolute; top:1rem; left: 1rem;">
                    <i class="fa-solid fa-volume-high"></i> Türkçe
                </div>
                <textarea class="textarea2" cols="35" rows="5" placeholder="Metni Girin" v-model="translation" readonly></textarea>
                <!--div-- style="position: absolute; bottom:1rem; right: 1rem;">
                    <i class="fa-solid fa-microphone"></i>
                </!--div-->
            </div>

        </div>
        <footer class="footer">
            <div class="home" @click="goHome()" style="color: #6e4fad">
                <i class="fa-solid fa-house fa-lg"></i>
                <h6>Home</h6>
            </div>

            <div class="profil" @click="goProfil()">
                <i class="fa-solid fa-user fa-lg" style=""></i>
                <h6 style="">Profil</h6>
            </div>
        </footer>
    </div>
</template>

<script>
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import translate from 'google-translate-api-browser';
export default {
    data() {
        return {
            searchText: "",
            translation: "",
            recognizedText: '',
        }
    },
    methods: {
        async startListening() {
            if (Capacitor.getPlatform() !== 'web') {

                try {
                    const result = await SpeechRecognition.start({
                        language: "en-US",
                        maxResults: 1,
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
                    this.searchText = result.matches[0] || 'Bulunamadı';

                    this.$nextTick().then(() => {
                        this.translateText();
                    });
                } catch (error) {
                    console.error(error);
                }  // Plugin'i kullan
            } else {
                alert("Bu özellik webde kulanılmaz")
            }
        },
        translateText() {
            this.translation = "";
            fetch("https://algoritimbilisim.com/api/translate/" + this.searchText)
                .then(response => response.json())
                .then((result) => {
                    let ceviriler = result[0];
                    ceviriler.forEach(ceviri => {
                        this.translation += ceviri[0] ? ceviri[0] : "";
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        goHome() {
            this.$router.push("/diller")
        },

        goProfil() {
            this.$router.push("/profil")
        }
    },
    mounted() {
        if (Capacitor.getPlatform() !== 'web') {
            SpeechRecognition.requestPermissions();
        }
    }
}
</script>