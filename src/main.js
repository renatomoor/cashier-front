// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import Vuetify from 'vuetify'
import {
  faArrowAltCircleLeft,
  faPlus,
  faExclamationTriangle,
  faMoneyCheckAlt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuex from 'vuex'
import store from './store'

Vue.use(Vuetify)
// Font awesome
library.add(
  faArrowAltCircleLeft,
  faPlus,
  faExclamationTriangle,
  faMoneyCheckAlt
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
