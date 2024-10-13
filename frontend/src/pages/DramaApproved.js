import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function DramaApproved() {
    const [dramas, setDramas] = useState([]);
    const [editingDrama, setEditingDrama] = useState(null); // State untuk drama yang sedang diedit
    const [formData, setFormData] = useState({ title: '', alternativetitle: '', synopsis: '' }); // Data untuk form

    useEffect(() => {
        fetchDramas();
    }, []);

    const fetchDramas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/dramas/with-details');
            setDramas(response.data);
        } catch (error) {
            console.error('Error fetching dramas:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/dramas/${id}`);
            fetchDramas(); // Refresh the drama list after deletion
        } catch (error) {
            console.error('Error deleting drama:', error);
        }
    };

    const handleEdit = (drama) => {
        setEditingDrama(drama);
        setFormData({ title: drama.title, alternativetitle: drama.alternativetitle, synopsis: drama.synopsis });
    };

    const handleUpdate = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/dramas/${id}`, formData);
            setEditingDrama(null); // Reset editing state
            fetchDramas(); // Refresh the drama list after update
        } catch (error) {
            console.error('Error updating drama:', error);
        }
    };

    return (
        <div className="container">
            <h3>Approved Dramas</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Alternative Title</th>
                        <th>Genres</th>
                        <th>Actors</th>
                        <th>Synopsis</th>
                        <th>Year</th>
                        <th>Availability</th>
                        <th>Awards</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dramas.map((drama) => (
                        <tr key={drama.id}>
                            <td>{drama.title}</td>
                            <td>{drama.alternativetitle}</td>
                            <td>{drama.genres?.map(genre => genre.name).join(', ') || 'N/A'}</td>
                            <td>{drama.actors?.map(actor => actor.name).join(', ') || 'N/A'}</td>
                            <td>{drama.synopsis}</td>
                            <td>{drama.year}</td>
                            <td>{drama.availability}</td>
                            <td>{drama.award_name}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => handleEdit(drama)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(drama.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Form Edit Drama */}
            {editingDrama && (
                <div className="mt-4">
                    <h4>Edit Drama</h4>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate(editingDrama.id); }}>
                        <input type="text" className="form-control mb-2" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Title" required />
                        <input type="text" className="form-control mb-2" value={formData.alternativetitle} onChange={(e) => setFormData({ ...formData, alternativetitle: e.target.value })} placeholder="Alternative Title" />
                        <textarea className="form-control mb-2" value={formData.synopsis} onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })} placeholder="Synopsis" required></textarea>
                        <button type="submit" className="btn btn-primary">Update Drama</button>
                        <button type="button" className="btn btn-secondary" onClick={() => setEditingDrama(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default DramaApproved;
