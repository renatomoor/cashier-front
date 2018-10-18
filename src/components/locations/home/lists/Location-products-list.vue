<template>
  <div class="col">
    <ul>
      <h5 class=" align-items-center list-group-item list-group-item-dark">Products</h5>
      <products-li v-for="product in products"
      :product="product"
      :key="product.id"
      ></products-li>
    </ul>
  </div>
</template>

<script>
import ProductsModal from '../modals/Products-modal'
import Products from '../../../Products'
import ProductsLi from './Products-li'
export default {
  name: 'Location-products-list',
  components: { ProductsLi, Products, ProductsModal },
  props: ['products']
}
</script>

<style scoped>
li:hover {
  background-color: whitesmoke;
  cursor: pointer;
}
</style>
