import React from 'react';

const FilterBar = () => {
    return (
        <div className="filter-bar">
            <label>Filtered by:</label>
            <select><option>Year</option></select>
            <select><option>Genre</option></select>
            <select><option>Status</option></select>
            <select><option>Availability</option></select>
            <select><option>Award</option></select>
            <button>Submit</button>
        </div>
    );
};

export default FilterBar;
