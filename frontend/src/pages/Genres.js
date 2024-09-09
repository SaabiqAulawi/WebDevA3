import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Genres() {
    const [genres, setGenres] = useState([]);
    const [newGenre, setNewGenre] = useState('');

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
        try {
            await axios.post('http://localhost:5000/api/genres', { name: newGenre });
            setNewGenre('');
            fetchGenres();
        } catch (error) {
            console.error('Error creating genre:', error);
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
                            <td>{genre.name}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(genre.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Genres;
