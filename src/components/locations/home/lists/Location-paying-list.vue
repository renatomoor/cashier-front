<template>
  <div class="col">
    <ul>
      <h5 class=" align-items-center list-group-item list-group-item-dark">Payment</h5>
      <PayingLi v-for="product in products"
               v-if="product.products_in_payment"
               :key="product.id"
               :product="product"
      ></PayingLi>
      <li class="list-group-item d-flex justify-content-between  list-group-item-dark align-items-center">
        <span>Total: </span><span class="badge badge-light badge-pill">{{ total + ' CHF'}}</span>
        <div v-show="total">
          <button type="button" class="btn btn-success btn-block">Payer</button>
        </div>
      </li>
    </ul>
  </div>
</template>
s
<script>
import PayingLi from './Paying-li'
export default {
  name: 'Location-paying-list',
  components: { PayingLi },
  computed: {
    total: function () {
      let total = 0
      this.products.forEach(function (product) {
        total += product.products_in_payment * product.price
      })
      return total
    }
  },
  props: ['products']
}
</script>

<style scoped>
</style>
