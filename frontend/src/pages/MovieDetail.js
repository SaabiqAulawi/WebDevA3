import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import './MovieDetail.css';

const MovieDetail = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                console.log('Fetching movie with ID:', movieId);
                setLoading(true);
                
                // Make sure the URL matches your backend URL exactly
                const url = `http://localhost:5000/api/dramas/${movieId}`;
                console.log('Fetching from URL:', url);
                
                const response = await axios.get(url);
                console.log('API Response:', response.data);
                
                if (!response.data) {
                    throw new Error('No data received from API');
                }

                // Defensive transformation with null checks
                const transformedMovie = {
                    ...response.data,
                    title: response.data.title || 'Untitled',
                    alternativetitle: response.data.alternativetitle || '-',
                    photolink: response.data.photolink || "https://via.placeholder.com/300x450",
                    year: response.data.year || 'N/A',
                    synopsis: response.data.synopsis || 'No synopsis available',
                    availability: response.data.availability || 'Not available',
                    genres: Array.isArray(response.data.genres) 
                        ? response.data.genres.map(genre => genre.name)
                        : [],
                    actors: Array.isArray(response.data.actors)
                        ? response.data.actors.map(actor => ({
                            name: actor.name || 'Unknown Actor',
                            photoLink: actor.photolink || "https://via.placeholder.com/100x150"
                          }))
                        : [],
                    reviews: Array.isArray(response.data.reviews) ? response.data.reviews : []
                };
                
                console.log('Transformed movie data:', transformedMovie);
                setMovie(transformedMovie);
                setError(null);
            } catch (error) {
                console.error('Error details:', error);
                // More specific error messaging
                const errorMessage = error.response?.status === 404 
                    ? 'Movie not found'
                    : error.response?.data?.message || error.message || 'Failed to fetch movie details';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        if (movieId) {
            fetchMovieDetails();
        }
    }, [movieId]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (!movie) {
        return <div className="not-found">Movie not found</div>;
    }

    return (
        <div className="movie-detail">
            <Header />
            <div className="movie-content">
                <div className="movie-header-info">
                    <div className="movie-poster">
                        <img 
                            src={movie.photolink} 
                            alt={movie.title}
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/300x450";
                                e.target.alt = "Placeholder image";
                            }}
                        />
                    </div>
                    <div className="movie-info">
                        <h1>{movie.title}</h1>
                        {movie.alternativetitle !== '-' && (
                            <p><strong>Alternative Title:</strong> {movie.alternativetitle}</p>
                        )}
                        <p><strong>Year:</strong> {movie.year}</p>
                        <p className="synopsis">{movie.synopsis}</p>
                        {movie.genres.length > 0 && (
                            <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
                        )}
                        <p><strong>Available on:</strong> {movie.availability}</p>
                        {movie.award_name && (
                            <p><strong>Award:</strong> {movie.award_name}</p>
                        )}
                    </div>
                </div>

                {movie.actors.length > 0 && (
                    <div className="actors-section">
                        <h3>Cast</h3>
                        <div className="actors-list">
                            {movie.actors.map((actor, index) => (
                                <div key={index} className="actor-card">
                                    <img 
                                        src={actor.photoLink} 
                                        alt={actor.name}
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/100x150";
                                            e.target.alt = "Actor placeholder";
                                        }}
                                    />
                                    <p>{actor.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {movie.trailerlink && (
                    <div className="trailer-section">
                        <h3>Trailer</h3>
                        <div className="trailer-container">
                            <a href={movie.trailerlink} target="_blank" rel="noopener noreferrer">
                                Watch Trailer
                            </a>
                        </div>
                    </div>
                )}

                <div className="reviews-section">
                    <h3>Reviews</h3>
                    {movie.reviews.length > 0 ? (
                        <div className="reviews-list">
                            {movie.reviews.map((review, index) => (
                                <div key={index} className="review-card">
                                    <div className="review-header">
                                        <strong>{review.user}</strong>
                                        <span>{review.date}</span>
                                    </div>
                                    <p>{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No reviews yet. Be the first to review!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;