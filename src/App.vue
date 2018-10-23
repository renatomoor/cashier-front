<template>
  <v-app>
    <v-navigation-drawer
      v-if="nav.showDrawerRightMenu"
      v-model="nav.drawerRight"
      fixed
      right
      clipped
      app
    >
      <home-location-actions></home-location-actions>
    </v-navigation-drawer>
    <v-toolbar
      color="primary"
      dark
      fixed
      app
      clipped-right
    >
      <v-btn v-if="nav.goBack" @click="$router.push(nav.goBack)" icon>
        <v-icon>skip_previous</v-icon>
      </v-btn>
      <v-btn v-if="nav.showDrawerMenu" @click="nav.drawer = !nav.drawer" icon>
        <v-icon>{{nav.drawer ? 'remove' : 'add'}}</v-icon>
      </v-btn>
      <v-toolbar-tile v-if="nav.drawer" @click.stop="nav.drawer = !nav.drawer"></v-toolbar-tile>
      <v-spacer></v-spacer>
      <v-toolbar-title v-if="nav.title">{{nav.title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon v-if="nav.showDrawerRightMenu" @click.stop="nav.drawerRight = !nav.drawerRight" ></v-toolbar-side-icon>
    </v-toolbar>
    <v-navigation-drawer
      v-if="nav.showDrawerMenu"
      v-model="nav.drawer"
      fixed
      app
    >

      <v-divider></v-divider>

      <product-list @close="closeLeft" v-if="$route.name === 'Location'"></product-list>

    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="nav.right"
      right
      temporary
      fixed
    >
      <action-paying></action-paying>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ProductList from './components/navigation/ProductsList'
import HomeLocationActions from './components/navigation/HomeLocationActions'
import Paying from './components/locations/home/location/Paying'
import ActionPaying from './components/navigation/ActionPaying'
export default {
  components: {ActionPaying, Paying, HomeLocationActions, ProductList},
  data () {
    return {
      drawerRight: false,
      right: null,
      left: null
    }
  },
  computed: mapState({
    nav: state => state.navigation
  }),
  methods: {
    ...mapActions('navigation', [
      'startNav'
    ]),
    closeLeft () {
      this.nav.drawer = false
    }
  },
  mounted () {
    this.$router.beforeEach((to, from, next) => {
      this.startNav()
      next()
    })
  },
  name: 'App'
}
</script>

<style>

</style>
