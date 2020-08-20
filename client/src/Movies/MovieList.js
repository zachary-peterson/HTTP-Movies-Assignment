import React from "react";
import { Link, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  const params = useParams();

  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
