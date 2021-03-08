<template>
  <li>
    <button>{{cityName}}</button>
    <button class="delete" @click="clear"><img src="../assets/redAcross.png"></button>
  </li>
</template>

<script>
export default {
  name: 'favoriteRecord',
  props: ['cityName'],
  data () {
  },
  methods: {
    clear () {
    }
  }
}
</script>

<style scoped>

</style>
