<template>
  <v-layout v-if="productArray.length > 0" row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="blue">
          <v-btn icon dark @click.native="close">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ productArray[0].product.name + '  -  ' +  productArray[0].product.price + ' CHF'}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="save">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container grid-list-sm text-xs-center>
          <v-layout row wrap>
            <!---->
            <!--List To Pay-->
            <!---->
            <v-flex xs12 sm6>
              <v-toolbar color="blue"
                         dark >
                <v-spacer></v-spacer>
                <v-btn v-if="newValueList" @click="deleteInList(1)" icon>
                  <v-icon>exposure_neg_1</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title>Liste a Payer</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn @click="addInList(1)"  icon>
                  <v-icon>exposure_plus_1</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
              </v-toolbar>
              <div>
                <v-data-table
                  :items="productArray"
                  hide-actions
                  hide-headers
                >
                  <template slot="items" slot-scope="props" v-if="newValueList">
                    <td class="text-xs-center">{{ newValueList }}</td>
                    <td class="text-xs-right">{{ props.item.product.name }}</td>
                    <td class="text-xs-center">{{ props.item.product.price * newValueList }} CHF</td>
                  </template>
                </v-data-table>
                <v-toolbar color="grey lighten-2"
                           class="elevation-0 ">
                  <v-spacer></v-spacer>
                  <v-btn v-if="newValueList" @click="fromListToPay(1)">
                    Un
                    <v-icon>keyboard_arrow_right</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-toolbar>
              </div>
            </v-flex>
            <v-flex xs12 sm6>
              <v-toolbar color="green darken-1"
                         dark >
                <v-spacer></v-spacer>
                <v-btn v-if="newValuePay" @click="deleteInPay(1)" icon>
                  <v-icon>exposure_neg_1</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title>Paiement</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn @click="addInPay(1)" icon>
                  <v-icon>exposure_plus_1</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
              </v-toolbar>
              <!---->
              <!--Paiment List-->
              <!---->
              <div>
                <v-data-table
                  :items="productArray"
                  hide-actions
                  hide-headers
                >
                  <template slot="items" slot-scope="props" v-if="newValuePay">
                    <td class="text-xs-center">{{ newValuePay }}</td>
                    <td class="text-xs-right">{{ props.item.product.name }}</td>
                    <td class="text-xs-center">{{ props.item.product.price * newValuePay }} CHF</td>
                  </template>
                </v-data-table>
                <v-toolbar color="grey lighten-2"
                           class="elevation-0 ">
                  <v-spacer></v-spacer>
                  <v-btn v-if="newValuePay" @click="fromPayToList(1)">
                    Un
                    <v-icon>keyboard_arrow_left</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-toolbar>
              </div>
            </v-flex>
          </v-layout>
          <v-flex xs12>
            <v-subheader class="pl-0"></v-subheader>
            <v-slider
              v-model="slider"
              :max="sliderMax"
              thumb-color="black"
              :color="'green darken-1'"
              :track-color="'blue'"
              step="1"
              ticks="always"
              tick-size="3"
            ></v-slider>
          </v-flex>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState, mapActions} from 'vuex'
export default {
  name: 'exchangeProducts',
  data () {
    return {
      productArray: [],
      newValueList: 0,
      newValuePay: 0,
      firstTime: 0,
      apil: 0,
      apip: 0,
      rpil: 0,
      rpip: 0,
      code: this.$route.params.code,
    }
  },
  watch: {
    newValueList (newValue, oldValue) {
      if (this.firstTime > 0) {
        if (newValue > oldValue) {
          if (this.rpil > 0) {
            this.rpil--
          } else {
            this.apil++
          }
        }
        if (newValue < oldValue) {
          if (this.apil > 0) {
            this.apil--
          } else {
            this.rpil++
          }
        }
      }
    },
    newValuePay (newValue, oldValue) {
      if (this.firstTime > 0) {
        if (newValue > oldValue) {
          if (this.rpip > 0) {
            this.rpip--
          } else {
            this.apip++
          }
        }
        if (newValue < oldValue) {
          if (this.apip > 0) {
            this.apip--
          } else {
            this.rpip++
          }
        }
      }
    }
  },
  computed: {
    ...mapState({
      location: state => state.locations
    }),
    slider: {
      get: function () {
        return this.newValuePay
      },
      set: function (newValue) {
        if (newValue > this.newValuePay) {
          this.firstTime = 1
          this.newValuePay++
          this.newValueList--
        } else {
          this.firstTime = 1
          this.newValuePay--
          this.newValueList++
        }
      }
    },
    sliderMax () {
      return (this.newValueList + this.newValuePay)
    }
  },
  methods: {
    ...mapActions('locations', ['update_locations_products']),
    save: function () {
      const dataToSend = {
        add: {
          products_in_list: this.apil,
          products_in_payment: this.apip
        },
        remove: {
          products_in_list: this.rpil,
          products_in_payment: this.rpip
        },
        code: this.$route.params.code,
        id: this.productArray[0].product.id
      }
      this.location[this.code].products[this.index].products_in_list = this.newValueList
      this.location[this.code].products[this.index].products_in_payment = this.newValuePay
      this.update_locations_products(dataToSend)
      this.$emit('close')
    },
    close () {
      this.newListValue = this.productArray[0].product.products_in_list
      this.newToPayValue = this.productArray[0].product.products_in_payment
      this.$emit('close')
    },
    fromListToPay (value) {
      if (this.newValueList > 0) {
        this.firstTime = 1
        this.newValueList -= value
        this.newValuePay += value
      }
    },
    fromPayToList (value) {
      if (this.newValuePay > 0) {
        this.firstTime = 1
        this.newValueList += value
        this.newValuePay -= value
      }
    },
    deleteInList (value) {
      if (this.newValueList > 0) {
        this.firstTime = 1
        this.newValueList -= value
      }
    },
    addInList (value) {
      this.firstTime = 1
      this.newValueList += value
    },
    deleteInPay (value) {
      if (this.newValuePay > 0) {
        this.firstTime = 1
        this.newValuePay -= value
      }
    },
    addInPay (value) {
      this.firstTime = 1
      this.newValuePay += value
    },
    setNewValues () {
      this.newValueList = this.productArray[0].product.products_in_list
      this.newValuePay = this.productArray[0].product.products_in_payment
    }
  },
  props: ['dialog', 'product', 'index'],
  mounted () {
    this.productArray.push({ product: this.product })
    this.setNewValues()
  }
}
</script>

<style scoped>
  table.v-table tbody td {
    font-size: 1rem;
  }
</style>
