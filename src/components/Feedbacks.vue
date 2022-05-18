<template>
    <v-sheet min-height="70vh" rounded="lg">
        <center>
            <h2 class="pt-8">Feedbacks</h2>

        </center>
        <h5 class="pa-5">Average Rating: {{ rating }}</h5>
        <v-list two-line>
            <v-list-item-group v-model="selected" active-class="pink--text">
                <template v-for="(item, index) in feedbacks">
                    <v-list-item :key="item.feedback">
                        <template v-slot:default="{ active }">

                            <v-list-item-content v-bind="attrs" v-on="on">
                                <v-list-item-title v-text="item.feedback"></v-list-item-title>
                                <v-list-item-subtitle class="text--primary" v-text="item.date">
                                </v-list-item-subtitle>
                            </v-list-item-content>



                            <!-- <v-list-item-content>
                          <v-list-item-title v-text="item.fullname"></v-list-item-title>
                          <v-list-item-subtitle class="text--primary" v-text="item.username"></v-list-item-subtitle>
                        </v-list-item-content> -->

                            <v-list-item-action>

                                <v-icon v-if="!active" color="grey lighten-1" @click="remove(item._id)">
                                    mdi-delete-outline
                                </v-icon>

                                <v-icon v-else color="yellow darken-3" @click="remove(item._id)">
                                    mdi-delete
                                </v-icon>
                            </v-list-item-action>
                        </template>
                    </v-list-item>

                    <v-divider v-if="index < feedbacks.length - 1" :key="index"></v-divider>
                </template>
            </v-list-item-group>
        </v-list>
    </v-sheet>
</template>
<script>
export default {
    name: "FeedbackList",
    data() {
        return {
            feedbacks: [],
            rating: 0,
        };
    }, created() {
        this.getFeedbacks();
        this.calculateRating();
    },
    methods: {

        async getFeedbacks() {
            const res = await fetch(
                "http://localhost:5000/admin/feedbacks",
                {
                    method: "GET",
                    credentials: 'include',
                }
            ,);
            let data = await res.json();
            // data=data.success;
            console.log(data);
            this.feedbacks = data.success;
            //this.data=data.success;
        },

        async calculateRating() {
            const res = await fetch(
                "http://localhost:5000/admin/ratings",
                {
                    method: "GET",
                    credentials: 'include',

                    headers: {
                        "Content-Type": "application/json"
                    },
                }
            ,);
            const data = await res.json();
            let sum = 0;
            data.success.forEach(element => {
                sum += element.rating;
            });
            this.rating = sum / data.success.length;
            console.log(sum);
            
        },

        async remove(id) {

            const res = await fetch(
                "http://localhost:5000/admin/feedbacks",
                {
                    method: "DELETE",
                    credentials: 'include',

                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id
                    })
                }
            ,);
            const data = await res.json();
            if (data.status === 200) {
                await this.getFeedbacks();
            } else {
                alert("Could not delete the feedback!")
            }
        },
    }
}
</script>