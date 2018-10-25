<template>
<div>
  <v-toolbar flat>
    <v-list>
      <v-list-tile>
        <v-list-tile-title class="title">
          Productes List
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-toolbar>

  <v-list dense v-if="locations.hasOwnProperty(code)">

    <v-list-tile :key="product.id" v-for="(product, index) in locations[code].products" @click.stop="locations.dialog = product.id">
      <div>
        <exchange-products :index="index" :dialog="locations.dialog === product.id" :product="product" @close="close"/>
      </div>
      <v-list-tile-action>
        <v-icon>add</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{product.name}}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</div>
</template>

<script>
import { mapState } from 'vuex'
import ExchangeProducts from '../locations/home/location/modals/exchangeProducts'
export default {
  name: 'ProductList',
  components: {ExchangeProducts},
  data () {
    return {
      dialog: 0,
      code: this.$route.params.code,
      products: false
    }
  },
  watch: {
    locations (newValue, oldValue) {
      if (newValue[this.code].length > 2) {
        this.products = true
      }
    }
  },
  computed: mapState({
    locations: state => state.locations,
    nav: state => state.navigation
  }),
  methods: {
    close () {
      this.locations.dialog = false
      this.$emit('close')
    }
  },
  mounted () {
  }

}
</script>

<style scoped>

</style>
