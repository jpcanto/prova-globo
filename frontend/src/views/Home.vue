<template>
  <div class="home">
    <Header />
    <Table />
  </div>
</template>

<script>
import Table from '../components/Table';
import Header from '../components/Header';

export default {
  name: 'Home',
  components: {
    Header,
    Table
  }
};
</script>
