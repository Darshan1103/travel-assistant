// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Travel Assistant</Link>

      <div>
        {user ? (
          // If user is logged in, show profile, name, and logout button
          <>
            {/* This is the new link you're adding */}
            <Link to="/profile" className="mr-4 hover:text-gray-300">My Profile</Link>
            
            <span className="mr-4">Welcome, {user.user.name}!</span>
            <button 
              onClick={handleLogout} 
              className="px-3 py-2 rounded bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          // If user is not logged in, show login and register links
          <>
            <Link to="/login" className="ml-4 px-3 py-2 rounded hover:bg-gray-700">Login</Link>
            <Link to="/register" className="ml-4 px-3 py-2 rounded hover:bg-gray-700">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}