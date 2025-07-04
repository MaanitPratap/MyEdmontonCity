import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  if (!currentUser) return null;

  return (
    <nav className="navbar">
      <span>Welcome, {currentUser.email}</span>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;