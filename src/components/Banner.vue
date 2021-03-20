<template>
  <div v-show="bannerMessage">
    <p>{{ bannerMessage }}</p>
    <span id="errorMessageClear" v-on:click="clearBannerMessage">Clear</span>
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
  display: flex;
  width: max-content;
  margin-bottom: 15px;
  background-color: red;
  margin-left: 140px;
}

span, p {
  padding: 15px;
  color: white;
  width: auto;
}
#errorMessageClear:hover {
  color: black;
  cursor: pointer;
}
</style>
