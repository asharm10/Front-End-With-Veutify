<template>
    <v-app id="inspire">
        <v-app-bar color="error" class="flex-grow-0" app dark>
            <v-spacer />
            <v-toolbar-title class="nav-title">RESPER</v-toolbar-title>
            <v-spacer />
        </v-app-bar>
        <v-main class="grey lighten-3">
            <v-container>
                <v-row>
                    <v-col cols="12" sm="9">
                        <v-sheet min-height="70vh" rounded="lg">
                            <!--  -->
                        </v-sheet>
                    </v-col>

                    <v-col cols="12" sm="3">
                        <v-sheet rounded="lg" min-height="430">
                            <div class="pa-2">
                                <center>
                                    Hi, <b>{{ fullname }}</b>!

                                </center>
                            </div>
                            <!-- first button -->
                            <div class="pa-2">

                                <v-dialog v-model="dialog" width="500">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="teal lighten-2" dark block v-bind="attrs" v-on="on">
                                            Log Out
                                        </v-btn>
                                    </template>

                                    <v-card>
                                        <v-card-title class="text-h5 grey lighten-2">
                                            LOGOUT
                                        </v-card-title>

                                        <v-card-text>
                                            Are you sure you want to Logout?
                                        </v-card-text>

                                        <v-divider></v-divider>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="primary" text @click="logout">
                                                Yes
                                            </v-btn>
                                            <v-btn color="primary" text @click="dialog = false">
                                                No
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </div>
                            <!-- second button -->
                            <div class="pa-2">

                                <v-dialog v-model="dialog2" width="500">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="teal lighten-2" dark block v-bind="attrs" v-on="on">
                                            {{ checkIn }}
                                        </v-btn>
                                    </template>

                                    <v-card>
                                        <v-card-title class="text-h5 grey lighten-2">
                                            {{ checkIn }}
                                        </v-card-title>

                                        <v-card-text>
                                            {{ message }}
                                        </v-card-text>

                                        <v-divider></v-divider>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="primary" text @click="checkInorOut(checkIn)">
                                                Yes
                                            </v-btn>
                                            <v-btn color="primary" text @click="dialog2 = false">
                                                No
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </div>
                            <!-- third -->
                            <div class="pa-2">

                                <v-dialog v-model="dialog3" width="500">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="teal lighten-2" dark block v-bind="attrs" v-on="on">
                                            Log Out
                                        </v-btn>
                                    </template>

                                    <v-card>
                                        <v-card-title class="text-h5 grey lighten-2">
                                            LOGOUT
                                        </v-card-title>

                                        <v-card-text>
                                            Are you sure you want to Logout?
                                        </v-card-text>

                                        <v-divider></v-divider>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="primary" text @click="logout">
                                                Yes
                                            </v-btn>
                                            <v-btn color="primary" text @click="dialog3 = false">
                                                No
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </div>

                        </v-sheet>
                    </v-col>
                </v-row>
                <v-snackbar v-model="snackbar">
                    {{ snackbarText }}

                    <template v-slot:action="{ attrs }">
                        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                            Close
                        </v-btn>
                    </template>
                </v-snackbar>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
//import Navbar from "./Navbar.vue";
export default {
    name: "ServerPage",
    data() {
        return {
            dialog: false,
            dialog2: false,
            dialog3: false,
            checkIn: this.checkIn,
            message: this.message,
            token: this.token,
            snackbar: false,
            fullname: '',
            username: '',
            snackbarText: '',
        };
    },
    created() {
        this.token = localStorage.getItem('token');
        this.fullname = localStorage.getItem('fullname');
        this.username = localStorage.getItem('username');
        console.log(this.token);
        if (!localStorage.getItem("checkIn")) {
            this.checkIn = "Check In"
            this.message = "Do you want to check in?"
            localStorage.setItem('checkIn', this.checkIn)
        }
        else {
            this.checkIn = localStorage.getItem("checkIn")
            if (this.checkIn === "Check In") {
                this.message = "Do you want to check in?"
            }
            else if (this.checkIn === "Check Out") {
                this.message = "Do you want to check out?"
            }
        }
    }
    ,
    methods: {
        async logout(e) {
            e.preventDefault();
            if (localStorage.getItem('token')) {
                await localStorage.removeItem('token');
            }

            if (localStorage.getItem('username')) {
                await localStorage.removeItem('username');
            }

            if (localStorage.getItem('fullname')) {
                await localStorage.removeItem('fullname')
            }

            this.dialog = false;
            this.$store.dispatch("setServerToken", 403);
            this.$router.back();
        },
        async checkInorOut(checkIn) {
            const { token } = this
            console.log(this.$route.params.id)
            if (checkIn === "Check In") {

                const res = await fetch("http://localhost:5000/" + this.$route.params.id + "/server/checkin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        token
                    })
                });
                const data = await res.json();
                console.log(data)
                if (data.success || data.status === 404) {
                    this.checkIn = "Check Out"
                    this.message = "Do you want to check out?"
                    localStorage.setItem('checkIn', this.checkIn)
                    if (data.success) {
                        this.snackbarText = "Checked in Successfully"
                    }
                    else if (data.status === 404) {
                        this.snackbarText = "Already Checked In"
                    }
                    this.snackbar = true
                }
                else {
                    this.snackbarText = "Error checking in"
                    this.snackbar = true;
                }


            }
            else if (checkIn === "Check Out") {
                const res = await fetch("http://localhost:5000/" + this.$route.params.id + "/server/checkout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        token
                    })
                });
                const data = await res.json();
                console.log(data)
                if (data.status === 200 || data.status === 404) {
                    this.checkIn = "Check In"
                    this.message = "Do you want to check in?"
                    localStorage.setItem('checkIn', this.checkIn)
                    if (data.status === 200) {
                        this.snackbarText = "Checked out Successfully"
                    }
                    else if (data.status === 404) {
                        this.snackbarText = "You are not checked In"
                    }
                    this.snackbar = true
                }
                else {
                    this.snackbarText = "Error checking out"
                    this.snackbar = true;
                }

            }
            this.dialog2 = false;

        }
    }

};

</script>
