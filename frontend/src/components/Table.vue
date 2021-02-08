<template>
  <v-main class="auto pa-8">
    <v-data-table
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
    <Dialog
      :user="clickedRow"
      :type="dialogType"
      :isVisible="openDialog"
      :key="openDialog"
      @update:isVisible="handleVisible"
    />
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex';
import { getUsers } from '../services/users';
import Dialog from './Dialog';

export default {
  name: 'Table',
  components: {
    Dialog
  },

  data() {
    return {
      selected: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 4,
      openDialog: false,
      dialogType: '',
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
      users: [{}]
    };
  },
  computed: {
    ...mapGetters({
      search: 'filterUsersTableParam'
    }),
    clickedRow() {
      return this.users.name
        ? this.users.find(row => row.show === true)
        : {
            _id: 'default',
            email: 'default',
            name: 'default',
            inclusionDate: 'default',
            alterationDate: 'default',
            rules: 'default',
            status: 'default',
            show: false
          };
    }
  },
  methods: {
    filter(value, search) {
      return value != null && search != null && value.indexOf(search) !== -1;
    },
    handleButtons(currentRow) {
      const rowWasClicked = this.users.find(row => row === currentRow);

      if (this.clickedRow && this.clickedRow === currentRow) {
        this.clickedRow.show = false;
        return;
      }
      if (this.clickedRow) this.clickedRow.show = false;

      rowWasClicked.show = !rowWasClicked.show;
    },
    handleUser(type) {
      this.openDialog = true;
      this.dialogType = type;
    },
    handleVisible(value) {
      this.openDialog = value;
    }
  },
  async mounted() {
    this.users = await getUsers();
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
