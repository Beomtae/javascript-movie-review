import { MOVIE_API_PARAMS, POPULAR_MOVIE_URL } from "../../constants/constants";
import { getFetchData } from "../../utils/getFetchData";

export async function getPopularityMovie(page) {
  try {
    const data = await getFetchData(
      `${POPULAR_MOVIE_URL}?${MOVIE_API_PARAMS.ADULT_CONTENT}&${MOVIE_API_PARAMS.LANGUAGE}&page=${page}`
    );
    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
