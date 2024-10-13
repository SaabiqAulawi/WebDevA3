import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function DramaApproved() {
    const [dramas, setDramas] = useState([]);
    const [genres, setGenres] = useState({});
    const [actors, setActors] = useState({});

    useEffect(() => {
        fetchDramas();
    }, []);

    const fetchDramas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/dramas');
            setDramas(response.data);
            response.data.forEach(drama => {
                fetchGenres(drama.id);
                fetchActors(drama.id);
            });
        } catch (error) {
            console.error('Error fetching dramas:', error);
        }
    };

    const fetchGenres = async (dramaId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/drama-genres/drama/${dramaId}`);
            setGenres(prev => ({ ...prev, [dramaId]: response.data }));
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const fetchActors = async (dramaId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/drama-actors/drama/${dramaId}`);
            setActors(prev => ({ ...prev, [dramaId]: response.data }));
        } catch (error) {
            console.error('Error fetching actors:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/dramas/${id}`);
            fetchDramas();
        } catch (error) {
            console.error('Error deleting drama:', error);
        }
    };

    return (
        <div className="container">
            <h3>Approved Dramas</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Alternative Title</th>
                        <th>Genres</th>
                        <th>Actors</th>
                        <th>Synopsis</th>
                        <th>Year</th>
                        <th>Availability</th>
                        <th>Awards</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dramas.map((drama) => (
                        <tr key={drama.id}>
                            <td>{drama.title}</td>
                            <td>{drama.alternativetitle}</td>
                            <td>{genres[drama.id]?.map(genre => genre.name).join(', ')}</td>
                            <td>{actors[drama.id]?.map(actor => actor.name).join(', ')}</td>
                            <td>{drama.synopsis}</td>
                            <td>{drama.year}</td>
                            <td>{drama.availability}</td>
                            <td>{drama.award_name}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(drama.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DramaApproved;
