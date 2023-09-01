<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="links-container">
      <router-link to="/" class="link">Cats</router-link>
      <router-link to="/fibonacciSequence" class="link">Fibonacci</router-link>
      <router-link to="/catsList" class="link">Cats List</router-link>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.links-container {
  margin-bottom: 20px;
}

.links-container .link {
  margin: 10px 30px;
  font-size: 22px;
}
</style>
