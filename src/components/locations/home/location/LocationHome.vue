<template>
  <div>
    <loader v-if="loading"></loader>
    <div v-else-if="location[code]" >
      {{ getData() }}
      <v-container grid-list-sm text-xs-center>
        <v-layout row wrap>
          <list v-if="!nav.drawerRight" :location="location[code]"/>
          <paying :location="location[code]"/>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Loader from '../helper/loader'
import List from '../location/List'
import Paying from '../location/Paying'

export default {
  namespaced: true,
  name: 'LocationHome',
  computed: {
    ...mapState({
      location: state => state.locations,
      loading: state => state.locations.loading,
      nav: state => state.navigation
    }),
    ...mapGetters('locations', ['getLocation'])
  },
  components: {
    Paying,
    List,
    Loader
  },
  data () {
    return {
      code: this.$route.params.code,
      showModalProducts: false,
      currentLocation: ''
    }
  },
  methods: {
    ...mapActions('locations', {
      reload: 'reload_location_by_code'
    }),
    changeCurrentLocation (code) {
      this.reload(code)
      this.currentLocation = code
    },
    getData () {
      const location = this.location[this.code]
      this.nav.title = location.client.name + ' ' + location.client.last_name +
      ' ' + location.location.hour_start + ' - ' + location.location.hour_end
    }
  },
  mounted () {
    this.$store.dispatch('locations/reload_locations')
    this.$store.dispatch('products/reload_products')
    this.reload(this.code)
    this.currentLocation = this.code
    this.nav.goBack = '/locations'
    this.nav.showDrawerMenu = true
    this.nav.showDrawerRightMenu = true
    this.nav.location = this.code
  }
}
</script>
