import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
    const [dramas, setDramas] = useState([]);

    useEffect(() => {
        fetchDramas();
    }, []);

    const fetchDramas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/dramas/with-details');
            const dramasWithPosters = response.data.map(drama => ({
                id: drama.id,
                title: drama.title,
                poster: drama.photolink, // Mengacu ke photolink
                year: drama.year,
                genres: drama.genres.map(genre => genre.name)
            }));
            setDramas(dramasWithPosters);
        } catch (error) {
            console.error('Error fetching dramas:', error);
        }
    };
    
    

    return (
        <div className="home-page">
            <Header />

            <div className="content-wrapper">
                {/* Main Content */}
                <div className="main-content">
                    {/* Filter Bar */}
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

                    {/* Drama List */}
                    <div className="movie-list">
                    {dramas.map(drama => (
                        <MovieCard key={drama.id} drama={drama} />
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
