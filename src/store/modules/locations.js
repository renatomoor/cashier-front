import axios from 'axios'
const rootApi = process.env.ROOT_API + 'clients'

// initial state
const state = {
  all: [],
  loading: false
}

// getters
const getters = {}

// actions
const actions = {
  reload_location ({ commit }) {
    if (state.all.length < 1) {
      state.loading = true
    }
    commit('refresh_location')
  }
}

// mutations
const mutations = {
  refresh_location (state) {
    axios.get(rootApi + '/2018-10-06')
      .then(response => {
        state.all = response.data
        state.loading = false
      })
      .catch(e => {
        console.log(e)
        state.loading = false
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
