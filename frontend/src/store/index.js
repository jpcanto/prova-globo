import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: { filterUsersTableParam: '' },
  mutations: {
    setFilterUsersTableParam: (state, payload) => (state.filterUsersTableParam = payload)
  },
  getters: {
    filterUsersTableParam: state => state.filterUsersTableParam
  },
  actions: {
    setFilterUsersTableParam: (context, payload) => context.commit('setFilterUsersTableParam', payload)
  }
});
