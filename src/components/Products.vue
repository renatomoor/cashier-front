<template>
      <div class="">
        <nav class="navbar navbar-light sticky-top bg-light">
          <router-link class="navbar-brand" to="/"><font-awesome-icon class="icon-menu " icon="arrow-alt-circle-left" size="2x"></font-awesome-icon></router-link>
            <h3>{{ title }}</h3>
            <font-awesome-icon class="icon-menu" icon="plus" size="2x" @click="showCreate = true"></font-awesome-icon>
        </nav>
        <Loader v-if="loading" class=""></Loader>
        <div v-if="showCreate">
          <transition name="modal">
            <Create v-on:closeModal="closeModal($event)"
                    v-on:saveNewProduct="saveNewProduct($event)"></Create>
          </transition>
        </div>
        <div v-if="loading === false" class="container pt-2 row mx-auto">
              <product  :key="product.id"
                        v-for="(product, index ) in products"
                        v-bind:product="product"
                        v-bind:index="index">
              </product>
        </div>
      </div>
</template>
<script>
import Loader from './helpers/Loader'
import Product from './products/Product-card'
import router from '../router'
import Create from './products/Create-modal'
import { mapState } from 'vuex'

export default {
  name: 'Products',
  router,
  components: { Create, Product, Loader },
  computed: mapState({
    products: state => state.products.all,
    loading: state => state.products.loading
  }),
  data () {
    return {
      title: 'Product List',
      showCreate: false
    }
  },
  mounted () {
    this.$store.dispatch('products/reload_products')
  },
  methods: {
    closeModal: function (close) {
      this.showCreate = close
    },
    saveNewProduct: function (newProduct) {
      this.products.push(newProduct)
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
