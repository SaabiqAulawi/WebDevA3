import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetail.css'; // Import CSS untuk styling

const MovieDetail = () => {
    const { movieId } = useParams(); // Mengambil movieId dari URL
    const [movie, setMovie] = useState(null); // State untuk menyimpan detail movie

    useEffect(() => {
        fetchMovieDetails();
    }, [movieId]);

    const fetchMovieDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/dramas/${movieId}`); // Call the API
            setMovie(response.data); // Store the fetched movie data in state
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    // Jika movie belum ada (loading)
    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="movie-detail">
            <Header />
            <div className="movie-content">
                <div className="movie-header-info">
                    <div className="movie-poster">
                        <img src={movie.photolink || "https://via.placeholder.com/300x450"} alt={movie.title} />
                    </div>
                    <div className="movie-info">
                        <h1>{movie.title}</h1>
                        <p><strong>Other titles:</strong> {movie.alternativetitle}</p>
                        <p><strong>Year:</strong> {movie.year}</p>
                        <p>{movie.synopsis}</p>
                        <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
                        <p><strong>Availability:</strong> {movie.availability}</p>
                    </div>
                </div>

                <div className="actors-section">
                    <h3>Actors</h3>
                    <div className="actors-list">
                        {movie.actors.map((actor, index) => (
                            <div key={index} className="actor-card">
                                <img src={actor.photoLink || "https://via.placeholder.com/100x150"} alt={actor.name} />
                                <p>{actor.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="trailer-section">
                    <h3>Trailer</h3>
                    <div className="trailer-placeholder">
                        <img src={movie.trailerlink || "https://via.placeholder.com/150x150"} alt="Trailer" />
                    </div>
                </div>

                <div className="reviews-section">
                    <h3>People think about this drama</h3>
                    <div className="reviews-filter">
                        <span>Filtered by: </span>
                        <select>
                            <option>★★★★★</option>
                            <option>★★★★☆</option>
                            <option>★★★☆☆</option>
                            <option>★★☆☆☆</option>
                            <option>★☆☆☆☆</option>
                        </select>
                    </div>
                    <div className="reviews-list">
                        {movie.reviews.map((review, index) => (
                            <div key={index} className="review">
                                <p><strong>{review.user}</strong> ({review.date}) said: {review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="add-review-section">
                    <h3>Add yours!</h3>
                    <form>
                        <div className="input-group">
                            <label>Name</label>
                            <input type="text" name="name" />
                        </div>
                        <div className="input-group">
                            <label>Your thoughts</label>
                            <textarea name="thoughts"></textarea>
                        </div>
                        <p>You can only submit your comment once.</p>
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
