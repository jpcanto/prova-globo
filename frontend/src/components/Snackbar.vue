<template>
  <div class="text-center">
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn :color="color" text v-bind="attrs" @click="handleClose">
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
      timeout: 3000
    };
  },
  computed: {
    snackbar() {
      return this.info.show;
    },
    text() {
      return this.info.text;
    },
    color() {
      return this.info.error ? 'red' : 'green';
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:info', { ...this.info, show: false });
    }
  }
};
</script>
