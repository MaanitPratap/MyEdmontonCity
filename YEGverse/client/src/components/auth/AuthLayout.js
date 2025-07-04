import React from 'react';
import '../../styles/AuthLayout.css';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-container">
      <div className="auth-container-inner">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;