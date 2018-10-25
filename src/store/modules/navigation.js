
// initial state
const state = {
  title: '',
  showDrawerMenu: false,
  showDrawerRightMenu: false,
  right: null,
  drawer: false,
  drawerRight: false,
  goBack: false,
  payingType: null,
  location: null
}

// getters
const getters = {}

// actions
const actions = {
  startNav ({ commit }) {
    commit('START_NAV')
  }
}

// mutations
const mutations = {
  START_NAV (state) {
    state.title = ''
    state.drawer = false
    state.drawerRight = false
    state.goBack = false
    state.showDrawerMenu = false
    state.showDrawerRightMenu = false
    state.right = null
    state.payingType = null
    state.location = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
