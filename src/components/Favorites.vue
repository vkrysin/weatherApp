<template>
    <div class="favorites">
      <h2 class="greetings">Welcome, {{this.$store.state.userName}}</h2>
        <h3>Your favorites place:</h3>
        <ul class="favorites__list">
           <favoriteRecord
              v-for="item in this.$store.state.favoritePlaces[this.$store.state.userName]"
              :key="item"
              :cityName="item">
           </favoriteRecord>
        </ul>
    </div>
</template>

<script>
import favoriteRecord from '@/components/favoriteRecord.vue'

export default {
  name: 'Favorites',
  components: {
    'favoriteRecord': favoriteRecord
  }
}
</script>

<style>
.favorites {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
}
.favorites .greetings, h3, li {
  font-size: 1.5em;
  margin-bottom: 10px;
}
.favorites__list {
  margin: 0;
  padding-left: 1.2rem;
}

.favorites__list li {
  position: relative;
  list-style-type: none;
  padding-left: 2.5rem;
  margin-bottom: 0.5rem;
}
.favorites li button:first-child {
  border: 1px solid rebeccapurple;
  border-radius: 0.3rem;
  padding: 2px 15px;
  font-size: 15px;
  background: rebeccapurple;
  color: white;
}
.favorites li button:first-child:active {
  background-color: rgb(79, 50, 109);
}
.favorites__list .delete {
  margin-left: 10px;
}
.favorites__list .delete img {
  vertical-align: middle;
  height: 16px;
}
</style>
