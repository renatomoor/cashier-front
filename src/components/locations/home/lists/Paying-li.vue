<template>
  <div>
    <li @click="showModal = true"
        class="list-group-item d-flex align-items-center">
      <span class="badge badge-quantity badge-pill mr-2">{{ product.products_in_payment }}</span>
      {{product.name}}
      <span class="badge badge-secondary badge-pill ml-auto">{{ product.products_in_payment * product.price + " CHF"}}</span>
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
import { mapActions } from 'vuex'
import PayingModal from '../modals/Paying-modal'
export default {
  name: 'Paying-li',
  components: { PayingModal, ToPayModal },
  data () {
    return {
      showModal: false,
      showModalPay: false
    }
  },
  methods: {
    ...mapActions('locations', ['pay_products']),
    closeModal () {
      this.showModal = false
    },
    closeModalToPay () {
      this.showModalPay = false
    },
    savePay () {}
  },
  props: ['product']
}
</script>

<style scoped>
.badge-quantity {
  background-color: rgba(176, 53, 62, 0.62);
  color: whitesmoke;
}
</style>
