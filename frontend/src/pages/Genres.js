import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Genres() {
    const [genres, setGenres] = useState([]);
    const [newGenre, setNewGenre] = useState('');
    const [editingGenreId, setEditingGenreId] = useState(null); // State untuk ID genre yang sedang di-edit
    const [editedGenreName, setEditedGenreName] = useState(''); // State untuk nama genre yang sedang di-edit

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/genres');
            setGenres(response.data);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newGenre.trim() !== '') {
            try {
                await axios.post('http://localhost:5000/api/genres', { name: newGenre });
                setNewGenre('');
                fetchGenres();
            } catch (error) {
                console.error('Error creating genre:', error);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/genres/${id}`);
            fetchGenres();
        } catch (error) {
            console.error('Error deleting genre:', error);
        }
    };

    const handleEdit = (genre) => {
        setEditingGenreId(genre.id);
        setEditedGenreName(genre.name);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (editedGenreName.trim() !== '') {
            try {
                await axios.put(`http://localhost:5000/api/genres/${editingGenreId}`, { name: editedGenreName });
                setEditingGenreId(null); // Reset editing state
                setEditedGenreName('');  // Clear input
                fetchGenres();
            } catch (error) {
                console.error('Error updating genre:', error);
            }
        }
    };

    return (
        <div className="container">
            <h3>Genres</h3>
            <form className="mb-3" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Genre"
                        value={newGenre}
                        onChange={(e) => setNewGenre(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Genres</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {genres.map((genre, index) => (
                        <tr key={genre.id}>
                            <td>{index + 1}</td>
                            <td>
                                {editingGenreId === genre.id ? (
                                    // Input field for editing genre name
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editedGenreName}
                                        onChange={(e) => setEditedGenreName(e.target.value)}
                                    />
                                ) : (
                                    genre.name
                                )}
                            </td>
                            <td>
                                {editingGenreId === genre.id ? (
                                    // Save and Cancel buttons
                                    <>
                                        <button className="btn btn-success me-2" onClick={handleUpdate}>Save</button>
                                        <button className="btn btn-secondary" onClick={() => setEditingGenreId(null)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-warning me-2" onClick={() => handleEdit(genre)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(genre.id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Genres;
