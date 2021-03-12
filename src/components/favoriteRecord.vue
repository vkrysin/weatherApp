<template>
  <li>
    <button @click="autoSearch">{{cityName}}</button>
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
    },
    autoSearch () {
      this.$store.state.inputCity = this.cityName.toLowerCase()

      if (this.$store.state.searchBtn !== '') {
        this.$store.state.inputCity.dispatchEvent(new Event('input'))

        setTimeout(() => {
          this.$store.state.searchBtn.click()
        }, 1)
      }
    }
  }
}
</script>

<style scoped>

</style>
