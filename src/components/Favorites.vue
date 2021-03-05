<template>
    <div class="favorites">
      <h2 class="greetings">Welcome, {{this.$store.state.userName}}</h2>
        <h3>Your favorites place:</h3>
        <ul class="favorites__list">
           <li>
             <div>Moscow</div>
             <button class="delete"><img src="../assets/redAcross.png"></button>
             </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'Favorites'
}
</script>

<style scoped>
.favorites {
  display: flex;
  flex-direction: column;
}
.favorites .greetings, h3, li {
  margin-bottom: 10px;
}
.favorites__list {
  margin: 0;
  padding-left: 1.2rem;
}

.favorites__list li {
  display: flex;
  position: relative;
  list-style-type: none;
  padding-left: 1rem;
  margin-bottom: 0.5rem;
}
.favorites li div {
  border: 1px solid rebeccapurple;
  border-radius: 0.3rem;
  padding: 2px 15px;
  font-size: 15px;
  background: rebeccapurple;
  color: white;
}
.favorites__list .delete {
  margin-left: 10px;
}
.favorites__list .delete img {
  vertical-align: middle;
  height: 16px;
}
</style>
