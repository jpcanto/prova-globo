<template>
  <v-main>
    <v-row justify="center">
      <v-dialog v-if="type === 'delete' || type === 'api-info'" v-model="dialog" max-width="390">
        <v-card v-if="type === 'delete'">
          <v-card-title class="headline">
            Deseja prosseguir com a deleção do usuário "{{ user.name }}" ?
          </v-card-title>

          <v-card-text>
            Ao prosseguir, todas as informações sobre esse usuário serão perdidas.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="pink darken-1" text @click="handleVisible">
              Cancelar
            </v-btn>

            <v-btn color="pink darken-1" text @click="handleClick">
              Deletar
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-card v-else>
          <v-card-title class="headline">
            Sobre o app
          </v-card-title>

          <v-card-text class="mt-6">
            <div><span class="green--text">API: </span> {{ API }}</div>
            <div><span class="green--text">Versão do app: </span> 1.0.0</div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green" text @click="handleVisible">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-else v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ tryMessage.catchText.toUpperCase() }} USUÁRIO</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Nome *" v-model="name" required class="name-input"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Email *" v-model="email" required class="email-input"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    type="number"
                    label="Regras *"
                    v-model="rules"
                    required
                    class="rules-input"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-select
                    v-model="status"
                    :items="['ATIVO', 'INATIVO']"
                    menu-props="auto"
                    label="Status"
                    color="pink darken-1"
                    background-color="white"
                    height="50"
                    filled
                    data-cy='status-input'
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <small>* indica campo obrigatório</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="pink darken-1" text @click="handleVisible">
              Cancelar
            </v-btn>
            <v-btn color="pink darken-1" text @click="handleClick">
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-main>
</template>

<script>
import { deleteUser, editUser, createUser } from '../services/users';

export default {
  props: ['user', 'type', 'isVisible'],
  data() {
    return {
      API: process.env.VUE_APP_API,
      name: this.user.name,
      email: this.user.email,
      rules: this.user.rules,
      status: this.user.status,
      menu: false,
      dialog: this.isVisible,
      id: this.user._id,
      snackInfo: {}
    };
  },
  computed: {
    tryMessage() {
      let tryText = '';
      let catchText = '';
      switch (this.type) {
        case 'delete':
          tryText = 'deletado';
          catchText = 'deletar';
          break;

        case 'edit':
          tryText = 'editado';
          catchText = 'editar';
          break;

        case 'create':
          tryText = 'criado';
          catchText = 'criar';
          break;
      }
      return { tryText: tryText, catchText: catchText };
    },
    reqBody() {
      return {
        name: this.name,
        email: this.email,
        inclusionDate:
          this.type === 'create' ? new Date().toLocaleDateString() : this.user.alterationDate,
        alterationDate: new Date().toLocaleDateString(),
        rules: this.rules.toString(),
        status: this.status,
        show: false
      };
    }
  },
  methods: {
    handleClick() {
      try {
        this.handleRequest();
        this.handleVisible();
        this.snackInfo = {
          text: `Usuário ${this.tryMessage.tryText} com sucesso`,
          show: true,
          error: false
        };
        this.$store.commit('setSnackbar', this.snackInfo);
      } catch (error) {
        this.handleVisible();
        this.snackInfo = {
          text: `Ocorreu um erro ao tentar ${this.catchMessage.catchText} o usuário, erro: ${error}`,
          show: true,
          error: true
        };
        this.$store.commit('setSnackbar', this.snackInfo);
      }
    },
    async handleRequest() {
      switch (this.type) {
        case 'delete':
          await deleteUser(this.id);
          break;

        case 'edit':
          await editUser(this.id, this.reqBody);
          break;

        case 'create':
          await createUser(this.reqBody);
          break;
      }
    },
    handleVisible() {
      this.$store.commit('toggleCrudDialog');
    }
  }
};
</script>
