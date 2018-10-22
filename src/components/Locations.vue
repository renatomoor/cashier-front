<template>
  <div>
    <loader v-if="loading"></loader>
    <v-container grid-list-sm text-xs-center>
    <v-layout row wrap>
      <location v-for="location in locations"
                :key="location.id"
                v-bind:location="location"/>
    </v-layout>
  </v-container>
  </div>
</template>

<script>
import Location from './locations/Location-card'
import { mapState, mapActions } from 'vuex'
import Loader from './locations/home/helper/loader'

export default {
  name: 'locations',
  components: { Loader, Location },
  computed: mapState({
    locations: state => state.locations.all,
    loading: state => state.locations.loading,
    nav: state => state.navigation
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
    this.nav.title = 'Location List'
    this.nav.goBack = '/'
  }
}
</script>
<style scoped>
h1 {
  color: white;
}
</style>
