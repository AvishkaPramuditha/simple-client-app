import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_API_KEY = 'dub_live_mYVrMW46RYqb-zFP2RRmLUhG4a01yKF93v2Y8Nuh3zk';
const DEFAULT_BASE_URL = '/api';

export const AuthProvider = ({ children }) => {
    const [apiKey, setApiKey] = useState(() => {
        return localStorage.getItem('deepauth_api_key') || DEFAULT_API_KEY;
    });

    const [baseUrl, setBaseUrl] = useState(() => {
        return localStorage.getItem('deepauth_base_url') || DEFAULT_BASE_URL;
    });

    useEffect(() => {
        localStorage.setItem('deepauth_api_key', apiKey);
    }, [apiKey]);

    useEffect(() => {
        localStorage.setItem('deepauth_base_url', baseUrl);
    }, [baseUrl]);

    const value = {
        apiKey,
        setApiKey,
        baseUrl,
        setBaseUrl,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
