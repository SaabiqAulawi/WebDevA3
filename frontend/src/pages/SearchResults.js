import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import './SearchResults.css'; // Import file CSS untuk styling

const SearchResults = ({ searchQuery }) => {
    // Data dummy untuk hasil pencarian film
    const searchResults = [
        {
            id: 1,
            title: "Title of the drama 1 that makes two lines",
            year: 2024,
            genres: ["Genre 1", "Genre 2", "Genre 3"],
            actors: ["Actor 1", "Actor 2", "Actor 3"],
            views: 19
        },
        {
            id: 2,
            title: "Title of the drama 2 that makes two lines",
            year: 2024,
            genres: ["Genre 1", "Genre 2", "Genre 3"],
            actors: ["Actor 1", "Actor 2", "Actor 3"],
            views: 19
        },
        {
            id: 3,
            title: "Title of the drama 3 that makes two lines",
            year: 2024,
            genres: ["Genre 1", "Genre 2", "Genre 3"],
            actors: ["Actor 1", "Actor 2", "Actor 3"],
            views: 19
        }
    ];

    return (
        <div className="search-results-page">
            <Header />  {}
            <div className="content-wrapper">

                <div className="main-content">
                    <h2>Searched/Tagged with "{searchQuery}"</h2>

                    <div className="filter-bar">
                        <span>Filtered by:</span>
                        <select>
                            <option>Year</option>
                        </select>
                        <select>
                            <option>Country</option>
                        </select>
                        <select>
                            <option>Genre</option>
                        </select>
                        <select>
                            <option>Status</option>
                        </select>
                        <select>
                            <option>Availability</option>
                        </select>
                        <select>
                            <option>Award</option>
                        </select>
                        <span>Sorted by:</span>
                        <select>
                            <option>Alphabetics</option>
                        </select>
                        <button>Submit</button>
                    </div>

                    <div className="search-results-list">
                        {searchResults.map((movie) => (
                            <div key={movie.id} className="search-result-item">
                                <Link to={`/movie/${movie.id}`}>
                                    <div className="movie-poster-placeholder">
                                        <img src="https://via.placeholder.com/150x200" alt={movie.title} />
                                    </div>
                                    <div className="movie-info">
                                        <h3>{movie.title}</h3>
                                        <p>{movie.year}</p>
                                        <p>{movie.genres.join(', ')}</p>
                                        <p>{movie.actors.join(', ')}</p>
                                        <p>{movie.views} views</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
