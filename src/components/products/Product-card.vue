<template>
    <div class="card col-6 col-lg-4">
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text">Price: {{ product.price }}</p>
        <button class="btn btn-outline-dark" @click="showModal=true">Edit</button>
      </div>
      <div v-if="showModal">
        <transition name="modal">
          <edit v-on:changeStatus="updateStatus($event)"
                v-on:deleteComponent="deleteComponent($event)"
                v-on:save="save($event)"
                v-bind:product="product"
                v-bind:index="index"></edit>
        </transition>
      </div>
    </div>
</template>
<script>
import Edit from './Edit-modal'
export default {
  name: 'product',
  components: {Edit},
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    updateStatus: function (updatedStatus) {
      this.showModal = updatedStatus
    },
    deleteComponent: function (index) {
      this.$emit('deleteComponent', index)
    },
    save: function (data) {
      this.$store.dispatch('products/save_product', data)
    }
  },
  props: [
    'product',
    'index'
  ]
}
</script>

<style scoped>
  .card:hover {
    background-color: #eeeeee;
  }
  @media (max-width: 576px) {
      h5, p {
        font-size: 0.8em;
      }
      button {
        font-size: 0.7em;
      }
  }

</style>
