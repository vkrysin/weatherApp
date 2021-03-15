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
          <div v-if="isEmailInBase" class="wrong-data">The user with email {{email}} has already been registered</div>
          <div v-if="isUserEmailIncorrect && this.email !== ''" class="wrong-data">Please, enter correct email.</div>
          <div class="input">
            <input v-model="email" type="text" class="button" ref="email" id="email" name="email"
               placeholder="NAME@EXAMPLE.COM" autocomplete="off">
            <input v-model="userName" type="text" class="button" ref="username" id="username" name="username"
             placeholder="USERNAME" autocomplete="off" maxlength="14">
            <router-link v-if="isUserDataCorrect" to='/' tag="div">
              <input v-on:click="signUp" type="submit" class="button" id="submit" value="SIGN UP">
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
      email: '',
      userName: '',
      isUserEmailIncorrect: false
    }
  },
  methods: {
    signUp () {
      // add new user in storage
      this.$store.state.users.push({
        userEmail: this.email,
        userName: this.userName
      })
      // add current user email and name
      this.$store.state.userName = this.userName
      this.$store.state.userEmail = this.email
      // set array for favorite countries
      this.$store.commit('setInitialFavoritePlaces', this.userName)
    },
    checkEmailCorrectness (email) {
      this.isUserEmailIncorrect = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
  },
  computed: {
    isEmailInBase: function () {
      return this.$store.state.users.filter(element => {
        return element.userEmail === this.email
      }).length > 0
    },
    isUserDataCorrect () {
      this.checkEmailCorrectness(this.email)

      if (this.userName !== '' && !this.isUserEmailIncorrect && this.email !== '') {
        return true
      } else {
        return false
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
  min-width: 450px;
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
  margin: -2px 0 15px;
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
.wrong-data {
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
