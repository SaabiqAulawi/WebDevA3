import React, { useState } from 'react';
import '../styles.css';

function Genres() {
    const [genres, setGenres] = useState([
        { id: 1, name: 'Romance' },
        { id: 2, name: 'Drama' },
        { id: 3, name: 'Action' },
    ]);

    const [newGenre, setNewGenre] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newGenre.trim() !== '') {
            setGenres([
                ...genres,
                { id: genres.length + 1, name: newGenre }
            ]);
            setNewGenre('');
        }
    };

    const handleRename = (id, newName) => {
        const updatedGenres = genres.map(genre =>
            genre.id === id ? { ...genre, name: newName } : genre
        );
        setGenres(updatedGenres);
    };

    const handleDelete = (id) => {
        const updatedGenres = genres.filter(genre => genre.id !== id);
        setGenres(updatedGenres);
    };

    return (
        <div className="main-content">
            <h3>Genres</h3>
            <form className="genre-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Genre"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                />
                <button type="submit" className="submit-btn">Submit</button>
            </form>

            <table className="genre-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Genres</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {genres.map((genre) => (
                        <tr key={genre.id}>
                            <td>{genre.id}</td>
                            <td>
                                <input
                                    type="text"
                                    value={genre.name}
                                    onChange={(e) => handleRename(genre.id, e.target.value)}
                                />
                            </td>
                            <td>
                                <a href="#" onClick={() => handleRename(genre.id, genre.name)}>Rename</a> | 
                                <a href="#" onClick={() => handleDelete(genre.id)}> Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Genres;
