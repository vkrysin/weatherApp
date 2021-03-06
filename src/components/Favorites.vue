<template>
    <div class="favorites">
      <h2 class="greetings">Welcome, {{this.$store.state.userName}}</h2>
        <h3>Your favorites place:</h3>
        <ul class="favorites__list">
           <li><button>Moscow</button></li>
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
  position: relative;
  list-style-type: none;
  padding-left: 2.5rem;
  margin-bottom: 0.5rem;
}

.favorites__list li:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: -2px;
    width: 5px;
    height: 11px;
    border-width: 0 2px 2px 0;
    border-style: solid;
    border-color: #00a8a8;
    transform-origin: bottom left;
    transform: rotate(45deg);
}
.favorites li > button {
    border: 1px solid rebeccapurple;
    border-radius: 0.3rem;
    padding: 2px 15px;
    font-size: 15px;
    background: rebeccapurple;
    color: white;
}
</style>
