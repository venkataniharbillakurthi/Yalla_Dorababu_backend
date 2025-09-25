import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// Mock database for demo purposes
const mockUsers = [
  { email: 'user@example.com', password: 'password123', name: 'Demo User' },
];

// Helper to get users from localStorage
const getUsers = () => {
  const storedUsers = localStorage.getItem('users');
  return storedUsers ? JSON.parse(storedUsers) : [...mockUsers];
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(getUsers());

  // Update localStorage when users change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const signup = async (email, password, name) => {
    try {
      // Check if user already exists
      if (users.some(user => user.email === email)) {
        return { success: false, message: 'Email already in use' };
      }

      // Create new user
      const newUser = { 
        email, 
        password, // In a real app, you should hash the password
        name,
        id: Date.now().toString(), // Add a unique ID
        createdAt: new Date().toISOString()
      };
      
      const updatedUsers = [...users, newUser];
      
      // Update state and localStorage
      setUsers(updatedUsers);
      setCurrentUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'Failed to create account' };
    }
  };

  const login = async (email, password) => {
    try {
      // Find user by email
      const user = users.find(u => u.email === email);
      
      // Check if user exists and password matches
      if (!user) {
        return { success: false, message: 'No account found with this email' };
      }
      
      // In a real app, you would verify a hashed password here
      if (user.password !== password) {
        return { success: false, message: 'Incorrect password' };
      }
      
      // Update last login timestamp
      const updatedUser = { ...user, lastLogin: new Date().toISOString() };
      
      // Update state and localStorage
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Failed to log in. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
