import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ValidateDrama() {
    const [dramas, setDramas] = useState([]);
    const [filter, setFilter] = useState('Unapproved'); // Default to 'Unapproved' filter
    const [showLimit, setShowLimit] = useState(10); // Limit the number of dramas shown

    useEffect(() => {
        fetchDramas();
    }, [filter]);

    const fetchDramas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/dramas');
            const filteredDramas = response.data.filter(drama => drama.status === filter);
            setDramas(filteredDramas);
        } catch (error) {
            console.error('Error fetching dramas:', error);
        }
    };

    const handleApprove = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/dramas/${id}`, { status: 'Approved' });
            fetchDramas(); // Refresh the list after approval
        } catch (error) {
            console.error('Error approving drama:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/dramas/${id}`);
            fetchDramas(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting drama:', error);
        }
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleLimitChange = (e) => {
        setShowLimit(Number(e.target.value));
    };

    return (
        <div className="container">
            <h3>Validate Drama</h3>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label>Filter by Status:</label>
                    <select className="form-control" value={filter} onChange={handleFilterChange}>
                        <option value="Unapproved">Unapproved</option>
                        <option value="Approved">Approved</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label>Show Limit:</label>
                    <select className="form-control" value={showLimit} onChange={handleLimitChange}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>

            <table className="table table-bordered table-striped">
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
                    {dramas.slice(0, showLimit).map((drama) => (
                        <tr key={drama.id}>
                            <td>{drama.title}</td>
                            <td>{drama.actors.join(', ')}</td>
                            <td>{drama.genres.join(', ')}</td>
                            <td>{drama.synopsis}</td>
                            <td>{drama.status}</td>
                            <td>
                                <button
                                    className="btn btn-success btn-sm me-2"
                                    onClick={() => handleApprove(drama.id)}
                                    disabled={drama.status === 'Approved'}
                                >
                                    Approve
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(drama.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ValidateDrama;
