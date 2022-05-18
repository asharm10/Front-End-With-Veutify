<template>
    <v-sheet min-height="70vh" rounded="lg">
        <center>
            <h3 class="pa-10">Server Login URL</h3>
            <br/>
            <img class="mb-5" v-bind:src="qrCode"/>
            <p>{{qrCode.substring(62)}}</p>
            <v-btn @click="openQRLink()">DOWNLOAD</v-btn>
        </center>
    </v-sheet>
</template>
<script>
export default {
    name: "QRComponent",
    data() {
        return {
            qrCode: ''
        };
    }, created() {
        this.getQRCode();
    },
    methods: {

        openQRLink(){
            window.open(this.qrCode, '_blank');
        },

        async getQRCode() {
            const restaurantID = localStorage.getItem('restaurantID');
            if (!restaurantID) {
                return;
            }
            this.qrCode = "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=http://localhost:8080/server/signin/"+restaurantID;
        },

    }
}
</script>