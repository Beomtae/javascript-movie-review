import { getPopularityMovie } from "./components/Domain/getPopularityMovie";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MovieList from "./components/MovieSection/MovieList";

import { useState, useEffect } from "react";
import { parsingMovieInfo } from "./utils/parsingMovieInfo";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);

  const fetchPopular = async () => {
    const data = await getPopularityMovie(page);
    const result = parsingMovieInfo(data.results);
    setMovieList(result);
  };

  useEffect(() => {
    fetchPopular();
  }, [page]);

  return (
    <>
      <div id="wrap">
        <Header movieList={movieList} />
        <MovieList movieList={movieList} />
        <Footer />
      </div>
    </>
  );
}

export default App;
