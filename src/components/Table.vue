<template>
  <v-main class="auto pa-8">
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :search="search"
      :custom-filter="filter"
      show-select
      item-key="name"
      class="elevation-1 text-subtitle-2"
      hide-default-footer
    >
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
      desserts: [
        {
          name: 'ANPINA',
          email: 'antonio.pina@tvglobo.com.br',
          inclusionDate: '28/05/2019',
          alterationDate: '30/05/2019',
          rules: '01',
          status: 'ATIVO',
          actions: '...'
        },
        {
          name: 'CCHANG',
          email: 'ciro.chang@tvglobo.com.br',
          inclusionDate: '28/05/2019',
          alterationDate: '30/05/2019',
          rules: '01',
          status: 'ATIVO',
          actions: '...'
        },
        {
          name: 'TMARCAL',
          email: 'thiago.marcal@tvglobo.com.br',
          inclusionDate: '28/05/2019',
          alterationDate: '30/05/2019',
          rules: '01',
          status: 'ATIVO',
          actions: '...'
        },
        {
          name: 'ECGIANN',
          email: 'ecgianotto@tvglobo.com.br',
          inclusionDate: '28/05/2019',
          alterationDate: '30/05/2019',
          rules: '01',
          status: 'ATIVO',
          actions: '...'
        },
        {
          name: 'YFERNAND',
          email: 'yuri.vasquez@tvglobo.com.br',
          inclusionDate: '28/05/2019',
          alterationDate: '30/05/2019',
          rules: '02',
          status: 'ATIVO',
          actions: '...'
        },
        {
          name: 'PLACERDA',
          email: 'pedro.soares.lacerda@tvglobo.com.br',
          inclusionDate: '28/05/2019',
          alterationDate: '30/05/2019',
          rules: '02',
          status: 'ATIVO',
          actions: '...'
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
</style>
