import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Awards() {
    const [awards, setAwards] = useState([]);
    const [newAward, setNewAward] = useState({ country: '', year: '', name: '' });

    useEffect(() => {
        fetchAwards();
    }, []);

    const fetchAwards = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/awards');
            setAwards(response.data);
        } catch (error) {
            console.error('Error fetching awards:', error);
        }``
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/awards', newAward);
            setNewAward({ country: '', year: '', name: '' });
            fetchAwards();
        } catch (error) {
            console.error('Error creating award:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/awards/${id}`);
            fetchAwards();
        } catch (error) {
            console.error('Error deleting award:', error);
        }
    };

    return (
        <div className="container">
            <h3>Awards</h3>
            <form className="mb-3" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        value={newAward.country}
                        onChange={(e) => setNewAward({ ...newAward, country: e.target.value })}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Year"
                        value={newAward.year}
                        onChange={(e) => setNewAward({ ...newAward, year: e.target.value })}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Award Name"
                        value={newAward.name}
                        onChange={(e) => setNewAward({ ...newAward, name: e.target.value })}
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Country</th>
                        <th>Year</th>
                        <th>Award Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {awards.map((award, index) => (
                        <tr key={award.id}>
                            <td>{index + 1}</td>
                            <td>{award.country}</td>
                            <td>{award.year}</td>
                            <td>{award.name}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(award.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Awards;
