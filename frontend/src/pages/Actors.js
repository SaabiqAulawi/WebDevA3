import React, { useState } from 'react';
import '../styles.css';

function Actors() {
    const [actors, setActors] = useState([
        { id: 1, country: 'Japan', name: 'Takuya Kimura', birthDate: '19 Desember 1975', photo: null },
        { id: 2, country: 'Japan', name: 'Yuko Takeuchi', birthDate: '19 Oktober 1977', photo: null },
    ]);

    const [newActor, setNewActor] = useState({ country: '', name: '', birthDate: '', photo: null });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newActor.country && newActor.name && newActor.birthDate) {
            setActors([
                ...actors,
                { id: actors.length + 1, ...newActor }
            ]);
            setNewActor({ country: '', name: '', birthDate: '', photo: null });
        }
    };

    const handleEdit = (id, updatedActor) => {
        const updatedActors = actors.map(actor =>
            actor.id === id ? { ...actor, ...updatedActor } : actor
        );
        setActors(updatedActors);
    };

    const handleDelete = (id) => {
        const updatedActors = actors.filter(actor => actor.id !== id);
        setActors(updatedActors);
    };

    const handlePhotoUpload = (e, id) => {
        const file = e.target.files[0];
        const updatedActors = actors.map(actor =>
            actor.id === id ? { ...actor, photo: URL.createObjectURL(file) } : actor
        );
        setActors(updatedActors);
    };

    return (
        <div className="main-content">
            <h3>Actors</h3>
            <form className="actor-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Country"
                    value={newActor.country}
                    onChange={(e) => setNewActor({ ...newActor, country: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Actor Name"
                    value={newActor.name}
                    onChange={(e) => setNewActor({ ...newActor, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Birth Date"
                    value={newActor.birthDate}
                    onChange={(e) => setNewActor({ ...newActor, birthDate: e.target.value })}
                />
                <input
                    type="file"
                    onChange={(e) => setNewActor({ ...newActor, photo: URL.createObjectURL(e.target.files[0]) })}
                />
                <button type="submit" className="submit-btn">Submit</button>
            </form>

            <table className="actor-table">
                <thead>
                    <tr>
                        <th>Countries</th>
                        <th>Actor Name</th>
                        <th>Birth Date</th>
                        <th>Photos</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {actors.map((actor) => (
                        <tr key={actor.id}>
                            <td>{actor.country}</td>
                            <td>{actor.name}</td>
                            <td>{actor.birthDate}</td>
                            <td>
                                {actor.photo ? <img src={actor.photo} alt="actor" className="actor-photo" /> : <span>No Photo</span>}
                                <input type="file" onChange={(e) => handlePhotoUpload(e, actor.id)} />
                            </td>
                            <td>
                                <a href="#" onClick={() => handleEdit(actor.id, actor)}>Edit</a> | 
                                <a href="#" onClick={() => handleDelete(actor.id)}> Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Actors;
