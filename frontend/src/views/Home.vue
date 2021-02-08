<template>
  <div class="home">
    <Header />
    <Table />
    <Dialog :user="clickedRow" :type="dialogType" :key="openDialog" :isVisible="openDialog" />
    <Snackbar :info="snackInfo" :key="isSnackVisible" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

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
    ...mapState({
      openDialog: state => state.crudDialog,
      dialogType: state => state.dialogType,
      clickedRow: state => state.currentUser,
      snackInfo: state => state.snackBarStatus
    })
  },
  created() {
    this.$store.dispatch('requestUsers');
  }
};
</script>
