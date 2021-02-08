import Vue from 'vue';
import Vuex from 'vuex';
import { getUsers } from '../services/users';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filterUsersTableParam: '',
    crudDialog: false,
    dialogType: '',
    users: [{}],
    currentUser: {
      _id: 'default',
      email: 'default',
      name: 'default',
      inclusionDate: 'default',
      alterationDate: 'default',
      rules: 'default',
      status: 'default',
      show: false
    },
    snackBarStatus: {}
  },

  mutations: {
    setFilterUsersTableParam: (state, payload) => (state.filterUsersTableParam = payload),
    toggleCrudDialog: state => (state.crudDialog = !state.crudDialog),
    setDialogType: (state, payload) => (state.dialogType = payload),
    setUsers: (state, payload) => (state.users = payload),
    setCurrentUser: (state, payload) => (state.currentUser = payload),
    setSnackbar: (state, payload) => (state.snackBarStatus = payload)
  },

  getters: {
    isSnackVisible: state => state.snackBarStatus.show,
    getInclusionItems: state => [...new Set(state.users.map(u => u.inclusionDate))],
    getAlterationItems: state => [...new Set(state.users.map(u => u.alterationDate))],
    getActiveItems: state => [...new Set(state.users.map(u => u.status))]
  },

  actions: {
    requestUsers: async ({ commit }) => {
      const request = await getUsers();
      commit('setUsers', request);
    },
    setSnackbar: ({ commit }, payload) => commit('setSnackbar', payload),
    handleRow: ({ commit, state }, payload) => {
      const showedRow = state.users.find(user => user.show === true);
      const user = state.users.find(user => user === payload);

      if (showedRow && showedRow === payload) {
        showedRow.show = false;
        return;
      }

      if (showedRow) showedRow.show = false;

      if (user) user.show = !user.show;

      commit('setCurrentUser', payload);
    }
  }
});
