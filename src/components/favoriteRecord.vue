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
      // delete from store
      let indexOfRecord = this.$store.state.favoritePlaces[this.$store.state.userName].indexOf(this.$props.cityName)
      this.$store.state.favoritePlaces[this.$store.state.userName].splice(indexOfRecord, 1)

      // delete from local storage
      const localStorage = JSON.parse(window.localStorage.getItem('vuex'))

      let indexOfRecordInLocalStorage =
            localStorage.favoritePlaces[localStorage.userName].indexOf(this.$props.cityName)

      localStorage.favoritePlaces[localStorage.userName].splice(indexOfRecordInLocalStorage, 1)

      window.localStorage.setItem('vuex', JSON.stringify(localStorage))
    },
    autoSearch () {
      this.$store.state.inputCity.value = this.cityName.toLowerCase()
      // inform serach component, that we add input value
      this.$store.state.inputCity.dispatchEvent(new Event('input'))
      // wait while search get our update input event
      setTimeout(() => {
        this.$store.state.searchBtn.click()
      }, 1)
    }
  }
}
</script>

<style scoped>
</style>
