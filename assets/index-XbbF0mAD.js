var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
var _movies, _page, _searchPage, _isLoading, _isModalOpen, _hasMore, _movieManager, _uiManager, _movieListSection;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
class TitleSearchBar {
  constructor(onSubmit, onLogoClick) {
    this.onSubmit = onSubmit;
    this.onLogoClick = onLogoClick;
  }
  render() {
    const $div = document.createElement("div");
    $div.classList.add("title-search-bar");
    const $searchBar = document.createElement("form");
    $searchBar.classList.add("search-bar");
    const $input = document.createElement("input");
    $input.placeholder = "검색어를 입력하세요.";
    $input.classList.add("search-input");
    const $button = document.createElement("button");
    $button.classList.add("search-button");
    const $img = document.createElement("img");
    $img.setAttribute("src", "./images/Search.png");
    $div.innerHTML = /*html*/
    `
    <h1 class="logo">
      <img src="./images/logo.png" alt="MovieList" />
    </h1>
    `;
    $div.appendChild($searchBar);
    $searchBar.appendChild($input);
    $searchBar.appendChild($button);
    $button.appendChild($img);
    $searchBar.addEventListener("submit", this.onSubmit);
    $div.querySelector(".logo").addEventListener("click", this.onLogoClick);
    return $div;
  }
}
class Thumbnail {
  constructor(movie, isLoading) {
    this.movie = movie;
    this.isLoading = isLoading;
  }
  render() {
    const $div = document.createElement("div");
    $div.classList.add("background-container");
    if (this.isLoading) {
      $div.classList.add("skeleton-thumbnail");
      return $div;
    }
    if (this.movie === null) {
      return;
    }
    $div.style.backgroundImage = `url("${this.movie.backdrop_path}")`;
    $div.innerHTML = /*html*/
    `
        <div class="overlay" aria-hidden="true"></div>
        <div class="top-rated-container">
          <div class="top-rated-movie">
            <div class="rate">
              <img src="./images/star_empty.png" class="star" />
              <span class="rate-value">${this.movie.vote_average}</span>
            </div>
            <div class="title">${this.movie.title}</div>
            <button class="primary detail">자세히 보기</button>
          </div>
        </div>
      </div>
    `;
    return $div;
  }
}
class Footer {
  render() {
    const $footer = document.createElement("footer");
    $footer.classList.add("footer");
    $footer.innerHTML = /*html*/
    `
    <p>&copy; 우아한테크코스 All Rights Reserved.</p>
    <p><img src="./images/woowacourse_logo.png" width="180" /></p>
    `;
    return $footer;
  }
}
const BASE_URL = "https://api.themoviedb.org/3";
const SEARCH_MOVIE_URL = `${BASE_URL}/search/movie`;
const POPULAR_MOVIE_URL = `${BASE_URL}/movie/popular`;
const DETAIL_MOVIE_URL = `${BASE_URL}/movie`;
const MOVIE_API_PARAMS = {
  ADULT_CONTENT: "include_adult=false",
  LANGUAGE: "language=ko-KR"
};
const STAR_COMMENT = {
  2: "최악이에요",
  4: "별로에요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요"
};
const IMG_PATH = `https://image.tmdb.org/t/p`;
async function getFetchData(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTI1NWE1YTJlMTg4NDg2MGRhZDEwNWE5YjBhNDg2ZSIsIm5iZiI6MTc0MjI3MjQ4Ny4wNzgsInN1YiI6IjY3ZDhmN2U3YmI0MzM5NTFhNzM2NTMwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k0QMsKwC8spe0-5uOU_QprzUuGlPTQoRUpi2t5ywK1A"}`
    }
  });
  if (!response.ok) {
    throw new Error("HTTP-Error: " + response.status);
  }
  const jsonData = await response.json();
  return jsonData;
}
async function getPopularityMovie(page) {
  try {
    const data = await getFetchData(
      `${POPULAR_MOVIE_URL}?${MOVIE_API_PARAMS.ADULT_CONTENT}&${MOVIE_API_PARAMS.LANGUAGE}&page=${page}`
    );
    return data;
  } catch (error) {
    return null;
  }
}
async function searchMovie(page, searchKeyword) {
  try {
    const data = await getFetchData(
      `${SEARCH_MOVIE_URL}?query=${searchKeyword}&${MOVIE_API_PARAMS.ADULT_CONTENT}&${MOVIE_API_PARAMS.LANGUAGE}&page=${page}`
    );
    return data;
  } catch (error) {
    return null;
  }
}
class MovieItem {
  constructor(movie, isLoading, handleMovieClick) {
    this.movie = movie;
    this.isLoading = isLoading;
    this.handleMovieClick = handleMovieClick;
  }
  render() {
    const $li = document.createElement("li");
    if (this.isLoading) {
      $li.classList.add("skeleton-box");
      return $li;
    }
    const { title, poster_path, vote_average, id } = this.movie;
    $li.addEventListener("click", () => this.handleMovieClick(id));
    $li.innerHTML = /*html*/
    `
    
        <div class="item">
            <img
            class="thumbnail"
            src=${poster_path === `${IMG_PATH}/w300null` ? "./images/nullImage.png" : poster_path}
            alt=${title}
            />
            <div class="item-desc">
            <p class="rate">
                <img src="./images/star_empty.png" class="star" /><span
                >${vote_average}</span
                >
            </p>
            <strong>${title}</strong>
            </div>
        </div>
    
    `;
    return $li;
  }
}
class EmptyView {
  constructor(text) {
    this.text = text;
  }
  render() {
    const $div = document.createElement("div");
    $div.classList.add("info-text-wrap");
    const $p = document.createElement("p");
    const $img = document.createElement("img");
    $p.textContent = this.text;
    $div.appendChild($img);
    $div.appendChild($p);
    $img.setAttribute("src", "./images/noResult.png");
    return $div;
  }
}
class MovieListSection {
  constructor(title, movies, isLoading, handleMovieClick) {
    this.title = title;
    this.movies = movies;
    this.isLoading = isLoading;
    this.handleMovieClick = handleMovieClick;
  }
  render() {
    const $section = document.createElement("section");
    const $title = document.createElement("h2");
    $title.textContent = this.getTitle();
    const $ul = document.createElement("ul");
    $ul.classList.add("thumbnail-list");
    if (this.isLoading) {
      for (let i = 0; i < 20; i++) {
        const $item = new MovieItem(null, true, this.handleMovieClick).render();
        $ul.appendChild($item);
      }
      $section.appendChild($title);
      $section.appendChild($ul);
      return $section;
    }
    if (this.movies === null) {
      const $div = new EmptyView("오류가 발생했습니다.").render();
      $section.appendChild($div);
      return $section;
    }
    const totalMovie = this.movies.length;
    const startIndex = Math.max(0, totalMovie - 20);
    if (totalMovie === 0) {
      const $div = new EmptyView("검색 결과가 없습니다.").render();
      $section.appendChild($title);
      $section.appendChild($div);
      return $section;
    }
    $section.appendChild($title);
    if (totalMovie <= 20) {
      this.renderMovieItemByArray(this.movies, $ul, false);
      $section.appendChild($ul);
      return $section;
    }
    this.renderMovieItemByArray(this.movies.slice(0, startIndex), $ul, false);
    this.renderMovieItemByArray(
      this.movies.slice(startIndex),
      $ul,
      this.isLoading
    );
    $section.append($title, $ul);
    return $section;
  }
  renderSkeleton($ul) {
    const skeletonElements = [];
    for (let i = 0; i < 20; i++) {
      const skeleton = document.createElement("li");
      skeleton.classList.add("skeleton-box");
      skeletonElements.push(skeleton);
      $ul.appendChild(skeleton);
    }
    return skeletonElements;
  }
  removeSkeleton(skeletonElements) {
    skeletonElements.forEach(($el) => $el.remove());
  }
  appendMovies(movies, $ul) {
    movies.forEach((movie) => {
      const $item = new MovieItem(movie, false, this.handleMovieClick).render();
      $ul.appendChild($item);
    });
  }
  renderMovieItemByArray(movies, $ul, isLoading) {
    return movies.forEach((movie) => {
      const $item = new MovieItem(
        movie,
        isLoading,
        this.handleMovieClick
      ).render();
      $ul.appendChild($item);
    });
  }
  getTitle() {
    if (this.title === null) {
      return "지금 인기 있는 영화";
    }
    return `"${this.title}" 검색 결과`;
  }
}
async function getDetailMovie(id) {
  try {
    const data = await getFetchData(
      `${DETAIL_MOVIE_URL}/${id}?${MOVIE_API_PARAMS.ADULT_CONTENT}&${MOVIE_API_PARAMS.LANGUAGE}`
    );
    return data;
  } catch (error) {
    return null;
  }
}
class MovieManager {
  constructor() {
    __privateAdd(this, _movies, []);
    __privateAdd(this, _page, 1);
    __privateAdd(this, _searchPage, 1);
  }
  getMovies() {
    return __privateGet(this, _movies);
  }
  reset() {
    __privateSet(this, _movies, []);
    __privateSet(this, _page, 1);
    __privateSet(this, _searchPage, 1);
  }
  async fetchPopular() {
    const data = await getPopularityMovie(__privateGet(this, _page));
    if (!data) return { results: null };
    const results = this.parsingMovieInfo(data.results);
    __privateGet(this, _movies).push(...results);
    return {
      results: __privateGet(this, _movies),
      totalPage: data.total_pages,
      currentPage: __privateWrapper(this, _page)._++
    };
  }
  async fetchSearch(keyword) {
    const data = await searchMovie(__privateGet(this, _searchPage), keyword);
    if (!data) return { results: null };
    const results = this.parsingMovieInfo(data.results);
    __privateGet(this, _movies).push(...results);
    return {
      results: __privateGet(this, _movies),
      totalPage: data.total_pages,
      currentPage: __privateWrapper(this, _searchPage)._++
    };
  }
  async fetchDetail(id) {
    const data = await getDetailMovie(id);
    return data;
  }
  parsingMovieInfo(movies) {
    return movies.map((movie) => ({
      ...movie,
      poster_path: `${IMG_PATH}/w300${movie.poster_path}`,
      vote_average: parseFloat(movie.vote_average.toFixed(1)),
      backdrop_path: `${IMG_PATH}/w1280${movie.backdrop_path}`
    }));
  }
}
_movies = new WeakMap();
_page = new WeakMap();
_searchPage = new WeakMap();
class UIManager {
  constructor() {
    __privateAdd(this, _isLoading, false);
    __privateAdd(this, _isModalOpen, true);
    __privateAdd(this, _hasMore, true);
  }
  reset() {
    __privateSet(this, _isLoading, false);
    __privateSet(this, _hasMore, true);
  }
  setLoading(isLoading) {
    __privateSet(this, _isLoading, isLoading);
  }
  getLoading() {
    return __privateGet(this, _isLoading);
  }
  setHasMore(show) {
    __privateSet(this, _hasMore, show);
  }
  getHasMore() {
    return __privateGet(this, _hasMore);
  }
  setIsModalOpen(isOpen) {
    __privateSet(this, _isModalOpen, isOpen);
  }
  getIsModalOpen() {
    return __privateGet(this, _isModalOpen);
  }
}
_isLoading = new WeakMap();
_isModalOpen = new WeakMap();
_hasMore = new WeakMap();
class Modal {
  constructor(movieDetail) {
    this.movieDetail = movieDetail;
  }
  render() {
    this.$div = document.createElement("div");
    this.$div.innerHTML = /*html*/
    `
        <div class="modal-background active" id="modalBackground">
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="./images/modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img
              src="https://image.tmdb.org/t/p/original/${this.movieDetail.poster_path}"
            />
          </div>
          <div class="modal-description">
            <h2>${this.movieDetail.title}</h2>
            <p class="category">
              ${this.movieDetail.release_date.split("-")[0]} · ${this.movieDetail.genres.map((data) => data.name)}
            </p>
            <div class="average_star_container">
            <p class=>평균 </p>
            <p class="rate">
              <img src="./images/star_filled.png" class="star" /><span
                >${parseFloat(this.movieDetail.vote_average).toFixed(1)}</span
              >
            </p>
            </div>
            <hr />
            <p class="middle_font">내 별점</p>
            <div class="my_star_container">
              <p class="rate" id="myStars">
              <img src="./images/star_empty.png" class="star" />
              <img src="./images/star_empty.png" class="star" />
              <img src="./images/star_empty.png" class="star" />
              <img src="./images/star_empty.png" class="star" />
              <img src="./images/star_empty.png" class="star" />
              </p>
              <p class="middle_font" id="comment"></p>
              <p class="star_count"></p>
            </div>
            <hr/>
            <p class="middle_font">줄거리</p>
            <p class="detail">
            ${this.movieDetail.overview ? this.movieDetail.overview : "줄거리 정보가 없습니다."}
            </p>
          </div>
        </div>
      </div>
    </div>
        `;
    this.addCloseModal();
    this.addHandleStar();
    this.loadRating();
    return this.$div;
  }
  loadRating() {
    const savedRating = localStorage.getItem(this.movieDetail.id);
    if (savedRating) {
      const { rating } = JSON.parse(savedRating);
      const starImages = this.$div.querySelectorAll("#myStars img");
      const comment = this.$div.querySelector("#comment");
      const count = this.$div.querySelector(".star_count");
      starImages.forEach((star, index) => {
        star.src = index < rating / 2 ? "./images/star_filled.png" : "./images/star_empty.png";
      });
      comment.innerHTML = `${STAR_COMMENT[rating]}`;
      count.innerHTML = `(${rating}/10)`;
    }
  }
  addHandleStar() {
    const starImages = this.$div.querySelectorAll("#myStars img");
    const comment = this.$div.querySelector("#comment");
    const count = this.$div.querySelector(".star_count");
    starImages.forEach((star, index) => {
      star.addEventListener("click", () => {
        const score = (index + 1) * 2;
        console.log(score);
        starImages.forEach((s, i) => {
          s.src = i < index + 1 ? "./images/star_filled.png" : "./images/star_empty.png";
        });
        const ratingData = {
          id: this.movieDetail.id,
          rating: score
        };
        localStorage.setItem(this.movieDetail.id, JSON.stringify(ratingData));
        comment.innerHTML = `${STAR_COMMENT[score]}`;
        count.innerHTML = `(${score}/10)`;
      });
    });
  }
  addCloseModal() {
    const closeButton = this.$div.querySelector("#closeModal");
    closeButton.addEventListener("click", () => this.closeModal());
    document.addEventListener("keydown", () => this.handleKeyDown(event));
  }
  handleKeyDown(e) {
    if (e.key === "Escape") {
      this.closeModal();
    }
  }
  closeModal() {
    this.$div.remove();
  }
}
class App {
  constructor() {
    __privateAdd(this, _movieManager);
    __privateAdd(this, _uiManager);
    __privateAdd(this, _movieListSection);
    __publicField(this, "onSubmit", async (e) => {
      e.preventDefault();
      const $input = document.querySelector(".search-input");
      const keyword = $input.value;
      if (!keyword) return;
      const newUrl = new URL(window.location);
      newUrl.searchParams.set("query", keyword);
      window.history.pushState({}, "", newUrl);
      __privateGet(this, _movieManager).reset();
      __privateGet(this, _uiManager).setLoading(true);
      __privateGet(this, _uiManager).setHasMore(true);
      const { results, totalPage } = await __privateGet(this, _movieManager).fetchSearch(
        keyword
      );
      if (totalPage === 1) {
        __privateGet(this, _uiManager).setHasMore(false);
      }
      __privateGet(this, _uiManager).setLoading(false);
      this.render(results);
    });
    __publicField(this, "onLogoClick", async (e) => {
      e.preventDefault();
      const url = new URL(window.location);
      url.searchParams.delete("query");
      window.history.pushState({}, "", url);
      __privateGet(this, _movieManager).reset();
      __privateGet(this, _uiManager).setHasMore(true);
      const { results } = await __privateGet(this, _movieManager).fetchPopular();
      this.render(results);
    });
    __publicField(this, "handleScroll", async () => {
      const keyword = this.getKeywordFromURL();
      document.querySelector("main");
      const $ul = document.querySelector(".thumbnail-list");
      __privateGet(this, _uiManager).setLoading(true);
      const skeletonElements = __privateGet(this, _movieListSection).renderSkeleton($ul);
      const { results, totalPage, currentPage } = keyword ? await __privateGet(this, _movieManager).fetchSearch(keyword) : await __privateGet(this, _movieManager).fetchPopular();
      __privateGet(this, _uiManager).setLoading(false);
      if (currentPage >= totalPage) {
        __privateGet(this, _uiManager).setHasMore(false);
      }
      __privateGet(this, _movieListSection).removeSkeleton(skeletonElements);
      const newMovies = results.slice(-20);
      __privateGet(this, _movieListSection).appendMovies(newMovies, $ul);
    });
    __publicField(this, "handleMovieClick", async (movieId) => {
      const movieDetail = await __privateGet(this, _movieManager).fetchDetail(movieId);
      const modal = new Modal(movieDetail).render();
      document.body.appendChild(modal);
    });
    __privateSet(this, _movieManager, new MovieManager());
    __privateSet(this, _uiManager, new UIManager());
    __privateSet(this, _movieListSection, new MovieListSection());
  }
  async init() {
    document.getElementById("app");
    const keyword = this.getKeywordFromURL();
    __privateGet(this, _uiManager).setLoading(true);
    this.render([]);
    const results = keyword ? await __privateGet(this, _movieManager).fetchSearch(keyword) : await __privateGet(this, _movieManager).fetchPopular();
    __privateGet(this, _uiManager).setLoading(false);
    if (results.results === null) {
      this.render(null);
      return;
    }
    __privateGet(this, _uiManager).setHasMore(true);
    this.render(results.results);
  }
  render(movies) {
    const isLoading = __privateGet(this, _uiManager).getLoading();
    const app2 = document.getElementById("app");
    app2.innerHTML = "";
    const $wrap = document.createElement("div");
    $wrap.id = "wrap";
    $wrap.style.position = "relative";
    const $thumbnail = new Thumbnail(
      !isLoading && movies && movies.length > 0 ? movies[0] : null,
      isLoading
    ).render();
    const $header = new TitleSearchBar(
      this.onSubmit,
      this.onLogoClick
    ).render();
    const $container = document.createElement("div");
    $container.classList.add("container");
    const $main = document.createElement("main");
    const $movieListSection = new MovieListSection(
      this.getKeywordFromURL(),
      movies,
      isLoading,
      this.handleMovieClick
    ).render();
    app2.appendChild($wrap);
    $wrap.appendChild($thumbnail);
    $wrap.appendChild($header);
    $wrap.appendChild($container);
    $container.appendChild($main);
    $main.appendChild($movieListSection);
    window.addEventListener("scroll", () => {
      if (!__privateGet(this, _uiManager).getHasMore() || __privateGet(this, _uiManager).getLoading()) {
        return;
      }
      const scrollPosition = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      if (scrollPosition + windowHeight >= documentHeight - 100) {
        this.handleScroll();
      }
    });
    const $footer = new Footer().render();
    app2.appendChild($footer);
  }
  getKeywordFromURL() {
    return new URLSearchParams(window.location.search).get("query");
  }
}
_movieManager = new WeakMap();
_uiManager = new WeakMap();
_movieListSection = new WeakMap();
const app = new App();
(async function() {
  await app.init();
})();
