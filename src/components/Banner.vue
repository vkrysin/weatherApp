<template>
  <div v-show="bannerMessage">
    <span id="errorMessageClear" v-on:click="clearBannerMessage">Clear</span>
    <p>{{ bannerMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    // Message to display on banner
    bannerMessage: String
  },
  methods: {
    clearBannerMessage () {
      this.$emit('clear-banner')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  width: 100%;
  display:inline-block;
  margin-bottom: 15px;
  background-color: red;
}

span, p {
  padding: 15px;
  color: white;
  width: auto;
}

div {
  float: left;
}

#errorMessageClear {
  float: right;
}

#errorMessageClear:hover {
  color: black;
  cursor: pointer;
}
</style>
