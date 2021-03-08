<template>
  <div class="weather-search">
    <div class="weather-search-title">
      <h2>Weather Search</h2>
    </div>
    <div class="weather-search-input">
      <label for="cityInput">City:</label>
      <input ref="inputCity" type="text" id="cityInput" v-model="inputCity" placeholder="Enter a city name...">
      <br>
      <div class="weather-search-buttons">
        <button ref="search" type="submit" v-on:click="searchCity" v-bind:disabled="searchDisabled">Search</button>
        <button type="reset" v-on:click="clearCity" v-bind:disabled="clearDisabled">Clear</button>
        <button v-on:click="() => {this.$store.commit('addToFavorite', this.inputCity)}"
                v-if="this.$store.state.addToFavoriteShow" id="addToFavorite">
          <img src="../assets/yellowStar.png">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: ['addDisabled'],
  data () {
    return {
      inputCity: ''
    }
  },
  mounted: function () {
    this.$store.state.searchBtn = this.$refs.search
    this.$store.state.inputCity = this.$refs.inputCity
  },
  methods: {
    searchCity () {
      this.$emit('search-city', this.inputCity)
    },
    clearCity () {
      // this.$emit('reset-city')
      this.inputCity = ''
    }
  },
  computed: {
    searchDisabled () {
      if (this.inputCity) {
        return false
      } else {
        return true
      }
    },
    clearDisabled () {
      if (this.inputCity) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* Weather Search Styling
*************************/
.weather-search {
  margin: auto;
}

.weather-search-title h2 {
  text-align: center;
  margin-bottom: 0.5em;
}

.weather-search-buttons {
  display: flex;
  margin-top: 10px;
  margin-left: 45px;
}

.weather-search-input {
  text-align: center;
}

.weather-search-input label {
  font-size: 1.35em;
  margin-right: 0.5em;
}

.weather-search-input input {
  font-size: 1.1em;
}

.weather-search-buttons button {
  background-color: blue;
  color: white;
  padding: 8px 16px;
  text-align: center;
  font-size: 1em;
  border-radius: 8px;
  border: none;
  margin: 6px;
}

.weather-search-buttons button:hover {
  color: black;
  cursor: pointer;
}

.weather-search-buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
#addToFavorite {
  padding: 0px;
  border-radius: 0px;
  background-color: #f1f3f5;
}
#addToFavorite img {
  height: 32px;
  background-color: #f1f3f5;
}
</style>
