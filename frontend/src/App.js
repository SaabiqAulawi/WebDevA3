import React from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Countries from './pages/Countries';
import Genres from './pages/Genres';
import Actors from './pages/Actors';
import Comments from './pages/Comments';
import DramaInput from './pages/DramaInput';
import DramaApproved from './pages/DramaApproved';
import HomePage from './pages/HomePage';
import MovieDetail from './pages/MovieDetail';
import SearchResults from './pages/SearchResults';
import Users from './pages/Users';
import './styles.css';

// Login
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
// import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LoadingSpinner from "./components/LoadingSpinner";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";



function LayoutWithSidebar({ children }) {
    const location = useLocation();

    // Tentukan halaman yang tidak perlu sidebar
    const hideSidebarOn = [
        '/login',
        '/signup',
        '/forgot-password',
        '/reset-password/:token',
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
            <Footer /> {/* Footer hanya di-render sekali di sini */}
        </div>
    );
}

// protect routes that require authentication and admin role
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    // Redirect to login if the user is not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Redirect to email verification if the user is not verified
    if (!user.isVerified) {
        return <Navigate to="/verify-email" replace />;
    }

    // Redirect to home page if the user is not an Admin
    if (user.role !== "Admin") {
        return <Navigate to="/" replace />;
    }

    // Render the children components if all checks pass
    return children;
};

const AdminOrUserProtectedRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    // Redirect to login if the user is not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Redirect to email verification if the user is not verified
    if (!user.isVerified) {
        return <Navigate to="/verify-email" replace />;
    }

    // Redirect to home page if the user role is neither Admin nor User
    if (user.role !== "Admin" && user.role !== "User") {
        return <Navigate to="/" replace />;
    }

    // Render the children components if all checks pass
    return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (isAuthenticated && user.isVerified) {
        return <Navigate to="/" replace />;
    }

    return children;
};


function App() {
    const { isCheckingAuth, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth) return <LoadingSpinner />;
    return (

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
                    <RedirectAuthenticatedUser>
                        
                            <LoginPage />
                      
                    </RedirectAuthenticatedUser>
                }
            />
            <Route
                path="/signup"
                element={
                    <RedirectAuthenticatedUser>
                       
                            <SignUpPage />
                      
                    </RedirectAuthenticatedUser>
                }
            />
            <Route
                path="/forgot-password"
                element={
                    <RedirectAuthenticatedUser>
                        
                            <ForgotPasswordPage />
                   
                    </RedirectAuthenticatedUser>
                }
            />
            <Route
                path="/reset-password/:token"
                element={
                    <RedirectAuthenticatedUser>
                        
                            <ResetPasswordPage />
                        
                    </RedirectAuthenticatedUser>
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
                    <ProtectedRoute>

                        <LayoutWithSidebar>
                            <Countries />
                        </LayoutWithSidebar>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/genres"
                element={
                    <ProtectedRoute>

                        <LayoutWithSidebar>
                            <Genres />
                        </LayoutWithSidebar>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/actors"
                element={
                    <ProtectedRoute>

                        <LayoutWithSidebar>
                            <Actors />
                        </LayoutWithSidebar>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/comments"
                element={
                    <ProtectedRoute>
                        <LayoutWithSidebar>
                            <Comments />
                        </LayoutWithSidebar>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/input-drama"
                element={
                    <AdminOrUserProtectedRoute>
                        <LayoutWithSidebar>
                            <DramaInput />
                        </LayoutWithSidebar>
                    </AdminOrUserProtectedRoute>
                }
            />
            <Route
                path="/approved-drama"
                element={
                    <ProtectedRoute>
                        <LayoutWithSidebar>
                            <DramaApproved />
                        </LayoutWithSidebar>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/users"
                element={
                    <ProtectedRoute>
                        <LayoutWithSidebar>
                            <Users />
                        </LayoutWithSidebar>
                    </ProtectedRoute>
                }
            />
             <Route path="/verify-email" element={<EmailVerificationPage />} />
             <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
