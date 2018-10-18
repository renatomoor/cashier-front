<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="row p-3  ">
              <div class="col  m-auto">
                <h5 class=" align-items-center list-group-item list-group-item-dark">Payment</h5>
                <li class="list-group-item d-flex align-items-center">
                  <span class="badge badge-quantity-payment p-2 badge-pill mr-2">{{ product.products_in_payment }}</span>
                  {{ product.name }}
                </li>
                <p class=" align-items-center list-group-item list-group-item-dark">
                  Total: <span class="badge badge-secondary p-2 badge-pill ml-auto">
                  {{ product.products_in_payment === 'Vide' ? 0 + " CHF" : product.products_in_payment * product.price + " CHF"}}
                  </span>
                </p>
                <button type="button"
                        class="btn btn-warning w-100"
                        :class=" this.product.products_in_list === 'Vide' ? 'disabled' : ''"
                        @click="addToPayment"> > </button>
              </div>
            </div>
            <div  class="row p-3">
              <button type="button" class="btn btn-secondary m-3 col" @click="save">Terminée</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Paying-modal',
  data () {
    return {}
  },
  props: ['product'],
  methods: {
    closeModal: function () {
      this.$emit('close')
    },
    save: function () {
      this.$emit('save', this.add)
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.icon-menu-danger {
  color: #cc0000;
}
@media (max-width: 576px) {
  h5,
  p {
    font-size: 0.8em;
  }
  button {
    font-size: 0.7em;
  }
}
.exit-x {
  font-size: 1.4em;
}
</style>
