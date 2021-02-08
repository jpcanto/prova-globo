<template>
  <v-app>
    <v-main class="grey lighten-2">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss">
.v-data-table tbody tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.074);
}
.v-data-table tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.054);
}
.v-data-table tbody tr.inactive {
  background-color: #fff;
  & td:not(:last-child) {
    opacity: 0.5;
  }
}
</style>
