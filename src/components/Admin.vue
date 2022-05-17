<template>
<v-app id="inspire">
  <!-- <v-app id="inspire">
    <v-app-bar
      app
      color="red"
      flat
    >
    </v-app-bar> -->
      <!-- <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'white' : 'transparent'"
        size="32"
      ></v-avatar>

      <div
        centered
        class="ml-n9"
        color="white"
      >
        <v-tab
        >
          RESPER
        </v-tab>
      </div>
    </v-app-bar> -->

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              <div>
                <b-button @click="logout">Logout</b-button>
              </div>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="8"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
            <div>
                <li v-for="server in servers" v-bind:key="server">{{ server.username }}</li>
            </div>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              <div id="registerServer">
        <form @submit.prevent="register">
            <div>
                <label for="username">email</label>
                <input name="username" v-model="username" placeholder="email">
            </div>
            <div>
                <label for="password">password</label>
                <input name="password" v-model="password" placeholder="password" type="password">
            </div>
                <input type="submit" value="register">
                </form>
            </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
 
<script>
export default {
    name: "AdminPage",
    data() {
        return {
            servers:[]
        }
    },
    created() {
            this.getServers();
    },
    methods: {
        logout() {
            this.$router.push("/signin");
            this.$store.dispatch('setToken', 403)
        },

        async register() {
            const { username, password } = this;
            const res = await fetch(
                "http://localhost:5000/admin/servers",
                {
                    method: "POST",
                    credentials: 'include',

                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            ,);
            const data = await res.json();
            console.log(data);
            // if (data.status == 200){
            //     this.$store.dispatch('setToken', res.status)
            //     this.$router.push("/admin");
            // }
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
            this.servers= data.success;
            //this.data=data.success;
        }
    }
}
</script>
