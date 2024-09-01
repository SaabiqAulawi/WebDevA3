import React from 'react';
import '../styles.css';

function DramaApproved() {
    const drama = {
        title: 'Title of the drama 1 that makes two lines',
        otherTitles: 'Title 2, Title 3, Title 4',
        year: 'Spring 2024',
        synopsis: 'Synopsis sometimes unhelpful. I don’t read it thoroughly. But what helps me is the genres. I need to see genres and actors. That is what I want.',
        genres: ['Genre 1', 'Genre 2', 'Genre 3'],
        rating: '3.5/5',
        availability: 'Fansub: @xsubs on X',
        actors: ['Actor 1', 'Actor 1', 'Actor 1', 'Actor 1', 'Actor 1'],
        trailerLink: '#'
    };

    return (
        <div className="drama-approved-container">
            <div className="drama-header">
                <h1>{drama.title}</h1>
                <button className="approve-btn">Approve</button>
                <button className="delete-btn">Delete</button>
            </div>
            <div className="drama-details">
                <div className="drama-image-placeholder"></div>
                <div className="drama-info">
                    <p><strong>Other titles:</strong> {drama.otherTitles}</p>
                    <p><strong>Year:</strong> {drama.year}</p>
                    <p><strong>Synopsis:</strong> {drama.synopsis}</p>
                    <p><strong>Genres:</strong> {drama.genres.join(', ')}</p>
                    <p><strong>Rating:</strong> {drama.rating}</p>
                    <p><strong>Availability:</strong> {drama.availability}</p>
                </div>
            </div>
            <div className="drama-actors">
                {drama.actors.map((actor, index) => (
                    <div key={index} className="actor-placeholder">
                        {actor}
                    </div>
                ))}
            </div>
            <div className="drama-trailer">
                <div className="trailer-placeholder"></div>
            </div>
        </div>
    );
}

export default DramaApproved;
