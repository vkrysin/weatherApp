<template>
  <li>
    <button>{{cityName}}</button>
    <button class="delete" @click="clear"><img src="../assets/redCross.png"></button>
  </li>
</template>

<script>
export default {
  name: 'favoriteRecord',
  props: ['cityName'],
  methods: {
    clear () {
      let indexOfRecord = this.$store.state.favoritePlaces[this.$store.state.userName].indexOf(this.$props.cityName)
      this.$store.state.favoritePlaces[this.$store.state.userName].splice(indexOfRecord, 1)
    }
  }
}
</script>

<style scoped>

</style>
