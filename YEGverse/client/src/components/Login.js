import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../firebase/firebase-config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

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
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      // Check if this is a new user and create in MongoDB
      await createUserInMongoDB(result.user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Create user in MongoDB after successful Firebase signup
        await createUserInMongoDB(userCredential.user);
      }
    } catch (error) {
      setError(error.message);
    }
  };

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
      </form>
    </div>
  );
};

export default Login;