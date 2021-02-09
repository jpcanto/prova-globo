<template>
  <v-main class="auto">
    <v-data-table
      v-if="users.length"
      v-model="selected"
      :headers="headers"
      :items="users"
      :search="search"
      :custom-filter="filter"
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
      color="pink accent-4"
      next-aria-label="Próximo"
    ></v-pagination>
  </v-main>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Table',

  data() {
    return {
      activeFilters: { inclusionDate: ['08/02/2021'], alterationDate: [], status: [] },
      selected: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 4
    };
  },
  computed: {
    ...mapState({
      search: state => state.filterUsersTableParam,
      users: state => state.users
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
          sortable: false,
          value: 'inclusionDate'
          // filter: value =>
          //   this.activeFilters.inclusionDate
          //     ? this.activeFilters.inclusionDate.includes(value)
          //     : true
        },
        {
          text: 'DATA DE ALTERAÇÃO',
          sortable: false,
          value: 'alterationDate'
          // filter: value =>
          //   this.activeFilters.alterationDate
          //     ? this.activeFilters.alterationDate.includes(value)
          //     : true
        },
        { text: 'REGRAS', sortable: false, value: 'rules' },
        {
          text: 'STATUS',
          sortable: false,
          value: 'status'
          // filter: value =>
          //   this.activeFilters.status ? this.activeFilters.status.includes(value) : true
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
