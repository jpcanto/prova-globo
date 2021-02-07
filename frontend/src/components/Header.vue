<template>
  <v-main>
    <v-app-bar color="grey lighten-3" dark flat height="100px">
      <v-container class="ma-0 align-center" fill-height fluid>
        <form @submit.prevent="setFilters">
          <v-text-field
            v-model="search"
            light
            label="Pesquisar..."
            class="mx-4"
            append-icon="mdi-magnify"
            @click:append="setFilters"
          >
          </v-text-field>
        </form>

        <v-spacer></v-spacer>

        <v-btn light @click.stop="drawer = !drawer" class="btn mr-4">
          <v-icon color="grey darken-1">mdi-abacus</v-icon>
        </v-btn>

        <v-btn elevation="1" tile color="pink accent-4" class="btn user-btn text-body-2 pl-0 mr-6">
          <v-icon class="ma-2">mdi-account </v-icon>
          INCLUIR USUÁRIO
        </v-btn>

        <v-btn icon>
          <v-icon color="grey darken-1" class="btn">mdi-home</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon color="grey darken-1" class="btn">mdi-cog</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon color="grey darken-1" class="btn">mdi-power</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed right temporary color="grey lighten-3" width="30vw">
      <v-toolbar color="grey lighten-5" height="90" class="elevation-1">
        <v-icon color="grey darken-1" class="btn mr-2">mdi-abacus</v-icon>
        <v-toolbar-title>FILTROS</v-toolbar-title>
        <v-btn small absolute right color="elevation-1" @click.stop="drawer = !drawer">X</v-btn>
      </v-toolbar>
      <div class="grey--text font-italic ma-10">
        Utilize os filtros abaixo para refinar os resultados da tabela, clique no botão APLICAR para
        salvar as alterações.
      </div>
      <v-container class="mt-7">
        <v-select
          v-model="inclusion"
          :items="inclusionItems"
          menu-props="auto"
          label="TODAS AS DATAS DE INCLUSÃO"
          prepend-inner-icon="mdi-calendar"
          color="pink accent-4"
          background-color="grey lighten-3"
          height="60"
          filled
          class="pl-4 pr-4"
        ></v-select>
        <v-select
          v-model="alteration"
          :items="alterationItems"
          menu-props="auto"
          label="TODAS AS DATAS DE ALTERAÇÃO"
          prepend-inner-icon="mdi-calendar"
          color="pink accent-4"
          background-color="grey lighten-3"
          height="60"
          filled
          class="pl-4 pr-4"
        ></v-select>
        <v-select
          v-model="actives"
          :items="activeItems"
          menu-props="auto"
          label="ATIVOS E INATIVOS"
          prepend-inner-icon="mdi-dots-horizontal"
          color="pink accent-4"
          background-color="grey lighten-3"
          height="60"
          filled
          class="pl-4 pr-4"
        ></v-select>
      </v-container>
      <v-btn x-large outlined width="-webkit-fill-available" color="pink accent-4" class="ma-8"
        >APLICAR</v-btn
      >
    </v-navigation-drawer>
  </v-main>
</template>

<script>
import { getUsers } from '../services/users';
export default {
  data: () => ({
    inclusion: '',
    inclusionItems: [],
    alteration: '',
    alterationItems: [],
    actives: '',
    activeItems: [],
    search: '',
    drawer: false,
    group: null
  }),
  methods: {
    setFilters() {
      this.$store.dispatch('setFilterUsersTableParam', this.search);
    }
  },
  watch: {
    group() {
      this.drawer = false;
    }
  },
  async mounted() {
    const users = await getUsers();
    this.inclusionItems = [...new Set(users.map(u => u.inclusionDate))];
    this.alterationItems = [...new Set(users.map(u => u.alterationDate))];
    this.activeItems = [...new Set(users.map(u => u.status))];
  }
};
</script>

<style lang="scss" scoped>
form {
  width: 25vw;
}

.v-text-field {
  max-width: 50vw;
}
.btn {
  border-radius: 5px;
  height: 45px !important;
  width: fit-content;
}
</style>
