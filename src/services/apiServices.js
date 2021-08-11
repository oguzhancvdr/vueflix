import axios from "axios";

const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = "2d1f7d&y";

export default {
  fetchSingleMovie(id) {
    const MOVIE_API_URL = `${BASE_URL}?i=${id}&apikey=${API_KEY}`;
    return axios
      .get(MOVIE_API_URL)
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.log(err));
  },
};
