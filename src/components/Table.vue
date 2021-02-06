<template>
  <v-main class="auto pa-8">
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="users"
      :search="search"
      :custom-filter="filter"
      show-select
      item-key="name"
      class="elevation-1 text-subtitle-2"
      hide-default-footer
    >
      <template v-slot:[`item.actions`]="{ item }">
        <template>
          <v-icon small class="ma-2" v-if="item.show" @click="editUser(item)">
            mdi-pencil
          </v-icon>
          <v-icon small class="ma-2" v-if="item.show">
            mdi-delete
          </v-icon>
        </template>
        <v-icon small class="ma-2" :class="{ disable: item.show }" @click="handleButtons(item)">
          mdi-dots-horizontal
        </v-icon>
      </template>
    </v-data-table>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Table',

  data() {
    return {
      selected: [],
      headers: [
        {
          text: 'USUÁRIO',
          sortable: false,
          value: 'name'
        },
        { text: 'EMAIL', sortable: false, value: 'email' },
        { text: 'DATA DE INCLUSÃO', sortable: false, value: 'inclusionDate' },
        { text: 'DATA DE ALTERAÇÃO', sortable: false, value: 'alterationDate' },
        { text: 'REGRAS', sortable: false, value: 'rules' },
        { text: 'STATUS', sortable: false, value: 'status' },
        { align: 'end', text: 'AÇÕES', sortable: false, value: 'actions', width: '10%' }
      ],
      users: [
        {
          name: 'ANPINA',
          email: 'antonio.pina@tvglobo.com.br',
          inclusionDate: '28/05/2019',
          alterationDate: '30/05/2019',
          rules: '01',
          status: 'ATIVO',
          show: false
        },
        {
          name: 'CCHANG',
          email: 'ciro.chang@tvglobo.com.br',
          inclusionDate: '28/05/2019',
          alterationDate: '30/05/2019',
          rules: '01',
          status: 'ATIVO',
          show: false
        },
        {
          name: 'TMARCAL',
          email: 'thiago.marcal@tvglobo.com.br',
          inclusionDate: '28/05/2019',
          alterationDate: '30/05/2019',
          rules: '01',
          status: 'ATIVO',
          show: false
        },
        {
          name: 'ECGIANN',
          email: 'ecgianotto@tvglobo.com.br',
          inclusionDate: '28/05/2019',
          alterationDate: '30/05/2019',
          rules: '01',
          status: 'ATIVO',
          show: false
        },
        {
          name: 'YFERNAND',
          email: 'yuri.vasquez@tvglobo.com.br',
          inclusionDate: '28/05/2019',
          alterationDate: '30/05/2019',
          rules: '02',
          status: 'ATIVO',
          show: false
        },
        {
          name: 'PLACERDA',
          email: 'pedro.soares.lacerda@tvglobo.com.br',
          inclusionDate: '28/05/2019',
          alterationDate: '30/05/2019',
          rules: '02',
          status: 'ATIVO',
          show: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters({ search: 'filterUsersTableParam' })
  },
  methods: {
    filter(value, search) {
      return value != null && search != null && value.indexOf(search) !== -1;
    },
    handleButtons(currentRow) {
      const rowWasDisabled = this.users.find(row => row.show === true);
      const rowWasClicked = this.users.find(row => row === currentRow);

      if (rowWasDisabled && rowWasDisabled === currentRow) {
        rowWasDisabled.show = false;
        return;
      }
      if (rowWasDisabled) rowWasDisabled.show = false;

      rowWasClicked.show = !rowWasClicked.show;
    }
  }
};
</script>

<style scoped lang="scss">
.v-data-table {
  @media only screen and (min-width: 750px) {
    min-width: 90vw !important;
  }
}
.disable {
  color: #e0e0e0 !important;
}
</style>
