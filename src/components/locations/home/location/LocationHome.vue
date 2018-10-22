<template>
  <div>
    <loader v-if="loading"></loader>
    <div v-else-if="location[code]" >
      {{ getData() }}
      <v-container grid-list-sm text-xs-center>
        <v-layout row wrap>
          <list :location="location[code]"/>
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
      currentLocation: '',
      headers: [
        { text: 'Calories' },
        { text: 'Fat (g)' },
        { text: 'Carbs (g)' },
        { text: 'Protein (g)' }
      ]
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
      this.nav.title = this.location[this.code].client.name
    }
  },
  mounted () {
    this.reload(this.code)
    this.currentLocation = this.code
  }
}
</script>
