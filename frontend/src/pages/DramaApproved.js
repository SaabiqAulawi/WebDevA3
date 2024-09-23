import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function DramaApproved() {
    const [dramas, setDramas] = useState([]);

    useEffect(() => {
        fetchDramas();
    }, []);

    const fetchDramas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/dramas');
            setDramas(response.data);
        } catch (error) {
            console.error('Error fetching dramas:', error);
        }
    };

    const handleApprove = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/dramas/${id}`, { status: 'Approved' });
            fetchDramas();
        } catch (error) {
            console.error('Error approving drama:', error);
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
                        <th>Actors</th>
                        <th>Genres</th>
                        <th>Synopsis</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dramas.map((drama) => (
                        <tr key={drama.id}>
                            <td>{drama.title}</td>
                            <td>{drama.actors.join(', ')}</td>
                            <td>{drama.genres.join(', ')}</td>
                            <td>{drama.synopsis}</td>
                            <td>{drama.status}</td>
                            <td>
                                <button className="btn btn-success" onClick={() => handleApprove(drama.id)}>Approve</button>
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
