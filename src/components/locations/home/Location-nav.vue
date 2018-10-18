<template>
  <nav v-if="locations[currentLocation]" class="navbar navbar-expand-md sticky-top navbar-light bg-light">
    <a class="mr-auto navbar-brand" @click="$router.push({path:'/locations'})">
      <font-awesome-icon class="icon-menu" icon="arrow-alt-circle-left" size="2x"></font-awesome-icon>
    </a>
    <div class="mr-auto border-0 navbar-toggler">
        <span >{{ locations[currentLocation].client.name }} {{locations[currentLocation].client.last_name }}</span >
    </div>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <div class="dropdown mr-3">
            <button class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownOptions"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
              <span>Options</span >
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownLocations">
              <button class="dropdown-item" type="button">
                  <span>Paiements Réalisés</span>
              </button>
            </div>
          </div>
        </li>
        <li class="nav-item ">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownLocations"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
              <span >{{ locations[currentLocation].client.name }} {{locations[currentLocation].client.last_name }}</span >
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownLocations">
              <button :key="location.id" v-for="location in locations.all"  v-if="location.deleted_at === null" class="dropdown-item" type="button">
                  <span @click="changeCurrentLocation(location.location.code); ">{{ location.client.name + ' ' +  location.client.last_name }}</span>
              </button>
            </div>
          </div>
        </li>
      </ul>
      <span class="navbar-text">
    </span>
    </div>
  </nav>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'location-home-nav',
  computed: mapState({
    locations: state => state.locations,
    loading: state => state.locations.loading
  }),
  data () {
    return {
      code: this.$route.params.code
    }
  },
  methods: {
    ...mapActions('locations', ['reload_locations']),
    changeCurrentLocation (code) {
      this.$emit('changeCurrentLocation', code)
      this.$router.push({ path: '/location/' + code })
    }
  },
  mounted () {
    this.reload_locations()
  },
  props: ['currentLocation']
}
</script>

<style scoped>
.dropdown-toggle {
  font-size: 1.3rem;
}
@media (max-width: 768px) {
  .nav-item {
    margin-top: 0.2vh;
    margin-bottom: 0.2vh;
  }
}
</style>
