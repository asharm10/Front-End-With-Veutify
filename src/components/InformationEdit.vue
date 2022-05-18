<template>
    <v-sheet min-height="70vh" rounded="lg">
        <h2>Restaurant Information</h2>
        <div>Restaurant Name: {{this.restaurantName}}</div>
        <div>Resturant ID: {{this.restaurantID}}</div>
        <div>Table Number: {{this.tableNumber}}</div>
        <v-textarea class="ml-2" label="Update Restaurant Name" rows="1" prepend-icon="mdi-comment"
            color="red" auto-grow v-model="updatedName">
        </v-textarea>
        <v-btn color="error" class="mt-5" small @click="updateName()">Submit</v-btn>
        <v-textarea class="ml-2" label="Update Restaurant Name" rows="1" prepend-icon="mdi-comment"
            color="red" auto-grow v-model="updatedTableNumber">
        </v-textarea>
        <v-btn color="error" class="mt-5" small @click="updateTable()">Submit</v-btn>
                
    </v-sheet>
</template>
<script>
export default {
    name: "InformationEdit",
    data() {
        return {
            title: 'Current Resturant Name:',
            restaurantName:'',
            restaurantID:'',
            tableNumber:0,
            updatedName:'',
            updateTableNumber:0
        };
    },

    created() {
        this.getInformation();
    },
    methods:{
        async getInformation() {
            const res = await fetch(
                "http://localhost:5000/admin/restaurantInfo",
                {
                    method: "GET",
                    credentials: 'include',
                }
            ,);
            let data = await res.json();
            console.log(data);
            this.restaurantID = data.restaurantID;
            this.restaurantName = data.restaurantName;
            this.tableNumber = data.tableNumber;
        },

        async updateName(){
            const res = await fetch("http://localhost:5000/admin/restaurantName", {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
            "restaurantName": this.updatedName
            })
        });
        const data = await res.json();
        console.log(data);
        if (data.status == 200) {
            this.restaurantName=this.updatedName;
        }
        else {
            alert("Error");
        }},
        async updateTable(){
            const res = await fetch("http://localhost:5000/admin/tables", {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
            "tableNumber": this.updatedTableNumber
            })
        });
        const data = await res.json();
        console.log(data);
        if (data.status == 200) {
            this.tableNumber=this.updatedTableNumber;
        }
        else {
            alert("Error");
        }
        }
    }

            
    
}
</script>
