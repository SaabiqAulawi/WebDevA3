import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function DramaApproved() {
    const [dramas, setDramas] = useState([]);
    const [editingDramaId, setEditingDramaId] = useState(null); // Menyimpan ID drama yang sedang diedit
    const [formData, setFormData] = useState({
        title: '',
        alternativeTitle: '',
        year: '',
        country: '',
        synopsis: '',
        availability: '',
        genres: '',
        actors: '',
        trailerLink: '',
        award_name: '',
    });

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
        setEditingDramaId(drama.id); // Set drama ID yang sedang diedit
        setFormData({
            title: drama.title,
            alternativeTitle: drama.alternativeTitle,
            year: drama.year,
            country: drama.country || '',
            synopsis: drama.synopsis,
            availability: drama.availability || '',
            genres: drama.genres?.map(genre => genre.name).join(', ') || '',
            actors: drama.actors?.map(actor => actor.name).join(', ') || '',
            trailerLink: drama.trailerLink || '',
            award_name: drama.award_name || ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const updatedData = {
                ...formData,
                genres: formData.genres.split(',').map(genre => genre.trim()),
                actors: formData.actors.split(',').map(actor => actor.trim()),
            };
            await axios.put(`http://localhost:5000/api/dramas/${editingDramaId}`, updatedData);
            setEditingDramaId(null); // Reset editing state
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
                            <td>
                                {editingDramaId === drama.id ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    drama.title
                                )}
                            </td>
                            <td>
                                {editingDramaId === drama.id ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="alternativeTitle"
                                        value={formData.alternativeTitle}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    drama.alternativeTitle
                                )}
                            </td>
                            <td>
                                {editingDramaId === drama.id ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="genres"
                                        value={formData.genres}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    drama.genres?.map(genre => genre.name).join(', ') || 'N/A'
                                )}
                            </td>
                            <td>
                                {editingDramaId === drama.id ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="actors"
                                        value={formData.actors}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    drama.actors?.map(actor => actor.name).join(', ') || 'N/A'
                                )}
                            </td>
                            <td>
                                {editingDramaId === drama.id ? (
                                    <textarea
                                        className="form-control"
                                        name="synopsis"
                                        value={formData.synopsis}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    drama.synopsis
                                )}
                            </td>
                            <td>
                                {editingDramaId === drama.id ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    drama.year
                                )}
                            </td>
                            <td>
                                {editingDramaId === drama.id ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="availability"
                                        value={formData.availability}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    drama.availability
                                )}
                            </td>
                            <td>
                                {editingDramaId === drama.id ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="award_name"
                                        value={formData.award_name}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    drama.award_name
                                )}
                            </td>
                            <td>
                                {editingDramaId === drama.id ? (
                                    <>
                                        <button className="btn btn-success me-2" onClick={handleUpdate}>Save</button>
                                        <button className="btn btn-secondary" onClick={() => setEditingDramaId(null)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-warning me-2" onClick={() => handleEdit(drama)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(drama.id)}>Delete</button>
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

export default DramaApproved;
