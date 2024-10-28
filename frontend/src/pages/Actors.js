import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Actors() {
    const [actors, setActors] = useState([]);
    const [countries, setCountries] = useState([]); // State untuk menyimpan daftar negara
    const [newActor, setNewActor] = useState({
        name: '',
        birthDate: '',
        photoLink: '',
        country_id: ''
    });

    useEffect(() => {
        fetchActors();
        fetchCountries(); // Panggil fetchCountries saat komponen di-render
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
            const response = await axios.get('http://localhost:5000/api/countries'); // Ambil daftar negara dari API
            setCountries(response.data); // Simpan data negara ke dalam state
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/actors', {
                name: newActor.name,
                birthDate: newActor.birthDate,
                photoLink: newActor.photoLink,
                country_id: newActor.country_id
            });
            setNewActor({ name: '', birthDate: '', photoLink: '', country_id: '' });
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
                        value={newActor.photoLink}
                        onChange={(e) => setNewActor({ ...newActor, photoLink: e.target.value })}
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {actors.map((actor, index) => (
                        <tr key={actor.id}>
                            <td>{index + 1}</td>
                            <td>{actor.name}</td>
                            <td>{actor.birthdate}</td>
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
