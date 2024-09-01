import React, { useState } from 'react';
import '../styles.css';

function Awards() {
    const [awards, setAwards] = useState([
        { id: 1, country: 'Japan', year: 2024, name: 'Japanese Drama Awards Spring 2024' },
        { id: 2, country: 'Japan', year: 2024, name: 'Japanese Drama Awards Spring 2024' },
        { id: 3, country: 'Korea', year: 2024, name: 'Japanese Drama Awards Spring 2024' },
        // Tambahkan lebih banyak data sesuai kebutuhan
    ]);

    const [newAward, setNewAward] = useState({ country: '', year: '', name: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newAward.country && newAward.year && newAward.name) {
            setAwards([
                ...awards,
                { id: awards.length + 1, ...newAward }
            ]);
            setNewAward({ country: '', year: '', name: '' });
        }
    };

    const handleEdit = (id, updatedAward) => {
        const updatedAwards = awards.map(award =>
            award.id === id ? { ...award, ...updatedAward } : award
        );
        setAwards(updatedAwards);
    };

    const handleDelete = (id) => {
        const updatedAwards = awards.filter(award => award.id !== id);
        setAwards(updatedAwards);
    };

    return (
        <div className="main-content">
            <h3>Awards</h3>
            <form className="award-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Country"
                    value={newAward.country}
                    onChange={(e) => setNewAward({ ...newAward, country: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Year"
                    value={newAward.year}
                    onChange={(e) => setNewAward({ ...newAward, year: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Awards"
                    value={newAward.name}
                    onChange={(e) => setNewAward({ ...newAward, name: e.target.value })}
                />
                <button type="submit" className="submit-btn">Submit</button>
            </form>

            <table className="award-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Countries</th>
                        <th>Years</th>
                        <th>Awards</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {awards.map((award) => (
                        <tr key={award.id}>
                            <td>{award.id}</td>
                            <td>{award.country}</td>
                            <td>{award.year}</td>
                            <td>{award.name}</td>
                            <td>
                                <a href="#" onClick={() => handleEdit(award.id, { country: award.country, year: award.year, name: award.name })}>Edit</a> | 
                                <a href="#" onClick={() => handleDelete(award.id)}> Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Awards;
