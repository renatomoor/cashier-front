<template>
  <v-flex xs12 md6 lg4>
    <v-card>
      <v-toolbar color="blue-grey" dark>
        <v-toolbar-title>{{ location.client.name + ' ' + location.client.last_name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="$router.push({ path: `/location/${location.location.code}` })" icon>
          <v-icon>send</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title><p class="text-xs-center">{{ location.location.hour_start }} - {{ location.location.hour_end }}</p></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title><p class="text-xs-center">Joueurs: {{ location.location.players }}</p></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title><p class="text-xs-center">{{ location.location.terrain.name }}</p></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title><p class="text-xs-center">{{ getTypeName }}</p></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list>
      <v-list-group
        :prepend-icon="'phone'"
        no-action>
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title><b><p class="text-xs-center">Contacter</p></b></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list two-line>
        <v-list-tile :href="'tel:' + location.client.phone">
          <v-list-tile-action>
            <v-icon color="indigo">phone</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-sub-title>{{ location.client.phone }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list two-line>
        <v-list-tile :href="'mailto:' + location.client.email">
          <v-list-tile-action>
            <v-icon color="indigo">mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-sub-title>{{ location.client.email }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      </v-list-group>
      </v-list>
    </v-card>
  </v-flex>
</template>
<script>
export default {
  name: 'location',
  props: ['location'],
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

</style>
