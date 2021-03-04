<template>
  <div class="container">
        <link href='https://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>
        <form action="#" method="post" name="sign up for beta form">
          <div class="header">
            <p>Sign Up</p>
          </div>
          <div class="description">
            <p>Registration will access you to additional features!</p>
          </div>
          <div class="input">
            <input type="text" class="button" ref="email" id="email" name="email" placeholder="NAME@EXAMPLE.COM">
            <input type="text" class="button" ref="username" id="username" name="username" placeholder="USERNAME">
            <router-link to="/" tag="div">
              <input v-on:click="setCurrentUserEmail" type="submit" class="button" id="submit" value="SIGN UP">
            </router-link>
          </div>
      </form>
  </div>
</template>

<script>
export default {
  name: 'Registration',
  data () {
    return {
      formData: {
        Email: ''
      }
    }
  },
  methods: {
    setCurrentUserEmail: function () {
      this.$store.state.users.push(this.$refs.email.value)
      this.$store.state.userName = this.$refs.username.value
      this.$store.commit('setEmail', this.$refs.email.value)
    }
  }
}
</script>

<style scoped>

body {
  background: #F8A434;
  font-family: 'Lato', sans-serif;
  color: #FDFCFB;
  text-align: center;
}

form {
  width: 450px;
  margin: 17% auto;
}

.header {
  font-size: 35px;
  text-transform: uppercase;
  letter-spacing: 5px;
}

.description {
  font-size: 14px;
  letter-spacing: 1px;
  line-height: 1.3em;
  margin: -2px 0 25px;
}

.input {
  align-items: center;
}
.container {
  display: flex;
  flex-direction: column;
}

.button {
  height: 44px;
  border: none;
}
#username {
  width: 75%;
  background: #FDFCFB;
  font-family: inherit;
  color: #737373;
  letter-spacing: 1px;
  text-indent: 5%;
  border-radius: 5px 0 0 5px;
  margin-bottom: 10px;
}
#email {
  width: 75%;
  background: #FDFCFB;
  font-family: inherit;
  color: #737373;
  letter-spacing: 1px;
  text-indent: 5%;
  border-radius: 5px 0 0 5px;
  margin-bottom: 10px;
}

#submit {
  width: 75%;
  height: 46px;
  background: #E86C8D;
  font-family: inherit;
  font-weight: bold;
  color: inherit;
  letter-spacing: 1px;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: background .3s ease-in-out;
}

#submit:hover {
  background: #d45d7d;
}

input:focus {
  outline: none;
  outline: 2px solid #E86C8D;
  box-shadow: 0 0 2px #E86C8D;
}
</style>
