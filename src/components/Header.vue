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

    <v-navigation-drawer v-model="drawer" fixed right temporary width="30vw">
      <v-toolbar class="elevation-1">
        <v-toolbar-title>FILTROS</v-toolbar-title>
        <v-btn small color="elevation-1" @click.stop="drawer = !drawer">X</v-btn>
      </v-toolbar>
      <v-list>
        <v-list-item-group v-model="group" active-class="pink accent-2 text--accent-2">
          <v-list-item>
            <v-list-item-title>TODAS AS DATAS DE INCLUSÃO</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>TODAS AS DATAS DE ALTERAÇÃO</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>ATIVOS E INATIVOS</v-list-item-title>
          </v-list-item>

          <v-btn x-large outlined color="pink accent-4">APLICAR</v-btn>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-main>
</template>

<script>
export default {
  data: () => ({
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
