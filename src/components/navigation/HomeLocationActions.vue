<template>
  <div>
    <div>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Actions
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense class="pt-0">
        <v-list-tile
          @click="payByMoney"
        >
          <v-list-tile-action>
            <v-icon>money</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Pay Cash</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-list dense class="pt-0">
        <v-list-tile
          @click="payByCard"
        >
          <v-list-tile-action>
            <v-icon>credit_card</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Pay Card</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Change Location
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HomeLocationActions',
  computed: mapState({
    nav: state => state.navigation
  }),
  methods: {
    payByCard () {
      this.nav.payingType = 'card'
      this.nav.right = true
    },
    payByMoney () {
      this.nav.payingType = 'money'
      this.nav.right = true
    }
  }
}
</script>

<style scoped>

</style>
