<template>
  <div class="text-center">
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn :color="color" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: ['info'],
  data() {
    return {
      snackbar: this.info.show,
      text: this.info.text,
      color: this.info.error ? 'red' : 'green',
      timeout: 3000
    };
  }
};
</script>
