import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <h2>BiLk21</h2>
            <ul>
                <li><Link to="/">Drama</Link></li>
                <li><Link to="/countries">Countries</Link></li>
                <li><Link to="/genres">Genres</Link></li>
                <li><Link to="/actors">Actors</Link></li>
                <li><Link to="/comments">Comments</Link></li>
                <li><Link to="/users">Users</Link></li>
                <li><Link to="/input-drama">Input New Drama</Link></li>
                <li><Link to="/validate-drama">Validate Drama</Link></li>
                <li><Link to="/approved-drama">Approved Drama</Link></li>
                <li><a href="#">Logout</a></li>
            </ul>
        </div>
    );
}

export default Sidebar;
