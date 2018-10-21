
// initial state
const state = {
  longMenuShow: false,
  clipped: false,
  leftMenuShow: false,
  drawer: false,
  fixedShow: false,
  fixed: false,
  items: [{
    icon: '',
    title: ''
  }],
  miniVariantShow: false,
  miniVariant: false,
  rightMenuShow: false,
  right: false,
  rightDrawer: false,
  title: '',
  goBack: false
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
    state.longMenuShow = false
    state.clipped = false
    state.leftMenuShow = false
    state.drawer = false
    state.fixedShow = false
    state.fixed = false
    state.items = [{
      icon: '',
      title: ''
    }]
    state.miniVariantShow = false
    state.miniVariant = false
    state.rightMenuShow = false
    state.right = false
    state.rightDrawer = false
    state.title = ''
    state.goBack = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
