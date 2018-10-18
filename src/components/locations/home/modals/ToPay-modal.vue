<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="row p-3  ">
              <div class="col  m-auto">
                <h5 class=" align-items-center list-group-item list-group-item-dark">Suprimer</h5>
                <li class="list-group-item d-flex align-items-center">
                  <span class="badge badge-quantity p-2 badge-pill mr-2">{{ newDeleteValue }}</span>
                  {{ product.name }}
                </li>
                <p class=" align-items-center list-group-item list-group-item-dark">
                  Total: <span class="badge badge-secondary p-2 badge-pill ml-auto">
                  {{ newDeleteValue ? newDeleteValue * product.price + " CHF" : 0 + " CHF"}}
                  </span>
                </p>
                <button type="button"
                          class="btn btn-warning col"
                          :class=" newDeleteValue ? '' : 'disabled'"
                          @click="addToListFromDelete"> > </button>
              </div>
              <div class="col  m-auto">
                <h5 class=" align-items-center list-group-item list-group-item-dark">À payer</h5>
                <li class="list-group-item d-flex align-items-center">
                  <span class="badge badge-quantity p-2 badge-pill mr-2">{{ newListValue }}</span>
                  {{ product.name }}
                  <span :class="rpil > 0 ? 'badge-danger' : 'badge-success'"
                        v-if="rpil > 0 || apil > 0"></span>
                </li>
                <p class=" align-items-center list-group-item list-group-item-dark">
                  Total: <span class="badge badge-secondary p-2 badge-pill ml-auto">
                  {{ newListValue ? newListValue * product.price + " CHF" : 0 + " CHF"}}
                  </span>
                </p>
                <div class="row m-auto">
                <button type="button"
                        class="btn mr-1 btn-danger col"
                        :class=" newListValue ? '' : 'disabled'"
                        @click="addToDelete"> &lt; </button>
                <button type="button"
                        class="btn btn-warning col"
                        :class=" newListValue ? '' : 'disabled'"
                        @click="addToPayment"> > </button>
                </div>
              </div>
              <div class="col  m-auto">
                <h5 class=" align-items-center list-group-item list-group-item-dark">Payment</h5>
                <li class="list-group-item d-flex align-items-center">
                  <span class="badge badge-quantity-payment p-2 badge-pill mr-2">{{ newToPayValue }}</span>
                  {{ product.name }}
                </li>
                <p class=" align-items-center list-group-item list-group-item-dark">
                  Total: <span class="badge badge-secondary p-2 badge-pill ml-auto">
                  {{ newToPayValue ? newToPayValue * product.price + " CHF" : 0 + " CHF" }}
                  </span>
                </p>
                <button type="button"
                        class="btn btn-warning w-100"
                        :class=" newToPayValue ? '' : 'disabled'"
                        @click="addToList"> &lt; </button>
              </div>
            </div>
            <div  class="modal-footer mt-3">
              <button type="button" class="btn btn-danger p-2" @click="$emit('close')">Canceler</button>
              <button type="button" class="btn btn-success p-2" @click="save">Ajouter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ToPay-modal',
  data () {
    return {
      id: this.product.id,
      code: this.$route.params.code,
      oldListValue: 0,
      oldToPayValue: 0,
      newToPayValue: 0,
      newListValue: 0,
      newDeleteValue: 0,
      apil: 0,
      apip: 0,
      rpil: 0,
      rpip: 0,
      firsttime: 0
    }
  },
  props: ['product'],
  mounted () {
    this.oldListValue = this.product.products_in_list
    this.newListValue = this.product.products_in_list
    this.oldToPayValue = this.product.products_in_payment
    this.newToPayValue = this.product.products_in_payment
    this.data.code = this.code
    this.data.id = this.product.id
  },
  watch: {
    newListValue (newValue, oldValue) {
      if (newValue > oldValue && this.firsttime > 0) {
        if (this.rpil > 0) {
          this.rpil--
        } else {
          this.apil++
        }
      }
      if (newValue < oldValue && this.firsttime > 0) {
        if (this.apil > 0) {
          this.apil--
        } else {
          this.rpil++
        }
      }
    },
    newToPayValue (newValue, oldValue) {
      if (newValue > oldValue && this.firsttime > 0) {
        if (this.rpip > 0) {
          this.rpip--
        } else {
          this.apip++
        }
      }
      if (newValue < oldValue && this.firsttime > 0) {
        if (this.apip > 0) {
          this.apip--
        } else {
          this.rpip++
        }
      }
    }
  },
  methods: {
    ...mapActions('locations', ['update_locations_products']),
    save: function () {
      const dataToSend = {
        add: {
          products_in_list: this.apil,
          products_in_payment: this.apip
        },
        remove: {
          products_in_list: this.rpil,
          products_in_payment: this.rpip
        },
        code: this.code,
        id: this.product.id
      }
      this.product.products_in_list = this.newListValue
      this.product.products_in_payment = this.newToPayValue
      console.log(dataToSend)
      this.update_locations_products(dataToSend)
      this.$emit('close')
    },
    addToPayment: function () {
      this.firsttime = 1
      if (this.newListValue) {
        this.newListValue--
        this.newToPayValue++
      }
    },
    addToList: function () {
      this.firsttime = 1
      if (this.newToPayValue) {
        this.newListValue++
        this.newToPayValue--
      }
    },
    addToDelete: function () {
      this.firsttime = 1
      if (this.newListValue) {
        this.newDeleteValue++
        this.newListValue--
      }
    },
    addToListFromDelete: function () {
      this.firsttime = 1
      if (this.newDeleteValue) {
        this.newListValue++
        this.newDeleteValue--
      }
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
.modal-dialog {
  max-width: 85%;
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
.badge-quantity {
  background-color: #5d5d5d;
  color: whitesmoke;
}

.badge-quantity-payment {
  background-color: rgba(176, 53, 62, 0.62);
  color: whitesmoke;
}
.disabled {
  opacity: 0.3;
}
</style>
