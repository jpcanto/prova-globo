<template>
  <v-main class="auto">
    <v-data-table
      v-if="users.length"
      v-model="selected"
      :headers="headers"
      :items="users"
      :search="search"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      @page-count="pageCount = $event"
      show-select
      item-key="name"
      class="elevation-1 text-subtitle-2"
      hide-default-footer
    >
      <template v-slot:[`item.actions`]="{ item }">
        <template>
          <v-icon small class="ma-2" v-if="item.show" @click="handleUser('edit')">
            mdi-pencil
          </v-icon>
          <v-icon small class="ma-2" v-if="item.show" @click="handleUser('delete')">
            mdi-delete
          </v-icon>
        </template>
        <v-icon small class="ma-2" :class="{ disable: item.show }" @click="handleButtons(item)">
          mdi-dots-horizontal
        </v-icon>
      </template>
    </v-data-table>
    <v-pagination
      v-model="page"
      :length="pageCount"
      class="ma-8"
      color="pink darken-1"
    ></v-pagination>
  </v-main>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Table',

  data() {
    return {
      selected: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 4
    };
  },
  computed: {
    ...mapState({
      search: state => state.filterUsersTableParam,
      users: state => state.users,
      activeFilters: state => state.filterUsersTableCombo
    }),
    headers() {
      return [
        {
          text: 'USUÁRIO',
          sortable: false,
          value: 'name'
        },
        { text: 'EMAIL', sortable: false, value: 'email' },
        {
          text: 'DATA DE INCLUSÃO',
          align: 'center',
          sortable: false,
          value: 'inclusionDate',
          filter: value =>
            this.activeFilters.inclusionDate.length
              ? this.activeFilters.inclusionDate.includes(value)
              : true
        },
        {
          text: 'DATA DE ALTERAÇÃO',
          align: 'center',
          sortable: false,
          value: 'alterationDate',
          filter: value =>
            this.activeFilters.alterationDate.length
              ? this.activeFilters.alterationDate.includes(value)
              : true
        },
        { text: 'REGRAS', align: 'center', sortable: false, value: 'rules' },
        {
          text: 'STATUS',
          align: 'center',
          sortable: false,
          value: 'status',
          filter: value =>
            this.activeFilters.status.length ? this.activeFilters.status.includes(value) : true
        },
        { align: 'end', text: 'AÇÕES', sortable: false, value: 'actions', width: '10%' }
      ];
    }
  },
  methods: {
    handleButtons(currentRow) {
      this.$store.dispatch('handleRow', currentRow);
    },
    handleUser(type) {
      this.$store.commit('toggleCrudDialog');
      this.$store.commit('setDialogType', type);
    }
  }
};
</script>

<style scoped lang="scss">
.v-data-table {
  @media only screen and (min-width: 1024px) {
    width: 90vw;
    margin: auto;
  }
}
.v-main {
  padding: 32px;
  @media only screen and (max-width: 770px) {
    padding: 32px 0 !important;
  }
}
.disable {
  color: #e0e0e0 !important;
}
</style>
