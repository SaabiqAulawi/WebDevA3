import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Actors() {
    const [actors, setActors] = useState([]);
    const [newActor, setNewActor] = useState({ country: '', name: '', birthDate: '', photo: null });

    useEffect(() => {
        fetchActors();
    }, []);

    const fetchActors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/actors');
            setActors(response.data);
        } catch (error) {
            console.error('Error fetching actors:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/actors', newActor);
            setNewActor({ country: '', name: '', birthDate: '', photo: null });
            fetchActors();
        } catch (error) {
            console.error('Error creating actor:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/actors/${id}`);
            fetchActors();
        } catch (error) {
            console.error('Error deleting actor:', error);
        }
    };

    return (
        <div className="container">
            <h3>Actors</h3>
            <form className="mb-3" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        value={newActor.country}
                        onChange={(e) => setNewActor({ ...newActor, country: e.target.value })}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={newActor.name}
                        onChange={(e) => setNewActor({ ...newActor, name: e.target.value })}
                    />
                    <input
                        type="date"
                        className="form-control"
                        value={newActor.birthDate}
                        onChange={(e) => setNewActor({ ...newActor, birthDate: e.target.value })}
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Country</th>
                        <th>Name</th>
                        <th>Birth Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {actors.map((actor, index) => (
                        <tr key={actor.id}>
                            <td>{index + 1}</td>
                            <td>{actor.country}</td>
                            <td>{actor.name}</td>
                            <td>{actor.birthDate}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(actor.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Actors;
