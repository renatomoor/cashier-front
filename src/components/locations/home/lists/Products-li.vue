<template>
  <div>
    <li @click="showModal = true"
        class="list-group-item d-flex justify-content-between align-items-center">
      {{product.name}}
      <span class="badge badge-light badge-pill">{{ product.price + ' CHF'}}</span>
    </li>
    <div v-if="showModal">
      <transition name="modal">
        <ProductsModal @close="closeModal()"
                       @save="save($event)"
                       :product="product">
        </ProductsModal>
      </transition>
    </div>
  </div>
</template>

<script>
import ProductsModal from '../modals/Products-modal'
export default {
  name: 'Products-li',
  components: { ProductsModal },
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    closeModal () {
      this.showModal = false
    },
    save (add) {
      this.product.products_in_list += parseInt(add)
      this.closeModal()
    }
  },
  props: ['product']
}
</script>

<style scoped>
</style>
