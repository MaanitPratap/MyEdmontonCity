import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import Home from '../pages/Home';
import Login from './Login';

const AppContent = () => {
  const { currentUser, logout } = useAuth();

  return (
    <Router>
      <div className="app">
        {currentUser && (
          <nav className="navbar">
            <span>Welcome, {currentUser.email}</span>
            <button onClick={logout}>Logout</button>
          </nav>
        )}
        
        <Routes>
          <Route 
            path="/" 
            element={currentUser ? <Home /> : <Login />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;