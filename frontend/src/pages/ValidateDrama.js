import React, { useState } from 'react';
import '../styles.css';

function ValidateDrama() {
    const [dramas, setDramas] = useState([
        {
            id: 1,
            title: '[2024] Japan - Eye Love You',
            actors: ['Takuya Kimura', 'Takeuchi Yuko', 'Neinen Reina'],
            genres: ['Romance', 'Adventures', 'Comedy'],
            synopsis: 'I love this drama. It taught me a lot about money and finance. Love is not everything. We need to face the reality too. Being stoic is the best.',
            status: 'Unapproved'
        }
    ]);

    const [filter, setFilter] = useState('Unapproved');
    const [showLimit, setShowLimit] = useState(10);

    const handleApprove = (id) => {
        const updatedDramas = dramas.map(drama =>
            drama.id === id ? { ...drama, status: 'Approved' } : drama
        );
        setDramas(updatedDramas);
    };

    const handleDelete = (id) => {
        const updatedDramas = dramas.filter(drama => drama.id !== id);
        setDramas(updatedDramas);
    };

    return (
        <div className="main-content">
            <h3>Validate Drama</h3>
            <div className="filter-section">
                <label>
                    Filtered by:
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="Unapproved">Unapproved</option>
                        <option value="Approved">Approved</option>
                    </select>
                </label>
                <label>
                    Shows:
                    <select value={showLimit} onChange={(e) => setShowLimit(e.target.value)}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </label>
            </div>

            <table className="drama-table">
                <thead>
                    <tr>
                        <th>Drama</th>
                        <th>Actors</th>
                        <th>Genres</th>
                        <th>Synopsis</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dramas.slice(0, showLimit).map((drama) => (
                        <tr key={drama.id} className={drama.status === 'Unapproved' ? 'unapproved' : ''}>
                            <td>{drama.title}</td>
                            <td>{drama.actors.join(', ')}</td>
                            <td>{drama.genres.join(', ')}</td>
                            <td>{drama.synopsis}</td>
                            <td>{drama.status}</td>
                            <td>
                                <a href="#" onClick={() => handleApprove(drama.id)}>Edit</a> | 
                                <a href="#" onClick={() => handleDelete(drama.id)}> Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ValidateDrama;
