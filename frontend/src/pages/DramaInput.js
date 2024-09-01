import React, { useState } from 'react';
import '../styles.css';

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

    const genresList = ['Action', 'Adventures', 'Romance', 'Drama', 'Slice of Life'];
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Drama Submitted:', drama);
        // Logic to save drama goes here
    };

    return (
        <div className="drama-input-container">
            <h3>Input New Drama</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={drama.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-section">
                    <label>Alternative Title</label>
                    <input
                        type="text"
                        name="alternativeTitle"
                        value={drama.alternativeTitle}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-section">
                    <label>Year</label>
                    <input
                        type="text"
                        name="year"
                        value={drama.year}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-section">
                    <label>Country</label>
                    <input
                        type="text"
                        name="country"
                        value={drama.country}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-section">
                    <label>Synopsis</label>
                    <textarea
                        name="synopsis"
                        value={drama.synopsis}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className="form-section">
                    <label>Availability</label>
                    <input
                        type="text"
                        name="availability"
                        value={drama.availability}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-section">
                    <label>Add Genres</label>
                    <div className="checkbox-group">
                        {genresList.map((genre) => (
                            <label key={genre}>
                                <input
                                    type="checkbox"
                                    value={genre}
                                    checked={drama.genres.includes(genre)}
                                    onChange={() => handleGenreChange(genre)}
                                />
                                {genre}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="form-section">
                    <label>Add Actors (Up to 9)</label>
                    <div className="checkbox-group">
                        {actorsList.map((actor) => (
                            <label key={actor}>
                                <input
                                    type="checkbox"
                                    value={actor}
                                    checked={drama.actors.includes(actor)}
                                    onChange={() => handleActorChange(actor)}
                                />
                                {actor}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="form-section">
                    <label>Link Trailer</label>
                    <input
                        type="text"
                        name="trailerLink"
                        value={drama.trailerLink}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-section">
                    <label>Award</label>
                    <input
                        type="text"
                        name="award"
                        value={drama.award}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
}

export default DramaInput;
