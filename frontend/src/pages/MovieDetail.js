import React from 'react';
import Header from '../components/Header';
import { Link, useParams } from 'react-router-dom';
import './MovieDetail.css'; // Import CSS untuk styling

const MovieDetail = () => {
    const { movieId } = useParams(); // Mengambil movieId dari URL

    // Data dummy untuk film
    const movie = {
        title: "Title of the drama that makes two lines",
        otherTitles: "Title 2, Title 3, Title 4",
        year: "Spring 2024",
        synopsis: "Synopsis sometimes unhelpful. I don't read it thoroughly. But what helps me is the genres. I need to see genres and actors. That is what I want.",
        genres: ["Genre 1", "Genre 2", "Genre 3"],
        rating: "3.5/5",
        availability: "Fansub: @subsulo on X",
        actors: ["Actor 1", "Actor 1", "Actor 1", "Actor 1", "Actor 1", "Actor 1"],
        reviews: [
            { user: "Nara", date: "4/14/2014", comment: "It is a wonderful drama! I love it so much!!!!", rating: 5 },
            { user: "Nara", date: "4/14/2014", comment: "It is a wonderful drama! I love it so much!!!!", rating: 5 }
        ]
    };

    return (
        <div className="movie-detail">
            <Header />  {}
            <div className="movie-content">
                <div className="movie-header-info">
                    <div className="movie-poster">
                        <img src="https://via.placeholder.com/300x450" alt={movie.title} />
                    </div>
                    <div className="movie-info">
                        <h1>{movie.title}</h1>
                        <p><strong>Other titles:</strong> {movie.otherTitles}</p>
                        <p><strong>Year:</strong> {movie.year}</p>
                        <p>{movie.synopsis}</p>
                        <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
                        <p><strong>Rating:</strong> {movie.rating}</p>
                        <p><strong>Availability:</strong> {movie.availability}</p>
                    </div>
                </div>

                <div className="actors-section">
                    <h3>Actors</h3>
                    <div className="actors-list">
                        {movie.actors.map((actor, index) => (
                            <div key={index} className="actor-card">
                                <img src="https://via.placeholder.com/100x150" alt={actor} />
                                <p>{actor}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="trailer-section">
                    <h3>Trailer</h3>
                    <div className="trailer-placeholder">
                        <img src="https://via.placeholder.com/150x150" alt="Trailer" />
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
                                <p>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
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
                            <label>Rate</label>
                            <select name="rate">
                                <option>★★★★★</option>
                                <option>★★★★☆</option>
                                <option>★★★☆☆</option>
                                <option>★★☆☆☆</option>
                                <option>★☆☆☆☆</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Your thoughts</label>
                            <textarea name="thoughts"></textarea>
                        </div>
                        <p>you can only submit your comment once.</p>
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
