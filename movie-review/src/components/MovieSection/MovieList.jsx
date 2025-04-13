function MovieList({ movieList }) {
  return (
    <div className="container">
      <main>
        <section>
          <h2>지금 인기 있는 영화</h2>

          <ul className="thumbnail-list">
            {movieList.map((movie) => (
              <li key={movie.id}>
                <div className="item">
                  <img
                    className="thumbnail"
                    src={movie.poster_path}
                    alt={movie.title}
                  />
                  <div className="item-desc">
                    <p className="rate">
                      <img src="./images/star_empty.png" className="star" />
                      <span>{movie.vote_average}</span>
                    </p>
                    <strong>{movie.title}</strong>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default MovieList;
