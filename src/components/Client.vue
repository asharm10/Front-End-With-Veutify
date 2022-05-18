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

                                <v-rating v-model="rating" background-color="warning" color="warning" :length="5"
                                    size="50" value="3.5" class="ml-6" half-increments hover>
                                </v-rating>

                            </v-card-text>
                            <v-col col="12">
                                <v-textarea class="ml-2" value="Custom Message" rows="1" prepend-icon="mdi-comment"
                                    color="red" auto-grow>

                                </v-textarea>
                                <v-col class="text-right">
                                    <v-btn color="error" class="mt-5" small>Submit</v-btn>
                                </v-col>
                            </v-col>

                            <v-col col="12">
                                <v-textarea class="ml-2" value="Feedback" rows="1" prepend-icon="mdi-comment"
                                    color="red" auto-grow>

                                </v-textarea>
                                <v-col class="text-right">
                                    <v-btn color="error" class="mt-5" small>Submit</v-btn>
                                </v-col>

                            </v-col>
                        </v-card>

                        <!-- <v-textarea label="Default style" value="Learning about textareas at Coding Beauty!"> -->
                        <!-- </v-textarea> -->
                    </v-flex>
                </v-layout>
            </v-container>
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

        };
    },
    components: { Navbar }
}
</script>




