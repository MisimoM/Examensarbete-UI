'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { ensureAccessToken } from '@/src/lib/services/authentication/authService';

interface JwtPayload {
    sub: string;
    email: string;
    role: string;
    exp: number;
}

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    accessToken: string | null;
    user: JwtPayload | null;
    refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<JwtPayload | null>(null);

    const refreshAuth = async () => {
        setLoading(true);
        try {
            const token = await ensureAccessToken();
            setAccessToken(token);
            setIsAuthenticated(!!token);

            if (token) {
                const decodedUser: JwtPayload = jwtDecode(token);
                setUser(decodedUser);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Failed to refresh authentication:", error);
            setIsAuthenticated(false);
            setAccessToken(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, accessToken, user, refreshAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};