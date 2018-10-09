import Vue from 'vue'
import Vuex from 'vuex'
import locations from './modules/locations'
import products from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    locations,
    products
  }
})
