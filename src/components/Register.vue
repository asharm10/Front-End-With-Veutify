<template>
  <div>
    <h1>Register Page</h1>
    <div id="register">
    <form @submit.prevent="register">
      <div>
        <label for="username">email</label>
        <input name="username" v-model="username" placeholder="email">
      </div>
      <div>
        <label for="password">password</label>
        <input name="password" v-model="password" placeholder="password" type="password">
      </div>
      <div>
        <label for="firstName">first name</label>
        <input name="firstName" v-model="firstName" placeholder="first name">
      </div>
      <div>
        <label for="lastName">last name</label>
        <input name="lastName" v-model="lastName" placeholder="last name">
      </div>
      <div>
        <label for="restaurantName">Restaurant Name</label>
        <input name="restaurantName" v-model="restaurantName" placeholder="Restaurant Name">
      </div>
      <input type="submit" value="register">
    </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RegisterName",
    data() {
      return {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        restaurantName:""
      };
    },
    methods: {
        async register() {
            const { username, password, firstName, lastName,restaurantName } = this;
            const res = await fetch(
                "http://localhost:5000/admin/register",
                {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password,
                    firstName,
                    lastName,
                    restaurantName
                })
                }
            );
            const data = await res.json();
            console.log(data);
            if (data.status == 200){
                this.$router.push("/signin");
            }
            }
        }
    };
</script>

<style>
    body {
        background-color: #F0F0F0;
    }
    h1 {
        padding: 0;
        margin-top: 0;
    }
    #app {
        width: 1024px;
        margin: auto;
    }
</style>