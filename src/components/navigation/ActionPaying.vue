<template>
  <div v-if="this.locations[this.nav.location]">
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
    <div v-if="total > 0">
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
    <div v-else>
      <v-list dense class="pt-0">
        <v-list-tile>
          <v-list-tile-action>
            <v-icon large>not_interested</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title > Nothing to pay </v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>
      </v-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
    ...mapActions('locations', [
      'pay_products'
    ]),
    returnBack () {
      this.nav.right = false
    },
    payNow () {
      console.log()
      const location = this.locations[this.nav.location]
      let products = []
      Object.values(location.products).forEach(function (product) {
        if (product.products_in_payment > 0) {
          products.push(
            {
              'product_id': product.id,
              'quantity': product.products_in_payment
            }
          )
        }
      })
      let data = {
        id: this.locations[this.nav.location].location.id,
        code: this.locations[this.nav.location].location.code,
        products: products
      }
      if (this.nav.payingType === 'money') {
        data.type_id = 1
        this.pay_products(data)
        this.returnBack()
        this.nav.drawerRight = false
      } else {
        data.type_id = 2
        this.pay_products(data)
        this.returnBack()
        this.nav.drawerRight = false
      }
    }
  }
}
</script>

<style scoped>

</style>
