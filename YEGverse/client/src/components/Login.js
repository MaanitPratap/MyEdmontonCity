import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification
} from 'firebase/auth';
import { auth } from '../firebase/firebase-config';

const Login = () => {
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
      // Google accounts are pre-verified, so create user in MongoDB immediately
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
        
        // Check if email is verified for login
        if (!userCredential.user.emailVerified) {
          setError('Please verify your email before logging in. Check your inbox for the verification email.');
          return;
        }
        
        // If verified, proceed with login (user should already exist in MongoDB)
      } else {
        // Sign up flow
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Send verification email
        await sendEmailVerification(userCredential.user);
        
        setShowVerificationMessage(true);
        setMessage('Account created! Please check your email and click the verification link before logging in.');
        
        // Sign out the user immediately after account creation
        await auth.signOut();
        
        // Don't create user in MongoDB yet - wait for email verification
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const resendVerificationEmail = async () => {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        setMessage('Verification email sent again. Please check your inbox.');
      }
    } catch (error) {
      setError('Failed to resend verification email: ' + error.message);
    }
  };

  if (showVerificationMessage) {
    return (
      <div className="login-container">
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
    <div className="login-container">
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

export default Login;