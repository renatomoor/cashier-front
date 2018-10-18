s<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jQuery from 'jquery'
global.jQuery = jQuery
global.$ = jQuery
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}

.icon-menu {
  color: #5d5d5d;
}
</style>

<style lang="scss">
@import "~bootstrap/scss/bootstrap.scss";
</style>
