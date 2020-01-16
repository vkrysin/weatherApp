<template>
  <div class="weather-results">
    <div class="weather-results-summary">
      <div class="weather-title">
        <h2>Weather Summary</h2>
      </div>
      <div class="weather-data">
        <p><strong>City</strong>: {{ city }}</p>
        <p><strong>Summary</strong>: {{ weatherSummary }}</p>
        <p><strong>Details</strong>: {{ weatherDescription }}</p>
      </div>
    </div>

    <div class="weather-results-temperatures">
      <div class="weather-title">
        <h2>Temperatures</h2>
      </div>
      <div class="weather-data">
        <p><strong>Current</strong>: {{ currentTemperature }}° F</p>
        <p><strong>High (Today)</strong>: {{ highTemperature }}° F</p>
        <p><strong>Low (Today)</strong>: {{ lowTemperature }}° F</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Weather',
  props: {
    city: String,
    weatherSummary: String,
    weatherDescription: String,
    currentTemperature: Number,
    lowTemperature: Number,
    highTemperature: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* Weather Results Styling
**************************/
.weather-results {
  margin: auto;
  display: flex;
  flex-direction: row;
}

.weather-results-summary, .weather-results-temperatures {
  margin: 0 10px;
  padding: 10px;
  border-radius: 2px;
  background: #fff;
  box-shadow: 0 6px 8px rgba(102,119,136,.03), 0 1px 2px rgba(102,119,136,.3);
}

.weather-results-temperatures {
  padding: 10px 40px;
}

.weather-title {
  margin-bottom: 0.5em;
}

.weather-title h2 {
  text-align: center;
  color: #745fb5;
  white-space: nowrap;
  overflow: hidden;
}
 </style>
