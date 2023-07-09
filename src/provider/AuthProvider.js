import React, { createContext, useState, useContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    const login = async (username, password) => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Login successful
                const data = await response.json();
                console.log('Login response:', data);
                const token = data.token;
                setToken(token);
                sessionStorage.setItem('token', token);
                setIsLoggedIn(true);
            } else {
                // Login failed
                const errorData = await response.json();
                setIsLoggedIn(false);
                console.error('Login error:', errorData);
            }
        } catch (error) {
            console.error('Login request failed:', error);
        }
    };

    const signup = async (username, password) => {
        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Signup successful
                const data = await response.json();
                console.log('Signup response:', data);
            } else {
                // Signup failed
                const errorData = await response.json();
                console.error('Signup error:', errorData);
            }
        } catch (error) {
            console.error('Signup request failed:', error);
        }
    }

    const logout = () => {
        setIsLoggedIn(false);
        setToken(null);
        sessionStorage.removeItem('token');
    };

    const verifyToken = () => {
        if (token) {
            try {
                const decodedToken = jwt_decode(token);
                // Check if the token is expired
                if (decodedToken.exp < Date.now() / 1000) {
                    logout();
                }
            } catch (error) {
                console.error('Token verification failed:', error);
                logout();
            }
        }
    };

    useEffect(() => {
        console.log('isLoggedIn0 ', isLoggedIn)
        // Check if a token exists in session storage on component mount
        const storedToken = sessionStorage.getItem('token');
        console.log('storedToken', storedToken)
        if (storedToken) {
            setToken(storedToken);
            setIsLoggedIn(true);
        }
    }, []);

    // Run token verification on component mount or whenever token changes
    useEffect(() => {
        verifyToken();
    }, [token]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

