<template>
  <div class="card col-12 col-sm-6 col-lg-4">
    <div class="card-body">
      <h5 class="card-title">{{ location.client.name + ' ' + location.client.last_name }}</h5>
      <span class="card-text"><a :href="'tel:' + location.client.phone">{{ location.client.phone }}</a></span><br>
      <span class="card-text"><a :href="'mailto:' + location.client.email">{{ location.client.email }}</a></span><br><br>
      <span class="card-text">{{ location.location.hour_start }} - {{ location.location.hour_end }}</span><br>
      <span class="card-text">Joueurs: {{ location.location.players }}</span><br>
      <span class="card-text">{{ location.location.terrain.name }}</span><br>
      <span class="card-text">{{ getTypeName }}</span><br><br>
      <button class="btn btn-outline-dark"><font-awesome-icon class="w-75 icon" icon="money-check-alt" size="2x"></font-awesome-icon></button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'location',
  props: [
    'location'
  ],
  computed: {
    getTypeName: function () {
      let name = this.location.location.type.name
      if (name === 'paintball') {
        name = 'Adulte'
      }
      return name.charAt(0).toUpperCase() + name.slice(1)
    }
  }
}
</script>

<style scoped>
  @media (max-width: 576px) {
    h5, span {
      font-size: 0.8em;
    }
    button {
      font-size: 0.7em;
    }
  }
  a {
    text-decoration: none;
    color: black;
  }
  button .icon {
    color: #5d5d5d;
  }
  button .icon:hover {
    color: white;
  }
  .card:hover {
    background-color: #eeeeee;
  }

</style>
