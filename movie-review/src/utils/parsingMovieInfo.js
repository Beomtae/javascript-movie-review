import { IMG_PATH } from "../constants/constants";

export const parsingMovieInfo = (movies) => {
  return movies.map((movie) => ({
    ...movie,
    poster_path: `${IMG_PATH}/w300${movie.poster_path}`,
    vote_average: parseFloat(movie.vote_average.toFixed(1)),
    backdrop_path: `${IMG_PATH}/w1280${movie.backdrop_path}`,
  }));
};
