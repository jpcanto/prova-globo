<template>
  <v-main>
    <v-row justify="center">
      <v-dialog v-if="type === 'delete'" v-model="dialog" max-width="390">
        <v-card>
          <v-card-title class="headline">
            Deseja prosseguir com a deleção do usuário "{{ user.name }}" ?
          </v-card-title>

          <v-card-text>
            Ao prosseguir, todas as informações sobre esse usuário serão perdidas.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="pink accent-4" text @click="handleVisible">
              Cancelar
            </v-btn>

            <v-btn color="pink accent-4" text @click="handleClick">
              Deletar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-else v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ tryMessage.catchText }} usuário</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Nome *" v-model="name" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Email *" v-model="email" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    type="number"
                    label="Regras *"
                    v-model="rules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-select
                    v-model="status"
                    :items="['ATIVO', 'INATIVO']"
                    menu-props="auto"
                    label="Status"
                    color="pink accent-4"
                    background-color="white"
                    height="50"
                    filled
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <small>* indica campo obrigatório</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="pink accent-4" text @click="handleVisible">
              Cancelar
            </v-btn>
            <v-btn color="pink accent-4" text @click="handleClick">
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <Snackbar v-if="endRequest" :info="snackInfo" />
  </v-main>
</template>

<script>
import { deleteUser, editUser } from '../services/users';
import Snackbar from './Snackbar';
export default {
  props: ['user', 'type', 'isVisible'],
  components: {
    Snackbar
  },
  data() {
    return {
      name: this.user.name,
      email: this.user.email,
      rules: this.user.rules,
      status: this.user.status,
      menu: false,
      dialog: this.isVisible,
      id: this.user._id,
      endRequest: false,
      snackInfo: {}
    };
  },
  computed: {
    tryMessage() {
      let tryText = '';
      let catchText = '';
      switch (this.type) {
        case 'delete':
          tryText = 'deletando';
          catchText = 'deletar';
          break;

        case 'edit':
          tryText = 'editando';
          catchText = 'editar';
          break;

        case 'create':
          tryText = 'criando';
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
        this.endRequest = true;
        this.snackInfo = {
          text: `Usuário ${this.tryMessage.tryText} com sucesso`,
          show: true,
          error: false
        };
      } catch (error) {
        this.handleVisible();
        this.endRequest = true;
        this.snackInfo = {
          text: `Ocorreu um erro ao tentar ${this.catchMessage.catchText} o usuário, erro: ${error}`,
          show: true,
          error: true
        };
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
      }
    },
    handleVisible() {
      this.$emit('update:isVisible', !this.isVisible);
    }
  }
};
</script>
