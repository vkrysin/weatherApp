<template>
  <div>
    <div id="app" class="grid-container">
      <app-header class="header" v-bind:title="title"></app-header>
      <button v-if="this.$store.state.userEmail !== ''" class="exit" @click="exit">Exit</button>
      <favorites v-if="this.$store.state.userEmail !== ''"></favorites>
      <div v-else class="entry">
        <router-link class="registration-login-button" to="/registration">Registration</router-link>
        <router-link class="registration-login-button" to="/login">Login</router-link>
      </div>
      <app-banner class="banner" v-bind:bannerMessage="messageToDisplay" v-bind:bannerType="messageType" v-on:clear-banner="clearMessage"></app-banner>
      <app-weather-search class="weather-search" v-on:search-city="searchCity"></app-weather-search>
      <app-weather-results class="weather-results" v-bind="weatherData" v-if="validWeatherData" v-on:clear-weather-data="resetData"></app-weather-results>
      <app-footer class="footer" v-bind:message="footerMessage"></app-footer>
    </div>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import Banner from '@/components/Banner.vue'
import Search from '@/components/Search.vue'
import Weather from '@/components/Weather.vue'
import Favorites from '@/components/Favorites.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'app-banner': Banner,
    'app-weather-search': Search,
    'app-weather-results': Weather,
    'favorites': Favorites
  },
  data () {
    return {
      // Title of the application
      title: 'Vue Weather App',
      // Message to display in the footer
      footerMessage: 'testdriven.io 2020',
      // Weather data collected from openweathermap.org
      weatherData: {
        city: '',
        weatherSummary: '',
        weatherDescription: '',
        currentTemperature: 0.0,
        highTemperature: 0.0,
        lowTemperature: 0.0,
        snowVolume: 0.0
      },
      isAuthorized: false,
      // Flag indicating if valid weather data has been loaded
      validWeatherData: false,
      // Message to display on banner
      messageToDisplay: '',
      // Message type (Info, Success, or Error) to display on banner
      messageType: 'Info',
      // API key from openweathermap.org - Unique to each person
      openweathermapApiKey: '4ad5cbc32c39d982d11436dff37d0dd3'
    }
  },
  computed: {
    userEmail () {
      return this.$store.state.userEmail
    }
  },
  created () {
    // Perform a check that the API key from openweathermap.org is defined
    if (this.openweathermapApiKey === '') {
      this.messageType = 'Error'
      this.messageToDisplay = 'Error! API Key needs to be loaded to use openweathermap.org!'
    }
  },
  methods: {
    searchCity (inputCity) {
      // GET request for user data
      axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + inputCity + '&units=metric&appid=' + this.openweathermapApiKey)
        .then((response) => {
          // handle success
          // this.messageType = 'Success'
          // this.messageToDisplay = 'SUCCESS! Weather data was retrieved for ' + response.data.name + '!'
          console.log(response)

          this.weatherData.city = response.data.name
          this.weatherData.weatherSummary = response.data.weather[0].main
          this.weatherData.weatherDescription = response.data.weather[0].description
          this.weatherData.currentTemperature = response.data.main.temp
          this.weatherData.lowTemperature = response.data.main.temp_min
          this.weatherData.highTemperature = response.data.main.temp_max
          this.validWeatherData = true
        })
        .catch((error) => {
          // handle error
          this.messageType = 'Error'
          this.messageToDisplay = 'ERROR! Unable to retrieve weather data for ' + inputCity + '!'
          console.log(error.message)
          this.resetData()
        })
        .finally((response) => {
          // always executed
          console.log('HTTP GET Finished!')
        })
    },
    resetData () {
      this.weatherData = {
        city: '',
        weatherSummary: '',
        weatherDescription: '',
        currentTemperature: 0.0,
        lowTemperature: 0.0,
        highTemperature: 0.0,
        snowVolume: 0.0
      }
      this.validWeatherData = false
    },
    clearMessage () {
      this.messageToDisplay = ''
      this.messageType = 'Info'
    },
    exit () {
      this.$store.state.userEmail = ''
    }
  }
}
</script>

<style>

/* Overall Styling
 *****************/
* {
  box-sizing:border-box;
  padding: 0;
  margin: 0;
}

body {
  background: #f1f3f5;
  font-family: segoe ui,helvetica neue,sans-serif;
  color: #345;
  overflow-x: hidden;
}

/* CSS Grid Styling
*******************/
.header {
  grid-area: header;
}
.registration-login-button {
  background-color:#44c767;
  border-radius:14px;
  border:1px solid #18ab29;
  max-width: 180px;
  max-height: 44px;
  color:#ffffff;
  font-family:Arial;
  font-size:18px;
  font-weight:bold;
  margin-top: 5px;
  padding:9px 35px;
  text-decoration:none;
}
.entry {
  display: flex;
  flex-direction: column;
  grid-area: entry;
}
.registration-login-button:hover {
  background-color:#5cbf2a;
}
.favorites {
  grid-area: favorites;
}
.banner {
  grid-area: banner;
}
.weather-search {
  grid-area: search;
}
.weather-results {
  grid-area: results;
}
.footer {
  grid-area: footer;
}
.exit {
  margin-top: 10px;
  grid-area: exit;
}
.grid-container {
  display: grid;
  grid-template-columns: 20% 25% 25% 15% 15%;
  grid-auto-rows: minmax(20px, auto);
  grid-gap: 10px;
  max-width: 1440px;
  margin: auto;
  grid-template-areas:
    "...   header     header     entry exit"
    "...   banner     banner     favorites ..."
    "...   search     search     favorites ..."
    "...   results    results    favorites ..."
    "...   footer     footer     favorites ...";
}

</style>
