import Vue from 'vue'
import Vuex from 'vuex'
import locations from './modules/locations'
import products from './modules/products'
import navigation from './modules/navigation'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    locations,
    products,
    navigation
  }
})
