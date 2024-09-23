import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <Link to={`/movie/${movie.id}`}>
                <img src={movie.poster} alt={movie.title} />
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                <p>{movie.genres.join(', ')}</p>
                <p>Rate {movie.rating}/5</p>
                <p>{movie.views} views</p>
            </Link>
        </div>
    );
};

export default MovieCard;
