<template>
  <div class="card col-sm-12 col-md-4 col-lg-4 mx-auto">
    <div class="card-body">
      <h5 class="card-title">{{ location.client.name + ' ' + location.client.last_name }}</h5>
      <p class="card-text">Phone: {{ location.client.phone }}</p>
      <button class="btn btn-outline-dark">Edit</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'location',
  props: [
    'location'
  ]
}
</script>

<style scoped>

</style>
