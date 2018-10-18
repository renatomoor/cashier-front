<template>
    <div>
      <location-nav @changeCurrentLocation="changeCurrentLocation($event)"
                    :currentLocation="currentLocation">
        </location-nav>
        <loader v-if="loading"></loader>
      <div v-else-if="location[currentLocation]">
        <div class="">
          <div class="row w-100">
              <location-products-list v-bind:products="location[currentLocation].products"></location-products-list>
              <location-to-pay-list v-bind:products="location[currentLocation].products"></location-to-pay-list>
              <location-paying-list v-bind:products="location[currentLocation].products"></location-paying-list>
          </div>
        </div>
    </div>
    </div>
</template>
p
<script>
import LocationNav from './Location-nav'
import { mapState, mapActions } from 'vuex'
import LocationProductsList from './lists/Location-products-list'
import LocationToPayList from './lists/Location-toPay-list'
import LocationPayingList from './lists/Location-paying-list'
import Loader from '../../helpers/Loader'

export default {
  namespaced: true,
  name: 'Location-home',
  computed: mapState({
    location: state => state.locations,
    loading: state => state.locations.loading
  }),
  components: {
    Loader,
    LocationPayingList,
    LocationToPayList,
    LocationProductsList,
    LocationNav
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
    }
  },
  mounted () {
    this.reload(this.code)
    this.currentLocation = this.code
  }
}
</script>

<style scoped>
</style>
