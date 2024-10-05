import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Pastikan Bootstrap diimpor

function Countries() {
    const [countries, setCountries] = useState([
        { id: 1, name: 'Japan', isDefault: true },
        { id: 2, name: 'Korea', isDefault: false },
        { id: 3, name: 'China', isDefault: false },
    ]);

    const [newCountry, setNewCountry] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newCountry.trim() !== '') {
            setCountries([
                ...countries,
                { id: countries.length + 1, name: newCountry, isDefault: false },
            ]);
            setNewCountry('');
        }
    };

    return (
        <div className="container mt-4"> {/* Tambahkan margin top untuk pemisahan */}
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
                            <td>
                                <div className="d-flex align-items-center">
                                    <input
                                        type="text"
                                        className="form-control me-2"
                                        value={country.name}
                                        onChange={(e) => handleRename(country.id, e.target.value)}
                                    />
                                    {country.isDefault && <span className="text-success ms-2">Default</span>} {/* Tambahkan margin ke kiri */}
                                </div>
                            </td>
                            <td>
                                <button className="btn btn-secondary me-2" onClick={() => handleRename(country.id, country.name)}>Rename</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(country.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Countries;
