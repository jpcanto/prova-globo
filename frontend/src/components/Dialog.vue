<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">
          Use Google's location service?
        </v-card-title>

        <v-card-text>
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
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
