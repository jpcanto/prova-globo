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
    }
  },
  mutations: {
    setFilterUsersTableParam: (state, payload) => (state.filterUsersTableParam = payload),
    setCrudDialog: state => (state.crudDialog = !state.crudDialog),
    setDialogType: (state, payload) => (state.dialogType = payload),
    requestUsers: async state => (state.users = await getUsers()),
    setCurrentUser: (state, payload) => {
      const showedRow = state.users.find(user => user.show === true);
      const user = state.users.find(user => user === payload);

      if (showedRow && showedRow === payload) {
        showedRow.show = false;
        return;
      }
      if (showedRow) showedRow.show = false;

      if (user) user.show = !user.show;
      state.currentUser = payload;
    }
  },
  getters: {
    filterUsersTableParam: state => state.filterUsersTableParam,
    showCrudDiaglog: state => state.crudDialog,
    getDialogType: state => state.dialogType,
    getCurrentUser: state => state.currentUser,

    getInclusionItems: state => [...new Set(state.users.map(u => u.inclusionDate))],
    getAlterationItems: state => [...new Set(state.users.map(u => u.alterationDate))],
    getActiveItems: state => [...new Set(state.users.map(u => u.status))]
  },
  actions: {
    setFilterUsersTableParam: ({ commit }, payload) => commit('setFilterUsersTableParam', payload),
    setCrudDialog: ({ commit }) => commit('setCrudDialog'),
    setDialogType: ({ commit }, payload) => commit('setDialogType', payload),
    setCurrentUser: ({ commit }, payload) => commit('setCurrentUser', payload),
    requestUsers: ({ commit }) => commit('requestUsers')
  }
});
