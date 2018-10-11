<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header text-center">
            <h5 class="modal-title "> {{product.name}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" @click="changeStatus">&times;</span>
            </button>
          </div>
          <div v-if="deleteProduct == false" class="modal-body">
              <p>Name: <input type="text" v-on:keyup.enter="save" v-model="product.name"></p>
              <p>Price: <input type="number"  v-on:keyup.enter="save" v-model="product.price"></p>
              <div  class="row p-3">
                <button type="button" class="btn btn-danger text-center m-3 col" @click="deleteProduct = true" >Delete</button>
                <button type="button" class="btn btn-secondary m-3  col" @click="changeStatus">Close</button>
                <button type="button" class="btn btn-primary m-3  col" @click="save">Save changes</button>
              </div>
          </div>
          <div v-if="deleteProduct == true" class="modal-body">
            <font-awesome-icon class="icon-menu-danger m-3" icon="exclamation-triangle" size="5x"></font-awesome-icon>
             <h3> Are you sure you wnat to delete {{ product.name }} ?</h3>
            <div  class="row p-3">
                <button type="button" class="btn btn-primary m-3  col" @click="deleteProduct = false">Back</button>
                <button type="button" class="btn btn-secondary m-3  col" @click="changeStatus">Close</button>
              <button type="button" class="btn btn-danger text-center m-3 col" @click="deleteComponent"> Delete </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoaderModal from '../helpers/LoaderModal'
import Router from 'vue-router'
export default {
  name: 'Edit',
  Router,
  components: {LoaderModal},
  data () {
    return {
      showModal: true,
      deleteProduct: false
    }
  },
  methods: {
    getdata: function () {
      let data = {
        'index': this.index,
        'product': this.product
      }
      return data
    },
    changeStatus: function () {
      this.$emit('changeStatus', false)
    },
    deleteComponent: function () {
      let data = this.getdata()
      this.$store.dispatch('products/delete_product', data)
      this.changeStatus()
    },
    save: function () {
      let data = this.getdata()
      this.$store.dispatch('products/save_product', data)
      this.changeStatus()
    }
  },
  props: [
    'product',
    'index'
  ]
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
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  .icon-menu-danger{
    color: #cc0000;
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
