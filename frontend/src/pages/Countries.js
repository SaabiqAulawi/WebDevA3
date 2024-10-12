import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Pastikan Bootstrap diimpor

function Countries() {
    const [countries, setCountries] = useState([]);
    const [newCountry, setNewCountry] = useState('');

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        const response = await fetch('http://localhost:5000/api/countries');
        const data = await response.json();
        setCountries(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newCountry.trim() !== '') {
            const response = await fetch('http://localhost:5000/api/countries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newCountry }),
            });
            if (response.ok) {
                fetchCountries();
                setNewCountry('');
            }
        }
    };

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:5000/api/countries/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            fetchCountries();
        }
    };

    return (
        <div className="container mt-4">
            <h3>Countries</h3>
            <form onSubmit={handleSubmit} className="mb-3">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        value={newCountry}
                        onChange={(e) => setNewCountry(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Countries</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {countries.map((country) => (
                        <tr key={country.id}>
                            <td>{country.id}</td>
                            <td>{country.name}</td>
                            <td>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => handleDelete(country.id)}>
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

export default Countries;
