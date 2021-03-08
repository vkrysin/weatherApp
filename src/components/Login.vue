<template>
  <div class="container">
        <link href='https://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>
        <form action="#" method="post" name="sign up for beta form">
          <div class="header">
            <p>Sign In</p>
          </div>
          <div v-if="errorSignIn" class="wrong-data">Falied to sign-In. Invalid email or user name</div>
          <input type="text" ref="email" class="button" id="email" name="email" placeholder="Enter your email" autocomplete="off">
          <input type="text" ref="username" class="button" id="email" name="username" placeholder="Enter your username" autocomplete="off">
          <input type="button" class="button" id="submit" value="SIGN IN" @click="findEmailInBase">
       </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      formData: {
        Email: ''
      },
      errorSignIn: false
    }
  },
  methods: {
    findEmailInBase () {
      let email = this.$refs.email.value
      let name = this.$refs.username.value
      // delete null object
      this.$store.state.users = this.$store.state.users.filter(el => el !== null)

      let isUserContainsInBase = this.$store.state.users.filter(element => {
        return element.userName === name
      })
      if (isUserContainsInBase.length > 0) {
        this.$store.state.userEmail = email
        this.$store.state.userName = name
        this.$router.push({ path: '/' })
        this.errorSignIn = false
      } else {
        this.errorSignIn = true
      }
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
  margin-bottom: 5px;
}
.container {
  display: flex;
  flex-direction: column;
}
.wrong-data {
  width: fit-content;
  background-color: red;
}
.button {
  height: 44px;
  border: none;
}

#email {
  width: 75%;
  background: #FDFCFB;
  font-family: inherit;
  color: #737373;
  letter-spacing: 1px;
  text-indent: 5%;
  border-radius: 5px 0 0 5px;
  margin-bottom: 5px;
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
