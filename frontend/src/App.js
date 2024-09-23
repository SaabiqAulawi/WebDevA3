import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetail from './pages/MovieDetail';
import Login from './pages/Login';
import Registration from './pages/Registration';
import SearchResults from './pages/SearchResults';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movie/:movieId" element={<MovieDetail />} />  {/* Rute untuk MovieDetail */}
                <Route path="/search/:searchTerm" element={<SearchResults />} />  {/* Rute untuk SearchResults */}
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
            </Routes>
        </Router>
    );
}

export default App;
