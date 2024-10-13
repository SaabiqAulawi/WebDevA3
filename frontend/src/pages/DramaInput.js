import React, { useState } from 'react';
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
    const actorsList = ['Tom Hanks', 'Tim Allen', 'Joan Cusack', 'Kelsey Grammer', 'Don Rickles'];

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
            // Resetting the form after submission
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
                    <label>Country</label>
                    <input
                        type="text"
                        className="form-control"
                        name="country"
                        value={drama.country}
                        onChange={handleInputChange}
                        required
                    />
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
                <div className="form-group">
                    <label>Add Genres</label>
                    <div className="checkbox-group">
                        {genresList.map((genre) => (
                            <div key={genre} className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    value={genre}
                                    checked={drama.genres.includes(genre)}
                                    onChange={() => handleGenreChange(genre)}
                                />
                                <label className="form-check-label">{genre}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label>Add Actors (Up to 9)</label>
                    <div className="checkbox-group">
                        {actorsList.map((actor) => (
                            <div key={actor} className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    value={actor}
                                    checked={drama.actors.includes(actor)}
                                    onChange={() => handleActorChange(actor)}
                                />
                                <label className="form-check-label">{actor}</label>
                            </div>
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
