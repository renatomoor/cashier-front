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
          <div v-if="loading" class="modal-body">
            <loaderModal></loaderModal>
          </div>
          <div v-if="deleteProduct == false && loading === false" class="modal-body">
              Name: <input type="text" v-on:keyup.enter="save" v-model="product.name">
              <br><br>
              Price: <input type="number"  v-on:keyup.enter="save" v-model="product.price">
              <div  class="row p-3">
                <button type="button" class="btn btn-danger text-center m-3 col" @click="deleteProduct = true" >Delete</button>
                <button type="button" class="btn btn-secondary m-3  col" @click="changeStatus">Close</button>
                <button type="button" class="btn btn-primary m-3  col" @click="save">Save changes</button>
              </div>
          </div>
          <div v-if="deleteProduct == true && loading === false" class="modal-body">
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
import axios from 'axios'
import LoaderModal from '../helpers/LoaderModal'
import Router from 'vue-router'
export default {
  name: 'Edit',
  Router,
  components: {LoaderModal},
  data () {
    return {
      showModal: true,
      loading: false,
      deleteProduct: false
    }
  },
  methods: {
    changeStatus: function () {
      this.$emit('changeStatus', false)
    },
    deleteComponent: function () {
      this.loading = true
      axios.delete('http://dev-api-paintball.herokuapp.com/products/' + this.product.id,
        {
          ok: 'true'
        })
        .then(reponse => {
          this.$emit('deleteComponent', this.index)
          this.loading = false
        })
        .catch(e => {
          this.errors.push(e)
        })
      this.loading = false
    },
    save: function () {
      this.loading = true
      axios.put('http://dev-api-paintball.herokuapp.com/products/' + this.product.id,
        {
          name: this.product.name,
          price: this.product.price
        })
        .then(response => {
          // JSON responses are automatically parsed.
          this.products = response.data.products
          this.loading = false
          this.changeStatus()
        })
        .catch(e => {
          this.errors.push(e)
          this.loading = false
          this.changeStatus()
        })
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

</style>
