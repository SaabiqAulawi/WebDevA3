import React, { useState } from 'react';
import '../styles.css';

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

    const handleRename = (id, newName) => {
        const updatedCountries = countries.map(country =>
            country.id === id ? { ...country, name: newName } : country
        );
        setCountries(updatedCountries);
    };

    const handleDelete = (id) => {
        const updatedCountries = countries.filter(country => country.id !== id);
        setCountries(updatedCountries);
    };

    return (
        <div className="main-content">
            <h3>Country</h3>
            <form className="country-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Country"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                />
                <button type="submit" className="submit-btn">Submit</button>
            </form>

            <table className="country-table">
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
                                <input
                                    type="text"
                                    value={country.name}
                                    onChange={(e) => handleRename(country.id, e.target.value)}
                                />
                                {country.isDefault && <span className="default-tag">Default</span>}
                            </td>
                            <td>
                                <a href="#" onClick={() => handleRename(country.id, country.name)}>Rename</a> | 
                                <a href="#" onClick={() => handleDelete(country.id)}> Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Countries;
