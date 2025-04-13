import SearchIcon from "/images/Icon.png";
function Header({ movieList }) {
  return (
    <header>
      <div className="background-container">
        <div className="overlay" aria-hidden="true">
          <img src={movieList[0]?.backdrop_path} />
        </div>
        <div className="top-rated-container">
          <div className="logo-container">
            <h1 className="logo">
              <img src="./images/logo.png" alt="MovieList" />
            </h1>
            <div className="search-bar">
              <input
                className="search-input"
                placeholder="검색어를 입력하세요"
              />
              <div className="search-button">
                <img src={SearchIcon} />
              </div>
            </div>
          </div>
          <div className="top-rated-movie">
            <div className="rate">
              <img src="./images/star_empty.png" className="star" />
              <span className="rate-value">{movieList[0]?.vote_average}</span>
            </div>
            <div className="title">{movieList[0]?.title}</div>
            <button className="primary detail">자세히 보기</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
