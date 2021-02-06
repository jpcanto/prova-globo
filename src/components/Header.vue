<template>
  <v-main>
    <v-app-bar color="grey lighten-2" dark prominent flat>
      <v-container class="ma-0" fill-height fluid>
        <template>
          <v-text-field
            v-model="search"
            light
            full-width
            label="Pesquisar..."
            class="mx-4"
          ></v-text-field>
          <v-icon color="grey darken-2" @click="setFilters">mdi-magnify</v-icon>
        </template>

        <v-spacer></v-spacer>

        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>mdi-filter</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
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

          <v-btn x-large outlined color="pink accent-2">APLICAR</v-btn>
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
