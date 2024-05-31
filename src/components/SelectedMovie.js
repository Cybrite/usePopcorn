import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { KEY, Loader } from "../App";

export function SelectedMovie({ selectedId, onAdd, onClose, watchedMovie }) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState(" ");

  const isWatched = watchedMovie
    .map((movie) => movie.imdbID)
    .includes(selectedId);

  const watchedUserRating = watchedMovie.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Year: year,
    Plot: plot,
    Released: releaseDate,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function hanldeAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    onAdd(newWatchedMovie);
    onClose();
  }

  useEffect(
    function () {
      function Callback(e) {
        if (e.code === "Escape") {
          onClose();
        }
      }
      document.addEventListener("keydown", Callback);

      return function () {
        document.removeEventListener("keydown", Callback);
      };
    },
    [onClose]
  );

  useEffect(
    function () {
      async function getMovieDetails() {
        setLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        const data = await res.json();
        setMovie(data);
        setLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {loading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onClose}>
              &larr;
            </button>
            <img src={poster} alt={`${movie} movie`} />

            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {releaseDate} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span> {imdbRating} IMDb Rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    defaultRating={imdbRating}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={hanldeAdd}>
                      + Add to List
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You have Rated it {watchedUserRating}
                  <span>⭐</span>
                </p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
