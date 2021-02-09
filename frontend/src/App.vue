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
.v-navigation-drawer .v-label {
  color: #d81b60 !important;
}
.v-data-table {
  thead tr {
    th {
      &:first-of-type,
      &:last-of-type {
        padding: 0 30px !important;
      }
      &:first-of-type div {
        display: none;
      }
    }
  }
  tbody tr {
    &:nth-of-type(even) {
      background-color: #eaeaea;
    }
    &:nth-of-type(odd) {
      background-color: #f5f5f5;
    }

    td {
      font-size: 0.8rem !important;
      &:nth-child(7) {
        color: #4cc43c;
      }
      &:first-of-type,
      &:last-of-type {
        padding: 0 30px !important;
      }
      &:first-of-type {
        .v-icon.v-icon {
          color: transparent;
          font-size: 15px;

          background-color: #fff;
          border: 2px solid #eaeaea;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
