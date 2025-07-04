import React from 'react';
import AuthLayout from './auth/AuthLayout';
import WelcomeSection from './auth/WelcomeSection';
import LoginForm from './auth/LoginForm';

const Login = () => {
  return (
    <AuthLayout>
      <WelcomeSection />
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;