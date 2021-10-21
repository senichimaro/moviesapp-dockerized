function App() {
  return (
    <>
      <Navbar brand="Weekly Movies" />
      <Banner />
      <Main />
    </>
  );
}

function Banner() {
  return (
    <div class="container my-3">

      <div class="card mb-3">
        <div class="card-body">
          <h6 class="card-subtitle text-muted">
            This is a dummy project to Dockerize an Application
          </h6>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div class="card border-warning mb-3" style={{ maxWidth: "20rem" }}>
          <div class="card-header">
            <span class="badge rounded-pill bg-warning">Trending Movies</span>
          </div>
          <div class="card-body">
            <h4 class="card-title">See the trending movies</h4>
            <p class="card-text text-success">
              Check the current list of weekly trending movies. The weekly list
              tracks movies over a 7 day period, with a 7 day half life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Navbar({ brand }) {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          {brand}
        </a>
      </div>
    </nav>
  );
}

function Main({ brand }) {
  const [moviesObj, setMoviesObj] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/movies")
      .then((res) => res.json())
      .then((movies) => setMoviesObj(movies))
      .then(setIsLoading(false));
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="container my-0 d-flex flex-wrap justify-content-center">
      <MovieCard
        movies={moviesObj.results}
        config_path={moviesObj.config_path}
        genre_data={moviesObj.genre_data}
      />
    </div>
  );
}

function LoadingSpinner() {
  // spinner style
  const sizeVar = 5;
  const sizeUnit = "rem";
  const spinnerStyle = {
    width: sizeVar + sizeUnit,
    height: sizeVar + sizeUnit,
  };
  const style = { height: "90vh" };

  return (
    <div
      style={style}
      className="d-flex align-items-center justify-content-center"
    >
      <div className="container d-flex align-items-center my-5 flex-column">
        <div
          style={spinnerStyle}
          className="spinner-border text-dark"
          role="status"
        ></div>
        <span className="text-uppercase">Loading...</span>
      </div>
    </div>
  );
}

function MovieCard({ movies, config_path, genre_data }) {
  return movies
    ? movies.map((movie) => {
        return (
          <div
            className={`p-1 d-flex align-items-stretch animate__animated animate__fadeIn`}
            key={movie.id}
          >
            <div
              className="card col-sm-12 col-md-3 col-lg-4"
              style={{ width: "14rem" }}
            >
              <img
                src={
                  movie.poster_path
                    ? `${config_path.base_url}${config_path.poster_sizes[2]}${movie.poster_path}`
                    : error_image
                }
                className="card-img-top"
                alt={movie.overview.substring(0, 50)}
              />

              <div className="card-body position-relative">
                <div className="d-flex">
                  <span className="badge bg-success position-absolute top-0 end-0 translate-middle-y">
                    {movie.genre_ids
                      ? genre_data.map((item) =>
                          item.id === movie.genre_ids[0] ? item.name : ""
                        )
                      : ""}
                  </span>
                  <h5 className="card-title">{movie.original_title}</h5>
                </div>
                <p className="card-text">
                  {movie.overview.length > 100
                    ? `${movie.overview.substring(0, 100)}...`
                    : movie.overview}
                </p>
                <div className="btns-wrap align-self-end">
                  {/* <a
                    href={`movie/${movie.id}`}
                    className="btn btn-outline-danger"
                  >
                    See More
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        );
      })
    : null;
}

ReactDOM.render(<App />, document.getElementById("root"));
