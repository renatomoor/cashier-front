<template>
      <div class="">
        <nav class="navbar navbar-light bg-dark sticky-top">
          <li class="nav-item ">
            <router-link to="/"><font-awesome-icon class="icon-menu " icon="arrow-alt-circle-left" size="3x"></font-awesome-icon></router-link>
          </li>
          <li class="nav-item ">
            <h1 >{{ title }}</h1>
          </li>
          <li class="nav-item">
            <font-awesome-icon class="icon-menu" icon="plus" size="3x" @click="showCreate = true"></font-awesome-icon>
          </li>
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
                        v-bind:index="index"
                        v-on:deleteComponent="deleteComponent($event)">
              </product>
        </div>
      </div>
</template>
<script>
import axios from 'axios'
import Loader from './helpers/Loader'
import Product from './products/Product'
import router from '../router'
import Create from './products/Create'

export default {
  name: 'Products',
  router,
  components: {Create, Product, Loader},
  data () {
    return {
      loading: true,
      title: 'Product List',
      showCreate: false,
      products: []
    }
  },
  mounted () {
    this.loading = true
    axios.get('http://dev-api-paintball.herokuapp.com/products')
      .then(response => {
        // JSON responses are automatically parsed.
        this.products = response.data.products
        this.loading = false
      })
      .catch(e => {
        this.errors.push(e)
        this.loading = false
      })
  },
  methods: {
    deleteComponent: function (index) {
      this.products.splice(index, 1)
    },
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
  .icon-menu {
    color: #bec4cb;
  }
  .icon-menu:hover {
    color: white;
  }
  li{
    margin: 0;
  }
</style>
