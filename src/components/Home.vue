<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Menu</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-btn @click="$router.push(link.url)" v-for="link in links" :key="link.id"  block color="secondary">{{link.name}}</v-btn>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Home',
  computed: mapState({
    nav: state => state.navigation
  }),
  data () {
    return {
      msg: 'Caisse Area',
      links: [
        { id: 0, name: 'Locations', url: '/locations' },
        { id: 2, name: 'Products', url: '/products' }
      ]
    }
  },
  methods: {
    ...mapActions('navigation', [
      'startNav'
    ])
  },
  mounted () {
    this.$store.dispatch('locations/reload_locations')
    this.$store.dispatch('products/reload_products')
    this.nav.title = 'Paintball Area caisse menu'
  }
}
</script>

<style scoped>

</style>
