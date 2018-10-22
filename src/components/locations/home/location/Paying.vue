<template>
  <v-flex xs12 sm6>
    <v-toolbar color="green darken-1"
               dense
               dark >
      <v-toolbar-title>Paiement</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>

    <div v-if="location.products">
      <v-data-table
        :items="location.products"
        hide-actions
        hide-headers
        dense
      >
        <template slot="items" slot-scope="props" v-if="props.item.products_in_payment">
          <tr @click="dialog = props.item.id + '_in_Pay'" >
            <exchange-products :index="props.index" :dialog="dialog === props.item.id + '_in_Pay'" :product="props.item" @close="close"/>
          <td class="text-xs-left">{{ props.item.products_in_payment }}</td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.price }} CHF</td>
          <td class="text-xs-right">{{ props.item.price * props.item.products_in_payment }} CHF</td>
          </tr>
        </template>
      </v-data-table>
      <v-toolbar color="grey lighten-3"
                 dense
                 class="elevation-0 ">
        <v-btn icon>
          <v-icon>menu</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-toolbar-title>{{ total }} CHF</v-toolbar-title>
      </v-toolbar>
    </div>
  </v-flex>
</template>

<script>
import ExchangeProducts from './modals/exchangeProducts'
export default {
  name: 'Paying',
  components: {ExchangeProducts},
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    total: function () {
      let total = 0
      this.location.products.forEach(function (product) {
        total += product.products_in_payment * product.price
      })
      return total
    }
  },
  methods: {
    close () {
      this.dialog = false
    }
  },
  props: [
    'location'
  ]
}
</script>

<style scoped>

</style>
