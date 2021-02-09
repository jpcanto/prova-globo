<template>
  <v-main class="mb-10 elevation-3">
    <v-app-bar color="grey lighten-3" dark flat height="100">
      <template v-if="!isDesktop">
        <v-btn light outlined class="mx-2" large color="pink darken-1" @click.stop="menu = !menu">
          <v-icon color="pink darken-1">mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-container v-if="isDesktop" class="ma-0 align-center" fill-height fluid>
        <v-btn class="btn-gradient"></v-btn>

        <v-divider class="mx-8" color="grey" inset vertical></v-divider>

        <v-btn light class="btn">
          <v-icon color="grey darken-2">mdi-security</v-icon>
        </v-btn>
        <v-btn class="btn btn-gradient mr-5">
          <v-icon color="white">mdi-account</v-icon>
        </v-btn>

        <form @submit.prevent="setSearchBarFilter" class="mt-3">
          <v-text-field
            v-model="search"
            light
            label="Pesquisar..."
            class="mx-4"
            append-icon="mdi-magnify"
            @click:append="setSearchBarFilter"
          >
          </v-text-field>
        </form>

        <v-spacer></v-spacer>

        <v-btn light @click.stop="drawer = !drawer" class="btn mr-4 filter">
          <v-icon color="grey darken-1">mdi-tune</v-icon>
        </v-btn>

        <v-btn
          elevation="1"
          tile
          color="pink darken-1"
          class="btn user-btn text-body-2 pl-0 mr-6"
          @click="handleUser"
        >
          <v-icon class="ma-2 create-user">mdi-account </v-icon>
          INCLUIR USUÁRIO
        </v-btn>

        <v-divider class="mx-5" color="grey" inset vertical></v-divider>

        <v-btn icon>
          <v-icon color="grey darken-1" class="btn">mdi-home</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon color="grey darken-1" class="btn" @click="handleApiInfo">mdi-cog</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon color="grey darken-1" class="btn">mdi-power</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed right temporary color="grey lighten-3" width="30vw">
      <v-toolbar color="grey lighten-5" height="90" class="elevation-1">
        <v-icon color="grey darken-1" class="btn mr-2">mdi-tune</v-icon>
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
          color="pink darken-1"
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
          color="pink darken-1"
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
          color="pink darken-1"
          background-color="grey lighten-3"
          height="60"
          filled
          class="pl-4 pr-4"
        ></v-select>
      </v-container>
      <v-btn
        x-large
        outlined
        width="-webkit-fill-available"
        color="pink darken-1"
        class="ma-8"
        @click="setComboFilters"
      >
        APLICAR
      </v-btn>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="menu" fixed right temporary width="30vw">
      <v-toolbar color="grey lighten-5" height="90" class="elevation-1">
        <v-toolbar-title>MENU</v-toolbar-title>
        <v-btn small absolute right color="elevation-1" @click.stop="menu = !menu">X</v-btn>
      </v-toolbar>
      <v-btn
        elevation="1"
        tile
        color="pink darken-1"
        outlined
        class="btn user-btn text-body-2 pl-0 ma-6"
        @click="handleUser"
      >
        <v-icon class="ma-2 create-user">mdi-account </v-icon>
        INCLUIR USUÁRIO
      </v-btn>

      <v-btn
        elevation="1"
        tile
        color="pink darken-1"
        outlined
        class="btn user-btn text-body-2 pl-0 ma-6"
        @click.stop="
          drawer = !drawer;
          menu = !menu;
        "
      >
        <v-icon class="ma-2 create-user">mdi-tune </v-icon>
        FILTROS
      </v-btn>

      <form @submit.prevent="setSearchBarFilter" class="mt-3">
        <v-text-field
          v-model="search"
          light
          outlined
          clearable
          label="Pesquisar..."
          color="pink darken-1"
          class="mx-4"
          append-icon="mdi-magnify"
          @click:append="setSearchBarFilter"
        >
        </v-text-field>
      </form>
    </v-navigation-drawer>
  </v-main>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      isDesktop: this.$vuetify.breakpoint.mdAndUp,
      inclusionItems: [],
      alterationItems: [],
      activeItems: [],
      inclusion: [],
      alteration: [],
      actives: [],
      search: '',
      drawer: false,
      menu: false
    };
  },
  computed: {
    ...mapState({
      users: state => state.users
    }),
    ...mapGetters({
      newInclusionItems: 'getInclusionItems',
      newAlterationItems: 'getAlterationItems',
      newActiveItems: 'getActiveItems'
    })
  },
  watch: {
    newInclusionItems: function(value) {
      this.inclusionItems = value;
    },
    newAlterationItems: function(value) {
      this.alterationItems = value;
    },
    newActiveItems: function(value) {
      this.activeItems = value;
    }
  },
  methods: {
    setComboFilters() {
      console.log({
        inclusionDate: this.inclusion,
        alterationDate: this.alteration,
        status: this.actives
      });
      this.$store.commit('setUsersTableFilterCombo', {
        inclusionDate: this.inclusion,
        alterationDate: this.alteration,
        status: this.actives
      });

      if (this.drawer) this.drawer = false;
    },
    setSearchBarFilter() {
      this.$store.commit('setFilterUsersTableParam', this.search);
    },
    handleUser() {
      this.$store.dispatch('handleRow', {
        _id: 'default',
        email: 'default',
        name: 'default',
        inclusionDate: 'default',
        alterationDate: 'default',
        rules: 'default',
        status: 'default',
        show: false
      });
      this.$store.commit('toggleCrudDialog');
      this.$store.commit('setDialogType', 'create');
    },
    handleApiInfo() {
      this.$store.commit('toggleCrudDialog');
      this.$store.commit('setDialogType', 'api-info');
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  width: 25vw;
}

@media only screen and (max-width: 770px) {
  .v-sheet.v-app-bar.v-toolbar {
    height: 12vh !important;
  }
  .v-navigation-drawer {
    width: 50vw !important;
  }
}
@media only screen and (max-width: 420px) {
  .v-text-field {
    width: 80vw !important;
  }
  .v-navigation-drawer {
    width: 80vw !important;
  }
}

.v-text-field {
  max-width: 50vw;
}
.btn {
  border-radius: 5px;
  height: 45px !important;
  width: fit-content;

  & .v-icon.v-icon {
    font-size: 20px;
  }
}
.btn-gradient {
  background-image: linear-gradient(to right top, #dc375d, #ea434f, #f3543e, #f8672a, #f97b07);
}
.v-divider--vertical.v-divider--inset {
  border-color: rgb(228 228 228 / 87%);
  border-width: 1px;
  margin-top: 20px;
  max-height: calc(100% - 40px);
}
</style>
