<template>
  <v-content>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs1>
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'loader'
}
</script>

<style scoped>

</style>
