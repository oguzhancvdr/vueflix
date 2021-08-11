import { reactive, watchEffect } from "@vue/composition-api";
const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = "2d1f7d&y";
const year = "2020";
const type = "movie";

export const useMovieApi = () => {
  const state = reactive({
    search: "mulan",
    loading: true,
    isData: false,
    movies: [],
  });

  watchEffect(() => {
    const MOVIE_API_URL = `${BASE_URL}?s=${state.search}&apikey=${API_KEY}&y=${year}&type=${type}`;

    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === "True") {
          state.movies = jsonResponse.Search;
          state.loading = false;
          state.isData = false;
        } else {
          state.loading = false;
          state.isData = true;
        }
      })
      .catch((err) => console.log(err));
  });

  return state;
};
