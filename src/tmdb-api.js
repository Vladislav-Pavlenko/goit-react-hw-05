import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/";
const options = {
  params: { api_key: "e5025a9292a56b18502e1308d641515f" },
};

export async function fetchFilms() {
  const result = await axios.get(
    `3/trending/movie/day?language=en-US`,
    options
  );
  return result.data;
}

export async function fetchFilmsByNavigationId(movieId) {
  const result = await axios.get(`3/movie/${movieId}?language=en-US`, options);
  return result.data;
}

export async function fetchCreditsByNavigationId(movieId) {
  const result = await axios.get(
    `3/movie/${movieId}/credits?language=en-US`,
    options
  );
  return result.data;
}
export async function fetchReviewsByNavigationId(movieId) {
  const result = await axios.get(
    `3/movie/${movieId}/reviews?language=en-US&page=1`,
    options
  );
  return result.data;
}

export async function fetchFilmOnSearchQuery(query) {
  const result = await axios.get(
    `3/search/movie?query=${query}&language=en-US&page=1`,
    options
  );
  return result.data;
}
