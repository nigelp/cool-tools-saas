import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <Link to="/" className="text-2xl font-bold text-blue-600">Cool Tools</Link>
      <nav>
        {currentUser ? (
          <div className="flex space-x-4">
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
            <Link to="/profile" className="text-gray-600 hover:text-blue-600">Profile</Link>
            <button onClick={handleLogout} className="text-gray-600 hover:text-blue-600">Logout</button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
            <Link to="/signup" className="text-gray-600 hover:text-blue-600">Sign Up</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
