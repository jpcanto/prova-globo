<template>
  <v-app>
    <v-main class="grey lighten-3">
      <Header />
      <Table />
    </v-main>
  </v-app>
</template>

<script>
import Table from './components/Table';
import Header from './components/Header';

export default {
  name: 'App',

  components: {
    Header,
    Table
  }
};
</script>
