<template>
  <div>
    <nav class="navbar navbar-light bg-dark sticky-top">
      <li class="nav-item ">
        <router-link to="/">
          <font-awesome-icon class="icon-menu"
                             icon="arrow-alt-circle-left"
                             size="3x"></font-awesome-icon>
        </router-link>
      </li>
      <li class="nav-item ">
        <h1 >{{ title }}</h1>
      </li>
      <li class="nav-item"></li>
  </nav>
    <loader v-if="loading"></loader>
    <div v-else  class="container pt-2 row mx-auto">
      <location v-for="location in locations"
                :key="location.id"
                v-bind:location="location">
      </location>
    </div>
  </div>
</template>

<script>
import Loader from './helpers/Loader'
import Location from './locations/Location'
import { mapState } from 'vuex'

export default {
  name: 'locations',
  components: {Location, Loader},
  computed: mapState({
    locations: state => state.locations.all,
    loading: state => state.locations.loading
  }),
  data () {
    return {
      title: 'locations'
    }
  },
  mounted () {
    this.$store.dispatch('locations/reload_location')
  }
}
</script>
<style scoped>
 h1{
   color: white;
 }
</style>
