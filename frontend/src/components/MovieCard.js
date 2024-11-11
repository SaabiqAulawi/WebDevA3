import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ drama }) => { // Ganti `movie` menjadi `drama`
    return (
        <div className="movie-card">
            <Link to={`/drama/${drama.id}`}>
                <img
                    // set image fitted 150

                    style={{
                        width: '150px',
                        height: '150px'
                    }}

                        src={drama.photolink} 
                        alt={drama.title}
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/150";
                            e.target.alt = "Placeholder image";
                        }}
                        onLoad={(e) => {
                            e.target.src = "https://via.placeholder.com/150";
                            e.target.alt = "Placeholder image";
                        }}
                />
            </Link>
            <h3>{drama.title}</h3>
            <p>Year: {drama.year}</p>
            <p>Genres: {drama.genres.join(', ') || 'N/A'}</p>
        </div>
    );
};

export default MovieCard;