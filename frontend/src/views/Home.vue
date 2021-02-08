<template>
  <div class="home">
    <Header />
    <Table />
    <Dialog :user="clickedRow" :type="dialogType" :key="openDialog" :isVisible="openDialog" />
    <Snackbar :info.sync="snackInfo" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

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
      isSnackVisible: 'isSnackVisible'
    }),
    ...mapState({
      openDialog: state => state.crudDialog,
      dialogType: state => state.dialogType,
      clickedRow: state => state.currentUser
    }),
    snackInfo: {
      get() {
        return this.$store.state.snackBarStatus;
      },
      set(newValue) {
        this.$store.commit('setSnackbar', newValue);
      }
    }
  },
  created() {
    this.$store.dispatch('requestUsers');
  }
};
</script>
