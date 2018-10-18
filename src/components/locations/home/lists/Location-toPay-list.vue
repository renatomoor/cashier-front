<template>
  <div class="col">
    <ul>
      <h5 class=" align-items-center list-group-item list-group-item-dark">À payer</h5>
      <ToPayLi v-for="product in products"
               v-if="product.products_in_list"
               :key="product.id"
               :product="product"
      ></ToPayLi>
      <li class="list-group-item d-flex text-cente list-group-item-dark align-items-center">
        Total: <span class="badge badge-light badge-pill ml-auto">{{ total + ' CHF'}}</span>
      </li>
    </ul>
    <div v-if="showModalPay">
      <transition name="modalPay">
        <paying-modal @close="closeModalToPay()"
                      @save="savePay($event)"
                      :product="product">
        </paying-modal>
      </transition>
    </div>
  </div>
</template>

<script>
import ToPayLi from './ToPay-li'
export default {
  name: 'Location-toPay-list',
  components: { ToPayLi },
  computed: {
    total: function () {
      let total = 0
      this.products.forEach(function (product) {
        total += product.products_in_list * product.price
      })
      return total
    }
  },
  data () {
    return {
      showModal: false,
      showModalPay: false
    }
  },
  props: ['products']
}
</script>

<style scoped>
</style>
