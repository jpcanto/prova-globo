<template>
  <div class="notfound">
    <v-img contain src="../assets/404.png"></v-img>
    <v-btn x-large absolute top outlined color="purple" light @click="handleClick" class="btn ma-10"
      >Voltar á Página inicial</v-btn
    >
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    handleClick() {
      return this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>
.v-image {
  height: 100vh;
  width: -webkit-fill-available;
}
</style>
