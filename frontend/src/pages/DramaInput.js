import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DramaApproved from './DramaApproved';  // Import DramaApproved component

function DramaInput() {
    const [drama, setDrama] = useState({
        title: '',
        alternativeTitle: '',
        year: '',
        country: '',
        synopsis: '',
        availability: '',
        genres: '',
        actors: '',
        trailerLink: '',
        award: ''
    });

    const [dramaSubmitted, setDramaSubmitted] = useState(false);  // State to trigger reload of DramaApproved
    const [errorMessage, setErrorMessage] = useState('');  // State to handle country input error

    // Fetch genres and actors on component mount
    useEffect(() => {
        fetchGenres();
        fetchActors();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/genres');
            setGenresList(response.data);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const fetchActors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/actors');
            setActorsList(response.data);
        } catch (error) {
            console.error('Error fetching actors:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDrama({ ...drama, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate country input (only one country allowed)
        const countryList = drama.country.split(/\s*,\s*/).filter(country => country);
        if (countryList.length > 1) {
            setErrorMessage('Only one country is allowed. Please enter a single country.');
            return;
        } else {
            setErrorMessage('');  // Clear error if input is valid
        }

        // Split genres and actors using regex for comma and optional spaces
        const genreList = drama.genres.split(/\s*,\s*/).filter(genre => genre);
        const actorList = drama.actors.split(/\s*,\s*/).filter(actor => actor);

        const dramaData = {
            ...drama,
            genres: genreList,  // Convert genres to array
            actors: actorList,   // Convert actors to array
            country: countryList[0] || ''  // Use the single country from input
        };

        try {
            await axios.post('http://localhost:5000/api/dramas', dramaData);
            // Resetting the form after submission
            setDrama({
                title: '',
                alternativeTitle: '',
                year: '',
                country: '',
                synopsis: '',
                availability: '',
                genres: '',
                actors: '',
                trailerLink: '',
                award: ''
            });
            setDramaSubmitted(!dramaSubmitted);  // Trigger reload of DramaApproved component
        } catch (error) {
            console.error('Error creating drama:', error);
        }
    };

    return (
        <div className="container">
            <h3>Input New Drama</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={drama.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Alternative Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="alternativeTitle"
                        value={drama.alternativeTitle}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Year</label>
                    <input
                        type="text"
                        className="form-control"
                        name="year"
                        value={drama.year}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Country (only one country allowed)</label>
                    <input
                        type="text"
                        className="form-control"
                        name="country"
                        value={drama.country}
                        onChange={handleInputChange}
                        placeholder="Enter one country"
                        required
                    />
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                </div>
                <div className="form-group">
                    <label>Synopsis</label>
                    <textarea
                        className="form-control"
                        name="synopsis"
                        value={drama.synopsis}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Availability</label>
                    <input
                        type="text"
                        className="form-control"
                        name="availability"
                        value={drama.availability}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Genre input as comma-separated text */}
                <div className="form-group">
                    <label>Genres (e.g. Animation, Fantasy)</label>
                    <input
                        type="text"
                        className="form-control"
                        name="genres"
                        value={drama.genres}
                        onChange={handleInputChange}
                        placeholder="Enter genres separated by commas"
                    />
                </div>

                {/* Actor input as comma-separated text */}
                <div className="form-group">
                    <label>Actors (e.g. John Doe, Megan Fox)</label>
                    <input
                        type="text"
                        className="form-control"
                        name="actors"
                        value={drama.actors}
                        onChange={handleInputChange}
                        placeholder="Enter actors separated by commas"
                    />
                </div>

                <div className="form-group">
                    <label>Trailer Link</label>
                    <input
                        type="text"
                        className="form-control"
                        name="trailerLink"
                        value={drama.trailerLink}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Award</label>
                    <input
                        type="text"
                        className="form-control"
                        name="award"
                        value={drama.award}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            {/* DramaApproved component displayed below the form */}
            <DramaApproved key={dramaSubmitted} />
        </div>
    );
}

export default DramaInput;