import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Countries from './pages/Countries';
import Genres from './pages/Genres';
import Actors from './pages/Actors';
import Comments from './pages/Comments';
import DramaInput from './pages/DramaInput';
import DramaApproved from './pages/DramaApproved';
import ValidateDrama from './pages/ValidateDrama';
import HomePage from './pages/HomePage';
import Users from './pages/Users';
import './styles.css'; // Pastikan untuk mengimpor CSS

function App() {
    return (
        <Router>
            <div className="App">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path="/countries" element={<Countries />} />
                        <Route path="/genres" element={<Genres />} />
                        <Route path="/actors" element={<Actors />} />
                        <Route path="/comments" element={<Comments />} />
                        <Route path="/input-drama" element={<DramaInput />} />
                        <Route path="/validate-drama" element={<ValidateDrama />} />
                        <Route path="/approved-drama" element={<DramaApproved />} />
                        <Route path="/users" element={<Users />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
