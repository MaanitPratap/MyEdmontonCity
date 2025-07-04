import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification
} from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';
import '../../styles/LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  const createUserInMongoDB = async (user) => {
    try {
      const token = await user.getIdToken();
      const response = await fetch('http://localhost:5001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          firebaseUid: user.uid,
          email: user.email,
          username: user.email.split('@')[0],
          displayName: user.displayName || user.email.split('@')[0],
          photoURL: user.photoURL,
          provider: user.providerData[0]?.providerId === 'google.com' ? 'google' : 'email'
        })
      });
      
      if (!response.ok) {
        console.error('Failed to create user in MongoDB');
      }
    } catch (error) {
      console.error('Error creating user in MongoDB:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setMessage('');
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      await createUserInMongoDB(result.user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        if (!userCredential.user.emailVerified) {
          setError('Please verify your email before logging in. Check your inbox for the verification email.');
          return;
        }
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        setShowVerificationMessage(true);
        setMessage('Account created! Please check your email and click the verification link before logging in.');
        await auth.signOut();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (showVerificationMessage) {
    return (
      <div className="login-section">
        <div className="login-form">
          <h2>Verify Your Email</h2>
          <p className="verification-message">
            We've sent a verification email to <strong>{email}</strong>. 
            Please click the link in the email to verify your account, then return here to log in.
          </p>
          <button 
            type="button" 
            onClick={() => {
              setShowVerificationMessage(false);
              setIsLogin(true);
              setMessage('');
            }}
            className="back-to-login-btn"
          >
            Back to Login
          </button>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="login-section">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        
        <div className="divider">
          <span>or</span>
        </div>
        
        <button 
          type="button" 
          onClick={handleGoogleSignIn}
          className="google-signin-btn"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            style={{ marginRight: '8px' }}
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>
        
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign up' : 'Have an account? Login'}
        </button>
        
        {error && <p className="error">{error}</p>}
        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;