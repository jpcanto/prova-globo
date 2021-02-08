import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filterUsersTableParam: '',
    crudDialog: false,
    currentRow: {
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
    setCurrentRow: (state, payload) => (state.crudDialog = payload)
  },
  getters: {
    filterUsersTableParam: state => state.filterUsersTableParam,
    showCrudDiaglog: state => state.crudDialog,
    getCurrentRow: state => state.currentRow
  },
  actions: {
    setFilterUsersTableParam: ({ commit }, payload) => commit('setFilterUsersTableParam', payload),
    setCrudDialog: ({ commit }) => commit('setCrudDialog'),
    setCurrentRow: ({ commit }, payload) => commit('setCurrentRow', payload)
  }
});
