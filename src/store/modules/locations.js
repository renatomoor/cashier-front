import axios from 'axios'
import Vue from 'vue'

const rootApiLocation = process.env.ROOT_API + 'clients/2018-10-06'
const rootApiLocationByCode = process.env.ROOT_API + 'locations/'
const rootApiLocationProducts = process.env.ROOT_API + 'locations/products/'
// initial state
const state = {
  all: [],
  loading: false
}

// getters
const getters = {}

// actions
const actions = {
  reload_locations ({ commit }) {
    if (state.all.length < 1) {
      state.loading = true
    }
    commit('refresh_locations')
  },
  reload_location_by_code ({ commit }, code) {
    commit('refresh_location_by_code', code)
  },
  update_locations_products ({ commit }, data) {
    commit('actualize_products', data)
  },
  pay_products ({ commit }, data) {
    commit('pay_products', data)
  }
}

// mutations
const mutations = {
  refresh_locations (state) {
    axios
      .get(rootApiLocation)
      .then(response => {
        state.all = response.data
        state.loading = false
      })
      .catch(e => {
        console.log(e)
        state.loading = false
      })
  },
  refresh_location_by_code (state, code) {
    if (state[code] === undefined) {
      state.loading = true
    }
    if (!state.hasOwnProperty(code)) {
      Vue.set(state, code, '')
    }
    axios
      .get(rootApiLocationByCode + code)
      .then(response => {
        Vue.set(state, code, response.data)
        state.loading = false
      })
      .catch(e => {
        console.log(e)
        state.loading = false
      })
  },
  actualize_products (state, data) {
    let dataForAxios = {
      add: {
        products_in_list: data.add.products_in_list,
        products_in_payment: data.add.products_in_payment
      },
      remove: {
        products_in_list: data.remove.products_in_list,
        products_in_payment: data.remove.products_in_payment
      }
    }
    axios
      .put(rootApiLocationProducts + data.code + '/' + data.id, dataForAxios)
      .then(response => {})
      .catch(e => {
        console.log(e)
      })
  },
  pay_products (state, data) {
    axios
      .post(rootApiLocationProducts + data.code + '/' + data.id, data.products)
      .then(response => {
        console.log('Payment')
      })
      .catch(e => {
        console.log(e)
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
