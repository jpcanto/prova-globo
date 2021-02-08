<template>
  <div class="home">
    <Header />
    <Table />
    <Dialog :user="clickedRow" :type="dialogType" :key="openDialog" :isVisible="openDialog" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Table from '../components/Table';
import Header from '../components/Header';
import Dialog from '../components/Dialog';

export default {
  name: 'Home',
  components: {
    Header,
    Table,
    Dialog
  },
  computed: {
    ...mapGetters({
      openDialog: 'showCrudDiaglog',
      dialogType: 'getDialogType',
      clickedRow: 'getCurrentUser'
    })
  },
  created() {
    this.$store.dispatch('requestUsers');
  }
};
</script>
