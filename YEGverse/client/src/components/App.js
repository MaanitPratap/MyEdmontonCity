import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import Home from '../pages/Home';
import Login from './Login';
import Navbar from './layout/Navbar';
import { useAuth } from '../contexts/AuthContext';

const AppContent = () => {
  const { currentUser } = useAuth();

  return (
    <Router>
      <div className="app">
        <Navbar />
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