import React from 'react';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard'; 
import './HomePage.css';

const HomePage = () => {
    const movies = [
        // Data dummy film
        {
            id: 1,
            title: "Title of the drama 1 that makes two lines",
            poster: "https://via.placeholder.com/150",
            year: 2024,
            genres: ["Genre 1", "Genre 2", "Genre 3"],
            rating: 4.5,
            views: 12345
        },
        {
            id: 2,
            title: "Title of the drama 2 that makes two lines",
            poster: "https://via.placeholder.com/150",
            year: 2023,
            genres: ["Genre 1", "Genre 2", "Genre 3"],
            rating: 3.5,
            views: 67890
        },
        // Tambahkan film lain sesuai kebutuhan
    ];

    return (
        <div className="home-page">
            <Header />  {}
            
            <div className="content-wrapper">
                <div className="main-content">
                    <div className="filter-bar">
                        <span>Filtered by:</span>
                        <select>
                            <option>Country</option>
                        </select>
                        <select>
                            <option>Year</option>
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

                    <div className="movie-list">
                        {movies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
