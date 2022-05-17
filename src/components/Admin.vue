<template>
<v-app id="inspire">
  <v-app-bar color="red" class="flex-grow-0" app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>RESPER</v-app-bar-title>
    </v-app-bar>
     <v-navigation-drawer
      v-model="drawer"
      app
      class="pt-4"
      color="grey lighten-3"
    >
      <v-list>
        <v-list-item
          v-for="([icon, text], i) in items"
          :key="i"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          
          <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        </div>
      </template>
    </v-navigation-drawer> 

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
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
            sm="3"
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
          drawer: false,
            servers:[],
            items: [
        ['mdi-email', 'Inbox'],
        ['mdi-account-supervisor-circle', 'Supervisors'],
        ['mdi-clock-start', 'Logout'],]        
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
