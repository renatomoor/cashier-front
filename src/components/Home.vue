<template>
    <div class="home">
      <h1>{{ msg }}</h1>
      <b-alert show>Hello</b-alert>
      <icon name="beer"></icon>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to the very first commit'
    }
  }
}
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
</style>
