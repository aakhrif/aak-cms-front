import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

