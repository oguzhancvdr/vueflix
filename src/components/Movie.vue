<template>
  <v-row no-gutters>
    <v-col>
      <v-card
        class="my-3 mx-3 card-container"
        width="300"
        height="600"
        outlined
        shaped
      >
        <v-img
          v-if="movie.Poster !== 'N/A'"
          class="white--text align-end mt-2"
          :src="movie.Poster"
          :alt="altText"
          max-width="400"
          max-height="300"
          contain
        >
        </v-img>
        <v-img
          v-else
          class="white--text align-end"
          src="https://www.gursesgazetesi.com/images/haberler/2020/07/imdb-nedir-ne-demektir-imdb-acilimi.jpg"
          :alt="altText"
          max-width="400"
          height="300"
        >
        </v-img>
        <v-card-title class="text-center"> {{ movie.Title }}</v-card-title>
        <v-card-subtitle class="pb-0 mt-1 white--text">
          <span class="mr-2"><b>Year:</b></span
          >{{ movie.Year }}</v-card-subtitle
        >
        <v-card-subtitle class="pb-0 mt-1 text-capitalize white--text">
          <span class="mr-2"><b>Type:</b></span
          >{{ movie.Type }}</v-card-subtitle
        >
        <v-card-subtitle class="pb-0 mt-1 white--text">
          <span class="mr-2"><b>imdbID:</b></span
          >{{ movie.imdbID }}</v-card-subtitle
        >
        <v-card-actions class="justify-center">
          <v-btn
            color="orange mb-2"
            style="position: absolute; bottom: 0"
            @click="handleDetail(movie.imdbID)"
            @click.stop="dialog = true"
          >
            Explore
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-dialog v-model="dialog" max-width="400">
      <v-container v-if="loading" class="text-center" style="min-height: 500px">
        <v-progress-circular
          indeterminate
          :size="100"
          :width="6"
          color="orange"
        >
        </v-progress-circular>
      </v-container>
      <v-card v-else>
        <v-img
          v-if="singleMovie.Poster !== 'N/A'"
          class="white--text align-end"
          height="350"
          :src="singleMovie.Poster"
        >
          <v-card-title>
            <div class="imdb-container">
              <v-icon color="#E2B616" size="20px">mdi-star</v-icon>
              {{
                singleMovie.imdbRating !== "N/A"
                  ? singleMovie.imdbRating
                  : "0.0"
              }}
            </div>
          </v-card-title>
        </v-img>
        <v-img
          v-else
          class="white--text align-end"
          height="350"
          src="https://www.gursesgazetesi.com/images/haberler/2020/07/imdb-nedir-ne-demektir-imdb-acilimi.jpg"
        >
          <v-card-title>
            <div class="imdb-container">
              <v-icon color="#E2B616" size="20px"> mdi-star </v-icon>
              {{
                singleMovie.imdbRating !== "N/A"
                  ? singleMovie.imdbRating
                  : "0.0"
              }}
            </div>
          </v-card-title>
        </v-img>
        <v-card-title style="font-size: 1.05rem"
          >{{
            singleMovie.Title !== "N/A"
              ? singleMovie.Title
              : "No Title information"
          }}-{{ singleMovie.Year != "N/A" ? singleMovie.Year : null }}
        </v-card-title>
        <v-card-text>{{
          singleMovie.Plot !== "N/A" ? singleMovie.Plot : "No description"
        }}</v-card-text>

        <v-card-subtitle class="pb-0 mt-1">
          <span class="mr-2"><b>Genre:</b></span
          >{{
            singleMovie.Genre !== "N/A" ? singleMovie.Genre : "No information"
          }}</v-card-subtitle
        >

        <v-card-subtitle class="pb-0 mt-1">
          <span class="mr-2"><b>Country:</b></span
          >{{
            singleMovie.Country !== "N/A"
              ? singleMovie.Country
              : "No information"
          }}</v-card-subtitle
        >

        <v-card-subtitle class="pb-0 mt-1">
          <span class="mr-2"><b>Actors:</b></span
          >{{
            singleMovie.Actors !== "N/A" ? singleMovie.Actors : "No information"
          }}</v-card-subtitle
        >

        <v-card-subtitle class="pb-0 mt-1">
          <span class="mr-2"><b>Director:</b></span
          >{{
            singleMovie.Director !== "N/A"
              ? singleMovie.Director
              : "No information"
          }}</v-card-subtitle
        >

        <v-card-subtitle class="pb-0 mt-1">
          <span class="mr-2"><b>Run time:</b></span
          >{{
            singleMovie.Runtime !== "N/A"
              ? singleMovie.Runtime
              : "No information"
          }}</v-card-subtitle
        >

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange darken-1" @click="dialog = false"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { computed } from "@vue/composition-api";
import apiService from "../services/apiServices";

export default {
  name: "Movie",
  props: ["movie"],
  data() {
    return {
      dialog: false,
      loading: true,
      singleMovie: "",
    };
  },
  setup({ movie }) {
    const altText = computed(() => `The movie titled: ${movie.Title}`);
    return {
      altText,
      async handleDetail(id) {
        this.dialog = true;
        await apiService
          .fetchSingleMovie(id)
          .then((res) => (this.singleMovie = res));
        this.loading = false;
      },
    };
  },
};
</script>

<style scoped>
.card-container {
  background: #1a1a1a;
  color: orange;
}
.imdb-container {
  width: 65px;
  height: 37px;
  background-color: #43a047;
  border-bottom-left-radius: 10px;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
