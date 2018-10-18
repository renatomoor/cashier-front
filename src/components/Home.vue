<template>
    <div class="home ">
        <h1 >{{ msg }}</h1>
          <div :name="link.name" v-for="link in links" :key="link.id">
            <router-link  :to="link.url">
              <button role="button" :href="link.url" class="btn btn-outline-dark w-75">
              {{link.name}}
              </button>
            </router-link>
          </div>
      </div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Caisse Area',
      links: [
        { id: 0, name: 'Locations', url: '/locations' },
        { id: 2, name: 'Products', url: '/products' }
      ]
    }
  },
  mounted () {
    this.$store.dispatch('locations/reload_locations')
    this.$store.dispatch('products/reload_products')
  }
}
</script>

<style scoped>
h1 {
  font-weight: normal;
  font-size: 8vw;
  margin-bottom: 8vh;
  text-align: center;
}
button {
  margin: 1.2vh;
  font-size: 5vw;
  border-radius: 50px;
}

.home {
  height: 70vh;
  margin-top: 10vh;
}
template div {
  background-color: #7f7f7f;
}
</style>
