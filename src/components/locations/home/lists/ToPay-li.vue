<template>
  <div>
    <li @click="showModal = true"
        class="list-group-item d-flex align-items-center">
      <span class="badge badge-quantity badge-pill mr-2">{{ product.products_in_list }}</span>
      {{product.name}}
      <span class="badge badge-secondary badge-pill ml-auto">{{ product.products_in_list * product.price + " CHF"}}</span>
    </li>
    <div v-if="showModal">
      <transition name="modal">
        <to-pay-modal @close="closeModal()"
                      @save="save($event)"
                      :product="product">
        </to-pay-modal>
      </transition>
    </div>
  </div>
</template>

<script>
import ToPayModal from '../modals/ToPay-modal'
export default {
  name: 'ToPay-li',
  components: { ToPayModal },
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    closeModal () {
      this.showModal = false
    },
    save () {}
  },
  props: ['product']
}
</script>

<style scoped>
.badge-quantity {
  background-color: #5d5d5d;
  color: whitesmoke;
}
</style>
