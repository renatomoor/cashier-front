<template>
  <div>
    <locations-nav v-bind:title="title"></locations-nav>
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
import { mapState, mapActions } from 'vuex'
import LocationsNav from './locations/Locations-nav'

export default {
  name: 'locations',
  components: { LocationsNav, Location, Loader },
  computed: mapState({
    locations: state => state.locations.all,
    loading: state => state.locations.loading
  }),
  data () {
    return {
      title: 'Locations'
    }
  },
  methods: {
    ...mapActions('locations', ['reload_locations'])
  },
  mounted () {
    this.reload_locations()
  }
}
</script>
<style scoped>
h1 {
  color: white;
}
</style>
