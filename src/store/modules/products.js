import axios from 'axios'
const rootApi = process.env.ROOT_API + '/products'

// initial state
const state = {
  all: [],
  loading: false
}

// getters
const getters = {}

// actions
const actions = {
  reload_products ({ commit }) {
    if (state.all.length < 1) {
      state.loading = true
    }
    commit('refreshProducts')
  },
  delete_product ({ commit }, data) {
    commit('deleteProduct', data)
  },
  save_product ({ commit }, data) {
    commit('saveProduct', data)
  },
  create_product ({ commit }, data) {
    commit('createProduct', data)
  }
}

// mutations
const mutations = {
  refreshProducts (state) {
    axios.get(rootApi)
      .then(response => {
        state.all = response.data.products
        state.loading = false
      })
      .catch(e => {
        console.log(e)
        state.loading = false
      })
  },
  deleteProduct (state, data) {
    axios.delete(rootApi + '/' + data.product.id,
      {
        ok: 'true'
      })
      .then(reponse => {
        if (reponse) {
          state.all.splice(data.index, 1)
        }
      })
      .catch(e => {
        console.log(e)
      })
  },
  saveProduct (state, data) {
    axios.put(rootApi + '/' + data.product.id,
      {
        name: data.product.name,
        price: data.product.price
      })
      .then(response => {})
      .catch(e => {
        console.log(e)
      })
  },
  createProduct (state, data) {
    axios.post(rootApi,
      {
        icon_id: 5,
        name: data.product.name,
        price: data.product.price
      })
      .then(response => {
        state.all.push(response.data)
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
