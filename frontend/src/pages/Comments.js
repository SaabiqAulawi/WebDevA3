import React, { useState } from 'react';
import '../styles.css';

function Comments() {
    const [comments, setComments] = useState([
        { id: 1, username: 'Nara', rate: 5, drama: '[2024] Japan - Eye Love You', text: 'I love this drama. It taught me a lot about money and finance. Love is not everything. We need to face the reality too. Being stoic is the best.', status: 'Unapproved' },
        { id: 2, username: 'Luffy', rate: 2, drama: '[2024] Japan - Eye Love You', text: 'Meh', status: 'Approved' },
    ]);

    const [filter, setFilter] = useState('None');
    const [showLimit, setShowLimit] = useState(10);

    const handleApprove = (id) => {
        const updatedComments = comments.map(comment =>
            comment.id === id ? { ...comment, status: 'Approved' } : comment
        );
        setComments(updatedComments);
    };

    const handleDelete = (id) => {
        const updatedComments = comments.filter(comment => comment.id !== id);
        setComments(updatedComments);
    };

    const handleSelectAll = () => {
        const updatedComments = comments.map(comment => ({ ...comment, status: 'Approved' }));
        setComments(updatedComments);
    };

    return (
        <div className="main-content">
            <h3>Comments</h3>
            <div className="filter-section">
                <label>
                    Filtered by:
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="None">None</option>
                        <option value="Approved">Approved</option>
                        <option value="Unapproved">Unapproved</option>
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

            <table className="comments-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Username</th>
                        <th>Rate</th>
                        <th>Drama</th>
                        <th>Comments</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.slice(0, showLimit).map((comment) => (
                        <tr key={comment.id} className={comment.status === 'Unapproved' ? 'unapproved' : ''}>
                            <td><input type="checkbox" /></td>
                            <td>{comment.username}</td>
                            <td>{'★'.repeat(comment.rate)}</td>
                            <td>{comment.drama}</td>
                            <td>{comment.text}</td>
                            <td>{comment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="actions">
                <button className="approve-btn" onClick={handleSelectAll}>Select All</button>
                <button className="approve-btn" onClick={() => comments.forEach(comment => handleApprove(comment.id))}>Approve</button>
                <button className="delete-btn" onClick={() => comments.forEach(comment => handleDelete(comment.id))}>Delete</button>
            </div>
        </div>
    );
}

export default Comments;
