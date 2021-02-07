<template>
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

          <v-btn color="pink accent-4" text @click="dialog = false">
            Cancelar
          </v-btn>

          <v-btn color="pink accent-4" text @click="handleClick">
            Deletar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { deleteUser } from '../services/users';
export default {
  props: ['user'],
  data() {
    return {
      dialog: true,
      id: this.user._id
    };
  },
  methods: {
    async handleClick() {
      await deleteUser(this.id);
    }
  }
};
</script>
