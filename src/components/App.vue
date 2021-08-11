<template>
  <v-app>
    <Header :title="'Vue Movie App'" />
    <v-container class="text-center mx-auto">
      <Search :search="state.search" @search="handleSearch" />
    </v-container>
    <v-layout wrap>
      <v-container v-if="state.loading" class="text-center">
        <v-progress-circular
          indeterminate
          :size="150"
          :width="8"
          color="orange"
        >
        </v-progress-circular>
      </v-container>
      <v-container v-else-if="state.isData">
        <v-alert type="error">
          <v-row align="center" class="mx-auto">
            <v-col class="grow">
              There is no Movie with "{{ state.search }}" , please refresh your
              page or try to search again
            </v-col>
          </v-row>
        </v-alert>
      </v-container>
      <div v-else>
        <h2 class="white--text ml-3">Unlimited movies released in 2020</h2>
        <v-row no-gutters>
          <Movie
            v-for="movie in state.movies"
            :movie="movie"
            :key="movie.imdbID"
          />
        </v-row>
      </div>
    </v-layout>
    <Footer />
  </v-app>
</template>

<script>
import Header from "./Header.vue";
import Search from "./Search.vue";
import Movie from "./Movie.vue";
import Footer from "./Footer.vue";
import { useMovieApi } from "../hooks/movie-api";

export default {
  name: "App",
  components: { Header, Search, Movie, Footer },
  setup() {
    const state = useMovieApi();

    return {
      state,
      handleSearch(searchTerm) {
        state.loading = true;
        state.search = searchTerm;
        state.loading = false;
      },
    };
  },
};
</script>

<style>
/* new css for movie component */

* {
  box-sizing: border-box;
}
#app {
  background-color: #000000;
}
</style>
