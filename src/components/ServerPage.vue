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
                <v-col
                    cols="12"
                    sm="9"
                >
                    <v-sheet
                    min-height="70vh"
                    rounded="lg"
                    >
                    <!--  -->
                    <center>
                        <h2 class="pt-8">Requests</h2>
                    </center>

                    <v-list three-line>
                        <template v-for="(item, index) in items2">

                            <v-divider
                            :key="index"
                            ></v-divider>

                            <v-list-item
                            :key="item.text"
                            >

                            <v-list-item-content>
                                <v-list-item-title v-html="item.text"></v-list-item-title>
                                <v-list-item-subtitle v-html="item.table"></v-list-item-subtitle>
                            </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list>
                    </v-sheet>
                </v-col>

                <v-col
                    cols="12"
                    sm="3"
                >
                    <v-sheet
                    rounded="lg"
                    min-height="430"
                    >
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
                                    {{checkIn}}
                                </v-btn>
                                </template>

                                <v-card>
                                <v-card-title class="text-h5 grey lighten-2">
                                    {{checkIn}}
                                </v-card-title>

                                <v-card-text>
                                    {{message}}
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

                            <v-dialog v-model="dialog4" width="500">
                                <template v-slot:activator="{ on, attrs }">
                                <v-btn color="teal lighten-2" dark block v-bind="attrs" v-on="on">
                                    Add Table
                                </v-btn>
                                </template>

                                <v-card>
                                <v-card-title class="text-h5 grey lighten-2">
                                    Add Table
                                </v-card-title>

                                <v-card-text>
                                    Select your Tables:
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" text @click="dialog4=false">
                                    Add Tables
                                    </v-btn>
                                    <v-btn color="primary" text @click="dialog4 = false">
                                    Close
                                    </v-btn>
                                </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </div>
                        <v-card
                            class="elevation-0"
                            max-width="300"
                            tile
                        >
                            <v-list rounded>
                            <v-subheader>Tables Selected</v-subheader>
                            <v-list-item-group
                                v-model="selectedItem"
                                color="primary"
                            >
                                <v-list-item
                                v-for="(item, i) in items"
                                :key="i"
                                >
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.text"></v-list-item-title>
                                </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                            </v-list>
                        </v-card>

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
            dialog2:false,
            dialog3:false,
            dialog4:false,
            checkIn:this.checkIn,
            message:this.message,
            token:this.token,
            snackbar: false,
            snackbarText: '',

            selectedItem: 1,
            items: [
                { text: 'Table 1'},
                { text: 'Table 2'},
                { text: 'Table 3'},
            ],

            items2: [{text:'Order Food', table:'Table 2'},{text:'Ask for bill', table:'Table 1'},{text:'Call Server', table:'Table 3'}],
        };
    },
    created() {
        this.token=localStorage.getItem('token')
        console.log(this.token);
        if(!localStorage.getItem("checkIn")){
            this.checkIn="Check In"
            this.message="Do you want to check in?"
            localStorage.setItem('checkIn',this.checkIn)
        }
        else{
            this.checkIn=localStorage.getItem("checkIn")
            if(this.checkIn==="Check In"){
                this.message="Do you want to check in?"
            }
            else if(this.checkIn==="Check Out"){
                this.message="Do you want to check out?"
            }
        }
    }
    ,
    methods:{
        logout(e) {
            e.preventDefault();
            if(localStorage.getItem('token')){
                localStorage.removeItem('token');
            }
            this.dialog = false;
            this.$store.dispatch("setServerToken", 403);
            this.$router.back();
        },
        async checkInorOut(checkIn){
            const {token} = this
            console.log(this.$route.params.id)
            if(checkIn==="Check In"){

                const res = await fetch("http://localhost:5000/"+this.$route.params.id+"/server/checkin", {
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
                if (data.success || data.status===404){
                    this.checkIn="Check Out"
                    this.message="Do you want to check out?"
                    localStorage.setItem('checkIn',this.checkIn)
                    if(data.success){
                        this.snackbarText="Checked in Successfully"
                    }
                    else if(data.status===404){
                        this.snackbarText="Already Checked In"
                    }
                    this.snackbar=true
                }
                else{
                    this.snackbarText="Error checking in"
                    this.snackbar=true;
                }

                
            }
            else if(checkIn==="Check Out"){
                const res = await fetch("http://localhost:5000/"+this.$route.params.id+"/server/checkout", {
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
                if(data.status===200 || data.status===404){
                    this.checkIn="Check In"
                    this.message="Do you want to check in?"
                    localStorage.setItem('checkIn',this.checkIn)
                    if(data.status===200){
                        this.snackbarText="Checked out Successfully"
                    }
                    else if(data.status===404){
                        this.snackbarText="You are not checked In"
                    }
                    this.snackbar=true
                }
                else{
                    this.snackbarText="Error checking out"
                    this.snackbar=true;
                }
                    
            }
            this.dialog2=false;
            
        }
    }    

};

</script>
