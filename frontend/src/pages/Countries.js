import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Countries() {
    const [countries, setCountries] = useState([]);
    const [newCountry, setNewCountry] = useState('');
    const [editingCountryId, setEditingCountryId] = useState(null); // State untuk ID negara yang sedang di-edit
    const [editedCountryName, setEditedCountryName] = useState(''); // State untuk nama negara yang sedang di-edit

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

    const handleEdit = (country) => {
        setEditingCountryId(country.id);
        setEditedCountryName(country.name);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (editedCountryName.trim() !== '') {
            const response = await fetch(`http://localhost:5000/api/countries/${editingCountryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: editedCountryName }),
            });
            if (response.ok) {
                fetchCountries();
                setEditingCountryId(null); // Reset editing state
                setEditedCountryName('');  // Clear input
            }
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
                        <th>Country Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {countries.map((country) => (
                        <tr key={country.id}>
                            <td>{country.id}</td>
                            <td>
                                {editingCountryId === country.id ? (
                                    // Input field to edit country name
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editedCountryName}
                                        onChange={(e) => setEditedCountryName(e.target.value)}
                                    />
                                ) : (
                                    country.name
                                )}
                            </td>
                            <td>
                                {editingCountryId === country.id ? (
                                    // Save and Cancel buttons
                                    <>
                                        <button 
                                            className="btn btn-success me-2" 
                                            onClick={handleUpdate}>
                                            Save
                                        </button>
                                        <button 
                                            className="btn btn-secondary" 
                                            onClick={() => setEditingCountryId(null)}>
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button 
                                            className="btn btn-warning me-2" 
                                            onClick={() => handleEdit(country)}>
                                            Edit
                                        </button>
                                        <button 
                                            className="btn btn-danger" 
                                            onClick={() => handleDelete(country.id)}>
                                            Delete
                                        </button>
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

export default Countries;
