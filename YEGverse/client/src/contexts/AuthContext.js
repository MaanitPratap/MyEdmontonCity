import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    return signOut(auth);
  };

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check if email is verified
        if (user.emailVerified || user.providerData[0]?.providerId === 'google.com') {
          // Email is verified or it's a Google account, create user in MongoDB if needed
          await createUserInMongoDB(user);
          setCurrentUser(user);
        } else {
          // Email not verified, don't set as current user
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};