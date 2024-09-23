import React from 'react';
import './MainContent.css';

function MainContent() {
    return (
        <div className="main-content">
            <h3>Country</h3>
            <form className="main-form">
                <input type="text" placeholder="Country" />
                <button type="submit" className="submit-btn">Submit</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Countries</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td><input type="text" value="Japan" /></td>
                        <td><a href="#">Rename</a> | <a href="#">Delete</a></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Korea</td>
                        <td><a href="#">Rename</a> | <a href="#">Delete</a></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>China</td>
                        <td><a href="#">Rename</a> | <a href="#">Delete</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default MainContent;
