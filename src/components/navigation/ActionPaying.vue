<template>
  <div>
    <v-list dense class="pt-2">
      <v-list-tile
        @click="returnBack"
      >
        <v-list-tile-action>
          <v-icon>backspace</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Return</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>

    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-spacer></v-spacer>
          <v-list-tile-action>
            <v-icon large >{{nav.payingType === 'card' ? 'credit_card' : 'money'}}</v-icon>
          </v-list-tile-action>
          <v-spacer></v-spacer>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list dense class="pt-0">
      <v-list-tile
        @click="payNow"

      > <v-list-tile-action>
        <v-icon  >send</v-icon>
      </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title >Payer {{total}} CHF  par {{nav.payingType === 'card' ? ' carte' : 'argent'}} </v-list-tile-title>
        </v-list-tile-content>

      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      nav: state => state.navigation,
      locations: state => state.locations
    }),
    total: function () {
      let totalToPay = 0
      Object.values(this.locations[this.nav.location].products).forEach(function (product) {
        totalToPay += product.products_in_payment * product.price
      })
      console.log(totalToPay)
      return totalToPay
    }
  },
  watch: {
    nav (newValue, oldValue) {
      if (newValue.right === false) {
        this.nav.payingType = false
      }
    }
  },
  name: 'ActionPaying',
  methods: {
    returnBack () {
      this.nav.right = false
    },
    payNow () {

    }
  }
}
</script>

<style scoped>

</style>
