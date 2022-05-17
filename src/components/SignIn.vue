<template>
  <v-app>
    <v-content>
      <v-card width="400" class="mx-auto mt-9">
      <v-card-title>
        Login
      </v-card-title>
        <form @submit.prevent="signIn">
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
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async signIn() {
      const { username, password } = this;
      const res = await fetch(
        "http://localhost:5000/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: 'include',
          body: JSON.stringify({
            username,
            password
          })
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.status == 200) {
        this.$store.dispatch('setToken', res.status)
        this.$router.push("/admin");
      }
    }
  }
};
</script>