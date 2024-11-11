import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetail.css';

const MovieDetail = () => {
    const { dramaId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fungsi untuk memeriksa apakah link adalah embed link YouTube yang valid
    const getYouTubeEmbedUrl = (url) => {
        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(youtubeRegex);
        return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    };

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/dramas/${dramaId}`);

                // Transform data
                const transformedMovie = {
                    title: response.data.title || 'Untitled',
                    alternativetitle: response.data.alternativetitle || '-',
                    photolink: response.data.photolink || "https://via.placeholder.com/300x450",
                    year: response.data.year || 'N/A',
                    synopsis: response.data.synopsis || 'No synopsis available',
                    availability: response.data.availability || 'Not available',
                    genres: response.data.genres?.map(genre => genre.name) || [],
                    actors: response.data.actors?.map(actor => ({
                        name: actor.name || 'Unknown Actor',
                        photoLink: actor.photolink || "https://via.placeholder.com/100x150"
                    })) || [],
                    trailerlink: response.data.trailerlink || '',
                    award_name: response.data.award_name || ''
                };

                setMovie(transformedMovie);
                setError(null);
            } catch (error) {
                setError('Failed to fetch movie details');
            } finally {
                setLoading(false);
            }
        };

        if (dramaId) {
            fetchMovieDetails();
        }
    }, [dramaId]);

    if (loading) {
        return <div className="loading-container">Loading...</div>;
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

    const embedUrl = getYouTubeEmbedUrl(movie.trailerlink);

    return (
        <div className="movie-detail">
            <Header />
            <div className="movie-content">
                <div className="movie-header-info">
                    <div className="movie-poster">
                        <img
                        // set image fitted 19/6

                        style={{
                            objectFit: 'cover',
                            width: '300px',
                            height: '450px'
                        }}

                            src={movie.photolink} 
                            alt={movie.title}
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/300x450";
                                e.target.alt = "Placeholder image";
                            }}
                            onLoad={e => e.target.classList.add('loaded')}
                        />
                    </div>
                    
                    <div className="movie-info">
                        {embedUrl ? (
                            <div className="trailer-section">
                                <div className="trailer-container">
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={embedUrl}
                                        title="Movie Trailer"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        ) : movie.trailerlink ? (
                            <p><strong>Trailer Link:</strong> <a href={movie.trailerlink} target="_blank" rel="noopener noreferrer">{movie.trailerlink}</a></p>
                        ) : null}
                        
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

                
            </div>
        </div>
    );
};

export default MovieDetail;
