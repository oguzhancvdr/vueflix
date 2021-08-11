<template>
  <v-container class="d-flex justify-center">
    <form class="search">
      <v-text-field
        :rules="rules"
        :value="movieTitle"
        @keyup="handleChange"
        label="Search movie"
        single-line
        dense
        solo
      ></v-text-field>
    </form>
    <v-btn
      class="ml-4"
      color="secondary"
      depressed
      @click="handleSubmit"
      type="submit"
    >
      SEARCH
    </v-btn>
  </v-container>
</template>

<script>
import { ref } from "@vue/composition-api";

export default {
  name: "Search",
  props: ["search"],
  data: () => ({
    rules: [
      (value) => !!value || "Required.",
      (value) => (value || "").length <= 20 || "Max 100 characters",
    ],
  }),
  setup({ search }, { emit }) {
    const movieTitle = ref(search);

    return {
      movieTitle,
      handleSubmit(event) {
        event.preventDefault();
        emit("search", movieTitle.value.trim());
      },
      handleChange(event) {
        movieTitle.value = event.target.value.trim();
      },
    };
  },
};
</script>
