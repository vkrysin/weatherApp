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
        <button ref="search" type="submit" v-on:click="searchCity" v-bind:disabled="elemDisabled" class="sea">Search</button>
        <button type="reset" v-on:click="clearCity" v-bind:disabled="elemDisabled">Clear</button>
        <button v-on:click="() => {this.$store.commit('addToFavorite', this.inputCity)}"
                v-if="this.$store.state.addToFavoriteShow" id="addToFavorite">
          <img src="../assets/yellowStar.png" alt="add to favorite">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      inputCity: ''
    }
  },
  mounted: function () {
    // add value on this search button and inputCity value in store
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
    elemDisabled () {
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
  font-size: 2em;
  text-align: center;
  margin-bottom: 0.5em;
}

.weather-search-buttons {
  display: flex;
  margin-top: 10px;
  margin-left: 50px;
}

.weather-search-input {
  text-align: center;
}

.weather-search-input label {
  font-size: 1.5em;
  margin-right: 0.5em;
}

.weather-search-input input {
  font-size: 1.4em;
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
