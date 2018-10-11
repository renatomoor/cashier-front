<template>
  <div class="card col-6 col-lg-4">
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
  @media (max-width: 576px) {
    h5, p {
      font-size: 0.8em;
    }
    button {
      font-size: 0.7em;
    }
  }
</style>
