<template>
      <div >
        <loader v-if="loading"></loader>
        <v-container v-else grid-list-md text-xs-center >
          <v-layout row wrap>
            <product  :key="product.id"
                      v-for="(product, index ) in products"
                      v-bind:product="product"
                      v-bind:index="index"/>
          </v-layout>
          <v-card-text style="height: 100px; position: relative" class="mt-5">
            <v-fab-transition>
                <v-dialog v-model="create" persistent max-width="500px">
                  <v-btn
                    v-show="true"
                    color="green"
                    dark
                    absolute
                    top
                    right
                    fab
                    slot="activator"
                  >
                    <v-icon>add</v-icon></v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Create Product</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field v-model="newProduct.name"
                                          label="Name"
                                          :rules="nameRules"></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field
                              v-model="newProduct.price"
                              label="Price"
                              type="number"
                              :rules="priceRules"
                              required
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1"
                             flat
                             @click.native="cancelCreate">Close</v-btn>
                      <v-btn color="green darken-1"
                             flat @click.native="saveNewProduct"
                             v-if="newProduct.name.length > 0 && newProduct.price.length > 0"
                      >Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
            </v-fab-transition>
          </v-card-text>
        </v-container>
      </div>
</template>
<script>
import Product from './products/Product-card'
import router from '../router'
import { mapState } from 'vuex'
import Loader from './locations/home/helper/loader'

export default {
  name: 'Products',
  router,
  components: { Loader, Product },
  computed: {
    ...mapState({
      products: state => state.products.all,
      loading: state => state.products.loading,
      nav: state => state.navigation
    }),
    loadingState () {
      return this.$store.state.products.loading
    }
  },
  data () {
    return {
      title: 'Product List',
      create: false,
      newProduct: {
        name: '',
        price: ''
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 20 || 'Name must be less than 10 characters'
      ],
      priceRules: [
        v => !!v || 'Price is required',
        v => /([1-9])/.test(v) || 'Price must be numbers'
      ]
    }
  },
  mounted () {
    this.$store.dispatch('products/reload_products')
    this.nav.title = 'Location List'
    this.nav.goBack = '/'
  },
  methods: {
    saveNewProduct: function () {
      let data = {
        product: this.newProduct
      }
      this.$store.dispatch('products/create_product', data)
      this.create = false
      this.newProduct.name = ''
      this.newProduct.price = ''
    },
    cancelCreate: function () {
      this.create = false
      this.newProduct.name = ''
      this.newProduct.price = ''
    }
  }
}
</script>

<style scoped>
h1 {
  color: white;
}
li {
  margin: 0;
}
.icon-menu:hover {
  color: #343a40;
}
</style>
