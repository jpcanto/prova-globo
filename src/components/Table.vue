<template>
  <v-main class="auto pa-8">
    <v-data-table
      :headers="headers"
      :items="desserts"
      item-key="name"
      show-select
      class="elevation-1 text-subtitle-2"
      hide-default-footer
    >
    </v-data-table>
  </v-main>
</template>

<script>
export default {
  name: 'Table',

  data() {
    return {
      headers: [
        {
          text: 'USUÁRIO',
          value: 'name'
        },
        { text: 'EMAIL', value: 'email' },
        { text: 'DATA DE INCLUSÃO', value: 'inclusionDate' },
        { text: 'DATA DE ALTERAÇÃO', value: 'alterationDate' },
        { text: 'REGRAS', value: 'rules' },
        { text: 'STATUS', value: 'status' },
        { text: 'AÇÕES', value: 'actions' }
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
