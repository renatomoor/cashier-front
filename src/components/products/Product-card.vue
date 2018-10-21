<template>
  <!--<div class="">-->
      <!--<div class="card-body">-->
        <!--<h5 class="card-title">{{ product.name }}</h5>-->
        <!--<p class="card-text">Price: {{ product.price }}</p>-->
        <!--<button class="btn btn-outline-dark" @click="showModal=true">Edit</button>-->
      <!--</div>-->
      <!--<div v-if="showModal">-->
        <!--<transition name="modal">-->
          <!--<edit @changeStatus="updateStatus($event)"-->
                <!--@deleteComponent="deleteComponent($event)"-->
                <!--@save="save($event)"-->
                <!--:product="product"-->
                <!--:index="index"></edit>-->
        <!--</transition>-->
      <!--</div>-->
  <v-flex >
      <v-card>
        <v-toolbar color="#616161" dark>
          <v-btn color="red" v-if="edit" icon @click="deleteProduct">
            <v-icon>delete_forever</v-icon>
          </v-btn>
          <v-list-tile-sub-title>{{ product.name }}</v-list-tile-sub-title>
          <v-spacer></v-spacer>
          <v-btn v-if="!edit" @click="edit = true" icon>
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn v-if="edit" @click="cancel" icon outline color="red">
            <v-icon >cancel</v-icon>
          </v-btn>
          <v-btn v-if="edit" color="green" @click="save" icon>
            <v-icon>done</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list-tile v-if="!edit" avatar>
          <v-list-tile-content>
            <v-list-tile-sub-title>Price</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-sub-title>{{ product.price }} CHF</v-list-tile-sub-title>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile v-if="edit"  avatar>
          <v-list-tile-content>
            <v-list-tile-sub-title>Price</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-sub-title>
              <v-flex xs12>
                <v-text-field type="number" v-model="product.price"></v-text-field>
              </v-flex>
            </v-list-tile-sub-title>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile v-if="edit"  avatar>
          <v-list-tile-content>
            <v-list-tile-sub-title>Name:</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-sub-title>
              <v-flex xs12>
                <v-text-field  v-model="product.name"></v-text-field>
              </v-flex>
              </v-list-tile-sub-title>
          </v-list-tile-action>
        </v-list-tile>
      </v-card>
    </v-flex>
</template>
<script>
export default {
  name: 'product',
  data () {
    return {
      showModal: false,
      edit: false,
      oldProductName: '',
      oldProductPrice: 0
    }
  },
  methods: {
    updateStatus: function (updatedStatus) {
      this.showModal = updatedStatus
    },
    deleteComponent: function (index) {
      this.$emit('deleteComponent', index)
    },
    save: function () {
      let data = {
        index: this.index,
        product: this.product
      }
      this.edit = false
      this.$store.dispatch('products/save_product', data)
    },
    cancel: function () {
      this.product.name = this.oldProductName
      this.product.price = this.oldProductPrice
      this.edit = false
    },
    deleteProduct: function () {
      let data = {
        index: this.index,
        product: this.product
      }
      this.edit = false
      this.$store.dispatch('products/delete_product', data)
    }
  },
  mounted () {
    this.oldProductName = this.product.name
    this.oldProductPrice = this.product.price
  },
  props: ['product', 'index']
}
</script>

<style scoped>

</style>
