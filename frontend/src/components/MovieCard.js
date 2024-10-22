import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ drama }) => { // Ganti `movie` menjadi `drama`
    return (
        <div className="movie-card">
            <Link to={`/drama/${drama.id}`}>
                <img src={
                    // drama.poster || 
                    "https://via.placeholder.com/150"} />
            </Link>
            <h3>{drama.title}</h3>
            <p>Year: {drama.year}</p>
            <p>Genres: {drama.genres.join(', ') || 'N/A'}</p>
        </div>
    );
};

export default MovieCard;