import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Products from '@/components/Products'
import Locations from '@/components/Locations'
import CreateLocation from '@/components/CreateLocation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/locations',
      name: 'Locations',
      component: Locations
    },
    {
      path: '/create-location',
      name: 'CreateLocation',
      component: CreateLocation
    }
  ]
})
