<template>
    <v-sheet min-height="70vh" rounded="lg">
        <v-list two-line>
            <v-list-item-group v-model="selected" active-class="pink--text">
                <template v-for="(item, index) in servers">
                    <v-list-item :key="item.username">
                        <template v-slot:default="{ active }">

                            <v-list-item-content v-bind="attrs" v-on="on"
                                @click="showDialog(item.username, item.fullname, item.weeklyHours)">
                                <v-list-item-title v-text="item.fullname"></v-list-item-title>
                                <v-list-item-subtitle class="text--primary" v-text="item.username">
                                </v-list-item-subtitle>
                            </v-list-item-content>



                            <!-- <v-list-item-content>
                          <v-list-item-title v-text="item.fullname"></v-list-item-title>
                          <v-list-item-subtitle class="text--primary" v-text="item.username"></v-list-item-subtitle>
                        </v-list-item-content> -->

                            <v-list-item-action>

                                <v-icon v-if="!active" color="grey lighten-1" @click="remove(item.username)">
                                    mdi-delete-outline
                                </v-icon>

                                <v-icon v-else color="yellow darken-3" @click="remove(item.username)">
                                    mdi-delete
                                </v-icon>
                            </v-list-item-action>
                        </template>
                    </v-list-item>

                    <v-divider v-if="index < servers.length - 1" :key="index"></v-divider>
                </template>
            </v-list-item-group>
        </v-list>
        <v-dialog v-model="dialog2" width="500">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Server Information
                </v-card-title>

                <v-card-text>
                    Full Name : {{ this.dialogFullname }}<br>
                    Username: {{ this.dialogUsername }}<br>
                    Hours Worked: {{ this.dialogWeeklyHours }}
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog2 = false">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-sheet>
</template>
<script>
export default {
    name: "ServerList",
    data() {
        return {
            dialog2: false,
            dialogUsername: '',
            dialogFullname: '',
            dialogWeeklyHours: 10,
            servers: [],
        };
    }, created() {
        this.getServers();
    },
    methods: {
        showDialog(username, fullname, weeklyHours) {
            this.dialogUsername = username;
            this.dialogFullname = fullname;
            this.dialogWeeklyHours = weeklyHours;
            console.log("Hi");
            this.dialog2 = true;
        },
        async getServers() {
            const res = await fetch(
                "http://localhost:5000/admin/servers",
                {
                    method: "GET",
                    credentials: 'include',
                }
            ,);
            let data = await res.json();
            // data=data.success;
            console.log(data);
            this.servers = data.success;
            //this.data=data.success;
        },

        async remove(username) {

            const res = await fetch(
                "http://localhost:5000/admin/servers",
                {
                    method: "DELETE",
                    credentials: 'include',

                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username
                    })
                }
            ,);
            const data = await res.json();
            if (data.status === 200) {
                await this.getServers();
            } else {
                alert("Could not delete the server!")
            }
        },
    }
}
</script>