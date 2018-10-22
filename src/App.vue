<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="nav.miniVariant"
      :clipped="nav.clipped"
      v-model="nav.drawer"
      enable-resize-watcher
      fixed
      app
      v-if="nav.leftMenuShow"
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in nav.items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="nav.item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="nav.item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="nav.clipped"
    >
      <v-toolbar-side-icon v-if="nav.leftMenuShow" @click.stop="nav.drawer = !nav.drawer"></v-toolbar-side-icon>
      <v-btn v-if="nav.miniVariantShow" icon @click.stop="nav.miniVariant = !nav.miniVariant">
        <v-icon v-html="nav.miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn v-if="nav.goBack" icon @click.stop="$router.push({ path: nav.goBack })">
        <v-icon v-html="'arrow_left'"></v-icon>
      </v-btn>
      <v-btn v-if="nav.longMenuShow" icon @click.stop="nav.clipped = !nav.clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn v-if="nav.fixedShow" icon @click.stop="nav.fixed = !nav.fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="nav.title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="nav.rightMenuShow" icon @click.stop="nav.rightDrawer = !nav.rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
      <v-navigation-drawer
        temporary
        :right="nav.right"
        v-model="nav.rightDrawer"
        v-if="nav.rightMenuShow"
        fixed
        app
      >
      <v-list>
        <v-list-tile @click="nav.right = !nav.right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: mapState({
    nav: state => state.navigation
  }),
  methods: {
    ...mapActions('navigation', [
      'startNav'
    ])
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
