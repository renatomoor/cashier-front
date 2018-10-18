<template>
  <nav class="navbar navbar-light sticky-top bg-light">
    <a class="mr-auto navbar-brand" @click="$router.push({path:'/'})">
      <font-awesome-icon class="icon-menu" icon="arrow-alt-circle-left" size="2x"></font-awesome-icon>
    </a>
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <h3 class=""></h3>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Location-nav',
  props: ['title']
}
</script>

<style scoped>
.nav {
  margin-bottom: 1vh;
  background-color: whitesmoke;
}
</style>
