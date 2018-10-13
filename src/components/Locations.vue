<template>
  <div>
      <nav class="navbar navbar-light sticky-top bg-light">
        <router-link class="mr-auto navbar-brand" to="/">
          <font-awesome-icon class="icon-menu" icon="arrow-alt-circle-left" size="2x"></font-awesome-icon>
        </router-link>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <h3 class="">{{ title }}</h3>
          </li>
        </ul>
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
import Location from './locations/Location-card'
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
