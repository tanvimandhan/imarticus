import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

// create context
export const AuthContext = createContext();

// auth provider component
export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // check if user is logged in when app starts
  useEffect(function() {
    console.log('checking if user is logged in');
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      console.log('user data found in localStorage');
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        console.log('user set: ' + parsedUser.name);
      } catch (e) {
        console.log('error parsing user data: ' + e);
      }
    } else {
      console.log('no user data found');
    }
    
    setLoading(false);
  }, []);

  // login function
  const login = async function(email, password) {
    console.log('login function called');
    try {
      const response = await authService.login({ email: email, password: password });
      console.log('login successful');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.log('login error: ' + error);
      throw error;
    }
  };

  // register function
  const register = async function(name, email, password) {
    console.log('register function called');
    try {
      const response = await authService.register({ name: name, email: email, password: password });
      console.log('register successful');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.log('register error: ' + error);
      throw error;
    }
  };

  // logout function
  const logout = function() {
    console.log('logout function called');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // check if user is admin
  let isAdmin = false;
  if (user && user.isAdmin) {
    isAdmin = true;
  }

  // return provider
  return (
    <AuthContext.Provider value={{ user: user, login: login, register: register, logout: logout, loading: loading, isAdmin: isAdmin }}>
      {props.children}
    </AuthContext.Provider>
  );
}
