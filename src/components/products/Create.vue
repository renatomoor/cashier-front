<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header text-center">
            <h5 class="modal-title">{{ product.name ? 'Create Product: ' + product.name : 'Create Product'}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" @click="closeModal">&times;</span>
            </button>
          </div>
          <div v-if="loading" class="modal-body">
            <loader-modal></loader-modal>
          </div>
          <div v-if="loading === false" class="modal-body">
            Name: <input type="text" v-on:keyup.enter="save" v-model="product.name">
            <br><br>
            Price: <input type="number"  v-on:keyup.enter="save" v-model="product.price">
            <div  class="row p-3">
              <button type="button" class="btn btn-secondary m-3  col" @click="closeModal">Close</button>
              <button type="button" class="btn btn-primary m-3  col" @click="save">Save changes</button>
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

export default {
  name: 'Create',
  components: {LoaderModal},
  data () {
    return {
      showCreate: true,
      loading: false,
      product: {
        name: '',
        price: '',
        id: ''
      }
    }
  },
  methods: {
    closeModal: function () {
      this.$emit('closeModal', false)
    },
    save: function () {
      this.loading = true
      axios.post('http://dev-api-paintball.herokuapp.com/products',
        {
          icon_id: 5,
          name: this.product.name,
          price: this.product.price
        })
        .then(response => {
          // JSON responses are automatically parsed.
          this.product.id = response.data.id
          this.loading = false
          this.closeModal()
          this.$emit('saveNewProduct', this.product)
        })
        .catch(e => {
          console.log(e)
          this.loading = false
        })
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
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
</style>
