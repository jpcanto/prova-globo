<template>
  <div class="home">
    <Header />
    <Table />
    <Dialog :user="clickedRow" :type="dialogType" :key="openDialog" :isVisible="openDialog" />
    <Snackbar :info="snackInfo" :key="isSnackVisible" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Table from '../components/Table';
import Header from '../components/Header';
import Dialog from '../components/Dialog';
import Snackbar from '../components/Snackbar';

export default {
  name: 'Home',
  components: {
    Header,
    Table,
    Dialog,
    Snackbar
  },
  computed: {
    ...mapGetters({
      openDialog: 'showCrudDiaglog',
      dialogType: 'getDialogType',
      clickedRow: 'getCurrentUser',
      snackInfo: 'getSnackBarStatus',
      isSnackVisible: 'isSnackVisible'
    })
  },
  created() {
    this.$store.dispatch('requestUsers');
  }
};
</script>
