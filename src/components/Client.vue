<template>
    <v-app id="inspire">

        <v-content>
            <Navbar />
            <v-container mt-10>
                <v-layout align-center justify-center>

                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-card-title class="card-title">
                                Need Help?
                            </v-card-title>
                            <v-card-text>


                                <v-card-actions>
                                    <v-col>
                                        <v-btn type="submit" class="mb-5" block color="error" x-large>Order Food
                                        </v-btn>
                                        <v-btn block color="error" class="mb-5" x-large>Call Server</v-btn>
                                        <v-btn block color="error" class="mb-5" x-large>Ask For Bill</v-btn>
                                    </v-col>

                                </v-card-actions>

                                <center>
                                    <v-rating v-model="rating" background-color="warning" color="warning" :length="5"
                                        size="50" value="0" class="ml-6" half-increments hover>
                                    </v-rating>

                                    <v-btn small color="error" @click="postRating()">POST Rating</v-btn>
                                </center>

                            </v-card-text>
                            <v-col col="12">
                                <v-textarea class="ml-2" label="Custom Message" rows="1" prepend-icon="mdi-comment"
                                    append-icon="mdi-send" color="red" auto-grow>

                                </v-textarea>

                            </v-col>

                            <v-col col="12">
                                <v-textarea v-model="feedback" class="ml-2" label="Feedback" rows="1"
                                    prepend-icon="mdi-comment" append-icon="mdi-send" color="red"
                                    @click:append="postFeedback()">

                                </v-textarea>


                            </v-col>
                        </v-card>

                        <!-- <v-textarea label="Default style" value="Learning about textareas at Coding Beauty!"> -->
                        <!-- </v-textarea> -->
                    </v-flex>
                </v-layout>
            </v-container>
            <v-snackbar v-model="snackbar">
                {{ snackbarText }}

                <template v-slot:action="{ attrs }">
                    <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
        </v-content>

    </v-app>
</template>



<style>
.card-title {
    font-family: 'Aclonica', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: xx-large !important;
    font-weight: 75px;
    margin-left: 15%;
}
</style>



<script>
import Navbar from "./Navbar.vue";
export default {
    name: "ClientPage",
    data() {
        return {
            rating: 0,
            restaurantID: this.$route.params.id,
            feedback: '',
            snackbar: false,
            snackbarText: ''
        };
    },
    components: { Navbar },
    methods: {
        async postFeedback() {
            this.snackbar = false;
            if (!this.feedback) {
                this.snackbarText = "Error - Field is Empty";
                this.snackbar = true;
                return;
            } else {
                const res = await fetch("http://localhost:5000/" + this.restaurantID + "/feedback", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        feedback: this.feedback,
                    })
                });
                const data = await res.json();
                if (data.status === 200) {
                    this.snackbarText = "Successfully sent feedback!";
                    this.snackbar = true;
                }
                else {
                    this.snackbarText = "Could not send feedback!";
                    this.snackbar = true;
                }
            }
        },
        async postRating() {
            this.snackbar = false;
            console.log(this.rating);
            if (this.rating === 0) {
                this.snackbarText = "Error - Rating cannot be 0";
                this.snackbar = true;
                return;
            }
            const res = await fetch("http://localhost:5000/" + this.restaurantID + "/rating", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    rating: this.rating,
                })
            });
            const data = await res.json();
            if (data.status === 200) {
                this.snackbarText = "Successfully sent rating!";
                this.snackbar = true;
            }
            else {
                this.snackbarText = "Could not send rating!";
                this.snackbar = true;
            }

        }
    }
}
</script>




