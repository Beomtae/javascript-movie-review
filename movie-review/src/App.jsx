import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MovieList from "./components/MovieSection/MovieList";

function App() {
  return (
    <>
      <div id="wrap">
        <Header />
        <MovieList />
        <Footer />
      </div>
    </>
  );
}

export default App;
