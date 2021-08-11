<template>
  <v-card class="" width="100%">
    <v-footer class="text-center" color="secondary" dark>
      <v-card-text class="white--text">
        <strong>© {{ new Date().getFullYear() }} Movie App :</strong
        ><a
          class="github ml-2"
          href="https://github.com/ayselcavdar/vueflix"
          target="_blank"
          rel="noopener"
          >Aysel Cavdar</a
        >
      </v-card-text>
    </v-footer>
  </v-card>
</template>

<style scoped>
.github {
  text-decoration: none;
  color: #fff;
}
</style>
