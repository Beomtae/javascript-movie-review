function Header() {
  return (
    <header>
      <div className="background-container">
        <div className="overlay" aria-hidden="true"></div>
        <div className="top-rated-container">
          <h1 className="logo">
            <img src="./images/logo.png" alt="MovieList" />
          </h1>
          <div className="top-rated-movie">
            <div className="rate">
              <img src="./images/star_empty.png" className="star" />
              <span className="rate-value">9.5</span>
            </div>
            <div className="title">인사이드 아웃2</div>
            <button className="primary detail">자세히 보기</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
