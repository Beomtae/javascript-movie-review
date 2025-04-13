import { MOVIE_API_PARAMS, SEARCH_MOVIE_URL } from "../../constants/constants";
import { getFetchData } from "../../utils/getFetchData";

export async function searchMovie(page, searchKeyword) {
  try {
    const data = await getFetchData(
      `${SEARCH_MOVIE_URL}?query=${searchKeyword}&${MOVIE_API_PARAMS.ADULT_CONTENT}&${MOVIE_API_PARAMS.LANGUAGE}&page=${page}`
    );
    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
