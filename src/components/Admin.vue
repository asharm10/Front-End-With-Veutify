<template>
  <v-app id="inspire">
    <v-app-bar color="red" class="flex-grow-0" app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer />
      <v-app-bar-title class="nav-title">RESPER</v-app-bar-title>
      <v-spacer />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app class="pt-4" color="grey lighten-3">
      <v-list>
        <v-list-item v-for="([icon, text], i) in items" :key="i" link>
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

          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
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
      </template>
    </v-navigation-drawer>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="8">
            <v-sheet min-height="70vh" rounded="lg">
              <div>
                <li v-for="server in servers" v-bind:key="server">{{ server.username }}</li>
              </div>

            </v-sheet>
          </v-col>

          <v-col cols="12" sm="3">
            <v-sheet rounded="lg" min-height="268">

              <v-layout align-center justify-center>
                <v-card class="elevation-0">
                  <v-card-title>
                    Add a new Server
                  </v-card-title>
                  <v-card-text>
                    <v-form @submit.prevent="register">
                      <v-text-field name="Full Name" v-model="fullname" label="Full Name" type="text"></v-text-field>
                      <v-text-field name="username" v-model="username" label="Username" type="text"></v-text-field>
                      <v-text-field id="password" name="password" v-model="password" label="Password" type="password">
                      </v-text-field>
                      <v-card-actions>
                        <v-col>
                          <v-btn type="submit" class="mb-5" block color="error">Add Server</v-btn>
                        </v-col>
                      </v-card-actions>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-layout>
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
      dialog: false,
      drawer: false,
      servers: [],
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
    logout(e) {
      e.preventDefault();
      this.dialog = false;
      this.$store.dispatch('setToken', 403)
      this.$router.back();
    },

    async register() {
      const { fullname, username, password } = this;
      if(! (fullname && username && password)){
        alert("Empty fields");
        return;
      }
      const res = await fetch(
        "http://localhost:5000/admin/servers",
        {
          method: "POST",
          credentials: 'include',

          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fullname,
            username,
            password
          })
        }
            ,);
      const data = await res.json();
      if (data.status === 200) {
        await this.getServers();
      }else{
        alert("Server with that username already exists")
      }
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
      this.servers = data.success;
      //this.data=data.success;
    }
  }
}
</script>
