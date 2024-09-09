import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function DramaInput() {
    const [drama, setDrama] = useState({
        title: '',
        alternativeTitle: '',
        year: '',
        country: '',
        synopsis: '',
        availability: '',
        genres: [],
        actors: [],
        trailerLink: '',
        award: ''
    });

    const genresList = ['Action', 'Adventure', 'Romance', 'Drama', 'Slice of Life'];
    const actorsList = ['Actor 1', 'Actor 2', 'Actor 3', 'Actor 4', 'Actor 5'];

    const handleGenreChange = (genre) => {
        setDrama((prevDrama) => {
            const genres = prevDrama.genres.includes(genre)
                ? prevDrama.genres.filter((g) => g !== genre)
                : [...prevDrama.genres, genre];
            return { ...prevDrama, genres };
        });
    };

    const handleActorChange = (actor) => {
        setDrama((prevDrama) => {
            const actors = prevDrama.actors.includes(actor)
                ? prevDrama.actors.filter((a) => a !== actor)
                : prevDrama.actors.length < 9
                ? [...prevDrama.actors, actor]
                : prevDrama.actors;
            return { ...prevDrama, actors };
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDrama({ ...drama, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/dramas', drama);
            setDrama({
                title: '',
                alternativeTitle: '',
                year: '',
                country: '',
                synopsis: '',
                availability: '',
                genres: [],
                actors: [],
                trailerLink: '',
                award: ''
            });
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
                    />
                </div>
                <div className="form-group">
                    <label>Country</label>
                    <input
                        type="text"
                        className="form-control"
                        name="country"
                        value={drama.country}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Synopsis</label>
                    <textarea
                        className="form-control"
                        name="synopsis"
                        value={drama.synopsis}
                        onChange={handleInputChange}
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
                    />
                </div>
                <div className="form-group">
                    <label>Add Genres</label>
                    <div className="checkbox-group">
                        {genresList.map((genre) => (
                            <label key={genre} className="form-check-label">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    value={genre}
                                    checked={drama.genres.includes(genre)}
                                    onChange={() => handleGenreChange(genre)}
                                />
                                {genre}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label>Add Actors (Up to 9)</label>
                    <div className="checkbox-group">
                        {actorsList.map((actor) => (
                            <label key={actor} className="form-check-label">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    value={actor}
                                    checked={drama.actors.includes(actor)}
                                    onChange={() => handleActorChange(actor)}
                                />
                                {actor}
                            </label>
                        ))}
                    </div>
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
        </div>
    );
}

export default DramaInput;
