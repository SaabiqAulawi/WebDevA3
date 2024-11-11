import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Actors() {
    const [actors, setActors] = useState([]);
    const [countries, setCountries] = useState([]);
    const [newActor, setNewActor] = useState({
        name: '',
        birthdate: '',
        photolink: '',
        country_id: ''
    });
    const [editingActorId, setEditingActorId] = useState(null);
    const [editedActor, setEditedActor] = useState({
        name: '',
        birthdate: '',
        photolink: '',
        country_id: ''
    });

    useEffect(() => {
        fetchActors();
        fetchCountries();
    }, []);

    const fetchActors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/actors');
            setActors(response.data);
        } catch (error) {
            console.error('Error fetching actors:', error);
        }
    };

    const fetchCountries = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/countries');
            setCountries(response.data);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/actors', newActor);
            setNewActor({ name: '', birthdate: '', photolink: '', country_id: '' });
            fetchActors(); // Refresh daftar aktor setelah berhasil menambahkan
        } catch (error) {
            console.error('Error creating actor:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/actors/${id}`);
            fetchActors(); // Refresh daftar aktor setelah berhasil menghapus
        } catch (error) {
            console.error('Error deleting actor:', error);
        }
    };

    const handleEdit = (actor) => {
        setEditingActorId(actor.id);
        setEditedActor({
            name: actor.name,
            birthdate: actor.birthdate,
            photolink: actor.photolink,
            country_id: actor.country_id
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/actors/${editingActorId}`, editedActor);
            setEditingActorId(null);
            setEditedActor({ name: '', birthdate: '', photolink: '', country_id: '' });
            fetchActors();
        } catch (error) {
            console.error('Error updating actor:', error);
        }
    };

    return (
        <div className="container">
            <h3>Actors</h3>
            <form className="mb-3" onSubmit={handleSubmit}>
                <div className="input-group mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={newActor.name}
                        onChange={(e) => setNewActor({ ...newActor, name: e.target.value })}
                        required
                    />
                    <input
                        type="date"
                        className="form-control"
                        value={newActor.birthdate}
                        onChange={(e) => setNewActor({ ...newActor, birthdate: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Photo Link"
                        value={newActor.photolink}
                        onChange={(e) => setNewActor({ ...newActor, photolink: e.target.value })}
                    />
                    <select
                        className="form-control"
                        value={newActor.country_id}
                        onChange={(e) => setNewActor({ ...newActor, country_id: e.target.value })}
                        required
                    >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                            <option key={country.id} value={country.id}>{country.name}</option>
                        ))}
                    </select>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Birth Date</th>
                        <th>Photo Link</th>
                        <th>Country</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {actors.map((actor, index) => (
                        <tr key={actor.id}>
                            <td>{index + 1}</td>
                            <td>
                                {editingActorId === actor.id ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editedActor.name}
                                        onChange={(e) => setEditedActor({ ...editedActor, name: e.target.value })}
                                    />
                                ) : (
                                    actor.name
                                )}
                            </td>
                            <td>
                                {editingActorId === actor.id ? (
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={editedActor.birthdate}
                                        onChange={(e) => setEditedActor({ ...editedActor, birthdate: e.target.value })}
                                    />
                                ) : (
                                    actor.birthdate
                                )}
                            </td>
                            <td>
                                {editingActorId === actor.id ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editedActor.photolink}
                                        onChange={(e) => setEditedActor({ ...editedActor, photolink: e.target.value })}
                                    />
                                ) : (
                                    <a href={actor.photolink} target="_blank" rel="noopener noreferrer">
                                        {actor.photolink}
                                    </a>
                                )}
                            </td>
                            <td>
                                {editingActorId === actor.id ? (
                                    <select
                                        className="form-control"
                                        value={editedActor.country_id}
                                        onChange={(e) => setEditedActor({ ...editedActor, country_id: e.target.value })}
                                    >
                                        <option value="">Select Country</option>
                                        {countries.map((country) => (
                                            <option key={country.id} value={country.id}>{country.name}</option>
                                        ))}
                                    </select>
                                ) : (
                                    actor.country?.name || "N/A"
                                )}
                            </td>
                            <td>
                                {editingActorId === actor.id ? (
                                    <>
                                        <button className="btn btn-success me-2" onClick={handleUpdate}>Save</button>
                                        <button className="btn btn-secondary" onClick={() => setEditingActorId(null)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-warning me-2" onClick={() => handleEdit(actor)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(actor.id)}>Delete</button>
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

export default Actors;
