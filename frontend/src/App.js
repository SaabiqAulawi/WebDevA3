import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Countries from './pages/Countries';
import Genres from './pages/Genres';
import Actors from './pages/Actors';
import Comments from './pages/Comments';
import DramaInput from './pages/DramaInput';
import DramaApproved from './pages/DramaApproved';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Registration from './pages/Registration';
import MovieDetail from './pages/MovieDetail';
import SearchResults from './pages/SearchResults';
import Users from './pages/Users';
import './styles.css';


function LayoutWithSidebar({ children }) {
    const location = useLocation();

    // Tentukan halaman yang tidak perlu sidebar
    const hideSidebarOn = [
        '/login',
        '/registration',
        '/drama',  // Matches dynamic movieId route
        '/search',  // Matches dynamic searchTerm route
        '/'
    ];

    const shouldHideSidebar = hideSidebarOn.some(path => 
        location.pathname === path || location.pathname.startsWith(path + '/')
      );

    return (
        <div className={`App ${shouldHideSidebar ? 'no-sidebar' : ''}`}>
            {/* Render Sidebar hanya jika tidak disembunyikan */}
            {!shouldHideSidebar && <Sidebar />}
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
}

function App() {
    return (
        <Router>
            <div className="App">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <LayoutWithSidebar>
                                    <HomePage />
                                </LayoutWithSidebar>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <LayoutWithSidebar>
                                    <Login />
                                </LayoutWithSidebar>
                            }
                        />
                        <Route
                            path="/registration"
                            element={
                                <LayoutWithSidebar>
                                    <Registration />
                                </LayoutWithSidebar>
                            }
                        />
                        <Route
                            path="/drama/:dramaId"
                            element={
                                <LayoutWithSidebar>
                                    <MovieDetail />
                                </LayoutWithSidebar>
                            }
                        />
                        <Route
                            path="/search/:searchTerm"
                            element={
                                <LayoutWithSidebar>
                                    <SearchResults />
                                </LayoutWithSidebar>
                            }
                        />
                        {/* Routes for pages where sidebar should be visible */}
                        <Route
                            path="/countries"
                            element={
                                <LayoutWithSidebar>
                                    <Countries />
                                </LayoutWithSidebar>
                            }
                        />
                        <Route
                            path="/genres"
                            element={
                                <LayoutWithSidebar>
                                    <Genres />
                                </LayoutWithSidebar>
                            }
                        />
                        <Route
                            path="/actors"
                            element={
                                <LayoutWithSidebar>
                                    <Actors />
                                </LayoutWithSidebar>
                            }
                        />
                        <Route
                            path="/comments"
                            element={
                                <LayoutWithSidebar>
                                    <Comments />
                                </LayoutWithSidebar>
                            }
                        />
                        <Route
                            path="/input-drama"
                            element={
                                <LayoutWithSidebar>
                                    <DramaInput />
                                </LayoutWithSidebar>
                            }
                        />
                        <Route
                            path="/approved-drama"
                            element={
                                <LayoutWithSidebar>
                                    <DramaApproved />
                                </LayoutWithSidebar>
                            }
                        />
                        <Route
                            path="/users"
                            element={
                                <LayoutWithSidebar>
                                    <Users />
                                </LayoutWithSidebar>
                            }
                        />
                    </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
