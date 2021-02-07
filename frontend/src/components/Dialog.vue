<template>
  <v-main>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="290">
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
    </v-row>
    <Snackbar v-if="endRequest" :info="snackInfo" />
  </v-main>
</template>

<script>
import { deleteUser } from '../services/users';
import Snackbar from './Snackbar';
export default {
  props: ['user'],
  components: {
    Snackbar
  },
  data() {
    return {
      dialog: true,
      id: this.user._id,
      endRequest: false,
      snackInfo: {}
    };
  },
  methods: {
    async handleClick() {
      try {
        await deleteUser(this.id);
        this.dialog = false;
        this.endRequest = true;
        this.snackInfo = { text: 'Usuário deletado com sucesso', show: true, error: false };
      } catch (error) {
        this.dialog = false;
        this.endRequest = true;
        this.snackInfo = {
          text: `Ocorreu um erro ao tentar deletar o usuário, erro: ${error}`,
          show: true,
          error: true
        };
      }
    },
    handleVisible() {
      this.$emit('update:isVisible', false);
    }
  }
};
</script>
